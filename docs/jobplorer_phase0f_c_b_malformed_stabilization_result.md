# Jobplorer Phase 0F-C-B Malformed Post Stabilization Result

## Purpose

Phase 0F-C-B stabilized 8 malformed live post files without removing or changing their public URLs.

The goal was to add minimal front matter so Hugo can generate predictable metadata while preserving all filename-derived `/posts/` URLs exactly.

## Scope

Changed files are limited to:

- 8 malformed files under `content/posts/`
- This result document

This phase did not delete, draft, noindex, archive, rename, move, or rewrite any post. It did not modify `config.toml`, `CNAME`, layouts, themes, generated files, deployment settings, or MVP pages.

## Exact Front Matter Policy

Each malformed file received only this front matter pattern:

```yaml
---
title: "Jobplorer Archive: YYYY-MM-DD"
date: YYYY-MM-DD
slug: "filename-stem"
draft: false
description: "Archived Jobplorer page preserved for URL continuity."
reviewStatus: "legacy-url-preserved"
---
```

Rules applied:

- `date` was inferred from the filename date.
- `slug` exactly matches the filename stem.
- `draft` is explicitly `false`.
- No `noindex` value was added.
- No tags were added.
- Zero-byte files remain empty after front matter.
- Source-link-only body content was preserved exactly.

## 8-File Stabilization Table

| File path | Previous state | Preserved URL | Title added | Date added | Slug added | Body preserved |
| --- | --- | --- | --- | --- | --- | --- |
| `content/posts/2025-07-06-jobs-200208.md` | zero-byte | `/posts/2025-07-06-jobs-200208/` | `Jobplorer Archive: 2025-07-06` | `2025-07-06` | `2025-07-06-jobs-200208` | yes |
| `content/posts/2025-08-03-jobs-215626.md` | zero-byte | `/posts/2025-08-03-jobs-215626/` | `Jobplorer Archive: 2025-08-03` | `2025-08-03` | `2025-08-03-jobs-215626` | yes |
| `content/posts/2025-08-17-jobs-223347.md` | zero-byte | `/posts/2025-08-17-jobs-223347/` | `Jobplorer Archive: 2025-08-17` | `2025-08-17` | `2025-08-17-jobs-223347` | yes |
| `content/posts/2025-11-18-jobs-210416.md` | zero-byte | `/posts/2025-11-18-jobs-210416/` | `Jobplorer Archive: 2025-11-18` | `2025-11-18` | `2025-11-18-jobs-210416` | yes |
| `content/posts/2025-12-24-jobs-235358.md` | source-link-only | `/posts/2025-12-24-jobs-235358/` | `Jobplorer Archive: 2025-12-24` | `2025-12-24` | `2025-12-24-jobs-235358` | yes |
| `content/posts/2026-03-09-jobs-195244.md` | zero-byte | `/posts/2026-03-09-jobs-195244/` | `Jobplorer Archive: 2026-03-09` | `2026-03-09` | `2026-03-09-jobs-195244` | yes |
| `content/posts/2026-03-28-jobs-210307.md` | source-link-only | `/posts/2026-03-28-jobs-210307/` | `Jobplorer Archive: 2026-03-28` | `2026-03-28` | `2026-03-28-jobs-210307` | yes |
| `content/posts/2026-05-05-jobs-221528.md` | source-link-only | `/posts/2026-05-05-jobs-221528/` | `Jobplorer Archive: 2026-05-05` | `2026-05-05` | `2026-05-05-jobs-221528` | yes |

## Build Result

Build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase0f-c-b-after
```

Result: passed on local Hugo 0.152.2.

Build summary:

- Pages: 1169
- Paginator pages: 21
- Static files: 2
- Aliases: 1

## Path Warning Result

Path-warning command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase0f-c-b-after-pathwarnings
```

Result: passed with no duplicate target warnings.

## URL Preservation Result

URL checks after stabilization:

- `content/posts` file count: 268
- Inferred unique `/posts/` URL count: 258
- No files were added, removed, renamed, or moved.
- All 8 old filename-derived URLs are still generated locally.
- All 8 old filename-derived URLs appear in the local sitemap.
- All 8 slugs exactly match their filename stems.
- All 8 files have `draft: false`.
- Existing source-link-only body bytes were preserved exactly.

| Preserved URL | Generated locally | Local sitemap |
| --- | --- | --- |
| `/posts/2025-07-06-jobs-200208/` | yes | yes |
| `/posts/2025-08-03-jobs-215626/` | yes | yes |
| `/posts/2025-08-17-jobs-223347/` | yes | yes |
| `/posts/2025-11-18-jobs-210416/` | yes | yes |
| `/posts/2025-12-24-jobs-235358/` | yes | yes |
| `/posts/2026-03-09-jobs-195244/` | yes | yes |
| `/posts/2026-03-28-jobs-210307/` | yes | yes |
| `/posts/2026-05-05-jobs-221528/` | yes | yes |

Pre-stabilization live checks confirmed all 8 URLs returned HTTP 200. This phase preserved those paths locally; live output will not reflect the metadata stabilization until deployment.

## Remaining Known Issues

- CNAME mismatch remains intentionally untouched.
- Cloudflare Pages Hugo version still needs verification.
- Old auto-news content quality still needs triage.
- Search Console review is still recommended before any noindex, draft, archive, or delete decisions.

## Recommended Next Phase

Recommended next phase: Phase 0F-F Cloudflare Pages Hugo version and CNAME verification.

Phase 1A service MVP structure planning can begin after deployment assumptions are verified, or in parallel as docs-only planning, but runtime deployment identity should be settled before publishing MVP pages.
