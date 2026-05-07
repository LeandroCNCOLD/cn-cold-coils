/**
 * AIEngineerPanel — UI da IA Engenheira de Produto (Sprint 9).
 *
 * Renderiza:
 *  - Botão "Gerar Laudo IA" + resultado (índice de saúde, laudo, pontos críticos,
 *    sugestões, riscos, oportunidades, dados insuficientes, resumos)
 *  - Botão "Reconstruir Equipamento" (após laudo) + Dialog de restrições
 *    + tabela comparativa + propostas com simulação real dos motores.
 *
 * Importa server functions de `@/lib/aiMachine.functions`.
 */
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Sparkles,
  Wrench,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  Star,
  ShieldAlert,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { aiAuditMachine, aiReconstructMachine } from "@/lib/aiMachine.functions";
import type {
  MachineSpec,
  SystemComponentsInput,
} from "@/modules/coldpro_v2";
import type {
  AIMachineAuditResult,
  AIReconstructionResult,
  ReconstructionConstraints,
} from "@/shared/aiMachineTypes";

interface Props {
  spec: MachineSpec | null;
  components: SystemComponentsInput | null;
  onOpenInWorkspace?: (
    params: AIReconstructionResult["propostas"][number]["parametros_alterados"],
  ) => void;
}

function classifColor(c: string) {
  if (c === "excelente") return "bg-emerald-500";
  if (c === "bom") return "bg-blue-500";
  if (c === "regular") return "bg-amber-500";
  return "bg-red-500";
}

function classifBadge(c: string) {
  if (c === "excelente") return "border-emerald-300 bg-emerald-50 text-emerald-700";
  if (c === "bom") return "border-blue-300 bg-blue-50 text-blue-700";
  if (c === "regular") return "border-amber-300 bg-amber-50 text-amber-700";
  return "border-red-300 bg-red-50 text-red-700";
}

function severityIcon(s: string) {
  if (s === "critico") return <XCircle className="h-4 w-4 text-red-500" />;
  if (s === "atencao" || s === "alto") return <AlertCircle className="h-4 w-4 text-amber-500" />;
  return <Info className="h-4 w-4 text-blue-500" />;
}

function fmtPct(v: number | null | undefined, digits = 1): string {
  if (v == null || !Number.isFinite(v)) return "—";
  return `${v >= 0 ? "+" : ""}${v.toFixed(digits)}%`;
}

export function AIEngineerPanel({ spec, components, onOpenInWorkspace }: Props) {
  const [audit, setAudit] = useState<AIMachineAuditResult | null>(null);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState<string | null>(null);

  const [recon, setRecon] = useState<AIReconstructionResult | null>(null);
  const [reconLoading, setReconLoading] = useState(false);
  const [reconError, setReconError] = useState<string | null>(null);
  const [reconOpen, setReconOpen] = useState(false);

  // Form de restrições
  const [lockWidth, setLockWidth] = useState(true);
  const [lockHeight, setLockHeight] = useState(false);
  const [lockRefrig, setLockRefrig] = useState(true);
  const [lockVoltage, setLockVoltage] = useState(true);
  const [priority, setPriority] = useState<ReconstructionConstraints["priority"]>("balanced");
  const [availableComps, setAvailableComps] = useState("");
  const [engineerNotes, setEngineerNotes] = useState("");
  const [numPropostas, setNumPropostas] = useState<2 | 3 | 4>(3);

  const auditFn = useServerFn(aiAuditMachine);
  const reconFn = useServerFn(aiReconstructMachine);

  const canRun = !!spec && !!components;

  const handleAudit = async () => {
    if (!spec || !components) return;
    setAuditLoading(true);
    setAuditError(null);
    try {
      const result = await auditFn({ data: { spec, components } });
      setAudit(result);
    } catch (e) {
      setAuditError(e instanceof Error ? e.message : "Erro ao gerar laudo.");
    } finally {
      setAuditLoading(false);
    }
  };

  const handleReconstruct = async () => {
    if (!spec || !components) return;
    setReconLoading(true);
    setReconError(null);
    try {
      const constraints: ReconstructionConstraints = {
        lock_coil_width_m: lockWidth,
        lock_coil_height_m: lockHeight,
        lock_refrigerant: lockRefrig,
        lock_voltage: lockVoltage,
        priority,
        available_compressor_models: availableComps.trim()
          ? availableComps.split(",").map((s) => s.trim()).filter(Boolean)
          : undefined,
        engineer_notes: engineerNotes.trim() || undefined,
      };
      const result = await reconFn({
        data: { spec, components, constraints, num_propostas: numPropostas, laudo: audit ?? undefined },
      });
      setRecon(result);
      setReconOpen(false);
    } catch (e) {
      setReconError(e instanceof Error ? e.message : "Erro ao reconstruir.");
    } finally {
      setReconLoading(false);
    }
  };

  return (
    <Card className="border-2 border-purple-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <div>
              <CardTitle className="text-sm">IA Engenheira de Produto</CardTitle>
              <CardDescription className="text-xs">
                Laudo técnico holístico e reconstrução do equipamento com simulação real pelos motores.
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleAudit}
              disabled={!canRun || auditLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {auditLoading ? (
                <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="mr-1 h-3.5 w-3.5" />
              )}
              Gerar Laudo IA
            </Button>
            {audit && (
              <Dialog open={reconOpen} onOpenChange={setReconOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" disabled={!canRun}>
                    <Wrench className="mr-1 h-3.5 w-3.5" />
                    Reconstruir
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Reconstruir Equipamento</DialogTitle>
                    <DialogDescription className="text-xs">
                      Defina as restrições. A IA proporá novas configurações que serão simuladas pelos motores reais.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center gap-2">
                        <Checkbox checked={lockWidth} onCheckedChange={(v) => setLockWidth(!!v)} />
                        Travar largura do evaporador
                      </label>
                      <label className="flex items-center gap-2">
                        <Checkbox checked={lockHeight} onCheckedChange={(v) => setLockHeight(!!v)} />
                        Travar altura do evaporador
                      </label>
                      <label className="flex items-center gap-2">
                        <Checkbox checked={lockRefrig} onCheckedChange={(v) => setLockRefrig(!!v)} />
                        Manter refrigerante atual
                      </label>
                      <label className="flex items-center gap-2">
                        <Checkbox checked={lockVoltage} onCheckedChange={(v) => setLockVoltage(!!v)} />
                        Manter tensão elétrica
                      </label>
                    </div>
                    <div>
                      <Label className="text-xs">Objetivo de otimização</Label>
                      <Select value={priority} onValueChange={(v) => setPriority(v as typeof priority)}>
                        <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cop">Maximizar COP</SelectItem>
                          <SelectItem value="capacity">Maximizar Capacidade</SelectItem>
                          <SelectItem value="cost">Minimizar Custo</SelectItem>
                          <SelectItem value="balanced">Balanceado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Compressores disponíveis (opcional)</Label>
                      <Input
                        className="h-8 text-xs"
                        value={availableComps}
                        onChange={(e) => setAvailableComps(e.target.value)}
                        placeholder="ex: Embraco NEK2150GK, Tecumseh AE4460Y"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Notas para a IA (opcional)</Label>
                      <Textarea
                        className="text-xs"
                        rows={2}
                        value={engineerNotes}
                        onChange={(e) => setEngineerNotes(e.target.value)}
                        placeholder="ex: Câmara de congelados, T_amb máx 40°C"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Número de propostas</Label>
                      <Select
                        value={String(numPropostas)}
                        onValueChange={(v) => setNumPropostas(Number(v) as 2 | 3 | 4)}
                      >
                        <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 propostas</SelectItem>
                          <SelectItem value="3">3 propostas</SelectItem>
                          <SelectItem value="4">4 propostas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {reconError && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <AlertDescription className="text-xs text-red-700">{reconError}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <DialogFooter>
                    <Button onClick={handleReconstruct} disabled={reconLoading} className="bg-purple-600 hover:bg-purple-700">
                      {reconLoading ? (
                        <><Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> Reconstruindo…</>
                      ) : (
                        <><Wrench className="mr-1 h-3.5 w-3.5" /> Reconstruir</>
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!canRun && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription className="text-xs text-amber-700">
              Configure compressor, evaporador, condensador e condições para habilitar a IA Engenheira.
            </AlertDescription>
          </Alert>
        )}

        {auditError && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-xs text-red-700">{auditError}</AlertDescription>
          </Alert>
        )}

        {auditLoading && (
          <div className="flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50/50 p-4 text-xs text-purple-700">
            <Loader2 className="h-4 w-4 animate-spin" />
            Analisando equipamento com IA…
          </div>
        )}

        {audit && !auditLoading && (
          <div className="space-y-4">
            {/* Índice de saúde */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-700">Índice de Saúde</p>
                  <p className="text-[10px] text-slate-500">Calculado pelo backend (determinístico)</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${classifBadge(audit.classificacao)}`}>
                    {audit.classificacao.toUpperCase()}
                  </Badge>
                  <span className="text-2xl font-bold text-slate-800">{audit.indice_saude}</span>
                  <span className="text-xs text-slate-500">/100</span>
                </div>
              </div>
              <Progress value={audit.indice_saude} className="h-2" indicatorClassName={classifColor(audit.classificacao)} />
              <div className="mt-2 flex items-center gap-2 text-[10px] text-slate-500">
                <span>Gargalo dominante: <strong className="text-slate-700">{audit.gargalo_dominante}</strong></span>
                <span>·</span>
                <span>Confiança: {audit.confianca_diagnostico.toFixed(0)}%</span>
              </div>
            </div>

            {/* Laudo executivo */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="mb-1 text-xs font-semibold text-slate-700">Laudo Executivo</p>
              <p className="max-h-56 overflow-y-auto whitespace-pre-line text-xs leading-relaxed text-slate-700">
                {audit.laudo_executivo}
              </p>
            </div>

            {/* Pontos críticos */}
            {audit.pontos_criticos.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold text-slate-700">
                  Pontos Críticos ({audit.pontos_criticos.length})
                </p>
                <div className="space-y-2">
                  {audit.pontos_criticos.map((pc, i) => (
                    <div key={i} className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                      <div className="flex items-start gap-2">
                        {severityIcon(pc.severidade)}
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">
                            [{pc.componente}] {pc.descricao}
                          </p>
                          {pc.evidencias.length > 0 && (
                            <ul className="mt-1 list-disc pl-4 text-[11px] text-slate-600">
                              {pc.evidencias.map((e, j) => <li key={j}>{e}</li>)}
                            </ul>
                          )}
                          <div className="mt-1 flex flex-wrap gap-3 text-[10px] text-slate-500">
                            <span>Impacto COP: {fmtPct(pc.impacto_no_cop_pct)}</span>
                            <span>Impacto Capacidade: {fmtPct(pc.impacto_na_capacidade_pct)}</span>
                            {pc.risco_operacional && <span>Risco: {pc.risco_operacional}</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sugestões */}
            {audit.sugestoes.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold text-slate-700">Sugestões Priorizadas</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {audit.sugestoes.map((s, i) => (
                    <div key={i} className="rounded-lg border border-slate-200 bg-white p-3 text-xs">
                      <div className="mb-1 flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">P{s.prioridade}</Badge>
                        <Badge variant="outline" className="text-[10px]">{s.complexidade}</Badge>
                        {s.requer_mudanca_gabinete && (
                          <Badge variant="outline" className="border-amber-300 bg-amber-50 text-[10px] text-amber-700">
                            ⚠ Gabinete
                          </Badge>
                        )}
                      </div>
                      <p className="font-semibold text-slate-800">{s.acao}</p>
                      <p className="mt-0.5 text-[11px] text-slate-600">{s.justificativa_tecnica}</p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        Ganho est.: COP {fmtPct(s.ganho_estimado_cop_pct)} · Cap. {fmtPct(s.ganho_estimado_capacidade_pct)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Riscos & Oportunidades em accordion */}
            <Accordion type="multiple" className="w-full">
              {audit.riscos_operacionais.length > 0 && (
                <AccordionItem value="riscos">
                  <AccordionTrigger className="text-xs">
                    Riscos Operacionais ({audit.riscos_operacionais.length})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-xs">
                      {audit.riscos_operacionais.map((r, i) => (
                        <div key={i} className="rounded border border-slate-200 bg-white p-2">
                          <div className="flex items-center gap-2">
                            {severityIcon(r.severidade)}
                            <span className="font-semibold text-slate-800">{r.tipo}</span>
                          </div>
                          <p className="mt-1 text-[11px] text-slate-600">{r.descricao}</p>
                          <p className="mt-0.5 text-[10px] text-slate-500"><strong>Consequência:</strong> {r.consequencia}</p>
                          <p className="mt-0.5 text-[10px] text-slate-500"><strong>Ação:</strong> {r.acao_recomendada}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
              {audit.oportunidades_otimizacao.length > 0 && (
                <AccordionItem value="oportunidades">
                  <AccordionTrigger className="text-xs">
                    Oportunidades de Otimização ({audit.oportunidades_otimizacao.length})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 text-xs">
                      {audit.oportunidades_otimizacao.map((o, i) => (
                        <div key={i} className="rounded border border-slate-200 bg-white p-2">
                          <p className="font-semibold text-slate-800">[{o.componente_alvo}] {o.tipo}</p>
                          <p className="mt-1 text-[11px] text-slate-600">{o.descricao}</p>
                          <p className="mt-0.5 text-[10px] text-slate-500">
                            Ganho est.: COP {fmtPct(o.ganho_estimado_cop_pct)} · Cap. {fmtPct(o.ganho_estimado_capacidade_pct)} · Complexidade: {o.complexidade}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>

            {/* Dados insuficientes */}
            {audit.dados_insuficientes.length > 0 && (
              <Alert className="border-amber-200 bg-amber-50">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-xs text-amber-700">
                  <strong>Dados insuficientes:</strong>
                  <ul className="ml-4 mt-1 list-disc">
                    {audit.dados_insuficientes.map((d, i) => (
                      <li key={i}><strong>{d.parametro}</strong> — {d.impacto_na_analise}. {d.recomendacao_para_coleta}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* Tabs resumos */}
            <Tabs defaultValue="eng" className="w-full">
              <TabsList className="h-8">
                <TabsTrigger value="eng" className="text-xs">Para Engenharia</TabsTrigger>
                <TabsTrigger value="com" className="text-xs">Para Comercial</TabsTrigger>
              </TabsList>
              <TabsContent value="eng" className="rounded border border-slate-200 bg-white p-3 text-xs whitespace-pre-line">
                {audit.resumo_para_engenharia}
              </TabsContent>
              <TabsContent value="com" className="rounded border border-slate-200 bg-white p-3 text-xs whitespace-pre-line">
                {audit.resumo_para_comercial ?? "—"}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* ── Reconstrução ──────────────────────────────────────────────── */}
        {recon && (
          <div className="space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">Propostas de Reconstrução</p>
              <Badge variant="outline" className="text-[10px]">{recon.propostas.length} propostas</Badge>
            </div>

            {recon.recomendacao_principal && (
              <Alert className="border-purple-200 bg-purple-50">
                <Star className="h-4 w-4 text-purple-600" />
                <AlertDescription className="text-xs text-purple-800">
                  <strong>Recomendação principal:</strong> {recon.recomendacao_principal}
                </AlertDescription>
              </Alert>
            )}

            {/* Tabela comparativa */}
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
              <table className="w-full text-xs">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">Parâmetro</th>
                    <th className="px-3 py-2 text-right font-semibold text-slate-700">Original</th>
                    {recon.propostas.map((p) => (
                      <th key={p.id} className="px-3 py-2 text-right font-semibold text-slate-700">
                        {p.id.replace("proposta_", "")}
                      </th>
                    ))}
                    <th className="px-3 py-2 text-left font-semibold text-slate-700">Unidade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recon.comparativo.map((row, i) => (
                    <tr key={i}>
                      <td className="px-3 py-1.5 text-slate-700">{row.parametro}</td>
                      <td className="px-3 py-1.5 text-right font-mono text-slate-600">{row.original ?? "—"}</td>
                      <td className="px-3 py-1.5 text-right font-mono text-slate-600">{row.proposta_a ?? "—"}</td>
                      {recon.propostas.length >= 2 && (
                        <td className="px-3 py-1.5 text-right font-mono text-slate-600">{row.proposta_b ?? "—"}</td>
                      )}
                      {recon.propostas.length >= 3 && (
                        <td className="px-3 py-1.5 text-right font-mono text-slate-600">{row.proposta_c ?? "—"}</td>
                      )}
                      {recon.propostas.length >= 4 && (
                        <td className="px-3 py-1.5 text-right font-mono text-slate-600">{row.proposta_d ?? "—"}</td>
                      )}
                      <td className="px-3 py-1.5 text-slate-500">{row.unidade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards por proposta */}
            <div className="grid gap-3 lg:grid-cols-2">
              {recon.propostas.map((p) => (
                <div
                  key={p.id}
                  className={`rounded-lg border-2 p-3 ${
                    p.requer_aprovacao_engenheiro
                      ? "border-amber-300 bg-amber-50/30"
                      : !p.simulacao_valida
                      ? "border-red-300 bg-red-50/30"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-slate-800">{p.titulo}</p>
                    <div className="flex items-center gap-1">
                      {p.requer_aprovacao_engenheiro && (
                        <Badge
                          variant="outline"
                          className="border-amber-400 bg-amber-100 text-[10px] text-amber-800"
                          title={p.motivo_aprovacao ?? ""}
                        >
                          <ShieldAlert className="mr-0.5 h-3 w-3" /> Requer aprovação
                        </Badge>
                      )}
                      {!p.simulacao_valida && (
                        <Badge variant="outline" className="border-red-400 bg-red-100 text-[10px] text-red-800">
                          Simulação falhou
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="mb-2 text-xs text-slate-600">{p.descricao}</p>

                  {p.motivo_aprovacao && (
                    <p className="mb-2 text-[10px] italic text-amber-700">↳ {p.motivo_aprovacao}</p>
                  )}

                  {p.erros_simulacao && p.erros_simulacao.length > 0 && (
                    <p className="mb-2 text-[10px] text-red-600">{p.erros_simulacao.join("; ")}</p>
                  )}

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="rounded bg-slate-50 p-2">
                      <p className="text-[10px] text-slate-500">IA estima (COP)</p>
                      <p className="font-mono font-semibold text-slate-700">
                        {fmtPct(p.ganho_estimado_ia_cop_pct)}
                      </p>
                    </div>
                    <div className="rounded bg-emerald-50 p-2">
                      <p className="text-[10px] text-emerald-600">Simulado real (COP)</p>
                      <p className="font-mono font-semibold text-emerald-700">
                        {fmtPct(p.delta_cop_pct)}
                      </p>
                    </div>
                    <div className="rounded bg-slate-50 p-2">
                      <p className="text-[10px] text-slate-500">IA estima (Cap.)</p>
                      <p className="font-mono font-semibold text-slate-700">
                        {fmtPct(p.ganho_estimado_ia_capacidade_pct)}
                      </p>
                    </div>
                    <div className="rounded bg-emerald-50 p-2">
                      <p className="text-[10px] text-emerald-600">Simulado real (Cap.)</p>
                      <p className="font-mono font-semibold text-emerald-700">
                        {fmtPct(p.delta_capacidade_pct)}
                      </p>
                    </div>
                  </div>

                  {onOpenInWorkspace && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-3 w-full text-xs"
                      onClick={() => onOpenInWorkspace(p.parametros_alterados)}
                      disabled={p.requer_aprovacao_engenheiro && !p.simulacao_valida}
                    >
                      {p.requer_aprovacao_engenheiro ? "Revisar e Aprovar" : "Abrir no Workspace"}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
