// Local QA only. Fictional exercises; external requests and browser storage are blocked.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.JOBPLORER_TEST_URL || 'http://127.0.0.1:1327';
assert(['127.0.0.1', 'localhost'].includes(new URL(base).hostname));
const route = '/job-seeker-tools/weekly-practice/';
const output = process.env.JOBPLORER_TEST_OUTPUT || '/tmp/jobplorer-weekly-qa';

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', acceptDownloads: true });
    const external = [];
    await context.route('**/*', r => {
      if (new URL(r.request().url()).origin === new URL(base).origin) return r.continue();
      external.push(r.request().url());
      return r.abort();
    });
    await context.addInitScript(() => {
      window.privacyCalls = [];
      for (const name of ['localStorage', 'sessionStorage', 'indexedDB', 'caches']) {
        Object.defineProperty(window, name, { get() { window.privacyCalls.push(name); throw new Error('Unexpected storage access'); } });
      }
      Object.defineProperty(document, 'cookie', {
        get() { window.privacyCalls.push('cookie read'); return ''; },
        set() { window.privacyCalls.push('cookie write'); }
      });
      navigator.sendBeacon = () => { window.privacyCalls.push('beacon'); return false; };
      window.fetch = () => { window.privacyCalls.push('fetch'); throw new Error('Unexpected fetch'); };
    });
    const page = await context.newPage();
    const errors = [];
    const requests = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => requests.push(r.url()));
    assert.equal((await page.goto(base + route)).status(), 200);
    assert.equal(await page.locator('h1').textContent(), "This Week's Job Search Practice");
    assert.equal(await page.locator('input:not([type="date"]), textarea, select, [contenteditable]').count(), 0);
    assert.equal(await page.locator('input[type="date"]').count(), 1);
    assert.equal(await page.locator('form').count(), 1);
    assert.equal(await page.locator('script[src*="googletagmanager"], script[src*="cloudflareinsights"]').count(), 0);
    assert.equal(await page.locator('.jp-weekly-session').count(), 4);
    assert.equal(await page.locator('.jp-weekly-answer[open]').count(), 0);
    const ids = await page.locator('[id]').evaluateAll(items => items.map(el => el.id));
    assert.equal(new Set(ids).size, ids.length);
    const packHref = await page.locator('a[download="jobplorer-four-week-practice.txt"]').getAttribute('href');
    const response = await context.request.get(base + packHref);
    assert.equal(response.status(), 200);
    const pack = await response.text();
    assert.equal((pack.match(/^WEEK [1-4]:/gm) || []).length, 4);
    assert.match(pack, /All scenarios are fictional/);
    const baselineRequests = requests.length;

    for (let number = 1; number <= 4; number++) {
      await page.locator('.jp-weekly-nav a').nth(number - 1).click();
      assert.equal(new URL(page.url()).hash, '#week-' + number);
      const section = page.locator('#week-' + number);
      const summary = section.locator('summary');
      await summary.focus();
      await page.keyboard.press('Enter');
      assert.notEqual(await section.locator('details').getAttribute('open'), null);
      assert.equal(await section.getByRole('heading', { name: 'One possible response', exact: true }).isVisible(), true);
      const evidence = await section.locator('.jp-weekly-evidence li').allTextContents();
      const answers = await section.locator('.jp-weekly-answer li').allTextContents();
      for (const line of [...evidence, ...answers]) assert.ok(pack.includes(line), 'Text pack must match rendered facts and answers');
      assert.equal(answers.length, [4, 3, 2, 3][number - 1]);
      await page.keyboard.press('Space');
      assert.equal(await section.locator('details').getAttribute('open'), null);
    }
    assert.equal(requests.length, baselineRequests, 'Week links and answer toggles must not send requests');
    assert.deepEqual(await page.evaluate(() => window.privacyCalls), []);
    assert.equal(await page.evaluate(() => typeof window.dataLayer), 'undefined');
    assert.equal(await page.evaluate(() => typeof window.gtag), 'undefined');
    assert.equal((await context.cookies()).length, 0);
    assert.deepEqual(external, []);

    const week1 = await page.locator('#week-1').textContent();
    assert.match(week1, /helpful, not essential/);
    assert.match(week1, /which shared hours and time zone apply/);
    const week2 = await page.locator('#week-2 .jp-weekly-answer').textContent();
    assert.match(week2, /my teammate fixed/);
    assert.match(week2, /40% figure.*have no support/);
    const week3 = await page.locator('#week-3 .jp-weekly-answer').textContent();
    assert.match(week3, /Several request sources do not prove a chaotic process/);
    const week4 = await page.locator('#week-4 .jp-weekly-answer').textContent();
    assert.match(week4, /Automatic updates contradict the facts/);
    assert.match(week4, /cloud backup is not described/);

    const downloadEvent = page.waitForEvent('download');
    await page.locator('a[download="jobplorer-four-week-practice.txt"]').click();
    const download = await downloadEvent;
    assert.equal(download.suggestedFilename(), 'jobplorer-four-week-practice.txt');
    await download.saveAs(path.join(output, download.suggestedFilename()));
    assert.equal(await fs.readFile(path.join(output, download.suggestedFilename()), 'utf8'), pack);

    const internal = await page.locator('article a[href^="/"]:not([download])').evaluateAll(items => items.map(a => a.pathname + a.hash));
    for (const destination of new Set(internal)) {
      const res = await context.request.get(base + destination);
      assert.equal(res.status(), 200, destination);
      if (destination.includes('#')) assert.ok((await res.text()).includes(destination.split('#')[1]));
    }
    await page.locator('#week-1 summary').click();
    await page.reload();
    assert.equal(await page.locator('.jp-weekly-answer[open]').count(), 0, 'No persisted progress');

    for (const width of [1440, 980, 760, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(base + route);
      await page.locator('img.jp-topic-image').evaluate(el => el.decode());
      for (const summary of await page.locator('.jp-weekly-answer summary').all()) await summary.click();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Overflow: ' + width);
      const columns = await page.locator('#week-1 .jp-weekly-work > div').evaluateAll(items => items.map(el => { const b = el.getBoundingClientRect(); return { x: b.x, right: b.right, y: b.y, bottom: b.bottom }; }));
      if (width > 760) assert.ok(columns[0].right <= columns[1].x);
      else assert.ok(columns[0].bottom <= columns[1].y);
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: path.join(output, 'weekly-' + width + '.png'), fullPage: true });
      await page.screenshot({ path: path.join(output, 'weekly-viewport-' + width + '.png') });
      await page.locator('#week-4 .jp-weekly-next a').last().click();
      assert.equal(new URL(page.url()).pathname, '/job-seeker-tools/guide-finder/');
    }
    assert.deepEqual(errors, []);
    await context.close();

    const plainContext = await browser.newContext({ javaScriptEnabled: false, reducedMotion: 'reduce', viewport: { width: 390, height: 960 }, acceptDownloads: true });
    await plainContext.route('**/*', r => new URL(r.request().url()).origin === new URL(base).origin ? r.continue() : r.abort());
    const plain = await plainContext.newPage();
    await plain.goto(base + route);
    for (let number = 1; number <= 4; number++) {
      await plain.locator('.jp-weekly-nav a').nth(number - 1).click();
      await plain.locator('#week-' + number + ' summary').click();
      assert.equal(await plain.locator('#week-' + number).getByRole('heading', { name: 'One possible response', exact: true }).isVisible(), true);
    }
    assert.equal(await plain.locator('.jp-weekly-answer[open]').count(), 4);
    const plainDownload = plain.waitForEvent('download');
    await plain.locator('a[download="jobplorer-four-week-practice.txt"]').click();
    assert.equal((await plainDownload).suggestedFilename(), 'jobplorer-four-week-practice.txt');
    assert.equal(await plain.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    for (const entry of ['/', '/guides/', '/job-seeker-tools/', '/job-seeker-tools/guide-finder/']) {
      await plain.goto(base + entry);
      assert.ok(await plain.locator('a[href="' + route + '"]').count(), entry);
    }
    await plainContext.close();
    console.log('PASS: four exercises and worked responses, pack/HTML parity and download, keyboard/week navigation, date-only input and no answer inputs/storage/cookies/beacons/GA4 or external requests on weekly page, no saved progress, five widths, internal links, no-JS operation and discovery.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
