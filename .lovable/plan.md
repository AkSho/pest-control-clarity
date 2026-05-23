## Goal

Rebuild `/rodent-radar/rat-pressure-map` so a first-time consumer thinks, within 5 seconds:

> "Rodent activity is not random. There's a public-data trail. My area has a pattern."

And, by the time they leave the drawer:

> "Traditional control reacts to sightings. Cloakd reveals the replacement cycle behind them."

Map = facts only. Drawer = interpretation. No CTAs inside the drawer.

---

## Strategic guardrails (locked)

- **Brand**: Cloakd. Purge any "PestPro" / "Rodent Radar by PestPro" copy.
- **Map = Official Rodent Activity only**: inspections + complaints + clean 311. No mock data, no AHS-derived activity, no estimated rat population, no "rats per person."
- **Reviewed Data Gaps are first-class**: ~50 metros visible at all times. If we don't have a clean source, the metro renders as an outlined "data-gap" marker (OGW's padlock equivalent) with a reviewed-source explainer in the drawer.
- **Colony Growth is gated**: toggleable layer, but visually distinct (diagonal-stripe rendering, not dots) + one-click confirm with disclaimer before enabling; primary expression lives in the drawer per-city.
- **No CTA in the drawer.** Atlas stays neutral. Cloakd narrative lives in page chrome (sidebar footer, methodology page).
- **Cinematic / guided-tour mode is deferred.** Build the atlas foundation first.

---

## Information architecture (full OGW-style clone, US-only)

```text
┌──────────────────────────────────────────────────────────────┐
│  [⌘K search] [share] [bookmark] [history]                    │  ← slim top toolbar
├────────────┬─────────────────────────────────────────────────┤
│ Sidebar    │                                                 │
│            │                                                 │
│ Cloakd     │                                                 │
│ Rodent     │              MAP FILLS VIEWPORT                 │
│ Radar      │         (city dots + gap markers)               │
│            │                                                 │
│ Metric     │                                                 │
│ Legend     │                                                 │
│ Size scale │                                                 │
│ Confidence │                                                 │
│ key        │                                                 │
│            │                                                 │
│ Filters    │  ┌────────┐ ┌──────────┐ ┌──────────┐           │
│            │  │ Layers │ │ Climate  │ │ Map Type │  ← docked│
│ "About the │  └────────┘ └──────────┘ └──────────┘    cards │
│  data"     │                                       (bottom-L)│
│ footer     │                                                 │
└────────────┴─────────────────────────────────────────────────┘
```

- **Single left sidebar** (replaces current rail + tools + drawer split): brand → primary metric selector → legend → bubble-size scale → confidence key → filters → "About the data" footer link.
- **Three bottom-left docked cards**: Layers (grouped POINTS / AREAS), Climate (NOAA overlays), Map Type (terrain / satellite / dark). Layers panel expands upward when clicked.
- **Slim top toolbar**: ⌘K search, share (state-encoded URL with `?layers=…&metric=…&city=…`), bookmark (deferred, just a tooltip "coming soon" lock icon), history (deferred).
- **City click → drawer** (keep existing slide-over surface). This is the ONLY modal surface.
- **Fixes the existing drawer-close bug**: map disappears after closing a city drawer until refresh. Root cause is almost certainly state cleanup in the current `rat-pressure-map.tsx` — patch as part of the rebuild.

---

## Data layer

### 1. One connector interface, four adapters

`src/lib/rodent-sources/` (new):

```text
src/lib/rodent-sources/
├── types.ts              # RodentActivitySource interface
├── adapters/
│   ├── socrata.ts
│   ├── arcgis.ts
│   ├── open311.ts
│   └── ckan.ts
├── normalize.ts          # ACS join + 4 normalizations
└── fetch-all.ts          # script entry
```

Every adapter outputs a single normalized record shape:

```ts
type RodentActivityRecord = {
  recordedAt: string;         // ISO
  zip: string;                // primary geocode
  tract?: string;             // drill-down
  category: 'inspection' | 'complaint' | 'service_request';
  rawType: string;            // e.g. "Rodent", "Vermin", "RAT SIGHTING"
  resolved?: boolean;
  sourceId: string;           // FK to RodentActivitySource
};

type RodentActivitySource = {
  id: string;
  city: string;
  state: string;
  name: string;                // human-readable
  url: string;                 // citizen-facing portal page
  endpoint: string;            // API URL we pull from
  type: 'socrata' | 'arcgis' | 'open311' | 'ckan' | 'static' | 'gap';
  filterRule: string;          // plain-English filter we apply
  snapshotDate: string;
  confidence: 'high' | 'medium' | 'low';
  comparabilityNote: string;
  reviewedExplanation?: string; // required when type='gap'
};
```

### 2. Phase A cities (launch set, ~18-22)

Cities we already know have clean rodent-coded datasets:

NYC, Chicago, LA, SF, Seattle, Boston, DC, Austin, Dallas, Pittsburgh, Baltimore, New Orleans, Minneapolis, Denver, Nashville, Philadelphia, Portland-OR, Atlanta, Houston, San Diego, Phoenix, Detroit.

Each gets a JSON snapshot at `public/rodent-radar/data/cities/{slug}.json` with:
- 12-month total + per-1k-residents + per-1k-housing-units + per-sq-mile
- Prior 12-month for YoY delta
- 90-day recent + per-10k recent
- Top 5 ZIPs by volume
- Top 3 ZIPs by 90-day spike (persistence signal)
- Source metadata (RodentActivitySource above)

### 3. Reviewed Data Gaps (fills out the ~50)

For ~30 more major metros where we've reviewed sources and found none clean enough:
- Render as an outlined hollow marker on the map (visually distinct from live dots).
- Drawer shows: "We reviewed [N] potential sources. Here's why none qualified." with links to the portals we evaluated.
- A `gap-explanations.json` file holds these.

### 4. Context layers (toggleable, separate)

| Layer | Source | Visual | Notes |
|---|---|---|---|
| Climate: winter temp anomaly | NOAA NCEI | Choropleth overlay (climate divisions) | Already partially built |
| Climate: precipitation anomaly | NOAA | Choropleth | New |
| Restaurant rodent/vermin violations | City inspection datasets coded for rodent | Small triangle markers | Only where coding is explicit; otherwise omitted |
| Housing age + vacancy + density | Census ACS | Choropleth at ZCTA | Context only |
| Transit corridors | OSM | Line overlay | Context only |
| Colony Growth (modeled) | Derived | Diagonal-stripe overlay | Gated: confirm dialog first |

All context layers live in the Layers docked card grouped under AREAS / LINES / POINTS like OGW. Toggling them does NOT alter the Official Activity dot encoding.

---

## Visual encoding (map dots)

- **Color** = primary metric band (default: 90-day per-10k-residents). 5 bands using existing pressure palette.
- **Size** = absolute 12-month complaint volume (sqrt scale).
- **Stroke** = trend vs prior 12-month: solid (flat), thick (rising), dashed (falling).
- **Opacity + ring** = confidence:
  - High: 100% opacity, no extra ring
  - Medium: 70% opacity, thin ring
  - Low: 40% opacity, dashed ring
- **Data gap**: hollow outlined marker, no fill, lock-icon glyph inside.

Sidebar legend mirrors this exactly — every encoding has a visible swatch.

---

## City drawer (the Cloakd narrative arc)

Four beats, no CTA:

1. **Activity** — "Here's what's officially reported."
   - Big number: 12-month total + per-10k-residents
   - Source line with link + snapshot date + confidence chip
2. **Persistence** — "Reports keep coming, in the same places."
   - 90-day vs prior-period delta
   - Top 3 ZIPs by spike, mini bar chart
3. **Trajectory (Colony Growth interpretation)** — "This is what replacement looks like in this area."
   - Plain-English paragraph: "Repeated activity at the same ZIPs over [N] months suggests an established colony cycle, where removing visible rodents creates capacity for the next generation rather than ending the pattern."
   - Explicitly framed as interpretation, not city data. No number.
4. **What public data can't tell you** — methodology limits, link to attribution page.

No CTA, no "buy Cloakd" button, no per-city sales line. The Cloakd story is *implicit in beat 3* — readers reach the conclusion themselves.

---

## Files to change / create

**Create**
- `src/lib/rodent-sources/types.ts`
- `src/lib/rodent-sources/adapters/{socrata,arcgis,open311,ckan}.ts`
- `src/lib/rodent-sources/normalize.ts`
- `src/lib/rodent-sources/fetch-all.ts` (script)
- `src/components/rodent-radar/AtlasSidebar.tsx`
- `src/components/rodent-radar/LayerCard.tsx` (reusable for Layers/Climate/MapType)
- `src/components/rodent-radar/ConfidenceKey.tsx`
- `src/components/rodent-radar/CityDrawer.tsx` (refactor of existing drawer with 4-beat structure)
- `public/rodent-radar/data/cities/{slug}.json` × ~20
- `public/rodent-radar/data/gap-explanations.json`
- `public/rodent-radar/data/noaa-precip-anomaly.json`

**Edit**
- `src/routes/rodent-radar_.rat-pressure-map.tsx` (rewrite layout, fix drawer-close bug)
- `src/lib/rodentRadarAtlas.ts` (collapse provenance to `live | gap`)
- `src/lib/rodentRadarProvenance.ts` (kill `seeded`, `ahs-estimate`)
- `src/routes/rodent-radar.tsx` (purge "PestPro", swap to Cloakd brand wording)
- Any page referencing the rat map's hero copy

**Delete**
- `public/rodent-radar/data/rat-pressure-snapshots.csv`
- `public/rodent-radar/data/rat-pressure-snapshots.json`
- `public/rodent-radar/data/ahs-rodent-estimates.json` (or demote to a clearly-labeled context layer; default = delete)

---

## Acceptance criteria

1. Brand reads "Cloakd" everywhere; no "PestPro" string remains.
2. ~50 US metros visible at all times — every one is either a live Official Activity pin or a hollow reviewed-gap marker.
3. Zero mock / seeded / AHS-as-activity records on the map.
4. Sidebar + three docked layer cards + top toolbar; no rail + tools + drawer split.
5. Map fills viewport at all sizes ≥ 1024px wide.
6. Closing a city drawer leaves the map fully populated (no refresh required).
7. Every live dot exposes source URL + filter rule + snapshot date + confidence.
8. Colony Growth requires a confirm dialog before its layer enables; appears as a stripe overlay, not as dots.
9. City drawer follows the 4-beat structure and contains zero CTA buttons or product mentions.
10. Share URL round-trips state: `?layers=…&metric=…&city=…` opens the same view.

## Out of scope (explicit)

- Cinematic / guided-tour mode (next chunk)
- Bookmark history (lock icon for now)
- Phase B cities beyond the ~50 launch set
- Tract-level choropleth (ZCTA only for v1)
- Canada / global / world toggle
- Per-user accounts, saved views
