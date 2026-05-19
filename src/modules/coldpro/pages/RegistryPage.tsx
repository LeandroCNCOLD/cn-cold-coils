import { useState } from "react";
import { Search, RefreshCw, BarChart2, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { useRegistry } from "../hooks/useRegistry";

export function RegistryPage() {
  const { records, search, stats } = useRegistry();
  const [query, setQuery] = useState("");

  const results = query.trim() ? search(query.trim()) : records;
  const s = stats();

  const familyCount = Object.keys(s.by_family ?? {}).length;
  const refrigerantCount = Object.keys(s.by_refrigerant ?? {}).length;

  return (
    <PageContainer title="Registro de Produtos" subtitle="Histórico de fichas técnicas calculadas na sessão">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        {[
          { label: "Total", value: s.total },
          { label: "Aprovados", value: s.approved, color: "var(--color-success)" },
          { label: "Atenção", value: s.warning, color: "var(--color-warning)" },
          { label: "Rejeitados", value: s.rejected, color: "var(--color-danger)" },
        ].map((kpi) => (
          <div key={kpi.label} className="cn-card p-4">
            <p className="text-xs cn-muted mb-1">{kpi.label}</p>
            <p className="text-2xl font-[family-name:var(--font-display)] font-bold"
               style={{ color: kpi.color ?? "var(--ice-400)" }}>
              {kpi.value ?? 0}
            </p>
          </div>
        ))}
      </div>

      {/* Famílias e refrigerantes */}
      {(familyCount > 0 || refrigerantCount > 0) && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="cn-card p-4">
            <p className="text-xs cn-muted mb-2">Por família</p>
            <div className="space-y-1">
              {Object.entries(s.by_family ?? {}).map(([fam, count]) => (
                <div key={fam} className="flex justify-between text-xs">
                  <span className="cn-secondary">{fam}</span>
                  <span className="cn-ice font-mono">{count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="cn-card p-4">
            <p className="text-xs cn-muted mb-2">Por refrigerante</p>
            <div className="space-y-1">
              {Object.entries(s.by_refrigerant ?? {}).map(([ref, count]) => (
                <div key={ref} className="flex justify-between text-xs">
                  <span className="cn-secondary">{ref}</span>
                  <span className="cn-ice font-mono">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 cn-muted" />
        <input
          type="text"
          placeholder="Buscar por modelo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-[--radius-md] border border-[--border-default] bg-[--bg-input] pl-9 pr-4 py-2 text-sm text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-[--border-strong]"
        />
      </div>

      {/* Records table */}
      {results.length === 0 ? (
        <div className="cn-card flex flex-col items-center justify-center py-16 text-center">
          <RefreshCw className="h-10 w-10 cn-muted mb-4" />
          <p className="text-sm cn-secondary">
            {records.length === 0
              ? "Nenhum produto calculado nesta sessão. Execute um cálculo em Ficha Técnica para registrar."
              : "Nenhum resultado para a busca."}
          </p>
        </div>
      ) : (
        <div className="cn-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[--border-subtle]">
                {["Status", "Modelo", "Família", "Linha", "Refrigerante", "Q nominal (W)", "COP"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold cn-muted uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => {
                const status = r.machine_validation?.overall_status ?? r.validation?.status;
                const cap = r.equilibrium?.nominal_capacity_w;
                const cop = r.equilibrium?.cop;
                return (
                  <tr
                    key={r.identity?.id ?? i}
                    className="border-b border-[--border-subtle] last:border-0 hover:bg-[--bg-600] transition-colors"
                  >
                    <td className="px-4 py-3">
                      {status === "approved" && <CheckCircle2 className="h-4 w-4" style={{ color: "var(--color-success)" }} />}
                      {status === "conditional" && <AlertCircle className="h-4 w-4" style={{ color: "var(--color-warning)" }} />}
                      {status === "rejected" && <XCircle className="h-4 w-4" style={{ color: "var(--color-danger)" }} />}
                      {!status && <span className="text-xs cn-muted">—</span>}
                    </td>
                    <td className="px-4 py-3 font-semibold text-[--text-primary]">{r.identity?.model ?? "—"}</td>
                    <td className="px-4 py-3 cn-secondary">{r.identity?.family ?? "—"}</td>
                    <td className="px-4 py-3 cn-secondary">{r.identity?.line ?? "—"}</td>
                    <td className="px-4 py-3 cn-secondary">{r.identity?.refrigerant ?? "—"}</td>
                    <td className="px-4 py-3 cn-ice font-mono text-xs">
                      {cap ? Math.round(cap).toLocaleString("pt-BR") : "—"}
                    </td>
                    <td className="px-4 py-3 cn-ice font-mono text-xs">
                      {cop ? cop.toFixed(2) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-3 text-xs cn-muted flex items-center gap-1">
        <BarChart2 className="h-3 w-3" />
        Registro em memória da sessão. Use Exportação para salvar em PDF.
      </p>
    </PageContainer>
  );
}
