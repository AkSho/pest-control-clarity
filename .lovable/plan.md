## PDP rebuild — Gruns-style structure, SenesTech-grounded content

### Scope
Two routes only: `/products/starter-kit` and `/products/refill`. No nav/header changes. No new business logic.

### Source material gathered (Firecrawl)
- 8 SenesTech pages scraped to `/tmp/sn/` (3 PDPs, Evolve landing, rat & mouse category pages, soft-bait pages).
- Pricing, descriptions, key benefits, FAQ, FIFRA 25(b) language, "2 rats → 15,000" hook, subscribe-and-save 10% cadence (1/2/3 mo), real review excerpts (Don S., Bryan A., Judith C., Jordan L.) all captured.
- Cloakd's own field stats (79% / 88% / 79%+) and EPA bullets pulled from `src/routes/index.tsx` and `src/routes/evolve-rodent-birth-control.tsx`.

### Page architecture (per PDP)

```text
[1] Sticky mini-nav (anchors)
[2] Two-column hero
    L: ProductGallery (existing, swap to multiple images)
    R: BuyBox
       - Title + rating row (4.6 ★ · 38 reviews — from SenesTech)
       - Short description
       - VariantPills (pest)
       - Size pills (1.5 / 3 / 6 / 12 lb for refill; starter sizes for kit)
       - PlanSelector — REBUILD as two stacked cards
         · Subscribe & Save 10%  (cadence: 1/2/3 months)
         · One-time purchase
       - Add to cart CTA + "Free shipping over $99"
       - INLINE ACCORDION (Gruns 1:1):
         · Description
         · How it works
         · What's inside
         · Ingredients & safety (cottonseed oil, FIFRA 25(b))
         · Deployment guide (link to PDF)
         · Shipping & returns
         · FAQs (top 4)
[3] "Works on / Safe around" marquee strip (replaces Gruns emoji marquee)
    Row A: Norway rats · Roof rats · House mice · Deer mice · Burrows · Fence lines · Dumpster pads · Garages
    Row B: Safe around — Dogs · Cats · Kids · Hawks · Owls · Livestock · Gardens · Food-handling areas
[4] "The rebound problem" explainer (3 cols)
    Pulls from how-it-works.tsx CYCLE + SenesTech "2 rats → 15,000" hook
[5] How Evolve works (mechanism trio: Males / Females / Cumulative)
    Reuse copy from evolve-rodent-birth-control.tsx MECHANISM
[6] Field results trio (79% / 88% / 79%+) with PRNewswire citations
[7] ComparisonTable — Evolve vs Poison vs Snap traps (existing, light copy polish)
[8] Reviews — tag-filtered carousel
    Tags: All · Effectiveness · Safety · Customer service · HOA/Multi-unit
    Seed with 5 real SenesTech reviews + 3 Cloakd ones
[9] Press strip (existing PressStrip component, already on home)
[10] Trust row — Made in USA · FIFRA 25(b) · Non-anticoagulant · No secondary kill
[11] FAQ accordion (full version, 8–10 Qs from SHARED_FAQ + SenesTech)
[12] Closing CTA band
[13] StickyMobileBar (existing)
```

### Component changes

**Rebuild**
- `PlanSelector.tsx` → two large stacked cards matching Gruns: subscribe card highlighted (badge "Save 10%"), cadence dropdown inside subscribe card, one-time card dimmed.
- `BuyBox.tsx` → add inline accordion section under CTA; add 4.6★ rating row above title; add size pills row.

**New components** (`src/components/pdp/`)
- `WorksOnMarquee.tsx` — two infinite-scroll rows, CSS-only animation
- `MechanismTrio.tsx` — 3-card grid (Males / Females / Cumulative)
- `ReboundExplainer.tsx` — 3-col "remove → empty → refill" with the 15,000 hook
- `FieldResultsTrio.tsx` — 79/88/79 stat cards with citations (component already partially exists as `FieldDataTrio` in solutions; reuse if signature fits, otherwise wrap)
- `ReviewsCarousel.tsx` — tag-filtered horizontal carousel using shadcn `carousel` + `tabs`
- `PdpAnchorNav.tsx` — sticky sub-nav with smooth-scroll
- `TrustRow.tsx` — 4-icon strip

**Data**
- Extend `src/data/products.ts`:
  - Add `sizes` array per pest with prices matching SenesTech (1.5 / 3 / 6 / 12 lb at $34.99 / $56.99 / $99.99 / $199.99 for rat refill; mouse equivalent; starter kit at $45.99 / $129.99)
  - Add `subscription.discountPct: 10` and cadence options `[1,2,3]` months
  - Add `accordion: { description, howItWorks, whatsInside, ingredients, deployment, shipping }[]`
  - Add `mechanism`, `fieldResults`, `worksOn`, `safeAround`, `pressLogos` (reuse), `trustBadges`
- New `src/data/pdpReviews.ts` — 8 reviews with `tags: string[]`, seeded from scraped SenesTech reviews + Cloakd's existing `reviews.ts`

### Visible TODO placeholders (per Tier 3 from prior turn)
- Hero overlay icons: stage 4 with placeholder labels marked `TODO: confirm icon set`
- Authority endorsement card: stage layout, body says "TODO: Name, title, quote, headshot"
- Video testimonials: 3 video tile placeholders with "TODO: Vimeo/YouTube URL"
- Lifestyle photography: keep current SenesTech CDN product shots; add 3 grey `<aside>TODO: lifestyle shot</aside>` blocks in gallery

### Out of scope
- Quantity discounts (confirmed flat)
- Secondary in-box selector beyond pest+size (confirmed)
- Real reviews widget integration (deferred)
- New routes, header/footer, checkout flow

### Files touched (estimate)
- Edit: `src/data/products.ts`, `src/components/pdp/{BuyBox,PlanSelector,ProductPage,VariantPills}.tsx`, `src/routes/products.{starter-kit,refill}.tsx`
- Create: 7 new components in `src/components/pdp/`, `src/data/pdpReviews.ts`

### Build order
1. Data layer (products.ts + pdpReviews.ts)
2. Rebuild PlanSelector + BuyBox with inline accordion
3. New section components in dependency order
4. Wire into ProductPage with anchor nav
5. Visual QA at 634px (current viewport) and desktop
