import { calculateCoilAdvanced } from "@/modules/coldpro_v2/engines/coilCalculationEngine";
import type {
  CondenserDimensioningResult,
  CapacityCurvePoint,
} from "../types/app-engineering.types";
import type { CoilGeometryCatalogItem } from "@/modules/cn_coils/types/cncoils.types";
import {
  classifyCondenserPoint,
  type CoveragePoint,
} from "./evaporatorSearchService";

export interface CondenserDimensioningInput {
  geometry: CoilGeometryCatalogItem;
  rows: number;
  tubesPerRow: number;
  lengthMm: number;
  finSpacingMm: number;
  airflowM3h: number;
  airInletTempC: number;
  tc_c: number;
  refrigerant?: string;
  required_heat_rejection_w: number;
  /** Sweep completo do compressor para calcular cobertura ponto a ponto */
  compressorSweep?: CapacityCurvePoint[];
  /** ΔT alvo em K entre Tc e T_ar_in em cada ponto do sweep (padrão: tc_c - airInletTempC) */
  delta_t_target_k?: number;
}

/** Monta os parâmetros do motor para uma dada temperatura de condensação */
function buildCoilParams(
  input: CondenserDimensioningInput,
  fluid_t_c: number,
  air_t_in: number,
) {
  const { geometry, rows, tubesPerRow, lengthMm, finSpacingMm, airflowM3h, refrigerant } = input;
  return {
    rows,
    tubes_per_row: tubesPerRow,
    circuits: Math.max(1, Math.ceil(tubesPerRow / 2)),
    fin_spacing_mm: finSpacingMm,
    length_mm: lengthMm,
    tube_diameter_mm: geometry.tubeOuterDiameterMm,
    tube_thickness_mm:
      geometry.tubeInnerDiameterMm != null
        ? (geometry.tubeOuterDiameterMm - geometry.tubeInnerDiameterMm) / 2
        : null,
    tube_outer_diameter_m: geometry.tubeOuterDiameterMm / 1000,
    tube_inner_diameter_m:
      geometry.tubeInnerDiameterMm != null
        ? geometry.tubeInnerDiameterMm / 1000
        : (geometry.tubeOuterDiameterMm - 0.7) / 1000,
    tube_pitch_transverse_m: geometry.tubePitchTransverseMm / 1000,
    tube_pitch_longitudinal_m: geometry.tubePitchLongitudinalMm / 1000,
    fin_thickness_mm: 0.1,
    airflow_m3h: airflowM3h,
    air_inlet_temp_c: air_t_in,
    air_relative_humidity: 0.5,
    fluid_inlet_temp_c: fluid_t_c,
    fluid_outlet_temp_c: fluid_t_c,
    fluid: refrigerant ?? "R404A",
    two_phase_mode: "auto" as const,
    phase_type: "condenser" as const,
    delta_t_k: null,
    mass_flow_kgs: null,
    air_outlet_temp_c: null,
    fluid_h_w_m2k: null,
    fin_conductivity_w_mk: null,
    fin_thickness_m: null,
    wall_resistance_m2k_w: null,
    fouling_air_m2k_w: null,
    fouling_fluid_m2k_w: null,
    tube_roughness_m: null,
  };
}

export function dimensionCondenser(
  input: CondenserDimensioningInput,
): CondenserDimensioningResult {
  const { tc_c, airInletTempC } = input;

  // Cálculo no ponto de projeto
  const result = calculateCoilAdvanced(buildCoilParams(input, tc_c, airInletTempC));

  const status: "ok" | "undersized" =
    result.capacity_w >= input.required_heat_rejection_w ? "ok" : "undersized";

  const message =
    status === "ok"
      ? `Condensador OK — Q_rej = ${(result.capacity_w / 1000).toFixed(2)} kW ≥ Q_req = ${(input.required_heat_rejection_w / 1000).toFixed(2)} kW`
      : `Subdimensionado — Q_rej = ${(result.capacity_w / 1000).toFixed(2)} kW < Q_req = ${(input.required_heat_rejection_w / 1000).toFixed(2)} kW`;

  // Cobertura ponto a ponto do sweep (quando fornecido)
  let sweepCoverage: CoveragePoint[] | undefined;
  let sweepPointsCovered: number | undefined;
  let sweepTotalPoints: number | undefined;

  if (input.compressorSweep && input.compressorSweep.length > 0) {
    const dtTarget =
      input.delta_t_target_k ?? Math.max(tc_c - airInletTempC, 1);
    sweepCoverage = [];
    let covered = 0;

    for (const pt of input.compressorSweep) {
      // Q_rej = Q_evap + W_comp para cada ponto
      const q_rej_req = pt.capacity_w + pt.power_w;
      const t_air_in = pt.tc_c - dtTarget;
      let q_coil_w = 0;
      let detail: Partial<CoveragePoint> = {};
      try {
        const r = calculateCoilAdvanced(buildCoilParams(input, pt.tc_c, t_air_in));
        q_coil_w = Number.isFinite(r.capacity_w) ? r.capacity_w : 0;
        detail = {
          u_w_m2k: r.u_w_m2k,
          fin_efficiency: r.fin_efficiency,
          air_pressure_drop_pa: r.air_pressure_drop_pa,
          fluid_pressure_drop_kpa: r.fluid_pressure_drop_kpa,
          fluid_velocity_ms: r.fluid_velocity_ms,
          exchange_area_m2: r.exchange_area_m2,
          lmtd_k: r.lmtd_k,
        };
      } catch {
        q_coil_w = 0;
      }
      const fit = classifyCondenserPoint(q_coil_w, q_rej_req);
      const meets =
        fit.status === "ideal" ||
        fit.status === "low_margin" ||
        fit.status === "acceptable_oversize";
      if (meets) covered += 1;

      sweepCoverage.push({
        te_c: pt.te_c,
        tc_c: pt.tc_c,
        q_comp_w: q_rej_req,
        q_evap_w: q_coil_w,
        delta_t_k: pt.tc_c - t_air_in,
        meets,
        ratio: fit.ratio,
        status: fit.status,
        pointScore: fit.score,
        recommendation: fit.recommendation,
        ...detail,
      });
    }
    sweepPointsCovered = covered;
    sweepTotalPoints = input.compressorSweep.length;
  }

  return {
    q_cond_w: result.capacity_w,
    delta_t_k: result.lmtd_k ?? 0,
    u_w_m2k: result.u_w_m2k,
    fin_efficiency: result.fin_efficiency,
    air_pressure_drop_pa: result.air_pressure_drop_pa,
    status,
    message,
    sweepCoverage,
    sweepPointsCovered,
    sweepTotalPoints,
  };
}
