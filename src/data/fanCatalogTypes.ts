// Schema v2 do catálogo de ventiladores — CN Coils
// Tipos compartilhados entre fanCatalog.ts (31 modelos legados) e
// fanCatalogZiehl.ts (69 modelos ZIEHL-ABEGG).

export interface FanCurvePoint {
  q_m3h: number;      // Vazão em m³/h
  psf_pa: number;     // Pressão estática em Pa
  p1_w?: number;      // Potência elétrica em W (opcional)
}

/** Conjunto de curva Q×ΔP para uma velocidade específica
 *  curva I = 100%, II = ~85%, III = ~70%, IV = ~60% */
export interface FanCurveSet {
  curve_id: string;           // Identificador da curva (ex: 'I', 'II', 'III', 'IV')
  points: FanCurvePoint[];    // Pontos Q×ΔP desta curva
}

/** Ponto de dados elétricos medido em campo para uma curva e ponto operacional específicos */
export interface FanPerformanceDataPoint {
  curve_id: string;
  connection?: string | null;
  voltage_v?: number;
  frequency_hz?: number;
  operating_point?: number;
  current_a?: number;
  power_w?: number;
  speed_rpm?: number;
  sound_lwa_db?: number;
}

export interface FanModel {
  model: string;
  manufacturer: string;
  article_number: string;
  diameter_mm: number;
  electrical_nominal: string;
  rpm_nominal: number | string;
  sound_lwa_db: number | string;
  erp_efficiency_pct: number;
  q_max_m3h: number | string;
  dp_max_pa: number | string;
  p1_nominal_w: number | string;
  num_curve_points?: number;
  source_file?: string;
  curve_points: FanCurvePoint[];
  // ── Campos estendidos ZIEHL-ABEGG ──────────────────────────────────────────
  family?: string;
  application?: string;
  num_blades?: number;
  blade_material?: string;
  rotor_material?: string;
  voltage?: string;
  frequency_hz?: number;
  motor_technology?: string;
  poles?: number | string;
  p_sys_w?: number | string;
  current_nominal_a?: number | string;
  temp_min_c?: number;
  temp_max_c?: number;
  ip_protection?: string;
  thermal_class?: string;
  erp_n_actual?: number;
  erp_n_target?: number;
  weight_kg?: number;
  curve_available?: boolean;
  num_curve_sets?: number;
  curve_sets?: FanCurveSet[];
  performance_data?: FanPerformanceDataPoint[];
  [key: string]: unknown;
}
