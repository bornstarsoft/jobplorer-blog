# Jobplorer Phase 14A CNAME Mismatch Cleanup Plan

## Purpose

Phase 14A audits the known repository `CNAME` mismatch and records a safe cleanup plan without changing routing, deployment settings, or source content.

This phase is docs-only. It does not modify `CNAME`, `config.toml`, content, layouts, themes, generated output, or Cloudflare settings.

## Current CNAME Value

The repository root `CNAME` file currently contains:

```text
www.bornstarai.com
```

This does not match the current Jobplorer production identity.

## Current Config baseURL

`config.toml` currently uses:

```toml
baseURL = "https://jobplorer.com/"
```

The Hugo config therefore points to the current Jobplorer apex domain even though the root `CNAME` file still references the historical `www.bornstarai.com` value.

## Current Cloudflare Custom-Domain Behavior

Prior Cloudflare dashboard observations and deployment notes indicate the Pages project is configured for:

- `jobplorer.com`
- `www.jobplorer.com`
- `jobplorer-blog.pages.dev`

The current live route checks also show that Cloudflare is serving the Jobplorer custom domains successfully.

## Live Route Result

Checked on 2026-06-04:

| Route | Result | Notes |
| --- | --- | --- |
| `https://jobplorer.com/` | HTTP 200 | Served by Cloudflare; `cf-cache-status: HIT`; `cache-control: public, max-age=0, must-revalidate`. |
| `https://www.jobplorer.com/` | HTTP 301 | Redirects to `https://jobplorer.com/`. |
| `https://jobplorer-blog.pages.dev/` | HTTP 200 | Pages.dev route remains reachable. |

No immediate live routing failure was observed during this audit.

## Risk Analysis

### Current Runtime Risk

Low, based on current live checks. Cloudflare Pages custom domains appear to be serving `jobplorer.com` and redirecting `www.jobplorer.com` correctly despite the mismatched repository `CNAME`.

### Future Audit Risk

Medium. The stale `CNAME` value can confuse future deployment/source audits because it points to `www.bornstarai.com` while the site, config, sitemap, and Cloudflare custom domains are Jobplorer-specific.

### Deployment Assumption Risk

Medium. Cloudflare Pages may ignore the root `CNAME` file when custom domains are managed in the dashboard, but that should be confirmed before changing the file. If any future deployment path, static host, migration, or GitHub Pages-style workflow honors the repository `CNAME`, the mismatch could point at the wrong brand/domain.

### Change Risk

Low to medium. Updating or removing `CNAME` is probably safe if Cloudflare Pages custom domains are confirmed, but changing it without verification could disturb historical assumptions or make it harder to diagnose a domain issue if another platform unexpectedly reads the file.

## Recommended Safe Future Action

Before any CNAME cleanup:

1. Verify Cloudflare Pages custom domains in the dashboard.
2. Confirm `jobplorer.com` and `www.jobplorer.com` are attached to the `jobplorer-blog` Pages project.
3. Confirm `www.jobplorer.com` intentionally redirects to `jobplorer.com`.
4. Confirm no deployment, DNS, GitHub Pages, or legacy automation still depends on `www.bornstarai.com`.
5. Confirm the root `CNAME` file is ignored by Cloudflare Pages or is safe to align with the active custom domain.

After owner approval in a separate phase, choose one of:

- Update `CNAME` to `jobplorer.com`.
- Remove `CNAME` if Cloudflare Pages does not require it and the repo should avoid stale custom-domain metadata.

The safer default is to update `CNAME` to `jobplorer.com` only after the owner confirms there is no dependency on `www.bornstarai.com`.

## What Not To Change Yet

- Do not modify `CNAME` in Phase 14A.
- Do not change Cloudflare Pages settings.
- Do not change DNS settings.
- Do not change `config.toml`.
- Do not change content, posts, layouts, themes, generated output, job-site pages, country guides, or career guides.
- Do not push a CNAME cleanup without a separate approved phase and deployment verification plan.

## Recommended Next Phase

Phase 14B: controlled CNAME cleanup only after owner approval and dashboard verification.

Phase 14B should include:

- Pre-change live route checks.
- Confirmed Cloudflare custom-domain state.
- A single-file `CNAME` update or removal.
- Local build verification.
- Controlled push.
- Live apex, `www`, pages.dev, sitemap, and route verification after deployment.
