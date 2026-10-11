# Content (worker 4)

Sitio Astro bilingue ES/EN. Prod: `https://dinoesau.github.io/business-feasibility-toolkit/`. Marco legal solo Mexico.

## Arbol

- `research-matriz-contenidos.md` - matriz con fuentes (trazabilidad obligatoria).
- `docs-es/01..05` - guia ES.
- `docs-en/01..05` - mirror EN (cada uno advierte validez MX).
- `checklists/` - prefactibilidad, go-no-go, validacion-mercado, due-diligence-societaria.
- `../i18n/es.json`, `../i18n/en.json` - nav, acciones, guia, calculadoras, checklists, legal.

## Paginas `[...slug]` - decision

~~No existe layout base~~ Actualizacion: durante la sesion otro worker creo `src/layouts/BaseLayout.astro`, por lo que **si se crearon**:

- `src/pages/es/guia/[...slug].astro` (5 slugs) + `src/pages/es/guia/index.astro`.
- `src/pages/en/guide/[...slug].astro` (5 slugs) + `src/pages/en/guide/index.astro`.

Importan el markdown como componentes Astro y usan `BaseLayout` con `lang` correcto y `import.meta.env.BASE_URL` (paridad dev-prod, factor X). Sin colecciones de contenido (no hay `content/config`); el mapa slug->md es estatico y tipado.

Slugs: `01-conceptos...` -> `/es/guia/conceptos-viabilidad-vs-factibilidad`, mirror EN analogo.

## Reglas para otros workers

1. No inventar requisitos de otro pais en EN; citar validez MX.
2. Toda afirmacion estructural debe rastrear a la matriz y sus URLs.
3. Disclaimer "no es asesoria legal" obligatorio en paginas legales.
4. Moneda MXN, codigos SCIAN, claves i18n `nav/actions/guide/calc/checklist/legal`.
