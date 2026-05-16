/**
 * coilCalibrationFactors.ts — CN COLD Engenharia
 *
 * Fatores de calibração C_rich(ΔT) por modelo de produto.
 *
 * Origem: cross-validation do engine contra catálogo físico.
 * Aplicação: Q_calibrado = Q_engine × C_rich(ΔT)
 *
 * C_rich varia com ΔT = T_ar_entrada - Te porque:
 *   - Maior ΔT → maior geada → maior resistência → engine superestima mais
 *   - ΔT = 0   → sem geada, C_rich = 1.0 (âncora física)
 *
 * Regra:
 *   - C_rich < 1: engine superestima (caso mais comum — Wang suprestima com alta ΔT)
 *   - C_rich > 1: engine subestima
 *   - C_rich = 1: sem calibração (modelo não testado)
 *
 * Para adicionar novos pontos de calibração:
 *   1. Rodar cross-validation com dados reais (catálogo ou bancada)
 *   2. C_rich = Q_ref / Q_engine no ponto medido
 *   3. Adicionar CalibrationPoint à entrada do modelo
 */

// ─── TIPOS ────────────────────────────────────────────────────────

export type CalibrationSource = 'catalog' | 'bench' | 'vapcyc'

/** Um ponto de calibração: par (ΔT [°C], C_rich) */
export interface CalibrationPoint {
  /** ΔT = T_ar_entrada_c − Te_c [°C] — força motriz do evaporador */
  delta_T_c: number
  C_rich:    number
  source:    CalibrationSource
  notes?:    string
}

/** Conjunto de calibração para um modelo ou família de produtos */
export interface CalibrationEntry {
  model_id: string
  date:     string
  points:   CalibrationPoint[]  // ordenados por delta_T_c crescente
}

// ─── DADOS DE CALIBRAÇÃO ──────────────────────────────────────────

export const COIL_CALIBRATION_ENTRIES: CalibrationEntry[] = [
  {
    model_id: 'CN_750_LT',
    date:     '2026-05-16',
    points: [
      {
        // Âncora física: ΔT=0 → sem geada → engine correto → C_rich=1.0
        delta_T_c: 0,
        C_rich:    1.0,
        source:    'catalog',
        notes:     'Âncora física. ΔT=0 implica sem troca térmica e sem geada.',
      },
      {
        // Ponto nominal real do catálogo CN COLD 2026:
        // Q_catalogo = 7380 kcal/h × 1.163 = 8583 W
        // Q_engine   = 9517 W  →  C_rich = 8583 / 9517 = 0.9019
        // ΔT = T_camara − Te = −12 − (−22.2) = 10.2°C
        delta_T_c: 10.2,
        C_rich:    0.902,
        source:    'catalog',
        notes:     'CN_750_LT nominal. Catálogo: 8583 W. Engine: 9517 W. Desvio: +10.88%.',
      },
    ],
  },
]

// ─── INTERPOLAÇÃO ─────────────────────────────────────────────────

/**
 * Interpola C_rich linearmente entre os pontos de calibração.
 * Extrapolação: usa a inclinação do segmento mais próximo (sem clamp).
 */
export function interpolateCRich(points: CalibrationPoint[], delta_T: number): number {
  if (points.length === 0) return 1.0
  if (points.length === 1) return points[0]!.C_rich

  const sorted = [...points].sort((a, b) => a.delta_T_c - b.delta_T_c)
  const first  = sorted[0]!
  const last   = sorted[sorted.length - 1]!

  // Abaixo do menor ponto: extrapola com inclinação do primeiro segmento
  if (delta_T <= first.delta_T_c) {
    if (sorted.length < 2) return first.C_rich
    const second = sorted[1]!
    const slope  = (second.C_rich - first.C_rich) / (second.delta_T_c - first.delta_T_c)
    return first.C_rich + slope * (delta_T - first.delta_T_c)
  }

  // Acima do maior ponto: extrapola com inclinação do último segmento
  if (delta_T >= last.delta_T_c) {
    const prev  = sorted[sorted.length - 2]!
    const slope = (last.C_rich - prev.C_rich) / (last.delta_T_c - prev.delta_T_c)
    return last.C_rich + slope * (delta_T - last.delta_T_c)
  }

  // Dentro do intervalo: interpolação linear entre os dois pontos adjacentes
  for (let i = 0; i < sorted.length - 1; i++) {
    const lo = sorted[i]!
    const hi = sorted[i + 1]!
    if (delta_T >= lo.delta_T_c && delta_T <= hi.delta_T_c) {
      const t = (delta_T - lo.delta_T_c) / (hi.delta_T_c - lo.delta_T_c)
      return lo.C_rich + t * (hi.C_rich - lo.C_rich)
    }
  }

  return 1.0
}

// ─── API PÚBLICA ──────────────────────────────────────────────────

/**
 * Retorna C_rich para um modelo a um dado ΔT.
 *
 * @param modelOrGeometryCode  Código do modelo ou geometria (busca por substring)
 * @param delta_T_c            T_ar_entrada_c − Te_c [°C]. Se omitido, usa ponto nominal.
 */
export function getCalibrationFactor(
  modelOrGeometryCode: string,
  delta_T_c?: number,
): number {
  for (const entry of COIL_CALIBRATION_ENTRIES) {
    if (modelOrGeometryCode.includes(entry.model_id)) {
      if (delta_T_c != null) {
        return interpolateCRich(entry.points, delta_T_c)
      }
      // Sem ΔT: retorna o ponto nominal (maior ΔT da série de dados reais)
      const real = entry.points.filter(p => p.source !== 'catalog' || p.delta_T_c > 0)
      return real.length > 0 ? real[real.length - 1]!.C_rich : 1.0
    }
  }
  return 1.0
}

/**
 * Aplica C_rich(ΔT) ao resultado do engine.
 * capacity_w e cop_system são escalados proporcionalmente (W permanece constante).
 *
 * @param capacity_w    Capacidade bruta do engine [W]
 * @param cop_system    COP sistema bruto (opcional)
 * @param modelCode     Código do modelo para busca de calibração
 * @param delta_T_c     T_ar_entrada_c − Te_c [°C] para interpolação do C_rich
 */
export function applyCalibration(
  capacity_w:  number,
  cop_system?: number,
  modelCode?:  string,
  delta_T_c?:  number,
): { capacity_w: number; cop_system: number | undefined; C_rich: number } {
  const C_rich = modelCode ? getCalibrationFactor(modelCode, delta_T_c) : 1.0
  return {
    capacity_w: capacity_w * C_rich,
    cop_system: cop_system != null ? cop_system * C_rich : undefined,
    C_rich,
  }
}
