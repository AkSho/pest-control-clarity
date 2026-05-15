import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  // Reset to hero when variant changes
  useEffect(() => setActive(0), [images]);

  const activeSrc = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      {/* Gallery: thumbs left on desktop, below on mobile */}
      {/* xl:flex-row-reverse puts thumbs on the LEFT (main image on right) */}
      <div className="flex flex-col-reverse gap-3 xl:flex-row-reverse xl:gap-4">
        {/* Main image */}
        <div className="flex-1 overflow-hidden rounded-xl border-2 border-foreground/10 bg-white">
          <div className="aspect-square">
            <img
              key={activeSrc}
              src={activeSrc}
              alt={alt}
              width={800}
              height={800}
              className="h-full w-full object-contain p-4 transition-opacity duration-200"
            />
          </div>
        </div>

        {/* Thumbnails — horizontal scroll on mobile, vertical column on desktop */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 xl:flex-col xl:overflow-visible xl:pb-0">
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

      {/* View Product Label button */}
      <a
        href="/products/product-label.jpg"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground shadow-sm transition hover:bg-surface"
      >
        <FileText className="h-3.5 w-3.5 text-brand" />
        View Product Label
      </a>
    </div>
  );
}
