---
title: "Paso 6: proyecta tu dinero y revisa la inversion (VPN / TIR)"
lang: es
description: "Arma tu flujo mes a mes con inversion + colchon de 3 meses y decide con VPN > 0, TIR > tasa y payback, con el ejemplo de cafeteria reproducible."
---

# Paso 6: proyecta tu dinero mes a mes y revisa la inversion (VPN / TIR)

> Validez legal: solo Mexico. Montos en MXN.
> VPN es lo mismo que VAN (valor actual neto): aqui se usa VPN como en las calculadoras.

## Que vas a lograr

Saber cuanto dinero necesitas para arrancar y si se recupera, con tres numeros:

- **Flujo mes a mes (36 meses):** que entra, que sale y cuanto queda acumulado.
- **VPN > 0:** ganas mas de lo que metes, ya descontado a hoy.
- **TIR > tasa:** tu dinero rinde mas que la tasa base (CETES + riesgo).
- **Payback:** en que mes recuperas la inversion.

Las formulas viven en `src/lib/flujo.ts` (funciones `proyectarFlujoCaja`, `mesRecuperacion`) y `src/lib/van-tir.ts` (funciones `calcularVAN`, `calcularTIR`, `calcularPRI`, `calcularROI`, `evaluarProyecto`):

- `ingresos_t = base x (1+g)^(t-1)`, `egresos_t = fijos + ingresos_t x ratio`, `flujo_t = ingresos_t - egresos_t`, `acumulado_t = -inversion + suma(flujos_1..t)`.
- `VPN = suma(FCt / (1+r)^t) - I0`, TIR = tasa que hace VPN = 0.

Papel que llena: estudio financiero.

## Que necesitas del paso anterior

- Paso 2: tus ventas mensuales realistas (salen de tu SOM).
- Paso 3: tus costos fijos del mes y tu costo variable (ratio = cvu / precio).
- Paso 5: tu punto de equilibrio, para comparar contra el flujo.

> ADVERTENCIA (misma cifra de ventas): usa exactamente las ventas del paso 2.
> Si cambias las ventas aqui para que "si cierre", el flujo, el equilibrio y el SOM se contradicen y todo el estudio se cae.
> La cifra madre de ventas es una sola y vive en el paso 2.

Sin ventas y costos cerrados no hay flujo: vuelve atras si te falta alguno.

## Paso a paso

1. **Suma tu inversion inicial + colchon de 3 meses.** Equipo, adecuacion del local, permisos y 3 meses de gastos fijos para aguantar la rampa.
   Ejemplo trazable (`examples/cafeteria-mx/inputs.json`): $650,000 = $350,000 adecuacion + $200,000 equipo + $100,000 capital de trabajo.
2. **Escribe tus ventas mes a mes (36 meses)** con la cifra del paso 2, nada de ventas nuevas.
   El ejemplo trae el detalle mensual en `examples/cafeteria-mx/flujo-36m.csv`.
3. **Calcula tus egresos de cada mes:** fijos + ventas x ratio variable.
   Ejemplo cafeteria: ratio = 30 / 85 = 35.29%, fijos $90,000 el ano 1 (suben 5% anual).
4. **Saca flujo y acumulado** en la [calculadora de flujo de caja](../../../calculadoras/flujo-caja/).
   Verificala con este ejemplo reproducible: inversion 500,000, base 140,000, crecimiento 2%, fijos 60,000, CV 35% -> mes 1: ingresos 140,000, egresos 109,000, flujo 31,000, acumulado -469,000.
   Si no te da eso, revisa que escribiste bien los campos.
5. **Pon tu tasa base:** CETES + prima de riesgo.
   Ejemplo: 12% = CETES ~9% + 3% de riesgo (ver `inputs.json`, campo `notaTasa`).
   Busca el CETES vigente en cetesdirecto o Banxico (seccion siguiente).
6. **Calcula VPN y TIR** en la [calculadora de VPN / TIR](../../../calculadoras/vpn-tir/) con tus flujos anuales e inversion.
   Ejemplo trazable (derivacion completa en `examples/cafeteria-mx/resultados-esperados.md`, no se copia aqui):
   inversion 650,000, flujos 162,352.94 / 496,588.24 / 900,476.47 (con rescate), tasa 12% -> VPN 531,776.45, TIR 44.37%, payback mes 24.
7. **Lee el veredicto y escribelo:**
   - SEGUIR: VPN > 0, TIR > tasa y payback dentro de tu horizonte (el ejemplo: mes 24 de 36).
   - AJUSTAR: VPN apenas > 0 o payback al limite; baja inversion o fijos, o sube ventas con evidencia, y recalcula.
   - PARAR: VPN < 0 o TIR < tasa; la inversion no se recupera con estos numeros. Archiva y no inyectes mas capital.
   - Si la calculadora no reporta TIR o payback (nunca se recupera), eso tambien es veredicto: PARAR.

## Donde buscar gratis

- Cotizaciones de equipo y de adecuacion del local: pide 3 por escrito, con fecha.
- Tasa base: [cetesdirecto](https://www.cetesdirecto.com/) y [Banxico](https://www.banxico.org.mx/).
- El caso con formulas a mano: `examples/cafeteria-mx/resultados-esperados.md`, con datos en `examples/cafeteria-mx/inputs.json` y flujo mensual en `examples/cafeteria-mx/flujo-36m.csv`.
- Ventas y costos: tus numeros de los pasos 2 y 3, no fuentes nuevas.

## Errores comunes

- Usar ventas distintas a las del paso 2 para que "si cierre": el flujo deja de cuadrar con el SOM y el equilibrio.
- Olvidar el colchon de 3 meses: sin el, el primer bache te deja sin caja aunque el VPN salga positivo.
- Comparar la TIR contra nada: la TIR solo significa algo contra tu tasa (CETES + riesgo).
- Tasa inventada o copiada del ejemplo sin revisar el CETES vigente.
- Mezclar periodos: tasa anual con flujos mensuales sin convertir, o viceversa.
- Copiar las cifras del ejemplo (VPN, TIR, payback) como si fueran las tuyas: el ejemplo es para verificar las calculadoras, tus numeros salen de tus ventas y costos.

## Checklist

- [ ] Inversion inicial sumada con desglose + colchon de 3 meses de fijos.
- [ ] Ventas mes a mes iguales a las del paso 2 (misma cifra, sin cambios).
- [ ] Flujo a 36 meses calculado y verificado con el ejemplo reproducible en la [calculadora](../../../calculadoras/flujo-caja/).
- [ ] VPN, TIR y payback calculados en la [calculadora VPN / TIR](../../../calculadoras/vpn-tir/) con tasa base documentada (CETES + riesgo).
- [ ] Veredicto escrito: SEGUIR, AJUSTAR o PARAR, con los tres numeros a la vista.

## Criterios de aceptacion (Given-When-Then)

- **G1. Decision con el ejemplo:** Given los flujos del ejemplo cafeteria (inversion 650,000, flujos anuales desde `examples/cafeteria-mx/inputs.json`), When sigues la guia, Then interpretas VPN 531,776.45 > 0, TIR 44.37% > 12% y payback mes 24, y decides que la inversion si se recupera.
- **G2. Flujo consistente:** Given tus ventas del paso 2 y costos del paso 3, When armas el flujo a 36 meses en la calculadora, Then el acumulado cuadra mes a mes (`acumulado_t = acumulado_{t-1} + flujo_t`) y conoces tu mes de recuperacion.
- **G3. Veredicto honesto:** Given VPN < 0 o TIR < tasa, When aplicas el veredicto, Then ajustas con evidencia o paras y archivas, en vez de inyectar mas capital.

## Siguiente paso

Confirma que cada cliente deja dinero:

- Calculadora de [CAC / LTV](../../../calculadoras/cac-ltv/): lo que cuesta traer un cliente contra lo que deja.
- Guia [paso 7: revisa que cada cliente si deje dinero](../../../guia/paso/paso-7-clientes/): la regla LTV >= 3 x CAC con el mismo ejemplo de cafeteria.
