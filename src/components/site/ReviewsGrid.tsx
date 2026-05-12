import { Star, Home } from "lucide-react";
import { REVIEWS, type ReviewSource } from "@/data/reviews";
import walmartLogo from "@/assets/reviews/walmart.png";
import amazonLogo from "@/assets/reviews/amazon.png";
import southCountyLogo from "@/assets/reviews/south-county.png";
import fiveOFarmLogo from "@/assets/reviews/five-o-farm.png";
import wildhorseLogo from "@/assets/reviews/wildhorse.png";

const LOGOS: Partial<Record<ReviewSource, string>> = {
  walmart: walmartLogo,
  amazon: amazonLogo,
  "pest-control": southCountyLogo,
  agricultural: fiveOFarmLogo,
  sanctuary: wildhorseLogo,
};

function SourceLogo({ source }: { source: ReviewSource }) {
  const wrap =
    "flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.08)] ring-1 ring-border overflow-hidden";

  const logo = LOGOS[source];
  if (logo) {
    return (
      <div className={wrap}>
        <img
          src={logo}
          alt=""
          className="h-full w-full object-contain p-1.5"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={wrap}>
      <Home className="h-7 w-7 text-brand" />
    </div>
  );
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
