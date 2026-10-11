/**
 * TAM / SAM / SOM + funnel de conversion.
 * Formulas:
 *   TAM = poblacion x ticketPromedio x frecuenciaAnual
 *   SAM = TAM x samShare
 *   SOM = SAM x somShare
 *   Funnel: clientesFinales = potenciales x Π(etapas), cada etapa en [0,1].
 */
import type { Money, Result } from "./result";
import { ok, parseCount, parseNonNegative, parseRate01, unwrap } from "./result";

export interface TamMercado {
  readonly poblacion: number;
  readonly ticketPromedio: number;
  readonly frecuenciaAnual: number;
}

export interface TamInputs extends TamMercado {
  readonly samShare: number;
  readonly somShare: number;
}

export interface TamResultado {
  readonly tam: Money;
  readonly sam: Money;
  readonly som: Money;
}

export interface FunnelResultado {
  readonly clientesFinales: number;
  readonly detallePorEtapa: readonly number[];
}

/** Smart constructor: valida todo el input de una vez, retorna Result. */
export function crearTamInputs(raw: {
  poblacion: unknown;
  ticketPromedio: unknown;
  frecuenciaAnual: unknown;
  samShare: unknown;
  somShare: unknown;
}): Result<TamInputs> {
  const poblacion = parseCount("poblacion", raw.poblacion);
  if (!poblacion.ok) return poblacion as Result<TamInputs>;
  const ticket = parseNonNegative("ticketPromedio", raw.ticketPromedio);
  if (!ticket.ok) return ticket as Result<TamInputs>;
  const frecuencia = parseNonNegative("frecuenciaAnual", raw.frecuenciaAnual);
  if (!frecuencia.ok) return frecuencia as Result<TamInputs>;
  const sam = parseRate01("samShare", raw.samShare);
  if (!sam.ok) return sam as Result<TamInputs>;
  const som = parseRate01("somShare", raw.somShare);
  if (!som.ok) return som as Result<TamInputs>;
  return ok({
    poblacion: unwrap(poblacion),
    ticketPromedio: unwrap(ticket),
    frecuenciaAnual: unwrap(frecuencia),
    samShare: unwrap(sam),
    somShare: unwrap(som),
  });
}

export function calcularTAM(mercado: TamMercado): Money {
  const poblacion = unwrap(parseCount("poblacion", mercado.poblacion));
  const ticket = unwrap(parseNonNegative("ticketPromedio", mercado.ticketPromedio));
  const frecuencia = unwrap(parseNonNegative("frecuenciaAnual", mercado.frecuenciaAnual));
  return (poblacion * ticket * frecuencia) as Money;
}

export function calcularSAM(tam: number, samShare: number): Money {
  const t = unwrap(parseNonNegative("tam", tam));
  const s = unwrap(parseRate01("samShare", samShare));
  return (t * s) as Money;
}

export function calcularSOM(sam: number, somShare: number): Money {
  const s = unwrap(parseNonNegative("sam", sam));
  const o = unwrap(parseRate01("somShare", somShare));
  return (s * o) as Money;
}

export function calcularTamSamSom(inputs: TamInputs): TamResultado {
  const tam = calcularTAM(inputs);
  const sam = calcularSAM(tam, inputs.samShare);
  const som = calcularSOM(sam, inputs.somShare);
  return { tam, sam, som };
}

/** Aplica el funnel: cada etapa es la fraccion que sobrevive (0-1). */
export function aplicarFunnel(clientesPotenciales: number, etapas: readonly number[]): FunnelResultado {
  if (etapas.length === 0) throw new Error("etapas no puede estar vacio");
  const base = unwrap(parseCount("clientesPotenciales", clientesPotenciales));
  const detalle: number[] = [];
  let actual = base;
  for (let i = 0; i < etapas.length; i++) {
    const tasa = unwrap(parseRate01(`etapas[${i}]`, etapas[i]));
    actual = actual * tasa;
    detalle.push(actual);
  }
  return { clientesFinales: actual, detallePorEtapa: detalle };
}
