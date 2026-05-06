/**
 * usePumpCatalog — Carrega o catálogo de bombas com curvas de desempenho
 *
 * Fonte: public/data/catalogs/pumpCatalog.json
 * Gerado a partir de: LinePressureDrop_COMPLETO.xlsx (engenharia reversa UNILAB Coils6)
 *
 * Cada bomba contém:
 *   - model: modelo da bomba
 *   - builder: fabricante
 *   - max_flow_m3h: vazão máxima (m³/h)
 *   - max_head_m: altura manométrica máxima (m)
 *   - motor_power_kw: potência do motor (kW)
 *   - curve_points: pontos da curva Q-H (vazão × altura)
 */
import { useState, useEffect, useMemo } from "react";

const CATALOG_URL = "/data/catalogs/pumpCatalog.json";

export interface PumpCurvePoint {
  flow_m3h: number;
  head_m: number;
  efficiency?: number;
}

export interface PumpRecord {
  id?: string | number;
  model?: string;
  builder?: string;
  type?: string;
  max_flow_m3h?: number;
  max_head_m?: number;
  motor_power_kw?: number;
  voltage_v?: number;
  frequency_hz?: number;
  curve_points?: PumpCurvePoint[];
}

export interface PumpFilter {
  min_flow_m3h?: number;
  min_head_m?: number;
  max_power_kw?: number;
  builder?: string;
}

let _cached: PumpRecord[] | null = null;

export function usePumpCatalog(filter?: PumpFilter) {
  const [data, setData] = useState<PumpRecord[]>(_cached ?? []);
  const [loading, setLoading] = useState(!_cached);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (_cached) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(CATALOG_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = (await res.json()) as PumpRecord[];
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
    return data.filter((p) => {
      if (filter.min_flow_m3h !== undefined && (p.max_flow_m3h ?? 0) < filter.min_flow_m3h) return false;
      if (filter.min_head_m !== undefined && (p.max_head_m ?? 0) < filter.min_head_m) return false;
      if (filter.max_power_kw !== undefined && (p.motor_power_kw ?? 0) > filter.max_power_kw) return false;
      if (filter.builder && p.builder && !p.builder.toLowerCase().includes(filter.builder.toLowerCase())) return false;
      return true;
    });
  }, [data, filter]);

  /**
   * Interpola a altura manométrica para uma dada vazão na curva Q-H da bomba.
   */
  const getHeadAtFlow = (pump: PumpRecord, flow_m3h: number): number | null => {
    const pts = pump.curve_points;
    if (!pts || pts.length < 2) return pump.max_head_m ?? null;
    const sorted = [...pts].sort((a, b) => a.flow_m3h - b.flow_m3h);
    if (flow_m3h <= sorted[0].flow_m3h) return sorted[0].head_m;
    if (flow_m3h >= sorted[sorted.length - 1].flow_m3h) return sorted[sorted.length - 1].head_m;
    for (let i = 0; i < sorted.length - 1; i++) {
      const q0 = sorted[i].flow_m3h, q1 = sorted[i + 1].flow_m3h;
      if (flow_m3h >= q0 && flow_m3h <= q1) {
        const frac = (flow_m3h - q0) / (q1 - q0);
        return sorted[i].head_m + frac * (sorted[i + 1].head_m - sorted[i].head_m);
      }
    }
    return null;
  };

  return { data: filtered, allData: data, loading, error, getHeadAtFlow };
}
