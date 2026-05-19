-- Tabela de configurações globais do sistema (somente admin)
create table if not exists public.app_settings (
  key   text primary key,
  value text not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.app_settings enable row level security;

-- Somente admin pode ler
create policy "app_settings: admin read"
  on public.app_settings for select
  to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );

-- Somente admin pode escrever
create policy "app_settings: admin write"
  on public.app_settings for all
  to authenticated
  using (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  )
  with check (
    exists (
      select 1 from public.user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );
