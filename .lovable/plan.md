## Chunk E (final): close out display modes, presets, thumbnails, share

Goal: make the URL-state scaffolding from the last chunk actually visible and shareable, then stop feature work.

### 1. Re-wire `DisplayModePicker` into the rail
- Restore the JSX in `RodentRadarAtlasPage` between the Layers and Places sections (it was removed to unblock the build).
- Bind to `search.mode` via `updateSearch({ mode, preset: undefined })`.

### 2. Apply `mode` to the MapLibre map
- Pass `mode` from `RodentRadarAtlasPage` into `AtlasMap`.
- `markerTone(band, mode)` already exists — thread `mode` into the activity feature builder (line 752) and into the paint expression where marker color is read.
- Per mode:
  - `standard` — current paint.
  - `high-contrast` — desaturated basemap (set `raster-saturation: -1`, `raster-contrast: 0.15` on the basemap layer) + HC marker tones.
  - `lines-off` — hide the `place_label` / `road_label` / boundary symbol layers via `setLayoutProperty(id, "visibility", "none")`.
  - `field` — same as `lines-off` plus single-layer mode (force `activeLayers` paint to only render `rodent-activity` + selected place, ignore other overlays in the paint expression — search state is untouched so toggling out of field restores everything).

### 3. Field-view mobile layout
- When `mode === "field"` AND viewport `< 768px`, collapse the left rail entirely and render a bottom sheet (`fixed inset-x-0 bottom-0`) with: selected place name, activity band chip, one-tap "open details" button.
- Enlarge MapLibre hitboxes: increase `circle-radius` interpolation by ~1.4× in field mode.
- Hide `TopTools` search input in field mode; keep only the mode picker access via `MapUtilityButtons`.

### 4. `retainSearchParams(["mode"])` middleware
- Add to the route's `search.middlewares` so drilling into `/rodent-radar/place/$slug` and back preserves the display mode.
- Also add to the `place.$slug` route's `validateSearch` (extend with just `mode`) so the link round-trips.

### 5. Playwright preset thumbnails
- Add `playwright` as a devDependency.
- New `scripts/build-preset-thumbnails.ts`:
  - Spawns `vite preview` on a free port (after a one-shot build).
  - Launches chromium headless at 1024×640, DPR 2.
  - For each of the 4 presets, navigates to `/rodent-radar/rat-pressure-map?preset={id}&__thumb=1`.
  - Waits for `[data-map-ready="true"]` (new attribute set in `AtlasMap` after `map.on('idle')` fires once).
  - Crops to 40×24 of the map canvas, downsamples to 80×48@2x PNG, writes to `public/rodent-radar/presets/{id}.png`.
- Hook into `package.json` as `"prebuild": "tsx scripts/build-preset-thumbnails.ts || echo 'thumbnails skipped'"` (non-fatal — fallback to CSS gradient chip if PNG missing at runtime).
- `PresetBar` chips: if `/rodent-radar/presets/{id}.png` exists, render a 40×24 `<img>` to the left of the label; otherwise current icon.

### 6. PNG share artifact
- Replace `copyShare` with a small menu (popover): "Copy link" (current behavior) + "Download PNG".
- "Download PNG" calls `mapRef.current?.getCanvas().toBlob(...)` and triggers a download named `rodent-radar-{place|preset}-{YYYYMMDD}.png`.
- Add a watermark via a second canvas pass: bottom-right `Rodent Radar · cloakd-removals.cloud` in `--activity-low` color.

### Files

- `src/routes/rodent-radar_.rat-pressure-map.tsx` — restore DisplayModePicker JSX, thread `mode` into AtlasMap, map paint branches, field-view bottom sheet, share menu, `data-map-ready` attr.
- `src/lib/rodentRadarSearch.ts` — export `placeSearchSchema` (just `mode`) for the slug route.
- `src/routes/rodent-radar_.place.$slug.tsx` — `validateSearch: zodValidator(placeSearchSchema)`, apply `data-display-mode` on root.
- `scripts/build-preset-thumbnails.ts` — new.
- `package.json` — add `playwright` devDep, `tsx` if not present, `prebuild` script.
- `public/rodent-radar/presets/{winning,seasonal,gaps,your-block}.png` — generated.
- `src/styles.css` — bottom-sheet animation + watermark color tokens already covered by HC tokens.

### Out of scope (per "stop and ship")

- Embeddable iframe
- Programmatic SEO city pages beyond the existing `place.$slug` route
- New verified cities / freshness badges
- Server-side preset PNG rendering

### After this chunk

OGW gap closes: globe basemap, vector grammar, 9 verified cities + 4 context overlays, per-place citation pages, shareable URL state, 4 preset views with real thumbnails, PNG export, four display modes including a phone-friendly field mode. Then we publish and pause feature work.
