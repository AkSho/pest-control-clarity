import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { ArrowRight, MapPin, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroUrban from "@/assets/hero-urban.jpg";
import { canonicalLink } from "@/lib/seo";

// Cities Cloakd actively covers — update this list as coverage expands.
const COVERED_CITIES = new Set([
  "New York",
  "Brooklyn",
  "Queens",
  "Bronx",
  "Staten Island",
  "Newark",
  "Jersey City",
  "Hoboken",
  "Paterson",
  "Elizabeth",
  "Bayonne",
  "Trenton",
  "Camden",
  "Chicago",
  "Los Angeles",
  "Philadelphia",
  "Houston",
  "Phoenix",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Boston",
  "Seattle",
  "Denver",
  "Baltimore",
  "Washington",
  "Miami",
  "Atlanta",
  "Minneapolis",
  "Portland",
  "Las Vegas",
  "San Francisco",
  "Oakland",
]);

const getGeoCity = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const req = getRequest();
    const city = ((req as any).cf?.city as string | undefined) ?? null;
    if (city && COVERED_CITIES.has(city)) return city;
    return null;
  } catch {
    return null;
  }
});

const TITLE = "Rat Pressure Map — Rodent Activity by Borough and ZIP | Cloakd";
const DESCRIPTION =
  "See where rat complaints are rising in your city. Verified reports mapped by borough, ZIP, and recency so you can tell whether local activity is isolated or part of a larger pattern.";

export const Route = createFileRoute("/rodent-radar")({
  loader: () => getGeoCity(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroUrban },
    ],
    links: canonicalLink("/rodent-radar"),
  }),
  component: RodentRadarPage,
});

const DATA_CARDS = [
  {
    title: "311 complaint reports",
    body: "Every dot on the map is a verified rodent complaint filed with the city. Reports are sourced from NYC open data and mapped by address.",
  },
  {
    title: "Recency signal",
    body: "Reports are colored by how recent they are. The 90-day window shows whether activity at a given location is building or fading.",
  },
  {
    title: "ZIP and neighborhood lookup",
    body: "Search by ZIP or address to see complaint density on your block and compare it to the surrounding area.",
  },
];

function RodentRadarPage() {
  const city = Route.useLoaderData();

  return (
    <div className="bg-background">
      {/* HERO */}
      <section className="bg-surface py-16 md:py-24">
        <div className="container-site grid gap-10 md:grid-cols-[1fr_1fr] md:items-center lg:gap-16">
          <div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand">
              <MapPin className="h-3.5 w-3.5" />
              Rodent Radar
            </div>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              See where rat complaints are rising across {city ?? "your city"}.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              Verified reports mapped by borough and ZIP. Search your address to see whether
              the activity near you is an isolated incident or part of a neighborhood-wide pattern.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/rodent-radar/rat-pressure-map">
                  Open the map
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
            <img
              src={heroUrban}
              alt="Urban street scene — NYC neighborhood"
              className="h-full w-full object-cover"
              style={{ minHeight: "320px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-white/90 p-4 shadow-xl backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                What the map shows
              </p>
              <p className="mt-1 text-base font-bold leading-snug text-foreground">
                Complaint density shifts by season, block, and year.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Activity after a cold snap looks different from a slow build over months.
                Recency coloring separates the two.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT THE MAP SHOWS */}
      <section className="py-16">
        <div className="container-site">
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
              Data sources
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              What the map is built on.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {DATA_CARDS.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="text-base font-bold text-foreground">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY + EDITORIAL */}
      <section className="bg-surface py-16">
        <div className="container-site">
          <div className="rounded-3xl border border-border bg-card p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand">
                  <Microscope className="h-4 w-4" />
                  Methodology
                </div>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  The data is useful, not exhaustive.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  311 complaint volume reflects reporting behavior as much as actual activity.
                  Dense neighborhoods file more complaints. The map notes where verified data
                  is limited and what that means for the signals in those areas.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  High complaint density on your block tells you the pressure is real. It
                  doesn't tell you why the population keeps rebuilding after treatment. That
                  answer is in the biology.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 md:items-end">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/why-it-keeps-coming-back">Why it keeps coming back</Link>
                </Button>
                <Button asChild className="rounded-full">
                  <Link to="/evolve-rodent-birth-control">How fertility control works</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
