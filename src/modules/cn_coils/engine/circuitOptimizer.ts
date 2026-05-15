/**
 * CN COILS — Circuit Optimizer (v2)
 *
 * Sugere a circuitagem ideal combinando DOIS critérios ponderados:
 *  1. ΔP do distribuidor na faixa ideal (30–60 kPa) — PESO 60%
 *  2. Velocidade de massa do fluido (150–350 kg/m²·s, alvo 250) — PESO 40%
 *
 * Quando os parâmetros do distribuidor não estão disponíveis (modo legado),
 * usa apenas a velocidade de massa como critério (compatibilidade retroativa).
 *
 * Usa o distributorService para calcular o ΔP real com κ interpolado
 * da tabela Danfoss 069G (distributorKappaFull.json).
 */
import {
  estimateHfg,
  getKappaFromFull,
} from "@/modules/coldpro/pages/application-engineering/services/distributorService";
import type { DistributorKappaRow } from "@/modules/cn_coils/types/catalogs";

export type HeaderPosition = "LL" | "LR" | "RL" | "RR" | "TB" | "BT";

export interface CircuitSuggestion {
  optimalCircuits: number;
  massVelocity: number;           // kg/(m²·s)
  tubesPerCircuit: number;
  dp_distributor_kpa: number;     // ΔP do distribuidor resultante [kPa]
  dp_status: "ok" | "warning" | "error";
  status: "optimal" | "acceptable" | "warning";
  reason: string;
}

/** Parâmetros opcionais para cálculo do ΔP do distribuidor */
export interface DistributorOptParams {
  kappaFull: DistributorKappaRow[];
  refrigerant: string;
  te_c: number;
  q_total_w: number;
}

export function suggestOptimalCircuits(
  totalTubes: number,
  massFlowRate: number,           // kg/s total
  internalTubeDiameter: number,   // m
  _fluidType: string,
  distributorParams?: DistributorOptParams,
): CircuitSuggestion {
  if (totalTubes <= 0 || massFlowRate <= 0 || internalTubeDiameter <= 0) {
    return {
      optimalCircuits: Math.max(1, Math.round(totalTubes / 4)),
      massVelocity: 0,
      tubesPerCircuit: 4,
      dp_distributor_kpa: 0,
      dp_status: "warning",
      status: "warning",
      reason: "Dados insuficientes para otimização.",
    };
  }

  const tubeCrossSectionArea = Math.PI * Math.pow(internalTubeDiameter / 2, 2);
  const dp_target = 45; // kPa — centro da faixa ideal 30–60 kPa

  // Pré-calcular dados do distribuidor se disponíveis
  const hasDistributorData =
    !!distributorParams?.kappaFull?.length && (distributorParams?.q_total_w ?? 0) > 0;

  let m_dot_total_kgh = 0;
  if (hasDistributorData && distributorParams) {
    const h_fg = estimateHfg(distributorParams.refrigerant, distributorParams.te_c);
    m_dot_total_kgh = (distributorParams.q_total_w / 1000 / h_fg) * 3600;
  }

  const candidates: Array<{
    circuits: number;
    massVelocity: number;
    dp_kpa: number;
    score: number;
  }> = [];

  for (let circuits = 1; circuits <= totalTubes; circuits++) {
    // Aceitar apenas divisores exatos ou com ≤2 tubos inativos
    if (totalTubes % circuits > 2) continue;

    const massVelocity = massFlowRate / (tubeCrossSectionArea * circuits);

    // Score da velocidade de massa (alvo: 250 kg/m²·s)
    const vel_err = Math.abs(massVelocity - 250) / 250;
    const vel_score = Math.max(0, 1 - Math.min(vel_err, 2));

    // Score do ΔP do distribuidor
    let dp_kpa = 0;
    let dp_score = 0.5; // neutro quando sem dados

    if (hasDistributorData && distributorParams && m_dot_total_kgh > 0) {
      const m_dot_per_circuit = m_dot_total_kgh / circuits;
      const kappa = getKappaFromFull(
        distributorParams.kappaFull,
        1, // IdGrandezza=1 (menor furo = melhor distribuição)
        distributorParams.refrigerant,
        distributorParams.te_c,
      );
      dp_kpa = kappa * Math.pow(m_dot_per_circuit, 2) / 1000;
      const dp_err = Math.abs(dp_kpa - dp_target) / Math.max(dp_target, 1);
      dp_score = Math.max(0, 1 - Math.min(dp_err, 2));
    }

    // Score combinado: ΔP tem peso 60%, velocidade de massa tem peso 40%
    const score = hasDistributorData
      ? 0.6 * dp_score + 0.4 * vel_score
      : vel_score; // fallback legado: apenas velocidade de massa

    candidates.push({ circuits, massVelocity, dp_kpa, score });
  }

  if (!candidates.length) {
    return {
      optimalCircuits: 1,
      massVelocity: 0,
      tubesPerCircuit: totalTubes,
      dp_distributor_kpa: 0,
      dp_status: "warning",
      status: "warning",
      reason: "Nenhuma combinação válida encontrada.",
    };
  }

  candidates.sort((a, b) => b.score - a.score);
  const best = candidates[0];

  // Status do ΔP
  let dp_status: "ok" | "warning" | "error" = "ok";
  if (best.dp_kpa > 0) {
    if (best.dp_kpa < 20 || best.dp_kpa > 80) dp_status = "error";
    else if (best.dp_kpa < 30 || best.dp_kpa > 60) dp_status = "warning";
  }

  // Status geral e mensagem
  let status: CircuitSuggestion["status"] = "optimal";
  let reason = "";

  if (best.massVelocity < 150 || best.massVelocity > 350) {
    status = "warning";
    reason = `Vel. de massa: ${Math.round(best.massVelocity)} kg/m²·s (fora de 150–350).`;
  } else if (totalTubes % best.circuits !== 0) {
    status = "acceptable";
    reason = `Deixará ${totalTubes % best.circuits} tubo(s) inativo(s).`;
  }

  if (hasDistributorData && best.dp_kpa > 0) {
    const dpInfo = `ΔP distribuidor: ${best.dp_kpa.toFixed(1)} kPa`;
    if (dp_status === "ok") {
      reason = reason ? `${reason} · ${dpInfo} ✓` : `${dpInfo} — distribuição uniforme garantida.`;
      if (!reason.includes("inativo")) status = "optimal";
    } else {
      reason = reason
        ? `${reason} · ${dpInfo} ⚠`
        : `${dpInfo} — fora da faixa ideal (30–60 kPa).`;
      if (status === "optimal") status = "acceptable";
    }
  } else if (!reason) {
    reason = `Velocidade de massa: ${Math.round(best.massVelocity)} kg/m²·s — ideal.`;
  }

  return {
    optimalCircuits: best.circuits,
    massVelocity: best.massVelocity,
    tubesPerCircuit: Math.floor(totalTubes / best.circuits),
    dp_distributor_kpa: best.dp_kpa,
    dp_status,
    status,
    reason,
  };
}
