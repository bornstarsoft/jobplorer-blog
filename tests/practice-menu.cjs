const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.JOBPLORER_TEST_URL || 'http://127.0.0.1:1328';
const origin = new URL(base).origin;
assert.ok(['127.0.0.1', 'localhost', 'jobplorer.com', 'jobplorer-blog.pages.dev'].includes(new URL(base).hostname));
const local = ['127.0.0.1', 'localhost'].includes(new URL(base).hostname);
const output = process.env.JOBPLORER_TEST_OUTPUT || '/tmp/jobplorer-practice-menu-qa';
const route = '/job-seeker-tools/';
const destinations = [
  '/job-seeker-tools/evidence-check/#posting-criteria',
  '/job-seeker-tools/evidence-check/#posting-criteria-second-look',
  '/job-seeker-tools/interview-practice/#improve-a-task',
  '/job-seeker-tools/interview-practice/#learn-from-a-mistake',
  '/job-seeker-tools/weekly-practice/#week-1',
  '/job-seeker-tools/weekly-practice/#challenge-1'
];

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const javascript of [true, false]) {
      const context = await browser.newContext({ javaScriptEnabled: javascript, reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 } });
      const external = [], errors = [];
      await context.route('**/*', r => {
        if (new URL(r.request().url()).origin === origin) return r.continue();
        external.push(new URL(r.request().url()).hostname);
        return r.abort();
      });
      await context.addInitScript(() => {
        window.storageCalls = [];
        for (const name of ['localStorage', 'sessionStorage', 'indexedDB', 'caches']) Object.defineProperty(window, name, { get() { window.storageCalls.push(name); throw new Error('Unexpected storage'); } });
      });
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      assert.equal((await page.goto(base + route)).status(), 200);
      const menu = page.locator('#practice-menu');
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await menu.locator('.jp-practice-option').count(), 3);
      assert.deepEqual(await menu.locator('a').evaluateAll(els => els.map(el => el.getAttribute('href'))), destinations);
      assert.deepEqual(await menu.locator('.jp-practice-time').allTextContents().then(xs => xs.map(x => x.trim())), ['About 2 min', 'About 5 min', 'About 5-10 min']);
      assert.equal(await menu.locator('input, textarea, form, button, [contenteditable]').count(), 0);
      assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 1, 'Existing Tools analytics tag unchanged');
      assert.equal(await page.locator('a[href*="application-tracker"]').count(), 0);
      assert.ok(await page.locator('a[href="/job-seeker-tools/guide-finder/"]').count());
      assert.ok(await page.locator('a[href="/job-seeker-tools/guide-finder/#practice-routes"]').count());
      const ids = await page.locator('[id]').evaluateAll(els => els.map(el => el.id));
      assert.equal(new Set(ids).size, ids.length);
      const menuBox = await menu.boundingBox();
      const firstResourceBox = await page.locator('#find-your-next-resource').boundingBox();
      assert.ok(menuBox.y < firstResourceBox.y, 'Menu precedes long reference content');
      for (const id of ['your-weekly-job-search-review', 'application-record-template', 'before-you-submit', 'interview-research-prompts', 'using-ai-to-organize-your-preparation']) assert.equal(await page.locator('#' + id).count(), 1);

      for (const width of [1440, 980, 760, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Overflow at ' + width);
        for (const option of await menu.locator('.jp-practice-option').all()) {
          const boxes = [];
          for (const item of await option.locator(':scope > div').all()) boxes.push(await item.boundingBox());
          for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
            const a = boxes[i], b = boxes[j];
            assert.ok(a.x + a.width <= b.x + 1 || b.x + b.width <= a.x + 1 || a.y + a.height <= b.y + 1 || b.y + b.height <= a.y + 1, 'Overlapping row columns');
          }
        }
        for (const a of await menu.locator('a').all()) assert.ok((await a.boundingBox()).height >= 44);
        if (javascript && [1440, 390].includes(width)) await page.screenshot({ path: path.join(output, 'menu-' + width + '.png'), fullPage: false });
      }
      await page.setViewportSize({ width: 1440, height: 1000 });
      for (const destination of destinations) {
        const a = menu.locator(`a[href="${destination}"]`);
        await a.focus();
        await page.keyboard.press('Enter');
        await page.waitForURL(base + destination);
        const anchor = destination.slice(destination.indexOf('#'));
        await page.locator(anchor).waitFor({ state: 'visible' });
        assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 0, 'Practice exclusions preserved');
        if (javascript) assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
        await page.goBack();
        await menu.waitFor({ state: 'visible' });
      }
      await page.goto(base + route + '#practice-menu');
      await page.reload();
      await menu.waitFor({ state: 'visible' });
      assert.equal(await menu.locator('a').count(), 6);
      if (javascript) assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
      assert.deepEqual(errors, []);
      assert.ok(external.every(host => ['www.googletagmanager.com', ...(local ? [] : ['static.cloudflareinsights.com'])].includes(host)), 'Unexpected external host');
      await context.close();
    }
    console.log('PASS: three practice choices/six real destinations, keyboard/back/no-JS, public menu anchor, preserved reference anchors/analytics boundaries, no saved selections, five widths and no overlapping row columns.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
