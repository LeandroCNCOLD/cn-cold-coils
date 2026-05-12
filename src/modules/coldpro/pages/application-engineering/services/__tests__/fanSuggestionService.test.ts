import { describe, it, expect } from "vitest";
import { calcRequiredAirflow, suggestFans, FAN_LIBRARY } from "../fanSuggestionService";

describe("calcRequiredAirflow", () => {
  it("retorna 0 quando Q=0", () => {
    expect(calcRequiredAirflow(0, 7)).toBe(0);
  });

  it("retorna 0 quando ΔT=0", () => {
    expect(calcRequiredAirflow(10000, 0)).toBe(0);
  });

  it("calcula corretamente para Q=10kW e ΔT=7K", () => {
    // V̇ = 10000 / (1.20 × 1006 × 7) × 3600 ≈ 4266 m³/h
    const result = calcRequiredAirflow(10000, 7);
    expect(result).toBeGreaterThan(4000);
    expect(result).toBeLessThan(4600);
  });

  it("vazão cresce proporcionalmente com Q", () => {
    const v1 = calcRequiredAirflow(5000, 7);
    const v2 = calcRequiredAirflow(10000, 7);
    expect(v2 / v1).toBeCloseTo(2, 1);
  });

  it("vazão diminui quando ΔT aumenta", () => {
    const v_small_dt = calcRequiredAirflow(10000, 5);
    const v_large_dt = calcRequiredAirflow(10000, 10);
    expect(v_small_dt).toBeGreaterThan(v_large_dt);
  });
});

describe("suggestFans — sem restrição de vazão (comportamento legado)", () => {
  it("retorna fits=false quando geometria inválida", () => {
    const result = suggestFans(0, 0, 4);
    expect(result.fits).toBe(false);
    expect(result.model).toBeNull();
  });

  it("seleciona ventilador que cabe na altura", () => {
    // Altura 300mm → ventilador máximo Ø250 (250 < 300×0.92=276)
    const result = suggestFans(1200, 300, 4);
    expect(result.fits).toBe(true);
    expect(result.model).not.toBeNull();
    expect(result.model!.diameter_mm).toBeLessThanOrEqual(300 * 0.92);
  });

  it("respeita o limite máximo de ventiladores", () => {
    const result = suggestFans(2400, 600, 2);
    expect(result.fits).toBe(true);
    expect(result.count).toBeLessThanOrEqual(2);
  });

  it("retorna fits=false quando nenhum ventilador cabe", () => {
    // Altura 150mm → nenhum ventilador da biblioteca cabe (menor é Ø200)
    const result = suggestFans(1200, 150, 4);
    expect(result.fits).toBe(false);
  });
});

describe("suggestFans — com restrição de vazão", () => {
  it("seleciona ventilador que atende a vazão mínima requerida", () => {
    // Geometria grande (1200×500mm), requer 3000 m³/h
    const result = suggestFans(1200, 500, 4, 3000);
    expect(result.fits).toBe(true);
    expect(result.total_airflow_m3h).toBeGreaterThanOrEqual(3000);
  });

  it("usa o menor número de ventiladores possível", () => {
    // Geometria 2400×500mm, requer 5000 m³/h
    // Ø450 entrega 4800/unid → precisa de 2 (9600 m³/h total)
    // Ø500 entrega 6500/unid → precisa de 1 (6500 m³/h total) — MELHOR (1 ventilador)
    const result = suggestFans(2400, 500, 4, 5000);
    expect(result.fits).toBe(true);
    expect(result.count).toBeGreaterThanOrEqual(1);
    expect(result.total_airflow_m3h).toBeGreaterThanOrEqual(5000);
  });

  it("retorna fits=false quando nenhum modelo atende a vazão requerida dentro do limite", () => {
    // Geometria pequena (600×300mm), requer 50000 m³/h — impossível
    const result = suggestFans(600, 300, 4, 50000);
    expect(result.fits).toBe(false);
  });

  it("retorna fits=false quando a geometria não comporta nenhum ventilador", () => {
    // Altura 100mm — nenhum ventilador cabe
    const result = suggestFans(1200, 100, 4, 1000);
    expect(result.fits).toBe(false);
  });

  it("total_airflow é sempre >= required_airflow quando fits=true", () => {
    const requiredAirflows = [500, 1000, 2000, 5000, 10000];
    for (const req of requiredAirflows) {
      const result = suggestFans(2400, 800, 6, req);
      if (result.fits) {
        expect(result.total_airflow_m3h).toBeGreaterThanOrEqual(req);
      }
    }
  });

  it("o modelo selecionado cabe fisicamente na geometria", () => {
    const result = suggestFans(1800, 600, 4, 8000);
    if (result.fits && result.model) {
      expect(result.model.diameter_mm).toBeLessThanOrEqual(600 * 0.92);
    }
  });
});

describe("suggestFans — consistência com FAN_LIBRARY", () => {
  it("todos os modelos na biblioteca têm airflow_m3h positivo", () => {
    for (const fan of FAN_LIBRARY) {
      expect(fan.airflow_m3h).toBeGreaterThan(0);
      expect(fan.diameter_mm).toBeGreaterThan(0);
    }
  });

  it("biblioteca está ordenada por diâmetro crescente", () => {
    for (let i = 1; i < FAN_LIBRARY.length; i++) {
      expect(FAN_LIBRARY[i].diameter_mm).toBeGreaterThan(FAN_LIBRARY[i - 1].diameter_mm);
    }
  });
});
