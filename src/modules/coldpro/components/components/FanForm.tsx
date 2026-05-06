import { useState } from "react";
import { TechnicalField } from "../ui/TechnicalField";
import { useComponentStore } from "../../stores/useComponentStore";
import type { FanSpec, FanFamily, FanDriveType } from "@/modules/coldpro_v2";
import { useTranslation } from "@/i18n/useTranslation";

interface FanFormProps {
  onSaved: () => void;
}

type FanRole = "evaporator_fan" | "condenser_fan";

const num = (v: string): number | undefined => {
  if (v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};

/**
 * Converte uma string como "278.4, -0.097, 1.39e-05" (vírgula, ponto-e-vírgula
 * ou quebra de linha) em array de números. Retorna undefined se vazia.
 */
function parseCoefficients(raw: string): number[] | undefined {
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  const parts = trimmed
    .split(/[\s,;]+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const nums = parts.map((p) => Number(p));
  if (nums.some((n) => !Number.isFinite(n))) return undefined;
  return nums;
}

export function FanForm({ onSaved }: FanFormProps) {
  const { t } = useTranslation();
  const addFan = useComponentStore((s) => s.addFan);

  // Identificação
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [role, setRole] = useState<FanRole>("evaporator_fan");

  // Operação nominal
  const [airflow, setAirflow] = useState<number | undefined>();
  const [pressure, setPressure] = useState<number | undefined>(50);
  const [minAirflow, setMinAirflow] = useState<number | undefined>();
  const [maxAirflow, setMaxAirflow] = useState<number | undefined>();

  // Construção
  const [family, setFamily] = useState<FanFamily | "">("");
  const [drive, setDrive] = useState<FanDriveType | "">("");
  const [diameter, setDiameter] = useState<number | undefined>();
  const [bladeCount, setBladeCount] = useState<number | undefined>();
  const [rpm, setRpm] = useState<number | undefined>();
  const [weight, setWeight] = useState<number | undefined>();

  // Motor / elétrica
  const [motorPower, setMotorPower] = useState<number | undefined>();
  const [current, setCurrent] = useState<number | undefined>();
  const [voltage, setVoltage] = useState<number | undefined>();
  const [phases, setPhases] = useState<1 | 3 | "">("");
  const [frequency, setFrequency] = useState<number | undefined>();

  // Acústica
  const [sound, setSound] = useState<number | undefined>();

  // Polinômios
  const [sphRaw, setSphRaw] = useState("");
  const [powerRaw, setPowerRaw] = useState("");

  const sphCoeffs = parseCoefficients(sphRaw);
  const powerCoeffs = parseCoefficients(powerRaw);
  const sphInvalid = sphRaw.trim().length > 0 && sphCoeffs === undefined;
  const powerInvalid = powerRaw.trim().length > 0 && powerCoeffs === undefined;

  const canSave =
    name.trim().length > 0 &&
    airflow !== undefined &&
    airflow > 0 &&
    pressure !== undefined &&
    !sphInvalid &&
    !powerInvalid;

  const handleSave = () => {
    if (!canSave) return;
    const spec: FanSpec = {
      airflow_m3_h: airflow!,
      available_static_pressure_pa: pressure!,
      ...(manufacturer.trim() && { manufacturer: manufacturer.trim() }),
      ...(model.trim() && { model: model.trim() }),
      ...(family && { family }),
      ...(drive && { drive }),
      ...(diameter !== undefined && { diameter_mm: diameter }),
      ...(bladeCount !== undefined && { blade_count: bladeCount }),
      ...(rpm !== undefined && { rpm }),
      ...(weight !== undefined && { weight_kg: weight }),
      ...(motorPower !== undefined && { motor_power_w: motorPower }),
      ...(current !== undefined && { motor_current_a: current }),
      ...(voltage !== undefined && { voltage_v: voltage }),
      ...(phases !== "" && { phases }),
      ...(frequency !== undefined && { frequency_hz: frequency }),
      ...(sound !== undefined && { sound_pressure_db: sound }),
      ...(minAirflow !== undefined && { min_airflow_m3_h: minAirflow }),
      ...(maxAirflow !== undefined && { max_airflow_m3_h: maxAirflow }),
      ...(sphCoeffs && { sph_coefficients: sphCoeffs }),
      ...(powerCoeffs && { power_coefficients: powerCoeffs }),
    };
    addFan(name.trim(), role, spec);
    onSaved();
  };

  return (
    <div className="space-y-6">
      {/* Identificação */}
      <Section title="Identificação">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TechnicalField
            label="Nome / etiqueta"
            value={name}
            onChange={(v) => setName(v)}
            type="text"
            placeholder={t("components.placeholders.fan")}
            required
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Posição
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as FanRole)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="evaporator_fan">Ventilador de evaporador</option>
              <option value="condenser_fan">Ventilador de condensador</option>
            </select>
          </div>
          <TechnicalField
            label="Fabricante"
            value={manufacturer}
            onChange={(v) => setManufacturer(v)}
            type="text"
            placeholder="Ex.: EBM-Papst, Ziehl-Abegg"
          />
          <TechnicalField
            label="Modelo"
            value={model}
            onChange={(v) => setModel(v)}
            type="text"
            placeholder="Ex.: A3G500-AN33-35"
          />
        </div>
      </Section>

      {/* Operação */}
      <Section title="Ponto de operação nominal">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TechnicalField
            label="Vazão de ar"
            value={airflow ?? ""}
            onChange={(v) => setAirflow(num(v))}
            type="number"
            unit="m³/h"
            required
          />
          <TechnicalField
            label="Pressão estática disponível"
            value={pressure ?? ""}
            onChange={(v) => setPressure(num(v))}
            type="number"
            unit="Pa"
            required
          />
          <TechnicalField
            label="Vazão mínima"
            value={minAirflow ?? ""}
            onChange={(v) => setMinAirflow(num(v))}
            type="number"
            unit="m³/h"
          />
          <TechnicalField
            label="Vazão máxima (free flow)"
            value={maxAirflow ?? ""}
            onChange={(v) => setMaxAirflow(num(v))}
            type="number"
            unit="m³/h"
          />
        </div>
      </Section>

      {/* Construção */}
      <Section title="Construção">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Família
            </label>
            <select
              value={family}
              onChange={(e) => setFamily(e.target.value as FanFamily | "")}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">—</option>
              <option value="axial">Axial</option>
              <option value="centrifugal_forward">Centrífugo — pás para frente</option>
              <option value="centrifugal_backward">Centrífugo — pás para trás</option>
              <option value="centrifugal_radial">Centrífugo — radial</option>
              <option value="mixed_flow">Fluxo misto</option>
              <option value="tangential">Tangencial</option>
              <option value="ec_plug">EC Plug</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Transmissão
            </label>
            <select
              value={drive}
              onChange={(e) => setDrive(e.target.value as FanDriveType | "")}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">—</option>
              <option value="direct">Direta</option>
              <option value="belt">Correia</option>
            </select>
          </div>
          <TechnicalField
            label="Diâmetro nominal"
            value={diameter ?? ""}
            onChange={(v) => setDiameter(num(v))}
            type="number"
            unit="mm"
          />
          <TechnicalField
            label="Nº de pás"
            value={bladeCount ?? ""}
            onChange={(v) => setBladeCount(num(v))}
            type="number"
          />
          <TechnicalField
            label="Rotação"
            value={rpm ?? ""}
            onChange={(v) => setRpm(num(v))}
            type="number"
            unit="rpm"
          />
          <TechnicalField
            label="Peso"
            value={weight ?? ""}
            onChange={(v) => setWeight(num(v))}
            type="number"
            unit="kg"
          />
        </div>
      </Section>

      {/* Motor */}
      <Section title="Motor / dados elétricos">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TechnicalField
            label="Potência absorvida"
            value={motorPower ?? ""}
            onChange={(v) => setMotorPower(num(v))}
            type="number"
            unit="W"
          />
          <TechnicalField
            label="Corrente nominal"
            value={current ?? ""}
            onChange={(v) => setCurrent(num(v))}
            type="number"
            unit="A"
          />
          <TechnicalField
            label="Tensão"
            value={voltage ?? ""}
            onChange={(v) => setVoltage(num(v))}
            type="number"
            unit="V"
          />
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Fases
            </label>
            <select
              value={phases}
              onChange={(e) =>
                setPhases(e.target.value === "" ? "" : (Number(e.target.value) as 1 | 3))
              }
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            >
              <option value="">—</option>
              <option value="1">Monofásico</option>
              <option value="3">Trifásico</option>
            </select>
          </div>
          <TechnicalField
            label="Frequência"
            value={frequency ?? ""}
            onChange={(v) => setFrequency(num(v))}
            type="number"
            unit="Hz"
          />
          <TechnicalField
            label="Pressão sonora a 1 m"
            value={sound ?? ""}
            onChange={(v) => setSound(num(v))}
            type="number"
            unit="dB(A)"
          />
        </div>
      </Section>

      {/* Polinômios */}
      <Section title="Curvas características (polinômios)">
        <p className="mb-3 text-xs text-slate-500">
          Insira os coeficientes do polinômio na ordem crescente de Q
          (a₀, a₁, a₂, …), separados por vírgula, espaço ou quebra de linha. Q
          é a vazão em m³/h. Aceita notação científica (ex.: <code>1.39e-05</code>).
        </p>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Pressão estática SPH(Q) [Pa]
            </label>
            <textarea
              value={sphRaw}
              onChange={(e) => setSphRaw(e.target.value)}
              placeholder="Ex.: 278.4, -0.0976, 1.39e-05, 1.57e-08, -1.12e-11"
              rows={3}
              className={`w-full rounded-md border bg-white px-3 py-2 font-mono text-xs outline-none ${
                sphInvalid
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-300 focus:border-[#1E6FD9]"
              }`}
            />
            {sphInvalid ? (
              <p className="mt-1 text-xs text-red-600">
                Coeficientes inválidos — verifique o formato.
              </p>
            ) : sphCoeffs ? (
              <p className="mt-1 text-xs text-slate-500">
                {sphCoeffs.length} coeficiente{sphCoeffs.length === 1 ? "" : "s"}{" "}
                · grau {sphCoeffs.length - 1}
              </p>
            ) : null}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Potência absorvida P(Q) [W]
            </label>
            <textarea
              value={powerRaw}
              onChange={(e) => setPowerRaw(e.target.value)}
              placeholder="Ex.: 120, 0.018, -2.4e-06, 3.1e-10"
              rows={3}
              className={`w-full rounded-md border bg-white px-3 py-2 font-mono text-xs outline-none ${
                powerInvalid
                  ? "border-red-400 focus:border-red-500"
                  : "border-slate-300 focus:border-[#1E6FD9]"
              }`}
            />
            {powerInvalid ? (
              <p className="mt-1 text-xs text-red-600">
                Coeficientes inválidos — verifique o formato.
              </p>
            ) : powerCoeffs ? (
              <p className="mt-1 text-xs text-slate-500">
                {powerCoeffs.length} coeficiente{powerCoeffs.length === 1 ? "" : "s"}{" "}
                · grau {powerCoeffs.length - 1}
              </p>
            ) : null}
          </div>
        </div>
      </Section>

      <button
        type="button"
        onClick={handleSave}
        disabled={!canSave}
        className="w-full rounded-md bg-[#1E6FD9] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1558b0] disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Salvar Ventilador
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </h4>
      {children}
    </div>
  );
}
