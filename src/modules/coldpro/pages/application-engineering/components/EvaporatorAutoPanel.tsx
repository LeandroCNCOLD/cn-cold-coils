/**
 * EvaporatorAutoPanel.tsx
 *
 * Painel de dimensionamento semiautomático do evaporador.
 *
 * Entradas do usuário:
 *   - Geometria (GeometryPickerModal, componentType="evaporator_dx")
 *   - Comprimento aletado (mm) — preenchido automaticamente da geometria, editável
 *   - Passo de aleta (mm) — dropdown: 4 / 6 / 7 / 8 / 10 / 12 mm
 *   - Ventilador (FanPickerModal) + quantidade (1–6)
 *   - T_ar_entrada (°C)
 *
 * Ao clicar "Calcular":
 *   - autoSizeEvaporator() varre configurações (filas × comprimento)
 *   - Exibe resultado: filas, comprimento, Q_calc, U, ΔP_ar
 *   - Badge verde se Q_calc >= Q_req × 0.98
 *
 * Ao clicar "Confirmar":
 *   - Salva evaporatorInput no useApplicationEngineering store
 *   - Dispara runCalculation() para atualizar evaporatorResult
 */
import { useState, useEffect, useRef } from "react";
import { Calculator, ChevronRight } from "lucide-react";
import { GeometryPickerModal } from "@/modules/cn_coils/components/GeometryPickerModal";
import { FanPickerModal } from "@/modules/cn_coils/components/FanPickerModal";
import type { FanPickerItem } from "@/modules/cn_coils/components/FanPickerModal";
import { useEnrichedFanPickerItems } from "@/modules/cn_coils/hooks/useEnrichedFanPickerItems";
import { useCnCoilsSimulationStore } from "@/modules/cn_coils/store/useCnCoilsSimulationStore";
import { useApplicationEngineering } from "../hooks/useApplicationEngineering";
import { autoSizeEvaporator } from "../services/autoSizingService";
import { FlexibleNumberInput } from "./FlexibleNumberInput";
import type { CoilGeometryCatalogItem } from "@/modules/cn_coils/types/cncoils.types";
import type { CoilGeometryItem } from "@/modules/cn_coils/services/coilGeometryCatalogService";
import type { AutoSizingResult } from "../services/autoSizingService";

function geoOd(g: CoilGeometryCatalogItem): number {
  const eg = g as unknown as CoilGeometryItem;
  return eg.diametro_externo_tubo_mm ?? (eg.tubeOuterDiameterMm || 9.52);
}
function geoPt(g: CoilGeometryCatalogItem): number {
  const eg = g as unknown as CoilGeometryItem;
  return eg.passo_tubos_mm ?? (eg.tubePitchTransverseMm || 25.4);
}

const FIN_PITCH_OPTIONS = [4, 6, 7, 8, 10, 12] as const;

export function EvaporatorAutoPanel() {
  const {
    compressorResult,
    operatingPointResult,
    setEvaporatorInput,
    runCalculation,
  } = useApplicationEngineering();

  // ── Captura de geometria via store (GeometryPickerModal não tem onSelect) ──
  const storeGeometry = useCnCoilsSimulationStore((s) => s.selectedGeometry);
  const storePhysical = useCnCoilsSimulationStore((s) => s.physicalInputs);
  const prevGeometryIdRef = useRef<string | undefined>(undefined);
  const [geometry, setGeometry] = useState<CoilGeometryCatalogItem | undefined>();
  const [geoPickerOpen, setGeoPickerOpen] = useState(false);

  useEffect(() => {
    if (storeGeometry && storeGeometry.id !== prevGeometryIdRef.current) {
      prevGeometryIdRef.current = storeGeometry.id;
      setGeometry(storeGeometry);
      if (storePhysical.finnedLengthMm) {
        setLengthMm(storePhysical.finnedLengthMm);
      }
      if (storePhysical.tubesPerRow) {
        setTubesPerRow(storePhysical.tubesPerRow);
      }
    }
  }, [storeGeometry, storePhysical]);

  // ── Ventilador ──
  const { items: fans, loading: fansLoading } = useEnrichedFanPickerItems();
  const [fanPickerOpen, setFanPickerOpen] = useState(false);
  const [selectedFan, setSelectedFan] = useState<FanPickerItem | undefined>();
  const [fanCount, setFanCount] = useState(1);

  // ── Parâmetros editáveis ──
  const [lengthMm, setLengthMm] = useState(1200);
  const [tubesPerRow, setTubesPerRow] = useState<number | undefined>(undefined);
  const [finPitchMm, setFinPitchMm] = useState<number>(7);
  const [tAirIn, setTAirIn] = useState(-23);

  // ── Resultado da varredura ──
  const [sizingResult, setSizingResult] = useState<AutoSizingResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Dados do ponto de projeto (do compressor via store)
  const requiredCapacityW = compressorResult?.capacity_w ?? 0;
  const teC = operatingPointResult?.evap_temp_c ?? -30;

  // Calcula tubesPerRow a partir da geometria se não disponível no physicalInputs
  const effectiveTubesPerRow =
    tubesPerRow ??
    (geometry
      ? Math.max(1, Math.round(600 / geoPt(geometry)))
      : 12);

  const totalAirflowM3H = (selectedFan?.airflow_m3h ?? 0) * fanCount;

  function handleCalculate() {
    if (!geometry || !selectedFan) return;
    setIsCalculating(true);
    setTimeout(() => {
      const result = autoSizeEvaporator({
        tubesPerRow: effectiveTubesPerRow,
        tubeOuterDiameterMm: geoOd(geometry),
        startLengthMm: lengthMm,
        finPitchMm,
        totalAirflowM3H,
        requiredCapacityW: requiredCapacityW > 0 ? requiredCapacityW : 9560,
        te_c: teC,
        t_air_in_c: tAirIn,
      });
      setSizingResult(result);
      setIsCalculating(false);
    }, 0);
  }

  function handleConfirm() {
    if (!sizingResult?.selected || !geometry) return;
    const sel = sizingResult.selected;
    setEvaporatorInput({
      required_capacity_w: requiredCapacityW > 0 ? requiredCapacityW : 9560,
      fluid_inlet_temp_c: teC,
      air_inlet_temp_c: tAirIn,
      airflow_m3h: totalAirflowM3H,
      coil_type: "evaporator",
      geometry: {
        rows: sel.rows,
        tubes_per_row: effectiveTubesPerRow,
        fin_spacing_mm: finPitchMm,
        length_mm: sel.lengthMm,
        tube_diameter_mm: geoOd(geometry),
      },
    });
    runCalculation();
  }

  const canCalculate = !!geometry && !!selectedFan;
  const canConfirm = sizingResult?.selected?.meetsRequirement === true;

  return (
    <div className="rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold">Evaporador — Dimensionamento Semiautomático</h2>
        <p className="text-xs text-muted-foreground">
          Selecione geometria e ventilador — o sistema encontra a configuração ideal
        </p>
      </div>

      <div className="space-y-4 p-4">
        {requiredCapacityW > 0 ? (
          <div className="rounded bg-blue-50 px-3 py-1.5 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            Ponto de projeto: Te = {teC.toFixed(1)}°C · Q_req = {(requiredCapacityW / 1000).toFixed(2)} kW
          </div>
        ) : (
          <div className="rounded bg-yellow-50 px-3 py-1.5 text-xs text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
            ⚠ Calcule o compressor primeiro para obter Q_req automaticamente.
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Coluna esquerda — inputs */}
          <div className="space-y-3">
            {/* Geometria */}
            <div>
              <label className="text-xs font-medium text-muted-foreground">Geometria do Serpentim</label>
              <button
                type="button"
                onClick={() => setGeoPickerOpen(true)}
                className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-left text-sm transition-colors hover:bg-accent"
              >
                {geometry
                  ? `${geometry.name} (Ø${geoOd(geometry)} mm)`
                  : "Selecionar geometria do catálogo…"}
              </button>
              <GeometryPickerModal
                open={geoPickerOpen}
                onClose={() => setGeoPickerOpen(false)}
                componentType="evaporator_dx"
              />
            </div>

            {/* Ventilador + quantidade */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-xs font-medium text-muted-foreground">Ventilador</label>
                <button
                  type="button"
                  onClick={() => setFanPickerOpen(true)}
                  disabled={fansLoading}
                  className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-left text-sm transition-colors hover:bg-accent disabled:opacity-50"
                >
                  {fansLoading
                    ? "Carregando…"
                    : selectedFan
                    ? `${selectedFan.manufacturer ?? ""} ${selectedFan.model ?? selectedFan.id}`
                    : "Selecionar ventilador…"}
                </button>
                <FanPickerModal
                  open={fanPickerOpen}
                  onClose={() => setFanPickerOpen(false)}
                  fans={fans}
                  onConfirm={(fan) => {
                    setSelectedFan(fan);
                    setFanPickerOpen(false);
                  }}
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Qtd.</label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={fanCount}
                  onChange={(e) => setFanCount(Math.max(1, Math.min(6, Number(e.target.value))))}
                  className="mt-1 w-full rounded border border-border bg-background px-2 py-2 text-sm"
                />
              </div>
            </div>
            {selectedFan && (
              <p className="text-xs text-muted-foreground">
                Vazão total: {totalAirflowM3H.toFixed(0)} m³/h
                {selectedFan.diameter_mm ? ` · Ø${selectedFan.diameter_mm} mm` : ""}
              </p>
            )}

            {/* Comprimento e passo de aleta */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Comprimento inicial (mm)</label>
                <input
                  type="number"
                  min={300}
                  max={4000}
                  step={50}
                  value={lengthMm}
                  onChange={(e) => setLengthMm(Number(e.target.value))}
                  className="mt-1 w-full rounded border border-border bg-background px-2 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">Passo de aleta (mm)</label>
                <select
                  value={finPitchMm}
                  onChange={(e) => setFinPitchMm(Number(e.target.value))}
                  className="mt-1 w-full rounded border border-border bg-background px-2 py-2 text-sm"
                >
                  {FIN_PITCH_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p} mm</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Temperatura de entrada do ar */}
            <div>
              <label className="text-xs font-medium text-muted-foreground">T_ar entrada (°C)</label>
              <FlexibleNumberInput
                min={-60}
                max={60}
                step={0.5}
                value={tAirIn}
                onValueChange={setTAirIn}
                className="mt-1 w-full rounded border border-border bg-background px-2 py-2 text-sm"
              />
            </div>

            <button
              type="button"
              onClick={handleCalculate}
              disabled={!canCalculate || isCalculating}
              className="flex w-full items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              <Calculator className="h-4 w-4" />
              {isCalculating ? "Calculando…" : "Calcular Evaporador"}
            </button>
          </div>

          {/* Coluna direita — resultado */}
          <div>
            {sizingResult && (
              <div className="space-y-3">
                {sizingResult.selected ? (
                  <div
                    className={`rounded-lg border p-3 ${
                      sizingResult.selected.meetsRequirement
                        ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950"
                        : "border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-950"
                    }`}
                  >
                    <p className="text-sm font-semibold">
                      {sizingResult.selected.meetsRequirement ? "✓ Dimensionado" : "⚠ Subdimensionado"}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{sizingResult.message}</p>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                      <span className="text-muted-foreground">Filas:</span>
                      <span className="font-medium">{sizingResult.selected.rows}</span>
                      <span className="text-muted-foreground">Comprimento:</span>
                      <span className="font-medium">{sizingResult.selected.lengthMm} mm</span>
                      <span className="text-muted-foreground">Q_evap:</span>
                      <span className="font-medium">{(sizingResult.selected.capacityW / 1000).toFixed(2)} kW</span>
                      <span className="text-muted-foreground">U global:</span>
                      <span className="font-medium">{sizingResult.selected.uOverallWm2K.toFixed(1)} W/m²K</span>
                      <span className="text-muted-foreground">ΔP ar:</span>
                      <span className="font-medium">{sizingResult.selected.dpAirPa.toFixed(1)} Pa</span>
                    </div>
                    {sizingResult.selected.warnings.length > 0 && (
                      <ul className="mt-2 space-y-0.5">
                        {sizingResult.selected.warnings.map((w, i) => (
                          <li key={i} className="text-xs text-yellow-700 dark:text-yellow-400">⚠ {w}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className="rounded-lg border border-red-300 bg-red-50 p-3 dark:border-red-700 dark:bg-red-950">
                    <p className="text-sm font-semibold text-red-700 dark:text-red-400">Nenhuma configuração encontrada</p>
                    <p className="mt-1 text-xs text-red-600 dark:text-red-500">{sizingResult.message}</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {sizingResult.candidates.length} configurações testadas
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end border-t border-border pt-3">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="flex items-center gap-2 rounded bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
          >
            Confirmar → Condensador
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
