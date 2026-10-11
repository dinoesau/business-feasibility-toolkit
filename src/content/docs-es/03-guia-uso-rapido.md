---
title: "Guia de uso rapido"
lang: es
description: "Ruta de 5 pasos para usar el toolkit y mapa de todos los contenidos."
---

# 03 - Guia de uso rapido

## Ruta en 5 pasos (30 minutos a 4 semanas)

1. **Ficha (30-60 min):** completa la ficha de idea. Si no hay propuesta de valor clara o mercado pagador, itera o descarta.
2. **Prefactibilidad (1-3 dias):** aplica `checklists/prefactibilidad.md`. Si falla lo regulatorio o lo tecnico, no avances al estudio completo.
3. **Factibilidad (2-4 semanas):** desarrolla los 6 estudios en orden mercado -> tecnico -> organizacional -> legal MX -> financiero -> ambiental.
4. **Decision Go/No-Go (1 sesion):** aplica `checklists/go-no-go.md` con la tabla integral. Requiere >=70% de supuestos confirmados y numeros cerrados.
5. **Empaquetado:** plan de negocios -> resumen ejecutivo -> pitch deck -> pacto de socios. Verifica consistencia de cifras entre los tres primeros.

## Mapa de contenidos (anti-huerfano)

- Conceptos: `01-conceptos-viabilidad-vs-factibilidad.md`
- Metodologia: `02-metodologia-6-estudios.md`
- Esta guia: `03-guia-uso-rapido.md`
- Glosario: `04-glosario.md`
- Marco legal MX: `05-marco-legal-MX.md`
- Matriz research con fuentes: `../research-matriz-contenidos.md`
- Checklists: `../checklists/prefactibilidad.md`, `go-no-go.md`, `validacion-mercado.md`, `due-diligence-societaria.md`
- i18n UI: `../../i18n/es.json` (ES), `../../i18n/en.json` (EN)

## Convenciones

- Moneda de ejemplos: MXN. Codigos de actividad: SCIAN (INEGI).
- Calculadoras del sitio (VAN, TIR, punto de equilibrio, TAM/SAM/SOM) usan las etiquetas definidas en `src/i18n/*.json` namespace `calc`.
- Validez legal: solo Mexico. La version EN lo advierte expresamente.

## Given-When-Then

- **Given** un usuario nuevo, **When** sigue esta ruta, **Then** llega al Go/No-Go sin saltarse mercado ni legal.
- **Given** cifras inconsistentes entre plan/resumen/deck, **When** se detectan, **Then** se corrigen antes de presentar a inversionistas.
