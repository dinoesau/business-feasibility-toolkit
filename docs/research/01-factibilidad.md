# 01 - Estudio de factibilidad: 6 dimensiones

## Secciones obligatorias

1. **Mercado:** objetivo, diagnostico de demanda (volumen, tendencia, segmentacion), oferta y competencia, precios y elasticidad, proyeccion de ventas en 3 escenarios.
2. **Tecnica:** descripcion del producto, infraestructura y equipamiento, madurez tecnologica, cronograma e hitos, riesgos tecnicos.
3. **Operativa:** organigrama y perfiles, SOP y flujos (BPMN), logistica, capacitacion, KPIs operativos.
4. **Legal:** marco regulatorio, licencias y permisos, riesgos legales, contratacion y propiedad, cumplimiento laboral/ambiental.
5. **Financiera:** CAPEX/OPEX, proyeccion de ingresos y flujos, VAN/TIR/PRI (ver `02-financiero.md`), sensibilidad y escenarios.
6. **Ambiental:** linea base, matriz de impactos, significancia, plan de mitigacion, monitoreo post-implementacion.

Cada dimension cierra con veredicto: viable / viable con condiciones / no viable.

## Tablas requeridas

### T1. Matriz de viabilidad (la que va al documento final)

| Dimension | Indicador clave | Umbral de aceptacion | Estado | Evidencia |
|---|---|---|---|---|
| Mercado | CAGR + cuota capturable (SOM) | SOM > punto de equilibrio ano 3 | - | `03-mercado.md` |
| Tecnica | Capacidad (u/ano), disponibilidad % | Utilizacion 60-85%, puesta en marcha fechada | - | Fichas fabricante |
| Operativa | Costo unitario, OTIF % | Costo < precio x (1-margen min) | - | Benchmarks sector |
| Legal | Permisos obtenidos/pendientes | 100% criticos antes de inversion | - | `06-legal-mx.md` |
| Financiera | VAN>0, TIR>WACC, PRI razonable | VAN>0 con WACC documentado | - | `02-financiero.md` |
| Ambiental | tCO2e, m3 agua, MIA | Cumple NOM + plan mitigacion | - | SEMARNAT |

### T2. Escenarios (obligatoria en mercado y financiera)

| Variable | Pesimista | Base | Optimista |
|---|---|---|---|
| Demanda (uds) | -20% | caso central | +20% |
| Precio | -10% | central | +10% |
| Tasa descuento | WACC+3pp | WACC | WACC-2pp |

## Metodos por dimension

- Mercado: SWOT, cadena de valor, regresion/series temporales, sensibilidad precio-volumen.
- Tecnica: analisis de capacidad, matriz riesgo (P x I), comparativa costo-beneficio, simulacion (@RISK/Crystal Ball).
- Operativa: BPMN, balance de linea, Six Sigma/Kaizen.
- Legal: checklist normativo, matriz riesgos, revision documental.
- Financiera: modelo en Excel/codigo (`src/lib/van-tir.ts`, `flujo.ts`, `sensibilidad.ts`), sensibilidad.
- Ambiental: MIA, ciclo de vida (LCA), AERMOD para dispersion.

## Errores comunes

1. Un solo escenario (sin pesimista/base/optimista) - invalida la conclusion.
2. Demanda sin fuente oficial (solo "estimacion propia").
3. Capacidad tecnica al 100% desde el dia 1 (ignora curva de aprendizaje).
4. Permisos como nota al pie en vez de ruta critica con tiempos y costos.
5. VAN con tasa inventada (sin WACC/CAPM documentado).
6. Ambiental como anexo decorativo sin plan de mitigacion con responsables y fechas.

## Checklist

- [ ] Las 6 dimensiones tienen veredicto explicito.
- [ ] Ventas proyectadas en 3 escenarios con supuestos trazables.
- [ ] Capacidad, eficiencia y puesta en marcha cuantificadas.
- [ ] Matriz legal con permiso, estado, tiempo y costo.
- [ ] VAN/TIR/PRI calculados con tasa documentada (ver `02-financiero.md`).
- [ ] MIA + plan de mitigacion con responsable y cronograma.
- [ ] Resumen ejecutivo de 1 pagina con conclusion viable/condicionada/no viable.

## Fuentes (3+)

1. BID Invest - Manual de Implementacion, politica de sostenibilidad financiera y criterios de evaluacion - https://www.idbinvest.org/
2. SEMARNAT - Guia para Manifestacion de Impacto Ambiental (MIA) - https://www.gob.mx/semarnat
3. BAPIN / Guias de formulacion de proyectos de inversion publica - validacion de supuestos con fuentes oficiales - https://www.argentina.gob.ar/economia/politica-economica/bapin
4. ISO 9001 (calidad de datos), ISO 14001 (ambiental), ISO 31000 (riesgos), ISO 45001 (seguridad ocupacional) - https://www.iso.org/
5. Banco Interamericano de Desarrollo - guias de evaluacion operativa y factibilidad tecnica - https://www.iadb.org/

*Sintesis via Tavily Research 2026-10-11; verificar URLs antes de publicar.*
