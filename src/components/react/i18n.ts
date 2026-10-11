// Shared i18n + formatting + form primitives for all calculators.
// TODO(lib): when src/lib/* exists, re-export locale/format helpers from there
// and keep these as thin aliases. Local interfaces below are intentionally
// identical to the planned lib types so the swap is mechanical.
export type Lang = 'es' | 'en';

export function localeOf(lang: Lang): string {
  return lang === 'es' ? 'es-MX' : 'en-US';
}

export function defaultCurrency(lang: Lang): string {
  return lang === 'es' ? 'MXN' : 'USD';
}

export function formatCurrency(value: number, lang: Lang, currency?: string): string {
  if (!Number.isFinite(value)) return '—';
  const cur = currency ?? defaultCurrency(lang);
  try {
    return new Intl.NumberFormat(localeOf(lang), {
      style: 'currency',
      currency: cur,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return String(Math.round(value));
  }
}

export function formatNumber(value: number, lang: Lang, decimals = 0): string {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(localeOf(lang), {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, lang: Lang, decimals = 1): string {
  if (!Number.isFinite(value)) return '—';
  return new Intl.NumberFormat(localeOf(lang), {
    style: 'percent',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

/** Total function: never throws, returns NaN on invalid input. */
export function parseNum(raw: string): number {
  if (typeof raw !== 'string') return NaN;
  const cleaned = raw.trim().replace(/[$,\s]/g, '').replace(/%/g, '');
  if (cleaned === '') return NaN;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

export const t = {
  required: { es: 'Requerido', en: 'Required' },
  mustBeNumber: { es: 'Debe ser un número', en: 'Must be a number' },
  mustBePositive: { es: 'Debe ser mayor que 0', en: 'Must be greater than 0' },
  mustBeNonNegative: { es: 'Debe ser 0 o mayor', en: 'Must be 0 or greater' },
} as const;

export function validateNumber(
  raw: string,
  lang: Lang,
  opts: { allowZero?: boolean; min?: number; max?: number } = {},
): string | null {
  const dict = (d: { es: string; en: string }) => d[lang];
  if (raw.trim() === '') return dict(t.required);
  const n = parseNum(raw);
  if (!Number.isFinite(n)) return dict(t.mustBeNumber);
  const min = opts.min ?? (opts.allowZero === false ? 0 : undefined);
  if (opts.allowZero === false && n <= 0) return dict(t.mustBePositive);
  if (min !== undefined && n < min) return dict(t.mustBeNonNegative);
  if (opts.max !== undefined && n > opts.max)
    return lang === 'es' ? `Debe ser ≤ ${opts.max}` : `Must be ≤ ${opts.max}`;
  return null;
}
