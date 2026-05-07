/**
 * Testes Vitest — Sprint 7: Ponte Workspace → Hub
 */

import { describe, it, expect } from "vitest";
import { mapWorkspaceToHub } from "../adapters/workspaceToHubMapper";
import type { WorkspaceProjectData } from "../adapters/workspaceToHubMapper";

// ─── Fixture base ─────────────────────────────────────────────────────────────

const BASE_WORKSPACE: WorkspaceProjectData = {
  workspace_id: "WS-001",
  workspace_model: "EVA-12000",
  workspace_type: "evaporator",
  coil: {
    tube_outer_diameter_mm: 9.52,
    tube_inner_diameter_mm: 8.8,
    tube_pitch_transverse_mm: 25.4,
    tube_pitch_longitudinal_mm: 22.0,
    fin_height_mm: 25.4,
    fin_thickness_mm: 0.1,
    coil_width_m: 1.0,
    coil_height_m: 0.5,
    tube_material: "copper",
    fin_material: "aluminum",
    rolls: [{ fin_spacing_mm: 4.0, rows_in_roll: 4 }],
  },
  air: {
    air_temperature_in_c: 2,
    air_relative_humidity_in: 0.9,
    air_mass_flow_kg_s: 2.5,
  },
  refrigeration: {
    T_evaporating_c: -8,
    T_condensing_c: 38,
    refrigerant: "R404A",
    compressor_capacity_w: 12000,
    compressor_power_w: 4000,
    condenser_heat_rejection_w: 16000,
  },
  fan: {
    airflow_m3_h: 7200,
    available_static_pressure_pa: 50,
    motor_power_w: 370,
  },
  ambient_temp_c: 35,
};

// ─── Testes de sucesso ────────────────────────────────────────────────────────

describe("Sprint 7 — mapWorkspaceToHub: mapeamento bem-sucedido", () => {
  it("deve retornar success: true com dados completos", () => {
    const result = mapWorkspaceToHub(BASE_WORKSPACE);
    expect(result.success).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.payload).toBeDefined();
  });

  it("deve preservar workspace_id e workspace_model no payload", () => {
    const result = mapWorkspaceToHub(BASE_WORKSPACE);
    expect(result.payload!.workspace_id).toBe("WS-001");
    expect(result.payload!.workspace_model).toBe("EVA-12000");
    expect(result.payload!.workspace_type).toBe("evaporator");
  });

  it("deve incluir mapped_at como ISO string válida", () => {
    const result = mapWorkspaceToHub(BASE_WORKSPACE);
    const date = new Date(result.payload!.mapped_at);
    expect(date.getTime()).not.toBeNaN();
  });

  it("deve mapear SystemComponentsInput corretamente", () => {
    const result = mapWorkspaceToHub(BASE_WORKSPACE);
    const sys = result.payload!.system_components;

    expect(sys.compressor.cooling_capacity_w).toBe(12000);
    expect(sys.compressor.power_w).toBe(4000);
    expect(sys.compressor.refrigerant).toBe("R404A");
    expect(sys.compressor.evap_temp_c).toBe(-8);
    expect(sys.compressor.cond_temp_c).toBe(38);

    expect(sys.condenser.heat_rejection_capacity_w).toBe(16000);
    expect(sys.condenser.max_cond_temp_c).toBe(43); // 38 + 5

    expect(sys.evaporator.progressive_input.tube_outer_diameter_mm).toBe(9.52);
    expect(sys.evaporator.progressive_input.rolls).toHaveLength(1);
    expect(sys.evaporator.progressive_input.T_evaporating_c).toBe(-8);
  });

  it("deve mapear FanSpec quando fornecido", () => {
    const result = mapWorkspaceToHub(BASE_WORKSPACE);
    const fan = result.payload!.system_components.evaporator_fan;
    expect(fan).toBeDefined();
    expect(fan!.airflow_m3_h).toBe(7200);
    expect(fan!.available_static_pressure_pa).toBe(50);
    expect(fan!.motor_power_w).toBe(370);
  });

  it("deve calcular MachineSpec com COP correto", () => {
    const result = mapWorkspaceToHub(BASE_WORKSPACE);
    const spec = result.payload!.machine_spec!;
    // nominal_power = compressor_power + fan_power = 4000 + 370 = 4370
    expect(spec.nominal_power_w).toBe(4370);
    // COP = 12000 / 4370 ≈ 2.745
    expect(spec.nominal_cop).toBeCloseTo(12000 / 4370, 2);
    expect(spec.nominal_capacity_w).toBe(12000);
    expect(spec.model).toBe("EVA-12000");
  });

  it("deve usar ambient_temp_c fornecido nas condições do sistema", () => {
    const result = mapWorkspaceToHub(BASE_WORKSPACE);
    expect(result.payload!.system_components.system_conditions.ambient_temp_c).toBe(35);
  });
});

describe("Sprint 7 — mapWorkspaceToHub: sem ventilador", () => {
  it("deve funcionar sem dados de ventilador", () => {
    const dataWithoutFan: WorkspaceProjectData = {
      ...BASE_WORKSPACE,
      fan: undefined,
    };
    const result = mapWorkspaceToHub(dataWithoutFan);
    expect(result.success).toBe(true);
    expect(result.payload!.system_components.evaporator_fan).toBeUndefined();
    // Deve ter warning sobre fan ausente
    expect(result.warnings.some(w => w.includes("ventilador"))).toBe(true);
  });

  it("deve calcular COP sem ventilador (apenas compressor)", () => {
    const dataWithoutFan: WorkspaceProjectData = {
      ...BASE_WORKSPACE,
      fan: undefined,
    };
    const result = mapWorkspaceToHub(dataWithoutFan);
    const spec = result.payload!.machine_spec!;
    // COP = 12000 / 4000 = 3.0
    expect(spec.nominal_cop).toBeCloseTo(3.0, 2);
  });
});

describe("Sprint 7 — mapWorkspaceToHub: validações de erro", () => {
  it("deve retornar erro para workspace_id vazio", () => {
    const data: WorkspaceProjectData = { ...BASE_WORKSPACE, workspace_id: "" };
    const result = mapWorkspaceToHub(data);
    expect(result.success).toBe(false);
    expect(result.errors.some(e => e.includes("workspace_id"))).toBe(true);
  });

  it("deve retornar erro para workspace_model vazio", () => {
    const data: WorkspaceProjectData = { ...BASE_WORKSPACE, workspace_model: "" };
    const result = mapWorkspaceToHub(data);
    expect(result.success).toBe(false);
    expect(result.errors.some(e => e.includes("workspace_model"))).toBe(true);
  });

  it("deve retornar erro para rolls vazio", () => {
    const data: WorkspaceProjectData = {
      ...BASE_WORKSPACE,
      coil: { ...BASE_WORKSPACE.coil, rolls: [] },
    };
    const result = mapWorkspaceToHub(data);
    expect(result.success).toBe(false);
    expect(result.errors.some(e => e.includes("rolls"))).toBe(true);
  });

  it("deve retornar erro para T_evap >= T_cond", () => {
    const data: WorkspaceProjectData = {
      ...BASE_WORKSPACE,
      refrigeration: {
        ...BASE_WORKSPACE.refrigeration,
        T_evaporating_c: 40,
        T_condensing_c: 38,
      },
    };
    const result = mapWorkspaceToHub(data);
    expect(result.success).toBe(false);
    expect(result.errors.some(e => e.includes("T_evaporating_c"))).toBe(true);
  });

  it("deve retornar erro para air_mass_flow_kg_s <= 0", () => {
    const data: WorkspaceProjectData = {
      ...BASE_WORKSPACE,
      air: { ...BASE_WORKSPACE.air, air_mass_flow_kg_s: 0 },
    };
    const result = mapWorkspaceToHub(data);
    expect(result.success).toBe(false);
    expect(result.errors.some(e => e.includes("air_mass_flow_kg_s"))).toBe(true);
  });
});

describe("Sprint 7 — mapWorkspaceToHub: tipos de workspace", () => {
  it("deve aceitar workspace_type agro", () => {
    const data: WorkspaceProjectData = { ...BASE_WORKSPACE, workspace_type: "agro" };
    const result = mapWorkspaceToHub(data);
    expect(result.success).toBe(true);
    expect(result.payload!.workspace_type).toBe("agro");
  });

  it("deve aceitar workspace_type condenser", () => {
    const data: WorkspaceProjectData = { ...BASE_WORKSPACE, workspace_type: "condenser" };
    const result = mapWorkspaceToHub(data);
    expect(result.success).toBe(true);
    expect(result.payload!.workspace_type).toBe("condenser");
  });
});
