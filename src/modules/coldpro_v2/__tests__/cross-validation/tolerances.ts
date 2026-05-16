/**
 * tolerances.ts — CN COLD Engenharia
 *
 * Tolerâncias de cross-validation por variável e fonte de referência.
 *
 * Critério de status:
 *   deviation ≤ tol * 0.5  → PASS  (verde)
 *   deviation ≤ tol        → WARN  (amarelo) — revisar mas não bloqueia
 *   deviation >  tol       → FAIL  (vermelho) — bloqueia merge
 *
 * Referências para as tolerâncias:
 *   - ASHRAE Handbook: ±5% para capacidade em simulações de serpentinas
 *   - VapCyc manual: ±2% para resultados numéricos
 *   - UNILAB manual: ±3% para capacidade, ±5% para ΔP
 *   - EN 12900: ±1.5% para polinômios de compressor
 */

export type ReferenceSource = 'vapcyc' | 'unilab' | 'physical'

type ToleranceMap = Record<string, Record<ReferenceSource, number>>

export const TOLERANCES: ToleranceMap = {
  // ── Capacidade frigorífica ──────────────────────────────────────
  // Principal variável do produto — tolerância mais restrita
  capacity_w: {
    vapcyc:   2.0,   // VapCyc é determinístico → comparação numérica pura
    unilab:   3.0,   // UNILAB pode ter diferença de modelo de fluido
    physical: 5.0,   // bancada inclui erros de medição (instrumentação ±2%)
  },

  // ── COP do sistema ──────────────────────────────────────────────
  // Q / (W_comp + W_fans) — propagação de erro de Q e W
  cop_system: {
    vapcyc:   2.0,
    unilab:   3.0,
    physical: 5.0,
  },

  // ── COP do compressor (sem ventiladores) ───────────────────────
  cop_compressor: {
    vapcyc:   1.5,   // direto dos polinômios EN12900 — muito preciso
    unilab:   2.0,
    physical: 4.0,
  },

  // ── Coeficiente global de transferência de calor ────────────────
  // U depende de h_ar (Wang) + h_fluido (Chen/Gnielinski) + parede
  u_w_m2k: {
    vapcyc:   3.0,
    unilab:   5.0,
    physical: 8.0,
  },

  // ── Eficiência de aleta (Schmidt 1949) ──────────────────────────
  // Determinístico dado geometria — tolerância muito baixa
  fin_efficiency: {
    vapcyc:   1.0,
    unilab:   2.0,
    physical: 3.0,
  },

  // ── Queda de pressão do lado do ar ─────────────────────────────
  // Mais sensível a variações de geometria e velocidade
  air_pressure_drop_pa: {
    vapcyc:   5.0,
    unilab:   8.0,
    physical: 12.0,
  },

  // ── Temperatura de saída do ar ──────────────────────────────────
  // Em graus absolutos → tolerância em %  (±1°C em 15°C = 6.7%)
  air_outlet_temp_c: {
    vapcyc:   1.0,   // ±1°C em valor absoluto — usar deltaTemp para calcular
    unilab:   1.5,
    physical: 2.0,
  },

  // ── Vazão mássica de refrigerante ──────────────────────────────
  // Calculada via balanço com Δx — propagação do erro de Q
  refrigerant_mass_flow_kgh: {
    vapcyc:   3.0,
    unilab:   5.0,
    physical: 8.0,
  },

  // ── Potência do compressor (EN12900) ────────────────────────────
  compressor_power_w: {
    vapcyc:   1.5,
    unilab:   2.0,
    physical: 4.0,
  },

  // ── Volume específico na sucção ─────────────────────────────────
  suction_specific_volume: {
    vapcyc:   1.0,
    unilab:   1.5,
    physical: 3.0,
  },
}

/**
 * getTolerance — retorna a tolerância para uma variável e fonte.
 * Se não encontrada, retorna 5% como default conservador.
 */
export function getTolerance(variable: string, source: ReferenceSource): number {
  return TOLERANCES[variable]?.[source] ?? 5.0
}

/**
 * SEVERITY_ORDER — para ordenar resultados por severidade
 */
export const SEVERITY_ORDER = { FAIL: 0, WARN: 1, PASS: 2 }
