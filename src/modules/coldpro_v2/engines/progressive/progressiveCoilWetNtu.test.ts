import { describe, it, expect } from "vitest";
import { calculateProgressiveCoil } from "./progressiveCoilSolver";
import type { ProgressiveCoilInput } from "../../domain/types";

// Geometria base LT — 4 fileiras, 20 tubos, Ø12,7mm (referência CN_750_LT)
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

// Geometria MT — mesma estrutura, condições de câmara fria positiva
const BASE_MT: ProgressiveCoilInput = {
  ...BASE_LT,
  air_temperature_in_c: 8,
  air_relative_humidity_in: 0.85,
  T_evaporating_c: -2,
};

describe("NTU-ε entálpico — coil úmido", () => {
  it("LT: Q_wet > Q_dry (cs > cp para Te=-22.2°C)", () => {
    const dry = calculateProgressiveCoil({ ...BASE_LT, use_wet_ntu: false });
    const wet = calculateProgressiveCoil({ ...BASE_LT, use_wet_ntu: true });
    // cs/cp ≈ 1.12 mas NTU baixo atenua diferença; Q_wet ~3-10% maior que Q_dry
    expect(wet.total_capacity_w).toBeGreaterThan(dry.total_capacity_w);
    expect(wet.total_capacity_w / dry.total_capacity_w).toBeGreaterThan(1.02);
    expect(wet.total_capacity_w / dry.total_capacity_w).toBeLessThan(1.25);
  });

  it("MT: Q_wet > Q_dry (cs/cp ≈ 1.67 para Te=-2°C)", () => {
    const dry = calculateProgressiveCoil({ ...BASE_MT, use_wet_ntu: false });
    const wet = calculateProgressiveCoil({ ...BASE_MT, use_wet_ntu: true });
    // cs maior reduz NTU_wet vs NTU_dry; efeito líquido: Q_wet ~3-10% maior que Q_dry
    expect(wet.total_capacity_w).toBeGreaterThan(dry.total_capacity_w);
    expect(wet.total_capacity_w / dry.total_capacity_w).toBeGreaterThan(1.02);
    expect(wet.total_capacity_w / dry.total_capacity_w).toBeLessThan(1.20);
  });

  it("rolls reportam ntu_mode correto — MT usa wet_enthalpy", () => {
    const result = calculateProgressiveCoil({ ...BASE_MT, use_wet_ntu: true });
    expect(result.rolls.length).toBeGreaterThan(0);
    // MT com T_ar=8°C e Te=-2°C → T_dp > Te → modo úmido
    expect(result.rolls[0]?.ntu_mode).toBe("wet_enthalpy");
  });

  it("coil seco (Te > T_dp) usa modo seco mesmo com use_wet_ntu=true", () => {
    // T_ar=20°C, RH=10% → T_dp ≈ -2°C; Te=+15°C > T_dp → coil seco
    const dry_conditions: ProgressiveCoilInput = {
      ...BASE_LT,
      air_temperature_in_c: 20,
      air_relative_humidity_in: 0.10,
      T_evaporating_c: 15,
    };
    const result = calculateProgressiveCoil({ ...dry_conditions, use_wet_ntu: true });
    expect(result.rolls[0]?.ntu_mode).toBe("dry_sensible");
  });

  it("balanço de energia: erro < 5% para MT úmido", () => {
    const result = calculateProgressiveCoil({ ...BASE_MT, use_wet_ntu: true });
    expect(result.energy_balance_error_pct).toBeLessThan(5);
  });

  it("use_wet_ntu=true é o padrão (undefined = wet)", () => {
    const default_result = calculateProgressiveCoil(BASE_MT);
    const explicit_wet   = calculateProgressiveCoil({ ...BASE_MT, use_wet_ntu: true });
    expect(default_result.total_capacity_w).toBeCloseTo(explicit_wet.total_capacity_w, 0);
    expect(default_result.rolls[0]?.ntu_mode).toBe("wet_enthalpy");
  });

  it("LT reporta wet_enthalpy (Te=-22.2°C < T_dp=-13.5°C aprox.)", () => {
    const result = calculateProgressiveCoil(BASE_LT);
    expect(result.rolls[0]?.ntu_mode).toBe("wet_enthalpy");
  });
});
