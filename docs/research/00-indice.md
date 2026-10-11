# Research toolkit - Indice y matriz resumen

> Worker 6 - research web dedicado. Sintesis accionable para workers 2-5. No implementa calculadoras ni LaTeX, solo investiga y documenta.

## Criterios de aceptacion (Given-When-Then)

- **G1.** Given que un worker 2-5 necesita escribir una calculadora, doc o plantilla, when abre `docs/research/`, then encuentra formula exacta, tabla requerida y checklist sin necesidad de re-investigar en web.
- **G2.** Given que un revisor audita una afirmacion numerica, when sigue la cita, then llega a la fuente primaria (URL + fecha de consulta) y reproduce el calculo.
- **G3.** Given que se agrega un nuevo documento al toolkit, when se verifica contra `06-legal-mx.md`, then cumple LGSM/LMV/SAT vigente para Mexico y cita articulo especifico.
- **G4.** Given que falla una fuente externa (link roto, paywall), when se consulta la matriz resumen, then existe al menos una fuente alternativa por tema (3+ fuentes por doc).

Research completo = los 7 archivos existen, cada uno con secciones obligatorias + tablas requeridas + errores comunes + checklist + 3+ fuentes con URL.

## Trazabilidad (12 Factors)

- **IV. Backing services como recursos atados:** las fuentes web (Gartner, INEGI, LGSM, Sequoia, YC) se tratan como backing services: se citan con URL y fecha, nunca se copian inline sin atribucion. Si la fuente cambia, solo cambia la cita, no la formula.
- **XI. Logs como flujo de eventos:** cada doc registra `Fuente | Dato usado | Fecha consulta`. Los logs de research son append-only: no se reescriben conclusiones sin dejar rastro de que fuente las respalda.

## Antipatterns evitados (bloodhound-antipatterns)

| Antipattern | Sintoma | Mitigacion aplicada |
|---|---|---|
| Research sin citas | "se dice que el VAN..." sin fuente | Toda formula lleva fuente primaria + URL |
| Analisis sin conclusion accionable | 10 paginas sin decir que hacer | Cada doc termina en checklist + "que debe cambiar" |
| Golden Hammer (un solo metodo) | Solo top-down para TAM | Se exigen 2 metodos que converjan (top-down + bottom-up) |
| Cargo-cult metrics | LTV/CAC >= 3 sin contexto | Benchmarks por motion (PLG vs enterprise) y etapa ARR |
| Legal copy-paste | "SA de CV siempre" | Matriz SAS vs SA de CV vs SRL vs SAPI con articulos LGSM/LMV |

## Matriz resumen (usar sin re-investigar)

| Doc | Pregunta que responde | Formula / estructura clave | Tabla requerida | Worker consumidor | Fuentes ancla |
|---|---|---|---|---|---|
| `01-factibilidad.md` | Que 6 dimensiones debe cubrir el estudio | Mercado, tecnica, operativa, legal, financiera, ambiental + escenarios base/optimista/pesimista | Matriz de viabilidad 6 x (indicador, umbral, estado) | W2 plantillas, W4 docs | BID Invest, SEMARNAT, BAPIN, ISO 9001/14001/31000 |
| `02-financiero.md` | Como decidir si el proyecto crea valor | VAN = S FCt/(1+d)^t - I0; TIR: VAN=0; PRI con interpolacion; ROI = (SFC-I0)/I0; PE = CF/(P-CVu); WACC; CAPM | Tabla decision VAN/TIR/PRI + ejemplo numerico 10k/3k/8% | W2 `van-tir.ts`, `equilibrio.ts`, `flujo.ts`, `sensibilidad.ts` | Wikipedia VAN/WACC, CEUPE, Economipedia, ESAN, Fundacion Wiese |
| `03-mercado.md` | Cuanto mercado existe y cuanto es capturable | TAM = poblacion x ticket x frecuencia; SAM = TAM x samShare; SOM = SAM x somShare; funnel x P(etapas); CAC = gasto/clientes; LTV = ARPU x margen/churn; payback = CAC/(ARPU x margen) | TAM/SAM/SOM con 2 metodos + benchmarks LTV:CAC y payback | W2 `tam.ts`, `cac-ltv.ts`, `pricing.ts` | Gartner, IDC, Statista, INEGI/Census, SaaS Hero, Rule of 40 |
| `04-plan-negocios.md` | Que estructura es bancable en Mexico | 12 secciones: resumen, empresa, mercado, organizacion, producto, marketing, operaciones, finanzas 3-5 anos, financiamiento, riesgos, anexos | Tabla contenido minimo por seccion + anexos bancables | W3/W4 plantillas y LaTeX | NAFIN, SE, Sequoia business plan guide |
| `05-pitch-resumen.md` | Como contar la historia en 10 slides | Sequoia 10-12 (proposito, problema, solucion, why now, mercado, competencia, modelo, equipo, financieros, vision) / YC 7-10 (problema, solucion, mercado, traccion, modelo, equipo, ask) | Tabla slide x contenido x metrica | W3/W5 pitch y teaser | Sequoia writing-a-business-plan, YC, Slidebean (DoorDash, Airbnb, YouTube decks) |
| `06-legal-mx.md` | Que figura societaria y pacto usar | SAS (1 socio, online, tope ~5 MDP) vs SA de CV (>=2, escritura) vs SRL (2-50, partes sociales) vs SAPI (VC, LMV art. 12-16) | Comparativa constitucion, capital, gobierno, transmision + clausulas pacto | W4/W5 docs legales | LGSM arts. 58-61, 87, 132, 143, 164, 184, 198, 213-221, 260, 273; LMV arts. 12-16; SE/RPC |
| Este indice | Donde esta todo | Esta tabla | Esta tabla | Todos | Ver cada doc |

## Que debe cambiar para lograrlo (analisis)

1. `src/lib/` ya implementa VAN/TIR/PRI/ROI, TAM/SAM/SOM, CAC/LTV correctamente; no cambiar formulas, solo alinear docs con esas firmas.
2. `equilibrio.ts` debe documentar PE en unidades y en dinero (CF/margen) - ver `02-financiero.md`.
3. `pricing.ts` debe conectarse con value-theory de `03-mercado.md` (precio como % del valor creado).
4. Plantillas de plan/pitch deben seguir el orden Sequoia/YC de `05-pitch-resumen.md`, no un orden inventado.
5. Docs legales deben citar articulo LGSM/LMV exacto, no "segun la ley".

## Mapa de archivos

- `00-indice.md` (este archivo) - matriz y criterios.
- `01-factibilidad.md` - 6 dimensiones.
- `02-financiero.md` - VAN, TIR, PRI, ROI, punto de equilibrio, WACC, CAPM.
- `03-mercado.md` - TAM, SAM, SOM, CAC, LTV.
- `04-plan-negocios.md` - estructura bancable.
- `05-pitch-resumen.md` - resumen ejecutivo, pitch deck, teaser.
- `06-legal-mx.md` - tipos societarios Mexico + pacto de socios.

*Consultado: 2026-10-11. Fuentes web via Tavily Research + fetch directo (Sequoia).*

## Fuentes ancla (ver detalle en cada doc)

1. Sequoia Writing a Business Plan - https://www.sequoiacap.com/article/writing-a-business-plan/
2. LGSM - https://www.diputados.gob.mx/LeyesBiblio/ref/lgsm.htm ; LMV - https://www.diputados.gob.mx/LeyesBiblio/ref/lmv.htm
3. INEGI - https://www.inegi.org.mx/ ; SE - https://www.gob.mx/se/ ; SAT - https://www.sat.gob.mx/
4. Wikipedia VAN/WACC - https://es.wikipedia.org/wiki/Valor_actual_neto ; Economipedia TIR - https://economipedia.com/definiciones/tasa-interna-de-retorno-tir.html
