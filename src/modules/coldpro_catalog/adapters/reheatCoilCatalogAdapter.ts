import type { CatalogEquipmentRow } from "../data/equipmentCatalog.types";
import type { ReheatCoilSizingInput } from "@/modules/coldpro_v2";
import { computeBlockCompleteness } from "../services/blockCompletenessService";

export interface ReheatAdapterResult {
  input: ReheatCoilSizingInput | null;
  warnings: string[];
}

/**
 * Parseia string de geometria "PT x PL" (ex: "27 x 31,5") em metros.
 * Retorna null se a string não tiver o formato esperado.
 */
function parseGeometryMm(geometria: string | undefined): { pt_m: number; pl_m: number } | null {
  if (!geometria) return null;
  const match = geometria.match(/(\d+(?:[.,]\d+)?)\s*x\s*(\d+(?:[.,]\d+)?)/);
  if (!match) return null;
  return {
    pt_m: parseFloat(match[1].replace(",", ".")) / 1000,
    pl_m: parseFloat(match[2].replace(",", ".")) / 1000,
  };
}

/**
 * Converte CatalogEquipmentRow em ReheatCoilSizingInput.
 * Só converte quando o bloco "reheat" estiver 100% completo
 * (segundo computeBlockCompleteness).
 *
 * Campos geométricos derivados (não presentes no raw data):
 *  - tube_outer_diameter_m: derivado do evaporador (mesma geometria)
 *  - tube_thickness_m: derivado do evaporador ou default 0.3 mm
 *  - fin_thickness_m: default 0.1 mm (aleta de alumínio padrão)
 *  - tube_pitch_*_m: parseado de reheatGeometria "PT x PL"
 */
export function catalogToReheatCoilInput(row: CatalogEquipmentRow): ReheatAdapterResult {
  const warnings: string[] = [];
  const status = computeBlockCompleteness(row);

  if (!status.reheatCompleto) {
    warnings.push(
      `Reaquecimento (aletado) incompleto — campos faltantes: ${status.byBlock.reheat.missing.join(", ")}.`,
    );
    return { input: null, warnings };
  }

  // Geometria do tubo: preferir campos específicos do reheat; fallback para evaporador (mesma geometria)
  const tubeOdM =
    row.reheatTubeOuterDiameterM ??
    (row.evaporadorTuboDiametroMm != null ? row.evaporadorTuboDiametroMm / 1000 : 0.0127);

  const tubeThickM =
    row.reheatTubeThicknessM ??
    (row.evaporadorTuboEspessuraMm != null ? row.evaporadorTuboEspessuraMm / 1000 : 0.0003);

  const finThickM = row.reheatFinThicknessM ?? 0.0001;

  // Passo de tubo: preferir campos específicos; fallback para parsear reheatGeometria
  const geo = parseGeometryMm(row.reheatGeometria ?? row.evaporadorGeometria);
  const pitchTransM =
    row.reheatTubePitchTransversalM ??
    geo?.pt_m ??
    (tubeOdM * 2.1);
  const pitchLongM =
    row.reheatTubePitchLongitudinalM ??
    geo?.pl_m ??
    (tubeOdM * 2.5);

  if (!row.reheatTubePitchTransversalM && geo) {
    warnings.push(
      `Reaquecimento: passo de tubo derivado da geometria "${row.reheatGeometria ?? row.evaporadorGeometria}".`,
    );
  }
  if (!row.reheatTubeOuterDiameterM && row.evaporadorTuboDiametroMm != null) {
    warnings.push(
      `Reaquecimento: diâmetro externo do tubo derivado do evaporador (${row.evaporadorTuboDiametroMm} mm).`,
    );
  }

  const input: ReheatCoilSizingInput = {
    Q_reheat_target_w: row.reheatQTargetW!,
    T_air_in_c: row.reheatTAirInC!,
    T_air_out_c: row.reheatTAirOutC!,
    air_mass_flow_kg_s: row.reheatAirMassFlowKgS!,
    T_condensing_c: row.reheatTCondensingC!,
    T_hot_gas_in_c: row.reheatTHotGasInC!,
    refrigerant: row.refrigerante === "unknown" ? undefined : row.refrigerante,
    tube_outer_diameter_m: tubeOdM,
    tube_thickness_m: tubeThickM,
    tube_material: row.reheatTubeMaterial ?? "copper",
    fin_spacing_m: row.reheatFinSpacingMm! / 1000,
    fin_thickness_m: finThickM,
    fin_material: (row.reheatFinMaterial !== "steel" ? row.reheatFinMaterial : undefined) ?? "aluminum",
    tube_pitch_transversal_m: pitchTransM,
    tube_pitch_longitudinal_m: pitchLongM,
    coil_length_m: row.reheatCoilLengthMm! / 1000,
    circuits: row.reheatCircuits!,
  };

  return { input, warnings };
}
