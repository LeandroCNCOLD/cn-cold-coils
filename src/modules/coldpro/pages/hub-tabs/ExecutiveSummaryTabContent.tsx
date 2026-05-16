/**
 * ExecutiveSummaryTabContent — Resumo Executivo
 *
 * Visão consolidada de todas as análises do Hub de Testes.
 * Mostra o status de cada análise e os principais resultados.
 */
import { CheckCircle2, AlertCircle, XCircle, Clock, Brain, BarChart3, Thermometer, Zap, Wind, Target, Activity, TrendingUp } from "lucide-react";
import { useTestHubStore } from "../../stores/useTestHubStore";
import type { CatalogEquipmentRow } from "@/modules/coldpro_catalog/data/equipmentCatalog.types";
import { CapacityDisplay, fmtCapacity } from "../../components/ui/CapacityDisplay";

interface Props {
  machine: CatalogEquipmentRow | null;
  onNavigate: (tab: string) => void;
}

export function ExecutiveSummaryTabContent({ machine, onNavigate }: Props) {
  const { compressor, condenser, evaporator, ph, montecarlo, optimization, ai, isConfigured } = useTestHubStore();

  const Q_W = compressor.cooling_capacity_w ?? 0;
  const Q_kW = Q_W / 1000;
  const W_kW = (compressor.power_w ?? Q_kW / 2.5);
  const COP = W_kW > 0 ? Q_kW / W_kW : 0;

  const analyses = [
    {
      id: "ph",
      name: "Diagrama P-H",
      icon: Activity,
      state: ph,
      summary: ph.result ? `COP ${ph.result.COP.toFixed(3)} · Tc ${ph.result.Tc_C.toFixed(1)}°C · Te ${ph.result.Te_C.toFixed(1)}°C` : null,
      tab: "ph",
    },
    {
      id: "montecarlo",
      name: "Monte Carlo",
      icon: BarChart3,
      state: montecarlo,
      summary: montecarlo.result ? `COP nominal: ${montecarlo.result.cop.nominal.toFixed(3)} · IC90%: [${montecarlo.result.cop.lower.toFixed(2)}, ${montecarlo.result.cop.upper.toFixed(2)}]` : null,
      tab: "montecarlo",
    },
    {
      id: "optimization",
      name: "Otimização",
      icon: TrendingUp,
      state: optimization,
      summary: optimization.result?.bestEquilibrium
        ? `COP ótimo: ${optimization.result.bestEquilibrium.COP.toFixed(3)} · Te_opt: ${optimization.result.bestEquilibrium.Te_C.toFixed(1)}°C`
        : null,
      tab: "optimization",
    },
    {
      id: "ai",
      name: "Análise de IA",
      icon: Brain,
      state: ai,
      summary: ai.result ? `Nota: ${ai.result.grade} (${ai.result.score}/100) — ${ai.result.summary.slice(0, 80)}...` : null,
      tab: "ai",
    },
  ];

  const completedCount = analyses.filter((a) => a.state.result != null).length;
  const overallGrade = ai.result?.grade ?? (completedCount >= 3 ? "B" : null);

  return (
    <div className="space-y-5">
      {/* Header da máquina */}
      {machine ? (
        <div className="cn-card p-5" style={{ borderColor: "rgba(30,111,217,0.3)" }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{machine.modelo}</p>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {machine.application} · {machine.refrigerante} · {machine.linha ?? "—"} · {machine.tensaoComercial ?? `${machine.tensaoV ?? "—"}V`}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {machine.capacidadeFrigorificaKcalH && (
                  <span className="cn-badge cn-badge--info text-xs font-mono">
                    {(machine.capacidadeFrigorificaKcalH).toFixed(0)} kcal/h
                  </span>
                )}
                {machine.potenciaEletricaKw && (
                  <span className="cn-badge cn-badge--info text-xs font-mono">
                    {machine.potenciaEletricaKw.toFixed(2)} kW
                  </span>
                )}
                {COP > 0 && (
                  <span className="cn-badge cn-badge--approved text-xs font-mono">
                    COP {COP.toFixed(3)}
                  </span>
                )}
              </div>
            </div>
            {overallGrade && (
              <div className={`flex h-16 w-16 items-center justify-center rounded-xl border-2 text-4xl font-black`} style={{
                borderColor: overallGrade === "A" ? "var(--color-success)" :
                  overallGrade === "B" ? "var(--ice-400)" :
                  overallGrade === "C" ? "#f59e0b" :
                  "var(--color-error)",
                background: overallGrade === "A" ? "rgba(16,185,129,0.12)" :
                  overallGrade === "B" ? "rgba(56,189,248,0.12)" :
                  overallGrade === "C" ? "rgba(245,158,11,0.12)" :
                  "rgba(239,68,68,0.12)",
                color: overallGrade === "A" ? "var(--color-success)" :
                  overallGrade === "B" ? "var(--ice-400)" :
                  overallGrade === "C" ? "#f59e0b" :
                  "var(--color-error)",
              }}>
                {overallGrade}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="cn-card p-8 flex items-center justify-center">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Selecione uma máquina na aba Configuração para ver o resumo.</p>
        </div>
      )}

      {/* Métricas principais */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Capacidade Frigorífica", value: Q_kW > 0 ? `${Q_kW.toFixed(2)} kW` : "—", sub: Q_kW > 0 ? `${fmtCapacity(Q_W, "kcal/h")} kcal/h · ${fmtCapacity(Q_W, "BTU/h")} BTU/h · ${fmtCapacity(Q_W, "TR")} TR` : "", icon: Thermometer, colorStyle: { color: "var(--ice-400)" } },
          { label: "Potência Elétrica", value: W_kW > 0 ? `${W_kW.toFixed(2)} kW` : "—", sub: machine?.correnteA ? `${machine.correnteA.toFixed(1)} A` : "", icon: Zap, colorStyle: { color: "#f59e0b" } },
          { label: "COP", value: COP > 0 ? COP.toFixed(3) : "—", sub: COP > 0 ? `EER: ${(COP * 3.412).toFixed(2)}` : "", icon: TrendingUp, colorStyle: { color: "var(--color-success)" } },
          { label: "Análises Concluídas", value: `${completedCount}/${analyses.length}`, sub: `${Math.round((completedCount / analyses.length) * 100)}% completo`, icon: CheckCircle2, colorStyle: { color: "var(--ice-400)" } },
        ].map(({ label, value, sub, icon: Icon, colorStyle }) => (
          <div key={label} className="cn-card p-4">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" style={colorStyle} />
              <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{label}</p>
            </div>
            <p className="mt-1 text-xl font-bold font-mono" style={colorStyle}>{value}</p>
            {sub && <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{sub}</p>}
          </div>
        ))}
      </div>

      {/* Capacidade em múltiplas unidades */}
      {Q_W > 0 && (
        <div className="cn-card p-4" style={{ borderColor: "rgba(56,189,248,0.2)" }}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--ice-400)" }}>Capacidade Frigorífica — Conversão de Unidades</p>
          <CapacityDisplay watts={Q_W} primary="kW" />
        </div>
      )}

      {/* Status das análises */}
      <div className="cn-card p-4">
        <p className="mb-3 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Status das Análises</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {analyses.map((analysis) => {
            const Icon = analysis.icon;
            const hasResult = analysis.state.result != null;
            const isLoading = analysis.state.loading;
            const hasError = analysis.state.error != null;

            return (
              <div
                key={analysis.id}
                className="cursor-pointer rounded-lg border p-3 transition-all hover:shadow-sm"
                style={{
                  borderColor: hasResult ? "rgba(16,185,129,0.35)" :
                    hasError ? "rgba(239,68,68,0.35)" :
                    "var(--border-subtle)",
                  background: hasResult ? "rgba(16,185,129,0.07)" :
                    hasError ? "rgba(239,68,68,0.07)" :
                    "var(--bg-800)",
                }}
                onClick={() => onNavigate(analysis.tab)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" style={{
                    color: hasResult ? "var(--color-success)" :
                      hasError ? "var(--color-error)" :
                      "var(--text-muted)",
                  }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{analysis.name}</p>
                      {isLoading ? (
                        <span className="cn-badge cn-badge--info text-[10px]">Rodando...</span>
                      ) : hasResult ? (
                        <CheckCircle2 className="h-3.5 w-3.5" style={{ color: "var(--color-success)" }} />
                      ) : hasError ? (
                        <XCircle className="h-3.5 w-3.5" style={{ color: "var(--color-error)" }} />
                      ) : (
                        <Clock className="h-3.5 w-3.5" style={{ color: "var(--text-muted)" }} />
                      )}
                    </div>
                    {analysis.summary && (
                      <p className="mt-0.5 text-[10px] truncate" style={{ color: "var(--text-muted)" }}>{analysis.summary}</p>
                    )}
                    {hasError && (
                      <p className="mt-0.5 text-[10px]" style={{ color: "var(--color-error)" }}>{analysis.state.error}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Diagnóstico da IA (resumido) */}
      {ai.result && (
        <div className="cn-card p-4" style={{ borderColor: "rgba(30,111,217,0.3)" }}>
          <div className="flex items-center gap-2 mb-3">
            <Brain className="h-4 w-4" style={{ color: "var(--ice-400)" }} />
            <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Diagnóstico da IA</p>
          </div>
          <p className="text-sm" style={{ color: "var(--text-primary)" }}>{ai.result.summary}</p>
          {ai.result.recommendations.slice(0, 3).map((rec, i) => (
            <div key={i} className="mt-2 flex items-start gap-2">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1E6FD9] text-[9px] font-bold text-white">{rec.priority}</span>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{rec.action}</p>
            </div>
          ))}
        </div>
      )}

      {/* Alertas críticos de todas as análises */}
      {[
        ...(ph.result?.warnings ?? []),
        ...(montecarlo.result?.warnings ?? []),
        ...(optimization.result?.warnings ?? []),
        ...(ai.result?.warnings ?? []),
      ].length > 0 && (
        <div className="cn-card p-4" style={{ borderColor: "rgba(245,158,11,0.4)", background: "rgba(245,158,11,0.07)" }}>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4" style={{ color: "#f59e0b" }} />
            <p className="text-sm font-semibold" style={{ color: "#f59e0b" }}>Alertas do Sistema</p>
          </div>
          <ul className="space-y-1">
            {[
              ...(ph.result?.warnings ?? []),
              ...(montecarlo.result?.warnings ?? []),
              ...(optimization.result?.warnings ?? []),
              ...(ai.result?.warnings ?? []),
            ].slice(0, 8).map((w, i) => (
              <li key={i} className="text-xs" style={{ color: "#f59e0b" }}>• {w}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
