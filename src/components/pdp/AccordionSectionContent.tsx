import type { AccordionSection } from "@/data/products";

export function AccordionSectionContent({ section }: { section: AccordionSection }) {
  return (
    <div className="flex flex-col gap-3 pb-1">
      {section.lead && (
        <p className="text-sm leading-relaxed text-muted-foreground">{section.lead}</p>
      )}
      {section.steps && (
        <ol className="flex flex-col gap-2.5">
          {section.steps.map((step, i) => (
            <li key={step} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed text-foreground">{step}</span>
            </li>
          ))}
        </ol>
      )}
      {section.bullets && (
        <ul className="flex flex-col gap-2.5">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
                ✓
              </span>
              <span className="text-sm leading-relaxed text-foreground">{bullet}</span>
            </li>
          ))}
        </ul>
      )}
      {section.items && (
        <ul className="flex flex-col gap-2">
          {section.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-foreground">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {item}
            </li>
          ))}
        </ul>
      )}
      {section.chips && (
        <div className="flex flex-wrap gap-2">
          {section.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
      {section.lines && (
        <div className="flex flex-col gap-1.5">
          {section.lines.map((line) => (
            <p key={line} className="text-sm text-muted-foreground">{line}</p>
          ))}
        </div>
      )}
      {section.note && (
        <p className="text-xs italic text-muted-foreground/80">{section.note}</p>
      )}
    </div>
  );
}
