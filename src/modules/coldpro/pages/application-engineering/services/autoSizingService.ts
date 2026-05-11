/**
 * autoSizingService.ts
 *
 * Varredura automática de configurações de serpentina para encontrar
 * a geometria mínima que atende a capacidade requerida do compressor.
 *
 * Estratégia:
 * 1. Fixa a geometria do catálogo (tubo, aleta, passo)
 * 2. Varia filas (1 → MAX_ROWS) e comprimento (step LENGTH_STEP_MM)
 * 3. Para na primeira configuração que atende Q_req × TOLERANCE
 * 4. Retorna configuração selecionada + lista de todos os candidatos testados
 */
import { sizeCoil } from "./coilSizingService";

const MAX_ROWS = 8;
const LENGTH_STEP_MM = 100;
const MIN_LENGTH_MM = 300;
const MAX_LENGTH_MM = 4000;
const TOLERANCE = 0.98;

export interface AutoSizingEvapInput {
  tubesPerRow: number;
  tubeOuterDiameterMm: number;
  startLengthMm: number;
  finPitchMm: number;
  totalAirflowM3H: number;
  requiredCapacityW: number;
  te_c: number;
  t_air_in_c: number;
}

export interface AutoSizingCondenserInput {
  tubesPerRow: number;
  tubeOuterDiameterMm: number;
  startLengthMm: number;
  finPitchMm: number;
  totalAirflowM3H: number;
  heatRejectionW: number;
  tc_c: number;
  t_ambient_c: number;
}

export interface AutoSizingCandidate {
  rows: number;
  lengthMm: number;
  capacityW: number;
  heatRejectionW: number;
  uOverallWm2K: number;
  dpAirPa: number;
  faceVelocityMs: number;
  meetsRequirement: boolean;
  warnings: string[];
}

export interface AutoSizingResult {
  selected: AutoSizingCandidate | null;
  candidates: AutoSizingCandidate[];
  requiredW: number;
  message: string;
}

export function autoSizeEvaporator(input: AutoSizingEvapInput): AutoSizingResult {
  const candidates: AutoSizingCandidate[] = [];

  for (let rows = 1; rows <= MAX_ROWS; rows++) {
    const startLen = Math.max(MIN_LENGTH_MM, input.startLengthMm);
    for (let len = startLen; len <= MAX_LENGTH_MM; len += LENGTH_STEP_MM) {
      const result = sizeCoil({
        required_capacity_w: input.requiredCapacityW,
        fluid_inlet_temp_c: input.te_c,
        air_inlet_temp_c: input.t_air_in_c,
        airflow_m3h: input.totalAirflowM3H,
        coil_type: "evaporator",
        geometry: {
          rows,
          tubes_per_row: input.tubesPerRow,
          fin_spacing_mm: input.finPitchMm,
          length_mm: len,
          tube_diameter_mm: input.tubeOuterDiameterMm,
        },
      });

      const meets = result.capacity_w >= input.requiredCapacityW * TOLERANCE;
      const candidate: AutoSizingCandidate = {
        rows,
        lengthMm: len,
        capacityW: result.capacity_w,
        heatRejectionW: 0,
        uOverallWm2K: result.u_w_m2k,
        dpAirPa: result.air_pressure_drop_pa,
        faceVelocityMs: result.fluid_velocity_ms,
        meetsRequirement: meets,
        warnings: result.warnings,
      };
      candidates.push(candidate);

      if (meets) {
        return {
          selected: candidate,
          candidates,
          requiredW: input.requiredCapacityW,
          message: `Evaporador dimensionado: ${rows} fila(s) × ${len} mm — Q=${(result.capacity_w / 1000).toFixed(2)} kW`,
        };
      }
    }
  }

  return {
    selected: null,
    candidates,
    requiredW: input.requiredCapacityW,
    message:
      "Nenhuma configuração encontrada. Selecione uma geometria maior ou aumente o comprimento máximo.",
  };
}

export function autoSizeCondenser(input: AutoSizingCondenserInput): AutoSizingResult {
  const candidates: AutoSizingCandidate[] = [];

  for (let rows = 1; rows <= MAX_ROWS; rows++) {
    const startLen = Math.max(MIN_LENGTH_MM, input.startLengthMm);
    for (let len = startLen; len <= MAX_LENGTH_MM; len += LENGTH_STEP_MM) {
      const result = sizeCoil({
        required_capacity_w: input.heatRejectionW,
        fluid_inlet_temp_c: input.tc_c,
        air_inlet_temp_c: input.t_ambient_c,
        airflow_m3h: input.totalAirflowM3H,
        coil_type: "condenser",
        geometry: {
          rows,
          tubes_per_row: input.tubesPerRow,
          fin_spacing_mm: input.finPitchMm,
          length_mm: len,
          tube_diameter_mm: input.tubeOuterDiameterMm,
        },
      });

      const meets = result.capacity_w >= input.heatRejectionW * TOLERANCE;
      const candidate: AutoSizingCandidate = {
        rows,
        lengthMm: len,
        capacityW: 0,
        heatRejectionW: result.capacity_w,
        uOverallWm2K: result.u_w_m2k,
        dpAirPa: result.air_pressure_drop_pa,
        faceVelocityMs: result.fluid_velocity_ms,
        meetsRequirement: meets,
        warnings: result.warnings,
      };
      candidates.push(candidate);

      if (meets) {
        return {
          selected: candidate,
          candidates,
          requiredW: input.heatRejectionW,
          message: `Condensador dimensionado: ${rows} fila(s) × ${len} mm — Q_rej=${(result.capacity_w / 1000).toFixed(2)} kW`,
        };
      }
    }
  }

  return {
    selected: null,
    candidates,
    requiredW: input.heatRejectionW,
    message:
      "Nenhuma configuração encontrada. Selecione uma geometria maior ou aumente o comprimento máximo.",
  };
}
