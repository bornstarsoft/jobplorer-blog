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

  function trackEvent(eventName, parameters) {
    window.dataLayer = window.dataLayer || [];

    if (typeof window.gtag !== "function") {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }

    window.gtag("event", eventName, Object.assign({
      event_category: "resource_finder"
    }, parameters || {}));
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
    var pathLinks = Array.prototype.slice.call(document.querySelectorAll(".jp-path-link"));
    var activeFilter = "all";

    if (!form || !input || !items.length) {
      return;
    }

    function normalized(value) {
      return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    }

    function applyFilters() {
      var query = normalized(input.value);
      var tokens = query.split(/\s+/).filter(Boolean);
      var visibleCount = 0;
      var visibleResources = 0;
      var visibleGuides = 0;

      items.forEach(function (item) {
        var category = item.getAttribute("data-category") || "";
        var searchable = normalized(item.getAttribute("data-search-text") || item.textContent);
        var categoryMatch = activeFilter === "all" || category === activeFilter;
        var queryMatch = !query || tokens.every(function (token) { return searchable.indexOf(token) !== -1; });
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
          status.textContent = visibleResources + " reviewed resources and " + visibleGuides + " practical guides shown";
        } else {
          status.textContent = visibleCount + (visibleCount === 1 ? " result shown" : " results shown");
        }
      }

      return {
        queryLength: query.length,
        visibleCount: visibleCount
      };
    }

    function setFilter(filter) {
      activeFilter = filter;
      filterButtons.forEach(function (button) {
        var isActive = button.getAttribute("data-resource-filter") === activeFilter;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
      return applyFilters();
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-resource-filter") || "all";
        var result = setFilter(filter);
        trackEvent("resource_filter", {
          filter_name: filter,
          result_count: result.visibleCount
        });
      });
    });

    exampleButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var example = button.getAttribute("data-search-example") || "";
        input.value = example;
        var result = setFilter("all");
        trackEvent("resource_search", {
          search_method: "example",
          search_example: example,
          query_length: result.queryLength,
          result_count: result.visibleCount,
          has_results: result.visibleCount > 0
        });
        input.focus();
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var result = applyFilters();
      trackEvent("resource_search", {
        search_method: "form_submit",
        query_length: result.queryLength,
        result_count: result.visibleCount,
        has_results: result.visibleCount > 0,
        active_filter: activeFilter
      });
      var target = document.getElementById("jp-reviewed-title");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    input.addEventListener("input", applyFilters);

    if (clearButton) {
      clearButton.addEventListener("click", function () {
        var previousQueryLength = normalized(input.value).length;
        input.value = "";
        setFilter("all");
        trackEvent("resource_search_clear", {
          previous_query_length: previousQueryLength
        });
        input.focus();
      });
    }

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        var label = item.querySelector("h3, strong");
        trackEvent("resource_open", {
          resource_name: label ? label.textContent.trim() : "unknown",
          resource_category: item.getAttribute("data-category") || "unknown",
          destination_path: item.pathname || ""
        });
      });
    });

    pathLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        var label = link.querySelector("strong");
        trackEvent("resource_path_open", {
          path_name: label ? label.textContent.trim() : "unknown",
          destination_path: link.pathname || ""
        });
      });
    });

    document.addEventListener("keydown", function (event) {
      var target = event.target;
      var isEditing = target && (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
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
