import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireAuthOrDev } from "./auth-or-dev";

export const getAISettings = createServerFn({ method: "GET" })
  .middleware([requireAuthOrDev])
  .handler(async () => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
    const { data } = await supabase
      .from("app_settings")
      .select("key, value")
      .in("key", ["ai_provider", "ai_api_key"]);

    const settings: Record<string, string> = {};
    for (const row of data ?? []) {
      if (row.key === "ai_api_key" && row.value) {
        const v = row.value;
        settings[row.key] =
          v.length > 12 ? `${v.slice(0, 8)}${"*".repeat(v.length - 12)}${v.slice(-4)}` : "****";
      } else {
        settings[row.key] = row.value;
      }
    }
    return settings;
  });

export const saveAISettings = createServerFn({ method: "POST" })
  .middleware([requireAuthOrDev])
  .inputValidator((input: { provider: "anthropic" | "openai"; api_key: string }) => input)
  .handler(async ({ data, context }) => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);

    if (!roles?.some((r) => r.role === "admin")) {
      throw new Error("Apenas administradores podem configurar integrações de IA.");
    }

    if (data.provider === "anthropic" && !data.api_key.startsWith("sk-ant-")) {
      throw new Error("Chave Anthropic inválida. Deve começar com sk-ant-");
    }
    if (data.provider === "openai" && !data.api_key.startsWith("sk-")) {
      throw new Error("Chave OpenAI inválida. Deve começar com sk-");
    }

    await supabase.from("app_settings").upsert([
      { key: "ai_provider", value: data.provider, updated_by: context.userId },
      { key: "ai_api_key", value: data.api_key, updated_by: context.userId },
    ]);

    return { success: true };
  });

export async function getAIApiKeyServer(): Promise<{ provider: string; apiKey: string } | null> {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const { data } = await supabase
    .from("app_settings")
    .select("key, value")
    .in("key", ["ai_provider", "ai_api_key"]);

  const map: Record<string, string> = {};
  for (const row of data ?? []) map[row.key] = row.value;

  if (!map.ai_api_key || !map.ai_provider) return null;
  return { provider: map.ai_provider, apiKey: map.ai_api_key };
}
