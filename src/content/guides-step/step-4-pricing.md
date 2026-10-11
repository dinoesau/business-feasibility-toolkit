---
title: "Step 4: set your price"
lang: en
description: "Set a price that covers your step 3 cost, leaves margin, and people actually pay: compare 5 to 10 competitors and validate it against your 3 step-1 objections."
---

# Step 4: set your price

## What you will achieve

A price that meets 3 conditions at once: it covers your unit cost, it leaves margin, and people actually pay it.
You leave with a number you can defend against 5 to 10 competitors.
Fills: sales plan of the business plan. Legal validity: Mexico only.

## What you need from the previous step

- Your unit cost from step 3 (per piece, hour, or recipe, shrinkage and wear included).
- Without that cost there is no price: every margin is computed on top of it.
- If you do not have it yet, get your cost in the [product cost calculator](../../../calculators/product-cost/).
- Your 3 objections from step 1 (the ones you wrote down after talking to 5 to 10 customers). They rule this step.

## Step by step

1. **Write down your cost.** Copy the final unit cost from step 3. That number is your floor: no valid price sits below it.
2. **List 5 to 10 competitors.** For each one note price, what it includes, and what you offer on top. Without the "includes" the comparison lies.
3. **Compute your margin price.** Open the [margin pricing calculator](../../../calculators/pricing/), enter your cost and target margin. Reproducible example: cost 60 and 40% margin give price 100 and 40 profit per unit. Swap in your numbers.
4. **Do not mix up markup and margin.** They are two different lib formulas (`precioPorMargen(costo, margen)`, `precioPorMarkup(costo, markup)`, `margenDesdePrecio(costo, precio)`):
   - Margin on price: price = cost / (1 - margin).
   - Markup on cost: price = cost x (1 + markup).
   - 50% markup = 33.3% margin (example: cost 60 with 50% markup gives price 90 and margin 30/90 = 33.3%).
   - If you ask for a "50% margin" but only add 50% to cost, you really keep 33.3%. The logic lives in the lib and the calculator; it is stated here, never duplicated.
5. **Validate that people will pay it.** Go back with your 3 step-1 objections and ask with a closed price: "if it were here at $X, would you buy it this week?". Count concrete yeses, not likes. If the price scares them off, adjust value, cost, or margin - never sell below cost.
6. **Place yourself in the range.** If your price lands above the priciest of your 5 to 10 competitors, you need a difference customers name on their own (hours, closeness, warranty). If it lands below the cheapest, double-check your cost is complete.

## Where to look for free

- Competitors' published menus and catalogs.
- Rappi or Uber Eats for food; MercadoLibre or Amazon for products.
- Google Maps and social media to see what each business includes.
- Ask customers directly what they would pay (the step-1 question, now with your candidate price).

## Common mistakes

- Adding a % to cost and calling it "margin". That is markup. 50% markup leaves a 33.3% real margin.
- Setting a price without the step-3 cost. Without a floor, any margin is fiction.
- Comparing prices without noting what each one includes.
- Validating with "do you like it?" instead of "would you buy it this week at $X?".
- Cutting price to compete until you land below cost.

## Checklist

- [ ] Step-3 unit cost written down as the price floor.
- [ ] 5 to 10 competitors listed with price and what each includes.
- [ ] Price computed in the calculator with explicit margin (cost, margin, price, and profit noted).
- [ ] I know which number is margin and which is markup in my price (50% markup = 33.3% margin, they are not the same).
- [ ] Price validated against the 3 step-1 objections: real customers say they would buy at $X.
- [ ] My price covers cost, leaves margin, and sits inside or justifiably above the competitor range.

## Next step

With your price set, find how many units a month you must sell to stop losing:

- [Break-even calculator](../../../calculators/break-even/)
- [Step 5 guide: find your break-even](../../../guide/step/step-5-break-even/)

## Given-When-Then

- **Given** the step-3 unit cost, **When** you follow this guide, **Then** you set a price that covers cost, leaves explicit margin, and real customers confirm they will pay.
- **Given** 5 to 10 competitor prices with their inclusions, **When** you place your price in that range, **Then** you know whether you compete on price or must justify value above the market.
- **Given** the 3 step-1 objections, **When** you validate your candidate price with concrete purchase intent, **Then** no objection kills the price without you adjusting it before step 5.
