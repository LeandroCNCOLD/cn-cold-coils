/**
 * GoalSeekingTabContent — Aba "Busca por Objetivo" do Hub de Testes
 * Máximo 200 linhas. Zero lógica de cálculo — tudo delegado ao useGoalSeeking.
 */

import { useState } from 'react'
import { Search, X, ChevronDown, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useGoalSeeking, type SearchVariable } from './useGoalSeeking'

const SEARCH_VARS: Array<{ value: SearchVariable; label: string; unit: string; range: [number, number] }> = [
  { value: 'te_c',            label: 'Temperatura de evaporação (Te)',  unit: '°C',  range: [-45, -5]  },
  { value: 'tc_c',            label: 'Temperatura de condensação (Tc)', unit: '°C',  range: [20, 60]   },
  { value: 'air_velocity_ms', label: 'Velocidade do ar',               unit: 'm/s', range: [1.0, 8.0] },
]

function fmt(n: number, dec = 1) { return n.toFixed(dec) }

function ResultCard({ result, searchVar, unit }: {
  result: ReturnType<typeof useGoalSeeking>['result']
  searchVar: SearchVariable
  unit: string
}) {
  const [histOpen, setHistOpen] = useState(false)
  if (!result) return null

  const label = SEARCH_VARS.find(v => v.value === searchVar)?.label ?? searchVar

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        {result.converged
          ? <CheckCircle2 className="h-5 w-5 text-green-500" />
          : <AlertCircle   className="h-5 w-5 text-yellow-500" />}
        <span className="text-sm font-semibold">
          {result.converged ? 'Convergido' : 'Melhor estimativa (não convergiu)'}
        </span>
        <span className="ml-auto text-xs text-muted-foreground">
          {result.iterations} iterações
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded bg-muted/40 p-3 text-center">
          <div className="text-xs text-muted-foreground mb-1">{label}</div>
          <div className="text-xl font-bold font-mono">{fmt(result.found_value, 2)}</div>
          <div className="text-xs text-muted-foreground">{unit}</div>
        </div>
        <div className="rounded bg-muted/40 p-3 text-center">
          <div className="text-xs text-muted-foreground mb-1">Capacidade alcançada</div>
          <div className="text-xl font-bold font-mono">{fmt(result.achieved_target, 0)}</div>
          <div className="text-xs text-muted-foreground">W</div>
        </div>
        <div className="rounded bg-muted/40 p-3 text-center">
          <div className="text-xs text-muted-foreground mb-1">Desvio</div>
          <div className={`text-xl font-bold font-mono ${result.deviation_pct < 1 ? 'text-green-500' : 'text-yellow-500'}`}>
            {fmt(result.deviation_pct, 2)}%
          </div>
          <div className="text-xs text-muted-foreground">da meta</div>
        </div>
      </div>

      {result.history && result.history.length > 0 && (
        <div>
          <button
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => setHistOpen(h => !h)}
          >
            {histOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            Histórico de iterações ({result.history.length})
          </button>
          {histOpen && (
            <div className="mt-2 overflow-auto rounded border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/30 text-muted-foreground">
                    <th className="px-3 py-1.5 text-left">#</th>
                    <th className="px-3 py-1.5 text-right">{label} ({unit})</th>
                    <th className="px-3 py-1.5 text-right">Q (W)</th>
                    <th className="px-3 py-1.5 text-right">Desvio</th>
                  </tr>
                </thead>
                <tbody>
                  {result.history.map((h, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="px-3 py-1 text-muted-foreground">{i + 1}</td>
                      <td className="px-3 py-1 text-right font-mono">{fmt(h.x, 3)}</td>
                      <td className="px-3 py-1 text-right font-mono">{fmt(h.y, 0)}</td>
                      <td className={`px-3 py-1 text-right font-mono ${h.dev_pct < 1 ? 'text-green-500' : ''}`}>
                        {fmt(h.dev_pct, 2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function GoalSeekingTabContent() {
  const [target, setTarget] = useState(8000)
  const [searchVar, setSearchVar] = useState<SearchVariable>('te_c')
  const { isSearching, result, error, startSearch, cancelSearch, reset } = useGoalSeeking()

  const varDef = SEARCH_VARS.find(v => v.value === searchVar)!

  function handleSearch() {
    reset()
    startSearch(target, searchVar, varDef.range)
  }

  return (
    <div className="space-y-4 p-4 max-w-2xl">
      <div>
        <h2 className="text-base font-semibold">Busca por Objetivo</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Define a capacidade alvo e o sistema encontra automaticamente o parâmetro de operação.
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground font-medium">Capacidade alvo (W)</span>
            <input
              type="number"
              value={target}
              onChange={e => setTarget(Number(e.target.value))}
              className="h-9 rounded border border-border bg-background px-3 text-sm font-mono"
              min={100}
              max={200000}
              step={100}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-muted-foreground font-medium">Parâmetro a encontrar</span>
            <select
              value={searchVar}
              onChange={e => { setSearchVar(e.target.value as SearchVariable); reset() }}
              className="h-9 rounded border border-border bg-background px-3 text-sm"
            >
              {SEARCH_VARS.map(v => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
          </label>
        </div>

        <p className="text-xs text-muted-foreground">
          Intervalo de busca: {varDef.range[0]} a {varDef.range[1]} {varDef.unit} (bissecção, ≤25 iterações)
        </p>

        <div className="flex gap-2">
          <Button
            size="sm"
            disabled={isSearching || target <= 0}
            onClick={handleSearch}
            className="gap-1.5"
          >
            <Search className="h-3.5 w-3.5" />
            {isSearching ? 'Buscando…' : 'Buscar'}
          </Button>
          {isSearching && (
            <Button size="sm" variant="outline" onClick={cancelSearch} className="gap-1.5">
              <X className="h-3.5 w-3.5" /> Cancelar
            </Button>
          )}
        </div>

        {isSearching && (
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full animate-pulse bg-primary rounded-full w-3/4" />
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <ResultCard result={result} searchVar={searchVar} unit={varDef.unit} />
    </div>
  )
}
