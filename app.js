// IGNOU GI VAULT — shared behaviour

document.addEventListener("DOMContentLoaded", function () {
  // Theme toggle (dark/light). Initial theme is already applied by the
  // inline script in <head> to avoid a flash of the wrong theme; this
  // just wires up the button.
  var themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var root = document.documentElement;
      var current = root.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("gi-vault-theme", next);
      themeToggle.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
    });
  }

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // PYQ search/filter — filters course cards by course code or title text
  var searchInput = document.querySelector("#pyq-search");
  if (searchInput) {
    var cards = Array.prototype.slice.call(document.querySelectorAll("[data-course]"));
    var countEl = document.querySelector("#pyq-count");
    var noResults = document.querySelector("#pyq-empty");

    function applyFilter() {
      var q = searchInput.value.trim().toLowerCase();
      var visible = 0;
      cards.forEach(function (card) {
        var haystack = card.getAttribute("data-course").toLowerCase();
        var match = haystack.indexOf(q) !== -1;
        card.style.display = match ? "" : "none";
        if (match) visible++;
      });
      if (countEl) {
        countEl.textContent = visible + (visible === 1 ? " course" : " courses");
      }
      if (noResults) {
        noResults.style.display = visible === 0 ? "block" : "none";
      }
    }

    searchInput.addEventListener("input", applyFilter);
    applyFilter();
  }
});
