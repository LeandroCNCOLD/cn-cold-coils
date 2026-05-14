/**
 * evaporatorSearchService.ts
 *
 * Busca automática do "melhor evaporador/condensador" para um sweep de pontos
 * de operação do compressor.
 *
 * Motores disponíveis:
 *  - "ntu_epsilon"     : NTU-ε (crossflow, fluido a T constante) — padrão
 *  - "lmtd_iterative"  : LMTD iterativo com convergência de T_ar_out
 *  - "basic"           : motor simples Q = ṁ·cp·ΔT (legado)
 */
import { calcCoilCapacity, type CoilNtuEngine } from "./coilNtuService";
import { sizeCoil } from "./coilSizingService";
import { suggestFans, calcRequiredAirflow, type FanSuggestion } from "./fanSuggestionService";
export type { FanSuggestion };
import type { CapacityCurvePoint } from "../types/app-engineering.types";
import {
  classifyEvaporatorPoint,
  classifyCondenserPoint,
  type PointStatus,
} from "./coilPointClassifier";

export {
  classifyEvaporatorPoint,
  classifyCondenserPoint,
} from "./coilPointClassifier";

export type HeaderSide = "left" | "right" | "same_side";

export interface EvaporatorConstraints {
  height_mm?: number;
  length_mm?: number;
  rows?: number;
  tubes_per_row?: number;
  fin_pitch_mm?: number;
  max_frontal_area_m2?: number;
  geometry_id?: string;
  tube_outer_diameter_mm?: number;
  tube_pitch_transverse_mm?: number;
  row_pitch_mm?: number;
  header_side?: HeaderSide;
}

export type EvaporatorCriterionKind =
  | "delta_t_target"
  | "max_points_covered"
  | "best_cop"
  | "min_area";

export interface EvaporatorCriterion {
  kind: EvaporatorCriterionKind;
  target?: number;
  weight: number;
}

export type { PointStatus } from "./coilPointClassifier";

export interface CoveragePoint {
  te_c: number;
  tc_c: number;
  q_comp_w: number;
  q_evap_w: number;
  delta_t_k: number;
  meets: boolean;
  ratio?: number;
  status?: PointStatus;
  pointScore?: number;
  recommendation?: string;
  u_w_m2k?: number;
  fin_efficiency?: number;
  air_pressure_drop_pa?: number;
  fluid_pressure_drop_kpa?: number;
  fluid_velocity_ms?: number;
  exchange_area_m2?: number;
  lmtd_k?: number | null;
  ntu?: number | null;
  effectiveness?: number | null;
  air_outlet_temp_c?: number;
}

export interface EvaporatorCandidateGeometry {
  rows: number;
  tubes_per_row: number;
  fin_pitch_mm: number;
  length_mm: number;
  height_mm: number;
  frontal_area_m2: number;
  tube_outer_diameter_mm: number;
  row_pitch_mm: number;
  circuits: number;
  header_side: HeaderSide;
  geometry_id?: string;
}

export interface ApplicationRange {
  te_min_c: number | null;
  te_max_c: number | null;
  tc_min_c: number | null;
  tc_max_c: number | null;
  description: string;
}

export interface EvaporatorCandidate {
  geometry: EvaporatorCandidateGeometry;
  fan: FanSuggestion;
  coverage: CoveragePoint[];
  pointsCovered: number;
  totalPoints: number;
  avgDeltaT: number;
  avgCop: number;
  score: number;
  scoreBreakdown: Partial<Record<EvaporatorCriterionKind, number>>;
  idealPoints: number;
  acceptablePoints: number;
  undersizedPoints: number;
  oversizedPoints: number;
  avgRatio: number;
  maxOversizeRatio: number;
  minRatio: number;
  applicationRange: ApplicationRange;
  analysis: string;
}

export interface EvaporatorSearchInput {
  sweep: CapacityCurvePoint[];
  mode?: "evaporator" | "condenser";
  delta_t_target_k: number;
  max_fan_count: number;
  manual_airflow_m3h?: number;
  refrigerant?: string;
  engine?: "basic" | "advanced" | "ntu_epsilon" | "lmtd_iterative";
  constraints: EvaporatorConstraints;
  criteria: EvaporatorCriterion[];
}

export interface EvaporatorSearchResult {
  best: EvaporatorCandidate | null;
  ranked: EvaporatorCandidate[];
  totalCandidates: number;
}

const DEFAULT_RANGES = {
  rows: [2, 3, 4, 5, 6, 8],
  tubes_per_row: [8, 10, 12, 14, 16, 18, 20, 24],
  fin_pitch_mm: [2.1, 2.5, 3.0, 3.5, 4.0, 6.0, 8.0, 10.0],
  length_mm: [600, 800, 1000, 1200, 1500, 1800, 2100, 2400],
};

const TOP_N = 10;

function pickRange<T>(value: T | undefined, fallback: T[]): T[] {
  return value !== undefined ? [value] : fallback;
}

function computeHeightMm(tubes_per_row: number, pitch_transv_mm: number): number {
  return tubes_per_row * pitch_transv_mm;
}

function computeFrontalArea(height_mm: number, length_mm: number): number {
  return (height_mm / 1000) * (length_mm / 1000);
}

export function generateCandidates(c: EvaporatorConstraints): EvaporatorCandidateGeometry[] {
  const tubeOd = c.tube_outer_diameter_mm ?? 9.52;
  const pitchTransv = c.tube_pitch_transverse_mm ?? 25;
  const rowPitch = c.row_pitch_mm ?? 22;
  const headerSide: HeaderSide = c.header_side ?? "left";

  let rowsList = pickRange(c.rows, DEFAULT_RANGES.rows);
  if (headerSide === "same_side") {
    rowsList = rowsList.filter((r) => r % 2 === 0);
    if (!rowsList.length) rowsList = [2];
  }
  const finList = pickRange(c.fin_pitch_mm, DEFAULT_RANGES.fin_pitch_mm);
  const lenList = pickRange(c.length_mm, DEFAULT_RANGES.length_mm);

  let tubesList: number[];
  if (c.tubes_per_row !== undefined) {
    tubesList = [c.tubes_per_row];
  } else if (c.height_mm !== undefined) {
    tubesList = [Math.max(2, Math.round(c.height_mm / pitchTransv))];
  } else {
    tubesList = DEFAULT_RANGES.tubes_per_row;
  }

  const out: EvaporatorCandidateGeometry[] = [];
  for (const rows of rowsList) {
    for (const tubes of tubesList) {
      for (const fin of finList) {
        for (const len of lenList) {
          const height = computeHeightMm(tubes, pitchTransv);
          const area = computeFrontalArea(height, len);
          if (c.max_frontal_area_m2 !== undefined && area > c.max_frontal_area_m2) continue;
          const circuits = Math.max(1, Math.round(tubes / 2));
          out.push({
            rows, tubes_per_row: tubes, fin_pitch_mm: fin, length_mm: len,
            height_mm: height, frontal_area_m2: area,
            tube_outer_diameter_mm: tubeOd, row_pitch_mm: rowPitch,
            circuits, header_side: headerSide, geometry_id: c.geometry_id,
          });
        }
      }
    }
  }
  return out;
}

function resolveEngine(engine?: string): "ntu_epsilon" | "lmtd_iterative" | "basic" {
  if (!engine || engine === "ntu_epsilon") return "ntu_epsilon";
  if (engine === "lmtd_iterative" || engine === "advanced") return "lmtd_iterative";
  return "basic";
}

function simulateCandidate(
  geo: EvaporatorCandidateGeometry,
  input: EvaporatorSearchInput,
): { coverage: CoveragePoint[]; avgDeltaT: number; avgCop: number; pointsCovered: number; fan: FanSuggestion } {
  const isCondenser = input.mode === "condenser";
  const engineMode = resolveEngine(input.engine);

  let fan: FanSuggestion;
  if (input.manual_airflow_m3h && input.manual_airflow_m3h > 0) {
    fan = { fits: true, model: null, count: input.max_fan_count, total_airflow_m3h: input.manual_airflow_m3h };
  } else {
    const maxRequired = input.sweep.reduce((max, pt) => {
      const q = isCondenser ? pt.capacity_w + pt.power_w : pt.capacity_w;
      return q > max ? q : max;
    }, 0);
    const requiredAirflow = calcRequiredAirflow(maxRequired, input.delta_t_target_k);
    fan = suggestFans(geo.length_mm, geo.height_mm, input.max_fan_count, requiredAirflow);
  }
  const airflow = fan.total_airflow_m3h;
  const dtTarget = input.delta_t_target_k;
  const coverage: CoveragePoint[] = [];
  let dtSum = 0, copSum = 0, copCount = 0, covered = 0;

  for (const pt of input.sweep) {
    const refrigerant_t = isCondenser ? pt.tc_c : pt.te_c;
    const t_air_in = isCondenser ? pt.tc_c - dtTarget : pt.te_c + dtTarget;
    const required = isCondenser ? pt.capacity_w + pt.power_w : pt.capacity_w;
    let q_coil_w = 0;
    let coilDetail: Partial<CoveragePoint> = {};

    if (fan.fits && airflow > 0) {
      try {
        if (engineMode === "basic") {
          const r = sizeCoil({
            required_capacity_w: required, fluid_inlet_temp_c: refrigerant_t,
            air_inlet_temp_c: t_air_in, airflow_m3h: airflow,
            coil_type: isCondenser ? "condenser" : "evaporator", engine: "basic",
            geometry: {
              rows: geo.rows, tubes_per_row: geo.tubes_per_row, length_mm: geo.length_mm,
              fin_spacing_mm: geo.fin_pitch_mm, tube_diameter_mm: geo.tube_outer_diameter_mm,
              circuits: geo.circuits,
            },
          });
          q_coil_w = Number.isFinite(r.capacity_w) ? r.capacity_w : 0;
          coilDetail = { u_w_m2k: r.u_w_m2k, fin_efficiency: r.fin_efficiency,
            air_pressure_drop_pa: r.air_pressure_drop_pa, fluid_pressure_drop_kpa: r.fluid_pressure_drop_kpa,
            fluid_velocity_ms: r.fluid_velocity_ms, exchange_area_m2: r.exchange_area_m2, lmtd_k: r.lmtd_k };
        } else {
          const r = calcCoilCapacity({
            engine: engineMode as CoilNtuEngine,
            coil_type: isCondenser ? "condenser" : "evaporator",
            rows: geo.rows, tubes_per_row: geo.tubes_per_row, circuits: geo.circuits,
            length_mm: geo.length_mm, fin_pitch_mm: geo.fin_pitch_mm,
            tube_outer_diameter_mm: geo.tube_outer_diameter_mm, row_pitch_mm: geo.row_pitch_mm,
            tube_pitch_transverse_mm: input.constraints.tube_pitch_transverse_mm,
            airflow_m3h: airflow, air_inlet_temp_c: t_air_in,
            refrigerant_sat_temp_c: refrigerant_t,
          });
          q_coil_w = Number.isFinite(r.capacity_w) ? r.capacity_w : 0;
          coilDetail = { u_w_m2k: r.u_w_m2k, fin_efficiency: r.fin_efficiency,
            air_pressure_drop_pa: r.air_pressure_drop_pa, fluid_pressure_drop_kpa: 0,
            fluid_velocity_ms: 0, exchange_area_m2: r.exchange_area_m2, lmtd_k: r.lmtd_k,
            ntu: r.ntu, effectiveness: r.effectiveness, air_outlet_temp_c: r.air_outlet_temp_c };
        }
      } catch { q_coil_w = 0; }
    }

    const dt = isCondenser ? refrigerant_t - t_air_in : t_air_in - refrigerant_t;
    const fit = isCondenser ? classifyCondenserPoint(q_coil_w, required) : classifyEvaporatorPoint(q_coil_w, required);
    const meets = fit.status === "ideal" || fit.status === "low_margin" || fit.status === "acceptable_oversize";
    if (meets) { covered += 1; copSum += pt.cop; copCount += 1; }
    dtSum += dt;
    coverage.push({ te_c: pt.te_c, tc_c: pt.tc_c, q_comp_w: required, q_evap_w: q_coil_w,
      delta_t_k: dt, meets, ratio: fit.ratio, status: fit.status, pointScore: fit.score,
      recommendation: fit.recommendation, ...coilDetail });
  }

  return { coverage, avgDeltaT: input.sweep.length ? dtSum / input.sweep.length : 0,
    avgCop: copCount ? copSum / copCount : 0, pointsCovered: covered, fan };
}

function calcApplicationRange(coverage: CoveragePoint[], isCondenser: boolean): ApplicationRange {
  const meetingPoints = coverage.filter((p) => p.meets);
  if (!meetingPoints.length) {
    return { te_min_c: null, te_max_c: null, tc_min_c: null, tc_max_c: null,
      description: "Nenhum ponto atendido nesta configuração." };
  }
  const teValues = meetingPoints.map((p) => p.te_c);
  const tcValues = meetingPoints.map((p) => p.tc_c);
  const te_min = Math.min(...teValues), te_max = Math.max(...teValues);
  const tc_min = Math.min(...tcValues), tc_max = Math.max(...tcValues);
  const description = isCondenser
    ? `Atende condensação de Tc ${tc_min.toFixed(0)}°C a ${tc_max.toFixed(0)}°C (Te ${te_min.toFixed(0)}°C a ${te_max.toFixed(0)}°C).`
    : `Faixa recomendada: Te ${te_min.toFixed(0)}°C a ${te_max.toFixed(0)}°C, Tc ${tc_min.toFixed(0)}°C a ${tc_max.toFixed(0)}°C.`;
  return { te_min_c: te_min, te_max_c: te_max, tc_min_c: tc_min, tc_max_c: tc_max, description };
}

function generateAnalysis(
  cand: Omit<EvaporatorCandidate, "score" | "scoreBreakdown" | "analysis">,
  rank: number,
  isCondenser: boolean,
): string {
  const { geometry: geo, idealPoints, acceptablePoints, undersizedPoints, oversizedPoints, totalPoints, applicationRange, avgRatio } = cand;
  const covered = idealPoints + acceptablePoints;
  const coveragePct = totalPoints ? Math.round((covered / totalPoints) * 100) : 0;
  const label = isCondenser ? "condensador" : "evaporador";
  const lines: string[] = [];
  if (rank === 1) lines.push(`Melhor ${label} encontrado para este compressor.`);
  else lines.push(`#${rank} no ranking.`);
  lines.push(`Geometria: ${geo.rows}F × ${geo.tubes_per_row}T × ${geo.fin_pitch_mm.toFixed(1)}mm aleta × ${geo.length_mm}mm.`);
  lines.push(`Cobertura: ${covered}/${totalPoints} pontos (${coveragePct}%) — ${idealPoints} ideais, ${acceptablePoints} aceitáveis.`);
  if (undersizedPoints > 0) lines.push(`${undersizedPoints} ponto(s) subdimensionado(s).`);
  if (oversizedPoints > 0) lines.push(`${oversizedPoints} ponto(s) superdimensionado(s).`);
  if (applicationRange.te_min_c !== null) lines.push(applicationRange.description);
  if (avgRatio > 1.3) lines.push("Considere modelo menor — superdimensionado na média.");
  else if (avgRatio < 0.95) lines.push("Considere modelo maior — subdimensionado na média.");
  else lines.push(`Ratio médio: ${(avgRatio * 100).toFixed(0)}% — dimensionamento adequado.`);
  return lines.join(" ");
}

function scoreCandidate(
  cand: Omit<EvaporatorCandidate, "score" | "scoreBreakdown">,
  criteria: EvaporatorCriterion[],
  ctx: { maxArea: number; maxCop: number },
): { score: number; breakdown: Partial<Record<EvaporatorCriterionKind, number>> } {
  const { idealPoints, acceptablePoints, totalPoints } = cand;
  const defaultScore = totalPoints > 0 ? (idealPoints * 1.0 + acceptablePoints * 0.6) / totalPoints : 0;
  if (!criteria.length) {
    return { score: defaultScore, breakdown: { max_points_covered: defaultScore } };
  }
  const totalWeight = criteria.reduce((s, c) => s + Math.max(0, c.weight), 0) || 1;
  const breakdown: Partial<Record<EvaporatorCriterionKind, number>> = {};
  let score = 0;
  for (const c of criteria) {
    let s = 0;
    switch (c.kind) {
      case "delta_t_target": {
        const target = c.target ?? 7;
        const err = Math.abs(cand.avgDeltaT - target) / Math.max(target, 1e-3);
        s = Math.max(0, 1 - err);
        break;
      }
      case "max_points_covered": {
        s = totalPoints > 0 ? (idealPoints * 1.0 + acceptablePoints * 0.6) / totalPoints : 0;
        break;
      }
      case "best_cop": {
        s = ctx.maxCop > 0 ? cand.avgCop / ctx.maxCop : 0;
        break;
      }
      case "min_area": {
        s = ctx.maxArea > 0 ? 1 - cand.geometry.frontal_area_m2 / ctx.maxArea : 0;
        break;
      }
    }
    breakdown[c.kind] = s;
    score += (s * Math.max(0, c.weight)) / totalWeight;
  }
  return { score, breakdown };
}

export function searchBestEvaporator(input: EvaporatorSearchInput): EvaporatorSearchResult {
  if (!input.sweep.length) return { best: null, ranked: [], totalCandidates: 0 };
  const geometries = generateCandidates(input.constraints);
  if (!geometries.length) return { best: null, ranked: [], totalCandidates: 0 };
  const isCondenser = input.mode === "condenser";

  type Pre = Omit<EvaporatorCandidate, "score" | "scoreBreakdown">;
  const pre: Pre[] = geometries.map((geo) => {
    const sim = simulateCandidate(geo, input);
    const cov = sim.coverage;
    const total = cov.length;
    const idealPoints = cov.filter((p) => p.status === "ideal" || p.status === "low_margin").length;
    const acceptablePoints = cov.filter((p) => p.status === "acceptable_oversize").length;
    const undersizedPoints = cov.filter((p) => p.status === "undersized").length;
    const oversizedPoints = cov.filter((p) => p.status === "oversized").length;
    const ratios = cov.map((p) => p.ratio ?? 0);
    const avgRatio = total ? ratios.reduce((s, r) => s + r, 0) / total : 0;
    const maxOversizeRatio = Math.max(...ratios, 0);
    const minRatio = total ? Math.min(...ratios) : 0;
    const applicationRange = calcApplicationRange(cov, isCondenser);
    return {
      geometry: geo, fan: sim.fan, coverage: cov,
      pointsCovered: sim.pointsCovered, totalPoints: input.sweep.length,
      avgDeltaT: sim.avgDeltaT, avgCop: sim.avgCop,
      idealPoints, acceptablePoints, undersizedPoints, oversizedPoints,
      avgRatio, maxOversizeRatio, minRatio, applicationRange, analysis: "",
    };
  });

  const maxArea = Math.max(...pre.map((p) => p.geometry.frontal_area_m2), 1e-3);
  const maxCop = Math.max(...pre.map((p) => p.avgCop), 1e-3);

  const scored: EvaporatorCandidate[] = pre.map((p) => {
    const { score, breakdown } = scoreCandidate(p, input.criteria, { maxArea, maxCop });
    return { ...p, score, scoreBreakdown: breakdown };
  });

  scored.sort((a, b) => {
    if (Math.abs(b.score - a.score) > 0.001) return b.score - a.score;
    return (b.idealPoints + b.acceptablePoints) - (a.idealPoints + a.acceptablePoints);
  });

  const ranked = scored.slice(0, TOP_N).map((c, i) => ({
    ...c,
    analysis: generateAnalysis(c, i + 1, isCondenser),
  }));

  return { best: ranked[0] ?? null, ranked, totalCandidates: scored.length };
}
