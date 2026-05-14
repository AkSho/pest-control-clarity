# Plan: Product PDPs (Starter Kit + Refill)

UI-only scaffold. Stripe, Cloud, orders, and webhooks are explicitly deferred — buttons will navigate to a mock `/checkout/$variantId` confirmation step that captures the selected SKU + plan in the URL so we can wire payments cleanly later.

## Scope

### New routes
- `/products/starter-kit` — variants: Rat (default), Mouse
- `/products/refill` — variants: Rat 6lb (default), Mouse 6lb, Rat 12lb
- `/checkout/$variantId` — placeholder express-checkout page (email + shipping fields, "Place order" disabled with a "Payments coming online soon" note). Reads variant + plan from search params.

### Source of truth
- `src/data/products.ts` — single typed catalog. Each variant: `id`, `productSlug`, `label`, `pestType`, `size`, `oneTimePrice`, `subscription` (nullable: `{ price, cadenceDays, label }`), `image`, `senestechUrl`, `shortDescription`, `longDescription`, `features[]`, `howItWorks[]`, `whatsIncluded[]` (starter only), `faq[]`.
- Content + image URLs scraped from the 5 SenesTech PDPs via Firecrawl. Images hotlinked from `cdn.shopify.com` URLs SenesTech uses. Gaps backfilled from existing copy in `src/data/solutions.ts` and routes like `evolve-rodent-birth-control.tsx`, `how-it-works.tsx`, `does-rat-birth-control-work.tsx`.
- Confirmed pricing matrix (your numbers):

```text
SKU                  One-time    Replenishment
Starter Kit Rat      $169        —
Starter Kit Mouse    $169        —
Refill Rat 6lb       $149        $129 every 60 days
Refill Mouse 6lb     $149        $129 every 60 days
Refill Rat 12lb      $249        $219 every 90 days
```

### PDP layout (Gruns 1:1)
Two-column above fold (image gallery left, buy box right), then stacked content sections:

1. **Sticky-ish gallery** — main image + 3-4 thumbnails
2. **Buy box**
   - Product title + one-line subtitle
   - Star rating + review count (use existing `src/data/reviews.ts` aggregate)
   - Variant pills (Rat / Mouse, or Rat 6lb / Mouse 6lb / Rat 12lb)
   - Plan selector (refill PDP only): two radio cards
     - "One-time — $149"
     - "Replenishment plan — $129, auto-delivered every 60 days" (selected by default per your "lead with commitment" framing)
   - Price (live) + crossed-out one-time when sub selected
   - Quantity stepper (1–10)
   - Primary CTA: "Add to order" → navigates to `/checkout/$variantId?plan=oneTime|sub&qty=N`
   - Trust row: free returns, ships in 24h, $12.95 flat shipping, made in USA / EPA-registered
3. **Value strip** — 4 icon tiles ("EPA-registered active ingredient", "No poison", "Targets reproduction", "Works on resistant populations")
4. **How it works** — 3-step horizontal (bait → consumed → fertility decline). Reuse SplitFigure pattern.
5. **What's inside / What's included** — Starter kit shows bait stations + pouch; Refill shows pouch only
6. **Comparison table** — Evolve vs poison vs snap traps (compress existing `vs.*` page content)
7. **Reviews** — pull from `src/data/reviews.ts` via existing `ReviewsGrid`
8. **FAQ accordion** — 5-7 Qs from existing `faq.tsx` filtered to product-relevant
9. **Sticky mobile buy bar** — appears on scroll past buy box, contains price + CTA

### Shared components (new)
- `src/components/pdp/ProductGallery.tsx`
- `src/components/pdp/BuyBox.tsx` (handles variant + plan + qty state, emits navigate)
- `src/components/pdp/PlanSelector.tsx`
- `src/components/pdp/VariantPills.tsx`
- `src/components/pdp/ValueStrip.tsx`
- `src/components/pdp/ComparisonTable.tsx`
- `src/components/pdp/StickyMobileBar.tsx`

Both PDP routes are thin wrappers that pass a `productSlug` to a single `<ProductPage />` component — keeps logic DRY.

### Out of scope (this turn)
- Stripe enable, PaymentIntents, webhooks, orders table
- Lovable Cloud
- Cart / multi-item
- Tax calc
- Real shipping address validation
- Subscription management portal
- Updating homepage / nav CTAs (existing service pages stay as-is per your routing answer)

## Technical details

- Firecrawl: connect via `standard_connectors--connect`, then call `firecrawl.scrape` server-side from a one-shot script (not a server function — pure build-time content gathering). Output written into `src/data/products.ts`. If a product page returns thin content, fall back to existing site copy.
- Images: store the `cdn.shopify.com` URLs in the catalog and `<img src>` directly. Add `loading="lazy"` and explicit `width`/`height` to avoid CLS. If hotlinking flakes, easy follow-up to download into `public/products/`.
- Routing: TanStack file-based, flat dot convention — `src/routes/products.starter-kit.tsx`, `src/routes/products.refill.tsx`, `src/routes/checkout.$variantId.tsx`. Each route owns its `head()` (title, description, og:title, og:description, og:url, canonical, JSON-LD `Product` schema with `offers` reflecting current variant defaults).
- State: URL is the source of truth — variant + plan + qty live in search params (`?variant=rat-6lb&plan=sub&qty=1`) so refresh and share both work, and the buy box rehydrates from URL on mount.
- Styling: design tokens from `src/styles.css` only — no raw colors. Reuse existing `Button`, `Card`, `Accordion`, `Badge`. Mobile-first; sticky buy bar appears below `md`.
- SEO: `Product` JSON-LD per page with all variant offers; `<link rel="canonical">` per leaf only (root has none, per template convention).
- No backend, no secrets, no API calls at runtime.

## Deliverables checklist
- [ ] Firecrawl connected + 5 product pages scraped
- [ ] `src/data/products.ts` populated with copy + image URLs + confirmed pricing
- [ ] 7 new PDP components under `src/components/pdp/`
- [ ] `/products/starter-kit`, `/products/refill`, `/checkout/$variantId` routes
- [ ] Per-route head() metadata + Product JSON-LD
- [ ] Mobile sticky buy bar
- [ ] Visual QA in preview at 634px (your current viewport) and desktop

## Open follow-ups (next turn)
1. Enable Lovable Cloud + Stripe, wire `/checkout/$variantId` to real PaymentIntent + Stripe Elements
2. Add `orders` table + webhook handler at `/api/public/stripe-webhook`
3. Decide on homepage CTA reframe once PDPs are live and you've eyeballed them
