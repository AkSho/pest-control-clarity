import { Users } from "lucide-react";
import restaurants from "@/assets/who/restaurants.png";
import ghostKitchens from "@/assets/who/ghost-kitchens.png";
import coldChain from "@/assets/who/cold-chain.png";
import residential from "@/assets/who/residential.png";
import propertyManagers from "@/assets/who/property-managers.png";

type Card = {
  title: string;
  desc: string;
  badge: string;
  image?: string;
};

const CARDS: Card[] = [
  {
    title: "Restaurants",
    desc: "One rodent sighting is a critical NYC violation (04K / 04L). One temporary closure costs $15K–$50K in lost revenue.",
    badge: "$300–$2,000 per violation",
    image: restaurants,
  },
  {
    title: "Property Managers",
    desc: "Tenant complaints don't stop until the population does. One program across every address you manage.",
    badge: "Multi-building coverage",
    image: propertyManagers,
  },
  {
    title: "Ghost Kitchens",
    desc: "High-density buildings, constant food cycling, no locked-in pest contracts. We work directly with operators.",
    badge: "No vendor displacement",
    image: ghostKitchens,
  },
  {
    title: "Food Storage & Cold Chain",
    desc: "Continuous product flow makes traditional knockdown a treadmill. Fertility control compounds reductions across cycles.",
    badge: "Compliance documentation",
    image: coldChain,
  },
  {
    title: "HOAs & Co-ops",
    desc: "Board-friendly reporting, predictable monthly billing, shared visibility across the property.",
    badge: "Board-ready reports",
  },
  {
    title: "Residential",
    desc: "Brownstones, townhouses, and managed residential blocks where standard exterminators keep coming back.",
    badge: "Month-to-month",
    image: residential,
  },
];

export function WhoWeServeGrid() {
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {CARDS.map((c) => (
        <article
          key={c.title}
          className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-ink">
            {c.image ? (
              <img
                src={c.image}
                alt={c.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Users className="h-16 w-16 text-white/30" />
              </div>
            )}
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
            <div className="mt-5 inline-flex items-center rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
              {c.badge}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
