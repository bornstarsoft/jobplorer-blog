# Jobplorer Phase 4D Publish Software Developers Result

## Purpose

Phase 4D published the reviewed Software Developers career guide locally. The change has not been pushed or deployed.

## Scope

Changed:

- `content/career-guides/software-developers.md`
- `docs/jobplorer_phase4d_publish_software_developers_result.md`

Not changed:

- Game Developers or Remote Workers career guide drafts
- LinkedIn, Indeed, or Glassdoor job site pages
- United States, South Korea, or Canada country guide drafts
- Existing `content/posts/*.md` article files
- `content/career-guides/_index.md`
- `config.toml`, `CNAME`, layouts, themes, public files, or Cloudflare settings

## Software Developers Publish Change

The Software Developers career guide was changed from:

```yaml
draft: true
```

to:

```yaml
draft: false
```

No other content, source, wording, route, review-status, or review-date change was made in this phase.

## Review Status Confirmation

Software Developers remains:

- `draft: false`
- `reviewStatus: "reviewed"`
- `lastReviewed: "2026-06-03"`

Game Developers and Remote Workers remain draft-only.

## Production Build Result

Production build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase4d-build
```

Result:

- Build passed.
- Duplicate target warnings were not reported.
- `/career-guides/software-developers/` was generated in production output.
- `/career-guides/game-developers/` was not generated in production output.
- `/career-guides/remote-workers/` was not generated in production output.

Path warning build command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase4d-pathwarnings
```

Result:

- Build passed.
- Duplicate target warnings were not reported.

## Draft Build Result

Draft build command:

```sh
hugo --gc --minify -D --destination /tmp/jobplorer-phase4d-draft-build
```

Result:

- Draft build passed.
- `/career-guides/software-developers/` was generated.
- `/career-guides/game-developers/` was generated.
- `/career-guides/remote-workers/` was generated.

## Route Verification Result

Local production output includes:

- `/career-guides/`
- `/career-guides/software-developers/`

Local production output does not include:

- `/career-guides/game-developers/`
- `/career-guides/remote-workers/`

## Sitemap Verification Result

Local production sitemap includes:

- `https://jobplorer.com/career-guides/software-developers/`

Local production sitemap does not include:

- `https://jobplorer.com/career-guides/game-developers/`
- `https://jobplorer.com/career-guides/remote-workers/`

## Preservation Result

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

## Safety Wording Safeguards

The published local Software Developers guide keeps cautious wording and avoids:

- Fake rankings or ratings
- "Best career" wording
- Partnership claims
- Affiliate links
- Live job count claims
- Salary data or employment outlook numbers
- Job, interview, hiring, salary, visa, immigration, legal, labor, tax, certification, or career outcome guarantees
- Professional career counseling advice

The page keeps the official-source reminder and tells readers to check official sources and employer postings for current details.

## Remaining Risks

- Live deployment has not been pushed yet.
- Search Console should be monitored after deployment.
- Game Developers and Remote Workers remain drafts.
- The U.S. country guide remains blocked by manual source verification needs.

## Recommended Next Step

Proceed to Phase 4E controlled push and deployment verification for Software Developers publication.
