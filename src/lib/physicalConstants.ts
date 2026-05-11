/**
 * Constantes físicas canônicas do sistema CN COLD.
 *
 * Fontes:
 *  - ASHRAE Handbook of Fundamentals 2017, cap. 1
 *  - ISO 5149-1:2014 (sistemas de refrigeração)
 *  - ABNT NBR 16069:2012 (terminologia de refrigeração)
 */

// ── Conversões de energia ─────────────────────────────────────────────────────

/** 1 kW = 859.845 kcal/h  (1 kcal = 4186.8 J; 1 h = 3600 s) */
export const KCALH_PER_KW = 859.845;

/** 1 TR (tonelada de refrigeração) = 3516.8528 W  (ASHRAE: 12 000 BTU/h) */
export const W_PER_TR = 3516.8528;

/** 1 TR = 3024 kcal/h  (= W_PER_TR × KCALH_PER_KW / 1000) */
export const KCALH_PER_TR = 3024.0;

/** 1 BTU/h = 0.29307 W */
export const W_PER_BTUH = 0.29307;

/** 1 BTU/h = 0.252 kcal/h */
export const KCALH_PER_BTUH = 0.252;

// ── Propriedades do ar (nível do mar, condições padrão) ──────────────────────

/** Pressão atmosférica padrão ao nível do mar [Pa] */
export const P_ATM_SEA_LEVEL_PA = 101_325;

/** Calor específico do ar seco [J/(kg·K)] */
export const CP_DRY_AIR_J_KG_K = 1005.0;

/** Calor específico do vapor d'água [J/(kg·K)] */
export const CP_WATER_VAPOR_J_KG_K = 1860.0;

/** Entalpia de vaporização da água a 0°C [kJ/kg] */
export const HFG_WATER_AT_0C_KJ_KG = 2501.0;

/** Constante do gás ideal para o ar seco [J/(kg·K)] */
export const R_DRY_AIR_J_KG_K = 287.055;

/** Constante do gás ideal para o vapor d'água [J/(kg·K)] */
export const R_WATER_VAPOR_J_KG_K = 461.524;

// ── Condutividade térmica de materiais ───────────────────────────────────────

/** Condutividade térmica do cobre [W/(m·K)] a 25°C */
export const K_COPPER_W_M_K = 385.0;

/** Condutividade térmica do alumínio [W/(m·K)] a 25°C */
export const K_ALUMINUM_W_M_K = 205.0;

/** Condutividade térmica do aço carbono [W/(m·K)] a 25°C */
export const K_STEEL_W_M_K = 50.0;
