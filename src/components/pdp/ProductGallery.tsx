import { useState, useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// T01: "View Product Label" button removed
// T02: EPA badge now opens an ELI5 modal
// T06: Compact "Targets / Safe for" display replaces standalone WorksOnMarquee

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => setActive(0), [images]);

  const activeSrc = images[active] ?? images[0];

  return (
    <div className="flex min-w-0 flex-col gap-3">
      {/* Gallery: thumbs left on desktop, below on mobile */}
      <div className="flex min-w-0 flex-col-reverse gap-3 xl:flex-row-reverse xl:gap-4">
        {/* Main image — click to open lightbox */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex-1 cursor-zoom-in overflow-hidden rounded-xl border-2 border-foreground/10 bg-white">
              <div className="aspect-square">
                <img
                  key={activeSrc}
                  src={activeSrc}
                  alt={alt}
                  width={800}
                  height={800}
                  className="h-full w-full object-contain p-4 transition-opacity duration-200"
                  fetchPriority="high"
                  loading="eager"
                />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-3xl border-0 bg-white p-2">
            <DialogHeader className="sr-only">
              <DialogTitle>{alt}</DialogTitle>
            </DialogHeader>
            <img
              src={activeSrc}
              alt={alt}
              width={1200}
              height={1200}
              className="h-full w-full object-contain"
            />
          </DialogContent>
        </Dialog>

        {/* Thumbnails — horizontal on mobile, vertical on desktop */}
        {images.length > 1 && (
          <div className="flex min-w-0 max-w-full gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden xl:flex-col xl:overflow-visible xl:pb-0">
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                onClick={() => setActive(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "shrink-0 overflow-hidden rounded-lg border-2 bg-white transition",
                  "h-16 w-16 xl:h-[72px] xl:w-[72px]",
                  active === i
                    ? "border-brand shadow-sm"
                    : "border-border hover:border-foreground/30",
                )}
              >
                <img
                  src={src}
                  alt=""
                  width={72}
                  height={72}
                  loading="lazy"
                  className="h-full w-full object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* EPA badge — click opens plain-English explanation modal (desktop only) */}
      <div className="hidden md:block">
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex w-full items-center gap-3 rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-left transition hover:bg-brand/10">
            <ShieldCheck className="h-8 w-8 shrink-0 text-brand" />
            <div>
              <p className="text-xs font-bold text-foreground">EPA Minimum-Risk · FIFRA 25(b)</p>
              <p className="text-xs text-brand">What does this mean for me? →</p>
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="h-5 w-5 text-brand" />
              What "EPA Minimum-Risk" means for you
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 text-sm text-muted-foreground">
            <p>
              The EPA keeps a list of pest control products made from ingredients already known to
              be safe — things like food-grade oils, cedarwood, and other natural materials.
              Products on this list are classified as{" "}
              <strong className="text-foreground">minimum-risk pesticides</strong>. Evolve is on
              that list.
            </p>
            <p>
              The active ingredient is <strong className="text-foreground">cottonseed oil</strong>{" "}
              — food-grade, not a blood thinner, not a neurotoxin.
            </p>
            <ul className="flex flex-col gap-2.5">
              {[
                "No license or permit needed to buy or use it",
                "No exterminator or certified applicator required",
                "Safe for pets, dogs, hawks, owls, and other wildlife when used as directed",
                "Can be used in homes, rentals, restaurants, and commercial buildings",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/10 text-[10px] font-bold text-brand">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
      </div>

      {/* Targets / Safe for (desktop only) */}
      <div className="hidden md:block rounded-2xl border border-border bg-surface p-4">
        <div className="mb-3 flex items-start gap-4">
          <div className="flex flex-col items-center gap-1 pt-0.5">
            <span className="text-2xl">🐀</span>
            <span className="text-2xl">🐭</span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Targets
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {[
                { label: "Norway rat", emoji: "🐀" },
                { label: "Roof rat", emoji: "🐀" },
                { label: "House mouse", emoji: "🐭" },
                { label: "Deer mouse", emoji: "🐭" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-semibold text-foreground"
                >
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Safe for
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: "Dogs", emoji: "🐕" },
              { label: "Cats", emoji: "🐈" },
              { label: "Hawks", emoji: "🦅" },
              { label: "Owls", emoji: "🦉" },
              { label: "Chickens", emoji: "🐔" },
              { label: "Livestock", emoji: "🐄" },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 rounded-md border border-brand/20 bg-brand/5 px-3 py-1.5 text-sm font-semibold text-foreground"
              >
                <span>{item.emoji}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
