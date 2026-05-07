/**
 * Hook para análise de incerteza com debounce + cancelamento real.
 *
 * - Cada nova execução cancela imediatamente a anterior (AbortController).
 * - O motor checa o sinal periodicamente, então o cancelamento é efetivo
 *   mesmo durante a varredura Monte Carlo (que pode demorar segundos).
 * - O botão "Calcular" da workspace nunca fica preso: ao clicar de novo,
 *   o hook descarta a execução pendente e dispara uma nova.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import {
  runUncertaintyAnalysis,
  UncertaintyAbortError,
} from "../engines/uncertainty/uncertaintyEngine";
import type {
  UncertaintyConfig,
  UncertaintyResult,
} from "../engines/uncertainty/uncertaintyTypes";
import type {
  CoilCycleInputs,
  CoilCycleResult,
} from "../engines/coil/coilCycleAdapter";

interface UseUncertaintyAnalysisOptions {
  inputs: CoilCycleInputs | null;
  nominalResult: CoilCycleResult | null;
  config?: Partial<UncertaintyConfig>;
  debounceMs?: number;
  enabled?: boolean;
}

interface UseUncertaintyAnalysisReturn {
  result: UncertaintyResult | null;
  isLoading: boolean;
  error: string | null;
  cancel: () => void;
  rerun: () => void;
}

export function useUncertaintyAnalysis({
  inputs,
  nominalResult,
  config = {},
  debounceMs = 1500,
  enabled = true,
}: UseUncertaintyAnalysisOptions): UseUncertaintyAnalysisReturn {
  const [result, setResult] = useState<UncertaintyResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const runIdRef = useRef(0);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setIsLoading(false);
  }, []);

  const schedule = useCallback(() => {
    if (!enabled || !inputs || !nominalResult?.success) {
      cancel();
      setResult(null);
      return;
    }

    // Cancela qualquer execução em andamento ou agendada
    if (timerRef.current) clearTimeout(timerRef.current);
    if (abortRef.current) abortRef.current.abort();

    const controller = new AbortController();
    abortRef.current = controller;
    const myRunId = ++runIdRef.current;

    setIsLoading(true);
    setError(null);

    timerRef.current = setTimeout(async () => {
      try {
        const analysis = await runUncertaintyAnalysis(
          inputs,
          nominalResult,
          config,
          controller.signal,
        );
        if (runIdRef.current === myRunId && !controller.signal.aborted) {
          setResult(analysis);
          setIsLoading(false);
        }
      } catch (err) {
        if (err instanceof UncertaintyAbortError) {
          // Cancelamento esperado — não atualiza estado.
          return;
        }
        if (runIdRef.current === myRunId && !controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Erro na análise de incerteza");
          setIsLoading(false);
        }
      }
    }, debounceMs);
  }, [inputs, nominalResult, enabled, debounceMs, config, cancel]);

  useEffect(() => {
    schedule();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [schedule]);

  // Permite forçar re-execução imediata (ex.: clique no botão "Calcular").
  const rerun = useCallback(() => {
    schedule();
  }, [schedule]);

  return { result, isLoading, error, cancel, rerun };
}
