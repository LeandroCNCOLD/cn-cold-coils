import { useMemo } from "react";
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
  if (s === "pass") return <CheckCircle2 className="h-4 w-4" style={{ color: "var(--color-success)" }} />;
  if (s === "warning") return <AlertCircle className="h-4 w-4" style={{ color: "#f59e0b" }} />;
  return <XCircle className="h-4 w-4" style={{ color: "var(--color-error)" }} />;
}

function fmtVal(v: number, unit: string): string {
  if (unit === "W") return v >= 1000 ? `${(v / 1000).toFixed(2)} kW` : `${v.toFixed(0)} W`;
  if (unit === "%") return `${v.toFixed(1)}%`;
  if (unit === "°C") return `${v.toFixed(1)} °C`;
  return v.toFixed(3);
}

const FINAL_STATUS_STYLE = {
  approved: { label: "APROVADA", badgeClass: "cn-badge cn-badge--approved" },
  conditional: { label: "CONDICIONAL", badgeClass: "cn-badge cn-badge--pending" },
  rejected: { label: "REJEITADA", badgeClass: "cn-badge cn-badge--rejected" },
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
      <div className="cn-card p-4" style={{ borderWidth: 2, borderStyle: "solid", borderColor: "var(--border-subtle)" }}>
        <div className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" style={{ color: "var(--text-secondary)" }} />
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Validação de Máquina</p>
                  {(conditions.nominal_delta_t_evap_k != null ||
                    conditions.nominal_delta_t_cond_k != null) && (
                    <span className="cn-badge cn-badge--info text-[10px]">ΔT ativo</span>
                  )}
                </div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Checklist PASS/WARNING/FAIL por critério — motor{" "}
                  <code>validateMachine</code> (coldpro_v2)
                </p>
              </div>
            </div>
            {validation.ok && (() => {
              const b = FINAL_STATUS_STYLE[validation.report.final_status];
              return <span className={`${b.badgeClass} text-xs`}>{b.label}</span>;
            })()}
          </div>
        </div>
        <div>
          {!validation.ok ? (
            <div
              className="rounded-lg p-3 flex gap-2"
              style={{ background: "rgba(245,158,11,0.1)", borderWidth: 1, borderStyle: "solid", borderColor: "rgba(245,158,11,0.3)" }}
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#f59e0b" }} />
              <div className="text-xs" style={{ color: "#f59e0b" }}>
                <strong>Dados insuficientes para validação.</strong> Faltam:
                <ul className="ml-4 mt-1 list-disc">
                  {validation.missing.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                  <CheckCircle2 className="h-3.5 w-3.5" style={{ color: "var(--color-success)" }} />
                  {validation.report.summary.passed} aprovados
                </span>
                <span className="flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                  <AlertCircle className="h-3.5 w-3.5" style={{ color: "#f59e0b" }} />
                  {validation.report.summary.warnings} avisos
                </span>
                <span className="flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                  <XCircle className="h-3.5 w-3.5" style={{ color: "var(--color-error)" }} />
                  {validation.report.summary.failed} falhas
                </span>
                <span className="ml-auto font-mono" style={{ color: "var(--text-muted)" }}>
                  Te {validation.report.operating_point.evap_temp_c.toFixed(1)} °C ·{" "}
                  Tc {validation.report.operating_point.cond_temp_c.toFixed(1)} °C
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {validation.report.criteria.map((c) => (
                  <div
                    key={c.criterion_id}
                    className="rounded-lg border p-3"
                    style={{
                      borderColor: c.status === "pass"
                        ? "rgba(16,185,129,0.35)"
                        : c.status === "warning"
                        ? "rgba(245,158,11,0.35)"
                        : "rgba(239,68,68,0.35)",
                      background: c.status === "pass"
                        ? "rgba(16,185,129,0.08)"
                        : c.status === "warning"
                        ? "rgba(245,158,11,0.08)"
                        : "rgba(239,68,68,0.08)",
                    }}
                  >
                    <div className="flex items-start gap-2">
                      {statusIcon(c.status)}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{c.label}</p>
                        <p className="mt-0.5 font-mono text-[11px]" style={{ color: "var(--text-secondary)" }}>
                          {fmtVal(c.calculated_value, c.unit)}{" "}
                          <span style={{ color: "var(--text-muted)" }}>vs.</span>{" "}
                          {fmtVal(c.reference_value, c.unit)} nominal
                        </p>
                        <p className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>
                          Desvio: {c.deviation_pct >= 0 ? "+" : ""}
                          {c.deviation_pct.toFixed(2)}%
                        </p>
                        <p className="mt-1 text-[10px]" style={{ color: "var(--text-secondary)" }}>{c.message}</p>
                        {c.diagnosis && c.status !== "pass" && (
                          <p className="mt-1 text-[10px] italic" style={{ color: "var(--text-muted)" }}>↳ {c.diagnosis}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {validation.report.recommendations.length > 0 &&
                validation.report.final_status !== "approved" && (
                  <div
                    className="rounded-lg p-3 flex gap-2"
                    style={{ background: "var(--bg-800)", borderWidth: 1, borderStyle: "solid", borderColor: "var(--border-subtle)" }}
                  >
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--text-muted)" }} />
                    <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      <strong>Recomendações de ajuste:</strong>
                      <ul className="ml-4 mt-1 list-disc space-y-0.5">
                        {validation.report.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>

      <AIEngineerPanel
        spec={validation.ok ? validation.spec : null}
        components={validation.ok ? validation.components : null}
      />
    </div>
  );
}
