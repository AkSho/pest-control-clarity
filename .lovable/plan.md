# SEO expansion: Evolve / ContraPest landing pages + cross-linking

## Goal

Capture brand-mention search traffic for "Evolve" and "ContraPest" by publishing dedicated explainer + comparison pages, plus add internal links from existing pages to concentrate topical authority. Visual + structural style follows nealrfg.com (clear hero → trust → explainer → comparison → CTA rhythm, distinct stat blocks, badge accents) but rendered with the existing Cloakd design tokens and primitives (`SolutionHero`, `SectionHeader`, `PhaseCards`, `TimelineStrip`, `StatCard`, `ClosingCta`). Copy voice matches existing pages (`/how-it-works`, `/does-rat-birth-control-work`, `/results`): plain, structural, no marketing puff.

## Reconciliations vs. the original spec

A few items in the prompt were based on a stale picture of the repo. Resolutions:

- **No FAQPage JSON-LD exists** in `does-rat-birth-control-work.tsx`. Lines 11–31 are just the route's title/description/`head()` config. Skip the "remove FAQ schema" step — nothing to remove. None of the other pages have FAQ schema either; new pages will use plain Q&A blocks (per spec).
- **No `Evolve` mention currently on `/`** (index.tsx). Skip that linking step — we'll add a single contextual link only if a natural mention is added later.
- **`/rodent-fertility-control` and `/vs/diy-rat-birth-control` do not exist** → create both (per your answer).
- **Pricing/subcontractor copy** → drop the `$349/month` and "licensed PCO subcontractors" phrasing entirely; replace with "managed monthly program — Cloakd handles deployment and tracking." CTAs go to `/get-started`.

## Pages to create (5 total)

### 1. `src/routes/evolve-rodent-birth-control.tsx`

Sections (H2): What Evolve Is · EPA 25(b) Minimum Risk · Deployment Structure Determines the Outcome · The Urban Field Study Data (79/88/90, sourced to SenesTech PR) · Where Evolve Is Deployed at City Scale · Evolve vs. ContraPest (brief) · Who Deploys Evolve in NYC, NJ & Bay Area (Cloakd block, no price, no subcontractor wording) · Common Questions (plain Q&A, no schema). CTA → `/get-started`. Cross-links to `/does-rat-birth-control-work`, `/vs/diy-rat-birth-control`, `/contrapest`, `/contrapest-vs-evolve`, `/rodent-fertility-control`.

### 2. `src/routes/contrapest.tsx`

Sections: What ContraPest Is · NYC's ContraPest Program · Why the Bryant Park Pilot Failed (brief, links to `/does-rat-birth-control-work`) · ContraPest vs. Evolve (brief, links to `/contrapest-vs-evolve`) · What ContraPest Means for Commercial Operators · Cloakd's Program (Evolve-based, no pricing) · Common Questions. CTA → `/get-started`.

### 3. `src/routes/contrapest-vs-evolve.tsx`

Sections: What They Have in Common · Side-by-Side Comparison (table) · The Formulation Difference That Matters in Buildings · What the Deployment Data Shows for Each (sourced) · Which One Is Right for a Commercial Building Program · Cloakd Deploys Evolve. CTAs → `/get-started` (primary), `/evolve-rodent-birth-control` (secondary).

### 4. `src/routes/rodent-fertility-control.tsx` *(new — referenced as the program landing page)*

Compact landing variant focused on the search term "rodent fertility control." Sections: What rodent fertility control is · How a managed program differs from DIY · The 90-day structure (link to `/how-it-works` for full detail) · Field results (link to `/results`) · What's included in Cloakd's managed program · CTA → `/get-started`. Reuses existing primitives; no price displayed.

### 5. `src/routes/vs.diy-rat-birth-control.tsx` *(new — `/vs/diy-rat-birth-control`)*

Comparison page: DIY retail Evolve kits (Lowe's/Home Depot/Amazon) vs. managed deployment. Sections: What you can buy retail · What changes between DIY and managed · Where DIY tends to fail (no Phase 1 knockdown, no monitoring, ad-hoc placement) · When DIY is fine vs. when managed is needed · CTA → `/get-started`.

Each route gets unique `head()` with route-specific `title`, `description`, `og:title`, `og:description`, and an `og:image` from `src/assets/` (reuse `program-bryant-park.jpg` / `program-how-it-works.jpg` where contextually right; no new image generation in this pass).

## Edits to existing pages

### `src/routes/does-rat-birth-control-work.tsx`
- Skip FAQ-schema removal (none exists).
- Add visible "See the full comparison →" link in the existing ContraPest-vs-Evolve section pointing to `/contrapest-vs-evolve`.
- First "Evolve" mention → `<Link to="/evolve-rodent-birth-control">`.
- First "ContraPest" mention → `<Link to="/contrapest">`.

### `src/routes/results.tsx`
- First "Evolve" mention (line ~58) → link to `/evolve-rodent-birth-control`.
- First "ContraPest" mention (line ~53) → link to `/contrapest`.

### `src/routes/how-it-works.tsx`
- First "Evolve" mention (line 137) → link to `/evolve-rodent-birth-control`.

### `src/routes/rodent-fertility-control.tsx` (new, see above)
- First "Evolve bait" → `/evolve-rodent-birth-control`.
- First "SenesTech" in any FAQ-style answer → `/evolve-rodent-birth-control`.

### `src/routes/vs.diy-rat-birth-control.tsx` (new, see above)
- First body "Evolve" after H1 → `/evolve-rodent-birth-control`.

### `src/routes/index.tsx`
- No "Evolve" string currently present → no change. (Skip; flagged above.)

### `src/components/site/SiteFooter.tsx`
- Add the 5 new pages to the footer under an existing or new "Learn" / "Resources" column. Header nav untouched (per your answer).

## Technical details

- All new routes are flat files in `src/routes/` per existing convention; no nested `_app/`. The `vs/diy-rat-birth-control` route uses dot-notation `vs.diy-rat-birth-control.tsx`.
- Use existing primitives from `src/components/site/solutions/SolutionPrimitives.tsx` for hero, section headers, stat cards, closing CTA; no new component library.
- Comparison table on `/contrapest-vs-evolve`: semantic `<table>` styled with Tailwind + Cloakd tokens (`border-border`, `bg-card`, `text-muted-foreground`).
- Plain Q&A blocks: `<h3>` + `<p>` pairs inside a card grid — **no `application/ld+json` FAQPage schema** anywhere.
- Source citations link out to the SenesTech PR Newswire URLs already used in `results.tsx` and `does-rat-birth-control-work.tsx`.
- All cross-links use `<Link to="...">` (typed router); no string interpolation.
- No backend, no Stripe touched, no env or schema changes.

## Files created

```
src/routes/evolve-rodent-birth-control.tsx
src/routes/contrapest.tsx
src/routes/contrapest-vs-evolve.tsx
src/routes/rodent-fertility-control.tsx
src/routes/vs.diy-rat-birth-control.tsx
```

## Files edited

```
src/routes/does-rat-birth-control-work.tsx   (cross-links + comparison link)
src/routes/results.tsx                        (cross-links)
src/routes/how-it-works.tsx                   (cross-link)
src/components/site/SiteFooter.tsx            (footer nav additions)
```

## Out of scope

- Stripe / payments wiring (handled later when GitHub-connected).
- Image generation for new OG assets (reuse existing).
- Header navigation changes.
- Any FAQ JSON-LD schema.
