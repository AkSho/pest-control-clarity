import { useState } from "react";
import { Star, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { REVIEWS_BY_TAB, REVIEW_TABS, type ReviewTab } from "@/data/pdpReviews";

export function ReviewsCarousel({ avgRating, count }: { avgRating: number; count: number }) {
  const [tab, setTab] = useState<ReviewTab>("Results");
  const reviews = REVIEWS_BY_TAB[tab];

  return (
    <section id="reviews" className="border-y border-border bg-surface">
      <div className="container-site py-16">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Verified reviews
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            What people are seeing in the field
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.round(avgRating)
                      ? "fill-accent-warm text-accent-warm"
                      : "text-muted-foreground",
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">{avgRating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">· {count} verified reviews</span>
          </div>
        </div>

        {/* Tab buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {REVIEW_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                tab === t
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:border-foreground/40",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 3-column grid — all 3 visible at once on desktop */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <article
              key={`${tab}-${i}`}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
            >
              <div className="flex">
                {[0, 1, 2, 3, 4].map((j) => (
                  <Star
                    key={j}
                    className={cn(
                      "h-4 w-4",
                      j < r.rating
                        ? "fill-accent-warm text-accent-warm"
                        : "text-muted-foreground",
                    )}
                  />
                ))}
              </div>
              <h3 className="text-base font-bold leading-snug text-foreground">{r.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">{r.name}</div>
                  {r.org && (
                    <div className="text-xs text-muted-foreground">{r.org}</div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-brand">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
