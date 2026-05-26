import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/site/LeadForm";
import { HeroTrustBadges } from "@/components/site/TrustBadges";
import heroResults from "@/assets/hero-results.jpg";
import { canonicalLink } from "@/lib/seo";

const TITLE = "Field results — Cloakd Removals";
const DESCRIPTION =
  "Two buildings, five months. 79% reduction in rodent track presence, 88% drop in track density, with municipal programs adopting the same approach.";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: canonicalLink("/results"),
  }),
  component: ResultsPage,
});

const SOURCE_FEB =
  "https://www.prnewswire.com/news-releases/senestech-reports-significant-reductions-in-rodent-activity-following-evolve-deployments-in-urban-field-studies-302691116.html";
const SOURCE_JUN =
  "https://www.prnewswire.com/news-releases/senestechs-evolve-rodent-birth-control-proven-in-urban-rodent-hotspots-from-hong-kong-to-san-francisco-302491716.html";

function StatTile({
  v,
  label,
  sub,
}: {
  v: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
      <div className="text-5xl font-extrabold tracking-tight text-brand md:text-6xl">
        {v}
      </div>
      <div className="mt-3 text-base font-semibold">{label}</div>
      <div className="mt-1 text-sm text-muted-foreground">{sub}</div>
    </div>
  );
}

const CITIES: { name: string; year: string; body: ReactNode }[] = [
  {
    name: "New York City",
    year: "2025",
    body: (
      <>
        NYC City Council passed a rat contraceptive pilot bill in October
        2024. Deployment of{" "}
        <Link
          to="/contrapest"
          className="text-brand underline-offset-2 hover:underline"
        >
          ContraPest
        </Link>{" "}
        — a fertility management product made by SenesTech — began in
        designated rat mitigation zones in April 2025.
      </>
    ),
  },
  {
    name: "Baltimore",
    year: "2025",
    body: (
      <>
        Baltimore adopted{" "}
        <Link
          to="/evolve-rodent-birth-control"
          className="text-brand underline-offset-2 hover:underline"
        >
          Evolve
        </Link>{" "}
        for its city-run rodent control program in 2025. The program runs
        through the city's public health department as part of a broader
        effort to reduce the rat population citywide.
      </>
    ),
  },
  {
    name: "Chicago",
    year: "2026",
    body: "The Wicker Park corridor deployment showed positive population results through early 2026, contributing to growing municipal interest in fertility management as a complement to traditional rodent control programs.",
  },
];

const METHOD = [
  {
    n: "1",
    t: "Week 1 baseline",
    b: "Tracking plates placed at each station location. Rodent activity recorded across all sites before fertility management begins.",
  },
  {
    n: "2",
    t: "Month 1 check-in",
    b: "Plates replaced, track counts recorded. Evolve bait stations checked and replenished. Early comparison against baseline.",
  },
  {
    n: "3",
    t: "Month 2 check-in",
    b: "Second data point against baseline. Population trend becoming measurable. Stations maintained.",
  },
  {
    n: "4",
    t: "90-day summary",
    b: "Full comparison across all station locations. Track presence percentage, density comparison, documented trend line. Delivered as written record.",
  },
];

function ResultsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative ink-section overflow-hidden">
        <img
          src={heroResults}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          width={1536}
          height={1024}
        />
        <div className="relative container-site grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div>
            <HeroTrustBadges />
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-accent-warm">
              Field data
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              Two buildings. Five months.{" "}
              <span className="text-accent-warm">
                Here's what happened to the rat population.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Track counts from two independent urban sites — monthly
              comparisons against a Week 1 baseline, August 2025 through
              January 2026. What went down, by how much, and over what
              timeframe.
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

      {/* LOCATION A */}
      <section className="bg-background py-20">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Location A — primary field study
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
            Urban deployment, Aug 2025 to Jan 2026.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Five-month monitored deployment at a dense urban site. Track count
            plates placed at 12 station locations. Monthly comparisons against
            Week 1 baseline.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <StatTile
              v="79%"
              label="reduction in rodent track presence"
              sub="Percentage of monitored station locations showing zero track activity by month 5, compared to full activity at baseline"
            />
            <StatTile
              v="88%"
              label="drop in track density"
              sub="Average tracks per monitoring plate at active stations declined even where some residual activity was still detected"
            />
            <StatTile
              v="5 months"
              label="continuous monitoring period"
              sub="Uninterrupted deployment from August 2025 through January 2026 with monthly check-in documentation"
            />
          </div>
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The 79% and 88% figures measure different things. One counts how
            many station locations went silent. The other counts how many
            tracks were left at stations that were still active. Both dropped.
            That's not one story told two ways. It's two independent signs of
            the same decline.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Source:{" "}
            <a
              href={SOURCE_FEB}
              target="_blank"
              rel="noopener"
              className="font-semibold text-brand hover:underline"
            >
              SenesTech, Inc. — February 18, 2026
            </a>
          </p>
        </div>
      </section>

      {/* LOCATION B */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Location B
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
            Independent 5-month deployment.
          </h2>
          <div className="mt-6 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12">
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                A second independent urban deployment ran concurrently over
                the same five-month period. Location B showed a 50%+ reduction
                in rodent track presence — a meaningful decline given a
                different site profile, food source distribution, and
                surrounding block pressure than Location A.
              </p>
              <p>
                Two independent sites producing positive outcomes over the
                same period gives the data more weight than a single-site
                result. The mechanism isn't site-specific. The biology is
                consistent across urban environments.
              </p>
            </div>
            <div className="grid gap-5">
              <StatTile
                v="50%+"
                label="reduction in track presence"
                sub="Station locations showing zero track activity by month 5"
              />
              <StatTile
                v="71%"
                label="drop in track density"
                sub="Location B — independent 5-month urban deployment, same monitoring period"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 90% FERTILITY STRIP */}
      <section className="ink-section py-20">
        <div className="container-site grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-warm">
              Fertility reduction
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Up to 90% fertility reduction potential.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-muted">
              <p>
                The maker of Evolve tested how much it reduces rats' ability
                to reproduce when used alongside active pest control. Their
                data shows up to 90% fertility reduction. That's the mechanism
                that prevents the replacement colony from forming after
                knockdown.
              </p>
              <p>
                The 79% and 88% results are what a 90% fertility reduction
                looks like in practice over a monitoring period. The fertility
                figure tells you what direction the population should go. The
                track count data shows it actually did.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-ink-border bg-white/5 p-10 text-center backdrop-blur">
            <div className="text-7xl font-extrabold tracking-tight text-accent-warm md:text-8xl">
              90%
            </div>
            <div className="mt-4 text-lg font-semibold text-white">
              fertility reduction potential
            </div>
            <div className="mt-2 text-sm text-ink-muted">
              Documented in active pest control programs that include Evolve
              fertility management
            </div>
          </div>
        </div>
      </section>

      {/* HONG KONG + SF */}
      <section className="bg-background py-20">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            International deployments
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
            The same mechanism, in other cities.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              {
                t: "Hong Kong — June 2025",
                b: "High-density mixed-use building with persistent rodent activity. Within three months of deployment: sightings fell, bait consumption declined as the population shrank, and no new litters were detected.",
              },
              {
                t: "San Francisco — June 2025",
                b: "Heavily trafficked neighborhood with recurring infestations. Clear reduction in visible rodent activity, reduced poison usage overall, and a measurable drop in new rodent births over the deployment period.",
              },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-xl font-bold">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.b}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  Source:{" "}
                  <a
                    href={SOURCE_JUN}
                    target="_blank"
                    rel="noopener"
                    className="font-semibold text-brand hover:underline"
                  >
                    SenesTech, Inc. — June 26, 2025
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="ink-section py-20">
        <div className="container-site max-w-3xl text-center">
          <blockquote className="text-2xl font-extrabold leading-snug text-white md:text-4xl">
            "These successes prove that fertility control isn't just an idea —
            it's a practical tool that helps pest professionals get ahead of
            chronic infestations faster and with less rodenticide."
          </blockquote>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-accent-warm">
            Joel Fruendt, CEO — SenesTech, Inc.
          </p>
        </div>
      </section>

      {/* CITIES */}
      <section className="bg-background py-20">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            City-level adoption
          </p>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
            The same program running at scale.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Fertility management for urban rodent control has been adopted at
            the municipal level. These are city-funded programs, not vendor
            marketing claims.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {CITIES.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-bold">{c.name}</h3>
                  <span className="text-sm font-semibold text-brand">
                    {c.year}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
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
              Monitoring methodology
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              How track counts work as a measurement standard.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Track count monitoring uses tracking plates at each bait
                station. These are cards coated in a medium that shows
                footprints. Rats moving through the area walk across them. The
                number of tracks per plate per visit gives you a consistent
                measure of activity at that location.
              </p>
              <p>
                Baseline plates are placed in Week 1 before fertility
                management begins. Monthly visits replace the plates and
                record the track count. The comparison against baseline shows
                whether activity at each station is declining, stable, or
                increasing.
              </p>
              <p>
                This is the same measurement standard used by city rodent
                control programs. It produces a documented record you can hand
                to an inspector or property owner as evidence of active,
                consistent management.
              </p>
            </div>
          </div>
          <ol className="space-y-4">
            {METHOD.map((m) => (
              <li
                key={m.n}
                className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground font-extrabold">
                  {m.n}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{m.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {m.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="ink-section">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Start building your own 90-day record.
            </h2>
            <p className="mt-5 max-w-xl text-ink-muted md:text-lg">
              The field data above came from properties that started the same
              program. Tell us about your property and we'll put together the
              outline for yours.
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
