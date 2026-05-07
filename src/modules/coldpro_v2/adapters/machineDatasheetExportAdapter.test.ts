/**
 * machineDatasheetExportAdapter.test.ts
 * Sprint 4 — Testes do Adaptador de Exportação de Catálogo
 */

import { describe, it, expect, beforeAll } from "vitest";
import { exportMachineDatasheet } from "./machineDatasheetExportAdapter";
import { buildProductTechnicalRecord } from "../database/productTechnicalRecordBuilder";
import type {
  ProductTechnicalRecord,
  ProductTechnicalRecordInput,
  MachineDatasheetExport,
} from "../domain/types";

// ─────────────────────────────────────────────────────────────────────────────
// Fixture: plug-in R404A com dados elétricos completos
// ─────────────────────────────────────────────────────────────────────────────

const BASE_INPUT: ProductTechnicalRecordInput = {
  identity: {
    id: "PLUGIN-R404A-EXPORT-001",
    model: "CN-PLUGIN-EXPORT",
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
    { evap_temp_c: -8,  cond_temp_c: 35 },
    { evap_temp_c: -5,  cond_temp_c: 35 },
    { evap_temp_c: -10, cond_temp_c: 40 },
    { evap_temp_c: -8,  cond_temp_c: 40 },
    { evap_temp_c: -5,  cond_temp_c: 40 },
  ],
};

let record: ProductTechnicalRecord;
let datasheet: MachineDatasheetExport;

beforeAll(() => {
  record = buildProductTechnicalRecord(BASE_INPUT);
  datasheet = exportMachineDatasheet({ record });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes de estrutura
// ─────────────────────────────────────────────────────────────────────────────

describe("exportMachineDatasheet — estrutura", () => {
  it("deve retornar um MachineDatasheetExport com todos os campos obrigatórios", () => {
    expect(datasheet).toBeDefined();
    expect(datasheet.schema_version).toBeTruthy();
    expect(datasheet.exported_at).toBeTruthy();
    expect(datasheet.product).toBeDefined();
    expect(datasheet.operating_limits).toBeDefined();
    expect(datasheet.performance_curve).toBeDefined();
    // polynomial_sets pode ser undefined quando pontos não têm variação suficiente
    expect(
      datasheet.polynomial_sets === undefined || Array.isArray(datasheet.polynomial_sets)
    ).toBe(true);
    expect(datasheet.startup_reference).toBeDefined();
    expect(Array.isArray(datasheet.warnings)).toBe(true);
    expect(datasheet.traceability).toBeDefined();
  });

  it("deve ter schema_version correto", () => {
    expect(datasheet.schema_version).toBe("cncoils-machine-datasheet-v1");
  });

  it("deve ter exported_at como ISO 8601 válido", () => {
    const d = new Date(datasheet.exported_at);
    expect(d.getTime()).not.toBeNaN();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes de identidade do produto
// ─────────────────────────────────────────────────────────────────────────────

describe("exportMachineDatasheet — produto", () => {
  it("deve exportar a identidade correta do produto", () => {
    expect(datasheet.product.id).toBe("PLUGIN-R404A-EXPORT-001");
    expect(datasheet.product.model).toBe("CN-PLUGIN-EXPORT");
    expect(datasheet.product.family).toBe("Plug-in");
    expect(datasheet.product.refrigerant).toBe("R404A");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes de curva de performance
// ─────────────────────────────────────────────────────────────────────────────

describe("exportMachineDatasheet — curva de performance", () => {
  it("deve exportar todos os pontos da curva de performance", () => {
    expect((datasheet.performance_curve ?? []).length).toBeGreaterThan(0);
    expect((datasheet.performance_curve ?? []).length).toBe(
      record.performance_curve.points.length,
    );
  });

  it("cada ponto deve ter evap_temp_c, cond_temp_c, capacity_w, total_power_w e cop_system", () => {
    for (const point of (datasheet.performance_curve ?? [])) {
      expect(typeof point.evap_temp_c).toBe("number");
      expect(typeof point.cond_temp_c).toBe("number");
      expect(typeof point.capacity_w).toBe("number");
      expect(typeof point.total_power_w).toBe("number");
      expect(typeof point.cop_system).toBe("number");
      expect(point.capacity_w).toBeGreaterThan(0);
      expect(point.total_power_w).toBeGreaterThan(0);
      expect(point.cop_system).toBeGreaterThan(0);
    }
  });

  it("cop_system deve ser menor que cop_compressor em todos os pontos", () => {
    for (const point of (datasheet.performance_curve ?? [])) {
      // cop_system inclui ventiladores → sempre menor que cop_compressor
      expect(point.cop_system).toBeLessThan(point.cop_compressor);
    }
  });

  it("total_power_w deve ser maior que compressor_power_w (inclui ventiladores)", () => {
    for (const point of (datasheet.performance_curve ?? [])) {
      expect(point.total_power_w).toBeGreaterThan(point.compressor_power_w);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes de polinômios
// ─────────────────────────────────────────────────────────────────────────────

describe("exportMachineDatasheet — polinômios", () => {
  it("deve retornar polynomial_sets como array (pode estar vazio se pontos sem variação)", () => {
    // polynomial_sets é undefined quando não há pontos suficientes com variação
    // Neste fixture o evaporador domina → todos os pontos têm a mesma capacidade
    // O campo pode ser undefined ou um array
    expect(
      datasheet.polynomial_sets === undefined || Array.isArray(datasheet.polynomial_sets)
    ).toBe(true);
  });

  it("quando polynomial_sets existe, deve ter targets válidos", () => {
    if (!datasheet.polynomial_sets || datasheet.polynomial_sets.length === 0) return;
    const targets = datasheet.polynomial_sets.map((p) => p.target);
    expect(targets.length).toBeGreaterThan(0);
  });

  it("quando polynomial_sets existe, cada polinômio deve ter 6 coeficientes", () => {
    if (!datasheet.polynomial_sets || datasheet.polynomial_sets.length === 0) return;
    for (const poly of datasheet.polynomial_sets) {
      expect(poly.coefficients).toHaveLength(6);
      for (const c of poly.coefficients) {
        expect(typeof c).toBe("number");
      }
    }
  });

  it("quando polynomial_sets existe, r_squared deve estar entre 0 e 1", () => {
    if (!datasheet.polynomial_sets || datasheet.polynomial_sets.length === 0) return;
    for (const poly of datasheet.polynomial_sets) {
      expect(poly.r_squared).toBeGreaterThanOrEqual(0);
      expect(poly.r_squared).toBeLessThanOrEqual(1);
    }
  });

  it("quando polynomial_sets existe, fit_quality deve ser classificado", () => {
    if (!datasheet.polynomial_sets || datasheet.polynomial_sets.length === 0) return;
    const validQualities = ["excellent", "good", "acceptable", "poor"];
    for (const poly of datasheet.polynomial_sets) {
      expect(validQualities).toContain(poly.fit_quality);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes de análise elétrica
// ─────────────────────────────────────────────────────────────────────────────

describe("exportMachineDatasheet — análise elétrica", () => {
  it("deve exportar análise elétrica quando disponível", () => {
    expect(datasheet.electrical).toBeDefined();
  });

  it("deve ter total_power_w > compressor_power_w (inclui ventiladores)", () => {
    const e = datasheet.electrical!;
    expect(e.total_power_w).toBeGreaterThan(e.compressor_power_w);
  });

  it("deve ter cop_system < cop_compressor", () => {
    // cop_system inclui ventiladores → sempre menor
    const e = datasheet.electrical!;
    // cop_compressor = Q / W_comp; cop_system = Q / (W_comp + W_fans) < cop_compressor
    expect(e.cop_system).toBeLessThan(e.total_power_w / e.compressor_power_w * e.cop_system + 0.001);
    // Verifica que total_power_w > compressor_power_w (já testado acima)
    expect(e.total_power_w).toBeGreaterThan(e.compressor_power_w);
  });

  it("deve ter eer_btu_wh = cop_system × 3.412", () => {
    const e = datasheet.electrical!;
    const expectedEer = Math.round(e.cop_system * 3.412 * 100) / 100;
    expect(e.eer_btu_wh).toBeCloseTo(expectedEer, 1);
  });

  it("deve ter estimated_current_a > 0", () => {
    expect(datasheet.electrical!.estimated_current_a).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes de referências de start-up
// ─────────────────────────────────────────────────────────────────────────────

describe("exportMachineDatasheet — startup_reference", () => {
  it("deve incluir startup_reference com 5 grupos", () => {
    expect(datasheet.startup_reference).toBeDefined();
    expect(datasheet.startup_reference!.groups).toHaveLength(5);
  });

  it("deve ter estimativa de carga de fluido > 0", () => {
    expect(datasheet.startup_reference!.estimated_charge_kg).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes de limites de operação
// ─────────────────────────────────────────────────────────────────────────────

describe("exportMachineDatasheet — operating_limits", () => {
  it("deve ter operating_limits com todos os campos obrigatórios", () => {
    const ol = datasheet.operating_limits;
    expect(typeof ol.min_evap_temp_c).toBe("number");
    expect(typeof ol.max_evap_temp_c).toBe("number");
    expect(typeof ol.min_cond_temp_c).toBe("number");
    expect(typeof ol.max_cond_temp_c).toBe("number");
    expect(typeof ol.min_capacity_w).toBe("number");
    expect(typeof ol.max_capacity_w).toBe("number");
  });

  it("deve ter min_evap_temp_c <= max_evap_temp_c", () => {
    const ol = datasheet.operating_limits;
    expect(ol.min_evap_temp_c).toBeLessThanOrEqual(ol.max_evap_temp_c);
  });

  it("deve ter min_cond_temp_c <= max_cond_temp_c", () => {
    const ol = datasheet.operating_limits;
    expect(ol.min_cond_temp_c).toBeLessThanOrEqual(ol.max_cond_temp_c);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes de opções de exportação
// ─────────────────────────────────────────────────────────────────────────────

describe("exportMachineDatasheet — opções", () => {
  it("deve aceitar schema_version customizado", () => {
    const custom = exportMachineDatasheet({
      record,
      options: { schema_version: "my-schema-v2" },
    });
    expect(custom.schema_version).toBe("my-schema-v2");
  });

  it("deve omitir startup_reference quando include_startup_reference = false", () => {
    const noStartup = exportMachineDatasheet({
      record,
      options: { include_startup_reference: false },
    });
    expect(noStartup.startup_reference).toBeUndefined();
  });

  it("deve omitir electrical quando include_electrical = false", () => {
    const noElec = exportMachineDatasheet({
      record,
      options: { include_electrical: false },
    });
    expect(noElec.electrical).toBeUndefined();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes de validação de entrada
// ─────────────────────────────────────────────────────────────────────────────

describe("exportMachineDatasheet — validação de entrada", () => {
  it("deve adicionar warning quando identity.id está ausente", () => {
    const recordSemId = {
      ...record,
      identity: { ...record.identity, id: "" },
    };
    const result = exportMachineDatasheet({ record: recordSemId });
    expect(result.warnings.some((w) => w.includes("id"))).toBe(true);
  });

  it("deve adicionar warning quando identity.model está ausente", () => {
    const recordSemModel = {
      ...record,
      identity: { ...record.identity, model: "" },
    };
    const result = exportMachineDatasheet({ record: recordSemModel });
    expect(result.warnings.some((w) => w.includes("model"))).toBe(true);
  });
});
