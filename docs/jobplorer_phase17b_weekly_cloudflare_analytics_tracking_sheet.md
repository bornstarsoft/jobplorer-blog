# Jobplorer Phase 17B Weekly Cloudflare Analytics Tracking Sheet

## Purpose

Phase 17B records the latest owner-provided Cloudflare Web Analytics 7-day data for Jobplorer and compares it against the Phase 17A baseline.

This phase is docs-only. It does not modify content, posts, config, CNAME, layouts, themes, generated output, job-site pages, country guides, or career guides.

## Weekly Tracking Table

| Phase | Date range | Site | Bot traffic excluded | Visits | Page views | Page load shown | LCP Good | LCP Needs Improvement | LCP Poor | INP Good | CLS Good | LCP P50 | LCP P75 | LCP P90 | LCP P99 |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 17A baseline | Last 7 days | `jobplorer.com` | yes | about 1.01k | about 1.13k | about 323ms | 99% | 0% | 1% | 100% | 100% | 272ms | 535ms | 1,016ms | 7,832ms |
| 17B latest | Last 7 days | `jobplorer.com` | yes | 903 | 944 | 0ms | 98% | 0% | 2% | 100% | 100% | 492ms | 740ms | 1,220ms | 14,188ms |

## Latest Cloudflare Data Row

Owner-provided latest Cloudflare Web Analytics data:

- Date range: Last 7 days
- Site: `jobplorer.com`
- Bot traffic excluded: yes
- Visits: 903
- Page views: 944
- Page load time shown: 0ms
- LCP: 98% Good, 0% Needs Improvement, 2% Poor
- INP: 100% Good, 0% Needs Improvement, 0% Poor
- CLS: 100% Good, 0% Needs Improvement, 0% Poor
- LCP P50: 492ms
- LCP P75: 740ms
- LCP P90: 1,220ms
- LCP P99: 14,188ms

## Top URL Groups Observed

Top visible URL groups in the latest 7-day view:

- `/`
- `/job-sites/`
- `/job-sites/sites/`
- `/country-guides/`
- `/posts/`

## Week-Over-Week Interpretation

Overall Core Web Vitals remain healthy.

Visits decreased from about 1.01k to 903, and page views decreased from about 1.13k to 944. This is a modest decline, not a standalone reason to change content or site structure.

The page load value is shown as 0ms in the latest Cloudflare view. Treat this as a dashboard-reported value to track, not as proof that every page load is literally instantaneous.

LCP remains mostly healthy at 98% Good. The Poor share increased from 1% to 2%, and the P99 outlier increased from 7,832ms to 14,188ms. This should be monitored across multiple weekly samples before starting performance work.

INP and CLS remain excellent at 100% Good.

The latest top URL groups still include the homepage, job-site hubs, country-guide hub, and legacy `/posts/` archive. This suggests both service-hub routes and legacy archive routes continue to receive visibility in Cloudflare traffic.

## Decision Rules

- If Core Web Vitals stay healthy, do not start performance work.
- If LCP P99 remains high for multiple weeks, investigate affected page groups before changing code.
- If traffic drops sharply, inspect URL groups and traffic sources before changing content.
- Do not rewrite legacy posts from Cloudflare data alone.
- Do not change titles or metadata until Search Console query data exists.
- Do not change URLs, slugs, canonicals, noindex behavior, sitemap behavior, or redirects from Cloudflare Analytics alone.

## Recommended Next Phase

Phase 17C: weekly Cloudflare interpretation after another week.

Alternative: Phase 16M Search Console Performance data interpretation when Search Console clicks, impressions, CTR, position, and query data appear.
