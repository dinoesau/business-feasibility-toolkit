# Ejemplo: SaaS MX (skeleton)

Bilingual: ES primero, EN below.

## ES

Skeleton de SaaS de facturacion para pymes MX. Metricas: MRR, churn logo/revenue,
NRR, CAC/LTV, payback, escenarios.

Estado: **skeleton v0.1.0** - inputs declarados, formulas propuestas, golden
pendiente. Ver `resultados-esperados.md` para los TODO del worker responsable.

### Uso correcto (tdd)

```bash
# Validar que el skeleton parsea (no que calcula bien: eso es el TODO)
node -e "const j=JSON.parse(require('fs').readFileSync('examples/saas-mx/inputs.json','utf8')); console.log('clientes',j.mrr.clientesIniciales,'ARPA',j.mrr.arpaMensual,'MRR',j.mrr.clientesIniciales*j.mrr.arpaMensual);"
# Esperado: clientes 100 ARPA 499 MRR 49900
```

No marques este ejemplo como verde en QA hasta que `resultados-esperados.md`
este completo y un test lo verifique.

## EN

SaaS billing-for-SMB skeleton (MX). Metrics: MRR, logo/revenue churn, NRR,
CAC/LTV, payback, scenarios.

Status: **skeleton v0.1.0** - inputs declared, formulas proposed, golden pending.
See `resultados-esperados.md` for the responsible worker's TODOs.

Do not count this example as green in QA until the golden file is complete
and a test verifies it.
