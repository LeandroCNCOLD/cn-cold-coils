/**
 * SensitivityAnalysisTabContent — U5
 *
 * Mostra como Q (capacidade) e COP variam com ΔTe e ΔTc em relação ao ponto nominal.
 * Usa fatores de sensibilidade típicos EN12900 para compressores de refrigeração:
 *   ΔTe = +1°C → ΔQ ≈ +2.5%  · ΔW ≈ −1.5%
 *   ΔTc = +1°C → ΔQ ≈ −2.0%  · ΔW ≈ +1.5%
 *
 * Esses fatores são médias de compressores Copeland/BITZER R404A a -10/40°C.
 * Para análise precisa, utilizar os coeficientes polinomiais do compressor.
 */
import { useMemo } from "react";
import { AlertCircle, TrendingUp, TrendingDown, Activity } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, CartesianGrid,
  XAxis, YAxis, Tooltip, ReferenceLine, Legend,
} from "recharts";
import type { CompressorSpec } from "@/modules/coldpro_v2";

interface Props {
  compressor: Partial<CompressorSpec>;
}

const TE_DELTA_PCT_Q = 2.5;
const TE_DELTA_PCT_W = -1.5;
const TC_DELTA_PCT_Q = -2.0;
const TC_DELTA_PCT_W = 1.5;

function scaledPoint(Q_nom: number, W_nom: number, dQ_pct: number, dW_pct: number) {
  const Q = Q_nom * (1 + dQ_pct / 100);
  const W = W_nom * (1 + dW_pct / 100);
  const COP = W > 0 ? Q / W : 0;
  return { Q_kW: Q / 1000, W_kW: W / 1000, COP };
}

function TeSweepChart({ Q_nom, W_nom, Te_nom, Tc_nom }: { Q_nom: number; W_nom: number; Te_nom: number; Tc_nom: number }) {
  const data = useMemo(() => {
    const pts = [];
    for (let dTe = -15; dTe <= 10; dTe += 1) {
      const dQ_pct = dTe * TE_DELTA_PCT_Q;
      const dW_pct = dTe * TE_DELTA_PCT_W;
      const { Q_kW, W_kW, COP } = scaledPoint(Q_nom, W_nom, dQ_pct, dW_pct);
      pts.push({ Te: Te_nom + dTe, Q_kW: +Q_kW.toFixed(3), W_kW: +W_kW.toFixed(3), COP: +COP.toFixed(3) });
    }
    return pts;
  }, [Q_nom, W_nom, Te_nom]);

  return (
    <div>
      <p className="mb-2 text-[11px]" style={{ color: "var(--text-muted)" }}>
        Tc fixo = {Tc_nom.toFixed(1)} °C · cada °C em Te → ΔQ ≈ +{TE_DELTA_PCT_Q}% / ΔW ≈ {TE_DELTA_PCT_W}%
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 12, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
          <XAxis dataKey="Te" tick={{ fontSize: 10 }} label={{ value: "Te (°C)", position: "insideBottom", dy: 8, fontSize: 10 }} />
          <YAxis yAxisId="q" tick={{ fontSize: 10 }} width={38} />
          <YAxis yAxisId="cop" orientation="right" tick={{ fontSize: 10 }} width={38} />
          <Tooltip
            contentStyle={{ fontSize: 11 }}
            formatter={(v, n) => [typeof v === "number" ? v.toFixed(3) : v, n === "Q_kW" ? "Q (kW)" : n === "W_kW" ? "W (kW)" : "COP"]}
            labelFormatter={(l) => `Te = ${l} °C`}
          />
          <Legend wrapperStyle={{ fontSize: 10 }} />
          <ReferenceLine yAxisId="q" x={Te_nom} stroke="var(--border-subtle)" strokeDasharray="4 2" label={{ value: "nom.", fontSize: 9 }} />
          <Line yAxisId="q" type="monotone" dataKey="Q_kW" name="Q (kW)" stroke="#3b82f6" dot={false} strokeWidth={2} />
          <Line yAxisId="q" type="monotone" dataKey="W_kW" name="W (kW)" stroke="#f59e0b" dot={false} strokeWidth={1.5} strokeDasharray="4 2" />
          <Line yAxisId="cop" type="monotone" dataKey="COP" name="COP" stroke="var(--color-success)" dot={false} strokeWidth={1.5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function TcSweepChart({ Q_nom, W_nom, Te_nom, Tc_nom }: { Q_nom: number; W_nom: number; Te_nom: number; Tc_nom: number }) {
  const data = useMemo(() => {
    const pts = [];
    for (let dTc = -10; dTc <= 20; dTc += 1) {
      const dQ_pct = dTc * TC_DELTA_PCT_Q;
      const dW_pct = dTc * TC_DELTA_PCT_W;
      const { Q_kW, W_kW, COP } = scaledPoint(Q_nom, W_nom, dQ_pct, dW_pct);
      pts.push({ Tc: Tc_nom + dTc, Q_kW: +Q_kW.toFixed(3), W_kW: +W_kW.toFixed(3), COP: +COP.toFixed(3) });
    }
    return pts;
  }, [Q_nom, W_nom, Tc_nom]);

  return (
    <div>
      <p className="mb-2 text-[11px]" style={{ color: "var(--text-muted)" }}>
        Te fixo = {Te_nom.toFixed(1)} °C · cada °C em Tc → ΔQ ≈ {TC_DELTA_PCT_Q}% / ΔW ≈ +{TC_DELTA_PCT_W}%
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 12, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
          <XAxis dataKey="Tc" tick={{ fontSize: 10 }} label={{ value: "Tc (°C)", position: "insideBottom", dy: 8, fontSize: 10 }} />
          <YAxis yAxisId="q" tick={{ fontSize: 10 }} width={38} />
          <YAxis yAxisId="cop" orientation="right" tick={{ fontSize: 10 }} width={38} />
          <Tooltip
            contentStyle={{ fontSize: 11 }}
            formatter={(v, n) => [typeof v === "number" ? v.toFixed(3) : v, n === "Q_kW" ? "Q (kW)" : n === "W_kW" ? "W (kW)" : "COP"]}
            labelFormatter={(l) => `Tc = ${l} °C`}
          />
          <Legend wrapperStyle={{ fontSize: 10 }} />
          <ReferenceLine yAxisId="q" x={Tc_nom} stroke="var(--border-subtle)" strokeDasharray="4 2" label={{ value: "nom.", fontSize: 9 }} />
          <Line yAxisId="q" type="monotone" dataKey="Q_kW" name="Q (kW)" stroke="#3b82f6" dot={false} strokeWidth={2} />
          <Line yAxisId="q" type="monotone" dataKey="W_kW" name="W (kW)" stroke="#f59e0b" dot={false} strokeWidth={1.5} strokeDasharray="4 2" />
          <Line yAxisId="cop" type="monotone" dataKey="COP" name="COP" stroke="var(--color-success)" dot={false} strokeWidth={1.5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ImpactRow({ label, per1C, direction }: { label: string; per1C: number; direction: "Te" | "Tc" }) {
  const positive = per1C >= 0;
  return (
    <div
      className="flex items-center justify-between gap-2 rounded px-2 py-1 text-xs"
      style={{ border: "1px solid var(--border-subtle)" }}
    >
      <span style={{ color: "var(--text-secondary)" }}>{label}</span>
      <div className="flex items-center gap-1.5">
        {positive ? (
          <span style={{ color: "var(--color-success)" }}>
            <TrendingUp className="h-3 w-3" />
          </span>
        ) : (
          <span style={{ color: "var(--color-error)" }}>
            <TrendingDown className="h-3 w-3" />
          </span>
        )}
        <span className="font-mono" style={{ color: positive ? "var(--color-success)" : "var(--color-error)" }}>
          {per1C >= 0 ? "+" : ""}{per1C.toFixed(1)}% / °C {direction}
        </span>
      </div>
    </div>
  );
}

export function SensitivityAnalysisTabContent({ compressor }: Props) {
  const Q_nom = compressor.cooling_capacity_w ?? 0;
  const W_nom = compressor.power_w ?? 0;
  const Te_nom = compressor.evap_temp_c ?? -10;
  const Tc_nom = compressor.cond_temp_c ?? 40;

  if (Q_nom <= 0 || W_nom <= 0) {
    return (
      <div
        className="flex items-start gap-3 rounded p-3"
        style={{ background: "var(--bg-800)", border: "1px solid var(--border-subtle)" }}
      >
        <span style={{ color: "var(--text-muted)" }}>
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
        </span>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          Configure capacidade e potência do compressor para ver a análise de sensibilidade.
        </p>
      </div>
    );
  }

  const COP_nom = Q_nom / W_nom;

  const deltaTe5 = scaledPoint(Q_nom, W_nom, 5 * TE_DELTA_PCT_Q, 5 * TE_DELTA_PCT_W);
  const deltaTeMinus5 = scaledPoint(Q_nom, W_nom, -5 * TE_DELTA_PCT_Q, -5 * TE_DELTA_PCT_W);
  const deltaTc5 = scaledPoint(Q_nom, W_nom, 5 * TC_DELTA_PCT_Q, 5 * TC_DELTA_PCT_W);
  const deltaTcMinus5 = scaledPoint(Q_nom, W_nom, -5 * TC_DELTA_PCT_Q, -5 * TC_DELTA_PCT_W);

  return (
    <div className="space-y-4">
      {/* Info banner */}
      <div
        className="flex items-start gap-3 rounded p-3"
        style={{ background: "var(--bg-800)", border: "1px solid var(--border-subtle)" }}
      >
        <span style={{ color: "var(--ice-400)" }}>
          <Activity className="h-4 w-4 mt-0.5 shrink-0" />
        </span>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Estimativa baseada em fatores de sensibilidade típicos EN12900 para compressores R404A/R134a.
          Para análise precisa, utilize os coeficientes polinomiais do compressor específico.
        </p>
      </div>

      {/* Ponto nominal */}
      <div className="cn-card p-4">
        <p className="mb-3 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Ponto Nominal</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div><span className="text-xs" style={{ color: "var(--text-muted)" }}>Te</span> <span className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>{Te_nom.toFixed(1)} °C</span></div>
          <div><span className="text-xs" style={{ color: "var(--text-muted)" }}>Tc</span> <span className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>{Tc_nom.toFixed(1)} °C</span></div>
          <div><span className="text-xs" style={{ color: "var(--text-muted)" }}>Q</span> <span className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>{(Q_nom / 1000).toFixed(2)} kW</span></div>
          <div><span className="text-xs" style={{ color: "var(--text-muted)" }}>W</span> <span className="font-mono font-semibold" style={{ color: "var(--text-primary)" }}>{(W_nom / 1000).toFixed(2)} kW</span></div>
          <div><span className="text-xs" style={{ color: "var(--text-muted)" }}>COP</span> <span className="font-mono font-semibold" style={{ color: "var(--color-success)" }}>{COP_nom.toFixed(3)}</span></div>
        </div>
      </div>

      {/* Resumo ±5°C */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Te +5°C */}
        <div className="cn-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <span style={{ color: "var(--ice-400)" }}>
              <TrendingUp className="h-3.5 w-3.5" />
            </span>
            <p className="text-xs font-semibold" style={{ color: "var(--ice-400)" }}>Te +5°C</p>
            <span className="cn-badge cn-badge--success text-[9px]">
              +{(5 * TE_DELTA_PCT_Q).toFixed(1)}% Q
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span style={{ color: "var(--text-muted)" }}>Q</span><span className="font-mono" style={{ color: "var(--text-primary)" }}>{deltaTe5.Q_kW.toFixed(2)} kW</span></div>
            <div className="flex justify-between"><span style={{ color: "var(--text-muted)" }}>COP</span><span className="font-mono" style={{ color: "var(--color-success)" }}>{deltaTe5.COP.toFixed(3)}</span></div>
          </div>
        </div>

        {/* Te −5°C */}
        <div className="cn-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <span style={{ color: "var(--color-error)" }}>
              <TrendingDown className="h-3.5 w-3.5" />
            </span>
            <p className="text-xs font-semibold" style={{ color: "var(--color-error)" }}>Te −5°C</p>
            <span className="cn-badge cn-badge--error text-[9px]">
              {(-(5 * TE_DELTA_PCT_Q)).toFixed(1)}% Q
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span style={{ color: "var(--text-muted)" }}>Q</span><span className="font-mono" style={{ color: "var(--text-primary)" }}>{deltaTeMinus5.Q_kW.toFixed(2)} kW</span></div>
            <div className="flex justify-between"><span style={{ color: "var(--text-muted)" }}>COP</span><span className="font-mono" style={{ color: "var(--color-error)" }}>{deltaTeMinus5.COP.toFixed(3)}</span></div>
          </div>
        </div>

        {/* Tc +5°C */}
        <div className="cn-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <span style={{ color: "#f59e0b" }}>
              <TrendingUp className="h-3.5 w-3.5" />
            </span>
            <p className="text-xs font-semibold" style={{ color: "#f59e0b" }}>Tc +5°C</p>
            <span className="cn-badge cn-badge--error text-[9px]">
              {(5 * TC_DELTA_PCT_Q).toFixed(1)}% Q
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span style={{ color: "var(--text-muted)" }}>Q</span><span className="font-mono" style={{ color: "var(--text-primary)" }}>{deltaTc5.Q_kW.toFixed(2)} kW</span></div>
            <div className="flex justify-between"><span style={{ color: "var(--text-muted)" }}>COP</span><span className="font-mono" style={{ color: "var(--color-error)" }}>{deltaTc5.COP.toFixed(3)}</span></div>
          </div>
        </div>

        {/* Tc −5°C */}
        <div className="cn-card p-4">
          <div className="mb-3 flex items-center gap-2">
            <span style={{ color: "var(--color-success)" }}>
              <TrendingDown className="h-3.5 w-3.5" />
            </span>
            <p className="text-xs font-semibold" style={{ color: "var(--color-success)" }}>Tc −5°C</p>
            <span className="cn-badge cn-badge--success text-[9px]">
              +{(-(5 * TC_DELTA_PCT_Q)).toFixed(1)}% Q
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between"><span style={{ color: "var(--text-muted)" }}>Q</span><span className="font-mono" style={{ color: "var(--text-primary)" }}>{deltaTcMinus5.Q_kW.toFixed(2)} kW</span></div>
            <div className="flex justify-between"><span style={{ color: "var(--text-muted)" }}>COP</span><span className="font-mono" style={{ color: "var(--color-success)" }}>{deltaTcMinus5.COP.toFixed(3)}</span></div>
          </div>
        </div>
      </div>

      {/* Curvas */}
      <div className="cn-card p-4">
        <p className="mb-3 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Curva Q / COP × Temperatura de Evaporação
        </p>
        <TeSweepChart Q_nom={Q_nom} W_nom={W_nom} Te_nom={Te_nom} Tc_nom={Tc_nom} />
      </div>

      <div className="cn-card p-4">
        <p className="mb-3 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Curva Q / COP × Temperatura de Condensação
        </p>
        <TcSweepChart Q_nom={Q_nom} W_nom={W_nom} Te_nom={Te_nom} Tc_nom={Tc_nom} />
      </div>

      {/* Fatores */}
      <div className="cn-card p-4">
        <p className="mb-3 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Fatores de Sensibilidade (EN12900 típico)
        </p>
        <div className="space-y-1.5">
          <ImpactRow label="ΔQ por +1°C em Te" per1C={TE_DELTA_PCT_Q} direction="Te" />
          <ImpactRow label="ΔW por +1°C em Te" per1C={TE_DELTA_PCT_W} direction="Te" />
          <ImpactRow label="ΔQ por +1°C em Tc" per1C={TC_DELTA_PCT_Q} direction="Tc" />
          <ImpactRow label="ΔW por +1°C em Tc" per1C={TC_DELTA_PCT_W} direction="Tc" />
        </div>
      </div>
    </div>
  );
}
