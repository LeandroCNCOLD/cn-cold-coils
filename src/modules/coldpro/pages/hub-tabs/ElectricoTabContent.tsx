import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Configure compressor (capacidade + potência) para calcular a análise elétrica.
        </AlertDescription>
      </Alert>
    );
  }

  const copDiff = result.cop_compressor > 0
    ? ((result.cop_compressor - result.cop_system) / result.cop_compressor) * 100
    : 0;

  return (
    <div className="space-y-4">
      {/* Parâmetros elétricos de referência */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Zap className="h-4 w-4 text-amber-500" />
            Parâmetros Elétricos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-xs text-muted-foreground">Tensão</div>
              <div className="font-semibold">{result.voltage_v} V</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Fases</div>
              <div className="font-semibold">{result.phases}φ</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Fator de Potência</div>
              <div className="font-semibold">{result.power_factor.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Potências */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Activity className="h-4 w-4 text-blue-500" />
            Distribuição de Potência
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Compressor</span>
              <span className="font-medium">{fmtPower(result.compressor_power_w)}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Ventilador evaporador</span>
              <span className="font-medium">{fmtPower(result.evap_fan_power_w)}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Ventilador condensador</span>
              <span className="font-medium">{fmtPower(result.cond_fan_power_w)}</span>
            </div>
            <div className="flex items-center justify-between pt-1 font-semibold">
              <span>Total</span>
              <span className="text-blue-700">{fmtPower(result.total_electrical_power_w)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Correntes */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Activity className="h-4 w-4 text-purple-500" />
            Correntes Elétricas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Compressor</span>
              <span className="font-medium">{fmtCurrent(result.compressor_current_a)}</span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Ventiladores</span>
              <span className="font-medium">{fmtCurrent(result.fans_current_a)}</span>
            </div>
            <div className="flex items-center justify-between pt-1 font-semibold">
              <span>Total</span>
              <span className={result.total_current_a > 63 ? "text-red-600" : "text-purple-700"}>
                {fmtCurrent(result.total_current_a)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* COP */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold">
            <Thermometer className="h-4 w-4 text-green-500" />
            COP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-xs text-muted-foreground">COP Compressor (Q/W_comp)</div>
              <div className="text-lg font-bold text-slate-700">{fmtCOP(result.cop_compressor)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">COP Sistema (Q/W_total)</div>
              <div className="text-lg font-bold text-green-700">{fmtCOP(result.cop_system)}</div>
              {copDiff > 0 && (
                <div className="text-xs text-amber-600">
                  Ventiladores reduzem COP em {copDiff.toFixed(1)}%
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Avisos */}
      {result.warnings.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4 text-amber-500" />
              Avisos ({result.warnings.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-xs text-muted-foreground">
              {result.warnings.map((w, i) => (
                <li key={i} className="flex gap-2">
                  <AlertCircle className="mt-0.5 h-3 w-3 shrink-0 text-amber-400" />
                  {w}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Dimensionamento elétrico */}
      <Card className="border-slate-200 bg-slate-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-2 text-xs text-slate-600">
            <Badge variant="outline" className="shrink-0 text-[10px]">Referência</Badge>
            <span>
              Corrente total {fmtCurrent(result.total_current_a)} @ {result.voltage_v} V / {result.phases}φ / fp {result.power_factor.toFixed(2)}.
              {" "}Disjuntor recomendado: {Math.ceil(result.total_current_a * 1.25 / 5) * 5} A.
              {" "}Seção mínima de cabo: verificar tabela NBR 5410 para corrente contínua aplicável.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
