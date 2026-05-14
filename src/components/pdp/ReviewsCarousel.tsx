import { useMemo, useState } from "react";
import { Star, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PDP_REVIEWS, REVIEW_TAGS, type ReviewTag } from "@/data/pdpReviews";

export function ReviewsCarousel({ avgRating, count }: { avgRating: number; count: number }) {
  const [tag, setTag] = useState<ReviewTag>("all");
  const [scrollIdx, setScrollIdx] = useState(0);

  const filtered = useMemo(() => {
    if (tag === "all") return PDP_REVIEWS;
    return PDP_REVIEWS.filter((r) => r.tags.includes(tag as Exclude<ReviewTag, "all">));
  }, [tag]);

  const visible = 2; // cards visible on desktop estimate
  const maxIdx = Math.max(0, filtered.length - visible);
  const safeIdx = Math.min(scrollIdx, maxIdx);

  return (
    <section id="reviews" className="border-y border-border bg-surface">
      <div className="container-site py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Operator reviews
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              From people who actually deploy this
            </h2>
            <div className="mt-3 flex items-center gap-2">
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

          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => setScrollIdx((i) => Math.max(0, i - 1))}
              disabled={safeIdx === 0}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:bg-surface disabled:opacity-40"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setScrollIdx((i) => Math.min(maxIdx, i + 1))}
              disabled={safeIdx >= maxIdx}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:bg-surface disabled:opacity-40"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tag filter */}
        <div className="mt-6 flex flex-wrap gap-2">
          {REVIEW_TAGS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTag(t.id);
                setScrollIdx(0);
              }}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
                tag === t.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:border-foreground/40",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Carousel track */}
        <div className="mt-8 overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${safeIdx} * (100% / 2 + 10px)))` }}
          >
            {filtered.map((r, i) => (
              <article
                key={`${r.name}-${i}`}
                className="flex w-full shrink-0 flex-col gap-3 rounded-2xl border border-border bg-card p-6 md:w-[calc(50%-10px)]"
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
                <h3 className="text-base font-bold text-foreground">{r.title}</h3>
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
      </div>
    </section>
  );
}
