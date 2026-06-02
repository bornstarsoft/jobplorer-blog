# Jobplorer Renewal Decision Plan

## New Product Positioning

Jobplorer = Explore job sites, country guides, and career paths around the world.

Jobplorer should become a durable global job information hub for people comparing job sites, researching country-specific job search norms, exploring career paths, and using practical job seeker tools.

It is not a live job scraping board.

## MVP Structure

Planned MVP routes:

- `/job-sites/`
- `/job-sites/by-country/`
- `/job-sites/by-career/`
- `/country-guides/`
- `/career-guides/`
- `/remote-jobs/`
- `/job-seeker-tools/`
- `/guides/`
- `/posts/` as legacy blog
- `/about/`
- `/contact/`
- `/privacy/`
- `/terms/`

The new sections should be introduced without breaking existing `/posts/` URLs.

## Content Rules

- No fake rankings.
- No fake ratings.
- No job guarantees.
- No visa, legal, or labor advice wording.
- No wording that implies official partnership unless it is verifiably true and approved.
- Use cautious wording.
- Use official sources before publishing job site reviews.
- Use a draft-first workflow.
- Do not present automated summaries as reviewed evergreen guides.
- Do not imply that Jobplorer provides live job listings unless a future feature explicitly supports that.
- Do not publish claims about fees, countries, hiring volume, user counts, ownership, or availability without checking current sources.

## Existing Content Triage Categories

A. Keep / rewrite

Content that fits the new direction and can become evergreen Jobplorer material after careful rewriting and source review.

B. Draft / noindex / archive candidate

Thin, duplicated, outdated, or auto-summary content that may not deserve public prominence. These posts should be reviewed before any noindex, draft, or archive action.

C. Off-position content

Content unrelated to job sites, country guides, career guides, or job seeker tools. This may become an archive or deletion candidate later, but should not be deleted during early phases.

D. Restructure into Job Site / Country Guide / Career Guide

Content with useful themes but poor current format. These can inform future evergreen pages without necessarily keeping the original post as a primary destination.

## Phase Plan

### Phase 0B: Docs-Only

Create planning documents that capture Phase 0A findings, URL preservation policy, and renewal decisions. Do not change runtime behavior.

### Phase 0C: Build Compatibility Plan

Plan how to address Hugo build failure causes:

- `paginate` compatibility
- Korean-formatted dates
- malformed/no-front-matter posts
- duplicate slug groups
- local Hugo version mismatch with live Hugo `0.128.0`

This phase should still avoid broad content rewrites.

### Phase 1A: Service Navigation and Landing Pages

Draft the new site structure and service navigation for Job Sites, Country Guides, Career Guides, Remote Jobs, Job Seeker Tools, and Guides.

Keep `/posts/` as a legacy blog route.

### Phase 1B: About / Contact / Privacy / Terms

Draft basic trust and policy pages using cautious, non-legal language. Avoid making claims about partnerships, job outcomes, live listings, or legal/visa/labor guidance.

### Phase 2: Job Site Review Model

Define a reusable job site review template based on verifiable public sources and cautious editorial language.

The model should avoid rankings and ratings unless a future evidence policy supports them.

### Phase 3: Starter Drafts

Create starter drafts for:

- Job site overview pages
- Country guide pages
- Career guide pages
- Remote job resources
- Job seeker tools

All should remain drafts until reviewed.

### Phase 4: One Reviewed Publish

Publish one carefully reviewed evergreen page after checking:

- Source quality
- Claims
- URLs
- Internal navigation
- Sitemap effect
- Existing `/posts/` preservation

### Phase 5: Country / Career Guide Expansion

Expand country and career guide coverage using a repeatable editorial process, source checklist, and URL preservation guard.
