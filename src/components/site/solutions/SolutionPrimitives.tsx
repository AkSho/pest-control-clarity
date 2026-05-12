import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/site/LeadForm";
import { HeroTrustBadges } from "@/components/site/TrustBadges";
import { SOLUTIONS, type SolutionSlug } from "@/data/solutions";

export function SolutionHero({
  eyebrow,
  headline,
  highlight,
  lede,
  image,
  badge,
  ctaLabel = "Start the 90-day program",
}: {
  eyebrow: string;
  headline: string;
  highlight?: string;
  lede: string;
  image: string;
  badge?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="relative ink-section overflow-hidden">
      <img
        src={image}
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
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
            {headline}{" "}
            {highlight && (
              <span className="text-accent-warm">{highlight}</span>
            )}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            {lede}
          </p>
          {badge && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-border bg-white/5 px-4 py-2 text-sm font-semibold text-ink-foreground">
              {badge}
            </div>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link to="/get-started">
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

export function StatCard({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
      <div className="text-4xl font-extrabold tracking-tight text-brand md:text-5xl">
        {value}
      </div>
      <div className="mt-3 text-base font-semibold">{label}</div>
      {sub && (
        <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {sub}
        </div>
      )}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  surface = "background",
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  surface?: "background" | "surface";
}) {
  return (
    <div className={surface === "surface" ? "" : ""}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
        {title}
      </h2>
      {intro && (
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {intro}
        </div>
      )}
    </div>
  );
}

export function TimelineStrip({
  steps,
}: {
  steps: { title: string; body: string }[];
}) {
  return (
    <div className="mt-10 grid gap-4 md:grid-cols-5">
      {steps.map((s, i) => (
        <div
          key={s.title}
          className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground text-sm font-extrabold">
            {i + 1}
          </div>
          <h3 className="mt-4 text-base font-bold leading-tight">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {s.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export function PhaseCards({
  phase1,
  phase2,
}: {
  phase1: { tag: string; title: string; body: ReactNode };
  phase2: { tag: string; title: string; body: ReactNode };
}) {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-2">
      {[
        { ...phase1, n: "Phase 1" },
        { ...phase2, n: "Phase 2", accent: true },
      ].map((p) => (
        <div
          key={p.title}
          className={`rounded-2xl border p-7 shadow-[var(--shadow-card)] ${
            p.accent
              ? "border-brand/40 bg-brand-soft"
              : "border-border bg-card"
          }`}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.18em]">
            <span className="text-brand">{p.n}</span>
            <span className="text-muted-foreground">{p.tag}</span>
          </div>
          <h3 className="mt-3 text-xl font-extrabold leading-tight md:text-2xl">
            {p.title}
          </h3>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {p.body}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FieldDataTrio({
  intro,
  footnote,
}: {
  intro?: string;
  footnote?: ReactNode;
}) {
  return (
    <section className="bg-surface py-20">
      <div className="container-site">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Field data
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
          Numbers from monitored urban deployments.
        </h2>
        {intro && (
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {intro}
          </p>
        )}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <StatCard
            value="79%"
            label="reduction in rodent track presence"
            sub="Location A — 5-month urban field study, Aug 2025 to Jan 2026"
          />
          <StatCard
            value="88%"
            label="drop in track density at the same site"
            sub="Tracks per monitoring plate declined even where rodents were still present"
          />
          <StatCard
            value="90%"
            label="fertility reduction potential"
            sub="When Evolve runs alongside an active pest control program"
          />
        </div>
        {footnote && (
          <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
            {footnote}
          </p>
        )}
      </div>
    </section>
  );
}

export function ClosingCta({
  title,
  body,
  primary = { label: "Start the 90-day program", to: "/get-started" },
  secondary,
}: {
  title: string;
  body: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="ink-section">
      <div className="container-site grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20">
        <div>
          <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-ink-muted md:text-lg">{body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link to={primary.to}>
                {primary.label} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {secondary && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/20 bg-white/5 px-6 text-base text-white hover:bg-white/10"
              >
                <Link to={secondary.to}>{secondary.label}</Link>
              </Button>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-ink-border bg-white/5 p-6 backdrop-blur">
          <ul className="space-y-3 text-sm text-ink-foreground">
            {[
              "Layered onto your existing pest program",
              "EPA-designated minimum-risk bait",
              "Documented monthly reporting",
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
  );
}

export function OtherSolutions({ current }: { current: SolutionSlug }) {
  return (
    <section className="bg-background py-20">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Also serving
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
            Other operators we work with
          </h2>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {SOLUTIONS.filter((s) => s.slug !== current).map((s) => (
            <Link
              key={s.slug}
              to="/solutions/$slug"
              params={{ slug: s.slug }}
              className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold transition hover:border-brand hover:bg-brand-soft"
            >
              <span className="flex items-center gap-2">
                <s.icon className="h-4 w-4 text-brand" />
                {s.audience}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-brand" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
