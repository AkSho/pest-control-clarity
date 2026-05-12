# Inline Image Implementation Plan (v2)

Wire 9 user-provided images into audited pages as full-width inline figures with italic captions, matching the nealrfg.com editorial feel. Closest-fit substitution for any remaining gaps.

## Asset inventory

Copy uploads to `src/assets/inline/` with stable names:

| File | Source | Concept |
|---|---|---|
| `evolve-soft-bait.jpg` | image-9.png | Evolve bucket + soft-bait pieces |
| `snap-trap.jpg` | image-10.png | Snap trap close-up |
| `operator-contrapest-station.jpg` | image-11.png | Gloved operator at ContraPest station |
| `nyc-mitigation-zone-map.jpg` | image-12.png | NYC Rat Mitigation Zone map |
| `monitoring-report.jpg` | monitoring_report.png | Floor-plan monitoring report |
| `pco-operator-field.jpg` | pco.png | PCO servicing station, clipboard visible |
| `contrapest-vs-evolve.jpg` | contrapest_vs._evolve.png | Side-by-side product diptych |
| `basement-pipe-audit.jpg` | audit.png | Operator inspecting basement plumbing with flashlight |
| `restaurant-snap-trap.jpg` | audit_2.png | Snap trap on bar back-of-house mat |

## Reusable component

Create `src/components/site/InlineFigure.tsx`:
- Props: `src`, `alt`, `caption`, optional `priority`
- Semantic `<figure>`, full-width within the article column
- Image: `rounded-lg`, `border border-border`, `object-cover`, natural aspect or `aspect-[16/9]` cap
- `<figcaption>`: small italic `text-muted-foreground`, top-margin spacing
- Lazy-load by default; `loading="eager"` when `priority`
- Pure presentation — semantic tokens only

## Page-by-page placements

### Tier 1 — long-form SEO

**`/evolve-rodent-birth-control`**
1. After intro: `evolve-soft-bait.jpg` — *"Evolve soft bait — ready-to-use, no mixing, no liquid reservoir."*
2. Mid-page: `contrapest-vs-evolve.jpg` — *"ContraPest's liquid system (left) and Evolve's soft bait (right)."*
3. Field results: `operator-contrapest-station.jpg` — *"NYC service visit — additive deployment in an existing station."*

**`/contrapest`**
1. Hero-adjacent: `nyc-mitigation-zone-map.jpg` — *"NYC Rat Mitigation Zones — where fertility control delivers the most leverage."*
2. Product section: `contrapest-vs-evolve.jpg` — *"ContraPest liquid bait alongside Evolve soft bait — both EPA-registered contraceptives."*
3. Service section: `operator-contrapest-station.jpg` — *"Operator servicing a ContraPest station during a scheduled visit."*

**`/contrapest-vs-evolve`**
1. Top of comparison: `contrapest-vs-evolve.jpg` — *"Side-by-side: ContraPest dispenser system vs. Evolve soft-bait packaging."*
2. Field-conditions section: `operator-contrapest-station.jpg` — *"Field service in NYC outdoor conditions."*

**`/does-rat-birth-control-work`**
1. Early: `basement-pipe-audit.jpg` — *"Placement starts with the audit — finding entry points, runways, and harborage."*
2. Mid: `monitoring-report.jpg` — *"Monitoring data: bait stations, inspection points, and activity hotspots tracked per visit."*

**`/how-it-works`**
1. Method comparison: `snap-trap.jpg` then `evolve-soft-bait.jpg` (stacked figures) — *"Lethal snap trap (above) vs. Evolve soft bait (below) — different mechanisms, different outcomes."*
2. Service section: `pco-operator-field.jpg` — *"Scheduled service: inspect, document, replenish."*
3. Reporting section: `monitoring-report.jpg` — *"Every visit produces a structured monitoring report."*

### Tier 2 — `/vs/*` comparison pages

One inline figure per page, placed after the comparison-table intro:

- **`/vs/rat-poison`** — `evolve-soft-bait.jpg` — *"Evolve is a contraceptive soft bait — non-lethal, no anticoagulants."*
- **`/vs/traditional-pest-control`** — `basement-pipe-audit.jpg` — *"Traditional pest control inspects and treats; fertility control adds population suppression on top."*
- **`/vs/snap-traps`** — `restaurant-snap-trap.jpg` — *"Snap traps remove individuals one at a time; fertility control reduces the next generation."*
- **`/vs/diy-rat-birth-control`** — `pco-operator-field.jpg` — *"Scheduled professional service — placement, dosing, and reporting."*
- **`/vs/orkin`**, **`/vs/assured-environments`**, **`/vs/bell-environmental`**, **`/vs/viking-pest-control`**, **`/vs/western-pest-services`** — share `operator-contrapest-station.jpg` — *"Cloakd deploys as an additive layer inside your existing vendor's program."*

## Out of scope

- Tier 3 pages — no inline images this pass
- Hero replacements — heroes stay as-is
- OG/social images — separate pass
- New AI-generated imagery — using only the 9 provided uploads

## Technical notes

- Assets under `src/assets/inline/`, imported as ES6 modules
- `InlineFigure` uses semantic tokens only (`border-border`, `text-muted-foreground`)
- Figures live between content sections, never inside cards or tables
- Maintain editorial whitespace per nealrfg.com reference
