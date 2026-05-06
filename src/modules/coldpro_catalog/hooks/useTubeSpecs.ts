/**
 * useTubeSpecs — Carrega o catálogo de especificações de tubos
 *
 * Fonte: public/data/catalogs/tubeSpecs.json
 * Gerado a partir de: LinePressureDrop_COMPLETO.xlsx (engenharia reversa UNILAB Coils6)
 *
 * Cada tubo contém:
 *   - outer_diameter_mm: diâmetro externo (mm)
 *   - inner_diameter_mm: diâmetro interno (mm)
 *   - wall_thickness_mm: espessura da parede (mm)
 *   - material: material (ex: "copper", "steel")
 *   - roughness_mm: rugosidade (mm) — para cálculo de Darcy-Weisbach
 */
import { useState, useEffect, useMemo } from "react";

const CATALOG_URL = "/data/catalogs/tubeSpecs.json";

export interface TubeSpecRecord {
  id?: string;
  description?: string;
  outer_diameter_mm?: number;
  inner_diameter_mm?: number;
  wall_thickness_mm?: number;
  tube_od_mm?: number;
  tube_id_mm?: number;
  tube_wall_mm?: number;
  material?: string;
  material_id?: string;
  roughness_mm?: number;
  max_pressure_bar?: number;
  standard?: string;
}

export interface TubeSpecFilter {
  material?: string;
  min_od_mm?: number;
  max_od_mm?: number;
}

let _cached: TubeSpecRecord[] | null = null;

export function useTubeSpecs(filter?: TubeSpecFilter) {
  const [data, setData] = useState<TubeSpecRecord[]>(_cached ?? []);
  const [loading, setLoading] = useState(!_cached);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (_cached) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(CATALOG_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = (await res.json()) as TubeSpecRecord[];
        _cached = raw;
        if (!cancelled) setData(raw);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    if (!filter) return data;
    return data.filter((t) => {
      const od = t.outer_diameter_mm ?? t.tube_od_mm ?? 0;
      if (filter.material && t.material && !t.material.toLowerCase().includes(filter.material.toLowerCase())) return false;
      if (filter.min_od_mm !== undefined && od < filter.min_od_mm) return false;
      if (filter.max_od_mm !== undefined && od > filter.max_od_mm) return false;
      return true;
    });
  }, [data, filter]);

  /** Retorna o tubo mais próximo do diâmetro externo solicitado */
  const findNearest = (od_mm: number, material?: string): TubeSpecRecord | null => {
    const candidates = material
      ? data.filter((t) => t.material?.toLowerCase().includes(material.toLowerCase()))
      : data;
    if (candidates.length === 0) return null;
    return candidates.reduce((best, t) => {
      const tOd = t.outer_diameter_mm ?? t.tube_od_mm ?? 0;
      const bestOd = best.outer_diameter_mm ?? best.tube_od_mm ?? 0;
      return Math.abs(tOd - od_mm) < Math.abs(bestOd - od_mm) ? t : best;
    });
  };

  return { data: filtered, allData: data, loading, error, findNearest };
}
