# Jobplorer Phase 15A Post-CNAME Current State Operations Plan

## Purpose

Phase 15A records the Jobplorer production state after the CNAME cleanup and creates a lightweight operations checklist for future deployment, cache, SEO, and content-triage work.

This phase is docs-only. It does not modify content, posts, config, CNAME, layouts, themes, generated output, job-site pages, country guides, or career guides.

## Current Production Routing State

Current routing state after the CNAME cleanup:

- Repository `CNAME` contains `jobplorer.com`.
- `config.toml` uses `baseURL = "https://jobplorer.com/"`.
- `https://jobplorer.com/` returns HTTP 200.
- `https://www.jobplorer.com/` redirects to `https://jobplorer.com/`.
- `https://jobplorer-blog.pages.dev/` returns HTTP 200.

The repo custom-domain metadata, Hugo base URL, and Cloudflare Pages custom-domain behavior now align around Jobplorer.

## CNAME Cleanup Result

The previous mismatched repository `CNAME` value was:

```text
www.bornstarai.com
```

The current repository `CNAME` value is:

```text
jobplorer.com
```

Phase 14C pushed the cleanup and verified that the apex domain, `www` redirect, pages.dev route, sitemap, robots file, and representative live content routes remained reachable.

## Live Content Inventory

### Job Site Profiles

Live and reviewed:

- LinkedIn: `/job-sites/sites/linkedin/`
- Indeed: `/job-sites/sites/indeed/`
- Glassdoor: `/job-sites/sites/glassdoor/`

### Career Guides

Live and reviewed:

- Software Developers: `/career-guides/software-developers/`
- Game Developers: `/career-guides/game-developers/`
- Remote Workers: `/career-guides/remote-workers/`

### Country Guides

Live and reviewed:

- South Korea: `/country-guides/south-korea/`
- Canada: `/country-guides/canada/`

### Legacy Archive

The legacy `/posts/` archive remains preserved with 258 published URLs.

Four legacy posts have been rewritten and internally linked:

- `/posts/the-rise-of-ai-in-recruitment/`
- `/posts/the-struggles-of-young-job-seekers/`
- `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`
- `/posts/ai-creators-future-game-development/`

The homepage is service-hub focused, and auto-rendered recent legacy post cards are hidden from the homepage.

## Draft-Only Inventory

Draft-only:

- United States country guide: `/country-guides/united-states/`

The United States guide remains unpublished because manual owner verification for blocked USAJOBS and CareerOneStop sources is still required.

## SEO And Search Console Watch Items

Search Console data is still pending for the four rewritten legacy posts:

- Clicks
- Impressions
- CTR
- Average position
- Indexed status
- Google-selected canonical
- Top queries
- Internal and external link signals
- Crawl or indexing warnings

Newer profile and guide pages should also be monitored:

- LinkedIn, Indeed, and Glassdoor profiles
- Software Developers, Game Developers, and Remote Workers career guides
- South Korea and Canada country guides

Sitemap stability should remain a standing check:

- `/posts/` count remains 258.
- Live reviewed profile and guide URLs remain present.
- Draft-only URLs remain absent.
- Canonical/indexing status should be verified in Search Console after Google recrawls.

## Cloudflare Operations Notes

Cloudflare HTML cache behavior can delay visible updates on clean custom-domain routes.

Recommended deployment verification pattern:

- Check the pushed commit hash in Git.
- Watch Cloudflare Pages deployment status when possible.
- Check clean routes first.
- Use cache-busted URLs after deploy when clean routes look stale.
- Compare `jobplorer.com` with `jobplorer-blog.pages.dev`.
- Purge specific URLs only when clean canonical routes remain stale after a successful deployment.

Suggested cache-purge scope:

- Purge the exact affected page URLs.
- Include `www` variants when relevant.
- Avoid broad cache purges unless a narrow purge fails or the owner approves broader action.

## Remaining Risks

- Search Console data for rewritten legacy posts is still missing.
- Old auto-news content quality still needs triage.
- United States country guide official-source verification is incomplete.
- Cloudflare HTML cache behavior can temporarily obscure newly deployed pages.
- Additional country guide work should wait for a stable official-source model.

## Recommended Next Roadmap

A. Fill Search Console data for the four rewritten legacy posts.

B. Complete United States manual source verification for USAJOBS, CareerOneStop, American Job Centers, and state workforce resources.

C. Continue small-batch legacy rewrites only after Search Console review.

D. Add internal links gradually only where contextually useful and non-promotional.

E. Consider additional country guides only after reviewing the source model and confirming official-source availability.

## Recommended Immediate Next Step

Search Console data entry should come first if owner data is available.

If Search Console data is unavailable, continue with United States manual source verification before moving that guide toward reviewed status.
