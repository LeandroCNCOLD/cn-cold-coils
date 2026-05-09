/**
 * Cálculo da área externa total de um trocador de calor aletado.
 *
 * A área externa total é composta por:
 *   A_total = A_bare + A_fin
 *
 * onde:
 *   A_bare = área do tubo nu entre aletas
 *          = π · D_o · L_tube · (1 − t_fin / p_fin) · N_tubes
 *   A_fin  = área de uma aleta × número de aletas
 *          = [2 · (W_fin · H_fin − π · D_o² / 4) + π · D_o · t_fin] · N_fins
 *
 * Fontes:
 *   - Schmidt, T.E. (1949), Chem. Eng. Technol. 21, 715–724.
 *   - Wang, C.-C. et al. (1999), Int. J. Heat Mass Transfer 42, 1945–1956.
 */

export interface FinnedExternalAreaParams {
  /** Número de fileiras de tubos */
  rows: number;
  /** Número de tubos por fileira */
  tubes_per_row: number;
  /** Comprimento do tubo [m] */
  tube_length_m: number;
  /** Diâmetro externo do tubo [m] */
  tube_outer_diameter_m: number;
  /** Espessura da aleta [m] */
  fin_thickness_m: number;
  /** Passo de aleta (fin pitch) [m] — distância centro a centro entre aletas */
  fin_pitch_m: number;
  /** Passo transversal dos tubos [m] */
  tube_pitch_transversal_m: number;
  /** Passo longitudinal dos tubos [m] */
  tube_pitch_longitudinal_m: number;
}

export interface FinnedExternalAreaResult {
  /** Área do tubo nu entre aletas [m²] */
  A_bare_m2: number;
  /** Área total das aletas [m²] */
  A_fin_m2: number;
  /** Área externa total (tubo nu + aletas) [m²] */
  A_total_m2: number;
  /** Número total de aletas */
  N_fins: number;
  warnings: string[];
}

export function computeFinnedExternalArea(
  params: FinnedExternalAreaParams,
): FinnedExternalAreaResult {
  const {
    rows,
    tubes_per_row,
    tube_length_m,
    tube_outer_diameter_m,
    fin_thickness_m,
    fin_pitch_m,
    tube_pitch_transversal_m,
    tube_pitch_longitudinal_m,
  } = params;

  const warnings: string[] = [];

  const N_tubes = rows * tubes_per_row;
  if (N_tubes <= 0) {
    warnings.push("N_tubes = 0 — verificar rows e tubes_per_row");
    return { A_bare_m2: 0, A_fin_m2: 0, A_total_m2: 0, N_fins: 0, warnings };
  }

  if (fin_pitch_m <= fin_thickness_m) {
    warnings.push("fin_pitch_m ≤ fin_thickness_m — geometria inválida");
    return { A_bare_m2: 0, A_fin_m2: 0, A_total_m2: 0, N_fins: 0, warnings };
  }

  // Número de aletas por tubo
  const N_fins_per_tube = Math.floor(tube_length_m / fin_pitch_m);
  const N_fins = N_fins_per_tube * N_tubes;

  // Área do tubo nu entre aletas
  const bare_fraction = 1 - fin_thickness_m / fin_pitch_m;
  const A_bare_m2 =
    Math.PI * tube_outer_diameter_m * tube_length_m * bare_fraction * N_tubes;

  // Área de uma aleta (placa retangular com furo circular)
  const W_fin = tube_pitch_transversal_m;
  const H_fin = tube_pitch_longitudinal_m;
  const A_fin_one_side =
    W_fin * H_fin - (Math.PI * tube_outer_diameter_m * tube_outer_diameter_m) / 4;
  // Dois lados + borda da aleta ao redor do tubo
  const A_fin_edge = Math.PI * tube_outer_diameter_m * fin_thickness_m;
  const A_fin_one_fin = 2 * A_fin_one_side + A_fin_edge;

  if (A_fin_one_fin <= 0) {
    warnings.push("Área de uma aleta ≤ 0 — verificar passo de tubo e diâmetro");
  }

  const A_fin_m2 = Math.max(A_fin_one_fin * N_fins, 0);
  const A_total_m2 = A_bare_m2 + A_fin_m2;

  if (A_total_m2 < 0.01 && N_tubes > 0) {
    warnings.push(`Área total muito baixa (${A_total_m2.toFixed(4)} m²) — verificar geometria`);
  }

  return { A_bare_m2, A_fin_m2, A_total_m2, N_fins, warnings };
}
