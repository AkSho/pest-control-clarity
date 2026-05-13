## Comment out SplitFigure images on Tier 1 + Tier 2 pages

Wrap every `<SplitFigure ... />` JSX block in `{/* ... */}` and prefix the `import { SplitFigure } ...` line with `// ` so unused-import lint stays quiet. Easy to uncomment later.

**Files (14):**
- `src/routes/evolve-rodent-birth-control.tsx`
- `src/routes/contrapest.tsx`
- `src/routes/contrapest-vs-evolve.tsx`
- `src/routes/does-rat-birth-control-work.tsx`
- `src/routes/how-it-works.tsx`
- `src/routes/vs.rat-poison.tsx`
- `src/routes/vs.traditional-pest-control.tsx`
- `src/routes/vs.snap-traps.tsx`
- `src/routes/vs.diy-rat-birth-control.tsx`
- `src/routes/vs.orkin.tsx`
- `src/routes/vs.assured-environments.tsx`
- `src/routes/vs.bell-environmental.tsx`
- `src/routes/vs.viking-pest-control.tsx`
- `src/routes/vs.western-pest-services.tsx`

**Out of scope:** hero images, OG images, `SplitFigure.tsx` itself, image assets, copy/layout changes.