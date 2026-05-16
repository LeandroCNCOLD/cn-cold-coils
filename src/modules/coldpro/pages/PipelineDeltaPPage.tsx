import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Gauge, Thermometer, Wind, GitMerge } from "lucide-react";
import {
  calculatePipelinePressureDrop,
  type PipelineFluidPhase,
  type PipelineRefrigerant,
} from "../engines/pipelinePressureDropEngine";
import { LabelWithTooltip } from "../components/ui/FieldTooltip";

function NF({
  label, value, onChange, unit, min, max, step, tooltip,
}: {
  label: string; value: number; onChange: (v: number) => void;
  unit?: string; min?: number; max?: number; step?: number; tooltip?: string;
}) {
  return (
    <div>
      <Label className="mb-1 block text-[11px] text-slate-500">
        {tooltip ? <LabelWithTooltip label={label} tooltip={tooltip} /> : label}
        {unit && <span className="ml-1 text-slate-400">({unit})</span>}
      </Label>
      <Input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step ?? 1}
        onChange={(e) => { const v = parseFloat(e.target.value); if (isFinite(v)) onChange(v); }}
        className="h-8 text-xs"
      />
    </div>
  );
}

function KV({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded border border-slate-100 bg-slate-50/40 px-3 py-2">
      <span className="text-xs text-slate-500">{label}</span>
      <span className={`font-mono text-sm font-semibold ${highlight ? "text-amber-700" : "text-slate-800"}`}>{value}</span>
    </div>
  );
}

const DIAMETER_PRESETS = [
  { label: '½" (12.7 mm)', value: 12.7 },
  { label: '⅝" (15.9 mm)', value: 15.9 },
  { label: '¾" (19.1 mm)', value: 19.1 },
  { label: '⅞" (22.2 mm)', value: 22.2 },
  { label: '1⅛" (28.6 mm)', value: 28.6 },
  { label: '1⅜" (34.9 mm)', value: 34.9 },
  { label: '1⅝" (41.3 mm)', value: 41.3 },
];

export function PipelineDeltaPPage() {
  const [refrigerant, setRefrigerant] = useState<PipelineRefrigerant>("R404A");
  const [Te, setTe] = useState(-10);
  const [diameter, setDiameter] = useState(22.2);
  const [length, setLength] = useState(15);
  const [massFlow, setMassFlow] = useState(120);
  const [phase, setPhase] = useState<PipelineFluidPhase>("vapor");
  const [fittingsEqLen, setFittingsEqLen] = useState(5);
  const [quality, setQuality] = useState(0.85);

  const result = useMemo(
    () =>
      calculatePipelinePressureDrop({
        refrigerant,
        Te_C: Te,
        pipe_diameter_mm: diameter,
        pipe_length_m: length,
        mass_flow_kg_h: massFlow,
        phase,
        vapor_quality: quality,
        fittings_equivalent_length_m: fittingsEqLen,
      }),
    [refrigerant, Te, diameter, length, massFlow, phase, fittingsEqLen, quality],
  );

  const regimeCls =
    result.flow_regime === "turbulent"
      ? "border-emerald-300 bg-emerald-50 text-emerald-700"
      : result.flow_regime === "transitional"
      ? "border-amber-300 bg-amber-50 text-amber-700"
      : "border-slate-300 bg-slate-50 text-slate-600";

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-5 p-5">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-lg font-bold text-slate-900">ΔP Tubulações (SC4)</h1>
        <p className="text-xs text-slate-500">
          Queda de pressão em linhas de sucção/descarga/líquido e impacto equivalente na temperatura de evaporação.
          Método: Darcy-Weisbach + Blasius · Bifásico: Lockhart-Martinelli.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Inputs */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <GitMerge className="h-4 w-4 text-slate-500" />
              Parâmetros da Tubulação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1 block text-[11px] text-slate-500">Refrigerante</Label>
                <Select value={refrigerant} onValueChange={(v) => setRefrigerant(v as PipelineRefrigerant)}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["R404A","R507A","R134a","R410A","R22","R448A","R449A","R290"].map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1 block text-[11px] text-slate-500">Fase do escoamento</Label>
                <Select value={phase} onValueChange={(v) => setPhase(v as PipelineFluidPhase)}>
                  <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vapor">Vapor (sucção)</SelectItem>
                    <SelectItem value="liquid">Líquido (linha liq.)</SelectItem>
                    <SelectItem value="two_phase">Bifásico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <NF label="Te evaporação" value={Te} onChange={setTe} unit="°C" min={-50} max={20} step={1}
                tooltip="Temperatura de saturação do refrigerante no evaporador. Usada para interpolação das propriedades termodinâmicas (ρ, μ, P_sat, dT/dP)." />
              <NF label="Vazão mássica" value={massFlow} onChange={setMassFlow} unit="kg/h" min={1} max={5000} step={5}
                tooltip="Fluxo mássico total de refrigerante na tubulação. Converte-se para kg/s internamente para calcular velocidade e número de Reynolds." />
            </div>

            <div>
              <Label className="mb-1 block text-[11px] text-slate-500">Diâmetro da tubulação</Label>
              <div className="flex flex-wrap gap-1.5">
                {DIAMETER_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setDiameter(p.value)}
                    className={`rounded border px-2 py-0.5 text-[10px] transition-colors ${
                      diameter === p.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 hover:border-slate-400 text-slate-600"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <Input
                type="number"
                value={diameter}
                min={6}
                max={200}
                step={0.1}
                onChange={(e) => { const v = parseFloat(e.target.value); if (isFinite(v) && v > 0) setDiameter(v); }}
                className="mt-2 h-8 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <NF label="Comprimento reto" value={length} onChange={setLength} unit="m" min={0.1} max={500} step={0.5}
                tooltip="Comprimento reto da tubulação, sem contar conexões. Adicionado ao comprimento equivalente de conexões para obter o comprimento total de cálculo." />
              <NF label="Conexões (L equiv.)" value={fittingsEqLen} onChange={setFittingsEqLen} unit="m" min={0} max={100} step={0.5}
                tooltip="Comprimento equivalente de todas as conexões (cotovelos, tês, válvulas). Regra geral: somar 20–30% do comprimento reto como estimativa conservadora." />
            </div>

            {phase === "two_phase" && (
              <NF label="Título de vapor (x)" value={quality} onChange={setQuality} min={0.01} max={0.99} step={0.01}
                tooltip="Fração mássica de vapor no escoamento bifásico (0 = líquido puro, 1 = vapor puro). Afeta o multiplicador de Lockhart-Martinelli. Típico para linhas de sucção: x = 0,90–0,95." />
            )}
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Gauge className="h-4 w-4 text-blue-500" />
                Resultados
                <Badge variant="outline" className={`ml-auto text-[10px] ${regimeCls}`}>
                  {result.flow_regime}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <KV label="Queda de pressão" value={`${result.delta_P_kPa.toFixed(2)} kPa`} />
              <KV label="ΔTe equivalente" value={`−${result.delta_Te_K.toFixed(2)} K`} highlight={result.delta_Te_K > 1.5} />
              <KV label="Te efetiva" value={`${result.effective_Te_C.toFixed(2)} °C`} highlight={result.delta_Te_K > 1.5} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Wind className="h-4 w-4 text-purple-500" />
                Escoamento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <KV label="Velocidade" value={`${result.velocity_m_s.toFixed(2)} m/s`} highlight={result.velocity_m_s > 15} />
              <KV label="Reynolds" value={result.reynolds.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} />
              <KV label="Fator de atrito (f)" value={result.friction_factor.toFixed(4)} />
              <KV label="Vel. mássica" value={`${result.mass_velocity_kg_m2s.toFixed(1)} kg/m²·s`} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Thermometer className="h-4 w-4 text-amber-500" />
                Impacto no Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`rounded-lg p-3 text-xs ${
                result.delta_Te_K > 2 ? "bg-red-50 text-red-700" :
                result.delta_Te_K > 1 ? "bg-amber-50 text-amber-700" :
                "bg-emerald-50 text-emerald-700"
              }`}>
                <p className="font-semibold">
                  {result.delta_Te_K > 2 ? "⚠ Impacto significativo" :
                   result.delta_Te_K > 1 ? "~ Impacto moderado" :
                   "✓ Impacto aceitável"}
                </p>
                <p className="mt-1">
                  A queda de pressão de <strong>{result.delta_P_kPa.toFixed(2)} kPa</strong> reduz a
                  temperatura de evaporação efetiva em <strong>{result.delta_Te_K.toFixed(2)} K</strong>,
                  de {Te.toFixed(1)} °C para <strong>{result.effective_Te_C.toFixed(2)} °C</strong>.
                  {result.delta_Te_K > 1 && " Dimensionar tubulação maior para reduzir o impacto."}
                </p>
              </div>
            </CardContent>
          </Card>

          {result.warnings.length > 0 && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertDescription className="text-xs text-amber-700">
                <ul className="space-y-0.5">
                  {result.warnings.map((w, i) => <li key={i}>• {w}</li>)}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
