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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
      <p className="mb-2 text-[11px] text-slate-500">
        Tc fixo = {Tc_nom.toFixed(1)} °C · cada °C em Te → ΔQ ≈ +{TE_DELTA_PCT_Q}% / ΔW ≈ {TE_DELTA_PCT_W}%
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 12, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="Te" tick={{ fontSize: 10 }} label={{ value: "Te (°C)", position: "insideBottom", dy: 8, fontSize: 10 }} />
          <YAxis yAxisId="q" tick={{ fontSize: 10 }} width={38} />
          <YAxis yAxisId="cop" orientation="right" tick={{ fontSize: 10 }} width={38} />
          <Tooltip
            contentStyle={{ fontSize: 11 }}
            formatter={(v, n) => [typeof v === "number" ? v.toFixed(3) : v, n === "Q_kW" ? "Q (kW)" : n === "W_kW" ? "W (kW)" : "COP"]}
            labelFormatter={(l) => `Te = ${l} °C`}
          />
          <Legend wrapperStyle={{ fontSize: 10 }} />
          <ReferenceLine yAxisId="q" x={Te_nom} stroke="#94a3b8" strokeDasharray="4 2" label={{ value: "nom.", fontSize: 9 }} />
          <Line yAxisId="q" type="monotone" dataKey="Q_kW" name="Q (kW)" stroke="#3b82f6" dot={false} strokeWidth={2} />
          <Line yAxisId="q" type="monotone" dataKey="W_kW" name="W (kW)" stroke="#f59e0b" dot={false} strokeWidth={1.5} strokeDasharray="4 2" />
          <Line yAxisId="cop" type="monotone" dataKey="COP" name="COP" stroke="#10b981" dot={false} strokeWidth={1.5} />
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
      <p className="mb-2 text-[11px] text-slate-500">
        Te fixo = {Te_nom.toFixed(1)} °C · cada °C em Tc → ΔQ ≈ {TC_DELTA_PCT_Q}% / ΔW ≈ +{TC_DELTA_PCT_W}%
      </p>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 4, right: 12, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="Tc" tick={{ fontSize: 10 }} label={{ value: "Tc (°C)", position: "insideBottom", dy: 8, fontSize: 10 }} />
          <YAxis yAxisId="q" tick={{ fontSize: 10 }} width={38} />
          <YAxis yAxisId="cop" orientation="right" tick={{ fontSize: 10 }} width={38} />
          <Tooltip
            contentStyle={{ fontSize: 11 }}
            formatter={(v, n) => [typeof v === "number" ? v.toFixed(3) : v, n === "Q_kW" ? "Q (kW)" : n === "W_kW" ? "W (kW)" : "COP"]}
            labelFormatter={(l) => `Tc = ${l} °C`}
          />
          <Legend wrapperStyle={{ fontSize: 10 }} />
          <ReferenceLine yAxisId="q" x={Tc_nom} stroke="#94a3b8" strokeDasharray="4 2" label={{ value: "nom.", fontSize: 9 }} />
          <Line yAxisId="q" type="monotone" dataKey="Q_kW" name="Q (kW)" stroke="#3b82f6" dot={false} strokeWidth={2} />
          <Line yAxisId="q" type="monotone" dataKey="W_kW" name="W (kW)" stroke="#f59e0b" dot={false} strokeWidth={1.5} strokeDasharray="4 2" />
          <Line yAxisId="cop" type="monotone" dataKey="COP" name="COP" stroke="#10b981" dot={false} strokeWidth={1.5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function ImpactRow({ label, per1C, direction }: { label: string; per1C: number; direction: "Te" | "Tc" }) {
  const positive = per1C >= 0;
  return (
    <div className="flex items-center justify-between gap-2 rounded border border-slate-100 px-2 py-1 text-xs">
      <span className="text-slate-600">{label}</span>
      <div className="flex items-center gap-1.5">
        {positive ? <TrendingUp className="h-3 w-3 text-emerald-500" /> : <TrendingDown className="h-3 w-3 text-red-500" />}
        <span className={`font-mono ${positive ? "text-emerald-700" : "text-red-700"}`}>
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
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          Configure capacidade e potência do compressor para ver a análise de sensibilidade.
        </AlertDescription>
      </Alert>
    );
  }

  const COP_nom = Q_nom / W_nom;

  const deltaTe5 = scaledPoint(Q_nom, W_nom, 5 * TE_DELTA_PCT_Q, 5 * TE_DELTA_PCT_W);
  const deltaTeMinus5 = scaledPoint(Q_nom, W_nom, -5 * TE_DELTA_PCT_Q, -5 * TE_DELTA_PCT_W);
  const deltaTc5 = scaledPoint(Q_nom, W_nom, 5 * TC_DELTA_PCT_Q, 5 * TC_DELTA_PCT_W);
  const deltaTcMinus5 = scaledPoint(Q_nom, W_nom, -5 * TC_DELTA_PCT_Q, -5 * TC_DELTA_PCT_W);

  return (
    <div className="space-y-4">
      <Alert className="border-blue-200 bg-blue-50/40">
        <Activity className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-xs text-blue-700">
          Estimativa baseada em fatores de sensibilidade típicos EN12900 para compressores R404A/R134a.
          Para análise precisa, utilize os coeficientes polinomiais do compressor específico.
        </AlertDescription>
      </Alert>

      {/* Ponto nominal */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Ponto Nominal</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 text-sm">
          <div><span className="text-xs text-muted-foreground">Te</span> <span className="font-mono font-semibold">{Te_nom.toFixed(1)} °C</span></div>
          <div><span className="text-xs text-muted-foreground">Tc</span> <span className="font-mono font-semibold">{Tc_nom.toFixed(1)} °C</span></div>
          <div><span className="text-xs text-muted-foreground">Q</span> <span className="font-mono font-semibold">{(Q_nom / 1000).toFixed(2)} kW</span></div>
          <div><span className="text-xs text-muted-foreground">W</span> <span className="font-mono font-semibold">{(W_nom / 1000).toFixed(2)} kW</span></div>
          <div><span className="text-xs text-muted-foreground">COP</span> <span className="font-mono font-semibold text-emerald-700">{COP_nom.toFixed(3)}</span></div>
        </CardContent>
      </Card>

      {/* Resumo ±5°C */}
      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xs text-blue-700">
              <TrendingUp className="h-3.5 w-3.5" /> Te +5°C
              <Badge variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-700 text-[9px]">
                +{(5 * TE_DELTA_PCT_Q).toFixed(1)}% Q
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Q</span><span className="font-mono">{deltaTe5.Q_kW.toFixed(2)} kW</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">COP</span><span className="font-mono text-emerald-700">{deltaTe5.COP.toFixed(3)}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xs text-red-700">
              <TrendingDown className="h-3.5 w-3.5" /> Te −5°C
              <Badge variant="outline" className="border-red-300 bg-red-50 text-red-700 text-[9px]">
                {(-(5 * TE_DELTA_PCT_Q)).toFixed(1)}% Q
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Q</span><span className="font-mono">{deltaTeMinus5.Q_kW.toFixed(2)} kW</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">COP</span><span className="font-mono text-red-700">{deltaTeMinus5.COP.toFixed(3)}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xs text-amber-700">
              <TrendingUp className="h-3.5 w-3.5" /> Tc +5°C
              <Badge variant="outline" className="border-red-300 bg-red-50 text-red-700 text-[9px]">
                {(5 * TC_DELTA_PCT_Q).toFixed(1)}% Q
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Q</span><span className="font-mono">{deltaTc5.Q_kW.toFixed(2)} kW</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">COP</span><span className="font-mono text-red-700">{deltaTc5.COP.toFixed(3)}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xs text-emerald-700">
              <TrendingDown className="h-3.5 w-3.5" /> Tc −5°C
              <Badge variant="outline" className="border-emerald-300 bg-emerald-50 text-emerald-700 text-[9px]">
                +{(-(5 * TC_DELTA_PCT_Q)).toFixed(1)}% Q
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Q</span><span className="font-mono">{deltaTcMinus5.Q_kW.toFixed(2)} kW</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">COP</span><span className="font-mono text-emerald-700">{deltaTcMinus5.COP.toFixed(3)}</span></div>
          </CardContent>
        </Card>
      </div>

      {/* Curvas */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Curva Q / COP × Temperatura de Evaporação</CardTitle>
        </CardHeader>
        <CardContent>
          <TeSweepChart Q_nom={Q_nom} W_nom={W_nom} Te_nom={Te_nom} Tc_nom={Tc_nom} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Curva Q / COP × Temperatura de Condensação</CardTitle>
        </CardHeader>
        <CardContent>
          <TcSweepChart Q_nom={Q_nom} W_nom={W_nom} Te_nom={Te_nom} Tc_nom={Tc_nom} />
        </CardContent>
      </Card>

      {/* Fatores */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Fatores de Sensibilidade (EN12900 típico)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5">
          <ImpactRow label="ΔQ por +1°C em Te" per1C={TE_DELTA_PCT_Q} direction="Te" />
          <ImpactRow label="ΔW por +1°C em Te" per1C={TE_DELTA_PCT_W} direction="Te" />
          <ImpactRow label="ΔQ por +1°C em Tc" per1C={TC_DELTA_PCT_Q} direction="Tc" />
          <ImpactRow label="ΔW por +1°C em Tc" per1C={TC_DELTA_PCT_W} direction="Tc" />
        </CardContent>
      </Card>
    </div>
  );
}
