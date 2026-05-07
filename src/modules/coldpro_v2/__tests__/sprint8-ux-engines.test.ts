/**
 * Testes Vitest — Sprint 8: UX Engines (Sensibilidade, Semáforo, Wizard)
 */

import { describe, it, expect } from "vitest";
import {
  calculateSensitivityAnalysis,
  calculateMultiParameterSensitivity,
} from "../engines/analysis/sensitivityAnalysisEngine";
import { calculateQualitySemaphore } from "../engines/analysis/qualitySemaphoreEngine";
import {
  buildWizardConfig,
  validateWizardStep,
  getStepIndex,
  getWizardProgress,
} from "../engines/wizard/wizardConfigEngine";

// ─── Testes: calculateSensitivityAnalysis ────────────────────────────────────

describe("Sprint 8 — sensitivityAnalysisEngine: análise básica", () => {
  it("deve gerar N pontos para temperatura de evaporação", () => {
    const result = calculateSensitivityAnalysis({
      parameter: "evap_temp_c",
      nominal_value: -5,
      range: 10,
      n_points: 11,
      nominal_capacity_w: 10000,
      nominal_cop: 2.5,
      nominal_power_w: 4000,
    });
    expect(result.parameter).toBe("evap_temp_c");
    expect(result.points).toHaveLength(11);
    expect(result.nominal_value).toBe(-5);
    expect(result.warnings).toHaveLength(0);
  });

  it("deve ter ponto central com delta_pct ≈ 0", () => {
    const result = calculateSensitivityAnalysis({
      parameter: "evap_temp_c",
      nominal_value: -5,
      range: 10,
      n_points: 11,
      nominal_capacity_w: 10000,
      nominal_cop: 2.5,
      nominal_power_w: 4000,
    });
    const centerIndex = 5; // ponto central de 11 pontos
    expect(result.points[centerIndex].delta_capacity_pct).toBeCloseTo(0, 1);
    expect(result.points[centerIndex].parameter_value).toBeCloseTo(-5, 1);
  });

  it("deve ter capacidade crescente com aumento de T_evap", () => {
    const result = calculateSensitivityAnalysis({
      parameter: "evap_temp_c",
      nominal_value: -5,
      range: 10,
      n_points: 5,
      nominal_capacity_w: 10000,
      nominal_cop: 2.5,
      nominal_power_w: 4000,
    });
    // T_evap maior → capacidade maior
    const first = result.points[0].capacity_w;
    const last = result.points[4].capacity_w;
    expect(last).toBeGreaterThan(first);
  });

  it("deve ter capacidade decrescente com aumento de T_cond", () => {
    const result = calculateSensitivityAnalysis({
      parameter: "cond_temp_c",
      nominal_value: 40,
      range: 10,
      n_points: 5,
      nominal_capacity_w: 10000,
      nominal_cop: 2.5,
      nominal_power_w: 4000,
    });
    // T_cond maior → capacidade menor
    const first = result.points[0].capacity_w;
    const last = result.points[4].capacity_w;
    expect(last).toBeLessThan(first);
  });

  it("deve retornar erro para range <= 0", () => {
    const result = calculateSensitivityAnalysis({
      parameter: "evap_temp_c",
      nominal_value: -5,
      range: 0,
      nominal_capacity_w: 10000,
      nominal_cop: 2.5,
      nominal_power_w: 4000,
    });
    expect(result.points).toHaveLength(0);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it("deve identificar parâmetros dominantes corretamente", () => {
    const result = calculateSensitivityAnalysis({
      parameter: "evap_temp_c",
      nominal_value: -5,
      range: 10,
      nominal_capacity_w: 10000,
      nominal_cop: 2.5,
      nominal_power_w: 4000,
    });
    // evap_temp_c tem sensitivity_capacity = 3.0 > 2.0 → is_dominant = true
    expect(result.is_dominant).toBe(true);
  });

  it("deve calcular sensibilidade de subcooling como não dominante", () => {
    const result = calculateSensitivityAnalysis({
      parameter: "subcooling_k",
      nominal_value: 5,
      range: 6,
      nominal_capacity_w: 10000,
      nominal_cop: 2.5,
      nominal_power_w: 4000,
    });
    // subcooling_k tem sensitivity_capacity = 0.5 < 2.0 → is_dominant = false
    expect(result.is_dominant).toBe(false);
  });
});

describe("Sprint 8 — calculateMultiParameterSensitivity", () => {
  it("deve identificar parâmetro dominante entre múltiplos", () => {
    const result = calculateMultiParameterSensitivity([
      {
        parameter: "evap_temp_c",
        nominal_value: -5,
        range: 10,
        nominal_capacity_w: 10000,
        nominal_cop: 2.5,
        nominal_power_w: 4000,
      },
      {
        parameter: "subcooling_k",
        nominal_value: 5,
        range: 6,
        nominal_capacity_w: 10000,
        nominal_cop: 2.5,
        nominal_power_w: 4000,
      },
    ]);
    expect(result.dominant_parameter).toBe("evap_temp_c");
    expect(result.results).toHaveLength(2);
  });

  it("deve retornar null para lista vazia", () => {
    const result = calculateMultiParameterSensitivity([]);
    expect(result.dominant_parameter).toBeNull();
    expect(result.results).toHaveLength(0);
  });
});

// ─── Testes: calculateQualitySemaphore ───────────────────────────────────────

describe("Sprint 8 — qualitySemaphoreEngine: classificação verde", () => {
  it("deve classificar como verde quando desvios são pequenos", () => {
    const result = calculateQualitySemaphore({
      simulated_capacity_w: 10200,
      catalog_capacity_w: 10000,
      simulated_cop: 2.55,
      catalog_cop: 2.5,
      simulated_power_w: 4100,
      catalog_power_w: 4000,
    });
    expect(result.capacity_level).toBe("green");
    expect(result.cop_level).toBe("green");
    expect(result.power_level).toBe("green");
    expect(result.overall_level).toBe("green");
  });

  it("deve calcular delta_pct correto para capacidade", () => {
    const result = calculateQualitySemaphore({
      simulated_capacity_w: 10500,
      catalog_capacity_w: 10000,
      simulated_cop: 2.5,
      catalog_cop: 2.5,
      simulated_power_w: 4000,
      catalog_power_w: 4000,
    });
    expect(result.capacity_delta_pct).toBeCloseTo(5.0, 1);
    expect(result.capacity_level).toBe("green"); // exatamente no limite
  });
});

describe("Sprint 8 — qualitySemaphoreEngine: classificação amarela", () => {
  it("deve classificar como amarelo para desvio moderado", () => {
    const result = calculateQualitySemaphore({
      simulated_capacity_w: 10800,
      catalog_capacity_w: 10000,
      simulated_cop: 2.5,
      catalog_cop: 2.5,
      simulated_power_w: 4000,
      catalog_power_w: 4000,
    });
    expect(result.capacity_level).toBe("yellow");
    expect(result.capacity_delta_pct).toBeCloseTo(8.0, 1);
  });
});

describe("Sprint 8 — qualitySemaphoreEngine: classificação vermelha", () => {
  it("deve classificar como vermelho para desvio grande", () => {
    const result = calculateQualitySemaphore({
      simulated_capacity_w: 12000,
      catalog_capacity_w: 10000,
      simulated_cop: 2.5,
      catalog_cop: 2.5,
      simulated_power_w: 4000,
      catalog_power_w: 4000,
    });
    expect(result.capacity_level).toBe("red");
    expect(result.overall_level).toBe("red");
    expect(result.capacity_delta_pct).toBeCloseTo(20.0, 1);
  });

  it("deve ter overall_level = red quando qualquer parâmetro é red", () => {
    const result = calculateQualitySemaphore({
      simulated_capacity_w: 10200,
      catalog_capacity_w: 10000,
      simulated_cop: 1.5,  // muito abaixo
      catalog_cop: 2.5,
      simulated_power_w: 4100,
      catalog_power_w: 4000,
    });
    expect(result.overall_level).toBe("red");
    expect(result.cop_level).toBe("red");
  });
});

describe("Sprint 8 — qualitySemaphoreEngine: thresholds customizados", () => {
  it("deve usar thresholds customizados", () => {
    const result = calculateQualitySemaphore({
      simulated_capacity_w: 10800,
      catalog_capacity_w: 10000,
      simulated_cop: 2.5,
      catalog_cop: 2.5,
      simulated_power_w: 4000,
      catalog_power_w: 4000,
      thresholds: { green_pct: 10, yellow_pct: 20 },
    });
    // 8% < 10% → verde com thresholds customizados
    expect(result.capacity_level).toBe("green");
  });
});

describe("Sprint 8 — qualitySemaphoreEngine: diagnósticos", () => {
  it("deve gerar diagnóstico textual para cada parâmetro", () => {
    const result = calculateQualitySemaphore({
      simulated_capacity_w: 10200,
      catalog_capacity_w: 10000,
      simulated_cop: 2.55,
      catalog_cop: 2.5,
      simulated_power_w: 4100,
      catalog_power_w: 4000,
    });
    expect(result.capacity_diagnosis.length).toBeGreaterThan(10);
    expect(result.cop_diagnosis.length).toBeGreaterThan(10);
    expect(result.power_diagnosis.length).toBeGreaterThan(10);
    expect(result.overall_diagnosis.length).toBeGreaterThan(10);
  });
});

// ─── Testes: wizardConfigEngine ───────────────────────────────────────────────

describe("Sprint 8 — wizardConfigEngine: buildWizardConfig", () => {
  it("deve gerar 7 passos para perfil design", () => {
    const config = buildWizardConfig("design");
    expect(config.total_steps).toBe(7);
    expect(config.steps).toHaveLength(7);
    expect(config.profile).toBe("design");
  });

  it("deve gerar 7 passos para perfil sales", () => {
    const config = buildWizardConfig("sales");
    expect(config.total_steps).toBe(7);
    expect(config.profile).toBe("sales");
  });

  it("deve gerar 7 passos para perfil production", () => {
    const config = buildWizardConfig("production");
    expect(config.total_steps).toBe(7);
    expect(config.profile).toBe("production");
  });

  it("deve ter encadeamento correto de next_step e prev_step", () => {
    const config = buildWizardConfig("design");
    const steps = config.steps;

    // Primeiro passo não tem prev
    expect(steps[0].prev_step).toBeNull();
    // Último passo não tem next
    expect(steps[steps.length - 1].next_step).toBeNull();

    // Encadeamento intermediário
    for (let i = 1; i < steps.length - 1; i++) {
      expect(steps[i].prev_step).toBe(steps[i - 1].id);
      expect(steps[i].next_step).toBe(steps[i + 1].id);
    }
  });

  it("deve ter IDs corretos na sequência", () => {
    const config = buildWizardConfig("design");
    const ids = config.steps.map((s) => s.id);
    expect(ids[0]).toBe("application");
    expect(ids[ids.length - 1]).toBe("review");
  });

  it("deve ter campos obrigatórios diferentes por perfil", () => {
    const design = buildWizardConfig("design");
    const sales = buildWizardConfig("sales");

    const designRefrigerant = design.steps.find((s) => s.id === "refrigerant")!;
    const salesRefrigerant = sales.steps.find((s) => s.id === "refrigerant")!;

    // Design exige mais campos que sales
    expect(designRefrigerant.required_fields.length).toBeGreaterThan(
      salesRefrigerant.required_fields.length,
    );
  });
});

describe("Sprint 8 — wizardConfigEngine: validateWizardStep", () => {
  it("deve validar passo com todos os campos preenchidos", () => {
    const result = validateWizardStep(
      "application",
      "design",
      ["application_type", "ambient_temp_c", "required_capacity_w"],
    );
    expect(result.is_valid).toBe(true);
    expect(result.can_advance).toBe(true);
    expect(result.missing_required).toHaveLength(0);
  });

  it("deve falhar quando campos obrigatórios estão ausentes", () => {
    const result = validateWizardStep(
      "application",
      "design",
      ["application_type"],  // faltam ambient_temp_c e required_capacity_w
    );
    expect(result.is_valid).toBe(false);
    expect(result.can_advance).toBe(false);
    expect(result.missing_required.length).toBeGreaterThan(0);
    expect(result.missing_required).toContain("ambient_temp_c");
  });

  it("deve retornar erro para step_id inválido", () => {
    const result = validateWizardStep(
      "nonexistent_step" as any,
      "design",
      [],
    );
    expect(result.is_valid).toBe(false);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it("deve aceitar passo review sem campos obrigatórios", () => {
    const result = validateWizardStep("review", "design", []);
    expect(result.is_valid).toBe(true);
    expect(result.can_advance).toBe(true);
  });
});

describe("Sprint 8 — wizardConfigEngine: getStepIndex e getWizardProgress", () => {
  it("deve retornar índice correto para cada passo", () => {
    expect(getStepIndex("application")).toBe(0);
    expect(getStepIndex("refrigerant")).toBe(1);
    expect(getStepIndex("review")).toBe(6);
  });

  it("deve retornar -1 para passo inexistente", () => {
    expect(getStepIndex("nonexistent" as any)).toBe(-1);
  });

  it("deve calcular progresso percentual correto", () => {
    expect(getWizardProgress("application", 7)).toBe(14); // 1/7 ≈ 14%
    expect(getWizardProgress("review", 7)).toBe(100);     // 7/7 = 100%
  });

  it("deve retornar 0 para passo inexistente no progresso", () => {
    expect(getWizardProgress("nonexistent" as any, 7)).toBe(0);
  });
});
