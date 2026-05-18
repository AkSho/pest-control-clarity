## Bird's-eye audit — what I actually missed

I was wrong in the last three loops. I kept telling you to publish, when the publish was already correct. Hard facts I just verified against the live worker:

1. **The published bundle is fresh.** The live `/products/starter-kit` page returns 200, contains the new `OrderReviewDrawer`, the new "We couldn't reach checkout…" string, and the new `createCheckoutSession` reference. Frontend is up to date.
2. **The server function IS registered.** The client doesn't call a readable name like `src_lib_stripe_functions_ts--…`; the build hashes it. The bundled URL is `/_serverFn/c93cfd95f5d3975de7abe7bc53d15d9009664b9f5caa8f53100373f154b153c4`. My earlier "Server function info not found" log was from my own debug calls hitting the wrong URL — not from your browser.
3. **The real failure is inside the handler.** Calling the actual hashed endpoint returns:
   - HTTP 500
   - Body: `Seroval Error (step: 3)`
   - Worker log: `[error] Error: Seroval Error (step: 3)`
4. **Seroval Error means TanStack Start tried to serialize a thrown value across the RPC boundary and couldn't.** In `src/lib/stripe.functions.ts` the `try/catch` does `throw err;` and re-throws the raw Stripe SDK error. Stripe error classes (`StripeAuthenticationError`, `StripeInvalidRequestError`, etc.) are class instances with non-plain properties → seroval fails → the client gets a 500 with no message → drawer shows the generic toast.
5. **The underlying Stripe error is currently hidden** by that re-throw. The `console.error("[checkout] createCheckoutSession failed", …)` line never lands in the worker logs I can read (only the seroval failure does), so I can't see the root cause until we normalize how errors leave the handler.
6. **Strong suspect for the underlying error: test/live key mismatch.** `src/lib/stripe-client.ts` ships `pk_live_I19Ma0w4zbjLIhM2054LFoR700Gu18CSCf` to the browser. If the `STRIPE_SECRET_KEY` runtime secret is an `sk_test_…` key, every Stripe API call from the worker throws `StripeAuthenticationError: Mismatched API keys`. We won't be sure until step 1 below surfaces the message.

## Plan

### 1. Normalize error handling in `src/lib/stripe.functions.ts`
- In both `createCheckoutSession` and `createPaymentIntent`, wrap the handler body in `try/catch`.
- In `catch`, `console.error` the full Stripe error (`err?.type`, `err?.code`, `err?.message`, `err?.raw`).
- Then `throw new Error(...)` with a plain string — `Stripe error: <type> <code> <message>` — so seroval can serialize it. This both unblocks the response and surfaces the real reason in the UI/logs.
- Apply the same pattern to `createPaymentIntent` (it currently has no catch at all).

### 2. Re-trigger the failing call and read the real Stripe message
- After publish, invoke the hashed endpoint again.
- Read the now-serializable error message from the response body and the worker logs.

### 3. Resolve the underlying Stripe issue based on what step 2 reveals
- **If `Mismatched API keys` / `Invalid API Key`** → the `STRIPE_SECRET_KEY` secret needs to be a live secret key (`sk_live_…`) matching the `pk_live_…` publishable key already in `stripe-client.ts`. You'll need to update the secret value; I can't read it, only confirm its name exists.
- **If `parameter_unknown` / `shipping_options not allowed`** → fix the offending Stripe param in the handler.
- **If `No such shipping_rate`** → the cached `cachedShippingRateId` (module-level) is stale across a key/mode switch; reset cache and recreate.
- **If something else** → fix that specifically, no guessing.

### 4. Verify end-to-end
- Hit the published checkout flow from the browser, confirm redirect to `checkout.stripe.com`.
- Re-test Express Checkout (`createPaymentIntent`) once `createCheckoutSession` is green — same root cause likely applies.

## What I'm explicitly NOT doing this time
- Not asking you to publish again as a fix. Publish state is fine.
- Not renaming/moving the server function file again. The hashed ID is already registered.
- Not changing the frontend toast or the drawer. The bug is server-side.
