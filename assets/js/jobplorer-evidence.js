(() => {
  const nav = document.querySelector('.jp-evidence-nav');
  const situations = Array.from(document.querySelectorAll('.jp-evidence-check'));
  if (!nav || !situations.length) return;
  const links = Array.from(nav.querySelectorAll('a'));
  const targets = new Map();
  for (const situation of situations) {
    targets.set(situation.id, { situation, target: situation });
    const second = situation.querySelector('.jp-evidence-second-look');
    if (second) targets.set(second.id, { situation, target: second });
  }

  function showFromLink(moveFocus = false) {
    // Only known public exercise anchors control visibility; no visitor state is saved.
    const selected = targets.get(location.hash.slice(1)) || targets.get(situations[0].id);
    for (const situation of situations) {
      situation.hidden = situation !== selected.situation;
      if (situation.hidden) {
        for (const detail of situation.querySelectorAll('details')) detail.open = false;
      }
    }
    for (const link of links) {
      if (link.hash === '#' + selected.situation.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    if (moveFocus && targets.has(location.hash.slice(1))) {
      selected.target.querySelector('h2, h3').focus({ preventScroll: true });
      selected.target.scrollIntoView({ block: 'start' });
    }
  }

  window.addEventListener('hashchange', () => showFromLink(true));
  window.addEventListener('pageshow', () => showFromLink());
  showFromLink();
  // A direct second-look link can initially target hidden content before enhancement.
  if (targets.has(location.hash.slice(1))) targets.get(location.hash.slice(1)).target.scrollIntoView({ block: 'start' });
})();
