/**
 * RevisionsTabContent — P3: Controle de Revisões
 *
 * Salva snapshots imutáveis da configuração atual do Hub e exibe diff entre versões.
 * Persistência via localStorage (sem Supabase). Máx. 20 revisões por sessão.
 */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GitCommit, Trash2, GitCompare, AlertCircle, Plus } from "lucide-react";
import { useTestHubStore } from "../../stores/useTestHubStore";
import {
  useRevisionStore,
  diffRevisions,
  type RevisionSnapshot,
} from "../../stores/useRevisionStore";

function fmtDate(ts: number) {
  return new Date(ts).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function DiffTable({ a, b }: { a: RevisionSnapshot; b: RevisionSnapshot }) {
  const diffs = diffRevisions(a, b);
  if (diffs.length === 0) {
    return (
      <p className="text-xs text-emerald-600 flex items-center gap-1">
        <span>✓</span> Sem diferenças entre as revisões selecionadas.
      </p>
    );
  }
  return (
    <div className="overflow-auto rounded border border-slate-200">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 text-left text-[10px] uppercase tracking-wide text-slate-500">
            <th className="px-3 py-1.5">Campo</th>
            <th className="px-3 py-1.5 text-red-600">{a.label}</th>
            <th className="px-3 py-1.5 text-blue-600">{b.label}</th>
          </tr>
        </thead>
        <tbody>
          {diffs.map((d) => (
            <tr key={d.field} className="border-b border-slate-100 last:border-0">
              <td className="px-3 py-1 font-mono text-[10px] text-slate-500">{d.field}</td>
              <td className="px-3 py-1 text-red-700">{d.before}</td>
              <td className="px-3 py-1 text-blue-700">{d.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RevisionsTabContent() {
  const { compressor, condenser, evaporator, conditions } = useTestHubStore();
  const { revisions, saveRevision, deleteRevision, clearAll } = useRevisionStore();

  const [label, setLabel] = useState("");
  const [note, setNote] = useState("");
  const [approvedBy, setApprovedBy] = useState("");
  const [compareA, setCompareA] = useState<string | null>(null);
  const [compareB, setCompareB] = useState<string | null>(null);

  function handleSave() {
    if (!label.trim()) return;
    saveRevision(label.trim(), { compressor, condenser, evaporator, conditions }, note.trim() || undefined, approvedBy.trim() || undefined);
    setLabel("");
    setNote("");
    setApprovedBy("");
  }

  const revA = revisions.find((r) => r.id === compareA);
  const revB = revisions.find((r) => r.id === compareB);

  return (
    <div className="space-y-5">
      {/* Save new revision */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <GitCommit className="h-4 w-4 text-blue-500" />
            Salvar Revisão Atual
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <Label className="mb-1 block text-[11px] text-slate-500">Rótulo da revisão *</Label>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="ex: Rev. A — Nominal"
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="mb-1 block text-[11px] text-slate-500">Aprovado por</Label>
              <Input
                value={approvedBy}
                onChange={(e) => setApprovedBy(e.target.value)}
                placeholder="Nome do responsável"
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="mb-1 block text-[11px] text-slate-500">Observação</Label>
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Opcional"
                className="h-8 text-xs"
              />
            </div>
          </div>
          <Button size="sm" onClick={handleSave} disabled={!label.trim()} className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Salvar snapshot
          </Button>
          <p className="text-[10px] text-slate-400">
            Salva um snapshot imutável dos parâmetros atuais (compressor, evaporador, condensador, condições).
            Persistido em localStorage — máx. 20 revisões.
          </p>
        </CardContent>
      </Card>

      {/* Revision list */}
      {revisions.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Nenhuma revisão salva ainda. Configure os parâmetros e clique em <strong>Salvar snapshot</strong>.
          </AlertDescription>
        </Alert>
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Histórico de Revisões ({revisions.length}/20)</CardTitle>
              <Button size="sm" variant="ghost" onClick={clearAll} className="h-7 gap-1 text-xs text-red-500 hover:text-red-700">
                <Trash2 className="h-3 w-3" /> Limpar todas
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {revisions.map((rev) => (
              <div key={rev.id} className="flex items-start justify-between gap-3 rounded border border-slate-100 bg-slate-50/40 px-3 py-2">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-800">{rev.label}</span>
                    {rev.approved_by && (
                      <Badge variant="outline" className="text-[10px] border-emerald-300 text-emerald-700">
                        ✓ {rev.approved_by}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-0.5 text-[10px] text-slate-400">{fmtDate(rev.created_at)}</p>
                  {rev.note && <p className="mt-0.5 text-[10px] text-slate-500 italic">{rev.note}</p>}
                  <div className="mt-1 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCompareA(rev.id === compareA ? null : rev.id)}
                      className={`rounded px-1.5 py-0.5 text-[10px] transition-colors ${compareA === rev.id ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                    >
                      {compareA === rev.id ? "✓ Base" : "Comparar como base"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompareB(rev.id === compareB ? null : rev.id)}
                      className={`rounded px-1.5 py-0.5 text-[10px] transition-colors ${compareB === rev.id ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                    >
                      {compareB === rev.id ? "✓ Nova" : "Comparar como nova"}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteRevision(rev.id)}
                  className="shrink-0 text-slate-400 hover:text-red-500"
                  title="Excluir revisão"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Diff view */}
      {revA && revB && revA.id !== revB.id && (
        <Card className="border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <GitCompare className="h-4 w-4 text-blue-500" />
              Comparação: <span className="text-red-600">{revA.label}</span> vs <span className="text-blue-600">{revB.label}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DiffTable a={revA} b={revB} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
