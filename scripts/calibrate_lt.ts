/**
 * calibrate_lt.ts — Mede C_rich para a família LT com NTU-ε entálpico ativo.
 *
 * Uso: bun run scripts/calibrate_lt.ts
 *
 * Saída: média de C_rich por bucket de ΔT para atualização de coilCalibrationFactors.ts
 */

import { getEquipmentCatalog } from "../src/modules/coldpro_catalog/data/equipmentCatalog.index";
import { catalogToEvaporatorInput } from "../src/modules/coldpro_catalog/adapters/evaporatorAdapter";
import { calculateProgressiveCoil } from "../src/modules/coldpro_v2/engines/progressive/progressiveCoilSolver";

interface CalibPoint {
  modelo: string;
  delta_T_c: number;
  q_catalog_w: number;
  q_engine_w: number;
  c_rich: number;
}

const catalog = getEquipmentCatalog();
const ltModels = catalog.filter((m) => m.application === "LT");

console.log(`\n=== Calibração P2 — família LT (NTU-ε úmido ativo) ===`);
console.log(`Modelos LT encontrados: ${ltModels.length}\n`);

const points: CalibPoint[] = [];
let skipped = 0;

for (const row of ltModels) {
  const { input, warnings } = catalogToEvaporatorInput(row);
  if (!input) { skipped++; continue; }

  // C_rich = 1.0: sem model_code, mede o engine puro
  const result = calculateProgressiveCoil({
    ...input,
    model_code: undefined,
    use_wet_ntu: true,
  });

  const q_catalog_w = (row.capacidadeFrigorificaKcalH ?? 0) * 1.163;
  if (q_catalog_w <= 0 || result.total_capacity_w <= 0) { skipped++; continue; }

  const delta_T_c = input.air_temperature_in_c - input.T_evaporating_c;
  const c_rich = q_catalog_w / result.total_capacity_w;

  if (warnings.length > 0) {
    // silencioso — só reportar erros graves
  }

  points.push({
    modelo: row.modelo ?? "?",
    delta_T_c,
    q_catalog_w,
    q_engine_w: result.total_capacity_w,
    c_rich,
  });
}

console.log(`Processados: ${points.length}  |  Ignorados: ${skipped}\n`);

// Agrupar por bucket de ΔT (arredondado para 0.5°C)
const buckets = new Map<number, CalibPoint[]>();
for (const p of points) {
  const key = Math.round(p.delta_T_c * 2) / 2; // 0.5°C granularidade
  if (!buckets.has(key)) buckets.set(key, []);
  buckets.get(key)!.push(p);
}

console.log("ΔT (°C) | N  | C_rich_médio | C_rich_min | C_rich_max | Q_eng_médio (W)");
console.log("--------|----|--------------|-----------|-----------|-----------------");

const sortedKeys = [...buckets.keys()].sort((a, b) => a - b);
const allCRich: number[] = [];

for (const key of sortedKeys) {
  const pts = buckets.get(key)!;
  const cRichValues = pts.map((p) => p.c_rich);
  const avg = cRichValues.reduce((a, b) => a + b, 0) / cRichValues.length;
  const min = Math.min(...cRichValues);
  const max = Math.max(...cRichValues);
  const avgQ = pts.reduce((a, p) => a + p.q_engine_w, 0) / pts.length;
  allCRich.push(...cRichValues);
  console.log(
    `${key.toFixed(1).padStart(7)} | ${String(pts.length).padStart(2)} | ${avg.toFixed(4).padStart(12)} | ${min.toFixed(4).padStart(9)} | ${max.toFixed(4).padStart(9)} | ${Math.round(avgQ).toString().padStart(15)}`,
  );
}

const globalAvg = allCRich.reduce((a, b) => a + b, 0) / allCRich.length;
const globalMin = Math.min(...allCRich);
const globalMax = Math.max(...allCRich);

console.log("\n=== RESUMO GLOBAL LT ===");
console.log(`C_rich médio global : ${globalAvg.toFixed(4)}`);
console.log(`C_rich mínimo       : ${globalMin.toFixed(4)}`);
console.log(`C_rich máximo       : ${globalMax.toFixed(4)}`);
console.log(`Total modelos LT    : ${points.length}`);

// ΔT médio ponderado por catálogo
const deltaT_avg =
  points.reduce((a, p) => a + p.delta_T_c, 0) / points.length;
const cRich_at_avg = points
  .filter((p) => Math.abs(p.delta_T_c - deltaT_avg) < 1.5)
  .map((p) => p.c_rich);
const nominal_c_rich =
  cRich_at_avg.length > 0
    ? cRich_at_avg.reduce((a, b) => a + b, 0) / cRich_at_avg.length
    : globalAvg;

console.log(`\nΔT médio catálogo   : ${deltaT_avg.toFixed(1)}°C`);
console.log(`C_rich no ΔT médio  : ${nominal_c_rich.toFixed(4)}`);
console.log(`\n→ Atualizar coilCalibrationFactors.ts:`);
console.log(`  delta_T_c: ${deltaT_avg.toFixed(1)}, C_rich: ${nominal_c_rich.toFixed(3)}`);
