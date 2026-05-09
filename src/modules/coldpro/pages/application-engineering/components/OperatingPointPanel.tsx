import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useApplicationEngineering } from "../hooks/useApplicationEngineering";

export function OperatingPointPanel() {
  const { operatingPointInput, setOperatingPointInput } = useApplicationEngineering();

  const isModeA = operatingPointInput.mode === "A";

  return (
    <div className="space-y-4">
      <RadioGroup
        value={operatingPointInput.mode}
        onValueChange={(v) => {
          if (v === "A") {
            setOperatingPointInput({ mode: "A", evap_temp_c: -10, cond_temp_c: 45 });
          } else {
            setOperatingPointInput({ mode: "B", room_temp_c: 2, ambient_temp_c: 35 });
          }
        }}
        className="flex gap-6"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="A" id="modeA" />
          <Label htmlFor="modeA" className="cursor-pointer text-sm">
            Modo A — Te / Tc diretos
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="B" id="modeB" />
          <Label htmlFor="modeB" className="cursor-pointer text-sm">
            Modo B — T_ambiente / T_câmara
          </Label>
        </div>
      </RadioGroup>

      {isModeA ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="space-y-1">
            <Label className="text-xs">Te (°C)</Label>
            <Input
              type="number"
              value={(operatingPointInput as { evap_temp_c: number }).evap_temp_c}
              onChange={(e) =>
                setOperatingPointInput({
                  ...operatingPointInput,
                  mode: "A",
                  evap_temp_c: parseFloat(e.target.value) || 0,
                } as { mode: "A"; evap_temp_c: number; cond_temp_c: number })
              }
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Tc (°C)</Label>
            <Input
              type="number"
              value={(operatingPointInput as { cond_temp_c: number }).cond_temp_c}
              onChange={(e) =>
                setOperatingPointInput({
                  ...operatingPointInput,
                  mode: "A",
                  cond_temp_c: parseFloat(e.target.value) || 0,
                } as { mode: "A"; evap_temp_c: number; cond_temp_c: number })
              }
              className="h-8 text-sm"
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="space-y-1">
            <Label className="text-xs">T_câmara (°C)</Label>
            <Input
              type="number"
              value={(operatingPointInput as { room_temp_c: number }).room_temp_c}
              onChange={(e) =>
                setOperatingPointInput({
                  ...operatingPointInput,
                  mode: "B",
                  room_temp_c: parseFloat(e.target.value) || 0,
                } as { mode: "B"; room_temp_c: number; ambient_temp_c: number })
              }
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">T_ambiente (°C)</Label>
            <Input
              type="number"
              value={(operatingPointInput as { ambient_temp_c: number }).ambient_temp_c}
              onChange={(e) =>
                setOperatingPointInput({
                  ...operatingPointInput,
                  mode: "B",
                  ambient_temp_c: parseFloat(e.target.value) || 0,
                } as { mode: "B"; room_temp_c: number; ambient_temp_c: number })
              }
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">ΔT evap (K)</Label>
            <Input
              type="number"
              defaultValue={10}
              onChange={(e) =>
                setOperatingPointInput({
                  ...operatingPointInput,
                  mode: "B",
                  dt_evap_k: parseFloat(e.target.value) || 10,
                } as { mode: "B"; room_temp_c: number; ambient_temp_c: number; dt_evap_k: number })
              }
              className="h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">ΔT cond (K)</Label>
            <Input
              type="number"
              defaultValue={15}
              onChange={(e) =>
                setOperatingPointInput({
                  ...operatingPointInput,
                  mode: "B",
                  dt_cond_k: parseFloat(e.target.value) || 15,
                } as { mode: "B"; room_temp_c: number; ambient_temp_c: number; dt_cond_k: number })
              }
              className="h-8 text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
