(function () {
  "use strict";

  function initializeIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons({
        attrs: {
          "aria-hidden": "true",
          "stroke-width": 1.8
        }
      });
    }
  }

  function initializeNavigation() {
    var toggle = document.querySelector(".jp-menu-toggle");
    var navigation = document.querySelector(".jp-primary-nav");

    if (!toggle || !navigation) {
      return;
    }

    function setOpen(isOpen) {
      toggle.setAttribute("aria-expanded", String(isOpen));
      navigation.classList.toggle("is-open", isOpen);
      var icon = toggle.querySelector("[data-lucide]");
      if (icon) {
        icon.setAttribute("data-lucide", isOpen ? "x" : "menu");
        initializeIcons();
      }
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 980) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });
  }

  function initializeResourceFinder() {
    var form = document.getElementById("jp-resource-search");
    var input = document.getElementById("jp-search-input");
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-search-item]"));
    var filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-resource-filter]"));
    var exampleButtons = Array.prototype.slice.call(document.querySelectorAll("[data-search-example]"));
    var status = document.getElementById("jp-result-status");
    var noResults = document.getElementById("jp-no-results");
    var clearButton = document.getElementById("jp-clear-search");
    var resourceGrid = document.getElementById("jp-resource-grid");
    var guidesSection = document.querySelector(".jp-guides-section");
    var activeFilter = "all";

    if (!form || !input || !items.length) {
      return;
    }

    function normalized(value) {
      return value.toLowerCase().trim();
    }

    function applyFilters() {
      var query = normalized(input.value);
      var visibleCount = 0;
      var visibleResources = 0;
      var visibleGuides = 0;

      items.forEach(function (item) {
        var category = item.getAttribute("data-category") || "";
        var searchable = normalized(item.getAttribute("data-search-text") || item.textContent);
        var categoryMatch = activeFilter === "all" || category === activeFilter;
        var queryMatch = !query || searchable.indexOf(query) !== -1;
        var visible = categoryMatch && queryMatch;

        item.hidden = !visible;
        if (visible) {
          visibleCount += 1;
          if (category === "guide") {
            visibleGuides += 1;
          } else {
            visibleResources += 1;
          }
        }
      });

      if (resourceGrid) {
        resourceGrid.hidden = visibleResources === 0;
      }

      if (guidesSection) {
        guidesSection.hidden = visibleGuides === 0;
      }

      if (noResults) {
        noResults.hidden = visibleCount !== 0;
      }

      if (status) {
        if (visibleCount === 0) {
          status.textContent = "No matching resources";
        } else if (activeFilter === "all" && !query) {
          status.textContent = "9 reviewed resources and 4 practical guides shown";
        } else {
          status.textContent = visibleCount + (visibleCount === 1 ? " result shown" : " results shown");
        }
      }
    }

    function setFilter(filter) {
      activeFilter = filter;
      filterButtons.forEach(function (button) {
        var isActive = button.getAttribute("data-resource-filter") === activeFilter;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
      applyFilters();
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setFilter(button.getAttribute("data-resource-filter") || "all");
      });
    });

    exampleButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        input.value = button.getAttribute("data-search-example") || "";
        setFilter("all");
        input.focus();
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      applyFilters();
      var target = document.getElementById("jp-reviewed-title");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    input.addEventListener("input", applyFilters);

    if (clearButton) {
      clearButton.addEventListener("click", function () {
        input.value = "";
        setFilter("all");
        input.focus();
      });
    }

    document.addEventListener("keydown", function (event) {
      var target = event.target;
      var isEditing = target && (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      );

      if (event.key === "/" && !isEditing) {
        event.preventDefault();
        input.focus();
      }

      if (event.key === "Escape" && document.activeElement === input) {
        input.value = "";
        setFilter("all");
        input.blur();
      }
    });

    applyFilters();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initializeIcons();
    initializeNavigation();
    initializeResourceFinder();
  });
}());
