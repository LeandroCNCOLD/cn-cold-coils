/**
 * MachineComparisonTabContent — Comparação de Máquinas
 *
 * Quando a otimização detecta problemas, sugere alternativas do catálogo:
 * - Máquinas com maior capacidade (mesma família/aplicação)
 * - Máquinas com melhor COP estimado
 * - Comparação tabular e gráfico de radar
 *
 * Referências:
 * - AHRI Standard 540 (2020) — Compressor Performance Ratings
 */
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, Legend,
} from "recharts";
import type { CatalogEquipmentRow } from "@/modules/coldpro_catalog/data/equipmentCatalog.types";
import type { CompressorSpec } from "@/modules/coldpro_v2";
import { getEquipmentCatalog } from "@/modules/coldpro_catalog/data/equipmentCatalog.index";

interface Props {
  machine: CatalogEquipmentRow | null;
  compressor: Partial<CompressorSpec>;
}

interface ComparisonMachine {
  row: CatalogEquipmentRow;
  capacity_W: number;
  power_W: number;
  COP: number;
  capacity_delta_pct: number;
  power_delta_pct: number;
  COP_delta_pct: number;
  score: number;
  recommendation: string;
}

const KCALH_TO_W = 1.163;

export function MachineComparisonTabContent({ machine, compressor }: Props) {
  const [selectedAlt, setSelectedAlt] = useState<string | null>(null);

  const { current, alternatives } = useMemo(() => {
    if (!machine) return { current: null, alternatives: [] };

    const catalog = getEquipmentCatalog();
    const Q_curr = (machine.capacidadeFrigorificaKcalH ?? 0) * KCALH_TO_W;
    const W_curr = (machine.potenciaEletricaKw ?? 0) * 1000;
    const COP_curr = W_curr > 0 ? Q_curr / W_curr : 0;

    // Filtrar máquinas da mesma aplicação e refrigerante
    const candidates = catalog.filter(
      (r) =>
        r.id !== machine.id &&
        r.application === machine.application &&
        r.refrigerante === machine.refrigerante &&
        r.capacidadeFrigorificaKcalH != null &&
        r.potenciaEletricaKw != null &&
        r.capacidadeFrigorificaKcalH > 0 &&
        r.potenciaEletricaKw > 0,
    );

    // Calcular score de alternativa
    const alts: ComparisonMachine[] = candidates
      .map((r) => {
        const Q = (r.capacidadeFrigorificaKcalH ?? 0) * KCALH_TO_W;
        const W = (r.potenciaEletricaKw ?? 0) * 1000;
        const COP = W > 0 ? Q / W : 0;
        const cap_delta = Q_curr > 0 ? ((Q - Q_curr) / Q_curr) * 100 : 0;
        const pow_delta = W_curr > 0 ? ((W - W_curr) / W_curr) * 100 : 0;
        const cop_delta = COP_curr > 0 ? ((COP - COP_curr) / COP_curr) * 100 : 0;

        // Score: prioriza COP melhor e capacidade próxima (±30%)
        const score = cop_delta * 0.4 + Math.max(0, cap_delta) * 0.3 - Math.abs(cap_delta) * 0.1;

        let recommendation = "";
        if (cap_delta > 10 && cop_delta > 5) recommendation = "Maior capacidade e eficiência";
        else if (cap_delta > 10) recommendation = "Maior capacidade";
        else if (cop_delta > 5) recommendation = "Melhor eficiência";
        else if (cap_delta < -10) recommendation = "Menor capacidade (redimensionamento)";
        else recommendation = "Alternativa equivalente";

        return { row: r, capacity_W: Q, power_W: W, COP, capacity_delta_pct: cap_delta, power_delta_pct: pow_delta, COP_delta_pct: cop_delta, score, recommendation };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    const current: ComparisonMachine = {
      row: machine,
      capacity_W: Q_curr,
      power_W: W_curr,
      COP: COP_curr,
      capacity_delta_pct: 0,
      power_delta_pct: 0,
      COP_delta_pct: 0,
      score: 0,
      recommendation: "Máquina atual",
    };

    return { current, alternatives: alts };
  }, [machine, compressor]);

  const selectedMachine = alternatives.find((a) => a.row.id === selectedAlt) ?? alternatives[0];

  const radarData = useMemo(() => {
    if (!current || !selectedMachine) return [];
    const maxQ = Math.max(current.capacity_W, selectedMachine.capacity_W);
    const maxW = Math.max(current.power_W, selectedMachine.power_W);
    const maxCOP = Math.max(current.COP, selectedMachine.COP);
    return [
      { subject: "Capacidade", current: (current.capacity_W / maxQ) * 100, alt: (selectedMachine.capacity_W / maxQ) * 100 },
      { subject: "COP", current: (current.COP / maxCOP) * 100, alt: (selectedMachine.COP / maxCOP) * 100 },
      { subject: "Eficiência", current: 100 - (current.power_W / maxW) * 100, alt: 100 - (selectedMachine.power_W / maxW) * 100 },
      { subject: "Cap/Pot", current: (current.capacity_W / Math.max(1, current.power_W)) * 10, alt: (selectedMachine.capacity_W / Math.max(1, selectedMachine.power_W)) * 10 },
    ];
  }, [current, selectedMachine]);

  if (!machine || !current) {
    return (
      <div className="cn-card p-4 flex items-center justify-center p-8">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Selecione uma máquina do catálogo para ver alternativas.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Máquina atual */}
      <div className="cn-card p-4" style={{ borderColor: "rgba(30,111,217,0.3)" }}>
        <div className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--ice-400)" }}>Máquina Atual: {machine.modelo}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{machine.application} · {machine.refrigerante} · {machine.linha ?? "—"}</p>
            </div>
            <span className="cn-badge cn-badge--info">Referência</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Capacidade</p>
            <p className="text-base font-bold font-mono" style={{ color: "var(--text-primary)" }}>{(current.capacity_W / 1000).toFixed(2)} kW</p>
            <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>{(machine.capacidadeFrigorificaKcalH ?? 0).toFixed(0)} kcal/h</p>
          </div>
          <div>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>Potência</p>
            <p className="text-base font-bold font-mono" style={{ color: "var(--text-primary)" }}>{(current.power_W / 1000).toFixed(2)} kW</p>
          </div>
          <div>
            <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>COP Estimado</p>
            <p className="text-base font-bold font-mono" style={{ color: "var(--color-success)" }}>{current.COP.toFixed(3)}</p>
          </div>
        </div>
      </div>

      {alternatives.length === 0 ? (
        <div className="cn-card p-4 flex items-center justify-center p-8">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Nenhuma alternativa encontrada para a mesma aplicação e refrigerante.</p>
        </div>
      ) : (
        <>
          {/* Grid de alternativas */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {alternatives.map((alt, i) => (
              <div
                key={alt.row.id}
                className="cn-card p-4 cursor-pointer transition-all hover:shadow-md"
                style={selectedAlt === alt.row.id ? { borderColor: "var(--ice-400)" } : { borderColor: "var(--border-subtle)" }}
                onClick={() => setSelectedAlt(alt.row.id)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{alt.row.modelo}</p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{alt.row.application} · {alt.row.refrigerante}</p>
                  </div>
                  {i === 0 && (
                    <span className="cn-badge" style={{ background: "#f59e0b", color: "#fff", fontSize: "10px" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "2px" }}>
                        <Star className="h-2.5 w-2.5" />Top
                      </span>
                    </span>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-3 gap-1 text-center">
                  <div>
                    <p className="text-[9px]" style={{ color: "var(--text-muted)" }}>Capacidade</p>
                    <p className="text-[11px] font-bold font-mono" style={{ color: alt.capacity_delta_pct > 0 ? "var(--color-success)" : "var(--color-error)" }}>
                      {alt.capacity_delta_pct > 0 ? "+" : ""}{alt.capacity_delta_pct.toFixed(0)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px]" style={{ color: "var(--text-muted)" }}>Potência</p>
                    <p className="text-[11px] font-bold font-mono" style={{ color: alt.power_delta_pct < 0 ? "var(--color-success)" : "#f59e0b" }}>
                      {alt.power_delta_pct > 0 ? "+" : ""}{alt.power_delta_pct.toFixed(0)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px]" style={{ color: "var(--text-muted)" }}>COP</p>
                    <p className="text-[11px] font-bold font-mono" style={{ color: alt.COP_delta_pct > 0 ? "var(--color-success)" : "var(--color-error)" }}>
                      {alt.COP_delta_pct > 0 ? "+" : ""}{alt.COP_delta_pct.toFixed(0)}%
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-[10px]" style={{ color: "var(--text-muted)" }}>{alt.recommendation}</p>
              </div>
            ))}
          </div>

          {/* Comparação detalhada */}
          {selectedMachine && (
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="cn-card p-4">
                <div className="pb-2">
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Comparação: {machine.modelo} vs {selectedMachine.row.modelo}</p>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="var(--border-subtle)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "var(--text-secondary)" }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: "var(--text-muted)" }} />
                    <Radar name="Atual" dataKey="current" stroke="var(--text-muted)" fill="var(--text-muted)" fillOpacity={0.2} />
                    <Radar name={selectedMachine.row.modelo} dataKey="alt" stroke="var(--ice-400)" fill="var(--ice-400)" fillOpacity={0.3} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Tooltip formatter={(v: number) => [`${v.toFixed(0)}%`, ""]} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="cn-card p-4">
                <div className="pb-2">
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Tabela Comparativa</p>
                </div>
                <div className="p-0 -mx-4 -mb-4">
                  <table className="w-full text-xs">
                    <thead className="text-[10px] uppercase" style={{ background: "var(--bg-800)", color: "var(--text-muted)" }}>
                      <tr>
                        <th className="px-3 py-2 text-left">Parâmetro</th>
                        <th className="px-3 py-2 text-right">Atual</th>
                        <th className="px-3 py-2 text-right">Alternativa</th>
                        <th className="px-3 py-2 text-right">Δ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Capacidade", curr: `${(current.capacity_W / 1000).toFixed(2)} kW`, alt: `${(selectedMachine.capacity_W / 1000).toFixed(2)} kW`, delta: `${selectedMachine.capacity_delta_pct > 0 ? "+" : ""}${selectedMachine.capacity_delta_pct.toFixed(0)}%`, positive: selectedMachine.capacity_delta_pct > 0 },
                        { label: "Potência", curr: `${(current.power_W / 1000).toFixed(2)} kW`, alt: `${(selectedMachine.power_W / 1000).toFixed(2)} kW`, delta: `${selectedMachine.power_delta_pct > 0 ? "+" : ""}${selectedMachine.power_delta_pct.toFixed(0)}%`, positive: selectedMachine.power_delta_pct < 0 },
                        { label: "COP", curr: current.COP.toFixed(3), alt: selectedMachine.COP.toFixed(3), delta: `${selectedMachine.COP_delta_pct > 0 ? "+" : ""}${selectedMachine.COP_delta_pct.toFixed(0)}%`, positive: selectedMachine.COP_delta_pct > 0 },
                        { label: "Refrigerante", curr: machine.refrigerante, alt: selectedMachine.row.refrigerante, delta: machine.refrigerante === selectedMachine.row.refrigerante ? "Igual" : "Diferente", positive: machine.refrigerante === selectedMachine.row.refrigerante },
                        { label: "Aplicação", curr: machine.application, alt: selectedMachine.row.application, delta: "—", positive: true },
                      ].map(({ label, curr, alt, delta, positive }) => (
                        <tr key={label} className="border-t" style={{ borderColor: "var(--border-subtle)" }}>
                          <td className="px-3 py-2 font-medium" style={{ color: "var(--text-secondary)" }}>{label}</td>
                          <td className="px-3 py-2 text-right font-mono" style={{ color: "var(--text-secondary)" }}>{curr}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold" style={{ color: "var(--text-primary)" }}>{alt}</td>
                          <td className="px-3 py-2 text-right font-mono font-bold" style={{ color: positive ? "var(--color-success)" : "var(--color-error)" }}>{delta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
