import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import restaurants from "@/assets/who/restaurants.png";
import ghostKitchens from "@/assets/who/ghost-kitchens.png";
import coldChain from "@/assets/who/cold-chain.png";
import residential from "@/assets/who/residential.png";
import propertyManagers from "@/assets/who/property-managers.png";
import hoasCoops from "@/assets/who/hoas-coops.jpg";
import type { SolutionSlug } from "@/data/solutions";

type Card = {
  slug: SolutionSlug;
  title: string;
  desc: string;
  badge: string;
  image?: string;
};

const CARDS: Card[] = [
  {
    slug: "restaurants",
    title: "Restaurants",
    desc: "One rodent sighting is a critical NYC violation (04K / 04L). One temporary closure costs $15K–$50K in lost revenue.",
    badge: "$300–$2,000 per violation",
    image: restaurants,
  },
  {
    slug: "property-managers",
    title: "Property Managers",
    desc: "Tenant complaints don't stop until the population stops replacing itself. Evolve covers rats and mice across any number of buildings.",
    badge: "Multi-building coverage",
    image: propertyManagers,
  },
  {
    slug: "ghost-kitchens",
    title: "Ghost Kitchens",
    desc: "High-density buildings, constant food cycling, and pressure that doesn't pause between service visits. Fertility control works between knockdowns.",
    badge: "No vendor displacement",
    image: ghostKitchens,
  },
  {
    slug: "food-storage",
    title: "Food Storage & Cold Chain",
    desc: "Continuous product flow makes traditional knockdown a treadmill. Fertility control compounds reductions across cycles.",
    badge: "Compliance documentation",
    image: coldChain,
  },
  {
    slug: "hoas",
    title: "HOAs & Co-ops",
    desc: "One product order covers multiple buildings. The field data makes it easy to document results for boards or management.",
    badge: "Field-documented results",
    image: hoasCoops,
  },
  {
    slug: "residential",
    title: "Residential",
    desc: "Brownstones, townhouses, and managed residential blocks where standard exterminators keep coming back.",
    badge: "Starter kit + refills",
    image: residential,
  },
];

export function WhoWeServeGrid() {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {CARDS.map((c) => (
        <Link
          key={c.title}
          to="/solutions/$slug"
          params={{ slug: c.slug }}
          className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-brand"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-ink">
            <img
              src={c.image}
              alt={c.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5">
              <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-white">
                {c.title}
              </h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {c.desc}
            </p>
            <div className="mt-5 flex items-center justify-between">
              <span className="inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                {c.badge}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:text-brand" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
