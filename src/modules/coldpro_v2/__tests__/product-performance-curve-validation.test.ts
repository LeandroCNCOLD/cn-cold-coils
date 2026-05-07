import { describe, expect, it } from "vitest";
import { generateProductPerformanceCurve } from "../engines/performance/productPerformanceCurveEngine";
import type { ProgressiveCoilInput, SystemComponentsInput } from "../domain/types";

const BASE_EVAP_INPUT: ProgressiveCoilInput = {
  tube_outer_diameter_mm: 12,
  tube_inner_diameter_mm: 10,
  tube_pitch_transverse_mm: 30,
  tube_pitch_longitudinal_mm: 26,
  fin_height_mm: 600,
  fin_thickness_mm: 0.1,
  coil_width_m: 0.8,
  coil_height_m: 0.6,
  tube_material: "copper",
  fin_material: "aluminum",
  rolls: [
    { fin_spacing_mm: 12, rows_in_roll: 2 },
    { fin_spacing_mm: 6, rows_in_roll: 2 },
  ],
  air_temperature_in_c: 5,
  air_relative_humidity_in: 0.85,
  air_mass_flow_kg_s: 1.5,
  T_evaporating_c: -8,
};

const BASE_SYSTEM: SystemComponentsInput = {
  compressor: {
    cooling_capacity_w: 5000,
    power_w: 1800,
    refrigerant: "R404A",
    evap_temp_c: -8,
    cond_temp_c: 35,
  },
  evaporator: { progressive_input: BASE_EVAP_INPUT },
  condenser: {
    heat_rejection_capacity_w: 7500,
    max_cond_temp_c: 50,
  },
  system_conditions: {
    ambient_temp_c: 32,
    required_airflow_m3_h: 4000,
  },
};

describe("Product Performance Curve Engine", () => {
  it("generates a basic curve with three operating points", () => {
    const result = generateProductPerformanceCurve({
      system: BASE_SYSTEM,
      operating_points: [
        { evap_temp_c: -10, cond_temp_c: 35 },
        { evap_temp_c: -8, cond_temp_c: 35 },
        { evap_temp_c: -5, cond_temp_c: 35 },
      ],
    });

    expect(result.points).toHaveLength(3);
    expect(result.summary.total_points).toBe(3);
    expect(result.summary.executed_points).toBe(3);
    expect(result.points.every((point) => point.capacity_w > 0)).toBe(true);
    expect(result.points.every((point) => point.cop > 0)).toBe(true);
    expect(result.envelope.max_capacity_w).toBeGreaterThanOrEqual(result.envelope.min_capacity_w);
    expect(["warning", "error"]).toContain(result.status);
    expect(BASE_SYSTEM.compressor.evap_temp_c).toBe(-8);
    expect(BASE_SYSTEM.compressor.cond_temp_c).toBe(35);
    expect(BASE_SYSTEM.evaporator.progressive_input.T_evaporating_c).toBe(-8);
  });

  it("varies capacity with evaporating temperature", () => {
    const result = generateProductPerformanceCurve({
      system: BASE_SYSTEM,
      operating_points: [
        { evap_temp_c: -15, cond_temp_c: 35 },
        { evap_temp_c: -8, cond_temp_c: 35 },
        { evap_temp_c: -2, cond_temp_c: 35 },
      ],
    });

    expect(result.points[0].capacity_w).toBeGreaterThan(0);
    expect(result.points[1].capacity_w).toBeGreaterThan(0);
    expect(result.points[2].capacity_w).toBeGreaterThan(0);
    expect(result.envelope.max_capacity_w).toBeGreaterThan(result.envelope.min_capacity_w);
  });

  it("flags an extreme rejected operating point", () => {
    const result = generateProductPerformanceCurve({
      system: {
        ...BASE_SYSTEM,
        condenser: {
          heat_rejection_capacity_w: 1000,
          max_cond_temp_c: 50,
        },
      },
      operating_points: [
        { evap_temp_c: -8, cond_temp_c: 35 },
        { evap_temp_c: -8, cond_temp_c: 55 },
      ],
    });

    expect(result.summary.rejected_points).toBeGreaterThanOrEqual(1);
    expect(
      result.points.some((point) => point.status === "rejected" || point.status === "warning"),
    ).toBe(true);
    expect(["warning", "error"]).toContain(result.status);
  });

  it("calculates the performance envelope from valid capacity points", () => {
    const result = generateProductPerformanceCurve({
      system: BASE_SYSTEM,
      operating_points: [
        { evap_temp_c: -12, cond_temp_c: 30 },
        { evap_temp_c: -8, cond_temp_c: 35 },
        { evap_temp_c: -4, cond_temp_c: 40 },
      ],
    });

    expect(result.envelope.max_capacity_w).toBeGreaterThanOrEqual(result.envelope.min_capacity_w);
    expect(result.envelope.max_cop).toBeGreaterThanOrEqual(result.envelope.min_cop);
    expect(result.envelope.min_capacity_w).toBeGreaterThan(0);
    expect(result.envelope.min_cop).toBeGreaterThan(0);
  });

  it("stops the loop on the first rejection when configured", () => {
    const result = generateProductPerformanceCurve({
      system: {
        ...BASE_SYSTEM,
        condenser: {
          heat_rejection_capacity_w: 500,
          max_cond_temp_c: 50,
        },
      },
      operating_points: [
        { evap_temp_c: -8, cond_temp_c: 35 },
        { evap_temp_c: -8, cond_temp_c: 35 },
        { evap_temp_c: -8, cond_temp_c: 35 },
      ],
      options: { stop_on_rejection: true },
    });

    expect(result.summary.executed_points).toBe(1);
    expect(result.summary.total_points).toBe(3);
    expect(result.points).toHaveLength(1);
    expect(["rejected", "warning"]).toContain(result.points[0].status);
  });
});

describe("generateProductPerformanceCurve — interpolação ARI 540", () => {
  // Coeficientes simplificados: Q(kW) = 5.0 + 0.15·Te, P(kW) = 1.8 + 0.02·Te + 0.01·Tc
  const ARI540_CAPACITY = [5.0, 0.15, 0.0, 0, 0, 0, 0, 0, 0, 0];
  const ARI540_POWER    = [1.8, 0.02, 0.01, 0, 0, 0, 0, 0, 0, 0];

  it("pot\u00eancia do compressor varia com T_evap quando coeficientes ARI 540 est\u00e3o presentes", () => {
    // Verifica compressor_power_w (n\u00e3o limitado pelo evaporador) para confirmar
    // que a interpola\u00e7\u00e3o ARI 540 est\u00e1 sendo aplicada corretamente.
    // P(kW) = 1.8 + 0.02\u00b7Te + 0.01\u00b7Tc
    // Te=-20, Tc=40 \u2192 P = 1800 W; Te=-10 \u2192 2000 W; Te=0 \u2192 2200 W
    const result = generateProductPerformanceCurve({
      system: {
        ...BASE_SYSTEM,
        compressor: {
          ...BASE_SYSTEM.compressor,
          ari540_capacity_coefficients: ARI540_CAPACITY,
          ari540_power_coefficients: ARI540_POWER,
        },
      },
      operating_points: [
        { evap_temp_c: -20, cond_temp_c: 40 },
        { evap_temp_c: -10, cond_temp_c: 40 },
        { evap_temp_c:   0, cond_temp_c: 40 },
      ],
    });
    const powers = result.points.map((p) => p.compressor_power_w);
    // P deve crescer com T_evap (coeficiente c2 = 0.02 > 0)
    expect(powers[1]).toBeGreaterThan(powers[0]);
    expect(powers[2]).toBeGreaterThan(powers[1]);
    // Valores aproximados esperados: 1800, 2000, 2200 W
    expect(powers[0]).toBeCloseTo(1800, -1);
    expect(powers[1]).toBeCloseTo(2000, -1);
    expect(powers[2]).toBeCloseTo(2200, -1);
  });

  it("potência varia com T_cond quando coeficientes ARI 540 estão presentes", () => {
    const result = generateProductPerformanceCurve({
      system: {
        ...BASE_SYSTEM,
        compressor: {
          ...BASE_SYSTEM.compressor,
          ari540_capacity_coefficients: ARI540_CAPACITY,
          ari540_power_coefficients: ARI540_POWER,
        },
      },
      operating_points: [
        { evap_temp_c: -10, cond_temp_c: 30 },
        { evap_temp_c: -10, cond_temp_c: 40 },
        { evap_temp_c: -10, cond_temp_c: 50 },
      ],
    });
    const powers = result.points.map((p) => p.compressor_power_w);
    expect(powers[1]).toBeGreaterThan(powers[0]);
    expect(powers[2]).toBeGreaterThan(powers[1]);
  });

  it("sem coeficientes ARI 540, potência permanece fixa em todos os pontos de T_cond", () => {
    const result = generateProductPerformanceCurve({
      system: BASE_SYSTEM,
      operating_points: [
        { evap_temp_c: -10, cond_temp_c: 30 },
        { evap_temp_c: -10, cond_temp_c: 40 },
        { evap_temp_c: -10, cond_temp_c: 50 },
      ],
    });
    const powers = result.points.map((p) => p.compressor_power_w);
    expect(powers[0]).toBe(powers[1]);
    expect(powers[1]).toBe(powers[2]);
  });

  it("alertas globais são gerados em português", () => {
    const result = generateProductPerformanceCurve({
      system: {
        ...BASE_SYSTEM,
        condenser: { heat_rejection_capacity_w: 100, max_cond_temp_c: 50 },
      },
      operating_points: [
        { evap_temp_c: -10, cond_temp_c: 35 },
        { evap_temp_c: -10, cond_temp_c: 35 },
        { evap_temp_c: -10, cond_temp_c: 35 },
        { evap_temp_c: -10, cond_temp_c: 35 },
      ],
    });
    const hasPortugueseWarning = result.warnings.some(
      (w) => w.includes("pontos rejeitados") || w.includes("subdimensionado"),
    );
    expect(hasPortugueseWarning).toBe(true);
    const hasEnglishWarning = result.warnings.some(
      (w) => w.includes("undersized") || w.includes("rejected (>"),
    );
    expect(hasEnglishWarning).toBe(false);
  });
});
