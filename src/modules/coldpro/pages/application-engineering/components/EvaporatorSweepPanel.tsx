/**
 * EvaporatorSweepPanel
 *
 * Painel de Varredura do Evaporador.
 * Permite ao engenheiro configurar:
 *  - Capacidade requerida (do ponto de projeto)
 *  - Te, T_ar_in, ΔT máximo
 *  - Geometrias a varrer (CN Lantery)
 *  - Ranges de fileiras, tubos, comprimento, passo de aleta
 *
 * Exibe:
 *  - Tabela de candidatos ordenados por score
 *  - Melhor seleção destacada
 *  - Botão para confirmar seleção e passar para o condensador
 */

import { useState, useMemo } from "react";
import { sweepEvaporator } from "../services/coilSelectionService";
import type {
  EvaporatorSweepConfig,
  EvaporatorSweepCandidate,
  CoilGeometryCandidate,
} from "../services/coilSelectionService";

// ── Geometrias CN Lantery disponíveis ────────────────────────────────────────

const CN_LANTERY_EVAP_GEOMETRIES: CoilGeometryCandidate[] = [
  {
    id: "133228",
    name: "CN Lantery 133228 — D_o=13.3mm, Pt=28mm, Pl=25mm",
    tube_od_mm: 13.3,
    tube_id_mm: 11.5,
    pitch_transverse_mm: 28,
    pitch_longitudinal_mm: 25,
    fin_thickness_mm: 0.12,
  },
  {
    id: "133225",
    name: "CN Lantery 133225 — D_o=13.3mm, Pt=25mm, Pl=22mm",
    tube_od_mm: 13.3,
    tube_id_mm: 11.5,
    pitch_transverse_mm: 25,
    pitch_longitudinal_mm: 22,
    fin_thickness_mm: 0.12,
  },
  {
    id: "102522",
    name: "CN Lantery 102522 — D_o=10.3mm, Pt=25mm, Pl=22mm",
    tube_od_mm: 10.3,
    tube_id_mm: 8.8,
    pitch_transverse_mm: 25,
    pitch_longitudinal_mm: 22,
    fin_thickness_mm: 0.10,
  },
];

// ── Props ────────────────────────────────────────────────────────────────────

interface Props {
  /** Capacidade frigorífica requerida [W] — vem do ponto de projeto */
  required_capacity_w: number;
  /** Temperatura de evaporação [°C] */
  te_c: number;
  /** Callback quando uma configuração é selecionada */
  onSelected?: (candidate: EvaporatorSweepCandidate) => void;
}

// ── Componente ───────────────────────────────────────────────────────────────

export function EvaporatorSweepPanel({ required_capacity_w, te_c, onSelected }: Props) {
  const [airInletTemp, setAirInletTemp] = useState(te_c + 7);
  const [deltaTMax, setDeltaTMax] = useState(7);
  const [airflow, setAirflow] = useState(2000);
  const [selectedGeomIds, setSelectedGeomIds] = useState<string[]>(["133228"]);
  const [rowsMin, setRowsMin] = useState(2);
  const [rowsMax, setRowsMax] = useState(6);
  const [tubesMin, setTubesMin] = useState(8);
  const [tubesMax, setTubesMax] = useState(16);
  const [lengthMin, setLengthMin] = useState(800);
  const [lengthMax, setLengthMax] = useState(2000);
  const [finSpacingMin, setFinSpacingMin] = useState(4);
  const [finSpacingMax, setFinSpacingMax] = useState(8);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof sweepEvaporator> | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<EvaporatorSweepCandidate | null>(null);

  const selectedGeoms = CN_LANTERY_EVAP_GEOMETRIES.filter((g) => selectedGeomIds.includes(g.id));

  const rangeArray = (min: number, max: number, step: number) => {
    const arr: number[] = [];
    for (let v = min; v <= max; v += step) arr.push(v);
    return arr.length > 0 ? arr : [min];
  };

  const runSweep = () => {
    setIsRunning(true);
    setTimeout(() => {
      const config: EvaporatorSweepConfig = {
        required_capacity_w,
        te_c,
        air_inlet_temp_c: airInletTemp,
        air_rh_in: 0.85,
        airflow_m3h: airflow,
        delta_t_max_k: deltaTMax,
        geometries: selectedGeoms,
        rows_to_test: rangeArray(rowsMin, rowsMax, 1),
        tubes_per_row_to_test: rangeArray(tubesMin, tubesMax, 2),
        lengths_to_test_mm: rangeArray(lengthMin, lengthMax, 200),
        fin_spacings_to_test_mm: rangeArray(finSpacingMin, finSpacingMax, 1),
      };
      const res = sweepEvaporator(config);
      setResult(res);
      setIsRunning(false);
    }, 50);
  };

  const handleSelect = (c: EvaporatorSweepCandidate) => {
    setSelectedCandidate(c);
    onSelected?.(c);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Varredura do Evaporador</h3>
        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
          Q_req = {(required_capacity_w / 1000).toFixed(2)} kW
        </span>
      </div>

      {/* Condições de operação */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Condições de Operação</div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Te (°C)</label>
            <input type="number" value={te_c} readOnly className="w-full rounded border border-slate-200 bg-slate-100 px-2 py-1.5 text-sm text-slate-500" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">T_ar_entrada (°C)</label>
            <input type="number" value={airInletTemp} onChange={(e) => setAirInletTemp(parseFloat(e.target.value) || -23)} className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">ΔT máx. (K)</label>
            <input type="number" value={deltaTMax} onChange={(e) => setDeltaTMax(parseFloat(e.target.value) || 7)} className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Vazão de ar (m³/h)</label>
            <input type="number" value={airflow} onChange={(e) => setAirflow(parseFloat(e.target.value) || 2000)} className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none" />
          </div>
        </div>
      </div>

      {/* Geometrias */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Geometrias CN Lantery</div>
        <div className="space-y-2">
          {CN_LANTERY_EVAP_GEOMETRIES.map((g) => (
            <label key={g.id} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={selectedGeomIds.includes(g.id)}
                onChange={(e) => {
                  if (e.target.checked) setSelectedGeomIds((prev) => [...prev, g.id]);
                  else setSelectedGeomIds((prev) => prev.filter((id) => id !== g.id));
                }}
                className="accent-blue-600"
              />
              <span className="text-xs text-slate-700">{g.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ranges de varredura */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Ranges de Varredura</div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Fileiras (min–máx)</label>
            <div className="flex gap-1">
              <input type="number" value={rowsMin} onChange={(e) => setRowsMin(parseInt(e.target.value) || 2)} className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
              <input type="number" value={rowsMax} onChange={(e) => setRowsMax(parseInt(e.target.value) || 6)} className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Tubos/fileira (min–máx)</label>
            <div className="flex gap-1">
              <input type="number" value={tubesMin} onChange={(e) => setTubesMin(parseInt(e.target.value) || 8)} className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
              <input type="number" value={tubesMax} onChange={(e) => setTubesMax(parseInt(e.target.value) || 16)} className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Comprimento mm (min–máx)</label>
            <div className="flex gap-1">
              <input type="number" value={lengthMin} onChange={(e) => setLengthMin(parseInt(e.target.value) || 800)} className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
              <input type="number" value={lengthMax} onChange={(e) => setLengthMax(parseInt(e.target.value) || 2000)} className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">Passo aleta mm (min–máx)</label>
            <div className="flex gap-1">
              <input type="number" value={finSpacingMin} onChange={(e) => setFinSpacingMin(parseFloat(e.target.value) || 4)} className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
              <input type="number" value={finSpacingMax} onChange={(e) => setFinSpacingMax(parseFloat(e.target.value) || 8)} className="w-full rounded border border-slate-300 px-2 py-1.5 text-xs focus:border-blue-500 focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Botão de varredura */}
      <button
        onClick={runSweep}
        disabled={isRunning || selectedGeoms.length === 0}
        className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isRunning ? "Varrendo geometrias..." : "Rodar Varredura do Evaporador"}
      </button>

      {/* Resultados */}
      {result && (
        <div className="space-y-3">
          {/* Resumo */}
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{result.qualifying_count}</div>
              <div className="text-xs text-slate-500">Atendem ΔT</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-slate-700">{result.candidates.length}</div>
              <div className="text-xs text-slate-500">Top candidatos</div>
            </div>
            {result.selected && (
              <div className="flex-1 rounded-lg border border-green-200 bg-green-50 p-2 text-xs">
                <span className="font-semibold text-green-700">Melhor seleção:</span>{" "}
                {result.selected.geometry_name} — {result.selected.rows}F × {result.selected.tubes_per_row}T × {result.selected.length_mm}mm, passo {result.selected.fin_spacing_mm}mm
                <br />
                <span className="text-green-600">Q = {(result.selected.capacity_w / 1000).toFixed(2)} kW | ΔT = {result.selected.delta_t_k.toFixed(1)} K | A = {result.selected.total_area_m2.toFixed(2)} m²</span>
              </div>
            )}
          </div>

          {/* Tabela de candidatos */}
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-xs">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-2 py-2 text-left font-semibold text-slate-600">Geometria</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">F×T×L</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">Passo</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">Área (m²)</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">Q (kW)</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">ΔT (K)</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">U (W/m²K)</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">η_fin</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">OK?</th>
                  <th className="px-2 py-2 text-center font-semibold text-slate-600">Ação</th>
                </tr>
              </thead>
              <tbody>
                {result.candidates.map((c, i) => (
                  <tr
                    key={i}
                    className={`border-t border-slate-100 ${
                      selectedCandidate === c
                        ? "bg-blue-50"
                        : i === 0 && c.meets_delta_t
                        ? "bg-green-50"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <td className="px-2 py-1.5 font-medium text-slate-700">{c.geometry_id}</td>
                    <td className="px-2 py-1.5 text-center text-slate-600">{c.rows}F×{c.tubes_per_row}T×{c.length_mm}mm</td>
                    <td className="px-2 py-1.5 text-center text-slate-600">{c.fin_spacing_mm}mm</td>
                    <td className="px-2 py-1.5 text-center font-medium">{c.total_area_m2.toFixed(2)}</td>
                    <td className="px-2 py-1.5 text-center font-medium text-blue-700">{(c.capacity_w / 1000).toFixed(2)}</td>
                    <td className={`px-2 py-1.5 text-center font-medium ${c.meets_delta_t ? "text-green-700" : "text-red-600"}`}>
                      {c.delta_t_k.toFixed(1)}
                    </td>
                    <td className="px-2 py-1.5 text-center text-slate-600">{c.u_global_w_m2k.toFixed(1)}</td>
                    <td className="px-2 py-1.5 text-center text-slate-600">{(c.fin_efficiency * 100).toFixed(0)}%</td>
                    <td className="px-2 py-1.5 text-center">
                      {c.meets_delta_t ? (
                        <span className="text-green-600">✓</span>
                      ) : (
                        <span className="text-red-500">✗</span>
                      )}
                    </td>
                    <td className="px-2 py-1.5 text-center">
                      <button
                        onClick={() => handleSelect(c)}
                        className="rounded bg-blue-600 px-2 py-0.5 text-xs font-medium text-white hover:bg-blue-700"
                      >
                        Selecionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Avisos */}
          {result.warnings.map((w, i) => (
            <div key={i} className="rounded border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs text-amber-800">
              ⚠ {w}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
