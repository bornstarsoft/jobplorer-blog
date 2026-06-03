# Jobplorer Phase 9D Publish Game Developers Result

## Purpose

Phase 9D published the reviewed Game Developers career guide locally while preserving the rest of the Jobplorer site state.

## Game Developers Publish Change

- File updated: `content/career-guides/game-developers.md`
- Changed only `draft: true` to `draft: false`.
- Kept `reviewStatus: "reviewed"`.
- Kept `lastReviewed: "2026-06-03"`.
- No wording, slug, date, title, or route changes were made.

## Review Status Confirmation

Game Developers is reviewed and now locally publishable:

- `draft: false`
- `reviewStatus: "reviewed"`
- `lastReviewed: "2026-06-03"`

## Build Result

Production build passed:

`hugo --gc --minify --destination /tmp/jobplorer-phase9d-build`

Path-warning build passed with no duplicate target warnings:

`hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase9d-pathwarnings`

Production output generated `/career-guides/game-developers/`.

Production output did not generate `/career-guides/remote-workers/`.

## Draft Build Result

Draft build passed:

`hugo --gc --minify -D --destination /tmp/jobplorer-phase9d-draft-build`

Draft output generated:

- `/career-guides/software-developers/`
- `/career-guides/game-developers/`
- `/career-guides/remote-workers/`

## Route/Sitemap Verification

Local production output includes:

- `/career-guides/`
- `/career-guides/software-developers/`
- `/career-guides/game-developers/`

Local production sitemap includes:

- `https://jobplorer.com/career-guides/software-developers/`
- `https://jobplorer.com/career-guides/game-developers/`
- `https://jobplorer.com/job-sites/sites/linkedin/`
- `https://jobplorer.com/job-sites/sites/indeed/`
- `https://jobplorer.com/job-sites/sites/glassdoor/`

Local production sitemap does not include:

- `https://jobplorer.com/career-guides/remote-workers/`

## Preservation Checks

- Published `/posts/` URL count remains 258.
- Software Developers remains published and reviewed.
- Remote Workers remains draft-only.
- LinkedIn, Indeed, and Glassdoor remain published and reviewed.
- No `content/posts/*.md` files changed.
- No config, CNAME, layout, theme, public, job-site, country-guide, or other career-guide files changed.

## Remaining Risks

- Game Developers is published locally only; it has not been pushed or deployed yet.
- Deployment verification is still required after the controlled push.
- Search Console should be monitored after deployment.
- Role titles, tools, portfolio expectations, and market conditions can change.

## Recommended Next Step

Proceed to Phase 9E: controlled push and deployment verification for Game Developers.
