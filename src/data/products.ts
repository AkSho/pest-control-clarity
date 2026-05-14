// Product catalog for Cloakd PDPs.
// Pricing per Cloakd; copy paraphrased from SenesTech product pages with
// gaps filled from existing Cloakd content. Image URLs hotlinked from
// SenesTech's Shopify CDN.

export type ProductSlug = "starter-kit" | "refill";
export type Pest = "rat" | "mouse";
export type Size = "6lb" | "12lb";

export type Subscription = {
  price: number;
  cadenceDays: number;
  cadenceLabel: string; // e.g. "every 60 days"
};

export type Variant = {
  id: string; // url slug, e.g. "starter-kit-rat", "refill-rat-12lb"
  productSlug: ProductSlug;
  pest: Pest;
  size: Size;
  label: string; // pill label, e.g. "Rat", "Rat 12 lb"
  shortName: string; // e.g. "Starter Kit — Rat"
  oneTimePrice: number;
  subscription: Subscription | null;
  image: string;
  galleryImages: string[];
  shippingWeightLb: number;
};

export type FAQ = { q: string; a: string };

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
  defaultVariantId: string;
  variants: Variant[];
};

const STATION_CLOSED =
  "https://senestech.com/cdn/shop/files/Evolve_Bait_Station_Closed_Isolated.png?v=1775246340&width=1200";
const STATION_OPEN =
  "https://senestech.com/cdn/shop/files/Evolve_Bait_Station_Open_Isolated.png?v=1775246340&width=1200";

const RAT_POUCH_6 =
  "https://senestech.com/cdn/shop/files/Evolve-Rat-6-1800x1800.jpg?v=1775246194&width=1200";
const RAT_POUCH_6_REFILL =
  "https://senestech.com/cdn/shop/files/Evolve-Rat-6-1800x1800_e883469c-9f7f-4c27-b760-d29d7ac414d8.jpg?v=1775245629&width=1200";
const RAT_PAIL_12 =
  "https://senestech.com/cdn/shop/files/Evolve-Rat-Pail-12-Front-1800x1800.jpg?v=1775235718&width=1200";
const MOUSE_POUCH_6 =
  "https://senestech.com/cdn/shop/files/Evolve-Mouse-6-Pouch-Straight-1800x1800.jpg?v=1775246005&width=1200";

const STARTER_RAT_HERO =
  "https://senestech.com/cdn/shop/files/Evolve_Rat_XL_Starter_Kit_8f547392-92c7-490e-be46-25162c8724e1.png?v=1775246194&width=1200";
const STARTER_MOUSE_HERO =
  "https://senestech.com/cdn/shop/files/Evolve_Mouse_XL_Starter_Kit_64b722f7-912b-44bc-82bb-5b7e4413b8e7.png?v=1775246005&width=1200";

const SHARED_FAQ: FAQ[] = [
  {
    q: "How does Evolve actually work?",
    a: "Evolve is a soft bait laced with cottonseed oil — an active ingredient that interferes with reproduction in both male and female rodents. The population doesn't crash overnight; it stops replacing itself. After the first breeding cycle (4–6 weeks) you start seeing fewer pups, and within a few months the colony collapses for lack of new arrivals.",
  },
  {
    q: "Is it safe around pets, kids, and wildlife?",
    a: "Evolve is FIFRA Section 25(b) exempt. The active ingredient is food-grade cottonseed oil, not an anticoagulant or neurotoxin. Used as directed (inside the locked bait stations included in the starter kit), it poses little to no risk to people, pets, or non-target predators like hawks and owls.",
  },
  {
    q: "Why doesn't snap-trapping or poison just fix this?",
    a: "Both kill individual rodents but leave the breeding pair untouched. A single rat pair can produce up to 15,000 descendants in a year. As long as the colony can replace what you remove, you're paying to manage symptoms forever. Evolve attacks the supply side.",
  },
  {
    q: "How much do I need and where do I deploy it?",
    a: "For most properties, a 6 lb pouch covers 30 days of continuous baiting across two stations. Place stations along travel paths — fence lines, foundation walls, behind dumpsters, near burrows. Keep the bait fresh and accessible; rodents have to eat it consistently for it to work.",
  },
  {
    q: "Do I need a pesticide license to use this?",
    a: "No. Because Evolve is 25(b) exempt, it doesn't require a restricted-use applicator license. That means property managers, restaurant operators, HOA boards, and homeowners can deploy it directly.",
  },
  {
    q: "When will I see results?",
    a: "Bait consumption usually starts within the first week. Reproduction effects begin showing after the first full breeding cycle (4–6 weeks). Most operators see a meaningful drop in sightings and droppings inside 60–90 days of consistent deployment.",
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

export const PRODUCTS: Record<ProductSlug, Product> = {
  "starter-kit": {
    slug: "starter-kit",
    title: "Evolve XL Starter Kit",
    subtitle:
      "Everything you need to start a rodent fertility-control program — bait, stations, and keys in one box.",
    intro:
      "The XL Starter Kit is the cleanest way to begin. Two locked bait stations, two keys, and a 6 lb pouch of Evolve soft bait — enough to seed a typical site for the first deployment cycle.",
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
      "1 × 6 lb (2.7 kg) Evolve soft-bait pouch",
      "Deployment guide + label and SDS",
    ],
    faq: SHARED_FAQ,
    defaultVariantId: "starter-kit-rat",
    variants: [
      {
        id: "starter-kit-rat",
        productSlug: "starter-kit",
        pest: "rat",
        size: "6lb",
        label: "Rat",
        shortName: "XL Starter Kit — Rat",
        oneTimePrice: 169,
        subscription: null,
        image: STARTER_RAT_HERO,
        galleryImages: [STARTER_RAT_HERO, RAT_POUCH_6, STATION_CLOSED, STATION_OPEN],
        shippingWeightLb: 8,
      },
      {
        id: "starter-kit-mouse",
        productSlug: "starter-kit",
        pest: "mouse",
        size: "6lb",
        label: "Mouse",
        shortName: "XL Starter Kit — Mouse",
        oneTimePrice: 169,
        subscription: null,
        image: STARTER_MOUSE_HERO,
        galleryImages: [STARTER_MOUSE_HERO, MOUSE_POUCH_6, STATION_CLOSED, STATION_OPEN],
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
    defaultVariantId: "refill-rat-6lb",
    variants: [
      {
        id: "refill-rat-6lb",
        productSlug: "refill",
        pest: "rat",
        size: "6lb",
        label: "Rat 6 lb",
        shortName: "Evolve Rat Refill — 6 lb",
        oneTimePrice: 149,
        subscription: { price: 129, cadenceDays: 60, cadenceLabel: "every 60 days" },
        image: RAT_POUCH_6_REFILL,
        galleryImages: [RAT_POUCH_6_REFILL, STATION_OPEN, STATION_CLOSED],
        shippingWeightLb: 7,
      },
      {
        id: "refill-mouse-6lb",
        productSlug: "refill",
        pest: "mouse",
        size: "6lb",
        label: "Mouse 6 lb",
        shortName: "Evolve Mouse Refill — 6 lb",
        oneTimePrice: 149,
        subscription: { price: 129, cadenceDays: 60, cadenceLabel: "every 60 days" },
        image: MOUSE_POUCH_6,
        galleryImages: [MOUSE_POUCH_6, STATION_OPEN, STATION_CLOSED],
        shippingWeightLb: 7,
      },
      {
        id: "refill-rat-12lb",
        productSlug: "refill",
        pest: "rat",
        size: "12lb",
        label: "Rat 12 lb",
        shortName: "Evolve Rat Refill — 12 lb",
        oneTimePrice: 249,
        subscription: { price: 219, cadenceDays: 90, cadenceLabel: "every 90 days" },
        image: RAT_PAIL_12,
        galleryImages: [RAT_PAIL_12, STATION_OPEN, STATION_CLOSED],
        shippingWeightLb: 13,
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

export const FLAT_SHIPPING_USD = 12.95;
