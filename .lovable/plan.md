## Goal

Make `/rodent-radar/rat-pressure-map` usable on phones without redesigning anything. Reuse every existing control; just rearrange them for small screens, mirroring OGW's `power-plants` pattern. Also remove the on-map "Recurring activity only" pill.

## Scope

- Route file: `src/routes/rodent-radar_.rat-pressure-map.tsx`
- Components: `AtlasSidebar`, `AtlasToolbar`, `CuratedViews`, `CinematicToggle`, `ConfidenceKey`
- No data, no map logic, no business changes. Frontend/presentation only.

## Audit (desktop + mobile, ours vs OGW)

OGW desktop: persistent left sidebar with all filters; thin top-right icon strip; rail of icon shortcuts left of sidebar; map fills the rest.

OGW mobile: map is full-bleed. **Top:** hamburger + search bar in one row, then a horizontally scrollable chip row of category filters. **Bottom:** a thin "Power Plants — Swipe up for filters" peek bar that pulls up the sidebar contents. (We chose off-canvas drawer over bottom sheet — noted; we'll use a hamburger that opens the sidebar as a full-height drawer instead of OGW's bottom-sheet behavior.)

Ours desktop: works. Left `AtlasSidebar`, top-right `AtlasToolbar`, bottom-left `CuratedViews`, right-top cinematic and recurring pill.

Ours mobile (current): sidebar hidden (`md:block`), toolbar hidden (`md:flex`), so the map shows with only: the legend chip, the on-map "Recurring activity only" pill (to be removed), a floating "reports" button, a bottom row of `Reports / Share / Curated views / Scene`, and the field bottom sheet. **No way to access layers, metric switcher, search, sources, or confidence key.** That's the gap.

## Changes

### 1. Remove the "Recurring activity only" pill
- Delete the JSX block at `src/routes/rodent-radar_.rat-pressure-map.tsx` lines ~681–698 (both desktop + mobile, all viewports).
- Keep the `recurringOnly` state and the toggle inside `AtlasSidebar`'s "Recurring activity" section — functionality preserved.

### 2. Mobile top bar (visible only `<768px`)
A new lightweight bar pinned to `top-0` of the map container:
- Hamburger button (left) → toggles the drawer (see step 3).
- Search input (right, flex-1) → wired to the same `query` / `onQueryChange` that already drives sidebar search. One-tap reachable per requirement.
- Background: `bg-slate-950/85 backdrop-blur` + thin border, matching existing chrome.

Existing desktop toolbar (`AtlasToolbar`) keeps its `hidden md:flex` — unchanged.

### 3. Off-canvas drawer (`<768px`)
- Wrap `AtlasSidebar` so on mobile it renders inside a shadcn `Sheet` (left side, full height, ~92% width, scrollable).
- Drawer opens via the hamburger, closes via X / backdrop / Esc.
- Drawer contents = the **entire current sidebar** (metric switcher, search, layer cards, recurring activity, curated views section, sources, confidence key) — per "All current sidebar controls" answer.
- Desktop (`md+`) keeps the existing pinned `aside` — unchanged.

### 4. Reposition existing on-map chrome on mobile
- `CinematicToggle`: keep, but on mobile move it to top-right of the new mobile top bar so it doesn't collide with the hamburger.
- Legend chip (top-left): on mobile move down below the new top bar so it doesn't overlap.
- `CuratedViews` bottom row: keep as-is — it already works on mobile.
- `FieldBottomSheet`: unchanged.
- The floating "reports" button: unchanged.

### 5. Breakpoint
- Single breakpoint at `md` (`<768px`). Use Tailwind `md:` utilities + `useIsMobile()` only where state matters (drawer open/close). No new breakpoints, no tablet-specific layout.

## Out of scope

- No changes to data, metrics, layer logic, map rendering, or any desktop layout other than removing the pill.
- No restyle of the sidebar itself — it just gets a new mobile container.
- No new icons beyond `Menu` from lucide.

## Technical notes

- Reuse `@/components/ui/sheet` (already in project) for the drawer.
- `useIsMobile()` from `src/hooks/use-mobile.tsx` for conditional mounting where needed; otherwise prefer Tailwind responsive classes.
- All controls keep their existing props; we're only changing where they render, not what they do.
- Verify after build: at 375×812 the hamburger opens the drawer, search input is reachable in one tap, and the recurring pill is gone everywhere.
