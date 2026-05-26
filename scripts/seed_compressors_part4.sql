-- Part 4/8: rows 601–800

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM084_7_R134a_50Hz', 'Maneurop', 'SM084-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM090_7_R134a_50Hz', 'Maneurop', 'SM090-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM100_7_R134a_50Hz', 'Maneurop', 'SM100-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM110_7_R134a_50Hz', 'Maneurop', 'SM110-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM115_7_R134a_50Hz', 'Maneurop', 'SM115-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM120_7_R134a_50Hz', 'Maneurop', 'SM120-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM125_7_R134a_50Hz', 'Maneurop', 'SM125-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM170_4_R134a_50Hz', 'Maneurop', 'SM170-4', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM084_6_R134a_50Hz', 'Maneurop', 'SM084-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM090_6_R134a_50Hz', 'Maneurop', 'SM090-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM100_6_R134a_50Hz', 'Maneurop', 'SM100-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM110_6_R134a_50Hz', 'Maneurop', 'SM110-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM115_6_R134a_50Hz', 'Maneurop', 'SM115-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM120_6_R134a_50Hz', 'Maneurop', 'SM120-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM125_6_R134a_50Hz', 'Maneurop', 'SM125-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM148_6_R134a_50Hz', 'Maneurop', 'SM148-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM160_6_R134a_50Hz', 'Maneurop', 'SM160-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM161_6_R134a_50Hz', 'Maneurop', 'SM161-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM175_6_R134a_50Hz', 'Maneurop', 'SM175-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM185_6_R134a_50Hz', 'Maneurop', 'SM185-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM170_6_R134a_50Hz', 'Maneurop', 'SM170-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM180_6_R134a_50Hz', 'Maneurop', 'SM180-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM200_6_R134a_50Hz', 'Maneurop', 'SM200-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM220_6_R134a_50Hz', 'Maneurop', 'SM220-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM230_6_R134a_50Hz', 'Maneurop', 'SM230-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM242_6_R134a_50Hz', 'Maneurop', 'SM242-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM250_6_R134a_50Hz', 'Maneurop', 'SM250-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM268_6_R134a_50Hz', 'Maneurop', 'SM268-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM271_6_R134a_50Hz', 'Maneurop', 'SM271-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM281_6_R134a_50Hz', 'Maneurop', 'SM281-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM285_6_R134a_50Hz', 'Maneurop', 'SM285-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM290_6_R134a_50Hz', 'Maneurop', 'SM290-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM296_6_R134a_50Hz', 'Maneurop', 'SM296-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM310_6_R134a_50Hz', 'Maneurop', 'SM310-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM320_6_R134a_50Hz', 'Maneurop', 'SM320-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM322_6_R134a_50Hz', 'Maneurop', 'SM322-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM350_6_R134a_50Hz', 'Maneurop', 'SM350-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM370_6_R134a_50Hz', 'Maneurop', 'SM370-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM480_6_R134a_50Hz', 'Maneurop', 'SM480-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM550_6_R134a_50Hz', 'Maneurop', 'SM550-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM640_6_R134a_50Hz', 'Maneurop', 'SM640-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM740_6_R134a_50Hz', 'Maneurop', 'SM740-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM148_7_R134a_50Hz', 'Maneurop', 'SM148-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM160_7_R134a_50Hz', 'Maneurop', 'SM160-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM161_7_R134a_50Hz', 'Maneurop', 'SM161-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM175_7_R134a_50Hz', 'Maneurop', 'SM175-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM185_7_R134a_50Hz', 'Maneurop', 'SM185-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM170_7_R134a_50Hz', 'Maneurop', 'SM170-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM180_7_R134a_50Hz', 'Maneurop', 'SM180-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM200_7_R134a_50Hz', 'Maneurop', 'SM200-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM220_7_R134a_50Hz', 'Maneurop', 'SM220-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM230_7_R134a_50Hz', 'Maneurop', 'SM230-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM242_7_R134a_50Hz', 'Maneurop', 'SM242-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM250_7_R134a_50Hz', 'Maneurop', 'SM250-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM268_7_R134a_50Hz', 'Maneurop', 'SM268-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM271_7_R134a_50Hz', 'Maneurop', 'SM271-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM281_7_R134a_50Hz', 'Maneurop', 'SM281-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM285_7_R134a_50Hz', 'Maneurop', 'SM285-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM290_7_R134a_50Hz', 'Maneurop', 'SM290-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM296_7_R134a_50Hz', 'Maneurop', 'SM296-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM310_7_R134a_50Hz', 'Maneurop', 'SM310-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM320_7_R134a_50Hz', 'Maneurop', 'SM320-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM322_7_R134a_50Hz', 'Maneurop', 'SM322-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM350_7_R134a_50Hz', 'Maneurop', 'SM350-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM370_7_R134a_50Hz', 'Maneurop', 'SM370-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM480_7_R134a_50Hz', 'Maneurop', 'SM480-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM550_7_R134a_50Hz', 'Maneurop', 'SM550-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM640_7_R134a_50Hz', 'Maneurop', 'SM640-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM740_7_R134a_50Hz', 'Maneurop', 'SM740-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM084_3_R134a_50Hz', 'Maneurop', 'SM084-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM090_3_R134a_50Hz', 'Maneurop', 'SM090-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM100_3_R134a_50Hz', 'Maneurop', 'SM100-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM110_3_R134a_50Hz', 'Maneurop', 'SM110-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM115_3_R134a_50Hz', 'Maneurop', 'SM115-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM120_3_R134a_50Hz', 'Maneurop', 'SM120-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM125_3_R134a_50Hz', 'Maneurop', 'SM125-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM148_3_R134a_50Hz', 'Maneurop', 'SM148-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM160_3_R134a_50Hz', 'Maneurop', 'SM160-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM161_3_R134a_50Hz', 'Maneurop', 'SM161-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM175_3_R134a_50Hz', 'Maneurop', 'SM175-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM185_3_R134a_50Hz', 'Maneurop', 'SM185-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM170_3_R134a_50Hz', 'Maneurop', 'SM170-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM180_3_R134a_50Hz', 'Maneurop', 'SM180-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM200_3_R134a_50Hz', 'Maneurop', 'SM200-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM220_3_R134a_50Hz', 'Maneurop', 'SM220-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM230_3_R134a_50Hz', 'Maneurop', 'SM230-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM242_3_R134a_50Hz', 'Maneurop', 'SM242-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM250_3_R134a_50Hz', 'Maneurop', 'SM250-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM268_3_R134a_50Hz', 'Maneurop', 'SM268-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM271_3_R134a_50Hz', 'Maneurop', 'SM271-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM281_3_R134a_50Hz', 'Maneurop', 'SM281-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM285_3_R134a_50Hz', 'Maneurop', 'SM285-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM290_3_R134a_50Hz', 'Maneurop', 'SM290-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM296_3_R134a_50Hz', 'Maneurop', 'SM296-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM310_3_R134a_50Hz', 'Maneurop', 'SM310-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM320_3_R134a_50Hz', 'Maneurop', 'SM320-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM322_3_R134a_50Hz', 'Maneurop', 'SM322-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM350_3_R134a_50Hz', 'Maneurop', 'SM350-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM370_3_R134a_50Hz', 'Maneurop', 'SM370-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM480_3_R134a_50Hz', 'Maneurop', 'SM480-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM550_3_R134a_50Hz', 'Maneurop', 'SM550-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM640_3_R134a_50Hz', 'Maneurop', 'SM640-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM740_3_R134a_50Hz', 'Maneurop', 'SM740-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM084_9_R134a_50Hz', 'Maneurop', 'SM084-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM090_9_R134a_50Hz', 'Maneurop', 'SM090-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM100_9_R134a_50Hz', 'Maneurop', 'SM100-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM110_9_R134a_50Hz', 'Maneurop', 'SM110-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM115_9_R134a_50Hz', 'Maneurop', 'SM115-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM120_9_R134a_50Hz', 'Maneurop', 'SM120-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM125_9_R134a_50Hz', 'Maneurop', 'SM125-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM148_9_R134a_50Hz', 'Maneurop', 'SM148-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM160_9_R134a_50Hz', 'Maneurop', 'SM160-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM161_9_R134a_50Hz', 'Maneurop', 'SM161-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM175_9_R134a_50Hz', 'Maneurop', 'SM175-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM185_9_R134a_50Hz', 'Maneurop', 'SM185-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM170_9_R134a_50Hz', 'Maneurop', 'SM170-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM180_9_R134a_50Hz', 'Maneurop', 'SM180-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM200_9_R134a_50Hz', 'Maneurop', 'SM200-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM220_9_R134a_50Hz', 'Maneurop', 'SM220-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM230_9_R134a_50Hz', 'Maneurop', 'SM230-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM242_9_R134a_50Hz', 'Maneurop', 'SM242-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM250_9_R134a_50Hz', 'Maneurop', 'SM250-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM268_9_R134a_50Hz', 'Maneurop', 'SM268-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM271_9_R134a_50Hz', 'Maneurop', 'SM271-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM281_9_R134a_50Hz', 'Maneurop', 'SM281-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM285_9_R134a_50Hz', 'Maneurop', 'SM285-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM290_9_R134a_50Hz', 'Maneurop', 'SM290-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM296_9_R134a_50Hz', 'Maneurop', 'SM296-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM310_9_R134a_50Hz', 'Maneurop', 'SM310-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM320_9_R134a_50Hz', 'Maneurop', 'SM320-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM322_9_R134a_50Hz', 'Maneurop', 'SM322-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM350_9_R134a_50Hz', 'Maneurop', 'SM350-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM370_9_R134a_50Hz', 'Maneurop', 'SM370-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM480_9_R134a_50Hz', 'Maneurop', 'SM480-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM550_9_R134a_50Hz', 'Maneurop', 'SM550-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM640_9_R134a_50Hz', 'Maneurop', 'SM640-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SM740_9_R134a_50Hz', 'Maneurop', 'SM740-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY240_4_R134a_50Hz', 'Maneurop', 'SY240-4', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY300_4_R134a_50Hz', 'Maneurop', 'SY300-4', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY380_4_R134a_50Hz', 'Maneurop', 'SY380-4', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY482_4_R134a_50Hz', 'Maneurop', 'SY482-4', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY540_4_R134a_50Hz', 'Maneurop', 'SY540-4', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY600_4_R134a_50Hz', 'Maneurop', 'SY600-4', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY620_4_R134a_50Hz', 'Maneurop', 'SY620-4', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY680_4_R134a_50Hz', 'Maneurop', 'SY680-4', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY760_4_R134a_50Hz', 'Maneurop', 'SY760-4', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY240_6_R134a_50Hz', 'Maneurop', 'SY240-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY300_6_R134a_50Hz', 'Maneurop', 'SY300-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY482_6_R134a_50Hz', 'Maneurop', 'SY482-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY540_6_R134a_50Hz', 'Maneurop', 'SY540-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY600_6_R134a_50Hz', 'Maneurop', 'SY600-6', 'R134a', 'HT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY240_7_R134a_50Hz', 'Maneurop', 'SY240-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY300_7_R134a_50Hz', 'Maneurop', 'SY300-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY482_7_R134a_50Hz', 'Maneurop', 'SY482-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY540_7_R134a_50Hz', 'Maneurop', 'SY540-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY600_7_R134a_50Hz', 'Maneurop', 'SY600-7', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY240_3_R134a_50Hz', 'Maneurop', 'SY240-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY300_3_R134a_50Hz', 'Maneurop', 'SY300-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY482_3_R134a_50Hz', 'Maneurop', 'SY482-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY540_3_R134a_50Hz', 'Maneurop', 'SY540-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY600_3_R134a_50Hz', 'Maneurop', 'SY600-3', 'R134a', 'LT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY240_9_R134a_50Hz', 'Maneurop', 'SY240-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY300_9_R134a_50Hz', 'Maneurop', 'SY300-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY482_9_R134a_50Hz', 'Maneurop', 'SY482-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY540_9_R134a_50Hz', 'Maneurop', 'SY540-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SY600_9_R134a_50Hz', 'Maneurop', 'SY600-9', 'R134a', 'MT', 'Scroll',
   50, 0.0, -20.0, 10.0, 30.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('REFCOMP_134_XS_50_R404A_50Hz', 'RefComp', '134-XS-50', 'R404A', 'HT', 'Vite',
   50, 104.95, -15.0, 12.5, 35.0, 70.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('REFCOMP_134_XS_60_R404A_60Hz', 'RefComp', '134-XS-60', 'R404A', 'HT', 'Vite',
   60, 126.93, -15.0, 12.5, 35.0, 70.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH180_4_R407C_50Hz', 'Maneurop', 'SH180-4', 'R407C', 'HT', 'Scroll',
   50, 43.911, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_D6SH_350X_R410A_60Hz', 'Copeland', 'D6SH-350X', 'R410A', 'HT', 'Alternativo',
   60, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_D6SJ_400X_R410A_60Hz', 'Copeland', 'D6SJ-400X', 'R410A', 'HT', 'Alternativo',
   60, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_D6SK_500X_R410A_60Hz', 'Copeland', 'D6SK-500X', 'R410A', 'HT', 'Alternativo',
   60, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_D8SJ_600X_R410A_60Hz', 'Copeland', 'D8SJ-600X', 'R410A', 'HT', 'Alternativo',
   60, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH090_4_R407C_50Hz', 'Maneurop', 'SH090-4', 'R407C', 'HT', 'Scroll',
   50, 22.29, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH120_4_R407C_50Hz', 'Maneurop', 'SH120-4', 'R407C', 'HT', 'Scroll',
   50, 29.93, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH161_4_R407C_50Hz', 'Maneurop', 'SH161-4', 'R407C', 'HT', 'Scroll',
   50, 38.78, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH240_4_R407C_50Hz', 'Maneurop', 'SH240-4', 'R407C', 'HT', 'Scroll',
   50, 59.88356236, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH300_4_R407C_50Hz', 'Maneurop', 'SH300-4', 'R407C', 'HT', 'Scroll',
   50, 75.92507184, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH380_4_R407C_50Hz', 'Maneurop', 'SH380-4', 'R407C', 'HT', 'Scroll',
   50, 89.09854932, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH182_4_R407C_50Hz', 'Maneurop', 'SH182-4', 'R407C', 'HT', 'Scroll',
   50, 43.91189189, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH210_4_R407C_50Hz', 'Maneurop', 'SH210-4', 'R407C', 'HT', 'Scroll',
   50, 51.44097764, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH242_4_R407C_50Hz', 'Maneurop', 'SH242-4', 'R407C', 'HT', 'Scroll',
   50, 58.97006339, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH281_4_R407C_50Hz', 'Maneurop', 'SH281-4', 'R407C', 'HT', 'Scroll',
   50, 67.68459061, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH322_4_R407C_50Hz', 'Maneurop', 'SH322-4', 'R407C', 'HT', 'Scroll',
   50, 76.39911783, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH360_4_R407C_50Hz', 'Maneurop', 'SH360-4', 'R407C', 'HT', 'Scroll',
   50, 86.50450265, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH420_4_R407C_50Hz', 'Maneurop', 'SH420-4', 'R407C', 'HT', 'Scroll',
   50, 102.2375602, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH482_4_R407C_50Hz', 'Maneurop', 'SH482-4', 'R407C', 'HT', 'Scroll',
   50, 118.0384471, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH540_4_R407C_50Hz', 'Maneurop', 'SH540-4', 'R407C', 'HT', 'Scroll',
   50, 117.9706178, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH600_4_R407C_50Hz', 'Maneurop', 'SH600-4', 'R407C', 'HT', 'Scroll',
   50, 133.7715047, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH760_4_R407C_50Hz', 'Maneurop', 'SH760-4', 'R407C', 'HT', 'Scroll',
   50, 149.5723915, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH550_4_R407C_50Hz', 'Maneurop', 'SH550-4', 'R407C', 'HT', 'Scroll',
   50, 178.1970986, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH720_4_R407C_50Hz', 'Maneurop', 'SH720-4', 'R407C', 'HT', 'Scroll',
   50, 127.7807628, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH900_4_R407C_50Hz', 'Maneurop', 'SH900-4', 'R407C', 'HT', 'Scroll',
   50, 174.2611665, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SH1140_4_R407C_50Hz', 'Maneurop', 'SH1140-4', 'R407C', 'HT', 'Scroll',
   50, 220.941959, -15.0, 12.0, 30.0, 60.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('TECUMSEH_AE5465C_R410A_50Hz', 'Tecumseh', 'AE5465C', 'R410A', 'HT', 'Scroll',
   50, 1.35, -15.0, 15.0, 40.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('TECUMSEH_AE5470C_R410A_50Hz', 'Tecumseh', 'AE5470C', 'R410A', 'HT', 'Scroll',
   50, 1.42, -15.0, 15.0, 40.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('TECUMSEH_AJ5510C_R410A_50Hz', 'Tecumseh', 'AJ5510C', 'R410A', 'HT', 'Scroll',
   50, 1.89, -15.0, 15.0, 40.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('TECUMSEH_AJ5512C_R410A_50Hz', 'Tecumseh', 'AJ5512C', 'R410A', 'HT', 'Scroll',
   50, 2.43, -15.0, 15.0, 40.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('TECUMSEH_AJ5513C_R410A_50Hz', 'Tecumseh', 'AJ5513C', 'R410A', 'HT', 'Scroll',
   50, 2.79, -15.0, 15.0, 40.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('TECUMSEH_AJ5515C_R410A_50Hz', 'Tecumseh', 'AJ5515C', 'R410A', 'HT', 'Scroll',
   50, 3.17, -15.0, 15.0, 40.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();
