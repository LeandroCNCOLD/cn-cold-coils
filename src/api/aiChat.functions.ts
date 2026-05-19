import { createServerFn } from "@tanstack/react-start";
import { requireAuthOrDev } from "./auth-or-dev";
import { getAIApiKeyServer } from "./aiSettings.functions";
import type { AIAssistantMessage } from "@/modules/coldpro/types/frontend.types";

const SYSTEM_PROMPT = `Você é o Engenheiro Assistente ColdPro, especialista em sistemas de refrigeração industrial.
Você auxilia engenheiros e técnicos a configurar, calcular e interpretar sistemas usando o motor ColdPro V2 da CN COLD / ColdAxis.

Regras invioláveis:
1. Você NUNCA substitui o motor físico. O motor calcula; você interpreta e recomenda.
2. Toda sugestão deve ter justificativa técnica explícita.
3. Use terminologia técnica de refrigeração (ASHRAE, EN 12900, AHRI 540).`;

export const askAssistantFn = createServerFn({ method: "POST" })
  .middleware([requireAuthOrDev])
  .inputValidator((input: { messages: AIAssistantMessage[]; context?: string }) => input)
  .handler(async ({ data }) => {
    const credentials = await getAIApiKeyServer();
    if (!credentials) {
      return "IA Assistente não configurada. Acesse Configurações → Integrações de IA.";
    }

    const { provider, apiKey } = credentials;
    const systemContent =
      SYSTEM_PROMPT + (data.context ? `\n\nContexto atual:\n${data.context}` : "");

    if (provider === "anthropic") {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-5-haiku-20241022",
          max_tokens: 1000,
          system: systemContent,
          messages: data.messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!response.ok) return `Erro na IA: ${response.status}`;
      const json = (await response.json()) as { content?: { text?: string }[] };
      return json.content?.[0]?.text ?? "Erro ao obter resposta.";
    } else {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemContent },
            ...data.messages.map((m) => ({ role: m.role, content: m.content })),
          ],
          temperature: 0.3,
          max_tokens: 1000,
        }),
      });
      if (!response.ok) return `Erro na IA: ${response.status}`;
      const json = (await response.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      return json.choices?.[0]?.message?.content ?? "Erro ao obter resposta.";
    }
  });
