import { create } from "zustand";
import { getEquipmentCatalog } from "../data/equipmentCatalog.index";
import type { CatalogEquipmentRow } from "../data/equipmentCatalog.types";

interface CatalogDataState {
  rows: CatalogEquipmentRow[];
  source: "json" | "supabase";
  loading: boolean;
  error: string | null;
  setRows: (rows: CatalogEquipmentRow[], source: "json" | "supabase") => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCatalogDataStore = create<CatalogDataState>((set) => ({
  rows: getEquipmentCatalog(),
  source: "json",
  loading: false,
  error: null,
  setRows: (rows, source) => set({ rows, source, loading: false, error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),
}));
