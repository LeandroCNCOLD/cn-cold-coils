/**
 * EvaporatorPanel.tsx (busca livre / multi-critério)
 *
 * O engenheiro define o que QUER FIXAR (qualquer combinação) e quais critérios
 * de seleção combinar (com pesos). O motor gera dezenas/centenas de candidatos,
 * simula cada um sobre o sweep Te×Tc do compressor e devolve o melhor.
 */
import { useEffect, useMemo, useState } from "react";
import { Wind, Flame, Play, Loader2, Plus, X, Trash2, Wand2, Fan } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  useCoilEnvelopeStore,
  type CoilEnvelope,
  type EnvelopePoint,
} from "@/modules/cn_coils/store/useCoilEnvelopeStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useAppEngineeringStore } from "../store/useAppEngineeringStore";
import { useApplicationEngineering } from "../hooks/useApplicationEngineering";
import {
  searchBestEvaporator,
  type EvaporatorConstraints,
  type EvaporatorCriterion,
  type EvaporatorCriterionKind,
  type EvaporatorSearchResult,
  type HeaderSide,
} from "../services/evaporatorSearchService";
import {
  loadGeometryCatalog,
  type GeometryOption,
  type CoilApplication,
} from "../services/geometryCatalogService";
import { GeometryCatalogPicker } from "./GeometryCatalogPicker";
import { CoveragePointsTable } from "./CoveragePointsTable";
import { useExpansionValves, selectExpansionValve } from "@/modules/coldpro_catalog/hooks/useExpansionValves";
import { FanPickerModal, type FanPickerItem } from "@/modules/cn_coils/components/FanPickerModal";
import { useEnrichedFanPickerItems } from "@/modules/cn_coils/hooks/useEnrichedFanPickerItems";
import {
  calcCoilDerivedDimensions,
  validateFanFit,
  computeFluidVelocity,
  type FanFitValidation,
} from "@/modules/cn_coils/utils/coilDerivedMetrics";
import { checkIndustrialLimits, type IndustrialLimitsCheck } from "../services/coilNtuService";
import {
  selectDistributor,
  optimizeCircuitsForDistributor,
  type DistributorResult,
  type CircuitOptimizationResult,
} from "../services/distributorService";
import { useCnCoilsCatalogs } from "@/modules/cn_coils/hooks/useCnCoilsCatalogCollection";
import type { CoilGeometryCatalogItem } from "@/modules/cn_coils/types/cncoils.types";
import type { PowerUnit } from "@/utils/unitConversions";

type ConstraintKey =
  | "height_mm"
  | "length_mm"
  | "rows"
  | "tubes_per_row"
  | "fin_pitch_mm"
  | "max_frontal_area_m2";

const CONSTRAINT_FIELDS: { key: ConstraintKey; label: string; defaultVal: number; step?: number; suffix: string }[] = [
  { key: "height_mm", label: "Altura", defaultVal: 500, step: 25, suffix: "mm" },
  { key: "length_mm", label: "Comprimento", defaultVal: 1200, step: 50, suffix: "mm" },
  { key: "rows", label: "Nº de filas", defaultVal: 3, suffix: "filas" },
  { key: "tubes_per_row", label: "Tubos por fila", defaultVal: 12, suffix: "tubos" },
  { key: "fin_pitch_mm", label: "Passo da aleta", defaultVal: 2.1, step: 0.1, suffix: "mm" },
  { key: "max_frontal_area_m2", label: "Área frontal máx.", defaultVal: 0.5, step: 0.05, suffix: "m²" },
];

const CRITERION_LABELS: Record<EvaporatorCriterionKind, string> = {
  delta_t_target: "ΔT alvo (Tamb − Te)",
  max_points_covered: "Maior nº de pontos atendidos",
  best_cop: "Melhor COP médio",
  min_area: "Menor área frontal",
};

function toStepGeometry(g: GeometryOption | undefined): CoilGeometryCatalogItem | null {
  if (!g) return null;
  const tubeInnerDiameterMm = Math.max(0.1, g.tube_outer_diameter_mm - 2 * g.tube_thickness_mm);
  return {
    id: g.id,
    name: g.description,
    tubePitchTransverseMm: g.tube_pitch_transverse_mm,
    tubePitchLongitudinalMm: g.row_pitch_mm,
    tubeOuterDiameterMm: g.tube_outer_diameter_mm,
    tubeInnerDiameterMm,
    tubeMaterial: "copper",
    raw: {
      finThicknessMm: g.fin_thickness_mm,
      source: "application-engineering-search",
    },
  };
}

interface EvaporatorPanelProps {
  /** "evaporator" (default) ou "condenser" — define cálculo, ΔT e catálogo. */
  mode?: CoilApplication;
}

export function EvaporatorPanel({ mode = "evaporator" }: EvaporatorPanelProps = {}) {
  const isCondenser = mode === "condenser";
  const sweep = useAppEngineeringStore((s) => s.compressorSweep);
  const refrigerant = useAppEngineeringStore((s) => s.step1.refrigerant);
  const { setEvaporatorInput, setCondenserInput } = useApplicationEngineering();
  const { updateStep2, updateStep3 } = useAppEngineeringStore();
  const { data: valves } = useExpansionValves(
    isCondenser ? undefined : { refrigerant },
  );
  const navigate = useNavigate();

  // Restrições — cada uma com checkbox "fixar" + valor
  const [fixed, setFixed] = useState<Record<ConstraintKey, boolean>>({
    height_mm: false,
    length_mm: true,
    rows: false,
    tubes_per_row: false,
    fin_pitch_mm: true,
    max_frontal_area_m2: false,
  });
  const [values, setValues] = useState<Record<ConstraintKey, number>>({
    height_mm: 500,
    length_mm: 1200,
    rows: 3,
    tubes_per_row: 12,
    fin_pitch_mm: 2.1,
    max_frontal_area_m2: 0.5,
  });

  // Ventilador selecionado manualmente
  const [selectedFan, setSelectedFan] = useState<FanPickerItem | null>(null);
  const [fanCount, setFanCount] = useState(2);
  const [fanPickerOpen, setFanPickerOpen] = useState(false);
  const { items: fanItems } = useEnrichedFanPickerItems();

  // Vazão total do ventilador selecionado
  const totalFanAirflow = useMemo(
    () => (selectedFan?.airflow_m3h && fanCount > 0 ? selectedFan.airflow_m3h * fanCount : 0),
    [selectedFan, fanCount],
  );

  // Motor de cálculo: avançado (Schmidt + LMTD) ou básico (rápido m·cp·ΔT)
  const [engine, setEngine] = useState<"basic" | "advanced" | "ntu_epsilon" | "lmtd_iterative">("ntu_epsilon");

  // Geometria (ferramenta de estampagem) e lado de saída dos coletores
  const [geometries, setGeometries] = useState<GeometryOption[]>([]);
  const [geometryId, setGeometryId] = useState<string>("");
  const [headerSide, setHeaderSide] = useState<HeaderSide>("left");

  useEffect(() => {
    loadGeometryCatalog().then((cat) => {
      const list = cat[mode];
      setGeometries(list);
      const def =
        list.find(
          (g) =>
            Math.abs(g.tube_outer_diameter_mm - 9.52) < 0.2 &&
            Math.abs(g.tube_pitch_transverse_mm - 25) < 0.2,
        ) ?? list[0];
      if (def) setGeometryId(def.id);
    });
  }, [mode]);

  const selectedGeometry = useMemo(
    () => geometries.find((g) => g.id === geometryId),
    [geometries, geometryId],
  );

  // Critérios (pelo menos 1) — o ΔT alvo deste critério também define T_ar_in por ponto
  const defaultDeltaT = isCondenser ? 12 : 7;
  const [criteria, setCriteria] = useState<EvaporatorCriterion[]>([
    { kind: "delta_t_target", target: defaultDeltaT, weight: 0.6 },
    { kind: "max_points_covered", weight: 0.4 },
  ]);

  // ΔT alvo aplicado por ponto: usa o critério delta_t_target
  const deltaTTargetK = useMemo(() => {
    const c = criteria.find((c) => c.kind === "delta_t_target");
    return c?.target ?? defaultDeltaT;
  }, [criteria, defaultDeltaT]);

  const [unit, setUnit] = useState<PowerUnit>("kW");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<EvaporatorSearchResult | null>(null);
  const [distributorResult, setDistributorResult] = useState<DistributorResult | null>(null);
  const [circuitOptResult, setCircuitOptResult] = useState<CircuitOptimizationResult | null>(null);
  const catalogs = useCnCoilsCatalogs();
  const [approvedCoilDetails, setApprovedCoilDetails] = useState<{
    altura_mm: number;
    largura_mm: number;
    prof_mm: number;
    volumeInterno_L: number;
    cargaRefrigerante_kg: number;
    pesoSeco_kg: number;
    pesoComFluido_kg: number;
    gabinete_largura_mm: number;
    gabinete_altura_mm: number;
    gabinete_prof_mm: number;
    face_velocity_ms: number;
    air_pressure_drop_pa: number;
    fluid_velocity_ms: number;
    industrial_limits: IndustrialLimitsCheck | null;
    fanFit: FanFitValidation | null;
  } | null>(null);

  // Sugestão de válvula de expansão (apenas evaporador)
  const valveSuggestion = useMemo(() => {
    if (isCondenser) return null;
    const best = result?.best;
    if (!best || !valves.length) return null;
    const cov = best.coverage;
    if (!cov.length) return null;
    const avgTe = cov.reduce((s, p) => s + p.te_c, 0) / cov.length;
    const avgQkW = cov.reduce((s, p) => s + p.q_comp_w, 0) / cov.length / 1000;
    const ranked = selectExpansionValve(
      valves,
      refrigerant,
      avgTe,
      best.geometry.circuits,
      avgQkW,
    );
    return ranked.length
      ? { top: ranked.slice(0, 3), tevap_c: avgTe, q_kw: avgQkW }
      : null;
  }, [result, valves, refrigerant, isCondenser]);

  const constraints: EvaporatorConstraints = useMemo(() => {
    const c: EvaporatorConstraints = {};
    if (fixed.height_mm) c.height_mm = values.height_mm;
    if (fixed.length_mm) c.length_mm = values.length_mm;
    if (fixed.rows) c.rows = values.rows;
    if (fixed.tubes_per_row) c.tubes_per_row = values.tubes_per_row;
    if (fixed.fin_pitch_mm) c.fin_pitch_mm = values.fin_pitch_mm;
    if (fixed.max_frontal_area_m2) c.max_frontal_area_m2 = values.max_frontal_area_m2;
    if (selectedGeometry) {
      c.geometry_id = selectedGeometry.id;
      c.tube_outer_diameter_mm = selectedGeometry.tube_outer_diameter_mm;
      c.tube_pitch_transverse_mm = selectedGeometry.tube_pitch_transverse_mm;
      c.row_pitch_mm = selectedGeometry.row_pitch_mm;
    }
    if (selectedFan?.diameter_mm && selectedFan.diameter_mm > 0) {
      c.fan_diameter_mm = selectedFan.diameter_mm;
    }
    c.header_side = headerSide;
    return c;
  }, [fixed, values, selectedGeometry, selectedFan, headerSide]);

  function addCriterion() {
    const used = new Set(criteria.map((c) => c.kind));
    const next = (Object.keys(CRITERION_LABELS) as EvaporatorCriterionKind[]).find(
      (k) => !used.has(k),
    );
    if (!next) return;
    setCriteria((cs) => [
      ...cs,
      { kind: next, weight: 0.3, target: next === "delta_t_target" ? 7 : undefined },
    ]);
  }

  function updateCriterion(idx: number, patch: Partial<EvaporatorCriterion>) {
    setCriteria((cs) => cs.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  }

  function removeCriterion(idx: number) {
    setCriteria((cs) => cs.filter((_, i) => i !== idx));
  }

  function runSearch() {
    if (!sweep.length) return;
    setRunning(true);
    setTimeout(() => {
      try {
        const r = searchBestEvaporator({
          sweep,
          mode,
          delta_t_target_k: deltaTTargetK,
          engine,
          // Ventilador manual: passa a vazão total fixada; max_fan_count=1 (já resolvido)
          manual_airflow_m3h: totalFanAirflow > 0 ? totalFanAirflow : undefined,
          max_fan_count: fanCount,
          constraints,
          criteria,
        });
        setResult(r);

        // Calcular detalhes técnicos do melhor candidato
        if (r.best && selectedGeometry) {
          const geo = r.best.geometry;
          const tubeOD_m = geo.tube_outer_diameter_mm / 1000;
          const tubeID_m = tubeOD_m - 2 * 0.00035;
          const avgTe = sweep.reduce((s, p) => s + (isCondenser ? p.tc_c : p.te_c), 0) / sweep.length;

          const derived = calcCoilDerivedDimensions({
            nTubesPerRow: geo.tubes_per_row,
            tubePitchTransverse_mm: selectedGeometry.tube_pitch_transverse_mm,
            nRows: geo.rows,
            tubePitchLongitudinal_mm: selectedGeometry.row_pitch_mm,
            lengthMm: geo.length_mm,
            tubeID_m,
            tubeOD_m,
            nCircuits: geo.circuits,
            refrigerant: refrigerant || "R404A",
            T_evap_C: avgTe,
            finThickness_m: (selectedGeometry.fin_thickness_mm ?? 0.13) / 1000,
            finPitch_m: geo.fin_pitch_mm / 1000,
          });

          const firstCov = r.best.coverage[0];
          const air_pressure_drop_pa = firstCov?.air_pressure_drop_pa ?? 0;

          // Velocidade do fluido com refrigerante real e capacidade média da cobertura
          const avgQw = r.best.coverage.length > 0
            ? r.best.coverage.reduce((s, p) => s + p.q_evap_w, 0) / r.best.coverage.length
            : 0;
          const fluid_velocity_ms = avgQw > 0
            ? computeFluidVelocity({
                refrigerant: refrigerant || "R404A",
                T_evap_C: avgTe,
                Q_total_W: avgQw,
                nCircuits: geo.circuits,
                tubeID_m: tubeID_m,
              })
            : (firstCov?.fluid_velocity_ms ?? 0);
          const face_velocity_ms = totalFanAirflow > 0 && geo.frontal_area_m2 > 0
            ? totalFanAirflow / 3600 / geo.frontal_area_m2
            : 0;

          const industrial_limits = checkIndustrialLimits(
            isCondenser ? "condenser" : "evaporator",
            face_velocity_ms,
            air_pressure_drop_pa,
            fluid_velocity_ms,
          );

          let fanFit: FanFitValidation | null = null;
          if (selectedFan?.diameter_mm && selectedFan.diameter_mm > 0) {
            fanFit = validateFanFit({
              fanD: selectedFan.diameter_mm,
              altura_mm: derived.altura_mm,
              largura_mm: derived.largura_mm,
              nFans: fanCount,
            });
          }

          setApprovedCoilDetails({
            altura_mm: derived.altura_mm,
            largura_mm: derived.largura_mm,
            prof_mm: derived.prof_mm,
            volumeInterno_L: derived.volumeInterno_L,
            cargaRefrigerante_kg: derived.cargaRefrigerante_kg,
            pesoSeco_kg: derived.pesoSeco_kg,
            pesoComFluido_kg: derived.pesoComFluido_kg,
            gabinete_largura_mm: derived.gabinete_largura_mm,
            gabinete_altura_mm: derived.gabinete_altura_mm,
            gabinete_prof_mm: derived.gabinete_prof_mm,
            face_velocity_ms,
            air_pressure_drop_pa,
            fluid_velocity_ms,
            industrial_limits,
            fanFit,
          });

          // Calcular distribuidor e circuitos ótimos (apenas evaporadores DX)
          if (!isCondenser && catalogs.distributorComplete.models.length > 0) {
            const avgQ_w =
              r.best.coverage.length > 0
                ? r.best.coverage.reduce((s, c) => s + c.q_evap_w, 0) / r.best.coverage.length
                : 0;
            const totalTubesCalc = geo.tubes_per_row * geo.rows;
            const tubeOD_m_dist = geo.tube_outer_diameter_mm / 1000;
            const tubeID_m_dist = tubeOD_m_dist - 2 * 0.00035;

            if (avgQ_w > 0) {
              const distResult = selectDistributor(
                catalogs.distributorComplete,
                catalogs.distributorKappaFull,
                {
                  n_circuits: geo.circuits,
                  refrigerant: refrigerant || "R404A",
                  te_c: avgTe,
                  q_total_w: avgQ_w,
                },
              );
              setDistributorResult(distResult);

              const circOpt = optimizeCircuitsForDistributor(
                catalogs.distributorComplete,
                catalogs.distributorKappaFull,
                {
                  totalTubes: totalTubesCalc,
                  refrigerant: refrigerant || "R404A",
                  te_c: avgTe,
                  q_total_w: avgQ_w,
                  tubeID_m: tubeID_m_dist,
                },
              );
              setCircuitOptResult(circOpt);
            } else {
              setDistributorResult(null);
              setCircuitOptResult(null);
            }
          } else {
            setDistributorResult(null);
            setCircuitOptResult(null);
          }
        } else {
          setApprovedCoilDetails(null);
          setDistributorResult(null);
          setCircuitOptResult(null);
        }
      } finally {
        setRunning(false);
      }
    }, 0);
  }

  function applyToForm() {
    const best = result?.best;
    if (!best) return;
    const stepGeometry = toStepGeometry(selectedGeometry);
    const avgT =
      sweep.reduce((s, p) => s + (isCondenser ? p.tc_c : p.te_c), 0) / sweep.length;
    const airflow = totalFanAirflow > 0 ? totalFanAirflow : best.fan.total_airflow_m3h;
    const airInlet = isCondenser ? avgT - deltaTTargetK : avgT + deltaTTargetK;
    // Atualiza store legado (useApplicationEngineering) — usado por runCalculation
    const legacyPayload = {
      airflow_m3h: airflow,
      air_inlet_temp_c: airInlet,
      coil_type: (isCondenser ? "condenser" : "evaporator") as "condenser" | "evaporator",
      geometry: {
        rows: best.geometry.rows,
        tubes_per_row: best.geometry.tubes_per_row,
        circuits: best.geometry.circuits,
        fin_spacing_mm: best.geometry.fin_pitch_mm,
        length_mm: best.geometry.length_mm,
        tube_diameter_mm: best.geometry.tube_outer_diameter_mm,
      },
    };
    if (isCondenser) setCondenserInput(legacyPayload);
    else setEvaporatorInput(legacyPayload);
    // Atualiza store novo (useAppEngineeringStore) — usado pelo Step4HubPanel
    const storePayload = {
      geometry: stepGeometry,
      rows: best.geometry.rows,
      tubesPerRow: best.geometry.tubes_per_row,
      finSpacingMm: best.geometry.fin_pitch_mm,
      lengthMm: best.geometry.length_mm,
      airInletTempC: airInlet,
      fanCount: selectedFan ? fanCount : best.fan.count,
      fan: selectedFan ?? null,
      result: null,
      completed: true,
    };
    if (isCondenser) updateStep3(storePayload);
    else updateStep2({ ...storePayload, airRhIn: 0.85 });
  }

  function openInSimulator() {
    const best = result?.best;
    if (!best) return;

    const avgTe = sweep.reduce((s, p) => s + (isCondenser ? p.tc_c : p.te_c), 0) / sweep.length;
    const avgTc = sweep.reduce((s, p) => s + p.tc_c, 0) / sweep.length;

    const envelopePoints: EnvelopePoint[] = best.coverage.map((cov) => ({
      Te: isCondenser ? avgTe : cov.te_c,
      Q_kcalh: cov.q_evap_w * 0.859845,
      W_kW: cov.q_comp_w > 0 ? Math.max(0, (cov.q_comp_w - cov.q_evap_w) / 1000) : 0,
      COP: cov.q_comp_w > 0 ? cov.q_evap_w / cov.q_comp_w : 0,
      deltaP_Pa: cov.air_pressure_drop_pa ?? 0,
      regime: "dry",
    }));

    const envelope: CoilEnvelope = {
      equipmentId: `eng-${isCondenser ? "cond" : "evap"}-${Date.now()}`,
      componentType: isCondenser ? "condenser_air" : "evaporator_dx",
      geometryId: best.geometry.geometry_id ?? undefined,
      refrigerant: refrigerant || "R404A",
      nominalConditions: {
        Te: avgTe,
        Tc: avgTc,
        T_ar: isCondenser ? avgTc - deltaTTargetK : avgTe + deltaTTargetK,
        UR: 0.85,
      },
      envelope: envelopePoints,
      savedAt: new Date().toISOString(),
      version: 2,
    };

    useCoilEnvelopeStore.getState().saveEnvelope(envelope);

    const workspaceType = isCondenser ? "condenser_air" : "evaporator_dx";
    navigate({
      to: "/coldpro/cncoils/workspace",
      search: { type: workspaceType },
    });
  }

  const canRun = sweep.length > 0 && criteria.length > 0 && totalFanAirflow > 0;
  const bestApproved = (result?.best?.pointsCovered ?? 0) > 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
        {isCondenser ? (
          <Flame className="h-4 w-4 text-orange-500" />
        ) : (
          <Wind className="h-4 w-4 text-emerald-500" />
        )}
        {isCondenser
          ? "3. Condensador — Busca automática multi-critério"
          : "2. Evaporador — Busca automática multi-critério"}
      </h2>

      {!sweep.length && (
        <div className="mb-4 rounded bg-yellow-50 px-3 py-2 text-xs text-yellow-700">
          ⚠ Calcule a varredura Te × Tc no compressor primeiro.
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Restrições */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Restrições dimensionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2 border-b pb-2">
              <div className="col-span-2">
                <Label className="text-[11px] text-muted-foreground">
                  Geometria (ferramenta de estampagem)
                </Label>
                <GeometryCatalogPicker
                  application={mode}
                  value={geometryId}
                  onChange={(g) => setGeometryId(g.id)}
                />
                {selectedGeometry && (
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    OD {selectedGeometry.tube_outer_diameter_mm} mm · passo
                    transv. {selectedGeometry.tube_pitch_transverse_mm} mm · entre
                    filas {selectedGeometry.row_pitch_mm} mm
                  </p>
                )}
              </div>
              <div className="col-span-2">
                <Label className="text-[11px] text-muted-foreground">
                  Saída do distribuidor / coletor
                </Label>
                <Select
                  value={headerSide}
                  onValueChange={(v) => setHeaderSide(v as HeaderSide)}
                >
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left" className="text-xs">
                      Lado esquerdo
                    </SelectItem>
                    <SelectItem value="right" className="text-xs">
                      Lado direito
                    </SelectItem>
                    <SelectItem value="same_side" className="text-xs">
                      Mesmo lado (distribuidor + coletor) — exige nº de filas par
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Marque o que deve ficar <strong>fixo</strong>; o motor varia o resto.
            </p>
            {CONSTRAINT_FIELDS.map((f) => (
              <div key={f.key} className="flex items-center gap-2">
                <Checkbox
                  checked={fixed[f.key]}
                  onCheckedChange={(v) => setFixed((s) => ({ ...s, [f.key]: !!v }))}
                />
                <Label className="flex-1 text-xs">{f.label}</Label>
                <Input
                  type="number"
                  step={f.step ?? 1}
                  value={values[f.key]}
                  onChange={(e) =>
                    setValues((s) => ({ ...s, [f.key]: parseFloat(e.target.value) }))
                  }
                  disabled={!fixed[f.key]}
                  className="h-7 w-24 text-xs"
                />
                <span className="w-10 text-[11px] text-muted-foreground">{f.suffix}</span>
              </div>
            ))}

            {/* Seleção manual de ventilador */}
            <div className="mt-3 border-t pt-2 space-y-2">
              <Label className="text-[11px] text-muted-foreground block">
                <Fan className="inline h-3 w-3 mr-1" />
                Ventilador (seleção manual)
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 flex-1 text-xs justify-start"
                  onClick={() => setFanPickerOpen(true)}
                >
                  {selectedFan?.model ?? "Selecionar ventilador…"}
                </Button>
                <Input
                  type="number"
                  min={1}
                  max={8}
                  value={fanCount}
                  onChange={(e) => setFanCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-7 w-14 text-center text-xs"
                  title="Quantidade"
                />
              </div>
              {selectedFan ? (
                <p className="text-[10px] text-emerald-600">
                  ✓ {fanCount}× {selectedFan.model} · {selectedFan.diameter_mm} mm ·{" "}
                  <strong>{totalFanAirflow.toFixed(0)} m³/h</strong> total
                  {selectedFan.motor_power_w && (
                    <span className="text-muted-foreground">
                      {" "}· {(selectedFan.motor_power_w * fanCount / 1000).toFixed(2)} kW
                    </span>
                  )}
                </p>
              ) : (
                <p className="text-[10px] text-amber-600">
                  ⚠ Selecione o ventilador antes de calcular.
                </p>
              )}
            </div>
            <div className="mt-1">
              <Label className="text-[11px] text-muted-foreground">
                ΔT alvo {isCondenser ? "(Tc − T_ar)" : "(T_ar − Te)"}
              </Label>
              <Input
                type="number"
                value={deltaTTargetK}
                disabled
                className="h-7 text-xs"
              />
              <p className="mt-1 text-[10px] text-muted-foreground">
                Definido pelo critério ΔT alvo. T_ar_in ={" "}
                {isCondenser ? "Tc − ΔT" : "Te + ΔT"} por ponto.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Critérios */}
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm">Critérios de seleção</CardTitle>
            <Button
              size="sm"
              variant="outline"
              onClick={addCriterion}
              disabled={criteria.length >= Object.keys(CRITERION_LABELS).length}
              className="h-7 gap-1 text-xs"
            >
              <Plus className="h-3 w-3" />
              Adicionar
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {criteria.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Adicione pelo menos um critério para ranquear os candidatos.
              </p>
            )}
            {criteria.map((c, idx) => (
              <div key={idx} className="rounded-md border bg-muted/20 p-2 space-y-2">
                <div className="flex items-center gap-2">
                  <Select
                    value={c.kind}
                    onValueChange={(v) =>
                      updateCriterion(idx, { kind: v as EvaporatorCriterionKind })
                    }
                  >
                    <SelectTrigger className="h-7 flex-1 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(Object.keys(CRITERION_LABELS) as EvaporatorCriterionKind[]).map((k) => (
                        <SelectItem key={k} value={k} className="text-xs">
                          {CRITERION_LABELS[k]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {c.kind === "delta_t_target" && (
                    <Input
                      type="number"
                      step={0.5}
                      value={c.target ?? 7}
                      onChange={(e) =>
                        updateCriterion(idx, { target: parseFloat(e.target.value) })
                      }
                      className="h-7 w-20 text-xs"
                      placeholder="alvo K"
                    />
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCriterion(idx)}
                    className="h-7 w-7"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-12 text-[11px] text-muted-foreground">Peso</span>
                  <Slider
                    min={0}
                    max={1}
                    step={0.05}
                    value={[c.weight]}
                    onValueChange={([v]) => updateCriterion(idx, { weight: v })}
                    className="flex-1"
                  />
                  <span className="w-8 text-right font-mono text-[11px]">
                    {c.weight.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Ação */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Motor:</span>
            <Select value={engine} onValueChange={(v) => setEngine(v as "basic" | "advanced" | "ntu_epsilon" | "lmtd_iterative")}>
              <SelectTrigger className="h-7 w-52 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ntu_epsilon" className="text-xs">
                  NTU-ε (crossflow) — recomendado
                </SelectItem>
                <SelectItem value="lmtd_iterative" className="text-xs">
                  LMTD iterativo
                </SelectItem>
                <SelectItem value="advanced" className="text-xs">
                  Avançado (Schmidt + LMTD)
                </SelectItem>
                <SelectItem value="basic" className="text-xs">
                  Básico (m·cp·ΔT)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span>Unidade:</span>
            <Select value={unit} onValueChange={(v) => setUnit(v as PowerUnit)}>
              <SelectTrigger className="h-7 w-24 text-xs">
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
        <div className="flex gap-2">
          {result && (
            <Button variant="ghost" size="sm" onClick={() => setResult(null)} className="h-8 gap-1 text-xs">
              <Trash2 className="h-3 w-3" /> Limpar
            </Button>
          )}
          <Button onClick={runSearch} disabled={!canRun || running} size="sm" className="h-8 gap-1 text-xs">
            {running ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
            {running
              ? "Buscando..."
              : isCondenser
                ? "Buscar melhor condensador"
                : "Buscar melhor evaporador"}
          </Button>
        </div>
      </div>

      {/* Resultado */}
      {result?.best && (
        <div className="mt-4 space-y-3">
          {/* Análise inteligente do vencedor */}
          {result.best.analysis && (
            <div className={`rounded-lg border px-3 py-2 text-xs ${
              bestApproved
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-amber-200 bg-amber-50 text-amber-800"
            }`}>
              <span className="font-semibold">Análise: </span>{result.best.analysis}
            </div>
          )}
          {/* Faixa de aplicação */}
          {result.best.applicationRange?.te_min_c !== null && (
            <div className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-800">
              <span className="font-semibold">Faixa recomendada: </span>
              {result.best.applicationRange.description}
            </div>
          )}
          <Card className={bestApproved ? "border-emerald-300 bg-emerald-50/50" : "border-amber-300 bg-amber-50/50"}>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm">
                {bestApproved ? "🥇 Melhor candidato aprovado" : "⚠ Candidato mais próximo — não aprovado"}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={bestApproved ? "default" : "destructive"} className="text-[10px]">
                  {bestApproved ? "Aprovado" : "Não atende"}
                </Badge>
                <Badge variant="secondary" className="text-[10px]">
                  Score {(result.best.score * 100).toFixed(1)}%
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {result.totalCandidates} candidatos avaliados
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-3 gap-2 text-xs sm:grid-cols-6">
                <Field label="Filas" value={result.best.geometry.rows} />
                <Field label="Tubos/fila" value={result.best.geometry.tubes_per_row} />
                <Field label="Passo aleta" value={`${result.best.geometry.fin_pitch_mm} mm`} />
                <Field label="Comprimento" value={`${result.best.geometry.length_mm} mm`} />
                <Field label="Altura" value={`${result.best.geometry.height_mm.toFixed(0)} mm`} />
                <Field
                  label="Área frontal"
                  value={`${result.best.geometry.frontal_area_m2.toFixed(3)} m²`}
                />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs sm:grid-cols-6">
                <Field
                  label="Geometria"
                  value={result.best.geometry.geometry_id ?? "—"}
                />
                <Field label="Circuitos" value={result.best.geometry.circuits} />
                <Field
                  label="Saída coletor"
                  value={
                    result.best.geometry.header_side === "left"
                      ? "Esquerda"
                      : result.best.geometry.header_side === "right"
                        ? "Direita"
                        : "Mesmo lado"
                  }
                />
                <Field
                  label="Pontos atendidos"
                  value={`${result.best.pointsCovered} / ${result.best.totalPoints}`}
                />
                <Field label="ΔT médio" value={`${result.best.avgDeltaT.toFixed(1)} K`} />
                <Field label="COP médio" value={result.best.avgCop.toFixed(2)} />
              </div>
              {/* Resumo de classificação por faixa */}
              <div className="rounded border border-slate-200 bg-slate-50/60 px-2 py-1.5">
                <div className="mb-1 text-[10px] uppercase text-muted-foreground">
                  Distribuição por faixa de capacidade
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.best.idealPoints > 0 && (
                    <span className="inline-flex items-center gap-1 rounded border border-green-300 bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
                      Ideal: {result.best.idealPoints}
                    </span>
                  )}
                  {result.best.acceptablePoints > 0 && (
                    <span className="inline-flex items-center gap-1 rounded border border-blue-300 bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
                      Aceitável: {result.best.acceptablePoints}
                    </span>
                  )}
                  {result.best.undersizedPoints > 0 && (
                    <span className="inline-flex items-center gap-1 rounded border border-red-300 bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-700">
                      Subdim.: {result.best.undersizedPoints}
                    </span>
                  )}
                  {result.best.oversizedPoints > 0 && (
                    <span className="inline-flex items-center gap-1 rounded border border-orange-300 bg-orange-100 px-1.5 py-0.5 text-[10px] font-medium text-orange-700">
                      Grande dem.: {result.best.oversizedPoints}
                    </span>
                  )}
                  <span className="ml-auto text-[10px] text-muted-foreground">
                    Ratio méd: {(result.best.avgRatio * 100).toFixed(0)}%
                    {" · "}
                    Min: {(result.best.minRatio * 100).toFixed(0)}%
                    {" · "}
                    Max: {(result.best.maxOversizeRatio * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="rounded border border-emerald-300 bg-white px-2 py-1.5">
                <div className="text-[10px] uppercase text-muted-foreground">
                  Ventilador selecionado
                </div>
                {selectedFan ? (
                  <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                    <Field label="Modelo" value={selectedFan.model ?? "—"} />
                    <Field label="Quantidade" value={fanCount} />
                    <Field
                      label="Vazão / vent."
                      value={`${(selectedFan.airflow_m3h ?? 0).toLocaleString("pt-BR")} m³/h`}
                    />
                    <Field
                      label="Vazão total"
                      value={`${totalFanAirflow.toLocaleString("pt-BR")} m³/h`}
                    />
                  </div>
                ) : (
                  <div className="text-[11px] text-amber-600">
                    Nenhum ventilador selecionado. Escolha um modelo no painel de restrições.
                  </div>
                )}
              </div>

              {approvedCoilDetails && (
                <div className="rounded-lg border border-emerald-300 bg-white p-3 space-y-3">
                  <div className="text-xs font-semibold text-emerald-800">
                    Dados Técnicos Completos do Aletado Aprovado
                  </div>

                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground mb-1">Dimensões do Aletado</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <Field label="Altura" value={`${approvedCoilDetails.altura_mm.toFixed(0)} mm`} />
                      <Field label="Largura" value={`${approvedCoilDetails.largura_mm.toFixed(0)} mm`} />
                      <Field label="Profundidade" value={`${approvedCoilDetails.prof_mm.toFixed(0)} mm`} />
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground mb-1">Gabinete</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <Field label="Largura" value={`${approvedCoilDetails.gabinete_largura_mm.toFixed(0)} mm`} />
                      <Field label="Altura" value={`${approvedCoilDetails.gabinete_altura_mm.toFixed(0)} mm`} />
                      <Field label="Profundidade" value={`${approvedCoilDetails.gabinete_prof_mm.toFixed(0)} mm`} />
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground mb-1">Volume e Carga de Refrigerante</div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <Field label="Volume interno" value={`${approvedCoilDetails.volumeInterno_L.toFixed(2)} L`} />
                      <Field label="Carga refrig." value={`${approvedCoilDetails.cargaRefrigerante_kg.toFixed(2)} kg`} />
                      <Field label="Peso seco" value={`${approvedCoilDetails.pesoSeco_kg.toFixed(1)} kg`} />
                      <Field label="Peso c/ fluido" value={`${approvedCoilDetails.pesoComFluido_kg.toFixed(1)} kg`} />
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase text-muted-foreground mb-1">Condições Aerodinâmicas e Limites Industriais</div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        {
                          label: "Vel. Frontal",
                          value: `${approvedCoilDetails.face_velocity_ms.toFixed(2)} m/s`,
                          range: isCondenser ? "Lim: 2,0–4,5 m/s" : "Lim: 1,5–3,5 m/s",
                          status: approvedCoilDetails.industrial_limits?.face_velocity.status,
                        },
                        {
                          label: "ΔP Ar",
                          value: `${approvedCoilDetails.air_pressure_drop_pa.toFixed(1)} Pa`,
                          range: isCondenser ? "Máx: 120 Pa" : "Máx: 80 Pa",
                          status: approvedCoilDetails.industrial_limits?.air_pressure_drop.status,
                        },
                        {
                          label: "Vel. Fluido",
                          value: approvedCoilDetails.fluid_velocity_ms > 0
                            ? `${approvedCoilDetails.fluid_velocity_ms.toFixed(2)} m/s`
                            : "N/D",
                          range: isCondenser ? "Lim: 0,5–2,0 m/s" : "Lim: 0,3–1,5 m/s",
                          status: approvedCoilDetails.industrial_limits?.fluid_velocity.status,
                        },
                      ].map((item, i) => {
                        const cls = item.status === "ok"
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                          : item.status === "warning"
                            ? "border-amber-300 bg-amber-50 text-amber-700"
                            : "border-red-300 bg-red-50 text-red-700";
                        const badge = item.status === "ok" ? "✓ OK"
                          : item.status === "warning" ? "⚠ Atenção"
                          : "✗ Fora do limite";
                        return (
                          <div key={i} className={`rounded border px-2 py-1.5 ${cls}`}>
                            <div className="text-[10px] uppercase opacity-70">{item.label}</div>
                            <div className="text-sm font-semibold">{item.value}</div>
                            <div className="text-[10px] opacity-70">{item.range}</div>
                            <div className="text-[10px] font-medium mt-0.5">{badge}</div>
                          </div>
                        );
                      })}
                    </div>
                    {approvedCoilDetails.industrial_limits && (
                      <div className={`mt-2 rounded px-2 py-1 text-[11px] font-medium ${
                        approvedCoilDetails.industrial_limits.overall_status === "ok"
                          ? "bg-emerald-100 text-emerald-800"
                          : approvedCoilDetails.industrial_limits.overall_status === "warning"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                        {approvedCoilDetails.industrial_limits.overall_status === "ok"
                          ? "✓ Todos os limites industriais atendidos"
                          : approvedCoilDetails.industrial_limits.overall_status === "warning"
                            ? "⚠ Atenção: alguns parâmetros próximos dos limites"
                            : "✗ Parâmetros fora dos limites — revisar geometria ou ventilação"}
                      </div>
                    )}
                  </div>

                  {approvedCoilDetails.fanFit && (
                    <div>
                      <div className="text-[10px] uppercase text-muted-foreground mb-1">Encaixe do Ventilador</div>
                      {approvedCoilDetails.fanFit.fanWarnings.map((w, i) => (
                        <div key={i} className={`text-[11px] ${w.level === "ok" ? "text-emerald-700" : "text-red-700"}`}>
                          {w.level === "ok" ? "✓" : "✗"} {w.msg}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button size="sm" onClick={applyToForm} disabled={!bestApproved} className="h-7 gap-1 text-xs">
                  <Wand2 className="h-3 w-3" /> Aplicar ao formulário principal
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={openInSimulator}
                  disabled={!bestApproved}
                  className="h-7 gap-1 text-xs"
                >
                  <Play className="h-3 w-3" /> Abrir no Simulador
                </Button>
              </div>

            </CardContent>
          </Card>

          {/* Card do Distribuidor — apenas evaporadores DX */}
          {!isCondenser && distributorResult && (
            <Card
              className={
                distributorResult.dp_status === "ok"
                  ? "border-emerald-300 bg-emerald-50/40"
                  : distributorResult.dp_status === "warning"
                    ? "border-amber-300 bg-amber-50/40"
                    : "border-red-300 bg-red-50/40"
              }
            >
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm">
                  Distribuidor — {distributorResult.tipologia} · {distributorResult.model_code}
                </CardTitle>
                <Badge
                  variant={
                    distributorResult.dp_status === "ok"
                      ? "default"
                      : distributorResult.dp_status === "warning"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-[10px]"
                >
                  {distributorResult.dp_status === "ok"
                    ? "✓ OK"
                    : distributorResult.dp_status === "warning"
                      ? "⚠ Atenção"
                      : "✗ Revisar"}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Dimensões físicas */}
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground mb-1 font-semibold">Dimensões Físicas</div>
                  <div className="grid grid-cols-3 gap-1.5 text-xs sm:grid-cols-6">
                    <Field label="Conexão" value={distributorResult.odm} />
                    <Field label="Ø corpo" value={`${distributorResult.D_mm} mm`} />
                    <Field label="Comp. total" value={`${distributorResult.L_mm} mm`} />
                    {distributorResult.L1_mm != null && (
                      <Field label="Comp. conex." value={`${distributorResult.L1_mm} mm`} />
                    )}
                    <Field label="Peso" value={`${distributorResult.peso_kg.toFixed(2)} kg`} />
                    <Field label="Furo (IdGrandezza)" value={distributorResult.id_grandezza} />
                  </div>
                </div>
                {/* Cobertura de circuitos */}
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground mb-1 font-semibold">Cobertura de Circuitos</div>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    <Field label="Circuitos do evap." value={result!.best!.geometry.circuits} />
                    <Field label="Mín. do modelo" value={distributorResult.n_circuits_min} />
                    <Field label="Máx. do modelo" value={distributorResult.n_circuits_max} />
                  </div>
                </div>
                {/* Cálculo hidráulico */}
                <div>
                  <div className="text-[10px] uppercase text-muted-foreground mb-1 font-semibold">Cálculo Hidráulico</div>
                  <div className="grid grid-cols-2 gap-1.5 text-xs sm:grid-cols-4">
                    <Field label="Vazão total" value={`${distributorResult.m_dot_total_kgh.toFixed(2)} kg/h`} />
                    <Field label="Vazão/circuito" value={`${distributorResult.m_dot_per_circuit_kgh.toFixed(2)} kg/h`} />
                    <Field label="κ" value={distributorResult.kappa.toFixed(3)} />
                    <Field label="ΔP distribuidor" value={`${distributorResult.dp_distributor_kpa.toFixed(1)} kPa`} />
                  </div>
                </div>
                {/* Status */}
                <div
                  className={`rounded px-2 py-1.5 text-[11px] font-medium ${
                    distributorResult.dp_status === "ok"
                      ? "bg-emerald-100 text-emerald-800"
                      : distributorResult.dp_status === "warning"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {distributorResult.dp_message}
                </div>
                {/* Sugestão de circuitos ótimos */}
                {circuitOptResult &&
                  circuitOptResult.optimal_circuits !== result!.best!.geometry.circuits && (
                    <div className="rounded border border-blue-200 bg-blue-50 px-2 py-1.5 text-[11px] text-blue-800">
                      <span className="font-semibold">
                        Circuitos ótimos para o distribuidor: {circuitOptResult.optimal_circuits}
                      </span>{" "}
                      (ΔP: {circuitOptResult.dp_kpa.toFixed(1)} kPa · Vel. massa:{" "}
                      {Math.round(circuitOptResult.mass_velocity_kg_m2s)} kg/m²·s)
                      <br />
                      <span className="text-[10px]">
                        O evaporador atual usa {result!.best!.geometry.circuits} circuitos. Considere
                        refazer a busca com esse valor fixado.
                      </span>
                    </div>
                  )}
                {/* Avisos */}
                {distributorResult.warnings.map((w, i) => (
                  <p key={i} className="text-[10px] text-amber-700">
                    ⚠ {w}
                  </p>
                ))}
                <p className="text-[10px] text-muted-foreground">
                  Limites: ΔP 20–80 kPa (ideal 30–60 kPa) · Modelo {distributorResult.tipologia} cobre{" "}
                  {distributorResult.n_circuits_min}–{distributorResult.n_circuits_max} circuitos
                </p>
              </CardContent>
            </Card>
          )}

          {valveSuggestion && (
            <Card className="border-sky-300 bg-sky-50/40">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm">
                  Válvula de expansão sugerida ({refrigerant})
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  Te {valveSuggestion.tevap_c.toFixed(1)}°C · Q méd{" "}
                  {valveSuggestion.q_kw.toFixed(2)} kW · {result.best!.geometry.circuits} circ.
                </Badge>
              </CardHeader>
              <CardContent className="space-y-1">
                {valveSuggestion.top.map((v, i) => (
                  <div
                    key={v.valve.code}
                    className={`grid grid-cols-5 gap-2 rounded border px-2 py-1 text-xs ${
                      i === 0 ? "border-sky-400 bg-white" : "border-border/50 bg-background"
                    }`}
                  >
                    <Field label="Modelo" value={v.valve.type} />
                    <Field label="Código" value={v.valve.code} />
                    <Field
                      label="Orifício"
                      value={v.valve.orifice_size_in ?? v.valve.orifice_size_mm ?? "—"}
                    />
                    <Field label="κ @ Te" value={v.kappa.toFixed(2)} />
                    <Field
                      label="Cap. estim."
                      value={
                        v.estimated_capacity_kw
                          ? `${v.estimated_capacity_kw.toFixed(2)} kW`
                          : "—"
                      }
                    />
                  </div>
                ))}
                <p className="pt-1 text-[10px] text-muted-foreground">
                  Seleção baseada em curvas κ Danfoss para {refrigerant}, faixa de circuitos
                  e ponto médio de operação.
                </p>
              </CardContent>
            </Card>
          )}

          <CoveragePointsTable points={result.best.coverage} unit={unit} />

          {/* Ranking completo */}
          {result.ranked.length > 1 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Ranking de candidatos ({result.ranked.length} melhores de {result.totalCandidates})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b bg-slate-50 text-[10px] uppercase text-muted-foreground">
                        <th className="px-2 py-1.5 text-left">#</th>
                        <th className="px-2 py-1.5 text-left">Geometria</th>
                        <th className="px-2 py-1.5 text-right">Score</th>
                        <th className="px-2 py-1.5 text-right">Ideal</th>
                        <th className="px-2 py-1.5 text-right">Aceit.</th>
                        <th className="px-2 py-1.5 text-right">Subdim.</th>
                        <th className="px-2 py-1.5 text-right">Ratio méd.</th>
                        <th className="px-2 py-1.5 text-left">Faixa Te</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {result.ranked.map((c, i) => (
                        <tr key={i} className={i === 0 ? "bg-emerald-50 font-medium" : "hover:bg-slate-50"}>
                          <td className="px-2 py-1.5 text-muted-foreground">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</td>
                          <td className="px-2 py-1.5">
                            {c.geometry.rows}F × {c.geometry.tubes_per_row}T × {c.geometry.fin_pitch_mm.toFixed(1)}mm × {c.geometry.length_mm}mm
                          </td>
                          <td className="px-2 py-1.5 text-right font-mono">{(c.score * 100).toFixed(1)}%</td>
                          <td className="px-2 py-1.5 text-right text-green-700">{c.idealPoints}</td>
                          <td className="px-2 py-1.5 text-right text-blue-700">{c.acceptablePoints}</td>
                          <td className="px-2 py-1.5 text-right text-red-600">{c.undersizedPoints}</td>
                          <td className="px-2 py-1.5 text-right font-mono">{(c.avgRatio * 100).toFixed(0)}%</td>
                          <td className="px-2 py-1.5 text-muted-foreground">
                            {c.applicationRange.te_min_c !== null
                              ? `${c.applicationRange.te_min_c?.toFixed(0)}°C a ${c.applicationRange.te_max_c?.toFixed(0)}°C`
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {result && !result.best && (
        <div className="mt-4 rounded bg-red-50 px-3 py-2 text-xs text-red-700">
          Nenhum candidato válido encontrado com as restrições atuais.
        </div>
      )}
      <FanPickerModal
        open={fanPickerOpen}
        onClose={() => setFanPickerOpen(false)}
        fans={fanItems}
        onConfirm={(f) => {
          setSelectedFan(f);
          setFanPickerOpen(false);
        }}
      />
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded border border-border/60 bg-background px-2 py-1">
      <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
      <div className="font-mono text-xs font-medium">{value}</div>
    </div>
  );
}
