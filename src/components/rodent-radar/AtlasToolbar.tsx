// Slim top toolbar — search, share (copy deep-link), bookmark hint.
// History / saved-views are deferred per the locked plan; the bookmark
// button only surfaces an informational tooltip for now.

import { Bookmark, Check, Copy, ListFilter, Search as SearchIcon, Share2 } from "lucide-react";
import { useState } from "react";

interface AtlasToolbarProps {
  query: string;
  onQueryChange: (q: string) => void;
  shareUrl?: string;
  onOpenReports?: () => void;
  pulseReports?: boolean;
}

export function AtlasToolbar({ query, onQueryChange, shareUrl, onOpenReports, pulseReports = false }: AtlasToolbarProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarkHint, setBookmarkHint] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const target = shareUrl ?? window.location.href;
    try {
      await navigator.clipboard?.writeText(target);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard refused — silently no-op */
    }
  };

  return (
    <div
      className="pointer-events-auto absolute right-4 top-4 hidden items-center gap-2 rounded-full border border-white/[0.08] bg-slate-950/82 px-2 py-1.5 shadow-xl shadow-black/40 backdrop-blur-md md:flex"
      style={{ zIndex: 40 }}
    >
      <label className="flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-1.5">
        <SearchIcon className="h-3.5 w-3.5 text-slate-400" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search city or region"
          className="w-44 bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
        />
      </label>

      <div className="h-5 w-px bg-white/[0.08]" />

      <button
        type="button"
        onClick={onOpenReports}
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium text-slate-300 hover:bg-white/[0.05]"
      >
        <ListFilter className="h-3 w-3" />
        Reports
      </button>

      <button
        type="button"
        onClick={handleShare}
        title="Copy a shareable link to this exact view"
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium text-slate-200 hover:bg-white/[0.05]"
      >
        {copied ? <Check className="h-3 w-3 text-emerald-300" /> : <Share2 className="h-3 w-3" />}
        {copied ? "Copied" : "Share view"}
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setBookmarkHint(true);
            window.setTimeout(() => setBookmarkHint(false), 2400);
          }}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium text-slate-300 hover:bg-white/[0.05]"
        >
          <Bookmark className="h-3 w-3" />
          Save view
        </button>
        {bookmarkHint ? (
          <div className="absolute right-0 top-full mt-2 w-56 rounded-md border border-white/[0.08] bg-slate-950/95 p-2.5 text-[0.65rem] text-slate-300 shadow-xl">
            Saved views and history are coming. Until then, copy the share link — every layer, metric, and city is encoded in the URL.
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => {
          if (typeof window === "undefined") return;
          window.open("/rodent-radar/attribution", "_blank", "noopener");
        }}
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium text-slate-300 hover:bg-white/[0.05]"
      >
        <Copy className="h-3 w-3" />
        Attribution
      </button>
    </div>
  );
}
