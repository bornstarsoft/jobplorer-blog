# Jobplorer Phase 17H Service Hub Deployment Verification Result

## Purpose

Phase 17H commits, pushes, and verifies the Phase 17G service-hub accuracy and internal-link update.

The deployment scope consists of:

- Reviewed Job Site Profiles hub
- Career Guides hub
- Country Guides hub
- Phase 17G implementation report

No individual profile, guide, legacy post, URL, slug, config, layout, theme, or draft status was changed in this phase.

## Phase 17G Commit

The intended four files were staged explicitly and committed:

```text
9b45ba2 Update Jobplorer service hub links
```

Committed files:

- `content/job-sites/sites/_index.md`
- `content/career-guides/_index.md`
- `content/country-guides/_index.md`
- `docs/jobplorer_phase17g_service_hub_accuracy_internal_link_update_result.md`

## Pre-Push Verification

The production build passed:

```text
hugo --gc --minify --noBuildLock --cacheDir /tmp/jobplorer-phase17h-cache --destination /tmp/jobplorer-phase17h-build
```

The path-warning build also passed:

```text
hugo --gc --minify --printPathWarnings --noBuildLock --cacheDir /tmp/jobplorer-phase17h-path-cache --destination /tmp/jobplorer-phase17h-pathwarnings
```

Results:

- Hugo version: `v0.152.2+extended+withdeploy`
- Generated pages: 1,199
- Paginator pages: 21
- Aliases: 10
- Duplicate path warnings: none
- Unique published `/posts/` URLs: 258

Local generated HTML confirmed:

- Reviewed Profiles with LinkedIn, Indeed, and Glassdoor
- Reviewed Career Guides with Software Developers, Game Developers, and Remote Workers
- Reviewed Country Guides with South Korea and Canada
- the stale no-profile statement was absent
- Remote Workers was no longer described as a future topic
- the United States production route was absent

## Remote Freshness

After:

```text
git fetch --all --prune
```

the branch state was:

- Branch: `main`
- Behind `origin/main`: 0
- Ahead of `origin/main`: 22

The 22 local commits were reviewed before push. They contained the documented Jobplorer phases after the previous CNAME cleanup deployment, including Search Console tracking, analytics records, source rechecks, and the current service-hub update.

No unrelated repository changes were found.

## Push Result

The controlled non-force push succeeded:

```text
cef9cfb..9b45ba2  main -> main
```

Remote:

```text
git@github.com:bornstarsoft/jobplorer-blog.git
```

After push, local `main` and `origin/main` were synchronized.

## Deployment Transition

The first live check immediately after push returned HTTP 200 but still showed the previous hub content on both:

- `jobplorer.com`
- `jobplorer-blog.pages.dev`

This indicated a short Cloudflare Pages deployment transition rather than a custom-domain-only cache issue.

After approximately 30 seconds, cache-busted rechecks on both domains showed the Phase 17G content. Clean custom-domain URLs were then checked and also showed the current content.

## Live Service Hub Verification

The following clean routes returned HTTP 200:

- `https://jobplorer.com/job-sites/sites/`
- `https://jobplorer.com/career-guides/`
- `https://jobplorer.com/country-guides/`

Live content checks confirmed:

### Reviewed Job Site Profiles

- Reviewed Profiles heading present
- LinkedIn link present
- Indeed link present
- Glassdoor link present
- stale no-profile statement absent

### Career Guides

- Reviewed Career Guides heading present
- Software Developers link present
- Game Developers link present
- Remote Workers link present
- stale future Remote Workers wording absent

### Country Guides

- Reviewed Country Guides heading present
- South Korea link present
- Canada link present

The same current content was confirmed on the `pages.dev` origin using cache-busted URLs.

## Live Route Verification

HTTP 200:

- LinkedIn
- Indeed
- Glassdoor
- Software Developers
- Game Developers
- Remote Workers
- South Korea
- Canada

HTTP 404:

- United States country guide

The United States guide therefore remains unpublished.

## Cache Header Observations

The three clean hub routes returned:

- Status: HTTP 200
- `cache-control: public, max-age=0, must-revalidate`
- `cf-cache-status: DYNAMIC`

No manual Cloudflare setting or cache change was made.

## Sitemap Preservation

The live sitemap confirmed:

- 258 unique `/posts/` URLs
- LinkedIn present
- Indeed present
- Glassdoor present
- Software Developers present
- Game Developers present
- Remote Workers present
- South Korea present
- Canada present
- United States absent

## Remaining Risks

- Cloudflare Pages may need a short transition period after future pushes.
- Search Console Performance data should guide future title, metadata, or legacy-content decisions.
- The United States guide remains blocked on completed owner manual source verification.
- Additional internal links should remain gradual and contextually useful.

## Recommended Next Step

Commit this Phase 17H deployment report in the next documentation step.

After that, choose one controlled priority:

1. Continue waiting for useful Search Console Performance data.
2. Complete owner manual verification for the United States guide.
3. Recheck weekly Cloudflare traffic without changing content from analytics alone.

Do not expand legacy rewrites until Search Console Performance evidence is stable enough to support a decision.
