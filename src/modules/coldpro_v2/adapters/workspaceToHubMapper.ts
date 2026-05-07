/**
 * workspaceToHubMapper.ts — Sprint 7
 *
 * Mapeador que converte dados de um workspace de aletado (coil workspace)
 * para o formato `WorkspaceHubPayload`, compatível com o Hub de Start-up
 * e o motor de equilíbrio de sistema.
 *
 * O mapeador aceita um conjunto mínimo de dados de projeto e preenche
 * os campos obrigatórios de `SystemComponentsInput` e `MachineSpec`
 * com valores padrão conservadores quando não fornecidos.
 */

import type {
  WorkspaceHubPayload,
  WorkspaceMappingResult,
  SystemComponentsInput,
  MachineSpec,
  CompressorSpec,
  CondenserSpec,
  FanSpec,
  ProgressiveCoilInput,
  RollGeometry,
} from "../domain/types";

// ─── Tipos de entrada do mapeador ────────────────────────────────────────────

export interface WorkspaceCoilGeometry {
  /** Diâmetro externo do tubo [mm] */
  tube_outer_diameter_mm: number;
  /** Diâmetro interno do tubo [mm] */
  tube_inner_diameter_mm: number;
  /** Passo transversal dos tubos [mm] */
  tube_pitch_transverse_mm: number;
  /** Passo longitudinal dos tubos [mm] */
  tube_pitch_longitudinal_mm: number;
  /** Altura da aleta [mm] */
  fin_height_mm: number;
  /** Espessura da aleta [mm] */
  fin_thickness_mm: number;
  /** Largura do serpentinado [m] */
  coil_width_m: number;
  /** Altura do serpentinado [m] */
  coil_height_m: number;
  /** Material do tubo */
  tube_material: "copper" | "aluminum" | "steel";
  /** Material da aleta */
  fin_material: "copper" | "aluminum" | "steel";
  /** Configuração de rolos (espaçamento e número de filas por rolo) */
  rolls: RollGeometry[];
}

export interface WorkspaceAirConditions {
  /** Temperatura de entrada do ar [°C] */
  air_temperature_in_c: number;
  /** Umidade relativa de entrada [fração 0..1] */
  air_relative_humidity_in: number;
  /** Vazão mássica de ar [kg/s] */
  air_mass_flow_kg_s: number;
  /** Pressão atmosférica [Pa] — padrão: 101325 */
  P_atm?: number;
}

export interface WorkspaceRefrigerationData {
  /** Temperatura de evaporação [°C] */
  T_evaporating_c: number;
  /** Temperatura de condensação [°C] */
  T_condensing_c: number;
  /** Fluido refrigerante */
  refrigerant: string;
  /** Capacidade frigorífica do compressor [W] */
  compressor_capacity_w: number;
  /** Potência do compressor [W] */
  compressor_power_w: number;
  /** Capacidade de rejeição do condensador [W] */
  condenser_heat_rejection_w: number;
}

export interface WorkspaceFanData {
  /** Vazão de ar do ventilador [m³/h] */
  airflow_m3_h: number;
  /** Pressão estática disponível [Pa] */
  available_static_pressure_pa: number;
  /** Potência do motor [W] */
  motor_power_w?: number;
}

export interface WorkspaceProjectData {
  /** Identificador único do workspace */
  workspace_id: string;
  /** Modelo do produto */
  workspace_model: string;
  /** Tipo de workspace */
  workspace_type: "evaporator" | "condenser" | "agro" | "custom";
  /** Geometria do serpentinado */
  coil: WorkspaceCoilGeometry;
  /** Condições do ar */
  air: WorkspaceAirConditions;
  /** Dados de refrigeração */
  refrigeration: WorkspaceRefrigerationData;
  /** Dados do ventilador (opcional) */
  fan?: WorkspaceFanData;
  /** Temperatura ambiente [°C] — padrão: 35 */
  ambient_temp_c?: number;
  /** Dados da máquina para validação (opcional) */
  machine_spec_override?: Partial<MachineSpec>;
}

// ─── Mapeador principal ───────────────────────────────────────────────────────

/**
 * Mapeia dados de um workspace de aletado para `WorkspaceHubPayload`.
 *
 * Retorna `WorkspaceMappingResult` com `success: true` e o payload
 * pronto para envio ao Hub de Start-up, ou `success: false` com
 * lista de erros de validação.
 */
export function mapWorkspaceToHub(
  data: WorkspaceProjectData,
): WorkspaceMappingResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // ── Validações obrigatórias ─────────────────────────────────────────────
  if (!data.workspace_id || data.workspace_id.trim() === "") {
    errors.push("workspace_id é obrigatório.");
  }
  if (!data.workspace_model || data.workspace_model.trim() === "") {
    errors.push("workspace_model é obrigatório.");
  }
  if (data.coil.rolls.length === 0) {
    errors.push("coil.rolls deve ter pelo menos um rolo.");
  }
  if (data.air.air_mass_flow_kg_s <= 0) {
    errors.push("air.air_mass_flow_kg_s deve ser positivo.");
  }
  if (data.refrigeration.compressor_capacity_w <= 0) {
    errors.push("refrigeration.compressor_capacity_w deve ser positivo.");
  }
  if (data.refrigeration.T_evaporating_c >= data.refrigeration.T_condensing_c) {
    errors.push(
      "T_evaporating_c deve ser menor que T_condensing_c.",
    );
  }

  if (errors.length > 0) {
    return { success: false, errors, warnings };
  }

  // ── Construir ProgressiveCoilInput ──────────────────────────────────────
  const progressiveInput: ProgressiveCoilInput = {
    tube_outer_diameter_mm: data.coil.tube_outer_diameter_mm,
    tube_inner_diameter_mm: data.coil.tube_inner_diameter_mm,
    tube_pitch_transverse_mm: data.coil.tube_pitch_transverse_mm,
    tube_pitch_longitudinal_mm: data.coil.tube_pitch_longitudinal_mm,
    fin_height_mm: data.coil.fin_height_mm,
    fin_thickness_mm: data.coil.fin_thickness_mm,
    coil_width_m: data.coil.coil_width_m,
    coil_height_m: data.coil.coil_height_m,
    tube_material: data.coil.tube_material,
    fin_material: data.coil.fin_material,
    rolls: data.coil.rolls,
    air_temperature_in_c: data.air.air_temperature_in_c,
    air_relative_humidity_in: data.air.air_relative_humidity_in,
    air_mass_flow_kg_s: data.air.air_mass_flow_kg_s,
    P_atm: data.air.P_atm,
    T_evaporating_c: data.refrigeration.T_evaporating_c,
    refrigerant: data.refrigeration.refrigerant,
  };

  // ── Construir CompressorSpec ─────────────────────────────────────────────
  const compressorSpec: CompressorSpec = {
    cooling_capacity_w: data.refrigeration.compressor_capacity_w,
    power_w: data.refrigeration.compressor_power_w,
    refrigerant: data.refrigeration.refrigerant,
    evap_temp_c: data.refrigeration.T_evaporating_c,
    cond_temp_c: data.refrigeration.T_condensing_c,
  };

  // ── Construir CondenserSpec ──────────────────────────────────────────────
  const condenserSpec: CondenserSpec = {
    heat_rejection_capacity_w: data.refrigeration.condenser_heat_rejection_w,
    max_cond_temp_c: data.refrigeration.T_condensing_c + 5,
  };

  // ── Construir FanSpec (opcional) ─────────────────────────────────────────
  let evaporatorFan: FanSpec | undefined = undefined;
  if (data.fan) {
    evaporatorFan = {
      airflow_m3_h: data.fan.airflow_m3_h,
      available_static_pressure_pa: data.fan.available_static_pressure_pa,
      motor_power_w: data.fan.motor_power_w,
    };
    if (!data.fan.motor_power_w) {
      warnings.push(
        "fan.motor_power_w não fornecido. Análise elétrica do ventilador será omitida.",
      );
    }
  } else {
    warnings.push(
      "Dados do ventilador não fornecidos. FanSpec omitido do payload.",
    );
  }

  // ── Construir SystemComponentsInput ─────────────────────────────────────
  const systemComponents: SystemComponentsInput = {
    compressor: compressorSpec,
    evaporator: { progressive_input: progressiveInput },
    condenser: condenserSpec,
    evaporator_fan: evaporatorFan,
    system_conditions: {
      ambient_temp_c: data.ambient_temp_c ?? 35,
      required_airflow_m3_h: data.fan?.airflow_m3_h ?? data.air.air_mass_flow_kg_s * 3600 / 1.2,
    },
  };

  // ── Construir MachineSpec ────────────────────────────────────────────────
  const nominalCapacity = data.refrigeration.compressor_capacity_w;
  const nominalPower = data.refrigeration.compressor_power_w +
    (data.fan?.motor_power_w ?? 0);
  const nominalCop = nominalPower > 0 ? nominalCapacity / nominalPower : 0;

  const machineSpec: MachineSpec = {
    machine_id: data.workspace_id,
    model: data.workspace_model,
    nominal_capacity_w: nominalCapacity,
    nominal_power_w: nominalPower,
    nominal_cop: nominalCop,
    nominal_evap_temp_c: data.refrigeration.T_evaporating_c,
    nominal_cond_temp_c: data.refrigeration.T_condensing_c,
    nominal_ambient_temp_c: data.ambient_temp_c ?? 35,
    ...data.machine_spec_override,
  };

  // ── Validações de consistência ───────────────────────────────────────────
  if (data.refrigeration.condenser_heat_rejection_w < data.refrigeration.compressor_capacity_w) {
    warnings.push(
      "condenser_heat_rejection_w < compressor_capacity_w. " +
        "Verifique o balanço térmico do condensador.",
    );
  }

  const airflowM3h = data.fan?.airflow_m3_h ?? data.air.air_mass_flow_kg_s * 3600 / 1.2;
  if (airflowM3h < 100) {
    warnings.push(
      `Vazão de ar calculada muito baixa (${airflowM3h.toFixed(0)} m³/h). ` +
        "Verifique air_mass_flow_kg_s ou fan.airflow_m3_h.",
    );
  }

  // ── Montar payload ───────────────────────────────────────────────────────
  const payload: WorkspaceHubPayload = {
    workspace_id: data.workspace_id,
    workspace_model: data.workspace_model,
    workspace_type: data.workspace_type,
    system_components: systemComponents,
    machine_spec: machineSpec,
    mapped_at: new Date().toISOString(),
    mapping_warnings: warnings,
  };

  return { success: true, payload, errors: [], warnings };
}
