import { useState, useCallback } from "react";
import { getRecentCommits, createFixPR } from "../services/githubService";
import type { Commit, PRResult } from "../services/githubService";

export type DevMode = "bug" | "design";

export interface FileToModify {
  path: string;
  content: string;
  explanation: string;
}

export interface DesignFix {
  component: string;
  file: string;
  classNameBefore: string;
  classNameAfter: string;
  tokenUsed: string;
  beforePreview: string;
  afterPreview: string;
  explanation: string;
}

export interface DiagnosisResult {
  diagnosis: string;
  rootCause: string;
  filesToModify: FileToModify[];
  designFixes: DesignFix[];
  rawResponse: string;
}

export interface DevAssistantState {
  isLoading: boolean;
  result: DiagnosisResult | null;
  commits: Commit[];
  prResult: PRResult | null;
  error: string | null;
}

const BUG_PROMPT = `You are a senior software engineer embedded in the CN COLD / ColdPro project.
Your job is to diagnose bugs, errors, and issues reported by the development team.

Respond with valid JSON following this exact schema:
{
  "diagnosis": "Clear explanation of what is wrong",
  "rootCause": "The underlying technical reason for the bug",
  "filesToModify": [
    {
      "path": "relative/path/to/file.ts",
      "content": "complete corrected file content here",
      "explanation": "what was changed and why"
    }
  ],
  "designFixes": []
}

Rules:
- Always return valid JSON only, nothing else.
- Include full corrected file content, not diffs.
- File paths must be relative to repo root.
- filesToModify only where you are confident in the fix.`;

const DESIGN_PROMPT = `You are a senior UI engineer specializing in the CN COLD design system.
The project uses the "Industrial Bold" theme — dark backgrounds, ice-blue accents, Barlow fonts.

AVAILABLE CSS TOKENS (from src/design-system/cncold-tokens.css):
Fonts: --font-display (Barlow Condensed), --font-body (Barlow), --font-mono (JetBrains Mono)
Tailwind font classes: font-[family-name:var(--font-display)], font-[family-name:var(--font-body)], font-[family-name:var(--font-mono)]

Ice palette: --ice-50 to --ice-900 (primary accent: --ice-400 #38BDF8, buttons: --ice-500 #0EA5E9, hover: --ice-600 #0284C7)
Backgrounds: --bg-base #030B14, --bg-deep #060E1A, --bg-900 #0A1628 (sidebar), --bg-800 #0D1B30 (panels), --bg-700 #111F38 (cards), --bg-600 #162A52 (hover), --bg-500 #1E3A6E, --bg-input #0A1628
Borders: --border-subtle (10% ice), --border-default (18% ice), --border-strong (38% ice), --border-glow (60% ice)
Text: --text-primary #E2F4FF, --text-secondary #7BAACC, --text-muted #3D6180, --text-disabled #1E3A5F, --text-inverse #030B14
Semantic: --color-success #10B981, --color-warning #F59E0B, --color-danger #EF4444, --color-info #38BDF8
Radii: --radius-sm 4px, --radius-md 8px, --radius-lg 12px, --radius-xl 16px
Shadows: --shadow-sm, --shadow-md, --shadow-lg, --shadow-ice, --shadow-ice-strong

CN COLD UTILITY CLASSES (from cncold-tokens.css):
- cn-card → bg-[--bg-700] border border-[--border-default] rounded-[--radius-md]
- cn-panel → bg-[--bg-800]
- cn-bg-sidebar → bg-[--bg-900]
- cn-border, cn-border-subtle
- cn-ice → text-[--ice-400], cn-green, cn-yellow, cn-red, cn-muted, cn-secondary
- cn-kpi, cn-kpi--ice, cn-kpi--green, cn-kpi--warn, cn-kpi--red
- cn-badge--approved/pending/failed/draft/info
- cn-btn--primary/ghost/danger/success/agro
- cn-gap-xs/sm/md/lg/xl
- cn-glow-line, cn-animate-fade-up, cn-animate-pulse, cn-dot-live

RULES:
- NEVER create new tokens. Only use tokens listed above.
- Always use CSS custom property syntax in Tailwind: bg-[--bg-700], text-[--ice-400], border-[--border-default]
- For font-display use: font-[family-name:var(--font-display)] font-bold tracking-tight
- For font-body use: font-[family-name:var(--font-body)]
- For font-mono use: font-[family-name:var(--font-mono)]
- When you see a white/light background in a component, replace with --bg-700 or --bg-800
- When you see generic slate/gray colors, map to CN COLD tokens

Respond with valid JSON following this exact schema:
{
  "diagnosis": "What visual problem was identified",
  "rootCause": "Why it looks wrong (wrong token, missing class, etc.)",
  "filesToModify": [
    {
      "path": "relative/path/to/Component.tsx",
      "content": "complete corrected file content",
      "explanation": "what design change was applied"
    }
  ],
  "designFixes": [
    {
      "component": "ComponentName or element description",
      "file": "relative/path/to/file.tsx",
      "classNameBefore": "bg-white text-gray-700 border-gray-200",
      "classNameAfter": "bg-[--bg-700] text-[--text-primary] border-[--border-default]",
      "tokenUsed": "--bg-700, --text-primary, --border-default",
      "beforePreview": "[ Card with white background, gray text ]",
      "afterPreview": "[ Card with dark blue background, ice-white text, subtle blue border ]",
      "explanation": "Applied CN COLD dark card style instead of generic light card"
    }
  ]
}

Always return valid JSON only, nothing else.`;

function buildUserContent(
  text: string,
  imageBase64: string | null,
  logText: string | null,
  commitContext: string,
  mode: DevMode,
): Array<{ type: string; text?: string; source?: object }> {
  const label = mode === "design" ? "Design problem report" : "Problem report";
  const content: Array<{ type: string; text?: string; source?: object }> = [];

  content.push({
    type: "text",
    text: `${label}:\n${text}${logText ? `\n\nLog/Stack trace:\n${logText}` : ""}${commitContext}`,
  });

  if (imageBase64) {
    const [meta, data] = imageBase64.split(",");
    const mediaType = meta.match(/:(.*?);/)?.[1] ?? "image/png";
    content.push({ type: "image", source: { type: "base64", media_type: mediaType, data } });
  }

  return content;
}

export function useDevAssistant() {
  const [state, setState] = useState<DevAssistantState>({
    isLoading: false,
    result: null,
    commits: [],
    prResult: null,
    error: null,
  });

  const diagnose = useCallback(async (
    text: string,
    imageBase64: string | null,
    logText: string | null,
    mode: DevMode = "bug",
  ) => {
    setState((s) => ({ ...s, isLoading: true, result: null, prResult: null, error: null }));

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (!apiKey) {
      setState((s) => ({ ...s, isLoading: false, error: "VITE_ANTHROPIC_API_KEY não configurado." }));
      return;
    }

    let commits: Commit[] = [];
    try {
      commits = await getRecentCommits(10);
    } catch {
      // non-fatal
    }

    const commitContext = commits.length > 0
      ? `\n\nRecent commits:\n${commits.map((c) => `${c.sha} ${c.date.slice(0, 10)} ${c.author}: ${c.message}`).join("\n")}`
      : "";

    const systemPrompt = mode === "design" ? DESIGN_PROMPT : BUG_PROMPT;
    const userContent = buildUserContent(text, imageBase64, logText, commitContext, mode);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 4096,
          system: systemPrompt,
          messages: [{ role: "user", content: userContent }],
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        setState((s) => ({ ...s, isLoading: false, error: `Anthropic API error ${res.status}: ${err}` }));
        return;
      }

      const data = await res.json();
      const rawResponse = data.content?.[0]?.text ?? "";

      let parsed: Omit<DiagnosisResult, "rawResponse">;
      try {
        const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
        parsed = JSON.parse(jsonMatch?.[0] ?? rawResponse);
        parsed.designFixes ??= [];
        parsed.filesToModify ??= [];
      } catch {
        parsed = { diagnosis: rawResponse, rootCause: "", filesToModify: [], designFixes: [] };
      }

      setState((s) => ({ ...s, isLoading: false, commits, result: { ...parsed, rawResponse } }));
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoading: false,
        error: err instanceof Error ? err.message : String(err),
      }));
    }
  }, []);

  const applyFix = useCallback(async (result: DiagnosisResult) => {
    if (!result.filesToModify.length) return;
    setState((s) => ({ ...s, isLoading: true, prResult: null, error: null }));

    const isDesign = result.designFixes.length > 0;
    const prTitle = isDesign
      ? `fix(design): ${result.diagnosis.slice(0, 55)}`
      : `fix: ${result.diagnosis.slice(0, 60)}`;

    const designSection = isDesign
      ? `\n\n## Correções de design\n${result.designFixes.map((d) =>
          `- **${d.component}** (\`${d.file}\`)\n  - Antes: \`${d.classNameBefore}\`\n  - Depois: \`${d.classNameAfter}\`\n  - Token: \`${d.tokenUsed}\``
        ).join("\n")}`
      : "";

    const prBody = `## Diagnóstico\n${result.diagnosis}\n\n## Causa raiz\n${result.rootCause}${designSection}\n\n*Gerado pelo DevAssistant*`;

    try {
      const pr = await createFixPR(
        result.filesToModify.map((f) => ({ path: f.path, content: f.content })),
        prTitle,
        prBody,
      );
      setState((s) => ({ ...s, isLoading: false, prResult: pr }));
    } catch (err) {
      setState((s) => ({
        ...s,
        isLoading: false,
        error: err instanceof Error ? err.message : String(err),
      }));
    }
  }, []);

  const reset = useCallback(() => {
    setState({ isLoading: false, result: null, commits: [], prResult: null, error: null });
  }, []);

  return { ...state, diagnose, applyFix, reset };
}
