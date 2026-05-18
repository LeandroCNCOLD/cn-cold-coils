import { useMemo } from "react";
import { useFansCatalog, type FanCatalogRow } from "./useFansCatalog";
import type { FanPickerItem } from "../components/FanPickerModal";

function toPickerItem(fan: FanCatalogRow): FanPickerItem {
  return {
    id:              fan.id,
    manufacturer:    fan.manufacturer,
    model:           fan.type_key,
    series:          fan.series ?? undefined,
    seriesDescription: fan.electrical ?? undefined,
    fanCategory:     fan.fan_genre === "centrifugal" ? "centrifugal" : "axial",
    fanFunction:     "soprador",
    diameter_mm:     fan.size_mm ?? undefined,
    rpm:             fan.rpm ?? undefined,
    motor_power_w:   fan.motor_power_w ?? undefined,
    airflow_m3h:     fan.airflow_m3h ?? undefined,
  };
}

export interface UseFanCatalogPickerItemsResult {
  items: FanPickerItem[];
  loading: boolean;
  error: string | null;
}

export function useFanCatalogPickerItems(): UseFanCatalogPickerItemsResult {
  const { data, loading, error } = useFansCatalog();
  const items = useMemo(() => data.map(toPickerItem), [data]);
  return { items, loading, error };
}
