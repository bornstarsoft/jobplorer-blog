# Jobplorer Phase 0G Deployment Verification Result

## Purpose

Phase 0G performed a controlled push of the Phase 0 documentation and compatibility commits to `origin/main`, then verified the live Cloudflare Pages routes and sitemap preservation.

No Cloudflare settings, repo runtime files, CNAME, content, layouts, themes, generated files, or MVP pages were changed in this phase.

## Pre-Push Verification Result

Repo guard before push:

- Branch: `main`
- Latest local commit before push: `3de84797d354cc1a70c2f1db23fdc56b96dd7a56`
- Latest local commit message: `Document Jobplorer Cloudflare Pages verification`
- Phase 0F-F report was committed.
- Local `main` was ahead of `origin/main` by 11 and behind 0 before push.
- Worktree was clean before push.

Remote freshness check:

- `git fetch --all --prune` completed.
- `git status -sb` showed `main...origin/main [ahead 11]`.
- `git rev-list --left-right --count main...origin/main` showed `11 0`.
- `origin/main` had not changed, so no merge or rebase was needed.

Local Hugo version:

```text
hugo v0.152.2+extended+withdeploy darwin/arm64 BuildDate=2025-10-24T15:31:49Z VendorInfo=brew
```

Pre-push build:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase0g-prepush-build
```

Result: passed.

Pre-push build summary:

- Pages: 1169
- Paginator pages: 21
- Static files: 2
- Aliases: 1

Pre-push path-warning build:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase0g-prepush-pathwarnings
```

Result: passed with no duplicate target warnings.

Generated repo artifacts:

- Hugo created `.hugo_build.lock` and `resources/` during diagnostics.
- Only those generated artifacts were removed.
- Worktree was clean before push.

## Push Result

Push command:

```sh
git push origin main
```

Result: succeeded.

Push output:

```text
To github.com:bornstarsoft/jobplorer-blog.git
   188ab2e..3de8479  main -> main
```

After push:

- `main` and `origin/main` are equal.
- `git rev-list --left-right --count main...origin/main` shows `0 0`.
- `origin/main` is now `3de84797d354cc1a70c2f1db23fdc56b96dd7a56`.

## Cloudflare Pages Deployment Observations

Verified Cloudflare Pages settings from owner:

- Project: `jobplorer-blog`
- Connected repo: `bornstarsoft/jobplorer-blog`
- Production branch: `main`
- Automatic deployments: enabled
- Build command: `hugo`
- Build output: `public`
- Root directory: blank/default
- Build system: Version 2
- Build cache: disabled
- Environment variables:
  - `HUGO_ENV=production`
  - `HUGO_EXTENDED=true`
  - `HUGO_VERSION=0.128.0`
- Custom domains:
  - `jobplorer.com` active
  - `www.jobplorer.com` active
  - `jobplorer-blog.pages.dev` active
- Cloudflare rules:
  - `www.jobplorer.com` redirects to `jobplorer.com`
  - HTML Cache rule is active
  - Static assets 30d cache rule is active

Live route behavior after push suggests Cloudflare Pages deployed or was serving refreshed assets for at least some routes:

- `https://jobplorer.com/sitemap.xml` returned a new `content-length` of `92689` on `HEAD`.
- Cache-busted `https://jobplorer.com/sitemap.xml?v=3de8479` also returned `content-length: 92689`.
- Some HTML routes still showed cache hits or older `last-modified` values, consistent with the active HTML Cache rule.

## Live Route Status

| Route | Status | Notes |
| --- | --- | --- |
| `https://jobplorer.com/` | HTTP 200 | Cloudflare-fronted. Response was cache HIT with older `last-modified`, consistent with active HTML Cache. |
| `https://www.jobplorer.com/` | HTTP 301 | Redirects to `https://jobplorer.com/`. |
| `https://jobplorer.com/sitemap.xml` | HTTP 200 | `content-type: application/xml`; `content-length: 92689`; cache MISS in the checked edge. |
| `https://jobplorer.com/robots.txt` | HTTP 200 | `content-type: text/plain`; `content-length: 66`; cache MISS in the checked edge. |
| `https://jobplorer-blog.pages.dev/` | HTTP 200 | Cloudflare Pages preview/default domain reachable. |

## Cache-Busted Route Status

| Route | Status | Notes |
| --- | --- | --- |
| `https://jobplorer.com/?v=3de8479` | HTTP 200 | Cache-busted root returned `last-modified: Tue, 02 Jun 2026 12:42:41 GMT` and cache MISS. |
| `https://jobplorer.com/sitemap.xml?v=3de8479` | HTTP 200 | `content-length: 92689`; cache MISS. |

## Sample URL Status

| Sample type | URL | Status | Notes |
| --- | --- | --- | --- |
| Normal post URL | `https://jobplorer.com/posts/special-constructions-2026-recruitment/` | HTTP 200 | Cache expired and refreshed during check. |
| Duplicate canonical URL | `https://jobplorer.com/posts/youth-employment-crisis/` | HTTP 200 | Still live; served from cache during check. |
| Stabilized malformed URL | `https://jobplorer.com/posts/2025-07-06-jobs-200208/` | HTTP 200 | Still live; served from cache during check. |
| Current sitemap-listed post URL | `https://jobplorer.com/posts/google-embraces-ai-in-developer-interviews/` | HTTP 200 | Still live; served from cache during check. |

## Sitemap Preservation Result

Live sitemap files downloaded to `/tmp/jobplorer-phase0g/` only:

- `/tmp/jobplorer-phase0g/live-sitemap.xml`
- `/tmp/jobplorer-phase0g/live-sitemap-cachebusted.xml`

Sitemap count results:

| Sitemap file | Bytes | Unique `/posts/` URLs | 8 stabilized malformed URLs present | 9 duplicate canonical URLs present |
| --- | ---: | ---: | --- | --- |
| `live-sitemap.xml` | 90169 | 258 | yes | yes |
| `live-sitemap-cachebusted.xml` | 92689 | 258 | yes | yes |

The byte difference appears to reflect Cloudflare edge/cache variation after deployment. Both sitemap bodies preserved the expected `258` unique `/posts/` URLs and included all required legacy URLs.

Stabilized malformed URLs confirmed present:

- `/posts/2025-07-06-jobs-200208/`
- `/posts/2025-08-03-jobs-215626/`
- `/posts/2025-08-17-jobs-223347/`
- `/posts/2025-11-18-jobs-210416/`
- `/posts/2025-12-24-jobs-235358/`
- `/posts/2026-03-09-jobs-195244/`
- `/posts/2026-03-28-jobs-210307/`
- `/posts/2026-05-05-jobs-221528/`

Duplicate canonical URLs confirmed present:

- `/posts/2025-job-market-trends/`
- `/posts/corporate-responsibility-in-disability-employment/`
- `/posts/disability-employment-public-institutions/`
- `/posts/empowering-youth-employment/`
- `/posts/the-power-of-brain-training-through-mobile-games/`
- `/posts/youth-employment-challenges/`
- `/posts/youth-employment-chungbuk/`
- `/posts/youth-employment-crisis/`
- `/posts/youth-employment-support-initiatives/`

## CNAME Mismatch Note

The repo still contains:

```text
CNAME = www.bornstarai.com
```

This phase intentionally did not change `CNAME`.

Current Cloudflare custom domains are active for:

- `jobplorer.com`
- `www.jobplorer.com`
- `jobplorer-blog.pages.dev`

Because Cloudflare Pages builds Hugo output to `public`, the root `CNAME` file may be ignored unless copied into the output. Still, it remains a repo-level mismatch and should be corrected only in a separate reviewed phase after confirming Cloudflare behavior.

## HUGO_VERSION Note

Cloudflare Pages is configured with:

```text
HUGO_VERSION=0.128.0
```

Local verification used:

```text
Hugo 0.152.2
```

The local build passes on Hugo 0.152.2, and the Cloudflare deployment checks after push returned healthy live routes. The version mismatch remains a reproducibility risk and should be resolved later by pinning/confirming the intended Hugo version across local and Cloudflare builds.

## Remaining Risks

- `CNAME` is still mismatched in the repo.
- Cloudflare `HUGO_VERSION=0.128.0` differs from local Hugo 0.152.2.
- HTML Cache may delay visible updates or cause edge-to-edge response differences.
- Old auto-news content quality still needs triage before MVP launch.
- Search Console should be monitored after the deployment for indexing, duplicate, empty-page, or soft-404 signals.

## Recommended Next Phase

Recommended next phase: Phase 1A Jobplorer service MVP structure planning.

Before publishing MVP pages, keep URL preservation rules in force:

- Preserve `/posts/` as the legacy blog route.
- Avoid deleting legacy URLs without Search Console review.
- Avoid changing `CNAME` or Cloudflare settings without a separate reviewed deployment phase.
