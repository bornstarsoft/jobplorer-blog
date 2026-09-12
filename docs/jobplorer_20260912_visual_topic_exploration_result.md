# Visual Topic Exploration Result

## Purpose and Phase

Make Jobplorer easier to explore through recognizable topic artwork, direct reading paths, and more forgiving search. Phase: local implementation and validation. No commit, push, Cloudflare setting change, or production deployment was performed. The website remains on GitHub.

This work builds on the pending reading-navigation improvement. Existing unrelated tracker files and earlier reports remain untouched and the application tracker remains unpublished.

## Images Created and Applied

Five original editorial illustrations were generated with the built-in image generation tool, not the CLI/API fallback. All selected outputs are stored in the repository, not referenced from a tool cache.

| Topic | Repository source | Original generated file |
| --- | --- | --- |
| Software development | `assets/images/topics/software-development.png` | `exec-08596e9a-14d9-47b4-baae-c2785a7d2cc9.png` |
| Game development | `assets/images/topics/game-development.png` | `exec-1ac24d5c-49ae-437e-aeef-2a56cda581cb.png` |
| Remote work | `assets/images/topics/remote-work.png` | `exec-1c0d463c-e341-4cb4-a4ff-0c75ba2712eb.png` |
| AI in recruitment | `assets/images/topics/ai-recruitment.png` | `exec-452b493e-53cf-4a58-8f87-dff933c60812.png` |
| Application preparation | `assets/images/topics/application-preparation.png` | `exec-03952db7-a1fd-4b5e-8419-5d064fd6ac63.png` |

Original generation directory: `/Users/seongjinkim/.codex/generated_images/019e87e9-5932-73b0-8f1e-0f45970b5ba3/`.

The artwork is used in five homepage topic links, three career-resource cards, four practical-guide cards, matching listing entries, seven article sidebars, and relevant guide-finder results. Existing generic icons in those illustrated homepage cards were replaced. Company profiles and country resources retain text/icons instead of invented corporate screenshots or destination photographs.

The visual catalog and page mapping live in `data/topic_visuals.yaml`. `layouts/partials/topic-image.html` generates 360px and 720px WebP versions using Hugo, with explicit dimensions, responsive sources, accessible descriptions, and the full 3:2 frame preserved. Generated web images are about 14-57 KiB each; the larger source PNGs are not served to visitors. Most images use lazy loading. Guide Finder deliberately loads its illustrations upfront so changing a choice does not initiate an image request that could disclose a selected topic through asset loading.

## Navigation and Search

- The homepage now identifies Jobplorer directly and offers five illustrated questions under "Follow your curiosity".
- Direct links to job-site comparison, career guides, country guides, and the guide finder remain available.
- Mobile uses a compact, labelled icon search button and a natively scrollable topic row. Keyboard focus can reach every topic.
- Search matches multiple words regardless of order, normalizes punctuation/diacritics, and includes explicit CV/first-job discovery terms. Non-Latin queries are preserved rather than accidentally becoming empty queries; this does not add translated content or translation-based search.
- A Practical Guides filter exposes the four rewritten guides separately.
- Empty search results provide recovery links and a clear-search action.
- Without JavaScript, direct topic/resource links remain usable, inactive search controls are hidden, and the mobile navigation sits in normal document flow instead of covering content.
- The existing main script is served through a content fingerprint to avoid relying on an old fixed query-string version. Its editable source remains `static/js/jobplorer.js`.

## Content, Privacy, and Trust

The nine reviewed profile/guide bodies and four rewritten article bodies were preserved. No slugs, canonicals, index directives, review dates, or sitemap routes were edited. The visible homepage H1 is now `Jobplorer`; page metadata was not rewritten. About now identifies the images as AI-generated editorial artwork, not actual employers, listings, people, or product screenshots.

No accounts, personal-data forms, persistence, or new analytics events were added. Search does not send raw query text in its event payload or place it in the URL during the JavaScript flow. Existing analytics configuration remains unchanged, including the exclusion on Guide Finder and Job Site Comparison. This is not a claim of zero hosting logs or zero analytics throughout the entire website.

## Validation

- Hugo production build and `--printPathWarnings` build passed: 1201 pages, 10 processed image variants, no duplicate/path warnings.
- `tests/topic-exploration.cjs` passed: five topic destinations, multiword/CV/diacritic search, Practical Guides filtering, empty-result recovery, raw-query exclusion, responsive image rendering and size budgets, 1440/1024/768/390/320px layouts, keyboard access to all topic tiles, no-JavaScript navigation, and no new persistence.
- `tests/resource-discovery.cjs` passed: all 72 guide combinations, no choice-triggered requests/storage/cookies, comparison profiles, links, reset/keyboard handling, mobile layouts, homepage search, tracker exclusion, and no-JavaScript fallback.
- `tests/article-reading.cjs` passed: all 13 reading pages retain original text blocks/links/heading IDs, valid outlines and next links, five viewport widths, short desktop height, native disclosure controls, and no-JavaScript behavior.
- Before/after sitemap URL sets are identical: 735 unique URLs, including 258 legacy article URLs excluding the archive index.
- `git diff --check` passed. Config, CNAME, themes, profile/guide content files, and posts were not edited. About contains only the illustration disclosure addition.

Evidence paths:

- Before build: `/tmp/jobplorer-visual-before`
- Production build: `/tmp/jobplorer-visual-build`
- Path-warning build: `/tmp/jobplorer-visual-pathwarnings`
- Screenshots: `/tmp/jobplorer-topic-qa`, `/tmp/jobplorer-visual-discovery-qa`, `/tmp/jobplorer-visual-reading-qa`
- Preview: http://localhost:1327/

The live development server needed a restart after changing the static script used by `resources.FromString`; a clean production build already contained the correct new script. Restart the preview after future edits to that source if its fingerprinted output appears stale.

## Generation Prompts

### Software Development

```text
Use case: illustration-story. Create one original editorial illustration for Jobplorer, an English-language job-search resource website, topic SOFTWARE DEVELOPMENT. Landscape 1536x1024. A thoughtfully arranged real-feeling software workbench: open laptop showing abstract colored code line blocks (no readable text), a second monitor with a clear modular system diagram made of rectangles and connecting lines, notebook with a few simple sketches, small desk lamp. No people, no personal data. Crisp hand-painted gouache / cut-paper collage hybrid with subtle paper texture and carefully designed flat geometric perspective, sophisticated magazine quality, welcoming and curious rather than corporate stock. Palette: clean cool off-white, cobalt blue, jade green, warm coral, small lemon-yellow accents, dark charcoal outlines. A pale light-blue flat backdrop. Even daylight, bright and legible, no blur. Main objects centered with generous breathing room on all sides, complete important objects inside central 75% for responsive 16:9 cropping. No text, letters, logos, company brands, watermarks, fake interface labels, random decorative orbs, gradients, or photorealism. This is a topic illustration, not a screenshot of a real product.
```

### Game Development

```text
Use case: illustration-story. Create one original editorial illustration for Jobplorer job-search resource website, topic GAME DEVELOPMENT. Landscape 1536x1024. Crisp hand-painted gouache and cut-paper collage style, sophisticated and playful editorial, subtle paper grain, matching a cohesive career illustration series. Show a clearly legible game-creation workbench: a widescreen monitor displaying a small imaginative isometric puzzle level made from platforms, bridges, and blue/coral/green blocks; a pen display with a level sketch, a stylus, a simple game controller, a small notebook of block diagrams. No people, no characters, no fantasy creatures. Do not show a branded game or any existing game IP. Cool off-white backdrop, cobalt blue and jade green with coral and lemon accents, charcoal line details. Bright even light; no blur or dark atmosphere. Frame complete objects with breathing room, balanced composition. No text, letters, numbers, logos, watermarks, fake job listings, gradients, floating orbs, or photorealism. This is an original topic illustration, not a real software screenshot.
```

### Remote Work

```text
Use case: illustration-story. One original editorial topic illustration for Jobplorer: REMOTE WORK. Landscape 1536x1024. A compact bright home workspace viewed at a gentle elevated angle: open laptop with three abstract video meeting tiles containing simple geometric avatar silhouettes (no identifiable people), headphones, a paper weekly planner with blank grid, two simple analog clocks, a notebook and a cup of tea. A window with a clear daytime sky, airy and practical not luxurious or travel-related. Crisp hand-painted gouache and cut-paper collage, subtle paper texture, confident geometric shapes, sophisticated magazine illustration. Palette dominated by pale mint and clean white with cobalt, jade, coral and small yellow details. Clear objects, legible silhouettes, no blur. Keep main objects comfortably within the frame, no busy microdetails. No text, letters, logos, numbers, brand marks, watermarks, gradient blobs, photos, or promises of working from anywhere. This is an illustrative work arrangement, not a real employer or product.
```

### AI in Recruitment

```text
Use case: illustration-story. One original editorial illustration for Jobplorer, topic UNDERSTANDING AI IN RECRUITMENT. Landscape 1536x1024. A tabletop research scene: a magnifying glass held above a stylized document with abstract horizontal lines, an open laptop showing a simple connected-node diagram and a small document tile, a few index cards, pencil, and a question-mark-shaped paperclip only if no text is necessary. Emphasize examining and questioning information, NOT an AI robot selecting candidates or judging people. No robots, no people, no ranking bars, no scores. Crisp gouache/cut-paper collage with tactile paper grain and confident geometric perspective, sophisticated friendly editorial style. A light lavender-gray flat backdrop (not purple dominant), cobalt blue, coral, jade and lemon accent objects with charcoal details. Bright even lighting, highly legible objects, no blur. Balanced composition with full main objects visible and room around edges. No readable words, letters, logos, brands, watermarks, gradients or decorative orbs. An illustrative concept, not a real product interface.
```

### Application Preparation

```text
Use case: illustration-story. One original editorial topic illustration for Jobplorer: PREPARING A JOB APPLICATION. Landscape 1536x1024. Overhead view of a purposeful desk, with one neatly organized application document represented only by abstract gray line blocks and a small abstract profile square, an open notebook of work-example sketches, a blue pencil, a checklist with a few checkmarks and empty boxes, two coral/green document folders, and a small desk calendar with blank cells. No real names or personal information, no scores, no acceptance letter. Hand-painted gouache and cut-paper collage with subtle paper grain, clean geometric forms, sophisticated playful magazine art. Pale sky-blue tabletop, clean off-white paper, cobalt blue, jade green, warm coral and lemon yellow accents. Bright even lighting, all main documents completely visible, calm balanced arrangement, no excessive accessories. No text, readable letters, brands, logos, watermarks, gradients, decoration orbs, photorealism, or outcome guarantees. This illustration should make careful preparation feel approachable.
```

## Remaining Risks and Next Step

The artwork and navigation are usability changes, not measured evidence of increased satisfaction, retention, organic traffic, or revenue. Chromium checks passed; real-device and assistive-technology coverage is not exhaustive. The source artwork adds about 13 MiB to the local project while only compressed derivatives are published by Hugo.

Review the local preview, then use a separately approved GitHub release with Cloudflare deployment and clean/cache-busted route verification. Include the pending reading-navigation files as dependencies; exclude unrelated tracker assets and reports. Compare later Search Console and page-level analytics data before making new content or SEO claims.
