import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { canonicalLink } from "@/lib/seo";
import { SOLUTIONS } from "@/data/solutions";
import { ClosingCta } from "@/components/site/solutions/SolutionPrimitives";

const TITLE = "Rodent Fertility Control by Property Type | Cloakd";
const DESCRIPTION =
  "Evolve rodent birth control layered onto the program you already run. Dedicated guides for restaurants, property managers, HOAs, ghost kitchens, food storage, residential, and mouse violation response.";

export const Route = createFileRoute("/solutions/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: canonicalLink("/solutions"),
  }),
  component: SolutionsIndexPage,
});

function SolutionsIndexPage() {
  return (
    <>
      <section className="bg-background py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              By property type
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Rodent fertility control for every operator
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Standard pest control clears the active colony. Six weeks later the same territory refills. Evolve fertility management layers on top of whatever program you already run — breaking the replacement cycle instead of resetting it.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to="/solutions/$slug"
                  params={{ slug: s.slug }}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition hover:border-brand hover:bg-brand-soft"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10">
                      <Icon className="h-4 w-4 text-brand" />
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-wide text-brand">
                      {s.eyebrow}
                    </span>
                  </div>
                  <h2 className="mt-4 text-lg font-bold leading-snug">
                    {s.headline}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {s.lede}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    {s.audience} guide
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
