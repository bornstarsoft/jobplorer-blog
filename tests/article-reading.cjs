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
    await page.getByRole('link', { name: 'weekly job search review', exact: true }).click();
    assert.equal(new URL(page.url()).pathname, '/job-seeker-tools/');
    assert.equal(new URL(page.url()).hash, '#your-weekly-job-search-review');
    assert.equal(await page.locator('#your-weekly-job-search-review').count(), 1);

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
    await plainContext.close();
    console.log('PASS: 25 article outlines, existing body preservation, twelve practical guide sources/internal links/images, fictional examples and weekly-review anchors, employer-research scope, AI output checks, career-conversation privacy, learning exercise records and worked result, search trials and fictional posting snippets, work-sample brief/facts/response consistency, landing-page discoverability, 5 viewport widths, keyboard and no-JS navigation, small-screen/short-height reachability, no new inputs/storage, unrelated-page and tracker exclusion.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
