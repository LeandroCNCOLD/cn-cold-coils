/**
 * AIAnalysisTabContent — Análise de IA
 *
 * Motor de diagnóstico técnico embarcado com regras termodinâmicas:
 * - Aprovação/reprovação da máquina com nota A-F
 * - Diagnóstico por categoria (compressor, condensador, evaporador, ciclo, elétrica)
 * - Recomendações priorizadas com impacto esperado
 * - Insights termodinâmicos baseados em ASHRAE/Incropera/Bitzer
 *
 * A IA não usa LLM externo — usa um motor de regras embarcado treinado
 * com a literatura técnica de refrigeração industrial.
 *
 * Referências:
 * - ASHRAE Handbook Refrigeration 2022
 * - ASHRAE Handbook Fundamentals 2021
 * - Bitzer Technical Information A-501 (2019)
 * - Incropera et al. (2011) — Fundamentals of Heat and Mass Transfer, 7th ed.
 * - AHRI Standard 540 (2020)
 * - EN 12900:2013
 */
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, AlertCircle, XCircle, Brain, Play, Loader2,
  BookOpen, ArrowUpRight, Star,
} from "lucide-react";
import { useTestHubStore } from "../../stores/useTestHubStore";
import { computeAIAnalysis } from "../../engines/testHubEngine";

const GRADE_COLORS: Record<string, { text: string; border: string }> = {
  A: { text: "var(--color-success)", border: "var(--color-success)" },
  B: { text: "var(--ice-400)", border: "var(--ice-400)" },
  C: { text: "#f59e0b", border: "#f59e0b" },
  D: { text: "#f97316", border: "#f97316" },
  F: { text: "var(--color-error)", border: "var(--color-error)" },
};

const SEVERITY_ICONS = {
  ok: <span style={{ color: "var(--color-success)" }}><CheckCircle2 className="h-4 w-4" /></span>,
  warning: <span style={{ color: "#f59e0b" }}><AlertCircle className="h-4 w-4" /></span>,
  critical: <span style={{ color: "var(--color-error)" }}><XCircle className="h-4 w-4" /></span>,
};

const SEVERITY_BORDER: Record<string, string> = {
  ok: "var(--color-success)",
  warning: "#f59e0b",
  critical: "var(--color-error)",
};

export function AIAnalysisTabContent() {
  const {
    compressor, condenser, evaporator, conditions, selectedMachine,
    ai, ph, montecarlo, optimization,
    setAnalysisLoading, setAnalysisResult, setAnalysisError,
  } = useTestHubStore();

  const handleRun = useCallback(async () => {
    setAnalysisLoading("ai", true);
    try {
      const result = await computeAIAnalysis(
        compressor, condenser, evaporator, conditions,
        ph.result,
        montecarlo.result,
        optimization.result,
      );
      setAnalysisResult("ai", result);
    } catch (e) {
      setAnalysisError("ai", e instanceof Error ? e.message : "Erro desconhecido");
    }
  }, [compressor, condenser, evaporator, conditions, ph.result, montecarlo.result, optimization.result, setAnalysisLoading, setAnalysisResult, setAnalysisError]);

  const result = ai.result;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="cn-card p-4" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "var(--bg-800)" }}>
              <span style={{ color: "var(--ice-400)" }}><Brain className="h-5 w-5" /></span>
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Motor de Diagnóstico Técnico</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Regras embarcadas baseadas em ASHRAE, AHRI 540, EN 12900, Bitzer e Incropera.
              </p>
            </div>
          </div>
          <Button
            onClick={handleRun}
            disabled={ai.loading}
            className="bg-[#1E6FD9] text-white hover:bg-[#1558b0]"
          >
            {ai.loading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analisando...</>
            ) : (
              <><Play className="mr-2 h-4 w-4" />Analisar</>
            )}
          </Button>
        </div>
      </div>

      {ai.error && (
        <div
          className="rounded-lg border p-3"
          style={{ borderColor: "var(--color-error)", background: "var(--bg-800)" }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: "var(--color-error)" }}><AlertCircle className="h-4 w-4" /></span>
            <p className="text-sm" style={{ color: "var(--color-error)" }}>{ai.error}</p>
          </div>
        </div>
      )}

      {result && (
        <>
          {/* Nota geral */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div
              className="cn-card p-4 sm:col-span-1 flex flex-col items-center justify-center border-2"
              style={{ borderColor: GRADE_COLORS[result.grade]?.border }}
            >
              <span className="text-7xl font-black font-mono" style={{ color: GRADE_COLORS[result.grade]?.text }}>
                {result.grade}
              </span>
              <p className="mt-2 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Nota Técnica</p>
              <div className="mt-3 h-2 w-full rounded-full" style={{ background: "var(--bg-800)" }}>
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${result.score}%`,
                    background: result.score >= 80 ? "var(--color-success)" : result.score >= 60 ? "#f59e0b" : "var(--color-error)",
                  }}
                />
              </div>
              <p className="mt-1 text-xs font-mono" style={{ color: "var(--text-muted)" }}>{result.score}/100 pontos</p>
            </div>

            <div className="cn-card p-4 sm:col-span-2">
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Diagnóstico Geral</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{result.summary}</p>
              {result.thermodynamicInsights.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  {result.thermodynamicInsights.map((insight, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span style={{ color: "var(--ice-400)" }}><BookOpen className="mt-0.5 h-3.5 w-3.5 shrink-0" /></span>
                      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{insight}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Diagnósticos por categoria */}
          <div className="cn-card p-4">
            <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>Diagnóstico por Categoria</p>
            <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
              Análise técnica baseada em regras termodinâmicas e normas industriais.
            </p>
            <div className="space-y-3">
              {result.diagnoses.map((diag, i) => (
                <div
                  key={i}
                  className="rounded-lg border p-3"
                  style={{ borderColor: SEVERITY_BORDER[diag.severity], background: "var(--bg-800)" }}
                >
                  <div className="flex items-start gap-3">
                    {SEVERITY_ICONS[diag.severity]}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{diag.category}</span>
                        <span
                          className="cn-badge text-[10px]"
                          style={{
                            color: diag.severity === "critical" ? "var(--color-error)" : diag.severity === "warning" ? "#f59e0b" : "var(--color-success)",
                            borderColor: diag.severity === "critical" ? "var(--color-error)" : diag.severity === "warning" ? "#f59e0b" : "var(--color-success)",
                          }}
                        >
                          {diag.severity === "critical" ? "Crítico" : diag.severity === "warning" ? "Atenção" : "OK"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{diag.finding}</p>
                      <p className="mt-0.5 text-[11px]" style={{ color: "var(--text-muted)" }}>{diag.explanation}</p>
                      <p className="mt-1 text-[10px] italic" style={{ color: "var(--text-muted)" }}>Ref: {diag.reference}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendações priorizadas */}
          {result.recommendations.length > 0 && (
            <div className="cn-card p-4">
              <p className="text-sm font-semibold flex items-center gap-2 mb-3" style={{ color: "var(--text-primary)" }}>
                <span style={{ color: "#f59e0b" }}><Star className="h-4 w-4" /></span>
                Recomendações Priorizadas
              </p>
              <div className="space-y-3">
                {result.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border p-3"
                    style={{ borderColor: "var(--border-subtle)", background: "var(--bg-800)" }}
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1E6FD9] text-[10px] font-bold text-white font-mono">
                      {rec.priority}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{rec.action}</p>
                      <div className="mt-1 flex items-center gap-1">
                        <span style={{ color: "var(--color-success)" }}><ArrowUpRight className="h-3 w-3" /></span>
                        <p className="text-[11px]" style={{ color: "var(--color-success)" }}>{rec.expectedImpact}</p>
                      </div>
                      <p className="mt-0.5 text-[10px] italic" style={{ color: "var(--text-muted)" }}>Ref: {rec.reference}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div
              className="rounded-lg border p-3"
              style={{ borderColor: "#f59e0b", background: "var(--bg-800)" }}
            >
              <div className="flex items-start gap-2">
                <span style={{ color: "#f59e0b" }}><AlertCircle className="h-4 w-4" /></span>
                <ul className="space-y-1 text-xs" style={{ color: "#f59e0b" }}>
                  {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            </div>
          )}
        </>
      )}

      {!result && !ai.loading && (
        <div className="cn-card p-4">
          <div className="flex flex-col items-center justify-center gap-4 py-10">
            <span style={{ color: "var(--text-muted)" }}><Brain className="h-12 w-12" /></span>
            <div className="text-center">
              <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Motor de Diagnóstico Técnico</p>
              <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                Analisa o sistema com base em regras termodinâmicas embarcadas.
                Para melhores resultados, execute primeiro o Diagrama P-H, Monte Carlo e Otimização.
              </p>
            </div>
            <Button onClick={handleRun} className="bg-[#1E6FD9] text-white hover:bg-[#1558b0]">
              <Brain className="mr-2 h-4 w-4" />
              Iniciar Diagnóstico
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
