import type { AirVelocityCorrectionItem } from "@/modules/cn_coils/types/cncoils.types";
import { applyAirVelocityCorrection } from "@/modules/cn_coils/engine/cncoilsCorrections";
import coilCorrectionData from "@/../public/data/catalogs/coilCorrectionCoefficients.json";

// JSON has a `serie` field not present in the TypeScript type
type AirVelocityCorrectionItemWithSerie = AirVelocityCorrectionItem & { serie?: string };

const CATALOG = coilCorrectionData as AirVelocityCorrectionItemWithSerie[];

export interface VelocityCorrectionResult {
  factor: number;
  serie_used: string | null;
  v_used_ms: number;
  warning?: string;
}

/**
 * Aplica correção polinomial UNILAB/VapCyc para velocidade frontal.
 *
 * Filtra entradas pelo campo `serie` se fornecido; caso contrário usa a primeira
 * entrada disponível. Delega avaliação do polinômio a `applyAirVelocityCorrection`.
 *
 * ATENÇÃO: não chamar quando C_rich está ativo — dupla correção causa erro ~4.4%.
 */
export function applyUnilabVelocityCorrection(
  airVelocity_ms: number,
  serie?: string,
): VelocityCorrectionResult {
  let entries: AirVelocityCorrectionItemWithSerie[];

  if (serie) {
    entries = CATALOG.filter((e) => e.serie === serie);
  } else {
    entries = CATALOG;
  }

  if (entries.length === 0) {
    return {
      factor: 1.0,
      serie_used: null,
      v_used_ms: airVelocity_ms,
      warning: serie
        ? `Série UNILAB "${serie}" não encontrada no catálogo. Fator neutro aplicado.`
        : "Catálogo UNILAB vazio. Fator neutro aplicado.",
    };
  }

  const serieUsed = entries[0].serie ?? null;

  // applyAirVelocityCorrection espera geometryId e filtra por ele;
  // como todas as entradas têm geometryId="1", passamos o geometryId do primeiro entry
  const geometryId = entries[0].geometryId;
  const { factor, warnings, vUsedMs } = applyAirVelocityCorrection(
    geometryId,
    airVelocity_ms,
    entries,
  );

  return {
    factor,
    serie_used: serieUsed,
    v_used_ms: vUsedMs,
    warning: warnings.length > 0 ? warnings.join("; ") : undefined,
  };
}
