-- PASSO 1: Cria tabela equipment_catalog (máquinas completas)
CREATE TABLE IF NOT EXISTS public.equipment_catalog (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  internal_code     text UNIQUE NOT NULL,
  commercial_name   text NOT NULL,
  line              catalog_line NOT NULL DEFAULT 'outro',
  status            component_status NOT NULL DEFAULT 'active',
  manufacturer      text,
  refrigerants      text[] DEFAULT '{}',
  capacity_range_kw numrange,
  temp_range_c      numrange,
  geometry          jsonb DEFAULT '{}',
  electrical        jsonb DEFAULT '{}',
  tags              text[] DEFAULT '{}',
  notes             text,
  data              jsonb DEFAULT '{}',
  validation_status text NOT NULL DEFAULT 'pending'
                      CHECK (validation_status IN ('pending','approved','warning','rejected')),
  validated_at      timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS eq_cat_line_idx   ON public.equipment_catalog (line);
CREATE INDEX IF NOT EXISTS eq_cat_status_idx ON public.equipment_catalog (validation_status);
CREATE INDEX IF NOT EXISTS eq_cat_data_gin   ON public.equipment_catalog USING gin (data);

ALTER TABLE public.equipment_catalog ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "eq_catalog read" ON public.equipment_catalog;
CREATE POLICY "eq_catalog read" ON public.equipment_catalog FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "eq_catalog admin write" ON public.equipment_catalog;
CREATE POLICY "eq_catalog admin write" ON public.equipment_catalog FOR ALL TO authenticated
  USING (exists (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'))
  WITH CHECK (exists (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));
