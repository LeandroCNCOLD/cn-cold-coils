import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CatalogEquipmentRow } from "../data/equipmentCatalog.types";
import type { ProgressiveCoilInput } from "@/modules/coldpro_v2";

/**
 * Evaporador customizado montado a partir do workspace CN Coils.
 * Tem prioridade sobre o evaporador selecionado no catálogo quando presente,
 * pois vem de um dimensionamento completo com geometria real.
 */
export interface CustomEvaporatorInput {
  progressive_input: ProgressiveCoilInput;
  /** Label exibido na Simulation page (ex: "Dimensionado em CN Coils"). */
  label: string;
}

interface CatalogSessionState {
  selectedCompressor?: CatalogEquipmentRow;
  selectedCondenser?: CatalogEquipmentRow;
  selectedEvaporator?: CatalogEquipmentRow;
  selectedReheatCoil?: CatalogEquipmentRow;
  /** Evaporador proveniente do workspace CN Coils (sobrescreve catálogo). */
  customEvaporatorInput?: CustomEvaporatorInput;

  setCompressor: (item: CatalogEquipmentRow | undefined) => void;
  setCondenser: (item: CatalogEquipmentRow | undefined) => void;
  setEvaporator: (item: CatalogEquipmentRow | undefined) => void;
  setReheatCoil: (item: CatalogEquipmentRow | undefined) => void;
  setCustomEvaporatorInput: (ev: CustomEvaporatorInput | undefined) => void;
  clearSelection: () => void;
}

export const useCatalogSessionStore = create<CatalogSessionState>()(
  persist(
    (set) => ({
      selectedCompressor: undefined,
      selectedCondenser: undefined,
      selectedEvaporator: undefined,
      selectedReheatCoil: undefined,
      customEvaporatorInput: undefined,
      setCompressor: (item) => set({ selectedCompressor: item }),
      setCondenser: (item) => set({ selectedCondenser: item }),
      setEvaporator: (item) => set({ selectedEvaporator: item }),
      setReheatCoil: (item) => set({ selectedReheatCoil: item }),
      setCustomEvaporatorInput: (ev) => set({ customEvaporatorInput: ev }),
      clearSelection: () =>
        set({
          selectedCompressor: undefined,
          selectedCondenser: undefined,
          selectedEvaporator: undefined,
          selectedReheatCoil: undefined,
          customEvaporatorInput: undefined,
        }),
    }),
    { name: "coldpro-catalog-session" },
  ),
);
