/**
 * Formato numerico puro (sin DOM): MXN, porcentajes y numeros.
 * 12-Factors: el locale por defecto sale de env (III-config), con fallback es-MX.
 */
function numeroFinito(campo: string, n: number): number {
  if (!Number.isFinite(n)) throw new Error(`${campo} debe ser un numero finito, recibido: ${n}`);
  return n;
}

/** $1,234.50 con locale es-MX por defecto. */
export function formatMXN(valor: number, locale?: string): string {
  const v = numeroFinito("valor", valor);
  return new Intl.NumberFormat(locale ?? defaultLocale(), {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(v);
}

/** 0.156 -> "15.6%". Decimales configurables (defecto 1). */
export function formatPct(tasa: number, decimales = 1, locale?: string): string {
  const t = numeroFinito("tasa", tasa);
  if (!Number.isInteger(decimales) || decimales < 0 || decimales > 10)
    throw new Error(`decimales debe ser un entero entre 0 y 10, recibido: ${decimales}`);
  return new Intl.NumberFormat(locale ?? defaultLocale(), {
    style: "percent",
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(t);
}

/** 1234567.5 -> "1,234,567.5" (agrupado, sin moneda). */
export function formatNumero(valor: number, decimales = 0, locale?: string): string {
  const v = numeroFinito("valor", valor);
  if (!Number.isInteger(decimales) || decimales < 0 || decimales > 10)
    throw new Error(`decimales debe ser un entero entre 0 y 10, recibido: ${decimales}`);
  return new Intl.NumberFormat(locale ?? defaultLocale(), {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  }).format(v);
}

/** Abrevia miles/millones: 1_680_000 -> "$1.68 M". Util para TAM/SAM/SOM. */
export function formatAbreviado(valor: number, moneda = "$"): string {
  const v = numeroFinito("valor", valor);
  const abs = Math.abs(v);
  const signo = v < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${signo}${moneda}${(abs / 1_000_000_000).toFixed(2)} B`;
  if (abs >= 1_000_000) return `${signo}${moneda}${(abs / 1_000_000).toFixed(2)} M`;
  if (abs >= 1_000) return `${signo}${moneda}${(abs / 1_000).toFixed(1)} K`;
  return `${signo}${moneda}${abs.toFixed(0)}`;
}

/** Locale por defecto: env FORMAT_LOCALE o es-MX. Nunca toca el DOM. */
export function defaultLocale(): string {
  const fromEnv =
    typeof process !== "undefined" ? (process.env["FORMAT_LOCALE"] as string | undefined) : undefined;
  return fromEnv ?? "es-MX";
}
