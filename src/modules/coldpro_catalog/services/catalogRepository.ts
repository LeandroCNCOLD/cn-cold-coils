import { useCatalogDataStore } from "../store/useCatalogDataStore";
import type { CatalogEquipmentRow, EquipmentFamily } from "../data/equipmentCatalog.types";

function rows(): CatalogEquipmentRow[] {
  return useCatalogDataStore.getState().rows;
}

export const catalogRepository = {
  list(): CatalogEquipmentRow[] {
    return rows();
  },
  getById(id: string): CatalogEquipmentRow | undefined {
    return rows().find((item) => item.id === id);
  },
  getByModel(modeloUnico: string): CatalogEquipmentRow | undefined {
    return rows().find((item) => item.modeloUnico === modeloUnico);
  },
  listByFamily(family: EquipmentFamily): CatalogEquipmentRow[] {
    return rows().filter((item) => item.family === family);
  },
};
