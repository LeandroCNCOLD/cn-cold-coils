/**
 * machineDatasheetExportAdapter.ts
 * Sprint 4 — Exportação de Catálogo e Data Sheet
 *
 * Converte um ProductTechnicalRecord em um MachineDatasheetExport padronizado,
 * pronto para integração com ferramentas de carga térmica e acesso por terceiros.
 *
 * Principais melhorias em relação ao exportProductTechnicalData existente:
 * - Inclui total_power_w e cop_system em cada ponto da curva
 * - Inclui análise elétrica completa (corrente, tensão, EER)
 * - Inclui referências de start-up para comissionamento em campo
 * - Enriquece os coeficientes polinomiais com metadados (R², qualidade do fit, unidade)
 * - Inclui relatório de validação da máquina completa (quando disponível)
 */

import type {
  CatalogElectricalData,
  CatalogExportOptions,
  CatalogPerformancePoint,
  CatalogPolynomialSet,
  MachineDatasheetExport,
  PolynomialTarget,
  ProductTechnicalRecord,
} from "../domain/types";

// ─────────────────────────────────────────────────────────────────────────────
// Metadados dos targets de polinômio
// ─────────────────────────────────────────────────────────────────────────────

interface PolynomialTargetMeta {
  label: string;
  unit: string;
}

const POLYNOMIAL_TARGET_META: Record<PolynomialTarget, PolynomialTargetMeta> = {
  capacity_w: { label: "Capacidade frigorífica", unit: "W" },
  compressor_power_w: { label: "Potência do compressor", unit: "W" },
  cop: { label: "COP do compressor", unit: "adimensional" },
  total_power_w: { label: "Potência total do sistema (comp + fans)", unit: "W" },
  cop_system: { label: "COP real do sistema (comp + fans)", unit: "adimensional" },
  q_cond_w: { label: "Calor rejeitado no condensador", unit: "W" },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function classifyFitQuality(rSquared: number): string {
  if (rSquared >= 0.999) return "excellent";
  if (rSquared >= 0.995) return "good";
  if (rSquared >= 0.98) return "acceptable";
  return "poor";
}

function buildElectricalData(record: ProductTechnicalRecord): CatalogElectricalData | undefined {
  const ea = record.electrical_analysis;
  if (!ea) return undefined;

  const copSystem = ea.cop_system ?? 0;
  const eerBtuWh = copSystem * 3.412; // 1 W = 3.412 BTU/h
  const fansTotalPower = (ea.evap_fan_power_w ?? 0) + (ea.cond_fan_power_w ?? 0);

  return {
    total_power_w: ea.total_electrical_power_w,
    compressor_power_w: ea.compressor_power_w,
    fans_total_power_w: fansTotalPower,
    estimated_current_a: ea.total_current_a,
    voltage_v: ea.voltage_v,
    phases: ea.phases,
    power_factor: ea.power_factor,
    cop_system: copSystem,
    eer_btu_wh: Math.round(eerBtuWh * 100) / 100,
  };
}

function buildPerformanceCurve(record: ProductTechnicalRecord): CatalogPerformancePoint[] {
  return (record.performance_curve?.points ?? []).map((point) => ({
    evap_temp_c: point.evap_temp_c,
    cond_temp_c: point.cond_temp_c,
    capacity_w: point.capacity_w,
    compressor_power_w: point.compressor_power_w,
    total_power_w: point.total_power_w ?? point.compressor_power_w,
    cop_compressor: point.cop,
    cop_system: point.cop_system ?? point.cop,
    q_cond_w: point.q_cond_w,
    status: point.status,
  }));
}

function buildPolynomialCoefficients(record: ProductTechnicalRecord): CatalogPolynomialSet[] {
  return (record.polynomial_coefficients?.coefficients ?? []).map((coefSet) => {
    const meta = POLYNOMIAL_TARGET_META[coefSet.target] ?? {
      label: coefSet.target,
      unit: "—",
    };

    // PolynomialCoefficients é um objeto {a0..a5} — converter para array C1–C6
    const c = coefSet.coefficients;
    const coeffArray = [c.a0, c.a1, c.a2, c.a3, c.a4, c.a5];

    // FitQuality usa r2 (não r_squared)
    const r2 = coefSet.fit_quality?.r2 ?? 0;

    return {
      target: coefSet.target,
      target_label: meta.label,
      unit: meta.unit,
      coefficients: coeffArray,
      r_squared: r2,
      used_points: record.polynomial_coefficients?.used_points ?? 0,
      fit_quality: classifyFitQuality(r2),
    };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Função principal de exportação
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Gera o data sheet completo da máquina a partir do ProductTechnicalRecord.
 *
 * O MachineDatasheetExport é o formato padronizado para:
 * - Integração com ferramentas de cálculo de carga térmica
 * - Acesso por terceiros (distribuidores, assistência técnica) via API REST
 * - Geração de catálogo de produto aprovado
 * - Alimentação do Hub de Start-up
 *
 * @param record - Registro técnico do produto (saída do buildProductTechnicalRecord)
 * @param options - Opções de exportação (quais seções incluir)
 * @returns MachineDatasheetExport pronto para serialização JSON
 */
export function exportMachineDatasheet(
  input: { record: ProductTechnicalRecord; options?: CatalogExportOptions },
): MachineDatasheetExport {
  const record = input.record;
  const options = input.options ?? {};
  const {
    schema_version = "cncoils-machine-datasheet-v1",
    include_startup_reference = true,
    include_electrical = true,
    include_validation = true,
    include_performance_curve = true,
  } = options;

  const warnings: string[] = [...(record.warnings ?? [])];

  // Validações básicas
  if (!record.identity?.id) {
    warnings.push("exportMachineDatasheet: identity.id ausente — export pode estar incompleto.");
  }
  if (!record.identity?.model) {
    warnings.push("exportMachineDatasheet: identity.model ausente.");
  }

  // Análise elétrica
  const electrical = include_electrical ? buildElectricalData(record) : undefined;
  if (include_electrical && !electrical) {
    warnings.push(
      "exportMachineDatasheet: electrical_analysis ausente no record — dados elétricos não incluídos. " +
        "Certifique-se de que CompressorSpec contém motor_current_a ou power_w.",
    );
  }

  // Curva de performance
  const performanceCurve = include_performance_curve ? buildPerformanceCurve(record) : undefined;
  const approvedPoints = (performanceCurve ?? []).filter((p) => p.status === "approved").length;
  if (include_performance_curve && approvedPoints === 0) {
    warnings.push(
      "exportMachineDatasheet: nenhum ponto aprovado na curva de performance — produto pode não estar validado.",
    );
  }

  // Coeficientes polinomiais
  const polynomialCoefficients = buildPolynomialCoefficients(record);
  const hasCopSystem = polynomialCoefficients.some((c) => c.target === "cop_system");
  const hasTotalPower = polynomialCoefficients.some((c) => c.target === "total_power_w");
  if (!hasCopSystem) {
    warnings.push(
      "exportMachineDatasheet: polinômio cop_system ausente — integração com carga térmica usará cop do compressor isolado.",
    );
  }
  if (!hasTotalPower) {
    warnings.push(
      "exportMachineDatasheet: polinômio total_power_w ausente — dimensionamento elétrico pode estar subestimado.",
    );
  }

  // Status de validação
  const validationStatus = record.validation?.final_status ?? "rejected";

  return {
    schema_version,
    exported_at: new Date().toISOString(),
    product: {
      id: record.identity?.id ?? "",
      model: record.identity?.model ?? "",
      family: record.identity?.family ?? "",
      line: record.identity?.line ?? "",
      refrigerant: record.identity?.refrigerant ?? "",
      application: record.identity?.application,
    },
    operating_limits: record.operating_limits,
    validation_status: validationStatus,
    electrical,
    performance_curve: include_performance_curve ? performanceCurve : undefined,
    polynomial_sets: polynomialCoefficients.length > 0 ? polynomialCoefficients : undefined,
    polynomial_coefficients: polynomialCoefficients.length > 0 ? polynomialCoefficients : undefined,
    startup_reference: include_startup_reference ? record.startup_reference : undefined,
    machine_validation: include_validation ? record.machine_validation : undefined,
    warnings,
    traceability: record.traceability,
  };
}
