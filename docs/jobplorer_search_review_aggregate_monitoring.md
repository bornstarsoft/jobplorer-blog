# Search Review: Aggregate Monitoring

## Scope And Current Evidence

Use existing page totals to check sustained interest in the two resources, not individual retention. On 2026-11-10 a read-only HTTP check returned 200 for both URLs and found the existing GA4 tag in each response. No Cloudflare Web Analytics beacon was visible in those raw responses. Neither tag presence nor absence proves dashboard coverage. No authenticated report totals were available for this check, and the worksheet release on 2026-11-10 has no completed post-release week yet. Missing data is not zero.

| Resource | Exact page path |
| --- | --- |
| Search comparison worksheet | `/guides/refine-your-job-search-terms/` |
| Weekly job search review | `/job-seeker-tools/` |

The two sections are fragments within these pages, not separate page paths. Page totals include the rest of each page. They do not show section reads, link clicks, note use, completion, or whether the same people returned. Do not turn the ratio of page views into a click-through or retention rate.

## Read Existing Reports

1. Prefer the existing Cloudflare **Web Analytics** site if its dashboard confirms coverage for both exact paths. Filter to host `jobplorer.com`, apply the same Exclude Bots setting (prefer Yes), and record only **Page views**. Do not substitute zone HTTP request counts or sum Visits with Page views. [Dimensions](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/) and [metric definitions](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/).
2. If Cloudflare coverage is not confirmed, use the existing Jobplorer GA4 property, **Reports > Engagement > Pages and screens** if available. Select **Page path and screen class**, filter to the exact paths and the production host if the property includes other hosts, and record only **Views**. Do not enable tracking or change property settings. [GA4 report guide](https://support.google.com/analytics/answer/12926732?hl=en).
3. Optionally check Search Console **Performance > Search results** by exact canonical page for clicks and impressions. This is search discovery, not total page use. Keep it separate from page views. [Search Console report guide](https://support.google.com/webmasters/answer/7576553?hl=en).

## Weekly Log

Use two complete, non-overlapping seven-day windows starting after the release day, in the report's actual timezone. For a UTC report, example windows are Nov 11-17 and Nov 18-24, 2026. Wait for the report to finish processing. Compare only the same source, host, filters and timezone. Leave unverified, suppressed or unavailable values blank; enter zero only if coverage is confirmed and the report shows zero. Small totals or unusual promotion, downtime or owner testing warrant observation rather than a content decision.

| Report source / timezone | Completed dates | Worksheet views | Tools page views | Coverage confirmed? |
| --- | --- | --- | --- | --- |
| | | | | |
| | | | | |

Keep completed totals in private operations notes. No raw logs, identifiers, demographics, query text, credentials, added tags, custom events, cookies, or new integrations are needed. Read existing reports only; existing hosting and analytics processing is not a site-wide zero-collection claim. Use the two windows for a descriptive comparison only. They cannot establish that the release caused a change.
