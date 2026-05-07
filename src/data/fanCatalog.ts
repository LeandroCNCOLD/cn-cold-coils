// Catálogo de Ventiladores — CN Coils
// Fonte única: ZIEHL-ABEGG consolidado (50/60 Hz)
// Substitui o catálogo antigo (modelos legados removidos)
// Gerado a partir de ziehl_abegg_consolidated_1.json

import type { FanModel } from './fanCatalogTypes';
export type {
  FanCurvePoint,
  FanCurveSet,
  FanPerformanceDataPoint,
  FanModel,
} from './fanCatalogTypes';

export const FAN_CATALOG: FanModel[] = [
  {
    "model": "FN050-ZIL.DC.A7P2",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175936/10C1",
    "family": "FE2owlet-ECblue",
    "application": "Oil transformer cooling",
    "diameter_mm": 500,
    "num_blades": 7,
    "blade_material": "High Performance Composite Material",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 1550,
    "sound_lwa_db": 78,
    "erp_efficiency_pct": 41.8,
    "erp_n_target": 40,
    "q_max_m3h": 7300,
    "dp_max_pa": 160,
    "p1_nominal_w": 1550,
    "p_sys_w": 1550,
    "current_nominal_a": 2.8,
    "temp_min_c": -40,
    "temp_max_c": 50,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 18.5,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 160
          },
          {
            "q_m3h": 1000,
            "psf_pa": 150
          },
          {
            "q_m3h": 2000,
            "psf_pa": 135
          },
          {
            "q_m3h": 3000,
            "psf_pa": 110
          },
          {
            "q_m3h": 4000,
            "psf_pa": 75
          },
          {
            "q_m3h": 5000,
            "psf_pa": 30
          },
          {
            "q_m3h": 5500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 1000,
            "psf_pa": 95
          },
          {
            "q_m3h": 2000,
            "psf_pa": 85
          },
          {
            "q_m3h": 3000,
            "psf_pa": 70
          },
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 5000,
            "psf_pa": 20
          },
          {
            "q_m3h": 5500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 1000,
            "psf_pa": 55
          },
          {
            "q_m3h": 2000,
            "psf_pa": 45
          },
          {
            "q_m3h": 3000,
            "psf_pa": 30
          },
          {
            "q_m3h": 3500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 25
          },
          {
            "q_m3h": 1000,
            "psf_pa": 20
          },
          {
            "q_m3h": 2000,
            "psf_pa": 10
          },
          {
            "q_m3h": 2500,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 160
      },
      {
        "q_m3h": 1000,
        "psf_pa": 150
      },
      {
        "q_m3h": 2000,
        "psf_pa": 135
      },
      {
        "q_m3h": 3000,
        "psf_pa": 110
      },
      {
        "q_m3h": 4000,
        "psf_pa": 75
      },
      {
        "q_m3h": 5000,
        "psf_pa": 30
      },
      {
        "q_m3h": 5500,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.45,
        "power_w": 920,
        "speed_rpm": 1550,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.2,
        "power_w": 780,
        "speed_rpm": 1550,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 0.88,
        "power_w": 480,
        "speed_rpm": 1240,
        "sound_lwa_db": 67
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.7,
        "power_w": 350,
        "speed_rpm": 1240,
        "sound_lwa_db": 64
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.52,
        "power_w": 210,
        "speed_rpm": 930,
        "sound_lwa_db": 64
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 7,
        "current_a": 0.4,
        "power_w": 150,
        "speed_rpm": 930,
        "sound_lwa_db": 59
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 0.28,
        "power_w": 75,
        "speed_rpm": 620,
        "sound_lwa_db": 57
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 0.26,
        "power_w": 65,
        "speed_rpm": 620,
        "sound_lwa_db": 57
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN063-4DW.6N.A7P6",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "172786",
    "family": "FN",
    "application": "Axial fan with sickle blades",
    "diameter_mm": 630,
    "num_blades": 6,
    "blade_material": "Alumínio",
    "rotor_material": "Alumínio",
    "voltage": "3~230/400V±10% D/Y",
    "frequencies": [50, 60],
    "frequency_hz": 60,
    "motor_technology": "AC",
    "poles": 4,
    "electrical_nominal": "3~230/400V D/Y 50/60Hz",
    "rpm_nominal": 1580,
    "sound_lwa_db": 85,
    "erp_efficiency_pct": 37.5,
    "erp_n_actual": 42.5,
    "erp_n_target": 40,
    "q_max_m3h": 20000,
    "dp_max_pa": 400,
    "p1_nominal_w": 2800,
    "p_sys_w": 2800,
    "current_nominal_a": 8.4,
    "temp_min_c": -40,
    "temp_max_c": 60,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 25.9,
    "curve_available": true,
    "num_curve_sets": 1,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          { "q_m3h": 8000, "psf_pa": 200, "p1_w": 500 },
          { "q_m3h": 10000, "psf_pa": 350, "p1_w": 1100 },
          { "q_m3h": 12000, "psf_pa": 300, "p1_w": 1700 },
          { "q_m3h": 14000, "psf_pa": 250, "p1_w": 2000 },
          { "q_m3h": 16000, "psf_pa": 200, "p1_w": 2700 },
          { "q_m3h": 18000, "psf_pa": 100, "p1_w": 2800 },
          { "q_m3h": 20000, "psf_pa": 0, "p1_w": 2800 }
        ]
      }
    ],
    "curve_points": [
      { "q_m3h": 8000, "psf_pa": 200, "p1_w": 500 },
      { "q_m3h": 10000, "psf_pa": 350, "p1_w": 1100 },
      { "q_m3h": 12000, "psf_pa": 300, "p1_w": 1700 },
      { "q_m3h": 14000, "psf_pa": 250, "p1_w": 2000 },
      { "q_m3h": 16000, "psf_pa": 200, "p1_w": 2700 },
      { "q_m3h": 18000, "psf_pa": 100, "p1_w": 2800 },
      { "q_m3h": 20000, "psf_pa": 0, "p1_w": 2800 }
    ],
    "performance_data": [
      { "curve_id": "50Hz-D", "connection": "Δ", "voltage_v": 230, "frequency_hz": 50, "current_a": 6.40, "power_w": 1750, "speed_rpm": 1400 },
      { "curve_id": "50Hz-Y", "connection": "Y", "voltage_v": 400, "frequency_hz": 50, "current_a": 3.70, "power_w": 1750, "speed_rpm": 1400 },
      { "curve_id": "60Hz-D", "connection": "Δ", "voltage_v": 230, "frequency_hz": 60, "current_a": 8.40, "power_w": 2800, "speed_rpm": 1580 },
      { "curve_id": "60Hz-Y", "connection": "Y", "voltage_v": 400, "frequency_hz": 60, "current_a": 4.80, "power_w": 2800, "speed_rpm": 1580 },
      { "curve_id": "60Hz-D-460", "connection": "Δ", "voltage_v": 265, "frequency_hz": 60, "current_a": 8.00, "power_w": 2900, "speed_rpm": 1640 },
      { "curve_id": "60Hz-Y-460", "connection": "Y", "voltage_v": 460, "frequency_hz": 60, "current_a": 4.60, "power_w": 2900, "speed_rpm": 1640 }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN063-ZIL.DG.A7P2",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175936/10C1",
    "family": "FE2owlet-ECblue",
    "application": "Oil transformer cooling",
    "diameter_mm": 630,
    "num_blades": 7,
    "blade_material": "High Performance Composite Material, uncoated.",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 1200,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 48.5,
    "erp_n_actual": 54.6,
    "erp_n_target": 40,
    "q_max_m3h": 12000,
    "dp_max_pa": 0,
    "p1_nominal_w": 1100,
    "p_sys_w": 1100,
    "current_nominal_a": 1.7,
    "temp_min_c": -35,
    "temp_max_c": 50,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 27.5,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "has_50hz_performance": false,
    "has_60hz_performance": false
  },
  {
    "model": "FN071-ZIL.DG.A7P3",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175937/10C1",
    "family": "FE2owlet-ECblue",
    "application": "Oil transformer cooling",
    "diameter_mm": 710,
    "num_blades": 7,
    "blade_material": "High Performance Composite Material, uncoated.",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 960,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 48.2,
    "erp_n_actual": 55.4,
    "erp_n_target": 40,
    "q_max_m3h": 16000,
    "dp_max_pa": 0,
    "p1_nominal_w": 900,
    "p_sys_w": 900,
    "current_nominal_a": 1.3,
    "temp_min_c": -35,
    "temp_max_c": 50,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 39.5,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "has_50hz_performance": false,
    "has_60hz_performance": false
  },
  {
    "model": "FN071-ZIL.GG.A7P4",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175938/10C1",
    "family": "FE2owlet-ECblue",
    "application": "Oil transformer cooling",
    "diameter_mm": 710,
    "num_blades": 7,
    "blade_material": "Aluminium, powder-coated, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 1 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 1150,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 46.1,
    "erp_n_actual": 50.8,
    "erp_n_target": 40,
    "q_max_m3h": 20520,
    "dp_max_pa": 250,
    "p1_nominal_w": 1900,
    "p_sys_w": 1500,
    "current_nominal_a": 3.0,
    "current_nominal_a_raw": "3.00-2.40",
    "temp_min_c": -35,
    "temp_max_c": 55,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 43.8,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 250
          },
          {
            "q_m3h": 5000,
            "psf_pa": 220
          },
          {
            "q_m3h": 10000,
            "psf_pa": 150
          },
          {
            "q_m3h": 15000,
            "psf_pa": 50
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 200
          },
          {
            "q_m3h": 5000,
            "psf_pa": 180
          },
          {
            "q_m3h": 10000,
            "psf_pa": 120
          },
          {
            "q_m3h": 15000,
            "psf_pa": 30
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 150
          },
          {
            "q_m3h": 5000,
            "psf_pa": 130
          },
          {
            "q_m3h": 10000,
            "psf_pa": 70
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 5000,
            "psf_pa": 80
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 250
      },
      {
        "q_m3h": 5000,
        "psf_pa": 220
      },
      {
        "q_m3h": 10000,
        "psf_pa": 150
      },
      {
        "q_m3h": 15000,
        "psf_pa": 50
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 2.8,
        "power_w": 1900,
        "speed_rpm": 1150,
        "sound_lwa_db": 88
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 2.2,
        "power_w": 1500,
        "speed_rpm": 920,
        "sound_lwa_db": 86
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 1.55,
        "power_w": 980,
        "speed_rpm": 690,
        "sound_lwa_db": 82
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 1.25,
        "power_w": 780,
        "speed_rpm": 690,
        "sound_lwa_db": 80
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 0.84,
        "power_w": 440,
        "speed_rpm": 460,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 11,
        "current_a": 0.74,
        "power_w": 350,
        "speed_rpm": 460,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 0.42,
        "power_w": 150,
        "speed_rpm": 460,
        "sound_lwa_db": 63
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 0.38,
        "power_w": 120,
        "speed_rpm": 460,
        "sound_lwa_db": 61
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN071-ZIL.GL.A7P4",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175939/10C1",
    "family": "FE2owlet-ECblue",
    "application": "Oil transformer cooling",
    "diameter_mm": 710,
    "num_blades": 7,
    "blade_material": "Aluminium, powder-coated, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 1 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 1400,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 46.1,
    "erp_n_actual": 49.2,
    "erp_n_target": 40,
    "q_max_m3h": 27000,
    "dp_max_pa": 350,
    "p1_nominal_w": 3400,
    "p_sys_w": 2700,
    "current_nominal_a": 5.2,
    "current_nominal_a_raw": "5.20-4.20",
    "temp_min_c": -35,
    "temp_max_c": 55,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 48.2,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 350
          },
          {
            "q_m3h": 5000,
            "psf_pa": 320
          },
          {
            "q_m3h": 10000,
            "psf_pa": 270
          },
          {
            "q_m3h": 15000,
            "psf_pa": 200
          },
          {
            "q_m3h": 20000,
            "psf_pa": 100
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 280
          },
          {
            "q_m3h": 5000,
            "psf_pa": 250
          },
          {
            "q_m3h": 10000,
            "psf_pa": 200
          },
          {
            "q_m3h": 15000,
            "psf_pa": 120
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 200
          },
          {
            "q_m3h": 5000,
            "psf_pa": 180
          },
          {
            "q_m3h": 10000,
            "psf_pa": 120
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 120
          },
          {
            "q_m3h": 5000,
            "psf_pa": 100
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 350
      },
      {
        "q_m3h": 5000,
        "psf_pa": 320
      },
      {
        "q_m3h": 10000,
        "psf_pa": 270
      },
      {
        "q_m3h": 15000,
        "psf_pa": 200
      },
      {
        "q_m3h": 20000,
        "psf_pa": 100
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 5.0,
        "power_w": 3400,
        "speed_rpm": 1400,
        "sound_lwa_db": 93
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.9,
        "power_w": 2700,
        "speed_rpm": 1400,
        "sound_lwa_db": 92
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 2.5,
        "power_w": 1650,
        "speed_rpm": 1100,
        "sound_lwa_db": 86
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 2.0,
        "power_w": 1300,
        "speed_rpm": 1100,
        "sound_lwa_db": 85
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 1.25,
        "power_w": 760,
        "speed_rpm": 840,
        "sound_lwa_db": 79
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 1.05,
        "power_w": 620,
        "speed_rpm": 840,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 11,
        "current_a": 0.6,
        "power_w": 260,
        "speed_rpm": 560,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 0.54,
        "power_w": 220,
        "speed_rpm": 560,
        "sound_lwa_db": 66
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN080-ZIL.DG.A5P4",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175940/10C1",
    "family": "FE2owlet-ECblue",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 5,
    "blade_material": "High Performance Composite Material, uncoated, black",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 700,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 44.1,
    "erp_n_actual": 51.1,
    "erp_n_target": 40,
    "q_max_m3h": 18000,
    "dp_max_pa": 100,
    "p1_nominal_w": 800,
    "p_sys_w": 620,
    "current_nominal_a": 1.35,
    "current_nominal_a_raw": "1.35-1.10",
    "temp_min_c": -35,
    "temp_max_c": 50,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 45.1,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 3000,
            "psf_pa": 90
          },
          {
            "q_m3h": 6000,
            "psf_pa": 75
          },
          {
            "q_m3h": 9000,
            "psf_pa": 50
          },
          {
            "q_m3h": 12000,
            "psf_pa": 20
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 3000,
            "psf_pa": 70
          },
          {
            "q_m3h": 6000,
            "psf_pa": 55
          },
          {
            "q_m3h": 9000,
            "psf_pa": 30
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 3000,
            "psf_pa": 50
          },
          {
            "q_m3h": 6000,
            "psf_pa": 30
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 40
          },
          {
            "q_m3h": 3000,
            "psf_pa": 30
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 100
      },
      {
        "q_m3h": 3000,
        "psf_pa": 90
      },
      {
        "q_m3h": 6000,
        "psf_pa": 75
      },
      {
        "q_m3h": 9000,
        "psf_pa": 50
      },
      {
        "q_m3h": 12000,
        "psf_pa": 20
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.3,
        "power_w": 800,
        "speed_rpm": 700,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.05,
        "power_w": 620,
        "speed_rpm": 700,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.78,
        "power_w": 400,
        "speed_rpm": 560,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.68,
        "power_w": 320,
        "speed_rpm": 560,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 0.48,
        "power_w": 180,
        "speed_rpm": 420,
        "sound_lwa_db": 62
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 0.42,
        "power_w": 150,
        "speed_rpm": 420,
        "sound_lwa_db": 57
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 11,
        "current_a": 0.25,
        "power_w": 65,
        "speed_rpm": 280,
        "sound_lwa_db": 51
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 0.24,
        "power_w": 55,
        "speed_rpm": 280,
        "sound_lwa_db": 47
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN080-ZIL.GG.A7P3",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175936/10C1",
    "family": "FE2owlet-ECblue",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 6,
    "blade_material": "Aluminium, powder-coated, RAL 9005 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 940,
    "sound_lwa_db": 81,
    "erp_efficiency_pct": 47.3,
    "erp_n_actual": 52.1,
    "erp_n_target": 40,
    "q_max_m3h": 25750,
    "dp_max_pa": 100,
    "p1_nominal_w": 2700,
    "p_sys_w": 2300,
    "current_nominal_a": 4.6,
    "current_nominal_a_raw": "4.60-4.10",
    "temp_min_c": -25,
    "temp_max_c": 50,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 27.6,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 5000,
            "psf_pa": 90
          },
          {
            "q_m3h": 10000,
            "psf_pa": 75
          },
          {
            "q_m3h": 15000,
            "psf_pa": 55
          },
          {
            "q_m3h": 20000,
            "psf_pa": 30
          },
          {
            "q_m3h": 25000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 5000,
            "psf_pa": 55
          },
          {
            "q_m3h": 10000,
            "psf_pa": 45
          },
          {
            "q_m3h": 15000,
            "psf_pa": 30
          },
          {
            "q_m3h": 20000,
            "psf_pa": 10
          },
          {
            "q_m3h": 25000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 35
          },
          {
            "q_m3h": 5000,
            "psf_pa": 30
          },
          {
            "q_m3h": 10000,
            "psf_pa": 20
          },
          {
            "q_m3h": 15000,
            "psf_pa": 10
          },
          {
            "q_m3h": 20000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 15
          },
          {
            "q_m3h": 5000,
            "psf_pa": 10
          },
          {
            "q_m3h": 10000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 100
      },
      {
        "q_m3h": 5000,
        "psf_pa": 90
      },
      {
        "q_m3h": 10000,
        "psf_pa": 75
      },
      {
        "q_m3h": 15000,
        "psf_pa": 55
      },
      {
        "q_m3h": 20000,
        "psf_pa": 30
      },
      {
        "q_m3h": 25000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 2.6,
        "power_w": 1800,
        "speed_rpm": 940,
        "sound_lwa_db": 82
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 2.1,
        "power_w": 1500,
        "speed_rpm": 940,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.45,
        "power_w": 920,
        "speed_rpm": 760,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 1.1,
        "power_w": 690,
        "speed_rpm": 760,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.78,
        "power_w": 400,
        "speed_rpm": 570,
        "sound_lwa_db": 67
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.55,
        "power_w": 280,
        "speed_rpm": 570,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 7,
        "current_a": 0.39,
        "power_w": 140,
        "speed_rpm": 380,
        "sound_lwa_db": 60
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 0.25,
        "power_w": 60,
        "speed_rpm": 380,
        "sound_lwa_db": 56
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN080-ZIL.GL.A7P3",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175936/10C3",
    "family": "FE2owlet-ECblue",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 6,
    "blade_material": "Aluminium, powder-coated, RAL 9005 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 940,
    "sound_lwa_db": 81,
    "erp_efficiency_pct": 47,
    "erp_n_actual": 50.4,
    "erp_n_target": 40,
    "q_max_m3h": 25750,
    "dp_max_pa": 100,
    "p1_nominal_w": 2700,
    "p_sys_w": 2300,
    "current_nominal_a": 4.6,
    "current_nominal_a_raw": "4.60-4.10",
    "temp_min_c": -25,
    "temp_max_c": 50,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 27.6,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 5000,
            "psf_pa": 90
          },
          {
            "q_m3h": 10000,
            "psf_pa": 75
          },
          {
            "q_m3h": 15000,
            "psf_pa": 55
          },
          {
            "q_m3h": 20000,
            "psf_pa": 30
          },
          {
            "q_m3h": 25000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 5000,
            "psf_pa": 55
          },
          {
            "q_m3h": 10000,
            "psf_pa": 45
          },
          {
            "q_m3h": 15000,
            "psf_pa": 30
          },
          {
            "q_m3h": 20000,
            "psf_pa": 10
          },
          {
            "q_m3h": 25000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 35
          },
          {
            "q_m3h": 5000,
            "psf_pa": 30
          },
          {
            "q_m3h": 10000,
            "psf_pa": 20
          },
          {
            "q_m3h": 15000,
            "psf_pa": 10
          },
          {
            "q_m3h": 20000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 15
          },
          {
            "q_m3h": 5000,
            "psf_pa": 10
          },
          {
            "q_m3h": 10000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 100
      },
      {
        "q_m3h": 5000,
        "psf_pa": 90
      },
      {
        "q_m3h": 10000,
        "psf_pa": 75
      },
      {
        "q_m3h": 15000,
        "psf_pa": 55
      },
      {
        "q_m3h": 20000,
        "psf_pa": 30
      },
      {
        "q_m3h": 25000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 2.7,
        "power_w": 1800,
        "speed_rpm": 950,
        "sound_lwa_db": 82
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 2.1,
        "power_w": 1500,
        "speed_rpm": 950,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.45,
        "power_w": 920,
        "speed_rpm": 760,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 1.1,
        "power_w": 690,
        "speed_rpm": 760,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.78,
        "power_w": 400,
        "speed_rpm": 570,
        "sound_lwa_db": 67
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.55,
        "power_w": 280,
        "speed_rpm": 570,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 7,
        "current_a": 0.39,
        "power_w": 140,
        "speed_rpm": 380,
        "sound_lwa_db": 60
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 0.25,
        "power_w": 60,
        "speed_rpm": 380,
        "sound_lwa_db": 56
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN100-ZIL.GG.A5P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175936/10C1",
    "family": "FE2owlet-ECblue",
    "application": "Oil transformer cooling",
    "diameter_mm": 1000,
    "num_blades": 6,
    "blade_material": "Aluminium, powder-coated, RAL 9005 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 710,
    "sound_lwa_db": 84,
    "erp_efficiency_pct": 49.7,
    "erp_n_actual": 50.8,
    "erp_n_target": 40,
    "q_max_m3h": 27000,
    "dp_max_pa": 100,
    "p1_nominal_w": 2700,
    "p_sys_w": 2100,
    "current_nominal_a": 4.2,
    "current_nominal_a_raw": "4.20-3.70",
    "temp_min_c": -25,
    "temp_max_c": 50,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 29.3,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 5000,
            "psf_pa": 90
          },
          {
            "q_m3h": 10000,
            "psf_pa": 75
          },
          {
            "q_m3h": 15000,
            "psf_pa": 55
          },
          {
            "q_m3h": 20000,
            "psf_pa": 30
          },
          {
            "q_m3h": 25000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 5000,
            "psf_pa": 55
          },
          {
            "q_m3h": 10000,
            "psf_pa": 45
          },
          {
            "q_m3h": 15000,
            "psf_pa": 30
          },
          {
            "q_m3h": 20000,
            "psf_pa": 10
          },
          {
            "q_m3h": 25000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 35
          },
          {
            "q_m3h": 5000,
            "psf_pa": 30
          },
          {
            "q_m3h": 10000,
            "psf_pa": 20
          },
          {
            "q_m3h": 15000,
            "psf_pa": 10
          },
          {
            "q_m3h": 20000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 15
          },
          {
            "q_m3h": 5000,
            "psf_pa": 10
          },
          {
            "q_m3h": 10000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 100
      },
      {
        "q_m3h": 5000,
        "psf_pa": 90
      },
      {
        "q_m3h": 10000,
        "psf_pa": 75
      },
      {
        "q_m3h": 15000,
        "psf_pa": 55
      },
      {
        "q_m3h": 20000,
        "psf_pa": 30
      },
      {
        "q_m3h": 25000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 2.1,
        "power_w": 1450,
        "speed_rpm": 710,
        "sound_lwa_db": 77
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.7,
        "power_w": 1100,
        "speed_rpm": 710,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.2,
        "power_w": 740,
        "speed_rpm": 570,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 0.88,
        "power_w": 470,
        "speed_rpm": 570,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.7,
        "power_w": 330,
        "speed_rpm": 430,
        "sound_lwa_db": 69
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.45,
        "power_w": 170,
        "speed_rpm": 430,
        "sound_lwa_db": 64
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 7,
        "current_a": 0.34,
        "power_w": 110,
        "speed_rpm": 280,
        "sound_lwa_db": 56
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 0.2,
        "power_w": 60,
        "speed_rpm": 280,
        "sound_lwa_db": 51
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN100-ZIL.GL.A5P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175936/10C3",
    "family": "FE2owlet-ECblue",
    "application": "Oil transformer cooling",
    "diameter_mm": 1000,
    "num_blades": 6,
    "blade_material": "Aluminium, powder-coated, RAL 9005 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 710,
    "sound_lwa_db": 84,
    "erp_efficiency_pct": 49.7,
    "erp_n_actual": 50.8,
    "erp_n_target": 40,
    "q_max_m3h": 27000,
    "dp_max_pa": 100,
    "p1_nominal_w": 2700,
    "p_sys_w": 2100,
    "current_nominal_a": 4.2,
    "current_nominal_a_raw": "4.20-3.70",
    "temp_min_c": -25,
    "temp_max_c": 50,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 29.3,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 5000,
            "psf_pa": 90
          },
          {
            "q_m3h": 10000,
            "psf_pa": 75
          },
          {
            "q_m3h": 15000,
            "psf_pa": 55
          },
          {
            "q_m3h": 20000,
            "psf_pa": 30
          },
          {
            "q_m3h": 25000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 5000,
            "psf_pa": 55
          },
          {
            "q_m3h": 10000,
            "psf_pa": 45
          },
          {
            "q_m3h": 15000,
            "psf_pa": 30
          },
          {
            "q_m3h": 20000,
            "psf_pa": 10
          },
          {
            "q_m3h": 25000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 35
          },
          {
            "q_m3h": 5000,
            "psf_pa": 30
          },
          {
            "q_m3h": 10000,
            "psf_pa": 20
          },
          {
            "q_m3h": 15000,
            "psf_pa": 10
          },
          {
            "q_m3h": 20000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 15
          },
          {
            "q_m3h": 5000,
            "psf_pa": 10
          },
          {
            "q_m3h": 10000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 100
      },
      {
        "q_m3h": 5000,
        "psf_pa": 90
      },
      {
        "q_m3h": 10000,
        "psf_pa": 75
      },
      {
        "q_m3h": 15000,
        "psf_pa": 55
      },
      {
        "q_m3h": 20000,
        "psf_pa": 30
      },
      {
        "q_m3h": 25000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 2.1,
        "power_w": 1450,
        "speed_rpm": 710,
        "sound_lwa_db": 77
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.7,
        "power_w": 1100,
        "speed_rpm": 710,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.2,
        "power_w": 740,
        "speed_rpm": 570,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 0.88,
        "power_w": 470,
        "speed_rpm": 570,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.7,
        "power_w": 330,
        "speed_rpm": 430,
        "sound_lwa_db": 69
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.45,
        "power_w": 170,
        "speed_rpm": 430,
        "sound_lwa_db": 64
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 7,
        "current_a": 0.34,
        "power_w": 110,
        "speed_rpm": 280,
        "sound_lwa_db": 56
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 0.2,
        "power_w": 60,
        "speed_rpm": 280,
        "sound_lwa_db": 51
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN125-ZIL.GL.A3P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175936/10C1",
    "family": "FE2owlet-ECblue",
    "application": "Oil transformer cooling",
    "diameter_mm": 1250,
    "num_blades": 6,
    "blade_material": "Aluminium, powder-coated, RAL 9005 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 710,
    "sound_lwa_db": 84,
    "erp_efficiency_pct": 47.8,
    "erp_n_actual": 52.5,
    "erp_n_target": 40,
    "q_max_m3h": 97200,
    "dp_max_pa": 180,
    "p1_nominal_w": 2700,
    "p_sys_w": 2100,
    "current_nominal_a": 4.2,
    "current_nominal_a_raw": "4.20-3.70",
    "temp_min_c": -25,
    "temp_max_c": 50,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 31.4,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 180
          },
          {
            "q_m3h": 5000,
            "psf_pa": 170
          },
          {
            "q_m3h": 10000,
            "psf_pa": 150
          },
          {
            "q_m3h": 15000,
            "psf_pa": 120
          },
          {
            "q_m3h": 20000,
            "psf_pa": 90
          },
          {
            "q_m3h": 25000,
            "psf_pa": 50
          },
          {
            "q_m3h": 30000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 5000,
            "psf_pa": 95
          },
          {
            "q_m3h": 10000,
            "psf_pa": 80
          },
          {
            "q_m3h": 15000,
            "psf_pa": 60
          },
          {
            "q_m3h": 20000,
            "psf_pa": 30
          },
          {
            "q_m3h": 25000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 5000,
            "psf_pa": 55
          },
          {
            "q_m3h": 10000,
            "psf_pa": 40
          },
          {
            "q_m3h": 15000,
            "psf_pa": 20
          },
          {
            "q_m3h": 20000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 30
          },
          {
            "q_m3h": 5000,
            "psf_pa": 25
          },
          {
            "q_m3h": 10000,
            "psf_pa": 10
          },
          {
            "q_m3h": 15000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 180
      },
      {
        "q_m3h": 5000,
        "psf_pa": 170
      },
      {
        "q_m3h": 10000,
        "psf_pa": 150
      },
      {
        "q_m3h": 15000,
        "psf_pa": 120
      },
      {
        "q_m3h": 20000,
        "psf_pa": 90
      },
      {
        "q_m3h": 25000,
        "psf_pa": 50
      },
      {
        "q_m3h": 30000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 2.8,
        "power_w": 1850,
        "speed_rpm": 570,
        "sound_lwa_db": 84
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 2.2,
        "power_w": 1450,
        "speed_rpm": 570,
        "sound_lwa_db": 82
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.55,
        "power_w": 960,
        "speed_rpm": 460,
        "sound_lwa_db": 77
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 1.15,
        "power_w": 720,
        "speed_rpm": 460,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.84,
        "power_w": 390,
        "speed_rpm": 340,
        "sound_lwa_db": 69
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.6,
        "power_w": 250,
        "speed_rpm": 340,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 7,
        "current_a": 0.46,
        "power_w": 130,
        "speed_rpm": 230,
        "sound_lwa_db": 58
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 0.3,
        "power_w": 100,
        "speed_rpm": 230,
        "sound_lwa_db": 55
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN125-ZIL.GQ.A3P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175945/10C1",
    "family": "FE2owlet-ECblue",
    "application": "Oil transformer cooling",
    "diameter_mm": 1250,
    "num_blades": 6,
    "blade_material": "Aluminium, powder-coated, RAL 9005 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 650,
    "sound_lwa_db": 87,
    "erp_efficiency_pct": 50.4,
    "erp_n_actual": 54.7,
    "erp_n_target": 40,
    "q_max_m3h": 60000,
    "dp_max_pa": 180,
    "p1_nominal_w": 3500,
    "p_sys_w": 2900,
    "current_nominal_a": 5.9,
    "current_nominal_a_raw": "5.90-5.30",
    "temp_min_c": -25,
    "temp_max_c": 50,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 97.3,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 180
          },
          {
            "q_m3h": 10000,
            "psf_pa": 170
          },
          {
            "q_m3h": 20000,
            "psf_pa": 150
          },
          {
            "q_m3h": 30000,
            "psf_pa": 120
          },
          {
            "q_m3h": 40000,
            "psf_pa": 80
          },
          {
            "q_m3h": 50000,
            "psf_pa": 30
          },
          {
            "q_m3h": 60000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 10000,
            "psf_pa": 90
          },
          {
            "q_m3h": 20000,
            "psf_pa": 70
          },
          {
            "q_m3h": 30000,
            "psf_pa": 40
          },
          {
            "q_m3h": 40000,
            "psf_pa": 10
          },
          {
            "q_m3h": 50000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 10000,
            "psf_pa": 50
          },
          {
            "q_m3h": 20000,
            "psf_pa": 30
          },
          {
            "q_m3h": 30000,
            "psf_pa": 10
          },
          {
            "q_m3h": 40000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 30
          },
          {
            "q_m3h": 10000,
            "psf_pa": 20
          },
          {
            "q_m3h": 20000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 180
      },
      {
        "q_m3h": 10000,
        "psf_pa": 170
      },
      {
        "q_m3h": 20000,
        "psf_pa": 150
      },
      {
        "q_m3h": 30000,
        "psf_pa": 120
      },
      {
        "q_m3h": 40000,
        "psf_pa": 80
      },
      {
        "q_m3h": 50000,
        "psf_pa": 30
      },
      {
        "q_m3h": 60000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 4.2,
        "power_w": 2700,
        "speed_rpm": 650,
        "sound_lwa_db": 87
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 3.3,
        "power_w": 2000,
        "speed_rpm": 650,
        "sound_lwa_db": 84
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 2.3,
        "power_w": 1500,
        "speed_rpm": 530,
        "sound_lwa_db": 82
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 1.7,
        "power_w": 1100,
        "speed_rpm": 530,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.1,
        "power_w": 600,
        "speed_rpm": 390,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.75,
        "power_w": 370,
        "speed_rpm": 390,
        "sound_lwa_db": 69
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 7,
        "current_a": 0.54,
        "power_w": 200,
        "speed_rpm": 260,
        "sound_lwa_db": 64
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 0.4,
        "power_w": 150,
        "speed_rpm": 260,
        "sound_lwa_db": 63
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN045-VD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "174740/10K1",
    "family": "FE2owlet",
    "application": "Oil transformer cooling",
    "diameter_mm": 450,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400V (Δ/Y)",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_50_only",
    "motor_technology": "AC",
    "poles": "4-4",
    "electrical_nominal": "3~400V (Δ/Y) / 50Hz / AC",
    "rpm_nominal": 1360.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 34.4,
    "erp_n_actual": 42.5,
    "erp_n_target": 40,
    "q_max_m3h": 6948,
    "dp_max_pa": 350,
    "p1_nominal_w": 540.0,
    "current_nominal_a": 1.05,
    "current_nominal_a_raw": "1.05/0.68",
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 14.9,
    "curve_available": true,
    "num_curve_sets": 2,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 3000,
            "psf_pa": 350
          },
          {
            "q_m3h": 4000,
            "psf_pa": 300
          },
          {
            "q_m3h": 5000,
            "psf_pa": 200
          },
          {
            "q_m3h": 6000,
            "psf_pa": 50
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 3000,
            "psf_pa": 220
          },
          {
            "q_m3h": 4000,
            "psf_pa": 200
          },
          {
            "q_m3h": 5000,
            "psf_pa": 150
          },
          {
            "q_m3h": 6000,
            "psf_pa": 80
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 3000,
        "psf_pa": 350
      },
      {
        "q_m3h": 4000,
        "psf_pa": 300
      },
      {
        "q_m3h": 5000,
        "psf_pa": 200
      },
      {
        "q_m3h": 6000,
        "psf_pa": 50
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.05,
        "power_w": 540,
        "speed_rpm": 1380,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.98,
        "power_w": 460,
        "speed_rpm": 1350,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 0.6,
        "power_w": 390,
        "speed_rpm": 1050,
        "sound_lwa_db": 64
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.6,
        "power_w": 350,
        "speed_rpm": 1140,
        "sound_lwa_db": 70
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN045-SD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "174741/10K1",
    "family": "FE2owlet",
    "application": "Oil transformer cooling",
    "diameter_mm": 450,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "motor_technology": "AC",
    "poles": "6-6",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 920.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 29.0,
    "erp_n_actual": 40.0,
    "erp_n_target": 40,
    "q_max_m3h": 5400,
    "dp_max_pa": 330,
    "p1_nominal_w": 200.0,
    "current_nominal_a": 0.5,
    "current_nominal_a_raw": "0.50/0.27 | 0.62/0.28 | 0.60/0.31",
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 14.9,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 330
          },
          {
            "q_m3h": 2000,
            "psf_pa": 280
          },
          {
            "q_m3h": 3000,
            "psf_pa": 200
          },
          {
            "q_m3h": 4000,
            "psf_pa": 100
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 150
          },
          {
            "q_m3h": 2000,
            "psf_pa": 120
          },
          {
            "q_m3h": 3000,
            "psf_pa": 80
          },
          {
            "q_m3h": 4000,
            "psf_pa": 30
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 100
          },
          {
            "q_m3h": 2000,
            "psf_pa": 80
          },
          {
            "q_m3h": 3000,
            "psf_pa": 50
          },
          {
            "q_m3h": 4000,
            "psf_pa": 20
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 70
          },
          {
            "q_m3h": 2000,
            "psf_pa": 50
          },
          {
            "q_m3h": 3000,
            "psf_pa": 30
          },
          {
            "q_m3h": 4000,
            "psf_pa": 10
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 1000,
        "psf_pa": 330
      },
      {
        "q_m3h": 2000,
        "psf_pa": 280
      },
      {
        "q_m3h": 3000,
        "psf_pa": 200
      },
      {
        "q_m3h": 4000,
        "psf_pa": 100
      },
      {
        "q_m3h": 5000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.5,
        "power_w": 200,
        "speed_rpm": 920,
        "sound_lwa_db": 67
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.48,
        "power_w": 170,
        "speed_rpm": 930,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 0.27,
        "power_w": 120,
        "speed_rpm": 670,
        "sound_lwa_db": 59
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.25,
        "power_w": 110,
        "speed_rpm": 740,
        "sound_lwa_db": 59
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 0.6,
        "power_w": 310,
        "speed_rpm": 1050,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.54,
        "power_w": 260,
        "speed_rpm": 1090,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 0.62,
        "power_w": 280,
        "speed_rpm": 970,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 0.54,
        "power_w": 240,
        "speed_rpm": 1040,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 0.31,
        "power_w": 150,
        "speed_rpm": 650,
        "sound_lwa_db": 55
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 0.3,
        "power_w": 150,
        "speed_rpm": 730,
        "sound_lwa_db": 59
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 0.28,
        "power_w": 110,
        "speed_rpm": 560,
        "sound_lwa_db": 54
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 0.27,
        "power_w": 110,
        "speed_rpm": 620,
        "sound_lwa_db": 56
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN045-AD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "174742/10K1",
    "family": "FE2owlet",
    "application": "Oil transformer cooling",
    "diameter_mm": 450,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "motor_technology": "AC",
    "poles": "8-8",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 590.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 3500,
    "dp_max_pa": 120,
    "p1_nominal_w": 75.0,
    "current_nominal_a": 0.16,
    "current_nominal_a_raw": "0.16/0.072 | 0.18/0.071 | 0.19/0.08",
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 13.5,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 120
          },
          {
            "q_m3h": 1500,
            "psf_pa": 90
          },
          {
            "q_m3h": 2000,
            "psf_pa": 60
          },
          {
            "q_m3h": 2500,
            "psf_pa": 30
          },
          {
            "q_m3h": 3000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 60
          },
          {
            "q_m3h": 1500,
            "psf_pa": 40
          },
          {
            "q_m3h": 2000,
            "psf_pa": 20
          },
          {
            "q_m3h": 2500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 40
          },
          {
            "q_m3h": 1500,
            "psf_pa": 20
          },
          {
            "q_m3h": 2000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 20
          },
          {
            "q_m3h": 1500,
            "psf_pa": 10
          },
          {
            "q_m3h": 2000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 1000,
        "psf_pa": 120
      },
      {
        "q_m3h": 1500,
        "psf_pa": 90
      },
      {
        "q_m3h": 2000,
        "psf_pa": 60
      },
      {
        "q_m3h": 2500,
        "psf_pa": 30
      },
      {
        "q_m3h": 3000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.16,
        "power_w": 75,
        "speed_rpm": 590,
        "sound_lwa_db": 50
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.15,
        "power_w": 65,
        "speed_rpm": 620,
        "sound_lwa_db": 54
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 0.07,
        "power_w": 34,
        "speed_rpm": 370,
        "sound_lwa_db": 40
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.07,
        "power_w": 34,
        "speed_rpm": 410,
        "sound_lwa_db": 44
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 0.19,
        "power_w": 100,
        "speed_rpm": 640,
        "sound_lwa_db": 51
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.17,
        "power_w": 95,
        "speed_rpm": 690,
        "sound_lwa_db": 57
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 0.18,
        "power_w": 85,
        "speed_rpm": 560,
        "sound_lwa_db": 49
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 0.17,
        "power_w": 80,
        "speed_rpm": 620,
        "sound_lwa_db": 54
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 0.08,
        "power_w": 40,
        "speed_rpm": 360,
        "sound_lwa_db": 39
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 0.07,
        "power_w": 40,
        "speed_rpm": 400,
        "sound_lwa_db": 43
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 0.07,
        "power_w": 30,
        "speed_rpm": 300,
        "sound_lwa_db": 38
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 0.07,
        "power_w": 30,
        "speed_rpm": 330,
        "sound_lwa_db": 40
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN050-VD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "174743/10K1",
    "family": "FE2owlet",
    "application": "Oil transformer cooling",
    "diameter_mm": 500,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "motor_technology": "AC",
    "poles": "4-4",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 1290.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 35.0,
    "erp_n_actual": 42.3,
    "erp_n_target": 40,
    "q_max_m3h": 10224,
    "dp_max_pa": 200,
    "p1_nominal_w": 740.0,
    "current_nominal_a": 1.7,
    "current_nominal_a_raw": "1.70/0.76 | 1.80/0.90 | 1.90/0.94",
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 20.0,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 4000,
            "psf_pa": 200
          },
          {
            "q_m3h": 6000,
            "psf_pa": 180
          },
          {
            "q_m3h": 8000,
            "psf_pa": 140
          },
          {
            "q_m3h": 10000,
            "psf_pa": 80
          },
          {
            "q_m3h": 12000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 4000,
            "psf_pa": 120
          },
          {
            "q_m3h": 6000,
            "psf_pa": 100
          },
          {
            "q_m3h": 8000,
            "psf_pa": 70
          },
          {
            "q_m3h": 10000,
            "psf_pa": 30
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 4000,
            "psf_pa": 80
          },
          {
            "q_m3h": 6000,
            "psf_pa": 60
          },
          {
            "q_m3h": 8000,
            "psf_pa": 40
          },
          {
            "q_m3h": 10000,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 6000,
            "psf_pa": 40
          },
          {
            "q_m3h": 8000,
            "psf_pa": 20
          },
          {
            "q_m3h": 10000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 4000,
        "psf_pa": 200
      },
      {
        "q_m3h": 6000,
        "psf_pa": 180
      },
      {
        "q_m3h": 8000,
        "psf_pa": 140
      },
      {
        "q_m3h": 10000,
        "psf_pa": 80
      },
      {
        "q_m3h": 12000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.7,
        "power_w": 740,
        "speed_rpm": 1290,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.55,
        "power_w": 600,
        "speed_rpm": 1340,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 0.76,
        "power_w": 460,
        "speed_rpm": 1020,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.68,
        "power_w": 390,
        "speed_rpm": 1110,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 1.9,
        "power_w": 1150,
        "speed_rpm": 1470,
        "sound_lwa_db": 79
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 1.65,
        "power_w": 920,
        "speed_rpm": 1550,
        "sound_lwa_db": 79
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 1.8,
        "power_w": 1000,
        "speed_rpm": 1390,
        "sound_lwa_db": 77
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 1.55,
        "power_w": 820,
        "speed_rpm": 1480,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 0.94,
        "power_w": 560,
        "speed_rpm": 1100,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 0.84,
        "power_w": 500,
        "speed_rpm": 1220,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 0.9,
        "power_w": 540,
        "speed_rpm": 1000,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 0.8,
        "power_w": 500,
        "speed_rpm": 1120,
        "sound_lwa_db": 70
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN050-VDH",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "154276/10K1",
    "family": "FE2owlet",
    "application": "Oil transformer cooling",
    "diameter_mm": 500,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "motor_technology": "AC",
    "poles": "4-4",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 1290.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 33.4,
    "erp_n_actual": 40.7,
    "erp_n_target": 40,
    "q_max_m3h": 10224,
    "dp_max_pa": 200,
    "p1_nominal_w": 690.0,
    "current_nominal_a": 1.6,
    "current_nominal_a_raw": "1.60/0.75 | 1.75/0.88 | 1.80/0.92",
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 20.2,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 4000,
            "psf_pa": 200
          },
          {
            "q_m3h": 6000,
            "psf_pa": 180
          },
          {
            "q_m3h": 8000,
            "psf_pa": 140
          },
          {
            "q_m3h": 10000,
            "psf_pa": 80
          },
          {
            "q_m3h": 12000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 4000,
            "psf_pa": 120
          },
          {
            "q_m3h": 6000,
            "psf_pa": 100
          },
          {
            "q_m3h": 8000,
            "psf_pa": 70
          },
          {
            "q_m3h": 10000,
            "psf_pa": 30
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 4000,
            "psf_pa": 80
          },
          {
            "q_m3h": 6000,
            "psf_pa": 60
          },
          {
            "q_m3h": 8000,
            "psf_pa": 40
          },
          {
            "q_m3h": 10000,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 6000,
            "psf_pa": 40
          },
          {
            "q_m3h": 8000,
            "psf_pa": 20
          },
          {
            "q_m3h": 10000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 4000,
        "psf_pa": 200
      },
      {
        "q_m3h": 6000,
        "psf_pa": 180
      },
      {
        "q_m3h": 8000,
        "psf_pa": 140
      },
      {
        "q_m3h": 10000,
        "psf_pa": 80
      },
      {
        "q_m3h": 12000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.6,
        "power_w": 690,
        "speed_rpm": 1290,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.55,
        "power_w": 650,
        "speed_rpm": 1310,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 0.75,
        "power_w": 430,
        "speed_rpm": 1020,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.72,
        "power_w": 410,
        "speed_rpm": 1050,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 1.8,
        "power_w": 1050,
        "speed_rpm": 1480,
        "sound_lwa_db": 80
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 1.75,
        "power_w": 1000,
        "speed_rpm": 1510,
        "sound_lwa_db": 85
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 1.85,
        "power_w": 960,
        "speed_rpm": 1430,
        "sound_lwa_db": 83
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 1.75,
        "power_w": 910,
        "speed_rpm": 1480,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 0.92,
        "power_w": 520,
        "speed_rpm": 1100,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 0.9,
        "power_w": 500,
        "speed_rpm": 1190,
        "sound_lwa_db": 77
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 0.88,
        "power_w": 510,
        "speed_rpm": 990,
        "sound_lwa_db": 69
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 0.86,
        "power_w": 500,
        "speed_rpm": 1030,
        "sound_lwa_db": 74
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN050-SDH",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "154277/10K1",
    "family": "FE2owlet",
    "application": "Oil transformer cooling",
    "diameter_mm": 500,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "motor_technology": "AC",
    "poles": "6-6",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 890.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 30.1,
    "erp_n_actual": 40.2,
    "erp_n_target": 40,
    "q_max_m3h": 7000,
    "dp_max_pa": 350,
    "p1_nominal_w": 270.0,
    "current_nominal_a": 0.68,
    "current_nominal_a_raw": "0.68/0.35 | 0.83/0.35 | 0.83/0.40",
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 18.7,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 350
          },
          {
            "q_m3h": 2000,
            "psf_pa": 280
          },
          {
            "q_m3h": 3000,
            "psf_pa": 200
          },
          {
            "q_m3h": 4000,
            "psf_pa": 100
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 250
          },
          {
            "q_m3h": 2000,
            "psf_pa": 200
          },
          {
            "q_m3h": 3000,
            "psf_pa": 150
          },
          {
            "q_m3h": 4000,
            "psf_pa": 80
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 150
          },
          {
            "q_m3h": 2000,
            "psf_pa": 120
          },
          {
            "q_m3h": 3000,
            "psf_pa": 80
          },
          {
            "q_m3h": 4000,
            "psf_pa": 40
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 100
          },
          {
            "q_m3h": 2000,
            "psf_pa": 80
          },
          {
            "q_m3h": 3000,
            "psf_pa": 50
          },
          {
            "q_m3h": 4000,
            "psf_pa": 20
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 1000,
        "psf_pa": 350
      },
      {
        "q_m3h": 2000,
        "psf_pa": 280
      },
      {
        "q_m3h": 3000,
        "psf_pa": 200
      },
      {
        "q_m3h": 4000,
        "psf_pa": 100
      },
      {
        "q_m3h": 5000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.68,
        "power_w": 270,
        "speed_rpm": 890,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.66,
        "power_w": 260,
        "speed_rpm": 900,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 0.35,
        "power_w": 160,
        "speed_rpm": 610,
        "sound_lwa_db": 57
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.34,
        "power_w": 150,
        "speed_rpm": 650,
        "sound_lwa_db": 61
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 0.83,
        "power_w": 420,
        "speed_rpm": 1000,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.78,
        "power_w": 400,
        "speed_rpm": 1030,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 0.83,
        "power_w": 380,
        "speed_rpm": 950,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 0.78,
        "power_w": 360,
        "speed_rpm": 950,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 0.4,
        "power_w": 190,
        "speed_rpm": 800,
        "sound_lwa_db": 61
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 0.4,
        "power_w": 190,
        "speed_rpm": 840,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 0.35,
        "power_w": 140,
        "speed_rpm": 510,
        "sound_lwa_db": 55
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 0.35,
        "power_w": 140,
        "speed_rpm": 540,
        "sound_lwa_db": 57
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN050-ADL.4C.A7P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "174745/10K1",
    "family": "FE2owlet",
    "application": "Oil transformer cooling",
    "diameter_mm": 500,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "motor_technology": "AC",
    "poles": "8-8",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 670.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 3500,
    "dp_max_pa": 160,
    "p1_nominal_w": 130.0,
    "current_nominal_a": 0.29,
    "current_nominal_a_raw": "0.29/0.14 | 0.32/0.16 | 0.33/0.17",
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 16.8,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 160
          },
          {
            "q_m3h": 1500,
            "psf_pa": 140
          },
          {
            "q_m3h": 2000,
            "psf_pa": 100
          },
          {
            "q_m3h": 2500,
            "psf_pa": 60
          },
          {
            "q_m3h": 3000,
            "psf_pa": 20
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 100
          },
          {
            "q_m3h": 1500,
            "psf_pa": 80
          },
          {
            "q_m3h": 2000,
            "psf_pa": 60
          },
          {
            "q_m3h": 2500,
            "psf_pa": 30
          },
          {
            "q_m3h": 3000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 60
          },
          {
            "q_m3h": 1500,
            "psf_pa": 50
          },
          {
            "q_m3h": 2000,
            "psf_pa": 30
          },
          {
            "q_m3h": 2500,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 40
          },
          {
            "q_m3h": 1500,
            "psf_pa": 30
          },
          {
            "q_m3h": 2000,
            "psf_pa": 20
          },
          {
            "q_m3h": 2500,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 1000,
        "psf_pa": 160
      },
      {
        "q_m3h": 1500,
        "psf_pa": 140
      },
      {
        "q_m3h": 2000,
        "psf_pa": 100
      },
      {
        "q_m3h": 2500,
        "psf_pa": 60
      },
      {
        "q_m3h": 3000,
        "psf_pa": 20
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.29,
        "power_w": 130,
        "speed_rpm": 670,
        "sound_lwa_db": 56
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.27,
        "power_w": 110,
        "speed_rpm": 680,
        "sound_lwa_db": 58
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 0.14,
        "power_w": 80,
        "speed_rpm": 510,
        "sound_lwa_db": 48
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.12,
        "power_w": 70,
        "speed_rpm": 560,
        "sound_lwa_db": 53
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 0.32,
        "power_w": 190,
        "speed_rpm": 760,
        "sound_lwa_db": 60
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.29,
        "power_w": 150,
        "speed_rpm": 800,
        "sound_lwa_db": 64
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 0.32,
        "power_w": 170,
        "speed_rpm": 720,
        "sound_lwa_db": 58
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 0.28,
        "power_w": 140,
        "speed_rpm": 750,
        "sound_lwa_db": 61
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 0.17,
        "power_w": 110,
        "speed_rpm": 520,
        "sound_lwa_db": 50
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 0.15,
        "power_w": 80,
        "speed_rpm": 590,
        "sound_lwa_db": 55
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 0.16,
        "power_w": 80,
        "speed_rpm": 450,
        "sound_lwa_db": 46
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 0.15,
        "power_w": 80,
        "speed_rpm": 520,
        "sound_lwa_db": 52
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN050-ADH.4C.A7P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "162085/10K1",
    "family": "FE2owlet",
    "application": "Oil transformer cooling",
    "diameter_mm": 500,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "motor_technology": "AC",
    "poles": "8-8",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 670.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 3500,
    "dp_max_pa": 160,
    "p1_nominal_w": 130.0,
    "current_nominal_a": 0.29,
    "current_nominal_a_raw": "0.29/0.14 | 0.33/0.165 | 0.33/0.175",
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 17.0,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 160
          },
          {
            "q_m3h": 1500,
            "psf_pa": 140
          },
          {
            "q_m3h": 2000,
            "psf_pa": 100
          },
          {
            "q_m3h": 2500,
            "psf_pa": 60
          },
          {
            "q_m3h": 3000,
            "psf_pa": 20
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 100
          },
          {
            "q_m3h": 1500,
            "psf_pa": 80
          },
          {
            "q_m3h": 2000,
            "psf_pa": 60
          },
          {
            "q_m3h": 2500,
            "psf_pa": 30
          },
          {
            "q_m3h": 3000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 60
          },
          {
            "q_m3h": 1500,
            "psf_pa": 50
          },
          {
            "q_m3h": 2000,
            "psf_pa": 30
          },
          {
            "q_m3h": 2500,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 1000,
            "psf_pa": 40
          },
          {
            "q_m3h": 1500,
            "psf_pa": 30
          },
          {
            "q_m3h": 2000,
            "psf_pa": 20
          },
          {
            "q_m3h": 2500,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 1000,
        "psf_pa": 160
      },
      {
        "q_m3h": 1500,
        "psf_pa": 140
      },
      {
        "q_m3h": 2000,
        "psf_pa": 100
      },
      {
        "q_m3h": 2500,
        "psf_pa": 60
      },
      {
        "q_m3h": 3000,
        "psf_pa": 20
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.29,
        "power_w": 130,
        "speed_rpm": 670,
        "sound_lwa_db": 60
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.28,
        "power_w": 120,
        "speed_rpm": 680,
        "sound_lwa_db": 62
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 0.14,
        "power_w": 80,
        "speed_rpm": 510,
        "sound_lwa_db": 52
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.13,
        "power_w": 75,
        "speed_rpm": 540,
        "sound_lwa_db": 55
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 0.33,
        "power_w": 190,
        "speed_rpm": 770,
        "sound_lwa_db": 64
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.31,
        "power_w": 170,
        "speed_rpm": 780,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 0.33,
        "power_w": 160,
        "speed_rpm": 750,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 0.3,
        "power_w": 160,
        "speed_rpm": 750,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 0.17,
        "power_w": 110,
        "speed_rpm": 520,
        "sound_lwa_db": 58
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 0.16,
        "power_w": 100,
        "speed_rpm": 560,
        "sound_lwa_db": 63
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 0.16,
        "power_w": 85,
        "speed_rpm": 450,
        "sound_lwa_db": 52
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 0.16,
        "power_w": 85,
        "speed_rpm": 490,
        "sound_lwa_db": 55
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN063-VD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 630,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (1 pontos).",
    "motor_technology": "AC",
    "poles": "4-4",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 1400.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 42.5,
    "erp_n_actual": 47.4,
    "erp_n_target": 40,
    "q_max_m3h": 0,
    "dp_max_pa": 350,
    "p1_nominal_w": 1750.0,
    "current_nominal_a": 3.7,
    "current_nominal_a_raw": "3.70/2.20 | 4.60/2.80 | 4.60/2.80",
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 350
          },
          {
            "q_m3h": 2000,
            "psf_pa": 300
          },
          {
            "q_m3h": 4000,
            "psf_pa": 220
          },
          {
            "q_m3h": 6000,
            "psf_pa": 100
          },
          {
            "q_m3h": 7000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 280
          },
          {
            "q_m3h": 2000,
            "psf_pa": 250
          },
          {
            "q_m3h": 4000,
            "psf_pa": 180
          },
          {
            "q_m3h": 6000,
            "psf_pa": 80
          },
          {
            "q_m3h": 6500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 280
          },
          {
            "q_m3h": 2000,
            "psf_pa": 250
          },
          {
            "q_m3h": 4000,
            "psf_pa": 180
          },
          {
            "q_m3h": 6000,
            "psf_pa": 80
          },
          {
            "q_m3h": 6500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 200
          },
          {
            "q_m3h": 2000,
            "psf_pa": 180
          },
          {
            "q_m3h": 4000,
            "psf_pa": 120
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 350
      },
      {
        "q_m3h": 2000,
        "psf_pa": 300
      },
      {
        "q_m3h": 4000,
        "psf_pa": 220
      },
      {
        "q_m3h": 6000,
        "psf_pa": 100
      },
      {
        "q_m3h": 7000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 3.7,
        "power_w": 1750,
        "speed_rpm": 1400,
        "sound_lwa_db": 91
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.7,
        "power_w": 1750,
        "speed_rpm": 1400,
        "sound_lwa_db": 91
      },
      {
        "curve_id": "II",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 2.2,
        "power_w": 1150,
        "speed_rpm": 1210,
        "sound_lwa_db": 88
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 2.2,
        "power_w": 1150,
        "speed_rpm": 1210,
        "sound_lwa_db": 88
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 2.8,
        "power_w": 1800,
        "speed_rpm": 1330,
        "sound_lwa_db": 90
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN063-VDL.6N.A7P6",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "173164/10K1 (L guard grille suction side), 173164/10K3 (L guard grille two-sided)",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 630,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400V (Δ/Y) | 3~460V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (6 pontos).",
    "motor_technology": "AC",
    "poles": "4-4",
    "electrical_nominal": "3~400V (Δ/Y) | 3~460V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 350,
    "p1_nominal_w": 0,
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 37.9,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 350
          },
          {
            "q_m3h": 2000,
            "psf_pa": 300
          },
          {
            "q_m3h": 4000,
            "psf_pa": 220
          },
          {
            "q_m3h": 6000,
            "psf_pa": 100
          },
          {
            "q_m3h": 7000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 280
          },
          {
            "q_m3h": 2000,
            "psf_pa": 250
          },
          {
            "q_m3h": 4000,
            "psf_pa": 180
          },
          {
            "q_m3h": 6000,
            "psf_pa": 80
          },
          {
            "q_m3h": 6500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 280
          },
          {
            "q_m3h": 2000,
            "psf_pa": 250
          },
          {
            "q_m3h": 4000,
            "psf_pa": 180
          },
          {
            "q_m3h": 6000,
            "psf_pa": 80
          },
          {
            "q_m3h": 6500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 200
          },
          {
            "q_m3h": 2000,
            "psf_pa": 180
          },
          {
            "q_m3h": 4000,
            "psf_pa": 120
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 350
      },
      {
        "q_m3h": 2000,
        "psf_pa": 300
      },
      {
        "q_m3h": 4000,
        "psf_pa": 220
      },
      {
        "q_m3h": 6000,
        "psf_pa": 100
      },
      {
        "q_m3h": 7000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 3.7,
        "power_w": 1750,
        "speed_rpm": 1400,
        "sound_lwa_db": 90
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.5,
        "power_w": 1500,
        "speed_rpm": 1420,
        "sound_lwa_db": 89
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 2.2,
        "power_w": 1300,
        "speed_rpm": 1210,
        "sound_lwa_db": 86
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.95,
        "power_w": 1150,
        "speed_rpm": 1250,
        "sound_lwa_db": 85
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 4.6,
        "power_w": 2800,
        "speed_rpm": 1640,
        "sound_lwa_db": 95
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 4.2,
        "power_w": 2400,
        "speed_rpm": 1670,
        "sound_lwa_db": 94
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 4.0,
        "power_w": 2300,
        "speed_rpm": 1620,
        "sound_lwa_db": 93
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 2.6,
        "power_w": 1800,
        "speed_rpm": 1400,
        "sound_lwa_db": 88
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 2.8,
        "power_w": 1700,
        "speed_rpm": 1210,
        "sound_lwa_db": 87
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 2.6,
        "power_w": 1550,
        "speed_rpm": 1290,
        "sound_lwa_db": 86
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN063-SD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 630,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (6 pontos).",
    "motor_technology": "AC",
    "poles": "6-6",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 900.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 33.8,
    "erp_n_actual": 41.5,
    "erp_n_target": 40,
    "q_max_m3h": 0,
    "dp_max_pa": 180,
    "p1_nominal_w": 630.0,
    "current_nominal_a": 1.25,
    "current_nominal_a_raw": "1.25/0.72 | 1.55/0.87 | 1.55/0.91 A",
    "temp_min_c": -40,
    "temp_max_c": 50,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 180
          },
          {
            "q_m3h": 2000,
            "psf_pa": 160
          },
          {
            "q_m3h": 4000,
            "psf_pa": 130
          },
          {
            "q_m3h": 6000,
            "psf_pa": 80
          },
          {
            "q_m3h": 8000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 140
          },
          {
            "q_m3h": 2000,
            "psf_pa": 120
          },
          {
            "q_m3h": 4000,
            "psf_pa": 90
          },
          {
            "q_m3h": 6000,
            "psf_pa": 40
          },
          {
            "q_m3h": 7000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 140
          },
          {
            "q_m3h": 2000,
            "psf_pa": 120
          },
          {
            "q_m3h": 4000,
            "psf_pa": 90
          },
          {
            "q_m3h": 6000,
            "psf_pa": 40
          },
          {
            "q_m3h": 7000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 2000,
            "psf_pa": 80
          },
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 180
      },
      {
        "q_m3h": 2000,
        "psf_pa": 160
      },
      {
        "q_m3h": 4000,
        "psf_pa": 130
      },
      {
        "q_m3h": 6000,
        "psf_pa": 80
      },
      {
        "q_m3h": 8000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.25,
        "power_w": 630,
        "speed_rpm": 900,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.25,
        "power_w": 630,
        "speed_rpm": 900,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.25,
        "power_w": 630,
        "speed_rpm": 900,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.72,
        "power_w": 440,
        "speed_rpm": 720,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 1.55,
        "power_w": 940,
        "speed_rpm": 980,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 1.55,
        "power_w": 940,
        "speed_rpm": 980,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 1.55,
        "power_w": 940,
        "speed_rpm": 980,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 0.87,
        "power_w": 520,
        "speed_rpm": 640,
        "sound_lwa_db": 67
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 1.55,
        "power_w": 1000,
        "speed_rpm": 1040,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 0.91,
        "power_w": 640,
        "speed_rpm": 740,
        "sound_lwa_db": 69
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN063-SDL.6K.A7P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "154279/10K1 (L guard grille suction side), 154279/10K3 (L guard grille two-sided)",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 630,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400V (Δ/Y) | 3~460V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "motor_technology": "AC",
    "poles": "6-6",
    "electrical_nominal": "3~400V (Δ/Y) | 3~460V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 240,
    "p1_nominal_w": 0,
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 38.9,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 240
          },
          {
            "q_m3h": 4000,
            "psf_pa": 200
          },
          {
            "q_m3h": 8000,
            "psf_pa": 100
          },
          {
            "q_m3h": 10000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 150
          },
          {
            "q_m3h": 4000,
            "psf_pa": 120
          },
          {
            "q_m3h": 8000,
            "psf_pa": 50
          },
          {
            "q_m3h": 9000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 150
          },
          {
            "q_m3h": 4000,
            "psf_pa": 120
          },
          {
            "q_m3h": 8000,
            "psf_pa": 50
          },
          {
            "q_m3h": 9000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 4000,
            "psf_pa": 80
          },
          {
            "q_m3h": 6000,
            "psf_pa": 20
          },
          {
            "q_m3h": 7000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 240
      },
      {
        "q_m3h": 4000,
        "psf_pa": 200
      },
      {
        "q_m3h": 8000,
        "psf_pa": 100
      },
      {
        "q_m3h": 10000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 2.4,
        "power_w": 960,
        "speed_rpm": 920,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 2.1,
        "power_w": 680,
        "speed_rpm": 950,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.2,
        "power_w": 440,
        "speed_rpm": 780,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.94,
        "power_w": 500,
        "speed_rpm": 850,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 2.7,
        "power_w": 1500,
        "speed_rpm": 1070,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 2.2,
        "power_w": 1050,
        "speed_rpm": 1120,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "II",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 2.6,
        "power_w": 1400,
        "speed_rpm": 1030,
        "sound_lwa_db": 79
      },
      {
        "curve_id": "II",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 2.0,
        "power_w": 970,
        "speed_rpm": 1090,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 1.95,
        "power_w": 1000,
        "speed_rpm": 850,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 1.2,
        "power_w": 780,
        "speed_rpm": 970,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 1.5,
        "power_w": 860,
        "speed_rpm": 770,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 1.2,
        "power_w": 690,
        "speed_rpm": 900,
        "sound_lwa_db": 72
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN071-SDL.6K.A7P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "154280/10K1 (L guard grille suction side), 154280/10K3 (L guard grille two-sided)",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 710,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400V (Δ/Y) | 3~460V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "motor_technology": "AC",
    "poles": "6-6",
    "electrical_nominal": "3~400V (Δ/Y) | 3~460V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 240,
    "p1_nominal_w": 0,
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 38.9,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 240
          },
          {
            "q_m3h": 4000,
            "psf_pa": 200
          },
          {
            "q_m3h": 8000,
            "psf_pa": 100
          },
          {
            "q_m3h": 10000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 150
          },
          {
            "q_m3h": 4000,
            "psf_pa": 120
          },
          {
            "q_m3h": 8000,
            "psf_pa": 50
          },
          {
            "q_m3h": 9000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 150
          },
          {
            "q_m3h": 4000,
            "psf_pa": 120
          },
          {
            "q_m3h": 8000,
            "psf_pa": 50
          },
          {
            "q_m3h": 9000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 4000,
            "psf_pa": 80
          },
          {
            "q_m3h": 6000,
            "psf_pa": 20
          },
          {
            "q_m3h": 7000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 240
      },
      {
        "q_m3h": 4000,
        "psf_pa": 200
      },
      {
        "q_m3h": 8000,
        "psf_pa": 100
      },
      {
        "q_m3h": 10000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 2.4,
        "power_w": 960,
        "speed_rpm": 920,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 2.1,
        "power_w": 680,
        "speed_rpm": 950,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.2,
        "power_w": 440,
        "speed_rpm": 780,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.94,
        "power_w": 500,
        "speed_rpm": 850,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 2.7,
        "power_w": 1500,
        "speed_rpm": 1070,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 2.2,
        "power_w": 1050,
        "speed_rpm": 1120,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "II",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 2.6,
        "power_w": 1400,
        "speed_rpm": 1030,
        "sound_lwa_db": 79
      },
      {
        "curve_id": "II",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 2.0,
        "power_w": 970,
        "speed_rpm": 1090,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 1.95,
        "power_w": 1000,
        "speed_rpm": 850,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 1.2,
        "power_w": 780,
        "speed_rpm": 970,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 1.5,
        "power_w": 860,
        "speed_rpm": 770,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 1.2,
        "power_w": 690,
        "speed_rpm": 900,
        "sound_lwa_db": 72
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN071-AD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 710,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (5 pontos) e 60 Hz (7 pontos).",
    "motor_technology": "AC",
    "poles": "8-8",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 680.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 33.1,
    "erp_n_actual": 41.6,
    "erp_n_target": 40,
    "q_max_m3h": 0,
    "dp_max_pa": 120,
    "p1_nominal_w": 470.0,
    "current_nominal_a": 1.05,
    "current_nominal_a_raw": "1.05/0.61 | 1.30/0.72 | 1.25/0.77 A",
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 120
          },
          {
            "q_m3h": 2000,
            "psf_pa": 100
          },
          {
            "q_m3h": 4000,
            "psf_pa": 70
          },
          {
            "q_m3h": 6000,
            "psf_pa": 30
          },
          {
            "q_m3h": 7000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 2000,
            "psf_pa": 70
          },
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 2000,
            "psf_pa": 70
          },
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 2000,
            "psf_pa": 50
          },
          {
            "q_m3h": 3000,
            "psf_pa": 20
          },
          {
            "q_m3h": 4000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 120
      },
      {
        "q_m3h": 2000,
        "psf_pa": 100
      },
      {
        "q_m3h": 4000,
        "psf_pa": 70
      },
      {
        "q_m3h": 6000,
        "psf_pa": 30
      },
      {
        "q_m3h": 7000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.05,
        "power_w": 470,
        "speed_rpm": 680,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.05,
        "power_w": 470,
        "speed_rpm": 680,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.05,
        "power_w": 470,
        "speed_rpm": 680,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.61,
        "power_w": 330,
        "speed_rpm": 530,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.61,
        "power_w": 330,
        "speed_rpm": 530,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 1.3,
        "power_w": 700,
        "speed_rpm": 750,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 1.3,
        "power_w": 700,
        "speed_rpm": 750,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 1.3,
        "power_w": 700,
        "speed_rpm": 750,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 0.72,
        "power_w": 350,
        "speed_rpm": 410,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 0.72,
        "power_w": 350,
        "speed_rpm": 410,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 1.25,
        "power_w": 740,
        "speed_rpm": 790,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 0.77,
        "power_w": 450,
        "speed_rpm": 490,
        "sound_lwa_db": 72
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN071-ADL.6F.A7P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "154281/10K1 (L guard grille suction side), 154281/10K3 (L guard grille two-sided)",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 710,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400V (Δ/Y) | 3~460V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "motor_technology": "AC",
    "poles": "6-6",
    "electrical_nominal": "3~400V (Δ/Y) | 3~460V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 120,
    "p1_nominal_w": 0,
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 35.3,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 120
          },
          {
            "q_m3h": 2000,
            "psf_pa": 100
          },
          {
            "q_m3h": 4000,
            "psf_pa": 70
          },
          {
            "q_m3h": 6000,
            "psf_pa": 30
          },
          {
            "q_m3h": 7000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 2000,
            "psf_pa": 70
          },
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 2000,
            "psf_pa": 70
          },
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 2000,
            "psf_pa": 50
          },
          {
            "q_m3h": 3000,
            "psf_pa": 20
          },
          {
            "q_m3h": 4000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 120
      },
      {
        "q_m3h": 2000,
        "psf_pa": 100
      },
      {
        "q_m3h": 4000,
        "psf_pa": 70
      },
      {
        "q_m3h": 6000,
        "psf_pa": 30
      },
      {
        "q_m3h": 7000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.05,
        "power_w": 470,
        "speed_rpm": 680,
        "sound_lwa_db": 69
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.93,
        "power_w": 330,
        "speed_rpm": 710,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.61,
        "power_w": 240,
        "speed_rpm": 630,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.46,
        "power_w": 240,
        "speed_rpm": 630,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 1.25,
        "power_w": 740,
        "speed_rpm": 790,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.99,
        "power_w": 500,
        "speed_rpm": 840,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "II",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 1.3,
        "power_w": 700,
        "speed_rpm": 750,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "II",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 0.96,
        "power_w": 470,
        "speed_rpm": 810,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 0.77,
        "power_w": 450,
        "speed_rpm": 490,
        "sound_lwa_db": 67
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 0.62,
        "power_w": 370,
        "speed_rpm": 660,
        "sound_lwa_db": 67
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 0.72,
        "power_w": 350,
        "speed_rpm": 410,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 0.64,
        "power_w": 320,
        "speed_rpm": 570,
        "sound_lwa_db": 65
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN080-SD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (5 pontos) e 60 Hz (7 pontos).",
    "motor_technology": "AC",
    "poles": "8-8",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 680.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 33.1,
    "erp_n_actual": 41.6,
    "erp_n_target": 40,
    "q_max_m3h": 0,
    "dp_max_pa": 120,
    "p1_nominal_w": 470.0,
    "current_nominal_a": 1.05,
    "current_nominal_a_raw": "1.05/0.61 | 1.30/0.72 | 1.25/0.77 A",
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 120
          },
          {
            "q_m3h": 2000,
            "psf_pa": 100
          },
          {
            "q_m3h": 4000,
            "psf_pa": 70
          },
          {
            "q_m3h": 6000,
            "psf_pa": 30
          },
          {
            "q_m3h": 7000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 2000,
            "psf_pa": 70
          },
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 2000,
            "psf_pa": 70
          },
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 5000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 2000,
            "psf_pa": 50
          },
          {
            "q_m3h": 3000,
            "psf_pa": 20
          },
          {
            "q_m3h": 4000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 120
      },
      {
        "q_m3h": 2000,
        "psf_pa": 100
      },
      {
        "q_m3h": 4000,
        "psf_pa": 70
      },
      {
        "q_m3h": 6000,
        "psf_pa": 30
      },
      {
        "q_m3h": 7000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.05,
        "power_w": 470,
        "speed_rpm": 680,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.05,
        "power_w": 470,
        "speed_rpm": 680,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.05,
        "power_w": 470,
        "speed_rpm": 680,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.61,
        "power_w": 330,
        "speed_rpm": 530,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.61,
        "power_w": 330,
        "speed_rpm": 530,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 1.3,
        "power_w": 700,
        "speed_rpm": 750,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 1.3,
        "power_w": 700,
        "speed_rpm": 750,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 1.3,
        "power_w": 700,
        "speed_rpm": 750,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 0.72,
        "power_w": 350,
        "speed_rpm": 410,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 0.72,
        "power_w": 350,
        "speed_rpm": 410,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 1.25,
        "power_w": 740,
        "speed_rpm": 790,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 0.77,
        "power_w": 450,
        "speed_rpm": 490,
        "sound_lwa_db": 72
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN080-SD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y)",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_50_only",
    "motor_technology": "AC",
    "poles": "6-6",
    "electrical_nominal": "3~400 V (Δ/Y) / 50Hz / AC",
    "rpm_nominal": 870.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 35.5,
    "erp_n_actual": 40.1,
    "erp_n_target": 40,
    "q_max_m3h": 22680.0,
    "dp_max_pa": 170,
    "p1_nominal_w": 1.9,
    "current_nominal_a": 3.8,
    "current_nominal_a_raw": "3.80/2.00 A",
    "temp_min_c": -40,
    "temp_max_c": 60,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": true,
    "num_curve_sets": 2,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 170
          },
          {
            "q_m3h": 5000,
            "psf_pa": 150
          },
          {
            "q_m3h": 10000,
            "psf_pa": 100
          },
          {
            "q_m3h": 15000,
            "psf_pa": 40
          },
          {
            "q_m3h": 17000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 90
          },
          {
            "q_m3h": 5000,
            "psf_pa": 80
          },
          {
            "q_m3h": 10000,
            "psf_pa": 50
          },
          {
            "q_m3h": 15000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 170
      },
      {
        "q_m3h": 5000,
        "psf_pa": 150
      },
      {
        "q_m3h": 10000,
        "psf_pa": 100
      },
      {
        "q_m3h": 15000,
        "psf_pa": 40
      },
      {
        "q_m3h": 17000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 3.8,
        "power_w": 1900,
        "speed_rpm": 870,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.8,
        "power_w": 1900,
        "speed_rpm": 870,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 3.8,
        "power_w": 1900,
        "speed_rpm": 870,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 2.0,
        "power_w": 980,
        "speed_rpm": 640,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 2.0,
        "power_w": 980,
        "speed_rpm": 640,
        "sound_lwa_db": 72
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN080-SDL.6N.V7P5",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "168790/10K1 (L guard grille suction side), 168790/10K3 (L guard grille two-sided)",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400V",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_50_only",
    "motor_technology": "AC",
    "poles": "6-6",
    "electrical_nominal": "3~400V / 50Hz / AC",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 170,
    "p1_nominal_w": 0,
    "temp_min_c": -40,
    "temp_max_c": 60,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 59.8,
    "curve_available": true,
    "num_curve_sets": 2,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 170
          },
          {
            "q_m3h": 5000,
            "psf_pa": 150
          },
          {
            "q_m3h": 10000,
            "psf_pa": 100
          },
          {
            "q_m3h": 15000,
            "psf_pa": 40
          },
          {
            "q_m3h": 17000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 90
          },
          {
            "q_m3h": 5000,
            "psf_pa": 80
          },
          {
            "q_m3h": 10000,
            "psf_pa": 50
          },
          {
            "q_m3h": 15000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 170
      },
      {
        "q_m3h": 5000,
        "psf_pa": 150
      },
      {
        "q_m3h": 10000,
        "psf_pa": 100
      },
      {
        "q_m3h": 15000,
        "psf_pa": 40
      },
      {
        "q_m3h": 17000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 3.8,
        "power_w": 1900,
        "speed_rpm": 870,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.3,
        "power_w": 1500,
        "speed_rpm": 900,
        "sound_lwa_db": 79
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.95,
        "power_w": 1100,
        "speed_rpm": 640,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 1.8,
        "power_w": 980,
        "speed_rpm": 710,
        "sound_lwa_db": 73
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN080-SD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (5 pontos) e 60 Hz (5 pontos).",
    "motor_technology": "AC",
    "poles": "6-6",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 800.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 35.5,
    "erp_n_actual": 40.1,
    "erp_n_target": 40,
    "q_max_m3h": 22680.0,
    "dp_max_pa": 170,
    "p1_nominal_w": 1.65,
    "current_nominal_a": 3.5,
    "current_nominal_a_raw": "3.50/1.55 A | 3.80/1.60 A | 4.00/1.75 A",
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": true,
    "num_curve_sets": 2,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 170
          },
          {
            "q_m3h": 5000,
            "psf_pa": 150
          },
          {
            "q_m3h": 10000,
            "psf_pa": 100
          },
          {
            "q_m3h": 15000,
            "psf_pa": 40
          },
          {
            "q_m3h": 17000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 90
          },
          {
            "q_m3h": 5000,
            "psf_pa": 80
          },
          {
            "q_m3h": 10000,
            "psf_pa": 50
          },
          {
            "q_m3h": 15000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 170
      },
      {
        "q_m3h": 5000,
        "psf_pa": 150
      },
      {
        "q_m3h": 10000,
        "psf_pa": 100
      },
      {
        "q_m3h": 15000,
        "psf_pa": 40
      },
      {
        "q_m3h": 17000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 3.5,
        "power_w": 1650,
        "speed_rpm": 800,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.5,
        "power_w": 1650,
        "speed_rpm": 800,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 3.5,
        "power_w": 1650,
        "speed_rpm": 800,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.55,
        "power_w": 820,
        "speed_rpm": 560,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 1.55,
        "power_w": 820,
        "speed_rpm": 560,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 3.8,
        "power_w": 2000,
        "speed_rpm": 820,
        "sound_lwa_db": 79
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 3.8,
        "power_w": 2000,
        "speed_rpm": 820,
        "sound_lwa_db": 79
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 3.8,
        "power_w": 2000,
        "speed_rpm": 820,
        "sound_lwa_db": 79
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 1.6,
        "power_w": 860,
        "speed_rpm": 580,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 1.6,
        "power_w": 860,
        "speed_rpm": 580,
        "sound_lwa_db": 73
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN080-SDL.6N.V7P5",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "168895/10K1 (L guard grille suction side), 168895/10K3 (L guard grille two-sided)",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400V",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_50_only",
    "motor_technology": "AC",
    "poles": "6-6",
    "electrical_nominal": "3~400V / 50Hz / AC",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 170,
    "p1_nominal_w": 0,
    "temp_min_c": -40,
    "temp_max_c": 60,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 59.8,
    "curve_available": true,
    "num_curve_sets": 2,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 170
          },
          {
            "q_m3h": 5000,
            "psf_pa": 150
          },
          {
            "q_m3h": 10000,
            "psf_pa": 100
          },
          {
            "q_m3h": 15000,
            "psf_pa": 40
          },
          {
            "q_m3h": 17000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 90
          },
          {
            "q_m3h": 5000,
            "psf_pa": 80
          },
          {
            "q_m3h": 10000,
            "psf_pa": 50
          },
          {
            "q_m3h": 15000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 170
      },
      {
        "q_m3h": 5000,
        "psf_pa": 150
      },
      {
        "q_m3h": 10000,
        "psf_pa": 100
      },
      {
        "q_m3h": 15000,
        "psf_pa": 40
      },
      {
        "q_m3h": 17000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 3.5,
        "power_w": 1650,
        "speed_rpm": 850,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.1,
        "power_w": 1400,
        "speed_rpm": 850,
        "sound_lwa_db": 77
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.55,
        "power_w": 820,
        "speed_rpm": 560,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 1.45,
        "power_w": 760,
        "speed_rpm": 620,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 4.2,
        "power_w": 2400,
        "speed_rpm": 880,
        "sound_lwa_db": 77
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 3.7,
        "power_w": 2100,
        "speed_rpm": 940,
        "sound_lwa_db": 80
      },
      {
        "curve_id": "II",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 3.8,
        "power_w": 2000,
        "speed_rpm": 870,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "II",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 3.4,
        "power_w": 1750,
        "speed_rpm": 870,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 1.75,
        "power_w": 1050,
        "speed_rpm": 580,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 1.65,
        "power_w": 1000,
        "speed_rpm": 650,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 1.6,
        "power_w": 860,
        "speed_rpm": 520,
        "sound_lwa_db": 63
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 1.5,
        "power_w": 820,
        "speed_rpm": 580,
        "sound_lwa_db": 68
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN080-AD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (5 pontos) e 60 Hz (7 pontos).",
    "motor_technology": "AC",
    "poles": "8-8",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 650.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 33.5,
    "erp_n_actual": 40.3,
    "erp_n_target": 40,
    "q_max_m3h": 0,
    "dp_max_pa": 100,
    "p1_nominal_w": 860.0,
    "current_nominal_a": 2.1,
    "current_nominal_a_raw": "2.10/0.98 A | 2.30/1.00 A | 2.50/1.10 A",
    "temp_min_c": -40,
    "temp_max_c": 65,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 4000,
            "psf_pa": 90
          },
          {
            "q_m3h": 8000,
            "psf_pa": 60
          },
          {
            "q_m3h": 12000,
            "psf_pa": 20
          },
          {
            "q_m3h": 13000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 8000,
            "psf_pa": 30
          },
          {
            "q_m3h": 10000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 8000,
            "psf_pa": 30
          },
          {
            "q_m3h": 10000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 40
          },
          {
            "q_m3h": 4000,
            "psf_pa": 30
          },
          {
            "q_m3h": 6000,
            "psf_pa": 10
          },
          {
            "q_m3h": 7000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 100
      },
      {
        "q_m3h": 4000,
        "psf_pa": 90
      },
      {
        "q_m3h": 8000,
        "psf_pa": 60
      },
      {
        "q_m3h": 12000,
        "psf_pa": 20
      },
      {
        "q_m3h": 13000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 2.1,
        "power_w": 860,
        "speed_rpm": 650,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 2.1,
        "power_w": 860,
        "speed_rpm": 650,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 2.1,
        "power_w": 860,
        "speed_rpm": 650,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.98,
        "power_w": 480,
        "speed_rpm": 490,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.98,
        "power_w": 480,
        "speed_rpm": 490,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 2.3,
        "power_w": 1100,
        "speed_rpm": 680,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 2.3,
        "power_w": 1100,
        "speed_rpm": 680,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 2.3,
        "power_w": 1100,
        "speed_rpm": 680,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 1.0,
        "power_w": 520,
        "speed_rpm": 460,
        "sound_lwa_db": 69
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 1.0,
        "power_w": 520,
        "speed_rpm": 460,
        "sound_lwa_db": 69
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 2.5,
        "power_w": 1300,
        "speed_rpm": 740,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 1.1,
        "power_w": 640,
        "speed_rpm": 510,
        "sound_lwa_db": 71
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN080-ADL.6N.V7P5",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "168903/10K1 (L guard grille suction side), 168903/10K3 (L guard grille two-sided)",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400V (Δ/Y) | 3~460V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "motor_technology": "AC",
    "poles": "8-8",
    "electrical_nominal": "3~400V (Δ/Y) | 3~460V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 100,
    "p1_nominal_w": 0,
    "temp_min_c": -40,
    "temp_max_c": 65,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 59.8,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 4000,
            "psf_pa": 90
          },
          {
            "q_m3h": 8000,
            "psf_pa": 60
          },
          {
            "q_m3h": 12000,
            "psf_pa": 20
          },
          {
            "q_m3h": 13000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 8000,
            "psf_pa": 30
          },
          {
            "q_m3h": 10000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 60
          },
          {
            "q_m3h": 4000,
            "psf_pa": 50
          },
          {
            "q_m3h": 8000,
            "psf_pa": 30
          },
          {
            "q_m3h": 10000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 40
          },
          {
            "q_m3h": 4000,
            "psf_pa": 30
          },
          {
            "q_m3h": 6000,
            "psf_pa": 10
          },
          {
            "q_m3h": 7000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 100
      },
      {
        "q_m3h": 4000,
        "psf_pa": 90
      },
      {
        "q_m3h": 8000,
        "psf_pa": 60
      },
      {
        "q_m3h": 12000,
        "psf_pa": 20
      },
      {
        "q_m3h": 13000,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 2.1,
        "power_w": 860,
        "speed_rpm": 650,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.9,
        "power_w": 700,
        "speed_rpm": 680,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.96,
        "power_w": 480,
        "speed_rpm": 480,
        "sound_lwa_db": 62
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.9,
        "power_w": 440,
        "speed_rpm": 530,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 2.5,
        "power_w": 1300,
        "speed_rpm": 740,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 2.2,
        "power_w": 1100,
        "speed_rpm": 780,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "II",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 2.3,
        "power_w": 1100,
        "speed_rpm": 680,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "II",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 2.1,
        "power_w": 960,
        "speed_rpm": 730,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 1.1,
        "power_w": 640,
        "speed_rpm": 510,
        "sound_lwa_db": 63
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 1.0,
        "power_w": 580,
        "speed_rpm": 570,
        "sound_lwa_db": 67
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 1.0,
        "power_w": 520,
        "speed_rpm": 460,
        "sound_lwa_db": 62
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 0.96,
        "power_w": 480,
        "speed_rpm": 510,
        "sound_lwa_db": 65
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN080-ND",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (5 pontos) e 60 Hz (7 pontos).",
    "motor_technology": "AC",
    "poles": "12-12",
    "electrical_nominal": "3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 250.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 12,
    "p1_nominal_w": 120.0,
    "current_nominal_a": 0.24,
    "current_nominal_a_raw": "0.24/0.09 A | 0.24/0.09 A | 0.27/0.10 A",
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 12
          },
          {
            "q_m3h": 1000,
            "psf_pa": 10
          },
          {
            "q_m3h": 2000,
            "psf_pa": 8
          },
          {
            "q_m3h": 3000,
            "psf_pa": 4
          },
          {
            "q_m3h": 3500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 5
          },
          {
            "q_m3h": 1000,
            "psf_pa": 4
          },
          {
            "q_m3h": 2000,
            "psf_pa": 2
          },
          {
            "q_m3h": 2500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 5
          },
          {
            "q_m3h": 1000,
            "psf_pa": 4
          },
          {
            "q_m3h": 2000,
            "psf_pa": 2
          },
          {
            "q_m3h": 2500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 3
          },
          {
            "q_m3h": 1000,
            "psf_pa": 2
          },
          {
            "q_m3h": 1500,
            "psf_pa": 1
          },
          {
            "q_m3h": 2000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 12
      },
      {
        "q_m3h": 1000,
        "psf_pa": 10
      },
      {
        "q_m3h": 2000,
        "psf_pa": 8
      },
      {
        "q_m3h": 3000,
        "psf_pa": 4
      },
      {
        "q_m3h": 3500,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.24,
        "power_w": 120,
        "speed_rpm": 250,
        "sound_lwa_db": 48
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.24,
        "power_w": 120,
        "speed_rpm": 250,
        "sound_lwa_db": 48
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.24,
        "power_w": 120,
        "speed_rpm": 250,
        "sound_lwa_db": 48
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.09,
        "power_w": 40,
        "speed_rpm": 150,
        "sound_lwa_db": 38
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.09,
        "power_w": 40,
        "speed_rpm": 150,
        "sound_lwa_db": 38
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 0.24,
        "power_w": 110,
        "speed_rpm": 210,
        "sound_lwa_db": 48
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.24,
        "power_w": 110,
        "speed_rpm": 210,
        "sound_lwa_db": 48
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 0.24,
        "power_w": 110,
        "speed_rpm": 210,
        "sound_lwa_db": 48
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 0.09,
        "power_w": 40,
        "speed_rpm": 120,
        "sound_lwa_db": 38
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 0.09,
        "power_w": 40,
        "speed_rpm": 120,
        "sound_lwa_db": 38
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 0.27,
        "power_w": 150,
        "speed_rpm": 250,
        "sound_lwa_db": 48
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 0.1,
        "power_w": 50,
        "speed_rpm": 140,
        "sound_lwa_db": 38
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "FN080-NDL.6N.V7P5",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "174933/10K1 (L guard grille suction side), 174933/10K3 (L guard grille two-sided)",
    "family": "FE2owlet AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9006 (white aluminium)",
    "voltage": "3~400V",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_50_only",
    "motor_technology": "AC",
    "poles": "12-12",
    "electrical_nominal": "3~400V / 50Hz / AC",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 12,
    "p1_nominal_w": 0,
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 59.8,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 12
          },
          {
            "q_m3h": 1000,
            "psf_pa": 10
          },
          {
            "q_m3h": 2000,
            "psf_pa": 8
          },
          {
            "q_m3h": 3000,
            "psf_pa": 4
          },
          {
            "q_m3h": 3500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 5
          },
          {
            "q_m3h": 1000,
            "psf_pa": 4
          },
          {
            "q_m3h": 2000,
            "psf_pa": 2
          },
          {
            "q_m3h": 2500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 5
          },
          {
            "q_m3h": 1000,
            "psf_pa": 4
          },
          {
            "q_m3h": 2000,
            "psf_pa": 2
          },
          {
            "q_m3h": 2500,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 3
          },
          {
            "q_m3h": 1000,
            "psf_pa": 2
          },
          {
            "q_m3h": 1500,
            "psf_pa": 1
          },
          {
            "q_m3h": 2000,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 12
      },
      {
        "q_m3h": 1000,
        "psf_pa": 10
      },
      {
        "q_m3h": 2000,
        "psf_pa": 8
      },
      {
        "q_m3h": 3000,
        "psf_pa": 4
      },
      {
        "q_m3h": 3500,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.24,
        "power_w": 120,
        "speed_rpm": 250,
        "sound_lwa_db": 49
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.23,
        "power_w": 110,
        "speed_rpm": 290,
        "sound_lwa_db": 52
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.09,
        "power_w": 46,
        "speed_rpm": 140,
        "sound_lwa_db": 37
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.09,
        "power_w": 44,
        "speed_rpm": 160,
        "sound_lwa_db": 37
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 0.27,
        "power_w": 150,
        "speed_rpm": 250,
        "sound_lwa_db": 49
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.26,
        "power_w": 140,
        "speed_rpm": 280,
        "sound_lwa_db": 52
      },
      {
        "curve_id": "II",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 0.24,
        "power_w": 110,
        "speed_rpm": 210,
        "sound_lwa_db": 46
      },
      {
        "curve_id": "II",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 0.24,
        "power_w": 110,
        "speed_rpm": 240,
        "sound_lwa_db": 49
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 0.1,
        "power_w": 50,
        "speed_rpm": 140,
        "sound_lwa_db": 37
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 0.1,
        "power_w": 50,
        "speed_rpm": 160,
        "sound_lwa_db": 38
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 0.09,
        "power_w": 40,
        "speed_rpm": 120,
        "sound_lwa_db": 36
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 0.09,
        "power_w": 40,
        "speed_rpm": 140,
        "sound_lwa_db": 37
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "ZN080-ZIL.DG.V5P4",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175991/10C4",
    "family": "FE2owlet-ECblue with ZAplus",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, uncoated",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 950,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 57.4,
    "erp_n_actual": 62.1,
    "erp_n_target": 40,
    "q_max_m3h": 23400,
    "dp_max_pa": 130,
    "p1_nominal_w": 1900,
    "p_sys_w": 1550,
    "current_nominal_a": 3.0,
    "current_nominal_a_raw": "3.00-2.40",
    "temp_min_c": -35,
    "temp_max_c": 60,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 27.7,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 130
          },
          {
            "q_m3h": 4000,
            "psf_pa": 115
          },
          {
            "q_m3h": 8000,
            "psf_pa": 90
          },
          {
            "q_m3h": 12000,
            "psf_pa": 60
          },
          {
            "q_m3h": 16000,
            "psf_pa": 30
          },
          {
            "q_m3h": 18000,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 4000,
            "psf_pa": 70
          },
          {
            "q_m3h": 8000,
            "psf_pa": 55
          },
          {
            "q_m3h": 12000,
            "psf_pa": 35
          },
          {
            "q_m3h": 16000,
            "psf_pa": 15
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 50
          },
          {
            "q_m3h": 4000,
            "psf_pa": 45
          },
          {
            "q_m3h": 8000,
            "psf_pa": 30
          },
          {
            "q_m3h": 12000,
            "psf_pa": 15
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 20
          },
          {
            "q_m3h": 4000,
            "psf_pa": 10
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 130
      },
      {
        "q_m3h": 4000,
        "psf_pa": 115
      },
      {
        "q_m3h": 8000,
        "psf_pa": 90
      },
      {
        "q_m3h": 12000,
        "psf_pa": 60
      },
      {
        "q_m3h": 16000,
        "psf_pa": 30
      },
      {
        "q_m3h": 18000,
        "psf_pa": 10
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.35,
        "power_w": 840,
        "speed_rpm": 700,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.05,
        "power_w": 620,
        "speed_rpm": 700,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.8,
        "power_w": 440,
        "speed_rpm": 560,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.68,
        "power_w": 330,
        "speed_rpm": 560,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 0.46,
        "power_w": 190,
        "speed_rpm": 420,
        "sound_lwa_db": 62
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 0.4,
        "power_w": 150,
        "speed_rpm": 420,
        "sound_lwa_db": 60
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 11,
        "current_a": 0.25,
        "power_w": 70,
        "speed_rpm": 280,
        "sound_lwa_db": 52
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 0.23,
        "power_w": 55,
        "speed_rpm": 280,
        "sound_lwa_db": 51
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "ZN080-ZIL.GG.V5P4",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175991/10C6",
    "family": "FE2owlet-ECblue with ZAplus",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, uncoated",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 950,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 57.4,
    "erp_n_actual": 62.1,
    "erp_n_target": 40,
    "q_max_m3h": 23400,
    "dp_max_pa": 130,
    "p1_nominal_w": 1900,
    "p_sys_w": 1550,
    "current_nominal_a": 3.0,
    "current_nominal_a_raw": "3.00-2.40",
    "temp_min_c": -35,
    "temp_max_c": 60,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 29.7,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 130
          },
          {
            "q_m3h": 4000,
            "psf_pa": 115
          },
          {
            "q_m3h": 8000,
            "psf_pa": 90
          },
          {
            "q_m3h": 12000,
            "psf_pa": 60
          },
          {
            "q_m3h": 16000,
            "psf_pa": 30
          },
          {
            "q_m3h": 18000,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 4000,
            "psf_pa": 70
          },
          {
            "q_m3h": 8000,
            "psf_pa": 55
          },
          {
            "q_m3h": 12000,
            "psf_pa": 35
          },
          {
            "q_m3h": 16000,
            "psf_pa": 15
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 50
          },
          {
            "q_m3h": 4000,
            "psf_pa": 45
          },
          {
            "q_m3h": 8000,
            "psf_pa": 30
          },
          {
            "q_m3h": 12000,
            "psf_pa": 15
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 20
          },
          {
            "q_m3h": 4000,
            "psf_pa": 10
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 130
      },
      {
        "q_m3h": 4000,
        "psf_pa": 115
      },
      {
        "q_m3h": 8000,
        "psf_pa": 90
      },
      {
        "q_m3h": 12000,
        "psf_pa": 60
      },
      {
        "q_m3h": 16000,
        "psf_pa": 30
      },
      {
        "q_m3h": 18000,
        "psf_pa": 10
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.35,
        "power_w": 840,
        "speed_rpm": 700,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.05,
        "power_w": 620,
        "speed_rpm": 700,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.8,
        "power_w": 440,
        "speed_rpm": 560,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.68,
        "power_w": 330,
        "speed_rpm": 560,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 0.46,
        "power_w": 190,
        "speed_rpm": 420,
        "sound_lwa_db": 62
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 0.4,
        "power_w": 150,
        "speed_rpm": 420,
        "sound_lwa_db": 60
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 11,
        "current_a": 0.25,
        "power_w": 70,
        "speed_rpm": 280,
        "sound_lwa_db": 52
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 0.23,
        "power_w": 55,
        "speed_rpm": 280,
        "sound_lwa_db": 51
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "ZN080-ZIL.GL.V7P3",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175993/10C6",
    "family": "FE2owlet-ECblue with ZAplus",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, uncoated",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 1100,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 57.6,
    "erp_n_actual": 61.1,
    "erp_n_target": 40,
    "q_max_m3h": 27000,
    "dp_max_pa": 320,
    "p1_nominal_w": 2900,
    "p_sys_w": 2300,
    "current_nominal_a": 4.6,
    "current_nominal_a_raw": "4.60-3.70",
    "temp_min_c": -35,
    "temp_max_c": 60,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 41.9,
    "curve_available": true,
    "num_curve_sets": 6,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 320
          },
          {
            "q_m3h": 5000,
            "psf_pa": 290
          },
          {
            "q_m3h": 10000,
            "psf_pa": 250
          },
          {
            "q_m3h": 15000,
            "psf_pa": 190
          },
          {
            "q_m3h": 20000,
            "psf_pa": 120
          },
          {
            "q_m3h": 25000,
            "psf_pa": 40
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 250
          },
          {
            "q_m3h": 5000,
            "psf_pa": 220
          },
          {
            "q_m3h": 10000,
            "psf_pa": 180
          },
          {
            "q_m3h": 15000,
            "psf_pa": 120
          },
          {
            "q_m3h": 20000,
            "psf_pa": 60
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 180
          },
          {
            "q_m3h": 5000,
            "psf_pa": 150
          },
          {
            "q_m3h": 10000,
            "psf_pa": 100
          },
          {
            "q_m3h": 15000,
            "psf_pa": 50
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 120
          },
          {
            "q_m3h": 5000,
            "psf_pa": 100
          },
          {
            "q_m3h": 10000,
            "psf_pa": 70
          },
          {
            "q_m3h": 15000,
            "psf_pa": 30
          }
        ]
      },
      {
        "curve_id": "V",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 5000,
            "psf_pa": 70
          },
          {
            "q_m3h": 10000,
            "psf_pa": 40
          }
        ]
      },
      {
        "curve_id": "VI",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 40
          },
          {
            "q_m3h": 5000,
            "psf_pa": 30
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 320
      },
      {
        "q_m3h": 5000,
        "psf_pa": 290
      },
      {
        "q_m3h": 10000,
        "psf_pa": 250
      },
      {
        "q_m3h": 15000,
        "psf_pa": 190
      },
      {
        "q_m3h": 20000,
        "psf_pa": 120
      },
      {
        "q_m3h": 25000,
        "psf_pa": 40
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 4.6,
        "power_w": 2900,
        "speed_rpm": 1100,
        "sound_lwa_db": 87
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.7,
        "power_w": 2300,
        "speed_rpm": 1100,
        "sound_lwa_db": 85
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 2.9,
        "power_w": 1800,
        "speed_rpm": 1100,
        "sound_lwa_db": 82
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 2.4,
        "power_w": 1500,
        "speed_rpm": 1100,
        "sound_lwa_db": 80
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 1.7,
        "power_w": 1000,
        "speed_rpm": 1100,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 1.4,
        "power_w": 800,
        "speed_rpm": 1100,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 11,
        "current_a": 0.9,
        "power_w": 500,
        "speed_rpm": 900,
        "sound_lwa_db": 69
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 0.75,
        "power_w": 400,
        "speed_rpm": 900,
        "sound_lwa_db": 67
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 14,
        "current_a": 0.5,
        "power_w": 250,
        "speed_rpm": 900,
        "sound_lwa_db": 63
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 15,
        "current_a": 0.4,
        "power_w": 200,
        "speed_rpm": 900,
        "sound_lwa_db": 61
      },
      {
        "curve_id": "VI",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 17,
        "current_a": 0.25,
        "power_w": 120,
        "speed_rpm": 900,
        "sound_lwa_db": 57
      },
      {
        "curve_id": "VI",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 18,
        "current_a": 0.2,
        "power_w": 100,
        "speed_rpm": 900,
        "sound_lwa_db": 55
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "ZN091-ZIL.DG.V7P3",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175995/10C4",
    "family": "FE2owlet-ECblue with ZAplus",
    "application": "Oil transformer cooling",
    "diameter_mm": 910,
    "num_blades": 7,
    "blade_material": "Aluminium, uncoated",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 1100,
    "sound_lwa_db": 87,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 25000,
    "dp_max_pa": 320,
    "p1_nominal_w": 2900,
    "p_sys_w": 2900,
    "current_nominal_a": 4.4,
    "current_nominal_a_raw": "4.40",
    "temp_min_c": -35,
    "temp_max_c": 60,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 44.8,
    "curve_available": true,
    "num_curve_sets": 6,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 320
          },
          {
            "q_m3h": 5000,
            "psf_pa": 290
          },
          {
            "q_m3h": 10000,
            "psf_pa": 250
          },
          {
            "q_m3h": 15000,
            "psf_pa": 190
          },
          {
            "q_m3h": 20000,
            "psf_pa": 120
          },
          {
            "q_m3h": 25000,
            "psf_pa": 40
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 250
          },
          {
            "q_m3h": 5000,
            "psf_pa": 220
          },
          {
            "q_m3h": 10000,
            "psf_pa": 180
          },
          {
            "q_m3h": 15000,
            "psf_pa": 120
          },
          {
            "q_m3h": 20000,
            "psf_pa": 60
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 180
          },
          {
            "q_m3h": 5000,
            "psf_pa": 150
          },
          {
            "q_m3h": 10000,
            "psf_pa": 100
          },
          {
            "q_m3h": 15000,
            "psf_pa": 50
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 120
          },
          {
            "q_m3h": 5000,
            "psf_pa": 100
          },
          {
            "q_m3h": 10000,
            "psf_pa": 70
          },
          {
            "q_m3h": 15000,
            "psf_pa": 30
          }
        ]
      },
      {
        "curve_id": "V",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 5000,
            "psf_pa": 70
          },
          {
            "q_m3h": 10000,
            "psf_pa": 40
          }
        ]
      },
      {
        "curve_id": "VI",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 40
          },
          {
            "q_m3h": 5000,
            "psf_pa": 30
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 320
      },
      {
        "q_m3h": 5000,
        "psf_pa": 290
      },
      {
        "q_m3h": 10000,
        "psf_pa": 250
      },
      {
        "q_m3h": 15000,
        "psf_pa": 190
      },
      {
        "q_m3h": 20000,
        "psf_pa": 120
      },
      {
        "q_m3h": 25000,
        "psf_pa": 40
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 4.4,
        "power_w": 2900,
        "speed_rpm": 1100,
        "sound_lwa_db": 87
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.6,
        "power_w": 2300,
        "speed_rpm": 1100,
        "sound_lwa_db": 86
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 4.0,
        "power_w": 2600,
        "speed_rpm": 1060,
        "sound_lwa_db": 85
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 3.2,
        "power_w": 2100,
        "speed_rpm": 1060,
        "sound_lwa_db": 85
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 2.7,
        "power_w": 1750,
        "speed_rpm": 930,
        "sound_lwa_db": 83
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 2.2,
        "power_w": 1400,
        "speed_rpm": 930,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 11,
        "current_a": 1.8,
        "power_w": 1150,
        "speed_rpm": 800,
        "sound_lwa_db": 79
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 1.5,
        "power_w": 920,
        "speed_rpm": 800,
        "sound_lwa_db": 77
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 14,
        "current_a": 1.1,
        "power_w": 680,
        "speed_rpm": 670,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 15,
        "current_a": 0.98,
        "power_w": 560,
        "speed_rpm": 670,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "VI",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 17,
        "current_a": 0.52,
        "power_w": 210,
        "speed_rpm": 440,
        "sound_lwa_db": 62
      },
      {
        "curve_id": "VI",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 18,
        "current_a": 0.48,
        "power_w": 180,
        "speed_rpm": 440,
        "sound_lwa_db": 62
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "ZN091-ZIL.GG.V7P3",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175995/10C6",
    "family": "FE2owlet-ECblue with ZAplus",
    "application": "Oil transformer cooling",
    "diameter_mm": 910,
    "num_blades": 7,
    "blade_material": "Aluminium, uncoated",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 1100,
    "sound_lwa_db": 87,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 25000,
    "dp_max_pa": 320,
    "p1_nominal_w": 2900,
    "p_sys_w": 2900,
    "current_nominal_a": 4.4,
    "current_nominal_a_raw": "4.40",
    "temp_min_c": -35,
    "temp_max_c": 60,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 46.3,
    "curve_available": true,
    "num_curve_sets": 6,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 320
          },
          {
            "q_m3h": 5000,
            "psf_pa": 290
          },
          {
            "q_m3h": 10000,
            "psf_pa": 250
          },
          {
            "q_m3h": 15000,
            "psf_pa": 190
          },
          {
            "q_m3h": 20000,
            "psf_pa": 120
          },
          {
            "q_m3h": 25000,
            "psf_pa": 40
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 250
          },
          {
            "q_m3h": 5000,
            "psf_pa": 220
          },
          {
            "q_m3h": 10000,
            "psf_pa": 180
          },
          {
            "q_m3h": 15000,
            "psf_pa": 120
          },
          {
            "q_m3h": 20000,
            "psf_pa": 60
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 180
          },
          {
            "q_m3h": 5000,
            "psf_pa": 150
          },
          {
            "q_m3h": 10000,
            "psf_pa": 100
          },
          {
            "q_m3h": 15000,
            "psf_pa": 50
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 120
          },
          {
            "q_m3h": 5000,
            "psf_pa": 100
          },
          {
            "q_m3h": 10000,
            "psf_pa": 70
          },
          {
            "q_m3h": 15000,
            "psf_pa": 30
          }
        ]
      },
      {
        "curve_id": "V",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 5000,
            "psf_pa": 70
          },
          {
            "q_m3h": 10000,
            "psf_pa": 40
          }
        ]
      },
      {
        "curve_id": "VI",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 40
          },
          {
            "q_m3h": 5000,
            "psf_pa": 30
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 320
      },
      {
        "q_m3h": 5000,
        "psf_pa": 290
      },
      {
        "q_m3h": 10000,
        "psf_pa": 250
      },
      {
        "q_m3h": 15000,
        "psf_pa": 190
      },
      {
        "q_m3h": 20000,
        "psf_pa": 120
      },
      {
        "q_m3h": 25000,
        "psf_pa": 40
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 4.4,
        "power_w": 2900,
        "speed_rpm": 1100,
        "sound_lwa_db": 87
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.6,
        "power_w": 2300,
        "speed_rpm": 1100,
        "sound_lwa_db": 86
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 4.0,
        "power_w": 2600,
        "speed_rpm": 1060,
        "sound_lwa_db": 85
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 3.2,
        "power_w": 2100,
        "speed_rpm": 1060,
        "sound_lwa_db": 85
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 2.7,
        "power_w": 1750,
        "speed_rpm": 930,
        "sound_lwa_db": 83
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 2.2,
        "power_w": 1400,
        "speed_rpm": 930,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 11,
        "current_a": 1.8,
        "power_w": 1150,
        "speed_rpm": 800,
        "sound_lwa_db": 79
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 1.5,
        "power_w": 920,
        "speed_rpm": 800,
        "sound_lwa_db": 77
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 14,
        "current_a": 1.1,
        "power_w": 680,
        "speed_rpm": 670,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 15,
        "current_a": 0.98,
        "power_w": 560,
        "speed_rpm": 670,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "VI",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 17,
        "current_a": 0.52,
        "power_w": 210,
        "speed_rpm": 440,
        "sound_lwa_db": 62
      },
      {
        "curve_id": "VI",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 18,
        "current_a": 0.48,
        "power_w": 180,
        "speed_rpm": 440,
        "sound_lwa_db": 62
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "ZN091-ZIL.GL.V7P3",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175997/10C6",
    "family": "FE2owlet-ECblue with ZAplus",
    "application": "Oil transformer cooling",
    "diameter_mm": 910,
    "num_blades": 7,
    "blade_material": "Aluminium, uncoated",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 1100,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 57.6,
    "erp_n_actual": 61.1,
    "erp_n_target": 40,
    "q_max_m3h": 30000,
    "dp_max_pa": 320,
    "p1_nominal_w": 4000,
    "p_sys_w": 3300,
    "current_nominal_a": 6.0,
    "current_nominal_a_raw": "6.00-4.80",
    "temp_min_c": -35,
    "temp_max_c": 60,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 58.0,
    "curve_available": true,
    "num_curve_sets": 6,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 320
          },
          {
            "q_m3h": 5000,
            "psf_pa": 290
          },
          {
            "q_m3h": 10000,
            "psf_pa": 250
          },
          {
            "q_m3h": 15000,
            "psf_pa": 190
          },
          {
            "q_m3h": 20000,
            "psf_pa": 120
          },
          {
            "q_m3h": 25000,
            "psf_pa": 40
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 250
          },
          {
            "q_m3h": 5000,
            "psf_pa": 220
          },
          {
            "q_m3h": 10000,
            "psf_pa": 180
          },
          {
            "q_m3h": 15000,
            "psf_pa": 120
          },
          {
            "q_m3h": 20000,
            "psf_pa": 60
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 180
          },
          {
            "q_m3h": 5000,
            "psf_pa": 150
          },
          {
            "q_m3h": 10000,
            "psf_pa": 100
          },
          {
            "q_m3h": 15000,
            "psf_pa": 50
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 120
          },
          {
            "q_m3h": 5000,
            "psf_pa": 100
          },
          {
            "q_m3h": 10000,
            "psf_pa": 70
          },
          {
            "q_m3h": 15000,
            "psf_pa": 30
          }
        ]
      },
      {
        "curve_id": "V",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 5000,
            "psf_pa": 70
          },
          {
            "q_m3h": 10000,
            "psf_pa": 40
          }
        ]
      },
      {
        "curve_id": "VI",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 40
          },
          {
            "q_m3h": 5000,
            "psf_pa": 30
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 320
      },
      {
        "q_m3h": 5000,
        "psf_pa": 290
      },
      {
        "q_m3h": 10000,
        "psf_pa": 250
      },
      {
        "q_m3h": 15000,
        "psf_pa": 190
      },
      {
        "q_m3h": 20000,
        "psf_pa": 120
      },
      {
        "q_m3h": 25000,
        "psf_pa": 40
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 6.0,
        "power_w": 4000,
        "speed_rpm": 1100,
        "sound_lwa_db": 90
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 4.8,
        "power_w": 3300,
        "speed_rpm": 1100,
        "sound_lwa_db": 88
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 3.8,
        "power_w": 2600,
        "speed_rpm": 1100,
        "sound_lwa_db": 85
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 3.2,
        "power_w": 2100,
        "speed_rpm": 1100,
        "sound_lwa_db": 83
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 2.3,
        "power_w": 1500,
        "speed_rpm": 930,
        "sound_lwa_db": 80
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 1.9,
        "power_w": 1200,
        "speed_rpm": 930,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 11,
        "current_a": 1.5,
        "power_w": 900,
        "speed_rpm": 800,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 1.2,
        "power_w": 700,
        "speed_rpm": 800,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 14,
        "current_a": 0.8,
        "power_w": 450,
        "speed_rpm": 670,
        "sound_lwa_db": 69
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 15,
        "current_a": 0.65,
        "power_w": 350,
        "speed_rpm": 670,
        "sound_lwa_db": 67
      },
      {
        "curve_id": "VI",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 17,
        "current_a": 0.4,
        "power_w": 180,
        "speed_rpm": 440,
        "sound_lwa_db": 60
      },
      {
        "curve_id": "VI",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 18,
        "current_a": 0.35,
        "power_w": 150,
        "speed_rpm": 440,
        "sound_lwa_db": 58
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "ZN091-ZIL.GL.V5P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175999/10C4",
    "family": "FE2owlet-ECblue with ZAplus",
    "application": "Oil transformer cooling",
    "diameter_mm": 910,
    "num_blades": 5,
    "blade_material": "Aluminium, uncoated",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 930,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 61.8,
    "erp_n_actual": 66.5,
    "erp_n_target": 40,
    "q_max_m3h": 27000,
    "dp_max_pa": 120,
    "p1_nominal_w": 2000,
    "p_sys_w": 1400,
    "current_nominal_a": 3.1,
    "current_nominal_a_raw": "3.10-2.40",
    "temp_min_c": -35,
    "temp_max_c": 55,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 42.6,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 120
          },
          {
            "q_m3h": 5000,
            "psf_pa": 110
          },
          {
            "q_m3h": 10000,
            "psf_pa": 90
          },
          {
            "q_m3h": 15000,
            "psf_pa": 70
          },
          {
            "q_m3h": 20000,
            "psf_pa": 40
          },
          {
            "q_m3h": 25000,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 5000,
            "psf_pa": 70
          },
          {
            "q_m3h": 10000,
            "psf_pa": 50
          },
          {
            "q_m3h": 15000,
            "psf_pa": 30
          },
          {
            "q_m3h": 20000,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 50
          },
          {
            "q_m3h": 5000,
            "psf_pa": 40
          },
          {
            "q_m3h": 10000,
            "psf_pa": 20
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 20
          },
          {
            "q_m3h": 5000,
            "psf_pa": 10
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 120
      },
      {
        "q_m3h": 5000,
        "psf_pa": 110
      },
      {
        "q_m3h": 10000,
        "psf_pa": 90
      },
      {
        "q_m3h": 15000,
        "psf_pa": 70
      },
      {
        "q_m3h": 20000,
        "psf_pa": 40
      },
      {
        "q_m3h": 25000,
        "psf_pa": 10
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 2.9,
        "power_w": 1950,
        "speed_rpm": 930,
        "sound_lwa_db": 90
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 2.1,
        "power_w": 1400,
        "speed_rpm": 930,
        "sound_lwa_db": 86
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.9,
        "power_w": 1250,
        "speed_rpm": 890,
        "sound_lwa_db": 84
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 1.4,
        "power_w": 860,
        "speed_rpm": 890,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 1.05,
        "power_w": 620,
        "speed_rpm": 700,
        "sound_lwa_db": 77
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 0.78,
        "power_w": 380,
        "speed_rpm": 700,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 11,
        "current_a": 0.64,
        "power_w": 280,
        "speed_rpm": 530,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 0.4,
        "power_w": 130,
        "speed_rpm": 530,
        "sound_lwa_db": 61
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 14,
        "current_a": 0.34,
        "power_w": 100,
        "speed_rpm": 350,
        "sound_lwa_db": 57
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "ZN091-ZIL.GG.V5P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175999/10C6",
    "family": "FE2owlet-ECblue with ZAplus",
    "application": "Oil transformer cooling",
    "diameter_mm": 910,
    "num_blades": 5,
    "blade_material": "Aluminium, uncoated",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 930,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 61.8,
    "erp_n_actual": 66.5,
    "erp_n_target": 40,
    "q_max_m3h": 27000,
    "dp_max_pa": 120,
    "p1_nominal_w": 2000,
    "p_sys_w": 1400,
    "current_nominal_a": 3.1,
    "current_nominal_a_raw": "3.10-2.40",
    "temp_min_c": -35,
    "temp_max_c": 55,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 44.5,
    "curve_available": true,
    "num_curve_sets": 4,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 120
          },
          {
            "q_m3h": 5000,
            "psf_pa": 110
          },
          {
            "q_m3h": 10000,
            "psf_pa": 90
          },
          {
            "q_m3h": 15000,
            "psf_pa": 70
          },
          {
            "q_m3h": 20000,
            "psf_pa": 40
          },
          {
            "q_m3h": 25000,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 80
          },
          {
            "q_m3h": 5000,
            "psf_pa": 70
          },
          {
            "q_m3h": 10000,
            "psf_pa": 50
          },
          {
            "q_m3h": 15000,
            "psf_pa": 30
          },
          {
            "q_m3h": 20000,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 50
          },
          {
            "q_m3h": 5000,
            "psf_pa": 40
          },
          {
            "q_m3h": 10000,
            "psf_pa": 20
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 20
          },
          {
            "q_m3h": 5000,
            "psf_pa": 10
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 120
      },
      {
        "q_m3h": 5000,
        "psf_pa": 110
      },
      {
        "q_m3h": 10000,
        "psf_pa": 90
      },
      {
        "q_m3h": 15000,
        "psf_pa": 70
      },
      {
        "q_m3h": 20000,
        "psf_pa": 40
      },
      {
        "q_m3h": 25000,
        "psf_pa": 10
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 2.9,
        "power_w": 1950,
        "speed_rpm": 930,
        "sound_lwa_db": 90
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 2.1,
        "power_w": 1400,
        "speed_rpm": 930,
        "sound_lwa_db": 86
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.9,
        "power_w": 1250,
        "speed_rpm": 890,
        "sound_lwa_db": 84
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 1.4,
        "power_w": 860,
        "speed_rpm": 890,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 1.05,
        "power_w": 620,
        "speed_rpm": 700,
        "sound_lwa_db": 77
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 0.78,
        "power_w": 380,
        "speed_rpm": 700,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 11,
        "current_a": 0.64,
        "power_w": 280,
        "speed_rpm": 530,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 0.4,
        "power_w": 130,
        "speed_rpm": 530,
        "sound_lwa_db": 61
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 14,
        "current_a": 0.34,
        "power_w": 100,
        "speed_rpm": 350,
        "sound_lwa_db": 57
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "ZN091-ZIL.GL.V5P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "176001/10C4",
    "family": "FE2owlet-ECblue with ZAplus",
    "application": "Oil transformer cooling",
    "diameter_mm": 910,
    "num_blades": 5,
    "blade_material": "Aluminium, uncoated",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 1110,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 61.5,
    "erp_n_actual": 64.7,
    "erp_n_target": 40,
    "q_max_m3h": 27000,
    "dp_max_pa": 130,
    "p1_nominal_w": 3300,
    "p_sys_w": 2300,
    "current_nominal_a": 5.0,
    "current_nominal_a_raw": "5.00-4.00",
    "temp_min_c": -35,
    "temp_max_c": 55,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 47.0,
    "curve_available": true,
    "num_curve_sets": 5,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 130
          },
          {
            "q_m3h": 5000,
            "psf_pa": 120
          },
          {
            "q_m3h": 10000,
            "psf_pa": 100
          },
          {
            "q_m3h": 15000,
            "psf_pa": 80
          },
          {
            "q_m3h": 20000,
            "psf_pa": 50
          },
          {
            "q_m3h": 25000,
            "psf_pa": 20
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 5000,
            "psf_pa": 90
          },
          {
            "q_m3h": 10000,
            "psf_pa": 70
          },
          {
            "q_m3h": 15000,
            "psf_pa": 40
          },
          {
            "q_m3h": 20000,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 70
          },
          {
            "q_m3h": 5000,
            "psf_pa": 60
          },
          {
            "q_m3h": 10000,
            "psf_pa": 40
          },
          {
            "q_m3h": 15000,
            "psf_pa": 20
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 40
          },
          {
            "q_m3h": 5000,
            "psf_pa": 30
          },
          {
            "q_m3h": 10000,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "V",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 20
          },
          {
            "q_m3h": 5000,
            "psf_pa": 10
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 130
      },
      {
        "q_m3h": 5000,
        "psf_pa": 120
      },
      {
        "q_m3h": 10000,
        "psf_pa": 100
      },
      {
        "q_m3h": 15000,
        "psf_pa": 80
      },
      {
        "q_m3h": 20000,
        "psf_pa": 50
      },
      {
        "q_m3h": 25000,
        "psf_pa": 20
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 5.0,
        "power_w": 3300,
        "speed_rpm": 1110,
        "sound_lwa_db": 96
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.4,
        "power_w": 2300,
        "speed_rpm": 1110,
        "sound_lwa_db": 92
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 2.8,
        "power_w": 1850,
        "speed_rpm": 980,
        "sound_lwa_db": 90
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 2.4,
        "power_w": 1600,
        "speed_rpm": 980,
        "sound_lwa_db": 87
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 2.0,
        "power_w": 1300,
        "speed_rpm": 920,
        "sound_lwa_db": 86
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 1.8,
        "power_w": 1200,
        "speed_rpm": 920,
        "sound_lwa_db": 84
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 11,
        "current_a": 1.35,
        "power_w": 840,
        "speed_rpm": 790,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 1.15,
        "power_w": 700,
        "speed_rpm": 790,
        "sound_lwa_db": 80
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 14,
        "current_a": 0.9,
        "power_w": 500,
        "speed_rpm": 650,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 15,
        "current_a": 0.58,
        "power_w": 260,
        "speed_rpm": 650,
        "sound_lwa_db": 69
      },
      {
        "curve_id": "VI",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 17,
        "current_a": 0.48,
        "power_w": 190,
        "speed_rpm": 450,
        "sound_lwa_db": 64
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "ZN091-ZIL.GL.V5P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "176001/10C6",
    "family": "FE2owlet-ECblue with ZAplus",
    "application": "Oil transformer cooling",
    "diameter_mm": 910,
    "num_blades": 5,
    "blade_material": "Aluminium, uncoated",
    "rotor_material": "Steel, 2 coat paint, RAL 5002 (ultramarine blue)",
    "voltage": "3~380-480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~380-480V / 50/60Hz / EC",
    "rpm_nominal": 1110,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 61.5,
    "erp_n_actual": 64.7,
    "erp_n_target": 40,
    "q_max_m3h": 27000,
    "dp_max_pa": 130,
    "p1_nominal_w": 3300,
    "p_sys_w": 2300,
    "current_nominal_a": 5.0,
    "current_nominal_a_raw": "5.00-4.00",
    "temp_min_c": -35,
    "temp_max_c": 55,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 48.8,
    "curve_available": true,
    "num_curve_sets": 5,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 130
          },
          {
            "q_m3h": 5000,
            "psf_pa": 120
          },
          {
            "q_m3h": 10000,
            "psf_pa": 100
          },
          {
            "q_m3h": 15000,
            "psf_pa": 80
          },
          {
            "q_m3h": 20000,
            "psf_pa": 50
          },
          {
            "q_m3h": 25000,
            "psf_pa": 20
          }
        ]
      },
      {
        "curve_id": "II",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 100
          },
          {
            "q_m3h": 5000,
            "psf_pa": 90
          },
          {
            "q_m3h": 10000,
            "psf_pa": 70
          },
          {
            "q_m3h": 15000,
            "psf_pa": 40
          },
          {
            "q_m3h": 20000,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "III",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 70
          },
          {
            "q_m3h": 5000,
            "psf_pa": 60
          },
          {
            "q_m3h": 10000,
            "psf_pa": 40
          },
          {
            "q_m3h": 15000,
            "psf_pa": 20
          }
        ]
      },
      {
        "curve_id": "IV",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 40
          },
          {
            "q_m3h": 5000,
            "psf_pa": 30
          },
          {
            "q_m3h": 10000,
            "psf_pa": 10
          }
        ]
      },
      {
        "curve_id": "V",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 20
          },
          {
            "q_m3h": 5000,
            "psf_pa": 10
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 130
      },
      {
        "q_m3h": 5000,
        "psf_pa": 120
      },
      {
        "q_m3h": 10000,
        "psf_pa": 100
      },
      {
        "q_m3h": 15000,
        "psf_pa": 80
      },
      {
        "q_m3h": 20000,
        "psf_pa": 50
      },
      {
        "q_m3h": 25000,
        "psf_pa": 20
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 5.0,
        "power_w": 3300,
        "speed_rpm": 1110,
        "sound_lwa_db": 96
      },
      {
        "curve_id": "I",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.4,
        "power_w": 2300,
        "speed_rpm": 1110,
        "sound_lwa_db": 92
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 2.8,
        "power_w": 1850,
        "speed_rpm": 980,
        "sound_lwa_db": 90
      },
      {
        "curve_id": "II",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 2.4,
        "power_w": 1600,
        "speed_rpm": 980,
        "sound_lwa_db": 87
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 8,
        "current_a": 2.0,
        "power_w": 1300,
        "speed_rpm": 920,
        "sound_lwa_db": 86
      },
      {
        "curve_id": "III",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 9,
        "current_a": 1.8,
        "power_w": 1200,
        "speed_rpm": 920,
        "sound_lwa_db": 84
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 11,
        "current_a": 1.35,
        "power_w": 840,
        "speed_rpm": 790,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "IV",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 12,
        "current_a": 1.15,
        "power_w": 700,
        "speed_rpm": 790,
        "sound_lwa_db": 80
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 14,
        "current_a": 0.9,
        "power_w": 500,
        "speed_rpm": 650,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "V",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 15,
        "current_a": 0.58,
        "power_w": 260,
        "speed_rpm": 650,
        "sound_lwa_db": 69
      },
      {
        "curve_id": "VI",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 17,
        "current_a": 0.48,
        "power_w": 190,
        "speed_rpm": 450,
        "sound_lwa_db": 64
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "ZN071-AD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet with ZAplus AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 710,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "voltage": "3~ 400 V (Δ/Y) | 3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_ac_dual_no_60hz",
    "frequency_notes": "Motor AC: declarado para 50/60 Hz mas apenas dados de 50 Hz disponíveis no catálogo.",
    "motor_technology": "AC",
    "poles": "8-8",
    "electrical_nominal": "3~ 400 V (Δ/Y) | 3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50Hz / AC",
    "rpm_nominal": 680,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 38.0,
    "erp_n_actual": 46.7,
    "erp_n_target": 40.0,
    "q_max_m3h": 10440.0,
    "dp_max_pa": 0,
    "p1_nominal_w": 460.0,
    "p_sys_w": 230.0,
    "current_nominal_a": 1.05,
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "has_50hz_performance": false,
    "has_60hz_performance": false
  },
  {
    "model": "ZN071-ADL.6F.V7P1",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "176030/10K4",
    "family": "FE2owlet with ZAplus AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 710,
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "electrical_nominal": "50/60Hz",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "weight_kg": 29.5,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.05,
        "power_w": 460,
        "speed_rpm": 680,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.94,
        "power_w": 330,
        "speed_rpm": 710,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.6,
        "power_w": 240,
        "speed_rpm": 610,
        "sound_lwa_db": 67
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.46,
        "power_w": 200,
        "speed_rpm": 530,
        "sound_lwa_db": 64
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 1.25,
        "power_w": 700,
        "speed_rpm": 780,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 1.0,
        "power_w": 500,
        "speed_rpm": 830,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 1.25,
        "power_w": 460,
        "speed_rpm": 800,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 0.98,
        "power_w": 390,
        "speed_rpm": 750,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 0.72,
        "power_w": 350,
        "speed_rpm": 630,
        "sound_lwa_db": 63
      },
      {
        "curve_id": "III",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 0.62,
        "power_w": 300,
        "speed_rpm": 680,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 0.66,
        "power_w": 290,
        "speed_rpm": 540,
        "sound_lwa_db": 59
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 0.6,
        "power_w": 290,
        "speed_rpm": 540,
        "sound_lwa_db": 64
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "ZN080-SD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet with ZAplus AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "voltage": "3~ 400 V (Δ/Y)",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_50_only",
    "motor_technology": "AC",
    "poles": "6-6",
    "electrical_nominal": "3~ 400 V (Δ/Y) / 50Hz / AC",
    "rpm_nominal": 870,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 42.7,
    "erp_n_actual": 47.5,
    "erp_n_target": 40.0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 1950.0,
    "current_nominal_a": 3.8,
    "temp_min_c": -40,
    "temp_max_c": 60,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "has_50hz_performance": false,
    "has_60hz_performance": false
  },
  {
    "model": "ZN080-SDL.6N.V7P5",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "176052/10K4",
    "family": "FE2owlet with ZAplus AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "D_no_data",
    "frequency_notes": "Frequência não informada no catálogo. Assumido 50 Hz (padrão europeu).",
    "electrical_nominal": "50Hz",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "weight_kg": 42.8,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 3.8,
        "power_w": 1950,
        "speed_rpm": 870,
        "sound_lwa_db": 80
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.2,
        "power_w": 1500,
        "speed_rpm": 900,
        "sound_lwa_db": 83
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.95,
        "power_w": 1100,
        "speed_rpm": 630,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 1.75,
        "power_w": 980,
        "speed_rpm": 700,
        "sound_lwa_db": 76
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "ZN080-ADL",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet with ZAplus AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 800,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "voltage": "3~ 400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_ac_dual_no_60hz",
    "frequency_notes": "Motor AC: declarado para 50/60 Hz mas apenas dados de 50 Hz disponíveis no catálogo.",
    "motor_technology": "AC",
    "poles": "6-6",
    "electrical_nominal": "3~ 400 V (Δ/Y) | 3~460 V (Δ/Y) / 50Hz / AC",
    "rpm_nominal": 800,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 39.4,
    "erp_n_actual": 44.4,
    "erp_n_target": 40.0,
    "q_max_m3h": 20160.0,
    "dp_max_pa": 0,
    "p1_nominal_w": 1650.0,
    "p_sys_w": 1400.0,
    "current_nominal_a": 3.6,
    "temp_min_c": -40,
    "temp_max_c": 65,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "has_50hz_performance": false,
    "has_60hz_performance": false
  },
  {
    "model": "ZN091-VD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet with ZAplus AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 910,
    "num_blades": 5,
    "blade_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "voltage": "3~ 400 V (Δ/Y)",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_50_only",
    "motor_technology": "AC",
    "poles": "4-4",
    "electrical_nominal": "3~ 400 V (Δ/Y) / 50Hz / AC",
    "rpm_nominal": 1230,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 45.7,
    "erp_n_actual": 47.6,
    "erp_n_target": 40.0,
    "q_max_m3h": 38160.0,
    "dp_max_pa": 0,
    "p1_nominal_w": 5600.0,
    "p_sys_w": 2800.0,
    "current_nominal_a": 9.0,
    "temp_min_c": -40,
    "temp_max_c": 45,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "has_50hz_performance": false,
    "has_60hz_performance": false
  },
  {
    "model": "ZN091-SD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet with ZAplus AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 910,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "voltage": "3~ 400 V (Δ/Y) | 3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "motor_technology": "AC",
    "poles": "6-6",
    "electrical_nominal": "3~ 400 V (Δ/Y) | 3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 880,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 44.7,
    "erp_n_actual": 49.6,
    "erp_n_target": 40.0,
    "q_max_m3h": 29160.0,
    "dp_max_pa": 0,
    "p1_nominal_w": 2000.0,
    "p_sys_w": 1450.0,
    "current_nominal_a": 4.4,
    "temp_min_c": -40,
    "temp_max_c": 40,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 4.4,
        "power_w": 2000,
        "speed_rpm": 880,
        "sound_lwa_db": 87
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 3.9,
        "power_w": 1700,
        "speed_rpm": 900,
        "sound_lwa_db": 87
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 2.2,
        "power_w": 1150,
        "speed_rpm": 680,
        "sound_lwa_db": 80
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 2.0,
        "power_w": 930,
        "speed_rpm": 740,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 5.2,
        "power_w": 2700,
        "speed_rpm": 900,
        "sound_lwa_db": 89
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 4.9,
        "power_w": 2400,
        "speed_rpm": 960,
        "sound_lwa_db": 89
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 2.3,
        "power_w": 1150,
        "speed_rpm": 760,
        "sound_lwa_db": 82
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 2.1,
        "power_w": 1070,
        "speed_rpm": 820,
        "sound_lwa_db": 83
      },
      {
        "curve_id": "III",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 5.4,
        "power_w": 3100,
        "speed_rpm": 990,
        "sound_lwa_db": 90
      },
      {
        "curve_id": "III",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 5.2,
        "power_w": 2900,
        "speed_rpm": 1040,
        "sound_lwa_db": 90
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 2.4,
        "power_w": 1200,
        "speed_rpm": 860,
        "sound_lwa_db": 83
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 2.2,
        "power_w": 1130,
        "speed_rpm": 910,
        "sound_lwa_db": 84
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "ZN091-AD",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet with ZAplus AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 910,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "voltage": "3~ 400 V (Δ/Y) | 3~400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (8 pontos).",
    "motor_technology": "AC",
    "poles": "8-8",
    "electrical_nominal": "3~ 400 V (Δ/Y) | 3~400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 660,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 43.4,
    "erp_n_actual": 50.1,
    "erp_n_target": 40.0,
    "q_max_m3h": 20160.0,
    "dp_max_pa": 0,
    "p1_nominal_w": 920.0,
    "p_sys_w": 690.0,
    "current_nominal_a": 2.2,
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 2.2,
        "power_w": 920,
        "speed_rpm": 660,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.1,
        "power_w": 500,
        "speed_rpm": 690,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 1.15,
        "power_w": 580,
        "speed_rpm": 570,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 1.1,
        "power_w": 540,
        "speed_rpm": 610,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 2.5,
        "power_w": 1250,
        "speed_rpm": 690,
        "sound_lwa_db": 80
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 1.25,
        "power_w": 580,
        "speed_rpm": 740,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 1.25,
        "power_w": 640,
        "speed_rpm": 640,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 1.2,
        "power_w": 610,
        "speed_rpm": 690,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "III",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 8,
        "current_a": 2.6,
        "power_w": 1400,
        "speed_rpm": 760,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "III",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 9,
        "current_a": 1.3,
        "power_w": 690,
        "speed_rpm": 800,
        "sound_lwa_db": 76
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 11,
        "current_a": 1.4,
        "power_w": 720,
        "speed_rpm": 700,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "IV",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 12,
        "current_a": 1.3,
        "power_w": 660,
        "speed_rpm": 740,
        "sound_lwa_db": 76
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "ZN091-ND",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "FE2owlet with ZAplus AC 3~",
    "application": "Oil transformer cooling",
    "diameter_mm": 910,
    "num_blades": 7,
    "blade_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "rotor_material": "Aluminium, 2 coat paint, RAL 9005 (jet black)",
    "voltage": "3~ 400 V (Δ/Y) | 3~460 V (Δ/Y)",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (4 pontos) e 60 Hz (4 pontos).",
    "motor_technology": "AC",
    "poles": "12-12",
    "electrical_nominal": "3~ 400 V (Δ/Y) | 3~460 V (Δ/Y) / 50/60Hz / AC",
    "rpm_nominal": 440,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 34.9,
    "erp_n_actual": 44.7,
    "erp_n_target": 40.0,
    "q_max_m3h": 10800.0,
    "dp_max_pa": 0,
    "p1_nominal_w": 310.0,
    "p_sys_w": 240.0,
    "current_nominal_a": 0.76,
    "temp_min_c": -40,
    "temp_max_c": 70,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.76,
        "power_w": 310,
        "speed_rpm": 440,
        "sound_lwa_db": 60
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.37,
        "power_w": 190,
        "speed_rpm": 330,
        "sound_lwa_db": 56
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 5,
        "current_a": 0.84,
        "power_w": 420,
        "speed_rpm": 470,
        "sound_lwa_db": 62
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 400,
        "frequency_hz": 50,
        "operating_point": 6,
        "current_a": 0.4,
        "power_w": 200,
        "speed_rpm": 300,
        "sound_lwa_db": 55
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 0.88,
        "power_w": 420,
        "speed_rpm": 470,
        "sound_lwa_db": 62
      },
      {
        "curve_id": "I",
        "connection": "Δ",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.44,
        "power_w": 260,
        "speed_rpm": 300,
        "sound_lwa_db": 58
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 5,
        "current_a": 0.88,
        "power_w": 460,
        "speed_rpm": 500,
        "sound_lwa_db": 64
      },
      {
        "curve_id": "II",
        "connection": "Y",
        "voltage_v": 460,
        "frequency_hz": 60,
        "operating_point": 6,
        "current_a": 0.44,
        "power_w": 260,
        "speed_rpm": 350,
        "sound_lwa_db": 57
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "QK08A-2E",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "Cross Flow Fan",
    "application": "Dry transformer cooling",
    "diameter_mm": 92,
    "blade_material": "aluminium",
    "voltage": "1~ 230 V ±10%",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_ac_dual_no_60hz",
    "frequency_notes": "Motor AC: declarado para 50/60 Hz mas apenas dados de 50 Hz disponíveis no catálogo.",
    "motor_technology": "AC",
    "poles": "2",
    "electrical_nominal": "1~ 230 V ±10% / 50Hz / AC",
    "rpm_nominal": 2440.0,
    "sound_lwa_db": 75,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 850,
    "dp_max_pa": 200,
    "p1_nominal_w": 160.0,
    "current_nominal_a": 0.72,
    "current_nominal_a_raw": "0.72/0.94",
    "temp_min_c": -20,
    "temp_max_c": 70,
    "ip_protection": "IP10",
    "thermal_class": "THCL130",
    "curve_available": true,
    "num_curve_sets": 2,
    "curve_sets": [
      {
        "curve_id": "characteristic_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 200
          },
          {
            "q_m3h": 200,
            "psf_pa": 180
          },
          {
            "q_m3h": 400,
            "psf_pa": 140
          },
          {
            "q_m3h": 600,
            "psf_pa": 80
          },
          {
            "q_m3h": 800,
            "psf_pa": 20
          }
        ]
      },
      {
        "curve_id": "power_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 130
          },
          {
            "q_m3h": 200,
            "psf_pa": 140
          },
          {
            "q_m3h": 400,
            "psf_pa": 150
          },
          {
            "q_m3h": 600,
            "psf_pa": 160
          },
          {
            "q_m3h": 800,
            "psf_pa": 170
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 200
      },
      {
        "q_m3h": 200,
        "psf_pa": 180
      },
      {
        "q_m3h": 400,
        "psf_pa": 140
      },
      {
        "q_m3h": 600,
        "psf_pa": 80
      },
      {
        "q_m3h": 800,
        "psf_pa": 20
      }
    ],
    "performance_data": [],
    "has_50hz_performance": false,
    "has_60hz_performance": false
  },
  {
    "model": "QK08A-2EM.35.CF",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "205156",
    "family": "Cross Flow Fan",
    "application": "Dry transformer cooling",
    "diameter_mm": 92,
    "blade_material": "aluminium",
    "voltage": "1~ 230V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (3 pontos) e 60 Hz (3 pontos).",
    "motor_technology": "AC",
    "electrical_nominal": "1~ 230V / 50/60Hz / AC",
    "rpm_nominal": 2440.0,
    "sound_lwa_db": 76,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 150.0,
    "current_nominal_a": 0.66,
    "current_nominal_a_raw": "0.66/0.88",
    "temp_min_c": -20,
    "temp_max_c": 70,
    "ip_protection": "IP10",
    "thermal_class": "THCL130",
    "weight_kg": 3.6,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 0.46,
        "power_w": 95,
        "speed_rpm": 2850,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.52,
        "power_w": 110,
        "speed_rpm": 2720,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.66,
        "power_w": 150,
        "speed_rpm": 2440,
        "sound_lwa_db": 75
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 1,
        "current_a": 0.58,
        "power_w": 130,
        "speed_rpm": 3350,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 0.68,
        "power_w": 160,
        "speed_rpm": 3150,
        "sound_lwa_db": 74
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.88,
        "power_w": 200,
        "speed_rpm": 2600,
        "sound_lwa_db": 76
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "QK08A-4E",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "Cross Flow Fan",
    "application": "Dry transformer cooling",
    "diameter_mm": 92,
    "blade_material": "aluminium",
    "voltage": "1~ 230 V ±10%",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_ac_dual_no_60hz",
    "frequency_notes": "Motor AC: declarado para 50/60 Hz mas apenas dados de 50 Hz disponíveis no catálogo.",
    "motor_technology": "AC",
    "poles": "4",
    "electrical_nominal": "1~ 230 V ±10% / 50Hz / AC",
    "rpm_nominal": 1380.0,
    "sound_lwa_db": 68,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 1000,
    "dp_max_pa": 45,
    "p1_nominal_w": 90.0,
    "current_nominal_a": 0.39,
    "current_nominal_a_raw": "0.39/0.56",
    "temp_min_c": -20,
    "temp_max_c": 70,
    "ip_protection": "IP10",
    "thermal_class": "THCL130",
    "curve_available": true,
    "num_curve_sets": 3,
    "curve_sets": [
      {
        "curve_id": "characteristic_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 45
          },
          {
            "q_m3h": 200,
            "psf_pa": 35
          },
          {
            "q_m3h": 400,
            "psf_pa": 25
          },
          {
            "q_m3h": 600,
            "psf_pa": 15
          },
          {
            "q_m3h": 800,
            "psf_pa": 5
          },
          {
            "q_m3h": 1000,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "power_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 150
          },
          {
            "q_m3h": 200,
            "psf_pa": 140
          },
          {
            "q_m3h": 400,
            "psf_pa": 130
          },
          {
            "q_m3h": 600,
            "psf_pa": 120
          },
          {
            "q_m3h": 800,
            "psf_pa": 110
          },
          {
            "q_m3h": 1000,
            "psf_pa": 100
          }
        ]
      },
      {
        "curve_id": "sound_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 63
          },
          {
            "q_m3h": 200,
            "psf_pa": 64
          },
          {
            "q_m3h": 400,
            "psf_pa": 65
          },
          {
            "q_m3h": 600,
            "psf_pa": 66
          },
          {
            "q_m3h": 800,
            "psf_pa": 67
          },
          {
            "q_m3h": 1000,
            "psf_pa": 68
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 45
      },
      {
        "q_m3h": 200,
        "psf_pa": 35
      },
      {
        "q_m3h": 400,
        "psf_pa": 25
      },
      {
        "q_m3h": 600,
        "psf_pa": 15
      },
      {
        "q_m3h": 800,
        "psf_pa": 5
      },
      {
        "q_m3h": 1000,
        "psf_pa": 0
      }
    ],
    "performance_data": [],
    "has_50hz_performance": false,
    "has_60hz_performance": false
  },
  {
    "model": "QK08A-4EM.70.CF",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "205155",
    "family": "Cross Flow Fan",
    "application": "Dry transformer cooling",
    "diameter_mm": 92,
    "blade_material": "aluminium",
    "voltage": "1~ 230V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (3 pontos) e 60 Hz (3 pontos).",
    "motor_technology": "AC",
    "electrical_nominal": "1~ 230V / 50/60Hz / AC",
    "rpm_nominal": 1380.0,
    "sound_lwa_db": 68,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 85.0,
    "current_nominal_a": 0.37,
    "current_nominal_a_raw": "0.37/0.54",
    "temp_min_c": -20,
    "temp_max_c": 70,
    "ip_protection": "IP10",
    "thermal_class": "THCL130",
    "weight_kg": 4.7,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 0.31,
        "power_w": 70,
        "speed_rpm": 1460,
        "sound_lwa_db": 58
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.33,
        "power_w": 75,
        "speed_rpm": 1430,
        "sound_lwa_db": 58
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.37,
        "power_w": 85,
        "speed_rpm": 1380,
        "sound_lwa_db": 64
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 1,
        "current_a": 0.44,
        "power_w": 100,
        "speed_rpm": 1740,
        "sound_lwa_db": 64
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 0.48,
        "power_w": 110,
        "speed_rpm": 1680,
        "sound_lwa_db": 64
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.54,
        "power_w": 120,
        "speed_rpm": 1580,
        "sound_lwa_db": 68
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "QK10A-2E",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "Cross Flow Fan",
    "application": "Dry transformer cooling",
    "diameter_mm": 138,
    "blade_material": "aluminium",
    "voltage": "1~ 230 V ±10%",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_ac_dual_no_60hz",
    "frequency_notes": "Motor AC: declarado para 50/60 Hz mas apenas dados de 50 Hz disponíveis no catálogo.",
    "motor_technology": "AC",
    "poles": "2",
    "electrical_nominal": "1~ 230 V ±10% / 50Hz / AC",
    "rpm_nominal": 2630.0,
    "sound_lwa_db": 85,
    "erp_efficiency_pct": 20.8,
    "erp_n_actual": 24.5,
    "erp_n_target": 21,
    "q_max_m3h": 1800,
    "dp_max_pa": 370,
    "p1_nominal_w": 640.0,
    "current_nominal_a": 2.8,
    "current_nominal_a_raw": "2.80/3.10",
    "temp_min_c": -20,
    "temp_max_c": 70,
    "ip_protection": "IP10",
    "thermal_class": "THCL155",
    "curve_available": true,
    "num_curve_sets": 3,
    "curve_sets": [
      {
        "curve_id": "characteristic_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 370
          },
          {
            "q_m3h": 400,
            "psf_pa": 300
          },
          {
            "q_m3h": 800,
            "psf_pa": 200
          },
          {
            "q_m3h": 1200,
            "psf_pa": 100
          },
          {
            "q_m3h": 1600,
            "psf_pa": 20
          },
          {
            "q_m3h": 1800,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "power_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 250
          },
          {
            "q_m3h": 400,
            "psf_pa": 300
          },
          {
            "q_m3h": 800,
            "psf_pa": 350
          },
          {
            "q_m3h": 1200,
            "psf_pa": 400
          },
          {
            "q_m3h": 1600,
            "psf_pa": 450
          },
          {
            "q_m3h": 1800,
            "psf_pa": 480
          }
        ]
      },
      {
        "curve_id": "sound_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 82
          },
          {
            "q_m3h": 400,
            "psf_pa": 83
          },
          {
            "q_m3h": 800,
            "psf_pa": 84
          },
          {
            "q_m3h": 1200,
            "psf_pa": 85
          },
          {
            "q_m3h": 1600,
            "psf_pa": 85
          },
          {
            "q_m3h": 1800,
            "psf_pa": 85
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 370
      },
      {
        "q_m3h": 400,
        "psf_pa": 300
      },
      {
        "q_m3h": 800,
        "psf_pa": 200
      },
      {
        "q_m3h": 1200,
        "psf_pa": 100
      },
      {
        "q_m3h": 1600,
        "psf_pa": 20
      },
      {
        "q_m3h": 1800,
        "psf_pa": 0
      }
    ],
    "performance_data": [],
    "has_50hz_performance": false,
    "has_60hz_performance": false
  },
  {
    "model": "QK10A-2EM.48.FK",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "110179",
    "family": "Cross Flow Fan",
    "application": "Dry transformer cooling",
    "diameter_mm": 138,
    "blade_material": "aluminium",
    "voltage": "1~ 230V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (3 pontos) e 60 Hz (3 pontos).",
    "motor_technology": "AC",
    "electrical_nominal": "1~ 230V / 50/60Hz / AC",
    "rpm_nominal": 2630.0,
    "sound_lwa_db": 86,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 500.0,
    "current_nominal_a": 2.2,
    "current_nominal_a_raw": "2.20/3.10",
    "temp_min_c": -20,
    "temp_max_c": 70,
    "ip_protection": "IP10",
    "thermal_class": "THCL155",
    "weight_kg": 9.5,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 1.2,
        "power_w": 250,
        "speed_rpm": 2850,
        "sound_lwa_db": 79
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.45,
        "power_w": 320,
        "speed_rpm": 2820,
        "sound_lwa_db": 81
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 2.2,
        "power_w": 500,
        "speed_rpm": 2630,
        "sound_lwa_db": 86
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 1,
        "current_a": 2.1,
        "power_w": 440,
        "speed_rpm": 3370,
        "sound_lwa_db": 83
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 2.3,
        "power_w": 520,
        "speed_rpm": 3240,
        "sound_lwa_db": 82
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 3.1,
        "power_w": 720,
        "speed_rpm": 2900,
        "sound_lwa_db": 86
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "QK10A-4E",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "",
    "family": "Cross Flow Fan",
    "application": "Dry transformer cooling",
    "diameter_mm": 138,
    "blade_material": "aluminium",
    "voltage": "1~ 230 V ±10%",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_ac_dual_no_60hz",
    "frequency_notes": "Motor AC: declarado para 50/60 Hz mas apenas dados de 50 Hz disponíveis no catálogo.",
    "motor_technology": "AC",
    "poles": "4",
    "electrical_nominal": "1~ 230 V ±10% / 50Hz / AC",
    "rpm_nominal": 1130.0,
    "sound_lwa_db": 68,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 1300,
    "dp_max_pa": 82,
    "p1_nominal_w": 130.0,
    "current_nominal_a": 0.58,
    "current_nominal_a_raw": "0.58/0.68",
    "temp_min_c": -20,
    "temp_max_c": 70,
    "ip_protection": "IP10",
    "thermal_class": "THCL130",
    "curve_available": true,
    "num_curve_sets": 3,
    "curve_sets": [
      {
        "curve_id": "characteristic_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 82
          },
          {
            "q_m3h": 200,
            "psf_pa": 75
          },
          {
            "q_m3h": 400,
            "psf_pa": 65
          },
          {
            "q_m3h": 600,
            "psf_pa": 50
          },
          {
            "q_m3h": 800,
            "psf_pa": 35
          },
          {
            "q_m3h": 1000,
            "psf_pa": 20
          },
          {
            "q_m3h": 1200,
            "psf_pa": 5
          },
          {
            "q_m3h": 1300,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "power_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 55
          },
          {
            "q_m3h": 200,
            "psf_pa": 60
          },
          {
            "q_m3h": 400,
            "psf_pa": 65
          },
          {
            "q_m3h": 600,
            "psf_pa": 70
          },
          {
            "q_m3h": 800,
            "psf_pa": 75
          },
          {
            "q_m3h": 1000,
            "psf_pa": 80
          },
          {
            "q_m3h": 1200,
            "psf_pa": 85
          },
          {
            "q_m3h": 1300,
            "psf_pa": 88
          }
        ]
      },
      {
        "curve_id": "sound_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 65
          },
          {
            "q_m3h": 200,
            "psf_pa": 66
          },
          {
            "q_m3h": 400,
            "psf_pa": 67
          },
          {
            "q_m3h": 600,
            "psf_pa": 68
          },
          {
            "q_m3h": 800,
            "psf_pa": 68
          },
          {
            "q_m3h": 1000,
            "psf_pa": 67
          },
          {
            "q_m3h": 1200,
            "psf_pa": 66
          },
          {
            "q_m3h": 1300,
            "psf_pa": 65
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 82
      },
      {
        "q_m3h": 200,
        "psf_pa": 75
      },
      {
        "q_m3h": 400,
        "psf_pa": 65
      },
      {
        "q_m3h": 600,
        "psf_pa": 50
      },
      {
        "q_m3h": 800,
        "psf_pa": 35
      },
      {
        "q_m3h": 1000,
        "psf_pa": 20
      },
      {
        "q_m3h": 1200,
        "psf_pa": 5
      },
      {
        "q_m3h": 1300,
        "psf_pa": 0
      }
    ],
    "performance_data": [],
    "has_50hz_performance": false,
    "has_60hz_performance": false
  },
  {
    "model": "QK10A-4EM.98.CH",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "110057",
    "family": "Cross Flow Fan",
    "application": "Dry transformer cooling",
    "diameter_mm": 138,
    "blade_material": "aluminium",
    "voltage": "1~ 230V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (3 pontos) e 60 Hz (3 pontos).",
    "motor_technology": "AC",
    "electrical_nominal": "1~ 230V / 50/60Hz / AC",
    "rpm_nominal": 1130.0,
    "sound_lwa_db": 66,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 120.0,
    "current_nominal_a": 0.54,
    "current_nominal_a_raw": "0.54/0.68",
    "temp_min_c": -20,
    "temp_max_c": 70,
    "ip_protection": "IP10",
    "thermal_class": "THCL130",
    "weight_kg": 7.7,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 0.39,
        "power_w": 85,
        "speed_rpm": 1420,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.44,
        "power_w": 100,
        "speed_rpm": 1350,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.54,
        "power_w": 120,
        "speed_rpm": 1130,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 1,
        "current_a": 0.64,
        "power_w": 140,
        "speed_rpm": 1660,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 0.68,
        "power_w": 150,
        "speed_rpm": 1520,
        "sound_lwa_db": 67
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.68,
        "power_w": 160,
        "speed_rpm": 1110,
        "sound_lwa_db": 66
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "QK10A-4EM.98.CH",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "110057",
    "family": "Cross Flow Fan",
    "application": "Dry transformer cooling",
    "diameter_mm": 138,
    "blade_material": "aluminium",
    "voltage": "1~ 230V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (3 pontos) e 60 Hz (3 pontos).",
    "motor_technology": "AC",
    "poles": "4",
    "electrical_nominal": "1~ 230V / 50/60Hz / AC",
    "rpm_nominal": 1130.0,
    "sound_lwa_db": 66,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 1300,
    "dp_max_pa": 82,
    "p1_nominal_w": 120.0,
    "current_nominal_a": 0.54,
    "current_nominal_a_raw": "0.54/0.68",
    "temp_min_c": -20,
    "temp_max_c": 70,
    "ip_protection": "IP10",
    "thermal_class": "THCL130",
    "weight_kg": 7.7,
    "curve_available": true,
    "num_curve_sets": 3,
    "curve_sets": [
      {
        "curve_id": "characteristic_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 82
          },
          {
            "q_m3h": 200,
            "psf_pa": 75
          },
          {
            "q_m3h": 400,
            "psf_pa": 65
          },
          {
            "q_m3h": 600,
            "psf_pa": 50
          },
          {
            "q_m3h": 800,
            "psf_pa": 35
          },
          {
            "q_m3h": 1000,
            "psf_pa": 20
          },
          {
            "q_m3h": 1200,
            "psf_pa": 5
          },
          {
            "q_m3h": 1300,
            "psf_pa": 0
          }
        ]
      },
      {
        "curve_id": "power_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 55
          },
          {
            "q_m3h": 200,
            "psf_pa": 60
          },
          {
            "q_m3h": 400,
            "psf_pa": 65
          },
          {
            "q_m3h": 600,
            "psf_pa": 70
          },
          {
            "q_m3h": 800,
            "psf_pa": 75
          },
          {
            "q_m3h": 1000,
            "psf_pa": 80
          },
          {
            "q_m3h": 1200,
            "psf_pa": 85
          },
          {
            "q_m3h": 1300,
            "psf_pa": 88
          }
        ]
      },
      {
        "curve_id": "sound_50Hz",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 65
          },
          {
            "q_m3h": 200,
            "psf_pa": 66
          },
          {
            "q_m3h": 400,
            "psf_pa": 67
          },
          {
            "q_m3h": 600,
            "psf_pa": 68
          },
          {
            "q_m3h": 800,
            "psf_pa": 68
          },
          {
            "q_m3h": 1000,
            "psf_pa": 67
          },
          {
            "q_m3h": 1200,
            "psf_pa": 66
          },
          {
            "q_m3h": 1300,
            "psf_pa": 65
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 82
      },
      {
        "q_m3h": 200,
        "psf_pa": 75
      },
      {
        "q_m3h": 400,
        "psf_pa": 65
      },
      {
        "q_m3h": 600,
        "psf_pa": 50
      },
      {
        "q_m3h": 800,
        "psf_pa": 35
      },
      {
        "q_m3h": 1000,
        "psf_pa": 20
      },
      {
        "q_m3h": 1200,
        "psf_pa": 5
      },
      {
        "q_m3h": 1300,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 0.39,
        "power_w": 85,
        "speed_rpm": 1420,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.44,
        "power_w": 100,
        "speed_rpm": 1350,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.54,
        "power_w": 120,
        "speed_rpm": 1130,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 1,
        "current_a": 0.64,
        "power_w": 140,
        "speed_rpm": 1660,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 0.68,
        "power_w": 150,
        "speed_rpm": 1520,
        "sound_lwa_db": 67
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.68,
        "power_w": 160,
        "speed_rpm": 1110,
        "sound_lwa_db": 66
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  {
    "model": "QK12A-4EM.78.GF",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "204113",
    "family": "Cross Flow Fan",
    "application": "Dry transformer cooling",
    "diameter_mm": 125,
    "blade_material": "aluminium",
    "voltage": "1~ 230V",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_50_only",
    "motor_technology": "AC",
    "electrical_nominal": "1~ 230V / 50Hz / AC",
    "rpm_nominal": 1320.0,
    "sound_lwa_db": 79,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 350.0,
    "current_nominal_a": 1.6,
    "current_nominal_a_raw": "1.60",
    "temp_min_c": -20,
    "temp_max_c": 70,
    "ip_protection": "IP10",
    "thermal_class": "THCL155",
    "weight_kg": 11.4,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 0.96,
        "power_w": 190,
        "speed_rpm": 1450,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 1.6,
        "power_w": 350,
        "speed_rpm": 1320,
        "sound_lwa_db": 79
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 1.6,
        "power_w": 350,
        "speed_rpm": 1320,
        "sound_lwa_db": 79
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN025-2EL.WA.A7",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "161634",
    "family": "FE2owlet",
    "application": "Dry transformer cooling",
    "diameter_mm": 250,
    "num_blades": 7,
    "blade_material": "Composite Material",
    "rotor_material": "Aluminium",
    "voltage": "1~230V",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_50_only",
    "motor_technology": "AC",
    "poles": "2",
    "electrical_nominal": "1~230V / 50Hz / AC",
    "rpm_nominal": 2450,
    "sound_lwa_db": 72,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 1800,
    "dp_max_pa": 110,
    "p1_nominal_w": 150,
    "current_nominal_a": 0.68,
    "temp_min_c": -40,
    "temp_max_c": 40,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 3.5,
    "curve_available": true,
    "num_curve_sets": 1,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 1800,
            "psf_pa": 0
          },
          {
            "q_m3h": 1600,
            "psf_pa": 30
          },
          {
            "q_m3h": 1400,
            "psf_pa": 50
          },
          {
            "q_m3h": 1200,
            "psf_pa": 70
          },
          {
            "q_m3h": 1000,
            "psf_pa": 85
          },
          {
            "q_m3h": 800,
            "psf_pa": 95
          },
          {
            "q_m3h": 600,
            "psf_pa": 100
          },
          {
            "q_m3h": 400,
            "psf_pa": 105
          },
          {
            "q_m3h": 200,
            "psf_pa": 108
          },
          {
            "q_m3h": 0,
            "psf_pa": 110
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 1800,
        "psf_pa": 0
      },
      {
        "q_m3h": 1600,
        "psf_pa": 30
      },
      {
        "q_m3h": 1400,
        "psf_pa": 50
      },
      {
        "q_m3h": 1200,
        "psf_pa": 70
      },
      {
        "q_m3h": 1000,
        "psf_pa": 85
      },
      {
        "q_m3h": 800,
        "psf_pa": 95
      },
      {
        "q_m3h": 600,
        "psf_pa": 100
      },
      {
        "q_m3h": 400,
        "psf_pa": 105
      },
      {
        "q_m3h": 200,
        "psf_pa": 108
      },
      {
        "q_m3h": 0,
        "psf_pa": 110
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 0.54,
        "power_w": 120,
        "speed_rpm": 2450,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.48,
        "power_w": 110,
        "speed_rpm": 2410,
        "sound_lwa_db": 71
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.5,
        "power_w": 110,
        "speed_rpm": 2390,
        "sound_lwa_db": 72
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 0.64,
        "power_w": 140,
        "speed_rpm": 2450,
        "sound_lwa_db": 72
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "FN035-4EL.WD.A7",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "162548",
    "family": "FE2owlet",
    "application": "Dry transformer cooling",
    "diameter_mm": 350,
    "num_blades": 7,
    "blade_material": "Composite Material",
    "rotor_material": "Aluminium",
    "voltage": "1~230V",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "C_50_only",
    "motor_technology": "AC",
    "poles": "4",
    "electrical_nominal": "1~230V / 50Hz / AC",
    "rpm_nominal": 1200,
    "sound_lwa_db": 66,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 3200,
    "dp_max_pa": 110,
    "p1_nominal_w": 150,
    "current_nominal_a": 0.66,
    "temp_min_c": -40,
    "temp_max_c": 40,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 6.5,
    "curve_available": true,
    "num_curve_sets": 1,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 3200,
            "psf_pa": 0
          },
          {
            "q_m3h": 2800,
            "psf_pa": 30
          },
          {
            "q_m3h": 2400,
            "psf_pa": 50
          },
          {
            "q_m3h": 2000,
            "psf_pa": 70
          },
          {
            "q_m3h": 1600,
            "psf_pa": 85
          },
          {
            "q_m3h": 1200,
            "psf_pa": 95
          },
          {
            "q_m3h": 800,
            "psf_pa": 100
          },
          {
            "q_m3h": 400,
            "psf_pa": 105
          },
          {
            "q_m3h": 0,
            "psf_pa": 110
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 3200,
        "psf_pa": 0
      },
      {
        "q_m3h": 2800,
        "psf_pa": 30
      },
      {
        "q_m3h": 2400,
        "psf_pa": 50
      },
      {
        "q_m3h": 2000,
        "psf_pa": 70
      },
      {
        "q_m3h": 1600,
        "psf_pa": 85
      },
      {
        "q_m3h": 1200,
        "psf_pa": 95
      },
      {
        "q_m3h": 800,
        "psf_pa": 100
      },
      {
        "q_m3h": 400,
        "psf_pa": 105
      },
      {
        "q_m3h": 0,
        "psf_pa": 110
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 0.56,
        "power_w": 130,
        "speed_rpm": 1270,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.5,
        "power_w": 110,
        "speed_rpm": 1220,
        "sound_lwa_db": 65
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.5,
        "power_w": 100,
        "speed_rpm": 1080,
        "sound_lwa_db": 66
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 4,
        "current_a": 0.66,
        "power_w": 140,
        "speed_rpm": 1220,
        "sound_lwa_db": 66
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "RD13S-4IP.Z8.2R",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "175578",
    "family": "S-series ECblue",
    "application": "Dry transformer cooling",
    "diameter_mm": 0,
    "voltage": "3~200-240V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "A_ec_dual",
    "frequency_notes": "Motor EC: opera em 50 e 60 Hz via inversor interno. Curvas disponíveis apenas para 50 Hz.",
    "motor_technology": "EC",
    "electrical_nominal": "3~200-240V / 50/60Hz / EC",
    "rpm_nominal": 1400,
    "sound_lwa_db": 65,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 800,
    "dp_max_pa": 350,
    "p1_nominal_w": 150,
    "current_nominal_a": 1.1,
    "temp_min_c": -30,
    "temp_max_c": 60,
    "ip_protection": "IP54",
    "thermal_class": "THCL155",
    "weight_kg": 3.0,
    "curve_available": true,
    "num_curve_sets": 1,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 350
          },
          {
            "q_m3h": 100,
            "psf_pa": 300
          },
          {
            "q_m3h": 200,
            "psf_pa": 250
          },
          {
            "q_m3h": 300,
            "psf_pa": 200
          },
          {
            "q_m3h": 400,
            "psf_pa": 150
          },
          {
            "q_m3h": 500,
            "psf_pa": 100
          },
          {
            "q_m3h": 600,
            "psf_pa": 50
          },
          {
            "q_m3h": 700,
            "psf_pa": 20
          },
          {
            "q_m3h": 800,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 350
      },
      {
        "q_m3h": 100,
        "psf_pa": 300
      },
      {
        "q_m3h": 200,
        "psf_pa": 250
      },
      {
        "q_m3h": 300,
        "psf_pa": 200
      },
      {
        "q_m3h": 400,
        "psf_pa": 150
      },
      {
        "q_m3h": 500,
        "psf_pa": 100
      },
      {
        "q_m3h": 600,
        "psf_pa": 50
      },
      {
        "q_m3h": 700,
        "psf_pa": 20
      },
      {
        "q_m3h": 800,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 1.15,
        "power_w": 120,
        "speed_rpm": 3200,
        "sound_lwa_db": 78
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.86,
        "power_w": 90,
        "speed_rpm": 2270,
        "sound_lwa_db": 68
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.46,
        "power_w": 44,
        "speed_rpm": 1040,
        "sound_lwa_db": 63
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": false
  },
  {
    "model": "RD13S-2EP.WC.1R",
    "manufacturer": "Ziehl-Abegg",
    "article_number": "113143",
    "family": "S-series",
    "application": "Dry transformer cooling",
    "diameter_mm": 0,
    "voltage": "1~230V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50.0,
    "frequency_source_group": "B_ac_dual_with_60hz",
    "frequency_notes": "Motor AC: dados de performance disponíveis para 50 Hz (3 pontos) e 60 Hz (3 pontos).",
    "motor_technology": "AC",
    "poles": 2,
    "electrical_nominal": "1~230V / 50/60Hz / AC",
    "rpm_nominal": 1450,
    "sound_lwa_db": 65,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 800,
    "dp_max_pa": 280,
    "p1_nominal_w": 180,
    "current_nominal_a": 0.8,
    "temp_min_c": -20,
    "temp_max_c": 70,
    "thermal_class": "THCL155",
    "weight_kg": 4.1,
    "curve_available": true,
    "num_curve_sets": 1,
    "curve_sets": [
      {
        "curve_id": "I",
        "points": [
          {
            "q_m3h": 0,
            "psf_pa": 280
          },
          {
            "q_m3h": 100,
            "psf_pa": 250
          },
          {
            "q_m3h": 200,
            "psf_pa": 220
          },
          {
            "q_m3h": 300,
            "psf_pa": 180
          },
          {
            "q_m3h": 400,
            "psf_pa": 140
          },
          {
            "q_m3h": 500,
            "psf_pa": 100
          },
          {
            "q_m3h": 600,
            "psf_pa": 60
          },
          {
            "q_m3h": 700,
            "psf_pa": 30
          },
          {
            "q_m3h": 800,
            "psf_pa": 0
          }
        ]
      }
    ],
    "curve_points": [
      {
        "q_m3h": 0,
        "psf_pa": 280
      },
      {
        "q_m3h": 100,
        "psf_pa": 250
      },
      {
        "q_m3h": 200,
        "psf_pa": 220
      },
      {
        "q_m3h": 300,
        "psf_pa": 180
      },
      {
        "q_m3h": 400,
        "psf_pa": 140
      },
      {
        "q_m3h": 500,
        "psf_pa": 100
      },
      {
        "q_m3h": 600,
        "psf_pa": 60
      },
      {
        "q_m3h": 700,
        "psf_pa": 30
      },
      {
        "q_m3h": 800,
        "psf_pa": 0
      }
    ],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 1,
        "current_a": 0.46,
        "power_w": 100,
        "speed_rpm": 2740,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 2,
        "current_a": 0.56,
        "power_w": 130,
        "speed_rpm": 2510,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 50,
        "operating_point": 3,
        "current_a": 0.8,
        "power_w": 180,
        "speed_rpm": 1450,
        "sound_lwa_db": 69
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 1,
        "current_a": 0.7,
        "power_w": 150,
        "speed_rpm": 3080,
        "sound_lwa_db": 73
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 2,
        "current_a": 0.76,
        "power_w": 170,
        "speed_rpm": 2700,
        "sound_lwa_db": 70
      },
      {
        "curve_id": "I",
        "voltage_v": 230,
        "frequency_hz": 60,
        "operating_point": 3,
        "current_a": 0.86,
        "power_w": 200,
        "speed_rpm": 1350,
        "sound_lwa_db": 67
      }
    ],
    "has_50hz_performance": true,
    "has_60hz_performance": true
  },
  // ── Modelos adicionados a partir do ZIP Ventiladores (28 modelos) ──
  {
    "model": "S2D300-AP02-35",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "diameter_mm": 300,
    "frequencies": [],
    "motor_technology": "AC",
    "electrical_nominal": "",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "p_sys_w": 0,
    "current_nominal_a": 0,
    "ip_protection": "IP44",
    "weight_kg": 0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "Data_sheet_US_-_S2D300AP0235_KM210436_73f1cd82-7bb8-4649-a43e-36d208563768.pdf"
  },
  {
    "model": "S4E300-AS72-50",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "family": "HyBlade",
    "diameter_mm": 300,
    "voltage": "230V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50,
    "motor_technology": "AC",
    "electrical_nominal": "3~ 230V / 50/60Hz / AC",
    "rpm_nominal": 1500.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 60.0,
    "p1_nominal_w": 90.0,
    "p_sys_w": 90.0,
    "current_nominal_a": 0.4,
    "temp_min_c": -25.0,
    "temp_max_c": 50.0,
    "ip_protection": "IP44",
    "weight_kg": 2.9,
    "num_blades": 5,
    "blade_material": "PlásticoPP",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 50.0,
        "power_w": 72.0,
        "current_a": 0.32,
        "speed_rpm": 1320.0
      },
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 60.0,
        "power_w": 90.0,
        "current_a": 0.4,
        "speed_rpm": 1500.0
      }
    ],
    "source_file": "Data_sheet_BR_-_S4E300AS7250_KM206618_9310f623-6c6c-44e1-83e8-56716783a6a1 (2).pdf"
  },
  {
    "model": "S4D350-AN08-30",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "family": "HyBlade",
    "diameter_mm": 350,
    "voltage": "230/400V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50,
    "motor_technology": "AC",
    "electrical_nominal": "3~ 230/400V / 50/60Hz / AC",
    "rpm_nominal": 1520.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 2095.0,
    "dp_max_pa": 90.0,
    "p1_nominal_w": 230.0,
    "p_sys_w": 230.0,
    "current_nominal_a": 0.7,
    "temp_min_c": -25.0,
    "temp_max_c": 65.0,
    "ip_protection": "IP44",
    "weight_kg": 4.8,
    "num_blades": 5,
    "blade_material": "Chapadeaçoredonda,revestidaporextrusãocomplásticoPPemontadasobpressão",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 50.0,
        "power_w": 170.0,
        "current_a": 0.64,
        "speed_rpm": 1370.0
      },
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 60.0,
        "power_w": 230.0,
        "current_a": 0.7,
        "speed_rpm": 1520.0
      },
      {
        "curve_id": "I",
        "voltage_v": 400.0,
        "frequency_hz": 50.0,
        "power_w": 170.0,
        "current_a": 0.37,
        "speed_rpm": 1370.0
      },
      {
        "curve_id": "I",
        "voltage_v": 400.0,
        "frequency_hz": 60.0,
        "power_w": 230.0,
        "current_a": 0.4,
        "speed_rpm": 1520.0
      }
    ],
    "source_file": "Data_sheet_BR_-_S4D350AN0830_KM96942_f21e0d47-3043-4468-88a6-4f52ef2337f1.pdf"
  },
  {
    "model": "S4E350-AN19-43",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "family": "HyBlade",
    "diameter_mm": 350,
    "frequencies": [],
    "motor_technology": "AC",
    "electrical_nominal": "",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "p_sys_w": 0,
    "current_nominal_a": 0,
    "ip_protection": "IP44",
    "weight_kg": 0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "Data_sheet_US_-_S4E350AN1943_KM205371_ (2).pdf"
  },
  {
    "model": "S4D400-AP12-03",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "diameter_mm": 400,
    "voltage": "230/400V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50,
    "motor_technology": "AC",
    "electrical_nominal": "3~ 230/400V / 50/60Hz / AC",
    "rpm_nominal": 1690.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 2830.0,
    "dp_max_pa": 120.0,
    "p1_nominal_w": 185.0,
    "p_sys_w": 185.0,
    "current_nominal_a": 0.68,
    "temp_min_c": -25.0,
    "temp_max_c": 40.0,
    "ip_protection": "IP44",
    "weight_kg": 5.9,
    "num_blades": 5,
    "blade_material": "Chapadeaçopintadadepreto",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 50.0,
        "power_w": 135.0,
        "current_a": 0.76,
        "speed_rpm": 1450.0
      },
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 60.0,
        "power_w": 185.0,
        "current_a": 0.68,
        "speed_rpm": 1690.0
      },
      {
        "curve_id": "I",
        "voltage_v": 400.0,
        "frequency_hz": 50.0,
        "power_w": 135.0,
        "current_a": 0.44,
        "speed_rpm": 1450.0
      },
      {
        "curve_id": "I",
        "voltage_v": 400.0,
        "frequency_hz": 60.0,
        "power_w": 185.0,
        "current_a": 0.39,
        "speed_rpm": 1690.0
      }
    ],
    "source_file": "Data_sheet_BR_-_S4D400AP1203_KM205355_35d6ccae-776b-4f88-bbc0-cf2fc674fcc6.pdf"
  },
  {
    "model": "S4D400-AP12-35",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "diameter_mm": 400,
    "voltage": "230/400V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50,
    "motor_technology": "AC",
    "electrical_nominal": "3~ 230/400V / 50/60Hz / AC",
    "rpm_nominal": 1690.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 2595.0,
    "dp_max_pa": 120.0,
    "p1_nominal_w": 185.0,
    "p_sys_w": 185.0,
    "current_nominal_a": 0.68,
    "temp_min_c": -25.0,
    "temp_max_c": 40.0,
    "ip_protection": "IP44",
    "weight_kg": 0,
    "num_blades": 5,
    "blade_material": "Chapadeaço",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 50.0,
        "power_w": 135.0,
        "current_a": 0.76,
        "speed_rpm": 1450.0
      },
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 60.0,
        "power_w": 185.0,
        "current_a": 0.68,
        "speed_rpm": 1690.0
      },
      {
        "curve_id": "I",
        "voltage_v": 400.0,
        "frequency_hz": 50.0,
        "power_w": 135.0,
        "current_a": 0.44,
        "speed_rpm": 1450.0
      },
      {
        "curve_id": "I",
        "voltage_v": 400.0,
        "frequency_hz": 60.0,
        "power_w": 185.0,
        "current_a": 0.39,
        "speed_rpm": 1690.0
      }
    ],
    "source_file": "Data_sheet_BR_-_S4D400AP1235_KM99496_ (2).pdf"
  },
  {
    "model": "S4D400-AP24-61",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "diameter_mm": 400,
    "frequencies": [],
    "motor_technology": "AC",
    "electrical_nominal": "",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "p_sys_w": 0,
    "current_nominal_a": 0,
    "ip_protection": "IP44",
    "weight_kg": 0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "Data_sheet_US_-_S4D400AP2461_KM98712_.pdf"
  },
  {
    "model": "S4E400-AP02-39",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "diameter_mm": 400,
    "voltage": "230V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50,
    "motor_technology": "AC",
    "electrical_nominal": "3~ 230V / 50/60Hz / AC",
    "rpm_nominal": 1700.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 2675.0,
    "dp_max_pa": 110.0,
    "p1_nominal_w": 240.0,
    "p_sys_w": 240.0,
    "current_nominal_a": 1.06,
    "temp_min_c": -25.0,
    "temp_max_c": 40.0,
    "ip_protection": "IP44",
    "weight_kg": 6.1,
    "num_blades": 5,
    "blade_material": "Chapadeaçopintadadepreto",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 50.0,
        "power_w": 160.0,
        "current_a": 0.73,
        "speed_rpm": 1430.0
      },
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 60.0,
        "power_w": 240.0,
        "current_a": 1.06,
        "speed_rpm": 1700.0
      }
    ],
    "source_file": "Data_sheet_BR_-_S4E400AP0239_KM98712_.pdf"
  },
  {
    "model": "S4D450-AO18-74",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "diameter_mm": 450,
    "voltage": "230/400V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50,
    "motor_technology": "AC",
    "electrical_nominal": "3~ 230/400V / 50/60Hz / AC",
    "rpm_nominal": 1420.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 4510.0,
    "dp_max_pa": 115.0,
    "p1_nominal_w": 580.0,
    "p_sys_w": 580.0,
    "current_nominal_a": 1.73,
    "temp_min_c": -40.0,
    "temp_max_c": 70.0,
    "ip_protection": "IP54",
    "weight_kg": 9.9,
    "num_blades": 5,
    "blade_material": "Chapadeaçoredonda,revestidaporextrusãocomplásticoPPemontadasobpressão",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 50.0,
        "power_w": 430.0,
        "current_a": 1.4,
        "speed_rpm": 1315.0
      },
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 60.0,
        "power_w": 580.0,
        "current_a": 1.73,
        "speed_rpm": 1420.0
      },
      {
        "curve_id": "I",
        "voltage_v": 400.0,
        "frequency_hz": 50.0,
        "power_w": 430.0,
        "current_a": 0.81,
        "speed_rpm": 1315.0
      },
      {
        "curve_id": "I",
        "voltage_v": 400.0,
        "frequency_hz": 60.0,
        "power_w": 580.0,
        "current_a": 1.0,
        "speed_rpm": 1420.0
      }
    ],
    "source_file": "Data_sheet_BR_-_S4D450AO1874_KM200565_ (1) (2).pdf"
  },
  {
    "model": "S4D500-AM01-03",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "family": "HyBlade",
    "diameter_mm": 500,
    "voltage": "230/277/400/480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50,
    "motor_technology": "AC",
    "electrical_nominal": "3~ 230/277/400/480V / 50/60Hz / AC",
    "rpm_nominal": 1590.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 5985.0,
    "dp_max_pa": 160.0,
    "p1_nominal_w": 1050.0,
    "p_sys_w": 1050.0,
    "current_nominal_a": 2.72,
    "temp_min_c": -40.0,
    "temp_max_c": 65.0,
    "ip_protection": "IP54",
    "weight_kg": 13.0,
    "num_blades": 5,
    "blade_material": "Chapadeaçoredonda,revestidaporextrusãocomplásticoPPemontadasobpressão",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 50.0,
        "power_w": 690.0,
        "current_a": 2.34,
        "speed_rpm": 1350.0
      },
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 60.0,
        "power_w": 950.0,
        "current_a": 2.77,
        "speed_rpm": 1510.0
      },
      {
        "curve_id": "I",
        "voltage_v": 277.0,
        "frequency_hz": 60.0,
        "power_w": 1050.0,
        "current_a": 2.72,
        "speed_rpm": 1590.0
      },
      {
        "curve_id": "I",
        "voltage_v": 400.0,
        "frequency_hz": 50.0,
        "power_w": 690.0,
        "current_a": 1.35,
        "speed_rpm": 1350.0
      },
      {
        "curve_id": "I",
        "voltage_v": 400.0,
        "frequency_hz": 60.0,
        "power_w": 950.0,
        "current_a": 1.6,
        "speed_rpm": 1510.0
      },
      {
        "curve_id": "I",
        "voltage_v": 480.0,
        "frequency_hz": 60.0,
        "power_w": 1050.0,
        "current_a": 1.57,
        "speed_rpm": 1590.0
      }
    ],
    "source_file": "Data_sheet_BR_-_S4D500AM0103_KM98149_ (1).pdf"
  },
  {
    "model": "W4D500-GM01-03",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "diameter_mm": 500,
    "frequencies": [],
    "motor_technology": "AC",
    "electrical_nominal": "",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "p_sys_w": 0,
    "current_nominal_a": 0,
    "ip_protection": "IP54",
    "weight_kg": 0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "W4D500GM0103-BA-ENU.pdf"
  },
  {
    "model": "W4D500-KM21-10",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "diameter_mm": 500,
    "voltage": "230/277/380/400/480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50,
    "motor_technology": "AC",
    "electrical_nominal": "3~ 230/277/380/400/480V / 50/60Hz / AC",
    "rpm_nominal": 1660.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 6000.0,
    "dp_max_pa": 260.0,
    "p1_nominal_w": 1270.0,
    "p_sys_w": 1270.0,
    "current_nominal_a": 3.6,
    "temp_min_c": -40.0,
    "temp_max_c": 65.0,
    "ip_protection": "IP54",
    "weight_kg": 14.8,
    "num_blades": 5,
    "blade_material": "Chapadeaçoredonda,revestidaporextrusãocomplásticoPPemontadasobpressão",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 50.0,
        "power_w": 780.0,
        "current_a": 3.1,
        "speed_rpm": 1400.0
      },
      {
        "curve_id": "I",
        "voltage_v": 277.0,
        "frequency_hz": 60.0,
        "power_w": 1270.0,
        "current_a": 3.6,
        "speed_rpm": 1660.0
      },
      {
        "curve_id": "I",
        "voltage_v": 380.0,
        "frequency_hz": 60.0,
        "power_w": 1160.0,
        "current_a": 2.1,
        "speed_rpm": 1580.0
      },
      {
        "curve_id": "I",
        "voltage_v": 400.0,
        "frequency_hz": 50.0,
        "power_w": 780.0,
        "current_a": 1.8,
        "speed_rpm": 1400.0
      },
      {
        "curve_id": "I",
        "voltage_v": 480.0,
        "frequency_hz": 60.0,
        "power_w": 1270.0,
        "current_a": 2.1,
        "speed_rpm": 1660.0
      }
    ],
    "source_file": "EBM PAPST - 500 mm - W4D500KM2110.pdf"
  },
  {
    "model": "W4D560-GR03-03",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "diameter_mm": 560,
    "frequencies": [],
    "motor_technology": "AC",
    "electrical_nominal": "",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "p_sys_w": 0,
    "current_nominal_a": 0,
    "ip_protection": "IP54",
    "weight_kg": 22.9,
    "num_blades": 5,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "W4D560GR0303-VWA0560H5RNS-OI-PTB.pdf"
  },
  {
    "model": "S4D630-AF03-03",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "family": "HyBlade",
    "diameter_mm": 630,
    "frequencies": [],
    "motor_technology": "AC",
    "electrical_nominal": "",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "p_sys_w": 0,
    "current_nominal_a": 0,
    "ip_protection": "IP54",
    "weight_kg": 0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "S4D630AF0303-ENG.pdf"
  },
  {
    "model": "S6D630-AN09-03",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "family": "HyBlade",
    "diameter_mm": 630,
    "voltage": "230/277/400/480V",
    "frequencies": [
      50,
      60
    ],
    "frequency_hz": 50,
    "motor_technology": "AC",
    "electrical_nominal": "3~ 230/277/400/480V / 50/60Hz / AC",
    "rpm_nominal": 1065.0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 7310.0,
    "dp_max_pa": 110.0,
    "p1_nominal_w": 890.0,
    "p_sys_w": 890.0,
    "current_nominal_a": 2.77,
    "temp_min_c": -40.0,
    "temp_max_c": 60.0,
    "ip_protection": "IP54",
    "weight_kg": 14.1,
    "num_blades": 5,
    "blade_material": "Chapadeaçoredonda,revestidaporextrusãocomplásticoPPemontadasobpressão",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 50.0,
        "power_w": 640.0,
        "current_a": 2.51,
        "speed_rpm": 890.0
      },
      {
        "curve_id": "I",
        "voltage_v": 230.0,
        "frequency_hz": 60.0,
        "power_w": 790.0,
        "current_a": 2.65,
        "speed_rpm": 1005.0
      },
      {
        "curve_id": "I",
        "voltage_v": 277.0,
        "frequency_hz": 60.0,
        "power_w": 890.0,
        "current_a": 2.77,
        "speed_rpm": 1065.0
      },
      {
        "curve_id": "I",
        "voltage_v": 400.0,
        "frequency_hz": 50.0,
        "power_w": 640.0,
        "current_a": 1.45,
        "speed_rpm": 890.0
      },
      {
        "curve_id": "I",
        "voltage_v": 400.0,
        "frequency_hz": 60.0,
        "power_w": 790.0,
        "current_a": 1.53,
        "speed_rpm": 1005.0
      },
      {
        "curve_id": "I",
        "voltage_v": 480.0,
        "frequency_hz": 60.0,
        "power_w": 890.0,
        "current_a": 1.6,
        "speed_rpm": 1065.0
      }
    ],
    "source_file": "Data_sheet_BR_-_S6D630AN0903_KM98149_ (1).pdf"
  },
  {
    "model": "W6D630-GN09-03",
    "manufacturer": "EBM-Papst",
    "article_number": "",
    "family": "HyBlade",
    "diameter_mm": 630,
    "frequencies": [],
    "motor_technology": "AC",
    "electrical_nominal": "",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "p_sys_w": 0,
    "current_nominal_a": 0,
    "ip_protection": "IP54",
    "weight_kg": 0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "EBM PAPST - 630mm - W6D630GN0903.pdf"
  },
  {
    "model": "FS2-250ET",
    "manufacturer": "Sell Parts",
    "article_number": "",
    "family": "Ventilador Axial com grade e caixa de terminais.Motor de rotor externo",
    "diameter_mm": 250,
    "voltage": "220/380V",
    "frequencies": [
      60
    ],
    "frequency_hz": 60.0,
    "motor_technology": "AC",
    "electrical_nominal": "220/380V / 60Hz / AC",
    "rpm_nominal": 3100.0,
    "sound_lwa_db": 78.0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 220.0,
    "p_sys_w": 220.0,
    "current_nominal_a": 0.65,
    "temp_max_c": 60.0,
    "weight_kg": 3.7,
    "blade_material": "Chapa de aço com pintura a pó em poliester, na cor preta",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "FS2-250ET (1).pdf"
  },
  {
    "model": "FS4-300EM",
    "manufacturer": "Sell Parts",
    "article_number": "",
    "diameter_mm": 300,
    "frequencies": [],
    "motor_technology": "AC",
    "electrical_nominal": "",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "p_sys_w": 0,
    "current_nominal_a": 0,
    "weight_kg": 0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "FS4-300 EM.pdf"
  },
  {
    "model": "FS4-300ET",
    "manufacturer": "Sell Parts",
    "article_number": "",
    "diameter_mm": 300,
    "frequencies": [],
    "motor_technology": "AC",
    "electrical_nominal": "",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "p_sys_w": 0,
    "current_nominal_a": 0,
    "weight_kg": 0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "FS4-300ET.pdf"
  },
  {
    "model": "FS4-350EM",
    "manufacturer": "Sell Parts",
    "article_number": "",
    "diameter_mm": 350,
    "frequencies": [],
    "motor_technology": "AC",
    "electrical_nominal": "",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "p_sys_w": 0,
    "current_nominal_a": 0,
    "weight_kg": 0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "FS4-350EM.pdf"
  },
  {
    "model": "FS4-400ET",
    "manufacturer": "Sell Parts",
    "article_number": "",
    "diameter_mm": 400,
    "frequencies": [],
    "motor_technology": "AC",
    "electrical_nominal": "",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "p_sys_w": 0,
    "current_nominal_a": 0,
    "weight_kg": 0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "FS4-400ET.pdf"
  },
  {
    "model": "FS4-450ET",
    "manufacturer": "Sell Parts",
    "article_number": "",
    "diameter_mm": 450,
    "frequencies": [],
    "motor_technology": "AC",
    "electrical_nominal": "",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "p_sys_w": 0,
    "current_nominal_a": 0,
    "weight_kg": 0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "FS4-450ET.pdf"
  },
  {
    "model": "FS4-450ETPW\n",
    "manufacturer": "Sell Parts",
    "article_number": "",
    "family": "Ven\u0000lador Axial com grade e caixa de terminais. Motor de rotor externo",
    "diameter_mm": 450,
    "voltage": "220/380V",
    "frequencies": [
      60
    ],
    "frequency_hz": 60.0,
    "motor_technology": "AC",
    "electrical_nominal": "220/380V / 60Hz / AC",
    "rpm_nominal": 1600.0,
    "sound_lwa_db": 75.0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 730.0,
    "p_sys_w": 730.0,
    "current_nominal_a": 2.4,
    "temp_max_c": 60.0,
    "weight_kg": 8.5,
    "blade_material": "Chapa de aço com pintura a pó em poliester, na cor preta",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "FS4 450 ET PW.pdf"
  },
  {
    "model": "FS4-500ETPW03",
    "manufacturer": "Sell Parts",
    "article_number": "",
    "family": "Ven\u0000lador Axial com grade e caixa de terminais. Motor de rotor externo",
    "diameter_mm": 500,
    "voltage": "220/380V",
    "frequencies": [
      60
    ],
    "frequency_hz": 60.0,
    "motor_technology": "AC",
    "electrical_nominal": "220/380V / 60Hz / AC",
    "rpm_nominal": 1580.0,
    "sound_lwa_db": 78.0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 900.0,
    "p_sys_w": 900.0,
    "current_nominal_a": 3.15,
    "temp_max_c": 60.0,
    "weight_kg": 11.7,
    "blade_material": "Chapa de aço com pintura a pó em poliester, na cor preta",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "FS4 500 ET PW 03.pdf"
  },
  {
    "model": "FS4-630ET",
    "manufacturer": "Sell Parts",
    "article_number": "",
    "diameter_mm": 630,
    "frequencies": [],
    "motor_technology": "AC",
    "electrical_nominal": "",
    "rpm_nominal": 0,
    "sound_lwa_db": 0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 0,
    "p_sys_w": 0,
    "current_nominal_a": 0,
    "weight_kg": 0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "FS4-630ET.pdf"
  },
  {
    "model": "FS4-630VT",
    "manufacturer": "Sell Parts",
    "article_number": "",
    "family": "Ventilador Axial com grade e caixa de terminais. Motor de rotor externo",
    "diameter_mm": 630,
    "voltage": "220/380V",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "motor_technology": "AC",
    "electrical_nominal": "220/380V / 50Hz / AC",
    "rpm_nominal": 1630.0,
    "sound_lwa_db": 81.0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 1000.0,
    "p_sys_w": 1000.0,
    "current_nominal_a": 0,
    "temp_max_c": 60.0,
    "weight_kg": 15.0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "FS4-630 VT.pdf"
  },
  {
    "model": "HR6-630ET",
    "manufacturer": "Sell Parts",
    "article_number": "",
    "family": "Ventilador Axial com grade e caixa de terminais. Motor de rotor externo",
    "diameter_mm": 630,
    "voltage": "220/380V",
    "frequencies": [
      50
    ],
    "frequency_hz": 50.0,
    "motor_technology": "AC",
    "electrical_nominal": "220/380V / 50Hz / AC",
    "rpm_nominal": 950.0,
    "sound_lwa_db": 74.0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 660.0,
    "p_sys_w": 660.0,
    "current_nominal_a": 2.58,
    "temp_max_c": 60.0,
    "weight_kg": 20.0,
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "HR6-630 ET.pdf"
  },
  {
    "model": "FS6-800ET",
    "manufacturer": "Sell Parts",
    "article_number": "",
    "family": "Ven\u0000lador Axial com grade e caixa de terminais. Motor de rotor externo",
    "diameter_mm": 800,
    "voltage": "220/380V",
    "frequencies": [
      60
    ],
    "frequency_hz": 60.0,
    "motor_technology": "AC",
    "electrical_nominal": "220/380V / 60Hz / AC",
    "rpm_nominal": 1080.0,
    "sound_lwa_db": 82.0,
    "erp_efficiency_pct": 0,
    "q_max_m3h": 0,
    "dp_max_pa": 0,
    "p1_nominal_w": 2200.0,
    "p_sys_w": 2200.0,
    "current_nominal_a": 7.5,
    "temp_max_c": 60.0,
    "weight_kg": 47.0,
    "blade_material": "Chapa de aço com pintura a pó em poliester, na cor preta",
    "curve_available": false,
    "num_curve_sets": 0,
    "curve_sets": [],
    "curve_points": [],
    "performance_data": [],
    "source_file": "FS6-800ET DF.pdf"
  }
];
