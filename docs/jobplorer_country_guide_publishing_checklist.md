# Jobplorer Country Guide Publishing Checklist

## Pre-draft Checklist

- Confirm the page is a country-level job search research guide.
- Confirm it will not include live job listings or scraped job inventory.
- Choose a stable country-guide slug.
- Keep the page as `draft: true` until official-source review is complete.
- Set `reviewStatus: "needs-official-review"` for new drafts.
- Avoid country ranking, job-site ranking, or "best country" framing.

## Country-specific Official-source Checklist

- Identify official government employment or public employment sources where available.
- Identify official sources users should check for visa, immigration, tax, and labor topics without interpreting those topics.
- Verify any public employment-service names and URLs from official sources.
- Verify any country-specific requirement wording before publishing.
- Omit or soften anything that cannot be verified.
- Record `lastReviewed` as an ISO date only after official-source review is complete.

## Job Site and Resource Checklist

- Identify broad job search resource categories rather than ranking sites.
- Check official websites for any specific job site or public employment resource mentioned.
- Avoid current job count claims.
- Avoid unsupported platform availability claims.
- Tell users to check official job-site, employer, and public-source pages for current details.

## Risk Wording Checklist

Before publishing, confirm the page does not include:

- Fake country rankings.
- Fake job site rankings.
- Job guarantees.
- Interview guarantees.
- Hiring guarantees.
- Salary guarantees.
- Visa advice.
- Legal advice.
- Immigration advice.
- Labor advice.
- Tax advice.
- Unsupported salary or hiring claims.
- Unverified government requirement claims.
- Official government, employer, job-site, or agency partnership implications.
- Affiliate links.
- Scraped live job listing claims.

## URL and Slug Checklist

- Use a durable country-guide slug.
- Do not change existing `/posts/` URLs.
- Do not move `/posts/` to `/blog/`.
- Do not publish a country guide until the official-source checklist is complete.
- If a published guide URL must change later, prepare an alias or redirect policy before changing it.

## Build Verification Checklist

- Run `hugo --gc --minify --destination /tmp/jobplorer-phase3-build`.
- Run `hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase3-pathwarnings`.
- Confirm the build passes.
- Confirm there are no duplicate target warnings.
- Confirm generated repo artifacts are removed if Hugo creates them.
- Confirm `/posts/` URL count remains preserved.

## Publish Checklist

- Confirm `reviewStatus: "reviewed"`.
- Confirm `draft: false` only after owner approval.
- Confirm `lastReviewed` is current and in ISO format.
- Confirm all source-sensitive claims are verified or removed.
- Confirm the page includes a caution note and official-source reminders.
- Confirm no legal, visa, immigration, labor, tax, salary, hiring, or job guarantee wording was introduced.

## Post-publish Monitoring Checklist

- Verify the live page returns HTTP 200.
- Confirm the page appears in sitemap if intended.
- Check Search Console after deployment when available.
- Recheck official sources periodically.
- Move `reviewStatus` to `needs-update` if requirements, official-source pages, or job-search resources may have changed.
- Avoid deleting or moving published country guides without a URL preservation review.
