/**
 * ExportPage — Sprint 4
 *
 * Exporta o data sheet completo de uma máquina do catálogo CN COLD,
 * incluindo identificação, análise elétrica, curva de performance,
 * coeficientes polinomiais e referências de start-up.
 *
 * Motor: exportMachineDatasheet (coldpro_v2).
 */
import { useMemo, useState } from "react";
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
            <Button
              onClick={() =>
                downloadJson(
                  `datasheet_${datasheet.sheet.product.model.replace(/\s+/g, "_")}_${Date.now()}.json`,
                  datasheet.sheet,
                )
              }
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar JSON
            </Button>
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
