export type ReviewSource =
  | "walmart"
  | "amazon"
  | "agricultural"
  | "sanctuary"
  | "pest-control"
  | "residential";

export type LogoKey = "walmart" | "amazon" | "south-county" | "five-o-farm" | "wildhorse";

export type Review = {
  source: ReviewSource;
  sourceLabel: string;
  body: string;
  org: string;
  name: string;
  logoKey?: LogoKey;
};

export const REVIEWS: Review[] = [
  {
    source: "walmart",
    sourceLabel: "Walmart Marketplace Customer",
    body: "I've been using these sausages for about a month now and I noticed that their is less droppings from rats in my garage and around my house. I also tossed it in my garden and i noticed that they eat the sausages more than my vegetables and seedlings. I have no idea how many rats I have but I do know that I'm seeing less evidence of them already. I don't care how they are gone, just that they are.",
    org: "Residential User",
    name: "Elizabeth",
  },
  {
    source: "agricultural",
    sourceLabel: "Agricultural Customer",
    body: "We are definitely seeing a reduction in activity in the employee housing, office, storage and greenhouse areas.",
    org: "Village Farm Fresh",
    name: "Jose Aguirre, Food Safety Director",
  },
  {
    source: "sanctuary",
    sourceLabel: "Sanctuary Operator",
    body: "We were thrilled to find ContraPest to control our rat population. We've seen a dramatic reduction in the numbers of rats in our barn. With ContraPest, we can just put out the product and, over a short amount of time, the rats stop reproducing. We are thrilled to have found SenesTech.",
    org: "Wildhorse Ranch Rescue",
    name: "Kim Meagher",
  },
  {
    source: "amazon",
    sourceLabel: "Amazon Customer",
    body: "We have been using Evolve at our farm (in combination with poison). It definitely works. The first couple months we went through a LOT of product but kept after it and now our rodent problem isn't a problem. Definitely worth it. Before we started treatment we lost 5 litters of rabbits. Give it a try. Definitely worth the investment if used according to directions.",
    org: "Rural User",
    name: "5-0 Farm Hawaii",
    logoKey: "five-o-farm",
  },
  {
    source: "pest-control",
    sourceLabel: "Pest Control Operator",
    body: "In 30 years I haven't seen anything like this! At the start of June, we were trapping 60-70 rats per week. By July end, we are trapping 1 per week.",
    org: "South County Pest Control",
    name: "Larry B.",
  },
  {
    source: "amazon",
    sourceLabel: "Amazon Customer",
    body: "The mice loved the bait and we started seeing results within weeks! We used snap traps with it and that seemed to really do the trick. I feel like this is a great addition to help with my little mouse problem. Delivery was pretty quick as well. Two thumbs up!",
    org: "Residential User",
    name: "Tracy",
  },
];
