const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE_PATH || 'playwright');
const base = process.env.JOBPLORER_TEST_URL || 'http://127.0.0.1:1327';
assert(['localhost', '127.0.0.1'].includes(new URL(base).hostname));
const route = '/job-seeker-tools/weekly-practice/';
const output = process.env.JOBPLORER_TEST_OUTPUT || '/tmp/jobplorer-calendar-qa';

(async () => {
  const { default: ICAL } = await import(pathToFileURL(path.resolve('assets/vendor/ical.mjs')));
  const { practiceCalendar } = await import(pathToFileURL(path.resolve('assets/js/weekly-calendar.mjs')));
  const weeks = Array.from({ length: 4 }, (_, i) => ({ title: `Example ${i + 1}, with punctuation; and a long title`.repeat(3), outcome: 'A line\nAnother line, semicolon; and backslash \\.' }));
  function verifyCalendar(text, dates, titles) {
    const root = new ICAL.Component(ICAL.parse(text));
    assert.equal(root.name, 'vcalendar');
    assert.equal(root.getFirstPropertyValue('version'), '2.0');
    const events = root.getAllSubcomponents('vevent');
    assert.equal(events.length, 4);
    assert.equal(new Set(events.map(e => e.getFirstPropertyValue('uid'))).size, 4);
    events.forEach((component, index) => {
      const event = new ICAL.Event(component);
      assert.equal(event.startDate.isDate, true);
      assert.equal(event.endDate.isDate, true);
      assert.equal(event.startDate.toString(), dates[index]);
      const end = event.startDate.clone(); end.adjust(1, 0, 0, 0);
      assert.equal(event.endDate.toString(), end.toString());
      assert.equal(event.summary, `Jobplorer week ${index + 1}: ${titles[index]}`);
      assert.equal(component.getFirstPropertyValue('url'), `https://jobplorer.com${route}#week-${index + 1}`);
      assert.equal(component.getFirstPropertyValue('transp'), 'TRANSPARENT');
      assert.equal(component.getFirstPropertyValue('dtstamp').zone.tzid, 'UTC');
      assert.equal(component.getAllSubcomponents('valarm').length, 0);
      for (const key of ['attendee', 'organizer', 'rrule']) assert.equal(component.hasProperty(key), false);
    });
    assert.match(text, /\r\n/);
    assert.equal(text.replaceAll('\r\n', '').includes('\n'), false);
    return events;
  }
  for (const [start, dates] of [
    ['2028-02-25', ['2028-02-25', '2028-03-03', '2028-03-10', '2028-03-17']],
    ['2026-12-25', ['2026-12-25', '2027-01-01', '2027-01-08', '2027-01-15']],
    ['2027-03-07', ['2027-03-07', '2027-03-14', '2027-03-21', '2027-03-28']]
  ]) {
    const text = practiceCalendar(start, weeks);
    const events = verifyCalendar(text, dates, weeks.map(w => w.title));
    assert.ok(events[0].getFirstPropertyValue('description').startsWith(weeks[0].outcome));
    assert.equal(events[0].getFirstPropertyValue('uid'), verifyCalendar(practiceCalendar(start, weeks), dates, weeks.map(w => w.title))[0].getFirstPropertyValue('uid'));
  }
  for (const date of ['', '2026-02-30', '2026-13-01', '2026-00-10', 'bad', '2026-01-01\nATTENDEE:x']) assert.throws(() => practiceCalendar(date, weeks));
  assert.throws(() => practiceCalendar('2026-10-15', []));

  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const zone of ['Asia/Seoul', 'America/Los_Angeles']) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, timezoneId: zone, reducedMotion: 'reduce', acceptDownloads: true });
      const external = [], errors = [], requests = [];
      await context.route('**/*', r => {
        if (new URL(r.request().url()).origin === new URL(base).origin) return r.continue();
        external.push(r.request().url()); return r.abort();
      });
      await context.addInitScript(() => {
        window.privacyCalls = [];
        for (const name of ['localStorage', 'sessionStorage', 'indexedDB', 'caches']) Object.defineProperty(window, name, { get() { window.privacyCalls.push(name); throw new Error('Unexpected persistence'); } });
        Object.defineProperty(document, 'cookie', { get() { window.privacyCalls.push('cookie'); return ''; }, set() { window.privacyCalls.push('cookie'); } });
        window.fetch = () => { window.privacyCalls.push('fetch'); throw new Error('Unexpected request'); };
        navigator.sendBeacon = () => { window.privacyCalls.push('beacon'); return false; };
      });
      const page = await context.newPage();
      page.on('pageerror', e => errors.push(e.message));
      page.on('request', r => requests.push(r.url()));
      await page.goto(base + route);
      await page.locator('#jp-weekly-planner').waitFor({ state: 'visible' });
      assert.equal(await page.locator('#jp-weekly-planner').getAttribute('open'), null);
      await page.locator('#jp-weekly-planner > summary').focus();
      await page.keyboard.press('Enter');
      const date = page.getByLabel('First practice day');
      const today = await page.evaluate(() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; });
      assert.equal(await date.inputValue(), today);
      const count = requests.length;
      await date.fill('2028-02-25');
      const dates = ['2028-02-25', '2028-03-03', '2028-03-10', '2028-03-17'];
      assert.deepEqual(await page.locator('#jp-weekly-planner time').evaluateAll(items => items.map(x => x.dateTime)), dates);
      const titles = await page.locator('.jp-weekly-session h2').allTextContents();
      const pending = page.waitForEvent('download');
      await page.getByRole('button', { name: 'Download calendar (.ics)', exact: true }).click();
      const download = await pending;
      assert.equal(download.suggestedFilename(), 'jobplorer-four-week-calendar.ics');
      const file = path.join(output, zone.replace('/', '-') + '.ics');
      await download.saveAs(file);
      verifyCalendar(await fs.readFile(file, 'utf8'), dates, titles);
      assert.match(await page.locator('#jp-weekly-planner [role="status"]').textContent(), /Import it once/);
      assert.equal(new URL(page.url()).search, '');
      assert.equal(requests.length, count, 'Date selection and export must not send requests');
      assert.deepEqual(await page.evaluate(() => window.privacyCalls), []);
      assert.equal(await page.evaluate(() => typeof window.dataLayer), 'undefined');
      assert.deepEqual(await context.cookies(), []);
      assert.deepEqual(external, []);
      await date.fill('');
      await page.getByRole('button', { name: 'Download calendar (.ics)', exact: true }).click();
      assert.equal(await date.evaluate(el => el.validity.valueMissing), true);
      assert.equal(await page.locator('#jp-weekly-planner li').count(), 0);
      await date.fill('2000-01-01');
      assert.equal(await date.evaluate(el => el.validity.rangeUnderflow), true);
      await page.reload();
      assert.equal(await date.inputValue(), today, 'Selected date must not persist');
      await page.locator('#jp-weekly-planner > summary').click();
      for (const width of [1440, 760, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.locator('#jp-weekly-planner').scrollIntoViewIfNeeded();
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        await page.locator('#jp-weekly-planner').screenshot({ path: path.join(output, `planner-${zone.replace('/', '-')}-${width}.png`) });
      }
      assert.deepEqual(errors, []);
      await context.close();
    }
    const plain = await browser.newContext({ javaScriptEnabled: false });
    await plain.route('**/*', r => new URL(r.request().url()).origin === new URL(base).origin ? r.continue() : r.abort());
    const page = await plain.newPage(); await page.goto(base + route);
    assert.equal(await page.locator('#jp-weekly-planner').isVisible(), false);
    assert.equal(await page.locator('.jp-weekly-session').count(), 4);
    assert.equal(await page.locator('a[download]').count(), 1);
    await plain.close();
    console.log('PASS: calendar serialization/escaping, four date-only events, leap/year/DST boundaries, stable UIDs, invalid input, two time zones, download, no date transmission/persistence/analytics, four responsive widths, keyboard and no-JS fallback.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
