# Jobplorer Phase 5F Resume Blocker Rewrite Result

## Purpose

Phase 5F performed a controlled rewrite test for one more legacy `/posts/` article. The goal was to convert an auto-news style post into evergreen Jobplorer guidance about resume blockers, application material review, and cautious use of job seeker tools while preserving the legacy URL.

## Target File And URL

- Target file: `content/posts/2026-05-19-jobs-224142.md`
- Original title: `Why 87% of Job Seekers Abandon Their Resumes`
- Updated title: `Resume Blockers: How to Review Application Materials Before Applying`
- Date preserved: `2026-05-19`
- Slug preserved: `why-87-percent-of-job-seekers-abandon-their-resumes`
- Legacy URL preserved: `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`

## Rewrite Summary

The target post was rewritten from a time-sensitive auto-news summary into evergreen guidance for job seekers reviewing resumes and application materials.

The revised article covers:

- What resume blockers can mean.
- How to compare a resume with official job postings.
- Where job seeker tools may help.
- What not to assume about resume tools.
- A practical checklist before applying.
- A final caution to verify official employer pages, job postings, school or career-center resources, and job-site policies.

No other legacy post was edited.

## URL Preservation Result

- Filename was preserved.
- Slug was preserved.
- Date was preserved.
- `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/` was generated in local production output.
- The target URL was present in the local production sitemap.
- Published `/posts/` URL count remained 258.
- No other `content/posts/*.md` file changed.

## Build Result

Production build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase5f-build
```

Result:

- Build passed.
- `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/` was generated.

Path warning build command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase5f-pathwarnings
```

Result:

- Build passed.
- Duplicate target warnings were not reported.

## Risk Wording Safeguards

The rewritten article avoids:

- Claims that resume tools guarantee interviews, hiring decisions, compensation outcomes, or better job outcomes.
- Legal advice.
- Labor advice.
- Visa advice.
- Tax advice.
- Salary guidance.
- Discrimination advice.
- Immigration advice.
- Fake rankings.
- Fake ratings.
- Affiliate links.
- Partnership claims.
- Unsupported employer or job-site policy claims.

The article tells readers to verify official job postings, employer pages, school or career-center resources, and job-site policies for current details.

## Recommended Next Step

Review this controlled rewrite before repeating the process.

Possible next steps:

- Phase 5G: controlled push and deployment verification for this resume blocker rewrite.
- Phase 5H: choose another low-risk A/D rewrite candidate.
- Phase 5-SC: run Search Console-informed triage before selecting more rewrite targets.
