import { createFileRoute, Link } from "@tanstack/react-router";
import { canonicalLink } from "@/lib/seo";

const TITLE = "Received — Cloakd Removals";
const DESCRIPTION =
  "Thanks — we received your intake. We'll review your property details and respond within one business day.";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
    links: canonicalLink("/thank-you"),
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container-site max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          Received
        </p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          We'll be in touch within one business day.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
          We'll review your property details and put together a program outline
          covering Phase 1 coordination and a 90-day monitoring schedule. If the
          program isn't the right fit for your situation, we'll tell you that too.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/how-it-works"
            className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
          >
            How the program works
          </Link>
          <Link
            to="/results"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
          >
            See the field data
          </Link>
        </div>
      </div>
    </section>
  );
}
