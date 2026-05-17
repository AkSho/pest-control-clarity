## What's actually happening

Your previous agent added `overflow-x: clip` to `html, body` and shrank `pdp-stat` font-size. That stopped the page from being side-pannable, but `overflow-x: clip` doesn't fix overflow — it *hides* it. Any element wider than 390px is now silently chopped off on the right.

The screenshot at 390px shows the hero gallery card, the H1 line ("…Fertility"), and the rating row all clipped ~40–60px past the right edge. That means something inside the hero `<section>` is forcing a render width of ~430–450px.

## Root cause

Two contributors, both presentation-only:

1. **No `min-w-0` on flex children that contain horizontally-scrolling content.** `ProductGallery` is a `flex flex-col` whose thumbnail strip uses `overflow-x-auto` with `shrink-0` thumbnails (6 × ~64px + gaps ≈ 416px). In a flex column, an `overflow-x-auto` child without `min-width: 0` can push its flex parent wider than the viewport. The hero `<section>` is a `grid` whose grid item (`md:sticky` wrapper around `ProductGallery`) has no `min-width: 0` either — and grid items default to `min-width: auto`, which is the same trap.

2. **`container-site` padding is 1.25rem (20px) at every breakpoint.** That leaves 350px of content on a 390px viewport. Combined with `p-8` (32px) on the section cards used elsewhere on the PDP, inner content drops to ~286px and any element that assumes ≥320px (badges, the "EPA Minimum-Risk" card, stat blocks) silently clips under `overflow-x: clip`.

The earlier `overflow-wrap: anywhere` on `.pdp-h1/h2/stat` only helps when the heading itself is the offender. Here the offender is the grid/flex container around it.

## Plan

### Step 1 — Add `min-w-0` to the grid/flex parents in the hero

In `src/components/pdp/ProductPage.tsx`, the hero section grid item that wraps `ProductGallery`:

```tsx
<div className="md:sticky md:top-5 md:self-start min-w-0">
  <ProductGallery ... />
</div>
<div className="min-w-0">
  <BuyBox ... />
</div>
```

And add `min-w-0` to the same `<section className="container-site grid …">` itself is unnecessary, but the BuyBox column needs it too — long pill rows and price labels can otherwise force the column wider.

### Step 2 — Add `min-w-0` to `ProductGallery`'s internal flex columns

In `src/components/pdp/ProductGallery.tsx`:

- Outer `<div className="flex flex-col gap-3">` → add `min-w-0`
- Inner `<div className="flex flex-col-reverse gap-3 xl:flex-row-reverse xl:gap-4">` → add `min-w-0`
- The thumbnail strip `<div className="flex gap-2 overflow-x-auto …">` → add `min-w-0 max-w-full`

This stops the `overflow-x-auto` scroller from inflating its ancestors.

### Step 3 — Tighten mobile gutters so cards stop kissing the edge

In `src/styles.css`:

```css
.container-site {
  padding-inline: 1rem;  /* was 1.25rem */
}
@media (min-width: 768px) {
  .container-site { padding-inline: 1.25rem; }
}
```

And reduce section-card padding on mobile only where it's currently `p-8 md:p-14`:

```tsx
className="… p-5 md:p-14"
```

Targets: the "How deployment works" card and the FAQ card in `ProductPage.tsx` (lines 63 and 140). Gives mobile ~358px of usable content instead of 286px.

### Step 4 — Keep `overflow-x: clip` on `html, body`, but only as a *safety net*

Leave the rule in place so a future stray element can't break the page, but the goal is that with Steps 1–3, `document.documentElement.scrollWidth` equals `window.innerWidth` at 390px even without the clip. That's the only real verification — if scrollWidth > innerWidth, something is still wrong, regardless of whether the user can see scrollbars.

### Step 5 — Revisit the earlier overrides

The previous agent's edits to `.pdp-h1`, `.pdp-h2`, `.pdp-stat` (`overflow-wrap: anywhere` + smaller `pdp-stat` clamp) are no longer load-bearing once Steps 1–3 ship, but they're not harmful. Keep `overflow-wrap: anywhere` on `.pdp-stat` only (because long numerals legitimately can't break otherwise) and remove it from `.pdp-h1`/`.pdp-h2` so headings break on word boundaries instead of mid-word. Restore `pdp-stat` to `clamp(3.5rem, 10vw, 7.5rem)` for a less collapsed look on small screens — 14vw was an over-correction.

## Verification

After implementing, at 390 × 844:
1. Visually: hero gallery card flush with the right card padding, H1 wraps cleanly with no mid-word cuts.
2. Programmatic: in the browser console, `document.documentElement.scrollWidth - window.innerWidth` returns `0`.
3. Scroll the entire PDP and confirm no section past the hero clips either — especially `FieldResultsTrio`, `ComparisonTable`, and `ReviewsCarousel` (those are the next likely offenders if anything else is missing `min-w-0`).

## What this is *not*

- Not a viewport meta tag issue — `__root.tsx` is correct.
- Not a font-size issue — `pdp-stat` shrinking didn't help because the overflow isn't coming from the stat number.
- Not a typography refactor — purely structural CSS / Tailwind utility additions.

All changes are presentation-only, scoped to `ProductPage.tsx`, `ProductGallery.tsx`, and `src/styles.css`.
