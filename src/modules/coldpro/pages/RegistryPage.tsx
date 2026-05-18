import { useState } from "react";
import { BookOpen, Search, BarChart2, RefreshCw } from "lucide-react";
import { PageContainer } from "../components/layout/PageContainer";
import { useRegistry } from "../hooks/useRegistry";

export function RegistryPage() {
  const { records, search, stats } = useRegistry();
  const [query, setQuery] = useState("");

  const results = query.trim() ? search(query.trim()) : records;
  const s = stats();

  return (
    <PageContainer title="Registro de Produtos" subtitle="Histórico de fichas técnicas calculadas na sessão">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
        {[
          { label: "Total", value: s.total },
          { label: "Famílias", value: s.families },
          { label: "Refrigerantes", value: s.refrigerants },
          { label: "Q médio (W)", value: s.avg_capacity_w ? Math.round(s.avg_capacity_w).toLocaleString("pt-BR") : "—" },
        ].map((kpi) => (
          <div key={kpi.label} className="cn-card p-4">
            <p className="text-xs cn-muted mb-1">{kpi.label}</p>
            <p className="text-2xl font-[family-name:var(--font-display)] font-bold cn-ice">{kpi.value ?? "—"}</p>
          </div>
        ))}
      </div>

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
              ? "Nenhum produto calculado nesta sessão. Execute um cálculo na tela Ficha Técnica para registrar."
              : "Nenhum resultado para a busca."}
          </p>
        </div>
      ) : (
        <div className="cn-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[--border-subtle]">
                {["Modelo", "Família", "Linha", "Refrigerante", "Q (W)", "COP"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold cn-muted uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr
                  key={r.identity?.id ?? i}
                  className="border-b border-[--border-subtle] last:border-0 hover:bg-[--bg-600] transition-colors"
                >
                  <td className="px-4 py-3 font-semibold text-[--text-primary]">{r.identity?.model ?? "—"}</td>
                  <td className="px-4 py-3 cn-secondary">{r.identity?.family ?? "—"}</td>
                  <td className="px-4 py-3 cn-secondary">{r.identity?.line ?? "—"}</td>
                  <td className="px-4 py-3 cn-secondary">{r.identity?.refrigerant ?? "—"}</td>
                  <td className="px-4 py-3 cn-ice font-mono text-xs">
                    {r.results?.nominal_capacity_w ? Math.round(r.results.nominal_capacity_w).toLocaleString("pt-BR") : "—"}
                  </td>
                  <td className="px-4 py-3 cn-ice font-mono text-xs">
                    {r.results?.cop ? r.results.cop.toFixed(2) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-3 text-xs cn-muted flex items-center gap-1">
        <BarChart2 className="h-3 w-3" />
        O registro é mantido em memória durante a sessão. Use a tela de Exportação para salvar em PDF.
      </p>
    </PageContainer>
  );
}
