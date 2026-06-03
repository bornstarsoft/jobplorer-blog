# Jobplorer Phase 2A Job Site Review Model Result

## Purpose

Phase 2A created the Job Site review content model and publishing checklist before any detailed job site review pages are published.

This phase supports the new Jobplorer positioning:

> Jobplorer = Explore job sites, country guides, and career paths around the world.

Jobplorer remains an informational resource, not a live job scraping board.

## Scope

This phase added documentation, a draft archetype, and a future Job Site profile section index.

This phase did not:

- Publish LinkedIn, Indeed, Glassdoor, or any other detailed job site review page.
- Add rankings, ratings, job guarantees, affiliate links, live job count claims, or partnership implications.
- Modify existing `content/posts/*.md` article files.
- Move `/posts/` to `/blog/`.
- Modify CNAME, Cloudflare settings, layouts, themes, or generated public files.

## Added Docs, Templates, and Pages

- `docs/jobplorer_job_site_review_model.md`
- `docs/jobplorer_job_site_publishing_checklist.md`
- `archetypes/job-site.md`
- `content/job-sites/sites/_index.md`
- `content/job-sites/_index.md` was minimally updated to link to `/job-sites/sites/`.

## Review Model Summary

The review model defines future Job Site profiles as cautious, source-based informational pages.

Required front matter fields include:

- `title`
- `description`
- `siteType`
- `officialUrl`
- `countryRegion`
- `bestFor`
- `jobTypes`
- `remoteJobs`
- `beginnerFriendly`
- `accountRequired`
- `pricingNote`
- `strengths`
- `limitations`
- `usefulFor`
- `similarSites`
- `lastReviewed`
- `reviewStatus`
- `draft`

Allowed `reviewStatus` values:

- `draft`
- `needs-official-review`
- `reviewed`
- `needs-update`

The model requires official-source review for stable public facts and cautious wording for pricing, availability, features, country support, policies, and job-posting details.

## Publishing Checklist Summary

The checklist covers:

- Pre-draft checks.
- Official-source verification.
- Content quality review.
- Risk wording review.
- URL and slug review.
- Build verification.
- Publish approval.
- Post-publish monitoring.

The checklist explicitly bans:

- Fake rankings.
- Fake ratings.
- Job guarantees.
- Official partnership implications.
- Live job count claims.
- Visa, legal, labor, or tax advice.
- Unverified pricing or availability claims.

## Template and Route Result

Created `archetypes/job-site.md` with placeholder front matter only.

The archetype defaults to:

- `draft: true`
- `reviewStatus: "needs-official-review"`

Created `/job-sites/sites/` as a future landing page for reviewed job site profiles. The page states that profiles will be added gradually after official-source review and does not publish any detailed job site reviews.

## Build Result

Build command:

```bash
hugo --gc --minify --destination /tmp/jobplorer-phase2a-build
```

Result: passed.

Path warning command:

```bash
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase2a-pathwarnings
```

Result: passed with no duplicate target warnings.

Generated output summary:

- Pages: 1191
- Paginator pages: 21
- Static files: 2
- Aliases: 10

Hugo generated `.hugo_build.lock` and `resources/` during diagnostics. Only those generated artifacts were removed.

## Route Verification Result

Generated local route confirmed:

- `/job-sites/sites/`

## `/posts/` Preservation Result

- Existing `content/posts` article file count: 268.
- Generated unique `/posts/` URL count: 258.
- No existing `content/posts/*.md` article files were changed.
- The legacy `/posts/` route remains preserved.

## Remaining Next Steps

- Phase 2B: create starter draft pages for LinkedIn, Indeed, and Glassdoor.
- Phase 2C: perform official-source review for one page before publishing.
