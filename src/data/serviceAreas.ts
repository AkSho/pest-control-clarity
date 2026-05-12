export type ServiceArea = {
  slug: string;
  city: string;
  state: string;
  region: "NYC" | "NJ";
  intro: string;
  localProof: string;
  neighborhoods: string[];
  faqs: { q: string; a: string }[];
  nearbyAreas: { slug: string; label: string }[];
};

export const SERVICE_AREAS: ServiceArea[] = [
  {
    slug: "manhattan-ny",
    city: "Manhattan",
    state: "NY",
    region: "NYC",
    intro:
      "Manhattan blocks are food-dense, dense-occupancy, and surrounded by neighboring colonies that re-fill any territory you clear. Standard extermination here resets the cycle every 6 to 8 weeks. Our fertility control layer sits on top of your existing program and stops the replacement population from ever forming at full size.",
    localProof:
      "NYC began deploying ContraPest in designated rat mitigation zones in April 2025. We service restaurants, ghost kitchens, and managed properties across all five boroughs with documented monthly reporting your health inspector and ownership can review.",
    neighborhoods: [
      "Midtown",
      "Chelsea",
      "Hell's Kitchen",
      "SoHo",
      "Tribeca",
      "Upper East Side",
      "Upper West Side",
      "Lower East Side",
      "East Village",
      "West Village",
      "Harlem",
      "Financial District",
    ],
    faqs: [
      {
        q: "Do I have to drop my current pest control vendor?",
        a: "No. The fertility control layer runs alongside whatever knockdown program you already have. We integrate; we don't displace.",
      },
      {
        q: "Is this safe in food-handling environments?",
        a: "Yes. The bait is EPA-designated minimum risk, derived from cottonseed, with no secondary kill risk to pets or wildlife. It is cleared for use in NYC food-handling environments.",
      },
      {
        q: "How quickly will I see results?",
        a: "Knockdown effects are immediate. Population suppression from fertility control compounds across breeding cycles — measurable reductions typically appear within 60 to 120 days and continue from there.",
      },
      {
        q: "Will this help with health department violations?",
        a: "Yes — the program ships with monthly documented reporting you can show DOHMH inspectors, ownership, or franchise corporate. The numbers are yours to use.",
      },
    ],
    nearbyAreas: [
      { slug: "manhattan-ny", label: "Brooklyn, NY" },
      { slug: "manhattan-ny", label: "Queens, NY" },
      { slug: "manhattan-ny", label: "Jersey City, NJ" },
    ],
  },
];

export function getServiceArea(slug: string) {
  return SERVICE_AREAS.find((a) => a.slug === slug);
}
