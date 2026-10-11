export type Seccion = "inicio" | "calculadoras" | "guia" | "plantillas" | null;

// Tabla única segmento -> sección (evita ifs repetidos por idioma).
const SEGMENTO_A_SECCION: Readonly<Record<string, Exclude<Seccion, null>>> = {
  calculadoras: "calculadoras",
  calculators: "calculadoras",
  guia: "guia",
  guide: "guia",
  ficha: "guia",
  "idea-sheet": "guia",
  plantillas: "plantillas",
  templates: "plantillas",
};

// Función pura: sin entorno, sin DOM, sin mutación de entradas.
export function seccionActiva(pathname: string, base: string, lang: "es" | "en"): Seccion {
  const ruta = sinQueryHash(aseguraBarraInicial(pathname));
  const baseNorm = normalizaBase(base);
  const restoBase = restoTrasBase(ruta, baseNorm);
  if (restoBase === null) return null;
  if (restoBase === "/") return "inicio";
  const restoLang = restoTrasLang(restoBase, lang);
  if (restoLang === null) return null;
  const segmentos: string[] = restoLang.split("/").filter((s) => s.length > 0);
  const primero: string | undefined = segmentos[0];
  if (primero === undefined) return "inicio";
  return SEGMENTO_A_SECCION[primero] ?? null;
}

function sinQueryHash(path: string): string {
  const q = path.indexOf("?");
  const h = path.indexOf("#");
  const corte = [q, h].filter((i) => i >= 0);
  if (corte.length === 0) return path;
  return path.slice(0, Math.min(...corte));
}

function aseguraBarraInicial(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

// "/bt/" -> "/bt"; "/" -> "/"; "" -> "/".
function normalizaBase(base: string): string {
  if (base === "") return "/";
  const conBarra = aseguraBarraInicial(base);
  if (conBarra === "/") return "/";
  return conBarra.replace(/\/+$/, "");
}

// Devuelve el resto tras quitar el prefijo base, o null si fuera de base.
function restoTrasBase(ruta: string, baseNorm: string): string | null {
  if (baseNorm === "/") return ruta;
  if (ruta === baseNorm) return "/";
  if (ruta.startsWith(`${baseNorm}/`)) return ruta.slice(baseNorm.length);
  return null;
}

// Quita "/{lang}" del resto; null si el idioma no coincide.
function restoTrasLang(restoBase: string, lang: "es" | "en"): string | null {
  if (restoBase === `/${lang}`) return "/";
  if (restoBase.startsWith(`/${lang}/`)) return restoBase.slice(`/${lang}`.length);
  return null;
}
