# Jobplorer Phase 1A Service MVP Structure Result

## Purpose

Phase 1A adds the first visible service-MVP structure for Jobplorer while preserving the legacy `/posts/` archive.

The positioning introduced in this phase:

```text
Jobplorer = Explore job sites, country guides, and career paths around the world.
```

Jobplorer remains an information hub, not a live job scraping board.

## Scope

This phase added concise landing pages for the first service sections and minimal Ananke main menu entries.

No existing post article files were deleted, renamed, moved, or rewritten. No existing post slug, URL, title, date, body, draft status, or filename was changed.

This phase did not modify:

- `CNAME`
- Cloudflare settings
- layouts or themes
- generated `public/` output
- existing `content/posts/*.md` article files
- detailed job site review pages
- affiliate links

## Added and Updated Pages

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `content/_index.md` | Introduces Jobplorer as a global job information hub with entry points to service sections. |
| `/job-sites/` | `content/job-sites/_index.md` | Landing page for job site research starting points. |
| `/job-sites/by-country/` | `content/job-sites/by-country/_index.md` | Landing page for country-focused job site organization. |
| `/job-sites/by-career/` | `content/job-sites/by-career/_index.md` | Landing page for career-area job site organization. |
| `/country-guides/` | `content/country-guides/_index.md` | Landing page for country-level job search research topics. |
| `/career-guides/` | `content/career-guides/_index.md` | Landing page for career path and job search preparation topics. |
| `/remote-jobs/` | `content/remote-jobs/_index.md` | Landing page for remote job research starting points. |
| `/job-seeker-tools/` | `content/job-seeker-tools/_index.md` | Landing page for practical checklists, templates, and research prompts. |
| `/guides/` | `content/guides/_index.md` | Landing page for general Jobplorer guides. |
| `/posts/` | `content/posts/_index.md` | Labels existing `/posts/` as the Legacy Job News Archive while preserving the route. |

## Navigation Changes

Ananke supports `menu.main` through `themes/ananke/layouts/partials/site-navigation.html`, so no layout or theme edits were needed.

Minimal main menu entries were added to `config.toml`:

- Job Sites -> `/job-sites/`
- Country Guides -> `/country-guides/`
- Career Guides -> `/career-guides/`
- Tools -> `/job-seeker-tools/`
- Guides -> `/guides/`
- Archive -> `/posts/`

The menu intentionally keeps the structure small for MVP navigation.

## Build Result

Build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase1a-build
```

Result: passed.

Build summary:

- Pages: 1185
- Paginator pages: 21
- Static files: 2
- Aliases: 9

Path-warning command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase1a-pathwarnings
```

Result: passed with no duplicate target warnings.

Hugo generated `.hugo_build.lock` and `resources/` during diagnostics; only those generated artifacts were removed.

## Route Verification Result

Generated local files were confirmed for:

- `/`
- `/job-sites/`
- `/job-sites/by-country/`
- `/job-sites/by-career/`
- `/country-guides/`
- `/career-guides/`
- `/remote-jobs/`
- `/job-seeker-tools/`
- `/guides/`
- `/posts/`

## `/posts/` Preservation Result

Legacy post preservation checks:

- Existing post article files, excluding the new section `_index.md`: 268
- Published post article files: 258
- Unique published `/posts/` URLs: 258
- Existing `content/posts` article files changed: none
- New `/posts/` section page added: `content/posts/_index.md`

Note: `content/posts/*.md` now includes the new section index file, so a raw file glob including `_index.md` reports 269 files. The legacy article file count remains 268.

## Content Policy Notes

The new pages use cautious language and avoid:

- fake rankings
- fake ratings
- job guarantees
- salary outcome guarantees
- visa advice
- legal advice
- labor advice
- official partnership wording
- affiliate links

Pages describe resources as starting points and direct users to verify current details through official websites, employer pages, and current job postings.

## Remaining Next Steps

Recommended upcoming phases:

- Phase 1B: About / Contact / Privacy / Terms
- Phase 2: Job Site review model
- Phase 3: starter drafts for LinkedIn / Indeed / Glassdoor

Existing `/posts/` URLs should remain preserved throughout Phase 1 and later content work.
