## Chunk: Service Areas (/areas/*)

The dynamic `/areas/$areaSlug` template already exists and renders cleanly. The live cloakd-removals.cloud site has no `/areas/*` pages, so this chunk is original content that **expands** the live footprint to reflect three real service regions: NYC, NJ, and the Bay Area.

### 1. Fix region tags in `src/data/serviceAreas.ts`

Currently SF / Oakland / San Jose are tagged `region: "NYC"` — clearly a typo. Widen the union and correct the tags.

```ts
region: "NYC" | "NJ" | "Bay Area";
```

- `manhattan-ny` → NYC
- `san-francisco-ca`, `oakland-ca`, `san-jose-ca` → Bay Area

### 2. Expand SERVICE_AREAS

Add the missing cities. Each entry follows the existing shape (`intro`, `localProof`, `neighborhoods`, `faqs`, `nearbyAreas`). Re-use the standard 4-FAQ block with light city-specific edits.

NYC region (add):
- `brooklyn-ny` — Brooklyn, NY (Williamsburg, Bushwick, DUMBO, Park Slope, Crown Heights, Bed-Stuy, Sunset Park, Bay Ridge)
- `queens-ny` — Queens, NY (LIC, Astoria, Jackson Heights, Flushing, Forest Hills, Ridgewood)
- `bronx-ny` — Bronx, NY (Mott Haven, Fordham, Riverdale, Hunts Point)
- `staten-island-ny` — Staten Island, NY (St. George, Stapleton, Tottenville)

NJ region (add):
- `jersey-city-nj` — Downtown, Journal Square, Heights, Greenville
- `hoboken-nj`
- `newark-nj` — Ironbound, Downtown, University Heights
- `bayonne-nj`

Bay Area is already covered (SF / Oakland / San Jose).

Also fix the existing `manhattan-ny.nearbyAreas` entries — they currently all point to `slug: "manhattan-ny"` (broken). Wire them to the new Brooklyn / Queens / Jersey City slugs.

### 3. New `/areas` index route

`src/routes/areas.index.tsx` — coverage hub.

Layout:
- `SolutionHero`-style header: "Where Cloakd runs the program" + intro + LeadForm (compact)
- Three region columns: **NYC**, **New Jersey**, **Bay Area** — each lists its cities as `<Link to="/areas/$areaSlug">` cards
- `FieldDataTrio` (79% / 88% / 90%)
- `ClosingCta` ("Don't see your city? We're expanding — tell us where.")

`head()` with a coverage-focused title + description.

### 4. Nav + cross-linking

- `SiteHeader.tsx` — add an "Areas" dropdown listing the three regions and an "All service areas" link to `/areas`. Keep mobile drawer in sync.
- `SiteFooter.tsx` — add an "Areas" column with the region groups.
- `index.tsx` (home) — if there's a "Service Areas" or footer-adjacent strip, add the new cities; otherwise leave alone.

### 5. Out of scope (handled in later chunks)

- `/get-started` rewrite to match live (will need its own chunk — currently diverges in steps + form).
- `/home-audit` residential funnel — separate chunk.

### Technical notes

- All work in `src/data/serviceAreas.ts`, `src/routes/areas.index.tsx`, `src/components/site/SiteHeader.tsx`, `src/components/site/SiteFooter.tsx`. No new shared primitives — reuse `SolutionHero`, `FieldDataTrio`, `ClosingCta` from `SolutionPrimitives`.
- The dynamic route file `areas.$areaSlug.tsx` needs no changes; it already loads from `getServiceArea()` and renders region/city correctly once data is fixed.
- No new images required — `/areas` index is text + cards.
- `routeTree.gen.ts` regenerates automatically when `areas.index.tsx` is added.
