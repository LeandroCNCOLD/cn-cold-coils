/**
 * Parâmetros para cálculo de eficiência de aleta.
 * Quando tube_diameter_m, tube_pitch_transversal_m e tube_pitch_longitudinal_m
 * são fornecidos, usa Schmidt (1949) para calcular L_c real.
 * Caso contrário, usa estimativa conservadora.
 */
export interface FinEfficiencyParams {
  h_air_w_m2k: number;
  finConductivity_w_mk: number;
  finThickness_m: number;
  /** Diâmetro externo do tubo [m] — necessário para Schmidt (1949) */
  tube_diameter_m?: number;
  /** Passo transversal dos tubos [m] — necessário para Schmidt (1949) */
  tube_pitch_transversal_m?: number;
  /** Passo longitudinal dos tubos [m] — necessário para Schmidt (1949) */
  tube_pitch_longitudinal_m?: number;
  /** Passo de aleta (fin pitch) [m] — fallback quando geometria de tubo incompleta */
  fin_pitch_m?: number;
}

export interface FinEfficiencyResult {
  finEfficiency: number;
  warnings: string[];
}

/**
 * Calcula a eficiência de aleta usando Schmidt (1949) quando a geometria
 * completa está disponível, ou uma estimativa conservadora caso contrário.
 *
 * Schmidt (1949):
 *   r_e  = D_o / 2
 *   M    = sqrt(Pt² + Pl²) / 2  (arranjo triangular/misto)
 *        = Pt / 2               (arranjo quadrado, Pt ≈ Pl)
 *   r_eq = 1.27 · r_e · (M/r_e) · sqrt(M/r_e − 0.3)
 *   L_c  = r_eq − r_e + t/2
 *
 * Fonte: Schmidt, T.E. (1949), Chem. Eng. Technol. 21, 715–724.
 */
export function calculateFinEfficiencySimplified(params: FinEfficiencyParams): FinEfficiencyResult {
  const { h_air_w_m2k, finConductivity_w_mk, finThickness_m } = params;
  const warnings: string[] = [];

  if (finConductivity_w_mk <= 0 || finThickness_m <= 0 || h_air_w_m2k <= 0) {
    warnings.push(
      "Dados insuficientes para cálculo de eficiência de aleta; usando valor conservador 0.85",
    );
    return { finEfficiency: 0.85, warnings };
  }

  const m = Math.sqrt((2 * h_air_w_m2k) / (finConductivity_w_mk * finThickness_m));

  // Determinar L_c via Schmidt (1949) se geometria disponível
  let L_c: number;
  const r_e = params.tube_diameter_m ? params.tube_diameter_m / 2 : 0;
  const Pt = params.tube_pitch_transversal_m ?? 0;
  const Pl = params.tube_pitch_longitudinal_m ?? 0;

  if (r_e > 0 && Pt > 0 && Pl > 0) {
    // Arranjo quadrado: M = Pt/2; arranjo triangular: M = sqrt(Pt²+Pl²)/2
    const M = Math.abs(Pt - Pl) < 0.001 ? Pt / 2 : Math.sqrt(Pt * Pt + Pl * Pl) / 2;
    const ratio = M / r_e;
    if (ratio <= 0.3) {
      // Geometria inválida para Schmidt — fallback
      L_c = 0.015;
      warnings.push("Schmidt (1949): razão M/r_e ≤ 0.3 — usando L_c = 15 mm");
    } else {
      const r_eq = 1.27 * r_e * ratio * Math.sqrt(ratio - 0.3);
      L_c = Math.max(r_eq - r_e + finThickness_m / 2, finThickness_m);
    }
  } else if (params.fin_pitch_m && params.fin_pitch_m > 0) {
    // Fallback: L_c ≈ metade do passo de aleta
    L_c = params.fin_pitch_m / 2;
    warnings.push("Schmidt (1949): geometria de tubo incompleta — usando L_c = fin_pitch/2");
  } else {
    // Fallback conservador: L_c = 15 mm (aleta típica de evaporador)
    L_c = 0.015;
    warnings.push("Schmidt (1949): geometria ausente — usando L_c = 15 mm (estimativa)");
  }

  const mL = m * L_c;
  const eta = mL > 0 ? Math.tanh(mL) / mL : 1;
  const clamped = Math.max(0, Math.min(1, eta));

  if (clamped < 0.5) {
    warnings.push(`Eficiência de aleta muito baixa (${clamped.toFixed(3)}) — verificar geometria`);
  }

  return { finEfficiency: clamped, warnings };
}
