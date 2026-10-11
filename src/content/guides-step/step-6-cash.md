---
title: "Step 6: project your money and review the investment (NPV / IRR)"
lang: en
description: "Build your month-by-month cash flow with investment + 3-month cushion and decide with NPV > 0, IRR > rate and payback, using the reproducible coffee-shop example."
---

# Step 6: project your money month by month and review the investment (NPV / IRR)

> Legal validity: Mexico only. Amounts in MXN.
> NPV is the same as VPN in Spanish (net present value): here NPV is used as in the calculators.

## What you will achieve

Know how much money you need to start and whether it pays back, with three numbers:

- **Month-by-month cash flow (36 months):** what comes in, what goes out, and the running balance.
- **NPV > 0:** you earn more than you put in, discounted to today.
- **IRR > rate:** your money yields more than the base rate (CETES + risk).
- **Payback:** the month you recover the investment.

The formulas live in `src/lib/flujo.ts` (`proyectarFlujoCaja`, `mesRecuperacion`) and `src/lib/van-tir.ts` (`calcularVAN`, `calcularTIR`, `calcularPRI`, `calcularROI`, `evaluarProyecto`):

- `revenue_t = base x (1+g)^(t-1)`, `expenses_t = fixed + revenue_t x ratio`, `cashflow_t = revenue_t - expenses_t`, `cumulative_t = -investment + sum(flows_1..t)`.
- `NPV = sum(FCt / (1+r)^t) - I0`, IRR = the rate that makes NPV = 0.

Fills: the financial study.

## What you need from the previous step

- Step 2: your realistic monthly sales (from your SOM).
- Step 3: your monthly fixed costs and your variable cost (ratio = vcu / price).
- Step 5: your break-even point, to compare against the cash flow.

> WARNING (same sales figure): use exactly the sales from step 2.
> If you change sales here so "it closes", the cash flow, the break-even, and the SOM contradict each other and the whole study falls apart.
> There is a single master sales figure and it lives in step 2.

Without closed sales and costs there is no cash flow: go back if any is missing.

## Step by step

1. **Add up your initial investment + 3-month cushion.** Equipment, premises setup, permits, plus 3 months of fixed costs to survive the ramp-up.
   Traceable example (`examples/cafeteria-mx/inputs.json`): $650,000 = $350,000 setup + $200,000 equipment + $100,000 working capital.
2. **Write your month-by-month sales (36 months)** with the step 2 figure, no new sales.
   The example ships monthly detail in `examples/cafeteria-mx/flujo-36m.csv`.
3. **Compute each month's expenses:** fixed + sales x variable ratio.
   Coffee-shop example: ratio = 30 / 85 = 35.29%, fixed $90,000 in year 1 (rising 5% yearly).
4. **Derive flow and cumulative balance** in the [cash-flow calculator](../../../calculators/cash-flow/).
   Verify it with this reproducible example: investment 500,000, base 140,000, growth 2%, fixed 60,000, VC 35% -> month 1: revenue 140,000, expenses 109,000, flow 31,000, cumulative -469,000.
   If you do not get that, check what you typed.
5. **Set your base rate:** CETES + risk premium.
   Example: 12% = CETES ~9% + 3% risk (see `inputs.json`, `notaTasa` field).
   Look up the current CETES at cetesdirecto or Banxico (next section).
6. **Compute NPV and IRR** in the [NPV / IRR calculator](../../../calculators/npv-irr/) with your yearly flows and investment.
   Traceable example (full derivation in `examples/cafeteria-mx/resultados-esperados.md`, not copied here):
   investment 650,000, flows 162,352.94 / 496,588.24 / 900,476.47 (with salvage), rate 12% -> NPV 531,776.45, IRR 44.37%, payback month 24.
7. **Read the verdict and write it down:**
   - GO: NPV > 0, IRR > rate, and payback within your horizon (the example: month 24 of 36).
   - ADJUST: NPV barely > 0 or payback at the limit; cut investment or fixed costs, or raise sales with evidence, and recalculate.
   - STOP: NPV < 0 or IRR < rate; the investment does not pay back with these numbers. File and put no more capital in.
   - If the calculator reports no IRR or no payback (never recovered), that is also a verdict: STOP.

## Where to look for free

- Equipment and setup quotes: ask for 3 in writing, with dates.
- Base rate: [cetesdirecto](https://www.cetesdirecto.com/) and [Banxico](https://www.banxico.org.mx/).
- The worked case with hand formulas: `examples/cafeteria-mx/resultados-esperados.md`, with data in `examples/cafeteria-mx/inputs.json` and monthly flow in `examples/cafeteria-mx/flujo-36m.csv`.
- Sales and costs: your step 2 and 3 numbers, no new sources.

## Common mistakes

- Using different sales than step 2 so "it closes": the flow stops matching the SOM and the break-even.
- Forgetting the 3-month cushion: without it, the first dip wipes your cash even with a positive NPV.
- Comparing IRR against nothing: IRR only means something against your rate (CETES + risk).
- Invented rate, or one copied from the example without checking the current CETES.
- Mixing periods: yearly rate with monthly flows without converting, or vice versa.
- Copying the example figures (NPV, IRR, payback) as if they were yours: the example is for checking the calculators; your numbers come from your sales and costs.

## Checklist

- [ ] Initial investment added up with breakdown + 3 months of fixed costs as cushion.
- [ ] Month-by-month sales equal to step 2 (same figure, no changes).
- [ ] 36-month flow computed and checked with the reproducible example in the [calculator](../../../calculators/cash-flow/).
- [ ] NPV, IRR, and payback computed in the [NPV / IRR calculator](../../../calculators/npv-irr/) with documented base rate (CETES + risk).
- [ ] Written verdict: GO, ADJUST, or STOP, with all three numbers visible.

## Acceptance criteria (Given-When-Then)

- **G1. Decision with the example:** Given the coffee-shop flows (investment 650,000, yearly flows from `examples/cafeteria-mx/inputs.json`), When you follow the guide, Then you read NPV 531,776.45 > 0, IRR 44.37% > 12%, and payback month 24, and decide the investment does pay back.
- **G2. Consistent flow:** Given your step 2 sales and step 3 costs, When you build the 36-month flow in the calculator, Then the cumulative balance ties out month by month (`cumulative_t = cumulative_{t-1} + flow_t`) and you know your recovery month.
- **G3. Honest verdict:** Given NPV < 0 or IRR < rate, When you apply the verdict, Then you adjust with evidence or stop and file, instead of injecting more capital.

## Next step

Confirm each customer makes money:

- [CAC / LTV calculator](../../../calculators/cac-ltv/): what winning a customer costs versus what they bring.
- [Step 7 guide: check that each customer makes money](../../../guide/step/step-7-customers/): the LTV >= 3 x CAC rule with the same coffee-shop example.
