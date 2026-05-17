/**
 * CatalogBatchExportPage — Exportação em lote de Data Sheets
 * Rota: /coldpro/catalog/export
 * Máx 200 linhas. Toda lógica em useCatalogBatchExport.
 */
import { Download, Filter, CheckSquare, Square, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCatalogBatchExport } from "./useCatalogBatchExport";

const APPLICATIONS = ["all", "LT", "MT", "HT", "AGRO"] as const;

export function CatalogBatchExportPage() {
  const {
    models, filtered, selected, filters, queue, isExporting,
    linhas, refrigerantes,
    toggleSelect, selectNone, selectFiltered,
    setFilter, startExport,
  } = useCatalogBatchExport();

  const selCount = selected.size;
  const progress = queue.total > 0 ? (queue.done / queue.total) * 100 : 0;
  const totalExcluded = 480 - models.length;

  return (
    <div className="flex h-full min-h-0 gap-0" style={{ background: "var(--bg-900)" }}>

      {/* ── COLUNA ESQUERDA: filtros + ações ── */}
      <aside className="flex w-72 shrink-0 flex-col gap-4 border-r p-4" style={{ borderColor: "var(--border-subtle)" }}>

        <div>
          <h1 className="flex items-center gap-2 text-sm font-bold" style={{ color: "var(--text-primary)" }}>
            <FileText className="h-4 w-4" style={{ color: "var(--ice-400)" }} />
            Exportação em Lote
          </h1>
          <p className="mt-0.5 text-[11px]" style={{ color: "var(--text-muted)" }}>
            {filtered.length} modelos filtrados · {selCount} selecionados
          </p>
          <p className="mt-0.5 text-[10px]" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
            {models.length} com configuração completa · {totalExcluded} modelos base excluídos
          </p>
        </div>

        {/* Filtros */}
        <div className="space-y-3">
          <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
            <Filter className="h-3 w-3" /> Filtros
          </p>

          {/* Busca */}
          <input
            type="text"
            placeholder="Buscar modelo..."
            value={filters.search}
            onChange={(e) => setFilter("search", e.target.value)}
            className="h-8 w-full rounded border px-2.5 text-xs"
            style={{ background: "var(--bg-800)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
          />

          {/* Application */}
          <div>
            <p className="mb-1 text-[10px]" style={{ color: "var(--text-muted)" }}>Aplicação</p>
            <div className="flex flex-wrap gap-1">
              {APPLICATIONS.map((app) => (
                <button
                  key={app}
                  onClick={() => setFilter("application", app)}
                  className="rounded px-2 py-0.5 text-[10px] font-semibold transition-colors"
                  style={{
                    background: filters.application === app ? "var(--ice-400)" : "var(--bg-800)",
                    color: filters.application === app ? "#0A1628" : "var(--text-secondary)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {app === "all" ? "Todas" : app}
                </button>
              ))}
            </div>
          </div>

          {/* Linha */}
          <div>
            <p className="mb-1 text-[10px]" style={{ color: "var(--text-muted)" }}>Linha</p>
            <select
              value={filters.linha}
              onChange={(e) => setFilter("linha", e.target.value)}
              className="h-8 w-full rounded border px-2 text-xs"
              style={{ background: "var(--bg-800)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
            >
              <option value="">Todas as linhas</option>
              {linhas.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          {/* Refrigerante */}
          <div>
            <p className="mb-1 text-[10px]" style={{ color: "var(--text-muted)" }}>Refrigerante</p>
            <select
              value={filters.refrigerante}
              onChange={(e) => setFilter("refrigerante", e.target.value as typeof filters.refrigerante)}
              className="h-8 w-full rounded border px-2 text-xs"
              style={{ background: "var(--bg-800)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
            >
              <option value="all">Todos</option>
              {refrigerantes.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        {/* Ações de seleção */}
        <div className="space-y-2 border-t pt-3" style={{ borderColor: "var(--border-subtle)" }}>
          <Button size="sm" variant="outline" className="w-full justify-start gap-2 text-xs"
            onClick={selectFiltered} disabled={isExporting}>
            <CheckSquare className="h-3.5 w-3.5" />
            Selecionar filtrados ({filtered.length})
          </Button>
          <Button size="sm" variant="ghost" className="w-full justify-start gap-2 text-xs"
            onClick={selectNone} disabled={isExporting || selCount === 0}>
            <X className="h-3.5 w-3.5" />
            Limpar seleção
          </Button>
        </div>

        {/* Botão exportar */}
        <div className="mt-auto space-y-2">
          {isExporting && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
                <span>{queue.done} de {queue.total} exportados</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--bg-800)" }}>
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: "var(--ice-400)" }} />
              </div>
              {queue.current && (
                <p className="truncate text-[10px]" style={{ color: "var(--text-muted)" }}>
                  ↓ {queue.current}
                </p>
              )}
              {queue.errors.length > 0 && (
                <p className="text-[10px]" style={{ color: "#ef4444" }}>
                  {queue.errors.length} erro(s)
                </p>
              )}
            </div>
          )}

          <Button
            size="sm"
            className="w-full gap-2"
            disabled={isExporting || selCount === 0}
            onClick={startExport}
            style={{ background: selCount > 0 && !isExporting ? "var(--ice-400)" : undefined, color: selCount > 0 && !isExporting ? "#0A1628" : undefined }}
          >
            <Download className="h-3.5 w-3.5" />
            {isExporting ? "Exportando…" : `Exportar ${selCount} PDF${selCount !== 1 ? "s" : ""}`}
          </Button>
        </div>
      </aside>

      {/* ── COLUNA DIREITA: tabela com checkboxes ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-xs">
            <thead className="sticky top-0 z-10" style={{ background: "var(--bg-800)" }}>
              <tr>
                <th className="w-8 px-3 py-2"></th>
                <th className="px-3 py-2 text-left font-semibold" style={{ color: "var(--text-muted)" }}>Modelo</th>
                <th className="px-3 py-2 text-left font-semibold" style={{ color: "var(--text-muted)" }}>Linha</th>
                <th className="px-3 py-2 text-left font-semibold" style={{ color: "var(--text-muted)" }}>Fluido</th>
                <th className="px-3 py-2 text-right font-semibold" style={{ color: "var(--text-muted)" }}>Cap. (kcal/h)</th>
                <th className="px-3 py-2 text-right font-semibold" style={{ color: "var(--text-muted)" }}>COP</th>
                <th className="px-3 py-2 text-center font-semibold" style={{ color: "var(--text-muted)" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center" style={{ color: "var(--text-muted)" }}>
                    Nenhum modelo encontrado com os filtros aplicados.
                  </td>
                </tr>
              )}
              {filtered.map((row) => {
                const isSel = selected.has(row.id);
                const cap   = row.capacidadeFrigorificaKcalH ?? row.capacidadeCompressorKcalH;
                return (
                  <tr
                    key={row.id}
                    onClick={() => !isExporting && toggleSelect(row.id)}
                    className="cursor-pointer border-t transition-colors"
                    style={{
                      borderColor: "var(--border-subtle)",
                      background: isSel ? "rgba(56,189,248,0.07)" : "transparent",
                    }}
                  >
                    <td className="px-3 py-2 text-center">
                      {isSel
                        ? <CheckSquare className="h-3.5 w-3.5 mx-auto" style={{ color: "var(--ice-400)" }} />
                        : <Square className="h-3.5 w-3.5 mx-auto" style={{ color: "var(--text-muted)" }} />
                      }
                    </td>
                    <td className="px-3 py-2">
                      <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                        {row.modeloBaseReferencia ?? row.modelo}
                      </p>
                      <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{row.compressorModelo ?? "—"}</p>
                    </td>
                    <td className="max-w-[140px] truncate px-3 py-2" style={{ color: "var(--text-secondary)" }}>
                      {row.linha?.replace(/\[.*?\]/, "").trim() ?? "—"}
                    </td>
                    <td className="px-3 py-2" style={{ color: "var(--text-secondary)" }}>{row.refrigerante ?? "—"}</td>
                    <td className="px-3 py-2 text-right font-mono" style={{ color: "var(--text-primary)" }}>
                      {cap != null ? cap.toLocaleString("pt-BR", { maximumFractionDigits: 0 }) : "—"}
                    </td>
                    <td className="px-3 py-2 text-right font-mono" style={{ color: "var(--text-secondary)" }}>
                      {row.cop != null ? row.cop.toFixed(2) : "—"}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
                        style={{
                          background: row.statusCompressor === "VALIDO" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                          color: row.statusCompressor === "VALIDO" ? "#22c55e" : "#ef4444",
                        }}
                      >
                        {row.statusCompressor ?? "—"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
