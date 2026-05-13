# Re-treat inline images as side-by-side split sections

## Problem
Current `InlineFigure` renders images full-width inside the article column. Reference site (nealrfg.com) instead pairs each image with a heading + body copy in a 50/50 grid that alternates left/right between sections — feels editorial, not banner-y.

## New component: `SplitFigure`
File: `src/components/site/SplitFigure.tsx`

Props:
- `eyebrow?: string` — small accent label above heading (e.g. "How it works")
- `heading: string` — section H2/H3
- `children: ReactNode` — body copy (paragraphs, bullets, CTA)
- `image: string`, `alt: string`, `caption?: string`
- `imageSide?: "left" | "right"` (default `right`)
- `priority?: boolean`

Layout:
- `grid md:grid-cols-2 gap-10 lg:gap-16 items-center`
- Image cell: `rounded-xl overflow-hidden border border-border aspect-[4/5] md:aspect-[3/4]` (portrait-ish like Neal), object-cover
- Text cell: eyebrow in `text-primary text-sm font-semibold uppercase tracking-wide`, then `h2`, then prose
- On mobile, image stacks above text regardless of `imageSide`
- `imageSide="left"` swaps via `md:order-*` utilities so the image lands on the requested side at md+
- Wrapped in `<section className="py-12 md:py-20">` so it owns its own vertical rhythm

## Migration
For each page already using `InlineFigure`, convert each figure into a `SplitFigure` by:
1. Pulling the surrounding heading + 1–2 paragraphs (or a short bullet list) of nearby copy into the `children` slot
2. Alternating `imageSide` per image on the page (right, left, right…)
3. Removing the now-redundant standalone heading/paragraph block that the SplitFigure absorbs

Pages to update (already have inline images):
- Tier 1: `/evolve-rodent-birth-control`, `/contrapest`, `/contrapest-vs-evolve`, `/does-rat-birth-control-work`, `/how-it-works`
- Tier 2 `/vs/*`: `rat-poison`, `traditional-pest-control`, `snap-traps`, `diy-rat-birth-control`, `orkin`, `assured-environments`, `bell-environmental`, `viking-pest-control`, `western-pest-services`

## Keep `InlineFigure`?
Delete it — no callers will remain after migration. Avoids drift.

## Out of scope
- Tier 3 pages (still no images)
- Hero / OG image changes
- Generating new images

## Technical notes
- All semantic tokens (`border-border`, `text-primary`, `bg-surface`); no hardcoded colors
- Maintain alternating section backgrounds where pages already alternate `bg-background` / `bg-surface`
- Lazy-load images by default; `priority` only for an above-the-fold split, if any