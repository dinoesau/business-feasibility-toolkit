---
title: "Paso 3: saca tu costo real"
lang: es
description: "Guia del paso 3: elige tu metodo (unidad, hora o receta), prorratea con tu SOM y compara tu costo contra el precio de hoy."
---

# Paso 3: saca tu costo real

## Que vas a lograr

Al terminar este paso tienes un numero defendible: cuanto te cuesta cada unidad, cada hora o cada receta, con todo incluido.
Ese costo alimenta el paso 4 (precio) y el paso 5 (equilibrio).

## Que necesitas del paso anterior

Tu SOM del paso 2: el volumen realista que si puedes vender.
Sin volumen no hay prorrateo: los gastos del mes se dividen entre tus piezas u horas, y ese divisor sale del SOM.
Si aun no lo tienes, vuelve a la [calculadora de TAM/SAM/SOM](../../../calculadoras/tam-sam-som/).

## Paso a paso

1. **Elige tu metodo.** Vendes piezas: por unidad. Vendes tiempo: por hora. Mezclas insumos que rinden varias porciones: por receta. Solo uno para empezar.
2. **Anota tus directos o insumos.** Pide precio con 3 proveedores y divide cada paquete entre lo que rinde. Nada de precios de memoria.
3. **Pon merma y desgaste con numero, nunca en cero por olvido.** La merma va en % sobre tus directos; el desgaste es precio del equipo entre meses de vida entre piezas del mes.
4. **Prorratea tus indirectos con tu SOM.** Renta, luz, software, contador: cada gasto del mes dividido entre tu volumen. Si lo pagas vendas o no, se prorratea. Si se mueve con cada venta, es directo.
5. **Reproduce tu caso en la calculadora.** Mete tus numeros en la [calculadora de costo](../../../calculadoras/costo-producto/): ella aplica las reglas implementadas en `src/lib/costo-producto.ts` (funciones `calcularCostoProducto`, `calcularCostoHora` y `calcularReceta`). Aqui solo se enuncian los metodos; las formulas viven en el lib y en la calculadora, no se duplican aqui.
6. **Compara tu costo contra el precio de hoy.** Anota cuanto pagan hoy tus clientes por algo parecido. Si tu costo queda arriba, tienes 3 palancas: mas volumen, menos costo o mejor precio. El paso 4 pone el precio a prueba.

### Metodo por unidad (ejemplo, cambia por tus numeros)

- Directos: $150 + $15 = $165.
- Indirectos del mes prorrateados: $20 + $10 + $20 + $5 + $15 = $70.
- Costo total: $235 por pieza.
- Con 50% de markup la base es $352.50 y con IVA $408.90.
- Reprodúcelo en la [calculadora de costo](../../../calculadoras/costo-producto/) con tus propios numeros.

### Metodo por hora (ejemplo, cambia por tus numeros)

- Sueldo meta $20,000 + gastos $5,000 = $25,000 entre 100 horas facturables = $250 por hora.
- Ojo: son las horas que si cobras, no las 160 del mes.
- Reprodúcelo en la [calculadora de costo](../../../calculadoras/costo-producto/) (pestana por hora) con tus propios numeros.

### Metodo por receta (ejemplo, cambia por tus numeros)

- Insumos: 2x$10 + 1.5x$20 + 3x$5 = $65.
- Merma 10% = $6.50. Total $71.50 entre 10 porciones = $7.15 por porcion.
- Reprodúcelo en la [calculadora de costo](../../../calculadoras/costo-producto/) (pestana por receta) con tus propios numeros.

La explicacion de cada metodo tambien esta en la [guia del Estudio 2 - Tecnico](../../../guia/metodologia-6-estudios/#como-sacar-tu-costo-real-ejemplos-por-giro).

## Donde buscar gratis

- **Directos:** 3 cotizaciones de proveedores (foto o captura con fecha). Gratis pedirlas.
- **Merma:** pesala o cuentala tu una semana: lo que se pierde o sale mal entre lo producido.
- **Desgaste:** placa o manual de tu equipo (precio y vida util) entre tu volumen del SOM.
- **Volumen:** tu SOM del paso 2, ya calculado.

## Errores comunes

- Dejar merma o desgaste en cero por olvido.
- Dividir entre las 160 horas del mes en vez de las horas que si facturas.
- Usar margen sobre precio como si fuera markup sobre costo (50% de markup = 33.3% de margen, no 50%).
- Prorratear entre un volumen optimista en vez del SOM realista: el costo queda artificialmente bajo.
- Confundir precio de lista con costo: el precio de hoy es tu referencia, no tu costo.

## Checklist

- [ ] Costo por pieza, hora o receta calculado con mi metodo.
- [ ] Directos o insumos con 3 cotizaciones anotadas (proveedor + fecha).
- [ ] Merma y desgaste incluidos, no en cero por olvido.
- [ ] Indirectos prorrateados con mi SOM del paso 2.
- [ ] Costo total comparado contra el precio que pagan hoy.

## Siguiente paso

Lleva tu costo al [paso 4: pon tu precio](../../../calculadoras/pricing/) y lee la [guia del paso 4](../../../guia/paso/paso-4-precio/).

## Given-When-Then

- **Given** el SOM del paso 2, **When** sigo esta guia por el metodo de unidad, **Then** obtengo mi costo por pieza y lo comparo contra el precio de hoy.
- **Given** el SOM del paso 2, **When** sigo esta guia por el metodo de hora, **Then** obtengo mi costo por hora facturable y lo comparo contra el precio de hoy.
- **Given** el SOM del paso 2, **When** sigo esta guia por el metodo de receta, **Then** obtengo mi costo por porcion y lo comparo contra el precio de hoy.
