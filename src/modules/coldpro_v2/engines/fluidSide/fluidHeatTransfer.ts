import type { FluidProperties } from "./fluidProperties";
import { calculateDarcyFrictionFactor } from "../core/friction";
import {
  calculateReynolds,
  calculateNusseltGnielinski,
  calculateConvectiveCoefficient,
} from "../core/dimensionless";

/** Tube surface type for internal enhancement (B3). */
export type TubeType = "smooth" | "micro_fin" | "grooved";

/** Enhancement factors per tube type (Carnavos 1980, ASHRAE HoF 2021 Ch.4).
 *  E_i: HTC multiplier. E_f: friction multiplier (raises ΔP). */
const TUBE_ENHANCEMENT: Record<TubeType, { E_i: number; E_f: number }> = {
  smooth:    { E_i: 1.00, E_f: 1.00 },
  micro_fin: { E_i: 1.50, E_f: 1.25 }, // typical 18-fin micro-fin copper tube
  grooved:   { E_i: 1.80, E_f: 1.50 }, // deep spiral groove, e/D ≈ 0.04
};

export interface FluidHTCInput {
  mass_flow_kgs: number;
  circuits: number | null;
  tube_inner_diameter_m: number;
  fluid_properties: FluidProperties;
  tube_length_m?: number;
  roughness_m?: number;
  /** Internal surface type — enables enhanced-tube correction. Default: "smooth". */
  tube_type?: TubeType;
}

export type FlowRegime = "laminar" | "transitional" | "turbulent";

export interface FluidSideHTCResult {
  h_w_m2k: number;
  reynolds: number;
  prandtl: number;
  nusselt: number;
  velocity_m_s: number;
  friction_factor: number;
  flow_regime: FlowRegime;
  warnings: string[];
}

export function calculateInternalFluidHTC(input: FluidHTCInput): FluidSideHTCResult {
  const warnings: string[] = [];

  let circuits = input.circuits ?? 0;
  if (circuits <= 0) {
    circuits = 1;
    warnings.push("circuits não informado. Usando default = 1 circuito.");
  }

  const Di = input.tube_inner_diameter_m;
  const roughness = input.roughness_m ?? 0.0000015;
  const fp = input.fluid_properties;

  const massFlowPerCircuit = input.mass_flow_kgs / circuits;
  const area = (Math.PI * Di * Di) / 4;
  const velocity = area > 0 ? massFlowPerCircuit / (fp.density_kg_m3 * area) : 0;

  const Re = calculateReynolds({
    density_kg_m3: fp.density_kg_m3,
    velocity_m_s: velocity,
    hydraulicDiameter_m: Di,
    viscosity_pa_s: fp.viscosity_pa_s,
  });

  const Pr = fp.prandtl;

  const frictionFactor = calculateDarcyFrictionFactor({
    reynolds: Re,
    roughness_m: roughness,
    hydraulicDiameter_m: Di,
  });

  const nuResult = calculateNusseltGnielinski({
    reynolds: Re,
    prandtl: Pr,
    frictionFactor,
  });
  warnings.push(...nuResult.warnings);

  const h_smooth = calculateConvectiveCoefficient({
    nusselt: nuResult.nusselt,
    conductivity_w_m_k: fp.conductivity_w_m_k,
    hydraulicDiameter_m: Di,
  });

  const tubeType = input.tube_type ?? "smooth";
  const enh = TUBE_ENHANCEMENT[tubeType];
  const h = h_smooth * enh.E_i;
  const enhancedFrictionFactor = frictionFactor * enh.E_f;

  if (tubeType !== "smooth") {
    warnings.push(`Tubo ${tubeType}: E_i=${enh.E_i}× (HTC), E_f=${enh.E_f}× (ΔP) — Carnavos 1980 / ASHRAE HoF 2021.`);
  }

  let flow_regime: FlowRegime;
  if (Re < 2300) {
    flow_regime = "laminar";
  } else if (Re < 4000) {
    flow_regime = "transitional";
  } else {
    flow_regime = "turbulent";
  }

  return {
    h_w_m2k: h,
    reynolds: Re,
    prandtl: Pr,
    nusselt: nuResult.nusselt,
    velocity_m_s: velocity,
    friction_factor: enhancedFrictionFactor,
    flow_regime,
    warnings,
  };
}
