## Chunk: Program / Education pages

Build three new dedicated routes with reference-site (nealrfg) layout patterns and verbatim copy from cloakd-removals.cloud. Same approach as previous chunks.

### Routes to create

1. `src/routes/how-it-works.tsx` — `/how-it-works`
2. `src/routes/does-rat-birth-control-work.tsx` — `/does-rat-birth-control-work`
3. `src/routes/what-to-expect.tsx` — `/what-to-expect`

### Page structures (verbatim copy from live site)

**how-it-works**
- Hero: "You keep paying for treatment. The rats keep coming back." + lead intro + LeadForm
- Section 1 "Why the cycle doesn't stop": narrative + 5-step `TimelineStrip` (Treatment week → Week 2 → Week 3–4 → Week 5–6 → Week 7–8 → Next treatment)
- Section 2 "Fertility management mechanism": 3-card grid (In males / In females / Over 90 days) + "Why it's safe for food environments" callout band
- Section 3 "The 90-day program": `PhaseCards` (Phase 1 / Phase 2 / Monitoring) — already have primitive
- Section 4 "What the program is and isn't": two-column "handles / doesn't replace" comparison
- ClosingCta band

**does-rat-birth-control-work**
- Hero: "Does rat birth control work? NYC tried it in Bryant Park. It failed." + intro + LeadForm
- Section "Why Bryant Park failed": narrative + 4-card grid (No Phase 1 knockdown / Open outdoor / Competing attractants / No monitoring)
- Section "What the field data shows": `FieldDataTrio` (reuse — 79% / 88% / 50%+) with Location A/B labels + source citation + June 2025 follow-up note
- Section "What makes deployment succeed": numbered 4-up grid (1–4) with the four factors
- Section "ContraPest vs. Evolve": two-column comparison cards
- ClosingCta

**what-to-expect**
- Hero: "You've been pitched before…" + intro + LeadForm
- "Program timeline" `TimelineStrip` (Week 1 / Weeks 1–3 / Week 3–4 / Monthly months 2–3) — each step expanded with You/Us split
- "What you receive": 3-card grid (Baseline report / Month 2 report / 90-day summary)
- "What we need from you": numbered 3-up (Existing PCO / Access / Compliance history)
- "Pricing" callout band + 3 FAQ-style Q&A blocks (covered? / after 90 days / multi-unit)
- ClosingCta

### Shared work

- Reuse existing `SolutionPrimitives` (`SolutionHero`, `TimelineStrip`, `PhaseCards`, `FieldDataTrio`, `ClosingCta`). Generalize imports if needed; no new tokens.
- Add small inline helpers per page for the unique blocks (you/us split, comparison columns, Q&A) — kept local to each route, not a new shared file unless reused twice.
- `head()` on each route with route-specific title, description, og:title, og:description, og:image (hero).

### Assets

- `src/assets/program-how-it-works.jpg` — empty NYC alley, fading rat trails motif (neutral, photographic)
- `src/assets/program-bryant-park.jpg` — empty urban park bench at dusk (Bryant-Park-evocative, no logos)
- `src/assets/program-what-to-expect.jpg` — clean utility/basement corridor with bait station perimeter

All 1536×1024, generated via imagegen `fast`.

### Nav / cross-linking

- Add the three routes into `SiteHeader` (likely under a "Program" group) and `SiteFooter`. Will check current nav structure and keep grouping consistent with what's already there (no nav redesign).

### Out of scope (next chunks)

- `/vs/*` comparison pages
- `/dohmh-rodent-violation-nyc`, `/nj-rodent-violation`
- areas / home audit / get-started edits
