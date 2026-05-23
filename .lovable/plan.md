# Rodent Radar map — clarity audit & fix plan

## What OpenGridWorks does right (reference audit)

Looked at opengridworks.com/. Why it reads instantly:

1. **Persistent labeled rail** — title ("Power Plants"), BETA chip, what's shown ("Operating plants"), then explicit **legends that ARE the filters**:
   - Technology → colored dot per category (Solar, Wind, Nuclear…)
   - Size (MW) → concentric circles labeled 5GW / 2.5GW / 1GW / 500MW / 100MW
   - Transmission → line-weight legend by kV band
   - Zoom & bubble-size readout always visible
2. **Every number has a unit.** "MW", "kV", "BETA". Nothing is a raw integer.
3. **One noun per panel.** The rail is "what these dots mean", not mixed modes/presets/places.
4. **Top tools = verbs** (search, save, history, replay, presets, layers, basemap, share). The left rail = nouns.
5. **Mode switches are never destructive.** Spotlight, NASA basemap, layers — all toggle from a control that stays visible.

## What Rodent Radar does wrong today (against OGW + your feedback)

| # | Issue | Evidence |
|---|---|---|
| 1 | No legend explains the dots. Severity bands (Severe/High/Moderate/Low), confidence opacity, and place-type sizing are baked into MapLibre paint expressions with nothing visible on screen. | rat-pressure-map.tsx lines 715–824 |
| 2 | Selection panel is six unlabeled stats. "87,537", "29,330", "-2%", "Severe", "high" have no units, no comparison frame, no source. | lines 991–1032 |
| 3 | Vocabulary collision. "Layers", "datasets", "places", "modes", "presets" are four overlapping ideas with no glossary. A first-timer can't tell which control changes what. | LayerPanel, PresetBar, DisplayModePicker, TopTools all visible at once |
| 4 | Field mode is a trap. Hides rail + TopTools with no chip to return. | line 431, FieldBottomSheet |
| 5 | Overlapping chrome. PresetBar (top), TopTools (top-right), DisplayModePicker (right rail), SharePopover, FieldBottomSheet, LayerPanel all compete in the same upper band, especially at 889px viewport. | rail at line 468 + TopTools 535 + PresetBar 527 |
| 6 | No "what is this map" lede. OGW's title + BETA chip + "Operating plants" answers it in 3 words. Ours just shows controls. |  |

## Plan

### Chunk F1 — Selection panel rewrite (item 2, your top complaint)

Replace the 6-metric grid with a **labeled, contextualized card**:

```text
┌────────────────────────────────────────────┐
│ NYC BOROUGH                          [×]   │
│ Brooklyn                                   │
│ ──────────────────────────────────────     │
│ Pressure band                              │
│ ● Severe — top 10% of tracked US areas     │
│                                            │
│ Estimated active rats                      │
│ 87,537   high confidence                   │
│ Colony growth trend: stable (−2% vs 90d)   │
│                                            │
│ DOHMH inspections, last 12 months          │
│ 29,330   ↑ above NYC median                │
│ Recent 90 d: 7,180                         │
│                                            │
│ Snapshot dated 2026-05-21 · NYC DOHMH      │
│ [View Brooklyn page →]  [Source ↗]         │
└────────────────────────────────────────────┘
```

Every number gets: a **label**, a **unit/source**, and a **comparison** ("top 10%", "above median", "vs 90d"). Pull comparisons from `pressureMetricSnapshots` / `getRatPressureResults` — already computed, just unused in UI.

Add a small `MetricRow` component (`label` / `value` / `unit` / `context`) and delete the bare `Metric` grid.

### Chunk F2 — Legend rail (item 1 + 3, the "what am I looking at" fix)

Convert the right-side rail into an OGW-style **labeled legend** that doubles as filters. New top-to-bottom order:

1. **Title block** — "Rat Pressure Map" + BETA chip + 1-line subtitle: "Verified rodent activity across U.S. cities · updated monthly".
2. **Pressure bands** — 4 swatches (Severe / High / Moderate / Low) with the count threshold per band. Click = filter map.
3. **Place type** — 3 sized dots (Borough / City / Neighborhood) showing the size encoding.
4. **Confidence** — opacity ramp legend ("Lower opacity = lower data confidence").
5. **Context overlays** (the existing `contextLayers`) — kept as toggles but moved under a "Show on map" header, so they read as overlays, not the primary content.
6. **Display mode** — moved to the bottom as a small segmented control with tooltips: Standard ("default"), High-contrast ("daylight outdoors"), Lines-off ("hide grids"), Field ("phone in hand").

This collapses the LayerPanel + DisplayModePicker into one cohesive rail and gives every glyph on the map a textual explanation.

### Chunk F3 — Field mode escape hatch (item 4)

Add a **persistent floating "Exit field mode" chip** top-left when `mode === "field"`. Renders outside the rail so it survives mobile bottom-sheet layout. One click → `updateSearch({ mode: "standard" })`. While in Field mode, also keep the search icon from TopTools visible as a single round button (no other top tools).

### Chunk F4 — Overlap cleanup (item 5)

- Move **PresetBar** from the top edge into a collapsible "Preset views" section at the top of the rail (matches OGW's "Show preset views" disclosure).
- TopTools shrinks to: Search, Share, History/Reset. Layers + display mode are now in the rail, removing the duplicate.
- Add a `z-index` ladder constants block at the top of the file so popovers/sheets/chips don't fight (rail=20, topTools=30, fieldChip=40, popover=50).
- On viewports `< 1024px`, rail collapses to an icon strip with a "Legend" reopen tab (mirrors `tanstack-route-architecture`'s mini-collapse pattern from shadcn sidebar guidance).

### Chunk F5 — "What is this map" lede (item 6)

Top of rail gets a one-line **explainer** that changes with the active preset/mode so users always know which lens they're looking through:

- Default: "Where rat pressure is worst right now."
- Seasonal preset: "How rat activity shifts across seasons."
- Gaps preset: "Where we don't have verified data yet."
- Your-block preset: "Conditions near a ZIP you enter."

This is the "all three jobs with a clear mode switch" you picked.

## Files touched

- `src/routes/rodent-radar_.rat-pressure-map.tsx` — selection panel, rail composition, Field exit chip, z-index ladder, lede line. Most of the change is here.
- `src/lib/rodentRadarAtlas.ts` — small helper: `getPressureBandThresholds()` and `comparePlaceToCohort(place)` returning `{ percentile, vsMedian, trendLabel }`. Pure computation over existing data, no schema change.
- `src/lib/rodentRadarSearch.ts` — no change (mode + preset already retained).

## Out of scope

- No new data sources, no new cities, no map tile changes.
- No copy changes outside the map page.
- Mobile bottom-sheet visual polish stays as-is beyond the Field exit chip.

## After this chunk

The map answers, in 5 seconds, "what am I looking at" via the rail; every clicked area answers "what do these numbers mean" via labeled context; and Field mode can always be exited. Then we ship.
