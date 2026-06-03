# Jobplorer Phase 5K Rewritten Posts Search Console Intake

## Purpose

Phase 5K creates a manual Search Console review intake sheet for the first four rewritten legacy `/posts/` URLs. This is a docs-only planning step before any further rewrite, internal-link, archive, noindex, or cleanup action.

The goal is to compare post-rewrite search behavior against the URL preservation policy and decide whether the rewritten pages should stay as-is, receive small metadata/internal-link improvements later, be monitored, or be reviewed further.

## URLs To Review

| URL | Rewrite theme | Review status |
| --- | --- | --- |
| `/posts/the-rise-of-ai-in-recruitment/` | AI in recruitment and cautious job-search strategy | Manual Search Console review needed |
| `/posts/the-struggles-of-young-job-seekers/` | Entry-level job search starting points | Manual Search Console review needed |
| `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/` | Resume blockers and cautious job seeker tools | Manual Search Console review needed |
| `/posts/ai-creators-future-game-development/` | AI-assisted game development roles and job search channels | Manual Search Console review needed |

## Local Read-only Verification

Optional local verification was performed before creating this intake sheet.

Result:

- Local Hugo build passed.
- Published `/posts/` URL count remained 258.
- All four rewritten URLs were generated in local production output.
- All four rewritten URLs were present in the local sitemap.

## Manual Search Console Fields To Fill

Use this table during manual Search Console review. Do not use it as approval for deletion, noindex, slug changes, or URL changes by itself.

| Field | `/posts/the-rise-of-ai-in-recruitment/` | `/posts/the-struggles-of-young-job-seekers/` | `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/` | `/posts/ai-creators-future-game-development/` |
| --- | --- | --- | --- | --- |
| Indexed status |  |  |  |  |
| Google-selected canonical |  |  |  |  |
| Clicks, last 28 days |  |  |  |  |
| Impressions, last 28 days |  |  |  |  |
| Average CTR |  |  |  |  |
| Average position |  |  |  |  |
| Top queries |  |  |  |  |
| Pages linking internally |  |  |  |  |
| External links, if visible |  |  |  |  |
| Crawl or index warnings |  |  |  |  |
| Notes on sudden drops after rewrite |  |  |  |  |
| Notes on query/topic fit |  |  |  |  |

## Decision Fields

For each URL, choose one primary decision after reviewing Search Console data.

| URL | Keep as-is | Improve title/meta later | Add internal links later | Rewrite further later | Hold and monitor | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `/posts/the-rise-of-ai-in-recruitment/` |  |  |  |  |  |  |
| `/posts/the-struggles-of-young-job-seekers/` |  |  |  |  |  |  |
| `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/` |  |  |  |  |  |  |
| `/posts/ai-creators-future-game-development/` |  |  |  |  |  |  |

Decision guidance:

- `Keep as-is`: use when indexing, canonical, and query fit look stable.
- `Improve title/meta later`: use when the page is stable but snippets or query alignment could be clearer.
- `Add internal links later`: use when the page is stable but weakly connected from relevant Jobplorer pages.
- `Rewrite further later`: use only when the URL is stable and the topic needs clearer evergreen alignment.
- `Hold and monitor`: use when traffic, canonical, or index behavior is unclear.

## Safety Policy

Apply these rules to all four rewritten URLs and any future rewrite candidates:

- No delete or noindex action without Search Console review.
- No slug changes.
- No filename changes.
- No URL changes.
- No `/posts/` to `/blog/` migration.
- Avoid over-optimization or keyword stuffing.
- Preserve cautious Jobplorer wording.
- Avoid fake rankings, fake ratings, guarantees, affiliate wording, partnership wording, and unsupported claims.
- Avoid legal, visa, immigration, labor, tax, salary, compensation, discrimination, or regulated employment advice.
- Monitor for sudden drops after rewrite before expanding rewrite batch size.

## Review Notes Template

Use the notes below during manual review.

### `/posts/the-rise-of-ai-in-recruitment/`

- Indexed status:
- Google-selected canonical:
- Top queries:
- Sudden drop observed:
- Recommended decision:
- Follow-up action:

### `/posts/the-struggles-of-young-job-seekers/`

- Indexed status:
- Google-selected canonical:
- Top queries:
- Sudden drop observed:
- Recommended decision:
- Follow-up action:

### `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`

- Indexed status:
- Google-selected canonical:
- Top queries:
- Sudden drop observed:
- Recommended decision:
- Follow-up action:

### `/posts/ai-creators-future-game-development/`

- Indexed status:
- Google-selected canonical:
- Top queries:
- Sudden drop observed:
- Recommended decision:
- Follow-up action:

## Suggested Next Phases

Possible next phases:

- Phase 5L: plan internal links to rewritten posts before editing any source pages.
- Phase 5M: rewrite one more low-risk candidate if Search Console review shows the first batch is stable.

Recommended path:

1. Fill this Search Console intake sheet manually.
2. Choose `keep as-is`, `improve title/meta later`, `add internal links later`, `rewrite further later`, or `hold and monitor` for each URL.
3. Avoid archive, noindex, delete, slug, filename, or URL changes until the owner reviews the Search Console findings.
