import { TechnicalField } from "../ui/TechnicalField";
import { validateRequired } from "../../utils/validation";

export interface SystemConditions {
  ambient_temp_c: number;
  required_airflow_m3_h: number;
  /** ΔT nominal do evaporador (K) — opcional. Habilita critério `delta_t_evap_check`. */
  nominal_delta_t_evap_k?: number;
  /** ΔT nominal do condensador (K) — opcional. Habilita critério `delta_t_cond_check`. */
  nominal_delta_t_cond_k?: number;
}

interface SystemConditionsFormProps {
  value: Partial<SystemConditions>;
  onChange: (value: Partial<SystemConditions>) => void;
}

export function SystemConditionsForm({ value, onChange }: SystemConditionsFormProps) {
  const set = (field: keyof SystemConditions, raw: string) => {
    const n = parseFloat(raw);
    onChange({ ...value, [field]: isNaN(n) ? undefined : n });
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-sm font-semibold text-slate-900">Condições do Sistema</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TechnicalField
          label="T ambiente"
          value={value.ambient_temp_c}
          onChange={(v) => set("ambient_temp_c", v)}
          type="number"
          unit="°C"
          required
          validation={validateRequired(value.ambient_temp_c)}
          help={{
            description: "Temperatura do ar ambiente onde o sistema opera.",
            unit: "Graus Celsius [°C]",
            typicalRange: "15°C a 45°C",
            example: "25",
            impact: "Afeta a temperatura de condensação e a eficiência.",
          }}
        />
        <TechnicalField
          label="Vazão de ar requerida"
          value={value.required_airflow_m3_h}
          onChange={(v) => set("required_airflow_m3_h", v)}
          type="number"
          unit="m³/h"
          required
          validation={validateRequired(value.required_airflow_m3_h)}
          help={{
            description: "Vazão de ar necessária no evaporador.",
            unit: "Metros cúbicos por hora [m³/h]",
            typicalRange: "500 m³/h a 20.000 m³/h",
            example: "3000",
            impact: "Usada para verificar utilização do ventilador e transferência de calor.",
          }}
        />
        <TechnicalField
          label="ΔT Evaporador nominal"
          value={value.nominal_delta_t_evap_k}
          onChange={(v) => set("nominal_delta_t_evap_k", v)}
          type="number"
          unit="K"
          help={{
            description:
              "T_ambiente − T_evaporação nominal. Exemplo: câmara −20 °C, T_evap −27 °C → ΔT = 7 K.",
            unit: "Kelvin [K]",
            typicalRange: "5 K a 10 K",
            example: "7",
            impact: "Quando preenchido, habilita o critério de validação ΔT do evaporador.",
          }}
        />
        <TechnicalField
          label="ΔT Condensador nominal"
          value={value.nominal_delta_t_cond_k}
          onChange={(v) => set("nominal_delta_t_cond_k", v)}
          type="number"
          unit="K"
          help={{
            description:
              "T_condensação − T_ambiente nominal. Exemplo: T_cond 40 °C, T_amb 32 °C → ΔT = 8 K.",
            unit: "Kelvin [K]",
            typicalRange: "5 K a 15 K",
            example: "8",
            impact: "Quando preenchido, habilita o critério de validação ΔT do condensador.",
          }}
        />
      </div>
    </section>
  );
}
