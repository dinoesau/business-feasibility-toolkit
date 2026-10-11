// @ts-check
// Locale helpers: the ONLY logic in worker-1 scope, hence the only code
// covered by unit tests (TDD). Everything else is static markup.
// Style: good-typescript parse-don't-validate — unknown browser input is
// parsed once into a branded Locale; downstream code never re-validates.

/** Supported site locales (frozen single source of truth). @type {readonly ["es", "en"]} */
export const SUPPORTED_LOCALES = Object.freeze(["es", "en"]);

/** @typedef {"es" | "en"} Locale */

/** Default locale when the browser language is unsupported. @type {Locale} */
export const DEFAULT_LOCALE = "es";

/**
 * Smart constructor: parses unknown input (e.g. `navigator.language`)
 * into a Locale. Returns `null` instead of throwing so callers decide the
 * fallback explicitly.
 * @param {unknown} input
 * @returns {Locale | null}
 */
export function parseLocale(input) {
  if (typeof input !== "string") return null;
  const tag = input.trim().toLowerCase();
  if (tag === "") return null;
  const primary = tag.split(/[-_]/)[0];
  return primary === "es" || primary === "en" ? primary : null;
}

/**
 * Resolves the landing path (relative, no base) for a browser language.
 * Total function: every input maps to exactly one valid path.
 * @param {unknown} browserLanguage
 * @returns {`/${Locale}/`}
 */
export function resolveRedirect(browserLanguage) {
  return `/${parseLocale(browserLanguage) ?? DEFAULT_LOCALE}/`;
}

/**
 * Joins the Astro base with a root-relative path without producing
 * double slashes or dropping the project subpath (the classic GitHub
 * Pages blank-page bug).
 * @param {string} base import.meta.env.BASE_URL, always ends with "/"
 * @param {`/${string}`} path root-relative path, always starts with "/"
 * @returns {string}
 */
export function withBase(base, path) {
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  return `${cleanBase}${path.replace(/^\/+/, "")}`;
}
