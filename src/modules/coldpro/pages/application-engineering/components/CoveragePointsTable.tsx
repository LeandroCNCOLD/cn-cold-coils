/**
 * CoveragePointsTable.tsx
 *
 * Tabela de pontos atendidos (Te, Tc, Q_comp, Q_evap, ΔT, atende?).
 * Suporta seletor de unidade vindo do pai.
 */
import type { CoveragePoint } from "../services/evaporatorSearchService";
import { convertPower, fmtBR, type PowerUnit } from "@/utils/unitConversions";
import { CheckCircle2, XCircle } from "lucide-react";

interface Props {
  points: CoveragePoint[];
  unit: PowerUnit;
}

export function CoveragePointsTable({ points, unit }: Props) {
  if (!points.length) return null;
  const digits = unit === "W" || unit === "kcal/h" || unit === "BTU/h" ? 0 : 2;

  return (
    <div className="max-h-[420px] overflow-auto rounded-md border">
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-muted/80 backdrop-blur text-[10px] uppercase text-muted-foreground">
          <tr>
            <th className="px-2 py-1.5 text-left font-medium">Te (°C)</th>
            <th className="px-2 py-1.5 text-left font-medium">Tc (°C)</th>
            <th className="px-2 py-1.5 text-right font-medium">Q comp ({unit})</th>
            <th className="px-2 py-1.5 text-right font-medium">Q evap ({unit})</th>
            <th className="px-2 py-1.5 text-right font-medium">ΔT (K)</th>
            <th className="px-2 py-1.5 text-center font-medium">Atende</th>
          </tr>
        </thead>
        <tbody>
          {points.map((p, i) => (
            <tr key={i} className="border-t border-border/40">
              <td className="px-2 py-1 font-mono">{p.te_c.toFixed(1)}</td>
              <td className="px-2 py-1 font-mono">{p.tc_c.toFixed(1)}</td>
              <td className="px-2 py-1 text-right font-mono">
                {fmtBR(convertPower(p.q_comp_w, unit), digits)}
              </td>
              <td className="px-2 py-1 text-right font-mono">
                {fmtBR(convertPower(p.q_evap_w, unit), digits)}
              </td>
              <td className="px-2 py-1 text-right font-mono">{p.delta_t_k.toFixed(1)}</td>
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
  );
}
