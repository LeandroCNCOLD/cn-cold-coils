import { create } from "zustand";
import type {
  ApplicationEngineeringState,
  OperatingPointInput,
  CompressorPerformanceInput,
  CoilSizingInput,
} from "../types";
import { resolveOperatingPoint } from "../services/operatingPointService";
import { evaluateCompressorPerformance } from "../services/compressorPerformanceService";
import { sizeCoil } from "../services/coilSizingService";
import { validateSystem } from "../services/applicationValidationService";

interface ApplicationEngineeringActions {
  setOperatingPointInput: (input: OperatingPointInput) => void;
  setCompressorInput: (input: Partial<CompressorPerformanceInput>) => void;
  setEvaporatorInput: (input: Partial<CoilSizingInput>) => void;
  setCondenserInput: (input: Partial<CoilSizingInput>) => void;
  setActiveTab: (tab: ApplicationEngineeringState["activeTab"]) => void;
  runCalculation: () => void;
  reset: () => void;
}

const initialState: ApplicationEngineeringState = {
  operatingPointInput: { mode: "B", room_temp_c: 2, ambient_temp_c: 35 },
  operatingPointResult: null,
  compressorInput: {},
  compressorResult: null,
  evaporatorInput: {
    coil_type: "evaporator",
    airflow_m3h: 3000,
    air_inlet_temp_c: 5,
  },
  evaporatorResult: null,
  condenserInput: {
    coil_type: "condenser",
    airflow_m3h: 5000,
    air_inlet_temp_c: 35,
  },
  condenserResult: null,
  evaporatorFanResult: null,
  condenserFanResult: null,
  validationResult: null,
  activeTab: "compressor",
  isCalculating: false,
};

export const useApplicationEngineering = create<
  ApplicationEngineeringState & ApplicationEngineeringActions
>((set, get) => ({
  ...initialState,

  setOperatingPointInput: (input) => set({ operatingPointInput: input }),

  setCompressorInput: (input) =>
    set((s) => ({ compressorInput: { ...s.compressorInput, ...input } })),

  setEvaporatorInput: (input) =>
    set((s) => ({ evaporatorInput: { ...s.evaporatorInput, ...input } })),

  setCondenserInput: (input) =>
    set((s) => ({ condenserInput: { ...s.condenserInput, ...input } })),

  setActiveTab: (tab) => set({ activeTab: tab }),

  runCalculation: () => {
    const state = get();
    set({ isCalculating: true });

    try {
      // 1. Ponto de operação
      const opResult = resolveOperatingPoint(state.operatingPointInput);
      set({ operatingPointResult: opResult });

      // 2. Compressor (se coeficientes disponíveis)
      let compressorResult = state.compressorResult;
      const ci = state.compressorInput;
      if (
        ci.capacity_coefficients &&
        ci.capacity_coefficients.length >= 10 &&
        ci.power_coefficients &&
        ci.power_coefficients.length >= 10
      ) {
        compressorResult = evaluateCompressorPerformance({
          capacity_coefficients: ci.capacity_coefficients,
          power_coefficients: ci.power_coefficients,
          evap_temp_c: opResult.evap_temp_c,
          cond_temp_c: opResult.cond_temp_c,
        });
        set({ compressorResult });
      }

      // 3. Evaporador
      const evapInput = state.evaporatorInput;
      let evaporatorResult = state.evaporatorResult;
      if (evapInput.required_capacity_w && evapInput.airflow_m3h) {
        evaporatorResult = sizeCoil({
          required_capacity_w: evapInput.required_capacity_w,
          fluid_inlet_temp_c: evapInput.fluid_inlet_temp_c ?? opResult.evap_temp_c,
          air_inlet_temp_c: evapInput.air_inlet_temp_c ?? 5,
          airflow_m3h: evapInput.airflow_m3h,
          coil_type: "evaporator",
          geometry: evapInput.geometry,
        });
        set({ evaporatorResult });
      }

      // 4. Condensador
      const condInput = state.condenserInput;
      let condenserResult = state.condenserResult;
      if (condInput.required_capacity_w && condInput.airflow_m3h) {
        condenserResult = sizeCoil({
          required_capacity_w: condInput.required_capacity_w,
          fluid_inlet_temp_c: condInput.fluid_inlet_temp_c ?? opResult.cond_temp_c,
          air_inlet_temp_c: condInput.air_inlet_temp_c ?? 35,
          airflow_m3h: condInput.airflow_m3h,
          coil_type: "condenser",
          geometry: condInput.geometry,
        });
        set({ condenserResult });
      }

      // 5. Validação do sistema
      if (compressorResult && evaporatorResult && condenserResult) {
        const validationResult = validateSystem({
          compressor_capacity_w: compressorResult.capacity_w,
          compressor_power_w: compressorResult.power_w,
          evaporator_capacity_w: evaporatorResult.capacity_w,
          condenser_capacity_w: condenserResult.capacity_w,
        });
        set({ validationResult });
      }
    } catch (e) {
      console.error("[ApplicationEngineering] Erro no cálculo:", e);
    } finally {
      set({ isCalculating: false });
    }
  },

  reset: () => set({ ...initialState }),
}));
