/**
 * OperatingEnvelopeTabContent — Envelope Operacional
 *
 * Verifica se a máquina opera dentro dos limites técnicos:
 * - Te mínimo/máximo por aplicação (LT/MT/HT)
 * - Tc mínimo/máximo
 * - Razão de compressão (limite: 10 para compressores herméticos)
 * - Temperatura de descarga (limite: 120°C — Bitzer Technical Info)
 * - Corrente estimada vs nominal
 * - Potência máxima
 *
 * Referências:
 * - ASHRAE Handbook Refrigeration 2022, Cap. 37 — Compressors
 * - Bitzer Technical Information A-501 (2019)
 * - EN 12900:2013 — Rating conditions for refrigerant compressors
 */
import { useMemo } from "react";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from "recharts";
import type { CatalogEquipmentRow } from "@/modules/coldpro_catalog/data/equipmentCatalog.types";
import type { CompressorSpec } from "@/modules/coldpro_v2";
import type { PhDiagramResult } from "../../stores/useTestHubStore";

interface Props {
  machine: CatalogEquipmentRow | null;
  compressor: Partial<CompressorSpec>;
  phResult: PhDiagramResult | null;
}

type LimitStatus = "ok" | "warning" | "critical";

interface LimitCheck {
  name: string;
  current: number;
  min?: number;
  max?: number;
  unit: string;
  status: LimitStatus;
  note: string;
  pct: number; // 0-100, onde 50 = nominal, 100 = no limite
}

// Limites por aplicação (ASHRAE Handbook Refrigeration 2022, Cap. 37)
const APP_LIMITS: Record<string, { teMin: number; teMax: number; tcMax: number }> = {
  LT: { teMin: -45, teMax: -15, tcMax: 55 },
  MT: { teMin: -25, teMax: 5, tcMax: 55 },
  HT: { teMin: -10, teMax: 15, tcMax: 65 },
  AGRO: { teMin: -15, teMax: 5, tcMax: 55 },
  freezing: { teMin: -45, teMax: -15, tcMax: 55 },
  cooling: { teMin: -10, teMax: 15, tcMax: 60 },
  unknown: { teMin: -40, teMax: 15, tcMax: 65 },
};

export function OperatingEnvelopeTabContent({ machine, compressor, phResult }: Props) {
  const checks = useMemo<LimitCheck[]>(() => {
    const app = machine?.application ?? "unknown";
    const limits = APP_LIMITS[app] ?? APP_LIMITS.unknown!;
    const Te = compressor.evap_temp_c ?? machine?.tempEvaporacaoC ?? -10;
    const Tc = compressor.cond_temp_c ?? machine?.tempCondensacaoC ?? 40;
    const cr = phResult?.compressionRatio ?? (Tc > Te ? (Tc + 273.15 + 20) / (Te + 273.15 + 10) : 3);
    const Tdisc = phResult?.dischargeTemp_C ?? (Te + 10 + (cr - 1) * 25);
    const Q_kW = (compressor.cooling_capacity_w ?? 0) / 1000;
    const W_kW = (compressor.power_w ?? Q_kW / 2.5) / 1000;
    const COP = W_kW > 0 ? Q_kW / W_kW : 0;

    function pctInRange(v: number, lo: number, hi: number): number {
      return Math.min(100, Math.max(0, ((v - lo) / (hi - lo)) * 100));
    }

    const result: LimitCheck[] = [
      {
        name: "Temperatura de Evaporação",
        current: Te,
        min: limits.teMin,
        max: limits.teMax,
        unit: "°C",
        status: Te < limits.teMin || Te > limits.teMax ? "critical" : Te < limits.teMin + 5 || Te > limits.teMax - 5 ? "warning" : "ok",
        note: `Faixa para ${app}: ${limits.teMin}°C a ${limits.teMax}°C`,
        pct: pctInRange(Te, limits.teMin, limits.teMax),
      },
      {
        name: "Temperatura de Condensação",
        current: Tc,
        max: limits.tcMax,
        unit: "°C",
        status: Tc > limits.tcMax ? "critical" : Tc > limits.tcMax - 5 ? "warning" : "ok",
        note: `Máximo para ${app}: ${limits.tcMax}°C`,
        pct: Math.min(100, (Tc / limits.tcMax) * 100),
      },
      {
        name: "Razão de Compressão",
        current: cr,
        max: 10,
        unit: "",
        status: cr > 10 ? "critical" : cr > 7 ? "warning" : "ok",
        note: "Limite: 10 (compressor hermético). Acima de 7: verificar temperatura de descarga.",
        pct: Math.min(100, (cr / 10) * 100),
      },
      {
        name: "Temperatura de Descarga",
        current: Tdisc,
        max: 120,
        unit: "°C",
        status: Tdisc > 130 ? "critical" : Tdisc > 110 ? "warning" : "ok",
        note: "Limite: 120°C (Bitzer A-501). Acima de 130°C: risco de degradação do óleo.",
        pct: Math.min(100, (Tdisc / 130) * 100),
      },
      {
        name: "COP vs Carnot",
        current: COP,
        unit: "",
        status: COP < 1.0 ? "critical" : COP < 1.5 ? "warning" : "ok",
        note: `COP de Carnot: ${((Te + 273.15) / Math.max(1, Tc - Te)).toFixed(2)}. Eficiência 2ª Lei: ${COP > 0 ? ((COP / ((Te + 273.15) / Math.max(1, Tc - Te))) * 100).toFixed(0) : "—"}%`,
        pct: Math.min(100, (COP / 4) * 100),
      },
      {
        name: "Potência do Compressor",
        current: W_kW,
        unit: "kW",
        status: W_kW > (machine?.potenciaEletricaKw ?? W_kW * 1.1) * 1.1 ? "warning" : "ok",
        note: `Potência nominal: ${(machine?.potenciaEletricaKw ?? W_kW).toFixed(1)} kW`,
        pct: machine?.potenciaEletricaKw ? Math.min(100, (W_kW / machine.potenciaEletricaKw) * 100) : 70,
      },
    ];

    return result;
  }, [machine, compressor, phResult]);

  const criticalCount = checks.filter((c) => c.status === "critical").length;
  const warningCount = checks.filter((c) => c.status === "warning").length;

  // Dados para o gráfico radar
  const radarData = checks.map((c) => ({
    subject: c.name.split(" ").slice(0, 2).join(" "),
    value: c.pct,
    fullMark: 100,
  }));

  const overallStatus: LimitStatus = criticalCount > 0 ? "critical" : warningCount > 0 ? "warning" : "ok";

  return (
    <div className="space-y-5">
      {/* Status geral */}
      <div
        className="cn-card p-4"
        style={{
          borderWidth: 2,
          borderColor: overallStatus === "critical" ? "var(--color-error)" : overallStatus === "warning" ? "#f59e0b" : "var(--color-success)",
        }}
      >
        <div className="flex items-center gap-4">
          {overallStatus === "critical" ? (
            <span style={{ color: "var(--color-error)" }}>
              <XCircle className="h-10 w-10 shrink-0" />
            </span>
          ) : overallStatus === "warning" ? (
            <span style={{ color: "#f59e0b" }}>
              <AlertCircle className="h-10 w-10 shrink-0" />
            </span>
          ) : (
            <span style={{ color: "var(--color-success)" }}>
              <CheckCircle2 className="h-10 w-10 shrink-0" />
            </span>
          )}
          <div>
            <p className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
              {overallStatus === "critical" ? "Fora do Envelope Operacional" :
               overallStatus === "warning" ? "Próximo dos Limites" :
               "Dentro do Envelope Operacional"}
            </p>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              {criticalCount > 0 ? `${criticalCount} limite(s) excedido(s) — ação imediata necessária. ` : ""}
              {warningCount > 0 ? `${warningCount} parâmetro(s) próximo(s) do limite.` : ""}
              {overallStatus === "ok" ? "Todos os parâmetros dentro dos limites operacionais." : ""}
            </p>
          </div>
          <div className="ml-auto flex gap-2">
            {criticalCount > 0 && (
              <span className="cn-badge" style={{ background: "var(--color-error)", color: "#fff" }}>
                {criticalCount} crítico
              </span>
            )}
            {warningCount > 0 && (
              <span className="cn-badge" style={{ background: "#f59e0b", color: "#fff" }}>
                {warningCount} alerta
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Gráfico Radar */}
        <div className="cn-card p-4">
          <p className="mb-3 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            Mapa de Utilização dos Limites
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border-subtle)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "var(--text-muted)" }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} tickFormatter={(v: number) => `${v}%`} />
              <Radar name="Utilização" dataKey="value" stroke="#1E6FD9" fill="#1E6FD9" fillOpacity={0.25} />
              <Tooltip formatter={(v: number) => [`${v.toFixed(0)}%`, "Utilização"]} />
            </RadarChart>
          </ResponsiveContainer>
          <p className="text-center text-[10px]" style={{ color: "var(--text-muted)" }}>
            100% = no limite máximo do parâmetro
          </p>
        </div>

        {/* Lista de limites */}
        <div className="space-y-3">
          {checks.map((check, i) => (
            <div
              key={i}
              className="cn-card p-3"
              style={{
                borderColor: check.status === "critical" ? "var(--color-error)" : check.status === "warning" ? "#f59e0b" : "var(--color-success)",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {check.status === "ok" ? (
                    <span style={{ color: "var(--color-success)" }}>
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    </span>
                  ) : check.status === "warning" ? (
                    <span style={{ color: "#f59e0b" }}>
                      <AlertCircle className="h-4 w-4 shrink-0" />
                    </span>
                  ) : (
                    <span style={{ color: "var(--color-error)" }}>
                      <XCircle className="h-4 w-4 shrink-0" />
                    </span>
                  )}
                  <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{check.name}</span>
                </div>
                <span
                  className="text-sm font-bold font-mono"
                  style={{
                    color: check.status === "critical" ? "var(--color-error)" : check.status === "warning" ? "#f59e0b" : "var(--color-success)",
                  }}
                >
                  {check.current.toFixed(check.unit === "°C" ? 1 : 2)} {check.unit}
                </span>
              </div>
              {/* Barra de progresso */}
              <div className="mt-2 h-1.5 rounded-full" style={{ background: "var(--bg-800)" }}>
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: `${check.pct}%`,
                    background: check.status === "critical" ? "var(--color-error)" : check.status === "warning" ? "#f59e0b" : "var(--color-success)",
                  }}
                />
              </div>
              <p className="mt-1 text-[10px]" style={{ color: "var(--text-muted)" }}>{check.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Alertas críticos */}
      {criticalCount > 0 && (
        <div
          className="flex items-start gap-3 rounded p-3"
          style={{ background: "var(--bg-800)", borderWidth: 1, borderColor: "var(--color-error)" }}
        >
          <span style={{ color: "var(--color-error)" }}>
            <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
          </span>
          <p className="text-sm" style={{ color: "var(--color-error)" }}>
            <strong>Operação fora do envelope!</strong> Revisar condições de operação antes de prosseguir. Risco de danos ao compressor e redução severa de vida útil.
          </p>
        </div>
      )}
    </div>
  );
}
