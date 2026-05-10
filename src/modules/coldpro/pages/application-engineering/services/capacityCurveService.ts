/**
 * Serviço de Curva de Capacidade do Compressor
 *
 * Gera N pontos de desempenho ao longo de um range de Te configurável,
 * para uma ou mais temperaturas de condensação (Tc) fixas.
 *
 * Correlação: EN12900 / ARI 540 — polinômio de 10 coeficientes
 *   f(Te, Tc) = c1 + c2·Te + c3·Tc + c4·Te² + c5·Te·Tc + c6·Tc²
 *             + c7·Te³ + c8·Tc·Te² + c9·Te·Tc² + c10·Tc³
 *
 * Referência: EN 12900:2013, ARI Standard 540-2004
 */

// ── Tipos ────────────────────────────────────────────────────────────────────

export interface CapacityCurveConfig {
  /** Coeficientes EN12900 de capacidade frigorífica [c1..c10] (kW) */
  capacity_coefficients: number[];
  /** Coeficientes EN12900 de potência absorvida [c1..c10] (kW) */
  power_coefficients: number[];
  /** Temperatura de evaporação mínima do range [°C] */
  te_min_c: number;
  /** Temperatura de evaporação máxima do range [°C] */
  te_max_c: number;
  /** Número de pontos a calcular (mínimo 3, máximo 50) */
  n_points: number;
  /** Temperaturas de condensação a simular [°C] — até 4 curvas */
  tc_values_c: number[];
  /** Frequência de operação [Hz] — 50 ou 60 */
  frequency_hz?: 50 | 60;
  /** Fator de correção de frequência (padrão 1.0 para 60 Hz, 0.833 para 50 Hz) */
  frequency_factor?: number;
}

export interface CapacityCurvePoint {
  /** Temperatura de evaporação [°C] */
  te_c: number;
  /** Temperatura de condensação [°C] */
  tc_c: number;
  /** Capacidade frigorífica [W] */
  capacity_w: number;
  /** Potência absorvida [W] */
  power_w: number;
  /** COP do compressor */
  cop: number;
  /** Calor rejeitado [W] */
  heat_rejection_w: number;
  /** Dentro do envelope de operação? */
  within_envelope: boolean;
}

export interface CapacityCurveSeries {
  /** Temperatura de condensação desta série [°C] */
  tc_c: number;
  /** Pontos calculados */
  points: CapacityCurvePoint[];
  /** Ponto de máxima capacidade */
  max_capacity_point: CapacityCurvePoint | null;
  /** Ponto de máximo COP */
  max_cop_point: CapacityCurvePoint | null;
}

export interface CapacityCurveResult {
  /** Séries por temperatura de condensação */
  series: CapacityCurveSeries[];
  /** Ponto de projeto (Te_min, Tc_max) — ponto crítico */
  design_point: CapacityCurvePoint | null;
  /** Ponto de melhor COP em toda a varredura */
  best_cop_point: CapacityCurvePoint | null;
  /** Número total de pontos calculados */
  total_points: number;
  warnings: string[];
}

// ── Funções internas ─────────────────────────────────────────────────────────

function evalEN12900(coeffs: number[], te: number, tc: number): number {
  if (!Array.isArray(coeffs) || coeffs.length < 10) return 0;
  const [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10] = coeffs;
  return (
    c1 +
    c2 * te +
    c3 * tc +
    c4 * te * te +
    c5 * te * tc +
    c6 * tc * tc +
    c7 * te * te * te +
    c8 * tc * te * te +
    c9 * te * tc * tc +
    c10 * tc * tc * tc
  );
}

function checkEnvelope(te: number, tc: number): boolean {
  return (
    te >= -50 &&
    te <= 20 &&
    tc >= 15 &&
    tc <= 70 &&
    tc - te >= 8
  );
}

function calcPoint(
  te: number,
  tc: number,
  capCoeffs: number[],
  pwrCoeffs: number[],
  freqFactor: number,
): CapacityCurvePoint {
  const rawCapKw = evalEN12900(capCoeffs, te, tc);
  const rawPwrKw = evalEN12900(pwrCoeffs, te, tc);

  const capacity_w = Math.max(0, rawCapKw * 1000 * freqFactor);
  const power_w = Math.max(0, rawPwrKw * 1000 * freqFactor);
  const heat_rejection_w = capacity_w + power_w;
  const cop = power_w > 0 ? capacity_w / power_w : 0;

  return {
    te_c: te,
    tc_c: tc,
    capacity_w,
    power_w,
    cop,
    heat_rejection_w,
    within_envelope: checkEnvelope(te, tc),
  };
}

// ── Exportação principal ─────────────────────────────────────────────────────

export function generateCapacityCurve(config: CapacityCurveConfig): CapacityCurveResult {
  const warnings: string[] = [];

  // Validações de entrada
  const nPoints = Math.max(3, Math.min(50, config.n_points));
  if (config.n_points < 3 || config.n_points > 50) {
    warnings.push(`Número de pontos ajustado para ${nPoints} (range válido: 3–50)`);
  }

  if (config.te_min_c >= config.te_max_c) {
    warnings.push("Te_min deve ser menor que Te_max — usando range padrão −40 a −10°C");
  }

  const teMin = config.te_min_c < config.te_max_c ? config.te_min_c : -40;
  const teMax = config.te_min_c < config.te_max_c ? config.te_max_c : -10;

  const tcValues = config.tc_values_c.slice(0, 4); // máximo 4 curvas
  if (tcValues.length === 0) {
    warnings.push("Nenhuma temperatura de condensação definida — usando Tc = 40°C");
    tcValues.push(40);
  }

  // Fator de frequência
  let freqFactor = config.frequency_factor ?? 1.0;
  if (!config.frequency_factor && config.frequency_hz === 50) {
    freqFactor = 50 / 60; // ~0.833
    warnings.push("Fator de frequência 50/60 Hz aplicado automaticamente");
  }

  if (config.capacity_coefficients.length < 10) {
    warnings.push("Coeficientes de capacidade insuficientes (< 10) — resultado pode ser inválido");
  }
  if (config.power_coefficients.length < 10) {
    warnings.push("Coeficientes de potência insuficientes (< 10) — resultado pode ser inválido");
  }

  // Gerar séries
  const step = (teMax - teMin) / (nPoints - 1);
  const series: CapacityCurveSeries[] = [];
  let bestCopPoint: CapacityCurvePoint | null = null;
  let designPoint: CapacityCurvePoint | null = null;

  for (const tc of tcValues) {
    const points: CapacityCurvePoint[] = [];

    for (let i = 0; i < nPoints; i++) {
      const te = teMin + i * step;
      const pt = calcPoint(te, tc, config.capacity_coefficients, config.power_coefficients, freqFactor);
      points.push(pt);

      if (!bestCopPoint || pt.cop > bestCopPoint.cop) {
        bestCopPoint = pt;
      }
    }

    // Ponto de máxima capacidade
    const maxCapPt = points.reduce((a, b) => (b.capacity_w > a.capacity_w ? b : a), points[0]);
    // Ponto de máximo COP
    const maxCopPt = points.reduce((a, b) => (b.cop > a.cop ? b : a), points[0]);

    series.push({ tc_c: tc, points, max_capacity_point: maxCapPt, max_cop_point: maxCopPt });
  }

  // Ponto de projeto = Te_min com Tc_max (ponto mais crítico)
  const tcMax = Math.max(...tcValues);
  const serieCritica = series.find((s) => s.tc_c === tcMax);
  if (serieCritica && serieCritica.points.length > 0) {
    designPoint = serieCritica.points[0]; // primeiro ponto = Te_min
  }

  return {
    series,
    design_point: designPoint,
    best_cop_point: bestCopPoint,
    total_points: series.reduce((acc, s) => acc + s.points.length, 0),
    warnings,
  };
}

/**
 * Extrai os coeficientes EN12900 de um registro do catálogo UNILAB (Var01..Var10).
 * Retorna array de 10 coeficientes ou array vazio se inválido.
 */
export function extractCoefficientsFromCatalog(
  record: Record<string, unknown>,
  prefix: "Var" | "VarP" = "Var",
  startIndex = 1,
): number[] {
  const coeffs: number[] = [];
  for (let i = startIndex; i <= startIndex + 9; i++) {
    const key = `${prefix}${String(i).padStart(2, "0")}`;
    const val = record[key];
    coeffs.push(typeof val === "number" ? val : 0);
  }
  return coeffs;
}
