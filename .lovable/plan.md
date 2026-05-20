# Align 6 lb pouch cadence copy

## Goal
Replace every fixed "30-day" or "60-day supply" claim for the 6 lb pouch with a single, consistent "30–60 days, activity-driven" message. The 12 lb pail keeps its proportional range (60–120 days) so the size pills still show a meaningful step-up.

## Source-of-truth string
- 6 lb: `~2 stations · 30–60 day supply (activity-driven)`
- 12 lb: `~4 stations · 60–120 day supply (activity-driven)`
- FAQ long form: "A 6 lb pouch typically covers about 30–60 days of continuous baiting across two stations — refill before the station empties; heavier activity burns through faster."

## Files to edit

1. `src/components/pdp/SizePills.tsx` (line 34)
   - 6lb → `~2 stations · 30–60 day supply`
   - 12lb → `~4 stations · 60–120 day supply`

2. `src/data/products.ts`
   - Line 116 (starter-kit FAQ `lead`): rewrite to the long-form string above.
   - Line 333: change "6 lb for one to two stations, 12 lb for larger deployments" → keep, it's fine.
   - Line 367: already says "every 30–60 days" — leave as the canonical phrasing.

3. `src/routes/products.refill.tsx` (line 22, meta description)
   - "Replenishment plan from $129 every 60 days." → "Replenishment plan from $129, shipped on a 30–60 day cadence."

4. `src/components/pdp/FindYourFit.tsx` (line 20)
   - "Replenishment plans from $129 every 60 days." → "Replenishment plans from $129 on a 30–60 day cadence."

5. `src/components/pdp/PlanSelector.tsx` (line 17)
   - Keep the underlying `subDays` value (billing cadence is a real number), but change the visible label to read e.g. "ships every 30–60 days" when `subDays === 60`, so the subscription UI matches the activity-driven story. Confirm wording in implementation.

6. `public/products/gallery-spec-sheet.svg` (line 34, Coverage row subtitle)
   - Replace "6 lb pouch covers 1–2 stations · 12 lb pail covers 3–4 stations" with "6 lb pouch: ~2 stations, 30–60 days · 12 lb pail: ~4 stations, 60–120 days".
   - Line 42 ("approx. every 30–60 days") is already consistent — leave.

## Out of scope
- The standalone "30-day deployment support" line in `BuyBox.tsx`, `stripe.functions.ts`, `OrderReviewDrawer.tsx`, and the `payment-confirmed` / `HowToVideo` "Check at 30 days" prompts. Those refer to onboarding support and the first check-in milestone, not pouch supply, so they stay.
- Pricing, SKUs, and subscription billing cadence in Stripe (only the human-readable label changes).

## Verification
After edits, re-grep for `60-day supply`, `30 days of continuous`, and `every 60 days` to confirm no stale copy remains, then spot-check the PDP and refill route in preview.
