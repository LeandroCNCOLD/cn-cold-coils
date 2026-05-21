-- Tabela dos 480 modelos do catálogo CN COLD
-- Armazena dados de identificação + JSONB completo para validação em lote

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

-- Índices para buscas comuns
create index if not exists catalog_models_aplicacao_idx   on public.catalog_models (aplicacao);
create index if not exists catalog_models_linha_idx       on public.catalog_models (linha);
create index if not exists catalog_models_refrigerante_idx on public.catalog_models (refrigerante);
create index if not exists catalog_models_status_idx      on public.catalog_models (validation_status);
create index if not exists catalog_models_data_gin_idx    on public.catalog_models using gin (data);

-- RLS
alter table public.catalog_models enable row level security;

-- Leitura: todos autenticados
create policy "catalog_models: authenticated read"
  on public.catalog_models for select
  to authenticated
  using (true);

-- Escrita: somente admin
create policy "catalog_models: admin write"
  on public.catalog_models for all
  to authenticated
  using (
    exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin')
  )
  with check (
    exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'admin')
  );

-- Trigger para updated_at automático
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger catalog_models_updated_at
  before update on public.catalog_models
  for each row execute function public.set_updated_at();
