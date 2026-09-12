// Local, synthetic selection tests; no external source or analytics requests are allowed.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.JOBPLORER_TEST_URL || 'http://127.0.0.1:1327';
assert(['127.0.0.1', 'localhost'].includes(new URL(base).hostname));
const output = process.env.JOBPLORER_TEST_OUTPUT || '/tmp/jobplorer-discovery-qa';
const finder = base + '/job-seeker-tools/guide-finder/';

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 960 } });
    const external = [];
    await context.route('**/*', r => {
      if (new URL(r.request().url()).origin === new URL(base).origin) return r.continue();
      external.push(r.request().url());
      return r.abort();
    });
    await context.addInitScript(() => {
      window.storageCalls = [];
      for (const name of ['localStorage', 'sessionStorage', 'indexedDB']) {
        Object.defineProperty(window, name, { get() { window.storageCalls.push(name); throw new Error('Storage must not be used'); } });
      }
    });
    const page = await context.newPage();
    const errors = [];
    const requests = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => requests.push(r.url()));
    await page.goto(finder);
    await page.locator('.jp-guide-controls:not([hidden])').waitFor();
    assert.equal(await page.locator('input, textarea, form').count(), 0);
    assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 0);
    assert.equal(await page.locator('.jp-guide-result:visible').count(), 3);
    const baselineRequests = requests.length;
    const goals = await page.locator('#guide-goal option').evaluateAll(items => items.map(i => i.value));
    const roles = await page.locator('#guide-role option').evaluateAll(items => items.map(i => i.value));
    const countries = await page.locator('#guide-country option').evaluateAll(items => items.map(i => i.value));
    let combinations = 0;
    for (const goal of goals) for (const role of roles) for (const country of countries) {
      for (const [group, value] of Object.entries({ goal, role, country })) {
        await page.locator('#guide-' + group).selectOption(value);
      }
      const visible = await page.locator('.jp-guide-result:visible').evaluateAll(items => items.map(i => [i.dataset.guideGroup, i.dataset.guideValue]));
      assert.deepEqual(visible, [['goal', goal], ['role', role], ['country', country]]);
      combinations++;
    }
    assert.equal(combinations, 72);
    assert.equal(requests.length, baselineRequests, 'Selections must not make requests');
    assert.equal(page.url(), finder, 'Selections must not enter the URL');
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    assert.equal((await context.cookies()).length, 0);
    await page.getByRole('button', { name: 'Reset selections' }).click();
    assert.equal(await page.locator('#guide-goal').inputValue(), 'start');
    assert.equal(await page.locator('#guide-role').inputValue(), 'all');
    assert.equal(await page.locator('#guide-country').inputValue(), 'all');
    await page.locator('#guide-goal').focus();
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('#guide-role').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('#guide-country').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('#guide-reset').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#guide-goal').evaluate(el => el === document.activeElement), true);
    await page.locator('#guide-goal').selectOption('compare');
    assert.equal(await page.locator('#guide-goal').inputValue(), 'compare');
    await page.locator('#guide-role').selectOption('software');
    await page.locator('#guide-country').selectOption('ca');

    const links = await page.locator('.jp-guide-result a').evaluateAll(items => items.map(i => i.href));
    for (const link of new Set(links)) {
      const response = await context.request.get(link);
      assert.equal(response.status(), 200, link);
      const hash = new URL(link).hash;
      if (hash) assert.match(await response.text(), new RegExp('id=["\\\']?' + hash.slice(1)));
    }
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.screenshot({ path: path.join(output, 'finder-' + width + '.png'), fullPage: true });
    }
    await page.goto(base + '/job-sites/');
    assert.equal(await page.locator('.jp-comparison tbody tr').count(), 3);
    assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 0);
    for (const slug of ['linkedin', 'indeed', 'glassdoor']) {
      assert.ok(await page.locator('.jp-comparison a[href="/job-sites/sites/' + slug + '/"]').count());
    }
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 960 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.screenshot({ path: path.join(output, 'comparison-' + width + '.png'), fullPage: true });
    }
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    assert.deepEqual(external, []);
    assert.equal((await context.request.get(base + '/job-seeker-tools/application-tracker/')).status(), 404);
    await page.goto(base + '/job-seeker-tools/');
    assert.equal(await page.locator('a[href*="application-tracker"]').count(), 0);
    assert.ok(await page.locator('a[href="/job-seeker-tools/guide-finder/"]').count());
    await page.goto(base + '/');
    assert.equal(await page.locator('script[src*="googletagmanager"]').count(), 1);
    await page.getByRole('searchbox').fill('remote');
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    assert.equal(await page.locator('#jp-resource-grid .jp-resource-card:visible').count(), 1);
    assert.deepEqual(errors, []);
    await context.close();

    const noJS = await browser.newContext({ javaScriptEnabled: false });
    const plain = await noJS.newPage();
    await plain.goto(finder);
    assert.equal(await plain.locator('.jp-guide-controls').isVisible(), false);
    assert.equal(await plain.locator('.jp-guide-result:visible').count(), 13);
    await plain.goto(base + '/job-sites/');
    assert.equal(await plain.locator('.jp-comparison tbody tr:visible').count(), 3);
    await noJS.close();
    console.log('PASS: 72 guide combinations, reset/keyboard navigation, no selection requests/storage/cookies, internal links and anchor, 3 comparison profiles, 1440/390/320px layouts, tracker exclusion, homepage regression, no-JS fallback.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
