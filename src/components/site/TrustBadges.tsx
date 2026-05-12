function Laurel({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 110" className={className} aria-hidden="true">
      <g fill="currentColor">
        {/* central stem */}
        <path d="M30 8 C 18 30 12 60 18 100 L 20 100 C 16 65 22 35 32 12 Z" opacity="0.85" />
        {/* leaves left side, paired */}
        {[18, 28, 40, 52, 64, 76, 86].map((y, i) => (
          <g key={i}>
            <ellipse
              cx={20 - i * 0.4}
              cy={y}
              rx="9"
              ry="3.4"
              transform={`rotate(${-35 - i * 2} ${20 - i * 0.4} ${y})`}
            />
          </g>
        ))}
        {[24, 34, 46, 58, 70, 82, 92].map((y, i) => (
          <g key={`b-${i}`}>
            <ellipse
              cx={14 - i * 0.2}
              cy={y}
              rx="7.5"
              ry="2.8"
              transform={`rotate(${-55 - i * 2} ${14 - i * 0.2} ${y})`}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

function Badge({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="relative flex items-center">
      <Laurel className="h-20 w-12 text-white" />
      <div
        className="px-4 py-2 text-center font-display font-extrabold uppercase leading-tight text-white"
        style={{
          background: "rgba(120, 100, 180, 0.45)",
          backdropFilter: "blur(2px)",
        }}
      >
        <div className="text-[13px] tracking-tight md:text-[14px]">{line1}</div>
        <div className="text-[13px] tracking-tight md:text-[14px]">{line2}</div>
      </div>
      <Laurel className="h-20 w-12 -scale-x-100 text-white" />
    </div>
  );
}

export function HeroTrustBadges() {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
      <Badge line1="4.9—Star Rated By" line2="Operators" />
      <Badge line1="EPA-Designated" line2="Minimum Risk" />
    </div>
  );
}
