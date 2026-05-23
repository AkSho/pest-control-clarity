// Popup for a clicked report cluster / address group.
// Anchored to a fixed position on the map canvas; not a modal.
// The "replacement cycle" caption is the moment a consumer "gets it".

import { ExternalLink, X } from "lucide-react";
import { Sparkline } from "./Sparkline";
import type { AddressGroup } from "@/lib/rodent-radar/reports";

type Props = {
  group: AddressGroup;
  onClose: () => void;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function pluralize(n: number, s: string) {
  return `${n} ${s}${n === 1 ? "" : "s"}`;
}

export function ReportPopup({ group, onClose }: Props) {
  const { reports, spanMonths, isRecurring, addressLabel, neighborhood } = group;
  const sourceName = reports[0]?.source ?? "Public dataset";
  const sourceUrl = reports[0]?.sourceUrl;
  const mostRecent = reports[reports.length - 1];
  const oldest = reports[0];

  const caption = isRecurring
    ? `${pluralize(reports.length, "report")} across ${spanMonths.toFixed(0)} months. The pattern of a recurring colony — not a one-time sighting.`
    : reports.length === 1
      ? "Single filed report. Not enough signal yet to read a pattern."
      : `${pluralize(reports.length, "report")} at this address. Watch for recurrence.`;

  return (
    <div
      role="dialog"
      aria-label={`Reports at ${addressLabel}`}
      className="pointer-events-auto w-[min(360px,calc(100vw-2rem))] rounded-xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
            {sourceName}
          </div>
          <h3 className="mt-0.5 truncate text-sm font-semibold text-slate-50">{addressLabel}</h3>
          <p className="mt-0.5 text-[0.7rem] text-slate-500">{neighborhood}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="rounded p-1 text-slate-500 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-3">
        <Sparkline reports={reports} className="w-full" />
        <div className="mt-1 flex items-center justify-between text-[0.6rem] text-slate-500">
          <span>{formatDate(oldest.reportedAt)}</span>
          <span>24 months</span>
          <span>{formatDate(mostRecent.reportedAt)}</span>
        </div>
      </div>

      <p
        className={`mt-3 text-[0.75rem] leading-snug ${
          isRecurring ? "text-cyan-100" : "text-slate-300"
        }`}
      >
        {caption}
      </p>

      <div className="mt-3 border-t border-white/5 pt-2 text-[0.65rem] text-slate-500">
        <div className="mb-1 font-medium uppercase tracking-wider text-slate-400">
          Most recent {Math.min(3, reports.length)} {reports.length === 1 ? "report" : "reports"}
        </div>
        <ul className="space-y-1">
          {reports
            .slice(-3)
            .reverse()
            .map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-2">
                <span className="text-slate-300">{formatDate(r.reportedAt)}</span>
                <span className="text-slate-500">{r.status}</span>
              </li>
            ))}
        </ul>
      </div>

      {sourceUrl ? (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-[0.65rem] font-medium text-cyan-300 hover:text-cyan-200"
        >
          View source dataset <ExternalLink className="h-3 w-3" />
        </a>
      ) : null}
    </div>
  );
}
