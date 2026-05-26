# Current Site SEO Audit

Audit date: 2026-05-26  
Scope: local code inspection only. No live crawl, no GSC data, and no page copy rewrites were performed.

## Executive Read
Cloakd has a strong raw content base for the Evolve / rodent fertility control pivot, but the site architecture still carries the earlier managed-service model. The biggest issue is not lack of content. It is mixed intent: ecommerce PDPs exist, but many high-authority pages, nav labels, CTAs, and page titles still steer users toward a program, walkthrough, or service-area model.

Do not rewrite PDP body copy yet. The PDPs should be preserved while technical SEO and internal linking are cleaned up around them.

## Highest Priority Findings

1. **PDP canonicals and schema URLs were stale**
   - `src/routes/products.starter-kit.tsx`
   - `src/routes/products.refill.tsx`
   - Both referenced the old Lovable preview domain in canonical, OG URL, and Product offer URLs.
   - Status: fixed in the first technical cleanup pass.
   - Recommendation: do not rewrite PDP body copy until the user reviews a proposed diff.

2. **Most indexable pages do not define self-referencing canonicals**
   - Only Rodent Radar pages and PDPs currently show route-level canonical handling in the inspected files.
   - Status: fixed in the first technical cleanup pass for intended indexable static routes, dynamic area routes, and dynamic solution routes.
   - Recommendation: keep canonicals as a required checklist item on every new route.

3. **Homepage is still service/program-first**
   - Current title: `Cloakd Removals — NYC & NJ Rodent Fertility Control`.
   - H1: `Every six weeks, the rodents are back. We end that cycle.`
   - Hero and form language still heavily imply service deployment and lead capture.
   - Recommendation: conversion copy proposal later. Do not change immediately. Homepage needs an ecommerce-first positioning decision: specialist source for Evolve kits/refills, with deployment expertise as the differentiator.

4. **Top navigation still reinforces the old service model**
   - Primary nav includes `Program`, `Solutions`, `Compliance`, `Areas`, and a `Get Started` CTA to the starter kit.
   - There is no explicit desktop `Shop` nav group, though footer has a `Shop` column.
   - Recommendation: light SEO/UX adjustment after PDP audit. Consider making product purchase intent more explicit in nav.

5. **Many pages target service/commercial operator intent**
   - The existing solution, area, compliance, and competitor pages are useful, but many are framed around managed programs, inspections, monthly reporting, or service areas.
   - Recommendation: reposition, not delete by default. Keep pages that support Evolve trust, deployment education, or commercial proof; move their CTAs toward product purchase where appropriate.

6. **Schema opportunity is large**
   - PDPs have Product schema.
   - Rodent Radar has WebApplication/Dataset-style schema.
   - Status: first low-risk schema pass completed for BreadcrumbList on core commercial/education pages and FAQPage on visible FAQ pages.
   - Recommendation: only add more schema where it directly matches visible content. Do not treat schema as the main ranking lever.

7. **There may be intent overlap/cannibalization**
   - Possible overlap among:
     - `/evolve-rodent-birth-control`
     - `/rodent-fertility-control`
     - `/does-rat-birth-control-work`
     - `/why-it-keeps-coming-back`
     - PDP copy
   - Recommendation: map each to one primary intent before creating new pages.

## PDP Preservation Audit

### `/products/starter-kit`
Current role: primary ecommerce conversion page for starter kits.

Observed strengths:
- Dedicated ProductPage component.
- Variant support.
- Product schema exists.
- Above-fold product gallery and buy box.
- H1 is product title from `BuyBox`.
- Strong buyer modules: how it works, field results, reviews, comparison, FAQ, order CTA.

Issues:
- Stale canonical / OG URL / Product offer URLs.
- Title may be decent but should be evaluated against SERP target terms.
- Product schema likely needs canonical production URLs and possibly more complete offer data.
- PDP anchor nav exists only on PDP pages, which is good for buyers.

Recommendation label: **technical fix only first**.

Do not:
- rewrite hero copy
- remove reviews
- change offer structure
- change variant logic
- change safety claims

### `/products/refill`
Current role: primary ecommerce conversion page for refills.

Observed strengths:
- Shared ProductPage component.
- Variant support for rat and mouse refill SKUs.
- Product schema exists.
- Replenishment-plan UX exists in `PlanSelector`.
- H1 is product title from `BuyBox`.

Issues:
- Stale canonical / OG URL / Product offer URLs.
- Title combines rat and mouse; may need careful testing later, but no body rewrite now.
- Refill-specific search demand is unclear from Semrush connector; keep variant language in PDP copy for now.

Recommendation label: **technical fix only first**.

## Homepage Audit

Path: `/`  
Recommendation label: **conversion copy proposal later**

Current role:
- Service/program lead-gen homepage for NYC/NJ rodent fertility control.

Future role:
- Ecommerce-first home for buying Evolve with deployment guidance.

Keep:
- core replacement-cycle concept
- trust badges and proof modules
- field-result framing if sourced
- lead form only if it does not crowd product purchase

Likely change later:
- title/H1 should more clearly position Cloakd as an Evolve specialist source.
- hero CTA should make product purchase obvious.
- product links should appear earlier.
- service/program language should become support context, not the main offer.

## Existing Page Classification

### Keep As-Is For Now
- `/payment-confirmed`
- `/thank-you`
- `/rodent-radar/attribution`
- `/rodent-radar/terms`

### Technical Fix Only First
- `/products/starter-kit`
- `/products/refill`
- `/rodent-radar`
- `/rodent-radar/rat-pressure-map`
- `/rodent-radar/rodent-population-calculator`
- `/rodent-radar/hantavirus-risk-checker`

### Light SEO Adjustment
- `/contrapest-vs-evolve`
- `/contrapest`
- `/evolve-rodent-birth-control`
- `/does-rat-birth-control-work`
- `/why-it-keeps-coming-back`
- `/resources`
- `/faq`

These already support the Evolve/SenesTech topic cluster, but need clearer ecommerce/internal-link roles.

### Conversion Copy Proposal
- `/`
- `/rodent-fertility-control`
- `/how-it-works`
- `/what-to-expect`
- `/results`
- `/get-started`

These are currently useful but still sound like a managed-service funnel. They need a proposal before edits.

### Reposition Or Consolidate Candidate
- `/areas`
- `/areas/$areaSlug`
- `/solutions/$slug`
- `/solutions/restaurants`
- `/solutions/property-managers`
- `/solutions/residential`
- `/solutions/food-storage`
- `/solutions/ghost-kitchens`
- `/solutions/hoas`
- `/solutions/mouse-violations`
- `/dohmh-rodent-violation-nyc`
- `/nj-rodent-violation`

These can support topical authority and commercial use cases, but they should not keep suggesting Cloakd is primarily a service operator if the business is now ecommerce-first.

### Keep But Reframe Internally
- `/vs/rat-poison`
- `/vs/snap-traps`
- `/vs/traditional-pest-control`
- `/vs/diy-rat-birth-control`
- `/vs/orkin`
- `/vs/assured-environments`
- `/vs/bell-environmental`
- `/vs/viking-pest-control`
- `/vs/western-pest-services`

These are good comparison assets. They should internally link to PDPs and Evolve education pages, but avoid over-claiming that Cloakd replaces every pest-control company.

### Investigate
- `/questions`

The route has no obvious `head` metadata in the quick route scan. Confirm whether it is intended to be indexable.

## Proposed Page Intent Map

- `/products/starter-kit`: buy Evolve starter kit.
- `/products/refill`: buy Evolve refills and replenishment.
- `/evolve-rodent-birth-control`: what Evolve is and how it works.
- `/contrapest-vs-evolve`: compare SenesTech products; guide buyers toward the right formulation.
- `/contrapest`: explain ContraPest and when it differs from Evolve.
- `/does-rat-birth-control-work`: evidence and deployment conditions.
- `/why-it-keeps-coming-back`: problem education and replacement-cycle concept.
- `/rodent-radar`: linkable asset hub and public-data authority.
- `/rodent-radar/rat-pressure-map`: public data atlas.
- `/rodent-radar/rodent-population-calculator`: colony/activity estimator.
- `/vs/rat-poison`: poison alternative intent.
- `/vs/snap-traps`: trap alternative intent.
- `/vs/traditional-pest-control`: standard pest-control alternative intent.
- `/vs/diy-rat-birth-control`: DIY vs structured deployment intent.

## Recommended Next Implementation Chunk

Do the safe technical cleanup first:

1. Review homepage ecommerce-first repositioning before making copy edits.
2. Map bottom-funnel conquest pages before adding more articles.
3. Plan internal links from Rodent Radar and education pages into PDPs.
4. Run `bun run build` after each implementation chunk.

Do not rewrite PDP body copy in this chunk.
