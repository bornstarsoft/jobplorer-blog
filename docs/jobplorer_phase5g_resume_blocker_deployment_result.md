# Jobplorer Phase 5G Resume Blocker Deployment Result

## Purpose

Phase 5G performed a controlled push and deployment verification for the single rewritten legacy post:

- File: `content/posts/2026-05-19-jobs-224142.md`
- URL: `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`

No source files were modified during this deployment verification phase.

## Pre-push Verification

Repo guard:

- Branch: `main`
- Phase 5F was committed as `da85b8c` with message `Rewrite resume blocker legacy post`.
- Local `main` was ahead of `origin/main` and behind 0 before push.

Build commands:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase5g-build
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase5g-pathwarnings
```

Results:

- Production build passed.
- Path-warning build passed.
- Duplicate target warnings were not reported.
- `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/` was generated locally.
- Published `/posts/` URL count remained 258.

## Push Result

Remote freshness check:

```sh
git fetch --all --prune
git status -sb
```

Result:

- Local `main` was ahead 2 and behind 0.

Push command:

```sh
git push origin main
```

Result:

- Push succeeded.
- `origin/main` advanced from `152cf91` to `da85b8c`.
- No force push was used.

## Live Target URL Verification

Live route checks:

| URL | Result |
| --- | --- |
| `https://jobplorer.com/posts/why-87-percent-of-job-seekers-abandon-their-resumes/` | HTTP 200 |
| `https://jobplorer.com/posts/why-87-percent-of-job-seekers-abandon-their-resumes/?v=da85b8c` | HTTP 200 |

Live content checks:

- Rewritten title appears: `Resume Blockers: How to Review Application Materials Before Applying`.
- Guidance section appears: `Where Job Seeker Tools May Help`.
- Checklist section appears: `Practical Checklist Before Applying`.
- Final caution appears and tells readers to verify official employer pages, job postings, school or career-center resources, and job-site policies.

## Sitemap Preservation

Live sitemap downloaded to:

```text
/tmp/jobplorer-phase5g/live-sitemap.xml
```

Results:

- Target URL is present: `https://jobplorer.com/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`.
- Unique `/posts/` URL count remains 258.
- LinkedIn URL is still present: `https://jobplorer.com/job-sites/sites/linkedin/`.
- Software Developers URL is still present: `https://jobplorer.com/career-guides/software-developers/`.
- Previous AI recruitment rewrite URL is still present: `https://jobplorer.com/posts/the-rise-of-ai-in-recruitment/`.
- Previous entry-level rewrite URL is still present: `https://jobplorer.com/posts/the-struggles-of-young-job-seekers/`.

## Risk Wording Check

Confirmed absent as affirmative or promotional claims:

- Resume-tool guarantee.
- Job guarantee.
- Hiring guarantee.
- Salary guarantee.
- Legal advice.
- Labor advice.
- Visa advice.
- Tax advice.
- Fake ranking.
- Fake rating.
- Affiliate wording.
- Partnership wording.

The live page uses cautious wording and says Jobplorer does not promise interviews, hiring decisions, compensation outcomes, or career outcomes. It also reminds readers that employer requirements, job-site policies, resume tool features, and application workflows can change.

## Remaining Risks

- Search Console should be monitored after deployment.
- The legacy post has been rewritten once; further legacy rewrites should remain small-batch and URL-preserving.
- Old auto-news content quality still needs broader triage.
- Future rewrites should continue avoiding ranking, rating, guarantee, affiliate, partnership, legal, labor, visa, tax, salary, and hiring-outcome claims.

## Recommended Next Step

Select one more low-risk rewrite candidate, or begin Search Console-informed triage before another rewrite.
