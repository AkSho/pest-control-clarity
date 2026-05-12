## Goal

Replace the temporary nav with the real cloakd-removals.cloud structure (Solutions as a dropdown), drop the "Pest Control License" top bar, and stand up the 6 inner pages that the nav points to.

## 1. Header / nav changes (`src/components/site/SiteHeader.tsx`)

- Remove `TopBar` (the "Pest Control License: #NYC-PCO-XXXXXX" strip) from `__root.tsx` and delete the `TopBar` export.
- New top nav (left → right):
  - Logo → `/`
  - **The Problem** → `/why-it-keeps-coming-back`
  - **Solutions** ▾ (dropdown, 6 items):
    - Restaurants → `/solutions/restaurants`
    - Property Managers → `/solutions/property-managers`
    - Ghost Kitchens → `/solutions/ghost-kitchens`
    - Food Storage & Cold Chain → `/solutions/food-storage`
    - Residential → `/solutions/residential`
    - HOAs & Co-ops → `/solutions/hoas`
  - **Results** → `/results`
  - **FAQ** → `/faq`
  - **Resources** → `/resources`
- CTA: "Get Started" → `/get-started` (replace the phone-number CTA).
- Mobile: dropdown collapses to inline section in the existing mobile sheet.
- Built with shadcn `NavigationMenu` (already in repo).
- Existing `/areas/...` pages keep working but leave the top nav (linkable from footer/home as today).

## 2. New routes (TanStack file-based)

All pages preserve current copy from cloakd-removals.cloud (already captured) and use our existing design tokens, `LeadForm`, `TrustBadges`, `SiteFooter`.

| Route file | URL | nealrfg.com layout reference | Notes |
|---|---|---|---|
| `src/routes/why-it-keeps-coming-back.tsx` | /why-it-keeps-coming-back | service-detail (hero + long-form sections + form) | "The Problem" — territorial behavior + cycle explainer |
| `src/routes/solutions.$slug.tsx` | /solutions/:slug | service-detail | One template handles all 6 audiences; data driven by `src/data/solutions.ts` |
| `src/routes/results.tsx` | /results | service-detail (stats-heavy) | Field study deep-dive: 79% / 88% / 90% with methodology |
| `src/routes/faq.tsx` | /faq | nealrfg `/faqs` (grouped accordion) | Lifts FAQ off the home page; home keeps a short teaser linking here |
| `src/routes/resources.tsx` | /resources | custom (article/asset cards grid) | Field study summary, EPA classification note, downloadable program one-pager — placeholders until you supply assets |
| `src/routes/get-started.tsx` | /get-started | service-detail (form-first, hero right-aligned) | Full-page LeadForm + trust badges + brief "what happens next" |

Each route gets its own `head()` with unique title/description/og:title/og:description per the route-architecture rules. `og:image` left out until you provide images.

## 3. Solutions data file

`src/data/solutions.ts` — array of 6 entries: `{ slug, audience, eyebrow, headline, lede, painPoints[], outcomes[], stats[], ctaLabel }`. Copy lifted from cloakd-removals.cloud `/solutions/*` blurbs already captured (restaurants violation pricing, property-managers multi-building, ghost-kitchens no-lockin, etc.). Slug list seeds `notFound` handling and a sitemap-ready array.

## 4. Image strategy

You will provide imagery. For now every page reserves typed image slots (constants at the top of each route or in `solutions.ts`) pointing at placeholder gradients/patterns from existing tokens, so swapping in real photos is a one-line change per slot. No AI image generation this round.

Slots reserved:
- The Problem: 1 hero, 2 inline diagrams
- Each Solution: 1 hero, 1 supporting photo
- Results: 1 hero, 3 chart/figure slots
- Get Started: 1 hero/side image
- Resources: 1 cover per resource card (3 cards initially)

## 5. Out of scope (flag for later)

- Real Resources content (PDFs, articles) — needs your files.
- Per-area pages beyond what already exists in `/areas/...`.
- Replacing the home page FAQ accordion (we'll keep it and link "See all" → `/faq`).
- Analytics events on new CTAs.

## Technical notes

- Use shadcn `NavigationMenu` for the dropdown; mobile reuses the existing `Sheet`-style collapse already in `SiteHeader`.
- `solutions.$slug.tsx` uses a `loader` that looks up by slug and throws `notFound()` for unknown slugs; `notFoundComponent` + `errorComponent` defined per house rules.
- Every new route declares `head()` with route-specific `title`, `description`, `og:title`, `og:description`. `og:image` added once you supply per-page hero photos.
- Footer nav updated to mirror the new top nav.
- No backend changes; LeadForm continues to submit to the existing handler.
