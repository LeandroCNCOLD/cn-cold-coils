import { useMemo } from "react";
import { AlertCircle, Zap, Activity, Thermometer, CheckCircle2 } from "lucide-react";
import {
  calculateElectricalAnalysis,
  type CompressorSpec,
  type CondenserSpec,
  type SystemComponentsInput,
} from "@/modules/coldpro_v2";

interface Props {
  compressor: Partial<CompressorSpec>;
  condenser: Partial<CondenserSpec>;
}

function fmtPower(w: number): string {
  return w >= 1000 ? `${(w / 1000).toFixed(2)} kW` : `${w.toFixed(0)} W`;
}

function fmtCOP(v: number): string {
  return v.toFixed(3);
}

function fmtCurrent(a: number): string {
  return `${a.toFixed(2)} A`;
}

export function ElectricoTabContent({ compressor, condenser }: Props) {
  const result = useMemo(() => {
    const q = compressor.cooling_capacity_w ?? 0;
    const w = compressor.power_w ?? 0;
    if (q <= 0 || w <= 0) return null;
    try {
      const sys = {
        compressor: compressor as CompressorSpec,
        condenser: condenser as CondenserSpec,
        evaporator: { progressive_input: {} },
        system_conditions: { ambient_temp_c: 25, required_airflow_m3_h: 0 },
      } as unknown as SystemComponentsInput;
      return calculateElectricalAnalysis({ system: sys, q_evap_w: q });
    } catch {
      return null;
    }
  }, [compressor, condenser]);

  if (!result) {
    return (
      <div
        className="flex gap-3 rounded-md border p-3 text-xs"
        style={{ background: "var(--bg-800)", borderColor: "var(--border-subtle)" }}
      >
        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--text-muted)" }} />
        <span style={{ color: "var(--text-secondary)" }}>
          Configure compressor (capacidade + potência) para calcular a análise elétrica.
        </span>
      </div>
    );
  }

  const copDiff = result.cop_compressor > 0
    ? ((result.cop_compressor - result.cop_system) / result.cop_compressor) * 100
    : 0;

  return (
    <div className="space-y-4">
      {/* Parâmetros elétricos de referência */}
      <div className="cn-card p-4">
        <div className="pb-2">
          <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            <Zap className="h-4 w-4" style={{ color: "#f59e0b" }} />
            Parâmetros Elétricos
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>Tensão</div>
            <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{result.voltage_v} V</div>
          </div>
          <div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>Fases</div>
            <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{result.phases}φ</div>
          </div>
          <div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>Fator de Potência</div>
            <div className="font-semibold font-mono" style={{ color: "var(--text-primary)" }}>{result.power_factor.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Potências */}
      <div className="cn-card p-4">
        <div className="pb-2">
          <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            <Activity className="h-4 w-4" style={{ color: "var(--ice-400)" }} />
            Distribuição de Potência
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--border-subtle)" }}>
            <span style={{ color: "var(--text-muted)" }}>Compressor</span>
            <span className="font-medium font-mono" style={{ color: "var(--text-primary)" }}>{fmtPower(result.compressor_power_w)}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--border-subtle)" }}>
            <span style={{ color: "var(--text-muted)" }}>Ventilador evaporador</span>
            <span className="font-medium font-mono" style={{ color: "var(--text-primary)" }}>{fmtPower(result.evap_fan_power_w)}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--border-subtle)" }}>
            <span style={{ color: "var(--text-muted)" }}>Ventilador condensador</span>
            <span className="font-medium font-mono" style={{ color: "var(--text-primary)" }}>{fmtPower(result.cond_fan_power_w)}</span>
          </div>
          <div className="flex items-center justify-between pt-1 font-semibold">
            <span style={{ color: "var(--text-primary)" }}>Total</span>
            <span className="font-mono" style={{ color: "var(--ice-400)" }}>{fmtPower(result.total_electrical_power_w)}</span>
          </div>
        </div>
      </div>

      {/* Correntes */}
      <div className="cn-card p-4">
        <div className="pb-2">
          <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            <Activity className="h-4 w-4" style={{ color: "var(--ice-400)" }} />
            Correntes Elétricas
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--border-subtle)" }}>
            <span style={{ color: "var(--text-muted)" }}>Compressor</span>
            <span className="font-medium font-mono" style={{ color: "var(--text-primary)" }}>{fmtCurrent(result.compressor_current_a)}</span>
          </div>
          <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "var(--border-subtle)" }}>
            <span style={{ color: "var(--text-muted)" }}>Ventiladores</span>
            <span className="font-medium font-mono" style={{ color: "var(--text-primary)" }}>{fmtCurrent(result.fans_current_a)}</span>
          </div>
          <div className="flex items-center justify-between pt-1 font-semibold">
            <span style={{ color: "var(--text-primary)" }}>Total</span>
            <span
              className="font-mono"
              style={{ color: result.total_current_a > 63 ? "var(--color-error)" : "var(--ice-400)" }}
            >
              {fmtCurrent(result.total_current_a)}
            </span>
          </div>
        </div>
      </div>

      {/* COP */}
      <div className="cn-card p-4">
        <div className="pb-2">
          <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            <Thermometer className="h-4 w-4" style={{ color: "var(--color-success)" }} />
            COP
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>COP Compressor (Q/W_comp)</div>
            <div className="text-lg font-bold font-mono" style={{ color: "var(--text-secondary)" }}>{fmtCOP(result.cop_compressor)}</div>
          </div>
          <div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>COP Sistema (Q/W_total)</div>
            <div className="text-lg font-bold font-mono" style={{ color: "var(--color-success)" }}>{fmtCOP(result.cop_system)}</div>
            {copDiff > 0 && (
              <div className="text-xs" style={{ color: "#f59e0b" }}>
                Ventiladores reduzem COP em <span className="font-mono">{copDiff.toFixed(1)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Avisos */}
      {result.warnings.length > 0 && (
        <div className="cn-card p-4">
          <div className="pb-2">
            <p className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
              <CheckCircle2 className="h-4 w-4" style={{ color: "#f59e0b" }} />
              Avisos (<span className="font-mono">{result.warnings.length}</span>)
            </p>
          </div>
          <ul className="space-y-1 text-xs" style={{ color: "var(--text-muted)" }}>
            {result.warnings.map((w, i) => (
              <li key={i} className="flex gap-2">
                <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" style={{ color: "#f59e0b" }} />
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dimensionamento elétrico */}
      <div
        className="cn-card p-4"
        style={{ background: "var(--bg-800)" }}
      >
        <div className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
          <span className="cn-badge shrink-0 text-[10px]">Referência</span>
          <span>
            Corrente total <span className="font-mono">{fmtCurrent(result.total_current_a)}</span> @ <span className="font-mono">{result.voltage_v} V</span> / <span className="font-mono">{result.phases}φ</span> / fp <span className="font-mono">{result.power_factor.toFixed(2)}</span>.
            {" "}Disjuntor recomendado: <span className="font-mono">{Math.ceil(result.total_current_a * 1.25 / 5) * 5} A</span>.
            {" "}Seção mínima de cabo: verificar tabela NBR 5410 para corrente contínua aplicável.
          </span>
        </div>
      </div>
    </div>
  );
}
