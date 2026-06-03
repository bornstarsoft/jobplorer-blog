# Jobplorer Career Guide Publishing Checklist

## Pre-draft Checklist

- Confirm the page is a role-level or career-area job search research guide.
- Confirm it will not include live job listings or scraped job inventory.
- Choose a stable career-guide slug.
- Keep the page as `draft: true` until official-source review is complete.
- Set `reviewStatus: "needs-official-review"` for new drafts.
- Avoid career ranking, job-site ranking, "best career", or guaranteed-outcome framing.

## Career-specific Source Checklist

- Identify official employer, job-site, education, certification, professional body, or government sources where relevant.
- Verify any specific certification, licensing, credential, tool, or role requirement wording from official sources before publishing.
- Treat employer preferences, skill expectations, job-market conditions, and tools as changeable.
- Omit or soften anything that cannot be verified.
- Record `lastReviewed` as an ISO date only after official-source review is complete.

## Job Site and Resource Checklist

- Identify broad job search resource categories rather than ranking sites.
- Check official websites for any specific job site, employer resource, education provider, or certification body mentioned.
- Avoid current job count claims.
- Avoid unsupported platform availability, salary, or hiring claims.
- Tell users to check official job-site, employer, education, certification, and public-source pages for current details.

## Portfolio and Resume Wording Checklist

- Frame resumes, portfolios, profiles, and application materials as preparation topics, not guarantees.
- Avoid claiming that one resume format, portfolio type, credential, or tool is required unless an official source clearly supports it.
- Use cautious wording such as "may be useful", "can help users prepare", and "check employer requirements directly".
- Do not guarantee interviews, hiring, salary outcomes, promotion outcomes, or career advancement.

## Risk Wording Checklist

Before publishing, confirm the page does not include:

- Fake career rankings.
- Fake job-site rankings.
- Fake ratings.
- Job guarantees.
- Interview guarantees.
- Hiring guarantees.
- Salary guarantees.
- Visa advice.
- Legal advice.
- Immigration advice.
- Labor advice.
- Tax advice.
- Unsupported salary claims.
- Unsupported certification or requirement claims.
- Official employer, school, platform, certification body, or job-site partnership implications.
- Affiliate links.
- Scraped live job listing claims.

## URL and Slug Checklist

- Use a durable career-guide slug.
- Do not change existing `/posts/` URLs.
- Do not move `/posts/` to `/blog/`.
- Do not publish a career guide until the official-source checklist is complete.
- If a published guide URL must change later, prepare an alias or redirect policy before changing it.

## Build Verification Checklist

- Run `hugo --gc --minify --destination /tmp/jobplorer-phase4-build`.
- Run `hugo --gc --minify --printPathWarnings --destination /tmp/jobplorer-phase4-pathwarnings`.
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
- Confirm no legal, visa, immigration, labor, tax, salary, hiring, certification, or career outcome guarantee wording was introduced.

## Post-publish Monitoring Checklist

- Verify the live page returns HTTP 200.
- Confirm the page appears in sitemap if intended.
- Check Search Console after deployment when available.
- Recheck official sources periodically.
- Move `reviewStatus` to `needs-update` if requirements, tools, official-source pages, or job-market conditions may have changed.
- Avoid deleting or moving published career guides without a URL preservation review.
