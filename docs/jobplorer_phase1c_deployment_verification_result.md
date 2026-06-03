# Jobplorer Phase 1C Deployment Verification Result

## Purpose

Phase 1C performed a controlled push and live deployment verification for the Phase 1A service MVP landing structure and Phase 1B trust/policy pages.

This phase did not change runtime source files, existing post article files, CNAME, layouts, themes, generated public files, or Cloudflare settings.

## Pre-push Verification Result

- Working directory: `/Users/seongjinkim/BornStarSoft_Publishing/github_hugo/jobplorer-blog`
- Branch: `main`
- Latest commit before push: `25c44c8 Add Jobplorer trust and policy pages`
- Starting branch state: local `main` was ahead of `origin/main` by 3 commits and behind 0.
- Phase 1B status: committed before push.
- Local Hugo version: `hugo v0.152.2+extended+withdeploy darwin/arm64`
- Pre-push build command: `hugo --gc --minify --destination /tmp/jobplorer-phase1c-prepush-build`
- Path warning command: `hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase1c-prepush-pathwarnings`
- Build result: passed.
- Path warning result: passed with no duplicate target warnings.
- Generated output summary: 1189 pages, 21 paginator pages, 2 static files, 9 aliases.
- Generated repo artifacts: `.hugo_build.lock` and `resources/` appeared during Hugo diagnostics and were removed before push.
- Working tree before push: clean.

## Push Result

- Remote freshness check: `git fetch --all --prune` completed; local `main` remained ahead 3 and behind 0.
- Push command: `git push origin main`
- Push result: succeeded.
- Pushed range: `3de8479..25c44c8 main -> main`
- Post-push branch state: `main` equals `origin/main`.
- No force push was used.

## Live Route Status

Checked after Cloudflare Pages automatic deployment.

| Route | Result | Notes |
|---|---:|---|
| `https://jobplorer.com/` | 200 | Apex route reachable; cached route showed Cloudflare HIT, cache-busted route showed fresh deploy. |
| `https://www.jobplorer.com/` | 301 | Redirects to `https://jobplorer.com/`. |
| `https://jobplorer.com/sitemap.xml` | 200 | Sitemap reachable. |
| `https://jobplorer.com/robots.txt` | 200 | Robots file reachable. |
| `https://jobplorer-blog.pages.dev/` | 200 | Pages.dev route reachable. |
| `https://jobplorer.com/?v=25c44c8` | 200 | Cache-busted homepage reachable. |
| `https://jobplorer.com/about/?v=25c44c8` | 200 | Cache-busted About route reachable. |
| `https://jobplorer.com/job-sites/?v=25c44c8` | 200 | Cache-busted Job Sites route reachable. |
| `https://jobplorer.com/sitemap.xml?v=25c44c8` | 200 | Cache-busted sitemap reachable. |

## New Route Verification Result

All Phase 1A and Phase 1B routes returned HTTP 200:

- `/job-sites/`
- `/job-sites/by-country/`
- `/job-sites/by-career/`
- `/country-guides/`
- `/career-guides/`
- `/remote-jobs/`
- `/job-seeker-tools/`
- `/guides/`
- `/posts/`
- `/about/`
- `/contact/`
- `/privacy/`
- `/terms/`

## Legacy `/posts/` Preservation Result

Sample legacy post URL checks all returned HTTP 200:

- Normal legacy post: `/posts/special-constructions-2026-recruitment/`
- Duplicate canonical URL: `/posts/youth-employment-crisis/`
- Stabilized malformed URL: `/posts/2025-07-06-jobs-200208/`

The `/posts/` route remains active as the legacy job news archive. No existing post article files were modified in Phase 1C.

## Sitemap Preservation Result

Downloaded live sitemap to `/tmp/jobplorer-phase1c/live-sitemap.xml`.

- Unique live `/posts/` URL count: 258.
- 8 stabilized malformed URLs present: yes, 8 of 8.
- 9 duplicate canonical URLs present: yes, 9 of 9.
- New service/trust routes present in sitemap: yes, 13 of 13 checked routes.

This confirms the Phase 1A/1B deployment preserved the expected legacy `/posts/` URL inventory.

## Live Content Snippet Result

Small live HTML checks confirmed the deployed Phase 1A/1B positioning:

- Homepage cache-busted HTML includes: `Explore Job Sites and Career Paths Around the World`.
- Homepage HTML describes Jobplorer as a global job information hub and states it does not provide live job listings, hiring guarantees, visa advice, legal advice, or labor advice.
- `/job-sites/` cache-busted HTML identifies the page as a cautious job site research starting point, not a live job board, and avoids rankings or ratings.
- `/about/` cache-busted HTML explains that Jobplorer is not a live job board, does not scrape real-time listings, preserves the legacy `/posts/` archive, and does not guarantee jobs, interviews, salary outcomes, visa eligibility, legal compliance, labor-law outcomes, or tax outcomes.

The non-cache-busted HTML routes may still be affected by the active Cloudflare HTML Cache rule during observation windows, so cache-busted checks were used to confirm the deployed content.

## CNAME Mismatch Note

The repository `CNAME` file still contains `www.bornstarai.com`, while Cloudflare Pages custom domains are active for `jobplorer.com`, `www.jobplorer.com`, and `jobplorer-blog.pages.dev`.

This phase intentionally did not change `CNAME` or Cloudflare settings. The mismatch remains a deployment-routing risk to review later with the site owner.

## HUGO_VERSION Note

Local verification used Hugo `0.152.2`, while Cloudflare Pages is configured with `HUGO_VERSION=0.128.0`.

The live deployment succeeded with Cloudflare's configured Hugo version. The version mismatch should remain documented because future theme/config changes may behave differently across versions.

## Remaining Risks

- CNAME is still mismatched in the repo.
- Cloudflare Pages `HUGO_VERSION=0.128.0` differs from local verification Hugo `0.152.2`.
- Active HTML Cache may delay visible updates on non-cache-busted routes.
- Old auto-news content quality still needs triage.
- Search Console should be monitored after deployment for indexing, coverage, and legacy URL behavior.

## Recommended Next Phase

Proceed to Phase 2: Job Site review model.

Phase 2 should define the review/front matter model, source requirements, cautious wording policy, and draft-first workflow before publishing any detailed job site review pages.
