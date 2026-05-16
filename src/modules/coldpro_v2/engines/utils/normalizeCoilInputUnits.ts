/**
 * normalizeCoilInputUnits — C3
 *
 * CoilAdvancedInput has historically mixed _mm and _m variants for the same
 * geometric field.  Callers sometimes set only the _mm variant; the iterative
 * and coupled solvers read the _m variant and default to a fallback value if
 * the _m field is null.  This utility fills in the _m fields from the _mm
 * fields when the _m fields are absent, preventing silent precision loss.
 *
 * Call this at any solver entry-point that accepts CoilAdvancedInput before
 * passing the object downstream.
 */
import type { CoilAdvancedInput } from "../../domain/types";

export function normalizeCoilInputUnits(input: CoilAdvancedInput): CoilAdvancedInput {
  const out = { ...input };

  // fin_thickness: solvers read fin_thickness_m; callers may only set fin_thickness_mm
  if ((out.fin_thickness_m == null) && out.fin_thickness_mm != null) {
    out.fin_thickness_m = out.fin_thickness_mm / 1000;
  }

  // tube diameters: prefer explicit _m fields; derive from _mm when absent
  if (out.tube_inner_diameter_m == null && out.tube_diameter_mm != null && out.tube_thickness_mm != null) {
    out.tube_inner_diameter_m = Math.max((out.tube_diameter_mm - 2 * out.tube_thickness_mm) / 1000, 0.001);
  }
  if (out.tube_outer_diameter_m == null && out.tube_diameter_mm != null) {
    out.tube_outer_diameter_m = out.tube_diameter_mm / 1000;
  }

  // tube length: derive from rows × length_mm when tube_length_m is absent
  if (out.tube_length_m == null && out.length_mm != null && out.length_mm > 0) {
    out.tube_length_m = out.length_mm / 1000;
  }

  return out;
}
