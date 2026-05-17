Two small pre-Phase-3 cleanups.

## 1. Mobile badges: force 3-in-a-row

In `src/components/pdp/BuyBox.tsx`, the "What makes it work" primary badges use `flex flex-wrap gap-6` with 80px circles, which wraps to 2x2 on a 375–414px viewport.

Change the primary row from flex-wrap to a fixed 3-column grid so it matches Gruns:

```text
<div className="grid grid-cols-3 gap-3 sm:gap-6">
```

Also shrink the circle on mobile so 3 fit comfortably (`h-16 w-16 sm:h-20 sm:w-20`, emoji `text-3xl sm:text-4xl`). Secondary pill row stays as-is (wrap is correct for those).

## 2. Quantity adjuster — recommendation: NO (for now)

Reasons to skip it:
- Starter Kit is a single-SKU "system" purchase; Gruns/Ritual/AG1-style PDPs deliberately omit qty to keep the decision binary (buy / subscribe).
- Refill cadence is already handled by the plan selector (one-time vs replenishment), which is the real "how much" lever.
- Adding qty complicates the Stripe line item, the review drawer totals, and the replenishment-savings math we just wired.

When we *would* add it:
- On the Refill PDP (`/products/refill`), where buying 2–3 pails at once is a real use case. That's a cleaner place for a stepper (1 / 2 / 3 / 4+) and it doesn't muddy the Starter Kit conversion path.

Recommendation: leave Starter Kit qty-less, revisit a stepper on the Refill PDP in a later pass. Confirm and I'll ship the badge fix.
