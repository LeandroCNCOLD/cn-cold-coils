/**
 * sensitivityAnalysisEngine.ts — Sprint 8
 *
 * Motor de análise de sensibilidade paramétrica.
 * Varia um parâmetro de entrada em torno de seu valor nominal e calcula
 * a variação percentual de capacidade, COP e potência.
 *
 * Não requer acesso ao motor de equilíbrio completo — trabalha com
 * funções de escalonamento linear baseadas em coeficientes típicos
 * de sistemas de refrigeração (ASHRAE, 2018).
 */

import type {
  SensitivityAnalysisInput,
  SensitivityAnalysisResult,
  SensitivityParameter,
  SensitivityPoint,
} from "../../domain/types";

// ─── Coeficientes de sensibilidade por parâmetro ──────────────────────────────
// Representam a variação percentual por unidade do parâmetro.
// Baseados em dados típicos de sistemas DX (ASHRAE Handbook — Refrigeration 2018).

interface SensitivityCoefficients {
  /** Variação de capacidade por unidade do parâmetro [%/unidade] */
  capacity_pct_per_unit: number;
  /** Variação de COP por unidade do parâmetro [%/unidade] */
  cop_pct_per_unit: number;
  /** Variação de potência por unidade do parâmetro [%/unidade] */
  power_pct_per_unit: number;
}

const SENSITIVITY_COEFFICIENTS: Record<SensitivityParameter, SensitivityCoefficients> = {
  // Temperatura de evaporação: +1°C → +3% capacidade, +2.5% COP, -0.5% potência
  evap_temp_c: {
    capacity_pct_per_unit: 3.0,
    cop_pct_per_unit: 2.5,
    power_pct_per_unit: -0.5,
  },
  // Temperatura de condensação: +1°C → -2% capacidade, -2% COP, +1.5% potência
  cond_temp_c: {
    capacity_pct_per_unit: -2.0,
    cop_pct_per_unit: -2.0,
    power_pct_per_unit: 1.5,
  },
  // Velocidade do ar: +0.1 m/s → +1.5% capacidade, +0.5% COP, +2% potência
  air_velocity_ms: {
    capacity_pct_per_unit: 15.0,   // por m/s
    cop_pct_per_unit: 5.0,
    power_pct_per_unit: 20.0,
  },
  // Passo de aleta: +1 mm → -2% capacidade, -1.5% COP, 0% potência
  fin_pitch_mm: {
    capacity_pct_per_unit: -2.0,
    cop_pct_per_unit: -1.5,
    power_pct_per_unit: 0.0,
  },
  // Superaquecimento: +1 K → -0.5% capacidade, -0.3% COP, 0% potência
  superheat_k: {
    capacity_pct_per_unit: -0.5,
    cop_pct_per_unit: -0.3,
    power_pct_per_unit: 0.0,
  },
  // Sub-resfriamento: +1 K → +0.5% capacidade, +0.4% COP, 0% potência
  subcooling_k: {
    capacity_pct_per_unit: 0.5,
    cop_pct_per_unit: 0.4,
    power_pct_per_unit: 0.0,
  },
  // Temperatura ambiente: +1°C → -1.5% capacidade, -1.5% COP, +1% potência
  ambient_temp_c: {
    capacity_pct_per_unit: -1.5,
    cop_pct_per_unit: -1.5,
    power_pct_per_unit: 1.0,
  },
};

// ─── Motor principal ──────────────────────────────────────────────────────────

/**
 * Calcula a análise de sensibilidade para um parâmetro de entrada.
 *
 * Gera N pontos igualmente espaçados em torno do valor nominal,
 * calculando a variação percentual de capacidade, COP e potência.
 */
export function calculateSensitivityAnalysis(
  input: SensitivityAnalysisInput,
): SensitivityAnalysisResult {
  const warnings: string[] = [];
  const nPoints = input.n_points ?? 11;

  if (nPoints < 2) {
    warnings.push("n_points deve ser pelo menos 2. Usando 11.");
  }
  if (input.range <= 0) {
    warnings.push("range deve ser positivo.");
    return {
      parameter: input.parameter,
      nominal_value: input.nominal_value,
      points: [],
      sensitivity_capacity: 0,
      sensitivity_cop: 0,
      is_dominant: false,
      warnings,
    };
  }

  const coeff = SENSITIVITY_COEFFICIENTS[input.parameter];
  const n = Math.max(2, nPoints);
  const halfRange = input.range / 2;
  const step = input.range / (n - 1);

  const points: SensitivityPoint[] = [];

  for (let i = 0; i < n; i++) {
    const paramValue = input.nominal_value - halfRange + i * step;
    const delta = paramValue - input.nominal_value;

    const delta_capacity_pct = coeff.capacity_pct_per_unit * delta;
    const delta_cop_pct = coeff.cop_pct_per_unit * delta;
    const delta_power_pct = coeff.power_pct_per_unit * delta;

    const capacity_w = input.nominal_capacity_w * (1 + delta_capacity_pct / 100);
    const cop = input.nominal_cop * (1 + delta_cop_pct / 100);
    const power_w = input.nominal_power_w * (1 + delta_power_pct / 100);

    points.push({
      parameter_value: paramValue,
      capacity_w: Math.max(0, capacity_w),
      cop: Math.max(0, cop),
      power_w: Math.max(0, power_w),
      delta_capacity_pct,
      delta_cop_pct,
      delta_power_pct,
    });
  }

  // Sensibilidade linearizada: Δ%/Δparâmetro
  const sensitivity_capacity = coeff.capacity_pct_per_unit;
  const sensitivity_cop = coeff.cop_pct_per_unit;

  // Parâmetro dominante: sensibilidade de capacidade > 2%/unidade
  const is_dominant = Math.abs(sensitivity_capacity) > 2.0;

  return {
    parameter: input.parameter,
    nominal_value: input.nominal_value,
    points,
    sensitivity_capacity,
    sensitivity_cop,
    is_dominant,
    warnings,
  };
}

/**
 * Executa análise de sensibilidade para múltiplos parâmetros e
 * identifica o parâmetro dominante (maior sensibilidade de capacidade).
 */
export function calculateMultiParameterSensitivity(
  inputs: SensitivityAnalysisInput[],
): {
  results: SensitivityAnalysisResult[];
  dominant_parameter: SensitivityParameter | null;
  warnings: string[];
} {
  const warnings: string[] = [];

  if (inputs.length === 0) {
    return { results: [], dominant_parameter: null, warnings };
  }

  const results = inputs.map(calculateSensitivityAnalysis);

  // Identificar parâmetro dominante usando reduce (ES2020 compatível)
  const dominant = results.reduce(
    (best, current) => {
      return Math.abs(current.sensitivity_capacity) >
        Math.abs(best.sensitivity_capacity)
        ? current
        : best;
    },
    results[0],
  );

  // Marcar apenas o dominante
  results.forEach((r) => {
    (r as { is_dominant: boolean }).is_dominant =
      r.parameter === dominant.parameter;
  });

  return {
    results,
    dominant_parameter: dominant.parameter,
    warnings,
  };
}
