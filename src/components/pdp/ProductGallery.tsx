import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  // Reset to first image when variant changes
  useEffect(() => setActive(0), [images]);

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row md:gap-5">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={cn(
                "shrink-0 overflow-hidden rounded-lg border-2 bg-white transition",
                "h-16 w-16 md:h-20 md:w-20",
                active === i ? "border-brand" : "border-border hover:border-muted-foreground/50"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={src}
                alt=""
                width={80}
                height={80}
                loading="lazy"
                className="h-full w-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="flex-1 overflow-hidden rounded-2xl border border-border bg-white">
        <div className="aspect-square">
          <img
            src={images[active]}
            alt={alt}
            width={800}
            height={800}
            className="h-full w-full object-contain p-6"
          />
        </div>
      </div>
    </div>
  );
}
