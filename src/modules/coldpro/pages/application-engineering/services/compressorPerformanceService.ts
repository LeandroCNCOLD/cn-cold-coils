import type { CompressorPerformanceInput, CompressorPerformanceResult } from "../types";

/**
 * Avalia o desempenho do compressor usando polinômios EN12900 / ARI 540.
 *
 * Polinômio de 10 coeficientes:
 *   f(Te, Tc) = c1 + c2·Te + c3·Tc + c4·Te² + c5·Te·Tc + c6·Tc²
 *             + c7·Te³ + c8·Tc·Te² + c9·Te·Tc² + c10·Tc³
 *
 * Resultado em kW → convertido para W.
 */
function evalEN12900(coeffs: number[], Te: number, Tc: number): number {
  if (coeffs.length < 10) return 0;
  const [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10] = coeffs;
  return (
    c1 +
    c2 * Te +
    c3 * Tc +
    c4 * Te * Te +
    c5 * Te * Tc +
    c6 * Tc * Tc +
    c7 * Te * Te * Te +
    c8 * Tc * Te * Te +
    c9 * Te * Tc * Tc +
    c10 * Tc * Tc * Tc
  );
}

/**
 * Verifica se o ponto (Te, Tc) está dentro do envelope típico de operação.
 * Limites conservadores para compressores herméticos de refrigeração comercial.
 */
function checkEnvelope(Te: number, Tc: number): boolean {
  return Te >= -45 && Te <= 15 && Tc >= 20 && Tc <= 65 && Tc - Te >= 10;
}

export function evaluateCompressorPerformance(
  input: CompressorPerformanceInput,
): CompressorPerformanceResult {
  const warnings: string[] = [];
  const { capacity_coefficients, power_coefficients, evap_temp_c: Te, cond_temp_c: Tc } = input;

  const within_envelope = checkEnvelope(Te, Tc);
  if (!within_envelope) {
    warnings.push(
      `Ponto Te=${Te}°C / Tc=${Tc}°C fora do envelope típico — resultado extrapolado`,
    );
  }

  const capacity_kw = evalEN12900(capacity_coefficients, Te, Tc);
  const power_kw = evalEN12900(power_coefficients, Te, Tc);

  const capacity_w = capacity_kw * 1000;
  const power_w = power_kw * 1000;

  if (capacity_w <= 0) {
    warnings.push("Capacidade calculada ≤ 0 — verificar coeficientes ou ponto de operação");
  }
  if (power_w <= 0) {
    warnings.push("Potência calculada ≤ 0 — verificar coeficientes ou ponto de operação");
  }

  const cop = power_w > 0 ? capacity_w / power_w : 0;
  const heat_rejection_w = capacity_w + power_w;

  if (cop < 1.0 && capacity_w > 0) {
    warnings.push(`COP = ${cop.toFixed(2)} muito baixo — verificar dados do compressor`);
  }

  return {
    capacity_w: Math.max(capacity_w, 0),
    power_w: Math.max(power_w, 0),
    cop,
    heat_rejection_w: Math.max(heat_rejection_w, 0),
    within_envelope,
    warnings,
  };
}
