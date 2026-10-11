# 04 - Plan de negocios: estructura bancable (Mexico + global)

## Secciones obligatorias (12, orden bancable)

1. Resumen ejecutivo (1-2 pag; se escribe al final).
2. Empresa (mision, vision, forma juridica - ver `06-legal-mx.md`, socios, ubicacion).
3. Mercado (TAM/SAM/SOM + competencia - ver `03-mercado.md`).
4. Producto/servicio (ficha tecnica, propuesta de valor, estado: MVP/beta/operando).
5. Marketing y ventas (ICP, canales, CAC y funnel - ver `03-mercado.md`).
6. Organizacion y equipo (organigrama, perfiles, asesores).
7. Operaciones (SOP, capacidad, logistica, proveedores).
8. Finanzas 3-5 anos (supuestos, P&L, flujo, balance, VAN/TIR/PRI - ver `02-financiero.md`).
9. Financiamiento (monto, destino, garantias, calendario de disposicion).
10. Riesgos y mitigacion (matriz P x I + sensibilidad).
11. Sostenibilidad/ambiental (si aplica credito o sector regulado).
12. Anexos bancables (cotizaciones, contratos, permisos, historial crediticio, garantias).

## Tablas requeridas

### T1. Contenido minimo por seccion

| Seccion | Minimo exigible por un banco/NAFIN | Fuente en toolkit |
|---|---|---|
| Resumen | Monto, destino, plazo, garantia, VAN/TIR/PE en 5 lineas | `05-pitch-resumen.md` |
| Mercado | TAM/SAM/SOM con 2 metodos + competencia 3-4 | `03-mercado.md` |
| Finanzas | P&L + flujo mensual ano 1, anual 2-5; capital de trabajo | `02-financiero.md`, `src/lib/flujo.ts` |
| Financiamiento | Tabla uso de fondos % + calendario + garantias | Esta seccion T2 |
| Riesgos | Matriz 5 riesgos con mitigacion y costo | `01-factibilidad.md` |
| Anexos | Cotizaciones, permisos, contratos, buró, garantias | Checklist abajo |

### T2. Uso de fondos (plantilla)

| Destino | % | Monto | Calendario |
|---|---|---|---|
| Producto/activo fijo | - | - | Mes 1-3 |
| Marketing/ventas | - | - | Mes 1-12 |
| Contratacion | - | - | - |
| Capital de trabajo | - | - | - |
| Total = monto solicitado | 100% | - | - |

### T3. Calendario financiero (bancable)

| Ano | Ingresos | EBITDA | Flujo neto | Servicio deuda | DSCR |
|---|---|---|---|---|---|
| 1 (mensual anexo) | - | - | - | - | >=1.2 objetivo |
| 2-5 | - | - | - | - | - |

DSCR = flujo disponible / servicio de deuda. Bancos mexicanos suelen pedir >=1.2-1.3.

## Finanzas: exigencias practicas

- Flujo mensual ano 1 (el anual esconde baches de liquidez).
- Capital de trabajo explicitado (cuentas por cobrar + inventario - proveedores).
- Tasa = WACC documentado; sensibilidad a ventas -20%, precio -10%, tasa +3pp.
- Punto de equilibrio en unidades y fecha (mes en que se cruza).

## Errores comunes

1. Resumen escrito primero (sale generico); debe escribirse al final.
2. Proyecciones sin supuestos (crecimiento 50% YoY en mercado maduro).
3. Sin flujo mensual ano 1 (el banco no ve la liquidez).
4. Sin DSCR ni calendario de deuda.
5. Sin cotizaciones que respalden CAPEX (numeros redondos inventados).
6. Sin permisos/licencias en anexos (credito observado).
7. Mezclar plan VC (hipercrecimiento) con plan bancario (repago) - son narrativas distintas.

## Checklist bancable

- [ ] 12 secciones en orden, numeradas.
- [ ] TAM/SAM/SOM + competencia con fuentes.
- [ ] P&L + flujo + balance 3-5 anos; flujo mensual ano 1.
- [ ] VAN/TIR/PRI + PE con tasa documentada.
- [ ] Monto, destino %, plazo, garantias, DSCR.
- [ ] Matriz de riesgos con mitigacion.
- [ ] Anexos: cotizaciones, contratos, permisos, buró, garantias, CVs equipo.
- [ ] Resumen ejecutivo de 1-2 pag con los 5 numeros (monto, VAN, TIR, PE, DSCR).

## Fuentes (3+)

1. Sequoia Capital - Writing a Business Plan (proposito, problema, solucion, why now, mercado, competencia, modelo, equipo, financieros, vision) - https://www.sequoiacap.com/article/writing-a-business-plan/ (consultado 2026-10-11).
2. NAFIN - Credito PyME / requisitos y programas de financiamiento - https://www.nafin.com.mx/ (portal; verificar programa vigente al solicitar).
3. Secretaria de Economia - Tu Empresa / tramites y denominacion - https://www.gob.mx/se/ ; INEGI para datos de mercado - https://www.inegi.org.mx/
4. Smartsheet - plantilla Executive Summary 1 pagina (teaser bancable) - https://www.smartsheet.com/
