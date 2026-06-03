# Jobplorer Phase 4C-B Software Developers Publish Readiness Result

## Purpose

Phase 4C-B performed a publish-readiness wording review for the Software Developers career guide only. The guide remains unpublished.

## Scope

Changed:

- `content/career-guides/software-developers.md`
- `docs/jobplorer_phase4c_b_software_developers_publish_readiness_result.md`

Not changed:

- Game Developers or Remote Workers career guide drafts
- LinkedIn, Indeed, or Glassdoor job site pages
- United States, South Korea, or Canada country guide drafts
- Existing `content/posts/*.md` article files
- `config.toml`, `CNAME`, layouts, themes, public files, or Cloudflare settings

## Wording Cleanup Summary

The Software Developers draft was cleaned up for publish-readiness while keeping it unpublished.

Removed or replaced:

- Visible "Draft note" wording
- Visible "unpublished" wording
- "This draft" wording
- Public-facing certification wording
- Public-facing salary advice wording
- "Guarantee" wording

Kept:

- Cautious official-source reminder
- BLS and O*NET as broad official occupation resources
- Employer-page and official posting verification reminders
- Cautious wording that requirements, tools, job titles, and market conditions can change

## Final Software Developers Draft State

- `draft: true`
- `reviewStatus: "reviewed"`
- `lastReviewed: "2026-06-03"`

The page is publish-ready from a wording standpoint, but it remains draft-only until owner approval.

## Build Result

Production build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase4c-b-build
```

Result:

- Build passed.
- Duplicate target warnings were not reported.
- `/career-guides/software-developers/` was not generated in production output because `draft: true` remains.

Path warning build command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase4c-b-pathwarnings
```

Result:

- Build passed.
- Duplicate target warnings were not reported.

## Draft Build Result

Draft build command:

```sh
hugo --gc --minify -D --destination /tmp/jobplorer-phase4c-b-draft-build
```

Result:

- Draft build passed.
- `/career-guides/software-developers/` was generated only when drafts were included with `-D`.

## Generated HTML Check Result

The draft-generated Software Developers HTML was checked for public-readiness wording.

Confirmed absent:

- Visible "Draft note"
- "Unpublished"
- "This draft"
- Affiliate wording
- Partnership wording
- Ranking/rating wording
- "Best career" wording
- Live job count wording
- Salary advice wording
- Certification requirement wording
- Guarantee wording

Confirmed present:

- Public-safe review note
- Official occupation resource reminder
- Caution that requirements, tools, job titles, and market conditions can change
- Reminder to check official sources and employer postings

## Preservation Checks

- `content/posts` article count remains 268.
- Published `/posts/` URL count remains 258.
- No existing `content/posts/*.md` article files were changed.
- LinkedIn remains `draft: false` and `reviewStatus: "reviewed"`.
- Indeed remains `draft: true` and `reviewStatus: "needs-official-review"`.
- Glassdoor remains `draft: true` and `reviewStatus: "needs-official-review"`.
- United States remains `draft: true` and `reviewStatus: "needs-official-review"`.
- South Korea remains `draft: true` and `reviewStatus: "needs-official-review"`.
- Canada remains `draft: true` and `reviewStatus: "needs-official-review"`.
- Game Developers remains `draft: true` and `reviewStatus: "needs-official-review"`.
- Remote Workers remains `draft: true` and `reviewStatus: "needs-official-review"`.

Only the Software Developers career guide draft was changed.

## Remaining Risks

- The Software Developers guide is not live yet.
- Search Console monitoring should happen after any future publication.
- Future updates that name specific employers, job sites, education providers, training providers, tools, or requirements should be verified directly before publication.
- Game Developers and Remote Workers remain unreviewed drafts.

## Recommended Next Step

Proceed to Phase 4D publish Software Developers only if the owner approves. Otherwise, continue with another official-source review.
