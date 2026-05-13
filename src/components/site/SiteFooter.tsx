import { Link } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { SOLUTIONS } from "@/data/solutions";
import { SERVICE_AREAS } from "@/data/serviceAreas";

export function SiteFooter() {
  return (
    <footer className="ink-section">
      <div className="container-site grid gap-10 py-16 md:grid-cols-5">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand text-brand-foreground font-bold">
              C
            </div>
            <div className="leading-tight">
              <div className="text-base font-bold">Cloakd Removals</div>
              <div className="text-[11px] uppercase tracking-widest text-ink-muted">
                Rodent fertility control
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-ink-muted">
            EPA-designated minimum-risk fertility control, layered onto your
            existing pest program. Documented monthly reporting. Serving NYC,
            NJ, &amp; CA.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <a href="mailto:hello@cloakd-removals.cloud" className="flex items-center gap-2 hover:text-brand">
              <Mail className="h-4 w-4" />
              <span>hello@cloakd-removals.cloud</span>
            </a>
            <div className="flex items-center gap-2 text-ink-muted">
              <MapPin className="h-4 w-4" />
              <span>NYC · NJ · Bay Area</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
            Program
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/why-it-keeps-coming-back" className="hover:text-brand">The Problem</Link></li>
            <li><Link to="/how-it-works" className="hover:text-brand">How it works</Link></li>
            <li><Link to="/rodent-fertility-control" className="hover:text-brand">Rodent fertility control</Link></li>
            <li><Link to="/does-rat-birth-control-work" className="hover:text-brand">Does rat birth control work?</Link></li>
            <li><Link to="/evolve-rodent-birth-control" className="hover:text-brand">Evolve rat birth control</Link></li>
            <li><Link to="/contrapest" className="hover:text-brand">ContraPest</Link></li>
            <li><Link to="/contrapest-vs-evolve" className="hover:text-brand">ContraPest vs. Evolve</Link></li>
            <li><Link to="/vs/diy-rat-birth-control" className="hover:text-brand">DIY vs. managed program</Link></li>
            <li><Link to="/what-to-expect" className="hover:text-brand">What to expect</Link></li>
            <li><Link to="/results" className="hover:text-brand">Results</Link></li>
            <li><Link to="/faq" className="hover:text-brand">FAQ</Link></li>
            <li><Link to="/resources" className="hover:text-brand">Resources</Link></li>
            <li><Link to="/dohmh-rodent-violation-nyc" className="hover:text-brand">DOHMH violation (NYC)</Link></li>
            <li><Link to="/nj-rodent-violation" className="hover:text-brand">NJ rodent violation</Link></li>
            <li><Link to="/get-started" className="hover:text-brand">Get Started</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
            Solutions
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {SOLUTIONS.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/solutions/$slug"
                  params={{ slug: s.slug }}
                  className="hover:text-brand"
                >
                  {s.audience}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
            Comparisons
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/vs/rat-poison" className="hover:text-brand">vs. Rat poison</Link></li>
            <li><Link to="/vs/traditional-pest-control" className="hover:text-brand">vs. Traditional pest control</Link></li>
            <li><Link to="/vs/snap-traps" className="hover:text-brand">vs. Snap traps</Link></li>
            <li><Link to="/vs/diy-rat-birth-control" className="hover:text-brand">vs. DIY rat birth control</Link></li>
            <li><Link to="/contrapest-vs-evolve" className="hover:text-brand">ContraPest vs. Evolve</Link></li>
            <li><Link to="/vs/orkin" className="hover:text-brand">vs. Orkin</Link></li>
            <li><Link to="/vs/assured-environments" className="hover:text-brand">vs. Assured Environments</Link></li>
            <li><Link to="/vs/bell-environmental" className="hover:text-brand">vs. Bell Environmental</Link></li>
            <li><Link to="/vs/viking-pest-control" className="hover:text-brand">vs. Viking Pest Control</Link></li>
            <li><Link to="/vs/western-pest-services" className="hover:text-brand">vs. Western Pest Services</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
            Service areas
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/areas" className="hover:text-brand font-semibold">All service areas →</Link></li>
            {SERVICE_AREAS.map((a) => (
              <li key={a.slug}>
                <Link to="/areas/$areaSlug" params={{ areaSlug: a.slug }} className="hover:text-brand">
                  {a.city}, {a.state}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-border">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-6 text-xs text-ink-muted md:flex-row">
          <div>© {new Date().getFullYear()} Cloakd Removals. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand">Privacy</a>
            <a href="#" className="hover:text-brand">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
