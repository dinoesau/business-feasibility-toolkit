<!--
Criterios de aceptacion de esta plantilla (Given-When-Then):
- GWT1: Given un autor nuevo, When sigue esta plantilla, Then su guia tiene las 7 secciones exactas en orden, con anchors predecibles.
- GWT2: Given una guia escrita con la plantilla, When se revisan sus numeros, Then cada numero trae fuente gratuita o calculadora que lo produce (cero numeros magicos).
- GWT3: Given una guia escrita con la plantilla, When el lector termina el Checklist, Then puede pulsar "Marcar paso N listo" sin dudas pendientes y sabe a donde ir (calculadora + guia siguiente con enlaces ../../../ validos).
12 Factors: ningun entorno hardcodeado; todos los enlaces internos usan ../../../ (paridad dev-prod, ver astro.config.mjs).
-->

---
title: "Paso N · <nombre corto del logro>"
lang: es # o `en` en el espejo ingles; una guia = un idioma
description: "<1 linea: que logra el lector al terminar este paso>"
---

# Como usar esta plantilla (borrar esta seccion al escribir la guia)

Esta plantilla es normativa para las 10 guias de paso (HU4-HU13).
Cada guia real es monolingue y lleva EXACTAMENTE las 7 secciones de abajo, en este orden, sin secciones extra ni renombres.
Los criterios GWT viven solo en el comentario HTML de arriba, nunca como seccion.
La columna ES es para `src/content/guias-paso/`; la columna EN es su espejo en `src/content/guides-step/`.
Tono ancla: plano para novatos, como `docs-es/03-guia-uso-rapido.md` y las paginas `es/ficha/` y `es/calculadoras/tam-sam-som/`.
Regla anti-duplicacion: enlazar a los docs de referencia (`es/guia/...`, glosario, matriz), no copiarlos.
Prohibido por esta plantilla (bloodhound-antipatterns): parrafos multi-idea, conectores repetidos (`ademas... ademas...`), jerga sin definir al primer uso, numeros magicos sin fuente.

Frontmatter obligatorio:

```yaml
---
title: "Paso N · <nombre corto>"   # ES: "Paso N · ..."; EN: "Step N · ..."
lang: es                            # o `en`
description: "<1 linea del logro, sin jerga>"
---
```

Enlaces internos: siempre con `../../../`, nunca rutas absolutas ni dominio hardcodeado.
ES: `(../../../calculadoras/<slug>/)`, `(../../../guia/paso/<slug>/)`, `(../../../guia/glosario/)`, `(../../../ficha/)`.
EN: `(../../../calculators/<slug>/)`, `(../../../guide/step/<slug>/)`, `(../../../guide/glossary/)`, `(../../../idea-sheet/)`.
Moneda de ejemplos: MXN. Validez legal: solo Mexico (la version EN lo advierte).

---

# Paso N · <nombre corto del logro>

1 linea de contexto: de donde viene el lector y a donde va (maximo 2 frases, 1 idea por frase).

## Que vas a lograr / ## What you will achieve

ES: `## Que vas a lograr` — lista con guiones del resultado tangible del paso (papel lleno, numero calculado, decision escrita).
EN: `## What you will achieve` — mismo contenido espejo.
Tono plano para novatos: una idea por viñeta, sin parrafos multi-idea.
Cada termino nuevo se define al primer uso en la misma linea (ej: "**margen de contribucion**: lo que cada venta aporta para pagar los fijos").

## Que necesitas del paso anterior / ## What you need from the previous step

ES: `## Que necesitas del paso anterior` — lista de insumos exactos (numeros, papeles, decisiones) con el paso que los produjo.
EN: `## What you need from the previous step` — espejo.
El paso 1 escribe "Nada: este es el primer paso" mas lo que el lector trae de casa; los demas cierran con "Sin X no puedes hacer este paso. Vuelve atras si te falta".
No re-expliques el paso anterior: enlazalo.

## Paso a paso / ## Step by step

ES: `## Paso a paso` — lista numerada de 3 a 6 acciones en imperativo, cada una verificable en la calculadora del paso.
EN: `## Step by step` — espejo.
Cada numero lleva su fuente gratuita o la calculadora que lo produce (ej: "Verificalo en la [calculadora](../../../calculadoras/<slug>/) con CF = 10,000, p = 100, cvu = 60 -> Q* = 250").
Formulas en bloque `text` con cada variable definida debajo; el ejemplo reproducible es obligatorio si hay formula.

## Donde buscar gratis / ## Where to look for free

ES: `## Donde buscar gratis` — lista de fuentes gratuitas concretas (calle, INEGI DENUE, Google Trends, recibos propios, OCCMundial).
EN: `## Where to look for free` — espejo.
Cada fuente dice que numero entrega y para que paso sirve; nada de "busca en internet".
Si el dato es de pago, no va aqui: se sustituye por su proxy gratuito o se declara como hueco a validar en la calle.

## Errores comunes / ## Common mistakes

ES: `## Errores comunes` — lista de 3 a 6 errores reales vistos en novatos, cada uno con su arreglo en la misma viñeta.
EN: `## Common mistakes` — espejo.
Prohibido jerga sin definir y conectores repetidos; cada viñeta 1 error + 1 arreglo, maximo 2 lineas.
Al menos un error debe ser numerico (periodos mezclados, margen <= 0, SOM inventado) cuando el paso use numeros.

## Checklist / ## Checklist

ES y EN: `## Checklist` (identico en ambos idiomas) — casillas `- [ ]` que espejan el boton de avance (`Marcar paso N listo` / `Mark step N done`).
Cada casilla es la condicion para pulsar el boton sin dudas; ultima casilla fija: `- [ ] **Papel que llena:** <nombre>. Lo usaras en <paso/estudio que lo consume>.`
Nada en el checklist que no este explicado arriba; nada explicado arriba que falte si bloquea el avance.

## Siguiente paso / ## Next step

ES: `## Siguiente paso` — dos enlaces minimo: calculadora del paso actual o siguiente + guia del paso siguiente, ambos con `../../../`.
EN: `## Next step` — espejo con rutas `en/`.
Patron ES: `- [Calculadora <nombre>](../../../calculadoras/<slug>/)` y `- [Guia paso N+1: <titulo>](../../../guia/paso/<slug>/)`.
Si el paso tiene veredicto de salida (PARAR), añade a donde archivar la decision (checklist go-no-go). El paso 10 cierra hacia go-no-go en vez de paso 11.

---

## Mini-checklist de auto-verificacion (tdd; borrar antes de publicar)

- [ ] Frontmatter con `title` ("Paso N · ..." / "Step N · ..."), `lang` y `description` de 1 linea.
- [ ] Las 7 secciones exactas, en orden, sin extras ni renombres.
- [ ] Cero parrafos multi-idea; cero conectores repetidos seguidos; cero jerga sin definir.
- [ ] Cero numeros magicos: cada numero tiene fuente o calculadora con ejemplo reproducible.
- [ ] Checklist espeja el boton `Marcar paso N listo` / `Mark step N done` y cierra con "Papel que llena".
- [ ] "Siguiente paso" enlaza calculadora + guia siguiente con `../../../` (cero URLs hardcodeadas).
- [ ] Referencias externas enlazadas, no copiadas; moneda MXN; EN advierte validez MX.
