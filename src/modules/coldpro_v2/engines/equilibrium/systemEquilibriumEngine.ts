import type {
  SystemComponentsInput,
  SystemEquilibriumResult,
  ThermalBalance,
  ComponentUtilization,
  ProgressiveCoilResult,
} from "../../domain/types";
import { calculateProgressiveCoil } from "../progressive/progressiveCoilSolver";

function safeDivide(num: number, den: number, field: string, warnings: string[]): number {
  if (!den || den === 0) {
    warnings.push(
      `evaluateSystemEquilibrium: divisão por zero evitada para "${field}". Retornando 0.`,
    );
    return 0;
  }
  return num / den;
}

function buildRejected(
  codes: string[],
  descs: string[],
  warnings: string[],
  evapResult: ProgressiveCoilResult | null,
): SystemEquilibriumResult {
  const emptyEvap: ProgressiveCoilResult = evapResult ?? {
    status: "error",
    warnings: [],
    rolls: [],
    total_capacity_w: 0,
    total_air_pressure_drop_pa: 0,
    total_condensation_rate_kg_s: 0,
    air_temperature_out_c: 0,
    air_relative_humidity_out: 0,
    W_out_kg_kg: 0,
    enthalpy_out_j_kg: 0,
    estimated_time_to_defrost_h: null,
    energy_balance_error_pct: 0,
  };

  return {
    status: "rejected",
    thermal_balance: {
      q_evap_w: 0,
      q_cond_required_w: 0,
      q_cond_available_w: 0,
      compressor_power_w: 0,
      balance_error_pct: 0,
    },
    utilization: { compressor_pct: 0, evaporator_pct: 0, condenser_pct: 0 },
    bottleneck_codes: codes,
    bottlenecks: descs,
    warnings,
    recommendations: [],
    evaporator_result: emptyEvap,
  };
}

export function evaluateSystemEquilibrium(input: SystemComponentsInput): SystemEquilibriumResult {
  const warnings: string[] = [];
  const bottleneck_codes: string[] = [];
  const bottlenecks: string[] = [];
  const recommendations: string[] = [];

  if (input.compressor.cooling_capacity_w <= 0) {
    return buildRejected(
      ["invalid_compressor_capacity"],
      ["Capacidade de refrigeração do compressor deve ser maior que zero."],
      warnings,
      null,
    );
  }
  if (input.compressor.power_w <= 0) {
    return buildRejected(
      ["invalid_compressor_power"],
      ["Potência elétrica do compressor deve ser maior que zero."],
      warnings,
      null,
    );
  }
  if (input.condenser.heat_rejection_capacity_w <= 0) {
    return buildRejected(
      ["invalid_condenser_capacity"],
      ["Capacidade de rejeição de calor do condensador deve ser maior que zero."],
      warnings,
      null,
    );
  }
  if (!input.evaporator?.progressive_input) {
    return buildRejected(
      ["missing_evaporator_input"],
      ["Dados do evaporador (progressive_input) são obrigatórios."],
      warnings,
      null,
    );
  }
  if (input.system_conditions.required_airflow_m3_h <= 0) {
    warnings.push("Vazão de ar requerida deve ser maior que zero.");
  }

  const evapResult = calculateProgressiveCoil(input.evaporator.progressive_input);
  warnings.push(...evapResult.warnings);

  if (evapResult.status === "error") {
    return buildRejected(
      ["evaporator_solver_error"],
      ["Solver do evaporador retornou erro."],
      warnings,
      evapResult,
    );
  }

  const q_evap = evapResult.total_capacity_w;
  if (q_evap <= 0) {
    return buildRejected(
      ["evaporator_invalid_capacity"],
      ["Evaporador retornou capacidade zero ou negativa."],
      warnings,
      evapResult,
    );
  }

  const q_cond_required = q_evap + input.compressor.power_w;
  const q_cond_available = input.condenser.heat_rejection_capacity_w;

  if (q_cond_required <= 0) {
    return buildRejected(
      ["invalid_thermal_balance"],
      ["Balanço térmico fisicamente inválido: Q_cond_requerido ≤ 0."],
      warnings,
      evapResult,
    );
  }

  const balance_error_pct =
    safeDivide(
      Math.abs(q_cond_required - q_cond_available),
      q_cond_required,
      "balance_error_pct",
      warnings,
    ) * 100;

  const thermal_balance: ThermalBalance = {
    q_evap_w: q_evap,
    q_cond_required_w: q_cond_required,
    q_cond_available_w: q_cond_available,
    compressor_power_w: input.compressor.power_w,
    balance_error_pct,
  };

  const compressor_pct =
    safeDivide(q_evap, input.compressor.cooling_capacity_w, "compressor_pct", warnings) * 100;
  const evaporator_pct =
    safeDivide(q_evap, input.compressor.cooling_capacity_w, "evaporator_pct", warnings) * 100;
  const condenser_pct =
    safeDivide(q_cond_required, q_cond_available, "condenser_pct", warnings) * 100;

  const utilization: ComponentUtilization = {
    compressor_pct,
    evaporator_pct,
    condenser_pct,
  };

  if (input.expansion_valve) {
    utilization.expansion_valve_pct =
      safeDivide(
        q_evap,
        input.expansion_valve.nominal_capacity_w,
        "expansion_valve_pct",
        warnings,
      ) * 100;
  }

  if (input.evaporator_fan) {
    utilization.evaporator_fan_pct =
      safeDivide(
        input.system_conditions.required_airflow_m3_h,
        input.evaporator_fan.airflow_m3_h,
        "evaporator_fan_pct",
        warnings,
      ) * 100;

    const dp = evapResult.total_air_pressure_drop_pa ?? 0;
    if (dp > input.evaporator_fan.available_static_pressure_pa) {
      bottleneck_codes.push("evaporator_fan_pressure_insufficient");
      bottlenecks.push(
        `Pressão estática do ventilador do evaporador insuficiente: requerido ${Math.round(dp)} Pa, disponível ${input.evaporator_fan.available_static_pressure_pa} Pa.`,
      );
    }
  }

  if (input.condenser_fan) {
    const condenserFanCapW = input.condenser_fan.airflow_m3_h * 2.5;
    utilization.condenser_fan_pct =
      safeDivide(q_cond_required, condenserFanCapW, "condenser_fan_pct", warnings) * 100;
  }

  if (input.four_way_valve) {
    utilization.four_way_valve_pct =
      safeDivide(q_evap, input.four_way_valve.max_capacity_w, "four_way_valve_pct", warnings) * 100;
  }

  if (compressor_pct > 100) {
    bottleneck_codes.push("compressor_undersized");
    bottlenecks.push(
      `Compressor subdimensionado: evaporador entrega ${Math.round(compressor_pct)}% da capacidade nominal do compressor.`,
    );
  }
  if (condenser_pct > 100) {
    bottleneck_codes.push("condenser_undersized");
    bottlenecks.push(
      `Condensador subdimensionado: requer ${Math.round(condenser_pct)}% da capacidade de rejeição disponível.`,
    );
  }
  if (utilization.expansion_valve_pct !== undefined && utilization.expansion_valve_pct > 100) {
    bottleneck_codes.push("expansion_valve_undersized");
    bottlenecks.push(
      `Válvula de expansão subdimensionada: operando a ${Math.round(utilization.expansion_valve_pct)}% da capacidade nominal.`,
    );
  }
  if (utilization.evaporator_fan_pct !== undefined && utilization.evaporator_fan_pct > 100) {
    bottleneck_codes.push("evaporator_fan_undersized");
    bottlenecks.push(
      `Ventilador do evaporador subdimensionado: requer ${Math.round(utilization.evaporator_fan_pct)}% da vazão disponível.`,
    );
  }
  if (utilization.condenser_fan_pct !== undefined && utilization.condenser_fan_pct > 100) {
    bottleneck_codes.push("condenser_fan_undersized");
    bottlenecks.push(
      `Ventilador do condensador subdimensionado: requer ${Math.round(utilization.condenser_fan_pct)}% da capacidade térmica estimada.`,
    );
  }
  if (utilization.four_way_valve_pct !== undefined && utilization.four_way_valve_pct > 100) {
    bottleneck_codes.push("four_way_valve_undersized");
    bottlenecks.push(
      `Válvula de quatro vias subdimensionada: operando a ${Math.round(utilization.four_way_valve_pct)}% da capacidade máxima.`,
    );
  }
  if (balance_error_pct > 10) {
    bottleneck_codes.push("thermal_balance_error");
    bottlenecks.push(
      `Erro de balanço térmico ${Math.round(balance_error_pct)}%: componentes dimensionados para condições diferentes.`,
    );
  }

  if (balance_error_pct > 5 && balance_error_pct <= 10) {
    warnings.push(
      `Erro de balanço térmico ${Math.round(balance_error_pct)}%. Componentes podem estar dimensionados para condições diferentes.`,
    );
  }
  if (condenser_pct > 95 && condenser_pct <= 100)
    warnings.push(`Condensador próximo ao limite: ${Math.round(condenser_pct)}% de utilização.`);
  if (compressor_pct > 95 && compressor_pct <= 100)
    warnings.push(`Compressor próximo ao limite: ${Math.round(compressor_pct)}% de utilização.`);
  if (
    utilization.expansion_valve_pct !== undefined &&
    utilization.expansion_valve_pct > 95 &&
    utilization.expansion_valve_pct <= 100
  )
    warnings.push(
      `Válvula de expansão próxima ao limite: ${Math.round(utilization.expansion_valve_pct)}% de utilização.`,
    );
  if (
    utilization.evaporator_fan_pct !== undefined &&
    utilization.evaporator_fan_pct > 95 &&
    utilization.evaporator_fan_pct <= 100
  )
    warnings.push(
      `Ventilador do evaporador próximo ao limite: ${Math.round(utilization.evaporator_fan_pct)}% de utilização.`,
    );
  if (
    utilization.condenser_fan_pct !== undefined &&
    utilization.condenser_fan_pct > 95 &&
    utilization.condenser_fan_pct <= 100
  )
    warnings.push(
      `Ventilador do condensador próximo ao limite: ${Math.round(utilization.condenser_fan_pct)}% de utilização.`,
    );
  if (input.compressor.cond_temp_c > input.condenser.max_cond_temp_c) {
    warnings.push(
      `Temperatura de condensação nominal do compressor (${input.compressor.cond_temp_c}°C) excede o máximo do condensador (${input.condenser.max_cond_temp_c}°C).`,
    );
  }

  if (condenser_pct > 100)
    recommendations.push("Aumente a capacidade de rejeição do condensador ou reduza a potência do compressor.");
  if (compressor_pct > 100)
    recommendations.push("Reduza a carga do evaporador ou selecione um compressor maior.");
  if (utilization.expansion_valve_pct !== undefined && utilization.expansion_valve_pct > 100)
    recommendations.push(
      `Selecione válvula de expansão com capacidade nominal maior (mín. ${Math.round(q_evap * 1.1)} W).`,
    );
  if (utilization.evaporator_fan_pct !== undefined && utilization.evaporator_fan_pct > 100)
    recommendations.push(
      `Aumente a vazão do ventilador do evaporador para pelo menos ${Math.round(input.system_conditions.required_airflow_m3_h * 1.1)} m³/h.`,
    );
  if (utilization.condenser_fan_pct !== undefined && utilization.condenser_fan_pct > 100)
    recommendations.push("Aumente a vazão do ventilador do condensador ou reduza a temperatura ambiente.");
  if (balance_error_pct > 5)
    recommendations.push(
      "Verifique se todos os componentes estão dimensionados para as mesmas temperaturas de evaporação e condensação.",
    );
  if (bottleneck_codes.length === 0 && warnings.length === 0)
    recommendations.push("Sistema bem balanceado. Nenhum ajuste necessário.");

  const anyOver110 =
    compressor_pct > 110 ||
    condenser_pct > 110 ||
    (utilization.expansion_valve_pct ?? 0) > 110 ||
    (utilization.evaporator_fan_pct ?? 0) > 110 ||
    (utilization.condenser_fan_pct ?? 0) > 110 ||
    (utilization.four_way_valve_pct ?? 0) > 110;

  let status: SystemEquilibriumResult["status"];
  if (anyOver110 || balance_error_pct > 10) {
    status = "rejected";
  } else if (
    compressor_pct > 95 ||
    condenser_pct > 95 ||
    balance_error_pct > 5 ||
    bottleneck_codes.length > 0 ||
    warnings.length > 0
  ) {
    status = "warning";
  } else {
    status = "approved";
  }

  return {
    status,
    thermal_balance,
    utilization,
    bottleneck_codes,
    bottlenecks,
    warnings,
    recommendations,
    evaporator_result: evapResult,
  };
}
