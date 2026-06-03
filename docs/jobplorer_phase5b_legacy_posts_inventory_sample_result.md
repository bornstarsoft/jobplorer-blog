# Jobplorer Phase 5B Legacy Posts Inventory Sample Result

## Purpose

Phase 5B created a read-only legacy `/posts/` inventory export and a 30-post sample triage. The purpose is to understand cleanup and rewrite risk before any legacy post is edited, drafted, noindexed, deleted, renamed, moved, or rewritten.

## Scope

Created outside the repository:

- `/tmp/jobplorer-phase5b/legacy-post-inventory.tsv`
- `/tmp/jobplorer-phase5b/legacy-post-sample-30.tsv`
- `/tmp/jobplorer-phase5b/legacy-post-counts.txt`

Added to the repository:

- `docs/jobplorer_phase5b_legacy_posts_inventory_sample_result.md`

Not changed:

- `content/posts/*.md`
- Job Site pages
- Country Guide pages
- Career Guide pages
- `config.toml`
- `CNAME`
- layouts, themes, public files, or Cloudflare settings

## Inventory Counts

| Metric | Count | Notes |
| --- | ---: | --- |
| Total `content/posts` article files | 268 | Excludes `content/posts/_index.md`. |
| Draft post files | 10 | Existing draft status only; no draft status was changed. |
| Unique inferred published `/posts/` URLs | 258 | Based on non-draft post files, explicit `slug` or filename fallback rules. |
| Legacy archive URLs | 258 | `/posts/` remains the legacy archive route for now. |
| Sample size | 30 | Recent posts selected by date/filename. |

## 30-post Sample Triage Table

This is title-and-front-matter-level triage only. It is not a final editorial or SEO decision.

| Date | File | Title | Category | Initial triage note |
| --- | --- | --- | --- | --- |
| 2026-05-27 | `content/posts/2026-05-27-jobs-194059.md` | `Special Construction's 2026 Recruitment: A Gateway for Aspiring Engineers` | B | Recruitment-specific auto-news; likely time-sensitive and thin for evergreen use. |
| 2026-05-23 | `content/posts/2026-05-23-jobs-211228.md` | `Google Embraces AI in Developer Interviews` | D | Could support career/interview guidance if official and employer sources are checked. |
| 2026-05-20 | `content/posts/2026-05-20-jobs-201155.md` | `AI's Impact on the Accounting Industry: A Paradigm Shift` | D | Possible Career Guide input for accounting/AI research, but needs source review. |
| 2026-05-19 | `content/posts/2026-05-19-jobs-224142.md` | `Why 87% of Job Seekers Abandon Their Resumes` | D | Resume topic may be evergreen, but the statistic must be verified before reuse. |
| 2026-05-16 | `content/posts/2026-05-16-jobs-223021.md` | `Exploring the Impact of Project 1496 on Youth Employment in Vietnam` | C | Program-specific and country-specific; off-position unless source value is proven. |
| 2026-05-14 | `content/posts/2026-05-14-jobs-213953.md` | `Lotte Innovate and Mirae Asset Securities: A Model for Inclusive Corporate Culture` | B | Company-news oriented; may be thin unless rewritten into a broader inclusion topic. |
| 2026-05-13 | `content/posts/2026-05-13-jobs-201846.md` | `Job Market Trends in Jeju: Growth and Insights` | D | Could inform country/region research, but likely time-sensitive and source-heavy. |
| 2026-05-12 | `content/posts/2026-05-12-jobs-201509.md` | `AI Creators: The Future of Game Development` | D | Potential Game Developers Career Guide input if rewritten with official sources. |
| 2026-05-09 | `content/posts/2026-05-09-jobs-233730.md` | `Cancellation of Information Non-Existence Notice by the Human Rights Commission` | C | Legal/administrative topic appears off-position for Jobplorer MVP content. |
| 2026-05-08 | `content/posts/2026-05-08-jobs-230907.md` | `Wall Street Firms Expand Cryptocurrency Hiring: Traditional Finance Experience Required` | D | Could inform finance/crypto career research, but needs current employer/source review. |
| 2026-05-08 | `content/posts/2026-05-08-jobs-003119.md` | `Structural Crisis in Daegu's Labor Market` | C | Region-specific labor-market news; avoid reuse without official source review. |
| 2026-05-05 | `content/posts/2026-05-05-jobs-221528.md` | `Jobplorer Archive: 2026-05-05` | E | Stabilized malformed legacy URL; do not change before traffic/canonical review. |
| 2026-05-04 | `content/posts/2026-05-04-jobs-221532.md` | `Innovative Community Engagement through Technology` | C | Broad technology/community topic appears weakly aligned with the new Jobplorer scope. |
| 2026-05-02 | `content/posts/2026-05-02-jobs-213656.md` | `The Rise of AI in Recruitment: A New Era of Hiring` | A | Potential evergreen hiring/recruitment explainer if rewritten cautiously with sources. |
| 2026-04-29 | `content/posts/2026-04-29-jobs-214028.md` | `South Korea's Bold Move to Boost Youth Employment Amid Economic Challenges` | D | Possible South Korea Country Guide input, but policy claims need official sources. |
| 2026-04-28 | `content/posts/2026-04-28-jobs-201242.md` | `Regional Talent Acquisition in Banking: A Strategic Shift` | B | Industry news angle; likely thin unless converted into broader job-search research. |
| 2026-04-23 | `content/posts/2026-04-23-jobs-204805.md` | `Job Creation Strategies in Gangneung for 2026` | D | Region-specific country guide input candidate; needs official source review. |
| 2026-04-22 | `content/posts/2026-04-22-jobs-214703.md` | `The Struggles of Young Job Seekers in a Competitive Market` | A | Potential evergreen job-seeker guide topic if rewritten without unsupported claims. |
| 2026-04-21 | `content/posts/2026-04-21-jobs-215319.md` | `AI Skills in Hiring: The New Standard for All Job Roles` | D | Possible Career Guide input, but "new standard" wording is risky and needs softening. |
| 2026-04-19 | `content/posts/2026-04-19-jobs-203314.md` | `Youth Employment Crisis in Ulsan: A Wake-Up Call` | C | Regional crisis news; archive candidate only after Search Console review. |
| 2026-04-18 | `content/posts/2026-04-18-jobs-220359.md` | `PEARL ABYSS' 'Crimson Desert' Breaks Records with 5 Million Sales` | C | Company/product news appears off-position for job information hub goals. |
| 2026-04-17 | `content/posts/2026-04-17-jobs-205857.md` | `Improving Women's Economic Participation in Jeju: A Positive Trend` | D | Possible country/region guide research input if sources are official and current. |
| 2026-04-14 | `content/posts/2026-04-14-jobs-212734.md` | `Gwangmyeong City Aims to Create 16,965 Jobs by 2026: A Model for Economic Recovery` | D | Local job policy topic; statistic and policy claims need official verification. |
| 2026-04-13 | `content/posts/2026-04-13-jobs-184814.md` | `Guro's Ambitious Job Creation Strategy for 2026` | D | Local job policy topic; possible source input but not evergreen as-is. |
| 2026-04-12 | `content/posts/2026-04-12-jobs-233015.md` | `The Impact of Employment Trends on Different Age Groups` | A | Could become evergreen job-market explainer if rewritten with reliable sources. |
| 2026-04-10 | `content/posts/2026-04-10-jobs-185656.md` | `Korea's National Pension Service Seeks Global Asset Management Experts` | B | Recruiting/news-specific; likely thin unless used for finance career research. |
| 2026-04-08 | `content/posts/2026-04-08-jobs-222627.md` | `Mandatory Salary Disclosure in Job Postings: A Step Towards Transparency` | D | Possible job-seeker guide topic, but avoid legal/salary advice and verify jurisdiction. |
| 2026-04-06 | `content/posts/2026-04-06-jobs-185812.md` | `Daegu's Economic Struggles and the Call for Change` | C | Regional economic news; likely off-position unless reframed with official sources. |
| 2026-04-04 | `content/posts/2026-04-04-jobs-202407.md` | `Job Creation and Employment Rates in Namdong-gu: A Vision for 2026` | D | Local policy/statistic topic; source-heavy and not evergreen as-is. |
| 2026-04-03 | `content/posts/2026-04-03-jobs-184315.md` | `The Decline of Entry-Level Job Postings in 2026` | A | Potential evergreen entry-level job seeker topic if sourced and softened. |

## Common Risks Found

- Many recent posts appear time-sensitive, local, company-specific, or policy-news oriented.
- Several titles contain statistics or strong claims that should not be reused without official source review.
- Some posts could become useful inputs for evergreen Career Guide or Country Guide content, but not as direct republishing candidates.
- At least one recent sampled page is URL-preservation-sensitive because it is a stabilized legacy archive page.
- Some topics touch salary disclosure, labor markets, public policy, or administrative/legal themes; these need extra caution to avoid advice wording.
- Title-only classification is not enough for action. Body quality, source quality, live traffic, indexing status, and canonical behavior must be checked first.

## URL Preservation Policy

- Do not mass-delete legacy posts.
- Do not move `/posts/` to `/blog/`.
- Do not change slugs.
- Do not change filenames.
- Do not draft, noindex, delete, or archive any live URL before Search Console review.
- Keep live URLs stable during triage.
- Treat stabilized malformed URLs and duplicate/canonical history as category E until traffic and canonical review are complete.
- Rewrite or archive in small batches only after owner approval.

## Recommended Next Phase

Proceed to Phase 5C Search Console-informed decision plan, or Phase 5C-A small rewrite candidate selection.

Recommended conservative path:

1. Review Search Console data for the 30 sampled URLs.
2. Select a small set of A/D candidates with low URL risk.
3. Draft evergreen replacements or rewrites without changing existing `/posts/` URLs.
4. Keep B/C/E candidates untouched until traffic, indexing, and canonical risks are reviewed.
