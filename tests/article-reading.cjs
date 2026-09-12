// Synthetic local QA. External services and persistent browser storage are blocked.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.JOBPLORER_TEST_URL || 'http://127.0.0.1:1327';
assert(['127.0.0.1', 'localhost'].includes(new URL(base).hostname));
const output = process.env.JOBPLORER_TEST_OUTPUT || '/tmp/jobplorer-reading-qa';
const baseline = process.env.JOBPLORER_BASELINE_BUILD;
const routes = [
  '/job-sites/sites/linkedin/', '/job-sites/sites/indeed/', '/job-sites/sites/glassdoor/',
  '/career-guides/software-developers/', '/career-guides/game-developers/', '/career-guides/remote-workers/',
  '/country-guides/united-states/', '/country-guides/south-korea/', '/country-guides/canada/',
  '/posts/the-rise-of-ai-in-recruitment/', '/posts/the-struggles-of-young-job-seekers/',
  '/posts/why-87-percent-of-job-seekers-abandon-their-resumes/', '/posts/ai-creators-future-game-development/'
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

      if (baseline) {
        const html = await fs.readFile(path.join(baseline, route, 'index.html'), 'utf8');
        const unchanged = await page.evaluate(before => {
          const old = new DOMParser().parseFromString(before, 'text/html').querySelector('.jp-article-body');
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
    await plain.goto(base + sample);
    await plain.locator('.jp-page-outline summary').click();
    assert.equal(await plain.locator('.jp-page-outline a:visible').count(), 0);
    await plain.locator('.jp-page-outline summary').click();
    await plain.locator('.jp-page-outline a').last().click();
    assert.equal(new URL(plain.url()).hash, '#scope-and-limitations');
    await plain.locator('.jp-reading-next li a').first().click();
    assert.equal(new URL(plain.url()).pathname, '/job-sites/');
    await plainContext.close();
    console.log('PASS: 13 article outlines and body preservation, valid heading/next links, 5 viewport widths, keyboard and no-JS navigation, small-screen/short-height reachability, no new inputs/storage, unrelated-page and tracker exclusion.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
