import { buildMoistAirState } from "@/modules/cn_coils/engine_v2/airProperties";

export interface AirProperties {
  density_kg_m3: number;
  cp_j_kg_k: number;
  viscosity_pa_s: number;
  conductivity_w_m_k: number;
  prandtl: number;
}

/**
 * Propriedades do ar em função da temperatura.
 *
 * Quando relative_humidity for fornecido, usa ar úmido via psicrometria
 * ASHRAE (Hyland-Wexler). Sem RH, mantém o comportamento original de ar seco
 * para compatibilidade com chamadas existentes.
 *
 * @param temperature_c  Temperatura de bulbo seco [°C]
 * @param relative_humidity  Umidade relativa [0..1] — opcional
 * @param altitude_m  Altitude [m] — opcional, padrão nível do mar
 */
export function calculateAirProperties(
  temperature_c: number,
  relative_humidity?: number,
  altitude_m = 0,
): AirProperties {
  const T = temperature_c;
  const viscosity_pa_s = 1.716e-5 + 4.9e-8 * T;       // Sutherland linear
  const conductivity_w_m_k = 0.0242 + 0.0000756 * T;

  if (relative_humidity !== undefined) {
    const P_atm = 101325 * Math.pow(1 - altitude_m / 44330, 5.255);
    // buildMoistAirState espera RH em 0..100 → converter de fração para %
    const state = buildMoistAirState(T, relative_humidity * 100, P_atm);
    const cp_j_kg_k = state.cp_J_kgK; // J/(kg·K)
    return {
      density_kg_m3: state.rho_kg_m3,
      cp_j_kg_k,
      viscosity_pa_s,
      conductivity_w_m_k,
      prandtl: (cp_j_kg_k * viscosity_pa_s) / conductivity_w_m_k,
    };
  }

  // Fallback: ar seco — comportamento original preservado
  const density_kg_m3 = 1.225 - 0.00365 * T + 0.0000125 * T * T;
  const cp_j_kg_k = 1005 + 0.15 * T - 0.0001 * T * T;
  return {
    density_kg_m3,
    cp_j_kg_k,
    viscosity_pa_s,
    conductivity_w_m_k,
    prandtl: (cp_j_kg_k * viscosity_pa_s) / conductivity_w_m_k,
  };
}
