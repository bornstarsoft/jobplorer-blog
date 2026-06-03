# Jobplorer Country Guide Model

## Purpose

Country Guides should help readers understand where to start researching job sites, job search resources, and official information sources in a specific country.

The model is designed for cautious, source-based country research pages. It is not a relocation guide, immigration guide, legal guide, tax guide, labor-law guide, live job board, or employment guarantee.

## What Country Guides Are

Jobplorer Country Guides are informational starting points that can help users explore:

- Common job search resource categories in a country.
- Official public sources to check before making decisions.
- Country-specific job search topics that may need verification.
- Practical research paths for comparing job sites, employers, and public employment resources.

Every public Country Guide should remind readers that requirements, policies, job markets, official procedures, and job-site details can change.

## What Country Guides Are Not

Country Guides must not be presented as:

- Legal advice.
- Visa advice.
- Immigration advice.
- Labor advice.
- Tax advice.
- Relocation advice.
- Salary guarantees.
- Hiring guarantees.
- Job guarantees.
- Official government, employer, job-site, or agency partnerships.
- Live job listings or scraped job inventory.
- Country rankings or job-site rankings.

## Required Front Matter Fields

Future Country Guide pages should include these fields:

```yaml
title: ""
description: ""
country: ""
region: ""
primaryLanguage: ""
guideType: ""
jobSearchStartingPoints: []
officialSourcesToCheck: []
majorJobSiteCategories: []
usefulFor: []
limitations: []
lastReviewed: ""
reviewStatus: "needs-official-review"
draft: true
```

## Field Guidance

- `title`: Page title. Use a stable country-guide title after verification.
- `description`: Short cautious summary for previews and search.
- `country`: Country covered by the guide.
- `region`: Broad region such as North America, East Asia, Europe, or another non-ranked grouping.
- `primaryLanguage`: Main language or languages to consider. Avoid claiming exclusivity unless verified.
- `guideType`: Broad type such as "country job search guide" or "country resource guide".
- `jobSearchStartingPoints`: Non-ranked starting points for research.
- `officialSourcesToCheck`: Official government, public employment, or regulator sources users should verify directly.
- `majorJobSiteCategories`: Broad categories such as public employment services, general job boards, professional networks, company career pages, or recruiter platforms.
- `usefulFor`: Reader scenarios where the guide may be useful.
- `limitations`: Caution notes, including that policies and requirements can change.
- `lastReviewed`: ISO date when official-source review was completed.
- `reviewStatus`: Current editorial review state.
- `draft`: `true` until official-source review is complete and the owner approves publication.

## Review Status Values

- `draft`: Early draft, not ready for publication.
- `needs-official-review`: Draft exists but official sources have not been fully checked.
- `reviewed`: Official-source review completed and the page is approved for publication.
- `needs-update`: Page was previously reviewed but may be outdated or needs a source refresh.

## Cautious Wording Rules

Use phrases such as:

- "starting points"
- "may be useful"
- "can help users explore"
- "check official sources for current details"
- "requirements and policies can change"
- "verify directly before applying or making decisions"

Avoid phrases such as:

- "best country for jobs"
- "best job sites"
- "guaranteed employment"
- "visa-safe"
- "legally compliant"
- "official partner"
- "complete immigration guide"
- "salary guarantee"

## Official-source Requirements

Country Guides should verify stable public facts from official sources before publication.

At minimum, check:

- Official government employment or labor-market resources where available.
- Official immigration or visa resources only as sources to consult, without interpreting eligibility or giving advice.
- Official tax or labor pages only as sources to consult, without giving advice.
- Official public employment services.
- Employer or job-site official pages when discussing specific resources.

If a fact cannot be verified, either omit it or frame it as something the reader should check directly.

## Prohibited Advice and Claims

Country Guides must not provide:

- Legal advice.
- Visa advice.
- Immigration advice.
- Labor advice.
- Tax advice.
- Salary guarantees.
- Hiring guarantees.
- Job guarantees.
- Unsupported salary or hiring claims.
- Unverified government requirement claims.
- Official partnership implications.

## Public Page Disclaimer Pattern

Each public Country Guide should include a short note similar to:

> This guide is a job search research starting point, not legal, visa, immigration, tax, labor, or relocation advice. Requirements, policies, job postings, and official procedures can change. Check official government, employer, and job-site sources before applying or making decisions.
