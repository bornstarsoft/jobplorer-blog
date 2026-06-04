# Jobplorer Phase 15B U.S. Manual Verification Owner Checklist

## Purpose

Phase 15B improves the owner-facing manual verification template for the United States country guide.

The United States guide remains unpublished and should stay `reviewStatus: "needs-official-review"` until owner-checked official sources support the remaining claims or show that the wording is safely cautious.

This phase is docs-only. It does not modify the United States country guide or any site content.

## Why Manual Verification Is Needed

Prior Codex source checks returned HTTP 403 for several core U.S. sources:

- USAJOBS homepage
- USAJOBS Help Center
- CareerOneStop homepage
- CareerOneStop job search page
- CareerOneStop American Job Centers page
- CareerOneStop state job banks page

U.S. Department of Labor and Employment and Training Administration pages were accessible, but those pages do not fully replace USAJOBS and CareerOneStop checks for the current draft.

## Exact Owner Browser-Check Steps

1. Open a normal browser session outside Codex.
2. Visit each source URL listed below.
3. Confirm whether the page is accessible without relying on snippets, search previews, or third-party summaries.
4. Record the page title shown by the official page.
5. Record the official operator or owner shown on the page, such as USAJOBS, U.S. Office of Personnel Management, CareerOneStop, U.S. Department of Labor, or the relevant state workforce agency.
6. Record the date checked.
7. Summarize only what the page safely supports for a cautious job-seeker guide.
8. Record what the page does not support, especially if the draft should avoid a claim.
9. Save a screenshot or note path if available.
10. Do not add legal, visa, immigration, labor, tax, salary, hiring, relocation, eligibility, or benefit advice.

## Sources To Manually Verify

### Source 1: USAJOBS Homepage

Manual URL:

```text
https://www.usajobs.gov/
```

Fill-in fields:

- Accessible? yes/no:
- Page title:
- Official operator:
- Date checked:
- Safe claims supported:
- Claims not supported:
- Screenshot/note path if available:

### Source 2: USAJOBS Help Center

Manual URL:

```text
https://help.usajobs.gov/
```

Fill-in fields:

- Accessible? yes/no:
- Page title:
- Official operator:
- Date checked:
- Safe claims supported:
- Claims not supported:
- Screenshot/note path if available:

### Source 3: CareerOneStop Homepage

Manual URL:

```text
https://www.careeronestop.org/
```

Fill-in fields:

- Accessible? yes/no:
- Page title:
- Official operator:
- Date checked:
- Safe claims supported:
- Claims not supported:
- Screenshot/note path if available:

### Source 4: CareerOneStop Job Search Page

Manual URL:

```text
https://www.careeronestop.org/JobSearch/job-search.aspx
```

Fill-in fields:

- Accessible? yes/no:
- Page title:
- Official operator:
- Date checked:
- Safe claims supported:
- Claims not supported:
- Screenshot/note path if available:

### Source 5: CareerOneStop Career Exploration Page

Manual URL:

```text
https://www.careeronestop.org/ExploreCareers/explore-careers.aspx
```

Fill-in fields:

- Accessible? yes/no:
- Page title:
- Official operator:
- Date checked:
- Safe claims supported:
- Claims not supported:
- Screenshot/note path if available:

### Source 6: CareerOneStop American Job Centers Page

Manual URL:

```text
https://www.careeronestop.org/LocalHelp/AmericanJobCenters/american-job-centers.aspx
```

Fill-in fields:

- Accessible? yes/no:
- Page title:
- Official operator:
- Date checked:
- Safe claims supported:
- Claims not supported:
- Screenshot/note path if available:

### Source 7: CareerOneStop State Job Banks Page

Manual URL:

```text
https://www.careeronestop.org/JobSearch/FindJobs/state-job-banks.aspx
```

Fill-in fields:

- Accessible? yes/no:
- Page title:
- Official operator:
- Date checked:
- Safe claims supported:
- Claims not supported:
- Screenshot/note path if available:

### Source 8: Official State Workforce Resource Directory

Manual URL:

```text
Owner should provide the official state workforce directory URL checked.
```

Fill-in fields:

- Accessible? yes/no:
- Official URL:
- Page title:
- Official operator:
- Date checked:
- Safe claims supported:
- Claims not supported:
- Screenshot/note path if available:

## Claim Review Notes

When reviewing the United States draft, treat these as cautious claim areas:

- USAJOBS as a federal employment search resource.
- USAJOBS help pages as a place to verify account, application, and profile details.
- CareerOneStop as a career exploration and job search resource.
- American Job Centers as local employment support resources.
- State job banks or state workforce sites as official resources that may vary by state.

Do not infer:

- That a source guarantees job availability.
- That a source guarantees hiring, interviews, placement, or outcomes.
- That a source provides legal, visa, immigration, labor, tax, salary, relocation, eligibility, or benefit advice for Jobplorer readers.
- That every employer, state, agency, or job seeker follows the same process.

## Decision Rules

- Keep the U.S. guide as draft if any key source remains unverified.
- Keep `reviewStatus: "needs-official-review"` if USAJOBS or CareerOneStop source data is missing.
- Move to reviewed only if all claims are official-source supported or safely cautious.
- Keep `draft: true` even if the guide moves to reviewed, until owner separately approves publication.
- Never add visa, legal, immigration, labor, tax, salary, hiring, relocation, eligibility, or government-benefit advice.
- Never add fake rankings, ratings, guarantees, affiliate links, partnership claims, or live job count claims.
- Never publish without owner approval.

## Recommended Next Phase

Phase 15C: interpret completed U.S. manual verification data and decide whether the United States country guide can move to reviewed status while remaining unpublished.
