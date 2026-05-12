/**
 * coilPointClassifier.ts
 *
 * Classifica cada ponto de operação do compressor em relação à capacidade
 * entregue pelo aletado. Distingue subdimensionamento, margem baixa, ideal,
 * superdimensionamento aceitável e superdimensionamento excessivo.
 *
 * Evaporador e condensador têm faixas diferentes porque o condensador tolera
 * mais oversize (rejeição de calor é menos sensível ao superdimensionamento).
 */

export type PointStatus =
  | "undersized"          // q_coil < q_req × 0.98 — não atende
  | "low_margin"          // 0.98 ≤ ratio < 1.05 — atende, mas com margem mínima
  | "ideal"               // 1.05 ≤ ratio ≤ 1.30 — faixa ótima
  | "acceptable_oversize" // 1.30 < ratio ≤ 1.60 — grande, mas tecnicamente aceitável
  | "oversized";          // ratio > 1.60 — muito grande, penalizar

export interface PointClassification {
  ratio: number;
  status: PointStatus;
  /** Score de contribuição para o candidato: positivo = bom, negativo = ruim */
  score: number;
  recommendation: string;
}

/**
 * Classifica um ponto de operação do evaporador.
 * Faixas mais rígidas: oversize excessivo gera problemas de controle e retorno
 * de líquido.
 */
export function classifyEvaporatorPoint(
  qCoilW: number,
  qRequiredW: number,
): PointClassification {
  const ratio = qRequiredW > 0 ? qCoilW / qRequiredW : 0;

  if (ratio < 0.98) {
    return {
      ratio,
      status: "undersized",
      score: -2,
      recommendation:
        "Evaporador subdimensionado. Aumentar área, airflow ou reduzir ΔT de projeto.",
    };
  }
  if (ratio < 1.05) {
    return {
      ratio,
      status: "low_margin",
      score: 0.6,
      recommendation:
        "Margem mínima. Funciona, mas sem folga para variações de operação.",
    };
  }
  if (ratio <= 1.30) {
    return {
      ratio,
      status: "ideal",
      score: 1.0,
      recommendation: "Evaporador adequado para este ponto de operação.",
    };
  }
  if (ratio <= 1.60) {
    return {
      ratio,
      status: "acceptable_oversize",
      score: 0.4,
      recommendation:
        "Evaporador com margem alta. Aceitável, mas pode causar ciclo liga/desliga excessivo.",
    };
  }
  return {
    ratio,
    status: "oversized",
    score: -0.5,
    recommendation:
      "Evaporador muito grande para este ponto. Risco de retorno de líquido e controle instável.",
  };
}

/**
 * Classifica um ponto de operação do condensador.
 * Faixas mais tolerantes: oversize moderado é aceitável (melhor rejeição de calor).
 */
export function classifyCondenserPoint(
  qCondW: number,
  qRejectW: number,
): PointClassification {
  const ratio = qRejectW > 0 ? qCondW / qRejectW : 0;

  if (ratio < 1.0) {
    return {
      ratio,
      status: "undersized",
      score: -2,
      recommendation:
        "Condensador subdimensionado. Aumentar área, airflow ou reduzir TD.",
    };
  }
  if (ratio <= 1.25) {
    return {
      ratio,
      status: "ideal",
      score: 1.0,
      recommendation: "Condensador adequado para este ponto de operação.",
    };
  }
  if (ratio <= 1.50) {
    return {
      ratio,
      status: "acceptable_oversize",
      score: 0.5,
      recommendation: "Condensador com margem alta. Aceitável tecnicamente.",
    };
  }
  return {
    ratio,
    status: "oversized",
    score: 0.1,
    recommendation:
      "Condensador muito grande. Penalizar por custo e tamanho.",
  };
}
