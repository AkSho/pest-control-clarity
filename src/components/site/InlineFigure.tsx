type InlineFigureProps = {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
};

export function InlineFigure({ src, alt, caption, priority, className }: InlineFigureProps) {
  return (
    <figure className={`my-8 ${className ?? ""}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="w-full rounded-lg border border-border object-cover"
      />
      {caption ? (
        <figcaption className="mt-3 text-sm italic text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
