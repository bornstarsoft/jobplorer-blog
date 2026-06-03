# Jobplorer Phase 5P Search Console Manual Data Entry Guide

## Purpose

Phase 5P prepares a manual data-entry guide for reviewing the first four rewritten legacy `/posts/` articles in Google Search Console. This is a docs-only phase. No legacy post, source page, slug, filename, URL, config, or deployment setting is changed.

The goal is to help the owner collect consistent Search Console data before deciding whether to monitor, add more internal links, review title/meta wording, rewrite another low-risk post, or pause legacy cleanup.

## Target URLs

- `/posts/the-rise-of-ai-in-recruitment/`
- `/posts/the-struggles-of-young-job-seekers/`
- `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`
- `/posts/ai-creators-future-game-development/`

## Manual Steps For Owner

Repeat these steps for each target URL.

1. Open Google Search Console.
2. Select the `jobplorer.com` property.
3. Go to `Performance` > `Search results`.
4. Set the date range to `Last 28 days`.
5. Add a page filter for the exact rewritten URL.
6. Record clicks, impressions, CTR, average position, and top queries.
7. Open `URL Inspection`.
8. Enter the exact rewritten URL.
9. Record indexed status and Google-selected canonical.
10. Check whether crawl or index warnings are shown.
11. Check internal links and external links if those reports are visible.
12. Paste the results into `docs/jobplorer_phase5o_search_console_review_results.md`.

## Data To Record For Each Rewritten URL

Use this list with the Phase 5O review results template.

- Indexed status.
- Google-selected canonical.
- Clicks, last 28 days.
- Impressions, last 28 days.
- CTR.
- Average position.
- Top queries.
- Internal links, if visible.
- External links, if visible.
- Crawl/index warnings.

## Per-URL Data Entry Checklist

### `/posts/the-rise-of-ai-in-recruitment/`

- Performance page filter entered:
- Last 28 days selected:
- Clicks recorded:
- Impressions recorded:
- CTR recorded:
- Average position recorded:
- Top queries recorded:
- URL Inspection checked:
- Indexed status recorded:
- Google-selected canonical recorded:
- Internal links checked:
- External links checked:
- Crawl/index warnings recorded:

### `/posts/the-struggles-of-young-job-seekers/`

- Performance page filter entered:
- Last 28 days selected:
- Clicks recorded:
- Impressions recorded:
- CTR recorded:
- Average position recorded:
- Top queries recorded:
- URL Inspection checked:
- Indexed status recorded:
- Google-selected canonical recorded:
- Internal links checked:
- External links checked:
- Crawl/index warnings recorded:

### `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`

- Performance page filter entered:
- Last 28 days selected:
- Clicks recorded:
- Impressions recorded:
- CTR recorded:
- Average position recorded:
- Top queries recorded:
- URL Inspection checked:
- Indexed status recorded:
- Google-selected canonical recorded:
- Internal links checked:
- External links checked:
- Crawl/index warnings recorded:

### `/posts/ai-creators-future-game-development/`

- Performance page filter entered:
- Last 28 days selected:
- Clicks recorded:
- Impressions recorded:
- CTR recorded:
- Average position recorded:
- Top queries recorded:
- URL Inspection checked:
- Indexed status recorded:
- Google-selected canonical recorded:
- Internal links checked:
- External links checked:
- Crawl/index warnings recorded:

## Decision Rules

Use these decision rules only after owner-provided Search Console data is available.

### If Indexed And Stable

If a URL is indexed, Google-selected canonical is the expected URL, and there is no obvious traffic drop:

- Continue monitoring.
- Consider light internal links later if the page is under-linked.
- Do not change slug, filename, or URL.

### If Impressions Exist But CTR Is Low

If a URL receives impressions but low CTR:

- Consider title/meta review later.
- Avoid over-optimization or keyword stuffing.
- Keep the rewritten article cautious and useful.
- Do not make ranking, guarantee, legal, visa, labor, tax, salary, or hiring-outcome claims.

### If Not Indexed

If a URL is not indexed:

- Inspect canonical and indexing details before any further rewrites.
- Check whether Google selected a different canonical.
- Check whether crawl or index warnings appear.
- Hold broader legacy cleanup until the indexing issue is understood.

### If Traffic Drops

If a rewritten URL shows a meaningful drop after rewrite or internal-link deployment:

- Hold more legacy rewrites.
- Review top queries and topic fit.
- Check whether the rewritten title and content still match likely search intent.
- Avoid deletion, noindex, or URL changes.

### Never Act On Assumptions Alone

Do not delete, noindex, draft, rename, move, change slug, change filename, or change URL based only on assumptions. Use Search Console data and owner review before cleanup actions.

## Recommended Next Phase

After the owner fills the Search Console data:

- Phase 5Q: Search Console result interpretation and next-action decision.

Possible Phase 5Q outcomes:

- Continue monitoring.
- Add more internal links later.
- Improve title/meta later.
- Rewrite one more low-risk post.
- Hold all legacy cleanup until more data is available.
