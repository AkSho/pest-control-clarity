import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

const NY_NJ = [
  { slug: "manhattan-ny", label: "Manhattan, NY" },
  { slug: "manhattan-ny", label: "Brooklyn, NY" },
  { slug: "manhattan-ny", label: "Queens, NY" },
  { slug: "manhattan-ny", label: "Jersey City, NJ" },
  { slug: "manhattan-ny", label: "Newark, NJ" },
];

const CA = [
  { slug: "san-francisco-ca", label: "San Francisco, CA" },
  { slug: "oakland-ca", label: "Oakland, CA" },
  { slug: "san-jose-ca", label: "San Jose, CA" },
];

export function SiteFooter() {
  return (
    <footer className="ink-section">
      <div className="container-site grid gap-10 py-16 md:grid-cols-4">
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
            <a href="tel:+18005550199" className="flex items-center gap-2 hover:text-brand">
              <Phone className="h-4 w-4" />
              <span>(800) 555-0199</span>
            </a>
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
            <li><a href="#how" className="hover:text-brand">How it works</a></li>
            <li><a href="#data" className="hover:text-brand">Field data</a></li>
            <li><a href="#who" className="hover:text-brand">Who we serve</a></li>
            <li><a href="#faq" className="hover:text-brand">FAQ</a></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
            NY &amp; NJ
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {NY_NJ.map((a) => (
              <li key={a.label}>
                <Link to="/areas/$areaSlug" params={{ areaSlug: a.slug }} className="hover:text-brand">
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
            Bay Area
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {CA.map((a) => (
              <li key={a.label}>
                <Link to="/areas/$areaSlug" params={{ areaSlug: a.slug }} className="hover:text-brand">
                  {a.label}
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
