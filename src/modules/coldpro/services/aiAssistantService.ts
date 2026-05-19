import { useServerFn } from "@tanstack/react-start";
import { askAssistantFn } from "@/api/aiChat.functions";
import type { AIAssistantMessage } from "../types/frontend.types";

export function useAskAssistant() {
  return useServerFn(askAssistantFn);
}

export async function askAssistant(
  messages: AIAssistantMessage[],
  context?: string,
): Promise<string> {
  const fn = askAssistantFn;
  return fn({ data: { messages, context } });
}

export function buildFieldHelpPrompt(
  fieldName: string,
  value: unknown,
  context: string,
): string {
  return `Campo: "${fieldName}" | Valor atual: "${value}" | Contexto: ${context}
Avalie se o valor é adequado e forneça orientação técnica em 2-3 frases objetivas.`;
}

export function buildResultInterpretationPrompt(resultType: string, result: unknown): string {
  return `Interprete o resultado de ${resultType} do motor ColdPro V2:
1. Avaliação geral (aprovado / atenção / crítico)
2. Principais observações técnicas (máximo 3)
3. Sugestões de melhoria, se houver

Resultado: ${JSON.stringify(result, null, 2)}`;
}
