# Jobplorer Phase 18B Technical SEO Metadata Remediation Plan

## Purpose

Phase 18B converts the Phase 18A metadata audit into a narrow, test-backed remediation plan.

This phase is docs-only. All implementation tests were performed against a temporary copy of `content/`; no site source, configuration, CNAME, layout, theme, generated public output, URL, or deployment state was changed.

## Phase 18A Commit

The Phase 18A audit report was committed before this plan:

```text
8b0f883 Audit Jobplorer technical SEO metadata
```

Committed file:

- `docs/jobplorer_phase18a_technical_seo_metadata_audit.md`

## Baseline Findings

Healthy controls:

- 14 of 14 tracked URLs have the expected canonical URL.
- 14 of 14 tracked URLs have the expected Open Graph URL.
- 14 of 14 tracked URLs use `index, follow`.
- 14 of 14 tracked URLs have a title and meta description.
- 14 of 14 tracked URLs appear in the production sitemap.
- The legacy archive remains preserved at 258 published post detail URLs.

Cleanup candidates:

- Nine profile and guide pages repeat the same H1 in the page template and Markdown body.
- The homepage has two H1 elements.
- The homepage document title is `Jobplorer | Jobplorer`.
- Four rewritten legacy posts use 595-to-759-character automatic summary descriptions.
- Three rewritten legacy post titles are longer than 60 characters.

## Remediation Principles

- Preserve every URL, slug, filename, canonical, and sitemap entry.
- Preserve the visible reviewed wording.
- Avoid direct edits to the vendored Ananke theme.
- Keep heading cleanup separate from description cleanup.
- Do not change public title wording from length alone.
- Do not use uncollected Search Console query data as justification.
- Validate generated HTML, not only Markdown source.

## Option A: Heading And Homepage Title Cleanup

### Proposed Homepage Changes

In `content/_index.md`:

- change `title: "Jobplorer"` to `title: ""`
- change the content heading `# Explore Job Sites and Career Paths Around the World` to H2

Temporary-build behavior:

- browser document title becomes `Jobplorer`
- site header H1 remains `Jobplorer`
- Open Graph title remains `Jobplorer`
- Twitter title remains `Jobplorer`
- description remains unchanged
- canonical remains `https://jobplorer.com/`
- the service-hub heading remains visible as an H2

This avoids a layout or theme override.

### Proposed Single-Page Changes

Remove only the first Markdown H1 from:

- `content/job-sites/sites/linkedin.md`
- `content/job-sites/sites/indeed.md`
- `content/job-sites/sites/glassdoor.md`
- `content/career-guides/software-developers.md`
- `content/career-guides/game-developers.md`
- `content/career-guides/remote-workers.md`
- `content/country-guides/south-korea.md`
- `content/country-guides/canada.md`
- `content/country-guides/united-states.md`

The Ananke single-page template already renders each front matter title as the visible page H1. Removing the repeated Markdown heading therefore preserves the page title text while reducing each page to one H1.

### Risk

Risk level: low.

Potential impact:

- the homepage service-hub heading becomes visually smaller because it changes from H1 to H2
- spacing above the first paragraph on single pages may change slightly after the repeated body heading is removed

Required implementation checks:

- desktop and mobile homepage rendering
- one job-site profile
- one career guide
- one country guide
- H1 count across all 14 tracked URLs

## Option B: Rewritten Post Description Cleanup

Add a concise front matter `description` to each rewritten legacy post.

Proposed descriptions:

### AI In Recruitment

```text
A practical guide to researching AI-assisted recruitment tools, application steps, and official employer or job-site information.
```

Generated length: 129 characters.

### Entry-Level Job Search

```text
A practical guide to comparing entry-level job postings, experience language, application requirements, and official sources.
```

Generated length: 125 characters.

### Resume Blockers

```text
A practical checklist for reviewing resume clarity, formatting, evidence, and alignment with official job postings before applying.
```

Generated length: 131 characters.

### AI-Assisted Game Development Roles

```text
A practical guide to researching AI-assisted game development roles, tools, portfolio expectations, and official job postings.
```

Generated length: 126 characters.

These descriptions summarize existing body content. They do not add rankings, guarantees, salary claims, legal advice, hiring claims, or unsupported performance claims.

### Risk

Risk level: low to moderate.

The descriptions are technically safer than the current long `.Summary` fallback, but Google may choose a different search snippet. Description implementation should be a separate phase so it can be reviewed without mixing it with heading changes.

## Option C: Public Title Wording

Do not change the four rewritten post titles in the next implementation phase.

Reason:

- all titles are unique and descriptive
- title length alone is not a defect
- Search Console query, impression, position, and CTR data remain unavailable
- shortening titles without query evidence may remove useful context

Risk level for changing titles now: moderate.

Decision: defer until Search Console Performance data is available.

## Temporary Prototype Result

A temporary content copy was used to test Options A and B together.

Results:

- Hugo production build: passed
- Path warnings: none observed
- Generated pages: 1,200
- All 14 tracked routes generated
- All 14 tracked pages had exactly one H1
- Homepage title: `Jobplorer`
- Homepage Open Graph title: `Jobplorer`
- Homepage Twitter title: `Jobplorer`
- All 14 canonical URLs remained correct
- All 14 robots directives remained `index, follow`
- All 14 sitemap entries remained present
- Four rewritten descriptions were 125 to 131 characters
- Published `/posts/` detail URL count remained 258

The prototype changed only files under `/tmp`; the repository source was not modified.

## Recommended Implementation Sequence

### Phase 18C

Implement Option A only:

- homepage title and heading cleanup
- duplicate body-H1 removal from nine reviewed pages
- local build and path-warning build
- generated H1 audit
- desktop/mobile rendering checks
- route, canonical, sitemap, and 258-post preservation
- no push

### Phase 18D

After Phase 18C is reviewed, implement Option B only:

- add the four proposed front matter descriptions
- verify description lengths and rendered metadata
- preserve titles, bodies, slugs, URLs, canonicals, and archive count
- no push until separately approved

### Deferred

Keep public title wording unchanged until Search Console Performance data is available.

## What Not To Change

- URLs, slugs, filenames, or aliases
- canonical or robots behavior
- sitemap configuration
- Ananke theme files
- body copy beyond the repeated first-level heading
- rewritten post titles
- reviewed status or publication state
- legacy archive membership

## Recommended Next Step

Proceed with Phase 18C as a local-only heading and homepage-title cleanup. Keep the four post descriptions for a separate Phase 18D change.
