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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sprout, Droplets, Thermometer, Wind, Zap, Play, AlertCircle, CheckCircle2, Send, Layers, BarChart2 } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from "recharts";

import { calculateAgroWorkspace } from "@/modules/coldpro_v2/engines/agro/agroWorkspaceEngine";
import { calculateReheatCoilSizing } from "@/modules/coldpro_v2";
import {
  humidityRatio, enthalpyMoistAir, dewPoint, saturationPressure,
} from "@/modules/coldpro_v2/engines/psychrometrics/psychrometricCore";
import type { HotGasBypassResult, ReheatCoilSizingInput, ReheatCoilSizingResult, AgroWorkspaceResult } from "@/modules/coldpro_v2/domain/types";
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
function fmtSafe(value: number | undefined | null, decimals: number, unit = ""): string {
  if (value == null || !Number.isFinite(value)) return "—";
  return `${value.toFixed(decimals)}${unit ? ` ${unit}` : ""}`;
}

function modeBadge(m: HotGasBypassResult["mode"]) {
  switch (m) {
    case "cooling_only":   return { label: "Apenas Resfriamento", cls: "cn-badge--info" };
    case "hot_gas_bypass": return { label: "Hot Gas Bypass",       cls: "cn-badge--approved" };
    case "electric_reheat":return { label: "Reaquecimento Elétrico", cls: "cn-badge--pending" };
    default:               return { label: "Inválido",             cls: "cn-badge--rejected" };
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
    <div className="flex items-baseline justify-between gap-2 rounded border px-2 py-1"
         style={{ borderColor: "var(--border-subtle)", background: "var(--bg-800)" }}>
      <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{label}</span>
      <span className={`font-mono text-xs ${accent ?? ""}`}
            style={accent ? undefined : { color: "var(--text-primary)" }}>{value}</span>
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
      <div className="cn-card p-4 space-y-3">
        <p className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
          <Layers className="h-4 w-4" style={{ color: "var(--ice-400)" }} /> Dimensões e Envelope
        </p>
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
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Produto</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <NumField label="Massa produto" unit="kg" step={10} value={s.product_mass_kg}  onChange={(v) => u("product_mass_kg",  v)} />
          <NumField label="Cp produto"   unit="kJ/kgK"       value={s.product_cp}       onChange={(v) => u("product_cp",       v)} />
          <NumField label="ΔT produto"   unit="K"            value={s.product_dt_k}     onChange={(v) => u("product_dt_k",     v)} />
          <NumField label="Tempo pull-down" unit="h"         value={s.product_time_h}   onChange={(v) => u("product_time_h",   v)} />
        </div>
      </div>

      <div className="cn-card p-4 space-y-2">
        <p className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
          <CheckCircle2 className="h-4 w-4" style={{ color: "var(--color-success)" }} /> Carga Térmica Estimada
        </p>
        <KV label="Área total parede/teto"     value={`${load.A_wall.toFixed(1)} m²`} />
        <KV label="Q paredes + teto"           value={`${(load.Q_wall / 1000).toFixed(2)} kW`} accent="text-[--ice-400]" />
        <KV label="Q produto (pull-down)"      value={`${(load.Q_product / 1000).toFixed(2)} kW`} accent="text-amber-400" />
        <KV label="Q iluminação"               value={`${(load.Q_lighting / 1000).toFixed(2)} kW`} />
        <KV label="Q infiltração (15%)"        value={`${(load.Q_infiltration / 1000).toFixed(2)} kW`} />
        <div className="rounded border-2 px-2 py-2"
             style={{ borderColor: "rgba(16,185,129,0.4)", background: "rgba(16,185,129,0.1)" }}>
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-bold" style={{ color: "var(--color-success)" }}>Q Total</span>
            <span className="font-mono text-base font-bold" style={{ color: "var(--color-success)" }}>{(load.Q_total / 1000).toFixed(2)} kW</span>
          </div>
          <div className="mt-0.5 text-[10px]" style={{ color: "var(--color-success)" }}>
            = {load.Q_total.toFixed(0)} W ≈ {(load.Q_total * 0.860).toFixed(0)} kcal/h
          </div>
        </div>
          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            Modelo simplificado: paredes + produto + iluminação + infiltração.
            Não inclui carga de pessoas, motores ou equipamentos auxiliares.
          </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab: Ciclo AGRO (A3)
// ─────────────────────────────────────────────────────────────────────────────
function CicloTab({ s, u, onSendToHub, onCalculate }: {
  s: WorkspaceState;
  u: (k: keyof WorkspaceState, v: number) => void;
  onSendToHub: (r: HotGasBypassResult) => void;
  onCalculate?: (workspace: AgroWorkspaceResult) => void;
}) {
  const [workspace, setWorkspace] = useState<AgroWorkspaceResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const result = workspace?.hot_gas_bypass ?? null;

  function handleCalc() {
    setError(null);
    try {
      const ws = calculateAgroWorkspace({
        agro_cycle: {
          T_room_c:           s.T_room_c,
          RH_room:            s.RH_room_pct / 100,
          T_setpoint_c:       s.T_supply_c,
          RH_setpoint:        s.RH_target_pct / 100,
          air_mass_flow_kg_s: s.air_mass_flow_kg_s,
          P_atm:              s.P_atm,
        },
        T_evaporating_c:    s.T_evaporating_c,
        T_condensing_c:     s.T_condensing_c,
        max_bypass_fraction: s.max_bypass_fraction,
      });
      setWorkspace(ws);
      onCalculate?.(ws);
    } catch (e) {
      setError(String(e));
      setWorkspace(null);
    }
  }

  const recommended = workspace?.recommended_mode;
  const mode = recommended
    ? modeBadge(recommended as HotGasBypassResult["mode"])
    : result ? modeBadge(result.mode) : null;
  const rhExceeds = result && result.RH_air_out * 100 > s.RH_target_pct + 5;

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="cn-card p-4 space-y-3">
        <p className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
          <Zap className="h-4 w-4" style={{ color: "#a78bfa" }} /> Parâmetros do Ciclo
        </p>
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Ar da câmara</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <NumField label="T câmara"     unit="°C" value={s.T_room_c}         onChange={(v) => u("T_room_c",         v)} />
          <NumField label="UR câmara"    unit="%"  value={s.RH_room_pct}      onChange={(v) => u("RH_room_pct",      v)} />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Setpoint de insuflamento</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <NumField label="T insuflamento" unit="°C" value={s.T_supply_c}    onChange={(v) => u("T_supply_c",       v)} />
          <NumField label="UR alvo"        unit="%"  value={s.RH_target_pct} onChange={(v) => u("RH_target_pct",    v)} />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Ciclo de refrigeração</p>
        <div className="grid gap-2 sm:grid-cols-2">
          <NumField label="T evaporação"   unit="°C" value={s.T_evaporating_c}    onChange={(v) => u("T_evaporating_c",    v)} />
          <NumField label="T condensação"  unit="°C" value={s.T_condensing_c}     onChange={(v) => u("T_condensing_c",     v)} />
          <NumField label="Vazão de ar"    unit="kg/s" step={0.05} value={s.air_mass_flow_kg_s} onChange={(v) => u("air_mass_flow_kg_s", v)} />
          <NumField label="β máx bypass"   unit="0..1" step={0.05} value={s.max_bypass_fraction} onChange={(v) => u("max_bypass_fraction", v)} />
        </div>
        <div className="flex justify-end pt-1">
          <Button onClick={handleCalc} className="gap-2"><Play className="h-4 w-4" /> Calcular</Button>
        </div>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="flex items-start gap-2 rounded-md border px-4 py-3"
               style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.3)" }}>
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <span className="text-xs text-red-400">{error}</span>
          </div>
        )}
        {!result && !error && (
          <div className="flex items-start gap-2 rounded-md border px-4 py-3"
               style={{ background: "var(--bg-800)", borderColor: "var(--border-subtle)" }}>
            <Sprout className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--color-success)" }} />
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Clique em <strong style={{ color: "var(--text-primary)" }}>Calcular</strong> para gerar o ciclo.</span>
          </div>
        )}
        {result && mode && (
          <>
            <div className="cn-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Resultado</p>
                <div className="flex items-center gap-2">
                  <span className={`cn-badge text-xs ${mode.cls}`}>{mode.label}</span>
                  <Button size="sm" variant="outline" onClick={() => onSendToHub(result)} className="h-7 gap-1 text-xs">
                    <Send className="h-3 w-3" /> Hub
                  </Button>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <KV label="Fração bypass β"   value={fmtSafe(result.bypass_fraction * 100, 1, "%")} />
                <KV label="Q evaporador"      value={fmtSafe(result.Q_evap_w / 1000, 2, "kW")} accent="text-[--ice-400]" />
                <KV label="Q reaquecimento"   value={fmtSafe(result.Q_reheat_w / 1000, 2, "kW")} accent="text-amber-400" />
                <KV label="W compressor"      value={fmtSafe(result.W_compressor_w / 1000, 2, "kW")} />
                <KV label="COP do ciclo"      value={fmtSafe(result.cop_cycle, 3)} accent="text-[--color-success]" />
                <KV label="Água removida"     value={fmtSafe(result.water_removed_kg_h, 2, "kg/h")} />
                <KV label="T saída"           value={fmtSafe(result.T_air_out_c, 1, "°C")} />
                <KV label="UR saída"          value={fmtSafe(result.RH_air_out * 100, 1, "%")} />
                <KV label="T orvalho saída"   value={fmtSafe(result.T_dew_out_c, 1, "°C")} />
                <KV label="Convergência"      value={result.converged ? `✓ (${result.iterations} iter.)` : "✗"} />
              </div>
            </div>
            {rhExceeds && (
              <div className="flex items-start gap-2 rounded-md border px-4 py-3"
                   style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.3)" }}>
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <span className="text-xs text-amber-400">
                  UR saída ({(result.RH_air_out * 100).toFixed(1)} %) excede alvo em mais de 5 % —
                  aumente β, reduza T_evap ou use reaquecimento elétrico.
                </span>
              </div>
            )}
            {result.warnings.length > 0 && (
              <div className="rounded border p-2 text-xs"
                   style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.3)" }}>
                <p className="font-bold text-amber-400">Avisos:</p>
                <ul className="ml-4 list-disc text-amber-400">
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
      <div className="cn-card p-4 space-y-3">
        <p className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
          <Wind className="h-4 w-4 text-amber-400" /> Bateria de Reaquecimento
        </p>
        <div className="rounded border px-3 py-2 text-xs"
             style={{ background: "rgba(56,189,248,0.07)", borderColor: "rgba(56,189,248,0.25)", color: "var(--text-secondary)" }}>
          Q alvo (do ciclo): <strong style={{ color: "var(--ice-400)" }}>{qReheatW > 0 ? `${(qReheatW / 1000).toFixed(2)} kW` : "—"}</strong>
          {qReheatW <= 0 && " — execute o ciclo AGRO primeiro"}
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Geometria do tubo</p>
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
      </div>

      <div className="space-y-4">
        {error && (
          <div className="flex items-start gap-2 rounded-md border px-4 py-3"
               style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.3)" }}>
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
            <span className="text-xs text-amber-400">{error}</span>
          </div>
        )}
        {!result && !error && (
          <div className="flex items-start gap-2 rounded-md border px-4 py-3"
               style={{ background: "var(--bg-800)", borderColor: "var(--border-subtle)" }}>
            <Wind className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--text-muted)" }} />
            <span className="text-xs" style={{ color: "var(--text-secondary)" }}>Clique em <strong style={{ color: "var(--text-primary)" }}>Dimensionar</strong> para calcular a bateria.</span>
          </div>
        )}
        {result && (
          <div className="cn-card p-4"
               style={{ borderColor: result.sizing_feasible ? "rgba(16,185,129,0.4)" : "rgba(239,68,68,0.4)" }}>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Resultado</p>
              <span className={`cn-badge text-xs ${result.sizing_feasible ? "cn-badge--approved" : "cn-badge--rejected"}`}>
                {result.sizing_feasible ? "VIÁVEL" : "INVIÁVEL"}
              </span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <KV label="Filas necessárias"  value={`${result.rows_required}`} />
              <KV label="Comprimento total"  value={fmtSafe(result.total_tube_length_m, 1, "m")} />
              <KV label="Área externa"       value={fmtSafe(result.external_area_m2, 3, "m²")} />
              <KV label="U global"           value={fmtSafe(result.u_w_m2k, 1, "W/m²K")} />
              <KV label="LMTD"               value={fmtSafe(result.lmtd_k, 2, "K")} />
              <KV label="Q disponível"       value={fmtSafe(result.Q_available_w / 1000, 2, "kW")} accent="text-[--color-success]" />
              <KV label="Q alvo"             value={fmtSafe(result.Q_target_w / 1000, 2, "kW")} />
              <KV label="Razão Q/Q_alvo"     value={fmtSafe(result.capacity_ratio, 3)} accent={Number.isFinite(result.capacity_ratio) && result.capacity_ratio >= 1 ? "text-[--color-success]" : "text-red-400"} />
              <KV label="ΔP ar (reaquecimento)" value={fmtSafe(result.reheat_air_pressure_drop_pa, 1, "Pa")} />
              <KV label="T saída ar"         value={fmtSafe(result.T_air_out_c, 1, "°C")} />
            </div>
          </div>
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
function CondensadorTab({
  s,
  cycleResult,
}: {
  s: WorkspaceState;
  cycleResult: HotGasBypassResult | null;
}) {
  // Fonte primária: balanço de energia do ciclo (Q_cond = Q_evap + W_comp).
  // Fallback: carga térmica da câmara quando ciclo não foi executado.
  const hasCycle = cycleResult !== null;
  const qEvapW   = hasCycle ? cycleResult.Q_evap_w : calcThermalLoad(s).Q_total;
  const wCompW   = hasCycle ? cycleResult.W_compressor_w : 0;
  const qCond    = hasCycle
    ? qEvapW + wCompW           // balanço termodinâmico exato
    : qEvapW * (1 + 1 / 2.5);  // estimativa com COP fixo quando sem ciclo

  const cop         = hasCycle && wCompW > 0 ? qEvapW / wCompW : 2.5;
  const specificLoad = qCond / (s.room_length_m * s.room_width_m);
  const dtCond       = s.T_condensing_c - s.T_outside_c;
  const passViable   = dtCond >= 10 && dtCond <= 25;

  return (
    <div className="space-y-4">
      {/* Origem dos dados */}
      {hasCycle ? (
        <div className="flex items-center gap-2 rounded px-3 py-2 text-xs"
             style={{ background: "rgba(56,189,248,0.08)", borderLeft: "3px solid var(--ice-400)", color: "var(--ice-400)" }}>
          ✓ Valores calculados via balanço de energia do ciclo AGRO (Q_cond = Q_evap + W_comp)
        </div>
      ) : (
        <div className="flex items-start gap-2 rounded-md border px-3 py-2"
             style={{ background: "var(--bg-800)", borderColor: "var(--border-subtle)" }}>
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#f59e0b" }} />
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Ciclo AGRO não executado — usando estimativa com COP = 2,5. Execute a aba{" "}
            <strong style={{ color: "var(--text-primary)" }}>A3 Ciclo AGRO</strong> para resultados exatos.
          </span>
        </div>
      )}

      {/* Resultados */}
      <div className="cn-card p-4 space-y-2">
        <p className="text-sm font-semibold flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
          <Thermometer className="h-4 w-4 text-orange-400" /> Carga de Condensação
        </p>
        <div className="space-y-1.5">
          <KV label="Q evaporador"                  value={`${(qEvapW / 1000).toFixed(2)} kW`}  accent="text-[--ice-400]" />
          {hasCycle && <KV label="W compressor"     value={`${(wCompW / 1000).toFixed(2)} kW`}  accent="text-yellow-400" />}
          <KV label="Q condensador (Q_evap + W_comp)" value={`${(qCond / 1000).toFixed(2)} kW`} accent="text-orange-400" />
          <KV label="COP ciclo"                     value={cop.toFixed(2)} />
          <KV label="Carga específica (por m² piso)" value={`${specificLoad.toFixed(0)} W/m²`} />
          <KV label="T condensação"                 value={`${s.T_condensing_c.toFixed(1)} °C`} />
          <KV label="T externo"                     value={`${s.T_outside_c.toFixed(1)} °C`} />
          <KV label="ΔT condensador"                value={`${dtCond.toFixed(1)} K`} />
        </div>
      </div>

      {/* Validação */}
      <div className="cn-card p-4 space-y-2">
        <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Validação</p>
        <div className="flex items-center gap-2 text-xs">
          {passViable
            ? <span className="rounded px-2 py-0.5 font-bold" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>✓ VIÁVEL</span>
            : <span className="rounded px-2 py-0.5 font-bold" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>✗ REVISAR</span>
          }
          <span style={{ color: "var(--text-secondary)" }}>
            ΔT = {dtCond.toFixed(0)} K {passViable ? "(faixa típica 10–25 K)" : "(fora da faixa típica 10–25 K — revisar T_cond ou T_ext)"}
          </span>
        </div>
      </div>

      {/* Sugestão */}
      <div className="rounded-md border p-4 text-xs space-y-1"
           style={{ background: "rgba(56,189,248,0.07)", borderColor: "rgba(56,189,248,0.25)", color: "var(--ice-400)" }}>
        <p className="font-semibold">Sugestão de dimensionamento:</p>
        <ul className="ml-4 list-disc space-y-0.5" style={{ color: "var(--text-secondary)" }}>
          <li>Q_cond ≥ <strong style={{ color: "var(--ice-400)" }}>{(qCond / 1000).toFixed(2)} kW</strong> na condição T_ext = {s.T_outside_c} °C.</li>
          <li>ΔT condensador de {dtCond.toFixed(0)} K — verificar seleção pelo fabricante.</li>
          <li>Para dimensionamento completo: use o Hub de Testes com condensador ativo.</li>
        </ul>
      </div>
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

  function handleCalculate(ws: AgroWorkspaceResult) {
    if (ws.hot_gas_bypass) setCycleResult(ws.hot_gas_bypass);
  }

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

  const [activeTab, setActiveTab] = useState<"camara" | "ciclo" | "aletado" | "psicrometria" | "condensador">("camara");

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 p-5">
      <div className="border-b pb-3" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="flex items-center gap-2">
          <Sprout className="h-5 w-5" style={{ color: "var(--color-success)" }} />
          <h1 className="font-display text-lg font-bold tracking-wide" style={{ color: "var(--text-primary)" }}>Workspace AGRO</h1>
          <span className="cn-badge cn-badge--approved text-[10px]">
            Hot Gas Bypass · Controle de UR · Sprint 4
          </span>
        </div>
        <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
          Câmara agrícola com controle simultâneo de temperatura e umidade via gás quente.
          Engine: calculateAgroWorkspace (orquestrador coldpro_v2 — detecta modo automaticamente).
        </p>
      </div>

      {/* Tab nav */}
      <div className="border-b" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="flex flex-wrap gap-1">
          {(["camara", "ciclo", "aletado", "psicrometria", "condensador"] as const).map((tab, i) => {
            const labels = { camara: "A1 Câmara", ciclo: "A3 Ciclo AGRO", aletado: "A2 Aletado", psicrometria: "A4 Psicrometria", condensador: "A5 Condensador" };
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`cn-tab text-xs ${activeTab === tab ? "active" : ""}`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-2">
        {activeTab === "camara"       && <CamaraTab s={s} u={u} />}
        {activeTab === "ciclo"        && <CicloTab s={s} u={u} onSendToHub={handleSendToHub} onCalculate={handleCalculate} />}
        {activeTab === "aletado"      && <AletadoTab s={s} u={u} qReheatW={cycleResult?.Q_reheat_w ?? 0} />}
        {activeTab === "psicrometria" && <PsicrometriaTab s={s} />}
        {activeTab === "condensador"  && <CondensadorTab s={s} cycleResult={cycleResult} />}
      </div>
    </div>
  );
}
