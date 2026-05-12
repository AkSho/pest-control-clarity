import { ShieldCheck } from "lucide-react";

function Laurel({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 80" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 72 C 8 60 4 42 10 22" />
        <path d="M14 28 q -6 -2 -8 -8" />
        <path d="M12 38 q -7 -1 -9 -7" />
        <path d="M12 48 q -7 0 -9 -6" />
        <path d="M14 58 q -7 1 -9 -4" />
        <path d="M18 66 q -6 2 -9 -2" />
        <path d="M42 72 C 56 60 60 42 54 22" />
        <path d="M50 28 q 6 -2 8 -8" />
        <path d="M52 38 q 7 -1 9 -7" />
        <path d="M52 48 q 7 0 9 -6" />
        <path d="M50 58 q 7 1 9 -4" />
        <path d="M46 66 q 6 2 9 -2" />
      </g>
    </svg>
  );
}

export function TrustBadgeRating() {
  return (
    <div className="flex items-center gap-3 text-ink-foreground">
      <Laurel className="h-14 w-10 text-accent-warm" />
      <div className="text-center">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] leading-tight">
          4.9★ Rated by
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] leading-tight">
          NYC & NJ Operators
        </div>
      </div>
      <Laurel className="h-14 w-10 -scale-x-100 text-accent-warm" />
    </div>
  );
}

export function TrustBadgeEpa() {
  return (
    <div className="flex items-center gap-3 text-ink-foreground">
      <ShieldCheck className="h-10 w-10 text-accent-warm" strokeWidth={1.5} />
      <div className="leading-tight">
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em]">
          EPA-Designated
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em]">
          Minimum Risk
        </div>
      </div>
    </div>
  );
}

export function HeroTrustBadges() {
  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
      <TrustBadgeRating />
      <TrustBadgeEpa />
    </div>
  );
}
