---
title: "Step 10 - Go / No-Go decision and packaging"
lang: en
description: "Bring steps 1-9 together, decide execute, adjust or discard with written numbers, and package study, plan, summary and pitch with consistent figures."
---

# Step 10 - Decision: go or no (and your final papers)

> **Legal validity: Mexico only.**
> With written numbers, not excitement.

## What you will achieve

One signed decision sheet: a table of the 6 studies in green, yellow or red, plus a verdict written in one word: GO, ADJUST or NO-GO.
If you go, you leave with the exact order to build your 4 final papers.

## What you need from the previous step

The closed numbers from steps 1 to 9, each in its paper:

1. Idea sheet (step 1).
2. Market: TAM, SAM, SOM and sales per year (step 2).
3. Costs with source and date (step 3).
4. Price checked against 5 to 10 rivals (step 4).
5. Breakeven in units per month (step 5).
6. Cash flow, NPV, IRR and payback (step 6, base rate: CETES).
7. CAC, LTV and the LTV/CAC >= 3 rule (step 7).
8. Sensitivity: it survives a bad 20% case (step 8).
9. Legal and partners: SAT, IMPI, municipal permit (step 9).

If a number is missing or changed, go back to its step before deciding. Deciding with gaps is guessing.

## Step by step

### 1. Put your numbers in one row

One table: sales years 1 to 3, fixed and variable costs, price, breakeven, NPV, IRR, payback, CAC, LTV and the worst sensitivity case.
One single mother figure per concept: the one you use here goes into every paper.

### 2. Rate each study: green, yellow or red

| Study | Green if | Red if |
|---|---|---|
| Market (steps 2 and 7) | >= 70% of assumptions confirmed with primary data; a letter of intent or traction exists | nobody pays, or the SOM cannot reach breakeven |
| Technical (step 3) | process in 5 steps or fewer, quotes per major item, location with utilities | no viable equipment, input or location |
| Organizational | critical roles covered, no open conflicts | nobody to operate and no plan to cover it |
| MX legal (step 9) | permits obtainable on time, NOMs with budgeted path, trademark filed | land use denied or activity forbidden |
| Financial (steps 5, 6 and 8) | NPV > 0, IRR > cost of capital, breakeven reachable with the SOM, positive cash flow within 24 months or covered burn, survives -10% price or +10% costs | NPV < 0 with no fix, or breakeven needs more buyers than exist |
| Environmental | impacts can be mitigated at known cost | non-mitigable damage or environmental permit denied |

Yellow = almost green with a written condition: what is missing, who fixes it and by when.
The exact thresholds live in `src/content/checklists/go-no-go.md`: apply them there; they are not copied here so there are never two versions contradicting each other.

### 3. Give the verdict in one word

| Verdict | When | What follows |
|---|---|---|
| GO | all green, or yellows with written mitigation | packaging (point 5) |
| ADJUST | 1 or 2 reds with a possible fix | 30/60/90-day plan and a new decision session |
| NO-GO | structural red in market, legal or financial | archive with lessons; not one more peso of capital |

Without minutes there is no GO: date, attendees and signatures on the same sheet.

### 4. Example with numbers: how a case is presented

From `examples/cafeteria-mx/resultados-esperados.md` (every number with formula and source, no magic numbers):

- SOM: $4,773,600 per year (180 tickets a day x 312 days x $85 MXN).
- Breakeven: 1,637 tickets a month (about 55 a day).
- NPV: $531,776.45 at 12% (> 0). IRR: 44.37% (> 12%). Payback: month 24.
- LTV/CAC: 92x (neighborhood marketing, $33.33 per customer).
- Sensitivity: with -20% sales the NPV turns negative; without salvage value the NPV stays > 0 ($425,009.74).

Case verdict: GO with yellows (sensitivity with written mitigation: lower fixed cost or secure sales before signing rent; and note: figures before ISR income tax, next iteration with 30% ISR).
That is how you decide: number, source, color and condition, all in writing.

### 5. If you go: package in this order

1. **Feasibility study** (template 01): pour in your steps 1 to 9 and attach your Go/No-Go table with the minutes.
2. **Business plan** (template 02): tell the story with the same numbers (TAM/SAM/SOM, model, roadmap, funding).
3. **Executive summary** (template 03, 2 pages, written last): page 1 value, page 2 figures and ask.
4. **Pitch deck** (template 04, 12 slides): problem, solution, market, team, financials and ask.

Golden rule: identical figures in all 4 papers. If one number changes, change it everywhere before showing it to anyone.
The founders' agreement runs in parallel with an accountant, not after the pitch.

## Where to look for free

- Your papers from steps 1 to 9: you already have them, nothing external needed.
- The site calculators to recompute NPV, IRR and breakeven with the same rate.
- The case with hand formulas: `examples/cafeteria-mx/resultados-esperados.md`.
- The 4 template ZIPs (free) and Overleaf (free) on the templates page.

## Common mistakes

- Deciding with excitement ("I feel it will work") instead of filling the table.
- Copying the checklist into your sheet instead of applying it (you end with two different versions).
- Different figures in each paper (the plan says one sale, the deck another).
- GO without minutes or signatures.
- Putting more money in after a NO-GO.
- Skipping sensitivity because "the base case already works".
- Building the deck before closing the numbers.

## Checklist

- [ ] Table with the 6 studies rated: green, yellow or red.
- [ ] Each yellow has written mitigation with owner and date.
- [ ] Verdict marked: GO, ADJUST or NO-GO.
- [ ] Minutes with date, attendees and signatures (no minutes, no GO).
- [ ] If GO: mother figure set and packaging started in order.
- [ ] If NO-GO: lessons archived and capital closed.

Threshold detail: `src/content/checklists/go-no-go.md`.
Earlier filter (>= 80% rule to enter the full study): `src/content/checklists/prefactibilidad.md`.

## Acceptance criteria (Given-When-Then)

- **G1. Decision with numbers:** Given steps 1 to 9 complete, When you apply this guide, Then you leave with a written verdict (go, adjust or discard) with date and signatures, not excitement.
- **G2. Consistent figures:** Given a GO verdict, When you package, Then sales, costs, NPV/IRR and breakeven are identical across study, plan, summary and pitch.
- **G3. Structural red stops:** Given an unfixable red in market, legal or financial, When you close the session, Then the verdict is NO-GO: you archive lessons and inject no more capital.

## Next step

If your verdict is GO, build your 4 papers in order (study, plan, summary, pitch): [templates](../../../templates/).
If ADJUST, return to the step of the red number with your 30/60/90-day plan.
If NO-GO, archive the lessons and start a new idea sheet.
