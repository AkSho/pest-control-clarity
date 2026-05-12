import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "brand" | "dark" | "light";

interface EyebrowProps {
  children: ReactNode;
  tone?: Tone;
  icon?: LucideIcon;
  align?: "left" | "center";
  className?: string;
}

/**
 * Decorative eyebrow label flanked by mirrored laurel branches.
 * Sits above an H1/H2 to give section openers a small badge of authority.
 *
 * - tone="brand"  (default) brand-blue text + brand-blue laurels (works on light + dark bg)
 * - tone="dark"   white text + ivory laurels (best on dark/ink hero sections)
 * - tone="light"  ink text + ink laurels (best on white sections when blue feels off)
 *
 * Optional `icon` replaces the LEFT laurel (badge variant — e.g. MapPin, ShieldCheck).
 */
export function Eyebrow({
  children,
  tone = "brand",
  icon: Icon,
  align = "left",
  className,
}: EyebrowProps) {
  const toneClass =
    tone === "dark"
      ? "text-white/90"
      : tone === "light"
      ? "text-ink-foreground"
      : "text-brand";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]",
        toneClass,
        align === "center" && "justify-center",
        className,
      )}
    >
      {Icon ? (
        <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      ) : (
        <Laurel side="left" />
      )}
      <span>{children}</span>
      <Laurel side="right" />
    </div>
  );
}

function Laurel({ side }: { side: "left" | "right" }) {
  // Single half-laurel curving up & to the right from a base on the right side.
  // The element is mirrored for the right side via -scale-x-100.
  return (
    <svg
      viewBox="0 0 48 36"
      width="40"
      height="30"
      fill="currentColor"
      aria-hidden="true"
      className={cn("shrink-0 opacity-90", side === "right" && "-scale-x-100")}
    >
      {/* Curved spine arching up from bottom-right to top-left */}
      <path
        d="M46 30 C 36 30, 18 24, 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Outer leaves (above the spine) — long axis points up-and-out */}
      <ellipse cx="40" cy="24" rx="4.5" ry="1.8" transform="rotate(-55 40 24)" />
      <ellipse cx="32" cy="18" rx="5"   ry="1.9" transform="rotate(-65 32 18)" />
      <ellipse cx="24" cy="13" rx="5"   ry="1.9" transform="rotate(-75 24 13)" />
      <ellipse cx="16" cy="9"  rx="4.5" ry="1.8" transform="rotate(-85 16 9)"  />
      <ellipse cx="9"  cy="6"  rx="3.8" ry="1.6" transform="rotate(-95 9 6)"   />
      {/* Inner leaves (below the spine) — fewer, smaller */}
      <ellipse cx="36" cy="29" rx="3.6" ry="1.5" transform="rotate(-25 36 29)" />
      <ellipse cx="28" cy="24" rx="4"   ry="1.6" transform="rotate(-35 28 24)" />
      <ellipse cx="20" cy="19" rx="4"   ry="1.6" transform="rotate(-45 20 19)" />
      <ellipse cx="13" cy="14" rx="3.6" ry="1.5" transform="rotate(-55 13 14)" />
    </svg>
  );
}

export default Eyebrow;
