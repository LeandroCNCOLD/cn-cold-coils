/**
 * useExpansionValves — Carrega e filtra o catálogo de válvulas de expansão Danfoss
 *
 * Fonte: public/data/catalogs/expansionValves.json
 * Gerado a partir de: C6Ds_Danfoss_COMPLETO.xlsx (engenharia reversa UNILAB Coils6)
 *
 * Cada válvula contém:
 *   - code: código Danfoss (ex: "069G0001")
 *   - type: tipo (ex: "TE 2")
 *   - circuits_min / circuits_max: faixa de circuitos
 *   - orifice_size_in / orifice_size_mm: tamanho do orifício
 *   - connection_od: diâmetro de conexão
 *   - kappa_curves: curvas de capacidade por refrigerante e temperatura de evaporação
 */
import { useState, useEffect, useMemo } from "react";

const CATALOG_URL = "/data/catalogs/expansionValves.json";

export interface KappaPoint {
  tevap_c: number;
  kappa: number;
}

export interface ExpansionValveRecord {
  code: string;
  type: string;
  circuits_min?: number;
  circuits_max?: number;
  orifice_size_in?: string;
  orifice_size_mm?: string;
  connection_od?: string;
  description?: string;
  weight_kg?: number;
  kappa_curves?: Record<string, KappaPoint[]>;
}

export interface ExpansionValveFilter {
  refrigerant?: string;
  tevap_c?: number;
  min_circuits?: number;
  max_circuits?: number;
  type?: string;
}

export interface ExpansionValveSelectorResult {
  valve: ExpansionValveRecord;
  kappa: number;
  /** Capacidade estimada em kW = kappa × Q_nominal_kW */
  estimated_capacity_kw?: number;
}

let _cached: ExpansionValveRecord[] | null = null;

export function useExpansionValves(filter?: ExpansionValveFilter) {
  const [data, setData] = useState<ExpansionValveRecord[]>(_cached ?? []);
  const [loading, setLoading] = useState(!_cached);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (_cached) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(CATALOG_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const raw = (await res.json()) as ExpansionValveRecord[];
        const valid = raw.filter((v) => v.code && v.type);
        _cached = valid;
        if (!cancelled) setData(valid);
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
    return data.filter((v) => {
      if (filter.type && !v.type.toLowerCase().includes(filter.type.toLowerCase())) return false;
      if (filter.min_circuits !== undefined && (v.circuits_max ?? 99) < filter.min_circuits) return false;
      if (filter.max_circuits !== undefined && (v.circuits_min ?? 0) > filter.max_circuits) return false;
      if (filter.refrigerant && v.kappa_curves && !v.kappa_curves[filter.refrigerant]) return false;
      return true;
    });
  }, [data, filter]);

  return { data: filtered, allData: data, loading, error, total: data.length, filteredTotal: filtered.length };
}

/**
 * Seleciona a melhor válvula para um ponto de operação.
 *
 * @param valves - Lista de válvulas disponíveis
 * @param refrigerant - Refrigerante (ex: "R404A")
 * @param tevap_c - Temperatura de evaporação (°C)
 * @param n_circuits - Número de circuitos do evaporador
 * @param required_capacity_kw - Capacidade requerida (kW)
 * @param nominal_kappa_ref - Kappa de referência para o modelo (padrão: kappa em Te=-10°C)
 * @returns Lista de válvulas adequadas ordenadas por adequação
 */
export function selectExpansionValve(
  valves: ExpansionValveRecord[],
  refrigerant: string,
  tevap_c: number,
  n_circuits: number,
  required_capacity_kw: number,
  nominal_kappa_ref?: number,
): ExpansionValveSelectorResult[] {
  const results: ExpansionValveSelectorResult[] = [];

  for (const valve of valves) {
    // Verificar faixa de circuitos
    const minC = valve.circuits_min ?? 1;
    const maxC = valve.circuits_max ?? 99;
    if (n_circuits < minC || n_circuits > maxC) continue;

    // Obter curva kappa para o refrigerante
    const curve = valve.kappa_curves?.[refrigerant];
    if (!curve || curve.length === 0) continue;

    // Interpolar kappa na temperatura de evaporação
    const kappa = interpolateKappa(curve, tevap_c);
    if (kappa <= 0) continue;

    // Estimar capacidade: kappa × capacidade nominal (kappa=1 em condição de referência)
    // O kappa é relativo: kappa=1 corresponde à capacidade nominal do modelo
    // Para estimar a capacidade real, precisamos do kappa de referência
    const kappaRef = nominal_kappa_ref ?? interpolateKappa(curve, -10);
    const estimated_capacity_kw = kappaRef > 0 ? required_capacity_kw * (kappa / kappaRef) : undefined;

    results.push({ valve, kappa, estimated_capacity_kw });
  }

  // Ordenar: primeiro os que têm circuitos compatíveis, depois por kappa mais próximo de 1
  results.sort((a, b) => {
    const aDiff = Math.abs(a.kappa - 1);
    const bDiff = Math.abs(b.kappa - 1);
    return aDiff - bDiff;
  });

  return results;
}

function interpolateKappa(curve: KappaPoint[], tevap_c: number): number {
  if (curve.length === 0) return 0;
  const sorted = [...curve].sort((a, b) => a.tevap_c - b.tevap_c);
  if (tevap_c <= sorted[0].tevap_c) return sorted[0].kappa;
  if (tevap_c >= sorted[sorted.length - 1].tevap_c) return sorted[sorted.length - 1].kappa;
  for (let i = 0; i < sorted.length - 1; i++) {
    const t0 = sorted[i].tevap_c, t1 = sorted[i + 1].tevap_c;
    if (tevap_c >= t0 && tevap_c <= t1) {
      const frac = (tevap_c - t0) / (t1 - t0);
      return sorted[i].kappa + frac * (sorted[i + 1].kappa - sorted[i].kappa);
    }
  }
  return sorted[sorted.length - 1].kappa;
}
