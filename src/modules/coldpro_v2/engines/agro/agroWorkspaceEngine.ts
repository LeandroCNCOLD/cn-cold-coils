/**
 * agroWorkspaceEngine.ts — Sprint 6
 *
 * Orquestrador do Workspace AGRO. Combina:
 *   1. `calculateAgroCycle`     — ciclo psicométrico base (evaporação + reaquecimento)
 *   2. `calculateHotGasBypass`  — ciclo com gás quente quando RH_setpoint > RH_evap_out
 *   3. `calculateReheatCoilSizing` — dimensionamento da bateria de reaquecimento
 *
 * Determina automaticamente o modo de operação recomendado:
 *   - `cooling_only`   : sem necessidade de reaquecimento
 *   - `hot_gas_bypass` : reaquecimento via gás quente (ciclo DX)
 *   - `electric_reheat`: reaquecimento elétrico (β máximo atingido)
 */

import type {
  AgroCycleInput,
  AgroWorkspaceResult,
  HotGasBypassInput,
  ReheatCoilSizingInput,
} from "../../domain/types";
import { calculateAgroCycle } from "./agroCycle";
import { calculateHotGasBypass } from "./hotGasBypassEngine";
import { calculateReheatCoilSizing } from "./reheatCoilSizing";

export interface AgroWorkspaceInput {
  /** Parâmetros do ciclo AGRO base */
  agro_cycle: AgroCycleInput;

  /** Temperatura de evaporação [°C] — necessária para o ciclo de by-pass */
  T_evaporating_c: number;
  /** Temperatura de condensação [°C] */
  T_condensing_c: number;

  /**
   * Parâmetros da bateria de reaquecimento (opcionais).
   * Se não fornecidos, o dimensionamento da bateria é omitido.
   */
  reheat_coil?: Omit<
    ReheatCoilSizingInput,
    | "Q_reheat_target_w"
    | "T_air_in_c"
    | "T_air_out_c"
    | "air_mass_flow_kg_s"
    | "T_condensing_c"
    | "T_hot_gas_in_c"
  >;

  /** Fração máxima de gás quente desviado [0..1] — padrão: 0.5 */
  max_bypass_fraction?: number;
  /** Pressão atmosférica [Pa] — padrão: 101325 */
  P_atm?: number;
}

/**
 * Calcula o workspace AGRO completo.
 */
export function calculateAgroWorkspace(
  input: AgroWorkspaceInput,
): AgroWorkspaceResult {
  const warnings: string[] = [];

  // ── 1. Ciclo AGRO base ────────────────────────────────────────────────────
  const agroCycle = calculateAgroCycle(input.agro_cycle);
  warnings.push(...agroCycle.warnings);

  if (agroCycle.status === "error") {
    return {
      agro_cycle: agroCycle,
      recommended_mode: "cooling_only",
      status: "error",
      warnings,
    };
  }

  // ── 2. Determinar se reaquecimento é necessário ───────────────────────────
  const needsReheat = agroCycle.mode === "dehumidification";

  if (!needsReheat) {
    return {
      agro_cycle: agroCycle,
      recommended_mode: "cooling_only",
      status: agroCycle.status,
      warnings,
    };
  }

  // ── 3. Ciclo com gás quente ───────────────────────────────────────────────
  const bypassInput: HotGasBypassInput = {
    T_air_in_c: input.agro_cycle.T_room_c,
    RH_air_in: input.agro_cycle.RH_room,
    T_air_out_setpoint_c: input.agro_cycle.T_setpoint_c,
    RH_air_out_setpoint: input.agro_cycle.RH_setpoint,
    air_mass_flow_kg_s: input.agro_cycle.air_mass_flow_kg_s,
    T_evaporating_c: input.T_evaporating_c,
    T_condensing_c: input.T_condensing_c,
    max_bypass_fraction: input.max_bypass_fraction,
    P_atm: input.P_atm ?? input.agro_cycle.P_atm,
    max_iterations: input.agro_cycle.max_iterations,
    tolerance_w: input.agro_cycle.tolerance_w,
  };

  const hotGasBypass = calculateHotGasBypass(bypassInput);
  warnings.push(...hotGasBypass.warnings);

  const recommendedMode =
    hotGasBypass.mode === "cooling_only"
      ? "cooling_only"
      : hotGasBypass.mode === "electric_reheat"
        ? "electric_reheat"
        : "hot_gas_bypass";

  // ── 4. Dimensionamento da bateria de reaquecimento (opcional) ─────────────
  let reheatCoil = undefined;

  if (input.reheat_coil && agroCycle.Q_reheat_w > 0) {
    const reheatInput: ReheatCoilSizingInput = {
      ...input.reheat_coil,
      Q_reheat_target_w: agroCycle.Q_reheat_w,
      T_air_in_c: agroCycle.T_evap_out_required_c,
      T_air_out_c: input.agro_cycle.T_setpoint_c,
      air_mass_flow_kg_s: input.agro_cycle.air_mass_flow_kg_s,
      T_condensing_c: input.T_condensing_c,
      T_hot_gas_in_c: input.T_condensing_c + 10, // superaquecimento típico
    };

    try {
      reheatCoil = calculateReheatCoilSizing(reheatInput);
    } catch (err) {
      warnings.push(
        `Erro no dimensionamento da bateria de reaquecimento: ${String(err)}`,
      );
    }
  }

  // ── 5. Status consolidado ─────────────────────────────────────────────────
  const hasError =
    (agroCycle.status as string) === "error" || (hotGasBypass.status as string) === "error";
  const hasWarning =
    agroCycle.status === "warning" ||
    hotGasBypass.status === "warning" ||
    warnings.length > 0;

  const status = hasError ? "error" : hasWarning ? "warning" : "ok";

  return {
    agro_cycle: agroCycle,
    hot_gas_bypass: hotGasBypass,
    reheat_coil: reheatCoil,
    recommended_mode: recommendedMode,
    status,
    warnings,
  };
}
