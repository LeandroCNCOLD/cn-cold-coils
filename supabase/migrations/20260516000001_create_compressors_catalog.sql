-- compressors_catalog: dados de catálogo de compressores por fabricante
-- Tabela somente-leitura para usuários; escrita via service_role.

create table if not exists public.compressors_catalog (
  id                uuid        primary key default gen_random_uuid(),
  manufacturer      text        not null,
  model             text        not null,
  refrigerant       text        not null,
  evap_temp_c       numeric     not null,
  cond_temp_c       numeric     not null,
  capacity_w        numeric     not null,
  power_kw          numeric     not null,
  cop               numeric     not null,
  voltage_v         numeric,
  phases            integer,
  displacement_cc   numeric,
  notes             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index on public.compressors_catalog (manufacturer, refrigerant);
create index on public.compressors_catalog (refrigerant, evap_temp_c, cond_temp_c);

create trigger trg_compressors_catalog_updated_at
  before update on public.compressors_catalog
  for each row execute function public.touch_updated_at();

alter table public.compressors_catalog enable row level security;

create policy "compressors_catalog_read_all"
  on public.compressors_catalog for select using (true);

create policy "compressors_catalog_write_service"
  on public.compressors_catalog for all
  using (auth.role() = 'service_role');
