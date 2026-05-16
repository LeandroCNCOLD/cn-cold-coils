import { useMemo, useState } from "react";
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
  const modifierClass =
    vs === "validated" ? "cn-badge--approved"
    : vs === "rejected" ? "cn-badge--rejected"
    : vs === "analyzed" ? "cn-badge--info"
    : "cn-badge--pending";
  return (
    <span className={`cn-badge text-[9px] ${modifierClass}`}>
      {vs}
    </span>
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
      <div className="border-b pb-3" style={{ borderColor: "var(--border-subtle)" }}>
        <h1 className="font-display text-lg font-bold tracking-wide" style={{ color: "var(--text-primary)" }}>Catálogo Comercial</h1>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          {filteredTotal.toLocaleString("pt-BR")} de {total.toLocaleString("pt-BR")} equipamentos · Exportação Excel disponível
        </p>
      </div>

      {/* Filters */}
      <div className="cn-card p-4">
        <p className="mb-3 flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
          <SlidersHorizontal className="h-4 w-4" style={{ color: "var(--text-muted)" }} />
          Filtros
        </p>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <div className="relative lg:col-span-2">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5" style={{ color: "var(--text-muted)" }} />
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
                className="absolute right-2.5 top-2.5 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div>
            <Label className="mb-1 block text-[10px]" style={{ color: "var(--text-muted)" }}>Família</Label>
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
              <Label className="mb-1 block text-[10px]" style={{ color: "var(--text-muted)" }}>Refrigerante</Label>
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
              <Label className="mb-1 block text-[10px]" style={{ color: "var(--text-muted)" }}>Aplicação</Label>
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
                className="h-8 w-full gap-2 text-xs cn-btn cn-btn--primary"
                disabled={displayed.length === 0}
              >
                <Download className="h-3.5 w-3.5" />
                Excel ({displayed.length})
              </Button>
            </div>
          </div>
      </div>

      {/* Table */}
      <div className="cn-table-wrap cn-card overflow-hidden">
        <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)" }}>
          <TableProperties className="h-4 w-4" style={{ color: "var(--ice-400)" }} />
          <span className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>
            {displayed.length.toLocaleString("pt-BR")} modelos
          </span>
        </div>
        <div className="max-h-[60vh] overflow-auto">
          <table className="cn-table w-full text-xs">
            <thead>
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
            <tbody>
              {displayed.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-3 py-8 text-center" style={{ color: "var(--text-muted)" }}>
                    Nenhum equipamento encontrado com os filtros selecionados.
                  </td>
                </tr>
              )}
              {displayed.map((row) => (
                <tr key={row.id}>
                  <td className="px-3 py-1.5">
                    <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                      {row.modeloBaseReferencia ?? row.modelo}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{row.compressorModelo ?? row.family}</p>
                  </td>
                  <td className="max-w-[160px] truncate px-3 py-1.5" style={{ color: "var(--text-secondary)" }}>
                    {row.linha?.replace(/\[.*?\]/, "").trim() ?? "—"}
                  </td>
                  <td className="px-3 py-1.5">
                    <span className="cn-badge text-[9px]">{row.application}</span>
                  </td>
                  <td className="px-3 py-1.5 font-mono" style={{ color: "var(--text-secondary)" }}>{row.refrigerante}</td>
                  <td className="px-3 py-1.5 text-right font-mono" style={{ color: "var(--text-primary)" }}>{fmtCap(row)}</td>
                  <td className="px-3 py-1.5 text-right font-mono" style={{ color: "var(--text-secondary)" }}>{fmtPow(row)}</td>
                  <td className="px-3 py-1.5 text-right font-mono" style={{ color: "var(--color-success)" }}>{fmtCOP(row)}</td>
                  <td className="px-3 py-1.5 text-right font-mono" style={{ color: "var(--text-muted)" }}>
                    {row.tempEvaporacaoC != null ? row.tempEvaporacaoC.toFixed(0) : "—"}
                    {" / "}
                    {row.tempCondensacaoC != null ? row.tempCondensacaoC.toFixed(0) : "—"}
                  </td>
                  <td className="px-3 py-1.5 text-right font-mono" style={{ color: "var(--text-muted)" }}>
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
      </div>
    </div>
  );
}
