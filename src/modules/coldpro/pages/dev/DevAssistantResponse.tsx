import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, GitPullRequest, Loader2, CheckCircle, AlertCircle, Copy } from "lucide-react";
import type { DiagnosisResult } from "../../hooks/useDevAssistant";
import type { PRResult } from "../../services/githubService";

interface Props {
  result: DiagnosisResult;
  prResult: PRResult | null;
  isLoading: boolean;
  error: string | null;
  onApplyFix: (result: DiagnosisResult) => void;
  onReset: () => void;
}

function CodeBlock({ code, language = "typescript" }: { code: string; language?: string }) {
  function copy() {
    navigator.clipboard.writeText(code).catch(() => {});
  }
  return (
    <div className="relative group rounded-md bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800 text-xs text-slate-400">
        <span>{language}</span>
        <button onClick={copy} className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 hover:text-white">
          <Copy className="size-3" />
          copiar
        </button>
      </div>
      <pre className="p-3 overflow-x-auto text-xs leading-relaxed max-h-72">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function DevAssistantResponse({ result, prResult, isLoading, error, onApplyFix, onReset }: Props) {
  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Erro</p>
            <p className="mt-1 font-mono text-xs break-all">{error}</p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wide">Diagnóstico</h3>
        <p className="text-sm leading-relaxed">{result.diagnosis}</p>
      </div>

      {result.rootCause && (
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wide">Causa Raiz</h3>
          <p className="text-sm leading-relaxed text-slate-700">{result.rootCause}</p>
        </div>
      )}

      {result.filesToModify.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wide">
            Arquivos a Modificar
            <Badge variant="secondary" className="ml-2">{result.filesToModify.length}</Badge>
          </h3>
          {result.filesToModify.map((f, i) => (
            <div key={i} className="space-y-2 border rounded-lg p-4">
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">{f.path}</code>
              </div>
              {f.explanation && (
                <p className="text-xs text-slate-600">{f.explanation}</p>
              )}
              <CodeBlock code={f.content} />
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2 border-t">
        {result.filesToModify.length > 0 && !prResult && (
          <Button onClick={() => onApplyFix(result)} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Criando PR...
              </>
            ) : (
              <>
                <GitPullRequest className="size-4 mr-2" />
                Aplicar Fix (criar PR)
              </>
            )}
          </Button>
        )}

        {prResult && (
          <div className="flex items-center gap-3 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="size-5 text-green-600" />
            <div className="text-sm">
              <span className="text-green-700 font-medium">PR #{prResult.number} criado!</span>
            </div>
            <a
              href={prResult.url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              Abrir PR <ExternalLink className="size-3.5" />
            </a>
          </div>
        )}

        <Button variant="outline" onClick={onReset} disabled={isLoading}>
          Nova análise
        </Button>
      </div>
    </div>
  );
}
