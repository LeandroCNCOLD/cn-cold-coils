import { describe, expect, it } from "vitest";
import { calculateWangChiChang } from "../wangChiChang";

const BASE_PARAMS = {
  tubeOdMm: 9.52,
  finThicknessMm: 0.12,
  finPitchMm: 2.5,
  rowPitchMm: 21.65,
  tubePitchMm: 25,
  numberOfRows: 4,
  airFaceVelocityMs: 2.5,
};

describe("calculateWangChiChang — Reynolds range handling", () => {
  it("Wang-Chi-Chang Re=7500 — sem warning (dentro da faixa estendida)", () => {
    const result = calculateWangChiChang({
      ...BASE_PARAMS,
      Re: 7500,
      Pr: 0.72,
    });

    expect(
      result.warnings.filter((warning) => warning.includes("fora da faixa")),
    ).toHaveLength(0);
  });

  it("Wang-Chi-Chang Re=200 — aviso de laminar", () => {
    const result = calculateWangChiChang({
      ...BASE_PARAMS,
      Re: 200,
      Pr: 0.72,
    });

    expect(
      result.warnings.some(
        (warning) => warning.includes("laminar") || warning.includes("fora"),
      ),
    ).toBe(true);
    expect(result.hAirWm2K).toBeGreaterThan(0);
  });
});

import { rich1975 } from "../wangChiChang";

describe("rich1975 — condensador CN 750 LT", () => {
  it("h_ar deve estar entre 70 e 120 W/(m²·K) para geometria CN 750 LT @ Va=2.96 m/s", () => {
    // Geometria real: Do=9.52mm, Pt=25.4mm, Pl=22mm, Fp=2.1mm, N=4, Va=2.96 m/s, T_ar=35°C
    const result = rich1975({
      finType: "plain",
      D_o: 0.00952,
      P_t: 0.0254,
      P_l: 0.022,
      F_p: 0.0021,
      N: 4,
      V_face: 2.96,
      T_air_C: 35,
    });
    // Com C=0.083 calibrado, h_ar esperado ≈ 60 W/(m²·K) para CN 750 LT
    expect(result.h_air_W_m2K).toBeGreaterThan(50);
    expect(result.h_air_W_m2K).toBeLessThan(75);
    expect(result.correlation).toBe("Rich-1975-plain-condenser");
  });

  it("h_ar deve ser maior que Wang-Chi-Chang para Fp=2.1mm (condensador típico)", () => {
    // Rich deve dar h_ar > WCC para Fp pequeno (condensador)
    const richResult = rich1975({
      finType: "plain",
      D_o: 0.00952,
      P_t: 0.0254,
      P_l: 0.022,
      F_p: 0.0021,
      N: 4,
      V_face: 2.96,
      T_air_C: 35,
    });
    const wccResult = calculateWangChiChang({
      tubeOdMm: 9.52,
      finThicknessMm: 0.12,
      finPitchMm: 2.1,
      rowPitchMm: 22,
      tubePitchMm: 25.4,
      numberOfRows: 4,
      airFaceVelocityMs: 2.96,
    });
    expect(richResult.h_air_W_m2K).toBeGreaterThan(wccResult.hAirWm2K);
  });
});
