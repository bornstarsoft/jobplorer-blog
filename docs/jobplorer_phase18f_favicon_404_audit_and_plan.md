# Jobplorer Phase 18F Favicon 404 Audit And Plan

## Purpose

Phase 18F investigates the missing `/favicon.ico` request observed during Phase 18C browser QA and prepares a minimal remediation plan.

This phase is docs-only. It does not add an icon, modify config, edit the Ananke theme, change site content, or push.

## Phase 18E Report Commit

The Phase 18E deployment report was committed before this audit:

```text
9e680cc Document heading and metadata deployment
```

Committed file:

- `docs/jobplorer_phase18e_heading_metadata_deployment_result.md`

## Source Inspection

### Config

`config.toml` contains an existing `[params]` section but does not define:

```text
favicon
```

### Ananke Partial

The active theme partial is:

```text
themes/ananke/layouts/partials/site-favicon.html
```

Its behavior is:

```go-html-template
{{ if .Site.Params.favicon }}
<link rel="shortcut icon" href="{{ urls.RelURL ($.Site.Params.favicon) }}" type="image/x-icon" />
{{ end }}
```

The favicon link is emitted only when `params.favicon` is configured.

### Static Assets

The project `static/` directory contains no files.

No project favicon or logo asset was found with these extensions:

- `.ico`
- `.png`
- `.svg`
- `.webp`
- `.jpg`
- `.jpeg`

The Ananke theme includes a sample hero image but does not provide a site favicon.

## Local Build Result

Commands checked:

```text
hugo --gc --minify --noBuildLock --cacheDir /tmp/jobplorer-phase18f-cache --destination /tmp/jobplorer-phase18f-build
hugo --gc --minify --printPathWarnings --noBuildLock --cacheDir /tmp/jobplorer-phase18f-path-cache --destination /tmp/jobplorer-phase18f-pathwarnings
```

Results:

- Standard production build: passed
- Path-warning build: passed
- Duplicate/path warnings: none observed
- Generated pages: 1,200

Generated homepage head:

- favicon links: none

Generated files:

- `/favicon.ico`: absent
- `/favicon.svg`: absent
- `/apple-touch-icon.png`: absent

## Live Route Result

Read-only live checks:

| URL | Result |
| --- | --- |
| `https://jobplorer.com/favicon.ico` | HTTP 404 |
| `https://www.jobplorer.com/favicon.ico` | HTTP 301 to apex favicon path |
| `https://jobplorer-blog.pages.dev/favicon.ico` | HTTP 404 |

The live homepage also contains no favicon `<link>` element.

The apex and pages.dev 404 responses used:

```text
cache-control: no-store
cf-cache-status: BYPASS
```

This confirms a missing resource rather than a stale cached icon.

## Cause

The browser behavior is expected from the current source:

1. Jobplorer does not configure `params.favicon`.
2. Ananke therefore emits no favicon link.
3. Browsers may still request the conventional `/favicon.ico` path.
4. No file exists at that path.
5. The request returns HTTP 404 and appears as the only console error during local browser QA.

This does not affect page indexing, canonical URLs, sitemap membership, or primary content rendering.

## Safe Options

### Option A: Leave As-Is

Action:

- make no source change

Result:

- browsers continue to request `/favicon.ico`
- the route continues to return 404
- tabs and bookmarks use a generic icon

Risk level: low operational risk, but the avoidable console error remains.

### Option B: Add Only `static/favicon.ico`

Action:

- add a valid multi-size ICO file at `static/favicon.ico`

Result:

- the conventional `/favicon.ico` request succeeds
- browsers that probe the default path can display the icon
- the HTML head still has no explicit favicon declaration

Risk level: low.

### Option C: Add The File And Configure Ananke

Action:

- add `static/favicon.ico`
- add `favicon = "favicon.ico"` to the existing `[params]` section in `config.toml`

Result:

- Hugo copies the icon to `/favicon.ico`
- Ananke emits an explicit shortcut-icon link
- conventional browser requests and declared favicon discovery use the same asset

Risk level: low.

This is the recommended option.

### Option D: Theme Or Head Override

Action:

- edit the Ananke partial or add a local head override with multiple icon formats

Result:

- supports richer SVG, PNG, and Apple touch icon declarations
- increases source and maintenance scope

Risk level: moderate relative to the current need.

Decision: do not use this option for the first fix.

## Recommended Asset Requirements

The initial favicon should:

- be an original Jobplorer asset
- use a simple high-contrast `J` monogram
- remain recognizable at 16 by 16 pixels
- include standard ICO sizes such as 16, 32, and 48 pixels
- use the existing black-and-white visual language
- avoid third-party logos, trademarks, rankings, or decorative complexity
- contain no tracking or external dependency

The binary should be inspected after generation and should not be copied from the Ananke sample assets.

## Phase 18G Validation Checklist

For a local-only implementation:

1. Add only `static/favicon.ico`.
2. Add only `favicon = "favicon.ico"` under `[params]`.
3. Create one Phase 18G result report.
4. Run standard and path-warning Hugo builds.
5. Confirm generated `/favicon.ico` exists.
6. Confirm generated HTML contains one favicon link to `/favicon.ico`.
7. Confirm the generated icon has valid ICO format and expected embedded sizes.
8. Serve the temporary build locally.
9. Confirm `/favicon.ico` returns HTTP 200.
10. Confirm Playwright reports no missing-favicon console error.
11. Confirm homepage and representative content pages still render.
12. Confirm all 14 tracked URLs and 258 post detail URLs remain preserved.
13. Do not push until the owner reviews the asset and local result.

## What Not To Change

- content pages or posts
- page titles or descriptions
- URLs, slugs, canonicals, or robots behavior
- sitemap configuration
- CNAME or Cloudflare settings
- Ananke theme files
- site logo or navigation wording
- existing publication or review status

## Recommended Next Step

Proceed with Phase 18G as a local-only favicon implementation using Option C. Keep the change limited to `static/favicon.ico`, one `config.toml` line, and one result report.
