export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      app_settings: {
        Row: {
          key: string
          value: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          key: string
          value: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          key?: string
          value?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      equipment_catalog: {
        Row: {
          modelo: string
          modelo_unico: string | null
          status_compressor: string | null
          modelo_catalogo_original: string | null
          modelo_base_referencia: string | null
          fabricante: string | null
          fabricante_origem: string | null
          compressor_modelo: string | null
          compressor_codigo: string | null
          tipo_compressor: string | null
          configuracao_eletrica: string | null
          tensao_v: number | null
          numero_fases: number | null
          frequencia_hz: number | null
          linha: string | null
          designacao_hp: string | null
          gabinete: string | null
          tipo_gabinete: string | null
          refrigerante: string | null
          cap_reaquecimento_kcalh: number | null
          cap_compressor_kcalh: number | null
          calor_rejeitado_kcalh: number | null
          pot_total_circuito_kw: number | null
          corrente_circuito_a: number | null
          corrente_partida_circuito_a: number | null
          cop_global: number | null
          gwp: number | null
          odp: number | null
          tipo_degelo: string | null
          cond_rows: number | null
          cond_tubes_per_row: number | null
          cond_circuits: number | null
          cond_fin_spacing_mm: string | null
          cond_length_mm: string | null
          cond_tubo_in: string | null
          cond_tubo_mm: number | null
          cond_tubo_esp_mm: number | null
          cond_geometria: string | null
          cond_volume_l: number | null
          cond_ventilador: string | null
          cond_vazao_m3h: number | null
          evap_rows: number | null
          evap_tubes_per_row: number | null
          evap_circuits: number | null
          evap_fin_spacing_mm: string | null
          evap_length_mm: string | null
          evap_geometria: string | null
          reheat_tubes_per_row: number | null
          reheat_circuits: number | null
          reheat_fin_spacing_mm: string | null
          reheat_length_mm: string | null
          evap_tubo_in: string | null
          evap_tubo_mm: number | null
          evap_tubo_esp_mm: number | null
          reheat_geometria: string | null
          evap_volume_l: number | null
          evap_area_m2: number | null
          reheat_quantidade: number | null
          evap_ventilador: string | null
          evap_vazao_m3h: number | null
          temp_camara_c: number | null
          umidade_camara_pct: number | null
          temp_evaporacao_c: number | null
          temp_condensacao_c: number | null
          temp_ambiente_c: number | null
          umidade_externa_pct: number | null
          vazao_massa_kgh: number | null
          vazao_massa_kgs: number | null
          delta_entalpia_kjkg: number | null
          superaquecimento_total_k: number | null
          superaquecimento_util_k: number | null
          subresfriamento_k: number | null
          subresfriamento_adicional_k: number | null
          altitude_m: number | null
          linha_descarga: string | null
          vel_descarga_ms: string | null
          linha_liquido: string | null
          vel_liquido_ms: string | null
          linha_succao: string | null
          vel_succao_ms: string | null
          carga_fluido_kg: string | null
          agua_produzida_lh: string | null
          diametro_dreno: string | null
          quantidade_drenos: number | null
          pot_compressor_kw: number | null
          pot_ventilador_kw: number | null
          pot_total_kw: number | null
          cop: number | null
          cop_carnot: number | null
          corrente_compressor_a: number | null
          corrente_ventiladores_a: number | null
          corrente_total_a: number | null
          corrente_partida_a: number | null
          sec_modelo_condensador: string | null
          sec_ventilador_condensador: string | null
          sec_vazao_cond_m3h: number | null
          sec_modelo_trocador: string | null
          sec_cap_req_kcalh: number | null
          sec_cap_comp_kcalh: number | null
          sec_calor_rejeitado_kcalh: number | null
          sec_temp_entrada_c: number | null
          sec_temp_saida_c: number | null
          sec_temp_evap_c: number | null
          sec_temp_cond_c: number | null
          sec_superaq_total_k: number | null
          sec_superaq_util_k: number | null
          sec_subresfr_k: number | null
          sec_pot_comp_kw: number | null
          sec_pot_vent_kw: number | null
          sec_pot_total_kw: number | null
          sec_cop: number | null
          sec_cop_carnot: number | null
          sec_corrente_comp_a: number | null
          sec_corrente_vent_a: number | null
          sec_corrente_total_a: number | null
          sec_corrente_partida_a: number | null
          validation_status: "pending" | "approved" | "warning" | "rejected"
          data: Json
          validated_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          modelo: string
          modelo_unico?: string | null
          status_compressor?: string | null
          modelo_catalogo_original?: string | null
          modelo_base_referencia?: string | null
          fabricante?: string | null
          fabricante_origem?: string | null
          compressor_modelo?: string | null
          compressor_codigo?: string | null
          tipo_compressor?: string | null
          configuracao_eletrica?: string | null
          tensao_v?: number | null
          numero_fases?: number | null
          frequencia_hz?: number | null
          linha?: string | null
          designacao_hp?: string | null
          gabinete?: string | null
          tipo_gabinete?: string | null
          refrigerante?: string | null
          cap_reaquecimento_kcalh?: number | null
          cap_compressor_kcalh?: number | null
          calor_rejeitado_kcalh?: number | null
          pot_total_circuito_kw?: number | null
          corrente_circuito_a?: number | null
          corrente_partida_circuito_a?: number | null
          cop_global?: number | null
          gwp?: number | null
          odp?: number | null
          tipo_degelo?: string | null
          cond_rows?: number | null
          cond_tubes_per_row?: number | null
          cond_circuits?: number | null
          cond_fin_spacing_mm?: string | null
          cond_length_mm?: string | null
          cond_tubo_in?: string | null
          cond_tubo_mm?: number | null
          cond_tubo_esp_mm?: number | null
          cond_geometria?: string | null
          cond_volume_l?: number | null
          cond_ventilador?: string | null
          cond_vazao_m3h?: number | null
          evap_rows?: number | null
          evap_tubes_per_row?: number | null
          evap_circuits?: number | null
          evap_fin_spacing_mm?: string | null
          evap_length_mm?: string | null
          evap_geometria?: string | null
          reheat_tubes_per_row?: number | null
          reheat_circuits?: number | null
          reheat_fin_spacing_mm?: string | null
          reheat_length_mm?: string | null
          evap_tubo_in?: string | null
          evap_tubo_mm?: number | null
          evap_tubo_esp_mm?: number | null
          reheat_geometria?: string | null
          evap_volume_l?: number | null
          evap_area_m2?: number | null
          reheat_quantidade?: number | null
          evap_ventilador?: string | null
          evap_vazao_m3h?: number | null
          temp_camara_c?: number | null
          umidade_camara_pct?: number | null
          temp_evaporacao_c?: number | null
          temp_condensacao_c?: number | null
          temp_ambiente_c?: number | null
          umidade_externa_pct?: number | null
          vazao_massa_kgh?: number | null
          vazao_massa_kgs?: number | null
          delta_entalpia_kjkg?: number | null
          superaquecimento_total_k?: number | null
          superaquecimento_util_k?: number | null
          subresfriamento_k?: number | null
          subresfriamento_adicional_k?: number | null
          altitude_m?: number | null
          linha_descarga?: string | null
          vel_descarga_ms?: string | null
          linha_liquido?: string | null
          vel_liquido_ms?: string | null
          linha_succao?: string | null
          vel_succao_ms?: string | null
          carga_fluido_kg?: string | null
          agua_produzida_lh?: string | null
          diametro_dreno?: string | null
          quantidade_drenos?: number | null
          pot_compressor_kw?: number | null
          pot_ventilador_kw?: number | null
          pot_total_kw?: number | null
          cop?: number | null
          cop_carnot?: number | null
          corrente_compressor_a?: number | null
          corrente_ventiladores_a?: number | null
          corrente_total_a?: number | null
          corrente_partida_a?: number | null
          sec_modelo_condensador?: string | null
          sec_ventilador_condensador?: string | null
          sec_vazao_cond_m3h?: number | null
          sec_modelo_trocador?: string | null
          sec_cap_req_kcalh?: number | null
          sec_cap_comp_kcalh?: number | null
          sec_calor_rejeitado_kcalh?: number | null
          sec_temp_entrada_c?: number | null
          sec_temp_saida_c?: number | null
          sec_temp_evap_c?: number | null
          sec_temp_cond_c?: number | null
          sec_superaq_total_k?: number | null
          sec_superaq_util_k?: number | null
          sec_subresfr_k?: number | null
          sec_pot_comp_kw?: number | null
          sec_pot_vent_kw?: number | null
          sec_pot_total_kw?: number | null
          sec_cop?: number | null
          sec_cop_carnot?: number | null
          sec_corrente_comp_a?: number | null
          sec_corrente_vent_a?: number | null
          sec_corrente_total_a?: number | null
          sec_corrente_partida_a?: number | null
          validation_status?: "pending" | "approved" | "warning" | "rejected"
          data?: Json
          validated_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          modelo?: string
          modelo_unico?: string | null
          status_compressor?: string | null
          modelo_catalogo_original?: string | null
          modelo_base_referencia?: string | null
          fabricante?: string | null
          fabricante_origem?: string | null
          compressor_modelo?: string | null
          compressor_codigo?: string | null
          tipo_compressor?: string | null
          configuracao_eletrica?: string | null
          tensao_v?: number | null
          numero_fases?: number | null
          frequencia_hz?: number | null
          linha?: string | null
          designacao_hp?: string | null
          gabinete?: string | null
          tipo_gabinete?: string | null
          refrigerante?: string | null
          cap_reaquecimento_kcalh?: number | null
          cap_compressor_kcalh?: number | null
          calor_rejeitado_kcalh?: number | null
          pot_total_circuito_kw?: number | null
          corrente_circuito_a?: number | null
          corrente_partida_circuito_a?: number | null
          cop_global?: number | null
          gwp?: number | null
          odp?: number | null
          tipo_degelo?: string | null
          cond_rows?: number | null
          cond_tubes_per_row?: number | null
          cond_circuits?: number | null
          cond_fin_spacing_mm?: string | null
          cond_length_mm?: string | null
          cond_tubo_in?: string | null
          cond_tubo_mm?: number | null
          cond_tubo_esp_mm?: number | null
          cond_geometria?: string | null
          cond_volume_l?: number | null
          cond_ventilador?: string | null
          cond_vazao_m3h?: number | null
          evap_rows?: number | null
          evap_tubes_per_row?: number | null
          evap_circuits?: number | null
          evap_fin_spacing_mm?: string | null
          evap_length_mm?: string | null
          evap_geometria?: string | null
          reheat_tubes_per_row?: number | null
          reheat_circuits?: number | null
          reheat_fin_spacing_mm?: string | null
          reheat_length_mm?: string | null
          evap_tubo_in?: string | null
          evap_tubo_mm?: number | null
          evap_tubo_esp_mm?: number | null
          reheat_geometria?: string | null
          evap_volume_l?: number | null
          evap_area_m2?: number | null
          reheat_quantidade?: number | null
          evap_ventilador?: string | null
          evap_vazao_m3h?: number | null
          temp_camara_c?: number | null
          umidade_camara_pct?: number | null
          temp_evaporacao_c?: number | null
          temp_condensacao_c?: number | null
          temp_ambiente_c?: number | null
          umidade_externa_pct?: number | null
          vazao_massa_kgh?: number | null
          vazao_massa_kgs?: number | null
          delta_entalpia_kjkg?: number | null
          superaquecimento_total_k?: number | null
          superaquecimento_util_k?: number | null
          subresfriamento_k?: number | null
          subresfriamento_adicional_k?: number | null
          altitude_m?: number | null
          linha_descarga?: string | null
          vel_descarga_ms?: string | null
          linha_liquido?: string | null
          vel_liquido_ms?: string | null
          linha_succao?: string | null
          vel_succao_ms?: string | null
          carga_fluido_kg?: string | null
          agua_produzida_lh?: string | null
          diametro_dreno?: string | null
          quantidade_drenos?: number | null
          pot_compressor_kw?: number | null
          pot_ventilador_kw?: number | null
          pot_total_kw?: number | null
          cop?: number | null
          cop_carnot?: number | null
          corrente_compressor_a?: number | null
          corrente_ventiladores_a?: number | null
          corrente_total_a?: number | null
          corrente_partida_a?: number | null
          sec_modelo_condensador?: string | null
          sec_ventilador_condensador?: string | null
          sec_vazao_cond_m3h?: number | null
          sec_modelo_trocador?: string | null
          sec_cap_req_kcalh?: number | null
          sec_cap_comp_kcalh?: number | null
          sec_calor_rejeitado_kcalh?: number | null
          sec_temp_entrada_c?: number | null
          sec_temp_saida_c?: number | null
          sec_temp_evap_c?: number | null
          sec_temp_cond_c?: number | null
          sec_superaq_total_k?: number | null
          sec_superaq_util_k?: number | null
          sec_subresfr_k?: number | null
          sec_pot_comp_kw?: number | null
          sec_pot_vent_kw?: number | null
          sec_pot_total_kw?: number | null
          sec_cop?: number | null
          sec_cop_carnot?: number | null
          sec_corrente_comp_a?: number | null
          sec_corrente_vent_a?: number | null
          sec_corrente_total_a?: number | null
          sec_corrente_partida_a?: number | null
          validation_status?: "pending" | "approved" | "warning" | "rejected"
          data?: Json
          validated_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      coil_geometry_overrides: {
        Row: {
          base_id: string | null
          codigo: string
          created_at: string
          created_by: string | null
          deleted: boolean
          descricao: string
          id: string
          name: string
          raw: Json
          tipo_serpentina: string | null
          updated_at: string
        }
        Insert: {
          base_id?: string | null
          codigo: string
          created_at?: string
          created_by?: string | null
          deleted?: boolean
          descricao: string
          id?: string
          name: string
          raw?: Json
          tipo_serpentina?: string | null
          updated_at?: string
        }
        Update: {
          base_id?: string | null
          codigo?: string
          created_at?: string
          created_by?: string | null
          deleted?: boolean
          descricao?: string
          id?: string
          name?: string
          raw?: Json
          tipo_serpentina?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      product_revisions: {
        Row: {
          id: string
          catalog_model_id: string | null
          revision_number: number
          revision_label: string
          status: string
          snapshot: Json
          note: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          catalog_model_id?: string | null
          revision_number?: number
          revision_label: string
          status?: string
          snapshot?: Json
          note?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          catalog_model_id?: string | null
          revision_number?: number
          revision_label?: string
          status?: string
          snapshot?: Json
          note?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      compressors_catalog: {
        Row: {
          id: string
          manufacturer: string
          model: string
          refrigerant: string
          evap_temp_c: number
          cond_temp_c: number
          capacity_w: number
          power_kw: number
          cop: number
          voltage_v: number | null
          phases: number | null
          displacement_cc: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          manufacturer: string
          model: string
          refrigerant: string
          evap_temp_c: number
          cond_temp_c: number
          capacity_w: number
          power_kw: number
          cop: number
          voltage_v?: number | null
          phases?: number | null
          displacement_cc?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          manufacturer?: string
          model?: string
          refrigerant?: string
          evap_temp_c?: number
          cond_temp_c?: number
          capacity_w?: number
          power_kw?: number
          cop?: number
          voltage_v?: number | null
          phases?: number | null
          displacement_cc?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      compressors: {
        Row: {
          capacity_w: number | null
          cond_temp_c: number | null
          cop: number | null
          created_at: string
          created_by: string
          evap_temp_c: number | null
          id: string
          inputs: Json
          manufacturer: string | null
          model: string
          name: string
          notes: string | null
          power_kw: number | null
          project_id: string | null
          refrigerant: string | null
          results: Json
          updated_at: string
        }
        Insert: {
          capacity_w?: number | null
          cond_temp_c?: number | null
          cop?: number | null
          created_at?: string
          created_by: string
          evap_temp_c?: number | null
          id?: string
          inputs?: Json
          manufacturer?: string | null
          model: string
          name: string
          notes?: string | null
          power_kw?: number | null
          project_id?: string | null
          refrigerant?: string | null
          results?: Json
          updated_at?: string
        }
        Update: {
          capacity_w?: number | null
          cond_temp_c?: number | null
          cop?: number | null
          created_at?: string
          created_by?: string
          evap_temp_c?: number | null
          id?: string
          inputs?: Json
          manufacturer?: string | null
          model?: string
          name?: string
          notes?: string | null
          power_kw?: number | null
          project_id?: string | null
          refrigerant?: string | null
          results?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "compressors_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      condensers: {
        Row: {
          air_flow_m3h: number | null
          ambient_temp_c: number | null
          capacity_w: number | null
          cond_temp_c: number | null
          created_at: string
          created_by: string
          id: string
          inputs: Json
          model: string | null
          name: string
          notes: string | null
          project_id: string | null
          refrigerant: string | null
          results: Json
          subcooling_k: number | null
          type: string | null
          updated_at: string
        }
        Insert: {
          air_flow_m3h?: number | null
          ambient_temp_c?: number | null
          capacity_w?: number | null
          cond_temp_c?: number | null
          created_at?: string
          created_by: string
          id?: string
          inputs?: Json
          model?: string | null
          name: string
          notes?: string | null
          project_id?: string | null
          refrigerant?: string | null
          results?: Json
          subcooling_k?: number | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          air_flow_m3h?: number | null
          ambient_temp_c?: number | null
          capacity_w?: number | null
          cond_temp_c?: number | null
          created_at?: string
          created_by?: string
          id?: string
          inputs?: Json
          model?: string | null
          name?: string
          notes?: string | null
          project_id?: string | null
          refrigerant?: string | null
          results?: Json
          subcooling_k?: number | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "condensers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      cycle_simulations: {
        Row: {
          capacity_w: number | null
          compressor_id: string | null
          cond_temp_c: number | null
          condenser_id: string | null
          cop: number | null
          created_at: string
          created_by: string
          evap_temp_c: number | null
          evaporator_id: string | null
          id: string
          inputs: Json
          name: string
          notes: string | null
          project_id: string | null
          refrigerant: string | null
          results: Json
          updated_at: string
        }
        Insert: {
          capacity_w?: number | null
          compressor_id?: string | null
          cond_temp_c?: number | null
          condenser_id?: string | null
          cop?: number | null
          created_at?: string
          created_by: string
          evap_temp_c?: number | null
          evaporator_id?: string | null
          id?: string
          inputs?: Json
          name: string
          notes?: string | null
          project_id?: string | null
          refrigerant?: string | null
          results?: Json
          updated_at?: string
        }
        Update: {
          capacity_w?: number | null
          compressor_id?: string | null
          cond_temp_c?: number | null
          condenser_id?: string | null
          cop?: number | null
          created_at?: string
          created_by?: string
          evap_temp_c?: number | null
          evaporator_id?: string | null
          id?: string
          inputs?: Json
          name?: string
          notes?: string | null
          project_id?: string | null
          refrigerant?: string | null
          results?: Json
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cycle_simulations_compressor_id_fkey"
            columns: ["compressor_id"]
            isOneToOne: false
            referencedRelation: "compressors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cycle_simulations_condenser_id_fkey"
            columns: ["condenser_id"]
            isOneToOne: false
            referencedRelation: "condensers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cycle_simulations_evaporator_id_fkey"
            columns: ["evaporator_id"]
            isOneToOne: false
            referencedRelation: "evaporators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cycle_simulations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_test_bench_configs: {
        Row: {
          bench_inputs: Json
          compressor_envelope: Json | null
          compressor_id: string | null
          compressor_model: string | null
          condenser_envelope: Json | null
          created_at: string
          created_by: string
          equipment_id: string
          evaporator_envelope: Json | null
          id: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          bench_inputs?: Json
          compressor_envelope?: Json | null
          compressor_id?: string | null
          compressor_model?: string | null
          condenser_envelope?: Json | null
          created_at?: string
          created_by: string
          equipment_id: string
          evaporator_envelope?: Json | null
          id?: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          bench_inputs?: Json
          compressor_envelope?: Json | null
          compressor_id?: string | null
          compressor_model?: string | null
          condenser_envelope?: Json | null
          created_at?: string
          created_by?: string
          equipment_id?: string
          evaporator_envelope?: Json | null
          id?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      evaporators: {
        Row: {
          air_flow_m3h: number | null
          air_inlet_rh: number | null
          air_inlet_temp_c: number | null
          capacity_w: number | null
          created_at: string
          created_by: string
          evap_temp_c: number | null
          id: string
          inputs: Json
          model: string | null
          name: string
          notes: string | null
          project_id: string | null
          refrigerant: string | null
          results: Json
          superheat_k: number | null
          updated_at: string
        }
        Insert: {
          air_flow_m3h?: number | null
          air_inlet_rh?: number | null
          air_inlet_temp_c?: number | null
          capacity_w?: number | null
          created_at?: string
          created_by: string
          evap_temp_c?: number | null
          id?: string
          inputs?: Json
          model?: string | null
          name: string
          notes?: string | null
          project_id?: string | null
          refrigerant?: string | null
          results?: Json
          superheat_k?: number | null
          updated_at?: string
        }
        Update: {
          air_flow_m3h?: number | null
          air_inlet_rh?: number | null
          air_inlet_temp_c?: number | null
          capacity_w?: number | null
          created_at?: string
          created_by?: string
          evap_temp_c?: number | null
          id?: string
          inputs?: Json
          model?: string | null
          name?: string
          notes?: string | null
          project_id?: string | null
          refrigerant?: string | null
          results?: Json
          superheat_k?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaporators_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      fans: {
        Row: {
          air_flow_m3h: number | null
          created_at: string
          created_by: string
          data: Json
          diameter_mm: number | null
          id: string
          manufacturer: string | null
          model: string | null
          name: string
          notes: string | null
          power_w: number | null
          static_pressure_pa: number | null
          type: string | null
          updated_at: string
          voltage_v: number | null
        }
        Insert: {
          air_flow_m3h?: number | null
          created_at?: string
          created_by: string
          data?: Json
          diameter_mm?: number | null
          id?: string
          manufacturer?: string | null
          model?: string | null
          name: string
          notes?: string | null
          power_w?: number | null
          static_pressure_pa?: number | null
          type?: string | null
          updated_at?: string
          voltage_v?: number | null
        }
        Update: {
          air_flow_m3h?: number | null
          created_at?: string
          created_by?: string
          data?: Json
          diameter_mm?: number | null
          id?: string
          manufacturer?: string | null
          model?: string | null
          name?: string
          notes?: string | null
          power_w?: number | null
          static_pressure_pa?: number | null
          type?: string | null
          updated_at?: string
          voltage_v?: number | null
        }
        Relationships: []
      }
      fans_catalog: {
        Row: {
          airflow_m3h: number | null
          article_number: string | null
          created_at: string
          design: string | null
          efficiency_pct: number | null
          electrical: string | null
          fan_genre: string | null
          frequency_hz: number | null
          id: string
          manufacturer: string
          motor: string | null
          motor_family: string | null
          motor_power_w: number | null
          operating_points: Json
          phases: number | null
          power_w: number | null
          raw: Json
          rpm: number | null
          series: string | null
          sfp_class: string | null
          sfp_value: number | null
          size_mm: number | null
          sound_db: string | null
          static_pressure_pa: number | null
          type_key: string
          updated_at: string
          voltage_v: number | null
        }
        Insert: {
          airflow_m3h?: number | null
          article_number?: string | null
          created_at?: string
          design?: string | null
          efficiency_pct?: number | null
          electrical?: string | null
          fan_genre?: string | null
          frequency_hz?: number | null
          id?: string
          manufacturer: string
          motor?: string | null
          motor_family?: string | null
          motor_power_w?: number | null
          operating_points?: Json
          phases?: number | null
          power_w?: number | null
          raw?: Json
          rpm?: number | null
          series?: string | null
          sfp_class?: string | null
          sfp_value?: number | null
          size_mm?: number | null
          sound_db?: string | null
          static_pressure_pa?: number | null
          type_key: string
          updated_at?: string
          voltage_v?: number | null
        }
        Update: {
          airflow_m3h?: number | null
          article_number?: string | null
          created_at?: string
          design?: string | null
          efficiency_pct?: number | null
          electrical?: string | null
          fan_genre?: string | null
          frequency_hz?: number | null
          id?: string
          manufacturer?: string
          motor?: string | null
          motor_family?: string | null
          motor_power_w?: number | null
          operating_points?: Json
          phases?: number | null
          power_w?: number | null
          raw?: Json
          rpm?: number | null
          series?: string | null
          sfp_class?: string | null
          sfp_value?: number | null
          size_mm?: number | null
          sound_db?: string | null
          static_pressure_pa?: number | null
          type_key?: string
          updated_at?: string
          voltage_v?: number | null
        }
        Relationships: []
      }
      module_permissions: {
        Row: {
          can_edit: boolean
          can_view: boolean
          created_at: string
          id: string
          module_key: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
        }
        Insert: {
          can_edit?: boolean
          can_view?: boolean
          created_at?: string
          id?: string
          module_key: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Update: {
          can_edit?: boolean
          can_view?: boolean
          created_at?: string
          id?: string
          module_key?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_active: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          client: string | null
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          status: string
          updated_at: string
        }
        Insert: {
          client?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          status?: string
          updated_at?: string
        }
        Update: {
          client?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      refrigerants: {
        Row: {
          classification: string | null
          code: string
          created_at: string
          created_by: string
          data: Json
          family: string | null
          gwp: number | null
          id: string
          name: string
          notes: string | null
          odp: number | null
          updated_at: string
        }
        Insert: {
          classification?: string | null
          code: string
          created_at?: string
          created_by: string
          data?: Json
          family?: string | null
          gwp?: number | null
          id?: string
          name: string
          notes?: string | null
          odp?: number | null
          updated_at?: string
        }
        Update: {
          classification?: string | null
          code?: string
          created_at?: string
          created_by?: string
          data?: Json
          family?: string | null
          gwp?: number | null
          id?: string
          name?: string
          notes?: string | null
          odp?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          language: string
          unit_system: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          language?: string
          unit_system?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          language?: string
          unit_system?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      validation_results: {
        Row: {
          id: string
          catalog_model_id: string | null
          validated_at: string
          overall_status: string
          score_pct: number
          criteria: Json
          engine_version: string | null
          inputs_snapshot: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          catalog_model_id?: string | null
          validated_at: string
          overall_status: string
          score_pct: number
          criteria: Json
          engine_version?: string | null
          inputs_snapshot?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          catalog_model_id?: string | null
          validated_at?: string
          overall_status?: string
          score_pct?: number
          criteria?: Json
          engine_version?: string | null
          inputs_snapshot?: Json | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "engenheiro" | "gerente" | "visualizador"
      component_kind:
        | "evaporador"
        | "condensador"
        | "compressor"
        | "ventilador"
        | "valvula_expansao"
        | "separador_liquido"
        | "acumulador"
        | "painel_eletrico"
        | "controlador"
        | "outro"
      component_status:
        | "draft"
        | "imported"
        | "simulated"
        | "validated"
        | "approved"
        | "needs_review"
      equipment_application:
        | "resfriamento"
        | "congelamento"
        | "conservacao"
        | "processo_industrial"
        | "climatizacao_industrial"
        | "outro"
      equipment_component_role:
        | "evaporator"
        | "condenser"
        | "compressor"
        | "fan_evaporator"
        | "fan_condenser"
        | "valve"
        | "fluid"
        | "other"
      equipment_kind:
        | "plugin"
        | "split"
        | "rack"
        | "chiller"
        | "tunel_congelamento"
        | "camara_fria"
        | "unidade_condensadora"
        | "unidade_evaporadora"
        | "outro"
      equipment_project_status:
        | "draft"
        | "in_progress"
        | "validated"
        | "archived"
      technical_batch_status:
        | "pending"
        | "processing"
        | "mapped"
        | "partially_validated"
        | "completed"
        | "failed"
      technical_entity_type:
        | "compressor"
        | "fan"
        | "expansion_valve"
        | "solenoid_valve"
        | "hot_gas_valve"
        | "condenser_coil"
        | "evaporator_coil"
        | "refrigerant"
        | "fluid"
        | "controller"
        | "sensor"
        | "accessory"
        | "unknown"
      technical_file_category:
        | "ficha_tecnica"
        | "laudo_teste"
        | "planilha_calculo"
        | "curva_compressor"
        | "catalogo_fornecedor"
        | "desenho_tecnico"
        | "imagem"
        | "outro"
      technical_file_group:
        | "evaporador"
        | "condensador"
        | "compressor"
        | "laudos"
        | "planilhas"
        | "curvas"
        | "imagens"
        | "documentos"
        | "outros"
      technical_record_status:
        | "raw_imported"
        | "mapped"
        | "needs_review"
        | "validated"
        | "approved"
        | "rejected"
        | "unmapped"
        | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "engenheiro", "gerente", "visualizador"],
      component_kind: [
        "evaporador",
        "condensador",
        "compressor",
        "ventilador",
        "valvula_expansao",
        "separador_liquido",
        "acumulador",
        "painel_eletrico",
        "controlador",
        "outro",
      ],
      component_status: [
        "draft",
        "imported",
        "simulated",
        "validated",
        "approved",
        "needs_review",
      ],
      equipment_application: [
        "resfriamento",
        "congelamento",
        "conservacao",
        "processo_industrial",
        "climatizacao_industrial",
        "outro",
      ],
      equipment_component_role: [
        "evaporator",
        "condenser",
        "compressor",
        "fan_evaporator",
        "fan_condenser",
        "valve",
        "fluid",
        "other",
      ],
      equipment_kind: [
        "plugin",
        "split",
        "rack",
        "chiller",
        "tunel_congelamento",
        "camara_fria",
        "unidade_condensadora",
        "unidade_evaporadora",
        "outro",
      ],
      equipment_project_status: [
        "draft",
        "in_progress",
        "validated",
        "archived",
      ],
      technical_batch_status: [
        "pending",
        "processing",
        "mapped",
        "partially_validated",
        "completed",
        "failed",
      ],
      technical_entity_type: [
        "compressor",
        "fan",
        "expansion_valve",
        "solenoid_valve",
        "hot_gas_valve",
        "condenser_coil",
        "evaporator_coil",
        "refrigerant",
        "fluid",
        "controller",
        "sensor",
        "accessory",
        "unknown",
      ],
      technical_file_category: [
        "ficha_tecnica",
        "laudo_teste",
        "planilha_calculo",
        "curva_compressor",
        "catalogo_fornecedor",
        "desenho_tecnico",
        "imagem",
        "outro",
      ],
      technical_file_group: [
        "evaporador",
        "condensador",
        "compressor",
        "laudos",
        "planilhas",
        "curvas",
        "imagens",
        "documentos",
        "outros",
      ],
      technical_record_status: [
        "raw_imported",
        "mapped",
        "needs_review",
        "validated",
        "approved",
        "rejected",
        "unmapped",
        "archived",
      ],
    },
  },
} as const
