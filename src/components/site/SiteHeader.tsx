import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const NAV: { label: string; to: string }[] = [
  { label: "The Problem", to: "/why-it-keeps-coming-back" },
  { label: "Rodent Radar", to: "/rodent-radar" },
  { label: "Results", to: "/results" },
  { label: "FAQ", to: "/faq" },
];

const PDP_ANCHOR_LINKS = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How it works" },
  { id: "results", label: "Results" },
  { id: "compare", label: "Compare" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isPdp = pathname.startsWith("/products/") || pathname.startsWith("/checkout/");

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

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {isPdp ? (
            PDP_ANCHOR_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-ink-foreground/85 transition hover:bg-white/5 hover:text-ink-foreground"
              >
                {l.label}
              </a>
            ))
          ) : (
            NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-ink-foreground/85 transition hover:bg-white/5 hover:text-ink-foreground"
              >
                {item.label}
              </Link>
            ))
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button asChild className="rounded-full h-10 px-5">
            <Link to="/products/starter-kit">
              Shop <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-ink-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-ink-border ink-section md:hidden">
          <div className="container-site flex flex-col gap-1 py-4">
            {isPdp ? (
              <>
                {PDP_ANCHOR_LINKS.map((l) => (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm font-medium text-ink-foreground hover:bg-white/5"
                  >
                    {l.label}
                  </a>
                ))}
              </>
            ) : (
              NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-ink-foreground hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))
            )}
            <Button asChild className="mt-3 rounded-full">
              <Link to="/products/starter-kit" onClick={() => setOpen(false)}>
                Shop <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
