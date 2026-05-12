export type ServiceArea = {
  slug: string;
  city: string;
  state: string;
  region: "NYC" | "NJ" | "CA";
  intro: string;
  localProof: string;
  neighborhoods: string[];
  faqs: { q: string; a: string }[];
  nearbyAreas: { slug: string; label: string }[];
};

const SHARED_FAQS = [
  {
    q: "Do I have to drop my current pest control vendor?",
    a: "No. The fertility control layer runs alongside whatever knockdown program you already have. We integrate; we don't displace.",
  },
  {
    q: "Is this safe in food-handling environments?",
    a: "Yes. The bait is EPA-designated minimum risk, derived from cottonseed, with no secondary kill risk to pets or wildlife.",
  },
  {
    q: "How quickly will I see results?",
    a: "Knockdown is immediate. Population suppression from fertility control compounds across breeding cycles — measurable reductions typically appear within 60 to 120 days.",
  },
];

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
      "Midtown", "Chelsea", "Hell's Kitchen", "SoHo", "Tribeca",
      "Upper East Side", "Upper West Side", "Lower East Side",
      "East Village", "West Village", "Harlem", "Financial District",
    ],
    faqs: [
      {
        q: "Will this help with health department violations?",
        a: "Yes — the program ships with monthly documented reporting you can show DOHMH inspectors, ownership, or franchise corporate.",
      },
      ...SHARED_FAQS,
    ],
    nearbyAreas: [
      { slug: "manhattan-ny", label: "Brooklyn, NY" },
      { slug: "manhattan-ny", label: "Queens, NY" },
      { slug: "manhattan-ny", label: "Jersey City, NJ" },
    ],
  },
  {
    slug: "san-francisco-ca",
    city: "San Francisco",
    state: "CA",
    region: "CA",
    intro:
      "San Francisco's mixed-use density, year-round mild climate, and active food scene give rodent colonies a 12-month breeding window. Standard knockdown clears territory; surrounding colonies move back in within weeks. Our fertility control layer suppresses the replacement population so your existing program actually compounds.",
    localProof:
      "SF Department of Public Health prioritizes integrated rodent management for restaurants and multi-unit residential. We deliver documented monthly reporting that satisfies DPH inspectors, ownership, and HOAs across the city.",
    neighborhoods: [
      "Mission", "SoMa", "Financial District", "North Beach",
      "Chinatown", "Castro", "Hayes Valley", "Marina",
      "Tenderloin", "Richmond", "Sunset", "Bayview",
    ],
    faqs: SHARED_FAQS,
    nearbyAreas: [
      { slug: "oakland-ca", label: "Oakland, CA" },
      { slug: "san-jose-ca", label: "San Jose, CA" },
    ],
  },
  {
    slug: "oakland-ca",
    city: "Oakland",
    state: "CA",
    region: "CA",
    intro:
      "Oakland's port-adjacent warehouses, dense restaurant corridors, and older multi-family housing stock create persistent harborage. Knockdown alone resets every six to eight weeks. Fertility control breaks the cycle by suppressing reproduction in the surrounding population.",
    localProof:
      "Alameda County Vector Control supports integrated approaches for high-pressure properties. Our monthly track-density reports give property managers and food operators documentation for inspectors and ownership.",
    neighborhoods: [
      "Downtown", "Jack London Square", "Fruitvale", "Temescal",
      "Rockridge", "West Oakland", "Lake Merritt", "Chinatown",
      "Piedmont Avenue", "Dimond District",
    ],
    faqs: SHARED_FAQS,
    nearbyAreas: [
      { slug: "san-francisco-ca", label: "San Francisco, CA" },
      { slug: "san-jose-ca", label: "San Jose, CA" },
    ],
  },
  {
    slug: "san-jose-ca",
    city: "San Jose",
    state: "CA",
    region: "CA",
    intro:
      "San Jose's sprawl of commercial kitchens, tech-campus food halls, and managed residential communities means rodent pressure rarely stays local. Standard treatment clears one site; neighboring colonies replace within weeks. Fertility control layered onto your program ends the replacement cycle.",
    localProof:
      "Santa Clara County Vector Control District supports integrated rodent management across the South Bay. We provide monthly documented reporting for property managers, food operators, and HOAs.",
    neighborhoods: [
      "Downtown", "Willow Glen", "Japantown", "Santana Row",
      "North San Jose", "East San Jose", "Cambrian", "Almaden",
      "Berryessa", "Evergreen",
    ],
    faqs: SHARED_FAQS,
    nearbyAreas: [
      { slug: "san-francisco-ca", label: "San Francisco, CA" },
      { slug: "oakland-ca", label: "Oakland, CA" },
    ],
  },
];

export function getServiceArea(slug: string) {
  return SERVICE_AREAS.find((a) => a.slug === slug);
}
