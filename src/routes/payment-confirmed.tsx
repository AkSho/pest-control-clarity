import { createFileRoute } from "@tanstack/react-router";

const TITLE = "Order Confirmed — Cloakd";
const DESCRIPTION = "Your Evolve order is confirmed and ships within 24 hours.";

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
    title: "Confirmation email on its way",
    body: "Check your inbox for your order receipt and tracking info. Usually arrives within a few minutes.",
  },
  {
    title: "Ships within 24 hours",
    body: "Your order leaves our warehouse the next business day. Standard delivery is 2–5 business days.",
  },
  {
    title: "Deployment guide included",
    body: "Every order ships with a printed deployment guide. Read it before you place the stations — placement is everything.",
  },
  {
    title: "Check back at 30 days",
    body: "If bait is being consumed, the stations are in the right spots. That's your signal to stay the course and refill on schedule.",
  },
];

function PaymentConfirmedPage() {
  return (
    <>
      <section className="bg-background py-20 md:py-28">
        <div className="container-site max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            Order confirmed
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Your order is in. Here's what to expect.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            A confirmation email is on its way. Your order ships within 24 hours.
            Read the deployment guide before you place the stations — it covers placement,
            first-check timing, and how to read consumption levels.
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
            Questions about your order?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Email us at{" "}
            <a
              href="mailto:hello@cloakd-removals.cloud"
              className="font-semibold text-brand underline-offset-4 hover:underline"
            >
              hello@cloakd-removals.cloud
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
