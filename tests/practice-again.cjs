// No real user data. Can run read-only against the explicitly selected live site.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.JOBPLORER_TEST_URL || 'http://127.0.0.1:1328';
const origin = new URL(base).origin;
const local = ['localhost', '127.0.0.1'].includes(new URL(base).hostname);
assert(['localhost', '127.0.0.1', 'jobplorer.com', 'jobplorer-blog.pages.dev'].includes(new URL(base).hostname));
const output = process.env.JOBPLORER_TEST_OUTPUT || '/tmp/jobplorer-practice-again-qa';
const route = '/job-seeker-tools/weekly-practice/';
const hostingBeacon = value => {
  const url = new URL(value);
  return url.origin === 'https://static.cloudflareinsights.com' && /^\/beacon\.min\.js(?:\/|$)/.test(url.pathname);
};

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const javascript of [true, false]) {
      const context = await browser.newContext({ javaScriptEnabled: javascript, reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
      const external = [], errors = [], requests = [], hostingRequests = [];
      await context.route('**/*', r => {
        if (new URL(r.request().url()).origin === origin) return r.continue();
        external.push(r.request().url()); return r.abort();
      });
      await context.addInitScript(() => {
        window.privacyCalls = [];
        for (const key of ['localStorage', 'sessionStorage', 'indexedDB', 'caches']) Object.defineProperty(window, key, { get() { window.privacyCalls.push(key); throw new Error('Persistence forbidden'); } });
        Object.defineProperty(document, 'cookie', { get() { window.privacyCalls.push('cookie'); return ''; }, set() { window.privacyCalls.push('cookie'); } });
        navigator.sendBeacon = () => { window.privacyCalls.push('beacon'); return false; };
        window.fetch = () => { window.privacyCalls.push('fetch'); throw new Error('Telemetry forbidden'); };
      });
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      page.on('request', r => {
        const url = new URL(r.url());
        // Live hosting can inject security scripts independently of practice actions.
        if (!local && url.origin === origin && url.pathname.startsWith('/cdn-cgi/challenge-platform/')) hostingRequests.push(r.url());
        else requests.push(r.url());
      });
      assert.equal((await page.goto(base + route)).status(), 200);
      assert.equal(await page.locator('.jp-weekly-session').count(), 4);
      assert.equal(await page.locator('.jp-weekly-challenge').count(), 4);
      assert.equal(await page.locator('.jp-challenge-answer[open]').count(), 0);
      assert.equal(await page.locator('input:not([type="date"]), textarea, select, [contenteditable]').count(), 0);
      assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 0);
      const analyticsScripts = await page.locator('script[src*="cloudflareinsights"]').evaluateAll(els => els.map(el => el.src));
      if (local) assert.deepEqual(analyticsScripts, []);
      else assert.ok(analyticsScripts.every(hostingBeacon), 'Only the known hosting beacon may be injected');
      const packResponse = await context.request.get(base + '/downloads/jobplorer-four-week-practice.txt');
      assert.equal(packResponse.status(), 200);
      const pack = await packResponse.text();
      assert.equal((pack.match(/^CHALLENGE [1-4]:/gm) || []).length, 4);
      assert.equal((pack.match(/^NEXT VISIT:/gm) || []).length, 4);
      assert.equal((pack.match(/^COMPARE THE TWO SITUATIONS$/gm) || []).length, 4);
      assert.equal(await page.locator('.jp-weekly-followup').count(), 4);
      assert.equal(await page.locator('.jp-weekly-session .jp-challenge-comparison').count(), 0);
      const baseline = requests.length;
      await page.locator('.jp-weekly-return a[href="#practice-again"]').click();
      assert.equal(new URL(page.url()).hash, '#practice-again');
      for (let i = 1; i <= 4; i++) {
        await page.locator('[aria-label="Choose a fresh scenario"] a').nth(i - 1).click();
        assert.equal(new URL(page.url()).hash, '#challenge-' + i);
        const section = page.locator('#challenge-' + i);
        await section.locator('summary').focus();
        await page.keyboard.press('Enter');
        assert.equal(await section.getByRole('heading', { name: 'One possible response', exact: true }).isVisible(), true);
        for (const text of await section.locator('li, .jp-challenge-prompt, .jp-challenge-answer p').allTextContents()) assert.ok(pack.includes(text), 'Download content parity');
        await section.getByRole('link', { name: 'Review week ' + i, exact: true }).click();
        assert.equal(new URL(page.url()).hash, '#week-' + i);
        const followup = page.locator('#week-' + i + ' .jp-weekly-followup');
        assert.equal(await followup.getAttribute('href'), '#challenge-' + i);
        const title = (await section.locator('h3').textContent()).replace(/^\d+\. /, '');
        assert.ok((await followup.textContent()).includes(title));
        assert.ok(pack.includes('NEXT VISIT: ' + title));
        assert.ok(pack.includes('https://jobplorer.com' + route + '#challenge-' + i));
        await followup.focus();
        await page.keyboard.press('Enter');
        assert.equal(new URL(page.url()).hash, '#challenge-' + i);
        const comparison = section.locator('.jp-challenge-comparison');
        assert.equal(await comparison.isVisible(), true);
        assert.match(await comparison.textContent(), new RegExp('Compare with week ' + i + ':'));
        await page.goBack();
        assert.equal(new URL(page.url()).hash, '#week-' + i);
      }
      assert.equal(requests.length, baseline, 'Challenge navigation/disclosures send no requests');
      if (javascript) assert.deepEqual(await page.evaluate(() => window.privacyCalls), []);
      const cookieMetadata = (await context.cookies()).map(({ name, domain, httpOnly, secure }) => ({ name, domain, httpOnly, secure }));
      if (local) assert.equal(cookieMetadata.length, 0, 'No local application cookies');
      else assert.ok(cookieMetadata.every(cookie => cookie.name === 'cf_clearance' && cookie.domain.replace(/^\./, '') === new URL(base).hostname && cookie.httpOnly && cookie.secure), 'Only a hosting-managed secure clearance cookie may exist; cookie values are never logged');
      if (local) assert.deepEqual(external, []);
      else assert.ok(external.every(hostingBeacon), 'Only the known hosting beacon may be blocked during live QA');
      const ids = await page.locator('[id]').evaluateAll(els => els.map(el => el.id));
      assert.equal(new Set(ids).size, ids.length);
      for (const width of [1440, 980, 760, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        const bounds = await page.locator('.jp-weekly-challenge').evaluateAll(els => els.map(el => { const b = el.getBoundingClientRect(); return { x: b.x, right: b.right, y: b.y, bottom: b.bottom }; }));
        if (width > 760) assert.ok(bounds[0].right <= bounds[1].x);
        else assert.ok(bounds[0].bottom <= bounds[1].y);
        for (const link of await page.locator('.jp-weekly-followup').all()) {
          const b = await link.boundingBox();
          assert.ok(b.height >= 44 && b.x >= 0 && b.x + b.width <= width, 'Follow-up link is usable and fits');
        }
        if (javascript && [1440, 390].includes(width)) {
          await page.locator('#practice-again').screenshot({ path: path.join(output, `practice-again-${width}.png`) });
          await page.locator('#week-1').screenshot({ path: path.join(output, `week-followup-${width}.png`) });
        }
      }
      const pending = page.waitForEvent('download');
      await page.locator('a[download]').click();
      const download = await pending;
      const file = path.join(output, `pack-${javascript}.txt`);
      await download.saveAs(file);
      assert.equal(await fs.readFile(file, 'utf8'), pack);
      await page.reload();
      assert.equal(await page.locator('.jp-challenge-answer[open]').count(), 0);
      // Deep links target an always-visible challenge, without relying on saved state.
      await page.goto(base + route + '#challenge-3');
      assert.equal(await page.locator('#challenge-title-3').isVisible(), true);
      await page.locator('#challenge-3 summary').click();
      assert.equal(await page.locator('#challenge-3 details[open]').count(), 1);
      assert.deepEqual(errors, []);
      if (!local) console.log(`Hosting security requests recorded separately (JS=${javascript}): ${hostingRequests.length}; blocked hosting beacon requests: ${external.length}; hosting clearance cookies: ${cookieMetadata.length}`);
      await context.close();
    }
    console.log('PASS: four paired week/challenge loops and comparison prompts, no-JS/keyboard/back/deep links, examples and download parity, no application storage/telemetry, five widths, no persisted progress.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
