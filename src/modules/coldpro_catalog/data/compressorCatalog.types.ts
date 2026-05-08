// ColdPro V2 — Tipos do Catálogo de Compressores
// Catálogo consolidado UNILAB/VapCyc — 1.791 compressores únicos
// Fabricantes: Copeland, Maneurop, Bitzer, Tecumseh, Danfoss, Refcomp

export type CompressorApplication = 'LT' | 'MT' | 'HT';
export type CompressorManufacturer =
  | 'Copeland'
  | 'Maneurop'
  | 'Bitzer'
  | 'Tecumseh'
  | 'Danfoss'
  | 'Refcomp'
  | 'Dorin';

/** Ponto de calibração com coeficientes EN12900 (10 termos) */
export interface CompressorCalibrationPoint {
  idal: number;
  idal_name: string;
  point: number;
  nominal_power_kw: number;
  calibration_factor: number;
  calibration_mode: number;
  sh: number;
  sc: number;
  sh_ref: number;
  sc_ref: number;
  tc_ref_c: number;
  te_ref_c: number;
  /** Coeficientes EN12900 — 10 termos (capacidade frigorífica) */
  cap_coeffs: number[];
  /** Coeficientes EN12900 — 10 termos (potência elétrica) */
  pwr_coeffs: number[];
  /** Coeficientes EN12900 — 10 termos (corrente) */
  cur_coeffs: number[];
  /** Coeficientes EN12900 — 10 termos (vazão mássica, kg/h) — opcional */
  m_coeffs?: number[];
}

/** Registro completo de um compressor no catálogo (formato novo) */
export interface CompressorCatalogRow {
  id: string;
  model: string;
  manufacturer: CompressorManufacturer;
  builder_normalized?: string;
  refrigerant: string;
  IdsFreon?: number;
  CompressorType?: string | null;
  application: CompressorApplication;
  frequency_hz: number;
  te_min_c: number;
  te_max_c: number;
  tc_min_c: number;
  tc_max_c: number;
  num_calibration_points: number;
  calibration_points: CompressorCalibrationPoint[];

  // Metadados UNILAB
  IdModalita?: number | null;
  IDAl?: number | null;
  UnilabStandard?: number | null;
  Eq10Coef?: number | null;
  IdCostruttore?: number | null;
  IdTipoCompr?: number | null;
  IdUtilizzo?: number | null;

  // ─── Campos derivados para compatibilidade com consumidores legados ───
  /** Apenas o refrigerante primário (catálogo novo: 1 refrigerante por linha) */
  all_refrigerants: string[];
  /** Tipo do compressor (alias para CompressorType) */
  compressor_type?: string | null;
  /** Capacidade nominal — não disponível no índice; derivado do ponto padrão se necessário */
  nominal_cooling_capacity_w: number | null;
  /** Potência nominal em Watts (do ponto padrão calibration_points[0]) */
  nominal_power_w: number | null;
  /** HP nominal — derivado da potência (kW ÷ 0.7457) */
  nominal_hp?: number | null;
  /** Temperatura de evaporação de referência (do ponto padrão) */
  nominal_evap_temp_c?: number | null;
  /** Temperatura de condensação de referência (do ponto padrão) */
  nominal_cond_temp_c?: number | null;
  min_evap_temp_c?: number | null;
  max_evap_temp_c?: number | null;
  min_cond_temp_c?: number | null;
  max_cond_temp_c?: number | null;
  voltage?: string | null;
  series?: string | null;
  series_code?: string | null;
  phase?: string | null;
  nominal_displacement_cm3?: number | null;
  nominal_rpm?: number | null;
  cylinders?: number | null;
}

/** Registro leve do índice (para busca e filtros rápidos) */
export interface CompressorIndexRow {
  id: string;
  model: string;
  manufacturer: CompressorManufacturer;
  application: CompressorApplication;
  refrigerant: string;
  CompressorType?: string | null;
  frequency_hz: number;
  nominal_power_kw: number;
  te_min_c: number;
  te_max_c: number;
  tc_min_c: number;
  tc_max_c: number;
  num_calibration_points: number;

  // ─── Campos derivados para compatibilidade ───
  all_refrigerants: string[];
  compressor_type?: string | null;
  nominal_cooling_capacity_w: number | null;
  nominal_power_w: number | null;
  nominal_hp?: number | null;
  voltage?: string | null;
}

/** Filtros para busca no catálogo */
export interface CompressorCatalogFilter {
  manufacturer?: CompressorManufacturer;
  application?: CompressorApplication;
  refrigerant?: string;
  minCapacityW?: number;
  maxCapacityW?: number;
  minHp?: number;
  maxHp?: number;
  frequencyHz?: number;
  searchText?: string;
}
