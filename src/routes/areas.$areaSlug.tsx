import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { canonicalLink } from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LeadForm } from "@/components/site/LeadForm";
import { getServiceArea, getJurisdiction, SERVICE_AREAS, type ServiceArea } from "@/data/serviceAreas";
import { SOLUTIONS } from "@/data/solutions";

export const Route = createFileRoute("/areas/$areaSlug")({
  loader: ({ params }) => {
    const area = getServiceArea(params.areaSlug);
    if (!area) throw notFound();
    return { area: area as NonNullable<typeof area> };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.area;
    if (!a) return { meta: [{ title: "Service area — Cloakd Removals" }] };
    const title = `Rodent Fertility Control in ${a.city}, ${a.state} | Cloakd Removals`;
    const description = `Break the rodent replacement cycle in ${a.city}, ${a.state}. EPA-designated minimum-risk fertility control layered on top of your existing pest program. Month-to-month, documented monthly.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      links: canonicalLink(`/areas/${a.slug}`),
    };
  },
  component: AreaPage,
  notFoundComponent: () => (
    <div className="container-site py-24 text-center">
      <h1 className="text-3xl font-extrabold">Service area not found</h1>
      <p className="mt-3 text-muted-foreground">
        We couldn't find that area. Browse our coverage map below.
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Back to home</Link>
      </Button>
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

function AreaPage() {
  const { area } = Route.useLoaderData() as { area: ServiceArea };

  return (
    <>
      {/* HERO */}
      <section className="ink-section">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-border bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              <MapPin className="h-3.5 w-3.5" />
              {area.region} · {area.city}, {area.state}
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-white md:text-5xl">
              Rodent Fertility Control in{" "}
              <span className="text-accent-warm">
                {area.city}, {area.state}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
              {area.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <a href="#contact">
                  Schedule walkthrough <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <a
                href="tel:+18005550199"
                className="flex items-center gap-2 text-sm font-medium text-ink-foreground hover:text-brand"
              >
                <Phone className="h-4 w-4" /> (800) 555-0199
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-muted">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
                4.9★ — local operators
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-brand" /> Month-to-month
              </div>
            </div>
          </div>
          <div id="contact">
            <LeadForm compact />
          </div>
        </div>
      </section>

      {/* LOCAL PROOF */}
      <section className="bg-surface py-16">
        <div className="container-site grid gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Local context
            </p>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight md:text-4xl">
              Why {area.city}'s pest cycle is different — and what actually breaks it
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{area.localProof}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="text-5xl font-extrabold tracking-tight text-brand">79%</div>
            <p className="mt-3 text-sm text-muted-foreground">
              Reduction in rodent activity across monitored urban deployments
              over a 5-month window. Comparable conditions to {area.city}.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTIONS STRIP */}
      <section className="bg-background py-16">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Who we work with in {area.city}
          </p>
          <h2 className="mt-4 max-w-3xl text-2xl font-extrabold leading-tight md:text-4xl">
            We run the program for these operators in {area.city}.
          </h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SOLUTIONS.slice(0, 4).map((s) => (
              <Link
                key={s.slug}
                to="/solutions/$slug"
                params={{ slug: s.slug }}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition hover:border-brand hover:bg-brand-soft"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 text-base font-bold">{s.audience}</div>
                <div className="mt-1 text-sm text-muted-foreground line-clamp-2">{s.eyebrow}</div>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Explore solution <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-background py-16">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              How the program runs in {area.city}
            </p>
            <h2 className="mt-4 text-2xl font-extrabold leading-tight md:text-4xl">
              Same two phases. Local pressure data.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              { n: "1", t: "Walkthrough", b: "Site assessment and harborage mapping at your address." },
              { n: "2", t: "Knockdown", b: "Existing exterminator clears the active population." },
              { n: "3", t: "Fertility control", b: "Soft bait deployed; reproduction rate falls." },
              { n: "4", t: "Monthly reporting", b: "Documented track-density data, every cycle." },
            ].map((p) => (
              <div
                key={p.n}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold">
                  {p.n}
                </div>
                <h3 className="mt-4 text-base font-bold">{p.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CITY */}
      <section className="bg-background py-16">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Why {area.city} operators choose Cloakd
          </p>
          <h2 className="mt-4 max-w-3xl text-2xl font-extrabold leading-tight md:text-4xl">
            Built for {area.city}'s replacement cycle.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                t: `Local pressure data, not a national average`,
                b: `We baseline your block, then track the decline cycle by cycle. The numbers reflect your address — not a study somewhere else.`,
              },
              {
                t: `Layered onto your existing vendor`,
                b: `No contract switch in ${area.city}. Whatever pest control you already pay for keeps doing knockdown. We add the fertility layer on top.`,
              },
              {
                t: `Documented for ${getJurisdiction(area)}`,
                b: `Monthly reports formatted to show ${getJurisdiction(area)} inspectors, ownership, or franchise corporate. The numbers are yours to use.`,
              },
            ].map((r) => (
              <div
                key={r.t}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <Check className="h-5 w-5 text-brand" />
                <h3 className="mt-4 text-base font-bold leading-tight">{r.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEIGHBORHOODS */}
      <section className="bg-surface py-16">
        <div className="container-site">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Neighborhoods we cover in {area.city}
          </p>
          <h2 className="mt-4 text-2xl font-extrabold md:text-4xl">
            Coverage across {area.city}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {area.neighborhoods.map((n) => (
              <div
                key={n}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium"
              >
                <Check className="h-4 w-4 text-brand" />
                {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-16">
        <div className="container-site grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              FAQ — {area.city}
            </p>
            <h2 className="mt-4 text-2xl font-extrabold md:text-4xl">
              What {area.city} operators ask first
            </h2>
          </div>
          <Accordion type="single" collapsible>
            {area.faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* NEARBY */}
      {area.nearbyAreas.length > 0 && (
        <section className="bg-surface py-12">
          <div className="container-site">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Nearby service areas
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {area.nearbyAreas.map((n) => (
                <Link
                  key={n.label}
                  to="/areas/$areaSlug"
                  params={{ areaSlug: n.slug }}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-brand hover:bg-brand-soft"
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="ink-section">
        <div className="container-site py-16 text-center md:py-20">
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
            Ready to break the cycle in {area.city}?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-ink-muted">
            Walkthroughs are free. Programs run month-to-month. Documented every cycle.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <a href="#contact">
                Schedule walkthrough <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <a
              href="tel:+18005550199"
              className="flex items-center gap-2 text-base font-semibold text-ink-foreground hover:text-brand"
            >
              <Phone className="h-4 w-4" /> (800) 555-0199
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// Reference SERVICE_AREAS to keep tree-shaking honest if used later.
void SERVICE_AREAS;
