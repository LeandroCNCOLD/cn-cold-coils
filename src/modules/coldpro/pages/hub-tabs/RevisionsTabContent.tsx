/**
 * RevisionsTabContent — P3: Controle de Revisões
 *
 * Salva snapshots imutáveis da configuração atual do Hub e exibe diff entre versões.
 * Persistência via localStorage (sem Supabase). Máx. 20 revisões por sessão.
 */
import { useState } from "react";
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
      <p className="text-xs flex items-center gap-1" style={{ color: "var(--color-success)" }}>
        <span>✓</span> Sem diferenças entre as revisões selecionadas.
      </p>
    );
  }
  return (
    <div className="overflow-auto rounded" style={{ border: "1px solid var(--border-subtle)" }}>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-left text-[10px] uppercase tracking-wide" style={{ borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-800)", color: "var(--text-muted)" }}>
            <th className="px-3 py-1.5">Campo</th>
            <th className="px-3 py-1.5" style={{ color: "var(--color-error)" }}>{a.label}</th>
            <th className="px-3 py-1.5" style={{ color: "var(--ice-400)" }}>{b.label}</th>
          </tr>
        </thead>
        <tbody>
          {diffs.map((d) => (
            <tr key={d.field} className="last:border-0" style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              <td className="px-3 py-1 font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>{d.field}</td>
              <td className="px-3 py-1" style={{ color: "var(--color-error)" }}>{d.before}</td>
              <td className="px-3 py-1" style={{ color: "var(--ice-400)" }}>{d.after}</td>
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
      <div className="cn-card p-4">
        <div className="pb-2">
          <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            <span style={{ color: "var(--ice-400)" }}><GitCommit className="h-4 w-4" /></span>
            Salvar Revisão Atual
          </p>
        </div>
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <Label className="mb-1 block text-[11px]" style={{ color: "var(--text-muted)" }}>Rótulo da revisão *</Label>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="ex: Rev. A — Nominal"
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="mb-1 block text-[11px]" style={{ color: "var(--text-muted)" }}>Aprovado por</Label>
              <Input
                value={approvedBy}
                onChange={(e) => setApprovedBy(e.target.value)}
                placeholder="Nome do responsável"
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="mb-1 block text-[11px]" style={{ color: "var(--text-muted)" }}>Observação</Label>
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
          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            Salva um snapshot imutável dos parâmetros atuais (compressor, evaporador, condensador, condições).
            Persistido em localStorage — máx. 20 revisões.
          </p>
        </div>
      </div>

      {/* Revision list */}
      {revisions.length === 0 ? (
        <div className="cn-card p-4 flex items-start gap-3" style={{ borderColor: "var(--border-subtle)" }}>
          <span style={{ color: "#f59e0b" }}><AlertCircle className="h-4 w-4 mt-0.5 shrink-0" /></span>
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Nenhuma revisão salva ainda. Configure os parâmetros e clique em <strong style={{ color: "var(--text-primary)" }}>Salvar snapshot</strong>.
          </p>
        </div>
      ) : (
        <div className="cn-card p-4">
          <div className="pb-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Histórico de Revisões ({revisions.length}/20)</p>
              <Button size="sm" variant="ghost" onClick={clearAll} className="h-7 gap-1 text-xs" style={{ color: "var(--color-error)" }}>
                <Trash2 className="h-3 w-3" /> Limpar todas
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {revisions.map((rev) => (
              <div key={rev.id} className="flex items-start justify-between gap-3 rounded px-3 py-2" style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-800)" }}>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{rev.label}</span>
                    {rev.approved_by && (
                      <span className="cn-badge cn-badge--approved text-[10px]">
                        ✓ {rev.approved_by}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{fmtDate(rev.created_at)}</p>
                  {rev.note && <p className="mt-0.5 text-[10px] italic" style={{ color: "var(--text-muted)" }}>{rev.note}</p>}
                  <div className="mt-1 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCompareA(rev.id === compareA ? null : rev.id)}
                      className={`rounded px-1.5 py-0.5 text-[10px] transition-colors ${compareA === rev.id ? "bg-red-900/40" : "bg-slate-800"}`}
                      style={{ color: compareA === rev.id ? "var(--color-error)" : "var(--text-muted)" }}
                    >
                      {compareA === rev.id ? "✓ Base" : "Comparar como base"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompareB(rev.id === compareB ? null : rev.id)}
                      className={`rounded px-1.5 py-0.5 text-[10px] transition-colors ${compareB === rev.id ? "bg-blue-900/40" : "bg-slate-800"}`}
                      style={{ color: compareB === rev.id ? "var(--ice-400)" : "var(--text-muted)" }}
                    >
                      {compareB === rev.id ? "✓ Nova" : "Comparar como nova"}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteRevision(rev.id)}
                  className="shrink-0 hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                  title="Excluir revisão"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diff view */}
      {revA && revB && revA.id !== revB.id && (
        <div className="cn-card p-4" style={{ borderColor: "var(--ice-400)" }}>
          <div className="pb-2">
            <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              <span style={{ color: "var(--ice-400)" }}><GitCompare className="h-4 w-4" /></span>
              Comparação: <span style={{ color: "var(--color-error)" }}>{revA.label}</span> vs <span style={{ color: "var(--ice-400)" }}>{revB.label}</span>
            </p>
          </div>
          <DiffTable a={revA} b={revB} />
        </div>
      )}
    </div>
  );
}
