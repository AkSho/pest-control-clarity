import { Star, Sprout, Leaf, ShieldCheck, Home } from "lucide-react";
import { REVIEWS, type ReviewSource } from "@/data/reviews";

function SourceBadge({ source }: { source: ReviewSource }) {
  // Small platform mark in the top-right corner.
  const common =
    "flex h-9 items-center justify-center rounded-full bg-white px-3 text-[10px] font-bold uppercase tracking-wider shadow-[0_2px_8px_rgba(0,0,0,0.08)] ring-1 ring-border";

  switch (source) {
    case "walmart":
      return (
        <div className={common}>
          <span className="text-[#0071dc]">Walmart</span>
          <span className="ml-1 text-foreground">Marketplace</span>
        </div>
      );
    case "amazon":
      return (
        <div className={common}>
          <span className="lowercase text-foreground" style={{ fontWeight: 800 }}>
            amazon
          </span>
        </div>
      );
    case "agricultural":
      return (
        <div className={common}>
          <Sprout className="h-3 w-3 text-emerald-700" />
          <span className="ml-1 text-foreground">Agricultural</span>
        </div>
      );
    case "sanctuary":
      return (
        <div className={common}>
          <Leaf className="h-3 w-3 text-emerald-700" />
          <span className="ml-1 text-foreground">Sanctuary</span>
        </div>
      );
    case "pest-control":
      return (
        <div className={common}>
          <ShieldCheck className="h-3 w-3 text-brand" />
          <span className="ml-1 text-foreground">Operator</span>
        </div>
      );
    case "residential":
      return (
        <div className={common}>
          <Home className="h-3 w-3 text-brand" />
          <span className="ml-1 text-foreground">Residential</span>
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
          className="relative rounded-2xl border border-border bg-card p-6 pt-12 shadow-[var(--shadow-card)]"
        >
          <div className="absolute right-4 top-4">
            <SourceBadge source={r.source} />
          </div>
          <div className="flex gap-1 text-accent-warm">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
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
