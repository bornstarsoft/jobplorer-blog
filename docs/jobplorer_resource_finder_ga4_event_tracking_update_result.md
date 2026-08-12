# Jobplorer Resource Finder GA4 Event Tracking Update Result

## Purpose

Add privacy-conscious interaction measurement to the search-first Jobplorer
homepage so future UX decisions can use observed behavior instead of page views
alone.

## Changes

- Added GA4 custom events for resource search submissions.
- Added events for predefined search examples and category filters.
- Added events for reviewed resource and practical guide opens.
- Added events for the three top-level service-hub paths.
- Added a search-clear event.
- Made the existing GA4 function explicitly available as `window.gtag`.
- Added `?v=20260812` to the interaction script URL to avoid stale script caches
  during deployment.
- Updated the seven-day monitoring checklist with the new event baseline.

## Event Contract

### `resource_search`

- `search_method`: `form_submit` or `example`
- `query_length`: normalized search length
- `result_count`: visible result count
- `has_results`: whether at least one result was found
- `active_filter`: selected filter for form submissions
- `search_example`: fixed site-provided example label only

### `resource_filter`

- `filter_name`
- `result_count`

### `resource_open`

- `resource_name`
- `resource_category`
- `destination_path`

### `resource_path_open`

- `path_name`
- `destination_path`

### `resource_search_clear`

- `previous_query_length`

## Privacy Boundary

- User-entered search text is not sent to GA4.
- No email, account, resume, location, or application data is collected.
- Search measurement uses query length and aggregate result state only.
- Fixed example labels are safe predefined interface values.
- Destination values are internal site paths.

## Verification

- `node --check static/js/jobplorer.js`: passed
- Hugo production build: passed
- Hugo path-warning build: passed with no warnings
- Local resource finder search: passed
- Search for `remote` still returned only Remote Workers
- JavaScript and GA4 initialization source served with the new event contract
- No browser console errors or warnings observed
- Existing content and URLs were not changed
- Unique legacy `/posts/` URL count remained 258 in the local build

The in-app browser isolates analytics globals from its inspection context, so
GA4 receipt should be confirmed in Realtime or DebugView after deployment.

## Recommended Next Step

Deploy the update, verify the five custom event names in GA4 Realtime or
DebugView, and collect the first interaction baseline from 2026-08-12 through
2026-08-19. Do not optimize the homepage from the first few events alone.
