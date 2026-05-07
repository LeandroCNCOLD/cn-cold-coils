// ColdPro V2 — Serviço de Catálogo de Compressores (lazy loading)
// Catálogo consolidado UNILAB/VapCyc — 1.791 compressores únicos
// Fabricantes: Copeland, Maneurop, Bitzer, Tecumseh, Danfoss, Refcomp
// NÃO modificar coldpro_v2/ | NÃO criar API REST

import type {
  CompressorCalibrationPoint,
  CompressorCatalogRow,
  CompressorIndexRow,
  CompressorCatalogFilter,
  CompressorManufacturer,
} from './compressorCatalog.types';

const KW_PER_HP = 0.7457;

// ─── Cache em memória ─────────────────────────────────────────────
let indexCache: CompressorIndexRow[] | null = null;
const detailCache: Map<string, CompressorCatalogRow> = new Map();
const manufacturerCache: Map<CompressorManufacturer, CompressorCatalogRow[]> = new Map();

// ─── EN12900: avaliação do polinômio de 10 termos ─────────────────
function evalEN12900(coeffs: number[], te: number, tc: number): number {
  if (!Array.isArray(coeffs) || coeffs.length < 10) return 0;
  const [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10] = coeffs;
  return (
    c1 +
    c2 * te +
    c3 * tc +
    c4 * te * te +
    c5 * te * tc +
    c6 * tc * tc +
    c7 * te * te * te +
    c8 * tc * te * te +
    c9 * te * tc * tc +
    c10 * tc * tc * tc
  );
}

/** Calcula campos derivados a partir do ponto de calibração padrão (menor IDAl). */
function deriveCompatFields(row: Partial<CompressorCatalogRow>): {
  nominal_cooling_capacity_w: number | null;
  nominal_power_w: number | null;
  nominal_hp: number | null;
  nominal_evap_temp_c: number | null;
  nominal_cond_temp_c: number | null;
} {
  const points = (row.calibration_points ?? []) as CompressorCalibrationPoint[];
  if (points.length === 0) {
    return {
      nominal_cooling_capacity_w: null,
      nominal_power_w: null,
      nominal_hp: null,
      nominal_evap_temp_c: null,
      nominal_cond_temp_c: null,
    };
  }
  // Ponto padrão = menor idal (índice 0 já vem ordenado pelo gerador)
  const std = points[0];
  const te = std.te_ref_c;
  const tc = std.tc_ref_c;
  const factor = std.calibration_factor || 1;

  // EN12900 retorna capacidade em W (Watts) e potência em kW por convenção UNILAB.
  // Aplicamos o calibration_factor.
  const capW = evalEN12900(std.cap_coeffs, te, tc) * factor;
  const pwrKw = evalEN12900(std.pwr_coeffs, te, tc) * factor;
  const pwrW = pwrKw * 1000;
  const powerKwForHp = std.nominal_power_kw || pwrKw;

  return {
    nominal_cooling_capacity_w: Number.isFinite(capW) && capW > 0 ? capW : null,
    nominal_power_w: Number.isFinite(pwrW) && pwrW > 0 ? pwrW : null,
    nominal_hp: powerKwForHp > 0 ? Number((powerKwForHp / KW_PER_HP).toFixed(2)) : null,
    nominal_evap_temp_c: te,
    nominal_cond_temp_c: tc,
  };
}

/** Aumenta um registro completo com campos derivados de compatibilidade. */
function hydrateRow(raw: CompressorCatalogRow): CompressorCatalogRow {
  const compat = deriveCompatFields(raw);
  return {
    ...raw,
    all_refrigerants: raw.all_refrigerants ?? [raw.refrigerant],
    compressor_type: raw.compressor_type ?? raw.CompressorType ?? null,
    min_evap_temp_c: raw.min_evap_temp_c ?? raw.te_min_c ?? null,
    max_evap_temp_c: raw.max_evap_temp_c ?? raw.te_max_c ?? null,
    min_cond_temp_c: raw.min_cond_temp_c ?? raw.tc_min_c ?? null,
    max_cond_temp_c: raw.max_cond_temp_c ?? raw.tc_max_c ?? null,
    nominal_cooling_capacity_w:
      raw.nominal_cooling_capacity_w ?? compat.nominal_cooling_capacity_w,
    nominal_power_w: raw.nominal_power_w ?? compat.nominal_power_w,
    nominal_hp: raw.nominal_hp ?? compat.nominal_hp,
    nominal_evap_temp_c: raw.nominal_evap_temp_c ?? compat.nominal_evap_temp_c,
    nominal_cond_temp_c: raw.nominal_cond_temp_c ?? compat.nominal_cond_temp_c,
    voltage: raw.voltage ?? null,
  };
}

/** Aumenta uma linha de índice com campos derivados de compatibilidade. */
function hydrateIndexRow(raw: CompressorIndexRow): CompressorIndexRow {
  const powerKw = raw.nominal_power_kw ?? 0;
  return {
    ...raw,
    all_refrigerants: raw.all_refrigerants ?? [raw.refrigerant],
    compressor_type: raw.compressor_type ?? raw.CompressorType ?? null,
    nominal_cooling_capacity_w: raw.nominal_cooling_capacity_w ?? null,
    nominal_power_w: raw.nominal_power_w ?? (powerKw > 0 ? powerKw * 1000 : null),
    nominal_hp:
      raw.nominal_hp ?? (powerKw > 0 ? Number((powerKw / KW_PER_HP).toFixed(2)) : null),
    voltage: raw.voltage ?? null,
  };
}

// ─── Carregamento lazy ────────────────────────────────────────────

/** Carrega o índice leve do catálogo */
export async function loadCompressorIndex(): Promise<CompressorIndexRow[]> {
  if (indexCache) return indexCache;
  const res = await fetch('/data/compressors/index.json');
  if (!res.ok) throw new Error(`Falha ao carregar índice de compressores: ${res.status}`);
  const raw = (await res.json()) as CompressorIndexRow[];
  indexCache = raw.map(hydrateIndexRow);
  return indexCache;
}

/** Carrega todos os registros completos de um fabricante */
export async function loadManufacturerData(
  manufacturer: CompressorManufacturer,
): Promise<CompressorCatalogRow[]> {
  if (manufacturerCache.has(manufacturer)) return manufacturerCache.get(manufacturer)!;
  const file = manufacturer.toLowerCase();
  const res = await fetch(`/data/compressors/${file}.json`);
  if (!res.ok) throw new Error(`Falha ao carregar dados de ${manufacturer}: ${res.status}`);
  const raw = (await res.json()) as CompressorCatalogRow[];
  const data = raw.map(hydrateRow);
  manufacturerCache.set(manufacturer, data);
  data.forEach((r) => detailCache.set(r.id, r));
  return data;
}

/** Mapeia prefixo do ID → fabricante */
function manufacturerFromId(id: string): CompressorManufacturer | null {
  const upper = id.toUpperCase();
  if (upper.startsWith('COPELAND_')) return 'Copeland';
  if (upper.startsWith('MANEUROP_')) return 'Maneurop';
  if (upper.startsWith('BITZER_')) return 'Bitzer';
  if (upper.startsWith('TECUMSEH_')) return 'Tecumseh';
  if (upper.startsWith('DANFOSS_')) return 'Danfoss';
  if (upper.startsWith('REFCOMP_')) return 'Refcomp';
  return null;
}

/** Busca registro completo por ID (carrega fabricante se necessário) */
export async function getCompressorById(id: string): Promise<CompressorCatalogRow | null> {
  if (detailCache.has(id)) return detailCache.get(id)!;
  const manufacturer = manufacturerFromId(id);
  if (!manufacturer) return null;
  const data = await loadManufacturerData(manufacturer);
  return data.find((r) => r.id === id) ?? null;
}

/**
 * Carrega o spec completo de um compressor pelo id, expondo opcionalmente
 * os coeficientes polinomiais nativos BITZER quando disponíveis no catálogo.
 */
export async function loadCompressorSpec(id: string): Promise<
  | (CompressorCatalogRow & {
      bitzerNative?: {
        displacement_m3h: number;
        coeff_lambda: number[];
        coeff_current: number[];
        coeff_specific_power: number[];
        rpm: number;
      };
    })
  | null
> {
  const row = await getCompressorById(id);
  if (!row) return null;
  const raw = row as CompressorCatalogRow & {
    bitzer_native?: Record<string, unknown>;
    bitzerNative?: Record<string, unknown>;
  };
  const native = raw.bitzerNative ?? raw.bitzer_native;
  if (
    native &&
    Array.isArray(native.coeff_lambda) &&
    Array.isArray(native.coeff_current) &&
    Array.isArray(native.coeff_specific_power)
  ) {
    return {
      ...row,
      bitzerNative: {
        displacement_m3h: Number(native.displacement_m3h ?? row.nominal_displacement_cm3 ?? 0),
        coeff_lambda: (native.coeff_lambda as number[]).map(Number),
        coeff_current: (native.coeff_current as number[]).map(Number),
        coeff_specific_power: (native.coeff_specific_power as number[]).map(Number),
        rpm: Number(native.rpm ?? row.nominal_rpm ?? 0),
      },
    };
  }
  return row;
}

// ─── Filtros ──────────────────────────────────────────────────────

/** Filtra o índice leve (rápido, sem carregar dados completos) */
export async function filterCompressors(
  filter: CompressorCatalogFilter,
): Promise<CompressorIndexRow[]> {
  const index = await loadCompressorIndex();
  return index.filter((r) => {
    if (filter.manufacturer && r.manufacturer !== filter.manufacturer) return false;
    if (filter.application && r.application !== filter.application) return false;
    if (filter.refrigerant && !r.all_refrigerants.includes(filter.refrigerant)) return false;
    if (filter.frequencyHz && r.frequency_hz !== filter.frequencyHz) return false;
    if (filter.minCapacityW != null && (r.nominal_cooling_capacity_w ?? 0) < filter.minCapacityW)
      return false;
    if (
      filter.maxCapacityW != null &&
      (r.nominal_cooling_capacity_w ?? Infinity) > filter.maxCapacityW
    )
      return false;
    if (filter.minHp != null && (r.nominal_hp ?? 0) < filter.minHp) return false;
    if (filter.maxHp != null && (r.nominal_hp ?? Infinity) > filter.maxHp) return false;
    if (filter.searchText) {
      const q = filter.searchText.toLowerCase();
      if (!r.model.toLowerCase().includes(q) && !r.manufacturer.toLowerCase().includes(q))
        return false;
    }
    return true;
  });
}

// ─── Conversão para CompressorSpec do motor ───────────────────────

/**
 * Converte um CompressorCatalogRow para CompressorSpec do motor ColdPro V2.
 * Permite sobrescrever temperaturas de operação (ex: condições reais do projeto).
 */
export function toCompressorSpec(
  row: CompressorCatalogRow,
  overrides?: {
    evap_temp_c?: number;
    cond_temp_c?: number;
    refrigerant?: string;
  },
) {
  return {
    cooling_capacity_w: row.nominal_cooling_capacity_w ?? 0,
    power_w: row.nominal_power_w ?? 0,
    refrigerant: overrides?.refrigerant ?? row.refrigerant,
    evap_temp_c: overrides?.evap_temp_c ?? row.nominal_evap_temp_c ?? -10,
    cond_temp_c: overrides?.cond_temp_c ?? row.nominal_cond_temp_c ?? 40,
  };
}

// ─── Estatísticas do catálogo ─────────────────────────────────────

export async function getCompressorCatalogStats() {
  const index = await loadCompressorIndex();
  const byManufacturer = index.reduce(
    (acc, r) => {
      acc[r.manufacturer] = (acc[r.manufacturer] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  const byApplication = index.reduce(
    (acc, r) => {
      acc[r.application] = (acc[r.application] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  const byRefrigerant = index.reduce(
    (acc, r) => {
      acc[r.refrigerant] = (acc[r.refrigerant] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  return {
    total: index.length,
    byManufacturer,
    byApplication,
    byRefrigerant,
  };
}
