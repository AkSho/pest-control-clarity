import type { ReactNode } from "react";

type SplitFigureProps = {
  eyebrow?: string;
  heading?: string;
  image: string;
  alt: string;
  caption?: string;
  imageSide?: "left" | "right";
  priority?: boolean;
  children?: ReactNode;
  className?: string;
};

/**
 * Editorial side-by-side figure: image paired with optional heading + body
 * copy in a 50/50 grid that alternates left/right between sections.
 * Drop inside an existing page container — does not provide its own section/container.
 */
export function SplitFigure({
  eyebrow,
  heading,
  image,
  alt,
  caption,
  imageSide = "right",
  priority,
  children,
  className,
}: SplitFigureProps) {
  const imageOrder = imageSide === "left" ? "md:order-1" : "md:order-2";
  const textOrder = imageSide === "left" ? "md:order-2" : "md:order-1";

  return (
    <div
      className={`my-12 grid gap-8 md:my-16 md:grid-cols-2 md:gap-12 lg:gap-16 items-center ${className ?? ""}`}
    >
      <div className={textOrder}>
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            {eyebrow}
          </p>
        ) : null}
        {heading ? (
          <h3 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
            {heading}
          </h3>
        ) : null}
        {children ? (
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {children}
          </div>
        ) : null}
        {caption && !children ? (
          <p className="text-base italic leading-relaxed text-muted-foreground md:text-lg">
            {caption}
          </p>
        ) : null}
      </div>
      <figure className={imageOrder}>
        <img
          src={image}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className="w-full rounded-xl border border-border object-cover aspect-[4/5] md:aspect-[3/4]"
        />
        {caption && children ? (
          <figcaption className="mt-3 text-sm italic text-muted-foreground">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </div>
  );
}
