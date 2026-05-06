/**
 * fluidPropertiesEngine.ts
 *
 * Motor de cálculo de propriedades termodinâmicas de fluidos
 * usando os polinômios do catálogo UNILAB Coils6.
 *
 * Fontes:
 *   - public/data/catalogs/fluidPolynomials.json (848 polinômios)
 *   - public/data/catalogs/thermoPhysical_full.json (195 propriedades)
 *
 * Estrutura dos polinômios:
 *   Y(T) = C0 + C1·T + C2·T² + C3·T³ + C4·T⁴ + C5·T⁵
 *   onde T é a temperatura em °C (ou pressão em bar, dependendo do IDProp)
 *
 * IDProp → Propriedade (mapeamento UNILAB):
 *   1  = Densidade líquida (kg/m³)
 *   2  = Calor específico líquido (J/kg·K)
 *   3  = Viscosidade dinâmica líquida (µPa·s → Pa·s)
 *   4  = Condutividade térmica líquida (mW/m·K → W/m·K)
 *   5  = Calor latente de vaporização (J/kg)
 *   6  = Temperatura de saturação (°C) em função da pressão (bar)
 *   7  = Pressão de saturação (bar) em função da temperatura (°C)
 *   8  = Entalpia líquida saturada (kJ/kg)
 *   9  = Entalpia vapor saturado (kJ/kg)
 *   10 = Entropia líquida saturada (kJ/kg·K)
 *   11 = Entropia vapor saturado (kJ/kg·K)
 *   12 = Densidade vapor saturado (kg/m³)
 *   13 = Calor específico vapor (J/kg·K)
 *   14 = Viscosidade dinâmica vapor (µPa·s → Pa·s)
 *   15 = Condutividade térmica vapor (mW/m·K → W/m·K)
 *
 * Mapeamento FreonID → Nome (seleção dos mais comuns):
 *   7  = R22
 *   9  = R32
 *   16 = R125
 *   18 = R134a
 *   26 = R404A (mistura)
 *   28 = R407C
 *   30 = R410A
 *   31 = R448A
 *   32 = R449A
 *   33 = R452A
 *   34 = R507A
 *   45 = R290 (propano)
 *   51 = R600a (isobutano)
 */

export interface FluidPolynomialRecord {
  fluid_id: number;
  property_id: number;
  step_id?: number;
  min_value?: number;
  max_value?: number;
  coefficients: number[];
}

export interface ThermoPhysicalRecord {
  freon_id: number;
  property_id: number;
  sub_property_id?: number;
  coefficients: number[];
}

export interface FluidProperties {
  /** Densidade líquida (kg/m³) */
  rho_liquid_kg_m3?: number;
  /** Calor específico líquido (J/kg·K) */
  cp_liquid_J_kgK?: number;
  /** Viscosidade dinâmica líquida (Pa·s) */
  mu_liquid_Pa_s?: number;
  /** Condutividade térmica líquida (W/m·K) */
  k_liquid_W_mK?: number;
  /** Calor latente de vaporização (J/kg) */
  h_fg_J_kg?: number;
  /** Pressão de saturação (bar) */
  p_sat_bar?: number;
  /** Temperatura de saturação (°C) */
  t_sat_c?: number;
  /** Entalpia líquida saturada (kJ/kg) */
  h_liquid_kJkg?: number;
  /** Entalpia vapor saturado (kJ/kg) */
  h_vapor_kJkg?: number;
  /** Densidade vapor saturado (kg/m³) */
  rho_vapor_kg_m3?: number;
  /** Calor específico vapor (J/kg·K) */
  cp_vapor_J_kgK?: number;
  /** Viscosidade dinâmica vapor (Pa·s) */
  mu_vapor_Pa_s?: number;
  /** Condutividade térmica vapor (W/m·K) */
  k_vapor_W_mK?: number;
  /** Número de Prandtl líquido */
  Pr_liquid?: number;
  /** Número de Prandtl vapor */
  Pr_vapor?: number;
  warnings: string[];
}

// Mapeamento de nome de refrigerante → FreonID UNILAB
const REFRIGERANT_ID_MAP: Record<string, number> = {
  R11: 1, R12: 2, R13: 3, R22: 7, R23: 8, R32: 9,
  R113: 10, R114: 11, R123: 13, R124: 15, R125: 16,
  R134: 17, R134a: 18, R141b: 19, R142b: 20, R143a: 21,
  R152a: 22, R170: 23, R218: 24, R227ea: 25,
  R404A: 26, R407A: 27, R407C: 28, R408A: 29, R410A: 30,
  R448A: 31, R449A: 32, R452A: 33, R507A: 34, R507: 34,
  R290: 45, R600: 50, R600a: 51,
};

// Mapeamento de IDProp → nome da propriedade
const PROP_ID_MAP: Record<number, keyof FluidProperties | null> = {
  1: "rho_liquid_kg_m3",
  2: "cp_liquid_J_kgK",
  3: "mu_liquid_Pa_s",
  4: "k_liquid_W_mK",
  5: "h_fg_J_kg",
  6: "t_sat_c",
  7: "p_sat_bar",
  8: "h_liquid_kJkg",
  9: "h_vapor_kJkg",
  12: "rho_vapor_kg_m3",
  13: "cp_vapor_J_kgK",
  14: "mu_vapor_Pa_s",
  15: "k_vapor_W_mK",
};

// Fatores de conversão para unidades SI
const UNIT_FACTORS: Record<number, number> = {
  3: 1e-6,    // µPa·s → Pa·s
  4: 1e-3,    // mW/m·K → W/m·K
  14: 1e-6,   // µPa·s → Pa·s
  15: 1e-3,   // mW/m·K → W/m·K
};

/**
 * Avalia um polinômio de grau N em um ponto x.
 * Y = C0 + C1·x + C2·x² + ... + Cn·xⁿ
 */
export function evaluatePolynomial(coefficients: number[], x: number): number {
  let result = 0;
  let xPow = 1;
  for (const c of coefficients) {
    result += c * xPow;
    xPow *= x;
  }
  return result;
}

/**
 * Encontra o segmento correto para avaliação (polinômio por partes).
 */
function findSegment(
  records: FluidPolynomialRecord[],
  fluidId: number,
  propId: number,
  x: number,
): FluidPolynomialRecord | null {
  const segments = records.filter(
    (r) => r.fluid_id === fluidId && r.property_id === propId
  );
  if (segments.length === 0) return null;
  if (segments.length === 1) return segments[0];

  // Encontrar o segmento que contém x
  for (const seg of segments) {
    const min = seg.min_value ?? -Infinity;
    const max = seg.max_value ?? Infinity;
    if (x >= min && x <= max) return seg;
  }

  // Fora de todos os segmentos: usar o mais próximo
  let best = segments[0];
  let bestDist = Infinity;
  for (const seg of segments) {
    const min = seg.min_value ?? x;
    const max = seg.max_value ?? x;
    const dist = Math.min(Math.abs(x - min), Math.abs(x - max));
    if (dist < bestDist) {
      bestDist = dist;
      best = seg;
    }
  }
  return best;
}

/**
 * Calcula as propriedades termodinâmicas de um fluido em uma temperatura.
 *
 * @param polynomials - Array de polinômios carregado do JSON
 * @param refrigerant - Nome do refrigerante (ex: "R404A")
 * @param temp_c - Temperatura de avaliação (°C)
 * @returns Propriedades calculadas
 */
export function getFluidProperties(
  polynomials: FluidPolynomialRecord[],
  refrigerant: string,
  temp_c: number,
): FluidProperties {
  const warnings: string[] = [];
  const result: FluidProperties = { warnings };

  const fluidId = REFRIGERANT_ID_MAP[refrigerant];
  if (!fluidId) {
    warnings.push(`Refrigerante ${refrigerant} não encontrado no catálogo UNILAB`);
    return result;
  }

  // Calcular cada propriedade
  for (const [propIdStr, propName] of Object.entries(PROP_ID_MAP)) {
    const propId = Number(propIdStr);
    if (!propName) continue;

    const seg = findSegment(polynomials, fluidId, propId, temp_c);
    if (!seg) continue;

    let value = evaluatePolynomial(seg.coefficients, temp_c);

    // Aplicar fator de conversão se necessário
    const factor = UNIT_FACTORS[propId];
    if (factor) value *= factor;

    if (Number.isFinite(value)) {
      (result as unknown as Record<string, unknown>)[propName] = value;
    }
  }

  // Calcular Prandtl líquido: Pr = (cp × mu) / k
  if (result.cp_liquid_J_kgK && result.mu_liquid_Pa_s && result.k_liquid_W_mK) {
    result.Pr_liquid = (result.cp_liquid_J_kgK * result.mu_liquid_Pa_s) / result.k_liquid_W_mK;
  }

  // Calcular Prandtl vapor
  if (result.cp_vapor_J_kgK && result.mu_vapor_Pa_s && result.k_vapor_W_mK) {
    result.Pr_vapor = (result.cp_vapor_J_kgK * result.mu_vapor_Pa_s) / result.k_vapor_W_mK;
  }

  return result;
}

/**
 * Retorna a lista de refrigerantes disponíveis no catálogo de polinômios.
 */
export function getAvailableRefrigerants(polynomials: FluidPolynomialRecord[]): string[] {
  const fluidIds = new Set(polynomials.map((p) => p.fluid_id));
  const available: string[] = [];
  for (const [name, id] of Object.entries(REFRIGERANT_ID_MAP)) {
    if (fluidIds.has(id)) available.push(name);
  }
  return available.sort();
}
