import type { ReactNode } from "react";

type SplitFigureProps = {
  eyebrow?: string;
  heading: string;
  image: string;
  alt: string;
  caption?: string;
  imageSide?: "left" | "right";
  priority?: boolean;
  children: ReactNode;
  className?: string;
};

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
    <section className={`py-12 md:py-20 ${className ?? ""}`}>
      <div className="container mx-auto px-4">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
          <div className={`${textOrder}`}>
            {eyebrow ? (
              <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              {heading}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {children}
            </div>
          </div>
          <figure className={`${imageOrder}`}>
            <img
              src={image}
              alt={alt}
              loading={priority ? "eager" : "lazy"}
              className="w-full rounded-xl border border-border object-cover aspect-[4/5] md:aspect-[3/4]"
            />
            {caption ? (
              <figcaption className="mt-3 text-sm italic text-muted-foreground">
                {caption}
              </figcaption>
            ) : null}
          </figure>
        </div>
      </div>
    </section>
  );
}
