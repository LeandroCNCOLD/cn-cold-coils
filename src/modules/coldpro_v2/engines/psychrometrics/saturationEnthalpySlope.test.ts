import { describe, it, expect } from "vitest";
import { saturationEnthalpySlope } from "./psychrometricCore";

describe("saturationEnthalpySlope — cs(Te)", () => {
  // Valores de referência: Hyland-Wexler ASHRAE 2017 Cap. 1
  const cases = [
    { Te: -22.2, cs_expected: 1130, label: "LT nominal" },
    { Te: -10,   cs_expected: 1362, label: "LT alta temperatura" },
    { Te: -2,    cs_expected: 1682, label: "MT nominal" },
    { Te:  0,    cs_expected: 1753, label: "MT/HT fronteira" },
    { Te:  5,    cs_expected: 1970, label: "HT nominal" },
    { Te:  8,    cs_expected: 2171, label: "AGRO nominal" },
  ];

  it.each(cases)("cs($Te°C) ≈ $cs_expected J/(kg·K) — $label", ({ Te, cs_expected }) => {
    const cs = saturationEnthalpySlope(Te);
    expect(cs).toBeGreaterThan(cs_expected - 10);
    expect(cs).toBeLessThan(cs_expected + 10);
  });

  it("cs é monotonicamente crescente com a temperatura", () => {
    const temps = [-30, -20, -10, 0, 5, 10, 15];
    const values = temps.map((T) => saturationEnthalpySlope(T));
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1]!);
    }
  });

  it("cs > cp_ar (1006 J/kgK) para toda faixa de refrigeração", () => {
    const temps = [-30, -20, -10, 0, 5, 10];
    for (const T of temps) {
      expect(saturationEnthalpySlope(T)).toBeGreaterThan(1006);
    }
  });
});
