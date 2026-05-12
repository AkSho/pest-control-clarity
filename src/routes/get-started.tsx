import { createFileRoute } from "@tanstack/react-router";
import { Check, Phone } from "lucide-react";
import { LeadForm } from "@/components/site/LeadForm";
import { HeroTrustBadges } from "@/components/site/TrustBadges";

const TITLE = "Get Started — Cloakd Removals";
const DESCRIPTION =
  "Schedule a free site walkthrough and program estimate. Month-to-month rodent fertility control layered onto your existing pest contract. Serving NYC, NJ, and the Bay Area.";

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
    title: "Quick call (10 min)",
    body: "We learn your property type, current pest contract, and what you're seeing. Same-day or next business day.",
  },
  {
    n: "2",
    title: "Site walkthrough",
    body: "We assess pressure, harborage, and existing station placement. You get a written estimate and a station plan.",
  },
  {
    n: "3",
    title: "First deployment",
    body: "Stations installed, baseline track plates set. Monthly reporting starts the next cycle.",
  },
];

function GetStartedPage() {
  return (
    <>
      <section className="relative ink-section">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1fr_1fr] md:py-24">
          <div>
            <HeroTrustBadges />
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-accent-warm">
              Get started
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              Schedule a{" "}
              <span className="text-accent-warm">free site walkthrough.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Tell us about your property. We'll come walk it, write you an
              estimate, and show you exactly where the fertility-control layer
              fits on top of whatever pest program you already run.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-ink-foreground">
              {[
                "Free walkthrough and written estimate",
                "Layered onto your existing pest contract",
                "Month-to-month, no long contracts",
                "Documented monthly reporting",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-brand" />
                  {b}
                </li>
              ))}
            </ul>

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
            <LeadForm />
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="bg-background py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              What happens next
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Three steps from inquiry to first deployment
            </h2>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
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
    </>
  );
}
