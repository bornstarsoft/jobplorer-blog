# Jobplorer Phase 0F-D Duplicate Target Resolution Plan

## Purpose

Phase 0F-D inventories the current duplicate slug/target groups and defines a URL preservation policy before any slug, alias, draft, archive, noindex, or deletion changes are made.

This is a documentation-only phase. No posts, config, layouts, themes, generated files, CNAME, deployment settings, or MVP pages were changed.

## Current Build and Path Warning State

Diagnostic command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase0f-d-public
```

Result: build passed on local Hugo 0.152.2, but Hugo reported 9 duplicate target groups:

- `/posts/2025-job-market-trends/index.html` (2)
- `/posts/corporate-responsibility-in-disability-employment/index.html` (2)
- `/posts/disability-employment-public-institutions/index.html` (2)
- `/posts/empowering-youth-employment/index.html` (2)
- `/posts/the-power-of-brain-training-through-mobile-games/index.html` (2)
- `/posts/youth-employment-challenges/index.html` (2)
- `/posts/youth-employment-chungbuk/index.html` (2)
- `/posts/youth-employment-crisis/index.html` (3)
- `/posts/youth-employment-support-initiatives/index.html` (2)

All 9 duplicate target URLs are present in the live sitemap and returned HTTP 200 during the Phase 0F-D check.

## Duplicate Target Group Table

| Duplicate target URL | Source file | Title | Date | Slug | Live sitemap target present | Current generated winner | Classification |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/posts/2025-job-market-trends/` | `content/posts/2025-08-12-jobs-233529.md` | `2025 Job Market Trends: Insights for New Graduates` | `2025-08-12` | `2025-job-market-trends` | yes | no | same-topic rewritten duplicate |
| `/posts/2025-job-market-trends/` | `content/posts/2025-09-04-jobs-202803.md` | `2025 Job Market Trends for New Graduates` | `2025-09-04` | `2025-job-market-trends` | yes | yes | same-topic rewritten duplicate |
| `/posts/corporate-responsibility-in-disability-employment/` | `content/posts/2025-10-04-jobs-224815.md` | `Corporate Responsibility in Disability Employment` | `2025-10-04` | `corporate-responsibility-in-disability-employment` | yes | no | same-topic rewritten duplicate |
| `/posts/corporate-responsibility-in-disability-employment/` | `content/posts/2025-10-05-jobs-214349.md` | `Corporate Responsibility in Disability Employment` | `2025-10-05` | `corporate-responsibility-in-disability-employment` | yes | yes | same-topic rewritten duplicate |
| `/posts/disability-employment-public-institutions/` | `content/posts/2025-09-07-jobs-234203.md` | `The Importance of Disability Employment in Public Institutions` | `2025-09-07` | `disability-employment-public-institutions` | yes | no | same-topic rewritten duplicate |
| `/posts/disability-employment-public-institutions/` | `content/posts/2025-10-29-jobs-182138.md` | `The Importance of Disability Employment in Public Institutions` | `2025-10-29` | `disability-employment-public-institutions` | yes | yes | same-topic rewritten duplicate |
| `/posts/empowering-youth-employment/` | `content/posts/2025-08-07-jobs-215536.md` | `Empowering Youth Employment through Industry Collaboration` | `2025-08-07` | `empowering-youth-employment` | yes | no | same-topic duplicate / broad slug reuse |
| `/posts/empowering-youth-employment/` | `content/posts/2025-09-20-jobs-204043.md` | `Empowering Youth Through Tailored Employment Programs` | `2025-09-20` | `empowering-youth-employment` | yes | yes | same-topic duplicate / broad slug reuse |
| `/posts/the-power-of-brain-training-through-mobile-games/` | `content/posts/2025-07-26-jobs-195620.md` | `The Power of Brain Training Through Mobile Games` | `2025-07-26` | `the-power-of-brain-training-through-mobile-games` | yes | no | off-position same-topic duplicate |
| `/posts/the-power-of-brain-training-through-mobile-games/` | `content/posts/2025-08-30-jobs-210410.md` | `The Power of Brain Training Through Mobile Games` | `2025-08-30` | `the-power-of-brain-training-through-mobile-games` | yes | yes | off-position same-topic duplicate |
| `/posts/youth-employment-challenges/` | `content/posts/2025-09-19-jobs-205443.md` | `The Challenges of Youth Employment in a Changing Job Market` | `2025-09-19` | `youth-employment-challenges` | yes | no | broad slug reuse / recurring auto-news duplicate |
| `/posts/youth-employment-challenges/` | `content/posts/2026-03-20-jobs-205132.md` | `Youth Employment Challenges Amidst Rising Job Numbers` | `2026-03-20` | `youth-employment-challenges` | yes | yes | broad slug reuse / recurring auto-news duplicate |
| `/posts/youth-employment-chungbuk/` | `content/posts/2025-12-17-jobs-190147.md` | `Youth Employment in Chungbuk: A Double-Edged Sword` | `2025-12-17` | `youth-employment-chungbuk` | yes | no | same-region same-topic duplicate |
| `/posts/youth-employment-chungbuk/` | `content/posts/2026-01-25-jobs-223454.md` | `Youth Employment Rates: A Beacon of Hope in Chungbuk` | `2026-01-25` | `youth-employment-chungbuk` | yes | yes | same-region same-topic duplicate |
| `/posts/youth-employment-crisis/` | `content/posts/2025-07-28-jobs-210831.md` | `Youth Employment Crisis: A Wake-Up Call for the Future` | `2025-07-28` | `youth-employment-crisis` | yes | no | broad slug reuse / recurring auto-news duplicate |
| `/posts/youth-employment-crisis/` | `content/posts/2025-10-17-jobs-195113.md` | `Youth Employment Crisis Amidst Rising Job Numbers` | `2025-10-17` | `youth-employment-crisis` | yes | no | broad slug reuse / recurring auto-news duplicate |
| `/posts/youth-employment-crisis/` | `content/posts/2026-01-16-jobs-181417.md` | `Youth Employment Crisis: A Global Concern` | `2026-01-16` | `youth-employment-crisis` | yes | yes | broad slug reuse / recurring auto-news duplicate |
| `/posts/youth-employment-support-initiatives/` | `content/posts/2025-07-08-jobs-213603.md` | `Youth Employment Support Initiatives: A Model for Global Engagement` | `2025-07-08` | `youth-employment-support-initiatives` | yes | no | broad slug reuse / recurring auto-news duplicate |
| `/posts/youth-employment-support-initiatives/` | `content/posts/2026-03-27-jobs-195648.md` | `Youth Employment Support Initiatives: A Collaborative Approach` | `2026-03-27` | `youth-employment-support-initiatives` | yes | yes | broad slug reuse / recurring auto-news duplicate |

## Current Generated Winner Notes

The temporary local build output shows that the newer file is currently winning each duplicate target group. This was verified by generated `<title>`, `<h1>`, published date metadata, and generated body text where needed.

| Duplicate target URL | Current generated winner | Evidence |
| --- | --- | --- |
| `/posts/2025-job-market-trends/` | `content/posts/2025-09-04-jobs-202803.md` | Generated title/body matches `2025 Job Market Trends for New Graduates`. |
| `/posts/corporate-responsibility-in-disability-employment/` | `content/posts/2025-10-05-jobs-214349.md` | Generated body starts with the newer 2025-10-05 version. |
| `/posts/disability-employment-public-institutions/` | `content/posts/2025-10-29-jobs-182138.md` | Generated body starts with the newer 2025-10-29 version. |
| `/posts/empowering-youth-employment/` | `content/posts/2025-09-20-jobs-204043.md` | Generated title/body matches `Empowering Youth Through Tailored Employment Programs`. |
| `/posts/the-power-of-brain-training-through-mobile-games/` | `content/posts/2025-08-30-jobs-210410.md` | Generated metadata date is `2025-08-30`; body references the newer digital landscape wording. |
| `/posts/youth-employment-challenges/` | `content/posts/2026-03-20-jobs-205132.md` | Generated title/body matches `Youth Employment Challenges Amidst Rising Job Numbers`. |
| `/posts/youth-employment-chungbuk/` | `content/posts/2026-01-25-jobs-223454.md` | Generated metadata date is `2026-01-25`; body references the `74.2%` Chungbuk employment rate. |
| `/posts/youth-employment-crisis/` | `content/posts/2026-01-16-jobs-181417.md` | Generated title/body matches `Youth Employment Crisis: A Global Concern`. |
| `/posts/youth-employment-support-initiatives/` | `content/posts/2026-03-27-jobs-195648.md` | Generated title/body matches `Youth Employment Support Initiatives: A Collaborative Approach`. |

## Live Status Notes

Each duplicate target URL returned HTTP 200 on the live site during the Phase 0F-D check.

| Duplicate target URL | Live HTTP status | Live sitemap target present |
| --- | --- | --- |
| `https://jobplorer.com/posts/2025-job-market-trends/` | 200 | yes |
| `https://jobplorer.com/posts/corporate-responsibility-in-disability-employment/` | 200 | yes |
| `https://jobplorer.com/posts/disability-employment-public-institutions/` | 200 | yes |
| `https://jobplorer.com/posts/empowering-youth-employment/` | 200 | yes |
| `https://jobplorer.com/posts/the-power-of-brain-training-through-mobile-games/` | 200 | yes |
| `https://jobplorer.com/posts/youth-employment-challenges/` | 200 | yes |
| `https://jobplorer.com/posts/youth-employment-chungbuk/` | 200 | yes |
| `https://jobplorer.com/posts/youth-employment-crisis/` | 200 | yes |
| `https://jobplorer.com/posts/youth-employment-support-initiatives/` | 200 | yes |

Because duplicate source files share a single target URL, the live sitemap can only confirm the target URL, not distinguish which local source file produced it. The local build output should be treated as the best local source-of-truth for current generated winner analysis until Cloudflare deployment commit and Hugo version are verified.

## Risk Classification

Overall duplicate target risk: high.

Reasons:

- These URLs are live and sitemap-listed.
- One URL is shared by two or three source files, so a slug change can unexpectedly create, remove, or alter public URLs.
- Some older files may have historically occupied the same live URL before later duplicate posts shadowed them.
- Adding `aliases` from duplicate loser posts back to the shared URL would preserve the conflict and should be avoided unless a clear canonical target is chosen.
- Deleting or drafting a duplicate loser may be safer than publishing a new URL, but only after traffic, indexing, and content-quality review.

## Per-Group Recommended Future Action

| Duplicate target URL | Proposed canonical winner to preserve | Duplicate loser handling | Redirect / alias requirement | URL preservation risk |
| --- | --- | --- | --- | --- |
| `/posts/2025-job-market-trends/` | Preserve `content/posts/2025-09-04-jobs-202803.md` at the current URL unless analytics shows otherwise. | Merge/rewrite or archive the 2025-08-12 version after review. | Do not alias the loser back to the shared URL. Add redirects only if a separate historical URL is found. | high |
| `/posts/corporate-responsibility-in-disability-employment/` | Preserve `content/posts/2025-10-05-jobs-214349.md` at the current URL unless analytics shows otherwise. | Merge/rewrite or archive the 2025-10-04 version after review. | Do not alias the loser back to the shared URL. Add redirects only if a separate historical URL is found. | high |
| `/posts/disability-employment-public-institutions/` | Preserve `content/posts/2025-10-29-jobs-182138.md` at the current URL unless analytics shows otherwise. | Merge/rewrite or archive the 2025-09-07 version after review. | Do not alias the loser back to the shared URL. Add redirects only if a separate historical URL is found. | high |
| `/posts/empowering-youth-employment/` | Preserve `content/posts/2025-09-20-jobs-204043.md` at the current URL unless analytics shows otherwise. | Consider unique slug only if keeping both posts is valuable; otherwise archive/noindex the older version after review. | If creating a new URL for the loser, avoid aliasing from the shared URL because the shared URL belongs to the canonical winner. | high |
| `/posts/the-power-of-brain-training-through-mobile-games/` | Preserve `content/posts/2025-08-30-jobs-210410.md` at the current URL for now. | Off-position content; archive/noindex/delete candidate only after traffic/search review. | Do not redirect the shared URL away until the canonical decision is made. | high |
| `/posts/youth-employment-challenges/` | Preserve `content/posts/2026-03-20-jobs-205132.md` at the current URL unless analytics shows otherwise. | Broad recurring topic; consider merge/rewrite into one legacy post or archive older version after review. | Avoid aliasing loser to the shared URL. Redirects only after confirming separate historical URLs. | high |
| `/posts/youth-employment-chungbuk/` | Preserve `content/posts/2026-01-25-jobs-223454.md` at the current URL unless analytics shows otherwise. | Same-region duplicate; consider merge/rewrite or archive older version after review. | Avoid aliasing loser to the shared URL. Redirects only after confirming separate historical URLs. | high |
| `/posts/youth-employment-crisis/` | Preserve `content/posts/2026-01-16-jobs-181417.md` at the current URL unless analytics shows otherwise. | Three-post recurring topic; merge/rewrite or archive two older versions after review. | Avoid aliasing losers to the shared URL. Redirects only after confirming separate historical URLs. | high |
| `/posts/youth-employment-support-initiatives/` | Preserve `content/posts/2026-03-27-jobs-195648.md` at the current URL unless analytics shows otherwise. | Different initiatives under one broad slug; consider unique slug for loser only if it should remain public, otherwise archive/noindex after review. | Avoid aliasing loser to the shared URL. Redirects only after confirming separate historical URLs. | high |

## Global URL Preservation Policy

- Do not change any duplicate slug until the canonical winner for that target URL is explicitly approved.
- Do not delete duplicate posts in the first resolution pass.
- Do not move `/posts/` to `/blog/`.
- Preserve each existing live duplicate target URL until a canonical winner is decided.
- Treat the current generated winner as the provisional canonical winner, because it is what Hugo currently emits for the live target path.
- Before changing a loser slug, decide whether the loser should remain public. If it should not remain public, draft/archive/noindex review is safer than creating a new indexed URL.
- Do not add aliases from duplicate loser posts to the shared duplicate URL; that would keep the target conflict alive.
- Add redirects or aliases only after confirming a real old public URL that must be preserved.
- Check Search Console, Cloudflare deployment commit, and analytics before removing or redirecting any live URL.
- Keep `/posts/` as a legacy blog route during the MVP transition.

## What Not To Change Yet

- Do not edit `content/posts`.
- Do not change any `slug`, `url`, `aliases`, title, date, tags, body text, filename, draft status, noindex, or canonical value.
- Do not edit `config.toml`, `CNAME`, layouts, themes, or generated output.
- Do not change Cloudflare Pages settings or purge cache.
- Do not add MVP pages while duplicate target policy is still open.

## Recommended Next Phase

Recommended next phase: Phase 0F-D-B minimal duplicate resolution.

The local build already passes after Phase 0F-B, and the duplicate targets are now the most visible build warning and URL preservation risk. Phase 0F-C malformed post handling can proceed separately, but it should not be mixed with duplicate target resolution.
