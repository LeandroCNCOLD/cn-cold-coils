/**
 * useGoalSeeking.ts — CN COLD Engenharia
 *
 * Hook que conecta o goalSeekingEngine ao estado atual do Hub de Testes.
 * Usa os dados do compressor (Te, Tc, refrigerante) como entradas fixas
 * e varia o parâmetro escolhido para atingir a capacidade alvo.
 */

import { useState, useCallback, useRef } from 'react'
import { goalSeek, type GoalSeekInput, type GoalSeekResult } from '@/modules/coldpro_v2/engines/wizard/goalSeekingEngine'
import { calculateProgressiveCoil } from '@/modules/coldpro_v2/engines/progressive/progressiveCoilSolver'
import { useTestHubStore } from '../../stores/useTestHubStore'
import type { CompressorSpec, ProgressiveCoilInput } from '@/modules/coldpro_v2/domain/types'

export type SearchVariable = 'te_c' | 'tc_c' | 'air_velocity_ms'

export interface GoalSeekingState {
  isSearching: boolean
  result:      GoalSeekResult | null
  error:       string | null
}

export function useGoalSeeking() {
  const compressor = useTestHubStore(s => s.compressor) as Partial<CompressorSpec>
  const evaporator = useTestHubStore(s => s.evaporator) as Partial<ProgressiveCoilInput> & { airflow_m3_h?: number }

  const [state, setState] = useState<GoalSeekingState>({
    isSearching: false,
    result:      null,
    error:       null,
  })

  const abortRef = useRef(false)

  const startSearch = useCallback(async (
    targetCapacity_w:  number,
    searchVar:         SearchVariable,
    searchRange:       [number, number],
  ) => {
    setState({ isSearching: true, result: null, error: null })
    abortRef.current = false

    // evaporator IS the ProgressiveCoilInput (flat, no wrapper)
    const pi = evaporator
    if (!pi || !pi.air_mass_flow_kg_s || !pi.T_evaporating_c) {
      setState({ isSearching: false, result: null, error: 'Evaporador não configurado no Hub.' })
      return
    }

    const baseInputs: Record<string, number> = {
      te_c:            pi.T_evaporating_c,
      tc_c:            compressor.cond_temp_c ?? 45,
      air_velocity_ms: pi.air_mass_flow_kg_s /
        Math.max(0.001, (pi.coil_width_m ?? 1) * (pi.coil_height_m ?? 0.5) *
          (101325 / (287.1 * (273.15 + (pi.air_temperature_in_c ?? -10))))),
    }

    const goalInput: GoalSeekInput = {
      target_variable: 'capacity_w',
      target_value:    targetCapacity_w,
      search_variable: searchVar,
      search_range:    searchRange,
      fixed_inputs:    baseInputs,
      tolerance_pct:   0.5,
      max_iterations:  25,
    }

    try {
      const result = await goalSeek(goalInput, async (params) => {
        if (abortRef.current) return { capacity_w: 0 }

        const te = params['te_c'] ?? pi.T_evaporating_c
        const v  = params['air_velocity_ms'] ?? baseInputs['air_velocity_ms'] ?? 3.5

        const rho = 101325 / (287.1 * (273.15 + (pi.air_temperature_in_c ?? -10)))
        const faceArea = (pi.coil_width_m ?? 1) * (pi.coil_height_m ?? 0.5)
        const massFlow = faceArea * v * rho

        const out = calculateProgressiveCoil({
          ...pi,
          T_evaporating_c:  te,
          air_mass_flow_kg_s: massFlow,
          model_code: pi.model_code,
        } as import('@/modules/coldpro_v2/domain/types').ProgressiveCoilInput)

        return { capacity_w: out.total_capacity_w }
      })

      setState({ isSearching: false, result, error: null })
    } catch (e) {
      setState({ isSearching: false, result: null, error: String(e) })
    }
  }, [compressor, evaporator])

  const cancelSearch = useCallback(() => {
    abortRef.current = true
    setState(s => ({ ...s, isSearching: false }))
  }, [])

  const reset = useCallback(() => {
    setState({ isSearching: false, result: null, error: null })
  }, [])

  return { ...state, startSearch, cancelSearch, reset }
}
