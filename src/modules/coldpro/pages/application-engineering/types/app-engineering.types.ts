import type { CoilGeometryCatalogItem } from "@/modules/cn_coils/types/cncoils.types";
import type { FanPickerItem } from "@/modules/cn_coils/components/FanPickerModal";

export interface CapacityCurvePoint {
  te_c: number;
  tc_c: number;
  capacity_w: number;
  power_w: number;
  cop: number;
}

export interface EvaporatorDimensioningResult {
  q_evap_w: number;
  delta_t_k: number;
  u_w_m2k: number;
  fin_efficiency: number;
  air_pressure_drop_pa: number;
  status: "ok" | "undersized";
  message: string;
  /** Cobertura ponto a ponto do sweep do compressor (quando fornecido) */
  sweepCoverage?: import("../services/evaporatorSearchService").CoveragePoint[];
  sweepPointsCovered?: number;
  sweepTotalPoints?: number;
}

export interface CondenserDimensioningResult {
  q_cond_w: number;
  delta_t_k: number;
  u_w_m2k: number;
  fin_efficiency: number;
  air_pressure_drop_pa: number;
  status: "ok" | "undersized";
  message: string;
  /** Cobertura ponto a ponto do sweep do compressor (quando fornecido) */
  sweepCoverage?: import("../services/evaporatorSearchService").CoveragePoint[];
  sweepPointsCovered?: number;
  sweepTotalPoints?: number;
}

export interface AppEngineeringStep1 {
  refrigerant: string;
  compressorModel: string;
  capCoeffs: number[];
  pwrCoeffs: number[];
  designPoint: CapacityCurvePoint | null;
  /** Todos os pontos da grade Te×Tc do compressor para varredura de cobertura */
  compressorSweep?: CapacityCurvePoint[] | null;
  completed: boolean;
}

export interface AppEngineeringStep2 {
  geometry: CoilGeometryCatalogItem | null;
  fan: FanPickerItem | null;
  fanCount: number;
  finSpacingMm: number;
  rows: number;
  tubesPerRow: number;
  lengthMm: number;
  airInletTempC: number;
  airRhIn: number;
  result: EvaporatorDimensioningResult | null;
  completed: boolean;
}

export interface AppEngineeringStep3 {
  geometry: CoilGeometryCatalogItem | null;
  fan: FanPickerItem | null;
  fanCount: number;
  finSpacingMm: number;
  rows: number;
  tubesPerRow: number;
  lengthMm: number;
  airInletTempC: number;
  result: CondenserDimensioningResult | null;
  completed: boolean;
}
