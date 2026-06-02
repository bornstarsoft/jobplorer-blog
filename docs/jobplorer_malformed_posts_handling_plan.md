# Jobplorer Phase 0F-C-A Malformed Posts Handling Plan

## Purpose

Phase 0F-C-A inventories malformed, no-front-matter, empty, and near-empty legacy post files before any content changes are made.

This is a documentation-only phase. No post, config, CNAME, layout, theme, generated file, deployment setting, or MVP page was changed.

## Current Build and Path State

Build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase0f-c-a-build
```

Result: passed on local Hugo 0.152.2.

Build summary:

- Pages: 1169
- Paginator pages: 21
- Static files: 2
- Aliases: 1

Path warning command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase0f-c-a-pathwarnings
```

Result: passed with no duplicate target warnings.

## Malformed Post Inventory

The current checkout contains 8 malformed or no-front-matter post files:

- 5 zero-byte files.
- 3 source-link-only files with no front matter.

All 8 are published by Hugo using filename-derived fallback URLs because they have no front matter and no explicit slug.

| File path | Size | State summary | Front matter | Title | Date | Slug | Inferred public URL | Local sitemap | Live sitemap | Live HTTP | Generated local HTML state |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `content/posts/2025-07-06-jobs-200208.md` | 0 | Empty zero-byte file | no | no | no | no | `/posts/2025-07-06-jobs-200208/` | yes | yes | 200 | Generated, title `Jobplorer`, no visible heading/body |
| `content/posts/2025-08-03-jobs-215626.md` | 0 | Empty zero-byte file | no | no | no | no | `/posts/2025-08-03-jobs-215626/` | yes | yes | 200 | Generated, title `Jobplorer`, no visible heading/body |
| `content/posts/2025-08-17-jobs-223347.md` | 0 | Empty zero-byte file | no | no | no | no | `/posts/2025-08-17-jobs-223347/` | yes | yes | 200 | Generated, title `Jobplorer`, no visible heading/body |
| `content/posts/2025-11-18-jobs-210416.md` | 0 | Empty zero-byte file | no | no | no | no | `/posts/2025-11-18-jobs-210416/` | yes | yes | 200 | Generated, title `Jobplorer`, no visible heading/body |
| `content/posts/2025-12-24-jobs-235358.md` | 85 | Source-link-only page: `https://www.housingherald.co.kr/news/articleView.html?idxno=60412` | no | no | no | no | `/posts/2025-12-24-jobs-235358/` | yes | yes | 200 | Generated, title `Jobplorer`, body contains only original source link |
| `content/posts/2026-03-09-jobs-195244.md` | 0 | Empty zero-byte file | no | no | no | no | `/posts/2026-03-09-jobs-195244/` | yes | yes | 200 | Generated, title `Jobplorer`, no visible heading/body |
| `content/posts/2026-03-28-jobs-210307.md` | 85 | Source-link-only page: `http://www.thekorea.kr/bbs/board.php?bo_table=news&wr_id=475896` | no | no | no | no | `/posts/2026-03-28-jobs-210307/` | yes | yes | 200 | Generated, title `Jobplorer`, body contains only original source link |
| `content/posts/2026-05-05-jobs-221528.md` | 77 | Source-link-only page: `https://www.cctimes.kr/news/articleView.html?idxno=905033` | no | no | no | no | `/posts/2026-05-05-jobs-221528/` | yes | yes | 200 | Generated, title `Jobplorer`, body contains only original source link |

## Live and Local Sitemap Status

All 8 inferred filename-fallback URLs are present in:

- The local generated sitemap at `/tmp/jobplorer-phase0f-c-a-build/sitemap.xml`.
- The live sitemap from `https://jobplorer.com/sitemap.xml`.

All 8 live URLs return HTTP 200.

This means they are not merely local broken files; they are live, sitemap-listed public URLs and should be handled as URL-sensitive legacy pages.

## Per-File Risk Classification

| File path | Categories | URL preservation risk | Recommended future action |
| --- | --- | --- | --- |
| `content/posts/2025-07-06-jobs-200208.md` | B. Empty/zero-byte live URL; D. Filename-fallback URL | high | Search git history and source pipeline first. If recoverable, add minimal front matter while preserving `/posts/2025-07-06-jobs-200208/`. If unrecoverable, owner should decide between noindex/archive/draft after Search Console review. |
| `content/posts/2025-08-03-jobs-215626.md` | B. Empty/zero-byte live URL; D. Filename-fallback URL | high | Search git history and source pipeline first. If recoverable, add minimal front matter while preserving `/posts/2025-08-03-jobs-215626/`. If unrecoverable, owner should decide between noindex/archive/draft after Search Console review. |
| `content/posts/2025-08-17-jobs-223347.md` | B. Empty/zero-byte live URL; D. Filename-fallback URL | high | Search git history and source pipeline first. If recoverable, add minimal front matter while preserving `/posts/2025-08-17-jobs-223347/`. If unrecoverable, owner should decide between noindex/archive/draft after Search Console review. |
| `content/posts/2025-11-18-jobs-210416.md` | B. Empty/zero-byte live URL; D. Filename-fallback URL | high | Search git history and source pipeline first. If recoverable, add minimal front matter while preserving `/posts/2025-11-18-jobs-210416/`. If unrecoverable, owner should decide between noindex/archive/draft after Search Console review. |
| `content/posts/2025-12-24-jobs-235358.md` | C. Source-link-only thin page; D. Filename-fallback URL | high | Review Search Console/traffic and source URL. If kept temporarily, add minimal front matter only while preserving `/posts/2025-12-24-jobs-235358/`. Later archive/noindex/draft is a candidate after owner review. |
| `content/posts/2026-03-09-jobs-195244.md` | B. Empty/zero-byte live URL; D. Filename-fallback URL | high | Search git history and source pipeline first. If recoverable, add minimal front matter while preserving `/posts/2026-03-09-jobs-195244/`. If unrecoverable, owner should decide between noindex/archive/draft after Search Console review. |
| `content/posts/2026-03-28-jobs-210307.md` | C. Source-link-only thin page; D. Filename-fallback URL | high | Review Search Console/traffic and source URL. If kept temporarily, add minimal front matter only while preserving `/posts/2026-03-28-jobs-210307/`. Later archive/noindex/draft is a candidate after owner review. |
| `content/posts/2026-05-05-jobs-221528.md` | C. Source-link-only thin page; D. Filename-fallback URL | high | Review Search Console/traffic and source URL. If kept temporarily, add minimal front matter only while preserving `/posts/2026-05-05-jobs-221528/`. Later archive/noindex/draft is a candidate after owner review. |

## Global URL Preservation Policy

- Do not delete live malformed URLs yet.
- Do not draft live malformed URLs without owner approval.
- Do not move `/posts/` to `/blog/`.
- Do not add a new slug unless it exactly preserves the current filename-derived URL.
- If adding front matter later, preserve the current public URL. Safest options are either to omit `slug` and keep Hugo filename fallback, or set `slug` exactly equal to the filename stem.
- If a malformed page is empty but live or indexed, prefer a noindex/archive policy over deletion until Search Console review is complete.
- Avoid body rewrites in Phase 0F-C-B. If stabilization is approved, limit it to metadata needed for predictable generation.
- Source-link-only pages should not be expanded into invented summaries. Any recovery should use verifiable source/history.
- Do not add redirects or aliases unless a real old public URL needs preservation.
- Keep `/posts/` as the legacy blog route during MVP transition.

## What Not To Change Yet

- Do not edit the 8 malformed post files yet.
- Do not delete, draft, rename, move, noindex, or rewrite these files yet.
- Do not change slug, URL, aliases, title, date, tags, body text, filename, or front matter yet.
- Do not edit `config.toml`, `CNAME`, layouts, themes, generated output, or deployment settings.
- Do not start MVP page work until malformed live URL handling is approved.

## Recommended Next Phase

Recommended next phase: Phase 0F-C-B minimal malformed post stabilization only if owner approval is given.

If the owner wants maximum URL caution, perform Search Console review first. The safest possible Phase 0F-C-B would add minimal front matter to the 8 files while preserving the filename-derived URLs and avoiding body rewrites.
