import { describe, it, expect, vi, beforeEach } from "vitest";
import * as coilSizingModule from "../coilSizingService";
import { autoSizeEvaporator, autoSizeCondenser } from "../autoSizingService";

// Mock sizeCoil: capacity_w cresce linearmente com filas e comprimento
// Isso isola o autoSizingService do motor de cálculo para testar só a orquestração
const mockSizeCoil = vi.spyOn(coilSizingModule, "sizeCoil").mockImplementation((input) => {
  const rows = input.geometry?.rows ?? 1;
  const length = input.geometry?.length_mm ?? 300;
  const airflow = input.airflow_m3h ?? 1000;
  // Simulação simples: 0.004 W por mm de comprimento por fila, proporcional à vazão
  const capacity_w = rows * length * 4 * (airflow / 5000);
  return {
    capacity_w,
    exchange_area_m2: rows * length * 0.001,
    u_w_m2k: 35,
    lmtd_k: 8,
    fin_efficiency: 0.85,
    air_pressure_drop_pa: rows * 15,
    fluid_pressure_drop_kpa: 1,
    fluid_velocity_ms: 0.5,
    warnings: [],
  };
});

beforeEach(() => {
  mockSizeCoil.mockClear();
});

const BASE_EVAP_INPUT = {
  tubesPerRow: 12,
  tubeOuterDiameterMm: 9.52,
  startLengthMm: 1000,
  finPitchMm: 7,
  totalAirflowM3H: 5000,
  requiredCapacityW: 9560,
  te_c: -30,
  t_air_in_c: -23,
};

const BASE_COND_INPUT = {
  tubesPerRow: 20,
  tubeOuterDiameterMm: 9.52,
  startLengthMm: 1000,
  finPitchMm: 2,
  totalAirflowM3H: 5000,
  heatRejectionW: 9560,
  tc_c: 50,
  t_ambient_c: 30,
};

describe("autoSizeEvaporator", () => {
  it("encontra configuração que atende Q_req de 9.56 kW", () => {
    // Com mock: 2 filas × 1200mm × 4 W/mm × (5000/5000) = 9600 W > 9560 * 0.98 ✓
    const result = autoSizeEvaporator(BASE_EVAP_INPUT);
    expect(result.selected).not.toBeNull();
    expect(result.selected!.meetsRequirement).toBe(true);
    expect(result.selected!.capacityW).toBeGreaterThanOrEqual(9560 * 0.98);
  });

  it("retorna selected=null quando Q_req impossível de atender", () => {
    const result = autoSizeEvaporator({
      ...BASE_EVAP_INPUT,
      totalAirflowM3H: 100,
      requiredCapacityW: 500_000,
    });
    expect(result.selected).toBeNull();
    expect(result.message).toContain("Nenhuma configuração");
  });

  it("retorna lista de candidatos testados", () => {
    const result = autoSizeEvaporator(BASE_EVAP_INPUT);
    expect(result.candidates.length).toBeGreaterThan(0);
    for (const c of result.candidates) {
      expect(c.rows).toBeGreaterThan(0);
      expect(c.lengthMm).toBeGreaterThanOrEqual(300);
    }
  });

  it("respeita o comprimento mínimo de 300 mm", () => {
    const result = autoSizeEvaporator({ ...BASE_EVAP_INPUT, startLengthMm: 50 });
    for (const c of result.candidates) {
      expect(c.lengthMm).toBeGreaterThanOrEqual(300);
    }
  });

  it("inclui requiredW no resultado", () => {
    const result = autoSizeEvaporator(BASE_EVAP_INPUT);
    expect(result.requiredW).toBe(9560);
  });
});

describe("autoSizeCondenser", () => {
  it("encontra configuração para Q_rej de 9.56 kW", () => {
    const result = autoSizeCondenser(BASE_COND_INPUT);
    expect(result.selected).not.toBeNull();
    expect(result.selected!.meetsRequirement).toBe(true);
    expect(result.selected!.heatRejectionW).toBeGreaterThanOrEqual(9560 * 0.98);
  });

  it("retorna selected=null quando Q_rej impossível", () => {
    const result = autoSizeCondenser({
      ...BASE_COND_INPUT,
      totalAirflowM3H: 50,
      heatRejectionW: 1_000_000,
    });
    expect(result.selected).toBeNull();
  });

  it("retorna lista de candidatos para condensador", () => {
    const result = autoSizeCondenser(BASE_COND_INPUT);
    expect(result.candidates.length).toBeGreaterThan(0);
  });
});
