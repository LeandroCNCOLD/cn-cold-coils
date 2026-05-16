/**
 * EnergyBalanceTabContent — Balanço de Energia
 *
 * Valida a conservação de energia do ciclo:
 * Q_cond ≈ Q_evap + W_comp  (1ª Lei da Termodinâmica)
 *
 * Exibe:
 * - Diagrama de fluxo de energia (Sankey simplificado)
 * - Erro de balanço com classificação
 * - Tabela de componentes com contribuição percentual
 * - Análise de exergia (destruição de exergia por componente)
 *
 * Referências:
 * - ASHRAE Handbook Fundamentals 2021, Cap. 2 — Thermodynamics
 * - Bejan, A. (2016) — Advanced Engineering Thermodynamics, 4th ed.
 * - Incropera et al. (2011) — Fundamentals of Heat and Mass Transfer, 7th ed.
 */
import { useMemo } from "react";
import { CheckCircle2, AlertCircle, XCircle, Flame, Zap, Snowflake, ArrowRight, Cpu } from "lucide-react";
import { ResultDrillDown } from "../../components/ui/ResultDrillDown";
import {
  calculateElectricalAnalysis,
  type CompressorSpec,
  type CondenserSpec,
  type ElectricalAnalysis,
  type SystemComponentsInput,
} from "@/modules/coldpro_v2";
import type { PhDiagramResult } from "../../stores/useTestHubStore";

interface Props {
  compressor: Partial<CompressorSpec>;
  condenser: Partial<CondenserSpec>;
  phResult: PhDiagramResult | null;
}

export function EnergyBalanceTabContent({ compressor, condenser, phResult }: Props) {
  // ── Motor v2: análise elétrica real ───────────────────────────────────────
  const electricalResult = useMemo<ElectricalAnalysis | null>(() => {
    const Q_evap_W = compressor.cooling_capacity_w ?? 0;
    const W_comp_W = compressor.power_w ?? 0;
    if (Q_evap_W <= 0 || W_comp_W <= 0) return null;
    try {
      // Apenas os campos consumidos pelo motor elétrico precisam estar populados.
      // O cast evita exigir o ProgressiveCoilInput completo para o evaporador.
      const systemInput = {
        compressor: compressor as CompressorSpec,
        condenser: condenser as CondenserSpec,
        evaporator: { progressive_input: {} },
        system_conditions: { ambient_temp_c: 25, required_airflow_m3_h: 0 },
      } as unknown as SystemComponentsInput;
      return calculateElectricalAnalysis({ system: systemInput, q_evap_w: Q_evap_W });
    } catch (e) {
      console.warn("[EnergyBalanceTab] calculateElectricalAnalysis falhou — usando fallback manual:", e);
      return null;
    }
  }, [compressor, condenser]);

  const balance = useMemo(() => {
    const Q_evap_W = compressor.cooling_capacity_w ?? 0;
    const W_comp_W = compressor.power_w ?? Q_evap_W / 2.5;
    const Q_cond_required_W = Q_evap_W + W_comp_W;
    const Q_cond_available_W = condenser.heat_rejection_capacity_w ?? 0;
    const COP = W_comp_W > 0 ? Q_evap_W / W_comp_W : 0;
    const EER = COP * 3.41214;
    const balance_error_pct = Q_cond_required_W > 0
      ? Math.abs(Q_cond_required_W - Q_cond_available_W) / Q_cond_required_W * 100
      : 0;

    // Análise de exergia (Bejan 2016)
    // Destruição de exergia = T_0 * S_gen
    // Para cada componente, estimativa baseada em irreversibilidades típicas
    const T0_K = 298.15; // 25°C — temperatura de referência
    const Te_K = (compressor.evap_temp_c ?? -10) + 273.15;
    const Tc_K = (compressor.cond_temp_c ?? 40) + 273.15;

    // Exergia destruída no compressor: η_is = 70% → 30% de irreversibilidade
    const exergy_comp_W = W_comp_W * 0.30;
    // Exergia destruída no condensador: ΔT médio ~10K
    const exergy_cond_W = Q_cond_required_W * (T0_K / Tc_K) * 0.15;
    // Exergia destruída no evaporador: ΔT médio ~8K
    const exergy_evap_W = Q_evap_W * (1 - T0_K / Te_K) * 0.20;
    // Exergia destruída na válvula: expansão isentálpica
    const exergy_valve_W = Q_evap_W * 0.08;
    const exergy_total_W = exergy_comp_W + exergy_cond_W + exergy_evap_W + exergy_valve_W;

    return {
      Q_evap_W,
      W_comp_W,
      Q_cond_required_W,
      Q_cond_available_W,
      COP,
      EER,
      balance_error_pct,
      status: balance_error_pct > 15 ? "critical" : balance_error_pct > 7 ? "warning" : "ok",
      exergy: {
        compressor: exergy_comp_W,
        condenser: exergy_cond_W,
        evaporator: exergy_evap_W,
        valve: exergy_valve_W,
        total: exergy_total_W,
      },
    };
  }, [compressor, condenser]);

  const fmt = (w: number) => {
    if (w >= 1000) return `${(w / 1000).toFixed(2)} kW`;
    return `${w.toFixed(1)} W`;
  };

  const statusBorderColor = balance.status === "critical"
    ? "rgba(239,68,68,0.4)"
    : balance.status === "warning"
    ? "rgba(245,158,11,0.4)"
    : "rgba(16,185,129,0.4)";

  const statusTextColor = balance.status === "critical"
    ? "var(--color-error)"
    : balance.status === "warning"
    ? "#f59e0b"
    : "var(--color-success)";

  return (
    <div className="space-y-5">
      {/* Cabeçalho com badge do motor v2 */}
      {electricalResult && (
        <div className="flex items-center justify-end">
          <span className="cn-badge cn-badge--approved flex items-center gap-1.5 text-[10px]">
            <Cpu className="h-3 w-3" />
            Motor v2 ativo
          </span>
        </div>
      )}

      {/* Equação do balanço */}
      <div className="cn-card p-5" style={{ borderColor: statusBorderColor }}>
        <div className="flex flex-wrap items-center justify-center gap-3 text-center">
          {/* Q_evap */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex h-16 w-32 flex-col items-center justify-center rounded-lg border"
                 style={{ background: "rgba(56,189,248,0.12)", borderColor: "rgba(56,189,248,0.3)" }}>
              <Snowflake className="h-5 w-5" style={{ color: "var(--ice-400)" }} />
              <span className="font-mono text-xs font-medium" style={{ color: "var(--ice-400)" }}>Q_evap</span>
              <span className="font-mono text-sm font-bold" style={{ color: "var(--text-primary)" }}>{fmt(balance.Q_evap_W)}</span>
            </div>
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Efeito frigorífico</span>
          </div>

          <span className="text-2xl font-bold" style={{ color: "var(--text-muted)" }}>+</span>

          {/* W_comp */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex h-16 w-32 flex-col items-center justify-center rounded-lg border"
                 style={{ background: "rgba(245,158,11,0.12)", borderColor: "rgba(245,158,11,0.3)" }}>
              <Zap className="h-5 w-5 text-amber-400" />
              <span className="font-mono text-xs font-medium text-amber-400">W_comp</span>
              <span className="font-mono text-sm font-bold" style={{ color: "var(--text-primary)" }}>{fmt(balance.W_comp_W)}</span>
            </div>
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Trabalho do compressor</span>
          </div>

          <span className="text-2xl font-bold" style={{ color: "var(--text-muted)" }}>=</span>

          {/* Q_cond necessário */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex h-16 w-36 flex-col items-center justify-center rounded-lg border"
                 style={{ background: "rgba(239,68,68,0.12)", borderColor: "rgba(239,68,68,0.3)" }}>
              <Flame className="h-5 w-5 text-red-400" />
              <span className="font-mono text-xs font-medium text-red-400">Q_cond (req.)</span>
              <span className="font-mono text-sm font-bold" style={{ color: "var(--text-primary)" }}>{fmt(balance.Q_cond_required_W)}</span>
            </div>
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Calor a rejeitar</span>
          </div>

          <ArrowRight className="h-5 w-5" style={{ color: "var(--text-muted)" }} />

          {/* Q_cond disponível */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex h-16 w-36 flex-col items-center justify-center rounded-lg border"
                 style={{ borderColor: statusBorderColor, background: balance.status === "ok" ? "rgba(16,185,129,0.1)" : balance.status === "warning" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)" }}>
              <Flame className="h-5 w-5" style={{ color: statusTextColor }} />
              <span className="font-mono text-xs font-medium" style={{ color: statusTextColor }}>Q_cond (disp.)</span>
              <span className="font-mono text-sm font-bold" style={{ color: "var(--text-primary)" }}>{fmt(balance.Q_cond_available_W)}</span>
            </div>
            <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Capacidade do condensador</span>
          </div>
        </div>

        {/* Erro de balanço */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            {balance.status === "ok" ? (
              <CheckCircle2 className="h-5 w-5" style={{ color: "var(--color-success)" }} />
            ) : balance.status === "warning" ? (
              <AlertCircle className="h-5 w-5 text-amber-400" />
            ) : (
              <XCircle className="h-5 w-5" style={{ color: "var(--color-error)" }} />
            )}
            <span className="font-mono text-base font-bold" style={{ color: statusTextColor }}>
              Erro de balanço: {balance.balance_error_pct.toFixed(2)}%
            </span>
            <span className="cn-badge text-[10px]" style={{ color: statusTextColor, borderColor: statusBorderColor }}>
              {balance.status === "ok" ? "Balanceado" : balance.status === "warning" ? "Atenção" : "Desequilíbrio"}
            </span>
          </div>
        </div>
        <p className="mt-1 text-center text-[10px]" style={{ color: "var(--text-muted)" }}>
          Tolerância: ≤ 7% (ok) | 7–15% (atenção) | &gt; 15% (crítico) — ASHRAE Handbook Refrigeration 2022, Cap. 2
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "COP", value: balance.COP.toFixed(3), sub: "Q_evap / W_comp", color: "var(--color-success)" },
          { label: "EER", value: balance.EER.toFixed(3), sub: "BTU/h por W", color: "var(--ice-400)" },
          { label: "Fração Frigorífica", value: `${(balance.Q_evap_W / Math.max(1, balance.Q_cond_required_W) * 100).toFixed(1)}%`, sub: "Q_evap / Q_cond", color: "var(--text-secondary)" },
          { label: "Fração Compressão", value: `${(balance.W_comp_W / Math.max(1, balance.Q_cond_required_W) * 100).toFixed(1)}%`, sub: "W_comp / Q_cond", color: "#f59e0b" },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="cn-card p-4">
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</p>
            <p className="font-mono text-xl font-bold" style={{ color }}>{value}</p>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Análise Elétrica (Motor v2) */}
      {electricalResult ? (
        <div className="cn-card" style={{ borderColor: "rgba(16,185,129,0.3)" }}>
          <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)" }}>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Análise Elétrica</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Calculada por <code className="font-mono text-[10px]" style={{ color: "var(--ice-400)" }}>calculateElectricalAnalysis</code> (coldpro_v2). Inclui
                potência de ventiladores quando informados.
              </p>
            </div>
            <span className="cn-badge cn-badge--approved text-[10px]">Motor v2</span>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {[
                { label: "Potência total do sistema", value: fmt(electricalResult.total_electrical_power_w) },
                { label: "Potência do compressor", value: fmt(electricalResult.compressor_power_w) },
                { label: "Potência total dos ventiladores", value: fmt(electricalResult.evap_fan_power_w + electricalResult.cond_fan_power_w) },
                { label: "COP real do sistema", value: electricalResult.cop_system.toFixed(3) },
                { label: "EER (BTU/W·h)", value: (electricalResult.cop_system * 3.41214).toFixed(3) },
                { label: "Corrente total", value: `${electricalResult.total_current_a.toFixed(2)} A` },
                { label: "Corrente do compressor", value: `${electricalResult.compressor_current_a.toFixed(2)} A` },
                { label: "Tensão", value: `${electricalResult.voltage_v} V` },
                { label: "Fases", value: `${electricalResult.phases}φ` },
                { label: "Fator de potência", value: electricalResult.power_factor.toFixed(2) },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-md border p-3"
                     style={{ background: "var(--bg-800)", borderColor: "var(--border-subtle)" }}>
                  <p className="text-[10px] uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>{label}</p>
                  <p className="font-mono text-sm font-bold" style={{ color: "var(--text-primary)" }}>{value}</p>
                </div>
              ))}
            </div>
            {electricalResult.warnings.length > 0 && (
              <div className="mt-3 space-y-1">
                {electricalResult.warnings.map((w, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-md border px-3 py-2"
                       style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.3)" }}>
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                    <span className="text-xs text-amber-400">{w}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2 rounded-md border px-4 py-3"
             style={{ background: "var(--bg-800)", borderColor: "var(--border-subtle)" }}>
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--text-muted)" }} />
          <span className="text-xs" style={{ color: "var(--text-secondary)" }}>
            Análise elétrica do motor v2 indisponível: preencha capacidade frigorífica e
            potência do compressor para habilitar. Usando fallback manual abaixo.
          </span>
        </div>
      )}

      {/* Análise de Exergia */}
      <div className="cn-card">
        <div className="border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)" }}>
          <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Análise de Exergia — Destruição por Componente</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Exergia destruída = T₀ × S_gen (Bejan 2016 — Advanced Engineering Thermodynamics). T₀ = 25°C.
          </p>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {[
              { name: "Compressor (irreversibilidade isentrópica)", value: balance.exergy.compressor, note: "η_is = 70% → 30% de irreversibilidade interna" },
              { name: "Condensador (diferença de temperatura)", value: balance.exergy.condenser, note: "ΔT médio ~10K entre refrigerante e ar" },
              { name: "Evaporador (diferença de temperatura)", value: balance.exergy.evaporator, note: "ΔT médio ~8K entre ar e refrigerante" },
              { name: "Válvula de Expansão (expansão isentálpica)", value: balance.exergy.valve, note: "Processo irreversível — sem recuperação de trabalho" },
            ].map(({ name, value, note }) => (
              <div key={name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs" style={{ color: "var(--text-primary)" }}>{fmt(value)}</span>
                    <span className="cn-badge text-[10px]">
                      {(value / Math.max(1, balance.exergy.total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="h-2 rounded-full" style={{ background: "var(--bg-600)" }}>
                  <div
                    className="h-2 rounded-full bg-orange-400"
                    style={{ width: `${(value / Math.max(1, balance.exergy.total)) * 100}%` }}
                  />
                </div>
                <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{note}</p>
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between border-t pt-2" style={{ borderColor: "var(--border-subtle)" }}>
              <span className="text-xs font-bold" style={{ color: "var(--text-secondary)" }}>Total de Exergia Destruída</span>
              <span className="font-mono text-sm font-bold text-orange-400">{fmt(balance.exergy.total)}</span>
            </div>
          </div>
        </div>
      </div>

      {balance.status !== "ok" && (
        <div className="flex items-start gap-2 rounded-md border px-4 py-3"
             style={{
               background: balance.status === "critical" ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)",
               borderColor: balance.status === "critical" ? "rgba(239,68,68,0.3)" : "rgba(245,158,11,0.3)",
             }}>
          <AlertCircle className={`mt-0.5 h-4 w-4 shrink-0 ${balance.status === "critical" ? "text-red-400" : "text-amber-400"}`} />
          <span className={`text-sm ${balance.status === "critical" ? "text-red-400" : "text-amber-400"}`}>
            {balance.status === "critical"
              ? `Erro de balanço ${balance.balance_error_pct.toFixed(1)}% > 15%. Componentes provavelmente especificados para condições diferentes. Verificar temperaturas de referência.`
              : `Erro de balanço ${balance.balance_error_pct.toFixed(1)}% entre 7-15%. Verificar se compressor e condensador foram especificados nas mesmas condições de Te e Tc.`}
          </span>
        </div>
      )}

      {/* Drill-down térmico — U4 */}
      <div className="cn-card">
        <div className="border-b px-4 py-3" style={{ borderColor: "var(--border-subtle)" }}>
          <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Detalhamento Térmico</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Clique em cada resultado para expandir os parâmetros de troca de calor estimados.
            Valores típicos EN 12900 / ASHRAE — use o motor iterativo para valores exatos.
          </p>
        </div>
        <div className="space-y-2 p-4">
          <ThermalDrillDownRows
            Q_evap_W={balance.Q_evap_W}
            W_comp_W={balance.W_comp_W}
            Q_cond_required_W={balance.Q_cond_required_W}
            Q_cond_available_W={balance.Q_cond_available_W}
            COP={balance.COP}
            Te_C={compressor.evap_temp_c ?? -10}
            Tc_C={compressor.cond_temp_c ?? 40}
            phResult={phResult}
          />
        </div>
      </div>
    </div>
  );
}

function ThermalDrillDownRows({
  Q_evap_W, W_comp_W, Q_cond_required_W, Q_cond_available_W, COP, Te_C, Tc_C, phResult,
}: {
  Q_evap_W: number; W_comp_W: number; Q_cond_required_W: number; Q_cond_available_W: number;
  COP: number; Te_C: number; Tc_C: number; phResult: PhDiagramResult | null;
}) {
  const Te = Te_C;
  const Tc = Tc_C;
  const compressionRatio = phResult?.compressionRatio ?? (Tc + 273) / Math.max(1, Te + 273);
  const dischargeTemp = phResult?.dischargeTemp_C ?? Te + 80;
  const superheat = phResult?.superheatK ?? 6;

  // Evaporator: typical finned DX coil parameters
  const LMTD_evap = 7.0; // ΔT_1=10K, ΔT_2=3K → 5.8K; use 7K including approach
  const h_ar_evap = 45;  // W/m²K — typical j-factor finned coil
  const h_ref_evap = 2500; // W/m²K — typical two-phase evaporation
  const U_evap = 1 / (1 / h_ar_evap + 1 / h_ref_evap + 0.003); // fin resistance ~0.003
  const A_evap_est = Q_evap_W / Math.max(0.1, U_evap * LMTD_evap);
  const NTU_evap = Q_evap_W > 0 ? Math.log(1 / (1 - Math.min(0.99, Q_evap_W / Math.max(1, Q_evap_W * 1.2)))) : 0;

  // Condenser: typical air-cooled parameters
  const LMTD_cond = 10.0; // ΔT_1=15K, ΔT_2=8K → typical
  const h_ar_cond = 60;   // W/m²K — condenser (higher velocity)
  const h_ref_cond = 1200; // W/m²K — typical condensation
  const U_cond = 1 / (1 / h_ar_cond + 1 / h_ref_cond + 0.002);

  const fmt = (w: number) => w >= 1000 ? `${(w / 1000).toFixed(2)} kW` : `${w.toFixed(1)} W`;

  return (
    <>
      <ResultDrillDown
        label="Q_evap — Efeito Frigorífico"
        value={fmt(Q_evap_W)}
        accent="text-blue-700"
        details={[
          { label: "LMTD evaporador", value: LMTD_evap, unit: "K", note: "estimado" },
          { label: "h_ar (lado externo)", value: h_ar_evap, unit: "W/m²K", note: "típico EN 12900" },
          { label: "h_refrigerante (bifásico)", value: h_ref_evap, unit: "W/m²K", note: "Jung & Didion" },
          { label: "U global estimado", value: U_evap, unit: "W/m²K" },
          { label: "Área de troca estimada", value: A_evap_est, unit: "m²" },
          { label: "Te evaporação", value: Te, unit: "°C" },
          { label: "Superaquecimento", value: superheat, unit: "K" },
        ]}
      />
      <ResultDrillDown
        label="W_comp — Trabalho do Compressor"
        value={fmt(W_comp_W)}
        accent="text-amber-700"
        details={[
          { label: "Razão de compressão", value: compressionRatio, unit: "—" },
          { label: "T descarga estimada", value: dischargeTemp, unit: "°C" },
          { label: "η isentrópica estimada", value: 70, unit: "%", note: "típico compressor hermético" },
          { label: "η volumétrica estimada", value: 80, unit: "%", note: "típico compressor hermético" },
          { label: "COP compressor", value: COP },
        ]}
      />
      <ResultDrillDown
        label="Q_cond — Calor Rejeitado"
        value={fmt(Q_cond_required_W)}
        accent="text-red-700"
        details={[
          { label: "LMTD condensador", value: LMTD_cond, unit: "K", note: "estimado" },
          { label: "h_ar (lado externo)", value: h_ar_cond, unit: "W/m²K", note: "típico EN 12900" },
          { label: "h_refrigerante (condensação)", value: h_ref_cond, unit: "W/m²K", note: "Shah 1979" },
          { label: "U global estimado", value: U_cond, unit: "W/m²K" },
          { label: "Tc condensação", value: Tc, unit: "°C" },
          { label: "Q_cond disponível (catálogo)", value: fmt(Q_cond_available_W), unit: "" },
        ]}
      />
    </>
  );
}
