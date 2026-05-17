-- validation_results: resultados da validação em lote dos Data Sheets
CREATE TABLE IF NOT EXISTS public.validation_results (
  id                uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  catalog_model_id  text,
  validated_at      timestamptz NOT NULL,
  overall_status    text        NOT NULL CHECK (overall_status IN ('PASS', 'FAIL', 'WARN')),
  score_pct         numeric     NOT NULL DEFAULT 0,
  criteria          jsonb       NOT NULL DEFAULT '[]',
  engine_version    text,
  inputs_snapshot   jsonb,
  created_at        timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.validation_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "validation_results_read" ON public.validation_results
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "validation_results_insert" ON public.validation_results
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE INDEX idx_validation_results_model  ON public.validation_results (catalog_model_id);
CREATE INDEX idx_validation_results_status ON public.validation_results (overall_status);
