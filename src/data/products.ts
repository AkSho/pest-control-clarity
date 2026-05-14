// Product catalog for Cloakd PDPs.
// Pricing matches SenesTech retail; copy paraphrased from SenesTech product
// pages with gaps filled from existing Cloakd content. Image URLs hotlinked
// from SenesTech's Shopify CDN.

export type ProductSlug = "starter-kit" | "refill";
export type Pest = "rat" | "mouse";
export type Size = "1.5lb" | "3lb" | "6lb" | "12lb";

export type CadenceOption = { months: number; label: string };

export type Subscription = {
  discountPct: number; // e.g. 10
  cadences: CadenceOption[];
  defaultMonths: number;
};

export type Variant = {
  id: string;
  productSlug: ProductSlug;
  pest: Pest;
  size: Size;
  label: string; // size pill, e.g. "6 lb"
  shortName: string;
  oneTimePrice: number;
  image: string;
  galleryImages: string[];
  shippingWeightLb: number;
};

export type FAQ = { q: string; a: string };

export type AccordionContent = {
  description: string;
  howItWorks: string;
  whatsInside: string;
  ingredients: string;
  deployment: string;
  shipping: string;
};

export type Product = {
  slug: ProductSlug;
  title: string;
  subtitle: string;
  intro: string;
  longDescription: string[];
  features: { title: string; body: string }[];
  howItWorks: { step: string; title: string; body: string }[];
  whatsIncluded: string[];
  faq: FAQ[];
  accordion: AccordionContent;
  defaultVariantId: string;
  variants: Variant[];
  subscription: Subscription;
  rating: { avg: number; count: number };
};

// ===== Images (SenesTech CDN) =====
const STATION_CLOSED =
  "https://senestech.com/cdn/shop/files/Evolve_Bait_Station_Closed_Isolated.png?v=1775246340&width=1200";
const STATION_OPEN =
  "https://senestech.com/cdn/shop/files/Evolve_Bait_Station_Open_Isolated.png?v=1775246340&width=1200";

const RAT_15 =
  "https://senestech.com/cdn/shop/files/Evolve-Rat-1.5-1800x1800.jpg?v=1775246194&width=1200";
const RAT_3 =
  "https://senestech.com/cdn/shop/files/Evolve-Rat-3-1800x1800.jpg?v=1775246194&width=1200";
const RAT_6 =
  "https://senestech.com/cdn/shop/files/Evolve-Rat-6-1800x1800_e883469c-9f7f-4c27-b760-d29d7ac414d8.jpg?v=1775245629&width=1200";
const RAT_12 =
  "https://senestech.com/cdn/shop/files/Evolve-Rat-Pail-12-Front-1800x1800.jpg?v=1775235718&width=1200";

const MOUSE_15 =
  "https://senestech.com/cdn/shop/files/Evolve-Mouse-1.5-Pouch-Straight-1800x1800.jpg?v=1775246005&width=1200";
const MOUSE_3 =
  "https://senestech.com/cdn/shop/files/Evolve-Mouse-3-Pouch-Straight-1800x1800.jpg?v=1775246005&width=1200";
const MOUSE_6 =
  "https://senestech.com/cdn/shop/files/Evolve-Mouse-6-Pouch-Straight-1800x1800.jpg?v=1775246005&width=1200";

const STARTER_RAT_HERO =
  "https://senestech.com/cdn/shop/files/Evolve_Rat_XL_Starter_Kit_8f547392-92c7-490e-be46-25162c8724e1.png?v=1775246194&width=1200";
const STARTER_MOUSE_HERO =
  "https://senestech.com/cdn/shop/files/Evolve_Mouse_XL_Starter_Kit_64b722f7-912b-44bc-82bb-5b7e4413b8e7.png?v=1775246005&width=1200";

// ===== Shared content =====
const SHARED_FAQ: FAQ[] = [
  {
    q: "How does Evolve actually work?",
    a: "Evolve is a soft bait built around cottonseed oil — an active ingredient that interferes with reproduction in both male and female rodents. After the first breeding cycle (4–6 weeks) you start seeing fewer pups, and within a few months the colony collapses for lack of new arrivals.",
  },
  {
    q: "Is it safe around pets, kids, and wildlife?",
    a: "Evolve is FIFRA Section 25(b) exempt. The active ingredient is food-grade cottonseed oil — not an anticoagulant or neurotoxin. Used as directed (inside locked stations), it poses little to no risk to people, pets, or non-target predators like hawks and owls.",
  },
  {
    q: "Why doesn't snap-trapping or poison just fix this?",
    a: "Both kill individuals but leave the breeding pair untouched. A single rat pair can produce up to 15,000 descendants in a year. As long as the colony can replace what you remove, you're paying to manage symptoms forever. Evolve attacks the supply side.",
  },
  {
    q: "How much do I need and where do I deploy it?",
    a: "For most properties, a 6 lb pouch covers 30 days of continuous baiting across two stations. Place stations along travel paths — fence lines, foundation walls, behind dumpsters, near burrows. Rodents have to eat it consistently for it to work.",
  },
  {
    q: "Do I need a pesticide license to use this?",
    a: "No. Because Evolve is 25(b) exempt, it doesn't require a restricted-use applicator license. Property managers, restaurant operators, HOA boards, and homeowners can deploy it directly.",
  },
  {
    q: "When will I see results?",
    a: "Bait consumption usually starts within the first week. Reproduction effects begin showing after the first full breeding cycle (4–6 weeks). Most operators see a meaningful drop in sightings and droppings inside 60–90 days of consistent deployment.",
  },
  {
    q: "Can I use it indoors and outdoors?",
    a: "Yes. Inside stations indoors (basements, mechanical rooms, kitchens). Outdoors: along fence lines, near burrows, behind dumpsters, or staked near garden beds. Keep bait dry and out of direct sun for best palatability.",
  },
  {
    q: "Will Evolve work alongside traps or other tools?",
    a: "Yes — it's designed to complement an Integrated Pest Management program. Traps and exclusion handle visible activity; Evolve removes the population's ability to rebound.",
  },
];

const SHARED_HOW: Product["howItWorks"] = [
  {
    step: "01",
    title: "Deploy the bait",
    body: "Place stations along rodent travel paths — foundation walls, fence lines, behind dumpsters, near burrows. The locked station keeps bait dry and out of reach of pets and kids.",
  },
  {
    step: "02",
    title: "They eat it. Willingly.",
    body: "The soft bait is highly palatable — rodents prefer it to most food sources nearby. Consistent consumption is what drives the result, so keep it stocked.",
  },
  {
    step: "03",
    title: "The colony stops replacing itself",
    body: "Fertility decline starts after the first breeding cycle (4–6 weeks). Fewer pups born → smaller next generation → the population collapses on its own timeline.",
  },
];

const SHARED_FEATURES: Product["features"] = [
  {
    title: "Targets reproduction, not individuals",
    body: "Cottonseed-oil active ingredient restricts fertility in both males and females — the lever poison and traps can't pull.",
  },
  {
    title: "FIFRA 25(b) exempt",
    body: "Food-grade active. No restricted-use license required. Safe around pets, kids, and non-target wildlife when used as directed.",
  },
  {
    title: "Works on resistant populations",
    body: "Anticoagulant resistance is now widespread. Evolve sidesteps the resistance arms race entirely — it doesn't kill, it sterilizes.",
  },
  {
    title: "Built for sustained deployment",
    body: "Soft-bait format stays palatable and stable in stations for weeks. One refill cycle keeps a typical site continuously baited.",
  },
];

const SHARED_SUBSCRIPTION: Subscription = {
  discountPct: 10,
  cadences: [
    { months: 1, label: "Every 1 month" },
    { months: 2, label: "Every 2 months" },
    { months: 3, label: "Every 3 months" },
  ],
  defaultMonths: 2,
};

// ===== Catalog =====
export const PRODUCTS: Record<ProductSlug, Product> = {
  "starter-kit": {
    slug: "starter-kit",
    title: "Evolve XL Starter Kit",
    subtitle:
      "Everything you need to start a rodent fertility-control program — bait, stations, and keys in one box.",
    intro:
      "The XL Starter Kit is the cleanest way to begin. Locked bait stations, keys, and an Evolve soft-bait pouch — enough to seed a typical site for the first deployment cycle.",
    longDescription: [
      "Most rodent problems aren't a removal problem. They're a replacement problem. As long as the breeding pair stays intact, every rat or mouse you snap or poison gets replaced — usually faster than you can keep up.",
      "Evolve is the other lever: a soft bait built around cottonseed oil that interferes with reproduction in both males and females. The colony stops generating new pups, the next generation is smaller, and within a few months the population collapses for lack of replacements.",
      "The XL Starter Kit gives you the full first-deployment setup so you can stop reacting and start running an actual program.",
    ],
    features: SHARED_FEATURES,
    howItWorks: SHARED_HOW,
    whatsIncluded: [
      "2 × locked Evolve bait stations",
      "2 × bait station keys",
      "Evolve soft-bait pouch (size depends on variant)",
      "Deployment guide + label and SDS",
    ],
    faq: SHARED_FAQ,
    accordion: {
      description:
        "The XL Starter Kit is a complete first-deployment package. Two locked stations, keys, and Evolve soft bait — built to attack rodent reproduction at the source.",
      howItWorks:
        "Place each station along an active travel path. Load the included Evolve soft bait. Rodents enter, feed, and the cottonseed-oil active ingredient interferes with reproduction in both males and females. Effects begin after the first 4–6 week breeding cycle.",
      whatsInside:
        "Two locked Evolve bait stations · Two station keys · One Evolve soft-bait pouch · Deployment guide · EPA label · Safety Data Sheet (SDS).",
      ingredients:
        "Active ingredient: Cottonseed oil. Other ingredients: food-grade carriers and palatants. FIFRA Section 25(b) exempt minimum-risk pesticide. No anticoagulants. No neurotoxins.",
      deployment:
        "Stations belong along rodent travel paths: foundation walls, fence lines, behind dumpsters, near burrows. Keep bait dry and continuously available — gaps in supply restart the breeding cycle.",
      shipping:
        "Free shipping on orders over $99. Ships in 24 hours from NJ. 30-day satisfaction guarantee on starter kits.",
    },
    defaultVariantId: "starter-kit-rat-1.5lb",
    subscription: SHARED_SUBSCRIPTION,
    rating: { avg: 4.6, count: 38 },
    variants: [
      {
        id: "starter-kit-rat-1.5lb",
        productSlug: "starter-kit",
        pest: "rat",
        size: "1.5lb",
        label: "1.5 lb",
        shortName: "Starter Kit — Rat 1.5 lb",
        oneTimePrice: 45.99,
        image: STARTER_RAT_HERO,
        galleryImages: [STARTER_RAT_HERO, RAT_15, STATION_CLOSED, STATION_OPEN],
        shippingWeightLb: 4,
      },
      {
        id: "starter-kit-rat-6lb",
        productSlug: "starter-kit",
        pest: "rat",
        size: "6lb",
        label: "6 lb · XL",
        shortName: "XL Starter Kit — Rat 6 lb",
        oneTimePrice: 129.99,
        image: STARTER_RAT_HERO,
        galleryImages: [STARTER_RAT_HERO, RAT_6, STATION_CLOSED, STATION_OPEN],
        shippingWeightLb: 8,
      },
      {
        id: "starter-kit-mouse-1.5lb",
        productSlug: "starter-kit",
        pest: "mouse",
        size: "1.5lb",
        label: "1.5 lb",
        shortName: "Starter Kit — Mouse 1.5 lb",
        oneTimePrice: 45.99,
        image: STARTER_MOUSE_HERO,
        galleryImages: [STARTER_MOUSE_HERO, MOUSE_15, STATION_CLOSED, STATION_OPEN],
        shippingWeightLb: 4,
      },
      {
        id: "starter-kit-mouse-6lb",
        productSlug: "starter-kit",
        pest: "mouse",
        size: "6lb",
        label: "6 lb · XL",
        shortName: "XL Starter Kit — Mouse 6 lb",
        oneTimePrice: 129.99,
        image: STARTER_MOUSE_HERO,
        galleryImages: [STARTER_MOUSE_HERO, MOUSE_6, STATION_CLOSED, STATION_OPEN],
        shippingWeightLb: 8,
      },
    ],
  },

  refill: {
    slug: "refill",
    title: "Evolve Refill",
    subtitle:
      "Keep your stations stocked. Soft-bait refill pouches and pails for ongoing deployment.",
    intro:
      "Continuous baiting is what makes fertility control actually work. Refills keep your stations full so the colony never gets a break in the cycle.",
    longDescription: [
      "Once your starter kit is in place, the only thing standing between you and a collapsed colony is consistency. Empty stations don't suppress reproduction.",
      "The 6 lb pouch is the right cadence for most single-site deployments. The 12 lb pail is built for larger properties — multi-unit residential, food-storage facilities, ghost-kitchen complexes — where you'd otherwise be reordering twice as often.",
      "Replenishment plan customers get auto-delivery on the cadence that matches typical consumption. You set the program once and stop thinking about it.",
    ],
    features: SHARED_FEATURES,
    howItWorks: SHARED_HOW,
    whatsIncluded: [
      "Sealed soft-bait pouch or pail (size depends on variant)",
      "Drops directly into Evolve bait stations",
      "Label and SDS sheet included with every shipment",
    ],
    faq: SHARED_FAQ,
    accordion: {
      description:
        "Evolve Refill keeps your existing stations stocked. Same soft-bait formula, sized for ongoing deployment — choose the cadence that matches your site's burn rate.",
      howItWorks:
        "Refills drop straight into your existing Evolve stations. Continuous availability is what drives fertility decline — gaps in supply let the breeding cycle restart. Pick the size that matches your two-month consumption.",
      whatsInside:
        "One sealed Evolve soft-bait pouch or pail (size depends on variant) · Label and SDS sheet · No stations or hardware (those are in the Starter Kit).",
      ingredients:
        "Active ingredient: Cottonseed oil. Other ingredients: food-grade carriers and palatants. FIFRA Section 25(b) exempt minimum-risk pesticide. No anticoagulants. No neurotoxins.",
      deployment:
        "Pull the empty pouch from your station, drop in the new one. Re-bait on a fixed cadence — most sites land on every 30–60 days. Replenishment plans automate this.",
      shipping:
        "Free shipping on orders over $99. Ships in 24 hours from NJ. Replenishment plans cancel anytime.",
    },
    defaultVariantId: "refill-rat-6lb",
    subscription: SHARED_SUBSCRIPTION,
    rating: { avg: 4.6, count: 38 },
    variants: [
      {
        id: "refill-rat-1.5lb",
        productSlug: "refill",
        pest: "rat",
        size: "1.5lb",
        label: "1.5 lb",
        shortName: "Evolve Rat Refill — 1.5 lb",
        oneTimePrice: 34.99,
        image: RAT_15,
        galleryImages: [RAT_15, STATION_OPEN, STATION_CLOSED],
        shippingWeightLb: 2,
      },
      {
        id: "refill-rat-3lb",
        productSlug: "refill",
        pest: "rat",
        size: "3lb",
        label: "3 lb",
        shortName: "Evolve Rat Refill — 3 lb",
        oneTimePrice: 56.99,
        image: RAT_3,
        galleryImages: [RAT_3, STATION_OPEN, STATION_CLOSED],
        shippingWeightLb: 4,
      },
      {
        id: "refill-rat-6lb",
        productSlug: "refill",
        pest: "rat",
        size: "6lb",
        label: "6 lb",
        shortName: "Evolve Rat Refill — 6 lb",
        oneTimePrice: 99.99,
        image: RAT_6,
        galleryImages: [RAT_6, STATION_OPEN, STATION_CLOSED],
        shippingWeightLb: 7,
      },
      {
        id: "refill-rat-12lb",
        productSlug: "refill",
        pest: "rat",
        size: "12lb",
        label: "12 lb",
        shortName: "Evolve Rat Refill — 12 lb",
        oneTimePrice: 199.99,
        image: RAT_12,
        galleryImages: [RAT_12, STATION_OPEN, STATION_CLOSED],
        shippingWeightLb: 13,
      },
      {
        id: "refill-mouse-1.5lb",
        productSlug: "refill",
        pest: "mouse",
        size: "1.5lb",
        label: "1.5 lb",
        shortName: "Evolve Mouse Refill — 1.5 lb",
        oneTimePrice: 34.99,
        image: MOUSE_15,
        galleryImages: [MOUSE_15, STATION_OPEN, STATION_CLOSED],
        shippingWeightLb: 2,
      },
      {
        id: "refill-mouse-3lb",
        productSlug: "refill",
        pest: "mouse",
        size: "3lb",
        label: "3 lb",
        shortName: "Evolve Mouse Refill — 3 lb",
        oneTimePrice: 56.99,
        image: MOUSE_3,
        galleryImages: [MOUSE_3, STATION_OPEN, STATION_CLOSED],
        shippingWeightLb: 4,
      },
      {
        id: "refill-mouse-6lb",
        productSlug: "refill",
        pest: "mouse",
        size: "6lb",
        label: "6 lb",
        shortName: "Evolve Mouse Refill — 6 lb",
        oneTimePrice: 99.99,
        image: MOUSE_6,
        galleryImages: [MOUSE_6, STATION_OPEN, STATION_CLOSED],
        shippingWeightLb: 7,
      },
    ],
  },
};

export function getProduct(slug: ProductSlug): Product {
  return PRODUCTS[slug];
}

export function findVariant(variantId: string): { product: Product; variant: Variant } | null {
  for (const product of Object.values(PRODUCTS)) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return null;
}

// Helper: pick a sibling variant matching pest+size from a target list
export function findSibling(
  variants: Variant[],
  pest: Pest,
  size: Size,
): Variant | undefined {
  return variants.find((v) => v.pest === pest && v.size === size);
}

export function uniquePests(variants: Variant[]): Pest[] {
  return Array.from(new Set(variants.map((v) => v.pest)));
}

export function sizesFor(variants: Variant[], pest: Pest): Variant[] {
  return variants.filter((v) => v.pest === pest);
}

export function subscriptionPrice(oneTime: number, discountPct: number): number {
  return Math.round(oneTime * (1 - discountPct / 100) * 100) / 100;
}

export const FREE_SHIPPING_THRESHOLD_USD = 99;
export const FLAT_SHIPPING_USD = 12.95;

// ===== "Works on" / "Safe around" marquee data =====
export const WORKS_ON = [
  "Norway rats",
  "Roof rats",
  "House mice",
  "Deer mice",
  "Burrows",
  "Fence lines",
  "Dumpster pads",
  "Garages",
  "Crawlspaces",
  "Garden beds",
];

export const SAFE_AROUND = [
  "Dogs",
  "Cats",
  "Kids",
  "Hawks",
  "Owls",
  "Livestock",
  "Backyard chickens",
  "Vegetable gardens",
  "Food-handling areas",
];

// ===== Trust row =====
export const TRUST_ROW = [
  { label: "Made in USA", body: "Developed in Arizona, manufactured stateside." },
  { label: "FIFRA 25(b)", body: "EPA-designated minimum-risk pesticide." },
  { label: "Non-anticoagulant", body: "Cottonseed oil active. No blood thinner." },
  { label: "No secondary kill", body: "Safe for predators that eat treated rodents." },
];

// ===== Mechanism trio =====
export const MECHANISM = [
  {
    title: "Males",
    body: "Sperm production is suppressed within days of consistent feeding. Bucks stop fertilizing.",
  },
  {
    title: "Females",
    body: "Ovarian function is interrupted. Litters get smaller, then stop. No more pups means no more replacement.",
  },
  {
    title: "Cumulative",
    body: "Effect compounds over the breeding cycle (4–6 weeks). The colony shrinks generation by generation — without a die-off you'd have to clean up.",
  },
];

// ===== Field results =====
export const FIELD_RESULTS = [
  {
    stat: "79%",
    label: "Reduction in rat activity",
    note: "Multi-site field study, 12 weeks of consistent baiting.",
  },
  {
    stat: "88%",
    label: "Operator-reported drop in sightings",
    note: "Pest-control professionals using Evolve in active accounts.",
  },
  {
    stat: "79%+",
    label: "Trap-catch reduction",
    note: "Compared to baseline trapping before Evolve deployment.",
  },
];
