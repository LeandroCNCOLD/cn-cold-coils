import { evalPoly10 } from "@/modules/coldpro_catalog/engines/compressorSelector";
import { KCALH_PER_KW } from "@/lib/physicalConstants";

export interface CommercialTableRow {
  te_c: number;
  q_kw: number;
  q_kcalh: number;
  w_comp_kw: number;
  cop: number;
}

export interface CommercialTableByAmbient {
  t_amb_c: number;
  tc_c: number;
  rows: CommercialTableRow[];
}

export function generateCommercialTable(
  capCoeffs: number[],
  pwrCoeffs: number[],
  teRange: { min: number; max: number; step: number },
  tAmbList: number[],
  deltaTc = 10,
): CommercialTableByAmbient[] {
  if (capCoeffs.length < 10 || pwrCoeffs.length < 10) return [];

  return tAmbList.map((t_amb_c) => {
    const tc_c = t_amb_c + deltaTc;
    const rows: CommercialTableRow[] = [];

    for (let te = teRange.min; te <= teRange.max + 0.001; te += teRange.step) {
      const te_rounded = Math.round(te * 10) / 10;
      const q_kw = evalPoly10(capCoeffs, te_rounded, tc_c);
      const w_kw = evalPoly10(pwrCoeffs, te_rounded, tc_c);
      if (q_kw <= 0 || w_kw <= 0) continue;
      rows.push({
        te_c: te_rounded,
        q_kw: Math.round(q_kw * 100) / 100,
        q_kcalh: Math.round(q_kw * KCALH_PER_KW),
        w_comp_kw: Math.round(w_kw * 100) / 100,
        cop: Math.round((q_kw / w_kw) * 100) / 100,
      });
    }

    return { t_amb_c, tc_c, rows };
  });
}
