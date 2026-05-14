// TODO: replace with real authority endorsement (name, title, quote, headshot).
export function AuthorityCard() {
  return (
    <section className="container-site py-12">
      <div className="rounded-3xl border-2 border-dashed border-border bg-surface p-8 text-center">
        <div className="mx-auto mb-3 inline-flex rounded-full bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          TODO · Authority endorsement
        </div>
        <p className="mx-auto max-w-xl text-sm text-muted-foreground">
          Add a quote from a recognized authority (entomologist, public-health official,
          municipal pest manager). Needs: name, title, organization, headshot, one-paragraph
          quote.
        </p>
      </div>
    </section>
  );
}
