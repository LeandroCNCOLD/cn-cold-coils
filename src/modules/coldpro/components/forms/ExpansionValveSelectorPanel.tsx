/**
 * ExpansionValveSelectorPanel — Seleção automática de válvula de expansão Danfoss
 *
 * Integrado na aba de Configuração do Hub de Testes.
 * Usa o catálogo expansionValves.json + motor expansionValveSelector.ts
 *
 * Entradas (do store do Hub):
 *   - refrigerant: refrigerante do compressor
 *   - Te_C: temperatura de evaporação
 *   - n_circuits: número de circuitos (do evaporador)
 *   - Q_kW: capacidade frigorífica requerida
 */
import { useMemo, useState } from "react";
import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Thermometer, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useExpansionValves } from "@/modules/coldpro_catalog/hooks/useExpansionValves";
import {
  selectExpansionValve,
  type ValveSelectorResult,
} from "@/modules/coldpro_catalog/engines/expansionValveSelector";

interface Props {
  refrigerant: string;
  tevap_c: number;
  n_circuits: number;
  required_capacity_kw: number;
  safety_margin?: number;
}

export function ExpansionValveSelectorPanel({
  refrigerant,
  tevap_c,
  n_circuits,
  required_capacity_kw,
  safety_margin = 1.1,
}: Props) {
  const { data: valves, loading, error } = useExpansionValves();
  const [showCandidates, setShowCandidates] = useState(false);

  const result = useMemo((): ValveSelectorResult | null => {
    if (loading || valves.length === 0) return null;
    if (!refrigerant || !tevap_c || !n_circuits || !required_capacity_kw) return null;
    return selectExpansionValve(valves, {
      refrigerant,
      tevap_c,
      n_circuits,
      required_capacity_kw,
      safety_margin,
    });
  }, [valves, loading, refrigerant, tevap_c, n_circuits, required_capacity_kw, safety_margin]);

  if (loading) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-4 text-center text-sm text-muted-foreground">
          Carregando catálogo de válvulas...
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-dashed border-orange-200">
        <CardContent className="p-4 text-center text-sm text-orange-600">
          Catálogo de válvulas indisponível: {error}
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-4 text-center text-sm text-muted-foreground">
          Preencha refrigerante, Te e capacidade para selecionar a válvula.
        </CardContent>
      </Card>
    );
  }

  const statusColor = {
    selected: "border-green-200 bg-green-50",
    oversized: "border-yellow-200 bg-yellow-50",
    no_match: "border-red-200 bg-red-50",
    no_data: "border-slate-200",
  }[result.status];

  const statusIcon = {
    selected: <CheckCircle2 className="h-4 w-4 text-green-600" />,
    oversized: <AlertCircle className="h-4 w-4 text-yellow-600" />,
    no_match: <AlertCircle className="h-4 w-4 text-red-600" />,
    no_data: <AlertCircle className="h-4 w-4 text-slate-400" />,
  }[result.status];

  const statusLabel = {
    selected: "Selecionada",
    oversized: "Superdimensionada",
    no_match: "Sem correspondência",
    no_data: "Sem dados",
  }[result.status];

  return (
    <Card className={`${statusColor} transition-all`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Thermometer className="h-4 w-4 text-blue-500" />
            Válvula de Expansão (Danfoss)
          </CardTitle>
          <div className="flex items-center gap-1.5">
            {statusIcon}
            <Badge
              variant="outline"
              className={`text-[10px] ${
                result.status === "selected" ? "border-green-400 text-green-700" :
                result.status === "oversized" ? "border-yellow-400 text-yellow-700" :
                "border-red-400 text-red-700"
              }`}
            >
              {statusLabel}
            </Badge>
          </div>
        </div>
        <CardDescription className="text-xs">
          Seleção automática por refrigerante, Te e circuitos
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {result.selected ? (
          <>
            {/* Válvula selecionada */}
            <div className="rounded-md border bg-white/70 p-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {result.selected.type}
                  </p>
                  <p className="text-xs text-slate-500">
                    Código: {result.selected.code}
                    {result.selected.orifice_size_mm && ` · Orifício: ${result.selected.orifice_size_mm} mm`}
                    {result.selected.connection_od && ` · Conexão: ${result.selected.connection_od}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">κ em Te={tevap_c}°C</p>
                  <p className="text-sm font-bold text-blue-700">
                    {result.kappa_at_tevap.toFixed(3)}
                  </p>
                </div>
              </div>

              {/* Circuitos */}
              {(result.selected.circuits_min !== undefined || result.selected.circuits_max !== undefined) && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                  <Zap className="h-3 w-3" />
                  Circuitos: {result.selected.circuits_min ?? "—"} – {result.selected.circuits_max ?? "—"}
                  {" "}(requerido: {n_circuits})
                </div>
              )}
            </div>

            {/* Capacidade */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded bg-white/60 p-2">
                <p className="text-slate-500">Requerida</p>
                <p className="font-semibold">{required_capacity_kw.toFixed(1)} kW</p>
              </div>
              <div className="rounded bg-white/60 p-2">
                <p className="text-slate-500">Estimada</p>
                <p className="font-semibold">{result.estimated_capacity_kw.toFixed(1)} kW</p>
              </div>
              <div className="rounded bg-white/60 p-2">
                <p className="text-slate-500">Razão</p>
                <p className={`font-semibold ${result.capacity_ratio >= 1.0 ? "text-green-700" : "text-red-600"}`}>
                  {(result.capacity_ratio * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Nenhuma válvula adequada para {n_circuits} circuitos com {refrigerant} em Te={tevap_c}°C.
          </p>
        )}

        {/* Avisos */}
        {result.warnings.length > 0 && (
          <div className="space-y-1">
            {result.warnings.map((w, i) => (
              <p key={i} className="text-xs text-yellow-700">⚠ {w}</p>
            ))}
          </div>
        )}

        {/* Candidatas */}
        {result.candidates.length > 1 && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-full text-xs text-slate-500"
              onClick={() => setShowCandidates(!showCandidates)}
            >
              {showCandidates ? (
                <><ChevronUp className="mr-1 h-3 w-3" />Ocultar candidatas</>
              ) : (
                <><ChevronDown className="mr-1 h-3 w-3" />{result.candidates.length} candidatas disponíveis</>
              )}
            </Button>

            {showCandidates && (
              <div className="mt-2 space-y-1.5 rounded border bg-white/50 p-2">
                {result.candidates.map((c, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded px-2 py-1 text-xs ${
                      i === 0 ? "bg-blue-50 font-medium" : "hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-slate-700">
                      {c.valve.type} ({c.valve.code})
                    </span>
                    <div className="flex items-center gap-2 text-right">
                      <span className="text-slate-500">κ={c.kappa.toFixed(3)}</span>
                      <Badge
                        variant="outline"
                        className={`text-[9px] ${c.suitable ? "border-green-300 text-green-700" : "border-red-200 text-red-600"}`}
                      >
                        {(c.capacity_ratio * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
