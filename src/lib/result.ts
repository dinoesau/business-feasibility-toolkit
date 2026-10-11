/**
 * Kernel compartido: Result + branded types + validadores.
 * Evita Duplicated Code entre los 9 modulos (cada smart constructor reutiliza esto).
 * Cero runtime: los brands solo existen en compilacion.
 */

/** Result explicito: exito con valor o fallo con mensaje claro. */
export type Result<T> = { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: string };

export function ok<T>(value: T): Result<T> {
  return { ok: true, value };
}

export function err<T>(error: string): Result<T> {
  return { ok: false, error };
}

/** Extrae el valor o lanza Error con el mensaje (para puentes Result -> throw). */
export function unwrap<T>(result: Result<T>): T {
  if (!result.ok) throw new Error((result as { error: string }).error);
  return (result as { value: T }).value;
}

/** Dinero en MXN. Brand de compilacion, sin costo runtime. */
export type Money = number & { readonly __brand: "Money" };
/** Tasa en tanto por uno, p. ej. 0.12 = 12%. */
export type Rate = number & { readonly __brand: "Rate" };
/** Conteo entero no negativo (personas, unidades, meses). */
export type Count = number & { readonly __brand: "Count" };

export function toMoney(n: number): Money {
  return n as Money;
}

export function toRate(n: number): Rate {
  return n as Rate;
}

export function toCount(n: number): Count {
  return n as Count;
}

function esNumeroFinito(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n);
}

/** Smart constructor: numero finito >= 0. */
export function parseNonNegative(campo: string, n: unknown): Result<number> {
  if (!esNumeroFinito(n)) return err(`${campo} debe ser un numero finito, recibido: ${String(n)}`);
  if (n < 0) return err(`${campo} no puede ser negativo, recibido: ${n}`);
  return ok(n);
}

/** Smart constructor: numero finito > 0. */
export function parsePositive(campo: string, n: unknown): Result<number> {
  if (!esNumeroFinito(n)) return err(`${campo} debe ser un numero finito, recibido: ${String(n)}`);
  if (n <= 0) return err(`${campo} debe ser mayor que cero, recibido: ${n}`);
  return ok(n);
}

/** Smart constructor: tasa en [0, 1]. */
export function parseRate01(campo: string, n: unknown): Result<number> {
  if (!esNumeroFinito(n)) return err(`${campo} debe ser un numero finito, recibido: ${String(n)}`);
  if (n < 0 || n > 1) return err(`${campo} debe estar entre 0 y 1, recibido: ${n}`);
  return ok(n);
}

/** Smart constructor: entero >= 0. */
export function parseCount(campo: string, n: unknown): Result<number> {
  const base = parseNonNegative(campo, n);
  if (!base.ok) return base;
  if (!Number.isInteger((base as { value: number }).value))
    return err(`${campo} debe ser un entero, recibido: ${n}`);
  return base;
}

/** Smart constructor: tasa de descuento > -1 (si no, la division (1+r)^t colapsa). */
export function parseDiscountRate(campo: string, n: unknown): Result<number> {
  if (!esNumeroFinito(n)) return err(`${campo} debe ser un numero finito, recibido: ${String(n)}`);
  if (n <= -1) return err(`${campo} debe ser mayor que -1, recibido: ${n}`);
  return ok(n);
}
