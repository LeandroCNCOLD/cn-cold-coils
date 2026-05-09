import type { OperatingPointInput, OperatingPointResult } from "../types";

/**
 * Resolve o ponto de operação (Te, Tc) a partir do modo de entrada.
 *
 * Modo A: Te e Tc fornecidos diretamente.
 * Modo B: Te = T_room − ΔT_evap; Tc = T_amb + ΔT_cond
 */
export function resolveOperatingPoint(input: OperatingPointInput): OperatingPointResult {
  const warnings: string[] = [];

  if (input.mode === "A") {
    if (input.evap_temp_c >= input.cond_temp_c) {
      warnings.push("Te ≥ Tc — verificar temperaturas de operação");
    }
    return {
      evap_temp_c: input.evap_temp_c,
      cond_temp_c: input.cond_temp_c,
      warnings,
    };
  }

  // Modo B
  const dt_evap = input.dt_evap_k ?? 10;
  const dt_cond = input.dt_cond_k ?? 15;

  const evap_temp_c = input.room_temp_c - dt_evap;
  const cond_temp_c = input.ambient_temp_c + dt_cond;

  if (evap_temp_c >= cond_temp_c) {
    warnings.push("Te calculado ≥ Tc calculado — verificar ΔT ou temperaturas de entrada");
  }

  if (evap_temp_c < -50) {
    warnings.push(`Te = ${evap_temp_c.toFixed(1)}°C muito baixo — verificar ΔT_evap`);
  }

  if (cond_temp_c > 70) {
    warnings.push(`Tc = ${cond_temp_c.toFixed(1)}°C muito alto — verificar ΔT_cond`);
  }

  return { evap_temp_c, cond_temp_c, warnings };
}
