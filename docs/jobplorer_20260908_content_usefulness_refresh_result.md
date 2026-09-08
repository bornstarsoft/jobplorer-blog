# Jobplorer Content Usefulness Refresh

## Purpose and Scope

Implementation and local validation on 2026-09-08, following the owner's request for a broad content update. Improve the usefulness of existing public resources without making traffic-driven claims from unavailable analytics.

Updated 17 content pages and the homepage template's visible copy. No commit, push, or production deployment was performed. The pre-existing untracked GA4 authentication recheck report was preserved.

## Content Changes

- Job Sites: goal-based platform comparison, cross-source posting checks, and links to application records.
- Job Sites by Career / Country: replace future-content placeholders with existing reviewed resources and comparison prompts.
- Career Guides / Country Guides: add practical steps for comparing responsibilities, official resources, and unresolved questions.
- Guides: link all four rewritten legacy guides with a clear reader question for each.
- Remote Jobs: replace future-content wording with a shortlist workflow and links to the existing Remote Workers guide.
- Job Seeker Tools: add a weekly review, private application-record template, pre-submission checklist, interview questions, and a cautious AI preparation prompt. These are static planning worksheets, not saved records or a new interactive application.
- LinkedIn / Indeed / Glassdoor: add platform-specific research sessions, official source links, and contextual next steps.
- Software Developers / Game Developers / Remote Workers: add role-evidence and work-arrangement checklists.
- South Korea / Canada / United States: add resource-scope explanations and country-specific research checklists.
- Homepage: align resource summaries and the tools callout with the expanded content. Search behavior, markup structure, and analytics code were not changed.

## Source Checks

Sources were read on 2026-09-08. New platform facts are limited to the scope supported below. Planning steps are Jobplorer editorial suggestions, not claims about universal employer requirements.

| Official source | Access and supported scope |
| --- | --- |
| [LinkedIn search help](https://www.linkedin.com/help/linkedin/answer/a511260/) | Readable; search, filters, saving, alerts, and on-platform versus external application routes. |
| [Indeed application help](https://www.indeed.com/help/job-seekers/articles/204652920-applying-for-a-job-on-indeed?hl=en&co=US) | Readable after redirect from the historical support URL; application destinations and reviewing resume fields. |
| [Indeed remote-search help](https://www.indeed.com/help/job-seekers/articles/115005875163-searching-for-remote-jobs?hl=en&co=US) | Readable after redirect; platform-specific remote search context. |
| [Glassdoor company directory](https://www.glassdoor.com/Reviews/index.htm) | Readable; company/review research starting point, not proof of review accuracy or team conditions. |
| [BLS software occupations](https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm) | Readable; broad occupation context only. No wage or outlook statistics added. |
| [O*NET Video Game Designers](https://www.onetonline.org/link/summary/15-1255.01) | Readable; design-task context, not universal studio requirements. |
| [Employment24](https://www.work24.go.kr/) | Readable, redirected to `/cm/main.do`; official government portal with occupation/region job navigation and career resources. |
| [Canada.ca Jobs](https://www.canada.ca/en/services/jobs.html) | Readable; official directory linking Job Bank and government employment resources. |
| [USAJOBS search help](https://help.usajobs.gov/how-to/search) | Readable; search/filter guidance. |
| [DOL American Job Centers](https://www.dol.gov/agencies/eta/american-job-centers) | Readable; official employment-service network starting point. |

Access limitations: direct Job Bank `/findajob` and `/home` fetches failed, and the CareerOneStop job-search page returned a fetch error. No new account, eligibility, local-service, or feature claims were inferred from those failures. Canada.ca supports the added Job Bank directory reference. Existing CareerOneStop links and historical review context were retained.

An old LinkedIn help URL labeled `apply-for-jobs-on-linkedin` resolved to Open to Work content. The newly added citation instead uses the verified current search-help page.

All existing frontmatter, including titles, descriptions, draft flags, review status, and `lastReviewed`, is unchanged. This is a targeted source check and editorial expansion, not a new full certification of every historical platform field. No new prices, rankings, job counts, outcome promises, or eligibility guidance were added.

## Validation

- `hugo --gc --minify --destination /tmp/jobplorer-content-refresh-build`: passed, 1,200 pages.
- `hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-content-refresh-pathwarnings`: passed, no path or duplicate warnings.
- Sitemap: 258 unique legacy article URLs under `/posts/`, excluding the archive index. Including `/posts/` itself yields 259; the counting distinction is explicit.
- All nine reviewed resources generate and appear in the production sitemap, including the already-published United States guide.
- All internal page and anchor links in the 17 edited content pages resolve in generated output; each page has one H1.
- Frontmatter compared against HEAD and confirmed unchanged. No `content/posts/` files changed.
- Playwright checked all 18 affected pages at 1440px and 390px widths: HTTP 200, no horizontal overflow, and no page JavaScript errors. The tools page screenshots were visually inspected at both sizes.
- Homepage search for `remote` returns one resource. External analytics requests were blocked during browser QA to avoid adding test activity to production metrics.
- The CLI wrapper could not download from npm due to network resolution restrictions. QA used the existing bundled Playwright library and Chromium instead.

Screenshots are in `/tmp/jobplorer-content-refresh-tools-1440.png`, `/tmp/jobplorer-content-refresh-tools-390.png`, and `/tmp/jobplorer-content-refresh-home-mobile.png`. Build and preview output are outside the repository.

## Preservation and Remaining Limits

Configuration, CNAME, themes, JavaScript, analytics, legacy posts, publication state, and URLs were preserved. No Search Console or GA4 data was inferred, and no performance or ranking improvement is claimed. The pre-existing GA4 authentication blocker remains separate from this content work.

The additions make research steps explicit but do not introduce live vacancies, persistent application tracking, or automated reminders. External resources and employer details can change; blocked sources still need direct owner verification for any future broader review.

## Next Step

Review the local preview, then proceed with a separately authorized controlled commit/push and deployment check. After deployment, check clean canonical routes and the sitemap, and compare actual Search Console/GA4 evidence when available before changing titles, descriptions, or expanding legacy rewrites.
