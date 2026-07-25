# Jobplorer Phase 17E United States Source Access Recheck

## Purpose

Phase 17E re-checks official United States employment-resource access after the Phase 17D public technical SEO control check.

This phase is docs-only. It does not modify or publish the United States country guide or any other site content.

## Repository State

- Branch: `main`
- Phase 17D commit: `1e7018a Document Jobplorer public technical SEO control check`
- Git remote: `git@github.com:bornstarsoft/jobplorer-blog.git`
- The owner confirmed that GitHub is the correct remote for this project.
- Working tree was clean before this report was created.

## United States Draft State

The existing draft remains:

- `draft: true`
- `reviewStatus: "needs-official-review"`
- `lastReviewed: ""`

The draft already states that USAJOBS, CareerOneStop, and state workforce resources require direct verification before publication.

No changes were made to:

`content/country-guides/united-states.md`

## Official Sources Re-Checked

Re-check date: 2026-07-25

### Direct Environment Checks

| Source | URL | Result |
| --- | --- | --- |
| USAJOBS homepage | `https://www.usajobs.gov/` | HTTP 403 |
| USAJOBS Help Center | `https://help.usajobs.gov/` | HTTP 403 |
| CareerOneStop homepage | `https://www.careeronestop.org/` | HTTP 403 |
| CareerOneStop Job Search | `https://www.careeronestop.org/JobSearch/job-search.aspx` | HTTP 403 |
| CareerOneStop Career Exploration | `https://www.careeronestop.org/ExploreCareers/explore-careers.aspx` | HTTP 403 |
| CareerOneStop American Job Centers | `https://www.careeronestop.org/LocalHelp/AmericanJobCenters/american-job-centers.aspx` | HTTP 403 |
| CareerOneStop State Job Banks | `https://www.careeronestop.org/JobSearch/FindJobs/state-job-banks.aspx` | HTTP 403 |
| DOL/ETA Job Seekers | `https://www.dol.gov/agencies/eta/job-seekers` | HTTP 200 |
| DOL/ETA American Job Centers | `https://www.dol.gov/agencies/eta/american-job-centers` | HTTP 200 |

## Accessible Official Evidence

The accessible DOL/ETA Job Seekers page supports cautious statements that DOL/ETA points job seekers to resources for career exploration, training, job search, local help, and American Job Centers.

The accessible DOL/ETA American Job Centers page supports cautious statements that:

- American Job Centers form a public employment-service network.
- Services are intended for workers, job seekers, and employers.
- Available services and eligibility details can vary locally.
- Users should verify details with the relevant local American Job Center.

Official USAJOBS Help pages appeared in current search results and described job search, profile, saved-search, application, and status features. However, direct access to the USAJOBS homepage and Help Center still returned HTTP 403 from this environment.

Search-result visibility is not treated as a substitute for owner direct-page verification.

## Source Access Decision

The core access blocker is unresolved.

USAJOBS and CareerOneStop remain directly inaccessible from this environment, so the United States guide should not move to reviewed or publish-ready status.

Keep:

- `draft: true`
- `reviewStatus: "needs-official-review"`
- `lastReviewed: ""`

## Manual Verification Still Required

The owner should complete:

`docs/jobplorer_phase15b_us_manual_verification_owner_checklist.md`

Required direct browser checks:

- USAJOBS homepage
- USAJOBS Help Center
- CareerOneStop homepage
- CareerOneStop Job Search
- CareerOneStop Career Exploration
- CareerOneStop American Job Centers
- CareerOneStop State Job Banks
- At least one official state workforce resource directory

For each source, record:

- Accessibility
- Page title
- Official operator
- Date checked
- Safely supported claims
- Unsupported claims
- Screenshot or note path, if available

## Safety Policy

- Do not publish the United States guide.
- Do not change its URL, slug, filename, or draft status.
- Do not add visa, immigration, legal, labor, tax, salary, hiring, relocation, eligibility, or government-benefit advice.
- Do not infer claims from search snippets alone.
- Do not add rankings, guarantees, affiliate links, partnership claims, or live job-count claims.

## Recommended Next Step

Primary:

- Complete the Phase 15B owner checklist in a normal signed-in browser, then run Phase 15C manual verification interpretation.

Independent analytics priority:

- Sign in to Google Search Console, fill the Phase 16J Last 28 days Performance data, and run Phase 16M interpretation.
