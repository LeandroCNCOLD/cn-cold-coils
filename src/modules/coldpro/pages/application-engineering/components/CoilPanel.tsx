import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useApplicationEngineering } from "../hooks/useApplicationEngineering";
import type { CoilSizingResult } from "../types";

function ResultRow({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/50 py-1.5 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium tabular-nums">
        {value}
        {unit && <span className="ml-1 text-xs text-muted-foreground">{unit}</span>}
      </span>
    </div>
  );
}

function CoilResults({ result }: { result: CoilSizingResult | null }) {
  if (!result) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Preencha os dados e clique em "Calcular"
      </p>
    );
  }

  return (
    <div className="space-y-1">
      <ResultRow
        label="Capacidade calculada"
        value={(result.capacity_w / 1000).toFixed(2)}
        unit="kW"
      />
      <ResultRow
        label="Área de troca total"
        value={result.exchange_area_m2.toFixed(3)}
        unit="m²"
      />
      <ResultRow label="U global" value={result.u_w_m2k.toFixed(1)} unit="W/m²K" />
      <ResultRow
        label="LMTD"
        value={result.lmtd_k !== null ? result.lmtd_k.toFixed(2) : "—"}
        unit="K"
      />
      <ResultRow
        label="Eficiência de aleta"
        value={(result.fin_efficiency * 100).toFixed(1)}
        unit="%"
      />
      <ResultRow
        label="ΔP ar"
        value={result.air_pressure_drop_pa.toFixed(1)}
        unit="Pa"
      />
      <ResultRow
        label="ΔP fluido"
        value={result.fluid_pressure_drop_kpa.toFixed(2)}
        unit="kPa"
      />
      <ResultRow
        label="Velocidade fluido"
        value={result.fluid_velocity_ms.toFixed(3)}
        unit="m/s"
      />

      {result.warnings.length > 0 && (
        <div className="mt-3 space-y-1">
          {result.warnings.map((w, i) => (
            <Alert key={i} className="py-2">
              <AlertTriangle className="h-3 w-3" />
              <AlertDescription className="text-xs">{w}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {result.warnings.length === 0 && (
        <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
          <CheckCircle2 className="h-3 w-3" />
          Sem avisos
        </div>
      )}
    </div>
  );
}

interface CoilPanelProps {
  type: "evaporator" | "condenser";
}

export function CoilPanel({ type }: CoilPanelProps) {
  const {
    evaporatorInput,
    condenserInput,
    evaporatorResult,
    condenserResult,
    setEvaporatorInput,
    setCondenserInput,
  } = useApplicationEngineering();

  const isEvap = type === "evaporator";
  const input = isEvap ? evaporatorInput : condenserInput;
  const result = isEvap ? evaporatorResult : condenserResult;
  const setInput = isEvap ? setEvaporatorInput : setCondenserInput;
  const label = isEvap ? "Evaporador" : "Condensador";

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Entradas */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Dados de Entrada — {label}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Capacidade requerida (W)</Label>
              <Input
                type="number"
                value={input.required_capacity_w ?? ""}
                placeholder="ex: 5000"
                onChange={(e) =>
                  setInput({ required_capacity_w: parseFloat(e.target.value) || undefined })
                }
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Vazão de ar (m³/h)</Label>
              <Input
                type="number"
                value={input.airflow_m3h ?? ""}
                placeholder={isEvap ? "3000" : "5000"}
                onChange={(e) =>
                  setInput({ airflow_m3h: parseFloat(e.target.value) || undefined })
                }
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">T_ar entrada (°C)</Label>
              <Input
                type="number"
                value={input.air_inlet_temp_c ?? ""}
                placeholder={isEvap ? "5" : "35"}
                onChange={(e) =>
                  setInput({ air_inlet_temp_c: parseFloat(e.target.value) || undefined })
                }
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">T_fluido entrada (°C)</Label>
              <Input
                type="number"
                value={input.fluid_inlet_temp_c ?? ""}
                placeholder={isEvap ? "-10" : "45"}
                onChange={(e) =>
                  setInput({ fluid_inlet_temp_c: parseFloat(e.target.value) || undefined })
                }
                className="h-8 text-sm"
              />
            </div>
          </div>

          <p className="text-[10px] font-semibold text-muted-foreground">Geometria (opcional)</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: "rows", label: "Fileiras", placeholder: "4" },
              { key: "tubes_per_row", label: "Tubos/fileira", placeholder: "12" },
              { key: "circuits", label: "Circuitos", placeholder: "4" },
              { key: "length_mm", label: "Comprimento (mm)", placeholder: "1200" },
              { key: "tube_diameter_mm", label: "Ø tubo (mm)", placeholder: "9.52" },
              { key: "fin_spacing_mm", label: "Passo aleta (mm)", placeholder: "4.0" },
            ].map(({ key, label: lbl, placeholder }) => (
              <div key={key} className="space-y-1">
                <Label className="text-[10px]">{lbl}</Label>
                <Input
                  type="number"
                  placeholder={placeholder}
                  onChange={(e) =>
                    setInput({
                      geometry: {
                        ...input.geometry,
                        [key]: parseFloat(e.target.value) || undefined,
                      },
                    })
                  }
                  className="h-7 text-xs"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Resultados — {label}</CardTitle>
        </CardHeader>
        <CardContent>
          <CoilResults result={result ?? null} />
        </CardContent>
      </Card>
    </div>
  );
}
