import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { canonicalLink } from "@/lib/seo";
import { ClosingCta } from "@/components/site/solutions/SolutionPrimitives";

const TITLE = "Evolve vs. Standard Rodent Control Options | Cloakd";
const DESCRIPTION =
  "How Evolve rodent fertility control compares to traps, rodenticides, national pest control companies, and DIY options. The fertility layer is what standard treatment leaves out.";

const VS_PAGES = [
  {
    to: "/vs/traditional-pest-control" as const,
    label: "Traditional pest control",
    description: "Standard knockdown treats the active colony. The replacement population is a separate problem.",
  },
  {
    to: "/vs/rat-poison" as const,
    label: "Rat poison",
    description: "Rodenticides remove what's present. Fertility control reduces what replaces it.",
  },
  {
    to: "/vs/snap-traps" as const,
    label: "Snap traps",
    description: "Mechanical removal is the right first layer. The fertility layer addresses what follows.",
  },
  {
    to: "/vs/orkin" as const,
    label: "Orkin",
    description: "Orkin's commercial program handles knockdown and exclusion. Evolve adds the fertility layer on top.",
  },
  {
    to: "/vs/bell-environmental" as const,
    label: "Bell Environmental",
    description: "Bell's NYC and NJ program runs standard IPM. The fertility-management layer is what most IPM programs don't include.",
  },
  {
    to: "/vs/assured-environments" as const,
    label: "Assured Environments",
    description: "Assured runs licensed commercial treatment across NYC. Evolve layers on top — no vendor displacement.",
  },
  {
    to: "/vs/viking-pest-control" as const,
    label: "Viking Pest Control",
    description: "Viking covers NJ properties with a full licensed program. Evolve adds the fertility control layer Viking doesn't include.",
  },
  {
    to: "/vs/western-pest-services" as const,
    label: "Western Pest Services",
    description: "Western's IPM covers most of the rodent problem. The replacement cycle is what's left.",
  },
  {
    to: "/vs/diy-rat-birth-control" as const,
    label: "DIY rat birth control",
    description: "What's available retail, what works, and where professional deployment makes the difference.",
  },
];

export const Route = createFileRoute("/vs/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: canonicalLink("/vs"),
  }),
  component: VsIndexPage,
});

function VsIndexPage() {
  return (
    <>
      <section className="bg-background py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              How Evolve compares
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Evolve fertility control vs. standard rodent management
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Standard pest control — traps, rodenticides, commercial pest management programs — removes the active population. It doesn't change how fast the replacement population forms. That's not a design flaw. It's a scope boundary. Evolve works on the part left out.
            </p>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {VS_PAGES.map((page) => (
              <Link
                key={page.to}
                to={page.to}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition hover:border-brand hover:bg-brand-soft"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                    Evolve vs.
                  </p>
                  <h2 className="mt-1.5 text-base font-bold leading-snug">
                    {page.label}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {page.description}
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Read comparison
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
