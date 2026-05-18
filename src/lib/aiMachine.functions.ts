/**
 * aiMachine.functions.ts — Server functions da IA Engenheira (Sprint 9).
 *
 * - aiAuditMachine: roda motores determinísticos + LLM e devolve laudo
 * - aiReconstructMachine: gera propostas via LLM e simula cada uma
 */
import { createServerFn } from "@tanstack/react-start";
import { requireAuthOrDev } from "@/api/auth-or-dev";
import {
  validateMachine,
  type MachineSpec,
  type SystemComponentsInput,
} from "@/modules/coldpro_v2";
import {
  applyConstraints,
  buildAuditUserPrompt,
  buildComparativeTable,
  buildMachineContext,
  buildReconstructUserPrompt,
  calculateHealthIndex,
  callLovableAIJson,
  classifyHealth,
  flagApprovalRequired,
  mergeComponents,
  mergeSpec,
} from "@/server/aiMachineHelpers.server";
import type {
  AIMachineAuditResult,
  AIReconstructionDraftProposal,
  AIReconstructionResult,
  AIReconstructionResultProposal,
  ReconstructionConstraints,
} from "@/shared/aiMachineTypes";

const SYSTEM_PROMPT_AUDIT = `Você é a IA Engenheira de Produto do CN Coils, especialista em projeto e otimização
de evaporadores, condensadores e sistemas de refrigeração industrial.

REGRAS:
1. Analise SEMPRE as interações entre componentes, não cada um isoladamente.
2. Identifique o gargalo dominante.
3. Considere impacto no consumo de energia e vida útil.
4. Priorize sugestões pela relação ganho/complexidade.
5. Declare dados_insuficientes quando faltarem informações importantes.
6. laudo_executivo: texto corrido (300-500 palavras), sem markdown.
7. resumo_para_comercial: acessível, sem jargão técnico.
8. Responda APENAS com JSON válido.

CONHECIMENTO:
- T_evap +1K → COP +~3% (ASHRAE).
- T_cond -1K → COP +~2% (ASHRAE).
- T_descarga > 130°C: risco de degradação do óleo. > 150°C: risco crítico.
- Balanço térmico aceitável: < 5%. Acima de 10% indica subdimensionamento severo.`;

const SYSTEM_PROMPT_RECONSTRUCT = `Você é a IA Engenheira de Produto do CN Coils no modo de Reconstrução.

REGRAS:
1. Cada proposta tem objetivo distinto.
2. Respeite ABSOLUTAMENTE restrições de dimensões travadas.
3. Variações > limites automáticos exigem requer_aprovacao_engenheiro=true com motivo.
4. Limites automáticos: largura/altura ±20%, aletas ±30%, filas ±2, capacidade ±30%, T_evap/T_cond ±5K.
5. Estimativas ganho_estimado_ia_* são SUAS antes da simulação real.
6. Seja conservador — o sistema vai simular e mostrar o real.
7. Responda APENAS com JSON válido.`;

// ─── JSON schemas (relaxados, sem strict deep) ───────────────────────────────

const numberOrNull = { type: ["number", "null"] } as const;
const stringOrNull = { type: ["string", "null"] } as const;

const AUDIT_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  properties: {
    laudo_executivo: { type: "string" },
    gargalo_dominante: {
      type: "string",
      enum: [
        "compressor",
        "evaporador",
        "condensador",
        "ventilador_evaporador",
        "ventilador_condensador",
        "eletrico",
        "sistema",
        "controle",
        "indefinido",
      ],
    },
    confianca_diagnostico: { type: "number" },
    pontos_criticos: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          componente: {
            type: "string",
            enum: ["evaporador", "condensador", "compressor", "sistema", "eletrico", "ventilacao"],
          },
          severidade: { type: "string", enum: ["critico", "atencao", "observacao"] },
          descricao: { type: "string" },
          evidencias: { type: "array", items: { type: "string" } },
          impacto_no_cop_pct: numberOrNull,
          impacto_na_capacidade_pct: numberOrNull,
          risco_operacional: stringOrNull,
        },
        required: [
          "componente",
          "severidade",
          "descricao",
          "evidencias",
          "impacto_no_cop_pct",
          "impacto_na_capacidade_pct",
          "risco_operacional",
        ],
      },
    },
    riscos_operacionais: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          tipo: { type: "string" },
          severidade: { type: "string", enum: ["critico", "alto", "medio", "baixo"] },
          descricao: { type: "string" },
          consequencia: { type: "string" },
          acao_recomendada: { type: "string" },
        },
        required: ["tipo", "severidade", "descricao", "consequencia", "acao_recomendada"],
      },
    },
    oportunidades_otimizacao: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          tipo: { type: "string" },
          componente_alvo: { type: "string" },
          descricao: { type: "string" },
          ganho_estimado_cop_pct: numberOrNull,
          ganho_estimado_capacidade_pct: numberOrNull,
          complexidade: { type: "string", enum: ["baixa", "media", "alta"] },
        },
        required: [
          "tipo",
          "componente_alvo",
          "descricao",
          "ganho_estimado_cop_pct",
          "ganho_estimado_capacidade_pct",
          "complexidade",
        ],
      },
    },
    sugestoes: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          prioridade: { type: "integer", enum: [1, 2, 3] },
          acao: { type: "string" },
          componente_alvo: { type: "string" },
          justificativa_tecnica: { type: "string" },
          ganho_estimado_cop_pct: numberOrNull,
          ganho_estimado_capacidade_pct: numberOrNull,
          requer_mudanca_gabinete: { type: "boolean" },
          requer_simulacao_obrigatoria: { type: "boolean" },
          complexidade: { type: "string", enum: ["baixa", "media", "alta"] },
        },
        required: [
          "prioridade",
          "acao",
          "componente_alvo",
          "justificativa_tecnica",
          "ganho_estimado_cop_pct",
          "ganho_estimado_capacidade_pct",
          "requer_mudanca_gabinete",
          "requer_simulacao_obrigatoria",
          "complexidade",
        ],
      },
    },
    dados_insuficientes: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          parametro: { type: "string" },
          impacto_na_analise: { type: "string" },
          recomendacao_para_coleta: { type: "string" },
        },
        required: ["parametro", "impacto_na_analise", "recomendacao_para_coleta"],
      },
    },
    resumo_para_engenharia: { type: "string" },
    resumo_para_comercial: { type: "string" },
  },
  required: [
    "laudo_executivo",
    "gargalo_dominante",
    "confianca_diagnostico",
    "pontos_criticos",
    "riscos_operacionais",
    "oportunidades_otimizacao",
    "sugestoes",
    "dados_insuficientes",
    "resumo_para_engenharia",
    "resumo_para_comercial",
  ],
};

const RECONSTRUCT_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  properties: {
    propostas: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          id: { type: "string", enum: ["proposta_A", "proposta_B", "proposta_C", "proposta_D"] },
          titulo: { type: "string" },
          descricao: { type: "string" },
          parametros_alterados: {
            type: "object",
            additionalProperties: false,
            properties: {
              evaporador: {
                type: "object",
                additionalProperties: false,
                properties: {
                  coil_width_m: numberOrNull,
                  coil_height_m: numberOrNull,
                  fin_spacing_mm_roll1: numberOrNull,
                  fin_spacing_mm_roll2: numberOrNull,
                  rows_roll1: numberOrNull,
                  rows_roll2: numberOrNull,
                  tube_pitch_transverse_mm: numberOrNull,
                  tube_pitch_longitudinal_mm: numberOrNull,
                },
                required: [
                  "coil_width_m",
                  "coil_height_m",
                  "fin_spacing_mm_roll1",
                  "fin_spacing_mm_roll2",
                  "rows_roll1",
                  "rows_roll2",
                  "tube_pitch_transverse_mm",
                  "tube_pitch_longitudinal_mm",
                ],
              },
              compressor: {
                type: "object",
                additionalProperties: false,
                properties: {
                  cooling_capacity_w: numberOrNull,
                  power_w: numberOrNull,
                  evap_temp_c: numberOrNull,
                  cond_temp_c: numberOrNull,
                  modelo_sugerido: stringOrNull,
                },
                required: ["cooling_capacity_w", "power_w", "evap_temp_c", "cond_temp_c", "modelo_sugerido"],
              },
            },
            required: ["evaporador", "compressor"],
          },
          ganho_estimado_ia_cop_pct: numberOrNull,
          ganho_estimado_ia_capacidade_pct: numberOrNull,
          altera_gabinete: { type: "boolean" },
          altera_compressor: { type: "boolean" },
          altera_refrigerante: { type: "boolean" },
          requer_aprovacao_engenheiro: { type: "boolean" },
          motivo_aprovacao: stringOrNull,
        },
        required: [
          "id",
          "titulo",
          "descricao",
          "parametros_alterados",
          "ganho_estimado_ia_cop_pct",
          "ganho_estimado_ia_capacidade_pct",
          "altera_gabinete",
          "altera_compressor",
          "altera_refrigerante",
          "requer_aprovacao_engenheiro",
          "motivo_aprovacao",
        ],
      },
    },
    recomendacao_principal: { type: "string" },
  },
  required: ["propostas", "recomendacao_principal"],
};

// ─── Validators (leves) ──────────────────────────────────────────────────────

function ensureSpec(input: unknown): MachineSpec {
  const s = input as MachineSpec;
  if (
    !s ||
    typeof s.nominal_capacity_w !== "number" ||
    typeof s.nominal_power_w !== "number" ||
    typeof s.nominal_evap_temp_c !== "number" ||
    typeof s.nominal_cond_temp_c !== "number"
  ) {
    throw new Error("MachineSpec inválida — campos obrigatórios ausentes.");
  }
  return s;
}

function ensureComponents(input: unknown): SystemComponentsInput {
  const c = input as SystemComponentsInput;
  if (!c?.compressor?.cooling_capacity_w || !c?.evaporator?.progressive_input) {
    throw new Error("SystemComponentsInput inválido.");
  }
  return c;
}

// ─── aiAuditMachine ──────────────────────────────────────────────────────────

export const aiAuditMachine = createServerFn({ method: "POST" })
  .middleware([requireAuthOrDev])
  .inputValidator((input: { spec: MachineSpec; components: SystemComponentsInput }) => ({
    spec: ensureSpec(input.spec),
    components: ensureComponents(input.components),
  }))
  .handler(async ({ data }) => {
    const ctx = buildMachineContext(data.spec, data.components);
    const indice_saude = calculateHealthIndex(ctx.report);
    const classificacao = classifyHealth(indice_saude);

    const { parsed, tokens_used } = await callLovableAIJson<Omit<AIMachineAuditResult, "indice_saude" | "classificacao" | "engine_version_used" | "generated_at" | "tokens_used" | "operating_point">>({
      systemPrompt: SYSTEM_PROMPT_AUDIT,
      userPrompt: buildAuditUserPrompt(ctx),
      jsonSchema: AUDIT_SCHEMA,
      schemaName: "ai_machine_audit",
      model: "google/gemini-2.5-pro",
    });

    const result: AIMachineAuditResult = {
      ...parsed,
      indice_saude,
      classificacao,
      engine_version_used: "2.1.0",
      generated_at: new Date().toISOString(),
      tokens_used,
      operating_point: ctx.report.operating_point,
    };
    return result;
  });

// ─── aiReconstructMachine ────────────────────────────────────────────────────

export const aiReconstructMachine = createServerFn({ method: "POST" })
  .middleware([requireAuthOrDev])
  .inputValidator(
    (input: {
      spec: MachineSpec;
      components: SystemComponentsInput;
      constraints: ReconstructionConstraints;
      num_propostas?: 2 | 3 | 4;
      laudo?: AIMachineAuditResult;
    }) => ({
      spec: ensureSpec(input.spec),
      components: ensureComponents(input.components),
      constraints: input.constraints,
      num_propostas: input.num_propostas ?? 3,
      laudo: input.laudo,
    }),
  )
  .handler(async ({ data }) => {
    // 1. Garantir laudo (gera se não veio do client)
    let laudo = data.laudo;
    if (!laudo) {
      const ctx = buildMachineContext(data.spec, data.components);
      const indice_saude = calculateHealthIndex(ctx.report);
      const classificacao = classifyHealth(indice_saude);
      const { parsed } = await callLovableAIJson<Omit<AIMachineAuditResult, "indice_saude" | "classificacao" | "engine_version_used" | "generated_at" | "tokens_used" | "operating_point">>({
        systemPrompt: SYSTEM_PROMPT_AUDIT,
        userPrompt: buildAuditUserPrompt(ctx),
        jsonSchema: AUDIT_SCHEMA,
        schemaName: "ai_machine_audit",
      });
      laudo = {
        ...parsed,
        indice_saude,
        classificacao,
        engine_version_used: "2.1.0",
        generated_at: new Date().toISOString(),
        operating_point: ctx.report.operating_point,
      };
    }

    // 2. Gerar rascunho via LLM
    const { parsed: draft } = await callLovableAIJson<{
      propostas: AIReconstructionDraftProposal[];
      recomendacao_principal: string;
    }>({
      systemPrompt: SYSTEM_PROMPT_RECONSTRUCT,
      userPrompt: buildReconstructUserPrompt(
        {
          indice_saude: laudo.indice_saude,
          classificacao: laudo.classificacao,
          gargalo_dominante: laudo.gargalo_dominante,
          sugestoes: laudo.sugestoes,
        },
        data.components,
        data.constraints,
        data.num_propostas,
      ),
      jsonSchema: RECONSTRUCT_SCHEMA,
      schemaName: "ai_reconstruction_draft",
      model: "google/gemini-2.5-pro",
    });

    // 3. Aplicar restrições + simular cada proposta
    const baseline = laudo.operating_point ?? buildMachineContext(data.spec, data.components).report.operating_point;

    const propostas: AIReconstructionResultProposal[] = draft.propostas.map((proposta) => {
      const safeParams = applyConstraints(proposta.parametros_alterados, data.components, data.constraints);
      const novosComponentes = mergeComponents(data.components, safeParams);
      const novaSpec = mergeSpec(data.spec, safeParams);
      const flag = flagApprovalRequired({ ...proposta, parametros_alterados: safeParams }, data.components);

      let resultado_simulado = null;
      let simulacao_valida = false;
      const erros_simulacao: string[] = [];
      try {
        resultado_simulado = validateMachine(novaSpec, novosComponentes);
        simulacao_valida = true;
      } catch (err) {
        erros_simulacao.push(err instanceof Error ? err.message : String(err));
      }

      const realCop = resultado_simulado?.operating_point.cop_system ?? null;
      const realCap = resultado_simulado?.operating_point.capacity_w ?? null;
      const realPow = resultado_simulado?.operating_point.total_power_w ?? null;

      const pct = (real: number | null, base: number) =>
        real != null && base > 0 ? ((real - base) / base) * 100 : null;

      return {
        ...proposta,
        parametros_alterados: safeParams,
        resultado_simulado,
        delta_cop_pct: pct(realCop, baseline.cop_system),
        delta_capacidade_pct: pct(realCap, baseline.capacity_w),
        delta_potencia_pct: pct(realPow, baseline.total_power_w),
        delta_custo_estimado_pct: null,
        requer_aprovacao_engenheiro: proposta.requer_aprovacao_engenheiro || flag.requer,
        motivo_aprovacao: proposta.motivo_aprovacao ?? flag.motivo,
        simulacao_valida,
        erros_simulacao: erros_simulacao.length > 0 ? erros_simulacao : undefined,
      };
    });

    const result: AIReconstructionResult = {
      propostas,
      comparativo: buildComparativeTable(baseline, propostas),
      recomendacao_principal: draft.recomendacao_principal,
      generated_at: new Date().toISOString(),
    };
    return result;
  });
