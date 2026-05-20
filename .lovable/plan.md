## Keyword Gap Analysis: cloakd-removals.cloud vs SenesTech, Ratology, Veseris

### Approach

1. **Pull keyword gaps via Semrush** — Run `competitive_analysis` with `your_domain=cloakd-removals.cloud` and `competitor_domains=senestech.com,ratology.com,veseris.com` (US database, max display_limit=25). This returns keywords competitors rank for that cloakd doesn't.
2. **Enrich each gap keyword** — For each candidate, call `keyword_research` to get volume + KD, and `serp_analysis` to confirm competitor positions (1–20). Drop anything where cloakd already ranks or no competitor sits in top 20.
3. **Apply user filters**:
   - Volume 100–2,000
   - KD < 40
   - Must contain one of: a city name, a service-type word (rodent, rat, mice, pest, removal, control, exterminator, fertility, birth control), `near me`, `emergency`, `best`, `local`
4. **Map to existing pages** — Crawl `cloakd-removals.cloud` sitemap/homepage to list current URLs, then for each keyword decide:
   - **Optimize existing page** if a topically close URL exists
   - **Create new page** otherwise
5. **Score & rank** — `opportunity = (volume_normalized × competitor_count) / max(KD, 1)`. Sort desc, take top 20.
6. **Output** — Write `/mnt/documents/cloakd_keyword_gap.xlsx` with columns: Keyword, Volume, KD, Competitor 1 (pos), Competitor 2 (pos), Competitor 3 (pos), Existing Page (URL or "—"), Opportunity Score, **Action Required**.

### Notes / caveats

- **Semrush quota**: Each keyword needs 2 API calls (`keyword_research` + `serp_analysis`). If the gap list is large I'll cap enrichment at ~40 candidates to stay under quota, then trim to top 20 after filtering.
- **Built-in tool scope**: `competitive_analysis` returns keyword names but limited per-competitor position detail; I'll use `serp_analysis` per keyword to confirm which of the 3 competitors rank and at what position.
- **Existing-page mapping**: Best-effort match using URL slug + page title from the cloakd sitemap. Flagged as "Optimize" only when there's a clear topical fit; otherwise "Create new page".
- **Domain note**: `cloakd-removals.cloud` isn't this project's domain (project is Evolve / pest-pro-rebrand). Confirm you want me to run this against the external domain — the Semrush quota consumed will count against the workspace.

### Deliverable

A single `.xlsx` artifact you can download, sorted by opportunity score with the `Action Required` column populated.
