
## 1. Brand palette (from the Ratatouille reference)

The DVD art lives on a warm Parisian palette anchored by a deep cobalt oval, copper/terracotta architecture, golden window light, and a soft dusk sky. Translated into a credible pest-control brand it becomes:

| Token | Use | Value (approx) |
|---|---|---|
| `--ink` | Page background / hero / footer | `oklch(0.18 0.04 255)` — deep cobalt navy (the Disney•Pixar oval) |
| `--ink-foreground` | Text on ink | `oklch(0.97 0.01 85)` — warm off-white (parchment) |
| `--brand` | Primary accent / CTAs / numerals | `oklch(0.62 0.18 40)` — Ratatouille copper-terracotta |
| `--brand-foreground` | Text on brand | `oklch(0.98 0.01 85)` |
| `--brand-soft` | Tint for icon chips, badges | `oklch(0.94 0.04 60)` — warm cream |
| `--accent` | Secondary highlight (stat numerals, link hover) | `oklch(0.78 0.15 80)` — golden window-light |
| `--background` | Light page sections | `oklch(0.985 0.008 85)` — paper |
| `--surface` | Alternating section bands | `oklch(0.96 0.012 80)` |
| `--card` | Card surface | `oklch(1 0 0)` |
| `--border` | Hairlines | `oklch(0.9 0.01 80)` |
| `--muted-foreground` | Secondary copy | `oklch(0.45 0.02 260)` |

Why this works: **navy = trust/authority** (matches the reference site's dark hero), **copper = warmth + the Ratatouille rodent association** without being literal, **golden accent** keeps stats and hover states from feeling cold. Replaces the placeholder navy/blue currently in `src/styles.css`.

## 2. Service areas — add CA region

Update `src/data/serviceAreas.ts`:
- Add `region: "CA"` to the union.
- Add three entries: `san-francisco-ca`, `oakland-ca`, `san-jose-ca` with the same shape as `manhattan-ny` (intro, localProof, neighborhoods, faqs, nearbyAreas).
- Append the same three to the home-page Service Areas grid.

## 3. nealrfg.com 1:1 audit — deltas to fix on home

Re-screenshotted the reference. What we still don't match:

1. **Top bar** — reference shows `Roofing License: #CCC1332869   📞 (561) 473-0192` centered on a flat blue band. Ours diverges. Replace with `Licensed & insured · NYC DOHMH program-aware   📞 (XXX) XXX-XXXX`, same centered layout, on `--brand` (copper) band.
2. **Header** — logo left, nav centered with chevron dropdowns (Services ▾, Roof Types ▾), text links (Locations, Financing, Gallery, Blog, FAQs, Refer a Friend), and a **pill phone button with arrow icon** on the right. Ours doesn't match this layout.
3. **Above-the-fold trust badges** — reference renders **two horizontal badges with circular icon + two-line label** *above* the H1: `🏆 4.9-STAR RATED BY 800+ CUSTOMERS` and `🛡 50-YEAR PRODUCT WARRANTIES`. We currently have a chip row *below* the H1 — wrong placement, wrong shape. Move above H1, restyle as icon+two-line badge pair.
4. **H1 accent word** — reference colors the last word in brand color (`in Florida`). Ours already does this — keep.
5. **Service chip row under hero copy** — reference shows three dark rounded pills with check icons: `✓ Roof Replacement   ✓ Roof Repair   ✓ Roofing Services`. Ours has CTA buttons + phone link. Replace with three check-pills using our service categories (`✓ Fertility Control`, `✓ Knockdown Integration`, `✓ Monthly Reporting`). Keep the phone link in the header pill, not the hero.
6. **Lead form card** — reference uses a **light card on the dark hero** with: Service select → Address → Name → Email → Phone → tiny consent paragraph + checkbox → full-width primary CTA → **review badge strip inside the card** (Google ★ 4.9 · Facebook ★ 4.9 · BBB Rated). Our `LeadForm` is close but missing the consent block and the inline review-badge footer.
7. **"As seen on" logo wall** — reference places a press-logo strip immediately after the hero. We currently have a "Cities already deploying" strip there. Replace that section with an "As featured in / works alongside" logo wall (NYC DOHMH program references, Pestworld, NPMA, BBB — placeholder logo slots).
8. **Section bands** — reference alternates pure white and very light gray. Our `bg-surface` is fine; just make sure the cadence matches: hero(dark) → press(white) → stats(white) → process(gray) → services(white) → who(gray) → areas(white) → testimonials(gray) → FAQ(white) → CTA(dark) → footer(dark).
9. **CTA band before footer** — reference has a dark full-bleed band with a centered headline + single primary CTA + phone. Confirm we match.
10. **Footer** — reference has 4 columns: brand+blurb+contact, Services, Locations, Company. Confirm column structure matches.

## 4. Out of scope

Logo redesign, copy rewrites, inner service pages, real press logos (placeholder slots only), real phone number (stub until provided).

## 5. Files touched

- `src/styles.css` — replace token values with the Ratatouille palette above.
- `src/components/site/SiteHeader.tsx` — top bar content, nav layout, phone pill.
- `src/components/site/LeadForm.tsx` — field order, consent block, in-card review badges.
- `src/routes/index.tsx` — trust-badge pair above H1, service check-pills, replace city strip with press-logo wall, append CA cities to areas grid.
- `src/data/serviceAreas.ts` — add 3 CA entries + `"CA"` region.

After implementation I'll screenshot the home and diff against nealrfg.com to confirm structural parity.
