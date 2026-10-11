# Research: estructura ideal de las 4 plantillas

Investigacion web obligatoria previa al disenio de `templates/latex/`.
Fuentes consultadas el 2026-10-11 via Tavily Research.

## 1. Estudio de factibilidad (plantilla 01)

Estructura adoptada: resumen ejecutivo + descripcion/alcance/supuestos +
mercado (segmentacion, oferta, demanda, FODA) + tecnico-operativo +
legal + organizacional + financiero (CAPEX/OPEX, flujos, VAN, TIR,
sensibilidad) + ambiental-social (EIA, matriz de impactos) + riesgos
(ISO 31000) + conclusion Go/No-Go ponderada.

Fuentes:

- Institute of Project Management, "What Is a Feasibility Study? A Complete
  Guide (2026)" — https://instituteprojectmanagement.com/blog/what-is-a-feasibility-study
- Institute of Project Management, "Feasibility Study Template: The Complete
  Guide (2026)" — https://instituteprojectmanagement.com/blog/feasibility-study-template
- Fortius Consulting, "A Complete Guide To Financial Feasibility Study" (VAN/TIR) —
  https://www.fortius.consulting/financial-feasibility/how-npv-and-irr-help-in-feasibility-study
- RiskWatch, "Risk Management Process: ISO 31000 Step by Step" —
  https://www.riskwatch.com/risk-management-process
- UAEMex, "Estudio de mercado y factibilidad" (mercado + FODA) —
  http://ri.uaemex.mx/bitstream/20.500.11799/64239/1/secme-23430.pdf?sequence=1&isAllowed=y
- Galorath, "Project Feasibility Study: Assessment, Analysis, and Report Types"
  (marco TELOS) — https://galorath.com/project/feasibility
- Indeed, "How To Write Feasibility Studies" —
  https://www.indeed.com/career-advice/career-development/how-to-write-feasibility-studies

## 2. Plan de negocios (plantilla 02)

Sintesis de tres marcos: SBA (resumen, compania, mercado, productos,
marketing/ventas, organizacion, financiamiento + uso de fondos,
proyecciones 3–5 anios, apendice), SCORE (agrega plan operativo y FODA) y
Sequoia (narrativa: proposito, problema, solucion, por que ahora, mercado,
competencia, producto, modelo, equipo, finanzas).

Fuentes:

- U.S. Small Business Administration, "Write Your Business Plan" —
  https://www.sba.gov/business-guide/plan-your-business/write-your-business-plan
- SCORE, plantilla de plan de negocios —
  https://www.score.org/resource/business-plan-template-startup-business
- Sequoia Capital, "Writing a Business Plan" —
  https://www.sequoiacap.com/article/writing-a-business-plan/

## 3. Resumen ejecutivo de 2 paginas (plantilla 03)

Pagina 1 = narrativa de valor (apertura, problema, solucion, modelo,
mercado/traccion, equipo, roadmap); pagina 2 = datos y cierre
(financiamiento, proyecciones, riesgos, llamado a la accion). Cruza las
secciones SBA con el marco Harvard de 4 elementos (decision, razon,
evidencia, accion), ~500 palabras.

Fuentes:

- SBA Guide, "Write Your Business Plan" — http://sbaguide.org/WriteYourBusinessPlan.html
- The Executive Summary, "Executive Summary: The Ultimate Guide" —
  https://theexecutivesummary.com/frameworks/how-to-write-an-executive-summary
- Xero, "How to write an executive summary for a business plan" —
  https://www.xero.com/us/guides/business-plan-exec-summary
- Coursera, "The Art of Writing a Powerful Executive Summary" —
  https://www.coursera.org/articles/executive-summary
- Azeus Convene, "What is an Executive Summary: Template & Best Practices" —
  https://www.azeusconvene.com/articles/executive-summary

## 4. Pitch deck de 12 slides (plantilla 04, beamer)

12 frames: titulo, proposito, problema, solucion, por que ahora, mercado
(TAM/SAM/SOM), competencia, producto, modelo de negocio, traccion + GTM,
equipo, finanzas y solicitud. Regla Kawasaki 10/20/30 (10 slides base,
20 minutos, fuente 30pt) extendida a 12 con traccion y ask explicitos.

Fuentes:

- Sequoia Capital, "Writing a Business Plan" (plantilla de pitch) —
  https://www.sequoiacap.com/article/writing-a-business-plan/
- Guy Kawasaki, "The Only 10 Slides You Need in Your Pitch" (10/20/30) —
  https://guykawasaki.com/the-only-10-slides-you-need-in-your-pitch/
- Y Combinator, "How to build your seed round pitch deck" —
  https://www.ycombinator.com/library/2u-how-to-build-your-seed-round-pitch-deck

---

# Metodologias aplicadas

## A. 3 Criterios de Aceptacion (Given – When – Then)

| ID | Given | When | Then |
|----|-------|------|------|
| A1 | TeX Live 2024+ con `latexmk` instalado | ejecuto `make latex` en `templates/latex` | los 8 `main-*.tex` compilan sin errores y generan PDF en `build/` |
| A2 | PDF generado por A1 | abro el PDF del resumen ES | tiene exactamente 2 paginas |
| A3 | Proyecto Overleaf nuevo | subo un zip de `public/plantillas/` (Upload Project) y compilo con pdfLaTeX | obtengo el mismo PDF sin errores ni rutas absolutas |
| A4 | Repo clonado en otra maquina | ejecuto `make zip-overleaf` | los 8 zips contienen `common/` + `.latexmkrc` y `manifest.json` queda actualizado |

Verificacion 2026-10-11 (TeX Live 2026, macOS): `make latex` compila los 8
documentos; `make test` genera el PDF prueba; A2 se verifica con `pdfinfo`.

## B. 12 Factors App (II y V)

- **II. Dependencias declaradas**: todas las dependencias viven en
  `common/preambulo.sty` (`\RequirePackage`) y en `.latexmkrc` (motor
  `pdflatex`, modo `-halt-on-error`). Requisito de entorno: TeX Live 2024+
  (documentado en `README-overleaf.md`). Nada implicito, nada global.
- **V. Build reproducible**: `Makefile` separa build (`make latex` →
  `build/*.pdf`) de release (`make zip-overleaf` → `public/plantillas/*.zip`).
  Sin rutas absolutas en ningun `.tex`/`.sty`; solo relativos `../common/`,
  identicos en local y en Overleaf.

## C. Analisis desde las skills

- **tdd**: ciclo red-green-refactor con la compilacion como test.
  `make test` es el test rapido (1 PDF); `make latex` es la suite completa
  (8 PDFs). Primero se escribio el `Makefile` + criterios A1–A4 (red),
  luego las plantillas hasta compilar en verde, luego se compacto el
  resumen a 2 paginas (refactor).
- **bloodhound-antipatterns** (evitados):
  - *God Document* (monolito LaTeX gigante) → `common/` compartido + mains
    delgados por idioma; beamer autocontenido porque otro preambulo le
    romperia la geometria.
  - *Magic Numbers* financieros → macros nombrados (`\VANbase`, `\TIRbase`,
    `\TasaDescuento`…) definidos una vez en cada main de la 01; ejemplo
    numerico verificado con Python (VAN 1,088,553 MXN, TIR 20.95%,
    payback 3.22 anios, r = 12%).
  - *Copy-Paste Programming* → ES/EN comparten estructura y `common/`;
    la duplicacion ES↔EN es requisito del encargo (bilingue), no deuda:
    queda documentada y acotada a texto, nunca a logica.
  - *Hardcoded Paths* → prohibidas las rutas absolutas; includes siempre
    `../common/...`, validos igual en local y en Overleaf.
- **good-python / good-typescript**: sin codigo Python ni TypeScript en el
  alcance (prohibido tocar `lib` y `components`; el repo aun no los tiene).
  Principios aplicados por analogia en LaTeX: *parse, don't validate*
  (metadatos con `\providecommand` + valores por defecto seguros en vez de
  fallar con `Undefined control sequence`), comandos totales y tablas
  con `booktabs`/`siunitx` en vez de formato ad hoc.
