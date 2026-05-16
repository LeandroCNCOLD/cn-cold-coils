/**
 * ResultDrillDown — U4
 *
 * Wrap a result value to make it click-to-expand, revealing detailed
 * thermal breakdown: U_overall, NTU, h_ar, h_fluido, LMTD.
 */
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export interface ThermalDetail {
  label: string;
  value: string | number;
  unit?: string;
  note?: string;
}

interface ResultDrillDownProps {
  label: string;
  value: string;
  details: ThermalDetail[];
  accent?: string;
}

function DetailRow({ d }: { d: ThermalDetail }) {
  const formatted = typeof d.value === "number"
    ? Number.isFinite(d.value) ? d.value.toFixed(2) : "—"
    : d.value;
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-slate-100 py-1 text-[11px] last:border-0">
      <span className="text-slate-500">
        {d.label}
        {d.note && <span className="ml-1 text-slate-400">({d.note})</span>}
      </span>
      <span className="font-mono text-slate-700">
        {formatted}{d.unit ? ` ${d.unit}` : ""}
      </span>
    </div>
  );
}

export function ResultDrillDown({ label, value, details, accent }: ResultDrillDownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded border border-slate-100 bg-slate-50/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left hover:bg-slate-100/60 transition-colors"
      >
        <span className="text-xs text-slate-500">{label}</span>
        <div className="flex items-center gap-1.5">
          <span className={`font-mono text-sm font-semibold ${accent ?? "text-slate-800"}`}>
            {value}
          </span>
          {open
            ? <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            : <ChevronRight className="h-3.5 w-3.5 text-slate-400" />}
        </div>
      </button>
      {open && (
        <div className="border-t border-slate-100 bg-white px-3 py-2">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Detalhamento
          </p>
          {details.map((d, i) => <DetailRow key={i} d={d} />)}
        </div>
      )}
    </div>
  );
}
