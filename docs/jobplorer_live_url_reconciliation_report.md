# Jobplorer Phase 0D Live URL Reconciliation Report

## Purpose

This report investigates the mismatch between live `/posts/` URLs and the local checkout.

Phase 0D is documentation only. It does not fix build issues, restore posts, move content, modify deployment settings, or change runtime behavior.

## Repo / Remote Freshness Result

Repository:

- Local path: `/Users/seongjinkim/BornStarSoft_Publishing/github_hugo/jobplorer-blog`
- Remote: `origin git@github.com:bornstarsoft/jobplorer-blog.git`
- Current local branch: `main`

Starting state:

- Working tree was clean.
- Phase 0C docs were committed.
- Latest local commit before investigation: `1be34191f5ec0f179a854d517749b5161bd6578c Document Jobplorer build compatibility plan`

Remote freshness command:

```sh
git fetch --all --prune
```

Fetch result:

```text
From github.com:bornstarsoft/jobplorer-blog
   e011706..188ab2e  main       -> origin/main
```

After fetch:

- `git status --short`: clean
- `git status -sb`: `## main...origin/main [ahead 2, behind 106]`
- Local `main` is ahead of `origin/main` by 2 commits: Phase 0B and Phase 0C docs.
- Local `main` is behind `origin/main` by 106 commits: newer auto-post commits.
- No merge, rebase, reset, or branch switch was performed.

Recent local `main` commits:

```text
1be3419 (HEAD -> main) Document Jobplorer build compatibility plan
ffae9f9 Document Jobplorer phase 0 audit and renewal plan
e011706 Add GA4 gtag to Jobplorer
6f4ef56 Add GA4 gtag to Jobplorer
a77bc4e Add GA4 gtag to Jobplorer
```

Recent `origin/main` commits:

```text
188ab2e (origin/main, origin/HEAD) Auto post 2026-05-27 19:41:13
737f5ca Auto post 2026-05-23 21:12:36
901ff50 Auto post 2026-05-20 20:12:23
be08b93 Auto post 2026-05-19 22:42:04
2e7cbb0 Auto post 2026-05-16 22:30:42
```

## Branch / Source Inspection Result

Visible branch references:

```text
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/main
```

Read-only post file counts by ref:

| Ref | `content/posts/*.md` count |
| --- | ---: |
| `main` | 162 |
| `origin/HEAD` | 268 |
| `origin/main` | 268 |

Direct file comparison:

- Local `main` post files: 162
- `origin/main` post files: 268
- Remote-only post files: 106
- Local-only post files: 0

Sample remote-only post files:

```text
content/posts/2025-12-25-jobs-205023.md
content/posts/2025-12-26-jobs-203333.md
content/posts/2025-12-27-jobs-231440.md
content/posts/2025-12-28-jobs-234459.md
content/posts/2025-12-30-jobs-210528.md
content/posts/2025-12-31-jobs-211835.md
content/posts/2026-01-02-jobs-220645.md
content/posts/2026-01-03-jobs-201518.md
content/posts/2026-01-04-jobs-222322.md
content/posts/2026-01-05-jobs-201750.md
```

## Git History Deleted / Renamed Post Findings

Read-only history inspection found deleted test-content files:

```text
fb3b54660183a7a51acc4bb1534cb6e07476bfe9 2025-05-28 Removed test contents
D content/posts/2025-05-27-newsbrief-202340.md

4e831a831c52ecbcfdb1b31744f6493c7eeb138d 2025-05-27 Removed test contents
D content/posts/2025-05-27-newsbrief-133454-1.md

32136104fe5f585a01b34405550141967a6f7df2 2025-05-27 Removed test contents
D content/posts/2025-05-25-ai-223226-1.md
D content/posts/2025-05-27-ai-115736-1.md
```

No renamed post files were found with the read-only rename-history check.

These historical deletions do not explain the 102 live-only URL mismatch. The main explanation is branch divergence after `git fetch`.

## Live Sitemap Count

Live sitemap was downloaded to:

```text
/tmp/jobplorer-phase0d/live-sitemap.xml
```

Extracted live `/posts/` URLs were written to:

```text
/tmp/jobplorer-phase0d/live-post-urls.txt
```

Live unique `/posts/` URL count:

```text
258
```

## Local Inferred URL Count

Local inferred `/posts/` URLs were written to:

```text
/tmp/jobplorer-phase0d/local-post-urls.txt
```

Local unique inferred `/posts/` URL count:

```text
156
```

The local list respects explicit `slug` fields where available and falls back to filename-based URLs for malformed/no-front-matter files.

## Live-Only URL Count

Live-only URLs were written to:

```text
/tmp/jobplorer-phase0d/live-only-post-urls.txt
```

Live-only URL count compared with local `main`:

```text
102
```

Additional comparison against fetched `origin/main`:

- `origin/main` inferred unique `/posts/` URL count: 258
- Live URLs not in `origin/main`: 0
- `origin/main` URLs not in live sitemap: 0

This means the live sitemap exactly matches fetched `origin/main`, not local `main`.

## Local-Only URL Count

Local-only URLs were written to:

```text
/tmp/jobplorer-phase0d/local-only-post-urls.txt
```

Local-only URL count compared with live sitemap:

```text
0
```

## Sample Live-Only URLs and Status Codes

Ten live-only URLs were sampled with `curl -I`. All returned HTTP 200.

| URL | Status |
| --- | --- |
| `https://jobplorer.com/posts/2026-03-09-jobs-195244/` | 200 |
| `https://jobplorer.com/posts/2026-03-28-jobs-210307/` | 200 |
| `https://jobplorer.com/posts/2026-05-05-jobs-221528/` | 200 |
| `https://jobplorer.com/posts/ai-creators-future-game-development/` | 200 |
| `https://jobplorer.com/posts/ai-development-talent-singapore/` | 200 |
| `https://jobplorer.com/posts/ai-driven-recruitment-future/` | 200 |
| `https://jobplorer.com/posts/ai-driven-recruitment-jobkorea-albamon/` | 200 |
| `https://jobplorer.com/posts/ai-recruitment-data-privacy-legal-challenge/` | 200 |
| `https://jobplorer.com/posts/ai-skills-in-hiring-the-new-standard/` | 200 |
| `https://jobplorer.com/posts/ais-impact-on-accounting-industry/` | 200 |

Sampled headers show Cloudflare serving the pages:

- `server: cloudflare`
- `cf-cache-status`
- `cf-ray`
- static-style cache headers

## Sample Local-Only URLs and Status Codes

No local-only URLs were found.

There were no local-only URLs to sample against the live site.

## Most Likely Explanation

The most likely explanation is branch divergence:

- Local `main` includes Phase 0B and Phase 0C documentation commits.
- Local `main` has not integrated 106 newer commits now visible on `origin/main`.
- Those 106 commits contain 106 additional post files.
- Fetched `origin/main` infers exactly 258 unique `/posts/` URLs.
- The live sitemap contains exactly the same 258 unique `/posts/` URLs.

Therefore, the 102 live-only URLs are not mysterious deleted posts or stale sitemap leftovers. They are represented by the fetched remote branch, and the live site appears to match `origin/main`.

The difference between 106 remote-only post files and 102 live-only URLs is consistent with the already-known duplicate slugs or URL collisions.

## Cloudflare Pages Manual Verification Checklist

Do not change Cloudflare settings during verification. The owner should manually confirm:

- Cloudflare Pages project name
- Connected GitHub repository
- Production branch
- Build command
- Build output directory
- Hugo version or Hugo environment variable
- Latest deployment commit hash
- Whether latest deployment commit is `188ab2e` or another commit
- Custom domains
- Whether `jobplorer.com` and `www.jobplorer.com` are configured on this Pages project
- Whether old deployments are still accessible
- Whether cached assets or stale deployment output are serving any route
- Whether Cloudflare Pages is ignoring the repository `CNAME`

## CNAME / README / Header Notes

Repository README states:

```text
This is a Hugo static blog powered by Cloudflare Pages with the Ananke theme.
```

Repository `CNAME` currently contains:

```text
www.bornstarai.com
```

Live `jobplorer.com` headers show Cloudflare. The `CNAME` mismatch remains unresolved but does not appear to prevent the live `jobplorer.com` deployment from serving.

Do not edit `CNAME` until Cloudflare Pages custom domain settings are verified.

## Recommended Safe Resolution Options

If live-only URLs came from deleted historical posts:

- Restore them as legacy archive posts, or
- Create an alias/redirect/noindex policy later, after traffic and indexing review.

Current evidence does not favor this explanation, because the live-only URLs match fetched `origin/main`.

If live deployment source is different from local repo:

- Verify Cloudflare Pages source before any repo changes.
- Confirm the connected GitHub repo, production branch, and latest deployment commit hash.

Current evidence suggests the live deploy source is likely `origin/main`.

If Cloudflare cache or old build is serving:

- Do not purge cache until URL preservation policy is decided.
- Export and preserve the live sitemap first.

Current evidence does not suggest a stale sitemap, because live and `origin/main` match exactly.

If local repo is correct and live sitemap is stale:

- Document the stale live URLs before removing them from sitemap.
- Review Search Console and analytics first.

Current evidence does not favor this explanation.

Primary safe option:

- Reconcile local `main` with `origin/main` in a reviewed branch workflow.
- Preserve Phase 0B and Phase 0C documentation commits.
- Do not overwrite remote auto-post history.
- Do not start build fixes or MVP page changes until the branch divergence is resolved.

## What Not To Change Yet

- Do not modify `config.toml`.
- Do not modify `CNAME`.
- Do not modify `content/posts`.
- Do not modify layouts.
- Do not modify themes.
- Do not modify generated `public` files.
- Do not delete, rename, or move existing files.
- Do not change Cloudflare, DNS, GitHub, or deployment settings.
- Do not purge Cloudflare cache.
- Do not move `/posts/` to `/blog/`.
- Do not start MVP page creation until branch/source reconciliation is reviewed.

## Recommended Next Phase

Recommended next phase: Phase 0E branch/source reconciliation.

Phase 0E should decide how to integrate the local documentation commits with fetched `origin/main` safely. Possible approaches include:

- Rebase or cherry-pick the Phase 0B/0C/0D docs onto the latest `origin/main` in a reviewed workflow.
- Create a dedicated branch from `origin/main` and reapply docs.
- Push the documentation branch only after confirming it preserves all remote auto-post content.

After local and remote source are reconciled, continue with Phase 0C build compatibility fixes in the approved safe order.
