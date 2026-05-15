import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          <strong>Dados insuficientes para gerar o registro técnico.</strong> Faltam:
          <ul className="ml-4 mt-1 list-disc">
            {state.missing.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </AlertDescription>
      </Alert>
    );
  }

  const { record } = state;
  const eq = record.equilibrium;
  const elec = record.electrical_analysis;
  const validationSummary = record.validation;

  const finalBadge = validationSummary?.final_status === "approved"
    ? { label: "APROVADO", cls: "bg-emerald-100 text-emerald-700 border-emerald-300" }
    : validationSummary?.final_status === "warning"
    ? { label: "CONDICIONAL", cls: "bg-amber-100 text-amber-700 border-amber-300" }
    : { label: "REJEITADO", cls: "bg-red-100 text-red-700 border-red-300" };

  return (
    <div className="space-y-4">
      {/* Header com link para exportação */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-800">{record.identity.model}</h2>
          <p className="text-xs text-muted-foreground">
            {record.identity.family} · {record.identity.line} · {record.identity.refrigerant}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`text-xs ${finalBadge.cls}`}>{finalBadge.label}</Badge>
          <Link
            to="/coldpro/export"
            className="flex items-center gap-1 rounded border border-border bg-background px-2 py-1 text-xs text-slate-700 hover:bg-accent"
          >
            <ExternalLink className="h-3 w-3" />
            Data Sheet PDF
          </Link>
        </div>
      </div>

      {/* Ponto de operação */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Database className="h-4 w-4 text-blue-500" />
            Ponto de Operação Nominal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <div className="text-xs text-muted-foreground">Te</div>
              <div className="font-semibold">{compressor.evap_temp_c?.toFixed(1) ?? "—"} °C</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Tc</div>
              <div className="font-semibold">{compressor.cond_temp_c?.toFixed(1) ?? "—"} °C</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Q_evap</div>
              <div className="font-semibold">{fmtPower(eq.thermal_balance.q_evap_w)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">W_comp</div>
              <div className="font-semibold">{fmtPower(eq.thermal_balance.compressor_power_w)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Análise elétrica */}
      {elec && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <Zap className="h-4 w-4 text-amber-500" />
              Análise Elétrica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div>
                <div className="text-xs text-muted-foreground">Potência total</div>
                <div className="font-semibold">{fmtPower(elec.total_electrical_power_w)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Corrente total</div>
                <div className="font-semibold">{elec.total_current_a.toFixed(2)} A</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">COP Sistema</div>
                <div className="font-semibold text-green-700">{fmtCOP(elec.cop_system)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Tensão / Fases</div>
                <div className="font-semibold">{elec.voltage_v} V / {elec.phases}φ</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Curva de desempenho — resumo */}
      {record.performance_curve.points.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <Wind className="h-4 w-4 text-purple-500" />
              Curva de Desempenho ({record.performance_curve.points.length} pontos)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
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
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-1 pr-3">{p.evap_temp_c.toFixed(1)}</td>
                      <td className="py-1 pr-3">{p.cond_temp_c.toFixed(1)}</td>
                      <td className="py-1 pr-3">{(p.capacity_w / 1000).toFixed(2)}</td>
                      <td className="py-1 pr-3">{(p.compressor_power_w / 1000).toFixed(2)}</td>
                      <td className="py-1 pr-3">{p.cop_system.toFixed(3)}</td>
                      <td className="py-1">
                        <span className={`rounded px-1 py-0.5 text-[10px] ${
                          p.status === "approved" ? "bg-emerald-100 text-emerald-700"
                          : p.status === "warning" ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                        }`}>{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {record.performance_curve.points.length > 12 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  + {record.performance_curve.points.length - 12} pontos restantes — ver Data Sheet completo.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Limites operacionais */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Cpu className="h-4 w-4 text-slate-500" />
            Limites Operacionais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <div>
              <div className="text-xs text-muted-foreground">Te mín/máx</div>
              <div className="font-semibold">
                {record.operating_limits.min_evap_temp_c.toFixed(1)} / {record.operating_limits.max_evap_temp_c.toFixed(1)} °C
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Tc mín/máx</div>
              <div className="font-semibold">
                {record.operating_limits.min_cond_temp_c.toFixed(1)} / {record.operating_limits.max_cond_temp_c.toFixed(1)} °C
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">COP mín/máx</div>
              <div className="font-semibold">
                {record.operating_limits.min_cop.toFixed(2)} / {record.operating_limits.max_cop.toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Avisos */}
      {record.warnings.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-1">
            <CardTitle className="flex items-center gap-2 text-xs text-amber-700">
              <AlertCircle className="h-3.5 w-3.5" />
              {record.warnings.length} aviso(s)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-0.5 text-xs text-amber-700">
              {record.warnings.map((w, i) => <li key={i}>• {w}</li>)}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Rastreabilidade */}
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
        <CheckCircle2 className="h-3 w-3" />
        Gerado em {new Date(record.traceability.generated_at).toLocaleString("pt-BR")} ·
        Motor {record.traceability.engine_version} · Fonte: {record.traceability.source}
      </div>
    </div>
  );
}
