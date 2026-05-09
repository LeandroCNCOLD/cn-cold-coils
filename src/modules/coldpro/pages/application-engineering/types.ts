/**
 * Tipos do módulo Engenharia de Aplicação (Application Engineering)
 *
 * Integra seleção de compressor, dimensionamento de serpentinas e
 * validação do sistema em um único fluxo de trabalho.
 */

// ── Modo de operação ─────────────────────────────────────────────────────────

/** Modo A: usuário define Te/Tc diretamente */
export interface OperatingPointModeA {
  mode: "A";
  evap_temp_c: number;
  cond_temp_c: number;
}

/** Modo B: usuário define T_amb e T_room, motor calcula Te/Tc */
export interface OperatingPointModeB {
  mode: "B";
  room_temp_c: number;
  ambient_temp_c: number;
  /** Diferença de temperatura mínima evaporador (K) — padrão 10 */
  dt_evap_k?: number;
  /** Diferença de temperatura mínima condensador (K) — padrão 15 */
  dt_cond_k?: number;
}

export type OperatingPointInput = OperatingPointModeA | OperatingPointModeB;

export interface OperatingPointResult {
  evap_temp_c: number;
  cond_temp_c: number;
  warnings: string[];
}

// ── Desempenho do compressor ─────────────────────────────────────────────────

export interface CompressorPerformanceInput {
  /** Coeficientes EN12900 de capacidade [c1..c10] */
  capacity_coefficients: number[];
  /** Coeficientes EN12900 de potência [c1..c10] */
  power_coefficients: number[];
  evap_temp_c: number;
  cond_temp_c: number;
}

export interface CompressorPerformanceResult {
  /** Capacidade frigorífica calculada [W] */
  capacity_w: number;
  /** Potência absorvida calculada [W] */
  power_w: number;
  /** COP do compressor */
  cop: number;
  /** Calor rejeitado no condensador [W] */
  heat_rejection_w: number;
  /** Dentro do envelope de operação? */
  within_envelope: boolean;
  warnings: string[];
}

// ── Seleção de ventilador ────────────────────────────────────────────────────

export interface FanSelectionInput {
  required_airflow_m3h: number;
  required_static_pressure_pa: number;
  /** Tipo preferido: axial (evaporador) ou centrifugal (condensador) */
  preferred_family?: "axial" | "centrifugal";
}

export interface FanCandidate {
  model: string;
  manufacturer: string;
  airflow_m3h: number;
  static_pressure_pa: number;
  power_w: number;
  efficiency_pct: number;
  score: number;
}

export interface FanSelectionResult {
  candidates: FanCandidate[];
  selected?: FanCandidate;
  warnings: string[];
}

// ── Dimensionamento de serpentina ────────────────────────────────────────────

export interface CoilSizingInput {
  /** Capacidade requerida [W] */
  required_capacity_w: number;
  /** Temperatura de entrada do fluido [°C] */
  fluid_inlet_temp_c: number;
  /** Temperatura de entrada do ar [°C] */
  air_inlet_temp_c: number;
  /** Vazão de ar [m³/h] */
  airflow_m3h: number;
  /** Tipo de serpentina */
  coil_type: "evaporator" | "condenser";
  /** Geometria inicial (opcional — motor usa padrão se ausente) */
  geometry?: {
    rows?: number;
    tubes_per_row?: number;
    circuits?: number;
    length_mm?: number;
    tube_diameter_mm?: number;
    fin_spacing_mm?: number;
  };
}

export interface CoilSizingResult {
  /** Capacidade calculada [W] */
  capacity_w: number;
  /** Área de troca total (tubo nu + aletas) [m²] */
  exchange_area_m2: number;
  /** Coeficiente global U [W/m²K] */
  u_w_m2k: number;
  /** LMTD [K] */
  lmtd_k: number | null;
  /** Eficiência de aleta [0-1] */
  fin_efficiency: number;
  /** Queda de pressão do ar [Pa] */
  air_pressure_drop_pa: number;
  /** Queda de pressão do fluido [kPa] */
  fluid_pressure_drop_kpa: number;
  /** Velocidade do fluido [m/s] */
  fluid_velocity_ms: number;
  warnings: string[];
}

// ── Validação do sistema ─────────────────────────────────────────────────────

export interface SystemValidationInput {
  compressor_capacity_w: number;
  compressor_power_w: number;
  evaporator_capacity_w: number;
  condenser_capacity_w: number;
  evaporator_fan_power_w?: number;
  condenser_fan_power_w?: number;
}

export interface SystemAlert {
  level: "info" | "warning" | "error";
  code: string;
  message: string;
}

export interface SystemValidationResult {
  /** COP total do sistema (Q_evap / W_total) */
  cop_total: number;
  /** COP do compressor isolado */
  cop_compressor: number;
  /** Balanço térmico: Q_cond_req vs Q_cond_avail */
  thermal_balance_pct: number;
  /** Status geral do sistema */
  status: "approved" | "warning" | "rejected";
  alerts: SystemAlert[];
  warnings: string[];
}

// ── Estado global do módulo ──────────────────────────────────────────────────

export interface ApplicationEngineeringState {
  // Ponto de operação
  operatingPointInput: OperatingPointInput;
  operatingPointResult: OperatingPointResult | null;

  // Compressor
  compressorInput: Partial<CompressorPerformanceInput>;
  compressorResult: CompressorPerformanceResult | null;

  // Evaporador
  evaporatorInput: Partial<CoilSizingInput>;
  evaporatorResult: CoilSizingResult | null;

  // Condensador
  condenserInput: Partial<CoilSizingInput>;
  condenserResult: CoilSizingResult | null;

  // Ventiladores
  evaporatorFanResult: FanSelectionResult | null;
  condenserFanResult: FanSelectionResult | null;

  // Validação
  validationResult: SystemValidationResult | null;

  // UI
  activeTab: "compressor" | "evaporator" | "condenser" | "validation";
  isCalculating: boolean;
}
