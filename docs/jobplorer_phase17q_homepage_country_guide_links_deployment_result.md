# Jobplorer Phase 17Q Homepage Country Guide Links Deployment Result

## Purpose

Phase 17Q commits, pushes, and verifies the homepage `Reviewed Country Guides` section.

This deployment phase does not modify source content after the Phase 17P change and does not change Cloudflare settings.

## Phase 17P Commit

The homepage update and Phase 17P report were committed as:

```text
e99ff16 Add reviewed country guides to homepage
```

Committed files:

- `content/_index.md`
- `docs/jobplorer_phase17p_homepage_country_guide_links_result.md`

## Pre-Push Verification

Production build:

```text
hugo --gc --minify --noBuildLock --cacheDir /tmp/jobplorer-phase17q-cache --destination /tmp/jobplorer-phase17q-build
```

Path-warning build:

```text
hugo --gc --minify --printPathWarnings --noBuildLock --cacheDir /tmp/jobplorer-phase17q-path-cache --destination /tmp/jobplorer-phase17q-pathwarnings
```

Results:

- both builds passed
- generated pages: 1,200
- duplicate path warnings: none
- homepage `Reviewed Country Guides` section: present
- South Korea, Canada, and United States links: present
- reviewed job-site and career-guide sections: preserved
- Ananke `More` recent-post section: absent
- published `/posts/` article URL count: 258

All reviewed job-site profile, career guide, and country guide routes generated.

Generated Hugo cache artifacts were removed before the remote check.

## Remote Freshness

After `git fetch --all --prune`:

- branch: `main`
- local branch behind `origin/main`: 0
- local branch ahead of `origin/main`: 3
- all three local commits were the expected Phase 17N report, Phase 17O audit, and Phase 17P homepage update
- working tree: clean

No remote divergence was found.

## Push Result

Controlled push:

```text
git push origin main
```

Result:

```text
ca85a03..e99ff16  main -> main
```

No force push was used.

After push, local `main`, `origin/main`, and `origin/HEAD` resolved to:

```text
e99ff16 Add reviewed country guides to homepage
```

## Deployment and Cache Transition

Immediately after push, cache-busted apex and `pages.dev` pages returned HTTP 200 but still showed the previous homepage body.

After approximately 30 seconds:

- `pages.dev` showed the new `Reviewed Country Guides` section
- the clean custom-domain homepage showed the new section
- a later unique cache-busted custom-domain request showed the new section

One earlier cache-busted query continued to return the previous HTML briefly. This was a query-specific stale cache observation rather than a source, Hugo build, or Pages deployment failure.

No cache purge or Cloudflare setting change was performed.

## Live Homepage Verification

Verified:

- `https://jobplorer.com/`
- latest unique cache-busted `jobplorer.com` URL
- cache-busted `jobplorer-blog.pages.dev` URL

The live homepage contains:

- Reviewed Job Site Profiles
- Reviewed Country Guides
- South Korea
- Canada
- United States
- Featured Career Guides
- Practical Job Search Guides
- Secondary Archive

The reviewed country section contains exactly these three target links:

- `/country-guides/south-korea/`
- `/country-guides/canada/`
- `/country-guides/united-states/`

The Ananke `More` recent-post section remains hidden.

Clean homepage response:

- status: HTTP 200
- `cache-control: public, max-age=0, must-revalidate`
- `cf-cache-status: DYNAMIC`

## Live Route Verification

The following routes returned HTTP 200:

- homepage
- Country Guides hub
- South Korea
- Canada
- United States
- LinkedIn
- Indeed
- Glassdoor
- Software Developers
- Game Developers
- Remote Workers

## Sitemap Preservation

The live sitemap returned HTTP 200.

Verified entries:

- LinkedIn: present
- Indeed: present
- Glassdoor: present
- Software Developers: present
- Game Developers: present
- Remote Workers: present
- South Korea: present
- Canada: present
- United States: present

Legacy archive preservation:

- `/posts/` archive root: present
- published `/posts/` article URLs, excluding the archive root: 258

## Scope and Safety Check

- No source content changed during this deployment phase.
- No country guide article changed.
- No job-site profile, career guide, or legacy post changed.
- No config, CNAME, layout, theme, or public file changed.
- No URL, slug, canonical, noindex, draft, or review-status field changed.
- No Cloudflare setting was changed.

## Remaining Risks

- Cloudflare can briefly serve an older HTML object for a previously used query string after deployment.
- Clean and newly cache-busted URLs should both be checked before treating a visibility delay as a source problem.
- Search Console Performance data remains necessary before title, metadata, or legacy-content decisions.
- Additional internal links should be added only when they are contextually useful.

## Recommended Next Step

Commit this Phase 17Q deployment report in a docs-only phase.

Then prioritize evidence collection:

- check whether Search Console Performance data is now available
- record the next weekly Cloudflare Analytics row when owner data is available
- keep additional legacy rewrites on hold until Search Console data is stable
- avoid further homepage expansion unless a clear service-discovery gap appears
