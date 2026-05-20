#!/usr/bin/env node
/**
 * import-catalog-to-supabase.mjs
 *
 * Importa os 480 modelos de public/data/catalogs/equipment.json
 * para a tabela catalog_models via psql direto (sem REST API).
 *
 * Uso:
 *   SUPABASE_DB_URL=postgresql://postgres:[senha]@db.sggfxewvxeagsfsqefjy.supabase.co:5432/postgres \
 *   node scripts/import-catalog-to-supabase.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const DB_URL = process.env.SUPABASE_DB_URL;
if (!DB_URL) {
  console.error("❌  Defina SUPABASE_DB_URL no ambiente");
  console.error("    Ex: postgresql://postgres:[senha]@db.sggfxewvxeagsfsqefjy.supabase.co:5432/postgres");
  process.exit(1);
}

const data = JSON.parse(readFileSync(resolve(root, "public/data/catalogs/equipment.json"), "utf-8"));
console.log(`📦  ${data.length} modelos encontrados — gerando SQL...`);

function str(v) {
  if (v == null || v === "") return "NULL";
  return `'${String(v).replace(/'/g, "''")}'`;
}

function num(v) {
  const n = Number(v);
  return (v != null && !isNaN(n)) ? String(n) : "NULL";
}

const values = data.map((row) => {
  // JSON usa dollar-quoting para evitar conflitos com aspas simples no dado
  const jsonLiteral = `$seed$${JSON.stringify(row)}$seed$`;
  return `(${[
    str(row.id),
    str(row.modelo ?? row.id),
    str(row.modeloBaseReferencia),
    str(row.modeloCatalogoOriginal),
    str(row.linha),
    str(row.application ?? row.aplicacao),
    str(row.family ?? row.familia),
    str(row.refrigerante),
    str(row.fabricante),
    str(row.compressorModelo),
    str(row.tipoCompressor),
    num(row.tensaoV),
    num(row.numeroFases),
    num(row.frequenciaHz),
    num(row.capacidadeFrigorificaKcalH),
    num(row.calorRejeitadoKcalH),
    num(row.potenciaEletricaKw),
    num(row.cop),
    num(row.tempEvaporacaoC),
    num(row.tempCondensacaoC),
    num(row.tempCamaraC),
    `${jsonLiteral}::jsonb`,
  ].join(",")})`;
}).join(",\n");

const sql = `
BEGIN;

INSERT INTO public.catalog_models (
  id, modelo, modelo_base_referencia, modelo_catalogo_original,
  linha, aplicacao, familia, refrigerante, fabricante,
  compressor_modelo, tipo_compressor,
  tensao_v, numero_fases, frequencia_hz,
  capacidade_kcalh, calor_rejeitado_kcalh, potencia_eletrica_kw,
  cop_nominal, temp_evaporacao_c, temp_condensacao_c, temp_camara_c,
  data
)
VALUES
${values}
ON CONFLICT (id) DO UPDATE SET
  modelo        = EXCLUDED.modelo,
  data          = EXCLUDED.data,
  updated_at    = now();

COMMIT;
`;

const tmpFile = "/tmp/catalog_seed.sql";
writeFileSync(tmpFile, sql);
console.log(`📝  SQL gerado: ${(sql.length / 1024).toFixed(0)} KB — executando via psql...`);

execSync(`psql "${DB_URL}" -f ${tmpFile} -v ON_ERROR_STOP=1`, { stdio: "inherit" });
console.log(`\n✅  ${data.length} modelos importados com sucesso`);
