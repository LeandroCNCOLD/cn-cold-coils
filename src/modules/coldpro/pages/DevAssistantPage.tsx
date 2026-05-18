import { Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { useDevAssistant } from "../hooks/useDevAssistant";
import { DevAssistantInput } from "./dev/DevAssistantInput";
import { DevAssistantResponse } from "./dev/DevAssistantResponse";
import { Terminal, GitCommit } from "lucide-react";

export default function DevAssistantPage() {
  const { isAdmin } = useAuth();
  const isDev = import.meta.env.DEV;

  if (!isDev && !isAdmin) {
    return <Navigate to="/coldpro" />;
  }

  return <DevAssistantPageContent />;
}

function DevAssistantPageContent() {
  const { isLoading, result, commits, prResult, error, diagnose, applyFix, reset } = useDevAssistant();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center gap-3">
        <Terminal className="size-6 text-slate-700" />
        <div>
          <h1 className="text-xl font-bold tracking-tight">DevAssistant</h1>
          <p className="text-sm text-slate-500">Diagnóstico de bugs com IA — cole erros, stack traces ou anexe capturas</p>
        </div>
      </div>

      {!result && (
        <div className="border rounded-xl p-6 bg-white shadow-sm">
          <DevAssistantInput
            isLoading={isLoading}
            onSubmit={(text, img, log, mode) => diagnose(text, img, log, mode)}
          />
        </div>
      )}

      {(result || error) && (
        <div className="border rounded-xl p-6 bg-white shadow-sm">
          <DevAssistantResponse
            result={result ?? { diagnosis: "", rootCause: "", filesToModify: [], designFixes: [], rawResponse: "" }}
            prResult={prResult}
            isLoading={isLoading}
            error={error}
            onApplyFix={applyFix}
            onReset={reset}
          />
        </div>
      )}

      {commits.length > 0 && (
        <details className="text-xs">
          <summary className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-slate-700 select-none py-1">
            <GitCommit className="size-4" />
            Contexto injetado — últimos {commits.length} commits
          </summary>
          <div className="mt-2 border rounded-md overflow-hidden">
            <table className="w-full text-xs">
              <tbody>
                {commits.map((c) => (
                  <tr key={c.sha} className="border-b last:border-0 hover:bg-slate-50">
                    <td className="px-3 py-1.5 font-mono text-slate-500 w-16">{c.sha}</td>
                    <td className="px-3 py-1.5 text-slate-400 w-24">{c.date.slice(0, 10)}</td>
                    <td className="px-3 py-1.5 text-slate-600 truncate max-w-xs">{c.message}</td>
                    <td className="px-3 py-1.5 text-slate-400">{c.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </div>
  );
}
