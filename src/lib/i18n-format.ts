/**
 * i18n ES/EN: diccionario de etiquetas + formato de moneda/porcentaje por locale.
 * Locales: es -> es-MX/MXN, en -> en-US/USD. Puro, sin DOM.
 */
import { formatMXN, formatPct } from "./format";

export type Locale = "es" | "en";

const LOCALE_INTL: Record<Locale, string> = { es: "es-MX", en: "en-US" };
const MONEDA: Record<Locale, string> = { es: "MXN", en: "USD" };

const DICCIONARIO = {
  tam: { es: "Mercado total (TAM)", en: "Total market (TAM)" },
  sam: { es: "Mercado alcanzable (SAM)", en: "Serviceable market (SAM)" },
  som: { es: "Mercado obtenible (SOM)", en: "Obtainable market (SOM)" },
  puntoEquilibrio: { es: "Punto de equilibrio", en: "Break-even point" },
  van: { es: "Valor actual neto", en: "Net present value" },
  tir: { es: "Tasa interna de retorno", en: "Internal rate of return" },
  pri: { es: "Periodo de recuperacion", en: "Payback period" },
  roi: { es: "Retorno de inversion", en: "Return on investment" },
  cac: { es: "Costo de adquisicion de cliente", en: "Customer acquisition cost" },
  ltv: { es: "Valor de vida del cliente", en: "Customer lifetime value" },
  flujoCaja: { es: "Flujo de caja", en: "Cash flow" },
  utilidad: { es: "Utilidad", en: "Profit" },
  escenarioPesimista: { es: "Pesimista", en: "Pessimistic" },
  escenarioBase: { es: "Base", en: "Base case" },
  escenarioOptimista: { es: "Optimista", en: "Optimistic" },
} as const;

export type ClaveI18n = keyof typeof DICCIONARIO;

/** Traduce una clave al locale dado. Lanza si la clave o el locale son invalidos. */
export function t(locale: Locale, clave: ClaveI18n): string {
  if (locale !== "es" && locale !== "en") throw new Error(`locale invalido: ${String(locale)} (usa "es" o "en")`);
  const entrada = DICCIONARIO[clave];
  if (entrada === undefined) throw new Error(`clave i18n desconocida: ${String(clave)}`);
  return entrada[locale];
}

/** Moneda segun locale: es -> MXN, en -> USD. */
export function formatMoneda(locale: Locale, valor: number): string {
  if (locale !== "es" && locale !== "en") throw new Error(`locale invalido: ${String(locale)}`);
  if (locale === "es") return formatMXN(valor, LOCALE_INTL[locale]);
  if (!Number.isFinite(valor)) throw new Error(`valor debe ser un numero finito, recibido: ${valor}`);
  return new Intl.NumberFormat(LOCALE_INTL[locale], {
    style: "currency",
    currency: MONEDA[locale],
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}

/** Porcentaje segun locale. */
export function formatPorcentaje(locale: Locale, tasa: number, decimales = 1): string {
  if (locale !== "es" && locale !== "en") throw new Error(`locale invalido: ${String(locale)}`);
  return formatPct(tasa, decimales, LOCALE_INTL[locale]);
}

/** Detecta locale desde env APP_LOCALE ("es"/"en", defecto "es"). */
export function localePorDefecto(): Locale {
  const raw = typeof process !== "undefined" ? process.env["APP_LOCALE"] : undefined;
  return raw === "en" ? "en" : "es";
}
