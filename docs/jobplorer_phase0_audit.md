# Jobplorer Phase 0A Audit

## Project Purpose

Jobplorer.com is being renewed from an automated Korean job news summary blog into a long-term global job information hub focused on job sites, country guides, career guides, and job seeker tools.

The renewed product should help readers explore job sites, hiring ecosystems, and career paths around the world. It is not a live job scraping board and should not promise job outcomes, legal certainty, visa eligibility, or official partnerships.

## Current Repo Identity

- Repository: `bornstarsoft/jobplorer-blog`
- Local path: `/Users/seongjinkim/BornStarSoft_Publishing/github_hugo/jobplorer-blog`
- Remote: `git@github.com:bornstarsoft/jobplorer-blog.git`
- Branch audited: `main`
- Latest audited commit: `e01170672b3c1ab483e9ff425d1893e895f4e0d9 Add GA4 gtag to Jobplorer`
- Phase 0A working tree result: clean after removing only temporary Hugo-generated audit artifacts

## Current Hugo Structure Summary

- Static site generator: Hugo
- Theme: Ananke, vendored under `themes/ananke`
- Main config file: `config.toml`
- Main content section: `content/posts`
- Custom layout override: `layouts/partials/head-additions.html`
- Analytics: GA4 script exists in `layouts/partials/head-additions.html`
- Robots: `enableRobotsTXT = true`
- Sitemap: no custom sitemap configuration found; Hugo default behavior is inferred

Important configuration notes:

- `baseURL` is `https://jobplorer.com/`
- `title` is `Jobplorer`
- `languageCode` is `en-us`
- `theme` is `ananke`
- `paginate = 12` is present and is incompatible with newer Hugo versions such as local Hugo `0.152.2`
- `buildFuture = false`

## Existing Content Summary

- Markdown files under `content/`: 162
- Markdown files under `content/posts/`: 162
- Files with explicit `slug`: 157
- Local inferred unique `/posts/` URLs: 156
- Malformed or no-front-matter post files: 5
- Duplicate slug or duplicate target groups: 6
- No `draft`, `url`, `aliases`, `noindex`, `robots`, `canonical`, `canonicalUrl`, or `categories` fields were found in post front matter during Phase 0A.

Content pattern observed:

- Many posts are automated news summaries.
- Some posts are thin, duplicated, or off-position for the renewed product direction.
- Some posts can be reworked into evergreen job site, country guide, career guide, or job seeker tool content.
- Some posts are unrelated to the target positioning and should be reviewed later as archive or removal candidates, not deleted now.

## Build Status Summary

Local Hugo version:

- `hugo v0.152.2+extended+withdeploy`

Phase 0A build result:

- Local build failed.
- Failure cause 1: `paginate` is deprecated/removed in local Hugo and should become `pagination.pagerSize` in a later build-compatibility phase.
- Failure cause 2: 28 posts have Korean-formatted date strings such as `2023년 10월 27일`, which local Hugo `0.152.2` does not parse.
- Warning: 6 duplicate target paths were reported with `--printPathWarnings`.

Live site note:

- The live homepage reports `Hugo 0.128.0`, which explains why the deployed site can exist while local Hugo `0.152.2` fails.

## Live Route Summary

Phase 0A live checks found:

- `https://jobplorer.com/`: HTTP 200
- `https://www.jobplorer.com/`: HTTP 301 to `https://jobplorer.com/`
- `https://jobplorer.com/sitemap.xml`: HTTP 200
- `https://jobplorer.com/robots.txt`: HTTP 200
- A sampled existing `/posts/` URL returned HTTP 200
- Live `robots.txt` allows `/` and points to `https://jobplorer.com/sitemap.xml`

Live sitemap mismatch:

- Live sitemap unique `/posts/` URLs: 258
- Local inferred unique `/posts/` URLs: 156
- Live-only unique `/posts/` URLs not represented in the local checkout: 102

## Cloudflare Pages Inference

Likely Cloudflare Pages or Cloudflare-fronted static deployment.

Evidence:

- README states this is a Hugo static blog powered by Cloudflare Pages.
- Live response headers include Cloudflare markers such as `server: cloudflare`, `cf-ray`, and `cf-cache-status`.
- Live routes behave like a static deployment.

Cannot verify locally:

- Cloudflare Pages project settings
- Production branch
- Build command
- Hugo version configured in Cloudflare
- Environment variables
- Whether live-only sitemap URLs are from a different deploy source, stale deployment, or local checkout drift

Important unresolved issue:

- Root `CNAME` contains `www.bornstarai.com`, which conflicts with the current `jobplorer.com` identity. Do not change it until deployment ownership and routing are verified.

## Known Blockers

- Local Hugo `0.152.2` build fails.
- `config.toml` uses `paginate`, which must be migrated later.
- 28 post date fields are not parseable by current local Hugo.
- 5 malformed/no-front-matter posts exist.
- 6 duplicate slug/target groups exist.
- Live sitemap has 102 unique `/posts/` URLs that are not represented by this local checkout.
- Cloudflare build settings are not locally verifiable.
- `CNAME` conflicts with the `jobplorer.com` domain.

## What Must Not Be Changed Yet

Until the next phases are reviewed and approved:

- Do not move `/posts/` to `/blog/`.
- Do not delete existing posts.
- Do not rename content folders.
- Do not change `config.toml`.
- Do not change `CNAME`.
- Do not change layouts, themes, or analytics.
- Do not change Cloudflare, DNS, GitHub, or deployment settings.
- Do not publish rewritten content directly without draft review.
- Do not add fake rankings, fake ratings, job guarantees, legal advice, visa advice, labor advice, or official partnership wording.

## Recommended Next Phases

- Phase 0B: docs-only planning and preservation notes.
- Phase 0C: build compatibility plan for Hugo version, pagination config, dates, malformed posts, and duplicate slugs.
- Phase 1A: draft service navigation and landing page structure.
- Phase 1B: draft About, Contact, Privacy, and Terms pages.
- Phase 2: define a cautious job site review model.
- Phase 3: create starter drafts for job sites, country guides, career guides, and job seeker tools.
- Phase 4: publish one reviewed evergreen page after source review and URL safety checks.
- Phase 5: expand country and career guide coverage.
