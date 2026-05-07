/**
 * startupHubService.test.ts
 * Sprint 5 — Testes do serviço e router do Hub de Start-up
 */

import { describe, it, expect } from "vitest";
import {
  compareParameterWithReference,
  resolveGroupStatus,
  resolveCommissioningStatus,
  generateCommissioningReport,
  validateCommissioningInput,
  summarizeCommissioningReport,
} from "./startupHubService";
import {
  createStartupHubHandlers,
  type StartupHubProductRegistry,
} from "./startupHubRouter";
import type {
  StartupParameter,
  StartupReferenceSheet,
  CommissioningReportInput,
  CommissioningParameterResult,
} from "../domain/types";

// ─── Fixtures ─────────────────────────────────────────────────────────────────

const PARAM_SUCTION: StartupParameter = {
  id: "suction_pressure",
  label: "Pressão de sucção",
  unit: "bar",
  reference_value: 3.2,
  tolerance_min: 2.9,
  tolerance_max: 3.5,
  measured_value: null,
  status: "not_measured",
  diagnosis_if_out_of_range: "Verificar carga de fluido ou restrição na linha de sucção.",
  measurement_instruction: "Medir com manômetro na linha de sucção do compressor.",
};

const PARAM_CURRENT: StartupParameter = {
  id: "compressor_current",
  label: "Corrente do compressor",
  unit: "A",
  reference_value: 8.4,
  tolerance_min: 7.0,
  tolerance_max: 10.2,
  measured_value: null,
  status: "not_measured",
  diagnosis_if_out_of_range: "Verificar tensão de alimentação ou condensador sujo.",
  measurement_instruction: "Medir com alicate amperímetro na fase R do compressor.",
};

const PARAM_CHARGE: StartupParameter = {
  id: "refrigerant_charge",
  label: "Carga de fluido estimada",
  unit: "kg",
  reference_value: 1.85,
  tolerance_min: 1.7,
  tolerance_max: 2.0,
  measured_value: null,
  status: "not_measured",
  diagnosis_if_out_of_range: "Carga incorreta. Verificar vazamentos e recarregar.",
  measurement_instruction: "Pesar o fluido carregado na balança de carga.",
};

const REFERENCE_SHEET: StartupReferenceSheet = {
  machine_model: "PLUG-IN-4500",
  refrigerant: "R404A",
  design_evap_temp_c: -8,
  design_cond_temp_c: 40,
  design_ambient_temp_c: 32,
  groups: [
    {
      group_id: "pressures",
      group_label: "Pressões",
      parameters: [PARAM_SUCTION],
    },
    {
      group_id: "electrical",
      group_label: "Elétrico",
      parameters: [PARAM_CURRENT],
    },
    {
      group_id: "refrigerant",
      group_label: "Fluido Refrigerante",
      parameters: [PARAM_CHARGE],
    },
  ],
  estimated_charge_kg: 1.85,
  charge_tolerance_kg: 0.15,
  warnings: [],
  generated_at: "2026-05-07T00:00:00.000Z",
};

// ─── compareParameterWithReference ───────────────────────────────────────────

describe("compareParameterWithReference", () => {
  it("retorna pass quando o valor está dentro da tolerância", () => {
    const result = compareParameterWithReference(PARAM_SUCTION, 3.2);
    expect(result.status).toBe("pass");
    expect(result.diagnosis).toBeNull();
    expect(result.measured_value).toBe(3.2);
    expect(result.deviation).toBeCloseTo(0, 2);
  });

  it("retorna pass no limite inferior da tolerância", () => {
    const result = compareParameterWithReference(PARAM_SUCTION, 2.9);
    expect(result.status).toBe("pass");
  });

  it("retorna pass no limite superior da tolerância", () => {
    const result = compareParameterWithReference(PARAM_SUCTION, 3.5);
    expect(result.status).toBe("pass");
  });

  it("retorna warning quando o desvio é pequeno mas fora da tolerância", () => {
    // 3.6 bar — ligeiramente acima do máximo (3.5), desvio ~12%
    const result = compareParameterWithReference(PARAM_SUCTION, 3.6);
    expect(result.status).toBe("warning");
    expect(result.diagnosis).toBeTruthy();
    expect(result.deviation).toBeCloseTo(0.4, 1);
  });

  it("retorna fail quando o desvio é grande", () => {
    // 1.0 bar — muito abaixo do mínimo (2.9), desvio ~69%
    const result = compareParameterWithReference(PARAM_SUCTION, 1.0);
    expect(result.status).toBe("fail");
    expect(result.diagnosis).toBeTruthy();
  });

  it("calcula deviation_pct corretamente", () => {
    const result = compareParameterWithReference(PARAM_SUCTION, 3.84); // +20% de 3.2
    expect(result.deviation_pct).toBeCloseTo(20, 0);
  });

  it("retorna os campos corretos no resultado", () => {
    const result = compareParameterWithReference(PARAM_CURRENT, 8.4);
    expect(result.parameter_id).toBe("compressor_current");
    expect(result.label).toBe("Corrente do compressor");
    expect(result.unit).toBe("A");
    expect(result.reference_value).toBe(8.4);
    expect(result.measurement_instruction).toBeTruthy();
  });
});

// ─── resolveGroupStatus ───────────────────────────────────────────────────────

describe("resolveGroupStatus", () => {
  it("retorna not_measured quando não há medições", () => {
    const results: CommissioningParameterResult[] = [
      { parameter_id: "p1", label: "P1", unit: "bar", reference_value: 3.0,
        measured_value: 0, deviation: 0, deviation_pct: 0,
        status: "not_measured", diagnosis: null, measurement_instruction: "" },
    ];
    expect(resolveGroupStatus(results)).toBe("not_measured");
  });

  it("retorna pass quando todos passam", () => {
    const results: CommissioningParameterResult[] = [
      { parameter_id: "p1", label: "P1", unit: "bar", reference_value: 3.0,
        measured_value: 3.0, deviation: 0, deviation_pct: 0,
        status: "pass", diagnosis: null, measurement_instruction: "" },
      { parameter_id: "p2", label: "P2", unit: "A", reference_value: 8.0,
        measured_value: 8.0, deviation: 0, deviation_pct: 0,
        status: "pass", diagnosis: null, measurement_instruction: "" },
    ];
    expect(resolveGroupStatus(results)).toBe("pass");
  });

  it("retorna warning quando há pelo menos um warning", () => {
    const results: CommissioningParameterResult[] = [
      { parameter_id: "p1", label: "P1", unit: "bar", reference_value: 3.0,
        measured_value: 3.0, deviation: 0, deviation_pct: 0,
        status: "pass", diagnosis: null, measurement_instruction: "" },
      { parameter_id: "p2", label: "P2", unit: "A", reference_value: 8.0,
        measured_value: 9.0, deviation: 1, deviation_pct: 12.5,
        status: "warning", diagnosis: "Verificar tensão", measurement_instruction: "" },
    ];
    expect(resolveGroupStatus(results)).toBe("warning");
  });

  it("retorna fail quando há pelo menos um fail", () => {
    const results: CommissioningParameterResult[] = [
      { parameter_id: "p1", label: "P1", unit: "bar", reference_value: 3.0,
        measured_value: 3.0, deviation: 0, deviation_pct: 0,
        status: "pass", diagnosis: null, measurement_instruction: "" },
      { parameter_id: "p2", label: "P2", unit: "A", reference_value: 8.0,
        measured_value: 15.0, deviation: 7, deviation_pct: 87.5,
        status: "fail", diagnosis: "Curto-circuito", measurement_instruction: "" },
    ];
    expect(resolveGroupStatus(results)).toBe("fail");
  });
});

// ─── resolveCommissioningStatus ───────────────────────────────────────────────

describe("resolveCommissioningStatus", () => {
  it("retorna incomplete quando menos de 50% dos parâmetros foram medidos", () => {
    const groups = [
      {
        group_id: "g1", group_label: "G1", group_status: "pass" as const,
        parameters: [
          { parameter_id: "p1", label: "P1", unit: "bar", reference_value: 3.0,
            measured_value: 3.0, deviation: 0, deviation_pct: 0,
            status: "pass" as const, diagnosis: null, measurement_instruction: "" },
        ],
      },
    ];
    // 1 medido de 10 total → < 50%
    expect(resolveCommissioningStatus(groups, 10, 1)).toBe("incomplete");
  });

  it("retorna approved quando todos passam e ≥50% medidos", () => {
    const groups = [
      {
        group_id: "g1", group_label: "G1", group_status: "pass" as const,
        parameters: [
          { parameter_id: "p1", label: "P1", unit: "bar", reference_value: 3.0,
            measured_value: 3.0, deviation: 0, deviation_pct: 0,
            status: "pass" as const, diagnosis: null, measurement_instruction: "" },
        ],
      },
    ];
    expect(resolveCommissioningStatus(groups, 1, 1)).toBe("approved");
  });

  it("retorna conditional quando há warnings mas não fails", () => {
    const groups = [
      {
        group_id: "g1", group_label: "G1", group_status: "warning" as const,
        parameters: [
          { parameter_id: "p1", label: "P1", unit: "bar", reference_value: 3.0,
            measured_value: 3.6, deviation: 0.6, deviation_pct: 20,
            status: "warning" as const, diagnosis: "Verificar", measurement_instruction: "" },
        ],
      },
    ];
    expect(resolveCommissioningStatus(groups, 1, 1)).toBe("conditional");
  });

  it("retorna rejected quando há pelo menos um fail", () => {
    const groups = [
      {
        group_id: "g1", group_label: "G1", group_status: "fail" as const,
        parameters: [
          { parameter_id: "p1", label: "P1", unit: "bar", reference_value: 3.0,
            measured_value: 1.0, deviation: -2, deviation_pct: -66.7,
            status: "fail" as const, diagnosis: "Subcarga", measurement_instruction: "" },
        ],
      },
    ];
    expect(resolveCommissioningStatus(groups, 1, 1)).toBe("rejected");
  });
});

// ─── generateCommissioningReport ─────────────────────────────────────────────

describe("generateCommissioningReport", () => {
  const BASE_INPUT: CommissioningReportInput = {
    reference_sheet: REFERENCE_SHEET,
    measurements: {
      suction_pressure: 3.2,
      compressor_current: 8.4,
      refrigerant_charge: 1.85,
    },
    serial_number: "SN-2026-001",
    technician_name: "João Silva",
    location: "Supermercado ABC - Câmara 01",
  };

  it("gera um relatório com todos os campos obrigatórios", () => {
    const report = generateCommissioningReport(BASE_INPUT);
    expect(report.report_id).toBeTruthy();
    expect(report.machine_model).toBe("PLUG-IN-4500");
    expect(report.serial_number).toBe("SN-2026-001");
    expect(report.technician_name).toBe("João Silva");
    expect(report.location).toBe("Supermercado ABC - Câmara 01");
    expect(report.commissioned_at).toBeTruthy();
    expect(report.generated_at).toBeTruthy();
  });

  it("gera status approved quando todos os parâmetros passam", () => {
    const report = generateCommissioningReport(BASE_INPUT);
    expect(report.final_status).toBe("approved");
    expect(report.summary.passed).toBe(3);
    expect(report.summary.warnings).toBe(0);
    expect(report.summary.failed).toBe(0);
  });

  it("gera status rejected quando há parâmetro com fail", () => {
    const input: CommissioningReportInput = {
      ...BASE_INPUT,
      measurements: {
        suction_pressure: 1.0, // muito baixo → fail
        compressor_current: 8.4,
        refrigerant_charge: 1.85,
      },
    };
    const report = generateCommissioningReport(input);
    expect(report.final_status).toBe("rejected");
    expect(report.summary.failed).toBeGreaterThan(0);
  });

  it("gera status conditional quando há parâmetro com warning", () => {
    const input: CommissioningReportInput = {
      ...BASE_INPUT,
      measurements: {
        suction_pressure: 3.6, // ligeiramente acima → warning
        compressor_current: 8.4,
        refrigerant_charge: 1.85,
      },
    };
    const report = generateCommissioningReport(input);
    expect(report.final_status).toBe("conditional");
    expect(report.summary.warnings).toBeGreaterThan(0);
  });

  it("gera status incomplete quando parâmetros não são medidos", () => {
    const input: CommissioningReportInput = {
      ...BASE_INPUT,
      measurements: {
        suction_pressure: 3.2,
        // compressor_current e refrigerant_charge não medidos
      },
    };
    const report = generateCommissioningReport(input);
    expect(report.final_status).toBe("incomplete");
    expect(report.summary.measured).toBe(1);
    expect(report.summary.total_parameters).toBe(3);
  });

  it("inclui diagnóstico nos parâmetros fora da faixa", () => {
    const input: CommissioningReportInput = {
      ...BASE_INPUT,
      measurements: {
        suction_pressure: 1.0, // fail
        compressor_current: 8.4,
        refrigerant_charge: 1.85,
      },
    };
    const report = generateCommissioningReport(input);
    const failParam = report.groups
      .flatMap((g) => g.parameters)
      .find((p) => p.status === "fail");
    expect(failParam?.diagnosis).toBeTruthy();
  });

  it("inclui avisos do sistema quando há parâmetros fora da faixa", () => {
    const input: CommissioningReportInput = {
      ...BASE_INPUT,
      measurements: {
        suction_pressure: 1.0, // fail
        compressor_current: 8.4,
        refrigerant_charge: 1.85,
      },
    };
    const report = generateCommissioningReport(input);
    expect(report.system_warnings.length).toBeGreaterThan(0);
  });

  it("inclui notas do técnico quando fornecidas", () => {
    const input: CommissioningReportInput = {
      ...BASE_INPUT,
      technician_notes: "Máquina instalada em local com ventilação reduzida.",
    };
    const report = generateCommissioningReport(input);
    expect(report.technician_notes).toBe("Máquina instalada em local com ventilação reduzida.");
  });

  it("gera IDs únicos para cada relatório", () => {
    const r1 = generateCommissioningReport(BASE_INPUT);
    const r2 = generateCommissioningReport(BASE_INPUT);
    expect(r1.report_id).not.toBe(r2.report_id);
  });

  it("retorna 3 grupos com os IDs corretos", () => {
    const report = generateCommissioningReport(BASE_INPUT);
    expect(report.groups).toHaveLength(3);
    const groupIds = report.groups.map((g) => g.group_id);
    expect(groupIds).toContain("pressures");
    expect(groupIds).toContain("electrical");
    expect(groupIds).toContain("refrigerant");
  });
});

// ─── validateCommissioningInput ───────────────────────────────────────────────

describe("validateCommissioningInput", () => {
  it("retorna válido com todos os campos obrigatórios", () => {
    const result = validateCommissioningInput({
      reference_sheet: REFERENCE_SHEET,
      measurements: { suction_pressure: 3.2 },
      serial_number: "SN-001",
      technician_name: "João",
      location: "Câmara 01",
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("retorna inválido quando reference_sheet está ausente", () => {
    const result = validateCommissioningInput({
      measurements: { suction_pressure: 3.2 },
      serial_number: "SN-001",
      technician_name: "João",
      location: "Câmara 01",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("reference_sheet"))).toBe(true);
  });

  it("retorna inválido quando measurements está vazio", () => {
    const result = validateCommissioningInput({
      reference_sheet: REFERENCE_SHEET,
      measurements: {},
      serial_number: "SN-001",
      technician_name: "João",
      location: "Câmara 01",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("measurements"))).toBe(true);
  });

  it("retorna inválido quando serial_number está ausente", () => {
    const result = validateCommissioningInput({
      reference_sheet: REFERENCE_SHEET,
      measurements: { suction_pressure: 3.2 },
      serial_number: "",
      technician_name: "João",
      location: "Câmara 01",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("serial_number"))).toBe(true);
  });

  it("retorna inválido quando technician_name está ausente", () => {
    const result = validateCommissioningInput({
      reference_sheet: REFERENCE_SHEET,
      measurements: { suction_pressure: 3.2 },
      serial_number: "SN-001",
      technician_name: "   ",
      location: "Câmara 01",
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes("technician_name"))).toBe(true);
  });

  it("retorna múltiplos erros quando vários campos estão ausentes", () => {
    const result = validateCommissioningInput({});
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(4);
  });
});

// ─── summarizeCommissioningReport ─────────────────────────────────────────────

describe("summarizeCommissioningReport", () => {
  it("gera um resumo textual com as informações principais", () => {
    const report = generateCommissioningReport({
      reference_sheet: REFERENCE_SHEET,
      measurements: {
        suction_pressure: 3.2,
        compressor_current: 8.4,
        refrigerant_charge: 1.85,
      },
      serial_number: "SN-001",
      technician_name: "João Silva",
      location: "Câmara 01",
    });
    const summary = summarizeCommissioningReport(report);
    expect(summary).toContain("PLUG-IN-4500");
    expect(summary).toContain("SN-001");
    expect(summary).toContain("João Silva");
    expect(summary).toContain("APROVADO");
    expect(summary).toContain("3/3");
  });
});

// ─── createStartupHubHandlers ─────────────────────────────────────────────────

describe("createStartupHubHandlers", () => {
  // Mock do registry
  const mockRegistry: StartupHubProductRegistry = {
    getByModel(model: string) {
      if (model.toUpperCase() === "PLUG-IN-4500") {
        return { startup_reference: REFERENCE_SHEET };
      }
      return undefined;
    },
  };

  const handlers = createStartupHubHandlers(mockRegistry);

  // GET /startup/:model
  describe("getStartupReference", () => {
    it("retorna a planilha de referência para um modelo válido", () => {
      const response = handlers.getStartupReference({ model: "PLUG-IN-4500" });
      expect(response.success).toBe(true);
      if (response.success) {
        expect(response.data.machine_model).toBe("PLUG-IN-4500");
        expect(response.data.groups.length).toBeGreaterThan(0);
      }
    });

    it("é case-insensitive para o modelo", () => {
      const response = handlers.getStartupReference({ model: "plug-in-4500" });
      expect(response.success).toBe(true);
    });

    it("retorna erro para modelo não encontrado", () => {
      const response = handlers.getStartupReference({ model: "MODELO-INEXISTENTE" });
      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error).toContain("não encontrado");
      }
    });

    it("retorna erro para modelo vazio", () => {
      const response = handlers.getStartupReference({ model: "" });
      expect(response.success).toBe(false);
    });
  });

  // POST /startup/:model/commissioning
  describe("postCommissioning", () => {
    it("gera relatório de comissionamento para dados válidos", () => {
      const response = handlers.postCommissioning(
        { model: "PLUG-IN-4500" },
        {
          measurements: {
            suction_pressure: 3.2,
            compressor_current: 8.4,
            refrigerant_charge: 1.85,
          },
          serial_number: "SN-001",
          technician_name: "João Silva",
          location: "Câmara 01",
        },
      );
      expect(response.success).toBe(true);
      if (response.success) {
        expect(response.data.final_status).toBe("approved");
        expect(response.data.report_id).toBeTruthy();
      }
    });

    it("retorna erro para modelo não encontrado", () => {
      const response = handlers.postCommissioning(
        { model: "INEXISTENTE" },
        {
          measurements: { suction_pressure: 3.2 },
          serial_number: "SN-001",
          technician_name: "João",
          location: "Local",
        },
      );
      expect(response.success).toBe(false);
    });

    it("retorna erro de validação quando dados estão incompletos", () => {
      const response = handlers.postCommissioning(
        { model: "PLUG-IN-4500" },
        {
          measurements: {},
          serial_number: "",
          technician_name: "",
          location: "",
        },
      );
      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.details).toBeDefined();
        expect(response.details!.length).toBeGreaterThan(0);
      }
    });
  });

  // GET /startup/:model/datasheet
  describe("getDatasheet", () => {
    it("retorna erro quando o registro não tem identity (mock sem ProductTechnicalRecord completo)", () => {
      // O mock retorna apenas startup_reference, sem identity → erro esperado
      const response = handlers.getDatasheet({ model: "PLUG-IN-4500" });
      expect(response.success).toBe(false);
      if (!response.success) {
        expect(response.error).toContain("Data sheet não disponível");
      }
    });

    it("retorna erro para modelo não encontrado", () => {
      const response = handlers.getDatasheet({ model: "INEXISTENTE" });
      expect(response.success).toBe(false);
    });
  });
});
