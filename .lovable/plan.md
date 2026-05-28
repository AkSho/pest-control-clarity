Three small, scoped polish fixes for `/rodent-radar/rat-pressure-map` on mobile. Frontend / presentation only — no data, layer, or logic changes.

## 1. More prominent hamburger (mobile top bar)

Goal: when in doubt, the user's eye lands on it.

- Restyle the hamburger button in the mobile top bar (`src/routes/rodent-radar_.rat-pressure-map.tsx`, ~lines 687–694):
  - Use the cyan accent already in the palette: cyan-tinted background + cyan-200 icon + ring/shadow glow (`shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_18px_rgba(34,211,238,0.25)]`).
  - Add a small "Layers" text label next to the icon so it reads as an action, not a decoration.
  - First-load attention: gentle pulse for ~6 seconds after mount (Tailwind `animate-pulse` on the ring), then stops. Suppress permanently after the user opens the drawer once (track in `sessionStorage`, e.g. `rr.hamburgerSeen`).
- No changes to drawer behavior or contents.

## 2. Pulse-glow the on-map records affordance after a city pick

Change in behavior: clicking a city in the menu will **no longer auto-open** the records drawer. Instead, the on-map "Reports" button pulses to invite the user to open it themselves.

- In `handleSelectVerifiedPlace` (and the parallel gap-select handler), remove the `setDrawerOpen(true)` call. Keep map fly-to / selection state.
- Add a transient `pulseReports` boolean state in the route. Set it to `true` whenever a city / gap is selected from the menu. Auto-clear after ~5 seconds, and clear immediately when the user opens the drawer.
- Pass `pulse` prop into `BottomMapDock`'s Reports tile (mobile) and `AtlasToolbar`'s reports button (desktop). When true, apply a cyan ring + `animate-pulse` glow (same token as #1 for consistency).
- No copy changes.

## 3. White bleed at bottom of records drawer on mobile (overscroll bounce)

Diagnosis from the screenshot: iOS Safari overscroll bounce reveals the page/body background behind the dark drawer. The map route container doesn't lock background color or disable overscroll.

- On the map route's root wrapper, add `bg-slate-950` + `overscroll-none` and ensure `min-h-[100dvh]` so the bounce area matches the drawer (and the iOS URL bar gap stays dark).
- If a global light background is leaking, apply a route-scoped dark bg to `html, body` for this route.
- Add `overscroll-contain` on the `RecordDrawer` scroll list so reaching its end doesn't bubble into the page.

## Technical notes

- Files touched:
  - `src/routes/rodent-radar_.rat-pressure-map.tsx` — hamburger styles, remove auto-open on city/gap select, add `pulseReports` state + wiring, root wrapper background/overscroll, RecordDrawer list overscroll-contain.
  - `src/components/rodent-radar/AtlasToolbar.tsx` — accept `pulseReports` prop, apply ring/glow on the reports button.
- No new dependencies. Uses existing Tailwind utilities + `animate-pulse`.
- `sessionStorage` guarded with `typeof window !== "undefined"` for SSR.
- Desktop layout unchanged except the toolbar reports button gains an optional pulse state.

## Out of scope

- No changes to layer logic, data, or the desktop sidebar.
- No new icons, no copy changes beyond the "Layers" label on the hamburger.
