const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.JOBPLORER_TEST_URL || 'http://127.0.0.1:1328';
const origin = new URL(base).origin;
const local = ['127.0.0.1', 'localhost'].includes(new URL(base).hostname);
assert(local || ['jobplorer.com', 'jobplorer-blog.pages.dev'].includes(new URL(base).hostname));
const output = process.env.JOBPLORER_TEST_OUTPUT || '/tmp/jobplorer-evidence-qa';
const route = '/job-seeker-tools/evidence-check/';

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
      await page.locator('.jp-topic-image').evaluate(el => el.decode());
      assert.equal(await page.locator('h1').textContent(), 'Two-Minute Evidence Check');
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), local ? base + route : 'https://jobplorer.com' + route);
      assert.equal(await page.locator('input, textarea, form, [contenteditable]').count(), 0);
      assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 0);
      assert.equal(await page.locator('.jp-evidence-check').count(), 4);
      assert.equal(await page.locator('.jp-evidence-statement').count(), 12);
      const ids = await page.locator('[id]').evaluateAll(els => els.map(el => el.id));
      assert.equal(new Set(ids).size, ids.length);
      const packResponse = await context.request.get(base + '/downloads/jobplorer-evidence-check.txt');
      assert.equal(packResponse.status(), 200);
      const pack = await packResponse.text();
      assert.equal((pack.match(/^SITUATION:/gm) || []).length, 4);
      assert.equal((pack.match(/^STATEMENT:/gm) || []).length, 12);
      assert.equal((pack.match(/^ANOTHER VISIT$/gm) || []).length, 4);
      for (const text of await page.locator('.jp-evidence-check h2, .jp-evidence-work li, .jp-evidence-statement summary, .jp-evidence-statement h4, .jp-evidence-statement p, .jp-evidence-return > p').allTextContents()) assert.ok(pack.includes(text), 'HTML/download parity: ' + text);
      const baseline = requests.length;
      for (const check of await page.locator('.jp-evidence-check').all()) {
        const findings = await check.locator('h4').allTextContents();
        assert.equal(findings.filter(x => x === 'Supported by the supplied facts').length, 1);
        assert.equal(findings.filter(x => x === 'Not supported by the supplied facts').length, 2);
        for (const detail of await check.locator('details').all()) {
          await detail.locator('summary').focus();
          await page.keyboard.press('Enter');
          assert.equal(await detail.evaluate(el => el.open), true);
          assert.ok(await detail.locator('p').isVisible());
          await page.keyboard.press('Enter');
          assert.equal(await detail.evaluate(el => el.open), false);
        }
      }
      for (const link of await page.locator('.jp-evidence-nav a').all()) {
        const href = await link.getAttribute('href');
        await link.click();
        assert.equal(new URL(page.url()).hash, href);
        assert.ok(await page.locator(href).isVisible());
      }
      assert.equal(requests.length, baseline, 'Native disclosures and anchors send no requests');
      if (javascript) assert.deepEqual(await page.evaluate(() => window.privacyCalls), []);
      if (local) { assert.deepEqual(external, []); assert.equal((await context.cookies()).length, 0); }
      else assert.ok(external.every(host => host === 'static.cloudflareinsights.com'));

      const finderResponse = await context.request.get(base + '/job-seeker-tools/guide-finder/');
      assert.equal(finderResponse.status(), 200);
      const finder = await finderResponse.text();
      for (const href of await page.locator('.jp-evidence-return a[href^="/"]').evaluateAll(els => els.map(el => el.getAttribute('href')))) {
        assert.ok(pack.includes('https://jobplorer.com' + href));
        assert.match(finder, new RegExp('id=["\']?' + href.split('#')[1] + '["\'\\s>]'));
      }
      await page.locator('.jp-evidence-statement summary').first().click();
      for (const width of [1440, 980, 760, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow ${width}`);
        if (javascript && [1440, 390].includes(width)) await page.locator('.jp-evidence-check').first().screenshot({ path: path.join(output, 'evidence-' + width + '.png') });
      }
      const pending = page.waitForEvent('download');
      await page.locator('a[download]').click();
      const download = await pending;
      assert.equal(download.suggestedFilename(), 'jobplorer-evidence-check.txt');
      const saved = path.join(output, `evidence-${javascript}.txt`);
      await download.saveAs(saved);
      assert.equal(await fs.readFile(saved, 'utf8'), pack);
      await page.goto(base + route + '#project-evidence');
      await page.reload();
      assert.equal(await page.locator('details[open]').count(), 0);
      assert.ok(await page.locator('#project-evidence').isVisible());
      await page.locator('#project-evidence a[href*="guide-finder"]').click();
      await page.locator('#route-experience').waitFor({ state: 'visible' });
      if (javascript) await page.waitForFunction(() => document.getElementById('route-experience').open);
      await page.goBack();
      await page.locator('#project-evidence').waitFor({ state: 'visible' });
      for (const source of ['/job-seeker-tools/', '/job-seeker-tools/guide-finder/']) {
        const result = await context.request.get(base + source);
        assert.equal(result.status(), 200);
        assert.ok((await result.text()).includes(route), 'Missing discovery: ' + source);
      }
      assert.deepEqual(errors, []);
      await context.close();
    }
    console.log('PASS: four situations/12 explanations, one supported statement each, keyboard/no-JS/anchors/return route, no saved state or action requests, download parity, five widths and discovery.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
