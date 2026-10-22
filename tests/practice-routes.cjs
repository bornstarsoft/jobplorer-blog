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
const ids = ['posting', 'experience', 'questions', 'task-brief', 'rewrite-review'];
const nextPaths = [
  '/job-seeker-tools/weekly-practice/#challenge-1',
  '/job-seeker-tools/interview-practice/#improve-a-task',
  '/job-seeker-tools/interview-practice/#clarify-feedback',
  '/job-seeker-tools/weekly-practice/#challenge-4',
  '/guides/use-ai-for-job-search-preparation/#practice-proposed-results'
];

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
      const shortcuts = page.locator('.jp-route-shortcuts');
      assert.equal(await shortcuts.evaluate(el => el.open), false);
      assert.deepEqual(await shortcuts.locator('a').evaluateAll(links => links.map(a => a.hash)), ids.map(id => '#route-' + id));
      const shortcutRequests = requests.length;
      for (const id of ids) {
        if (!(await shortcuts.evaluate(el => el.open))) {
          await shortcuts.locator('summary').focus();
          await page.keyboard.press('Enter');
        }
        await shortcuts.locator('a[href="#route-' + id + '"]').focus();
        await page.keyboard.press('Enter');
        await page.waitForURL(base + route + '#route-' + id);
        const target = page.locator('#route-' + id);
        if (javascript) {
          await page.waitForFunction(id => document.getElementById('route-' + id)?.open && document.activeElement === document.querySelector('#route-' + id + ' > summary'), id);
          assert.equal(await shortcuts.evaluate(el => el.open), false);
        } else if (!(await target.evaluate(el => el.open))) await target.locator('summary').click();
        assert.ok(await target.locator('li a').first().isVisible());
        await target.locator('summary').click();
      }
      // Selecting the current URL fragment must reopen a manually closed route.
      if (!(await shortcuts.evaluate(el => el.open))) await shortcuts.locator('summary').click();
      await shortcuts.locator('a[href="#route-rewrite-review"]').click();
      if (javascript) await page.waitForFunction(() => document.getElementById('route-rewrite-review').open);
      assert.equal(requests.length, shortcutRequests, 'Shortcut navigation makes no network requests');
      if (javascript) assert.deepEqual(await page.evaluate(() => window.privacyCalls), []);
      for (const width of [1440, 980, 760, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        if (!(await shortcuts.evaluate(el => el.open))) await shortcuts.locator('summary').click();
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `shortcut overflow ${width}`);
        for (const link of await shortcuts.locator('a').all()) assert.ok((await link.boundingBox()).height >= 44);
        if (javascript && [1440, 390].includes(width)) await page.locator('.jp-discovery-heading').screenshot({ path: path.join(output, 'shortcuts-' + width + '.png') });
      }
      await page.goto(base + route);
      await page.reload();
      await page.setViewportSize({ width: 1440, height: 1000 });
      assert.equal(await shortcuts.evaluate(el => el.open), false, 'No saved shortcut state');
      assert.equal(await page.locator('.jp-practice-route').count(), 5);
      assert.equal(await page.locator('.jp-practice-route ol li').count(), 15);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), local ? base + route : 'https://jobplorer.com' + route);
      const packResponse = await context.request.get(base + '/downloads/jobplorer-practice-routes.txt');
      assert.equal(packResponse.status(), 200);
      const pack = await packResponse.text();
      assert.equal((pack.match(/^ROUTE:/gm) || []).length, 5);
      assert.equal((pack.match(/^NEXT VISIT$/gm) || []).length, 5);
      assert.ok(pack.includes('5 editorial practice routes'));
      assert.match(await page.locator('a[download="jobplorer-practice-routes.txt"]').textContent(), /Download 5 routes/);
      assert.equal(await page.locator('.jp-route-download').count(), 5);
      assert.deepEqual(await page.locator('.jp-route-next-link').evaluateAll(links => links.map(a => a.getAttribute('href'))), nextPaths);
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

      for (let index = 0; index < ids.length; index++) {
        const id = ids[index];
        const detail = page.locator('#route-' + id);
        await detail.locator('summary').click();
        const filename = `jobplorer-route-${id}.txt`;
        const response = await context.request.get(base + '/downloads/' + filename);
        assert.equal(response.status(), 200);
        const text = await response.text();
        assert.equal((text.match(/^ROUTE:/gm) || []).length, 1);
        assert.ok(text.includes('not personal answers or saved completion'));
        assert.ok(text.includes('NEXT VISIT LINK\nhttps://jobplorer.com' + nextPaths[index]));
        for (const value of await detail.locator('summary, li h3, li p, .jp-route-next').allTextContents()) assert.ok(text.includes(value.trim()), filename);
        assert.ok(text.includes('https://jobplorer.com' + route + '#route-' + id));
        for (const target of await detail.locator('li a').evaluateAll(links => links.map(a => a.getAttribute('href')))) assert.ok(text.includes('https://jobplorer.com' + target));
        const pending = page.waitForEvent('download');
        await detail.locator('.jp-route-download').click();
        const download = await pending;
        assert.equal(download.suggestedFilename(), filename);
        const saved = path.join(output, `${javascript}-${filename}`);
        await download.saveAs(saved);
        assert.equal(await fs.readFile(saved, 'utf8'), text);
        await detail.locator('summary').click();
      }

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
      for (let index = 0; index < ids.length; index++) {
        await page.goto(base + route + '#route-' + ids[index]);
        const detail = page.locator('#route-' + ids[index]);
        if (javascript) await page.waitForFunction(id => document.getElementById('route-' + id)?.open, ids[index]);
        else await detail.locator('summary').click();
        await detail.locator('.jp-route-next-link').click();
        await page.locator('#' + nextPaths[index].split('#')[1]).waitFor({ state: 'visible' });
        assert.equal(page.url(), base + nextPaths[index]);
      }
      await page.goto(base + route);
      await page.reload();
      assert.equal(await page.locator('.jp-practice-route[open]').count(), 0, 'No saved progress');
      const reviewTargets = [
        '/guides/use-ai-for-job-search-preparation/#practice-preferences',
        '/guides/use-ai-for-job-search-preparation/#practice-proposed-results',
        '/job-seeker-tools/weekly-practice/#challenge-2'
      ];
      assert.deepEqual(await page.locator('#route-rewrite-review li a').evaluateAll(links => links.map(a => a.getAttribute('href'))), reviewTargets);
      for (let step = 0; step < reviewTargets.length; step++) {
        await page.goto(base + route + '#route-rewrite-review');
        const review = page.locator('#route-rewrite-review');
        if (javascript) await page.waitForFunction(() => document.getElementById('route-rewrite-review').open);
        else await review.locator('summary').click();
        await review.locator('li a').nth(step).click();
        await page.locator('#' + reviewTargets[step].split('#')[1]).waitFor({ state: 'visible' });
        assert.equal(page.url(), base + reviewTargets[step]);
      }
      for (const from of ['/job-seeker-tools/', '/guides/use-ai-for-job-search-preparation/']) {
        await page.goto(base + from);
        await page.locator('a[href="' + route + '#route-rewrite-review"]').click();
        await page.locator('#route-rewrite-review').waitFor({ state: 'visible' });
        assert.equal(page.url(), base + route + '#route-rewrite-review');
        if (javascript) await page.waitForFunction(() => document.getElementById('route-rewrite-review').open);
      }
      // Article pages retain their existing GA4 tag; only route-page interactions are storage-free.
      await page.goto(base + route);
      await page.locator('#route-experience summary').click();
      await page.locator('#route-experience a[href="#route-experience"]').click();
      assert.equal(new URL(page.url()).hash, '#route-experience');
      await page.locator('#route-experience li a').first().click();
      await page.locator('#week-2').waitFor({ state: 'visible' });
      assert.equal(new URL(page.url()).hash, '#week-2');
      assert.ok(await page.locator('#week-2').isVisible());
      await page.goBack();
      if (javascript) await page.waitForFunction(() => document.getElementById('route-experience').open);
      const detail = page.locator('#route-experience');
      if (!(await detail.evaluate(el => el.open))) await detail.locator('summary').click();
      await page.locator('#route-rewrite-review summary').click();
      for (const width of [1440, 980, 760, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow ${width}`);
        for (const link of await page.locator('.jp-route-next-link:visible, .jp-route-download:visible').all()) assert.ok((await link.boundingBox()).height >= 44, 'Touch target');
        if (javascript && [1440, 390].includes(width)) await page.locator('#practice-routes').screenshot({ path: path.join(output, 'routes-' + width + '.png') });
      }
      const pending = page.waitForEvent('download');
      await page.locator('a[download="jobplorer-practice-routes.txt"]').click();
      const download = await pending;
      assert.equal(download.suggestedFilename(), 'jobplorer-practice-routes.txt');
      const saved = path.join(output, `routes-${javascript}.txt`);
      await download.saveAs(saved);
      assert.equal(await fs.readFile(saved, 'utf8'), pack);
      if (javascript) assert.deepEqual(await page.evaluate(() => window.privacyCalls), []);
      assert.deepEqual(errors, []);
      await context.close();
    }
    console.log('PASS: five shortcuts/focused arrival/same-hash reopening, five routes/15 destinations, five single-route downloads/next-visit links, combined pack, keyboard/no-JS/back navigation, no route-page storage/action requests, five widths/touch targets.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
