/**
 * startupHubService.ts
 * Sprint 5 — Hub de Start-up
 *
 * Serviço responsável por:
 * 1. Fornecer a planilha de referências de start-up de um produto pelo modelo
 * 2. Receber medições em campo do técnico e gerar o relatório de comissionamento
 * 3. Calcular o status PASS/WARNING/FAIL de cada parâmetro medido
 * 4. Determinar o status final do comissionamento (approved/conditional/rejected/incomplete)
 */

import type {
  StartupReferenceSheet,
  StartupParameter,
  StartupParameterStatus,
  StartupFieldMeasurements,
  CommissioningParameterResult,
  CommissioningGroupResult,
  CommissioningReport,
  CommissioningReportInput,
  CommissioningStatus,
} from "../domain/types";

// ─── UUID simples (sem dependência externa) ──────────────────────────────────
function generateId(): string {
  const hex = () => Math.floor(Math.random() * 0x10000).toString(16).padStart(4, "0");
  return `${hex()}${hex()}-${hex()}-4${hex().slice(1)}-${hex()}-${hex()}${hex()}${hex()}`;
}

// ─── Comparação de parâmetro com referência ──────────────────────────────────

/**
 * Compara um valor medido com a referência e retorna o status e diagnóstico.
 */
export function compareParameterWithReference(
  param: StartupParameter,
  measuredValue: number,
): CommissioningParameterResult {
  const deviation = measuredValue - param.reference_value;
  const deviation_pct =
    param.reference_value !== 0
      ? (deviation / Math.abs(param.reference_value)) * 100
      : 0;

  let status: StartupParameterStatus;
  let diagnosis: string | null = null;

  if (measuredValue >= param.tolerance_min && measuredValue <= param.tolerance_max) {
    status = "pass";
  } else {
    // Determina severidade pelo desvio percentual
    const absDev = Math.abs(deviation_pct);
    if (absDev <= 20) {
      status = "warning";
    } else {
      status = "fail";
    }
    diagnosis = param.diagnosis_if_out_of_range;
  }

  return {
    parameter_id: param.id,
    label: param.label,
    unit: param.unit,
    reference_value: param.reference_value,
    measured_value: measuredValue,
    deviation: Math.round(deviation * 1000) / 1000,
    deviation_pct: Math.round(deviation_pct * 10) / 10,
    status,
    diagnosis,
    measurement_instruction: param.measurement_instruction,
  };
}

// ─── Status do grupo ─────────────────────────────────────────────────────────

/**
 * Determina o status geral de um grupo (pior status entre os parâmetros medidos).
 */
export function resolveGroupStatus(
  results: CommissioningParameterResult[],
): StartupParameterStatus {
  const measured = results.filter((r) => r.status !== "not_measured");
  if (measured.length === 0) return "not_measured";
  if (measured.some((r) => r.status === "fail")) return "fail";
  if (measured.some((r) => r.status === "warning")) return "warning";
  return "pass";
}

// ─── Status final do comissionamento ─────────────────────────────────────────

/**
 * Determina o status final do comissionamento com base nos grupos.
 */
export function resolveCommissioningStatus(
  groups: CommissioningGroupResult[],
  totalParameters: number,
  measuredCount: number,
): CommissioningStatus {
  // Se menos de 50% dos parâmetros foram medidos → incompleto
  if (measuredCount < totalParameters * 0.5) return "incomplete";

  const allResults = groups.flatMap((g) => g.parameters);
  const failCount = allResults.filter((r) => r.status === "fail").length;
  const warningCount = allResults.filter((r) => r.status === "warning").length;

  if (failCount > 0) return "rejected";
  if (warningCount > 0) return "conditional";
  return "approved";
}

// ─── Geração do relatório de comissionamento ─────────────────────────────────

/**
 * Gera o relatório completo de comissionamento a partir das medições do técnico.
 *
 * @param input - Dados de entrada: planilha de referência + medições + dados do técnico
 * @returns CommissioningReport — relatório estruturado pronto para salvar e exibir
 */
export function generateCommissioningReport(
  input: CommissioningReportInput,
): CommissioningReport {
  const { reference_sheet, measurements, serial_number, technician_name, location } = input;
  const technician_notes = input.technician_notes ?? "";
  const now = new Date().toISOString();

  const systemWarnings: string[] = [...(reference_sheet.warnings ?? [])];

  // Processar cada grupo
  const groups: CommissioningGroupResult[] = reference_sheet.groups.map((group) => {
    const paramResults: CommissioningParameterResult[] = group.parameters.map((param) => {
      const measuredValue = measurements[param.id];

      if (measuredValue === undefined || measuredValue === null) {
        // Parâmetro não medido — retornar com status not_measured
        return {
          parameter_id: param.id,
          label: param.label,
          unit: param.unit,
          reference_value: param.reference_value,
          measured_value: param.measured_value ?? 0,
          deviation: 0,
          deviation_pct: 0,
          status: "not_measured" as StartupParameterStatus,
          diagnosis: null,
          measurement_instruction: param.measurement_instruction,
        };
      }

      return compareParameterWithReference(param, measuredValue);
    });

    const groupStatus = resolveGroupStatus(paramResults);

    return {
      group_id: group.group_id,
      group_label: group.group_label,
      group_status: groupStatus,
      parameters: paramResults,
    };
  });

  // Calcular sumário
  const allParams = groups.flatMap((g) => g.parameters);
  const totalParameters = allParams.length;
  const measured = allParams.filter((p) => p.status !== "not_measured").length;
  const passed = allParams.filter((p) => p.status === "pass").length;
  const warnings = allParams.filter((p) => p.status === "warning").length;
  const failed = allParams.filter((p) => p.status === "fail").length;

  // Avisos automáticos
  if (measured < totalParameters) {
    systemWarnings.push(
      `${totalParameters - measured} parâmetro(s) não foram medidos. O relatório está incompleto.`,
    );
  }
  if (failed > 0) {
    systemWarnings.push(
      `${failed} parâmetro(s) fora da faixa aceitável. Verificar diagnósticos antes de liberar a máquina.`,
    );
  }

  const finalStatus = resolveCommissioningStatus(groups, totalParameters, measured);

  return {
    report_id: generateId(),
    machine_model: reference_sheet.machine_model,
    serial_number,
    technician_name,
    commissioned_at: now,
    location,
    final_status: finalStatus,
    summary: {
      total_parameters: totalParameters,
      measured,
      passed,
      warnings,
      failed,
    },
    groups,
    technician_notes,
    system_warnings: systemWarnings,
    generated_at: now,
  };
}

// ─── Validação de entrada ─────────────────────────────────────────────────────

export interface StartupHubValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Valida a entrada do relatório de comissionamento antes de processar.
 */
export function validateCommissioningInput(
  input: Partial<CommissioningReportInput>,
): StartupHubValidationResult {
  const errors: string[] = [];

  if (!input.reference_sheet) {
    errors.push("reference_sheet é obrigatório.");
  }
  if (!input.measurements || Object.keys(input.measurements).length === 0) {
    errors.push("measurements não pode ser vazio.");
  }
  if (!input.serial_number || input.serial_number.trim() === "") {
    errors.push("serial_number é obrigatório.");
  }
  if (!input.technician_name || input.technician_name.trim() === "") {
    errors.push("technician_name é obrigatório.");
  }
  if (!input.location || input.location.trim() === "") {
    errors.push("location é obrigatório.");
  }

  return { valid: errors.length === 0, errors };
}

// ─── Resumo legível do relatório ─────────────────────────────────────────────

/**
 * Gera um resumo textual do relatório para exibição rápida.
 */
export function summarizeCommissioningReport(report: CommissioningReport): string {
  const statusLabel: Record<CommissioningStatus, string> = {
    approved: "APROVADO",
    conditional: "CONDICIONAL",
    rejected: "REPROVADO",
    incomplete: "INCOMPLETO",
  };

  const lines = [
    `=== RELATÓRIO DE COMISSIONAMENTO ===`,
    `Modelo: ${report.machine_model}`,
    `Nº de Série: ${report.serial_number}`,
    `Técnico: ${report.technician_name}`,
    `Local: ${report.location}`,
    `Data: ${new Date(report.commissioned_at).toLocaleString("pt-BR")}`,
    `Status Final: ${statusLabel[report.final_status]}`,
    ``,
    `Resumo: ${report.summary.measured}/${report.summary.total_parameters} medidos`,
    `  ✓ Aprovados: ${report.summary.passed}`,
    `  ⚠ Alertas:  ${report.summary.warnings}`,
    `  ✗ Reprovados: ${report.summary.failed}`,
  ];

  if (report.system_warnings.length > 0) {
    lines.push(``, `Avisos do sistema:`);
    report.system_warnings.forEach((w) => lines.push(`  • ${w}`));
  }

  if (report.technician_notes) {
    lines.push(``, `Observações do técnico: ${report.technician_notes}`);
  }

  return lines.join("\n");
}
