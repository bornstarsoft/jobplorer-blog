(function () {
  "use strict";
  var root = document.getElementById("jp-guide-finder");
  if (!root) return;
  var choices = Array.from(root.querySelectorAll("[data-guide-choice]"));
  var results = Array.from(root.querySelectorAll("[data-guide-group]"));
  var status = document.getElementById("guide-status");

  function update() {
    choices.forEach(function (choice) {
      results.forEach(function (result) {
        if (result.dataset.guideGroup === choice.dataset.guideChoice) {
          result.hidden = result.dataset.guideValue !== choice.value;
        }
      });
    });
    status.textContent = "3 reading paths: " + choices.map(function (choice) {
      return choice.options[choice.selectedIndex].text;
    }).join(" / ");
  }
  choices.forEach(function (choice) { choice.addEventListener("change", update); });
  document.getElementById("guide-reset").addEventListener("click", function () {
    choices.forEach(function (choice) { choice.selectedIndex = 0; });
    update();
    choices[0].focus();
  });
  // Reconcile results with any native select restoration on back/forward navigation.
  window.addEventListener("pageshow", update);
  update();
  root.querySelector(".jp-guide-controls").hidden = false;
  var shortcuts = root.querySelector('.jp-route-shortcuts');
  function openRoute() {
    var route = Array.from(root.querySelectorAll('.jp-practice-route')).find(function (item) {
      return '#' + item.id === window.location.hash;
    });
    if (route) {
      route.open = true;
      if (shortcuts) shortcuts.open = false;
      if (!route.contains(document.activeElement)) route.querySelector('summary').focus({ preventScroll: true });
      route.scrollIntoView({ block: 'start' });
    }
  }
  if (shortcuts) shortcuts.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    // A repeated fragment does not emit hashchange; reopen that route explicitly.
    if (link && link.hash === window.location.hash) {
      event.preventDefault();
      openRoute();
    }
  });
  window.addEventListener('hashchange', openRoute);
  window.addEventListener('pageshow', openRoute);
  openRoute();
}());
