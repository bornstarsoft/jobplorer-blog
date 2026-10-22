const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.JOBPLORER_TEST_URL || 'http://127.0.0.1:1328';
const origin = new URL(base).origin;
const local = ['localhost', '127.0.0.1'].includes(new URL(base).hostname);
assert.ok(local || ['jobplorer.com', 'jobplorer-blog.pages.dev'].includes(new URL(base).hostname));
const output = process.env.JOBPLORER_TEST_OUTPUT || '/tmp/jobplorer-practice-finder-qa';
const route = '/job-seeker-tools/guide-finder/';
const choices = [
  ['weekly', '/job-seeker-tools/weekly-practice/', 'challenge-1', null],
  ['evidence-practice', '/job-seeker-tools/evidence-check/', 'posting-criteria-second-look', 'posting-criteria'],
  ['interview-practice', '/job-seeker-tools/interview-practice/', 'learn-from-a-mistake', 'improve-a-task']
];

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const javascript of [true, false]) {
      const context = await browser.newContext({ javaScriptEnabled: javascript, viewport: { width: 1440, height: 1000 } });
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
      assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 0);
      assert.equal(await page.locator('input, textarea, form, [contenteditable]').count(), 0);
      assert.equal(await page.locator('#guide-goal option').count(), 20);
      for (const [value, destination, nextAnchor, firstAnchor] of choices) {
        if (javascript) await page.locator('#guide-goal').selectOption(value);
        const result = page.locator(`[data-guide-value="${value}"][data-guide-group="goal"]`);
        await result.waitFor({ state: 'visible' });
        assert.equal(await result.locator('h3 a').getAttribute('href'), destination + (firstAnchor ? '#' + firstAnchor : ''));
        assert.equal(await result.locator('.jp-guide-next').getAttribute('href'), destination + '#' + nextAnchor);
        if (firstAnchor) {
          assert.equal(await result.locator('img').count(), 1);
          await result.locator('img').evaluate(img => img.decode());
        }
        for (const width of [1440, 980, 760, 390, 320]) {
          await page.setViewportSize({ width, height: 1000 });
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
          const box = await result.boundingBox();
          for (const a of await result.locator('a').all()) {
            const link = await a.boundingBox();
            assert.ok(link.x >= box.x - 1 && link.x + link.width <= box.x + box.width + 1, 'Link outside result');
          }
          if (javascript && firstAnchor && [1440, 390].includes(width)) {
            await page.evaluate(() => scrollTo(0, 0));
            await page.screenshot({ path: path.join(output, value + '-' + width + '.png'), fullPage: false });
            await result.screenshot({ path: path.join(output, value + '-result-' + width + '.png') });
          }
        }
        for (const selector of ['h3 a', '.jp-guide-next']) {
          if (javascript) await page.locator('#guide-goal').selectOption(value);
          const a = result.locator(selector);
          const href = await a.getAttribute('href');
          await a.focus();
          await page.keyboard.press('Enter');
          await page.waitForURL(base + href);
          if (href.includes('#')) await page.locator('#' + href.split('#')[1]).waitFor({ state: 'visible' });
          assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 0);
          if (javascript) assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
          await page.goBack();
          await page.locator('#jp-guide-finder').waitFor({ state: 'visible' });
        }
      }
      if (javascript) {
        await page.locator('#guide-reset').click();
        assert.equal(await page.locator('#guide-goal').inputValue(), 'start');
        assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
      } else assert.equal(await page.locator('.jp-guide-result:visible').count(), 27);
      assert.deepEqual(errors, []);
      assert.ok(external.every(host => !local && host === 'static.cloudflareinsights.com'), 'Unexpected external request');
      if (local) assert.equal((await context.cookies()).length, 0);
      await context.close();
    }
    console.log('PASS: three practice choices/six first-and-next links, keyboard/back/no-JS, real anchors, image decoding, five widths, reset, no application storage or GA4.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
