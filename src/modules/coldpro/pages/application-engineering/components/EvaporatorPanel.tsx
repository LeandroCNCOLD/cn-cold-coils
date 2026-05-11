/**
 * EvaporatorPanel.tsx (busca livre / multi-critério)
 *
 * O engenheiro define o que QUER FIXAR (qualquer combinação) e quais critérios
 * de seleção combinar (com pesos). O motor gera dezenas/centenas de candidatos,
 * simula cada um sobre o sweep Te×Tc do compressor e devolve o melhor.
 */
import { useEffect, useMemo, useState } from "react";
import { Wind, Flame, Play, Loader2, Plus, X, Trash2, Wand2 } from "lucide-react";
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

interface EvaporatorPanelProps {
  /** "evaporator" (default) ou "condenser" — define cálculo, ΔT e catálogo. */
  mode?: CoilApplication;
}

export function EvaporatorPanel({ mode = "evaporator" }: EvaporatorPanelProps = {}) {
  const isCondenser = mode === "condenser";
  const sweep = useAppEngineeringStore((s) => s.compressorSweep);
  const refrigerant = useAppEngineeringStore((s) => s.step1.refrigerant);
  const { setEvaporatorInput, setCondenserInput } = useApplicationEngineering();
  const { data: valves } = useExpansionValves(
    isCondenser ? undefined : { refrigerant },
  );

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

  // Limite de ventiladores (sistema sugere modelo + vazão a partir da geometria)
  const [maxFanCount, setMaxFanCount] = useState(2);

  // Motor de cálculo: avançado (Schmidt + LMTD) ou básico (rápido m·cp·ΔT)
  const [engine, setEngine] = useState<"basic" | "advanced">("advanced");

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
    c.header_side = headerSide;
    return c;
  }, [fixed, values, selectedGeometry, headerSide]);

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
          max_fan_count: maxFanCount,
          constraints,
          criteria,
        });
        setResult(r);
      } finally {
        setRunning(false);
      }
    }, 0);
  }

  function applyToForm() {
    const best = result?.best;
    if (!best) return;
    const avgT =
      sweep.reduce((s, p) => s + (isCondenser ? p.tc_c : p.te_c), 0) / sweep.length;
    const payload = {
      airflow_m3h: best.fan.total_airflow_m3h,
      air_inlet_temp_c: isCondenser ? avgT - deltaTTargetK : avgT + deltaTTargetK,
      coil_type: (isCondenser ? "condenser" : "evaporator") as "condenser" | "evaporator",
      geometry: {
        rows: best.geometry.rows,
        tubes_per_row: best.geometry.tubes_per_row,
        fin_spacing_mm: best.geometry.fin_pitch_mm,
        length_mm: best.geometry.length_mm,
        tube_diameter_mm: best.geometry.tube_outer_diameter_mm,
      },
    };
    if (isCondenser) setCondenserInput(payload);
    else setEvaporatorInput(payload);
  }

  const canRun = sweep.length > 0 && criteria.length > 0;

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

            <div className="mt-3 grid grid-cols-2 gap-2 border-t pt-2">
              <div>
                <Label className="text-[11px] text-muted-foreground">
                  Máx. de ventiladores
                </Label>
                <Input
                  type="number"
                  min={1}
                  step={1}
                  value={maxFanCount}
                  onChange={(e) =>
                    setMaxFanCount(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="h-7 text-xs"
                />
                <p className="mt-1 text-[10px] text-muted-foreground">
                  O sistema sugere modelo e vazão compatíveis com a geometria.
                </p>
              </div>
              <div>
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
            <Select value={engine} onValueChange={(v) => setEngine(v as "basic" | "advanced")}>
              <SelectTrigger className="h-7 w-44 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
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
          <Card className="border-emerald-300 bg-emerald-50/50">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm">Melhor candidato</CardTitle>
              <div className="flex items-center gap-2">
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
              <div className="rounded border border-emerald-300 bg-white px-2 py-1.5">
                <div className="text-[10px] uppercase text-muted-foreground">
                  Ventilador sugerido pelo sistema
                </div>
                {result.best.fan.fits && result.best.fan.model ? (
                  <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                    <Field label="Modelo" value={result.best.fan.model.label} />
                    <Field label="Quantidade" value={result.best.fan.count} />
                    <Field
                      label="Vazão / vent."
                      value={`${result.best.fan.model.airflow_m3h.toLocaleString("pt-BR")} m³/h`}
                    />
                    <Field
                      label="Vazão total"
                      value={`${result.best.fan.total_airflow_m3h.toLocaleString("pt-BR")} m³/h`}
                    />
                  </div>
                ) : (
                  <div className="text-[11px] text-red-600">
                    Nenhum ventilador da biblioteca cabe nesta geometria com o limite informado.
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <Button size="sm" onClick={applyToForm} className="h-7 gap-1 text-xs">
                  <Wand2 className="h-3 w-3" /> Aplicar ao formulário principal
                </Button>
              </div>
            </CardContent>
          </Card>

          <CoveragePointsTable points={result.best.coverage} unit={unit} />
        </div>
      )}

      {result && !result.best && (
        <div className="mt-4 rounded bg-red-50 px-3 py-2 text-xs text-red-700">
          Nenhum candidato válido encontrado com as restrições atuais.
        </div>
      )}
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
