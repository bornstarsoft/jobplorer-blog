# Jobplorer Phase 8F Homepage Recent Posts Deployment Result

## Purpose

Phase 8F performed a controlled push and deployment verification for hiding Ananke's auto-rendered homepage recent posts with configuration only.

## Pre-Push Verification

- Phase 8E was already committed.
- Working tree was clean before pre-push verification.
- Local `main` was ahead of `origin/main` by 3 commits and behind by 0 commits.
- Config contained:

```toml
[params.ananke]
  show_recent_posts = false
```

- Production build passed:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase8f-build
```

- Path-warning build passed with no duplicate target warnings:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase8f-pathwarnings
```

- Homepage generated locally.
- Homepage service-hub sections were present.
- Recent legacy post cards and the Ananke `More` section were not auto-rendered on the homepage.
- `/posts/` archive still generated.
- Published `/posts/` URL count remained 258.
- LinkedIn, Indeed, Glassdoor, and Software Developers routes generated.

## Push Result

Remote freshness check passed after:

```sh
git fetch --all --prune
```

`git status -sb` showed local `main` ahead by 3 and behind by 0.

Controlled push succeeded:

```text
0cc9292..de68771  main -> main
```

No force push was used.

## Live Homepage Verification

Live homepage route returned HTTP 200:

- `https://jobplorer.com/`

The plain homepage response was still served from cache during verification, so the cache-busted homepage was used for current content verification:

- `https://jobplorer.com/?v=de68771`

The cache-busted homepage confirmed:

- `Reviewed Job Site Profiles`
- LinkedIn
- Indeed
- Glassdoor
- `Featured Career Guide`
- Software Developer Job Search: Where to Start
- `Practical Job Search Guides`
- AI in Recruitment
- Entry-Level Job Search
- Resume Blockers
- AI-Assisted Game Development Roles
- `Secondary Archive`
- Legacy Job News Archive

The cache-busted homepage also confirmed:

- No auto-rendered recent legacy post card block.
- No Ananke `More` section.
- The `/posts/` archive link remains visible as a secondary archive link.

## Live Route Verification

The following routes returned HTTP 200:

- `https://jobplorer.com/posts/`
- `https://jobplorer.com/job-sites/sites/linkedin/`
- `https://jobplorer.com/job-sites/sites/indeed/`
- `https://jobplorer.com/job-sites/sites/glassdoor/`
- `https://jobplorer.com/career-guides/software-developers/`
- `https://jobplorer.com/posts/the-rise-of-ai-in-recruitment/`
- `https://jobplorer.com/posts/the-struggles-of-young-job-seekers/`
- `https://jobplorer.com/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`
- `https://jobplorer.com/posts/ai-creators-future-game-development/`

## Sitemap Preservation

Downloaded live sitemap files to `/tmp/jobplorer-phase8f/`.

The plain sitemap response was still inconsistent with the current deployment during verification, so the cache-busted sitemap was used for current verification:

- `https://jobplorer.com/sitemap.xml?v=de68771`

Cache-busted sitemap verification confirmed:

- Unique `/posts/` URL count remains 258.
- LinkedIn URL is present.
- Indeed URL is present.
- Glassdoor URL is present.
- Software Developers URL is present.
- The four rewritten legacy URLs are present.

## Remaining Risks

- Plain homepage and sitemap responses may remain cached briefly after deployment.
- `/posts/` remains a full legacy archive by design and still needs ongoing quality triage.
- Search Console should be monitored after the homepage behavior change.
- Future homepage improvements may still require careful content or layout planning if a richer service-hub design is desired.

## Recommended Next Step

Commit the Phase 8F deployment report, then proceed with either Search Console monitoring, additional homepage service-hub planning, or the next controlled content review track.
