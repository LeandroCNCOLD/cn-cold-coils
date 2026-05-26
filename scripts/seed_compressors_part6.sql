-- Part 6/8: rows 1001–1200

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF18K4E_TF5_B_R134a_60Hz', 'Copeland', 'ZF18K4E-TF5-B', 'R134a', 'LT', 'Scroll',
   60, 6.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB45KCE_TF5_B_R134a_60Hz', 'Copeland', 'ZB45KCE-TF5-B', 'R134a', 'LT', 'Scroll',
   60, 5.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB56KCE_TWC_B_R134a_60Hz', 'Copeland', 'ZB56KCE-TWC-B', 'R134a', 'LT', 'Scroll',
   60, 7.7, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF09K4E_TF5_R134a_60Hz', 'Copeland', 'ZF09K4E-TF5', 'R134a', 'LT', 'Scroll',
   60, 10.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF24K4E_TWC_B_R134a_60Hz', 'Copeland', 'ZF24K4E-TWC-B', 'R134a', 'LT', 'Scroll',
   60, 7.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB75KCE_TWC_B_R134a_60Hz', 'Copeland', 'ZB75KCE-TWC-B', 'R134a', 'LT', 'Scroll',
   60, 10.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF33K4E_TWC_B_R134a_60Hz', 'Copeland', 'ZF33K4E-TWC-B', 'R134a', 'LT', 'Scroll',
   60, 10.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB92KCE_TWC_B_R134a_60Hz', 'Copeland', 'ZB92KCE-TWC-B', 'R134a', 'LT', 'Scroll',
   60, 13.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF40K4E_TWC_B_R134a_60Hz', 'Copeland', 'ZF40K4E-TWC-B', 'R134a', 'LT', 'Scroll',
   60, 12.6, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB11MCE_TWC_B_R134a_60Hz', 'Copeland', 'ZB11MCE-TWC-B', 'R134a', 'LT', 'Scroll',
   60, 16.2, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF48K4E_TWC_B_R134a_60Hz', 'Copeland', 'ZF48K4E-TWC-B', 'R134a', 'LT', 'Scroll',
   60, 15.2, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF11K4E_TF5_R134a_60Hz', 'Copeland', 'ZF11K4E-TF5', 'R134a', 'LT', 'Scroll',
   60, 12.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB30KCE_TF5_R134a_60Hz', 'Copeland', 'ZB30KCE-TF5', 'R134a', 'LT', 'Scroll',
   60, 14.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS30K4E_TF5_R134a_60Hz', 'Copeland', 'ZS30K4E-TF5', 'R134a', 'LT', 'Scroll',
   60, 14.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF13K4E_TF5_R134a_60Hz', 'Copeland', 'ZF13K4E-TF5', 'R134a', 'LT', 'Scroll',
   60, 14.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS38K4E_TF5_R134a_60Hz', 'Copeland', 'ZS38K4E-TF5', 'R134a', 'LT', 'Scroll',
   60, 17.2, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR94KC_TF7_R134a_60Hz', 'Copeland', 'ZR94KC-TF7', 'R134a', 'MT', 'Scroll',
   60, 28.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB30KCE_TF7_R134a_60Hz', 'Copeland', 'ZB30KCE-TF7', 'R134a', 'MT', 'Scroll',
   60, 14.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS30K4E_TF7_R134a_60Hz', 'Copeland', 'ZS30K4E-TF7', 'R134a', 'MT', 'Scroll',
   60, 14.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF13K4E_TF7_R134a_60Hz', 'Copeland', 'ZF13K4E-TF7', 'R134a', 'MT', 'Scroll',
   60, 14.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS38K4E_TF7_R134a_60Hz', 'Copeland', 'ZS38K4E-TF7', 'R134a', 'MT', 'Scroll',
   60, 17.2, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB38KCE_TF7_R134a_60Hz', 'Copeland', 'ZB38KCE-TF7', 'R134a', 'MT', 'Scroll',
   60, 17.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF15K4E_TF7_R134a_60Hz', 'Copeland', 'ZF15K4E-TF7', 'R134a', 'MT', 'Scroll',
   60, 17.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB45KQE_TF7_R134a_60Hz', 'Copeland', 'ZB45KQE-TF7', 'R134a', 'MT', 'Scroll',
   60, 21.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF18K4E_TF7_R134a_60Hz', 'Copeland', 'ZF18K4E-TF7', 'R134a', 'MT', 'Scroll',
   60, 21.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS45K4E_TF7_R134a_60Hz', 'Copeland', 'ZS45K4E-TF7', 'R134a', 'MT', 'Scroll',
   60, 20.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB56KCE_TW7_R134a_60Hz', 'Copeland', 'ZB56KCE-TW7', 'R134a', 'MT', 'Scroll',
   60, 25.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR108KC_TF7_R134a_60Hz', 'Copeland', 'ZR108KC-TF7', 'R134a', 'MT', 'Scroll',
   60, 31.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF24K4E_TW7_R134a_60Hz', 'Copeland', 'ZF24K4E-TW7', 'R134a', 'MT', 'Scroll',
   60, 26.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS56K4E_TW7_R134a_60Hz', 'Copeland', 'ZS56K4E-TW7', 'R134a', 'MT', 'Scroll',
   60, 25.6, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB75KCE_TW7_R134a_60Hz', 'Copeland', 'ZB75KCE-TW7', 'R134a', 'MT', 'Scroll',
   60, 34.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF33K4E_TW7_R134a_60Hz', 'Copeland', 'ZF33K4E-TW7', 'R134a', 'MT', 'Scroll',
   60, 34.6, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS75K4E_TW7_R134a_60Hz', 'Copeland', 'ZS75K4E-TW7', 'R134a', 'MT', 'Scroll',
   60, 34.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB92KCE_TW7_R134a_60Hz', 'Copeland', 'ZB92KCE-TW7', 'R134a', 'MT', 'Scroll',
   60, 43.7, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS92K4E_TW7_R134a_60Hz', 'Copeland', 'ZS92K4E-TW7', 'R134a', 'MT', 'Scroll',
   60, 45.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF40K4E_TW7_R134a_60Hz', 'Copeland', 'ZF40K4E-TW7', 'R134a', 'MT', 'Scroll',
   60, 44.9, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS11M4E_TW7_R134a_60Hz', 'Copeland', 'ZS11M4E-TW7', 'R134a', 'MT', 'Scroll',
   60, 50.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB11MCE_TW7_R134a_60Hz', 'Copeland', 'ZB11MCE-TW7', 'R134a', 'MT', 'Scroll',
   60, 53.2, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR125KC_TF7_R134a_60Hz', 'Copeland', 'ZR125KC-TF7', 'R134a', 'MT', 'Scroll',
   60, 37.2, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF48K4E_TW7_R134a_60Hz', 'Copeland', 'ZF48K4E-TW7', 'R134a', 'MT', 'Scroll',
   60, 51.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF13K4E_TF7_B_R134a_60Hz', 'Copeland', 'ZF13K4E-TF7-B', 'R134a', 'MT', 'Scroll',
   60, 4.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF15K4E_TF7_B_R134a_60Hz', 'Copeland', 'ZF15K4E-TF7-B', 'R134a', 'MT', 'Scroll',
   60, 5.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF18K4E_TF7_B_R134a_60Hz', 'Copeland', 'ZF18K4E-TF7-B', 'R134a', 'MT', 'Scroll',
   60, 6.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB56KCE_TW7_B_R134a_60Hz', 'Copeland', 'ZB56KCE-TW7-B', 'R134a', 'MT', 'Scroll',
   60, 7.7, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF24K4E_TW7_B_R134a_60Hz', 'Copeland', 'ZF24K4E-TW7-B', 'R134a', 'MT', 'Scroll',
   60, 7.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB75KCE_TW7_B_R134a_60Hz', 'Copeland', 'ZB75KCE-TW7-B', 'R134a', 'MT', 'Scroll',
   60, 10.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF33K4E_TW7_B_R134a_60Hz', 'Copeland', 'ZF33K4E-TW7-B', 'R134a', 'MT', 'Scroll',
   60, 10.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB92KCE_TW7_B_R134a_60Hz', 'Copeland', 'ZB92KCE-TW7-B', 'R134a', 'MT', 'Scroll',
   60, 13.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR144KC_TF7_R134a_60Hz', 'Copeland', 'ZR144KC-TF7', 'R134a', 'MT', 'Scroll',
   60, 43.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF40K4E_TW7_B_R134a_60Hz', 'Copeland', 'ZF40K4E-TW7-B', 'R134a', 'MT', 'Scroll',
   60, 12.6, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB11MCE_TW7_B_R134a_60Hz', 'Copeland', 'ZB11MCE-TW7-B', 'R134a', 'MT', 'Scroll',
   60, 16.2, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF48K4E_TW7_B_R134a_60Hz', 'Copeland', 'ZF48K4E-TW7-B', 'R134a', 'MT', 'Scroll',
   60, 15.2, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR160KC_TF7_R134a_60Hz', 'Copeland', 'ZR160KC-TF7', 'R134a', 'MT', 'Scroll',
   60, 45.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR190KC_TW7_R134a_60Hz', 'Copeland', 'ZR190KC-TW7', 'R134a', 'MT', 'Scroll',
   60, 55.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB21KQE_TF7_R134a_60Hz', 'Copeland', 'ZB21KQE-TF7', 'R134a', 'MT', 'Scroll',
   60, 10.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB220KCE_TWM_R507A_60Hz', 'Copeland', 'ZB220KCE-TWM', 'R507A', 'HT', 'Scroll',
   60, 94.7, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF06K4E_TFD_B_R507A_60Hz', 'Copeland', 'ZF06K4E-TFD-B', 'R507A', 'HT', 'Scroll',
   60, 2.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF09K4E_TFD_B_R507A_60Hz', 'Copeland', 'ZF09K4E-TFD-B', 'R507A', 'HT', 'Scroll',
   60, 2.6, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZF11K4E_TFD_B_R507A_60Hz', 'Copeland', 'ZF11K4E-TFD-B', 'R507A', 'HT', 'Scroll',
   60, 3.3, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZF13K4E_TFD_B_R507A_60Hz', 'Copeland', 'ZF13K4E-TFD-B', 'R507A', 'HT', 'Scroll',
   60, 3.9, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZF15K4E_TFD_B_R507A_60Hz', 'Copeland', 'ZF15K4E-TFD-B', 'R507A', 'HT', 'Scroll',
   60, 4.8, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZF18K4E_TFD_B_R507A_60Hz', 'Copeland', 'ZF18K4E-TFD-B', 'R507A', 'HT', 'Scroll',
   60, 5.7, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZF24K4E_TWD_B_R507A_60Hz', 'Copeland', 'ZF24K4E-TWD-B', 'R507A', 'HT', 'Scroll',
   60, 6.9, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZF33K4E_TWD_B_R507A_60Hz', 'Copeland', 'ZF33K4E-TWD-B', 'R507A', 'HT', 'Scroll',
   60, 9.9, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZF40K4E_TWD_B_R507A_60Hz', 'Copeland', 'ZF40K4E-TWD-B', 'R507A', 'HT', 'Scroll',
   60, 12.0, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZF48K4E_TWD_B_R507A_60Hz', 'Copeland', 'ZF48K4E-TWD-B', 'R507A', 'HT', 'Scroll',
   60, 14.6, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZBD30KCE_TFD_R507A_60Hz', 'Copeland', 'ZBD30KCE-TFD', 'R507A', 'HT', 'Scroll',
   60, 12.4, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZFD18KVE_TFD_EVI_R507A_60Hz', 'Copeland', 'ZFD18KVE-TFD EVI', 'R507A', 'HT', 'Scroll',
   60, 22.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZBD45KCE_TFD_R507A_60Hz', 'Copeland', 'ZBD45KCE-TFD', 'R507A', 'HT', 'Scroll',
   60, 18.1, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZF09K4E_TF5_R507A_60Hz', 'Copeland', 'ZF09K4E-TF5', 'R507A', 'LT', 'Scroll',
   60, 10.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF18K4E_TF5_R507A_60Hz', 'Copeland', 'ZF18K4E-TF5', 'R507A', 'LT', 'Scroll',
   60, 22.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS45K4E_TF5_R507A_60Hz', 'Copeland', 'ZS45K4E-TF5', 'R507A', 'LT', 'Scroll',
   60, 22.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB56KCE_TWC_R507A_60Hz', 'Copeland', 'ZB56KCE-TWC', 'R507A', 'LT', 'Scroll',
   60, 25.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF24K4E_TWC_R507A_60Hz', 'Copeland', 'ZF24K4E-TWC', 'R507A', 'LT', 'Scroll',
   60, 27.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS56K4E_TWC_R507A_60Hz', 'Copeland', 'ZS56K4E-TWC', 'R507A', 'LT', 'Scroll',
   60, 26.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB75KCE_TWC_R507A_60Hz', 'Copeland', 'ZB75KCE-TWC', 'R507A', 'LT', 'Scroll',
   60, 36.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF33K4E_TWC_R507A_60Hz', 'Copeland', 'ZF33K4E-TWC', 'R507A', 'LT', 'Scroll',
   60, 37.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS75K4E_TWC_R507A_60Hz', 'Copeland', 'ZS75K4E-TWC', 'R507A', 'LT', 'Scroll',
   60, 37.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB92KCE_TWC_R507A_60Hz', 'Copeland', 'ZB92KCE-TWC', 'R507A', 'LT', 'Scroll',
   60, 45.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS92K4E_TWC_R507A_60Hz', 'Copeland', 'ZS92K4E-TWC', 'R507A', 'LT', 'Scroll',
   60, 46.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF11K4E_TF5_R507A_60Hz', 'Copeland', 'ZF11K4E-TF5', 'R507A', 'LT', 'Scroll',
   60, 12.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF40K4E_TWC_R507A_60Hz', 'Copeland', 'ZF40K4E-TWC', 'R507A', 'LT', 'Scroll',
   60, 46.2, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS11M4E_TWC_R507A_60Hz', 'Copeland', 'ZS11M4E-TWC', 'R507A', 'LT', 'Scroll',
   60, 52.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB11MCE_TWC_R507A_60Hz', 'Copeland', 'ZB11MCE-TWC', 'R507A', 'LT', 'Scroll',
   60, 55.7, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF48K4E_TWC_R507A_60Hz', 'Copeland', 'ZF48K4E-TWC', 'R507A', 'LT', 'Scroll',
   60, 56.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF13KVE_TF5_EVI_R507A_60Hz', 'Copeland', 'ZF13KVE-TF5 EVI', 'R507A', 'LT', 'Scroll',
   60, 19.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF18KVE_TF5_EVI_R507A_60Hz', 'Copeland', 'ZF18KVE-TF5 EVI', 'R507A', 'LT', 'Scroll',
   60, 24.9, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF24KVE_TWC_EVI_R507A_60Hz', 'Copeland', 'ZF24KVE-TWC EVI', 'R507A', 'LT', 'Scroll',
   60, 32.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF33KVE_TWC_EVI_R507A_60Hz', 'Copeland', 'ZF33KVE-TWC EVI', 'R507A', 'LT', 'Scroll',
   60, 44.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF40KVE_TWC_EVI_R507A_60Hz', 'Copeland', 'ZF40KVE-TWC EVI', 'R507A', 'LT', 'Scroll',
   60, 55.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF48KVE_TWC_EVI_R507A_60Hz', 'Copeland', 'ZF48KVE-TWC EVI', 'R507A', 'LT', 'Scroll',
   60, 60.9, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB30KCE_TF5_R507A_60Hz', 'Copeland', 'ZB30KCE-TF5', 'R507A', 'LT', 'Scroll',
   60, 15.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB15KCE_TF5_B_R507A_60Hz', 'Copeland', 'ZB15KCE-TF5-B', 'R507A', 'LT', 'Scroll',
   60, 2.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB19KCE_TF5_B_R507A_60Hz', 'Copeland', 'ZB19KCE-TF5-B', 'R507A', 'LT', 'Scroll',
   60, 2.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF09K4E_TF5_B_R507A_60Hz', 'Copeland', 'ZF09K4E-TF5-B', 'R507A', 'LT', 'Scroll',
   60, 3.2, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB21KCE_TF5_B_R507A_60Hz', 'Copeland', 'ZB21KCE-TF5-B', 'R507A', 'LT', 'Scroll',
   60, 3.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB26KCE_TF5_B_R507A_60Hz', 'Copeland', 'ZB26KCE-TF5-B', 'R507A', 'LT', 'Scroll',
   60, 3.9, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF11K4E_TF5_B_R507A_60Hz', 'Copeland', 'ZF11K4E-TF5-B', 'R507A', 'LT', 'Scroll',
   60, 3.9, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF13K4E_TF5_B_R507A_60Hz', 'Copeland', 'ZF13K4E-TF5-B', 'R507A', 'LT', 'Scroll',
   60, 4.7, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB30KCE_TF5_B_R507A_60Hz', 'Copeland', 'ZB30KCE-TF5-B', 'R507A', 'LT', 'Scroll',
   60, 4.6, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB38KCE_TF5_B_R507A_60Hz', 'Copeland', 'ZB38KCE-TF5-B', 'R507A', 'LT', 'Scroll',
   60, 5.7, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF15K4E_TF5_B_R507A_60Hz', 'Copeland', 'ZF15K4E-TF5-B', 'R507A', 'LT', 'Scroll',
   60, 5.7, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS30K4E_TF5_R507A_60Hz', 'Copeland', 'ZS30K4E-TF5', 'R507A', 'LT', 'Scroll',
   60, 14.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF18K4E_TF5_B_R507A_60Hz', 'Copeland', 'ZF18K4E-TF5-B', 'R507A', 'LT', 'Scroll',
   60, 6.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB45KCE_TF5_B_R507A_60Hz', 'Copeland', 'ZB45KCE-TF5-B', 'R507A', 'LT', 'Scroll',
   60, 6.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB56KCE_TWC_B_R507A_60Hz', 'Copeland', 'ZB56KCE-TWC-B', 'R507A', 'LT', 'Scroll',
   60, 7.9, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF24K4E_TWC_B_R507A_60Hz', 'Copeland', 'ZF24K4E-TWC-B', 'R507A', 'LT', 'Scroll',
   60, 8.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB75KCE_TWC_B_R507A_60Hz', 'Copeland', 'ZB75KCE-TWC-B', 'R507A', 'LT', 'Scroll',
   60, 11.6, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF33K4E_TWC_B_R507A_60Hz', 'Copeland', 'ZF33K4E-TWC-B', 'R507A', 'LT', 'Scroll',
   60, 11.9, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB92KCE_TWC_B_R507A_60Hz', 'Copeland', 'ZB92KCE-TWC-B', 'R507A', 'LT', 'Scroll',
   60, 14.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF40K4E_TWC_B_R507A_60Hz', 'Copeland', 'ZF40K4E-TWC-B', 'R507A', 'LT', 'Scroll',
   60, 14.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB11MCE_TWC_B_R507A_60Hz', 'Copeland', 'ZB11MCE-TWC-B', 'R507A', 'LT', 'Scroll',
   60, 18.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF13K4E_TF5_R507A_60Hz', 'Copeland', 'ZF13K4E-TF5', 'R507A', 'LT', 'Scroll',
   60, 14.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF48K4E_TWC_B_R507A_60Hz', 'Copeland', 'ZF48K4E-TWC-B', 'R507A', 'LT', 'Scroll',
   60, 17.6, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS38K4E_TF5_R507A_60Hz', 'Copeland', 'ZS38K4E-TF5', 'R507A', 'LT', 'Scroll',
   60, 18.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB38KCE_TF5_R507A_60Hz', 'Copeland', 'ZB38KCE-TF5', 'R507A', 'LT', 'Scroll',
   60, 18.6, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF15K4E_TF5_R507A_60Hz', 'Copeland', 'ZF15K4E-TF5', 'R507A', 'LT', 'Scroll',
   60, 18.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB45KCE_TF5_R507A_60Hz', 'Copeland', 'ZB45KCE-TF5', 'R507A', 'LT', 'Scroll',
   60, 21.9, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB21KQE_TF7_R507A_60Hz', 'Copeland', 'ZB21KQE-TF7', 'R507A', 'MT', 'Scroll',
   60, 11.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS45K4E_TF7_R507A_60Hz', 'Copeland', 'ZS45K4E-TF7', 'R507A', 'MT', 'Scroll',
   60, 22.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB56KCE_TW7_R507A_60Hz', 'Copeland', 'ZB56KCE-TW7', 'R507A', 'MT', 'Scroll',
   60, 25.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF24K4E_TW7_R507A_60Hz', 'Copeland', 'ZF24K4E-TW7', 'R507A', 'MT', 'Scroll',
   60, 27.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS56K4E_TW7_R507A_60Hz', 'Copeland', 'ZS56K4E-TW7', 'R507A', 'MT', 'Scroll',
   60, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB75KCE_TW7_R507A_60Hz', 'Copeland', 'ZB75KCE-TW7', 'R507A', 'MT', 'Scroll',
   60, 36.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF33K4E_TW7_R507A_60Hz', 'Copeland', 'ZF33K4E-TW7', 'R507A', 'MT', 'Scroll',
   60, 37.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS75K4E_TW7_R507A_60Hz', 'Copeland', 'ZS75K4E-TW7', 'R507A', 'MT', 'Scroll',
   60, 37.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB92KCE_TW7_R507A_60Hz', 'Copeland', 'ZB92KCE-TW7', 'R507A', 'MT', 'Scroll',
   60, 45.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS92K4E_TW7_R507A_60Hz', 'Copeland', 'ZS92K4E-TW7', 'R507A', 'MT', 'Scroll',
   60, 46.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF40K4E_TW7_R507A_60Hz', 'Copeland', 'ZF40K4E-TW7', 'R507A', 'MT', 'Scroll',
   60, 46.2, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB30KCE_TF7_R507A_60Hz', 'Copeland', 'ZB30KCE-TF7', 'R507A', 'MT', 'Scroll',
   60, 15.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS11M4E_TW7_R507A_60Hz', 'Copeland', 'ZS11M4E-TW7', 'R507A', 'MT', 'Scroll',
   60, 52.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB11MCE_TW7_R507A_60Hz', 'Copeland', 'ZB11MCE-TW7', 'R507A', 'MT', 'Scroll',
   60, 55.7, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF48K4E_TW7_R507A_60Hz', 'Copeland', 'ZF48K4E-TW7', 'R507A', 'MT', 'Scroll',
   60, 52.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF13KVE_TF7_EVI_R507A_60Hz', 'Copeland', 'ZF13KVE-TF7 EVI', 'R507A', 'MT', 'Scroll',
   60, 19.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF24KVE_TW7_EVI_R507A_60Hz', 'Copeland', 'ZF24KVE-TW7 EVI', 'R507A', 'MT', 'Scroll',
   60, 32.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF33KVE_TW7_EVI_R507A_60Hz', 'Copeland', 'ZF33KVE-TW7 EVI', 'R507A', 'MT', 'Scroll',
   60, 44.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF40KVE_TW7_EVI_R507A_60Hz', 'Copeland', 'ZF40KVE-TW7 EVI', 'R507A', 'MT', 'Scroll',
   60, 55.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF48KVE_TW7_EVI_R507A_60Hz', 'Copeland', 'ZF48KVE-TW7 EVI', 'R507A', 'MT', 'Scroll',
   60, 52.1, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF13K4E_TF7_B_R507A_60Hz', 'Copeland', 'ZF13K4E-TF7-B', 'R507A', 'MT', 'Scroll',
   60, 4.7, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF15K4E_TF7_B_R507A_60Hz', 'Copeland', 'ZF15K4E-TF7-B', 'R507A', 'MT', 'Scroll',
   60, 5.7, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS30K4E_TF7_R507A_60Hz', 'Copeland', 'ZS30K4E-TF7', 'R507A', 'MT', 'Scroll',
   60, 14.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF18K4E_TF7_B_R507A_60Hz', 'Copeland', 'ZF18K4E-TF7-B', 'R507A', 'MT', 'Scroll',
   60, 6.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB56KCE_TW7_B_R507A_60Hz', 'Copeland', 'ZB56KCE-TW7-B', 'R507A', 'MT', 'Scroll',
   60, 7.9, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF24K4E_TW7_B_R507A_60Hz', 'Copeland', 'ZF24K4E-TW7-B', 'R507A', 'MT', 'Scroll',
   60, 8.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB75KCE_TW7_B_R507A_60Hz', 'Copeland', 'ZB75KCE-TW7-B', 'R507A', 'MT', 'Scroll',
   60, 11.6, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF33K4E_TW7_B_R507A_60Hz', 'Copeland', 'ZF33K4E-TW7-B', 'R507A', 'MT', 'Scroll',
   60, 11.9, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB92KCE_TW7_B_R507A_60Hz', 'Copeland', 'ZB92KCE-TW7-B', 'R507A', 'MT', 'Scroll',
   60, 14.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF40K4E_TW7_B_R507A_60Hz', 'Copeland', 'ZF40K4E-TW7-B', 'R507A', 'MT', 'Scroll',
   60, 14.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB11MCE_TW7_B_R507A_60Hz', 'Copeland', 'ZB11MCE-TW7-B', 'R507A', 'MT', 'Scroll',
   60, 18.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF13K4E_TF7_R507A_60Hz', 'Copeland', 'ZF13K4E-TF7', 'R507A', 'MT', 'Scroll',
   60, 14.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF48K4E_TW7_B_R507A_60Hz', 'Copeland', 'ZF48K4E-TW7-B', 'R507A', 'MT', 'Scroll',
   60, 17.6, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZS38K4E_TF7_R507A_60Hz', 'Copeland', 'ZS38K4E-TF7', 'R507A', 'MT', 'Scroll',
   60, 18.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB38KCE_TF7_R507A_60Hz', 'Copeland', 'ZB38KCE-TF7', 'R507A', 'MT', 'Scroll',
   60, 18.6, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF15K4E_TF7_R507A_60Hz', 'Copeland', 'ZF15K4E-TF7', 'R507A', 'MT', 'Scroll',
   60, 18.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZB45KQE_TF7_R507A_60Hz', 'Copeland', 'ZB45KQE-TF7', 'R507A', 'MT', 'Scroll',
   60, 21.9, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZF18K4E_TF7_R507A_60Hz', 'Copeland', 'ZF18K4E-TF7', 'R507A', 'MT', 'Scroll',
   60, 22.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR61KCE_PFZ_R410A_60Hz', 'Copeland', 'ZR61KCE-PFZ', 'R410A', 'HT', 'Scroll',
   60, 14.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR108KCE_TFD_R410A_60Hz', 'Copeland', 'ZR108KCE-TFD', 'R410A', 'HT', 'Scroll',
   60, 25.7, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZR125KCE_TFD_R410A_60Hz', 'Copeland', 'ZR125KCE-TFD', 'R410A', 'HT', 'Scroll',
   60, 30.0, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZR144KCE_TFD_R410A_60Hz', 'Copeland', 'ZR144KCE-TFD', 'R410A', 'HT', 'Scroll',
   60, 34.3, -20.0, 15.0, 35.0, 65.0, 3)
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
  ('COPELAND_ZR160KCE_TFD_R410A_60Hz', 'Copeland', 'ZR160KCE-TFD', 'R410A', 'HT', 'Scroll',
   60, 38.0, -20.0, 15.0, 35.0, 65.0, 3)
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
  ('COPELAND_ZR190KCE_TFD_R410A_60Hz', 'Copeland', 'ZR190KCE-TFD', 'R410A', 'HT', 'Scroll',
   60, 43.8, -20.0, 15.0, 35.0, 65.0, 3)
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
  ('COPELAND_ZR620KCE_FWM_R410A_60Hz', 'Copeland', 'ZR620KCE-FWM', 'R410A', 'HT', 'Scroll',
   60, 151.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR760KCE_FWM_R410A_60Hz', 'Copeland', 'ZR760KCE-FWM', 'R410A', 'HT', 'Scroll',
   60, 180.5, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZBH30KJE_TFD_R410A_60Hz', 'Copeland', 'ZBH30KJE-TFD', 'R410A', 'HT', 'Scroll',
   60, 11.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZRH49KJE_TFD_R410A_60Hz', 'Copeland', 'ZRH49KJE-TFD', 'R410A', 'HT', 'Scroll',
   60, 11.0, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZBH38KJE_TFD_R410A_60Hz', 'Copeland', 'ZBH38KJE-TFD', 'R410A', 'HT', 'Scroll',
   60, 13.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZRH61KJE_TFD_R410A_60Hz', 'Copeland', 'ZRH61KJE-TFD', 'R410A', 'HT', 'Scroll',
   60, 13.8, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZBH45KJE_TFD_R410A_60Hz', 'Copeland', 'ZBH45KJE-TFD', 'R410A', 'HT', 'Scroll',
   60, 16.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZBHV45KJE_TFD_R410A_60Hz', 'Copeland', 'ZBHV45KJE-TFD', 'R410A', 'HT', 'Scroll',
   60, 16.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZRH72KJE_TFD_R410A_60Hz', 'Copeland', 'ZRH72KJE-TFD', 'R410A', 'HT', 'Scroll',
   60, 16.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZRHV72KJE_TFD_R410A_60Hz', 'Copeland', 'ZRHV72KJE-TFD', 'R410A', 'HT', 'Scroll',
   60, 16.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR61KSE_TFM_R410A_60Hz', 'Copeland', 'ZR61KSE-TFM', 'R410A', 'HT', 'Scroll',
   60, 14.4, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR94KCE_TFD_R410A_60Hz', 'Copeland', 'ZR94KCE-TFD', 'R410A', 'HT', 'Scroll',
   60, 22.8, -20.0, 15.0, 35.0, 65.0, 3)
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
  ('COPELAND_ZR94KCE_TF5_R410A_60Hz', 'Copeland', 'ZR94KCE-TF5', 'R410A', 'LT', 'Scroll',
   60, 27.3, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR160KCE_TW5_R410A_60Hz', 'Copeland', 'ZR160KCE-TW5', 'R410A', 'LT', 'Scroll',
   60, 45.2, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR190KCE_TW5_R410A_60Hz', 'Copeland', 'ZR190KCE-TW5', 'R410A', 'LT', 'Scroll',
   60, 52.9, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR94KCE_TF7_R410A_60Hz', 'Copeland', 'ZR94KCE-TF7', 'R410A', 'MT', 'Scroll',
   60, 27.3, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZR108KCE_TF7_R410A_60Hz', 'Copeland', 'ZR108KCE-TF7', 'R410A', 'MT', 'Scroll',
   60, 30.5, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZR125KCE_TF7_R410A_60Hz', 'Copeland', 'ZR125KCE-TF7', 'R410A', 'MT', 'Scroll',
   60, 36.2, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZR144KCE_TF7_R410A_60Hz', 'Copeland', 'ZR144KCE-TF7', 'R410A', 'MT', 'Scroll',
   60, 41.3, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('COPELAND_ZR160KCE_TF7_R410A_60Hz', 'Copeland', 'ZR160KCE-TF7', 'R410A', 'MT', 'Scroll',
   60, 45.2, -20.0, 15.0, 35.0, 65.0, 1)
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
  ('COPELAND_ZR190KCE_TW7_R410A_60Hz', 'Copeland', 'ZR190KCE-TW7', 'R410A', 'MT', 'Scroll',
   60, 52.9, -20.0, 15.0, 35.0, 65.0, 2)
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
  ('MANEUROP_SH090_R407C_50Hz', 'Maneurop', 'SH090', 'R407C', 'HT', 'Scroll',
   50, 18.3, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_SH120_R407C_50Hz', 'Maneurop', 'SH120', 'R407C', 'HT', 'Scroll',
   50, 24.5, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_SH161_R407C_50Hz', 'Maneurop', 'SH161', 'R407C', 'HT', 'Scroll',
   50, 31.8, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_SH180_R407C_50Hz', 'Maneurop', 'SH180', 'R407C', 'HT', 'Scroll',
   50, 35.9, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_SH240_R407C_50Hz', 'Maneurop', 'SH240', 'R407C', 'HT', 'Scroll',
   50, 49.5, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_SH300_R407C_50Hz', 'Maneurop', 'SH300', 'R407C', 'HT', 'Scroll',
   50, 63.5, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_SH380_R407C_50Hz', 'Maneurop', 'SH380', 'R407C', 'HT', 'Scroll',
   50, 74.3, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_HRH029_R407C_50Hz', 'Maneurop', 'HRH029', 'R407C', 'HT', 'Scroll',
   50, 5.98, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_HRH031_R407C_50Hz', 'Maneurop', 'HRH031', 'R407C', 'HT', 'Scroll',
   50, 6.65, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_HRH036_R407C_50Hz', 'Maneurop', 'HRH036', 'R407C', 'HT', 'Scroll',
   50, 7.59, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_HRH040_R407C_50Hz', 'Maneurop', 'HRH040', 'R407C', 'HT', 'Scroll',
   50, 8.6, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_HRH049_R407C_50Hz', 'Maneurop', 'HRH049', 'R407C', 'HT', 'Scroll',
   50, 10.35, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_HRH054_R407C_50Hz', 'Maneurop', 'HRH054', 'R407C', 'HT', 'Scroll',
   50, 11.41, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_HLH061_R407C_50Hz', 'Maneurop', 'HLH061', 'R407C', 'HT', 'Scroll',
   50, 12.7, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_HLJ072_R407C_50Hz', 'Maneurop', 'HLJ072', 'R407C', 'HT', 'Scroll',
   50, 15.26, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_HLJ083_R407C_50Hz', 'Maneurop', 'HLJ083', 'R407C', 'HT', 'Scroll',
   50, 17.48, -15.0, 12.0, 30.0, 60.0, 1)
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
  ('MANEUROP_HCJ090_R407C_50Hz', 'Maneurop', 'HCJ090', 'R407C', 'HT', 'Scroll',
   50, 19.13, -15.0, 12.0, 30.0, 60.0, 1)
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
