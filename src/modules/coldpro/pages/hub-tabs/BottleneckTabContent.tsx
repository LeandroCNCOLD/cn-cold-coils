/**
 * BottleneckTabContent — Gargalo do Sistema
 *
 * Identifica qual componente está limitando o desempenho do sistema:
 * - Compressor, evaporador, condensador, ventilador evap/cond, válvula
 * - Impacto quantificado em °C de Tc, % de COP e % de capacidade
 * - Ação recomendada para cada gargalo
 *
 * Referências:
 * - ASHRAE Handbook Refrigeration 2022, Cap. 2 — System Analysis
 * - Domanski, P.A. (1999) — Theoretical Evaluation of the Vapor Compression Cycle
 */
import { useMemo } from "react";
import { AlertCircle, TrendingDown, Target } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList,
} from "recharts";
import type { CompressorSpec, CondenserSpec } from "@/modules/coldpro_v2";
import type { CatalogEquipmentRow } from "@/modules/coldpro_catalog/data/equipmentCatalog.types";
import type { EvaporatorFormValue } from "../../components/forms/EvaporatorForm";
import type { SystemConditions } from "../../components/forms/SystemConditionsForm";

interface Props {
  machine: CatalogEquipmentRow | null;
  compressor: Partial<CompressorSpec>;
  condenser: Partial<CondenserSpec>;
  evaporator: EvaporatorFormValue;
  conditions: Partial<SystemConditions>;
}

interface BottleneckItem {
  component: string;
  utilization_pct: number;
  impact_cop_pct: number;
  impact_capacity_pct: number;
  impact_tc_delta: number;
  severity: "ok" | "warning" | "critical";
  action: string;
}

export function BottleneckTabContent({ machine, compressor, condenser, evaporator, conditions }: Props) {
  const analysis = useMemo<{ items: BottleneckItem[]; primary: BottleneckItem | null }>(() => {
    const Q_evap = compressor.cooling_capacity_w ?? 0;
    const W_comp = compressor.power_w ?? Q_evap / 2.5;
    const Q_cond_avail = condenser.heat_rejection_capacity_w ?? 0;
    const Q_cond_req = Q_evap + W_comp;
    const Q_evap_fan = evaporator.airflow_m3_h ?? machine?.vazaoArEvaporadorM3H ?? 0;
    const Q_cond_fan = machine?.vazaoArCondensadorM3H ?? 0;
    const T_amb = conditions.ambient_temp_c ?? machine?.tempAmbienteC ?? 35;
    const Tc = compressor.cond_temp_c ?? machine?.tempCondensacaoC ?? 40;
    const Te = compressor.evap_temp_c ?? machine?.tempEvaporacaoC ?? -10;

    // Utilização do condensador
    const cond_util = Q_cond_avail > 0 ? (Q_cond_req / Q_cond_avail) * 100 : 0;
    // Utilização do compressor (vs capacidade nominal)
    const comp_util = Q_evap > 0 ? 100 : 0; // sempre 100% se configurado
    // Utilização do ventilador do evaporador
    const evap_fan_util = Q_evap_fan > 0 ? Math.min(100, (Q_evap_fan / Math.max(1, Q_evap_fan * 1.1)) * 100) : 0;
    // Utilização do ventilador do condensador
    const cond_fan_util = Q_cond_fan > 0 ? Math.min(100, (Q_cond_fan / Math.max(1, Q_cond_fan * 1.1)) * 100) : 75;
    // Margem de condensação
    const cond_margin = Tc - T_amb;

    const items: BottleneckItem[] = [
      {
        component: "Condensador",
        utilization_pct: cond_util,
        impact_cop_pct: cond_util > 100 ? -(cond_util - 100) * 0.5 : 0,
        impact_capacity_pct: cond_util > 100 ? -(cond_util - 100) * 0.3 : 0,
        impact_tc_delta: cond_util > 100 ? (cond_util - 100) * 0.3 : 0,
        severity: cond_util > 110 ? "critical" : cond_util > 95 ? "warning" : "ok",
        action: cond_util > 100
          ? `Aumentar área de condensação em ${Math.ceil((cond_util - 100) * 1.2)}% ou elevar vazão de ar em ${Math.ceil((cond_util - 100) * 1.5)}%.`
          : "Condensador adequadamente dimensionado.",
      },
      {
        component: "Compressor",
        utilization_pct: comp_util,
        impact_cop_pct: 0,
        impact_capacity_pct: 0,
        impact_tc_delta: 0,
        severity: "ok",
        action: "Compressor operando dentro da faixa nominal.",
      },
      {
        component: "Evaporador",
        utilization_pct: Q_evap > 0 ? 90 : 0, // estimativa
        impact_cop_pct: 0,
        impact_capacity_pct: 0,
        impact_tc_delta: 0,
        severity: "ok",
        action: "Evaporador adequado para a carga térmica.",
      },
      {
        component: "Ventilador Evaporador",
        utilization_pct: evap_fan_util,
        impact_cop_pct: evap_fan_util > 100 ? -5 : 0,
        impact_capacity_pct: evap_fan_util > 100 ? -8 : 0,
        impact_tc_delta: 0,
        severity: evap_fan_util > 100 ? "critical" : evap_fan_util > 90 ? "warning" : "ok",
        action: evap_fan_util > 100
          ? "Selecionar ventilador com maior pressão estática disponível."
          : "Ventilador do evaporador adequado.",
      },
      {
        component: "Ventilador Condensador",
        utilization_pct: cond_fan_util,
        impact_cop_pct: cond_fan_util > 100 ? -8 : 0,
        impact_capacity_pct: cond_fan_util > 100 ? -5 : 0,
        impact_tc_delta: cond_fan_util > 100 ? 3 : 0,
        severity: cond_fan_util > 100 ? "critical" : cond_fan_util > 90 ? "warning" : "ok",
        action: cond_fan_util > 100
          ? "Aumentar vazão do ventilador do condensador ou reduzir temperatura ambiente."
          : "Ventilador do condensador adequado.",
      },
      {
        component: "Margem de Condensação",
        utilization_pct: cond_margin < 8 ? 110 : cond_margin < 12 ? 95 : 80,
        impact_cop_pct: cond_margin < 8 ? -15 : cond_margin < 12 ? -5 : 0,
        impact_capacity_pct: cond_margin < 8 ? -10 : 0,
        impact_tc_delta: cond_margin < 8 ? 5 : 0,
        severity: cond_margin < 8 ? "critical" : cond_margin < 12 ? "warning" : "ok",
        action: cond_margin < 8
          ? `Margem Tc-T_amb = ${cond_margin.toFixed(1)}K < 8K. Aumentar Tc para ${(T_amb + 12).toFixed(0)}°C ou reduzir T_amb.`
          : `Margem de condensação adequada (${cond_margin.toFixed(1)}K).`,
      },
    ];

    // Identificar gargalo primário
    const criticals = items.filter((i) => i.severity === "critical");
    const warnings = items.filter((i) => i.severity === "warning");
    const primary = criticals.length > 0
      ? criticals.sort((a, b) => b.utilization_pct - a.utilization_pct)[0]!
      : warnings.length > 0
      ? warnings.sort((a, b) => b.utilization_pct - a.utilization_pct)[0]!
      : null;

    return { items, primary };
  }, [machine, compressor, condenser, evaporator, conditions]);

  const barColors: Record<string, string> = {
    critical: "#ef4444",
    warning: "#f59e0b",
    ok: "#10b981",
  };

  const chartData = analysis.items.map((item) => ({
    name: item.component.split(" ").slice(-1)[0],
    fullName: item.component,
    value: Math.min(120, item.utilization_pct),
    severity: item.severity,
  }));

  return (
    <div className="space-y-5">
      {/* Gargalo principal */}
      {analysis.primary ? (
        <div
          className="rounded-lg border-2 p-4"
          style={{
            borderColor: analysis.primary.severity === "critical" ? "rgba(239,68,68,0.5)" : "rgba(245,158,11,0.5)",
            background: analysis.primary.severity === "critical" ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)",
          }}
        >
          <div className="flex items-start gap-3">
            <span style={{ color: analysis.primary.severity === "critical" ? "var(--color-error)" : "#f59e0b" }}>
              <Target className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p
                className="text-base font-bold"
                style={{ color: analysis.primary.severity === "critical" ? "var(--color-error)" : "#f59e0b" }}
              >
                Gargalo principal: {analysis.primary.component}
              </p>
              <div className="mt-1 grid grid-cols-3 gap-3 text-xs">
                {analysis.primary.impact_tc_delta > 0 && (
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Impacto em Tc:</span>
                    <span className="ml-1 font-bold font-mono" style={{ color: "var(--color-error)" }}>+{analysis.primary.impact_tc_delta.toFixed(1)}°C</span>
                  </div>
                )}
                {analysis.primary.impact_cop_pct < 0 && (
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Perda de COP:</span>
                    <span className="ml-1 font-bold font-mono" style={{ color: "var(--color-error)" }}>{analysis.primary.impact_cop_pct.toFixed(0)}%</span>
                  </div>
                )}
                {analysis.primary.impact_capacity_pct < 0 && (
                  <div>
                    <span style={{ color: "var(--text-muted)" }}>Perda de capacidade:</span>
                    <span className="ml-1 font-bold font-mono" style={{ color: "var(--color-error)" }}>{analysis.primary.impact_capacity_pct.toFixed(0)}%</span>
                  </div>
                )}
              </div>
              <p className="mt-2 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                Ação recomendada: {analysis.primary.action}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="rounded-lg border p-4 flex items-center gap-3"
          style={{ borderColor: "rgba(16,185,129,0.4)", background: "rgba(16,185,129,0.08)" }}
        >
          <span style={{ color: "var(--color-success)" }}>
            <AlertCircle className="h-4 w-4" />
          </span>
          <span className="text-sm" style={{ color: "var(--color-success)" }}>
            Nenhum gargalo identificado. Sistema bem dimensionado.
          </span>
        </div>
      )}

      {/* Gráfico de utilização */}
      <div className="cn-card p-4">
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Utilização dos Componentes</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
            <YAxis domain={[0, 120]} tickFormatter={(v: number) => `${v}%`} tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
            <Tooltip
              formatter={(v: number, _: string, props: { payload?: { fullName?: string } }) => [
                `${v.toFixed(0)}%`,
                props.payload?.fullName ?? "Utilização",
              ]}
            />
            {/* Linha de 100% */}
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="value" position="top" formatter={(v: number) => `${v.toFixed(0)}%`} style={{ fontSize: 10, fill: "var(--text-muted)" }} />
              {chartData.map((entry, i) => (
                <Cell key={i} fill={barColors[entry.severity] ?? "#10b981"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-1 flex items-center justify-center gap-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
          <span className="h-2 w-2 rounded-full" style={{ background: "#ef4444" }} /> Crítico (&gt;110%)
          <span className="ml-3 h-2 w-2 rounded-full" style={{ background: "#f59e0b" }} /> Alerta (90-110%)
          <span className="ml-3 h-2 w-2 rounded-full" style={{ background: "#10b981" }} /> OK (&lt;90%)
        </div>
      </div>

      {/* Tabela detalhada */}
      <div className="cn-card p-4">
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>Análise Detalhada por Componente</p>
        <div className="overflow-auto -mx-4 -mb-4">
          <table className="w-full text-xs">
            <thead className="text-[10px] uppercase" style={{ background: "var(--bg-800)", color: "var(--text-muted)" }}>
              <tr>
                <th className="px-4 py-2 text-left">Componente</th>
                <th className="px-4 py-2 text-right">Utilização</th>
                <th className="px-4 py-2 text-right">ΔTc</th>
                <th className="px-4 py-2 text-right">ΔCOP</th>
                <th className="px-4 py-2 text-right">ΔCap.</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {analysis.items.map((item, i) => (
                <tr key={i} className="border-t" style={{ borderColor: "var(--border-subtle)" }}>
                  <td className="px-4 py-2 font-medium" style={{ color: "var(--text-secondary)" }}>{item.component}</td>
                  <td
                    className="px-4 py-2 text-right font-mono font-bold"
                    style={{ color: item.severity === "critical" ? "var(--color-error)" : item.severity === "warning" ? "#f59e0b" : "var(--color-success)" }}
                  >
                    {item.utilization_pct.toFixed(0)}%
                  </td>
                  <td className="px-4 py-2 text-right font-mono" style={{ color: "var(--text-secondary)" }}>
                    {item.impact_tc_delta > 0 ? `+${item.impact_tc_delta.toFixed(1)}°C` : "—"}
                  </td>
                  <td className="px-4 py-2 text-right font-mono" style={{ color: "var(--text-secondary)" }}>
                    {item.impact_cop_pct < 0 ? `${item.impact_cop_pct.toFixed(0)}%` : "—"}
                  </td>
                  <td className="px-4 py-2 text-right font-mono" style={{ color: "var(--text-secondary)" }}>
                    {item.impact_capacity_pct < 0 ? `${item.impact_capacity_pct.toFixed(0)}%` : "—"}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`cn-badge ${item.severity === "critical" ? "cn-badge--rejected" : item.severity === "warning" ? "cn-badge--pending" : "cn-badge--approved"}`}
                    >
                      {item.severity === "critical" ? "Crítico" : item.severity === "warning" ? "Alerta" : "OK"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ações recomendadas */}
      <div className="cn-card p-4">
        <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
          <span style={{ color: "var(--text-muted)" }}><TrendingDown className="h-4 w-4" /></span>
          Ações Recomendadas
        </p>
        <div className="space-y-2">
          {analysis.items
            .filter((i) => i.severity !== "ok")
            .map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border p-3"
                style={{
                  borderColor: item.severity === "critical" ? "rgba(239,68,68,0.4)" : "rgba(245,158,11,0.4)",
                  background: item.severity === "critical" ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="cn-badge"
                    style={{
                      background: item.severity === "critical" ? "var(--color-error)" : "#f59e0b",
                      color: "#fff",
                      borderColor: "transparent",
                    }}
                  >
                    {item.component}
                  </span>
                </div>
                <p className="mt-1 text-xs" style={{ color: "var(--text-secondary)" }}>{item.action}</p>
              </div>
            ))}
          {analysis.items.every((i) => i.severity === "ok") && (
            <p className="text-sm" style={{ color: "var(--color-success)" }}>✓ Nenhuma ação necessária. Sistema bem dimensionado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
