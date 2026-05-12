# Refinement Pass — Palette + nealrfg Congruency

No copy changes. Visual + structural only.

## 1. Brand palette — "Ratatouille"

Pulled from the DVD cover: deep cobalt navy (oval), warm cream/gold (title type + window light), terracotta red (tomato), soft sky.

Tokens in `src/styles.css` (oklch):
- `--ink` (dark surfaces / header / hero / footer): deep cobalt navy ≈ `oklch(0.22 0.09 260)` — matches the oval.
- `--brand` (primary CTA / accent): bright royal blue ≈ `oklch(0.55 0.21 262)` — the "Pixar" lift on navy.
- `--brand-soft`: pale cream-blue tint for soft backgrounds.
- `--accent-warm` (NEW): warm gold/cream ≈ `oklch(0.86 0.11 85)` — used sparingly for "Free", underlines, highlight words.
- `--accent-tomato` (NEW): terracotta red ≈ `oklch(0.62 0.18 30)` — used for the top bar "license/phone" strip and small badges (rare).
- Page background stays near-white; `--surface` slightly cooler.
- Dark mode tokens updated to match.

## 2. nealrfg congruency gaps to close (home page only)

Identified by side-by-side review of `nealrfg.com`:

1. **Top bar** — solid royal-blue band (not muted). Left: "Pest Control License: #XXXXXXX" (placeholder #). Right: phone with phone icon. White text, full-width.
2. **Header** — dark navy bar, logo left, text nav center, bright blue pill CTA right with arrow icon.
3. **Hero trust badges** — replace current small chip row. Use nealrfg's two-badge layout above the H1:
   - Left: laurel-wreath frame around "4.9★ — operator reviews" style block.
   - Right: shield icon + two-line "EPA-DESIGNATED / MINIMUM RISK" block.
   - Built with inline SVG (laurel + shield) — no new image gen needed.
4. **Hero service pills** — three rounded dark pills with check icons under the hero paragraph: "Fertility Control", "Site Inspection", "Monthly Reporting" (using existing service titles, no new copy).
5. **Hero lead form** — restyle as elevated card on dark hero with: "Schedule your **FREE**" eyebrow, "Site Walkthrough Today!" headline, inputs styled flat-white, full-width primary CTA, fine-print legal line, and a **G / Facebook / BBB ratings row** beneath the submit (icon + "4.9 RATING" stack ×3). All using existing form fields — no new data captured.
6. **"As seen on" press strip** — NEW section directly under hero with 4–5 grayscale press/association logos (placeholder marks: NYC DOHMH-style, Eater, Crain's, Time Out, BBB). Pure visual, no copy change.
7. **Section rhythm** — confirmed mirrors nealrfg: hero → press → stats → process → services → who/audience → locations → testimonials → FAQ → CTA band → footer. Current order matches; only visual polish needed on each band's eyebrow/heading scale to match nealrfg's tighter type ramp.
8. **CTA band** before footer — convert to full-bleed navy with cream-gold underline accent on the key noun (no copy change).
9. **Footer** — nealrfg uses dark navy with column layout (Company / Services / Locations / Contact) + license line + socials. Restructure to match.

## 3. Service-area cities

Update `src/routes/index.tsx` city grid AND `SiteFooter` locations column to add:
- San Francisco, CA
- Oakland, CA
- San Jose, CA

Add matching entries to `src/data/serviceAreas.ts` so the `/areas/$areaSlug` template resolves for each (slug: `san-francisco-ca`, `oakland-ca`, `san-jose-ca`). Reuse the existing Manhattan record's structure with city/state/region="CA" swapped — no new copy authored beyond city/state/neighborhood labels.

Also: update the "Cities already deploying fertility control" strip (currently NYC / Baltimore / Chicago / Wicker Park) to reflect the actual service footprint — confirm before edit.

## 4. Out of scope (unchanged)

- All marketing copy stays exactly as written.
- No new pages, no inner service pages, no blog/gallery/financing.
- Logo not redesigned (placeholder wordmark stays).
- LeadForm submission behavior unchanged.

## Technical notes

- Tokens: extend `@theme inline` with `--color-accent-warm` and `--color-accent-tomato`; map to new CSS vars in `:root` and `.dark`.
- Trust badges: inline SVG components in `src/components/site/TrustBadges.tsx` (laurel + shield), consumed by hero.
- Press strip: `src/components/site/PressStrip.tsx` with monochrome inline SVG marks.
- Ratings row: `src/components/site/RatingsRow.tsx` (G / FB / BBB icons via lucide + simple inline SVG).
- LeadForm: restyle internals only; no prop/API changes.
- Service area data: extend `SERVICE_AREAS` array; route file unchanged.
