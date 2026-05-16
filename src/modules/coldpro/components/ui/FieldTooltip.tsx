/**
 * FieldTooltip — U6
 *
 * Shows an inline ⓘ icon next to a label; hover/focus reveals an explanation
 * of the technical field. Uses only HTML title for zero-dependency tooltip,
 * keeping the bundle lean.
 */
import { HelpCircle } from "lucide-react";

interface FieldTooltipProps {
  text: string;
  className?: string;
}

export function FieldTooltip({ text, className = "" }: FieldTooltipProps) {
  return (
    <span
      title={text}
      aria-label={text}
      className={`ml-1 inline-flex cursor-help items-center text-slate-400 hover:text-slate-600 ${className}`}
    >
      <HelpCircle className="h-3 w-3" />
    </span>
  );
}

/** Convenience: label + tooltip in one line */
export function LabelWithTooltip({
  label,
  tooltip,
  className = "",
}: {
  label: string;
  tooltip: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      {label}
      <FieldTooltip text={tooltip} />
    </span>
  );
}
