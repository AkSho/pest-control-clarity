import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { canonicalLink } from "@/lib/seo";
import { LeadForm } from "@/components/site/LeadForm";
import { HeroTrustBadges } from "@/components/site/TrustBadges";
import { getSolution, SOLUTIONS, type Solution } from "@/data/solutions";

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const solution = getSolution(params.slug);
    if (!solution) throw notFound();
    return { solution };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.solution;
    if (!s) return { meta: [{ title: "Solutions — Cloakd Removals" }] };
    const title = `${s.audience} — Rodent Fertility Control | Cloakd Removals`;
    const description = s.lede.slice(0, 160);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      links: canonicalLink(`/solutions/${s.slug}`),
    };
  },
  component: SolutionPage,
  notFoundComponent: () => (
    <div className="container-site py-24 text-center">
      <h1 className="text-3xl font-extrabold">Solution not found</h1>
      <p className="mt-3 text-muted-foreground">
        We couldn't find that solution. Browse all audiences below.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {SOLUTIONS.map((s) => (
          <Button key={s.slug} asChild variant="outline">
            <Link to="/solutions/$slug" params={{ slug: s.slug }}>
              {s.audience}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="container-site py-24 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">{error.message}</p>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </div>
  ),
});

function SolutionPage() {
  const { solution } = Route.useLoaderData() as { solution: Solution };
  const Icon = solution.icon;

  return (
    <>
      {/* HERO */}
      <section className="relative ink-section">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div>
            <HeroTrustBadges />
            <div className="mt-7 flex items-center gap-2">
              <Icon className="h-5 w-5 text-brand" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-warm">
                {solution.eyebrow}
              </p>
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              {solution.headline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              {solution.lede}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-border bg-white/5 px-4 py-2 text-sm font-semibold text-ink-foreground">
              {solution.badge}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/get-started">
                  {solution.ctaLabel} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              The problem
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Why your current program isn't ending it
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {solution.painPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="bg-surface py-20">
        <div className="container-site grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              What we add
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Layered onto what you already run
            </h2>
            <p className="mt-5 text-muted-foreground">
              We don't replace your exterminator. We add the fertility-control
              layer that breaks the replacement cycle, and we document every
              visit.
            </p>
          </div>
          <ol className="space-y-4">
            {solution.outcomes.map((o, i) => (
              <li
                key={o.title}
                className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{o.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {o.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-background py-20">
        <div className="container-site">
          <div className="grid gap-5 md:grid-cols-3">
            {solution.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]"
              >
                <div className="text-5xl font-extrabold tracking-tight text-brand">
                  {s.value}
                </div>
                <div className="mt-3 text-base font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER SOLUTIONS */}
      <section className="bg-surface py-20">
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
            {SOLUTIONS.filter((s) => s.slug !== solution.slug).map((s) => (
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

      {/* CTA BAND */}
      <section className="ink-section">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
              {solution.ctaLabel}
            </h2>
            <p className="mt-5 max-w-xl text-ink-muted md:text-lg">
              First visit covers walkthrough and station mapping. Monthly
              management and documented reporting from there.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/get-started">
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
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
    </>
  );
}
