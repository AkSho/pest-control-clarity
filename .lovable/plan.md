Final chunk. Three things ship together: shareable URL state, four display modes, and four preset views with real map-snapshot thumbnails.

## 1. URL state via TanStack validateSearch + zod

Migrate the rat-pressure-map route from raw `URLSearchParams` to `validateSearch` with `zodValidator(fallback(...))`.

Schema fields:
- `layers` — string array of visible layer ids (default: the `defaultVisible: true` set)
- `place` — selected place id, optional
- `mode` — `"standard" | "high-contrast" | "lines-off" | "field"`, default `standard`
- `zoom` — number, default 3.2
- `center` — `[number, number]` tuple (lng, lat), default `[-96, 38]`
- `window` — `"12mo" | "90d" | "30d"`, default `12mo`
- `preset` — optional preset id, used only to mark which chip is active

Wire `Route.useSearch()` + `useNavigate({ from })` everywhere the old `URLSearchParams` writes happened. Map pan/zoom writes throttled at 500ms to keep history clean. `retainSearchParams(["mode"])` so display mode survives drill-down to a place page (place page reads it for its own theming).

## 2. Display modes

Four modes, exposed as a radio in the existing "Display" tile (currently shows static):

- **Standard** — current globe + atmospheric chrome.
- **High-contrast** — basemap desaturated, marker palette swapped to WCAG-AA tokens (`--activity-*-hc` variants added to `src/styles.css`), satellite overlays hidden.
- **Lines-off** — hides the decorative satellite labels and constellation, keeps the data. Quiet/print-friendly.
- **Field view** — single-layer (rodent-activity only), rail collapses to a bottom sheet, marker hitboxes enlarged. Optimized for the 375-414px viewport that's actually phones.

Each mode is a class on the map shell root (`data-display-mode={mode}`), plus a small style branch in the MapLibre paint config (read mode from state, recompute paint expressions in a `useEffect`). No new components — just conditional class + style branches.

## 3. Preset views

Four chips in the top utility bar, each a one-click navigate that writes a full search-state into the URL:

1. **Where rats are winning** — `layers=[rodent-activity]`, `window=12mo`, center/zoom framed on top 5 places by activityIndex.
2. **The seasonal swing** — `layers=[rodent-activity, seasonality]`, `window=90d`, CONUS view.
3. **Data gaps in America** — `layers=[data-gaps]`, full globe zoom (1.4), shows only `?` markers.
4. **Your block** — runs `navigator.geolocation.getCurrentPosition()`. On grant: center on lat/lng, zoom 11. On deny / unsupported / timeout: opens a small inline ZIP input (US/Canada FSA). Geocoding is local-only against a static `public/rodent-radar/data/zip-to-place.json` (~40KB, ~50 ZIPs covering only our verified places + their neighbors); ZIP outside coverage → centers on the nearest covered place with a small "nearest covered place: {name}" pill. No external geocoder.

Chips render with a tiny PNG thumbnail (40×24) on the left, label on the right. Active preset gets a 1px cyan ring.

## 4. Preset thumbnails (Playwright)

New script `scripts/build-preset-thumbnails.ts` runs in `package.json`'s `prebuild`:

- Spins up the dev server on a free port.
- Launches Playwright (chromium, headless, 1024×640 viewport).
- For each of the 4 presets, navigates to the preset URL, waits for `data-map-ready="true"` (we'll emit this attribute when MapLibre's `idle` event fires after the basemap+sources settle), screenshots the map canvas at 320×192, downsamples to 80×48 @2x.
- Writes to `public/rodent-radar/presets/{id}.png`.
- Adds a `.gitignore` exception so the PNGs commit.

Playwright is dev-only (`bun add -d playwright @playwright/test`). CI/dev-server impact: ~12s added to first build, then cached. If Playwright fails (sandbox without chromium), the chips fall back to a CSS gradient — page never breaks.

## 5. Share view

The existing top-right "Share" icon currently copies the bare URL. Now it:
- Copies the canonical URL (already correct, since state is in the URL).
- Optionally generates a PNG of the current map canvas (`map.getCanvas().toBlob()`) and offers a download. Pure client-side, no server.

## Files touched

- `src/routes/rodent-radar_.rat-pressure-map.tsx` — `validateSearch`, mode/preset wiring, chip row, share PNG.
- `src/lib/rodentRadarSearch.ts` (new) — zod schema + types, exported for the place page to read `mode`.
- `src/styles.css` — `--activity-*-hc` tokens, `[data-display-mode="field"]` overrides.
- `src/routes/rodent-radar_.place.$slug.tsx` — read `mode` from search, apply matching theme class.
- `public/rodent-radar/data/zip-to-place.json` (new) — small ZIP/FSA → placeId lookup, hand-built from the 8 verified cities.
- `scripts/build-preset-thumbnails.ts` (new), `package.json` prebuild hook.
- `public/rodent-radar/presets/*.png` (generated).

## Technical notes

- `validateSearch` runs on every navigation; `fallback(...)` is mandatory (per the search-params skill) so bad URLs degrade instead of throwing.
- Tuple `center` is JSON-serializable, fine for TanStack's default search serializer.
- `retainSearchParams` lives on the parent `/rodent-radar` route, not root, so the marketing site stays clean.
- ZIP lookup is fully client-side; no PII leaves the browser, geolocation only used in-memory.
- All new state mutations go through `navigate({ search: (prev) => ... })` per the search-params skill (function form, never object form).

## Out of scope (still)

Embeddable iframe, push alerts, user accounts, server-side rendering of preset PNGs, programmatic SEO city pages.

## After this chunk

OGW gap closes for real. We will have: globe basemap, vector grammar, 9 cities of verified data + 4 context overlays, per-place citation pages with JSON-LD, and shareable URL state with 4 preset views. Stop point.