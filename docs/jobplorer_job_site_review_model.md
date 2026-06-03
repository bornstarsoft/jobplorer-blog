# Jobplorer Job Site Review Model

## Purpose

Job Site review pages should help readers compare job search websites, career platforms, and official career resources as starting points for their own research.

The model is designed for cautious, source-based profiles. It is not a ranking system, rating system, live job board, scraping workflow, endorsement program, or employment guarantee.

## What Review Pages Are

Jobplorer Job Site review pages are informational profiles that can help users understand:

- What a job site or career platform appears to offer.
- Which countries, regions, job types, or user groups it may be useful for.
- What users should verify on the official website before relying on the information.
- How the site compares with similar starting points in broad, non-ranked terms.

Every public review page should remind readers that features, pricing, availability, policies, country support, and job postings can change.

## What Review Pages Are Not

Jobplorer review pages must not be presented as:

- Live job listings.
- Scraped job inventory.
- Fake rankings or numbered "best" lists.
- Fake ratings or scorecards.
- Official partnerships, endorsements, or certifications.
- Guarantees of employment, interviews, hiring outcomes, salary outcomes, visa eligibility, legal compliance, labor-law outcomes, or tax outcomes.
- Visa, legal, labor, or tax advice.

## Required Front Matter Fields

Future Job Site review pages should include these fields:

```yaml
title: ""
description: ""
siteType: ""
officialUrl: ""
countryRegion: []
bestFor: []
jobTypes: []
remoteJobs: ""
beginnerFriendly: ""
accountRequired: ""
pricingNote: ""
strengths: []
limitations: []
usefulFor: []
similarSites: []
lastReviewed: ""
reviewStatus: "needs-official-review"
draft: true
```

## Field Guidance

- `title`: Page title. Use the official site name only after verification.
- `description`: Short cautious summary for search and previews.
- `siteType`: Broad type such as job board, professional network, company career portal, public employment service, or niche hiring platform.
- `officialUrl`: Official website URL verified from the source itself.
- `countryRegion`: Countries or regions the page discusses. Avoid claiming full coverage unless verified.
- `bestFor`: Non-ranked, cautious use cases such as "professional networking" or "entry-level research".
- `jobTypes`: Broad job categories only. Do not claim current live job availability unless verified and current.
- `remoteJobs`: Cautious note such as "varies by posting" or "check current filters on the official site".
- `beginnerFriendly`: Cautious note based on public interface and documentation, not a guarantee.
- `accountRequired`: State only what can be verified from official public information.
- `pricingNote`: Use cautious language. Pricing, plans, and paid features can change.
- `strengths`: Source-based factual strengths. Avoid promotional or partnership wording.
- `limitations`: Practical limitations or verification reminders.
- `usefulFor`: Reader scenarios where the site may be a starting point.
- `similarSites`: Non-ranked related sites for comparison. Do not imply superiority.
- `lastReviewed`: ISO date when official-source review was completed.
- `reviewStatus`: Current editorial review state.
- `draft`: `true` until official-source review is complete and the owner approves publishing.

## Review Status Values

- `draft`: Early draft, not ready for publication.
- `needs-official-review`: Draft exists but official public sources have not been fully checked.
- `reviewed`: Official-source review completed and the page is approved for publication.
- `needs-update`: Page was previously reviewed but may be outdated or needs a source refresh.

## Cautious Wording Rules

Use phrases such as:

- "may be useful for"
- "can help users explore"
- "starting point"
- "check the official website for current details"
- "availability can change"
- "verify directly before applying or making decisions"

Avoid phrases such as:

- "best overall"
- "guaranteed jobs"
- "official partner"
- "verified by the platform" unless a current official source confirms it
- "live job count"
- "visa-safe"
- "legally compliant"

## Source Requirements

Official review should verify stable public facts from official websites or clearly cited sources. A public Jobplorer page should not rely on memory, marketing assumptions, or automated claims.

At minimum, check:

- Official homepage and about/company pages.
- Official help, pricing, product, or candidate pages where relevant.
- Official terms, privacy, and policy pages when discussing account, pricing, or user obligations.
- Current public information for country support, remote work filters, and job categories.

If a fact cannot be verified, either omit it or mark it cautiously as something readers should check directly.

## Public Page Disclaimer Pattern

Each public review should include a short note similar to:

> Job site features, pricing, availability, policies, and job postings can change. Check the official website and current job postings before applying or making decisions. Jobplorer does not guarantee employment, interviews, hiring outcomes, salary outcomes, visa eligibility, legal compliance, labor-law outcomes, or tax outcomes.
