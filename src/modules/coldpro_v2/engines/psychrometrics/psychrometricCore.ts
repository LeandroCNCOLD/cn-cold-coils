// Camada de compatibilidade — delega ao motor canônico Hyland-Wexler (ASHRAE 2017).
//
// Substitui a aproximação de Magnus pela equação completa de Hyland-Wexler
// (eqs. 5 e 6 do ASHRAE HoF 2017, cap. 1). Erro de Magnus a T = -30°C: ~0.8%,
// acumulado em W, h, ρ e T_dp ao longo de toda a cadeia de cálculo.
//
// Assinaturas preservadas para backward compatibility:
//   humidityRatio → { W, warnings[] }   (engine_v2 retorna number)
//   dewPoint      → { T_dp, warnings[] } (engine_v2 retorna number)
//   cpMoistAir    → kJ/(kg·K)           (engine_v2 retorna J/(kg·K))

import {
  saturationPressure,
  humidityRatio as _humidityRatio,
  enthalpy,
  airDensity,
  moistAirCp,
  dewPoint as _dewPoint,
} from "@/modules/cn_coils/engine_v2/psychrometrics";

export { saturationPressure, airDensity };

export function humidityRatio(
  T_c: number,
  RH: number,
  P_atm = 101325,
): { W: number; warnings: string[] } {
  const warnings: string[] = [];
  let rh = RH;
  if (rh > 1.0) {
    rh = rh / 100.0;
    warnings.push("RH fornecido como porcentagem. Convertido para fração decimal.");
  }
  const W = _humidityRatio(T_c, rh, P_atm);
  return { W: Number.isFinite(W) ? W : 0, warnings };
}

export function enthalpyMoistAir(T_c: number, W: number): number {
  return enthalpy(T_c, W);
}

export function dewPoint(
  T_c: number,
  RH: number,
  P_atm = 101325,
): { T_dp: number; warnings: string[] } {
  const warnings: string[] = [];
  const RH_safe = Math.max(0.001, Math.min(1.0, RH));
  if (RH_safe <= 0.001) {
    warnings.push("RH muito baixo. Ponto de orvalho pode ser impreciso.");
  }
  const T_dp = _dewPoint(T_c, RH_safe, P_atm);
  return { T_dp, warnings };
}

// engine_v2 retorna J/(kg·K); consumidores internos esperam kJ/(kg·K)
export function cpMoistAir(W: number): number {
  return moistAirCp(W) / 1000;
}
