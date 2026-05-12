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
  // Compact eyebrow-sized laurel matching the larger HeroTrustBadges art.
  return (
    <svg
      viewBox="0 0 80 120"
      width="14"
      height="21"
      fill="currentColor"
      aria-hidden="true"
      className={cn("shrink-0 opacity-90", side === "right" && "-scale-x-100")}
    >
      {/* central curving stem */}
      <path d="M58 6 C 30 24 18 56 22 114 L 26 114 C 22 60 34 30 62 10 Z" />
      {/* outer leaves */}
      {[
        { cx: 50, cy: 14, rx: 11, ry: 4, rot: -25 },
        { cx: 40, cy: 24, rx: 12, ry: 4.2, rot: -35 },
        { cx: 32, cy: 36, rx: 13, ry: 4.4, rot: -45 },
        { cx: 26, cy: 50, rx: 13, ry: 4.4, rot: -55 },
        { cx: 22, cy: 64, rx: 13, ry: 4.4, rot: -65 },
        { cx: 20, cy: 78, rx: 12, ry: 4.2, rot: -75 },
        { cx: 20, cy: 92, rx: 11, ry: 4, rot: -82 },
        { cx: 22, cy: 104, rx: 10, ry: 3.6, rot: -88 },
      ].map((l, i) => (
        <ellipse
          key={i}
          cx={l.cx}
          cy={l.cy}
          rx={l.rx}
          ry={l.ry}
          transform={`rotate(${l.rot} ${l.cx} ${l.cy})`}
        />
      ))}
      {/* inner leaves */}
      {[
        { cx: 44, cy: 22, rx: 8, ry: 3, rot: -10 },
        { cx: 38, cy: 34, rx: 9, ry: 3.2, rot: -20 },
        { cx: 32, cy: 48, rx: 9, ry: 3.2, rot: -30 },
        { cx: 28, cy: 62, rx: 9, ry: 3.2, rot: -40 },
        { cx: 26, cy: 76, rx: 8.5, ry: 3, rot: -50 },
        { cx: 26, cy: 90, rx: 8, ry: 3, rot: -58 },
        { cx: 28, cy: 102, rx: 7.5, ry: 2.8, rot: -65 },
      ].map((l, i) => (
        <ellipse
          key={`i-${i}`}
          cx={l.cx}
          cy={l.cy}
          rx={l.rx}
          ry={l.ry}
          transform={`rotate(${l.rot} ${l.cx} ${l.cy})`}
        />
      ))}
    </svg>
  );
}

export default Eyebrow;
