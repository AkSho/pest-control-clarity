## Plan

The checkout error is still coming from the published server function endpoint returning 500 with:

```text
Server function info not found for src_server-functions_stripe_ts--createCheckoutSession_createServerFn_handler
```

That means the browser is calling a server-function ID that is not present in the published server-function manifest. This is happening before Stripe is reached, so the current user-facing message is just the drawer catching that 500.

## What I will change

1. **Move the checkout server functions into the recommended client-safe module location**
   - Create/move the Stripe server functions from `src/server-functions/stripe.ts` to a `*.functions.ts` file under `src/lib/`, for example `src/lib/stripe.functions.ts`.
   - Keep the existing Stripe logic, including the fetch-based Stripe HTTP client and checkout error logging.
   - This aligns with TanStack Start’s recommended convention and avoids server-function manifest registration issues with the current location.

2. **Update checkout imports**
   - Update `OrderReviewDrawer.tsx` to import `createCheckoutSession` from the new functions module.
   - Update `ExpressCheckoutBlock.tsx` to import `createPaymentIntent` from the new functions module.

3. **Remove the stale server-function module**
   - Delete or stop using `src/server-functions/stripe.ts` so the app no longer generates/calls the old `src_server-functions_stripe_ts--...` server-function ID.

4. **Verify the flow**
   - Reproduce checkout through the preview or invoke the new server-function endpoint.
   - Check server logs to confirm the previous “Server function info not found” error is gone.
   - If Stripe then returns a provider-level error, use the new checkout logs to address that separately.

## After implementation

Backend/server changes deploy automatically, but if the published frontend is still serving the old bundle, you’ll need to click **Publish/Update** so live users get the updated client-side server-function ID.