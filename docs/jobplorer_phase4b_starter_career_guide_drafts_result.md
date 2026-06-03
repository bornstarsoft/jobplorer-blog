# Jobplorer Phase 4B Starter Career Guide Drafts Result

## Purpose

Phase 4B created starter draft Career Guide pages for Software Developers, Game Developers, and Remote Workers. These pages are draft-only and are not published.

## Scope

Changed:

- `content/career-guides/software-developers.md`
- `content/career-guides/game-developers.md`
- `content/career-guides/remote-workers.md`
- `docs/jobplorer_phase4b_starter_career_guide_drafts_result.md`

Not changed:

- Existing `content/posts/*.md` article files
- LinkedIn, Indeed, or Glassdoor job site pages
- United States, South Korea, or Canada country guide drafts
- `content/career-guides/_index.md`
- `config.toml`, `CNAME`, layouts, themes, public files, or Cloudflare settings

## Draft Pages Created

| Draft page | Path | Draft status | Review status |
| --- | --- | --- | --- |
| Software Developers | `content/career-guides/software-developers.md` | `draft: true` | `reviewStatus: "needs-official-review"` |
| Game Developers | `content/career-guides/game-developers.md` | `draft: true` | `reviewStatus: "needs-official-review"` |
| Remote Workers | `content/career-guides/remote-workers.md` | `draft: true` | `reviewStatus: "needs-official-review"` |

All three drafts use `lastReviewed: ""`.

## Draft Status Confirmation

All three pages remain unpublished:

- `/career-guides/software-developers/` is not generated in production output.
- `/career-guides/game-developers/` is not generated in production output.
- `/career-guides/remote-workers/` is not generated in production output.

## Review Status Confirmation

All three pages remain `reviewStatus: "needs-official-review"` and require official-source review before any publication decision.

No page was set to `reviewStatus: "reviewed"`.

## Production Build Result

Production build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase4b-build
```

Result:

- Build passed.
- Duplicate target warnings were not reported.
- The three draft Career Guide routes were not generated in production output.

Path warning build command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase4b-pathwarnings
```

Result:

- Build passed.
- Duplicate target warnings were not reported.

## Draft Build Result

Draft build command:

```sh
hugo --gc --minify -D --destination /tmp/jobplorer-phase4b-draft-build
```

Result:

- Draft build passed.
- `/career-guides/software-developers/` was generated only when drafts were included with `-D`.
- `/career-guides/game-developers/` was generated only when drafts were included with `-D`.
- `/career-guides/remote-workers/` was generated only when drafts were included with `-D`.

## /posts/ Preservation Result

- `content/posts` article count remains 268.
- Published `/posts/` URL count remains 258.
- No existing `content/posts/*.md` article files were changed.

## Job Site And Country Guide Preservation Result

- LinkedIn remains `draft: false` and `reviewStatus: "reviewed"`.
- Indeed remains `draft: true` and `reviewStatus: "needs-official-review"`.
- Glassdoor remains `draft: true` and `reviewStatus: "needs-official-review"`.
- United States remains `draft: true` and `reviewStatus: "needs-official-review"`.
- South Korea remains `draft: true` and `reviewStatus: "needs-official-review"`.
- Canada remains `draft: true` and `reviewStatus: "needs-official-review"`.
- No job site profile files or country guide draft files were changed.

## Risk Wording Safeguards

The starter drafts avoid:

- Fake rankings or ratings
- Fake salary data
- Job, interview, hiring, salary, visa, immigration, legal, labor, tax, certification, relocation, or career outcome guarantees
- Professional career counseling advice
- Live job count claims
- Affiliate links
- Official employer, school, job-site, platform, or certification partnership implications

Each draft includes a visible draft note and tells readers to check official sources and employer pages for current details.

## Remaining Next Steps

- Phase 4C official-source review for one career guide, likely Software Developers first.
- Phase 4D publish one reviewed career guide only after official-source verification.
- Continue U.S. manual source verification later.
