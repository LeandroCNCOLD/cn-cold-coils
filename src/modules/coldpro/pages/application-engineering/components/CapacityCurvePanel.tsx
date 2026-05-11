import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateCapacityCurve } from "../services/capacityCurveService";
import type { CapacityCurvePoint } from "../types/app-engineering.types";

const TC_VALUES = [35, 40, 45];
const TC_COLORS = ["#22c55e", "#f97316", "#ef4444"];

interface Props {
  capacity_coefficients: number[];
  power_coefficients: number[];
  onDesignPointSelected: (pt: CapacityCurvePoint) => void;
  designPoint?: CapacityCurvePoint | null;
}

interface ChartDataPoint {
  te_c: number;
  [key: string]: number;
}

export function CapacityCurvePanel({
  capacity_coefficients,
  power_coefficients,
  onDesignPointSelected,
  designPoint,
}: Props) {
  const [selectedTe, setSelectedTe] = useState(-10);
  const [selectedTc, setSelectedTc] = useState(40);

  const { series } = useMemo(
    () =>
      generateCapacityCurve({
        capacity_coefficients,
        power_coefficients,
        te_min_c: -40,
        te_max_c: 15,
        n_points: 56,
        tc_values_c: TC_VALUES,
      }),
    [capacity_coefficients, power_coefficients],
  );

  const capacityData = useMemo<ChartDataPoint[]>(() => {
    const teSet = new Set<number>();
    for (const s of series) {
      for (const p of s.points) teSet.add(Math.round(p.te_c));
    }
    return Array.from(teSet)
      .sort((a, b) => a - b)
      .map((te) => {
        const row: ChartDataPoint = { te_c: te };
        for (const s of series) {
          const pt = s.points.find((p) => Math.round(p.te_c) === te);
          if (pt) {
            row[`Q_${s.tc_c}`] = Math.round(pt.capacity_w / 1000);
            row[`W_${s.tc_c}`] = Math.round(pt.power_w / 1000);
          }
        }
        return row;
      });
  }, [series]);

  const selectedPoint = useMemo<CapacityCurvePoint | null>(() => {
    const s = series.find((s) => s.tc_c === selectedTc);
    if (!s) return null;
    const sorted = [...s.points].sort(
      (a, b) => Math.abs(a.te_c - selectedTe) - Math.abs(b.te_c - selectedTe),
    );
    return sorted[0] ?? null;
  }, [series, selectedTe, selectedTc]);

  const hasCoeffs =
    capacity_coefficients.length >= 10 && power_coefficients.length >= 10;

  if (!hasCoeffs) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-slate-400">
          Selecione um compressor para visualizar a curva de capacidade.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">
          Curva de Capacidade — EN 12900 / ARI 540
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Capacidade Q(Te) */}
        <div>
          <p className="mb-1 text-xs font-medium text-slate-500">
            Capacidade Frigorífica Q [kW] × Te [°C]
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={capacityData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="te_c"
                tick={{ fontSize: 10 }}
                label={{ value: "Te [°C]", position: "insideBottomRight", offset: -4, fontSize: 10 }}
              />
              <YAxis tick={{ fontSize: 10 }} width={40} />
              <Tooltip
                formatter={(v: number, name: string) => [`${v} kW`, name]}
                labelFormatter={(te) => `Te = ${te}°C`}
              />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <ReferenceLine x={selectedTe} stroke="#6366f1" strokeDasharray="4 2" strokeWidth={1.5} />
              {TC_VALUES.map((tc, i) => (
                <Line
                  key={tc}
                  type="monotone"
                  dataKey={`Q_${tc}`}
                  name={`Tc=${tc}°C`}
                  stroke={TC_COLORS[i]}
                  dot={false}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Potência W(Te) */}
        <div>
          <p className="mb-1 text-xs font-medium text-slate-500">
            Potência Absorvida W [kW] × Te [°C]
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={capacityData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="te_c" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} width={40} />
              <Tooltip
                formatter={(v: number, name: string) => [`${v} kW`, name]}
                labelFormatter={(te) => `Te = ${te}°C`}
              />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <ReferenceLine x={selectedTe} stroke="#6366f1" strokeDasharray="4 2" strokeWidth={1.5} />
              {TC_VALUES.map((tc, i) => (
                <Line
                  key={tc}
                  type="monotone"
                  dataKey={`W_${tc}`}
                  name={`Tc=${tc}°C`}
                  stroke={TC_COLORS[i]}
                  dot={false}
                  strokeWidth={1.5}
                  strokeDasharray="4 2"
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Seletor de ponto de projeto */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-xs font-semibold text-slate-700">Ponto de Projeto</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-slate-500">Te [°C]</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={-40}
                  max={15}
                  step={1}
                  value={selectedTe}
                  onChange={(e) => setSelectedTe(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <span className="w-10 text-right text-xs font-mono font-semibold">{selectedTe}°C</span>
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-500">Tc [°C]</label>
              <div className="flex gap-1">
                {TC_VALUES.map((tc, i) => (
                  <button
                    key={tc}
                    onClick={() => setSelectedTc(tc)}
                    className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${
                      selectedTc === tc
                        ? "text-white"
                        : "bg-white text-slate-500 border border-slate-200"
                    }`}
                    style={selectedTc === tc ? { backgroundColor: TC_COLORS[i] } : {}}
                  >
                    {tc}°C
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedPoint && (
            <div className="mt-2 flex items-center justify-between">
              <div className="flex gap-3 text-xs">
                <span>
                  <span className="text-slate-400">Q = </span>
                  <span className="font-semibold text-slate-900">
                    {(selectedPoint.capacity_w / 1000).toFixed(2)} kW
                  </span>
                </span>
                <span>
                  <span className="text-slate-400">W = </span>
                  <span className="font-semibold text-slate-900">
                    {(selectedPoint.power_w / 1000).toFixed(2)} kW
                  </span>
                </span>
                <span>
                  <span className="text-slate-400">COP = </span>
                  <Badge variant="secondary" className="text-[10px]">
                    {selectedPoint.cop.toFixed(2)}
                  </Badge>
                </span>
              </div>
              <Button
                size="sm"
                variant={
                  designPoint?.te_c === selectedPoint.te_c &&
                  designPoint?.tc_c === selectedPoint.tc_c
                    ? "default"
                    : "outline"
                }
                className="h-7 text-xs"
                onClick={() => onDesignPointSelected(selectedPoint)}
              >
                Confirmar Ponto
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
