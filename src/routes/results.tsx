import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/site/LeadForm";
import { HeroTrustBadges } from "@/components/site/TrustBadges";

const TITLE = "Field Results — Cloakd Removals";
const DESCRIPTION =
  "Real numbers from monitored deployments: 79% reduction in rodent activity, 88% drop in track density, 90% fertility reduction when integrated into active pest programs.";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ResultsPage,
});

const STATS = [
  {
    value: "79%",
    label: "reduction in rodent track presence",
    sub: "Location A — 5-month urban field study, Aug 2025 to Jan 2026",
  },
  {
    value: "88%",
    label: "drop in track density",
    sub: "Same location — tracks per plate declined even where rodents still present",
  },
  {
    value: "79%+",
    label: "reduction at second monitored site",
    sub: "Location B — independent deployment, 5-month monitoring window",
  },
  {
    value: "90%",
    label: "fertility reduction potential",
    sub: "When integrated into active pest management programs",
  },
];

const CITIES = [
  {
    name: "New York City",
    body: "NYC began deploying ContraPest in designated rat mitigation zones in April 2025.",
  },
  {
    name: "Baltimore",
    body: "Baltimore adopted Evolve for its city rodent control program in 2025.",
  },
  {
    name: "Chicago",
    body: "Chicago's Wicker Park corridor reported early positive results in March 2026.",
  },
];

function ResultsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative ink-section">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div>
            <HeroTrustBadges />
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-accent-warm">
              Field data
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              Real numbers from{" "}
              <span className="text-accent-warm">monitored deployments.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Track-density measurements from two urban sites over five months.
              Public-municipality results from cities running fertility control
              programs. The data is consistent — when fertility control is
              layered into an active program, the replacement cycle breaks.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/get-started">
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* HEADLINE STATS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Field study results
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Two urban sites. Five months. Track-density measured every cycle.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
              >
                <div className="text-5xl font-extrabold tracking-tight text-brand">
                  {s.value}
                </div>
                <div className="mt-3 text-base font-semibold">{s.label}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section className="bg-surface py-20">
        <div className="container-site grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              How we measure
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Track plates, not estimates
            </h2>
            <p className="mt-5 text-muted-foreground">
              Activity is measured the same way every visit. The number is
              comparable across cycles, across sites, and across vendors.
            </p>
          </div>
          <ol className="space-y-4">
            {[
              {
                t: "Track plates at every station",
                b: "Numbered, dated plates record rodent presence and footprint density between visits. Reviewed and replaced each cycle.",
              },
              {
                t: "Same protocol every cycle",
                b: "Plate count, placement, scoring rubric, and review interval stay constant. Comparing month four to month one is comparing the same measurement.",
              },
              {
                t: "Photo + log per station",
                b: "Each station's plate, bait status, and condition photographed and logged. The trend isn't an estimate — it's a stack of evidence.",
              },
              {
                t: "Independent sites, parallel measurement",
                b: "Two unrelated urban deployments measured against the same rubric. Both sites trended the same direction over the same window.",
              },
            ].map((x, i) => (
              <li
                key={x.t}
                className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{x.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {x.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CITIES */}
      <section className="bg-background py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Cities already running this
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Municipal programs adopting fertility control
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CITIES.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-xl font-bold">{c.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="ink-section">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
              The numbers are yours to show.
            </h2>
            <p className="mt-5 max-w-xl text-ink-muted md:text-lg">
              Per-cycle reports formatted for handing straight to a DOHMH
              inspector, your franchise corporate, ownership, or your board.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/get-started">
                  Start the program <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="rounded-2xl border border-ink-border bg-white/5 p-6 backdrop-blur">
            <ul className="space-y-3 text-sm text-ink-foreground">
              {[
                "Track-density measurement every cycle",
                "Photos + station logs every visit",
                "Auditor- and inspector-ready reports",
                "Month-to-month, no long contracts",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-brand" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
