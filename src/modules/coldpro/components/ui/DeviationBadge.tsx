import { Badge } from "@/components/ui/badge";

interface DeviationBadgeProps {
  actual: number;
  reference: number;
  unit?: string;
  label?: string;
  inverseGood?: boolean;
  className?: string;
}

function deviationClass(pct: number, inverseGood: boolean): string {
  const abs = Math.abs(pct);
  const good = inverseGood ? pct < 0 : pct >= 0;
  if (abs <= 5) return "border-emerald-300 bg-emerald-50 text-emerald-700";
  if (abs <= 15) return "border-amber-300 bg-amber-50 text-amber-700";
  if (good) return "border-blue-300 bg-blue-50 text-blue-700";
  return "border-red-300 bg-red-50 text-red-700";
}

function trafficLight(pct: number): string {
  const abs = Math.abs(pct);
  if (abs <= 5) return "🟢";
  if (abs <= 15) return "🟡";
  return "🔴";
}

export function DeviationBadge({
  actual,
  reference,
  unit = "",
  label,
  inverseGood = false,
  className = "",
}: DeviationBadgeProps) {
  if (!Number.isFinite(actual) || !Number.isFinite(reference) || reference === 0) {
    return <Badge variant="outline" className={`text-[10px] text-slate-400 ${className}`}>—</Badge>;
  }

  const pct = ((actual - reference) / reference) * 100;
  const sign = pct >= 0 ? "+" : "";
  const cls = deviationClass(pct, inverseGood);

  return (
    <Badge
      variant="outline"
      className={`gap-1 text-[10px] ${cls} ${className}`}
      title={`${label ?? "Desvio"}: ${actual.toFixed(2)} ${unit} vs ${reference.toFixed(2)} ${unit} referência`}
    >
      {trafficLight(pct)} {sign}{pct.toFixed(1)}%
    </Badge>
  );
}

export function DeviationRow({
  label,
  actual,
  reference,
  unit = "",
  inverseGood = false,
}: {
  label: string;
  actual: number | undefined | null;
  reference: number | undefined | null;
  unit?: string;
  inverseGood?: boolean;
}) {
  const a = actual ?? NaN;
  const r = reference ?? NaN;
  return (
    <div className="flex items-center justify-between gap-2 rounded border border-slate-100 bg-slate-50/40 px-2 py-1.5 text-xs">
      <span className="text-slate-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-mono text-slate-800">
          {Number.isFinite(a) ? `${a.toFixed(1)} ${unit}` : "—"}
        </span>
        <DeviationBadge actual={a} reference={r} unit={unit} label={label} inverseGood={inverseGood} />
      </div>
    </div>
  );
}
