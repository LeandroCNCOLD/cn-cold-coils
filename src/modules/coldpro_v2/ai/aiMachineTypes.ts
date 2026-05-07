/**
 * aiMachineTypes.ts — tipos da IA Engenheira de Produto (Sprint 9).
 *
 * Estes tipos são compartilhados entre client e server. NÃO contêm lógica
 * — apenas estruturas. A lógica está em `aiMachineHelpers.ts` e nos
 * server functions em `src/server/aiMachine.functions.ts`.
 */
import type {
  MachineSpec,
  MachineValidationReport,
  SystemComponentsInput,
} from "../domain/types";

// ─── Restrições de Reconstrução ──────────────────────────────────────────────

export interface ReconstructionConstraints {
  // Dimensões físicas (implicam no gabinete)
  lock_coil_width_m: boolean;
  lock_coil_height_m: boolean;
  max_coil_width_m?: number;
  max_coil_height_m?: number;
  // Componentes
  lock_refrigerant: boolean;
  lock_voltage: boolean;
  available_compressor_models?: string[];
  // Custo e objetivo
  max_cost_increase_pct?: number;
  priority: "cop" | "capacity" | "cost" | "balanced";
  // Contexto do engenheiro
  engineer_notes?: string;
}

// ─── Classificações ──────────────────────────────────────────────────────────

export type MachineHealthClassification =
  | "excelente"
  | "bom"
  | "regular"
  | "critico";

export type MachineMainBottleneck =
  | "compressor"
  | "evaporador"
  | "condensador"
  | "ventilador_evaporador"
  | "ventilador_condensador"
  | "eletrico"
  | "sistema"
  | "controle"
  | "indefinido";

// ─── Entrada do Laudo ────────────────────────────────────────────────────────

export interface AIMachineAuditInput {
  spec: MachineSpec;
  components: SystemComponentsInput;
}

// ─── Resultado do Laudo ──────────────────────────────────────────────────────

export interface AIPontoCritico {
  componente:
    | "evaporador"
    | "condensador"
    | "compressor"
    | "sistema"
    | "eletrico"
    | "ventilacao";
  severidade: "critico" | "atencao" | "observacao";
  descricao: string;
  evidencias: string[];
  parametros_relacionados?: {
    nome: string;
    valor: string | number | null;
    unidade?: string;
    referencia?: string;
  }[];
  impacto_no_cop_pct: number | null;
  impacto_na_capacidade_pct: number | null;
  risco_operacional: string | null;
}

export interface AIRiscoOperacional {
  tipo: string;
  severidade: "critico" | "alto" | "medio" | "baixo";
  descricao: string;
  consequencia: string;
  acao_recomendada: string;
}

export interface AIOportunidade {
  tipo: string;
  componente_alvo: string;
  descricao: string;
  ganho_estimado_cop_pct: number | null;
  ganho_estimado_capacidade_pct: number | null;
  complexidade: "baixa" | "media" | "alta";
}

export interface AISugestao {
  prioridade: 1 | 2 | 3;
  acao: string;
  componente_alvo: string;
  justificativa_tecnica: string;
  ganho_estimado_cop_pct: number | null;
  ganho_estimado_capacidade_pct: number | null;
  requer_mudanca_gabinete: boolean;
  requer_simulacao_obrigatoria: boolean;
  complexidade: "baixa" | "media" | "alta";
}

export interface AIDadoInsuficiente {
  parametro: string;
  impacto_na_analise: string;
  recomendacao_para_coleta: string;
}

export interface AIMachineAuditResult {
  laudo_executivo: string;
  // Calculado deterministicamente pelo backend (não pela IA)
  indice_saude: number;
  classificacao: MachineHealthClassification;
  // Diagnóstico
  gargalo_dominante: MachineMainBottleneck;
  confianca_diagnostico: number;
  pontos_criticos: AIPontoCritico[];
  riscos_operacionais: AIRiscoOperacional[];
  oportunidades_otimizacao: AIOportunidade[];
  sugestoes: AISugestao[];
  dados_insuficientes: AIDadoInsuficiente[];
  resumo_para_engenharia: string;
  resumo_para_comercial?: string;
  // Metadados
  engine_version_used: string;
  generated_at: string;
  tokens_used?: number;
  // Útil para o modo Reconstrução
  operating_point?: MachineValidationReport["operating_point"];
}

// ─── Reconstrução ────────────────────────────────────────────────────────────

export interface AIReconstructionDraftProposal {
  id: "proposta_A" | "proposta_B" | "proposta_C" | "proposta_D";
  titulo: string;
  descricao: string;
  parametros_alterados: {
    evaporador: {
      coil_width_m: number | null;
      coil_height_m: number | null;
      fin_spacing_mm_roll1: number | null;
      fin_spacing_mm_roll2: number | null;
      rows_roll1: number | null;
      rows_roll2: number | null;
      tube_pitch_transverse_mm: number | null;
      tube_pitch_longitudinal_mm: number | null;
    };
    compressor: {
      cooling_capacity_w: number | null;
      power_w: number | null;
      evap_temp_c: number | null;
      cond_temp_c: number | null;
      modelo_sugerido: string | null;
    };
    condensador?: {
      coil_width_m?: number | null;
      coil_height_m?: number | null;
      rows?: number | null;
      fin_spacing_mm?: number | null;
      airflow_m3_h?: number | null;
    };
    ventilacao?: {
      evaporator_airflow_m3_h?: number | null;
      condenser_airflow_m3_h?: number | null;
      evaporator_fan_model?: string | null;
      condenser_fan_model?: string | null;
    };
  };
  ganho_estimado_ia_cop_pct: number | null;
  ganho_estimado_ia_capacidade_pct: number | null;
  altera_gabinete: boolean;
  altera_compressor: boolean;
  altera_refrigerante: boolean;
  requer_aprovacao_engenheiro: boolean;
  motivo_aprovacao: string | null;
}

export interface AIReconstructionResultProposal extends AIReconstructionDraftProposal {
  resultado_simulado: MachineValidationReport | null;
  delta_cop_pct: number | null;
  delta_capacidade_pct: number | null;
  delta_potencia_pct: number | null;
  delta_custo_estimado_pct: number | null;
  simulacao_valida: boolean;
  erros_simulacao?: string[];
}

export interface AIComparativeRow {
  parametro: string;
  original: string | number | null;
  proposta_a: string | number | null;
  proposta_b?: string | number | null;
  proposta_c?: string | number | null;
  proposta_d?: string | number | null;
  unidade: string;
}

export interface AIReconstructionResult {
  propostas: AIReconstructionResultProposal[];
  comparativo: AIComparativeRow[];
  recomendacao_principal: string;
  generated_at: string;
}
