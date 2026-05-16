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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

  const statusColor = balance.status === "critical" ? "text-red-600" : balance.status === "warning" ? "text-amber-600" : "text-emerald-600";
  const statusBg = balance.status === "critical" ? "bg-red-50 border-red-200" : balance.status === "warning" ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200";

  return (
    <div className="space-y-5">
      {/* Cabeçalho com badge do motor v2 */}
      {electricalResult && (
        <div className="flex items-center justify-end">
          <Badge className="gap-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            <Cpu className="h-3 w-3" />
            Motor v2 ativo
          </Badge>
        </div>
      )}

      {/* Equação do balanço */}
      <Card className={`border-2 ${statusBg}`}>
        <CardContent className="p-5">
          <div className="flex flex-wrap items-center justify-center gap-3 text-center">
            {/* Q_evap */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-16 w-32 flex-col items-center justify-center rounded-lg bg-blue-100 border border-blue-200">
                <Snowflake className="h-5 w-5 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">Q_evap</span>
                <span className="text-sm font-bold text-blue-800">{fmt(balance.Q_evap_W)}</span>
              </div>
              <span className="text-[10px] text-slate-400">Efeito frigorífico</span>
            </div>

            <span className="text-2xl font-bold text-slate-400">+</span>

            {/* W_comp */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-16 w-32 flex-col items-center justify-center rounded-lg bg-amber-100 border border-amber-200">
                <Zap className="h-5 w-5 text-amber-600" />
                <span className="text-xs font-medium text-amber-700">W_comp</span>
                <span className="text-sm font-bold text-amber-800">{fmt(balance.W_comp_W)}</span>
              </div>
              <span className="text-[10px] text-slate-400">Trabalho do compressor</span>
            </div>

            <span className="text-2xl font-bold text-slate-400">=</span>

            {/* Q_cond necessário */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-16 w-36 flex-col items-center justify-center rounded-lg bg-red-100 border border-red-200">
                <Flame className="h-5 w-5 text-red-600" />
                <span className="text-xs font-medium text-red-700">Q_cond (req.)</span>
                <span className="text-sm font-bold text-red-800">{fmt(balance.Q_cond_required_W)}</span>
              </div>
              <span className="text-[10px] text-slate-400">Calor a rejeitar</span>
            </div>

            <ArrowRight className="h-5 w-5 text-slate-400" />

            {/* Q_cond disponível */}
            <div className="flex flex-col items-center gap-1">
              <div className={`flex h-16 w-36 flex-col items-center justify-center rounded-lg border ${balance.status === "ok" ? "bg-emerald-100 border-emerald-200" : balance.status === "warning" ? "bg-amber-100 border-amber-200" : "bg-red-100 border-red-200"}`}>
                <Flame className={`h-5 w-5 ${balance.status === "ok" ? "text-emerald-600" : balance.status === "warning" ? "text-amber-600" : "text-red-600"}`} />
                <span className={`text-xs font-medium ${balance.status === "ok" ? "text-emerald-700" : balance.status === "warning" ? "text-amber-700" : "text-red-700"}`}>Q_cond (disp.)</span>
                <span className={`text-sm font-bold ${balance.status === "ok" ? "text-emerald-800" : balance.status === "warning" ? "text-amber-800" : "text-red-800"}`}>{fmt(balance.Q_cond_available_W)}</span>
              </div>
              <span className="text-[10px] text-slate-400">Capacidade do condensador</span>
            </div>
          </div>

          {/* Erro de balanço */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              {balance.status === "ok" ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : balance.status === "warning" ? (
                <AlertCircle className="h-5 w-5 text-amber-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className={`text-base font-bold ${statusColor}`}>
                Erro de balanço: {balance.balance_error_pct.toFixed(2)}%
              </span>
              <Badge variant="outline" className={`text-xs ${statusColor}`}>
                {balance.status === "ok" ? "Balanceado" : balance.status === "warning" ? "Atenção" : "Desequilíbrio"}
              </Badge>
            </div>
          </div>
          <p className="mt-1 text-center text-[10px] text-slate-400">
            Tolerância: ≤ 7% (ok) | 7–15% (atenção) | &gt; 15% (crítico) — ASHRAE Handbook Refrigeration 2022, Cap. 2
          </p>
        </CardContent>
      </Card>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "COP", value: balance.COP.toFixed(3), sub: "Q_evap / W_comp", color: "text-emerald-600" },
          { label: "EER", value: balance.EER.toFixed(3), sub: "BTU/h por W", color: "text-blue-600" },
          { label: "Fração Frigorífica", value: `${(balance.Q_evap_W / Math.max(1, balance.Q_cond_required_W) * 100).toFixed(1)}%`, sub: "Q_evap / Q_cond", color: "text-slate-600" },
          { label: "Fração Compressão", value: `${(balance.W_comp_W / Math.max(1, balance.Q_cond_required_W) * 100).toFixed(1)}%`, sub: "W_comp / Q_cond", color: "text-amber-600" },
        ].map(({ label, value, sub, color }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <p className="text-xs text-slate-500">{label}</p>
              <p className={`text-xl font-bold ${color}`}>{value}</p>
              <p className="text-[10px] text-slate-400">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Análise Elétrica (Motor v2) */}
      {electricalResult ? (
        <Card className="border border-emerald-200">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">Análise Elétrica</CardTitle>
                <CardDescription className="text-xs">
                  Calculada por <code>calculateElectricalAnalysis</code> (coldpro_v2). Inclui
                  potência de ventiladores quando informados.
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-[10px] text-emerald-700">Motor v2</Badge>
            </div>
          </CardHeader>
          <CardContent>
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
                <div key={label} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                  <p className="text-[10px] uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="text-sm font-bold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            {electricalResult.warnings.length > 0 && (
              <div className="mt-3 space-y-1">
                {electricalResult.warnings.map((w, i) => (
                  <Alert key={i} className="border-amber-200 bg-amber-50 py-2">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                    <AlertDescription className="text-xs text-amber-700">{w}</AlertDescription>
                  </Alert>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Alert className="border-slate-200 bg-slate-50">
          <AlertCircle className="h-4 w-4 text-slate-500" />
          <AlertDescription className="text-xs text-slate-600">
            Análise elétrica do motor v2 indisponível: preencha capacidade frigorífica e
            potência do compressor para habilitar. Usando fallback manual abaixo.
          </AlertDescription>
        </Alert>
      )}

      {/* Análise de Exergia */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Análise de Exergia — Destruição por Componente</CardTitle>
          <CardDescription className="text-xs">
            Exergia destruída = T₀ × S_gen (Bejan 2016 — Advanced Engineering Thermodynamics). T₀ = 25°C.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Compressor (irreversibilidade isentrópica)", value: balance.exergy.compressor, note: "η_is = 70% → 30% de irreversibilidade interna" },
              { name: "Condensador (diferença de temperatura)", value: balance.exergy.condenser, note: "ΔT médio ~10K entre refrigerante e ar" },
              { name: "Evaporador (diferença de temperatura)", value: balance.exergy.evaporator, note: "ΔT médio ~8K entre ar e refrigerante" },
              { name: "Válvula de Expansão (expansão isentálpica)", value: balance.exergy.valve, note: "Processo irreversível — sem recuperação de trabalho" },
            ].map(({ name, value, note }) => (
              <div key={name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-700">{name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-600">{fmt(value)}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {(value / Math.max(1, balance.exergy.total) * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-orange-400"
                    style={{ width: `${(value / Math.max(1, balance.exergy.total)) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400">{note}</p>
              </div>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2">
              <span className="text-xs font-bold text-slate-700">Total de Exergia Destruída</span>
              <span className="text-sm font-bold text-orange-600">{fmt(balance.exergy.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {balance.status !== "ok" && (
        <Alert className={`border ${balance.status === "critical" ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"}`}>
          <AlertCircle className={`h-4 w-4 ${balance.status === "critical" ? "text-red-500" : "text-amber-500"}`} />
          <AlertDescription className={`text-sm ${balance.status === "critical" ? "text-red-700" : "text-amber-700"}`}>
            {balance.status === "critical"
              ? `Erro de balanço ${balance.balance_error_pct.toFixed(1)}% > 15%. Componentes provavelmente especificados para condições diferentes. Verificar temperaturas de referência.`
              : `Erro de balanço ${balance.balance_error_pct.toFixed(1)}% entre 7-15%. Verificar se compressor e condensador foram especificados nas mesmas condições de Te e Tc.`}
          </AlertDescription>
        </Alert>
      )}

      {/* Drill-down térmico — U4 */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Detalhamento Térmico</CardTitle>
          <CardDescription className="text-xs">
            Clique em cada resultado para expandir os parâmetros de troca de calor estimados.
            Valores típicos EN 12900 / ASHRAE — use o motor iterativo para valores exatos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
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
        </CardContent>
      </Card>
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
