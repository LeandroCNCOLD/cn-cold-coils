/**
 * Serviço de Seleção de Serpentinas por Varredura
 *
 * Etapa 2 — Varredura do Evaporador:
 *   Para o ponto de projeto (Te, Tc), varre geometrias do catálogo CN Coils e
 *   encontra a configuração que satisfaz ΔT_evap ≤ target com menor área.
 *
 * Etapa 3 — Seleção do Condensador pelo Ponto Crítico:
 *   Ponto crítico = Te_min + Tc_max (maior carga de rejeição).
 *   Busca no catálogo a geometria que rejeita Q_cond com ΔT_cond ≤ target.
 *
 * Metodologia de transferência de calor:
 *   - Resistência convectiva do ar: correlação Wang-Chi-Chang (2000)
 *   - Eficiência de aleta: Schmidt (1949)
 *   - Resistência do fluido interno: Chen (1966) para evaporação,
 *     Nusselt (1916) para condensação em filme
 *   - U global: 1/U = 1/h_ar + R_parede + 1/(η·h_ref)
 *   - Capacidade: Q = U·A·LMTD
 *
 * Referências:
 *   Wang, C.-C., Chi, K.-Y., Chang, C.-J. (2000). Heat transfer and friction
 *     characteristics of plain fin-and-tube heat exchangers. Int. J. Heat Mass Transfer.
 *   Schmidt, T.E. (1949). Heat transfer calculations for extended surfaces.
 *     Refrigerating Engineering.
 */

import { computeFinnedExternalArea } from "@/modules/coldpro_v2/engines/core/finnedExternalArea";

// ── Tipos ────────────────────────────────────────────────────────────────────

export interface CoilGeometryCandidate {
  /** ID da geometria no catálogo */
  id: string;
  /** Descrição legível */
  name: string;
  /** Diâmetro externo do tubo [mm] */
  tube_od_mm: number;
  /** Diâmetro interno do tubo [mm] */
  tube_id_mm: number;
  /** Passo transversal [mm] */
  pitch_transverse_mm: number;
  /** Passo longitudinal [mm] */
  pitch_longitudinal_mm: number;
  /** Espessura da aleta [mm] */
  fin_thickness_mm: number;
}

export interface EvaporatorSweepConfig {
  /** Capacidade frigorífica requerida [W] */
  required_capacity_w: number;
  /** Temperatura de evaporação [°C] */
  te_c: number;
  /** Temperatura de entrada do ar [°C] */
  air_inlet_temp_c: number;
  /** Umidade relativa do ar de entrada [0–1] */
  air_rh_in: number;
  /** Vazão de ar [m³/h] */
  airflow_m3h: number;
  /** ΔT máximo permitido (T_ar_entrada − Te) [K] */
  delta_t_max_k: number;
  /** Geometrias a varrer (do catálogo CN Coils) */
  geometries: CoilGeometryCandidate[];
  /** Número de fileiras a testar */
  rows_to_test?: number[];
  /** Número de tubos por fileira a testar */
  tubes_per_row_to_test?: number[];
  /** Comprimentos a testar [mm] */
  lengths_to_test_mm?: number[];
  /** Passo de aleta a testar [mm] */
  fin_spacings_to_test_mm?: number[];
}

export interface EvaporatorSweepCandidate {
  geometry_id: string;
  geometry_name: string;
  rows: number;
  tubes_per_row: number;
  length_mm: number;
  fin_spacing_mm: number;
  circuits: number;
  /** Área total com aletas [m²] */
  total_area_m2: number;
  /** Capacidade calculada [W] */
  capacity_w: number;
  /** ΔT efetivo (T_ar_in − Te) [K] */
  delta_t_k: number;
  /** Coeficiente global U [W/m²K] */
  u_global_w_m2k: number;
  /** Eficiência de aleta [0–1] */
  fin_efficiency: number;
  /** Queda de pressão do ar [Pa] */
  air_dp_pa: number;
  /** Atende o critério de ΔT? */
  meets_delta_t: boolean;
  /** Score de seleção (menor área que atende = melhor) */
  score: number;
}

export interface EvaporatorSweepResult {
  /** Candidatos ordenados por score */
  candidates: EvaporatorSweepCandidate[];
  /** Melhor candidato (menor área que atende ΔT) */
  selected: EvaporatorSweepCandidate | null;
  /** Candidatos que atendem o critério */
  qualifying_count: number;
  warnings: string[];
}

export interface CondenserSelectionConfig {
  /** Calor a rejeitar [W] = Q_evap + W_compressor */
  required_heat_rejection_w: number;
  /** Temperatura de condensação [°C] */
  tc_c: number;
  /** Temperatura de entrada do ar [°C] */
  air_inlet_temp_c: number;
  /** Vazão de ar [m³/h] */
  airflow_m3h: number;
  /** ΔT máximo permitido (Tc − T_ar_entrada) [K] */
  delta_t_max_k: number;
  /** Geometrias de condensação a varrer */
  geometries: CoilGeometryCandidate[];
  rows_to_test?: number[];
  tubes_per_row_to_test?: number[];
  lengths_to_test_mm?: number[];
  fin_spacings_to_test_mm?: number[];
}

export interface CondenserSelectionCandidate extends EvaporatorSweepCandidate {
  /** Calor rejeitado calculado [W] */
  heat_rejection_w: number;
}

export interface CondenserSelectionResult {
  candidates: CondenserSelectionCandidate[];
  selected: CondenserSelectionCandidate | null;
  qualifying_count: number;
  warnings: string[];
}

// ── Correlações de transferência de calor ────────────────────────────────────

const AIR_DENSITY = 1.2; // kg/m³ @ 0°C, 1 atm
const AIR_CP = 1006; // J/(kg·K)
const AIR_VISCOSITY = 1.81e-5; // Pa·s
const AIR_CONDUCTIVITY = 0.0257; // W/(m·K)
const AIR_PRANDTL = 0.713;

/**
 * Coeficiente convectivo do ar — Wang-Chi-Chang (2000) para aletas planas.
 * j = 0.394 · Re_Dc^(−0.392) · (s/Dc)^(−0.0449) · (s/Lc)^(−0.0897) · N^(−0.0528)
 * h_ar = j · G · Cp / Pr^(2/3)
 */
function calcHAir(
  face_velocity_ms: number,
  tube_od_m: number,
  fin_pitch_m: number,
  rows: number,
): number {
  const Re = (AIR_DENSITY * face_velocity_ms * tube_od_m) / AIR_VISCOSITY;
  if (Re < 100) return 20; // limite inferior

  const s_Dc = fin_pitch_m / tube_od_m;
  const Lc = 0.05; // comprimento característico estimado
  const s_Lc = fin_pitch_m / Lc;
  const N = Math.max(1, rows);

  const j = 0.394 * Math.pow(Re, -0.392) * Math.pow(s_Dc, -0.0449) * Math.pow(s_Lc, -0.0897) * Math.pow(N, -0.0528);
  const G = AIR_DENSITY * face_velocity_ms;
  const h = j * G * AIR_CP * Math.pow(AIR_PRANDTL, -2 / 3);

  return Math.max(15, Math.min(300, h));
}

/**
 * Coeficiente convectivo interno — evaporação bifásica (Chen, 1966 simplificado).
 * h_ref ≈ 3000–8000 W/(m²K) para R404A/R134a em evaporação.
 * Usa aproximação: h_ref = 3500 W/(m²K) como base conservadora.
 */
function calcHRefEvap(): number {
  return 3500; // W/(m²K) — valor conservador para R404A bifásico
}

/**
 * Coeficiente convectivo interno — condensação em filme (Nusselt, 1916).
 * h_cond ≈ 5000–12000 W/(m²K) para R404A/R134a em condensação.
 */
function calcHRefCond(): number {
  return 6000; // W/(m²K) — valor conservador para condensação
}

/**
 * Eficiência de aleta — Schmidt (1949) para aleta circular equivalente.
 * η = tanh(m·r_e·φ) / (m·r_e·φ)
 * onde m = sqrt(2·h_ar / (k_fin·t_fin))
 */
function calcFinEfficiency(
  h_ar: number,
  tube_od_m: number,
  pitch_transverse_m: number,
  fin_thickness_m: number,
  k_fin = 204, // W/(m·K) alumínio
): number {
  const r1 = tube_od_m / 2;
  // Raio equivalente da aleta circular (Schmidt 1949)
  const r2e = 1.27 * (pitch_transverse_m / 2) * Math.sqrt(pitch_transverse_m / tube_od_m - 0.3);
  const Lc = r2e - r1 + fin_thickness_m / 2;
  const m = Math.sqrt((2 * h_ar) / (k_fin * fin_thickness_m));
  const mLc = m * Lc;
  if (mLc < 0.001) return 1.0;
  const eta = Math.tanh(mLc) / mLc;
  return Math.max(0.5, Math.min(1.0, eta));
}

/**
 * Calcula a capacidade de uma configuração de serpentina.
 * Retorna { capacity_w, u_global, fin_efficiency, air_dp_pa, delta_t_k }
 */
function calcCoilCapacity(
  geom: CoilGeometryCandidate,
  rows: number,
  tubes_per_row: number,
  length_mm: number,
  fin_spacing_mm: number,
  airflow_m3h: number,
  air_inlet_temp_c: number,
  fluid_temp_c: number,
  coil_type: "evaporator" | "condenser",
): {
  capacity_w: number;
  total_area_m2: number;
  u_global: number;
  fin_efficiency: number;
  air_dp_pa: number;
  delta_t_k: number;
} {
  const tube_od_m = geom.tube_od_mm / 1000;
  const tube_id_m = geom.tube_id_mm / 1000;
  const pitch_t_m = geom.pitch_transverse_mm / 1000;
  const pitch_l_m = geom.pitch_longitudinal_mm / 1000;
  const fin_pitch_m = fin_spacing_mm / 1000;
  const fin_thick_m = geom.fin_thickness_mm / 1000;
  const length_m = length_mm / 1000;

  // Área frontal e velocidade do ar
  const face_area_m2 = (tubes_per_row * pitch_t_m) * length_m;
  const air_vol_flow_m3s = airflow_m3h / 3600;
  const face_velocity_ms = face_area_m2 > 0 ? air_vol_flow_m3s / face_area_m2 : 2.5;

  // Área total com aletas
  const areaResult = computeFinnedExternalArea({
    rows,
    tubes_per_row,
    tube_length_m: length_m,
    tube_outer_diameter_m: tube_od_m,
    fin_thickness_m: fin_thick_m,
    fin_pitch_m: fin_pitch_m,
    tube_pitch_transversal_m: pitch_t_m,
    tube_pitch_longitudinal_m: pitch_l_m,
  });
  const total_area_m2 = areaResult.A_total_m2;

  // Coeficientes convectivos
  const h_ar = calcHAir(face_velocity_ms, tube_od_m, fin_pitch_m, rows);
  const h_ref = coil_type === "evaporator" ? calcHRefEvap() : calcHRefCond();

  // Eficiência de aleta
  const fin_efficiency = calcFinEfficiency(h_ar, tube_od_m, pitch_t_m, fin_thick_m);

  // Resistência da parede do tubo (cobre)
  const k_copper = 400; // W/(m·K)
  const r_wall = Math.log(tube_od_m / tube_id_m) / (2 * Math.PI * k_copper * length_m * rows * tubes_per_row);

  // Coeficiente global U baseado na área externa
  // 1/U = 1/(η·h_ar) + R_wall·A_ext + A_ext/(A_int·h_ref)
  const A_int_per_A_ext = (tube_id_m / tube_od_m); // aproximação
  const u_global = 1 / (1 / (fin_efficiency * h_ar) + r_wall + 1 / (A_int_per_A_ext * h_ref));

  // LMTD (contracorrente simplificado — fluido isotérmico)
  const delta_t_k = Math.abs(air_inlet_temp_c - fluid_temp_c);
  const lmtd = delta_t_k; // fluido bifásico → LMTD ≈ ΔT médio

  // Capacidade
  const capacity_w = u_global * total_area_m2 * lmtd;

  // Queda de pressão do ar (Darcy-Weisbach simplificado)
  const depth_m = rows * pitch_l_m;
  const air_dp_pa = 0.5 * AIR_DENSITY * face_velocity_ms * face_velocity_ms * (depth_m / (fin_pitch_m + tube_od_m)) * 0.3;

  return {
    capacity_w: Math.max(0, capacity_w),
    total_area_m2,
    u_global: Math.max(0, u_global),
    fin_efficiency,
    air_dp_pa: Math.max(0, air_dp_pa),
    delta_t_k,
  };
}

// ── Varredura do Evaporador ──────────────────────────────────────────────────

export function sweepEvaporator(config: EvaporatorSweepConfig): EvaporatorSweepResult {
  const warnings: string[] = [];
  const candidates: EvaporatorSweepCandidate[] = [];

  const rowsToTest = config.rows_to_test ?? [2, 3, 4, 5, 6];
  const tubesPerRowToTest = config.tubes_per_row_to_test ?? [8, 10, 12, 14, 16];
  const lengthsToTest = config.lengths_to_test_mm ?? [800, 1000, 1200, 1500, 2000];
  const finSpacingsToTest = config.fin_spacings_to_test_mm ?? [4.0, 5.0, 6.0, 7.0, 8.0];

  if (config.geometries.length === 0) {
    warnings.push("Nenhuma geometria fornecida para varredura do evaporador");
    return { candidates: [], selected: null, qualifying_count: 0, warnings };
  }

  for (const geom of config.geometries) {
    for (const rows of rowsToTest) {
      for (const tubes of tubesPerRowToTest) {
        for (const length of lengthsToTest) {
          for (const finSpacing of finSpacingsToTest) {
            const circuits = Math.max(1, Math.floor(tubes / 2));
            const result = calcCoilCapacity(
              geom, rows, tubes, length, finSpacing,
              config.airflow_m3h, config.air_inlet_temp_c, config.te_c, "evaporator",
            );

            const meets = result.delta_t_k <= config.delta_t_max_k &&
              result.capacity_w >= config.required_capacity_w;

            // Score: menor área que atende = melhor (penaliza quem não atende)
            const score = meets ? result.total_area_m2 : result.total_area_m2 * 10;

            candidates.push({
              geometry_id: geom.id,
              geometry_name: geom.name,
              rows,
              tubes_per_row: tubes,
              length_mm: length,
              fin_spacing_mm: finSpacing,
              circuits,
              total_area_m2: result.total_area_m2,
              capacity_w: result.capacity_w,
              delta_t_k: result.delta_t_k,
              u_global_w_m2k: result.u_global,
              fin_efficiency: result.fin_efficiency,
              air_dp_pa: result.air_dp_pa,
              meets_delta_t: meets,
              score,
            });
          }
        }
      }
    }
  }

  // Ordenar por score (menor = melhor)
  candidates.sort((a, b) => a.score - b.score);

  const qualifying = candidates.filter((c) => c.meets_delta_t);
  const selected = qualifying.length > 0 ? qualifying[0] : candidates[0] ?? null;

  if (qualifying.length === 0) {
    warnings.push(
      `Nenhuma configuração atingiu ΔT ≤ ${config.delta_t_max_k} K com Q ≥ ${(config.required_capacity_w / 1000).toFixed(1)} kW. ` +
      `Melhor resultado: ΔT = ${candidates[0]?.delta_t_k.toFixed(1)} K, Q = ${((candidates[0]?.capacity_w ?? 0) / 1000).toFixed(1)} kW`,
    );
  }

  return {
    candidates: candidates.slice(0, 20), // retornar top 20
    selected,
    qualifying_count: qualifying.length,
    warnings,
  };
}

// ── Seleção do Condensador pelo Ponto Crítico ────────────────────────────────

export function selectCondenser(config: CondenserSelectionConfig): CondenserSelectionResult {
  const warnings: string[] = [];
  const candidates: CondenserSelectionCandidate[] = [];

  const rowsToTest = config.rows_to_test ?? [1, 2, 3, 4];
  const tubesPerRowToTest = config.tubes_per_row_to_test ?? [12, 16, 20, 24, 28];
  const lengthsToTest = config.lengths_to_test_mm ?? [1000, 1200, 1500, 2000, 2500];
  const finSpacingsToTest = config.fin_spacings_to_test_mm ?? [2.0, 2.5, 3.0, 3.5];

  if (config.geometries.length === 0) {
    warnings.push("Nenhuma geometria de condensação fornecida");
    return { candidates: [], selected: null, qualifying_count: 0, warnings };
  }

  for (const geom of config.geometries) {
    for (const rows of rowsToTest) {
      for (const tubes of tubesPerRowToTest) {
        for (const length of lengthsToTest) {
          for (const finSpacing of finSpacingsToTest) {
            const circuits = Math.max(1, Math.floor(tubes / 2));
            const result = calcCoilCapacity(
              geom, rows, tubes, length, finSpacing,
              config.airflow_m3h, config.air_inlet_temp_c, config.tc_c, "condenser",
            );

            const meets = result.delta_t_k <= config.delta_t_max_k &&
              result.capacity_w >= config.required_heat_rejection_w;

            const score = meets ? result.total_area_m2 : result.total_area_m2 * 10;

            candidates.push({
              geometry_id: geom.id,
              geometry_name: geom.name,
              rows,
              tubes_per_row: tubes,
              length_mm: length,
              fin_spacing_mm: finSpacing,
              circuits,
              total_area_m2: result.total_area_m2,
              capacity_w: result.capacity_w,
              heat_rejection_w: result.capacity_w,
              delta_t_k: result.delta_t_k,
              u_global_w_m2k: result.u_global,
              fin_efficiency: result.fin_efficiency,
              air_dp_pa: result.air_dp_pa,
              meets_delta_t: meets,
              score,
            });
          }
        }
      }
    }
  }

  candidates.sort((a, b) => a.score - b.score);

  const qualifying = candidates.filter((c) => c.meets_delta_t);
  const selected = qualifying.length > 0 ? qualifying[0] : candidates[0] ?? null;

  if (qualifying.length === 0) {
    warnings.push(
      `Nenhuma configuração de condensador atingiu ΔT ≤ ${config.delta_t_max_k} K com Q_rej ≥ ${(config.required_heat_rejection_w / 1000).toFixed(1)} kW.`,
    );
  }

  return {
    candidates: candidates.slice(0, 20),
    selected,
    qualifying_count: qualifying.length,
    warnings,
  };
}
