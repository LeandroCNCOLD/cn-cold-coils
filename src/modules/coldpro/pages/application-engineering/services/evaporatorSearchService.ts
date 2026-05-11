/**
 * evaporatorSearchService.ts
 *
 * Busca automática do "melhor evaporador" para um sweep de pontos de operação
 * do compressor. O engenheiro escolhe livremente o que fixar (restrições) e
 * combina critérios de seleção com pesos.
 */
import { sizeCoil } from "./coilSizingService";
import { suggestFans, type FanSuggestion } from "./fanSuggestionService";
import type { CapacityCurvePoint } from "../types/app-engineering.types";

// ── Tipos públicos ──────────────────────────────────────────────────────────

export type HeaderSide = "left" | "right" | "same_side";

export interface EvaporatorConstraints {
  height_mm?: number; // se fixo, não varia (height ≈ tubes_per_row × pitch_transv)
  length_mm?: number;
  rows?: number;
  tubes_per_row?: number;
  fin_pitch_mm?: number;
  max_frontal_area_m2?: number;
  // Vêm da Geometria selecionada (ferramenta de estampagem)
  geometry_id?: string;
  tube_outer_diameter_mm?: number; // padrão 9.52
  tube_pitch_transverse_mm?: number; // padrão 25
  row_pitch_mm?: number; // distância entre filas
  /**
   * Lado dos coletores. "same_side" obriga nº de filas par para que o
   * distribuidor e o coletor saiam do mesmo lado do aletado.
   */
  header_side?: HeaderSide;
}

export type EvaporatorCriterionKind =
  | "delta_t_target"
  | "max_points_covered"
  | "best_cop"
  | "min_area";

export interface EvaporatorCriterion {
  kind: EvaporatorCriterionKind;
  /** Para delta_t_target → valor alvo em K (ex.: 7) */
  target?: number;
  /** Peso relativo (0–1). Soma normalizada internamente. */
  weight: number;
}

export interface CoveragePoint {
  te_c: number;
  tc_c: number;
  q_comp_w: number;
  q_evap_w: number;
  delta_t_k: number; // T_ar_in − Te
  meets: boolean;
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

export interface EvaporatorCandidate {
  geometry: EvaporatorCandidateGeometry;
  fan: FanSuggestion;
  coverage: CoveragePoint[];
  pointsCovered: number;
  totalPoints: number;
  avgDeltaT: number;
  avgCop: number; // COP médio do compressor nos pontos atendidos
  score: number;
  scoreBreakdown: Partial<Record<EvaporatorCriterionKind, number>>;
}

export interface EvaporatorSearchInput {
  sweep: CapacityCurvePoint[];
  /** ΔT alvo (T_ar_in − Te) em K. T_ar_in é derivado por ponto: Te + ΔT. */
  delta_t_target_k: number;
  /** Quantidade máxima de ventiladores que o engenheiro aceita instalar. */
  max_fan_count: number;
  refrigerant?: string;
  constraints: EvaporatorConstraints;
  criteria: EvaporatorCriterion[];
}

export interface EvaporatorSearchResult {
  best: EvaporatorCandidate | null;
  ranked: EvaporatorCandidate[]; // top N
  totalCandidates: number;
}

// ── Faixas padrão (quando o engenheiro NÃO fixa) ────────────────────────────

const DEFAULT_RANGES = {
  rows: [2, 3, 4, 5, 6, 8],
  tubes_per_row: [8, 10, 12, 14, 16, 18, 20, 24],
  fin_pitch_mm: [2.1, 2.5, 3.0, 3.5, 4.0, 6.0, 8.0, 10.0],
  length_mm: [600, 800, 1000, 1200, 1500, 1800, 2100, 2400],
};

const TOP_N = 8;

function pickRange<T>(value: T | undefined, fallback: T[]): T[] {
  return value !== undefined ? [value] : fallback;
}

// Altura do bloco aletado ≈ tubes_per_row × pitch_transverse
function computeHeightMm(tubes_per_row: number, pitch_transv_mm: number): number {
  return tubes_per_row * pitch_transv_mm;
}

function computeFrontalArea(height_mm: number, length_mm: number): number {
  return (height_mm / 1000) * (length_mm / 1000);
}

// ── Geração de candidatos ───────────────────────────────────────────────────

export function generateCandidates(
  c: EvaporatorConstraints,
): EvaporatorCandidateGeometry[] {
  const tubeOd = c.tube_outer_diameter_mm ?? 9.52;
  const pitchTransv = c.tube_pitch_transverse_mm ?? 25;
  const rowPitch = c.row_pitch_mm ?? 22;
  const headerSide: HeaderSide = c.header_side ?? "left";

  let rowsList = pickRange(c.rows, DEFAULT_RANGES.rows);
  // Mesmo lado para distribuidor e coletor → nº de filas precisa ser par
  if (headerSide === "same_side") {
    rowsList = rowsList.filter((r) => r % 2 === 0);
    if (!rowsList.length) rowsList = [2];
  }
  const finList = pickRange(c.fin_pitch_mm, DEFAULT_RANGES.fin_pitch_mm);
  const lenList = pickRange(c.length_mm, DEFAULT_RANGES.length_mm);

  // tubes_per_row pode vir direto OU ser derivado de height_mm
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
          // Regra prática: 1 circuito a cada 2 tubos por fila (pode ser ajustada)
          const circuits = Math.max(1, Math.round(tubes / 2));
          out.push({
            rows,
            tubes_per_row: tubes,
            fin_pitch_mm: fin,
            length_mm: len,
            height_mm: height,
            frontal_area_m2: area,
            tube_outer_diameter_mm: tubeOd,
            row_pitch_mm: rowPitch,
            circuits,
            header_side: headerSide,
            geometry_id: c.geometry_id,
          });
        }
      }
    }
  }
  return out;
}

// ── Simulação de um candidato sobre o sweep ─────────────────────────────────

function simulateCandidate(
  geo: EvaporatorCandidateGeometry,
  input: EvaporatorSearchInput,
): {
  coverage: CoveragePoint[];
  avgDeltaT: number;
  avgCop: number;
  pointsCovered: number;
  fan: FanSuggestion;
} {
  const fan = suggestFans(geo.length_mm, geo.height_mm, input.max_fan_count);
  const airflow = fan.total_airflow_m3h;
  const dtTarget = input.delta_t_target_k;

  const coverage: CoveragePoint[] = [];
  let dtSum = 0;
  let copSum = 0;
  let copCount = 0;
  let covered = 0;

  for (const pt of input.sweep) {
    // T_ar_in respeita o ΔT alvo de evaporação (ar entra em Te + ΔT)
    const t_air_in = pt.te_c + dtTarget;
    let q_evap_w = 0;
    if (fan.fits && airflow > 0) {
      try {
        const r = sizeCoil({
          required_capacity_w: pt.capacity_w,
          fluid_inlet_temp_c: pt.te_c,
          air_inlet_temp_c: t_air_in,
          airflow_m3h: airflow,
          coil_type: "evaporator",
          geometry: {
            rows: geo.rows,
            tubes_per_row: geo.tubes_per_row,
            length_mm: geo.length_mm,
            fin_spacing_mm: geo.fin_pitch_mm,
            tube_diameter_mm: geo.tube_outer_diameter_mm,
            circuits: Math.max(1, Math.ceil(geo.tubes_per_row / 2)),
          },
        });
        q_evap_w = Number.isFinite(r.capacity_w) ? r.capacity_w : 0;
      } catch {
        q_evap_w = 0;
      }
    }
    const dt = t_air_in - pt.te_c;
    const meets = q_evap_w >= pt.capacity_w * 0.98;
    if (meets) {
      covered += 1;
      copSum += pt.cop;
      copCount += 1;
    }
    dtSum += dt;
    coverage.push({
      te_c: pt.te_c,
      tc_c: pt.tc_c,
      q_comp_w: pt.capacity_w,
      q_evap_w,
      delta_t_k: dt,
      meets,
    });
  }

  return {
    coverage,
    avgDeltaT: input.sweep.length ? dtSum / input.sweep.length : 0,
    avgCop: copCount ? copSum / copCount : 0,
    pointsCovered: covered,
    fan,
  };
}

// ── Score por critério ──────────────────────────────────────────────────────

function scoreCandidate(
  cand: Omit<EvaporatorCandidate, "score" | "scoreBreakdown">,
  criteria: EvaporatorCriterion[],
  ctx: { maxArea: number; maxCop: number },
): { score: number; breakdown: Partial<Record<EvaporatorCriterionKind, number>> } {
  if (!criteria.length) return { score: 0, breakdown: {} };
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
        s = cand.totalPoints ? cand.pointsCovered / cand.totalPoints : 0;
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

// ── Busca principal ─────────────────────────────────────────────────────────

export function searchBestEvaporator(
  input: EvaporatorSearchInput,
): EvaporatorSearchResult {
  if (!input.sweep.length) {
    return { best: null, ranked: [], totalCandidates: 0 };
  }
  const geometries = generateCandidates(input.constraints);
  if (!geometries.length) {
    return { best: null, ranked: [], totalCandidates: 0 };
  }

  // Pré-simulação para coletar métricas de normalização
  type Pre = Omit<EvaporatorCandidate, "score" | "scoreBreakdown">;
  const pre: Pre[] = geometries.map((geo) => {
    const sim = simulateCandidate(geo, input);
    return {
      geometry: geo,
      fan: sim.fan,
      coverage: sim.coverage,
      pointsCovered: sim.pointsCovered,
      totalPoints: input.sweep.length,
      avgDeltaT: sim.avgDeltaT,
      avgCop: sim.avgCop,
    };
  });

  const maxArea = Math.max(...pre.map((p) => p.geometry.frontal_area_m2), 1e-3);
  const maxCop = Math.max(...pre.map((p) => p.avgCop), 1e-3);

  const scored: EvaporatorCandidate[] = pre.map((p) => {
    const { score, breakdown } = scoreCandidate(p, input.criteria, { maxArea, maxCop });
    return { ...p, score, scoreBreakdown: breakdown };
  });

  scored.sort((a, b) => b.score - a.score);

  return {
    best: scored[0] ?? null,
    ranked: scored.slice(0, TOP_N),
    totalCandidates: scored.length,
  };
}
