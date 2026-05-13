## Goal

Close the last three sitemap gaps vs the live site. No Stripe wiring — just static confirmation pages mirroring live copy, plus an SEO-preserving redirect for `/questions`.

## Files to create

### 1. `src/routes/thank-you.tsx`
Static post-form confirmation page mirroring live copy.
- H1: "We'll be in touch within one business day."
- Eyebrow: "Received"
- Body: "We'll review your property details and put together a program outline covering Phase 1 coordination and a 90-day monitoring schedule. If the program isn't the right fit for your situation, we'll tell you that too."
- Two CTAs: `<Link to="/how-it-works">How the program works</Link>`, `<Link to="/results">See the field data</Link>`
- `head()`: title "Received — Cloakd Removals", matching description, `meta robots: noindex, nofollow` (transactional confirmation page).

### 2. `src/routes/payment-confirmed.tsx`
Static post-payment confirmation page mirroring live copy.
- Eyebrow: "Payment confirmed"
- H1: "You're in. Here's what happens next."
- Intro paragraph (live copy verbatim).
- Numbered 4-step timeline: Intake email → Site walk scheduled → Phase 1 coordination → Baseline deployment (live copy verbatim).
- Footer block: "Questions before the intake email arrives? Reach out directly at hello@cloakd-removals.cloud"
- CTA: `<Link to="/what-to-expect">Review the full program timeline</Link>`
- `head()`: title "Payment Confirmed — Cloakd Removals", `robots: noindex, nofollow`.

### 3. `src/routes/questions.tsx`
Server-side redirect to `/faq` to consolidate the indexed URL onto our canonical FAQ route.
```ts
import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/questions")({
  beforeLoad: () => { throw redirect({ to: "/faq" }) },
});
```

## Style/components

Reuse existing site primitives — same `<section>` + container patterns used on `/what-to-expect` and `/results`. Use design tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-primary text-primary-foreground` for CTAs). Numbered timeline can reuse the simple step pattern already used in `how-it-works.tsx`.

## Out of scope

- No Stripe / checkout / webhook code.
- No changes to existing pages.
- No sitemap.xml regeneration (separate follow-up if needed).

## After implementation

All 30 live sitemap URLs will resolve in our app (with `/blog` ↔ `/resources` and `/questions` → `/faq` as documented equivalents). The rebuild will be at parity with the live site plus the new SEO pages we added.
