## Scope
Home page only. No copy changes except the two specific edits you called out (Field Data intro paragraph, "NYC & NJ" → "NYC, NJ, & CA"). All other copy stays exactly as it is on cloakd-removals.cloud.

## 1. Above the fold

- **Eyebrow badges**: Rebuild `TrustBadges.tsx` to match your screenshot — laurel wreaths sit *outside* a translucent purple/violet pill. Inside the pill, two stacked lines: "4.9—STAR RATED BY" / "OPERATORS". Replace the current EPA shield badge with a second pill in the same visual treatment ("EPA-DESIGNATED / MINIMUM RISK"). Switch wreath SVG to a fuller, denser laurel that visually matches the reference (more leaves, thicker stroke).
- **Hero text contrast**:
  - Strengthen the hero background overlay (darker gradient over `hero-urban.jpg`) so all white text reads cleanly.
  - "We end that cycle." — bump to near-white (`text-white/95`) instead of muted.
  - All hero body copy → near-white.
- **Lead form card**:
  - Submit button label "Site Walkthrough & Program Estimate" — change button bg to brand royal-blue with white text (currently white/white = invisible).
  - Keep card white, inputs flat, ratings row beneath.

## 2. As Seen On (PressStrip)

- Replace text wordmarks with real logos from:
  - mypmp.net (Pest Management Professional)
  - pctonline.com (Pest Control Technology)
  - fox32chicago.com (Fox 32 Chicago)
  - nypost.com (NY Post)
  - agriculture.com (Successful Farming)
- Use `fetch_website` with `screenshot` + `html` to extract each site's logo asset URL, download to `src/assets/press/`, render as `<img>` with grayscale + opacity hover treatment matching nealrfg.

## 3. Field Data section — revert to original

Restore the exact 4 stats and copy from cloakd-removals.cloud Field Data block, omitting the last "90%" stat. Match section eyebrow + heading from the live site verbatim. (I'll fetch the live page in build phase to copy strings 1:1.)

## 4. CTA band copy edit (the only intentional copy change)

Replace current text with:

> **Start the program. Break the cycle.**
> The first visit covers setup, with monthly management and documented reporting running from there. The numbers are yours to show any regulator or property owner who asks.
> Serving food service operators and property managers across NYC and NJ, month-to-month, with results documented every cycle.

## 5. Service-area subhead

"Serving food-service operators and managed properties across NYC & NJ" → "Serving food-service operators and managed properties across NYC, NJ, & CA"

## 6. New About section (mirrors nealrfg structure)

Insert between Process and Service Grid (matching nealrfg's flow). Two-column layout:
- **Left**: cinematic photo of operator/technician in NYC alley setting (AI-generated).
- **Right**: eyebrow ("ABOUT CLOAKD"), H2, 2 paragraphs, 3-bullet checklist, CTA button.
- All copy pulled verbatim from existing Cloakd "About"/"Why Cloakd" content already on the live site — I'll scrape and reuse, no rewriting.

## 7. Reviews section — new component

Build `ReviewsGrid.tsx` using the 7 uploaded screenshots' **content** (quote, name, role/company) re-typed as React cards. Card layout matches nealrfg:
- White card, rounded, subtle shadow.
- **Top-right corner**: small platform logo (Walmart Marketplace, Amazon, generic farm/sanctuary/operator badges as icons).
- 5-star row in brand gold.
- Quote body.
- Name (bold) + role/company (muted) at bottom.

Platform logos: fetch Walmart and Amazon official wordmarks; the "Agricultural Customer / Sanctuary Operator / Pest Control Operator" badges become small inline SVG icon chips in brand colors.

## 8. Imagery plan (AI-generated, cinematic, consistent style)

Following nealrfg's image cadence, I'll generate:

| Slot | Image |
|---|---|
| Hero bg | Already exists (`hero-urban.jpg`) — regenerate slightly darker for contrast |
| About section | Operator with clipboard inspecting commercial kitchen line at dusk |
| Process section | Three small support images (inspection / deployment / reporting) OR one wide band image |
| Field Data band | Subtle dark texture/pattern background |
| CTA band | NYC skyline at blue hour, heavy darken |
| Service area cards | One reusable cityscape per region (NYC, NJ, Bay Area) — used as card thumbnails |

All images: cinematic, low-key, navy/cobalt/warm-gold color grading consistent with the Ratatouille palette.

## Technical notes

- Files to edit: `TrustBadges.tsx`, `LeadForm.tsx`, `PressStrip.tsx`, `routes/index.tsx`, `styles.css` (overlay tweak), `SiteFooter.tsx` (NYC/NJ/CA wording if mirrored).
- Files to create: `src/components/site/AboutSection.tsx`, `src/components/site/ReviewsGrid.tsx`, `src/assets/press/*.{svg,png}`, `src/assets/about-operator.jpg`, `src/assets/cta-skyline.jpg`, plus process/area images.
- Logo fetching: `fetch_website` for HTML, then `curl` to download each `<img>` src; fall back to homepage screenshot crop if a clean asset isn't linkable.
- Reviews data: typed array in `src/data/reviews.ts`.

## Out of scope
- No copy rewrites beyond the two listed edits.
- No new pages, no service-area template changes, no logo/brand mark changes.
- No backend.