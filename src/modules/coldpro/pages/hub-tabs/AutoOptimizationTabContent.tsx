/**
 * AutoOptimizationTabContent — Otimização Automática
 *
 * Encontra o melhor ponto de equilíbrio do sistema e sugere ajustes:
 * - Melhor Te, Tc, superaquecimento, subresfriamento
 * - Melhor vazão de ar do evaporador e condensador
 * - Melhor combinação ventilador × coil
 * - Alternativas de compressor e válvula
 *
 * Usa o testHubEngine para calcular e o store para persistir resultados.
 *
 * Referências:
 * - ASHRAE Handbook Refrigeration 2022, Cap. 2 — System Analysis
 * - Domanski, P.A. (1999) — Theoretical Evaluation of the Vapor Compression Cycle
 * - AHRI Standard 540 (2020)
 */
import { useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, AlertCircle, TrendingUp, Zap, Play, Loader2,
  ArrowRight, ArrowUpRight,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Legend,
} from "recharts";
import { useTestHubStore } from "../../stores/useTestHubStore";
import { computeOptimization } from "../../engines/testHubEngine";

export function AutoOptimizationTabContent() {
  const {
    compressor, condenser, evaporator, conditions, selectedMachine,
    optimization, setAnalysisLoading, setAnalysisResult, setAnalysisError,
  } = useTestHubStore();

  const handleRun = useCallback(async () => {
    setAnalysisLoading("optimization", true);
    try {
      const result = await computeOptimization(compressor, condenser, evaporator, conditions);
      setAnalysisResult("optimization", result);
    } catch (e) {
      setAnalysisError("optimization", e instanceof Error ? e.message : "Erro desconhecido");
    }
  }, [compressor, condenser, evaporator, conditions, setAnalysisLoading, setAnalysisResult, setAnalysisError]);

  const result = optimization.result;

  const teChartData = useMemo(() => {
    if (!result?.teRange) return [];
    return result.teRange.map((p) => ({
      Te: p.Te_C,
      Q_kW: parseFloat((p.Q_W / 1000).toFixed(2)),
      COP: parseFloat(p.COP.toFixed(3)),
    }));
  }, [result]);

  const priorityColors: Record<string, string> = {
    high: "var(--color-error)",
    medium: "#f59e0b",
    low: "var(--color-success)",
  };
  const priorityLabels: Record<string, string> = { high: "Alta", medium: "Média", low: "Baixa" };

  return (
    <div className="space-y-5">
      {/* Botão de execução */}
      <div className="cn-card p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Otimização Automática do Sistema</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Varre Te de -45°C a +15°C e Tc de 25°C a 65°C para encontrar o ponto ótimo de operação.
          </p>
        </div>
        <Button
          onClick={handleRun}
          disabled={optimization.loading}
          className="bg-[#1E6FD9] text-white hover:bg-[#1558b0]"
        >
          {optimization.loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Otimizando...</>
          ) : (
            <><Play className="mr-2 h-4 w-4" />Otimizar</>
          )}
        </Button>
      </div>

      {optimization.error && (
        <div
          className="flex items-start gap-3 rounded-lg border p-3"
          style={{ background: "var(--bg-800)", borderColor: "var(--color-error)" }}
        >
          <span style={{ color: "var(--color-error)" }}>
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          </span>
          <p className="text-sm" style={{ color: "var(--color-error)" }}>{optimization.error}</p>
        </div>
      )}

      {result && (
        <>
          {/* Comparação: ponto atual vs otimizado */}
          {result.bestEquilibrium && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="cn-card p-4" style={{ borderColor: "var(--border-subtle)" }}>
                <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>Ponto Atual (Nominal)</p>
                <div className="space-y-2">
                  {[
                    { label: "Te", value: `${(compressor.evap_temp_c ?? selectedMachine?.tempEvaporacaoC ?? -10).toFixed(1)}°C` },
                    { label: "Tc", value: `${(compressor.cond_temp_c ?? selectedMachine?.tempCondensacaoC ?? 40).toFixed(1)}°C` },
                    { label: "Q_evap", value: `${((compressor.cooling_capacity_w ?? 0) / 1000).toFixed(2)} kW` },
                    { label: "COP", value: compressor.cooling_capacity_w && compressor.power_w ? (compressor.cooling_capacity_w / compressor.power_w).toFixed(3) : "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
                      <span className="text-sm font-bold font-mono" style={{ color: "var(--text-secondary)" }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="cn-card p-4"
                style={{ borderColor: "var(--color-success)", background: "var(--bg-800)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm" style={{ color: "var(--color-success)" }}>Ponto Otimizado</p>
                  <span style={{ color: "var(--color-success)" }}>
                    <TrendingUp className="h-4 w-4" />
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Te", value: `${result.bestEquilibrium.Te_C.toFixed(1)}°C` },
                    { label: "Tc", value: `${result.bestEquilibrium.Tc_C.toFixed(1)}°C` },
                    { label: "Q_evap", value: `${(result.bestEquilibrium.Q_evap_W / 1000).toFixed(2)} kW` },
                    { label: "COP", value: result.bestEquilibrium.COP.toFixed(3) },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "var(--color-success)" }}>{label}</span>
                      <span className="text-sm font-bold font-mono" style={{ color: "var(--color-success)" }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Gráfico Te × COP e Te × Q */}
          {teChartData.length > 0 && (
            <div className="cn-card p-4">
              <p className="text-sm mb-1" style={{ color: "var(--text-primary)" }}>Varredura de Te — COP e Capacidade</p>
              <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                Sensibilidade do sistema à temperatura de evaporação. Ponto ótimo marcado.
              </p>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={teChartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="Te"
                    label={{ value: "Te [°C]", position: "insideBottom", offset: -10, fontSize: 11 }}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis yAxisId="cop" orientation="left" tick={{ fontSize: 10 }} label={{ value: "COP", angle: -90, position: "insideLeft", fontSize: 11 }} />
                  <YAxis yAxisId="q" orientation="right" tick={{ fontSize: 10 }} label={{ value: "Q [kW]", angle: 90, position: "insideRight", fontSize: 11 }} />
                  <Tooltip
                    formatter={(v: number, name: string) => [v.toFixed(3), name === "COP" ? "COP" : "Q_evap [kW]"]}
                    labelFormatter={(l: number) => `Te = ${l}°C`}
                  />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Line yAxisId="cop" type="monotone" dataKey="COP" stroke="#1E6FD9" strokeWidth={2.5} dot={false} name="COP" />
                  <Line yAxisId="q" type="monotone" dataKey="Q_kW" stroke="#10b981" strokeWidth={2.5} dot={false} name="Q_evap [kW]" />
                  {result.bestEquilibrium && (
                    <ReferenceLine
                      yAxisId="cop"
                      x={result.bestEquilibrium.Te_C}
                      stroke="#f59e0b"
                      strokeDasharray="5 3"
                      label={{ value: `Te_opt = ${result.bestEquilibrium.Te_C.toFixed(1)}°C`, fontSize: 9, fill: "#f59e0b", position: "top" }}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Ajustes recomendados */}
          {result.adjustments.length > 0 && (
            <div className="cn-card p-4">
              <p className="text-sm mb-1" style={{ color: "var(--text-primary)" }}>Ajustes Recomendados</p>
              <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
                Ordenados por prioridade de impacto no desempenho do sistema.
              </p>
              <div className="space-y-3">
                {result.adjustments.map((adj, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border p-3"
                    style={{ borderColor: "var(--border-subtle)" }}
                  >
                    <span
                      className="mt-0.5 shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded cn-badge"
                      style={{ background: priorityColors[adj.priority], color: "#fff" }}
                    >
                      {priorityLabels[adj.priority]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{adj.parameter}</p>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <span className="font-mono" style={{ color: "var(--text-muted)" }}>{adj.current}</span>
                        <span style={{ color: "var(--text-muted)" }}>
                          <ArrowRight className="h-3 w-3" />
                        </span>
                        <span className="font-mono font-bold" style={{ color: "var(--color-success)" }}>{adj.suggested}</span>
                      </div>
                      <p className="mt-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
                        Ganho esperado: <span className="font-medium" style={{ color: "var(--color-success)" }}>{adj.expectedGain}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recomendações gerais */}
          {result.recommendations.length > 0 && (
            <div className="cn-card p-4">
              <p className="text-sm mb-3" style={{ color: "var(--text-primary)" }}>Recomendações Gerais</p>
              <div className="space-y-2">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span style={{ color: "#1E6FD9" }}>
                      <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    </span>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div
              className="flex items-start gap-3 rounded-lg border p-3"
              style={{ background: "var(--bg-800)", borderColor: "#f59e0b" }}
            >
              <span style={{ color: "#f59e0b" }}>
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              </span>
              <ul className="space-y-1 text-xs" style={{ color: "#f59e0b" }}>
                {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
              </ul>
            </div>
          )}
        </>
      )}

      {!result && !optimization.loading && (
        <div className="cn-card p-4 flex flex-col items-center justify-center gap-3 py-10">
          <span style={{ color: "var(--text-muted)" }}>
            <Zap className="h-10 w-10" />
          </span>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Clique em "Otimizar" para encontrar o melhor ponto de operação.</p>
        </div>
      )}
    </div>
  );
}
