import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ClipboardCheck, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/rodent-radar_/hantavirus-risk-checker")({
  head: () => ({
    meta: [
      { title: "Hantavirus Risk Checker: Found Mouse or Rat Droppings? | Rodent Radar" },
      {
        name: "description",
        content:
          "A conservative, CDC-based Rodent Radar checker for droppings, cleanup, ventilation, and when to contact a healthcare professional.",
      },
    ],
  }),
  component: HantavirusCheckerPage,
});

function HantavirusCheckerPage() {
  return (
    <div className="bg-background py-16">
      <div className="container-site">
        <Link
          to="/rodent-radar"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Rodent Radar
        </Link>
        <div className="mt-8 rounded-3xl border border-border bg-card p-6 md:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Hantavirus Risk Checker
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            This standalone checker is next. It will use conservative, CDC-based
            cleanup guidance and will not diagnose illness or sell above the fold.
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
            <div className="flex gap-3">
              <ClipboardCheck className="mt-1 h-5 w-5 shrink-0 text-brand" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                If you have symptoms or feel unwell after rodent exposure, contact a
                healthcare professional or local health department. This page is
                educational and does not provide medical advice.
              </p>
            </div>
          </div>
          <Button asChild className="mt-8 rounded-full">
            <Link to="/rodent-radar/rodent-population-calculator">
              Estimate rodent activity
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
