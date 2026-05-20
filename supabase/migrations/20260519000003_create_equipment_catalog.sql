-- Tabela dos 480 equipamentos completos do catálogo CN COLD
-- Separada de catalog_models (componentes individuais: evaporadores, condensadores, etc.)

create table if not exists public.equipment_catalog (
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

create index if not exists equipment_catalog_linha_idx        on public.equipment_catalog (linha);
create index if not exists equipment_catalog_refrigerante_idx on public.equipment_catalog (refrigerante);
create index if not exists equipment_catalog_familia_idx      on public.equipment_catalog (familia);
create index if not exists equipment_catalog_aplicacao_idx    on public.equipment_catalog (aplicacao);
create index if not exists equipment_catalog_validation_idx   on public.equipment_catalog (validation_status);
create index if not exists equipment_catalog_data_gin         on public.equipment_catalog using gin (data);

alter table public.equipment_catalog enable row level security;

drop policy if exists "equipment_catalog read" on public.equipment_catalog;
create policy "equipment_catalog read" on public.equipment_catalog
  for select to authenticated using (true);

drop policy if exists "equipment_catalog admin write" on public.equipment_catalog;
create policy "equipment_catalog admin write" on public.equipment_catalog
  for all to authenticated
  using (exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin'))
  with check (exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin'));
