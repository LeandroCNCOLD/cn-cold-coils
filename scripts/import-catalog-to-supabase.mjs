#!/usr/bin/env node
/**
 * import-catalog-to-supabase.mjs
 *
 * Importa os 480 modelos de public/data/catalogs/equipment.json
 * para a tabela catalog_models no Supabase.
 *
 * Uso:
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=eyJ... \
 *   node scripts/import-catalog-to-supabase.mjs
 *
 * Ou carrega .env.local automaticamente se existir.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// ── Carrega .env.local se existir ────────────────────────────────────────────
const envPath = resolve(root, ".env.local");
if (existsSync(envPath)) {
  const raw = readFileSync(envPath, "utf-8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

const SUPABASE_URL = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("❌  Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no ambiente ou em .env.local");
  process.exit(1);
}

// ── Lê o catálogo ────────────────────────────────────────────────────────────
const catalogPath = resolve(root, "public/data/catalogs/equipment.json");
const raw = JSON.parse(readFileSync(catalogPath, "utf-8"));
console.log(`📦  ${raw.length} modelos encontrados em equipment.json`);

// ── Mapeia para o schema da tabela ───────────────────────────────────────────
function mapRow(item) {
  return {
    id:                       item.id,
    modelo:                   item.modelo ?? item.id,
    modelo_base_referencia:   item.modeloBaseReferencia ?? null,
    modelo_catalogo_original: item.modeloCatalogoOriginal ?? null,
    linha:                    item.linha ?? null,
    aplicacao:                item.application ?? null,
    familia:                  item.family ?? null,
    refrigerante:             item.refrigerante ?? null,
    fabricante:               item.fabricante ?? null,
    compressor_modelo:        item.compressorModelo ?? null,
    tipo_compressor:          item.tipoCompressor ?? null,
    tensao_v:                 item.tensaoV ?? null,
    numero_fases:             item.numeroFases ?? null,
    frequencia_hz:            item.frequenciaHz ?? null,
    capacidade_kcalh:         item.capacidadeFrigorificaKcalH ?? null,
    calor_rejeitado_kcalh:    item.calorRejeitadoKcalH ?? null,
    potencia_eletrica_kw:     item.potenciaEletricaKw ?? null,
    cop_nominal:              item.cop ?? null,
    temp_evaporacao_c:        item.tempEvaporacaoC ?? null,
    temp_condensacao_c:       item.tempCondensacaoC ?? null,
    temp_camara_c:            item.tempCamaraC ?? null,
    validation_status:        "pending",
    data:                     item,
  };
}

const rows = raw.map(mapRow);

// ── Upsert em lotes de 50 ────────────────────────────────────────────────────
const BATCH = 50;
let inserted = 0;
let errors   = 0;

for (let i = 0; i < rows.length; i += BATCH) {
  const batch = rows.slice(i, i + BATCH);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/catalog_models`, {
    method: "POST",
    headers: {
      "apikey":        SERVICE_KEY,
      "Authorization": `Bearer ${SERVICE_KEY}`,
      "Content-Type":  "application/json",
      "Prefer":        "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(batch),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`❌  Lote ${i}–${i + batch.length} falhou: ${res.status} ${err.slice(0, 200)}`);
    errors += batch.length;
  } else {
    inserted += batch.length;
    process.stdout.write(`\r✅  ${inserted}/${rows.length} importados...`);
  }
}

console.log(`\n\n🏁  Concluído: ${inserted} inseridos, ${errors} erros`);
if (errors > 0) process.exit(1);
