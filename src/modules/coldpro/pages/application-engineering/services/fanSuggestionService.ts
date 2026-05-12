/**
 * fanSuggestionService.ts
 *
 * Sugere o ventilador (diâmetro) e a quantidade compatíveis com a geometria
 * do aletado (comprimento × altura) E com a vazão de ar necessária para
 * atender a demanda térmica da serpentina.
 *
 * Fluxo correto:
 *   1. Calcular vazão necessária a partir da carga térmica (Q_req, ΔT, ρ_ar, cp_ar)
 *   2. Encontrar o menor ventilador que:
 *      a) caiba fisicamente na geometria (diâmetro ≤ altura × 0.92)
 *      b) com N unidades ≤ maxCount entregue ≥ required_airflow_m3h
 *   3. Se nenhum ventilador atender ambos os critérios → fits = false
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
 * Calcula a vazão de ar necessária para remover uma carga térmica Q_req [W]
 * com uma diferença de temperatura ΔT_k [K] entre entrada e saída do ar.
 *
 * V̇ = Q / (ρ_ar × cp_ar × ΔT)  [m³/s] → × 3600 → [m³/h]
 *
 * Propriedades do ar a ~20°C:
 *   ρ = 1.20 kg/m³  |  cp = 1006 J/(kg·K)
 */
export function calcRequiredAirflow(q_req_w: number, delta_t_k: number): number {
  const rho_air = 1.20; // kg/m³
  const cp_air = 1006;  // J/(kg·K)
  if (delta_t_k <= 0 || q_req_w <= 0) return 0;
  const m_dot = q_req_w / (cp_air * delta_t_k); // kg/s
  return (m_dot / rho_air) * 3600;              // m³/h
}

/**
 * Seleciona o ventilador mais adequado para uma geometria de serpentina,
 * considerando:
 *   1. Encaixe físico: diâmetro ≤ altura × 0.92 E pelo menos 1 unidade cabe
 *      ao longo do comprimento.
 *   2. Vazão necessária: N ventiladores (N ≤ maxCount) entregam ≥ required_airflow_m3h.
 *
 * Estratégia de seleção:
 *   - Itera os modelos do menor para o maior diâmetro.
 *   - Para cada modelo que cabe fisicamente, calcula quantas unidades são
 *     necessárias para atingir required_airflow_m3h.
 *   - Escolhe o modelo que atende com o MENOR número de ventiladores
 *     (e, em caso de empate, o de menor diâmetro → menor custo).
 *   - Se nenhum modelo atender → fits = false.
 *
 * @param length_mm             Comprimento do aletado [mm]
 * @param height_mm             Altura do aletado [mm]
 * @param maxCount              Quantidade máxima de ventiladores permitida
 * @param required_airflow_m3h  Vazão mínima necessária [m³/h] (0 = sem restrição)
 */
export function suggestFans(
  length_mm: number,
  height_mm: number,
  maxCount: number,
  required_airflow_m3h = 0,
): FanSuggestion {
  if (!length_mm || !height_mm || maxCount < 1) {
    return { model: null, count: 0, total_airflow_m3h: 0, fits: false };
  }

  // Candidatos que cabem fisicamente na geometria
  const fittingCandidates: Array<{
    fan: FanModel;
    maxPhysicalCount: number;
  }> = [];

  for (const fan of FAN_LIBRARY) {
    // Critério de altura: diâmetro deve caber com 8% de folga
    if (fan.diameter_mm > height_mm * 0.92) continue;
    // Critério de comprimento: quantas unidades cabem lado a lado
    const fitsAlongLength = Math.floor((length_mm * 0.95) / fan.diameter_mm);
    if (fitsAlongLength < 1) continue;
    fittingCandidates.push({
      fan,
      maxPhysicalCount: Math.min(maxCount, fitsAlongLength),
    });
  }

  if (!fittingCandidates.length) {
    return { model: null, count: 0, total_airflow_m3h: 0, fits: false };
  }

  // Se não há restrição de vazão, retornar o que entrega maior vazão total
  // (comportamento legado — usado quando required_airflow_m3h não é fornecido)
  if (required_airflow_m3h <= 0) {
    let best: FanSuggestion | null = null;
    for (const { fan, maxPhysicalCount } of fittingCandidates) {
      const total = maxPhysicalCount * fan.airflow_m3h;
      if (!best || total > best.total_airflow_m3h) {
        best = { model: fan, count: maxPhysicalCount, total_airflow_m3h: total, fits: true };
      }
    }
    return best ?? { model: null, count: 0, total_airflow_m3h: 0, fits: false };
  }

  // Com restrição de vazão: encontrar o modelo que atende com MENOS ventiladores
  // (menor custo / menor consumo elétrico)
  let bestResult: FanSuggestion | null = null;

  for (const { fan, maxPhysicalCount } of fittingCandidates) {
    // Quantas unidades deste modelo são necessárias para atingir a vazão requerida?
    const neededCount = Math.ceil(required_airflow_m3h / fan.airflow_m3h);
    if (neededCount > maxPhysicalCount) continue; // não consegue atender dentro do limite
    if (neededCount < 1) continue;

    const total = neededCount * fan.airflow_m3h;

    // Preferir: menor número de ventiladores; em empate, menor diâmetro (menor custo)
    if (
      !bestResult ||
      neededCount < bestResult.count ||
      (neededCount === bestResult.count &&
        fan.diameter_mm < (bestResult.model?.diameter_mm ?? Infinity))
    ) {
      bestResult = { model: fan, count: neededCount, total_airflow_m3h: total, fits: true };
    }
  }

  // Se nenhum modelo atende a vazão requerida, retornar fits=false com o melhor físico
  if (!bestResult) {
    let maxFlow: FanSuggestion | null = null;
    for (const { fan, maxPhysicalCount } of fittingCandidates) {
      const total = maxPhysicalCount * fan.airflow_m3h;
      if (!maxFlow || total > maxFlow.total_airflow_m3h) {
        maxFlow = { model: fan, count: maxPhysicalCount, total_airflow_m3h: total, fits: false };
      }
    }
    return maxFlow ?? { model: null, count: 0, total_airflow_m3h: 0, fits: false };
  }

  return bestResult;
}
