import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FlaskConical } from "lucide-react";
import type { CatalogEquipmentRow } from "@/modules/coldpro_catalog/data/equipmentCatalog.types";
import { useTestHubStore } from "../stores/useTestHubStore";

interface Props {
  machine: CatalogEquipmentRow;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm";
  className?: string;
}

export function SendToHubButton({ machine, variant = "outline", size = "sm", className }: Props) {
  const setMachine = useTestHubStore((s) => s.setMachine);
  const navigate = useNavigate();

  function handleClick() {
    setMachine(machine, {
      label: machine.modeloBaseReferencia ?? machine.modelo ?? machine.id,
      source: "catalog",
      detail: machine.linha?.replace(/\[.*?\]/, "").trim(),
    });
    navigate({ to: "/coldpro/hub-de-testes" });
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`gap-1.5 ${className ?? ""}`}
      title="Abrir esta máquina no Hub de Testes"
    >
      <FlaskConical className="h-3.5 w-3.5" />
      <span>Hub</span>
    </Button>
  );
}
