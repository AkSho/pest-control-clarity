# Inline image audit — recommendations only

Every key page already has a hero photo. The gap is **inline imagery** that breaks up long text columns, anchors comparison tables, and gives operators something concrete to look at mid-scroll. Below are the pages that would meaningfully benefit, grouped by priority. The home page is excluded per your note. Pages already image-rich (`/results`, `/why-it-keeps-coming-back`) and short utility pages (`/get-started`, `/faq`, `/areas`) are skipped.

For each recommendation: **section anchor → image concept → role**. Style cue throughout: match the existing `hero-bait-station.jpg` / `program-bryant-park.jpg` look — natural light, real urban/operational settings, no stock-photo gloss.

---

## Tier 1 — Highest ROI (long, text-heavy SEO pages)

### `/evolve-rodent-birth-control` (381 lines, all text after hero)
1. **"A cottonseed-derived bait that suppresses rat fertility"** → close-up of Evolve soft-bait block in a bait station, lid open. Anchors the product claim.
2. **"Same product. Different structure. Different results."** (ContraPest vs Evolve split) → side-by-side: ContraPest liquid reservoir vs Evolve soft-bait block. Visual diff for the comparison.
3. **"Municipal and independent urban deployments, 2025–2026."** → wide street-level photo of an NYC mitigation zone or a tagged station on a sidewalk. Grounds the field-data section.

### `/contrapest` (330 lines)
1. **"Designated mitigation zones, run by the city"** → NYC street sign / mitigation-zone signage or a city-installed liquid station. Establishes the municipal context.
2. **"Different formulations from the same maker"** → same liquid-vs-soft-bait diptych as above (reusable asset).
3. **"Cloakd deploys Evolve, not ContraPest liquid"** → operator-hands shot placing an Evolve block in a building's bait station. Sells the managed-program framing.

### `/contrapest-vs-evolve` (350 lines)
1. **"The differences that matter for deployment"** → annotated comparison still: liquid reservoir vs soft-bait block, both in their typical housings.
2. **"Liquid bait competes with everything liquid in a city"** → photo of street puddles / open dumpster water / AC condensate near a station. Visualizes the competition problem.
3. **"Field results, sourced"** → urban rooftop or alley station photo with a building backdrop. Same role as the Evolve field-data anchor.

### `/does-rat-birth-control-work` (324 lines)
1. **"The deployment structure was wrong before the bait went in"** → photo of a poorly placed / overgrown / inaccessible station as a "what failure looks like" visual.
2. **"Two independent urban building deployments. Five months."** → exterior of a multifamily building with a discreet station at the foundation line. Anchors the case-study section.
3. **"Four things that separate the programs that work"** → operator clipboard / tablet next to a station during a service visit. Shows the "managed" part.

### `/how-it-works` (297 lines)
1. **"Two phases. Your existing vendor stays."** → split image: traditional snap-trap/bait setup on one side, Evolve station on the other, both inside the same property. Visualizes the layering claim.
2. **"It's a second layer. It runs on top of what you already have."** → same operator-clipboard-at-station shot, or a service-route photo. Reinforces "managed."

---

## Tier 2 — Comparison `/vs/*` pages (currently table-heavy, zero inline imagery)

These pages are dense tables and bullets. One mid-page image each is enough to break the wall.

- **`/vs/rat-poison`** → at "Killing the colony makes the territory available": photo of a freshly cleared alley/back-of-house area (the "vacuum" concept).
- **`/vs/traditional-pest-control`** → at "Your exterminator stays. We add what their treatment can't do": same vendor-coexistence diptych proposed for `/how-it-works` (reusable).
- **`/vs/snap-traps`** → at "Trapping removes individuals": photo of a snap trap next to an Evolve station in the same utility room. One-shot version of the tradeoff.
- **`/vs/orkin`**, **`/vs/assured-environments`**, **`/vs/bell-environmental`**, **`/vs/viking-pest-control`**, **`/vs/western-pest-services`** → one shared "additive layer" image at the "Add Cloakd if / Keep your vendor" section. A single reusable photo (operator placing an Evolve block in an existing third-party station) covers all five competitor pages — do not generate per-competitor variants.

### `/vs/diy-rat-birth-control` (already has structure)
- One image at the "managed program" comparison block: scheduled-service visual (operator + station + clipboard). Same asset as the `/how-it-works` Phase-2 recommendation.

---

## Tier 3 — Worth one image, low urgency

- **`/rodent-fertility-control`** (195 lines): one image at "Same product. Different structure. Different outcome." — reuse the liquid-vs-soft-bait diptych.
- **`/what-to-expect`** (276 lines): at "The program runs in four stages over 90 days" — a small photo of a monitoring report / printed trend chart on a clipboard. Sells the "documented trend line" deliverable.
- **`/dohmh-rodent-violation-nyc`** and **`/nj-rodent-violation`** (~330 lines each): one mid-page image of the actual violation notice / inspector-at-property scene. Compliance pages benefit from a "this is what the document looks like" visual. (Existing `compliance-*.jpg` assets may already cover this — confirm before generating.)

---

## Skip / no inline image needed

- `/` (home) — per your note.
- `/results`, `/why-it-keeps-coming-back` — already use multiple inline images.
- `/faq`, `/get-started`, `/areas`, `/areas/$areaSlug`, `/resources` — utility/index pages, text-light or list-driven.
- `/solutions/*` — each already has a dedicated hero asset and the body is short enough that adding inline imagery would feel padded.

---

## Reusable assets to plan for

Several recommendations collapse into a small shared asset library. If you generate these once, they cover most of the audit:

1. **Evolve soft-bait close-up** (in-station, lid open) — used on `/evolve-rodent-birth-control`, possibly `/contrapest`.
2. **Liquid-vs-soft-bait diptych** — `/evolve-rodent-birth-control`, `/contrapest`, `/contrapest-vs-evolve`, `/rodent-fertility-control`.
3. **Operator-at-station service shot** (clipboard/tablet) — `/does-rat-birth-control-work`, `/how-it-works`, `/contrapest`, `/vs/diy-rat-birth-control`, `/what-to-expect`.
4. **Vendor-coexistence diptych** (snap trap + Evolve station in same space) — `/how-it-works`, `/vs/traditional-pest-control`, `/vs/snap-traps`.
5. **"Additive layer" shot** (Evolve block being placed into an existing third-party station) — all 5 competitor `/vs/*` pages.
6. **NYC mitigation-zone street scene** — `/contrapest`, `/evolve-rodent-birth-control` field-data section.
7. **Monitoring report on clipboard** — `/what-to-expect`, optionally `/does-rat-birth-control-work`.

Seven distinct images cover ~20 placement opportunities across 14 pages.

---

Reply with which tiers (or specific pages) you want to move forward on, and I'll wait on your generated images before writing the placement implementation plan.