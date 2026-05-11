import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Info,
  Loader2,
  Thermometer,
  Zap,
} from "lucide-react";
import { CompressorPickerModal } from "@/modules/cn_coils/components/CompressorPickerModal";
import type { CompressorItem } from "@/modules/cn_coils/components/CompressorPickerModal";
import { getCompressorById } from "@/modules/coldpro_catalog/data/compressorCatalog.service";
import { useApplicationEngineering } from "../hooks/useApplicationEngineering";

// ── Componente auxiliar ──────────────────────────────────────────────────────
function ResultRow({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="flex items-center justify-between py-1 text-xs border-b border-border/40 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-medium">
        {value}
        {unit && <span className="ml-1 text-muted-foreground">{unit}</span>}
      </span>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────
export function CompressorPanel() {
  const { compressorInput, compressorResult, setCompressorInput } = useApplicationEngineering();

  const [pickerOpen, setPickerOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<CompressorItem | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  /**
   * Chamado quando o usuário confirma a seleção no CompressorPickerModal.
   * Busca o CompressorCatalogRow completo para extrair os coeficientes EN12900.
   */
  const handleSelect = useCallback(
    async (item: CompressorItem) => {
      setPickerOpen(false);
      setLoadError(null);
      setLoadingId(item.id);
      try {
        const row = await getCompressorById(item.id);
        if (!row) {
          setLoadError(`Compressor "${item.model}" não encontrado no catálogo.`);
          return;
        }
        const pt = row.calibration_points?.[0];
        if (!pt || !pt.cap_coeffs || pt.cap_coeffs.length < 10) {
          setLoadError(`Compressor "${item.model}" não possui coeficientes EN12900 válidos.`);
          return;
        }
        // ✅ Extrai cap_coeffs e pwr_coeffs do ponto de calibração padrão
        setCompressorInput({
          capacity_coefficients: pt.cap_coeffs,
          power_coefficients: pt.pwr_coeffs ?? [],
        });
        setSelectedItem(item);
      } catch (err) {
        setLoadError("Erro ao carregar dados do compressor. Tente novamente.");
        console.error("[CompressorPanel] getCompressorById error:", err);
      } finally {
        setLoadingId(null);
      }
    },
    [setCompressorInput],
  );

  const hasCoefficients =
    (compressorInput.capacity_coefficients?.length ?? 0) >= 10 &&
    (compressorInput.power_coefficients?.length ?? 0) >= 10;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {/* Seleção do compressor */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Cpu className="h-4 w-4 text-primary" />
              Seleção do Compressor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Botão de seleção */}
            <Button
              variant="outline"
              className="w-full justify-between"
              onClick={() => setPickerOpen(true)}
              disabled={loadingId !== null}
            >
              <span className="flex items-center gap-2">
                {loadingId ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Cpu className="h-4 w-4" />
                )}
                {selectedItem ? selectedItem.model : "Selecionar Compressor…"}
              </span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>

            {/* Erro de carregamento */}
            {loadError && (
              <Alert variant="destructive" className="py-2">
                <AlertTriangle className="h-3 w-3" />
                <AlertDescription className="text-xs">{loadError}</AlertDescription>
              </Alert>
            )}

            {/* Informações do compressor selecionado */}
            {selectedItem && !loadError && (
              <div className="rounded-md border bg-muted/30 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{selectedItem.model}</span>
                  {selectedItem.refrigerant && (
                    <Badge variant="secondary" className="text-[10px]">
                      {selectedItem.refrigerant}
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  {selectedItem.nominalCapacityW && (
                    <div className="flex items-center gap-1">
                      <Thermometer className="h-3 w-3" />
                      <span>{(selectedItem.nominalCapacityW / 1000).toFixed(1)} kW nom.</span>
                    </div>
                  )}
                  {selectedItem.nominalPowerW && (
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      <span>{(selectedItem.nominalPowerW / 1000).toFixed(1)} kW elét.</span>
                    </div>
                  )}
                </div>
                {hasCoefficients && (
                  <div className="flex items-center gap-1 text-[10px] text-green-600">
                    <CheckCircle2 className="h-3 w-3" />
                    10 coeficientes EN12900 carregados (cap + pwr)
                  </div>
                )}
              </div>
            )}

            {/* Estado inicial — sem seleção */}
            {!selectedItem && !loadingId && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Selecione um compressor do catálogo BITZER. Os coeficientes EN12900 serão
                  carregados automaticamente.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Resultados */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm">
              Resultados
              {compressorResult && (
                <Badge
                  variant={compressorResult.within_envelope ? "default" : "secondary"}
                  className="text-[10px]"
                >
                  {compressorResult.within_envelope ? "Dentro do envelope" : "Fora do envelope"}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!compressorResult ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                {hasCoefficients
                  ? 'Clique em "Calcular" para avaliar o desempenho'
                  : "Selecione um compressor para continuar"}
              </p>
            ) : (
              <div className="space-y-1">
                <ResultRow
                  label="Capacidade frigorífica"
                  value={(compressorResult.capacity_w / 1000).toFixed(2)}
                  unit="kW"
                />
                <ResultRow
                  label="Potência absorvida"
                  value={(compressorResult.power_w / 1000).toFixed(2)}
                  unit="kW"
                />
                <ResultRow label="COP compressor" value={compressorResult.cop.toFixed(3)} />
                <ResultRow
                  label="Calor rejeitado"
                  value={(compressorResult.heat_rejection_w / 1000).toFixed(2)}
                  unit="kW"
                />
                {compressorResult.warnings.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {compressorResult.warnings.map((w: string, i: number) => (
                      <Alert key={i} className="py-2">
                        <AlertTriangle className="h-3 w-3" />
                        <AlertDescription className="text-xs">{w}</AlertDescription>
                      </Alert>
                    ))}
                  </div>
                )}
                {compressorResult.warnings.length === 0 && (
                  <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle2 className="h-3 w-3" />
                    Sem avisos
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal de seleção */}
      <CompressorPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleSelect}
      />
    </>
  );
}
