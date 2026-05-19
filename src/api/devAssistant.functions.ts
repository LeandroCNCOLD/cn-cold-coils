import { createServerFn } from "@tanstack/react-start";
import { requireAuthOrDev } from "./auth-or-dev";
import { getAIApiKeyServer } from "./aiSettings.functions";

export interface DevAssistantMessage {
  type: "text" | "image";
  text?: string;
  source?: { type: "base64"; media_type: string; data: string };
}

export interface DevDiagnoseInput {
  systemPrompt: string;
  userContent: DevAssistantMessage[];
}

export const devDiagnoseFn = createServerFn({ method: "POST" })
  .middleware([requireAuthOrDev])
  .inputValidator((input: DevDiagnoseInput) => input)
  .handler(async ({ data }) => {
    const credentials = await getAIApiKeyServer();

    if (!credentials) {
      throw new Error(
        "Chave de IA não configurada. Acesse Configurações → Integrações de IA para configurar.",
      );
    }

    const { provider, apiKey } = credentials;

    if (provider === "anthropic") {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 4096,
          system: data.systemPrompt,
          messages: [{ role: "user", content: data.userContent }],
        }),
      });

      if (!res.ok) {
        const err = await res.text().catch(() => "");
        if (res.status === 401)
          throw new Error("Chave Anthropic inválida. Reconfigure em Configurações → Integrações de IA.");
        throw new Error(`Anthropic API error ${res.status}: ${err.slice(0, 200)}`);
      }

      const json = (await res.json()) as { content?: { text?: string }[] };
      return json.content?.[0]?.text ?? "";
    } else {
      // OpenAI — converter userContent para texto simples
      const textContent = data.userContent
        .filter((c) => c.type === "text")
        .map((c) => c.text ?? "")
        .join("\n");

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            { role: "system", content: data.systemPrompt },
            { role: "user", content: textContent },
          ],
        }),
      });

      if (!res.ok) {
        const err = await res.text().catch(() => "");
        if (res.status === 401)
          throw new Error("Chave OpenAI inválida. Reconfigure em Configurações → Integrações de IA.");
        throw new Error(`OpenAI API error ${res.status}: ${err.slice(0, 200)}`);
      }

      const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      return json.choices?.[0]?.message?.content ?? "";
    }
  });
