import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, BarChart3, ShieldCheck, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const TITLE = "Resources — Cloakd Removals";
const DESCRIPTION =
  "Field study summaries, EPA classification notes, sample monthly reports, and program one-pagers for operators evaluating rodent fertility control.";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ResourcesPage,
});

type Resource = {
  icon: typeof FileText;
  kind: string;
  title: string;
  body: string;
  cta: string;
};

const RESOURCES: Resource[] = [
  {
    icon: BarChart3,
    kind: "Field study",
    title: "5-month urban deployment summary",
    body: "Track-density results from two independent NYC-area sites running rodent fertility control layered on existing pest contracts. 79% reduction in monitored activity over 5 months.",
    cta: "Request the summary",
  },
  {
    icon: ShieldCheck,
    kind: "Compliance note",
    title: "EPA minimum-risk classification explained",
    body: "What \"EPA-designated minimum risk\" actually means for food-handling environments, secondary-kill risk to pets and wildlife, and DOHMH inspection records.",
    cta: "Read the brief",
  },
  {
    icon: FileText,
    kind: "Sample report",
    title: "Monthly per-cycle program report",
    body: "An anonymized example of the report your operator, board, or franchise corporate receives every cycle: track-density trend, station logs, photos, and notes.",
    cta: "See a sample",
  },
  {
    icon: BookOpen,
    kind: "Operator guide",
    title: "How to evaluate a fertility-control vendor",
    body: "Six questions to ask any vendor before signing — measurement methodology, reporting cadence, lock-in terms, EPA classification, and how the program coordinates with your existing exterminator.",
    cta: "Read the guide",
  },
  {
    icon: BookOpen,
    kind: "Background",
    title: "Why municipal programs are adopting it",
    body: "NYC, Baltimore, and Chicago are running fertility-control pilots. Why public-health agencies are layering this on top of existing rodent abatement, not replacing it.",
    cta: "Read the background",
  },
  {
    icon: FileText,
    kind: "One-pager",
    title: "Program one-pager for board meetings",
    body: "Print-ready single-page overview of the program — what it is, what it costs, how it integrates, what the reporting looks like. Built for sharing with boards and ownership.",
    cta: "Get the one-pager",
  },
];

function ResourcesPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative ink-section">
        <div className="container-site py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent-warm">
              Resources
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              Field data, compliance notes, and{" "}
              <span className="text-accent-warm">operator references.</span>
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/85 md:text-lg">
              Material we hand to operators, boards, and ownership when they're
              evaluating the program. Request any of the items below and we'll
              send them over.
            </p>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="bg-background py-20">
        <div className="container-site">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {r.kind}
                  </p>
                  <h3 className="mt-2 text-lg font-bold">{r.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                    {r.body}
                  </p>
                  <Link
                    to="/get-started"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
                  >
                    {r.cta} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ink-section">
        <div className="container-site py-16 text-center md:py-20">
          <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
            Want all of these in one packet?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-ink-muted md:text-lg">
            Tell us your property type and we'll send the full operator packet
            tailored to your environment.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link to="/get-started">
                Request the packet <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
