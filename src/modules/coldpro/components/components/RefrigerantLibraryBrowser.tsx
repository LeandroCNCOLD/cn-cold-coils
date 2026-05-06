import { useMemo, useState } from "react";
import { Search, AlertCircle, Loader2, Droplet, ChevronRight, CheckCircle2, CloudDownload, HardDrive } from "lucide-react";
import {
  useRefrigerantLibrary,
  useRefrigerantDetail,
  type RefrigerantIndexEntry,
} from "../../hooks/useRefrigerantLibrary";

type FluidType = "ALL" | "PURE" | "MIX";

export function RefrigerantLibraryBrowser() {
  const { loading, error, index, source } = useRefrigerantLibrary();
  const [search, setSearch] = useState("");
  const [type, setType] = useState<FluidType>("ALL");
  const [onlyCN, setOnlyCN] = useState(true);
  const [selected, setSelected] = useState<RefrigerantIndexEntry | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return index.filter((r) => {
      if (onlyCN && !r.cncoils) return false;
      if (type === "PURE" && r.isMixture) return false;
      if (type === "MIX" && !r.isMixture) return false;
      if (!q) return true;
      return (
        (r.name ?? "").toLowerCase().includes(q) ||
        (r.shortName ?? "").toLowerCase().includes(q) ||
        (r.commercialName ?? "").toLowerCase().includes(q) ||
        (r.synonym ?? "").toLowerCase().includes(q) ||
        (r.cas ?? "").toLowerCase().includes(q) ||
        (r.chemicalFormula ?? "").toLowerCase().includes(q)
      );
    });
  }, [index, search, type, onlyCN]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white p-8 text-sm text-slate-500">
        <Loader2 className="h-4 w-4 animate-spin" />
        Carregando catálogo de refrigerantes…
      </div>
    );
  }

  if (error && index.length === 0) {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p className="font-medium">Não foi possível carregar o catálogo de refrigerantes.</p>
          <p className="mt-1 text-xs">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <header className="flex flex-col gap-3 border-b border-slate-200 p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Droplet className="h-4 w-4 text-[#1E6FD9]" />
              Catálogo de fluidos refrigerantes · {index.length} fluidos
            </h3>
            <p className="text-xs text-slate-500">
              {filtered.length} resultado{filtered.length === 1 ? "" : "s"} ·
              {" "}puros, misturas e blends. Detalhes termodinâmicos carregados sob demanda.
            </p>
          </div>
          <SourceBadge source={source} />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome, CAS, fórmula, sinônimo (ex.: R134a, 75-37-6, CF3CH2F)…"
              className="w-full rounded-md border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs outline-none focus:border-[#1E6FD9] focus:bg-white"
            />
          </div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as FluidType)}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs outline-none focus:border-[#1E6FD9] focus:bg-white"
          >
            <option value="ALL">Todos os tipos</option>
            <option value="PURE">Apenas puros</option>
            <option value="MIX">Apenas misturas</option>
          </select>
          <label className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-700">
            <input
              type="checkbox"
              checked={onlyCN}
              onChange={(e) => setOnlyCN(e.target.checked)}
              className="h-3.5 w-3.5"
            />
            Habilitados em CN Coils
          </label>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
        <div className="max-h-[520px] overflow-y-auto border-b border-slate-200 md:border-b-0 md:border-r">
          {filtered.length === 0 && (
            <p className="px-3 py-4 text-xs text-slate-400">
              Nenhum refrigerante encontrado com esses filtros.
            </p>
          )}
          {filtered.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setSelected(r)}
              className={`flex w-full items-center justify-between gap-2 border-b border-slate-100 px-3 py-2 text-left text-xs transition-colors ${
                selected?.id === r.id
                  ? "bg-[#1E6FD9]/10 text-[#1E6FD9]"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {r.shortName || r.name}
                  {r.isMixture && (
                    <span className="ml-1.5 rounded bg-purple-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-purple-700">
                      mix
                    </span>
                  )}
                </p>
                <p className="truncate text-[10px] text-slate-500">
                  {r.commercialName || r.chemicalName || r.synonym || r.cas || "—"}
                </p>
              </div>
              <ChevronRight className="h-3 w-3 shrink-0 text-slate-400" />
            </button>
          ))}
        </div>

        <div className="max-h-[520px] overflow-y-auto p-4">
          {selected ? (
            <RefrigerantDetailView item={selected} />
          ) : (
            <p className="flex h-full items-center justify-center text-xs text-slate-400">
              Selecione um fluido para ver os dados termodinâmicos completos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function SourceBadge({ source }: { source: "memory" | "storage" | "network" | null }) {
  if (!source) return null;
  const map = {
    memory: { label: "memória (instantâneo)", icon: <CheckCircle2 className="h-3 w-3" />, color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    storage: { label: "cache local", icon: <HardDrive className="h-3 w-3" />, color: "text-sky-700 bg-sky-50 border-sky-200" },
    network: { label: "atualizado", icon: <CloudDownload className="h-3 w-3" />, color: "text-slate-700 bg-slate-50 border-slate-200" },
  } as const;
  const m = map[source];
  return (
    <span className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] ${m.color}`}>
      {m.icon}
      {m.label}
    </span>
  );
}

function RefrigerantDetailView({ item }: { item: RefrigerantIndexEntry }) {
  const { loading, error, detail } = useRefrigerantDetail(
    item.isMixture ? null : item.shortName || item.name,
  );

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-base font-semibold text-slate-900">
          {item.shortName || item.name}
        </h4>
        <p className="text-xs text-slate-500">
          {item.commercialName || item.chemicalName || "—"}
        </p>
      </div>

      <Section title="Identificação">
        <Row label="Nome completo" value={item.name} />
        <Row label="Sinônimos" value={item.synonym ?? "—"} />
        <Row label="CAS" value={item.cas ?? "—"} mono />
        <Row label="Fórmula química" value={item.chemicalFormula ?? "—"} mono />
        <Row label="Tipo" value={item.isMixture ? "Mistura / blend" : "Puro"} />
        <Row label="Arquivo REFPROP" value={item.fileName ?? "—"} mono />
      </Section>

      <Section title="Limites operacionais">
        <Row
          label="Temperatura máxima"
          value={item.maxTempC && item.maxTempC > 0 ? `${item.maxTempC.toFixed(1)} °C` : "—"}
        />
        <Row
          label="Pressão máxima"
          value={
            item.maxPressKPa && item.maxPressKPa > 0
              ? `${item.maxPressKPa.toLocaleString()} kPa`
              : "—"
          }
        />
        <Row
          label="Habilitado em CN Coils"
          value={item.cncoils ? "Sim" : "Não"}
        />
      </Section>

      {item.isMixture ? (
        <p className="rounded-md bg-slate-50 px-3 py-2 text-[11px] text-slate-500">
          Misturas zeotrópicas/azeotrópicas — propriedades termodinâmicas detalhadas
          são computadas dinamicamente pelo motor REFPROP no momento da simulação.
        </p>
      ) : loading ? (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Buscando propriedades…
        </div>
      ) : error ? (
        <p className="text-xs text-amber-700">Erro ao carregar detalhes: {error}</p>
      ) : detail ? (
        <Section title="Propriedades adicionais">
          <Row label="ID interno" value={String(detail.id)} mono />
          <Row label="Aplicações conhecidas" value={String(detail.n_applications ?? 0)} />
          <Row label="Cálculo rápido" value={detail.fast_calc ? "Disponível" : "Não"} />
          <Row
            label="Velocidade máx. recomendada"
            value={detail.max_velocity_ms ? `${detail.max_velocity_ms} m/s` : "—"}
          />
        </Section>
      ) : (
        <p className="text-xs text-slate-400">Sem dados adicionais para este fluido.</p>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-2 text-xs">
      <span className="text-slate-500">{label}</span>
      <span className={`text-right font-medium text-slate-900 ${mono ? "font-mono text-[11px]" : ""}`}>
        {value}
      </span>
    </div>
  );
}
