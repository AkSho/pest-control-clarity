export type ReviewTag = "all" | "effectiveness" | "safety" | "service" | "multi-unit";

export type PdpReview = {
  name: string;
  org?: string;
  rating: 4 | 5;
  title: string;
  body: string;
  date: string;
  tags: Exclude<ReviewTag, "all">[];
  verified?: boolean;
};

// Seeded from real SenesTech product reviews + Cloakd's existing customer set.
export const PDP_REVIEWS: PdpReview[] = [
  {
    name: "Don S.",
    rating: 5,
    title: "It seems to be starting",
    body: "It seems to be starting to work. I haven't seen any babies or young rats in a few weeks. The older generation is getting huge — this bait must be very nutritious. Customer service has been flawless.",
    date: "Mar 2026",
    tags: ["effectiveness", "service"],
    verified: true,
  },
  {
    name: "Bryan A.",
    org: "HOA board member",
    rating: 5,
    title: "Great product, great results",
    body: "The Evolve bait works great. I've been using it around our HOA for a while. The reduction in population is significant. So I bought this kit for my daughter's house — the rats there are loving it. I expect great results there too.",
    date: "Feb 2026",
    tags: ["effectiveness", "multi-unit"],
    verified: true,
  },
  {
    name: "Judith C.",
    rating: 5,
    title: "Perfect",
    body: "They love it, especially if they can grab the whole sausage. I no longer find many droppings, although my neighbors use lethal traps. So if the Evolve bait is taken, I know there are some around.",
    date: "Jan 2026",
    tags: ["effectiveness", "safety"],
    verified: true,
  },
  {
    name: "Jordan L.",
    rating: 5,
    title: "Life saver",
    body: "We are so grateful for Evolve. A compassionate alternative to poison. It works excellently. Perfect in effectiveness.",
    date: "Dec 2025",
    tags: ["effectiveness", "safety"],
    verified: true,
  },
  {
    name: "Larry B.",
    org: "South County Pest Control",
    rating: 5,
    title: "30 years in — never seen anything like this",
    body: "At the start of June, we were trapping 60–70 rats per week. By July end, we are trapping 1 per week.",
    date: "Aug 2025",
    tags: ["effectiveness", "multi-unit"],
    verified: true,
  },
  {
    name: "Jose Aguirre",
    org: "Village Farm Fresh — Food Safety Director",
    rating: 5,
    title: "Reduction across every zone",
    body: "We are definitely seeing a reduction in activity in the employee housing, office, storage and greenhouse areas.",
    date: "Jun 2025",
    tags: ["effectiveness", "multi-unit"],
    verified: true,
  },
  {
    name: "Elizabeth",
    rating: 4,
    title: "Less evidence in weeks",
    body: "I've been using these sausages for about a month and there are fewer droppings around my garage and house. I don't care how they are gone — just that they are.",
    date: "May 2025",
    tags: ["effectiveness"],
    verified: true,
  },
  {
    name: "Kim Meagher",
    org: "Wildhorse Ranch Rescue",
    rating: 5,
    title: "Dramatic reduction in the barn",
    body: "We were thrilled to find a humane way to control our rat population. With consistent baiting, the rats stop reproducing and the population just falls off.",
    date: "Apr 2025",
    tags: ["safety", "effectiveness"],
    verified: true,
  },
];

export const REVIEW_TAGS: { id: ReviewTag; label: string }[] = [
  { id: "all", label: "All reviews" },
  { id: "effectiveness", label: "Effectiveness" },
  { id: "safety", label: "Safety" },
  { id: "multi-unit", label: "HOA / Multi-unit" },
  { id: "service", label: "Customer service" },
];
