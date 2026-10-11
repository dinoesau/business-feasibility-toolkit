# Paginas de plantillas (contenido listo para Astro)

No existe base `src/pages/` en el repo (2026-10-11), asi que este archivo es
la lista oficial de archivos + el copy ES/EN listo para pegar cuando otro
worker cree el sitio Astro (`https://dinoesau.github.io/business-feasibility-toolkit/`,
bilingue ES/EN).

## Lista de archivos servidos (base: `/plantillas/`)

| Archivo | Descripcion |
|---------|-------------|
| `01-estudio-factibilidad-es.zip` | Estudio de factibilidad (ES, article) |
| `01-estudio-factibilidad-en.zip` | Feasibility study (EN, article) |
| `02-plan-negocios-es.zip` | Plan de negocios (ES, article) |
| `02-plan-negocios-en.zip` | Business plan (EN, article) |
| `03-resumen-ejecutivo-es.zip` | Resumen ejecutivo 2 paginas (ES) |
| `03-resumen-ejecutivo-en.zip` | Executive summary 2 pages (EN) |
| `04-pitch-deck-es.zip` | Pitch deck 12 slides (ES, beamer) |
| `04-pitch-deck-en.zip` | Pitch deck 12 slides (EN, beamer) |
| `muestra-resumen-ejecutivo-es.pdf` | PDF de muestra compilado (TeX Live 2026) |
| `manifest.json` | Indice maquina de los zips (para render dinamico) |

Fuentes LaTeX: `templates/latex/`. Compilacion y reempaquetado:
`cd templates/latex && make latex && make zip-overleaf`.

## Pagina ES — `src/pages/es/plantillas.astro` (copy listo)

Titulo: **Plantillas LaTeX** — Subtitulo: *Overleaf-ready y compilables con
latexmk. Bilingues ES/EN.*

1. **Estudio de factibilidad** — Mercado, tecnico-operativo, legal MX,
   organizacional, financiero (VAN/TIR), ambiental-social, riesgos y matriz
   Go/No-Go. [Descargar ES] [Download EN]
2. **Plan de negocios** — Estructura SBA + SCORE + narrativa Sequoia: TAM/SAM/SOM,
   modelo de negocio, roadmap, financiamiento y proyecciones. [Descargar ES] [Download EN]
3. **Resumen ejecutivo (2 paginas)** — Pagina 1 narrativa de valor, pagina 2
   datos y solicitud. Limite de 2 paginas intencional. [Descargar ES] [Download EN]
   + [Ver PDF muestra]
4. **Pitch deck (12 slides, beamer)** — Sequoia + Kawasaki 10/20/30: problema,
   solucion, por que ahora, mercado, equipo, finanzas y solicitud. [Descargar ES] [Download EN]

Nota al pie: *Suba el ZIP a Overleaf (New Project → Upload), elija el
`main-*.tex` como Main document y recompile. Ver
`templates/latex/README-overleaf.md`.*

## Pagina EN — `src/pages/en/templates.astro` (copy listo)

Title: **LaTeX Templates** — Subtitle: *Overleaf-ready, latexmk-buildable.
Bilingual ES/EN.*

1. **Feasibility study** — Market, technical-operational, MX legal,
   organizational, financial (NPV/IRR), environmental-social, risks and a
   Go/No-Go matrix. [Descargar ES] [Download EN]
2. **Business plan** — SBA + SCORE + Sequoia narrative: TAM/SAM/SOM, business
   model, roadmap, funding and projections. [Descargar ES] [Download EN]
3. **Executive summary (2 pages)** — Page 1 value narrative, page 2 figures
   and ask. 2-page limit is intentional. [Descargar ES] [Download EN]
   + [View sample PDF]
4. **Pitch deck (12 slides, beamer)** — Sequoia + Kawasaki 10/20/30: problem,
   solution, why now, market, team, financials and ask. [Descargar ES] [Download EN]

Footnote: *Upload the ZIP to Overleaf (New Project → Upload), set the
`main-*.tex` as Main document and recompile. See
`templates/latex/README-overleaf.md`.*
