---
title: "Paso 2: mide tu mercado (TAM/SAM/SOM)"
lang: es
description: "Guia del paso 2: calcula TAM, SAM y SOM con la formula personas x hojas x precio, verifica el SOM de abajo hacia arriba y reproduce el ejemplo en la calculadora."
---

# Paso 2: mide tu mercado (TAM/SAM/SOM)

## Que vas a lograr

Al terminar este paso tienes 3 numeros defendibles: tu TAM en $, tu SAM como % del TAM y tu SOM verificado de abajo hacia arriba.
El SOM alimenta la tabla de ventas del estudio de mercado y el paso 5 de equilibrio.

## Que necesitas del paso anterior

Tu ficha del paso 1: las 5 a 10 platicas (de ahi salen las hojas por persona) y el precio que pagan hoy (ese es tu precio por hoja).
Sin esos dos datos no hay mercado: vuelve a [Tu ficha en 5 lineas](../../../ficha/) antes de seguir.

## Paso a paso

1. **Aplica la formula unica.** Mercado = personas x hojas por persona al año x precio por hoja. Sirve para los tres: solo cambia que personas cuentas.
2. **Cuenta personas para el TAM.** Todos los que imprimen en tu ciudad. Para ubicar cuantos rivales pelean ese TAM, entra a INEGI DENUE, filtra por tu municipio y la actividad de impresion y fotocopiado, y anota el numero de papelerias y cibers por colonia.
3. **Recorta al SAM.** Quienes pasan por tu cuadra: matricula de la escuela mas personal y visitas del hospital. Pide el dato en direccion y cuenta a la hora pico quien pasa frente a tu local.
4. **Fija hojas por persona con tus platicas.** Pregunta en tus 5 a 10 platicas cuantas hojas imprimen al mes y multiplica por 12. Revisa Google Trends ("imprimir" en tu estado, ultimos 12 meses): si baja, usa el numero bajo, no el optimista.
5. **Fija el precio por hoja con lo que pagan hoy.** Anota cuanto cobran la papeleria de la esquina y el ciber de enfrente. Cuenta a mano tus rivales en la calle: nombre, precio y horario. Si cierran a las 8pm y tu abres 24h, esa es tu ventaja medible.
6. **Calcula y reproduce el ejemplo en la calculadora.** Ejemplo (cambia por tus numeros):
   - TAM = 20,000 personas (ciudad, fuente: DENUE + conteo) x 48 hojas (4 al mes x 12, fuente: tus platicas) x $1.50 (fuente: papeleria y ciber) = **$1,440,000 al año**.
   - SAM = 3,000 de tu cuadra (fuente: matricula + conteo a hora pico) x 48 x $1.50 = **$216,000 (15% del TAM)**.
   - SOM de abajo hacia arriba = 80 hojas al dia (capacidad real de tu maquina) x 300 dias x $1.50 = **$36,000 al año**.
   - En la [calculadora TAM/SAM/SOM](../../../calculadoras/tam-sam-som/) mete TAM = 1,440,000, SAM = 15, SOM = 17 (el SOM es ~17% del SAM: 36,000 / 216,000).
7. **El SOM de abajo hacia arriba manda.** Si tu maquina no da 80 hojas al dia, baja el % hasta que el % y el calculo diario coincidan. Marca listo solo cuando coinciden.

El ejemplo completo con INEGI DENUE, Google Trends y conteo de rivales esta resumido aqui; el detalle vive en la [guia del Estudio 1 - Mercado](../../../guia/metodologia-6-estudios/#como-calcular-tam-sam-y-som-con-tu-vending-ejemplo-completo).

## Donde buscar gratis

- **INEGI DENUE:** cuantas papelerias y cibers hay por colonia en tu municipio (rivales del TAM).
- **Google Trends:** si "imprimir" sube o baja en tu estado en los ultimos 12 meses (ajusta hojas por persona).
- **Matricula y personal:** pidelos en la direccion de la escuela y del hospital (personas del SAM).
- **Conteo a mano:** rivales en tu calle con nombre, precio y horario; gente que pasa frente a tu local a la hora pico.

## Errores comunes

- SOM de arriba hacia abajo ("me quedo con el 5% del TAM") sin verificar con hojas al dia: el % sin maquina detras es fantasia.
- Cifras sin fuente: cada numero lleva su origen (platicas, DENUE, matricula, conteo). Sin fuente no entra al papel.
- Confundir SAM con SOM: el SAM pasa por tu cuadra, el SOM te compra a ti. El SOM siempre es menor.
- Precio de memoria: si no lo viste cobrado en la papeleria o el ciber, no es tu precio.
- Saltar al costo (paso 3) sin SOM verificado: el prorrateo del paso 3 se divide entre tu SOM.

## Checklist

- [ ] TAM en $ con personas, hojas y precio anotados, cada uno con fuente.
- [ ] SAM con % que pasa por mi cuadra (matricula + conteo a hora pico).
- [ ] SOM verificado de abajo hacia arriba: hojas al dia x dias x precio coincide con el %.
- [ ] Ejemplo reproducido en la calculadora (TAM = 1,440,000, SAM = 15, SOM = 17) con mis numeros.
- [ ] Competidores contados a mano en mi calle.
- [ ] **Papel que llena:** estudio de mercado (tabla de ventas en unidades y valor). El SOM alimenta el paso 5 de equilibrio.

## Siguiente paso

Lleva tu SOM a la [calculadora de costo](../../../calculadoras/costo-producto/) y lee la [guia del paso 3](../../../guia/paso/paso-3-costo/): sin volumen no hay prorrateo.

## Given-When-Then

- **Given** la ficha del paso 1 con platicas y precio de hoy, **When** sigo esta guia, **Then** meto el TAM en $ en la calculadora y verifico el SOM de abajo hacia arriba antes de marcar listo.
- **Given** un TAM calculado sin fuentes, **When** aplico el paso a paso, **Then** cada cifra queda con su fuente (platicas, DENUE, matricula o conteo) o no entra al papel.
- **Given** un SOM en % que no coincide con mis hojas al dia, **When** aplico la regla del SOM de abajo hacia arriba, **Then** bajo el % hasta que coincide con la capacidad real de mi maquina.

> Fuentes: `research-matriz-contenidos.md` seccion 3 (mercado: TAM/SAM/SOM, segmentos, competencia, tendencias); detalle del ejemplo en `src/content/docs-es/02-metodologia-6-estudios.md` (Estudio 1).
