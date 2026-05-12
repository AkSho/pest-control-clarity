import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/site/LeadForm";
import { HeroTrustBadges } from "@/components/site/TrustBadges";

const TITLE = "Why rodents keep coming back — Cloakd Removals";
const DESCRIPTION =
  "City rats are territorial. Standard treatment removes the occupant; the territory stays. Here's what actually stops the replacement cycle.";

export const Route = createFileRoute("/why-it-keeps-coming-back")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ProblemPage,
});

const STEPS = [
  {
    n: "1",
    title: "Treatment removes the occupant",
    body: "Standard pest control clears the active colony. Within days, the scent marks that signaled the territory was claimed fade.",
  },
  {
    n: "2",
    title: "Surrounding rats detect the open territory",
    body: "In a food-dense urban block, vacant territory with a persistent food source is the strongest signal a rat can detect. Other colonies start testing the space immediately.",
  },
  {
    n: "3",
    title: "A new group moves in within 4 to 8 weeks",
    body: "No resistance, no competing colony. The replacement population establishes at full breeding capacity before your next service visit.",
  },
  {
    n: "4",
    title: "The next treatment removes them too",
    body: "And the next one after that. At $400 to $600 a visit, you are paying monthly to return to the same baseline.",
  },
  {
    n: "5",
    title: "Add fertility control and the cycle breaks",
    body: "Rats that consume the bait reproduce at a fraction of normal rate. Over a single breeding cycle the replacement population can't form at full size. The territory empties and stays empty.",
  },
];

function ProblemPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative ink-section">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
          <div>
            <HeroTrustBadges />
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.25em] text-accent-warm">
              Why it keeps coming back
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-white md:text-6xl">
              You paid for the treatment.{" "}
              <span className="text-accent-warm">
                Six weeks later, they were back.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              The exterminator didn't fail. Standard pest control removes what's
              there. The problem is what fills in after they leave — and it's
              not something any standard treatment is designed to stop. Once you
              see why, the fix is obvious.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/get-started">
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Link
                to="/results"
                className="text-sm font-medium text-ink-foreground/85 hover:text-ink-foreground"
              >
                See the field data →
              </Link>
            </div>
          </div>
          <div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* TERRITORIAL BEHAVIOR */}
      <section className="bg-background py-20">
        <div className="container-site grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              What's actually happening
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              City rats are territorial. Treatment removes the occupant. The
              territory stays.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              When a rat colony lives in your block, they mark it. Scent signals
              along their travel paths tell every other rat the space is
              claimed. That marking is what keeps competing groups out. The
              territory has a current occupant, and other rats know it.
            </p>
            <p>
              When treatment clears that colony, those signals fade within days.
              The food source is still there. The building is still there. Rats
              from the surrounding block start testing the space almost
              immediately. No resistance, no competing group. They move in.
            </p>
            <p>
              That's where the new infestation comes from. Not from far away.
              From the same three-block area that was always the source.
              Standard treatment removes the current group but doesn't slow down
              the one filling in after it. The cycle runs on schedule.
            </p>
          </div>
        </div>
      </section>

      {/* THE CYCLE STEPS */}
      <section className="bg-surface py-20">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              Follow this through
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
              Why monthly extermination keeps returning to baseline
            </h2>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FOOD MAKES IT FASTER */}
      <section className="bg-background py-20">
        <div className="container-site grid gap-10 md:grid-cols-2 md:gap-12">
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="text-xl font-bold">How they know the territory is open</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Rats mark travel paths with scent. A living colony refreshes those
              marks continuously. Treatment removes the colony — the marks break
              down within days. Other rats in the block detect the absence and
              start moving in almost immediately.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <h3 className="text-xl font-bold">Why food makes it faster</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Empty territory fills on its own. Empty territory with a
              persistent food source — a restaurant, an apartment trash area, a
              food warehouse — fills faster. In a dense urban block, the
              replacement window is weeks, not months.
            </p>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="ink-section">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
              The fix is layered, not replaced.
            </h2>
            <p className="mt-5 max-w-xl text-ink-muted md:text-lg">
              Keep your existing pest contract. We add the fertility-control
              layer that breaks the replacement cycle. Documented every cycle,
              month-to-month.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="h-12 px-6 text-base">
                <Link to="/get-started">
                  Get started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Link
                to="/results"
                className="text-base font-semibold text-ink-foreground hover:text-brand"
              >
                See real numbers →
              </Link>
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
