/**
 * goalSeekingEngine.ts — CN COLD Engenharia
 *
 * Busca univariada por bissecção para encontrar o parâmetro que atinge
 * uma meta de desempenho. Expansível para multi-variável (Nelder-Mead).
 *
 * Caso típico: "quero capacidade de 8000 W — qual Te devo usar?"
 */

export interface GoalSeekInput {
  /** Variável que deve atingir o valor alvo */
  target_variable: 'capacity_w' | 'cop_system' | 'air_pressure_drop_pa'
  /** Valor desejado para target_variable */
  target_value: number
  /** Variável de busca (o que o solver vai ajustar) */
  search_variable: 'te_c' | 'tc_c' | 'air_velocity_ms'
  /** Intervalo de busca [min, max] */
  search_range: [number, number]
  /** Entradas fixas do engine (tudo exceto search_variable) */
  fixed_inputs: Record<string, number>
  /** Tolerância percentual para convergência (default: 0.5%) */
  tolerance_pct?: number
  /** Máximo de iterações (default: 30) */
  max_iterations?: number
}

export interface GoalSeekResult {
  /** Convergiu dentro da tolerância? */
  converged: boolean
  /** Número de iterações realizadas */
  iterations: number
  /** Valor de search_variable que atinge o target */
  found_value: number
  /** Valor real alcançado por target_variable */
  achieved_target: number
  /** Desvio percentual final */
  deviation_pct: number
  /** Histórico de iterações para diagnóstico */
  history?: Array<{ x: number; y: number; dev_pct: number }>
}

/**
 * goalSeek — bissecção univariada.
 *
 * Requer que o engine seja monótono em relação à variável de busca
 * dentro do search_range (condição necessária para bissecção convergir).
 *
 * @param input       Parâmetros de busca
 * @param runEngine   Função async que executa o engine com os parâmetros dados
 */
export async function goalSeek(
  input: GoalSeekInput,
  runEngine: (params: Record<string, number>) => Promise<Record<string, number>>,
): Promise<GoalSeekResult> {
  const {
    target_variable,
    target_value,
    search_variable,
    search_range,
    fixed_inputs,
    tolerance_pct = 0.5,
    max_iterations = 30,
  } = input

  if (target_value === 0) {
    return { converged: false, iterations: 0, found_value: search_range[0], achieved_target: 0, deviation_pct: 100 }
  }

  let [lo, hi] = search_range
  const history: Array<{ x: number; y: number; dev_pct: number }> = []

  // Avaliar extremos para determinar monotonia e direção
  const evalAt = async (x: number) => {
    const result = await runEngine({ ...fixed_inputs, [search_variable]: x })
    return result[target_variable] ?? 0
  }

  const y_lo = await evalAt(lo)
  const y_hi = await evalAt(hi)

  // Detectar se target está fora do range
  const min_y = Math.min(y_lo, y_hi)
  const max_y = Math.max(y_lo, y_hi)
  if (target_value < min_y || target_value > max_y) {
    // Target fora do alcance — retornar o ponto mais próximo
    const best_x   = Math.abs(y_lo - target_value) < Math.abs(y_hi - target_value) ? lo : hi
    const best_y   = Math.abs(y_lo - target_value) < Math.abs(y_hi - target_value) ? y_lo : y_hi
    const dev      = Math.abs((best_y - target_value) / target_value) * 100
    return { converged: false, iterations: 2, found_value: best_x, achieved_target: best_y, deviation_pct: dev, history }
  }

  // Bissecção: manter invariante f(lo) < target <= f(hi) ou f(lo) > target >= f(hi)
  const increasing = y_hi > y_lo

  let iterations = 2
  history.push({ x: lo, y: y_lo, dev_pct: Math.abs((y_lo - target_value) / target_value) * 100 })
  history.push({ x: hi, y: y_hi, dev_pct: Math.abs((y_hi - target_value) / target_value) * 100 })

  while (iterations < max_iterations) {
    const mid = (lo + hi) / 2
    const y_mid = await evalAt(mid)
    const dev   = Math.abs((y_mid - target_value) / target_value) * 100

    history.push({ x: mid, y: y_mid, dev_pct: dev })
    iterations++

    if (dev <= tolerance_pct) {
      return { converged: true, iterations, found_value: mid, achieved_target: y_mid, deviation_pct: dev, history }
    }

    // Ajustar intervalo mantendo o target entre lo e hi
    if (increasing) {
      if (y_mid < target_value) lo = mid
      else                       hi = mid
    } else {
      if (y_mid > target_value) lo = mid
      else                       hi = mid
    }
  }

  // Sem convergência — retornar melhor estimativa
  const best = (lo + hi) / 2
  const y_best = await evalAt(best)
  const dev_final = Math.abs((y_best - target_value) / target_value) * 100
  return { converged: false, iterations, found_value: best, achieved_target: y_best, deviation_pct: dev_final, history }
}

/**
 * goalSeekSync — versão síncrona para engines que não precisam de async.
 * Mesma lógica de bissecção, mas o runEngine é síncrono.
 */
export function goalSeekSync(
  input: GoalSeekInput,
  runEngine: (params: Record<string, number>) => Record<string, number>,
): GoalSeekResult {
  const {
    target_variable,
    target_value,
    search_variable,
    search_range,
    fixed_inputs,
    tolerance_pct = 0.5,
    max_iterations = 30,
  } = input

  if (target_value === 0) {
    return { converged: false, iterations: 0, found_value: search_range[0], achieved_target: 0, deviation_pct: 100 }
  }

  let [lo, hi] = search_range

  const evalAt = (x: number): number => {
    const result = runEngine({ ...fixed_inputs, [search_variable]: x })
    return result[target_variable] ?? 0
  }

  const y_lo = evalAt(lo)
  const y_hi = evalAt(hi)

  const min_y = Math.min(y_lo, y_hi)
  const max_y = Math.max(y_lo, y_hi)
  if (target_value < min_y || target_value > max_y) {
    const best_x = Math.abs(y_lo - target_value) < Math.abs(y_hi - target_value) ? lo : hi
    const best_y = Math.abs(y_lo - target_value) < Math.abs(y_hi - target_value) ? y_lo : y_hi
    const dev    = Math.abs((best_y - target_value) / target_value) * 100
    return { converged: false, iterations: 2, found_value: best_x, achieved_target: best_y, deviation_pct: dev }
  }

  const increasing = y_hi > y_lo
  let iterations = 2

  while (iterations < max_iterations) {
    const mid   = (lo + hi) / 2
    const y_mid = evalAt(mid)
    const dev   = Math.abs((y_mid - target_value) / target_value) * 100
    iterations++

    if (dev <= tolerance_pct) {
      return { converged: true, iterations, found_value: mid, achieved_target: y_mid, deviation_pct: dev }
    }

    if (increasing) {
      if (y_mid < target_value) lo = mid
      else                       hi = mid
    } else {
      if (y_mid > target_value) lo = mid
      else                       hi = mid
    }
  }

  const best  = (lo + hi) / 2
  const y_best = evalAt(best)
  return {
    converged: false, iterations,
    found_value: best, achieved_target: y_best,
    deviation_pct: Math.abs((y_best - target_value) / target_value) * 100,
  }
}
