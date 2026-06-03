# Jobplorer Phase 5J Legacy Rewrite Batch Summary And Search Console Plan

## Purpose

Phase 5J summarizes the first controlled batch of legacy `/posts/` rewrites and defines a Search Console-informed triage plan before any larger cleanup, archive, noindex, or rewrite work.

This phase is planning only. No additional legacy post was rewritten, drafted, noindexed, deleted, renamed, moved, or otherwise changed.

## Current Read-only Verification

Local Hugo verification command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase5j-pathwarnings
```

Result:

- Build passed.
- Duplicate target warnings were not reported.
- Published `/posts/` URL count remained 258.
- LinkedIn local production route is generated: `/job-sites/sites/linkedin/`.
- Software Developers local production route is generated: `/career-guides/software-developers/`.

## Summary Of 4 Rewritten Legacy Posts

| Legacy URL | Rewrite theme | Deployment status | URL preservation status |
| --- | --- | --- | --- |
| `/posts/the-rise-of-ai-in-recruitment/` | AI in recruitment and cautious job-search strategy | Rewritten and deployed | Preserved |
| `/posts/the-struggles-of-young-job-seekers/` | Entry-level job search starting points | Rewritten and deployed | Preserved |
| `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/` | Resume blockers and cautious job seeker tools | Rewritten and deployed | Preserved |
| `/posts/ai-creators-future-game-development/` | AI-assisted game development roles and job search channels | Rewritten and deployed | Preserved |

## URL Preservation Status

The first rewrite batch followed a strict preservation policy:

- Existing filenames were preserved.
- Existing slugs were preserved.
- Existing `/posts/` URLs were preserved.
- No post was drafted.
- No post was noindexed.
- No post was deleted.
- No post was renamed or moved.
- No `/posts/` to `/blog/` migration was attempted.
- Local and live checks continued to show 258 unique published `/posts/` URLs.

## Common Safety Rules Used

Every rewritten legacy post used these safety rules:

- Preserve filename.
- Preserve slug.
- Preserve URL.
- Avoid draft, noindex, delete, rename, or move actions.
- Avoid fake rankings.
- Avoid fake ratings.
- Avoid job, interview, hiring, salary, promotion, or career outcome guarantees.
- Avoid legal, visa, immigration, labor, tax, compensation, discrimination, or employment advice.
- Avoid affiliate links.
- Avoid partnership or official endorsement wording.
- Tell readers to verify official job postings, employer pages, job-site policies, portfolio requirements, tool requirements, school or career-center resources, and other current official sources where relevant.

## Search Console Review Checklist

Before choosing larger batches or any archive/noindex/delete action, review Search Console for the affected URLs and the wider `/posts/` archive.

For each candidate URL, check:

- Clicks.
- Impressions.
- Indexed status.
- Canonical selected by Google.
- Top queries.
- Internal links.
- External links if available.
- Pages with sudden drops after rewrite.
- Whether the URL is still discoverable from relevant internal pages.
- Whether the rewritten topic matches or improves the likely search intent.

For the four rewritten URLs, monitor:

- Whether clicks or impressions fall sharply after deployment.
- Whether Google keeps the same canonical.
- Whether top queries still align with the revised evergreen topic.
- Whether snippets or indexed titles update as expected.
- Whether any rewritten page attracts queries that suggest legal, visa, salary, labor, or guarantee-sensitive intent.

## Decision Rules For Next Actions

Continue rewriting when:

- The URL is stable.
- The topic fits Jobplorer's long-term scope.
- The article can become evergreen guidance without changing slug or URL.
- The rewrite can avoid legal, visa, immigration, labor, tax, salary, and hiring-outcome claims.
- Search Console does not show high-risk traffic loss or canonical instability for similar rewrites.

Hold the candidate when:

- Legal, visa, labor, tax, salary, immigration, discrimination, or regulated employment risk is central to the topic.
- The post appears to receive meaningful search traffic for a topic that would be materially changed by rewriting.
- The current URL or canonical status is unclear.
- The rewrite would require changing slug, filename, or URL.
- The content would require unsupported official-source claims.

Do not delete, noindex, or draft when:

- Search Console has not been reviewed.
- The URL is live and indexed.
- The page has clicks, impressions, backlinks, or uncertain canonical behavior.
- The page can be rewritten or redirected more safely later.

Batch size policy:

- Rewrite in batches of 1-3 posts only.
- Verify build and URL preservation after each batch.
- Deploy only after controlled review.
- Monitor Search Console after deployment before increasing batch size.

## Recommended Next Candidate Options

Possible next moves:

- Continue one more rewrite from Phase 5C-A if the candidate is low-risk and clearly fits Jobplorer.
- Review Search Console first before choosing another rewrite.
- Start an old auto-news archive/noindex policy later, but only after Search Console review and owner approval.

Recommended near-term path:

1. Review Search Console for the four rewritten URLs.
2. Confirm the URLs remain indexed with stable canonical behavior.
3. Check whether impressions, clicks, and top queries remain acceptable.
4. Select only one additional low-risk A/D rewrite candidate if the first batch looks stable.
5. Keep all cleanup actions URL-preserving until a separate archive/noindex policy is reviewed.
