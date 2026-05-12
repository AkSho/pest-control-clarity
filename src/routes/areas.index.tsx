import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { LeadForm } from "@/components/site/LeadForm";
import { HeroTrustBadges } from "@/components/site/TrustBadges";
import { FieldDataTrio, ClosingCta } from "@/components/site/solutions/SolutionPrimitives";
import { REGIONS, getAreasByRegion } from "@/data/serviceAreas";
import { Eyebrow } from "@/components/site/Eyebrow";

const TITLE = "Service Areas — NYC, NJ & Bay Area | Cloakd Removals";
const DESCRIPTION =
  "Where Cloakd runs the rodent fertility control program. Coverage across New York City, New Jersey, and the Bay Area. Layered onto your existing pest contract, documented monthly.";

export const Route = createFileRoute("/areas/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AreasIndex,
});

function AreasIndex() {
  return (
    <>
      <section className="relative ink-section overflow-hidden">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div>
            <HeroTrustBadges />
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-accent-warm">
              Service areas
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              Where Cloakd runs the{" "}
              <span className="text-accent-warm">program.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              Coverage across three regions: New York City, New Jersey, and the
              Bay Area. The fertility control layer runs on top of whatever
              pest program you already have. Month-to-month, documented every
              cycle.
            </p>
          </div>
          <div>
            <LeadForm />
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-site">
          <Eyebrow>
            Coverage map
          </Eyebrow>
          <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">
            Three regions, one program.
          </h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {REGIONS.map((r) => {
              const areas = getAreasByRegion(r.key);
              return (
                <div
                  key={r.key}
                  className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    <MapPin className="h-3.5 w-3.5" />
                    {r.key}
                  </div>
                  <h3 className="mt-3 text-2xl font-extrabold leading-tight">
                    {r.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {r.blurb}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {areas.map((a) => (
                      <li key={a.slug}>
                        <Link
                          to="/areas/$areaSlug"
                          params={{ areaSlug: a.slug }}
                          className="group flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold transition hover:border-brand hover:bg-brand-soft"
                        >
                          <span>
                            {a.city}, {a.state}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-brand" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FieldDataTrio
        intro="The same field data shows up at every address we run the program at — restaurants, multifamily, food storage, residential. The mechanism doesn't care about geography."
      />

      <ClosingCta
        title="Don't see your city? We're expanding."
        body="Tell us where your property is. If we're not yet running the program in your market, we'll let you know what the timeline looks like."
        primary={{ label: "Tell us about your property", to: "/get-started" }}
      />
    </>
  );
}
