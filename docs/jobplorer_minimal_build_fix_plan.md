# Jobplorer Phase 0F-A Minimal Build Fix Plan

## Purpose

Phase 0F-A defines the minimal build compatibility fix plan for Jobplorer after branch reconciliation.

This is a planning document only. It does not modify `config.toml`, `CNAME`, `content/posts`, layouts, themes, generated files, Cloudflare settings, or deployment behavior.

The goal is to separate low-risk build compatibility fixes from higher-risk URL/content decisions before Phase 1 MVP work begins.

## Current Source State After Phase 0E

Current local source state:

- Local branch: `main`
- Relationship to `origin/main`: ahead only by Phase 0 documentation commits, behind 0
- Latest commit at Phase 0F-A start: `91640554a29659a46f3e91795d88a1547ecd5da0 Document Jobplorer branch reconciliation`
- `content/posts/*.md` count: 268
- Local inferred unique `/posts/` URL count: 258
- Live sitemap unique `/posts/` URL count from Phase 0D: 258

Important note:

Phase 0E reconciled remote auto-post content into the local source. Because of that, the current source has more malformed/no-front-matter posts and more duplicate slug groups than the older Phase 0A/0C snapshot.

## Diagnostic Build Result

Local Hugo version:

```text
hugo v0.152.2+extended+withdeploy darwin/arm64 BuildDate=2025-10-24T15:31:49Z VendorInfo=brew
```

Diagnostic build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase0f-a-public
```

Result:

- Exit code: nonzero
- Build failed
- Hugo logged 29 errors

Leading config compatibility error:

```text
ERROR deprecated: site config key paginate was deprecated in Hugo v0.128.0 and subsequently removed. Use pagination.pagerSize instead.
```

Date parsing errors:

```text
ERROR the "date" front matter field is not a parsable date: see .../content/posts/2025-05-28-newsbrief-075526.md
...
ERROR the "date" front matter field is not a parsable date: see .../content/posts/2025-06-27-newsbrief-145205.md
```

Final failure line:

```text
Error: error building site: logged 29 error(s)
```

Additional path-warning diagnostic:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase0f-a-public-pathwarn --printPathWarnings
```

Current duplicate-target warning:

```text
WARN  Duplicate target paths: /posts/2025-job-market-trends/index.html (2), /posts/corporate-responsibility-in-disability-employment/index.html (2), /posts/disability-employment-public-institutions/index.html (2), /posts/empowering-youth-employment/index.html (2), /posts/the-power-of-brain-training-through-mobile-games/index.html (2), /posts/youth-employment-challenges/index.html (2), /posts/youth-employment-chungbuk/index.html (2), /posts/youth-employment-crisis/index.html (3), /posts/youth-employment-support-initiatives/index.html (2)
```

Hugo generated `.hugo_build.lock` and `resources/` during diagnostics. Only those generated artifacts were removed afterward.

## Fix Group A: Config Pagination Compatibility

Current setting:

```text
config.toml:6:paginate = 12
```

Future replacement for Hugo `0.152.2`:

```toml
[pagination]
  pagerSize = 12
```

Risk level:

- Low URL-risk
- Build-compatibility-only

Reasoning:

- This change should preserve pagination size.
- It should not change post slugs or canonical `/posts/` URLs.
- It should still be tested because pagination page paths can be generated differently across Hugo versions.

Do not edit `config.toml` until Phase 0F-B is approved.

## Fix Group B: Korean-Formatted Date Strings

Current issue:

- 28 files use Korean-formatted date strings.
- Hugo `0.152.2` does not parse them.
- All 28 affected files have explicit `slug` values, so converting only the `date` field should not change their post URLs.

Risk level:

- Low URL-risk if only `date` values are changed and slugs remain untouched
- Medium content-ordering risk because list order, RSS, sitemap `lastmod`, and homepage ordering may shift to the parsed dates

Proposed conversions:

| Path | Current date value | Proposed ISO date | Confidence | Explicit slug present | URL should remain unchanged |
| --- | --- | --- | --- | --- | --- |
| `content/posts/2025-05-28-newsbrief-075526.md` | `2023년 10월 27일` | `2023-10-27` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-05-29-newsbrief-125520.md` | `2025년 5월 29일` | `2025-05-29` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-05-31-newsbrief-125521.md` | `2023년 10월 29일` | `2023-10-29` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-01-newsbrief-125521.md` | `2023년 10월 1일` | `2023-10-01` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-03-newsbrief-125516.md` | `2023년 10월 3일` | `2023-10-03` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-04-newsbrief-125527.md` | `2023년 10월 4일` | `2023-10-04` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-05-newsbrief-125517.md` | `2023년 10월 5일` | `2023-10-05` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-06-newsbrief-125516.md` | `2023년 10월 6일` | `2023-10-06` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-08-newsbrief-125528.md` | `2025년 6월 8일` | `2025-06-08` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-09-newsbrief-125517.md` | `2023년 10월 9일` | `2023-10-09` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-10-newsbrief-125527.md` | `2023년 10월 5일` | `2023-10-05` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-11-newsbrief-125519.md` | `2023년 10월 11일` | `2023-10-11` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-12-newsbrief-125531.md` | `2025년 6월 12일` | `2025-06-12` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-13-newsbrief-125523.md` | `2025년 6월 13일` | `2025-06-13` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-14-newsbrief-125517.md` | `2025년 6월 14일` | `2025-06-14` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-15-newsbrief-125519.md` | `2025년 6월 15일` | `2025-06-15` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-16-newsbrief-125524.md` | `2023년 10월 16일` | `2023-10-16` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-17-newsbrief-125523.md` | `2023년 10월 17일` | `2023-10-17` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-18-newsbrief-125524.md` | `2025년 6월 18일` | `2025-06-18` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-19-newsbrief-125526.md` | `2025년 6월 19일` | `2025-06-19` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-20-newsbrief-125524.md` | `2025년 6월 20일` | `2025-06-20` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-22-newsbrief-125517.md` | `2025년 6월 22일` | `2025-06-22` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-23-newsbrief-125521.md` | `2023년 10월 23일` | `2023-10-23` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-24-newsbrief-125530.md` | `2023년 10월 24일` | `2023-10-24` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-25-newsbrief-125520.md` | `2025년 6월 25일` | `2025-06-25` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-26-newsbrief-125520.md` | `2023년 10월 26일` | `2023-10-26` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-27-newsbrief-125517.md` | `2023년 10월 5일` | `2023-10-05` | High: direct Korean date conversion | Yes | Yes |
| `content/posts/2025-06-27-newsbrief-145205.md` | `2025년 6월 27일` | `2025-06-27` | High: direct Korean date conversion | Yes | Yes |

Do not edit these files until Phase 0F-B is approved.

## Fix Group C: Malformed / No-Front-Matter Posts

Current issue:

- After Phase 0E branch reconciliation, the current source has 8 malformed/no-front-matter post files.
- This is more than the earlier Phase 0A/0C snapshot because remote auto-post content was brought into local `main`.
- All 8 inferred URLs appear in the live sitemap.

Risk level:

- High URL-risk for deletion or slug changes
- Medium build-risk for recovery/draft handling
- Low risk for investigation-only history lookup

Affected files:

| Path | Size / content state | Inferred URL appears in live sitemap | Proposed safe handling |
| --- | --- | --- | --- |
| `content/posts/2025-07-06-jobs-200208.md` | 0 bytes; zero-byte file | Yes | Recover front matter/content from history if possible; otherwise draft/archive/noindex/delete candidate only after URL review |
| `content/posts/2025-08-03-jobs-215626.md` | 0 bytes; zero-byte file | Yes | Recover front matter/content from history if possible; otherwise draft/archive/noindex/delete candidate only after URL review |
| `content/posts/2025-08-17-jobs-223347.md` | 0 bytes; zero-byte file | Yes | Recover front matter/content from history if possible; otherwise draft/archive/noindex/delete candidate only after URL review |
| `content/posts/2025-11-18-jobs-210416.md` | 0 bytes; zero-byte file | Yes | Recover front matter/content from history if possible; otherwise draft/archive/noindex/delete candidate only after URL review |
| `content/posts/2025-12-24-jobs-235358.md` | 85 bytes; source-link-only/body-only, no front matter | Yes | Recover front matter/title/date/slug from history if possible; otherwise draft/archive/noindex candidate after URL review |
| `content/posts/2026-03-09-jobs-195244.md` | 0 bytes; zero-byte file | Yes | Recover front matter/content from history if possible; otherwise draft/archive/noindex/delete candidate only after URL review |
| `content/posts/2026-03-28-jobs-210307.md` | 85 bytes; source-link-only/body-only, no front matter | Yes | Recover front matter/title/date/slug from history if possible; otherwise draft/archive/noindex candidate after URL review |
| `content/posts/2026-05-05-jobs-221528.md` | 77 bytes; source-link-only/body-only, no front matter | Yes | Recover front matter/title/date/slug from history if possible; otherwise draft/archive/noindex candidate after URL review |

Do not edit, delete, draft, noindex, archive, or rename these files until Phase 0F-C is approved.

## Fix Group D: Duplicate Slug / Target Groups

Current issue:

- After Phase 0E branch reconciliation, the current source has 9 duplicate target groups.
- One group has 3 files sharing the same target URL.
- Every duplicate target URL appears in the live sitemap.
- For each involved file, the current inferred URL is the same within its group; both or all files do not have distinct live URLs today.

Risk level:

- High URL-risk
- High search/indexing risk if canonical ownership changes
- Medium content-quality risk

Likely current build-output winner:

- The likely winner was inferred from the temporary diagnostic output under `/tmp/jobplorer-phase0f-a-public/`.
- When content/source markers matched the generated output, the matched file is listed.
- This is still a planning signal, not permission to rewrite slugs.

Duplicate groups:

| Duplicate target URL | Involved files | Likely current build-output winner | Target in live sitemap | Proposed safe handling |
| --- | --- | --- | --- | --- |
| `/posts/2025-job-market-trends/` | `content/posts/2025-08-12-jobs-233529.md`; `content/posts/2025-09-04-jobs-202803.md` | `content/posts/2025-09-04-jobs-202803.md` | Yes | Preserve canonical winner; change duplicate slug only with redirect/alias policy or archive duplicate after review |
| `/posts/corporate-responsibility-in-disability-employment/` | `content/posts/2025-10-04-jobs-224815.md`; `content/posts/2025-10-05-jobs-214349.md` | `content/posts/2025-10-05-jobs-214349.md` | Yes | Preserve canonical winner; change duplicate slug only with redirect/alias policy or archive duplicate after review |
| `/posts/disability-employment-public-institutions/` | `content/posts/2025-09-07-jobs-234203.md`; `content/posts/2025-10-29-jobs-182138.md` | `content/posts/2025-10-29-jobs-182138.md` | Yes | Preserve canonical winner; change duplicate slug only with redirect/alias policy or archive duplicate after review |
| `/posts/empowering-youth-employment/` | `content/posts/2025-08-07-jobs-215536.md`; `content/posts/2025-09-20-jobs-204043.md` | `content/posts/2025-09-20-jobs-204043.md` | Yes | Preserve canonical winner; change duplicate slug only with redirect/alias policy or archive duplicate after review |
| `/posts/the-power-of-brain-training-through-mobile-games/` | `content/posts/2025-07-26-jobs-195620.md`; `content/posts/2025-08-30-jobs-210410.md` | `content/posts/2025-08-30-jobs-210410.md` | Yes | Preserve canonical winner; change duplicate slug only with redirect/alias policy or archive duplicate after review |
| `/posts/youth-employment-challenges/` | `content/posts/2025-09-19-jobs-205443.md`; `content/posts/2026-03-20-jobs-205132.md` | `content/posts/2026-03-20-jobs-205132.md` | Yes | Preserve canonical winner; change duplicate slug only with redirect/alias policy or archive duplicate after review |
| `/posts/youth-employment-chungbuk/` | `content/posts/2025-12-17-jobs-190147.md`; `content/posts/2026-01-25-jobs-223454.md` | `content/posts/2026-01-25-jobs-223454.md` | Yes | Preserve canonical winner; change duplicate slug only with redirect/alias policy or archive duplicate after review |
| `/posts/youth-employment-crisis/` | `content/posts/2025-07-28-jobs-210831.md`; `content/posts/2025-10-17-jobs-195113.md`; `content/posts/2026-01-16-jobs-181417.md` | `content/posts/2026-01-16-jobs-181417.md` | Yes | Preserve canonical winner; change duplicate slug only with redirect/alias policy or archive duplicates after review |
| `/posts/youth-employment-support-initiatives/` | `content/posts/2025-07-08-jobs-213603.md`; `content/posts/2026-03-27-jobs-195648.md` | `content/posts/2026-03-27-jobs-195648.md` | Yes | Preserve canonical winner; change duplicate slug only with redirect/alias policy or archive duplicate after review |

Do not resolve duplicates during Phase 0F-B unless the approved task explicitly includes redirect/alias policy.

## Fix Group E: CNAME Mismatch

Current repository `CNAME` value:

```text
www.bornstarai.com
```

Current `config.toml` base URL:

```text
baseURL = "https://jobplorer.com/"
```

Current live domain behavior:

- `https://jobplorer.com/` returns HTTP 200 through Cloudflare.
- `https://www.jobplorer.com/` returns HTTP 301 to `https://jobplorer.com/`.
- Live headers include `server: cloudflare`, `cf-cache-status`, and `cf-ray`.

Risk level:

- Deployment-routing risk
- Requires Cloudflare Pages dashboard verification
- Not a local build compatibility fix

Do not edit `CNAME` in a build-fix patch. Verify Cloudflare Pages custom domains first.

## Proposed Exact Safe Fix Order

### Phase 0F-B: Config Pagination + Date Format Fixes Only

Scope:

- Replace `paginate = 12` with `[pagination] pagerSize = 12`.
- Convert only the 28 Korean-formatted date values to ISO dates.
- Do not change slugs, titles, content, aliases, CNAME, layouts, themes, or deployment settings.

Expected risk:

- Low URL-risk
- Main review point: list ordering and sitemap/RSS date effects

### Phase 0F-C: Malformed Post Recovery / Draft Plan

Scope:

- Investigate the 8 malformed/no-front-matter files.
- Recover from git history where possible.
- Decide draft/archive/noindex/delete-candidate treatment only after URL review.

Expected risk:

- Medium to high URL-risk because all 8 inferred URLs appear in the live sitemap.

### Phase 0F-D: Duplicate Slug Resolution With URL Preservation

Scope:

- Decide canonical winner per duplicate group.
- Preserve current live target URL ownership where possible.
- Add aliases or redirects only after a reviewed policy exists.
- Avoid changing duplicate slugs without knowing traffic/search impact.

Expected risk:

- High URL-risk

### Phase 0F-E: Clean Local Hugo Build Verification

Scope:

- Run `hugo --gc --minify --printPathWarnings` after approved fixes.
- Confirm no date parsing errors.
- Confirm no duplicate target warnings.
- Confirm no generated artifacts remain in repo status.

Expected risk:

- Verification-only

### Phase 0F-F: Cloudflare Pages Hugo Version / CNAME Verification

Scope:

- Verify Cloudflare Pages project, production branch, build command, output directory, Hugo version/environment variable, latest deployment commit hash, custom domains, and whether `CNAME` is ignored.

Expected risk:

- Deployment-routing risk
- Manual dashboard verification required

## What Not To Change Yet

- Do not modify `config.toml`.
- Do not modify `CNAME`.
- Do not modify `content/posts`.
- Do not modify layouts.
- Do not modify themes.
- Do not modify generated `public` files.
- Do not delete, rename, or move existing files.
- Do not change Cloudflare, DNS, GitHub, or deployment settings.
- Do not push.
- Do not start MVP page work.
- Do not move `/posts/` to `/blog/`.

## Acceptance Checklist Before Phase 1 MVP Page Work

Before Phase 1 starts:

- Phase 0F-B pagination/date fixes are reviewed and committed.
- Local Hugo build no longer fails on `paginate` or Korean date strings.
- Malformed post policy is approved.
- Duplicate slug policy is approved and implemented safely.
- Local Hugo build completes cleanly with `--printPathWarnings`.
- `/posts/` legacy URLs remain preserved.
- Cloudflare Pages Hugo version and CNAME/custom-domain behavior are verified.
- No fake rankings, fake ratings, job guarantees, visa/legal/labor advice wording, or official partnership implications have been introduced.
