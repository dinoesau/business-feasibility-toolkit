#!/usr/bin/env node
/**
 * check-base-links.mjs — XII admin task (12-Factor).
 *
 * Detecta links raiz-absolutos (`href="/..."`, `src="/..."`) que rompen
 * en GitHub Pages bajo subpath `/business-feasibility-toolkit/`.
 *
 * Uso:
 *   node scripts/check-base-links.mjs [--dir dist] [--base /business-feasibility-toolkit/] [--self-test]
 *
 * Reglas:
 *   MALO: href="/calculadora" | src="/logo.svg" | action="/submit" | url(/fondo.png)
 *   BUENO: href="/business-feasibility-toolkit/calculadora"
 *          href={`${import.meta.env.BASE_URL}calculadora`}
 *          href={import.meta.env.BASE_URL + "calculadora"}
 *          href="./calculadora" | href="#seccion" | href="https://..."
 *
 * Exit codes: 0 limpio, 1 violaciones, 2 error de uso/IO.
 * Sin dependencias (12-Factor: paridad dev/CI sin installs extra).
 */

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const SITE = "https://dinoesau.github.io";
const DEFAULT_BASE = "/business-feasibility-toolkit/";
const DEFAULT_DIR = "dist";

const SCAN_EXTS = new Set([".html", ".astro", ".tsx", ".jsx", ".ts", ".js", ".mjs", ".css"]);

// href="/..." | src="/..." | action="/..." | srcset="/..." (con comilla simple/doble)
// url(/...) en CSS (con o sin comillas)
const BAD_PATTERNS = [
  { name: "href-root", re: /(href\s*=\s*["'])\/(?!\/)/g },
  { name: "src-root", re: /(src\s*=\s*["'])\/(?!\/)/g },
  { name: "action-root", re: /(action\s*=\s*["'])\/(?!\/)/g },
  { name: "srcset-root", re: /(srcset\s*=\s*["'])\/(?!\/)/g },
  { name: "css-url-root", re: /(url\(\s*["']?)\/(?!\/)/g },
];

function parseArgs(argv) {
  const out = { dir: DEFAULT_DIR, base: DEFAULT_BASE, selfTest: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dir" && argv[i + 1]) out.dir = argv[++i];
    else if (a === "--base" && argv[i + 1]) out.base = argv[++i];
    else if (a === "--self-test") out.selfTest = true;
    else if (a === "--help" || a === "-h") {
      console.log("Uso: node scripts/check-base-links.mjs [--dir dist] [--base /business-feasibility-toolkit/] [--self-test]");
      process.exit(0);
    } else {
      console.error(`Arg desconocido: ${a}`);
      process.exit(2);
    }
  }
  if (!out.base.endsWith("/")) out.base += "/";
  return out;
}

function walk(dir, files = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, files);
    else if (SCAN_EXTS.has(extname(p))) files.push(p);
  }
  return files;
}

/** Linea permitida si el "/" ya lleva el base o usa BASE_URL. */
function isAllowedMatch(line, matchIndex, base) {
  const after = line.slice(matchIndex, matchIndex + 300);
  if (after.startsWith(base) || after === "/") return true; // href="/" solo es OK si base es "/" (no es nuestro caso, se filtra abajo)
  return false;
}

/** Chequea un archivo, retorna violaciones [{file,line,col,kind,snippet}]. */
export function checkFile(file, base, content = null) {
  const text = content ?? readFileSync(file, "utf8");
  // Excepcion: referencias a import.meta.env.BASE_URL son la forma correcta en Astro -> ignorar el archivo solo para esas lineas.
  const violations = [];
  const lines = text.split("\n");
  lines.forEach((line, idx) => {
    if (line.includes("import.meta.env.BASE_URL") || line.includes("BASE_URL")) return;
    for (const { name, re } of BAD_PATTERNS) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(line)) !== null) {
        const absIndex = m.index + m[1].length;
        const after = line.slice(absIndex, absIndex + base.length + 20);
        // Permitido: ya incluye el base. Todo lo demas (incluido "/" solo) es violacion bajo subpath.
        if (after.startsWith(base.slice(1)) || after.startsWith(base)) continue;
        // Permitido: protocol-relative "//..." ya excluido por (?!\/). Permitido: "/" solo como href raiz? NO bajo Pages -> tambien violacion.
        violations.push({
          file,
          line: idx + 1,
          col: m.index + 1,
          kind: name,
          snippet: line.trim().slice(0, 160),
        });
      }
    }
  });
  return violations;
}

export function checkDir(dir, base) {
  if (!existsSync(dir)) return { missing: true, violations: [] };
  const files = walk(dir);
  const violations = files.flatMap((f) => {
    try {
      return checkFile(f, base);
    } catch {
      return [];
    }
  });
  return { missing: false, files: files.length, violations };
}

function runSelfTest() {
  const base = DEFAULT_BASE;
  const cases = [
    // [contenido, viola?]
    [`<a href="/calculadora">x</a>`, true],
    [`<img src="/logo.svg">`, true],
    [`<form action="/submit">`, true],
    [`<a href="/">home</a>`, true], // raiz sola tambien rompe bajo subpath
    [`.hero{background:url(/fondo.png)}`, true],
    [`<a href="/business-feasibility-toolkit/calculadora">x</a>`, false],
    [`<img src="/business-feasibility-toolkit/logo.svg">`, false],
    [`<a href="./calculadora">x</a>`, false],
    [`<a href="#seccion">x</a>`, false],
    [`<a href="https://example.com/x">x</a>`, false],
    [`<a href={\\\`\\\${import.meta.env.BASE_URL}calculadora\\\`}>x</a>`, false],
    [`<link href="//cdn.example.com/a.css">`, false],
  ];
  let fail = 0;
  cases.forEach(([content, expectBad], i) => {
    const v = checkFile(`case${i}`, base, content);
    const ok = (v.length > 0) === expectBad;
    if (!ok) {
      fail++;
      console.error(`self-test caso ${i} FALLO: esperado viola=${expectBad}, obtenido=${v.length}. Contenido: ${content}`);
    }
  });
  if (fail > 0) {
    console.error(`self-test: ${fail}/${cases.length} fallaron`);
    process.exit(1);
  }
  console.log(`self-test OK (${cases.length}/${cases.length})`);
}

function main() {
  const { dir, base, selfTest } = parseArgs(process.argv);
  if (selfTest) return runSelfTest();

  const res = checkDir(dir, base);
  if (res.missing) {
    console.log(`[check-base-links] Directorio '${dir}' no existe (proyecto Astro base ausente). Nada que chequear.`);
    console.log(`Site: ${SITE} | Base esperada: ${base}`);
    console.log(`Para CI con Pages: corre este script contra 'dist' tras 'npm run build'.`);
    process.exit(0);
  }
  if (res.violations.length === 0) {
    console.log(`[check-base-links] OK: ${res.files} archivos en '${dir}', 0 links raiz sin base. (site ${SITE}, base ${base})`);
    process.exit(0);
  }
  console.error(`[check-base-links] FALLO: ${res.violations.length} links raiz sin base en '${dir}' (base ${base}):`);
  for (const v of res.violations) {
    console.error(`  ${v.file}:${v.line}:${v.col} [${v.kind}] ${v.snippet}`);
  }
  console.error(`\nCorrige usando el base ('${base}...') o import.meta.env.BASE_URL. Ver docs/qa-release.md.`);
  process.exit(1);
}

main();
