# Jobplorer Phase 17F Internal Link Coverage Audit

## Purpose

Phase 17F audits how the live Job Site Profiles, Career Guides, Country Guides, and four rewritten legacy posts are linked from Jobplorer's homepage and service-hub pages.

This phase is docs-only. It does not modify site content, URLs, slugs, config, layouts, themes, or generated public output.

## Current Context

- Google Search Console registration is complete.
- Search Console Performance metrics remain an independent data-collection task.
- The owner confirmed that GitHub is the correct repository remote.
- Phase 17E was committed as:
  - `20c1d3f Document United States source access recheck`

## Audit Method

The production site was generated with:

```text
hugo --gc --minify --noBuildLock --cacheDir /tmp/jobplorer-phase17f-cache --destination /tmp/jobplorer-phase17f-build
```

The audit searched generated HTML for exact internal `href` references to each target URL.

Curated source pages checked:

- Homepage
- Job Sites hub
- Reviewed Job Site Profiles hub
- Career Guides hub
- Country Guides hub
- Job Seeker Tools hub
- Legacy Posts archive

Generated taxonomy, archive, related-content, and other page links were also counted separately in total source-page counts.

## Build Result

- Build: passed
- Hugo version: `v0.152.2+extended+withdeploy`
- Generated pages: 1,199
- Unique published `/posts/` URLs: 258
- Build output and cache were contained under `/tmp`.

## Internal Link Coverage

| Target | Exact URL | Total generated source pages | Curated source pages |
| --- | --- | ---: | --- |
| LinkedIn | `/job-sites/sites/linkedin/` | 2 | Homepage; Reviewed Job Site Profiles |
| Indeed | `/job-sites/sites/indeed/` | 2 | Homepage; Reviewed Job Site Profiles |
| Glassdoor | `/job-sites/sites/glassdoor/` | 2 | Homepage; Reviewed Job Site Profiles |
| Software Developers | `/career-guides/software-developers/` | 2 | Homepage; Career Guides |
| Game Developers | `/career-guides/game-developers/` | 2 | Homepage; Career Guides |
| Remote Workers | `/career-guides/remote-workers/` | 1 | Career Guides |
| South Korea | `/country-guides/south-korea/` | 1 | Country Guides |
| Canada | `/country-guides/canada/` | 1 | Country Guides |
| AI in Recruitment | `/posts/the-rise-of-ai-in-recruitment/` | 9 | Homepage; Job Seeker Tools |
| Entry-Level Job Search | `/posts/the-struggles-of-young-job-seekers/` | 9 | Homepage; Career Guides |
| Resume Blockers | `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/` | 7 | Homepage; Job Seeker Tools; Posts archive |
| AI-Assisted Game Development Roles | `/posts/ai-creators-future-game-development/` | 7 | Homepage; Posts archive; Software Developers |

## Main Finding

No reviewed live page is completely orphaned.

However, Remote Workers, South Korea, and Canada each have only one generated source page linking to them. Their discoverability depends primarily on the relevant section-list page.

The four rewritten legacy posts have stronger coverage through homepage links, contextual hub links, archive or taxonomy pages, and related-content links.

## Stale Hub Copy Findings

### Reviewed Job Site Profiles Hub

`content/job-sites/sites/_index.md` currently says:

```text
No detailed job site profiles have been published yet.
```

This is no longer accurate because LinkedIn, Indeed, and Glassdoor are live and reviewed.

The generated section template still links to the three profiles, so they are discoverable, but the manual hub copy contradicts the current site state.

### Career Guides Hub

`content/career-guides/_index.md` manually lists:

- Software Developers
- Game Developers

Remote Workers is live but is omitted from the manual reviewed-guide list.

The text also says future topics may include remote workers, which is stale. The generated section list supplies a link, but the manual copy does not accurately represent the published inventory.

### Country Guides Hub

`content/country-guides/_index.md` does not manually identify South Korea or Canada as reviewed live guides.

The generated section list links to both pages, preventing orphaning, but the manual service-hub content does not make the reviewed inventory clear.

### Homepage

The homepage directly highlights:

- LinkedIn
- Indeed
- Glassdoor
- Software Developers
- Game Developers
- Four rewritten legacy posts

It does not directly highlight:

- Remote Workers
- South Korea
- Canada

This is not a technical error, but it gives those three live reviewed guides weaker first-level discoverability.

## Risk Assessment

### Low Risk

- The 12 audited live targets all have at least one internal source page.
- The four rewritten legacy posts have multiple internal-link sources.
- No URL, slug, sitemap, canonical, or draft-status issue was found.

### Moderate Content Accuracy Risk

- The Reviewed Job Site Profiles hub claims that no detailed profiles are published.
- The Career Guides hub describes Remote Workers as a possible future topic despite it being live.
- The Country Guides hub does not manually surface its two reviewed live guides.

These contradictions can confuse readers and make the service-hub structure appear less complete than it is.

## Recommended Implementation Scope

A future controlled update should be limited to service-hub content:

- `content/job-sites/sites/_index.md`
- `content/career-guides/_index.md`
- `content/country-guides/_index.md`
- Optionally `content/_index.md` if the owner wants Remote Workers, South Korea, or Canada promoted on the homepage

Recommended content changes:

1. Replace the stale Job Site Profiles publication statement with a reviewed-profile list.
2. Add Remote Workers to the manual Reviewed Career Guides list.
3. Remove Remote Workers from future-topic wording.
4. Add a Reviewed Country Guides section linking to South Korea and Canada.
5. Consider homepage links to the three weakly linked guides without increasing archive prominence.

## Safety Policy

- Do not modify URLs, slugs, filenames, canonicals, redirects, sitemap behavior, or draft status.
- Do not modify individual profile or guide articles during the hub cleanup.
- Do not add rankings, ratings, guarantees, affiliate claims, partnership claims, or live job-count claims.
- Keep wording cautious and direct readers to current official sources.
- Keep the United States guide unpublished.

## Recommended Next Phase

Phase 17G: controlled service-hub accuracy and internal-link update for:

- Reviewed Job Site Profiles
- Career Guides
- Country Guides

Keep the implementation small, then run local build, route, sitemap, and internal-link preservation checks before any push.
