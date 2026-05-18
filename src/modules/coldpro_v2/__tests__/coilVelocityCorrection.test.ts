/**
 * Testes da correção UNILAB/VapCyc por velocidade frontal.
 *
 * Valores de referência da série "1263-A D" verificados analiticamente
 * (coilCorrectionCoefficients.json, id=10, vMin=1.0, vMax=3.3):
 *   v=2.5 → factor ≈ 1.0045
 *   v=3.0 → factor ≈ 0.9710
 *   v=3.3 → factor ≈ 0.9564   (vMax)
 *   v=3.74 → factor ≈ 0.9564  (clamped a vMax=3.3)
 *
 * Série "1280-A D" (id=22, vMin=1.35, vMax=3.3):
 *   v=2.0 → factor ≈ 0.9887
 */

import { describe, it, expect } from "vitest";
import { applyUnilabVelocityCorrection } from "../engines/coilVelocityCorrection";
import { calculateProgressiveCoil } from "../engines/progressive/progressiveCoilSolver";
import type { ProgressiveCoilInput } from "../domain/types";

// ── Fixtures de geometria mínima ──────────────────────────────────────────────
// 12 tubos × 27mm passo = 0.324m altura; comprimento 1.0m; v=2.5→ṁ≈1.037 kg/s

function makeInput(air_velocity_ms = 2.5): ProgressiveCoilInput {
  const P_t_m = 0.027;
  const n_tubes = 12;
  const coil_height_m = n_tubes * P_t_m;
  const coil_width_m = 1.0;
  const rho = 101325 / (287.1 * (273.15 + 2)); // ar a 2°C ≈ 1.281 kg/m³
  const face_area = coil_width_m * coil_height_m;
  return {
    tube_outer_diameter_mm: 12.7,
    tube_inner_diameter_mm: 11.1,
    tube_pitch_transverse_mm: 27,
    tube_pitch_longitudinal_mm: 31.5,
    fin_height_mm: coil_height_m * 1000,
    fin_thickness_mm: 0.12,
    coil_width_m,
    coil_height_m,
    tube_material: "copper",
    fin_material: "aluminum",
    rolls: [{ fin_spacing_mm: 4.5, rows_in_roll: 3 }],
    air_temperature_in_c: 2,
    air_relative_humidity_in: 0.85,
    air_mass_flow_kg_s: face_area * air_velocity_ms * rho,
    T_evaporating_c: -10,
    refrigerant: "R404A",
    superheat_k: 8,
    fin_pitch_mm: 4.5,
    fin_type: "plain",
  };
}

const BASE_INPUT = makeInput(2.5);

// ── Testes unitários: applyUnilabVelocityCorrection ───────────────────────────

describe("applyUnilabVelocityCorrection — série 1263-A D", () => {
  it("v=2.5 → factor ≈ 1.0045 (±0.001)", () => {
    const r = applyUnilabVelocityCorrection(2.5, "1263-A D");
    expect(r.factor).toBeCloseTo(1.0045, 2);
    expect(r.serie_used).toBe("1263-A D");
    expect(r.v_used_ms).toBeCloseTo(2.5, 3);
    expect(r.warning).toBeUndefined();
  });

  it("v=3.0 → factor ≈ 0.9710 (±0.002)", () => {
    const r = applyUnilabVelocityCorrection(3.0, "1263-A D");
    expect(r.factor).toBeCloseTo(0.9710, 2);
  });

  it("v=3.3 → factor ≈ 0.9564 (vMax exato)", () => {
    const r = applyUnilabVelocityCorrection(3.3, "1263-A D");
    expect(r.factor).toBeCloseTo(0.9564, 2);
    expect(r.v_used_ms).toBeCloseTo(3.3, 3);
  });

  it("v=3.74 → clampado a vMax=3.3, factor ≈ 0.9564", () => {
    const r = applyUnilabVelocityCorrection(3.74, "1263-A D");
    expect(r.factor).toBeCloseTo(0.9564, 2);
    expect(r.v_used_ms).toBeCloseTo(3.3, 2);
    expect(r.warning).toBeDefined();
  });
});

describe("applyUnilabVelocityCorrection — série 1280-A D", () => {
  it("v=2.0 → factor ≈ 0.9887 (±0.003)", () => {
    const r = applyUnilabVelocityCorrection(2.0, "1280-A D");
    expect(r.factor).toBeCloseTo(0.9887, 2);
    expect(r.serie_used).toBe("1280-A D");
  });
});

describe("applyUnilabVelocityCorrection — casos especiais", () => {
  it("série inexistente → factor=1.0 + warning", () => {
    const r = applyUnilabVelocityCorrection(2.5, "SÉRIE-FICTICIA-XYZ");
    expect(r.factor).toBe(1.0);
    expect(r.serie_used).toBeNull();
    expect(r.warning).toContain("SÉRIE-FICTICIA-XYZ");
  });

  it("sem série → usa catálogo inteiro, retorna factor válido", () => {
    const r = applyUnilabVelocityCorrection(2.5);
    expect(r.factor).toBeGreaterThan(0.5);
    expect(r.factor).toBeLessThan(1.5);
  });
});

// ── Testes de integração: progressiveCoilSolver com UNILAB ───────────────────

describe("progressiveCoilSolver — integração UNILAB", () => {
  it("apply_unilab_correction=false (padrão) → factor=1.0, serie_used=null", () => {
    const r = calculateProgressiveCoil(BASE_INPUT);
    expect(r.unilab_correction_factor).toBe(1.0);
    expect(r.unilab_serie_used).toBeNull();
    expect(r.total_capacity_w).toBeGreaterThan(0);
  });

  it("apply_unilab_correction=true, serie='1263-A D', v≈2.5 → factor≈1.0045", () => {
    const r = calculateProgressiveCoil({
      ...makeInput(2.5),
      apply_unilab_correction: true,
      unilab_serie: "1263-A D",
    });
    expect(r.unilab_correction_factor).toBeCloseTo(1.0045, 2);
    expect(r.unilab_serie_used).toBe("1263-A D");
    expect(r.total_capacity_w).toBeGreaterThan(0);
  });

  it("capacidade com UNILAB ON < OFF quando factor < 1.0 (v=3.0)", () => {
    const off = calculateProgressiveCoil(makeInput(3.0));
    const on  = calculateProgressiveCoil({
      ...makeInput(3.0),
      apply_unilab_correction: true,
      unilab_serie: "1263-A D",
    });
    // factor(3.0) ≈ 0.9710 → capacidade ON < OFF
    expect(off.total_capacity_w).toBeGreaterThan(0);
    expect(on.total_capacity_w).toBeLessThan(off.total_capacity_w);
    expect(on.unilab_correction_factor).toBeCloseTo(0.9710, 2);
  });
});
