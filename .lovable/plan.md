## Rebuild /get-started to match live

Realign the local /get-started to mirror cloakd-removals.cloud/get-started, keeping Bay Area since we now serve it.

### 1. Extend `LeadForm`

Add an optional `extended?: boolean` prop to `src/components/site/LeadForm.tsx`:
- New **Business name** input
- New **"Anything we should know"** `<textarea>`
- Add **"Other"** to the property-type select
- When `extended`, submit button reads "Submit — we'll be in touch within one business day"
- Compact + default modes unchanged

### 2. Rewrite `src/routes/get-started.tsx`

- Hero eyebrow: **"Start the program"**
- H1: **"The rodent cycle ends here. Tell us about your property."**
- Lede: "We'll review your situation and put together the program. First response within one business day."
- Right column: `<LeadForm extended />`
- Drop `HeroTrustBadges` (live page omits)
- Replace 3-step list with the live **4-step** "What happens next":
  1. We review your property
  2. You get a program outline
  3. Deployment and tracking
  4. Results at 90 days
- Append `<FieldDataTrio />`
- Append a "Who we work with" 5-bullet block
- Footer disclaimer: "NYC, NJ, & Bay Area. No commitment required to submit."
- Refresh `head()` description to match new lede

### Files touched

- `src/components/site/LeadForm.tsx`
- `src/routes/get-started.tsx`

No other routes affected. Form remains presentational (no backend wiring).
