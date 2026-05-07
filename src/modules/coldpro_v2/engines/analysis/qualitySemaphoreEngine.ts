/**
 * qualitySemaphoreEngine.ts — Sprint 8
 *
 * Motor de semáforo de qualidade do produto.
 * Compara resultados simulados com valores de catálogo e classifica
 * cada parâmetro em verde (dentro da tolerância), amarelo (aviso)
 * ou vermelho (fora da tolerância).
 *
 * Limites padrão:
 *   - Verde  : desvio ≤ ±5%
 *   - Amarelo: desvio entre ±5% e ±15%
 *   - Vermelho: desvio > ±15%
 */

import type {
  QualityLevel,
  QualitySemaphoreInput,
  QualitySemaphoreResult,
} from "../../domain/types";

// ─── Constantes padrão ────────────────────────────────────────────────────────

const DEFAULT_GREEN_PCT = 5.0;
const DEFAULT_YELLOW_PCT = 15.0;

// ─── Helpers internos ─────────────────────────────────────────────────────────

function classifyLevel(
  delta_pct: number,
  green_pct: number,
  yellow_pct: number,
): QualityLevel {
  const abs = Math.abs(delta_pct);
  if (abs <= green_pct) return "green";
  if (abs <= yellow_pct) return "yellow";
  return "red";
}

function buildDiagnosis(
  label: string,
  delta_pct: number,
  level: QualityLevel,
  unit: string,
): string {
  const sign = delta_pct >= 0 ? "+" : "";
  const pct = `${sign}${delta_pct.toFixed(1)}%`;

  switch (level) {
    case "green":
      return `${label} dentro da tolerância (${pct} em relação ao catálogo).`;
    case "yellow":
      return (
        `${label} com desvio moderado (${pct}). ` +
        `Verifique as condições de ensaio e os parâmetros de entrada.`
      );
    case "red":
      return (
        `${label} fora da tolerância (${pct}). ` +
        `Revise o modelo de simulação, os dados do catálogo e as condições operacionais.`
      );
  }
}

function overallLevel(
  levels: QualityLevel[],
): QualityLevel {
  if (levels.includes("red")) return "red";
  if (levels.includes("yellow")) return "yellow";
  return "green";
}

function overallDiagnosis(level: QualityLevel): string {
  switch (level) {
    case "green":
      return "Simulação consistente com o catálogo. Produto aprovado para dimensionamento.";
    case "yellow":
      return (
        "Desvios moderados detectados. Revisar parâmetros antes de emitir proposta comercial."
      );
    case "red":
      return (
        "Desvios significativos em relação ao catálogo. " +
        "Não utilizar este resultado para dimensionamento sem revisão técnica."
      );
  }
}

// ─── Motor principal ──────────────────────────────────────────────────────────

/**
 * Classifica a qualidade da simulação comparando com o catálogo.
 */
export function calculateQualitySemaphore(
  input: QualitySemaphoreInput,
): QualitySemaphoreResult {
  const green_pct = input.thresholds?.green_pct ?? DEFAULT_GREEN_PCT;
  const yellow_pct = input.thresholds?.yellow_pct ?? DEFAULT_YELLOW_PCT;

  // ── Desvios percentuais ────────────────────────────────────────────────
  const capacity_delta_pct =
    input.catalog_capacity_w !== 0
      ? ((input.simulated_capacity_w - input.catalog_capacity_w) /
          input.catalog_capacity_w) *
        100
      : 0;

  const cop_delta_pct =
    input.catalog_cop !== 0
      ? ((input.simulated_cop - input.catalog_cop) / input.catalog_cop) * 100
      : 0;

  const power_delta_pct =
    input.catalog_power_w !== 0
      ? ((input.simulated_power_w - input.catalog_power_w) /
          input.catalog_power_w) *
        100
      : 0;

  // ── Classificação por parâmetro ────────────────────────────────────────
  const capacity_level = classifyLevel(capacity_delta_pct, green_pct, yellow_pct);
  const cop_level = classifyLevel(cop_delta_pct, green_pct, yellow_pct);
  const power_level = classifyLevel(power_delta_pct, green_pct, yellow_pct);

  // ── Diagnósticos ───────────────────────────────────────────────────────
  const capacity_diagnosis = buildDiagnosis(
    "Capacidade frigorífica",
    capacity_delta_pct,
    capacity_level,
    "W",
  );
  const cop_diagnosis = buildDiagnosis(
    "COP do sistema",
    cop_delta_pct,
    cop_level,
    "",
  );
  const power_diagnosis = buildDiagnosis(
    "Potência elétrica",
    power_delta_pct,
    power_level,
    "W",
  );

  // ── Status geral ───────────────────────────────────────────────────────
  const overall = overallLevel([capacity_level, cop_level, power_level]);

  return {
    capacity_level,
    cop_level,
    power_level,
    overall_level: overall,
    capacity_delta_pct,
    cop_delta_pct,
    power_delta_pct,
    capacity_diagnosis,
    cop_diagnosis,
    power_diagnosis,
    overall_diagnosis: overallDiagnosis(overall),
  };
}
