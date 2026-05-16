/**
 * goalSeekingEngine.test.ts — CN COLD Engenharia
 *
 * Testa a busca por objetivos com engine mockado (função linear/quadrática).
 */

import { describe, it, expect } from 'vitest'
import { goalSeek, goalSeekSync, type GoalSeekInput } from '../goalSeekingEngine'

// Engine mock: capacity_w = 100 * (Te_c + 40)  (linear, cresce com Te)
function mockLinearEngine(params: Record<string, number>): Record<string, number> {
  const te = params['te_c'] ?? -20
  return {
    capacity_w:          100 * (te + 40),
    air_pressure_drop_pa: 50,
  }
}

// Engine mock: Q = 5000 - 200 * (Te_c + 30) (decrescente com Te)
function mockDecreasingEngine(params: Record<string, number>): Record<string, number> {
  const te = params['te_c'] ?? -20
  return {
    capacity_w: Math.max(0, 5000 - 200 * (te + 30)),
  }
}

describe('goalSeekSync — bissecção linear crescente', () => {
  // capacity_w = 100*(Te+40). Para Q=2000: Te = 2000/100 - 40 = -20
  const base: GoalSeekInput = {
    target_variable: 'capacity_w',
    target_value:    2000,
    search_variable: 'te_c',
    search_range:    [-40, 0],
    fixed_inputs:    {},
    tolerance_pct:   0.1,
  }

  it('converge para Te=-20 quando target=2000 W', () => {
    const result = goalSeekSync(base, mockLinearEngine)
    expect(result.converged).toBe(true)
    expect(result.found_value).toBeCloseTo(-20, 0)
    expect(result.achieved_target).toBeCloseTo(2000, 0)
    expect(result.deviation_pct).toBeLessThan(0.1)
  })

  it('converge para Te=-30 quando target=1000 W', () => {
    const result = goalSeekSync({ ...base, target_value: 1000 }, mockLinearEngine)
    expect(result.converged).toBe(true)
    expect(result.found_value).toBeCloseTo(-30, 0)
  })

  it('usa poucas iterações (bissecção: log2(range/tol))', () => {
    const result = goalSeekSync(base, mockLinearEngine)
    expect(result.iterations).toBeLessThan(30)
  })
})

describe('goalSeekSync — função decrescente', () => {
  // capacity_w = 5000 - 200*(Te+30). Para Q=3000: Te = (5000-3000)/200 - 30 = -20
  const base: GoalSeekInput = {
    target_variable: 'capacity_w',
    target_value:    3000,
    search_variable: 'te_c',
    search_range:    [-30, -10],
    fixed_inputs:    {},
    tolerance_pct:   0.1,
  }

  it('converge para Te=-20 com target=3000 W (engine decrescente)', () => {
    const result = goalSeekSync(base, mockDecreasingEngine)
    expect(result.converged).toBe(true)
    expect(result.found_value).toBeCloseTo(-20, 0)
  })
})

describe('goalSeekSync — target fora do range', () => {
  const base: GoalSeekInput = {
    target_variable: 'capacity_w',
    target_value:    99999,  // impossível
    search_variable: 'te_c',
    search_range:    [-40, 0],
    fixed_inputs:    {},
  }

  it('não converge mas retorna o ponto mais próximo', () => {
    const result = goalSeekSync(base, mockLinearEngine)
    expect(result.converged).toBe(false)
    expect(result.found_value).toBeDefined()
  })
})

describe('goalSeek (async) — basic convergence', () => {
  it('converge para Te=-20 com engine async', async () => {
    const input: GoalSeekInput = {
      target_variable: 'capacity_w',
      target_value:    2000,
      search_variable: 'te_c',
      search_range:    [-40, 0],
      fixed_inputs:    {},
      tolerance_pct:   0.5,
    }
    const result = await goalSeek(input, async (p) => mockLinearEngine(p))
    expect(result.converged).toBe(true)
    expect(result.found_value).toBeCloseTo(-20, 0)
  })

  it('history registra o caminho da bissecção', async () => {
    const input: GoalSeekInput = {
      target_variable: 'capacity_w',
      target_value:    2000,
      search_variable: 'te_c',
      search_range:    [-40, 0],
      fixed_inputs:    {},
    }
    const result = await goalSeek(input, async (p) => mockLinearEngine(p))
    expect(result.history).toBeDefined()
    expect(result.history!.length).toBeGreaterThan(2)
  })
})

describe('goalSeekSync — variável de busca: air_velocity_ms', () => {
  // Q = 500 * velocity. Para Q=1750: v = 3.5 m/s
  const engine = (p: Record<string, number>) => ({
    capacity_w: 500 * (p['air_velocity_ms'] ?? 2),
  })

  it('encontra velocity=3.5 para Q=1750', () => {
    const input: GoalSeekInput = {
      target_variable: 'capacity_w',
      target_value:    1750,
      search_variable: 'air_velocity_ms',
      search_range:    [1.0, 6.0],
      fixed_inputs:    {},
      tolerance_pct:   0.1,
    }
    const result = goalSeekSync(input, engine)
    expect(result.converged).toBe(true)
    expect(result.found_value).toBeCloseTo(3.5, 1)
  })
})
