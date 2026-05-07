// Utilitários para o catálogo combinado de ventiladores
// (31 modelos legados + 69 ZIEHL-ABEGG = 100 modelos)
import type { FanModel, FanCurvePoint } from './fanCatalogTypes';
import { FAN_CATALOG } from './fanCatalog';
import { FAN_CATALOG_ZIEHL } from './fanCatalogZiehl';

/** Catálogo completo: 31 modelos legados + 69 ZIEHL-ABEGG = 100 modelos */
export const ALL_FAN_CATALOG: FanModel[] = [...FAN_CATALOG, ...FAN_CATALOG_ZIEHL];

/**
 * Retorna os pontos da curva ativa para cálculo.
 * Usa curve_sets[0] (curva I, velocidade máxima) se disponível;
 * caso contrário usa curve_points (compatibilidade retroativa).
 */
export function getActiveCurvePoints(fan: FanModel): FanCurvePoint[] {
  return fan.curve_sets?.[0]?.points ?? fan.curve_points;
}

/** Interpola pressão estática para uma dada vazão na curva I */
export function interpolatePressure(fan: FanModel, q_m3h: number): number {
  const pts = getActiveCurvePoints(fan);
  if (!pts || pts.length < 2) return fan.dp_max_pa;
  if (q_m3h <= pts[0].q_m3h) return pts[0].psf_pa;
  if (q_m3h >= pts[pts.length - 1].q_m3h) return 0;
  for (let i = 0; i < pts.length - 1; i++) {
    if (q_m3h >= pts[i].q_m3h && q_m3h <= pts[i + 1].q_m3h) {
      const t = (q_m3h - pts[i].q_m3h) / (pts[i + 1].q_m3h - pts[i].q_m3h);
      return pts[i].psf_pa + t * (pts[i + 1].psf_pa - pts[i].psf_pa);
    }
  }
  return 0;
}

/** Interpola potência para uma dada vazão na curva I */
export function interpolatePower(fan: FanModel, q_m3h: number): number {
  const pts = getActiveCurvePoints(fan).filter(p => p.p1_w != null);
  if (!pts || pts.length < 2) return fan.p1_nominal_w;
  if (q_m3h <= pts[0].q_m3h) return pts[0].p1_w!;
  if (q_m3h >= pts[pts.length - 1].q_m3h) return pts[pts.length - 1].p1_w!;
  for (let i = 0; i < pts.length - 1; i++) {
    if (q_m3h >= pts[i].q_m3h && q_m3h <= pts[i + 1].q_m3h) {
      const t = (q_m3h - pts[i].q_m3h) / (pts[i + 1].q_m3h - pts[i].q_m3h);
      return pts[i].p1_w! + t * (pts[i + 1].p1_w! - pts[i].p1_w!);
    }
  }
  return fan.p1_nominal_w;
}

/** Encontra o ponto de operação: interseção curva do ventilador × curva do sistema (ΔP = R×Q²) */
export function findOperatingPoint(
  fan: FanModel,
  systemResistance: number
): { q_m3h: number; psf_pa: number; p1_w: number } | null {
  const pts = getActiveCurvePoints(fan);
  if (!pts || pts.length < 2) return null;
  for (let i = 0; i < pts.length - 1; i++) {
    const q1 = pts[i].q_m3h, q2 = pts[i + 1].q_m3h;
    const dp1 = pts[i].psf_pa, dp2 = pts[i + 1].psf_pa;
    const sys1 = systemResistance * q1 * q1, sys2 = systemResistance * q2 * q2;
    if ((dp1 - sys1) * (dp2 - sys2) <= 0) {
      const t = (dp1 - sys1) / ((sys2 - sys1) - (dp2 - dp1));
      const q_op = q1 + t * (q2 - q1);
      const dp_op = dp1 + t * (dp2 - dp1);
      return { q_m3h: q_op, psf_pa: dp_op, p1_w: interpolatePower(fan, q_op) };
    }
  }
  return null;
}

/** Filtra ventiladores por diâmetro, fabricante, família e/ou requisitos mínimos */
export function filterFans(opts: {
  diameter_mm?: number;
  manufacturer?: string;
  family?: string;
  motor_technology?: string;
  min_q_m3h?: number;
  min_dp_pa?: number;
  curve_available?: boolean;
}): FanModel[] {
  return ALL_FAN_CATALOG.filter(f => {
    if (opts.diameter_mm && f.diameter_mm !== opts.diameter_mm) return false;
    if (opts.manufacturer && !f.manufacturer.toLowerCase().includes(opts.manufacturer.toLowerCase())) return false;
    if (opts.family && f.family !== opts.family) return false;
    if (opts.motor_technology && f.motor_technology !== opts.motor_technology) return false;
    if (opts.min_q_m3h && f.q_max_m3h < opts.min_q_m3h) return false;
    if (opts.min_dp_pa && f.dp_max_pa < opts.min_dp_pa) return false;
    if (opts.curve_available !== undefined && f.curve_available !== opts.curve_available) return false;
    return true;
  });
}

/** Seleciona o ventilador mais adequado para um ponto de operação */
export function selectFan(q_m3h: number, dp_pa: number): FanModel | null {
  const candidates = ALL_FAN_CATALOG.filter(f =>
    f.q_max_m3h >= q_m3h * 1.1 && f.dp_max_pa >= dp_pa * 1.1
  );
  if (!candidates.length) return null;
  return candidates.sort((a, b) => a.diameter_mm - b.diameter_mm)[0];
}

/** Agrupa ventiladores por família para exibição no picker */
export function groupFansByFamily(fans: FanModel[]): Record<string, FanModel[]> {
  const groups: Record<string, FanModel[]> = {};
  for (const fan of fans) {
    const key = fan.family || fan.manufacturer;
    if (!groups[key]) groups[key] = [];
    groups[key].push(fan);
  }
  return groups;
}
