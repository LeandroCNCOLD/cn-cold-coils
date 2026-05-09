import type {
  SystemValidationInput,
  SystemValidationResult,
  SystemAlert,
} from "../types";

/**
 * Valida o sistema completo e calcula COP total.
 *
 * Critérios de validação:
 *  - Balanço térmico: |Q_cond_avail − Q_cond_req| / Q_cond_req < 10%
 *  - COP total > 1.5 (mínimo aceitável para refrigeração comercial)
 *  - Capacidade do evaporador ≥ 90% da capacidade do compressor
 */
export function validateSystem(input: SystemValidationInput): SystemValidationResult {
  const alerts: SystemAlert[] = [];
  const warnings: string[] = [];

  const {
    compressor_capacity_w,
    compressor_power_w,
    evaporator_capacity_w,
    condenser_capacity_w,
    evaporator_fan_power_w = 0,
    condenser_fan_power_w = 0,
  } = input;

  // Potência total do sistema
  const total_power_w = compressor_power_w + evaporator_fan_power_w + condenser_fan_power_w;

  // COP do compressor isolado
  const cop_compressor = compressor_power_w > 0 ? compressor_capacity_w / compressor_power_w : 0;

  // COP total do sistema
  const cop_total = total_power_w > 0 ? evaporator_capacity_w / total_power_w : 0;

  // Calor rejeitado requerido no condensador
  const q_cond_required_w = compressor_capacity_w + compressor_power_w;

  // Balanço térmico
  const thermal_balance_pct =
    q_cond_required_w > 0
      ? ((condenser_capacity_w - q_cond_required_w) / q_cond_required_w) * 100
      : 0;

  // ── Alertas ──────────────────────────────────────────────────────────────

  // Balanço térmico
  if (Math.abs(thermal_balance_pct) > 15) {
    alerts.push({
      level: "error",
      code: "THERMAL_BALANCE_CRITICAL",
      message: `Desequilíbrio térmico crítico: ${thermal_balance_pct.toFixed(1)}% — condensador subdimensionado`,
    });
  } else if (Math.abs(thermal_balance_pct) > 5) {
    alerts.push({
      level: "warning",
      code: "THERMAL_BALANCE_WARNING",
      message: `Desequilíbrio térmico: ${thermal_balance_pct.toFixed(1)}% — verificar dimensionamento do condensador`,
    });
  }

  // COP total
  if (cop_total < 1.5 && cop_total > 0) {
    alerts.push({
      level: "warning",
      code: "COP_LOW",
      message: `COP total = ${cop_total.toFixed(2)} — abaixo de 1.5 (verificar eficiência do sistema)`,
    });
  }

  // Capacidade do evaporador vs compressor
  if (compressor_capacity_w > 0) {
    const evap_ratio = evaporator_capacity_w / compressor_capacity_w;
    if (evap_ratio < 0.85) {
      alerts.push({
        level: "warning",
        code: "EVAP_UNDERSIZED",
        message: `Evaporador fornece apenas ${(evap_ratio * 100).toFixed(0)}% da capacidade do compressor — considerar ampliar geometria`,
      });
    } else if (evap_ratio > 1.20) {
      alerts.push({
        level: "info",
        code: "EVAP_OVERSIZED",
        message: `Evaporador superdimensionado (${(evap_ratio * 100).toFixed(0)}%) — pode reduzir custo`,
      });
    }
  }

  // Status geral
  const hasErrors = alerts.some((a) => a.level === "error");
  const hasWarnings = alerts.some((a) => a.level === "warning");
  const status: SystemValidationResult["status"] = hasErrors
    ? "rejected"
    : hasWarnings
      ? "warning"
      : "approved";

  return {
    cop_total,
    cop_compressor,
    thermal_balance_pct,
    status,
    alerts,
    warnings,
  };
}
