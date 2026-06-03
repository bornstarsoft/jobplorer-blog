# Jobplorer Phase 4C Software Developers Official Review Result

## Purpose

Phase 4C performed an official-source review pass for the Software Developers career guide draft only. The page remains unpublished.

## Scope

Changed:

- `content/career-guides/software-developers.md`
- `docs/jobplorer_phase4c_software_developers_official_review_result.md`

Not changed:

- Game Developers or Remote Workers career guide drafts
- LinkedIn, Indeed, or Glassdoor job site pages
- United States, South Korea, or Canada country guide drafts
- Existing `content/posts/*.md` article files
- `config.toml`, `CNAME`, layouts, themes, public files, or Cloudflare settings

## Official Sources Checked

| Source | URL | Result | Use in review |
| --- | --- | --- | --- |
| U.S. Bureau of Labor Statistics Occupational Outlook Handbook: Software Developers, Quality Assurance Analysts, and Testers | `https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm` | Local `curl -I` returned HTTP 403, but browser fetch successfully retrieved the official BLS page | Used only as broad official occupation context; no salary, pay, education, or job-outlook details were added |
| O*NET OnLine Software Developers summary | `https://www.onetonline.org/link/summary/15-1252.00` | HTTP 200 | Used as broad official occupation context |
| O*NET OnLine Software Developers details | `https://www.onetonline.org/link/details/15-1252.00` | HTTP 200 | Used as broad official occupation context |
| BLS Occupational Outlook Handbook root | `https://www.bls.gov/ooh/` | Local `curl -I` returned HTTP 403 | Documented as blocked from local curl; not used for additional claims |

No third-party blogs or unofficial sources were used as source of truth.

## Fields Reviewed

Reviewed and cautiously adjusted:

- `title`
- `description`
- `officialSourcesToCheck`
- `lastReviewed`
- `reviewStatus`
- Visible draft note
- Body wording about official occupation resources
- Body wording about employer-specific verification

Preserved as cautious, broad research categories:

- `targetAudience`
- `jobSearchStartingPoints`
- `commonJobSiteCategories`
- `portfolioOrResumeNotes`
- `usefulFor`
- `limitations`
- `draft: true`

## Fields Left Cautious Or Still Needing Review

The draft intentionally avoids:

- Salary amounts or salary expectations
- Certification requirements or certification advice
- Exact job-count claims
- Exact hiring, interview, or career outcome claims
- Platform-specific job-site feature claims
- Employer-specific requirement claims

Future versions that name specific job sites, employers, education providers, certification providers, or tools should verify those sources directly before publishing updated claims.

## Software Developers Draft Status

- `draft: true`
- `reviewStatus: "reviewed"`
- `lastReviewed: "2026-06-03"`

The Software Developers career guide remains unpublished.

## Review Status Decision

The draft was moved to `reviewStatus: "reviewed"` while staying `draft: true`.

Reason: all remaining claims are either supported by official occupation resources at a broad level or are framed as cautious research starting points. The page does not include salary data, certification rules, legal/visa/labor/tax advice, hiring guarantees, interview guarantees, live job counts, or platform-specific claims.

## Production Build Result

Production build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase4c-build
```

Result:

- Build passed.
- Duplicate target warnings were not reported.
- `/career-guides/software-developers/` was not generated in production output because the page remains a draft.

Path warning build command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase4c-pathwarnings
```

Result:

- Build passed.
- Duplicate target warnings were not reported.

## Draft Build Result

Draft build command:

```sh
hugo --gc --minify -D --destination /tmp/jobplorer-phase4c-draft-build
```

Result:

- Draft build passed.
- `/career-guides/software-developers/` was generated only when drafts were included with `-D`.

## /posts/ Preservation Result

- `content/posts` article count remains 268.
- Published `/posts/` URL count remains 258.
- No existing `content/posts/*.md` article files were changed.

## Job Site / Country Guide / Career Guide Preservation Result

- LinkedIn remains `draft: false` and `reviewStatus: "reviewed"`.
- Indeed remains `draft: true` and `reviewStatus: "needs-official-review"`.
- Glassdoor remains `draft: true` and `reviewStatus: "needs-official-review"`.
- United States remains `draft: true` and `reviewStatus: "needs-official-review"`.
- South Korea remains `draft: true` and `reviewStatus: "needs-official-review"`.
- Canada remains `draft: true` and `reviewStatus: "needs-official-review"`.
- Game Developers remains `draft: true` and `reviewStatus: "needs-official-review"`.
- Remote Workers remains `draft: true` and `reviewStatus: "needs-official-review"`.

Only the Software Developers career guide draft was changed.

## Risk Wording Safeguards

The Software Developers draft avoids:

- Fake rankings or ratings
- "Best career" wording
- Partnership claims
- Affiliate links
- Live job count claims
- Salary data or salary advice
- Job, interview, hiring, salary, visa, immigration, legal, labor, tax, certification, or career outcome guarantees
- Professional career counseling advice

The page tells readers to check official sources and employer pages for current details.

## Recommended Next Step

Proceed to Phase 4C-B publish-readiness review for Software Developers, or continue official-source review if the owner wants additional official job-site, employer, education, certification, or tool checks before publication approval.
