---
title: "Paso 4: pon tu precio"
lang: es
description: "Fija un precio que cubra tu costo del paso 3, te deje margen y la gente si pague: compara 5 a 10 competidores y validalo con tus 3 objeciones del paso 1."
---

# Paso 4: pon tu precio

## Que vas a lograr

Un precio que cumple 3 condiciones a la vez: cubre tu costo unitario, te deja margen y la gente si lo paga.
Sales con un numero que puedes defender frente a 5 a 10 competidores.
Papel que llena: plan de ventas del plan de negocios.

## Que necesitas del paso anterior

- Tu costo unitario del paso 3 (por pieza, hora o receta, con merma y desgaste incluidos).
- Sin ese costo no hay precio: todo margen se calcula sobre el.
- Si aun no lo tienes, saca tu costo en la [calculadora de costo de producto](../../../calculadoras/costo-producto/).
- Tus 3 objeciones del paso 1 (las que anotaste al hablar con 5 a 10 clientes). Esas mandan aqui.

## Paso a paso

1. **Anota tu costo.** Copia el costo unitario final del paso 3. Ese numero es tu piso: ningun precio valido queda por debajo.
2. **Lista 5 a 10 competidores.** Para cada uno anota precio, que incluye y que das tu de mas. Sin el "que incluye" la comparacion miente.
3. **Calcula tu precio por margen.** Abre la [calculadora de precio por margen](../../../calculadoras/pricing/), mete tu costo y el margen que quieres. Ejemplo reproducible: costo 60 y margen 40% dan precio 100 y utilidad 40 por unidad. Cambia los numeros por los tuyos.
4. **No confundas markup con margen.** Son dos formulas distintas del lib (`precioPorMargen(costo, margen)`, `precioPorMarkup(costo, markup)`, `margenDesdePrecio(costo, precio)`):
   - Margen sobre precio: precio = costo / (1 - margen).
   - Markup sobre costo: precio = costo x (1 + markup).
   - 50% de markup = 33.3% de margen (ejemplo: costo 60 con 50% markup da precio 90 y margen 30/90 = 33.3%).
   - Si pides "50% de margen" pero solo sumas 50% al costo, en realidad dejas 33.3%. La logica vive en el lib y la calculadora; aqui solo se enuncia, no se duplica.
5. **Valida que la gente lo pague.** Vuelve con tus 3 objeciones del paso 1 y pregunta con precio cerrado: "si estuviera aqui a $X, ¿lo comprarias esta semana?". Cuenta los "si" concretos, no los "me gusta". Si el precio espanta, ajusta valor, costo o margen, nunca vendas por debajo del costo.
6. **Ubicate en el rango.** Si tu precio queda por encima del mas caro de tus 5 a 10 competidores, necesitas una diferencia que el cliente nombre sola (horario, cercania, garantia). Si queda por debajo del mas barato, revisa que tu costo este completo.

## Donde buscar gratis

- Menus y catalogos ya publicados de tus competidores.
- Rappi o Uber Eats si es comida; MercadoLibre o Amazon para productos.
- Google Maps y redes para ver que incluye cada negocio.
- Pregunta directa a clientes cuanto pagarian (pregunta del paso 1, ahora con tu precio candidato).

## Errores comunes

- Sumar un % al costo y llamarlo "margen". Eso es markup. 50% markup deja 33.3% de margen real.
- Poner precio sin el costo del paso 3. Sin piso, cualquier margen es ficcion.
- Comparar precios sin anotar que incluye cada uno.
- Validar con "¿te gusta?" en vez de "¿lo compras esta semana a $X?".
- Bajar el precio para competir hasta quedar por debajo del costo.

## Checklist

- [ ] Costo unitario del paso 3 anotado como piso del precio.
- [ ] 5 a 10 competidores listados con precio y que incluye cada uno.
- [ ] Precio calculado en la calculadora con margen explicito (costo, margen, precio y utilidad anotados).
- [ ] Se que numero es margen y que numero es markup en mi precio (50% markup = 33.3% margen, no son lo mismo).
- [ ] Precio validado con las 3 objeciones del paso 1: clientes reales dicen que lo comprarian a $X.
- [ ] Mi precio cubre el costo, deja margen y cae dentro o justificadamente arriba del rango competidor.

## Siguiente paso

Con tu precio fijado, descubre cuantas piezas al mes debes vender para no perder:

- [Calculadora de punto de equilibrio](../../../calculadoras/punto-equilibrio/)
- [Guia del paso 5: halla tu equilibrio](../../../guia/paso/paso-5-equilibrio/)

## Given-When-Then

- **Given** el costo unitario del paso 3, **When** sigues esta guia, **Then** fijas un precio que cubre el costo, deja margen explicito y clientes reales confirman que lo pagan.
- **Given** 5 a 10 precios de competidores con su incluido, **When** ubicas tu precio en ese rango, **Then** sabes si compites por precio o debes justificar valor por encima del mercado.
- **Given** las 3 objeciones del paso 1, **When** validas tu precio candidato con intencion de compra concreta, **Then** ninguna objecion tumba el precio sin que lo ajustes antes del paso 5.
