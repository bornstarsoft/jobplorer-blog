# Jobplorer Phase 9L Custom Domain Cache Purge Recheck

## Purpose

Phase 9L verifies the owner-performed Cloudflare custom-domain cache purge for the Jobplorer homepage and Career Guides landing page after the Phase 9F internal-link deployment became visible on `jobplorer-blog.pages.dev` but remained stale on `jobplorer.com`.

## Owner Cache Purge Action

Owner reported manually purging Cloudflare cache for:

- `https://jobplorer.com/`
- `https://jobplorer.com/career-guides/`
- optional `www` variants

Codex did not change Cloudflare settings.

## Homepage Re-Check Result

Checked:

- `https://jobplorer.com/`
- `https://jobplorer.com/?v=b5f552a`
- `https://www.jobplorer.com/`

Clean apex homepage result:

- `https://jobplorer.com/` now shows `Featured Career Guides`.
- It links to `/career-guides/software-developers/`.
- It links to `/career-guides/game-developers/`.
- It shows `Reviewed Job Site Profiles`.
- It shows LinkedIn, Indeed, and Glassdoor.
- No auto-rendered recent legacy post cards were observed in the checked homepage body.

`www` homepage result:

- `https://www.jobplorer.com/` redirects to `https://jobplorer.com/`.
- The followed body matched the updated apex homepage.

Cache-busted apex homepage result:

- `https://jobplorer.com/?v=b5f552a` still returned stale cached HTML with `Featured Career Guide` and Software Developers only.

## Career Guides Re-Check Result

Checked:

- `https://jobplorer.com/career-guides/`
- `https://jobplorer.com/career-guides/?v=b5f552a`
- `https://www.jobplorer.com/career-guides/`

Clean apex Career Guides result:

- `https://jobplorer.com/career-guides/` now shows `Reviewed Career Guides`.
- It links to `/career-guides/software-developers/`.
- It links to `/career-guides/game-developers/`.
- Remote Workers is only mentioned as a future topic and is not presented as published.

`www` Career Guides result:

- `https://www.jobplorer.com/career-guides/` redirects to `https://jobplorer.com/career-guides/`.
- The followed body matched the updated apex Career Guides page.

Cache-busted apex Career Guides result:

- `https://jobplorer.com/career-guides/?v=b5f552a` still returned stale cached HTML with the old manual body text.

## Cache/Header Observations

Clean apex homepage:

- Status: HTTP 200
- `cache-control`: `public, max-age=0, must-revalidate`
- `cf-cache-status`: `HIT`
- `age`: 67
- `last-modified`: Wed, 03 Jun 2026 08:28:54 GMT

Clean apex Career Guides:

- Status: HTTP 200
- `cache-control`: `public, max-age=0, must-revalidate`
- `cf-cache-status`: `HIT`
- `age`: 11
- `last-modified`: Wed, 03 Jun 2026 08:29:51 GMT

Cache-busted apex homepage:

- Status: HTTP 200
- `cache-control`: `public, max-age=0, must-revalidate`
- `cf-cache-status`: `HIT`
- `age`: 3219
- `last-modified`: Wed, 03 Jun 2026 07:37:33 GMT
- Body remained stale.

Cache-busted apex Career Guides:

- Status: HTTP 200
- `cache-control`: `public, max-age=0, must-revalidate`
- `cf-cache-status`: `HIT`
- `age`: 3134
- `last-modified`: Wed, 03 Jun 2026 07:38:58 GMT
- Body remained stale.

`www` variants:

- `https://www.jobplorer.com/` returned HTTP 301 to `https://jobplorer.com/`.
- `https://www.jobplorer.com/career-guides/` returned HTTP 301 to `https://jobplorer.com/career-guides/`.

## Route/Sitemap Preservation Result

Route checks:

- `https://jobplorer.com/career-guides/game-developers/` returned HTTP 200.
- `https://jobplorer.com/career-guides/remote-workers/` returned HTTP 404.

Sitemap check:

- `https://jobplorer.com/career-guides/software-developers/` is present.
- `https://jobplorer.com/career-guides/game-developers/` is present.
- `https://jobplorer.com/career-guides/remote-workers/` is absent.
- Unique `/posts/` URL count remains 258.

## Decision

Resolved for clean custom-domain URLs.

The production pages users normally visit now match the Phase 9F content on `jobplorer.com` and `www.jobplorer.com` redirects correctly to the updated apex pages.

Partially unresolved for the old cache-busted query URLs:

- `https://jobplorer.com/?v=b5f552a`
- `https://jobplorer.com/career-guides/?v=b5f552a`

Those query URLs still serve stale cached HTML. This does not affect the clean canonical URLs, but it indicates Cloudflare may cache query-string variants separately.

## Recommended Next Step

Continue content work if using the clean canonical URLs as the production verification source.

If query-string cache variants need to be fully cleared, purge everything or explicitly purge the stale query URLs:

- `https://jobplorer.com/?v=b5f552a`
- `https://jobplorer.com/career-guides/?v=b5f552a`

No content edits are needed for this issue.
