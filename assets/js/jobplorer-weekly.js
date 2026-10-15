import { practiceCalendar } from './weekly-calendar.mjs';

const planner = document.getElementById('jp-weekly-planner');
if (planner) {
  const form = planner.querySelector('form');
  const input = planner.querySelector('input');
  const list = planner.querySelector('ol');
  const status = planner.querySelector('[role="status"]');
  const weeks = Array.from(document.querySelectorAll('.jp-weekly-session')).map(section => ({
    title: section.querySelector('h2').textContent,
    outcome: section.querySelector('.jp-weekly-outcome').textContent
  }));
  const today = new Date();
  const localDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  input.min = localDate;
  input.value = localDate;

  function updatePreview() {
    list.replaceChildren();
    status.textContent = '';
    if (!input.value || !input.checkValidity()) return;
    const [year, month, day] = input.value.split('-').map(Number);
    weeks.forEach((week, index) => {
      const date = new Date(Date.UTC(year, month - 1, day + index * 7));
      const item = document.createElement('li');
      const time = document.createElement('time');
      time.dateTime = date.toISOString().slice(0, 10);
      time.textContent = date.toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
      const label = document.createElement('span');
      label.textContent = `Week ${index + 1}: ${week.title}`;
      item.append(time, label);
      list.append(item);
    });
  }

  input.addEventListener('input', updatePreview);
  input.addEventListener('change', updatePreview);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    try {
      const contents = practiceCalendar(input.value, weeks);
      const url = URL.createObjectURL(new Blob([contents], { type: 'text/calendar;charset=utf-8' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'jobplorer-four-week-calendar.ics';
      document.body.append(link);
      link.click();
      link.remove();
      // Let the browser finish accepting the download before releasing the object URL.
      setTimeout(() => URL.revokeObjectURL(url), 60000);
      status.textContent = 'Calendar file prepared. Import it once in your calendar and check the four dates. Alert settings are managed there.';
    } catch {
      status.textContent = 'The calendar file could not be prepared. Check the date or use the practice text pack instead.';
    }
  });
  updatePreview();
  planner.hidden = false;
}
