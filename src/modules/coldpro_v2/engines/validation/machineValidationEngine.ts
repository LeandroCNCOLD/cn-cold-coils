/**
 * machineValidationEngine.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Motor de validação de máquina completa (plug-in, rack, split, etc.).
 *
 * Recebe a especificação nominal da máquina (MachineSpec) e os componentes do
 * sistema (SystemComponentsInput), roda o equilíbrio acoplado via
 * evaluateSystemEquilibrium, e avalia 8 critérios de aceitação com status
 * PASS / WARNING / FAIL.
 *
 * Retorna um MachineValidationReport estruturado, pronto para:
 *   - Exibição no Hub de Validação
 *   - Exportação para catálogo de produto
 *   - Integração com ferramentas de cálculo de carga térmica
 *   - Base para o futuro Hub de Start-up de Sistema
 *
 * Critérios avaliados:
 *   1. capacity_check       — Capacidade frigorífica vs. nominal
 *   2. power_check          — Potência elétrica total vs. nominal
 *   3. cop_system_check     — COP do sistema vs. nominal
 *   4. balance_error_check  — Erro de balanço térmico
 *   5. compressor_util_check — Utilização do compressor
 *   6. condenser_util_check  — Utilização do condensador
 *   7. evaporator_util_check — Utilização do evaporador
 *   8. equilibrium_check    — Status geral do equilíbrio
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type {
  MachineAcceptanceCriteria,
  MachineSpec,
  MachineValidationReport,
  SystemComponentsInput,
  ValidationCriterionResult,
  ValidationStatus,
} from "../../domain/types";
import {
  calculateElectricalAnalysis,
} from "../electrical/electricalAnalysisEngine";
import { evaluateSystemEquilibrium } from "../equilibrium/systemEquilibriumEngine";

// ─────────────────────────────────────────────────────────────────────────────
// Versão do motor
// ─────────────────────────────────────────────────────────────────────────────

const ENGINE_VERSION = "2.0.0";

// ─────────────────────────────────────────────────────────────────────────────
// Critérios de aceitação padrão (norma interna CN Coils)
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_ACCEPTANCE_CRITERIA: MachineAcceptanceCriteria = {
  capacity_tolerance_pct: 5,
  power_tolerance_pct: 8,
  cop_tolerance_pct: 10,
  balance_error_max_pct: 5,
  compressor_utilization_max_pct: 100,
  condenser_utilization_max_pct: 100,
  evaporator_utilization_max_pct: 110,
  max_discharge_temp_c: 130,
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers internos
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Mescla os critérios padrão com os critérios configurados na MachineSpec.
 */
function resolveCriteria(spec: MachineSpec): MachineAcceptanceCriteria {
  return { ...DEFAULT_ACCEPTANCE_CRITERIA, ...(spec.acceptance_criteria ?? {}) };
}

/**
 * Calcula o desvio percentual de um valor calculado em relação a uma referência.
 * Positivo = acima da referência, negativo = abaixo.
 */
function deviationPct(calculated: number, reference: number): number {
  if (reference === 0) return 0;
  return ((calculated - reference) / reference) * 100;
}

/**
 * Constrói um ValidationCriterionResult completo.
 */
function buildCriterion(params: {
  criterion_id: string;
  label: string;
  calculated_value: number;
  reference_value: number;
  unit: string;
  status: ValidationStatus;
  message: string;
  diagnosis?: string;
}): ValidationCriterionResult {
  return {
    criterion_id: params.criterion_id,
    label: params.label,
    calculated_value: params.calculated_value,
    reference_value: params.reference_value,
    unit: params.unit,
    deviation_pct: deviationPct(params.calculated_value, params.reference_value),
    status: params.status,
    message: params.message,
    diagnosis: params.diagnosis,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Os 8 critérios de validação
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Critério 1 — Capacidade frigorífica
 * Verifica se a capacidade calculada está dentro da tolerância em relação ao nominal.
 */
function checkCapacity(
  capacity_w: number,
  nominal_capacity_w: number,
  tolerance_pct: number,
): ValidationCriterionResult {
  const dev = deviationPct(capacity_w, nominal_capacity_w);
  const absDev = Math.abs(dev);

  let status: ValidationStatus;
  let message: string;
  let diagnosis: string | undefined;

  if (absDev <= tolerance_pct) {
    status = "pass";
    message = `Capacidade ${(capacity_w / 1000).toFixed(2)} kW — dentro da tolerância ±${tolerance_pct}% (desvio: ${dev.toFixed(1)}%).`;
  } else if (absDev <= tolerance_pct * 1.5) {
    status = "warning";
    message = `Capacidade ${(capacity_w / 1000).toFixed(2)} kW — desvio de ${dev.toFixed(1)}% excede ±${tolerance_pct}% (aviso).`;
    diagnosis =
      dev < 0
        ? "Capacidade abaixo do nominal. Verificar dimensionamento do evaporador ou condições de operação."
        : "Capacidade acima do nominal. Verificar se o compressor está superdimensionado.";
  } else {
    status = "fail";
    message = `Capacidade ${(capacity_w / 1000).toFixed(2)} kW — desvio de ${dev.toFixed(1)}% excede limite ±${tolerance_pct * 1.5}%.`;
    diagnosis =
      dev < 0
        ? "Capacidade significativamente abaixo do nominal. Revisar seleção do compressor, evaporador e condições de teste."
        : "Capacidade significativamente acima do nominal. Revisar dados nominais ou condições de simulação.";
  }

  return buildCriterion({
    criterion_id: "capacity_check",
    label: "Capacidade Frigorífica",
    calculated_value: capacity_w,
    reference_value: nominal_capacity_w,
    unit: "W",
    status,
    message,
    diagnosis,
  });
}

/**
 * Critério 2 — Potência elétrica total
 * Verifica se a potência total (compressor + ventiladores) está dentro da tolerância.
 */
function checkPower(
  total_power_w: number,
  nominal_power_w: number,
  tolerance_pct: number,
): ValidationCriterionResult {
  const dev = deviationPct(total_power_w, nominal_power_w);
  const absDev = Math.abs(dev);

  let status: ValidationStatus;
  let message: string;
  let diagnosis: string | undefined;

  if (absDev <= tolerance_pct) {
    status = "pass";
    message = `Potência total ${total_power_w.toFixed(0)} W — dentro da tolerância ±${tolerance_pct}% (desvio: ${dev.toFixed(1)}%).`;
  } else if (absDev <= tolerance_pct * 1.5) {
    status = "warning";
    message = `Potência total ${total_power_w.toFixed(0)} W — desvio de ${dev.toFixed(1)}% excede ±${tolerance_pct}% (aviso).`;
    diagnosis =
      dev > 0
        ? "Potência acima do nominal. Verificar tensão de alimentação, eficiência do compressor e ventiladores."
        : "Potência abaixo do nominal. Verificar se todos os consumidores elétricos foram incluídos.";
  } else {
    status = "fail";
    message = `Potência total ${total_power_w.toFixed(0)} W — desvio de ${dev.toFixed(1)}% excede limite ±${(tolerance_pct * 1.5).toFixed(0)}%.`;
    diagnosis =
      dev > 0
        ? "Potência significativamente acima do nominal. Revisar seleção do compressor e ventiladores ou verificar tensão de alimentação."
        : "Potência significativamente abaixo do nominal. Verificar se ventiladores e compressor estão corretamente especificados.";
  }

  return buildCriterion({
    criterion_id: "power_check",
    label: "Potência Elétrica Total",
    calculated_value: total_power_w,
    reference_value: nominal_power_w,
    unit: "W",
    status,
    message,
    diagnosis,
  });
}

/**
 * Critério 3 — COP do sistema
 * Verifica se o COP real (Q / W_total) está dentro da tolerância em relação ao nominal.
 */
function checkCopSystem(
  cop_system: number,
  nominal_cop: number,
  tolerance_pct: number,
): ValidationCriterionResult {
  const dev = deviationPct(cop_system, nominal_cop);
  // COP abaixo do nominal é sempre negativo — tolerância é unilateral para baixo
  const deviation = nominal_cop - cop_system;
  const deviationPctVal = (deviation / nominal_cop) * 100;

  let status: ValidationStatus;
  let message: string;
  let diagnosis: string | undefined;

  if (deviationPctVal <= tolerance_pct) {
    status = "pass";
    message = `COP do sistema ${cop_system.toFixed(2)} — dentro da tolerância -${tolerance_pct}% (desvio: ${dev.toFixed(1)}%).`;
  } else if (deviationPctVal <= tolerance_pct * 1.5) {
    status = "warning";
    message = `COP do sistema ${cop_system.toFixed(2)} — desvio de ${dev.toFixed(1)}% abaixo do nominal ${nominal_cop.toFixed(2)} (aviso).`;
    diagnosis =
      "COP abaixo do nominal. Verificar se os ventiladores estão incluídos no balanço elétrico e se as condições de operação estão corretas.";
  } else {
    status = "fail";
    message = `COP do sistema ${cop_system.toFixed(2)} — desvio de ${dev.toFixed(1)}% excede limite -${(tolerance_pct * 1.5).toFixed(0)}% abaixo do nominal.`;
    diagnosis =
      "COP significativamente abaixo do nominal. Revisar seleção do compressor, ventiladores e condições de operação. Verificar se o COP nominal informado inclui os ventiladores.";
  }

  return buildCriterion({
    criterion_id: "cop_system_check",
    label: "COP do Sistema",
    calculated_value: cop_system,
    reference_value: nominal_cop,
    unit: "adim.",
    status,
    message,
    diagnosis,
  });
}

/**
 * Critério 4 — Erro de balanço térmico
 * Verifica se o erro de balanço entre Q_evap e Q_cond está dentro do limite.
 */
function checkBalanceError(
  balance_error_pct: number,
  max_balance_error_pct: number,
): ValidationCriterionResult {
  let status: ValidationStatus;
  let message: string;
  let diagnosis: string | undefined;

  if (balance_error_pct <= max_balance_error_pct) {
    status = "pass";
    message = `Erro de balanço térmico ${balance_error_pct.toFixed(1)}% — dentro do limite ${max_balance_error_pct}%.`;
  } else if (balance_error_pct <= max_balance_error_pct * 2) {
    status = "warning";
    message = `Erro de balanço térmico ${balance_error_pct.toFixed(1)}% — acima do limite ${max_balance_error_pct}% (aviso).`;
    diagnosis =
      "Componentes possivelmente dimensionados para condições diferentes. Verificar se evaporador, compressor e condensador foram selecionados para as mesmas temperaturas de operação.";
  } else {
    status = "fail";
    message = `Erro de balanço térmico ${balance_error_pct.toFixed(1)}% — excede limite crítico ${max_balance_error_pct * 2}%.`;
    diagnosis =
      "Desequilíbrio térmico severo. Revisar seleção de todos os componentes. Verificar se as temperaturas de referência do compressor, evaporador e condensador são compatíveis.";
  }

  return buildCriterion({
    criterion_id: "balance_error_check",
    label: "Erro de Balanço Térmico",
    calculated_value: balance_error_pct,
    reference_value: max_balance_error_pct,
    unit: "%",
    status,
    message,
    diagnosis,
  });
}

/**
 * Critério 5 — Utilização do compressor
 */
function checkCompressorUtilization(
  compressor_pct: number,
  max_pct: number,
): ValidationCriterionResult {
  let status: ValidationStatus;
  let message: string;
  let diagnosis: string | undefined;

  if (compressor_pct <= max_pct * 0.95) {
    status = "pass";
    message = `Compressor em ${compressor_pct.toFixed(0)}% da capacidade nominal — dentro do limite.`;
  } else if (compressor_pct <= max_pct) {
    status = "warning";
    message = `Compressor em ${compressor_pct.toFixed(0)}% da capacidade nominal — próximo do limite ${max_pct}%.`;
    diagnosis = "Compressor operando próximo ao limite. Considerar margem de segurança adicional.";
  } else {
    status = "fail";
    message = `Compressor em ${compressor_pct.toFixed(0)}% da capacidade nominal — excede limite ${max_pct}%.`;
    diagnosis =
      "Compressor subdimensionado para as condições de operação. Selecionar compressor com maior capacidade ou reduzir a carga do evaporador.";
  }

  return buildCriterion({
    criterion_id: "compressor_util_check",
    label: "Utilização do Compressor",
    calculated_value: compressor_pct,
    reference_value: max_pct,
    unit: "%",
    status,
    message,
    diagnosis,
  });
}

/**
 * Critério 6 — Utilização do condensador
 */
function checkCondenserUtilization(
  condenser_pct: number,
  max_pct: number,
): ValidationCriterionResult {
  let status: ValidationStatus;
  let message: string;
  let diagnosis: string | undefined;

  if (condenser_pct <= max_pct * 0.95) {
    status = "pass";
    message = `Condensador em ${condenser_pct.toFixed(0)}% da capacidade de rejeição — dentro do limite.`;
  } else if (condenser_pct <= max_pct) {
    status = "warning";
    message = `Condensador em ${condenser_pct.toFixed(0)}% da capacidade de rejeição — próximo do limite ${max_pct}%.`;
    diagnosis =
      "Condensador operando próximo ao limite. Verificar limpeza das aletas e temperatura ambiente real.";
  } else {
    status = "fail";
    message = `Condensador em ${condenser_pct.toFixed(0)}% da capacidade de rejeição — excede limite ${max_pct}%.`;
    diagnosis =
      "Condensador subdimensionado. Selecionar condensador com maior capacidade de rejeição ou reduzir temperatura ambiente de projeto.";
  }

  return buildCriterion({
    criterion_id: "condenser_util_check",
    label: "Utilização do Condensador",
    calculated_value: condenser_pct,
    reference_value: max_pct,
    unit: "%",
    status,
    message,
    diagnosis,
  });
}

/**
 * Critério 7 — Utilização do evaporador
 */
function checkEvaporatorUtilization(
  evaporator_pct: number,
  max_pct: number,
): ValidationCriterionResult {
  let status: ValidationStatus;
  let message: string;
  let diagnosis: string | undefined;

  if (evaporator_pct <= max_pct * 0.9) {
    status = "pass";
    message = `Evaporador em ${evaporator_pct.toFixed(0)}% da capacidade — dentro do limite.`;
  } else if (evaporator_pct <= max_pct) {
    status = "warning";
    message = `Evaporador em ${evaporator_pct.toFixed(0)}% da capacidade — próximo do limite ${max_pct}%.`;
    diagnosis =
      "Evaporador operando próximo ao limite. Verificar espaçamento de aletas e vazão de ar.";
  } else {
    status = "fail";
    message = `Evaporador em ${evaporator_pct.toFixed(0)}% da capacidade — excede limite ${max_pct}%.`;
    diagnosis =
      "Evaporador subdimensionado. Aumentar área de troca ou reduzir espaçamento de aletas.";
  }

  return buildCriterion({
    criterion_id: "evaporator_util_check",
    label: "Utilização do Evaporador",
    calculated_value: evaporator_pct,
    reference_value: max_pct,
    unit: "%",
    status,
    message,
    diagnosis,
  });
}

/**
 * Critério 8 — Status geral do equilíbrio
 * Verifica se o motor de equilíbrio aprovou o sistema.
 */
function checkEquilibriumStatus(
  equilibrium_status: "approved" | "warning" | "rejected",
  bottleneck_codes: string[],
): ValidationCriterionResult {
  let status: ValidationStatus;
  let message: string;
  let diagnosis: string | undefined;

  if (equilibrium_status === "approved") {
    status = "pass";
    message = "Sistema em equilíbrio — todos os componentes dentro dos limites operacionais.";
  } else if (equilibrium_status === "warning") {
    status = "warning";
    message = `Sistema em equilíbrio com avisos — ${bottleneck_codes.length > 0 ? bottleneck_codes.join(", ") : "verificar avisos do motor"}.`;
    diagnosis =
      "Revisar os avisos do motor de equilíbrio. O sistema opera, mas com componentes próximos aos limites.";
  } else {
    status = "fail";
    message = `Sistema rejeitado pelo motor de equilíbrio — gargalos: ${bottleneck_codes.join(", ")}.`;
    diagnosis =
      "O sistema não atingiu equilíbrio dentro dos limites operacionais. Revisar seleção de componentes conforme os gargalos identificados.";
  }

  return buildCriterion({
    criterion_id: "equilibrium_check",
    label: "Equilíbrio do Sistema",
    calculated_value: equilibrium_status === "approved" ? 1 : equilibrium_status === "warning" ? 0.5 : 0,
    reference_value: 1,
    unit: "status",
    status,
    message,
    diagnosis,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Determinação do status final
// ─────────────────────────────────────────────────────────────────────────────

function determineFinalStatus(
  criteria: ValidationCriterionResult[],
): "approved" | "conditional" | "rejected" {
  const hasFail = criteria.some((c) => c.status === "fail");
  const hasWarning = criteria.some((c) => c.status === "warning");

  if (hasFail) return "rejected";
  if (hasWarning) return "conditional";
  return "approved";
}

// ─────────────────────────────────────────────────────────────────────────────
// Geração de recomendações consolidadas
// ─────────────────────────────────────────────────────────────────────────────

function buildRecommendations(criteria: ValidationCriterionResult[]): string[] {
  const recs: string[] = [];

  for (const c of criteria) {
    if ((c.status === "fail" || c.status === "warning") && c.diagnosis) {
      recs.push(`[${c.label}] ${c.diagnosis}`);
    }
  }

  if (recs.length === 0) {
    recs.push("Todos os critérios aprovados. Nenhum ajuste necessário.");
  }

  return recs;
}

// ─────────────────────────────────────────────────────────────────────────────
// Função principal exportada
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Valida uma máquina completa contra sua especificação nominal.
 *
 * @param spec       Especificação nominal da máquina (modelo, capacidade, COP, etc.)
 * @param components Componentes do sistema (compressor, evaporador, condensador, ventiladores)
 * @returns          MachineValidationReport com status PASS/WARNING/FAIL por critério
 *
 * @example
 * ```ts
 * const report = validateMachine(machineSpec, systemComponents);
 * console.log(report.final_status); // "approved" | "conditional" | "rejected"
 * report.criteria.forEach(c => console.log(c.criterion_id, c.status));
 * ```
 */
export function validateMachine(
  spec: MachineSpec,
  components: SystemComponentsInput,
): MachineValidationReport {
  // 1. Resolver critérios de aceitação (padrão + overrides da spec)
  const criteria_config = resolveCriteria(spec);

  // 2. Rodar o motor de equilíbrio acoplado
  const equilibrium = evaluateSystemEquilibrium(components);

  // 3. Calcular análise elétrica completa (compressor + ventiladores)
  const electrical = calculateElectricalAnalysis({
    system: components,
    q_evap_w: equilibrium.thermal_balance.q_evap_w,
  });

  // 4. Derivar total_power_w e cop_system do resultado elétrico
  const total_power_w = electrical.total_electrical_power_w;
  const cop_system = electrical.cop_system;

  // 5. Avaliar os 8 critérios
  const criteriaResults: ValidationCriterionResult[] = [
    checkCapacity(
      equilibrium.thermal_balance.q_evap_w,
      spec.nominal_capacity_w,
      criteria_config.capacity_tolerance_pct,
    ),
    checkPower(
      total_power_w,
      spec.nominal_power_w,
      criteria_config.power_tolerance_pct,
    ),
    checkCopSystem(
      cop_system,
      spec.nominal_cop,
      criteria_config.cop_tolerance_pct,
    ),
    checkBalanceError(
      equilibrium.thermal_balance.balance_error_pct,
      criteria_config.balance_error_max_pct,
    ),
    checkCompressorUtilization(
      equilibrium.utilization.compressor_pct,
      criteria_config.compressor_utilization_max_pct,
    ),
    checkCondenserUtilization(
      equilibrium.utilization.condenser_pct,
      criteria_config.condenser_utilization_max_pct,
    ),
    checkEvaporatorUtilization(
      equilibrium.utilization.evaporator_pct,
      criteria_config.evaporator_utilization_max_pct,
    ),
    checkEquilibriumStatus(
      equilibrium.status,
      equilibrium.bottleneck_codes,
    ),
  ];

  // 6. Determinar status final
  const final_status = determineFinalStatus(criteriaResults);

  // 7. Gerar recomendações consolidadas
  const recommendations = buildRecommendations(criteriaResults);

  // 8. Montar resumo
  const summary = {
    total_criteria: criteriaResults.length,
    passed: criteriaResults.filter((c) => c.status === "pass").length,
    warnings: criteriaResults.filter((c) => c.status === "warning").length,
    failed: criteriaResults.filter((c) => c.status === "fail").length,
  };

  return {
    machine_spec: spec,
    final_status,
    criteria: criteriaResults,
    operating_point: {
      evap_temp_c: components.compressor.evap_temp_c,
      cond_temp_c: components.compressor.cond_temp_c,
      capacity_w: equilibrium.thermal_balance.q_evap_w,
      total_power_w,
      cop_system,
      balance_error_pct: equilibrium.thermal_balance.balance_error_pct,
    },
    electrical_analysis: electrical,
    summary,
    recommendations,
    traceability: {
      validated_at: new Date().toISOString(),
      engine_version: ENGINE_VERSION,
    },
  };
}

/**
 * Retorna os critérios de aceitação padrão para inspeção ou exibição na UI.
 */
export function getDefaultAcceptanceCriteria(): MachineAcceptanceCriteria {
  return { ...DEFAULT_ACCEPTANCE_CRITERIA };
}
