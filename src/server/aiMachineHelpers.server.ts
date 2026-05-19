/**
 * aiMachineHelpers.ts — utilitários determinísticos da IA Engenheira (Sprint 9).
 *
 * Não chama o LLM. Apenas calcula índice de saúde, classifica, monta
 * contexto compacto, faz merge de parâmetros e flagga propostas que
 * exigem aprovação do engenheiro.
 *
 * Este arquivo é importado por `src/server/aiMachine.functions.ts`.
 */
import {
  validateMachine,
  evaluateSystemEquilibrium,
  calculateElectricalAnalysis,
  type CompressorSpec,
  type CondenserSpec,
  type MachineSpec,
  type MachineValidationReport,
  type SystemComponentsInput,
  type SystemEquilibriumResult,
  type ElectricalAnalysis,
} from "@/modules/coldpro_v2";
import type {
  AIComparativeRow,
  AIReconstructionDraftProposal,
  AIReconstructionResultProposal,
  MachineHealthClassification,
  ReconstructionConstraints,
} from "@/shared/aiMachineTypes";

// ─── Health Index ────────────────────────────────────────────────────────────

export function calculateHealthIndex(report: MachineValidationReport): number {
  const fails = report.criteria.filter((c) => c.status === "fail").length;
  const warns = report.criteria.filter((c) => c.status === "warning").length;
  const balanceError = report.operating_point.balance_error_pct ?? 0;
  const dischargeTemp = report.electrical_analysis
    ? // discharge não está exposto; usamos cond_temp_c + 30 K como proxy quando ausente
      Math.max(report.operating_point.cond_temp_c + 30, 0)
    : 0;
  let score = 100;
  score -= fails * 15;
  score -= warns * 5;
  score -= Math.max(0, balanceError - 5) * 2;
  score -= Math.max(0, dischargeTemp - 120) * 0.5;
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function classifyHealth(score: number): MachineHealthClassification {
  if (score >= 85) return "excelente";
  if (score >= 70) return "bom";
  if (score >= 50) return "regular";
  return "critico";
}

// ─── Build Context for LLM ───────────────────────────────────────────────────

export interface MachineContextBundle {
  spec: MachineSpec;
  components: SystemComponentsInput;
  report: MachineValidationReport;
  equilibrium: SystemEquilibriumResult;
  electrical: ElectricalAnalysis | null;
}

export function buildMachineContext(
  spec: MachineSpec,
  components: SystemComponentsInput,
): MachineContextBundle {
  const report = validateMachine(spec, components);
  const equilibrium = evaluateSystemEquilibrium(components);
  let electrical: ElectricalAnalysis | null = null;
  try {
    electrical = calculateElectricalAnalysis({
      system: components,
      q_evap_w: equilibrium.thermal_balance.q_evap_w,
    });
  } catch {
    electrical = null;
  }
  return { spec, components, report, equilibrium, electrical };
}

export function buildAuditUserPrompt(ctx: MachineContextBundle): string {
  const { spec, components, report, equilibrium, electrical } = ctx;
  const evap = components.evaporator.progressive_input;
  const total_power_w = electrical?.total_electrical_power_w ?? equilibrium.thermal_balance.compressor_power_w;
  const cop_system = electrical?.cop_system ?? report.operating_point.cop_system;
  return `
Analise o equipamento abaixo e emita um laudo técnico completo.

ESPECIFICAÇÃO NOMINAL:
Modelo: ${spec.model}
Capacidade nominal: ${(spec.nominal_capacity_w / 1000).toFixed(1)} kW
Potência nominal: ${(spec.nominal_power_w / 1000).toFixed(1)} kW
COP nominal: ${spec.nominal_cop.toFixed(2)}
T_evap nominal: ${spec.nominal_evap_temp_c} °C
T_cond nominal: ${spec.nominal_cond_temp_c} °C
T_ambiente nominal: ${spec.nominal_ambient_temp_c} °C
ΔT evaporador nominal: ${spec.nominal_delta_t_evap_k ?? "não informado"} K
ΔT condensador nominal: ${spec.nominal_delta_t_cond_k ?? "não informado"} K

RESULTADOS DA SIMULAÇÃO:
Capacidade real: ${(equilibrium.thermal_balance.q_evap_w / 1000).toFixed(2)} kW
Potência total real: ${(total_power_w / 1000).toFixed(2)} kW
COP real do sistema: ${cop_system.toFixed(3)}
T_evap real: ${components.compressor.evap_temp_c} °C
T_cond real: ${components.compressor.cond_temp_c} °C
Erro de balanço térmico: ${equilibrium.thermal_balance.balance_error_pct.toFixed(2)} %
Utilização compressor: ${equilibrium.utilization.compressor_pct.toFixed(1)} %
Utilização condensador: ${equilibrium.utilization.condenser_pct.toFixed(1)} %
Utilização evaporador: ${equilibrium.utilization.evaporator_pct.toFixed(1)} %

CRITÉRIOS DE VALIDAÇÃO (${report.criteria.length} critérios):
${report.criteria.map((c) => `- ${c.label}: ${c.status.toUpperCase()} — ${c.message}`).join("\n")}

DIAGNÓSTICOS DETALHADOS:
${
  report.criteria
    .filter((c) => c.diagnosis)
    .map((c) => `[${c.label}] ${c.diagnosis}`)
    .join("\n") || "Nenhum diagnóstico adicional."
}

GEOMETRIA DO EVAPORADOR:
Largura: ${evap?.coil_width_m ?? "—"} m | Altura: ${evap?.coil_height_m ?? "—"} m
Diâmetro do tubo: ${evap?.tube_outer_diameter_mm ?? "—"} mm
Passo transversal: ${evap?.tube_pitch_transverse_mm ?? "—"} mm | Longitudinal: ${evap?.tube_pitch_longitudinal_mm ?? "—"} mm
Espessura da aleta: ${evap?.fin_thickness_mm ?? "—"} mm
Rolls: ${
    evap?.rolls?.map((r) => `${r.rows_in_roll} filas @ ${r.fin_spacing_mm}mm`).join(", ") ?? "—"
  }

REFRIGERANTE: ${components.compressor.refrigerant}

Responda com JSON seguindo exatamente o schema solicitado (sem os campos
indice_saude e classificacao — eles são calculados pelo backend).
`.trim();
}

export function buildReconstructUserPrompt(
  laudoSummary: {
    indice_saude: number;
    classificacao: string;
    gargalo_dominante: string;
    sugestoes: { acao: string }[];
  },
  components: SystemComponentsInput,
  constraints: ReconstructionConstraints,
  numPropostas: number,
): string {
  const evap = components.evaporator.progressive_input;
  const c = components.compressor;
  return `
Com base no laudo abaixo, proponha ${numPropostas} configurações alternativas para
reconstruir o equipamento, respeitando rigorosamente as restrições informadas.

LAUDO RESUMIDO:
Índice de saúde: ${laudoSummary.indice_saude}/100 (${laudoSummary.classificacao})
Gargalo dominante: ${laudoSummary.gargalo_dominante}
Principais sugestões: ${laudoSummary.sugestoes
    .slice(0, 3)
    .map((s) => s.acao)
    .join("; ")}

CONFIGURAÇÃO ATUAL:
Evaporador: ${evap?.coil_width_m ?? "—"}m × ${evap?.coil_height_m ?? "—"}m
Rolls: ${evap?.rolls?.map((r) => `${r.rows_in_roll} filas @ ${r.fin_spacing_mm}mm`).join(", ") ?? "—"}
Compressor: ${(c.cooling_capacity_w / 1000).toFixed(2)} kW, T_evap=${c.evap_temp_c}°C, T_cond=${c.cond_temp_c}°C
Refrigerante: ${c.refrigerant}

RESTRIÇÕES DO ENGENHEIRO:
- Largura do evaporador: ${
    constraints.lock_coil_width_m
      ? `TRAVADA em ${evap?.coil_width_m}m`
      : `livre (máx: ${constraints.max_coil_width_m ?? "sem limite"}m)`
  }
- Altura do evaporador: ${
    constraints.lock_coil_height_m
      ? `TRAVADA em ${evap?.coil_height_m}m`
      : `livre (máx: ${constraints.max_coil_height_m ?? "sem limite"}m)`
  }
- Refrigerante: ${constraints.lock_refrigerant ? `TRAVADO (${c.refrigerant})` : "livre"}
- Tensão: ${constraints.lock_voltage ? "TRAVADA" : "livre"}
- Compressores disponíveis: ${constraints.available_compressor_models?.join(", ") ?? "qualquer"}
- Objetivo: ${constraints.priority}
- Limite de aumento de custo: ${constraints.max_cost_increase_pct ?? "sem limite"}%
- Notas: ${constraints.engineer_notes ?? "nenhuma"}

Responda com JSON contendo "propostas" (${numPropostas} propostas) e
"recomendacao_principal" (texto explicando qual proposta você recomenda e por quê).
`.trim();
}

// ─── Merge & constraints ────────────────────────────────────────────────────

export function mergeComponents(
  original: SystemComponentsInput,
  params: AIReconstructionDraftProposal["parametros_alterados"],
): SystemComponentsInput {
  const evap = original.evaporator.progressive_input;
  return {
    ...original,
    compressor: {
      ...original.compressor,
      ...(params.compressor.cooling_capacity_w != null && {
        cooling_capacity_w: params.compressor.cooling_capacity_w,
      }),
      ...(params.compressor.power_w != null && { power_w: params.compressor.power_w }),
      ...(params.compressor.evap_temp_c != null && { evap_temp_c: params.compressor.evap_temp_c }),
      ...(params.compressor.cond_temp_c != null && { cond_temp_c: params.compressor.cond_temp_c }),
    },
    evaporator: {
      progressive_input: {
        ...evap,
        ...(params.evaporador.coil_width_m != null && {
          coil_width_m: params.evaporador.coil_width_m,
        }),
        ...(params.evaporador.coil_height_m != null && {
          coil_height_m: params.evaporador.coil_height_m,
        }),
        ...(params.evaporador.tube_pitch_transverse_mm != null && {
          tube_pitch_transverse_mm: params.evaporador.tube_pitch_transverse_mm,
        }),
        ...(params.evaporador.tube_pitch_longitudinal_mm != null && {
          tube_pitch_longitudinal_mm: params.evaporador.tube_pitch_longitudinal_mm,
        }),
        rolls: (evap?.rolls ?? []).map((roll, i) => ({
          ...roll,
          ...(i === 0 &&
            params.evaporador.fin_spacing_mm_roll1 != null && {
              fin_spacing_mm: params.evaporador.fin_spacing_mm_roll1,
            }),
          ...(i === 0 &&
            params.evaporador.rows_roll1 != null && {
              rows_in_roll: params.evaporador.rows_roll1,
            }),
          ...(i === 1 &&
            params.evaporador.fin_spacing_mm_roll2 != null && {
              fin_spacing_mm: params.evaporador.fin_spacing_mm_roll2,
            }),
          ...(i === 1 &&
            params.evaporador.rows_roll2 != null && {
              rows_in_roll: params.evaporador.rows_roll2,
            }),
        })),
      },
    },
  };
}

export function mergeSpec(
  original: MachineSpec,
  params: AIReconstructionDraftProposal["parametros_alterados"],
): MachineSpec {
  const next = { ...original };
  if (params.compressor.cooling_capacity_w != null) {
    next.nominal_capacity_w = params.compressor.cooling_capacity_w;
  }
  if (params.compressor.power_w != null) {
    next.nominal_power_w = params.compressor.power_w;
  }
  if (next.nominal_power_w > 0) {
    next.nominal_cop = next.nominal_capacity_w / next.nominal_power_w;
  }
  if (params.compressor.evap_temp_c != null) {
    next.nominal_evap_temp_c = params.compressor.evap_temp_c;
  }
  if (params.compressor.cond_temp_c != null) {
    next.nominal_cond_temp_c = params.compressor.cond_temp_c;
  }
  return next;
}

export function applyConstraints(
  params: AIReconstructionDraftProposal["parametros_alterados"],
  original: SystemComponentsInput,
  constraints: ReconstructionConstraints,
): AIReconstructionDraftProposal["parametros_alterados"] {
  return {
    ...params,
    evaporador: {
      ...params.evaporador,
      coil_width_m: constraints.lock_coil_width_m ? null : params.evaporador.coil_width_m,
      coil_height_m: constraints.lock_coil_height_m ? null : params.evaporador.coil_height_m,
    },
    compressor: {
      ...params.compressor,
      modelo_sugerido: constraints.available_compressor_models
        ? constraints.available_compressor_models.includes(params.compressor.modelo_sugerido ?? "")
          ? params.compressor.modelo_sugerido
          : null
        : params.compressor.modelo_sugerido,
    },
  };
}

export function flagApprovalRequired(
  proposta: AIReconstructionDraftProposal,
  original: SystemComponentsInput,
): { requer: boolean; motivo: string | null } {
  const evap = original.evaporator.progressive_input;
  const reasons: string[] = [];
  const p = proposta.parametros_alterados;
  if (p.evaporador.coil_width_m != null && evap?.coil_width_m) {
    const delta = Math.abs(p.evaporador.coil_width_m - evap.coil_width_m) / evap.coil_width_m;
    if (delta > 0.2) reasons.push(`Largura do evaporador alterada em ${(delta * 100).toFixed(0)}% (limite: 20%)`);
  }
  if (p.evaporador.coil_height_m != null && evap?.coil_height_m) {
    const delta = Math.abs(p.evaporador.coil_height_m - evap.coil_height_m) / evap.coil_height_m;
    if (delta > 0.2) reasons.push(`Altura do evaporador alterada em ${(delta * 100).toFixed(0)}% (limite: 20%)`);
  }
  if (p.compressor.cooling_capacity_w != null && original.compressor.cooling_capacity_w) {
    const delta =
      Math.abs(p.compressor.cooling_capacity_w - original.compressor.cooling_capacity_w) /
      original.compressor.cooling_capacity_w;
    if (delta > 0.3) reasons.push(`Capacidade do compressor alterada em ${(delta * 100).toFixed(0)}% (limite: 30%)`);
  }
  return {
    requer: reasons.length > 0 || proposta.altera_gabinete,
    motivo: reasons.length > 0 ? reasons.join("; ") : null,
  };
}

// ─── Comparativo ────────────────────────────────────────────────────────────

export function buildComparativeTable(
  baseline: { capacity_w: number; cop_system: number; total_power_w: number },
  propostas: AIReconstructionResultProposal[],
): AIComparativeRow[] {
  const slot = (p: AIReconstructionResultProposal | undefined, accessor: (r: AIReconstructionResultProposal) => string | number | null) =>
    p ? accessor(p) : null;
  const a = propostas[0];
  const b = propostas[1];
  const c = propostas[2];
  const d = propostas[3];

  const fmt = (v: number | undefined | null, divisor = 1, digits = 2) =>
    v == null || !Number.isFinite(v) ? null : Number((v / divisor).toFixed(digits));

  const capRow = (p: AIReconstructionResultProposal) =>
    fmt(p.resultado_simulado?.operating_point.capacity_w ?? null, 1000);
  const copRow = (p: AIReconstructionResultProposal) =>
    fmt(p.resultado_simulado?.operating_point.cop_system ?? null, 1, 3);
  const powerRow = (p: AIReconstructionResultProposal) =>
    fmt(p.resultado_simulado?.operating_point.total_power_w ?? null, 1000);

  const rows: AIComparativeRow[] = [
    {
      parametro: "Capacidade",
      original: fmt(baseline.capacity_w, 1000),
      proposta_a: slot(a, capRow),
      proposta_b: slot(b, capRow),
      proposta_c: slot(c, capRow),
      proposta_d: slot(d, capRow),
      unidade: "kW",
    },
    {
      parametro: "COP Sistema",
      original: fmt(baseline.cop_system, 1, 3),
      proposta_a: slot(a, copRow),
      proposta_b: slot(b, copRow),
      proposta_c: slot(c, copRow),
      proposta_d: slot(d, copRow),
      unidade: "—",
    },
    {
      parametro: "Potência Total",
      original: fmt(baseline.total_power_w, 1000),
      proposta_a: slot(a, powerRow),
      proposta_b: slot(b, powerRow),
      proposta_c: slot(c, powerRow),
      proposta_d: slot(d, powerRow),
      unidade: "kW",
    },
    {
      parametro: "Altera Gabinete",
      original: "—",
      proposta_a: slot(a, (p) => (p.altera_gabinete ? "Sim" : "Não")),
      proposta_b: slot(b, (p) => (p.altera_gabinete ? "Sim" : "Não")),
      proposta_c: slot(c, (p) => (p.altera_gabinete ? "Sim" : "Não")),
      proposta_d: slot(d, (p) => (p.altera_gabinete ? "Sim" : "Não")),
      unidade: "",
    },
    {
      parametro: "Altera Compressor",
      original: "—",
      proposta_a: slot(a, (p) => (p.altera_compressor ? "Sim" : "Não")),
      proposta_b: slot(b, (p) => (p.altera_compressor ? "Sim" : "Não")),
      proposta_c: slot(c, (p) => (p.altera_compressor ? "Sim" : "Não")),
      proposta_d: slot(d, (p) => (p.altera_compressor ? "Sim" : "Não")),
      unidade: "",
    },
  ];
  return rows;
}

// ─── Utilitário de chamada de IA (Anthropic ou OpenAI via app_settings) ──────

interface LovableAICallOptions {
  systemPrompt: string;
  userPrompt: string;
  jsonSchema: Record<string, unknown>;
  schemaName: string;
  model?: string;
}

export interface LovableAIResponse<T> {
  parsed: T;
  tokens_used?: number;
}

export async function callAIJson<T>(
  options: LovableAICallOptions,
): Promise<LovableAIResponse<T>> {
  const { getAIApiKeyServer } = await import("@/api/aiSettings.functions");
  const credentials = await getAIApiKeyServer();

  if (!credentials) {
    throw new Error(
      "Chave de IA não configurada. Acesse Configurações → Integrações de IA para configurar.",
    );
  }

  const { provider, apiKey } = credentials;

  if (provider === "anthropic") {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4096,
        system: options.systemPrompt,
        messages: [{ role: "user", content: options.userPrompt }],
      }),
    });
    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      if (response.status === 429) throw new Error("Limite de requisições da IA atingido.");
      if (response.status === 401)
        throw new Error(
          "Chave Anthropic inválida. Reconfigure em Configurações → Integrações de IA.",
        );
      throw new Error(`Erro Anthropic (${response.status}): ${errText.slice(0, 200)}`);
    }
    const json = (await response.json()) as {
      content?: { text?: string }[];
      usage?: { input_tokens?: number; output_tokens?: number };
    };
    const content = json.content?.[0]?.text;
    if (!content) throw new Error("Resposta da IA sem conteúdo.");
    let parsed: T;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsed = JSON.parse(jsonMatch?.[0] ?? content) as T;
    } catch {
      throw new Error("Resposta da IA não é JSON válido.");
    }
    return {
      parsed,
      tokens_used: (json.usage?.input_tokens ?? 0) + (json.usage?.output_tokens ?? 0),
    };
  } else {
    // OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: options.systemPrompt },
          { role: "user", content: options.userPrompt },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: options.schemaName,
            strict: true,
            schema: options.jsonSchema,
          },
        },
      }),
    });
    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      if (response.status === 429) throw new Error("Limite de requisições da IA atingido.");
      if (response.status === 401)
        throw new Error(
          "Chave OpenAI inválida. Reconfigure em Configurações → Integrações de IA.",
        );
      throw new Error(`Erro OpenAI (${response.status}): ${errText.slice(0, 200)}`);
    }
    const json = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
      usage?: { total_tokens?: number };
    };
    const content = json.choices?.[0]?.message?.content;
    if (!content) throw new Error("Resposta da IA sem conteúdo.");
    let parsed: T;
    try {
      parsed = JSON.parse(content) as T;
    } catch {
      throw new Error("Resposta da IA não é JSON válido.");
    }
    return { parsed, tokens_used: json.usage?.total_tokens };
  }
}

/** @deprecated Use callAIJson */
export const callLovableAIJson = callAIJson;
