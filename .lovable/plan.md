Publishable key received (`pk_live_…`). Same plan as previously approved — implementing now:

1. `bun add @stripe/stripe-js @stripe/react-stripe-js`
2. `src/lib/stripe-client.ts` — singleton `loadStripe("pk_live_I19Ma0w4zbjLIhM2054LFoR700Gu18CSCf")`
3. `src/server-functions/stripe.ts` — add `createPaymentIntent` (one-time only, includes shipping in amount, metadata for variantId/productSlug) and `getPaymentIntentStatus`
4. `src/components/pdp/ExpressCheckoutBlock.tsx` — Stripe `<Elements>` in deferred-intent mode + `<ExpressCheckoutElement>` with `shippingAddressRequired`, `shippingRates`, graceful hide via `onReady`
5. `src/components/pdp/OrderReviewDrawer.tsx` — mount block + "or" divider above totals when `plan === "oneTime"`
6. `src/routes/payment-confirmed.tsx` — branch on `payment_intent` vs `session_id`

Note: you're using a **live** key. Real cards will charge. If you want to test without real charges first, grab the `pk_test_…` from the same Dashboard page and I'll swap.
