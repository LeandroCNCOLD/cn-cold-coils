/**
 * wizardConfigEngine.ts — Sprint 8
 *
 * Motor de configuração do wizard de novo projeto.
 * Gera a configuração de passos do wizard de acordo com o perfil do usuário:
 *   - `design`     : todos os campos disponíveis (engenheiro)
 *   - `sales`      : campos simplificados (vendedor)
 *   - `production` : campos de produção e comissionamento
 *
 * Também valida se um passo pode ser avançado com base nos campos preenchidos.
 */

import type {
  WizardConfig,
  WizardStep,
  WizardStepId,
  WizardValidationResult,
} from "../../domain/types";

// ─── Definições de passos por perfil ─────────────────────────────────────────

interface StepDefinition {
  id: WizardStepId;
  title: string;
  description: string;
  required_fields: Record<"design" | "sales" | "production", string[]>;
  optional_fields: Record<"design" | "sales" | "production", string[]>;
}

const STEP_DEFINITIONS: StepDefinition[] = [
  {
    id: "application",
    title: "Aplicação",
    description: "Defina o tipo de aplicação e as condições do ambiente.",
    required_fields: {
      design: ["application_type", "ambient_temp_c", "required_capacity_w"],
      sales: ["application_type", "required_capacity_w"],
      production: ["application_type", "ambient_temp_c"],
    },
    optional_fields: {
      design: ["altitude_m", "safety_factor"],
      sales: ["ambient_temp_c"],
      production: ["safety_factor"],
    },
  },
  {
    id: "refrigerant",
    title: "Fluido Refrigerante",
    description: "Selecione o fluido refrigerante e as temperaturas de operação.",
    required_fields: {
      design: ["refrigerant", "T_evaporating_c", "T_condensing_c"],
      sales: ["refrigerant"],
      production: ["refrigerant", "T_evaporating_c", "T_condensing_c"],
    },
    optional_fields: {
      design: ["superheat_k", "subcooling_k"],
      sales: ["T_evaporating_c", "T_condensing_c"],
      production: ["superheat_k", "subcooling_k"],
    },
  },
  {
    id: "geometry",
    title: "Geometria do Serpentinado",
    description: "Defina as dimensões e geometria do trocador de calor.",
    required_fields: {
      design: [
        "tube_outer_diameter_mm",
        "tube_pitch_transverse_mm",
        "fin_spacing_mm",
        "coil_width_m",
        "coil_height_m",
      ],
      sales: ["coil_width_m", "coil_height_m"],
      production: [
        "tube_outer_diameter_mm",
        "fin_spacing_mm",
        "coil_width_m",
        "coil_height_m",
      ],
    },
    optional_fields: {
      design: ["tube_material", "fin_material", "fin_thickness_mm"],
      sales: ["tube_outer_diameter_mm", "fin_spacing_mm"],
      production: ["tube_material", "fin_material"],
    },
  },
  {
    id: "thermal_conditions",
    title: "Condições Térmicas",
    description: "Informe as condições do ar de entrada e saída.",
    required_fields: {
      design: ["T_air_in_c", "RH_air_in", "air_mass_flow_kg_s"],
      sales: ["T_air_in_c", "RH_air_in"],
      production: ["T_air_in_c", "RH_air_in", "air_mass_flow_kg_s"],
    },
    optional_fields: {
      design: ["T_air_out_setpoint_c", "RH_air_out_setpoint"],
      sales: ["air_mass_flow_kg_s"],
      production: ["T_air_out_setpoint_c"],
    },
  },
  {
    id: "compressor",
    title: "Compressor",
    description: "Selecione o compressor e informe seus dados de desempenho.",
    required_fields: {
      design: ["compressor_model", "cooling_capacity_w", "power_w"],
      sales: ["cooling_capacity_w"],
      production: ["compressor_model", "cooling_capacity_w", "power_w"],
    },
    optional_fields: {
      design: ["motor_current_a", "voltage_v", "phases"],
      sales: ["compressor_model", "power_w"],
      production: ["motor_current_a", "voltage_v"],
    },
  },
  {
    id: "fans",
    title: "Ventiladores",
    description: "Configure os ventiladores do evaporador e condensador.",
    required_fields: {
      design: ["fan_airflow_m3_h", "fan_available_static_pressure_pa"],
      sales: ["fan_airflow_m3_h"],
      production: ["fan_airflow_m3_h", "fan_available_static_pressure_pa"],
    },
    optional_fields: {
      design: ["fan_motor_power_w", "fan_motor_current_a"],
      sales: ["fan_motor_power_w"],
      production: ["fan_motor_power_w", "fan_motor_current_a"],
    },
  },
  {
    id: "review",
    title: "Revisão",
    description: "Revise todos os dados antes de calcular.",
    required_fields: {
      design: [],
      sales: [],
      production: [],
    },
    optional_fields: {
      design: ["notes"],
      sales: ["notes"],
      production: ["notes", "serial_number"],
    },
  },
];

// ─── Funções auxiliares ───────────────────────────────────────────────────────

function buildStep(
  def: StepDefinition,
  profile: "design" | "sales" | "production",
  index: number,
  total: number,
): WizardStep {
  const prevId = index > 0 ? STEP_DEFINITIONS[index - 1].id : null;
  const nextId = index < total - 1 ? STEP_DEFINITIONS[index + 1].id : null;

  return {
    id: def.id,
    title: def.title,
    description: def.description,
    required_fields: def.required_fields[profile],
    optional_fields: def.optional_fields[profile],
    next_step: nextId,
    prev_step: prevId,
  };
}

// ─── Motor principal ──────────────────────────────────────────────────────────

/**
 * Gera a configuração completa do wizard para um perfil de usuário.
 */
export function buildWizardConfig(
  profile: "design" | "sales" | "production",
): WizardConfig {
  const steps: WizardStep[] = STEP_DEFINITIONS.map((def, index) =>
    buildStep(def, profile, index, STEP_DEFINITIONS.length),
  );

  return {
    steps,
    total_steps: steps.length,
    profile,
  };
}

/**
 * Valida se um passo do wizard pode ser avançado com base nos campos preenchidos.
 *
 * @param step_id - ID do passo a validar
 * @param profile - Perfil do usuário
 * @param filled_fields - Lista de campos que foram preenchidos pelo usuário
 */
export function validateWizardStep(
  step_id: WizardStepId,
  profile: "design" | "sales" | "production",
  filled_fields: string[],
): WizardValidationResult {
  const warnings: string[] = [];

  const def = STEP_DEFINITIONS.find((d) => d.id === step_id);
  if (!def) {
    return {
      step_id,
      is_valid: false,
      missing_required: [],
      warnings: [`Passo '${step_id}' não encontrado na configuração do wizard.`],
      can_advance: false,
    };
  }

  const required = def.required_fields[profile];
  const filled = new Set(filled_fields);

  const missing_required = required.filter((field) => !filled.has(field));

  if (missing_required.length > 0) {
    warnings.push(
      `Campos obrigatórios não preenchidos: ${missing_required.join(", ")}.`,
    );
  }

  const is_valid = missing_required.length === 0;

  return {
    step_id,
    is_valid,
    missing_required,
    warnings,
    can_advance: is_valid,
  };
}

/**
 * Retorna o índice de um passo pelo seu ID.
 */
export function getStepIndex(step_id: WizardStepId): number {
  return STEP_DEFINITIONS.findIndex((d) => d.id === step_id);
}

/**
 * Retorna o progresso percentual do wizard (0..100).
 */
export function getWizardProgress(
  current_step_id: WizardStepId,
  total_steps: number,
): number {
  const index = getStepIndex(current_step_id);
  if (index < 0) return 0;
  return Math.round(((index + 1) / total_steps) * 100);
}
