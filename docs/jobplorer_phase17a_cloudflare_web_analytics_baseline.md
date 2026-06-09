# Jobplorer Phase 17A Cloudflare Web Analytics Baseline

## Purpose

Phase 17A records the owner-provided Cloudflare Web Analytics 7-day baseline for Jobplorer after the major renewal, indexing work, and CNAME cleanup.

This phase is docs-only. It does not modify content, posts, config, CNAME, layouts, themes, generated output, job-site pages, country guides, or career guides.

## Data Range

- Source: Cloudflare Web Analytics
- Site: `jobplorer.com`
- Date range: Last 7 days
- Bot traffic excluded: yes

## Traffic Baseline

Owner-provided baseline:

- Visits: about 1.01k
- Page views: about 1.13k
- Page load time: about 323ms

Interpretation:

The site is receiving measurable human traffic after renewal. Page views are modestly higher than visits, which suggests some sessions include more than one page view, though deeper engagement should be reviewed with page-level data over time.

## Core Web Vitals Baseline

Owner-provided Core Web Vitals:

| Metric | Good | Needs Improvement | Poor |
| --- | ---: | ---: | ---: |
| LCP | 99% | 0% | 1% |
| INP | 100% | 0% | 0% |
| CLS | 100% | 0% | 0% |

LCP percentiles:

- P50: 272ms
- P75: 535ms
- P90: 1,016ms
- P99: 7,832ms

## Page Performance Interpretation

Current performance is healthy.

No urgent speed optimization is needed based on this 7-day Cloudflare baseline.

The LCP P50, P75, and P90 values are strong. The LCP P99 outlier should be monitored, but it should not be treated as a blocker unless poor-LCP share increases or the outlier pattern becomes persistent across important pages.

INP and CLS are currently excellent.

## Top URL Group Observations

Top visible URL groups include:

- `/`
- `/job-sites/`
- `/job-sites/sites/`
- `/country-guides/`
- `/job-seeker-tools/`

Interpretation:

The homepage and service-hub routes are visible in Cloudflare traffic. This is directionally consistent with the renewal goal of making Jobplorer feel like a service hub rather than a news-first blog.

Future weekly reviews should confirm whether profile and guide pages, not only hub pages, begin receiving page-level traffic.

## What Is Healthy

- Jobplorer is receiving measurable traffic.
- Page load time is low.
- LCP is overwhelmingly good.
- INP is 100% good.
- CLS is 100% good.
- Top URL groups include important service-hub routes.
- No immediate performance remediation is indicated.

## What Should Be Monitored

- LCP P99 outliers.
- Weekly traffic trend for homepage and service hubs.
- Whether individual Job Site Profiles receive traffic.
- Whether Career Guides receive traffic.
- Whether Country Guides receive traffic.
- Whether rewritten legacy posts receive traffic after Search Console Performance data appears.
- Any divergence between Cloudflare traffic and Search Console impressions/clicks.

## What Should Not Be Changed Yet

- Do not optimize performance unless LCP, INP, or CLS worsens.
- Do not rewrite more legacy posts until Search Console Performance data appears.
- Do not change URLs, slugs, canonicals, noindex, sitemap behavior, or redirects from Cloudflare traffic alone.
- Do not change titles or metadata from aggregate Cloudflare data alone.
- Do not treat LCP P99 outliers as a blocker unless repeated evidence shows a meaningful user-facing issue.

## Recommended Next Steps

A. Wait for Search Console Performance data.

B. Monitor Cloudflare page-level traffic weekly.

C. Track whether Job Sites, Career Guides, and Country Guides receive traffic.

D. Do not optimize performance unless LCP, INP, or CLS worsens.

E. Do not rewrite more legacy posts until Search Console Performance data appears.
