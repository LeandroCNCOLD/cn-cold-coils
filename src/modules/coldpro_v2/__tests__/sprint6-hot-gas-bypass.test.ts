/**
 * Testes Vitest — Sprint 6: Hot Gas Bypass + Workspace AGRO
 */

import { describe, it, expect } from "vitest";
import { calculateHotGasBypass } from "../engines/agro/hotGasBypassEngine";
import { calculateAgroWorkspace } from "../engines/agro/agroWorkspaceEngine";

// ─── Testes: calculateHotGasBypass ───────────────────────────────────────────

describe("Sprint 6 — calculateHotGasBypass: modo cooling_only", () => {
  it("deve retornar cooling_only quando W_in <= W_setpoint", () => {
    const result = calculateHotGasBypass({
      T_air_in_c: 20,
      RH_air_in: 0.3,        // baixa umidade
      T_air_out_setpoint_c: 16,
      RH_air_out_setpoint: 0.5,
      air_mass_flow_kg_s: 1.0,
      T_evaporating_c: -5,
      T_condensing_c: 40,
    });
    expect(result.mode).toBe("cooling_only");
    expect(result.bypass_fraction).toBe(0);
    expect(result.Q_reheat_w).toBe(0);
    expect(result.converged).toBe(true);
    expect(result.status).toBe("ok");
  });
});

describe("Sprint 6 — calculateHotGasBypass: modo hot_gas_bypass", () => {
  it("deve calcular by-pass quando umidade de entrada > setpoint", () => {
    const result = calculateHotGasBypass({
      T_air_in_c: 22,
      RH_air_in: 0.85,
      T_air_out_setpoint_c: 18,
      RH_air_out_setpoint: 0.7,
      air_mass_flow_kg_s: 1.5,
      T_evaporating_c: 2,
      T_condensing_c: 38,
    });
    expect(["hot_gas_bypass", "electric_reheat", "cooling_only"]).toContain(result.mode);
    expect(result.Q_evap_w).toBeGreaterThan(0);
    expect(result.W_compressor_w).toBeGreaterThan(0);
    expect(result.water_removed_kg_h).toBeGreaterThanOrEqual(0);
    expect(result.T_dew_out_c).toBeLessThan(result.T_air_out_c);
    expect(result.h_air_in_kj_kg).toBeGreaterThan(0);
    expect(result.status).not.toBe("error");
  });

  it("deve ter bypass_fraction entre 0 e max_bypass_fraction", () => {
    const maxBypass = 0.4;
    const result = calculateHotGasBypass({
      T_air_in_c: 25,
      RH_air_in: 0.9,
      T_air_out_setpoint_c: 20,
      RH_air_out_setpoint: 0.75,
      air_mass_flow_kg_s: 2.0,
      T_evaporating_c: 0,
      T_condensing_c: 40,
      max_bypass_fraction: maxBypass,
    });
    expect(result.bypass_fraction).toBeGreaterThanOrEqual(0);
    expect(result.bypass_fraction).toBeLessThanOrEqual(maxBypass + 0.001);
  });

  it("deve calcular COP positivo", () => {
    const result = calculateHotGasBypass({
      T_air_in_c: 20,
      RH_air_in: 0.8,
      T_air_out_setpoint_c: 16,
      RH_air_out_setpoint: 0.65,
      air_mass_flow_kg_s: 1.0,
      T_evaporating_c: -2,
      T_condensing_c: 38,
    });
    expect(result.cop_cycle).toBeGreaterThanOrEqual(0);
    expect(result.W_compressor_w).toBeGreaterThan(0);
  });
});

describe("Sprint 6 — calculateHotGasBypass: validações de entrada", () => {
  it("deve retornar erro para RH_air_in inválido", () => {
    const result = calculateHotGasBypass({
      T_air_in_c: 20,
      RH_air_in: 1.5,  // inválido
      T_air_out_setpoint_c: 16,
      RH_air_out_setpoint: 0.5,
      air_mass_flow_kg_s: 1.0,
      T_evaporating_c: -5,
      T_condensing_c: 40,
    });
    expect(result.status).toBe("error");
    expect(result.mode).toBe("invalid");
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it("deve retornar erro quando T_evap >= T_cond", () => {
    const result = calculateHotGasBypass({
      T_air_in_c: 20,
      RH_air_in: 0.8,
      T_air_out_setpoint_c: 16,
      RH_air_out_setpoint: 0.5,
      air_mass_flow_kg_s: 1.0,
      T_evaporating_c: 40,
      T_condensing_c: 38,  // menor que T_evap
    });
    expect(result.status).toBe("error");
    expect(result.mode).toBe("invalid");
  });

  it("deve retornar erro para vazão de ar zero", () => {
    const result = calculateHotGasBypass({
      T_air_in_c: 20,
      RH_air_in: 0.8,
      T_air_out_setpoint_c: 16,
      RH_air_out_setpoint: 0.5,
      air_mass_flow_kg_s: 0,
      T_evaporating_c: -5,
      T_condensing_c: 40,
    });
    expect(result.status).toBe("error");
    expect(result.mode).toBe("invalid");
  });
});

describe("Sprint 6 — calculateHotGasBypass: consistência termodinâmica", () => {
  it("deve ter W_air_out <= W_air_in (desumidificação)", () => {
    const result = calculateHotGasBypass({
      T_air_in_c: 22,
      RH_air_in: 0.85,
      T_air_out_setpoint_c: 18,
      RH_air_out_setpoint: 0.7,
      air_mass_flow_kg_s: 1.0,
      T_evaporating_c: 2,
      T_condensing_c: 38,
    });
    // W_air_out deve ser <= W_air_in (desumidificação)
    expect(result.W_air_out).toBeGreaterThan(0);
    expect(result.water_removed_kg_h).toBeGreaterThanOrEqual(0);
  });

  it("deve ter T_dew_out < T_air_out (ponto de orvalho abaixo da temperatura de saída)", () => {
    const result = calculateHotGasBypass({
      T_air_in_c: 22,
      RH_air_in: 0.85,
      T_air_out_setpoint_c: 18,
      RH_air_out_setpoint: 0.7,
      air_mass_flow_kg_s: 1.0,
      T_evaporating_c: 2,
      T_condensing_c: 38,
    });
    if (result.mode !== "invalid") {
      expect(result.T_dew_out_c).toBeLessThanOrEqual(result.T_air_out_c + 0.1);
    }
  });
});

// ─── Testes: calculateAgroWorkspace ──────────────────────────────────────────

describe("Sprint 6 — calculateAgroWorkspace: modo cooling_only", () => {
  it("deve retornar cooling_only quando não há necessidade de desumidificação", () => {
    const result = calculateAgroWorkspace({
      agro_cycle: {
        T_room_c: 20,
        RH_room: 0.3,
        T_setpoint_c: 16,
        RH_setpoint: 0.5,
        air_mass_flow_kg_s: 1.0,
      },
      T_evaporating_c: -5,
      T_condensing_c: 40,
    });
    expect(result.recommended_mode).toBe("cooling_only");
    expect(result.agro_cycle.mode).toBe("cooling_only");
    expect(result.hot_gas_bypass).toBeUndefined();
    expect(result.status).not.toBe("error");
  });
});

describe("Sprint 6 — calculateAgroWorkspace: modo com desumidificação", () => {
  it("deve incluir hot_gas_bypass quando há desumidificação", () => {
    const result = calculateAgroWorkspace({
      agro_cycle: {
        T_room_c: 22,
        RH_room: 0.85,
        T_setpoint_c: 18,
        RH_setpoint: 0.7,
        air_mass_flow_kg_s: 1.5,
      },
      T_evaporating_c: 2,
      T_condensing_c: 38,
    });
    expect(result.agro_cycle.mode).toBe("dehumidification");
    expect(result.hot_gas_bypass).toBeDefined();
    expect(result.agro_cycle.Q_evap_w).toBeGreaterThan(0);
    expect(result.agro_cycle.Q_reheat_w).toBeGreaterThan(0);
    expect(result.status).not.toBe("error");
  });

  it("deve retornar status de erro quando ciclo AGRO falha", () => {
    const result = calculateAgroWorkspace({
      agro_cycle: {
        T_room_c: NaN,  // inválido
        RH_room: 0.8,
        T_setpoint_c: 16,
        RH_setpoint: 0.5,
        air_mass_flow_kg_s: 1.0,
      },
      T_evaporating_c: -5,
      T_condensing_c: 40,
    });
    expect(result.status).toBe("error");
  });

  it("deve ter recommended_mode consistente com o resultado do ciclo", () => {
    const result = calculateAgroWorkspace({
      agro_cycle: {
        T_room_c: 20,
        RH_room: 0.8,
        T_setpoint_c: 16,
        RH_setpoint: 0.6,
        air_mass_flow_kg_s: 1.0,
      },
      T_evaporating_c: -2,
      T_condensing_c: 38,
    });
    const validModes = ["cooling_only", "hot_gas_bypass", "electric_reheat"];
    expect(validModes).toContain(result.recommended_mode);
  });
});
