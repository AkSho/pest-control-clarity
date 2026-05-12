# Refinement plan

## 1. Fix "Site Walkthrough & Program Estimate" contrast

Cause: the heading uses `text-foreground`. The form sits on `bg-card`, but currently the `--foreground` and `--card` tokens both resolve close to white in this section, making text invisible.

Fix in `src/components/site/LeadForm.tsx`:
- Change the heading to `text-ink` (dark cobalt) so it's legible on the white card regardless of theme inheritance.
- Apply the same to the "Schedule your FREE" line (use `text-ink/70`) and the "FREE" emphasis (`text-ink`).
- Verify in preview after edit.

No global token changes — scoped fix only.

## 2. Hero eyebrow badges → match reference screenshot

Rebuild `src/components/site/TrustBadges.tsx`:
- Remove the violet/blurred pill background entirely.
- Render plain bold white uppercase text directly on the hero, flanked by white laurel SVGs (cleaner, fuller leaves like the screenshot).
- Two badges side by side:
  - Laurels + "4.9—STAR RATED BY / OPERATORS"
  - Shield-check icon + "EPA-DESIGNATED / MINIMUM RISK" (replace second laurel pair with a shield to mirror the reference's mixed badge styles)
- Tighter typography: `font-display`, `font-extrabold`, `tracking-tight`, two stacked lines.

## 3. Review cards — logo on the left, larger

Update `src/components/site/ReviewsGrid.tsx`:
- Move platform logo from top-right to top-left of each card.
- Increase logo size (≈48–56px square chip) so it reads as a proper brand mark, not a tiny badge.
- Keep the 5-star row, quote, and name/role layout below.

## 4. "Who We Serve" image grid (new section, replacing existing icon-only WHO grid)

Mirror nealrfg's services grid: large photo cards with a label and short description overlaid or beneath.

Copy uploaded images into `src/assets/who/`:
- `Restaurants.png` → restaurants.jpg
- `Ghost_Kitchens.png` → ghost-kitchens.jpg
- `Food_Storage_Cold_Chain.png` → cold-chain.jpg
- `Residential.png` → residential.jpg
- `Property_Managers.png` → property-managers.jpg

Create `src/components/site/WhoWeServeGrid.tsx`:
- Responsive grid (1 col mobile / 2 col tablet / 3 col desktop).
- Each card: tall image (aspect ~4:3), dark gradient overlay at bottom, white title + one-line tagline. Hover: slight zoom on image.
- Pull existing copy from current `WHO` array (no copy changes) — just match titles to images. Keep HOAs & Co-ops as a 6th card using a placeholder/neutral image OR omit until user provides one.

Replace the existing WHO section in `src/routes/index.tsx` with the new component. Keep the section heading/eyebrow as-is.

## 5. Open item

HOAs & Co-ops currently has no uploaded image. Plan: render it as a card with a neutral dark gradient + icon (no photo) until you provide an image. The user said "more shortly," so this stays a placeholder card matching the others' dimensions.

## Files

Edit:
- `src/components/site/LeadForm.tsx`
- `src/components/site/TrustBadges.tsx`
- `src/components/site/ReviewsGrid.tsx`
- `src/routes/index.tsx`

Create:
- `src/components/site/WhoWeServeGrid.tsx`
- `src/assets/who/*.jpg` (5 copied uploads)

## Out of scope

No copy changes, no new routes, no other section restructures, no token/theme rewrites.
