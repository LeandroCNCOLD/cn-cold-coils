-- product_revisions: snapshots imutáveis de configuração do Hub de Testes
-- Cada revisão guarda o estado completo (compressor, evaporador, condensador, condições)
-- como JSONB para máxima flexibilidade.

create table if not exists public.product_revisions (
  id                  text        primary key,
  catalog_model_id    text        references public.coil_geometry_overrides(id) on delete set null,
  revision_number     integer     not null default 1,
  revision_label      text        not null,
  status              text        not null default 'draft' check (status in ('draft', 'approved', 'archived')),
  snapshot            jsonb       not null default '{}',
  note                text,
  created_by          text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- Auto-increment revision_number dentro do mesmo catalog_model_id
create or replace function public.set_revision_number()
returns trigger language plpgsql as $$
begin
  if new.catalog_model_id is not null then
    select coalesce(max(revision_number), 0) + 1
      into new.revision_number
      from public.product_revisions
     where catalog_model_id = new.catalog_model_id;
  end if;
  return new;
end;
$$;

create trigger trg_set_revision_number
  before insert on public.product_revisions
  for each row execute function public.set_revision_number();

-- updated_at automático
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_product_revisions_updated_at
  before update on public.product_revisions
  for each row execute function public.touch_updated_at();

-- RLS: leitura pública; escrita apenas autenticado
alter table public.product_revisions enable row level security;

create policy "revisions_select_all"
  on public.product_revisions for select using (true);

create policy "revisions_insert_authenticated"
  on public.product_revisions for insert
  with check (auth.role() = 'authenticated');

create policy "revisions_delete_own"
  on public.product_revisions for delete
  using (created_by = auth.uid()::text or auth.role() = 'service_role');
