## Plan

### 1. About section image
- Copy `user-uploads://About_Cloakd_Removals.png` → `src/assets/about-operator.jpg` (overwrite). `AboutSection.tsx` already imports that path, so no component edit needed.

### 2. Review platform logos
Copy uploaded logos into `src/assets/reviews/`:
- `walmart.png`, `amazon.png`, `south-county.png`, `five-o-farm.png`, `wildhorse.png`

Update `ReviewsGrid.tsx` `SourceLogo` to render an `<img>` inside the existing 56px white rounded chip (`object-contain p-1.5`) for: walmart, amazon, pest-control (South County), agricultural (5-O Farm), sanctuary (Wild Horse Ranch Rescue). Keep `residential` as the current Home lucide icon.

### 3. HOAs & Co-ops image
- Copy `user-uploads://HOAs_Co-ops.jpg` → `src/assets/who/hoas-coops.jpg`.
- In `WhoWeServeGrid.tsx`, replace the placeholder HOAs & Co-ops card with a real image card matching the others.

### Files
- Create: `src/assets/reviews/{walmart,amazon,south-county,five-o-farm,wildhorse}.png`, `src/assets/who/hoas-coops.jpg`
- Overwrite: `src/assets/about-operator.jpg`
- Edit: `src/components/site/ReviewsGrid.tsx`, `src/components/site/WhoWeServeGrid.tsx`

### Out of scope
No copy, token, or layout changes elsewhere.
