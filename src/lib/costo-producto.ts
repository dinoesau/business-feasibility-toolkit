/**
 * Costo real de producto + precio con IVA y terminal + ISR (MX).
 * Corrige errores frecuentes de hojas de calculo caseras:
 * - markup (sobre costo) no es margen (sobre precio): 50% markup = 33.3% margen.
 * - la comision de terminal se descuenta del TOTAL cobrado con IVA,
 *   asi que el precio se infla con gross-up: P = (base x (1+iva) + fija) / (1 - t).
 * - ISR de actividad empresarial va sobre la UTILIDAD, nunca sobre el ingreso.
 * - RESICO solo admite tasas oficiales 1%, 1.1%, 1.5%, 2% y 2.5% sobre ingreso sin IVA.
 */
import type { Money, Rate, Result } from "./result";
import { err, ok, parseNonNegative, toMoney, toRate, unwrap } from "./result";

/** Costos que escalan con cada unidad vendida. */
export interface CostosDirectos {
  readonly materiaPrima: number;
  readonly empaque: number;
  readonly manoObra: number;
  readonly envioInsumos: number;
  readonly mermas: number;
}

/** Parte proporcional por unidad de los gastos fijos del mes. */
export interface CostosIndirectos {
  readonly renta: number;
  readonly servicios: number;
  readonly software: number;
  readonly marketing: number;
  readonly administracion: number;
  readonly desgasteEquipo: number;
}

/** "markup": % sobre el costo. "margen": % sobre el precio base. */
export type ModoUtilidad = "markup" | "margen";

export interface ParametrosVenta {
  /** IVA en tanto por uno, p. ej. 0.16. */
  readonly iva: number;
  /** Comision de terminal en tanto por uno, en [0, 1). */
  readonly terminalPct: number;
  /** Comision fija de terminal en MXN por cobro. */
  readonly terminalFija: number;
  /** Una de TASAS_RESICO (sobre ingreso sin IVA). */
  readonly tasaResico: number;
  /** Tasa efectiva de ISR empresarial SOBRE LA UTILIDAD, p. ej. 0.30. */
  readonly tasaIsrEmpresarial: number;
}

/** Tasas oficiales de RESICO persona fisica (LIF, sobre ingresos cobrados sin IVA). */
export const TASAS_RESICO: ReadonlyArray<number> = [0.01, 0.011, 0.015, 0.02, 0.025];

export interface ResultadoCostoProducto {
  readonly subtotalDirectos: Money;
  readonly subtotalIndirectos: Money;
  readonly costoTotal: Money;
  /** Costo + utilidad deseada, antes de terminal e IVA. */
  readonly baseObjetivo: Money;
  /** Lo que queda tras cubrir el costo, antes de ISR (baseCobrada - costo). */
  readonly utilidadBruta: Money;
  /** Base cobrada sin IVA (incluye el recupero de la comision de terminal). */
  readonly precioBase: Money;
  readonly ivaMonto: Money;
  /** Total con IVA que paga el cliente. */
  readonly precioFinal: Money;
  readonly isrResico: Money;
  /** Tu bolsillo en RESICO: utilidad bruta menos ISR. */
  readonly netaResico: Money;
  readonly isrEmpresarial: Money;
  /** Tu bolsillo en actividad empresarial: utilidad bruta menos ISR. */
  readonly netaEmpresarial: Money;
  /** Utilidad sobre precio base cobrado. */
  readonly margenReal: Rate;
  /** Utilidad sobre costo. */
  readonly markupReal: Rate;
}

function validarDirectos(raw: CostosDirectos): CostosDirectos {
  const out: Record<string, number> = {};
  for (const k of ["materiaPrima", "empaque", "manoObra", "envioInsumos", "mermas"] as const) {
    out[k] = unwrap(parseNonNegative(k, (raw as unknown as Record<string, unknown>)[k]));
  }
  return out as unknown as CostosDirectos;
}

function validarIndirectos(raw: CostosIndirectos): CostosIndirectos {
  const out: Record<string, number> = {};
  for (const k of ["renta", "servicios", "software", "marketing", "administracion", "desgasteEquipo"] as const) {
    out[k] = unwrap(parseNonNegative(k, (raw as unknown as Record<string, unknown>)[k]));
  }
  return out as unknown as CostosIndirectos;
}

function validarTasa01(campo: string, n: unknown): number {
  const v = unwrap(parseNonNegative(campo, n));
  if (v > 1) throw new Error(`${campo} debe estar entre 0 y 1 (tanto por uno), recibido: ${n}`);
  return v;
}

function validarParametros(raw: ParametrosVenta): ParametrosVenta {
  const iva = validarTasa01("iva", raw.iva);
  const terminalPct = unwrap(parseNonNegative("terminalPct", raw.terminalPct));
  if (terminalPct >= 1)
    throw new Error(`terminalPct debe ser menor que 1 (100% de comision no deja nada por cobrar)`);
  const terminalFija = unwrap(parseNonNegative("terminalFija", raw.terminalFija));
  if (!TASAS_RESICO.includes(raw.tasaResico))
    throw new Error(
      `tasaResico debe ser una tasa oficial (${TASAS_RESICO.map((t) => `${t * 100}%`).join(", ")}), recibido: ${String(raw.tasaResico)}`,
    );
  const tasaIsrEmpresarial = validarTasa01("tasaIsrEmpresarial", raw.tasaIsrEmpresarial);
  return { iva, terminalPct, terminalFija, tasaResico: raw.tasaResico, tasaIsrEmpresarial };
}

export function sumarDirectos(raw: CostosDirectos): Money {
  const d = validarDirectos(raw);
  return toMoney(d.materiaPrima + d.empaque + d.manoObra + d.envioInsumos + d.mermas);
}

export function sumarIndirectos(raw: CostosIndirectos): Money {
  const c = validarIndirectos(raw);
  return toMoney(c.renta + c.servicios + c.software + c.marketing + c.administracion + c.desgasteEquipo);
}

/** Base objetivo (costo + utilidad) segun el modo. Tasa en tanto por uno. */
export function calcularBaseObjetivo(costoTotal: number, modo: ModoUtilidad, tasa: number): Money {
  const costo = unwrap(parseNonNegative("costoTotal", costoTotal));
  if (modo !== "markup" && modo !== "margen") throw new Error(`modo debe ser "markup" o "margen"`);
  const k = unwrap(parseNonNegative("tasa utilidad", tasa));
  if (modo === "markup") return toMoney(costo * (1 + k));
  if (k >= 1) throw new Error("margen debe ser menor que 1 (100% del precio seria precio infinito)");
  return toMoney(costo / (1 - k));
}

/**
 * Calculo integral de costo de producto.
 * Tasa de utilidad en tanto por uno (0.5 = 50%).
 */
export function calcularCostoProducto(
  directos: CostosDirectos,
  indirectos: CostosIndirectos,
  modo: ModoUtilidad,
  tasaUtilidad: number,
  params: ParametrosVenta,
): ResultadoCostoProducto {
  const subtotalDirectos = sumarDirectos(directos);
  const subtotalIndirectos = sumarIndirectos(indirectos);
  const costoTotal = toMoney(subtotalDirectos + subtotalIndirectos);
  const p = validarParametros(params);
  const baseObjetivo = calcularBaseObjetivo(costoTotal, modo, tasaUtilidad);
  // La terminal cobra sobre el TOTAL con IVA: P - t*P - fija = base*(1+iva).
  const precioFinal = toMoney((baseObjetivo * (1 + p.iva) + p.terminalFija) / (1 - p.terminalPct));
  const precioBase = toMoney(precioFinal / (1 + p.iva));
  const ivaMonto = toMoney(precioFinal - precioBase);
  const utilidadBruta = toMoney(precioBase - costoTotal);
  const isrResico = toMoney(precioBase * p.tasaResico);
  const isrEmpresarial = toMoney(utilidadBruta * p.tasaIsrEmpresarial);
  return {
    subtotalDirectos,
    subtotalIndirectos,
    costoTotal,
    baseObjetivo,
    utilidadBruta,
    precioBase,
    ivaMonto,
    precioFinal,
    isrResico,
    netaResico: toMoney(utilidadBruta - isrResico),
    isrEmpresarial,
    netaEmpresarial: toMoney(utilidadBruta - isrEmpresarial),
    margenReal: toRate(precioBase > 0 ? utilidadBruta / precioBase : 0),
    markupReal: toRate(costoTotal > 0 ? utilidadBruta / costoTotal : 0),
  };
}

/** Monto fijo en dinero o porcentaje sobre una base. */
export type ModoMonto = "fijo" | "pct";

/** Una linea de costo que se escribe en $ o en % (0 a 100). */
export interface LineaCosto {
  readonly monto: number;
  readonly modo: ModoMonto;
}

/** Directos donde solo la merma acepta % (sobre la suma de los otros directos). */
export interface DirectosFlex {
  readonly materiaPrima: number;
  readonly empaque: number;
  readonly manoObra: number;
  readonly envioInsumos: number;
  readonly merma: LineaCosto;
}

/** Todos los indirectos aceptan % (sobre el subtotal de directos ya resuelto). */
export type IndirectosFlex = { readonly [K in keyof CostosIndirectos]: LineaCosto };

function validarPct(campo: string, n: unknown): number {
  const v = unwrap(parseNonNegative(campo, n));
  if (v > 100) throw new Error(`${campo} debe estar entre 0 y 100 (%), recibido: ${n}`);
  return v;
}

/** Resuelve una linea a dinero: % de la base o monto fijo. */
export function resolverLinea(campo: string, linea: LineaCosto, base: number): Money {
  const b = unwrap(parseNonNegative("base", base));
  if (linea.modo !== "fijo" && linea.modo !== "pct")
    throw new Error(`modo debe ser "fijo" o "pct", recibido: ${String(linea.modo)}`);
  if (linea.modo === "pct") return toMoney((b * validarPct(campo, linea.monto)) / 100);
  return toMoney(unwrap(parseNonNegative(campo, linea.monto)));
}

/** Resuelve los directos: la merma en % se calcula sobre los otros directos. */
export function resolverDirectos(raw: DirectosFlex): { directos: CostosDirectos; baseMerma: Money } {
  const fijos = {
    materiaPrima: unwrap(parseNonNegative("materiaPrima", raw.materiaPrima)),
    empaque: unwrap(parseNonNegative("empaque", raw.empaque)),
    manoObra: unwrap(parseNonNegative("manoObra", raw.manoObra)),
    envioInsumos: unwrap(parseNonNegative("envioInsumos", raw.envioInsumos)),
  };
  const baseMerma = toMoney(fijos.materiaPrima + fijos.empaque + fijos.manoObra + fijos.envioInsumos);
  const mermas = resolverLinea("mermas", raw.merma, baseMerma);
  return { directos: { ...fijos, mermas }, baseMerma };
}

/** Resuelve los indirectos: cada % se calcula sobre el subtotal de directos. */
export function resolverIndirectos(raw: IndirectosFlex, baseDirectos: number): CostosIndirectos {
  const b = unwrap(parseNonNegative("baseDirectos", baseDirectos));
  const out: Record<string, number> = {};
  for (const k of ["renta", "servicios", "software", "marketing", "administracion", "desgasteEquipo"] as const) {
    out[k] = resolverLinea(k, raw[k], b);
  }
  return out as unknown as CostosIndirectos;
}

/** Costo por hora de servicio: sueldo meta + gastos del mes entre horas facturables. */
export function calcularCostoHora(sueldoMensual: number, gastosFijos: number, horasFacturables: number): Money {
  const sueldo = unwrap(parseNonNegative("sueldoMensual", sueldoMensual));
  const gastos = unwrap(parseNonNegative("gastosFijos", gastosFijos));
  const horas = unwrap(parseNonNegative("horasFacturables", horasFacturables));
  if (horas <= 0) throw new Error("horasFacturables debe ser mayor que cero");
  return toMoney((sueldo + gastos) / horas);
}

/** Un renglon de receta: cantidad usada por precio unitario. */
export interface InsumoReceta {
  readonly cantidad: number;
  readonly precioUnitario: number;
}

export interface ResultadoReceta {
  readonly subtotal: Money;
  readonly merma: Money;
  readonly total: Money;
  /** Costo por pieza o porcion que rinde la receta. */
  readonly costoPorUnidad: Money;
}

/** Costea una receta: suma insumos, aplica merma % y divide entre lo que rinde. */
export function calcularReceta(insumos: ReadonlyArray<InsumoReceta>, mermaPct: number, unidadesRinde: number): ResultadoReceta {
  if (insumos.length === 0) throw new Error("la receta necesita al menos un insumo");
  let subtotal = 0;
  for (const ins of insumos) {
    const cant = unwrap(parseNonNegative("cantidad", ins.cantidad));
    const precio = unwrap(parseNonNegative("precioUnitario", ins.precioUnitario));
    subtotal += cant * precio;
  }
  const merma = toMoney((subtotal * validarPct("mermaPct", mermaPct)) / 100);
  const total = toMoney(subtotal + merma);
  const unidades = unwrap(parseNonNegative("unidadesRinde", unidadesRinde));
  if (unidades <= 0) throw new Error("unidadesRinde debe ser mayor que cero");
  return { subtotal: toMoney(subtotal), merma, total, costoPorUnidad: toMoney(total / unidades) };
}

/** Valida sin lanzar: util para puentes hacia la UI. */
export function intentarCostoProducto(
  directos: CostosDirectos,
  indirectos: CostosIndirectos,
  modo: ModoUtilidad,
  tasaUtilidad: number,
  params: ParametrosVenta,
): Result<ResultadoCostoProducto> {
  try {
    return ok(calcularCostoProducto(directos, indirectos, modo, tasaUtilidad, params));
  } catch (e) {
    return err(e instanceof Error ? e.message : String(e));
  }
}
