## What's broken

Clicking **Checkout securely** calls the `createCheckoutSession` server function, which crashes before it can run. The global SSR error wrapper in `src/server.ts` catches the crash and returns the branded "This page didn't load" HTML — that HTML is exactly what the drawer is now displaying as `Error: <!doctype html>...`.

Two root causes, stacked:

### 1. `cloudflare:workers` can't be imported in dev

`src/server-functions/stripe.ts` does:

```ts
import { getRequestContext } from "cloudflare:workers";
```

The dev sandbox log confirms Vite cannot resolve this module:

```
cloudflare:workers (imported by /dev-server/src/server-functions/stripe.ts)
```

`cloudflare:workers` is a virtual module that only exists inside the workerd runtime. The dev server runs on Node, so the module never resolves and the entire server function module fails to load. Every call to `createCheckoutSession` therefore throws at import time and bubbles up as a 500.

### 2. `STRIPE_SECRET_KEY` is not configured

`fetch_secrets` shows only `FIRECRAWL_API_KEY` and `LOVABLE_API_KEY`. There is no `STRIPE_SECRET_KEY` in the project, so even if the import is fixed the handler would throw `"STRIPE_SECRET_KEY not configured"`.

## Fix

### Step 1 — Read the secret from `process.env` (works in both dev and workerd)

Edit `src/server-functions/stripe.ts`:

- Remove `import { getRequestContext } from "cloudflare:workers";`
- Remove the `CloudflareEnv` type and `getRequestContext()` call
- Replace `getStripe()` with:

  ```ts
  function getStripe(): Stripe {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
    return new Stripe(key);
  }
  ```

  `process.env` is provided by `nodejs_compat` in workerd and natively in dev, so the same code works in both runtimes.

- Drop the `STEP1_FAIL`…`STEP5_FAIL` debug wrappers in favor of a single thrown error — they were left over from earlier debugging and add no value now.

### Step 2 — Add the Stripe secret

Use `secrets--add_secret` to add `STRIPE_SECRET_KEY` (the user's Stripe **test** or **live** secret key, `sk_test_…` / `sk_live_…`). Without this, checkout cannot create a Stripe session.

### Step 3 — Surface friendly errors in the drawer

Currently `OrderReviewDrawer.handleCheckout` does `setError(`Error: ${msg}`)`. When the server function fails, TanStack serializes the upstream Response body (the branded HTML) into `err.message`, which is what the user sees.

Catch the failure and show a generic message instead:

```ts
setError("We couldn't reach the checkout right now. Please try again in a moment.");
console.error("checkout failed", err);
```

This keeps real diagnostics in the console without dumping HTML into the UI.

## Files to change

- `src/server-functions/stripe.ts` — swap secret source, drop debug wrappers
- `src/components/pdp/OrderReviewDrawer.tsx` — friendlier error message

## Out of scope

- No changes to the checkout UX flow, layout, or copy beyond the error message
- No changes to the Stripe session shape (subscriptions, shipping rates, etc.)
- The `STRIPE_SECRET_KEY` value must come from the user; I'll add it via the secret tool once you approve.
