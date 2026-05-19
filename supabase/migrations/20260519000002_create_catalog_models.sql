-- Tabela dos 480 modelos do catálogo CN COLD
-- Campos indexados para filtros rápidos; coluna data jsonb armazena o registro completo

create table if not exists public.catalog_models (
  id                        text primary key,
  modelo                    text not null,
  modelo_base_referencia    text,
  modelo_catalogo_original  text,
  linha                     text,
  aplicacao                 text,
  familia                   text,
  refrigerante              text,
  fabricante                text,
  compressor_modelo         text,
  tipo_compressor           text,
  tensao_v                  integer,
  numero_fases              integer,
  frequencia_hz             integer,
  capacidade_kcalh          numeric,
  calor_rejeitado_kcalh     numeric,
  potencia_eletrica_kw      numeric,
  cop_nominal               numeric,
  temp_evaporacao_c         numeric,
  temp_condensacao_c        numeric,
  temp_camara_c             numeric,
  validation_status         text not null default 'pending'
                              check (validation_status in ('pending','approved','warning','rejected')),
  data                      jsonb not null default '{}',
  validated_at              timestamptz,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

create index if not exists catalog_models_linha_idx            on public.catalog_models (linha);
create index if not exists catalog_models_refrigerante_idx     on public.catalog_models (refrigerante);
create index if not exists catalog_models_familia_idx          on public.catalog_models (familia);
create index if not exists catalog_models_aplicacao_idx        on public.catalog_models (aplicacao);
create index if not exists catalog_models_validation_idx       on public.catalog_models (validation_status);
create index if not exists catalog_models_data_gin             on public.catalog_models using gin (data);

alter table public.catalog_models enable row level security;

drop policy if exists "catalog_models read" on public.catalog_models;
create policy "catalog_models read" on public.catalog_models
  for select to authenticated using (true);

drop policy if exists "catalog_models admin write" on public.catalog_models;
create policy "catalog_models admin write" on public.catalog_models
  for all to authenticated
  using (exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin'));
