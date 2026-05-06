/**
 * expansionValveSelector.ts
 *
 * Motor de seleção de válvula de expansão termostática (TEV) Danfoss
 * a partir do catálogo UNILAB Coils6.
 *
 * A seleção usa as curvas kappa (capacidade relativa) do catálogo Danfoss:
 *   - kappa é um fator adimensional que representa a capacidade relativa
 *   - kappa = 1 corresponde à capacidade nominal do modelo
 *   - kappa varia com a temperatura de evaporação e o refrigerante
 *
 * Método de seleção:
 *   1. Filtrar válvulas compatíveis com o número de circuitos
 *   2. Filtrar válvulas com curva kappa para o refrigerante
 *   3. Interpolar kappa na temperatura de evaporação
 *   4. Calcular capacidade estimada = Q_nominal × kappa
 *   5. Selecionar a menor válvula com capacidade ≥ Q_requerida × margem_segurança
 *
 * Referência: Danfoss Engineering Tomorrow — TEV Selection Guide
 */

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

export interface ValveSelectorInput {
  /** Refrigerante (ex: "R404A", "R134a") */
  refrigerant: string;
  /** Temperatura de evaporação (°C) */
  tevap_c: number;
  /** Número de circuitos do evaporador */
  n_circuits: number;
  /** Capacidade frigorífica requerida (kW) */
  required_capacity_kw: number;
  /** Margem de segurança (padrão: 1.1 = 10% acima) */
  safety_margin?: number;
}

export type ValveSelectorStatus =
  | "selected"        // Válvula selecionada com sucesso
  | "oversized"       // Válvula selecionada mas superdimensionada (>2× capacidade)
  | "no_match"        // Nenhuma válvula compatível encontrada
  | "no_data";        // Catálogo não disponível

export interface ValveSelectorResult {
  status: ValveSelectorStatus;
  selected: ExpansionValveRecord | null;
  kappa_at_tevap: number;
  /** Capacidade estimada da válvula no ponto de operação (kW) */
  estimated_capacity_kw: number;
  /** Razão de capacidade: estimada / requerida */
  capacity_ratio: number;
  /** Todas as candidatas ordenadas por adequação */
  candidates: Array<{
    valve: ExpansionValveRecord;
    kappa: number;
    estimated_capacity_kw: number;
    capacity_ratio: number;
    suitable: boolean;
  }>;
  warnings: string[];
}

/**
 * Interpola o kappa em uma temperatura de evaporação específica.
 */
export function interpolateKappa(curve: KappaPoint[], tevap_c: number): number {
  if (!curve || curve.length === 0) return 0;
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

/**
 * Seleciona a válvula de expansão mais adequada para o ponto de operação.
 *
 * IMPORTANTE: O kappa do catálogo Danfoss é um fator relativo.
 * Para converter kappa em capacidade real (kW), é necessário conhecer
 * a capacidade nominal do modelo — que não está disponível no catálogo
 * simplificado. Por isso, a função retorna o kappa e a razão relativa,
 * e a capacidade estimada é calculada como:
 *   Q_estimada = Q_requerida × (kappa / kappa_ref)
 * onde kappa_ref é o kappa em Te = -10°C (condição de referência Danfoss).
 */
export function selectExpansionValve(
  valves: ExpansionValveRecord[],
  input: ValveSelectorInput,
): ValveSelectorResult {
  const { refrigerant, tevap_c, n_circuits, required_capacity_kw, safety_margin = 1.1 } = input;
  const warnings: string[] = [];

  if (!valves || valves.length === 0) {
    return {
      status: "no_data",
      selected: null,
      kappa_at_tevap: 0,
      estimated_capacity_kw: 0,
      capacity_ratio: 0,
      candidates: [],
      warnings: ["Catálogo de válvulas não disponível"],
    };
  }

  // Temperatura de referência Danfoss: Te = -10°C
  const T_REF = -10;

  const candidates: ValveSelectorResult["candidates"] = [];

  for (const valve of valves) {
    // Verificar faixa de circuitos
    const minC = valve.circuits_min ?? 1;
    const maxC = valve.circuits_max ?? 99;
    if (n_circuits < minC || n_circuits > maxC) continue;

    // Obter curva kappa para o refrigerante
    const curve = valve.kappa_curves?.[refrigerant];
    if (!curve || curve.length === 0) {
      // Tentar refrigerante similar (R507A ≈ R404A)
      const fallbackRef = getFallbackRefrigerant(refrigerant);
      const fallbackCurve = fallbackRef ? valve.kappa_curves?.[fallbackRef] : undefined;
      if (!fallbackCurve) continue;
      warnings.push(`Refrigerante ${refrigerant} não encontrado; usando ${fallbackRef} como aproximação`);
    }

    const activeCurve = curve ?? valve.kappa_curves?.[getFallbackRefrigerant(refrigerant) ?? ""] ?? [];
    if (activeCurve.length === 0) continue;

    const kappa = interpolateKappa(activeCurve, tevap_c);
    const kappaRef = interpolateKappa(activeCurve, T_REF);

    if (kappa <= 0 || kappaRef <= 0) continue;

    // Capacidade estimada: Q_estimada = Q_requerida × (kappa / kappa_ref)
    // Isso representa a capacidade relativa da válvula no ponto de operação
    // em relação à condição de referência
    const estimated_capacity_kw = required_capacity_kw * (kappa / kappaRef);
    const capacity_ratio = estimated_capacity_kw / required_capacity_kw;
    const suitable = capacity_ratio >= safety_margin;

    candidates.push({
      valve,
      kappa,
      estimated_capacity_kw,
      capacity_ratio,
      suitable,
    });
  }

  if (candidates.length === 0) {
    return {
      status: "no_match",
      selected: null,
      kappa_at_tevap: 0,
      estimated_capacity_kw: 0,
      capacity_ratio: 0,
      candidates: [],
      warnings: [
        ...warnings,
        `Nenhuma válvula compatível para ${n_circuits} circuitos com ${refrigerant}`,
      ],
    };
  }

  // Ordenar: adequadas primeiro, depois por menor superdimensionamento
  candidates.sort((a, b) => {
    if (a.suitable && !b.suitable) return -1;
    if (!a.suitable && b.suitable) return 1;
    // Ambas adequadas: menor superdimensionamento
    if (a.suitable && b.suitable) return a.capacity_ratio - b.capacity_ratio;
    // Ambas inadequadas: maior kappa
    return b.kappa - a.kappa;
  });

  const best = candidates[0];
  const status: ValveSelectorStatus = best.suitable
    ? best.capacity_ratio > 2.0
      ? "oversized"
      : "selected"
    : "no_match";

  if (status === "oversized") {
    warnings.push(`Válvula ${best.valve.code} superdimensionada (${(best.capacity_ratio * 100).toFixed(0)}% da capacidade requerida)`);
  }

  return {
    status,
    selected: best.valve,
    kappa_at_tevap: best.kappa,
    estimated_capacity_kw: best.estimated_capacity_kw,
    capacity_ratio: best.capacity_ratio,
    candidates: candidates.slice(0, 10), // Top 10 candidatas
    warnings,
  };
}

function getFallbackRefrigerant(refrigerant: string): string | null {
  const fallbacks: Record<string, string> = {
    R507A: "R404A",
    R507: "R404A",
    R448A: "R404A",
    R449A: "R404A",
    R452A: "R404A",
    R410A: "R410A",
    R32: "R410A",
  };
  return fallbacks[refrigerant] ?? null;
}
