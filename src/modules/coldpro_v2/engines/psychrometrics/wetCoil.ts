import type { WetCoilInput, WetCoilResult } from "../../domain/types";
import { humidityRatio, enthalpyMoistAir, dewPoint, cpMoistAir } from "./psychrometricCore";

/**
 * Calcula o desempenho de uma serpentina úmida (wet coil).
 *
 * Correção C5: em vez de fixar T_air_out = T_surf + 2°C, itera T_air_out
 * pelo balanço de energia usando efetividade NTU quando U·A estão disponíveis.
 * Se U_w_m2k e A_m2 não forem fornecidos, usa a heurística T_surf + 2°C (legado).
 */
export function calculateWetCoil(input: WetCoilInput & {
  /** Coeficiente global de transferência de calor [W/m²K] — opcional */
  U_w_m2k?: number;
  /** Área de troca de calor [m²] — opcional */
  A_m2?: number;
}): WetCoilResult {
  const P_atm = input.P_atm ?? 101325;
  const warnings: string[] = [];

  const { W: W_in, warnings: wWarn } = humidityRatio(input.T_air_in, input.RH_in, P_atm);
  warnings.push(...wWarn);

  const h_in = enthalpyMoistAir(input.T_air_in, W_in);
  const { T_dp, warnings: dpWarn } = dewPoint(input.T_air_in, input.RH_in);
  warnings.push(...dpWarn);

  if (input.T_surface >= T_dp) {
    return {
      mode: "dry",
      T_air_out: input.T_air_in,
      RH_out: input.RH_in,
      W_in,
      W_out: W_in,
      water_removed_kg_s: 0,
      latent_load_w: 0,
      sensible_load_w: 0,
      total_load_w: 0,
      warnings: [...warnings, "Superfície acima do ponto de orvalho. Operação em modo seco."],
    };
  }

  // ── Calcular T_air_out ──────────────────────────────────────────────────────
  const cp_umido_kJ = cpMoistAir(W_in);
  const cp_ar = cp_umido_kJ * 1000; // J/(kg·K)
  let T_air_out: number;

  const U = input.U_w_m2k;
  const A = input.A_m2;

  if (U && U > 0 && A && A > 0 && input.air_mass_flow_kg_s > 0) {
    // Efetividade NTU para fluido a temperatura constante: ε = 1 − exp(−NTU)
    const NTU = (U * A) / (input.air_mass_flow_kg_s * cp_ar);
    const effectiveness = 1 - Math.exp(-NTU);
    T_air_out = input.T_air_in - effectiveness * (input.T_air_in - input.T_surface);
    T_air_out = Math.max(T_air_out, input.T_surface); // 2ª lei
  } else {
    // Fallback legado: heurística conservadora
    T_air_out = input.T_surface + 2;
    warnings.push("wetCoil: U·A não fornecidos — usando T_air_out = T_surf + 2°C (legado)");
  }

  const RH_out = 1.0;

  const { W: W_out } = humidityRatio(T_air_out, 1.0, P_atm);
  const h_out = enthalpyMoistAir(T_air_out, W_out);

  let m_water = input.air_mass_flow_kg_s * (W_in - W_out);
  if (m_water < 0) {
    warnings.push("W_out > W_in. Verificar dados de entrada. m_water forçado a zero.");
    m_water = 0;
  }

  const L_condensacao = 2501000 - 2361 * input.T_surface;
  const L_clamp = Math.max(2400000, Math.min(2501000, L_condensacao));
  const latent_load_w = m_water * L_clamp;

  const sensible_load_w =
    input.air_mass_flow_kg_s * cp_ar * (input.T_air_in - T_air_out);

  const total_load_w = input.air_mass_flow_kg_s * (h_in - h_out) * 1000;

  return {
    mode: "wet",
    T_air_out,
    RH_out,
    W_in,
    W_out,
    water_removed_kg_s: m_water,
    latent_load_w,
    sensible_load_w,
    total_load_w,
    warnings,
  };
}
