/**
 * workspaceReset.ts — Limpeza centralizada dos workspaces ColdPro / Hub de Testes.
 *
 * Garante que ao sair de uma página de cálculo (Hub de Testes, Test Bench,
 * Catálogo de equipamentos), nenhum dado do equipamento anterior fique
 * persistido para o próximo cálculo.
 */
import { useTestHubStore } from "../stores/useTestHubStore";
import { useSessionStore } from "../stores/useSessionStore";
import { useComponentStore } from "../stores/useComponentStore";
import { useCatalogSessionStore } from "@/modules/coldpro_catalog/store/useCatalogSessionStore";

export interface ColdproResetOptions {
  /** Preserva os componentes salvos pelo usuário (biblioteca local). */
  keepComponentLibrary?: boolean;
  /** Preserva sessões anteriores. */
  keepSessions?: boolean;
}

export function resetColdproWorkspace(opts: ColdproResetOptions = {}): void {
  try {
    useTestHubStore.getState().clearMachine();
    useTestHubStore.getState().clearAllAnalyses();
  } catch (err) {
    console.warn("[coldpro] reset test hub falhou:", err);
  }
  try {
    useCatalogSessionStore.getState().clearSelection();
  } catch (err) {
    console.warn("[coldpro] reset catalog session falhou:", err);
  }
  if (!opts.keepSessions) {
    try {
      useSessionStore.getState().reset();
    } catch (err) {
      console.warn("[coldpro] reset session store falhou:", err);
    }
  }
  if (!opts.keepComponentLibrary) {
    // Por padrão mantemos a biblioteca de componentes salvos do usuário,
    // pois ela é o "catálogo pessoal". Apenas limpamos quando solicitado.
  }
}
