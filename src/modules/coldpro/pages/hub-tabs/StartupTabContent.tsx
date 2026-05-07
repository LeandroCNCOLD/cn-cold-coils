/**
 * StartupTabContent — Aba "Start-up" do Hub de Testes
 *
 * Sprint 5 — gera a planilha de referências de campo a partir do
 * ProductTechnicalRecord da máquina selecionada e permite ao técnico
 * informar as medições reais para gerar o relatório de comissionamento.
 *
 * Motores usados (coldpro_v2):
 *   - buildProductTechnicalRecord  → produz o ProductTechnicalRecord base
 *   - generateStartupReference     → planilha de referências de campo
 *   - generateCommissioningReport  → relatório final de start-up
 *   - validateCommissioningInput   → validação de entradas obrigatórias
 *   - summarizeCommissioningReport → resumo textual
 */
import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  ClipboardCheck,
  Download,
  FileText,
} from "lucide-react";
import {
  buildProductTechnicalRecord,
  generateStartupReference,
  generateCommissioningReport,
  validateCommissioningInput,
  summarizeCommissioningReport,
  type CompressorSpec,
  type CondenserSpec,
  type ProductIdentity,
  type ProductTechnicalRecord,
  type StartupReferenceSheet,
  type StartupParameterStatus,
  type SystemComponentsInput,
} from "@/modules/coldpro_v2";
import type { CommissioningReport } from "@/modules/coldpro_v2/domain/types";
import type { CatalogEquipmentRow } from "@/modules/coldpro_catalog/data/equipmentCatalog.types";
import type { EvaporatorFormValue } from "../../components/forms/EvaporatorForm";
import type { SystemConditions } from "../../components/forms/SystemConditionsForm";
import { buildMinimalEvaporatorInput } from "../../components/forms/EvaporatorForm";

interface Props {
  machine: CatalogEquipmentRow | null;
  compressor: Partial<CompressorSpec>;
  condenser: Partial<CondenserSpec>;
  evaporator: EvaporatorFormValue;
  conditions: Partial<SystemConditions>;
}

const KCALH_TO_W = 1.163;

function statusIcon(s: StartupParameterStatus) {
  if (s === "pass") return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />;
  if (s === "warning") return <AlertCircle className="h-3.5 w-3.5 text-amber-500" />;
  if (s === "fail") return <XCircle className="h-3.5 w-3.5 text-red-500" />;
  return <span className="inline-block h-3.5 w-3.5 rounded-full border border-slate-300" />;
}

function statusBadgeProps(status: CommissioningReport["final_status"]) {
  switch (status) {
    case "approved":
      return { label: "APROVADO", className: "bg-emerald-100 text-emerald-700 border-emerald-300" };
    case "conditional":
      return { label: "CONDICIONAL", className: "bg-amber-100 text-amber-700 border-amber-300" };
    case "rejected":
      return { label: "REJEITADO", className: "bg-red-100 text-red-700 border-red-300" };
    default:
      return { label: "INCOMPLETO", className: "bg-slate-100 text-slate-700 border-slate-300" };
  }
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

export function StartupTabContent({
  machine,
  compressor,
  condenser,
  evaporator,
  conditions,
}: Props) {
  // ───────────────────────────── 1. Planilha de referências ─────────────────
  const referenceState = useMemo<
    | { ok: true; record: ProductTechnicalRecord; sheet: StartupReferenceSheet }
    | { ok: false; missing: string[] }
  >(() => {
    const missing: string[] = [];
    if (!compressor.cooling_capacity_w) missing.push("Capacidade frigorífica do compressor");
    if (!compressor.power_w) missing.push("Potência do compressor");
    if (compressor.evap_temp_c == null) missing.push("Temperatura de evaporação");
    if (compressor.cond_temp_c == null) missing.push("Temperatura de condensação");
    if (!compressor.refrigerant) missing.push("Refrigerante");
    if (!condenser.heat_rejection_capacity_w && !machine?.calorRejeitadoKcalH) {
      missing.push("Capacidade de rejeição do condensador");
    }
    if (conditions.ambient_temp_c == null && machine?.tempCamaraC == null) {
      missing.push("Temperatura ambiente");
    }
    if (missing.length > 0) return { ok: false, missing };

    const ambient =
      conditions.ambient_temp_c ?? machine?.tempCamaraC ?? compressor.cond_temp_c! - 10;
    const required_airflow =
      conditions.required_airflow_m3_h ?? machine?.vazaoArEvaporadorM3H ?? 0;

    const identity: ProductIdentity = {
      id: machine?.id ?? "current",
      model: machine?.modelo ?? "Máquina atual",
      family: machine?.family ?? "—",
      line: machine?.linha ?? "—",
      refrigerant: compressor.refrigerant!,
    };

    const condenserFull: CondenserSpec = {
      ...(condenser as CondenserSpec),
      heat_rejection_capacity_w:
        condenser.heat_rejection_capacity_w ??
        (machine?.calorRejeitadoKcalH ?? 0) * KCALH_TO_W,
      max_cond_temp_c: condenser.max_cond_temp_c ?? compressor.cond_temp_c!,
    } as CondenserSpec;

    const conds: SystemConditions = {
      ambient_temp_c: ambient,
      required_airflow_m3_h: required_airflow,
    };

    const system: SystemComponentsInput = {
      compressor: compressor as CompressorSpec,
      evaporator: {
        progressive_input: buildMinimalEvaporatorInput(compressor, conds),
      },
      condenser: condenserFull,
      system_conditions: conds,
    };

    try {
      const record = buildProductTechnicalRecord({
        identity,
        system,
        operating_points: [
          { evap_temp_c: compressor.evap_temp_c!, cond_temp_c: compressor.cond_temp_c! },
        ],
      });
      const sheet = generateStartupReference(record);
      return { ok: true, record, sheet };
    } catch (e) {
      console.warn("[StartupTab] geração de referência falhou:", e);
      return { ok: false, missing: ["Falha ao gerar referências — verifique dados do sistema"] };
    }
  }, [machine, compressor, condenser, evaporator, conditions]);

  // ───────────────────────────── 2. Estado de medições ──────────────────────
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [serial, setSerial] = useState("");
  const [technician, setTechnician] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [report, setReport] = useState<CommissioningReport | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!referenceState.ok) return;
    const numericMeasurements: Record<string, number> = {};
    for (const [k, v] of Object.entries(measurements)) {
      const n = parseFloat(v);
      if (!isNaN(n)) numericMeasurements[k] = n;
    }

    const input = {
      reference_sheet: referenceState.sheet,
      measurements: numericMeasurements,
      serial_number: serial,
      technician_name: technician,
      location,
      technician_notes: notes,
    };

    const v = validateCommissioningInput(input);
    if (!v.valid) {
      setValidationErrors(v.errors);
      setReport(null);
      return;
    }
    setValidationErrors([]);
    try {
      const r = generateCommissioningReport(input);
      setReport(r);
    } catch (e) {
      console.warn("[StartupTab] generateCommissioningReport falhou:", e);
      setValidationErrors([String(e)]);
    }
  };

  // ───────────────────────────── 3. Render ──────────────────────────────────
  if (!referenceState.ok) {
    return (
      <Alert className="border-amber-200 bg-amber-50">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertDescription className="text-xs text-amber-700">
          <strong>Dados insuficientes para gerar a planilha de referências.</strong> Faltam:
          <ul className="ml-4 mt-1 list-disc">
            {referenceState.missing.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>
    );
  }

  const { sheet } = referenceState;

  return (
    <div className="space-y-5">
      {/* Cabeçalho */}
      <Card className="border border-emerald-200 bg-emerald-50/30">
        <CardContent className="flex flex-wrap items-start justify-between gap-3 p-4">
          <div className="flex items-start gap-3">
            <ClipboardCheck className="mt-0.5 h-5 w-5 text-emerald-600" />
            <div>
              <p className="text-sm font-bold text-slate-800">{sheet.machine_model}</p>
              <p className="text-xs text-slate-500">
                {sheet.refrigerant} · Te {sheet.design_evap_temp_c.toFixed(1)} °C · Tc{" "}
                {sheet.design_cond_temp_c.toFixed(1)} °C · Ambiente{" "}
                {sheet.design_ambient_temp_c.toFixed(1)} °C
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Carga estimada: <strong>{sheet.estimated_charge_kg.toFixed(2)} kg</strong> ±{" "}
                {sheet.charge_tolerance_kg.toFixed(2)} kg
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px] text-emerald-700">
            Motor v2 · {sheet.groups.reduce((s, g) => s + g.parameters.length, 0)} parâmetros
          </Badge>
        </CardContent>
      </Card>

      {/* Formulário de identificação */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Identificação do start-up</CardTitle>
          <CardDescription className="text-xs">
            Preencha os dados do equipamento e do técnico responsável.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label className="text-xs">Número de série *</Label>
            <Input value={serial} onChange={(e) => setSerial(e.target.value)} className="h-8 text-xs" />
          </div>
          <div>
            <Label className="text-xs">Técnico *</Label>
            <Input value={technician} onChange={(e) => setTechnician(e.target.value)} className="h-8 text-xs" />
          </div>
          <div>
            <Label className="text-xs">Local *</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} className="h-8 text-xs" />
          </div>
          <div className="sm:col-span-2 lg:col-span-1">
            <Label className="text-xs">Observações</Label>
            <Input value={notes} onChange={(e) => setNotes(e.target.value)} className="h-8 text-xs" />
          </div>
        </CardContent>
      </Card>

      {/* Grupos de parâmetros */}
      {sheet.groups.map((group) => (
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
                    <th className="px-3 py-2 text-right">Min.</th>
                    <th className="px-3 py-2 text-right">Máx.</th>
                    <th className="px-3 py-2 text-right">Unidade</th>
                    <th className="px-3 py-2 text-right">Medido em campo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {group.parameters.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="px-3 py-2">
                        <div className="font-medium text-slate-700">{p.label}</div>
                        <div className="text-[10px] text-slate-400">
                          {p.measurement_instruction}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-right font-mono">{p.reference_value.toFixed(2)}</td>
                      <td className="px-3 py-2 text-right font-mono text-slate-500">
                        {p.tolerance_min.toFixed(2)}
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-slate-500">
                        {p.tolerance_max.toFixed(2)}
                      </td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Ações */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button onClick={handleGenerate} className="gap-2">
          <ClipboardCheck className="h-4 w-4" />
          Calcular Status
        </Button>
        {report && (
          <Button
            variant="outline"
            onClick={() =>
              downloadJson(
                `commissioning_${report.serial_number || "report"}_${Date.now()}.json`,
                report,
              )
            }
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
        )}
      </div>

      {validationErrors.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <XCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-xs text-red-700">
            <strong>Não foi possível gerar o relatório:</strong>
            <ul className="ml-4 mt-1 list-disc">
              {validationErrors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Resumo do relatório */}
      {report && (
        <Card className="border-2 border-slate-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-600" />
                <div>
                  <CardTitle className="text-sm">Relatório de Comissionamento</CardTitle>
                  <CardDescription className="text-xs">
                    {summarizeCommissioningReport(report)}
                  </CardDescription>
                </div>
              </div>
              {(() => {
                const b = statusBadgeProps(report.final_status);
                return (
                  <Badge variant="outline" className={`${b.className} text-xs`}>
                    {b.label}
                  </Badge>
                );
              })()}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                {report.summary.passed} OK
              </span>
              <span className="flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                {report.summary.warnings} avisos
              </span>
              <span className="flex items-center gap-1.5">
                <XCircle className="h-3.5 w-3.5 text-red-500" />
                {report.summary.failed} falhas
              </span>
              <span className="text-slate-400">
                {report.summary.measured}/{report.summary.total_parameters} parâmetros medidos
              </span>
            </div>

            {/* Parâmetros críticos (fail) */}
            {report.summary.failed > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-red-700">Parâmetros críticos</p>
                {report.groups.flatMap((g) =>
                  g.parameters
                    .filter((p) => p.status === "fail")
                    .map((p) => (
                      <div
                        key={`${g.group_id}_${p.parameter_id}`}
                        className="rounded-md border border-red-200 bg-red-50/50 p-2 text-xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-bold">{p.label}</span>{" "}
                            <span className="text-slate-500">({g.group_label})</span>
                          </div>
                          <span className="font-mono text-red-700">
                            {p.measured_value.toFixed(2)} {p.unit} (ref. {p.reference_value.toFixed(2)})
                          </span>
                        </div>
                        {p.diagnosis && (
                          <p className="mt-1 italic text-slate-600">↳ {p.diagnosis}</p>
                        )}
                      </div>
                    )),
                )}
              </div>
            )}

            {/* Detalhe por grupo */}
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {report.groups.map((g) => (
                <div key={g.group_id} className="rounded-md border border-slate-200 p-2 text-xs">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-bold text-slate-700">{g.group_label}</span>
                    {statusIcon(g.group_status)}
                  </div>
                  <ul className="space-y-0.5">
                    {g.parameters.map((p) => (
                      <li
                        key={p.parameter_id}
                        className="flex items-center justify-between gap-2 text-[11px]"
                      >
                        <span className="flex min-w-0 items-center gap-1.5">
                          {statusIcon(p.status)}
                          <span className="truncate text-slate-600">{p.label}</span>
                        </span>
                        <span className="shrink-0 font-mono text-slate-500">
                          {p.status === "not_measured"
                            ? "—"
                            : `${p.measured_value.toFixed(1)} ${p.unit}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
