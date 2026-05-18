import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface FanOperatingPoint {
  query_airflow_m3h: number | null;
  query_pressure_pa: number | null;
  airflow_m3h: number | null;
  static_pressure_pa: number | null;
  power_w: number | null;
  efficiency_pct: number | null;
  rpm: number | null;
  sfp_class: string | null;
  sfp_value: number | null;
  sound_db: string | null;
}

export interface FanCatalogRow {
  id: string;
  manufacturer: string;
  article_number: string | null;
  type_key: string;
  series: string | null;
  fan_genre: "axial" | "centrifugal" | null;
  design: string | null;
  size_mm: number | null;
  motor: string | null;
  motor_family: string | null;
  motor_power_w: number | null;
  voltage_v: number | null;
  phases: number | null;
  frequency_hz: number | null;
  electrical: string | null;
  rpm: number | null;
  airflow_m3h: number | null;
  static_pressure_pa: number | null;
  power_w: number | null;
  efficiency_pct: number | null;
  sfp_class: string | null;
  sfp_value: number | null;
  sound_db: string | null;
  operating_points: FanOperatingPoint[];
}

let _cache: FanCatalogRow[] | null = null;
let _cacheError: string | null = null;

export function useFansCatalog() {
  const [data, setData]       = useState<FanCatalogRow[]>(_cache ?? []);
  const [loading, setLoading] = useState(_cache === null);
  const [error, setError]     = useState<string | null>(_cacheError);

  useEffect(() => {
    if (_cache !== null) return;
    let cancelled = false;

    (async () => {
      const { data: rows, error: err } = await supabase
        .from("fans_catalog")
        .select("*")
        .order("manufacturer")
        .order("type_key");

      if (cancelled) return;

      if (err) {
        _cacheError = err.message;
        setError(err.message);
        setLoading(false);
        return;
      }

      _cache = (rows ?? []) as unknown as FanCatalogRow[];
      setData(_cache);
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
