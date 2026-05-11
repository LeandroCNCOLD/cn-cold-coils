/**
 * fanSuggestionService.ts
 *
 * Sugere o ventilador (diâmetro) e a quantidade compatíveis com a geometria
 * do aletado (comprimento × altura) respeitando um limite máximo de unidades
 * imposto pelo engenheiro.
 *
 * A vazão de ar do evaporador deixa de ser entrada do usuário e passa a ser
 * uma SUGESTÃO do sistema, calculada por candidato durante a busca.
 */

export interface FanModel {
  diameter_mm: number;
  /** Vazão nominal por ventilador, em m³/h, em baixa pressão estática. */
  airflow_m3h: number;
  label: string;
}

// Biblioteca curada de ventiladores axiais típicos para evaporadores comerciais
export const FAN_LIBRARY: FanModel[] = [
  { diameter_mm: 200, airflow_m3h: 700, label: "Axial Ø200" },
  { diameter_mm: 250, airflow_m3h: 1200, label: "Axial Ø250" },
  { diameter_mm: 300, airflow_m3h: 1800, label: "Axial Ø300" },
  { diameter_mm: 350, airflow_m3h: 2600, label: "Axial Ø350" },
  { diameter_mm: 400, airflow_m3h: 3500, label: "Axial Ø400" },
  { diameter_mm: 450, airflow_m3h: 4800, label: "Axial Ø450" },
  { diameter_mm: 500, airflow_m3h: 6500, label: "Axial Ø500" },
  { diameter_mm: 560, airflow_m3h: 8500, label: "Axial Ø560" },
  { diameter_mm: 630, airflow_m3h: 11000, label: "Axial Ø630" },
  { diameter_mm: 710, airflow_m3h: 14500, label: "Axial Ø710" },
  { diameter_mm: 800, airflow_m3h: 19000, label: "Axial Ø800" },
];

export interface FanSuggestion {
  model: FanModel | null;
  count: number;
  total_airflow_m3h: number;
  fits: boolean;
}

/**
 * Procura o ventilador de MAIOR vazão total possível que:
 *   • caiba na altura do aletado (com margem de 8%);
 *   • caiba lado a lado no comprimento (com margem de 5%);
 *   • respeite o limite máximo de ventiladores do engenheiro.
 */
export function suggestFans(
  length_mm: number,
  height_mm: number,
  maxCount: number,
): FanSuggestion {
  if (!length_mm || !height_mm || maxCount < 1) {
    return { model: null, count: 0, total_airflow_m3h: 0, fits: false };
  }

  let best: FanSuggestion | null = null;
  for (const fan of FAN_LIBRARY) {
    if (fan.diameter_mm > height_mm * 0.92) continue;
    const fitsAlongLength = Math.floor((length_mm * 0.95) / fan.diameter_mm);
    if (fitsAlongLength < 1) continue;
    const count = Math.min(maxCount, fitsAlongLength);
    const total = count * fan.airflow_m3h;
    if (!best || total > best.total_airflow_m3h) {
      best = { model: fan, count, total_airflow_m3h: total, fits: true };
    }
  }

  return best ?? { model: null, count: 0, total_airflow_m3h: 0, fits: false };
}
