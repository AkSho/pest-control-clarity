import { Star, Sprout, Leaf, ShieldCheck, Home } from "lucide-react";
import { REVIEWS, type ReviewSource } from "@/data/reviews";

function SourceLogo({ source }: { source: ReviewSource }) {
  // Larger square logo chip rendered top-left of each card.
  const wrap =
    "flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-border";

  switch (source) {
    case "walmart":
      return (
        <div className={wrap}>
          <span className="text-[11px] font-extrabold leading-none text-[#0071dc]">
            Walmart
          </span>
        </div>
      );
    case "amazon":
      return (
        <div className={wrap}>
          <span
            className="text-[13px] lowercase leading-none text-foreground"
            style={{ fontWeight: 900 }}
          >
            amazon
          </span>
        </div>
      );
    case "agricultural":
      return (
        <div className={wrap}>
          <Sprout className="h-7 w-7 text-emerald-700" />
        </div>
      );
    case "sanctuary":
      return (
        <div className={wrap}>
          <Leaf className="h-7 w-7 text-emerald-700" />
        </div>
      );
    case "pest-control":
      return (
        <div className={wrap}>
          <ShieldCheck className="h-7 w-7 text-brand" />
        </div>
      );
    case "residential":
      return (
        <div className={wrap}>
          <Home className="h-7 w-7 text-brand" />
        </div>
      );
  }
}

export function ReviewsGrid() {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {REVIEWS.map((r, i) => (
        <figure
          key={i}
          className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
        >
          <div className="flex items-center justify-between">
            <SourceLogo source={r.source} />
            <div className="flex gap-1 text-accent-warm">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </div>
          <blockquote className="mt-5 text-sm leading-relaxed text-muted-foreground">
            “{r.body}”
          </blockquote>
          <figcaption className="mt-5 border-t border-border pt-4">
            <div className="text-sm font-bold text-foreground">{r.org}</div>
            <div className="mt-0.5 text-xs font-semibold text-accent-warm">
              {r.name}
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

