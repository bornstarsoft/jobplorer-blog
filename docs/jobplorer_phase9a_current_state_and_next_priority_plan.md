# Jobplorer Phase 9A Current State and Next Priority Plan

## Purpose

Phase 9A summarizes Jobplorer's current live state after the homepage service-hub update and identifies the safest next priorities. This phase is docs-only and does not change site content.

## Current Live Site Structure

Jobplorer is now positioned as a global job information hub rather than a news-first blog.

Current live structure:

- Homepage: service-hub focused, with reviewed profiles, career guide links, practical job search guidance, and legacy archive framing.
- Job Site Profiles: reviewed profiles are live for LinkedIn, Indeed, and Glassdoor.
- Career Guides: Software Developers is live and reviewed.
- Country Guides: model and starter drafts exist, but country guide pages remain unpublished.
- Career Guide Drafts: Game Developers and Remote Workers remain draft-only.
- Legacy Archive: `/posts/` remains preserved as the Legacy Job News Archive.
- Legacy Rewrites: 4 legacy posts have been rewritten and internally linked.

Homepage recent legacy post cards are hidden through Ananke config while `/posts/` remains available as a secondary archive.

## Completed Milestones

### Phase 0 Technical Stabilization

- Hugo build stability was restored.
- Duplicate target warnings were resolved.
- Existing `/posts/` legacy URLs were preserved.
- Deployment verification confirmed the technical baseline.

### Phase 1 Service MVP Structure

- Jobplorer was repositioned as a service hub.
- Core landing pages and trust/policy pages were created.
- Navigation was updated around job sites, country guides, career guides, tools, guides, archive, and trust pages.

### Job Site Profiles

Reviewed and published:

- LinkedIn
- Indeed
- Glassdoor

All three are live, reviewed, and written with cautious official-source-based wording.

### Career Guide

Reviewed and published:

- Software Developers

The guide is live, reviewed, and framed as job search research guidance rather than career outcome advice.

### Country Guides

Completed:

- Country Guide model
- Publishing checklist
- Drafts for United States, South Korea, and Canada

Not published:

- United States
- South Korea
- Canada

The United States guide remains blocked by incomplete manual official-source verification because some official sources were inaccessible from the Codex environment.

### Legacy Posts

Four legacy posts have been rewritten into evergreen Jobplorer guidance while preserving original `/posts/` URLs:

- `/posts/the-rise-of-ai-in-recruitment/`
- `/posts/the-struggles-of-young-job-seekers/`
- `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`
- `/posts/ai-creators-future-game-development/`

Internal links were added from service pages to these rewritten posts.

### Homepage

Completed:

- Homepage service-hub sections were added.
- Reviewed profiles are visible on the homepage.
- Software Developers is highlighted on the homepage.
- Practical rewritten guidance is linked from the homepage.
- Legacy archive is framed as secondary.
- Ananke recent post cards are hidden on the homepage.

## Remaining Risks

- Search Console data is still missing for the rewritten legacy posts.
- Old auto-news content quality remains uneven across the legacy archive.
- CNAME mismatch remains intentionally untouched.
- United States country guide official-source verification is still blocked or incomplete.
- Cloudflare cache behavior can delay visible updates or sitemap freshness.
- The `/posts/` archive remains large and should be changed only after traffic, canonical, and Search Console review.
- Country, career, salary, visa, labor, tax, and legal topics remain high-risk and require cautious wording.

## Recommended Next Priority Options

### A. Fill Search Console Data for 4 Rewritten Posts

Best when owner Search Console access is available.

Why it matters:

- Confirms whether rewritten URLs remain indexed.
- Shows clicks, impressions, CTR, top queries, and canonical status.
- Reduces the risk of continuing legacy rewrites based only on assumptions.

### B. Review and Publish Game Developers Career Guide

Best when Search Console data is not yet available.

Why it matters:

- Extends the career guide library.
- Fits Jobplorer's global job information hub positioning.
- Can connect naturally to the rewritten AI-assisted game development legacy post.

### C. Continue Job Site Internal-Link Expansion

Best after basic live pages are stable.

Why it matters:

- Helps users move between reviewed job site profiles and practical guidance.
- Can improve discoverability without publishing new high-risk pages.

Important limit:

- Add links in small batches only.

### D. Start Country Guide Manual Source Verification

Best when owner can manually verify blocked official sources.

Why it matters:

- Unblocks the United States guide.
- Builds toward publishing one reviewed country guide.

Important limit:

- Do not publish country guides without official-source verification.

### E. Continue Controlled Legacy Post Triage

Best after Search Console data is reviewed.

Why it matters:

- Reduces old auto-news quality risk.
- Converts selected legacy content into evergreen Jobplorer resources.

Important limit:

- Rewrite in batches of 1 to 3 only.
- Do not delete, noindex, rename, or change slugs without Search Console review.

## Recommended Immediate Next Step

If Search Console data is available, fill and interpret the Search Console data for the 4 rewritten legacy posts first.

If Search Console data is not available, proceed with Phase 9B: Game Developers official-source review while keeping the page draft-only until review and owner approval are complete.
