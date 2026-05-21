import { useState, useCallback } from "react";
import {
  RefreshCw, CheckCircle2, XCircle, AlertTriangle,
  Clock, BarChart3, Filter, Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useValidationDashboard, type StatusFilter } from "./useValidationDashboard";
import {
  runBatchValidation,
  type BatchValidationReport,
} from "@/modules/coldpro_catalog/services/batchValidationService";
import { useCatalogDataStore } from "@/modules/coldpro_catalog/store/useCatalogDataStore";

export function ValidationDashboardPage() {
  const { rows, summary, filter, setFilter, isLoading, error, refresh, lastUpdated } =
    useValidationDashboard();

  const catalogRows = useCatalogDataStore((s) => s.rows);
  const validableCount = catalogRows.filter(
    (m) => m.family !== "plugin" || !!m.compressorModelo,
  ).length;

  const [running, setRunning]         = useState(false);
  const [progress, setProgress]       = useState<{ done: number; total: number } | null>(null);
  const [localReport, setLocalReport] = useState<BatchValidationReport | null>(null);
  const [runError, setRunError]       = useState<string | null>(null);

  const handleRun = useCallback(async () => {
    setRunning(true);
    setLocalReport(null);
    setRunError(null);
    setProgress({ done: 0, total: 0 });
    try {
      const report = await runBatchValidation((done, total) =>
        setProgress({ done, total }),
      );
      setLocalReport(report);
      await refresh();
    } catch (e) {
      setRunError(e instanceof Error ? e.message : String(e));
    } finally {
      setRunning(false);
      setProgress(null);
    }
  }, [refresh]);

  return (
    <div className="space-y-4 p-4 lg:p-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <BarChart3 className="h-6 w-6" style={{ color: "var(--ice-400)" }} />
            Validação em Lote
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Engine vs catálogo — desvio de capacidade frigorífica.
            {lastUpdated && (
              <span className="ml-2 text-xs opacity-60">
                Atualizado {new Date(lastUpdated).toLocaleString("pt-BR")}
              </span>
            )}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button size="sm" variant="outline" onClick={refresh} disabled={isLoading || running}
            className="gap-1.5">
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Atualizar
          </Button>
          <Button size="sm" onClick={handleRun} disabled={running || isLoading}
            className="gap-1.5"
            style={{ background: "var(--ice-400)", color: "#0A1628" }}>
            <Play className="h-3.5 w-3.5" />
            {running ? "Rodando…" : `▶ Rodar validação (${validableCount} modelos)`}
          </Button>
        </div>
      </header>

      {/* ── Barra de progresso ── */}
      {running && progress && progress.total > 0 && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Processando modelos…</span>
            <span>{progress.done} / {progress.total}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${(progress.done / progress.total) * 100}%`,
                background: "var(--ice-400)",
              }}
            />
          </div>
        </div>
      )}

      {/* ── Resumo da execução local ── */}
      {localReport && (
        <div className="rounded-md border p-3 text-xs"
          style={{ borderColor: "var(--border-subtle)", background: "var(--bg-800, #1e293b)" }}>
          <p className="mb-1.5 font-semibold text-foreground">
            Execução — {new Date(localReport.ran_at).toLocaleString("pt-BR")} · engine v{localReport.engine_version}
          </p>
          <div className="flex flex-wrap gap-4">
            <Stat label="Total" value={localReport.total} />
            <Stat label="PASS ≤5%" value={localReport.passed} color="#22c55e" />
            <Stat label="WARN 5–15%" value={localReport.warned} color="#f59e0b" />
            <Stat label="FAIL >15%" value={localReport.failed} color="#ef4444" />
            <Stat label="SKIP" value={localReport.skipped} color="var(--text-secondary)" />
          </div>
        </div>
      )}

      {runError && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
          Erro na execução: {runError}
        </div>
      )}

      {/* ── Cartões de resumo (Supabase) ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <SummaryCard label="Total" value={summary.total}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />} />
        <SummaryCard label="PASS" value={summary.pass}
          icon={<CheckCircle2 className="h-4 w-4 text-green-500" />} color="text-green-500" />
        <SummaryCard label="WARN" value={summary.warn}
          icon={<AlertTriangle className="h-4 w-4 text-amber-400" />} color="text-amber-400" />
        <SummaryCard label="FAIL" value={summary.fail}
          icon={<XCircle className="h-4 w-4 text-red-400" />} color="text-red-400" />
        <SummaryCard label="Score médio"
          value={summary.total > 0 ? `${summary.avgScore.toFixed(0)}%` : "—"}
          icon={<BarChart3 className="h-4 w-4" style={{ color: "var(--ice-400)" }} />}
          color="text-[--ice-400]" />
      </div>

      {/* ── Filtros ── */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
        {(["all", "PASS", "WARN", "FAIL", "SKIP"] as StatusFilter[]).map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className="rounded px-2.5 py-1 text-xs font-semibold transition-colors"
            style={{
              background: filter === s ? "var(--ice-400)" : "var(--bg-800, #1e293b)",
              color: filter === s ? "#0A1628" : "var(--text-secondary)",
              border: "1px solid var(--border-subtle)",
            }}>
            {s === "all" ? "Todos" : s}
          </button>
        ))}
      </div>

      {/* ── Estado vazio / erro ── */}
      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error.includes("relation") || error.includes("does not exist")
            ? "Tabela validation_results não encontrada. Execute a migration no Supabase SQL Editor."
            : `Erro: ${error}`}
        </div>
      )}

      {!error && rows.length === 0 && !isLoading && !running && (
        <div className="rounded-md border p-8 text-center text-sm text-muted-foreground"
          style={{ borderColor: "var(--border-subtle)" }}>
          Nenhum resultado. Clique em{" "}
          <strong className="text-foreground">▶ Rodar validação</strong> para processar os {validableCount} modelos.
        </div>
      )}

      {/* ── Tabela ── */}
      {rows.length > 0 && (
        <div className="overflow-auto rounded-md border" style={{ borderColor: "var(--border-subtle)" }}>
          <table className="w-full text-xs">
            <thead className="sticky top-0 z-10" style={{ background: "var(--bg-800, #1e293b)" }}>
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Modelo</th>
                <th className="px-3 py-2 text-center font-semibold text-muted-foreground">Status</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">Score</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">Q cat (W)</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">Q engine (W)</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">Δ%</th>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Validado em</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const crit = Array.isArray(r.criteria)
                  ? (r.criteria[0] as Record<string, number> | undefined)
                  : undefined;
                const qCat = crit?.expected;
                const qEng = crit?.calculated;
                const dev  = crit?.deviation_pct;
                return (
                  <tr key={r.id} className="border-t transition-colors hover:bg-muted/20"
                    style={{ borderColor: "var(--border-subtle)" }}>
                    <td className="max-w-[220px] truncate px-3 py-2 font-mono text-[11px] text-foreground">
                      {r.catalog_model_id ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <StatusBadge status={r.overall_status} />
                    </td>
                    <td className="px-3 py-2 text-right font-mono" style={{ color: "var(--text-primary)" }}>
                      {r.score_pct != null ? `${Number(r.score_pct).toFixed(0)}%` : "—"}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-muted-foreground">
                      {qCat != null ? Math.round(qCat).toLocaleString("pt-BR") : "—"}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-muted-foreground">
                      {qEng != null ? Math.round(qEng).toLocaleString("pt-BR") : "—"}
                    </td>
                    <td className="px-3 py-2 text-right font-mono"
                      style={{
                        color: dev == null ? "inherit"
                          : Math.abs(dev) <= 5 ? "#22c55e"
                          : Math.abs(dev) <= 15 ? "#f59e0b"
                          : "#ef4444",
                      }}>
                      {dev != null ? `${dev > 0 ? "+" : ""}${dev.toFixed(1)}%` : "—"}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {new Date(r.validated_at).toLocaleString("pt-BR", {
                        dateStyle: "short", timeStyle: "short",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <span className="text-muted-foreground">
      {label}: <strong style={{ color: color ?? "var(--text-primary)" }}>{value}</strong>
    </span>
  );
}

function SummaryCard({ label, value, icon, color = "text-foreground" }: {
  label: string; value: number | string; icon: React.ReactNode; color?: string;
}) {
  return (
    <div className="rounded-md border p-3"
      style={{ borderColor: "var(--border-subtle)", background: "var(--bg-800, #1e293b)" }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        {icon}
      </div>
      <div className={`mt-1 text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { bg: string; color: string }> = {
    PASS: { bg: "rgba(34,197,94,0.15)",   color: "#22c55e" },
    WARN: { bg: "rgba(245,158,11,0.15)",  color: "#f59e0b" },
    FAIL: { bg: "rgba(239,68,68,0.15)",   color: "#ef4444" },
    SKIP: { bg: "rgba(148,163,184,0.15)", color: "#94a3b8" },
  };
  const { bg, color } = cfg[status] ?? { bg: "rgba(148,163,184,0.1)", color: "#94a3b8" };
  return (
    <span className="rounded px-1.5 py-0.5 text-[10px] font-bold"
      style={{ background: bg, color }}>
      {status}
    </span>
  );
}
