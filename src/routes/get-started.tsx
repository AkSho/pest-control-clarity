import { createFileRoute } from "@tanstack/react-router";
import { Check, Phone } from "lucide-react";
import { LeadForm } from "@/components/site/LeadForm";
import { FieldDataTrio } from "@/components/site/solutions/SolutionPrimitives";
import { Eyebrow } from "@/components/site/Eyebrow";

const TITLE = "Get Started — Cloakd Removals";
const DESCRIPTION =
  "The rodent cycle ends here. Tell us about your property — we'll review your situation, put together the program, and respond within one business day. NYC, NJ & Bay Area.";

export const Route = createFileRoute("/get-started")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: GetStartedPage,
});

const STEPS = [
  {
    n: "1",
    title: "We review your property",
    body: "Address, property type, and current pest control setup. We assess whether the program is a fit.",
  },
  {
    n: "2",
    title: "You get a program outline",
    body: "Phase 1 coordination with your existing vendor, Phase 2 bait station placement, and a 90-day monitoring schedule.",
  },
  {
    n: "3",
    title: "Deployment and tracking",
    body: "Program runs with monthly check-ins and documented activity tracking throughout.",
  },
  {
    n: "4",
    title: "Results at 90 days",
    body: "Full comparison against baseline. Track counts, activity levels, documented decline.",
  },
];

const WHO_WE_WORK_WITH = [
  "Restaurants and food service operators",
  "Property managers with multiple addresses",
  "Ghost kitchen facilities",
  "Food storage and cold chain operations",
  "Residential buildings and HOAs",
];

function GetStartedPage() {
  return (
    <>
      <section className="relative ink-section">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1fr_1fr] md:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-warm">
              Start the program
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              The rodent cycle ends here.{" "}
              <span className="text-accent-warm">Tell us about your property.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              We'll review your situation and put together the program. First
              response within one business day.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-ink-foreground/85">
              <Phone className="h-4 w-4" />
              Prefer to call?{" "}
              <a
                href="tel:+18005550199"
                className="font-semibold text-ink-foreground underline"
              >
                (800) 555-0199
              </a>
            </div>
          </div>

          <div>
            <LeadForm extended />
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="bg-background py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>
              What happens next
            </Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Four steps from inquiry to documented results
            </h2>
          </div>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FieldDataTrio />

      {/* WHO WE WORK WITH */}
      <section className="bg-background py-20">
        <div className="container-site grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <Eyebrow>
              Who we work with
            </Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
              The program runs at addresses like yours.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              NYC, NJ, &amp; Bay Area. Operators across food service, multifamily,
              and residential. The mechanism doesn't change with the address.
            </p>
          </div>
          <ul className="space-y-3">
            {WHO_WE_WORK_WITH.map((w) => (
              <li
                key={w}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span className="text-sm font-medium md:text-base">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
