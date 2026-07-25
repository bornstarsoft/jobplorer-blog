# Jobplorer Phase 17K Publish United States Country Guide Result

## Purpose

Phase 17K publishes the reviewed United States country guide locally after owner approval.

This phase changes only the guide's draft status and creates this result report. It does not push or deploy the change.

## Phase 17J Commit

The United States publish-readiness result was committed before the local publication change:

```text
697a2ac Prepare United States country guide for publishing
```

Committed files:

- `content/country-guides/united-states.md`
- `docs/jobplorer_phase17j_united_states_publish_readiness_result.md`

## United States Publish Change

Changed:

```yaml
draft: true
```

to:

```yaml
draft: false
```

No other guide field or body text changed.

The guide retains:

```yaml
lastReviewed: "2026-07-25"
reviewStatus: "reviewed"
```

## Production Build Result

Command:

```text
hugo --gc --minify --noBuildLock --cacheDir /tmp/jobplorer-phase17k-cache --destination /tmp/jobplorer-phase17k-build
```

Result:

- passed
- generated pages: 1,200
- United States route: generated
- United States URL: present in the production sitemap

The production page count increased by exactly one from the previous 1,199-page build.

## Path Warning Build Result

Command:

```text
hugo --gc --minify --printPathWarnings --noBuildLock --cacheDir /tmp/jobplorer-phase17k-path-cache --destination /tmp/jobplorer-phase17k-pathwarnings
```

Result:

- passed
- generated pages: 1,200
- duplicate path warnings: none

## Draft Build Result

Command:

```text
hugo --gc --minify -D --noBuildLock --cacheDir /tmp/jobplorer-phase17k-draft-cache --destination /tmp/jobplorer-phase17k-draft-build
```

Result:

- passed
- generated pages: 1,218
- United States route: generated

## Generated Page Verification

The production United States page contains:

- `Job Search in the United States: Where to Start`
- official-source Review note
- USAJOBS
- CareerOneStop
- CalJOBS

The generated page does not contain:

- `unpublished`
- `draft note`

## Route and Sitemap Verification

Generated production routes:

- LinkedIn: present
- Indeed: present
- Glassdoor: present
- Software Developers: present
- Game Developers: present
- Remote Workers: present
- South Korea: present
- Canada: present
- United States: present

Production sitemap:

- United States: present
- South Korea: present
- Canada: present
- unique `/posts/` URLs: 258

## Preservation Checks

- No `content/posts/*.md` file changed.
- No South Korea or Canada guide changed.
- No job-site profile or career guide changed.
- No config, CNAME, layout, theme, or public file changed.
- URLs, slugs, filenames, review status, and review date were preserved.
- Only the United States draft status changed.

## Risk Wording Safeguards

- Official resource roles are described cautiously.
- Resource availability, employer requirements, and application processes are described as changeable.
- No live job count, ranking, rating, endorsement, or hiring guarantee was added.
- No legal, visa, immigration, labor, tax, salary, relocation, eligibility, or government-benefit advice was added.

## Remaining Risks

- The United States guide is only published locally until a later commit and push.
- Cloudflare Pages can require a short deployment transition after push.
- Clean custom-domain HTML may require a cache recheck after deployment.
- Search Console Performance data remains unavailable to the unauthenticated browser session.

## Recommended Next Step

Phase 17L: commit the United States draft-status change and this report, then perform a controlled GitHub push and deployment verification.

The deployment phase should confirm:

- `/country-guides/united-states/` returns HTTP 200
- the clean and cache-busted pages show the reviewed guide
- South Korea and Canada remain live
- all reviewed job-site profiles and career guides remain live
- the live sitemap includes all three country guides
- the live sitemap retains 258 unique `/posts/` URLs
- no Cloudflare setting is changed
