/**
 * MonteCarloTabContent — Análise de Incerteza por Simulação de Monte Carlo
 *
 * Exibe:
 * - Bandas de confiança (IC 90%) para capacidade, COP, EER, ΔP e U
 * - Histograma de distribuição da capacidade
 * - Ranking de sensibilidade por parâmetro
 * - Métricas de incerteza relativa
 *
 * Referências:
 * - ASHRAE Handbook Fundamentals 2021, Cap. 4 — Uncertainty Analysis
 * - JCGM 100:2008 (GUM) — Evaluation of measurement data
 */
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { Loader2, AlertCircle, Activity } from "lucide-react";
import type { MonteCarloResult } from "../../stores/useTestHubStore";

interface Props {
  result: MonteCarloResult | null;
  loading: boolean;
  error: string | null;
}

// ── Componente de banda de confiança ─────────────────────────────────────────
function ConfidenceBand({
  label,
  nominal,
  lower,
  upper,
  stdDev,
  unit,
  confidenceLevel,
}: {
  label: string;
  nominal: number;
  lower: number;
  upper: number;
  stdDev: number;
  unit: string;
  confidenceLevel: number;
}) {
  const cv = stdDev / Math.max(1e-9, Math.abs(nominal)) * 100;
  const lowerPct = (lower / nominal - 1) * 100;
  const upperPct = (upper / nominal - 1) * 100;
  const severity = cv > 15 ? "critical" : cv > 8 ? "warning" : "ok";

  const fmt = (v: number) => {
    if (Math.abs(v) >= 1000) return (v / 1000).toFixed(2) + " k";
    return v.toFixed(2);
  };

  const severityColor =
    severity === "critical" ? "var(--color-error)" :
    severity === "warning" ? "#f59e0b" :
    "var(--color-success)";

  const barBg =
    severity === "critical" ? "rgba(239,68,68,0.25)" :
    severity === "warning" ? "rgba(245,158,11,0.25)" :
    "rgba(34,197,94,0.25)";

  return (
    <div className="cn-card p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</p>
          <p className="text-xl font-bold font-mono" style={{ color: "var(--text-primary)" }}>
            {fmt(nominal)} <span className="text-sm font-normal" style={{ color: "var(--text-muted)" }}>{unit}</span>
          </p>
        </div>
        <span className="cn-badge text-[10px]" style={{ borderColor: severityColor, color: severityColor }}>
          CV = {cv.toFixed(1)}%
        </span>
      </div>

      {/* Barra visual da banda */}
      <div className="mt-3 space-y-1">
        <div className="flex justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
          <span>IC {(confidenceLevel * 100).toFixed(0)}%: {fmt(lower)} — {fmt(upper)} {unit}</span>
          <span>σ = {fmt(stdDev)} {unit}</span>
        </div>
        <div className="relative h-4 rounded-full" style={{ background: "var(--bg-800)" }}>
          <div
            className="absolute h-4 rounded-full"
            style={{
              background: barBg,
              left: `${Math.max(0, (lowerPct + 50) / 100 * 100)}%`,
              width: `${Math.min(100, (upperPct - lowerPct) / 100 * 100)}%`,
            }}
          />
          {/* Linha do nominal */}
          <div className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-0.5" style={{ background: "var(--text-primary)" }} />
        </div>
        <div className="flex justify-between text-[10px]" style={{ color: "var(--text-muted)" }}>
          <span>{lowerPct.toFixed(1)}%</span>
          <span>Nominal</span>
          <span>+{upperPct.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export function MonteCarloTabContent({ result, loading, error }: Props) {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center gap-3" style={{ color: "var(--text-muted)" }}>
        <Loader2 className="h-6 w-6 animate-spin text-[#1E6FD9]" />
        <span className="text-sm">Executando {500} simulações Monte Carlo...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-start gap-3 rounded-lg border px-4 py-3" style={{ borderColor: "var(--color-error)", background: "var(--bg-800)" }}>
        <span style={{ color: "var(--color-error)" }}><AlertCircle className="h-4 w-4" /></span>
        <p className="text-sm" style={{ color: "var(--color-error)" }}>{error}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex h-64 items-center justify-center text-sm" style={{ color: "var(--text-muted)" }}>
        Configure e selecione uma máquina para executar a análise de Monte Carlo.
      </div>
    );
  }

  const { capacity, cop, eer, airPressureDrop, overallU, histogram, sensitivityRanking, samples, confidenceLevel, computeTimeMs } = result;

  // Normalizar histograma para porcentagem
  const totalSamples = histogram.reduce((s, b) => s + b.count, 0);
  const histData = histogram.map((b) => ({
    bin: b.bin / 1000, // kW
    pct: (b.count / totalSamples) * 100,
  }));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 rounded-lg border px-4 py-3" style={{ borderColor: "var(--border-subtle)", background: "var(--bg-800)" }}>
        <span style={{ color: "#1E6FD9" }}><Activity className="h-5 w-5 shrink-0" /></span>
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
            Análise de Monte Carlo — {samples} amostras | IC {(confidenceLevel * 100).toFixed(0)}% | {computeTimeMs}ms
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Incertezas baseadas em: Wang et al. (2000) ±15%, Gnielinski (1976) ±15%, AHRI 540 ±5%, CoolProp ±2%, TEMA ±30%
          </p>
        </div>
      </div>

      {/* Bandas de confiança */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ConfidenceBand label="Capacidade Frigorífica" nominal={capacity.nominal} lower={capacity.lower} upper={capacity.upper} stdDev={capacity.stdDev} unit="W" confidenceLevel={confidenceLevel} />
        <ConfidenceBand label="COP" nominal={cop.nominal} lower={cop.lower} upper={cop.upper} stdDev={cop.stdDev} unit="" confidenceLevel={confidenceLevel} />
        <ConfidenceBand label="EER" nominal={eer.nominal} lower={eer.lower} upper={eer.upper} stdDev={eer.stdDev} unit="BTU/W" confidenceLevel={confidenceLevel} />
        <ConfidenceBand label="Queda de Pressão do Ar" nominal={airPressureDrop.nominal} lower={airPressureDrop.lower} upper={airPressureDrop.upper} stdDev={airPressureDrop.stdDev} unit="Pa" confidenceLevel={confidenceLevel} />
        <ConfidenceBand label="Coeficiente Global U" nominal={overallU.nominal} lower={overallU.lower} upper={overallU.upper} stdDev={overallU.stdDev} unit="W/m²K" confidenceLevel={confidenceLevel} />
      </div>

      {/* Histograma */}
      <div className="cn-card p-4">
        <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Distribuição da Capacidade Frigorífica</p>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          Histograma de {samples} amostras Monte Carlo — frequência relativa por faixa de capacidade
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={histData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d3d" />
            <XAxis
              dataKey="bin"
              tickFormatter={(v: number) => `${v.toFixed(1)}`}
              label={{ value: "Capacidade [kW]", position: "insideBottom", offset: -10, fontSize: 11, fill: "var(--text-muted)" }}
              tick={{ fontSize: 10, fill: "var(--text-muted)" }}
            />
            <YAxis
              tickFormatter={(v: number) => `${v.toFixed(0)}%`}
              label={{ value: "Freq. [%]", angle: -90, position: "insideLeft", offset: 10, fontSize: 11, fill: "var(--text-muted)" }}
              tick={{ fontSize: 10, fill: "var(--text-muted)" }}
            />
            <Tooltip
              formatter={(v: number) => [`${v.toFixed(1)}%`, "Frequência"]}
              labelFormatter={(l: number) => `${l.toFixed(2)} kW`}
              contentStyle={{ background: "var(--bg-800)", borderColor: "var(--border-subtle)", color: "var(--text-primary)" }}
            />
            <ReferenceLine x={capacity.nominal / 1000} stroke="#1E6FD9" strokeDasharray="4 4" label={{ value: "Nominal", fontSize: 9, fill: "#1E6FD9" }} />
            <Bar dataKey="pct" radius={[2, 2, 0, 0]}>
              {histData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.bin * 1000 >= capacity.lower && entry.bin * 1000 <= capacity.upper ? "#1E6FD9" : "#334155"}
                  fillOpacity={entry.bin * 1000 >= capacity.lower && entry.bin * 1000 <= capacity.upper ? 0.8 : 0.4}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-1 text-center text-[10px]" style={{ color: "var(--text-muted)" }}>
          Barras azuis = dentro do IC {(confidenceLevel * 100).toFixed(0)}% | Barras cinzas = cauda da distribuição
        </p>
      </div>

      {/* Ranking de sensibilidade */}
      <div className="cn-card p-4">
        <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Ranking de Sensibilidade</p>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          Contribuição relativa de cada fonte de incerteza para a variabilidade total da capacidade
        </p>
        <div className="space-y-3">
          {sensitivityRanking.map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{ background: "var(--bg-800)", color: "var(--text-secondary)" }}>
                    {i + 1}
                  </span>
                  <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{item.parameter}</span>
                </div>
                <span className="cn-badge text-[10px]">
                  {item.impact_pct.toFixed(1)}%
                </span>
              </div>
              <div className="ml-7 h-2 rounded-full" style={{ background: "var(--bg-800)" }}>
                <div
                  className="h-2 rounded-full bg-[#1E6FD9]"
                  style={{ width: `${Math.min(100, item.impact_pct / sensitivityRanking[0]!.impact_pct * 100)}%` }}
                />
              </div>
              <p className="ml-7 text-[10px]" style={{ color: "var(--text-muted)" }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Avisos */}
      {result.warnings.length > 0 && (
        <div className="space-y-2">
          {result.warnings.map((w, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border px-4 py-2" style={{ borderColor: "#f59e0b", background: "var(--bg-800)" }}>
              <span style={{ color: "#f59e0b" }}><AlertCircle className="h-3.5 w-3.5" /></span>
              <p className="text-xs" style={{ color: "#f59e0b" }}>{w}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
