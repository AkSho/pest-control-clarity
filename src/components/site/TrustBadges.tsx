import { ShieldCheck } from "lucide-react";

function Laurel({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 80 120"
      className={`h-16 w-10 text-white md:h-20 md:w-12 ${flip ? "-scale-x-100" : ""}`}
      aria-hidden="true"
      fill="currentColor"
    >
      {/* central curving stem */}
      <path
        d="M58 6 C 30 24 18 56 22 114 L 26 114 C 22 60 34 30 62 10 Z"
        opacity="0.95"
      />
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

function LaurelBadge({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="flex items-center gap-2 text-white">
      <Laurel />
      <div className="text-center font-display font-extrabold uppercase leading-[1.05] tracking-tight">
        <div className="text-[14px] md:text-[16px]">{line1}</div>
        <div className="text-[14px] md:text-[16px]">{line2}</div>
      </div>
      <Laurel flip />
    </div>
  );
}

function ShieldBadge({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="flex items-center gap-3 text-white">
      <ShieldCheck className="h-12 w-12 md:h-14 md:w-14" strokeWidth={2.25} />
      <div className="font-display font-extrabold uppercase leading-[1.05] tracking-tight">
        <div className="text-[14px] md:text-[16px]">{line1}</div>
        <div className="text-[14px] md:text-[16px]">{line2}</div>
      </div>
    </div>
  );
}

export function HeroTrustBadges() {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
      <LaurelBadge line1="4.9 - Star Rated By" line2="Operators" />
      <ShieldBadge line1="EPA-Designated" line2="Minimum Risk" />
    </div>
  );
}
