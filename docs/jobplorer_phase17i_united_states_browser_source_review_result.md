# Jobplorer Phase 17I United States Browser Source Review Result

## Purpose

Phase 17I uses a normal browser rendering path to re-check the official sources that previously returned HTTP 403 to command-line requests.

The goal is to decide whether the United States country guide can move from `needs-official-review` to `reviewed` while remaining unpublished.

## Phase 17H Commit

The Phase 17H deployment report was committed before this review:

```text
d97eb51 Document Jobplorer service hub deployment
```

No push was performed in Phase 17I.

## Search Console Performance Access

Search Console Performance data remains the primary analytics priority.

The browser reached the Google sign-in page for the `jobplorer.com` Search Console property, but the isolated browser session was not authenticated. No login, account, permission, or Search Console setting action was attempted.

The Phase 16J Performance tracking sheet therefore remains unchanged. No clicks, impressions, CTR, position, or query value was invented.

## Official Sources Checked

Review date: 2026-07-25

### USAJOBS Homepage

- URL: `https://www.usajobs.gov/`
- Page title: `USAJOBS - The Federal Government's official employment site`
- Operator shown: U.S. Office of Personnel Management
- Browser access: successful
- Safely supports:
  - USAJOBS is the federal government's official employment site.
  - Users can search federal jobs.
  - Official pages describe profiles, resumes, saved searches, applications, and job announcements.
- Does not support:
  - job availability guarantees
  - interview or hiring guarantees
  - universal eligibility claims

### USAJOBS Help Center

- URL: `https://help.usajobs.gov/`
- Final URL: `https://help.usajobs.gov/how-to`
- Page title: `USAJOBS Help Center - How to...`
- Operator: USAJOBS / U.S. Office of Personnel Management
- Browser access: successful
- Safely supports:
  - step-by-step help for accounts and profiles
  - job announcement and application guidance
  - resume and document guidance
  - search, filters, and saved-search guidance
- Does not support:
  - Jobplorer legal or eligibility advice
  - guaranteed application or hiring outcomes

### CareerOneStop Homepage

- URL: `https://www.careeronestop.org/`
- Page title: `Careers and Career Information - CareerOneStop`
- Operator shown: sponsored by the U.S. Department of Labor, Employment and Training Administration
- Browser access: successful
- Safely supports:
  - career exploration starting points
  - training and education research
  - job search planning
  - local help and American Job Center discovery
- Does not support:
  - guaranteed employment outcomes
  - universal local service availability

### CareerOneStop Job Search

- URL: `https://www.careeronestop.org/JobSearch/job-search.aspx`
- Page title: `Job Search | CareerOneStop`
- Browser access: successful
- Safely supports:
  - job search planning
  - employer research
  - networking
  - job bank and local-help starting points
  - resume, application, and interview research
- Does not support:
  - guaranteed job matches, interviews, or hiring

### CareerOneStop Career Exploration

- URL: `https://www.careeronestop.org/ExploreCareers/explore-careers.aspx`
- Page title: `Explore Careers | CareerOneStop`
- Browser access: successful
- Safely supports:
  - self-assessment starting points
  - career profile and career cluster research
  - career planning and industry research
- Does not support:
  - guaranteed career fit or outcomes

### CareerOneStop American Job Centers

- URL: `https://www.careeronestop.org/LocalHelp/AmericanJobCenters/american-job-centers.aspx`
- Page title: `American Job Center Finder | CareerOneStop`
- Browser access: successful
- Safely supports:
  - American Job Centers provide employment-related help and local service starting points.
  - Services can include job search assistance, career counseling, workshops, and resource access.
  - Services vary by location.
- Avoided:
  - live center-count claims
  - universal service or eligibility claims

### CareerOneStop State Job Banks

- URL: `https://www.careeronestop.org/JobSearch/FindJobs/state-job-banks.aspx`
- Page title: `State job banks | CareerOneStop`
- Browser access: successful
- Safely supports:
  - CareerOneStop provides a state-by-state job bank directory.
  - Registration and policies can vary by state.
- Does not support:
  - identical processes or availability across every state

### California EDD CalJOBS Overview

- URL: `https://edd.ca.gov/en/Jobs_and_Training/caljobs`
- Page title: `CalJOBS Overview`
- Operator: California Employment Development Department
- Browser access: successful
- Safely supports:
  - CalJOBS is California's online workforce resource for job seekers and employers.
  - Its official overview describes job search, resume, employer research, alerts, and application starting points.
- Does not support:
  - treating one state's process as a national standard
  - guaranteed job availability or hiring outcomes

The direct `caljobs.ca.gov` application endpoint displayed a security-service access block in this browser. The accessible California EDD overview was used as the official state-source evidence instead.

## United States Guide Changes

Updated:

`content/country-guides/united-states.md`

Changes:

- Replaced the blocked-source description with a reviewed guide description.
- Removed pending-verification wording for USAJOBS and CareerOneStop.
- Added the directly verified official resource categories to front matter.
- Added cautious, source-based descriptions of:
  - USAJOBS
  - USAJOBS Help Center
  - CareerOneStop
  - American Job Centers
  - state job banks
  - California EDD CalJOBS
- Preserved official-source reminders and changeable-service wording.
- Added no live job counts, rankings, guarantees, or legal, visa, immigration, labor, tax, salary, eligibility, or relocation advice.

## Review Status Decision

The directly rendered official pages support the guide's remaining cautious claims.

The guide now uses:

```yaml
lastReviewed: "2026-07-25"
reviewStatus: "reviewed"
draft: true
```

The guide remains unpublished pending a separate owner-approved publish-readiness phase.

## Build Result

Production build:

```text
hugo --gc --minify --noBuildLock --cacheDir /tmp/jobplorer-phase17i-cache --destination /tmp/jobplorer-phase17i-build
```

Result:

- passed
- generated pages: 1,199
- United States route: not generated

Path-warning build:

```text
hugo --gc --minify --printPathWarnings --noBuildLock --cacheDir /tmp/jobplorer-phase17i-path-cache --destination /tmp/jobplorer-phase17i-pathwarnings
```

Result:

- passed
- duplicate path warnings: none

Draft build:

```text
hugo --gc --minify -D --noBuildLock --cacheDir /tmp/jobplorer-phase17i-draft-cache --destination /tmp/jobplorer-phase17i-draft-build
```

Result:

- passed
- generated pages: 1,218
- United States route: generated
- USAJOBS, CareerOneStop, CalJOBS, and the unpublished-owner-approval note were present

## Preservation Checks

- Unique production `/posts/` URLs remain 258.
- LinkedIn, Indeed, and Glassdoor remain in the production sitemap.
- Software Developers, Game Developers, and Remote Workers remain in the production sitemap.
- South Korea and Canada remain in the production sitemap.
- United States remains absent from the production route and sitemap.
- No `content/posts/*.md` file changed.
- No config, CNAME, layout, theme, public, job-site, or career-guide file changed.

## Remaining Risks

- Search Console Performance data still requires an authenticated owner session.
- Official employment resources, interfaces, and local services can change.
- The United States guide still needs a separate public-wording and publish-readiness check before any draft-status change.
- Cloudflare deployment is not relevant until a later owner-approved publication phase.

## Recommended Next Step

Phase 17J: publish-readiness review for the United States country guide while keeping `draft: true`.

That phase should:

- remove or replace any remaining unpublished-only wording
- verify that all public-facing wording remains cautious
- keep `reviewStatus: "reviewed"`
- keep `lastReviewed: "2026-07-25"`
- keep `draft: true`
- run production and draft builds

The guide should move to `draft: false` only in a later explicit owner-approved publication phase.
