import { defineConfig } from "astro/config";
import react from "@astrojs/react";

/**
 * Parse-don't-validate: single smart constructor for the deploy base path.
 * Accepts "/repo/", "repo", "repo/" or "" (local dev without subpath) and
 * always returns a normalized base with leading AND trailing slash.
 * Throws on anything that is not a safe URL path segment (fail fast at
 * build time instead of shipping a blank page to GitHub Pages).
 * @param {string | undefined} input
 * @returns {string}
 */
function normalizeBase(input) {
  const raw = (input ?? "").trim().replace(/^\/+|\/+$/g, "");
  if (raw === "") return "/";
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(raw)) {
    throw new Error(
      `Invalid ASTRO_BASE "${input}". Use a single path segment like "/business-feasibility-toolkit/".`,
    );
  }
  return `/${raw}/`;
}

// 12-Factor III (config in the environment): the repo default is baked in,
// but CI or local dev can override via ASTRO_BASE without touching code.
const base = normalizeBase(
  process.env.ASTRO_BASE ?? "/business-feasibility-toolkit/",
);

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: "https://dinoesau.github.io",
  base,
  output: "static",
  integrations: [react()],
});
