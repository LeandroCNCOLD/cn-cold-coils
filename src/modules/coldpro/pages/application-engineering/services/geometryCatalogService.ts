/**
 * geometryCatalogService.ts
 *
 * Carrega o catálogo de "geometrias de aletado" (a ferramenta de estampagem
 * usada na fábrica). Cada geometria fixa o diâmetro externo do tubo, o passo
 * transversal entre tubos e o passo entre filas (PassoRanghi).
 *
 * Os dados originais vêm de /public/data/catalogs/geometriesComplete.json
 * (formatado para condensation, direct_expansion, etc.).
 */

export type CoilApplication = "evaporator" | "condenser";

export interface GeometryOption {
  id: string;
  description: string;
  tube_outer_diameter_mm: number;
  tube_pitch_transverse_mm: number; // PassoTubi
  row_pitch_mm: number; // PassoRanghi (distância entre filas)
  tube_thickness_mm: number;
  fin_thickness_mm: number;
}

interface RawGeometry {
  Sigla?: string;
  Descrizione?: string;
  DiamEster: number;
  PassoTubi: number;
  PassoRanghi: number;
  Spessoretubo?: number;
  SpessoreAletta?: number;
}

let cache: Record<CoilApplication, GeometryOption[]> | null = null;
let inflight: Promise<void> | null = null;

const APP_TO_KEY: Record<CoilApplication, string> = {
  evaporator: "direct_expansion",
  condenser: "condensation",
};

function dedupe(items: RawGeometry[]): GeometryOption[] {
  const seen = new Set<string>();
  const out: GeometryOption[] = [];
  for (const g of items) {
    const id = (g.Sigla || g.Descrizione || "").trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push({
      id,
      description: id,
      tube_outer_diameter_mm: g.DiamEster,
      tube_pitch_transverse_mm: g.PassoTubi,
      row_pitch_mm: g.PassoRanghi,
      tube_thickness_mm: g.Spessoretubo ?? 0.35,
      fin_thickness_mm: g.SpessoreAletta ?? 0.12,
    });
  }
  // Ordena por OD depois pelo passo transversal — facilita o select
  out.sort(
    (a, b) =>
      a.tube_outer_diameter_mm - b.tube_outer_diameter_mm ||
      a.tube_pitch_transverse_mm - b.tube_pitch_transverse_mm,
  );
  return out;
}

export async function loadGeometryCatalog(): Promise<
  Record<CoilApplication, GeometryOption[]>
> {
  if (cache) return cache;
  if (!inflight) {
    inflight = (async () => {
      const res = await fetch("/data/catalogs/geometriesComplete.json");
      const raw = (await res.json()) as Record<string, RawGeometry[]>;
      cache = {
        evaporator: dedupe(raw[APP_TO_KEY.evaporator] ?? []),
        condenser: dedupe(raw[APP_TO_KEY.condenser] ?? []),
      };
    })();
  }
  await inflight;
  return cache!;
}
