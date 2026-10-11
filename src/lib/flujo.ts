/**
 * Flujo de caja proyectado a N meses (defecto 36) con acumulado.
 * Modelo: ingresos crecen a tasa mensual compuesta; egresos = fijos + ratio variable.
 *   ingresos_t = base x (1+g)^(t-1)
 *   egresos_t  = fijos + ingresos_t x ratioVariable
 *   flujo_t    = ingresos_t - egresos_t
 *   acumulado_t = -inversionInicial + Σ flujo_1..t
 */
import type { Money, Result } from "./result";
import { ok, parseCount, parseNonNegative, parseRate01, unwrap } from "./result";

export interface FlujoParams {
  readonly inversionInicial: number;
  readonly ingresoMensualBase: number;
  readonly crecimientoMensual: number;
  readonly costoFijoMensual: number;
  readonly costoVariableRatio: number;
  readonly meses?: number;
}

export interface FilaFlujo {
  readonly mes: number;
  readonly ingresos: Money;
  readonly egresos: Money;
  readonly flujo: Money;
  readonly acumulado: Money;
}

/** Smart constructor de parametros del flujo. */
export function crearFlujoParams(raw: {
  inversionInicial: unknown;
  ingresoMensualBase: unknown;
  crecimientoMensual: unknown;
  costoFijoMensual: unknown;
  costoVariableRatio: unknown;
  meses?: unknown;
}): Result<FlujoParams> {
  const inversion = parseNonNegative("inversionInicial", raw.inversionInicial);
  if (!inversion.ok) return inversion as Result<FlujoParams>;
  const base = parseNonNegative("ingresoMensualBase", raw.ingresoMensualBase);
  if (!base.ok) return base as Result<FlujoParams>;
  const crecimiento = parseNonNegative("crecimientoMensual", raw.crecimientoMensual);
  if (!crecimiento.ok) return crecimiento as Result<FlujoParams>;
  const fijos = parseNonNegative("costoFijoMensual", raw.costoFijoMensual);
  if (!fijos.ok) return fijos as Result<FlujoParams>;
  const ratio = parseRate01("costoVariableRatio", raw.costoVariableRatio);
  if (!ratio.ok) return ratio as Result<FlujoParams>;
  let meses = 36;
  if (raw.meses !== undefined) {
    const m = parseCount("meses", raw.meses);
    if (!m.ok) return m as Result<FlujoParams>;
    if (unwrap(m) < 1) return { ok: false, error: "meses debe ser al menos 1" };
    meses = unwrap(m);
  }
  return ok({
    inversionInicial: unwrap(inversion),
    ingresoMensualBase: unwrap(base),
    crecimientoMensual: unwrap(crecimiento),
    costoFijoMensual: unwrap(fijos),
    costoVariableRatio: unwrap(ratio),
    meses,
  });
}

export function proyectarFlujoCaja(params: FlujoParams): FilaFlujo[] {
  const p = unwrap(crearFlujoParams(params));
  const meses = p.meses ?? 36;
  const filas: FilaFlujo[] = [];
  let acumulado = -p.inversionInicial;
  for (let mes = 1; mes <= meses; mes++) {
    const ingresos = p.ingresoMensualBase * Math.pow(1 + p.crecimientoMensual, mes - 1);
    const egresos = p.costoFijoMensual + ingresos * p.costoVariableRatio;
    const flujo = ingresos - egresos;
    acumulado += flujo;
    filas.push({
      mes,
      ingresos: ingresos as Money,
      egresos: egresos as Money,
      flujo: flujo as Money,
      acumulado: acumulado as Money,
    });
  }
  return filas;
}

/** Mes (1-based) en que el acumulado se vuelve >= 0. Null si no ocurre. */
export function mesRecuperacion(filas: readonly FilaFlujo[]): number | null {
  const fila = filas.find((f) => f.acumulado >= 0);
  return fila ? fila.mes : null;
}
