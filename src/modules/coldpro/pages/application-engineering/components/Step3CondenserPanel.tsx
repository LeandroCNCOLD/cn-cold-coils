import { useState, useEffect } from "react";
import { ChevronRight, Flame, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GeometryPickerModal } from "@/modules/cn_coils/components/GeometryPickerModal";
import { FanPickerModal } from "@/modules/cn_coils/components/FanPickerModal";
import { useEnrichedFanPickerItems } from "@/modules/cn_coils/hooks/useEnrichedFanPickerItems";
import { useCnCoilsSimulationStore } from "@/modules/cn_coils/store/useCnCoilsSimulationStore";
import { useAppEngineeringStore } from "../store/useAppEngineeringStore";
import { dimensionCondenser } from "../services/condenserDimensioningService";
import { CoveragePointsTable } from "./CoveragePointsTable";
import { FlexibleNumberInput } from "./FlexibleNumberInput";

const FIN_SPACING_OPTIONS = [4, 6, 7, 8, 10, 12];

interface Props {
  onNext: () => void;
}

export function Step3CondenserPanel({ onNext }: Props) {
  const { step1, step3, updateStep3 } = useAppEngineeringStore();
  const compressorSweep = useAppEngineeringStore((s) => s.compressorSweep);
  const [geoOpen, setGeoOpen] = useState(false);
  const [fanOpen, setFanOpen] = useState(false);
  const [calculating, setCalculating] = useState(false);

  const selectedGeometry = useCnCoilsSimulationStore((s) => s.selectedGeometry);
  const { items: fanItems } = useEnrichedFanPickerItems();

  useEffect(() => {
    if (selectedGeometry && selectedGeometry !== step3.geometry) {
      updateStep3({ geometry: selectedGeometry, result: null });
    }
  }, [selectedGeometry]);

  const designPoint = step1.designPoint;
  const required_heat_rejection_w = designPoint
    ? designPoint.capacity_w + designPoint.power_w
    : 0;

  const airflow_m3h =
    step3.fan && step3.fanCount > 0
      ? (step3.fan.airflow_m3h ?? 0) * step3.fanCount
      : 0;

  function handleCalculate() {
    if (!step3.geometry || !designPoint) return;
    setCalculating(true);
    try {
      const result = dimensionCondenser({
        geometry: step3.geometry,
        rows: step3.rows,
        tubesPerRow: step3.tubesPerRow,
        lengthMm: step3.lengthMm,
        finSpacingMm: step3.finSpacingMm,
        airflowM3h: airflow_m3h,
        airInletTempC: step3.airInletTempC,
        tc_c: designPoint.tc_c,
        refrigerant: step1.refrigerant,
        required_heat_rejection_w,
        compressorSweep: compressorSweep.length > 0 ? compressorSweep : undefined,
        delta_t_target_k: designPoint.tc_c - step3.airInletTempC,
      });
      updateStep3({ result, completed: result.status === "ok" });
    } finally {
      setCalculating(false);
    }
  }

  const canCalculate = !!step3.geometry && airflow_m3h > 0 && !!designPoint;
  const canProceed = step3.completed && step3.result?.status === "ok";

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Flame className="h-4 w-4 text-orange-600" />
            Etapa 3 — Condensador
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Ponto de referência */}
          {designPoint && (
            <div className="rounded-md border border-orange-100 bg-orange-50 px-3 py-2 text-xs text-orange-700">
              Rejeição de calor: Q_rej = Q_evap + W_comp ={" "}
              <strong>{(required_heat_rejection_w / 1000).toFixed(2)} kW</strong>
              {" "}(Tc = {designPoint.tc_c}°C)
            </div>
          )}

          {/* Geometria + Ventilador */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Geometria do Serpentim
              </label>
              <Button
                variant="outline"
                size="sm"
                className="h-9 w-full text-xs"
                onClick={() => setGeoOpen(true)}
              >
                {step3.geometry?.name ?? "Selecionar geometria…"}
              </Button>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Ventilador
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 flex-1 text-xs"
                  onClick={() => setFanOpen(true)}
                >
                  {step3.fan?.model ?? "Selecionar ventilador…"}
                </Button>
                <Input
                  type="number"
                  min={1}
                  max={6}
                  value={step3.fanCount}
                  onChange={(e) => updateStep3({ fanCount: Number(e.target.value), result: null })}
                  className="h-9 w-14 text-center text-xs"
                  title="Quantidade"
                />
              </div>
              {step3.fan && (
                <p className="mt-0.5 text-[10px] text-slate-400">
                  {airflow_m3h.toFixed(0)} m³/h total ({step3.fanCount}×{step3.fan.airflow_m3h?.toFixed(0)} m³/h)
                </p>
              )}
            </div>
          </div>

          {/* Parâmetros */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Fileiras</label>
              <Input
                type="number"
                min={1}
                max={8}
                value={step3.rows}
                onChange={(e) => updateStep3({ rows: Number(e.target.value), result: null })}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Tubos/Fileira</label>
              <Input
                type="number"
                min={1}
                max={40}
                value={step3.tubesPerRow}
                onChange={(e) => updateStep3({ tubesPerRow: Number(e.target.value), result: null })}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Comprimento [mm]</label>
              <Input
                type="number"
                min={200}
                max={4000}
                step={50}
                value={step3.lengthMm}
                onChange={(e) => updateStep3({ lengthMm: Number(e.target.value), result: null })}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Passo de Aleta [mm]</label>
              <Select
                value={String(step3.finSpacingMm)}
                onValueChange={(v) => updateStep3({ finSpacingMm: Number(v), result: null })}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FIN_SPACING_OPTIONS.map((s) => (
                    <SelectItem key={s} value={String(s)}>
                      {s} mm
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">T_ar_entrada [°C]</label>
              <FlexibleNumberInput
                min={-10}
                max={60}
                step={0.5}
                value={step3.airInletTempC}
                onValueChange={(airInletTempC) => updateStep3({ airInletTempC, result: null })}
                className="h-9 text-sm"
              />
            </div>
          </div>

          {/* Calcular */}
          <Button
            onClick={handleCalculate}
            disabled={!canCalculate || calculating}
            className="w-full gap-2"
            variant="secondary"
          >
            {calculating && <Loader2 className="h-4 w-4 animate-spin" />}
            Calcular Condensador
          </Button>

          {/* Resultado */}
          {step3.result && (
            <div className="space-y-3">
              <div
                className={`rounded-lg border px-4 py-3 text-sm ${
                  step3.result.status === "ok"
                    ? "border-green-200 bg-green-50 text-green-800"
                    : "border-amber-200 bg-amber-50 text-amber-800"
                }`}
              >
                <div className="mb-2 flex items-center gap-2 font-medium">
                  {step3.result.status === "ok" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                  )}
                  {step3.result.message}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                  <span>U = {step3.result.u_w_m2k.toFixed(1)} W/m²K</span>
                  <span>η_fin = {(step3.result.fin_efficiency * 100).toFixed(1)}%</span>
                  <span>ΔP_ar = {step3.result.air_pressure_drop_pa.toFixed(1)} Pa</span>
                </div>
                {step3.result.sweepPointsCovered != null && step3.result.sweepTotalPoints != null && (
                  <div className="mt-2 text-xs font-medium">
                    Cobertura: {step3.result.sweepPointsCovered}/{step3.result.sweepTotalPoints} pontos
                    {" "}({((step3.result.sweepPointsCovered / step3.result.sweepTotalPoints) * 100).toFixed(0)}%)
                  </div>
                )}
              </div>
              {step3.result.sweepCoverage && step3.result.sweepCoverage.length > 0 && (
                <CoveragePointsTable
                  points={step3.result.sweepCoverage}
                  mode="condenser"
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!canProceed} className="gap-2">
          Confirmar → Simulação
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <GeometryPickerModal
        open={geoOpen}
        onClose={() => setGeoOpen(false)}
        componentType="condenser_air"
      />
      <FanPickerModal
        open={fanOpen}
        onClose={() => setFanOpen(false)}
        fans={fanItems}
        onConfirm={(f) => {
          updateStep3({ fan: f, result: null });
          setFanOpen(false);
        }}
      />
    </div>
  );
}
