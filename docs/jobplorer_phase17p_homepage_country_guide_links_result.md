# Jobplorer Phase 17P Homepage Country Guide Links Result

## Purpose

Phase 17P adds a compact `Reviewed Country Guides` section to the homepage so the three reviewed country guides have direct service-hub discovery.

This phase changes only the homepage content and creates this report. It does not modify country guide articles, configuration, templates, or deployment state, and it does not push.

## Phase 17O Commit

The country guide internal-link coverage audit was committed before this update:

```text
67e1376 Audit country guide internal link coverage
```

Committed file:

- `docs/jobplorer_phase17o_country_guide_internal_link_coverage_audit.md`

## Homepage Change

Updated:

- `content/_index.md`

Added:

```text
Reviewed Country Guides
```

The section appears after `Reviewed Job Site Profiles` and before `Featured Career Guides`.

This keeps the homepage focused on reviewed service content before practical legacy guidance and the secondary archive.

## Links Added

Exactly three internal links were added:

- `/country-guides/south-korea/`
- `/country-guides/canada/`
- `/country-guides/united-states/`

No existing homepage link was removed.

The general `/country-guides/` hub link remains in the `Start Here` section.

## Wording Safeguards

The new section:

- describes the guides as useful starting points
- notes that public employment resources, job-site availability, and employer processes can change
- tells readers to check official websites for current details

It does not add:

- rankings or ratings
- eligibility, employment, salary, or hiring guarantees
- affiliate or partnership claims
- live job counts
- legal, visa, immigration, labor, tax, hiring, or relocation advice

## Production Build Result

Command:

```text
hugo --gc --minify --noBuildLock --cacheDir /tmp/jobplorer-phase17p-cache --destination /tmp/jobplorer-phase17p-build
```

Result:

- passed
- generated pages: 1,200
- homepage: generated
- all three country guide routes: generated

## Path Warning Build Result

Command:

```text
hugo --gc --minify --printPathWarnings --noBuildLock --cacheDir /tmp/jobplorer-phase17p-path-cache --destination /tmp/jobplorer-phase17p-pathwarnings
```

Result:

- passed
- generated pages: 1,200
- duplicate path warnings: none

## Homepage Rendering Result

Generated homepage section order:

1. Start Here
2. Reviewed Job Site Profiles
3. Reviewed Country Guides
4. Featured Career Guides
5. Practical Job Search Guides
6. Secondary Archive

The generated `Reviewed Country Guides` section contains exactly:

- South Korea
- Canada
- United States

All three links resolve to generated local routes.

The Ananke `More` recent-post section remains hidden. Legacy post guidance and the archive remain secondary.

## Route and Sitemap Preservation

Generated reviewed routes:

- LinkedIn: present
- Indeed: present
- Glassdoor: present
- Software Developers: present
- Game Developers: present
- Remote Workers: present
- South Korea: present
- Canada: present
- United States: present

Generated sitemap:

- South Korea: present
- Canada: present
- United States: present
- published `/posts/` article URLs, excluding the archive root: 258

## Scope and Preservation

- No country guide article changed.
- No job-site profile or career guide changed.
- No legacy post changed.
- No config, CNAME, layout, theme, or public file changed.
- No URL, slug, filename, canonical, noindex, draft, or review-status field changed.
- Generated Hugo cache artifacts were removed.

## Remaining Risks

- The homepage change remains local until a later commit and push.
- Cloudflare Pages can briefly serve the previous homepage immediately after deployment.
- The clean custom-domain homepage may need a cache-busted recheck after push.
- Search Console Performance data should guide later SEO and legacy-content decisions.

## Recommended Next Step

Phase 17Q: commit the homepage update and this report, then perform a controlled GitHub push and deployment verification.

The deployment phase should confirm:

- the clean and cache-busted homepage display `Reviewed Country Guides`
- South Korea, Canada, and United States links appear in that section
- reviewed profiles and career guide sections remain visible
- the recent legacy post feed remains hidden
- all reviewed routes return HTTP 200
- the live sitemap retains 258 published legacy post URLs
- no Cloudflare setting is changed
