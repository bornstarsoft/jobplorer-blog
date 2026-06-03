# Jobplorer Phase 9B Game Developers Official Review Result

## Purpose

Phase 9B performed an official-source review pass for the Game Developers career guide draft only. The guide remains unpublished.

## Official Sources Checked

- BLS Occupational Outlook Handbook, Software Developers, Quality Assurance Analysts, and Testers: https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm
- O*NET OnLine, Video Game Designers: https://www.onetonline.org/link/details/15-1255.01
- O*NET OnLine, Software Developers: https://www.onetonline.org/link/summary/15-1252.00
- O*NET Resource Center overview: https://www.onetcenter.org/overview.html
- U.S. Department of Labor O*NET page: https://www.dol.gov/agencies/eta/onet

## Fields Reviewed

- `description`
- `targetAudience`
- `jobSearchStartingPoints`
- `commonJobSiteCategories`
- `portfolioOrResumeNotes`
- `officialSourcesToCheck`
- `usefulFor`
- `limitations`
- visible body wording
- `lastReviewed`
- `reviewStatus`
- `draft`

## Fields Left Cautious

- Portfolio, demo, resume, and tool expectations remain cautious because they vary by studio, employer, role, project, and posting.
- Role-title wording remains cautious because game developer, game designer, software developer, and related titles can vary by employer.
- Job search channel wording remains broad and source-neutral.
- No salary data or job outlook numbers were added.
- No certification requirements or universal portfolio requirements were added.
- Employer and studio career pages remain sources to verify during future publication checks, not broad proof of the whole career area.

## Game Developers Draft Status

- File: `content/career-guides/game-developers.md`
- `draft: true`
- `reviewStatus: "reviewed"`
- `lastReviewed: "2026-06-03"`
- The Game Developers guide remains unpublished.

## Review Status Decision

The draft was moved from `needs-official-review` to `reviewed` because the remaining claims are either supported by official occupation resources or safely cautious. The page still requires owner approval before any publication step.

## Build Result

Production build passed:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase9b-build
```

Path-warning build passed with no duplicate target warnings:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase9b-pathwarnings
```

Production output did not generate `/career-guides/game-developers/` because the guide remains a draft.

## Draft Build Result

Draft build passed:

```sh
hugo --gc --minify -D --destination /tmp/jobplorer-phase9b-draft-build
```

Draft output generated `/career-guides/game-developers/` only when using `-D`.

## Preservation Checks

- Published `/posts/` URL count remains 258.
- LinkedIn, Indeed, and Glassdoor remain published and reviewed.
- Software Developers remains published and reviewed.
- Remote Workers remains draft-only and unchanged.
- No `content/posts/*.md` files were changed.
- No config, CNAME, layout, theme, public, job-site, country guide, or other career guide files were changed.

## Recommended Next Step

Proceed to Phase 9C: publish-readiness review for Game Developers while keeping it unpublished, or pause for owner review before moving toward publication.
