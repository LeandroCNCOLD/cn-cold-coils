import { calculateDarcyWeisbachPressureDrop } from "../core/pressureDrop";

export interface FluidPressureDropInput {
  friction_factor: number;
  tube_length_m: number;
  tube_inner_diameter_m: number;
  density_kg_m3: number;
  velocity_m_s: number;
}

export interface FluidPressureDropResult {
  pressure_drop_pa: number;
  pressure_drop_kpa: number;
  warnings: string[];
}

export function calculateInternalFluidPressureDrop(
  input: FluidPressureDropInput,
): FluidPressureDropResult {
  const warnings: string[] = [];

  const pressure_drop_pa = calculateDarcyWeisbachPressureDrop({
    frictionFactor: input.friction_factor,
    length_m: input.tube_length_m,
    hydraulicDiameter_m: input.tube_inner_diameter_m,
    density_kg_m3: input.density_kg_m3,
    velocity_m_s: input.velocity_m_s,
  });

  return {
    pressure_drop_pa,
    pressure_drop_kpa: pressure_drop_pa / 1000,
    warnings,
  };
}

export interface TwoPhaseFluidPressureDropInput {
  mass_flow_kgs: number;
  circuits: number;
  tube_inner_diameter_m: number;
  tube_length_m: number;
  quality_x: number;
  density_liquid: number;
  density_vapor: number;
  viscosity_liquid: number;
  viscosity_vapor: number;
}

/**
 * Lockhart-Martinelli two-phase pressure drop with Chisholm C=20 (turbulent-turbulent).
 * Applies liquid-only Blasius ΔP × φ_l² multiplier. Corrects the ~2–5× underestimate
 * that occurs when single-phase liquid properties are used for evaporating/condensing flows.
 */
export function calculateTwoPhaseFluidPressureDrop(
  input: TwoPhaseFluidPressureDropInput,
): FluidPressureDropResult {
  const warnings: string[] = [];
  const { mass_flow_kgs, circuits, tube_inner_diameter_m: Di, tube_length_m, quality_x: x } = input;
  const { density_liquid: rho_l, density_vapor: rho_v, viscosity_liquid: mu_l, viscosity_vapor: mu_v } = input;

  const n = Math.max(circuits, 1);
  const A_tube = Math.PI * Di * Di / 4;
  const G = mass_flow_kgs / (n * A_tube); // mass velocity [kg/m²s]

  // Liquid-only Darcy-Weisbach (Blasius friction factor for turbulent flow)
  const Re_l = (G * Di) / mu_l;
  const f_l = Re_l > 0 ? 0.316 * Math.pow(Re_l, -0.25) : 0.02;

  const v_l = G / rho_l;
  const dp_l = calculateDarcyWeisbachPressureDrop({
    frictionFactor: f_l,
    length_m: tube_length_m,
    hydraulicDiameter_m: Di,
    density_kg_m3: rho_l,
    velocity_m_s: v_l,
  });

  // Martinelli parameter X_tt (turbulent-turbulent)
  const xc = Math.max(0.01, Math.min(0.99, x));
  const X_tt_sq = Math.pow((1 - xc) / xc, 1.8) * (rho_v / rho_l) * Math.pow(mu_l / mu_v, 0.2);
  const X_tt = Math.sqrt(Math.max(X_tt_sq, 1e-9));

  // Chisholm two-phase multiplier (C=20 for turbulent-turbulent)
  const phi_l_sq = 1 + 20 / X_tt + 1 / (X_tt * X_tt);
  const dp_tp = dp_l * phi_l_sq;

  if (Re_l < 4000) warnings.push("Escoamento possivelmente não turbulento — multiplicador de Chisholm pode ser impreciso.");

  return {
    pressure_drop_pa: dp_tp,
    pressure_drop_kpa: dp_tp / 1000,
    warnings,
  };
}
