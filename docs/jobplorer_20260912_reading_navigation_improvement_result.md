# Reading Navigation Improvement Result

## Purpose and Phase

Improve the path from reading an article to finding the next useful resource without introducing personal inputs or persistence. Phase: local implementation and validation, not deployment. The website remains on GitHub; no remote, Cloudflare settings, commit, or push was changed/performed in this phase.

Starting branch: `main`. Starting HEAD: `f077439 Add job site comparison and guided resource discovery`. Existing untracked tracker files and earlier reports were inspected as known pending work and left untouched.

## Improvements

- A collapsible, server-rendered "On this page" outline uses existing level-two content headings and their existing anchor IDs.
- Desktop readers have a sticky outline beside the article. Short viewports retain access to all outline entries through a scrollable rail.
- At widths below 980px, the outline appears before the article and the official-source reminder follows it. The outline can be collapsed with the keyboard or pointer.
- A "Continue your research" section links to Job Site Comparison and Guide Finder, with a back-to-top link.
- These additions apply to the nine reviewed profiles/career/country guides and the four explicitly selected rewritten legacy guides. They do not label the wider legacy archive as reviewed or add the new navigation to unrelated policy pages.
- No JavaScript was added. Native links and `details` provide the new behavior with scripting disabled.

## Scope

Changed or added for this work:

- `layouts/_default/single.html`
- `layouts/partials/head-additions.html`
- `assets/css/jobplorer-reading.css`
- `tests/article-reading.cjs`
- This report

No content Markdown, titles, descriptions, slugs, review dates, configuration, CNAME, theme files, existing JavaScript, or analytics settings were edited. The shared single-page template adds a title anchor, and the fingerprinted reading stylesheet is loaded on regular pages; the outline and continuation controls are restricted to the selected reading pages.

## Implementation Reference

The outline uses the existing Hugo heading model through [Page.Fragments and ToHTML](https://gohugo.io/methods/page/fragments/), not a separate manually maintained heading list. New resource destinations are resolved with Hugo page lookups and fail the build if missing.

## Validation

Validation completed locally on 2026-09-12 KST using Hugo 0.152.2 and the bundled Playwright Chromium runtime.

1. `hugo --gc --minify --destination /tmp/jobplorer-reading-build`: passed.
2. `hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-reading-pathwarnings`: passed, no duplicate/path warnings.
3. `tests/article-reading.cjs`: passed across all 13 target URLs. Checks cover heading/outline correspondence, duplicate IDs, destination links, article paragraph/link/heading preservation, native disclosure keyboard controls, anchor visibility, back-to-top navigation, five widths (1440, 980, 979, 390, 320), short desktop height, no-JavaScript navigation, no new inputs/storage, and exclusions for unrelated pages/the tracker.
4. `tests/resource-discovery.cjs`: passed all 72 guide-choice combinations, reset/keyboard handling, no selection requests/storage/cookies, internal links, three comparison profiles, mobile layouts, homepage search, tracker exclusion, and no-JavaScript fallback.
5. Before/after production sitemap URL sets match exactly: 735 unique sitemap URLs, including 258 legacy article URLs (excluding the `/posts/` index).
6. `git diff --check`: passed. No changes to content, config, CNAME, static files, or themes.

The initial article preservation assertion compared minified and development HTML as a single text string and incorrectly flagged inter-block whitespace. The corrected test compares individual text blocks, body links, and heading IDs/titles. All 13 pages passed without changing article content.

## Evidence and Reproduction

- Before build: `/tmp/jobplorer-reading-before`
- Reading screenshots: `/tmp/jobplorer-reading-qa`
- Existing-feature regression screenshots: `/tmp/jobplorer-reading-discovery-regression`
- Local preview: http://localhost:1327/career-guides/remote-workers/

Run the repository tests with `PLAYWRIGHT_MODULE_PATH` set to the installed Playwright module, `JOBPLORER_TEST_URL` set to the local server, and optionally `JOBPLORER_BASELINE_BUILD` set to the before-build path for paragraph/link preservation checks. The scripts reject non-local test hosts and block external browser requests.

## Privacy and Remaining Risks

No new forms, personal-data fields, storage, cookies, analytics events, or selection transmission were introduced. Existing analytics on article pages are unchanged; this is not a claim that hosting or the whole site performs no request logging.

This is a navigation improvement, not evidence of increased retention, search rankings, or revenue. The four rewritten-post slugs are an explicit scope list; adding another reviewed reading path later requires an intentional update and tests. Browser QA covered Chromium, not every browser or assistive technology. Production deployment and post-deployment cache verification have not been performed for this change.

## Recommended Next Step

Review the local reading flow, then use a separately approved GitHub commit/push and Cloudflare deployment check. Preserve the unrelated untracked files and verify clean production URLs after deployment. Use Search Console data for later content decisions, not this UI change alone.
