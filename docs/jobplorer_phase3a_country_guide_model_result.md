# Jobplorer Phase 3A Country Guide Model Result

## Purpose

Phase 3A created the Country Guide content model and publishing checklist before any country guide pages are published.

Country Guides are intended to help users understand where to start researching job sites, job search resources, and official information sources in a country. They are not legal, visa, immigration, tax, labor, relocation, or live job listing pages.

## Scope

This phase added documentation, an archetype, and a minimal Country Guides landing-page update.

This phase did not:

- Publish any country guide pages.
- Create United States, South Korea, Canada, or other country guide pages.
- Modify existing `content/posts/*.md` article files.
- Modify LinkedIn, Indeed, or Glassdoor.
- Modify CNAME, Cloudflare settings, config, layouts, themes, or generated public files.
- Add rankings, ratings, legal advice, visa advice, immigration advice, labor advice, tax advice, salary guarantees, hiring guarantees, job guarantees, affiliate links, or partnership implications.

## Added Docs, Templates, and Pages

- `docs/jobplorer_country_guide_model.md`
- `docs/jobplorer_country_guide_publishing_checklist.md`
- `archetypes/country-guide.md`
- `content/country-guides/_index.md` was minimally updated to explain gradual guide publishing and official-source verification.

## Country Guide Model Summary

The Country Guide model defines future pages as cautious, source-based job search research starting points.

Required front matter fields include:

- `title`
- `description`
- `country`
- `region`
- `primaryLanguage`
- `guideType`
- `jobSearchStartingPoints`
- `officialSourcesToCheck`
- `majorJobSiteCategories`
- `usefulFor`
- `limitations`
- `lastReviewed`
- `reviewStatus`
- `draft`

Allowed `reviewStatus` values:

- `draft`
- `needs-official-review`
- `reviewed`
- `needs-update`

The model requires official-source review and cautious wording. It explicitly prohibits legal, visa, immigration, labor, tax, salary, hiring, or job guarantee claims.

## Publishing Checklist Summary

The checklist covers:

- Pre-draft checks.
- Country-specific official-source review.
- Job site and resource review.
- Risk wording review.
- URL and slug review.
- Build verification.
- Publish approval.
- Post-publish monitoring.

The checklist explicitly bans:

- Fake country rankings.
- Fake job site rankings.
- Job guarantees.
- Visa, legal, immigration, labor, or tax advice.
- Unsupported salary or hiring claims.
- Unverified government requirement claims.
- Official partnership implications.

## Template and Section Result

Created `archetypes/country-guide.md` with placeholder front matter only.

The archetype defaults to:

- `draft: true`
- `reviewStatus: "needs-official-review"`

Updated `content/country-guides/_index.md` to clarify that future guides will be added gradually after official-source review and that Jobplorer does not provide visa, immigration, legal, tax, labor, relocation, eligibility, employment, salary, or hiring guarantees.

## Build Result

Build command:

```bash
hugo --gc --minify --destination /tmp/jobplorer-phase3a-build
```

Result: passed.

Path warning command:

```bash
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase3a-pathwarnings
```

Result: passed with no duplicate target warnings.

Generated output summary:

- Pages: 1192
- Paginator pages: 21
- Static files: 2
- Aliases: 10

Hugo generated `.hugo_build.lock` and `resources/` during diagnostics. Only those generated artifacts were removed.

## `/posts/` Preservation Result

- Existing `content/posts` article file count: 268.
- Published `/posts/` URL count remains 258.
- No existing `content/posts/*.md` article files were changed.
- `/posts/` remains the preserved legacy job news archive route.

## Remaining Next Steps

- Phase 3B: starter country guide drafts for United States, South Korea, and Canada.
- Phase 3C: official-source review for one country guide before publishing.
- Continue Indeed official-source review later.
