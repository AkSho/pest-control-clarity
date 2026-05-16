import { Link } from "@tanstack/react-router";
import type { ProductSlug } from "@/data/products";

const TILES = [
  {
    slug: "starter-kit" as ProductSlug,
    href: "/products/starter-kit",
    image: "/products/starter-kit-rat.png",
    label: "Starting out",
    title: "Evolve Starter Kit",
    desc: "Stations, keys, and bait — everything for your first deployment.",
    price: "From $179",
  },
  {
    slug: "refill" as ProductSlug,
    href: "/products/refill",
    image: "/products/refill-rat-6lb.png",
    label: "Already set up",
    title: "Evolve Refill",
    desc: "Keep your stations stocked. Replenishment plans from $129 every 60 days.",
    price: "From $129",
  },
];

export function FindYourFit({ currentSlug }: { currentSlug: ProductSlug }) {
  return (
    <section className="container-site py-4 md:py-6">
      <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-10">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
          Find your fit
        </span>
        <h2 className="pdp-h2 mt-2 text-foreground">
          Where are you in the process?
        </h2>
      </div>

      <div className="mx-auto mt-10 flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-6 lg:gap-8">
        {TILES.map((t) => {
          const isCurrent = t.slug === currentSlug;
          return (
            <Link
              key={t.slug}
              to={t.href}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border-2 transition sm:w-[calc(50%-12px)] sm:max-w-[340px] ${
                isCurrent
                  ? "border-brand shadow-sm"
                  : "border-border hover:border-foreground/30"
              }`}
            >
              {isCurrent && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-brand px-3 py-1 text-[11px] font-bold text-brand-foreground">
                  You're here
                </span>
              )}
              <div className="aspect-square overflow-hidden bg-white">
                <img
                  src={t.image}
                  alt={t.title}
                  width={400}
                  height={400}
                  loading="lazy"
                  className="h-full w-full object-contain p-6 transition group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-col gap-1.5 bg-surface px-4 py-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
                  {t.label}
                </span>
                <h3 className="text-sm font-bold text-foreground">{t.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
      </div>
    </section>
  );
}
