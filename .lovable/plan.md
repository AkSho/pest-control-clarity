
# Rodent Radar v2 — "The Public-Data Trail"

Rebuild the map around the OGW pattern, but for rodent reports. Stop showing city-level scores. Start showing every report as a dot, with recency and persistence as the primary visual story, and the replacement cycle as the payoff.

---

## North Star

**What the consumer feels in 5 seconds:**
"Rodent activity isn't random. It leaves a public-data trail. My area has a pattern."

**What Cloakd gets to say:**
"Traditional control reacts to sightings. Rodent Radar reveals the replacement cycle behind them."

---

## 1. Switch the unit: one dot = one report

The bubble stops being a city score. It becomes one record from a public dataset: a 311 complaint, a DOHMH inspection, a Chicago rodent-baiting service request, etc.

**Data model change**
- New canonical type `RodentReport`: `{ id, source, sourceUrl, lat, lon, reportedAt, status, addressLabel, raw }`.
- New `src/data/rodent-reports/` directory, one file per source (`nyc-311.json`, `chicago-311.json`, `philly-311.json`, `boston-311.json`, `dc-311.json` to start).
- Keep existing city/state aggregate JSON as a fallback layer ("shallow" mode), not the primary layer.

**Rendering change**
- Replace MapLibre circle layer driven by aggregate `metricValue` with a point source from the report collection.
- Use MapLibre's native `cluster: true` on the GeoJSON source: clusters at low zoom, individual reports at zoom ≥ 13.
- Cluster bubble radius = `Math.log2(point_count) * k`. Real quantity, not normalized.
- Single-report dot = small fixed-radius circle, colored by recency (see §2).

**Files**
- `src/lib/rodent-radar/reports.ts` — loader + GeoJSON adapter
- `src/components/rodent-radar/MapReportsLayer.tsx` — new layer component
- Retire `metricValue` normalization from the verified-pins path

---

## 2. Recency vs persistence is the primary visual encoding

Three orthogonal channels, each doing one job:

| Channel | Encodes | Visual |
|---|---|---|
| Color | Recency | bright primary = last 30d, mid = 30–180d, muted = 180d–24mo, ghost = >24mo |
| Size (clusters only) | Count of reports | log scale from raw count |
| Pulse ring | "Right now" (last 7d) | subtle CSS pulse on single dots only |

Persistence is encoded by the *new* "Recurring sites" layer (§3), not by stacking another ring on every dot. Kill the current confidence ring + glow combo.

**Files**
- `src/lib/rodent-radar/encoding.ts` — pure functions: `recencyBucket(reportedAt)`, `clusterRadius(count)`
- Update legend in `AtlasSidebar.tsx` to a 4-step recency ramp + cluster-size key

---

## 3. The replacement-cycle moment (both surfaces)

**A. In every cluster/dot popup — a sparkline timeline**

Click a dot or cluster → popup shows a 24-month monthly bar chart of reports at this address (single dot) or this cluster's footprint. Sawtooth pattern = replacement cycle. One-line caption beneath:

> "5 reports across 14 months. The pattern of a recurring colony — not a one-time sighting."

Implementation: tiny SVG sparkline component, no chart library. Buckets reports into months client-side from the same source data.

**B. "Recurring sites" map layer toggle**

A new toggle in the layer stack. When ON: dim every dot that doesn't qualify, highlight (saturated + slight glow) any address with ≥3 reports across ≥6 months. This is the city-wide pattern view. Off by default.

**Files**
- `src/components/rodent-radar/ReportPopup.tsx` (new, replaces existing popup logic)
- `src/components/rodent-radar/Sparkline.tsx` (new)
- `src/lib/rodent-radar/recurrence.ts` — `isRecurringSite(reportsAtAddress)`

---

## 4. Coverage: 5 deep + 25 shallow

**5 hero cities** — full per-report ingest, full history (24+ months), drives §1–§3:
NYC, Chicago, Philadelphia, Boston, DC.

**~25 shallow cities** — keep the current aggregate pin (one dot, count badge, no timeline) so the map isn't sparse outside the 5 hero metros. Popup says: "Aggregate only. Per-report data not yet ingested for this city."

**AHS estimate layer** (from previous round) stays as the always-on background fill at low opacity — the "estimated pressure everywhere" canvas.

**Visual story**: zoomed out, the country is washed in AHS estimates with bright pin clusters; zoomed in on a hero city, the screen fills with hundreds of individual dots. The contrast itself communicates "this is the depth we COULD have everywhere."

**Out of scope this pass**: ingesting beyond the 5 hero cities. Treat the per-source ingest as ongoing.

---

## 5. Cinematic + curated views + voice

**Cinematic mode**
- New top-right toolbar button (play/triangle icon).
- Hides sidebar, layer cards, toolbar chrome. Leaves map + a thin exit-cinematic affordance.
- ESC exits. Keyboard shortcut `C`.

**Curated views** (3 to start, in a new collapsed menu top-right)
1. **"NYC right now"** — fly to NYC, recurring-sites layer ON, last-90d filter.
2. **"The replacement belt"** — fit-bounds across the 5 hero cities with recurring-sites ON.
3. **"Where the data ends"** — fit US, AHS estimate layer ON + verified pins, dotted gap markers prominent. The honest view.

Each view = a saved camera state + layer config. Pure URL search params so they're shareable.

**Voice / personality**
- Replace the current sterile copy in the sidebar header. New header: **"The public-data trail."** Subhead: **"Every dot is a real report someone filed about a rat."**
- Basemap label modes: keep one neutral, add one cheeky: "Mute the map" (no labels).
- Honest empty state for the 25 shallow cities and for everywhere with no data — copy that names the gap instead of hiding it.

**Files**
- `src/components/rodent-radar/CinematicToggle.tsx`
- `src/components/rodent-radar/CuratedViews.tsx`
- URL state in route's `validateSearch`

---

## 6. Fixes for the bugs you flagged

- **Map empties after closing a place modal** — audit every `setFilter`/`removeLayer` call. Centralize "active filter" state in route search params; modal close calls `navigate({ search: prev => ({ ...prev, focus: undefined }) })` and the layer effect rehydrates from search.
- **"Click a marker" pill overlaps CARTO attribution** — move pill above the layer cards, `pointer-events: none`, auto-hides on first interaction.
- **Question-mark gap markers** — replace with small dashed-outline ring, no fill, muted slate, hover tooltip from `gap-explanations.json`. (Carries over from previous round.)
- **Overlapping confidence rings** — gone. Single dot = single visual. Cluster = single bubble + count badge.

---

## Build order

1. Data: `RodentReport` type + NYC 311 ingest as the proof file. Get one hero city loading as per-report dots.
2. Encoding: recency color ramp + cluster sizing. Kill old normalized score path.
3. Popup: sparkline + replacement-cycle caption.
4. Recurring-sites layer toggle.
5. Modal-close bug fix + pill repositioning + gap-marker redesign.
6. Remaining 4 hero cities ingest.
7. Cinematic + 3 curated views.
8. Copy/voice pass on sidebar header, empty states, basemap modes.
9. AHS background + 25 shallow aggregate pins.

---

## Out of scope

- Geolocation / ZIP prompt
- World map
- Drawer CTA / lead capture
- Beyond 5 hero cities for per-report ingest
- Server-side recurrence detection (do it client-side from loaded reports for now)

---

## Open assumption to flag

NYC 311 is the only source where I'm confident the lat/lon + date fields are clean enough to drive the sparkline out of the box. The other 4 hero cities may need per-source adapters — I'll build NYC first, prove the pattern end-to-end (data → encoding → popup → recurring layer), then template the rest.
