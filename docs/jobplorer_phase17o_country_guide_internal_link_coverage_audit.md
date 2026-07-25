# Jobplorer Phase 17O Country Guide Internal Link Coverage Audit

## Purpose

Phase 17O audits the current internal-link coverage for the three reviewed country guides after the United States publication and hub deployment.

This is a docs-only audit. It does not change the homepage, country guides, other content, configuration, templates, or deployment state.

## Phase 17N Report Commit

The United States Country Guides hub deployment report was committed before this audit:

```text
15f298e Document United States country guide hub deployment
```

Committed file:

- `docs/jobplorer_phase17n_united_states_country_guide_hub_deployment_result.md`

## Routes Audited

Reviewed country guides:

- `/country-guides/south-korea/`
- `/country-guides/canada/`
- `/country-guides/united-states/`

Source pages inspected:

- `content/_index.md`
- `content/country-guides/_index.md`
- `content/job-seeker-tools/_index.md`
- site navigation in `config.toml`
- Markdown links across `content/`

Generated pages inspected:

- `/`
- `/country-guides/`
- the three reviewed country guide routes
- generated sitemap

## Current Link Coverage

### Homepage

The homepage links to the Country Guides hub from its `Start Here` section.

The generated homepage also exposes the hub through navigation, giving the page two links to `/country-guides/`.

The homepage does not currently link directly to:

- South Korea
- Canada
- United States

### Country Guides Hub

The manually maintained `Reviewed Country Guides` list links directly to:

- South Korea
- Canada
- United States

The theme's generated page list also exposes all three published guide routes.

This gives each country guide direct discovery from the dedicated hub without relying only on the sitemap.

### Other Content Hubs

No direct links to the three country guides were found in other content hubs.

Adding country-guide links to Job Seeker Tools or unrelated article bodies would not currently be justified by the surrounding content. Those pages should remain unchanged unless a specific contextual use appears later.

## Coverage Strengths

- All three reviewed guides are linked from the correct topical hub.
- The homepage provides a clear path to the Country Guides hub.
- Global navigation includes the Country Guides hub.
- All three routes are present in the generated sitemap.
- No draft country guide is exposed.
- The current structure does not scatter repetitive or weakly contextual links across unrelated pages.

## Coverage Gap

The homepage highlights reviewed Job Site Profiles and Featured Career Guides with direct links, but reviewed Country Guides are represented only by the general hub link.

This creates a small service-hub consistency gap:

- job-site profiles have direct homepage discovery
- career guides have direct homepage discovery
- country guides require one additional navigation step

The gap does not block indexing or route discovery, but a compact homepage section would make the live service categories more balanced.

## Safe Options

### Option A: Leave As-Is

Risk: low.

The current structure is valid, and the Country Guides hub provides complete direct coverage. This option avoids any additional homepage content.

### Option B: Add Three Homepage Links

Risk: low.

Add one compact `Reviewed Country Guides` section to `content/_index.md` with direct links to South Korea, Canada, and the United States.

Use cautious wording that presents the guides as starting points and reminds readers to verify current official details.

This adds exactly three internal links and matches the existing homepage treatment of reviewed profiles and career guides.

### Option C: Add Links Across Multiple Hubs

Risk: medium.

Adding the same country links to Job Seeker Tools, Career Guides, or unrelated legacy posts would increase repetition without clear contextual value. This should not be done as a general link-building exercise.

### Option D: Modify Layout or Navigation

Risk: medium.

Custom layout, menu, or theme changes are unnecessary because the homepage content can provide the needed direct discovery.

## Recommended Phase 17P Option

Use Option B: add a compact `Reviewed Country Guides` section to the homepage only.

Recommended links:

- `/country-guides/south-korea/`
- `/country-guides/canada/`
- `/country-guides/united-states/`

Recommended constraints:

- modify only `content/_index.md` and one result report
- add exactly three internal links
- keep the existing Country Guides hub link
- keep all country guide article bodies unchanged
- do not add rankings, ratings, guarantees, salary claims, or legal, visa, immigration, labor, tax, hiring, or relocation advice
- do not push until local rendering and preservation checks pass

## What Not to Change Yet

- country guide article bodies
- Country Guides hub wording
- job-site profile or career guide pages
- Job Seeker Tools
- legacy post bodies
- navigation configuration
- CNAME
- layouts or theme files
- URL, slug, canonical, noindex, draft, or review-status fields

## Build and Preservation Result

Production build:

```text
hugo --gc --minify --noBuildLock --cacheDir /tmp/jobplorer-phase17o-cache --destination /tmp/jobplorer-phase17o-build
```

Path-warning build:

```text
hugo --gc --minify --printPathWarnings --noBuildLock --cacheDir /tmp/jobplorer-phase17o-path-cache --destination /tmp/jobplorer-phase17o-pathwarnings
```

Results:

- both builds passed
- generated pages: 1,200
- duplicate path warnings: none
- all reviewed job-site profiles generated
- all reviewed career guides generated
- South Korea, Canada, and United States generated
- published `/posts/` article URL count remained 258
- generated Hugo cache artifacts were removed

## Recommended Next Step

Phase 17P: implement the three-link homepage `Reviewed Country Guides` section locally, run the standard build and preservation checks, and leave the change unpushed for owner review.
