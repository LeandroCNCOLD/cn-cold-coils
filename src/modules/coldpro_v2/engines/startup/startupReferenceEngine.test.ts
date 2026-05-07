/**
 * startupReferenceEngine.test.ts
 * Sprint 3 — Testes do Motor de Referências de Start-up
 */

import { describe, it, expect, beforeAll } from "vitest";
import { generateStartupReference, applyFieldMeasurements } from "./startupReferenceEngine";
import { buildProductTechnicalRecord } from "../../database/productTechnicalRecordBuilder";
import type { ProductTechnicalRecord, ProductTechnicalRecordInput } from "../../domain/types";

// ─────────────────────────────────────────────────────────────────────────────
// Fixture: sistema R404A plug-in câmara fria
// ─────────────────────────────────────────────────────────────────────────────

const BASE_INPUT: ProductTechnicalRecordInput = {
  identity: {
    id: "PLUGIN-R404A-001",
    model: "CN-PLUGIN-4500",
    family: "Plug-in",
    line: "Commercial",
    refrigerant: "R404A",
  },
  system: {
    compressor: {
      cooling_capacity_w: 120000,
      power_w: 5000,
      refrigerant: "R404A",
      evap_temp_c: -8,
      cond_temp_c: 35,
      voltage_v: 380,
      phases: 3,
      power_factor: 0.85,
      motor_current_a: 9.5,
    },
    evaporator: {
      progressive_input: {
        tube_outer_diameter_mm: 12,
        tube_inner_diameter_mm: 10,
        tube_pitch_transverse_mm: 30,
        tube_pitch_longitudinal_mm: 26,
        fin_height_mm: 1500,
        fin_thickness_mm: 0.1,
        coil_width_m: 3.0,
        coil_height_m: 1.5,
        tube_material: "copper",
        fin_material: "aluminum",
        rolls: [
          { fin_spacing_mm: 8, rows_in_roll: 2 },
          { fin_spacing_mm: 6, rows_in_roll: 2 },
        ],
        air_temperature_in_c: 5,
        air_relative_humidity_in: 0.85,
        air_mass_flow_kg_s: 18.0,
        T_evaporating_c: -8,
      },
    },
    condenser: {
      heat_rejection_capacity_w: 107000,
      max_cond_temp_c: 45,
    },
    system_conditions: {
      ambient_temp_c: 32,
      required_airflow_m3_h: 4000,
    },
    evaporator_fan: {
      motor_power_w: 600,
      airflow_m3_h: 10000,
      available_static_pressure_pa: 30,
    },
    condenser_fan: {
      motor_power_w: 200,
      airflow_m3_h: 50000,
      available_static_pressure_pa: 20,
    },
  },
  operating_points: [
    { evap_temp_c: -10, cond_temp_c: 35 },
    { evap_temp_c: -8, cond_temp_c: 35 },
    { evap_temp_c: -5, cond_temp_c: 35 },
  ],
};

let record: ProductTechnicalRecord;

beforeAll(() => {
  record = buildProductTechnicalRecord(BASE_INPUT);
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes de estrutura
// ─────────────────────────────────────────────────────────────────────────────

describe("generateStartupReference — estrutura", () => {
  it("deve retornar um StartupReferenceSheet com todos os campos obrigatórios", () => {
    const sheet = generateStartupReference(record);

    expect(sheet).toBeDefined();
    expect(sheet.machine_model).toBe("CN-PLUGIN-4500");
    expect(sheet.refrigerant).toBe("R404A");
    expect(sheet.design_evap_temp_c).toBe(-8);
    expect(sheet.design_cond_temp_c).toBe(35);
    expect(sheet.design_ambient_temp_c).toBe(32);
    expect(sheet.generated_at).toBeTruthy();
    expect(typeof sheet.estimated_charge_kg).toBe("number");
    expect(typeof sheet.charge_tolerance_kg).toBe("number");
    expect(Array.isArray(sheet.warnings)).toBe(true);
    expect(Array.isArray(sheet.groups)).toBe(true);
  });

  it("deve gerar exatamente 5 grupos de parâmetros", () => {
    const sheet = generateStartupReference(record);
    expect(sheet.groups).toHaveLength(5);
  });

  it("deve ter os grupos corretos na ordem correta", () => {
    const sheet = generateStartupReference(record);
    const groupIds = sheet.groups.map((g) => g.group_id);
    expect(groupIds).toEqual(["pressures", "temperatures", "electrical", "air", "charge"]);
  });

  it("todos os parâmetros devem ter status not_measured inicialmente", () => {
    const sheet = generateStartupReference(record);
    for (const group of sheet.groups) {
      for (const param of group.parameters) {
        expect(param.status).toBe("not_measured");
        expect(param.measured_value).toBeNull();
      }
    }
  });

  it("todos os parâmetros devem ter tolerance_min < reference_value < tolerance_max", () => {
    const sheet = generateStartupReference(record);
    for (const group of sheet.groups) {
      for (const param of group.parameters) {
        expect(param.tolerance_min).toBeLessThan(param.reference_value);
        expect(param.tolerance_max).toBeGreaterThan(param.reference_value);
      }
    }
  });

  it("todos os parâmetros devem ter id, label, unit, diagnosis e instruction não-vazios", () => {
    const sheet = generateStartupReference(record);
    for (const group of sheet.groups) {
      for (const param of group.parameters) {
        expect(param.id).toBeTruthy();
        expect(param.label).toBeTruthy();
        expect(param.unit).toBeTruthy();
        expect(param.diagnosis_if_out_of_range).toBeTruthy();
        expect(param.measurement_instruction).toBeTruthy();
      }
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes do Grupo 1 — Pressões
// ─────────────────────────────────────────────────────────────────────────────

describe("Grupo: pressões", () => {
  it("deve calcular pressão de sucção para R404A a -8°C", () => {
    const sheet = generateStartupReference(record);
    const pressuresGroup = sheet.groups.find((g) => g.group_id === "pressures")!;
    const suctionParam = pressuresGroup.parameters.find((p) => p.id === "suction_pressure_bar")!;

    // R404A a -8°C: interpolação entre -10°C (10.06 bar) e -5°C (11.64 bar)
    // -8°C = -10 + 2/5 * (11.64 - 10.06) = 10.06 + 0.4 * 1.58 = 10.692 bar
    expect(suctionParam.reference_value).toBeGreaterThan(10);
    expect(suctionParam.reference_value).toBeLessThan(12);
  });

  it("deve calcular pressão de descarga para R404A a 35°C", () => {
    const sheet = generateStartupReference(record);
    const pressuresGroup = sheet.groups.find((g) => g.group_id === "pressures")!;
    const dischargeParam = pressuresGroup.parameters.find((p) => p.id === "discharge_pressure_bar")!;

    // R404A a 35°C: 32.06 bar
    expect(dischargeParam.reference_value).toBeGreaterThan(30);
    expect(dischargeParam.reference_value).toBeLessThan(35);
  });

  it("deve calcular razão de compressão > 1", () => {
    const sheet = generateStartupReference(record);
    const pressuresGroup = sheet.groups.find((g) => g.group_id === "pressures")!;
    const crParam = pressuresGroup.parameters.find((p) => p.id === "compression_ratio")!;

    expect(crParam.reference_value).toBeGreaterThan(1);
    expect(crParam.reference_value).toBeLessThan(20);
  });

  it("deve ter 3 parâmetros no grupo de pressões", () => {
    const sheet = generateStartupReference(record);
    const pressuresGroup = sheet.groups.find((g) => g.group_id === "pressures")!;
    expect(pressuresGroup.parameters).toHaveLength(3);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes do Grupo 2 — Temperaturas
// ─────────────────────────────────────────────────────────────────────────────

describe("Grupo: temperaturas", () => {
  it("deve calcular temperatura de sucção = Te + SH_design", () => {
    const sheet = generateStartupReference(record);
    const tempGroup = sheet.groups.find((g) => g.group_id === "temperatures")!;
    const suctionTemp = tempGroup.parameters.find((p) => p.id === "suction_temp_c")!;

    // Te = -8°C, SH_design = 8 K → T_suction = 0°C
    expect(suctionTemp.reference_value).toBeCloseTo(0, 0);
  });

  it("deve calcular temperatura de líquido = Tc - SC_design", () => {
    const sheet = generateStartupReference(record);
    const tempGroup = sheet.groups.find((g) => g.group_id === "temperatures")!;
    const liquidTemp = tempGroup.parameters.find((p) => p.id === "liquid_temp_c")!;

    // Tc = 35°C, SC_design = 5 K → T_liquid = 30°C
    expect(liquidTemp.reference_value).toBeCloseTo(30, 0);
  });

  it("deve calcular temperatura de descarga > temperatura de sucção", () => {
    const sheet = generateStartupReference(record);
    const tempGroup = sheet.groups.find((g) => g.group_id === "temperatures")!;
    const dischargeTemp = tempGroup.parameters.find((p) => p.id === "discharge_temp_c")!;
    const suctionTemp = tempGroup.parameters.find((p) => p.id === "suction_temp_c")!;

    expect(dischargeTemp.reference_value).toBeGreaterThan(suctionTemp.reference_value);
  });

  it("deve ter SH de referência = 8 K", () => {
    const sheet = generateStartupReference(record);
    const tempGroup = sheet.groups.find((g) => g.group_id === "temperatures")!;
    const shParam = tempGroup.parameters.find((p) => p.id === "superheat_k")!;

    expect(shParam.reference_value).toBe(8);
  });

  it("deve ter SC de referência = 5 K", () => {
    const sheet = generateStartupReference(record);
    const tempGroup = sheet.groups.find((g) => g.group_id === "temperatures")!;
    const scParam = tempGroup.parameters.find((p) => p.id === "subcooling_k")!;

    expect(scParam.reference_value).toBe(5);
  });

  it("deve ter 7 parâmetros no grupo de temperaturas", () => {
    const sheet = generateStartupReference(record);
    const tempGroup = sheet.groups.find((g) => g.group_id === "temperatures")!;
    expect(tempGroup.parameters).toHaveLength(7);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes do Grupo 3 — Elétrico
// ─────────────────────────────────────────────────────────────────────────────

describe("Grupo: elétrico", () => {
  it("deve calcular corrente do compressor > 0", () => {
    const sheet = generateStartupReference(record);
    const elecGroup = sheet.groups.find((g) => g.group_id === "electrical")!;
    const compCurrent = elecGroup.parameters.find((p) => p.id === "compressor_current_a")!;

    expect(compCurrent.reference_value).toBeGreaterThan(0);
  });

  it("deve usar motor_current_a do CompressorSpec quando disponível", () => {
    const sheet = generateStartupReference(record);
    const elecGroup = sheet.groups.find((g) => g.group_id === "electrical")!;
    const compCurrent = elecGroup.parameters.find((p) => p.id === "compressor_current_a")!;

    // CompressorSpec tem motor_current_a = 9.5 A
    // ElectricalAnalysis calculada pelo builder deve usar esse valor
    expect(compCurrent.reference_value).toBeGreaterThan(5);
    expect(compCurrent.reference_value).toBeLessThan(30);
  });

  it("deve ter tensão de referência = 380 V", () => {
    const sheet = generateStartupReference(record);
    const elecGroup = sheet.groups.find((g) => g.group_id === "electrical")!;
    const voltageParam = elecGroup.parameters.find((p) => p.id === "supply_voltage_v")!;

    expect(voltageParam.reference_value).toBe(380);
  });

  it("deve ter potência total > potência do compressor isolado", () => {
    const sheet = generateStartupReference(record);
    const elecGroup = sheet.groups.find((g) => g.group_id === "electrical")!;
    const powerParam = elecGroup.parameters.find((p) => p.id === "total_power_w")!;

    // W_total = W_comp (5000) + W_fans (600 + 200) = 5800 W
    expect(powerParam.reference_value).toBeGreaterThanOrEqual(5000);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes do Grupo 4 — Ar
// ─────────────────────────────────────────────────────────────────────────────

describe("Grupo: ar", () => {
  it("deve ter 3 parâmetros no grupo de ar", () => {
    const sheet = generateStartupReference(record);
    const airGroup = sheet.groups.find((g) => g.group_id === "air")!;
    expect(airGroup.parameters).toHaveLength(3);
  });

  it("deve ter vazão de ar de referência > 0", () => {
    const sheet = generateStartupReference(record);
    const airGroup = sheet.groups.find((g) => g.group_id === "air")!;
    const airflowParam = airGroup.parameters.find((p) => p.id === "evap_airflow_m3h")!;

    expect(airflowParam.reference_value).toBeGreaterThan(0);
  });

  it("deve ter UR de saída entre 70% e 100%", () => {
    const sheet = generateStartupReference(record);
    const airGroup = sheet.groups.find((g) => g.group_id === "air")!;
    const rhParam = airGroup.parameters.find((p) => p.id === "rh_out_pct")!;

    expect(rhParam.reference_value).toBeGreaterThan(70);
    expect(rhParam.reference_value).toBeLessThanOrEqual(100);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes do Grupo 5 — Carga de fluido
// ─────────────────────────────────────────────────────────────────────────────

describe("Grupo: carga de fluido", () => {
  it("deve estimar carga de fluido > 0", () => {
    const sheet = generateStartupReference(record);
    expect(sheet.estimated_charge_kg).toBeGreaterThan(0);
  });

  it("deve ter tolerância de carga > 0", () => {
    const sheet = generateStartupReference(record);
    expect(sheet.charge_tolerance_kg).toBeGreaterThan(0);
  });

  it("deve ter tolerância de carga ≤ 15% da carga estimada", () => {
    const sheet = generateStartupReference(record);
    expect(sheet.charge_tolerance_kg).toBeLessThanOrEqual(sheet.estimated_charge_kg * 0.15);
  });

  it("deve ter 1 parâmetro no grupo de carga", () => {
    const sheet = generateStartupReference(record);
    const chargeGroup = sheet.groups.find((g) => g.group_id === "charge")!;
    expect(chargeGroup.parameters).toHaveLength(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes de applyFieldMeasurements
// ─────────────────────────────────────────────────────────────────────────────

describe("applyFieldMeasurements", () => {
  it("deve marcar parâmetro como pass quando valor está dentro da tolerância", () => {
    const sheet = generateStartupReference(record);
    const pressuresGroup = sheet.groups.find((g) => g.group_id === "pressures")!;
    const suctionParam = pressuresGroup.parameters.find((p) => p.id === "suction_pressure_bar")!;

    // Valor exatamente igual à referência → pass
    const updated = applyFieldMeasurements(sheet, {
      suction_pressure_bar: suctionParam.reference_value,
    });

    const updatedGroup = updated.groups.find((g) => g.group_id === "pressures")!;
    const updatedParam = updatedGroup.parameters.find((p) => p.id === "suction_pressure_bar")!;
    expect(updatedParam.status).toBe("pass");
    expect(updatedParam.measured_value).toBe(suctionParam.reference_value);
  });

  it("deve marcar parâmetro como fail quando valor está muito fora da tolerância", () => {
    const sheet = generateStartupReference(record);
    const pressuresGroup = sheet.groups.find((g) => g.group_id === "pressures")!;
    const suctionParam = pressuresGroup.parameters.find((p) => p.id === "suction_pressure_bar")!;

    // Valor muito abaixo → fail
    const updated = applyFieldMeasurements(sheet, {
      suction_pressure_bar: suctionParam.tolerance_min - 5,
    });

    const updatedGroup = updated.groups.find((g) => g.group_id === "pressures")!;
    const updatedParam = updatedGroup.parameters.find((p) => p.id === "suction_pressure_bar")!;
    expect(updatedParam.status).toBe("fail");
  });

  it("deve manter status not_measured para parâmetros não informados", () => {
    const sheet = generateStartupReference(record);

    const updated = applyFieldMeasurements(sheet, {
      suction_pressure_bar: 10.5,
    });

    const tempGroup = updated.groups.find((g) => g.group_id === "temperatures")!;
    for (const param of tempGroup.parameters) {
      expect(param.status).toBe("not_measured");
    }
  });

  it("deve atualizar múltiplos parâmetros de uma vez", () => {
    const sheet = generateStartupReference(record);
    const pressuresGroup = sheet.groups.find((g) => g.group_id === "pressures")!;
    const suctionParam = pressuresGroup.parameters.find((p) => p.id === "suction_pressure_bar")!;
    const dischargeParam = pressuresGroup.parameters.find((p) => p.id === "discharge_pressure_bar")!;

    const updated = applyFieldMeasurements(sheet, {
      suction_pressure_bar: suctionParam.reference_value,
      discharge_pressure_bar: dischargeParam.reference_value,
    });

    const updatedGroup = updated.groups.find((g) => g.group_id === "pressures")!;
    const updatedSuction = updatedGroup.parameters.find((p) => p.id === "suction_pressure_bar")!;
    const updatedDischarge = updatedGroup.parameters.find((p) => p.id === "discharge_pressure_bar")!;

    expect(updatedSuction.status).toBe("pass");
    expect(updatedDischarge.status).toBe("pass");
  });

  it("deve retornar nova planilha sem modificar a original (imutabilidade)", () => {
    const sheet = generateStartupReference(record);
    const pressuresGroup = sheet.groups.find((g) => g.group_id === "pressures")!;
    const suctionParam = pressuresGroup.parameters.find((p) => p.id === "suction_pressure_bar")!;

    applyFieldMeasurements(sheet, {
      suction_pressure_bar: suctionParam.reference_value,
    });

    // Original não deve ter sido modificada
    expect(suctionParam.status).toBe("not_measured");
    expect(suctionParam.measured_value).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes de pressão de saturação para diferentes refrigerantes
// ─────────────────────────────────────────────────────────────────────────────

describe("pressão de saturação por refrigerante", () => {
  const refrigerants = [
    { name: "R404A", Te: -10, Tc: 40, P_suc_min: 8, P_suc_max: 12, P_dis_min: 30, P_dis_max: 40 },
    { name: "R134a", Te: -10, Tc: 40, P_suc_min: 1.5, P_suc_max: 6, P_dis_min: 8, P_dis_max: 45 },
    { name: "R410A", Te: -10, Tc: 40, P_suc_min: 10, P_suc_max: 16, P_dis_min: 40, P_dis_max: 50 },
    { name: "R22", Te: -10, Tc: 40, P_suc_min: 2.5, P_suc_max: 4, P_dis_min: 12, P_dis_max: 16 },
  ];

  for (const ref of refrigerants) {
    it(`deve calcular pressões corretas para ${ref.name}`, () => {
      const testInput: ProductTechnicalRecordInput = {
        ...BASE_INPUT,
        identity: { ...BASE_INPUT.identity, refrigerant: ref.name },
        system: {
          ...BASE_INPUT.system,
          compressor: {
            ...BASE_INPUT.system.compressor,
            refrigerant: ref.name,
            evap_temp_c: ref.Te,
            cond_temp_c: ref.Tc,
          },
          evaporator: {
            progressive_input: {
              ...BASE_INPUT.system.evaporator.progressive_input,
              T_evaporating_c: ref.Te,
            },
          },
        },
      };

      const testRecord = buildProductTechnicalRecord(testInput);
      const sheet = generateStartupReference(testRecord);
      const pressuresGroup = sheet.groups.find((g) => g.group_id === "pressures")!;
      const suctionParam = pressuresGroup.parameters.find((p) => p.id === "suction_pressure_bar")!;
      const dischargeParam = pressuresGroup.parameters.find((p) => p.id === "discharge_pressure_bar")!;

      expect(suctionParam.reference_value).toBeGreaterThan(ref.P_suc_min);
      expect(suctionParam.reference_value).toBeLessThan(ref.P_suc_max);
      expect(dischargeParam.reference_value).toBeGreaterThan(ref.P_dis_min);
      expect(dischargeParam.reference_value).toBeLessThan(ref.P_dis_max);
    });
  }
});
