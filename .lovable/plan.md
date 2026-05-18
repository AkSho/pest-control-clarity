## What's actually happening

I called the checkout endpoint directly and pulled the server logs. The published worker is returning:

```
[error] Error: Server function info not found for src_server-functions_stripe_ts--createCheckoutSession_createServerFn_handler
POST .../_serverFn/...createCheckoutSession... → 500
```

That message means the server function never got registered at module load time — the file threw while being imported, so the registry is empty when the request arrives. The browser then sees a generic 500 HTML page, the `catch` in `OrderReviewDrawer` fires, and the user sees "We couldn't reach checkout right now."

The likely cause is the Stripe Node SDK. `new Stripe(key)` without arguments defaults to the Node HTTP client, which is not safe to instantiate inside Cloudflare's `workerd` runtime — it can blow up at module init when the handler is loaded. Stripe supports Workers, but only when you pass the fetch-based HTTP client and pin an API version.

The earlier `cloudflare:workers` import has already been removed, and `STRIPE_SECRET_KEY` is set, so this is the remaining blocker.

## Plan

1. **Fix `src/server-functions/stripe.ts` for the Worker runtime**
   - Construct Stripe with the fetch HTTP client and a pinned API version:
     ```ts
     new Stripe(key, {
       apiVersion: "2025-04-30.basil", // or the version currently typed by the SDK
       httpClient: Stripe.createFetchHttpClient(),
     });
     ```
   - Keep the rest of the handler unchanged (validator, shipping-rate caching, subscription vs payment branches).
   - Apply the same change to `createPaymentIntent`.

2. **Make server-side failures observable**
   - Add a `try/catch` inside the `createCheckoutSession` handler that logs the error with `console.error("[checkout]", err)` and rethrows. This way, the next time something fails, it shows up in `server-function-logs` instead of vanishing into the branded 500 page.

3. **Republish**
   - After the edit lands, the user needs to publish so the production worker picks up the new bundle. Without that step the published URL will keep returning the same "Server function info not found" error.

4. **Verify**
   - Re-invoke `/_serverFn/...createCheckoutSession...` against the published URL and confirm it returns `{ url: "https://checkout.stripe.com/..." }`.
   - Click "Checkout securely" in the preview and confirm the browser redirects to Stripe.

## Files touched

- `src/server-functions/stripe.ts` — Stripe constructor + small log/rethrow wrapper.

No UI changes needed; the drawer's error path is already correct.
