# Jobplorer URL Preservation Inventory

## Why `/posts/` URL Preservation Is Critical

Jobplorer already has indexed and reachable `/posts/` URLs. Phase 0A confirmed that existing local and live content relies heavily on `/posts/{slug}/` routes.

Changing this path structure without a redirect map would create avoidable search, sharing, analytics, and user-experience risk. The renewal can introduce new sections, but `/posts/` should remain available as a legacy blog route during the MVP transition.

## Local vs Live Sitemap Mismatch

Phase 0A found a meaningful mismatch between the local checkout and the live sitemap:

- Local post file count: 162
- Local inferred unique `/posts/` URL count: 156
- Live sitemap unique `/posts/` URL count: 258
- Live-only unique `/posts/` URLs not represented locally: 102

This means the live site contains or advertises `/posts/` URLs that are not represented by the current local content inventory. Before any migration, cleanup, noindexing, or archive work, the live-only URL set needs a separate review.

## Local Post File Count

The local repository contains 162 Markdown files under `content/posts/`.

## Local Inferred Unique URL Count

The local repository implies 156 unique `/posts/` URLs.

This count is lower than the file count because duplicate slugs produce duplicate targets.

## Live Sitemap Post URL Count

The live sitemap contains 258 unique `/posts/` URLs.

This is substantially higher than the local inferred unique URL count and should be treated as a preservation blocker until resolved.

## Live-Only URL Issue

Phase 0A identified 102 unique live `/posts/` URLs that are not represented in the local checkout.

Possible explanations include:

- Local checkout is missing content that was deployed elsewhere.
- Cloudflare is serving a stale or different build output.
- The live sitemap includes generated or historical URLs not present in this repository state.
- Another deployment source or branch may have been used.

This cannot be resolved from local files alone. Do not assume these URLs are disposable.

## Duplicate Slug Groups From Phase 0A

The following duplicate slug or duplicate target groups were found:

- `2025-job-market-trends`
- `corporate-responsibility-in-disability-employment`
- `disability-employment-public-institutions`
- `empowering-youth-employment`
- `the-power-of-brain-training-through-mobile-games`
- `youth-employment-crisis`

These create duplicate `/posts/.../index.html` targets in Hugo and must be addressed carefully in a later build-compatibility or content-triage phase.

## Malformed / No-Front-Matter Post Issue

Phase 0A found 5 malformed or no-front-matter posts:

- Four zero-byte post files
- One source-link-only post file

These files should not be deleted or changed in Phase 0B. They should be reviewed in a later phase as part of build compatibility and content quality triage.

## Required Policy

- Do not move `/posts/` to `/blog/` without a complete redirect map.
- Do not delete existing `/posts/` without traffic, search, and sitemap review.
- Keep `/posts/` as the legacy blog route during the MVP transition.
- Preserve existing slugs unless there is a documented redirect plan.
- Treat duplicate slugs as URL conflicts, not simple cleanup.
- Treat live-only sitemap URLs as unresolved until their source is known.

## Future URL Inventory Table Placeholder

A complete inventory should be generated later, after the live/local mismatch is resolved or explicitly accepted as a known risk.

| Source | File or Live URL | Title | Date | Draft | Slug | Inferred URL | Status | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
