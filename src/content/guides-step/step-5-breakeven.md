<!--
Given-When-Then (acceptance criteria for this guide):
- GWT1: Given Q* greater than monthly SOM, When you apply the exit rule, Then you stop and save instead of keep spending.
- GWT2: Given FC=10_000, p=100, vcu=60, When you use the break-even calculator, Then margin=40, Q*=250 units, revenue=$25_000 (reproducible).
- GWT3: Given Q* between 50% and 100% of monthly SOM, When you apply the criteria, Then you adjust (price, costs or fixed) and recalculate before step 6.
12 Factors III/V: internal links with ../../../ (dev-prod parity). Exit rule lives in a single place (this guide).
-->

---
title: "Step 5: break-even and early exit"
lang: en
description: "Calculate how many units a month you must sell to stop losing and compare against your SOM: if you need more customers than exist, stop."
---

# Step 5: break-even and early exit

> Legal validity Mexico only. This is not legal advice.

## What you will achieve

Know how many units a month you must sell to stop losing (Q*), with this formula:

```text
Q* = FC / (p - vcu)
```

- FC = monthly fixed costs (rent, utilities, wages, accountant).
- p = price per unit (step 4).
- vcu = variable cost per unit (step 3).
- (p - vcu) is your contribution margin: what each sale pays toward fixed costs.

And most importantly: compare Q* against your monthly SOM from step 2.
If you need more customers than exist, the idea does not close and you stop here, before spending more.

## What you need from the previous step

- Step 3: your variable cost per unit (vcu), all inclusive.
- Step 4: your price per unit (p), above the vcu.
- Step 2: your monthly SOM (real customers you can win per month).
- Your monthly fixed-cost list (rent, electricity, water, internet, gas, subscriptions, wages with social security, accountant, equipment wear).

Without these three numbers (cost, price, SOM) you cannot do this step. Go back if any is missing.

## Step by step

1. Add up your monthly fixed costs (FC). Write each item with its amount.
2. Compute your margin: p - vcu. It must be greater than zero. If price does not beat variable cost, there is no break-even: go back to step 4.
3. Compute Q* = FC / (p - vcu) and break-even revenue = Q* x p.
   Verify it in the [break-even calculator](../../../calculators/break-even/) with this reproducible example:
   FC = 10,000, p = 100, vcu = 60 -> margin = 40, Q* = 250 units, revenue = $25,000.
   If the calculator does not show that with those inputs, check what you typed.
4. Compare Q* against your monthly SOM with the exit rule (next section). The verdict is written down, not felt.
5. Act on the verdict: go to step 6, adjust and recalculate, or stop and file your numbers.

### Exit rule (the single place where this rule lives)

| Verdict | Condition | What you do |
|---|---|---|
| GO | Q* <= 50% of monthly SOM | The market covers it with room. Move to step 6. |
| ADJUST | Q* between 50% and 100% of monthly SOM | Raise price, cut costs or trim fixed costs; recalculate Q* and compare again before moving on. |
| STOP | Q* > monthly SOM | There are not enough customers to stop losing. Stop here: file your numbers and put no more money in. |

Stopping on time is winning: you save the investment, the rent and months of operating at a loss.

## Where to look for free

- Rents of similar premises: Inmuebles24 or Vivanuncios.
- Electricity, water, internet and gas: your bills or those of someone with a similar shop.
- Wages: OCCMundial or Computrabajo for your role and city (add social security).
- Accountant: ask one in your city for a quote.
- SOM: revisit your step 2 number (INEGI, competitor count, Google Trends). Do not compare a monthly Q* against an annual SOM: use the same period for both.

## Common mistakes

- Price at or below variable cost (margin <= 0): the formula has no solution.
- Forgetting fixed costs: accountant, employee social security, monthly subscriptions, equipment wear.
- Comparing unlike periods: monthly Q* against annual SOM or against TAM.
- Using an unevidenced SOM so "it closes": the SOM is the one from step 2, not an invented one.
- Changing the rule on the fly: the exit rule lives here, in a single place. There is no other version.

## Checklist

- [ ] Margin (p - vcu) above zero, with step 3 cost and step 4 price.
- [ ] Q* computed and reproducible in the calculator (you checked the 10,000 / 100 / 60 -> 250 units example).
- [ ] Q* compared against the monthly SOM from step 2, in the same period.
- [ ] Written verdict: GO, ADJUST or STOP, with the numbers visible.
- [ ] If STOP: decision filed with date; no more spending until the idea is redesigned.

## Next step

If the verdict is GO, or you adjusted and it closes now:

- [Cash-flow calculator](../../../calculators/cash-flow/): project your money month by month.
- [Step 6 guide: your money](../../../guide/step/step-6-cash/): how much you need to start and whether it pays back (NPV / IRR).

If the verdict is STOP, jump to the [step 10 guide](../../../guide/step/step-10-decision/) and file your decision.
