import { Star } from "lucide-react";

function Stars() {
  return (
    <div className="flex gap-0.5 text-accent-warm">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-current" />
      ))}
    </div>
  );
}

function Item({ label, rating }: { label: string; rating: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-bold text-foreground">
        {label}
      </div>
      <div className="leading-tight">
        <Stars />
        <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {rating} Rating
        </div>
      </div>
    </div>
  );
}

export function RatingsRow() {
  return (
    <div className="flex flex-wrap items-center justify-around gap-4 border-t border-border pt-4">
      <Item label="G" rating="4.9" />
      <Item label="f" rating="4.9" />
      <Item label="BBB" rating="A+" />
    </div>
  );
}
