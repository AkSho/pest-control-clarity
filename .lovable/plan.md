## Goal

Rebuild the four pages so the **structure** mirrors the closest nealrfg.com layout for each, while the **copy** comes verbatim from cloakd-removals.cloud.

## Reference mapping (nealrfg page → our page)

| Our page | nealrfg reference | Why it fits |
|---|---|---|
| `/why-it-keeps-coming-back` | nealrfg **homepage** long-form pattern | Both narrate a problem across alternating image-left / image-right sections with stat strips, testimonial pull, and CTA bands. Best fit for The Problem's territorial-behavior + cycle storytelling. |
| `/results` | nealrfg **homepage** "What makes us stand out" + features grid + press strip | Stat-first, dark/light alternating bands, "As seen on" logo row maps to SenesTech / municipal program attribution. |
| `/faq` | nealrfg **`/faqs`** | Identical use case: simple hero header → single-column accordion of every Q&A → contact block at bottom. |
| `/resources` | nealrfg **`/blog`** | Image-card grid (3 columns), each card = cover image + category + title + 2–3 line blurb + "Read more →". |

## 1. `/why-it-keeps-coming-back` — nealrfg-home long-form pattern

Sections, top to bottom (all copy verbatim from live cloakd `/why-it-keeps-coming-back`):

1. **Hero** — split layout (left: eyebrow "Why it keeps coming back", H1, lede, dual CTA; right: lead form). Same as today, refresh hero image.
2. **Press / trust strip** — keep `HeroTrustBadges`. Add a thin row mirroring nealrfg's "As seen on" — sources we cite (SenesTech, NYC DOHMH, Baltimore Public Health, Chicago) as text/badges.
3. **Image-right band** — "What's actually happening" → "City rats are territorial..." (3 paragraphs). Photo column on right.
4. **Two-card row** — "How they know the territory is open" + "Why food makes it faster" + a third small card "Why inspections are a timing problem" (3 cards, mirroring nealrfg's 3-up "stand out" grid).
5. **Image-left band** — "Why NYC and NJ hit harder" — H2 + lede on right, photo + 3 sub-cards stacked on left (The subway / Underground utilities / Shared foundations).
6. **Full-width dark band** — "The full cycle" — 5-step horizontal timeline (Treatment applied → Territory empties → New group moves in → Colony rebuilds → Cycle resets). Numbered ovals like nealrfg's services row.
7. **Image-right band** — "What actually breaks the cycle" — H2 + 2 paragraphs + Bryant Park sentence (link goes to `/resources` until `/does-rat-birth-control-work` exists).
8. **Stat strip** — 79% / 88% / 90% — same visual treatment as nealrfg's "4.9 STAR RATED / 50-YEAR WARRANTIES" strip but with our numbers.
9. **FAQ accordion** — 6 Qs from live ("Doesn't sealing entry points solve it?" through "How long before the population goes down?").
10. **CTA band** — keep current.

## 2. `/results` — nealrfg-home features + press pattern

Sections (copy verbatim from live `/results`):

1. **Hero** — split (left text + dual CTA, right form). Refresh image.
2. **Headline H2 band** — "Two buildings. Five months. Here's what happened to the rat population." Centered intro paragraph.
3. **Location A block** — image-left, copy-right. Three stat tiles (79% / 88% / 5 months) below the copy. Interpretive paragraph ("79% and 88% measure different things…"). SenesTech Feb 18 2026 source link.
4. **Location B block** — image-right (mirrored), copy-left. Two stat tiles (50%+ / 71%) + paragraph. **Fixes current wrong "79%+" stat.**
5. **Stat strip** — full-width "Up to 90% fertility reduction potential" with the explainer paragraph (same visual rhythm as nealrfg's "50-YEAR WARRANTIES" strip).
6. **Two-card row** — Hong Kong (June 2025) + San Francisco (June 2025) deployment cards, each with SenesTech June 26 2025 source link.
7. **Pull quote band** — Joel Fruendt / SenesTech CEO quote, dark background.
8. **City-level adoption** — 3 cards (NYC / Baltimore / Chicago) using rewritten live copy (NYC bill Oct 2024 → ContraPest April 2025; Baltimore via public health dept; Chicago Wicker Park through early 2026).
9. **Methodology band** — image-left, ordered 4-step list right (Week 1 baseline → Month 1 check-in → Month 2 check-in → 90-day summary).
10. **CTA band** — keep.

## 3. `/faq` — nealrfg `/faqs` pattern

Replace current 4-group structure with the live `/questions` content in nealrfg's flat layout:

1. **Hero** — eyebrow "Common questions", H1 "Your exterminator has probably seen this fail. Here's what went wrong.", lede paragraph. Centered.
2. **Lead question block** — bold "My pest control company told me rat birth control doesn't work. Are they right?" + full 2-paragraph answer (not in accordion — featured prominently like nealrfg's first FAQ on `/faqs`).
3. **Three sub-blocks** (h3 cards, single column, mirrors how nealrfg lists FAQs as flat sections): What PCOs have seen fail / What the two-phase program does differently / Who's running it at scale.
4. **"More questions" accordion** — flat single-column accordion with the 7 live Qs verbatim:
   - "This doesn't kill anything. I have rats right now…"
   - "I've read about people trying this for months…"
   - "Doesn't cottonseed need to make up a large percentage…"
   - "I've read that the fertility effects are reversible…"
   - "Some cities tested the SenesTech liquid product…"
   - "How is this different from just buying Evolve on Amazon…"
   - "Is this safe around food? We're a restaurant."
   - "90 days feels like a long time to wait…"
5. **Field-data trio** — 79 / 88 / 90 stat strip with SenesTech source link.
6. **Contact block + CTA** — phone, email, lead form (same shape as nealrfg's contact block on `/faqs`).

## 4. `/resources` — nealrfg `/blog` pattern

Replace current 6 "request the PDF" cards with a real content index:

1. **Hero** — eyebrow "Resources", H1 "How urban rodent control actually works.", lede.
2. **"Start here" featured row** — 3 large cards (image cover + category eyebrow + title + 2–3 line blurb + "Read more →"):
   - "Why rodents keep coming back after treatment" → `/why-it-keeps-coming-back`
   - "How the 90-day fertility management program works" → **Coming soon** (no `/how-it-works` route yet, dimmed card, no link)
   - "Your exterminator has probably seen this fail. Here's why." → `/faq`
3. **"By topic" grid** — 3-column blog-style cards (image + category + title + blurb + link). Same card shell as nealrfg `/blog`. Cards we render:
   - Field Data → `/results` ✓
   - Restaurants → `/solutions/restaurants` ✓
   - Property Management → `/solutions/property-managers` ✓
   - Ghost Kitchens → `/solutions/ghost-kitchens` ✓
   - All other live cards (Comparisons vs traditional/poison/snap-traps/DIY/Assured/Orkin/Bell/Viking/Western, Research, DOHMH NYC, NJ rodent violation, Mouse violations 04L, Program "What to expect") → render as **Coming soon** dimmed cards with the live blurb so structure is honest.
4. **CTA band** — keep.

## 5. Hero imagery (placeholder, AI-generated)

Generate one 16:9 image per page, photographic, NYC/NJ urban rodent context, palette compatible with `ink-section`:

- `/why-it-keeps-coming-back` → dim NYC alley with overflowing dumpsters at dusk
- `/results` → monitoring clipboard / track plate at industrial baseboard
- `/faq` → restaurant back-of-house corridor, evening
- `/resources` → stacked field reports / clipboard on desk

Files: `src/assets/hero-problem.jpg`, `hero-results.jpg`, `hero-faq.jpg`, `hero-resources.jpg`. Used as low-opacity backdrop layer behind hero copy; trivial swap when you supply real photos. Plus ~6 small inline body photos for resource cards (or solid-token gradient placeholders if generation budget is tight).

## 6. Out of scope (flagged)

- Net-new routes: `/how-it-works`, `/does-rat-birth-control-work`, `/what-to-expect`, `/vs/*`, `/dohmh-rodent-violation-nyc`, `/nj-rodent-violation`, `/solutions/mouse-violations`. Referenced as "Coming soon" cards on `/resources` only.
- Renaming `/faq` → `/questions` or `/resources` → `/blog` (you said unimportant).
- Header, footer, home page, solutions pages, lead-form backend.

## Technical notes

- All copy lifted verbatim from the cloakd-removals pages already fetched.
- Layout primitives: existing `ink-section`, `bg-surface`, `bg-card`, `text-brand`, `text-accent-warm`, `shadow-[var(--shadow-card)]`, `container-site`. No new tokens.
- Alternating image bands use `md:grid-cols-[1.1fr_0.9fr]` and reverse with `md:[direction:rtl]` or `md:order-*` per band.
- Accordions reuse shadcn `Accordion`.
- Coming-soon cards: same card shell, `aria-disabled`, muted text, `cursor-not-allowed`, no `<Link>`.
- Source links open in new tab.
- Each route's `head()` updated with new H1-aligned title + description.
