import { createFileRoute, Link } from "@tanstack/react-router";

const TITLE = "Payment Confirmed — Cloakd Removals";
const DESCRIPTION =
  "Payment confirmed. Here's what happens next: intake email, site walk, Phase 1 coordination, and baseline deployment.";

export const Route = createFileRoute("/payment-confirmed")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: PaymentConfirmedPage,
});

const STEPS = [
  {
    title: "Intake email",
    body: "Arriving within the hour. Reply with your property details and exterminator contact.",
  },
  {
    title: "Site walk scheduled",
    body: "We book your PCO site walk within one week of your intake response.",
  },
  {
    title: "Phase 1 coordination",
    body: "We contact your existing exterminator to align Phase 1 timing before Evolve goes in.",
  },
  {
    title: "Baseline deployment",
    body: "Evolve stations and tracking plates in by week 3–4. Your monitoring record starts here.",
  },
];

function PaymentConfirmedPage() {
  return (
    <>
      <section className="bg-background py-20 md:py-28">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Payment confirmed
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            You're in. Here's what happens next.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            You'll receive an email within the hour with intake questions —
            property access, your current exterminator, and any active citations.
            Once we have those, we schedule the site walk within the week.
          </p>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <div className="container-site">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] md:p-8"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground text-sm font-extrabold">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-extrabold leading-tight md:text-xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-site max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold leading-tight md:text-3xl">
            Questions before the intake email arrives?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Reach out directly at{" "}
            <a
              href="mailto:hello@cloakd-removals.cloud"
              className="font-semibold text-brand underline-offset-4 hover:underline"
            >
              hello@cloakd-removals.cloud
            </a>
          </p>
          <div className="mt-8">
            <Link
              to="/what-to-expect"
              className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
            >
              Review the full program timeline
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
