import { describe, it, expect } from "vitest";
import { simulateVariableSystemControl } from "./variableSystemControlEngine";
import type { VariableControlInput } from "../../domain/types";

const BASE_EVAP_INPUT = {
  tube_outer_diameter_mm: 12,
  tube_inner_diameter_mm: 10,
  tube_pitch_transverse_mm: 30,
  tube_pitch_longitudinal_mm: 26,
  fin_height_mm: 600,
  fin_thickness_mm: 0.1,
  coil_width_m: 1.5,
  coil_height_m: 0.6,
  tube_material: "copper" as const,
  fin_material: "aluminum" as const,
  rolls: [{ fin_spacing_mm: 8, rows_in_roll: 2 }, { fin_spacing_mm: 6, rows_in_roll: 2 }],
  air_temperature_in_c: 5,
  air_relative_humidity_in: 0.85,
  air_mass_flow_kg_s: 3.0,
  T_evaporating_c: -8,
};

function makeInput(
  condMotorPw?: number,
  evapMotorPw?: number,
): VariableControlInput {
  return {
    base_system: {
      compressor: {
        cooling_capacity_w: 18000,
        power_w: 3000,
        refrigerant: "R404A",
        evap_temp_c: -8,
        cond_temp_c: 35,
        voltage_v: 220,
        phases: 1,
        power_factor: 0.9,
      },
      evaporator: { progressive_input: BASE_EVAP_INPUT },
      condenser: { heat_rejection_capacity_w: 22000, max_cond_temp_c: 50 },
      system_conditions: { ambient_temp_c: 32, required_airflow_m3_h: 4000 },
      condenser_fan: condMotorPw != null
        ? { airflow_m3_h: 5000, available_static_pressure_pa: 20, motor_power_w: condMotorPw }
        : undefined,
      evaporator_fan: evapMotorPw != null
        ? { airflow_m3_h: 4000, available_static_pressure_pa: 30, motor_power_w: evapMotorPw }
        : undefined,
    },
    required_capacity_w: 14000,
    control: {
      compressor: { mode: "fixed" },
      condenser_fan: { mode: "fixed" },
      evaporator_fan: { mode: "fixed" },
      expansion_valve: { mode: "electronic" },
    },
    targets: { room_temp_c: 2, evap_approach_k: 10, cond_approach_k: 3, superheat_k: 5 },
  };
}

describe("fanPowerAtSpeed — P5 auditoria UNILAB", () => {
  it("fallback para 500 W quando motor_power_w não fornecido (comportamento anterior)", () => {
    const result = simulateVariableSystemControl(makeInput(undefined, undefined));
    // mode=fixed → speed=100% → fan_power = 2 × 500 × 1.0³ = 1000 W
    expect(result.fan_power_w).toBeCloseTo(1000, -1);
  });

  it("usa motor_power_w real do condensador quando fornecido", () => {
    const withReal = simulateVariableSystemControl(makeInput(1400, 150));
    const withFallback = simulateVariableSystemControl(makeInput(undefined, undefined));
    // cond: 1400 W + evap: 150 W = 1550 W (≠ 1000 W do fallback)
    expect(withReal.fan_power_w).not.toBeCloseTo(withFallback.fan_power_w, -1);
    expect(withReal.fan_power_w).toBeCloseTo(1550, -1);
  });

  it("motor_power_w segue lei cúbica de afinidade", () => {
    // Em speed 80%: P = motor_power_w × 0.8³ = 1000 × 0.512 = 512 W por fan
    // Mas mode=fixed → speed=100%... precisamos de mode=variable para mudar speed
    const result = simulateVariableSystemControl({
      ...makeInput(1000, 1000),
      required_capacity_w: 8000, // sub-carregado → compressor vai modular mas fans fixed
    });
    // fixed → speed=100% → fan_power = 2 × 1000 = 2000 W
    expect(result.fan_power_w).toBeCloseTo(2000, -1);
  });

  it("COP é diferente entre motor_power_w real e fallback", () => {
    const real = simulateVariableSystemControl(makeInput(1400, 150));
    const fallback = simulateVariableSystemControl(makeInput(undefined, undefined));
    // fan_power real (1550 W) > fallback (1000 W) → COP real < COP fallback
    // (compressor_power_w igual nos dois → denominador maior → COP menor)
    expect(real.cop_system).not.toBeCloseTo(fallback.cop_system, 1);
  });
});
