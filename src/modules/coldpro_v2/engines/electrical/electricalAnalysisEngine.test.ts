/**
 * Testes do Motor de Análise Elétrica do Sistema de Refrigeração
 *
 * Cobertura:
 *   - COP do sistema vs COP do compressor isolado
 *   - Cálculo de corrente monofásica e trifásica
 *   - Estimativa de corrente a partir de potência quando não informada
 *   - Uso de valores padrão quando dados elétricos ausentes
 *   - Avisos gerados corretamente
 *   - Casos extremos: sem ventiladores, potência zero, q_evap zero
 */

import { describe, expect, it } from "vitest";
import {
  calculateElectricalAnalysis,
  calculateFansTotalPower,
} from "./electricalAnalysisEngine";
import type { SystemComponentsInput } from "../../domain/types";

// ─────────────────────────────────────────────────────────────────────────────
// Fixtures
// ─────────────────────────────────────────────────────────────────────────────

const BASE_EVAPORATOR_INPUT = {
  progressive_input: {
    tube_outer_diameter_mm: 9.52,
    tube_inner_diameter_mm: 8.52,
    tube_pitch_transverse_mm: 25,
    tube_pitch_longitudinal_mm: 21.65,
    fin_height_mm: 21.65,
    fin_thickness_mm: 0.1,
    coil_width_m: 1.2,
    coil_height_m: 0.4,
    tube_material: "copper" as const,
    fin_material: "aluminum" as const,
    // RollGeometry: apenas fin_spacing_mm e rows_in_roll
    rolls: [{ fin_spacing_mm: 7, rows_in_roll: 4 }],
    air_temperature_in_c: 5,
    air_relative_humidity_in: 0.85,
    air_mass_flow_kg_s: 1.2,
    T_evaporating_c: -8,
    refrigerant: "R404A",
  },
};

function makeSystem(overrides: Partial<SystemComponentsInput> = {}): SystemComponentsInput {
  return {
    compressor: {
      cooling_capacity_w: 4500,
      power_w: 2000,
      refrigerant: "R404A",
      evap_temp_c: -8,
      cond_temp_c: 40,
      voltage_v: 380,
      phases: 3,
      power_factor: 0.85,
      motor_current_a: 4.0,
    },
    evaporator: BASE_EVAPORATOR_INPUT,
    condenser: {
      heat_rejection_capacity_w: 6500,
      max_cond_temp_c: 55,
    },
      evaporator_fan: {
        airflow_m3_h: 2000,
        available_static_pressure_pa: 50,
        motor_power_w: 150,
        motor_current_a: 0.35,
        voltage_v: 380,
        phases: 3 as const,
      },
      condenser_fan: {
        airflow_m3_h: 3000,
        available_static_pressure_pa: 30,
        motor_power_w: 150,
        motor_current_a: 0.35,
        voltage_v: 380,
        phases: 3 as const,
      },
    system_conditions: {
      ambient_temp_c: 32,
      required_airflow_m3_h: 2000,
    },
    ...overrides,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Testes principais
// ─────────────────────────────────────────────────────────────────────────────

describe("calculateElectricalAnalysis", () => {
  describe("potências", () => {
    it("calcula W_total = W_comp + W_fan_evap + W_fan_cond corretamente", () => {
      const result = calculateElectricalAnalysis({
        system: makeSystem(),
        q_evap_w: 4500,
      });
      expect(result.compressor_power_w).toBe(2000);
      expect(result.evap_fan_power_w).toBe(150);
      expect(result.cond_fan_power_w).toBe(150);
      expect(result.total_electrical_power_w).toBe(2300);
    });

    it("retorna W_total = W_comp quando não há ventiladores", () => {
      const system = makeSystem({
        evaporator_fan: undefined,
        condenser_fan: undefined,
      });
      const result = calculateElectricalAnalysis({ system, q_evap_w: 4500 });
      expect(result.evap_fan_power_w).toBe(0);
      expect(result.cond_fan_power_w).toBe(0);
      expect(result.total_electrical_power_w).toBe(2000);
    });
  });

  describe("COP", () => {
    it("cop_compressor = Q / W_comp (valor de catálogo)", () => {
      const result = calculateElectricalAnalysis({
        system: makeSystem(),
        q_evap_w: 4500,
      });
      expect(result.cop_compressor).toBeCloseTo(4500 / 2000, 4); // 2.25
    });

    it("cop_system = Q / W_total (valor correto do conjunto)", () => {
      const result = calculateElectricalAnalysis({
        system: makeSystem(),
        q_evap_w: 4500,
      });
      expect(result.cop_system).toBeCloseTo(4500 / 2300, 4); // ≈ 1.957
    });

    it("cop_system < cop_compressor quando há ventiladores", () => {
      const result = calculateElectricalAnalysis({
        system: makeSystem(),
        q_evap_w: 4500,
      });
      expect(result.cop_system).toBeLessThan(result.cop_compressor);
    });

    it("cop_system = cop_compressor quando não há ventiladores", () => {
      const system = makeSystem({
        evaporator_fan: undefined,
        condenser_fan: undefined,
      });
      const result = calculateElectricalAnalysis({ system, q_evap_w: 4500 });
      expect(result.cop_system).toBeCloseTo(result.cop_compressor, 6);
    });

    it("cop_system = 0 quando q_evap_w = 0", () => {
      const result = calculateElectricalAnalysis({
        system: makeSystem(),
        q_evap_w: 0,
      });
      expect(result.cop_system).toBe(0);
      expect(result.cop_compressor).toBe(0);
    });

    it("diferença entre cop_compressor e cop_system é ~15% para ventiladores típicos", () => {
      // Compressor 2000 W + 2 ventiladores de 150 W = 2300 W total
      // Diferença: (2.25 - 1.957) / 2.25 ≈ 13%
      const result = calculateElectricalAnalysis({
        system: makeSystem(),
        q_evap_w: 4500,
      });
      const diff_pct = ((result.cop_compressor - result.cop_system) / result.cop_compressor) * 100;
      expect(diff_pct).toBeGreaterThan(10);
      expect(diff_pct).toBeLessThan(20);
    });
  });

  describe("corrente trifásica (3φ)", () => {
    it("usa motor_current_a do compressor quando disponível", () => {
      const result = calculateElectricalAnalysis({
        system: makeSystem(),
        q_evap_w: 4500,
      });
      expect(result.compressor_current_a).toBe(4.0);
    });

    it("calcula corrente do compressor a partir de power_w quando motor_current_a ausente", () => {
      const system = makeSystem();
      system.compressor = { ...system.compressor, motor_current_a: undefined };
      const result = calculateElectricalAnalysis({ system, q_evap_w: 4500 });
      // I = P / (V × fp × √3) = 2000 / (380 × 0.85 × 1.732) ≈ 3.58 A
      const expected = 2000 / (380 * 0.85 * Math.sqrt(3));
      expect(result.compressor_current_a).toBeCloseTo(expected, 2);
      expect(result.warnings.some((w) => w.includes("corrente calculada"))).toBe(true);
    });

    it("calcula corrente total = I_comp + I_fans", () => {
      const result = calculateElectricalAnalysis({
        system: makeSystem(),
        q_evap_w: 4500,
      });
      expect(result.total_current_a).toBeCloseTo(
        result.compressor_current_a + result.fans_current_a,
        6,
      );
    });
  });

  describe("corrente monofásica (1φ)", () => {
    it("calcula corrente corretamente para sistema monofásico", () => {
      const system = makeSystem();
      system.compressor = {
        ...system.compressor,
        voltage_v: 220,
        phases: 1,
        power_factor: 0.9,
        motor_current_a: undefined,
      };
      const result = calculateElectricalAnalysis({ system, q_evap_w: 4500 });
      // I = P / (V × fp × 1) = 2000 / (220 × 0.9) ≈ 10.1 A
      const expected = 2000 / (220 * 0.9);
      expect(result.compressor_current_a).toBeCloseTo(expected, 2);
      expect(result.phases).toBe(1);
    });
  });

  describe("valores padrão", () => {
    it("usa 380 V quando tensão não informada e emite aviso", () => {
      const system = makeSystem();
      system.compressor = { ...system.compressor, voltage_v: undefined, phases: undefined };
      const result = calculateElectricalAnalysis({ system, q_evap_w: 4500 });
      expect(result.voltage_v).toBe(380);
      expect(result.warnings.some((w) => w.includes("Tensão não informada"))).toBe(true);
    });

    it("usa 3φ quando fases não informadas e emite aviso", () => {
      const system = makeSystem();
      system.compressor = { ...system.compressor, phases: undefined };
      const result = calculateElectricalAnalysis({ system, q_evap_w: 4500 });
      expect(result.phases).toBe(3);
      expect(result.warnings.some((w) => w.includes("fases não informado"))).toBe(true);
    });

    it("usa fp=0.85 quando fator de potência não informado e emite aviso", () => {
      const system = makeSystem();
      system.compressor = { ...system.compressor, power_factor: undefined };
      const result = calculateElectricalAnalysis({ system, q_evap_w: 4500 });
      expect(result.power_factor).toBe(0.85);
      expect(result.warnings.some((w) => w.includes("Fator de potência não informado"))).toBe(true);
    });
  });

  describe("estimativa de potência do ventilador", () => {
    it("estima potência do ventilador a partir de corrente × tensão quando motor_power_w ausente", () => {
      const system = makeSystem();
      system.evaporator_fan = {
        ...system.evaporator_fan!,
        motor_power_w: undefined,
        motor_current_a: 0.35,
        voltage_v: 380,
        phases: 3,
      };
      const result = calculateElectricalAnalysis({ system, q_evap_w: 4500 });
      // P_estimada = I × V × fp × √3 = 0.35 × 380 × 0.85 × 1.732 ≈ 195 W
      const expected = 0.35 * 380 * 0.85 * Math.sqrt(3);
      expect(result.evap_fan_power_w).toBeCloseTo(expected, 0);
      expect(result.warnings.some((w) => w.includes("potência estimada"))).toBe(true);
    });

    it("emite aviso quando ventilador não tem dados elétricos suficientes", () => {
      const system = makeSystem();
      system.evaporator_fan = {
        airflow_m3_h: 2000,
        available_static_pressure_pa: 50,
        // Sem motor_power_w, motor_current_a ou voltage_v
      };
      const result = calculateElectricalAnalysis({ system, q_evap_w: 4500 });
      expect(result.evap_fan_power_w).toBe(0);
      expect(result.warnings.some((w) => w.includes("Potência do ventilador considerada 0 W"))).toBe(true);
    });
  });

  describe("avisos de qualidade", () => {
    it("emite aviso quando COP do sistema < 1.0", () => {
      // COP < 1 quando q_evap < W_total
      const result = calculateElectricalAnalysis({
        system: makeSystem(),
        q_evap_w: 500, // muito baixo
      });
      expect(result.warnings.some((w) => w.includes("COP do sistema muito baixo"))).toBe(true);
    });

    it("emite aviso quando ventiladores representam > 30% da potência", () => {
      const system = makeSystem();
      // Ventiladores com 800 W cada = 1600 W total de ventiladores vs 2000 W compressor = 44%
      system.evaporator_fan = { ...system.evaporator_fan!, motor_power_w: 800 };
      system.condenser_fan = { ...system.condenser_fan!, motor_power_w: 800 };
      const result = calculateElectricalAnalysis({ system, q_evap_w: 4500 });
      expect(result.warnings.some((w) => w.includes("mais de 30% da potência total"))).toBe(true);
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// calculateFansTotalPower
// ─────────────────────────────────────────────────────────────────────────────

describe("calculateFansTotalPower", () => {
  it("retorna soma das potências dos ventiladores", () => {
    const system = makeSystem();
    expect(calculateFansTotalPower(system)).toBe(300); // 150 + 150
  });

  it("retorna 0 quando não há ventiladores", () => {
    const system = makeSystem({ evaporator_fan: undefined, condenser_fan: undefined });
    expect(calculateFansTotalPower(system)).toBe(0);
  });

  it("retorna apenas potência do evaporador quando condensador não tem ventilador", () => {
    const system = makeSystem({ condenser_fan: undefined });
    expect(calculateFansTotalPower(system)).toBe(150);
  });
});
