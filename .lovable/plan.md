## Chunk: Areas pages — contrast fix + Neal-style optimizations

### 1. Heading contrast fix (the real bug)

The `<h1>` on `/areas/$areaSlug` highlights `{city}, {state}` with `text-brand` on the dark `ink-section` hero. `text-brand` is the same teal-ish hue as the dark background tint and reads as low-contrast — same problem we already solved on the home page hero by switching the highlight span to `text-accent-warm` (warm yellow). The base `<h1>` text also lacks an explicit light color and is relying on inheritance.

Fix in `src/routes/areas.$areaSlug.tsx`:
- `<h1 className="... text-white">` (match home + solution heroes)
- `<span className="text-accent-warm">{city}, {state}</span>` (replace `text-brand`)
- Hero `<p>` keep `text-ink-muted` (already correct)

The `/areas` index hero already uses `text-white` + `text-accent-warm` correctly — leave it alone.

### 2. Reference review: nealrfg.com/locations/{city}-fl

Neal Roofing's location-page pattern (their SEO is well-tuned for local landing pages):

```
1. Hero (form + city-name H1 + trust badges)
2. Services grid for that city — 4 cards, each linking to /{city}/{service}
3. Trust strip (4.9★, warranty)
4. "Why choose us in {city}" — 3 local-reason cards w/ check icons
5. "The Neal Advantage" — 3 more reasons w/ supporting image
6. FAQ accordion
7. Contact form
8. "Service Area" map / blurb at bottom
9. External link to authoritative city site (e.g. myboca.us) for SEO trust
```

Our current page already has: hero, local proof, 4-step process, neighborhoods grid, FAQ, nearby areas, CTA. The two clear gaps vs Neal are **(a) a per-city Solutions cards strip** and **(b) a "Why {city} operators choose Cloakd" three-reason block** with explicit local hooks.

### 3. Add a per-city Solutions strip

Insert after Local Proof, before Process. Renders 3–4 `SOLUTIONS` cards cross-linked to `/solutions/$slug`, framed as "We run the program for these operators in {city}." Reuses the existing `SOLUTIONS` data and styling pattern from `OtherSolutions`. No new components.

### 4. Add a "Why {city} operators choose Cloakd" three-reason block

Insert between Process and Neighborhoods. Three local-flavored reasons mirroring Neal's pattern:
- **Local pressure data** — we measure your block, not a national average
- **Layered onto your existing vendor** — no contract switch in {city}
- **Documented for {jurisdiction}** — DOHMH (NYC) / local NJ health / local CA health

Pulls jurisdiction string from the existing FAQ helper logic — extend `ServiceArea` with an optional `jurisdiction: string` field (defaulting to "your local health inspector") so the card text is correct per region. Backfill all 13 cities.

### 5. Optional: external authoritative city link

Neal links to the official city government / chamber site in their "Customer-Centric Approach" copy. We can mirror this lightly by adding an optional `cityOfficialUrl` to `ServiceArea` and rendering "Serving the city of {city}" with that link in the local-proof section. **Skipping this** unless you ask for it — it requires sourcing 13 correct URLs and adds little to conversion.

### 6. Out of scope

- Per-city service deep pages (`/areas/{city}/restaurants`, etc.) — Neal has these but for our smaller area set, the per-city Solutions strip linking to the existing `/solutions/$slug` pages covers the same SEO ground without route explosion.
- Service-area map at bottom — would need a static map asset per city; defer.
- The `/areas` index page is fine as-is.

### Files touched

- `src/routes/areas.$areaSlug.tsx` — contrast fix + 2 new sections
- `src/data/serviceAreas.ts` — add optional `jurisdiction` field + backfill
- No new components; reuse `SOLUTIONS` cards inline.
