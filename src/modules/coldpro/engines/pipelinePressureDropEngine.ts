/**
 * pipelinePressureDropEngine.ts — SC4
 *
 * Calcula a queda de pressão em tubulações de sucção/descarga/líquido e o
 * impacto equivalente na temperatura de evaporação efetiva (ΔTe).
 *
 * Método: Darcy-Weisbach + Blasius (turbulento) / Poiseuille (laminar).
 * Para escoamento bifásico: correlação de Lockhart-Martinelli simplificada.
 *
 * Propriedades dos refrigerantes: tabela interna derivada de dados CoolProp
 * interpolados ao ponto de operação nominal.
 */

export type PipelineRefrigerant =
  | "R404A" | "R507A" | "R134a" | "R410A" | "R22" | "R448A" | "R449A" | "R290";

export type PipelineFluidPhase = "vapor" | "liquid" | "two_phase";

export interface PipelinePressureDropInput {
  refrigerant: PipelineRefrigerant | string;
  Te_C: number;
  pipe_diameter_mm: number;
  pipe_length_m: number;
  mass_flow_kg_h: number;
  phase: PipelineFluidPhase;
  vapor_quality?: number;
  fittings_equivalent_length_m?: number;
  pipe_roughness_mm?: number;
}

export interface PipelinePressureDropResult {
  delta_P_kPa: number;
  delta_Te_K: number;
  effective_Te_C: number;
  velocity_m_s: number;
  reynolds: number;
  friction_factor: number;
  flow_regime: "laminar" | "transitional" | "turbulent";
  mass_velocity_kg_m2s: number;
  warnings: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Propriedades aproximadas por refrigerante e temperatura
// Fonte: CoolProp 7.2 — valores interpolados a -10°C (referência)
// ─────────────────────────────────────────────────────────────────────────────

interface RefrigProps {
  rho_v_kg_m3: number;
  rho_l_kg_m3: number;
  mu_v_Pas: number;
  mu_l_Pas: number;
  P_kPa: number;
  dT_dP_K_kPa: number;
}

// Tabela: [T_C, rho_v, rho_l, mu_v, mu_l, P_kPa, dT_dP]
type RefrigTable = Array<[number, number, number, number, number, number, number]>;

const REFRIG_TABLES: Record<string, RefrigTable> = {
  R404A: [
    [-30, 14.5, 1200, 11.5e-6, 230e-6, 206, 0.135],
    [-20, 20.0, 1160, 12.0e-6, 210e-6, 265, 0.113],
    [-10, 26.5, 1115, 12.5e-6, 190e-6, 352, 0.096],
    [  0, 34.5, 1065, 13.0e-6, 170e-6, 460, 0.081],
    [ 10, 44.5, 1010, 13.5e-6, 152e-6, 595, 0.068],
    [ 20, 57.0,  950, 14.0e-6, 135e-6, 760, 0.058],
  ],
  R507A: [
    [-30, 14.0, 1215, 11.0e-6, 235e-6, 200, 0.138],
    [-20, 19.5, 1175, 11.5e-6, 215e-6, 258, 0.116],
    [-10, 26.0, 1130, 12.0e-6, 195e-6, 344, 0.098],
    [  0, 34.0, 1080, 12.5e-6, 175e-6, 450, 0.083],
    [ 10, 43.5, 1025, 13.0e-6, 157e-6, 583, 0.069],
    [ 20, 55.5,  965, 13.5e-6, 140e-6, 745, 0.059],
  ],
  R134a: [
    [-30,  7.2, 1355, 10.5e-6, 290e-6, 101, 0.182],
    [-20, 10.5, 1295, 11.0e-6, 265e-6, 133, 0.153],
    [-10, 14.4, 1265, 11.5e-6, 240e-6, 201, 0.126],
    [  0, 19.5, 1215, 12.0e-6, 215e-6, 293, 0.103],
    [ 10, 26.0, 1160, 12.5e-6, 193e-6, 415, 0.086],
    [ 20, 34.0, 1100, 13.0e-6, 172e-6, 572, 0.072],
  ],
  R410A: [
    [-30, 24.5, 1270, 12.0e-6, 220e-6, 380, 0.074],
    [-20, 33.0, 1220, 12.5e-6, 200e-6, 489, 0.062],
    [-10, 43.0, 1165, 13.0e-6, 180e-6, 681, 0.049],
    [  0, 55.5, 1105, 13.5e-6, 160e-6, 798, 0.044],
    [ 10, 71.0, 1040, 14.0e-6, 143e-6, 1033, 0.038],
    [ 20, 90.0,  970, 14.5e-6, 127e-6, 1314, 0.032],
  ],
  R22: [
    [-30,  8.5, 1285, 11.0e-6, 250e-6, 163, 0.158],
    [-20, 12.0, 1235, 11.5e-6, 228e-6, 245, 0.129],
    [-10, 16.8, 1185, 12.0e-6, 205e-6, 355, 0.106],
    [  0, 23.0, 1130, 12.5e-6, 183e-6, 498, 0.088],
    [ 10, 30.5, 1070, 13.0e-6, 163e-6, 680, 0.073],
    [ 20, 40.0, 1005, 13.5e-6, 144e-6, 910, 0.061],
  ],
  R290: [
    [-30,  6.0, 560, 7.5e-6, 180e-6, 155, 0.165],
    [-20,  8.5, 540, 8.0e-6, 160e-6, 218, 0.136],
    [-10, 11.5, 515, 8.5e-6, 145e-6, 345, 0.107],
    [  0, 15.5, 490, 9.0e-6, 130e-6, 475, 0.086],
    [ 10, 20.5, 462, 9.5e-6, 115e-6, 635, 0.070],
    [ 20, 27.0, 432, 10.0e-6, 102e-6, 838, 0.057],
  ],
};
REFRIG_TABLES["R448A"] = REFRIG_TABLES["R404A"];
REFRIG_TABLES["R449A"] = REFRIG_TABLES["R134a"];

function interpolateProps(refrigerant: string, T_C: number): RefrigProps {
  const table = REFRIG_TABLES[refrigerant] ?? REFRIG_TABLES["R404A"];
  const clampedT = Math.max(table[0][0], Math.min(table[table.length - 1][0], T_C));
  let lo = table[0], hi = table[1];
  for (let i = 0; i < table.length - 1; i++) {
    if (table[i][0] <= clampedT && table[i + 1][0] >= clampedT) {
      lo = table[i]; hi = table[i + 1]; break;
    }
  }
  const f = lo[0] === hi[0] ? 0 : (clampedT - lo[0]) / (hi[0] - lo[0]);
  const lerp = (a: number, b: number) => a + f * (b - a);
  return {
    rho_v_kg_m3: lerp(lo[1], hi[1]),
    rho_l_kg_m3: lerp(lo[2], hi[2]),
    mu_v_Pas: lerp(lo[3], hi[3]),
    mu_l_Pas: lerp(lo[4], hi[4]),
    P_kPa: lerp(lo[5], hi[5]),
    dT_dP_K_kPa: lerp(lo[6], hi[6]),
  };
}

function blasiusFrictionFactor(Re: number): number {
  if (Re < 2300) return 64 / Re;
  if (Re < 4000) return 64 / 2300;
  return 0.316 * Math.pow(Re, -0.25);
}

export function calculatePipelinePressureDrop(
  input: PipelinePressureDropInput,
): PipelinePressureDropResult {
  const warnings: string[] = [];

  const D_m = input.pipe_diameter_mm / 1000;
  const A_m2 = Math.PI * (D_m / 2) ** 2;
  const m_dot_kg_s = input.mass_flow_kg_h / 3600;
  const L_total = input.pipe_length_m + (input.fittings_equivalent_length_m ?? 0);

  const props = interpolateProps(input.refrigerant, input.Te_C);

  let rho: number;
  let mu: number;
  let phi_sq = 1.0;

  if (input.phase === "liquid") {
    rho = props.rho_l_kg_m3;
    mu = props.mu_l_Pas;
  } else if (input.phase === "two_phase") {
    const x = Math.max(0.01, Math.min(0.99, input.vapor_quality ?? 0.5));
    const rho_tp = 1 / (x / props.rho_v_kg_m3 + (1 - x) / props.rho_l_kg_m3);
    rho = rho_tp;
    mu = props.mu_v_Pas;
    const X_tt = Math.pow((1 - x) / x, 0.9) *
      Math.pow(props.rho_v_kg_m3 / props.rho_l_kg_m3, 0.5) *
      Math.pow(props.mu_l_Pas / props.mu_v_Pas, 0.1);
    phi_sq = 1 + 20 / X_tt + 1 / (X_tt * X_tt);
    warnings.push(
      "Escoamento bifásico: usando Lockhart-Martinelli simplificado (multiplicador de Chisholm). Para projetos críticos, usar correlação de Friedel."
    );
  } else {
    rho = props.rho_v_kg_m3;
    mu = props.mu_v_Pas;
  }

  const G = m_dot_kg_s / A_m2;
  const v = G / rho;
  const Re = G * D_m / mu;

  if (Re < 2300) {
    warnings.push("Escoamento laminar (Re < 2300). Verificar se a tubulação está superdimensionada.");
  } else if (Re < 4000) {
    warnings.push("Escoamento na região de transição (2300 < Re < 4000). Resultado aproximado.");
  }

  const f = blasiusFrictionFactor(Re);
  const dP_Pa = f * (L_total / D_m) * (rho * v * v / 2) * phi_sq;
  const dP_kPa = dP_Pa / 1000;

  const dTe_K = dP_kPa * props.dT_dP_K_kPa;

  if (v > 15) warnings.push(`Velocidade alta (${v.toFixed(1)} m/s). Recomendado < 12 m/s na sucção.`);
  if (v < 2 && input.phase !== "liquid") warnings.push(`Velocidade baixa (${v.toFixed(1)} m/s). Pode haver problemas de retorno de óleo (mín. 4 m/s vertical).`);
  if (dTe_K > 2) warnings.push(`ΔTe = ${dTe_K.toFixed(2)} K: perda de capacidade significativa. Considerar tubo de diâmetro maior.`);

  const regime: "laminar" | "transitional" | "turbulent" =
    Re < 2300 ? "laminar" : Re < 4000 ? "transitional" : "turbulent";

  return {
    delta_P_kPa: Math.max(0, dP_kPa),
    delta_Te_K: Math.max(0, dTe_K),
    effective_Te_C: input.Te_C - dTe_K,
    velocity_m_s: v,
    reynolds: Re,
    friction_factor: f * phi_sq,
    flow_regime: regime,
    mass_velocity_kg_m2s: G,
    warnings,
  };
}
