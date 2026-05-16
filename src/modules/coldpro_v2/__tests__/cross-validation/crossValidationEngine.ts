/**
 * crossValidationEngine.ts — CN COLD Engenharia
 *
 * Motor de cross-validation: compara outputs do engine CN COLD
 * contra casos de referência de fontes externas (VapCyc, UNILAB, bancada).
 *
 * Uso:
 *   import { runCrossValidation } from './crossValidationEngine'
 *   const report = runCrossValidation(engineOutput, referenceCase)
 */

// ─── TIPOS ────────────────────────────────────────────────────────

export type ReferenceSource = 'vapcyc' | 'unilab' | 'physical'

export interface ReferenceCase {
  id:          string
  description: string
  source:      ReferenceSource
  version?:    string          // ex: "VapCyc 3.7", "UNILAB 6.0"
  date?:       string          // data de captura da referência
  input: {
    // Geometria
    geometry_code:         string   // ex: "133228_C_S F Lantery EVP"
    tube_outer_diameter_m: number
    tube_pitch_transverse_m: number
    tube_pitch_longitudinal_m: number
    fin_pitch_m:           number
    fin_thickness_m:       number
    n_rows:                number
    n_tubes_per_row:       number
    n_circuits:            number
    coil_length_m:         number
    // Condições
    Te_c:                  number   // temperatura de evaporação (°C)
    Tc_c:                  number   // temperatura de condensação (°C)
    T_air_in_db_c:         number   // temperatura de entrada do ar (°C)
    RH_air_in:             number   // umidade relativa entrada (0-1)
    air_velocity_ms:       number   // velocidade frontal do ar (m/s)
    refrigerant:           string   // ex: "R404A"
    superheat_k:           number
    subcooling_k:          number
    // Elétrico (para COP_sistema)
    compressor_power_w?:   number
    fans_total_power_w?:   number
  }
  reference: {
    // Obrigatórios
    capacity_w:            number
    // Opcionais (nem toda fonte fornece todos)
    cop_system?:           number
    u_w_m2k?:              number
    fin_efficiency?:       number
    air_pressure_drop_pa?: number
    air_outlet_temp_c?:    number
    air_outlet_rh?:        number
    refrigerant_mass_flow_kgh?: number
  }
}

export interface ValidationResult {
  case_id:     string
  source:      ReferenceSource
  variable:    string
  reference:   number
  calculated:  number
  deviation_pct: number
  tolerance_pct: number
  status:      'PASS' | 'FAIL' | 'WARN'
}

export interface CrossValidationReport {
  case_id:       string
  description:   string
  source:        ReferenceSource
  overall_status: 'PASS' | 'FAIL' | 'WARN'
  results:       ValidationResult[]
  summary: {
    total:   number
    passed:  number
    warned:  number
    failed:  number
    max_deviation_pct: number
  }
  timestamp: string
}

// ─── TOLERÂNCIAS ──────────────────────────────────────────────────

import { TOLERANCES } from './tolerances'

// ─── ENGINE PRINCIPAL ─────────────────────────────────────────────

export function compareValue(
  variable:   string,
  reference:  number,
  calculated: number,
  source:     ReferenceSource,
): ValidationResult {
  const tol = TOLERANCES[variable]?.[source] ?? 5.0
  const deviation_pct = Math.abs((calculated - reference) / reference) * 100

  let status: 'PASS' | 'FAIL' | 'WARN'
  if (deviation_pct <= tol * 0.5) {
    status = 'PASS'
  } else if (deviation_pct <= tol) {
    status = 'WARN'
  } else {
    status = 'FAIL'
  }

  return { case_id: '', source, variable, reference, calculated, deviation_pct, tolerance_pct: tol, status }
}

export function runCrossValidation(
  ref:        ReferenceCase,
  engineOut:  Record<string, number>,
): CrossValidationReport {
  const results: ValidationResult[] = []

  const pairs: Array<[string, keyof typeof ref.reference]> = [
    ['capacity_w',              'capacity_w'],
    ['cop_system',              'cop_system'],
    ['u_w_m2k',                 'u_w_m2k'],
    ['fin_efficiency',          'fin_efficiency'],
    ['air_pressure_drop_pa',    'air_pressure_drop_pa'],
    ['air_outlet_temp_c',       'air_outlet_temp_c'],
    ['refrigerant_mass_flow_kgh', 'refrigerant_mass_flow_kgh'],
  ]

  for (const [varName, refKey] of pairs) {
    const refVal  = ref.reference[refKey]
    const calcVal = engineOut[varName]
    if (refVal == null || calcVal == null) continue

    const r = compareValue(varName, refVal, calcVal, ref.source)
    r.case_id = ref.id
    results.push(r)
  }

  const passed  = results.filter(r => r.status === 'PASS').length
  const warned  = results.filter(r => r.status === 'WARN').length
  const failed  = results.filter(r => r.status === 'FAIL').length
  const maxDev  = Math.max(...results.map(r => r.deviation_pct))

  const overall_status = failed > 0 ? 'FAIL' : warned > 0 ? 'WARN' : 'PASS'

  return {
    case_id:     ref.id,
    description: ref.description,
    source:      ref.source,
    overall_status,
    results,
    summary: { total: results.length, passed, warned, failed, max_deviation_pct: maxDev },
    timestamp: new Date().toISOString(),
  }
}

export function runAllCrossValidations(
  refs:      ReferenceCase[],
  runEngine: (input: ReferenceCase['input']) => Record<string, number>,
): CrossValidationReport[] {
  return refs.map(ref => {
    const engineOut = runEngine(ref.input)
    return runCrossValidation(ref, engineOut)
  })
}
