
# Chunk G — Clarity, Honesty & Coverage

Goal: kill remaining overlaps, rewrite every panel to 8th-grade English, be honest about what's mocked vs. real, and replace mystery "?" pins with sourced data (live counts, inspection-based counts, or AHS household estimates).

---

## Audit findings (what's actually on the map today)

- **6 truly live**: Brooklyn, Manhattan, Bronx, Queens, Staten Island, San Francisco — backed by the CSV.
- **3 seeded but labeled "high confidence"**: Chicago, Boston, DC are hardcoded in `rodentRadarAtlas.ts` with hand-entered numbers. **That's the "mocked data" you sensed.**
- **7 "?" gap pins**: Jersey City, Newark, Oakland, San Jose, Philadelphia, Seattle, Toronto — honest gaps with no clean rodent-typed 311 feed.
- **Jargon source**: `getColonyGrowthProjection()` produces lines like "established colony pattern trajectory" by gluing band labels together.

---

## 1. Overlap & chrome cleanup

File: `src/routes/rodent-radar_.rat-pressure-map.tsx` (+ small `Z` constant pass).

- **Rail header bleed** → wrap title/BETA/meta in a `<header>` with bottom border and `pr-12`; clamp scroll area below it so the header never scrolls under TopTools.
- **Bottom tabs clipped** → move `Layers / Sources / Guide` into a `sticky bottom-0` footer inside the rail (solid bg + top border).
- **"Click a marker for details" hint** → relocate to top-center of the map, auto-hide after first selection, `pointer-events-none`.
- **Z-index ladder**: `mapControls: 20, rail: 30, topTools: 35, fieldChip: 40, drawer: 50, popover: 60`.

## 2. Plain-English rewrite (8th grade, direct & factual)

Files: `src/lib/rodentRadarAtlas.ts` (copy maps), `rat-pressure-map.tsx` (selection panel + lede).

| Where | Before | After |
|---|---|---|
| Colony band | "established colony pattern" | "Lots of rats living here" |
| Selection lede | "Manhattan is showing a established colony pattern trajectory." | "Manhattan has heavy rat activity. Reports are down 12% from last year." |
| Trend | "Recent activity is accelerating vs other tracked areas" | "Activity is rising faster than other cities we track." |
| Confidence | "high" | "High — based on official city data." |

Add a `metricExplainers` map. Every number in the selection panel gets a one-line "What this means" caption (e.g. `87,537` → "Public rat reports filed with NYC in the last year.").

## 3. Honesty pass: provenance & gap-pin restyle

`src/lib/rodentRadarAtlas.ts`, `rat-pressure-map.tsx`.

- Add `provenance: "live" | "seeded" | "inspections-commercial" | "inspections-housing" | "ahs-estimate" | "unavailable"` to `RatPressureResult` / pin model.
- Dot styling per provenance:
  - **live** → solid filled.
  - **seeded** → dashed halo + "Sample — verifying source" badge.
  - **inspections-*** → solid with small wrench glyph + caveat in drawer.
  - **ahs-estimate** → hollow ring + "Survey estimate" label.
- Replace mystery "?" with outlined dot + "Survey estimate" or "No data yet" hover label depending on provenance.
- Rail header count: replace "9 verified areas" with honest split — e.g. "6 live · 3 sample · 3 inspections · 4 estimates" — driven by the data.

## 4. Mini visual polish (OGW alignment)

- Rail titles `text-sm uppercase tracking-wider`; body `text-sm leading-relaxed`.
- Right-align numeric values in legend rows (OGW-style `7,231 | 157.8GW`).
- Thin section separators (`border-t border-white/5`), no full dividers.

## 5. Data sources — tiered gap fill

No more mystery pins. Every dot is live, inspection-based, or a sourced survey estimate.

### 5a. Live Chicago (real fetch)
- `scripts/fetch-rodent-snapshots.ts` (new) — generalized SODA-API puller. Hits `data.cityofchicago.org/resource/v6vf-nfxy.json?$where=sr_type='Rodent Baiting/Rat Complaint' …`. Computes 12mo / prev-12mo / 90d. Writes to `rat-pressure-snapshots.csv`. Run once this chunk; commit the refreshed CSV. Chicago flips to `provenance: "live"`.

### 5b. Promote 3 gap pins to live via inspection feeds
- **Philadelphia** → OpenDataPhilly L&I `violations` filtered for `RODENT`/`INFESTATION`/`VERMIN` + Phila food inspections. `provenance: "inspections-housing"`.
- **Seattle** → Public Health Seattle & King County restaurant inspections, violation code "rodents, insects, animals present". `provenance: "inspections-commercial"`.
- **Toronto** → DineSafe infraction "Operator failed to ensure premises is free of pests". `provenance: "inspections-commercial"`.
- Each gets a caveat in the drawer ("Source: restaurant inspections, not residential complaints").
- Seeded into the CSV by the same script (or static JSON adapter if SODA shape differs).

### 5c. Convert 4 remaining gaps to AHS estimates
- **Jersey City, Newark, Oakland, San Jose** → American Housing Survey "Selected Conditions — evidence of rodents in last 12 months" metro-level percentages. AHS is the only federally-published direct rodent-prevalence measure.
- Seed `public/rodent-radar/data/ahs-rodent-estimates.json` with the 4 metros (manually pulled from AHS 2023 tables, source URL recorded per row).
- Render as hollow estimate pins: "~9% of households reported rodents in past year — American Housing Survey, NY/NJ metro 2023." Single number, no trend, no rank.

### 5d. Honest fallback for Chicago/Boston/DC seeded numbers
- If 5a script generalizes to Boston (`data.boston.gov` 311 with rodent types) and DC (`311.dc.gov` ServiceCode `S0301`) cleanly within this chunk, wire them live too. Otherwise keep `provenance: "seeded"` with the dashed-halo badge until next pass — never claim "high confidence" again.

### 5e. Global context layers (toggleable, applied to ALL pins)
- **AHS overlay** — every dot can show "and X% of households here reported rodents" as a secondary number. This is the "weave correlated data" answer.
- **CDC NNDSS** — state-level leptospirosis/hantavirus tint. Static `public/rodent-radar/data/cdc-zoonotic.json` + regeneration script. Wired to "Why it matters" framing.
- **NOAA winter temp anomaly** — county-level annual anomaly seeded JSON. Powers the "Seasonal swing" preset honestly (currently shows trends with no climate input).

### Out of scope
- LA MyLA311 rodent feed — defer to next chunk (real but needs its own adapter).
- USDA / EPA — reference links in `Sources` tab only.

---

## Files touched

- `src/routes/rodent-radar_.rat-pressure-map.tsx` — overlap fix, copy rewrite, provenance badges, lede, hint relocation.
- `src/lib/rodentRadarAtlas.ts` — copy maps, `provenance` field, `metricExplainers`, new context layers, AHS pin type.
- `public/rodent-radar/data/rat-pressure-snapshots.csv` — refreshed with live Chicago (+ Boston/DC if script generalizes).
- `public/rodent-radar/data/ahs-rodent-estimates.json` (new) — 4 AHS metros.
- `public/rodent-radar/data/cdc-zoonotic.json` (new), `public/rodent-radar/data/noaa-temp-anomaly.json` (new).
- `scripts/fetch-rodent-snapshots.ts` (new) — generalized 311 puller.

## What ships at the end

A map with **zero mystery pins**. Every dot is one of: live city count, inspection-based count (clearly captioned), or AHS household-survey estimate (clearly captioned). Every number has a plain-English explanation. No chrome overlaps. "Seasonal swing" and "Data gaps" presets are backed by real CDC and NOAA layers. Header count is honest about the data mix.

After Chunk G: stop and ship.
