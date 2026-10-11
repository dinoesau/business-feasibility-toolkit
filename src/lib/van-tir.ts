/**
 * VAN, TIR, PRI y ROI.
 * Formulas verificadas:
 *   VAN = Σ FCt/(1+r)^t - I0            (t = 1..n)
 *   TIR = r* tal que VAN(r*) = 0        (biseccion; null si no hay cambio de signo)
 *   PRI = primer t con acumulado >= I0, con interpolacion lineal dentro del periodo
 *   ROI = (ΣFCt - I0) / I0              (tanto por uno)
 */
import type { Money, Rate, Result } from "./result";
import { ok, parseDiscountRate, parseNonNegative, unwrap } from "./result";

export interface EvaluacionProyecto {
  readonly van: Money;
  readonly tir: Rate | null;
  readonly pri: number | null;
  readonly roi: number;
}

/** Smart constructor: valida flujos + inversion, retorna Result. */
export function crearFlujos(flujos: readonly number[], inversion: number): Result<readonly number[]> {
  if (flujos.length === 0) return { ok: false, error: "flujos no puede estar vacio" };
  for (let i = 0; i < flujos.length; i++) {
    const f = parseNonNegative(`flujos[${i}]`, flujos[i]);
    if (!f.ok) return f as Result<readonly number[]>;
  }
  const inv = parseNonNegative("inversion", inversion);
  if (!inv.ok) return inv as Result<readonly number[]>;
  return ok(flujos);
}

export function calcularVAN(flujos: readonly number[], tasa: number, inversion: number): Money {
  const r = unwrap(parseDiscountRate("tasa", tasa));
  const inv = unwrap(parseNonNegative("inversion", inversion));
  const validados = unwrap(crearFlujos(flujos, inversion));
  const descontados = validados.reduce((acc, fc, i) => acc + fc / Math.pow(1 + r, i + 1), 0);
  return (descontados - inv) as Money;
}

/** TIR por biseccion en (-1, 10]. Retorna null si el VAN no cambia de signo (sin TIR). */
export function calcularTIR(flujos: readonly number[], inversion: number): Rate | null {
  const validados = unwrap(crearFlujos(flujos, inversion));
  const inv = unwrap(parseNonNegative("inversion", inversion));
  const vanEn = (r: number): number =>
    validados.reduce((acc, fc, i) => acc + fc / Math.pow(1 + r, i + 1), 0) - inv;
  let bajo = -0.9999;
  let alto = 10;
  const vanBajo = vanEn(bajo);
  const vanAlto = vanEn(alto);
  if (vanBajo * vanAlto > 0) return null;
  let medio = 0;
  for (let i = 0; i < 200; i++) {
    medio = (bajo + alto) / 2;
    const vanMedio = vanEn(medio);
    if (Math.abs(vanMedio) < 1e-9) break;
    if (vanBajo * vanMedio <= 0) {
      alto = medio;
    } else {
      bajo = medio;
    }
  }
  return medio as Rate;
}

/** PRI en anios (con fraccion interpolada). Null si nunca se recupera la inversion. */
export function calcularPRI(flujos: readonly number[], inversion: number): number | null {
  const validados = unwrap(crearFlujos(flujos, inversion));
  const inv = unwrap(parseNonNegative("inversion", inversion));
  let acumulado = 0;
  for (let t = 0; t < validados.length; t++) {
    const fc = validados[t] as number;
    const previo = acumulado;
    acumulado += fc;
    if (acumulado >= inv) {
      const faltante = inv - previo;
      return t + faltante / fc;
    }
  }
  return null;
}

/** ROI en tanto por uno: (beneficioTotal - inversion) / inversion. */
export function calcularROI(flujos: readonly number[], inversion: number): number {
  const validados = unwrap(crearFlujos(flujos, inversion));
  const inv = unwrap(parseNonNegative("inversion", inversion));
  if (inv === 0) throw new Error("inversion debe ser mayor que cero para calcular el ROI");
  const total = validados.reduce((acc, fc) => acc + fc, 0);
  return (total - inv) / inv;
}

export function evaluarProyecto(
  flujos: readonly number[],
  tasa: number,
  inversion: number,
): EvaluacionProyecto {
  return {
    van: calcularVAN(flujos, tasa, inversion),
    tir: calcularTIR(flujos, inversion),
    pri: calcularPRI(flujos, inversion),
    roi: calcularROI(flujos, inversion),
  };
}
