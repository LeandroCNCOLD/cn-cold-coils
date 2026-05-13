/**
 * heatTransferCalculations.ts
 *
 * Barrel/adapter que reexpõe as funções de transferência de calor dos engines
 * em `coldpro_v2/engines/*` com uma API uniforme baseada em objeto, usada
 * pelos serviços de busca/dimensionamento (ex.: coilNtuService).
 */
import {
  computeFinnedExternalArea,
} from "@/modules/coldpro_v2/engines/core/finnedExternalArea";
import {
  calculateFinEfficiencySimplified,
} from "@/modules/coldpro_v2/engines/core/finEfficiency";
import {
  calculateOverallU,
} from "@/modules/coldpro_v2/engines/core/overallHeatTransfer";
import {
  calculateNTU as calculateNTUPositional,
  calculateEffectivenessCrossflowUnmixed as calculateEpsilonPositional,
  calculateHeatTransferByNTU as calculateQbyNTUInternal,
} from "@/modules/coldpro_v2/engines/core/ntu";
import {
  calculateLMTD,
  calculateHeatTransferByLMTD,
} from "@/modules/coldpro_v2/engines/core/lmtd";
import {
  calculateAirProperties,
} from "@/modules/coldpro_v2/engines/airSide/airProperties";
import {
  calculateReynolds,
  calculateNusseltGnielinski,
  calculateConvectiveCoefficient,
} from "@/modules/coldpro_v2/engines/core/dimensionless";
import {
  calculateDarcyFrictionFactor,
} from "@/modules/coldpro_v2/engines/core/friction";

export {
  computeFinnedExternalArea,
  calculateFinEfficiencySimplified,
  calculateOverallU,
  calculateLMTD,
  calculateAirProperties,
  calculateReynolds,
  calculateNusseltGnielinski,
  calculateConvectiveCoefficient,
  calculateDarcyFrictionFactor,
};

/** NTU por interface object-style. */
export function calculateNTU(params: {
  u_w_m2k: number;
  area_m2: number;
  c_min_w_k: number;
}): number {
  return calculateNTUPositional(params.u_w_m2k, params.area_m2, params.c_min_w_k);
}

/** Efetividade crossflow unmixed (object-style + warnings). */
export function calculateEffectivenessCrossflowUnmixed(params: {
  ntu: number;
  c_ratio: number;
}): { effectiveness: number; warnings: string[] } {
  const warnings: string[] = [];
  const eff = calculateEpsilonPositional(params.ntu, params.c_ratio);
  if (!Number.isFinite(eff)) {
    warnings.push("Efetividade NaN — usando 0");
    return { effectiveness: 0, warnings };
  }
  return { effectiveness: eff, warnings };
}

/** Q via NTU-ε (object-style retornando number). */
export function calculateHeatTransferByNTU(params: {
  effectiveness: number;
  c_min_w_k: number;
  t_hot_in: number;
  t_cold_in: number;
}): number {
  const result = calculateQbyNTUInternal({
    effectiveness: params.effectiveness,
    Cmin: params.c_min_w_k,
    hotIn_c: params.t_hot_in,
    coldIn_c: params.t_cold_in,
  });
  return result.Q_w;
}

/** Q via LMTD (object-style retornando number). */
export { calculateHeatTransferByLMTD };
