---
title: "Paso 7: revisa que cada cliente si deje dinero (CAC / LTV)"
lang: es
description: "Confirma que cada cliente deja al menos 3 veces lo que costo traerlo, con un ejemplo de cafeteria reproducible en la calculadora."
---

# Paso 7: revisa que cada cliente si deje dinero (CAC / LTV)

> Definiciones (una sola vez; el resto de la guia las reusa): **CAC** es lo que pagas por conseguir un cliente nuevo. **LTV** es lo que ese cliente te deja en total. **Churn** es la tasa de abandono. Ver [glosario](../../../guia/glosario/).

## Que vas a lograr

Confirmar que un cliente te deja mas de lo que costo traerlo, con la regla **LTV >= 3 x CAC**.

Las formulas (ver `src/lib/cac-ltv.ts`):

- `CAC = gastoMarketingYVentas / clientesNuevos`
- `LTV = ticket x frecuencia x vida x margen` (forma conteo) `= (arpuMensual x margenBruto) / churnMensual` (forma tasa; `vida = 1 / churn`)
- `paybackCAC = CAC / (arpuMensual x margenBruto)` (meses para recuperar lo que costo el cliente)

Veredicto del ratio `LTV/CAC`: `< 1` insostenible, `< 3` ajustado, `3-5` sano, `>= 5` sobresaliente.

## Que necesitas del paso anterior

Del paso 6 (flujo y VPN/TIR) trae: ticket promedio, margen bruto por venta y ventas mensuales realistas.

Si aun no tienes margen, vuelve a la [calculadora de costo de producto](../../../calculadoras/costo-producto/) y a la [calculadora de precio](../../../calculadoras/pricing/).

## Paso a paso

1. Calcula tu CAC: divide lo gastado en marketing y ventas entre los clientes **nuevos** del mismo periodo.
   Ejemplo cafeteria: `$5,000 / 150 = $33.33` por cliente.
2. Calcula tu LTV con datos reales: ticket x visitas al mes x meses que se queda x margen.
   Ejemplo cafeteria: `85 x 4 x 14 x (55/85) = $3,080.00`.
3. Divide: `LTV/CAC = 3,080.00 / 33.33 = 92.4`. Como es `>= 3`, el canal es sano.
4. Calcula el payback: `33.33 / (340 x 0.6471) = 0.15` meses (unos 5 dias).
5. Compruebalo en la [calculadora CAC / LTV](../../../calculadoras/cac-ltv/) con estos valores reproducibles: CAC `33.33`, ingreso mensual por cliente `340` (= 85 x 4), margen bruto `64.71` %, churn mensual `7.14` % (= 1/14 meses).
   Debes obtener LTV `3,080`, ratio `92.4` y payback `0.15`.
6. Si el ratio sale `< 3`, no escales el gasto: primero ajusta canal, precio o retencion (ver Errores comunes).

## Donde buscar gratis

- [Meta Ad Library](https://www.facebook.com/ads/library/): mira que anuncian tus competidores y en que canales.
- [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/): estima cuanto cuesta cada clic en tu giro.
- Prueba propia con $500 a $1,000 MXN de anuncios: mide clientes nuevos reales y saca tu CAC.
- Pregunta a clientes cada cuando volverian y cuanto comprarian: de ahi salen frecuencia y vida.

## Errores comunes

- Usar el ticket completo como LTV sin multiplicar por el **margen** (el ingreso no es ganancia).
- Dividir el gasto entre clientes totales en vez de **nuevos** (eso esconde un CAC alto).
- Poner churn `0 %`: el LTV se vuelve infinito y la calculadora muestra "—" (ver `src/components/react/CacLtvCalc.tsx`).
- Escalar anuncios con ratio `< 3`: es escalar una perdida.
- Mezclar periodos (gasto mensual con clientes anuales).

## Checklist

Marca cada punto antes de pasar al paso 8:

- [ ] CAC calculado como gasto / clientes nuevos del mismo periodo.
- [ ] LTV calculado con margen, no con ingreso bruto.
- [ ] Ratio LTV/CAC >= 3 verificado en la [calculadora](../../../calculadoras/cac-ltv/).
- [ ] Payback del CAC conocido (meses).

Criterios de aceptacion (Given-When-Then):

```text
G1. Given LTV/CAC < 3, When aplicas esta guia, Then ajustas canal, precio o
    retencion en vez de escalar la perdida.
G2. Given el ejemplo cafeteria (gasto 5,000, 150 nuevos, ticket 85, 4 visitas,
    14 meses, margen 55/85), When lo metes en la calculadora, Then obtienes
    CAC 33.33, LTV 3,080, ratio 92.4 y payback 0.15.
G3. Given churn = 0, When calculas el LTV, Then no reportas un numero finito:
    corriges el churn antes de decidir.
```

## Siguiente paso

Pasa el caso por escenarios: [calculadora de sensibilidad](../../../calculadoras/sensibilidad/) y guia [paso 8: mueve los numeros](../../../guia/paso/paso-8-riesgo/).
