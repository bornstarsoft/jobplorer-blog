# Jobplorer Phase 8A Homepage Service Hub Audit

## Purpose

Phase 8A audits the current homepage and service-hub rendering after LinkedIn, Indeed, Glassdoor, and Software Developers have been published. This phase is docs-only and does not redesign or edit source pages.

## Current Homepage Rendering Summary

The homepage opens with clear service-hub positioning:

- Jobplorer is described as a global job information hub.
- The first visible content links to Job Sites, Job Sites by Country, Job Sites by Career, Country Guides, Career Guides, Remote Jobs, Job Seeker Tools, Guides, and the Legacy Job News Archive.
- The homepage disclaimer correctly says Jobplorer does not provide live job listings, hiring guarantees, visa advice, legal advice, or labor advice.

However, after the short hub intro, the page immediately renders a list of legacy post cards. The first visible post items are still old auto-news style summaries, which can make the homepage feel closer to a blog/news feed than a durable service hub.

## Routes Checked

Generated local HTML snippets were inspected for:

- `/`
- `/job-sites/`
- `/job-sites/sites/`
- `/career-guides/`
- `/job-seeker-tools/`
- `/posts/`

Build output used:

- `/tmp/jobplorer-phase8a-build`
- `/tmp/jobplorer-phase8a-pathwarnings`

## Service-Hub Strengths

- The homepage headline and intro match the long-term positioning: explore job sites, country guides, career resources, and practical job search starting points.
- The primary navigation includes service sections before the Archive link.
- `/job-sites/` is correctly framed as cautious platform research, not a live job board.
- `/job-sites/sites/` now renders reviewed job site profiles for Glassdoor, Indeed, and LinkedIn.
- `/career-guides/` renders the reviewed Software Developers guide.
- `/job-seeker-tools/` links to practical rewritten legacy guidance, including resume blockers and AI recruitment.
- `/posts/` is explicitly named and described as the Legacy Job News Archive.

## News-Feed / Blog Risks

- The homepage does not directly show reviewed job site profiles such as LinkedIn, Indeed, and Glassdoor before the legacy post list.
- The homepage does not directly show the Software Developers guide before the legacy post list.
- The old post feed appears immediately after the service-hub intro, so the page can still feel like a news-feed blog once users scroll.
- The first homepage post cards include old auto-news-style summaries that may overtake the new service-hub positioning visually.
- The homepage has RSS/feed metadata and default Hugo list behavior, which is acceptable technically but reinforces a blog-first feel.
- The Archive is safely labeled as legacy, but the homepage post list itself does not visibly repeat that legacy/archive framing near the cards.

## Reviewed Profile Discoverability

Reviewed profiles are discoverable through:

- Top navigation: Job Sites
- Homepage link: Job Sites
- `/job-sites/` link: Reviewed Job Site Profiles
- `/job-sites/sites/` listing: Glassdoor, Indeed, LinkedIn

They are not yet directly discoverable from homepage body content as named profile links. A first-time user must click through Job Sites before seeing reviewed profiles.

## Software Developers Guide Discoverability

The Software Developers guide is discoverable through:

- Top navigation: Career Guides
- Homepage link: Career Guides
- `/career-guides/` listing: Software Developer Job Search: Where to Start

It is not directly linked by name from the homepage body.

## Legacy Archive Framing

The `/posts/` route is safely framed as a legacy archive. It states that older job news and archive content is preserved under the original `/posts/` URLs for URL continuity and historical reference.

The homepage includes a "Legacy Job News Archive" link, but the auto-rendered homepage post cards are not visually separated enough from the service-hub intro. Users may interpret the visible legacy cards as the main homepage experience.

## Recommended Phase 8B Changes

Phase 8B should stay controlled and content-first:

- Add a homepage "Reviewed Job Site Profiles" section linking directly to LinkedIn, Indeed, and Glassdoor.
- Add a homepage "Career Guides" highlight linking directly to Software Developers.
- Add a "Job Seeker Tools" or "Practical Guides" highlight linking to the rewritten resume blockers, AI recruitment, entry-level, and game developer AI posts only if this can be done without making the homepage news-first.
- Move or visually frame the legacy post feed under a clearly labeled "Legacy Job News Archive" section.
- Consider reducing the number of legacy post excerpts shown on the homepage, if the current theme/content setup allows this without layout or theme changes.
- Keep `/posts/` unchanged as the legacy archive route.

## What Not To Change Yet

- Do not redesign layouts or theme files yet.
- Do not move `/posts/` to `/blog/`.
- Do not delete, draft, noindex, rename, or rewrite legacy posts as part of Phase 8B unless separately approved.
- Do not change CNAME, config, Cloudflare settings, or generated files.
- Do not add rankings, ratings, guarantees, salary claims, visa/legal/labor/tax advice, affiliate links, or partnership wording.
- Do not make Jobplorer a live job scraping board.

## Build Result

Production build passed:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase8a-build
```

Path-warning build passed with no duplicate target warnings:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase8a-pathwarnings
```
