# SEO expansion: 8 comparison (`/vs/*`) pages

## Goal

Mirror the live site's eight `/vs/*` comparison pages onto this project, adapted to Cloakd's existing TanStack Start route conventions, design tokens, and primitives. Same SEO play as the prior Evolve / ContraPest batch — capture branded competitor and category search traffic.

## Pages to create (8 total)

Three category comparisons + five named-competitor comparisons. Live URLs are at `https://cloakd-removals.cloud/vs/<slug>`.

| Route | Source URL | Type |
|---|---|---|
| `/vs/rat-poison` | `cloakd-removals.cloud/vs/rat-poison` | Category |
| `/vs/traditional-pest-control` | `cloakd-removals.cloud/vs/traditional-pest-control` | Category |
| `/vs/snap-traps` | `cloakd-removals.cloud/vs/snap-traps` | Category |
| `/vs/assured-environments` | `cloakd-removals.cloud/vs/assured-environments` | Competitor |
| `/vs/orkin` | `cloakd-removals.cloud/vs/orkin` | Competitor |
| `/vs/bell-environmental` | `cloakd-removals.cloud/vs/bell-environmental` | Competitor |
| `/vs/viking-pest-control` | `cloakd-removals.cloud/vs/viking-pest-control` | Competitor |
| `/vs/western-pest-services` | `cloakd-removals.cloud/vs/western-pest-services` | Competitor |

The existing `/vs/diy-rat-birth-control` route remains; not rebuilding it.

## Sourcing approach

For each page:

1. Fetch live URL with `code--fetch_website` (markdown). Already verified working on `/vs/orkin`. No Firecrawl connector required for one-time content collection (per the Firecrawl skill note: use `lov-fetch-website` when collecting info to build the app).
2. Preserve the live copy's structure and substantive claims verbatim where possible.
3. **Soften competitor pages** per your instruction:
   - Strip any disparaging language about a named competitor.
   - Keep only factually verifiable statements (services they publicly offer, public service area, public reputation markers from their own marketing).
   - Frame Cloakd's offer as additive ("layered onto your existing vendor"), not as superior to the named competitor.
   - Keep trademark mentions to nominative use only ("comparison with Orkin", not "Orkin's program is worse").
4. Adapt copy voice to match existing Cloakd pages (`/how-it-works`, `/results`).

## Page structure (shared template)

Modeled after nealrfg.com section rhythm + the patterns already established in `/contrapest-vs-evolve` and `/vs/diy-rat-birth-control`:

1. `SolutionHero` — eyebrow ("vs. Orkin" / "vs. Rat poison"), H1, lede.
2. **What [competitor / method] covers** — factual section, public-source bullets.
3. **The structural gap** — what standard treatment / poison / snap traps don't change (the replacement-cycle thesis from existing pages).
4. **Side-by-side comparison table** — `<table>` styled with Cloakd tokens. Columns: feature · [Their approach] · Cloakd's managed Evolve program. (For category pages, columns are method vs. fertility-control program.)
5. **Where each one fits** — when their approach is the right tool, when fertility control is needed alongside it.
6. **Cross-link block** — links to `/evolve-rodent-birth-control`, `/rodent-fertility-control`, `/how-it-works`.
7. `ClosingCta` — primary "Start the program" → `/get-started`, secondary varies (e.g. "How Evolve works").

Each page gets its own `head()` with route-specific `title`, `description`, `og:title`, `og:description`, and reuses `program-how-it-works.jpg` or `program-bryant-park.jpg` from `src/assets/` as `og:image`. No FAQ JSON-LD.

## Cross-linking + nav

- **Footer (`SiteFooter.tsx`)**: add a new "Comparisons" column listing all `/vs/*` pages (the existing `vs/diy-rat-birth-control` plus the 8 new ones). Header nav unchanged.
- **`/contrapest-vs-evolve`** and **`/contrapest`**: add a "More comparisons" link block pointing to the new vs pages.
- **`/rodent-fertility-control`**: add a section linking to the category vs pages (rat poison, traditional pest control, snap traps).
- **`/evolve-rodent-birth-control`**: link to `/vs/rat-poison` from the deployment-structure section.

## Technical details

- Route filenames use TanStack flat dot-notation: `vs.rat-poison.tsx`, `vs.orkin.tsx`, etc. → resolves to `/vs/<slug>`.
- All pages reuse primitives from `src/components/site/solutions/SolutionPrimitives.tsx` (`SolutionHero`, `SectionHeader`, `ClosingCta`). Comparison tables follow the exact pattern from `vs.diy-rat-birth-control.tsx`.
- Cross-links use `<Link to="/...">` (typed router); no string interpolation.
- No FAQ schema. No new components. No backend changes. No design-token additions.
- Asset reuse only — no new image generation in this pass.

## Execution order

1. Fetch all 8 live pages in parallel via `code--fetch_website`.
2. Write the 5 competitor `vs.*.tsx` files (softened copy).
3. Write the 3 category `vs.*.tsx` files (verbatim where appropriate).
4. Update `SiteFooter.tsx` to add the Comparisons column.
5. Add cross-link blocks to `evolve-rodent-birth-control.tsx`, `contrapest.tsx`, `contrapest-vs-evolve.tsx`, `rodent-fertility-control.tsx`.

## Files created

```
src/routes/vs.rat-poison.tsx
src/routes/vs.traditional-pest-control.tsx
src/routes/vs.snap-traps.tsx
src/routes/vs.assured-environments.tsx
src/routes/vs.orkin.tsx
src/routes/vs.bell-environmental.tsx
src/routes/vs.viking-pest-control.tsx
src/routes/vs.western-pest-services.tsx
```

## Files edited

```
src/components/site/SiteFooter.tsx
src/routes/evolve-rodent-birth-control.tsx
src/routes/contrapest.tsx
src/routes/contrapest-vs-evolve.tsx
src/routes/rodent-fertility-control.tsx
```

## Out of scope

- Header navigation changes.
- New images / OG asset generation.
- Schema.org markup.
- Updating the live site or pushing to GitHub.
- Rebuilding the existing `/vs/diy-rat-birth-control` page.
