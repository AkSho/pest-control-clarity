## Chunk: Compliance pages (NYC + NJ violations)

Note: there are no `/vs/*` pages on the live cloakd-removals.cloud site (404). Scoping this chunk to the two compliance pages, which are the high-intent search/landing pages for restaurant + property operators who got cited.

### Routes to create

1. `src/routes/dohmh-rodent-violation-nyc.tsx` — `/dohmh-rodent-violation-nyc`
2. `src/routes/nj-rodent-violation.tsx` — `/nj-rodent-violation`

### Page structures (verbatim copy from live site)

**dohmh-rodent-violation-nyc**
- `SolutionHero`: "You got a DOHMH rodent violation. Here's what it means for your NYC restaurant — and what actually closes it." + intro + LeadForm
- "Codes 04K and 04L": 2-card grid (04K rats / 04L mice) + `StatCard` trio (5+ pts, 14 pts = B, fine range) + narrative paragraph on fine amounts
- "How inspections are triggered": narrative band
- "Inspectors don't need to see a live rat": 6-card grid (live rats / dead rats / fresh droppings / gnaw marks / burrows / grease marks)
- "Closing the violation is different from closing the vulnerability": two-column "standard treatment / 90-day program adds" comparison (reuse the PhaseCards split-column pattern)
- `FieldDataTrio` (79% / 88% / 90%) + SenesTech source link
- `ClosingCta`: "Start before the next unannounced visit."

**nj-rodent-violation**
- `SolutionHero`: "An NJ rodent violation has no letter grade in the window. The exposure is still real." + intro + LeadForm
- "Local health departments. State sanitary code.": narrative + 4-card grid (Inspection trigger / Violation classification / Reinspection requirement / Public record)
- "Closure authority without the grade system warning": narrative band (NJ restaurants)
- "Tenant complaints route to local health": narrative band (NJ property managers)
- "NJ vs NYC enforcement": two-column comparison cards (NYC bullets / NJ bullets) — reuse PhaseCards primitive
- "Same two-phase structure": `PhaseCards` (Phase 1 your existing NJ exterminator / Phase 2 Cloakd fertility management)
- `FieldDataTrio` (79% / 88% / 90%) + SenesTech source link
- `ClosingCta`: "NJ operators: tell us about your property."

### Shared work

- Reuse `SolutionPrimitives` (`SolutionHero`, `StatCard`, `PhaseCards`, `FieldDataTrio`, `ClosingCta`). No new shared primitives.
- Small inline components per page for unique blocks (the 6-up "active rat signs" grid on NYC, the 4-up enforcement-detail cards on NJ).
- `head()` on each route with route-specific title, description, og:title, og:description, og:image (hero).

### Assets

- `src/assets/compliance-dohmh-nyc.jpg` — NYC restaurant kitchen pass / inspector clipboard motif (neutral, photographic)
- `src/assets/compliance-nj-violation.jpg` — NJ municipal storefront / public-records evocative scene (no logos)

Both 1536×1024, generated via imagegen `fast`.

### Nav / cross-linking

- Add both routes to `SiteHeader` — likely under a new "Compliance" group (or extend the existing "Program" dropdown). Keep mobile drawer in sync.
- Add both routes to `SiteFooter` link list.
- Cross-link from the restaurants and property-managers solution pages where compliance language already references 04K/04L and NJ exposure.

### Out of scope (no live source pages exist)

- `/vs/*` comparison pages — confirmed 404 on live site. Skip this chunk.
- `/areas/*`, `/home-audit`, `/get-started` edits — separate chunk.
