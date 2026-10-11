# Business Feasibility Toolkit

Evalua tu idea de negocio antes de invertir dinero en ella.
Calculadoras web gratuitas, ejemplos resueltos y plantillas de documentos, todo en espanol e ingles.
Sitio en vivo: <https://dinoesau.github.io/business-feasibility-toolkit/>.
*This toolkit is fully bilingual (ES/EN): every calculator, guide and template exists in both languages.*

## Empieza aqui en 3 pasos

1. Abre las [calculadoras en espanol](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/) (o [calculators in English](https://dinoesau.github.io/business-feasibility-toolkit/en/calculators/)) y mete los numeros de tu idea.
2. Compara tus resultados con el [ejemplo de cafeteria resuelto](examples/cafeteria-mx/) para ver como se ve un caso terminado.
3. Descarga las [plantillas de documentos](#plantillas-de-documentos) y arma tu estudio de factibilidad y tu plan de negocios.

## Tu ruta de evaluacion

Sigue este orden y no te saltas nada importante.
Primero calcula si los numeros cierran.
Despues aprende que debe llevar cada documento.
Luego copia la estructura del ejemplo.
Al final redacta tus documentos con las plantillas.

## Tour del repositorio: que hay para ti en cada carpeta

| Carpeta | Que es para ti |
|---|---|
| Sitio web (links arriba) | Las 8 calculadoras interactivas, sin registro y sin instalar nada. |
| [`docs/research/`](docs/research/) | Mini-guias de que debe llevar cada documento: estudio de factibilidad, analisis financiero, mercado, plan de negocios, pitch y marco legal mexicano. Leelas antes de redactar. |
| [`examples/`](examples/) | Casos resueltos de punta a punta con numeros reales. [`cafeteria-mx/`](examples/cafeteria-mx/) trae supuestos, resultados esperados y flujo de caja a 36 meses para que copies el formato. |
| [`templates/latex/`](templates/latex/) | Plantillas profesionales de los 4 documentos (codigo fuente LaTeX). Cada una existe en ES y EN. |
| [`public/plantillas/`](public/plantillas/) | Las mismas plantillas en ZIP listas para subir a Overleaf, mas un PDF de muestra. Si no quieres compilar nada, descarga aqui. |
| [`src/content/`](src/content/) | Las guias paso a paso y checklists (prefactibilidad, validacion de mercado, go/no-go, due-diligence de socios) que tambien ves publicadas en el sitio. |
| [`scripts/`](scripts/) | Utilidades internas de verificacion del sitio. No necesitas usarlas para evaluar tu idea. |

## Calculadoras

Todas funcionan en tu navegador, con exportacion a CSV e impresion a PDF.
Empiezan con valores de ejemplo para que veas como se usan.

| Calculadora | Para responder |
|---|---|
| [TAM / SAM / SOM](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/tam-sam-som/) | Que tan grande es mi mercado real. |
| [Punto de equilibrio](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/punto-equilibrio/) | Cuantas unidades debo vender para no perder. |
| [VPN / TIR](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/vpn-tir/) | Si la inversion crea valor en el tiempo. |
| [Precio por margen](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/pricing/) | A que precio vender segun mi costo y margen. |
| [Costo de producto](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/costo-producto/) | Cual es mi costo real con IVA, terminal e ISR. |
| [CAC / LTV](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/cac-ltv/) | Si me conviene lo que pago por cada cliente. |
| [Flujo de caja](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/flujo-caja/) | Mes a mes cuanto efectivo tengo y hasta cuando alcanza. |
| [Sensibilidad](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/sensibilidad/) | Que pasa si el precio o el costo se mueven. |

## Plantillas de documentos

Cada plantilla existe en espanol e ingles, en LaTeX y en ZIP para Overleaf.
La [guia de Overleaf](templates/latex/README-overleaf.md) explica como importar un ZIP en 5 pasos.

| Documento | Cuando usarlo |
|---|---|
| Estudio de factibilidad | Para decidir con numeros si el negocio se puede hacer y se puede mantener (mercado, tecnico, legal, financiero y riesgos). |
| Plan de negocios | Para planear la ejecucion a 3-5 anos cuando ya decidiste avanzar. |
| Resumen ejecutivo | Para presentar la idea en 2 paginas a socios o bancos. |
| Pitch deck | Para exponer en 12 diapositivas ante inversionistas. |

## Para desarrolladores

Requiere Node 22+ y npm.
Comandos: `npm ci`, `npm run dev`, `npm test` (vitest + `astro check`), `npm run build`.
El deploy a GitHub Pages es automatico al hacer push a `main` (`.github/workflows/deploy.yml`).
Detalle de verificacion y release: [`docs/qa-release.md`](docs/qa-release.md).
