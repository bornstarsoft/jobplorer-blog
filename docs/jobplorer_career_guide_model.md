# Jobplorer Career Guide Model

## Purpose

Career Guides should help readers understand where to start researching job search channels, preparation topics, and role-specific resources for a career path.

The model is designed for cautious, source-based career research pages. It is not professional career counseling, legal advice, visa advice, immigration advice, labor advice, tax advice, salary advice, a certification guarantee, a hiring guarantee, or a career outcome guarantee.

## What Career Guides Are

Jobplorer Career Guides are informational starting points that can help users explore:

- Broad job search channels for a role or career area.
- Common preparation topics to research, such as resumes, portfolios, interviews, and skill signals.
- Official sources users should verify before relying on requirements, tools, certifications, or job-market information.
- Practical next questions for comparing employers, job sites, education providers, and professional resources.

Every public Career Guide should remind readers that requirements, tools, job-market conditions, employer preferences, and platform details can change.

## What Career Guides Are Not

Career Guides must not be presented as:

- Professional career counseling.
- Legal advice.
- Visa advice.
- Immigration advice.
- Labor advice.
- Tax advice.
- Salary advice.
- Certification, hiring, interview, salary, or career outcome guarantees.
- Official employer, school, platform, certification body, or job-site partnerships.
- Live job listings or scraped job inventory.
- Career rankings or job-site rankings.

## Required Front Matter Fields

Future Career Guide pages should include these fields:

```yaml
title: ""
description: ""
careerArea: ""
guideType: ""
targetAudience: []
jobSearchStartingPoints: []
commonJobSiteCategories: []
portfolioOrResumeNotes: []
officialSourcesToCheck: []
usefulFor: []
limitations: []
lastReviewed: ""
reviewStatus: "needs-official-review"
draft: true
```

## Field Guidance

- `title`: Page title. Use a stable role or career-area title after verification.
- `description`: Short cautious summary for previews and search.
- `careerArea`: Broad career area such as software development, game development, design, operations, healthcare, or education.
- `guideType`: Broad type such as "career job search guide" or "career research guide".
- `targetAudience`: Reader groups the guide may help, such as entry-level job seekers, career changers, students, or experienced professionals.
- `jobSearchStartingPoints`: Non-ranked starting points for research.
- `commonJobSiteCategories`: Broad categories such as company career pages, professional networks, general job sites, niche job boards, public employment resources, or portfolio communities.
- `portfolioOrResumeNotes`: Cautious preparation topics. Do not guarantee that a portfolio, resume style, credential, or certification will produce an outcome.
- `officialSourcesToCheck`: Official employer, education, certification, professional body, government, or job-site sources users should verify directly.
- `usefulFor`: Reader scenarios where the guide may be useful.
- `limitations`: Caution notes, including that requirements, tools, and job-market conditions can change.
- `lastReviewed`: ISO date when official-source review was completed.
- `reviewStatus`: Current editorial review state.
- `draft`: `true` until official-source review is complete and the owner approves publication.

## Review Status Values

- `draft`: Early draft, not ready for publication.
- `needs-official-review`: Draft exists but official sources have not been fully checked.
- `reviewed`: Official-source review completed and the page is approved for publication.
- `needs-update`: Page was previously reviewed but may be outdated or needs a source refresh.

## Cautious Wording Rules

Use phrases such as:

- "starting points"
- "may be useful"
- "can help users explore"
- "check official sources for current details"
- "requirements, tools, and job-market conditions can change"
- "verify directly before applying, enrolling, or making decisions"

Avoid phrases such as:

- "best career"
- "best job site"
- "guaranteed job"
- "guaranteed interview"
- "guaranteed salary"
- "required certification" unless verified by an official source and clearly scoped
- "visa-safe"
- "legally compliant"
- "official partner"

## Official-source Requirements

Career Guides should verify stable public facts from official sources before publication.

At minimum, check:

- Official employer or company career pages when discussing employer-specific expectations.
- Official job-site help pages when discussing platform-specific search channels.
- Official education, certification, licensing, or professional body pages when discussing credentials, without guaranteeing outcomes.
- Official government or public employment resources when relevant, without giving legal, visa, immigration, labor, tax, or salary advice.
- Official product, tool, or documentation pages when discussing role-specific tools.

If a fact cannot be verified, either omit it or frame it as something the reader should check directly.

## Prohibited Advice and Claims

Career Guides must not provide:

- Legal advice.
- Visa advice.
- Immigration advice.
- Labor advice.
- Tax advice.
- Salary advice.
- Hiring guarantees.
- Interview guarantees.
- Job guarantees.
- Certification guarantees.
- Career outcome guarantees.
- Unsupported certification or requirement claims.
- Official employer, school, platform, certification body, or job-site partnership implications.

## Public Page Disclaimer Pattern

Each public Career Guide should include a short note similar to:

> This guide is a career and job search research starting point, not professional career counseling, legal, visa, immigration, labor, tax, salary, or hiring advice. Requirements, tools, job postings, and job-market conditions can change. Check official employer, job-site, education, certification, and government sources before applying, enrolling, or making decisions.
