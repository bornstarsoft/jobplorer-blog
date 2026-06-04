# Jobplorer Phase 13A Current State After Canada Summary

## Purpose

Summarize Jobplorer's current live state after Canada country guide deployment and identify the next safe roadmap priorities.

## Current Live Site Structure

Jobplorer is now a service-hub focused Hugo site for exploring job sites, country guides, career guides, job seeker tools, and preserved legacy job-search articles. It is not positioned as a live job scraping board.

The homepage is service-hub focused and no longer auto-renders recent legacy post cards as the primary homepage experience.

## Live Job Site Profiles

Live and reviewed:

- LinkedIn
- Indeed
- Glassdoor

These profiles remain cautious starting points and avoid rankings, ratings, guarantees, affiliate claims, partnership claims, live job count claims, salary advice, legal advice, visa advice, labor advice, and tax advice.

## Live Career Guides

Live and reviewed:

- Software Developers
- Game Developers
- Remote Workers

These guides remain cautious job search research starting points and avoid career counseling, salary advice, legal advice, visa advice, labor advice, tax advice, certification advice, and hiring guarantees.

## Live Country Guides

Live and reviewed:

- South Korea
- Canada

Both guides were reviewed against official or stable public sources before publication and remain framed as job search research starting points.

## Draft-Only Items

Draft-only:

- United States country guide

The United States country guide still needs manual official-source verification before publish-readiness or publication work.

## Legacy Posts Status

- The legacy `/posts/` archive remains preserved.
- Unique published `/posts/` URL count remains 258.
- Four legacy posts have been rewritten into evergreen Jobplorer guidance and internally linked:
  - `/posts/the-rise-of-ai-in-recruitment/`
  - `/posts/the-struggles-of-young-job-seekers/`
  - `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`
  - `/posts/ai-creators-future-game-development/`
- No mass deletion, no `/posts/` to `/blog/` migration, and no URL-changing cleanup has been performed.

## Homepage / Service-Hub Status

- Homepage is service-hub focused.
- Auto-rendered recent legacy post feed is hidden from the homepage.
- Homepage highlights reviewed job site profiles, reviewed career guides, practical job search guides, and the legacy archive as secondary.
- Jobplorer now reads as a structured service hub rather than a news-feed blog.

## Deployment / Cache Notes

- Canada country guide deployment verification is documented.
- South Korea and Canada country guide routes are live.
- Cloudflare HTML cache behavior remains an operational watch item for newly published routes.
- CNAME mismatch remains intentionally untouched.

## Remaining Risks

- Search Console data for the four rewritten legacy posts is still missing.
- Old auto-news content quality still needs triage.
- United States official-source verification remains incomplete.
- CNAME mismatch remains intentionally untouched.
- Cloudflare HTML cache behavior can temporarily obscure newly deployed pages.

## Recommended Next Priority Options

A. Fill Search Console data for the four rewritten legacy posts.

B. Continue United States manual source verification.

C. Start another country guide draft only after source model review.

D. Continue small-batch legacy rewrites only after Search Console review confirms the current rewrite batch is stable.

E. Consider CNAME cleanup later, but only after a deployment safety check and owner approval.

## Recommended Immediate Next Step

Fill Search Console data for the four rewritten legacy posts first. If Search Console data is unavailable, continue United States manual source verification.
