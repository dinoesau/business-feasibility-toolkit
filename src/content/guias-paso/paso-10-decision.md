---
title: "Paso 10 - Decisión Go / No-Go y empaquetado"
lang: es
description: "Junta los pasos 1-9, decide ejecutar, ajustar o descartar con números escritos, y empaqueta estudio, plan, resumen y pitch con cifras consistentes."
---

# Paso 10 - Decisión: sigues o no (y tus papeles finales)

> Con números escritos, no con emoción.

## Que vas a lograr

Una hoja de decisión firmada: tabla de los 6 estudios en verde, amarillo o rojo, más un veredicto escrito en una palabra: EJECUTAR, AJUSTAR o DESCARTAR.
Si ejecutas, sales con el orden exacto para armar tus 4 papeles finales.

## Que necesitas del paso anterior

Los números cerrados de los pasos 1 al 9, cada uno en su papel:

1. Ficha de idea (paso 1).
2. Mercado: TAM, SAM, SOM y ventas por año (paso 2).
3. Costos con fuente y fecha (paso 3).
4. Precio contra 5 a 10 competidores (paso 4).
5. Punto de equilibrio en piezas por mes (paso 5).
6. Flujo, VAN, TIR y payback (paso 6, tasa base: CETES).
7. CAC, LTV y regla LTV/CAC >= 3 (paso 7).
8. Sensibilidad: que aguante un caso malo de 20% (paso 8).
9. Legal y socios: SAT, IMPI, permiso municipal (paso 9).

Si un número falta o cambió, vuelve a su paso antes de decidir. Decidir con huecos es adivinar.

## Paso a paso

### 1. Junta tus números en una fila

Pon en una sola tabla: ventas año 1 a 3, costos fijos y variables, precio, equilibrio, VAN, TIR, payback, CAC, LTV y el peor caso de la sensibilidad.
Una sola cifra madre por concepto: la que uses aquí es la que irá a todos los papeles.

### 2. Pinta cada estudio: verde, amarillo o rojo

| Estudio | Verde si | Rojo si |
|---|---|---|
| Mercado (pasos 2 y 7) | >= 70% de supuestos confirmados con datos primarios; hay carta de intención o tracción | nadie paga, o el SOM no alcanza el equilibrio |
| Técnico (paso 3) | proceso en 5 pasos o menos, cotizaciones por rubro mayor, ubicación con servicios | no hay equipo, insumo o ubicación viable |
| Organizacional | roles críticos cubiertos, sin conflictos abiertos | falta quien opere y no hay plan para cubrirlo |
| Legal MX (paso 9) | permisos obtenibles en plazo, NOMs con ruta presupuestada, marca solicitada | uso de suelo negado o giro prohibido |
| Financiero (pasos 5, 6 y 8) | VAN > 0, TIR > costo de capital, equilibrio alcanzable con el SOM, flujo positivo en 24 meses o burn cubierto, aguanta -10% precio o +10% costos | VAN < 0 sin arreglo, o el equilibrio pide más clientes de los que existen |
| Ambiental | impactos mitigables con costo conocido | daño no mitigable o permiso ambiental negado |

Amarillo = casi verde con condición escrita: que falta, quien lo arregla y para que fecha.
Los umbrales exactos viven en `src/content/checklists/go-no-go.md`: aplícalos ahí, no los copio aquí para no tener dos versiones que se contradigan.

### 3. Da el veredicto en una palabra

| Veredicto | Cuando | Que sigue |
|---|---|---|
| EJECUTAR | todo verde, o amarillos con mitigación escrita | empaquetado (punto 5) |
| AJUSTAR | 1 o 2 rojos con arreglo posible | plan de 30/60/90 días y nueva sesión de decisión |
| DESCARTAR | rojo estructural en mercado, legal o financiero | archiva con lecciones; ni un peso más de capital |

Sin acta no hay EJECUTAR: fecha, asistentes y firmas en la misma hoja.

### 4. Ejemplo con números: como se presenta un caso

Del caso `examples/cafeteria-mx/resultados-esperados.md` (cada número con fórmula y fuente, sin números mágicos):

- SOM: $4,773,600 al año (180 tickets al día x 312 días x $85).
- Equilibrio: 1,637 tickets al mes (unos 55 al día).
- VAN: $531,776.45 al 12% (> 0). TIR: 44.37% (> 12%). Payback: mes 24.
- LTV/CAC: 92x (marketing de barrio, $33.33 por cliente).
- Sensibilidad: con -20% en ventas el VAN se vuelve negativo; sin rescate el VAN sigue > 0 ($425,009.74).

Veredicto del caso: EJECUTAR con amarillos (sensibilidad con mitigación escrita: bajar costo fijo o asegurar ventas antes de firmar renta; y ojo: números sin ISR, siguiente iteración con ISR 30%).
Así se decide: número, fuente, color y condición, todo por escrito.

### 5. Si ejecutas: empaqueta en este orden

1. **Estudio de factibilidad** (plantilla 01): vacía tus pasos 1 a 9 y pega tu tabla Go/No-Go con el acta.
2. **Plan de negocios** (plantilla 02): cuenta la historia con los mismos números (TAM/SAM/SOM, modelo, roadmap, financiamiento).
3. **Resumen ejecutivo** (plantilla 03, 2 páginas, se escribe al final): página 1 valor, página 2 datos y solicitud.
4. **Pitch deck** (plantilla 04, 12 slides): problema, solución, mercado, equipo, finanzas y solicitud.

Regla de oro: cifras idénticas en los 4 papeles. Si cambia un número, cambia en todos antes de mostrarlo a nadie.
El pacto de socios corre en paralelo con un contador, no después del pitch.

## Donde buscar gratis

- Tus papeles de los pasos 1 a 9: ya los tienes, no necesitas nada externo.
- Las calculadoras del sitio para recalcular VAN, TIR y equilibrio con la misma tasa.
- El caso con fórmulas a mano: `examples/cafeteria-mx/resultados-esperados.md`.
- Las 4 plantillas ZIP (gratis) y Overleaf (gratis) en la página de plantillas.

## Errores comunes

- Decidir con emoción ("siento que sí") en vez de llenar la tabla.
- Copiar el checklist a tu hoja en vez de aplicarlo (terminas con dos versiones distintas).
- Cifras distintas en cada papel (el plan dice una venta, el deck otra).
- EJECUTAR sin acta ni firmas.
- Meter más dinero después de DESCARTAR.
- Brincarse la sensibilidad porque "el caso base ya sale".
- Armar el deck antes de cerrar los números.

## Checklist

- [ ] Tabla con los 6 estudios pintada: verde, amarillo o rojo.
- [ ] Cada amarillo tiene mitigación escrita con responsable y fecha.
- [ ] Veredicto marcado: EJECUTAR, AJUSTAR o DESCARTAR.
- [ ] Acta con fecha, asistentes y firmas (sin acta no hay GO).
- [ ] Si EJECUTAR: cifra madre definida y empaquetado iniciado en orden.
- [ ] Si DESCARTAR: lecciones archivadas y capital cerrado.

Detalle de umbrales: `src/content/checklists/go-no-go.md`.
Filtro previo (regla >= 80% para pasar al estudio completo): `src/content/checklists/prefactibilidad.md`.

## Criterios de aceptación (Given-When-Then)

- **G1. Decisión con números:** Given pasos 1 a 9 completos, When aplicas esta guía, Then sales con veredicto escrito (ejecutar, ajustar o descartar) con fecha y firmas, no con emoción.
- **G2. Cifras consistentes:** Given veredicto EJECUTAR, When empaquetas, Then ventas, costos, VAN/TIR y equilibrio son idénticos en estudio, plan, resumen y pitch.
- **G3. Rojo estructural para:** Given un rojo sin arreglo en mercado, legal o financiero, When cierras la sesión, Then el veredicto es DESCARTAR: archivas lecciones y no inyectas más capital.

## Siguiente paso

Si tu veredicto es EJECUTAR, arma tus 4 papeles en orden (estudio, plan, resumen, pitch): [plantillas](../../../plantillas/).
Si es AJUSTAR, vuelve al paso del número rojo con tu plan de 30/60/90 días.
Si es DESCARTAR, archiva las lecciones y empieza una ficha nueva.
