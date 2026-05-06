/**
 * ExpansionValveForm — Formulário de cadastro de válvula de expansão
 *
 * Suporta seleção do catálogo Danfoss (expansionValves.json) além do preenchimento manual.
 */
import { useState, useMemo } from "react";
import { Search, X, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { TechnicalField } from "../ui/TechnicalField";
import { useComponentStore } from "../../stores/useComponentStore";
import type { ExpansionValveSpec } from "@/modules/coldpro_v2";
import { useExpansionValves } from "@/modules/coldpro_catalog/hooks/useExpansionValves";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onSaved: () => void;
}

const num = (v: string): number | undefined => {
  if (v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

export function ExpansionValveForm({ onSaved }: Props) {
  const { t } = useTranslation();
  const addExpansionValve = useComponentStore((s) => s.addExpansionValve);

  // Estado do formulário manual
  const [name, setName] = useState("");
  const [cap, setCap] = useState<number | undefined>();

  // Estado do catálogo Danfoss
  const { data: valves, loading: catalogLoading, total } = useExpansionValves();
  const [showCatalog, setShowCatalog] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCode, setSelectedCode] = useState<string | undefined>();

  // Filtrar catálogo
  const filtered = useMemo(() => {
    if (!search.trim()) return valves.slice(0, 30);
    const q = search.toLowerCase();
    return valves
      .filter(
        (v) =>
          v.code?.toLowerCase().includes(q) ||
          v.type?.toLowerCase().includes(q) ||
          v.orifice_size_mm?.toLowerCase().includes(q)
      )
      .slice(0, 30);
  }, [valves, search]);

  function handleSelectFromCatalog(code: string, type: string) {
    setSelectedCode(code);
    setName(`Danfoss ${type} (${code})`);
    setShowCatalog(false);
  }

  const canSave = name.trim().length > 0 && cap !== undefined && cap > 0;

  const handleSave = () => {
    if (!canSave) return;
    const spec: ExpansionValveSpec = { nominal_capacity_w: cap! };
    addExpansionValve(name.trim(), spec);
    onSaved();
  };

  return (
    <div className="space-y-5">
      {/* Seleção do catálogo Danfoss */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-slate-600">Catálogo Danfoss</span>
          <Badge variant="secondary" className="text-[10px]">{total} válvulas</Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-between text-xs"
          onClick={() => setShowCatalog(!showCatalog)}
          disabled={catalogLoading}
        >
          <span className="text-slate-500">
            {selectedCode ? `Selecionado: ${name}` : "Buscar no catálogo Danfoss..."}
          </span>
          {showCatalog ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </Button>

        {showCatalog && (
          <div className="mt-2 rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="relative border-b p-2">
              <Search className="absolute left-4 top-4 h-3.5 w-3.5 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Código, tipo, orifício..."
                className="h-7 pl-8 text-xs"
              />
              {search && (
                <button type="button" onClick={() => setSearch("")} className="absolute right-4 top-4 text-slate-400">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <div className="max-h-48 overflow-auto">
              {filtered.length === 0 ? (
                <p className="p-3 text-center text-xs text-slate-400">Nenhuma válvula encontrada</p>
              ) : (
                <table className="w-full text-xs">
                  <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500">
                    <tr>
                      <th className="px-3 py-1.5 text-left">Tipo</th>
                      <th className="px-3 py-1.5 text-left">Código</th>
                      <th className="px-3 py-1.5 text-center">Circuitos</th>
                      <th className="px-3 py-1.5 text-center">Orifício</th>
                      <th className="px-3 py-1.5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((v) => {
                      const isSel = v.code === selectedCode;
                      return (
                        <tr key={v.code} className={`border-t border-slate-100 hover:bg-blue-50/50 ${isSel ? "bg-blue-50" : ""}`}>
                          <td className="px-3 py-1.5 font-medium">{v.type}</td>
                          <td className="px-3 py-1.5 font-mono text-slate-600">{v.code}</td>
                          <td className="px-3 py-1.5 text-center">{v.circuits_min ?? "—"}–{v.circuits_max ?? "—"}</td>
                          <td className="px-3 py-1.5 text-center">{v.orifice_size_mm ?? v.orifice_size_in ?? "—"}</td>
                          <td className="px-3 py-1.5">
                            <Button
                              size="sm"
                              variant={isSel ? "default" : "outline"}
                              className={`h-5 px-2 text-[10px] ${isSel ? "bg-[#1E6FD9]" : ""}`}
                              onClick={() => handleSelectFromCatalog(v.code, v.type)}
                            >
                              {isSel ? <CheckCircle2 className="h-3 w-3" /> : "Usar"}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>

      <TechnicalField
        label="Nome / modelo"
        value={name}
        onChange={(v) => setName(v)}
        type="text"
        placeholder={t("components.placeholders.expansionValve")}
        required
      />
      <TechnicalField
        label="Capacidade nominal"
        value={cap ?? ""}
        onChange={(v) => setCap(num(v))}
        type="number"
        unit="W"
        required
      />
      <button
        type="button"
        onClick={handleSave}
        disabled={!canSave}
        className="w-full rounded-md bg-[#1E6FD9] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1558b0] disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Salvar Válvula de Expansão
      </button>
    </div>
  );
}
