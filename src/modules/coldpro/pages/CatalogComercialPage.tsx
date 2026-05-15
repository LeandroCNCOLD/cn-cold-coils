import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Search, X, SlidersHorizontal, TableProperties } from "lucide-react";
import * as XLSX from "xlsx";
import { useEquipmentCatalog } from "@/modules/coldpro_catalog/hooks/useEquipmentCatalog";
import type { CatalogEquipmentRow } from "@/modules/coldpro_catalog/data/equipmentCatalog.types";
import { SendToHubButton } from "../components/SendToHubButton";

const KCALH_TO_W = 1.163;

function fmtCap(row: CatalogEquipmentRow): string {
  const k = row.capacidadeFrigorificaKcalH ?? row.capacidadeCompressorKcalH;
  if (k == null) return "—";
  const w = k * KCALH_TO_W;
  return w >= 1000 ? `${(w / 1000).toFixed(2)} kW` : `${w.toFixed(0)} W`;
}

function fmtPow(row: CatalogEquipmentRow): string {
  const kw = row.potenciaEletricaKw ?? row.potenciaCompressorKw;
  if (kw == null) return "—";
  return `${kw.toFixed(2)} kW`;
}

function fmtCOP(row: CatalogEquipmentRow): string {
  if (row.cop == null) return "—";
  return row.cop.toFixed(2);
}

function exportToExcel(rows: CatalogEquipmentRow[]) {
  const data = rows.map((r) => ({
    ID: r.id,
    Modelo: r.modeloBaseReferencia ?? r.modelo,
    Família: r.family,
    Linha: r.linha ?? "—",
    Aplicação: r.application,
    Refrigerante: r.refrigerante,
    "Cap. Frigorífica (kcal/h)": r.capacidadeFrigorificaKcalH ?? r.capacidadeCompressorKcalH ?? "",
    "Cap. Frigorífica (kW)": r.capacidadeFrigorificaKcalH
      ? ((r.capacidadeFrigorificaKcalH * KCALH_TO_W) / 1000).toFixed(3)
      : "",
    "Pot. Elétrica (kW)": r.potenciaEletricaKw ?? r.potenciaCompressorKw ?? "",
    "COP": r.cop ?? "",
    "Te (°C)": r.tempEvaporacaoC ?? "",
    "Tc (°C)": r.tempCondensacaoC ?? "",
    "T Ambiente (°C)": r.tempAmbienteC ?? "",
    "Tensão (V)": r.tensaoV ?? "",
    Fases: r.numeroFases ?? "",
    "Corrente (A)": r.correnteA ?? "",
    "Compressor": r.compressorModelo ?? "",
    Fabricante: r.fabricante ?? "",
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Catálogo CN COLD");
  XLSX.writeFile(wb, `catalogo_cn_cold_${Date.now()}.xlsx`);
}

function StatusBadge({ row }: { row: CatalogEquipmentRow }) {
  const vs = row.validationStatus ?? "pending";
  const cls =
    vs === "validated"
      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
      : vs === "analyzed"
      ? "border-blue-300 bg-blue-50 text-blue-700"
      : vs === "rejected"
      ? "border-red-300 bg-red-50 text-red-700"
      : "border-slate-300 bg-slate-50 text-slate-500";
  return (
    <Badge variant="outline" className={`text-[9px] ${cls}`}>
      {vs}
    </Badge>
  );
}

export function CatalogComercialPage() {
  const { rows, filter, setFilter, total, filteredTotal } = useEquipmentCatalog();
  const [search, setSearch] = useState("");

  const displayed = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter(
      (r) =>
        (r.modeloBaseReferencia ?? r.modelo)?.toLowerCase().includes(q) ||
        r.linha?.toLowerCase().includes(q) ||
        r.compressorModelo?.toLowerCase().includes(q),
    );
  }, [rows, search]);

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-4 p-5">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-lg font-bold text-slate-900">Catálogo Comercial</h1>
        <p className="text-xs text-slate-500">
          {filteredTotal.toLocaleString("pt-BR")} de {total.toLocaleString("pt-BR")} equipamentos · Exportação Excel disponível
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Modelo, linha, compressor..."
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

            <div>
              <Label className="mb-1 block text-[10px] text-slate-500">Família</Label>
              <Select
                value={filter.family ?? "all"}
                onValueChange={(v) => setFilter((f) => ({ ...f, family: v as typeof filter.family }))}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="condensing_unit">Unid. Condensadora</SelectItem>
                  <SelectItem value="compressor">Compressor</SelectItem>
                  <SelectItem value="condenser">Condensador</SelectItem>
                  <SelectItem value="evaporator">Evaporador</SelectItem>
                  <SelectItem value="split">Split</SelectItem>
                  <SelectItem value="plugin">Plugin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1 block text-[10px] text-slate-500">Refrigerante</Label>
              <Select
                value={filter.refrigerant ?? "all"}
                onValueChange={(v) =>
                  setFilter((f) => ({ ...f, refrigerant: v as typeof filter.refrigerant }))
                }
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="R404A">R404A</SelectItem>
                  <SelectItem value="R507A">R507A</SelectItem>
                  <SelectItem value="R134a">R134a</SelectItem>
                  <SelectItem value="R410A">R410A</SelectItem>
                  <SelectItem value="R22">R22</SelectItem>
                  <SelectItem value="R448A">R448A</SelectItem>
                  <SelectItem value="R449A">R449A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1 block text-[10px] text-slate-500">Aplicação</Label>
              <Select
                value={filter.application ?? "all"}
                onValueChange={(v) =>
                  setFilter((f) => ({ ...f, application: v as typeof filter.application }))
                }
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="LT">Baixa Temp (LT)</SelectItem>
                  <SelectItem value="MT">Média Temp (MT)</SelectItem>
                  <SelectItem value="HT">Alta Temp (HT)</SelectItem>
                  <SelectItem value="AGRO">AGRO</SelectItem>
                  <SelectItem value="cooling">Resfriamento</SelectItem>
                  <SelectItem value="freezing">Congelamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={() => exportToExcel(displayed)}
                className="h-8 w-full gap-2 bg-emerald-600 text-xs hover:bg-emerald-700"
                disabled={displayed.length === 0}
              >
                <Download className="h-3.5 w-3.5" />
                Excel ({displayed.length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <TableProperties className="h-4 w-4 text-blue-500" />
            {displayed.length.toLocaleString("pt-BR")} modelos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[60vh] overflow-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 z-10 bg-slate-100 text-[10px] uppercase text-slate-500">
                <tr>
                  <th className="px-3 py-2 text-left">Modelo</th>
                  <th className="px-3 py-2 text-left">Linha</th>
                  <th className="px-3 py-2 text-left">Aplic.</th>
                  <th className="px-3 py-2 text-left">Fluido</th>
                  <th className="px-3 py-2 text-right">Cap. Frig.</th>
                  <th className="px-3 py-2 text-right">Pot. Elét.</th>
                  <th className="px-3 py-2 text-right">COP</th>
                  <th className="px-3 py-2 text-right">Te / Tc (°C)</th>
                  <th className="px-3 py-2 text-right">Tensão</th>
                  <th className="px-3 py-2 text-center">Status</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayed.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-3 py-8 text-center text-slate-400">
                      Nenhum equipamento encontrado com os filtros selecionados.
                    </td>
                  </tr>
                )}
                {displayed.map((row) => (
                  <tr key={row.id} className="hover:bg-blue-50/40">
                    <td className="px-3 py-1.5">
                      <p className="font-medium text-slate-800">
                        {row.modeloBaseReferencia ?? row.modelo}
                      </p>
                      <p className="text-[10px] text-slate-400">{row.compressorModelo ?? row.family}</p>
                    </td>
                    <td className="px-3 py-1.5 max-w-[160px] truncate text-slate-600">
                      {row.linha?.replace(/\[.*?\]/, "").trim() ?? "—"}
                    </td>
                    <td className="px-3 py-1.5">
                      <Badge variant="outline" className="text-[9px]">
                        {row.application}
                      </Badge>
                    </td>
                    <td className="px-3 py-1.5 font-mono text-slate-600">{row.refrigerante}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-800">{fmtCap(row)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-600">{fmtPow(row)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-green-700">{fmtCOP(row)}</td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-500">
                      {row.tempEvaporacaoC != null ? row.tempEvaporacaoC.toFixed(0) : "—"}
                      {" / "}
                      {row.tempCondensacaoC != null ? row.tempCondensacaoC.toFixed(0) : "—"}
                    </td>
                    <td className="px-3 py-1.5 text-right font-mono text-slate-500">
                      {row.tensaoV != null ? `${row.tensaoV} V / ${row.numeroFases ?? "?"}φ` : "—"}
                    </td>
                    <td className="px-3 py-1.5 text-center">
                      <StatusBadge row={row} />
                    </td>
                    <td className="px-3 py-1.5">
                      <SendToHubButton machine={row} size="sm" className="h-6 px-2 text-[10px]" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
