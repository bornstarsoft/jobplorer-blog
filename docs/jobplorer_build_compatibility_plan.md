# Jobplorer Phase 0C Build Compatibility Plan

## Purpose

This document records the build compatibility and URL reconciliation plan for Jobplorer Phase 0C.

Phase 0C is planning only. It does not fix `config.toml`, `CNAME`, content, layouts, themes, Cloudflare settings, or generated files.

The immediate goal is to make the future fix sequence explicit before any runtime behavior changes are made.

## Current Build Status

Local Hugo version:

```text
hugo v0.152.2+extended+withdeploy darwin/arm64 BuildDate=2025-10-24T15:31:49Z VendorInfo=brew
```

Diagnostic build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase0c-public
```

Diagnostic result:

- Exit code: nonzero
- Build status: failed
- Logged errors: 29

Exact leading compatibility error:

```text
ERROR deprecated: site config key paginate was deprecated in Hugo v0.128.0 and subsequently removed. Use pagination.pagerSize instead.
```

Exact final build failure line:

```text
Error: error building site: logged 29 error(s)
```

Additional diagnostic command for duplicate target warnings:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase0c-public-pathwarn --printPathWarnings
```

Exact duplicate-target warning:

```text
WARN  Duplicate target paths: /posts/2025-job-market-trends/index.html (2), /posts/corporate-responsibility-in-disability-employment/index.html (2), /posts/disability-employment-public-institutions/index.html (2), /posts/empowering-youth-employment/index.html (2), /posts/the-power-of-brain-training-through-mobile-games/index.html (2), /posts/youth-employment-crisis/index.html (2)
```

Hugo generated `.hugo_build.lock` and `resources/` during diagnostics. Only those generated artifacts were removed after the diagnostic builds.

## Hugo Version Mismatch

Phase 0A found that the live homepage reports:

```text
Hugo 0.128.0
```

Local diagnostics use:

```text
Hugo 0.152.2
```

This matters because the live deployment may still build successfully with Hugo `0.128.0`, while local Hugo `0.152.2` rejects the current config and date formats.

Before changing runtime files, confirm the Cloudflare Pages Hugo version and build settings. If Cloudflare is pinned to Hugo `0.128.0`, local and production behavior may diverge until the repository is made compatible with newer Hugo.

## Paginate Compatibility Plan

Current location:

```text
config.toml:6:paginate = 12
```

Problem:

- `paginate` was deprecated in Hugo `0.128.0`.
- It is removed in local Hugo `0.152.2`.

Safe future replacement:

```toml
[pagination]
  pagerSize = 12
```

Future change policy:

- Do not edit `config.toml` until URL reconciliation and Cloudflare build settings are reviewed.
- When approved, replace `paginate = 12` with `[pagination] pagerSize = 12`.
- After the change, run local Hugo diagnostics with current Hugo and confirm the live build setting can support it.

## Date Parsing Compatibility Plan

Problem:

- 28 posts use Korean-formatted date strings.
- Local Hugo `0.152.2` does not parse them as dates.

Future change policy:

- Convert only the date values after approval.
- Preserve titles, slugs, content, and URLs.
- Use direct conversion from Korean date strings to ISO `YYYY-MM-DD`.
- Confirm each converted date against the filename and content context before editing.

Proposed date conversions:

| Path | Current date value | Proposed ISO date | Confidence |
| --- | --- | --- | --- |
| `content/posts/2025-05-28-newsbrief-075526.md` | `2023년 10월 27일` | `2023-10-27` | High: direct Korean date conversion |
| `content/posts/2025-05-29-newsbrief-125520.md` | `2025년 5월 29일` | `2025-05-29` | High: direct Korean date conversion |
| `content/posts/2025-05-31-newsbrief-125521.md` | `2023년 10월 29일` | `2023-10-29` | High: direct Korean date conversion |
| `content/posts/2025-06-01-newsbrief-125521.md` | `2023년 10월 1일` | `2023-10-01` | High: direct Korean date conversion |
| `content/posts/2025-06-03-newsbrief-125516.md` | `2023년 10월 3일` | `2023-10-03` | High: direct Korean date conversion |
| `content/posts/2025-06-04-newsbrief-125527.md` | `2023년 10월 4일` | `2023-10-04` | High: direct Korean date conversion |
| `content/posts/2025-06-05-newsbrief-125517.md` | `2023년 10월 5일` | `2023-10-05` | High: direct Korean date conversion |
| `content/posts/2025-06-06-newsbrief-125516.md` | `2023년 10월 6일` | `2023-10-06` | High: direct Korean date conversion |
| `content/posts/2025-06-08-newsbrief-125528.md` | `2025년 6월 8일` | `2025-06-08` | High: direct Korean date conversion |
| `content/posts/2025-06-09-newsbrief-125517.md` | `2023년 10월 9일` | `2023-10-09` | High: direct Korean date conversion |
| `content/posts/2025-06-10-newsbrief-125527.md` | `2023년 10월 5일` | `2023-10-05` | High: direct Korean date conversion |
| `content/posts/2025-06-11-newsbrief-125519.md` | `2023년 10월 11일` | `2023-10-11` | High: direct Korean date conversion |
| `content/posts/2025-06-12-newsbrief-125531.md` | `2025년 6월 12일` | `2025-06-12` | High: direct Korean date conversion |
| `content/posts/2025-06-13-newsbrief-125523.md` | `2025년 6월 13일` | `2025-06-13` | High: direct Korean date conversion |
| `content/posts/2025-06-14-newsbrief-125517.md` | `2025년 6월 14일` | `2025-06-14` | High: direct Korean date conversion |
| `content/posts/2025-06-15-newsbrief-125519.md` | `2025년 6월 15일` | `2025-06-15` | High: direct Korean date conversion |
| `content/posts/2025-06-16-newsbrief-125524.md` | `2023년 10월 16일` | `2023-10-16` | High: direct Korean date conversion |
| `content/posts/2025-06-17-newsbrief-125523.md` | `2023년 10월 17일` | `2023-10-17` | High: direct Korean date conversion |
| `content/posts/2025-06-18-newsbrief-125524.md` | `2025년 6월 18일` | `2025-06-18` | High: direct Korean date conversion |
| `content/posts/2025-06-19-newsbrief-125526.md` | `2025년 6월 19일` | `2025-06-19` | High: direct Korean date conversion |
| `content/posts/2025-06-20-newsbrief-125524.md` | `2025년 6월 20일` | `2025-06-20` | High: direct Korean date conversion |
| `content/posts/2025-06-22-newsbrief-125517.md` | `2025년 6월 22일` | `2025-06-22` | High: direct Korean date conversion |
| `content/posts/2025-06-23-newsbrief-125521.md` | `2023년 10월 23일` | `2023-10-23` | High: direct Korean date conversion |
| `content/posts/2025-06-24-newsbrief-125530.md` | `2023년 10월 24일` | `2023-10-24` | High: direct Korean date conversion |
| `content/posts/2025-06-25-newsbrief-125520.md` | `2025년 6월 25일` | `2025-06-25` | High: direct Korean date conversion |
| `content/posts/2025-06-26-newsbrief-125520.md` | `2023년 10월 26일` | `2023-10-26` | High: direct Korean date conversion |
| `content/posts/2025-06-27-newsbrief-125517.md` | `2023년 10월 5일` | `2023-10-05` | High: direct Korean date conversion |
| `content/posts/2025-06-27-newsbrief-145205.md` | `2025년 6월 27일` | `2025-06-27` | High: direct Korean date conversion |

## Malformed Post Handling Plan

Problem:

- 5 files lack usable front matter.
- 4 are zero-byte files.
- 1 is source-link-only.

Future change policy:

- Do not delete immediately.
- Review git history and live sitemap before deciding action.
- If a URL is live or indexed, preserve or redirect it.
- Prefer recovery from history if original metadata/content exists.

| Path | Size / state | Likely future action |
| --- | --- | --- |
| `content/posts/2025-07-06-jobs-200208.md` | 0 bytes; zero-byte file | Recover from history if possible; otherwise archive/noindex/delete candidate after URL review |
| `content/posts/2025-08-03-jobs-215626.md` | 0 bytes; zero-byte file | Recover from history if possible; otherwise archive/noindex/delete candidate after URL review |
| `content/posts/2025-08-17-jobs-223347.md` | 0 bytes; zero-byte file | Recover from history if possible; otherwise archive/noindex/delete candidate after URL review |
| `content/posts/2025-11-18-jobs-210416.md` | 0 bytes; zero-byte file | Recover from history if possible; otherwise archive/noindex/delete candidate after URL review |
| `content/posts/2025-12-24-jobs-235358.md` | 85 bytes; no front matter; source-link-only | Recover title/date/slug from history or convert to draft/archive candidate after URL review |

## Duplicate Slug Handling Plan

Problem:

- 6 duplicate targets exist.
- Hugo can overwrite or mask one generated page with another.
- Duplicate targets are URL preservation risks, not just content cleanup issues.

Future resolution principles:

- Keep one canonical legacy URL per duplicate group.
- Decide the canonical file only after reviewing live URL, sitemap, search, and traffic data.
- For non-canonical duplicates, use unique slugs only if a redirect or alias policy is approved.
- Avoid deleting duplicates before live/local URL reconciliation.

| Duplicate target URL | Involved files | Title/date | Recommended future resolution | URL preservation risk |
| --- | --- | --- | --- | --- |
| `/posts/2025-job-market-trends/` | `content/posts/2025-08-12-jobs-233529.md`; `content/posts/2025-09-04-jobs-202803.md` | `2025 Job Market Trends: Insights for New Graduates` / `2025-08-12`; `2025 Job Market Trends for New Graduates` / `2025-09-04` | Keep one canonical legacy URL; give the other a unique slug only with aliases/redirect policy after traffic/search review | High: one generated page can overwrite or mask another |
| `/posts/corporate-responsibility-in-disability-employment/` | `content/posts/2025-10-04-jobs-224815.md`; `content/posts/2025-10-05-jobs-214349.md` | `Corporate Responsibility in Disability Employment` / `2025-10-04`; `Corporate Responsibility in Disability Employment` / `2025-10-05` | Keep one canonical legacy URL; give the other a unique slug only with aliases/redirect policy after traffic/search review | High: one generated page can overwrite or mask another |
| `/posts/disability-employment-public-institutions/` | `content/posts/2025-09-07-jobs-234203.md`; `content/posts/2025-10-29-jobs-182138.md` | `The Importance of Disability Employment in Public Institutions` / `2025-09-07`; `The Importance of Disability Employment in Public Institutions` / `2025-10-29` | Keep one canonical legacy URL; give the other a unique slug only with aliases/redirect policy after traffic/search review | High: one generated page can overwrite or mask another |
| `/posts/empowering-youth-employment/` | `content/posts/2025-08-07-jobs-215536.md`; `content/posts/2025-09-20-jobs-204043.md` | `Empowering Youth Employment through Industry Collaboration` / `2025-08-07`; `Empowering Youth Through Tailored Employment Programs` / `2025-09-20` | Keep one canonical legacy URL; give the other a unique slug only with aliases/redirect policy after traffic/search review | High: one generated page can overwrite or mask another |
| `/posts/the-power-of-brain-training-through-mobile-games/` | `content/posts/2025-07-26-jobs-195620.md`; `content/posts/2025-08-30-jobs-210410.md` | `The Power of Brain Training Through Mobile Games` / `2025-07-26`; `The Power of Brain Training Through Mobile Games` / `2025-08-30` | Keep one canonical legacy URL; give the other a unique slug only with aliases/redirect policy after traffic/search review | High: one generated page can overwrite or mask another |
| `/posts/youth-employment-crisis/` | `content/posts/2025-07-28-jobs-210831.md`; `content/posts/2025-10-17-jobs-195113.md` | `Youth Employment Crisis: A Wake-Up Call for the Future` / `2025-07-28`; `Youth Employment Crisis Amidst Rising Job Numbers` / `2025-10-17` | Keep one canonical legacy URL; give the other a unique slug only with aliases/redirect policy after traffic/search review | High: one generated page can overwrite or mask another |

## Live / Local Sitemap Mismatch Plan

Phase 0A found:

- Local inferred unique `/posts/` URLs: 156
- Live sitemap unique `/posts/` URLs: 258
- Live-only unique `/posts/` URLs not represented locally: 102

This is a URL preservation blocker.

Safe future investigation steps:

- Run `git fetch` and inspect remote history after approval.
- Check whether older commits or branches contain the 102 live-only posts.
- Review Cloudflare Pages deployment source, production branch, build command, and Hugo version.
- Check whether a previous build artifact or stale deployment is being served.
- Export the live sitemap and keep it as an audit artifact before making URL changes.
- Review Google Search Console pages/indexing data before deleting, drafting, noindexing, or moving old URLs.
- Compare live-only URLs with analytics/search traffic if access is available.

Do not modify deployment settings during this investigation.

## CNAME Mismatch Note

Current conflict:

- Repo `CNAME` contains `www.bornstarai.com`.
- `config.toml` uses `https://jobplorer.com/`.
- The live site serves `https://jobplorer.com/`.

This should be investigated before deployment changes, but not fixed in Phase 0C.

Possible explanations:

- The file is stale.
- Cloudflare Pages ignores it.
- The repo was repurposed from another domain.
- Another deployment configuration overrides it.

Do not change `CNAME` until deployment ownership and routing are verified.

## Recommended Safe Fix Order

A. Commit Phase 0B and Phase 0C docs first.

B. Confirm Cloudflare Pages build Hugo version.

C. Reconcile live-only URLs.

D. Fix config pagination compatibility.

E. Fix date formats.

F. Resolve malformed files.

G. Resolve duplicate slugs with aliases or redirect policy.

H. Run local Hugo build cleanly.

I. Only then start Phase 1 MVP structure.

## What Not To Change Yet

- Do not modify `config.toml`.
- Do not modify `CNAME`.
- Do not modify `content/posts`.
- Do not modify layouts.
- Do not modify themes.
- Do not modify generated `public` files.
- Do not delete, rename, or move existing files.
- Do not change Cloudflare, DNS, GitHub, or deployment settings.
- Do not move `/posts/` to `/blog/`.
- Do not publish new MVP pages until build and URL preservation risks are handled.

## Final Acceptance Checklist Before Phase 1

Before Phase 1 begins:

- Phase 0B and Phase 0C docs are committed.
- Cloudflare Pages Hugo version and build command are known.
- Live-only `/posts/` URLs are reconciled or explicitly accepted as a known risk.
- `config.toml` builds locally with current Hugo.
- All date fields are parseable by current Hugo.
- Malformed files are recovered, drafted, archived, noindexed, or otherwise resolved through an approved URL policy.
- Duplicate slug groups are resolved without losing important legacy URLs.
- `hugo --gc --minify --printPathWarnings` completes cleanly.
- `/posts/` remains preserved as the legacy blog route.
- No fake rankings, fake ratings, job guarantees, legal advice, visa advice, labor advice, or official partnership wording has been introduced.
