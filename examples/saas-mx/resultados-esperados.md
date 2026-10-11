# SaaS MX - Resultados esperados (SKELETON)

> Skeleton, no golden final.
> Patron a seguir: `examples/cafeteria-mx/resultados-esperados.md`.
> Worker responsable: completar cada seccion con formula + numeros y fijar
> este archivo como golden. Hasta entonces, los tests que lo usen deben marcarse
> `skip` o `todo` (no `pass` falso).

## Criterios de aceptacion (Given-When-Then)

```text
S1. Skeleton honesto:
  Given inputs.json v0.1.0-skeleton
  When se intenta verificar este archivo como golden
  Then falta al menos un valor (seccion 1-4 incompleta) y el test se salta
  explicitamente en vez de pasar en falso.

S2. Golden completo (futuro):
  Given inputs.json fijado a v1.0.0
  When se aplican las formulas de este archivo
  Then MRR inicial=49,900, NRR=98%, LTV=9,980, LTV/CAC=12.475, payback=2.0m,
       y tabla MRR 12m cerrada al peso.
```

## 1. MRR y NRR (TODO)

- [ ] Definir `MRR(0) = clientes * ARPA` con numeros de inputs.json.
- [ ] Definir `NRR = 1 - churnRevenue + expansion`. Verificar 0.98.
- [ ] Tabla MRR 12m: `MRR(m) = MRR(m-1)*NRR + nuevos*ARPA`. Fijar mes a mes.

Esperados provisorios (a confirmar por worker 2, NO usar como golden aun):
`MRR(0)=49,900`, `NRR=98%`.

## 2. Churn logo vs revenue (TODO)

- [ ] Explicar por que churn revenue (4%) < churn logo (5%): los que se van son
  planes chicos. Fijar ejemplo numerico.
- [ ] Test: `churnRevenue <= churnLogo` con estos inputs.

## 3. LTV / CAC / payback (TODO)

Formulas propuestas (verificar):

```text
LTV = ARPA * margen / churnRevenue = 499 * 0.8 / 0.04 = 9,980.00
LTV/CAC = 9,980 / 800 = 12.475
Payback = CAC / (ARPA * margen) = 800 / 399.20 = 2.004 meses ~= 2.0m
```

- [ ] Worker 2: recalcular con node y fijar a 2 decimales.
- [ ] Escenarios: churn 6% -> LTV=6,653.33; churn 2.5% -> LTV=15,968.00.

## 4. Tabla 12m y escenarios (TODO)

- [ ] Generar `mrr-12m.csv` con columnas mes, clientes_ini, churned, nuevos,
  clientes_fin, mrr. Suma y cierre documentados.
- [ ] Escenarios pesimista/optimista con churn 6% / 2.5%.

## 5. Metodologia (fija desde ahora)

- TDD: este skeleton + inputs son la especificacion; el golden final sera el test.
- good-typescript: `parseSaasInputs` en el borde retorna `Result`; core solo
  acepta `Arpa`, `ChurnRate` branded. Sin `safeParse` repetido en core.
- bloodhound: prohibido fijar MRR(12) a mano sin formula. Todo valor cita inputs.
- 12-Factor X parity: mismos inputs en dev/CI/prod. XII: script de recalculos.
