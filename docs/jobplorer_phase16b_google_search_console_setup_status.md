# Jobplorer Phase 16B Google Search Console Setup Status

## Purpose

Phase 16B records the owner-completed Google Search Console setup status for Jobplorer and defines the next Search Console data collection phase.

This phase is docs-only. It does not modify content, posts, config, CNAME, layouts, themes, generated output, job-site pages, country guides, or career guides.

## Search Console Property Type

Google Search Console property:

- Property type: Domain property
- Domain: `jobplorer.com`

A Domain property should cover the apex domain, `www` subdomain, and other supported protocols/subdomains included by Google's domain-property model.

## Domain Verified

Verified domain:

```text
jobplorer.com
```

## DNS TXT Verification Status

Verification method:

- DNS TXT verification

Owner setup result:

- Cloudflare TXT record added: yes
- Verification successful: yes

## Cloudflare TXT Record Note

Cloudflare DNS currently includes CNAME records for apex/`www` routing and a TXT record for Google verification.

The TXT record is for Google Search Console domain-property verification. It is separate from website routing and separate from email setup.

## Sitemap Submission Status

Sitemap submitted: yes

Submitted sitemap URL:

```text
https://jobplorer.com/sitemap.xml
```

The sitemap should be monitored for discovery, fetch status, indexed URL trends, and any reported errors.

## Email / MX Warning Note

Email setup is optional for the current Jobplorer website operation.

MX records are not needed for Google Search Console verification and are not required for the site to serve at `jobplorer.com`.

The Cloudflare MX/email warning shown during setup is unrelated to Search Console. If email for the domain is needed later, it can be handled separately with Cloudflare Email Routing or another owner-approved email provider.

## Initial URLs To Inspect

Recommended first URL Inspection checks:

- `https://jobplorer.com/`
- `https://jobplorer.com/job-sites/sites/linkedin/`
- `https://jobplorer.com/job-sites/sites/indeed/`
- `https://jobplorer.com/job-sites/sites/glassdoor/`
- `https://jobplorer.com/career-guides/software-developers/`
- `https://jobplorer.com/career-guides/game-developers/`
- `https://jobplorer.com/career-guides/remote-workers/`
- `https://jobplorer.com/country-guides/south-korea/`
- `https://jobplorer.com/country-guides/canada/`

Draft-only URL to confirm remains excluded if inspected:

- `https://jobplorer.com/country-guides/united-states/`

## Waiting Period For Performance Data

Performance data may not be immediately available after initial Search Console setup.

Recommended waiting period:

- Initial URL Inspection and sitemap status can be checked soon after setup.
- Performance data should be reviewed after Google has had time to crawl and report data.
- Use a 7-day and 28-day review window once data begins appearing.

## Recommended Next Phase

Recommended next phase options:

- Phase 16C: URL Inspection result tracking for homepage, live profiles, live guides, and live country guides.
- Phase 16D: Search Console data collection for the four rewritten legacy posts after performance data begins appearing.

The next Search Console phase should collect:

- Indexed status
- Google-selected canonical
- Last crawl date, if visible
- Sitemap discovery status
- Crawl/index warnings
- Clicks
- Impressions
- CTR
- Average position
- Top queries
- Pages with sudden drops or unexpected impressions

No deletion, noindex, slug, or URL changes should be made based only on early Search Console setup status.
