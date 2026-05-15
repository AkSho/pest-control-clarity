// Product catalog for Cloakd PDPs.
// Pricing reflects Cloakd retail (not SenesTech). Subscription = "Replenishment plan".
// Image URLs hotlinked from SenesTech's Shopify CDN — download to /public/products/ before launch.

export type ProductSlug = "starter-kit" | "refill";
export type Pest = "rat" | "mouse";
export type Size = "6lb" | "12lb";

export type Variant = {
  id: string;
  productSlug: ProductSlug;
  pest: Pest;
  size: Size;
  label: string; // size pill, e.g. "6 lb"
  shortName: string;
  oneTimePrice: number;
  /** Fixed replenishment price. undefined = no replenishment plan for this SKU. */
  subPrice?: number;
  /** Replenishment cadence in days. Must be set if subPrice is set. */
  subDays?: number;
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
  rating: { avg: number; count: number };
};

// ===== Images =====
const STATION_CLOSED = "/products/station-closed.png";
const STATION_OPEN = "/products/station-open.png";

const RAT_6 = "/products/refill-rat-6lb.jpg";
const RAT_12 = "/products/refill-rat-12lb.jpg";

const MOUSE_6 = "/products/refill-mouse-6lb.jpg";

const STARTER_RAT_HERO = "/products/starter-kit-rat.png";
const STARTER_MOUSE_HERO = "/products/starter-kit-mouse.png";

// Gallery conversion slides (replace SVGs with final .jpg assets when ready)
const GALLERY_SOCIAL_PROOF = "/products/gallery-social-proof.svg";
const GALLERY_TIMELINE = "/products/gallery-timeline.svg";
const GALLERY_FIELD_DATA = "/products/gallery-field-data.svg";
const GALLERY_DEPLOYED = "/products/gallery-deployed.svg";

// ===== Shared content =====
const SHARED_FAQ: FAQ[] = [
  {
    q: "How does Evolve actually work?",
    a: "Evolve is a soft bait built around cottonseed oil — an active ingredient that interferes with reproduction in both male and female rodents. After the first breeding cycle (4–6 weeks) you start seeing fewer pups, and within a few months the colony collapses for lack of new arrivals.",
  },
  {
    q: "Is it safe around pets, kids, and wildlife?",
    a: "Yes. The active ingredient is food-grade cottonseed oil — not a blood thinner, not a neurotoxin. The EPA classifies it as a minimum-risk pesticide, which means the agency has reviewed the ingredients and determined they don't need the same restrictions as traditional pest control products. Used as directed inside locked stations, it poses no meaningful risk to dogs, cats, kids, hawks, owls, or other non-target animals.",
  },
  {
    q: "Why doesn't snap-trapping or poison just fix this?",
    a: "Both kill individuals but leave the breeding pair untouched. A single rat pair can produce up to 15,000 descendants in a year — and survivors breed faster under pressure. As long as the colony can replace what you remove, you're paying to manage a symptom forever. Evolve attacks the cause: it removes the colony's ability to rebuild. Use it alongside traps or other tools to cull the current population while Evolve stops the next generation from being born.",
  },
  {
    q: "How much do I need and where do I put it?",
    a: "For most homes and small properties, a 6 lb pouch covers 30 days of continuous baiting across two stations. Place stations along where rodents already travel — foundation walls, fence lines, behind dumpsters, near burrow openings. Rodents need to eat it consistently for it to work, so keep stations stocked.",
  },
  {
    q: "Do I need a license to buy or use this?",
    a: "No. The EPA classifies Evolve as a minimum-risk pesticide — the same category as products made from cottonseed oil and cedarwood. That means no license and no permit required. Homeowners, landlords, property managers, and restaurant owners can all buy and deploy it directly.",
  },
  {
    q: "When will I see results?",
    a: "Most people notice bait being consumed within the first week — that means rodents are feeding, which is exactly what you want. Reproduction effects start showing after the first full breeding cycle (4–6 weeks). Most sites see a meaningful drop in sightings and droppings within 60–90 days of consistent deployment.",
  },
  {
    q: "Can I use it indoors and outdoors?",
    a: "Yes. Indoors: basements, mechanical rooms, kitchens — inside locked stations. Outdoors: along fence lines, near burrows, behind dumpsters, or staked near garden beds. Keep bait dry and out of direct sun — heat and moisture affect how readily rodents eat it.",
  },
  {
    q: "Will Evolve work alongside traps or other tools?",
    a: "Yes — traps and exclusion handle what's visible right now; Evolve removes the colony's ability to rebound. Run them together and you're addressing both the symptom and the cause.",
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
    body: "Rodents go for it readily — they'll choose it over most food sources nearby. Consistent feeding is what drives the result, so keep it stocked.",
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
    title: "Anyone can use it directly",
    body: "Food-grade active ingredient. The EPA puts it in the minimum-risk category — same tier as products made from cottonseed oil and cedarwood. No license, no permit.",
  },
  {
    title: "Works on resistant populations",
    body: "Anticoagulant resistance is now widespread. Evolve sidesteps the resistance arms race entirely — it doesn't kill, it sterilizes.",
  },
  {
    title: "Gets stronger every refill cycle",
    body: "Each 60–90 day cycle reduces the breeding population further. Rodents keep eating it month after month — no tolerance buildup, no resistance.",
  },
];

// ===== Catalog =====
export const PRODUCTS: Record<ProductSlug, Product> = {
  "starter-kit": {
    slug: "starter-kit",
    title: "Evolve Rodent Fertility Control — Starter Kit",
    subtitle:
      "Stop replacing rodents you remove. Evolve cuts off the breeding cycle so the colony can't rebuild itself — month by month, without poison, without cleanup.",
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
      "Evolve soft-bait pouch (6 lb)",
      "Deployment guide + label and SDS",
    ],
    faq: SHARED_FAQ,
    accordion: {
      description:
        "Your rodent problem isn't a removal problem — it's a replacement problem. As long as the breeding pair stays intact, what you remove gets replaced. The XL Starter Kit is the full setup to start targeting reproduction instead: two locked stations, keys, and a soft-bait pouch.",
      howItWorks:
        "Place each station along an active travel path. Load the included Evolve soft bait. Rodents enter, feed, and the cottonseed-oil active ingredient interferes with reproduction in both males and females. Effects begin after the first 4–6 week breeding cycle.",
      whatsInside:
        "Two locked Evolve bait stations · Two station keys · One Evolve soft-bait pouch (6 lb) · Deployment guide · EPA label · Safety Data Sheet (SDS).",
      ingredients:
        "Active ingredient: Cottonseed oil. Other ingredients: food-grade carriers and palatants. FIFRA Section 25(b) exempt minimum-risk pesticide. No anticoagulants. No neurotoxins.",
      deployment:
        "Stations belong along rodent travel paths: foundation walls, fence lines, behind dumpsters, near burrows. Keep bait dry and continuously available — gaps in supply restart the breeding cycle.",
      shipping:
        "Flat $12.95 shipping. Ships within 24 hours. 30-day satisfaction guarantee.",
    },
    defaultVariantId: "starter-kit-rat-6lb",
    rating: { avg: 4.6, count: 38 },
    variants: [
      {
        id: "starter-kit-rat-6lb",
        productSlug: "starter-kit",
        pest: "rat",
        size: "6lb",
        label: "Rat",
        shortName: "XL Starter Kit — Rat",
        oneTimePrice: 179,
        // No replenishment plan on starter kits
        image: STARTER_RAT_HERO,
        galleryImages: [STARTER_RAT_HERO, GALLERY_SOCIAL_PROOF, GALLERY_TIMELINE, GALLERY_FIELD_DATA, GALLERY_DEPLOYED, STATION_OPEN],
        shippingWeightLb: 8,
      },
      {
        id: "starter-kit-mouse-6lb",
        productSlug: "starter-kit",
        pest: "mouse",
        size: "6lb",
        label: "Mouse",
        shortName: "XL Starter Kit — Mouse",
        oneTimePrice: 179,
        // No replenishment plan on starter kits
        image: STARTER_MOUSE_HERO,
        galleryImages: [STARTER_MOUSE_HERO, GALLERY_SOCIAL_PROOF, GALLERY_TIMELINE, GALLERY_FIELD_DATA, GALLERY_DEPLOYED, STATION_OPEN],
        shippingWeightLb: 8,
      },
    ],
  },

  refill: {
    slug: "refill",
    title: "Evolve Rodent Fertility Control — Refill Bait",
    subtitle:
      "Keep the pressure on. Empty stations let the breeding cycle restart. Refills keep the colony collapsing on schedule.",
    intro:
      "Continuous baiting is what makes fertility control actually work. Refills keep your stations full so the colony never gets a break in the cycle.",
    longDescription: [
      "Once your starter kit is in place, the only thing standing between you and a collapsed colony is consistency. Empty stations don't suppress reproduction.",
      "The 6 lb pouch is the right cadence for most single-site deployments. The 12 lb pail is built for larger properties — multi-unit residential, food-storage facilities, ghost-kitchen complexes — where you'd otherwise be reordering twice as often.",
      "You set the cadence once and it runs. Replenishment plan customers get auto-delivery timed to their site's typical burn rate — no reordering, no gaps, no interrupted cycles.",
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
        "Flat $12.95 shipping. Ships within 24 hours. Replenishment plans cancel anytime.",
    },
    defaultVariantId: "refill-rat-6lb",
    rating: { avg: 4.6, count: 38 },
    variants: [
      {
        id: "refill-rat-6lb",
        productSlug: "refill",
        pest: "rat",
        size: "6lb",
        label: "6 lb",
        shortName: "Evolve Rat Refill — 6 lb",
        oneTimePrice: 149,
        subPrice: 129,
        subDays: 60,
        image: RAT_6,
        galleryImages: [RAT_6, GALLERY_SOCIAL_PROOF, GALLERY_TIMELINE, GALLERY_FIELD_DATA, GALLERY_DEPLOYED, STATION_OPEN],
        shippingWeightLb: 7,
      },
      {
        id: "refill-rat-12lb",
        productSlug: "refill",
        pest: "rat",
        size: "12lb",
        label: "12 lb",
        shortName: "Evolve Rat Refill — 12 lb",
        oneTimePrice: 249,
        subPrice: 219,
        subDays: 90,
        image: RAT_12,
        galleryImages: [RAT_12, GALLERY_SOCIAL_PROOF, GALLERY_TIMELINE, GALLERY_FIELD_DATA, GALLERY_DEPLOYED, STATION_OPEN],
        shippingWeightLb: 13,
      },
      {
        id: "refill-mouse-6lb",
        productSlug: "refill",
        pest: "mouse",
        size: "6lb",
        label: "6 lb",
        shortName: "Evolve Mouse Refill — 6 lb",
        oneTimePrice: 149,
        subPrice: 129,
        subDays: 60,
        image: MOUSE_6,
        galleryImages: [MOUSE_6, GALLERY_SOCIAL_PROOF, GALLERY_TIMELINE, GALLERY_FIELD_DATA, GALLERY_DEPLOYED, STATION_OPEN],
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
    label: "Drop in rodent sightings reported",
    note: "Pest management professionals using Evolve across active sites.",
  },
  {
    stat: "79%+",
    label: "Trap-catch reduction",
    note: "Compared to baseline trapping before Evolve deployment.",
  },
];
