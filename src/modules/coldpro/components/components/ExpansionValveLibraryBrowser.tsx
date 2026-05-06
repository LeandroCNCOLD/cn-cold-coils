/**
 * ExpansionValveLibraryBrowser — Browser do catálogo Danfoss de válvulas de expansão
 *
 * Exibe a lista completa de válvulas TEV/EEV do catálogo UNILAB Coils6
 * com filtros por tipo, refrigerante e número de circuitos.
 */
import { useMemo, useState } from "react";
import { Search, X, Thermometer, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useExpansionValves } from "@/modules/coldpro_catalog/hooks/useExpansionValves";
import { useComponentStore } from "../../stores/useComponentStore";
import type { ExpansionValveSpec } from "@/modules/coldpro_v2";

export function ExpansionValveLibraryBrowser() {
  const { data: valves, loading, error, total } = useExpansionValves();
  const addExpansionValve = useComponentStore((s) => s.addExpansionValve);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [circuitsFilter, setCircuitsFilter] = useState<string>("ALL");
  const [addedCodes, setAddedCodes] = useState<Set<string>>(new Set());

  // Tipos únicos disponíveis
  const types = useMemo(() => {
    const t = new Set(valves.map((v) => v.type).filter(Boolean));
    return ["ALL", ...Array.from(t).sort()];
  }, [valves]);

  // Faixas de circuitos disponíveis
  const circuitRanges = useMemo(() => {
    const ranges = new Set<string>();
    for (const v of valves) {
      if (v.circuits_min !== undefined && v.circuits_max !== undefined) {
        ranges.add(`${v.circuits_min}-${v.circuits_max}`);
      }
    }
    return ["ALL", ...Array.from(ranges).sort()];
  }, [valves]);

  // Filtrar
  const filtered = useMemo(() => {
    let result = valves;

    if (typeFilter !== "ALL") {
      result = result.filter((v) => v.type === typeFilter);
    }

    if (circuitsFilter !== "ALL") {
      const [min, max] = circuitsFilter.split("-").map(Number);
      result = result.filter(
        (v) => (v.circuits_min ?? 0) === min && (v.circuits_max ?? 99) === max
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.code?.toLowerCase().includes(q) ||
          v.type?.toLowerCase().includes(q) ||
          v.orifice_size_mm?.toLowerCase().includes(q) ||
          v.orifice_size_in?.toLowerCase().includes(q) ||
          v.connection_od?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [valves, typeFilter, circuitsFilter, search]);

  function handleAdd(code: string, type: string) {
    const spec: ExpansionValveSpec = { nominal_capacity_w: 0 };
    addExpansionValve(`Danfoss ${type} (${code})`, spec);
    setAddedCodes((prev) => new Set(prev).add(code));
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="ml-2 text-sm text-slate-500">Carregando catálogo Danfoss...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4 text-center text-sm text-orange-600">
          Erro ao carregar catálogo: {error}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium text-slate-700">Catálogo Danfoss TEV/EEV</span>
          <Badge variant="secondary" className="text-[10px]">{total} válvulas</Badge>
        </div>
        <Badge variant="outline" className="text-[10px] text-slate-500">
          {filtered.length} exibidas
        </Badge>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-3 gap-2">
        {/* Busca */}
        <div className="relative col-span-1">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Código, tipo, orifício..."
            className="h-8 pl-8 text-xs"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filtro por tipo */}
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            {types.map((t) => (
              <SelectItem key={t} value={t} className="text-xs">
                {t === "ALL" ? "Todos os tipos" : t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtro por circuitos */}
        <Select value={circuitsFilter} onValueChange={setCircuitsFilter}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue placeholder="Circuitos" />
          </SelectTrigger>
          <SelectContent>
            {circuitRanges.map((r) => (
              <SelectItem key={r} value={r} className="text-xs">
                {r === "ALL" ? "Todos os circuitos" : `${r} circuitos`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabela */}
      <div className="rounded-lg border border-slate-200 bg-white">
        <div className="max-h-96 overflow-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500">
              <tr>
                <th className="px-3 py-2 text-left">Tipo</th>
                <th className="px-3 py-2 text-left">Código</th>
                <th className="px-3 py-2 text-center">Circuitos</th>
                <th className="px-3 py-2 text-center">Orifício</th>
                <th className="px-3 py-2 text-center">Conexão</th>
                <th className="px-3 py-2 text-center">Refrigerantes</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-slate-400">
                    Nenhuma válvula encontrada com os filtros aplicados
                  </td>
                </tr>
              )}
              {filtered.map((v) => {
                const isAdded = addedCodes.has(v.code);
                const refrigerants = v.kappa_curves ? Object.keys(v.kappa_curves) : [];
                return (
                  <tr
                    key={v.code}
                    className="border-t border-slate-100 hover:bg-blue-50/40"
                  >
                    <td className="px-3 py-2 font-medium text-slate-800">{v.type}</td>
                    <td className="px-3 py-2 font-mono text-slate-600">{v.code}</td>
                    <td className="px-3 py-2 text-center text-slate-600">
                      {v.circuits_min !== undefined ? (
                        <span>
                          {v.circuits_min}–{v.circuits_max ?? "∞"}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-3 py-2 text-center text-slate-600">
                      {v.orifice_size_mm ?? v.orifice_size_in ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-center text-slate-600">
                      {v.connection_od ?? "—"}
                    </td>
                    <td className="px-3 py-2 text-center">
                      {refrigerants.length > 0 ? (
                        <div className="flex flex-wrap justify-center gap-0.5">
                          {refrigerants.slice(0, 3).map((r) => (
                            <Badge key={r} variant="outline" className="text-[9px] px-1 py-0">
                              {r}
                            </Badge>
                          ))}
                          {refrigerants.length > 3 && (
                            <Badge variant="outline" className="text-[9px] px-1 py-0">
                              +{refrigerants.length - 3}
                            </Badge>
                          )}
                        </div>
                      ) : "—"}
                    </td>
                    <td className="px-3 py-2">
                      <Button
                        size="sm"
                        variant={isAdded ? "default" : "outline"}
                        className={`h-6 px-2 text-[10px] ${
                          isAdded ? "bg-emerald-600 hover:bg-emerald-700" : "hover:border-blue-400 hover:text-blue-600"
                        }`}
                        onClick={() => handleAdd(v.code, v.type)}
                        disabled={isAdded}
                      >
                        {isAdded ? (
                          <><CheckCircle2 className="mr-1 h-3 w-3" />Adicionado</>
                        ) : (
                          "Adicionar"
                        )}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length > 0 && (
        <p className="text-center text-[10px] text-slate-400">
          Exibindo {filtered.length} de {total} válvulas do catálogo Danfoss
        </p>
      )}
    </div>
  );
}
