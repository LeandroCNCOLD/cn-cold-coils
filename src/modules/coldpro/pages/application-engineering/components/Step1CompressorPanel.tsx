import { useState } from "react";
import { ChevronRight, Cpu, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useAppEngineeringStore } from "../store/useAppEngineeringStore";
import { CapacityCurvePanel } from "./CapacityCurvePanel";
import type { CapacityCurvePoint } from "../types/app-engineering.types";

const REFRIGERANTS = ["R404A", "R448A", "R449A", "R507A", "R22", "R134a"];

interface Props {
  onNext: () => void;
}

export function Step1CompressorPanel({ onNext }: Props) {
  const { step1, updateStep1 } = useAppEngineeringStore();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCompressorSelect(item: CompressorItem) {
    setLoading(true);
    try {
      const row = await getCompressorById(item.id);
      if (!row) return;
      const cp = row.calibration_points?.[0];
      if (!cp) return;
      updateStep1({
        compressorModel: item.model,
        capCoeffs: cp.cap_coeffs ?? [],
        pwrCoeffs: cp.pwr_coeffs ?? [],
        designPoint: null,
      });
    } finally {
      setLoading(false);
    }
  }

  function handleDesignPoint(pt: CapacityCurvePoint) {
    updateStep1({ designPoint: pt, completed: true });
  }

  const canProceed = step1.capCoeffs.length >= 10 && step1.designPoint !== null;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Cpu className="h-4 w-4 text-indigo-600" />
            Etapa 1 — Compressor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Refrigerante */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Fluido Refrigerante
              </label>
              <Select
                value={step1.refrigerant}
                onValueChange={(v) => updateStep1({ refrigerant: v })}
              >
                <SelectTrigger className="h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REFRIGERANTS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Seletor de compressor */}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Compressor
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 flex-1 text-xs"
                  onClick={() => setPickerOpen(true)}
                  disabled={loading}
                >
                  {step1.compressorModel || "Selecionar compressor…"}
                </Button>
                {step1.compressorModel && (
                  <Badge variant="secondary" className="whitespace-nowrap text-[10px]">
                    {step1.capCoeffs.length} coef.
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Status dos coeficientes */}
          {step1.compressorModel && (
            <div className="flex items-center gap-2 rounded-md border border-slate-100 bg-slate-50 px-3 py-2 text-xs">
              {step1.capCoeffs.length >= 10 ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
              )}
              <span className="text-slate-600">
                {step1.compressorModel}
                {step1.capCoeffs.length >= 10
                  ? " — coeficientes EN 12900 carregados"
                  : " — coeficientes insuficientes"}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Curva de capacidade */}
      <CapacityCurvePanel
        capacity_coefficients={step1.capCoeffs}
        power_coefficients={step1.pwrCoeffs}
        onDesignPointSelected={handleDesignPoint}
        designPoint={step1.designPoint}
      />

      {/* Ponto de projeto selecionado */}
      {step1.designPoint && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3 text-xs">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-800">Ponto de projeto confirmado</span>
              <span className="text-green-700">
                Te = {step1.designPoint.te_c}°C · Tc = {step1.designPoint.tc_c}°C ·{" "}
                Q = {(step1.designPoint.capacity_w / 1000).toFixed(2)} kW ·{" "}
                COP = {step1.designPoint.cop.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Avançar */}
      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="gap-2"
        >
          Confirmar → Evaporador
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <CompressorPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleCompressorSelect}
      />
    </div>
  );
}
