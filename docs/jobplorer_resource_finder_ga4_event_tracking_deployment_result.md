# Jobplorer Resource Finder GA4 Event Tracking Deployment Result

## Purpose

Record the controlled deployment and live verification of privacy-conscious GA4
events for the Jobplorer homepage resource finder.

## Source and Push Result

- Branch: `main`
- Git remote: `git@github.com:bornstarsoft/jobplorer-blog.git`
- Implementation commit: `f0c9a02 Track Jobplorer resource finder interactions`
- Push result: successful without force push
- Cloudflare Pages hosts:
  - `https://jobplorer.com/`
  - `https://jobplorer-blog.pages.dev/`

## Live Deployment Result

Both production hosts provided:

- the renewed search-first homepage
- `/js/jobplorer.js?v=20260812`
- a 7,843-character interaction script containing all five event names
- explicit `window.gtag` initialization
- a data-layer fallback for interaction events

The following events were present in both deployed scripts:

- `resource_search`
- `resource_filter`
- `resource_open`
- `resource_path_open`
- `resource_search_clear`

## Privacy Verification

- The implementation does not send user-entered search text.
- Search events send query length, result count, result availability, method,
  and active filter.
- Only fixed site-provided example labels may be sent by name.
- Resource and path events send internal labels, categories, and paths.
- No account, resume, email, application, or location data is collected.

## Build and Regression Result

- JavaScript syntax check: passed
- Hugo production build: passed
- Hugo path-warning build: passed with no warnings
- Homepage search behavior: passed
- Career Paths filter: three expected guides shown
- Horizontal overflow: not observed
- Browser console warnings or errors: none observed
- Live sitemap unique `/posts/` URL count: 258
- Sample reviewed job-site, career-guide, and country-guide routes remained in
  the live sitemap

## Remaining Manual Verification

GA4 event receipt cannot be confirmed from the public site alone. The owner
should open GA4 Realtime or DebugView, exercise the homepage controls, and
confirm the five event names appear. Allow normal processing time before using
standard reports for decisions.

## Recommended Next Step

Confirm event receipt in GA4, then collect an interaction baseline for
2026-08-12 through 2026-08-19. Do not redesign or optimize from a few initial
events; compare interaction signals with page-level traffic and Search Console
data first.
