# 03 - Mercado: TAM, SAM, SOM, CAC, LTV

Alineado con `src/lib/tam.ts`, `cac-ltv.ts`, `pricing.ts`.

## Secciones obligatorias

1. Definicion ICP (cliente ideal) y ambito geografico.
2. TAM por 2 metodos independientes (top-down + bottom-up o value-theory).
3. SAM (filtros de alcance: geografia, idioma, canal, producto).
4. SOM (capacidad comercial 3-5 anos, no % arbitrario).
5. Triangulacion (divergencia >20% -> revisar).
6. Unit economics: CAC, LTV, ratio, payback.
7. Presentacion para pitch (grafico TAM> SAM > SOM con fuente en slide).

## Tablas requeridas

### T1. Metodos TAM (usar minimo 2)

| Metodo | Pasos | Formula en codigo | Fuente tipica |
|---|---|---|---|
| Top-down | Mercado global x % geografia x % segmento x % categoria | `TAM x samShare x somShare` | Gartner, IDC, Statista |
| Bottom-up | N clientes x ACV/ARPU (ticket x frecuencia) | `TAM = poblacion x ticketPromedio x frecuenciaAnual` | INEGI, Census, LinkedIn Sales Navigator, Crunchbase |
| Value-theory | N clientes x (valor creado x % capturable) | `precio = valor x capture-rate` -> alimenta `pricing.ts` | Casos cliente, benchmarks ROI |

### T2. Ejemplo SaaS CRM (ilustrativo, recalcular con datos vigentes)

| Metodo | TAM | SAM | SOM 3a |
|---|---|---|---|
| Top-down | Global CRM 69.5B (Gartner 2025) x 28% NA x 20% SMB ~= 3.9B | x 30% fit ~= 1.2B | 3% de SAM ~= 36M |
| Bottom-up | 1M SMB x 1,200 ACV = 1.2B | x 70% cloud-native = 840M | Capacidad ventas (300 cierres/ano) |
| Value-theory | Ahorro 5,000/ano x precio 10% = 500; 1M x 500 = 500M | 40% con 10+ reps = 200M | 2% de SAM = 4M |

Si top-down y bottom-up difieren >20%, no promediar: auditar supuestos.

### T3. Unit economics (formulas de `cac-ltv.ts`)

| Metrica | Formula | Benchmark |
|---|---|---|
| CAC | `gastoMarketingYVentas / clientesNuevos` | PLG ~700 USD; SMB 1k-5k; Enterprise 14k-22k |
| LTV basico | `(ARPUmensual x margenBruto) / churnMensual` | Requiere margen de contribucion, no ingreso bruto |
| LTV expandido | `(ARPU x margen) / (churn - expansion)` | Solo si NRR>100% |
| LTV:CAC | `LTV / CAC` | <1 insostenible; 1-3 ajustado; 3-5 sano; >5 posible subinversion |
| Payback | `CAC / (ARPU x margen)` meses | <6 elite; 6-12 fuerte; 12-18 mediana; 18-24 solo enterprise NRR>120%; >24 red flag |
| Veredicto codigo | `veredictoRatio`: <1 insostenible, <3 ajustado, <5 sano, else sobresaliente | Implementado en `cac-ltv.ts:77` |

Ajuste por etapa ARR: <1M aceptable 2-3x y 15-18m payback; 1-10M 2.5-3.5x; 10-50M 3.5x+ y 13-14m; 50M+ 4x+ y <=12m.

### T4. Funnel (para SOM creible)

`clientesFinales = potenciales x P(etapas)` - cada etapa en [0,1] (`aplicarFunnel` en `tam.ts:88`). SOM = clientes cerrables x ACV, no "1% de SAM porque si".

## Errores comunes

1. TAM = "todos los SMB del mundo" sin filtros (inflado 10-100x).
2. Datos de hace >12 meses (Gartner 2019 en pitch 2026 = red flag).
3. SOM como % fijo de SAM sin modelo de capacidad comercial.
4. Confundir revenue con unidades, o spend con revenue.
5. CAC sin salarios/herramientas (solo ad spend) - subestima CAC.
6. LTV con ingreso bruto en vez de margen (infla LTV).
7. Churn=0 (LTV infinito; el codigo lanza error - documentarlo).
8. LTV:CAC >5 celebrado sin ver si hay subinversion en growth.

## Checklist

- [ ] ICP y geografia definidos antes de calcular.
- [ ] 2 metodos TAM con fuentes, ano y pagina citados.
- [ ] SAM con filtros explicitos (samShare trazable).
- [ ] SOM con funnel y capacidad de ventas (somShare + `aplicarFunnel`).
- [ ] Triangulacion ±20% documentada.
- [ ] CAC/LTV con `evaluarUnitEconomics`, ratio y payback con veredicto.
- [ ] Slide TAM>SAM>SOM con cifra + supuesto de 1 linea + fuente en slide.

## Fuentes (3+)

1. Gartner market-size reports; IDC Worldwide Software forecasts; Statista industry dashboards - https://www.gartner.com/ ; https://www.idc.com/ ; https://www.statista.com/
2. US Census Bureau / INEGI (conteo de empresas) - https://www.census.gov/ ; https://www.inegi.org.mx/ ; LinkedIn Sales Navigator; Crunchbase - https://www.crunchbase.com/
3. SaaS Hero - benchmarks CAC/payback por motion y etapa ARR; Rule of 40 - https://www.saashero.com/ (sintesis via Tavily Research 2026-10-11)
4. Stitch Fix value-theory example; benchmarks NRR/expansion - via reportes sectoriales y casos cliente.
