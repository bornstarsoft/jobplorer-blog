# Jobplorer Phase 1B Trust and Policy Pages Result

## Purpose

Phase 1B adds trust and policy pages for the Jobplorer service MVP:

- About
- Contact
- Privacy Policy
- Terms of Use

These pages support the renewed positioning:

```text
Jobplorer = Explore job sites, country guides, and career paths around the world.
```

They also clarify that Jobplorer is an informational resource, not a live job scraping board, recruiting service, legal adviser, visa adviser, tax adviser, or labor adviser.

## Scope

This phase added four top-level content pages and two minimal main menu entries.

This phase did not modify:

- existing `content/posts` article files
- existing post slugs, URLs, titles, dates, body content, draft status, or filenames
- `CNAME`
- Cloudflare settings
- layouts or theme files
- generated `public/` output
- affiliate links
- job listing scraping features

## Added Pages

| Route | File | Purpose |
| --- | --- | --- |
| `/about/` | `content/about.md` | Explains what Jobplorer is, what it helps users explore, and what it does not guarantee. |
| `/contact/` | `content/contact.md` | Provides cautious contact guidance without inventing a private email or backend form. |
| `/privacy/` | `content/privacy.md` | Describes Jobplorer as a static informational site with no accounts, login, direct job applications, or payments. |
| `/terms/` | `content/terms.md` | Sets general informational-use terms and external-link cautions. |

## Navigation Changes

The Phase 1A menu already included:

- Job Sites
- Country Guides
- Career Guides
- Tools
- Guides
- Archive

To avoid crowding the main menu, Phase 1B added only:

- About -> `/about/`
- Contact -> `/contact/`

Privacy and Terms are linked from the About and Contact page content instead of adding more top-level menu items.

No layout or theme edits were needed.

## Build Result

Build command:

```sh
hugo --gc --minify --destination /tmp/jobplorer-phase1b-build
```

Result: passed.

Build summary:

- Pages: 1189
- Paginator pages: 21
- Static files: 2
- Aliases: 9

Path-warning command:

```sh
hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase1b-pathwarnings
```

Result: passed with no duplicate target warnings.

Hugo generated `.hugo_build.lock` and `resources/` during diagnostics; only those generated artifacts were removed.

## Route Verification Result

Generated local files were confirmed for:

- `/about/`
- `/contact/`
- `/privacy/`
- `/terms/`

## `/posts/` Preservation Result

Legacy post preservation checks:

- Existing post article files: 268
- Published post article files: 258
- Unique published `/posts/` URLs: 258
- Existing `content/posts` article files changed: none

The `/posts/` route remains the legacy job news archive. No post article URLs were moved to `/blog/`.

## Policy Wording Safeguards

The new pages state or reinforce that:

- Jobplorer is an informational resource.
- Jobplorer is not a live job board and does not scrape real-time job listings.
- Job site details, pricing, availability, policies, postings, and external websites can change.
- Users should check official websites, current job postings, employer pages, and other authoritative sources.
- Jobplorer does not guarantee employment, interviews, hiring outcomes, salary outcomes, visa eligibility, legal compliance, labor-law outcomes, tax outcomes, or application results.
- Jobplorer does not provide visa advice, legal advice, labor advice, tax advice, immigration advice, or professional career counseling.
- External links are provided for convenience, and users should review each external website's own terms and policies.
- Jobplorer currently does not provide user accounts, login features, direct job applications, payment processing, comments, or account dashboards.

The pages avoid:

- fake rankings
- fake ratings
- affiliate links
- official partnership implications
- job guarantees
- salary guarantees
- hiring guarantees
- visa/legal/labor/tax advice

## Remaining Next Steps

Recommended upcoming phases:

- Phase 1C: controlled push and deployment verification
- Phase 2: Job Site review model
- Phase 3: starter drafts for LinkedIn / Indeed / Glassdoor

Continue preserving existing `/posts/` article URLs during all future phases.
