# Jobplorer Phase 8E Homepage Recent Posts Config Test Result

## Purpose

Phase 8E locally tested hiding Ananke's auto-rendered homepage recent posts using configuration only. This phase did not push changes.

## Config Change Tested

Added an Ananke-specific params section in `config.toml`:

```toml
[params.ananke]
  show_recent_posts = false
```

The existing `mainSections = ["posts"]` setting was not changed.

## Homepage Rendering Result

The local generated homepage still shows the service-hub content:

- Reviewed Job Site Profiles
- LinkedIn
- Indeed
- Glassdoor
- Featured Career Guide
- Software Developer Job Search: Where to Start
- Practical Job Search Guides
- AI in Recruitment
- Entry-Level Job Search
- Resume Blockers
- AI-Assisted Game Development Roles
- Secondary Archive
- Legacy Job News Archive

The homepage no longer auto-renders the recent legacy post card block after the homepage body content. The old recent-post card titles and Ananke `More` section were absent from the generated homepage.

## `/posts/` Archive Preservation Result

- `/posts/` archive still generates locally.
- Published `/posts/` URL count remains 258.
- The four rewritten legacy post URLs still generate.
- No `content/posts/*.md` files were changed.

## Build Result

Production build passed:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase8e-build
```

Path-warning build passed with no duplicate target warnings:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase8e-pathwarnings
```

## Route/Sitemap Preservation

Local build confirmed these routes still generate:

- `/posts/`
- `/job-sites/sites/linkedin/`
- `/job-sites/sites/indeed/`
- `/job-sites/sites/glassdoor/`
- `/career-guides/software-developers/`
- `/posts/the-rise-of-ai-in-recruitment/`
- `/posts/the-struggles-of-young-job-seekers/`
- `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`
- `/posts/ai-creators-future-game-development/`

Local sitemap confirmed:

- Unique `/posts/` URL count remains 258.
- LinkedIn URL is present.
- Indeed URL is present.
- Glassdoor URL is present.
- Software Developers URL is present.
- The four rewritten legacy URLs are present.

## Risks

- The homepage RSS/feed metadata still exists because the homepage itself remains a Hugo home page.
- `/posts/` remains a full legacy archive, which is intentional for URL preservation.
- This config setting should be deployment-verified before being treated as complete.
- Plain live homepage and sitemap responses may be cached after any future push.

## Recommended Next Step

Proceed to Phase 8F: controlled push and deployment verification for the homepage recent-posts config update.
