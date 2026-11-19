// Synthetic local QA. External services and persistent browser storage are blocked.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.JOBPLORER_TEST_URL || 'http://127.0.0.1:1327';
assert(['127.0.0.1', 'localhost'].includes(new URL(base).hostname));
const output = process.env.JOBPLORER_TEST_OUTPUT || '/tmp/jobplorer-reading-qa';
const baseline = process.env.JOBPLORER_BASELINE_BUILD;
const addedGuides = ['/guides/prepare-for-a-work-sample-task/'];
const reviewedGuides = [
  '/guides/check-job-offers-and-recruiters/', '/guides/prepare-for-an-interview/',
  '/guides/read-a-job-posting/', '/guides/build-a-project-case-study/',
  '/guides/write-a-focused-cover-letter/', '/guides/follow-up-after-an-interview/',
  '/guides/research-an-employer/', '/guides/use-ai-for-job-search-preparation/',
  '/guides/plan-an-informational-conversation/', '/guides/choose-what-to-learn-next/',
  '/guides/refine-your-job-search-terms/', ...addedGuides
];
const routes = [
  '/job-sites/sites/linkedin/', '/job-sites/sites/indeed/', '/job-sites/sites/glassdoor/',
  '/career-guides/software-developers/', '/career-guides/game-developers/', '/career-guides/remote-workers/',
  '/country-guides/united-states/', '/country-guides/south-korea/', '/country-guides/canada/',
  '/posts/the-rise-of-ai-in-recruitment/', '/posts/the-struggles-of-young-job-seekers/',
  '/posts/why-87-percent-of-job-seekers-abandon-their-resumes/', '/posts/ai-creators-future-game-development/',
  ...reviewedGuides
];

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 960 }, reducedMotion: 'reduce' });
    await context.route('**/*', r => new URL(r.request().url()).origin === new URL(base).origin ? r.continue() : r.abort());
    await context.addInitScript(() => {
      window.storageCalls = [];
      for (const key of ['localStorage', 'sessionStorage', 'indexedDB']) {
        Object.defineProperty(window, key, { get() { window.storageCalls.push(key); throw new Error('Unexpected storage access'); } });
      }
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const route of routes) {
      assert.equal((await page.goto(base + route)).status(), 200, route);
      assert.equal(await page.locator('.jp-page-outline').count(), 1, route);
      assert.equal(await page.locator('.jp-source-reminder').count(), 1, route);
      const headings = await page.locator('.jp-article-body > h2').evaluateAll(items => items.map(h => ({ id: h.id, title: h.textContent })));
      const links = await page.locator('.jp-page-outline a').evaluateAll(items => items.map(a => ({ id: decodeURIComponent(a.hash.slice(1)), title: a.textContent })));
      assert.deepEqual(links, headings, 'TOC must match actual content headings: ' + route);
      const invalid = await page.locator('.jp-page-outline a').evaluateAll(items => items.filter(a => !document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a => a.href));
      assert.deepEqual(invalid, []);
      const ids = await page.locator('[id]').evaluateAll(items => items.map(el => el.id));
      assert.equal(new Set(ids).size, ids.length, 'Duplicate ID: ' + route);
      const nextLinks = await page.locator('.jp-reading-next li a').evaluateAll(items => items.map(a => a.pathname));
      assert.deepEqual(nextLinks, ['/job-sites/', '/job-seeker-tools/guide-finder/']);
      for (const destination of nextLinks) assert.equal((await context.request.get(base + destination)).status(), 200);
      assert.equal(await page.locator('input, textarea, form').count(), 0);
      assert.deepEqual(await page.evaluate(() => window.storageCalls), []);

      if (baseline && !addedGuides.includes(route)) {
        const html = await fs.readFile(path.join(baseline, route, 'index.html'), 'utf8');
        const unchanged = await page.evaluate(before => {
          const old = new DOMParser().parseFromString(before, 'text/html').querySelector('.jp-article-body');
          old.querySelector('.jp-reading-next')?.remove();
          const current = document.querySelector('.jp-article-body').cloneNode(true);
          current.querySelector('.jp-reading-next').remove();
          const normalize = el => ({
            // Minification removes inter-block whitespace, not paragraph content.
            blocks: Array.from(el.querySelectorAll('h1, h2, h3, h4, p, li, pre, td, th'), block => [block.tagName, block.textContent.replace(/\s+/g, ' ').trim()]),
            links: Array.from(el.querySelectorAll('a'), a => a.getAttribute('href')),
            headings: Array.from(el.querySelectorAll('h2, h3'), h => [h.id, h.textContent])
          });
          return JSON.stringify(normalize(old)) === JSON.stringify(normalize(current));
        }, html);
        assert.equal(unchanged, true, 'Existing body/link/heading preservation: ' + route);
      }
    }

    for (const route of reviewedGuides) {
      await page.goto(base + route);
      assert.equal(await page.locator('h1').count(), 1);
      assert.match(await page.locator('.jp-article-meta').textContent(), /Reviewed 2026-09-22/);
      const sources = await page.locator('.jp-article-body a[href^="https://"]').evaluateAll(items => items.map(a => new URL(a.href).hostname));
      assert.ok(sources.length >= (reviewedGuides.slice(0, 2).includes(route) ? 3 : 2));
      assert.ok(sources.every(host => ['consumer.ftc.gov', 'nationalcareers.service.gov.uk', 'docs.github.com', 'careerservices.upenn.edu', 'careercenter.umich.edu', 'www.civil-service-careers.gov.uk', 'careers.ed.ac.uk', 'www.career.berkeley.edu', 'www.indeed.com'].includes(host)));
      const internal = await page.locator('.jp-article-body a[href^="/"]').evaluateAll(items => items.map(a => a.pathname));
      for (const destination of new Set(internal)) assert.equal((await context.request.get(base + destination)).status(), 200, destination);
      for (const width of [1440, 390, 320]) {
        await page.setViewportSize({ width, height: 960 });
        await page.goto(base + route);
        await page.locator('img.jp-topic-image').evaluate(el => el.decode());
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, route + width);
        await page.screenshot({ path: path.join(output, route.split('/')[2] + '-' + width + '.png'), fullPage: true });
      }
      assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    }
    for (const route of ['/', '/guides/', '/job-seeker-tools/']) {
      await page.goto(base + route);
      for (const destination of reviewedGuides) assert.ok(await page.locator('a[href="' + destination + '"]').count(), route + destination);
    }

    await page.goto(base + '/guides/write-a-focused-cover-letter/');
    assert.equal(await page.locator('.jp-article-body blockquote').count(), 1);
    assert.match(await page.locator('.jp-article-body blockquote').textContent(), /DOC-EXAMPLE/);
    assert.match(await page.locator('.jp-article-body').textContent(), /applicant and experience below are fictional/);
    assert.match(await page.locator('.jp-article-body').textContent(), /Remove placeholders/);

    await page.goto(base + '/guides/follow-up-after-an-interview/');
    assert.equal(await page.locator('.jp-article-body blockquote').count(), 2);
    assert.match(await page.locator('.jp-article-body').textContent(), /Both examples are invented/);
    assert.match(await page.locator('.jp-article-body').textContent(), /Replace the bracketed placeholders/);
    await page.getByRole('link', { name: 'weekly job search review', exact: true }).click();
    await page.locator('#your-weekly-job-search-review').waitFor({ state: 'attached' });
    assert.equal(new URL(page.url()).pathname, '/job-seeker-tools/');
    assert.equal(new URL(page.url()).hash, '#your-weekly-job-search-review');
    assert.equal(await page.locator('#your-weekly-job-search-review').count(), 1);

    await page.goto(base + '/guides/prepare-for-an-interview/#after-the-conversation');
    const debriefLink = page.getByRole('link', { name: 'the interview debrief', exact: true });
    await debriefLink.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(base + '/guides/follow-up-after-an-interview/#record-facts-before-interpreting-them');
    await page.locator('.jp-page-outline').getByRole('link', { name: 'Prepare for a Confirmed Next Round', exact: true }).click();
    await page.waitForURL(base + '/guides/follow-up-after-an-interview/#prepare-for-a-confirmed-next-round');
    const nextRound = page.locator('#prepare-for-a-confirmed-next-round');
    await nextRound.waitFor({ state: 'visible' });
    assert.match(await page.locator('#prepare-for-a-confirmed-next-round + p').textContent(), /possibility, not a booking/);
    assert.deepEqual(await page.locator('#prepare-for-a-confirmed-next-round + p + ul li > strong').allTextContents(), [
      'Keep:', 'Update:', 'Clarify:'
    ]);
    assert.match(await page.locator('#prepare-for-a-confirmed-next-round + p + ul + p').textContent(), /two-task example.*did not measure speed/);
    assert.equal(await page.locator('main :is(input, textarea, form, [contenteditable])').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Next-round overflow: ' + width);
      if (width !== 320) {
        await nextRound.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'interview-next-round-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'Recheck the invitation details', exact: true }).click();
    await page.waitForURL(base + '/guides/prepare-for-an-interview/#recheck-a-changed-interview-invitation');
    await page.goBack();
    await page.getByRole('link', { name: 'next weekly review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await page.setViewportSize({ width: 1440, height: 960 });

    await page.goto(base + '/guides/prepare-for-an-interview/#questions-that-make-the-role-clearer');
    const roleRecheckLink = page.getByRole('link', { name: 'compare the role details after the interview', exact: true });
    await roleRecheckLink.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(base + '/guides/follow-up-after-an-interview/#recheck-what-you-learned-about-the-role');
    const roleRecheck = page.locator('#recheck-what-you-learned-about-the-role');
    await roleRecheck.waitFor({ state: 'visible' });
    assert.deepEqual(await page.locator('#recheck-what-you-learned-about-the-role + p + ul li > strong').allTextContents(), [
      'Confirmed:', 'Different scope:', 'Still unclear:'
    ]);
    assert.match(await page.locator('#recheck-what-you-learned-about-the-role + p + ul + p').textContent(), /first-month support queue.*ongoing responsibility.*another team owns daily coverage/);
    assert.equal(await page.locator('main :is(input, textarea, form, [contenteditable])').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Role recheck overflow: ' + width);
      if (width !== 320) {
        await roleRecheck.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'role-detail-recheck-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'weekly role review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    const pickup = page.locator('#pick-up-where-you-left-off');
    const stageLinks = page.locator('#pick-up-where-you-left-off + p + ul');
    assert.deepEqual(await stageLinks.locator('li > strong').allTextContents(), [
      'Searching:', 'Preparing to apply:', 'Submitted:', 'Received an update:', 'After an interview:'
    ]);
    assert.deepEqual(await stageLinks.getByRole('link').evaluateAll(links => links.map(link => link.getAttribute('href'))), [
      '/guides/refine-your-job-search-terms/#compare-two-search-visits', '/guides/read-a-job-posting/#recheck-a-saved-posting',
      '#update-your-application-draft', '#before-you-submit', '#choose-the-next-application-action', '#act-on-an-application-reply',
      '/guides/follow-up-after-an-interview/#recheck-what-you-learned-about-the-role', '/guides/follow-up-after-an-interview/#prepare-for-a-confirmed-next-round'
    ]);
    assert.match(await page.locator('#pick-up-where-you-left-off + p + ul + p').textContent(), /Check the requested file first.*personal check date is not an employer deadline/i);
    const noteHeading = page.locator('#keep-one-note-for-next-time');
    const noteLink = page.getByRole('link', { name: 'Download weekly review note (.txt)', exact: true });
    const noteFile = 'jobplorer-weekly-review-note.txt';
    assert.equal(await noteLink.getAttribute('href'), '/downloads/' + noteFile);
    assert.equal(await noteLink.getAttribute('download'), noteFile);
    assert.match(await page.locator('#keep-one-note-for-next-time + p').textContent(), /no note is entered or uploaded to Jobplorer/);
    assert.equal(await page.locator('main :is(input, textarea, form, [contenteditable])').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Weekly shortcuts overflow: ' + width);
      if (width !== 320) {
        await pickup.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'weekly-review-shortcuts-' + width + '.png') });
        await noteHeading.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'weekly-review-note-' + width + '.png') });
      }
    }
    await stageLinks.getByRole('link', { name: 'Respond to an application reply', exact: true }).focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(base + '/job-seeker-tools/#act-on-an-application-reply');
    await page.getByRole('link', { name: 'return to the weekly review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await page.setViewportSize({ width: 1440, height: 960 });

    await page.goto(base + '/guides/research-an-employer/');
    assert.match(await page.locator('.jp-article-body').textContent(), /All three details below are invented/);
    assert.match(await page.locator('.jp-article-body').textContent(), /Do not convert missing information into a positive or negative score/);
    assert.equal(await page.getByRole('heading', { name: 'A Fictional Example: Different Pages, Different Scope', exact: true }).count(), 1);

    await page.goto(base + '/guides/use-ai-for-job-search-preparation/');
    assert.equal(await page.locator('.jp-article-body blockquote').count(), 5);
    assert.match(await page.locator('.jp-article-body').textContent(), /Both items below are invented/);
    assert.match(await page.locator('.jp-article-body').textContent(), /not output from a tested AI product/);
    assert.match(await page.locator('.jp-article-body').textContent(), /did not measure support requests/);
    assert.match(await page.locator('.jp-article-body').textContent(), /not a rule for every employer/);
    assert.match(await page.locator('.jp-article-body blockquote').nth(2).textContent(), /Do not write answers for the applicant/);

    await page.goto(base + '/guides/plan-an-informational-conversation/');
    assert.equal(await page.locator('.jp-article-body blockquote').count(), 2);
    assert.match(await page.locator('.jp-article-body').textContent(), /This is an invented request, not a message to a real person/);
    assert.match(await page.locator('.jp-article-body').textContent(), /This second example is also fictional/);
    assert.match(await page.locator('.jp-article-body').textContent(), /Do not add an automated recording or transcription service/);
    assert.match(await page.locator('.jp-article-body').textContent(), /fictional conversation note, not a claim about any real workplace/);
    assert.match(await page.locator('.jp-article-body blockquote').first().textContent(), /not a referral/);
    await page.getByRole('link', { name: 'weekly job search review', exact: true }).click();
    assert.equal(new URL(page.url()).pathname, '/job-seeker-tools/');
    assert.equal(new URL(page.url()).hash, '#your-weekly-job-search-review');
    assert.equal(await page.locator('#your-weekly-job-search-review').count(), 1);

    await page.goto(base + '/guides/choose-what-to-learn-next/');
    const records = await page.locator('#try-a-fictional-record-checking-exercise + p + ol > li').allTextContents();
    assert.deepEqual(records, ['DEMO-101: Setup note', 'DEMO-102: FAQ update', 'DEMO-102: FAQ update', '(blank): Link check', 'DEMO-103: Status note', 'DEMO-104: Search note']);
    const recordIDs = records.map(record => record.split(':')[0]);
    const repeatedRows = recordIDs.flatMap((id, index) => id !== '(blank)' && recordIDs.filter(other => other === id).length > 1 ? [index + 1] : []);
    assert.deepEqual(repeatedRows, [2, 3]);
    assert.deepEqual(recordIDs.flatMap((id, index) => id === '(blank)' ? [index + 1] : []), [4]);
    const workedResult = await page.locator('#compare-with-the-worked-result + ul').textContent();
    assert.match(workedResult, /Rows 2 and 3/);
    assert.match(workedResult, /Row 4: needs a missing-ID flag/);
    assert.match(await page.locator('.jp-article-body').textContent(), /All six records are invented/);
    assert.match(await page.locator('.jp-article-body').textContent(), /Preserve the original six rows/);
    assert.match(await page.locator('.jp-article-body').textContent(), /not an employer assessment or proof of a qualification/);
    await page.getByRole('link', { name: 'weekly job search review', exact: true }).click();
    await page.locator('#your-weekly-job-search-review').waitFor({ state: 'attached' });
    assert.equal(new URL(page.url()).hash, '#your-weekly-job-search-review');
    assert.equal(await page.locator('#your-weekly-job-search-review').count(), 1);

    await page.goto(base + '/guides/refine-your-job-search-terms/');
    assert.deepEqual(await page.locator('#make-a-small-search-plan + p + ol code').allTextContents(), ['support', 'technical support', 'product support']);
    assert.deepEqual(await page.locator('#compare-descriptions-not-similar-sounding-titles + p + ol strong').allTextContents(), ['Support Specialist:', 'Technical Support Analyst:', 'Customer Success Associate:']);
    const searchBody = await page.locator('.jp-article-body').textContent();
    assert.match(searchBody, /hypothetical trials, not searches that Jobplorer has run or measured/);
    assert.match(searchBody, /All three snippets below are invented/);
    assert.match(searchBody, /not a controlled experiment on a search algorithm/);
    assert.match(searchBody, /do not treat these invented titles as a fixed classification/);
    assert.deepEqual(await page.locator('#notes-for-the-next-visit + ul strong').allTextContents(), ['Keep:', 'Change:', 'Check:']);
    assert.deepEqual(await page.locator('#two-visit-search-log + p + ul strong').allTextContents(), ['Work I want to find:', 'Visit 1:', 'Visit 2:', 'Next action:']);
    assert.equal(await page.locator('.jp-article-body [contenteditable]').count(), 0);
    assert.match(searchBody, /Do not count the repeated posting as a second opening/);
    const arrangementLink = page.getByRole('link', { name: 'recheck the work arrangement', exact: true });
    await arrangementLink.focus();
    await page.keyboard.press('Enter');
    const arrangementRoute = '/career-guides/remote-workers/#recheck-a-remote-or-hybrid-arrangement';
    await page.waitForURL(base + arrangementRoute);
    const arrangementHeading = page.locator('#recheck-a-remote-or-hybrid-arrangement');
    await arrangementHeading.waitFor({ state: 'visible' });
    const arrangementChecks = page.locator('#recheck-a-remote-or-hybrid-arrangement + p + ul');
    assert.deepEqual(await arrangementChecks.locator('li > strong').allTextContents(), ['Work location:', 'Attendance:', 'Shared hours:']);
    assert.match(await page.locator('#recheck-a-remote-or-hybrid-arrangement + p + ul + p').textContent(), /DEMO-R09.*one meeting per month.*Update the attendance note only.*location and shared hours unknown/);
    assert.equal(await page.locator('main :is(input, textarea, form, [contenteditable])').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Work-arrangement recheck overflow: ' + width);
      if (width !== 320) {
        await arrangementHeading.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'work-arrangement-recheck-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'weekly work-arrangement review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await page.goto(base + '/guides/refine-your-job-search-terms/');
    await page.getByRole('link', { name: 'weekly job search review', exact: true }).click();
    assert.equal(new URL(page.url()).pathname, '/job-seeker-tools/');
    assert.equal(new URL(page.url()).hash, '#your-weekly-job-search-review');
    assert.equal(await page.locator('#your-weekly-job-search-review').count(), 1);
    await page.getByRole('link', { name: 'Compare two search visits', exact: true }).focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(base + '/guides/refine-your-job-search-terms/#compare-two-search-visits');
    await page.locator('#compare-two-search-visits').waitFor({ state: 'visible' });
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Search review overflow: ' + width);
      if (width !== 320) {
        await page.locator('#two-visit-search-log').evaluate(el => el.scrollIntoView());
        await page.screenshot({ path: path.join(output, 'search-review-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'next weekly review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');

    const shortlistLink = page.getByRole('link', { name: 'compare two saved roles', exact: true });
    await shortlistLink.focus();
    await page.keyboard.press('Enter');
    const shortlistRoute = '/guides/read-a-job-posting/#practice-with-two-saved-roles';
    await page.waitForURL(base + shortlistRoute);
    const shortlist = page.locator('#practice-with-two-saved-roles');
    await shortlist.waitFor({ state: 'visible' });
    assert.deepEqual(await page.locator('#practice-with-two-saved-roles + p + ul li > strong').allTextContents(), [
      'DEMO-411: Draft today.', 'DEMO-412: Verify before drafting.'
    ]);
    assert.match(await page.locator('#practice-with-two-saved-roles + p + ul + p').textContent(), /DEMO-412.*weekday daytime hours.*role is still open.*prepare one example/);
    assert.equal(await page.locator('main :is(input, textarea, form, [contenteditable])').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Saved role comparison overflow: ' + width);
      if (width !== 320) {
        await shortlist.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'saved-role-comparison-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'weekly shortlist review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');

    await page.goto(base + shortlistRoute);
    const adaptLink = page.getByRole('link', { name: 'adapt one example for the new role', exact: true });
    await adaptLink.focus();
    await page.keyboard.press('Enter');
    const adaptRoute = '/guides/write-a-focused-cover-letter/#adapt-one-example-for-another-role';
    await page.waitForURL(base + adaptRoute);
    const adaptHeading = page.locator('#adapt-one-example-for-another-role');
    await adaptHeading.waitFor({ state: 'visible' });
    const exampleChoices = page.locator('#adapt-one-example-for-another-role + p + p + ul');
    assert.deepEqual(await exampleChoices.locator('li > strong').allTextContents(), [
      'For a role focused on clear instructions:', 'For a role focused on finding documentation gaps:'
    ]);
    assert.match(await exampleChoices.locator('li').first().textContent(), /revised it after a teammate tried the steps/);
    assert.match(await exampleChoices.locator('li').last().textContent(), /environment setting was missing/);
    assert.match(await page.locator('#adapt-one-example-for-another-role + p + p + ul + p').textContent(), /Neither version supports.*built the prototype.*resolved a customer incident.*measured/);
    assert.equal(await page.locator('main :is(input, textarea, form, [contenteditable])').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Application evidence overflow: ' + width);
      if (width !== 320) {
        await adaptHeading.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'adapt-application-evidence-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'the final letter check', exact: true }).click();
    await page.waitForURL(base + '/guides/write-a-focused-cover-letter/#before-sending');
    await page.getByRole('link', { name: 'weekly application review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');

    await page.goto(base + adaptRoute);
    const gapLink = page.getByRole('link', { name: 'decide what is worth practising', exact: true });
    await gapLink.focus();
    await page.keyboard.press('Enter');
    const gapRoute = '/guides/choose-what-to-learn-next/#decide-what-is-worth-practising';
    await page.waitForURL(base + gapRoute);
    const gapHeading = page.locator('#decide-what-is-worth-practising');
    await gapHeading.waitFor({ state: 'visible' });
    const gapChoices = page.locator('#decide-what-is-worth-practising + p + ul');
    assert.deepEqual(await gapChoices.locator('li > strong').allTextContents(), [
      'I have done the work, but my example is vague:', 'I understand the task, but cannot do one step yet:', 'I cannot tell what the role asks for:'
    ]);
    assert.match(await page.locator('#decide-what-is-worth-practising + p + ul + p').textContent(), /not a third role.*flag both rows/);
    assert.match(await page.locator('#decide-what-is-worth-practising + p + ul + p + p').textContent(), /flag every row.*not proof/);
    assert.equal(await page.locator('main :is(input, textarea, form, [contenteditable])').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Practice gap overflow: ' + width);
      if (width !== 320) {
        await gapHeading.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'choose-practice-gap-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'fictional record check', exact: true }).click();
    await page.waitForURL(base + '/guides/choose-what-to-learn-next/#try-a-fictional-record-checking-exercise');
    const evidenceLink = page.getByRole('link', { name: 'turn the checked result into an evidence note', exact: true });
    await evidenceLink.focus();
    await page.keyboard.press('Enter');
    const checkedEvidenceRoute = '/guides/build-a-project-case-study/#make-one-practice-result-verifiable';
    await page.waitForURL(base + checkedEvidenceRoute);
    const evidenceHeading = page.locator('#make-one-practice-result-verifiable');
    await evidenceHeading.waitFor({ state: 'visible' });
    const evidenceItems = page.locator('#make-one-practice-result-verifiable + p + p + ul li');
    assert.deepEqual(await evidenceItems.locator('strong').allTextContents(), ['Original check:', 'Changed copy:', 'Limit:']);
    assert.match(await evidenceItems.nth(0).textContent(), /rows 2 and 3 for a repeated ID and row 4 for a missing ID/);
    assert.match(await evidenceItems.nth(1).textContent(), /DEMO-105.*Row 4 was still flagged.*neither row 2 nor row 3/);
    assert.match(await evidenceItems.nth(2).textContent(), /Did not repair real records, automate the check, or test a larger list/);
    assert.match(await page.locator('#make-one-practice-result-verifiable + p').textContent(), /record the difference instead of copying the expected result/);
    assert.equal(await page.locator('main :is(input, textarea, form, [contenteditable])').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Checked evidence overflow: ' + width);
      if (width !== 320) {
        await evidenceHeading.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'checked-practice-evidence-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'sharing checklist', exact: true }).click();
    await page.waitForURL(base + '/guides/build-a-project-case-study/#a-quick-review-before-sharing');
    await page.getByRole('link', { name: 'weekly evidence review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await page.goto(base + gapRoute);
    await page.getByRole('link', { name: 'weekly learning review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');

    const postingRecheck = page.getByRole('link', { name: 'Recheck a saved posting', exact: true });
    await postingRecheck.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(base + '/guides/read-a-job-posting/#recheck-a-saved-posting');
    await page.locator('#recheck-a-saved-posting').waitFor({ state: 'visible' });
    assert.deepEqual(await page.locator('#a-fictional-recheck + p + ul strong').allTextContents(), [
      'Same role, updated instructions:', 'Same title, different reference:', 'Original no longer visible:'
    ]);
    assert.match(await page.locator('#a-fictional-recheck + p + ul').textContent(), /not found on recheck/);
    assert.equal(await page.locator('.jp-article-body input, .jp-article-body textarea, .jp-article-body form, .jp-article-body [contenteditable]').count(), 0);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Posting recheck overflow: ' + width);
      if (width !== 320) {
        await page.locator('#recheck-a-saved-posting').evaluate(el => el.scrollIntoView());
        await page.screenshot({ path: path.join(output, 'posting-recheck-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'next weekly review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');

    await page.getByRole('link', { name: 'Recheck a saved posting', exact: true }).click();
    const draftLink = page.getByRole('link', { name: 'update your application draft', exact: true });
    await draftLink.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(base + '/job-seeker-tools/#update-your-application-draft');
    const draftHeading = page.locator('#update-your-application-draft');
    await draftHeading.waitFor({ state: 'visible' });
    const draftActions = page.locator('#update-your-application-draft + p + p + ul');
    assert.deepEqual(await draftActions.locator('strong').allTextContents(), ['Keep:', 'Prepare:', 'Verify before sending:']);
    assert.match(await draftActions.textContent(), /Do not assume a public link is accepted/);
    assert.equal(await page.locator('main input, main textarea, main form, main [contenteditable]').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Application prep overflow: ' + width);
      if (width !== 320) {
        await draftHeading.evaluate(el => el.scrollIntoView());
        await page.screenshot({ path: path.join(output, 'application-handoff-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'final submission checklist', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#before-you-submit');
    await page.locator('#before-you-submit').waitFor({ state: 'visible' });
    assert.deepEqual(await page.locator('#before-you-submit + p + ol strong').allTextContents(), [
      'Match the destination.', 'Open the actual files.', 'Review what will be sent.'
    ]);
    assert.match(await page.locator('#final-check-a-fictional-example + p').textContent(), /PDF attachment.*not a submission confirmation/);
    assert.deepEqual(await page.locator('#pick-up-at-your-next-review + p + ul strong').allTextContents(), [
      'Not sent yet:', 'Sent:'
    ]);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Final check overflow: ' + width);
      if (width !== 320) {
        await page.locator('#before-you-submit').evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'submission-check-' + width + '.png') });
      }
    }
    const portfolioLink = page.getByRole('link', { name: 'Recheck the portfolio version and access', exact: true });
    await portfolioLink.focus();
    await page.keyboard.press('Enter');
    const portfolioRecheckRoute = '/guides/build-a-project-case-study/#recheck-a-portfolio-link-before-reuse';
    await page.waitForURL(base + portfolioRecheckRoute);
    const portfolioHeading = page.locator('#recheck-a-portfolio-link-before-reuse');
    await portfolioHeading.waitFor({ state: 'visible' });
    const portfolioChecks = page.locator('#recheck-a-portfolio-link-before-reuse + p + ul li');
    assert.deepEqual(await portfolioChecks.locator('strong').allTextContents(), ['Version:', 'Access:', 'If either check fails:']);
    assert.match(await portfolioChecks.nth(1).textContent(), /meant to open without an account.*signed-out browser.*without making private material public/);
    assert.match(await portfolioChecks.nth(2).textContent(), /leave the link out or use an alternative the employer accepts/);
    assert.match(await page.locator('#recheck-a-portfolio-link-before-reuse + p + ul + p').textContent(), /older clip only shows the finished level.*narrow the claim/);
    assert.equal(await page.locator('main :is(input, textarea, form, [contenteditable])').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Portfolio link recheck overflow: ' + width);
      if (width !== 320) {
        await portfolioHeading.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'portfolio-link-recheck-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'final submission checklist', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#before-you-submit');
    await page.getByRole('link', { name: 'weekly job search review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    assert.equal(await page.getByRole('link', { name: 'Review application receipts', exact: true }).getAttribute('href'), '#confirm-application-receipt');
    await page.getByRole('link', { name: 'final submission checklist', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#before-you-submit');
    await page.getByRole('link', { name: 'Check whether it was received', exact: true }).focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(base + '/job-seeker-tools/#confirm-application-receipt');
    const receiptHeading = page.locator('#confirm-application-receipt');
    await receiptHeading.waitFor({ state: 'visible' });
    assert.deepEqual(await page.locator('#confirm-application-receipt + p + ul strong').allTextContents(), [
      'Receipt confirmed:', 'Receipt not confirmed:', 'Action requested:'
    ]);
    assert.match(await page.locator('#carry-one-note-into-next-week + p').textContent(), /receipt unconfirmed.*Receipt confirmed.*no next step stated/);
    assert.equal(await page.locator('main input, main textarea, main form, main [contenteditable]').count(), 0);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Receipt review overflow: ' + width);
      if (width !== 320) {
        await receiptHeading.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'receipt-review-' + width + '.png') });
      }
    }
    const correctionLink = page.getByRole('link', { name: 'check whether a correction is needed', exact: true });
    await correctionLink.focus();
    await page.keyboard.press('Enter');
    const correctionURL = base + '/job-seeker-tools/#check-a-problem-after-submission';
    await page.waitForURL(correctionURL);
    const correctionHeading = page.locator('#check-a-problem-after-submission');
    await correctionHeading.waitFor({ state: 'visible' });
    const correctionChoices = page.locator('#check-a-problem-after-submission + p + ul li');
    assert.deepEqual(await correctionChoices.locator('strong').allTextContents(), [
      'You cannot tell what was sent:', 'A material problem is confirmed:', 'The detail still means the same thing:'
    ]);
    assert.match(await correctionChoices.nth(0).textContent(), /Do not submit a duplicate just to test/);
    assert.match(await correctionChoices.nth(1).textContent(), /whether a correction is accepted before sending another file or application/);
    assert.match(await page.locator('#check-a-problem-after-submission + p + ul + p').textContent(), /DEMO-204.*original application receipt alone does not confirm the replacement/);
    assert.equal(await page.locator('main :is(input, textarea, form, [contenteditable])').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Submission correction overflow: ' + width);
      if (width !== 320) {
        await correctionHeading.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'submission-correction-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'weekly correction review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await page.getByRole('link', { name: 'Review application receipts', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#confirm-application-receipt');
    await page.getByRole('link', { name: 'next weekly job search review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    const nextActionLink = page.getByRole('link', { name: 'Choose the next action for each open application', exact: true });
    await nextActionLink.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(base + '/job-seeker-tools/#choose-the-next-application-action');
    const nextActionHeading = page.locator('#choose-the-next-application-action');
    await nextActionHeading.waitFor({ state: 'visible' });
    assert.deepEqual(await page.locator('#choose-the-next-application-action + p + ul > li > strong').allTextContents(), [
      'Receipt unconfirmed:', 'Additional request:', 'Waiting for a reply:'
    ]);
    assert.deepEqual(await page.locator('#choose-the-next-application-action + p + ul + p + ul > li > strong').allTextContents(), [
      'DEMO-301:', 'DEMO-302:', 'DEMO-204:'
    ]);
    await page.getByRole('link', { name: 'Check the requested item, format and destination', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#before-you-submit');
    await page.goBack();
    await page.waitForURL(base + '/job-seeker-tools/#choose-the-next-application-action');
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Weekly application review overflow: ' + width);
      if (width !== 320) {
        await nextActionHeading.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'weekly-application-review-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'Review application receipts', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#confirm-application-receipt');
    await page.getByRole('link', { name: 'check the files and submission details', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#before-you-submit');
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    const replyLink = page.getByRole('link', { name: 'choose what to do with the reply', exact: true });
    await replyLink.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(base + '/job-seeker-tools/#act-on-an-application-reply');
    const replyHeading = page.locator('#act-on-an-application-reply');
    await replyHeading.waitFor({ state: 'visible' });
    const replyActions = page.locator('#act-on-an-application-reply + p + ul');
    assert.deepEqual(await replyActions.locator('li > strong').allTextContents(), [
      'Interview invitation:', 'Additional materials requested:', 'Process closed for this application:'
    ]);
    assert.match(await replyActions.locator('li').last().textContent(), /move it out of your active list/);
    assert.match(await page.locator('#act-on-an-application-reply + p + ul + p').textContent(), /DEMO-204.*not booked/);
    assert.equal(await page.locator('main input, main textarea, main form, main [contenteditable]').count(), 0);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Reply review overflow: ' + width);
      if (width !== 320) {
        await replyHeading.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'application-reply-review-' + width + '.png') });
      }
    }
    await replyActions.getByRole('link', { name: 'prepare for the interview', exact: true }).click();
    await page.waitForURL(base + '/guides/prepare-for-an-interview/#start-with-the-posting');
    await page.locator('#start-with-the-posting').waitFor({ state: 'visible' });
    await page.goBack();
    await page.waitForURL(base + '/job-seeker-tools/#act-on-an-application-reply');
    const changedContactLink = page.getByRole('link', { name: 'verify the changed route', exact: true });
    await changedContactLink.focus();
    await page.keyboard.press('Enter');
    const changedContactRoute = '/guides/check-job-offers-and-recruiters/#recheck-a-changed-contact-or-submission-link';
    await page.waitForURL(base + changedContactRoute);
    const contactHeading = page.locator('#recheck-a-changed-contact-or-submission-link');
    await contactHeading.waitFor({ state: 'visible' });
    const contactActions = page.locator('#recheck-a-changed-contact-or-submission-link + p + ul');
    assert.deepEqual(await contactActions.locator('li > strong').allTextContents(), ['Change confirmed:', 'Change not confirmed:', 'Change contradicted:']);
    assert.match(await contactActions.locator('li').nth(1).textContent(), /Do not use the new link to log in or upload/);
    assert.match(await page.locator('#recheck-a-changed-contact-or-submission-link + p + ul + p').textContent(), /DEMO-204.*application received \/ new upload route unconfirmed.*do not assume the text link was confirmed/);
    assert.equal(await page.locator('#recheck-a-changed-contact-or-submission-link + p a').getAttribute('href'), 'https://consumer.ftc.gov/consumer-alerts/2023/12/how-spot-latest-job-scams');
    assert.equal(await page.locator('main :is(input, textarea, form, [contenteditable])').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Changed contact overflow: ' + width);
      if (width !== 320) {
        await contactHeading.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'changed-contact-recheck-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'next weekly contact check', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await page.goto(base + '/job-seeker-tools/#act-on-an-application-reply');
    const inviteRecheckLink = page.getByRole('link', { name: 'recheck what changed before rehearsing', exact: true });
    await inviteRecheckLink.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(base + '/guides/prepare-for-an-interview/#recheck-a-changed-interview-invitation');
    const inviteRecheck = page.locator('#recheck-a-changed-interview-invitation');
    await inviteRecheck.waitFor({ state: 'visible' });
    assert.deepEqual(await page.locator('#recheck-a-changed-interview-invitation + p + ul li > strong').allTextContents(), [
      'Only the time or joining details changed:', 'The format or preparation changed:', 'Nothing changed:'
    ]);
    assert.match(await page.locator('#recheck-a-changed-interview-invitation + p + ul + p').textContent(), /DEMO-204.*14:00 UTC.*project walkthrough/);
    assert.equal(await page.locator('main input, main textarea, main form, main [contenteditable]').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Invite recheck overflow: ' + width);
      if (width !== 320) {
        await inviteRecheck.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'interview-invite-recheck-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'the small-improvement practice prompt', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/interview-practice/#improve-a-task');
    await page.locator('#improve-a-task').waitFor({ state: 'visible' });
    await page.goBack();
    await page.getByRole('link', { name: 'weekly interview check', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await page.getByRole('link', { name: 'check the work sample brief', exact: true }).click();
    await page.waitForURL(base + '/guides/prepare-for-a-work-sample-task/#read-the-brief-before-starting');
    await page.locator('#read-the-brief-before-starting').waitFor({ state: 'visible' });

    await page.goto(base + addedGuides[0]);
    const taskFacts = await page.locator('#given-facts + ol > li').allTextContents();
    assert.deepEqual(taskFacts, ['Open the demo workspace.', 'Inside the workspace, choose Examples.', 'In Examples, choose Try sample.', 'Reset removes changes made in the demo.', 'The supplied information does not describe a save option.']);
    assert.deepEqual(await page.locator('#one-possible-response + ol > li').allTextContents(), ['Open the demo workspace.', 'Choose Examples.', 'Choose Try sample.']);
    assert.equal(await page.locator('.jp-article-body blockquote').count(), 2);
    assert.match(await page.locator('#one-possible-response + ol + p').textContent(), /Reset caution: Reset removes changes made in the demo/);
    assert.match(await page.locator('#one-possible-response + ol + p + p').textContent(), /Question: Can sample changes be saved before using Reset\?/);
    const taskBody = await page.locator('.jp-article-body').textContent();
    assert.match(taskBody, /Everything in this exercise is invented/);
    assert.match(taskBody, /email sign-in and automatic-saving claims are not supplied/);
    assert.match(taskBody, /claim that Reset keeps edits contradicts the facts/);
    assert.match(taskBody, /practise separately with fictional material rather than uploading the employer['\u2019]s brief to an AI service/);
    await page.getByRole('link', { name: 'weekly job search review', exact: true }).click();
    assert.equal(new URL(page.url()).pathname, '/job-seeker-tools/');
    assert.equal(new URL(page.url()).hash, '#your-weekly-job-search-review');
    assert.equal(await page.locator('#your-weekly-job-search-review').count(), 1);

    const feedbackLink = page.getByRole('link', { name: 'Turn work sample feedback into one practice task', exact: true });
    await feedbackLink.focus();
    await page.keyboard.press('Enter');
    await page.waitForURL(base + addedGuides[0] + '#turn-work-sample-feedback-into-one-practice-task');
    const feedbackHeading = page.locator('#turn-work-sample-feedback-into-one-practice-task');
    const feedbackChoices = page.locator('#turn-work-sample-feedback-into-one-practice-task + p + ul');
    assert.deepEqual(await feedbackChoices.locator('li > strong').allTextContents(), [
      'Specific feedback:', 'General or no feedback:', 'Explicit revision request:'
    ]);
    assert.match(await feedbackChoices.locator('li').nth(1).textContent(), /your own observation, not a reason/);
    assert.match(await page.locator('#turn-work-sample-feedback-into-one-practice-task + p + ul + p').textContent(), /Move the existing caution above the steps.*does not establish that a save feature exists/);
    assert.equal(await page.locator('main :is(input, textarea, form, [contenteditable])').count(), 0);
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Work sample feedback overflow: ' + width);
      if (width !== 320) {
        await feedbackHeading.evaluate(el => el.scrollIntoView({ block: 'start' }));
        await page.screenshot({ path: path.join(output, 'work-sample-feedback-' + width + '.png') });
      }
    }
    await page.getByRole('link', { name: 'given facts', exact: true }).click();
    await page.waitForURL(base + addedGuides[0] + '#given-facts');
    await page.goBack();
    await page.getByRole('link', { name: 'next weekly practice review', exact: true }).click();
    await page.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');

    const sample = '/career-guides/remote-workers/';
    for (const width of [1440, 980, 979, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      await page.goto(base + sample);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Overflow at ' + width);
      const toc = await page.locator('.jp-page-outline').boundingBox();
      const body = await page.locator('.jp-article-body').boundingBox();
      const reminder = await page.locator('.jp-source-reminder').boundingBox();
      if (width < 980) {
        assert.ok(toc.y + toc.height <= body.y, 'Mobile TOC precedes body');
        assert.ok(body.y + body.height <= reminder.y, 'Mobile reminder follows body');
      } else assert.ok(body.x + body.width <= toc.x, 'Desktop columns do not overlap');

      const summary = page.locator('.jp-page-outline summary');
      await summary.focus();
      await page.keyboard.press('Enter');
      assert.equal(await page.locator('.jp-page-outline').getAttribute('open'), null);
      await page.keyboard.press('Space');
      assert.notEqual(await page.locator('.jp-page-outline').getAttribute('open'), null);
      const target = await page.locator('.jp-page-outline a').nth(1).getAttribute('href');
      await page.locator('.jp-page-outline a').nth(1).click();
      assert.equal(new URL(page.url()).hash, target);
      await page.waitForFunction(id => {
        const bounds = document.getElementById(id).getBoundingClientRect();
        return bounds.top >= 0 && bounds.top < innerHeight;
      }, target.slice(1));
      await page.getByRole('link', { name: 'Back to top', exact: true }).click();
      assert.equal(new URL(page.url()).hash, '#jp-article-title');
      await page.waitForFunction(() => document.getElementById('jp-article-title').getBoundingClientRect().top < innerHeight);
      await page.goto(base + sample);
      await page.screenshot({ path: path.join(output, 'reading-' + width + '.png'), fullPage: true });
    }

    // Long titles/TOCs and short desktop heights must keep every link reachable.
    await page.setViewportSize({ width: 1280, height: 540 });
    await page.goto(base + routes[9]);
    await page.locator('.jp-page-outline a').last().click();
    await page.getByRole('link', { name: 'Back to top', exact: true }).click();
    await page.screenshot({ path: path.join(output, 'reading-short-desktop.png') });
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(base + routes[12]);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.locator('.jp-page-outline a').last().click();

    for (const route of ['/privacy/', '/about/', '/contact/', '/posts/youth-employment-crisis/']) {
      assert.equal((await page.goto(base + route)).status(), 200);
      assert.equal(await page.locator('.jp-page-outline, .jp-reading-next').count(), 0, 'Unrelated page unchanged: ' + route);
    }
    assert.equal((await context.request.get(base + '/job-seeker-tools/application-tracker/')).status(), 404);
    assert.deepEqual(errors, []);
    assert.equal((await context.cookies()).length, 0);
    await context.close();

    const plainContext = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 960 } });
    await plainContext.route('**/*', r => new URL(r.request().url()).origin === new URL(base).origin ? r.continue() : r.abort());
    const plain = await plainContext.newPage();
    for (const route of reviewedGuides) {
      await plain.goto(base + route);
      await plain.locator('.jp-page-outline a').last().click();
      assert.equal(new URL(plain.url()).hash, '#sources-and-review-scope');
    }
    await plain.goto(base + sample);
    await plain.locator('.jp-page-outline summary').click();
    assert.equal(await plain.locator('.jp-page-outline a:visible').count(), 0);
    await plain.locator('.jp-page-outline summary').click();
    await plain.locator('.jp-page-outline a').last().click();
    assert.equal(new URL(plain.url()).hash, '#scope-and-limitations');
    await plain.locator('.jp-reading-next li a').first().click();
    assert.equal(new URL(plain.url()).pathname, '/job-sites/');
    await plain.goto(base + '/job-seeker-tools/#your-weekly-job-search-review');
    const offlineNote = plain.getByRole('link', { name: 'Download weekly review note (.txt)', exact: true });
    await offlineNote.focus();
    const pendingNote = plain.waitForEvent('download');
    await plain.keyboard.press('Enter');
    const note = await pendingNote;
    assert.equal(note.suggestedFilename(), noteFile);
    const noteText = await fs.readFile(await note.path(), 'utf8');
    assert.equal(noteText, await fs.readFile(path.join(__dirname, '..', 'static', 'downloads', noteFile), 'utf8'));
    assert.match(noteText, /^TODAY\nLast confirmed status and where I checked:\nOne next action:\n/m);
    assert.match(noteText, /^NEXT REVIEW\nWhat changed, if anything:\nAction done, still pending, or replaced:\n/m);
    assert.match(noteText, /FICTIONAL EXAMPLE[\s\S]*The check is done;\nthe application is still pending/);
    const returnURL = new URL(noteText.trim().split('\n').at(-1));
    assert.equal(returnURL.origin, 'https://jobplorer.com');
    await plain.goto(base + returnURL.pathname + returnURL.hash);
    await plain.locator(returnURL.hash).waitFor({ state: 'visible' });
    await plain.getByRole('link', { name: 'Check the final files', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#before-you-submit');
    await plain.getByRole('link', { name: 'weekly job search review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.getByRole('link', { name: 'Prepare for a confirmed next round', exact: true }).click();
    await plain.waitForURL(base + '/guides/follow-up-after-an-interview/#prepare-for-a-confirmed-next-round');
    await plain.getByRole('link', { name: 'next weekly review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.getByRole('link', { name: 'Compare two search visits', exact: true }).click();
    await plain.waitForURL(base + '/guides/refine-your-job-search-terms/#compare-two-search-visits');
    await plain.getByRole('link', { name: 'recheck the work arrangement', exact: true }).click();
    await plain.waitForURL(base + arrangementRoute);
    await plain.getByRole('link', { name: 'weekly work-arrangement review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.goBack();
    await plain.goBack();
    await plain.waitForURL(base + '/guides/refine-your-job-search-terms/#compare-two-search-visits');
    await plain.getByRole('link', { name: 'next weekly review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.getByRole('link', { name: 'compare two saved roles', exact: true }).click();
    await plain.waitForURL(base + shortlistRoute);
    await plain.getByRole('link', { name: 'saved-posting recheck', exact: true }).click();
    await plain.waitForURL(base + '/guides/read-a-job-posting/#recheck-a-saved-posting');
    await plain.goBack();
    await plain.getByRole('link', { name: 'weekly shortlist review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.getByRole('link', { name: 'compare two saved roles', exact: true }).click();
    await plain.waitForURL(base + shortlistRoute);
    await plain.getByRole('link', { name: 'adapt one example for the new role', exact: true }).click();
    await plain.waitForURL(base + adaptRoute);
    await plain.getByRole('link', { name: 'weekly application review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.goto(base + adaptRoute);
    await plain.getByRole('link', { name: 'decide what is worth practising', exact: true }).click();
    await plain.waitForURL(base + gapRoute);
    await plain.getByRole('link', { name: 'fictional record check', exact: true }).click();
    await plain.waitForURL(base + '/guides/choose-what-to-learn-next/#try-a-fictional-record-checking-exercise');
    await plain.getByRole('link', { name: 'turn the checked result into an evidence note', exact: true }).click();
    await plain.waitForURL(base + checkedEvidenceRoute);
    await plain.getByRole('link', { name: 'record-checking exercise', exact: true }).click();
    await plain.waitForURL(base + '/guides/choose-what-to-learn-next/#try-a-fictional-record-checking-exercise');
    await plain.goBack();
    await plain.getByRole('link', { name: 'weekly evidence review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.goto(base + gapRoute);
    await plain.getByRole('link', { name: 'weekly learning review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.getByRole('link', { name: 'Recheck a saved posting', exact: true }).click();
    await plain.waitForURL(base + '/guides/read-a-job-posting/#recheck-a-saved-posting');
    await plain.getByRole('link', { name: 'update your application draft', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#update-your-application-draft');
    await plain.getByRole('link', { name: 'final submission checklist', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#before-you-submit');
    await plain.getByRole('link', { name: 'Check whether it was received', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#confirm-application-receipt');
    await plain.getByRole('link', { name: 'next weekly job search review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.getByRole('link', { name: 'Choose the next action for each open application', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#choose-the-next-application-action');
    await plain.getByRole('link', { name: 'choose what to do with the reply', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#act-on-an-application-reply');
    await plain.getByRole('link', { name: 'Run the final file check', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#before-you-submit');
    await plain.goBack();
    await plain.waitForURL(base + '/job-seeker-tools/#act-on-an-application-reply');
    await plain.getByRole('link', { name: 'verify the changed route', exact: true }).click();
    await plain.waitForURL(base + changedContactRoute);
    await plain.getByRole('link', { name: 'what to do when something does not add up', exact: true }).click();
    await plain.waitForURL(base + '/guides/check-job-offers-and-recruiters/#when-something-still-does-not-add-up');
    await plain.getByRole('link', { name: 'next weekly contact check', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.goto(base + '/job-seeker-tools/#act-on-an-application-reply');
    await plain.getByRole('link', { name: 'recheck what changed before rehearsing', exact: true }).click();
    await plain.waitForURL(base + '/guides/prepare-for-an-interview/#recheck-a-changed-interview-invitation');
    await plain.getByRole('link', { name: 'check the video instructions', exact: true }).click();
    await plain.waitForURL(base + '/guides/prepare-for-an-interview/#check-the-video-setup');
    await plain.getByRole('link', { name: 'weekly interview check', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.goto(base + '/guides/prepare-for-an-interview/#after-the-conversation');
    await plain.getByRole('link', { name: 'the interview debrief', exact: true }).click();
    await plain.waitForURL(base + '/guides/follow-up-after-an-interview/#record-facts-before-interpreting-them');
    await plain.locator('.jp-page-outline').getByRole('link', { name: 'Prepare for a Confirmed Next Round', exact: true }).click();
    await plain.waitForURL(base + '/guides/follow-up-after-an-interview/#prepare-for-a-confirmed-next-round');
    await plain.getByRole('link', { name: 'next weekly review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.goto(base + '/guides/prepare-for-an-interview/#questions-that-make-the-role-clearer');
    await plain.getByRole('link', { name: 'compare the role details after the interview', exact: true }).click();
    await plain.waitForURL(base + '/guides/follow-up-after-an-interview/#recheck-what-you-learned-about-the-role');
    await plain.getByRole('link', { name: 'weekly role review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.goto(base + '/job-seeker-tools/#act-on-an-application-reply');
    await plain.getByRole('link', { name: 'return to the weekly review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.getByRole('link', { name: 'Review application receipts', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#confirm-application-receipt');
    await plain.getByRole('link', { name: 'check whether a correction is needed', exact: true }).click();
    await plain.waitForURL(correctionURL);
    await plain.getByRole('link', { name: 'Verify the replacement', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#before-you-submit');
    await plain.goBack();
    await plain.getByRole('link', { name: 'weekly correction review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.getByRole('link', { name: 'Review application receipts', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#confirm-application-receipt');
    await plain.getByRole('link', { name: 'choose the next action', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#choose-the-next-application-action');
    await plain.getByRole('link', { name: 'Review application receipts', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#confirm-application-receipt');
    await plain.getByRole('link', { name: 'check the files and submission details', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#before-you-submit');
    await plain.getByRole('link', { name: 'Recheck the portfolio version and access', exact: true }).click();
    await plain.waitForURL(base + portfolioRecheckRoute);
    await plain.getByRole('link', { name: 'weekly portfolio review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.getByRole('link', { name: 'Check the final files', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#before-you-submit');
    await plain.getByRole('link', { name: 'application draft review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#update-your-application-draft');
    await plain.getByRole('link', { name: 'next weekly review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plain.getByRole('link', { name: 'recheck the posting', exact: true }).click();
    await plain.waitForURL(base + '/guides/read-a-job-posting/#recheck-a-saved-posting');
    await plain.goto(base + '/job-seeker-tools/#interview-research-prompts');
    await plain.getByRole('link', { name: 'Turn work sample feedback into one practice task', exact: true }).click();
    await plain.waitForURL(base + addedGuides[0] + '#turn-work-sample-feedback-into-one-practice-task');
    await plain.getByRole('link', { name: 'check it before sending', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#before-you-submit');
    await plain.goBack();
    await plain.getByRole('link', { name: 'next weekly practice review', exact: true }).click();
    await plain.waitForURL(base + '/job-seeker-tools/#your-weekly-job-search-review');
    await plainContext.close();
    console.log('PASS: 25 article outlines, existing body preservation, twelve practical guide sources/internal links/images, fictional examples and weekly-review anchors, employer-research scope, AI output checks, career-conversation privacy, learning exercise records and worked result, search trials and fictional posting snippets, work-sample brief/facts/response consistency, landing-page discoverability, 5 viewport widths, keyboard and no-JS navigation, small-screen/short-height reachability, no new inputs/storage, unrelated-page and tracker exclusion.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
