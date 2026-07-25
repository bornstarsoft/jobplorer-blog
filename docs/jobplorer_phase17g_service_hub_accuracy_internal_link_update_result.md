# Jobplorer Phase 17G Service Hub Accuracy and Internal Link Update Result

## Purpose

Phase 17G corrects stale service-hub copy and makes the current reviewed Job Site Profiles, Career Guides, and Country Guides explicit in their respective hub content.

The update is intentionally limited to three hub pages and does not modify individual profiles, guides, legacy posts, URLs, slugs, draft status, config, layouts, themes, or generated public output.

## Phase 17F Commit

The Phase 17F internal-link coverage audit was committed before implementation:

- Commit: `e593c31 Document Jobplorer internal link coverage audit`
- Remote: the owner-confirmed GitHub repository
- Branch: `main`

No push was performed in this phase.

## Source Pages Updated

- `content/job-sites/sites/_index.md`
- `content/career-guides/_index.md`
- `content/country-guides/_index.md`

The homepage and all individual profile and guide articles were left unchanged.

## Service Hub Accuracy Changes

### Reviewed Job Site Profiles

- Replaced the inaccurate statement that no detailed profiles had been published.
- Added explicit links to:
  - LinkedIn
  - Indeed
  - Glassdoor
- Updated the description and introductory wording to reflect the existing reviewed inventory.

### Career Guides

- Added Remote Work Job Search to the manual Reviewed Career Guides list.
- Removed Remote Workers from the future-topic wording.
- Preserved the existing Software Developers and Game Developers links.

### Country Guides

- Added a Reviewed Country Guides section.
- Added explicit links to:
  - South Korea
  - Canada
- Kept future guide publication conditional on official-source review.

## Internal Links Added

- `/job-sites/sites/linkedin/`
- `/job-sites/sites/indeed/`
- `/job-sites/sites/glassdoor/`
- `/career-guides/remote-workers/`
- `/country-guides/south-korea/`
- `/country-guides/canada/`

Software Developers and Game Developers were already present in the Career Guides hub and were preserved.

## Build Result

The production build passed:

```text
hugo --gc --minify --noBuildLock --cacheDir /tmp/jobplorer-phase17g-cache --destination /tmp/jobplorer-phase17g-build
```

The path-warning build also passed:

```text
hugo --gc --minify --printPathWarnings --noBuildLock --cacheDir /tmp/jobplorer-phase17g-path-cache --destination /tmp/jobplorer-phase17g-pathwarnings
```

Results:

- Hugo version: `v0.152.2+extended+withdeploy`
- Generated pages: 1,199
- Paginator pages: 21
- Aliases: 10
- Duplicate path warnings: none

## Generated HTML Result

The generated hub pages were inspected.

- `/job-sites/sites/` contains the Reviewed Profiles heading and links to LinkedIn, Indeed, and Glassdoor.
- `/career-guides/` contains Remote Work Job Search in the Reviewed Career Guides list.
- `/career-guides/` no longer describes Remote Workers as a future topic.
- `/country-guides/` contains a Reviewed Country Guides heading and links to South Korea and Canada.
- The stale no-profile statement is absent from generated Job Site Profiles HTML.

## Preservation Result

- Unique published `/posts/` URLs remain 258.
- LinkedIn, Indeed, and Glassdoor generate in production.
- Software Developers, Game Developers, and Remote Workers generate in production.
- South Korea and Canada generate in production.
- United States remains draft-only:
  - no production route was generated
  - no sitemap URL was generated
- No `content/posts/*.md` file changed.
- No individual profile or guide article changed.
- No config, CNAME, layout, theme, or public file changed.

## Risk Wording Safeguards

- The hub pages describe the links as reviewed starting points, not rankings or endorsements.
- No job, hiring, salary, availability, or outcome guarantee was added.
- Readers are directed to current official websites, employer information, and job postings.
- Country guide wording does not add legal, visa, immigration, labor, tax, relocation, or eligibility advice.
- Features, policies, public resources, and availability remain framed as changeable.

## Remaining Risks

- These local changes are not live until a controlled commit, push, and deployment verification succeeds.
- Cloudflare HTML caching can delay clean-route visibility after deployment.
- Search Console Performance data should still guide later title, metadata, or legacy-content decisions.
- The United States guide still requires completed owner manual source verification before review or publication.

## Recommended Next Step

Phase 17H: commit only the three service-hub pages and this report, then perform a controlled push and deployment verification.

The deployment check should confirm:

- the three updated hub pages return HTTP 200
- the reviewed lists appear on cache-busted and clean URLs
- all linked reviewed profiles and guides remain live
- the United States guide remains unpublished
- the sitemap still contains 258 unique `/posts/` URLs
