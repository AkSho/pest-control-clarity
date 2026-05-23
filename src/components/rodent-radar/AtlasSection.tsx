// Small reusable section wrapper used by the sidebar + layer cards. Mirrors the
// `LegendSection` rhythm from the old rail so the visual language stays
// consistent while the IA flips to OGW-style chrome.

import { type ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

interface AtlasSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
}

export function AtlasSection({
  title,
  subtitle,
  children,
  defaultOpen = true,
  collapsible = true,
}: AtlasSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="border-b border-white/[0.06] px-4 py-3 last:border-b-0">
      <button
        type="button"
        disabled={!collapsible}
        onClick={() => collapsible && setOpen((v) => !v)}
        className="flex w-full items-baseline justify-between gap-3 text-left disabled:cursor-default"
      >
        <div className="min-w-0">
          <div className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-200">
            {title}
          </div>
          {subtitle ? (
            <div className="mt-0.5 text-[0.6rem] text-slate-500">{subtitle}</div>
          ) : null}
        </div>
        {collapsible ? (
          <ChevronDown
            className={`h-3 w-3 shrink-0 text-slate-500 transition-transform ${
              open ? "rotate-0" : "-rotate-90"
            }`}
          />
        ) : null}
      </button>
      {open ? <div className="mt-2">{children}</div> : null}
    </section>
  );
}
