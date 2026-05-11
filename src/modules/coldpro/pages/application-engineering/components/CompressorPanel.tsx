import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Info,
  Loader2,
  Play,
  Thermometer,
  Zap,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CompressorPickerModal } from "@/modules/cn_coils/components/CompressorPickerModal";
import type { CompressorItem } from "@/modules/cn_coils/components/CompressorPickerModal";
import { getCompressorById } from "@/modules/coldpro_catalog/data/compressorCatalog.service";
import { useApplicationEngineering } from "../hooks/useApplicationEngineering";
import { generateCapacityCurve } from "../services/capacityCurveService";
import type { CapacityCurvePoint } from "../types/app-engineering.types";
import { convertPower, fmtBR, type PowerUnit } from "@/utils/unitConversions";

// ── Componente auxiliar ──────────────────────────────────────────────────────
function ResultRow({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="flex items-center justify-between py-1 text-xs border-b border-border/40 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-medium">
        {value}
        {unit && <span className="ml-1 text-muted-foreground">{unit}</span>}
      </span>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────
export function CompressorPanel() {
  const { compressorInput, compressorResult, setCompressorInput } = useApplicationEngineering();

  const [pickerOpen, setPickerOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<CompressorItem | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Varredura de pontos operacionais (grade Te × Tc)
  const [teStart, setTeStart] = useState<number>(-10);
  const [teEnd, setTeEnd] = useState<number>(-30);
  const [teStep, setTeStep] = useState<number>(5);
  const [tcStart, setTcStart] = useState<number>(35);
  const [tcEnd, setTcEnd] = useState<number>(50);
  const [tcStep, setTcStep] = useState<number>(5);
  const [unit, setUnit] = useState<PowerUnit>("kW");
  const [sweepPoints, setSweepPoints] = useState<CapacityCurvePoint[] | null>(null);

  /**
   * Chamado quando o usuário confirma a seleção no CompressorPickerModal.
   * Busca o CompressorCatalogRow completo para extrair os coeficientes EN12900.
   */
  const handleSelect = useCallback(
    async (item: CompressorItem) => {
      setPickerOpen(false);
      setLoadError(null);
      setLoadingId(item.id);
      try {
        const row = await getCompressorById(item.id);
        if (!row) {
          setLoadError(`Compressor "${item.model}" não encontrado no catálogo.`);
          return;
        }
        const pt = row.calibration_points?.[0];
        if (!pt || !pt.cap_coeffs || pt.cap_coeffs.length < 10) {
          setLoadError(`Compressor "${item.model}" não possui coeficientes EN12900 válidos.`);
          return;
        }
        // ✅ Extrai cap_coeffs e pwr_coeffs do ponto de calibração padrão
        setCompressorInput({
          capacity_coefficients: pt.cap_coeffs,
          power_coefficients: pt.pwr_coeffs ?? [],
        });
        setSelectedItem(item);
      } catch (err) {
        setLoadError("Erro ao carregar dados do compressor. Tente novamente.");
        console.error("[CompressorPanel] getCompressorById error:", err);
      } finally {
        setLoadingId(null);
      }
    },
    [setCompressorInput],
  );

  const hasCoefficients =
    (compressorInput.capacity_coefficients?.length ?? 0) >= 10 &&
    (compressorInput.power_coefficients?.length ?? 0) >= 10;

  const teCount = useMemo(() => {
    const span = Math.abs(teEnd - teStart);
    const step = Math.abs(teStep);
    if (!step) return 0;
    return Math.floor(span / step) + 1;
  }, [teStart, teEnd, teStep]);

  const tcCount = useMemo(() => {
    const span = Math.abs(tcEnd - tcStart);
    const step = Math.abs(tcStep);
    if (!step) return 0;
    return Math.floor(span / step) + 1;
  }, [tcStart, tcEnd, tcStep]);

  const sweepCount = teCount * tcCount;

  const tcValues = useMemo(() => {
    const step = Math.abs(tcStep) || 1;
    const tcMin = Math.min(tcStart, tcEnd);
    const tcMax = Math.max(tcStart, tcEnd);
    const arr: number[] = [];
    for (let v = tcMin; v <= tcMax + 1e-9; v += step) arr.push(Number(v.toFixed(2)));
    return tcStart > tcEnd ? arr.slice().reverse() : arr;
  }, [tcStart, tcEnd, tcStep]);

  const runSweep = useCallback(() => {
    if (!hasCoefficients) return;
    const step = Math.abs(teStep) || 1;
    const teMin = Math.min(teStart, teEnd);
    const teMax = Math.max(teStart, teEnd);
    const nPoints = Math.floor((teMax - teMin) / step) + 1;
    const { series } = generateCapacityCurve({
      capacity_coefficients: compressorInput.capacity_coefficients ?? [],
      power_coefficients: compressorInput.power_coefficients ?? [],
      te_min_c: teMin,
      te_max_c: teMax,
      n_points: nPoints,
      tc_values_c: tcValues,
    });
    // Achatar todos os pontos (Te × Tc) — ordenados: para cada Tc, varrer Te
    const all: CapacityCurvePoint[] = [];
    for (const s of series) {
      const pts = teStart > teEnd ? [...s.points].reverse() : s.points;
      all.push(...pts);
    }
    setSweepPoints(all);
  }, [hasCoefficients, compressorInput, teStart, teEnd, teStep, tcValues]);


  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {/* Seleção do compressor */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Cpu className="h-4 w-4 text-primary" />
              Seleção do Compressor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Botão de seleção */}
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => setPickerOpen(true)}
              disabled={loadingId !== null}
            >
              <span className="flex items-center gap-2">
                {loadingId ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Cpu className="h-4 w-4" />
                )}
                {selectedItem ? selectedItem.model : "Selecionar Compressor…"}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>

            {/* Erro de carregamento */}
            {loadError && (
              <Alert variant="destructive" className="py-2">
                <AlertTriangle className="h-3 w-3" />
                <AlertDescription className="text-xs">{loadError}</AlertDescription>
              </Alert>
            )}

            {/* Informações do compressor selecionado */}
            {selectedItem && !loadError && (
              <div className="rounded-md border bg-muted/30 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{selectedItem.model}</span>
                  {selectedItem.refrigerant && (
                    <Badge variant="secondary" className="text-[10px]">
                      {selectedItem.refrigerant}
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  {selectedItem.nominalCapacityW && (
                    <div className="flex items-center gap-1">
                      <Thermometer className="h-3 w-3" />
                      <span>{(selectedItem.nominalCapacityW / 1000).toFixed(1)} kW nom.</span>
                    </div>
                  )}
                  {selectedItem.nominalPowerW && (
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      <span>{(selectedItem.nominalPowerW / 1000).toFixed(1)} kW elét.</span>
                    </div>
                  )}
                </div>
                {hasCoefficients && (
                  <div className="flex items-center gap-1 text-[10px] text-green-600">
                    <CheckCircle2 className="h-3 w-3" />
                    10 coeficientes EN12900 carregados (cap + pwr)
                  </div>
                )}
              </div>
            )}

            {/* Estado inicial — sem seleção */}
            {!selectedItem && !loadingId && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Selecione um compressor do catálogo BITZER. Os coeficientes EN12900 serão
                  carregados automaticamente.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Varredura de pontos operacionais */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm">
              <span>Varredura de Pontos Operacionais</span>
              {sweepPoints && sweepPoints.length > 0 && (
                <Badge variant="secondary" className="text-[10px]">
                  {sweepPoints.length} pontos
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!hasCoefficients ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Selecione um compressor para configurar a varredura
              </p>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground">T evap. inicial (°C)</Label>
                    <Input
                      type="number"
                      value={teStart}
                      onChange={(e) => setTeStart(parseFloat(e.target.value))}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground">T evap. final (°C)</Label>
                    <Input
                      type="number"
                      value={teEnd}
                      onChange={(e) => setTeEnd(parseFloat(e.target.value))}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground">Passo Te (°C)</Label>
                    <Input
                      type="number"
                      min={0.5}
                      step={0.5}
                      value={teStep}
                      onChange={(e) => setTeStep(parseFloat(e.target.value))}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div />
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground">T cond. inicial (°C)</Label>
                    <Input
                      type="number"
                      value={tcStart}
                      onChange={(e) => setTcStart(parseFloat(e.target.value))}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground">T cond. final (°C)</Label>
                    <Input
                      type="number"
                      value={tcEnd}
                      onChange={(e) => setTcEnd(parseFloat(e.target.value))}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground">Passo Tc (°C)</Label>
                    <Input
                      type="number"
                      min={0.5}
                      step={0.5}
                      value={tcStep}
                      onChange={(e) => setTcStep(parseFloat(e.target.value))}
                      className="h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[11px] text-muted-foreground">Unidade</Label>
                    <Select value={unit} onValueChange={(v) => setUnit(v as PowerUnit)}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kW">kW</SelectItem>
                        <SelectItem value="kcal/h">kcal/h</SelectItem>
                        <SelectItem value="BTU/h">BTU/h</SelectItem>
                        <SelectItem value="TR">TR</SelectItem>
                        <SelectItem value="W">W</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>
                    {sweepCount > 0
                      ? `${teCount} × ${tcCount} = ${sweepCount} pontos serão calculados`
                      : "Defina passos válidos"}
                  </span>
                  <Button
                    size="sm"
                    onClick={runSweep}
                    disabled={!hasCoefficients || sweepCount < 1}
                    className="h-7 gap-1 text-xs"
                  >
                    <Play className="h-3 w-3" />
                    Calcular
                  </Button>
                </div>

                {sweepPoints && sweepPoints.length > 0 && (
                  <div className="max-h-[420px] overflow-auto rounded-md border">
                    <table className="w-full text-xs">
                      <thead className="sticky top-0 bg-muted/80 backdrop-blur text-[10px] uppercase text-muted-foreground">
                        <tr>
                          <th className="px-2 py-1.5 text-left font-medium">Te (°C)</th>
                          <th className="px-2 py-1.5 text-left font-medium">Tc (°C)</th>
                          <th className="px-2 py-1.5 text-right font-medium">Q ({unit})</th>
                          <th className="px-2 py-1.5 text-right font-medium">P (kW)</th>
                          <th className="px-2 py-1.5 text-right font-medium">COP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sweepPoints.map((p, i) => (
                          <tr key={i} className="border-t border-border/40">
                            <td className="px-2 py-1 font-mono">{p.te_c.toFixed(1)}</td>
                            <td className="px-2 py-1 font-mono">{p.tc_c.toFixed(1)}</td>
                            <td className="px-2 py-1 text-right font-mono">
                              {fmtBR(convertPower(p.capacity_w, unit), unit === "W" || unit === "kcal/h" || unit === "BTU/h" ? 0 : 2)}
                            </td>
                            <td className="px-2 py-1 text-right font-mono">
                              {(p.power_w / 1000).toFixed(2)}
                            </td>
                            <td className="px-2 py-1 text-right font-mono">{p.cop.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {compressorResult && (
                  <div className="rounded-md border border-border/40 bg-muted/20 p-2 text-[11px] text-muted-foreground">
                    Ponto único:{" "}
                    <span className="font-mono">
                      Q={(compressorResult.capacity_w / 1000).toFixed(2)} kW · P=
                      {(compressorResult.power_w / 1000).toFixed(2)} kW · COP=
                      {compressorResult.cop.toFixed(2)}
                    </span>
                    {!compressorResult.within_envelope && (
                      <span className="ml-2 text-amber-600">⚠ fora do envelope</span>
                    )}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal de seleção */}
      <CompressorPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleSelect}
      />
    </>
  );
}
