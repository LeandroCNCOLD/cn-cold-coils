/**
 * extendedRefrigerantProperties.test.ts — CN COLD Engenharia
 *
 * Valores de referência: CoolProp 7.2 / NIST WebBook
 * Tolerâncias: P_sat ±5 kPa (toBeCloseTo -1), h_fg ordem de grandeza ±5 kJ/kg
 */

import { describe, it, expect } from 'vitest'
import {
  pSat_kPa,
  hFg_kJkg,
  satProps,
  isExtendedRefrigerant,
  getRefrigerantInfo,
} from '../extendedRefrigerantProperties'

// ── R1234yf ─────────────────────────────────────────────────────────

describe('R1234yf — pressão de saturação (Richter 2011 / CoolProp)', () => {
  it('T=0°C → P ≈ 293 kPa', () => {
    expect(pSat_kPa('R1234yf', 0)).toBeCloseTo(293, -1)
  })
  it('T=-20°C → P ≈ 133 kPa', () => {
    expect(pSat_kPa('R1234yf', -20)).toBeCloseTo(133, -1)
  })
  it('T=40°C → P ≈ 918 kPa', () => {
    expect(pSat_kPa('R1234yf', 40)).toBeCloseTo(918, -1)
  })
  it('P aumenta monotonicamente com T', () => {
    expect(pSat_kPa('R1234yf', 10)).toBeGreaterThan(pSat_kPa('R1234yf', 0))
    expect(pSat_kPa('R1234yf', 0)).toBeGreaterThan(pSat_kPa('R1234yf', -10))
  })
})

// ── R1234ze ─────────────────────────────────────────────────────────

describe('R1234ze — pressão de saturação (Thol & Lemmon 2016 / CoolProp)', () => {
  it('T=0°C → P ≈ 202 kPa', () => {
    expect(pSat_kPa('R1234ze', 0)).toBeCloseTo(202, -1)
  })
  it('T=40°C → P ≈ 732 kPa', () => {
    expect(pSat_kPa('R1234ze', 40)).toBeCloseTo(732, -1)
  })
  it('P_sat(R1234ze) < P_sat(R1234yf) na mesma T — menor pressão', () => {
    expect(pSat_kPa('R1234ze', 0)).toBeLessThan(pSat_kPa('R1234yf', 0))
  })
})

// ── R32 ──────────────────────────────────────────────────────────────

describe('R32 — pressão de saturação (Tillner-Roth & Baehr 1994 / CoolProp)', () => {
  it('T=0°C → P ≈ 791 kPa', () => {
    expect(pSat_kPa('R32', 0)).toBeCloseTo(791, -1)
  })
  it('P muito maior que HFOs na mesma T — molécula mais leve', () => {
    expect(pSat_kPa('R32', 0)).toBeGreaterThan(pSat_kPa('R1234yf', 0))
  })
})

// ── Calor latente ────────────────────────────────────────────────────

describe('Calor latente — correlação de Watson', () => {
  it('R1234yf a 0°C → h_fg ≈ 170 kJ/kg (âncora da correlação)', () => {
    expect(hFg_kJkg('R1234yf', 0)).toBeCloseTo(170, 0)
  })
  it('h_fg aumenta quando T diminui (mais longe do ponto crítico)', () => {
    expect(hFg_kJkg('R1234yf', -20)).toBeGreaterThan(hFg_kJkg('R1234yf', 0))
    expect(hFg_kJkg('R1234yf', 0)).toBeGreaterThan(hFg_kJkg('R1234yf', 30))
  })
  it('h_fg → 0 perto do ponto crítico (R1234yf Tc=94.7°C)', () => {
    // A 90°C (5°C abaixo do Tc) h_fg ≈ 54 kJ/kg — muito menor que 170 a 0°C
    expect(hFg_kJkg('R1234yf', 90)).toBeLessThan(hFg_kJkg('R1234yf', 0) * 0.5)
    expect(hFg_kJkg('R1234yf', 94)).toBeLessThan(30)  // 0.7°C abaixo Tc
    expect(hFg_kJkg('R1234yf', 95)).toBe(0)            // supercrítico → 0
  })
  it('R32 h_fg muito maior que R1234yf — molécula menor', () => {
    expect(hFg_kJkg('R32', 0)).toBeGreaterThan(hFg_kJkg('R1234yf', 0))
  })
})

// ── Propriedades completas ───────────────────────────────────────────

describe('satProps — coerência física', () => {
  it('R1234yf a 0°C — todas as propriedades positivas', () => {
    const p = satProps('R1234yf', 0)
    expect(p.P_sat_kPa).toBeGreaterThan(0)
    expect(p.h_fg_kJkg).toBeGreaterThan(0)
    expect(p.rho_f_kgm3).toBeGreaterThan(0)
    expect(p.rho_g_kgm3).toBeGreaterThan(0)
    expect(p.mu_f_Pas).toBeGreaterThan(0)
    expect(p.k_f_WmK).toBeGreaterThan(0)
    expect(p.Pr_f).toBeGreaterThan(0)
    expect(p.sigma_Nm).toBeGreaterThan(0)
  })
  it('rho_f >> rho_g (fase líquida mais densa que vapor)', () => {
    const p = satProps('R1234yf', 0)
    expect(p.rho_f_kgm3).toBeGreaterThan(p.rho_g_kgm3 * 5)
  })
  it('P_sat coerente com pSat_kPa', () => {
    const p = satProps('R32', -10)
    expect(p.P_sat_kPa).toBeCloseTo(pSat_kPa('R32', -10), 0)
  })
  it('R448A e R449A têm pressões similares (blends análogos)', () => {
    const diff = Math.abs(pSat_kPa('R448A', 0) - pSat_kPa('R449A', 0))
    expect(diff).toBeLessThan(20)  // menos de 20 kPa de diferença
  })
})

// ── API pública ──────────────────────────────────────────────────────

describe('isExtendedRefrigerant', () => {
  it('reconhece refrigerantes do módulo', () => {
    expect(isExtendedRefrigerant('R1234yf')).toBe(true)
    expect(isExtendedRefrigerant('R1234ze')).toBe(true)
    expect(isExtendedRefrigerant('R448A')).toBe(true)
    expect(isExtendedRefrigerant('R449A')).toBe(true)
    expect(isExtendedRefrigerant('R32')).toBe(true)
    expect(isExtendedRefrigerant('R290')).toBe(true)
    expect(isExtendedRefrigerant('R744')).toBe(true)
  })
  it('rejeita refrigerantes não suportados', () => {
    expect(isExtendedRefrigerant('R404A')).toBe(false)
    expect(isExtendedRefrigerant('R410A')).toBe(false)
    expect(isExtendedRefrigerant('R22')).toBe(false)
  })
})

describe('getRefrigerantInfo', () => {
  it('R1234yf — GWP=4 e contém "HFO"', () => {
    const info = getRefrigerantInfo('R1234yf')
    expect(info.GWP).toBe(4)
    expect(info.name).toContain('HFO')
  })
  it('R32 — GWP=675', () => {
    expect(getRefrigerantInfo('R32').GWP).toBe(675)
  })
  it('R449A — é substituto do R404A', () => {
    expect(getRefrigerantInfo('R449A').regulation_status).toContain('R404A')
  })
})
