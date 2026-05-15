import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, XCircle, ShieldCheck } from "lucide-react";
import type { CatalogEquipmentRow } from "@/modules/coldpro_catalog/data/equipmentCatalog.types";
import {
  validateMachine,
  type CompressorSpec,
  type CondenserSpec,
  type MachineSpec,
  type MachineValidationReport,
  type SystemComponentsInput,
  type ValidationStatus,
} from "@/modules/coldpro_v2";
import type { EvaporatorFormValue } from "../../components/forms/EvaporatorForm";
import type { SystemConditions } from "../../components/forms/SystemConditionsForm";
import { AIEngineerPanel } from "../../components/ai/AIEngineerPanel";

const KCALH_TO_W = 1.163;

interface Props {
  machine: CatalogEquipmentRow | null;
  compressor: Partial<CompressorSpec>;
  condenser: Partial<CondenserSpec>;
  evaporator: EvaporatorFormValue;
  conditions: Partial<SystemConditions>;
}

type ValidationState =
  | { ok: true; report: MachineValidationReport; spec: MachineSpec; components: SystemComponentsInput }
  | { ok: false; missing: string[] };

function statusIcon(s: ValidationStatus) {
  if (s === "pass") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  if (s === "warning") return <AlertCircle className="h-4 w-4 text-amber-500" />;
  return <XCircle className="h-4 w-4 text-red-500" />;
}

function fmtVal(v: number, unit: string): string {
  if (unit === "W") return v >= 1000 ? `${(v / 1000).toFixed(2)} kW` : `${v.toFixed(0)} W`;
  if (unit === "%") return `${v.toFixed(1)}%`;
  if (unit === "°C") return `${v.toFixed(1)} °C`;
  return v.toFixed(3);
}

const FINAL_STATUS_STYLE = {
  approved: { label: "APROVADA", className: "bg-emerald-100 text-emerald-700 border-emerald-300" },
  conditional: { label: "CONDICIONAL", className: "bg-amber-100 text-amber-700 border-amber-300" },
  rejected: { label: "REJEITADA", className: "bg-red-100 text-red-700 border-red-300" },
} as const;

export function MachineValidationTabContent({
  machine,
  compressor,
  condenser,
  evaporator,
  conditions,
}: Props) {
  const validation = useMemo<ValidationState>(() => {
    const missing: string[] = [];
    const row = machine;

    const nominal_capacity_w =
      compressor.cooling_capacity_w ??
      (row?.capacidadeFrigorificaKcalH ? row.capacidadeFrigorificaKcalH * KCALH_TO_W : undefined);
    const nominal_power_w =
      compressor.power_w ??
      (row?.potenciaCompressorKw ? row.potenciaCompressorKw * 1000 : undefined);
    const nominal_evap = compressor.evap_temp_c ?? row?.tempEvaporacaoC;
    const nominal_cond = compressor.cond_temp_c ?? row?.tempCondensacaoC;
    const nominal_ambient = conditions.ambient_temp_c ?? row?.tempCamaraC;

    if (!nominal_capacity_w) missing.push("Capacidade frigorífica nominal");
    if (!nominal_power_w) missing.push("Potência elétrica nominal");
    if (nominal_evap == null) missing.push("Temperatura de evaporação nominal");
    if (nominal_cond == null) missing.push("Temperatura de condensação nominal");
    if (nominal_ambient == null) missing.push("Temperatura ambiente");
    if (!compressor.power_w || !compressor.cooling_capacity_w) {
      missing.push("Compressor (capacidade + potência) para rodar o equilíbrio");
    }
    if (missing.length > 0) return { ok: false, missing };

    const nominal_cop = nominal_capacity_w! / nominal_power_w!;
    const machineSpec: MachineSpec = {
      machine_id: machine?.id ?? "current",
      model: machine?.modelo ?? "Máquina atual",
      nominal_capacity_w: nominal_capacity_w!,
      nominal_power_w: nominal_power_w!,
      nominal_cop,
      nominal_evap_temp_c: nominal_evap!,
      nominal_cond_temp_c: nominal_cond!,
      nominal_ambient_temp_c: nominal_ambient!,
      ...(conditions.nominal_delta_t_evap_k != null
        ? { nominal_delta_t_evap_k: conditions.nominal_delta_t_evap_k }
        : {}),
      ...(conditions.nominal_delta_t_cond_k != null
        ? { nominal_delta_t_cond_k: conditions.nominal_delta_t_cond_k }
        : {}),
    };
    const systemInput = {
      compressor: compressor as CompressorSpec,
      condenser: condenser as CondenserSpec,
      evaporator: { progressive_input: {} },
      system_conditions: {
        ambient_temp_c: nominal_ambient!,
        required_airflow_m3_h: evaporator.airflow_m3_h ?? row?.vazaoArEvaporadorM3H ?? 0,
      },
    } as unknown as SystemComponentsInput;

    try {
      const report = validateMachine(machineSpec, systemInput);
      return { ok: true, report, spec: machineSpec, components: systemInput };
    } catch (e) {
      console.warn("[MachineValidationTab] validateMachine falhou:", e);
      return { ok: false, missing: ["Equilíbrio falhou — verifique especificação do evaporador"] };
    }
  }, [machine, compressor, condenser, evaporator, conditions]);

  return (
    <div className="space-y-4">
      <Card className="border-2 border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-slate-600" />
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm">Validação de Máquina</CardTitle>
                  {(conditions.nominal_delta_t_evap_k != null ||
                    conditions.nominal_delta_t_cond_k != null) && (
                    <Badge
                      variant="outline"
                      className="border-blue-300 bg-blue-50 text-[10px] text-blue-700"
                    >
                      ΔT ativo
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-xs">
                  Checklist PASS/WARNING/FAIL por critério — motor{" "}
                  <code>validateMachine</code> (coldpro_v2)
                </CardDescription>
              </div>
            </div>
            {validation.ok && (() => {
              const b = FINAL_STATUS_STYLE[validation.report.final_status];
              return <Badge variant="outline" className={`${b.className} text-xs`}>{b.label}</Badge>;
            })()}
          </div>
        </CardHeader>
        <CardContent>
          {!validation.ok ? (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-xs text-amber-700">
                <strong>Dados insuficientes para validação.</strong> Faltam:
                <ul className="ml-4 mt-1 list-disc">
                  {validation.missing.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  {validation.report.summary.passed} aprovados
                </span>
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                  {validation.report.summary.warnings} avisos
                </span>
                <span className="flex items-center gap-1.5">
                  <XCircle className="h-3.5 w-3.5 text-red-500" />
                  {validation.report.summary.failed} falhas
                </span>
                <span className="ml-auto text-slate-400">
                  Te {validation.report.operating_point.evap_temp_c.toFixed(1)} °C ·{" "}
                  Tc {validation.report.operating_point.cond_temp_c.toFixed(1)} °C
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {validation.report.criteria.map((c) => (
                  <div
                    key={c.criterion_id}
                    className={`rounded-lg border p-3 ${
                      c.status === "pass"
                        ? "border-emerald-200 bg-emerald-50/40"
                        : c.status === "warning"
                        ? "border-amber-200 bg-amber-50/40"
                        : "border-red-200 bg-red-50/40"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {statusIcon(c.status)}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-800">{c.label}</p>
                        <p className="mt-0.5 font-mono text-[11px] text-slate-600">
                          {fmtVal(c.calculated_value, c.unit)}{" "}
                          <span className="text-slate-400">vs.</span>{" "}
                          {fmtVal(c.reference_value, c.unit)} nominal
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Desvio: {c.deviation_pct >= 0 ? "+" : ""}
                          {c.deviation_pct.toFixed(2)}%
                        </p>
                        <p className="mt-1 text-[10px] text-slate-600">{c.message}</p>
                        {c.diagnosis && c.status !== "pass" && (
                          <p className="mt-1 text-[10px] italic text-slate-500">↳ {c.diagnosis}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {validation.report.recommendations.length > 0 &&
                validation.report.final_status !== "approved" && (
                  <Alert className="border-slate-200 bg-slate-50">
                    <AlertCircle className="h-4 w-4 text-slate-500" />
                    <AlertDescription className="text-xs text-slate-700">
                      <strong>Recomendações de ajuste:</strong>
                      <ul className="ml-4 mt-1 list-disc space-y-0.5">
                        {validation.report.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
            </div>
          )}
        </CardContent>
      </Card>

      <AIEngineerPanel
        spec={validation.ok ? validation.spec : null}
        components={validation.ok ? validation.components : null}
      />
    </div>
  );
}
