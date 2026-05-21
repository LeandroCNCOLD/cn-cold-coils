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
          compressor: string | null
          compressor_codigo: string | null
          tipo_compressor: string | null
          configuracao_eletrica: string | null
          tensao_eletrica_v: string | null
          tensao_v: number | null
          numero_fases: number | null
          frequencia_hz: number | null
          linha: string | null
          designacao_comercial_em_hp: string | null
          gabinete: string | null
          tipo_de_gabinete: string | null
          refrigerante: string | null
          capacidade_frigorifica_kcal_h_capacidade_do_reaquecimento: number | null
          capacidade_frigorifica_kcal_h_capacidade_do_compressor: number | null
          calor_rejeitado_kcal_h_capacidade_do_condensador: number | null
          potencia_eletrica_requerida_total_circuito_completo_kw: number | null
          corrente_eletrica_estimada_circuito_completo_a: number | null
          corrente_eletrica_de_partida_circuito_completo_a: number | null
          cop_global_kw_kw: number | null
          gwp_ar6: number | null
          odp_ar6: number | null
          tipo_de_degelo: string | null
          condensador_rows: number | null
          condensador_tubes_per_row: number | null
          condensador_circuits: number | null
          condensador_fin_spacing_mm: string | null
          condensador_length_mm: string | null
          o_tubo_cond_in: string | null
          o_tubo_cond_mm: number | null
          esp_tubo_cond_mm: number | null
          geometria_condensador: string | null
          volume_interno_condensador_dm_l: number | null
          ventilador_condensador: string | null
          vazao_ventilador_condensador_m_h: number | null
          eaporadorrows: number | null
          eaporadortubes_per_row: number | null
          eaporadorcircuits: number | null
          eaporador_fin_spacing_mm: string | null
          eaporador_length_mm: string | null
          eaporadorrows_1: number | null
          geometria_evaporador: string | null
          reaquecimento_tubes_per_row: number | null
          reaquecimento_circuits: number | null
          reaquecimento_fin_spacing_mm: string | null
          reaquecimento_length_mm: string | null
          o_tubo_evap_in: string | null
          o_tubo_evap_mm: number | null
          esp_tubo_evap_mm: number | null
          geometria_reaquecimento: string | null
          volume_interno_eaporador_dm_l: number | null
          area_da_superficie_de_troca_eaporador_m: number | null
          quantidade_de_reaquecimentoes: number | null
          ventilador_reaquecimento: string | null
          vazao_ventilador_eaporador_m_h: number | null
          temperatura_da_camara_c: number | null
          umidade_da_camara: number | null
          temperatura_de_evaporacao_c: number | null
          temperatura_de_condensacao_c: number | null
          temperatura_externa_c: number | null
          umidade_externa: number | null
          vazao_em_massa_kg_h: number | null
          vazao_em_massa_kg_s: number | null
          diferenca_de_entalpia_kj_kg: number | null
          superaquecimento_total_k: number | null
          superaquecimento_util_k: number | null
          subresfriamento_k: number | null
          subresfriamento_adicional_k: number | null
          altitude_m: number | null
          linha_de_descarga: string | null
          velocidade_linha_de_descarga_m_s_ate_15m: string | null
          linha_de_liquido: string | null
          velocidade_linha_de_liquido_m_s_ate_15m: string | null
          linha_de_succao: string | null
          velocidade_linha_de_succao_m_s_ate_15m: string | null
          carga_de_fluido_kg: string | null
          quantidade_de_agua_produzida_l_h: string | null
          diametro_dreno: string | null
          quantidade_de_drenos: number | null
          potencia_eletrica_requerida_compressor_kw: number | null
          potencia_eletrica_requerida_ventilador_kw: number | null
          potencia_eletrica_requerida_total_kw: number | null
          cop_kw_kw: number | null
          cop_carnot_k_k: number | null
          corrente_eletrica_compressor_a: number | null
          corrente_eletrica_ventiladores_a: number | null
          corrente_eletrica_estimada_a: number | null
          corrente_eletrica_de_partida_a: number | null
          modelo_condensador_secundario: string | null
          ventilador_condensador_secundario: string | null
          vazao_ventilador_condensador_secundario_m_h: number | null
          modelo_tocador_de_calor: string | null
          capacidade_frigorifica_requisitada_kcal_h: number | null
          capacidade_frigorifica_do_compressor_kcal_h: number | null
          calor_rejeitado_secundario_kcal_h: number | null
          temperatura_de_entrada_c: number | null
          temperatura_de_saida_c: number | null
          temperatura_de_evaporacao_secundario_c: number | null
          temperatura_de_condensacao_secundario_c: number | null
          superaquecimento_total_secundario_k: number | null
          superaquecimento_util_secundario_k: number | null
          subresfriamento_secundario_k: number | null
          potencia_eletrica_requerida_compressor_secundario_kw: number | null
          potencia_eletrica_requerida_ventilador_secundario_kw: number | null
          potencia_eletrica_requerida_total_secundario_kw: number | null
          cop_secundario_kw_kw: number | null
          cop_carnot_secundario_k_k: number | null
          corrente_eletrica_compressor_secundario_a: number | null
          corrente_eletrica_ventiladores_secundario_a: number | null
          corrente_eletrica_estimada_secundario_a: number | null
          corrente_eletrica_de_partida_secundario_a: number | null
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
          compressor?: string | null
          compressor_codigo?: string | null
          tipo_compressor?: string | null
          configuracao_eletrica?: string | null
          tensao_eletrica_v?: string | null
          tensao_v?: number | null
          numero_fases?: number | null
          frequencia_hz?: number | null
          linha?: string | null
          designacao_comercial_em_hp?: string | null
          gabinete?: string | null
          tipo_de_gabinete?: string | null
          refrigerante?: string | null
          capacidade_frigorifica_kcal_h_capacidade_do_reaquecimento?: number | null
          capacidade_frigorifica_kcal_h_capacidade_do_compressor?: number | null
          calor_rejeitado_kcal_h_capacidade_do_condensador?: number | null
          potencia_eletrica_requerida_total_circuito_completo_kw?: number | null
          corrente_eletrica_estimada_circuito_completo_a?: number | null
          corrente_eletrica_de_partida_circuito_completo_a?: number | null
          cop_global_kw_kw?: number | null
          gwp_ar6?: number | null
          odp_ar6?: number | null
          tipo_de_degelo?: string | null
          condensador_rows?: number | null
          condensador_tubes_per_row?: number | null
          condensador_circuits?: number | null
          condensador_fin_spacing_mm?: string | null
          condensador_length_mm?: string | null
          o_tubo_cond_in?: string | null
          o_tubo_cond_mm?: number | null
          esp_tubo_cond_mm?: number | null
          geometria_condensador?: string | null
          volume_interno_condensador_dm_l?: number | null
          ventilador_condensador?: string | null
          vazao_ventilador_condensador_m_h?: number | null
          eaporadorrows?: number | null
          eaporadortubes_per_row?: number | null
          eaporadorcircuits?: number | null
          eaporador_fin_spacing_mm?: string | null
          eaporador_length_mm?: string | null
          eaporadorrows_1?: number | null
          geometria_evaporador?: string | null
          reaquecimento_tubes_per_row?: number | null
          reaquecimento_circuits?: number | null
          reaquecimento_fin_spacing_mm?: string | null
          reaquecimento_length_mm?: string | null
          o_tubo_evap_in?: string | null
          o_tubo_evap_mm?: number | null
          esp_tubo_evap_mm?: number | null
          geometria_reaquecimento?: string | null
          volume_interno_eaporador_dm_l?: number | null
          area_da_superficie_de_troca_eaporador_m?: number | null
          quantidade_de_reaquecimentoes?: number | null
          ventilador_reaquecimento?: string | null
          vazao_ventilador_eaporador_m_h?: number | null
          temperatura_da_camara_c?: number | null
          umidade_da_camara?: number | null
          temperatura_de_evaporacao_c?: number | null
          temperatura_de_condensacao_c?: number | null
          temperatura_externa_c?: number | null
          umidade_externa?: number | null
          vazao_em_massa_kg_h?: number | null
          vazao_em_massa_kg_s?: number | null
          diferenca_de_entalpia_kj_kg?: number | null
          superaquecimento_total_k?: number | null
          superaquecimento_util_k?: number | null
          subresfriamento_k?: number | null
          subresfriamento_adicional_k?: number | null
          altitude_m?: number | null
          linha_de_descarga?: string | null
          velocidade_linha_de_descarga_m_s_ate_15m?: string | null
          linha_de_liquido?: string | null
          velocidade_linha_de_liquido_m_s_ate_15m?: string | null
          linha_de_succao?: string | null
          velocidade_linha_de_succao_m_s_ate_15m?: string | null
          carga_de_fluido_kg?: string | null
          quantidade_de_agua_produzida_l_h?: string | null
          diametro_dreno?: string | null
          quantidade_de_drenos?: number | null
          potencia_eletrica_requerida_compressor_kw?: number | null
          potencia_eletrica_requerida_ventilador_kw?: number | null
          potencia_eletrica_requerida_total_kw?: number | null
          cop_kw_kw?: number | null
          cop_carnot_k_k?: number | null
          corrente_eletrica_compressor_a?: number | null
          corrente_eletrica_ventiladores_a?: number | null
          corrente_eletrica_estimada_a?: number | null
          corrente_eletrica_de_partida_a?: number | null
          modelo_condensador_secundario?: string | null
          ventilador_condensador_secundario?: string | null
          vazao_ventilador_condensador_secundario_m_h?: number | null
          modelo_tocador_de_calor?: string | null
          capacidade_frigorifica_requisitada_kcal_h?: number | null
          capacidade_frigorifica_do_compressor_kcal_h?: number | null
          calor_rejeitado_secundario_kcal_h?: number | null
          temperatura_de_entrada_c?: number | null
          temperatura_de_saida_c?: number | null
          temperatura_de_evaporacao_secundario_c?: number | null
          temperatura_de_condensacao_secundario_c?: number | null
          superaquecimento_total_secundario_k?: number | null
          superaquecimento_util_secundario_k?: number | null
          subresfriamento_secundario_k?: number | null
          potencia_eletrica_requerida_compressor_secundario_kw?: number | null
          potencia_eletrica_requerida_ventilador_secundario_kw?: number | null
          potencia_eletrica_requerida_total_secundario_kw?: number | null
          cop_secundario_kw_kw?: number | null
          cop_carnot_secundario_k_k?: number | null
          corrente_eletrica_compressor_secundario_a?: number | null
          corrente_eletrica_ventiladores_secundario_a?: number | null
          corrente_eletrica_estimada_secundario_a?: number | null
          corrente_eletrica_de_partida_secundario_a?: number | null
          validation_status?: "pending" | "approved" | "warning" | "rejected"
          data?: Json
          validated_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          modelo_unico?: string | null
          status_compressor?: string | null
          modelo_catalogo_original?: string | null
          modelo_base_referencia?: string | null
          fabricante?: string | null
          fabricante_origem?: string | null
          compressor?: string | null
          compressor_codigo?: string | null
          tipo_compressor?: string | null
          configuracao_eletrica?: string | null
          tensao_eletrica_v?: string | null
          tensao_v?: number | null
          numero_fases?: number | null
          frequencia_hz?: number | null
          linha?: string | null
          designacao_comercial_em_hp?: string | null
          gabinete?: string | null
          tipo_de_gabinete?: string | null
          refrigerante?: string | null
          capacidade_frigorifica_kcal_h_capacidade_do_reaquecimento?: number | null
          capacidade_frigorifica_kcal_h_capacidade_do_compressor?: number | null
          calor_rejeitado_kcal_h_capacidade_do_condensador?: number | null
          potencia_eletrica_requerida_total_circuito_completo_kw?: number | null
          corrente_eletrica_estimada_circuito_completo_a?: number | null
          corrente_eletrica_de_partida_circuito_completo_a?: number | null
          cop_global_kw_kw?: number | null
          gwp_ar6?: number | null
          odp_ar6?: number | null
          tipo_de_degelo?: string | null
          condensador_rows?: number | null
          condensador_tubes_per_row?: number | null
          condensador_circuits?: number | null
          condensador_fin_spacing_mm?: string | null
          condensador_length_mm?: string | null
          o_tubo_cond_in?: string | null
          o_tubo_cond_mm?: number | null
          esp_tubo_cond_mm?: number | null
          geometria_condensador?: string | null
          volume_interno_condensador_dm_l?: number | null
          ventilador_condensador?: string | null
          vazao_ventilador_condensador_m_h?: number | null
          eaporadorrows?: number | null
          eaporadortubes_per_row?: number | null
          eaporadorcircuits?: number | null
          eaporador_fin_spacing_mm?: string | null
          eaporador_length_mm?: string | null
          eaporadorrows_1?: number | null
          geometria_evaporador?: string | null
          reaquecimento_tubes_per_row?: number | null
          reaquecimento_circuits?: number | null
          reaquecimento_fin_spacing_mm?: string | null
          reaquecimento_length_mm?: string | null
          o_tubo_evap_in?: string | null
          o_tubo_evap_mm?: number | null
          esp_tubo_evap_mm?: number | null
          geometria_reaquecimento?: string | null
          volume_interno_eaporador_dm_l?: number | null
          area_da_superficie_de_troca_eaporador_m?: number | null
          quantidade_de_reaquecimentoes?: number | null
          ventilador_reaquecimento?: string | null
          vazao_ventilador_eaporador_m_h?: number | null
          temperatura_da_camara_c?: number | null
          umidade_da_camara?: number | null
          temperatura_de_evaporacao_c?: number | null
          temperatura_de_condensacao_c?: number | null
          temperatura_externa_c?: number | null
          umidade_externa?: number | null
          vazao_em_massa_kg_h?: number | null
          vazao_em_massa_kg_s?: number | null
          diferenca_de_entalpia_kj_kg?: number | null
          superaquecimento_total_k?: number | null
          superaquecimento_util_k?: number | null
          subresfriamento_k?: number | null
          subresfriamento_adicional_k?: number | null
          altitude_m?: number | null
          linha_de_descarga?: string | null
          velocidade_linha_de_descarga_m_s_ate_15m?: string | null
          linha_de_liquido?: string | null
          velocidade_linha_de_liquido_m_s_ate_15m?: string | null
          linha_de_succao?: string | null
          velocidade_linha_de_succao_m_s_ate_15m?: string | null
          carga_de_fluido_kg?: string | null
          quantidade_de_agua_produzida_l_h?: string | null
          diametro_dreno?: string | null
          quantidade_de_drenos?: number | null
          potencia_eletrica_requerida_compressor_kw?: number | null
          potencia_eletrica_requerida_ventilador_kw?: number | null
          potencia_eletrica_requerida_total_kw?: number | null
          cop_kw_kw?: number | null
          cop_carnot_k_k?: number | null
          corrente_eletrica_compressor_a?: number | null
          corrente_eletrica_ventiladores_a?: number | null
          corrente_eletrica_estimada_a?: number | null
          corrente_eletrica_de_partida_a?: number | null
          modelo_condensador_secundario?: string | null
          ventilador_condensador_secundario?: string | null
          vazao_ventilador_condensador_secundario_m_h?: number | null
          modelo_tocador_de_calor?: string | null
          capacidade_frigorifica_requisitada_kcal_h?: number | null
          capacidade_frigorifica_do_compressor_kcal_h?: number | null
          calor_rejeitado_secundario_kcal_h?: number | null
          temperatura_de_entrada_c?: number | null
          temperatura_de_saida_c?: number | null
          temperatura_de_evaporacao_secundario_c?: number | null
          temperatura_de_condensacao_secundario_c?: number | null
          superaquecimento_total_secundario_k?: number | null
          superaquecimento_util_secundario_k?: number | null
          subresfriamento_secundario_k?: number | null
          potencia_eletrica_requerida_compressor_secundario_kw?: number | null
          potencia_eletrica_requerida_ventilador_secundario_kw?: number | null
          potencia_eletrica_requerida_total_secundario_kw?: number | null
          cop_secundario_kw_kw?: number | null
          cop_carnot_secundario_k_k?: number | null
          corrente_eletrica_compressor_secundario_a?: number | null
          corrente_eletrica_ventiladores_secundario_a?: number | null
          corrente_eletrica_estimada_secundario_a?: number | null
          corrente_eletrica_de_partida_secundario_a?: number | null
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
