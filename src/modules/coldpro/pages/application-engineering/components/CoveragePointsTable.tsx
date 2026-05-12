/**
 * CoveragePointsTable.tsx
 *
 * Tabela de pontos atendidos com classificação por faixa de capacidade.
 * Abas: Capacidade (com Ratio/Status/Sugestão) | Transferência de Calor | Fluido & Ar
 */
import type { CoveragePoint, PointStatus } from "../services/evaporatorSearchService";
import { convertPower, fmtBR, type PowerUnit } from "@/utils/unitConversions";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";
import { useState } from "react";

interface Props {
  points: CoveragePoint[];
  unit?: PowerUnit;
  /** "evaporator" (padrão) ou "condenser" — altera o label da coluna Q_coil */
  mode?: "evaporator" | "condenser";
}

type ViewMode = "basic" | "thermal" | "fluid";

const VIEW_LABELS: Record<ViewMode, string> = {
  basic: "Capacidade",
  thermal: "Transferência de Calor",
  fluid: "Fluido & Ar",
};

// Cores e ícones por status
const STATUS_CONFIG: Record<
  PointStatus,
  { label: string; rowClass: string; badgeClass: string; icon: React.ReactNode }
> = {
  undersized: {
    label: "Subdim.",
    rowClass: "bg-red-50/60",
    badgeClass: "bg-red-100 text-red-700 border-red-300",
    icon: <XCircle className="h-3 w-3 text-red-600" />,
  },
  low_margin: {
    label: "Margem mín.",
    rowClass: "bg-yellow-50/40",
    badgeClass: "bg-yellow-100 text-yellow-700 border-yellow-300",
    icon: <AlertTriangle className="h-3 w-3 text-yellow-600" />,
  },
  ideal: {
    label: "Ideal",
    rowClass: "",
    badgeClass: "bg-green-100 text-green-700 border-green-300",
    icon: <CheckCircle2 className="h-3 w-3 text-green-600" />,
  },
  acceptable_oversize: {
    label: "Aceitável",
    rowClass: "bg-blue-50/30",
    badgeClass: "bg-blue-100 text-blue-700 border-blue-300",
    icon: <Info className="h-3 w-3 text-blue-500" />,
  },
  oversized: {
    label: "Grande dem.",
    rowClass: "bg-orange-50/40",
    badgeClass: "bg-orange-100 text-orange-700 border-orange-300",
    icon: <AlertTriangle className="h-3 w-3 text-orange-500" />,
  },
};

export function CoveragePointsTable({ points, unit = "kW", mode = "evaporator" }: Props) {
  const [view, setView] = useState<ViewMode>("basic");

  if (!points.length) return null;
  const digits = unit === "W" || unit === "kcal/h" || unit === "BTU/h" ? 0 : 2;
  const qCoilLabel = mode === "condenser" ? `Q rej (${unit})` : `Q evap (${unit})`;

  return (
    <div className="space-y-2">
      {/* Legenda de status */}
      <div className="flex flex-wrap gap-1.5">
        {(Object.entries(STATUS_CONFIG) as [PointStatus, (typeof STATUS_CONFIG)[PointStatus]][]).map(
          ([status, cfg]) => (
            <span
              key={status}
              className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-medium ${cfg.badgeClass}`}
            >
              {cfg.icon}
              {cfg.label}
            </span>
          ),
        )}
      </div>

      {/* Seletor de visão */}
      <div className="flex gap-1">
        {(Object.keys(VIEW_LABELS) as ViewMode[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => setView(v)}
            className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${
              view === v
                ? "bg-indigo-600 text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {VIEW_LABELS[v]}
          </button>
        ))}
      </div>

      <div className="max-h-[420px] overflow-auto rounded-md border">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-muted/80 backdrop-blur text-[10px] uppercase text-muted-foreground">
            <tr>
              <th className="px-2 py-1.5 text-left font-medium">Te (°C)</th>
              <th className="px-2 py-1.5 text-left font-medium">Tc (°C)</th>

              {view === "basic" && (
                <>
                  <th className="px-2 py-1.5 text-right font-medium">{mode === "condenser" ? `Q rej req (${unit})` : `Q req (${unit})`}</th>
                  <th className="px-2 py-1.5 text-right font-medium">{qCoilLabel}</th>
                  <th className="px-2 py-1.5 text-right font-medium">Ratio</th>
                  <th className="px-2 py-1.5 text-center font-medium">Status</th>
                  <th className="px-2 py-1.5 text-left font-medium">Sugestão</th>
                </>
              )}

              {view === "thermal" && (
                <>
                  <th className="px-2 py-1.5 text-right font-medium">U (W/m²K)</th>
                  <th className="px-2 py-1.5 text-right font-medium">η aleta (%)</th>
                  <th className="px-2 py-1.5 text-right font-medium">LMTD (K)</th>
                  <th className="px-2 py-1.5 text-right font-medium">Área (m²)</th>
                  <th className="px-2 py-1.5 text-center font-medium">Status</th>
                </>
              )}

              {view === "fluid" && (
                <>
                  <th className="px-2 py-1.5 text-right font-medium">ΔP ar (Pa)</th>
                  <th className="px-2 py-1.5 text-right font-medium">ΔP fluido (kPa)</th>
                  <th className="px-2 py-1.5 text-right font-medium">V fluido (m/s)</th>
                  <th className="px-2 py-1.5 text-center font-medium">Status</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {points.map((p, i) => {
              const cfg = p.status ? STATUS_CONFIG[p.status] : STATUS_CONFIG.ideal;
              return (
                <tr key={i} className={`border-t border-border/40 ${cfg.rowClass}`}>
                  <td className="px-2 py-1 font-mono">{p.te_c.toFixed(1)}</td>
                  <td className="px-2 py-1 font-mono">{p.tc_c.toFixed(1)}</td>

                  {view === "basic" && (
                    <>
                      <td className="px-2 py-1 text-right font-mono">
                        {fmtBR(convertPower(p.q_comp_w, unit), digits)}
                      </td>
                      <td className="px-2 py-1 text-right font-mono">
                        {fmtBR(convertPower(p.q_evap_w, unit), digits)}
                      </td>
                      <td className="px-2 py-1 text-right font-mono">
                        {p.ratio != null ? `${(p.ratio * 100).toFixed(0)}%` : "—"}
                      </td>
                      <td className="px-2 py-1 text-center">
                        <span
                          className={`inline-flex items-center gap-0.5 rounded border px-1 py-0.5 text-[10px] font-medium ${cfg.badgeClass}`}
                        >
                          {cfg.icon}
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-2 py-1 text-[10px] text-muted-foreground max-w-[200px] truncate">
                        {p.recommendation ?? "—"}
                      </td>
                    </>
                  )}

                  {view === "thermal" && (
                    <>
                      <td className="px-2 py-1 text-right font-mono">
                        {p.u_w_m2k != null ? p.u_w_m2k.toFixed(1) : "—"}
                      </td>
                      <td className="px-2 py-1 text-right font-mono">
                        {p.fin_efficiency != null
                          ? (p.fin_efficiency * 100).toFixed(1)
                          : "—"}
                      </td>
                      <td className="px-2 py-1 text-right font-mono">
                        {p.lmtd_k != null ? p.lmtd_k.toFixed(2) : "—"}
                      </td>
                      <td className="px-2 py-1 text-right font-mono">
                        {p.exchange_area_m2 != null ? p.exchange_area_m2.toFixed(3) : "—"}
                      </td>
                      <td className="px-2 py-1 text-center">
                        <span
                          className={`inline-flex items-center gap-0.5 rounded border px-1 py-0.5 text-[10px] font-medium ${cfg.badgeClass}`}
                        >
                          {cfg.icon}
                          {cfg.label}
                        </span>
                      </td>
                    </>
                  )}

                  {view === "fluid" && (
                    <>
                      <td className="px-2 py-1 text-right font-mono">
                        {p.air_pressure_drop_pa != null
                          ? p.air_pressure_drop_pa.toFixed(1)
                          : "—"}
                      </td>
                      <td className="px-2 py-1 text-right font-mono">
                        {p.fluid_pressure_drop_kpa != null
                          ? p.fluid_pressure_drop_kpa.toFixed(2)
                          : "—"}
                      </td>
                      <td className="px-2 py-1 text-right font-mono">
                        {p.fluid_velocity_ms != null
                          ? p.fluid_velocity_ms.toFixed(3)
                          : "—"}
                      </td>
                      <td className="px-2 py-1 text-center">
                        <span
                          className={`inline-flex items-center gap-0.5 rounded border px-1 py-0.5 text-[10px] font-medium ${cfg.badgeClass}`}
                        >
                          {cfg.icon}
                          {cfg.label}
                        </span>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
