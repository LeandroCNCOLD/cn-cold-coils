import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";

type FlexibleNumberInputProps = Omit<
  ComponentProps<typeof Input>,
  "type" | "value" | "onChange" | "min" | "max"
> & {
  value: number | null | undefined;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  allowNegative?: boolean;
};

function formatNumber(value: number | null | undefined) {
  return Number.isFinite(value) ? String(value) : "";
}

function parseDraft(value: string) {
  return Number.parseFloat(value.replace(",", "."));
}

function clamp(value: number, min?: number, max?: number) {
  let next = value;
  if (min !== undefined) next = Math.max(min, next);
  if (max !== undefined) next = Math.min(max, next);
  return next;
}

export function FlexibleNumberInput({
  value,
  onValueChange,
  min,
  max,
  allowNegative = true,
  onBlur,
  onFocus,
  ...props
}: FlexibleNumberInputProps) {
  const [draft, setDraft] = useState(() => formatNumber(value));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) setDraft(formatNumber(value));
  }, [isEditing, value]);

  const pattern = allowNegative ? /^-?\d*(?:[.,]\d*)?$/ : /^\d*(?:[.,]\d*)?$/;

  return (
    <Input
      {...props}
      type="text"
      inputMode="decimal"
      value={draft}
      onFocus={(event) => {
        setIsEditing(true);
        onFocus?.(event);
      }}
      onChange={(event) => {
        const nextDraft = event.target.value;
        if (!pattern.test(nextDraft)) return;
        setDraft(nextDraft);

        const parsed = parseDraft(nextDraft);
        if (Number.isFinite(parsed)) {
          onValueChange(clamp(parsed, min, max));
        }
      }}
      onBlur={(event) => {
        setIsEditing(false);
        const parsed = parseDraft(draft);
        if (Number.isFinite(parsed)) {
          const nextValue = clamp(parsed, min, max);
          setDraft(String(nextValue));
          onValueChange(nextValue);
        } else {
          setDraft(formatNumber(value));
        }
        onBlur?.(event);
      }}
    />
  );
}