/**
 * AgroWorkspacePage — Sprint 4
 *
 * Workspace AGRO multi-aba:
 *   A1  Câmara       — carga térmica (dimensões, produto, iluminação)
 *   A2  Aletado      — serpentina de reaquecimento (bateria de gás quente)
 *   A3  Ciclo AGRO   — hot gas bypass, fração β, modo recomendado
 *   A4  Psicrometria — estados 1/2/3 do ar e diagrama h-x simplificado
 *   A5  Condensador  — carga total, verificação, sugestão
 *
 * Engines utilizados: calculateHotGasBypass, calculateReheatCoilSizing (coldpro_v2).
 */
import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sprout, Droplets, Thermometer, Wind, Zap, Play, AlertCircle, CheckCircle2, Send, Layers, BarChart2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from "recharts";

import { calculateHotGasBypass, calculateReheatCoilSizing } from "@/modules/coldpro_v2";
import {
  humidityRatio, enthalpyMoistAir, dewPoint, saturationPressure,
} from "@/modules/coldpro_v2/engines/psychrometrics/psychrometricCore";
import type { HotGasBypassInput, HotGasBypassResult, ReheatCoilSizingInput, ReheatCoilSizingResult } from "@/modules/coldpro_v2/domain/types";
import { useTestHubStore } from "../stores/useTestHubStore";

// ─────────────────────────────────────────────────────────────────────────────
// Shared workspace state
// ─────────────────────────────────────────────────────────────────────────────
interface WorkspaceState {
  // A1 — Câmara
  room_length_m: number;
  room_width_m: number;
  room_height_m: number;
  room_wall_u: number;
  T_outside_c: number;
  product_mass_kg: number;
  product_cp: number;
  product_dt_k: number;
  product_time_h: number;
  lighting_w: number;
  // A3 — Ciclo
  T_room_c: number;
  RH_room_pct: number;
  T_supply_c: number;
  RH_target_pct: number;
  air_mass_flow_kg_s: number;
  T_evaporating_c: number;
  T_condensing_c: number;
  max_bypass_fraction: number;
  P_atm: number;
  // A2 — Aletado
  reheat_tube_od_m: number;
  reheat_tube_thick_m: number;
  reheat_fin_spacing_mm: number;
  reheat_coil_length_mm: number;
  reheat_circuits: number;
}

const DEFAULTS: WorkspaceState = {
  room_length_m: 6,
  room_width_m: 4,
  room_height_m: 3,
  room_wall_u: 0.25,
  T_outside_c: 32,
  product_mass_kg: 500,
  product_cp: 3.5,
  product_dt_k: 10,
  product_time_h: 8,
  lighting_w: 200,
  T_room_c: 12,
  RH_room_pct: 85,
  T_supply_c: 8,
  RH_target_pct: 65,
  air_mass_flow_kg_s: 1.2,
  T_evaporating_c: 0,
  T_condensing_c: 45,
  max_bypass_fraction: 0.5,
  P_atm: 101325,
  reheat_tube_od_m: 0.0127,
  reheat_tube_thick_m: 0.0003,
  reheat_fin_spacing_mm: 6,
  reheat_coil_length_mm: 800,
  reheat_circuits: 4,
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function modeBadge(m: HotGasBypassResult["mode"]) {
  switch (m) {
    case "cooling_only":   return { label: "Apenas Resfriamento", cls: "bg-blue-100 text-blue-700 border-blue-300" };
    case "hot_gas_bypass": return { label: "Hot Gas Bypass",       cls: "bg-violet-100 text-violet-700 border-violet-300" };
    case "electric_reheat":return { label: "Reaquecimento Elétrico", cls: "bg-amber-100 text-amber-700 border-amber-300" };
    default:               return { label: "Inválido",             cls: "bg-red-100 text-red-700 border-red-300" };
  }
}

function NumField({ label, unit, value, onChange, step = 0.1 }: {
  label: string; unit?: string; value: number; onChange: (v: number) => void; step?: number;
}) {
  return (
    <div>
      <Label className="text-xs">
        {label}{unit && <span className="ml-1 text-slate-400">({unit})</span>}
      </Label>
      <Input
        type="number" step={step} value={value}
        onChange={(e) => { const n = parseFloat(e.target.value); if (!isNaN(n)) onChange(n); }}
        className="h-8 text-xs"
      />
    </div>
  );
}

function KV({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 rounded border border-slate-100 bg-slate-50/40 px-2 py-1">
      <span className="text-[11px] text-slate-500">{label}</span>
      <span className={`font-mono text-xs ${accent ?? "text-slate-800"}`}>{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Cold-room thermal load (A1)
// ─────────────────────────────────────────────────────────────────────────────
function calcThermalLoad(s: WorkspaceState) {
  const A_wall =
    2 * (s.room_length_m * s.room_height_m) +
    2 * (s.room_width_m * s.room_height_m) +
    (s.room_length_m * s.room_width_m); // walls + ceiling (floor insulated)
  const Q_wall = s.room_wall_u * A_wall * Math.abs(s.T_outside_c - s.T_room_c);
  const Q_product = (s.product_mass_kg * s.product_cp * 1000 * s.product_dt_k) / (s.product_time_h * 3600);
  const Q_lighting = s.lighting_w;
  const Q_infiltration = Q_wall * 0.15;
  const Q_total = Q_wall + Q_product + Q_lighting + Q_infiltration;
  return { Q_wall, Q_product, Q_lighting, Q_infiltration, Q_total, A_wall };
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Câmara (A1)
// ─────────────────────────────────────────────────────────────────────────────
function CamaraTab({ s, u }: { s: WorkspaceState; u: (k: keyof WorkspaceState, v: number) => void }) {
  const load = calcThermalLoad(s);
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-500" /> Dimensões e Envelope
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-3">
            <NumField label="Comprimento" unit="m" value={s.room_length_m} onChange={(v) => u("room_length_m", v)} />
            <NumField label="Largura"     unit="m" value={s.room_width_m}  onChange={(v) => u("room_width_m",  v)} />
            <NumField label="Altura"      unit="m" value={s.room_height_m} onChange={(v) => u("room_height_m", v)} />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <NumField label="U parede"   unit="W/m²K" step={0.01} value={s.room_wall_u}   onChange={(v) => u("room_wall_u",   v)} />
            <NumField label="T externo"  unit="°C"              value={s.T_outside_c}    onChange={(v) => u("T_outside_c",    v)} />
            <NumField label="T câmara"   unit="°C"              value={s.T_room_c}        onChange={(v) => u("T_room_c",       v)} />
            <NumField label="Iluminação" unit="W" step={10}     value={s.lighting_w}      onChange={(v) => u("lighting_w",     v)} />
          </div>
          <p className="text-[10px] font-bold uppercase text-slate-500">Produto</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <NumField label="Massa produto" unit="kg" step={10} value={s.product_mass_kg}  onChange={(v) => u("product_mass_kg",  v)} />
            <NumField label="Cp produto"   unit="kJ/kgK"       value={s.product_cp}       onChange={(v) => u("product_cp",       v)} />
            <NumField label="ΔT produto"   unit="K"            value={s.product_dt_k}     onChange={(v) => u("product_dt_k",     v)} />
            <NumField label="Tempo pull-down" unit="h"         value={s.product_time_h}   onChange={(v) => u("product_time_h",   v)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Carga Térmica Estimada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <KV label="Área total parede/teto"     value={`${load.A_wall.toFixed(1)} m²`} />
          <KV label="Q paredes + teto"           value={`${(load.Q_wall / 1000).toFixed(2)} kW`} accent="text-blue-700" />
          <KV label="Q produto (pull-down)"      value={`${(load.Q_product / 1000).toFixed(2)} kW`} accent="text-amber-700" />
          <KV label="Q iluminação"               value={`${(load.Q_lighting / 1000).toFixed(2)} kW`} />
          <KV label="Q infiltração (15%)"        value={`${(load.Q_infiltration / 1000).toFixed(2)} kW`} />
          <div className="rounded border-2 border-emerald-300 bg-emerald-50 px-2 py-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-emerald-800">Q Total</span>
              <span className="font-mono text-base font-bold text-emerald-700">{(load.Q_total / 1000).toFixed(2)} kW</span>
            </div>
            <div className="mt-0.5 text-[10px] text-emerald-600">
              = {load.Q_total.toFixed(0)} W ≈ {(load.Q_total * 0.860).toFixed(0)} kcal/h
            </div>
          </div>
          <p className="text-[10px] text-slate-400">
            Modelo simplificado: paredes + produto + iluminação + infiltração.
            Não inclui carga de pessoas, motores ou equipamentos auxiliares.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Ciclo AGRO (A3)
// ─────────────────────────────────────────────────────────────────────────────
function CicloTab({ s, u, onSendToHub }: {
  s: WorkspaceState;
  u: (k: keyof WorkspaceState, v: number) => void;
  onSendToHub: (r: HotGasBypassResult) => void;
}) {
  const [result, setResult] = useState<HotGasBypassResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCalc() {
    setError(null);
    try {
      const input: HotGasBypassInput = {
        T_air_in_c: s.T_room_c,
        RH_air_in: s.RH_room_pct / 100,
        T_air_out_setpoint_c: s.T_supply_c,
        RH_air_out_setpoint: s.RH_target_pct / 100,
        air_mass_flow_kg_s: s.air_mass_flow_kg_s,
        T_evaporating_c: s.T_evaporating_c,
        T_condensing_c: s.T_condensing_c,
        max_bypass_fraction: s.max_bypass_fraction,
        P_atm: s.P_atm,
      };
      setResult(calculateHotGasBypass(input));
    } catch (e) {
      setError(String(e));
      setResult(null);
    }
  }

  const mode = result ? modeBadge(result.mode) : null;
  const rhExceeds = result && result.RH_air_out * 100 > s.RH_target_pct + 5;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Zap className="h-4 w-4 text-violet-500" /> Parâmetros do Ciclo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-[10px] font-bold uppercase text-slate-500">Ar da câmara</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <NumField label="T câmara"     unit="°C" value={s.T_room_c}         onChange={(v) => u("T_room_c",         v)} />
            <NumField label="UR câmara"    unit="%"  value={s.RH_room_pct}      onChange={(v) => u("RH_room_pct",      v)} />
          </div>
          <p className="text-[10px] font-bold uppercase text-slate-500">Setpoint de insuflamento</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <NumField label="T insuflamento" unit="°C" value={s.T_supply_c}    onChange={(v) => u("T_supply_c",       v)} />
            <NumField label="UR alvo"        unit="%"  value={s.RH_target_pct} onChange={(v) => u("RH_target_pct",    v)} />
          </div>
          <p className="text-[10px] font-bold uppercase text-slate-500">Ciclo de refrigeração</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <NumField label="T evaporação"   unit="°C" value={s.T_evaporating_c}    onChange={(v) => u("T_evaporating_c",    v)} />
            <NumField label="T condensação"  unit="°C" value={s.T_condensing_c}     onChange={(v) => u("T_condensing_c",     v)} />
            <NumField label="Vazão de ar"    unit="kg/s" step={0.05} value={s.air_mass_flow_kg_s} onChange={(v) => u("air_mass_flow_kg_s", v)} />
            <NumField label="β máx bypass"   unit="0..1" step={0.05} value={s.max_bypass_fraction} onChange={(v) => u("max_bypass_fraction", v)} />
          </div>
          <div className="flex justify-end pt-1">
            <Button onClick={handleCalc} className="gap-2"><Play className="h-4 w-4" /> Calcular</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-xs text-red-700">{error}</AlertDescription>
          </Alert>
        )}
        {!result && !error && (
          <Alert><Sprout className="h-4 w-4" /><AlertDescription className="text-xs">Clique em <strong>Calcular</strong> para gerar o ciclo.</AlertDescription></Alert>
        )}
        {result && mode && (
          <>
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Resultado</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`${mode.cls} text-xs`}>{mode.label}</Badge>
                    <Button size="sm" variant="outline" onClick={() => onSendToHub(result)} className="h-7 gap-1 text-xs">
                      <Send className="h-3 w-3" /> Hub
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-2 sm:grid-cols-2">
                <KV label="Fração bypass β"   value={`${(result.bypass_fraction * 100).toFixed(1)} %`} />
                <KV label="Q evaporador"      value={`${(result.Q_evap_w / 1000).toFixed(2)} kW`} accent="text-blue-700" />
                <KV label="Q reaquecimento"   value={`${(result.Q_reheat_w / 1000).toFixed(2)} kW`} accent="text-amber-700" />
                <KV label="W compressor"      value={`${(result.W_compressor_w / 1000).toFixed(2)} kW`} />
                <KV label="COP do ciclo"      value={result.cop_cycle.toFixed(3)} accent="text-emerald-700" />
                <KV label="Água removida"     value={`${result.water_removed_kg_h.toFixed(2)} kg/h`} />
                <KV label="T saída"           value={`${result.T_air_out_c.toFixed(1)} °C`} />
                <KV label="UR saída"          value={`${(result.RH_air_out * 100).toFixed(1)} %`} />
                <KV label="T orvalho saída"   value={`${result.T_dew_out_c.toFixed(1)} °C`} />
                <KV label="Convergência"      value={result.converged ? `✓ (${result.iterations} iter.)` : "✗"} />
              </CardContent>
            </Card>
            {rhExceeds && (
              <Alert className="border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-xs text-amber-700">
                  UR saída ({(result.RH_air_out * 100).toFixed(1)} %) excede alvo em mais de 5 % —
                  aumente β, reduza T_evap ou use reaquecimento elétrico.
                </AlertDescription>
              </Alert>
            )}
            {result.warnings.length > 0 && (
              <div className="rounded border border-amber-200 bg-amber-50/60 p-2 text-xs">
                <p className="font-bold text-amber-700">Avisos:</p>
                <ul className="ml-4 list-disc text-amber-700">
                  {result.warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Aletado integrado (A2)
// ─────────────────────────────────────────────────────────────────────────────
function AletadoTab({ s, u, qReheatW }: {
  s: WorkspaceState;
  u: (k: keyof WorkspaceState, v: number) => void;
  qReheatW: number;
}) {
  const [result, setResult] = useState<ReheatCoilSizingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCalc() {
    setError(null);
    if (qReheatW <= 0) { setError("Execute o ciclo AGRO primeiro para obter Q_reaquecimento."); return; }
    try {
      const input: ReheatCoilSizingInput = {
        Q_reheat_target_w: qReheatW,
        T_air_in_c: s.T_supply_c,
        T_air_out_c: s.T_room_c,
        air_mass_flow_kg_s: s.air_mass_flow_kg_s,
        T_condensing_c: s.T_condensing_c,
        T_hot_gas_in_c: s.T_condensing_c + 5,
        tube_outer_diameter_m: s.reheat_tube_od_m,
        tube_thickness_m: s.reheat_tube_thick_m,
        fin_spacing_m: s.reheat_fin_spacing_mm / 1000,
        fin_thickness_m: 0.0001,
        tube_pitch_transversal_m: s.reheat_tube_od_m * 2.1,
        tube_pitch_longitudinal_m: s.reheat_tube_od_m * 2.5,
        coil_length_m: s.reheat_coil_length_mm / 1000,
        circuits: s.reheat_circuits,
      };
      setResult(calculateReheatCoilSizing(input));
    } catch (e) {
      setError(String(e));
      setResult(null);
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Wind className="h-4 w-4 text-amber-500" /> Bateria de Reaquecimento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700">
            Q alvo (do ciclo): <strong>{qReheatW > 0 ? `${(qReheatW / 1000).toFixed(2)} kW` : "—"}</strong>
            {qReheatW <= 0 && " — execute o ciclo AGRO primeiro"}
          </div>
          <p className="text-[10px] font-bold uppercase text-slate-500">Geometria do tubo</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <NumField label="Ø externo tubo" unit="m"  step={0.001} value={s.reheat_tube_od_m}    onChange={(v) => u("reheat_tube_od_m",    v)} />
            <NumField label="Espessura tubo" unit="m"  step={0.0001}value={s.reheat_tube_thick_m} onChange={(v) => u("reheat_tube_thick_m", v)} />
            <NumField label="Passo aleta"    unit="mm" step={0.5}   value={s.reheat_fin_spacing_mm}onChange={(v) => u("reheat_fin_spacing_mm", v)} />
            <NumField label="Comp. serpentina" unit="mm" step={50}  value={s.reheat_coil_length_mm}onChange={(v) => u("reheat_coil_length_mm", v)} />
            <NumField label="Circuitos"      unit="n"  step={1}     value={s.reheat_circuits}      onChange={(v) => u("reheat_circuits",      v)} />
          </div>
          <div className="flex justify-end pt-1">
            <Button onClick={handleCalc} className="gap-2"><Play className="h-4 w-4" /> Dimensionar</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {error && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-xs text-amber-700">{error}</AlertDescription>
          </Alert>
        )}
        {!result && !error && (
          <Alert><Wind className="h-4 w-4" /><AlertDescription className="text-xs">Clique em <strong>Dimensionar</strong> para calcular a bateria.</AlertDescription></Alert>
        )}
        {result && (
          <Card className={result.sizing_feasible ? "border-emerald-300" : "border-red-300"}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Resultado</CardTitle>
                <Badge variant="outline" className={result.sizing_feasible ? "bg-emerald-100 text-emerald-700 border-emerald-300" : "bg-red-100 text-red-700 border-red-300"}>
                  {result.sizing_feasible ? "VIÁVEL" : "INVIÁVEL"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2">
              <KV label="Filas necessárias"  value={`${result.rows_required}`} />
              <KV label="Comprimento total"  value={`${result.total_tube_length_m.toFixed(1)} m`} />
              <KV label="Área externa"       value={`${result.external_area_m2.toFixed(3)} m²`} />
              <KV label="U global"           value={`${result.u_w_m2k.toFixed(1)} W/m²K`} />
              <KV label="LMTD"               value={`${result.lmtd_k.toFixed(2)} K`} />
              <KV label="Q disponível"       value={`${(result.Q_available_w / 1000).toFixed(2)} kW`} accent="text-emerald-700" />
              <KV label="Q alvo"             value={`${(result.Q_target_w / 1000).toFixed(2)} kW`} />
              <KV label="Razão Q/Q_alvo"     value={result.capacity_ratio.toFixed(3)} accent={result.capacity_ratio >= 1 ? "text-emerald-700" : "text-red-600"} />
              <KV label="ΔP ar (reaquecimento)" value={`${result.reheat_air_pressure_drop_pa.toFixed(1)} Pa`} />
              <KV label="T saída ar"         value={`${result.T_air_out_c.toFixed(1)} °C`} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Psicrometria + diagrama h-x (A4 + A6)
// ─────────────────────────────────────────────────────────────────────────────
function PsicrometriaTab({ s }: { s: WorkspaceState }) {
  const { states, satCurve } = useMemo(() => {
    const P = s.P_atm;

    function state(T_c: number, RH: number) {
      const { W } = humidityRatio(T_c, RH, P);
      const h = enthalpyMoistAir(T_c, W);
      const td = dewPoint(T_c, RH, P).T_dp;
      return { T_c, RH_pct: RH * 100, W_gkg: W * 1000, h_kjkg: h, td_c: td };
    }

    const st1 = state(s.T_room_c,    s.RH_room_pct / 100);       // Estado 1: câmara
    const st2 = state(s.T_supply_c - 2, 0.98);                   // Estado 2: saída evaporador (aprox.)
    const st3 = state(s.T_supply_c,  s.RH_target_pct / 100);     // Estado 3: insuflamento alvo

    // Curva de saturação T de -10°C a T_max
    const satCurveData = [];
    for (let T = -10; T <= Math.max(s.T_room_c + 5, 35); T += 1) {
      const { W } = humidityRatio(T, 1.0, P);
      const h = enthalpyMoistAir(T, W);
      satCurveData.push({ x: W * 1000, y: h });
    }

    return { states: { st1, st2, st3 }, satCurve: satCurveData };
  }, [s.T_room_c, s.RH_room_pct, s.T_supply_c, s.RH_target_pct, s.P_atm]);

  const { st1, st2, st3 } = states;

  const chartPoints = [
    { x: st1.W_gkg, y: st1.h_kjkg, label: "Estado 1" },
    { x: st2.W_gkg, y: st2.h_kjkg, label: "Estado 2" },
    { x: st3.W_gkg, y: st3.h_kjkg, label: "Estado 3" },
  ];

  return (
    <div className="space-y-5">
      {/* Tabela de estados */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Droplets className="h-4 w-4 text-blue-500" /> Estados Psicrométricos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="pb-1 pr-3">Estado</th>
                  <th className="pb-1 pr-3">T (°C)</th>
                  <th className="pb-1 pr-3">UR (%)</th>
                  <th className="pb-1 pr-3">W (g/kg)</th>
                  <th className="pb-1 pr-3">h (kJ/kg)</th>
                  <th className="pb-1">T orvalho (°C)</th>
                </tr>
              </thead>
              <tbody>
                {([
                  { label: "1 — Câmara",         st: st1 },
                  { label: "2 — Saída evap.",     st: st2 },
                  { label: "3 — Insuflamento",    st: st3 },
                ] as const).map(({ label, st }) => (
                  <tr key={label} className="border-b border-border/50">
                    <td className="py-1 pr-3 font-medium">{label}</td>
                    <td className="py-1 pr-3">{st.T_c.toFixed(1)}</td>
                    <td className="py-1 pr-3">{st.RH_pct.toFixed(1)}</td>
                    <td className="py-1 pr-3 text-blue-700">{st.W_gkg.toFixed(3)}</td>
                    <td className="py-1 pr-3 text-green-700">{st.h_kjkg.toFixed(2)}</td>
                    <td className="py-1">{st.td_c.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Diagrama h-x simplificado */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-purple-500" /> Diagrama h-x (Mollier simplificado)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" dataKey="x" name="W" unit=" g/kg" tick={{ fontSize: 10 }}
                label={{ value: "W — Razão de umidade (g/kg)", position: "insideBottom", offset: -12, fontSize: 11 }} />
              <YAxis type="number" dataKey="y" name="h" unit=" kJ/kg" tick={{ fontSize: 10 }}
                label={{ value: "h (kJ/kg)", angle: -90, position: "insideLeft", fontSize: 11 }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = (payload[0] as { payload: { x: number; y: number } }).payload;
                  return (
                    <div className="rounded border border-slate-200 bg-white p-2 text-xs shadow">
                      <div>W = {d.x.toFixed(3)} g/kg</div>
                      <div>h = {d.y.toFixed(2)} kJ/kg</div>
                    </div>
                  );
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Scatter name="Curva saturação" data={satCurve} fill="#94a3b8" line={{ stroke: "#94a3b8", strokeWidth: 1.5 }} lineType="joint" r={0} />
              <Scatter name="Estados do ciclo" data={chartPoints} fill="#7c3aed" r={5} />
              <ReferenceLine x={st1.W_gkg} stroke="#3b82f6" strokeDasharray="4 2" label={{ value: "1", fontSize: 10 }} />
              <ReferenceLine x={st3.W_gkg} stroke="#16a34a" strokeDasharray="4 2" label={{ value: "3", fontSize: 10 }} />
            </ScatterChart>
          </ResponsiveContainer>
          <p className="mt-1 text-[10px] text-slate-400">
            Curva de saturação calculada pela correlação de Buck (1981). Estados 1–3 derivados dos parâmetros do ciclo.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Condensador (A5)
// ─────────────────────────────────────────────────────────────────────────────
function CondensadorTab({ s, qEvapW }: { s: WorkspaceState; qEvapW: number }) {
  const qEvapEst = qEvapW > 0 ? qEvapW : calcThermalLoad(s).Q_total;
  // Q_cond ≈ Q_evap × (1 + 1/COP) — rough estimate with COP=2.5
  const copEst = 2.5;
  const qCond = qEvapEst * (1 + 1 / copEst);
  const specificLoad = qCond / (s.room_length_m * s.room_width_m);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-orange-500" /> Carga de Condensação Estimada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <KV label="Q evaporador (câmara ou ciclo)" value={`${(qEvapEst / 1000).toFixed(2)} kW`} accent="text-blue-700" />
          <KV label="COP estimado"                  value={copEst.toFixed(1)} />
          <KV label="Q condensador total"           value={`${(qCond / 1000).toFixed(2)} kW`} accent="text-orange-700" />
          <KV label="Carga específica (por m² piso)" value={`${specificLoad.toFixed(0)} W/m²`} />
          <KV label="T condensação"                 value={`${s.T_condensing_c.toFixed(1)} °C`} />
          <KV label="T externo"                     value={`${s.T_outside_c.toFixed(1)} °C`} />
          <KV label="ΔT condensador"                value={`${(s.T_condensing_c - s.T_outside_c).toFixed(1)} K`} />
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4 text-xs text-blue-700 space-y-1">
          <p className="font-semibold">Sugestão de dimensionamento:</p>
          <ul className="ml-4 list-disc space-y-0.5">
            <li>Q_cond ≥ <strong>{(qCond / 1000).toFixed(2)} kW</strong> na condição T_ext = {s.T_outside_c} °C.</li>
            <li>ΔT condensador de {(s.T_condensing_c - s.T_outside_c).toFixed(0)} K — verificar seleção pelo fabricante.</li>
            <li>Para dimensionamento preciso: use a aba <em>Configuração</em> do Hub de Testes com os parâmetros calculados aqui.</li>
          </ul>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          COP estimado. Para cálculo exato, execute o ciclo na aba <strong>Ciclo AGRO</strong>
          e envie ao Hub de Testes via botão <em>Hub</em>.
        </AlertDescription>
      </Alert>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AgroWorkspacePage — main
// ─────────────────────────────────────────────────────────────────────────────
export function AgroWorkspacePage() {
  const [s, setS] = useState<WorkspaceState>(DEFAULTS);
  const [cycleResult, setCycleResult] = useState<HotGasBypassResult | null>(null);
  const navigate = useNavigate();
  const setConditions = useTestHubStore((s) => s.setConditions);

  function u(k: keyof WorkspaceState, v: number) {
    setS((prev) => ({ ...prev, [k]: v }));
  }

  function handleSendToHub(result: HotGasBypassResult) {
    setCycleResult(result);
    setConditions({
      ambient_temp_c: s.T_room_c,
      required_airflow_m3_h: (s.air_mass_flow_kg_s * 3600) / 1.2,
    });
    toast.success("Cenário AGRO enviado ao Hub de Testes", {
      description: `Te=${s.T_evaporating_c}°C · Tc=${s.T_condensing_c}°C · β=${(result.bypass_fraction * 100).toFixed(0)}%`,
    });
    navigate({ to: "/coldpro/hub-de-testes" });
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 p-5">
      <div className="border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <Sprout className="h-5 w-5 text-emerald-600" />
          <h1 className="text-lg font-bold text-slate-900">Workspace AGRO</h1>
          <Badge variant="outline" className="text-[10px] text-emerald-700">
            Hot Gas Bypass · Controle de UR · Sprint 4
          </Badge>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Câmara agrícola com controle simultâneo de temperatura e umidade via gás quente.
          Engines: calculateHotGasBypass + calculateReheatCoilSizing (coldpro_v2).
        </p>
      </div>

      <Tabs defaultValue="camara">
        <TabsList className="mb-4 flex-wrap gap-1 h-auto">
          <TabsTrigger value="camara"       className="text-xs">A1 Câmara</TabsTrigger>
          <TabsTrigger value="ciclo"        className="text-xs">A3 Ciclo AGRO</TabsTrigger>
          <TabsTrigger value="aletado"      className="text-xs">A2 Aletado</TabsTrigger>
          <TabsTrigger value="psicrometria" className="text-xs">A4 Psicrometria</TabsTrigger>
          <TabsTrigger value="condensador"  className="text-xs">A5 Condensador</TabsTrigger>
        </TabsList>

        <TabsContent value="camara">
          <CamaraTab s={s} u={u} />
        </TabsContent>
        <TabsContent value="ciclo">
          <CicloTab s={s} u={u} onSendToHub={handleSendToHub} />
        </TabsContent>
        <TabsContent value="aletado">
          <AletadoTab s={s} u={u} qReheatW={cycleResult?.Q_reheat_w ?? 0} />
        </TabsContent>
        <TabsContent value="psicrometria">
          <PsicrometriaTab s={s} />
        </TabsContent>
        <TabsContent value="condensador">
          <CondensadorTab s={s} qEvapW={cycleResult?.Q_evap_w ?? 0} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
