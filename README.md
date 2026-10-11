# Business Feasibility Toolkit

Evalua tu idea de negocio antes de invertir dinero en ella.
Calculadoras web gratuitas, ejemplos resueltos y plantillas de documentos, todo en espanol e ingles.
Sitio en vivo: <https://dinoesau.github.io/business-feasibility-toolkit/>.
*This toolkit is fully bilingual (ES/EN): every calculator, guide and template exists in both languages.*

## Guia paso a paso

Sigue los pasos en orden.
Cada paso dice que debes investigar, donde investigarlo, que herramienta usar y que documento llena.
Al final tienes un estudio de factibilidad completo y sabes si avanzas o no.

### Paso 1. Describe tu idea en una ficha

Objetivo: poner por escrito que problema resuelves, para quien y que vendes.
Que debes investigar: quien tiene ese problema, como lo resuelve hoy y cuanto paga por resolverlo.
Donde investigarlo: habla con 5-10 clientes potenciales, observa a la competencia en Google Maps y redes, revisa precios en MercadoLibre o Amazon.
Herramienta: la [seccion de validacion de mercado](https://dinoesau.github.io/business-feasibility-toolkit/es/guia/) del sitio.
Documento que llena: ficha de idea y seccion de mercado del estudio de factibilidad.

### Paso 2. Mide tu mercado (TAM / SAM / SOM)

Objetivo: saber cuantas personas podrian comprarte, cuantas puedes atender y cuantas puedes ganar.
Que debes investigar: poblacion de tu zona, ingreso de tus clientes, numero de negocios similares.
Donde investigarlo: INEGI (DENUE para negocios por colonia, ENIGH para ingreso de hogares, Censo Economico), Google Trends para interes en el tiempo, conteo directo de competidores en tu zona.
Herramienta: [calculadora TAM / SAM / SOM](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/tam-sam-som/).
Documento que llena: estudio de mercado.
Detalle de que incluir: [`docs/research/03-mercado.md`](docs/research/03-mercado.md).

### Paso 3. Calcula tu costo real por unidad

Objetivo: saber cuanto te cuesta cada unidad con todo incluido, no solo la materia prima.
Que debes investigar: precio de materia prima con 3 proveedores, empaque, mano de obra, envios y mermas tipicas de tu giro.
Donde investigarlo: cotiza en Central de Abastos o MercadoLibre, Alibaba para volumen, imprentas locales para empaque, pregunta mermas a alguien que ya opere el giro.
Herramienta: [calculadora de costo de producto](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/costo-producto/).
Documento que llena: estudio tecnico y seccion de costos del estudio financiero.

### Paso 4. Fija tu precio

Objetivo: un precio que cubra costos, deje utilidad y el mercado acepte pagar.
Que debes investigar: precios de 5-10 competidores directos, que incluye cada precio, que valor extra das tu.
Donde investigarlo: menus y catalogos publicados, Rappi o Uber Eats si es comida, tiendas en linea, pregunta directa a clientes cuanto pagarian.
Herramienta: [precio por margen](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/pricing/) y [costo de producto](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/costo-producto/) (muestra markup y margen reales).
Documento que llena: estrategia comercial del plan de negocios.

### Paso 5. Prorratea tus costos fijos y halla el punto de equilibrio

Objetivo: saber cuantas unidades al mes necesitas vender para no perder.
Que debes investigar: renta de locales parecidos, luz agua internet y gas, software y suscripciones, sueldos con IMSS, contador, desgaste de equipo.
Donde investigarlo: Inmuebles24 o Vivanuncios para rentas, recibos propios o de conocidos para servicios, OCCMundial o Computrabajo para sueldos, cotiza contador local.
Herramienta: [punto de equilibrio](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/punto-equilibrio/).
Documento que llena: estudio tecnico-operativo y estudio financiero.
Compara tu punto de equilibrio con tu SOM del paso 2: si necesitas mas clientes de los que existen, la idea no cierra.

### Paso 6. Proyecta flujo de caja y evalua la inversion (VPN / TIR)

Objetivo: saber cuanto dinero necesitas para arrancar y si la inversion se recupera.
Que debes investigar: inversion inicial completa (equipo, adecuaciones, permisos, capital de trabajo de 3 meses), tasa de referencia (CETES en cetesdirecto o Banxico), crecimiento mensual realista de ventas.
Donde investigarlo: cotizaciones de equipo, presupuestos de adecuacion, [ejemplo de cafeteria](examples/cafeteria-mx/) como referencia de formato, Banxico para tasas.
Herramienta: [flujo de caja](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/flujo-caja/) y [VPN / TIR](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/vpn-tir/).
Documento que llena: estudio financiero.
Detalle de que incluir: [`docs/research/02-financiero.md`](docs/research/02-financiero.md).

### Paso 7. Valida que conseguir clientes sea rentable (CAC / LTV)

Objetivo: confirmar que un cliente deja mas dinero del que cuesta conseguirlo (regla: LTV al menos 3 veces el CAC).
Que debes investigar: costo de anuncios en tu giro, tasa de recompra, ticket promedio, cuento tiempo se queda un cliente.
Donde investigarlo: Meta Ad Library para ver que anuncian competidores, Google Keyword Planner para costo por clic, tus propias pruebas con $500-1000 de pauta, encuestas de recompra.
Herramienta: [CAC / LTV](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/cac-ltv/).
Documento que llena: estrategia comercial y escenarios del estudio financiero.

### Paso 8. Estresa los numeros (sensibilidad y escenarios)

Objetivo: saber si el negocio sobrevive cuando algo sale mal.
Que debes investigar: que pasa si sube 20% tu insumo principal, si vendes 20% menos, si bajas el precio para competir.
Donde investigarlo: historial de precios de tus insumos, temporada baja de tu giro, promociones de competidores.
Herramienta: [sensibilidad](https://dinoesau.github.io/business-feasibility-toolkit/es/calculadoras/sensibilidad/).
Documento que llena: analisis de riesgos del estudio de factibilidad.

### Paso 9. Revisa lo legal antes de gastar

Objetivo: saber que permisos, impuestos y registros necesitas y cuanto cuestan.
Que debes investigar: regimen fiscal (RESICO vs actividad empresarial en el SAT), registro de marca en el IMPI, licencia municipal y uso de suelo, NOMs de tu sector (COFEPRIS si es alimentos o salud), alta en IMSS si tendras empleados.
Donde investigarlo: sat.gob.mx, gob.mx/impi (buscador MARCANET para ver si tu marca esta libre), presidencia municipal de tu ciudad, Diario Oficial para NOMs, un contador para una sesion de orientacion.
Herramienta: checklist de [due-diligence societaria](src/content/checklists/due-diligence-societaria.md).
Documento que llena: estudio legal y pacto de socios.
Detalle: [`docs/research/06-legal-mx.md`](docs/research/06-legal-mx.md) y la [guia de marco legal](https://dinoesau.github.io/business-feasibility-toolkit/es/guia/).

### Paso 10. Decide: avanza o abandona (go / no-go)

Objetivo: tomar la decision con criterios escritos, no con entusiasmo.
Que debes investigar: nada nuevo, solo junta los resultados de los pasos 1-9.
Donde revisarlo: checklist de [go/no-go](src/content/checklists/go-no-go.md) y [prefactibilidad](src/content/checklists/prefactibilidad.md).
Herramienta: [resumen de tu caso](examples/cafeteria-mx/resultados-esperados.md) como ejemplo de presentacion de resultados.
Si avanzas, redacta tus documentos con las [plantillas](#plantillas-de-documentos).

## Tour del repositorio: que hay para ti en cada carpeta

| Carpeta | Que es para ti |
|---|---|
| Sitio web (links de cada paso) | Las 8 calculadoras interactivas, sin registro y sin instalar nada. |
| [`docs/research/`](docs/research/) | Mini-guias de que debe llevar cada documento: factibilidad, financiero, mercado, plan de negocios, pitch y legal mexicano. |
| [`examples/`](examples/) | Casos resueltos con numeros reales para copiar el formato. [`cafeteria-mx/`](examples/cafeteria-mx/) trae supuestos, resultados y flujo a 36 meses. |
| [`templates/latex/`](templates/latex/) | Plantillas profesionales de los 4 documentos, cada una en ES y EN. |
| [`public/plantillas/`](public/plantillas/) | Las mismas plantillas en ZIP para subir a Overleaf, mas un PDF de muestra. |
| [`src/content/`](src/content/) | Guias y checklists publicados en el sitio: prefactibilidad, validacion de mercado, go/no-go y due-diligence. |
| [`scripts/`](scripts/) | Utilidades internas del sitio. No las necesitas para evaluar tu idea. |

## Plantillas de documentos

Cada plantilla existe en espanol e ingles, en LaTeX y en ZIP para Overleaf.
La [guia de Overleaf](templates/latex/README-overleaf.md) explica como importar un ZIP en 5 pasos.

| Documento | Cuando usarlo |
|---|---|
| Estudio de factibilidad | Para decidir con numeros si el negocio se puede hacer y mantener (pasos 1-9). |
| Plan de negocios | Para planear la ejecucion a 3-5 anos cuando ya decidiste avanzar (paso 10). |
| Resumen ejecutivo | Para presentar la idea en 2 paginas a socios o bancos. |
| Pitch deck | Para exponer en 12 diapositivas ante inversionistas. |

## Para desarrolladores

Requiere Node 22+ y npm.
Comandos: `npm ci`, `npm run dev`, `npm test` (vitest + `astro check`), `npm run build`.
El deploy a GitHub Pages es automatico al hacer push a `main` (`.github/workflows/deploy.yml`).
Detalle de verificacion y release: [`docs/qa-release.md`](docs/qa-release.md).
