import ICAL from '../vendor/ical.mjs';

export function practiceCalendar(startDate, weeks, now = new Date()) {
  if (!/^20\d{2}-\d{2}-\d{2}$/.test(startDate)) throw new Error('Choose a valid date.');
  const start = ICAL.Time.fromDateString(startDate);
  if (start.toString() !== startDate) throw new Error('Choose a valid date.');
  if (weeks.length !== 4) throw new Error('The four-week plan is unavailable.');
  const calendar = new ICAL.Component(['vcalendar', [], []]);
  calendar.updatePropertyWithValue('version', '2.0');
  calendar.updatePropertyWithValue('prodid', '-//Jobplorer//Four-week practice//EN');
  calendar.updatePropertyWithValue('calscale', 'GREGORIAN');

  weeks.forEach((week, index) => {
    const day = start.clone();
    day.adjust(index * 7, 0, 0, 0);
    const end = day.clone();
    end.adjust(1, 0, 0, 0);
    const url = `https://jobplorer.com/job-seeker-tools/weekly-practice/#week-${index + 1}`;
    const component = new ICAL.Component('vevent');
    const event = new ICAL.Event(component);
    event.uid = `practice-v1-${startDate}-week-${index + 1}@jobplorer.com`;
    event.summary = `Jobplorer week ${index + 1}: ${week.title}`;
    event.startDate = day;
    event.endDate = end;
    event.description = `${week.outcome}\nAllow 5-10 minutes when convenient.\n${url}\nFictional practice, not an application deadline. No account or answer submission. Adjust alerts in your calendar if needed.`;
    component.updatePropertyWithValue('dtstamp', ICAL.Time.fromJSDate(now, true));
    component.updatePropertyWithValue('url', url);
    component.updatePropertyWithValue('transp', 'TRANSPARENT');
    calendar.addSubcomponent(component);
  });
  return calendar.toString() + '\r\n';
}
