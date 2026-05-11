import { create } from "zustand";
import type {
  AppEngineeringStep1,
  AppEngineeringStep2,
  AppEngineeringStep3,
  CapacityCurvePoint,
} from "../types/app-engineering.types";

interface AppEngineeringState {
  currentStep: 1 | 2 | 3 | 4;
  step1: AppEngineeringStep1;
  step2: AppEngineeringStep2;
  step3: AppEngineeringStep3;
  /** Sweep Te×Tc calculado no CompressorPanel — compartilhado com Evap/Cond. */
  compressorSweep: CapacityCurvePoint[];
  setCompressorSweep: (pts: CapacityCurvePoint[]) => void;
  setStep: (step: 1 | 2 | 3 | 4) => void;
  updateStep1: (v: Partial<AppEngineeringStep1>) => void;
  updateStep2: (v: Partial<AppEngineeringStep2>) => void;
  updateStep3: (v: Partial<AppEngineeringStep3>) => void;
  reset: () => void;
}

const defaultStep1: AppEngineeringStep1 = {
  refrigerant: "R404A",
  compressorModel: "",
  capCoeffs: [],
  pwrCoeffs: [],
  designPoint: null,
  completed: false,
};

const defaultStep2: AppEngineeringStep2 = {
  geometry: null,
  fan: null,
  fanCount: 2,
  finSpacingMm: 7,
  rows: 3,
  tubesPerRow: 12,
  lengthMm: 1200,
  airInletTempC: -23,
  airRhIn: 0.85,
  result: null,
  completed: false,
};

const defaultStep3: AppEngineeringStep3 = {
  geometry: null,
  fan: null,
  fanCount: 2,
  finSpacingMm: 6,
  rows: 2,
  tubesPerRow: 16,
  lengthMm: 1500,
  airInletTempC: 32,
  result: null,
  completed: false,
};

export const useAppEngineeringStore = create<AppEngineeringState>((set) => ({
  currentStep: 1,
  step1: defaultStep1,
  step2: defaultStep2,
  step3: defaultStep3,
  setStep: (step) => set({ currentStep: step }),
  updateStep1: (v) => set((s) => ({ step1: { ...s.step1, ...v } })),
  updateStep2: (v) => set((s) => ({ step2: { ...s.step2, ...v } })),
  updateStep3: (v) => set((s) => ({ step3: { ...s.step3, ...v } })),
  reset: () =>
    set({ currentStep: 1, step1: defaultStep1, step2: defaultStep2, step3: defaultStep3 }),
}));
