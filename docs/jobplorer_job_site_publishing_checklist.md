# Jobplorer Job Site Publishing Checklist

## Pre-draft Checklist

- Confirm the page is for an actual job site, career platform, official career resource, or closely related job search starting point.
- Confirm the page is not a live job listing page and will not scrape current listings.
- Choose a URL slug that is simple, durable, and not promotional.
- Keep the page as `draft: true` until official-source review is complete.
- Set `reviewStatus: "needs-official-review"` for new drafts.

## Official Source Verification Checklist

- Verify the official website URL from the site itself.
- Check official public pages for platform purpose, account requirements, pricing notes, job categories, regions, and remote-work features.
- Use clearly cited non-official sources only when official sources are unavailable or when additional context is needed.
- Do not publish unverified pricing, availability, country support, or feature claims.
- Do not claim live job counts unless a current official source provides the number and the page explains that the count can change.
- Record `lastReviewed` as an ISO date only after review is complete.

## Content Quality Checklist

- Explain what the site may be useful for without ranking it.
- Separate factual platform information from editorial notes.
- Include strengths and limitations in cautious, non-promotional wording.
- Include similar sites only as non-ranked alternatives or comparison starting points.
- Tell readers to check official websites and current postings for current details.
- Avoid unsupported claims about job quality, hiring speed, salary outcomes, or employer reliability.

## Risk Wording Checklist

Before publishing, confirm the page does not include:

- Fake ranking.
- Fake rating.
- "Best overall" or numbered ranking claims.
- Job guarantee.
- Interview guarantee.
- Hiring guarantee.
- Salary guarantee.
- Visa eligibility guarantee.
- Legal compliance, labor-law, or tax advice.
- Official partnership implication.
- Affiliate link.
- Scraped live job listing claims.
- Unverified pricing or availability claims.

## URL and Slug Checklist

- Use a stable slug that can remain valid long term.
- Do not change existing `/posts/` URLs.
- Do not move `/posts/` to `/blog/`.
- Do not create a detailed public review page until the source checklist is complete.
- If a published review URL must change later, prepare an alias or redirect policy before changing it.

## Build Verification Checklist

- Run `hugo --gc --minify --destination /tmp/jobplorer-phase2-build`.
- Run `hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase2-pathwarnings`.
- Confirm the build passes.
- Confirm there are no duplicate target warnings.
- Confirm generated repo artifacts are removed if Hugo creates them.
- Confirm `/posts/` URL count remains preserved.

## Publish Checklist

- Confirm `reviewStatus: "reviewed"`.
- Confirm `draft: false` only after owner approval.
- Confirm `lastReviewed` is current and in ISO format.
- Confirm all source-sensitive claims are verified or removed.
- Confirm the page includes a cautious verification note.
- Confirm no affiliate, partnership, or guarantee wording was introduced.

## Post-publish Monitoring Checklist

- Verify the live page returns HTTP 200.
- Confirm the page appears in sitemap if intended.
- Check Search Console after deployment when available.
- Recheck official sources periodically.
- Move `reviewStatus` to `needs-update` if key information may have changed.
- Avoid deleting or moving published pages without a URL preservation review.
