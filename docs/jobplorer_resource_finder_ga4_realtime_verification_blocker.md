# Jobplorer Resource Finder GA4 Realtime Verification Blocker

## Purpose

Record the attempted GA4 Realtime verification for the deployed Jobplorer
resource-finder interaction events and preserve the exact owner handoff needed
to complete verification.

## Repository Preparation

The analytics deployment report was committed before this check:

```text
2ca8825 Document Jobplorer resource finder analytics deployment
```

The site implementation remained unchanged during this verification attempt.

## Test Events Generated

On `https://jobplorer.com/`, the following production interactions were
completed without browser console errors:

- Selected the fixed `LinkedIn` search example
- Submitted a `remote` resource search
- Selected the `Career Paths` filter
- Submitted a no-result test search and cleared it
- Opened the Remote Workers resource link in a new tab
- Opened the Job Sites service path in a new tab

This exercised all deployed event names:

- `resource_search`
- `resource_filter`
- `resource_open`
- `resource_path_open`
- `resource_search_clear`

No account, resume, email, application, or location data was entered. The
implementation does not send user-entered search text.

## GA4 Access Result

The prepared Google Analytics tab opened the Google account sign-in page.

Observed state:

- GA4 account authentication is required
- No Jobplorer Analytics property is visible
- No Realtime report is visible
- No event names or event parameters can be inspected
- A connected authenticated Chrome browser session is not available

No email address, password, authentication code, or account identifier was
entered by Codex.

## Verification Status

```text
blocked by GA4 authentication
```

The public deployment and event-generation controls are working, but receipt by
the owner GA4 property cannot be confirmed without authenticated property
access.

## Owner Handoff

1. Open the prepared Google Analytics sign-in tab.
2. Sign in privately with the account that owns or can access Jobplorer GA4.
3. Select the Jobplorer property and the web stream using measurement ID
   `G-NZE5Y04BYQ`.
4. Open `Reports > Realtime`.
5. In another tab, open `https://jobplorer.com/`.
6. Perform one search, select one filter, open one resource, open one service
   path, and clear a no-result search.
7. Confirm the five event names appear in Realtime.
8. Record the check time, property, event names observed, and any missing event.

Use DebugView only when GA debug mode has been deliberately enabled. Realtime
is sufficient for the initial receipt check.

## Safety Decision

- Do not change event names before completing the authenticated receipt check.
- Do not add raw search terms to analytics.
- Do not redesign the homepage from test events.
- Do not create GA4 custom dimensions until the event contract is confirmed and
  a reporting need is clear.

## Recommended Next Step

After the owner signs in and leaves the browser on the Jobplorer Realtime
report, resume the verification, repeat the five interactions, and document
which events are received. Then allow at least seven days before interpreting
engagement patterns.
