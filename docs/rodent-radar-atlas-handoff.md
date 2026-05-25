# Rodent Radar Atlas Handoff

## Mission
Build Rodent Radar into a de-facto public rodent intelligence atlas: source-backed, visually powerful, and useful enough that consumers, journalists, PMPs, PCOs, public officials, and civic-data people naturally cite it.

The current reference is OpenGridWorks-level map depth, but for rodent activity, recurring report patterns, recent reports, seasonality, conditions, data gaps, and exposure safety.

## Product Rules
- User-facing language is Rodent Activity, not scores.
- Official Rodent Activity uses official public rodent inspections, complaints, or auditable rodent/vermin 311 records only.
- Internal normalization may size or sort markers, but must not be shown as a public metric.
- Any modeled repeat-activity layer must stay separate from official city records and must never be presented as a rat population estimate.
- Context layers are explanatory and must not change official Rodent Activity.
- Watchlist and data-gap places cannot show fake activity bands or fake records.
- Hantavirus belongs only as conservative CDC-backed Rodent Exposure Safety guidance, not local disease-risk prediction.
- Copy should be consumer-friendly, down-to-earth, and non-alarmist.

## Pinned Roadmap
This is the canonical Rodent Radar sequence. Do not reorder these chunks unless the user explicitly approves the change or a data source fails audit.

Immediate next implementation chunk: **Sanitation / Illegal Dumping Context**.

Last known atlas state:
- 1,339 official report records.
- 5 verified places.
- 7 reviewed data gaps.
- 700 food inspection pest-evidence context records: 350 NYC and 350 Chicago.
- No score, pressure-score, or public numeric index language in the atlas UI.

Priority sequence:
1. **Data Browser Polish**
   - Improve the right-side drawer before adding more records.
   - Add clearer city, source, confidence, and recency filters.
   - Add stronger active-filter state, denser rows, and better `Reports / Recurring / Places / Gaps` tabs.
   - Ensure every report, recurring site, verified place, and gap row can fly to the map.
   - Keep language anchored to `Official records`, `Rodent Activity`, `Recurring activity`, and `Context only`.
2. **Food Inspection Pest Evidence**
   - Expand the existing NYC DOHMH context layer only with clean official sources.
   - Next target: Chicago food inspection context if rodent/pest extraction is auditable.
   - Keep this under `Conditions`, never `Rodent Activity`.
   - Popup language must state that food inspection pest evidence is context only, not a public rodent report.
3. **Sanitation / Illegal Dumping Context**
   - Add official sanitation, trash, missed collection, illegal dumping, or similar civic-condition feeds.
   - Start with cities already verified or priority gaps where data is clean.
   - Keep these as explanatory context layers, not activity.
4. **Housing / Built Environment Context**
   - Add Census/ACS-style layers for housing units, density, vacancy, older housing share, and building-age context.
   - Use these for explanation and optional normalization views such as reports per 1,000 housing units.
   - Do not imply rat population size.
5. **More Verified Activity Cities**
   - Add official per-report rodent activity only where filtering is clean and auditable.
   - Priority candidates: NJ, SF Bay Area, LA, Seattle, Baltimore, Houston, Austin, Denver, Pittsburgh, Atlanta, Portland, Nashville, Minneapolis.
   - Keep unverified cities in `Data Gaps` with reviewed-source notes.
6. **Traffic-Spike Readiness**
   - Split heavy atlas data from the route bundle.
   - Lazy-load map, report, and context datasets.
   - Preserve the full-screen atlas UX while reducing initial payload.

## Important Files
- `src/routes/rodent-radar_.rat-pressure-map.tsx`
- `src/routes/rodent-radar_.attribution.tsx`
- `src/routes/rodent-radar_.terms.tsx`
- `src/lib/rodentRadarAtlas.ts`
- `src/lib/ratPressureMap.ts`
- `src/routes/rodent-radar_.hantavirus-risk-checker.tsx`
- `src/routes/rodent-radar.tsx`
- `src/lib/rodentRadar.ts`
- `src/styles.css`
- `public/rodent-radar/data/rat-pressure-snapshots.json`
- `public/rodent-radar/data/rat-pressure-snapshots.csv`
- `public/rodent-radar/data/rodent-radar-sources.json`

## Current State
- `/rodent-radar/rat-pressure-map` is now a full-screen dark atlas route with site header/footer hidden.
- The first viewport is map-first, not a content page.
- Left rail now follows the OGW-style cockpit pattern: title, concise lede, official report count, verified places, reviewed gaps, recency legend, cluster-size legend, recurring-activity explanation, and source/terms links.
- Right drawer now functions as a searchable record browser with tabs for Reports, Recurring, Places, and Gaps.
- Primary map unit is now official report records: one dot = one public rodent-related record, clustered at low zoom.
- Recurring activity is labeled conservatively as a repeated-report pattern, not proof of a confirmed colony.
- Watchlist/data-gap places show reviewed source context and no fake records.
- `/rodent-radar/attribution` and `/rodent-radar/terms` exist and link from the atlas drawers.
- `bun run build` passes. The build still prints the known Wrangler log-file permission warning under `~/Library/Preferences/.wrangler/logs`, but exits successfully.
- Local dev server was tested at `http://127.0.0.1:8080/rodent-radar/rat-pressure-map`.

## Data State
Current official record snapshots:
- NYC: 350 records from NYC Open Data Rodent Inspection (`p937-wjvj`), filtered to `Failed for Rat Activity`; snapshot `2026-05-24`; visible report-date range `2026-05-18` through `2026-05-21`; confidence `high`.
- Chicago: 339 records from Chicago 311 Service Requests (`v6vf-nfxy`), filtered to `Rodent Baiting/Rat Complaint`; snapshot `2026-05-24`; visible report-date range `2026-05-21` through `2026-05-24`; confidence `high`.
- San Francisco: 250 records from DataSF 311 Cases (`vw6y-z8j6`), filtered to residential building infestation taxonomy containing `infestation_rodent_insect`; snapshot `2026-05-24`; visible report-date range `2026-01-27` through `2026-05-23`; confidence `medium` because the official category combines rodent and insect infestation language.
- Boston: 200 records from Boston 311 Service Requests 2026 CKAN datastore (`1a0b420d-99f1-4887-9851-990b2a5a6e17`), filtered to rodent case types; snapshot `2026-05-24`; visible report-date range `2026-05-13` through `2026-05-24`; confidence `high`.
- Washington, DC: 200 records from DCGIS ServiceRequests layer 13, filtered to service code `S0301`; snapshot `2026-05-24`; visible report-date range `2026-05-11` through `2026-05-24`; confidence `high`.
- Philadelphia: 0 per-report records in the current snapshot because the quick audit did not confirm recent clean rodent-specific records in the queried public table. Treat as a visible data gap until verified.

Place-level summaries currently include NYC boroughs, Chicago, Boston, Washington DC, and San Francisco. SF is now included in the one-dot-per-report snapshots, but should be described as medium-confidence official infestation records rather than direct rodent-only reports.

Current context snapshots:
- NYC food inspection pest evidence: 350 records from NYC DOHMH Restaurant Inspection Results (`43nn-pn8j`), filtered to violation codes `04K`, `04L`, and `08A`; snapshot `2026-05-24`; confidence `high`; shown only under `Conditions` as context, not Rodent Activity.
- Chicago food inspection pest evidence: 350 records from Chicago Food Inspections (`4ijn-s7e5`), filtered to violation text matching `38. INSECTS, RODENTS, & ANIMALS NOT PRESENT`; snapshot `2026-05-24`; confidence `medium` because the official violation bundles insects, rodents, and animals together; shown only under `Conditions` as context, not Rodent Activity.

Priority expansion/watchlist areas:
- San Francisco: verified per-report layer added from DataSF. Keep confidence at `medium` unless a stricter rodent-only field is found.
- San Jose: priority Bay Area data gap. Reviewed San Jose 311 source; keep unscored until a clean rodent/vermin taxonomy or official health/code feed is confirmed.
- Oakland: priority Bay Area data gap. Reviewed Oakland 311 source; likely useful for trash/code context first, but not official Rodent Activity until a rodent/vermin filter is confirmed.
- Jersey City: priority NJ data gap. Reviewed Jersey City Open Data; keep unscored until official rodent, vermin, health-code, or housing-code records are confirmed.
- Newark: priority NJ data gap. Reviewed Newark Open Data; keep unscored until direct rodent complaint, inspection, or code-violation records are confirmed.

Privacy/data rules:
- Snapshot builder is `scripts/build-rodent-report-snapshots.mjs`.
- Snapshot date is `2026-05-24`.
- Report coordinates are deterministically jittered.
- Address labels are block-level; house numbers and unit markers are stripped.
- Future-dated records are excluded.
- AHS/Census household sightings are deferred and should not be shown as a default atlas layer.

## Implemented In Latest Atlas Redesign
- Replaced the previous content-heavy map page with an OpenGridWorks-inspired atlas surface.
- Removed visible score language from the atlas UI and public exports.
- Removed AHS survey estimates from the default visible atlas surface.
- Added the official-record snapshot builder and replaced synthetic/demo report JSON.
- Added a right-side OGW-style record drawer for official reports, recurring activity, places, and data gaps.
- Added atlas layer roles:
  - `official-activity`
  - `model`
  - `context`
  - `guidance`
  - `data-gap`
- Added atlas layer definitions:
  - Rodent Activity
  - Recurring Pattern Model
  - Recent Reports
  - Seasonality
  - Conditions
  - Data Gaps
  - Exposure Safety
- Renamed route-facing metrics to `activityIndex` for internal marker sizing and `activityBand` for public band display.
- Added MapLibre atlas markers:
  - official activity bubbles
  - modeled repeat-activity rings
  - watchlist data-gap markers
- Added utility drawers for sources, methodology, and atlas controls.
- Added attribution and terms pages modeled after OGW-style utility pages.

## Latest Polish Pass
- Fixed the bottom-right control collision by moving the closed report-browser affordance away from MapLibre/CARTO/OSM attribution.
- Replaced the floating layer-card stack with an OGW-style bottom-left dock: `Layers`, `Sources`, and `Map Type`.
- `Layers` now opens a compact grouped matrix for Activity, Context, Modeled, Guidance, and Transparency layers.
- `Map Type` now switches between dark, street-context, and light CARTO basemaps.
- `Seasonality` now shows a monthly report-rhythm panel derived from official report dates instead of drawing a decorative line across the map.
- `Exposure Safety` opens a CDC-backed guidance drawer and remains explicitly not a local disease-risk map.
- `Conditions` is clarified as context coming next; it does not draw fake data.
- `bun run build` passed after this pass. The known Wrangler log-file permission warning still appears but the build exits successfully.

## Latest Data Browser Pass
- Added compact report-browser filters for verified place, recency (`all`, `last 30 days`, `last 90 days`), source dataset, and confidence.
- Report rows now show city/place labels, neighborhood, source, confidence, and status.
- Place summaries are now derived from the loaded report snapshots instead of source-name string guesses.
- Added Bay Area and NJ priority reviewed gaps for San Jose, Oakland, Jersey City, and Newark.
- Added Oakland, San Jose, Jersey City, and Newark source cards so attribution/search infrastructure knows about reviewed sources.
- No new activity dots were added in this pass; SF/San Jose/Oakland/NJ remain subject to the official-and-auditable rule.

## Latest Data Browser Polish Pass
- Added active filter chips and a reset control for search, place, recency, source, and confidence filters.
- Report search now includes verified place names in addition to address, neighborhood, source, category, and status.
- Added empty states for Reports, Recurring, Places, and Gaps so filtered-out views do not look broken.
- Recurring rows now show first/last report dates and a clearer `recurring pattern` label.
- Places rows now show latest report date, source count, high-confidence count, and selected-place styling.
- Gaps rows are now clickable and fly to the reviewed place before opening the gap detail drawer.
- `bun run build` passed after this pass. The known Wrangler log-file permission warning still appears but the build exits successfully.

## Latest San Francisco Data Pass
- Added DataSF per-report snapshot generation to `scripts/build-rodent-report-snapshots.mjs`.
- Added `src/data/rodent-reports/sf.json` with 250 official DataSF 311 residential-building infestation records.
- Added San Francisco as a `HeroCity` / report-browser place in `src/lib/rodent-radar/reports.ts`.
- SF records use confidence `medium` because DataSF's clean auditable taxonomy is `infestation_rodent_insect`, not a rodent-only field.
- Regenerated current report snapshots: NYC 350, Chicago 339, SF 250, Boston 200, DC 200, Philadelphia 0.

## Latest Context Layer Pass
- Added `scripts/build-rodent-context-snapshots.mjs` for context-only official data snapshots.
- Added `src/data/rodent-context/nyc-food-pest.json` with 350 NYC DOHMH restaurant-inspection pest evidence records.
- Added typed context helpers in `src/lib/rodent-radar/context.ts`.
- Turned the `Conditions` layer from placeholder text into a real food-inspection pest-evidence overlay with amber clusters/points.
- Added a context popup that labels these records as `Context only` and states they are not public rodent reports.
- Kept Chicago food inspection context deferred because the useful signal is narrative-based and needs a cleaner extraction strategy.

## Latest Food Inspection Pest Evidence Pass
- Added Chicago Food Inspections context extraction to `scripts/build-rodent-context-snapshots.mjs`.
- Added `src/data/rodent-context/chicago-food-pest.json` with 350 official Chicago inspection records.
- Used a narrow auditable filter: `lower(violations) LIKE '%38.%insects%rodents%animals%not%present%'`.
- Kept Chicago context confidence at `medium` because violation 38 is official but bundles insects, rodents, and animals.
- Combined NYC and Chicago food inspection pest-evidence records in `src/lib/rodent-radar/context.ts`.
- Updated the context popup so it names the actual source instead of hard-coding NYC DOHMH.

## Exposure Safety Rules
Use label: `Rodent Exposure Safety`.

Allowed:
- CDC-backed cleanup and exposure guidance
- droppings, urine, saliva, nesting material, contaminated dust
- enclosed spaces, sheds, garages, vehicles, cabins
- links to standalone checker for personal cleanup guidance

Not allowed:
- diagnosing illness
- implying local Hantavirus risk from rat complaints
- saying rodent activity predicts Hantavirus
- alarmist medical language

CDC citation targets:
- `https://www.cdc.gov/hantavirus/`
- `https://www.cdc.gov/hantavirus/prevention/index.html`
- `https://www.cdc.gov/healthy-pets/rodent-control/clean-up.html`

## Continuity Protocol
- Start each new session by reading this file before editing Rodent Radar files.
- Before a large change, name the exact next chunk in plain language.
- After each completed chunk, update this file with what changed, files touched, verification, and the next task.
- If context gets tight, stop and update `Left Off Here` before continuing.
- Keep unrelated repo changes out of Rodent Radar work.
- Do not let chat history become the source of truth; this file should carry the state.

## Claude / Codex Pickup Prompt
You are picking up work on Cloakd Removals / Rodent Radar inside:

`/Users/tounshoyoye/Documents/cloakd-removals/pest-control-clarity`

Read this file first, then inspect the important files above.

Goal:
Continue turning Rodent Radar into a de-facto public rodent intelligence atlas. The map should feel like an OpenGridWorks-grade data product for rodent activity: layered, beautiful, source-backed, and fascinating without being alarmist.

Non-negotiables:
- User-facing language is Rodent Activity, not scores.
- Official activity uses official public rodent/inspection/311 data only.
- Modeled repeat-activity context is separate from official activity and is not a rat population estimate.
- Context layers are allowed, but must be labeled as context.
- Watchlist/data-gap places must not show fake records or fake bands.
- Hantavirus belongs only as `Rodent Exposure Safety`, using conservative CDC-backed cleanup guidance.
- Run `bun run build` after implementation work and record the result here.

## Immediate Next Task
Follow `Pinned Roadmap` above. The immediate next implementation chunk is **Sanitation / Illegal Dumping Context**.

## Left Off Here
The OGW-style record cockpit, polish pass, Data Browser Polish pass, San Francisco per-report import, first NYC context layer, Chicago food-inspection context layer, and clickable verified-place navigation have been implemented. The atlas now has 1,339 official per-report records, 700 food-inspection context records, five verified per-report places, seven reviewed gaps, visible clusters, a left legend rail, a filtered right report browser with active filter chips, bottom-left `Layers / Sources / Map Type` dock, monthly seasonality rhythm, and a real `Conditions` overlay. Data audit found zero future-dated records and no active atlas score/index language in the Rodent Radar cockpit files. Continue with **Sanitation / Illegal Dumping Context** before housing, city expansion, or traffic readiness.
