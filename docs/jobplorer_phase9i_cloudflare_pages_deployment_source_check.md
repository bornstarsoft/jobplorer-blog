# Jobplorer Phase 9I Cloudflare Pages Deployment Source Check

## Purpose

Phase 9I documents a read-only investigation into why the Phase 9F internal-link update is present in local source, local Hugo output, and `origin/main`, but is still not visible in the live homepage and Career Guides manual body content.

## Local Source/Build Result

Local source check confirmed:

- `content/_index.md` contains `Featured Career Guides`.
- `content/_index.md` links to `/career-guides/software-developers/`.
- `content/_index.md` links to `/career-guides/game-developers/`.
- `content/career-guides/_index.md` contains `Reviewed Career Guides`.
- `content/career-guides/_index.md` links to `/career-guides/software-developers/`.
- `content/career-guides/_index.md` links to `/career-guides/game-developers/`.

Local production build passed:

`hugo --gc --minify --destination /tmp/jobplorer-phase9i-build`

Local generated HTML confirmed:

- `/tmp/jobplorer-phase9i-build/index.html` contains `Featured Career Guides`, the Software Developers link, and the Game Developers link.
- `/tmp/jobplorer-phase9i-build/career-guides/index.html` contains `Reviewed Career Guides`, the Software Developers link, and the Game Developers link.

This confirms the repository source and local Hugo build output are correct.

## Git Origin Result

After `git fetch --all --prune`:

- `origin/main` points to `b5f552a Add Game Developers internal links`.
- `origin/main` includes the Phase 9F internal-link update.
- Local `main` is ahead of `origin/main` by two docs-only report commits:
  - `b185b11 Document Game Developers internal link deployment`
  - `c338906 Document deployment cache visibility recheck`

Recent history:

- `c338906 Document deployment cache visibility recheck`
- `b185b11 Document Game Developers internal link deployment`
- `b5f552a Add Game Developers internal links`
- `ed065fa Document Game Developers deployment verification`
- `9e524a0 Publish Game Developers career guide`

No content/source commits are missing from `origin/main`.

## Live Stale Result

Checked cache-busted URLs using the deployed source commit hash `b5f552a`:

- `https://jobplorer.com/?v=b5f552a`
- `https://jobplorer.com/career-guides/?v=b5f552a`
- `https://jobplorer-blog.pages.dev/?v=b5f552a`
- `https://jobplorer-blog.pages.dev/career-guides/?v=b5f552a`

Live apex homepage result:

- Still shows `Featured Career Guide`.
- Still links only to Software Developers in the manual homepage career-guide section.
- Does not show `Featured Career Guides`.
- Does not show the manual homepage Game Developers link.

Live apex Career Guides result:

- Still shows the old manual intro text with `Future topics may include software developers, game developers...`.
- Does not show the manual `Reviewed Career Guides` section.
- Does show generated list/card links to Game Developers and Software Developers because both pages are live.

pages.dev homepage result:

- Same stale manual homepage body as the apex domain.

pages.dev Career Guides result:

- Same stale manual body as the apex domain.
- Generated list/card links to Game Developers and Software Developers are visible.

Conclusion: the live manual body content is still stale on both domains, while generated list/card output and routes reflect the live guide state.

## Most Likely Explanations

- Cloudflare Pages latest production deployment is not actually built from `b5f552a`.
- The deployment for `b5f552a` failed or did not complete.
- Pages is serving an older deployment for manual body HTML despite route and sitemap freshness.
- A cache rule or deployment cache behavior affects HTML visibility for `/` and `/career-guides/`.
- The Pages project build may be using a different source checkout, branch, build command, Hugo version, or output directory than the local build.

## Owner Manual Dashboard Checklist

Cloudflare Pages project:

- `jobplorer-blog`

Check:

- Latest production deployment commit hash.
- Latest production deployment status.
- Build log commit hash.
- Production branch.
- Build command.
- Output directory.
- Hugo version used in Cloudflare Pages.
- Custom domains attached to the production deployment.
- Cache rules that may affect HTML pages.
- Whether `jobplorer.com` and `jobplorer-blog.pages.dev` are mapped to the same latest production deployment.
- Whether redeploying the latest production deployment is needed.

## Decision

- If the latest production deployment is not `b5f552a` or later, redeploy the latest production build from `main`.
- If the latest production deployment is `b5f552a` and the build passed, inspect build logs and produced output for `/index.html` and `/career-guides/index.html`.
- If the build output contains the Phase 9F body content but live pages do not, inspect cache rules and deployment serving behavior.
- Do not edit content until the Cloudflare Pages dashboard result is known.

## Recommended Next Step

Owner should inspect the Cloudflare Pages dashboard for `jobplorer-blog`, confirm the latest production deployment commit/build/output, and redeploy the latest production deployment if needed. After that, re-check:

- `https://jobplorer.com/?v=b5f552a`
- `https://jobplorer.com/career-guides/?v=b5f552a`
- `https://jobplorer-blog.pages.dev/?v=b5f552a`
- `https://jobplorer-blog.pages.dev/career-guides/?v=b5f552a`
