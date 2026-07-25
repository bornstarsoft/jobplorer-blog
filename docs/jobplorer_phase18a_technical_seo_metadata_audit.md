# Jobplorer Phase 18A Technical SEO Metadata Audit

## Purpose

Phase 18A audits generated technical SEO metadata for the 14 important Jobplorer URLs currently tracked for Search Console monitoring.

This phase is docs-only. It does not modify content, posts, configuration, CNAME, layouts, themes, generated public output, URLs, or deployment state.

## Repository State

- Branch: `main`
- Starting commit: `18feedc Document Search Console sign-in recheck`
- Git remote: `git@github.com:bornstarsoft/jobplorer-blog.git`
- The working tree was clean before this report was created.

## Audit Scope

The generated production HTML was checked for:

- canonical URL
- Open Graph URL
- robots directive
- document title
- meta description
- H1 count and text
- sitemap inclusion

Tracked URLs:

1. Homepage
2. LinkedIn
3. Indeed
4. Glassdoor
5. Software Developers
6. Game Developers
7. Remote Workers
8. South Korea
9. Canada
10. United States
11. AI in Recruitment
12. Entry-Level Job Search
13. Resume Blockers
14. AI-Assisted Game Development Roles

## Build Result

Commands checked:

```text
hugo --gc --minify --noBuildLock --cacheDir /tmp/jobplorer-phase18a-cache --destination /tmp/jobplorer-phase18a-build
hugo --gc --minify --printPathWarnings --noBuildLock --cacheDir /tmp/jobplorer-phase18a-path-cache --destination /tmp/jobplorer-phase18a-pathwarnings
```

Results:

- Standard production build: passed
- Path-warning build: passed
- Duplicate/path warnings: none observed
- Hugo version: `v0.152.2+extended+withdeploy`
- Generated pages: 1,200
- Unique published `/posts/` detail URLs: 258

A second build in a fresh temporary output directory reproduced the metadata findings and ruled out stale generated files.

## Canonical And Robots Result

For all 14 tracked URLs:

- canonical URL matched the expected clean `https://jobplorer.com/` URL
- Open Graph URL matched the canonical URL
- robots directive was `index, follow`
- document title was present
- meta description was present
- sitemap entry was present

No duplicate document-title values or duplicate meta-description values were found within the tracked set.

Generated `robots.txt` remained:

```text
User-agent: *
Allow: /
Sitemap: https://jobplorer.com/sitemap.xml
```

No URL, canonical, robots, or sitemap change is indicated by this audit.

## Heading Structure Result

The four rewritten legacy posts each generated one H1.

Nine profile and guide pages generated the same H1 twice:

- LinkedIn
- Indeed
- Glassdoor
- Software Developers
- Game Developers
- Remote Workers
- South Korea
- Canada
- United States

The cause is deterministic:

- the Ananke single-page template renders `.Title` as an H1
- each affected Markdown body begins with the same `#` heading

The homepage generated two different H1 elements:

- `Jobplorer`, from the site header
- `Explore Job Sites and Career Paths Around the World`, from homepage Markdown

This is not an indexing emergency, but it is a controlled heading-structure cleanup candidate. Any fix should preserve visible wording and URLs.

## Title And Description Result

All tracked pages had non-empty titles and descriptions.

Review candidates:

- Homepage title is `Jobplorer | Jobplorer`, which repeats the site name.
- Three rewritten legacy post titles are longer than 60 characters.
- The four rewritten legacy posts have meta descriptions between 595 and 759 characters.

The long descriptions come from the theme fallback:

- the four rewritten posts do not define a front matter `description`
- the Ananke base template falls back to Hugo `.Summary`
- each rewritten post has a long introductory summary before the first section heading

The profile, career-guide, and country-guide descriptions are concise, unique, and between 91 and 139 characters in the generated HTML.

Title length is not treated as an error by itself. Search Console query and CTR data should be reviewed before changing public title wording.

## Stable Findings

- All 14 tracked URLs generate in production.
- All 14 tracked URLs use the expected canonical host and path.
- All 14 tracked URLs are indexable.
- All 14 tracked URLs appear in the production sitemap.
- The United States guide is now published and included in the current inventory.
- The legacy archive remains preserved at 258 published post detail URLs.
- Existing service-hub routes and rewritten legacy URLs remain intact.

## Risks

### Low Operational Risk

- Homepage title repeats `Jobplorer`.
- Homepage contains two H1 elements.

### Low-To-Moderate Metadata Risk

- Nine profile and guide pages contain duplicate visible H1 text.
- Four rewritten legacy posts rely on long automatic summary descriptions.
- Three rewritten post titles may be truncated in some search-result presentations.

These findings do not justify emergency edits, URL changes, canonical changes, or sitemap changes.

## What Not To Change Yet

- Do not change URLs or slugs.
- Do not add `noindex` or remove indexed pages.
- Do not change canonicals or sitemap behavior.
- Do not rewrite title wording from length alone.
- Do not expand legacy rewrites while Search Console Performance data remains unavailable.
- Do not edit the vendored Ananke theme directly without first evaluating a narrow local override.

## Recommended Phase 18B

Prepare a controlled local remediation plan with three independently reviewable options:

1. Remove or demote repeated Markdown H1 headings while preserving visible page titles and URLs.
2. Add concise front matter descriptions to the four rewritten legacy posts without changing their body, title, slug, or canonical.
3. Evaluate a narrow homepage title override that avoids `Jobplorer | Jobplorer` without changing the site name.

Implementation should remain local until a clean Hugo build, heading-count check, metadata-length check, sitemap preservation check, and owner review all pass.
