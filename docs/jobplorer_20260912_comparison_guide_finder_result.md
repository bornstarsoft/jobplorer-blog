# Job Site Comparison and Guide Finder

## Decision and Scope

The owner rejected the temporary application tracker because a recording workflow without persistence risks losing users' work. This change implements the approved alternative: read-only job-site comparisons and selection-based guide discovery. Phase: local implementation and validation. No commit, push, or production deployment was performed.

Starting repository: `jobplorer-blog`, branch `main`, HEAD `bd372b6`. The existing uncommitted tracker and deployment/analytics reports were present before this change. Unrelated work was not reverted or staged.

## Implemented

- `/job-sites/`: a structured comparison of LinkedIn, Indeed, and Glassdoor, with consistent research-focus, application-context, and verification columns. Desktop table becomes stacked platform sections on narrow screens. Each row links to its existing profile and an official source. No ratings, rankings, pricing, live job counts, or outcome guarantees were added.
- `/job-seeker-tools/guide-finder/`: fixed choices for six goals, three role topics, and four country-resource options. Each of the 72 combinations displays one relevant reading path per group, with an explanation. This is editorial navigation, not job matching or eligibility advice.
- No free-text fields, personal profile, resume upload, saved selections, URL query encoding, or selection telemetry. JavaScript only hides/shows existing links; without JavaScript, all 13 reading paths remain accessible.
- New entry points from the homepage, Tools hub, Guides hub, and comparison page.
- The previous tracker is now `draft: true`, removed from public entry links and privacy copy, and absent from production output and sitemap. Its draft code and historical reports remain for reference; this is not a deletion of unrelated files or browser data.
- GA4 is omitted on the comparison and finder pages. Other pages retain their existing analytics configuration. Hosting request logs and production-injected scripts remain outside this local assertion.
- The existing `/job-sites/page/1/` redirect is retained as an alias after replacing the automatically paginated layout.

## Official Sources Checked

Checked on 2026-09-12:

- [LinkedIn search help](https://www.linkedin.com/help/linkedin/answer/a511260/): accessible; distinguishes Easy Apply on LinkedIn from Apply links to a company or third-party site.
- [Indeed application help](https://www.indeed.com/help/job-seekers/articles/204652920-applying-for-a-job-on-indeed?hl=en&co=US): accessible; distinguishes applications on Indeed from employer-site applications and describes reviewing imported resume details.
- [Glassdoor company reviews](https://www.glassdoor.com/Reviews/index.htm): accessible; provides company and review research. This does not establish a universal application workflow or the accuracy of individual reviews.

Existing profile and guide bodies were read for navigation context, not rewritten. Account/price/availability comparisons were deliberately not expanded beyond current supporting evidence. The comparison check date does not change individual guide review dates.

## Validation

- `node --check tests/resource-discovery.cjs` passed.
- Hugo 0.152.2 normal and path-warning builds passed with no duplicate/path warnings. Output is outside the repository, under `/tmp/jobplorer-discovery-final` and `/tmp/jobplorer-discovery-final-warnings`.
- Structured sitemap checks confirmed 258 unique legacy article URLs, excluding `/posts/` itself; all nine current reviewed profiles/guides remain generated and listed. The actual current U.S. guide is published, despite older historical draft-only notes.
- The new finder and existing comparison route generate and appear in the sitemap. The tracker route and fingerprinted tracker assets do not generate in production.
- Playwright passed all 72 selection combinations, reset, keyboard focus traversal and reset activation, unchanged page URL, zero selection network requests, zero browser-storage API calls, no cookies, and no third-party requests on the two local pages.
- All finder destination URLs returned local HTTP 200 and the interview-prompts anchor exists. Comparison profile links are present. The draft tracker returns local HTTP 404. Homepage resource search and GA4 inclusion remain intact.
- 1440px, 390px, and 320px overflow checks passed for both pages. Desktop finder/comparison and narrow-screen finder/comparison screenshots were visually inspected. Screenshots are under `/tmp/jobplorer-discovery-qa`.
- No-JavaScript checks passed: all 13 reading paths and all three comparison rows remain visible; inactive selection controls are hidden.

Initial build checks caught that historical post filenames differ from published URL slugs. Guide destinations now resolve against Hugo page permalinks, preserving all existing URLs. Native macOS select-popup keyboard automation did not change the selection as expected; the final test explicitly covers Tab traversal and Enter activation of Reset, while selectOption tests cover all selection combinations. It does not claim OS-popup arrow-key coverage.

## Changed Files in This Work

- `content/job-sites/_index.md`
- `content/job-seeker-tools/guide-finder.md`
- `content/job-seeker-tools/_index.md`
- `content/job-seeker-tools/application-tracker.md` (draft only)
- `content/guides/_index.md`
- `content/privacy.md`
- `layouts/index.html`
- `layouts/partials/head-additions.html`
- `layouts/_default/job-site-comparison.html`
- `layouts/_default/guide-finder.html`
- `assets/css/jobplorer-discovery.css`
- `assets/js/jobplorer-discovery.js`
- `tests/resource-discovery.cjs`
- This report

No posts, job-site profile articles, country/career guide articles, config, CNAME, themes, or repository `public` output were changed.

## Release Preparation Addendum

The owner subsequently approved GitHub deployment on 2026-09-12 and clarified that the Gitea-only rule applies to Unity game projects, not this website. The shared tracker asset loader was removed before release so the approved pages have no dependency on discarded tracker assets. The retired tracker draft, its assets/template/test, and earlier unrelated reports stay uncommitted and are excluded from the release. The `localOnlyTool` analytics exclusion is retained as a precaution for the local draft, not as a published feature. Deployment and exact-release validation are recorded separately.

## Next Step and Limits

Owner review at `http://localhost:1327/job-sites/` and `http://localhost:1327/job-seeker-tools/guide-finder/`, then a separately approved controlled deployment. The previous 1326 tracker preview server was stopped. Do not deploy with Hugo `-D`; that would expose discarded draft work.

This implementation does not establish business success, legal exemption, site-wide zero data collection, or current production availability. Selection-only navigation avoids collecting user-written applications; external destinations, ordinary hosting logs, and analytics on other pages still require their own operational review.
