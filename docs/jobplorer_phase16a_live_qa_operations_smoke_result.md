# Jobplorer Phase 16A Live QA Operations Smoke Result

## Purpose

Phase 16A performs a full live QA and operations smoke check after the major Jobplorer renewal.

This phase is docs-only. It does not modify content, posts, config, CNAME, layouts, themes, generated public output, job-site pages, country guides, or career guides.

## Local Build Result

Production build:

```text
hugo --gc --minify --destination /tmp/jobplorer-phase16a-build
```

Result: passed.

Path warning build:

```text
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase16a-pathwarnings
```

Result: passed with no duplicate target warnings.

Local build statistics:

- Pages: 1199
- Paginator pages: 21
- Static files: 2
- Aliases: 10

Local sitemap check:

- Unique published `/posts/` URL count remains 258.

## Live Route Result

Live route smoke checks with `curl -I`:

| Route | Result | Notes |
| --- | --- | --- |
| `https://jobplorer.com/` | HTTP 200 | Apex route reachable; Cloudflare cache HIT observed. |
| `https://www.jobplorer.com/` | HTTP 301 | Redirects to `https://jobplorer.com/`. |
| `https://jobplorer.com/sitemap.xml` | HTTP 200 | Sitemap reachable. |
| `https://jobplorer.com/robots.txt` | HTTP 200 | Robots file reachable. |
| `https://jobplorer.com/job-sites/` | HTTP 200 | Job Sites hub reachable. |
| `https://jobplorer.com/job-sites/sites/` | HTTP 200 | Job site profiles index reachable. |
| `https://jobplorer.com/career-guides/` | HTTP 200 | Career Guides hub reachable. |
| `https://jobplorer.com/country-guides/` | HTTP 200 | Country Guides hub reachable. |
| `https://jobplorer.com/job-seeker-tools/` | HTTP 200 | Job Seeker Tools page reachable. |
| `https://jobplorer.com/posts/` | HTTP 200 | Legacy archive reachable. |

## Reviewed Page Result

Reviewed live pages checked with `curl -I`:

| Page | Result |
| --- | --- |
| LinkedIn | HTTP 200 |
| Indeed | HTTP 200 |
| Glassdoor | HTTP 200 |
| Software Developers | HTTP 200 |
| Game Developers | HTTP 200 |
| Remote Workers | HTTP 200 |
| South Korea | HTTP 200 |
| Canada | HTTP 200 |

## Draft-Only Route Result

Draft-only route checked:

| Page | Result | Expected |
| --- | --- | --- |
| United States country guide | HTTP 404 | Not publicly visible |

No draft-only country guide route was observed as public during this smoke check.

## Sitemap Result

Downloaded live sitemap to:

```text
/tmp/jobplorer-phase16a/live-sitemap.xml
```

Sitemap checks:

- Unique published `/posts/` URL count remains 258.
- LinkedIn URL is present.
- Indeed URL is present.
- Glassdoor URL is present.
- Software Developers URL is present.
- Game Developers URL is present.
- Remote Workers URL is present.
- South Korea URL is present.
- Canada URL is present.
- United States URL is absent.

## Homepage Rendering Result

Fetched the live homepage body from:

```text
https://jobplorer.com/
```

The homepage shows service-hub content, including:

- Start Here
- Reviewed Job Site Profiles
- LinkedIn
- Indeed
- Glassdoor
- Featured Career Guides
- Software Developer Job Search
- Game Developer Job Search
- Practical Job Search Guides
- Secondary Archive
- Legacy Job News Archive

The homepage did not show the auto-rendered Ananke recent-post card feed after the main service-hub content. The legacy archive remains linked as a secondary archive instead of dominating the homepage.

## Remaining Risks

- Search Console data for the four rewritten legacy posts is still missing.
- United States manual verification is still missing for blocked USAJOBS and CareerOneStop sources.
- Old auto-news quality triage remains pending for the broader `/posts/` archive.
- Cloudflare HTML cache behavior can delay visible updates or preserve stale query-string variants.

## Recommended Next Step

Recommended next step:

1. Fill Search Console data for the four rewritten legacy posts.
2. Or complete U.S. manual verification using the Phase 15B owner checklist.
3. Or start the next controlled legacy triage only after Search Console data review.
