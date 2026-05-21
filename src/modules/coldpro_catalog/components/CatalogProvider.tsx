import { useEffect } from "react";
import { useCatalogDataStore } from "../store/useCatalogDataStore";
import { fetchCatalogFromSupabase } from "../services/catalogSupabaseService";

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const { setRows, setLoading, setError } = useCatalogDataStore();

  useEffect(() => {
    setLoading(true);
    fetchCatalogFromSupabase()
      .then((rows) => {
        if (rows.length > 0) setRows(rows, "supabase");
        else setLoading(false);
      })
      .catch((err) => {
        console.warn("[CatalogProvider] Supabase unavailable, using local JSON:", err?.message);
        setError(null);
      });
  }, [setRows, setLoading, setError]);

  return <>{children}</>;
}
