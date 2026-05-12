## Plan

Reduce the dark overlay strength on the hero in `src/routes/index.tsx` so the background image reads more clearly while keeping headline/CTA contrast.

### Change
- Line 207: bump background image from `opacity-60` → `opacity-80` (image more visible).
- Line 214: soften gradient overlay from `from-ink via-ink/95 to-ink/85` → `from-ink/80 via-ink/70 to-ink/40` (darker on the left where text sits, fading to mostly-clear on the right).

### Files
- Edit: `src/routes/index.tsx`

### Out of scope
No copy, layout, asset, or token changes.
