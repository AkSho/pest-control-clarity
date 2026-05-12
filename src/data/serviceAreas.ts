export type Region = "NYC" | "NJ" | "Bay Area";

export type ServiceArea = {
  slug: string;
  city: string;
  state: string;
  region: Region;
  jurisdiction?: string;
  intro: string;
  localProof: string;
  neighborhoods: string[];
  faqs: { q: string; a: string }[];
  nearbyAreas: { slug: string; label: string }[];
};

const JURISDICTION: Record<Region, string> = {
  NYC: "DOHMH",
  NJ: "local NJ health",
  "Bay Area": "local CA health",
};

const STANDARD_FAQS = (city: string, jurisdiction: string): { q: string; a: string }[] => [
  {
    q: "Do I have to drop my current pest control vendor?",
    a: "No. The fertility control layer runs alongside whatever knockdown program you already have. We integrate; we don't displace.",
  },
  {
    q: "Is this safe in food-handling environments?",
    a: `Yes. The bait is EPA-designated minimum risk, derived from cottonseed, with no secondary kill risk to pets or wildlife. It is cleared for use in ${city} food-handling environments.`,
  },
  {
    q: "How quickly will I see results?",
    a: "Knockdown effects are immediate. Population suppression from fertility control compounds across breeding cycles — measurable reductions typically appear within 60 to 120 days and continue from there.",
  },
  {
    q: "Will this help with health department violations?",
    a: `Yes — the program ships with monthly documented reporting you can show ${jurisdiction} inspectors, ownership, or franchise corporate. The numbers are yours to use.`,
  },
];

export const SERVICE_AREAS: ServiceArea[] = [
  // ===================== NYC =====================
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
    faqs: STANDARD_FAQS("NYC", "DOHMH"),
    nearbyAreas: [
      { slug: "brooklyn-ny", label: "Brooklyn, NY" },
      { slug: "queens-ny", label: "Queens, NY" },
      { slug: "jersey-city-nj", label: "Jersey City, NJ" },
    ],
  },
  {
    slug: "brooklyn-ny",
    city: "Brooklyn",
    state: "NY",
    region: "NYC",
    intro:
      "Brooklyn's mix of restaurant corridors, brownstone blocks, and industrial backlots gives rodents continuous harborage and food access. Knockdown alone clears territory that neighboring colonies refill within weeks. Our fertility control layer breaks the replacement cycle on top of your existing pest program.",
    localProof:
      "We service restaurants, ghost kitchens, multifamily portfolios, and HOAs across Brooklyn — from waterfront food halls to row-house blocks deep in central Brooklyn. Documented monthly reporting your DOHMH inspector and ownership can review.",
    neighborhoods: [
      "Williamsburg",
      "Bushwick",
      "DUMBO",
      "Park Slope",
      "Crown Heights",
      "Bed-Stuy",
      "Sunset Park",
      "Bay Ridge",
      "Greenpoint",
      "Gowanus",
      "Brooklyn Heights",
      "Flatbush",
    ],
    faqs: STANDARD_FAQS("NYC", "DOHMH"),
    nearbyAreas: [
      { slug: "manhattan-ny", label: "Manhattan, NY" },
      { slug: "queens-ny", label: "Queens, NY" },
      { slug: "staten-island-ny", label: "Staten Island, NY" },
    ],
  },
  {
    slug: "queens-ny",
    city: "Queens",
    state: "NY",
    region: "NYC",
    intro:
      "Queens spans dense restaurant strips, garden-apartment co-ops, and large food-service operators near the airports. The replacement-cycle problem looks the same across all of them: knockdown clears, neighbors refill. Our fertility control layer sits on top of your existing program and stops the next colony from rebuilding to full size.",
    localProof:
      "We service restaurants, ghost kitchens, food-storage operators, and managed properties across Queens with documented monthly reporting your DOHMH inspector and ownership can review.",
    neighborhoods: [
      "Long Island City",
      "Astoria",
      "Jackson Heights",
      "Flushing",
      "Forest Hills",
      "Ridgewood",
      "Sunnyside",
      "Elmhurst",
      "Jamaica",
      "Rego Park",
    ],
    faqs: STANDARD_FAQS("NYC", "DOHMH"),
    nearbyAreas: [
      { slug: "manhattan-ny", label: "Manhattan, NY" },
      { slug: "brooklyn-ny", label: "Brooklyn, NY" },
      { slug: "bronx-ny", label: "Bronx, NY" },
    ],
  },
  {
    slug: "bronx-ny",
    city: "Bronx",
    state: "NY",
    region: "NYC",
    intro:
      "The Bronx contains some of NYC's largest food-distribution and cold-chain infrastructure plus dense multifamily blocks. Both create constant rodent pressure that standard knockdown alone can't keep up with. Our fertility control layer breaks the replacement cycle on top of your existing pest program.",
    localProof:
      "Hunts Point alone moves enormous food volume daily. We service food-storage operators, restaurants, and managed properties across the Bronx with documented monthly reporting your DOHMH inspector and ownership can review.",
    neighborhoods: [
      "Mott Haven",
      "Hunts Point",
      "Fordham",
      "Riverdale",
      "Belmont",
      "Concourse",
      "Soundview",
      "Throgs Neck",
    ],
    faqs: STANDARD_FAQS("NYC", "DOHMH"),
    nearbyAreas: [
      { slug: "manhattan-ny", label: "Manhattan, NY" },
      { slug: "queens-ny", label: "Queens, NY" },
    ],
  },
  {
    slug: "staten-island-ny",
    city: "Staten Island",
    state: "NY",
    region: "NYC",
    intro:
      "Staten Island's mix of waterfront commercial, suburban-density residential, and food-service strips faces the same replacement-cycle problem as the rest of NYC — just at lower visible density until pressure builds. Our fertility control layer breaks that cycle on top of your existing pest program.",
    localProof:
      "We service restaurants, HOAs, and managed properties across Staten Island with documented monthly reporting your DOHMH inspector and ownership can review.",
    neighborhoods: [
      "St. George",
      "Stapleton",
      "Tottenville",
      "New Dorp",
      "Great Kills",
      "West Brighton",
    ],
    faqs: STANDARD_FAQS("NYC", "DOHMH"),
    nearbyAreas: [
      { slug: "brooklyn-ny", label: "Brooklyn, NY" },
      { slug: "manhattan-ny", label: "Manhattan, NY" },
    ],
  },

  // ===================== NJ =====================
  {
    slug: "jersey-city-nj",
    city: "Jersey City",
    state: "NJ",
    region: "NJ",
    intro:
      "Jersey City's dense waterfront, restaurant corridors, and high-rise residential blocks face the same replacement-cycle problem as Manhattan across the river. Our fertility control layer sits on top of your existing pest program and stops the next colony from rebuilding to full size.",
    localProof:
      "NJ uses local health enforcement instead of NYC's letter-grade system, but the exposure is real — permits can be suspended without warning. We service restaurants, ghost kitchens, and managed properties across Hudson County with documented monthly reporting.",
    neighborhoods: [
      "Downtown",
      "Journal Square",
      "The Heights",
      "Greenville",
      "Bergen-Lafayette",
      "West Side",
      "Newport",
      "Paulus Hook",
    ],
    faqs: STANDARD_FAQS("NJ", "local NJ health"),
    nearbyAreas: [
      { slug: "hoboken-nj", label: "Hoboken, NJ" },
      { slug: "newark-nj", label: "Newark, NJ" },
      { slug: "manhattan-ny", label: "Manhattan, NY" },
    ],
  },
  {
    slug: "hoboken-nj",
    city: "Hoboken",
    state: "NJ",
    region: "NJ",
    intro:
      "Hoboken's restaurant density per square mile rivals anywhere in the region. Mile-square geography concentrates the rodent pressure. Our fertility control layer sits on top of your existing pest program and breaks the replacement cycle.",
    localProof:
      "We service Washington Street restaurants, waterfront food halls, and multifamily property managers across Hoboken with documented monthly reporting your local health inspector and ownership can review.",
    neighborhoods: [
      "Washington Street",
      "Uptown",
      "Downtown",
      "Waterfront",
      "Southwest",
    ],
    faqs: STANDARD_FAQS("NJ", "local NJ health"),
    nearbyAreas: [
      { slug: "jersey-city-nj", label: "Jersey City, NJ" },
      { slug: "newark-nj", label: "Newark, NJ" },
      { slug: "manhattan-ny", label: "Manhattan, NY" },
    ],
  },
  {
    slug: "newark-nj",
    city: "Newark",
    state: "NJ",
    region: "NJ",
    intro:
      "Newark combines a major airport, food-distribution corridors, and dense residential neighborhoods — all sources of continuous rodent pressure. Our fertility control layer sits on top of your existing pest program and stops the replacement population from rebuilding to full size.",
    localProof:
      "We service restaurants, food-storage operators, and managed properties across Newark with documented monthly reporting your local NJ health inspector and ownership can review.",
    neighborhoods: [
      "Ironbound",
      "Downtown",
      "University Heights",
      "North Newark",
      "Weequahic",
      "Forest Hill",
    ],
    faqs: STANDARD_FAQS("NJ", "local NJ health"),
    nearbyAreas: [
      { slug: "jersey-city-nj", label: "Jersey City, NJ" },
      { slug: "bayonne-nj", label: "Bayonne, NJ" },
      { slug: "hoboken-nj", label: "Hoboken, NJ" },
    ],
  },
  {
    slug: "bayonne-nj",
    city: "Bayonne",
    state: "NJ",
    region: "NJ",
    intro:
      "Bayonne's port-adjacent industrial sites and dense residential blocks face the same replacement-cycle problem as the rest of Hudson County. Our fertility control layer breaks that cycle on top of your existing pest program.",
    localProof:
      "We service restaurants, food-storage operators, and managed properties across Bayonne with documented monthly reporting your local NJ health inspector and ownership can review.",
    neighborhoods: [
      "Downtown",
      "Bergen Point",
      "Constable Hook",
      "West Side",
    ],
    faqs: STANDARD_FAQS("NJ", "local NJ health"),
    nearbyAreas: [
      { slug: "jersey-city-nj", label: "Jersey City, NJ" },
      { slug: "newark-nj", label: "Newark, NJ" },
    ],
  },

  // ===================== Bay Area =====================
  {
    slug: "san-francisco-ca",
    city: "San Francisco",
    state: "CA",
    region: "Bay Area",
    intro:
      "San Francisco's food-dense corridors and dense-occupancy buildings face the same replacement-cycle problem as any major metro: standard knockdown clears territory, surrounding colonies refill it within weeks. Our fertility control layer sits on top of your existing program and stops the replacement population from ever forming at full size.",
    localProof:
      "We service restaurants, ghost kitchens, and managed properties across the Bay Area with documented monthly reporting your health inspector and ownership can review.",
    neighborhoods: [
      "SoMa",
      "Mission",
      "Financial District",
      "Tenderloin",
      "Chinatown",
      "North Beach",
      "Hayes Valley",
      "Marina",
      "Castro",
      "Sunset",
      "Richmond",
      "Bayview",
    ],
    faqs: STANDARD_FAQS("Bay Area", "local CA health"),
    nearbyAreas: [
      { slug: "oakland-ca", label: "Oakland, CA" },
      { slug: "san-jose-ca", label: "San Jose, CA" },
    ],
  },
  {
    slug: "oakland-ca",
    city: "Oakland",
    state: "CA",
    region: "Bay Area",
    intro:
      "Oakland's mixed commercial corridors and dense residential blocks face constant rodent pressure from neighboring colonies. Standard extermination resets every few weeks. Our fertility control layer sits on top of your existing program and breaks the replacement cycle.",
    localProof:
      "We service restaurants, ghost kitchens, and managed properties across the East Bay with documented monthly reporting your health inspector and ownership can review.",
    neighborhoods: [
      "Downtown",
      "Jack London Square",
      "Lake Merritt",
      "Temescal",
      "Rockridge",
      "Fruitvale",
      "West Oakland",
      "Chinatown",
    ],
    faqs: STANDARD_FAQS("Bay Area", "local CA health"),
    nearbyAreas: [
      { slug: "san-francisco-ca", label: "San Francisco, CA" },
      { slug: "san-jose-ca", label: "San Jose, CA" },
    ],
  },
  {
    slug: "san-jose-ca",
    city: "San Jose",
    state: "CA",
    region: "Bay Area",
    intro:
      "San Jose's commercial food corridors and managed residential properties face the same replacement-cycle problem as the rest of the Bay. Standard knockdown clears the territory, surrounding colonies refill within weeks. Our fertility control layer breaks that cycle on top of your existing program.",
    localProof:
      "We service restaurants, ghost kitchens, and managed properties across the South Bay with documented monthly reporting your health inspector and ownership can review.",
    neighborhoods: [
      "Downtown",
      "Japantown",
      "Willow Glen",
      "Santana Row",
      "Berryessa",
      "Almaden",
      "Cambrian",
      "Evergreen",
    ],
    faqs: STANDARD_FAQS("Bay Area", "local CA health"),
    nearbyAreas: [
      { slug: "san-francisco-ca", label: "San Francisco, CA" },
      { slug: "oakland-ca", label: "Oakland, CA" },
    ],
  },
];

export function getJurisdiction(area: ServiceArea) {
  return area.jurisdiction ?? JURISDICTION[area.region];
}

export function getServiceArea(slug: string) {
  return SERVICE_AREAS.find((a) => a.slug === slug);
}

export function getAreasByRegion(region: Region) {
  return SERVICE_AREAS.filter((a) => a.region === region);
}

export const REGIONS: { key: Region; label: string; blurb: string }[] = [
  {
    key: "NYC",
    label: "New York City",
    blurb: "All five boroughs. Restaurants, ghost kitchens, multifamily, and food storage.",
  },
  {
    key: "NJ",
    label: "New Jersey",
    blurb: "Hudson County and beyond. Local health enforcement. Permit exposure is real.",
  },
  {
    key: "Bay Area",
    label: "Bay Area",
    blurb: "San Francisco, East Bay, and South Bay. Food corridors and managed properties.",
  },
];
