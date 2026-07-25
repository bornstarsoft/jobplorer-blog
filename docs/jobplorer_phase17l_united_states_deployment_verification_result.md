# Jobplorer Phase 17L United States Deployment Verification Result

## Purpose

Phase 17L commits, pushes, and verifies the reviewed United States country guide publication.

This phase does not change source content after the Phase 17K publication change. It verifies the production build, controlled GitHub push, live routes, content, and sitemap preservation.

## Phase 17K Commit

The United States publication change and Phase 17K report were committed as:

```text
c352c90 Publish United States country guide
```

Committed files:

- `content/country-guides/united-states.md`
- `docs/jobplorer_phase17k_publish_united_states_country_guide_result.md`

## Pre-Push Verification

Production build command:

```text
hugo --gc --minify --noBuildLock --cacheDir /tmp/jobplorer-phase17l-cache --destination /tmp/jobplorer-phase17l-build
```

Path-warning build command:

```text
hugo --gc --minify --printPathWarnings --noBuildLock --cacheDir /tmp/jobplorer-phase17l-path-cache --destination /tmp/jobplorer-phase17l-pathwarnings
```

Results:

- both builds passed
- generated pages: 1,200
- duplicate path warnings: none
- United States production route: generated
- United States URL: present in the generated sitemap
- published `/posts/` article URL count: 258
- all reviewed job-site profiles, career guides, and country guides generated

The generated United States page contained the reviewed guide title, USAJOBS, CareerOneStop, CalJOBS, and the official-source review note. It did not contain `unpublished` or `draft note`.

## Remote Freshness and Push Result

Before push:

- branch: `main`
- remote: `git@github.com:bornstarsoft/jobplorer-blog.git`
- local branch behind `origin/main`: 0
- local branch ahead of `origin/main`: 4
- the four local commits were the expected United States review and publication sequence

After `git fetch --all --prune`, no remote divergence was found.

Controlled push:

```text
git push origin main
```

Result:

```text
9b45ba2..c352c90  main -> main
```

No force push was used.

## Deployment Transition

Immediately after push, the new United States route returned HTTP 404 on both the custom domain and `pages.dev`. This matched a short Cloudflare Pages deployment transition rather than a source or Hugo build failure.

After approximately 30 seconds:

- cache-busted apex route: HTTP 200
- cache-busted `pages.dev` route: HTTP 200
- clean apex route: HTTP 200

No Cloudflare settings or cache rules were changed.

## United States Live Verification

Verified URLs:

- `https://jobplorer.com/country-guides/united-states/`
- cache-busted custom-domain URL
- cache-busted `jobplorer-blog.pages.dev` URL

The live page contains:

- `Job Search in the United States: Where to Start`
- USAJOBS
- CareerOneStop
- CalJOBS
- the official-source review note

The live page does not contain:

- `unpublished`
- `draft note`

Clean route headers:

- status: HTTP 200
- `cache-control: public, max-age=0, must-revalidate`
- `cf-cache-status: DYNAMIC`

## Live Route Verification

The following live routes returned HTTP 200:

- Country Guides hub
- United States
- South Korea
- Canada
- LinkedIn
- Indeed
- Glassdoor
- Software Developers
- Game Developers
- Remote Workers

## Country Guides Hub Observation

The generated Country Guides hub includes the United States guide in its automatic page list, so the new guide is discoverable from the live hub.

The manually maintained `Reviewed Country Guides` list in `content/country-guides/_index.md` still names only South Korea and Canada. This is a limited hub-copy follow-up and does not affect the United States route, publication status, or sitemap inclusion.

No hub content was changed during this deployment phase.

## Sitemap Preservation

The live sitemap returned HTTP 200.

Verified sitemap entries:

- LinkedIn: present
- Indeed: present
- Glassdoor: present
- Software Developers: present
- Game Developers: present
- Remote Workers: present
- South Korea: present
- Canada: present
- United States: present

Post preservation:

- `/posts/` archive root: present
- published `/posts/` article URLs, excluding the archive root: 258

## Remaining Risks

- The manual `Reviewed Country Guides` list does not yet include the United States guide.
- Cloudflare Pages may briefly return the previous deployment state immediately after future pushes.
- Search Console Performance data still needs time and owner review before SEO or legacy-content decisions.
- Published official-resource descriptions should continue to be reviewed periodically because availability and processes can change.

## Recommended Next Step

Phase 17M: perform a small, controlled Country Guides hub update that adds the United States guide to the manual `Reviewed Country Guides` list.

That phase should:

- modify only `content/country-guides/_index.md` and one report
- keep all country guide article files unchanged
- use cautious reviewed-guide wording
- verify all three country guide routes
- preserve the 258 published legacy post URLs
- avoid push until the local rendering check passes
