import { describe, it, expect } from "vitest";
import { calculateProgressiveCoil } from "./progressiveCoilSolver";
import type { ProgressiveCoilInput } from "../../domain/types";

const BASE_LT: ProgressiveCoilInput = {
  tube_outer_diameter_mm: 12.7,
  tube_inner_diameter_mm: 11.7,
  tube_pitch_transverse_mm: 27,
  tube_pitch_longitudinal_mm: 31.5,
  fin_height_mm: 540,
  fin_thickness_mm: 0.1,
  coil_width_m: 1.2,
  coil_height_m: 0.54,
  tube_material: "copper",
  fin_material: "aluminum",
  rolls: [{ fin_spacing_mm: 7, rows_in_roll: 4 }],
  air_temperature_in_c: -12,
  air_relative_humidity_in: 0.85,
  air_mass_flow_kg_s: 4.387,
  T_evaporating_c: -22.2,
  fin_pitch_mm: 7,
  fin_type: "plain",
};

describe("security_factor — P3 auditoria UNILAB", () => {
  it("padrão é 1.0 — sem efeito sobre Q", () => {
    const base = calculateProgressiveCoil(BASE_LT);
    const explicit = calculateProgressiveCoil({ ...BASE_LT, security_factor: 1.0 });
    expect(explicit.total_capacity_w).toBeCloseTo(base.total_capacity_w, 0);
    expect(explicit.security_factor_applied).toBe(1.0);
  });

  it("security_factor=0.90 reduz Q em 10%", () => {
    const base = calculateProgressiveCoil(BASE_LT);
    const safe = calculateProgressiveCoil({ ...BASE_LT, security_factor: 0.90 });
    expect(safe.total_capacity_w).toBeCloseTo(base.total_capacity_w * 0.90, 0);
    expect(safe.security_factor_applied).toBe(0.90);
  });

  it("security_factor=1.10 aumenta Q em 10%", () => {
    const base = calculateProgressiveCoil(BASE_LT);
    const generous = calculateProgressiveCoil({ ...BASE_LT, security_factor: 1.10 });
    expect(generous.total_capacity_w).toBeCloseTo(base.total_capacity_w * 1.10, 0);
    expect(generous.security_factor_applied).toBe(1.10);
  });

  it("security_factor é clampado entre 0.05 e 1.95", () => {
    const below = calculateProgressiveCoil({ ...BASE_LT, security_factor: 0.0 });
    const above = calculateProgressiveCoil({ ...BASE_LT, security_factor: 3.0 });
    expect(below.security_factor_applied).toBe(0.05);
    expect(above.security_factor_applied).toBe(1.95);
  });

  it("security_factor undefined retorna security_factor_applied=1.0", () => {
    const result = calculateProgressiveCoil({ ...BASE_LT });
    expect(result.security_factor_applied).toBe(1.0);
  });

  it("security_factor aplicado após C_rich quando model_code fornecido", () => {
    const base = calculateProgressiveCoil({ ...BASE_LT, model_code: "CN_750_LT" });
    const safe = calculateProgressiveCoil({ ...BASE_LT, model_code: "CN_750_LT", security_factor: 0.85 });
    expect(safe.total_capacity_w).toBeCloseTo(base.total_capacity_w * 0.85, 0);
    expect(safe.C_rich).toBeCloseTo(base.C_rich ?? 1, 3);
  });
});
