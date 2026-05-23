// Visual key explaining how data confidence maps onto marker styling.
// Lives in the sidebar so the user can read the dot encoding at a glance:
// fill opacity = confidence, dashed ring = low confidence, hollow = data gap.

export function ConfidenceKey() {
  const rows = [
    { label: "High confidence", swatch: "solid-strong", note: "Inspection-based or dedicated SR type" },
    { label: "Medium", swatch: "solid-soft", note: "Complaint-based, well-tagged" },
    { label: "Low", swatch: "dashed", note: "Sparse volume or noisy category" },
    { label: "Reviewed data gap", swatch: "hollow", note: "No clean dataset published yet" },
  ] as const;

  return (
    <div className="grid gap-1.5">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center gap-2.5">
          <ConfidenceSwatch kind={row.swatch} />
          <div className="min-w-0">
            <div className="text-[0.7rem] font-medium text-slate-200">{row.label}</div>
            <div className="text-[0.6rem] leading-tight text-slate-500">{row.note}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ConfidenceSwatch({ kind }: { kind: "solid-strong" | "solid-soft" | "dashed" | "hollow" }) {
  const base = "h-3 w-3 shrink-0 rounded-full";
  if (kind === "solid-strong") {
    return <span className={base} style={{ background: "#67e8f9", boxShadow: "0 0 6px #67e8f988" }} />;
  }
  if (kind === "solid-soft") {
    return <span className={base} style={{ background: "#67e8f9", opacity: 0.55 }} />;
  }
  if (kind === "dashed") {
    return (
      <span
        className={base}
        style={{
          background: "transparent",
          border: "1.5px dashed #67e8f9",
        }}
      />
    );
  }
  return (
    <span
      className={base}
      style={{
        background: "transparent",
        border: "1.5px solid #94a3b8",
      }}
    />
  );
}
