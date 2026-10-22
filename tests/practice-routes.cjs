const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.JOBPLORER_TEST_URL || 'http://127.0.0.1:1328';
const origin = new URL(base).origin;
const local = ['127.0.0.1', 'localhost'].includes(new URL(base).hostname);
assert(local || ['jobplorer.com', 'jobplorer-blog.pages.dev'].includes(new URL(base).hostname));
const output = process.env.JOBPLORER_TEST_OUTPUT || '/tmp/jobplorer-routes-qa';
const route = '/job-seeker-tools/guide-finder/';
const ids = ['posting', 'experience', 'questions', 'task-brief'];

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const javascript of [true, false]) {
      const context = await browser.newContext({ javaScriptEnabled: javascript, reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
      const external = [], errors = [], requests = [];
      await context.route('**/*', r => {
        if (new URL(r.request().url()).origin === origin) return r.continue();
        external.push(new URL(r.request().url()).hostname);
        return r.abort();
      });
      await context.addInitScript(() => {
        window.privacyCalls = [];
        for (const name of ['localStorage', 'sessionStorage', 'indexedDB', 'caches']) Object.defineProperty(window, name, { get() { window.privacyCalls.push(name); throw new Error('Unexpected storage'); } });
        Object.defineProperty(document, 'cookie', { get() { window.privacyCalls.push('cookie'); return ''; }, set() { window.privacyCalls.push('cookie'); } });
        window.fetch = () => { window.privacyCalls.push('fetch'); throw new Error('Unexpected fetch'); };
        navigator.sendBeacon = () => { window.privacyCalls.push('beacon'); return false; };
      });
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      page.on('request', r => requests.push(r.url()));
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.locator('.jp-topic-image').evaluateAll(imgs => Promise.all(imgs.map(img => img.decode())));
      assert.equal(await page.locator('input, textarea, form, [contenteditable]').count(), 0);
      assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 0);
      assert.equal(await page.locator('.jp-practice-route').count(), 4);
      assert.equal(await page.locator('.jp-practice-route ol li').count(), 12);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), local ? base + route : 'https://jobplorer.com' + route);
      const packResponse = await context.request.get(base + '/downloads/jobplorer-practice-routes.txt');
      assert.equal(packResponse.status(), 200);
      const pack = await packResponse.text();
      assert.equal((pack.match(/^ROUTE:/gm) || []).length, 4);
      assert.equal((pack.match(/^NEXT VISIT$/gm) || []).length, 4);
      for (const text of await page.locator('.jp-practice-route summary, .jp-practice-route li p, .jp-route-next').allTextContents()) assert.ok(pack.includes(text), 'Download parity');
      const count = requests.length;
      for (const id of ids) {
        const detail = page.locator('#route-' + id);
        await detail.locator('summary').focus();
        await page.keyboard.press('Enter');
        assert.equal(await detail.evaluate(el => el.open), true);
        await page.keyboard.press('Enter');
        assert.equal(await detail.evaluate(el => el.open), false);
      }
      if (javascript) {
        await page.locator('#guide-goal').selectOption('weekly');
        assert.equal(await page.locator('.jp-guide-result:visible').count(), 3);
        assert.equal(page.url(), base + route);
        assert.deepEqual(await page.evaluate(() => window.privacyCalls), []);
      } else assert.equal(await page.locator('.jp-guide-controls').isVisible(), false);
      assert.equal(requests.length, count, 'Disclosure and filters make no requests');
      if (local) { assert.deepEqual(external, []); assert.equal((await context.cookies()).length, 0); }
      else assert.ok(external.every(host => host === 'static.cloudflareinsights.com'));

      const destinations = await page.locator('.jp-practice-route li a').evaluateAll(els => els.map(el => el.getAttribute('href')));
      const documents = new Map();
      for (const destination of destinations) {
        assert.ok(pack.includes('https://jobplorer.com' + destination));
        const [pathname, anchor] = destination.split('#');
        if (!documents.has(pathname)) {
          const result = await context.request.get(base + pathname);
          assert.equal(result.status(), 200);
          documents.set(pathname, await result.text());
        }
        assert.match(documents.get(pathname), new RegExp('id=["\']?' + anchor + '["\'\\s>]'), destination);
      }
      for (const id of ids) {
        await page.goto(base + route + '#route-' + id);
        if (javascript) {
          await page.waitForFunction(id => document.getElementById('route-' + id).open, id);
          assert.equal(await page.locator('.jp-guide-result:visible').count(), 3);
        }
      }
      await page.goto(base + route);
      await page.reload();
      assert.equal(await page.locator('.jp-practice-route[open]').count(), 0, 'No saved progress');
      await page.locator('#route-experience summary').click();
      await page.locator('#route-experience .jp-route-link').click();
      assert.equal(new URL(page.url()).hash, '#route-experience');
      await page.locator('#route-experience li a').first().click();
      assert.equal(new URL(page.url()).hash, '#week-2');
      assert.ok(await page.locator('#week-2').isVisible());
      await page.goBack();
      if (javascript) await page.waitForFunction(() => document.getElementById('route-experience').open);
      const detail = page.locator('#route-experience');
      if (!(await detail.evaluate(el => el.open))) await detail.locator('summary').click();
      for (const width of [1440, 980, 760, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow ${width}`);
        if (javascript && [1440, 390].includes(width)) await page.locator('#practice-routes').screenshot({ path: path.join(output, 'routes-' + width + '.png') });
      }
      const pending = page.waitForEvent('download');
      await page.locator('a[download]').click();
      const download = await pending;
      assert.equal(download.suggestedFilename(), 'jobplorer-practice-routes.txt');
      const saved = path.join(output, `routes-${javascript}.txt`);
      await download.saveAs(saved);
      assert.equal(await fs.readFile(saved, 'utf8'), pack);
      if (javascript) assert.deepEqual(await page.evaluate(() => window.privacyCalls), []);
      assert.deepEqual(errors, []);
      await context.close();
    }
    console.log('PASS: four routes/12 destinations, working anchors, keyboard/no-JS, public deep links and back navigation, no saved state/requests, exact download, five widths.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
