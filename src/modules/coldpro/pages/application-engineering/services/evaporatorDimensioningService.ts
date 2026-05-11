import { calculateCoilAdvanced } from "@/modules/coldpro_v2/engines/coilCalculationEngine";
import type { EvaporatorDimensioningResult } from "../types/app-engineering.types";
import type { CoilGeometryCatalogItem } from "@/modules/cn_coils/types/cncoils.types";

export interface EvaporatorDimensioningInput {
  geometry: CoilGeometryCatalogItem;
  rows: number;
  tubesPerRow: number;
  lengthMm: number;
  finSpacingMm: number;
  airflowM3h: number;
  airInletTempC: number;
  airRhIn: number;
  te_c: number;
  refrigerant?: string;
  required_capacity_w: number;
}

export function dimensionEvaporator(
  input: EvaporatorDimensioningInput,
): EvaporatorDimensioningResult {
  const { geometry, rows, tubesPerRow, lengthMm, finSpacingMm, airflowM3h, airInletTempC, airRhIn, te_c, refrigerant } = input;

  const result = calculateCoilAdvanced({
    rows,
    tubes_per_row: tubesPerRow,
    circuits: Math.max(1, Math.ceil(tubesPerRow / 2)),
    fin_spacing_mm: finSpacingMm,
    length_mm: lengthMm,
    tube_diameter_mm: geometry.tubeOuterDiameterMm,
    tube_thickness_mm: geometry.tubeInnerDiameterMm != null
      ? (geometry.tubeOuterDiameterMm - geometry.tubeInnerDiameterMm) / 2
      : null,
    tube_outer_diameter_m: geometry.tubeOuterDiameterMm / 1000,
    tube_inner_diameter_m: geometry.tubeInnerDiameterMm != null
      ? geometry.tubeInnerDiameterMm / 1000
      : (geometry.tubeOuterDiameterMm - 0.7) / 1000,
    tube_pitch_transverse_m: geometry.tubePitchTransverseMm / 1000,
    tube_pitch_longitudinal_m: geometry.tubePitchLongitudinalMm / 1000,
    fin_thickness_mm: 0.1,
    airflow_m3h: airflowM3h,
    air_inlet_temp_c: airInletTempC,
    air_relative_humidity: airRhIn,
    fluid_inlet_temp_c: te_c,
    fluid_outlet_temp_c: te_c,
    fluid: refrigerant ?? "R404A",
    two_phase_mode: "auto",
    phase_type: "evaporator",
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
  });

  const status: "ok" | "undersized" =
    result.capacity_w >= input.required_capacity_w ? "ok" : "undersized";

  const message =
    status === "ok"
      ? `Evaporador OK — Q_evap = ${(result.capacity_w / 1000).toFixed(2)} kW ≥ Q_req = ${(input.required_capacity_w / 1000).toFixed(2)} kW`
      : `Subdimensionado — Q_evap = ${(result.capacity_w / 1000).toFixed(2)} kW < Q_req = ${(input.required_capacity_w / 1000).toFixed(2)} kW`;

  return {
    q_evap_w: result.capacity_w,
    delta_t_k: result.lmtd_k ?? 0,
    u_w_m2k: result.u_w_m2k,
    fin_efficiency: result.fin_efficiency,
    air_pressure_drop_pa: result.air_pressure_drop_pa,
    status,
    message,
  };
}
