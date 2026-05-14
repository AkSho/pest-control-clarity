import { useEffect, useState } from "react";

export function StickyMobileBar({
  priceLabel,
  ctaLabel,
  onClick,
}: {
  priceLabel: string;
  ctaLabel: string;
  onClick: () => void;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur transition-transform md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="container-site flex items-center justify-between gap-3 py-3">
        <div>
          <div className="text-xs text-muted-foreground">Total today</div>
          <div className="text-lg font-bold text-foreground">{priceLabel}</div>
        </div>
        <button
          onClick={onClick}
          className="flex-1 rounded-full bg-brand px-5 py-3 text-sm font-bold text-brand-foreground transition hover:bg-brand/90"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}
