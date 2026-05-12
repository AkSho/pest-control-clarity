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
  // Left-facing branch: curved spine sweeping up-and-left, with paired leaves.
  // Right side mirrors via -scale-x-100.
  return (
    <svg
      viewBox="0 0 40 28"
      width="34"
      height="22"
      fill="currentColor"
      aria-hidden="true"
      className={cn("shrink-0 opacity-90", side === "right" && "-scale-x-100")}
    >
      {/* Spine */}
      <path
        d="M38 14 C 30 4, 16 4, 4 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M38 14 C 30 24, 16 24, 4 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Upper leaves (each is a rotated ellipse) */}
      <ellipse cx="32" cy="9" rx="3.2" ry="1.4" transform="rotate(-30 32 9)" />
      <ellipse cx="25" cy="6.5" rx="3.4" ry="1.4" transform="rotate(-20 25 6.5)" />
      <ellipse cx="18" cy="5.5" rx="3.4" ry="1.4" transform="rotate(-10 18 5.5)" />
      <ellipse cx="11" cy="6.2" rx="3.2" ry="1.3" transform="rotate(0 11 6.2)" />
      <ellipse cx="5.5" cy="8.5" rx="2.8" ry="1.2" transform="rotate(15 5.5 8.5)" />
      {/* Lower leaves */}
      <ellipse cx="32" cy="19" rx="3.2" ry="1.4" transform="rotate(30 32 19)" />
      <ellipse cx="25" cy="21.5" rx="3.4" ry="1.4" transform="rotate(20 25 21.5)" />
      <ellipse cx="18" cy="22.5" rx="3.4" ry="1.4" transform="rotate(10 18 22.5)" />
      <ellipse cx="11" cy="21.8" rx="3.2" ry="1.3" transform="rotate(0 11 21.8)" />
      <ellipse cx="5.5" cy="19.5" rx="2.8" ry="1.2" transform="rotate(-15 5.5 19.5)" />
    </svg>
  );
}

export default Eyebrow;
