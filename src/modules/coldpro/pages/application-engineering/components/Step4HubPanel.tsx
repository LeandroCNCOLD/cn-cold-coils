import { useState, useMemo } from "react";
import { Play, Loader2, BarChart2, Zap, Brain, FileText, Table2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppEngineeringStore } from "../store/useAppEngineeringStore";
import { useTestHubStore } from "@/modules/coldpro/stores/useTestHubStore";
import {
  computePhDiagram,
  computeMonteCarlo,
  computeOptimization,
  computeAIAnalysis,
} from "@/modules/coldpro/engines/testHubEngine";
import { PhDiagramTabContent } from "@/modules/coldpro/pages/hub-tabs/PhDiagramTabContent";
import { ExecutiveSummaryTabContent } from "@/modules/coldpro/pages/hub-tabs/ExecutiveSummaryTabContent";
import { AIAnalysisTabContent } from "@/modules/coldpro/pages/hub-tabs/AIAnalysisTabContent";
import { TechnicalReportTabContent } from "@/modules/coldpro/pages/hub-tabs/TechnicalReportTabContent";
import { MonteCarloTabContent } from "@/modules/coldpro/pages/hub-tabs/MonteCarloTabContent";
import { generateCommercialTable } from "../services/commercialCatalogService";

const T_AMB_LIST = [25, 32, 40];
const TE_RANGE = { min: -40, max: 10, step: 5 };

export function Step4HubPanel() {
  const { step1, step2, step3 } = useAppEngineeringStore();
  const hub = useTestHubStore();
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);
  const [selectedTAmb, setSelectedTAmb] = useState("32");

  const hasCoeffs = step1.capCoeffs.length >= 10;

  const commercialTables = useMemo(
    () =>
      hasCoeffs
        ? generateCommercialTable(step1.capCoeffs, step1.pwrCoeffs, TE_RANGE, T_AMB_LIST)
        : [],
    [step1.capCoeffs, step1.pwrCoeffs, hasCoeffs],
  );

  const selectedTable = useMemo(
    () => commercialTables.find((t) => t.t_amb_c === Number(selectedTAmb)) ?? null,
    [commercialTables, selectedTAmb],
  );

  const dp = step1.designPoint;
  const designTc = dp?.tc_c ?? 40;

  const reguaRows = useMemo(() => {
    const empty = { low: [], mid: [], high: [] };
    if (!hasCoeffs) return empty;
    // deltaTc = 0 so tc_c = t_amb_c directly (using Tc as the "ambient" parameter)
    const tables = generateCommercialTable(
      step1.capCoeffs,
      step1.pwrCoeffs,
      TE_RANGE,
      [designTc - 10, designTc - 5, designTc],
      0,
    );
    return {
      low: tables[0]?.rows ?? [],
      mid: tables[1]?.rows ?? [],
      high: tables[2]?.rows ?? [],
    };
  }, [step1.capCoeffs, step1.pwrCoeffs, hasCoeffs, designTc]);

  function syncToHub() {
    if (!dp) return;
    const evapTubeOuter = step2.geometry?.tubeOuterDiameterMm;
    const evapTubeInner = step2.geometry?.tubeInnerDiameterMm;
    const evapPitchT = step2.geometry?.tubePitchTransverseMm;
    const evapPitchL = step2.geometry?.tubePitchLongitudinalMm;
    const evapHeightMm = evapPitchT ? step2.tubesPerRow * evapPitchT : undefined;
    const evapAirflow = step2.fan ? (step2.fan.airflow_m3h ?? 0) * step2.fanCount : undefined;

    hub.setCompressor({
      refrigerant: step1.refrigerant,
      model: step1.compressorModel,
      cooling_capacity_w: dp.capacity_w,
      power_w: dp.power_w,
      evap_temp_c: dp.te_c,
      cond_temp_c: dp.tc_c,
      ari540_capacity_coefficients: step1.capCoeffs,
      ari540_power_coefficients: step1.pwrCoeffs,
    });

    hub.setCondenser({
      heat_rejection_capacity_w: dp.capacity_w + dp.power_w,
      max_cond_temp_c: dp.tc_c + 5,
    });

    hub.setEvaporator({
      rows_total: step2.rows,
      tubes_per_row: step2.tubesPerRow,
      fin_spacing_mm: step2.finSpacingMm,
      airflow_m3_h: evapAirflow,
      air_temperature_in_c: step2.airInletTempC,
      air_relative_humidity_in: step2.airRhIn,
      T_evaporating_c: dp.te_c,
      tube_outer_diameter_mm: evapTubeOuter,
      tube_inner_diameter_mm: evapTubeInner,
      tube_pitch_transverse_mm: evapPitchT,
      tube_pitch_longitudinal_mm: evapPitchL,
      fin_height_mm: evapHeightMm,
      fin_thickness_mm:
        typeof step2.geometry?.raw.finThicknessMm === "number"
          ? step2.geometry.raw.finThicknessMm
          : 0.12,
      coil_width_m: step2.lengthMm / 1000,
      coil_height_m: evapHeightMm ? evapHeightMm / 1000 : undefined,
      tube_material: step2.geometry?.tubeMaterial ?? "copper",
      fin_material: "aluminum",
    });

    hub.setConditions({
      ambient_temp_c: step3.airInletTempC,
    });
  }

  async function handleRunAll() {
    setRunning(true);
    try {
      syncToHub();
      const {
        compressor,
        condenser,
        evaporator,
        conditions,
        setAnalysisLoading,
        setAnalysisResult,
        setAnalysisError,
      } = useTestHubStore.getState();

      setAnalysisLoading("ph", true);
      const phResult = await computePhDiagram(compressor, evaporator, conditions).catch(
        (e: unknown) => {
          setAnalysisError("ph", String(e));
          return null;
        },
      );
      if (phResult) setAnalysisResult("ph", phResult);

      setAnalysisLoading("montecarlo", true);
      const mcResult = await computeMonteCarlo(compressor, evaporator).catch((e: unknown) => {
        setAnalysisError("montecarlo", String(e));
        return null;
      });
      if (mcResult) setAnalysisResult("montecarlo", mcResult);

      setAnalysisLoading("optimization", true);
      const optResult = await computeOptimization(
        compressor,
        condenser,
        evaporator,
        conditions,
      ).catch((e: unknown) => {
        setAnalysisError("optimization", String(e));
        return null;
      });
      if (optResult) setAnalysisResult("optimization", optResult);

      setAnalysisLoading("ai", true);
      const aiResult = await computeAIAnalysis(
        compressor,
        condenser,
        evaporator,
        conditions,
        phResult,
        mcResult,
        optResult,
      ).catch((e: unknown) => {
        setAnalysisError("ai", String(e));
        return null;
      });
      if (aiResult) setAnalysisResult("ai", aiResult);

      setRan(true);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Resumo da configuração */}
      <Card>
        <CardContent className="py-3">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-medium text-slate-700">Configuração do sistema:</span>
            {dp && (
              <>
                <Badge variant="outline">{step1.compressorModel || step1.refrigerant}</Badge>
                <span className="text-slate-500">
                  Q = {(dp.capacity_w / 1000).toFixed(2)} kW · COP = {dp.cop.toFixed(2)}
                </span>
                <span className="text-slate-500">
                  Te = {dp.te_c}°C · Tc = {dp.tc_c}°C
                </span>
              </>
            )}
            {step2.result && (
              <Badge
                variant={step2.result.status === "ok" ? "default" : "destructive"}
                className="text-[10px]"
              >
                Evap: {step2.result.status === "ok" ? "OK" : "Subdim."}
              </Badge>
            )}
            {step3.result && (
              <Badge
                variant={step3.result.status === "ok" ? "default" : "destructive"}
                className="text-[10px]"
              >
                Cond: {step3.result.status === "ok" ? "OK" : "Subdim."}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Régua de capacidade e Catálogo Comercial — disponíveis assim que os coeficientes estão carregados */}
      {hasCoeffs && (
        <Tabs defaultValue="regua" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="regua" className="gap-1.5 text-xs">
              <Table2 className="h-3 w-3" /> Régua de Capacidade
            </TabsTrigger>
            <TabsTrigger value="catalogo" className="gap-1.5 text-xs">
              <BookOpen className="h-3 w-3" /> Catálogo Comercial
            </TabsTrigger>
          </TabsList>

          {/* Tab: Régua de Capacidade */}
          <TabsContent value="regua" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  Régua de Capacidade — {step1.refrigerant}
                </CardTitle>
                <p className="text-xs text-slate-500">
                  Capacidade do compressor por temperatura de evaporação (EN 12900 / ARI 540)
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="border-b bg-slate-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-slate-600">Te (°C)</th>
                        <th className="px-3 py-2 text-right font-medium text-slate-600">
                          Tc = {designTc - 10}°C — Q (kW)
                        </th>
                        <th className="px-3 py-2 text-right font-medium text-slate-600">
                          Tc = {designTc - 5}°C — Q (kW)
                        </th>
                        <th className="px-3 py-2 text-right font-medium text-indigo-700">
                          Tc = {designTc}°C — Q (kW)
                        </th>
                        <th className="px-3 py-2 text-right font-medium text-slate-600">
                          COP @ Tc {designTc}°C
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {reguaRows.high.map((row, i) => {
                        const lowRow = reguaRows.low[i] ?? null;
                        const midRow = reguaRows.mid[i] ?? null;
                        const isDesign = dp && Math.abs(row.te_c - dp.te_c) < 2.5;
                        return (
                          <tr
                            key={row.te_c}
                            className={isDesign ? "bg-indigo-50 font-medium" : "hover:bg-slate-50"}
                          >
                            <td className="px-3 py-1.5 text-slate-700">
                              {row.te_c}°C
                              {isDesign && (
                                <Badge className="ml-1 text-[9px] px-1 py-0" variant="secondary">
                                  projeto
                                </Badge>
                              )}
                            </td>
                            <td className="px-3 py-1.5 text-right text-slate-600">
                              {lowRow ? lowRow.q_kw.toFixed(2) : "—"}
                            </td>
                            <td className="px-3 py-1.5 text-right text-slate-600">
                              {midRow ? midRow.q_kw.toFixed(2) : "—"}
                            </td>
                            <td className="px-3 py-1.5 text-right font-medium text-indigo-700">
                              {row.q_kw.toFixed(2)}
                            </td>
                            <td className="px-3 py-1.5 text-right text-slate-600">
                              {row.cop.toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {reguaRows.high.length === 0 && (
                    <p className="py-8 text-center text-xs text-slate-400">
                      Nenhum ponto válido — verifique os coeficientes EN 12900.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Catálogo Comercial */}
          <TabsContent value="catalogo" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm">Catálogo Comercial — {step1.refrigerant}</CardTitle>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Capacidade nominal por temperatura de evaporação e temperatura ambiente
                    </p>
                  </div>
                  <Select value={selectedTAmb} onValueChange={setSelectedTAmb}>
                    <SelectTrigger className="h-8 w-32 text-xs">
                      <SelectValue placeholder="T amb." />
                    </SelectTrigger>
                    <SelectContent>
                      {T_AMB_LIST.map((t) => (
                        <SelectItem key={t} value={String(t)} className="text-xs">
                          T_amb = {t}°C (Tc ≈ {t + 10}°C)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {selectedTable && selectedTable.rows.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="border-b bg-slate-50">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium text-slate-600">Te (°C)</th>
                          <th className="px-3 py-2 text-right font-medium text-slate-600">Q (kW)</th>
                          <th className="px-3 py-2 text-right font-medium text-slate-600">Q (kcal/h)</th>
                          <th className="px-3 py-2 text-right font-medium text-slate-600">W comp. (kW)</th>
                          <th className="px-3 py-2 text-right font-medium text-slate-600">COP</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {selectedTable.rows.map((row) => {
                          const isDesign =
                            dp &&
                            Math.abs(row.te_c - dp.te_c) < 2.5 &&
                            Math.abs(selectedTable.tc_c - dp.tc_c) < 7;
                          return (
                            <tr
                              key={row.te_c}
                              className={isDesign ? "bg-indigo-50 font-medium" : "hover:bg-slate-50"}
                            >
                              <td className="px-3 py-1.5 text-slate-700">
                                {row.te_c}°C
                                {isDesign && (
                                  <Badge className="ml-1 text-[9px] px-1 py-0" variant="secondary">
                                    projeto
                                  </Badge>
                                )}
                              </td>
                              <td className="px-3 py-1.5 text-right font-medium text-slate-800">
                                {row.q_kw.toFixed(2)}
                              </td>
                              <td className="px-3 py-1.5 text-right text-slate-600">
                                {row.q_kcalh.toLocaleString("pt-BR")}
                              </td>
                              <td className="px-3 py-1.5 text-right text-slate-600">
                                {row.w_comp_kw.toFixed(2)}
                              </td>
                              <td className="px-3 py-1.5 text-right text-slate-600">
                                {row.cop.toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="py-8 text-center text-xs text-slate-400">
                    Nenhum ponto válido para T_amb = {selectedTAmb}°C.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Botão rodar simulação */}
      <Button
        onClick={handleRunAll}
        disabled={running || !dp}
        className="w-full gap-2"
        size="lg"
      >
        {running ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Play className="h-5 w-5" />
        )}
        {running ? "Simulando…" : "Rodar Simulação Completa"}
      </Button>

      {/* Abas de simulação */}
      {(ran || hub.ph.result) && (
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="summary" className="gap-1 text-xs">
              <BarChart2 className="h-3 w-3" /> Resumo
            </TabsTrigger>
            <TabsTrigger value="ph" className="gap-1 text-xs">
              <Zap className="h-3 w-3" /> P-h
            </TabsTrigger>
            <TabsTrigger value="montecarlo" className="gap-1 text-xs">
              <BarChart2 className="h-3 w-3" /> Monte Carlo
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-1 text-xs">
              <Brain className="h-3 w-3" /> IA
            </TabsTrigger>
            <TabsTrigger value="report" className="gap-1 text-xs">
              <FileText className="h-3 w-3" /> Laudo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="mt-4">
            <ExecutiveSummaryTabContent machine={null} onNavigate={() => {}} />
          </TabsContent>

          <TabsContent value="ph" className="mt-4">
            <PhDiagramTabContent
              result={hub.ph.result ?? null}
              loading={hub.ph.loading}
              error={hub.ph.error}
            />
          </TabsContent>

          <TabsContent value="montecarlo" className="mt-4">
            <MonteCarloTabContent
              result={hub.montecarlo.result ?? null}
              loading={hub.montecarlo.loading}
              error={hub.montecarlo.error}
            />
          </TabsContent>

          <TabsContent value="ai" className="mt-4">
            <AIAnalysisTabContent />
          </TabsContent>

          <TabsContent value="report" className="mt-4">
            <TechnicalReportTabContent machine={null} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
