// Cinematic mode: hide all chrome, leave only the map and a thin exit affordance.
// The screenshot-and-share layer.

import { useEffect } from "react";
import { Play, X } from "lucide-react";

type Props = {
  cinematic: boolean;
  onToggle: () => void;
};

export function CinematicToggle({ cinematic, onToggle }: Props) {
  // ESC + "c" keyboard shortcut to enter/exit
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      }
      if (e.key === "Escape" && cinematic) {
        e.preventDefault();
        onToggle();
      } else if ((e.key === "c" || e.key === "C") && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        onToggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cinematic, onToggle]);

  if (cinematic) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="pointer-events-auto absolute right-4 top-4 z-[80] inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-300 shadow-lg backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-100"
        title="Exit cinematic (Esc)"
      >
        <X className="h-3 w-3" /> Exit (Esc)
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className="pointer-events-auto absolute right-4 top-4 z-[35] inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-slate-300 shadow-lg backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-100"
      title="Cinematic mode (C)"
      aria-label="Enter cinematic mode"
    >
      <Play className="h-3.5 w-3.5" />
    </button>
  );
}
