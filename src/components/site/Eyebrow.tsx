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
  return (
    <svg
      viewBox="0 0 28 18"
      width="22"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0 opacity-80", side === "right" && "-scale-x-100")}
    >
      {/* main curved branch */}
      <path d="M26 9 C 20 3, 11 2, 3 9 C 11 16, 20 15, 26 9 Z" opacity="0.0" />
      <path d="M26 9 C 20 4, 12 3, 4 9" />
      <path d="M26 9 C 20 14, 12 15, 4 9" />
      {/* upper leaves */}
      <path d="M22 6.5 q -1.5 -2.5 -4 -2" />
      <path d="M18 5.4 q -1.5 -2.4 -4 -1.8" />
      <path d="M14 4.8 q -1.4 -2.2 -3.6 -1.6" />
      <path d="M10 4.6 q -1.2 -2 -3 -1.4" />
      {/* lower leaves */}
      <path d="M22 11.5 q -1.5 2.5 -4 2" />
      <path d="M18 12.6 q -1.5 2.4 -4 1.8" />
      <path d="M14 13.2 q -1.4 2.2 -3.6 1.6" />
      <path d="M10 13.4 q -1.2 2 -3 1.4" />
    </svg>
  );
}

export default Eyebrow;
