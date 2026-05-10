/**
 * CapacityCurvePanel
 *
 * Painel de Curva de Capacidade do Compressor.
 * O engenheiro configura:
 *  - Range de Te (min/max)
 *  - Número de pontos (3–50)
 *  - Até 4 temperaturas de Tc para comparar curvas
 *  - Frequência de operação (50/60 Hz)
 *
 * Exibe:
 *  - Gráfico de Q_evap vs Te (múltiplas curvas por Tc)
 *  - Gráfico de COP vs Te
 *  - Tabela de pontos com destaque para ponto de projeto e melhor COP
 *  - Ponto crítico (Te_min, Tc_max) destacado
 */

import { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine, Dot,
} from "recharts";
import { generateCapacityCurve } from "../services/capacityCurveService";
import type { CapacityCurveConfig, CapacityCurvePoint } from "../services/capacityCurveService";

// ── Props ────────────────────────────────────────────────────────────────────

interface Props {
  /** Coeficientes EN12900 de capacidade [c1..c10] */
  capacity_coefficients: number[];
  /** Coeficientes EN12900 de potência [c1..c10] */
  power_coefficients: number[];
  /** Callback quando o ponto de projeto é selecionado */
  onDesignPointSelected?: (point: CapacityCurvePoint) => void;
}

// ── Cores das curvas ─────────────────────────────────────────────────────────

const CURVE_COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

// ── Componente ───────────────────────────────────────────────────────────────

export function CapacityCurvePanel({ capacity_coefficients, power_coefficients, onDesignPointSelected }: Props) {
  // Configuração da curva
  const [teMin, setTeMin] = useState(-40);
  const [teMax, setTeMax] = useState(-5);
  const [nPoints, setNPoints] = useState(15);
  const [tcValues, setTcValues] = useState<number[]>([35, 40, 45]);
  const [tcInput, setTcInput] = useState("35, 40, 45");
  const [frequency, setFrequency] = useState<50 | 60>(60);
  const [activeChart, setActiveChart] = useState<"capacity" | "cop" | "power">("capacity");

  // Calcular curva
  const result = useMemo(() => {
    if (capacity_coefficients.length < 10 || power_coefficients.length < 10) return null;
    const config: CapacityCurveConfig = {
      capacity_coefficients,
      power_coefficients,
      te_min_c: teMin,
      te_max_c: teMax,
      n_points: nPoints,
      tc_values_c: tcValues,
      frequency_hz: frequency,
    };
    return generateCapacityCurve(config);
  }, [capacity_coefficients, power_coefficients, teMin, teMax, nPoints, tcValues, frequency]);

  // Preparar dados para o gráfico (flatten por Te)
  const chartData = useMemo(() => {
    if (!result) return [];
    const byTe: Record<number, Record<string, number>> = {};
    for (const serie of result.series) {
      for (const pt of serie.points) {
        if (!byTe[pt.te_c]) byTe[pt.te_c] = { te: pt.te_c };
        byTe[pt.te_c][`Q_${serie.tc_c}`] = pt.capacity_w / 1000;
        byTe[pt.te_c][`COP_${serie.tc_c}`] = pt.cop;
        byTe[pt.te_c][`W_${serie.tc_c}`] = pt.power_w / 1000;
      }
    }
    return Object.values(byTe).sort((a, b) => a.te - b.te);
  }, [result]);

  const parseTcValues = (raw: string) => {
    const vals = raw.split(",").map((s) => parseFloat(s.trim())).filter((v) => !isNaN(v) && v > 0 && v < 80);
    if (vals.length > 0 && vals.length <= 4) setTcValues(vals);
  };

  const hasCoeffs = capacity_coefficients.length >= 10 && power_coefficients.length >= 10;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Curva de Capacidade do Compressor</h3>
        {result && (
          <span className="text-xs text-slate-500">
            {result.total_points} pontos calculados
          </span>
        )}
      </div>

      {!hasCoeffs && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          Selecione um compressor com coeficientes EN12900 para gerar a curva de capacidade.
        </div>
      )}

      {/* Configuração */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Configuração da Varredura
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {/* Te min */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Te mín. (°C)</label>
            <input
              type="number"
              value={teMin}
              onChange={(e) => setTeMin(parseFloat(e.target.value) || -40)}
              className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
          {/* Te max */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Te máx. (°C)</label>
            <input
              type="number"
              value={teMax}
              onChange={(e) => setTeMax(parseFloat(e.target.value) || -5)}
              className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>
          {/* N pontos */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Pontos: <span className="font-bold text-blue-600">{nPoints}</span>
            </label>
            <input
              type="range"
              min={3}
              max={50}
              value={nPoints}
              onChange={(e) => setNPoints(parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
          {/* Frequência */}
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Frequência</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(parseInt(e.target.value) as 50 | 60)}
              className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option value={60}>60 Hz</option>
              <option value={50}>50 Hz</option>
            </select>
          </div>
        </div>
        {/* Tc values */}
        <div className="mt-3">
          <label className="mb-1 block text-xs font-medium text-slate-700">
            Temperaturas de condensação Tc (°C) — até 4 valores separados por vírgula
          </label>
          <input
            type="text"
            value={tcInput}
            onChange={(e) => {
              setTcInput(e.target.value);
              parseTcValues(e.target.value);
            }}
            placeholder="Ex: 35, 40, 45, 50"
            className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />
          <div className="mt-1 flex gap-2">
            {tcValues.map((tc, i) => (
              <span key={i} className="rounded-full px-2 py-0.5 text-xs font-medium text-white" style={{ backgroundColor: CURVE_COLORS[i] }}>
                Tc = {tc}°C
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Seletor de gráfico */}
      {result && (
        <div className="flex gap-1 rounded-lg border border-slate-200 bg-white p-1">
          {(["capacity", "cop", "power"] as const).map((chart) => (
            <button
              key={chart}
              onClick={() => setActiveChart(chart)}
              className={`flex-1 rounded px-3 py-1.5 text-xs font-medium transition-colors ${
                activeChart === chart
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {chart === "capacity" ? "Q_evap (kW)" : chart === "cop" ? "COP" : "Potência (kW)"}
            </button>
          ))}
        </div>
      )}

      {/* Gráfico */}
      {result && chartData.length > 0 && (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="te"
                tickFormatter={(v) => `${v}°C`}
                label={{ value: "Te (°C)", position: "insideBottom", offset: -5, fontSize: 11 }}
              />
              <YAxis
                tickFormatter={(v) => v.toFixed(1)}
                label={{
                  value: activeChart === "capacity" ? "kW" : activeChart === "cop" ? "COP" : "kW",
                  angle: -90, position: "insideLeft", offset: 10, fontSize: 11,
                }}
              />
              <Tooltip
                formatter={(value: number, name: string) => {
                  const tc = name.split("_")[1];
                  const label = activeChart === "cop" ? `COP @ Tc=${tc}°C` : `${activeChart === "capacity" ? "Q" : "W"} @ Tc=${tc}°C`;
                  return [value.toFixed(2), label];
                }}
                labelFormatter={(v) => `Te = ${v}°C`}
              />
              <Legend formatter={(v) => {
                const tc = v.split("_")[1];
                return `Tc = ${tc}°C`;
              }} />
              {/* Linha de referência no ponto de projeto */}
              {result.design_point && (
                <ReferenceLine
                  x={result.design_point.te_c}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  label={{ value: "Projeto", position: "top", fontSize: 10, fill: "#ef4444" }}
                />
              )}
              {result.series.map((serie, i) => {
                const key = activeChart === "capacity" ? `Q_${serie.tc_c}` : activeChart === "cop" ? `COP_${serie.tc_c}` : `W_${serie.tc_c}`;
                return (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={CURVE_COLORS[i % CURVE_COLORS.length]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Ponto de projeto e melhor COP */}
      {result && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Ponto crítico */}
          {result.design_point && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-red-700">Ponto Crítico (Te_min + Tc_max)</span>
                <button
                  onClick={() => onDesignPointSelected?.(result.design_point!)}
                  className="rounded bg-red-600 px-2 py-0.5 text-xs font-medium text-white hover:bg-red-700"
                >
                  Usar este ponto
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-slate-500">Te:</span> <strong>{result.design_point.te_c.toFixed(1)}°C</strong></div>
                <div><span className="text-slate-500">Tc:</span> <strong>{result.design_point.tc_c.toFixed(1)}°C</strong></div>
                <div><span className="text-slate-500">Q_evap:</span> <strong>{(result.design_point.capacity_w / 1000).toFixed(2)} kW</strong></div>
                <div><span className="text-slate-500">W_shaft:</span> <strong>{(result.design_point.power_w / 1000).toFixed(2)} kW</strong></div>
                <div><span className="text-slate-500">COP:</span> <strong>{result.design_point.cop.toFixed(3)}</strong></div>
                <div><span className="text-slate-500">Q_rej:</span> <strong>{(result.design_point.heat_rejection_w / 1000).toFixed(2)} kW</strong></div>
              </div>
            </div>
          )}
          {/* Melhor COP */}
          {result.best_cop_point && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-green-700">Ponto de Melhor COP</span>
                <button
                  onClick={() => onDesignPointSelected?.(result.best_cop_point!)}
                  className="rounded bg-green-600 px-2 py-0.5 text-xs font-medium text-white hover:bg-green-700"
                >
                  Usar este ponto
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-slate-500">Te:</span> <strong>{result.best_cop_point.te_c.toFixed(1)}°C</strong></div>
                <div><span className="text-slate-500">Tc:</span> <strong>{result.best_cop_point.tc_c.toFixed(1)}°C</strong></div>
                <div><span className="text-slate-500">Q_evap:</span> <strong>{(result.best_cop_point.capacity_w / 1000).toFixed(2)} kW</strong></div>
                <div><span className="text-slate-500">W_shaft:</span> <strong>{(result.best_cop_point.power_w / 1000).toFixed(2)} kW</strong></div>
                <div><span className="text-slate-500">COP:</span> <strong className="text-green-700">{result.best_cop_point.cop.toFixed(3)}</strong></div>
                <div><span className="text-slate-500">Q_rej:</span> <strong>{(result.best_cop_point.heat_rejection_w / 1000).toFixed(2)} kW</strong></div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Avisos */}
      {result && result.warnings.length > 0 && (
        <div className="space-y-1">
          {result.warnings.map((w, i) => (
            <div key={i} className="rounded border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs text-amber-800">
              ⚠ {w}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
