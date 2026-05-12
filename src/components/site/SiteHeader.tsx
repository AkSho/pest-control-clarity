import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "How it works", hash: "#how" },
  { to: "/", label: "Who we serve", hash: "#who" },
  { to: "/", label: "Field data", hash: "#data" },
  { to: "/areas/manhattan-ny", label: "Service areas" },
  { to: "/", label: "FAQ", hash: "#faq" },
];

export function TopBar() {
  return (
    <div className="bg-brand text-brand-foreground text-xs">
      <div className="container-site flex h-9 items-center justify-between gap-4">
        <span className="font-semibold tracking-wide">
          Pest Control License: <span className="font-bold">#NYC-PCO-XXXXXX</span>
        </span>
        <a
          href="tel:+18005550199"
          className="flex items-center gap-2 font-semibold hover:opacity-90"
        >
          <Phone className="h-3.5 w-3.5" />
          (800) 555-0199
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
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand text-brand-foreground font-bold">
            C
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight">Cloakd Removals</div>
            <div className="text-[10px] uppercase tracking-widest text-ink-muted">
              Rodent fertility control
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.hash ? item.hash : item.to}
              className="text-sm font-medium text-ink-foreground/85 transition hover:text-ink-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="rounded-full h-10 px-5">
            <a href="tel:+18005550199">
              (800) 555-0199 <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <button
          className="md:hidden text-ink-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-border ink-section md:hidden">
          <div className="container-site flex flex-col gap-2 py-4">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.hash ? item.hash : item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-foreground hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-2 rounded-full">
              <a href="tel:+18005550199">Call (800) 555-0199</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
