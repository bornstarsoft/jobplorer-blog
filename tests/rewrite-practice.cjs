const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.JOBPLORER_TEST_URL || 'http://127.0.0.1:1328';
const origin = new URL(base).origin;
const local = ['localhost', '127.0.0.1'].includes(new URL(base).hostname);
assert.ok(local || ['jobplorer.com', 'jobplorer-blog.pages.dev'].includes(new URL(base).hostname));
const output = process.env.JOBPLORER_TEST_OUTPUT || '/tmp/jobplorer-rewrite-practice-qa';
const route = '/guides/use-ai-for-job-search-preparation/';
const ids = ['practice-preferences', 'practice-proposed-results'];

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const javascript of [true, false]) {
      const context = await browser.newContext({ javaScriptEnabled: javascript, acceptDownloads: true, viewport: { width: 1440, height: 1000 } });
      const external = [], errors = [], requests = [];
      await context.route('**/*', r => {
        if (new URL(r.request().url()).origin === origin) return r.continue();
        external.push(new URL(r.request().url()).hostname);
        return r.abort();
      });
      await context.addInitScript(() => {
        window.privacyCalls = [];
        for (const key of ['localStorage', 'sessionStorage', 'indexedDB', 'caches']) Object.defineProperty(window, key, { get() { window.privacyCalls.push(key); throw new Error('Unexpected storage'); } });
        window.fetch = () => { window.privacyCalls.push('fetch'); throw new Error('Unexpected fetch'); };
        navigator.sendBeacon = () => { window.privacyCalls.push('beacon'); return false; };
      });
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      page.on('request', r => requests.push(r.url()));
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.locator('.jp-topic-image').evaluate(img => img.decode());
      const exercises = page.locator('.jp-rewrite-practice');
      assert.equal(await exercises.locator('section').count(), 2);
      assert.equal(await exercises.locator('details').count(), 2);
      assert.equal(await page.locator('input, textarea, form, [contenteditable]').count(), 0);
      assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 1, 'Existing guide analytics unchanged');
      assert.equal(await page.locator('.jp-article-body blockquote').count(), 5, 'Original examples preserved');
      const allIds = await page.locator('[id]').evaluateAll(els => els.map(el => el.id));
      assert.equal(new Set(allIds).size, allIds.length);
      assert.ok(await page.locator('.jp-page-outline a[href="#two-short-rewrite-reviews"]').count());
      const packResponse = await context.request.get(base + '/downloads/jobplorer-rewrite-review-practice.txt');
      assert.equal(packResponse.status(), 200);
      const pack = await packResponse.text();
      assert.equal((pack.match(/^EXERCISE:/gm) || []).length, 2);
      assert.ok(pack.includes('not outputs from a tested AI product'));
      for (const text of await exercises.locator('section p').allTextContents()) assert.ok(pack.includes(text), 'HTML/download parity');
      const baseline = requests.length;
      for (const [index, id] of ids.entries()) {
        const section = page.locator('#' + id);
        await exercises.locator(`nav a[href="#${id}"]`).focus();
        await page.keyboard.press('Enter');
        assert.equal(new URL(page.url()).hash, '#' + id);
        const detail = section.locator('details');
        assert.equal(await detail.evaluate(el => el.open), false);
        await detail.locator('summary').focus();
        await page.keyboard.press('Enter');
        assert.equal(await detail.evaluate(el => el.open), true);
        assert.deepEqual(await detail.locator('h4').allTextContents(), ['One possible response', 'Why', 'Another try']);
        for (const p of await detail.locator('p').all()) assert.ok(await p.isVisible());
        const next = section.locator('.jp-rewrite-links a').last();
        assert.equal(await next.getAttribute('href'), '#' + ids[(index + 1) % ids.length]);
        await next.focus();
        await page.keyboard.press('Enter');
        await page.waitForURL(base + route + '#' + ids[(index + 1) % ids.length]);
        await page.goBack();
        await page.waitForURL(base + route + '#' + id);
        assert.ok(pack.includes('https://jobplorer.com' + route + '#' + id));
      }
      assert.equal(requests.length, baseline, 'Disclosures and public anchors send no requests');
      if (javascript) assert.deepEqual(await page.evaluate(() => window.privacyCalls), []);
      for (const width of [1440, 980, 760, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Overflow at ' + width);
        for (const a of await exercises.locator('a').all()) assert.ok((await a.boundingBox()).height >= 44);
        if (javascript && [1440, 390].includes(width)) await exercises.screenshot({ path: path.join(output, 'reviews-' + width + '.png') });
      }
      const pending = page.waitForEvent('download');
      await exercises.locator('a[download]').click();
      const download = await pending;
      assert.equal(download.suggestedFilename(), 'jobplorer-rewrite-review-practice.txt');
      const saved = path.join(output, 'pack-' + javascript + '.txt');
      await download.saveAs(saved);
      assert.equal(await fs.readFile(saved, 'utf8'), pack);
      for (const id of ids) {
        await page.goto(base + route + '#' + id);
        await page.reload();
        assert.ok(await page.locator('#' + id).isVisible());
        assert.equal(await exercises.locator('details[open]').count(), 0);
      }
      assert.ok(external.every(host => ['www.googletagmanager.com', ...(local ? [] : ['static.cloudflareinsights.com'])].includes(host)));
      assert.deepEqual(errors, []);
      await context.close();
    }
    console.log('PASS: two fictional review exercises, keyboard/no-JS/deep links/reload/next-visit history, exact text download, original examples/analytics, five widths, no input/storage/action requests.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
