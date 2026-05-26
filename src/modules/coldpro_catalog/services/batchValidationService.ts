import { useCatalogDataStore } from "../store/useCatalogDataStore";
import { catalogToEvaporatorInput } from "../adapters/evaporatorAdapter";
import { calculateProgressiveCoil } from "@/modules/coldpro_v2/engines/progressive/progressiveCoilSolver";
import { supabase } from "@/integrations/supabase/client";

export const BATCH_VALIDATION_ENGINE_VERSION = "1.0";

export interface ModelValidationResult {
  id:            string;
  modelo:        string;
  family:        string;
  application:   string;
  q_catalog_w:   number;
  q_engine_w:    number;
  c_rich:        number;
  deviation_pct: number;
  status:        "PASS" | "WARN" | "FAIL" | "SKIP";
  warnings:      string[];
}

export interface BatchValidationReport {
  total:          number;
  passed:         number;
  warned:         number;
  failed:         number;
  skipped:        number;
  results:        ModelValidationResult[];
  ran_at:         string;
  engine_version: string;
}

export async function runBatchValidation(
  onProgress?: (done: number, total: number) => void,
): Promise<BatchValidationReport> {
  const models = useCatalogDataStore.getState().rows.filter(
    (m) => m.family !== "plugin" || !!m.compressorModelo,
  );

  const results: ModelValidationResult[] = [];
  let done = 0;
  let passed = 0;
  let warned = 0;
  let failed = 0;
  let skipped = 0;
  const total = models.length;

  for (const row of models) {
    const { input, warnings } = catalogToEvaporatorInput(row);

    if (!input) {
      skipped++;
      results.push({
        id:            row.id ?? row.modelo ?? "?",
        modelo:        row.modelo ?? "?",
        family:        row.family ?? "unknown",
        application:   row.application ?? "unknown",
        q_catalog_w:   0,
        q_engine_w:    0,
        c_rich:        1,
        deviation_pct: 0,
        status:        "SKIP",
        warnings,
      });
      onProgress?.(++done, total);
      continue;
    }

    const result = calculateProgressiveCoil(input);
    const q_catalog_w = (row.capacidadeFrigorificaKcalH ?? 0) * 1.163;
    const q_engine_w = result.total_capacity_w;
    const deviation_pct =
      q_catalog_w > 0 ? ((q_engine_w - q_catalog_w) / q_catalog_w) * 100 : 0;
    const c_rich = q_engine_w > 0 ? q_catalog_w / q_engine_w : 1;

    const status: "PASS" | "WARN" | "FAIL" =
      Math.abs(deviation_pct) <= 5
        ? "PASS"
        : Math.abs(deviation_pct) <= 15
          ? "WARN"
          : "FAIL";

    if (status === "PASS") passed++;
    else if (status === "WARN") warned++;
    else failed++;

    results.push({
      id:            row.id ?? row.modelo ?? "?",
      modelo:        row.modelo ?? "?",
      family:        row.family ?? "unknown",
      application:   row.application ?? "unknown",
      q_catalog_w,
      q_engine_w,
      c_rich,
      deviation_pct,
      status,
      warnings: [...warnings, ...result.warnings],
    });

    const score_pct = Math.max(0, 100 - Math.abs(deviation_pct) * 5);
    supabase
      .from("validation_results")
      .insert({
        catalog_model_id: row.id,
        validated_at:     new Date().toISOString(),
        overall_status:   status,
        score_pct,
        criteria: [
          {
            name:          "desvio_capacidade",
            expected:      q_catalog_w,
            calculated:    q_engine_w,
            deviation_pct,
            status,
          },
        ],
        engine_version:  BATCH_VALIDATION_ENGINE_VERSION,
        inputs_snapshot: { modelo: row.modelo, Te: input.T_evaporating_c },
      })
      .then(() => undefined, () => undefined);

    onProgress?.(++done, total);
  }

  return {
    total,
    passed,
    warned,
    failed,
    skipped,
    results,
    ran_at:         new Date().toISOString(),
    engine_version: BATCH_VALIDATION_ENGINE_VERSION,
  };
}
