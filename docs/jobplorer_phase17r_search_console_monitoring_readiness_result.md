# Jobplorer Phase 17R Search Console Monitoring Readiness Result

## Purpose

Phase 17R checks whether Google Search Console Performance data is available after the latest country-guide and homepage deployments, and updates the tracking scope for the newly published United States guide.

This phase is docs-only. It does not modify site content, configuration, templates, URLs, or deployment state.

## Phase 17Q Report Commit

The homepage country-guide links deployment report was committed before this check:

```text
fe1f2df Document homepage country guide links deployment
```

Committed file:

- `docs/jobplorer_phase17q_homepage_country_guide_links_deployment_result.md`

## Data Sources Checked

Reviewed:

- `docs/jobplorer_phase16c_url_inspection_tracking_sheet.md`
- `docs/jobplorer_phase16j_search_console_performance_tracking_sheet.md`
- `docs/jobplorer_phase16l_search_console_performance_waiting_state.md`

## Performance Data Availability

The Phase 16J Performance tracking sheet now contains 14 tracked URLs.

Rows with recorded Performance values:

```text
0
```

The following fields remain blank for every tracked URL:

- clicks
- impressions
- CTR
- average position
- top queries
- country notes
- device notes
- decision
- notes

No Performance interpretation can be made from the current sheet.

## Tracking Scope Update

The United States guide was published after the original Search Console tracking set.

Added the United States URL to:

- `docs/jobplorer_phase16j_search_console_performance_tracking_sheet.md`
- `docs/jobplorer_phase16c_url_inspection_tracking_sheet.md`

Tracked URL:

```text
https://jobplorer.com/country-guides/united-states/
```

No metric or inspection value was invented.

The new URL Inspection section uses `not checked` for fields that require owner-provided Search Console data.

## Current Tracking Inventory

Performance tracking now covers:

- homepage
- LinkedIn
- Indeed
- Glassdoor
- Software Developers
- Game Developers
- Remote Workers
- South Korea
- Canada
- United States
- four rewritten legacy posts

Total tracked URLs:

```text
14
```

## URL Inspection Readiness

The previously tracked URLs have owner-recorded URL Inspection results.

The United States guide still needs owner URL Inspection data for:

- inspection date
- indexed status
- Google-selected canonical if shown
- user-declared canonical if shown
- last crawl date if shown
- mobile usability if shown
- page fetch status
- crawl/index warnings
- indexing request status
- notes

The live route and sitemap presence were verified during deployment, but those checks do not replace Google Search Console URL Inspection.

## Decision

Do not interpret Search Console Performance yet.

Do not make:

- URL or slug changes
- canonical changes
- `noindex` or delete decisions
- sitemap changes
- title or metadata changes
- additional legacy rewrite decisions
- broad internal-link expansion

The current data state supports monitoring preparation only.

## Owner Data Collection Checklist

### United States URL Inspection

Inspect:

```text
https://jobplorer.com/country-guides/united-states/
```

Record only values visible in Google Search Console.

If the URL is not indexed, run the live URL test and request indexing only if the live test passes.

### Performance Data

In Google Search Console:

1. Open `Performance > Search results`.
2. Select `Last 28 days`.
3. Filter by exact page URL.
4. Record clicks, impressions, CTR, and average position.
5. Record top queries when visible.
6. Record country and device notes only when useful.
7. Repeat for the 14 tracked URLs.

Zero values should be entered as `0`, not left blank. A blank field means the value has not been collected.

## Safe Waiting Policy

While data remains blank:

- keep current URLs and slugs
- keep current canonical and sitemap behavior
- keep published pages indexed
- do not delete or noindex pages
- do not optimize titles from assumptions
- do not expand legacy rewrites
- continue only operational monitoring and evidence collection

## Recommended Next Step

Phase 17S after owner data is available:

- record the United States URL Inspection result
- fill available Last 28 days Performance values for the 14 tracked URLs
- distinguish true zero values from uncollected blanks
- interpret only the recorded data

If Performance data is still unavailable, keep waiting and record the next weekly Cloudflare Analytics row instead of editing content.
