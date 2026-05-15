/**
 * distributorService.ts
 *
 * Dimensionamento e seleção automática do distribuidor de refrigerante
 * para evaporadores DX. Usa o catálogo Danfoss série 069G.
 *
 * Física:
 *   ΔP_dist [kPa] = κ × (ṁ_per_circuit [kg/h])² / 1000
 *   onde κ é obtido da tabela distributorKappaFull por IdGrandezzaForo, fluido e TEvap.
 *
 * Faixa ideal: 30–60 kPa. Mínimo: 20 kPa. Máximo: 80 kPa.
 */
import type { DistributorComplete, DistributorKappaRow } from "@/modules/cn_coils/types/catalogs";

export interface DistributorInput {
  n_circuits: number;
  refrigerant: string;
  te_c: number;
  q_total_w: number;
}

export interface DistributorResult {
  model_code: string;
  tipologia: string;
  n_circuits_min: number;
  n_circuits_max: number;
  id_grandezza: number;
  odm: string;
  L_mm: number;
  L1_mm: number | null;
  D_mm: number;
  peso_kg: number;
  kappa: number;
  m_dot_total_kgh: number;
  m_dot_per_circuit_kgh: number;
  dp_distributor_kpa: number;
  dp_status: "ok" | "warning" | "error";
  dp_message: string;
  is_recommended: boolean;
  warnings: string[];
}

export interface CircuitOptimizationResult {
  optimal_circuits: number;
  dp_kpa: number;
  dp_status: "ok" | "warning" | "error";
  mass_velocity_kg_m2s: number;
  mass_velocity_status: "ok" | "warning" | "error";
  reason: string;
  alternatives: Array<{
    circuits: number;
    dp_kpa: number;
    mass_velocity_kg_m2s: number;
    score: number;
  }>;
}

/**
 * Estima h_fg [kJ/kg] para os refrigerantes mais comuns na faixa -40°C a +10°C.
 * Interpolação linear entre pontos tabelados.
 */
export function estimateHfg(refrigerant: string, te_c: number): number {
  const hfgTable: Record<string, { te: number[]; hfg: number[] }> = {
    R404A:  { te: [-40,-30,-20,-10,0,10], hfg: [163,155,146,136,125,113] },
    R507A:  { te: [-40,-30,-20,-10,0,10], hfg: [162,154,145,135,124,112] },
    R507:   { te: [-40,-30,-20,-10,0,10], hfg: [162,154,145,135,124,112] },
    R134a:  { te: [-40,-30,-20,-10,0,10], hfg: [204,197,190,182,173,163] },
    R22:    { te: [-40,-30,-20,-10,0,10], hfg: [218,210,201,191,180,168] },
    R407C:  { te: [-40,-30,-20,-10,0,10], hfg: [215,207,198,188,177,165] },
    R410A:  { te: [-40,-30,-20,-10,0,10], hfg: [200,193,185,176,166,155] },
    R448A:  { te: [-40,-30,-20,-10,0,10], hfg: [185,178,170,161,151,140] },
    R449A:  { te: [-40,-30,-20,-10,0,10], hfg: [183,176,168,159,149,138] },
    R452A:  { te: [-40,-30,-20,-10,0,10], hfg: [170,163,155,147,138,128] },
    R290:   { te: [-40,-30,-20,-10,0,10], hfg: [390,380,369,357,344,330] },
    R717:   { te: [-40,-30,-20,-10,0,10], hfg: [1368,1328,1285,1240,1191,1139] },
  };
  const key = Object.keys(hfgTable).find(
    (k) => k.toLowerCase() === refrigerant.toLowerCase().replace(/\s/g, "")
  ) ?? "R404A";
  const { te, hfg } = hfgTable[key];
  if (te_c <= te[0]) return hfg[0];
  if (te_c >= te[te.length - 1]) return hfg[te.length - 1];
  for (let i = 0; i < te.length - 1; i++) {
    if (te_c >= te[i] && te_c <= te[i + 1]) {
      const t = (te_c - te[i]) / (te[i + 1] - te[i]);
      return hfg[i] + t * (hfg[i + 1] - hfg[i]);
    }
  }
  return hfg[0];
}

/**
 * Interpola κ da tabela distributorKappaFull para o IdGrandezzaForo, fluido e TEvap dados.
 * Usa interpolação linear entre os dois pontos de temperatura mais próximos.
 */
export function getKappaFromFull(
  kappaFull: DistributorKappaRow[],
  idGrandezzaForo: number,
  refrigerant: string,
  te_c: number,
): number {
  const refNorm = refrigerant.replace(/\s/g, "").toUpperCase();
  let rows = kappaFull.filter(
    (r) =>
      r.IdGrandezzaForo === idGrandezzaForo &&
      r.Refrigerante.replace(/\s/g, "").toUpperCase().startsWith(refNorm.slice(0, 4)),
  );
  if (!rows.length) {
    // Fallback: R404A
    rows = kappaFull.filter(
      (r) => r.IdGrandezzaForo === idGrandezzaForo && r.Refrigerante === "R404A",
    );
  }
  if (!rows.length) return 0.5;
  const sorted = rows.sort((a, b) => a.TEvap - b.TEvap);
  if (te_c <= sorted[0].TEvap) return sorted[0].Kappa;
  if (te_c >= sorted[sorted.length - 1].TEvap) return sorted[sorted.length - 1].Kappa;
  for (let i = 0; i < sorted.length - 1; i++) {
    if (te_c >= sorted[i].TEvap && te_c <= sorted[i + 1].TEvap) {
      const t = (te_c - sorted[i].TEvap) / (sorted[i + 1].TEvap - sorted[i].TEvap);
      return sorted[i].Kappa + t * (sorted[i + 1].Kappa - sorted[i].Kappa);
    }
  }
  return sorted[0].Kappa;
}

/**
 * Calcula ΔP do distribuidor para um número de circuitos e capacidade dados.
 * Útil para cálculos rápidos sem seleção de modelo.
 */
export function calcDistributorDp(
  kappaFull: DistributorKappaRow[],
  idGrandezzaForo: number,
  refrigerant: string,
  te_c: number,
  q_total_w: number,
  n_circuits: number,
): number {
  if (n_circuits <= 0 || q_total_w <= 0) return 0;
  const h_fg = estimateHfg(refrigerant, te_c);
  const m_dot_total_kgh = (q_total_w / 1000 / h_fg) * 3600;
  const m_dot_per_circuit = m_dot_total_kgh / n_circuits;
  const kappa = getKappaFromFull(kappaFull, idGrandezzaForo, refrigerant, te_c);
  return kappa * Math.pow(m_dot_per_circuit, 2) / 1000;
}

/**
 * Seleciona e dimensiona o distribuidor Danfoss 069G para o evaporador.
 *
 * Lógica de seleção:
 *  1. Filtrar modelos onde NCircuiti_Min ≤ n_circuits ≤ NCircuiti_Max
 *  2. Selecionar o de menor IdGrandezza (furo menor = melhor distribuição uniforme)
 *  3. Fallback: modelo com NCircuiti_Max mais próximo
 *  4. Calcular ΔP com κ interpolado da tabela real
 */
export function selectDistributor(
  catalog: DistributorComplete,
  kappaFull: DistributorKappaRow[],
  input: DistributorInput,
): DistributorResult {
  const { n_circuits, refrigerant, te_c, q_total_w } = input;
  const warnings: string[] = [];

  const h_fg = estimateHfg(refrigerant, te_c);
  const m_dot_total_kgh = (q_total_w / 1000 / h_fg) * 3600;
  const m_dot_per_circuit_kgh = m_dot_total_kgh / n_circuits;

  // Filtrar modelos compatíveis com o número de circuitos
  let candidates = catalog.models.filter(
    (m) => (m.NCircuiti_Min ?? 0) <= n_circuits && (m.NCircuiti_Max ?? 999) >= n_circuits,
  );

  if (!candidates.length) {
    // Fallback: modelo com NCircuiti_Max mais próximo
    const sorted = [...catalog.models].sort(
      (a, b) =>
        Math.abs((a.NCircuiti_Max ?? 0) - n_circuits) -
        Math.abs((b.NCircuiti_Max ?? 0) - n_circuits),
    );
    candidates = sorted.slice(0, 3);
    warnings.push(
      `Nenhum modelo cobre exatamente ${n_circuits} circuitos — usando modelo mais próximo.`,
    );
  }

  // Selecionar menor IdGrandezza (furo menor = melhor distribuição)
  const best = candidates.sort((a, b) => (a.IdGrandezza ?? 99) - (b.IdGrandezza ?? 99))[0];
  const idGrandezzaForo = best.IdGrandezza ?? 1;
  const kappa = getKappaFromFull(kappaFull, idGrandezzaForo, refrigerant, te_c);
  const dp_distributor_kpa = kappa * Math.pow(m_dot_per_circuit_kgh, 2) / 1000;
  const dim = catalog.dimensions.find((d) => d.IdDimensioni === best.IdDimensioni);

  // Validar ΔP
  let dp_status: "ok" | "warning" | "error" = "ok";
  let dp_message = `ΔP distribuidor: ${dp_distributor_kpa.toFixed(1)} kPa — faixa ideal (30–60 kPa)`;

  if (dp_distributor_kpa < 20) {
    dp_status = "warning";
    dp_message = `ΔP: ${dp_distributor_kpa.toFixed(1)} kPa — abaixo de 20 kPa. Distribuição pode ser irregular.`;
    warnings.push("Considere reduzir o número de circuitos para aumentar o ΔP.");
  } else if (dp_distributor_kpa > 80) {
    dp_status = "error";
    dp_message = `ΔP: ${dp_distributor_kpa.toFixed(1)} kPa — acima de 80 kPa. Risco de queda de capacidade.`;
    warnings.push("Considere aumentar o número de circuitos para reduzir o ΔP.");
  } else if (dp_distributor_kpa < 30 || dp_distributor_kpa > 60) {
    dp_status = "warning";
    dp_message = `ΔP: ${dp_distributor_kpa.toFixed(1)} kPa — fora da faixa ideal (30–60 kPa).`;
  }

  return {
    model_code: String(best.Codice),
    tipologia: String(best.Tipologia ?? "069G"),
    n_circuits_min: best.NCircuiti_Min ?? n_circuits,
    n_circuits_max: best.NCircuiti_Max ?? n_circuits,
    id_grandezza: idGrandezzaForo,
    odm: String(dim?.ODM ?? "1/2\""),
    L_mm: dim?.L ?? 55,
    L1_mm: dim?.L1 ?? null,
    D_mm: dim?.D ?? 21,
    peso_kg: (dim as { Peso?: number })?.Peso ?? 0.1,
    kappa,
    m_dot_total_kgh,
    m_dot_per_circuit_kgh,
    dp_distributor_kpa,
    dp_status,
    dp_message,
    is_recommended: dp_status !== "error",
    warnings,
  };
}

/**
 * Encontra o número de circuitos que resulta em ΔP do distribuidor
 * mais próximo do alvo (padrão: 45 kPa, centro da faixa ideal 30–60 kPa).
 *
 * Score combinado: 60% ΔP do distribuidor + 40% velocidade de massa do fluido.
 * Restrição: n_circuits deve ser divisor exato de totalTubes (ou deixar ≤2 tubos inativos).
 */
export function optimizeCircuitsForDistributor(
  _catalog: DistributorComplete,
  kappaFull: DistributorKappaRow[],
  params: {
    totalTubes: number;
    refrigerant: string;
    te_c: number;
    q_total_w: number;
    tubeID_m: number;
    dp_target_kpa?: number;
  },
): CircuitOptimizationResult {
  const { totalTubes, refrigerant, te_c, q_total_w, tubeID_m } = params;
  const dp_target = params.dp_target_kpa ?? 45;

  if (totalTubes <= 0 || q_total_w <= 0 || tubeID_m <= 0) {
    return {
      optimal_circuits: Math.max(1, Math.round(totalTubes / 2)),
      dp_kpa: 0,
      dp_status: "warning",
      mass_velocity_kg_m2s: 0,
      mass_velocity_status: "warning",
      reason: "Dados insuficientes para otimização.",
      alternatives: [],
    };
  }

  const h_fg = estimateHfg(refrigerant, te_c);
  const m_dot_total_kgh = (q_total_w / 1000 / h_fg) * 3600;
  const m_dot_total_kgs = m_dot_total_kgh / 3600;
  const tubeArea = Math.PI * Math.pow(tubeID_m / 2, 2);
  const idGrandezzaForo = 1; // Menor furo = melhor distribuição

  const candidates: Array<{
    circuits: number;
    dp_kpa: number;
    mass_velocity_kg_m2s: number;
    score: number;
  }> = [];

  for (let c = 1; c <= totalTubes; c++) {
    // Aceitar apenas divisores exatos ou com ≤2 tubos inativos
    if (totalTubes % c > 2) continue;

    const m_dot_per_circuit_kgh = m_dot_total_kgh / c;
    const kappa = getKappaFromFull(kappaFull, idGrandezzaForo, refrigerant, te_c);
    const dp = kappa * Math.pow(m_dot_per_circuit_kgh, 2) / 1000;
    const mass_vel = tubeArea > 0 ? m_dot_total_kgs / (tubeArea * c) : 0;

    // Score combinado: ΔP tem peso 60%, velocidade de massa tem peso 40%
    const dp_err = Math.abs(dp - dp_target) / Math.max(dp_target, 1);
    const vel_err = Math.abs(mass_vel - 250) / 250;
    const score = 1 - (0.6 * Math.min(dp_err, 2) + 0.4 * Math.min(vel_err, 2));

    candidates.push({ circuits: c, dp_kpa: dp, mass_velocity_kg_m2s: mass_vel, score });
  }

  if (!candidates.length) {
    return {
      optimal_circuits: Math.max(1, Math.round(totalTubes / 2)),
      dp_kpa: 0,
      dp_status: "warning",
      mass_velocity_kg_m2s: 0,
      mass_velocity_status: "warning",
      reason: "Nenhuma combinação válida encontrada.",
      alternatives: [],
    };
  }

  candidates.sort((a, b) => b.score - a.score);
  const best = candidates[0];

  let dp_status: "ok" | "warning" | "error" = "ok";
  if (best.dp_kpa < 20 || best.dp_kpa > 80) dp_status = "error";
  else if (best.dp_kpa < 30 || best.dp_kpa > 60) dp_status = "warning";

  let mass_velocity_status: "ok" | "warning" | "error" = "ok";
  if (best.mass_velocity_kg_m2s < 100 || best.mass_velocity_kg_m2s > 400)
    mass_velocity_status = "error";
  else if (best.mass_velocity_kg_m2s < 150 || best.mass_velocity_kg_m2s > 350)
    mass_velocity_status = "warning";

  const reason = [
    `${best.circuits} circuitos → ΔP distribuidor: ${best.dp_kpa.toFixed(1)} kPa`,
    `Vel. de massa: ${Math.round(best.mass_velocity_kg_m2s)} kg/m²·s`,
    dp_status === "ok"
      ? "✓ Distribuição uniforme garantida"
      : "⚠ ΔP fora da faixa ideal (30–60 kPa)",
  ].join(" · ");

  return {
    optimal_circuits: best.circuits,
    dp_kpa: best.dp_kpa,
    dp_status,
    mass_velocity_kg_m2s: best.mass_velocity_kg_m2s,
    mass_velocity_status,
    reason,
    alternatives: candidates.slice(1, 4),
  };
}
