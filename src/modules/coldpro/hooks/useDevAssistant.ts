import { useState, useCallback } from "react";
import { getRecentCommits, createFixPR } from "../services/githubService";
import type { Commit, PRResult } from "../services/githubService";

export interface DevMessage {
  role: "user" | "assistant";
  content: string;
}

export interface FileToModify {
  path: string;
  content: string;
  explanation: string;
}

export interface DiagnosisResult {
  diagnosis: string;
  rootCause: string;
  filesToModify: FileToModify[];
  rawResponse: string;
}

export interface DevAssistantState {
  isLoading: boolean;
  result: DiagnosisResult | null;
  commits: Commit[];
  prResult: PRResult | null;
  error: string | null;
}

const SYSTEM_PROMPT = `You are a senior software engineer embedded in the CN COLD / ColdPro project.
Your job is to diagnose bugs, errors, and issues reported by the development team.

When given a problem report (text, stack trace, or screenshot description), you must respond with valid JSON following this exact schema:
{
  "diagnosis": "Clear explanation of what is wrong",
  "rootCause": "The underlying technical reason for the bug",
  "filesToModify": [
    {
      "path": "relative/path/to/file.ts",
      "content": "complete corrected file content here",
      "explanation": "what was changed and why"
    }
  ]
}

Rules:
- Always return valid JSON, nothing else.
- Include the full corrected file content, not just the diff.
- Be specific about file paths relative to the repo root.
- If you cannot identify files to modify, return an empty array for filesToModify.
- filesToModify should only include files where you are confident in the fix.`;

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

    const userContent: Array<{ type: string; text?: string; source?: object }> = [];

    userContent.push({
      type: "text",
      text: `Problem report:\n${text}${logText ? `\n\nLog/Stack trace:\n${logText}` : ""}${commitContext}`,
    });

    if (imageBase64) {
      const [meta, data] = imageBase64.split(",");
      const mediaType = meta.match(/:(.*?);/)?.[1] ?? "image/png";
      userContent.push({
        type: "image",
        source: { type: "base64", media_type: mediaType, data },
      });
    }

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
          model: "claude-opus-4-7",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
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
      } catch {
        parsed = { diagnosis: rawResponse, rootCause: "", filesToModify: [] };
      }

      setState((s) => ({
        ...s,
        isLoading: false,
        commits,
        result: { ...parsed, rawResponse },
      }));
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
    try {
      const pr = await createFixPR(
        result.filesToModify.map((f) => ({ path: f.path, content: f.content })),
        `fix: ${result.diagnosis.slice(0, 60)}`,
        `## Diagnóstico\n${result.diagnosis}\n\n## Causa raiz\n${result.rootCause}\n\n*Gerado pelo DevAssistant*`,
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
