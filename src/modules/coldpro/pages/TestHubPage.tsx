/**
 * TestHubPage — Hub de Testes e Simulação do CN Coils (v2)
 *
 * 19 abas completas com auto-disparo ao selecionar máquina do catálogo.
 */
import { useState, useMemo, useCallback, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Settings2, Activity, TrendingUp, Map, BarChart3, Snowflake,
  AlertCircle, CheckCircle2, Clock, Zap, Brain,
  FileText, Wind, Shield, Target, GitCompare, BarChart2,
  Gauge, FlaskConical, Play, Loader2, LayoutDashboard, ClipboardCheck,
  ShieldCheck, BookOpen, Database,
} from "lucide-react";
import { HubConfigSidebar } from "../components/HubConfigSidebar";
import { useHubStoreSync } from "../hooks/useHubStoreSync";

import { SimulationTabContent } from "./hub-tabs/SimulationTabContent";
import { PerformanceCurveTabContent } from "./hub-tabs/PerformanceCurveTabContent";
import { OperatingMapTabContent } from "./hub-tabs/OperatingMapTabContent";
import { OptimizationTabContent } from "./hub-tabs/OptimizationTabContent";
import { FrostTabContent } from "./hub-tabs/FrostTabContent";
import { SystemConfigTabContent } from "./hub-tabs/SystemConfigTabContent";
import { PhDiagramTabContent } from "./hub-tabs/PhDiagramTabContent";
import { MonteCarloTabContent } from "./hub-tabs/MonteCarloTabContent";
import { DataSanityTabContent } from "./hub-tabs/DataSanityTabContent";
import { OperatingEnvelopeTabContent } from "./hub-tabs/OperatingEnvelopeTabContent";
import { EnergyBalanceTabContent } from "./hub-tabs/EnergyBalanceTabContent";
import { FanCoilTabContent } from "./hub-tabs/FanCoilTabContent";
import { BottleneckTabContent } from "./hub-tabs/BottleneckTabContent";
import { ScenariosTabContent } from "./hub-tabs/ScenariosTabContent";
import { MachineComparisonTabContent } from "./hub-tabs/MachineComparisonTabContent";
import { AutoOptimizationTabContent } from "./hub-tabs/AutoOptimizationTabContent";
import { AIAnalysisTabContent } from "./hub-tabs/AIAnalysisTabContent";
import { ExecutiveSummaryTabContent } from "./hub-tabs/ExecutiveSummaryTabContent";
import { TechnicalReportTabContent } from "./hub-tabs/TechnicalReportTabContent";
import { StartupTabContent } from "./hub-tabs/StartupTabContent";
import { ElectricoTabContent } from "./hub-tabs/ElectricoTabContent";
import { MachineValidationTabContent } from "./hub-tabs/MachineValidationTabContent";
import { CatalogDataSheetTabContent } from "./hub-tabs/CatalogDataSheetTabContent";
import { SensitivityAnalysisTabContent } from "./hub-tabs/SensitivityAnalysisTabContent";
import { RevisionsTabContent } from "./hub-tabs/RevisionsTabContent";

import { useCatalogSessionStore } from "@/modules/coldpro_catalog/store/useCatalogSessionStore";
import { useCoilEnvelopeStore } from "@/modules/cn_coils/store/useCoilEnvelopeStore";
import { useTestHubStore } from "../stores/useTestHubStore";
import { resetColdproWorkspace } from "../utils/workspaceReset";
import {
  computePhDiagram,
  computeMonteCarlo,
  computeOptimization,
  computeAIAnalysis,
} from "../engines/testHubEngine";

type TabId =
  | "summary" | "config"
  | "ph" | "equilibrium" | "performance" | "map"
  | "montecarlo" | "polynomial" | "autoopt" | "envelope" | "energy" | "fancoil"
  | "sanity" | "bottleneck" | "scenarios" | "frost" | "comparison"
  | "startup" | "ai" | "report"
  | "eletrico" | "machine-validation" | "catalog-datasheet" | "sensitivity" | "revisions";

interface TabDef {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  group: "config" | "thermo" | "advanced" | "diagnosis" | "ai";
}

const TABS: TabDef[] = [
  { id: "summary", label: "Resumo", icon: LayoutDashboard, description: "Visão consolidada de todas as análises do sistema", group: "config" },
  { id: "config", label: "Configuração", icon: Settings2, description: "Selecione compressor, evaporador, condensador e condições de operação", group: "config" },
  { id: "ph", label: "P-H Diagram", icon: Activity, description: "Ciclo de Mollier com 4 pontos, curva de saturação e isóbaras", group: "thermo" },
  { id: "equilibrium", label: "Equilíbrio", icon: Gauge, description: "Balanço térmico entre compressor, evaporador e condensador", group: "thermo" },
  { id: "performance", label: "Desempenho", icon: TrendingUp, description: "Capacidade, COP e potência em função de Te e Tc", group: "thermo" },
  { id: "map", label: "Mapa Op.", icon: Map, description: "Envelope de operação em múltiplas condições de Tc", group: "thermo" },
  { id: "montecarlo", label: "Monte Carlo", icon: FlaskConical, description: "Análise de incerteza com 500 amostras e bandas de confiança IC 90%", group: "advanced" },
  { id: "polynomial", label: "Polinômios", icon: BarChart2, description: "Coeficientes ARI 540 / EN 12900 com tabela e gráfico de superfície", group: "advanced" },
  { id: "autoopt", label: "Otimização", icon: Target, description: "Melhor ponto de equilíbrio com sugestões de ajuste priorizadas", group: "advanced" },
  { id: "envelope", label: "Envelope", icon: Shield, description: "Limites operacionais de Te, Tc, razão de compressão e temperatura de descarga", group: "advanced" },
  { id: "energy", label: "Balanço E.", icon: Zap, description: "Validação do balanço de energia: Q_cond ≈ Q_evap + W_comp", group: "advanced" },
  { id: "fancoil", label: "Vent×Coil", icon: Wind, description: "Curva do ventilador, ponto de operação real e eficiência do coil", group: "advanced" },
  { id: "sanity", label: "Sanidade", icon: CheckCircle2, description: "Validação completa de todos os dados de entrada do sistema", group: "diagnosis" },
  { id: "bottleneck", label: "Gargalo", icon: AlertCircle, description: "Identificação do componente limitante do sistema", group: "diagnosis" },
  { id: "scenarios", label: "Cenários", icon: BarChart3, description: "9 cenários operacionais reais com análise comparativa", group: "diagnosis" },
  { id: "frost", label: "Degelo", icon: Snowflake, description: "Análise de formação de gelo e ciclo de degelo", group: "diagnosis" },
  { id: "comparison", label: "Comparar", icon: GitCompare, description: "Alternativas do catálogo com comparação de capacidade e COP", group: "diagnosis" },
  { id: "startup", label: "Start-up", icon: ClipboardCheck, description: "Planilha de referência e relatório de comissionamento em campo", group: "diagnosis" },
  { id: "ai", label: "IA", icon: Brain, description: "Diagnóstico técnico com motor de regras termodinâmicas embarcadas", group: "ai" },
  { id: "report", label: "Relatório", icon: FileText, description: "Relatório técnico completo com exportação para clipboard e impressão", group: "ai" },
  { id: "eletrico", label: "Elétrico", icon: Zap, description: "Corrente, tensão, potência total e COP real do sistema com ventiladores", group: "diagnosis" },
  { id: "machine-validation", label: "Validação", icon: ShieldCheck, description: "Checklist PASS/FAIL por critério de aceitação da máquina (8 critérios)", group: "diagnosis" },
  { id: "catalog-datasheet", label: "Data Sheet", icon: Database, description: "Registro técnico completo do produto com curva de desempenho e exportação PDF", group: "diagnosis" },
  { id: "sensitivity", label: "Sensibilidade", icon: Activity, description: "Análise de sensibilidade: impacto de ΔTe e ΔTc na capacidade e COP (EN12900)", group: "diagnosis" },
  { id: "revisions", label: "Revisões", icon: GitCompare, description: "Snapshots de configuração com diff entre revisões — controle de versão local sem banco de dados", group: "config" },
];

const GROUP_LABELS: Record<string, string> = {
  config: "Configuração",
  thermo: "Termodinâmica",
  advanced: "Análises Avançadas",
  diagnosis: "Diagnóstico",
  ai: "IA & Relatório",
};

const GROUP_COLORS: Record<string, string> = {
  config: "text-slate-500",
  thermo: "text-blue-600",
  advanced: "text-violet-600",
  diagnosis: "text-amber-600",
  ai: "text-emerald-600",
};

function StatusPill({ active, label }: { active: boolean; label: string }) {
  return (
    <span className="cn-badge text-[10px]" style={active ? {
      background: "rgba(56,189,248,0.12)", color: "var(--ice-400)", borderColor: "rgba(56,189,248,0.35)"
    } : {
      background: "var(--bg-600)", color: "var(--text-muted)", borderColor: "var(--border-subtle)"
    }}>
      {active && <span className="mr-1">✓</span>}{label}
    </span>
  );
}

function SystemStatusBar({ onRunAll, isRunning }: { onRunAll: () => void; isRunning: boolean }) {
  const { selectedCompressor, selectedEvaporator, selectedCondenser } = useCatalogSessionStore();
  const compressorEnvelope = useCoilEnvelopeStore((s) => s.compressorEnvelope);
  const evaporatorEnvelope = useCoilEnvelopeStore((s) => s.envelopes.evaporator_dx);
  const { isConfigured, ph, montecarlo, optimization, ai, origin } = useTestHubStore();

  const hasCompressor = Boolean(selectedCompressor || compressorEnvelope);
  const hasEvaporator = Boolean(selectedEvaporator || evaporatorEnvelope);
  const hasCondenser = Boolean(selectedCondenser);
  const readyCount = [hasCompressor, hasEvaporator, hasCondenser].filter(Boolean).length;
  const isReady = readyCount === 3 || isConfigured;
  const completedAnalyses = [ph.result, montecarlo.result, optimization.result, ai.result].filter(Boolean).length;

  return (
    <div className="flex flex-wrap items-center gap-3 border-b px-4 py-2"
         style={{ background: "var(--bg-900)", borderColor: "var(--border-subtle)" }}>
      <div className="flex items-center gap-2">
        {isReady ? (
          <CheckCircle2 className="h-4 w-4" style={{ color: "var(--color-success)" }} />
        ) : (
          <Clock className="h-4 w-4" style={{ color: "var(--color-warning)" }} />
        )}
        <span className="text-xs font-semibold" style={{ color: isReady ? "var(--color-success)" : "var(--text-secondary)" }}>
          {isReady ? "Pronto" : `${readyCount}/3`}
        </span>
      </div>

      {origin && (
        <span className="cn-badge text-[10px]" style={{ color: "var(--ice-400)", borderColor: "rgba(56,189,248,0.3)", background: "rgba(56,189,248,0.08)" }}
              title={origin.detail ?? origin.source}>
          {origin.label}{origin.detail && ` · ${origin.detail}`}
        </span>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        <StatusPill active={hasCompressor} label="Compressor" />
        <StatusPill active={hasEvaporator} label="Evaporador" />
        <StatusPill active={hasCondenser} label="Condensador" />
      </div>

      {completedAnalyses > 0 && (
        <span className="cn-badge cn-badge--info text-[10px]">{completedAnalyses}/4 análises</span>
      )}

      <div className="ml-auto flex items-center gap-2">
        {!isReady && (
          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            <AlertCircle className="inline h-3 w-3 mr-1" style={{ color: "var(--color-warning)" }} />
            Configure componentes na aba <strong style={{ color: "var(--text-secondary)" }}>Configuração</strong>
          </span>
        )}
        {isReady && (
          <button className="cn-btn cn-btn--primary cn-btn--sm gap-1" onClick={onRunAll} disabled={isRunning}>
            {isRunning ? <Loader2 className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
            {isRunning ? "Rodando..." : "Rodar Análises"}
          </button>
        )}
      </div>
    </div>
  );
}

export function TestHubPage() {
  const [activeTab, setActiveTab] = useState<TabId>("summary");
  const [isRunningAll, setIsRunningAll] = useState(false);

  const {
    compressor, condenser, evaporator, conditions, selectedMachine,
    ph, montecarlo, optimization, ai,
    setAnalysisLoading, setAnalysisResult, setAnalysisError,
  } = useTestHubStore();

  const activeTabDef = useMemo(() => TABS.find((t) => t.id === activeTab)!, [activeTab]);

  // Sincroniza useTestHubStore → useCatalogSessionStore para que Equilíbrio/Desempenho/Mapa herdem os dados
  useHubStoreSync();

  // Garantia: ao desmontar (usuário sai do Hub), limpa todo o estado
  // do hub/catálogo para que o próximo cálculo comece do zero.
  useEffect(() => {
    return () => {
      resetColdproWorkspace();
    };
  }, []);

  const runAllAnalyses = useCallback(async () => {
    setIsRunningAll(true);
    try {
      setAnalysisLoading("ph", true);
      const phResult = await computePhDiagram(compressor, evaporator, conditions);
      setAnalysisResult("ph", phResult);

      setAnalysisLoading("montecarlo", true);
      const mcResult = await computeMonteCarlo(compressor, evaporator);
      setAnalysisResult("montecarlo", mcResult);

      setAnalysisLoading("optimization", true);
      const optResult = await computeOptimization(compressor, condenser, evaporator, conditions);
      setAnalysisResult("optimization", optResult);

      setAnalysisLoading("ai", true);
      const aiResult = await computeAIAnalysis(compressor, condenser, evaporator, conditions, phResult, mcResult, optResult);
      setAnalysisResult("ai", aiResult);
    } catch (e) {
      console.error("Erro ao rodar análises:", e);
    } finally {
      setIsRunningAll(false);
    }
  }, [compressor, condenser, evaporator, conditions, setAnalysisLoading, setAnalysisResult, setAnalysisError]);

  useEffect(() => {
    if (selectedMachine && compressor.cooling_capacity_w) {
      runAllAnalyses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMachine?.id]);

  const tabGroups = useMemo(() => {
    const groups: Record<string, TabDef[]> = {};
    TABS.forEach((tab) => {
      if (!groups[tab.group]) groups[tab.group] = [];
      groups[tab.group]!.push(tab);
    });
    return groups;
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col" style={{ background: "var(--bg-base)" }}>
      {/* TopBar */}
      <div className="app-topbar shrink-0">
        <div className="flex items-center gap-3">
          <FlaskConical className="h-4 w-4" style={{ color: "var(--ice-400)" }} />
          <div>
            <h1 className="font-display font-bold text-sm leading-tight" style={{ color: "var(--text-primary)" }}>
              Hub de Testes
            </h1>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{activeTabDef.description}</p>
          </div>
        </div>
      </div>

      {/* Barra de status */}
      <SystemStatusBar onRunAll={runAllAnalyses} isRunning={isRunningAll} />

      {/* Corpo: sidebar + conteúdo */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Sidebar de configuração persistente */}
        <HubConfigSidebar />

        {/* Área de conteúdo */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Navegação de abas com grupos */}
          <div className="shrink-0 overflow-x-auto" style={{ background: "var(--bg-900)", borderBottom: "1px solid var(--border-subtle)" }}>
            {Object.entries(tabGroups).map(([group, tabs]) => (
              <div key={group} className="flex min-w-max items-stretch">
                <span className="flex items-center px-3 text-[9px] font-bold uppercase tracking-widest shrink-0 w-24"
                      style={{ color: "var(--text-muted)", borderRight: "1px solid var(--border-subtle)" }}>
                  {GROUP_LABELS[group]}
                </span>
                <div className="flex">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const isDone =
                      (tab.id === "ph" && ph.result != null) ||
                      (tab.id === "montecarlo" && montecarlo.result != null) ||
                      (tab.id === "autoopt" && optimization.result != null) ||
                      (tab.id === "ai" && ai.result != null);
                    const isLoading =
                      (tab.id === "ph" && ph.loading) ||
                      (tab.id === "montecarlo" && montecarlo.loading) ||
                      (tab.id === "autoopt" && optimization.loading) ||
                      (tab.id === "ai" && ai.loading);
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`cn-tab flex items-center gap-1.5 ${isActive ? "active" : ""}`}
                        title={tab.description}
                      >
                        {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Icon className="h-3 w-3" />}
                        {tab.label}
                        {isDone && (
                          <span className="h-1.5 w-1.5 rounded-full shrink-0"
                                style={{ background: "var(--color-success)" }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Conteúdo da aba ativa */}
          <div className="flex-1 overflow-auto p-4" style={{ background: "var(--bg-base)" }}>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>

        <TabsContent value="summary" className="mt-0">
          <ExecutiveSummaryTabContent machine={selectedMachine} onNavigate={(tab) => setActiveTab(tab as TabId)} />
        </TabsContent>
        <TabsContent value="config" className="mt-0">
          <SystemConfigTabContent onDone={() => setActiveTab("ph")} />
        </TabsContent>
        <TabsContent value="ph" className="mt-0">
          <PhDiagramTabContent result={ph.result} loading={ph.loading} error={ph.error} />
        </TabsContent>
        <TabsContent value="equilibrium" className="mt-0">
          <SimulationTabContent />
        </TabsContent>
        <TabsContent value="performance" className="mt-0">
          <PerformanceCurveTabContent />
        </TabsContent>
        <TabsContent value="map" className="mt-0">
          <OperatingMapTabContent />
        </TabsContent>
        <TabsContent value="montecarlo" className="mt-0">
          <MonteCarloTabContent result={montecarlo.result} loading={montecarlo.loading} error={montecarlo.error} />
        </TabsContent>
        <TabsContent value="polynomial" className="mt-0">
          <OptimizationTabContent />
        </TabsContent>
        <TabsContent value="autoopt" className="mt-0">
          <AutoOptimizationTabContent />
        </TabsContent>
        <TabsContent value="envelope" className="mt-0">
          <OperatingEnvelopeTabContent machine={selectedMachine} compressor={compressor} phResult={ph.result ?? null} />
        </TabsContent>
        <TabsContent value="energy" className="mt-0">
          <EnergyBalanceTabContent compressor={compressor} condenser={condenser} phResult={ph.result ?? null} />
        </TabsContent>
        <TabsContent value="fancoil" className="mt-0">
          <FanCoilTabContent machine={selectedMachine} evaporator={evaporator} />
        </TabsContent>
        <TabsContent value="sanity" className="mt-0">
          <DataSanityTabContent machine={selectedMachine} compressor={compressor} condenser={condenser} evaporator={evaporator} conditions={conditions} />
        </TabsContent>
        <TabsContent value="bottleneck" className="mt-0">
          <BottleneckTabContent machine={selectedMachine} compressor={compressor} condenser={condenser} evaporator={evaporator} conditions={conditions} />
        </TabsContent>
        <TabsContent value="scenarios" className="mt-0">
          <ScenariosTabContent machine={selectedMachine} compressor={compressor} condenser={condenser} evaporator={evaporator} conditions={conditions} />
        </TabsContent>
        <TabsContent value="frost" className="mt-0">
          <FrostTabContent />
        </TabsContent>
        <TabsContent value="comparison" className="mt-0">
          <MachineComparisonTabContent machine={selectedMachine} compressor={compressor} />
        </TabsContent>
        <TabsContent value="startup" className="mt-0">
          <StartupTabContent machine={selectedMachine} compressor={compressor} condenser={condenser} evaporator={evaporator} conditions={conditions} />
        </TabsContent>
        <TabsContent value="ai" className="mt-0">
          <AIAnalysisTabContent />
        </TabsContent>
        <TabsContent value="report" className="mt-0">
          <TechnicalReportTabContent machine={selectedMachine} />
        </TabsContent>
        <TabsContent value="eletrico" className="mt-0">
          <ElectricoTabContent compressor={compressor} condenser={condenser} />
        </TabsContent>
        <TabsContent value="machine-validation" className="mt-0">
          <MachineValidationTabContent machine={selectedMachine} compressor={compressor} condenser={condenser} evaporator={evaporator} conditions={conditions} />
        </TabsContent>
        <TabsContent value="catalog-datasheet" className="mt-0">
          <CatalogDataSheetTabContent machine={selectedMachine} compressor={compressor} condenser={condenser} evaporator={evaporator} conditions={conditions} />
        </TabsContent>
        <TabsContent value="sensitivity" className="mt-0">
          <SensitivityAnalysisTabContent compressor={compressor} />
        </TabsContent>
        <TabsContent value="revisions" className="mt-0">
          <RevisionsTabContent />
        </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
