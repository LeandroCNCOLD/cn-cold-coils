export type HeatExchangerType =
  | "evaporator_dx"
  | "condenser"
  | "reheat"
  | "cooling_water"
  | "heating_water"
  | "steam"
  | "pump_evaporator"
  | "multiphase_condenser";

export type HeatExchangerRole =
  | "main_evaporator"
  | "main_condenser"
  | "humidity_reheat"
  | "auxiliary_condenser"
  | "secondary_evaporator"
  | "process_cooling"
  | "process_heating"
  | "subcooling_coil";

export type HeatExchangerPosition =
  | "main"
  | "front_of_evaporator"
  | "after_evaporator"
  | "external"
  | "internal"
  | "air_inlet"
  | "air_outlet";

export interface HeatExchanger {
  id: string;
  type: HeatExchangerType;
  role: HeatExchangerRole;
  position: HeatExchangerPosition;
  sequence_order: number;
  enabled: boolean;

  rows: number;
  tubes_per_row: number;
  circuits: number;
  fin_spacing_mm: number;
  length_mm: number;

  tube_diameter_mm: number | null;
  tube_thickness_mm: number | null;

  airflow_m3h: number | null;
  internal_volume_l: number | null;
  exchange_area_m2: number | null;
}

export interface Compressor {
  model: string;
  brand: string | null;
  type: string | null;
  capacity_w: number | null;
  power_w: number | null;
  quantity: number;
}

export interface Fan {
  model: string | null;
  type: string | null;
  airflow_m3h: number | null;
  power_w: number | null;
  quantity: number;
}

export interface ExpansionValve {
  model: string | null;
  type: string | null;
  capacity_w: number | null;
}

export interface Refrigerant {
  name: string;
  gwp: number | null;
  charge_kg: number | null;
}

export interface PerformancePoint {
  evap_temp_c: number;
  cond_temp_c: number;
  capacity_w: number;
  power_w: number;
  cop: number;
  ambient_temp_c: number | null;
  airflow_m3h: number | null;
}

export interface CoilInput {
  rows: number;
  tubes_per_row: number;
  circuits: number;
  fin_spacing_mm: number;
  length_mm: number;
  tube_diameter_mm: number | null;
  tube_thickness_mm: number | null;
  airflow_m3h: number | null;
  delta_t_k: number | null;
  mass_flow_kgs: number | null;
  /** Densidade do fluido refrigerante [kg/m³] — usado para calcular velocidade real */
  fluid_density_kg_m3?: number;
}

export interface CoilResult {
  capacity_w: number;
  sensible_capacity_w: number | null;
  latent_capacity_w: number | null;
  pressure_drop_kpa: number | null;
  air_pressure_drop_pa: number | null;
  leaving_air_temp_c: number | null;
  leaving_air_rh: number | null;
}

export interface CoilEngineResult {
  capacity_w: number;
  capacity_kw: number;
  capacity_kcalh: number;
  capacity_btuh: number;
  capacity_tr: number;
  sensible_capacity_w: number | null;
  latent_capacity_w: number | null;
  exchange_area_m2: number;
  air_pressure_drop_pa: number;
  fluid_pressure_drop_kpa: number;
  fluid_velocity_ms: number;
  warnings: string[];
  status: "ok" | "warning" | "error";
}

export interface CoilAdvancedInput {
  rows: number;
  tubes_per_row: number;
  circuits: number;
  fin_spacing_mm: number;
  length_mm: number;
  tube_diameter_mm: number | null;
  tube_thickness_mm: number | null;
  airflow_m3h: number | null;
  delta_t_k: number | null;
  mass_flow_kgs: number | null;
  air_inlet_temp_c: number | null;
  air_outlet_temp_c: number | null;
  fluid_inlet_temp_c: number | null;
  fluid_outlet_temp_c: number | null;
  fluid_h_w_m2k: number | null;
  fin_conductivity_w_mk: number | null;
  fin_thickness_m: number | null;
  wall_resistance_m2k_w: number | null;
  fouling_air_m2k_w: number | null;
  fouling_fluid_m2k_w: number | null;
  tube_roughness_m: number | null;
  fluid?: string;
  fluid_temperature_c?: number;
  fluid_pressure_kpa?: number;
  fluid_mass_flow_kgs?: number;
  tube_inner_diameter_m?: number;
  tube_outer_diameter_m?: number;
  tube_length_m?: number;
  tube_material?: string;
  circuit_distribution_mode?: "uniform" | "estimated_imbalance";
  /** Densidade do fluido refrigerante [kg/m³] — usado para calcular velocidade real */
  fluid_density_kg_m3?: number;
  circuit_imbalance_factor?: number;
  two_phase_mode?: "disabled" | "auto" | "forced";
  phase_type?: "evaporator" | "condenser";
  quality_override?: number;
  air_face_area_m2?: number;
  air_velocity_ms?: number;
  tube_pitch_transverse_m?: number;
  tube_pitch_longitudinal_m?: number;
  fin_thickness_mm?: number;
  air_relative_humidity?: number;
  air_mass_flow_kg_s?: number;
  enable_psychrometrics?: boolean;
  reheat_capacity_w?: number;
  enable_coupled_solver?: boolean;
  coupled_deadband_c?: number;
  relative_tolerance?: number;
  coupled_air_outlet_guess_c?: number;
  coupled_max_iterations?: number;
  coupled_tolerance_w?: number;
}

export interface CoilAdvancedResult {
  capacity_w: number;
  capacity_kw: number;
  capacity_kcalh: number;
  capacity_btuh: number;
  capacity_tr: number;
  sensible_capacity_w: number | null;
  latent_capacity_w: number | null;
  lmtd_k: number | null;
  u_w_m2k: number;
  air_h_w_m2k: number;
  fluid_h_w_m2k: number;
  reynolds_air: number;
  prandtl_air: number;
  nusselt_air: number;
  exchange_area_m2: number;
  air_pressure_drop_pa: number;
  fluid_pressure_drop_kpa: number;
  fluid_velocity_ms: number;
  fin_efficiency: number;
  warnings: string[];
  status: "ok" | "warning" | "error";
}

export type CoilSolverMode = "evaporator" | "condenser";

export interface CoilIterativeInput extends CoilAdvancedInput {
  mode: CoilSolverMode;
  air_inlet_temperature_c: number;
  air_outlet_temperature_guess_c: number | null;
  fluid_inlet_temperature_c: number;
  fluid_outlet_temperature_guess_c: number | null;
  fluid_mass_flow_kgs: number;
  fluid_cp_j_kg_k: number;
  correction_factor: number | null;
  max_iterations: number | null;
  tolerance_w: number | null;
  relaxation_factor: number | null;
}

export interface IterationRecord {
  iteration: number;
  fluid_outlet_temperature_c: number;
  air_outlet_temperature_c: number;
  air_mean_temperature_c: number;
  q_fluid_w: number;
  q_calc_w: number;
  error_w: number;
  u_w_m2k: number;
  lmtd_k: number | null;
  reynolds_air: number;
  nusselt_air: number;
  fluid_mean_temperature_c: number;
  fluid_reynolds: number;
  fluid_nusselt: number;
  fluid_h_w_m2k: number;
  fluid_velocity_ms: number;
  limiting_circuit_index: number | null;
  average_fluid_h_w_m2k: number | null;
  min_fluid_h_w_m2k: number | null;
  max_fluid_h_w_m2k: number | null;
  max_fluid_pressure_drop_kpa: number | null;
  quality_x: number | null;
  h_two_phase_w_m2k: number | null;
  air_h_w_m2k: number;
}

export interface CoilIterativeResult {
  converged: boolean;
  iterations: number;
  capacity_w: number;
  capacity_kw: number;
  capacity_kcalh: number;
  capacity_btuh: number;
  capacity_tr: number;
  air_outlet_temperature_c: number;
  fluid_outlet_temperature_c: number;
  lmtd_k: number | null;
  u_w_m2k: number;
  air_h_w_m2k: number;
  fluid_h_w_m2k: number;
  reynolds_air: number;
  prandtl_air: number;
  nusselt_air: number;
  air_pressure_drop_pa: number;
  fluid_pressure_drop_kpa: number;
  fluid_reynolds: number;
  fluid_prandtl: number;
  fluid_nusselt: number;
  fluid_velocity_ms: number;
  fluid_flow_regime: string;
  wall_resistance_m2k_w: number;
  air_j_factor: number | null;
  air_total_area_m2: number | null;
  fluid_phase: "single" | "two_phase";
  quality_x: number | null;
  h_two_phase_w_m2k: number | null;
  h_liquid_base: number | null;
  circuit_results: CircuitPerformanceResult[] | null;
  circuit_aggregation: CircuitAggregationResult | null;
  air_humidity_in: number | null;
  air_humidity_out: number | null;
  water_removed_kg_h: number | null;
  latent_load_w: number | null;
  sensible_load_w: number | null;
  final_air_temperature: number | null;
  final_air_RH: number | null;
  error_w: number;
  iteration_history: IterationRecord[];
  warnings: string[];
  status: "ok" | "warning" | "error";
}

export interface CircuitFlowItem {
  circuit_index: number;
  mass_flow_kgs: number;
  flow_fraction: number;
}

export interface CircuitFlowDistributionResult {
  circuit_flows: CircuitFlowItem[];
  total_mass_flow_kgs: number;
  circuits: number;
  distribution_mode: string;
  imbalance_factor: number;
  warnings: string[];
}

export interface CircuitPerformanceResult {
  circuit_index: number;
  mass_flow_kgs: number;
  velocity_m_s: number;
  reynolds: number;
  prandtl: number;
  nusselt: number;
  h_w_m2k: number;
  friction_factor: number;
  flow_regime: string;
  pressure_drop_pa: number;
  pressure_drop_kpa: number;
  warnings: string[];
}

export interface CircuitAggregationResult {
  average_h_w_m2k: number;
  min_h_w_m2k: number;
  max_h_w_m2k: number;
  average_reynolds: number;
  min_reynolds: number;
  max_reynolds: number;
  average_velocity_m_s: number;
  min_velocity_m_s: number;
  max_velocity_m_s: number;
  max_pressure_drop_kpa: number;
  average_pressure_drop_kpa: number;
  limiting_circuit_index: number;
  warnings: string[];
}

export interface WetCoilInput {
  T_air_in: number;
  RH_in: number;
  T_surface: number;
  air_mass_flow_kg_s: number;
  P_atm?: number;
}

export interface WetCoilResult {
  mode: "wet" | "dry";
  T_air_out: number;
  RH_out: number;
  W_in: number;
  W_out: number;
  water_removed_kg_s: number;
  latent_load_w: number;
  sensible_load_w: number;
  total_load_w: number;
  warnings: string[];
}

export interface ReheatInput {
  T_air_in: number;
  RH_in: number;
  air_mass_flow_kg_s: number;
  Q_reheat_w: number;
  P_atm?: number;
}

export interface ReheatResult {
  T_air_out: number;
  RH_out: number;
  W_out: number;
  warnings: string[];
}

export interface CoilSurfaceModeResult {
  mode: "dry" | "wet" | "transition";
  warnings: string[];
}

export interface WetAirCorrectionResult {
  corrected_air_h_w_m2k: number;
  correction_factor: number;
  warnings: string[];
}

export interface MoistAirCoolingLoadResult {
  W_in: number;
  W_out: number;
  h_in_kj_kg: number;
  h_out_kj_kg: number;
  delta_h_kj_kg: number;
  T_dp: number;
  water_removed_kg_s: number;
  water_removed_kg_h: number;
  latent_load_w: number;
  sensible_load_w: number;
  total_load_w: number;
  warnings: string[];
}

export interface CoupledIterationRecord {
  iteration: number;
  T_air_out: number;
  coil_surface_mode: "dry" | "wet" | "transition";
  dew_point_c: number;
  W_in: number;
  W_out: number;
  Q_psychrometric_w: number;
  Q_thermal_w: number;
  error_w: number;
  relative_error: number;
  u_w_m2k: number;
  air_h_corrected_w_m2k: number;
  wet_air_correction_factor: number;
  lmtd_k: number;
}

export interface CoupledCoilResult {
  solver_type: "coupled";
  converged: boolean;
  iterations: number;
  capacity_w: number;
  capacity_kcalh: number;
  capacity_kw: number;
  air_inlet_temperature_c: number;
  air_outlet_temperature_c: number;
  surface_temperature_c: number;
  coil_surface_mode: "dry" | "wet" | "transition";
  dew_point_c: number;
  W_in: number;
  W_out: number;
  water_removed_kg_h: number;
  latent_load_w: number;
  sensible_load_w: number;
  total_load_w: number;
  u_w_m2k: number;
  air_h_dry_w_m2k: number;
  air_h_corrected_w_m2k: number;
  wet_air_correction_factor: number;
  fluid_h_w_m2k: number;
  lmtd_k: number;
  error_w: number;
  relative_error: number;
  iteration_history: CoupledIterationRecord[];
  warnings: string[];
  status: string;
}

export type DripTrayCondition = "water" | "melting_ice" | "dry_air";

export interface DripTrayCoilInput {
  refrigerant?: string;
  tube_outer_diameter_m: number;
  tube_thickness_m: number;
  tube_material?: "copper" | "aluminum" | "steel" | "stainless_steel";
  tray_length_m: number;
  number_of_bends: number;
  pitch_m?: number;
  liquid_mass_flow_kgs: number;
  T_liquid_in_c: number;
  tray_condition: DripTrayCondition;
  T_tray_c: number;
  max_iterations?: number;
  tolerance_c?: number;
}

export interface DripTrayCoilResult {
  number_of_passes: number;
  bend_diameter_m: number;
  straight_length_m: number;
  bend_length_m: number;
  total_length_m: number;
  external_area_m2: number;
  tube_inner_diameter_m: number;
  h_internal_w_m2k: number;
  h_external_w_m2k: number;
  wall_resistance_m2k_w: number;
  u_w_m2k: number;
  reynolds_internal: number;
  prandtl_internal: number;
  nusselt_internal: number;
  internal_velocity_ms: number;
  T_liquid_in_c: number;
  T_liquid_out_c: number;
  liquid_subcooling_k: number;
  T_tray_c: number;
  tray_condition: DripTrayCondition;
  lmtd_k: number;
  q_tray_w: number;
  q_tray_kcalh: number;
  converged: boolean;
  iterations: number;
  warnings: string[];
  status: "ok" | "warning" | "error";
}

export interface ReheatCoilSizingInput {
  Q_reheat_target_w: number;
  T_air_in_c: number;
  T_air_out_c: number;
  air_mass_flow_kg_s: number;
  T_condensing_c: number;
  T_hot_gas_in_c: number;
  refrigerant?: string;
  tube_outer_diameter_m: number;
  tube_thickness_m: number;
  tube_material?: "copper" | "aluminum" | "steel" | "stainless_steel";
  fin_spacing_m: number;
  fin_thickness_m: number;
  fin_material?: "aluminum" | "copper";
  tube_pitch_transversal_m: number;
  tube_pitch_longitudinal_m: number;
  coil_length_m: number;
  circuits: number;
  max_rows?: number;
  evaporator_air_pressure_drop_pa?: number;
  fan_static_pressure_pa?: number;
}

export interface ReheatCoilSizingResult {
  rows_required: number;
  total_tube_length_m: number;
  external_area_m2: number;
  internal_area_m2: number;
  h_air_w_m2k: number;
  h_refrigerant_w_m2k: number;
  u_w_m2k: number;
  lmtd_k: number;
  Q_available_w: number;
  Q_available_kcalh: number;
  Q_target_w: number;
  Q_target_kcalh: number;
  capacity_ratio: number;
  reheat_air_pressure_drop_pa: number;
  total_air_pressure_drop_pa: number;
  fan_feasible: boolean;
  T_air_in_c: number;
  T_air_out_c: number;
  T_condensing_c: number;
  sizing_feasible: boolean;
  converged: boolean;
  warnings: string[];
  status: "ok" | "warning" | "error";
}

export interface FrostFormationInput {
  air_temperature_c: number;
  air_relative_humidity: number;
  air_mass_flow_kg_s: number;
  coil_surface_temperature_c: number;
  evaporating_temperature_c?: number;
  operation_time_h: number;
  evaporator_external_area_m2: number;
  airflow_reduction_factor?: number;
  frost_density_kg_m3?: number;
  defrost_threshold_frost_mass_kg?: number;
  defrost_threshold_frost_thickness_mm?: number;
  P_atm?: number;
}

export interface FrostFormationResult {
  mode: "dry" | "condensation_only" | "frosting";
  dew_point_c: number;
  W_in: number;
  W_surface: number;
  water_condensed_kg_h: number;
  frost_fraction: number;
  frost_formation_kg_h: number;
  frost_mass_kg: number;
  frost_density_kg_m3: number;
  frost_volume_m3: number;
  frost_thickness_mm: number;
  airflow_reduction_factor: number;
  estimated_capacity_loss_pct: number;
  recommended_defrost: boolean;
  estimated_time_to_defrost_h: number | null;
  warnings: string[];
  status: "ok" | "warning" | "error";
}

export interface RollGeometry {
  fin_spacing_mm: number;
  rows_in_roll: number;
}

export interface ProgressiveCoilInput {
  tube_outer_diameter_mm: number;
  tube_inner_diameter_mm: number;
  tube_pitch_transverse_mm: number;
  tube_pitch_longitudinal_mm: number;
  fin_height_mm: number;
  fin_thickness_mm: number;
  coil_width_m: number;
  coil_height_m: number;
  tube_material: "copper" | "aluminum" | "steel";
  fin_material: "copper" | "aluminum" | "steel";
  rolls: RollGeometry[];
  air_temperature_in_c: number;
  air_relative_humidity_in: number;
  air_mass_flow_kg_s: number;
  P_atm?: number;
  T_evaporating_c: number;
  refrigerant?: string;
  frost_thickness_mm_per_roll?: number[];
  frost_density_kg_m3?: number;
  frost_thermal_conductivity_w_mk?: number;
  /** Tipo de aleta — seleciona correlação Wang 2000/1999a/Chang-Wang. Padrão: "plain" */
  fin_type?: "plain" | "wavy" | "louver" | "slit";
  /** Passo de aleta [mm] — necessário para Wang 2000/1999a */
  fin_pitch_mm?: number;
  /** Tempo de operação desde o último degelo [h] — ativa modelo de gelo dinâmico */
  operation_time_h?: number;
  /** Ativa modelo de gelo dinâmico (iceModel.ts). Padrão: false */
  use_ice_model?: boolean;
}

export interface RollResult {
  roll_index: number;
  fin_spacing_mm: number;
  rows_in_roll: number;
  free_flow_area_m2: number;
  total_external_area_m2: number;
  frost_thickness_mm: number;
  frost_resistance_m2k_w: number;
  V_max_m_s: number;
  Re: number;
  air_pressure_drop_pa: number;
  h_o_w_m2k: number;
  h_i_w_m2k: number;
  U_w_m2k: number;
  NTU: number;
  effectiveness: number;
  capacity_w: number;
  condensation_rate_kg_s: number;
  air_temperature_out_c: number;
  air_relative_humidity_out: number;
  W_out_kg_kg: number;
  enthalpy_out_j_kg: number;
  /** Correlação de ar utilizada nesta fila */
  correlation_used?: string;
  /** Espessura de gelo calculada pelo modelo dinâmico [mm] */
  ice_thickness_dynamic_mm?: number;
  /** Resistência térmica do gelo calculada pelo modelo dinâmico [m²K/W] */
  R_ice_dynamic_m2k_w?: number;
  /** Tempo estimado até degelo necessário [h] */
  time_to_defrost_h?: number | null;
}

export interface ProgressiveCoilResult {
  status: "ok" | "warning" | "error";
  warnings: string[];
  rolls: RollResult[];
  total_capacity_w: number;
  total_air_pressure_drop_pa: number;
  total_condensation_rate_kg_s: number;
  air_temperature_out_c: number;
  air_relative_humidity_out: number;
  W_out_kg_kg: number;
  enthalpy_out_j_kg: number;
  estimated_time_to_defrost_h: number | null;
  energy_balance_error_pct: number;
}

export interface OperationalOrchestratorInput {
  operation_time_h: number;
  coupled_input: CoilAdvancedInput;
  frost: {
    evaporator_external_area_m2: number;
    defrost_threshold_frost_mass_kg?: number;
    defrost_threshold_frost_thickness_mm?: number;
    frost_density_kg_m3?: number;
  };
  defrost: {
    method: DefrostMethod;
    compressor_capacity_w: number;
    T_condensing_c: number;
    T_evaporating_c: number;
    bypass_fraction?: number;
    evaporator_external_area_m2?: number;
    max_defrost_time_min?: number;
  };
}

export interface OperationalOrchestratorResult {
  operation_time_h: number;
  coupled_result: CoupledCoilResult;
  frost_result: FrostFormationResult;
  defrost_result: DefrostCycleResult | null;
  recommended_defrost: boolean;
  effective_capacity_w: number;
  capacity_loss_pct: number;
  airflow_reduction_factor: number;
  defrost_time_min: number;
  useful_operation_time_h: number;
  operational_availability_pct: number;
  cycle_status: "normal" | "defrost_recommended" | "defrost_required" | "error";
  warnings: string[];
  status: "ok" | "warning" | "error";
}

export type OperationalMode = "standard" | "progressive";

export interface UnifiedFrostStatus {
  frost_detected: boolean;
  recommended_defrost: boolean;
  critical_frost_thickness_mm?: number;
  critical_roll_index?: number;
  capacity_loss_pct: number;
}

export interface UnifiedDefrostStatus {
  defrost_required: boolean;
  defrost_time_min: number;
  defrost_feasible: boolean;
}

export interface UnifiedProgressiveInfo {
  roll_count: number;
  total_pressure_drop_pa: number;
  energy_balance_error_pct: number;
  critical_roll_index: number;
  critical_frost_thickness_mm: number;
  roll_capacity_w: number[];
  roll_frost_thickness_mm: number[];
}

export interface UnifiedOperationalOutput {
  mode: OperationalMode;
  initial_capacity_w: number;
  effective_capacity_w: number;
  capacity_loss_pct: number;
  operational_availability_pct: number;
  useful_operation_time_h: number;
  operation_time_h: number;
  frost: UnifiedFrostStatus;
  defrost: UnifiedDefrostStatus;
  estimated_time_to_defrost_h: number | null;
  progressive?: UnifiedProgressiveInfo;
  cycle_status: "normal" | "defrost_recommended" | "defrost_required" | "error";
  warnings: string[];
  status: "ok" | "warning" | "error";
}

export interface CompressorSpec {
  cooling_capacity_w: number;
  power_w: number;
  refrigerant: string;
  evap_temp_c: number;
  cond_temp_c: number;
  /** Corrente nominal do motor do compressor (A). Necessário para análise elétrica do sistema. */
  motor_current_a?: number;
  /** Tensão nominal de alimentação (V). Ex: 220, 380, 440. */
  voltage_v?: number;
  /** Número de fases (1 = monofásico, 3 = trifásico). */
  phases?: 1 | 3;
  /** Fator de potência (cos φ). Típico: 0.85 para compressores herméticos. */
  power_factor?: number;
  /** Frequência nominal (Hz). Ex: 50 ou 60. */
  frequency_hz?: number;
   /** Modelo comercial do compressor. */
  model?: string;
  /** Fabricante do compressor. */
  manufacturer?: string;
  /**
   * Coeficientes polinomiais ARI 540 / EN 12900 para interpolação de capacidade frigorífica
   * em função de T_evap (Te_C) e T_cond (Tc_C). Formato: [c1..c10].
   * Q(kW) = c1 + c2·Te + c3·Tc + c4·Te² + c5·Te·Tc + c6·Tc² + c7·Te³ + c8·Tc·Te² + c9·Te·Tc² + c10·Tc³
   * Quando presentes, o motor de curva de desempenho usa esses coeficientes em vez do valor nominal fixo.
   */
  ari540_capacity_coefficients?: number[];
  /**
   * Coeficientes polinomiais ARI 540 / EN 12900 para interpolação de potência absorvida
   * em função de T_evap (Te_C) e T_cond (Tc_C). Formato: [c1..c10].
   * P(kW) = c1 + c2·Te + c3·Tc + c4·Te² + c5·Te·Tc + c6·Tc² + c7·Te³ + c8·Tc·Te² + c9·Te·Tc² + c10·Tc³
   */
  ari540_power_coefficients?: number[];
}
export interface CondenserSpec {
  heat_rejection_capacity_w: number;
  max_cond_temp_c: number;
}

/** Família construtiva do ventilador. */
export type FanFamily =
  | "axial"
  | "centrifugal_forward"
  | "centrifugal_backward"
  | "centrifugal_radial"
  | "mixed_flow"
  | "tangential"
  | "ec_plug";

/** Tipo de transmissão. */
export type FanDriveType = "direct" | "belt";

export interface FanSpec {
  airflow_m3_h: number;
  available_static_pressure_pa: number;
  /** "blower" = soprador, "exhaust" = exaustor. */
  mode?: "blower" | "exhaust";
  /** Família construtiva (axial, centrífugo, etc.). */
  family?: FanFamily;
  /** Diâmetro nominal do rotor (mm). */
  diameter_mm?: number;
  /** Rotação nominal (rpm). */
  rpm?: number;
  /** Número de pás. */
  blade_count?: number;
  /** Potência absorvida do motor (W). */
  motor_power_w?: number;
  /** Corrente nominal (A). */
  motor_current_a?: number;
  /** Tensão nominal (V). */
  voltage_v?: number;
  /** Número de fases (1 ou 3). */
  phases?: 1 | 3;
  /** Frequência nominal (Hz). */
  frequency_hz?: number;
  /** Tipo de transmissão (direta ou correia). */
  drive?: FanDriveType;
  /** Nível de pressão sonora a 1 m (dB(A)). */
  sound_pressure_db?: number;
  /** Peso aproximado (kg). */
  weight_kg?: number;
  /** Fabricante. */
  manufacturer?: string;
  /** Modelo comercial. */
  model?: string;
  /** Coeficientes do polinômio de pressão estática SPH(Q) = a0 + a1·Q + a2·Q² + … (Q em m³/h, SPH em Pa). */
  sph_coefficients?: number[];
  /** Coeficientes do polinômio de potência absorvida P(Q) = p0 + p1·Q + p2·Q² + … (Q em m³/h, P em W). */
  power_coefficients?: number[];
  /** Vazão mínima recomendada na curva (m³/h). */
  min_airflow_m3_h?: number;
  /** Vazão máxima (free flow) recomendada na curva (m³/h). */
  max_airflow_m3_h?: number;
}

export interface ExpansionValveSpec {
  nominal_capacity_w: number;
}

export interface FourWayValveSpec {
  max_capacity_w: number;
}

export interface SystemComponentsInput {
  compressor: CompressorSpec;
  evaporator: { progressive_input: ProgressiveCoilInput };
  condenser: CondenserSpec;
  evaporator_fan?: FanSpec;
  condenser_fan?: FanSpec;
  expansion_valve?: ExpansionValveSpec;
  four_way_valve?: FourWayValveSpec;
  system_conditions: {
    ambient_temp_c: number;
    required_airflow_m3_h: number;
  };
}

export interface ThermalBalance {
  q_evap_w: number;
  q_cond_required_w: number;
  q_cond_available_w: number;
  compressor_power_w: number;
  balance_error_pct: number;
}

export interface ComponentUtilization {
  compressor_pct: number;
  evaporator_pct: number;
  condenser_pct: number;
  expansion_valve_pct?: number;
  evaporator_fan_pct?: number;
  condenser_fan_pct?: number;
  four_way_valve_pct?: number;
}

export interface SystemEquilibriumResult {
  status: "approved" | "warning" | "rejected";
  thermal_balance: ThermalBalance;
  utilization: ComponentUtilization;
  bottleneck_codes: string[];
  bottlenecks: string[];
  warnings: string[];
  recommendations: string[];
  evaporator_result: ProgressiveCoilResult;
}

export interface OperatingPoint {
  evap_temp_c: number;
  cond_temp_c: number;
}

export type PerformanceOperatingPoint = OperatingPoint;

export interface ProductPerformancePoint {
  evap_temp_c: number;
  cond_temp_c: number;
  capacity_w: number;
  compressor_power_w: number;
  /** COP do compressor isolado: Q_evap / W_comp. Valor de catálogo do compressor. */
  cop: number;
  q_cond_w: number;
  /**
   * Potência elétrica total do sistema: W_comp + W_fan_evap + W_fan_cond (W).
   * Calculado quando ventiladores estão definidos em SystemComponentsInput.
   * Igual a compressor_power_w quando ventiladores não estão definidos.
   */
  total_power_w: number;
  /**
   * COP real do sistema: Q_evap / (W_comp + W_fans).
   * Valor correto para dimensionamento elétrico e integração com ferramentas de carga térmica.
   * Igual a cop quando ventiladores não estão definidos.
   */
  cop_system: number;
  balance_error_pct: number;
  status: "approved" | "warning" | "rejected";
  utilization: ComponentUtilization;
  warnings: string[];
  bottleneck_codes: string[];
}

export interface ProductPerformanceCurveInput {
  system: SystemComponentsInput;
  operating_points: OperatingPoint[];
  options?: {
    stop_on_rejection?: boolean;
  };
}

export interface PerformanceEnvelope {
  min_capacity_w: number;
  max_capacity_w: number;
  min_cop: number;
  max_cop: number;
}

export interface PerformanceSummary {
  total_points: number;
  approved_points: number;
  warning_points: number;
  rejected_points: number;
  executed_points: number;
}

export interface ProductPerformanceCurveResult {
  status: "ok" | "warning" | "error";
  points: ProductPerformancePoint[];
  summary: PerformanceSummary;
  envelope: PerformanceEnvelope;
  warnings: string[];
}

/**
 * Targets disponíveis para ajuste de polinômio ARI 540 / EN 12900.
 * - `capacity_w`: capacidade frigorífica do evaporador (W)
 * - `compressor_power_w`: potência absorvida pelo compressor (W)
 * - `cop`: COP do compressor isolado (Q_evap / W_comp)
 * - `q_cond_w`: capacidade de rejeição do condensador (W)
 * - `total_power_w`: potência elétrica total do sistema, incluindo ventiladores (W)
 * - `cop_system`: COP real do sistema, incluindo ventiladores (Q_evap / W_total)
 */
export type PolynomialTarget =
  | "capacity_w"
  | "compressor_power_w"
  | "cop"
  | "q_cond_w"
  | "total_power_w"
  | "cop_system";

export interface PolynomialCoefficients {
  a0: number;
  a1: number;
  a2: number;
  a3: number;
  a4: number;
  a5: number;
}

export interface FitQuality {
  rmse: number;
  max_error_pct: number;
  r2: number;
}

export interface PolynomialCoefficientSet {
  target: PolynomialTarget;
  coefficients: PolynomialCoefficients;
  fit_quality: FitQuality;
}

export interface PolynomialGenerationOptions {
  min_points?: number;
  recommended_min_points?: number;
  include_warning_points?: boolean;
  include_rejected_points?: boolean;
}

export interface PolynomialGenerationInput {
  points: ProductPerformancePoint[];
  targets?: PolynomialTarget[];
  options?: PolynomialGenerationOptions;
}

export interface PolynomialGenerationResult {
  status: "ok" | "warning" | "error";
  coefficients: PolynomialCoefficientSet[];
  used_points: number;
  filtered_points: number;
  warnings: string[];
}

export interface ProductIdentity {
  id: string;
  model: string;
  family: string;
  line: string;
  refrigerant: string;
  application?: string;
}

export interface ProductOperatingLimits {
  min_evap_temp_c: number;
  max_evap_temp_c: number;
  min_cond_temp_c: number;
  max_cond_temp_c: number;
  min_capacity_w: number;
  max_capacity_w: number;
  min_cop: number;
  max_cop: number;
}

/**
 * Análise elétrica completa do sistema de refrigeração.
 * Inclui compressor + todos os ventiladores para o COP real do conjunto.
 * Essencial para dimensionamento de circuito elétrico e integração com
 * ferramentas de cálculo de carga térmica.
 */
export interface ElectricalAnalysis {
  /** Potência absorvida pelo compressor (W). */
  compressor_power_w: number;
  /** Potência absorvida pelo(s) ventilador(es) do evaporador (W). Zero se não definido. */
  evap_fan_power_w: number;
  /** Potência absorvida pelo(s) ventilador(es) do condensador (W). Zero se não definido. */
  cond_fan_power_w: number;
  /** Potência elétrica total do sistema: W_comp + W_fan_evap + W_fan_cond (W). */
  total_electrical_power_w: number;
  /** Corrente total estimada do sistema (A). */
  total_current_a: number;
  /** Corrente do compressor (A). Calculada ou fornecida pelo CompressorSpec. */
  compressor_current_a: number;
  /** Corrente dos ventiladores (A). */
  fans_current_a: number;
  /** Tensão de alimentação (V). */
  voltage_v: number;
  /** Número de fases. */
  phases: 1 | 3;
  /** Fator de potência do sistema. */
  power_factor: number;
  /**
   * COP do compressor isolado: Q_evap / W_comp.
   * Valor que aparece nos catálogos de compressores.
   */
  cop_compressor: number;
  /**
   * COP real do sistema: Q_evap / (W_comp + W_fans).
   * Valor correto para dimensionamento elétrico e cálculo de carga térmica.
   */
  cop_system: number;
  /** Capacidade frigorífica do evaporador no ponto de equilíbrio (W). */
  q_evap_w: number;
  /** Avisos gerados durante o cálculo. */
  warnings: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Machine Validation — Sprint 2
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Especificação nominal da máquina completa (plug-in, rack, split, etc.).
 * Usada pelo machineValidationEngine para definir os critérios de aceitação.
 */
export interface MachineSpec {
  /** Identificador único da máquina (número de série, código de produto, etc.). */
  machine_id: string;
  /** Modelo comercial da máquina. */
  model: string;
  /** Capacidade frigorífica nominal declarada pelo fabricante (W). */
  nominal_capacity_w: number;
  /** Potência elétrica total nominal declarada pelo fabricante (W). */
  nominal_power_w: number;
  /** COP nominal declarado pelo fabricante (adimensional). */
  nominal_cop: number;
  /** Temperatura de evaporação nominal de projeto (°C). */
  nominal_evap_temp_c: number;
  /** Temperatura de condensação nominal de projeto (°C). */
  nominal_cond_temp_c: number;
  /** Temperatura ambiente de projeto (°C). */
  nominal_ambient_temp_c: number;
  /** Critérios de aceitação configuráveis. Usa padrões da norma se omitido. */
  acceptance_criteria?: Partial<MachineAcceptanceCriteria>;
  /**
   * ΔT nominal de projeto do evaporador (K).
   * Definido como: ΔT_evap = T_ambiente − T_evap_nominal.
   * Exemplo: câmara a −20 °C com T_evap = −27 °C → nominal_delta_t_evap_k = 7.
   * Quando informado, habilita o critério `delta_t_evap_check` na validação.
   */
  nominal_delta_t_evap_k?: number;
  /**
   * ΔT nominal de projeto do condensador (K).
   * Definido como: ΔT_cond = T_cond_nominal − T_ambiente_nominal.
   * Exemplo: T_cond = +40 °C, T_ambiente = +32 °C → nominal_delta_t_cond_k = 8.
   * Quando informado, habilita o critério `delta_t_cond_check` na validação.
   */
  nominal_delta_t_cond_k?: number;
}

/**
 * Limiares de aceitação configuráveis por critério.
 * Tolerâncias percentuais relativas ao nominal, exceto onde indicado.
 */
export interface MachineAcceptanceCriteria {
  /** Desvio máximo da capacidade frigorífica em relação ao nominal (%). Default: 5. */
  capacity_tolerance_pct: number;
  /** Desvio máximo da potência elétrica total em relação ao nominal (%). Default: 8. */
  power_tolerance_pct: number;
  /** Desvio máximo do COP do sistema em relação ao nominal (%). Default: 10. */
  cop_tolerance_pct: number;
  /** Erro máximo de balanço térmico (%). Default: 5. */
  balance_error_max_pct: number;
  /** Utilização máxima do compressor (%). Default: 100. */
  compressor_utilization_max_pct: number;
  /** Utilização máxima do condensador (%). Default: 100. */
  condenser_utilization_max_pct: number;
  /** Utilização máxima do evaporador (%). Default: 110. */
  evaporator_utilization_max_pct: number;
  /** Temperatura máxima de descarga do compressor (°C). Default: 130. */
  max_discharge_temp_c: number;
  /**
   * Tolerância máxima de desvio do ΔT do evaporador em relação ao nominal (K).
   * Default: 2 K. Entre 0 e tolerance_k → PASS; entre tolerance_k e 2× → WARNING; acima de 2× → FAIL.
   */
  delta_t_evap_tolerance_k: number;
  /**
   * Tolerância máxima de desvio do ΔT do condensador em relação ao nominal (K).
   * Default: 3 K.
   */
  delta_t_cond_tolerance_k: number;
}

/** Status de um critério individual de validação. */
export type ValidationStatus = "pass" | "warning" | "fail";

/** Resultado de um critério individual de validação. */
export interface ValidationCriterionResult {
  /** Código único do critério (ex: "capacity_check"). */
  criterion_id: string;
  /** Nome legível do critério. */
  label: string;
  /** Valor calculado pelo simulador. */
  calculated_value: number;
  /** Valor de referência (nominal ou limiar). */
  reference_value: number;
  /** Unidade do valor (W, %, °C, adimensional). */
  unit: string;
  /** Desvio percentual em relação à referência. Positivo = acima, negativo = abaixo. */
  deviation_pct: number;
  /** Status do critério. */
  status: ValidationStatus;
  /** Mensagem explicativa do resultado. */
  message: string;
  /** Diagnóstico automático se o critério falhar ou gerar aviso. */
  diagnosis?: string;
}

/**
 * Relatório completo de validação de máquina.
 * Gerado pelo machineValidationEngine a partir de MachineSpec + SystemComponentsInput.
 */
export interface MachineValidationReport {
  /** Especificação da máquina validada. */
  machine_spec: MachineSpec;
  /** Status final da validação. */
  final_status: "approved" | "conditional" | "rejected";
  /** Resultado de cada critério individual. */
  criteria: ValidationCriterionResult[];
  /** Ponto de operação calculado pelo simulador. */
  operating_point: {
    evap_temp_c: number;
    cond_temp_c: number;
    capacity_w: number;
    total_power_w: number;
    cop_system: number;
    balance_error_pct: number;
  };
  /** Análise elétrica completa no ponto de operação. */
  electrical_analysis?: ElectricalAnalysis;
  /** Resumo: quantos critérios passaram, falharam e geraram aviso. */
  summary: {
    total_criteria: number;
    passed: number;
    warnings: number;
    failed: number;
  };
  /** Recomendações de ajuste quando status != approved. */
  recommendations: string[];
  /** Rastreabilidade. */
  traceability: {
    validated_at: string;
    engine_version: string;
  };
}

export interface ProductValidationSummary {
  equilibrium_status: "approved" | "warning" | "rejected";
  curve_status: "ok" | "warning" | "error";
  polynomial_status: "ok" | "warning" | "error";
  final_status: "approved" | "warning" | "rejected";
}

export interface ProductTechnicalRecord {
  identity: ProductIdentity;
  components: SystemComponentsInput;
  equilibrium: SystemEquilibriumResult;
  performance_curve: ProductPerformanceCurveResult;
  polynomial_coefficients: PolynomialGenerationResult;
  operating_limits: ProductOperatingLimits;
   validation: ProductValidationSummary;
  /** Análise elétrica completa: compressor + ventiladores → COP real do sistema. */
  electrical_analysis?: ElectricalAnalysis;
  /**
   * Relatório de validação de máquina completa.
   * Presente quando o registro foi gerado a partir de uma MachineSpec com critérios de aceitação.
   * Contém 8 critérios PASS/WARNING/FAIL e o status final (approved | conditional | rejected).
   */
  machine_validation?: MachineValidationReport;
  /**
   * Referências de start-up para comissionamento em campo.
   * Contém todos os parâmetros esperados (pressões, temperaturas, correntes, carga de fluido)
   * com tolerancias e diagnósticos automáticos para o técnico comparar com as medições reais.
   */
  startup_reference?: StartupReferenceSheet;
  warnings: string[];
  traceability: {
    generated_at: string;
    engine_version: string;
    source: "calculated" | "imported" | "hybrid";
  };
}
export interface ProductTechnicalRecordInput {
  identity: ProductIdentity;
  system: SystemComponentsInput;
  operating_points: PerformanceOperatingPoint[];
  options?: {
    engine_version?: string;
    source?: "calculated" | "imported" | "hybrid";
    stop_on_rejection?: boolean;
  };
}

export interface OperatingMapGridConfig {
  evap_temps_c: number[];
  cond_temps_c: number[];
}

export interface OperatingMapPoint {
  evap_temp_c: number;
  cond_temp_c: number;
  capacity_w: number;
  /** COP do compressor isolado: Q / W_comp */
  cop: number;
  /** COP real do sistema: Q / (W_comp + W_fans) */
  cop_system: number;
  compressor_power_w: number;
  status: "approved" | "warning" | "rejected";
  warnings: string[];
}

export interface OperatingIsoline {
  label: string;
  value: number;
  points: Array<{
    evap_temp_c: number;
    cond_temp_c: number;
  }>;
}

export interface OperatingEnvelope {
  feasible_points: Array<{
    evap_temp_c: number;
    cond_temp_c: number;
  }>;
  rejected_points: Array<{
    evap_temp_c: number;
    cond_temp_c: number;
  }>;
}

export interface OperatingMapStats {
  total_points: number;
  approved_points: number;
  warning_points: number;
  rejected_points: number;
  min_capacity_w: number;
  max_capacity_w: number;
  min_cop: number;
  max_cop: number;
  min_compressor_power_w: number;
  max_compressor_power_w: number;
}

export interface OperatingMapResult {
  map_points: OperatingMapPoint[];
  capacity_isolines: OperatingIsoline[];
  cop_isolines: OperatingIsoline[];
  envelope: OperatingEnvelope;
  max_capacity_point: OperatingMapPoint | null;
  max_cop_point: OperatingMapPoint | null;
  stats: OperatingMapStats;
  warnings: string[];
}

export interface OperatingMapInput {
  system: SystemComponentsInput;
  grid: OperatingMapGridConfig;
  options?: {
    capacity_isoline_count?: number;
    cop_isoline_count?: number;
    stop_on_rejection?: boolean;
  };
}

export type CompressorControlMode = "fixed" | "inverter" | "staged";
export type FanControlMode = "fixed" | "variable";
export type ExpansionControlMode = "mechanical" | "electronic";

export interface VariableControlInput {
  base_system: SystemComponentsInput;
  required_capacity_w: number;
  control: {
    compressor: {
      mode: CompressorControlMode;
      min_capacity_pct?: number;
      stages?: number[];
    };
    condenser_fan: {
      mode: FanControlMode;
      base_airflow_m3_h?: number;
    };
    evaporator_fan: {
      mode: FanControlMode;
      base_airflow_m3_h?: number;
    };
    expansion_valve: {
      mode: ExpansionControlMode;
    };
  };
  targets: {
    room_temp_c: number;
    evap_approach_k: number;
    cond_approach_k: number;
    superheat_k: number;
  };
  limits?: {
    max_iterations?: number;
    tolerance_pct?: number;
  };
}

export interface VariableControlResult {
  status: "stable" | "cycling" | "unreachable" | "error";
  iterations: number;
  compressor_speed_pct: number;
  condenser_fan_speed_pct: number;
  evaporator_fan_speed_pct: number;
  evap_temp_c: number;
  cond_temp_c: number;
  delivered_capacity_w: number;
  compressor_power_w: number;
  fan_power_w: number;
  cop_system: number;
  capacity_error_pct: number;
  warnings: string[];
}

export type CompressorType = "fixed" | "inverter" | "staged";

export interface CompressorUnit {
  id: string;
  type: CompressorType;
  nominal_capacity_w: number;
  power_w: number;
  available?: boolean;
  min_capacity_pct?: number;
}

export interface EvaporatorUnit {
  id: string;
  progressive_input: ProgressiveCoilInput;
}

export interface CondenserUnit {
  id: string;
  heat_rejection_capacity_w: number;
  max_cond_temp_c: number;
}

export interface RefrigerationCircuit {
  id: string;
  compressors: CompressorUnit[];
  evaporators: EvaporatorUnit[];
  condenser_id: string;
  expansion_valve?: {
    nominal_capacity_w: number;
  };
}

export interface SystemArchitectureInput {
  circuits: RefrigerationCircuit[];
  condensers: CondenserUnit[];
  options?: {
    allow_shared_condenser?: boolean;
    redundancy_mode?: "none" | "N+1";
  };
}

export interface CircuitSummary {
  id: string;
  total_compressor_capacity_w: number;
  available_compressor_capacity_w: number;
  total_evaporator_capacity_w: number;
  circuit_capacity_w: number;
  compressor_count: number;
  available_compressor_count: number;
  evaporator_count: number;
  status: "ok" | "warning" | "error";
  warnings: string[];
}

export interface SystemArchitectureResult {
  status: "ok" | "warning" | "error";
  total_installed_capacity_w: number;
  total_available_capacity_w: number;
  circuits: CircuitSummary[];
  shared_condenser_loads: Record<string, number>;
  warnings: string[];
}

export type CompressorDispatchState = "off" | "on" | "modulating" | "unavailable";

export interface CompressorDispatchResult {
  compressor_id: string;
  type: CompressorType;
  state: CompressorDispatchState;
  capacity_w: number;
  power_w: number;
  speed_pct?: number;
}

export interface CircuitControlResult {
  circuit_id: string;
  required_capacity_w: number;
  delivered_capacity_w: number;
  capacity_error_pct: number;
  compressor_dispatch: CompressorDispatchResult[];
  status: "stable" | "cycling" | "unreachable" | "error";
  warnings: string[];
}

export interface MultiCircuitControlInput {
  architecture: SystemArchitectureInput;
  loads: {
    circuit_id: string;
    required_capacity_w: number;
  }[];
  options?: {
    tolerance_pct?: number;
    max_iterations?: number;
    prefer_inverter_trim?: boolean;
    allow_cycling?: boolean;
  };
}

export interface MultiCircuitControlResult {
  status: "stable" | "warning" | "unreachable" | "error";
  circuits: CircuitControlResult[];
  total_required_capacity_w: number;
  total_delivered_capacity_w: number;
  total_capacity_error_pct: number;
  estimated_total_power_w: number;
  estimated_cop: number;
  condenser_loads: Record<string, number>;
  condenser_warnings: string[];
  warnings: string[];
}

export interface ProductRegistryAddResult {
  status: "added" | "duplicate" | "error";
  id: string;
  model: string;
  warnings: string[];
}

export interface ProductRegistryFilter {
  family?: string;
  line?: string;
  refrigerant?: string;
  application?: string;
  final_status?: "approved" | "warning" | "rejected";
}

export interface ProductComparisonItem {
  id: string;
  model: string;
  family: string;
  line: string;
  refrigerant: string;
  final_status: "approved" | "warning" | "rejected";
  min_capacity_w: number;
  max_capacity_w: number;
  min_cop: number;
  max_cop: number;
  min_evap_temp_c: number;
  max_evap_temp_c: number;
  min_cond_temp_c: number;
  max_cond_temp_c: number;
}

export interface ProductRegistryStats {
  total: number;
  approved: number;
  warning: number;
  rejected: number;
  by_family: Record<string, number>;
  by_line: Record<string, number>;
  by_refrigerant: Record<string, number>;
  by_application: Record<string, number>;
}

export interface ProductTechnicalRegistryHandle {
  add(record: ProductTechnicalRecord): ProductRegistryAddResult;
  addMany(records: ProductTechnicalRecord[]): ProductRegistryAddResult[];
  getById(id: string): ProductTechnicalRecord | undefined;
  getByModel(model: string): ProductTechnicalRecord | undefined;
  filter(filter: ProductRegistryFilter): ProductTechnicalRecord[];
  listApproved(): ProductTechnicalRecord[];
  listWarnings(): ProductTechnicalRecord[];
  listRejected(): ProductTechnicalRecord[];
  compare(ids?: string[]): ProductComparisonItem[];
  stats(): ProductRegistryStats;
  all(): ProductTechnicalRecord[];
}

export interface ProductTechnicalExportPayload {
  schema_version: string;
  exported_at: string;
  product: {
    id: string;
    model: string;
    family: string;
    line: string;
    refrigerant: string;
    application?: string;
  };
  validation: ProductValidationSummary;
  operating_limits: ProductOperatingLimits;
  performance_curve: {
    evap_temp_c: number;
    cond_temp_c: number;
    capacity_w: number;
    compressor_power_w: number;
    cop: number;
    q_cond_w: number;
    status: "approved" | "warning" | "rejected";
  }[];
  polynomial_coefficients: PolynomialCoefficientSet[];
  operating_map?: {
    stats: OperatingMapStats;
    max_capacity_point: OperatingMapPoint | null;
    max_cop_point: OperatingMapPoint | null;
  };
  warnings: string[];
  traceability: {
    generated_at: string;
    engine_version: string;
    source: "calculated" | "imported" | "hybrid";
  };
}

export interface ProductTechnicalExportInput {
  record: ProductTechnicalRecord;
  operating_map?: OperatingMapResult;
  options?: {
    schema_version?: string;
  };
}

export type DefrostMethod = "hot_gas_reversal" | "hot_gas_bypass" | "electric";

export interface DefrostCycleInput {
  method: DefrostMethod;
  frost_mass_kg: number;
  frost_temperature_c: number;
  compressor_capacity_w: number;
  T_condensing_c: number;
  T_evaporating_c: number;
  refrigerant?: string;
  bypass_fraction?: number;
  evaporator_external_area_m2?: number;
  max_defrost_time_min?: number;
  P_atm?: number;
}

export interface DefrostComponentRecommendation {
  component: string;
  specification: string;
  critical: boolean;
  notes: string;
}

export interface DefrostCycleResult {
  method: DefrostMethod;
  Q_sensible_kj: number;
  Q_latent_kj: number;
  Q_total_required_kj: number;
  Q_defrost_available_w: number;
  Q_defrost_available_kw: number;
  defrost_time_min: number;
  defrost_time_feasible: boolean;
  reversal_q_fraction?: number;
  bypass_mass_flow_kg_s?: number;
  bypass_line_diameter_mm?: number;
  accumulator_volume_l?: number;
  electric_power_w?: number;
  electric_power_density_w_m2?: number;
  components: DefrostComponentRecommendation[];
  liquid_return_risk: "low" | "medium" | "high";
  risk_notes: string[];
  warnings: string[];
  status: "ok" | "warning" | "error";
}

export type AgroCycleMode = "cooling_only" | "dehumidification" | "invalid";

export interface AgroCycleInput {
  T_room_c: number;
  RH_room: number;
  T_setpoint_c: number;
  RH_setpoint: number;
  air_mass_flow_kg_s: number;
  P_atm?: number;
  max_iterations?: number;
  tolerance_w?: number;
}

export interface AgroCycleResult {
  mode: AgroCycleMode;
  T_room_c: number;
  RH_room: number;
  W_in: number;
  h_in_kj_kg: number;
  T_setpoint_c: number;
  RH_setpoint: number;
  W_setpoint: number;
  h_reheat_out_kj_kg: number;
  T_evap_out_required_c: number;
  RH_evap_out: number;
  h_evap_out_kj_kg: number;
  Q_evap_w: number;
  Q_evap_kcalh: number;
  Q_reheat_w: number;
  Q_reheat_kcalh: number;
  Q_total_cycle_w: number;
  Q_total_cycle_kcalh: number;
  water_removed_kg_s: number;
  water_removed_kg_h: number;
  final_RH_check: number;
  final_RH_error: number;
  converged: boolean;
  iterations: number;
  warnings: string[];
  status: "ok" | "warning" | "error";
}

export type EquipmentType =
  | "condensing_unit"
  | "evaporator_unit"
  | "complete_system"
  | "plugin_humidity"
  | "custom";

export interface EquipmentConfigurationResult {
  status: "valid" | "invalid";
  errors: string[];
  warnings: string[];
}

export interface EquipmentSimulationResult {
  total_capacity_kcalh: number;
  evaporator_capacity_kcalh: number;
  condenser_capacity_kcalh: number;
  reheat_capacity_kcalh: number;
  bottleneck: string;
  warnings: string[];
}

export interface Equipment {
  id: string;
  model_code: string;
  model_name: string;
  line: string | null;
  equipment_type: EquipmentType;

  voltage: number | null;
  phases: number | null;
  frequency: number | null;

  refrigerant: Refrigerant | null;
  compressor: Compressor | null;
  fans: Fan[];
  expansion_valve: ExpansionValve | null;

  heat_exchangers: HeatExchanger[];

  performance_points: PerformancePoint[];
  metadata: Record<string, unknown>;
}

// ─────────────────────────────────────────────────────────────────────────────────
// Startup Reference — Sprint 3
// ─────────────────────────────────────────────────────────────────────────────────

/**
 * Status de um parâmetro de start-up após comparação com o valor medido em campo.
 */
export type StartupParameterStatus = "pass" | "warning" | "fail" | "not_measured";

/**
 * Um parâmetro individual de referência de start-up.
 * Contém o valor de referência calculado pelo simulador, as tolerâncias aceitáveis
 * e o diagnóstico automático caso o valor medido esteja fora da faixa.
 */
export interface StartupParameter {
  /** Identificador único do parâmetro (ex: "suction_pressure_bar"). */
  id: string;
  /** Nome legível do parâmetro (ex: "Pressão de sucção"). */
  label: string;
  /** Unidade de medida (ex: "bar", "°C", "A", "kg"). */
  unit: string;
  /** Valor de referência calculado pelo simulador. */
  reference_value: number;
  /** Limite inferior aceitável (reference_value - tolerância). */
  tolerance_min: number;
  /** Limite superior aceitável (reference_value + tolerância). */
  tolerance_max: number;
  /** Valor medido em campo pelo técnico. Null se ainda não medido. */
  measured_value: number | null;
  /** Status após comparação com o valor medido. */
  status: StartupParameterStatus;
  /** Diagnóstico automático exibido quando o valor está fora da faixa. */
  diagnosis_if_out_of_range: string;
  /** Instrução de medição para o técnico. */
  measurement_instruction: string;
}

/**
 * Grupo de parâmetros de start-up (pressões, temperaturas, elétrico, etc.).
 */
export interface StartupParameterGroup {
  /** Identificador do grupo (ex: "pressures"). */
  group_id: string;
  /** Nome legível do grupo (ex: "Pressões"). */
  group_label: string;
  /** Parâmetros do grupo. */
  parameters: StartupParameter[];
}

/**
 * Planilha completa de referências de start-up.
 * Gerada pelo startupReferenceEngine a partir do ProductTechnicalRecord.
 * Usada pelo Hub de Start-up para guiar o técnico durante o comissionamento em campo.
 */
export interface StartupReferenceSheet {
  /** Modelo da máquina. */
  machine_model: string;
  /** Refrigerante utilizado. */
  refrigerant: string;
  /** Temperatura de evaporão de projeto (°C). */
  design_evap_temp_c: number;
  /** Temperatura de condensação de projeto (°C). */
  design_cond_temp_c: number;
  /** Temperatura ambiente de projeto (°C). */
  design_ambient_temp_c: number;
  /** Grupos de parâmetros de referência. */
  groups: StartupParameterGroup[];
  /** Estimativa de carga de fluido (kg). */
  estimated_charge_kg: number;
  /** Tolerância na carga de fluido (± kg). */
  charge_tolerance_kg: number;
  /** Avisos gerados durante o cálculo das referências. */
  warnings: string[];
  /** Data/hora de geração das referências (ISO 8601 UTC). */
  generated_at: string;
}

export interface SimulationAssembly {
  equipment: Equipment;
  operating_conditions: {
    ambient_temp_c: number;
    room_temp_c: number;
    room_rh: number;
    altitude_m: number;
  };
  results: CoilResult[];
}

// ============================================================
// Sprint 4 — Exportação de Catálogo e Data Sheet
// ============================================================

/** Opções de exportação do data sheet da máquina. */
export interface CatalogExportOptions {
  /** Versão do schema de exportação. Default: 'cncoils-catalog-v1'. */
  schema_version?: string;
  /** Incluir referências de start-up no export. Default: true. */
  include_startup_reference?: boolean;
  /** Incluir análise elétrica detalhada. Default: true. */
  include_electrical?: boolean;
  /** Incluir relatório de validação da máquina. Default: true. */
  include_validation?: boolean;
  /** Incluir curva de performance completa. Default: true. */
  include_performance_curve?: boolean;
}

/** Ponto da curva de performance enriquecido com dados elétricos do sistema. */
export interface CatalogPerformancePoint {
  evap_temp_c: number;
  cond_temp_c: number;
  /** Capacidade frigorífica (W). */
  capacity_w: number;
  /** Potência do compressor isolado (W). */
  compressor_power_w: number;
  /** Potência total do sistema: compressor + ventiladores (W). */
  total_power_w: number;
  /** COP do compressor isolado: Q / W_comp. */
  cop_compressor: number;
  /** COP real do sistema: Q / (W_comp + W_fans). Valor correto para carga térmica. */
  cop_system: number;
  /** Calor rejeitado no condensador (W). */
  q_cond_w: number;
  /** Status do ponto de operação. */
  status: "approved" | "warning" | "rejected";
}

/** Conjunto de coeficientes polinomiais enriquecido com metadados. */
export interface CatalogPolynomialSet {
  /** Alvo do polinômio. */
  target: PolynomialTarget;
  /** Descrição legível do alvo. */
  target_label: string;
  /** Unidade do valor calculado pelo polinômio. */
  unit: string;
  /** Coeficientes C1–C10 (ARI 540 / EN 12900). */
  coefficients: number[];
  /** R² do ajuste (qualidade do fit). */
  r_squared: number;
  /** Número de pontos usados no ajuste. */
  used_points: number;
  /** Qualidade do fit: 'excellent' | 'good' | 'acceptable' | 'poor'. */
  fit_quality: string;
}

/** Dados elétricos completos da máquina para integração com ferramentas de carga térmica. */
export interface CatalogElectricalData {
  /** Potência total do sistema no ponto nominal (W). */
  total_power_w: number;
  /** Potência do compressor isolado (W). */
  compressor_power_w: number;
  /** Potência total dos ventiladores (W). */
  fans_total_power_w: number;
  /** Corrente total estimada (A). */
  estimated_current_a: number;
  /** Tensão de alimentação (V). */
  voltage_v: number;
  /** Número de fases (1 ou 3). */
  phases: 1 | 3;
  /** Fator de potência do compressor. */
  power_factor: number;
  /** COP real do sistema no ponto nominal. */
  cop_system: number;
  /** Eficiência energética (EER = COP × 3,412 BTU/W·h). */
  eer_btu_wh: number;
}

/** Data sheet completo da máquina para exportação e integração com terceiros. */
export interface MachineDatasheetExport {
  /** Versão do schema de exportação. */
  schema_version: string;
  /** Data/hora de exportação (ISO 8601 UTC). */
  exported_at: string;
  /** Identidade do produto. */
  product: {
    id: string;
    model: string;
    family: string;
    line: string;
    refrigerant: string;
    application?: string;
    description?: string;
  };
  /** Limites de operação do envelope. */
  operating_limits: ProductOperatingLimits;
  /** Status de validação do produto. */
  validation_status: "approved" | "warning" | "rejected";
  /** Análise elétrica completa no ponto nominal. */
  electrical?: CatalogElectricalData;
  /** Curva de performance com dados elétricos do sistema. */
  performance_curve?: CatalogPerformancePoint[];
  /** Coeficientes polinomiais com metadados (inclui cop_system e total_power_w). */
  polynomial_sets?: CatalogPolynomialSet[];
  /** @deprecated Use polynomial_sets. Mantido para compatibilidade. */
  polynomial_coefficients?: CatalogPolynomialSet[];
  /** Referências de start-up para comissionamento em campo. */
  startup_reference?: StartupReferenceSheet;
  /** Relatório de validação da máquina completa (quando MachineSpec fornecida). */
  machine_validation?: MachineValidationReport;
  /** Avisos gerados durante a exportação. */
  warnings: string[];
  /** Rastreabilidade do registro. */
  traceability: {
    generated_at: string;
    engine_version: string;
    source: "calculated" | "imported" | "hybrid";
  };
}

// ============================================================
// Sprint 5 — Hub de Start-up: Medições em Campo e Relatório de Comissionamento
// ============================================================

/**
 * Medições reais informadas pelo técnico em campo durante o start-up.
 * Cada chave corresponde ao `id` de um `StartupParameter`.
 */
export type StartupFieldMeasurements = Record<string, number>;

/**
 * Resultado individual de um parâmetro após comparação com a referência.
 */
export interface CommissioningParameterResult {
  parameter_id: string;
  label: string;
  unit: string;
  reference_value: number;
  measured_value: number;
  deviation: number;
  deviation_pct: number;
  status: StartupParameterStatus;
  diagnosis: string | null;
  measurement_instruction: string;
}

/**
 * Resultado de um grupo de parâmetros no relatório de comissionamento.
 */
export interface CommissioningGroupResult {
  group_id: string;
  group_label: string;
  group_status: StartupParameterStatus;
  parameters: CommissioningParameterResult[];
}

/**
 * Status geral do comissionamento.
 */
export type CommissioningStatus = "approved" | "conditional" | "rejected" | "incomplete";

/**
 * Relatório completo de comissionamento gerado após o técnico informar as medições.
 */
export interface CommissioningReport {
  report_id: string;
  machine_model: string;
  serial_number: string;
  technician_name: string;
  commissioned_at: string;
  location: string;
  final_status: CommissioningStatus;
  summary: {
    total_parameters: number;
    measured: number;
    passed: number;
    warnings: number;
    failed: number;
  };
  groups: CommissioningGroupResult[];
  technician_notes: string;
  system_warnings: string[];
  generated_at: string;
}

/**
 * Entrada para geração do relatório de comissionamento.
 */
export interface CommissioningReportInput {
  reference_sheet: StartupReferenceSheet;
  measurements: StartupFieldMeasurements;
  serial_number: string;
  technician_name: string;
  location: string;
  technician_notes?: string;
}

// ─────────────────────────────────────────────────────────────────────────────────
// Sprint 6 — Workspace AGRO: Hot Gas Bypass + Controle de UR
// ─────────────────────────────────────────────────────────────────────────────────

/**
 * Modo de operação do ciclo com gás quente.
 * - `cooling_only`   : sem reaquecimento (UR de saída ≤ alvo)
 * - `hot_gas_bypass` : reaquecimento via gás quente (ciclo DX)
 * - `electric_reheat`: reaquecimento elétrico (resistência)
 * - `invalid`        : entradas fora de faixa ou não convergiu
 */
export type HotGasBypassMode =
  | "cooling_only"
  | "hot_gas_bypass"
  | "electric_reheat"
  | "invalid";

export interface HotGasBypassInput {
  /** Temperatura de entrada do ar [°C] */
  T_air_in_c: number;
  /** Umidade relativa de entrada [fração 0..1] */
  RH_air_in: number;
  /** Temperatura de saída desejada [°C] */
  T_air_out_setpoint_c: number;
  /** Umidade relativa de saída desejada [fração 0..1] */
  RH_air_out_setpoint: number;
  /** Vazão mássica de ar [kg/s] */
  air_mass_flow_kg_s: number;
  /** Temperatura de evaporação [°C] */
  T_evaporating_c: number;
  /** Temperatura de condensação [°C] */
  T_condensing_c: number;
  /** Fração máxima de gás quente desviado [0..1] — padrão: 0.5 */
  max_bypass_fraction?: number;
  /** Pressão atmosférica [Pa] — padrão: 101325 */
  P_atm?: number;
  /** Máximo de iterações — padrão: 100 */
  max_iterations?: number;
  /** Tolerância de convergência [W] — padrão: 1.0 */
  tolerance_w?: number;
}

export interface HotGasBypassResult {
  mode: HotGasBypassMode;
  /** Fração de gás quente desviado [0..1] */
  bypass_fraction: number;
  /** Capacidade de resfriamento do evaporador [W] */
  Q_evap_w: number;
  /** Calor de reaquecimento fornecido pelo gás quente [W] */
  Q_reheat_w: number;
  /** Potência total do compressor necessária [W] */
  W_compressor_w: number;
  /** COP do ciclo com reaquecimento */
  cop_cycle: number;
  /** Temperatura de saída do ar após reaquecimento [°C] */
  T_air_out_c: number;
  /** Umidade relativa de saída após reaquecimento [fração 0..1] */
  RH_air_out: number;
  /** Razão de mistura de saída [kg/kg ar seco] */
  W_air_out: number;
  /** Água removida [kg/h] */
  water_removed_kg_h: number;
  /** Temperatura do ponto de orvalho de saída [°C] */
  T_dew_out_c: number;
  /** Entalpia de entrada do ar [kJ/kg ar seco] */
  h_air_in_kj_kg: number;
  /** Entalpia de saída do ar [kJ/kg ar seco] */
  h_air_out_kj_kg: number;
  /** Convergiu dentro do limite de iterações */
  converged: boolean;
  /** Número de iterações até convergência */
  iterations: number;
  warnings: string[];
  status: "ok" | "warning" | "error";
}

/**
 * Resultado consolidado do Workspace AGRO.
 */
export interface AgroWorkspaceResult {
  agro_cycle: AgroCycleResult;
  hot_gas_bypass?: HotGasBypassResult;
  reheat_coil?: ReheatCoilSizingResult;
  recommended_mode: "cooling_only" | "hot_gas_bypass" | "electric_reheat";
  status: "ok" | "warning" | "error";
  warnings: string[];
}

// ─────────────────────────────────────────────────────────────────────────────────
// Sprint 7 — Ponte Workspace → Hub
// ─────────────────────────────────────────────────────────────────────────────────

export interface WorkspaceHubPayload {
  workspace_id: string;
  workspace_model: string;
  workspace_type: "evaporator" | "condenser" | "agro" | "custom";
  system_components: SystemComponentsInput;
  machine_spec?: MachineSpec;
  mapped_at: string;
  mapping_warnings: string[];
}

export interface WorkspaceMappingResult {
  success: boolean;
  payload?: WorkspaceHubPayload;
  errors: string[];
  warnings: string[];
}

// ─────────────────────────────────────────────────────────────────────────────────
// Sprint 8 — UX: Análise de Sensibilidade, Semáforo de Qualidade, Wizard
// ─────────────────────────────────────────────────────────────────────────────────

export type SensitivityParameter =
  | "evap_temp_c"
  | "cond_temp_c"
  | "air_velocity_ms"
  | "fin_pitch_mm"
  | "superheat_k"
  | "subcooling_k"
  | "ambient_temp_c";

export interface SensitivityAnalysisInput {
  parameter: SensitivityParameter;
  nominal_value: number;
  range: number;
  n_points?: number;
  nominal_capacity_w: number;
  nominal_cop: number;
  nominal_power_w: number;
}

export interface SensitivityPoint {
  parameter_value: number;
  capacity_w: number;
  cop: number;
  power_w: number;
  delta_capacity_pct: number;
  delta_cop_pct: number;
  delta_power_pct: number;
}

export interface SensitivityAnalysisResult {
  parameter: SensitivityParameter;
  nominal_value: number;
  points: SensitivityPoint[];
  sensitivity_capacity: number;
  sensitivity_cop: number;
  is_dominant: boolean;
  warnings: string[];
}

export type QualityLevel = "green" | "yellow" | "red";

export interface QualitySemaphoreInput {
  simulated_capacity_w: number;
  catalog_capacity_w: number;
  simulated_cop: number;
  catalog_cop: number;
  simulated_power_w: number;
  catalog_power_w: number;
  thresholds?: {
    green_pct: number;
    yellow_pct: number;
  };
}

export interface QualitySemaphoreResult {
  capacity_level: QualityLevel;
  cop_level: QualityLevel;
  power_level: QualityLevel;
  overall_level: QualityLevel;
  capacity_delta_pct: number;
  cop_delta_pct: number;
  power_delta_pct: number;
  capacity_diagnosis: string;
  cop_diagnosis: string;
  power_diagnosis: string;
  overall_diagnosis: string;
}

export type WizardStepId =
  | "application"
  | "refrigerant"
  | "geometry"
  | "thermal_conditions"
  | "compressor"
  | "fans"
  | "review";

export interface WizardStep {
  id: WizardStepId;
  title: string;
  description: string;
  required_fields: string[];
  optional_fields: string[];
  next_step: WizardStepId | null;
  prev_step: WizardStepId | null;
}

export interface WizardConfig {
  steps: WizardStep[];
  total_steps: number;
  profile: "design" | "sales" | "production";
}

export interface WizardValidationResult {
  step_id: WizardStepId;
  is_valid: boolean;
  missing_required: string[];
  warnings: string[];
  can_advance: boolean;
}
