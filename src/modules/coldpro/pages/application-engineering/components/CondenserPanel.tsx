/**
 * CondenserPanel.tsx — reaproveita o EvaporatorPanel em modo "condenser".
 * Aplica a MESMA lógica multi-critério: catálogo de geometrias filtrado por
 * Condensação, sugestão de ventilador, ΔT alvo (Tc − T_ar), capacidade de
 * condensação = Q_frigorífica + W_compressor.
 */
import { EvaporatorPanel } from "./EvaporatorPanel";

export function CondenserPanel() {
  return <EvaporatorPanel mode="condenser" />;
}
