import { WORKS_ON, SAFE_AROUND } from "@/data/products";
import { Check, X } from "lucide-react";

export function WorksOnMarquee() {
  return (
    <section className="border-y border-border bg-surface py-10 overflow-hidden">
      <MarqueeRow
        label="Works on"
        items={WORKS_ON}
        Icon={X}
        accent="text-foreground"
      />
      <div className="mt-6">
        <MarqueeRow
          label="Safe around"
          items={SAFE_AROUND}
          Icon={Check}
          accent="text-brand"
          reverse
        />
      </div>
    </section>
  );
}

function MarqueeRow({
  label,
  items,
  Icon,
  accent,
  reverse,
}: {
  label: string;
  items: string[];
  Icon: typeof Check;
  accent: string;
  reverse?: boolean;
}) {
  // Duplicate items for seamless infinite loop
  const doubled = [...items, ...items];
  return (
    <div className="relative flex items-center gap-4">
      <span className="shrink-0 ml-4 md:ml-8 rounded-full border border-border bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="flex-1 overflow-hidden">
        <div
          className="flex gap-3 whitespace-nowrap"
          style={{
            animation: `marquee-${reverse ? "right" : "left"} 40s linear infinite`,
          }}
        >
          {doubled.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground"
            >
              <Icon className={`h-3.5 w-3.5 ${accent}`} />
              {item}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
