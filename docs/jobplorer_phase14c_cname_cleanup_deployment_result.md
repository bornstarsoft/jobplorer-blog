# Jobplorer Phase 14C CNAME Cleanup Deployment Result

## Purpose

Phase 14C verifies the controlled push/deployment state for the Jobplorer CNAME cleanup.

The cleanup aligns the repo root `CNAME` with the production domain:

```text
jobplorer.com
```

This phase did not modify source files, content, posts, config, layouts, themes, public output, job-site pages, country guides, career guides, or Cloudflare settings.

## Pre-Push Verification

Repo guard:

- Working directory: `/Users/seongjinkim/BornStarSoft_Publishing/github_hugo/jobplorer-blog`
- Branch: `main`
- Phase 14B commit: `cef9cfb Clean up Jobplorer CNAME`
- `CNAME`: `jobplorer.com`
- `config.toml`: `baseURL = "https://jobplorer.com/"`

Remote freshness after `git fetch --all --prune`:

- Local `main` was ahead of `origin/main` by `0`.
- Local `main` was behind `origin/main` by `0`.
- Phase 14B was already present on `origin/main` before the controlled push command in this run.

Production build:

```text
hugo --gc --minify --destination /tmp/jobplorer-phase14c-build
```

Result: passed.

Path warning build:

```text
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase14c-pathwarnings
```

Result: passed with no duplicate target warnings.

Local Hugo build statistics:

- Pages: 1199
- Paginator pages: 21
- Static files: 2
- Aliases: 10

Local preservation checks:

- Published `/posts/` item URL count remained 258.
- LinkedIn generated locally.
- Indeed generated locally.
- Glassdoor generated locally.
- Software Developers generated locally.
- Game Developers generated locally.
- Remote Workers generated locally.
- South Korea generated locally.
- Canada generated locally.
- United States remained draft-only and did not generate in production output.

## Push Result

Controlled push:

```text
git push origin main
```

Result:

```text
Everything up-to-date
```

No force push was used.

## CNAME Cleanup Deployment Result

The Phase 14B CNAME cleanup commit is on `origin/main`.

The live routing checks after the controlled push command continued to show the expected Cloudflare Pages behavior:

- Apex domain is reachable.
- `www` redirects to apex.
- Pages.dev route is reachable.
- Sitemap and robots are reachable.

## Live Route Verification

Core routes checked with `curl -I`:

| Route | Result | Notes |
| --- | --- | --- |
| `https://jobplorer.com/` | HTTP 200 | Served by Cloudflare; `cf-cache-status: HIT`; `cache-control: public, max-age=0, must-revalidate`. |
| `https://www.jobplorer.com/` | HTTP 301 | Redirects to `https://jobplorer.com/`. |
| `https://jobplorer-blog.pages.dev/` | HTTP 200 | Pages.dev route remains reachable. |
| `https://jobplorer.com/sitemap.xml` | HTTP 200 | Sitemap reachable. |
| `https://jobplorer.com/robots.txt` | HTTP 200 | Robots file reachable. |

Sample reviewed route checks:

| Route | Result |
| --- | --- |
| `https://jobplorer.com/job-sites/sites/linkedin/` | HTTP 200 |
| `https://jobplorer.com/job-sites/sites/indeed/` | HTTP 200 |
| `https://jobplorer.com/job-sites/sites/glassdoor/` | HTTP 200 |
| `https://jobplorer.com/career-guides/software-developers/` | HTTP 200 |
| `https://jobplorer.com/career-guides/game-developers/` | HTTP 200 |
| `https://jobplorer.com/career-guides/remote-workers/` | HTTP 200 |
| `https://jobplorer.com/country-guides/south-korea/` | HTTP 200 |
| `https://jobplorer.com/country-guides/canada/` | HTTP 200 |
| `https://jobplorer.com/country-guides/united-states/` | HTTP 404 |

United States remains unpublished as expected.

## Sitemap Preservation

Downloaded live sitemap to:

```text
/tmp/jobplorer-phase14c/live-sitemap.xml
```

Sitemap checks:

- Unique published `/posts/<slug>/` URL count remains 258.
- The `/posts/` listing URL is also present and is not counted as an individual post item.
- LinkedIn URL is present.
- Indeed URL is present.
- Glassdoor URL is present.
- Software Developers URL is present.
- Game Developers URL is present.
- Remote Workers URL is present.
- South Korea URL is present.
- Canada URL is present.
- United States URL is absent.

## Remaining Risks

- Cloudflare HTML cache behavior remains an operational watch item after deployment checks.
- Future domain work should still verify Cloudflare Pages custom-domain settings before making DNS or dashboard changes.
- No Cloudflare dashboard settings were changed in this phase.

## Recommended Next Step

Continue with the next owner-approved content or verification phase.
