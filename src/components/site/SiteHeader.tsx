import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";

const NAV = [
  { label: "How it works", href: "#how" },
  { label: "Field data", href: "#data" },
  { label: "Who we serve", href: "#who" },
  { label: "Service areas", href: "#areas" },
  { label: "FAQ", href: "#faq" },
];

const PHONE = "(800) 555-0199";
const PHONE_HREF = "tel:+18005550199";

export function TopBar() {
  return (
    <div className="bg-brand text-brand-foreground text-xs">
      <div className="container-site flex h-9 items-center justify-center gap-6">
        <span className="hidden items-center gap-2 sm:flex">
          <ShieldCheck className="h-3.5 w-3.5" />
          Licensed & insured · NYC DOHMH program-aware
        </span>
        <a href={PHONE_HREF} className="flex items-center gap-2 font-semibold">
          <Phone className="h-3.5 w-3.5" />
          {PHONE}
        </a>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 ink-section border-b border-ink-border">
      <div className="container-site flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand text-brand-foreground font-extrabold">
            C
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight">CLOAKD</div>
            <div className="text-[10px] uppercase tracking-widest text-ink-muted">
              Rodent Fertility Control
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-ink-foreground/85 transition hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={PHONE_HREF}
          className="hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition hover:opacity-90 md:inline-flex"
        >
          {PHONE}
          <ArrowRight className="h-4 w-4" />
        </a>

        <button
          className="text-ink-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-border md:hidden">
          <div className="container-site flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-foreground hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
            <a
              href={PHONE_HREF}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground"
            >
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
