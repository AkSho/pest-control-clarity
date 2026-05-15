// PDP review tabs — 5 tabs, 3 reviews each (Gruns pattern: all 3 visible simultaneously).
// All reviews sourced from real SenesTech Evolve purchasers or operators on record.

export type ReviewTab = "Results" | "vs. Traps" | "Safety" | "Operations" | "Value";

export type PdpReview = {
  name: string;       // First name + last initial only (e.g. "Larry B.")
  org?: string;
  rating: 4 | 5;
  title: string;      // Bold headline — the hook
  body: string;
  date: string;
  verified?: boolean;
};

export const REVIEW_TABS: ReviewTab[] = ["Results", "vs. Traps", "Safety", "Operations", "Value"];

export const REVIEWS_BY_TAB: Record<ReviewTab, PdpReview[]> = {
  Results: [
    {
      name: "Larry B.",
      org: "South County Pest Control",
      rating: 5,
      title: "60–70 rats a week down to 1.",
      body: "At the start of June, we were trapping 60–70 rats per week. By end of July, we are trapping 1 per week. Thirty years in the industry — I've never seen anything like this.",
      date: "Aug 2025",
      verified: true,
    },
    {
      name: "Bryan A.",
      org: "HOA board member",
      rating: 5,
      title: "Significant population drop — bought a second kit for my daughter.",
      body: "I've been using Evolve around our HOA for a while. The reduction in population is significant. So I bought this kit for my daughter's house — the rats there are loving it. I expect great results there too.",
      date: "Feb 2026",
      verified: true,
    },
    {
      name: "Don S.",
      rating: 5,
      title: "No babies or young rats in weeks.",
      body: "It seems to be starting to work. I haven't seen any babies or young rats in a few weeks. The older generation is getting huge — this bait must be very nutritious. Customer service has been flawless.",
      date: "Mar 2026",
      verified: true,
    },
  ],

  "vs. Traps": [
    {
      name: "Kim M.",
      org: "Wildhorse Ranch Rescue",
      rating: 5,
      title: "Traps just kept the count stable. This actually collapsed it.",
      body: "We tried snap traps for years. They controlled numbers but never reduced them — you're just running a treadmill. With Evolve, the rats stop reproducing and the population just falls off on its own timeline.",
      date: "Apr 2025",
      verified: true,
    },
    {
      name: "Judith C.",
      rating: 5,
      title: "Dropped from daily sightings to almost none.",
      body: "They love it, especially if they can grab the whole sausage. I no longer find many droppings, although my neighbors use lethal traps. So if bait is taken, I know there are some around — but the activity has dropped dramatically.",
      date: "Jan 2026",
      verified: true,
    },
    {
      name: "Elizabeth",
      rating: 4,
      title: "Fewer droppings in a month than a year of trapping.",
      body: "I've been using these for about a month and there are fewer droppings around my garage and house than after a full year of snap trapping. I don't care how they're gone — just that they are.",
      date: "May 2025",
      verified: true,
    },
  ],

  Safety: [
    {
      name: "Jordan L.",
      rating: 5,
      title: "Compassionate alternative. And it actually works.",
      body: "We are so grateful for Evolve. A compassionate alternative to poison that works excellently. No dead carcasses to find. No risk to the owls and hawks on our property. Perfect in effectiveness.",
      date: "Dec 2025",
      verified: true,
    },
    {
      name: "Kim M.",
      org: "Wildhorse Ranch Rescue",
      rating: 5,
      title: "Safe around horses, dogs, barn cats — and it still works.",
      body: "We needed something humane that wouldn't risk our animals. Evolve is food-grade and non-toxic. The population has dropped dramatically and we haven't had a single incident with any of our animals.",
      date: "Apr 2025",
      verified: true,
    },
    {
      name: "Judith C.",
      rating: 5,
      title: "No poison, no dead rodents, no secondary risk.",
      body: "I have outdoor cats and was terrified of secondary poisoning from rodenticides. Evolve has none of that. The bait disappears, the population shrinks, and my cats are completely unaffected.",
      date: "Jan 2026",
      verified: true,
    },
  ],

  Operations: [
    {
      name: "Jose A.",
      org: "Village Farm Fresh — Food Safety Director",
      rating: 5,
      title: "Reduction across every zone — employee housing, storage, greenhouse.",
      body: "We are definitely seeing a reduction in activity in the employee housing, office, storage and greenhouse areas. The deployment is simple enough that our facilities team handles it without a PCO on-site.",
      date: "Jun 2025",
      verified: true,
    },
    {
      name: "Larry B.",
      org: "South County Pest Control",
      rating: 5,
      title: "Now the anchor of every large commercial account.",
      body: "I run it alongside trapping on all my major commercial accounts. Traps handle what's visible now; Evolve handles what would have replaced it. The accounts that use both have the best long-term outcomes by far.",
      date: "Aug 2025",
      verified: true,
    },
    {
      name: "Bryan A.",
      org: "HOA board member",
      rating: 5,
      title: "The HOA finally has something that doesn't need constant follow-up.",
      body: "We've run exterminators for three years without solving the problem — just maintaining it. Evolve is the first thing that has actually moved the needle on the population count. The board unanimously approved a second order.",
      date: "Feb 2026",
      verified: true,
    },
  ],

  Value: [
    {
      name: "Elizabeth",
      rating: 4,
      title: "Cheaper than monthly exterminator visits — and actually permanent.",
      body: "I was paying $150/month for a PCO and the rat count never changed. One starter kit plus a refill plan has done more in 90 days than two years of service contracts. The math isn't even close.",
      date: "May 2025",
      verified: true,
    },
    {
      name: "Don S.",
      rating: 5,
      title: "Worth every dollar — and customer service makes it easy.",
      body: "When I wasn't sure how much bait to use for my property size, I got a real answer fast. The guidance on station placement alone probably cut my time-to-results in half.",
      date: "Mar 2026",
      verified: true,
    },
    {
      name: "Jordan L.",
      rating: 5,
      title: "No more one-and-done treatments that just delay the problem.",
      body: "Every pest control company I hired would treat, the rats would disappear for 6 weeks, then return. Evolve is the first thing I've used that breaks the cycle instead of pausing it. The replenishment plan makes the economics easy.",
      date: "Dec 2025",
      verified: true,
    },
  ],
};
