/**
 * CommissioningPage — Sprint 3
 *
 * Página de Comissionamento em Campo (Auditoria CN COLD).
 *
 * Fluxo:
 *  1. Engenheiro seleciona uma máquina do catálogo CN COLD.
 *  2. App gera a planilha de referências de campo via
 *     buildProductTechnicalRecord + generateStartupReference.
 *  3. Técnico preenche os valores medidos em campo.
 *  4. Ao clicar em "Gerar Relatório", aplica applyFieldMeasurements e
 *     exibe o resultado por grupo com status PASS/WARNING/FAIL.
 */
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  ClipboardCheck,
  Search,
  X,
  Package,
  FileText,
  Download,
} from "lucide-react";

import {
  buildProductTechnicalRecord,
  generateStartupReference,
  applyFieldMeasurements,
  type CompressorSpec,
  type CondenserSpec,
  type ProductIdentity,
  type StartupReferenceSheet,
  type StartupParameterStatus,
  type SystemComponentsInput,
} from "@/modules/coldpro_v2";

import { getEquipmentCatalog } from "@/modules/coldpro_catalog/data/equipmentCatalog.index";
import type { CatalogEquipmentRow } from "@/modules/coldpro_catalog/data/equipmentCatalog.types";
import { catalogToCompressorSpec } from "@/modules/coldpro_catalog/adapters/compressorAdapter";
import { catalogToCondenserSpec } from "@/modules/coldpro_catalog/adapters/condenserAdapter";
import { buildMinimalEvaporatorInput } from "../components/forms/EvaporatorForm";

const KCALH_TO_W = 1.163;

// ── Helpers de UI ────────────────────────────────────────────────────────────

function statusIcon(s: StartupParameterStatus) {
  if (s === "pass") return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />;
  if (s === "warning") return <AlertCircle className="h-3.5 w-3.5 text-amber-500" />;
  if (s === "fail") return <XCircle className="h-3.5 w-3.5 text-red-500" />;
  return <span className="inline-block h-3.5 w-3.5 rounded-full border border-slate-300" />;
}

function overallStatus(sheet: StartupReferenceSheet): {
  label: string;
  className: string;
  pass: number;
  warning: number;
  fail: number;
  notMeasured: number;
} {
  let pass = 0, warning = 0, fail = 0, notMeasured = 0;
  for (const g of sheet.groups) {
    for (const p of g.parameters) {
      if (p.status === "pass") pass++;
      else if (p.status === "warning") warning++;
      else if (p.status === "fail") fail++;
      else notMeasured++;
    }
  }
  if (notMeasured > 0 && pass + warning + fail === 0) {
    return { label: "INCOMPLETO", className: "bg-slate-100 text-slate-700 border-slate-300", pass, warning, fail, notMeasured };
  }
  if (fail > 0) return { label: "REJEITADO", className: "bg-red-100 text-red-700 border-red-300", pass, warning, fail, notMeasured };
  if (warning > 0 || notMeasured > 0)
    return { label: "CONDICIONAL", className: "bg-amber-100 text-amber-700 border-amber-300", pass, warning, fail, notMeasured };
  return { label: "APROVADO", className: "bg-emerald-100 text-emerald-700 border-emerald-300", pass, warning, fail, notMeasured };
}

function downloadJson(filename: string, payload: unknown) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Seletor de máquina inline ────────────────────────────────────────────────

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
          A planilha de referências será gerada automaticamente após selecionar a máquina.
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
                <th className="px-3 py-2 text-right">Te</th>
                <th className="px-3 py-2 text-right">Tc</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-3 py-4 text-center text-slate-400">
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
                    <td className="px-3 py-1.5 text-right text-slate-700">
                      {row.tempEvaporacaoC != null ? row.tempEvaporacaoC.toFixed(1) : "—"}
                    </td>
                    <td className="px-3 py-1.5 text-right text-slate-700">
                      {row.tempCondensacaoC != null ? row.tempCondensacaoC.toFixed(1) : "—"}
                    </td>
                    <td className="px-3 py-1.5">
                      <Button
                        size="sm"
                        variant={isSelected ? "default" : "outline"}
                        className={`h-6 px-2 text-[10px] ${isSelected ? "bg-[#1E6FD9] hover:bg-[#1a5fb8]" : "hover:border-[#1E6FD9] hover:text-[#1E6FD9]"}`}
                        onClick={() => onSelect(row)}
                      >
                        {isSelected ? (
                          <><CheckCircle2 className="mr-1 h-3 w-3" />Selecionado</>
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

// ── Página principal ─────────────────────────────────────────────────────────

export function CommissioningPage() {
  const [machine, setMachine] = useState<CatalogEquipmentRow | null>(null);
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [appliedSheet, setAppliedSheet] = useState<StartupReferenceSheet | null>(null);

  const referenceState = useMemo<
    | { ok: true; sheet: StartupReferenceSheet }
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
        return { ok: false, reason: "Capacidade de rejeição do condensador ausente no catálogo." };
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
        evaporator: {
          progressive_input: buildMinimalEvaporatorInput(compressor, conds),
        },
        condenser: {
          ...(condenser as CondenserSpec),
          max_cond_temp_c: condenser.max_cond_temp_c ?? compressor.cond_temp_c,
        } as CondenserSpec,
        system_conditions: conds,
      };

      const record = buildProductTechnicalRecord({
        identity,
        system,
        operating_points: [
          { evap_temp_c: compressor.evap_temp_c, cond_temp_c: compressor.cond_temp_c },
        ],
      });
      const sheet = generateStartupReference(record);
      return { ok: true, sheet };
    } catch (e) {
      return { ok: false, reason: String(e) };
    }
  }, [machine]);

  function handleSelectMachine(row: CatalogEquipmentRow) {
    setMachine(row);
    setMeasurements({});
    setAppliedSheet(null);
  }

  function handleGenerate() {
    if (!referenceState || !referenceState.ok) return;
    const numeric: Record<string, number> = {};
    for (const [k, v] of Object.entries(measurements)) {
      const n = parseFloat(v);
      if (!isNaN(n)) numeric[k] = n;
    }
    setAppliedSheet(applyFieldMeasurements(referenceState.sheet, numeric));
  }

  const sheetForRender = appliedSheet ?? (referenceState?.ok ? referenceState.sheet : null);
  const status = appliedSheet ? overallStatus(appliedSheet) : null;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 p-5">
      {/* Cabeçalho */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Auditoria & Comissionamento em Campo</h1>
          <p className="text-xs text-slate-500">
            Geração da planilha de referências e relatório de start-up para máquinas do catálogo CN COLD.
          </p>
        </div>
        {appliedSheet && status && (
          <Badge variant="outline" className={`${status.className} text-xs`}>
            {status.label}
          </Badge>
        )}
      </div>

      {/* Seletor */}
      <MachinePicker selectedId={machine?.id} onSelect={handleSelectMachine} />

      {/* Erros / instruções */}
      {!machine && (
        <Alert>
          <ClipboardCheck className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Selecione uma máquina para gerar a planilha de referências.
          </AlertDescription>
        </Alert>
      )}
      {referenceState && !referenceState.ok && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-xs text-amber-700">
            {referenceState.reason}
          </AlertDescription>
        </Alert>
      )}

      {/* Planilha + medições */}
      {sheetForRender && (
        <>
          <Card className="border border-emerald-200 bg-emerald-50/30">
            <CardContent className="flex flex-wrap items-start justify-between gap-3 p-4">
              <div className="flex items-start gap-3">
                <ClipboardCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-bold text-slate-800">{sheetForRender.machine_model}</p>
                  <p className="text-xs text-slate-500">
                    {sheetForRender.refrigerant} · Te {sheetForRender.design_evap_temp_c.toFixed(1)} °C · Tc{" "}
                    {sheetForRender.design_cond_temp_c.toFixed(1)} °C · Ambiente{" "}
                    {sheetForRender.design_ambient_temp_c.toFixed(1)} °C
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Carga estimada: <strong>{sheetForRender.estimated_charge_kg.toFixed(2)} kg</strong> ±{" "}
                    {sheetForRender.charge_tolerance_kg.toFixed(2)} kg
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-[10px] text-emerald-700">
                Motor v2 · {sheetForRender.groups.reduce((s, g) => s + g.parameters.length, 0)} parâmetros
              </Badge>
            </CardContent>
          </Card>

          {sheetForRender.groups.map((group) => (
            <Card key={group.group_id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{group.group_label}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-3 py-2 text-left">Parâmetro</th>
                        <th className="px-3 py-2 text-right">Referência</th>
                        <th className="px-3 py-2 text-right">Tol. mín</th>
                        <th className="px-3 py-2 text-right">Tol. máx</th>
                        <th className="px-3 py-2 text-right">Unidade</th>
                        <th className="px-3 py-2 text-right">Medido</th>
                        <th className="px-3 py-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {group.parameters.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/50">
                          <td className="px-3 py-2">
                            <div className="font-medium text-slate-700">{p.label}</div>
                            <div className="text-[10px] text-slate-400">{p.measurement_instruction}</div>
                          </td>
                          <td className="px-3 py-2 text-right font-mono">{p.reference_value.toFixed(2)}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-500">{p.tolerance_min.toFixed(2)}</td>
                          <td className="px-3 py-2 text-right font-mono text-slate-500">{p.tolerance_max.toFixed(2)}</td>
                          <td className="px-3 py-2 text-right text-slate-500">{p.unit}</td>
                          <td className="px-3 py-2 text-right">
                            <Input
                              type="number"
                              value={measurements[p.id] ?? ""}
                              onChange={(e) =>
                                setMeasurements((m) => ({ ...m, [p.id]: e.target.value }))
                              }
                              placeholder="—"
                              className="ml-auto h-7 w-24 text-right text-xs"
                            />
                          </td>
                          <td className="px-3 py-2 text-center">{statusIcon(p.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button onClick={handleGenerate} className="gap-2">
              <ClipboardCheck className="h-4 w-4" />
              Gerar Relatório
            </Button>
            {appliedSheet && (
              <Button
                variant="outline"
                className="gap-2"
                onClick={() =>
                  downloadJson(
                    `commissioning_${machine?.modelo ?? "report"}_${Date.now()}.json`,
                    appliedSheet,
                  )
                }
              >
                <Download className="h-4 w-4" />
                Exportar JSON
              </Button>
            )}
          </div>

          {appliedSheet && status && (
            <Card className="border-2 border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-slate-600" />
                    <div>
                      <CardTitle className="text-sm">Relatório de Comissionamento</CardTitle>
                      <CardDescription className="text-xs">
                        {status.pass} OK · {status.warning} avisos · {status.fail} falhas ·{" "}
                        {status.notMeasured} não medidos
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${status.className} text-xs`}>
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {appliedSheet.groups.map((g) => {
                  const groupFail = g.parameters.some((p) => p.status === "fail");
                  const groupWarn = g.parameters.some((p) => p.status === "warning");
                  const groupAllOk = g.parameters.every((p) => p.status === "pass");
                  const gStatus: StartupParameterStatus = groupFail
                    ? "fail"
                    : groupWarn
                      ? "warning"
                      : groupAllOk
                        ? "pass"
                        : "not_measured";
                  return (
                    <div key={g.group_id} className="rounded-md border border-slate-200 p-2 text-xs">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-bold text-slate-700">{g.group_label}</span>
                        {statusIcon(gStatus)}
                      </div>
                      <ul className="space-y-0.5">
                        {g.parameters.map((p) => (
                          <li key={p.id} className="flex items-center justify-between gap-2 text-[11px]">
                            <span className="flex min-w-0 items-center gap-1.5">
                              {statusIcon(p.status)}
                              <span className="truncate text-slate-600">{p.label}</span>
                            </span>
                            <span className="shrink-0 font-mono text-slate-500">
                              {p.measured_value == null
                                ? "—"
                                : `${p.measured_value.toFixed(1)} ${p.unit}`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
