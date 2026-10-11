---
title: "Step 2: size your market (TAM/SAM/SOM)"
lang: en
description: "Step 2 guide: compute TAM, SAM and SOM with the people x pages x price formula, verify bottom-up SOM and replay the example in the calculator."
---

# Step 2: size your market (TAM/SAM/SOM)

## What you will achieve

By the end of this step you hold 3 defensible numbers: your TAM in $, your SAM as a % of TAM, and your bottom-up verified SOM.
The SOM feeds the market study sales table and step 5 break-even.

## What you need from the previous step

Your step 1 sheet: the 5 to 10 talks (pages per person come from there) and the price they pay today (that is your price per page).
Without those two numbers there is no market: go back to [Your idea on one sheet](../../../idea-sheet/) before continuing.

## Step by step

1. **Apply the single formula.** Market = people x pages per person a year x price per page. It covers all three: only whose people you count changes.
2. **Count people for the TAM.** Everyone who prints in your city. To place how many rivals fight over that TAM, open INEGI DENUE, filter by your municipality and print-and-copy activity, and note the copy shops and cybers per block.
3. **Cut down to the SAM.** Those who pass your block: school enrollment plus hospital staff and visits. Ask management for the figure and count who passes your spot at peak hour.
4. **Set pages per person from your talks.** Ask in your 5 to 10 talks how many pages they print a month and multiply by 12. Check Google Trends ("imprimir" in your state, last 12 months): if it falls, use the low number, not the optimistic one.
5. **Set the price per page from what they pay today.** Note what the corner copy shop and the cyber across the street charge. Hand-count your rivals on the street: name, price and hours. If they close at 8pm and you run 24h, that is your measurable edge.
6. **Compute and replay the example in the calculator.** Example (replace with your numbers):
   - TAM = 20,000 people (city, source: DENUE + count) x 48 pages (4 a month x 12, source: your talks) x $1.50 (source: copy shop and cyber) = **$1,440,000 a year**.
   - SAM = 3,000 on your block (source: enrollment + peak-hour count) x 48 x $1.50 = **$216,000 (15% of TAM)**.
   - Bottom-up SOM = 80 pages a day (your machine's true capacity) x 300 days x $1.50 = **$36,000 a year**.
   - In the [TAM/SAM/SOM calculator](../../../calculators/tam-sam-som/) set TAM = 1,440,000, SAM = 15, SOM = 17 (SOM is ~17% of SAM: 36,000 / 216,000).
7. **Bottom-up SOM rules.** If your machine cannot do 80 pages a day, lower the % until the % and the daily math match. Mark done only when they match.

The full example with INEGI DENUE, Google Trends and rival counting is summarized here; the detail lives in the [Study 1 - Market guide](../../../guide/six-studies-methodology/#how-to-calculate-tam-sam-and-som-with-your-vending-full-example).

## Where to look for free

- **INEGI DENUE:** how many copy shops and cybers sit per block in your municipality (TAM rivals).
- **Google Trends:** whether "imprimir" rises or falls in your state over the last 12 months (tune pages per person).
- **Enrollment and staff:** ask school and hospital management (SAM people).
- **Hand count:** rivals on your street with name, price and hours; people passing your spot at peak hour.

## Common mistakes

- Top-down SOM ("I keep 5% of TAM") with no pages-a-day check: a % with no machine behind it is fantasy.
- Numbers with no source: every figure carries its origin (talks, DENUE, enrollment, count). No source, no paper.
- Mixing SAM with SOM: the SAM passes your block, the SOM buys from you. SOM is always smaller.
- Price from memory: if you did not see it charged at the copy shop or the cyber, it is not your price.
- Jumping to cost (step 3) with no verified SOM: step 3 splits overhead across your SOM.

## Checklist

- [ ] TAM in $ with people, pages and price noted, each with its source.
- [ ] SAM with % passing my block (enrollment + peak-hour count).
- [ ] Bottom-up verified SOM: pages a day x days x price matches the %.
- [ ] Example replayed in the calculator (TAM = 1,440,000, SAM = 15, SOM = 17) with my numbers.
- [ ] Competitors hand-counted on my street.
- [ ] **Fills:** market study (sales table in units and value). The SOM feeds step 5 break-even.

## Next step

Carry your SOM into the [cost calculator](../../../calculators/product-cost/) and read the [step 3 guide](../../../guide/step/step-3-cost/): with no volume there is no split.

## Given-When-Then

- **Given** the step 1 sheet with talks and today's price, **When** I follow this guide, **Then** I enter the TAM in $ in the calculator and verify bottom-up SOM before marking done.
- **Given** a TAM computed with no sources, **When** I apply the step by step, **Then** every figure carries its source (talks, DENUE, enrollment or count) or stays off the paper.
- **Given** a SOM % that clashes with my pages a day, **When** I apply the bottom-up SOM rule, **Then** I lower the % until it matches my machine's true capacity.

> Legal validity: Mexico only. Sources: `research-matriz-contenidos.md` section 3 (market: TAM/SAM/SOM, segments, competition, trends); example detail in `src/content/docs-en/02-six-studies-methodology.md` (Study 1).
