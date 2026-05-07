/**
 * workspaceReset.ts — Limpeza centralizada do workspace CN Coils.
 *
 * Garante que, após salvar/sair de um cálculo, nenhum dado do equipamento
 * anterior seja herdado pelo próximo cálculo. Limpa:
 * - useCnCoilsSimulationStore (inputs físicos, termo, resultado, ventilador, etc.)
 * - useProjectStore.activeProject
 * - localStorage `cncoils_last_inputs`
 */
import { useCnCoilsSimulationStore } from "../store/useCnCoilsSimulationStore";
import { useProjectStore } from "../store/useProjectStore";
import { clearLastInputs } from "./lastInputsPersistence";

export interface ResetOptions {
  /** Mantém o projeto ativo (ex.: usuário ainda quer continuar editando). */
  keepProject?: boolean;
}

export function resetCnCoilsWorkspace(opts: ResetOptions = {}): void {
  try {
    useCnCoilsSimulationStore.getState().reset();
  } catch (err) {
    console.warn("[cn_coils] reset simulation store falhou:", err);
  }
  if (!opts.keepProject) {
    try {
      useProjectStore.getState().setActiveProject(null);
    } catch (err) {
      console.warn("[cn_coils] reset project store falhou:", err);
    }
  }
  clearLastInputs();
}
