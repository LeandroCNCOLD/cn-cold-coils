/**
 * SystemConfigTabContent — Aba 1 do Hub de Testes
 *
 * Permite ao engenheiro configurar o sistema completo:
 * - Selecionar uma máquina do catálogo CN COLD (busca inline)
 *   → auto-preenche compressor, evaporador, condensador e condições
 * - Ou preencher manualmente os formulários
 *
 * Ao concluir, chama onDone() para avançar para a aba de Equilíbrio.
 */
import { useState, useMemo } from "react";
import { ArrowRight, Search, CheckCircle2, AlertCircle, X, Package, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { CompressorForm } from "../../components/forms/CompressorForm";
import { ExpansionValveSelectorPanel } from "../../components/forms/ExpansionValveSelectorPanel";
import { CondenserForm } from "../../components/forms/CondenserForm";
import {
  EvaporatorForm,
  type EvaporatorFormValue,
} from "../../components/forms/EvaporatorForm";
import { SystemConditionsForm, type SystemConditions } from "../../components/forms/SystemConditionsForm";
import { useCatalogSessionStore } from "@/modules/coldpro_catalog/store/useCatalogSessionStore";
import type { CompressorSpec, CondenserSpec } from "@/modules/coldpro_v2";
import { getEquipmentCatalog } from "@/modules/coldpro_catalog/data/equipmentCatalog.index";
import type { CatalogEquipmentRow } from "@/modules/coldpro_catalog/data/equipmentCatalog.types";
import { catalogToCompressorSpec } from "@/modules/coldpro_catalog/adapters/compressorAdapter";
import { catalogToCondenserSpec } from "@/modules/coldpro_catalog/adapters/condenserAdapter";
import { useTestHubStore } from "../../stores/useTestHubStore";
import { CapacityRow } from "../../components/ui/CapacityDisplay";

interface Props {
  onDone: () => void;
}

// ── Converte CatalogEquipmentRow → EvaporatorFormValue ────────────────────────
function catalogToEvaporatorFormValue(row: CatalogEquipmentRow): EvaporatorFormValue {
  return {
    T_evaporating_c: row.tempEvaporacaoC ?? -10,
    airflow_m3_h: row.vazaoArEvaporadorM3H,
    air_temperature_in_c: row.tempCamaraC ?? row.tempAmbienteC,
    air_relative_humidity_in: row.umidadeCamaraPercent != null
      ? row.umidadeCamaraPercent / 100
      : undefined,
    tube_outer_diameter_mm: row.evaporadorTuboDiametroMm,
    tube_inner_diameter_mm: row.evaporadorTubeInnerDiameterMm,
    tube_pitch_transverse_mm: row.evaporadorTubePitchTransverseMm,
    tube_pitch_longitudinal_mm: row.evaporadorTubePitchLongitudinalMm,
    fin_height_mm: row.evaporadorFinHeightMm,
    fin_thickness_mm: row.evaporadorFinThicknessMm ?? 0.12,
    coil_width_m: row.evaporadorCoilWidthM,
    coil_height_m: row.evaporadorCoilHeightM,
    fin_spacing_mm: row.evaporadorFinSpacingMm,
    rows_total: row.evaporadorRows,
    tube_material: "copper",
    fin_material: "aluminum",
  };
}

// ── Converte CatalogEquipmentRow → SystemConditions ───────────────────────────
// SystemConditions só tem: ambient_temp_c, required_airflow_m3_h
function catalogToSystemConditions(row: CatalogEquipmentRow): Partial<SystemConditions> {
  return {
    ambient_temp_c: row.tempAmbienteC ?? 35,
    required_airflow_m3_h: row.vazaoArEvaporadorM3H,
  };
}

// ── Componente de busca e seleção de máquina ──────────────────────────────────
function CatalogMachinePicker({
  onSelect,
  selectedId,
}: {
  onSelect: (row: CatalogEquipmentRow) => void;
  selectedId?: string;
}) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(true);
  const catalog = useMemo(() => getEquipmentCatalog(), []);

  const filtered = useMemo(() => {
    if (!search.trim()) return catalog.slice(0, 50);
    const q = search.toLowerCase();
    return catalog
      .filter(
        (r) =>
          r.modelo?.toLowerCase().includes(q) ||
          r.modeloBaseReferencia?.toLowerCase().includes(q) ||
          r.compressorModelo?.toLowerCase().includes(q) ||
          r.refrigerante?.toLowerCase().includes(q) ||
          r.linha?.toLowerCase().includes(q),
      )
      .slice(0, 50);
  }, [catalog, search]);

  return (
    <div className="cn-card p-4" style={{ borderColor: "rgba(30,111,217,0.3)" }}>
      <div className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4" style={{ color: "#1E6FD9" }} />
            <p className="text-sm font-semibold" style={{ color: "#1E6FD9" }}>
              Selecionar Máquina do Catálogo
            </p>
            <span className="cn-badge cn-badge--info text-[10px] font-mono">
              {catalog.length} equipamentos
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs"
            style={{ color: "var(--text-muted)" }}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </Button>
        </div>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          Selecione uma máquina para preencher automaticamente todos os campos abaixo.
        </p>
      </div>

      {expanded && (
        <div className="space-y-3">
          {/* Campo de busca */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5" style={{ color: "var(--text-muted)" }} />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por modelo, compressor, refrigerante..."
              className="h-8 pl-8 text-xs"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-2.5"
                style={{ color: "var(--text-muted)" }}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Tabela de resultados */}
          <div
            className="max-h-64 overflow-auto rounded-lg border"
            style={{ borderColor: "var(--border-subtle)", background: "var(--bg-800)" }}
          >
            <table className="w-full text-xs">
              <thead
                className="sticky top-0 text-[10px] uppercase"
                style={{ background: "var(--bg-700)", color: "var(--text-muted)" }}
              >
                <tr>
                  <th className="px-3 py-2 text-left">Modelo</th>
                  <th className="px-3 py-2 text-left">Linha</th>
                  <th className="px-3 py-2 text-left">Fluido</th>
                  <th className="px-3 py-2 text-right">Cap. kcal/h</th>
                  <th className="px-3 py-2 text-right">COP</th>
                  <th className="px-3 py-2 text-right">Te °C</th>
                  <th className="px-3 py-2 text-right">Tc °C</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-4 text-center" style={{ color: "var(--text-muted)" }}>
                      Nenhum equipamento encontrado
                    </td>
                  </tr>
                )}
                {filtered.map((row) => {
                  const isSelected = row.id === selectedId;
                  const cap = row.capacidadeFrigorificaKcalH ?? row.capacidadeCompressorKcalH;
                  return (
                    <tr
                      key={row.id}
                      className="border-t"
                      style={{
                        borderColor: "var(--border-subtle)",
                        background: isSelected ? "rgba(30,111,217,0.12)" : undefined,
                      }}
                    >
                      <td className="px-3 py-1.5">
                        <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                          {row.modeloBaseReferencia ?? row.modelo}
                        </p>
                        <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                          {row.compressorModelo ?? "—"}
                        </p>
                      </td>
                      <td className="px-3 py-1.5">
                        <span className="max-w-[120px] truncate block" style={{ color: "var(--text-secondary)" }}>
                          {row.linha?.replace(/\[.*?\]/, "").trim() ?? "—"}
                        </span>
                      </td>
                      <td className="px-3 py-1.5" style={{ color: "var(--text-secondary)" }}>
                        {row.refrigerante ?? "—"}
                      </td>
                      <td className="px-3 py-1.5 text-right font-mono" style={{ color: "var(--text-primary)" }}>
                        {cap != null ? cap.toLocaleString("pt-BR", { maximumFractionDigits: 0 }) : "—"}
                      </td>
                      <td className="px-3 py-1.5 text-right font-mono" style={{ color: "var(--text-primary)" }}>
                        {row.cop != null ? row.cop.toFixed(2) : "—"}
                      </td>
                      <td className="px-3 py-1.5 text-right font-mono" style={{ color: "var(--text-primary)" }}>
                        {row.tempEvaporacaoC != null ? row.tempEvaporacaoC.toFixed(1) : "—"}
                      </td>
                      <td className="px-3 py-1.5 text-right font-mono" style={{ color: "var(--text-primary)" }}>
                        {row.tempCondensacaoC != null ? row.tempCondensacaoC.toFixed(1) : "—"}
                      </td>
                      <td className="px-3 py-1.5">
                        <Button
                          size="sm"
                          variant={isSelected ? "default" : "outline"}
                          className={`h-6 px-2 text-[10px] ${
                            isSelected
                              ? "bg-[#1E6FD9] hover:bg-[#1a5fb8]"
                              : "hover:border-[#1E6FD9] hover:text-[#1E6FD9]"
                          }`}
                          onClick={() => onSelect(row)}
                        >
                          {isSelected ? (
                            <><CheckCircle2 className="mr-1 h-3 w-3" />Selecionado</>
                          ) : (
                            "Selecionar"
                          )}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {!search && catalog.length > 50 && (
              <p className="px-3 py-2 text-center text-[10px]" style={{ color: "var(--text-muted)" }}>
                Mostrando 50 de {catalog.length}. Use a busca para filtrar.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export function SystemConfigTabContent({ onDone }: Props) {
  const [selectedMachineId, setSelectedMachineId] = useState<string | undefined>();
  const [catalogSource, setCatalogSource] = useState<string | undefined>();

  // Store global do Hub — fonte de verdade para todas as abas
  const {
    compressor, setCompressor,
    condenser, setCondenser,
    evaporator, setEvaporator,
    conditions, setConditions,
    setMachine,
  } = useTestHubStore();

  // Store do catálogo (compatibilidade com abas legadas)
  const {
    selectedCompressor,
    selectedCondenser,
    selectedEvaporator,
    setCompressor: storeSetCompressor,
    setCondenser: storeSetCondenser,
    setEvaporator: storeSetEvaporator,
    clearSelection,
  } = useCatalogSessionStore();

  // Auto-preenchimento ao selecionar máquina do catálogo
  function handleMachineSelect(row: CatalogEquipmentRow) {
    setSelectedMachineId(row.id);
    setCatalogSource(row.modeloBaseReferencia ?? row.modelo);
    // Atualiza store global do Hub (fonte de verdade para todas as abas)
    setMachine(row);
    // Atualiza store do catálogo (compatibilidade com abas legadas)
    storeSetCompressor(row);
    storeSetCondenser(row);
    storeSetEvaporator(row);
    // Preenche formulários via store global
    try { setCompressor(catalogToCompressorSpec(row)); } catch { /* sem capacidade */ }
    try { setCondenser(catalogToCondenserSpec(row)); } catch { /* sem calor rejeitado */ }
    setEvaporator(catalogToEvaporatorFormValue(row));
    setConditions(catalogToSystemConditions(row));
  }

  function handleClearCatalog() {
    setSelectedMachineId(undefined);
    setCatalogSource(undefined);
    clearSelection();
    setCompressor({ refrigerant: "R404A" });
    setCondenser({});
    setEvaporator({});
    setConditions({});
  }

  const hasCompressor = Boolean(selectedCompressor || compressor.cooling_capacity_w);
  const hasEvaporator = Boolean(selectedEvaporator || evaporator.rows_total);
  const hasCondenser = Boolean(selectedCondenser || condenser.heat_rejection_capacity_w);
  const isReady = hasCompressor && hasEvaporator && hasCondenser;

  return (
    <div className="space-y-5">
      {/* Seletor de máquina do catálogo */}
      <CatalogMachinePicker
        onSelect={handleMachineSelect}
        selectedId={selectedMachineId}
      />

      {/* Banner de máquina selecionada */}
      {catalogSource && (
        <div
          className="flex items-center gap-2 rounded-lg border px-4 py-2.5"
          style={{ borderColor: "rgba(16,185,129,0.35)", background: "rgba(16,185,129,0.08)" }}
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--color-success)" }} />
          <span className="text-sm" style={{ color: "var(--text-primary)" }}>
            Campos preenchidos automaticamente com dados de{" "}
            <strong>{catalogSource}</strong>
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="ml-auto h-auto p-0 text-xs underline"
            style={{ color: "var(--color-success)" }}
            onClick={handleClearCatalog}
          >
            Limpar e preencher manualmente
          </Button>
        </div>
      )}

      {/* Painel de capacidade em múltiplas unidades */}
      {compressor.cooling_capacity_w != null && compressor.cooling_capacity_w > 0 && (
        <div className="cn-card p-4" style={{ borderColor: "rgba(56,189,248,0.2)" }}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--ice-400)" }}>Capacidade Frigorífica</p>
          <CapacityRow watts={compressor.cooling_capacity_w} primary="kW" />
          {condenser.heat_rejection_capacity_w != null && condenser.heat_rejection_capacity_w > 0 && (
            <>
              <div className="my-2 border-t" style={{ borderColor: "var(--border-subtle)" }} />
              <CapacityRow watts={condenser.heat_rejection_capacity_w} label="Calor rejeitado (condensador)" primary="kW" />
            </>
          )}
        </div>
      )}

      {/* Status dos componentes */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Compressor", ok: hasCompressor, source: selectedCompressor?.modelo },
          { label: "Evaporador", ok: hasEvaporator, source: selectedEvaporator?.modelo },
          { label: "Condensador", ok: hasCondenser, source: selectedCondenser?.modelo },
        ].map(({ label, ok, source }) => (
          <div
            key={label}
            className="cn-card p-3 flex items-center gap-2"
            style={ok ? { borderColor: "rgba(16,185,129,0.35)", background: "rgba(16,185,129,0.07)" } : undefined}
          >
            {ok ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: "var(--color-success)" }} />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" style={{ color: "var(--text-muted)" }} />
            )}
            <div className="min-w-0">
              <p className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>{label}</p>
              {source && (
                <p className="truncate text-[10px]" style={{ color: "var(--text-muted)" }}>{source}</p>
              )}
              {!ok && (
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Não configurado</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Formulários (editáveis mesmo após auto-preenchimento) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="cn-card p-4">
          <div className="pb-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Compressor</p>
              {catalogSource && hasCompressor && (
                <span className="cn-badge cn-badge--info text-[10px]">Do catálogo</span>
              )}
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Polinômios ARI 540 / EN12900 são usados automaticamente se disponíveis no catálogo.
            </p>
          </div>
          <CompressorForm value={compressor} onChange={setCompressor} />
        </div>

        <div className="cn-card p-4">
          <div className="pb-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Condensador</p>
              {catalogSource && hasCondenser && (
                <span className="cn-badge cn-badge--info text-[10px]">Do catálogo</span>
              )}
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Capacidade de rejeição de calor e temperatura máxima de condensação.
            </p>
          </div>
          <CondenserForm value={condenser} onChange={setCondenser} />
        </div>

        <div className="cn-card p-4 lg:col-span-2">
          <div className="pb-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Evaporador</p>
              {catalogSource && hasEvaporator && (
                <span className="cn-badge cn-badge--info text-[10px]">Do catálogo</span>
              )}
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Geometria da serpentina. O motor usa os fatores de correção do UNILAB automaticamente.
            </p>
          </div>
          <EvaporatorForm value={evaporator} onChange={setEvaporator} />
        </div>

        <div className="cn-card p-4 lg:col-span-2">
          <div className="pb-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>Condições de Operação</p>
              {catalogSource && (
                <span className="cn-badge cn-badge--info text-[10px]">Do catálogo</span>
              )}
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Temperatura ambiente, vazão de ar e condições de projeto.
            </p>
          </div>
          <SystemConditionsForm value={conditions} onChange={setConditions} />
        </div>
      </div>

      {/* Seleção automática de válvula de expansão */}
      {compressor.cooling_capacity_w != null && compressor.cooling_capacity_w > 0 && (
        <ExpansionValveSelectorPanel
          refrigerant={(compressor as { refrigerant?: string }).refrigerant ?? "R404A"}
          tevap_c={(evaporator as { T_evaporating_c?: number }).T_evaporating_c ?? -10}
          n_circuits={(evaporator as { circuits?: number }).circuits ?? 4}
          required_capacity_kw={compressor.cooling_capacity_w / 1000}
        />
      )}
      {/* Botão avançar */}
      <div className="flex justify-end">
        <Button
          onClick={onDone}
          disabled={!isReady}
          className="gap-2 bg-[#1E6FD9] hover:bg-[#1a5fb8]"
        >
          Avançar para Equilíbrio
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
