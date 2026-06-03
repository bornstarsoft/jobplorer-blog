# Jobplorer Phase 2G LinkedIn Cleanup Deployment Result

## Purpose

Phase 2G performed a controlled push and deployment verification for the LinkedIn post-publish wording cleanup.

The cleanup removed public-facing draft/unpublished language from the live LinkedIn profile while keeping LinkedIn published and keeping Indeed/Glassdoor unpublished.

## Pre-push Verification Result

- Working directory: `/Users/seongjinkim/BornStarSoft_Publishing/github_hugo/jobplorer-blog`
- Branch: `main`
- Latest commit before push: `d496897 Clean up published LinkedIn profile wording`
- Starting branch state: local `main` was ahead of `origin/main` by 2 commits and behind 0.
- Local Hugo version: `hugo v0.152.2+extended+withdeploy darwin/arm64`
- Pre-push build command: `hugo --gc --minify --destination /tmp/jobplorer-phase2g-prepush-build`
- Path warning command: `hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase2g-prepush-pathwarnings`
- Build result: passed.
- Path warning result: passed with no duplicate target warnings.
- Production output generated `/job-sites/sites/linkedin/`.
- Production output did not generate `/job-sites/sites/indeed/` or `/job-sites/sites/glassdoor/`.
- Generated LinkedIn HTML had no `Draft note`, `unpublished`, `will not be published`, or `this draft` wording.
- Generated LinkedIn HTML included public-safe reviewed/caution wording.
- Generated repo artifacts: `.hugo_build.lock` and `resources/` appeared during diagnostics and were removed before push.
- Working tree before push: clean.

## Push Result

- Remote freshness check: `git fetch --all --prune` completed.
- Local `main` remained ahead 2 and behind 0 after fetch.
- Push command: `git push origin main`
- Push result: succeeded.
- Pushed range: `b20549a..d496897 main -> main`
- No force push was used.
- Post-push branch state: `main` equals `origin/main`.

## LinkedIn Live Content Verification

Live route checks:

- `https://jobplorer.com/job-sites/sites/linkedin/` returned HTTP 200.
- `https://jobplorer.com/job-sites/sites/linkedin/?v=d496897` returned HTTP 200.

Cache-busted HTML confirmed:

- LinkedIn profile content appears.
- Public-safe reviewed/caution wording appears.
- No visible `Draft note`.
- No visible `unpublished`.
- No visible `will not be published`.
- No visible `this draft`.
- No ranking, rating, guarantee, affiliate, or partnership wording was found in the inspected content.

The non-cache-busted LinkedIn route may continue to be served from Cloudflare cache during normal observation windows, so cache-busted verification was used for deployment confirmation.

## Indeed / Glassdoor Non-public Result

| Route | Result |
|---|---:|
| `https://jobplorer.com/job-sites/sites/indeed/` | 404 |
| `https://jobplorer.com/job-sites/sites/glassdoor/` | 404 |

Indeed and Glassdoor remain unpublished.

## Sitemap Verification Result

Downloaded live sitemap to `/tmp/jobplorer-phase2g/live-sitemap.xml`.

- `https://jobplorer.com/job-sites/sites/linkedin/` present: yes.
- `https://jobplorer.com/job-sites/sites/indeed/` present: no.
- `https://jobplorer.com/job-sites/sites/glassdoor/` present: no.
- Unique live `/posts/` URL count: 258.
- 8 stabilized malformed URLs present: yes, 8 of 8.
- 9 duplicate canonical URLs present: yes, 9 of 9.

## Legacy `/posts/` Preservation Result

Sample legacy post URL checks all returned HTTP 200:

- Normal legacy post: `/posts/special-constructions-2026-recruitment/`
- Duplicate canonical URL: `/posts/youth-employment-crisis/`
- Stabilized malformed URL: `/posts/2025-07-06-jobs-200208/`

The live sitemap still contains 258 unique `/posts/` URLs.

## CNAME Mismatch Note

The repository `CNAME` file still contains `www.bornstarai.com`, while Cloudflare Pages custom domains are active for `jobplorer.com`, `www.jobplorer.com`, and `jobplorer-blog.pages.dev`.

This phase intentionally did not change `CNAME` or Cloudflare settings.

## HUGO_VERSION Note

Local verification used Hugo `0.152.2`, while Cloudflare Pages is configured with `HUGO_VERSION=0.128.0`.

The live deployment succeeded with Cloudflare's configured Hugo version. The mismatch should remain documented for future build/config work.

## Remaining Risks

- Search Console should be monitored after deployment.
- Old auto-news content quality still needs triage.
- Indeed and Glassdoor remain draft.
- CNAME is still mismatched in the repo.
- Active Cloudflare HTML cache may delay non-cache-busted visible updates.

## Recommended Next Phase

Phase 2H: commit this deployment report, then either:

- perform official-source review for Indeed, or
- create the Country Guide model.
