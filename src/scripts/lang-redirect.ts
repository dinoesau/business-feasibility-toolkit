// Client redirect script, bundled by Astro via `<script src=...>`, so the
// tested parse logic in ../lib/locale.js is the single source of truth
// (no copy-pasted regex in markup — anti spaghetti-config).
import { resolveRedirect, withBase } from "../lib/locale.js";

const target = withBase(
  import.meta.env.BASE_URL,
  resolveRedirect(navigator.language),
);
// `replace` keeps the selector page out of the back-button history.
window.location.replace(target);
