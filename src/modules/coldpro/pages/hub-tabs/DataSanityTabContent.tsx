/**
 * DataSanityTabContent — Sanidade dos Dados
 *
 * Valida se todos os dados necessários estão presentes e consistentes
 * antes de qualquer simulação. Classifica cada campo como:
 * - Completo: dado presente e dentro dos limites físicos
 * - Estimado: dado ausente mas estimado com base em defaults
 * - Crítico ausente: dado obrigatório ausente — bloqueia simulação completa
 *
 * Referências:
 * - AHRI Standard 540 (2020) — Compressor Performance Ratings
 * - EN 12900:2013 — Refrigerant compressors — Rating conditions
 * - ASHRAE Handbook Refrigeration 2022, Cap. 14 — Forced-Circulation Air Coolers
 */
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle, XCircle, Shield, Database, Zap, Wind, Thermometer, ShieldCheck } from "lucide-react";
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

interface Props {
  machine: CatalogEquipmentRow | null;
  compressor: Partial<CompressorSpec>;
  condenser: Partial<CondenserSpec>;
  evaporator: EvaporatorFormValue;
  conditions: Partial<SystemConditions>;
}

type FieldStatus = "complete" | "estimated" | "critical";

interface FieldCheck {
  field: string;
  value: string;
  status: FieldStatus;
  note: string;
}

interface GroupCheck {
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: FieldCheck[];
  overallStatus: FieldStatus;
  confidence: "alta" | "média" | "baixa";
}

const KCALH_TO_W = 1.163;

function checkStatus(checks: FieldCheck[]): FieldStatus {
  if (checks.some((c) => c.status === "critical")) return "critical";
  if (checks.some((c) => c.status === "estimated")) return "estimated";
  return "complete";
}

function fmtNum(v: number | undefined | null, unit = "", decimals = 1): string {
  if (v == null || isNaN(v)) return "—";
  return `${v.toFixed(decimals)} ${unit}`.trim();
}

export function DataSanityTabContent({ machine, compressor, condenser, evaporator, conditions }: Props) {
  const groups = useMemo<GroupCheck[]>(() => {
    const row = machine;

    // ── Compressor ────────────────────────────────────────────────────────────
    const compFields: FieldCheck[] = [
      {
        field: "Capacidade Frigorífica",
        value: compressor.cooling_capacity_w
          ? fmtNum(compressor.cooling_capacity_w / 1000, "kW")
          : row?.capacidadeFrigorificaKcalH
          ? fmtNum(row.capacidadeFrigorificaKcalH * KCALH_TO_W / 1000, "kW") + " (catálogo)"
          : "—",
        status: compressor.cooling_capacity_w ? "complete" : row?.capacidadeFrigorificaKcalH ? "estimated" : "critical",
        note: compressor.cooling_capacity_w ? "Dado confirmado" : row?.capacidadeFrigorificaKcalH ? "Convertido do catálogo (kcal/h → W)" : "Obrigatório para SystemSolver",
      },
      {
        field: "Potência do Compressor",
        value: compressor.power_w
          ? fmtNum(compressor.power_w / 1000, "kW")
          : row?.potenciaCompressorKw
          ? fmtNum(row.potenciaCompressorKw, "kW") + " (catálogo)"
          : "—",
        status: compressor.power_w ? "complete" : row?.potenciaCompressorKw ? "estimated" : "critical",
        note: compressor.power_w ? "Dado confirmado" : row?.potenciaCompressorKw ? "Dado do catálogo" : "Obrigatório para cálculo de COP",
      },
      {
        field: "Refrigerante",
        value: compressor.refrigerant ?? row?.refrigerante ?? "—",
        status: compressor.refrigerant ? "complete" : row?.refrigerante && row.refrigerante !== "unknown" ? "estimated" : "critical",
        note: compressor.refrigerant ? "Confirmado" : row?.refrigerante ? "Do catálogo" : "Obrigatório para propriedades termodinâmicas",
      },
      {
        field: "Temperatura de Evaporação (Te)",
        value: fmtNum(compressor.evap_temp_c ?? row?.tempEvaporacaoC, "°C"),
        status: (compressor.evap_temp_c ?? row?.tempEvaporacaoC) != null ? "complete" : "estimated",
        note: (compressor.evap_temp_c ?? row?.tempEvaporacaoC) != null ? "Confirmado" : "Usando default: -10°C",
      },
      {
        field: "Temperatura de Condensação (Tc)",
        value: fmtNum(compressor.cond_temp_c ?? row?.tempCondensacaoC, "°C"),
        status: (compressor.cond_temp_c ?? row?.tempCondensacaoC) != null ? "complete" : "estimated",
        note: (compressor.cond_temp_c ?? row?.tempCondensacaoC) != null ? "Confirmado" : "Usando default: 40°C",
      },
      {
        field: "Mapa de Desempenho (AHRI 540)",
        value: row?.capacidadeFrigorificaKcalH ? "Ponto nominal disponível" : "Ausente",
        status: row?.capacidadeFrigorificaKcalH ? "estimated" : "estimated",
        note: "Grade 3×3 será gerada por interpolação. Para precisão máxima, importar mapa completo do fabricante.",
      },
      {
        field: "Modelo / Código",
        value: row?.compressorModelo ?? row?.modelo ?? "—",
        status: (row?.compressorModelo ?? row?.modelo) ? "complete" : "estimated",
        note: "Identificação do compressor",
      },
    ];

    // ── Evaporador ────────────────────────────────────────────────────────────
    const evapFields: FieldCheck[] = [
      {
        field: "Geometria (tubos e aletas)",
        value: evaporator.tube_outer_diameter_mm
          ? `Ø${evaporator.tube_outer_diameter_mm}mm, ${evaporator.rows_total ?? "?"}R`
          : row?.evaporadorTuboDiametroMm
          ? `Ø${row.evaporadorTuboDiametroMm}mm (catálogo)`
          : "—",
        status: evaporator.tube_outer_diameter_mm ? "complete" : row?.evaporadorTuboDiametroMm ? "estimated" : "critical",
        note: evaporator.tube_outer_diameter_mm ? "Geometria completa" : row?.evaporadorTuboDiametroMm ? "Geometria parcial do catálogo" : "Obrigatório para cálculo de U e ΔP",
      },
      {
        field: "Vazão de Ar",
        value: fmtNum(evaporator.airflow_m3_h ?? row?.vazaoArEvaporadorM3H, "m³/h"),
        status: (evaporator.airflow_m3_h ?? row?.vazaoArEvaporadorM3H) ? "complete" : "critical",
        note: (evaporator.airflow_m3_h ?? row?.vazaoArEvaporadorM3H) ? "Confirmado" : "Obrigatório para cálculo de capacidade",
      },
      {
        field: "Temperatura do Ar de Entrada",
        value: fmtNum(evaporator.air_temperature_in_c ?? row?.tempCamaraC, "°C"),
        status: (evaporator.air_temperature_in_c ?? row?.tempCamaraC) != null ? "complete" : "estimated",
        note: (evaporator.air_temperature_in_c ?? row?.tempCamaraC) != null ? "Confirmado" : "Usando default: 0°C",
      },
      {
        field: "Umidade Relativa do Ar",
        value: evaporator.air_relative_humidity_in != null
          ? fmtNum(evaporator.air_relative_humidity_in * 100, "%")
          : row?.umidadeCamaraPercent != null
          ? fmtNum(row.umidadeCamaraPercent, "%") + " (catálogo)"
          : "—",
        status: (evaporator.air_relative_humidity_in ?? row?.umidadeCamaraPercent) != null ? "complete" : "estimated",
        note: "Afeta carga latente e formação de gelo",
      },
      {
        field: "Superaquecimento",
        value: fmtNum(row?.superaquecimentoTotalK ?? 10, "K"),
        status: row?.superaquecimentoTotalK ? "complete" : "estimated",
        note: row?.superaquecimentoTotalK ? "Do catálogo" : "Usando default: 10K (ASHRAE)",
      },
      {
        field: "Espaçamento de Aletas",
        value: fmtNum(evaporator.fin_spacing_mm ?? row?.evaporadorFinSpacingMm, "mm"),
        status: (evaporator.fin_spacing_mm ?? row?.evaporadorFinSpacingMm) ? "complete" : "estimated",
        note: (evaporator.fin_spacing_mm ?? row?.evaporadorFinSpacingMm) ? "Confirmado" : "Usando default: 7mm",
      },
    ];

    // ── Condensador ───────────────────────────────────────────────────────────
    const condFields: FieldCheck[] = [
      {
        field: "Capacidade de Rejeição de Calor",
        value: condenser.heat_rejection_capacity_w
          ? fmtNum(condenser.heat_rejection_capacity_w / 1000, "kW")
          : row?.calorRejeitadoKcalH
          ? fmtNum(row.calorRejeitadoKcalH * KCALH_TO_W / 1000, "kW") + " (catálogo)"
          : "—",
        status: condenser.heat_rejection_capacity_w ? "complete" : row?.calorRejeitadoKcalH ? "estimated" : "critical",
        note: condenser.heat_rejection_capacity_w ? "Confirmado" : row?.calorRejeitadoKcalH ? "Do catálogo" : "Obrigatório para balanço térmico",
      },
      {
        field: "Temperatura Máxima de Condensação",
        value: fmtNum(condenser.max_cond_temp_c ?? row?.tempCondensacaoC, "°C"),
        status: (condenser.max_cond_temp_c ?? row?.tempCondensacaoC) != null ? "complete" : "estimated",
        note: "Limite operacional do condensador",
      },
      {
        field: "Vazão de Ar do Condensador",
        value: fmtNum(row?.vazaoArCondensadorM3H, "m³/h"),
        status: row?.vazaoArCondensadorM3H ? "complete" : "estimated",
        note: row?.vazaoArCondensadorM3H ? "Do catálogo" : "Usando estimativa baseada na capacidade",
      },
      {
        field: "Geometria do Condensador",
        value: row?.condensadorTuboDiametroMm
          ? `Ø${row.condensadorTuboDiametroMm}mm, ${row.condensadorRows ?? "?"}R`
          : "—",
        status: row?.condensadorTuboDiametroMm ? "complete" : "estimated",
        note: row?.condensadorTuboDiametroMm ? "Geometria do catálogo" : "Usando modelo simplificado",
      },
    ];

    // ── Ventiladores ──────────────────────────────────────────────────────────
    const fanFields: FieldCheck[] = [
      {
        field: "Ventilador do Evaporador",
        value: row?.ventiladorEvaporador ?? (row?.vazaoArEvaporadorM3H ? `${fmtNum(row.vazaoArEvaporadorM3H, "m³/h")} (estimado)` : "—"),
        status: row?.ventiladorEvaporador ? "complete" : row?.vazaoArEvaporadorM3H ? "estimated" : "critical",
        note: row?.ventiladorEvaporador ? "Modelo do catálogo" : row?.vazaoArEvaporadorM3H ? "Curva não disponível — usando modo estimado" : "Obrigatório para análise Ventilador×Coil",
      },
      {
        field: "Ventilador do Condensador",
        value: row?.ventiladorCondensador ?? (row?.vazaoArCondensadorM3H ? `${fmtNum(row.vazaoArCondensadorM3H, "m³/h")} (estimado)` : "—"),
        status: row?.ventiladorCondensador ? "complete" : row?.vazaoArCondensadorM3H ? "estimated" : "estimated",
        note: row?.ventiladorCondensador ? "Modelo do catálogo" : "Curva não disponível — usando modo estimado",
      },
      {
        field: "Potência dos Ventiladores",
        value: fmtNum(row?.potenciaVentiladorKw, "kW"),
        status: row?.potenciaVentiladorKw ? "complete" : "estimated",
        note: row?.potenciaVentiladorKw ? "Do catálogo" : "Estimado: 10% da potência total",
      },
    ];

    // ── Elétrica ──────────────────────────────────────────────────────────────
    const elecFields: FieldCheck[] = [
      {
        field: "Tensão / Frequência",
        value: row?.tensaoComercial ?? (row?.tensaoV ? `${row.tensaoV}V/${row.frequenciaHz ?? 60}Hz` : "—"),
        status: (row?.tensaoV ?? row?.tensaoComercial) ? "complete" : "estimated",
        note: (row?.tensaoV ?? row?.tensaoComercial) ? "Do catálogo" : "Não especificado",
      },
      {
        field: "Corrente Nominal",
        value: fmtNum(row?.correnteA, "A"),
        status: row?.correnteA ? "complete" : "estimated",
        note: row?.correnteA ? "Do catálogo" : "Estimado pela potência",
      },
      {
        field: "Corrente de Partida",
        value: fmtNum(row?.correntePartidaA, "A"),
        status: row?.correntePartidaA ? "complete" : "estimated",
        note: row?.correntePartidaA ? "Do catálogo" : "Estimado: 6× corrente nominal",
      },
    ];

    // ── Condições Operacionais ────────────────────────────────────────────────
    const condOpFields: FieldCheck[] = [
      {
        field: "Temperatura Ambiente",
        value: fmtNum(conditions.ambient_temp_c ?? row?.tempAmbienteC, "°C"),
        status: (conditions.ambient_temp_c ?? row?.tempAmbienteC) != null ? "complete" : "estimated",
        note: (conditions.ambient_temp_c ?? row?.tempAmbienteC) != null ? "Confirmado" : "Usando default: 35°C",
      },
      {
        field: "Aplicação",
        value: row?.application ?? "—",
        status: row?.application && row.application !== "unknown" ? "complete" : "estimated",
        note: "HT = Alta Temp, MT = Média Temp, LT = Baixa Temp",
      },
      {
        field: "Refrigerante compatível com aplicação",
        value: (() => {
          const ref = compressor.refrigerant ?? row?.refrigerante ?? "";
          const app = row?.application ?? "";
          const ltRefs = ["R404A", "R507A", "R448A", "R449A", "R452A"];
          const htRefs = ["R134a", "R410A", "R407C", "R1234yf"];
          if (app === "LT" && ltRefs.includes(ref)) return "✓ Compatível";
          if (app === "HT" && htRefs.includes(ref)) return "✓ Compatível";
          if (app === "MT") return "✓ Compatível (MT)";
          return ref ? "Verificar compatibilidade" : "—";
        })(),
        status: "estimated",
        note: "Verificação baseada em aplicação típica — confirmar com fabricante",
      },
    ];

    const groups: GroupCheck[] = [
      {
        group: "Compressor",
        icon: Zap,
        fields: compFields,
        overallStatus: checkStatus(compFields),
        confidence: checkStatus(compFields) === "complete" ? "alta" : checkStatus(compFields) === "estimated" ? "média" : "baixa",
      },
      {
        group: "Evaporador",
        icon: Thermometer,
        fields: evapFields,
        overallStatus: checkStatus(evapFields),
        confidence: checkStatus(evapFields) === "complete" ? "alta" : checkStatus(evapFields) === "estimated" ? "média" : "baixa",
      },
      {
        group: "Condensador",
        icon: Database,
        fields: condFields,
        overallStatus: checkStatus(condFields),
        confidence: checkStatus(condFields) === "complete" ? "alta" : checkStatus(condFields) === "estimated" ? "média" : "baixa",
      },
      {
        group: "Ventiladores",
        icon: Wind,
        fields: fanFields,
        overallStatus: checkStatus(fanFields),
        confidence: checkStatus(fanFields) === "complete" ? "alta" : checkStatus(fanFields) === "estimated" ? "média" : "baixa",
      },
      {
        group: "Elétrica",
        icon: Zap,
        fields: elecFields,
        overallStatus: checkStatus(elecFields),
        confidence: checkStatus(elecFields) === "complete" ? "alta" : "média",
      },
      {
        group: "Condições Operacionais",
        icon: Shield,
        fields: condOpFields,
        overallStatus: checkStatus(condOpFields),
        confidence: checkStatus(condOpFields) === "complete" ? "alta" : "média",
      },
    ];

    return groups;
  }, [machine, compressor, condenser, evaporator, conditions]);

  // ───────────────────────────────────────────────────────────────────────────
  // Validação de Máquina Completa (motor v2 — validateMachine)
  // ───────────────────────────────────────────────────────────────────────────
  const machineValidation = useMemo<
    | { ok: true; report: MachineValidationReport; spec: MachineSpec; components: SystemComponentsInput }
    | { ok: false; missing: string[] }
  >(() => {
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
    const machine_id = machine?.id ?? "current";
    const model = machine?.modelo ?? "Máquina atual";

    const machineSpec: MachineSpec = {
      machine_id,
      model,
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
      return { ok: true, report };
    } catch (e) {
      console.warn("[DataSanityTab] validateMachine falhou:", e);
      return { ok: false, missing: ["Equilíbrio falhou — verifique especificação do evaporador"] };
    }
  }, [machine, compressor, condenser, evaporator, conditions]);

  const finalStatusBadge = (status: "approved" | "conditional" | "rejected") => {
    const map = {
      approved: { label: "APROVADA", className: "bg-emerald-100 text-emerald-700 border-emerald-300" },
      conditional: { label: "CONDICIONAL", className: "bg-amber-100 text-amber-700 border-amber-300" },
      rejected: { label: "REJEITADA", className: "bg-red-100 text-red-700 border-red-300" },
    } as const;
    return map[status];
  };

  const statusIcon = (s: ValidationStatus) => {
    if (s === "pass") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    if (s === "warning") return <AlertCircle className="h-4 w-4 text-amber-500" />;
    return <XCircle className="h-4 w-4 text-red-500" />;
  };

  const fmtVal = (v: number, unit: string) => {
    if (unit === "W") return v >= 1000 ? `${(v / 1000).toFixed(2)} kW` : `${v.toFixed(0)} W`;
    if (unit === "%") return `${v.toFixed(1)}%`;
    if (unit === "°C") return `${v.toFixed(1)} °C`;
    return v.toFixed(3);
  };

  const criticalCount = groups.reduce((s, g) => s + g.fields.filter((f) => f.status === "critical").length, 0);
  const estimatedCount = groups.reduce((s, g) => s + g.fields.filter((f) => f.status === "estimated").length, 0);
  const completeCount = groups.reduce((s, g) => s + g.fields.filter((f) => f.status === "complete").length, 0);
  const totalCount = criticalCount + estimatedCount + completeCount;
  const completePct = totalCount > 0 ? Math.round((completeCount / totalCount) * 100) : 0;

  const overallStatus = criticalCount > 0 ? "critical" : estimatedCount > 0 ? "estimated" : "complete";

  return (
    <div className="space-y-5">
      {/* Resumo geral */}
      <Card className={`border-2 ${overallStatus === "critical" ? "border-red-300 bg-red-50" : overallStatus === "estimated" ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {overallStatus === "critical" ? (
                <XCircle className="h-8 w-8 text-red-500" />
              ) : overallStatus === "estimated" ? (
                <AlertCircle className="h-8 w-8 text-amber-500" />
              ) : (
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              )}
              <div>
                <p className="text-base font-bold text-slate-800">
                  {overallStatus === "critical" ? "Dados Críticos Ausentes" : overallStatus === "estimated" ? "Dados Completos com Estimativas" : "Dados Completos"}
                </p>
                <p className="text-xs text-slate-500">
                  {completeCount} confirmados · {estimatedCount} estimados · {criticalCount} críticos ausentes
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-slate-800">{completePct}%</p>
              <p className="text-xs text-slate-500">completude</p>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="mt-3 h-2.5 rounded-full bg-slate-200">
            <div className="flex h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 transition-all" style={{ width: `${(completeCount / totalCount) * 100}%` }} />
              <div className="bg-amber-400 transition-all" style={{ width: `${(estimatedCount / totalCount) * 100}%` }} />
              <div className="bg-red-400 transition-all" style={{ width: `${(criticalCount / totalCount) * 100}%` }} />
            </div>
          </div>
          <div className="mt-1 flex gap-4 text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" />Completo</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" />Estimado</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-400" />Crítico ausente</span>
          </div>
        </CardContent>
      </Card>

      {criticalCount > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <XCircle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-sm text-red-700">
            <strong>{criticalCount} campo(s) crítico(s) ausente(s).</strong> O SystemSolver completo está bloqueado. Configure os campos marcados em vermelho para habilitar todas as análises.
          </AlertDescription>
        </Alert>
      )}

      {/* Grupos de campos */}
      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map((group) => {
          const Icon = group.icon;
          return (
            <Card key={group.group} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-slate-500" />
                    <CardTitle className="text-sm">{group.group}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${group.confidence === "alta" ? "border-emerald-400 text-emerald-600" : group.confidence === "média" ? "border-amber-400 text-amber-600" : "border-red-400 text-red-600"}`}
                    >
                      Confiança {group.confidence}
                    </Badge>
                    {group.overallStatus === "complete" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : group.overallStatus === "estimated" ? (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {group.fields.map((field, i) => (
                    <div key={i} className={`flex items-start gap-3 px-4 py-2.5 ${field.status === "critical" ? "bg-red-50" : field.status === "estimated" ? "bg-amber-50/50" : ""}`}>
                      {field.status === "complete" ? (
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                      ) : field.status === "estimated" ? (
                        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                      ) : (
                        <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-slate-700">{field.field}</span>
                          <span className={`shrink-0 text-xs font-mono ${field.status === "critical" ? "text-red-600" : field.status === "estimated" ? "text-amber-700" : "text-slate-600"}`}>
                            {field.value}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[10px] text-slate-400">{field.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── Validação de Máquina Completa (motor v2) ───────────────────── */}
      <Card className="border-2 border-slate-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-slate-600" />
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm">Validação de Máquina Completa</CardTitle>
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
                  {machineValidation.ok
                    ? `${machineValidation.report.criteria.length} de ${
                        8 +
                        (conditions.nominal_delta_t_evap_k != null ? 1 : 0) +
                        (conditions.nominal_delta_t_cond_k != null ? 1 : 0)
                      } critérios`
                    : "8 critérios base"}{" "}
                  de aceitação calculados por <code>validateMachine</code> (coldpro_v2).
                </CardDescription>
              </div>
            </div>
            {machineValidation.ok && (() => {
              const b = finalStatusBadge(machineValidation.report.final_status);
              return <Badge variant="outline" className={`${b.className} text-xs`}>{b.label}</Badge>;
            })()}
          </div>
        </CardHeader>
        <CardContent>
          {!machineValidation.ok ? (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-xs text-amber-700">
                <strong>Dados insuficientes para validação completa.</strong> Faltam:
                <ul className="ml-4 mt-1 list-disc">
                  {machineValidation.missing.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {/* Resumo de critérios */}
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  {machineValidation.report.summary.passed} aprovados
                </span>
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                  {machineValidation.report.summary.warnings} avisos
                </span>
                <span className="flex items-center gap-1.5">
                  <XCircle className="h-3.5 w-3.5 text-red-500" />
                  {machineValidation.report.summary.failed} falhas
                </span>
                <span className="ml-auto text-slate-400">
                  Ponto de operação: Te {machineValidation.report.operating_point.evap_temp_c.toFixed(1)} °C ·
                  Tc {machineValidation.report.operating_point.cond_temp_c.toFixed(1)} °C
                </span>
              </div>

              {/* Cards por critério */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {machineValidation.report.criteria.map((c) => (
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
                          {fmtVal(c.calculated_value, c.unit)} <span className="text-slate-400">vs.</span>{" "}
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

              {/* Recomendações consolidadas */}
              {machineValidation.report.recommendations.length > 0 &&
                machineValidation.report.final_status !== "approved" && (
                  <Alert className="border-slate-200 bg-slate-50">
                    <AlertCircle className="h-4 w-4 text-slate-500" />
                    <AlertDescription className="text-xs text-slate-700">
                      <strong>Recomendações de ajuste:</strong>
                      <ul className="ml-4 mt-1 list-disc space-y-0.5">
                        {machineValidation.report.recommendations.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
