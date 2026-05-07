// Lazy-load das bibliotecas de equipamentos (compressors / fans) via fetch.
// Os JSONs ficam em /public/data/equipment/ — nunca importados pelo bundle.

import { useEffect, useState } from "react";

export interface LibraryCompressor {
  id: string;
  source: string;
  manufacturer: string;
  model: string;
  type?: string;
  refrigerant: string[];
  application_type?: string;
  cooling_capacity_kw: number;
  cooling_capacity_kcal_h?: number;
  power_input_kw: number;
  cop?: number;
  min_evap_temp_c?: number;
  max_evap_temp_c?: number;
  min_cond_temp_c?: number;
  max_cond_temp_c?: number;
  nominal_conditions?: {
    te_c?: number;
    tc_c?: number;
    subcooling_k?: number;
    superheat_k?: number;
  };
  capacity_coefficients?: number[];
  power_coefficients?: number[];
  coefficient_units?: string;
  standard?: string;
  data_quality?: string;
}

export interface LibraryFan {
  id: string;
  source: string;
  manufacturer: string;
  model: string;
  sph_coefficients: number[];
  power_coefficients: number[];
  coefficient_count: number;
  data_quality?: string;
}

export interface EquipmentLibraryState<T> {
  loading: boolean;
  error: string | null;
  data: T[];
}

async function fetchJson<T>(url: string): Promise<T[]> {
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error(`HTTP ${res.status} carregando ${url}`);
  const json = (await res.json()) as T[];
  if (!Array.isArray(json)) throw new Error(`Conteúdo inválido em ${url}`);
  return json;
}

/**
 * Carrega o catálogo consolidado de compressores (1.791 únicos, 6 fabricantes)
 * a partir de /public/data/compressors/{manufacturer}.json e mapeia para a
 * forma LibraryCompressor consumida pelas telas legadas.
 */
async function loadConsolidatedCompressorLibrary(): Promise<LibraryCompressor[]> {
  const KW_PER_HP = 0.7457;
  const manufacturers = ["copeland", "maneurop", "bitzer", "tecumseh", "danfoss", "refcomp"];
  const files = await Promise.all(
    manufacturers.map((m) =>
      fetch(`/data/compressors/${m}.json`, { cache: "force-cache" })
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
    ),
  );
  const all: LibraryCompressor[] = [];
  for (const arr of files) {
    if (!Array.isArray(arr)) continue;
    for (const raw of arr) {
      const points = Array.isArray(raw.calibration_points) ? raw.calibration_points : [];
      const std = points[0] ?? {};
      const factor = std.calibration_factor || 1;
      const evalPoly = (c: number[] | undefined, te: number, tc: number): number => {
        if (!Array.isArray(c) || c.length < 10) return 0;
        return (
          c[0] +
          c[1] * te +
          c[2] * tc +
          c[3] * te * te +
          c[4] * te * tc +
          c[5] * tc * tc +
          c[6] * te * te * te +
          c[7] * tc * te * te +
          c[8] * te * tc * tc +
          c[9] * tc * tc * tc
        );
      };
      const te = std.te_ref_c ?? -10;
      const tc = std.tc_ref_c ?? 40;
      const capW = evalPoly(std.cap_coeffs, te, tc) * factor;
      const pwrKw = evalPoly(std.pwr_coeffs, te, tc) * factor;
      const capacity_kw = Number.isFinite(capW) && capW > 0 ? capW / 1000 : 0;
      const power_kw =
        Number.isFinite(pwrKw) && pwrKw > 0 ? pwrKw : Number(raw.nominal_power_kw ?? 0);
      all.push({
        id: String(raw.id),
        source: "UNILAB/VapCyc",
        manufacturer: String(raw.manufacturer ?? "Desconhecido"),
        model: String(raw.model ?? raw.id),
        type: raw.CompressorType ?? raw.compressor_type ?? undefined,
        refrigerant: Array.isArray(raw.all_refrigerants) && raw.all_refrigerants.length
          ? raw.all_refrigerants.map(String)
          : [String(raw.refrigerant ?? "unknown")],
        application_type: raw.application ?? undefined,
        cooling_capacity_kw: capacity_kw,
        cooling_capacity_kcal_h: capacity_kw > 0 ? capacity_kw * 860 : undefined,
        power_input_kw: power_kw,
        cop: power_kw > 0 ? capacity_kw / power_kw : undefined,
        min_evap_temp_c: raw.te_min_c ?? undefined,
        max_evap_temp_c: raw.te_max_c ?? undefined,
        min_cond_temp_c: raw.tc_min_c ?? undefined,
        max_cond_temp_c: raw.tc_max_c ?? undefined,
        nominal_conditions: {
          te_c: te,
          tc_c: tc,
          subcooling_k: std.sc ?? undefined,
          superheat_k: std.sh ?? undefined,
        },
        capacity_coefficients: std.cap_coeffs,
        power_coefficients: std.pwr_coeffs,
        coefficient_units: "EN12900",
        standard: "EN12900",
        data_quality: "consolidated",
      });
    }
  }
  return all;
}


export function useCompressorLibrary(): EquipmentLibraryState<LibraryCompressor> {
  const [state, setState] = useState<EquipmentLibraryState<LibraryCompressor>>({
    loading: true,
    error: null,
    data: [],
  });

  useEffect(() => {
    let cancelled = false;
    loadConsolidatedCompressorLibrary()
      .then((data) => {
        if (cancelled) return;
        setState({ loading: false, error: null, data });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({
          loading: false,
          error: err instanceof Error ? err.message : String(err),
          data: [],
        });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function useFanLibrary(): EquipmentLibraryState<LibraryFan> {
  const [state, setState] = useState<EquipmentLibraryState<LibraryFan>>({
    loading: true,
    error: null,
    data: [],
  });

  useEffect(() => {
    let cancelled = false;
    fetchJson<LibraryFan>("/data/equipment/fans.json")
      .then((data) => {
        if (cancelled) return;
        setState({ loading: false, error: null, data });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({
          loading: false,
          error: err instanceof Error ? err.message : String(err),
          data: [],
        });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

/** Agrupa por fabricante, ordenado alfabeticamente. */
export function groupByManufacturer<T extends { manufacturer: string }>(
  items: T[],
): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const it of items) {
    const key = it.manufacturer || "Desconhecido";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(it);
  }
  return new Map([...map.entries()].sort(([a], [b]) => a.localeCompare(b)));
}
