import {
  calculateCoil,
  calculateCoilAdvanced,
} from "@/modules/coldpro_v2/engines/coilCalculationEngine";
import { computeFinnedExternalArea } from "@/modules/coldpro_v2/engines/core/finnedExternalArea";
import type { CoilSizingInput, CoilSizingResult } from "../types";

/**
 * Dimensiona uma serpentina (evaporador ou condensador) usando o motor
 * calculateCoilAdvanced com as correções matemáticas aplicadas:
 *  - Área total com aletas (finnedExternalArea)
 *  - Eficiência de aleta via Schmidt (1949)
 *  - Velocidade do fluido = ṁ/(ρ·A)
 */
export function sizeCoil(input: CoilSizingInput): CoilSizingResult {
  const warnings: string[] = [];

  const rows = input.geometry?.rows ?? 4;
  const tubes_per_row = input.geometry?.tubes_per_row ?? 12;
  const circuits = input.geometry?.circuits ?? 4;
  const length_mm = input.geometry?.length_mm ?? 1200;
  const tube_diameter_mm = input.geometry?.tube_diameter_mm ?? 9.52;
  const fin_spacing_mm = input.geometry?.fin_spacing_mm ?? 4.0;
  const tube_thickness_mm = 0.35;

  // Passos de tubo típicos para arranjo triangular
  const tube_pitch_transverse_m = 0.025; // 25 mm
  const tube_pitch_longitudinal_m = 0.022; // 22 mm

  // Calcular área com aletas
  const areaResult = computeFinnedExternalArea({
    rows,
    tubes_per_row,
    tube_length_m: length_mm / 1000,
    tube_outer_diameter_m: tube_diameter_mm / 1000,
    fin_thickness_m: 0.0001,
    fin_pitch_m: fin_spacing_mm / 1000,
    tube_pitch_transversal_m: tube_pitch_transverse_m,
    tube_pitch_longitudinal_m: tube_pitch_longitudinal_m,
  });
  warnings.push(...areaResult.warnings);

  // Temperatura de saída do fluido estimada
  const fluid_outlet_temp_c =
    input.coil_type === "evaporator"
      ? input.fluid_inlet_temp_c + 5 // superaquecimento típico
      : input.fluid_inlet_temp_c - 10; // subresfriamento típico

  // Temperatura de saída do ar estimada
  const air_outlet_temp_c =
    input.coil_type === "evaporator"
      ? input.air_inlet_temp_c - 8
      : input.air_inlet_temp_c + 12;

  const useBasic = input.engine === "basic";

  const result = useBasic
    ? calculateCoil({
        rows,
        tubes_per_row,
        circuits,
        fin_spacing_mm,
        length_mm,
        tube_diameter_mm,
        tube_thickness_mm,
        airflow_m3h: input.airflow_m3h,
        delta_t_k: Math.abs(air_outlet_temp_c - input.air_inlet_temp_c),
        mass_flow_kgs: null,
      })
    : calculateCoilAdvanced({
        rows,
        tubes_per_row,
        circuits,
        fin_spacing_mm,
        length_mm,
        tube_diameter_mm,
        tube_thickness_mm,
        airflow_m3h: input.airflow_m3h,
        delta_t_k: null,
        mass_flow_kgs: null,
        air_inlet_temp_c: input.air_inlet_temp_c,
        air_outlet_temp_c,
        fluid_inlet_temp_c: input.fluid_inlet_temp_c,
        fluid_outlet_temp_c,
        fluid_h_w_m2k: null,
        fin_conductivity_w_mk: 200,
        fin_thickness_m: 0.0001,
        wall_resistance_m2k_w: null,
        fouling_air_m2k_w: null,
        fouling_fluid_m2k_w: null,
        tube_roughness_m: null,
        tube_pitch_transverse_m,
        tube_pitch_longitudinal_m,
      });

  warnings.push(...result.warnings);

  // Usar área total com aletas em vez da área de tubo nu
  const exchange_area_m2 =
    areaResult.A_total_m2 > 0 ? areaResult.A_total_m2 : result.exchange_area_m2;

  // Algumas propriedades só existem no motor avançado — caem para null no básico
  const adv = result as Partial<typeof result> & {
    u_w_m2k?: number | null;
    lmtd_k?: number | null;
    fin_efficiency?: number | null;
  };

  return {
    capacity_w: result.capacity_w,
    exchange_area_m2,
    u_w_m2k: adv.u_w_m2k ?? 0,
    lmtd_k: adv.lmtd_k ?? null,
    fin_efficiency: adv.fin_efficiency ?? 1,
    air_pressure_drop_pa: result.air_pressure_drop_pa,
    fluid_pressure_drop_kpa: result.fluid_pressure_drop_kpa,
    fluid_velocity_ms: result.fluid_velocity_ms,
    warnings,
  };
}
