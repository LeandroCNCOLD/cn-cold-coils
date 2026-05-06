/**
 * useRefrigerantsFull — Carrega a lista completa de refrigerantes (puros + misturas)
 *
 * Fontes:
 *   - public/data/catalogs/refrigerantsPure_full.json (45 refrigerantes puros)
 *   - public/data/catalogs/refrigerantsMix_full.json (11 misturas)
 *
 * Gerado a partir de: Standard_fluidmanagement_COMPLETO.xlsx (UNILAB Coils6)
 *
 * Cada refrigerante contém:
 *   - id: ID numérico UNILAB
 *   - name: nome do refrigerante (ex: "R134a", "R404A")
 *   - cas: número CAS
 *   - chemical_name: nome químico
 *   - fast_calc: se suporta cálculo rápido
 *   - max_velocity_ms: velocidade máxima de escoamento (m/s)
 */
import { useState, useEffect, useMemo } from "react";

const PURE_URL = "/data/catalogs/refrigerantsPure_full.json";
const MIX_URL = "/data/catalogs/refrigerantsMix_full.json";

export interface RefrigerantPureRecord {
  id?: number;
  name?: string;
  description_id?: number;
  cas?: string;
  chemical_name?: string;
  n_applications?: number;
  fast_calc?: boolean;
  max_velocity_ms?: number;
  superheat_subcooling_coefficients?: unknown[];
  outlet_compressor_coefficients?: unknown[];
}

export interface RefrigerantMixRecord {
  id?: number;
  name?: string;
  description_id?: number;
  components?: { component_id: number; fraction: number }[];
}

export type RefrigerantRecord =
  | (RefrigerantPureRecord & { kind: "pure" })
  | (RefrigerantMixRecord & { kind: "mixture" });

let _cachedPure: RefrigerantPureRecord[] | null = null;
let _cachedMix: RefrigerantMixRecord[] | null = null;

export function useRefrigerantsFull() {
  const [pure, setPure] = useState<RefrigerantPureRecord[]>(_cachedPure ?? []);
  const [mix, setMix] = useState<RefrigerantMixRecord[]>(_cachedMix ?? []);
  const [loading, setLoading] = useState(!_cachedPure || !_cachedMix);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (_cachedPure && _cachedMix) return;
    let cancelled = false;
    (async () => {
      try {
        const [pureRes, mixRes] = await Promise.all([
          fetch(PURE_URL),
          fetch(MIX_URL),
        ]);
        if (!pureRes.ok) throw new Error(`HTTP ${pureRes.status} (pure)`);
        if (!mixRes.ok) throw new Error(`HTTP ${mixRes.status} (mix)`);
        const pureData = (await pureRes.json()) as RefrigerantPureRecord[];
        const mixData = (await mixRes.json()) as RefrigerantMixRecord[];
        _cachedPure = pureData;
        _cachedMix = mixData;
        if (!cancelled) {
          setPure(pureData);
          setMix(mixData);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  /** Lista combinada ordenada por nome */
  const all = useMemo((): RefrigerantRecord[] => {
    const pureRecs: RefrigerantRecord[] = pure.map((r) => ({ ...r, kind: "pure" as const }));
    const mixRecs: RefrigerantRecord[] = mix.map((r) => ({ ...r, kind: "mixture" as const }));
    return [...pureRecs, ...mixRecs].sort((a, b) =>
      (a.name ?? "").localeCompare(b.name ?? "")
    );
  }, [pure, mix]);

  /** Opções para select de refrigerante */
  const options = useMemo(() =>
    all
      .filter((r) => r.name)
      .map((r) => ({
        value: r.name!,
        label: r.name!,
        kind: r.kind,
        id: r.id,
      })),
    [all]
  );

  /** Busca um refrigerante pelo nome */
  const findByName = (name: string): RefrigerantRecord | undefined =>
    all.find((r) => r.name?.toLowerCase() === name.toLowerCase());

  return {
    pure,
    mix,
    all,
    options,
    loading,
    error,
    findByName,
    totalPure: pure.length,
    totalMix: mix.length,
  };
}
