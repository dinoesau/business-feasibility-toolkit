/**
 * Unit economics: CAC y LTV.
 * Formulas verificadas:
 *   CAC  = gastoMarketingYVentas / clientesNuevos
 *   LTV  = (arpuMensual x margenBruto) / churnMensual   (margen bruto, no ingreso bruto)
 *   ratio LTV/CAC >= 3 = sano; < 1 = insostenible
 *   paybackCAC = CAC / (arpuMensual x margenBruto)      (meses)
 */
import type { Money, Result } from "./result";
import { ok, parseNonNegative, parsePositive, parseRate01, unwrap } from "./result";

export interface UnitEconomics {
  readonly cac: Money;
  readonly ltv: Money;
  readonly ratioLtvCac: number;
  readonly paybackMeses: number;
}

/** Smart constructor de inputs CAC. */
export function crearCacInputs(gastoMarketing: unknown, clientesNuevos: unknown): Result<{ gasto: number; clientes: number }> {
  const gasto = parseNonNegative("gastoMarketing", gastoMarketing);
  if (!gasto.ok) return gasto as Result<{ gasto: number; clientes: number }>;
  const clientes = parsePositive("clientesNuevos", clientesNuevos);
  if (!clientes.ok) return clientes as Result<{ gasto: number; clientes: number }>;
  return ok({ gasto: unwrap(gasto), clientes: unwrap(clientes) });
}

export function calcularCAC(gastoMarketing: number, clientesNuevos: number): Money {
  const g = unwrap(parseNonNegative("gastoMarketing", gastoMarketing));
  const c = unwrap(parsePositive("clientesNuevos", clientesNuevos));
  return (g / c) as Money;
}

/** LTV sobre margen de contribucion. Churn en (0, 1]. */
export function calcularLTV(arpuMensual: number, margenBruto: number, churnMensual: number): Money {
  const arpu = unwrap(parseNonNegative("arpuMensual", arpuMensual));
  const margen = unwrap(parseRate01("margenBruto", margenBruto));
  const churn = unwrap(parseRate01("churnMensual", churnMensual));
  if (churn === 0) throw new Error("churnMensual debe ser mayor que cero (sin churn el LTV es infinito)");
  return ((arpu * margen) / churn) as Money;
}

export function ratioLtvCac(ltv: number, cac: number): number {
  const l = unwrap(parseNonNegative("ltv", ltv));
  const c = unwrap(parsePositive("cac", cac));
  return l / c;
}

/** Meses para recuperar el CAC con el margen mensual por cliente. */
export function paybackCAC(arpuMensual: number, margenBruto: number, cac: number): number {
  const arpu = unwrap(parseNonNegative("arpuMensual", arpuMensual));
  const margen = unwrap(parseRate01("margenBruto", margenBruto));
  const c = unwrap(parsePositive("cac", cac));
  const margenMensual = arpu * margen;
  if (margenMensual <= 0) throw new Error("el margen mensual por cliente debe ser mayor que cero");
  return c / margenMensual;
}

export function evaluarUnitEconomics(
  gastoMarketing: number,
  clientesNuevos: number,
  arpuMensual: number,
  margenBruto: number,
  churnMensual: number,
): UnitEconomics {
  const cac = calcularCAC(gastoMarketing, clientesNuevos);
  const ltv = calcularLTV(arpuMensual, margenBruto, churnMensual);
  return {
    cac,
    ltv,
    ratioLtvCac: ratioLtvCac(ltv, cac),
    paybackMeses: paybackCAC(arpuMensual, margenBruto, cac),
  };
}

/** Veredicto cualitativo del ratio (umbrales estandar de la industria). */
export function veredictoRatio(ratio: number): "insostenible" | "ajustado" | "sano" | "sobresaliente" {
  if (!Number.isFinite(ratio) || ratio < 0) throw new Error(`ratio debe ser un numero finito >= 0, recibido: ${ratio}`);
  if (ratio < 1) return "insostenible";
  if (ratio < 3) return "ajustado";
  if (ratio < 5) return "sano";
  return "sobresaliente";
}
