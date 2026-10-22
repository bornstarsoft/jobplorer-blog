const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.JOBPLORER_TEST_URL || 'http://127.0.0.1:1328';
const origin = new URL(base).origin;
const local = ['127.0.0.1', 'localhost'].includes(new URL(base).hostname);
assert(local || ['jobplorer.com', 'jobplorer-blog.pages.dev'].includes(new URL(base).hostname));
const output = process.env.JOBPLORER_TEST_OUTPUT || '/tmp/jobplorer-interview-qa';
const route = '/job-seeker-tools/interview-practice/';
const ids = ['improve-a-task', 'learn-from-a-mistake', 'explain-a-disagreement', 'hand-over-work', 'clarify-priorities', 'clarify-feedback'];

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
        for (const key of ['localStorage', 'sessionStorage', 'indexedDB', 'caches']) Object.defineProperty(window, key, { get() { window.privacyCalls.push(key); throw new Error('Unexpected persistence'); } });
        Object.defineProperty(document, 'cookie', { get() { window.privacyCalls.push('cookie'); return ''; }, set() { window.privacyCalls.push('cookie'); } });
        window.fetch = () => { window.privacyCalls.push('fetch'); throw new Error('Unexpected fetch'); };
        navigator.sendBeacon = () => { window.privacyCalls.push('beacon'); return false; };
        if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia = () => { window.privacyCalls.push('microphone'); throw new Error('Unexpected media access'); };
      });
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      page.on('request', r => requests.push(r.url()));
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.locator('img.jp-topic-image').evaluate(el => el.decode());
      assert.equal(await page.locator('h1').textContent(), 'Five-Minute Interview Practice');
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), local ? base + route : 'https://jobplorer.com' + route);
      assert.equal(await page.locator('.jp-interview-prompt').count(), 6);
      assert.equal(await page.locator('input, textarea, form, [contenteditable]').count(), 0);
      assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 0);
      const allIds = await page.locator('[id]').evaluateAll(els => els.map(el => el.id));
      assert.equal(new Set(allIds).size, allIds.length);
      const packResponse = await context.request.get(base + '/downloads/jobplorer-interview-practice.txt');
      assert.equal(packResponse.status(), 200);
      const pack = await packResponse.text();
      assert.equal((pack.match(/^QUESTION:/gm) || []).length, 6);
      for (const text of await page.locator('.jp-interview-context, .jp-interview-task, .jp-interview-followup, .jp-interview-response p, .jp-interview-response li').allTextContents()) assert.ok(pack.includes(text), 'HTML/download parity');
      const baseline = requests.length;
      if (javascript) {
        assert.equal(await page.locator('.jp-interview-prompt:visible').count(), 1);
        await page.getByRole('button', { name: 'Next question', exact: true }).click();
        await page.goBack();
        await page.waitForFunction(() => !document.getElementById('improve-a-task').hidden);
        for (const [topic, expected] of [['experience', ids.slice(0, 2)], ['collaboration', ids.slice(2, 4)], ['questions', ids.slice(4, 6)], ['all', ids]]) {
          await page.getByLabel('Practice focus').selectOption(topic);
          for (let i = 0; i < expected.length; i++) {
            const card = page.locator('.jp-interview-prompt:visible');
            assert.equal(await card.getAttribute('id'), expected[i]);
            assert.equal(await page.locator('#interview-position').textContent(), `Question ${i + 1} of ${expected.length}`);
            await card.locator('summary').focus();
            await page.keyboard.press('Enter');
            assert.equal(await card.locator('details[open]').count(), 1);
            await page.getByRole('button', { name: 'Next question', exact: true }).click();
          }
          assert.equal(await page.locator('.jp-interview-prompt:visible').getAttribute('id'), expected[0]);
          assert.equal(await page.locator('.jp-interview-response[open]').count(), 0);
          await page.getByRole('button', { name: 'Previous question', exact: true }).click();
          assert.equal(await page.locator('.jp-interview-prompt:visible').getAttribute('id'), expected.at(-1));
          assert.equal(await page.locator(':focus').getAttribute('id'), 'title-' + expected.at(-1));
        }
        // A library link outside the selected topic resets the filter coherently.
        await page.getByLabel('Practice focus').selectOption('experience');
        await page.locator('.jp-interview-library summary').click();
        await page.locator('.jp-interview-library a[href="#clarify-feedback"]').click();
        assert.equal(await page.getByLabel('Practice focus').inputValue(), 'all');
        assert.equal(await page.locator('.jp-interview-prompt:visible').getAttribute('id'), 'clarify-feedback');
        await page.getByRole('button', { name: 'Next question', exact: true }).click();
        await page.goBack();
        await page.waitForFunction(() => !document.getElementById('clarify-feedback').hidden);
        assert.deepEqual(await page.evaluate(() => window.privacyCalls), []);
      } else {
        assert.equal(await page.locator('.jp-interview-controls').isVisible(), false);
        assert.equal(await page.locator('.jp-interview-prompt:visible').count(), 6);
        for (const summary of await page.locator('.jp-interview-response summary').all()) await summary.click();
        assert.equal(await page.locator('.jp-interview-response[open]').count(), 6);
      }
      assert.equal(requests.length, baseline, 'Exercise controls must not send requests');
      if (local) {
        assert.equal((await context.cookies()).length, 0);
        assert.deepEqual(external, []);
      } else {
        // Do not read hosting security-cookie values. The injected RUM beacon stays blocked.
        assert.ok(external.every(host => host === 'static.cloudflareinsights.com'));
      }
      for (const width of [1440, 980, 760, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow ${width}`);
        if (javascript && [1440, 390].includes(width)) {
          await page.evaluate(() => scrollTo(0, 0));
          await page.screenshot({ path: path.join(output, `interview-${width}.png`), fullPage: true });
        }
      }
      const pending = page.waitForEvent('download');
      await page.locator('a[download]').click();
      const download = await pending;
      assert.equal(download.suggestedFilename(), 'jobplorer-interview-practice.txt');
      const saved = path.join(output, `pack-${javascript}.txt`);
      await download.saveAs(saved);
      assert.equal(await fs.readFile(saved, 'utf8'), pack);
      for (const destination of new Set(await page.locator('article a[href^="/"]:not([download])').evaluateAll(els => els.map(el => el.pathname)))) assert.equal((await context.request.get(base + destination)).status(), 200, destination);
      await page.goto(base + route + '#hand-over-work');
      if (javascript) assert.equal(await page.locator('.jp-interview-prompt:visible').getAttribute('id'), 'hand-over-work');
      if (javascript) assert.equal(await page.locator('.jp-interview-response[open]').count(), 0);
      await page.goto(base + route + '#unknown-question');
      assert.ok(await page.locator('.jp-interview-prompt:visible').count() > 0);
      assert.deepEqual(errors, []);
      await context.close();
    }
    console.log('PASS: six prompts, three topics, next/previous/wrap/history/deep links, no-JS, download parity, five widths and application privacy checks.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
