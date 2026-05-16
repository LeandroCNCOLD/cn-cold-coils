/**
 * startupReferenceEngine.ts
 * Sprint 3 — Motor de Referências de Start-up
 *
 * Gera o StartupReferenceSheet a partir do ProductTechnicalRecord.
 * Calcula todos os parâmetros de campo esperados (pressões, temperaturas,
 * correntes, carga de fluido) com tolerâncias e diagnósticos automáticos.
 *
 * Grupos de parâmetros:
 *   1. Pressões (manômetro)
 *   2. Temperaturas (termopar / termômetro)
 *   3. Elétrico (amperímetro / voltímetro)
 *   4. Ar (anemômetro / higrômetro)
 *   5. Carga de fluido
 */

import type {
  StartupReferenceSheet,
  StartupParameterGroup,
  StartupParameter,
  StartupParameterStatus,
  ProductTechnicalRecord,
  SystemComponentsInput,
  ElectricalAnalysis,
  ProgressiveCoilResult,
} from "../../domain/types";

// ─────────────────────────────────────────────────────────────────────────────
// Constantes de pressão de saturação por refrigerante (bar absoluto)
// Fonte: tabelas de saturação CoolProp 7.2 — valores interpolados linearmente
// Cobre a faixa de -40°C a +60°C para os refrigerantes mais comuns
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Tabela de pressão de saturação [bar absoluto] por temperatura [°C].
 * Formato: { refrigerant: { temp_c: pressure_bar } }
 * Temperaturas de -40 a +60°C em passos de 5°C.
 */
const SAT_PRESSURE_TABLE: Record<string, Record<number, number>> = {
  R404A: {
    [-40]: 3.73, [-35]: 4.47, [-30]: 5.32, [-25]: 6.29, [-20]: 7.40,
    [-15]: 8.65, [-10]: 10.06, [-5]: 11.64, [0]: 13.41, [5]: 15.37,
    [10]: 17.54, [15]: 19.94, [20]: 22.57, [25]: 25.46, [30]: 28.62,
    [35]: 32.06, [40]: 35.80, [45]: 39.86, [50]: 44.25, [55]: 49.00, [60]: 54.12,
  },
  R507A: {
    [-40]: 3.77, [-35]: 4.52, [-30]: 5.38, [-25]: 6.36, [-20]: 7.48,
    [-15]: 8.74, [-10]: 10.17, [-5]: 11.77, [0]: 13.56, [5]: 15.55,
    [10]: 17.76, [15]: 20.20, [20]: 22.88, [25]: 25.82, [30]: 29.03,
    [35]: 32.53, [40]: 36.33, [45]: 40.46, [50]: 44.93, [55]: 49.76, [60]: 54.97,
  },
  R134a: {
    [-40]: 0.51, [-35]: 0.66, [-30]: 0.84, [-25]: 1.06, [-20]: 1.33,
    [-15]: 1.64, [-10]: 2.01, [-5]: 2.44, [0]: 2.93, [5]: 3.50,
    [10]: 4.15, [15]: 4.88, [20]: 5.72, [25]: 6.65, [30]: 7.70,
    [35]: 8.87, [40]: 10.17, [45]: 11.61, [50]: 13.19, [55]: 14.93, [60]: 16.83,
  },
  R448A: {
    [-40]: 3.14, [-35]: 3.78, [-30]: 4.52, [-25]: 5.37, [-20]: 6.33,
    [-15]: 7.43, [-10]: 8.67, [-5]: 10.07, [0]: 11.63, [5]: 13.37,
    [10]: 15.30, [15]: 17.43, [20]: 19.78, [25]: 22.36, [30]: 25.19,
    [35]: 28.28, [40]: 31.65, [45]: 35.31, [50]: 39.28, [55]: 43.58, [60]: 48.23,
  },
  R449A: {
    [-40]: 3.12, [-35]: 3.76, [-30]: 4.49, [-25]: 5.34, [-20]: 6.30,
    [-15]: 7.39, [-10]: 8.63, [-5]: 10.02, [0]: 11.58, [5]: 13.31,
    [10]: 15.23, [15]: 17.35, [20]: 19.69, [25]: 22.26, [30]: 25.07,
    [35]: 28.15, [40]: 31.50, [45]: 35.14, [50]: 39.09, [55]: 43.37, [60]: 48.00,
  },
  R22: {
    [-40]: 1.01, [-35]: 1.26, [-30]: 1.55, [-25]: 1.89, [-20]: 2.29,
    [-15]: 2.75, [-10]: 3.27, [-5]: 3.87, [0]: 4.55, [5]: 5.30,
    [10]: 6.15, [15]: 7.09, [20]: 8.14, [25]: 9.30, [30]: 10.58,
    [35]: 11.99, [40]: 13.53, [45]: 15.22, [50]: 17.06, [55]: 19.06, [60]: 21.23,
  },
  R407C: {
    [-40]: 2.03, [-35]: 2.49, [-30]: 3.02, [-25]: 3.64, [-20]: 4.35,
    [-15]: 5.16, [-10]: 6.08, [-5]: 7.12, [0]: 8.29, [5]: 9.60,
    [10]: 11.06, [15]: 12.68, [20]: 14.47, [25]: 16.44, [30]: 18.61,
    [35]: 20.98, [40]: 23.57, [45]: 26.39, [50]: 29.46, [55]: 32.79, [60]: 36.40,
  },
  R410A: {
    [-40]: 4.77, [-35]: 5.72, [-30]: 6.82, [-25]: 8.07, [-20]: 9.50,
    [-15]: 11.11, [-10]: 12.92, [-5]: 14.94, [0]: 17.18, [5]: 19.66,
    [10]: 22.39, [15]: 25.39, [20]: 28.67, [25]: 32.25, [30]: 36.14,
    [35]: 40.36, [40]: 44.93, [45]: 49.87, [50]: 55.20, [55]: 60.93, [60]: 67.09,
  },
  // HFOs / naturais — Richter 2011, Thol & Lemmon 2016, Tillner-Roth 1994, Lemmon 2006
  R1234YF: {
    [-40]: 0.51, [-35]: 0.62, [-30]: 0.88, [-25]: 1.17, [-20]: 1.33,
    [-15]: 1.55, [-10]: 1.89, [-5]: 2.30, [0]: 2.94, [5]: 3.90,
    [10]: 5.10, [15]: 5.82, [20]: 6.74, [25]: 7.87, [30]: 9.19,
    [35]: 10.65, [40]: 12.20, [45]: 14.03, [50]: 16.12,
  },
  R1234ZEE: {
    [-40]: 0.35, [-35]: 0.44, [-30]: 0.60, [-25]: 0.79, [-20]: 0.98,
    [-15]: 1.22, [-10]: 1.52, [-5]: 1.88, [0]: 2.02, [5]: 2.95,
    [10]: 3.86, [15]: 4.63, [20]: 5.54, [25]: 6.65, [30]: 7.97,
    [35]: 9.52, [40]: 11.32, [45]: 13.42, [50]: 15.84,
  },
  R32: {
    [-40]: 2.35, [-35]: 3.07, [-30]: 3.19, [-25]: 4.09, [-20]: 4.22,
    [-15]: 4.99, [-10]: 5.50, [-5]: 6.59, [0]: 7.92, [5]: 9.24,
    [10]: 10.86, [15]: 12.67, [20]: 14.78, [25]: 17.12, [30]: 19.73,
    [35]: 22.57, [40]: 25.80, [45]: 29.37, [50]: 33.30,
  },
  R290: {
    [-40]: 1.61, [-35]: 2.01, [-30]: 2.09, [-25]: 2.62, [-20]: 2.72,
    [-15]: 3.22, [-10]: 3.54, [-5]: 4.20, [0]: 4.74, [5]: 5.78,
    [10]: 6.79, [15]: 7.98, [20]: 9.32, [25]: 10.85, [30]: 12.57,
    [35]: 14.49, [40]: 16.62, [45]: 19.00, [50]: 21.62,
  },
};

/**
 * Interpola a pressão de saturação para uma temperatura qualquer.
 * Usa interpolação linear entre os pontos da tabela.
 */
function getSatPressureBar(refrigerant: string, temp_c: number): number {
  const table = SAT_PRESSURE_TABLE[refrigerant.toUpperCase().replace("-", "").replace("_", "")];
  if (!table) {
    // Fallback: Antoine simplificado (aproximação para refrigerantes desconhecidos)
    // P ≈ P_ref × exp(A × (T - T_ref) / (T + B))
    return Math.max(0.5, 5.0 * Math.exp(0.04 * (temp_c + 10)));
  }

  const temps = Object.keys(table).map(Number).sort((a, b) => a - b);
  const t0 = temps.reduce<number>((acc, t) => (t <= temp_c ? t : acc), temps[0]);
  const t1 = temps.find((t) => t > temp_c) ?? temps[temps.length - 1];

  if (t0 === t1) return table[t0];

  const p0 = table[t0];
  const p1 = table[t1];
  const frac = (temp_c - t0) / (t1 - t0);
  return p0 + frac * (p1 - p0);
}

// ─────────────────────────────────────────────────────────────────────────────
// Estimativa de carga de fluido
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Densidades de líquido saturado por refrigerante a ~5°C (kg/m³).
 * Usadas para estimar a carga de fluido no evaporador.
 */
const LIQUID_DENSITY_KG_M3: Record<string, number> = {
  R404A: 1060, R507A: 1055, R134a: 1180, R448A: 1050,
  R449A: 1048, R22: 1190, R407C: 1100, R410A: 1020,
  // HFOs / nova geração (densidade a ~5°C)
  R1234YF: 1110, R1234ZEE: 1115, R32: 1010, R290: 495, R744: 870,
};

/**
 * Estima o volume interno do evaporador (m³) a partir da geometria do coil.
 * Fórmula: V = π/4 × d_i² × L_total
 * onde L_total = comprimento total dos tubos = largura × circuitos × passes
 */
function estimateEvaporatorInternalVolume(
  system: SystemComponentsInput,
): { volume_m3: number; warnings: string[] } {
  const warnings: string[] = [];
  const pi = system.evaporator?.progressive_input;

  if (!pi) {
    warnings.push("startupReferenceEngine: progressive_input ausente — volume estimado como 0.");
    return { volume_m3: 0, warnings };
  }

  const d_i_m = (pi.tube_inner_diameter_mm ?? 10) / 1000;
  const coil_width_m = pi.coil_width_m ?? 1.0;

  // Total de passes = soma de rows_in_roll de todos os rolls
  const total_rows = pi.rolls?.reduce((acc, r) => acc + (r.rows_in_roll ?? 1), 0) ?? 2;

  // Número de tubos por fileira = altura / passo transversal
  const tube_pitch_m = (pi.tube_pitch_transverse_mm ?? 30) / 1000;
  const coil_height_m = pi.coil_height_m ?? 0.5;
  const tubes_per_row = Math.round(coil_height_m / tube_pitch_m);

  // Comprimento total de tubos
  const total_tube_length_m = coil_width_m * tubes_per_row * total_rows;

  // Volume interno
  const volume_m3 = (Math.PI / 4) * d_i_m * d_i_m * total_tube_length_m;

  return { volume_m3, warnings };
}

/**
 * Estima a carga de fluido total da máquina.
 * Inclui evaporador (líquido + bifásico) + linhas (estimativa conservadora).
 */
function estimateRefrigerantCharge(
  system: SystemComponentsInput,
): { charge_kg: number; tolerance_kg: number; warnings: string[] } {
  const warnings: string[] = [];
  const refrigerant = system.compressor.refrigerant.toUpperCase().replace("-", "").replace("_", "");
  const rho = LIQUID_DENSITY_KG_M3[refrigerant] ?? 1050;

  const { volume_m3, warnings: volWarnings } = estimateEvaporatorInternalVolume(system);
  warnings.push(...volWarnings);

  // Evaporador: assume 60% líquido + 40% vapor (fração mássica média)
  // Massa no evaporador = volume × densidade_líquido × 0.6
  const evap_charge_kg = volume_m3 * rho * 0.6;

  // Linhas de líquido e sucção: estimativa conservadora de 15% adicional
  const lines_charge_kg = evap_charge_kg * 0.15;

  // Condensador: estimativa de 10% adicional (sub-resfriador)
  const cond_charge_kg = evap_charge_kg * 0.10;

  const total_charge_kg = evap_charge_kg + lines_charge_kg + cond_charge_kg;

  // Tolerância: ±10% da carga total, mínimo 0.05 kg
  const tolerance_kg = Math.max(0.05, total_charge_kg * 0.10);

  if (volume_m3 === 0) {
    warnings.push("startupReferenceEngine: carga de fluido estimada como 0 por falta de geometria.");
  }

  return {
    charge_kg: Math.round(total_charge_kg * 100) / 100,
    tolerance_kg: Math.round(tolerance_kg * 100) / 100,
    warnings,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers para construção de parâmetros
// ─────────────────────────────────────────────────────────────────────────────

function makeParam(
  id: string,
  label: string,
  unit: string,
  reference_value: number,
  tol_minus: number,
  tol_plus: number,
  diagnosis_if_out_of_range: string,
  measurement_instruction: string,
): StartupParameter {
  return {
    id,
    label,
    unit,
    reference_value: Math.round(reference_value * 100) / 100,
    tolerance_min: Math.round((reference_value - tol_minus) * 100) / 100,
    tolerance_max: Math.round((reference_value + tol_plus) * 100) / 100,
    measured_value: null,
    status: "not_measured" as StartupParameterStatus,
    diagnosis_if_out_of_range,
    measurement_instruction,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Grupo 1 — Pressões
// ─────────────────────────────────────────────────────────────────────────────

function buildPressuresGroup(
  system: SystemComponentsInput,
): StartupParameterGroup {
  const refrigerant = system.compressor.refrigerant;
  const Te = system.compressor.evap_temp_c;
  const Tc = system.compressor.cond_temp_c;

  const P_suc_bar = getSatPressureBar(refrigerant, Te);
  const P_dis_bar = getSatPressureBar(refrigerant, Tc);
  const compression_ratio = P_dis_bar / P_suc_bar;

  const parameters: StartupParameter[] = [
    makeParam(
      "suction_pressure_bar",
      "Pressão de sucção",
      "bar",
      P_suc_bar,
      0.3,
      0.3,
      "Pressão de sucção fora da faixa. Verificar: subcarga de fluido (baixa), sobrecarga (alta), restrição na válvula de expansão (baixa), ou condensação insuficiente (alta).",
      "Conectar manômetro no serviço de baixa pressão. Aguardar estabilização (5 min em regime).",
    ),
    makeParam(
      "discharge_pressure_bar",
      "Pressão de descarga",
      "bar",
      P_dis_bar,
      1.0,
      1.5,
      "Pressão de descarga fora da faixa. Verificar: condensador sujo ou subdimensionado (alta), subcarga de fluido (baixa), ou ventilador do condensador com problema.",
      "Conectar manômetro no serviço de alta pressão. Aguardar estabilização (5 min em regime).",
    ),
    makeParam(
      "compression_ratio",
      "Razão de compressão",
      "—",
      compression_ratio,
      1.0,
      2.0,
      "Razão de compressão anormal. Verificar: pressão de sucção muito baixa (razão alta) ou pressão de descarga muito baixa (razão baixa).",
      "Calcular: P_descarga / P_sucção (pressões absolutas em bar).",
    ),
  ];

  return { group_id: "pressures", group_label: "Pressões", parameters };
}

// ─────────────────────────────────────────────────────────────────────────────
// Grupo 2 — Temperaturas
// ─────────────────────────────────────────────────────────────────────────────

function buildTemperaturesGroup(
  system: SystemComponentsInput,
  evapResult: ProgressiveCoilResult,
): StartupParameterGroup {
  const Te = system.compressor.evap_temp_c;
  const Tc = system.compressor.cond_temp_c;

  // Superaquecimento típico de projeto: 8 K (ajustável pela válvula de expansão)
  const SH_design_k = 8;
  // Sub-resfriamento típico: 5 K
  const SC_design_k = 5;

  const T_suction_c = Te + SH_design_k;
  const T_liquid_c = Tc - SC_design_k;
  const T_air_out_c = evapResult.air_temperature_out_c ?? (Te + 5);
  const T_ambient_c = system.system_conditions.ambient_temp_c;

  // Temperatura de descarga estimada (aproximação politrópica simplificada)
  // T_dis ≈ T_suc × (P_dis/P_suc)^((k-1)/k), k ≈ 1.15 para refrigerantes HFC
  const P_suc = getSatPressureBar(system.compressor.refrigerant, Te);
  const P_dis = getSatPressureBar(system.compressor.refrigerant, Tc);
  const k = 1.15;
  const T_dis_c = (T_suction_c + 273.15) * Math.pow(P_dis / P_suc, (k - 1) / k) - 273.15;

  const parameters: StartupParameter[] = [
    makeParam(
      "suction_temp_c",
      "Temperatura de sucção",
      "°C",
      T_suction_c,
      2,
      2,
      "Temperatura de sucção fora da faixa. SH alto → subcarga de fluido ou restrição. SH baixo → sobrecarga ou válvula de expansão muito aberta (risco de retorno de líquido).",
      "Medir com termopar na linha de sucção, próximo ao compressor. Isolar termicamente o sensor.",
    ),
    makeParam(
      "discharge_temp_c",
      "Temperatura de descarga",
      "°C",
      Math.round(T_dis_c),
      10,
      15,
      "Temperatura de descarga alta (>130°C): verificar SH excessivo, razão de compressão alta, ou óleo insuficiente. Temperatura baixa: verificar retorno de líquido.",
      "Medir com termopar na linha de descarga, a ~15 cm da válvula de descarga do compressor.",
    ),
    makeParam(
      "liquid_temp_c",
      "Temperatura do líquido (sub-resfriamento)",
      "°C",
      T_liquid_c,
      2,
      2,
      "Sub-resfriamento fora da faixa. SC baixo → risco de flash gas na válvula de expansão (subcarga ou linha de líquido longa). SC alto → sobrecarga de fluido.",
      "Medir com termopar na linha de líquido, após o filtro secador.",
    ),
    makeParam(
      "superheat_k",
      "Superaquecimento (SH)",
      "K",
      SH_design_k,
      2,
      4,
      "SH fora da faixa. SH < 4 K: risco de retorno de líquido — fechar válvula de expansão. SH > 12 K: subcarga ou restrição — verificar carga e válvula.",
      "Calcular: T_sucção − T_saturação(P_sucção). Usar tabela do refrigerante ou manifold digital.",
    ),
    makeParam(
      "subcooling_k",
      "Sub-resfriamento (SC)",
      "K",
      SC_design_k,
      2,
      3,
      "SC fora da faixa. SC < 2 K: possível subcarga ou flash gas. SC > 8 K: possível sobrecarga.",
      "Calcular: T_saturação(P_descarga) − T_líquido. Usar tabela do refrigerante ou manifold digital.",
    ),
    makeParam(
      "air_temp_out_c",
      "Temperatura de saída do ar (evaporador)",
      "°C",
      T_air_out_c,
      1.5,
      1.5,
      "Temperatura de saída do ar fora da faixa. Alta → capacidade insuficiente (subcarga, evaporador sujo, vazão de ar baixa). Baixa → sobrecapacidade ou sensor mal posicionado.",
      "Medir com termopar na saída do evaporador, no centro do fluxo de ar.",
    ),
    makeParam(
      "ambient_temp_c",
      "Temperatura ambiente (referência)",
      "°C",
      T_ambient_c,
      3,
      3,
      "Temperatura ambiente muito diferente da condição de projeto. Os valores de referência foram calculados para esta temperatura — ajuste as tolerâncias se necessário.",
      "Medir com termômetro a ~1 m do condensador, na sombra, longe de fontes de calor.",
    ),
  ];

  return { group_id: "temperatures", group_label: "Temperaturas", parameters };
}

// ─────────────────────────────────────────────────────────────────────────────
// Grupo 3 — Elétrico
// ─────────────────────────────────────────────────────────────────────────────

function buildElectricalGroup(
  system: SystemComponentsInput,
  electrical: ElectricalAnalysis | undefined,
): StartupParameterGroup {
  const comp = system.compressor;
  const warnings: string[] = [];

  // Corrente do compressor
  const I_comp = electrical?.compressor_current_a ?? (
    comp.motor_current_a ?? (
      comp.voltage_v && comp.phases
        ? comp.power_w / (comp.voltage_v * (comp.phases === 3 ? Math.sqrt(3) : 1) * (comp.power_factor ?? 0.85))
        : comp.power_w / (220 * 0.85)
    )
  );

  // Corrente dos ventiladores
  const I_fans = electrical?.fans_current_a ?? 0;

  // Corrente total
  const I_total = electrical?.total_current_a ?? (I_comp + I_fans);

  // Tensão e fases
  const voltage = electrical?.voltage_v ?? comp.voltage_v ?? 220;
  const phases = electrical?.phases ?? comp.phases ?? 1;

  // Potência total
  const W_total = electrical?.total_electrical_power_w ?? comp.power_w;

  // COP do sistema
  const cop_system = electrical?.cop_system ?? (
    electrical?.q_evap_w ? electrical.q_evap_w / W_total : 0
  );

  const parameters: StartupParameter[] = [
    makeParam(
      "compressor_current_a",
      "Corrente do compressor",
      "A",
      I_comp,
      I_comp * 0.05,
      I_comp * 0.10,
      "Corrente do compressor fora da faixa. Alta: verificar tensão de alimentação (baixa tensão → alta corrente), condensador sujo, ou compressor com problema mecânico. Baixa: verificar tensão alta ou carga insuficiente.",
      "Medir com alicate amperímetro em cada fase do compressor. Registrar as 3 fases (trifásico) ou a fase ativa (monofásico).",
    ),
    makeParam(
      "total_system_current_a",
      "Corrente total do sistema",
      "A",
      I_total,
      I_total * 0.05,
      I_total * 0.10,
      "Corrente total fora da faixa. Verificar todos os componentes elétricos: compressor, ventiladores e resistências de degelo.",
      "Medir com alicate amperímetro no disjuntor geral do quadro elétrico da máquina.",
    ),
    makeParam(
      "supply_voltage_v",
      "Tensão de alimentação",
      "V",
      voltage,
      voltage * 0.05,
      voltage * 0.05,
      "Tensão de alimentação fora da faixa (±5%). Tensão baixa causa sobrecorrente e superaquecimento do motor. Tensão alta pode danificar componentes eletrônicos.",
      `Medir com voltímetro entre as fases (${phases === 3 ? "L1-L2, L2-L3, L1-L3" : "fase e neutro"}). Verificar queda de tensão na fiação.`,
    ),
    makeParam(
      "total_power_w",
      "Potência elétrica total",
      "W",
      W_total,
      W_total * 0.08,
      W_total * 0.08,
      "Potência total fora da faixa. Verificar tensão de alimentação e correntes individuais.",
      "Calcular: P = V × I × cos(φ) × √3 (trifásico) ou P = V × I × cos(φ) (monofásico). Usar analisador de energia se disponível.",
    ),
    ...(cop_system > 0 ? [makeParam(
      "cop_system",
      "COP do sistema (referência)",
      "—",
      cop_system,
      cop_system * 0.10,
      cop_system * 0.10,
      "COP do sistema abaixo do esperado. Verificar: carga de fluido, limpeza dos trocadores, condições de operação (temperatura ambiente).",
      "Calcular: COP = Q_evap / P_total. Q_evap pode ser medido pelo diferencial de temperatura e vazão de ar.",
    )] : []),
  ];

  return { group_id: "electrical", group_label: "Elétrico", parameters };
}

// ─────────────────────────────────────────────────────────────────────────────
// Grupo 4 — Ar (evaporador)
// ─────────────────────────────────────────────────────────────────────────────

function buildAirGroup(
  system: SystemComponentsInput,
  evapResult: ProgressiveCoilResult,
): StartupParameterGroup {
  const required_airflow = system.system_conditions.required_airflow_m3_h;
  const fan = system.evaporator_fan;
  const airflow_ref = fan?.airflow_m3_h ?? required_airflow;
  const dp_ref = evapResult.total_air_pressure_drop_pa ?? 30;
  const rh_out = (evapResult.air_relative_humidity_out ?? 0.95) * 100;

  const parameters: StartupParameter[] = [
    makeParam(
      "evap_airflow_m3h",
      "Vazão de ar do evaporador",
      "m³/h",
      airflow_ref,
      airflow_ref * 0.10,
      airflow_ref * 0.10,
      "Vazão de ar fora da faixa. Baixa: verificar filtros sujos, gelo no evaporador, ou ventilador com problema. Alta: verificar rotação do ventilador.",
      "Medir com anemômetro de fio quente ou tubo de Pitot na saída do evaporador. Calcular: Q = V_média × A_seção.",
    ),
    makeParam(
      "evap_air_pressure_drop_pa",
      "Queda de pressão do ar (evaporador)",
      "Pa",
      dp_ref,
      dp_ref * 0.15,
      dp_ref * 0.20,
      "Queda de pressão alta: evaporador sujo ou com gelo. Baixa: possível bypass de ar ou sensor mal posicionado.",
      "Medir com manômetro diferencial entre entrada e saída do evaporador.",
    ),
    makeParam(
      "rh_out_pct",
      "Umidade relativa de saída do ar",
      "%",
      rh_out,
      5,
      5,
      "UR de saída fora da faixa. Alta: possível problema de drenagem ou condensação excessiva. Baixa: evaporador operando em regime seco (SH alto).",
      "Medir com higrômetro na saída do evaporador.",
    ),
  ];

  return { group_id: "air", group_label: "Ar (Evaporador)", parameters };
}

// ─────────────────────────────────────────────────────────────────────────────
// Grupo 5 — Carga de fluido
// ─────────────────────────────────────────────────────────────────────────────

function buildChargeGroup(
  charge_kg: number,
  tolerance_kg: number,
): StartupParameterGroup {
  const parameters: StartupParameter[] = [
    makeParam(
      "refrigerant_charge_kg",
      "Carga de fluido (estimativa)",
      "kg",
      charge_kg,
      tolerance_kg,
      tolerance_kg,
      "Carga de fluido fora da faixa estimada. Verificar: sub-resfriamento (SC < 2 K → subcarga), superaquecimento (SH > 12 K → subcarga), ou pressões de operação anômalas.",
      "Carregar fluido pela linha de líquido com a máquina em operação. Monitorar SC e SH simultaneamente. Parar quando SC ≈ 5 K e SH ≈ 8 K.",
    ),
  ];

  return { group_id: "charge", group_label: "Carga de Fluido", parameters };
}

// ─────────────────────────────────────────────────────────────────────────────
// Motor principal
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Gera o StartupReferenceSheet a partir do ProductTechnicalRecord.
 *
 * @param record - Registro técnico do produto gerado pelo buildProductTechnicalRecord
 * @returns StartupReferenceSheet com todos os parâmetros de campo esperados
 */
export function generateStartupReference(
  record: ProductTechnicalRecord,
): StartupReferenceSheet {
  const warnings: string[] = [];
  const system = record.components;
  const evapResult = record.equilibrium.evaporator_result;
  const electrical = record.electrical_analysis;

  // Estimativa de carga de fluido
  const {
    charge_kg,
    tolerance_kg,
    warnings: chargeWarnings,
  } = estimateRefrigerantCharge(system);
  warnings.push(...chargeWarnings);

  // Construir grupos
  const groups: StartupParameterGroup[] = [
    buildPressuresGroup(system),
    buildTemperaturesGroup(system, evapResult),
    buildElectricalGroup(system, electrical),
    buildAirGroup(system, evapResult),
    buildChargeGroup(charge_kg, tolerance_kg),
  ];

  return {
    machine_model: record.identity.model,
    refrigerant: system.compressor.refrigerant,
    design_evap_temp_c: system.compressor.evap_temp_c,
    design_cond_temp_c: system.compressor.cond_temp_c,
    design_ambient_temp_c: system.system_conditions.ambient_temp_c,
    groups,
    estimated_charge_kg: charge_kg,
    charge_tolerance_kg: tolerance_kg,
    warnings,
    generated_at: new Date().toISOString(),
  };
}

/**
 * Atualiza um StartupReferenceSheet com os valores medidos em campo pelo técnico.
 * Compara cada valor medido com a referência e atualiza o status (pass/warning/fail).
 *
 * @param sheet - Planilha de referência gerada pelo generateStartupReference
 * @param measurements - Mapa de { parameter_id: measured_value }
 * @returns Nova planilha com os valores medidos e status atualizados
 */
export function applyFieldMeasurements(
  sheet: StartupReferenceSheet,
  measurements: Record<string, number>,
): StartupReferenceSheet {
  const updatedGroups = sheet.groups.map((group) => ({
    ...group,
    parameters: group.parameters.map((param) => {
      const measured = measurements[param.id];
      if (measured === undefined || measured === null) {
        return { ...param, measured_value: null, status: "not_measured" as StartupParameterStatus };
      }

      let status: StartupParameterStatus;
      if (measured >= param.tolerance_min && measured <= param.tolerance_max) {
        status = "pass";
      } else {
        // Warning se estiver até 10% fora da tolerância, fail se mais
        const range = param.tolerance_max - param.tolerance_min;
        const deviation = Math.min(
          Math.abs(measured - param.tolerance_min),
          Math.abs(measured - param.tolerance_max),
        );
        status = deviation <= range * 0.10 ? "warning" : "fail";
      }

      return { ...param, measured_value: measured, status };
    }),
  }));

  return { ...sheet, groups: updatedGroups };
}
