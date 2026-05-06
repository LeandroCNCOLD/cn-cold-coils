/**
 * fluidPropertiesService.ts
 *
 * Serviço unificado de propriedades termodinâmicas de fluidos.
 *
 * Estratégia de resolução (em ordem de prioridade):
 *   1. Polinômios UNILAB (fluidPolynomials.json) — mais precisos, 848 registros
 *   2. Tabelas estáticas do simulatorCore — fallback para os 8 refrigerantes comuns
 *
 * Os polinômios UNILAB são carregados de forma lazy (sob demanda) e cacheados
 * em memória para evitar múltiplas requisições HTTP.
 *
 * Uso:
 *   const props = await getFluidPropertiesAsync("R404A", -10);
 *   // ou, se os polinômios já foram carregados:
 *   const props = getFluidPropertiesSync("R404A", -10, cachedPolynomials);
 */

import {
  type FluidPolynomialRecord,
  type FluidProperties,
  getFluidProperties,
  evaluatePolynomial,
} from "../engines/fluidPropertiesEngine";

// ── Cache de polinômios ───────────────────────────────────────────────────────
let _polynomialsCache: FluidPolynomialRecord[] | null = null;
let _loadPromise: Promise<FluidPolynomialRecord[]> | null = null;

const POLYNOMIALS_URL = "/data/catalogs/fluidPolynomials.json";

async function loadPolynomials(): Promise<FluidPolynomialRecord[]> {
  if (_polynomialsCache) return _polynomialsCache;
  if (_loadPromise) return _loadPromise;

  _loadPromise = (async () => {
    const res = await fetch(POLYNOMIALS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status} ao carregar fluidPolynomials.json`);
    const data = (await res.json()) as FluidPolynomialRecord[];
    _polynomialsCache = data;
    return data;
  })();

  return _loadPromise;
}

/**
 * Injeta polinômios pré-carregados no cache (para uso em testes ou SSR).
 */
export function injectPolynomials(polynomials: FluidPolynomialRecord[]): void {
  _polynomialsCache = polynomials;
}

/**
 * Retorna os polinômios cacheados (null se ainda não carregados).
 */
export function getCachedPolynomials(): FluidPolynomialRecord[] | null {
  return _polynomialsCache;
}

// ── Tabelas de fallback (8 refrigerantes comuns) ──────────────────────────────
// Formato: [T_°C, rho kg/m³, mu µPa·s, cp J/(kg·K), k mW/(m·K), Pr, h_fg kJ/kg]
const FALLBACK_TABLES: Record<string, number[][]> = {
  R404A: [
    [-40,1235,310,1340,90.0,4.62,218],[-30,1195,275,1370,86.0,4.38,208],
    [-20,1153,245,1400,82.0,4.18,197],[-10,1108,218,1440,78.0,4.02,185],
    [0,1060,194,1490,74.0,3.90,172],[10,1008,172,1560,70.0,3.84,157],
    [20,950,152,1650,65.0,3.86,140],[30,883,133,1790,60.0,3.96,120],
    [40,800,114,2010,54.0,4.24,95],
  ],
  R410A: [
    [-40,1280,270,1480,106.0,3.77,240],[-30,1240,238,1510,101.0,3.56,229],
    [-20,1196,210,1540,96.0,3.37,217],[-10,1149,185,1580,91.0,3.21,204],
    [0,1099,163,1630,86.0,3.09,189],[10,1044,143,1700,80.0,3.04,172],
    [20,982,124,1800,74.0,3.02,153],[30,910,106,1950,67.0,3.08,131],
    [40,824,88,2200,59.0,3.27,104],
  ],
  R22: [
    [-40,1283,350,1100,110.0,3.50,234],[-30,1247,305,1115,105.0,3.24,224],
    [-20,1209,268,1130,100.0,3.02,213],[-10,1169,236,1150,95.0,2.86,201],
    [0,1127,208,1175,90.0,2.72,187],[10,1082,183,1210,85.0,2.61,172],
    [20,1033,161,1255,79.0,2.56,155],[30,978,140,1320,73.0,2.53,135],
    [40,916,120,1420,66.0,2.58,111],
  ],
  R134a: [
    [-40,1294,420,1260,97.0,5.46,204],[-30,1261,360,1275,93.0,4.93,196],
    [-20,1226,310,1290,89.0,4.49,187],[-10,1189,268,1310,85.0,4.13,177],
    [0,1150,232,1340,81.0,3.83,166],[10,1108,200,1380,77.0,3.58,154],
    [20,1063,172,1430,72.0,3.42,140],[30,1013,147,1500,67.0,3.29,124],
    [40,957,124,1600,62.0,3.20,105],
  ],
  R407C: [
    [-40,1237,340,1380,96.0,4.88,228],[-30,1197,298,1400,92.0,4.53,218],
    [-20,1155,262,1430,88.0,4.25,207],[-10,1110,230,1465,83.0,4.06,195],
    [0,1062,202,1510,79.0,3.86,181],[10,1010,177,1570,74.0,3.75,166],
    [20,952,154,1660,68.0,3.75,149],[30,886,132,1800,62.0,3.83,129],
    [40,808,111,2020,55.0,4.08,105],
  ],
  R290: [
    [-40,556,210,2300,118.0,4.09,420],[-30,540,188,2340,112.0,3.93,405],
    [-20,523,168,2390,106.0,3.79,389],[-10,505,150,2450,100.0,3.68,371],
    [0,486,133,2520,94.0,3.56,352],[10,466,118,2620,87.0,3.55,330],
    [20,444,104,2750,80.0,3.58,306],[30,420,90,2940,73.0,3.62,278],
    [40,393,77,3230,65.0,3.82,246],
  ],
  R448A: [
    [-40,1230,295,1360,90.0,4.45,222],[-30,1191,260,1385,86.0,4.19,212],
    [-20,1150,228,1415,82.0,3.94,201],[-10,1107,200,1450,78.0,3.72,189],
    [0,1060,175,1495,74.0,3.54,176],[10,1009,153,1555,69.0,3.45,161],
    [20,952,132,1640,64.0,3.38,144],[30,887,113,1780,58.0,3.47,124],
    [40,810,95,2000,52.0,3.65,99],
  ],
  R507A: [
    [-40,1230,295,1360,90.0,4.45,222],[-30,1191,260,1385,86.0,4.19,212],
    [-20,1150,228,1415,82.0,3.94,201],[-10,1107,200,1450,78.0,3.72,189],
    [0,1060,175,1495,74.0,3.54,176],[10,1009,153,1555,69.0,3.45,161],
    [20,952,132,1640,64.0,3.38,144],[30,887,113,1780,58.0,3.47,124],
    [40,810,95,2000,52.0,3.65,99],
  ],
};

function interpolateFallback(table: number[][], T: number, col: number): number {
  if (T <= table[0][0]) return table[0][col];
  if (T >= table[table.length - 1][0]) return table[table.length - 1][col];
  for (let i = 0; i < table.length - 1; i++) {
    const T0 = table[i][0], T1 = table[i + 1][0];
    if (T >= T0 && T <= T1) {
      const frac = (T - T0) / (T1 - T0);
      return table[i][col] + frac * (table[i + 1][col] - table[i][col]);
    }
  }
  return table[table.length - 1][col];
}

function getFallbackProperties(refrigerant: string, temp_c: number): FluidProperties | null {
  const key = refrigerant.replace(/^REF_/i, "").replace(/-/g, "").toUpperCase();
  const table = FALLBACK_TABLES[key] ?? FALLBACK_TABLES[refrigerant];
  if (!table) return null;

  const rho = interpolateFallback(table, temp_c, 1);
  const mu = interpolateFallback(table, temp_c, 2) * 1e-6;
  const cp = interpolateFallback(table, temp_c, 3);
  const k = interpolateFallback(table, temp_c, 4) * 1e-3;
  const Pr = interpolateFallback(table, temp_c, 5);
  const h_fg = interpolateFallback(table, temp_c, 6) * 1e3;

  return {
    rho_liquid_kg_m3: rho,
    mu_liquid_Pa_s: mu,
    cp_liquid_J_kgK: cp,
    k_liquid_W_mK: k,
    Pr_liquid: Pr,
    h_fg_J_kg: h_fg,
    warnings: [`Usando tabela estática de fallback para ${refrigerant}`],
  };
}

// ── API Pública ───────────────────────────────────────────────────────────────

/**
 * Calcula propriedades de fluido de forma síncrona.
 * Requer que os polinômios já estejam carregados via loadPolynomials().
 *
 * @param refrigerant - Nome do refrigerante (ex: "R404A")
 * @param temp_c - Temperatura (°C)
 * @param polynomials - Polinômios pré-carregados (opcional; usa cache se disponível)
 */
export function getFluidPropertiesSync(
  refrigerant: string,
  temp_c: number,
  polynomials?: FluidPolynomialRecord[],
): FluidProperties {
  const polys = polynomials ?? _polynomialsCache;

  if (polys && polys.length > 0) {
    const props = getFluidProperties(polys, refrigerant, temp_c);
    if (props.rho_liquid_kg_m3 || props.h_fg_J_kg) {
      return props;
    }
  }

  // Fallback para tabelas estáticas
  const fallback = getFallbackProperties(refrigerant, temp_c);
  if (fallback) return fallback;

  return {
    warnings: [`Propriedades de ${refrigerant} não disponíveis em ${temp_c}°C`],
  };
}

/**
 * Calcula propriedades de fluido de forma assíncrona.
 * Carrega os polinômios automaticamente se necessário.
 *
 * @param refrigerant - Nome do refrigerante (ex: "R404A")
 * @param temp_c - Temperatura (°C)
 */
export async function getFluidPropertiesAsync(
  refrigerant: string,
  temp_c: number,
): Promise<FluidProperties> {
  try {
    const polynomials = await loadPolynomials();
    return getFluidPropertiesSync(refrigerant, temp_c, polynomials);
  } catch {
    // Fallback para tabelas estáticas
    const fallback = getFallbackProperties(refrigerant, temp_c);
    if (fallback) return fallback;
    return {
      warnings: [`Erro ao carregar polinômios; propriedades de ${refrigerant} indisponíveis`],
    };
  }
}

/**
 * Retorna a lista de refrigerantes disponíveis (polinômios + fallback).
 */
export function getAvailableRefrigerantsSync(): string[] {
  const fallbackKeys = Object.keys(FALLBACK_TABLES);
  if (!_polynomialsCache) return fallbackKeys;

  // Importar mapeamento do engine
  const REFRIGERANT_ID_MAP: Record<string, number> = {
    R22: 7, R32: 9, R125: 16, R134a: 18, R404A: 26, R407C: 28,
    R410A: 30, R448A: 31, R449A: 32, R452A: 33, R507A: 34, R290: 45, R600a: 51,
  };

  const fluidIds = new Set(_polynomialsCache.map((p) => p.fluid_id));
  const polyKeys = Object.entries(REFRIGERANT_ID_MAP)
    .filter(([, id]) => fluidIds.has(id))
    .map(([name]) => name);

  return [...new Set([...polyKeys, ...fallbackKeys])].sort();
}

export { loadPolynomials, evaluatePolynomial };
export type { FluidPolynomialRecord, FluidProperties };
