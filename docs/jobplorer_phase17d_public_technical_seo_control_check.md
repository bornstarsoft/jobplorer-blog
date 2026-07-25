# Jobplorer Phase 17D Public Technical SEO Control Check

## Purpose

Phase 17D verifies that Jobplorer's public technical SEO controls remain healthy while Google Search Console Performance data collection is blocked by browser authentication.

This phase is read-only for the site. It does not modify content, posts, config, CNAME, layouts, themes, generated output, job-site pages, country guides, or career guides.

## Repository State

- Branch: `main`
- Phase 17C commit: `23a4c61 Plan Jobplorer next analytics priorities`
- Git remote: `git@github.com:bornstarsoft/jobplorer-blog.git`
- The owner confirmed that GitHub is the correct remote for this project.
- Working tree was clean before this report was created.

## Search Console Access Status

The Search Console Performance page for the `jobplorer.com` domain property was opened through the available Codex browser.

The browser is not signed in to Google and no Search Console connector is available. Therefore, private clicks, impressions, CTR, average position, and query data could not be collected in this phase.

No account, permission, property, or Search Console setting was changed.

Owner action still required:

1. Sign in to the Google account that has access to the `jobplorer.com` Search Console property.
2. Open `Performance` > `Search results`.
3. Select `Last 28 days`.
4. Fill the exact-URL rows in `docs/jobplorer_phase16j_search_console_performance_tracking_sheet.md`.
5. Resume Phase 16M interpretation after the values are available.

## Local Build Result

Commands checked:

```text
hugo --gc --minify --destination /tmp/jobplorer-phase17d-build
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase17d-pathwarnings
```

Results:

- Standard production build: passed
- Path-warning build: passed
- Duplicate/path warnings: none observed
- Hugo version used locally: `v0.152.2+extended+withdeploy`
- Generated pages: 1,199
- Unique published `/posts/` URLs: 258

## Local Route Preservation

Generated in the production build:

- Homepage
- LinkedIn
- Indeed
- Glassdoor
- Software Developers
- Game Developers
- Remote Workers
- South Korea
- Canada

Not generated:

- United States country guide

The United States guide remains draft-only as intended.

## Live Route Result

The following live URLs returned HTTP 200:

- `https://jobplorer.com/`
- `https://jobplorer.com/job-sites/sites/linkedin/`
- `https://jobplorer.com/job-sites/sites/indeed/`
- `https://jobplorer.com/job-sites/sites/glassdoor/`
- `https://jobplorer.com/career-guides/software-developers/`
- `https://jobplorer.com/career-guides/game-developers/`
- `https://jobplorer.com/career-guides/remote-workers/`
- `https://jobplorer.com/country-guides/south-korea/`
- `https://jobplorer.com/country-guides/canada/`
- The four rewritten legacy post URLs
- `https://jobplorer.com/robots.txt`
- `https://jobplorer.com/sitemap.xml`

Observed HTML cache headers on the checked pages:

- `cache-control: public, max-age=0, must-revalidate`
- `cf-cache-status: DYNAMIC`

The robots response used a longer cache window and was successfully available.

## Canonical And Indexing Controls

For the homepage and all 12 tracked detail pages:

- The canonical URL matched the expected clean `https://jobplorer.com/` URL.
- The robots directive was `index, follow`.
- No `noindex` directive was found.
- A non-empty page title was present.

No public technical signal currently justifies changing URLs, slugs, canonicals, robots directives, redirects, or sitemap behavior.

## Homepage Rendering Result

The cache-busted live homepage and local generated homepage both contained:

- Reviewed Job Site Profiles
- Featured Career Guides
- Software Developers link
- Game Developers link
- Legacy Job News Archive

The Ananke recent-post `More` section was not present.

A generic web extraction surface initially returned stale pre-renewal homepage text. Direct cache-busted HTTPS retrieval returned the current service-hub homepage. This is treated as an extractor/cache artifact rather than a confirmed live-site regression.

## Robots And Sitemap Result

Live robots policy:

```text
User-agent: *
Allow: /
Sitemap: https://jobplorer.com/sitemap.xml
```

Live sitemap checks:

- Unique `/posts/` URL count: 258
- LinkedIn: present
- Indeed: present
- Glassdoor: present
- Software Developers: present
- Game Developers: present
- Remote Workers: present
- South Korea: present
- Canada: present
- United States: absent

## Decision

- Keep the current site source unchanged.
- Do not change URLs, slugs, canonicals, robots directives, sitemap behavior, titles, or metadata from this control check.
- Do not start performance optimization from the Phase 17B LCP P99 sample alone.
- Do not expand legacy rewrites before Search Console Performance data is reviewed.
- Keep the United States guide unpublished.

## Recommended Next Step

Primary:

- Sign in to Search Console, fill the Phase 16J Last 28 days data, and run Phase 16M interpretation.

Fallback while waiting:

- Add another comparable 7-day Cloudflare Analytics sample and evaluate whether LCP P99 remains elevated.
