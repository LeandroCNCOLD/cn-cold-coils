/**
 * coilCalibrationFactors.ts — CN COLD Engenharia
 *
 * Fatores de calibração C_rich por modelo de produto.
 *
 * Origem: cross-validation do engine contra catálogo físico.
 * Aplicação: Q_calibrado = Q_engine × C_rich
 *
 * Regra:
 *   - C_rich < 1: engine superestima (caso mais comum — Wang suprestima com alta ΔT)
 *   - C_rich > 1: engine subestima
 *   - C_rich = 1: sem calibração (engine não testado contra catálogo)
 *
 * Fonte dos fatores:
 *   C_rich = Q_catalogo / Q_engine (medido na cross-validation)
 *
 * Adicionar novos fatores após aprovação do teste de bancada (backlog P5).
 */

export interface CalibrationEntry {
  model_id:    string
  C_rich:      number
  source:      'catalog' | 'bench' | 'vapcyc'
  deviation_engine_pct: number  // desvio do engine sem calibração (+% = superestima)
  date:        string
  notes?:      string
}

export const COIL_CALIBRATION_ENTRIES: CalibrationEntry[] = [
  {
    model_id:              'CN_750_LT',
    C_rich:                0.902,
    source:                'catalog',
    deviation_engine_pct:  +10.88,
    date:                  '2026-05-16',
    notes:                 'Catálogo: 7380 kcal/h = 8583 W. Engine: 9517 W. Wang superestima com ΔT=10.2°C e fin_pitch=7mm. Fator derivado da cross-validation.',
  },
]

/**
 * Retorna o C_rich para um modelo.
 * Busca por substring: 'CN_750_LT' casa 'CN_750_LT_EVAP', 'CN_750_LT_BITZER...', etc.
 * Se não encontrar, retorna 1.0 (sem ajuste).
 */
export function getCalibrationFactor(modelOrGeometryCode: string): number {
  for (const entry of COIL_CALIBRATION_ENTRIES) {
    if (modelOrGeometryCode.includes(entry.model_id)) {
      return entry.C_rich
    }
  }
  return 1.0
}

/**
 * Aplica C_rich ao resultado de capacidade.
 * Ajusta também cop_system proporcionalmente (Q muda, W não muda).
 */
export function applyCalibration(
  capacity_w:    number,
  cop_system?:   number,
  modelCode?:    string,
): { capacity_w: number; cop_system: number | undefined; C_rich: number } {
  const C_rich = modelCode ? getCalibrationFactor(modelCode) : 1.0
  return {
    capacity_w: capacity_w * C_rich,
    cop_system: cop_system != null ? cop_system * C_rich : undefined,
    C_rich,
  }
}
