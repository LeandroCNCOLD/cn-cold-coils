/**
 * ApplicationEngineeringPage — Engenharia de Aplicação
 *
 * Módulo completo de dimensionamento e validação de sistema de refrigeração.
 * Replica fielmente o Hub de Testes, adicionando:
 *  - Sidebar expandida com formulários completos de evaporador, condensador e compressor
 *  - Seletor de compressor do catálogo BITZER (CompressorPickerModal)
 *  - Formulário completo do evaporador (EvaporatorForm — idêntico ao DX)
 *  - Formulário completo do condensador (CondenserForm)
 *  - Condições do sistema (SystemConditionsForm)
 *  - Hub de Testes completa com 20 abas analíticas
 *
 * O estado é gerenciado pelo useTestHubStore (compartilhado com o Hub de Testes).
 */
import { useState, useCallback, useMemo, useEffect } from "react";
import {
  LayoutDashboard, Settings2, Activity, Gauge, TrendingUp, Map,
  FlaskConical, BarChart2, Target, Shield, Zap, Wind,
  CheckCircle2, AlertCircle, BarChart3, Snowflake,
  Brain, FileText, Play, Loader2, GitCompare, ClipboardCheck,
  Cpu, ChevronDown, ChevronUp, Package,
} from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// ── Formulários reutilizados ──────────────────────────────────────────────────
import { EvaporatorForm, type EvaporatorFormValue } from "../../components/forms/EvaporatorForm";
import { CondenserForm } from "../../components/forms/CondenserForm";
import { SystemConditionsForm, type SystemConditions } from "../../components/forms/SystemConditionsForm";
import { CompressorForm } from "../../components/forms/CompressorForm";

// ── Seletor de compressor ─────────────────────────────────────────────────────
import { CompressorPickerModal } from "@/modules/cn_coils/components/CompressorPickerModal";
import type { CompressorItem } from "@/modules/cn_coils/components/CompressorPickerModal";
import { getCompressorById } from "@/modules/coldpro_catalog/data/compressorCatalog.service";

// ── Store e hooks do hub ──────────────────────────────────────────────────────
import { useTestHubStore } from "../../stores/useTestHubStore";
import { HubConfigSidebar } from "../../components/HubConfigSidebar";
import { useHubStoreSync } from "../../hooks/useHubStoreSync";
import { resetColdproWorkspace } from "../../utils/workspaceReset";

// ── Motores de cálculo ────────────────────────────────────────────────────────
import {
  computePhDiagram,
  computeMonteCarlo,
  computeOptimization,
  computeAIAnalysis,
} from "../../engines/testHubEngine";

// ── Abas do Hub de Testes ─────────────────────────────────────────────────────
import { ExecutiveSummaryTabContent } from "../hub-tabs/ExecutiveSummaryTabContent";
import { SystemConfigTabContent } from "../hub-tabs/SystemConfigTabContent";
import { PhDiagramTabContent } from "../hub-tabs/PhDiagramTabContent";
import { SimulationTabContent } from "../hub-tabs/SimulationTabContent";
import { PerformanceCurveTabContent } from "../hub-tabs/PerformanceCurveTabContent";
import { OperatingMapTabContent } from "../hub-tabs/OperatingMapTabContent";
import { MonteCarloTabContent } from "../hub-tabs/MonteCarloTabContent";
import { AutoOptimizationTabContent } from "../hub-tabs/AutoOptimizationTabContent";
import { OperatingEnvelopeTabContent } from "../hub-tabs/OperatingEnvelopeTabContent";
import { EnergyBalanceTabContent } from "../hub-tabs/EnergyBalanceTabContent";
import { FanCoilTabContent } from "../hub-tabs/FanCoilTabContent";
import { DataSanityTabContent } from "../hub-tabs/DataSanityTabContent";
import { BottleneckTabContent } from "../hub-tabs/BottleneckTabContent";
import { ScenariosTabContent } from "../hub-tabs/ScenariosTabContent";
import { FrostTabContent } from "../hub-tabs/FrostTabContent";
import { MachineComparisonTabContent } from "../hub-tabs/MachineComparisonTabContent";
import { StartupTabContent } from "../hub-tabs/StartupTabContent";
import { AIAnalysisTabContent } from "../hub-tabs/AIAnalysisTabContent";
import { TechnicalReportTabContent } from "../hub-tabs/TechnicalReportTabContent";
import { OptimizationTabContent } from "../hub-tabs/OptimizationTabContent";

import type { CompressorSpec, CondenserSpec } from "@/modules/coldpro_v2";

// ── Novos painéis de engenharia ──────────────────────────────────────────────
import { CapacityCurvePanel } from "./components/CapacityCurvePanel";
import { EvaporatorSweepPanel } from "./components/EvaporatorSweepPanel";
import { CondenserSelectionPanel } from "./components/CondenserSelectionPanel";
import type { EvaporatorSweepCandidate, CondenserSelectionCandidate } from "./services/coilSelectionService";

// ── Tipos de abas (idêntico ao TestHubPage) ───────────────────────────────────
type TabId =
  | "summary" | "config"
  | "capacity-curve" | "evap-sweep" | "cond-select"
  | "ph" | "equilibrium" | "performance" | "map"
  | "montecarlo" | "polynomial" | "autoopt" | "envelope" | "energy" | "fancoil"
  | "sanity" | "bottleneck" | "scenarios" | "frost" | "comparison"
  | "startup" | "ai" | "report";

interface TabDef {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  group: "config" | "thermo" | "advanced" | "diagnosis" | "ai";
}

const TABS: TabDef[] = [
  { id: "summary",        label: "Resumo",          icon: LayoutDashboard, description: "Visão consolidada de todas as análises do sistema",                                       group: "config" },
  { id: "config",         label: "Configuração",    icon: Settings2,       description: "Selecione compressor, evaporador, condensador e condições de operação",                  group: "config" },
  { id: "capacity-curve", label: "Curva Capac.",    icon: TrendingUp,      description: "Curva de capacidade do compressor com N pontos configuráveis (Te range × Tc fixo)",    group: "config" },
  { id: "evap-sweep",     label: "Varredura Evap.", icon: FlaskConical,    description: "Varredura automática de geometrias CN Lantery — encontra melhor ΔT do evaporador",    group: "config" },
  { id: "cond-select",    label: "Seleção Cond.",   icon: Target,          description: "Seleção do condensador pelo ponto crítico (Tc_max + Q_rej máxima)",                    group: "config" },
  { id: "ph",          label: "P-H Diagram",  icon: Activity,        description: "Ciclo de Mollier com 4 pontos, curva de saturação e isóbaras",                           group: "thermo" },
  { id: "equilibrium", label: "Equilíbrio",   icon: Gauge,           description: "Balanço térmico entre compressor, evaporador e condensador",                             group: "thermo" },
  { id: "performance", label: "Desempenho",   icon: TrendingUp,      description: "Capacidade, COP e potência em função de Te e Tc",                                        group: "thermo" },
  { id: "map",         label: "Mapa Op.",     icon: Map,             description: "Envelope de operação em múltiplas condições de Tc",                                      group: "thermo" },
  { id: "montecarlo",  label: "Monte Carlo",  icon: FlaskConical,    description: "Análise de incerteza com 500 amostras e bandas de confiança IC 90%",                     group: "advanced" },
  { id: "polynomial",  label: "Polinômios",   icon: BarChart2,       description: "Coeficientes ARI 540 / EN 12900 com tabela e gráfico de superfície",                     group: "advanced" },
  { id: "autoopt",     label: "Otimização",   icon: Target,          description: "Melhor ponto de equilíbrio com sugestões de ajuste priorizadas",                         group: "advanced" },
  { id: "envelope",    label: "Envelope",     icon: Shield,          description: "Limites operacionais de Te, Tc, razão de compressão e temperatura de descarga",          group: "advanced" },
  { id: "energy",      label: "Balanço E.",   icon: Zap,             description: "Validação do balanço de energia: Q_cond ≈ Q_evap + W_comp",                              group: "advanced" },
  { id: "fancoil",     label: "Vent×Coil",    icon: Wind,            description: "Curva do ventilador, ponto de operação real e eficiência do coil",                       group: "advanced" },
  { id: "sanity",      label: "Sanidade",     icon: CheckCircle2,    description: "Validação completa de todos os dados de entrada do sistema",                             group: "diagnosis" },
  { id: "bottleneck",  label: "Gargalo",      icon: AlertCircle,     description: "Identificação do componente limitante do sistema",                                       group: "diagnosis" },
  { id: "scenarios",   label: "Cenários",     icon: BarChart3,       description: "9 cenários operacionais reais com análise comparativa",                                  group: "diagnosis" },
  { id: "frost",       label: "Degelo",       icon: Snowflake,       description: "Análise de formação de gelo e ciclo de degelo",                                          group: "diagnosis" },
  { id: "comparison",  label: "Comparar",     icon: GitCompare,      description: "Alternativas do catálogo com comparação de capacidade e COP",                            group: "diagnosis" },
  { id: "startup",     label: "Start-up",     icon: ClipboardCheck,  description: "Planilha de referência e relatório de comissionamento em campo",                         group: "diagnosis" },
  { id: "ai",          label: "IA",           icon: Brain,           description: "Diagnóstico técnico com motor de regras termodinâmicas embarcadas",                      group: "ai" },
  { id: "report",      label: "Relatório",    icon: FileText,        description: "Relatório técnico completo com exportação para clipboard e impressão",                   group: "ai" },
];

const GROUP_LABELS: Record<string, string> = {
  config:    "Configuração",
  thermo:    "Termodinâmica",
  advanced:  "Análises Avançadas",
  diagnosis: "Diagnóstico",
  ai:        "IA & Relatório",
};

const GROUP_COLORS: Record<string, string> = {
  config:    "text-slate-500",
  thermo:    "text-blue-600",
  advanced:  "text-purple-600",
  diagnosis: "text-amber-600",
  ai:        "text-emerald-600",
};

// ── Painel de seleção de compressor ──────────────────────────────────────────
function CompressorPickerPanel({
  selectedItem,
  onOpenPicker,
}: {
  selectedItem: CompressorItem | null;
  onOpenPicker: () => void;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5 text-[#1E6FD9]" />
          <span className="text-xs font-semibold text-slate-700">Compressor do Catálogo</span>
        </div>
        <Button size="sm" variant="outline" onClick={onOpenPicker} className="h-6 gap-1 px-2 text-[10px]">
          <Package className="h-3 w-3" />
          {selectedItem ? "Trocar" : "Buscar"}
        </Button>
      </div>
      {selectedItem ? (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-slate-900">{selectedItem.model}</span>
            <Badge variant="secondary" className="text-[10px]">{selectedItem.brand}</Badge>
            {selectedItem.type && (
              <Badge className={`text-[10px] ${
                selectedItem.type === "LT" ? "bg-blue-100 text-blue-700" :
                selectedItem.type === "MT" ? "bg-green-100 text-green-700" :
                "bg-orange-100 text-orange-700"
              }`}>{selectedItem.type}</Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] text-slate-500">
            {selectedItem.nominalCapacityW && (
              <span>{(selectedItem.nominalCapacityW / 1000).toFixed(2)} kW frig.</span>
            )}
            {selectedItem.nominalPowerW && (
              <span>{(selectedItem.nominalPowerW / 1000).toFixed(2)} kW elét.</span>
            )}
            <span>{selectedItem.frequencyHz} Hz</span>
            {selectedItem.refrigerant && <span>{selectedItem.refrigerant}</span>}
          </div>
        </div>
      ) : (
        <p className="text-[11px] text-slate-400">
          Clique em "Buscar" para selecionar um compressor BITZER do catálogo
        </p>
      )}
    </div>
  );
}

// ── Sidebar expandida com formulários completos ───────────────────────────────
function ApplicationSidebar({
  selectedCompressor,
  onOpenPicker,
  compressorSpec,
  onCompressorChange,
  evaporatorForm,
  onEvaporatorChange,
  condenserForm,
  onCondenserChange,
  systemConditions,
  onConditionsChange,
}: {
  selectedCompressor: CompressorItem | null;
  onOpenPicker: () => void;
  compressorSpec: Partial<CompressorSpec>;
  onCompressorChange: (v: Partial<CompressorSpec>) => void;
  evaporatorForm: EvaporatorFormValue;
  onEvaporatorChange: (v: EvaporatorFormValue) => void;
  condenserForm: Partial<CondenserSpec>;
  onCondenserChange: (v: Partial<CondenserSpec>) => void;
  systemConditions: Partial<SystemConditions>;
  onConditionsChange: (v: Partial<SystemConditions>) => void;
}) {
  const [openSection, setOpenSection] = useState<string>("compressor");

  const toggle = (s: string) => setOpenSection((prev) => (prev === s ? "" : s));

  const Section = ({
    id,
    label,
    icon: Icon,
    children,
  }: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-slate-100 last:border-0">
      <button
        type="button"
        onClick={() => toggle(id)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left hover:bg-slate-50"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-[#1E6FD9]" />
          <span className="text-xs font-semibold text-slate-700">{label}</span>
        </div>
        {openSection === id ? (
          <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        )}
      </button>
      {openSection === id && (
        <div className="px-3 pb-3">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-full w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-3 py-2.5">
        <p className="text-xs font-semibold text-slate-900">Configuração do Sistema</p>
        <p className="text-[10px] text-slate-500">Preencha os dados e clique em "Rodar Análises"</p>
      </div>
      <ScrollArea className="flex-1">
        <div>
          {/* Seletor de compressor do catálogo */}
          <Section id="compressor" label="Compressor" icon={Cpu}>
            <CompressorPickerPanel
              selectedItem={selectedCompressor}
              onOpenPicker={onOpenPicker}
            />
            <div className="mt-3">
              <CompressorForm
                value={compressorSpec}
                onChange={onCompressorChange}
              />
            </div>
          </Section>

          {/* Condições do sistema */}
          <Section id="conditions" label="Condições do Sistema" icon={Settings2}>
            <SystemConditionsForm
              value={systemConditions}
              onChange={onConditionsChange}
            />
          </Section>

          {/* Evaporador — formulário completo idêntico ao DX */}
          <Section id="evaporator" label="Evaporador" icon={Snowflake}>
            <EvaporatorForm
              value={evaporatorForm}
              onChange={onEvaporatorChange}
            />
          </Section>

          {/* Condensador — formulário completo */}
          <Section id="condenser" label="Condensador" icon={Zap}>
            <CondenserForm
              value={condenserForm}
              onChange={onCondenserChange}
            />
          </Section>

          {/* Sidebar padrão do hub (catálogo de máquinas) */}
          <Section id="catalog" label="Catálogo de Máquinas" icon={Package}>
            <HubConfigSidebar />
          </Section>
        </div>
      </ScrollArea>
    </div>
  );
}

// ── Barra de status do sistema ────────────────────────────────────────────────
function SystemStatusBar({
  onRunAll,
  isRunning,
}: {
  onRunAll: () => void;
  isRunning: boolean;
}) {
  const { compressor, condenser, evaporator, ph, montecarlo, optimization, ai } = useTestHubStore();
  const hasCompressor = !!(compressor.cooling_capacity_w || compressor.evap_temp_c);
  const hasEvaporator = !!(evaporator.T_evaporating_c);
  const hasCondenser = !!(condenser.heat_rejection_capacity_w || condenser.max_cond_temp_c);
  const readyCount = [hasCompressor, hasEvaporator, hasCondenser].filter(Boolean).length;
  const isReady = readyCount >= 2;
  const completedAnalyses = [ph, montecarlo, optimization, ai].filter((a) => a.result != null).length;

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-2">
      <div className="flex items-center gap-1.5">
        <div className={`h-2 w-2 rounded-full ${isReady ? "bg-emerald-500" : "bg-amber-400"}`} />
        <span className="text-[11px] font-medium text-slate-700">
          {isReady ? "Sistema configurado" : `${readyCount}/3 componentes`}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant={hasCompressor ? "default" : "outline"} className="text-xs">Compressor</Badge>
        <Badge variant={hasEvaporator ? "default" : "outline"} className="text-xs">Evaporador</Badge>
        <Badge variant={hasCondenser ? "default" : "outline"} className="text-xs">Condensador</Badge>
      </div>
      {completedAnalyses > 0 && (
        <Badge variant="secondary" className="text-xs">{completedAnalyses}/4 análises concluídas</Badge>
      )}
      {isReady && (
        <div className="ml-auto">
          <Button size="sm" variant="outline" onClick={onRunAll} disabled={isRunning} className="text-xs">
            {isRunning ? (
              <><Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />Rodando...</>
            ) : (
              <><Play className="mr-1.5 h-3.5 w-3.5" />Rodar Todas as Análises</>
            )}
          </Button>
        </div>
      )}
      {!isReady && (
        <Alert className="ml-auto flex-1 border-amber-200 bg-amber-50 py-1">
          <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
          <AlertDescription className="text-xs text-amber-700">
            Preencha os dados na sidebar esquerda ou importe do <strong>Catálogo de Máquinas</strong>.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export function ApplicationEngineeringPage() {
  const [activeTab, setActiveTab] = useState<TabId>("summary");
  const [selectedEvapCandidate, setSelectedEvapCandidate] = useState<EvaporatorSweepCandidate | null>(null);
  const [selectedCondCandidate, setSelectedCondCandidate] = useState<CondenserSelectionCandidate | null>(null);
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [compressorPickerOpen, setCompressorPickerOpen] = useState(false);
  const [selectedCompressorItem, setSelectedCompressorItem] = useState<CompressorItem | null>(null);

  // Formulários locais
  const [compressorSpec, setCompressorSpec] = useState<Partial<CompressorSpec>>({
    refrigerant: "R404A",
    evap_temp_c: -30,
    cond_temp_c: 40,
  });
  const [evaporatorForm, setEvaporatorForm] = useState<EvaporatorFormValue>({
    T_evaporating_c: -30,
    airflow_m3_h: 3000,
    air_temperature_in_c: -23,
    air_relative_humidity_in: 0.85,
    tube_outer_diameter_mm: 9.52,
    tube_inner_diameter_mm: 8.5,
    tube_pitch_transverse_mm: 25,
    tube_pitch_longitudinal_mm: 22,
    fin_height_mm: 400,
    fin_thickness_mm: 0.12,
    coil_width_m: 1.2,
    coil_height_m: 0.4,
    fin_spacing_mm: 7,
    fin_pitch_mm: 7,
    rows_total: 3,
    tube_material: "copper",
    fin_material: "aluminum",
    refrigerant: "R404A",
  });
  const [condenserForm, setCondenserForm] = useState<Partial<CondenserSpec>>({
    heat_rejection_capacity_w: 15000,
    max_cond_temp_c: 55,
  });
  const [systemConditions, setSystemConditions] = useState<Partial<SystemConditions>>({
    ambient_temp_c: 30,
    required_airflow_m3_h: 3000,
    nominal_delta_t_evap_k: 7,
    nominal_delta_t_cond_k: 10,
  });

  const {
    compressor, condenser, evaporator, conditions, selectedMachine,
    ph, montecarlo, optimization, ai,
    setCompressor, setCondenser, setEvaporator, setConditions,
    setAnalysisLoading, setAnalysisResult,
  } = useTestHubStore();

  const activeTabDef = useMemo(() => TABS.find((t) => t.id === activeTab)!, [activeTab]);

  // Sincroniza store → catálogo (para Equilíbrio/Desempenho/Mapa)
  useHubStoreSync();

  // Limpa ao desmontar
  useEffect(() => {
    return () => { resetColdproWorkspace(); };
  }, []);

  // Sincroniza formulários locais → store quando mudam
  useEffect(() => {
    setEvaporator(evaporatorForm);
  }, [evaporatorForm, setEvaporator]);

  useEffect(() => {
    setCondenser(condenserForm);
  }, [condenserForm, setCondenser]);

  useEffect(() => {
    setConditions(systemConditions);
  }, [systemConditions, setConditions]);

  useEffect(() => {
    setCompressor(compressorSpec);
  }, [compressorSpec, setCompressor]);

  // Seleciona compressor do catálogo
  const handleCompressorSelect = useCallback(async (item: CompressorItem) => {
    setSelectedCompressorItem(item);
    setCompressorPickerOpen(false);
    try {
      const full = await getCompressorById(item.id);
      if (full) {
        const spec: Partial<CompressorSpec> = {
          evap_temp_c: evaporatorForm.T_evaporating_c ?? -30,
          cond_temp_c: (systemConditions.ambient_temp_c ?? 30) + (systemConditions.nominal_delta_t_cond_k ?? 10),
          refrigerant: item.refrigerant ?? "R404A",
          nominal_cooling_capacity_w: item.nominalCapacityW ?? undefined,
          nominal_power_w: item.nominalPowerW ?? undefined,
          cooling_capacity_w: item.nominalCapacityW ?? undefined,
        };
        setCompressorSpec(spec);
        setCompressor(spec as CompressorSpec);
      }
    } catch {
      // fallback silencioso
    }
  }, [evaporatorForm.T_evaporating_c, systemConditions, setCompressor]);

  // Roda todas as análises
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

      setActiveTab("summary");
    } catch (e) {
      console.error("Erro ao rodar análises:", e);
    } finally {
      setIsRunningAll(false);
    }
  }, [compressor, condenser, evaporator, conditions, setAnalysisLoading, setAnalysisResult]);

  // Auto-disparo ao selecionar máquina do catálogo
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
    <div className="flex h-full min-h-0 flex-col">
      {/* Cabeçalho */}
      <div className="border-b border-slate-200 bg-white px-4 py-2.5">
        <h1 className="text-base font-bold text-slate-900">Engenharia de Aplicação</h1>
        <p className="text-xs text-slate-500">{activeTabDef.description}</p>
      </div>

      {/* Barra de status */}
      <SystemStatusBar onRunAll={runAllAnalyses} isRunning={isRunningAll} />

      {/* Corpo: sidebar expandida + conteúdo */}
      <div className="flex min-h-0 flex-1 overflow-hidden">

        {/* Sidebar expandida com formulários completos */}
        <ApplicationSidebar
          selectedCompressor={selectedCompressorItem}
          onOpenPicker={() => setCompressorPickerOpen(true)}
          compressorSpec={compressorSpec}
          onCompressorChange={setCompressorSpec}
          evaporatorForm={evaporatorForm}
          onEvaporatorChange={setEvaporatorForm}
          condenserForm={condenserForm}
          onCondenserChange={setCondenserForm}
          systemConditions={systemConditions}
          onConditionsChange={setSystemConditions}
        />

        {/* Área de conteúdo com abas */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* Navegação de abas (idêntica ao TestHubPage) */}
          <div className="space-y-1 border-b border-slate-100 bg-white px-3 py-2">
            {Object.entries(tabGroups).map(([group, tabs]) => (
              <div key={group} className="flex flex-wrap items-center gap-1">
                <span className={`mr-1 w-28 shrink-0 text-[10px] font-semibold uppercase tracking-wide ${GROUP_COLORS[group]}`}>
                  {GROUP_LABELS[group]}
                </span>
                <div className="flex flex-wrap gap-0.5">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
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
                        className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all ${
                          activeTab === tab.id
                            ? "bg-white text-[#1E6FD9] shadow-sm"
                            : "text-slate-600 hover:bg-white/60 hover:text-slate-800"
                        }`}
                      >
                        {isLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Icon className="h-3 w-3" />}
                        {tab.label}
                        {isDone && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Conteúdo da aba ativa */}
          <div className="flex-1 overflow-auto p-4">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabId)}>
              <TabsContent value="summary" className="mt-0">
                <ExecutiveSummaryTabContent machine={selectedMachine} onNavigate={(tab) => setActiveTab(tab as TabId)} />
              </TabsContent>
              <TabsContent value="config" className="mt-0">
                <SystemConfigTabContent onDone={() => setActiveTab("ph")} />
              </TabsContent>
              <TabsContent value="capacity-curve" className="mt-0">
                <CapacityCurvePanel
                  compressorCoefficients={
                    compressor && (compressor as any).c1 !== undefined
                      ? {
                          c1: (compressor as any).c1, c2: (compressor as any).c2,
                          c3: (compressor as any).c3, c4: (compressor as any).c4,
                          c5: (compressor as any).c5, c6: (compressor as any).c6,
                          c7: (compressor as any).c7, c8: (compressor as any).c8,
                          c9: (compressor as any).c9, c10: (compressor as any).c10,
                        }
                      : undefined
                  }
                  defaultTe={compressorSpec.evap_temp_c ?? -30}
                  defaultTc={compressorSpec.cond_temp_c ?? 40}
                  onProjectPointSelected={(pt) => {
                    setCompressorSpec((prev) => ({ ...prev, evap_temp_c: pt.te_c, cond_temp_c: pt.tc_c }));
                    setActiveTab("evap-sweep");
                  }}
                />
              </TabsContent>
              <TabsContent value="evap-sweep" className="mt-0">
                <EvaporatorSweepPanel
                  required_capacity_w={
                    compressor && (compressor as any).capacity_w
                      ? (compressor as any).capacity_w
                      : 9560
                  }
                  te_c={compressorSpec.evap_temp_c ?? -30}
                  onSelected={(c) => {
                    setSelectedEvapCandidate(c);
                    setActiveTab("cond-select");
                  }}
                />
              </TabsContent>
              <TabsContent value="cond-select" className="mt-0">
                <CondenserSelectionPanel
                  required_heat_rejection_w={
                    compressor
                      ? ((compressor as any).capacity_w ?? 9560) + ((compressor as any).power_w ?? 6090)
                      : 15650
                  }
                  tc_c={compressorSpec.cond_temp_c ?? 40}
                  air_inlet_temp_c={systemConditions.ambient_temp_c ?? 30}
                  onSelected={(c) => {
                    setSelectedCondCandidate(c);
                    setActiveTab("summary");
                  }}
                />
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
            </Tabs>
          </div>
        </div>
      </div>

      {/* Modal de seleção de compressor */}
      <CompressorPickerModal
        open={compressorPickerOpen}
        onClose={() => setCompressorPickerOpen(false)}
        onSelect={handleCompressorSelect}
      />
    </div>
  );
}
