# Cafeteria MX - Resultados esperados (golden file)

> Golden file para TDD (worker 2).
> Cada numero deriva de `inputs.json` con formula explicita.
> Antipattern evitado: numeros magicos sin inputs trazables.
> Si `src/lib` existe, estos valores son los `expected` de los tests.
> Si no existe, son la especificacion que worker 2 debe implementar.

Moneda: MXN. Redondeo: 2 decimales en calculo, enteros en reporte salvo VAN/TIR.

## 0. Criterios de aceptacion (Given-When-Then)

```text
G1. Ejemplo reproducible:
  Given inputs.json versionado en examples/cafeteria-mx/
  When cualquier persona ejecuta las formulas de este archivo a mano o con node
  Then obtiene TAM=225,000M, SAM=10,800M, SOM=4,773,600, Q*=1,637/mes,
       VAN=531,776.45, TIR=44.37%, payback mes 24, CAC=33.33, LTV=3,080.00.

G2. Trazabilidad total:
  Given un valor en este archivo
  When se pregunta "de donde sale"
  Then hay formula + referencia a campo de inputs.json (sin excepciones).

G3. Escenarios consistentes:
  Given factores 0.8 / 1.0 / 1.2 sobre ventas
  When se recalcula VAN/TIR con misma tasa 12% y mismos CF
  Then VAN pesimista < 0 < VAN base < VAN optimista (orden verificado abajo).
```

Metodologias aplicadas: 3 criterios Given-When-Then (arriba), TDD golden files
(este archivo + inputs.json + flujo-36m.csv), 12-Factor X parity
(mismos inputs en dev/CI/prod) y XII admin tasks (scripts/ para recalcular),
good-typescript (parsear inputs en el borde, core con tipos probados),
bloodhound-antipatterns (sin Magic Numbers, sin Error Hiding, sin Spaghetti).

---

## 1. TAM / SAM / SOM (a mano)

Formula general: `mercado = personas * ocasiones/anio * ticket`.

### TAM (nacional)

```text
personas   = 25,000,000  (inputs.mercado.tam.personas)
ocasiones  = 150         (inputs.mercado.tam.ocasionesPorPersonaAnio)
ticket     = $60         (inputs.mercado.tam.ticketPromedio)

TAM = 25,000,000 * 150 * 60
    = 25,000,000 * 9,000
    = 225,000,000,000
    = $225,000 millones MXN
```

### SAM (ZMG)

```text
personas   = 1,200,000
ocasiones  = 150
ticket     = $60

SAM = 1,200,000 * 150 * 60
    = 1,200,000 * 9,000
    = 10,800,000,000
    = $10,800 millones MXN
```

### SOM (una cafeteria, bottom-up)

```text
tickets/dia = 180   (inputs.mercado.som.ticketsPorDia)
dias/anio   = 312   (6 dias/semana * 52)
ticket      = $85   (inputs.mercado.som.ticketPromedio)

tickets/anio = 180 * 312 = 56,160
SOM = 56,160 * 85 = 4,773,600 MXN/anio

% de SAM = 4,773,600 / 10,800,000,000 = 0.000442 = 0.0442%
```

Lectura: el SOM es 0.04% del SAM. Coherente para un solo local.
Si worker 2 calcula market share > 1% con estos inputs, el test debe fallar.

---

## 2. Punto de equilibrio

```text
p   = 85  (inputs.operacion.precioPromedio)
cvu = 30  (inputs.operacion.costoVariableUnitario)
CF  = 90,000/mes (25,000 + 45,000 + 8,000 + 5,000 + 7,000)

Margen unitario = p - cvu = 85 - 30 = 55
Margen %        = 55 / 85 = 64.7059%

Q* = CF / (p - cvu) = 90,000 / 55 = 1,636.3636...
Q* redondeado arriba = 1,637 tickets/mes

Ventas equilibrio = 1,636.3636 * 85 = 139,090.91 MXN/mes
Ventas equilibrio (con Q entero) = 1,637 * 85 = 139,145 MXN/mes
Tickets/dia (30 dias) = 1,637 / 30 = 54.57 -> 55 tickets/dia
```

Verificacion cruzada: con 55 tickets/dia * 30 * 85 = 140,250 > 139,145. OK.

---

## 3. VAN y TIR a 3 anios (a mano)

### 3.1 Derivacion de flujos

```text
CV = ventas * cvu / p = ventas * 30 / 85 = ventas * 0.3529411765
CF anual Y1 = 90,000 * 12 = 1,080,000
CF anual Y2 = 1,080,000 * 1.05 = 1,134,000
CF anual Y3 = 1,134,000 * 1.05 = 1,190,700

Y1: ventas 1,920,000
    CV = 1,920,000 * 30/85 = 677,647.06
    EBITDA = 1,920,000 - 677,647.06 - 1,080,000 = 162,352.94

Y2: ventas 2,520,000
    CV = 2,520,000 * 30/85 = 889,411.76
    EBITDA = 2,520,000 - 889,411.76 - 1,134,000 = 496,588.24

Y3: ventas 3,000,000
    CV = 3,000,000 * 30/85 = 1,058,823.53
    EBITDA = 3,000,000 - 1,058,823.53 - 1,190,700 = 750,476.47

Flujos libres (supuesto: sin ISR, ver inputs.inversion.supuestoFiscal):
  F0 = -650,000 (inversion)
  F1 = 162,352.94
  F2 = 496,588.24
  F3 = 750,476.47 + 150,000 (rescate) = 900,476.47
```

### 3.2 VAN al 12%

```text
r = 0.12
VAN = -650,000 + F1/1.12 + F2/1.12^2 + F3/1.12^3

F1/1.12       = 162,352.94 / 1.12        = 144,957.99
F2/1.2544     = 496,588.24 / 1.2544      = 395,928.51
F3/1.404928   = 900,476.47 / 1.404928    = 640,889.95

Suma descontada = 144,957.99 + 395,928.51 + 640,889.95 = 1,181,776.45
VAN = 1,181,776.45 - 650,000 = 531,776.45 MXN
```

**VAN esperado = $531,776.45 > 0. Proyecto viable al 12%.**

### 3.3 TIR (a mano, verificada por biseccion)

TIR = r* tal que VAN(r*) = 0.

```text
VAN(40%) = -650,000 + 162,352.94/1.40 + 496,588.24/1.96 + 900,476.47/2.744
         = -650,000 + 115,966.39 + 253,361.35 + 328,142.74
         = +47,470.48  (> 0)

VAN(45%) = -650,000 + 162,352.94/1.45 + 496,588.24/2.1025 + 900,476.47/3.048625
         = -650,000 + 111,967.55 + 236,207.06 + 295,363.93
         = -6,461.47  (< 0)

Interpolacion: 40% + 47,470.48/(47,470.48+6,461.47) * 5%
             = 40% + 4.399% = 44.399% ~= 44.37% (biseccion exacta)
```

**TIR esperada = 44.37% (biseccion a tolerancia 1e-9).**
Regla: TIR 44.37% > tasa 12% -> consistente con VAN > 0.

### 3.4 Payback

```text
Acumulado tras Y1: -650,000 + 162,352.94 = -487,647.06
Acumulado tras Y2: -487,647.06 + 496,588.24 = +8,941.18
Payback en el anio 2. Fraccion = 487,647.06 / 496,588.24 = 0.982 -> mes ~12 del anio 2.
Con flujo mensual (ver flujo-36m.csv): acumulado >= 0 en el mes 24.
```

**Payback esperado = mes 24 (diciembre del anio 2).**

---

## 4. Pricing del menu (a mano)

Formula: `margen = precio - costo; margen% = margen / precio`.

| Item | Precio | Costo | Margen $ | Margen % | Calculo |
|---|---|---|---|---|---|
| Espresso | 40 | 12 | 28 | 70.00% | 28/40 |
| Americano | 45 | 13 | 32 | 71.11% | 32/45 |
| Latte | 55 | 19 | 36 | 65.45% | 36/55 |
| Capuchino | 55 | 19 | 36 | 65.45% | 36/55 |
| Mocha | 65 | 24 | 41 | 63.08% | 41/65 |
| Pan dulce | 35 | 12 | 23 | 65.71% | 23/35 |
| Sandwich | 75 | 30 | 45 | 60.00% | 45/75 |
| Paquete desayuno | 99 | 44 | 55 | 55.56% | 55/99 |

Notas de estrategia (trazables, no magicas):
- Precio psicologico: paquete en 99 (no 100).
- Bundle: latte (55) + sandwich (75) = 130 por separado; paquete 99 = descuento 23.8% que sube ticket vs. solo bebida.
- Ticket promedio 85 del modelo: mezcla 60% bebidas (~52) + 40% alimentos/paquetes (~85-99) + venta cruzada pan. Worker 2 puede testear: `precioPaquete < precioLatte + precioSandwich`.

---

## 5. CAC y LTV (a mano)

```text
Gasto marketing mensual = 5,000 (inputs.marketing.gastoMensual)
Clientes nuevos/mes     = 150   (inputs.marketing.clientesNuevosPorMes)

CAC = 5,000 / 150 = 33.33 MXN por cliente

Ticket        = 85
Visitas/mes   = 4
Meses vida    = 14
Margen unit   = 55/85 = 0.6470588235

LTV = 85 * 4 * 14 * (55/85)
    = 85 * 4 = 340; 340 * 14 = 4,760; 4,760 * 55/85 = 3,080.00 MXN

LTV/CAC = 3,080.00 / 33.33 = 92.4
Payback CAC = 33.33 / (85*4*0.6471) = 33.33 / 220.00 = 0.15 meses (~5 dias)
```

Lectura: LTV/CAC 92x es excelente porque el marketing es de barrio
(flyers, redes organicas). Si worker 2 obtiene LTV/CAC < 3 con estos inputs,
el test debe fallar (indica error en margen o permanencia).

---

## 6. Flujo 36 meses

Ver `flujo-36m.csv` (columnas: mes, ventas, costo_variable, costo_fijo, flujo, acumulado).
Reglas usadas (todas de inputs.json):

```text
costo_variable(m) = ventas(m) * 30 / 85
costo_fijo(m)     = inputs.costoFijoMensual36[m]
flujo(m)          = ventas - costo_variable - costo_fijo
acumulado(m)      = -650,000 + suma(flujo(1..m))
```

Resumen anual (debe coincidir con seccion 3):

| Anio | Ventas | CV | CF | Flujo | Acumulado fin |
|---|---|---|---|---|---|
| 1 | 1,920,000 | 677,647.06 | 1,080,000 | 162,352.94 | -487,647.06 |
| 2 | 2,520,000 | 889,411.76 | 1,134,000 | 496,588.24 | 8,941.18 |
| 3 | 3,000,000 | 1,058,823.53 | 1,190,700 | 750,476.47 | 759,417.65 |

Acumulado operativo mes 36 = 759,417.65 (sin rescate).
Con rescate 150,000 = 909,417.65.
Meses 1-2 en negativo (-5,882 y -2,000) por rampa; mes 3 ya positivo (+1,882).
Payback mes 24 con acumulado +8,941.18.

---

## 7. Escenarios (a mano)

Factor f aplica a ventas de cada anio. CV = ventas*f * 30/85. CF igual.

| Escenario | f | F1 | F2 | F3 (con rescate) | VAN 12% | TIR aprox |
|---|---|---|---|---|---|---|
| Pesimista | 0.8 | -86,117.65 | 170,470.59 | 512,241.18 | -226,389.50 | negativa/~-? (VAN<0) |
| Base | 1.0 | 162,352.94 | 496,588.24 | 900,476.47 | +531,776.45 | 44.37% |
| Optimista | 1.2 | 410,823.53 | 822,705.88 | 1,288,711.76 | +1,289,942.39 | >60% |

Derivacion pesimista Y1 (ejemplo, resto analogo):

```text
ventas = 1,920,000 * 0.8 = 1,536,000
CV = 1,536,000 * 30/85 = 542,117.65
F1 = 1,536,000 - 542,117.65 - 1,080,000 = -86,117.65
```

Orden G3 verificado: -226,389.50 < 0 < 531,776.45 < 1,289,942.39. OK.

---

## 8. Como verificar (XII admin tasks / X parity)

```bash
# Validar JSON
node -e "JSON.parse(require('fs').readFileSync('examples/cafeteria-mx/inputs.json','utf8')); console.log('inputs.json OK')"

# Recalcular VAN/TIR desde inputs (sin numeros copiados a mano en el script)
node scripts/recalc-cafeteria.mjs  # si worker 2 lo crea; si no, usar formulas de arriba

# Verificar CSV suma a anuales
node -e "
const fs=require('fs');
const rows=fs.readFileSync('examples/cafeteria-mx/flujo-36m.csv','utf8').trim().split('\n').slice(1);
let s=[0,0,0,0];
rows.forEach((l,i)=>{const c=l.split(','); const y=Math.floor(i/12); s[y]+=parseFloat(c[4]);});
console.log('flujos anuales desde CSV:',s.map(v=>v.toFixed(2)).join(', '));
"
# Esperado: 162352.94, 496588.24, 750476.47
```

12-Factor X (parity): estos mismos inputs deben usarse en dev, CI y prod.
Nada de "ventas de prueba" distintas por entorno.

## 9. Limites conocidos (honestidad tecnica)

- Sin ISR/IVA/PTU: subestima carga fiscal MX real. Siguiente iteracion: variante con ISR 30%.
- Sin estacionalidad fina (diciembre real > enero). Rampa lineal es aproximacion didactica.
- Tasa 12% nominal fija 3 anios: no modela CETES flotante.
- Rescate 150k es supuesto (venta equipo usado). Sensibilidad: sin rescate VAN = 531,776.45 - 150,000/1.404928 = 531,776.45 - 106,766.71 = 425,009.74 (sigue > 0).
