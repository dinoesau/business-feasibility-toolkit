---
title: "Step 3: find your true cost"
lang: en
description: "Step 3 guide: pick your method (unit, hour or recipe), split overhead with your SOM and compare your cost against today's price."
---

# Step 3: find your true cost

## What you will achieve

By the end of this step you hold one defensible number: what each unit, hour or recipe truly costs, all included.
That cost feeds step 4 (pricing) and step 5 (break-even).

## What you need from the previous step

Your step 2 SOM: the realistic volume you can actually sell.
Without volume there is no split: monthly bills are divided across your units or hours, and that divisor comes from the SOM.
If you lack it, go back to the [TAM/SAM/SOM calculator](../../../calculators/tam-sam-som/).

## Step by step

1. **Pick your method.** You sell pieces: per unit. You sell time: per hour. You mix inputs that yield several servings: per recipe. Just one to start.
2. **Note your direct costs or inputs.** Quote with 3 suppliers and split each pack by what it yields. No prices from memory.
3. **Set shrinkage and wear with a number, never zero by forgetfulness.** Shrinkage goes in % over direct costs; wear is equipment price across months of life across monthly units.
4. **Split your overhead with your SOM.** Rent, power, software, accounting: each monthly bill divided across your volume. If you pay it with or without sales, split it. If it moves with each sale, it is direct.
5. **Replay your case in the calculator.** Enter your numbers in the [cost calculator](../../../calculators/product-cost/): it applies the rules implemented in `src/lib/costo-producto.ts` (`calcularCostoProducto`, `calcularCostoHora` and `calcularReceta`). Methods are only stated here; formulas live in the lib and the calculator, never duplicated here.
6. **Compare your cost against today's price.** Note what customers pay today for something similar. If your cost lands above, you hold 3 levers: more volume, lower cost or better price. Step 4 puts price to the test.

### Per-unit method (example, replace with your numbers)

- Direct: $150 + $15 = $165.
- Monthly overhead split: $20 + $10 + $20 + $5 + $15 = $70.
- Total cost: $235 a unit.
- At 50% markup the base is $352.50 and with VAT $408.90.
- Replay it in the [cost calculator](../../../calculators/product-cost/) with your own numbers.

### Per-hour method (example, replace with your numbers)

- Target pay $20,000 + bills $5,000 = $25,000 across 100 billable hours = $250 an hour.
- Note: the hours you bill, not the 160 in the month.
- Replay it in the [cost calculator](../../../calculators/product-cost/) (per-hour tab) with your own numbers.

### Per-recipe method (example, replace with your numbers)

- Inputs: 2x$10 + 1.5x$20 + 3x$5 = $65.
- Shrinkage 10% = $6.50. Total $71.50 across 10 servings = $7.15 a serving.
- Replay it in the [cost calculator](../../../calculators/product-cost/) (per-recipe tab) with your own numbers.

Each method is also explained in the [Study 2 - Technical guide](../../../guide/six-studies-methodology/#how-to-find-your-true-cost-examples-per-trade).

## Where to look for free

- **Direct costs:** 3 supplier quotes (photo or capture with date). Free to request.
- **Shrinkage:** weigh or count it yourself for one week: what gets lost or comes out wrong over what is produced.
- **Wear:** your equipment plate or manual (price and useful life) over your SOM volume.
- **Volume:** your step 2 SOM, already done.

## Common mistakes

- Leaving shrinkage or wear at zero by forgetfulness.
- Dividing across the 160 hours in the month instead of the hours you bill.
- Reading margin over price as if it were markup over cost (50% markup = 33.3% margin, not 50%).
- Splitting across optimistic volume instead of the realistic SOM: cost looks artificially low.
- Mistaking the list price for cost: today's price is your reference, not your cost.

## Checklist

- [ ] Cost per unit, hour or recipe done with my method.
- [ ] Direct costs or inputs with 3 quotes noted (supplier + date).
- [ ] Shrinkage and wear included, not zero by forgetfulness.
- [ ] Overhead split with my step 2 SOM.
- [ ] Total cost compared against the price they pay today.

## Next step

Carry your cost into [step 4: set your price](../../../calculators/pricing/) and read the [step 4 guide](../../../guide/step/step-4-price/).

## Given-When-Then

- **Given** the step 2 SOM, **When** I follow this guide through the per-unit method, **Then** I get my cost a unit and compare it against today's price.
- **Given** the step 2 SOM, **When** I follow this guide through the per-hour method, **Then** I get my cost a billable hour and compare it against today's price.
- **Given** the step 2 SOM, **When** I follow this guide through the per-recipe method, **Then** I get my cost a serving and compare it against today's price.
