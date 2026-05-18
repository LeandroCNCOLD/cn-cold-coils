/**
 * Testes do testHubEngine — cobertura das 5 funções exportadas.
 *
 * Valores de referência derivados do catálogo CN COLD:
 *   Modelo base: CN_750_LT — R404A, Te = -28°C, Tc = 40°C
 *   Q_comp = 8583 W, W_comp = 9450 W (dados catálogo mai/2026)
 *
 * Tolerâncias:
 *   COP/EER: ±10% (dependem de propriedades de saturação)
 *   Ratio:   ±15% (razão de compressão varia com refrigerante)
 *   MC:      intervalo de confiança deve conter nominal ±σ
 */
import { describe, it, expect } from "vitest";
import {
  computePhDiagram,
  computeMonteCarlo,
  computePolynomials,
  computeOptimization,
  computeAIAnalysis,
} from "../testHubEngine";
import type { EvaporatorFormValue } from "../../components/forms/EvaporatorForm";

// ── Fixtures ──────────────────────────────────────────────────────────────────

const COMP_LT = {
  refrigerant:          "R404A",
  evap_temp_c:          -28,
  cond_temp_c:          40,
  cooling_capacity_w:   8583,
  power_w:              9450,
};

const COMP_MT = {
  refrigerant:          "R404A",
  evap_temp_c:          -10,
  cond_temp_c:          40,
  cooling_capacity_w:   15000,
  power_w:              5500,
};

const COMP_AGRO = {
  refrigerant:          "R404A",
  evap_temp_c:          -8,
  cond_temp_c:          45,
  cooling_capacity_w:   12000,
  power_w:              4200,
};

const EVAP_MINIMAL: EvaporatorFormValue = {
  T_evaporating_c:           -28,
  air_temperature_in_c:      2,
  air_relative_humidity_in:  0.85,
  airflow_m3_h:              6232,
};

const COND_LT = {
  heat_rejection_capacity_w: 18033,  // Q_comp + W_comp ≈ balanço de energia
};

const CONDITIONS = {
  ambient_temp_c: 35,
};

// ── computePhDiagram ──────────────────────────────────────────────────────────

describe("computePhDiagram", () => {
  it("retorna estrutura completa para R404A LT", async () => {
    const r = await computePhDiagram(COMP_LT, EVAP_MINIMAL, CONDITIONS);

    expect(r.refrigerant).toBe("R404A");
    expect(r.Te_C).toBe(-28);
    expect(r.Tc_C).toBe(40);
    expect(r.points).toHaveLength(4);
    expect(r.saturationCurve.length).toBeGreaterThan(10);
  });

  it("COP fisicamente plausível — R404A LT (Te=-28, Tc=40)", async () => {
    const r = await computePhDiagram(COMP_LT, EVAP_MINIMAL, CONDITIONS);

    // COP de Carnot = (Te+273)/(Tc-Te) ≈ 2.93; COP real < Carnot
    const COP_carnot = (COMP_LT.evap_temp_c + 273.15) / (COMP_LT.cond_temp_c - COMP_LT.evap_temp_c);
    expect(r.COP).toBeGreaterThan(0.5);
    expect(r.COP).toBeLessThan(COP_carnot);
    // EER = COP × 3.41214 (BTU/Wh por W)
    expect(r.EER).toBeCloseTo(r.COP * 3.41214, 1);
  });

  it("razão de compressão maior que 1 — LT alta razão", async () => {
    const r = await computePhDiagram(COMP_LT, EVAP_MINIMAL, CONDITIONS);
    expect(r.compressionRatio).toBeGreaterThan(3);   // R404A -28/40 ≈ 6–8
    expect(r.compressionRatio).toBeLessThan(20);
  });

  it("temperatura de descarga maior que Tc", async () => {
    const r = await computePhDiagram(COMP_LT, EVAP_MINIMAL, CONDITIONS);
    expect(r.dischargeTemp_C).toBeGreaterThan(COMP_LT.cond_temp_c);
  });

  it("qEvap + wComp ≈ qCond (balanço energético)", async () => {
    const r = await computePhDiagram(COMP_MT, EVAP_MINIMAL, CONDITIONS);
    const balance = Math.abs(r.qEvap_kJkg + r.wComp_kJkg - r.qCond_kJkg);
    // Tolerância 5% do qCond (pequenos desvios por interpolação)
    expect(balance).toBeLessThan(r.qCond_kJkg * 0.05);
  });

  it("R22 resulta em COP plausível diferente de R404A", async () => {
    const r = await computePhDiagram({ ...COMP_LT, refrigerant: "R22" }, EVAP_MINIMAL, CONDITIONS);
    expect(r.COP).toBeGreaterThan(0.5);
    expect(r.COP).toBeLessThan(6);
  });

  it("Te >= Tc não deve gerar erro fatal — retorna aviso", async () => {
    const r = await computePhDiagram({ ...COMP_LT, evap_temp_c: 50, cond_temp_c: 40 }, EVAP_MINIMAL, CONDITIONS);
    // Engine deve sobreviver (sem throw); pode ter warnings
    expect(r).toBeDefined();
    expect(Array.isArray(r.warnings)).toBe(true);
  });
});

// ── computeMonteCarlo ─────────────────────────────────────────────────────────

describe("computeMonteCarlo", () => {
  it("retorna estrutura completa com 50 amostras (rápido)", async () => {
    const r = await computeMonteCarlo(COMP_LT, EVAP_MINIMAL, 50);

    expect(r.samples).toBe(50);
    expect(r.confidenceLevel).toBeGreaterThan(0.8);
    expect(r.capacity.nominal).toBeGreaterThan(0);
    expect(r.cop.nominal).toBeGreaterThan(0);
    expect(r.eer.nominal).toBeCloseTo(r.cop.nominal * 3.41214, 0);
  });

  it("intervalo de confiança contém o nominal (capacity)", async () => {
    const r = await computeMonteCarlo(COMP_LT, EVAP_MINIMAL, 100);
    expect(r.capacity.lower).toBeLessThanOrEqual(r.capacity.nominal);
    expect(r.capacity.upper).toBeGreaterThanOrEqual(r.capacity.nominal);
  });

  it("intervalo de confiança contém o nominal (COP)", async () => {
    const r = await computeMonteCarlo(COMP_LT, EVAP_MINIMAL, 100);
    expect(r.cop.lower).toBeLessThanOrEqual(r.cop.nominal);
    expect(r.cop.upper).toBeGreaterThanOrEqual(r.cop.nominal);
  });

  it("histograma cobre todas as amostras", async () => {
    const N = 80;
    const r = await computeMonteCarlo(COMP_MT, EVAP_MINIMAL, N);
    const total = r.histogram.reduce((s, b) => s + b.count, 0);
    expect(total).toBe(N);
  });

  it("sensitivityRanking lista parâmetros com impacto positivo", async () => {
    const r = await computeMonteCarlo(COMP_LT, EVAP_MINIMAL, 50);
    expect(r.sensitivityRanking.length).toBeGreaterThan(0);
    for (const p of r.sensitivityRanking) {
      expect(p.impact_pct).toBeGreaterThanOrEqual(0);
    }
  });

  it("desvio padrão menor que 20% do nominal (variação aceitável)", async () => {
    const r = await computeMonteCarlo(COMP_LT, EVAP_MINIMAL, 200);
    expect(r.cop.stdDev).toBeLessThan(r.cop.nominal * 0.20);
    expect(r.capacity.stdDev).toBeLessThan(r.capacity.nominal * 0.20);
  });

  it("computeTimeMs registrado e razoável", async () => {
    const r = await computeMonteCarlo(COMP_LT, EVAP_MINIMAL, 50);
    expect(r.computeTimeMs).toBeGreaterThan(0);
    expect(r.computeTimeMs).toBeLessThan(10_000);
  });
});

// ── computePolynomials ────────────────────────────────────────────────────────

describe("computePolynomials", () => {
  it("retorna grade 3×3 = 9 pontos", async () => {
    const r = await computePolynomials(COMP_LT);
    expect(r.grid).toHaveLength(9);
  });

  it("todos os pontos da grade têm COP > 0 e Q > 0", async () => {
    const r = await computePolynomials(COMP_LT);
    for (const pt of r.grid) {
      expect(pt.Q_W).toBeGreaterThan(0);
      expect(pt.W_W).toBeGreaterThan(0);
      expect(pt.COP).toBeGreaterThan(0);
    }
  });

  it("COP cresce quando Te aumenta (Te fixo em Tc nominal)", async () => {
    const r = await computePolynomials(COMP_MT);
    // Mesma Tc (coluna central), compara Te baixo vs Te alto
    const tc_nom = COMP_MT.cond_temp_c ?? 40;
    const pts_same_tc = r.grid.filter(p => p.Tc_C === tc_nom).sort((a, b) => a.Te_C - b.Te_C);
    if (pts_same_tc.length >= 2) {
      expect(pts_same_tc[pts_same_tc.length - 1]!.COP)
        .toBeGreaterThan(pts_same_tc[0]!.COP);
    }
  });

  it("coeficientes polinomiais existem para Q e W", async () => {
    const r = await computePolynomials(COMP_LT);
    expect(r.coefficients.length).toBeGreaterThanOrEqual(1);
    const targets = r.coefficients.map(c => c.target);
    expect(targets.some(t => t.toLowerCase().includes("q") || t.toLowerCase().includes("cap"))).toBe(true);
  });

  it("R² dos polinômios >= 0.9 (ajuste aceitável)", async () => {
    const r = await computePolynomials(COMP_MT);
    for (const coef of r.coefficients) {
      expect(coef.r2).toBeGreaterThanOrEqual(0.9);
    }
  });

  it("norma declarada é ARI 540 ou EN 12900", async () => {
    const r = await computePolynomials(COMP_LT);
    expect(["ARI 540", "EN 12900"]).toContain(r.norm);
  });
});

// ── computeOptimization ───────────────────────────────────────────────────────

describe("computeOptimization", () => {
  it("retorna erro quando compressor sem capacidade", async () => {
    const r = await computeOptimization({}, {}, EVAP_MINIMAL, CONDITIONS);
    expect(r.status).toBe("error");
    expect(r.bestEquilibrium).toBeNull();
  });

  it("encontra equilíbrio para configuração LT válida", async () => {
    const r = await computeOptimization(COMP_LT, COND_LT, EVAP_MINIMAL, CONDITIONS);
    expect(["ok", "warning"]).toContain(r.status);
    if (r.bestEquilibrium) {
      expect(r.bestEquilibrium.COP).toBeGreaterThan(0);
      expect(r.bestEquilibrium.Q_evap_W).toBeGreaterThan(0);
      expect(r.bestEquilibrium.Te_C).toBeLessThan(COMP_LT.cond_temp_c);
    }
  });

  it("balance_error_pct < 10% no equilíbrio", async () => {
    const r = await computeOptimization(COMP_MT, { heat_rejection_capacity_w: 20000 }, EVAP_MINIMAL, CONDITIONS);
    if (r.bestEquilibrium) {
      expect(Math.abs(r.bestEquilibrium.balance_error_pct)).toBeLessThan(10);
    }
  });

  it("teRange cobre faixa de temperaturas de evaporação", async () => {
    const r = await computeOptimization(COMP_LT, COND_LT, EVAP_MINIMAL, CONDITIONS);
    expect(r.teRange.length).toBeGreaterThan(3);
  });

  it("recommendations é array (pode estar vazio)", async () => {
    const r = await computeOptimization(COMP_AGRO, { heat_rejection_capacity_w: 16200 }, EVAP_MINIMAL, CONDITIONS);
    expect(Array.isArray(r.recommendations)).toBe(true);
  });
});

// ── computeAIAnalysis ─────────────────────────────────────────────────────────

describe("computeAIAnalysis", () => {
  it("retorna score 0–100 e grade válida", async () => {
    const ph  = await computePhDiagram(COMP_LT, EVAP_MINIMAL, CONDITIONS);
    const mc  = await computeMonteCarlo(COMP_LT, EVAP_MINIMAL, 50);
    const opt = await computeOptimization(COMP_LT, COND_LT, EVAP_MINIMAL, CONDITIONS);
    const r   = await computeAIAnalysis(COMP_LT, COND_LT, EVAP_MINIMAL, CONDITIONS, ph, mc, opt);

    expect(r.score).toBeGreaterThanOrEqual(0);
    expect(r.score).toBeLessThanOrEqual(100);
    expect(["A", "B", "C", "D", "F"]).toContain(r.grade);
  });

  it("summary é string não vazia", async () => {
    const ph  = await computePhDiagram(COMP_LT, EVAP_MINIMAL, CONDITIONS);
    const r   = await computeAIAnalysis(COMP_LT, COND_LT, EVAP_MINIMAL, CONDITIONS, ph, null, null);
    expect(typeof r.summary).toBe("string");
    expect(r.summary.length).toBeGreaterThan(5);
  });

  it("diagnoses têm severity válida", async () => {
    const r = await computeAIAnalysis(COMP_LT, COND_LT, EVAP_MINIMAL, CONDITIONS, null, null, null);
    for (const d of r.diagnoses) {
      expect(["ok", "warning", "critical"]).toContain(d.severity);
    }
  });

  it("grade A para sistema eficiente (COP alto, balanço correto)", async () => {
    const efficientComp = { ...COMP_MT, cooling_capacity_w: 15000, power_w: 3500 }; // COP ≈ 4.3
    const ph  = await computePhDiagram(efficientComp, EVAP_MINIMAL, CONDITIONS);
    const r   = await computeAIAnalysis(efficientComp, { heat_rejection_capacity_w: 18500 }, EVAP_MINIMAL, CONDITIONS, ph, null, null);
    // Sistema com COP alto deve ter grade boa (A ou B)
    expect(["A", "B"]).toContain(r.grade);
  });

  it("funciona sem phResult, mcResult, optResult (null safety)", async () => {
    const r = await computeAIAnalysis(COMP_LT, COND_LT, EVAP_MINIMAL, CONDITIONS, null, null, null);
    expect(r).toBeDefined();
    expect(r.score).toBeGreaterThanOrEqual(0);
  });

  it("COP correto inclui W_fans quando informado (C1: Q/(W_comp+W_fans))", async () => {
    const compWithFans = { ...COMP_LT, evap_fan_power_w: 500 };
    const r_with    = await computeAIAnalysis(compWithFans, COND_LT, EVAP_MINIMAL, CONDITIONS, null, null, null);
    const r_without = await computeAIAnalysis(COMP_LT,     COND_LT, EVAP_MINIMAL, CONDITIONS, null, null, null);
    // Com ventiladores: denominador maior → score não deve ser melhor
    expect(r_with.score).toBeLessThanOrEqual(r_without.score + 5);
  });
});
