/**
 * coilNtuService.ts
 *
 * Dois motores de cálculo de serpentina baseados em geometria real:
 *   1. NTU-ε (crossflow, fluido a T constante): Q = ε × C_min × (T_ar_in − T_ref)
 *   2. LMTD iterativo: Q = U × A × LMTD, convergindo T_ar_out
 *
 * Diferença fundamental em relação ao sizeCoil antigo:
 *   - Não usa temperaturas estimadas fixas (air_outlet = air_inlet - 8°C)
 *   - Calcula T_ar_out a partir da geometria e das condições reais
 *   - A geometria INFLUENCIA o resultado (mais área → mais Q)
 */
import {
  computeFinnedExternalArea,
  calculateFinEfficiencySimplified,
  calculateOverallU,
  calculateNTU,
  calculateEffectivenessCrossflowUnmixed,
  calculateHeatTransferByNTU,
  calculateLMTD,
  calculateHeatTransferByLMTD,
  calculateAirProperties,
  calculateReynolds,
  calculateDarcyFrictionFactor,
  calculateNusseltGnielinski,
  calculateConvectiveCoefficient,
} from "@/modules/coldpro_v2/utils/heatTransferCalculations";

export type CoilNtuEngine = "ntu_epsilon" | "lmtd_iterative";

export interface CoilNtuInput {
  engine: CoilNtuEngine;
  coil_type: "evaporator" | "condenser";
  rows: number;
  tubes_per_row: number;
  circuits: number;
  length_mm: number;
  fin_pitch_mm: number;
  tube_outer_diameter_mm: number;
  row_pitch_mm: number;
  airflow_m3h: number;
  air_inlet_temp_c: number;
  refrigerant_sat_temp_c: number;
  h_fluid_w_m2k?: number;
  fin_conductivity_w_mk?: number;
  fin_thickness_m?: number;
  tube_wall_thickness_m?: number;
  tube_conductivity_w_mk?: number;
  tube_pitch_transverse_mm?: number;
}

export interface IndustrialLimitCheck {
  value: number;
  min: number | null;
  max: number | null;
  unit: string;
  status: "ok" | "warning" | "error";
  message: string;
}

export interface IndustrialLimitsCheck {
  face_velocity: IndustrialLimitCheck;
  air_pressure_drop: IndustrialLimitCheck;
  fluid_velocity: IndustrialLimitCheck;
  overall_status: "ok" | "warning" | "error";
}

export interface CoilNtuResult {
  capacity_w: number;
  air_outlet_temp_c: number;
  u_w_m2k: number;
  h_air_w_m2k: number;
  fin_efficiency: number;
  exchange_area_m2: number;
  lmtd_k: number | null;
  ntu: number | null;
  effectiveness: number | null;
  air_pressure_drop_pa: number;
  face_velocity_ms: number;
  fluid_velocity_ms: number;
  frontal_area_m2: number;
  industrial_limits: IndustrialLimitsCheck;
  engine_used: CoilNtuEngine;
  warnings: string[];
}

/**
 * Verifica se os valores calculados respeitam os limites industriais de refrigeração.
 * Limites baseados em prática ASHRAE / industrial brasileira.
 */
export function checkIndustrialLimits(
  coil_type: "evaporator" | "condenser",
  face_velocity_ms: number,
  air_pressure_drop_pa: number,
  fluid_velocity_ms: number,
): IndustrialLimitsCheck {
  const isEvap = coil_type === "evaporator";
  const fv_min = isEvap ? 1.5 : 2.0;
  const fv_max = isEvap ? 3.5 : 4.5;
  const dp_max = isEvap ? 80 : 120;
  const vel_min = isEvap ? 0.3 : 0.5;
  const vel_max = isEvap ? 1.5 : 2.0;

  function mk(value: number, min: number | null, max: number | null, unit: string, label: string): IndustrialLimitCheck {
    let status: "ok" | "warning" | "error" = "ok";
    let message = `${label}: ${value.toFixed(2)} ${unit} — dentro dos limites`;
    if (min !== null && value < min) {
      status = "warning";
      message = `${label}: ${value.toFixed(2)} ${unit} abaixo do mínimo (${min} ${unit})`;
    } else if (max !== null && value > max * 1.2) {
      status = "error";
      message = `${label}: ${value.toFixed(2)} ${unit} muito acima do máximo (${max} ${unit})`;
    } else if (max !== null && value > max) {
      status = "warning";
      message = `${label}: ${value.toFixed(2)} ${unit} acima do máximo recomendado (${max} ${unit})`;
    }
    return { value, min, max, unit, status, message };
  }

  const fv = mk(face_velocity_ms, fv_min, fv_max, "m/s", "Vel. frontal");
  const dp = mk(air_pressure_drop_pa, null, dp_max, "Pa", "ΔP ar");
  const vel = fluid_velocity_ms > 0
    ? mk(fluid_velocity_ms, vel_min, vel_max, "m/s", "Vel. fluido")
    : { value: 0, min: vel_min, max: vel_max, unit: "m/s", status: "ok" as const, message: "Vel. fluido: não calculada" };

  const statuses = [fv.status, dp.status, vel.status];
  const overall_status: "ok" | "warning" | "error" = statuses.includes("error")
    ? "error"
    : statuses.includes("warning")
      ? "warning"
      : "ok";
  return { face_velocity: fv, air_pressure_drop: dp, fluid_velocity: vel, overall_status };
}

const DEFAULT_H_FLUID_EVAP = 3500; // W/(m²K) — evaporação bifásica R404A/R134a (Chen 1966, conservador)
const DEFAULT_H_FLUID_COND = 6000; // W/(m²K) — condensação bifásica R404A/R134a (Nusselt 1916, conservador)
const DEFAULT_FIN_COND = 200;
const DEFAULT_FIN_THICK = 0.0001;
const DEFAULT_TUBE_WALL = 0.00035;
const DEFAULT_TUBE_COND = 385;

/**
 * Coeficiente convectivo do ar — Wang-Chi-Chang (2000) para aletas planas.
 * j = 0.394 · Re_Dc^(−0.392) · (s/Dc)^(−0.0449) · (s/Lc)^(−0.0897) · N^(−0.0528)
 * h_ar = j · G · cp · Pr^(−2/3)
 * Referência: Wang, C.-C., Chi, K.-Y., Chang, C.-J. (2000). Int. J. Heat Mass Transfer 42, 1945–1956.
 */
function calcHAir(
  airflow_m3h: number,
  frontal_area_m2: number,
  tube_od_m: number,
  air_inlet_temp_c: number,
  fin_pitch_mm: number,
  rows: number,
): { h_air: number; warnings: string[] } {
  const warnings: string[] = [];
  const airProps = calculateAirProperties(air_inlet_temp_c);
  const faceVelocity = airflow_m3h > 0 ? airflow_m3h / 3600 / Math.max(frontal_area_m2, 0.001) : 0;
  if (faceVelocity < 0.5) warnings.push("Velocidade frontal muito baixa (<0.5 m/s)");
  if (faceVelocity > 5.0) warnings.push("Velocidade frontal alta (>5.0 m/s)");

  const Re = (airProps.density_kg_m3 * faceVelocity * tube_od_m) / airProps.viscosity_pa_s;
  if (Re < 100) {
    warnings.push("Re < 100 — usando h_ar mínimo de 15 W/(m²K)");
    return { h_air: 15, warnings };
  }

  const fin_pitch_m = fin_pitch_mm / 1000;
  const s_Dc = fin_pitch_m / tube_od_m;
  // Lc = comprimento característico estimado como profundidade da serpentina / 2
  // Aproximação conservadora: Lc = 0.05 m (5 cm) — adequado para 2–6 filas
  const Lc = 0.05;
  const s_Lc = fin_pitch_m / Lc;
  const N = Math.max(1, rows);

  // Fator j de Colburn — Wang-Chi-Chang (2000) Eq. (9)
  const j =
    0.394 *
    Math.pow(Re, -0.392) *
    Math.pow(Math.max(s_Dc, 0.01), -0.0449) *
    Math.pow(Math.max(s_Lc, 0.01), -0.0897) *
    Math.pow(N, -0.0528);

  const G = airProps.density_kg_m3 * faceVelocity; // fluxo mássico [kg/(m²·s)]
  const h_air = j * G * airProps.cp_j_kg_k * Math.pow(airProps.prandtl, -2 / 3);

  return { h_air: Math.max(15, Math.min(300, h_air)), warnings };
}

function calcU(
  h_air: number,
  h_fluid: number,
  fin_efficiency: number,
  tube_wall_thickness_m: number,
  tube_conductivity_w_mk: number,
): number {
  const wallR = tube_wall_thickness_m / tube_conductivity_w_mk;
  return calculateOverallU({
    airSideH_w_m2k: h_air,
    fluidSideH_w_m2k: h_fluid,
    wallResistance_m2k_w: wallR,
    foulingAir_m2k_w: 0,
    foulingFluid_m2k_w: 0,
    finEfficiency: fin_efficiency,
  });
}

function calcNtuEpsilon(
  input: CoilNtuInput,
  area: { A_total_m2: number; warnings: string[] },
  h_air: number,
  U: number,
  fin_eff: number,
  air_pressure_drop_pa: number,
  extras: { face_velocity_ms: number; fluid_velocity_ms: number; frontal_area_m2: number; industrial_limits: IndustrialLimitsCheck },
): CoilNtuResult {
  const warnings = [...area.warnings];
  const airProps = calculateAirProperties(input.air_inlet_temp_c);
  const m_air_kgs = (input.airflow_m3h / 3600) * airProps.density_kg_m3;
  const C_air = m_air_kgs * airProps.cp_j_kg_k;
  const T_refrig = input.refrigerant_sat_temp_c;
  const T_air_in = input.air_inlet_temp_c;
  const isEvap = input.coil_type === "evaporator";

  const baseExtras = { ...extras, air_pressure_drop_pa };

  if (isEvap && T_air_in <= T_refrig) {
    warnings.push("T_ar_in <= T_refrig — sem transferência de calor possível");
    return {
      capacity_w: 0, air_outlet_temp_c: T_air_in, u_w_m2k: U, h_air_w_m2k: h_air,
      fin_efficiency: fin_eff, exchange_area_m2: area.A_total_m2, lmtd_k: null,
      ntu: null, effectiveness: null, ...baseExtras, engine_used: "ntu_epsilon", warnings,
    };
  }
  if (!isEvap && T_refrig <= T_air_in) {
    warnings.push("T_refrig <= T_ar_in — sem transferência de calor possível");
    return {
      capacity_w: 0, air_outlet_temp_c: T_air_in, u_w_m2k: U, h_air_w_m2k: h_air,
      fin_efficiency: fin_eff, exchange_area_m2: area.A_total_m2, lmtd_k: null,
      ntu: null, effectiveness: null, ...baseExtras, engine_used: "ntu_epsilon", warnings,
    };
  }

  const ntu = calculateNTU({ u_w_m2k: U, area_m2: area.A_total_m2, c_min_w_k: C_air });
  const epsResult = calculateEffectivenessCrossflowUnmixed({ ntu, c_ratio: 0 });
  warnings.push(...epsResult.warnings);
  const eps = epsResult.effectiveness;
  const Q_w = calculateHeatTransferByNTU({ effectiveness: eps, c_min_w_k: C_air, t_hot_in: isEvap ? T_air_in : T_refrig, t_cold_in: isEvap ? T_refrig : T_air_in });
  const T_air_out = isEvap ? T_air_in - Q_w / C_air : T_air_in + Q_w / C_air;

  return {
    capacity_w: Math.max(0, Q_w),
    air_outlet_temp_c: T_air_out,
    u_w_m2k: U,
    h_air_w_m2k: h_air,
    fin_efficiency: fin_eff,
    exchange_area_m2: area.A_total_m2,
    lmtd_k: null,
    ntu,
    effectiveness: eps,
    ...baseExtras,
    engine_used: "ntu_epsilon",
    warnings,
  };
}

function calcLmtdIterative(
  input: CoilNtuInput,
  area: { A_total_m2: number; warnings: string[] },
  h_air: number,
  U: number,
  fin_eff: number,
  air_pressure_drop_pa: number,
  extras: { face_velocity_ms: number; fluid_velocity_ms: number; frontal_area_m2: number; industrial_limits: IndustrialLimitsCheck },
): CoilNtuResult {
  const warnings = [...area.warnings];
  const airProps = calculateAirProperties(input.air_inlet_temp_c);
  const m_air_kgs = (input.airflow_m3h / 3600) * airProps.density_kg_m3;
  const C_air = m_air_kgs * airProps.cp_j_kg_k;
  const T_refrig = input.refrigerant_sat_temp_c;
  const T_air_in = input.air_inlet_temp_c;
  const isEvap = input.coil_type === "evaporator";

  let T_air_out = isEvap ? T_air_in - 5 : T_air_in + 5;
  let Q_w = 0;
  let lmtd_k: number | null = null;
  const MAX_ITER = 50;
  const TOL = 0.01;

  for (let i = 0; i < MAX_ITER; i++) {
    const lmtdResult = isEvap
      ? calculateLMTD({ hotIn_c: T_air_in, hotOut_c: T_air_out, coldIn_c: T_refrig, coldOut_c: T_refrig })
      : calculateLMTD({ hotIn_c: T_refrig, hotOut_c: T_refrig, coldIn_c: T_air_in, coldOut_c: T_air_out });
    lmtd_k = lmtdResult.lmtd_k;
    if (!lmtd_k || lmtd_k <= 0) {
      warnings.push("LMTD inválido — usando NTU-ε como fallback");
      return calcNtuEpsilon(input, area, h_air, U, fin_eff, air_pressure_drop_pa, extras);
    }
    Q_w = calculateHeatTransferByLMTD({ u_w_m2k: U, area_m2: area.A_total_m2, lmtd_k });
    const T_air_out_new = isEvap ? T_air_in - Q_w / C_air : T_air_in + Q_w / C_air;
    if (Math.abs(T_air_out_new - T_air_out) < TOL) { T_air_out = T_air_out_new; break; }
    T_air_out = T_air_out_new;
  }

  return {
    capacity_w: Math.max(0, Q_w),
    air_outlet_temp_c: T_air_out,
    u_w_m2k: U,
    h_air_w_m2k: h_air,
    fin_efficiency: fin_eff,
    exchange_area_m2: area.A_total_m2,
    lmtd_k,
    ntu: null,
    effectiveness: null,
    air_pressure_drop_pa,
    ...extras,
    engine_used: "lmtd_iterative",
    warnings,
  };
}

export function calcCoilCapacity(input: CoilNtuInput): CoilNtuResult {
  const warnings: string[] = [];
  const tube_od_m = input.tube_outer_diameter_mm / 1000;
  const tube_wall_m = input.tube_wall_thickness_m ?? DEFAULT_TUBE_WALL;
  const tube_cond = input.tube_conductivity_w_mk ?? DEFAULT_TUBE_COND;
  const fin_cond = input.fin_conductivity_w_mk ?? DEFAULT_FIN_COND;
  const fin_thick = input.fin_thickness_m ?? DEFAULT_FIN_THICK;
  const isEvapCoil = input.coil_type === "evaporator";
  const h_fluid = input.h_fluid_w_m2k ?? (isEvapCoil ? DEFAULT_H_FLUID_EVAP : DEFAULT_H_FLUID_COND);
  const pitch_t_mm = input.tube_pitch_transverse_mm ?? input.row_pitch_mm;

  const areaResult = computeFinnedExternalArea({
    rows: input.rows,
    tubes_per_row: input.tubes_per_row,
    tube_length_m: input.length_mm / 1000,
    tube_outer_diameter_m: tube_od_m,
    fin_thickness_m: fin_thick,
    fin_pitch_m: input.fin_pitch_mm / 1000,
    tube_pitch_transversal_m: pitch_t_mm / 1000,
    tube_pitch_longitudinal_m: input.row_pitch_mm / 1000,
  });
  warnings.push(...areaResult.warnings);

  if (areaResult.A_total_m2 < 0.01) {
    warnings.push("Área total muito pequena — verificar geometria");
    return {
      capacity_w: 0, air_outlet_temp_c: input.air_inlet_temp_c,
      u_w_m2k: 0, h_air_w_m2k: 0, fin_efficiency: 0,
      exchange_area_m2: areaResult.A_total_m2, lmtd_k: null,
      ntu: null, effectiveness: null, air_pressure_drop_pa: 0,
      face_velocity_ms: 0, fluid_velocity_ms: 0, frontal_area_m2: 0,
      industrial_limits: checkIndustrialLimits(input.coil_type, 0, 0, 0),
      engine_used: input.engine, warnings,
    };
  }

  const height_m = (input.tubes_per_row * pitch_t_mm) / 1000;
  const length_m = input.length_mm / 1000;
  const frontal_area_m2 = height_m * length_m;

  const { h_air, warnings: hWarn } = calcHAir(
    input.airflow_m3h,
    frontal_area_m2,
    tube_od_m,
    input.air_inlet_temp_c,
    input.fin_pitch_mm,
    input.rows,
  );
  warnings.push(...hWarn);

  const finResult = calculateFinEfficiencySimplified({
    h_air_w_m2k: h_air,
    finConductivity_w_mk: fin_cond,
    finThickness_m: fin_thick,
  });
  warnings.push(...finResult.warnings);
  const fin_eff = finResult.finEfficiency;

  const faceVelocity = input.airflow_m3h > 0 ? input.airflow_m3h / 3600 / Math.max(frontal_area_m2, 0.001) : 0;

  const U = calcU(h_air, h_fluid, fin_eff, tube_wall_m, tube_cond);
  if (U <= 0) {
    warnings.push("U global = 0 — verificar h_ar e h_fluido");
    return {
      capacity_w: 0, air_outlet_temp_c: input.air_inlet_temp_c,
      u_w_m2k: 0, h_air_w_m2k: h_air, fin_efficiency: fin_eff,
      exchange_area_m2: areaResult.A_total_m2, lmtd_k: null,
      ntu: null, effectiveness: null, air_pressure_drop_pa: 0,
      face_velocity_ms: faceVelocity, fluid_velocity_ms: 0, frontal_area_m2,
      industrial_limits: checkIndustrialLimits(input.coil_type, faceVelocity, 0, 0),
      engine_used: input.engine, warnings,
    };
  }

  const airProps = calculateAirProperties(input.air_inlet_temp_c);
  const air_dp_pa = 0.5 * airProps.density_kg_m3 * faceVelocity ** 2 * input.rows * 2;

  // Velocidade do fluido refrigerante (estimativa simplificada bifásica)
  const tubeID_m = tube_od_m - 2 * tube_wall_m;
  const A_tubo_m2 = Math.PI * Math.pow(tubeID_m / 2, 2);
  const rho_fluid_approx = isEvapCoil ? 80 : 120;
  const h_fg_approx = isEvapCoil ? 150000 : 130000;
  const m_dot_total_kgs = areaResult.A_total_m2 > 0.01 ? (U * areaResult.A_total_m2 * 10) / h_fg_approx : 0;
  const fluid_velocity_ms = A_tubo_m2 > 0 && input.circuits > 0
    ? m_dot_total_kgs / (rho_fluid_approx * A_tubo_m2 * input.circuits)
    : 0;

  const industrial_limits = checkIndustrialLimits(input.coil_type, faceVelocity, air_dp_pa, fluid_velocity_ms);
  if (industrial_limits.overall_status === "error") {
    warnings.push(
      ...[industrial_limits.face_velocity, industrial_limits.air_pressure_drop, industrial_limits.fluid_velocity]
        .filter((c) => c.status === "error")
        .map((c) => c.message),
    );
  }

  const extras = { face_velocity_ms: faceVelocity, fluid_velocity_ms, frontal_area_m2, industrial_limits };

  if (input.engine === "ntu_epsilon") {
    return calcNtuEpsilon(input, areaResult, h_air, U, fin_eff, air_dp_pa, extras);
  } else {
    return calcLmtdIterative(input, areaResult, h_air, U, fin_eff, air_dp_pa, extras);
  }
}
