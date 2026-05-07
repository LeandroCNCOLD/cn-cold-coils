/**
 * hotGasBypassEngine.ts — Sprint 6
 *
 * Motor de ciclo com gás quente (hot gas bypass) para controle de umidade
 * em câmaras agrícolas (AGRO). O ciclo desvia uma fração do gás quente do
 * compressor para reaquecimento do ar após o evaporador, permitindo atingir
 * simultaneamente a temperatura e a umidade relativa desejadas.
 *
 * Referências:
 *   - ASHRAE Handbook — Refrigeration (2018), Cap. 13
 *   - Stoecker & Jones, Industrial Refrigeration Handbook (1998)
 */

import {
  saturationPressure,
  humidityRatio,
  enthalpyMoistAir,
  dewPoint,
} from "../psychrometrics/psychrometricCore";
import type { HotGasBypassInput, HotGasBypassResult, HotGasBypassMode } from "../../domain/types";

// ─── helpers internos ────────────────────────────────────────────────────────

/**
 * Calcula a umidade relativa a partir da razão de mistura W e temperatura T.
 */
function rhFromW(T_c: number, W: number, P_atm: number): number {
  const P_vapor = (W * P_atm) / (0.62198 + W);
  const P_ws = saturationPressure(T_c);
  if (P_ws <= 0) return 0;
  return Math.max(0, Math.min(1, P_vapor / P_ws));
}

/**
 * Calcula a temperatura de ponto de orvalho a partir de W (razão de mistura).
 * Usa bissecção entre -60 °C e 80 °C.
 */
function dewPointFromW(
  W: number,
  P_atm: number,
  maxIter = 100,
  tol = 1e-6,
): number {
  let lo = -60;
  let hi = 80;
  for (let i = 0; i < maxIter; i++) {
    const mid = (lo + hi) / 2;
    const { W: W_sat } = humidityRatio(mid, 1.0, P_atm);
    if (Math.abs(W_sat - W) < tol) return mid;
    if (W_sat < W) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/**
 * COP ideal do ciclo de Carnot para estimativa de potência do compressor.
 * COP_Carnot = T_cond / (T_cond - T_evap)  [temperaturas em K]
 * Aplica fator de eficiência 0.55 (compressor semi-hermético típico).
 */
function estimateCompressorPower(
  Q_evap_w: number,
  T_evap_c: number,
  T_cond_c: number,
): number {
  const T_evap_k = T_evap_c + 273.15;
  const T_cond_k = T_cond_c + 273.15;
  const delta = T_cond_k - T_evap_k;
  if (delta <= 0) return Q_evap_w * 0.5; // fallback
  const cop_carnot = T_evap_k / delta;
  const cop_real = cop_carnot * 0.55;
  return cop_real > 0 ? Q_evap_w / cop_real : Q_evap_w * 0.5;
}

// ─── motor principal ─────────────────────────────────────────────────────────

/**
 * Calcula o ciclo com gás quente (hot gas bypass) para controle de UR.
 *
 * Algoritmo:
 * 1. Calcula estado do ar na entrada (W_in, h_in).
 * 2. Determina o estado do ar após o evaporador (T_evap_out = ponto de orvalho
 *    correspondente a W_setpoint, RH_evap_out ≈ 1.0).
 * 3. Itera a fração de by-pass (β) para que o ar reaquecido atinja
 *    T_setpoint e RH_setpoint simultaneamente.
 * 4. Calcula Q_evap, Q_reheat, W_compressor e COP.
 */
export function calculateHotGasBypass(
  input: HotGasBypassInput,
): HotGasBypassResult {
  const warnings: string[] = [];
  const P_atm = input.P_atm ?? 101325;
  const maxIter = input.max_iterations ?? 100;
  const tol = input.tolerance_w ?? 1.0;
  const maxBypass = input.max_bypass_fraction ?? 0.5;

  // ── validações básicas ──────────────────────────────────────────────────
  if (!Number.isFinite(input.T_air_in_c)) {
    return buildError("T_air_in_c inválido.", warnings);
  }
  if (input.RH_air_in <= 0 || input.RH_air_in > 1) {
    return buildError("RH_air_in deve estar entre 0 e 1.", warnings);
  }
  if (input.RH_air_out_setpoint <= 0 || input.RH_air_out_setpoint > 1) {
    return buildError("RH_air_out_setpoint deve estar entre 0 e 1.", warnings);
  }
  if (input.air_mass_flow_kg_s <= 0) {
    return buildError("air_mass_flow_kg_s deve ser positivo.", warnings);
  }
  if (input.T_evaporating_c >= input.T_condensing_c) {
    return buildError(
      "T_evaporating_c deve ser menor que T_condensing_c.",
      warnings,
    );
  }

  const m = input.air_mass_flow_kg_s;

  // ── estado de entrada ───────────────────────────────────────────────────
  const { W: W_in } = humidityRatio(input.T_air_in_c, input.RH_air_in, P_atm);
  const h_in = enthalpyMoistAir(input.T_air_in_c, W_in);

  // ── estado de saída desejado ────────────────────────────────────────────
  const { W: W_setpoint } = humidityRatio(
    input.T_air_out_setpoint_c,
    input.RH_air_out_setpoint,
    P_atm,
  );

  // Se a razão de mistura de entrada já está abaixo do setpoint,
  // não há necessidade de reaquecimento — modo cooling_only.
  if (W_in <= W_setpoint) {
    const h_out = enthalpyMoistAir(input.T_air_out_setpoint_c, W_setpoint);
    const Q_evap_w = Math.max(0, m * (h_in - h_out) * 1000);
    const W_comp = estimateCompressorPower(
      Q_evap_w,
      input.T_evaporating_c,
      input.T_condensing_c,
    );
    const cop = W_comp > 0 ? Q_evap_w / W_comp : 0;
    const T_dew = dewPointFromW(W_setpoint, P_atm);
    return {
      mode: "cooling_only",
      bypass_fraction: 0,
      Q_evap_w,
      Q_reheat_w: 0,
      W_compressor_w: W_comp,
      cop_cycle: cop,
      T_air_out_c: input.T_air_out_setpoint_c,
      RH_air_out: input.RH_air_out_setpoint,
      W_air_out: W_setpoint,
      water_removed_kg_h: Math.max(0, m * (W_in - W_setpoint)) * 3600,
      T_dew_out_c: T_dew,
      h_air_in_kj_kg: h_in,
      h_air_out_kj_kg: h_out,
      converged: true,
      iterations: 0,
      warnings,
      status: "ok",
    };
  }

  // ── estado após evaporador (saturação à W_setpoint) ─────────────────────
  const T_evap_out = dewPointFromW(W_setpoint, P_atm);
  const h_evap_out = enthalpyMoistAir(T_evap_out, W_setpoint);

  // Entalpia do gás quente que entra no reaquecedor.
  // Aproximação: h_hot_gas ≈ entalpia do vapor superaquecido à T_condensing.
  // Usamos cp_ar ≈ 1.006 kJ/(kg·K) como proxy simplificado para o gás refrigerante
  // (o motor não tem dados de fluido — a fração β é o que importa).
  // Entalpia do ar reaquecido = h_evap_out + β * (h_hot_gas - h_evap_out)
  // Queremos T_out = T_setpoint → h_out_target = enthalpyMoistAir(T_setpoint, W_setpoint)
  const h_out_target = enthalpyMoistAir(
    input.T_air_out_setpoint_c,
    W_setpoint,
  );

  // Q_reheat necessário [W]
  const Q_reheat_needed = m * (h_out_target - h_evap_out) * 1000;

  if (Q_reheat_needed <= 0) {
    // Evaporador já entrega a temperatura correta — sem reaquecimento
    const Q_evap_w = Math.max(0, m * (h_in - h_evap_out) * 1000);
    const W_comp = estimateCompressorPower(
      Q_evap_w,
      input.T_evaporating_c,
      input.T_condensing_c,
    );
    const cop = W_comp > 0 ? Q_evap_w / W_comp : 0;
    const T_dew = dewPointFromW(W_setpoint, P_atm);
    return {
      mode: "cooling_only",
      bypass_fraction: 0,
      Q_evap_w,
      Q_reheat_w: 0,
      W_compressor_w: W_comp,
      cop_cycle: cop,
      T_air_out_c: T_evap_out,
      RH_air_out: 1.0,
      W_air_out: W_setpoint,
      water_removed_kg_h: Math.max(0, m * (W_in - W_setpoint)) * 3600,
      T_dew_out_c: T_dew,
      h_air_in_kj_kg: h_in,
      h_air_out_kj_kg: h_evap_out,
      converged: true,
      iterations: 0,
      warnings,
      status: "ok",
    };
  }

  // ── iteração para encontrar β (fração de by-pass) ────────────────────────
  // Q_reheat = β * Q_cond_total
  // Q_cond_total ≈ Q_evap + W_comp  (balanço do condensador)
  // Q_evap = m * (h_in - h_evap_out) * 1000
  const Q_evap_w = Math.max(0, m * (h_in - h_evap_out) * 1000);

  // Estimativa inicial de W_comp sem by-pass
  const W_comp_base = estimateCompressorPower(
    Q_evap_w,
    input.T_evaporating_c,
    input.T_condensing_c,
  );
  const Q_cond_total = Q_evap_w + W_comp_base;

  // β = Q_reheat_needed / Q_cond_total
  let beta = Q_cond_total > 0 ? Q_reheat_needed / Q_cond_total : 0;
  beta = Math.max(0, Math.min(maxBypass, beta));

  // Refinar β iterativamente (o W_comp aumenta com β pois o evaporador
  // precisa compensar o calor reabsorvido)
  let converged = false;
  let iterations = 0;
  let Q_reheat_actual = 0;
  let T_out_actual = T_evap_out;
  let RH_out_actual = 1.0;

  for (let i = 0; i < maxIter; i++) {
    iterations = i + 1;
    Q_reheat_actual = beta * Q_cond_total;
    // Temperatura de saída após reaquecimento
    // h_out = h_evap_out + Q_reheat / (m * 1000)
    const h_out_actual = h_evap_out + Q_reheat_actual / (m * 1000);
    // Resolver T a partir de h = 1.006*T + W*(2501 + 1.86*T)
    // h = T*(1.006 + 1.86*W) + 2501*W
    // T = (h - 2501*W) / (1.006 + 1.86*W)
    T_out_actual =
      (h_out_actual - 2501 * W_setpoint) / (1.006 + 1.86 * W_setpoint);
    RH_out_actual = rhFromW(T_out_actual, W_setpoint, P_atm);

    const h_target_iter = enthalpyMoistAir(
      input.T_air_out_setpoint_c,
      W_setpoint,
    );
    const error_w = Math.abs(Q_reheat_actual - (m * (h_target_iter - h_evap_out) * 1000));

    if (error_w < tol) {
      converged = true;
      break;
    }

    // Atualizar β
    const beta_new = Q_cond_total > 0
      ? (m * (h_target_iter - h_evap_out) * 1000) / Q_cond_total
      : 0;
    beta = Math.max(0, Math.min(maxBypass, beta_new));
  }

  // Verificar se β atingiu o máximo sem convergir
  let mode: HotGasBypassMode = "hot_gas_bypass";
  if (!converged) {
    warnings.push(
      `Não convergiu em ${maxIter} iterações. Usando β=${beta.toFixed(3)}.`,
    );
  }
  if (beta >= maxBypass && !converged) {
    mode = "electric_reheat";
    warnings.push(
      `Fração de by-pass máxima (${maxBypass}) atingida. ` +
        "Reaquecimento elétrico pode ser necessário.",
    );
  }

  const W_comp_final = estimateCompressorPower(
    Q_evap_w,
    input.T_evaporating_c,
    input.T_condensing_c,
  );
  const cop_cycle =
    W_comp_final > 0 ? (Q_evap_w - Q_reheat_actual) / W_comp_final : 0;

  const T_dew_out = dewPointFromW(W_setpoint, P_atm);
  const h_out_final = h_evap_out + Q_reheat_actual / (m * 1000);

  const status: "ok" | "warning" | "error" =
    (mode as string) === "invalid"
      ? "error"
      : warnings.length > 0
        ? "warning"
        : "ok";

  return {
    mode,
    bypass_fraction: beta,
    Q_evap_w,
    Q_reheat_w: Q_reheat_actual,
    W_compressor_w: W_comp_final,
    cop_cycle: Math.max(0, cop_cycle),
    T_air_out_c: T_out_actual,
    RH_air_out: RH_out_actual,
    W_air_out: W_setpoint,
    water_removed_kg_h: Math.max(0, m * (W_in - W_setpoint)) * 3600,
    T_dew_out_c: T_dew_out,
    h_air_in_kj_kg: h_in,
    h_air_out_kj_kg: h_out_final,
    converged,
    iterations,
    warnings,
    status,
  };
}

// ─── helper de erro ──────────────────────────────────────────────────────────

function buildError(
  message: string,
  warnings: string[],
): HotGasBypassResult {
  warnings.push(message);
  return {
    mode: "invalid",
    bypass_fraction: 0,
    Q_evap_w: 0,
    Q_reheat_w: 0,
    W_compressor_w: 0,
    cop_cycle: 0,
    T_air_out_c: 0,
    RH_air_out: 0,
    W_air_out: 0,
    water_removed_kg_h: 0,
    T_dew_out_c: 0,
    h_air_in_kj_kg: 0,
    h_air_out_kj_kg: 0,
    converged: false,
    iterations: 0,
    warnings,
    status: "error",
  };
}
