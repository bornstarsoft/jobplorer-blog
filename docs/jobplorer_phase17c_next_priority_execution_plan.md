# Jobplorer Phase 17C Next Priority Execution Plan

## Purpose

Phase 17C defines the next evidence-based operating sequence after the Phase 17B Cloudflare Analytics update.

This phase is docs-only. It does not modify site content, posts, config, CNAME, layouts, themes, generated output, job-site pages, country guides, or career guides.

## Current Decision

The immediate priority is to collect and interpret Google Search Console Performance data for the URLs already tracked in:

`docs/jobplorer_phase16j_search_console_performance_tracking_sheet.md`

The site should remain unchanged until that data is available.

Cloudflare Analytics currently supports continued monitoring, but it does not provide query, impression, CTR, or average-position evidence for title, metadata, internal-link, or legacy rewrite decisions.

## Evidence Used

### Cloudflare Analytics

Phase 17A baseline:

- Visits: about 1.01k
- Page views: about 1.13k
- LCP Good: 99%
- INP Good: 100%
- CLS Good: 100%
- LCP P99: 7,832ms

Phase 17B latest sample:

- Visits: 903
- Page views: 944
- LCP Good: 98%
- INP Good: 100%
- CLS Good: 100%
- LCP P99: 14,188ms

Visits and page views are lower than the approximate baseline, while overall Core Web Vitals remain healthy. The LCP P99 outlier should be monitored across additional weekly samples, but one outlier-heavy sample does not justify performance code changes.

### Search Console

- The Search Console domain property is verified.
- The sitemap is submitted.
- Important service-hub pages and the four rewritten legacy posts are indexed.
- The Phase 16J Performance tracking sheet is still blank.
- Clicks, impressions, CTR, average position, and query evidence are not yet recorded.

### United States Country Guide

- The United States guide remains draft-only.
- The Phase 15B owner checklist is still blank.
- USAJOBS and CareerOneStop claims still require owner browser verification before the guide can move to reviewed status.

## Priority Order

### Priority 1: Collect Search Console Performance Data

Owner action:

1. Open Google Search Console for the `jobplorer.com` domain property.
2. Go to `Performance` > `Search results`.
3. Select `Last 28 days`.
4. Filter by each exact URL listed in the Phase 16J tracking sheet.
5. Record clicks, impressions, CTR, average position, and top queries.
6. Add country and device notes only when they are visible and materially useful.
7. Do not infer missing values.

Completion gate:

- All 13 tracked URLs have clicks, impressions, CTR, average position, and query notes recorded, including explicit zero values where Search Console reports zero.

Next action after completion:

- Run Phase 16M Search Console Performance interpretation.

### Priority 2: Collect Another Cloudflare Weekly Sample

Record another complete 7-day sample after a comparable week.

Capture:

- Visits
- Page views
- Page load value shown
- LCP Good, Needs Improvement, and Poor shares
- INP and CLS shares
- LCP P50, P75, P90, and P99
- Top visible URL groups

Decision gate:

- Investigate performance only if LCP P99 or the Poor share remains elevated for multiple comparable weeks, or if an important page group shows a repeatable problem.

### Priority 3: Complete United States Manual Source Verification

Use:

`docs/jobplorer_phase15b_us_manual_verification_owner_checklist.md`

Keep the United States guide unpublished until the checklist is complete and the source-supported claims are interpreted in a separate review phase.

### Priority 4: Resume Content Work Only After Evidence Review

After Search Console Performance interpretation:

- Monitor pages with low or zero impressions.
- Consider title or metadata review only for URLs with meaningful impressions and persistently weak CTR.
- Add internal links only where contextually useful.
- Resume legacy rewrites only in a small batch after confirming that the first four rewrites are stable.

## Safety Freeze

Until Search Console Performance data is reviewed:

- Do not change URLs, slugs, filenames, canonicals, redirects, or sitemap behavior.
- Do not add `noindex` or delete published pages.
- Do not change titles or metadata from Cloudflare traffic alone.
- Do not expand legacy rewrites.
- Do not start performance optimization from one LCP P99 sample.
- Do not publish the United States guide.

## Git Hosting Operations Note

The current repository `origin` points to GitHub:

`git@github.com:bornstarsoft/jobplorer-blog.git`

The owner confirmed on 2026-07-25 that GitHub is the correct remote for this Jobplorer repository. Keep the current GitHub remote unchanged so the existing Cloudflare Pages deployment source remains consistent.

No remote change or push is part of this phase.

## Phase 17C Completion Result

- Phase 17B is committed.
- The current worktree was clean before this report was created.
- The owner confirmed that the current GitHub remote is correct for Jobplorer.
- Search Console Performance data remains the highest-value missing input.
- No source or site-content changes were made.

## Recommended Next Phase

Primary:

- Phase 16M after the owner fills the Phase 16J Search Console Performance tracking sheet.

Fallback while waiting:

- Phase 17D after another comparable 7-day Cloudflare Analytics sample.
