/**
 * coilNtuService.ts
 *
 * Dois motores de cálculo de serpentinas para a busca automática:
 *
 *  Motor 1 — NTU-ε (ε-NTU, crossflow unmixed):
 *    Q = ε × Cmin × (T_ar_in − T_refrig)
 *    ε = f(NTU, Cr)  com NTU = U·A / Cmin
 *    Temperatura de saída do ar calculada iterativamente.
 *
 *  Motor 2 — LMTD iterativo:
 *    Q = U × A × LMTD
 *    T_ar_out calculada por balanço de energia: T_ar_out = T_ar_in − Q/(ṁ·cp)
 *    Iteração até convergência de T_ar_out.
 *
 * Ambos usam:
 *  - Área com aletas (computeFinnedExternalArea)
 *  - Eficiência de aleta Schmidt (calculateFinEfficiencySimplified)
 *  - h_ar via Gnielinski (calculateNusseltGnielinski)
 *  - U global (calculateOverallU)
 *  - Propriedades do ar (calculateAirProperties)
 *
 * Para o motor de busca (evaporatorSearchService), o fluido refrigerante
 * é tratado como temperatura constante (evaporação/condensação), portanto:
 *  - Cr = Cmin/Cmax → 0 (fluido a T constante)
 *  - ε = 1 − exp(−NTU)
 *  - LMTD = ΔT_ln entre entrada e saída do ar vs. T_refrig
 */

import { calculateAirProperties } from "@/modules/coldpro_v2/engines/airSide/airProperties";
import { computeFinnedExternalArea } from "@/modules/coldpro_v2/engines/core/finnedExternalArea";
import { calculateFinEfficiencySimplified } from "@/modules/coldpro_v2/engines/core/finEfficiency";
import { calculateOverallU } from "@/modules/coldpro_v2/engines/core/overallHeatTransfer";
import {
  calculateReynolds,
  calculateNusseltGnielinski,
  calculateConvectiveCoefficient,
} from "@/modules/coldpro_v2/engines/core/dimensionless";
import { calculateDarcyFrictionFactor } from "@/modules/coldpro_v2/engines/core/friction";
import {
  calculateNTU,
  calculateEffectivenessCrossflowUnmixed,
  calculateHeatTransferByNTU,
} from "@/modules/coldpro_v2/engines/core/ntu";
import { calculateLMTD, calculateHeatTransferByLMTD } from "@/modules/coldpro_v2/engines/core/lmtd";

// ── Tipos ────────────────────────────────────────────────────────────────────

export type CoilNtuEngine = "ntu_epsilon" | "lmtd_iterative";

export interface CoilNtuInput {
  /** Motor a usar */
  engine: CoilNtuEngine;
  /** Tipo de componente */
  coil_type: "evaporator" | "condenser";
  /** Geometria da serpentina */
  rows: number;
  tubes_per_row: number;
  circuits: number;
  length_mm: number;
  fin_pitch_mm: number;
  tube_outer_diameter_mm: number;
  row_pitch_mm: number;
  /** Condições operacionais */
  airflow_m3h: number;
  /** Temperatura de entrada do ar [°C] */
  air_inlet_temp_c: number;
  /** Temperatura de saturação do refrigerante [°C] (Te para evap, Tc para cond) */
  refrigerant_sat_temp_c: number;
  /** h_fluido interno [W/m²K] — padrão 2500 para refrigerante em ebulição/condensação */
  h_fluid_w_m2k?: number;
  /** Condutividade da aleta [W/mK] — padrão 200 (alumínio) */
  fin_conductivity_w_mk?: number;
  /** Espessura da aleta [m] — padrão 0.0001 (0.1 mm) */
  fin_thickness_m?: number;
  /** Espessura da parede do tubo [m] — padrão 0.00035 */
  tube_wall_thickness_m?: number;
  /** Condutividade do tubo [W/mK] — padrão 385 (cobre) */
  tube_conductivity_w_mk?: number;
  /** Passo transversal [mm] — padrão = row_pitch_mm (arranjo quadrado) */
  tube_pitch_transverse_mm?: number;
}

export interface CoilNtuResult {
  /** Capacidade calculada [W] */
  capacity_w: number;
  /** Temperatura de saída do ar [°C] */
  air_outlet_temp_c: number;
  /** Coeficiente global U [W/m²K] */
  u_w_m2k: number;
  /** h ar [W/m²K] */
  h_air_w_m2k: number;
  /** Eficiência de aleta [0-1] */
  fin_efficiency: number;
  /** Área total externa (tubo + aletas) [m²] */
  exchange_area_m2: number;
  /** LMTD [K] (null para NTU-ε) */
  lmtd_k: number | null;
  /** NTU (null para LMTD) */
  ntu: number | null;
  /** Efetividade ε (null para LMTD) */
  effectiveness: number | null;
  /** Queda de pressão do ar [Pa] */
  air_pressure_drop_pa: number;
  /** Motor usado */
  engine_used: CoilNtuEngine;
  warnings: string[];
}

// ── Constantes ───────────────────────────────────────────────────────────────
const DEFAULT_H_FLUID = 2500;   // W/m²K — refrigerante em ebulição/condensação
const DEFAULT_FIN_COND = 200;   // W/mK — alumínio
const DEFAULT_FIN_THICK = 0.0001; // 0.1 mm
const DEFAULT_TUBE_WALL = 0.00035; // 0.35 mm
const DEFAULT_TUBE_COND = 385;  // W/mK — cobre

// ── Funções auxiliares ───────────────────────────────────────────────────────

/**
 * Calcula h_ar via Gnielinski usando o diâmetro externo do tubo como
 * comprimento característico e a velocidade frontal do ar.
 */
function calcHAir(
  airflow_m3h: number,
  frontal_area_m2: number,
  tube_od_m: number,
  air_inlet_temp_c: number,
): { h_air: number; warnings: string[] } {
  const warnings: string[] = [];
  const airProps = calculateAirProperties(air_inlet_temp_c);
  const faceVelocity = airflow_m3h > 0 ? airflow_m3h / 3600 / Math.max(frontal_area_m2, 0.001) : 0;

  if (faceVelocity < 0.5) warnings.push("Velocidade frontal muito baixa (<0.5 m/s)");
  if (faceVelocity > 5.0) warnings.push("Velocidade frontal alta (>5.0 m/s)");

  const Re = calculateReynolds({
    density_kg_m3: airProps.density_kg_m3,
    velocity_m_s: faceVelocity,
    hydraulicDiameter_m: tube_od_m,
    viscosity_pa_s: airProps.viscosity_pa_s,
  });

  const f = calculateDarcyFrictionFactor({
    reynolds: Re,
    roughness_m: 0.0000015,
    hydraulicDiameter_m: tube_od_m,
  });

  const nuResult = calculateNusseltGnielinski({ reynolds: Re, prandtl: airProps.prandtl, frictionFactor: f });
  warnings.push(...nuResult.warnings);

  const h_air = calculateConvectiveCoefficient({
    nusselt: nuResult.nusselt,
    conductivity_w_m_k: airProps.conductivity_w_m_k,
    hydraulicDiameter_m: tube_od_m,
  });

  return { h_air: Math.max(h_air, 5), warnings };
}

/**
 * Calcula U global considerando eficiência de aleta.
 */
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

// ── Motor NTU-ε ──────────────────────────────────────────────────────────────

/**
 * Motor NTU-ε para fluido a temperatura constante (evaporação/condensação).
 * Cr → 0, portanto ε = 1 − exp(−NTU).
 */
function calcNtuEpsilon(
  input: CoilNtuInput,
  area: { A_total_m2: number; warnings: string[] },
  h_air: number,
  U: number,
  fin_eff: number,
  air_pressure_drop_pa: number,
): CoilNtuResult {
  const warnings = [...area.warnings];
  const airProps = calculateAirProperties(input.air_inlet_temp_c);
  const m_air_kgs = (input.airflow_m3h / 3600) * airProps.density_kg_m3;
  const C_air = m_air_kgs * airProps.cp_j_kg_k; // W/K

  // Fluido a T constante → Cr = 0
  const NTU = calculateNTU(U, area.A_total_m2, C_air);
  const epsilon = calculateEffectivenessCrossflowUnmixed(NTU, 0);

  const { Q_w } = calculateHeatTransferByNTU({
    effectiveness: epsilon,
    Cmin: C_air,
    hotIn_c: input.coil_type === "evaporator" ? input.air_inlet_temp_c : input.refrigerant_sat_temp_c,
    coldIn_c: input.coil_type === "evaporator" ? input.refrigerant_sat_temp_c : input.air_inlet_temp_c,
  });

  const delta_T_air = C_air > 0 ? Q_w / C_air : 0;
  const air_outlet_temp_c = input.coil_type === "evaporator"
    ? input.air_inlet_temp_c - delta_T_air
    : input.air_inlet_temp_c + delta_T_air;

  if (NTU > 10) warnings.push("NTU muito alto (>10) — verificar geometria");

  return {
    capacity_w: Q_w,
    air_outlet_temp_c,
    u_w_m2k: U,
    h_air_w_m2k: h_air,
    fin_efficiency: fin_eff,
    exchange_area_m2: area.A_total_m2,
    lmtd_k: null,
    ntu: NTU,
    effectiveness: epsilon,
    air_pressure_drop_pa,
    engine_used: "ntu_epsilon",
    warnings,
  };
}

// ── Motor LMTD iterativo ─────────────────────────────────────────────────────

/**
 * Motor LMTD iterativo para fluido a temperatura constante.
 * Itera T_ar_out até convergência:
 *   1. Estima T_ar_out
 *   2. Calcula LMTD
 *   3. Q = U × A × LMTD
 *   4. T_ar_out_novo = T_ar_in − Q/(ṁ·cp)  [evap] ou T_ar_in + Q/(ṁ·cp)  [cond]
 *   5. Repete até |ΔT_ar_out| < 0.01°C
 */
function calcLmtdIterative(
  input: CoilNtuInput,
  area: { A_total_m2: number; warnings: string[] },
  h_air: number,
  U: number,
  fin_eff: number,
  air_pressure_drop_pa: number,
): CoilNtuResult {
  const warnings = [...area.warnings];
  const airProps = calculateAirProperties(input.air_inlet_temp_c);
  const m_air_kgs = (input.airflow_m3h / 3600) * airProps.density_kg_m3;
  const C_air = m_air_kgs * airProps.cp_j_kg_k; // W/K

  const T_refrig = input.refrigerant_sat_temp_c;
  const T_air_in = input.air_inlet_temp_c;
  const isEvap = input.coil_type === "evaporator";

  // Estimativa inicial: ΔT = 5K
  let T_air_out = isEvap ? T_air_in - 5 : T_air_in + 5;
  let Q_w = 0;
  let lmtd_k: number | null = null;
  const MAX_ITER = 50;
  const TOL = 0.01; // °C

  for (let i = 0; i < MAX_ITER; i++) {
    // LMTD para fluido a T constante
    const lmtdResult = isEvap
      ? calculateLMTD({
          hotIn_c: T_air_in,
          hotOut_c: T_air_out,
          coldIn_c: T_refrig,
          coldOut_c: T_refrig,
        })
      : calculateLMTD({
          hotIn_c: T_refrig,
          hotOut_c: T_refrig,
          coldIn_c: T_air_in,
          coldOut_c: T_air_out,
        });

    lmtd_k = lmtdResult.lmtd_k;

    if (!lmtd_k || lmtd_k <= 0) {
      // LMTD inválido — usar motor NTU como fallback
      warnings.push("LMTD inválido — usando NTU-ε como fallback");
      return calcNtuEpsilon(input, area, h_air, U, fin_eff, air_pressure_drop_pa);
    }

    Q_w = calculateHeatTransferByLMTD({ u_w_m2k: U, area_m2: area.A_total_m2, lmtd_k });

    const T_air_out_new = isEvap
      ? T_air_in - Q_w / C_air
      : T_air_in + Q_w / C_air;

    if (Math.abs(T_air_out_new - T_air_out) < TOL) {
      T_air_out = T_air_out_new;
      break;
    }
    T_air_out = T_air_out_new;
  }

  return {
    capacity_w: Q_w,
    air_outlet_temp_c: T_air_out,
    u_w_m2k: U,
    h_air_w_m2k: h_air,
    fin_efficiency: fin_eff,
    exchange_area_m2: area.A_total_m2,
    lmtd_k,
    ntu: null,
    effectiveness: null,
    air_pressure_drop_pa,
    engine_used: "lmtd_iterative",
    warnings,
  };
}

// ── Função principal ─────────────────────────────────────────────────────────

/**
 * Calcula a capacidade de uma serpentina usando NTU-ε ou LMTD iterativo.
 *
 * Diferença fundamental em relação ao `sizeCoil` antigo:
 * - Não usa temperaturas estimadas fixas (air_outlet = air_inlet - 8°C)
 * - Calcula a temperatura de saída do ar a partir da geometria e das condições
 * - A geometria da serpentina INFLUENCIA o resultado (mais área → mais Q)
 */
export function calcCoilCapacity(input: CoilNtuInput): CoilNtuResult {
  const warnings: string[] = [];

  const tube_od_m = input.tube_outer_diameter_mm / 1000;
  const tube_wall_m = input.tube_wall_thickness_m ?? DEFAULT_TUBE_WALL;
  const tube_cond = input.tube_conductivity_w_mk ?? DEFAULT_TUBE_COND;
  const fin_cond = input.fin_conductivity_w_mk ?? DEFAULT_FIN_COND;
  const fin_thick = input.fin_thickness_m ?? DEFAULT_FIN_THICK;
  const h_fluid = input.h_fluid_w_m2k ?? DEFAULT_H_FLUID;
  const pitch_t_mm = input.tube_pitch_transverse_mm ?? input.row_pitch_mm;

  // 1. Área com aletas
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
      engine_used: input.engine, warnings,
    };
  }

  // 2. Área frontal
  const height_m = (input.tubes_per_row * pitch_t_mm) / 1000;
  const length_m = input.length_mm / 1000;
  const frontal_area_m2 = height_m * length_m;

  // 3. h_ar
  const { h_air, warnings: hWarn } = calcHAir(
    input.airflow_m3h, frontal_area_m2, tube_od_m, input.air_inlet_temp_c,
  );
  warnings.push(...hWarn);

  // 4. Eficiência de aleta
  const finResult = calculateFinEfficiencySimplified({
    h_air_w_m2k: h_air,
    finConductivity_w_mk: fin_cond,
    finThickness_m: fin_thick,
  });
  warnings.push(...finResult.warnings);
  const fin_eff = finResult.finEfficiency;

  // 5. U global
  const U = calcU(h_air, h_fluid, fin_eff, tube_wall_m, tube_cond);

  if (U <= 0) {
    warnings.push("U global = 0 — verificar h_ar e h_fluido");
    return {
      capacity_w: 0, air_outlet_temp_c: input.air_inlet_temp_c,
      u_w_m2k: 0, h_air_w_m2k: h_air, fin_efficiency: fin_eff,
      exchange_area_m2: areaResult.A_total_m2, lmtd_k: null,
      ntu: null, effectiveness: null, air_pressure_drop_pa: 0,
      engine_used: input.engine, warnings,
    };
  }

  // 6. Queda de pressão do ar (simplificada)
  const faceVelocity = input.airflow_m3h > 0
    ? input.airflow_m3h / 3600 / Math.max(frontal_area_m2, 0.001)
    : 0;
  const airProps = calculateAirProperties(input.air_inlet_temp_c);
  const air_dp_pa = 0.5 * airProps.density_kg_m3 * faceVelocity ** 2 * input.rows * 2;

  // 7. Calcular pelo motor selecionado
  if (input.engine === "ntu_epsilon") {
    return calcNtuEpsilon(input, areaResult, h_air, U, fin_eff, air_dp_pa);
  } else {
    return calcLmtdIterative(input, areaResult, h_air, U, fin_eff, air_dp_pa);
  }
}
