/**
 * Sensibilidad por escenarios: optimista / base / pesimista.
 * Cada escenario ajusta ventas y costos del caso base por porcentajes:
 *   ingresos_esc = base.ingresos x (1 + ventasPct)
 *   costos_esc   = (fijos + variables) x (1 + costosPct)
 *   utilidad     = ingresos_esc - costos_esc
 */
import type { Money, Rate, Result } from "./result";
import { ok, unwrap } from "./result";

export type EscenarioNombre = "pesimista" | "base" | "optimista";

export interface CasoBase {
  readonly ingresos: number;
  readonly costosFijos: number;
  readonly costosVariables: number;
}

export interface DeltaEscenario {
  readonly ventasPct: number;
  readonly costosPct: number;
}

export interface ResultadoEscenario {
  readonly ingresos: Money;
  readonly costos: Money;
  readonly utilidad: Money;
  readonly margen: Rate;
}

export const ESCENARIOS: readonly EscenarioNombre[] = ["pesimista", "base", "optimista"];

/** Aplica un ajuste porcentual (p. ej. 0.2 = +20%). El % puede ser negativo. */
export function aplicarEscenario(valorBase: number, pct: number): number {
  if (!Number.isFinite(valorBase) || valorBase < 0)
    throw new Error(`valorBase debe ser un numero finito >= 0, recibido: ${valorBase}`);
  if (!Number.isFinite(pct)) throw new Error(`pct debe ser un numero finito, recibido: ${pct}`);
  if (pct <= -1) throw new Error(`pct debe ser mayor que -1, recibido: ${pct}`);
  return valorBase * (1 + pct);
}

function validarCasoBase(caso: CasoBase): CasoBase {
  for (const [campo, valor] of Object.entries(caso)) {
    if (!Number.isFinite(valor) || (valor as number) < 0)
      throw new Error(`${campo} debe ser un numero finito >= 0, recibido: ${valor}`);
  }
  return caso;
}

export function evaluarEscenario(casoBase: CasoBase, delta: DeltaEscenario): ResultadoEscenario {
  const base = validarCasoBase(casoBase);
  const ingresos = aplicarEscenario(base.ingresos, delta.ventasPct);
  const costos = aplicarEscenario(base.costosFijos + base.costosVariables, delta.costosPct);
  const utilidad = ingresos - costos;
  const margen = ingresos === 0 ? 0 : utilidad / ingresos;
  return { ingresos: ingresos as Money, costos: costos as Money, utilidad: utilidad as Money, margen: margen as Rate };
}

/** Smart constructor del mapa de deltas: exige exactamente los 3 escenarios. */
export function crearDeltas(
  raw: Record<string, { ventasPct: number; costosPct: number }>,
): Result<Record<EscenarioNombre, DeltaEscenario>> {
  for (const nombre of ESCENARIOS) {
    const d = raw[nombre];
    if (d === undefined) return { ok: false, error: `falta el escenario: ${nombre}` };
    for (const [campo, valor] of Object.entries(d)) {
      if (!Number.isFinite(valor) || (valor as number) <= -1)
        return { ok: false, error: `${nombre}.${campo} debe ser un numero finito > -1, recibido: ${valor}` };
    }
  }
  return ok(raw as Record<EscenarioNombre, DeltaEscenario>);
}

export function evaluarEscenarios(
  casoBase: CasoBase,
  deltas: Record<EscenarioNombre, DeltaEscenario>,
): Record<EscenarioNombre, ResultadoEscenario> {
  const validos = unwrap(crearDeltas(deltas as Record<string, { ventasPct: number; costosPct: number }>));
  return {
    pesimista: evaluarEscenario(casoBase, validos.pesimista),
    base: evaluarEscenario(casoBase, validos.base),
    optimista: evaluarEscenario(casoBase, validos.optimista),
  };
}
