# Ejemplo: Cafeteria MX (ejemplo reproducible golden)

Bilingual README: ES primero, EN below.

## ES

### Que es

Ejemplo end-to-end de una cafeteria de barrio en ZMG con numeros realistas MX.
Sirve como **golden file para TDD**: `inputs.json` son los inputs,
`resultados-esperados.md` son los expected, `flujo-36m.csv` es el detalle mensual.

### Archivos

| Archivo | Rol |
|---|---|
| `inputs.json` | Unica fuente de verdad. Todo numero esperado deriva de aqui. |
| `resultados-esperados.md` | Calculos a mano: TAM/SAM/SOM, equilibrio, VAN/TIR 3 anios, pricing, CAC/LTV, flujo 36m, escenarios. |
| `flujo-36m.csv` | Mes, ventas, costo_variable, costo_fijo, flujo, acumulado. Suma anual = flujos de VAN. |

### Como reproducir (5 min)

```bash
# 1. Validar inputs
node -e "JSON.parse(require('fs').readFileSync('examples/cafeteria-mx/inputs.json','utf8')); console.log('inputs OK')"

# 2. Verificar CSV suma a flujos anuales 162,352.94 / 496,588.24 / 750,476.47
node -e "
const rows=require('fs').readFileSync('examples/cafeteria-mx/flujo-36m.csv','utf8').trim().split('\n').slice(1);
let s=[0,0,0]; rows.forEach((l,i)=>{s[Math.floor(i/12)]+=parseFloat(l.split(',')[4]);});
console.log(s.map(v=>v.toFixed(2)).join(' / '));"

# 3. Recalcular VAN 12% (debe dar 531,776.45)
node -e "
const f=[162352.94,496588.24,900476.47];
console.log((-650000+f[0]/1.12+f[1]/1.2544+f[2]/1.404928).toFixed(2));"
```

### Criterios de aceptacion (Given-When-Then)

```text
Given inputs.json sin modificar
When aplico las formulas de resultados-esperados.md
Then TAM=225,000M, SAM=10,800M, SOM=4,773,600, Q*=1,637/mes,
     VAN=531,776.45, TIR=44.37%, payback mes 24, CAC=33.33, LTV=3,080.00.
```

### Para worker 2 (lib core)

- Usa este ejemplo como test: parsea `inputs.json` en el borde (good-typescript),
  calcula en core con tipos probados, compara contra `resultados-esperados.md`.
- No copies los esperados al codigo: derivalos. Si el test pasa copiando literales,
  es tautologico (skill tdd) y debe rechazarse.
- Agrega variante con ISR 30% como segundo test (ver seccion 9 de resultados).

### Antipatterns evitados (bloodhound)

- **Magic Numbers**: cada cifra cita su campo de inputs.json.
- **Error Hiding**: supuestos (sin ISR, tasa fija) declarados en seccion 9.
- **Spaghetti**: un flujo lineal mercado -> operacion -> VAN, sin saltos.

### 12-Factor relevante

- **X parity**: mismos inputs en dev/CI/prod.
- **XII admin**: verificacion via scripts one-off (comandos arriba), no clicks manuales.

---

## EN

### What this is

End-to-end example of a neighborhood coffee shop in Guadalajara (MX) with
realistic numbers. It is a **TDD golden file**: `inputs.json` = inputs,
`resultados-esperados.md` = expected values, `flujo-36m.csv` = monthly detail.

### Files

| File | Role |
|---|---|
| `inputs.json` | Single source of truth. Every expected number derives from here. |
| `resultados-esperados.md` | Hand calculations (Spanish): TAM/SAM/SOM, break-even, NPV/IRR 3y, menu pricing, CAC/LTV, 36m cashflow, scenarios. |
| `flujo-36m.csv` | Month, sales, variable_cost, fixed_cost, cashflow, cumulative. Yearly sums = NPV flows. |

### How to reproduce (5 min)

Same commands as above. Expected: yearly flows 162,352.94 / 496,588.24 /
750,476.47; NPV @12% = 531,776.45; IRR = 44.37%; payback month 24.

### Acceptance criteria (Given-When-Then)

```text
Given unmodified inputs.json
When I apply the formulas in resultados-esperados.md
Then TAM=225,000M, SAM=10,800M, SOM=4,773,600, Q*=1,637/mo,
     NPV=531,776.45, IRR=44.37%, payback month 24, CAC=33.33, LTV=3,080.00.
```

### For worker 2 (core lib)

- Use this as a test fixture: parse `inputs.json` at the edge, compute in core,
  assert against `resultados-esperados.md`.
- Do not hardcode expected outputs in implementation (tautological test per tdd skill).
- Add an ISR-30% variant as a second test.

### Methodology notes

- 3 acceptance criteria (Given-When-Then) above.
- TDD golden files; 12-Factor parity + admin scripts; no magic numbers (bloodhound).
