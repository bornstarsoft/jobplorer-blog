# Jobplorer Phase 2E LinkedIn Deployment Verification Result

## Purpose

Phase 2E performed a controlled push and deployment verification for publishing the reviewed LinkedIn Job Site profile.

This phase published LinkedIn only. Indeed and Glassdoor remain unpublished drafts.

## Pre-push Verification Result

- Working directory: `/Users/seongjinkim/BornStarSoft_Publishing/github_hugo/jobplorer-blog`
- Branch: `main`
- Latest commit before push: `b20549a Publish LinkedIn job site profile`
- Starting branch state: local `main` was ahead of `origin/main` by 6 commits and behind 0.
- Local Hugo version: `hugo v0.152.2+extended+withdeploy darwin/arm64`
- Pre-push build command: `hugo --gc --minify --destination /tmp/jobplorer-phase2e-prepush-build`
- Path warning command: `hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase2e-prepush-pathwarnings`
- Build result: passed.
- Path warning result: passed with no duplicate target warnings.
- Production output generated `/job-sites/sites/linkedin/`.
- Production output did not generate `/job-sites/sites/indeed/` or `/job-sites/sites/glassdoor/`.
- Local production sitemap included LinkedIn and excluded Indeed/Glassdoor.
- Local production `/posts/` URL count: 258.
- Generated repo artifacts: `.hugo_build.lock` and `resources/` appeared during diagnostics and were removed before push.
- Working tree before push: clean.

## Push Result

- Remote freshness check: `git fetch --all --prune` completed.
- Local `main` remained ahead 6 and behind 0 after fetch.
- Push command: `git push origin main`
- Push result: succeeded.
- Pushed range: `25c44c8..b20549a main -> main`
- No force push was used.
- Post-push branch state: `main` equals `origin/main`.

## Live Route Status

Checked after Cloudflare Pages automatic deployment.

| Route | Result | Notes |
|---|---:|---|
| `https://jobplorer.com/` | 200 | Apex route reachable. |
| `https://www.jobplorer.com/` | 301 | Redirects to `https://jobplorer.com/`. |
| `https://jobplorer.com/sitemap.xml` | 200 | Sitemap reachable; non-cache-busted route may be cached. |
| `https://jobplorer.com/robots.txt` | 200 | Robots file reachable. |
| `https://jobplorer-blog.pages.dev/` | 200 | Pages.dev route reachable. |
| `https://jobplorer.com/?v=b20549a` | 200 | Cache-busted homepage reachable. |
| `https://jobplorer.com/job-sites/sites/linkedin/?v=b20549a` | 200 | Cache-busted LinkedIn route reachable. |
| `https://jobplorer.com/sitemap.xml?v=b20549a` | 200 | Cache-busted sitemap reachable. |

## LinkedIn Live Route Result

| Route | Result |
|---|---:|
| `https://jobplorer.com/job-sites/sites/` | 200 |
| `https://jobplorer.com/job-sites/sites/linkedin/` | 200 |

The LinkedIn profile is live.

## Indeed / Glassdoor Non-public Result

| Route | Result |
|---|---:|
| `https://jobplorer.com/job-sites/sites/indeed/` | 404 |
| `https://jobplorer.com/job-sites/sites/glassdoor/` | 404 |

Indeed and Glassdoor were not published.

## Sitemap Verification Result

Downloaded live sitemap to `/tmp/jobplorer-phase2e/live-sitemap.xml`.

- `https://jobplorer.com/job-sites/sites/linkedin/` present: yes.
- `https://jobplorer.com/job-sites/sites/indeed/` present: no.
- `https://jobplorer.com/job-sites/sites/glassdoor/` present: no.
- Unique live `/posts/` URL count: 258.
- 8 stabilized malformed URLs present: yes, 8 of 8.
- 9 duplicate canonical URLs present: yes, 9 of 9.

## Live Content Snippet Result

Live LinkedIn HTML confirms:

- LinkedIn profile content appears.
- Cautious wording appears, including "may be useful", current-details reminders, and no live job count claims.
- Official-source reminders appear.
- No fake ranking, fake rating, job guarantee, salary guarantee, affiliate, or partnership wording was found in the inspected snippet.

Editorial note:

- The live LinkedIn body still includes text saying `Draft note` and says the reviewed draft is unpublished. This should be cleaned up in a follow-up editorial phase because the page is now live. It was not changed during Phase 2E because this phase was limited to controlled push and deployment verification.

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
- The live LinkedIn page still contains draft/unpublished wording and should be cleaned up in a follow-up editorial pass.

## Recommended Next Phase

Phase 2F: commit this deployment report, then either:

- perform a small LinkedIn post-publish wording cleanup, or
- start official-source review for Indeed, or
- create the Country Guide model.
