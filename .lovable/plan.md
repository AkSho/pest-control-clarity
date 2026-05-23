Five chunks, sequenced so each one ships a visibly better map and unblocks the next.

## Chunk A — Strip the chrome, set the tagline (UI surgery)

Goal: stop the chrome from being louder than the data. Match OGW's quiet rail.

- Replace the left-rail header block with one line: `Rodent Radar` (16px, regular weight) + a small inline `beta` chip. Tagline beside it or below in muted text: **"Public rodent data, for people who live with the consequences."**
- Delete the three stat cards (`6 verified / 213.3K records / 4 gaps`) from the map shell. Move the same numbers to the (new) About page footer.
- Collapse the search bar into the top utility bar (alongside the existing icon row), not the rail.
- Reduce each layer row to: 8px color dot + label, single line. Move the description to a tooltip on hover. Remove per-row icon tiles.
- Make the selected-area drawer **closed by default** and dock it left-bottom as a slim card; open the full drawer on marker click. The map keeps its right side.
- Replace the two flat "Layers / Sources" bottom-left buttons with three small **map-thumbnail tiles** (Layers / Display / Sources), each previewing what that mode looks like via a static PNG snapshot generated at build time.
- Add a live counter in the top-right chrome: `~{N} people checking their block`, computed from a deterministic time-based fake until real telemetry exists. OGW-style microcopy.
- Kill the giant "LOADING ATLAS" pulse. Use a low-key shimmer on the rail while the basemap streams; markers fade in.
- Rewrite the About route as a single paragraph + a link to Sources. Move methodology, terms, attribution to deep-linked footnote pages — no longer surfaced on the map.

## Chunk B — Globe basemap + vector marker grammar (the visual rebuild)

Goal: close 70% of the OGW gap. The map starts feeling like an atlas.

- Switch MapLibre to `projection: { type: "globe" }` with a starfield/dark space background and a subtle night-side terminator. Continent/country labels in low-contrast sans, ocean as a flat dark gradient. Use a Protomaps PMTiles basemap so we own the style (no Mapbox/Maptiler token); host the `.pmtiles` file in `public/rodent-radar/basemap/`.
- Add a small constellation of decorative "satellite" labels at globe edges (NOAA-style) for personality — pure visual, no data.
- Migrate rodent-activity from HTML markers to a MapLibre `circle` source-layer driven by GeoJSON. Encode the visual grammar as expressions:
  - **shape**: circle = official 311/inspection, ring = modeled colony growth, diamond = context dataset, `?` html marker = data gap (kept as DOM for legibility).
  - **color**: 5-stop ramp on `activityIndex` using new tokens `--activity-low/--activity-moderate/--activity-elevated/--activity-high/--activity-critical` added to `src/styles.css` (oklch).
  - **size**: `interpolate(["linear"], ["zoom"], 3, 3, 10, ["interpolate", ["linear"], ["get", "activityIndex"], 0, 4, 100, 18])` — tiny at zoom 3, scaled at zoom 10. Fixes the "beach balls in NYC" problem.
  - **opacity**: driven by `confidence` (`high`=0.95, `medium`=0.7, `low`=0.45).
- Replace the per-marker legend with one **concentric-circle legend** (size = volume) + one **horizontal color ramp** (activity band) + four **shape swatches**. Three rules, total.
- Add a mini-globe overview in the bottom-right corner (OGW pattern).

## Chunk C — Data breadth: Tier A cities + Tier C overlays

Goal: density makes the map credible. No more 5 dots in NYC.

- Add an ingest script per city under `scripts/rodent-radar-ingest/<city>.ts`. Each script pulls the city's public 311/inspection API, filters by the city's rodent-coded service types, aggregates monthly by neighborhood/ZIP, and writes verified entries into `public/rodent-radar/data/rat-pressure-snapshots.json` + `.csv`. Schema unchanged.
- Cities to add (Tier A, 6 new): Chicago, Boston, Washington DC, Philadelphia, Seattle, Toronto. Each becomes one or more `AtlasPlace` entries depending on neighborhood granularity available from that city's data.
- For every ingest, write a `reviewNote` if the taxonomy is ambiguous — no fake data, demote to `partial` or `needs-review`.
- Add four context overlays as separate GeoJSON sources, rendered as low-saturation choropleth or glyph layers labeled "context" in the legend:
  1. **NYC DOHMH restaurant rodent violations** (point glyphs, NYC only initially)
  2. **NYC DSNY missed-collection 311** (light choropleth by community board)
  3. **Chicago food inspection rodent violations** (point glyphs, Chicago)
  4. **HUD vacancy rate** (national choropleth by tract, very low opacity)
- Each overlay gets its own `ContextLayer` entry in `rodentRadarAtlas.ts` and a `sourceId` pointing to a new entry in `rodent-radar-sources.json`.
- Delete the existing decorative `ConditionsOverlay` and `SeasonalityOverlay` striped-box placeholders.

## Chunk D — Per-place citation pages

Goal: give journalists a canonical URL to link.

- New route `src/routes/rodent-radar_.place.$slug.tsx` (parent `_` keeps it outside the atlas layout so it gets its own chrome).
- Page sections, in order, no marketing fluff: (1) place name + region + last-snapshot date, (2) headline numbers (official records, recent activity, YoY change) — same data the drawer shows, just permanent, (3) **Read the data** — the raw snapshot table with source link per row, (4) **Cite this page** — pre-formatted citation block + permalink + CSV download button, (5) **What this means on the ground** (one paragraph, for PMPs), (6) **Your exposure safety** (the existing `exposureGuidance` content, scoped).
- JSON-LD `Dataset` schema in `head()`. Canonical URL set per place. og:image generated at build time as a small map snapshot per place.
- Link from each marker click in the drawer: "View {place} page →".

## Chunk E — Display modes + preset views + URL state

Goal: shareable map states, OGW's "preview tiles" become real.

- Migrate URL state from raw `URLSearchParams` to TanStack `validateSearch` + `zodValidator(fallback(...))`. Schema captures: visible layers, selected place id, display mode, zoom/center, time window.
- **Display modes** (radio): Standard, High-contrast, Lines-off (hides transmission-equivalent connectors if any), Field view (mobile-optimized, single layer).
- **Preset views** (4 chips, each a one-click URL): "Where rats are winning", "The seasonal swing", "Data gaps in America", "Your block" (geolocate).
- Bottom-left thumbnail tiles preview these presets visually (static PNG at build).
- Add a "Share this view" button → copies the URL + downloads a PNG snapshot of the current map state.

## Order of execution and stop-points

1. Chunk A (rail surgery + tagline + About rewrite). User-visible win immediately.
2. Chunk B (globe + vector grammar). The big visual jump.
3. Chunk C (Tier A cities + Tier C overlays). Density.
4. Chunk D (per-place pages). Citeability.
5. Chunk E (display modes + presets + URL state). Shareability.

After each chunk: I verify in preview, screenshot, and report back before starting the next. You can stop me between any two chunks.

## Technical details (for reviewers)

- Basemap: Protomaps PMTiles, served as a static file from `public/`. No external token, no per-tile API cost. ~80MB for North America at zoom 0–10, acceptable.
- Globe projection requires MapLibre GL JS ≥ 4.7. Confirm version, bump if needed.
- Vector layer source uses a single GeoJSON `FeatureCollection` built at build time from the snapshots JSON, regenerated by a `scripts/build-atlas-geojson.ts` step wired into `package.json`'s build.
- New CSS tokens added to `src/styles.css` under `:root` and `.dark`. No inline colors in components.
- Preset thumbnails generated at build via Playwright headless screenshot of each preset URL, written to `public/rodent-radar/presets/`.
- No backend, no auth, no cron. All ingest scripts run manually before commit; snapshot files are static. A future cron can be added without touching the runtime.

## Out of scope

- Embeddable widget, email/SMS alerts, native mobile gestures, account/login, Hantavirus content beyond existing `exposureGuidance`, SEO-bait programmatic city pages.
