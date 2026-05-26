import { supabase } from "@/integrations/supabase/client";
import type { CatalogEquipmentRow } from "../data/equipmentCatalog.types";
import { enrichCatalogRow } from "../data/equipmentCatalog.index";

export async function fetchCatalogFromSupabase(): Promise<CatalogEquipmentRow[]> {
  const { data, error } = await supabase
    .from("equipment_catalog")
    .select("modelo, data")
    .order("modelo");

  if (error) throw error;
  if (!data || data.length === 0) return [];

  return data
    .map((row) => {
      const raw = row.data as Record<string, unknown>;
      if (!raw || typeof raw !== "object" || !raw["modelo"]) return null;
      return enrichCatalogRow(raw as unknown as CatalogEquipmentRow);
    })
    .filter((r): r is CatalogEquipmentRow => r !== null);
}
