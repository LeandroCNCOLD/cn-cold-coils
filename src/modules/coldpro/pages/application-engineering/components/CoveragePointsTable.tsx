/**
 * CoveragePointsTable.tsx
 *
 * Tabela de pontos atendidos com todos os campos detalhados do motor:
 * Te, Tc, Q_comp, Q_evap, DeltaT, U, eta_aleta, DeltaP_ar, DeltaP_fluido, V_fluido, Area, LMTD, Atende.
 */
import type { CoveragePoint } from "../services/evaporatorSearchService";
import { convertPower, fmtBR, type PowerUnit } from "@/utils/unitConversions";
import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

interface Props {
  points: CoveragePoint[];
  unit: PowerUnit;
}

type ViewMode = "basic" | "thermal" | "fluid";

const VIEW_LABELS: Record<ViewMode, string> = {
  basic: "Capacidade",
  thermal: "Transferencia de Calor",
  fluid: "Fluido & Ar",
};

export function CoveragePointsTable({ points, unit }: Props) {
  const [view, setView] = useState<ViewMode>("basic");

  const digits = unit === "W" || unit === "kcal/h" || unit === "BTU/h" ? 0 : 2;

  return (
    <div className="space-y-2">
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
              <th className="px-2 py-1.5 text-left font-medium">Te (grC)</th>
              <th className="px-2 py-1.5 text-left font-medium">Tc (grC)</th>
              {view === "basic" && (
                <>
                  <th className="px-2 py-1.5 text-right font-medium">Q comp ({unit})</th>
                  <th className="px-2 py-1.5 text-right font-medium">Q evap ({unit})</th>
                  <th className="px-2 py-1.5 text-right font-medium">DeltaT (K)</th>
                </>
              )}
              {view === "thermal" && (
                <>
                  <th className="px-2 py-1.5 text-right font-medium">U (W/m2K)</th>
                  <th className="px-2 py-1.5 text-right font-medium">eta aleta (%)</th>
                  <th className="px-2 py-1.5 text-right font-medium">LMTD (K)</th>
                  <th className="px-2 py-1.5 text-right font-medium">Area (m2)</th>
                </>
              )}
              {view === "fluid" && (
                <>
                  <th className="px-2 py-1.5 text-right font-medium">DeltaP ar (Pa)</th>
                  <th className="px-2 py-1.5 text-right font-medium">DeltaP fluido (kPa)</th>
                  <th className="px-2 py-1.5 text-right font-medium">V fluido (m/s)</th>
                </>
              )}
              <th className="px-2 py-1.5 text-center font-medium">Atende</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p, i) => (
              <tr
                key={i}
                className={`border-t border-border/40 ${p.meets ? "" : "bg-red-50/30"}`}
              >
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
                    <td className="px-2 py-1 text-right font-mono">{p.delta_t_k.toFixed(1)}</td>
                  </>
                )}
                {view === "thermal" && (
                  <>
                    <td className="px-2 py-1 text-right font-mono">
                      {p.u_w_m2k != null ? p.u_w_m2k.toFixed(1) : "—"}
                    </td>
                    <td className="px-2 py-1 text-right font-mono">
                      {p.fin_efficiency != null ? (p.fin_efficiency * 100).toFixed(1) : "—"}
                    </td>
                    <td className="px-2 py-1 text-right font-mono">
                      {p.lmtd_k != null ? p.lmtd_k.toFixed(2) : "—"}
                    </td>
                    <td className="px-2 py-1 text-right font-mono">
                      {p.exchange_area_m2 != null ? p.exchange_area_m2.toFixed(3) : "—"}
                    </td>
                  </>
                )}
                {view === "fluid" && (
                  <>
                    <td className="px-2 py-1 text-right font-mono">
                      {p.air_pressure_drop_pa != null ? p.air_pressure_drop_pa.toFixed(1) : "—"}
                    </td>
                    <td className="px-2 py-1 text-right font-mono">
                      {p.fluid_pressure_drop_kpa != null ? p.fluid_pressure_drop_kpa.toFixed(2) : "—"}
                    </td>
                    <td className="px-2 py-1 text-right font-mono">
                      {p.fluid_velocity_ms != null ? p.fluid_velocity_ms.toFixed(3) : "—"}
                    </td>
                  </>
                )}
                <td className="px-2 py-1 text-center">
                  {p.meets ? (
                    <CheckCircle2 className="mx-auto h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <XCircle className="mx-auto h-3.5 w-3.5 text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
