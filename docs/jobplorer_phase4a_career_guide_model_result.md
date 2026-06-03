# Jobplorer Phase 4A Career Guide Model Result

## Purpose

Phase 4A created the Career Guide content model and publishing checklist for future Jobplorer career research pages. No career guide detail pages were published.

## Scope

Changed:

- `docs/jobplorer_career_guide_model.md`
- `docs/jobplorer_career_guide_publishing_checklist.md`
- `archetypes/career-guide.md`
- `content/career-guides/_index.md`
- `docs/jobplorer_phase4a_career_guide_model_result.md`

Not changed:

- Existing `content/posts/*.md` article files
- LinkedIn, Indeed, or Glassdoor job site pages
- United States, South Korea, or Canada country guide drafts
- `config.toml`, `CNAME`, layouts, themes, public files, or Cloudflare settings

## Added Docs, Templates, And Pages

- Added the Career Guide content model.
- Added the Career Guide publishing checklist.
- Added `archetypes/career-guide.md` for future draft-first career guide pages.
- Updated the Career Guides landing page with cautious future-topic wording and risk disclaimers.

## Career Guide Model Summary

The Career Guide model defines future guide pages as cautious job search research starting points for a role or career path.

Required front matter fields include:

- `title`
- `description`
- `careerArea`
- `guideType`
- `targetAudience`
- `jobSearchStartingPoints`
- `commonJobSiteCategories`
- `portfolioOrResumeNotes`
- `officialSourcesToCheck`
- `usefulFor`
- `limitations`
- `lastReviewed`
- `reviewStatus`
- `draft`

Allowed `reviewStatus` values are:

- `draft`
- `needs-official-review`
- `reviewed`
- `needs-update`

The model explicitly prohibits fake rankings, fake ratings, job guarantees, hiring guarantees, interview guarantees, salary guarantees, legal advice, visa advice, immigration advice, labor advice, tax advice, unsupported certification claims, and official partnership implications.

## Publishing Checklist Summary

The publishing checklist covers:

- Pre-draft checks
- Career-specific official-source review
- Job site and resource checks
- Portfolio and resume wording safeguards
- Risk wording review
- URL and slug preservation
- Build verification
- Publish approval
- Post-publish monitoring

The checklist keeps career guides draft-first until official-source review is complete and owner approval is given.

## Build Result

Production build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase4a-build
```

Result:

- Build passed.
- Duplicate target warnings were not reported.

Path warning build command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase4a-pathwarnings
```

Result:

- Build passed.
- Duplicate target warnings were not reported.

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

## Remaining Next Steps

- Phase 4B starter career guide drafts for Software Developers, Game Developers, and Remote Workers.
- Phase 4C official-source review for one career guide before publishing.
- Continue U.S. manual source verification later.
