/**
 * useMaterials — Carrega o catálogo completo de materiais de construção
 *
 * Fonte: public/data/catalogs/materials_full.json
 * Gerado a partir de: Materiali_COMPLETO.xlsx (engenharia reversa UNILAB Coils6)
 *
 * Categorias disponíveis:
 *   - fin_materials: materiais de aletas (alumínio, cobre, aço inox)
 *   - tube_materials: materiais de tubos (cobre, aço, alumínio)
 *   - collector_materials: materiais de coletores
 *   - distributor_materials: materiais de distribuidores
 *   - frame_materials: materiais de estrutura
 *   - solder_materials: materiais de soldagem
 */
import { useState, useEffect, useMemo } from "react";

const CATALOG_URL = "/data/catalogs/materials_full.json";

export interface MaterialRecord {
  id?: string | number;
  name?: string;
  thermal_conductivity_w_mk?: number;
  density_kg_m3?: number;
  specific_heat_j_kgk?: number;
  emissivity?: number;
  cost_factor?: number;
}

export interface MaterialsCatalog {
  fin_materials: MaterialRecord[];
  tube_materials: MaterialRecord[];
  collector_materials: MaterialRecord[];
  distributor_materials: MaterialRecord[];
  frame_materials: MaterialRecord[];
  solder_materials: MaterialRecord[];
}

const EMPTY: MaterialsCatalog = {
  fin_materials: [],
  tube_materials: [],
  collector_materials: [],
  distributor_materials: [],
  frame_materials: [],
  solder_materials: [],
};

let _cached: MaterialsCatalog | null = null;

export function useMaterials() {
  const [data, setData] = useState<MaterialsCatalog>(_cached ?? EMPTY);
  const [loading, setLoading] = useState(!_cached);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (_cached) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(CATALOG_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = (await res.json()) as MaterialsCatalog;
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

  /** Retorna condutividade térmica de um material por nome (W/m·K) */
  const getConductivity = useMemo(() => (name: string): number | null => {
    const allMats = [
      ...data.fin_materials,
      ...data.tube_materials,
      ...data.collector_materials,
    ];
    const found = allMats.find((m) =>
      m.name?.toLowerCase().includes(name.toLowerCase())
    );
    return found?.thermal_conductivity_w_mk ?? null;
  }, [data]);

  /** Opções para select de material de aleta */
  const finMaterialOptions = useMemo(() =>
    data.fin_materials
      .filter((m) => m.name)
      .map((m) => ({ value: String(m.id ?? m.name), label: m.name! })),
    [data.fin_materials]
  );

  /** Opções para select de material de tubo */
  const tubeMaterialOptions = useMemo(() =>
    data.tube_materials
      .filter((m) => m.name)
      .map((m) => ({ value: String(m.id ?? m.name), label: m.name! })),
    [data.tube_materials]
  );

  return {
    ...data,
    loading,
    error,
    getConductivity,
    finMaterialOptions,
    tubeMaterialOptions,
  };
}
