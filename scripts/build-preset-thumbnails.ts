/**
 * Regenerates preset thumbnails for the Rodent Radar atlas.
 *
 * Requirements (install on demand, NOT in default deps):
 *   bun add -d playwright && bunx playwright install chromium
 *
 * Then run a local preview server in another terminal:
 *   bun run preview --port 4173
 *
 * And:
 *   bunx tsx scripts/build-preset-thumbnails.ts
 *
 * Writes to public/rodent-radar/presets/{id}.jpg (overwrites the seeded
 * AI-generated thumbnails currently shipped). The runtime PresetBar
 * gracefully falls back to a lucide icon if a file is missing.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const PRESETS = ["winning", "seasonal", "gaps", "your-block"] as const;
const BASE = process.env.THUMB_BASE_URL ?? "http://localhost:4173";
const OUT = resolve("public/rodent-radar/presets");

async function main() {
  await mkdir(OUT, { recursive: true });
  let playwright: typeof import("playwright");
  try {
    playwright = await import("playwright");
  } catch {
    console.warn(
      "[thumbnails] playwright not installed — skipping. Run `bun add -d playwright && bunx playwright install chromium` to enable.",
    );
    return;
  }

  const browser = await playwright.chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 832, height: 512 },
    deviceScaleFactor: 1,
  });
  for (const id of PRESETS) {
    const page = await ctx.newPage();
    await page.goto(`${BASE}/rodent-radar/rat-pressure-map?preset=${id}`, {
      waitUntil: "networkidle",
    });
    await page.waitForSelector("[data-map-ready=\"true\"]", { timeout: 30_000 });
    await page.waitForTimeout(800); // settle ease-to animation
    const buf = await page.screenshot({ type: "jpeg", quality: 86 });
    await writeFile(resolve(OUT, `${id}.jpg`), buf);
    console.log(`[thumbnails] wrote ${id}.jpg`);
    await page.close();
  }
  await browser.close();
}

void main();
