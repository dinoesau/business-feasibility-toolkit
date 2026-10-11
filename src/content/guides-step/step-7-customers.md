---
title: "Step 7: check that each customer makes money (CAC / LTV)"
lang: en
description: "Confirm each customer brings at least 3 times what they cost, with a coffee-shop example reproducible in the calculator."
---

# Step 7: check that each customer makes money (CAC / LTV)

> **Legal validity: Mexico only.** Amounts in MXN.
> Definitions (once; the rest of the guide reuses them): **CAC** is what you pay to win a new customer. **LTV** is what that customer brings in total. **Churn** is the abandonment rate. See [glossary](../../../guide/glossary/).

## What you will achieve

Confirm that a customer brings more than they cost, with the rule **LTV >= 3 x CAC**.

The formulas (see `src/lib/cac-ltv.ts`):

- `CAC = marketingAndSalesSpend / newCustomers`
- `LTV = ticket x frequency x lifespan x margin` (counting form) `= (monthlyARPU x grossMargin) / monthlyChurn` (rate form; `lifespan = 1 / churn`)
- `paybackCAC = CAC / (monthlyARPU x grossMargin)` (months to recover the customer cost)

`LTV/CAC` verdict: `< 1` unsustainable, `< 3` tight, `3-5` healthy, `>= 5` outstanding.

## What you need from the previous step

From step 6 (cash flow and NPV/IRR) bring: average ticket, gross margin per sale, and realistic monthly sales.

If you still lack a margin, go back to the [product cost calculator](../../../calculators/product-cost/) and the [pricing calculator](../../../calculators/pricing/).

## Step by step

1. Compute your CAC: divide marketing and sales spend by the **new** customers of the same period.
   Coffee-shop example: `$5,000 / 150 = $33.33` per customer.
2. Compute your LTV with real data: ticket x visits per month x months they stay x margin.
   Coffee-shop example: `85 x 4 x 14 x (55/85) = $3,080.00`.
3. Divide: `LTV/CAC = 3,080.00 / 33.33 = 92.4`. Since it is `>= 3`, the channel is healthy.
4. Compute payback: `33.33 / (340 x 0.6471) = 0.15` months (about 5 days).
5. Check it in the [CAC / LTV calculator](../../../calculators/cac-ltv/) with these reproducible values: CAC `33.33`, monthly revenue per customer `340` (= 85 x 4), gross margin `64.71` %, monthly churn `7.14` % (= 1/14 months).
   You should get LTV `3,080`, ratio `92.4`, and payback `0.15`.
6. If the ratio is `< 3`, do not scale spend: first adjust channel, price, or retention (see Common mistakes).

## Where to look for free

- [Meta Ad Library](https://www.facebook.com/ads/library/): see what competitors advertise and on which channels.
- [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/): estimate cost per click in your trade.
- Your own test with $500 to $1,000 MXN in ads: count real new customers and derive your CAC.
- Ask customers how often they would return and how much they would buy: that gives frequency and lifespan.

## Common mistakes

- Using the full ticket as LTV without multiplying by the **margin** (revenue is not profit).
- Dividing spend by total customers instead of **new** ones (that hides a high CAC).
- Setting churn to `0 %`: LTV becomes infinite and the calculator shows "—" (see `src/components/react/CacLtvCalc.tsx`).
- Scaling ads with a ratio `< 3`: that scales a loss.
- Mixing periods (monthly spend with yearly customers).

## Checklist

Check each item before moving to step 8:

- [ ] CAC computed as spend / new customers of the same period.
- [ ] LTV computed with margin, not gross revenue.
- [ ] LTV/CAC ratio >= 3 verified in the [calculator](../../../calculators/cac-ltv/).
- [ ] CAC payback known (months).

Acceptance criteria (Given-When-Then):

```text
G1. Given LTV/CAC < 3, When you apply this guide, Then you adjust channel,
    price, or retention instead of scaling the loss.
G2. Given the coffee-shop example (spend 5,000, 150 new, ticket 85, 4 visits,
    14 months, margin 55/85), When you enter it in the calculator, Then you get
    CAC 33.33, LTV 3,080, ratio 92.4, and payback 0.15.
G3. Given churn = 0, When you compute LTV, Then you do not report a finite
    number: you fix churn before deciding.
```

## Next step

Run the case through scenarios: [sensitivity calculator](../../../calculators/sensitivity/) and guide [step 8: move the numbers](../../../guide/step/step-8-risk/).
