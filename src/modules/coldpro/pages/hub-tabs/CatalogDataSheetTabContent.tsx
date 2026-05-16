import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ExternalLink, Database, Cpu, Wind, Zap, CheckCircle2 } from "lucide-react";
import type { CatalogEquipmentRow } from "@/modules/coldpro_catalog/data/equipmentCatalog.types";
import {
  buildProductTechnicalRecord,
  type CompressorSpec,
  type CondenserSpec,
  type SystemComponentsInput,
  type ProductTechnicalRecord,
  type ProductIdentity,
} from "@/modules/coldpro_v2";
import type { EvaporatorFormValue } from "../../components/forms/EvaporatorForm";
import type { SystemConditions } from "../../components/forms/SystemConditionsForm";

const KCALH_TO_W = 1.163;

interface Props {
  machine: CatalogEquipmentRow | null;
  compressor: Partial<CompressorSpec>;
  condenser: Partial<CondenserSpec>;
  evaporator: EvaporatorFormValue;
  conditions: Partial<SystemConditions>;
}

function fmtPower(w: number): string {
  return w >= 1000 ? `${(w / 1000).toFixed(2)} kW` : `${w.toFixed(0)} W`;
}

function fmtCOP(v: number): string {
  return v.toFixed(3);
}

export function CatalogDataSheetTabContent({
  machine,
  compressor,
  condenser,
  evaporator,
  conditions,
}: Props) {
  const state = useMemo<
    | { ok: true; record: ProductTechnicalRecord }
    | { ok: false; missing: string[] }
  >(() => {
    const missing: string[] = [];
    if (!compressor.cooling_capacity_w) missing.push("Capacidade frigorífica do compressor");
    if (!compressor.power_w) missing.push("Potência do compressor");
    if (compressor.evap_temp_c == null) missing.push("Temperatura de evaporação");
    if (compressor.cond_temp_c == null) missing.push("Temperatura de condensação");
    if (!compressor.refrigerant) missing.push("Refrigerante");
    if (missing.length > 0) return { ok: false, missing };

    const ambient = conditions.ambient_temp_c ?? machine?.tempCamaraC ?? compressor.cond_temp_c! - 10;
    const required_airflow = conditions.required_airflow_m3_h ?? machine?.vazaoArEvaporadorM3H ?? 0;

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
        (machine?.calorRejeitadoKcalH ? machine.calorRejeitadoKcalH * KCALH_TO_W : 0),
      max_cond_temp_c: condenser.max_cond_temp_c ?? compressor.cond_temp_c!,
    } as CondenserSpec;

    const systemInput = {
      compressor: compressor as CompressorSpec,
      condenser: condenserFull,
      evaporator: {
        progressive_input: {
          airflow_m3_h: evaporator.airflow_m3_h ?? required_airflow,
          evaporating_temp_c: compressor.evap_temp_c!,
        },
      },
      system_conditions: { ambient_temp_c: ambient, required_airflow_m3_h: required_airflow },
    } as unknown as SystemComponentsInput;

    try {
      const record = buildProductTechnicalRecord({
        identity,
        system: systemInput,
        operating_points: [
          { evap_temp_c: compressor.evap_temp_c!, cond_temp_c: compressor.cond_temp_c! },
        ],
      });
      return { ok: true, record };
    } catch (e) {
      console.warn("[CatalogDataSheetTab] buildProductTechnicalRecord falhou:", e);
      return { ok: false, missing: ["Falha ao gerar o registro técnico"] };
    }
  }, [machine, compressor, condenser, evaporator, conditions]);

  if (!state.ok) {
    return (
      <div
        className="rounded-lg border p-3"
        style={{ borderColor: "var(--border-subtle)", background: "var(--bg-800)" }}
      >
        <div className="flex items-start gap-2">
          <span style={{ color: "#f59e0b" }}><AlertCircle className="h-4 w-4" /></span>
          <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-primary)" }}>Dados insuficientes para gerar o registro técnico.</strong> Faltam:
            <ul className="ml-4 mt-1 list-disc">
              {state.missing.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const { record } = state;
  const eq = record.equilibrium;
  const elec = record.electrical_analysis;
  const validationSummary = record.validation;

  const finalBadge = validationSummary?.final_status === "approved"
    ? { label: "APROVADO", color: "var(--color-success)", borderColor: "var(--color-success)" }
    : validationSummary?.final_status === "warning"
    ? { label: "CONDICIONAL", color: "#f59e0b", borderColor: "#f59e0b" }
    : { label: "REJEITADO", color: "var(--color-error)", borderColor: "var(--color-error)" };

  return (
    <div className="space-y-4">
      {/* Header com link para exportação */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{record.identity.model}</h2>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {record.identity.family} · {record.identity.line} · {record.identity.refrigerant}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="cn-badge text-xs"
            style={{ color: finalBadge.color, borderColor: finalBadge.borderColor }}
          >
            {finalBadge.label}
          </span>
          <Link
            to="/coldpro/export"
            className="flex items-center gap-1 rounded border px-2 py-1 text-xs hover:opacity-80"
            style={{ borderColor: "var(--border-subtle)", background: "var(--bg-800)", color: "var(--text-secondary)" }}
          >
            <ExternalLink className="h-3 w-3" />
            Data Sheet PDF
          </Link>
        </div>
      </div>

      {/* Ponto de operação */}
      <div className="cn-card p-4">
        <p className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          <span style={{ color: "var(--ice-400)" }}><Database className="h-4 w-4" /></span>
          Ponto de Operação Nominal
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>Te</div>
            <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{compressor.evap_temp_c?.toFixed(1) ?? "—"} °C</div>
          </div>
          <div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>Tc</div>
            <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{compressor.cond_temp_c?.toFixed(1) ?? "—"} °C</div>
          </div>
          <div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>Q_evap</div>
            <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{fmtPower(eq.thermal_balance.q_evap_w)}</div>
          </div>
          <div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>W_comp</div>
            <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{fmtPower(eq.thermal_balance.compressor_power_w)}</div>
          </div>
        </div>
      </div>

      {/* Análise elétrica */}
      {elec && (
        <div className="cn-card p-4">
          <p className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            <span style={{ color: "#f59e0b" }}><Zap className="h-4 w-4" /></span>
            Análise Elétrica
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>Potência total</div>
              <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{fmtPower(elec.total_electrical_power_w)}</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>Corrente total</div>
              <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{elec.total_current_a.toFixed(2)} A</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>COP Sistema</div>
              <div className="font-semibold font-mono" style={{ color: "var(--color-success)" }}>{fmtCOP(elec.cop_system)}</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>Tensão / Fases</div>
              <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{elec.voltage_v} V / {elec.phases}φ</div>
            </div>
          </div>
        </div>
      )}

      {/* Curva de desempenho — resumo */}
      {record.performance_curve.points.length > 0 && (
        <div className="cn-card p-4">
          <p className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
            <span style={{ color: "var(--ice-400)" }}><Wind className="h-4 w-4" /></span>
            Curva de Desempenho ({record.performance_curve.points.length} pontos)
          </p>
          <div className="overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b text-left" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
                  <th className="pb-1 pr-3">Te (°C)</th>
                  <th className="pb-1 pr-3">Tc (°C)</th>
                  <th className="pb-1 pr-3">Q (kW)</th>
                  <th className="pb-1 pr-3">W (kW)</th>
                  <th className="pb-1 pr-3">COP Sist.</th>
                  <th className="pb-1">Status</th>
                </tr>
              </thead>
              <tbody>
                {record.performance_curve.points.slice(0, 12).map((p, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: "var(--border-subtle)" }}>
                    <td className="py-1 pr-3 font-mono" style={{ color: "var(--text-secondary)" }}>{p.evap_temp_c.toFixed(1)}</td>
                    <td className="py-1 pr-3 font-mono" style={{ color: "var(--text-secondary)" }}>{p.cond_temp_c.toFixed(1)}</td>
                    <td className="py-1 pr-3 font-mono" style={{ color: "var(--text-secondary)" }}>{(p.capacity_w / 1000).toFixed(2)}</td>
                    <td className="py-1 pr-3 font-mono" style={{ color: "var(--text-secondary)" }}>{(p.compressor_power_w / 1000).toFixed(2)}</td>
                    <td className="py-1 pr-3 font-mono" style={{ color: "var(--text-secondary)" }}>{p.cop_system.toFixed(3)}</td>
                    <td className="py-1">
                      <span
                        className="rounded px-1 py-0.5 text-[10px] font-mono"
                        style={{
                          color: p.status === "approved" ? "var(--color-success)" : p.status === "warning" ? "#f59e0b" : "var(--color-error)",
                          background: "var(--bg-800)",
                        }}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {record.performance_curve.points.length > 12 && (
              <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                + {record.performance_curve.points.length - 12} pontos restantes — ver Data Sheet completo.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Limites operacionais */}
      <div className="cn-card p-4">
        <p className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          <span style={{ color: "var(--text-muted)" }}><Cpu className="h-4 w-4" /></span>
          Limites Operacionais
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
          <div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>Te mín/máx</div>
            <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>
              {record.operating_limits.min_evap_temp_c.toFixed(1)} / {record.operating_limits.max_evap_temp_c.toFixed(1)} °C
            </div>
          </div>
          <div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>Tc mín/máx</div>
            <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>
              {record.operating_limits.min_cond_temp_c.toFixed(1)} / {record.operating_limits.max_cond_temp_c.toFixed(1)} °C
            </div>
          </div>
          <div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>COP mín/máx</div>
            <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>
              {record.operating_limits.min_cop.toFixed(2)} / {record.operating_limits.max_cop.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Avisos */}
      {record.warnings.length > 0 && (
        <div
          className="cn-card p-4"
          style={{ borderColor: "#f59e0b" }}
        >
          <p className="flex items-center gap-2 text-xs font-semibold mb-2" style={{ color: "#f59e0b" }}>
            <span style={{ color: "#f59e0b" }}><AlertCircle className="h-3.5 w-3.5" /></span>
            {record.warnings.length} aviso(s)
          </p>
          <ul className="space-y-0.5 text-xs" style={{ color: "#f59e0b" }}>
            {record.warnings.map((w, i) => <li key={i}>• {w}</li>)}
          </ul>
        </div>
      )}

      {/* Rastreabilidade */}
      <div className="flex items-center gap-2 text-[10px]" style={{ color: "var(--text-muted)" }}>
        <CheckCircle2 className="h-3 w-3" />
        Gerado em {new Date(record.traceability.generated_at).toLocaleString("pt-BR")} ·
        Motor {record.traceability.engine_version} · Fonte: {record.traceability.source}
      </div>
    </div>
  );
}
