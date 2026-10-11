<!--
Given-When-Then (criterios de aceptacion de esta guia):
- GWT1: Given Q* mayor que el SOM mensual, When aplicas la regla de salida, Then paras y ahorras en vez de seguir gastando.
- GWT2: Given CF=10_000, p=100, cvu=60, When usas la calculadora de punto de equilibrio, Then margen=40, Q*=250 uds, ingreso=$25_000 (reproducible).
- GWT3: Given Q* entre 50% y 100% del SOM mensual, When aplicas los criterios, Then ajustas (precio, costos o fijos) y recalculas antes del paso 6.
12 Factors III/V: enlaces internos con ../../../ (paridad dev-prod). Regla de salida en un solo lugar (esta guia).
-->

---
title: "Paso 5: punto de equilibrio y salida temprana"
lang: es
description: "Calcula cuantas unidades debes vender al mes para no perder y comparalas con tu SOM: si necesitas mas clientes de los que existen, para."
---

# Paso 5: punto de equilibrio y salida temprana

## Que vas a lograr

Saber cuantas unidades al mes debes vender para no perder (Q*), con esta formula:

```text
Q* = CF / (p - cvu)
```

- CF = costos fijos del mes (renta, servicios, sueldos, contador).
- p = precio por unidad (paso 4).
- cvu = costo variable por unidad (paso 3).
- (p - cvu) es tu margen de contribucion: lo que cada venta aporta para pagar los fijos.

Y lo mas importante: comparar Q* contra tu SOM mensual del paso 2.
Si necesitas mas clientes de los que existen, la idea no cierra y paras aqui, antes de gastar mas.

## Que necesitas del paso anterior

- Paso 3: tu costo variable por unidad (cvu), con todo incluido.
- Paso 4: tu precio por unidad (p), mayor que el cvu.
- Paso 2: tu SOM mensual (clientes reales que si puedes ganar al mes).
- Tu lista de costos fijos del mes (renta, luz, agua, internet, gas, programas, sueldos con seguro social, contador, desgaste de equipos).

Sin estos tres numeros (costo, precio, SOM) no puedes hacer este paso. Vuelve atras si te falta alguno.

## Paso a paso

1. Suma tus costos fijos del mes (CF). Anota cada rubro con su monto.
2. Calcula tu margen: p - cvu. Debe ser mayor que cero. Si el precio no supera el costo variable, no hay equilibrio posible: vuelve al paso 4.
3. Calcula Q* = CF / (p - cvu) y el ingreso de equilibrio = Q* x p.
   Verificalo en la [calculadora de punto de equilibrio](../../../calculadoras/punto-equilibrio/) con este ejemplo reproducible:
   CF = 10,000, p = 100, cvu = 60 -> margen = 40, Q* = 250 unidades, ingreso = $25,000.
   Si la calculadora no te da eso con esos datos, revisa que escribiste bien los campos.
4. Compara Q* contra tu SOM mensual con la regla de salida (seccion siguiente). El veredicto se escribe, no se siente.
5. Segun el veredicto: sigue al paso 6, ajusta y recalcula, o para y archiva con tus numeros.

### Regla de salida (unico lugar donde vive esta regla)

| Veredicto | Condicion | Que haces |
|---|---|---|
| SEGUIR | Q* <= 50% del SOM mensual | El mercado alcanza con margen. Pasa al paso 6. |
| AJUSTAR | Q* entre 50% y 100% del SOM mensual | Sube precio, baja costos o recorta fijos; recalcula Q* y vuelve a comparar antes de seguir. |
| PARAR | Q* > SOM mensual | No hay suficientes clientes para no perder. Para aqui: archiva tus numeros y no inyectes mas dinero. |

Parar a tiempo es ganar: ahorras la inversion, la renta y los meses de operacion en perdida.

## Donde buscar gratis

- Rentas de locales parecidos: Inmuebles24 o Vivanuncios.
- Luz, agua, internet y gas: tus recibos o los de un conocido con local parecido.
- Sueldos: OCCMundial o Computrabajo para tu puesto y ciudad (suma el seguro social).
- Contador: pide precio a uno de tu ciudad.
- SOM: repasa tu numero del paso 2 (INEGI, conteo de competidores, Google Trends). No compares un Q* mensual contra un SOM anual: ponlos en el mismo periodo.

## Errores comunes

- Precio menor o igual que el costo variable (margen <= 0): la formula no tiene solucion.
- Olvidar fijos: contador, seguro social de empleados, programas mensuales y desgaste de equipos.
- Comparar peras con manzanas: Q* mensual contra SOM anual o contra el TAM.
- Usar un SOM sin evidencia para que "si cierre": el SOM es el del paso 2, no uno inventado.
- Cambiar la regla sobre la marcha: la regla de salida vive aqui, en un solo lugar. No hay otra version.

## Checklist

- [ ] Margen (p - cvu) mayor que cero, con costo del paso 3 y precio del paso 4.
- [ ] Q* calculado y reproducible en la calculadora (verificaste el ejemplo 10,000 / 100 / 60 -> 250 uds).
- [ ] Q* comparado contra el SOM mensual del paso 2, en el mismo periodo.
- [ ] Veredicto escrito: SEGUIR, AJUSTAR o PARAR, con los numeros a la vista.
- [ ] Si es PARAR: decision archivada con fecha; no se gasta mas hasta redisenar la idea.

## Siguiente paso

Si el veredicto es SEGUIR o ya ajustaste y ahora si cierra:

- Calculadora de [flujo de caja](../../../calculadoras/flujo-caja/): proyecta tu dinero mes a mes.
- Guia [paso 6: tu dinero](../../../guia/paso/paso-6-dinero/): cuanto necesitas para arrancar y si se recupera (VPN / TIR).

Si el veredicto es PARAR, salta a la [guia del paso 10](../../../guia/paso/paso-10-decision/) y archiva tu decision.
