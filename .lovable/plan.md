# Plan: Laurel-flanked eyebrow component, applied site-wide

## What it looks like
- Centered (or left-aligned) text flanked by mirrored laurel-branch SVGs, exactly mirroring the reference screenshot.
- Two tones:
  - **dark** — ivory/white text, off-white laurels (for `ink-section` hero & dark band sections)
  - **light** — ink-foreground text, brand-tinted laurels (for white/cream section backgrounds)
- Optional `icon` prop (e.g. `MapPin`, `ShieldCheck`, `Star`) replaces the **left** laurel for badge-style usage like the hero pill `NYC · MANHATTAN, NY` or the screenshot's shield variant.
- Compact size: text stays at the current `text-xs … tracking-[0.2em]` rhythm so it still sits cleanly above an H1/H2 without dominating.

## Build steps

1. **Create `src/components/site/Eyebrow.tsx`**
   - Props: `children`, `tone?: 'dark' | 'light'` (default `light`), `icon?: LucideIcon`, `align?: 'left' | 'center'` (default `left` to match current layouts), `className?`.
   - Renders inline-flex row: `[laurel-left] [optional icon] [text] [laurel-right]`.
   - Laurel SVG: small inline component (~24×16px), one source, mirrored via `scale-x-[-1]` for the right side.
   - Tone classes drive text color + laurel `currentColor`.

2. **Replace inline eyebrows site-wide** with `<Eyebrow>…</Eyebrow>`. Scope of replacement (≈50 spots, found via `tracking-[0.2em] … text-brand`):
   - `src/routes/index.tsx` (7), `results.tsx` (6), `why-it-keeps-coming-back.tsx` (6), `areas.$areaSlug.tsx` (8), `areas.index.tsx` (1), `get-started.tsx` (2), `what-to-expect.tsx` (3), `resources.tsx` (2), `faq.tsx` (3), `how-it-works.tsx` (1), `solutions.$slug.tsx` (3), `solutions.mouse-violations.tsx` (1), `nj-rodent-violation.tsx` (2), `dohmh-rodent-violation-nyc.tsx` (1)
   - Components: `AboutSection.tsx` (1), `solutions/SolutionPrimitives.tsx` (3)
   - Pick `tone` per surrounding bg (dark sections → `tone="dark"`, light → default).
   - Hero pill on `areas.$areaSlug.tsx` line 66 (the rounded border + map-pin pill) → swap to `<Eyebrow tone="dark" icon={MapPin}>` and drop the wrapper pill.

3. **Leave alone**: `PressStrip.tsx` (a tiny 9px label inside a logo card — not a section eyebrow), all `components/ui/*` (shadcn primitives), and `solutions.ts` data file (string content, not a render).

## Out of scope
- No new eyebrows added anywhere.
- No copy changes.
- No layout / heading / spacing changes other than what the new component naturally produces.
- No backend, route, or data changes.

## Verification
- After edits: visual spot-check on `/`, `/areas/manhattan-ny`, `/get-started`, `/results`, `/solutions/restaurants` (covers both tones + icon variant + hero pill).
- Confirm no leftover `tracking-[0.2em] text-brand` eyebrow lines remain (single grep).
