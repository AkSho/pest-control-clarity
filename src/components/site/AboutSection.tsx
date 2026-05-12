import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutImg from "@/assets/about-operator.jpg";
import { Eyebrow } from "@/components/site/Eyebrow";

const POINTS = [
  "Layered onto your existing pest program — no vendor displacement",
  "EPA-designated minimum-risk soft bait, cleared for food-handling environments",
  "Documented monthly reporting you can hand to DOHMH or ownership",
];

export function AboutSection() {
  return (
    <section id="about" className="bg-surface py-20">
      <div className="container-site grid gap-10 md:grid-cols-[1fr_1fr] md:gap-16 md:items-center">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-[var(--shadow-elevated)]">
            <img
              src={aboutImg}
              alt="Cloakd Removals operator inspecting a commercial kitchen at dusk"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-ink p-5 text-ink-foreground shadow-[var(--shadow-elevated)] md:block">
            <div className="text-3xl font-extrabold text-accent-warm">79%</div>
            <div className="mt-1 max-w-[10rem] text-xs leading-tight text-ink-muted">
              reduction in rodent activity over a 5-month urban field study
            </div>
          </div>
        </div>

        <div>
          <Eyebrow>
            About Cloakd Removals
          </Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
            Removal handles what's there. We handle what comes next.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Standard extermination clears the active population, and it does
            that correctly. The problem is what happens to the territory in the
            weeks after it empties. In a food-dense urban block, surrounding
            colonies detect the vacant space and move in within 4 to 8 weeks at
            full breeding capacity.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Cloakd layers EPA-designated minimum-risk fertility control on top
            of your existing program. Rats that consume the bait reproduce at a
            fraction of their normal rate, and over a single breeding cycle the
            replacement population can't form at full size. The cycle stays
            broken instead of resetting every six weeks.
          </p>

          <ul className="mt-7 space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-foreground">{p}</span>
              </li>
            ))}
          </ul>

          <Button asChild size="lg" className="mt-8 h-12 px-6">
            <a href="#contact">
              Schedule a walkthrough <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
