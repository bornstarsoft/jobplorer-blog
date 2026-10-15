// Isolated local browser QA; analytics and all other external requests are blocked.
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.JOBPLORER_TEST_URL || 'http://127.0.0.1:1327';
assert(['127.0.0.1', 'localhost'].includes(new URL(base).hostname));
const output = process.env.JOBPLORER_TEST_OUTPUT || '/tmp/jobplorer-topic-qa';

(async () => {
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await context.route('**/*', r => new URL(r.request().url()).origin === new URL(base).origin ? r.continue() : r.abort());
    await context.addInitScript(() => {
      window.storageCalls = [];
      for (const name of ['localStorage', 'sessionStorage', 'indexedDB']) {
        Object.defineProperty(window, name, { get() { window.storageCalls.push(name); throw new Error('Unexpected storage'); } });
      }
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(base + '/');
    assert.equal(await page.locator('h1').textContent(), 'Jobplorer');
    assert.equal(await page.locator('.jp-topic-link').count(), 5);
    assert.equal(await page.locator('.jp-topic-link img').count(), 5);
    for (const link of await page.locator('.jp-topic-link').evaluateAll(items => items.map(a => a.href))) {
      assert.equal((await context.request.get(link)).status(), 200);
    }
    const search = page.getByRole('searchbox');
    for (const [query, expected] of [['work remote', 1], ['development game', 2], ['CV', 1], ['r\u00e9sum\u00e9', 1], ['entry-level', 1], ['first job', 1], ['Canada', 1], ['LinkedIn', 1], ['job scams', 1], ['fake recruiter', 1], ['interview', 3], ['STAR', 2], ['job description', 1], ['requirements', 1], ['portfolio', 1], ['work sample', 2], ['cover letter', 1], ['covering letter', 1], ['supporting statement', 1], ['follow-up', 1], ['thank you', 1], ['waiting', 1], ['company research', 2], ['source credibility', 1], ['workplace culture', 1], ['generative AI', 1], ['prompts', 1], ['factual accuracy', 1], ['informational interview', 1], ['networking', 1], ['career conversations', 1], ['learning plan', 1], ['skill gap', 1], ['upskilling', 1], ['search terms', 1], ['filters', 1], ['queries', 1], ['assessment', 1], ['take-home', 1], ['task brief', 1]]) {
      await search.fill(query);
      assert.equal(await page.locator('[data-search-item]:visible').count(), expected, query);
    }
    await search.fill('weekly practice');
    assert.equal(await page.locator('[data-search-item]:visible').count(), 1);
    assert.equal(await page.locator('[data-search-item]:visible').getAttribute('href'), '/job-seeker-tools/weekly-practice/');
    await search.fill('');
    await page.getByRole('button', { name: 'Practical Guides', exact: true }).click();
    assert.equal(await page.locator('[data-search-item]:visible').count(), 17);
    assert.equal(await page.getByRole('button', { name: 'Practical Guides', exact: true }).getAttribute('aria-pressed'), 'true');
    await page.getByRole('button', { name: 'All', exact: true }).click();
    await search.fill('\uac80\uc0c9\uc5c6\uc74c');
    assert.equal(await page.locator('[data-search-item]:visible').count(), 0, 'Non-Latin queries must not become an empty query');
    const privateQuery = 'synthetic-private-marker-937';
    await search.fill(privateQuery);
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    assert.equal(await page.locator('#jp-no-results').isVisible(), true);
    assert.equal(await page.locator('.jp-no-result-links a').count(), 2);
    assert.equal(new URL(page.url()).search, '');
    assert.equal(await page.evaluate(query => JSON.stringify(window.dataLayer).includes(query), privateQuery), false, 'No raw query in analytics payload');
    await page.getByRole('button', { name: 'Clear search', exact: true }).click();
    assert.equal(await page.locator('[data-search-item]:visible').count(), 26);

    const imageURLs = new Set();
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(base + '/');
      const images = page.locator('img.jp-topic-image');
      assert.equal(await images.count(), 25);
      for (const img of await images.all()) {
        await img.scrollIntoViewIfNeeded();
        await img.evaluate(el => el.decode());
        const data = await img.evaluate(el => ({ src: el.currentSrc, width: el.width, height: el.height, natural: el.naturalWidth, alt: el.alt, sources: el.srcset, size: el.sizes }));
        assert.ok(data.natural > 0 && data.alt.startsWith('Illustration'));
        assert.ok(data.sources.includes('360w') && data.sources.includes('720w'));
        assert.ok(data.size);
        assert.ok(Math.abs(data.width / data.height - 1.5) < 0.02, 'Image must not stretch or crop');
        imageURLs.add(data.src);
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Overflow at ' + width);
      await page.locator('.jp-topic-link').last().focus();
      const bounds = await page.locator('.jp-topic-link').last().boundingBox();
      assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width + 1, 'Keyboard access to last topic at ' + width);
      await page.locator('.jp-topic-link').first().focus();
      await page.evaluate(() => { document.activeElement.blur(); scrollTo(0, 0); });
      await page.screenshot({ path: path.join(output, 'home-' + width + '.png'), fullPage: true });
      await page.screenshot({ path: path.join(output, 'home-viewport-' + width + '.png') });
    }
    for (const url of imageURLs) {
      const response = await context.request.get(url);
      assert.equal(response.status(), 200, url);
      assert.match(response.headers()['content-type'], /image\/webp/);
      assert.ok((await response.body()).length < 80000, 'Responsive image budget: ' + url);
    }

    for (const [route, expectedImages] of [['/career-guides/', 3], ['/career-guides/remote-workers/', 1], ['/posts/ai-creators-future-game-development/', 1], ['/job-seeker-tools/guide-finder/', 1]]) {
      await page.goto(base + route);
      assert.ok(await page.locator('img.jp-topic-image:visible').count() >= expectedImages);
      for (const image of await page.locator('img.jp-topic-image:visible').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(el => el.decode());
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, route);
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: path.join(output, route.replaceAll('/', '-') + '.png'), fullPage: true });
    }
    assert.deepEqual(await page.evaluate(() => window.storageCalls), []);
    assert.equal((await context.cookies()).length, 0);
    assert.deepEqual(errors, []);
    await context.close();

    const plainContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 960 } });
    await plainContext.route('**/*', r => new URL(r.request().url()).origin === new URL(base).origin ? r.continue() : r.abort());
    const plain = await plainContext.newPage();
    await plain.goto(base + '/');
    assert.equal(await plain.locator('.jp-topic-link').count(), 5);
    assert.equal(await plain.locator('[data-search-item]:visible').count(), 26);
    assert.equal(await plain.getByRole('searchbox').isVisible(), false);
    await plain.locator('.jp-topic-link').first().click();
    assert.equal(new URL(plain.url()).pathname, '/career-guides/remote-workers/');
    await plainContext.close();
    console.log('PASS: five topic routes, existing searches and weekly practice discovery, practical guide filter, empty-state recovery, raw-query exclusion, responsive WebP render/budget checks, five widths, keyboard carousel access, 25 homepage illustration placements, no-JS discovery, no new persistence.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
