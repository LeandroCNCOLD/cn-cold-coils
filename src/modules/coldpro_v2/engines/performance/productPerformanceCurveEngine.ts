import type {
  PerformanceEnvelope,
  PerformanceSummary,
  ProductPerformanceCurveInput,
  ProductPerformanceCurveResult,
  ProductPerformancePoint,
  SystemComponentsInput,
} from "../../domain/types";
import { evaluateSystemEquilibrium } from "../equilibrium/systemEquilibriumEngine";
import { calculateFansTotalPower } from "../electrical/electricalAnalysisEngine";

function safeDivide(num: number, den: number): number {
  if (!den || den === 0) return 0;
  return num / den;
}

const EMPTY_SUMMARY: PerformanceSummary = {
  total_points: 0,
  approved_points: 0,
  warning_points: 0,
  rejected_points: 0,
  executed_points: 0,
};

const EMPTY_ENVELOPE: PerformanceEnvelope = {
  min_capacity_w: 0,
  max_capacity_w: 0,
  min_cop: 0,
  max_cop: 0,
};

/**
 * Avalia o polinômio ARI 540 / EN 12900 de 10 coeficientes.
 * f(Te, Tc) = c1 + c2·Te + c3·Tc + c4·Te² + c5·Te·Tc + c6·Tc²
 *           + c7·Te³ + c8·Tc·Te² + c9·Te·Tc² + c10·Tc³
 * Retorna o valor em kW (coeficientes padrão ARI 540).
 */
function evalARI540(coeffs: number[], Te_C: number, Tc_C: number): number {
  if (coeffs.length < 10) return 0;
  const [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10] = coeffs;
  return (
    c1 +
    c2 * Te_C +
    c3 * Tc_C +
    c4 * Te_C * Te_C +
    c5 * Te_C * Tc_C +
    c6 * Tc_C * Tc_C +
    c7 * Te_C * Te_C * Te_C +
    c8 * Tc_C * Te_C * Te_C +
    c9 * Te_C * Tc_C * Tc_C +
    c10 * Tc_C * Tc_C * Tc_C
  );
}

/**
 * Monta o SystemComponentsInput para um ponto específico da grade.
 *
 * Quando o CompressorSpec tiver coeficientes ARI 540, interpola Q e P
 * para o (evap_temp_c, cond_temp_c) do ponto — garantindo que tanto
 * capacidade quanto potência variem corretamente com T_evap e T_cond.
 *
 * Sem coeficientes, usa os valores nominais fixos (comportamento legado).
 */
function buildSystemForPoint(
  input: ProductPerformanceCurveInput,
  evap_temp_c: number,
  cond_temp_c: number,
): SystemComponentsInput {
  const baseCompressor = input.system.compressor;

  // Interpolação ARI 540: recalcula Q e P para este ponto da grade
  let cooling_capacity_w = baseCompressor.cooling_capacity_w;
  let power_w = baseCompressor.power_w;

  const capCoeffs = baseCompressor.ari540_capacity_coefficients;
  const powCoeffs = baseCompressor.ari540_power_coefficients;

  if (capCoeffs && capCoeffs.length >= 10) {
    const q_kw = evalARI540(capCoeffs, evap_temp_c, cond_temp_c);
    if (q_kw > 0) cooling_capacity_w = q_kw * 1000; // kW → W
  }

  if (powCoeffs && powCoeffs.length >= 10) {
    const p_kw = evalARI540(powCoeffs, evap_temp_c, cond_temp_c);
    if (p_kw > 0) power_w = p_kw * 1000; // kW → W
  }

  return {
    ...input.system,
    compressor: {
      ...baseCompressor,
      evap_temp_c,
      cond_temp_c,
      cooling_capacity_w,
      power_w,
    },
    evaporator: {
      progressive_input: {
        ...input.system.evaporator.progressive_input,
        rolls: input.system.evaporator.progressive_input.rolls.map((roll) => ({ ...roll })),
        T_evaporating_c: evap_temp_c,
      },
    },
    condenser: { ...input.system.condenser },
    evaporator_fan: input.system.evaporator_fan ? { ...input.system.evaporator_fan } : undefined,
    condenser_fan: input.system.condenser_fan ? { ...input.system.condenser_fan } : undefined,
    expansion_valve: input.system.expansion_valve ? { ...input.system.expansion_valve } : undefined,
    four_way_valve: input.system.four_way_valve ? { ...input.system.four_way_valve } : undefined,
    system_conditions: { ...input.system.system_conditions },
  };
}

function calculateEnvelope(points: ProductPerformancePoint[]): PerformanceEnvelope {
  const validPoints = points.filter((point) => point.capacity_w > 0);

  if (validPoints.length === 0) return EMPTY_ENVELOPE;

  const capacities = validPoints.map((point) => point.capacity_w);
  const cops = validPoints.map((point) => point.cop);

  return {
    min_capacity_w: Math.min(...capacities),
    max_capacity_w: Math.max(...capacities),
    min_cop: Math.min(...cops),
    max_cop: Math.max(...cops),
  };
}

function calculateSummary(
  totalPoints: number,
  points: ProductPerformancePoint[],
): PerformanceSummary {
  return {
    total_points: totalPoints,
    executed_points: points.length,
    approved_points: points.filter((point) => point.status === "approved").length,
    warning_points: points.filter((point) => point.status === "warning").length,
    rejected_points: points.filter((point) => point.status === "rejected").length,
  };
}

function calculateStatus(
  summary: PerformanceSummary,
  globalWarnings: string[],
): ProductPerformanceCurveResult["status"] {
  if (summary.executed_points === 0 || summary.rejected_points === summary.executed_points) {
    return "error";
  }

  if (summary.rejected_points > 0 || globalWarnings.length > 0) return "warning";

  return "ok";
}

export function generateProductPerformanceCurve(
  input: ProductPerformanceCurveInput,
): ProductPerformanceCurveResult {
  if (!input.system) {
    return {
      status: "error",
      points: [],
      summary: EMPTY_SUMMARY,
      envelope: EMPTY_ENVELOPE,
      warnings: ["generateProductPerformanceCurve: entrada do sistema é obrigatória."],
    };
  }

  if (!input.operating_points?.length) {
    return {
      status: "error",
      points: [],
      summary: EMPTY_SUMMARY,
      envelope: EMPTY_ENVELOPE,
      warnings: ["generateProductPerformanceCurve: lista de pontos operacionais não pode ser vazia."],
    };
  }

  const points: ProductPerformancePoint[] = [];
  const globalWarnings: string[] = [];

  for (const point of input.operating_points) {
    const systemForPoint = buildSystemForPoint(input, point.evap_temp_c, point.cond_temp_c);
    const equilibriumResult = evaluateSystemEquilibrium(systemForPoint);

    const capacity_w = equilibriumResult.thermal_balance.q_evap_w;
    const compressor_power_w = equilibriumResult.thermal_balance.compressor_power_w;

    // Calcula potência total do sistema (compressor + ventiladores) para COP correto
    const fans_power_w = calculateFansTotalPower(systemForPoint);
    const total_power_w = compressor_power_w + fans_power_w;

    points.push({
      evap_temp_c: point.evap_temp_c,
      cond_temp_c: point.cond_temp_c,
      capacity_w,
      compressor_power_w,
      /** COP do compressor isolado: Q / W_comp (valor de catálogo) */
      cop: safeDivide(capacity_w, compressor_power_w),
      q_cond_w: equilibriumResult.thermal_balance.q_cond_required_w,
      /** Potência elétrica total: W_comp + W_fans */
      total_power_w,
      /** COP real do sistema: Q / (W_comp + W_fans) */
      cop_system: safeDivide(capacity_w, total_power_w),
      balance_error_pct: equilibriumResult.thermal_balance.balance_error_pct,
      status: equilibriumResult.status,
      utilization: equilibriumResult.utilization,
      warnings: equilibriumResult.warnings,
      bottleneck_codes: equilibriumResult.bottleneck_codes,
    });

    if (input.options?.stop_on_rejection === true && equilibriumResult.status === "rejected") {
      globalWarnings.push("Geração da curva interrompida no primeiro ponto rejeitado.");
      break;
    }
  }

  const envelope = calculateEnvelope(points);
  const summary = calculateSummary(input.operating_points.length, points);
  const validPoints = points.filter((point) => point.capacity_w > 0);

  if (
    summary.executed_points > 0 &&
    safeDivide(summary.rejected_points, summary.executed_points) > 0.3
  ) {
    const rejectionPct = Math.round(
      safeDivide(summary.rejected_points, summary.executed_points) * 100,
    );
    globalWarnings.push(
      `${summary.rejected_points} de ${summary.executed_points} pontos rejeitados (>${rejectionPct}%). O sistema pode estar subdimensionado para parte da faixa operacional.`,
    );
  }

  if (validPoints.length >= 2) {
    const copVariation = safeDivide(envelope.max_cop - envelope.min_cop, envelope.min_cop) * 100;
    if (copVariation > 50) {
      globalWarnings.push(
        `COP varia ${Math.round(copVariation)}% entre os pontos operacionais. Verifique a consistência do dimensionamento dos componentes.`,
      );
    }

    const capacityVariation =
      safeDivide(envelope.max_capacity_w - envelope.min_capacity_w, envelope.min_capacity_w) * 100;
    if (capacityVariation > 80) {
      globalWarnings.push(
        `Capacidade varia ${Math.round(capacityVariation)}% entre os pontos operacionais. Variação elevada pode indicar instabilidade no dimensionamento.`,
      );
    }
  }

  return {
    status: calculateStatus(summary, globalWarnings),
    points,
    summary,
    envelope,
    warnings: globalWarnings,
  };
}
