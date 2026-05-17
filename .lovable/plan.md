## Goal

Add a one-tap **Apple Pay / Google Pay / Link** button to the top of the `OrderReviewDrawer`, above the "Continue to checkout" CTA. Buyers who can use a wallet skip the full Stripe Checkout form entirely; everyone else falls back to today's hosted-checkout flow.

## Scope decisions

- **One-time only** for v1. Stripe's Express Checkout Element supports subscriptions, but it requires creating a Subscription + incomplete PaymentIntent up front and handling 3DS confirmation client-side — meaningfully more code. For sub plans we keep the existing "Continue to checkout" → hosted Stripe page (which already exposes Link/Apple Pay/Google Pay on the right side of the form). The express button is simply hidden when `plan === "sub"`.
- **Drawer only.** No express button on the PDP itself yet — keeps the PDP visually clean and the "review moment" intact, matching Gruns where wallet buttons live inside the cart drawer.
- **Graceful hide.** If the browser/device supports no wallet, the Element returns nothing and we render no divider — the drawer looks identical to today.

## Implementation

### 1. Dependencies + publishable key

- `bun add @stripe/stripe-js @stripe/react-stripe-js`
- Add `VITE_STRIPE_PUBLISHABLE_KEY` (publishable, safe in client bundle). Read in a singleton `src/lib/stripe-client.ts` exporting `getStripePromise()` (lazy `loadStripe`).

### 2. New server fn: `createPaymentIntent`

In `src/server-functions/stripe.ts`, add a sibling to `createCheckoutSession`:

- Input: `{ variantId, origin }` (one-time only — no `plan`).
- Resolves the variant, computes `amount = (oneTimePrice + FLAT_SHIPPING_USD) * 100`.
- Creates `stripe.paymentIntents.create({ amount, currency: 'usd', automatic_payment_methods: { enabled: true }, shipping_address_collection isn't on PI — instead set shipping on confirm, metadata: { variantId, productSlug, plan: 'oneTime' } })`.
- Returns `{ clientSecret, amount }`.

The existing `createCheckoutSession` stays untouched and remains the fallback.

### 3. New component: `ExpressCheckoutBlock`

`src/components/pdp/ExpressCheckoutBlock.tsx`

- Props: `{ variantId: string; amount: number }`.
- Wraps children in `<Elements stripe={stripePromise} options={{ mode: 'payment', amount, currency: 'usd', paymentMethodCreation: 'manual' }}>` using **deferred-intent** mode (no clientSecret needed up front — Stripe creates it lazily on click).
- Renders `<ExpressCheckoutElement onConfirm={handleConfirm} onReady={(e) => setHasWallets(Object.keys(e.availablePaymentMethods ?? {}).length > 0)} />`.
- `handleConfirm`:
  1. Call `createPaymentIntent({ variantId, origin })` → `clientSecret`.
  2. `stripe.confirmPayment({ elements, clientSecret, confirmParams: { return_url: \`${origin}/payment-confirmed\` }, redirect: 'always' })`.
- If `hasWallets === false`, render `null` (no divider, no "or pay with…" label).

### 4. Wire into `OrderReviewDrawer`

At the top of the drawer body, above totals, render:

```tsx
{plan === "oneTime" && (
  <>
    <ExpressCheckoutBlock variantId={variant.id} amount={totalCents} />
    <Separator label="or" />
  </>
)}
```

`Separator` is a small "—— or ——" divider component (3 lines, no new dep).

### 5. Success page

`/payment-confirmed` already handles `?session_id=` from Stripe Checkout. Express Checkout redirects with `?payment_intent=…&payment_intent_client_secret=…&redirect_status=succeeded` instead. Extend `src/routes/payment-confirmed.tsx` to:

- If `session_id` present → existing behavior.
- Else if `payment_intent` present → look it up via a new `getPaymentIntentStatus` server fn and render the same confirmation card from PI metadata (variantId → product lookup).

## Technical notes (out of view if not needed)

- **Domain registration for Apple Pay**: Stripe auto-registers when you use Express Checkout Element with a publishable key, but `*.lovable.app` must be added in **Stripe → Settings → Payment methods → Apple Pay → Add new domain** for the published URL. The preview URL works without registration in test mode.
- **Shipping collection**: PaymentIntent doesn't collect a shipping address by itself. Express Checkout Element has `shippingAddressRequired: true` + `shippingRates` props — we set both so the wallet sheet asks for an address and shows our `$FLAT_SHIPPING_USD` line. The selected address is returned in `onConfirm`'s event and passed into `confirmPayment({ shipping })`.
- **Test cards**: Apple Pay sandbox card 4242 4242 4242 4242 works in Safari with a test wallet. Google Pay test mode works in Chrome with any signed-in Google account.

## Files

New:
- `src/lib/stripe-client.ts`
- `src/components/pdp/ExpressCheckoutBlock.tsx`

Modified:
- `src/server-functions/stripe.ts` (+ `createPaymentIntent`, + `getPaymentIntentStatus`)
- `src/components/pdp/OrderReviewDrawer.tsx` (mount block + divider)
- `src/routes/payment-confirmed.tsx` (handle `payment_intent` query param)

## Open question

`VITE_STRIPE_PUBLISHABLE_KEY` isn't in the project yet — I'll need you to paste the publishable key from Stripe Dashboard → Developers → API keys (the `pk_test_…` / `pk_live_…` one, not the secret). It's safe in the client bundle. Want me to proceed and request it as a secret when we get to step 1?
