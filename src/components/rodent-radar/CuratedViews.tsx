// Curated views — saved camera + layer configs the consumer can jump to.
// Each view is a one-tap "show me the story" button. Pure local state for now;
// the parent owns the actual flyTo + layer toggle effect.

import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { HERO_CITIES } from "@/lib/rodent-radar/reports";

export type CuratedViewId = "nyc-now" | "replacement-belt" | "data-ends";

export type CuratedView = {
  id: CuratedViewId;
  label: string;
  hint: string;
};

export const CURATED_VIEWS: CuratedView[] = [
  {
    id: "nyc-now",
    label: "NYC right now",
    hint: "Last-90-day activity, recurring sites lit up",
  },
  {
    id: "replacement-belt",
    label: "Recurring activity",
    hint: "Repeated official reports across verified cities",
  },
  {
    id: "data-ends",
    label: "Where the data ends",
    hint: "The honest view — verified dots and reviewed gaps",
  },
];

export function getCuratedViewCamera(id: CuratedViewId): { center: [number, number]; zoom: number } {
  switch (id) {
    case "nyc-now": {
      const nyc = HERO_CITIES.find((c) => c.id === "nyc")!;
      return { center: nyc.center, zoom: nyc.zoom };
    }
    case "replacement-belt":
      // Fit-bounds of the 5 hero cities (US East + Midwest)
      return { center: [-82, 40.5], zoom: 4.4 };
    case "data-ends":
      return { center: [-98, 39], zoom: 3.4 };
  }
}

type Props = {
  activeId: CuratedViewId | null;
  onSelect: (id: CuratedViewId) => void;
};

export function CuratedViews({ activeId, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const active = CURATED_VIEWS.find((v) => v.id === activeId);

  return (
    <div className="pointer-events-auto absolute right-16 top-4 z-[35]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 text-[0.7rem] font-medium text-slate-300 shadow-lg backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-100"
      >
        <MapPin className="h-3 w-3" />
        {active ? active.label : "Curated views"}
        <ChevronDown className={`h-3 w-3 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="absolute right-0 mt-2 w-72 rounded-xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {CURATED_VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => {
                onSelect(v.id);
                setOpen(false);
              }}
              className={`block w-full rounded-lg px-3 py-2 text-left transition ${
                activeId === v.id
                  ? "bg-cyan-400/10 text-cyan-100"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <div className="text-xs font-semibold">{v.label}</div>
              <div className="mt-0.5 text-[0.65rem] text-slate-500">{v.hint}</div>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
