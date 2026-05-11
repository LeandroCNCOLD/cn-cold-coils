import type { CapacityCurvePoint } from "../types/app-engineering.types";

function evalEN12900(coeffs: number[], te: number, tc: number): number {
  if (!Array.isArray(coeffs) || coeffs.length < 10) return 0;
  const [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10] = coeffs;
  return (
    c1 +
    c2 * te +
    c3 * tc +
    c4 * te ** 2 +
    c5 * te * tc +
    c6 * tc ** 2 +
    c7 * te ** 3 +
    c8 * tc * te ** 2 +
    c9 * te * tc ** 2 +
    c10 * tc ** 3
  );
}

export interface GenerateCapacityCurveInput {
  capacity_coefficients: number[];
  power_coefficients: number[];
  te_min_c: number;
  te_max_c: number;
  n_points: number;
  tc_values_c: number[];
  frequency_hz?: number;
}

export interface CapacityCurveSeries {
  tc_c: number;
  points: CapacityCurvePoint[];
}

export function generateCapacityCurve(
  input: GenerateCapacityCurveInput,
): { series: CapacityCurveSeries[] } {
  const {
    capacity_coefficients: capC,
    power_coefficients: pwrC,
    te_min_c,
    te_max_c,
    n_points,
    tc_values_c,
  } = input;

  if (capC.length < 10 || pwrC.length < 10) return { series: [] };

  const step = n_points > 1 ? (te_max_c - te_min_c) / (n_points - 1) : 0;

  const series: CapacityCurveSeries[] = tc_values_c.map((tc) => {
    const points: CapacityCurvePoint[] = [];
    for (let i = 0; i < n_points; i++) {
      const te = te_min_c + i * step;
      const capacity_w = evalEN12900(capC, te, tc);
      const power_w = evalEN12900(pwrC, te, tc);
      if (capacity_w > 0 && power_w > 0) {
        points.push({
          te_c: te,
          tc_c: tc,
          capacity_w,
          power_w,
          cop: capacity_w / power_w,
        });
      }
    }
    return { tc_c: tc, points };
  });

  return { series };
}
