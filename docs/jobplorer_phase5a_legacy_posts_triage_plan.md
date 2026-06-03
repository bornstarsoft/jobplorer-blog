# Jobplorer Phase 5A Legacy Posts Triage Plan

## Purpose

Phase 5A defines a safe inventory and triage policy for old automated job-news posts before any cleanup action is taken.

This phase does not edit, delete, draft, noindex, rename, move, rewrite, or archive any legacy post. It only documents how legacy `/posts/` content should be classified and reviewed.

## Current Known State

- `content/posts` article count: 268.
- Published `/posts/` URL count: 258.
- `/posts/` must remain the legacy archive route for now.
- Existing `/posts/` URLs should remain stable during the Jobplorer renewal.
- LinkedIn and Software Developers are reviewed and live.
- Game Developers, Remote Workers, Indeed, Glassdoor, United States, South Korea, and Canada remain draft-only.
- The known CNAME mismatch remains intentionally untouched.

## Triage Categories

Use these categories when classifying old auto-news posts:

| Category | Label | Meaning | Initial action |
| --- | --- | --- | --- |
| A | Keep / rewrite into evergreen Jobplorer content | Post has useful durable topic value and can become an evergreen guide, resource explanation, job search concept page, or archive-supported insight. | Keep URL stable; consider rewriting only after traffic and search review. |
| B | Thin auto-news summary | Post appears to be a short, duplicated, or low-context automated news summary. | Draft/noindex/archive candidate later, only after Search Console review. |
| C | Off-position content | Post is outside the renewed Jobplorer direction or too narrow for long-term job information hub goals. | Archive/delete candidate only after Search Console review and URL preservation review. |
| D | Restructure candidate | Post can be reworked into Job Site, Country Guide, Career Guide, or broader Career Guide content. | Preserve legacy URL until a replacement/redirect/alias decision is made. |
| E | URL-preservation-sensitive page | Post has duplicate/canonical history, stabilized malformed history, strong live visibility, or another URL risk. | Do not change until traffic, canonical, sitemap, and Search Console review are complete. |

## Risk Policy

The legacy archive policy is intentionally conservative:

- No mass deletion.
- No `/posts/` to `/blog/` migration.
- No slug changes.
- No filename changes.
- No draft/noindex/delete action before Search Console review.
- Keep live URLs stable.
- Preserve `/posts/` as the legacy archive during current MVP expansion.
- Do not change duplicate canonical URLs without a redirect or alias strategy.
- Do not remove stabilized malformed URLs without traffic and indexing review.
- Do not merge or rewrite content in batches large enough to create search or sitemap instability.

## Recommended Workflow

1. Export full `/posts/` inventory.
2. Sample recent 30 posts.
3. Classify each sampled post with A/B/C/D/E.
4. Check Search Console before action.
5. Rewrite or archive in small batches only.

For each post in the inventory, record:

- File path.
- Current title.
- Date.
- Draft status.
- Slug or URL if present.
- Inferred live URL.
- Sitemap presence.
- Live HTTP status.
- Search Console visibility if available.
- Proposed triage category.
- URL preservation notes.
- Recommended action.
- Owner approval status.

## Optional Read-only 10-post Sample

The following sample used filenames and titles only. It should not be treated as a final content-quality decision.

| Date | File | Title | Likely triage risk from title only |
| --- | --- | --- | --- |
| 2026-05-27 | `content/posts/2026-05-27-jobs-194059.md` | `Special Construction's 2026 Recruitment: A Gateway for Aspiring Engineers` | B or C: recruitment-specific auto-news; may be time-sensitive. |
| 2026-05-23 | `content/posts/2026-05-23-jobs-211228.md` | `Google Embraces AI in Developer Interviews` | A or D: may support evergreen interview/AI hiring guidance if rewritten cautiously. |
| 2026-05-20 | `content/posts/2026-05-20-jobs-201155.md` | `AI's Impact on the Accounting Industry: A Paradigm Shift` | A or D: may support career guide content if source quality is reviewed. |
| 2026-05-19 | `content/posts/2026-05-19-jobs-224142.md` | `Why 87% of Job Seekers Abandon Their Resumes` | A or D with caution: statistic must be verified before reuse. |
| 2026-05-16 | `content/posts/2026-05-16-jobs-223021.md` | `Exploring the Impact of Project 1496 on Youth Employment in Vietnam` | C or D: country/program-specific; needs source and relevance review. |
| 2026-05-14 | `content/posts/2026-05-14-jobs-213953.md` | `Lotte Innovate and Mirae Asset Securities: A Model for Inclusive Corporate Culture` | B or C: company-news oriented; may be off-position unless rewritten into inclusion topic. |
| 2026-05-13 | `content/posts/2026-05-13-jobs-201846.md` | `Job Market Trends in Jeju: Growth and Insights` | D: possible country/region guide research input, but likely time-sensitive. |
| 2026-05-12 | `content/posts/2026-05-12-jobs-201509.md` | `AI Creators: The Future of Game Development` | A or D: possible Career Guide input for game developers if rewritten and sourced. |
| 2026-05-09 | `content/posts/2026-05-09-jobs-233730.md` | `Cancellation of Information Non-Existence Notice by the Human Rights Commission` | C: likely off-position or legal/administrative news; avoid reuse without review. |
| 2026-05-08 | `content/posts/2026-05-08-jobs-003119.md` | `Structural Crisis in Daegu's Labor Market` | D or C: region-specific labor-market topic; avoid advice and verify sources before reuse. |

Early title-only risk pattern:

- Several recent posts appear time-sensitive or auto-news-like.
- Some posts may be useful as raw inputs for evergreen Career Guide, Country Guide, or job search research content.
- Posts with statistics, company-specific claims, program names, regional labor-market claims, or legal/administrative topics need careful source review before reuse.
- No action should be taken from title-only sampling.

## Suggested Next Phase

Phase 5B should be read-only inventory export and 30-post sample triage.

Phase 5B should not modify legacy posts. It should produce a fuller inventory and a sample classification table that can be reviewed before any rewrite, noindex, draft, archive, or deletion decision.
