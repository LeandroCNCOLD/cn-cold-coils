/**
 * AgroWorkspacePage — Sprint 6
 *
 * Workspace AGRO: ciclo com hot gas bypass para controle simultâneo de
 * temperatura e umidade em câmaras agrícolas.
 *
 * Motor: calculateHotGasBypass (coldpro_v2).
 */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sprout, Droplets, Thermometer, Wind, Zap, Play, AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { calculateHotGasBypass } from "@/modules/coldpro_v2";
import type { HotGasBypassInput, HotGasBypassResult } from "@/modules/coldpro_v2/domain/types";
import { useTestHubStore } from "../stores/useTestHubStore";

interface FormState {
  T_air_in_c: number;
  RH_air_in_pct: number;
  T_supply_c: number;
  RH_target_pct: number;
  air_mass_flow_kg_s: number;
  T_evaporating_c: number;
  T_condensing_c: number;
  max_bypass_fraction: number;
  P_atm: number;
}

const DEFAULTS: FormState = {
  T_air_in_c: 20,
  RH_air_in_pct: 85,
  T_supply_c: 12,
  RH_target_pct: 65,
  air_mass_flow_kg_s: 1.2,
  T_evaporating_c: 0,
  T_condensing_c: 45,
  max_bypass_fraction: 0.5,
  P_atm: 101325,
};

function modeBadge(m: HotGasBypassResult["mode"]) {
  switch (m) {
    case "cooling_only":
      return { label: "Apenas Resfriamento", className: "bg-blue-100 text-blue-700 border-blue-300" };
    case "hot_gas_bypass":
      return { label: "Hot Gas Bypass", className: "bg-violet-100 text-violet-700 border-violet-300" };
    case "electric_reheat":
      return { label: "Reaquecimento Elétrico", className: "bg-amber-100 text-amber-700 border-amber-300" };
    default:
      return { label: "Inválido", className: "bg-red-100 text-red-700 border-red-300" };
  }
}

function NumField({
  label,
  unit,
  value,
  onChange,
  step = 0.1,
  Icon,
}: {
  label: string;
  unit?: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  Icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div>
      <Label className="flex items-center gap-1 text-xs">
        {Icon && <Icon className="h-3 w-3 text-slate-500" />}
        {label} {unit && <span className="text-slate-400">({unit})</span>}
      </Label>
      <Input
        type="number"
        step={step}
        value={value}
        onChange={(e) => {
          const n = parseFloat(e.target.value);
          if (!isNaN(n)) onChange(n);
        }}
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

export function AgroWorkspacePage() {
  const [form, setForm] = useState<FormState>(DEFAULTS);
  const [result, setResult] = useState<HotGasBypassResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setConditions = useTestHubStore((s) => s.setConditions);
  const setCompressor = useTestHubStore((s) => s.setCompressor);
  const setCondenser = useTestHubStore((s) => s.setCondenser);

  function handleSendToHub() {
    if (!result) return;
    setConditions({
      ambient_temp_c: form.T_air_in_c,
      required_airflow_m3_h: (form.air_mass_flow_kg_s * 3600) / 1.2,
    });
    toast.success("Cenário AGRO enviado ao Hub de Testes", {
      description: `T_evap=${form.T_evaporating_c}°C · T_cond=${form.T_condensing_c}°C · β=${(result.bypass_fraction * 100).toFixed(0)}%`,
    });
    navigate({ to: "/coldpro/hub-de-testes" });
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleCalculate() {
    setError(null);
    try {
      const input: HotGasBypassInput = {
        T_air_in_c: form.T_air_in_c,
        RH_air_in: form.RH_air_in_pct / 100,
        T_air_out_setpoint_c: form.T_supply_c,
        RH_air_out_setpoint: form.RH_target_pct / 100,
        air_mass_flow_kg_s: form.air_mass_flow_kg_s,
        T_evaporating_c: form.T_evaporating_c,
        T_condensing_c: form.T_condensing_c,
        max_bypass_fraction: form.max_bypass_fraction,
        P_atm: form.P_atm,
      };
      const r = calculateHotGasBypass(input);
      setResult(r);
    } catch (e) {
      setError(String(e));
      setResult(null);
    }
  }

  const mode = result ? modeBadge(result.mode) : null;
  const rhExceeds =
    result && result.RH_air_out * 100 > form.RH_target_pct + 5;

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-5 p-5">
      {/* Cabeçalho */}
      <div className="border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <Sprout className="h-5 w-5 text-emerald-600" />
          <h1 className="text-lg font-bold text-slate-900">Workspace AGRO</h1>
          <Badge variant="outline" className="text-[10px] text-emerald-700">
            Hot Gas Bypass · Controle de UR
          </Badge>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          Ciclo de refrigeração com gás quente para controle simultâneo de temperatura e umidade
          em câmaras agrícolas e processos sensíveis à UR.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Coluna esquerda — entrada */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Painel de Entrada</CardTitle>
            <CardDescription className="text-xs">
              Defina as condições de ambiente, setpoint e parâmetros do ciclo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Ambiente */}
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase text-slate-500">Ambiente</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <NumField
                  label="T ambiente"
                  unit="°C"
                  Icon={Thermometer}
                  value={form.T_air_in_c}
                  onChange={(v) => update("T_air_in_c", v)}
                />
                <NumField
                  label="UR ambiente"
                  unit="%"
                  Icon={Droplets}
                  value={form.RH_air_in_pct}
                  onChange={(v) => update("RH_air_in_pct", v)}
                />
              </div>
            </div>

            {/* Setpoint */}
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase text-slate-500">Setpoint de insuflamento</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <NumField
                  label="T insuflamento"
                  unit="°C"
                  Icon={Thermometer}
                  value={form.T_supply_c}
                  onChange={(v) => update("T_supply_c", v)}
                />
                <NumField
                  label="UR alvo"
                  unit="%"
                  Icon={Droplets}
                  value={form.RH_target_pct}
                  onChange={(v) => update("RH_target_pct", v)}
                />
              </div>
            </div>

            {/* Ciclo */}
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase text-slate-500">Ciclo de refrigeração</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <NumField
                  label="T evaporação"
                  unit="°C"
                  value={form.T_evaporating_c}
                  onChange={(v) => update("T_evaporating_c", v)}
                />
                <NumField
                  label="T condensação"
                  unit="°C"
                  value={form.T_condensing_c}
                  onChange={(v) => update("T_condensing_c", v)}
                />
                <NumField
                  label="Vazão mássica de ar"
                  unit="kg/s"
                  Icon={Wind}
                  step={0.05}
                  value={form.air_mass_flow_kg_s}
                  onChange={(v) => update("air_mass_flow_kg_s", v)}
                />
                <NumField
                  label="β máx (bypass)"
                  unit="0..1"
                  step={0.05}
                  value={form.max_bypass_fraction}
                  onChange={(v) => update("max_bypass_fraction", v)}
                />
                <NumField
                  label="Pressão atmosférica"
                  unit="Pa"
                  step={100}
                  value={form.P_atm}
                  onChange={(v) => update("P_atm", v)}
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleCalculate} className="gap-2">
                <Play className="h-4 w-4" /> Calcular
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Coluna direita — resultados */}
        <div className="space-y-4">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-xs text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {!result && !error && (
            <Alert>
              <Sprout className="h-4 w-4" />
              <AlertDescription className="text-xs">
                Preencha os parâmetros e clique em <strong>Calcular</strong> para gerar o ciclo.
              </AlertDescription>
            </Alert>
          )}

          {result && mode && (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4 text-violet-500" />
                      Ciclo com Hot Gas Bypass
                    </CardTitle>
                    <Badge variant="outline" className={`${mode.className} text-xs`}>
                      {mode.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-2 sm:grid-cols-2">
                  <KV
                    label="Fração de by-pass β"
                    value={`${(result.bypass_fraction * 100).toFixed(1)} %`}
                  />
                  <KV
                    label="Q evaporador"
                    value={`${result.Q_evap_w.toFixed(0)} W`}
                    accent="text-blue-700"
                  />
                  <KV
                    label="Q reaquecimento"
                    value={`${result.Q_reheat_w.toFixed(0)} W`}
                    accent="text-amber-700"
                  />
                  <KV
                    label="W compressor"
                    value={`${result.W_compressor_w.toFixed(0)} W`}
                  />
                  <KV
                    label="COP do ciclo"
                    value={result.cop_cycle.toFixed(2)}
                    accent="text-emerald-700"
                  />
                  <KV
                    label="Água removida"
                    value={`${result.water_removed_kg_h.toFixed(2)} kg/h`}
                  />
                  <KV
                    label="T saída"
                    value={`${result.T_air_out_c.toFixed(1)} °C`}
                  />
                  <KV
                    label="UR saída"
                    value={`${(result.RH_air_out * 100).toFixed(1)} %`}
                  />
                  <KV
                    label="T ponto de orvalho"
                    value={`${result.T_dew_out_c.toFixed(1)} °C`}
                  />
                  <KV
                    label="Iterações"
                    value={`${result.iterations}${result.converged ? " ✓" : " ✗"}`}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Recomendação do Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <p className="text-slate-700">
                    Modo recomendado: <strong>{mode.label}</strong>.
                  </p>
                  {rhExceeds && (
                    <Alert className="border-amber-200 bg-amber-50">
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                      <AlertDescription className="text-xs text-amber-700">
                        UR de saída ({(result.RH_air_out * 100).toFixed(1)} %) excede o alvo em
                        mais de 5 % — considere aumentar β, reduzir T_evap ou usar
                        reaquecimento elétrico.
                      </AlertDescription>
                    </Alert>
                  )}
                  {result.warnings.length > 0 && (
                    <div className="rounded border border-amber-200 bg-amber-50/60 p-2">
                      <p className="font-bold text-amber-700">Avisos do motor:</p>
                      <ul className="ml-4 list-disc text-amber-700">
                        {result.warnings.map((w: string, i: number) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
