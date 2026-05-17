/**
 * ValidationDashboardPage — Dashboard de resultados de validação em lote
 * Rota: /coldpro/validation
 * Consulta validation_results do Supabase. Sem lógica — tudo em useValidationDashboard.
 */
import { RefreshCw, CheckCircle2, XCircle, Clock, BarChart3, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useValidationDashboard } from "./useValidationDashboard";

export function ValidationDashboardPage() {
  const { rows, summary, filter, setFilter, isLoading, error, refresh, lastUpdated } =
    useValidationDashboard();

  return (
    <div className="space-y-4 p-4 lg:p-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
            <BarChart3 className="h-6 w-6" style={{ color: "var(--ice-400)" }} />
            Validação em Lote
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Resultados gerados pela exportação em lote de Data Sheets.
            {lastUpdated && (
              <span className="ml-2 text-xs opacity-60">
                Atualizado {new Date(lastUpdated).toLocaleString("pt-BR")}
              </span>
            )}
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={refresh} disabled={isLoading}
          className="shrink-0 gap-1.5">
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </header>

      {/* ── Cartões de resumo ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryCard label="Total" value={summary.total} icon={<Clock className="h-4 w-4 text-muted-foreground" />} />
        <SummaryCard label="PASS" value={summary.pass}
          icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
          color="text-green-500" />
        <SummaryCard label="FAIL" value={summary.fail}
          icon={<XCircle className="h-4 w-4 text-red-400" />}
          color="text-red-400" />
        <SummaryCard label="Score médio"
          value={summary.total > 0 ? `${summary.avgScore.toFixed(0)}%` : "—"}
          icon={<BarChart3 className="h-4 w-4" style={{ color: "var(--ice-400)" }} />}
          color="text-[--ice-400]" />
      </div>

      {/* ── Filtro de status ── */}
      <div className="flex items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-muted-foreground" />
        {(["all", "PASS", "FAIL"] as const).map((s) => (
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

      {/* ── Conteúdo ── */}
      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {error.includes("relation") || error.includes("does not exist")
            ? "Tabela validation_results não encontrada. Execute a migration 20260517000001 no Supabase SQL Editor."
            : `Erro ao carregar: ${error}`}
        </div>
      )}

      {!error && rows.length === 0 && !isLoading && (
        <div className="rounded-md border p-8 text-center text-sm text-muted-foreground"
          style={{ borderColor: "var(--border-subtle)" }}>
          Nenhum resultado encontrado. Use{" "}
          <strong className="text-foreground">Exportação em Lote</strong> para gerar validações.
        </div>
      )}

      {rows.length > 0 && (
        <div className="overflow-auto rounded-md border" style={{ borderColor: "var(--border-subtle)" }}>
          <table className="w-full text-xs">
            <thead className="sticky top-0 z-10" style={{ background: "var(--bg-800, #1e293b)" }}>
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Modelo</th>
                <th className="px-3 py-2 text-center font-semibold text-muted-foreground">Status</th>
                <th className="px-3 py-2 text-right font-semibold text-muted-foreground">Score</th>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Engine</th>
                <th className="px-3 py-2 text-left font-semibold text-muted-foreground">Validado em</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
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
                  <td className="px-3 py-2 text-muted-foreground">{r.engine_version ?? "—"}</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {new Date(r.validated_at).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, icon, color = "text-foreground" }: {
  label: string; value: number | string; icon: React.ReactNode; color?: string;
}) {
  return (
    <div className="rounded-md border p-3" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-800, #1e293b)" }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">{label}</span>
        {icon}
      </div>
      <div className={`mt-1 text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isPass = status === "PASS";
  return (
    <span className="rounded px-1.5 py-0.5 text-[10px] font-bold"
      style={{
        background: isPass ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
        color: isPass ? "#22c55e" : "#ef4444",
      }}>
      {status}
    </span>
  );
}
