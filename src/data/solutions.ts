import {
  Building2,
  ChefHat,
  Home as HomeIcon,
  UtensilsCrossed,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export type SolutionSlug =
  | "restaurants"
  | "property-managers"
  | "ghost-kitchens"
  | "food-storage"
  | "residential"
  | "hoas";

export type Solution = {
  slug: SolutionSlug;
  audience: string;
  navLabel: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: string;
  lede: string;
  badge: string;
  painPoints: { title: string; body: string }[];
  outcomes: { title: string; body: string }[];
  stats: { value: string; label: string }[];
  ctaLabel: string;
  // Image slot — replace with real photo later.
  heroImage?: string;
};

export const SOLUTIONS: Solution[] = [
  {
    slug: "restaurants",
    audience: "Restaurants",
    navLabel: "Restaurants",
    icon: UtensilsCrossed,
    eyebrow: "For NYC & NJ restaurants",
    headline: "One rodent sighting is a critical violation. Stop resetting the cycle every six weeks.",
    lede:
      "In NYC, violation code 04K or 04L lands you at 5+ points minimum. Combined with anything else and you're posting a B in the window. One temporary closure can cost $15,000 to $50,000 in lost revenue. NJ restaurants face equivalent exposure under state health code. You already pay $300 to $600 a month for pest control. It keeps coming back anyway.",
    badge: "$300–$2,000 per rodent violation",
    painPoints: [
      {
        title: "Standard treatment empties the territory",
        body: "Knockdown clears the active colony. Within 4 to 8 weeks the surrounding population detects the empty space and moves in at full breeding capacity.",
      },
      {
        title: "DOHMH inspections don't wait for the cycle",
        body: "A single rodent sighting during inspection — droppings, gnaw marks, live or dead — is a critical violation. The next inspection is not on your schedule.",
      },
      {
        title: "Closures destroy more than the day's revenue",
        body: "Lost covers, refunds, staff pay during shutdown, reinspection fees, and reputational damage compound well past the listed fine amount.",
      },
    ],
    outcomes: [
      {
        title: "Layered onto your existing pest contract",
        body: "We do not displace your current vendor. Knockdown stays in place. We add the fertility-control layer that breaks the replacement cycle.",
      },
      {
        title: "EPA-designated minimum-risk bait",
        body: "Cottonseed-derived soft bait. No secondary kill risk to pets or wildlife. Cleared for use in food-handling environments.",
      },
      {
        title: "Documented every cycle",
        body: "Track-density data, station logs, and photos delivered monthly. Hand them to a DOHMH inspector, your franchise corporate, or ownership any time.",
      },
    ],
    stats: [
      { value: "79%", label: "reduction in rodent activity, 5-month urban field study" },
      { value: "88%", label: "drop in track density at monitored locations" },
      { value: "$15K–$50K", label: "typical revenue lost per temporary closure" },
    ],
    ctaLabel: "Schedule a restaurant walkthrough",
  },
  {
    slug: "property-managers",
    audience: "Property Managers",
    navLabel: "Property Managers",
    icon: Building2,
    eyebrow: "For multi-building portfolios",
    headline: "Tenant complaints do not stop until the population does.",
    lede:
      "One sale is one building. One building is 20 to 80 units. You manage multiple properties, which means recurring rodent complaints across multiple addresses. Your current exterminator resets the cycle every six weeks. We break it across every building you manage.",
    badge: "Multi-building · one program, every address",
    painPoints: [
      {
        title: "Complaint volume tracks the breeding cycle",
        body: "The same units file the same tickets every six to eight weeks. Each cycle resets to baseline because the territory keeps refilling from the surrounding block.",
      },
      {
        title: "Vendor changes don't fix it",
        body: "Switching exterminators changes the logo on the invoice. Standard treatment is doing what it's designed to do. The missing layer is fertility control.",
      },
      {
        title: "Owner conversations get harder every renewal",
        body: "Without documented numbers, every recurring complaint reads as a vendor failure. Without per-cycle reporting, there is nothing to show.",
      },
    ],
    outcomes: [
      {
        title: "One coordinated program across the portfolio",
        body: "Same protocol, same reporting cadence, same data structure across every address you manage. One point of contact for the entire program.",
      },
      {
        title: "Per-building track-density reporting",
        body: "You see which addresses are dropping, which are flat, and which need pressure adjustment — every month, not every quarter.",
      },
      {
        title: "Predictable monthly billing",
        body: "Month-to-month, no long lock-ins. Costs sit in line with what you already spend on pest control across the portfolio.",
      },
    ],
    stats: [
      { value: "79%", label: "average activity reduction across monitored sites" },
      { value: "1", label: "program covering every address you manage" },
      { value: "Monthly", label: "documented reporting per building" },
    ],
    ctaLabel: "Talk to us about your portfolio",
  },
  {
    slug: "ghost-kitchens",
    audience: "Ghost Kitchens",
    navLabel: "Ghost Kitchens",
    icon: ChefHat,
    eyebrow: "For shared kitchen operators",
    headline: "High-density buildings with no existing pest control contract.",
    lede:
      "Ghost kitchens operate in older urban buildings with constant food product cycling. Most do not have locked-in pest control contracts. Decision makers are accessible and the downside of a rodent problem in a shared kitchen facility is severe for every operator in the building.",
    badge: "No vendor to displace",
    painPoints: [
      {
        title: "Shared facilities concentrate risk",
        body: "One unit's pest problem is every operator's pest problem. A single sighting on any brand's delivery review propagates across the building's reputation.",
      },
      {
        title: "Constant product turnover keeps pressure high",
        body: "Continuous food cycling, frequent deliveries, and shared waste areas keep harborage attractive even when individual stations stay clean.",
      },
      {
        title: "Most facilities are not under contract",
        body: "Pest control is handled ad hoc by individual operators or skipped entirely. There is no incumbent to displace and no framework already in place.",
      },
    ],
    outcomes: [
      {
        title: "Building-wide setup, operator-friendly billing",
        body: "We can structure the program at the facility level or split costs across operators. Same coverage either way.",
      },
      {
        title: "Designed for food-handling environments",
        body: "EPA-designated minimum-risk active ingredient. Cleared for placement in commercial kitchens without the disposal protocols rodenticides require.",
      },
      {
        title: "Fast onboarding",
        body: "Walkthrough, station mapping, and first deployment typically within two weeks. Reporting starts the first cycle.",
      },
    ],
    stats: [
      { value: "0", label: "vendor displacement required at most facilities" },
      { value: "2 wks", label: "typical onboarding from walkthrough to first deployment" },
      { value: "Monthly", label: "documented track-density reporting per facility" },
    ],
    ctaLabel: "Set up your facility",
  },
  {
    slug: "food-storage",
    audience: "Food Storage & Cold Chain",
    navLabel: "Food Storage & Cold Chain",
    icon: Warehouse,
    eyebrow: "For warehouses, distribution, cold storage",
    headline: "Continuous product flow turns standard knockdown into a treadmill.",
    lede:
      "Food storage and cold-chain facilities run high-volume product cycles around the clock. Standard pest control empties the territory and the surrounding rodent population refills it on schedule. Fertility control compounds reductions across breeding cycles instead of resetting every six weeks.",
    badge: "Compliance-ready documentation",
    painPoints: [
      {
        title: "Audit risk runs continuously",
        body: "Third-party food-safety audits, FSMA, and customer audits all weight rodent activity heavily. Track plates and station logs are scrutinized line by line.",
      },
      {
        title: "Loading docks are perpetual entry points",
        body: "High-frequency truck movement, exterior staging, and trash flow keep an active outside-pressure profile no matter how clean the interior runs.",
      },
      {
        title: "Cold zones change rodent behavior, not the cycle",
        body: "Refrigerated and frozen sections suppress visible signs while populations concentrate in adjacent ambient and dry-storage zones.",
      },
    ],
    outcomes: [
      {
        title: "Layered on top of your IPM program",
        body: "We slot in alongside whatever pest control protocol your facility runs. The fertility-control layer is what most IPM programs do not include.",
      },
      {
        title: "Audit-ready monthly reports",
        body: "Track-density trends, station-by-station logs, photos, and deployment records — formatted for handing straight to auditors.",
      },
      {
        title: "Compounds across cycles",
        body: "Each breeding cycle the replacement population can't form at full size. The activity baseline trends down instead of resetting.",
      },
    ],
    stats: [
      { value: "79%", label: "monitored activity reduction over 5 months" },
      { value: "90%", label: "fertility reduction when integrated into active programs" },
      { value: "Monthly", label: "audit-formatted reporting" },
    ],
    ctaLabel: "Request a facility assessment",
  },
  {
    slug: "residential",
    audience: "Residential",
    navLabel: "Residential",
    icon: HomeIcon,
    eyebrow: "For brownstones, townhouses, residential blocks",
    headline: "Brownstones and townhouses where the exterminator keeps coming back.",
    lede:
      "Standard residential pest control empties the territory and your block refills it. We layer fertility control on top of whatever exterminator you already use. Month-to-month, no long contracts, documented every cycle.",
    badge: "Month-to-month",
    painPoints: [
      {
        title: "The same stations get hit every month",
        body: "Bait is consumed, traps catch, and within weeks activity is back. The treatment is working — the cycle is what isn't being addressed.",
      },
      {
        title: "Neighboring properties are the source",
        body: "In a row of brownstones, the colony reservoir is the block, not your basement. Treating one address is treating one part of the territory.",
      },
      {
        title: "Standard residential plans don't include fertility control",
        body: "Most residential pest contracts are knockdown-only. Adding fertility control is the missing layer.",
      },
    ],
    outcomes: [
      {
        title: "Works alongside your existing service",
        body: "Keep your exterminator. We handle the fertility-control layer and the per-cycle reporting.",
      },
      {
        title: "Safe around pets and kids",
        body: "EPA-designated minimum risk, cottonseed-derived. No secondary kill risk to pets or wildlife.",
      },
      {
        title: "Documented every visit",
        body: "Photos, station logs, and track-density notes after each service. You see what changed and what didn't.",
      },
    ],
    stats: [
      { value: "79%", label: "average activity reduction in 5-month deployments" },
      { value: "0", label: "secondary kill risk to pets or wildlife" },
      { value: "Month-to-month", label: "no long-term contract" },
    ],
    ctaLabel: "Get a residential estimate",
  },
  {
    slug: "hoas",
    audience: "HOAs & Co-ops",
    navLabel: "HOAs & Co-ops",
    icon: Users,
    eyebrow: "For boards and managing agents",
    headline: "Board-friendly reporting. Predictable monthly billing. Property-wide visibility.",
    lede:
      "Boards need documented numbers, not anecdotes. Managing agents need a single program with consistent reporting across every common area and unit-adjacent zone. We deliver both, layered onto your existing pest contract.",
    badge: "Board-ready reports",
    painPoints: [
      {
        title: "Resident complaints arrive unevenly",
        body: "A handful of units file most of the tickets. Without per-zone data, the board can't tell if the program is working overall or just shifting pressure.",
      },
      {
        title: "Vendor changes draw board scrutiny",
        body: "Replacing the exterminator is a board-level decision. Adding a fertility-control layer is a service addition — easier to approve, easier to evaluate.",
      },
      {
        title: "Annual budgets need predictability",
        body: "Recurring rodent spikes blow through line items mid-year. Per-cycle population management flattens the trend.",
      },
    ],
    outcomes: [
      {
        title: "Per-zone, per-cycle reporting",
        body: "Common areas, trash rooms, basements, courtyard, and unit-adjacent zones reported separately. The board sees where the program is working and where pressure is highest.",
      },
      {
        title: "Layered on the existing contract",
        body: "Your current exterminator stays in place. No bid process, no vendor swap, no committee debate.",
      },
      {
        title: "Flat monthly billing",
        body: "Same number every month. Easy to slot into the operating budget, easy to defend at board meetings.",
      },
    ],
    stats: [
      { value: "79%", label: "monitored activity reduction over 5 months" },
      { value: "Monthly", label: "board-ready reports" },
      { value: "Flat", label: "predictable monthly billing" },
    ],
    ctaLabel: "Bring this to your next board meeting",
  },
];

export const getSolution = (slug: string) =>
  SOLUTIONS.find((s) => s.slug === slug);
