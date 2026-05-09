import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useApplicationEngineering } from "../hooks/useApplicationEngineering";

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

export function CompressorPanel() {
  const { compressorInput, compressorResult, setCompressorInput } = useApplicationEngineering();

  const parseCoeffs = (raw: string): number[] => {
    return raw
      .split(/[\s,;]+/)
      .map((v) => parseFloat(v))
      .filter((v) => !isNaN(v));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Entradas */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Coeficientes EN12900 / ARI 540</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Cole os 10 coeficientes de capacidade e potência separados por espaço, vírgula ou
              ponto-e-vírgula. Formato: c1 c2 c3 c4 c5 c6 c7 c8 c9 c10
            </AlertDescription>
          </Alert>

          <div className="space-y-1">
            <Label className="text-xs">Coeficientes de Capacidade (kW)</Label>
            <Input
              placeholder="c1 c2 c3 c4 c5 c6 c7 c8 c9 c10"
              className="h-8 font-mono text-xs"
              onChange={(e) => {
                const coeffs = parseCoeffs(e.target.value);
                if (coeffs.length === 10) {
                  setCompressorInput({ capacity_coefficients: coeffs });
                }
              }}
            />
            {compressorInput.capacity_coefficients && (
              <p className="text-[10px] text-green-600">
                ✓ {compressorInput.capacity_coefficients.length} coeficientes carregados
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="text-xs">Coeficientes de Potência (kW)</Label>
            <Input
              placeholder="c1 c2 c3 c4 c5 c6 c7 c8 c9 c10"
              className="h-8 font-mono text-xs"
              onChange={(e) => {
                const coeffs = parseCoeffs(e.target.value);
                if (coeffs.length === 10) {
                  setCompressorInput({ power_coefficients: coeffs });
                }
              }}
            />
            {compressorInput.power_coefficients && (
              <p className="text-[10px] text-green-600">
                ✓ {compressorInput.power_coefficients.length} coeficientes carregados
              </p>
            )}
          </div>

          <p className="text-[10px] text-muted-foreground">
            O ponto de operação (Te, Tc) é calculado automaticamente a partir do painel acima.
            Clique em "Calcular" para avaliar o desempenho.
          </p>
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
              Insira os coeficientes e clique em "Calcular"
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
                  {compressorResult.warnings.map((w, i) => (
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
  );
}
