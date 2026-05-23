// Docked bottom-left card — one card per layer group (Official Activity,
// Conditions, Modeled). Modeled holds Colony Growth and ships visually gated:
// toggling requires a one-click confirm with the interpretive disclaimer.

import { type LucideIcon, ChevronDown, Lock } from "lucide-react";
import { useState } from "react";
import type { AtlasLayerId } from "@/lib/rodentRadarSearch";

export interface LayerCardItem {
  id: AtlasLayerId;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
  /** True for modeled / interpretive layers that require user confirmation. */
  gated?: boolean;
  gatedDisclaimer?: string;
}

interface LayerCardProps {
  title: string;
  subtitle?: string;
  items: LayerCardItem[];
  activeLayers: AtlasLayerId[];
  onToggle: (id: AtlasLayerId) => void;
  defaultOpen?: boolean;
}

export function LayerCard({
  title,
  subtitle,
  items,
  activeLayers,
  onToggle,
  defaultOpen = true,
}: LayerCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [pendingGated, setPendingGated] = useState<AtlasLayerId | null>(null);

  const handleClick = (item: LayerCardItem) => {
    const active = activeLayers.includes(item.id);
    if (item.gated && !active && pendingGated !== item.id) {
      setPendingGated(item.id);
      return;
    }
    setPendingGated(null);
    onToggle(item.id);
  };

  return (
    <div className="w-[260px] overflow-hidden rounded-lg border border-white/[0.08] bg-slate-950/85 shadow-xl shadow-black/30 backdrop-blur-md">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left"
      >
        <div className="min-w-0">
          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-slate-100">
            {title}
          </div>
          {subtitle ? (
            <div className="mt-0.5 text-[0.58rem] text-slate-500">{subtitle}</div>
          ) : null}
        </div>
        <ChevronDown
          className={`h-3 w-3 text-slate-500 transition-transform ${open ? "" : "-rotate-90"}`}
        />
      </button>

      {open ? (
        <ul className="border-t border-white/[0.05] py-1">
          {items.map((item) => {
            const active = activeLayers.includes(item.id);
            const Icon = item.icon;
            const showConfirm = item.gated && pendingGated === item.id && !active;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleClick(item)}
                  className={`flex w-full items-start gap-2.5 px-3 py-1.5 text-left transition ${
                    active ? "bg-white/[0.04]" : "hover:bg-white/[0.03]"
                  }`}
                  aria-pressed={active}
                >
                  <span
                    className="mt-1 grid h-3 w-3 shrink-0 place-items-center rounded-sm border"
                    style={{
                      background: active ? item.color : "transparent",
                      borderColor: active ? item.color : "rgba(148,163,184,0.4)",
                    }}
                  >
                    {item.gated ? (
                      <Lock
                        className="h-2 w-2"
                        style={{ color: active ? "#0b1220" : "rgba(148,163,184,0.7)" }}
                      />
                    ) : null}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <Icon
                        className="h-3 w-3 shrink-0"
                        style={{ color: active ? item.color : "rgba(148,163,184,0.7)" }}
                      />
                      <span
                        className={`truncate text-[0.7rem] font-medium ${
                          active ? "text-slate-100" : "text-slate-300"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[0.58rem] leading-snug text-slate-500">
                      {item.description}
                    </div>
                  </div>
                </button>

                {showConfirm ? (
                  <div className="border-t border-white/[0.05] bg-amber-300/[0.04] px-3 py-2">
                    <p className="text-[0.6rem] leading-snug text-amber-100/80">
                      {item.gatedDisclaimer ??
                        "This layer is modeled, not observed. It interprets colony dynamics from official activity — not a population count."}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleClick(item)}
                        className="rounded-sm border border-amber-300/40 bg-amber-300/15 px-2 py-1 text-[0.6rem] font-semibold text-amber-100 hover:bg-amber-300/25"
                      >
                        Show layer
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingGated(null)}
                        className="text-[0.6rem] text-slate-400 hover:text-slate-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
