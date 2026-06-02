# Jobplorer Phase 0F-F Cloudflare Pages Verification Report

## Purpose

Phase 0F-F documents the local build state, local deployment configuration clues, live route behavior, CNAME mismatch risk, and the manual Cloudflare Pages checks required before pushing or starting Phase 1 MVP work.

This is a documentation-only phase. No runtime files, content files, config, CNAME, layouts, themes, generated output, deployment settings, or MVP pages were changed.

## Local Build Status

Local Hugo version:

```text
hugo v0.152.2+extended+withdeploy darwin/arm64 BuildDate=2025-10-24T15:31:49Z VendorInfo=brew
```

Build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase0f-f-build
```

Result: passed.

Build summary:

- Pages: 1169
- Paginator pages: 21
- Static files: 2
- Aliases: 1

Path-warning command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase0f-f-pathwarnings
```

Result: passed with no duplicate target warnings.

Generated local files:

- `/tmp/jobplorer-phase0f-f-build/sitemap.xml`: exists
- `/tmp/jobplorer-phase0f-f-build/robots.txt`: exists

Local `robots.txt` content:

```text
User-agent: *
Allow: /
Sitemap: https://jobplorer.com/sitemap.xml
```

## Local Deployment Config Inspection

Hugo config values in `config.toml`:

| Setting | Value |
| --- | --- |
| `baseURL` | `https://jobplorer.com/` |
| `title` | `Jobplorer` |
| `theme` | `ananke` |
| `languageCode` | `en-us` |
| `enableRobotsTXT` | `true` |
| `pagination.pagerSize` | `12` |
| `params.mainSections` | `["posts"]` |

Repository deployment clues:

| Item | Finding |
| --- | --- |
| `CNAME` | Exists and contains `www.bornstarai.com`, which does not match `jobplorer.com`. |
| `README.md` | Says this is a Hugo static blog powered by Cloudflare Pages with the Ananke theme. |
| `_headers` | Not found locally. |
| `_redirects` | Not found locally. |
| `wrangler.toml` | Not found locally. |
| Cloudflare config files | None found locally. |
| GitHub Actions workflows | None found locally. |
| `public/` tracked | No tracked `public/` files found. |
| `public/` present | No `public/` directory in the working tree after diagnostics. |
| Ignore file | A tracked file named `gitignore` contains `/public/` and `/resources/`, but no tracked `.gitignore` was found. Generated `resources/` appeared as untracked during builds and was removed. |

Important local inference:

- Cloudflare Pages is likely configured through the Cloudflare dashboard, not through repo-local workflow or Wrangler files.
- The root `CNAME` file may be ignored by Cloudflare Pages if the build output directory is Hugo `public/`, but this cannot be verified locally.

## Live Route Status

Read-only live checks on June 2, 2026:

| Route | Result | Notes |
| --- | --- | --- |
| `https://jobplorer.com/` | HTTP 200 | Cloudflare-fronted; `server: cloudflare`; `cf-cache-status: HIT`; `cache-control: public, max-age=0, must-revalidate`. |
| `https://www.jobplorer.com/` | HTTP 301 | Redirects to `https://jobplorer.com/`. |
| `https://jobplorer.com/sitemap.xml` | HTTP 200 | `content-type: application/xml`; `server: cloudflare`; `cf-cache-status: HIT`; content length reported as `90169`. |
| `https://jobplorer.com/robots.txt` | HTTP 200 | `content-type: text/plain`; `server: cloudflare`; body allows all and points to `https://jobplorer.com/sitemap.xml`. |

Live appears to be Cloudflare-fronted based on:

- `server: cloudflare`
- `cf-cache-status`
- `cf-ray`
- Cloudflare `report-to` / `nel` headers

Live HTML generator version:

- Not re-detected in this Phase 0F-F run because `curl -Ls https://jobplorer.com/ | head -120` returned no body bytes in this shell, even though `curl -I` returned HTTP 200.
- Earlier Phase 0 findings recorded the live homepage as reporting Hugo 0.128.0. Treat that as historical until manually reverified in Cloudflare Pages or by browser/source inspection.

## Sample URL Status

Sample `curl -I` checks:

| Sample type | URL | Status |
| --- | --- | --- |
| Normal recent post | `https://jobplorer.com/posts/special-constructions-2026-recruitment/` | HTTP 200 |
| Duplicate canonical URL from Phase 0F-D-B | `https://jobplorer.com/posts/youth-employment-crisis/` | HTTP 200 |
| Stabilized malformed URL from Phase 0F-C-B | `https://jobplorer.com/posts/2025-07-06-jobs-200208/` | HTTP 200 |
| Additional sitemap-listed post URL | `https://jobplorer.com/posts/google-embraces-ai-in-developer-interviews/` | HTTP 200 |

Note: Phase 0F-C-B local metadata stabilization will not be visible on the live site until the local commits are pushed and deployed.

## CNAME Mismatch Analysis

Current mismatch:

- `config.toml` and live routes use `https://jobplorer.com/`.
- The root `CNAME` file contains `www.bornstarai.com`.

Risk:

- If Cloudflare Pages ignores the root `CNAME` file and relies only on dashboard custom domains, the mismatch may be harmless for current deployment.
- If any deployment path copies or honors root `CNAME`, it could point at the wrong brand/domain.
- Because no Cloudflare dashboard settings are locally visible, changing `CNAME` should be delayed until the owner confirms how Cloudflare Pages is configured.

Recommendation:

- Do not change `CNAME` before dashboard verification.
- In Cloudflare Pages, confirm whether the file is ignored, harmless, or should be corrected in a separate reviewed phase.

## Hugo Version Mismatch Analysis

Known state:

- Local Hugo 0.152.2 builds cleanly after Phase 0F-B, 0F-D-B, and 0F-C-B.
- Earlier live HTML was reported as Hugo 0.128.0, but this Phase 0F-F run could not re-detect the live generator from HTML.

Risk:

- If Cloudflare Pages still builds with Hugo 0.128.0, current local changes are likely compatible because the site also builds with 0.152.2.
- Hugo version mismatch still matters for reproducibility. A future Hugo release could introduce new behavior, and an older Cloudflare build could hide local compatibility assumptions.

Recommendation:

- Pin or explicitly set a known Hugo version in Cloudflare Pages after manual verification.
- Prefer confirming the current `HUGO_VERSION` environment variable and latest deployment logs before pushing.

## Cloudflare Pages Manual Dashboard Checklist

Owner should verify:

- Pages project name.
- Connected GitHub repo: should be `bornstarsoft/jobplorer-blog`.
- Production branch.
- Build command.
- Build output directory, expected to be `public` for Hugo unless configured otherwise.
- Root directory.
- Hugo version or `HUGO_VERSION` environment variable.
- Node version, if any.
- Latest deployment commit hash.
- Latest deployment status.
- Custom domains.
- Whether both `jobplorer.com` and `www.jobplorer.com` are attached.
- Whether `www.jobplorer.com` intentionally redirects to `jobplorer.com`.
- Whether the root `CNAME` file is ignored by Cloudflare Pages.
- Whether `CNAME = www.bornstarai.com` is harmless, ignored, or must be corrected later.
- Whether old deployments or cached assets are serving any routes.
- Whether a Cloudflare cache purge is needed after a future push.

## Recommended Push and Deploy Validation Plan

Before pushing:

1. Confirm Cloudflare Pages project, repo, branch, build command, output directory, and Hugo version.
2. Confirm `CNAME` handling and custom domain ownership in Cloudflare.
3. Confirm Search Console or analytics does not raise an immediate concern for the 8 stabilized malformed URLs.
4. Run local Hugo build and path-warning build one final time.

Controlled push/deploy validation:

1. Push local `main` only after owner approval.
2. Watch the Cloudflare Pages deployment for the exact pushed commit hash.
3. Confirm build succeeds in Cloudflare.
4. Check `https://jobplorer.com/`, `/sitemap.xml`, `/robots.txt`, one normal post, one duplicate canonical URL, and one stabilized malformed URL.
5. Confirm duplicate target warnings do not reappear in deployment logs.
6. Compare sitemap post URL count before and after deploy.
7. Purge Cloudflare cache only if stale routes remain and owner approves.

## What Not To Change Yet

- Do not modify Cloudflare Pages settings without owner action.
- Do not push yet.
- Do not change `CNAME` yet.
- Do not edit `config.toml`, content, layouts, themes, or generated output.
- Do not start MVP pages until deployment assumptions are verified or the owner explicitly chooses to delay deployment verification.

## Recommended Next Phase

Recommended next phase: Phase 0G controlled push and deployment verification.

Alternative: if the owner chooses to delay push/deploy verification, Phase 1A MVP structure planning can begin as docs-only planning, but runtime MVP changes should wait until deployment settings and domain behavior are confirmed.
