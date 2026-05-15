/**
 * ExportPage — Sprint 4
 *
 * Exporta o data sheet completo de uma máquina do catálogo CN COLD,
 * incluindo identificação, análise elétrica, curva de performance,
 * coeficientes polinomiais e referências de start-up.
 *
 * Motor: exportMachineDatasheet (coldpro_v2).
 */
import { useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Search,
  X,
  Package,
  CheckCircle2,
  AlertCircle,
  Download,
  FileJson,
  Zap,
  ClipboardCheck,
  Activity,
  BarChart2,
  FileText,
  ImageIcon,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  buildProductTechnicalRecord,
  exportMachineDatasheet,
  type CompressorSpec,
  type CondenserSpec,
  type ProductIdentity,
  type SystemComponentsInput,
  type CatalogExportOptions,
  type MachineDatasheetExport,
} from "@/modules/coldpro_v2";

import { getEquipmentCatalog } from "@/modules/coldpro_catalog/data/equipmentCatalog.index";
import type { CatalogEquipmentRow } from "@/modules/coldpro_catalog/data/equipmentCatalog.types";
import { catalogToCompressorSpec } from "@/modules/coldpro_catalog/adapters/compressorAdapter";
import { catalogToCondenserSpec } from "@/modules/coldpro_catalog/adapters/condenserAdapter";
import { buildMinimalEvaporatorInput } from "../components/forms/EvaporatorForm";
import { SendToHubButton } from "../components/SendToHubButton";

const KCALH_TO_W = 1.163;

function downloadJson(filename: string, payload: unknown) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

interface LogoConfig {
  companyName: string;
  logoDataUrl?: string;
}

function downloadDatasheetPdf(sheet: MachineDatasheetExport, logo: LogoConfig) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const margin = 14;
  const pageW = doc.internal.pageSize.getWidth();
  let y = margin;

  // Header band
  doc.setFillColor(30, 111, 217);
  doc.rect(0, 0, pageW, 26, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);

  if (logo.logoDataUrl) {
    try {
      doc.addImage(logo.logoDataUrl, "PNG", margin, 4, 24, 14);
      doc.text("Data Sheet Técnico", margin + 28, 10);
    } catch {
      doc.text(`${logo.companyName} — Data Sheet Técnico`, margin, 10);
    }
  } else {
    doc.text(`${logo.companyName} — Data Sheet Técnico`, margin, 10);
  }

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    `${sheet.product.model}  ·  ${sheet.product.refrigerant}  ·  ${sheet.schema_version}`,
    margin,
    18,
  );
  doc.setTextColor(0, 0, 0);
  y = 32;

  // Selection table — key specs at a glance
  const selectionBody: (string | number)[][] = [
    ["Modelo", sheet.product.model],
    ["Família / Linha", `${sheet.product.family} / ${sheet.product.line}`],
    ["Refrigerante", sheet.product.refrigerant],
    ["Status", sheet.validation_status.toUpperCase()],
  ];
  if (sheet.electrical) {
    selectionBody.push(
      ["Capacidade frigorífica", `${sheet.electrical.total_power_w > 0 ? "—" : "—"} (ver curva)`],
      ["Potência total", `${sheet.electrical.total_power_w.toFixed(0)} W`],
      ["Corrente total", `${sheet.electrical.estimated_current_a.toFixed(2)} A`],
      ["Tensão / Fases", `${sheet.electrical.voltage_v} V / ${sheet.electrical.phases}φ`],
      ["COP sistema", sheet.electrical.cop_system.toFixed(3)],
      ["EER", `${sheet.electrical.eer_btu_wh.toFixed(2)} BTU/W·h`],
    );
  }
  if (sheet.operating_limits) {
    const lim = sheet.operating_limits;
    selectionBody.push(
      ["Te operação (mín/máx)", `${lim.min_evap_temp_c.toFixed(1)} / ${lim.max_evap_temp_c.toFixed(1)} °C`],
      ["Tc operação (mín/máx)", `${lim.min_cond_temp_c.toFixed(1)} / ${lim.max_cond_temp_c.toFixed(1)} °C`],
    );
  }
  autoTable(doc, {
    startY: y,
    head: [["Tabela de Seleção Rápida", ""]],
    body: selectionBody,
    styles: { fontSize: 8, cellPadding: 1.5 },
    headStyles: { fillColor: [15, 80, 160], textColor: 255, fontStyle: "bold" },
    columnStyles: { 0: { fontStyle: "bold", cellWidth: 60 } },
    margin: { left: margin, right: margin },
    theme: "grid",
  });
  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 5;

  // Gerado em
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  doc.text(
    `Gerado em: ${new Date(sheet.exported_at).toLocaleString("pt-BR")}   |   Status: ${sheet.validation_status.toUpperCase()}`,
    margin,
    y,
  );
  doc.setTextColor(0, 0, 0);
  y += 6;

  // Identidade
  autoTable(doc, {
    startY: y,
    head: [["Identificação", ""]],
    body: [
      ["ID", sheet.product.id],
      ["Modelo", sheet.product.model],
      ["Família", sheet.product.family],
      ["Linha", sheet.product.line],
      ["Refrigerante", sheet.product.refrigerant],
      ...(sheet.product.application ? [["Aplicação", sheet.product.application]] : []),
    ],
    styles: { fontSize: 8, cellPadding: 1.5 },
    headStyles: { fillColor: [30, 111, 217], textColor: 255 },
    margin: { left: margin, right: margin },
    theme: "grid",
  });
  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 5;

  // Elétrica
  if (sheet.electrical) {
    const e = sheet.electrical;
    autoTable(doc, {
      startY: y,
      head: [["Análise Elétrica", ""]],
      body: [
        ["Potência total", `${e.total_power_w.toFixed(0)} W`],
        ["Compressor", `${e.compressor_power_w.toFixed(0)} W`],
        ["Ventiladores", `${e.fans_total_power_w.toFixed(0)} W`],
        ["Corrente total", `${e.estimated_current_a.toFixed(2)} A`],
        ["Tensão / Fases", `${e.voltage_v} V / ${e.phases}∅`],
        ["Fator de potência", e.power_factor.toFixed(2)],
        ["COP sistema", e.cop_system.toFixed(2)],
        ["EER", `${e.eer_btu_wh.toFixed(2)} BTU/W·h`],
      ],
      styles: { fontSize: 8, cellPadding: 1.5 },
      headStyles: { fillColor: [245, 158, 11], textColor: 255 },
      margin: { left: margin, right: margin },
      theme: "grid",
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 5;
  }

  // Performance
  if (sheet.performance_curve && sheet.performance_curve.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [["Te (°C)", "Tc (°C)", "Cap (W)", "W comp", "W tot", "COP c", "COP s", "Q cond", "Status"]],
      body: sheet.performance_curve.map((p) => [
        p.evap_temp_c.toFixed(1),
        p.cond_temp_c.toFixed(1),
        p.capacity_w.toFixed(0),
        p.compressor_power_w.toFixed(0),
        p.total_power_w.toFixed(0),
        p.cop_compressor.toFixed(2),
        p.cop_system.toFixed(2),
        p.q_cond_w.toFixed(0),
        p.status,
      ]),
      styles: { fontSize: 7, cellPadding: 1 },
      headStyles: { fillColor: [59, 130, 246], textColor: 255 },
      margin: { left: margin, right: margin },
      theme: "striped",
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 5;
  }

  // Polinômios
  if (sheet.polynomial_sets && sheet.polynomial_sets.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [["Alvo", "Unidade", "R²", "Pontos", "Qualidade"]],
      body: sheet.polynomial_sets.map((p) => [
        p.target_label,
        p.unit,
        p.r_squared.toFixed(4),
        String(p.used_points),
        p.fit_quality,
      ]),
      styles: { fontSize: 8, cellPadding: 1.5 },
      headStyles: { fillColor: [139, 92, 246], textColor: 255 },
      margin: { left: margin, right: margin },
      theme: "grid",
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 5;
  }

  // Start-up
  if (sheet.startup_reference) {
    const rows: (string | number)[][] = [];
    sheet.startup_reference.groups.forEach((g) => {
      g.parameters.forEach((p) => {
        rows.push([g.group_label, p.label, `${p.reference_value.toFixed(2)} ${p.unit}`]);
      });
    });
    autoTable(doc, {
      startY: y,
      head: [["Grupo", "Parâmetro", "Referência"]],
      body: rows,
      styles: { fontSize: 8, cellPadding: 1.5 },
      headStyles: { fillColor: [16, 185, 129], textColor: 255 },
      margin: { left: margin, right: margin },
      theme: "grid",
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 5;
    doc.setFontSize(8);
    doc.text(
      `Carga estimada: ${sheet.startup_reference.estimated_charge_kg.toFixed(2)} kg ± ${sheet.startup_reference.charge_tolerance_kg.toFixed(2)} kg`,
      margin,
      y,
    );
    y += 6;
  }

  // Avisos
  if (sheet.warnings.length > 0) {
    if (y > 250) {
      doc.addPage();
      y = margin;
    }
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Avisos:", margin, y);
    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    sheet.warnings.forEach((w) => {
      const lines = doc.splitTextToSize(`• ${w}`, pageW - margin * 2);
      doc.text(lines, margin, y);
      y += lines.length * 4;
    });
  }

  // Footer em todas as páginas
  const pageCount = (doc as unknown as { internal: { getNumberOfPages: () => number } }).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `CN COLD Engenharia · Data Sheet ${sheet.schema_version} · Página ${i}/${pageCount}`,
      margin,
      doc.internal.pageSize.getHeight() - 6,
    );
  }

  doc.save(`datasheet_${sheet.product.model.replace(/\s+/g, "_")}_${Date.now()}.pdf`);
}


// ── Picker ───────────────────────────────────────────────────────────────────
function MachinePicker({
  selectedId,
  onSelect,
}: {
  selectedId?: string;
  onSelect: (row: CatalogEquipmentRow) => void;
}) {
  const [search, setSearch] = useState("");
  const catalog = useMemo(() => getEquipmentCatalog(), []);
  const filtered = useMemo(() => {
    if (!search.trim()) return catalog.slice(0, 50);
    const q = search.toLowerCase();
    return catalog
      .filter(
        (r) =>
          r.modelo?.toLowerCase().includes(q) ||
          r.modeloBaseReferencia?.toLowerCase().includes(q) ||
          r.compressorModelo?.toLowerCase().includes(q) ||
          r.refrigerante?.toLowerCase().includes(q) ||
          r.linha?.toLowerCase().includes(q),
      )
      .slice(0, 50);
  }, [catalog, search]);

  return (
    <Card className="border-[#1E6FD9]/30 bg-blue-50/40">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-[#1E6FD9]" />
          <CardTitle className="text-sm text-[#1E6FD9]">
            Selecionar Máquina do Catálogo
          </CardTitle>
          <Badge variant="secondary" className="text-[10px]">
            {catalog.length} equipamentos
          </Badge>
        </div>
        <CardDescription className="text-xs">
          O preview do data sheet será gerado automaticamente após a seleção.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por modelo, compressor, refrigerante..."
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
        <div className="max-h-64 overflow-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500">
              <tr>
                <th className="px-3 py-2 text-left">Modelo</th>
                <th className="px-3 py-2 text-left">Linha</th>
                <th className="px-3 py-2 text-left">Fluido</th>
                <th className="px-3 py-2 text-right">Cap. kcal/h</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-4 text-center text-slate-400">
                    Nenhum equipamento encontrado
                  </td>
                </tr>
              )}
              {filtered.map((row) => {
                const isSelected = row.id === selectedId;
                const cap = row.capacidadeFrigorificaKcalH ?? row.capacidadeCompressorKcalH;
                return (
                  <tr key={row.id} className={`border-t border-slate-100 hover:bg-blue-50/60 ${isSelected ? "bg-blue-50" : ""}`}>
                    <td className="px-3 py-1.5">
                      <p className="font-medium text-slate-800">{row.modeloBaseReferencia ?? row.modelo}</p>
                      <p className="text-[10px] text-slate-400">{row.compressorModelo ?? "—"}</p>
                    </td>
                    <td className="px-3 py-1.5">
                      <span className="block max-w-[140px] truncate text-slate-600">
                        {row.linha?.replace(/\[.*?\]/, "").trim() ?? "—"}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 text-slate-600">{row.refrigerante ?? "—"}</td>
                    <td className="px-3 py-1.5 text-right text-slate-700">
                      {cap != null ? cap.toLocaleString("pt-BR", { maximumFractionDigits: 0 }) : "—"}
                    </td>
                    <td className="px-3 py-1.5">
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant={isSelected ? "default" : "outline"}
                          className={`h-6 px-2 text-[10px] ${isSelected ? "bg-[#1E6FD9] hover:bg-[#1a5fb8]" : "hover:border-[#1E6FD9] hover:text-[#1E6FD9]"}`}
                          onClick={() => onSelect(row)}
                        >
                          {isSelected ? (
                            <><CheckCircle2 className="mr-1 h-3 w-3" />Selecionada</>
                          ) : (
                            "Selecionar"
                          )}
                        </Button>
                        <SendToHubButton machine={row} size="sm" className="h-6 px-1.5 text-[10px]" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export function ExportPage() {
  const [machine, setMachine] = useState<CatalogEquipmentRow | null>(null);
  const [logoConfig, setLogoConfig] = useState<LogoConfig>({ companyName: "CN COLD Engenharia" });
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [opts, setOpts] = useState<Required<Omit<CatalogExportOptions, "schema_version">>>({
    include_electrical: true,
    include_startup_reference: true,
    include_validation: true,
    include_performance_curve: true,
  });

  const datasheet = useMemo<
    | { ok: true; sheet: MachineDatasheetExport }
    | { ok: false; reason: string }
    | null
  >(() => {
    if (!machine) return null;
    try {
      const compressor: Partial<CompressorSpec> = catalogToCompressorSpec(machine);
      if (
        !compressor.cooling_capacity_w ||
        !compressor.power_w ||
        compressor.evap_temp_c == null ||
        compressor.cond_temp_c == null ||
        !compressor.refrigerant
      ) {
        return { ok: false, reason: "Dados de compressor incompletos no catálogo." };
      }
      let condenser: Partial<CondenserSpec>;
      try {
        condenser = catalogToCondenserSpec(machine);
      } catch {
        condenser = {
          heat_rejection_capacity_w: (machine.calorRejeitadoKcalH ?? 0) * KCALH_TO_W,
          max_cond_temp_c: compressor.cond_temp_c,
        };
      }
      if (!condenser.heat_rejection_capacity_w) {
        return { ok: false, reason: "Capacidade de rejeição do condensador ausente." };
      }

      const ambient = machine.tempAmbienteC ?? machine.tempCamaraC ?? compressor.cond_temp_c - 10;
      const conds = {
        ambient_temp_c: ambient,
        required_airflow_m3_h: machine.vazaoArEvaporadorM3H ?? 0,
      };

      const identity: ProductIdentity = {
        id: machine.id,
        model: machine.modeloBaseReferencia ?? machine.modelo ?? "—",
        family: machine.family ?? "—",
        line: machine.linha ?? "—",
        refrigerant: compressor.refrigerant,
      };

      const system: SystemComponentsInput = {
        compressor: compressor as CompressorSpec,
        evaporator: { progressive_input: buildMinimalEvaporatorInput(compressor, conds) },
        condenser: {
          ...(condenser as CondenserSpec),
          max_cond_temp_c: condenser.max_cond_temp_c ?? compressor.cond_temp_c,
        } as CondenserSpec,
        system_conditions: conds,
      };

      // Curva de performance: malha 5×5 ao redor do ponto nominal
      const Te = compressor.evap_temp_c;
      const Tc = compressor.cond_temp_c;
      const evapPts = [Te - 10, Te - 5, Te, Te + 5, Te + 10];
      const condPts = [Tc - 10, Tc - 5, Tc, Tc + 5, Tc + 10];
      const operating_points = evapPts.flatMap((te) =>
        condPts.map((tc) => ({ evap_temp_c: te, cond_temp_c: tc })),
      );

      const record = buildProductTechnicalRecord({
        identity,
        system,
        operating_points,
      });
      const sheet = exportMachineDatasheet({ record, options: opts });
      return { ok: true, sheet };
    } catch (e) {
      return { ok: false, reason: String(e) };
    }
  }, [machine, opts]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 p-5">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-lg font-bold text-slate-900">Exportação de Data Sheet</h1>
        <p className="text-xs text-slate-500">
          Gera o data sheet completo em formato JSON padronizado para integração com ferramentas de carga térmica e selectores de terceiros.
        </p>
      </div>

      <MachinePicker selectedId={machine?.id} onSelect={setMachine} />

      {/* Logo/empresa */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <ImageIcon className="h-4 w-4 text-slate-500" />
            Identidade Visual (PDF)
          </CardTitle>
          <CardDescription className="text-xs">
            Personalize o cabeçalho do Data Sheet PDF com o nome da empresa e logotipo.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label className="mb-1 block text-xs text-slate-600">Nome da empresa</Label>
            <Input
              value={logoConfig.companyName}
              onChange={(e) => setLogoConfig((c) => ({ ...c, companyName: e.target.value }))}
              className="h-8 text-xs"
              placeholder="CN COLD Engenharia"
            />
          </div>
          <div>
            <Label className="mb-1 block text-xs text-slate-600">Logo (PNG/JPG)</Label>
            <div className="flex items-center gap-2">
              <input
                ref={logoInputRef}
                type="file"
                accept="image/png,image/jpeg"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    setLogoConfig((c) => ({ ...c, logoDataUrl: ev.target?.result as string }));
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <Button
                type="button"
                variant="outline"
                className="h-8 gap-2 text-xs"
                onClick={() => logoInputRef.current?.click()}
              >
                <Download className="h-3.5 w-3.5" />
                {logoConfig.logoDataUrl ? "Trocar logo" : "Carregar logo"}
              </Button>
              {logoConfig.logoDataUrl && (
                <>
                  <img src={logoConfig.logoDataUrl} alt="logo" className="h-8 rounded border" />
                  <button
                    type="button"
                    className="text-slate-400 hover:text-slate-600"
                    onClick={() => setLogoConfig((c) => ({ ...c, logoDataUrl: undefined }))}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opções */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Opções de Exportação</CardTitle>
          <CardDescription className="text-xs">
            Selecione quais seções incluir no data sheet exportado.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              ["include_electrical", "Análise elétrica", Zap],
              ["include_performance_curve", "Curva de performance", Activity],
              ["include_validation", "Relatório de validação", BarChart2],
              ["include_startup_reference", "Referências de start-up", ClipboardCheck],
            ] as const
          ).map(([key, label, Icon]) => (
            <Label
              key={key}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-200 p-2 hover:bg-slate-50"
            >
              <Checkbox
                checked={opts[key]}
                onCheckedChange={(v) =>
                  setOpts((o) => ({ ...o, [key]: v === true }))
                }
              />
              <Icon className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-xs">{label}</span>
            </Label>
          ))}
        </CardContent>
      </Card>

      {!machine && (
        <Alert>
          <FileJson className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Selecione uma máquina para visualizar o preview e exportar o data sheet.
          </AlertDescription>
        </Alert>
      )}

      {datasheet && !datasheet.ok && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-xs text-amber-700">{datasheet.reason}</AlertDescription>
        </Alert>
      )}

      {/* Preview + ações */}
      {datasheet?.ok && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Badge variant="outline" className="text-[10px]">
                {datasheet.sheet.schema_version}
              </Badge>
              <span>
                Gerado em {new Date(datasheet.sheet.exported_at).toLocaleString("pt-BR")}
              </span>
              <Badge
                variant="outline"
                className={`text-[10px] ${
                  datasheet.sheet.validation_status === "approved"
                    ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                    : datasheet.sheet.validation_status === "warning"
                      ? "border-amber-300 bg-amber-50 text-amber-700"
                      : "border-red-300 bg-red-50 text-red-700"
                }`}
              >
                {datasheet.sheet.validation_status.toUpperCase()}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  downloadJson(
                    `datasheet_${datasheet.sheet.product.model.replace(/\s+/g, "_")}_${Date.now()}.json`,
                    datasheet.sheet,
                  )
                }
                className="gap-2"
              >
                <FileJson className="h-4 w-4" />
                JSON
              </Button>
              <Button
                onClick={() => downloadDatasheetPdf(datasheet.sheet, logoConfig)}
                className="gap-2 bg-[#1E6FD9] hover:bg-[#1a5fb8]"
              >
                <FileText className="h-4 w-4" />
                Exportar PDF
              </Button>
            </div>
          </div>

          {/* Identificação */}
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">Identificação</CardTitle></CardHeader>
            <CardContent className="grid gap-2 text-xs sm:grid-cols-2 lg:grid-cols-3">
              <KV label="ID" value={datasheet.sheet.product.id} />
              <KV label="Modelo" value={datasheet.sheet.product.model} />
              <KV label="Família" value={datasheet.sheet.product.family} />
              <KV label="Linha" value={datasheet.sheet.product.line} />
              <KV label="Refrigerante" value={datasheet.sheet.product.refrigerant} />
              {datasheet.sheet.product.application && (
                <KV label="Aplicação" value={datasheet.sheet.product.application} />
              )}
            </CardContent>
          </Card>

          {/* Elétrica */}
          {datasheet.sheet.electrical && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-500" />
                  Análise Elétrica
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-xs sm:grid-cols-2 lg:grid-cols-4">
                <KV label="Potência total" value={`${datasheet.sheet.electrical.total_power_w.toFixed(0)} W`} />
                <KV label="Compressor" value={`${datasheet.sheet.electrical.compressor_power_w.toFixed(0)} W`} />
                <KV label="Ventiladores" value={`${datasheet.sheet.electrical.fans_total_power_w.toFixed(0)} W`} />
                <KV label="Corrente total" value={`${datasheet.sheet.electrical.estimated_current_a.toFixed(2)} A`} />
                <KV label="Tensão" value={`${datasheet.sheet.electrical.voltage_v} V`} />
                <KV label="Fases" value={`${datasheet.sheet.electrical.phases}`} />
                <KV label="Fator de potência" value={datasheet.sheet.electrical.power_factor.toFixed(2)} />
                <KV label="COP sistema" value={datasheet.sheet.electrical.cop_system.toFixed(2)} />
                <KV label="EER" value={`${datasheet.sheet.electrical.eer_btu_wh.toFixed(2)} BTU/W·h`} />
              </CardContent>
            </Card>
          )}

          {/* Performance */}
          {datasheet.sheet.performance_curve && datasheet.sheet.performance_curve.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  Curva de Performance ({datasheet.sheet.performance_curve.length} pontos)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-72 overflow-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase text-slate-500">
                      <tr>
                        <th className="px-3 py-2 text-right">Te (°C)</th>
                        <th className="px-3 py-2 text-right">Tc (°C)</th>
                        <th className="px-3 py-2 text-right">Capacidade (W)</th>
                        <th className="px-3 py-2 text-right">W comp (W)</th>
                        <th className="px-3 py-2 text-right">W total (W)</th>
                        <th className="px-3 py-2 text-right">COP comp</th>
                        <th className="px-3 py-2 text-right">COP sist</th>
                        <th className="px-3 py-2 text-right">Q cond (W)</th>
                        <th className="px-3 py-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {datasheet.sheet.performance_curve.map((p, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="px-3 py-1.5 text-right font-mono">{p.evap_temp_c.toFixed(1)}</td>
                          <td className="px-3 py-1.5 text-right font-mono">{p.cond_temp_c.toFixed(1)}</td>
                          <td className="px-3 py-1.5 text-right font-mono">{p.capacity_w.toFixed(0)}</td>
                          <td className="px-3 py-1.5 text-right font-mono">{p.compressor_power_w.toFixed(0)}</td>
                          <td className="px-3 py-1.5 text-right font-mono">{p.total_power_w.toFixed(0)}</td>
                          <td className="px-3 py-1.5 text-right font-mono">{p.cop_compressor.toFixed(2)}</td>
                          <td className="px-3 py-1.5 text-right font-mono">{p.cop_system.toFixed(2)}</td>
                          <td className="px-3 py-1.5 text-right font-mono">{p.q_cond_w.toFixed(0)}</td>
                          <td className="px-3 py-1.5 text-center">
                            <Badge
                              variant="outline"
                              className={`text-[9px] ${
                                p.status === "approved"
                                  ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                                  : p.status === "warning"
                                    ? "border-amber-300 bg-amber-50 text-amber-700"
                                    : "border-red-300 bg-red-50 text-red-700"
                              }`}
                            >
                              {p.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Polinômios */}
          {datasheet.sheet.polynomial_sets && datasheet.sheet.polynomial_sets.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-violet-500" />
                  Coeficientes Polinomiais (ARI 540 / EN 12900)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 text-[10px] uppercase text-slate-500">
                      <tr>
                        <th className="px-3 py-2 text-left">Alvo</th>
                        <th className="px-3 py-2 text-left">Unidade</th>
                        <th className="px-3 py-2 text-right">R²</th>
                        <th className="px-3 py-2 text-right">Pontos</th>
                        <th className="px-3 py-2 text-left">Qualidade</th>
                        <th className="px-3 py-2 text-left">C1..C10</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {datasheet.sheet.polynomial_sets.map((p) => (
                        <tr key={p.target}>
                          <td className="px-3 py-1.5 font-medium">{p.target_label}</td>
                          <td className="px-3 py-1.5 text-slate-500">{p.unit}</td>
                          <td className="px-3 py-1.5 text-right font-mono">{p.r_squared.toFixed(4)}</td>
                          <td className="px-3 py-1.5 text-right font-mono">{p.used_points}</td>
                          <td className="px-3 py-1.5">
                            <Badge variant="outline" className="text-[9px]">{p.fit_quality}</Badge>
                          </td>
                          <td className="px-3 py-1.5 font-mono text-[10px] text-slate-600">
                            [{p.coefficients.map((c) => c.toExponential(3)).join(", ")}]
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Start-up reference */}
          {datasheet.sheet.startup_reference && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-emerald-500" />
                  Referências de Start-up ({datasheet.sheet.startup_reference.groups.reduce((s, g) => s + g.parameters.length, 0)} parâmetros)
                </CardTitle>
                <CardDescription className="text-xs">
                  Carga estimada: {datasheet.sheet.startup_reference.estimated_charge_kg.toFixed(2)} kg ±{" "}
                  {datasheet.sheet.startup_reference.charge_tolerance_kg.toFixed(2)} kg
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {datasheet.sheet.startup_reference.groups.map((g) => (
                  <div key={g.group_id}>
                    <p className="mb-1 text-xs font-bold text-slate-700">{g.group_label}</p>
                    <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
                      {g.parameters.map((p) => (
                        <div key={p.id} className="rounded border border-slate-200 p-1.5 text-[11px]">
                          <span className="text-slate-700">{p.label}</span>
                          <span className="ml-1 font-mono text-slate-500">
                            {p.reference_value.toFixed(2)} {p.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Avisos */}
          {datasheet.sheet.warnings.length > 0 && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-xs text-amber-700">
                <strong>Avisos da exportação:</strong>
                <ul className="ml-4 mt-1 list-disc">
                  {datasheet.sheet.warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </>
      )}
    </div>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-2 rounded border border-slate-100 bg-slate-50/40 px-2 py-1">
      <span className="text-slate-500">{label}</span>
      <span className="font-mono text-slate-800">{value}</span>
    </div>
  );
}
