# Jobplorer Phase 3C United States Official Review Result

## Purpose

Phase 3C performed an official-source review pass for the United States country guide draft only. The goal was to improve the draft with cautious, source-aware wording while keeping it unpublished.

## Scope

Changed:

- `content/country-guides/united-states.md`
- `docs/jobplorer_phase3c_united_states_official_review_result.md`

Not changed:

- South Korea and Canada country guide drafts
- LinkedIn, Indeed, or Glassdoor job site pages
- Existing `content/posts/*.md` article files
- `config.toml`, `CNAME`, layouts, themes, public files, or Cloudflare settings

## Official Sources Checked

The following official or government source URLs were checked from the local environment:

| Source | URL | Result |
| --- | --- | --- |
| CareerOneStop homepage | `https://www.careeronestop.org/` | HTTP 403 from this environment |
| CareerOneStop About | `https://www.careeronestop.org/AboutUs/AboutUs.aspx` | HTTP 403 from this environment |
| CareerOneStop State Job Banks | `https://www.careeronestop.org/JobSearch/FindJobs/state-job-banks.aspx` | HTTP 403 from this environment |
| CareerOneStop American Job Centers | `https://www.careeronestop.org/LocalHelp/AmericanJobCenters/find-american-job-centers.aspx` | HTTP 403 from this environment |
| USAJOBS homepage | `https://www.usajobs.gov/` | HTTP 403 from this environment |
| USAJOBS Help | `https://help.usajobs.gov/` | HTTP 403 from this environment |
| U.S. Department of Labor homepage | `https://www.dol.gov/` | HTTP 200 |
| U.S. Department of Labor Employment and Training Administration | `https://www.dol.gov/agencies/eta` | HTTP 200 |
| U.S. Department of Labor Jobs page | `https://www.dol.gov/general/jobs` | HTTP 200 |
| U.S. Department of Labor workforce investment page | `https://www.dol.gov/agencies/eta/workforce-investment` | HTTP 200 |

Because CareerOneStop and USAJOBS returned HTTP 403 from this environment, their details were not treated as fully verified in this phase.

## Fields Reviewed

Reviewed and cautiously adjusted:

- `title`
- `description`
- `jobSearchStartingPoints`
- `officialSourcesToCheck`
- Visible draft note
- Body wording about official-source status
- Body wording about limitations and source verification

Preserved:

- `country: "United States"`
- `region: "North America"`
- `primaryLanguage`
- `guideType`
- `majorJobSiteCategories`
- `usefulFor`
- `limitations`
- `draft: true`

## Fields Left Cautious Or Still Needing Review

These areas still need additional official-source verification before publication:

- USAJOBS public employment resource wording
- CareerOneStop resource wording
- State workforce resource directory wording
- Any current availability, policy, or account-related details for specific job resources
- Any exact resource descriptions that require official page confirmation

The draft does not include visa, immigration, legal, labor, tax, relocation, salary, hiring, or benefit guidance.

## United States Draft Status

- `draft: true`
- `reviewStatus: "needs-official-review"`
- `lastReviewed: ""`

The United States country guide remains unpublished.

## Review Status Decision

The review status was kept as `needs-official-review`.

Reason: the U.S. Department of Labor pages were reachable, but key official starting points such as CareerOneStop and USAJOBS could not be verified from this environment due to HTTP 403 responses. The draft now states this limitation directly and avoids unsupported claims.

## Production Build Result

Production build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase3c-build
```

Result:

- Build passed.
- Duplicate target warnings were not reported.
- `/country-guides/united-states/` was not generated in production output because the page remains a draft.

Path warning build command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase3c-pathwarnings
```

Result:

- Build passed.
- Duplicate target warnings were not reported.

## Draft Build Result

Draft build command:

```sh
hugo --gc --minify -D --destination /tmp/jobplorer-phase3c-draft-build
```

Result:

- Draft build passed.
- `/country-guides/united-states/` was generated only when drafts were included with `-D`.

## /posts/ Preservation Result

- `content/posts` article count remains 268.
- Published `/posts/` URL count remains 258.
- No existing `content/posts/*.md` article files were changed.

## Job Site Preservation Result

- LinkedIn remains `draft: false` and `reviewStatus: "reviewed"`.
- Indeed remains `draft: true` and `reviewStatus: "needs-official-review"`.
- Glassdoor remains `draft: true` and `reviewStatus: "needs-official-review"`.
- No job site profile files were changed.

## Country Draft Preservation Result

- South Korea remains `draft: true` and `reviewStatus: "needs-official-review"`.
- Canada remains `draft: true` and `reviewStatus: "needs-official-review"`.
- South Korea and Canada files were not changed.

## Risk Wording Safeguards

The United States draft avoids:

- Fake rankings or ratings
- Best-country wording
- Job, interview, hiring, salary, visa, immigration, legal, tax, labor, relocation, or benefit guarantees
- Live job count claims
- Official partnership implications
- Affiliate links

The draft tells users to verify official government, employer, and job-site sources for current details.

## Recommended Next Step

Proceed to Phase 3C-B publish-readiness review only after blocked official sources can be verified, or continue official-source review if those sources remain inaccessible.
