-- Recria compressors_catalog com schema que reflete o index.json real.
-- A tabela anterior esperava dados por ponto de operação (evap_temp/cond_temp/capacity_w)
-- que não existem no índice — o índice tem metadados por modelo (ranges, tipo, potência nominal).

drop table if exists public.compressors_catalog cascade;

create table public.compressors_catalog (
  id                    text        primary key,   -- ex: "COPELAND_ZR11M3E_TWD_R404A_60Hz"
  manufacturer          text        not null,
  model                 text        not null,
  refrigerant           text        not null,
  application           text        not null,      -- HT | MT | LT
  compressor_type       text        not null,      -- Scroll | Alternativo | Semihermetic Recips | Vite
  frequency_hz          integer     not null,      -- 50 | 60
  nominal_power_kw      numeric     not null,
  te_min_c              numeric     not null,
  te_max_c              numeric     not null,
  tc_min_c              numeric     not null,
  tc_max_c              numeric     not null,
  num_calibration_points integer    not null default 0,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index on public.compressors_catalog (manufacturer);
create index on public.compressors_catalog (refrigerant);
create index on public.compressors_catalog (application);
create index on public.compressors_catalog (frequency_hz);

create trigger trg_compressors_catalog_updated_at
  before update on public.compressors_catalog
  for each row execute function public.touch_updated_at();

alter table public.compressors_catalog enable row level security;

create policy "compressors_catalog_read_all"
  on public.compressors_catalog for select using (true);

create policy "compressors_catalog_write_service"
  on public.compressors_catalog for all
  using (auth.role() = 'service_role');
