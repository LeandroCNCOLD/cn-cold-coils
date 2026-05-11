import { useState, useEffect } from "react";
import { ChevronRight, Wind, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { GeometryPickerModal } from "@/modules/cn_coils/components/GeometryPickerModal";
import { FanPickerModal } from "@/modules/cn_coils/components/FanPickerModal";
import { useEnrichedFanPickerItems } from "@/modules/cn_coils/hooks/useEnrichedFanPickerItems";
import { useCnCoilsSimulationStore } from "@/modules/cn_coils/store/useCnCoilsSimulationStore";
import { useAppEngineeringStore } from "../store/useAppEngineeringStore";
import { dimensionEvaporator } from "../services/evaporatorDimensioningService";

const FIN_SPACING_OPTIONS = [4, 6, 7, 8, 10, 12];

interface Props {
  onNext: () => void;
}

export function Step2EvaporatorPanel({ onNext }: Props) {
  const { step1, step2, updateStep2 } = useAppEngineeringStore();
  const [geoOpen, setGeoOpen] = useState(false);
  const [fanOpen, setFanOpen] = useState(false);
  const [calculating, setCalculating] = useState(false);

  const selectedGeometry = useCnCoilsSimulationStore((s) => s.selectedGeometry);
  const { items: fanItems } = useEnrichedFanPickerItems();

  // Captura geometria quando modal fecha
  useEffect(() => {
    if (selectedGeometry && selectedGeometry !== step2.geometry) {
      updateStep2({ geometry: selectedGeometry, result: null });
    }
  }, [selectedGeometry]);

  const designPoint = step1.designPoint;
  const required_capacity_w = designPoint?.capacity_w ?? 0;

  const airflow_m3h =
    step2.fan && step2.fanCount > 0
      ? (step2.fan.airflow_m3h ?? 0) * step2.fanCount
      : 0;

  function handleCalculate() {
    if (!step2.geometry || !designPoint) return;
    setCalculating(true);
    try {
      const result = dimensionEvaporator({
        geometry: step2.geometry,
        rows: step2.rows,
        tubesPerRow: step2.tubesPerRow,
        lengthMm: step2.lengthMm,
        finSpacingMm: step2.finSpacingMm,
        airflowM3h: airflow_m3h,
        airInletTempC: step2.airInletTempC,
        airRhIn: step2.airRhIn,
        te_c: designPoint.te_c,
        refrigerant: step1.refrigerant,
        required_capacity_w,
      });
      updateStep2({ result, completed: result.status === "ok" });
    } finally {
      setCalculating(false);
    }
  }

  const canCalculate = !!step2.geometry && airflow_m3h > 0 && !!designPoint;
  const canProceed = step2.completed && step2.result?.status === "ok";

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Wind className="h-4 w-4 text-blue-600" />
            Etapa 2 — Evaporador
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Ponto de referência */}
          {designPoint && (
            <div className="rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-700">
              Ponto de projeto: Te = {designPoint.te_c}°C · Q_req ={" "}
              <strong>{(required_capacity_w / 1000).toFixed(2)} kW</strong>
            </div>
          )}

          {/* Geometria */}
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
                {step2.geometry?.name ?? "Selecionar geometria…"}
              </Button>
            </div>

            {/* Ventilador */}
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
                  {step2.fan?.model ?? "Selecionar ventilador…"}
                </Button>
                <Input
                  type="number"
                  min={1}
                  max={6}
                  value={step2.fanCount}
                  onChange={(e) => updateStep2({ fanCount: Number(e.target.value), result: null })}
                  className="h-9 w-14 text-center text-xs"
                  title="Quantidade"
                />
              </div>
              {step2.fan && (
                <p className="mt-0.5 text-[10px] text-slate-400">
                  {airflow_m3h.toFixed(0)} m³/h total ({step2.fanCount}×{step2.fan.airflow_m3h?.toFixed(0)} m³/h)
                </p>
              )}
            </div>
          </div>

          {/* Parâmetros do serpentim */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Fileiras</label>
              <Input
                type="number"
                min={1}
                max={8}
                value={step2.rows}
                onChange={(e) => updateStep2({ rows: Number(e.target.value), result: null })}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Tubos/Fileira</label>
              <Input
                type="number"
                min={1}
                max={40}
                value={step2.tubesPerRow}
                onChange={(e) => updateStep2({ tubesPerRow: Number(e.target.value), result: null })}
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
                value={step2.lengthMm}
                onChange={(e) => updateStep2({ lengthMm: Number(e.target.value), result: null })}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Passo de Aleta [mm]</label>
              <Select
                value={String(step2.finSpacingMm)}
                onValueChange={(v) => updateStep2({ finSpacingMm: Number(v), result: null })}
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
              <Input
                type="number"
                value={step2.airInletTempC}
                onChange={(e) => updateStep2({ airInletTempC: Number(e.target.value), result: null })}
                className="h-9 text-sm"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">UR entrada [%]</label>
              <Input
                type="number"
                min={0}
                max={100}
                value={Math.round(step2.airRhIn * 100)}
                onChange={(e) => updateStep2({ airRhIn: Number(e.target.value) / 100, result: null })}
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
            Calcular Evaporador
          </Button>

          {/* Resultado */}
          {step2.result && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                step2.result.status === "ok"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-amber-200 bg-amber-50 text-amber-800"
              }`}
            >
              <div className="mb-1 flex items-center gap-2 font-medium">
                {step2.result.status === "ok" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                )}
                {step2.result.message}
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                <span>U = {step2.result.u_w_m2k.toFixed(1)} W/m²K</span>
                <span>η_fin = {(step2.result.fin_efficiency * 100).toFixed(1)}%</span>
                <span>ΔP_ar = {step2.result.air_pressure_drop_pa.toFixed(1)} Pa</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!canProceed} className="gap-2">
          Confirmar → Condensador
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <GeometryPickerModal
        open={geoOpen}
        onClose={() => setGeoOpen(false)}
        componentType="evaporator_dx"
      />
      <FanPickerModal
        open={fanOpen}
        onClose={() => setFanOpen(false)}
        fans={fanItems}
        onConfirm={(f) => {
          updateStep2({ fan: f, result: null });
          setFanOpen(false);
        }}
      />
    </div>
  );
}
