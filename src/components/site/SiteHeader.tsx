import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "How it works" },
  { to: "/", label: "Who we serve", hash: "#who" },
  { to: "/", label: "Field data", hash: "#data" },
  { to: "/areas/manhattan-ny", label: "Service areas" },
  { to: "/", label: "FAQ", hash: "#faq" },
];

export function TopBar() {
  return (
    <div className="ink-section text-xs">
      <div className="container-site flex h-9 items-center justify-between">
        <span className="text-ink-muted">
          NYC & NJ · EPA-designated minimum-risk fertility control
        </span>
        <a
          href="tel:+18005550199"
          className="flex items-center gap-2 font-medium text-ink-foreground hover:text-brand"
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
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-ink text-ink-foreground font-bold">
            C
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-tight">Cloakd Removals</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Rodent fertility control
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.hash ? item.hash : item.to}
              className="text-sm font-medium text-foreground/80 transition hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild>
            <a href="tel:+18005550199">
              <Phone className="h-4 w-4" />
              (800) 555-0199
            </a>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-site flex flex-col gap-2 py-4">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.hash ? item.hash : item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                {item.label}
              </a>
            ))}
            <Button asChild className="mt-2">
              <a href="tel:+18005550199">Call (800) 555-0199</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
