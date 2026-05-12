import { Link } from "@tanstack/react-router";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SOLUTIONS } from "@/data/solutions";

const NAV: { label: string; to: string }[] = [
  { label: "The Problem", to: "/why-it-keeps-coming-back" },
  { label: "Results", to: "/results" },
  { label: "FAQ", to: "/faq" },
  { label: "Resources", to: "/resources" },
];

const PROGRAM_LINKS: { label: string; to: string; eyebrow: string }[] = [
  {
    label: "How it works",
    to: "/how-it-works",
    eyebrow: "The 90-day program in plain language",
  },
  {
    label: "Does rat birth control work?",
    to: "/does-rat-birth-control-work",
    eyebrow: "Bryant Park failed. Here's what's different.",
  },
  {
    label: "What to expect",
    to: "/what-to-expect",
    eyebrow: "Every step before you commit to anything",
  },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

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

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/why-it-keeps-coming-back"
                    className="inline-flex h-9 items-center px-3 text-sm font-medium text-ink-foreground/85 transition hover:text-ink-foreground"
                  >
                    The Problem
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="!bg-transparent text-ink-foreground/85 hover:!bg-white/5 hover:!text-ink-foreground data-[state=open]:!bg-white/5 data-[state=open]:!text-ink-foreground">
                  Program
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[420px] gap-1 p-3">
                    {PROGRAM_LINKS.map((p) => (
                      <li key={p.to}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={p.to}
                            className="block rounded-md p-3 text-sm leading-none text-foreground transition hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="font-semibold">{p.label}</div>
                            <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                              {p.eyebrow}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="!bg-transparent text-ink-foreground/85 hover:!bg-white/5 hover:!text-ink-foreground data-[state=open]:!bg-white/5 data-[state=open]:!text-ink-foreground">
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[440px] gap-1 p-3 sm:grid-cols-2">
                    {SOLUTIONS.map((s) => (
                      <li key={s.slug}>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/solutions/$slug"
                            params={{ slug: s.slug }}
                            className="block rounded-md p-3 text-sm leading-none text-foreground transition hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="flex items-center gap-2 font-semibold">
                              <s.icon className="h-4 w-4 text-brand" />
                              {s.navLabel}
                            </div>
                            <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                              {s.eyebrow}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {NAV.slice(1).map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.to}
                      className="inline-flex h-9 items-center px-3 text-sm font-medium text-ink-foreground/85 transition hover:text-ink-foreground"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:block">
          <Button asChild className="rounded-full h-10 px-5">
            <Link to="/get-started">
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
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
          <div className="container-site flex flex-col gap-1 py-4">
            <Link
              to="/why-it-keeps-coming-back"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-foreground hover:bg-white/5"
            >
              The Problem
            </Link>

            {PROGRAM_LINKS.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-foreground hover:bg-white/5"
              >
                {p.label}
              </Link>
            ))}

            <button
              onClick={() => setMobileSolutionsOpen((v) => !v)}
              className="flex items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-ink-foreground hover:bg-white/5"
            >
              Solutions
              <ChevronDown
                className={`h-4 w-4 transition ${mobileSolutionsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileSolutionsOpen && (
              <div className="ml-2 flex flex-col gap-1 border-l border-ink-border pl-2">
                {SOLUTIONS.map((s) => (
                  <Link
                    key={s.slug}
                    to="/solutions/$slug"
                    params={{ slug: s.slug }}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2 text-sm text-ink-foreground/85 hover:bg-white/5"
                  >
                    {s.navLabel}
                  </Link>
                ))}
              </div>
            )}

            {NAV.slice(1).map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-foreground hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}

            <Button asChild className="mt-3 rounded-full">
              <Link to="/get-started" onClick={() => setOpen(false)}>
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
