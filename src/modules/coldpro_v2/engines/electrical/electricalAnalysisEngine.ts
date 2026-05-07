/**
 * Motor de Análise Elétrica do Sistema de Refrigeração
 *
 * Calcula a potência elétrica total, corrente e COP real do sistema,
 * considerando compressor + todos os ventiladores do conjunto.
 *
 * O COP do sistema (cop_system) é o valor correto para:
 *   - Dimensionamento do circuito elétrico
 *   - Integração com ferramentas de cálculo de carga térmica
 *   - Catálogo técnico do produto
 *
 * Fórmulas:
 *   W_total = W_comp + W_fan_evap + W_fan_cond
 *   COP_sistema = Q_evap / W_total
 *   I_comp = W_comp / (V × fp × √fases)   [monofásico: √1 = 1; trifásico: √3 ≈ 1.732]
 *   I_total = W_total / (V × fp × √fases)
 */

import type {
  CompressorSpec,
  ElectricalAnalysis,
  FanSpec,
  SystemComponentsInput,
} from "../../domain/types";

/** Raiz de 3 para cálculo de corrente trifásica. */
const SQRT3 = Math.sqrt(3);

/** Fator de potência padrão para compressores herméticos quando não informado. */
const DEFAULT_POWER_FACTOR = 0.85;

/** Tensão padrão (V) quando não informada — 380 V trifásico (padrão industrial BR). */
const DEFAULT_VOLTAGE_V = 380;

/** Número de fases padrão quando não informado. */
const DEFAULT_PHASES: 1 | 3 = 3;

/** Frequência padrão (Hz) quando não informada. */
const DEFAULT_FREQUENCY_HZ = 60;

/**
 * Calcula o fator de fase para conversão de potência em corrente.
 * Monofásico: V × fp × 1
 * Trifásico:  V × fp × √3
 */
function phaseFactor(voltage_v: number, power_factor: number, phases: 1 | 3): number {
  return voltage_v * power_factor * (phases === 3 ? SQRT3 : 1);
}

/**
 * Extrai a potência absorvida de um FanSpec.
 * Usa motor_power_w se disponível; caso contrário, estima a partir da
 * corrente e tensão se disponíveis; caso contrário, retorna 0 com aviso.
 */
function extractFanPower(fan: FanSpec | undefined, label: string, warnings: string[]): number {
  if (!fan) return 0;

  if (fan.motor_power_w != null && fan.motor_power_w > 0) {
    return fan.motor_power_w;
  }

  // Tenta estimar a partir de corrente × tensão × fp × √fases
  // FanSpec não tem power_factor — usa DEFAULT_POWER_FACTOR
  if (fan.motor_current_a != null && fan.voltage_v != null) {
    const fp = DEFAULT_POWER_FACTOR;
    const ph = fan.phases ?? DEFAULT_PHASES;
    const estimated = fan.motor_current_a * phaseFactor(fan.voltage_v, fp, ph);
    warnings.push(
      `${label}: motor_power_w não informado — potência estimada a partir de corrente × tensão: ${estimated.toFixed(0)} W.`,
    );
    return estimated;
  }

  warnings.push(
    `${label}: motor_power_w não informado e dados elétricos insuficientes para estimativa. Potência do ventilador considerada 0 W.`,
  );
  return 0;
}

/**
 * Extrai a corrente do compressor.
 * Usa motor_current_a se disponível; caso contrário, calcula a partir de
 * power_w / (V × fp × √fases).
 */
function extractCompressorCurrent(
  compressor: CompressorSpec,
  voltage_v: number,
  power_factor: number,
  phases: 1 | 3,
  warnings: string[],
): number {
  if (compressor.motor_current_a != null && compressor.motor_current_a > 0) {
    return compressor.motor_current_a;
  }

  // Calcula a partir da potência
  const denominator = phaseFactor(voltage_v, power_factor, phases);
  if (denominator <= 0) {
    warnings.push("Compressor: impossível calcular corrente — tensão ou fator de potência inválido.");
    return 0;
  }

  const calculated = compressor.power_w / denominator;
  warnings.push(
    `Compressor: motor_current_a não informado — corrente calculada a partir de power_w: ${calculated.toFixed(2)} A.`,
  );
  return calculated;
}

/**
 * Extrai a corrente de um ventilador.
 * Usa motor_current_a se disponível; caso contrário, calcula a partir de
 * motor_power_w / (V × fp × √fases).
 */
function extractFanCurrent(
  fan: FanSpec | undefined,
  fan_power_w: number,
  voltage_v: number,
  power_factor: number,
  phases: 1 | 3,
  label: string,
  warnings: string[],
): number {
  if (!fan || fan_power_w <= 0) return 0;

  if (fan.motor_current_a != null && fan.motor_current_a > 0) {
    return fan.motor_current_a;
  }

  const denominator = phaseFactor(voltage_v, power_factor, phases);
  if (denominator <= 0) return 0;

  const calculated = fan_power_w / denominator;
  warnings.push(
    `${label}: motor_current_a não informado — corrente calculada a partir de motor_power_w: ${calculated.toFixed(2)} A.`,
  );
  return calculated;
}

/**
 * Divide com segurança, retornando 0 se o divisor for zero ou inválido.
 */
function safeDivide(numerator: number, denominator: number): number {
  if (!Number.isFinite(denominator) || denominator === 0) return 0;
  return numerator / denominator;
}

// ─────────────────────────────────────────────────────────────────────────────
// Interface de entrada
// ─────────────────────────────────────────────────────────────────────────────

export interface ElectricalAnalysisInput {
  /** Componentes do sistema (compressor, ventiladores, etc.). */
  system: SystemComponentsInput;
  /**
   * Capacidade frigorífica do evaporador no ponto de operação (W).
   * Obtida do SystemEquilibriumResult.thermal_balance.q_evap_w.
   */
  q_evap_w: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Motor principal
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calcula a análise elétrica completa do sistema de refrigeração.
 *
 * @param input - Componentes do sistema e capacidade frigorífica no ponto de operação.
 * @returns ElectricalAnalysis com potências, correntes e COP real do sistema.
 *
 * @example
 * ```ts
 * const result = calculateElectricalAnalysis({
 *   system: {
 *     compressor: { power_w: 2000, voltage_v: 380, phases: 3, power_factor: 0.85, ... },
 *     evaporator_fan: { motor_power_w: 150, ... },
 *     condenser_fan: { motor_power_w: 150, ... },
 *     ...
 *   },
 *   q_evap_w: 4500,
 * });
 * // result.cop_system ≈ 1.96  (vs cop_compressor ≈ 2.25 — diferença de ~15%)
 * // result.total_electrical_power_w ≈ 2300
 * // result.total_current_a ≈ 4.1 A (380 V, 3φ, fp=0.85)
 * ```
 */
export function calculateElectricalAnalysis(input: ElectricalAnalysisInput): ElectricalAnalysis {
  const warnings: string[] = [];
  const { system, q_evap_w } = input;
  const { compressor, evaporator_fan, condenser_fan } = system;

  // ── 1. Parâmetros elétricos de referência ──────────────────────────────────
  // Prioridade: compressor → ventilador evaporador → ventilador condensador → defaults
  const voltage_v =
    compressor.voltage_v ??
    evaporator_fan?.voltage_v ??
    condenser_fan?.voltage_v ??
    DEFAULT_VOLTAGE_V;

  const phases: 1 | 3 =
    compressor.phases ??
    evaporator_fan?.phases ??
    condenser_fan?.phases ??
    DEFAULT_PHASES;

  const power_factor =
    compressor.power_factor ??
    DEFAULT_POWER_FACTOR;

  const frequency_hz =
    compressor.frequency_hz ??
    evaporator_fan?.frequency_hz ??
    condenser_fan?.frequency_hz ??
    DEFAULT_FREQUENCY_HZ;

  if (voltage_v === DEFAULT_VOLTAGE_V && compressor.voltage_v == null) {
    warnings.push(
      `Tensão não informada no CompressorSpec — usando padrão ${DEFAULT_VOLTAGE_V} V.`,
    );
  }
  if (phases === DEFAULT_PHASES && compressor.phases == null) {
    warnings.push(
      `Número de fases não informado no CompressorSpec — usando padrão ${DEFAULT_PHASES}φ.`,
    );
  }
  if (power_factor === DEFAULT_POWER_FACTOR && compressor.power_factor == null) {
    warnings.push(
      `Fator de potência não informado no CompressorSpec — usando padrão ${DEFAULT_POWER_FACTOR}.`,
    );
  }

  // ── 2. Potências ───────────────────────────────────────────────────────────
  const compressor_power_w = compressor.power_w;
  const evap_fan_power_w = extractFanPower(evaporator_fan, "Ventilador do evaporador", warnings);
  const cond_fan_power_w = extractFanPower(condenser_fan, "Ventilador do condensador", warnings);
  const total_electrical_power_w = compressor_power_w + evap_fan_power_w + cond_fan_power_w;

  // ── 3. Correntes ───────────────────────────────────────────────────────────
  const compressor_current_a = extractCompressorCurrent(
    compressor,
    voltage_v,
    power_factor,
    phases,
    warnings,
  );

  const evap_fan_current_a = extractFanCurrent(
    evaporator_fan,
    evap_fan_power_w,
    voltage_v,
    power_factor,
    phases,
    "Ventilador do evaporador",
    warnings,
  );

  const cond_fan_current_a = extractFanCurrent(
    condenser_fan,
    cond_fan_power_w,
    voltage_v,
    power_factor,
    phases,
    "Ventilador do condensador",
    warnings,
  );

  const fans_current_a = evap_fan_current_a + cond_fan_current_a;
  const total_current_a = compressor_current_a + fans_current_a;

  // ── 4. COP ─────────────────────────────────────────────────────────────────
  const cop_compressor = safeDivide(q_evap_w, compressor_power_w);
  const cop_system = safeDivide(q_evap_w, total_electrical_power_w);

  // ── 5. Avisos de qualidade ─────────────────────────────────────────────────
  if (cop_system < 1.0) {
    warnings.push(
      `COP do sistema muito baixo (${cop_system.toFixed(2)}). Verificar condições de operação.`,
    );
  }
  if (cop_system < cop_compressor * 0.7) {
    warnings.push(
      `Ventiladores representam mais de 30% da potência total. Verificar seleção dos ventiladores.`,
    );
  }
  if (total_current_a > 63) {
    warnings.push(
      `Corrente total estimada (${total_current_a.toFixed(1)} A) acima de 63 A. Verificar dimensionamento do disjuntor.`,
    );
  }
  if (q_evap_w <= 0) {
    warnings.push(
      "Capacidade frigorífica q_evap_w = 0 ou negativa. COP calculado como 0.",
    );
  }

  // Suprimir aviso de frequência não utilizada (apenas para referência)
  void frequency_hz;

  return {
    compressor_power_w,
    evap_fan_power_w,
    cond_fan_power_w,
    total_electrical_power_w,
    total_current_a,
    compressor_current_a,
    fans_current_a,
    voltage_v,
    phases,
    power_factor,
    cop_compressor,
    cop_system,
    q_evap_w,
    warnings,
  };
}

/**
 * Calcula a potência total dos ventiladores de um SystemComponentsInput.
 * Utilitário usado pelo productPerformanceCurveEngine para calcular
 * total_power_w e cop_system em cada ponto da curva.
 *
 * @returns Potência total dos ventiladores (W). Zero se não definidos.
 */
export function calculateFansTotalPower(system: SystemComponentsInput): number {
  const warnings: string[] = [];
  const evap = extractFanPower(system.evaporator_fan, "Ventilador do evaporador", warnings);
  const cond = extractFanPower(system.condenser_fan, "Ventilador do condensador", warnings);
  return evap + cond;
}
