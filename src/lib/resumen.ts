/**
 * Datos puros del formulario de resumen ejecutivo (sin DOM).
 * Espejo de las 11 secciones de `templates/latex/03-resumen-ejecutivo/`.
 */

export interface ResumenDatos {
  empresa: string;
  fecha: string;
  contacto: string;
  apertura: string;
  problema: string;
  solucion: string;
  modelo: string;
  mercado: string;
  equipo: string;
  roadmap: string;
  financiamiento: string;
  proyecciones: string;
  riesgos: string;
  cierre: string;
}

export const RESUMEN_CAMPOS: Array<keyof ResumenDatos> = [
  "empresa",
  "fecha",
  "contacto",
  "apertura",
  "problema",
  "solucion",
  "modelo",
  "mercado",
  "equipo",
  "roadmap",
  "financiamiento",
  "proyecciones",
  "riesgos",
  "cierre",
];

/** Total: nunca lanza, cuenta secciones con texto no vacio. */
export function contarSeccionesLlenas(datos: Partial<ResumenDatos>): number {
  return RESUMEN_CAMPOS.filter((k) => (datos[k] ?? "").trim() !== "").length;
}

/** Listo para PDF cuando las 11 secciones de contenido + empresa estan llenas. */
export function estaListoParaPdf(datos: Partial<ResumenDatos>): boolean {
  const contenido: Array<keyof ResumenDatos> = [
    "apertura",
    "problema",
    "solucion",
    "modelo",
    "mercado",
    "equipo",
    "roadmap",
    "financiamiento",
    "proyecciones",
    "riesgos",
    "cierre",
  ];
  return (
    (datos.empresa ?? "").trim() !== "" &&
    contenido.every((k) => (datos[k] ?? "").trim() !== "")
  );
}

export function resumenVacio(): ResumenDatos {
  return {
    empresa: "",
    fecha: "",
    contacto: "",
    apertura: "",
    problema: "",
    solucion: "",
    modelo: "",
    mercado: "",
    equipo: "",
    roadmap: "",
    financiamiento: "",
    proyecciones: "",
    riesgos: "",
    cierre: "",
  };
}
