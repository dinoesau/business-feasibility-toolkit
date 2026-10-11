---
title: "Matriz de contenidos - Research"
lang: es
description: "Sintesis de research web obligatorio: que debe llevar cada documento del toolkit. Con fuentes."
---

# Research - Matriz de contenidos

> Sintesis del research web obligatorio (worker 4). Cubre: ficha idea, estudio factibilidad 6 estudios, plan negocios, resumen ejecutivo, pitch deck, pacto socios MX, marco legal MX.
> Validez legal: solo Mexico. Contenido educativo, no es asesoria legal.

## 0. Metodologias aplicadas

### 0.1 Tres Criterios de Aceptacion (Given - When - Then)

| ID | Given | When | Then |
|----|-------|------|------|
| GWT-01 contenido completo | Dado que el repo esta vacio salvo `DESIGN.md` y no existe layout Astro | Cuando otro worker monte el sitio bilingue ES/EN | Entonces todo `src/content/**` debe ser markdown valido con frontmatter (`title`, `lang`, `description`) listo para colecciones Astro, sin importar componentes inexistentes |
| GWT-02 paridad ES/EN | Dado que el marco legal solo vale para Mexico | Cuando un usuario lea la version EN | Entonces cada doc EN debe indicar "Legal validity: Mexico only" y ser traduccion fiel del ES, sin inventar requisitos de otro pais |
| GWT-03 trazabilidad | Dado el riesgo de copy-paste sin fuente | Cuando se revise cualquier doc | Entonces cada afirmacion estructural debe rastrearse a la matriz (`research-matriz-contenidos.md`) y esta a sus fuentes URL |

### 0.2 12 Factors App (aplicables a contenido)

- **I. Codebase unico bilingue:** un solo repo, dos arboles espejo `docs-es/` y `docs-en/` con mismo slug base. Nada de repos separados por idioma.
- **X. Paridad dev-prod:** `https://dinoesau.github.io/business-feasibility-toolkit/` es prod; el markdown local debe renderizar identico sin URLs hardcodeadas de localhost.
- Resto de factores (build/release/run, config en entorno como `SITE_URL`, logs) se delegan a workers de infra; este worker no crea `.env` ni CI.

### 0.3 Skills

- **good-typescript:** `src/i18n/*.json` con claves tipables, sin `any` implicito; nombres `camelCase`, namespaces `nav`, `actions`, `calc`, `guide`, `checklist`, `legal`.
- **good-python / tdd:** no hay codigo Python/TS en este worker (prohibido tocar `lib/`); el equivalente test-first es GWT-01/02/03 como criterios verificables por `astro check` del worker de build.
- **bloodhound-antipatterns:** evita `copy-paste sin fuente` (toda seccion cita matriz), `contenido huerfano sin indice` (este archivo + `03-guia-uso-rapido` + `README` indexan todo), `golden hammer` (no forzar un solo doc para todo: ficha != factibilidad != plan).

## 1. Ficha de idea (1-2 paginas)

Estructura estandar (modelo Fondo Emprender / SENA):

1. Datos generales: nombre, fecha, responsable, contacto, codigo actividad (MX: SCIAN, no CIIU).
2. Descripcion: producto/servicio, propuesta de valor, 2-3 parrafos.
3. Mercado objetivo: segmentos, tamano, necesidad.
4. Competencia: matriz comparativa, ventajas, barreras.
5. Modelo de ingresos: fuentes, precios, cobro.
6. Recursos clave, 7. Canales, 8. Costos fijos/variables.
7. Equipo, 10. FODA, 11. Indicadores preliminares (ventas ano 1, punto equilibrio, inversion), 12. Financiamiento, 13. Hitos, 14. Anexos.

Fuente: research Tavily bloque A (SENA/Fondo Emprender, U. Tolima). URLs: `es.scribd.com/document/865638517/FICHA-MI-IDEA-DE-EMPRENDIMIENTO`, `fondoemprender.com/Normatividad/Manual Operativo sep 2013.pdf`, `unab.edu.co/.../GUIA-BUENAS-PRACTICAS-DE-FORMULACION-FE.pdf`.

## 2. Estudio de factibilidad - 6 estudios

Orden canonico: 1. Mercado, 2. Tecnico, 3. Organizacional, 4. Legal, 5. Financiero, 6. Ambiental. Mas resumen ejecutivo, introduccion, evaluacion integral, anexos.

| Estudio | Debe llevar |
|---|---|
| Mercado | demanda actual/proyectada, segmentacion, competencia y cuota, precios, canales, proyeccion ventas 3-5 anos, fuentes (MX: INEGI, BANXICO, Data Mexico) |
| Tecnico | proceso (flujo), capacidad instalada, ubicacion/infraestructura, equipos, plan operativo, Gantt |
| Organizacional | organigrama, perfiles, RRHH/salarios, gobernanza y riesgos |
| Legal (MX) | figura societaria, permisos, PI, contratos, tabla cumple/pendiente |
| Financiero | inversion inicial, costos, ingresos, EEFF 3-5 anos (resultados, balance, flujo), VAN/TIR/payback/punto equilibrio, sensibilidad, financiamiento |
| Ambiental | linea base, matriz impactos, legislacion (LGEEPA, MIA), mitigacion y costos, conclusion |

Fuente: bloque A (mismas guias + `administrativos.ut.edu.co/.../Instructivo_eleccion_dignata`).

## 3. Plan de negocios (10 secciones)

1. Resumen ejecutivo, 2. Empresa (naturaleza, vision, estructura legal, ubicacion), 3. Mercado (TAM/SAM/SOM, segmentos, competencia, tendencias), 4. Propuesta de valor y modelo de negocio, 5. Go-to-market, 6. Operativo, 7. Equipo, 8. Financiero (3-5 anos, supuestos, equilibrio), 9. Riesgos, 10. Anexos.
Fuentes bloque B: `incorp.com/es/.../como-crear-un-buen-plan-de-negocios`, `cegos.es/.../como-hacer-un-business-plan`, `bik.eus/.../guia-enisa-2025-2026`.

## 4. Resumen ejecutivo (1-2 paginas, se escribe al final)

10 puntos: datos empresa, problema, solucion, mercado (TAM), modelo, traccion, equipo, finanzas resumidas, uso de fondos, call to action ("buscamos $500k MXN por 10%").
Fuente bloque B: `flowlu.com/es/blog/productivity/executive-summary`.

## 5. Pitch deck (10-15 slides)

Portada, problema, solucion (demo), mercado TAM/SAM/SOM, modelo, traccion (usuarios, MRR, retencion), ventaja competitiva, competencia (mapa), crecimiento/roadmap, equipo, finanzas (unit economics), ronda y uso de fondos, cierre/CTA. Plantilla referencia: Sequoia via Slidebean.
Fuentes bloque B: `nexencapital.com/blog/pitch-deck-para-inversores`, `blog.genially.com/pitch-deck`, `slidebean.com/es/pitch-deck-ejemplos-para-startups`, `mba-madrid.com/proyecto-creacion-empresa`.

## 6. Pacto de socios MX

- Capital autorizado/suscrito/pagado, distribucion, derechos preferencia, restricciones transmision (base SAPI art. 16 LMV como referencia de clausulado flexible).
- Vesting 4 anos + cliff 12 meses (fideicomiso/opciones/recompra); stock options/phantom shares empleados.
- Drag-along (>=51%, rango 50-75%) y tag-along.
- No competencia: valida si razonable en tiempo/territorio/alcance + contraprestacion (art. 5 Const.); practica 1-2 anos, nacional/sectorial.
- Resolucion: mediacion/arbitraje primero, luego tribunales (ej. CDMX); mayorias reforzadas; derechos de informacion.
Fuentes bloque D: `praxiumconsultores.com/blog/pacto-de-socios-startup-mexico-guia`, `navascusi.com/clausulas-drag-along-y-tag-along`, `exajuridico.com/blog/drag-along-startup-fundadores`, `legalbotmx.com/blog/acuerdo-no-competencia-mexico`, `devesa.law/.../pactos-de-socios`, `legalcorelabs.com/es/blog/pacto-socios-startups-guia`.

## 7. Marco legal MX (detalle para `05-marco-legal-MX.md`)

| Tema | Hallazgo research (bloque C) |
|---|---|
| SAS | 1 socio posible, 100% digital, sin minimo legal, sin comisario; mala para preferred shares/institucionales |
| SRL (S. de R.L. de C.V.) | capital ref. $3,000 MXN, 2-50 socios, cesion con consentimiento; ideal familia/JV |
| SA de C.V. | sin minimo legal, min. 2 socios, consejo o administrador unico + comisario obligatorio; ideal levantar capital |
| RFC SAT | CURP + pre-registro `citas.sat.gob.mx` + cita presencial + Constancia + e.firma; gratis; 1-4 sem cita |
| IMSS/INFONAVIT | Registro Patronal con RFC activo, altas en 5 dias habiles, cuotas ~20-30% salario, reportes mensuales |
| Licencias/Uso suelo | verificacion zonificacion (ej. Visor Urbano), Licencia Uso de Suelo + Funcionamiento, $1k-10k MXN, 3 dias digital / 2-4 sem tradicional |
| NOMs | identificar en buscador SE, certificacion lab acreditado, COFEPRIS/energia segun sector, guardar 5 anos, USD 300-1,500 por cert |
| IMPI marcas | busqueda previa, Marca en Linea (~$2,425.66 + IVA), 5-6 meses, declaracion uso ano 3, renovacion 10 anos |
| IMPI patentes | espanol + apoderado, ~$4,000 + $500 registro, publicacion 18 m, concesion 4-6 anos (PPH 2-3), anualidades desde ano 5 |
| REPSE (STPS) | obligatorio outsourcing especializado; RFC sin adeudos + IMSS/INFONAVIT al corriente + e.firma; resolucion 20 dias habiles; vigencia 3 anos; reportes ICSOE/SISUB cuatrimestrales; sin costo gobierno |

## 8. Checklists (a crear en `src/content/checklists/`)

- **Prefactibilidad:** problema/valor, mercado preliminar, tecnica, regulatorio, financiera basica, riesgos criticos. Fuente bloque D + todostartups validacion.
- **Go/No-Go:** >=70% supuestos confirmados, flujo positivo 24 m o burn cubierto, vesting firmado, permisos obtenibles, >=1 LOI/term sheet.
- **Validacion mercado:** MVP, entrevistas/encuestas, A/B precios-canales-mensajes, CAC/LTV/churn/conversion, iteracion, data-room.
- **Due diligence societaria:** actas/estatutos/pactos, cap table, contratos, PI (cesiones codigo), fiscal (RFC + 5 anos + SAT), laboral (IMSS/ISR), drag/tag/no-competencia, arbitraje.
Fuentes bloque D: `finanziaconnect.com/blog/due-diligence-startups`, `startuplinks.world/.../checklist-de-due-diligence`, `legaltica.com/mx/como-preparar-due-diligence`, `todostartups.com/3/186494/validacion-mercado`.

## 9. Decisiones de adaptacion MX (dado que el research base es CO/ES)

- CIIU -> SCIAN (INEGI). DANE -> INEGI. Fondo Emprender (CO) se cita como referencia metodologica, no como ventanilla MX (MX: NAFIN, fondos estatales).
- Moneda ejemplos en MXN. Tribunales CDMX. Leyes citadas: LGSM, CFF, LSS, LFMN (NOMs), LPI/LFPI, LFT + reforma outsourcing (REPSE).
- Disclaimer obligatorio en `05-marco-legal-MX.md` y su mirror EN: no es asesoria legal.

## 10. Indice de entregables (anti-huerfano)

- `docs-es/01..05`, `docs-en/01..05`, `checklists/*.md`, `src/i18n/{es,en}.json`, este archivo.
- Paginas `[...slug]` NO creadas: no existe layout base en repo vacio; markdown queda listo para coleccion Astro (ver `README.md`).
