import { PageContainer } from "../../components/layout/PageContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Play, RotateCcw, Cog, Thermometer, Wind, CheckCircle2 } from "lucide-react";
import { useApplicationEngineering } from "./hooks/useApplicationEngineering";
import { OperatingPointPanel } from "./components/OperatingPointPanel";
import { CompressorPanel } from "./components/CompressorPanel";
import { CoilPanel } from "./components/CoilPanel";
import { ValidationPanel } from "./components/ValidationPanel";

export function ApplicationEngineeringPage() {
  const {
    activeTab,
    setActiveTab,
    runCalculation,
    reset,
    isCalculating,
    operatingPointResult,
    compressorResult,
    evaporatorResult,
    condenserResult,
    validationResult,
  } = useApplicationEngineering();

  const hasResults = !!(compressorResult || evaporatorResult || condenserResult);

  return (
    <PageContainer
      title="Engenharia de Aplicação"
      subtitle="Dimensionamento integrado: ponto de operação → compressor → serpentinas → validação"
    >
      {/* Barra de ação superior */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {operatingPointResult && (
            <Badge variant="outline" className="gap-1 text-xs">
              <Thermometer className="h-3 w-3" />
              Te = {operatingPointResult.evap_temp_c.toFixed(1)}°C &nbsp;|&nbsp;
              Tc = {operatingPointResult.cond_temp_c.toFixed(1)}°C
            </Badge>
          )}
          {validationResult && (
            <Badge
              variant={
                validationResult.status === "approved"
                  ? "default"
                  : validationResult.status === "warning"
                    ? "secondary"
                    : "destructive"
              }
              className="gap-1 text-xs"
            >
              <CheckCircle2 className="h-3 w-3" />
              COP = {validationResult.cop_total.toFixed(2)}
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={reset} className="gap-1">
            <RotateCcw className="h-4 w-4" />
            Limpar
          </Button>
          <Button size="sm" onClick={runCalculation} disabled={isCalculating} className="gap-1">
            <Play className="h-4 w-4" />
            {isCalculating ? "Calculando..." : "Calcular"}
          </Button>
        </div>
      </div>

      {/* Painel de ponto de operação — sempre visível */}
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <Thermometer className="h-4 w-4 text-blue-500" />
            Ponto de Operação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <OperatingPointPanel />
        </CardContent>
      </Card>

      <Separator className="mb-4" />

      {/* Abas de componentes */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList className="mb-4 grid w-full grid-cols-4">
          <TabsTrigger value="compressor" className="gap-1.5 text-xs">
            <Cog className="h-3.5 w-3.5" />
            Compressor
            {compressorResult && (
              <Badge variant="secondary" className="ml-1 text-[10px]">
                {(compressorResult.capacity_w / 1000).toFixed(1)} kW
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="evaporator" className="gap-1.5 text-xs">
            <Wind className="h-3.5 w-3.5" />
            Evaporador
            {evaporatorResult && (
              <Badge variant="secondary" className="ml-1 text-[10px]">
                {(evaporatorResult.capacity_w / 1000).toFixed(1)} kW
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="condenser" className="gap-1.5 text-xs">
            <Wind className="h-3.5 w-3.5 rotate-180" />
            Condensador
            {condenserResult && (
              <Badge variant="secondary" className="ml-1 text-[10px]">
                {(condenserResult.capacity_w / 1000).toFixed(1)} kW
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="validation" className="gap-1.5 text-xs">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Validação
            {validationResult && (
              <Badge
                variant={
                  validationResult.status === "approved"
                    ? "default"
                    : validationResult.status === "warning"
                      ? "secondary"
                      : "destructive"
                }
                className="ml-1 text-[10px]"
              >
                {validationResult.status === "approved"
                  ? "OK"
                  : validationResult.status === "warning"
                    ? "Aviso"
                    : "Erro"}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compressor">
          <CompressorPanel />
        </TabsContent>

        <TabsContent value="evaporator">
          <CoilPanel type="evaporator" />
        </TabsContent>

        <TabsContent value="condenser">
          <CoilPanel type="condenser" />
        </TabsContent>

        <TabsContent value="validation">
          <ValidationPanel />
        </TabsContent>
      </Tabs>

      {/* Resumo rápido quando há resultados */}
      {hasResults && (
        <Card className="mt-4 border-dashed">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Resumo do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
              {compressorResult && (
                <div>
                  <p className="text-muted-foreground">Capacidade Compressor</p>
                  <p className="font-semibold">
                    {(compressorResult.capacity_w / 1000).toFixed(2)} kW
                  </p>
                </div>
              )}
              {evaporatorResult && (
                <div>
                  <p className="text-muted-foreground">Área Evaporador</p>
                  <p className="font-semibold">
                    {evaporatorResult.exchange_area_m2.toFixed(2)} m²
                  </p>
                </div>
              )}
              {condenserResult && (
                <div>
                  <p className="text-muted-foreground">Área Condensador</p>
                  <p className="font-semibold">
                    {condenserResult.exchange_area_m2.toFixed(2)} m²
                  </p>
                </div>
              )}
              {validationResult && (
                <div>
                  <p className="text-muted-foreground">COP Total</p>
                  <p className="font-semibold">{validationResult.cop_total.toFixed(2)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </PageContainer>
  );
}
