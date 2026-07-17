/* Tiny HTML include loader for the static site.
   Any element with data-include="/path.html" gets that file injected.
   Lets nav + footer live in ONE file each (see /partials/). */
(function () {
  function loadIncludes() {
    var nodes = document.querySelectorAll("[data-include]");
    nodes.forEach(function (el) {
      var url = el.getAttribute("data-include");
      fetch(url)
        .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
        .then(function (html) {
          el.innerHTML = html;
          el.dispatchEvent(new CustomEvent("include:loaded", { bubbles: true }));
        })
        .catch(function (err) { console.error("Include failed:", url, err); });
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadIncludes);
  } else {
    loadIncludes();
  }
})();
