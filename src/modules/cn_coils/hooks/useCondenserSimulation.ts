import { useCallback, useEffect, useMemo, useState } from "react";
import {
  runSimulationV2,
  SimulationV2Error,
  type SimulationV2Result,
} from "../engine_v2/simulatorCoreV2";
import { getRefrigerantLiquidProps } from "../engine_v2/refrigerantProps";
import type {
  CnCoilsPhysicalInputs,
  CnCoilsThermoInputs,
  CoilGeometryCatalogItem,
  TubeMaterialItem,
} from "../types/cncoils.types";

export interface CondenserInputs {
  Tc: number;
  Tair_in: number;
  geometryId: string;
  refrigerant: string;
  subcooling: number;
  fanCount: number;
  fanId: string;
  airFlowM3H?: number;
  rows?: number;
  circuits?: number;
  finnedHeightMm?: number;
  finnedLengthMm?: number;
  tubeMaterialId?: string;
  finPitchMm?: number;
  finThicknessMm?: number;
  fluidMassFlowKgH?: number;
}

export interface CondenserResult {
  Q_cond_W: number;
  Q_cond_kcalh: number;
  UA: number;
  LMTD: number;
  Tair_out: number;
  deltaP_Pa: number;
  airflow_m3h: number;
  regime: "superheated" | "two-phase" | "subcooled";
  raw: SimulationV2Result;
}

interface UseCondenserSimulationOptions {
  inputs: CondenserInputs;
  geometries: CoilGeometryCatalogItem[];
  tubeMaterials: TubeMaterialItem[];
}

const DEFAULT_AIRFLOW_M3H = 8000;
// DEFAULT_FLUID_MASS_KGH removido — vazão mássica agora é estimada
// iterativamente a partir de Q_cond (ṁ = Q / h_fg), igual ao evaporador.

function toFluidId(refrigerant: string): string {
  return refrigerant.startsWith("REF_") ? refrigerant : `REF_${refrigerant}`;
}

function formatErrors(err: unknown): string {
  if (err instanceof SimulationV2Error) return err.errors.join(" • ");
  return err instanceof Error ? err.message : String(err);
}

function calculateLmtd(hotInC: number, hotOutC: number, coldInC: number): number {
  const dT1 = Math.max(0.1, hotInC - coldInC);
  const dT2 = Math.max(0.1, hotOutC - coldInC);
  if (Math.abs(dT1 - dT2) < 1e-6) return dT1;
  return (dT1 - dT2) / Math.log(dT1 / dT2);
}

export function calculateCondenserResult(
  inputs: CondenserInputs,
  geometries: CoilGeometryCatalogItem[],
  tubeMaterials: TubeMaterialItem[],
): CondenserResult {
  const geometry = geometries.find((item) => item.id === inputs.geometryId) ?? geometries[0];
  const tubeMaterial =
    tubeMaterials.find((item) => item.id === inputs.tubeMaterialId) ?? tubeMaterials[0];
  if (!geometry) throw new SimulationV2Error("Geometria não selecionada.", ["Geometria não selecionada."]);
  if (!tubeMaterial) throw new SimulationV2Error("Material do tubo ausente.", ["Material do tubo ausente."]);

  const physical: CnCoilsPhysicalInputs = {
    componentType: "condenser_air",
    geometryId: geometry.id,
    finnedHeightMm: inputs.finnedHeightMm ?? 600,
    finnedLengthMm: inputs.finnedLengthMm ?? 1200,
    tubesPerRow:
      geometry.tubePitchTransverseMm > 0
        ? Math.max(1, Math.round((inputs.finnedHeightMm ?? 600) / geometry.tubePitchTransverseMm))
        : 16,
    rows: inputs.rows ?? geometry.defaultRows ?? 4,
    circuits: inputs.circuits ?? geometry.defaultCircuits ?? 4,
    tubeMaterialId: tubeMaterial.id,
    finPitchMm: inputs.finPitchMm ?? 2.5,
    finThicknessMm: inputs.finThicknessMm ?? 0.12,
    tubePitchTransverseMm: geometry.tubePitchTransverseMm,
    tubePitchLongitudinalMm: geometry.tubePitchLongitudinalMm,
    tubeOuterDiameterMm: geometry.tubeOuterDiameterMm,
    tubeInnerDiameterMm: geometry.tubeInnerDiameterMm ?? Math.max(1, geometry.tubeOuterDiameterMm - 0.6),
  };
  const thermo: CnCoilsThermoInputs = {
    refrigerantId: toFluidId(inputs.refrigerant),
    airFlowM3H: inputs.airFlowM3H ?? DEFAULT_AIRFLOW_M3H,
    airInletTempC: inputs.Tair_in,
    airInletRhPercent: 50,
    altitudeM: 0,
    condensingTempC: inputs.Tc,
    subcoolingK: inputs.subcooling,
  };
  const fluidData = getRefrigerantLiquidProps(thermo.refrigerantId, inputs.Tc);
  const geoRaw = geometry.raw as Record<string, unknown> | undefined;
  const finCorr = Number(geoRaw?.FatCorAl ?? geoRaw?.fin_correction_factor);

  // Estimativa iterativa da vazão mássica do refrigerante no condensador.
  //
  // O condensador não tem distribuidor — o refrigerante entra pelo coletor
  // de entrada (vapor superaquecido) e sai pelo coletor de saída (líquido
  // subresfriado). O NrCircuiti (UNILAB) divide a vazão total em ramificações
  // paralelas, exatamente como no evaporador DX.
  //
  // Se o usuário informar fluidMassFlowKgH, esse valor é usado diretamente.
  // Caso contrário, a vazão é estimada iterativamente:
  //   1ª iteração: ṁ = 0 → motor usa h_fluid_fallback = 35 W/(m²K)
  //   2ª iteração: ṁ = Q_1 / h_fg → Re e h_fluid reais
  //   3ª iteração: ṁ = Q_2 / h_fg → convergência típica em 2-3 iterações
  //
  // Fonte: ASHRAE Fundamentals 2017, Cap. 23 — método NTU-ε para condensadores.
  const h_fg_kJkg = fluidData.h_fg_kJkg;
  const finCorrFactor = Number.isFinite(finCorr) && finCorr > 0 ? finCorr : 1;
  const simParams = {
    physical,
    thermo,
    componentType: "condenser_air" as const,
    tubeMaterialConductivity: tubeMaterial.conductivityWmK,
    fluidProps: {
      rho_kg_m3: fluidData.rho_kg_m3,
      mu_Pa_s: fluidData.mu_Pa_s,
      cp_J_kgK: fluidData.cp_J_kgK,
      k_W_mK: fluidData.k_W_mK,
    },
    subcoolingK: inputs.subcooling,
    finCorrectionFactor: finCorrFactor,
    h_fg_kJkg,
  };

  let fluidMassFlowKgS: number;
  let raw: ReturnType<typeof runSimulationV2>;

  if (inputs.fluidMassFlowKgH && inputs.fluidMassFlowKgH > 0) {
    // Vazão mássica fornecida pelo usuário — usar diretamente.
    fluidMassFlowKgS = inputs.fluidMassFlowKgH / 3600;
    raw = runSimulationV2({ ...simParams, fluidMassFlowKgS });
  } else {
    // Iteração 1: ṁ = 0 → motor usa fallback h_fluid = 35 W/(m²K)
    const raw1 = runSimulationV2({ ...simParams, fluidMassFlowKgS: 0 });
    // Iteração 2: ṁ estimado a partir de Q_1
    const m2 = (raw1.totalCapacityKw * 1000) / Math.max(h_fg_kJkg * 1000, 1);
    const raw2 = runSimulationV2({ ...simParams, fluidMassFlowKgS: m2 });
    // Iteração 3: ṁ estimado a partir de Q_2 (convergência)
    const m3 = (raw2.totalCapacityKw * 1000) / Math.max(h_fg_kJkg * 1000, 1);
    raw = runSimulationV2({ ...simParams, fluidMassFlowKgS: m3 });
    fluidMassFlowKgS = m3;
  }
  void fluidMassFlowKgS; // usado implicitamente via raw
  const qCondW = raw.totalCapacityKw * 1000;
  const lmtd = raw.lmtdK ?? calculateLmtd(inputs.Tc, inputs.Tc - inputs.subcooling, inputs.Tair_in);
  const ua = lmtd > 0 ? qCondW / lmtd : 0;
  return {
    Q_cond_W: qCondW,
    Q_cond_kcalh: qCondW * 0.86,
    UA: ua,
    LMTD: lmtd,
    Tair_out: raw.airOutletTempC,
    deltaP_Pa: raw.airPressureDropPa,
    airflow_m3h: thermo.airFlowM3H,
    regime: inputs.subcooling > 0 ? "subcooled" : "two-phase",
    raw,
  };
}

export const calculateCondenserSnapshot = calculateCondenserResult;

export function useCondenserSimulation({
  inputs,
  geometries,
  tubeMaterials,
}: UseCondenserSimulationOptions) {
  const [result, setResult] = useState<CondenserResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canCalculate = geometries.length > 0 && tubeMaterials.length > 0;

  const calculate = useCallback(() => {
    if (!canCalculate) {
      setError("Catálogos ainda não carregados.");
      setResult(null);
      return null;
    }
    setIsCalculating(true);
    setError(null);
    try {
      const next = calculateCondenserResult(inputs, geometries, tubeMaterials);
      setResult(next);
      return next;
    } catch (err) {
      setResult(null);
      setError(formatErrors(err));
      return null;
    } finally {
      setIsCalculating(false);
    }
  }, [canCalculate, geometries, inputs, tubeMaterials]);

  const calculateSnapshotForInputs = useCallback(
    (nextInputs: CondenserInputs) => {
      if (!canCalculate) return null;
      try {
        return calculateCondenserResult(nextInputs, geometries, tubeMaterials);
      } catch {
        return null;
      }
    },
    [canCalculate, geometries, tubeMaterials],
  );

  useEffect(() => {
    calculate();
  }, [calculate]);

  return useMemo(
    () => ({
      result,
      isCalculating,
      error,
      calculate,
      calculateSnapshot: calculateSnapshotForInputs,
    }),
    [calculate, calculateSnapshotForInputs, error, isCalculating, result],
  );
}
