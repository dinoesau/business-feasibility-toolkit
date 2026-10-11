# 02 - Financiero: VAN, TIR, PRI, ROI, punto de equilibrio, WACC, CAPM

Alineado con `src/lib/van-tir.ts`, `equilibrio.ts`, `flujo.ts`, `sensibilidad.ts`. No cambiar firmas; este doc fija interpretacion.

## Secciones obligatorias

1. Supuestos (horizonte n, moneda, tasa d, inflacion).
2. CAPEX/OPEX desglosados.
3. Flujos de caja FCt por periodo.
4. Calculo de VAN, TIR, PRI, ROI.
5. Punto de equilibrio operativo.
6. Tasa de descuento (WACC via CAPM).
7. Sensibilidad y escenarios.
8. Decision.

## Tablas requeridas

### T1. Formulas canonicas (usar exactamente estas)

| Indicador | Formula | Regla de decision |
|---|---|---|
| VAN | `VAN = S(FCt/(1+d)^t) - I0`, t=1..n | VAN>0 aceptar; =0 indiferente; <0 rechazar |
| TIR | r* tal que `VAN(r*) = 0` (biseccion; null si no hay cambio de signo) | TIR > d aceptar; TIR < d rechazar; flujos no convencionales -> preferir VAN |
| PRI (flujos variables) | `PRI = a + (b-c)/d`, a=ano previo, b=I0, c=acumulado en a, d=flujo del ano de recupero. En codigo: primer t con acumulado>=I0 + interpolacion | Menor PRI = menor riesgo liquidez; no considera valor del dinero si se usa sin descontar |
| ROI | `(SFCt - I0)/I0 x 100%` | >0 rentable; no incorpora tiempo -> complementar con VAN |
| Punto equilibrio (uds) | `CF / (P - CVu)` | Ventas minimas para cubrir costos |
| Punto equilibrio (dinero) | `CF / (1 - CVu/P)` | Equivalente en ingresos |
| WACC | `Ke x E/(E+D) + Kd x (1-T) x D/(E+D)` | Tasa de descuento de referencia para el VAN |
| CAPM (para Ke) | `E(Ri) = Rf + Bi x (E(Rm)-Rf)` | Ke = retorno exigido con riesgo sistematico |

### T2. Ejemplo numerico de referencia (verificable)

Inversion I0=10,000, flujos 3,000 x 5 anos, d=8% -> VAN positivo aprox. 1,975-2,500 segun redondeo (calcular en `van-tir.ts`, no copiar el numero a mano). TIR del ejemplo 5,000 con flujos 1,000/2,000/1,500/3,000 aprox. 16%.

### T3. Matriz de decision

| VAN | TIR vs WACC | PRI | Decision |
|---|---|---|---|
| >0 | TIR>WACC | Razonable (< horizonte/2) | Aceptar |
| >0 | TIR>WACC | Muy largo | Aceptar con reserva de liquidez |
| >0 | TIR<WACC (inconsistencia) | - | Revisar flujos/tasa, probable error |
| <0 | TIR<WACC | - | Rechazar |
| >0 pero chico | TIR barely > WACC | - | Sensibilidad obligatoria |

Proceso: 1) CAPM -> Ke, 2) WACC -> d, 3) VAN + TIR, 4) PRI liquidez, 5) ROI + PE operativo, 6) integracion.

## Tasa de descuento en Mexico (practica)

- Rf: CETES 28d o bono M; prima de mercado y beta de Damodaran o comparables BMV.
- Kd: cotizacion bancaria/NAFIN vigente; T = ISR 30%.
- Documentar las 3 entradas (Rf, beta, prima) en el modelo; prohibido "d=12% porque si".

## Errores comunes

1. Tasa inventada sin WACC/CAPM.
2. TIR multiple en flujos no convencionales (cambios de signo) - usar VAN.
3. PRI sin descontar presentado como rentabilidad (solo mide liquidez).
4. ROI sin horizonte (comparar ROI 1 ano vs 5 anos).
5. Punto de equilibrio con costos mal clasificados (fijo vs variable).
6. Mezclar flujos nominales con tasa real (o viceversa).
7. `inversion=0` -> ROI indefinido (el codigo lanza error; documentarlo).

## Checklist

- [ ] Flujos FCt, I0, n, d explicitos y con fuente.
- [ ] VAN calculado con `calcularVAN`, TIR con `calcularTIR` (manejar null).
- [ ] PRI con interpolacion (`calcularPRI`), ROI con `calcularROI`.
- [ ] PE en unidades y en dinero (`equilibrio.ts`).
- [ ] WACC con Ke (CAPM), Kd, E, D, T documentados.
- [ ] Sensibilidad a d, precio y volumen (`sensibilidad.ts`).
- [ ] Decision en tabla T3 con numeros, no adjetivos.

## Fuentes (3+)

1. Valor actual neto - formula e interpretacion - https://es.wikipedia.org/wiki/Valor_actual_neto
2. Que es el VAN - https://www.ceupe.com/blog/que-es-el-van.html
3. Tasa interna de retorno - https://economipedia.com/definiciones/tasa-interna-de-retorno-tir.html y https://www.cegid.com/ib/es/glosario-empresarial/tasa-interna-de-retorno
4. PRI - https://www.esan.edu.pe/conexion-esan/el-pri-uno-de-los-indicadores-que-mas-llama-la-atencion-de-los-inversionistas y https://blog.hubspot.es/sales/periodo-recuperacion-inversion
5. Punto de equilibrio - https://www.fundacionwiese.org/blog/es/que-es-el-punto-de-equilibrio-y-como-calcularlo
6. WACC - https://es.wikipedia.org/wiki/Coste_medio_ponderado_del_capital ; Tasa de descuento - https://www.ceupe.com/blog/como-determinar-la-tasa-de-descuento.html
