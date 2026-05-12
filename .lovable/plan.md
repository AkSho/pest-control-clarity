## Goal

Replace the current "AI-built" feel of cloakd-removals.cloud with a polished, conversion-focused design language modeled on nealrfg.com, while preserving the existing SEO copy. This round delivers:

1. A new design system (tokens, type, components) ready for the rest of the site
2. A new home page that mirrors nealrfg.com's section composition 1:1, populated with Cloakd's existing copy
3. One data-driven service-area template + one example route to validate the SEO pattern

Service-area pages at scale, blog, gallery, and inner service pages are explicitly out of scope for this round.

## Prerequisites (you do these)

1. Connect this Lovable project to your public GitHub repo via the Plus (+) menu → GitHub → Connect project so I can read the live source, copy, and current routes.
2. Send brand color inspo (palette references, hex values, or a screenshot). Until that arrives I'll work against placeholder tokens and swap them in once you confirm.

## Design system

Tokens defined in `src/styles.css` using `oklch`, mirroring Neal's structure:

- **Surfaces**: deep navy/near-black hero bg, light neutral page bg, white cards, subtle borders
- **Accent**: single strong action color (TBD from your inspo) used for CTAs and key highlights
- **Type**: bold sans display for headlines (e.g. Inter/Geist tight tracking), readable sans for body; large H1, generous line-height
- **Radius**: medium (Neal uses ~12–16px on cards and inputs)
- **Shadows**: soft elevation on the lead-form card and floating CTA
- **Component variants**: primary/secondary/ghost buttons, input, select, card, badge, pill, list-check, accordion (FAQ), star-rating row, "as seen on" logo strip

Reusable building blocks added under `src/components/site/`:
`SiteHeader`, `SiteFooter`, `TopBar` (license + phone), `LeadForm`, `Hero`, `LogoStrip`, `ServiceCard`, `ServiceGrid`, `LocationsSection`, `ProcessSteps`, `TestimonialsRow`, `FAQ`, `CTASection`, `TrustBadges`.

## Home page composition (mirrors nealrfg.com 1:1)

Order, swapped to Cloakd's existing copy:

1. Top utility bar: credential/license line + click-to-call phone
2. Sticky header: logo, primary nav (Services, Service Areas, About, FAQ, Blog), phone CTA button
3. Hero (dark): headline + subhead, two CTA buttons, trust chips ("4.9★", credentials), inline lead form card on the right
4. "As seen on" / credibility logo strip
5. Stat row (use Cloakd's 79% / 88% / 90% existing stats, restyled as Neal's stat cards)
6. Services grid (3–4 cards: fertility control program, inspection, exclusion, ongoing monitoring — mapped from current site)
7. Service areas section: NYC & NJ map/list with linked sample area
8. "How it works" / process steps (use the existing 4-step cycle-break narrative, restyled as Neal's process)
9. Why-us / differentiators (Neal's value-prop band)
10. Testimonials row
11. FAQ accordion (port existing FAQs)
12. Final CTA band (dark, accent button, phone)
13. Footer: NAP, services, areas, legal, social

Slop-sweep rules (per design directives): no extra "trusted by" filler, no duplicate CTAs Neal doesn't have, no decorative icons that don't appear in the reference, restrained motion only.

## Service-area template (data-driven)

- Route: `src/routes/areas.$areaSlug.tsx` (TanStack file-based, dynamic param)
- Data: `src/data/serviceAreas.ts` exporting an array of `{ slug, city, state, neighborhoods[], heroImage, intro, localProof, faqs[], nearbyAreas[] }`
- One sample entry built end-to-end (e.g. `manhattan-ny`) so you can see the template render at `/areas/manhattan-ny`
- Page composition: localized hero, local stat/proof, services offered in the area, local process, neighborhoods served list, area-specific FAQs, CTA + footer
- `head()` per route generates SEO-correct `<title>`, `description`, `og:title`, `og:description`, canonical from the data record — matching the SEO-template pattern Neal uses for their location pages
- Adding a new city later = add a new entry to the data file (no new route file)

## Out of scope this round

- Inner service detail pages, blog, gallery, financing, refer-a-friend
- CMS wiring for service areas
- Form backend (lead form will post to a stub handler; Cloud wiring comes in a follow-up if you want it)
- Logo redesign

## Technical notes

- TanStack Start file-based routes under `src/routes/` (no `src/pages/`)
- Tailwind v4 via `src/styles.css` `@theme inline` — all colors as semantic tokens, never raw hex in components
- Each route defines its own `head()` (no shared metadata)
- Images: use existing Cloakd assets where available; placeholders flagged as `data-lov-image-placeholder` for any net-new hero/stat imagery so I can generate them in a follow-up pass

## Deliverable checklist

- [ ] GitHub connected, repo synced
- [ ] Brand color tokens applied from your inspo
- [ ] `src/styles.css` tokens + base components
- [ ] `src/routes/index.tsx` rebuilt to Neal's 1:1 composition with Cloakd copy
- [ ] `src/data/serviceAreas.ts` + `src/routes/areas.$areaSlug.tsx` with 1 sample area live
- [ ] Header/footer shared via `__root.tsx` layout
- [ ] Per-route `head()` metadata on home and sample area page
