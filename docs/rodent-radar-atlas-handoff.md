# Rodent Radar Atlas Handoff

## Mission
Build Rodent Radar into a de-facto public rodent intelligence atlas: source-backed, visually powerful, and useful enough that consumers, journalists, PMPs, PCOs, public officials, and civic-data people naturally cite it.

The current reference is OpenGridWorks-level map depth, but for rodent activity, colony modeling, recent reports, seasonality, conditions, data gaps, and exposure safety.

## Product Rules
- User-facing language is Rodent Activity, not scores.
- Official Rodent Activity uses official public rodent inspections, complaints, or auditable rodent/vermin 311 records only.
- Internal normalization may size or sort markers, but must not be shown as a public metric.
- Colony Growth is modeled and must stay separate from official city records.
- Context layers are explanatory and must not change official Rodent Activity.
- Watchlist and data-gap places cannot show fake activity bands or fake records.
- Hantavirus belongs only as conservative CDC-backed Rodent Exposure Safety guidance, not local disease-risk prediction.
- Copy should be consumer-friendly, down-to-earth, and non-alarmist.

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
- Left rail: `Rodent Radar`, subtitle, verified places, official records, data gaps, search, layer controls, and place list.
- Top-right utility icons: search, share, reset, labels, map style, sources, info.
- Bottom-left buttons: Layers and Sources.
- Selected verified places show activity band, official records, recent activity, year-over-year change, data confidence, snapshot date, and source.
- Colony Growth toggle adds a modeled mini-projection and a purple ring layer.
- Watchlist/data-gap places show reviewed source, review date context, why no activity layer is shown, and source link.
- `/rodent-radar/attribution` and `/rodent-radar/terms` exist and link from the atlas drawers.
- Static JSON/CSV exports no longer expose a public numeric score.
- `bun run build` passes after the atlas redesign. The build still prints the known Wrangler log-file permission warning under `~/Library/Preferences/.wrangler/logs`, but exits successfully.
- Local dev server was tested at `http://127.0.0.1:5173/rodent-radar/rat-pressure-map`.

## Data State
Verified official activity areas:
- Brooklyn
- Manhattan
- Bronx
- Queens
- Staten Island
- San Francisco

Watchlist/data-gap areas:
- Jersey City
- Newark
- Oakland
- San Jose

Known source rules:
- NYC borough activity comes from the official NYC Open Data Rodent Inspection dataset.
- San Francisco activity comes from official DataSF 311 Cases filtered by rodent/vermin-related fields.
- Oakland and San Jose have official general 311 data, but no clean rodent/vermin taxonomy was confirmed.
- Jersey City and Newark remain unverified for clean public rodent activity data.

## Implemented In Latest Atlas Redesign
- Replaced the previous content-heavy map page with an OpenGridWorks-inspired atlas surface.
- Removed visible score language from the atlas UI and public exports.
- Added atlas layer roles:
  - `official-activity`
  - `model`
  - `context`
  - `guidance`
  - `data-gap`
- Added atlas layer definitions:
  - Rodent Activity
  - Colony Growth
  - Recent Reports
  - Seasonality
  - Conditions
  - Data Gaps
  - Exposure Safety
- Renamed route-facing metrics to `activityIndex` for internal marker sizing and `activityBand` for public band display.
- Added MapLibre atlas markers:
  - official activity bubbles
  - modeled colony rings
  - watchlist data-gap markers
- Added utility drawers for sources, methodology, and atlas controls.
- Added attribution and terms pages modeled after OGW-style utility pages.

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
- Colony Growth is modeled and separate from official activity.
- Context layers are allowed, but must be labeled as context.
- Watchlist/data-gap places must not show fake records or fake bands.
- Hantavirus belongs only as `Rodent Exposure Safety`, using conservative CDC-backed cleanup guidance.
- Run `bun run build` after implementation work and record the result here.

## Immediate Next Task
Choose the next product chunk:
1. Add richer real context layers from official sources, starting with sanitation / illegal dumping / food inspection signals.
2. Expand verified official activity coverage to cities with clean rodent complaint datasets.
3. Improve map density and visual richness toward the OpenGridWorks benchmark with vector layers, legends, and source settings.
4. Add canonical source/detail pages for each verified place and dataset.

## Left Off Here
The atlas redesign has been implemented and verified. The live smoke check found 6 official activity markers, 4 data-gap markers, no visible score language, working attribution and terms pages, and a selected-place drawer with official records, recent activity, modeled Colony Growth, source, and confidence.
