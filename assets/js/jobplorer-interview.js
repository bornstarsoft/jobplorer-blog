(() => {
  const controls = document.querySelector('.jp-interview-controls');
  const cards = Array.from(document.querySelectorAll('.jp-interview-prompt'));
  if (!controls || cards.length === 0) return;
  const topic = document.getElementById('interview-topic');
  const position = document.getElementById('interview-position');
  const previous = document.getElementById('interview-prev');
  const next = document.getElementById('interview-next');
  const byId = new Map(cards.map(card => [card.id, card]));
  let current = cards[0];
  const pool = () => cards.filter(card => topic.value === 'all' || card.dataset.topic === topic.value);

  function show(card, focus = false) {
    if (!card) return;
    if (!pool().includes(card)) topic.value = 'all';
    current = card;
    for (const candidate of cards) {
      candidate.hidden = candidate !== current;
      if (candidate !== current) candidate.querySelector('details').open = false;
    }
    const selected = pool();
    position.textContent = `Question ${selected.indexOf(current) + 1} of ${selected.length}`;
    previous.disabled = next.disabled = selected.length < 2;
    if (focus) current.querySelector('h2').focus({ preventScroll: true });
  }

  function go(card, focus) {
    show(card, focus);
    // Public content anchors only: no visitor data or progress in the URL.
    if (location.hash !== '#' + card.id) history.pushState(null, '', '#' + card.id);
  }

  function step(direction) {
    const selected = pool();
    const index = selected.indexOf(current);
    go(selected[(index + direction + selected.length) % selected.length], true);
  }

  previous.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  topic.addEventListener('change', () => go(pool()[0], false));
  window.addEventListener('hashchange', () => {
    const target = byId.get(location.hash.slice(1)) || cards[0];
    if (target) {
      show(target);
      controls.scrollIntoView({ block: 'start' });
    }
  });
  show(byId.get(location.hash.slice(1)) || cards[0]);
  controls.hidden = false;
})();
