-- Part 2/8: rows 201–400

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZRU350K3E_TWD_R134a_60Hz', 'Copeland', 'ZRU350K3E-TWD', 'R134a', 'HT', 'Scroll',
   60, 82.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZRU350K3_TWD_R134a_60Hz', 'Copeland', 'ZRU350K3-TWD', 'R134a', 'HT', 'Scroll',
   60, 82.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZRT380K3E_TWD_R134a_60Hz', 'Copeland', 'ZRT380K3E-TWD', 'R134a', 'HT', 'Scroll',
   60, 90.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZRT380K3_TWD_R134a_60Hz', 'Copeland', 'ZRT380K3-TWD', 'R134a', 'HT', 'Scroll',
   60, 90.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB15KCE_TFD_R134a_60Hz', 'Copeland', 'ZB15KCE-TFD', 'R134a', 'HT', 'Scroll',
   60, 6.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB19KCE_TFD_R134a_60Hz', 'Copeland', 'ZB19KCE-TFD', 'R134a', 'HT', 'Scroll',
   60, 6.900000095367432, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS21K4E_TFD_R134a_60Hz', 'Copeland', 'ZS21K4E-TFD', 'R134a', 'HT', 'Scroll',
   60, 8.199999809265137, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF09K4E_TFD_R134a_60Hz', 'Copeland', 'ZF09K4E-TFD', 'R134a', 'HT', 'Scroll',
   60, 8.4, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB21KCE_TFD_R134a_60Hz', 'Copeland', 'ZB21KCE-TFD', 'R134a', 'HT', 'Scroll',
   60, 8.699999809265137, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB21KC_TFD_R134a_60Hz', 'Copeland', 'ZB21KC-TFD', 'R134a', 'HT', 'Scroll',
   60, 8.7, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB26KCE_TFD_R134a_60Hz', 'Copeland', 'ZB26KCE-TFD', 'R134a', 'HT', 'Scroll',
   60, 9.699999809265137, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS26K4E_TFD_R134a_60Hz', 'Copeland', 'ZS26K4E-TFD', 'R134a', 'HT', 'Scroll',
   60, 10.2, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF11K4E_TFD_R134a_60Hz', 'Copeland', 'ZF11K4E-TFD', 'R134a', 'HT', 'Scroll',
   60, 10.3, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS30K4E_TFD_R134a_60Hz', 'Copeland', 'ZS30K4E-TFD', 'R134a', 'HT', 'Scroll',
   60, 11.60000038146973, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB30KCE_TFD_R134a_60Hz', 'Copeland', 'ZB30KCE-TFD', 'R134a', 'HT', 'Scroll',
   60, 11.7, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF13K4E_TFD_R134a_60Hz', 'Copeland', 'ZF13K4E-TFD', 'R134a', 'HT', 'Scroll',
   60, 12.1, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS38K4E_TFD_R134a_60Hz', 'Copeland', 'ZS38K4E-TFD', 'R134a', 'HT', 'Scroll',
   60, 14.30000019073486, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB38KCE_TFD_R134a_60Hz', 'Copeland', 'ZB38KCE-TFD', 'R134a', 'HT', 'Scroll',
   60, 14.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF15K4E_TFD_R134a_60Hz', 'Copeland', 'ZF15K4E-TFD', 'R134a', 'HT', 'Scroll',
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
  ('COPELAND_ZS45K4E_TFD_R134a_60Hz', 'Copeland', 'ZS45K4E-TFD', 'R134a', 'HT', 'Scroll',
   60, 17.29999923706055, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB45KCE_TFD_R134a_60Hz', 'Copeland', 'ZB45KCE-TFD', 'R134a', 'HT', 'Scroll',
   60, 17.6, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF18K4E_TFD_R134a_60Hz', 'Copeland', 'ZF18K4E-TFD', 'R134a', 'HT', 'Scroll',
   60, 17.60000038146973, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB56KCE_TWD_R134a_60Hz', 'Copeland', 'ZB56KCE-TWD', 'R134a', 'HT', 'Scroll',
   60, 21.3, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS56K4E_TWD_R134a_60Hz', 'Copeland', 'ZS56K4E-TWD', 'R134a', 'HT', 'Scroll',
   60, 21.29999923706055, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF24K4E_TWD_R134a_60Hz', 'Copeland', 'ZF24K4E-TWD', 'R134a', 'HT', 'Scroll',
   60, 21.70000076293945, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS75K4E_TWD_R134a_60Hz', 'Copeland', 'ZS75K4E-TWD', 'R134a', 'HT', 'Scroll',
   60, 28.29999923706055, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB75KCE_TWD_R134a_60Hz', 'Copeland', 'ZB75KCE-TWD', 'R134a', 'HT', 'Scroll',
   60, 28.6, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF33K4E_TWD_R134a_60Hz', 'Copeland', 'ZF33K4E-TWD', 'R134a', 'HT', 'Scroll',
   60, 28.89999961853027, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB92KCE_TWD_R134a_60Hz', 'Copeland', 'ZB92KCE-TWD', 'R134a', 'HT', 'Scroll',
   60, 36.4, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF40K4E_TWD_R134a_60Hz', 'Copeland', 'ZF40K4E-TWD', 'R134a', 'HT', 'Scroll',
   60, 37.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS92K4E_TWD_R134a_60Hz', 'Copeland', 'ZS92K4E-TWD', 'R134a', 'HT', 'Scroll',
   60, 37.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS11M4E_TWD_R134a_60Hz', 'Copeland', 'ZS11M4E-TWD', 'R134a', 'HT', 'Scroll',
   60, 42.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF48K4E_TWD_R134a_60Hz', 'Copeland', 'ZF48K4E-TWD', 'R134a', 'HT', 'Scroll',
   60, 42.6, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB11MCE_TWD_R134a_60Hz', 'Copeland', 'ZB11MCE-TWD', 'R134a', 'HT', 'Scroll',
   60, 44.3, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR18K4_PFJ_R134a_60Hz', 'Copeland', 'ZR18K4-PFJ', 'R134a', 'HT', 'Scroll',
   60, 4.300000190734863, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR22K3E_PFJ_R134a_60Hz', 'Copeland', 'ZR22K3E-PFJ', 'R134a', 'HT', 'Scroll',
   60, 5.3, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR22K3_PFJ_R134a_60Hz', 'Copeland', 'ZR22K3-PFJ', 'R134a', 'HT', 'Scroll',
   60, 5.3, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR28K3E_PFJ_R134a_60Hz', 'Copeland', 'ZR28K3E-PFJ', 'R134a', 'HT', 'Scroll',
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
  ('COPELAND_ZR28K3_PFJ_R134a_60Hz', 'Copeland', 'ZR28K3-PFJ', 'R134a', 'HT', 'Scroll',
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
  ('COPELAND_ZR34K3E_PFJ_R134a_60Hz', 'Copeland', 'ZR34K3E-PFJ', 'R134a', 'HT', 'Scroll',
   60, 8.199999809265137, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR34K3_PFJ_R134a_60Hz', 'Copeland', 'ZR34K3-PFJ', 'R134a', 'HT', 'Scroll',
   60, 8.199999809265137, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR40K3E_PFJ_R134a_60Hz', 'Copeland', 'ZR40K3E-PFJ', 'R134a', 'HT', 'Scroll',
   60, 9.699999809265137, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR40K3_PFJ_R134a_60Hz', 'Copeland', 'ZR40K3-PFJ', 'R134a', 'HT', 'Scroll',
   60, 9.699999809265137, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR48K3_PFJ_R134a_60Hz', 'Copeland', 'ZR48K3-PFJ', 'R134a', 'HT', 'Scroll',
   60, 11.8, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR48K3E_PFJ_R134a_60Hz', 'Copeland', 'ZR48K3E-PFJ', 'R134a', 'HT', 'Scroll',
   60, 11.8, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB19KCE_PFJ_R134a_60Hz', 'Copeland', 'ZB19KCE-PFJ', 'R134a', 'HT', 'Scroll',
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
  ('COPELAND_ZB21KCE_PFJ_R134a_60Hz', 'Copeland', 'ZB21KCE-PFJ', 'R134a', 'HT', 'Scroll',
   60, 8.2, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB26KCE_PFJ_R134a_60Hz', 'Copeland', 'ZB26KCE-PFJ', 'R134a', 'HT', 'Scroll',
   60, 9.699999809265137, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB42KCE_PFJ_R134a_60Hz', 'Copeland', 'ZB42KCE-PFJ', 'R134a', 'HT', 'Scroll',
   60, 16.79999923706055, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR22K3E_TF5_R134a_60Hz', 'Copeland', 'ZR22K3E-TF5', 'R134a', 'HT', 'Scroll',
   60, 5.300000190734863, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR22K3_TF5_R134a_60Hz', 'Copeland', 'ZR22K3-TF5', 'R134a', 'HT', 'Scroll',
   60, 5.300000190734863, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR28K3E_TF5_R134a_60Hz', 'Copeland', 'ZR28K3E-TF5', 'R134a', 'HT', 'Scroll',
   60, 6.900000095367432, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR28K3_TF5_R134a_60Hz', 'Copeland', 'ZR28K3-TF5', 'R134a', 'HT', 'Scroll',
   60, 6.900000095367432, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR34K3E_TF5_R134a_60Hz', 'Copeland', 'ZR34K3E-TF5', 'R134a', 'HT', 'Scroll',
   60, 8.1, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR34K3_TF5_R134a_60Hz', 'Copeland', 'ZR34K3-TF5', 'R134a', 'HT', 'Scroll',
   60, 8.1, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR40K3E_TF5_R134a_60Hz', 'Copeland', 'ZR40K3E-TF5', 'R134a', 'HT', 'Scroll',
   60, 9.6, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR40K3_TF5_R134a_60Hz', 'Copeland', 'ZR40K3-TF5', 'R134a', 'HT', 'Scroll',
   60, 9.6, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR48K3_TF5_R134a_60Hz', 'Copeland', 'ZR48K3-TF5', 'R134a', 'HT', 'Scroll',
   60, 11.80000019073486, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR48K3E_TF5_R134a_60Hz', 'Copeland', 'ZR48K3E-TF5', 'R134a', 'HT', 'Scroll',
   60, 11.80000019073486, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR61KCE_TF5_R134a_60Hz', 'Copeland', 'ZR61KCE-TF5', 'R134a', 'HT', 'Scroll',
   60, 14.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR61KC_TF5_R134a_60Hz', 'Copeland', 'ZR61KC-TF5', 'R134a', 'HT', 'Scroll',
   60, 14.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR72KCE_TF5_R134a_60Hz', 'Copeland', 'ZR72KCE-TF5', 'R134a', 'HT', 'Scroll',
   60, 17.79999923706055, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR72KC_TF5_R134a_60Hz', 'Copeland', 'ZR72KC-TF5', 'R134a', 'HT', 'Scroll',
   60, 17.79999923706055, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR81KCE_TF5_R134a_60Hz', 'Copeland', 'ZR81KCE-TF5', 'R134a', 'HT', 'Scroll',
   60, 19.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR81KC_TF5_R134a_60Hz', 'Copeland', 'ZR81KC-TF5', 'R134a', 'HT', 'Scroll',
   60, 19.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR250KCE_TWC_R134a_60Hz', 'Copeland', 'ZR250KCE-TWC', 'R134a', 'HT', 'Scroll',
   60, 58.6, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR250KC_TWC_R134a_60Hz', 'Copeland', 'ZR250KC-TWC', 'R134a', 'HT', 'Scroll',
   60, 58.6, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR310KC_TWC_R134a_60Hz', 'Copeland', 'ZR310KC-TWC', 'R134a', 'LT', 'Scroll',
   60, 88.9, -20.0, 15.0, 35.0, 65.0, 3)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR90K3E_TW7_R134a_60Hz', 'Copeland', 'ZR90K3E-TW7', 'R134a', 'MT', 'Scroll',
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
  ('COPELAND_ZR90K3_TW7_R134a_60Hz', 'Copeland', 'ZR90K3-TW7', 'R134a', 'MT', 'Scroll',
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
  ('COPELAND_ZR11M3E_TW7_R134a_60Hz', 'Copeland', 'ZR11M3E-TW7', 'R134a', 'MT', 'Scroll',
   60, 31.4, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR11M3_TW7_R134a_60Hz', 'Copeland', 'ZR11M3-TW7', 'R134a', 'MT', 'Scroll',
   60, 31.4, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR12M3E_TW7_R134a_60Hz', 'Copeland', 'ZR12M3E-TW7', 'R134a', 'MT', 'Scroll',
   60, 36.4, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR12M3_TW7_R134a_60Hz', 'Copeland', 'ZR12M3-TW7', 'R134a', 'MT', 'Scroll',
   60, 36.4, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR16M3E_TW7_R134a_60Hz', 'Copeland', 'ZR16M3E-TW7', 'R134a', 'MT', 'Scroll',
   60, 44.6, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR16M3_TW7_R134a_60Hz', 'Copeland', 'ZR16M3-TW7', 'R134a', 'MT', 'Scroll',
   60, 44.6, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR19M3E_TW7_R134a_60Hz', 'Copeland', 'ZR19M3E-TW7', 'R134a', 'MT', 'Scroll',
   60, 54.9, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR19M3_TW7_R134a_60Hz', 'Copeland', 'ZR19M3-TW7', 'R134a', 'MT', 'Scroll',
   60, 54.9, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR250KCE_TW7_R134a_60Hz', 'Copeland', 'ZR250KCE-TW7', 'R134a', 'MT', 'Scroll',
   60, 71.5, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZR250KC_TW7_R134a_60Hz', 'Copeland', 'ZR250KC-TW7', 'R134a', 'MT', 'Scroll',
   60, 71.5, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ090_4_R410A_50Hz', 'Maneurop', 'SZ090-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ110_4_R410A_50Hz', 'Maneurop', 'SZ110-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ125_4_R410A_50Hz', 'Maneurop', 'SZ125-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ160_4_R410A_50Hz', 'Maneurop', 'SZ160-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ185_4_R410A_50Hz', 'Maneurop', 'SZ185-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ240_4_R410A_50Hz', 'Maneurop', 'SZ240-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ300_4_R410A_50Hz', 'Maneurop', 'SZ300-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ380_4_R410A_50Hz', 'Maneurop', 'SZ380-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ084_4_R410A_50Hz', 'Maneurop', 'SZ084-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ100_4_R410A_50Hz', 'Maneurop', 'SZ100-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ115_4_R410A_50Hz', 'Maneurop', 'SZ115-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ120_4_R410A_50Hz', 'Maneurop', 'SZ120-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ148_4_R410A_50Hz', 'Maneurop', 'SZ148-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ161_4_R410A_50Hz', 'Maneurop', 'SZ161-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ175_4_R410A_50Hz', 'Maneurop', 'SZ175-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ170_4_R410A_50Hz', 'Maneurop', 'SZ170-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ180_4_R410A_50Hz', 'Maneurop', 'SZ180-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ200_4_R410A_50Hz', 'Maneurop', 'SZ200-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ220_4_R410A_50Hz', 'Maneurop', 'SZ220-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ230_4_R410A_50Hz', 'Maneurop', 'SZ230-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ242_4_R410A_50Hz', 'Maneurop', 'SZ242-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ250_4_R410A_50Hz', 'Maneurop', 'SZ250-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ268_4_R410A_50Hz', 'Maneurop', 'SZ268-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ271_4_R410A_50Hz', 'Maneurop', 'SZ271-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ281_4_R410A_50Hz', 'Maneurop', 'SZ281-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ285_4_R410A_50Hz', 'Maneurop', 'SZ285-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ290_4_R410A_50Hz', 'Maneurop', 'SZ290-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ296_4_R410A_50Hz', 'Maneurop', 'SZ296-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ310_4_R410A_50Hz', 'Maneurop', 'SZ310-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ320_4_R410A_50Hz', 'Maneurop', 'SZ320-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ322_4_R410A_50Hz', 'Maneurop', 'SZ322-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ350_4_R410A_50Hz', 'Maneurop', 'SZ350-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ370_4_R410A_50Hz', 'Maneurop', 'SZ370-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ425_4_R410A_50Hz', 'Maneurop', 'SZ425-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ482_4_R410A_50Hz', 'Maneurop', 'SZ482-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ485_4_R410A_50Hz', 'Maneurop', 'SZ485-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ540_4_R410A_50Hz', 'Maneurop', 'SZ540-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ600_4_R410A_50Hz', 'Maneurop', 'SZ600-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ480_4_R410A_50Hz', 'Maneurop', 'SZ480-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ550_4_R410A_50Hz', 'Maneurop', 'SZ550-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ640_4_R410A_50Hz', 'Maneurop', 'SZ640-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ740_4_R410A_50Hz', 'Maneurop', 'SZ740-4', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ084_6_R410A_50Hz', 'Maneurop', 'SZ084-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ090_6_R410A_50Hz', 'Maneurop', 'SZ090-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ100_6_R410A_50Hz', 'Maneurop', 'SZ100-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ110_6_R410A_50Hz', 'Maneurop', 'SZ110-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ115_6_R410A_50Hz', 'Maneurop', 'SZ115-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ120_6_R410A_50Hz', 'Maneurop', 'SZ120-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ125_6_R410A_50Hz', 'Maneurop', 'SZ125-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ148_6_R410A_50Hz', 'Maneurop', 'SZ148-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ160_6_R410A_50Hz', 'Maneurop', 'SZ160-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ161_6_R410A_50Hz', 'Maneurop', 'SZ161-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ175_6_R410A_50Hz', 'Maneurop', 'SZ175-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ185_6_R410A_50Hz', 'Maneurop', 'SZ185-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ240_6_R410A_50Hz', 'Maneurop', 'SZ240-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ300_6_R410A_50Hz', 'Maneurop', 'SZ300-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ170_6_R410A_50Hz', 'Maneurop', 'SZ170-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ180_6_R410A_50Hz', 'Maneurop', 'SZ180-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ200_6_R410A_50Hz', 'Maneurop', 'SZ200-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ220_6_R410A_50Hz', 'Maneurop', 'SZ220-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ230_6_R410A_50Hz', 'Maneurop', 'SZ230-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ242_6_R410A_50Hz', 'Maneurop', 'SZ242-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ250_6_R410A_50Hz', 'Maneurop', 'SZ250-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ268_6_R410A_50Hz', 'Maneurop', 'SZ268-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ271_6_R410A_50Hz', 'Maneurop', 'SZ271-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ281_6_R410A_50Hz', 'Maneurop', 'SZ281-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ285_6_R410A_50Hz', 'Maneurop', 'SZ285-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ290_6_R410A_50Hz', 'Maneurop', 'SZ290-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ296_6_R410A_50Hz', 'Maneurop', 'SZ296-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ310_6_R410A_50Hz', 'Maneurop', 'SZ310-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ320_6_R410A_50Hz', 'Maneurop', 'SZ320-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ322_6_R410A_50Hz', 'Maneurop', 'SZ322-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ350_6_R410A_50Hz', 'Maneurop', 'SZ350-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ370_6_R410A_50Hz', 'Maneurop', 'SZ370-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ425_6_R410A_50Hz', 'Maneurop', 'SZ425-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ482_6_R410A_50Hz', 'Maneurop', 'SZ482-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ485_6_R410A_50Hz', 'Maneurop', 'SZ485-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ540_6_R410A_50Hz', 'Maneurop', 'SZ540-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ600_6_R410A_50Hz', 'Maneurop', 'SZ600-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ480_6_R410A_50Hz', 'Maneurop', 'SZ480-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ550_6_R410A_50Hz', 'Maneurop', 'SZ550-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ640_6_R410A_50Hz', 'Maneurop', 'SZ640-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ740_6_R410A_50Hz', 'Maneurop', 'SZ740-6', 'R410A', 'HT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('MANEUROP_SZ084_7_R410A_50Hz', 'Maneurop', 'SZ084-7', 'R410A', 'MT', 'Scroll',
   50, 0.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB19KCE_TFD_R507A_60Hz', 'Copeland', 'ZB19KCE-TFD', 'R507A', 'HT', 'Scroll',
   60, 7.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF09K4E_TFD_R507A_60Hz', 'Copeland', 'ZF09K4E-TFD', 'R507A', 'HT', 'Scroll',
   60, 8.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS21K4E_TFD_R507A_60Hz', 'Copeland', 'ZS21K4E-TFD', 'R507A', 'HT', 'Scroll',
   60, 8.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB21KCE_TFD_R507A_60Hz', 'Copeland', 'ZB21KCE-TFD', 'R507A', 'HT', 'Scroll',
   60, 9.1, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB26KCE_TFD_R507A_60Hz', 'Copeland', 'ZB26KCE-TFD', 'R507A', 'HT', 'Scroll',
   60, 10.60000038146973, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF11K4E_TFD_R507A_60Hz', 'Copeland', 'ZF11K4E-TFD', 'R507A', 'HT', 'Scroll',
   60, 10.7, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS26K4E_TFD_R507A_60Hz', 'Copeland', 'ZS26K4E-TFD', 'R507A', 'HT', 'Scroll',
   60, 10.7, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS30K4E_TFD_R507A_60Hz', 'Copeland', 'ZS30K4E-TFD', 'R507A', 'HT', 'Scroll',
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
  ('COPELAND_ZF13K4E_TFD_R507A_60Hz', 'Copeland', 'ZF13K4E-TFD', 'R507A', 'HT', 'Scroll',
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
  ('COPELAND_ZB30KCE_TFD_R507A_60Hz', 'Copeland', 'ZB30KCE-TFD', 'R507A', 'HT', 'Scroll',
   60, 12.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF15K4E_TFD_R507A_60Hz', 'Copeland', 'ZF15K4E-TFD', 'R507A', 'HT', 'Scroll',
   60, 15.30000019073486, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS38K4E_TFD_R507A_60Hz', 'Copeland', 'ZS38K4E-TFD', 'R507A', 'HT', 'Scroll',
   60, 15.39999961853027, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB38KCE_TFD_R507A_60Hz', 'Copeland', 'ZB38KCE-TFD', 'R507A', 'HT', 'Scroll',
   60, 15.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB45KCE_TFD_R507A_60Hz', 'Copeland', 'ZB45KCE-TFD', 'R507A', 'HT', 'Scroll',
   60, 18.20000076293945, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF18K4E_TFD_R507A_60Hz', 'Copeland', 'ZF18K4E-TFD', 'R507A', 'HT', 'Scroll',
   60, 18.39999961853027, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS45K4E_TFD_R507A_60Hz', 'Copeland', 'ZS45K4E-TFD', 'R507A', 'HT', 'Scroll',
   60, 18.39999961853027, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB56KCE_TWD_R507A_60Hz', 'Copeland', 'ZB56KCE-TWD', 'R507A', 'HT', 'Scroll',
   60, 21.10000038146973, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS56K4E_TWD_R507A_60Hz', 'Copeland', 'ZS56K4E-TWD', 'R507A', 'HT', 'Scroll',
   60, 22.29999923706055, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF24K4E_TWD_R507A_60Hz', 'Copeland', 'ZF24K4E-TWD', 'R507A', 'HT', 'Scroll',
   60, 22.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB75KCE_TWD_R507A_60Hz', 'Copeland', 'ZB75KCE-TWD', 'R507A', 'HT', 'Scroll',
   60, 30.7, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS75K4E_TWD_R507A_60Hz', 'Copeland', 'ZS75K4E-TWD', 'R507A', 'HT', 'Scroll',
   60, 30.9, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF33K4E_TWD_R507A_60Hz', 'Copeland', 'ZF33K4E-TWD', 'R507A', 'HT', 'Scroll',
   60, 31.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB92KCE_TWD_R507A_60Hz', 'Copeland', 'ZB92KCE-TWD', 'R507A', 'HT', 'Scroll',
   60, 37.9, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS92K4E_TWD_R507A_60Hz', 'Copeland', 'ZS92K4E-TWD', 'R507A', 'HT', 'Scroll',
   60, 38.4, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF40K4E_TWD_R507A_60Hz', 'Copeland', 'ZF40K4E-TWD', 'R507A', 'HT', 'Scroll',
   60, 38.5, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZS11M4E_TWD_R507A_60Hz', 'Copeland', 'ZS11M4E-TWD', 'R507A', 'HT', 'Scroll',
   60, 43.6, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZF48K4E_TWD_R507A_60Hz', 'Copeland', 'ZF48K4E-TWD', 'R507A', 'HT', 'Scroll',
   60, 46.7, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB11MCE_TWD_R507A_60Hz', 'Copeland', 'ZB11MCE-TWD', 'R507A', 'HT', 'Scroll',
   60, 46.4, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZBH30KCE_TFD_R507A_50Hz', 'Copeland', 'ZBH30KCE-TFD', 'R507A', 'HT', 'Scroll',
   50, 12.25, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZBH38KCE_TFD_R507A_50Hz', 'Copeland', 'ZBH38KCE-TFD', 'R507A', 'HT', 'Scroll',
   50, 15.19999980926514, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZBH45KCE_TFD_R507A_50Hz', 'Copeland', 'ZBH45KCE-TFD', 'R507A', 'HT', 'Scroll',
   50, 18.10000038146973, -20.0, 15.0, 35.0, 65.0, 1)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB15KCE_TFD_B_R507A_60Hz', 'Copeland', 'ZB15KCE-TFD-B', 'R507A', 'HT', 'Scroll',
   60, 2.0, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB19KCE_TFD_B_R507A_60Hz', 'Copeland', 'ZB19KCE-TFD-B', 'R507A', 'HT', 'Scroll',
   60, 2.3, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB21KCE_TFD_B_R507A_60Hz', 'Copeland', 'ZB21KCE-TFD-B', 'R507A', 'HT', 'Scroll',
   60, 2.7, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB26KCE_TFD_B_R507A_60Hz', 'Copeland', 'ZB26KCE-TFD-B', 'R507A', 'HT', 'Scroll',
   60, 3.2, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();

INSERT INTO public.compressors_catalog
  (id, manufacturer, model, refrigerant, application, compressor_type, frequency_hz,
   nominal_power_kw, te_min_c, te_max_c, tc_min_c, tc_max_c, num_calibration_points)
VALUES
  ('COPELAND_ZB30KCE_TFD_B_R507A_60Hz', 'Copeland', 'ZB30KCE-TFD-B', 'R507A', 'HT', 'Scroll',
   60, 3.8, -20.0, 15.0, 35.0, 65.0, 2)
ON CONFLICT (id) DO UPDATE SET
  manufacturer = EXCLUDED.manufacturer,
  model = EXCLUDED.model,
  refrigerant = EXCLUDED.refrigerant,
  application = EXCLUDED.application,
  compressor_type = EXCLUDED.compressor_type,
  frequency_hz = EXCLUDED.frequency_hz,
  nominal_power_kw = EXCLUDED.nominal_power_kw,
  te_min_c = EXCLUDED.te_min_c,
  te_max_c = EXCLUDED.te_max_c,
  tc_min_c = EXCLUDED.tc_min_c,
  tc_max_c = EXCLUDED.tc_max_c,
  num_calibration_points = EXCLUDED.num_calibration_points,
  updated_at = now();
