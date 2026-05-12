## Plan

### 1. Hero background
- Copy `user-uploads://image-8.png` → `src/assets/hero-bait-station.jpg` (overwrite-safe new filename).
- In `src/routes/index.tsx`:
  - Replace `import heroImg from "@/assets/hero-urban.jpg"` with the new asset.
  - Bump background `opacity-40` → `opacity-60` for full-bleed presence; keep existing `bg-gradient-to-r from-ink via-ink/95 to-ink/85` overlay for legibility.
  - Keep og:image/twitter:image pointing at the new hero.

### 2. Review logo correction
- In `src/data/reviews.ts`: change the "5-0 Farm Hawaii" review's `source` from `amazon` to a new source `agricultural-farm` — OR simpler: keep types intact and instead **swap which card displays the 5-0 farm logo** by adding a per-review optional `logo` override.
- Simplest path: add optional `logoKey` field on `Review`. Set `logoKey: "five-o-farm"` on the 5-0 Farm Hawaii (amazon) card. Remove five-o-farm logo association from the `agricultural` source in `ReviewsGrid.tsx`.
- In `ReviewsGrid.tsx` `SourceLogo`:
  - Prefer `review.logoKey` if present.
  - Otherwise fall back to source mapping.
  - For `agricultural` (Village Farm Fresh) with no logoKey, render a `Sprout` lucide icon inside the white chip (no image).
- Keep Walmart, Amazon (default Tracy card), South County, Wild Horse Ranch chip logos as-is.

### Files
- Create: `src/assets/hero-bait-station.jpg`
- Edit: `src/routes/index.tsx`, `src/data/reviews.ts`, `src/components/site/ReviewsGrid.tsx`

### Out of scope
No copy changes, no other layout/token changes.
