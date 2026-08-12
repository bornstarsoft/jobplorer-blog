# Jobplorer Search-First Service Hub 7-Day Monitoring Checklist

## Purpose

Measure the first seven days after the search-first service-hub renewal without
making premature content, SEO, URL, or performance changes.

## Observation Window

- Deployment commit: `7cf47b6 Renew Jobplorer as search-first service hub`
- Deployment date: 2026-07-26
- Observation window: 2026-07-26 through 2026-08-02
- Primary domain: `https://jobplorer.com/`
- Comparison references:
  - `docs/jobplorer_phase16j_search_console_performance_tracking_sheet.md`
  - `docs/jobplorer_phase17b_weekly_cloudflare_analytics_tracking_sheet.md`

## Measurement Boundary

Cloudflare Web Analytics and the current GA4 installation can show page-level
traffic and navigation outcomes. The homepage search terms and resource-filter
clicks are client-side interactions and are not currently sent as custom
analytics events.

Use destination-page traffic as a cautious proxy for discovery. Do not report
search or filter usage counts unless dedicated event tracking is added and
validated in a separately approved phase.

## Daily Operations Check

Complete only when a problem is observed or at the start and end of the window.

| Check | Start | End | Notes |
| --- | --- | --- | --- |
| Homepage returns HTTP 200 |  |  |  |
| CSS, interaction script, and Lucide bundle return HTTP 200 |  |  |  |
| Homepage search works |  |  |  |
| Category filters work |  |  |  |
| Mobile menu works |  |  |  |
| No browser console errors |  |  |  |
| Reviewed profile and guide sample routes return HTTP 200 |  |  |  |
| Sitemap remains available |  |  |  |
| Unique `/posts/` URL count remains 258 |  |  |  |

## Cloudflare 7-Day Data

Use `Last 7 days`, exclude bot traffic, and record values exactly as shown.

| Metric | Prior reference | Renewal week | Notes |
| --- | ---: | ---: | --- |
| Visits | 903 |  |  |
| Page views | 944 |  |  |
| LCP Good | 98% |  |  |
| LCP Poor | 2% |  |  |
| INP Good | 100% |  |  |
| CLS Good | 100% |  |  |
| LCP P50 | 492ms |  |  |
| LCP P75 | 740ms |  |  |
| LCP P90 | 1,220ms |  |  |
| LCP P99 | 14,188ms |  |  |

Record visible top URL groups:

- Homepage:
- Job Sites hub and profiles:
- Career Guides hub and guides:
- Country Guides hub and guides:
- Job Seeker Tools:
- Legacy `/posts/` archive:
- Other:

## Search Console Data

Use `Performance > Search results`. Prefer `Last 7 days` for the renewal window
and retain `Last 28 days` as the context view.

| URL group | Clicks | Impressions | CTR | Average position | Top queries | Decision |
| --- | ---: | ---: | ---: | ---: | --- | --- |
| Homepage |  |  |  |  |  |  |
| Job Site Profiles |  |  |  |  |  |  |
| Career Guides |  |  |  |  |  |  |
| Country Guides |  |  |  |  |  |  |
| Four rewritten legacy posts |  |  |  |  |  |  |
| Legacy `/posts/` archive |  |  |  |  |  |  |

Also record:

- Data collection date:
- Search Console property:
- Indexed/canonical warnings:
- Material country or device differences:
- Data too small for interpretation: yes / no

## Service-Hub Discovery Signals

Record page-level values only when visible in Cloudflare, GA4, or Search
Console. Do not invent totals by combining incompatible tools.

| Signal | Result | Source | Notes |
| --- | --- | --- | --- |
| Homepage traffic |  |  |  |
| Job Sites hub traffic |  |  |  |
| Job Site profile traffic |  |  |  |
| Career Guides hub traffic |  |  |  |
| Career Guide traffic |  |  |  |
| Country Guides hub traffic |  |  |  |
| Country Guide traffic |  |  |  |
| Job Seeker Tools traffic |  |  |  |
| Legacy archive traffic |  |  |  |

## Decision Rules

- Fix HTTP, missing-asset, JavaScript, or mobile navigation failures
  immediately when reproducible.
- Treat one seven-day traffic sample as directional, not conclusive.
- If service-hub destination pages receive new or sustained traffic, keep the
  current information architecture and continue monitoring.
- If traffic is flat or lower, check source, query, country, and device context
  before changing content or layout.
- If Core Web Vitals remain healthy, do not start performance optimization.
- Investigate LCP outliers only when they persist across multiple weeks or can
  be tied to a specific route group.
- Do not change URLs, slugs, canonicals, sitemap behavior, redirects, or
  `noindex` from this seven-day sample.
- Do not change titles or metadata from tiny or blank query samples.
- Do not expand legacy rewrites until Search Console Performance data is stable
  enough to compare the four rewritten posts.
- Do not claim that homepage search or filter engagement was measured without
  validated custom analytics events.

## End-of-Window Decision

Choose one after filling the evidence:

- Continue monitoring with no site change.
- Add contextual internal links to a clearly under-discovered reviewed page.
- Plan a small title/meta review for pages with meaningful impressions and
  persistently low CTR.
- Plan custom search/filter analytics events in a separate implementation
  phase.
- Hold all content and SEO changes because the sample is still too small.

## Recommended Next Step

On or after 2026-08-02, fill this checklist and create a short interpretation
report. Prefer monitoring or a small measurement improvement over another broad
visual redesign.
