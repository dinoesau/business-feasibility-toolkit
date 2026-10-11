/**
 * Punto de equilibrio multiproducto.
 * Formula verificada (participacion en mezcla de ventas):
 *   MCponderado = Σ (precio_i - costoVariable_i) x participacion_i
 *   PE_unidadesTotales = costosFijos / MCponderado
 *   PE_ingresos = Σ (PE_unidadesTotales x participacion_i x precio_i)
 */
import type { Money, Result } from "./result";
import { err, ok, parseNonNegative, parsePositive, parseRate01, unwrap } from "./result";

export interface ProductoEquilibrio {
  readonly nombre: string;
  readonly precio: number;
  readonly costoVariable: number;
  readonly participacion: number;
}

export interface DetalleEquilibrio {
  readonly nombre: string;
  readonly unidades: number;
  readonly ingresos: Money;
}

export interface PuntoEquilibrio {
  readonly unidadesTotales: number;
  readonly ingresosTotales: Money;
  readonly margenPonderado: Money;
  readonly detalle: readonly DetalleEquilibrio[];
}

/** Smart constructor: valida mezcla completa, retorna Result. */
export function crearMezcla(productos: readonly ProductoEquilibrio[]): Result<readonly ProductoEquilibrio[]> {
  if (productos.length === 0) return err("productos no puede estar vacio");
  for (let i = 0; i < productos.length; i++) {
    const p = productos[i] as ProductoEquilibrio;
    if (typeof p.nombre !== "string" || p.nombre.trim() === "")
      return err(`productos[${i}].nombre debe ser un texto no vacio`);
    const precio = parsePositive(`productos[${i}].precio`, p.precio);
    if (!precio.ok) return precio as Result<readonly ProductoEquilibrio[]>;
    const cv = parseNonNegative(`productos[${i}].costoVariable`, p.costoVariable);
    if (!cv.ok) return cv as Result<readonly ProductoEquilibrio[]>;
    if (unwrap(cv) >= unwrap(precio))
      return err(`productos[${i}].costoVariable debe ser menor que el precio`);
    const part = parseRate01(`productos[${i}].participacion`, p.participacion);
    if (!part.ok) return part as Result<readonly ProductoEquilibrio[]>;
  }
  const suma = productos.reduce((acc, p) => acc + p.participacion, 0);
  if (Math.abs(suma - 1) > 1e-9) return err(`las participaciones deben sumar 1, suman: ${suma}`);
  return ok(productos);
}

export function margenContribucionPonderado(productos: readonly ProductoEquilibrio[]): Money {
  const mezcla = unwrap(crearMezcla(productos));
  return (mezcla.reduce((acc, p) => acc + (p.precio - p.costoVariable) * p.participacion, 0)) as Money;
}

/** Punto de equilibrio multiproducto. Lanza Error con mensaje claro si el input es invalido. */
export function calcularPuntoEquilibrio(
  productos: readonly ProductoEquilibrio[],
  costosFijos: number,
): PuntoEquilibrio {
  const cf = unwrap(parseNonNegative("costosFijos", costosFijos));
  const mc = margenContribucionPonderado(productos);
  if (mc <= 0) throw new Error("el margen de contribucion ponderado debe ser mayor que cero");
  if (cf === 0) {
    return { unidadesTotales: 0, ingresosTotales: 0 as Money, margenPonderado: mc, detalle: [] };
  }
  const unidadesTotales = cf / mc;
  const detalle = (productos as ProductoEquilibrio[]).map((p) => {
    const unidades = unidadesTotales * p.participacion;
    return { nombre: p.nombre, unidades, ingresos: (unidades * p.precio) as Money };
  });
  const ingresosTotales = detalle.reduce((acc, d) => acc + d.ingresos, 0) as Money;
  return { unidadesTotales, ingresosTotales, margenPonderado: mc, detalle };
}
