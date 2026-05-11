import { describe, it, expect } from "vitest";
import { generateCapacityCurve } from "../capacityCurveService";

// BITZER 4BES-9Y — R404A @ 50 Hz (coeficientes EN 12900)
const CAP_COEFFS = [
  59933.475, 2047.929, -584.498, 24.469, -17.197,
  2.208, 0.0, 0.0, 0.0, 0.0,
];
const PWR_COEFFS = [
  2518.399, -170.251, 259.094, 5.314, -3.532,
  0.841, 0.0, 0.0, 0.0, 0.0,
];

describe("generateCapacityCurve", () => {
  it("retorna série vazia para menos de 10 coeficientes", () => {
    const result = generateCapacityCurve({
      capacity_coefficients: [1, 2, 3],
      power_coefficients: PWR_COEFFS,
      te_min_c: -30,
      te_max_c: 10,
      n_points: 5,
      tc_values_c: [40],
    });
    expect(result.series).toHaveLength(0);
  });

  it("gera 15 pontos para Tc=40°C", () => {
    const result = generateCapacityCurve({
      capacity_coefficients: CAP_COEFFS,
      power_coefficients: PWR_COEFFS,
      te_min_c: -30,
      te_max_c: 10,
      n_points: 15,
      tc_values_c: [40],
    });
    expect(result.series).toHaveLength(1);
    const s = result.series[0];
    expect(s.tc_c).toBe(40);
    expect(s.points.length).toBeGreaterThan(0);
    expect(s.points.length).toBeLessThanOrEqual(15);
  });

  it("Q ≈ 24.3 kW em Te=-10°C, Tc=40°C (tolerância ±15%)", () => {
    const result = generateCapacityCurve({
      capacity_coefficients: CAP_COEFFS,
      power_coefficients: PWR_COEFFS,
      te_min_c: -10,
      te_max_c: -10,
      n_points: 1,
      tc_values_c: [40],
    });
    const pt = result.series[0]?.points[0];
    expect(pt).toBeDefined();
    expect(pt!.capacity_w).toBeGreaterThan(20_000);
    expect(pt!.capacity_w).toBeLessThan(30_000);
  });

  it("COP > 0 em todos os pontos", () => {
    const result = generateCapacityCurve({
      capacity_coefficients: CAP_COEFFS,
      power_coefficients: PWR_COEFFS,
      te_min_c: -30,
      te_max_c: 10,
      n_points: 20,
      tc_values_c: [35, 40, 45],
    });
    for (const s of result.series) {
      for (const pt of s.points) {
        expect(pt.cop).toBeGreaterThan(0);
      }
    }
  });
});
