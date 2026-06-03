# Jobplorer Phase 8D Homepage Legacy Feed Reduction Plan

## Purpose

Phase 8D investigates safe ways to reduce or reframe the auto-rendered legacy post feed on the homepage without changing source behavior yet. This phase is docs-only.

## Current Homepage Behavior

The homepage now renders service-hub sections first:

- Reviewed Job Site Profiles
- Featured Career Guide
- Practical Job Search Guides
- Secondary Archive

After the homepage body content, the generated page still renders recent legacy post cards and a `More` section. This keeps the old `/posts/` archive visible on the homepage and can make Jobplorer feel partly like a news-feed blog even after the service-hub update.

## Cause of Auto-Rendered Legacy Feed

The legacy feed is Ananke homepage behavior.

Relevant files/settings inspected:

- `content/_index.md`
- `config.toml`
- `themes/ananke/layouts/index.html`
- `themes/ananke/layouts/_default/list.html`
- `themes/ananke/layouts/partials/summary-with-image.html`
- `themes/ananke/layouts/_default/summary-with-image.html`

Key findings:

- `themes/ananke/layouts/index.html` renders `{{ .Content }}` first.
- The same template then defines `$mainSections := site.Params.mainSections`.
- This repo sets `mainSections = ["posts"]` in `config.toml`.
- Ananke's default params set `show_recent_posts = true`.
- The homepage template collects `$.Site.RegularPages` where `Section` is in `mainSections`.
- Because `mainSections` is `["posts"]`, the homepage pulls recent `/posts/` pages after the custom homepage content.
- The first recent posts are rendered with `.Render "summary-with-image"`, followed by a `More` section with additional post links.

So the feed is not caused by the homepage Markdown itself. It is caused by the Ananke homepage template combined with `mainSections = ["posts"]` and Ananke's recent-posts behavior.

## Safe Options

### A. Content-Only Framing

Add stronger wording to `content/_index.md` immediately before the auto-rendered feed would appear, such as a clearer "Legacy archive appears below" note.

Risk level: Low.

Pros:

- Does not touch config, layouts, or theme files.
- Preserves every `/posts/` URL and the homepage feed behavior.
- Easy to verify and roll back.

Cons:

- It cannot actually reduce or remove the post cards.
- The page may still feel news-feed-like after the service-hub sections.

### B. Config-Level Adjustment

Use Ananke configuration to disable or reduce homepage recent posts, for example by setting an Ananke recent-posts parameter if supported by the local theme version.

Likely candidate:

- `[params.ananke]`
- `show_recent_posts = false`

Risk level: Medium.

Pros:

- Avoids layout/theme overrides.
- Directly addresses the auto-rendered homepage post cards.
- Keeps `/posts/` archive URLs intact.

Cons:

- Requires modifying `config.toml`.
- Must verify the local theme version respects `site.Params.ananke.show_recent_posts`.
- Could change homepage behavior more broadly than expected if Ananke uses this parameter in other contexts.

### C. Custom Homepage Layout Override

Create a local `layouts/index.html` override based on Ananke's homepage template, but remove or reframe the recent-posts block.

Risk level: Medium to High.

Pros:

- Gives precise homepage control.
- Could preserve service-hub sections while replacing the feed with a clearly labeled legacy archive callout.

Cons:

- Introduces local layout ownership.
- Must track Ananke template changes manually in the future.
- Larger QA surface across desktop/mobile and future Hugo/theme updates.
- Higher chance of accidental design or behavior drift.

### D. Leave As-Is For Now

Do not change the homepage feed immediately. Monitor Search Console and user-facing needs after the Phase 8B service-hub update.

Risk level: Low.

Pros:

- No implementation risk.
- Keeps legacy post discoverability and URL continuity untouched.
- Allows Search Console data to inform whether homepage feed reduction is needed.

Cons:

- Homepage may continue to feel partly like a blog/news feed.
- Old auto-news summaries remain visible after the hub content.

## Recommended Option for Phase 8E

Recommended Phase 8E option: config-level adjustment in a controlled local test.

Specifically, test whether setting `params.ananke.show_recent_posts = false` in `config.toml` removes the auto-rendered homepage post cards while preserving:

- `/posts/` archive route
- 258 published `/posts/` URLs
- reviewed job site pages
- Software Developers guide
- sitemap stability
- homepage service-hub sections

This should be treated as a local test first. Do not push until build, route, sitemap, and homepage-rendering verification confirm the outcome.

If config-level adjustment has unwanted side effects, fall back to Option A for safer content-only framing or plan Option C as a separate layout phase.

## What Not To Change Yet

- Do not modify `content/_index.md` during Phase 8D.
- Do not modify `config.toml` during Phase 8D.
- Do not modify layouts or themes during Phase 8D.
- Do not modify `content/posts/*.md`.
- Do not move `/posts/` to `/blog/`.
- Do not delete, draft, noindex, rename, or rewrite posts.
- Do not change CNAME, Cloudflare settings, public output, job site pages, country guides, or career guides.

## Validation Checklist for Future Implementation

Any future Phase 8E implementation should verify:

- Hugo production build passes.
- Hugo path-warning build passes with no duplicate target warnings.
- Homepage still renders service-hub sections.
- Reviewed Job Site Profiles remain visible or linked.
- Software Developers guide remains visible or linked.
- Practical Job Search Guides remain visible or linked.
- `/posts/` remains accessible as Legacy Job News Archive.
- Published `/posts/` URL count remains 258.
- LinkedIn, Indeed, Glassdoor, and Software Developers routes still generate.
- The four rewritten legacy post URLs still generate.
- Local sitemap preserves required URLs.
- No protected files are changed outside the approved scope.
- No generated Hugo artifacts remain in the repo.

## Build Check

Production build passed:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase8d-build
```

Path-warning build passed with no duplicate target warnings:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase8d-pathwarnings
```
