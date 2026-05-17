## Audit: Gruns checkout flow vs Cloakd

### How Gruns does it
Gruns is on Shopify. Their flow is:

```text
PDP "Add to Cart" → slide-out cart drawer → "Checkout" button → Shopify hosted checkout (single page)
```

Key properties of their flow:
- **No interstitial confirmation page.** Clicking "Add to Cart" opens a side drawer with the line item, qty stepper, subtotal, trust badges, and a primary "Checkout" CTA. From there it's straight to the hosted checkout.
- **Shopify hosted checkout** is a clean single page: Contact → Shipping → Payment, with a sticky order summary (image, name, qty, subtotal, shipping, total, discount code field) on the right at desktop, collapsed at the top on mobile. Express wallets (Shop Pay / Apple Pay / G Pay) appear at the very top.
- **Persistent trust + offer cues**: free-shipping/discount banner across the top, "Almost sold out" urgency strip, money-back guarantee in the order summary, secure-payment badges in the footer.
- **One-page mental model**: customer never feels like they've left the product. The PDP, drawer, and checkout share the same brand chrome.

### How Cloakd does it today
```text
PDP "Order Now" → /checkout/$variantId interstitial → Stripe hosted Checkout
```

Issues vs the Gruns benchmark:
1. **Dead interstitial step.** `/checkout/$variantId` only restates what the user just selected and shows a second "Proceed to secure checkout" button. It adds a click, a page load, and a moment of doubt without collecting anything.
2. **No cart drawer / no continuity.** The jump from our branded PDP to Stripe's white-label checkout is abrupt. There is no in-context confirmation that the right plan / size / pest was added.
3. **Stripe Checkout is under-configured.** The session has no product image, no description, no Link / wallet preference set explicitly, no promo code field, no phone collection, and the success URL is a thin page. The line item uses ad-hoc `price_data` so the product looks generic in the checkout summary.
4. **No express-pay surface on the PDP**. Gruns surfaces Shop Pay; we don't surface Apple Pay / Link / G Pay anywhere before Stripe.
5. **Trust signals don't carry through.** Our PDP has great trust copy (EPA, Made in USA, no secondary kill) but none of it is repeated near the final CTA or in the Stripe summary.
6. **Cancel URL bounces back to the dead interstitial**, not the PDP, so a back-out user lands on a page with no product context.

### Plan

Goal: collapse the flow to **PDP → Stripe Checkout** with a Gruns-style mini "review" moment, and make the Stripe page itself look like a continuation of the brand.

**1. Delete the interstitial route**
- Remove `src/routes/checkout.$variantId.tsx`.
- In `BuyBox.handleBuy`, call `createCheckoutSession` directly with a loading state on the "Order Now" button (spinner + "Redirecting to secure checkout…"). Disable the button while pending; show an inline error toast on failure.
- Update Stripe `cancel_url` in `server-functions/stripe.ts` to `${origin}/products/{slug}?variant={id}` so back-outs land on the PDP.

**2. Add a lightweight "review drawer" (Gruns parity, optional but recommended)**
- New `OrderReviewDrawer` (shadcn `Sheet`, right side on desktop, bottom on mobile) that opens when "Order Now" is clicked.
- Contents: product image, variant name, pest + size pills (read-only), plan badge, qty stepper (fixed at 1 for now), subtotal / shipping / total, 3 trust bullets, "Checkout securely" primary CTA, "Keep shopping" secondary link.
- The CTA in the drawer is what calls `createCheckoutSession`. This preserves the "I confirmed what I'm buying" moment that the interstitial was trying to provide, without a full page navigation.
- If we'd rather keep it simple, skip the drawer and rely on Stripe's order summary — but then we MUST do step 3 well.

**3. Make the Stripe Checkout session feel branded**
In `createCheckoutSession`:
- Add `product_data.images: [absoluteUrl(variant.image)]` and `product_data.description` (e.g. "Evolve rodent fertility control — 6 lb refill").
- Set `allow_promotion_codes: true`.
- Set `phone_number_collection: { enabled: true }`.
- Set `custom_text.submit.message` to a one-line reassurance ("Ships within 24 hours · 30-day support included").
- Set `payment_method_types: ['card', 'link']` (and `['card', 'link', 'us_bank_account']` only if we want ACH).
- Set `billing_address_collection: 'auto'`.
- For sub mode, set `subscription_data.description` so the recurring line is human-readable.
- Stable shipping rate: create one shipping rate once (or look it up by metadata) instead of `stripe.shippingRates.create` on every call — currently we leak a new rate per checkout attempt.

**4. Brand the Stripe Checkout UI itself**
- One-time setup in Stripe Dashboard → Settings → Branding: upload Cloakd logo + icon, set brand color to our `--brand` and accent to `--brand` darker, set the button style. Mention this in the plan as a manual step for the user, not code.

**5. Tighten the success page**
- `src/routes/payment-confirmed.tsx`: confirm it fetches the session, shows order #, variant, total, ship-by date, and the "what happens next" timeline. (Audit current state in a follow-up if needed — out of scope here unless we find it's also thin.)

**6. Surface express pay earlier (stretch)**
- If we want true Gruns parity, mount Stripe's Express Checkout Element (Apple Pay / G Pay / Link) inside the BuyBox above "Order Now". This is a meaningful lift (client-side Stripe Elements, PaymentIntent on mount) — flag as Phase 2.

### Files touched
- `src/routes/checkout.$variantId.tsx` — delete
- `src/components/pdp/BuyBox.tsx` — wire `handleBuy` to server fn directly, add loading/error state, optionally open `OrderReviewDrawer`
- `src/components/pdp/OrderReviewDrawer.tsx` — new (if we do step 2)
- `src/server-functions/stripe.ts` — branded line items, promo codes, phone, custom text, stable shipping rate, fixed cancel URL
- (manual) Stripe Dashboard branding

### Phasing
- **Phase 1 (small, ship this week):** steps 1, 3, 4, 5 — kills the interstitial, makes Stripe look like ours, fixes cancel URL.
- **Phase 2 (next):** step 2 — review drawer for the on-brand confirmation moment.
- **Phase 3 (stretch):** step 6 — express pay on PDP.

Want me to proceed with Phase 1, or Phase 1 + 2 together?
