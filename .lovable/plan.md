## 1. Apple Pay domain verification (you do this, ~2 min)

In Stripe Dashboard:
1. **Settings → Payment methods → Apple Pay → Add a new domain**
2. Enter your domains, one at a time:
   - `pest-pro-rebrand.lovable.app` (published)
   - your custom domain too, once it's live
3. Stripe gives you a verification file to host at `/.well-known/apple-developer-merchantid-domain-association`
4. **Send me the file contents** (or just paste the URL Stripe gives you) — I'll add a TanStack server route at `src/routes/.well-known/apple-developer-merchantid-domain-association.ts` that serves it. Then you click "Verify" in Stripe.

Note: the preview URL (`id-preview--…lovable.app`) can't be verified — Apple only allows stable domains. Apple Pay will only show on published + custom domains.

## 2. Force Link to always render

One-line change in `src/components/pdp/ExpressCheckoutBlock.tsx`:

```
link: "auto"  →  link: "always"
```

Effect: every Chrome/Firefox/Edge visitor sees the Link button next to Google Pay, even if Stripe doesn't recognize them yet.

## 3. Add PayPal as an express button

Two pieces:

**a. Enable PayPal in Stripe Dashboard:** Settings → Payment methods → PayPal → Turn on. (Free, no PayPal Business account needed — Stripe handles the connection.)

**b. Code change:** PayPal isn't part of `ExpressCheckoutElement`'s built-in wallet set — it has to be added via `paymentMethods.paypal: "always"` in the Element options. Stripe auto-renders it as a yellow PayPal button below Google Pay/Link when enabled on the account.

That's the whole change — no separate component, no new server fn (the existing `createPaymentIntent` already uses `automatic_payment_methods`, which picks up PayPal once it's enabled on the account).

## Order of operations

Do step 2 + 3b now (code-only, takes one edit). Step 1 and 3a are dashboard work on your end — once you've enabled PayPal and sent me the Apple Pay verification file, I'll wire up the `.well-known` route.

Sound good?
