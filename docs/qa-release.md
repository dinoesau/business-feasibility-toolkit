# QA Release Checklist - business-feasibility-toolkit

> Release verde = todas las casillas verificadas con comando, no a ojo.
> Antipattern evitado: QA manual sin script.
> Base Pages: `/business-feasibility-toolkit/` · Site: https://dinoesau.github.io

## 0. Criterios de aceptacion del release (Given-When-Then)

```text
R1. Release verde:
  Given main con build Astro exitoso
  When ejecuto TODO este checklist en orden
  Then 0 fallos en links-base, i18n, CSV, PDF, mobile, Lighthouse, vitest, build y deploy.

R2. Links con base:
  Given site servido en https://dinoesau.github.io/business-feasibility-toolkit/
  When navego a cada ruta del checklist 1.x
  Then ningun href/src apunta a "/" sin el base (script 1.3 en verde).

R3. Ejemplos dorados:
  Given examples/cafeteria-mx/inputs.json sin modificar
  When worker 2 corre la lib (o recalculo manual de resultados-esperados.md)
  Then VAN=531,776.45, TIR=44.37%, Q*=1,637/mes, payback mes 24.
```

Metodologias: Given-When-Then (arriba), TDD (golden files en 6.x),
12-Factor X parity + XII admin (scripts en cada seccion),
good-typescript (i18n tipado, sin strings magicos),
bloodhound (sin Hard Code de rutas, sin Error Hiding en export CSV).

---

## 1. Links con base Pages (bloqueante)

- [ ] 1.1 `astro.config.mjs` tiene `site: 'https://dinoesau.github.io'` y `base: '/business-feasibility-toolkit/'`.
- [ ] 1.2 Ningun `href="/..."` literal en `src/` (usar `import.meta.env.BASE_URL` o el base).
- [ ] 1.3 Script verde contra build:

```bash
npm run build
node scripts/check-base-links.mjs --dir dist --base /business-feasibility-toolkit/
node scripts/check-base-links.mjs --self-test
```

- [ ] 1.4 Smoke manual bajo subpath (sirve `dist/` con el base, no con `/`):

```bash
npx serve dist -l 4173
# Abrir http://localhost:4173/business-feasibility-toolkit/ (o configurar --single con base)
# Click en: home, calculadora, ejemplos, cambio ES/EN. 0 404 en consola.
```

Falla tipica: rutas funcionan en `localhost:4321/` pero 404 en Pages. Causa: link raiz sin base.

## 2. i18n ES/EN completo (bloqueante)

- [ ] 2.1 Toda ruta existe en ES y EN (`/es/...` y `/en/...` o `/{lang}/...` segun router).
- [ ] 2.2 Ningun string hardcodeado fuera del diccionario (grep):

```bash
# Ajusta patron a tu estructura i18n (src/i18n/*.json). Debe dar 0 fuera de diccionarios y tests.
grep -rn --include='*.astro' --include='*.tsx' -E '>[A-ZÁÉÍÓÚÑ][^<>]{8,}<' src | grep -v __tests__ || echo "revisar manualmente lista corta"
```

- [ ] 2.3 Toggle ES/EN preserva ruta (no manda a home) y `lang` del `<html>` cambia.
- [ ] 2.4 Formato numérico MX: `$139,145.00` en ES-MX; `$139,145.00` / `MXN` claro en EN (sin mezclar `,`/`.`).

## 3. Export CSV (bloqueante)

- [ ] 3.1 Boton exporta flujo 36m y el CSV descargado es byte-identico en columnas a `examples/cafeteria-mx/flujo-36m.csv` (mismo header `mes,ventas,costo_variable,costo_fijo,flujo,acumulado`).
- [ ] 3.2 CSV abre en Excel/Sheets sin mojibake (UTF-8 con BOM o ASCII puro + `.csv`).

```bash
# Si la app genera CSV via lib, dif contra golden:
# (adapta ruta de descarga)
diff <(head -5 examples/cafeteria-mx/flujo-36m.csv) <(head -5 /tmp/descarga.csv) && echo "CSV header OK"
```

## 4. Print / PDF (bloqueante)

- [ ] 4.1 `@media print` oculta nav/toggles y evita cortes a mitad de tabla.
- [ ] 4.2 "Imprimir / Guardar PDF" desde Chrome cabe en 2-3 paginas A4, numeros legibles.
- [ ] 4.3 PDF contiene TAM/SAM/SOM, equilibrio, VAN/TIR, escenarios (no solo la primera pantalla).

## 5. Mobile (bloqueante visual)

- [ ] 5.1 360x640: sin scroll horizontal, tablas con scroll interno o colapso, CTA alcanzable.
- [ ] 5.2 Touch targets >= 44px en botones primarios.
- [ ] 5.3 Revisar a ojo home + calculadora + ejemplo cafeteria en DevTools mobile.

## 6. Tests y build (bloqueante)

```bash
npx vitest run            # incluye golden cafeteria (VAN/TIR/Q*/CAC/LTV) - ver R3
npx tsc --noEmit          # si hay TS
npm run build             # Astro estatico, sin SSR
node scripts/check-base-links.mjs --dir dist --base /business-feasibility-toolkit/
```

- [ ] 6.1 `vitest` verde, incluyendo test golden cafeteria-mx (segun R3).
- [ ] 6.2 `saas-mx` marcado `todo/skip` hasta golden final (no falso verde).
- [ ] 6.3 `npm run build` genera `dist/` estatico (sin adapter SSR).
- [ ] 6.4 `check-base-links` verde (ver 1.3).

## 7. Lighthouse (umbral)

```bash
# Tras build + preview con base:
npx -y lighthouse http://localhost:4173/business-feasibility-toolkit/ --preset=desktop --only-categories=performance,accessibility,best-practices,seo --view
```

- [ ] 7.1 Performance >= 90, Accessibility >= 95, Best Practices >= 90, SEO >= 95.
- [ ] 7.2 Sin errores de contraste en tablas de resultados.

## 8. Deploy Pages (final)

- [ ] 8.1 Workflow deploya `dist/` a Pages en push a `main` (o paso manual documentado).
- [ ] 8.2 Smoke post-deploy en https://dinoesau.github.io/business-feasibility-toolkit/: home, calculadora, ES/EN, CSV, 0 404.
- [ ] 8.3 Rollback: commit anterior redeployable (Pages history o `git revert` + push).

## 9. Estado actual (2026-10-11, worker 7 - verificado con ejecucion)

- Proyecto Astro base: **EXISTE** (scaffoldeado por workers paralelos durante
  esta sesion: `astro.config.mjs` con `site` + `base` correctos, 20 paginas ES/EN).
- `npm run build`: **VERDE** (20 pages, `output: static`, ~1s).
- `node scripts/check-base-links.mjs --dir dist`: **VERDE** (30 archivos,
  0 violaciones; grep independiente en `dist/**/*.html` confirma 0 `href/src="/"`
  sin base). `--self-test`: 12/12 OK.
- Golden cafeteria-mx **validado contra `src/lib` real** (compilado con tsc a
  JS, 12 asserts): TAM/SAM/SOM, Q*=1,636.36, VAN=531,776.45, TIR=44.37%,
  PRI=1.982, CAC=33.33, LTV=3,080.00, LTV/CAC=92.4. Todo PASS.
- Discrepancias reportadas (no bloquean este worker, duenos: worker 2 / QA):
  1. `src/lib/van-tir.test.ts` usa su propio fixture (500k/5 anios), no consume
     `examples/cafeteria-mx/inputs.json`. Recomendado: test adicional que lea el
     JSON golden (fuente unica, evita doble fixture).
  2. `crearFlujos` rechaza flujos negativos (`parseNonNegative`): el escenario
     pesimista del golden (F1=-86,117.65) lanza en vez de calcular
     VAN=-226,389.50. Las finanzas admiten flujos negativos; relajar o documentar.
  3. `vitest` no esta en `package.json` (los `*.test.ts` importan `vitest` pero
     solo hay `typescript` + `astro check`). `npx vitest run` del checklist 6.x
     falla por modulo ausente hasta instalarlo o migrar tests.
  4. `src/lib/flujo.ts` modela crecimiento exponencial, el golden usa rampa
     mensual explicita: comparar solo totales anuales, no mes a mes.
- `examples/saas-mx/` sigue skeleton honesto (golden pendiente, tests en skip).
- Siguiente: worker 2 (anadir test golden cafeteria + decidir sobre flujos
  negativos), worker QA (instalar vitest o ajustar checklist 6.x/7.x).
