# Jobplorer Phase 5L Internal Link Plan For Rewritten Posts

## Purpose

Phase 5L creates a docs-only internal-link plan for the first four rewritten legacy `/posts/` articles. No source pages are edited in this phase.

The goal is to improve discoverability of rewritten evergreen legacy posts without changing their URLs, over-linking the site, or adding misleading anchor text.

## Target Rewritten URLs

| Target URL | Rewritten topic | Best-fit link context |
| --- | --- | --- |
| `/posts/the-rise-of-ai-in-recruitment/` | AI in recruitment and cautious job-search strategy | Job seeker tools, job site research, application preparation |
| `/posts/the-struggles-of-young-job-seekers/` | Entry-level job search starting points | Career guides, job seeker tools, legacy archive |
| `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/` | Resume blockers and cautious job seeker tools | Job seeker tools, career guides, software developer guide |
| `/posts/ai-creators-future-game-development/` | AI-assisted game development roles and job search channels | Career guides, software developer guide, legacy archive |

## Candidate Source Pages For Internal Links

### `content/job-seeker-tools/_index.md`

Good fit for:

- `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`
- `/posts/the-rise-of-ai-in-recruitment/`
- `/posts/the-struggles-of-young-job-seekers/`

Why:

- The page already discusses checklists, templates, resume prompts, and application tracking ideas.
- It can naturally link to rewritten legacy guidance without implying that a tool guarantees outcomes.

Suggested anchors:

- `resume blockers checklist`
- `AI in recruitment checklist`
- `entry-level job search starting points`

### `content/career-guides/_index.md`

Good fit for:

- `/posts/the-struggles-of-young-job-seekers/`
- `/posts/ai-creators-future-game-development/`
- `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`

Why:

- The page already mentions future career guide topics such as entry-level job seekers, resume preparation, portfolio planning, and skill research.
- It can link to legacy rewritten posts as related reading while keeping the main Career Guides section clean.

Suggested anchors:

- `entry-level job search starting points`
- `AI-assisted game development role research`
- `resume preparation checklist`

### `content/posts/_index.md`

Good fit for:

- All four rewritten URLs.

Why:

- The archive landing page is the most natural place to explain that some legacy posts have been rewritten into evergreen guidance.
- It can add a small `Rewritten legacy guides` subsection later without touching individual post URLs.

Suggested anchors:

- `AI in recruitment`
- `entry-level job search`
- `resume blockers`
- `AI-assisted game development roles`

### `content/career-guides/software-developers.md`

Good fit for:

- `/posts/ai-creators-future-game-development/`
- `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/`

Why:

- The Software Developers guide already discusses broad job search channels, employer pages, role expectations, and portfolio/resume variation.
- A limited related-reading link can help readers research adjacent technical/creative role topics without expanding the guide into unsupported claims.

Suggested anchors:

- `AI-assisted game development role research`
- `resume and application material review`

### `content/job-sites/_index.md`

Good fit for:

- `/posts/the-rise-of-ai-in-recruitment/`

Why:

- The page discusses job sites and career platforms as research starting points.
- A single link about AI-assisted hiring tools may be useful if framed as related legacy guidance, not as a platform ranking or recommendation.

Suggested anchor:

- `AI-assisted hiring tools in job search`

### `content/_index.md`

Possible fit for:

- None in the first implementation batch.

Why:

- The homepage is already concise and navigation-oriented.
- Adding post links here may clutter the first-viewport service-MVP structure.

Recommendation:

- Hold homepage links until Search Console or UX review suggests a clear benefit.

### `content/job-sites/sites/linkedin.md`

Possible fit for:

- `/posts/the-rise-of-ai-in-recruitment/`

Why:

- LinkedIn is a reviewed profile page, so additional legacy links should be used cautiously.
- A link may distract from the official-source profile and should not imply LinkedIn uses any specific AI hiring workflow unless officially verified.

Recommendation:

- Hold in the first implementation batch.

## Suggested Anchor Text By Target URL

| Target URL | Preferred anchor text | Acceptable alternate anchors | Avoid |
| --- | --- | --- | --- |
| `/posts/the-rise-of-ai-in-recruitment/` | `AI in recruitment checklist` | `AI-assisted hiring tools in job search`, `what job seekers should check about AI in recruitment` | `best AI hiring tools`, `AI hiring guarantees`, `AI recruitment ranking` |
| `/posts/the-struggles-of-young-job-seekers/` | `entry-level job search starting points` | `entry-level job search checklist`, `how to choose where to start as an entry-level job seeker` | `guaranteed entry-level jobs`, `best entry-level jobs`, `entry-level salary advice` |
| `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/` | `resume blockers checklist` | `resume and application material review`, `reviewing a resume before applying` | `resume tool ranking`, `guaranteed interview resume`, `salary-boosting resume tips` |
| `/posts/ai-creators-future-game-development/` | `AI-assisted game development role research` | `AI-related game development job search checklist`, `game developer portfolio and AI role research` | `best AI game jobs`, `AI game job guarantees`, `game developer salary advice` |

## Risk Rules

Apply these rules before implementing internal links:

- No excessive linking.
- No misleading anchor text.
- No job guarantee wording.
- No interview, hiring, salary, promotion, or career outcome guarantee wording.
- No legal, visa, immigration, labor, tax, compensation, discrimination, or regulated employment advice wording.
- No fake ranking or fake rating wording.
- No affiliate or partnership wording.
- Do not imply official endorsement by employers, job sites, schools, governments, or platforms.
- Keep rewritten legacy post URLs unchanged.
- Prefer natural contextual links over repeated link blocks.
- Avoid adding the same target link from too many nearby pages.

## Recommended First Implementation Batch

Add only 3-5 internal links total in the first implementation phase.

Preferred first batch:

| Source page | Target URL | Suggested anchor text | Rationale |
| --- | --- | --- | --- |
| `content/job-seeker-tools/_index.md` | `/posts/why-87-percent-of-job-seekers-abandon-their-resumes/` | `resume blockers checklist` | Strongest topical match for tools, resume prompts, and application preparation. |
| `content/job-seeker-tools/_index.md` | `/posts/the-rise-of-ai-in-recruitment/` | `AI in recruitment checklist` | Natural fit for tool-aware application preparation and cautious AI workflow research. |
| `content/career-guides/_index.md` | `/posts/the-struggles-of-young-job-seekers/` | `entry-level job search starting points` | Career Guides already mentions entry-level job seekers. |
| `content/career-guides/software-developers.md` | `/posts/ai-creators-future-game-development/` | `AI-assisted game development role research` | Closely related to technical career research and portfolio/tool expectations. |
| `content/posts/_index.md` | all four rewritten URLs | `Rewritten legacy guides` subsection with four concise links | Useful archive-level signposting, but consider this optional if 4 links feels too dense for the first batch. |

Recommended first implementation choice:

- Start with the first four links above.
- Defer the `content/posts/_index.md` archive subsection unless the owner wants a visible rewritten-guides cluster.

## Pages To Avoid In First Batch

Defer links from:

- `content/_index.md`: homepage should stay concise.
- `content/job-sites/sites/linkedin.md`: avoid implying LinkedIn-specific AI workflow claims.
- `content/job-sites/_index.md`: possible later, but less direct than Job Seeker Tools.

## Suggested Next Phase

Possible next phases:

- Phase 5M: small internal-link implementation with 3-5 total links.
- Search Console manual review first, using the Phase 5K intake sheet, before any source-page edits.

Recommended path:

1. Review this internal-link plan.
2. Choose whether the first implementation batch should include 4 contextual links or also a small archive subsection.
3. Implement links in a separate controlled phase.
4. Build, verify rewritten URLs remain unchanged, and avoid changing any legacy post slug or filename.
