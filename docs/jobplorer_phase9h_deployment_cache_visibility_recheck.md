# Jobplorer Phase 9H Deployment Cache Visibility Recheck

## Purpose

Phase 9H re-checked deployment and cache visibility for the Phase 9F internal-link update after Phase 9G found that live homepage and Career Guides body content still appeared stale.

## Local Build Result

Local production build passed:

`hugo --gc --minify --destination /tmp/jobplorer-phase9h-build`

Path-warning build passed with no duplicate target warnings:

`hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase9h-pathwarnings`

Local route generation remained correct:

- `/career-guides/software-developers/` generated.
- `/career-guides/game-developers/` generated.
- `/career-guides/remote-workers/` did not generate.
- Published `/posts/` URL count remained 258.

## Local Generated HTML Result

Local generated homepage HTML contains:

- `Featured Career Guides`
- `/career-guides/software-developers/`
- `/career-guides/game-developers/`

Local generated Career Guides HTML contains:

- `Reviewed Career Guides`
- `/career-guides/software-developers/`
- `/career-guides/game-developers/`

This confirms the source content and local Hugo build include the Phase 9F internal-link update.

## Git/Origin Result

After `git fetch --all --prune`:

- Local `main` was ahead of `origin/main` by 1 commit and behind by 0.
- The local-only ahead commit is the Phase 9G deployment report commit:
  - `b185b11 Document Game Developers internal link deployment`
- `origin/main` points to the Phase 9F implementation commit:
  - `b5f552a Add Game Developers internal links`
- `origin/main` therefore includes the Phase 9F content update.

Because the latest local commit is docs-only and not pushed, live re-checks used the deployed content commit hash `b5f552a`.

## Live Apex Result

Checked:

- `https://jobplorer.com/?v=b5f552a`

Result:

- The page returned HTTP 200.
- The body still showed the pre-Phase 9F homepage section:
  - `Featured Career Guide`
  - Software Developers only
- The body did not show:
  - `Featured Career Guides`
  - the manual Game Developers homepage link

Conclusion for apex homepage: still stale.

## Live Career Guides Result

Checked:

- `https://jobplorer.com/career-guides/?v=b5f552a`

Result:

- The page returned HTTP 200.
- The generated page-card list showed both Game Developers and Software Developers because both guides are live.
- The manual body content still showed the pre-Phase 9F intro text:
  - future topics included software developers and game developers
- The body did not show:
  - `Reviewed Career Guides`
  - the manually added reviewed-guide list

Conclusion for apex Career Guides page: partially updated through generated cards, but manual body content is still stale.

## Live pages.dev Result

Checked:

- `https://jobplorer-blog.pages.dev/?v=b5f552a`
- `https://jobplorer-blog.pages.dev/career-guides/?v=b5f552a`

Result:

- The pages.dev homepage also returned the pre-Phase 9F homepage body.
- The pages.dev Career Guides page also returned the pre-Phase 9F manual body content while showing generated live guide cards.

Conclusion for pages.dev: still stale in the same way as the apex domain.

## Sitemap Result

Cache-busted sitemap:

- `/tmp/jobplorer-phase9h/live-sitemap.xml`

Sitemap verification confirmed:

- `https://jobplorer.com/career-guides/software-developers/` is present.
- `https://jobplorer.com/career-guides/game-developers/` is present.
- `https://jobplorer.com/career-guides/remote-workers/` is absent.
- Unique `/posts/` URL count remains 258.

## Conclusion

Still stale.

The local source, local Hugo build, and `origin/main` all include the Phase 9F internal-link update. Live routes and sitemap are correct, but the live homepage body and Career Guides manual body content still do not show the Phase 9F edits on either the apex domain or pages.dev.

This points to a Cloudflare Pages deployment/build-output issue or a caching/deployment selection issue rather than a local Hugo source issue.

## If Still Stale: Cloudflare Pages Checks

Check the Cloudflare Pages dashboard before making more content changes:

- Latest production deployment commit should be `b5f552a` or later.
- Production branch should be `main`.
- Build logs should show the expected Hugo version and successful build after the Phase 9F push.
- Build output should include the updated homepage and Career Guides HTML.
- Deployment should have completed after the Phase 9F push.
- Cache rules or custom caching behavior should not be serving an older deployment for `/` or `/career-guides/`.
- Confirm whether `jobplorer-blog.pages.dev` and `jobplorer.com` are pointing to the same latest production deployment.

## Recommended Next Step

Pause further content edits and inspect Cloudflare Pages deployment status/build output for commit `b5f552a`. After the dashboard confirms the current deployment, re-check:

- `https://jobplorer.com/?v=b5f552a`
- `https://jobplorer.com/career-guides/?v=b5f552a`
- `https://jobplorer-blog.pages.dev/?v=b5f552a`
- `https://jobplorer-blog.pages.dev/career-guides/?v=b5f552a`
