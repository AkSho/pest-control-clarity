const LINKS = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How it works" },
  { id: "results", label: "Results" },
  { id: "compare", label: "Compare" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

export function PdpAnchorNav() {
  return (
    <nav className="sticky top-0 z-30 hidden border-b border-border bg-background/85 backdrop-blur md:block">
      <div className="container-site flex items-center gap-1 overflow-x-auto py-3">
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground transition hover:bg-surface hover:text-foreground"
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
