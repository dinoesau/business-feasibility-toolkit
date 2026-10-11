/**
 * Costeo + pricing por margen, por markup y por valor.
 * Distincion clave (fuente de errores tipicos):
 *   precioPorMargen = costo / (1 - margen)   (margen sobre precio de venta)
 *   precioPorMarkup = costo x (1 + markup)    (markup sobre costo)
 */
import type { Money, Rate, Result } from "./result";
import { ok, parseNonNegative, parsePositive, parseRate01, unwrap } from "./result";

export interface Costeo {
  readonly materiales: number;
  readonly manoObra: number;
  readonly overhead: number;
}

export interface DesglosePrecio {
  readonly costoTotal: Money;
  readonly precio: Money;
  readonly margenReal: Rate;
}

/** Smart constructor del costeo. */
export function crearCosteo(raw: { materiales: unknown; manoObra: unknown; overhead: unknown }): Result<Costeo> {
  const materiales = parseNonNegative("materiales", raw.materiales);
  if (!materiales.ok) return materiales as Result<Costeo>;
  const manoObra = parseNonNegative("manoObra", raw.manoObra);
  if (!manoObra.ok) return manoObra as Result<Costeo>;
  const overhead = parseNonNegative("overhead", raw.overhead);
  if (!overhead.ok) return overhead as Result<Costeo>;
  return ok({ materiales: unwrap(materiales), manoObra: unwrap(manoObra), overhead: unwrap(overhead) });
}

export function calcularCostoTotal(costeo: Costeo): Money {
  const c = unwrap(crearCosteo(costeo));
  return (c.materiales + c.manoObra + c.overhead) as Money;
}

/** Precio con margen sobre venta. Margen debe estar en [0, 1). */
export function precioPorMargen(costo: number, margen: number): Money {
  const c = unwrap(parseNonNegative("costo", costo));
  const m = unwrap(parseRate01("margen", margen));
  if (m >= 1) throw new Error("margen debe ser menor que 1 (100% del precio seria precio infinito)");
  return (c / (1 - m)) as Money;
}

/** Precio con markup sobre costo. */
export function precioPorMarkup(costo: number, markup: number): Money {
  const c = unwrap(parseNonNegative("costo", costo));
  const k = unwrap(parseNonNegative("markup", markup));
  return (c * (1 + k)) as Money;
}

/** Precio por valor percibido: referencia de mercado ajustada por un % (positivo o negativo). */
export function precioPorValor(precioReferencia: number, ajustePct: number): Money {
  const ref = unwrap(parsePositive("precioReferencia", precioReferencia));
  if (!Number.isFinite(ajustePct)) throw new Error(`ajustePct debe ser un numero finito, recibido: ${String(ajustePct)}`);
  if (ajustePct <= -1) throw new Error(`ajustePct debe ser mayor que -1, recibido: ${ajustePct}`);
  return (ref * (1 + ajustePct)) as Money;
}

/** Margen real sobre precio de venta dado un costo y un precio. */
export function margenDesdePrecio(costo: number, precio: number): Rate {
  const c = unwrap(parseNonNegative("costo", costo));
  const p = unwrap(parsePositive("precio", precio));
  if (c > p) throw new Error(`costo (${c}) no puede superar al precio (${p})`);
  return ((p - c) / p) as Rate;
}

export function desglosarPrecio(costeo: Costeo, margen: number): DesglosePrecio {
  const costoTotal = calcularCostoTotal(costeo);
  const precio = precioPorMargen(costoTotal, margen);
  return { costoTotal, precio, margenReal: margenDesdePrecio(costoTotal, precio) };
}
