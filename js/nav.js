/* Global nav behavior — runs AFTER the nav partial is injected.
   De-scoped version of the homepage nav script so it works on every page. */
(function () {
  var initialized = false;

  function initNav() {
    var nav = document.getElementById("nav");
    if (!nav || initialized) return;
    initialized = true;

    // ----- dropdown hover-intent -----
    var items = [].slice.call(document.querySelectorAll(".navitem"));
    var closeT, openItem = null;
    function closeAll() { items.forEach(function (x) { x.classList.remove("open"); }); openItem = null; }
    function place(it) {
      var dd = it.querySelector(".dropdown"); if (!dd) return;
      dd.style.left = "0px";
      var r = dd.getBoundingClientRect(), vw = window.innerWidth, m = 16, shift = 0;
      if (r.right > vw - m) shift = (vw - m) - r.right;
      if (r.left + shift < m) shift = m - r.left;
      dd.style.left = shift + "px";
    }
    items.forEach(function (it) {
      it.addEventListener("pointerenter", function () { clearTimeout(closeT); closeAll(); it.classList.add("open"); openItem = it; place(it); });
      it.addEventListener("pointerleave", function () { closeT = setTimeout(function () { it.classList.remove("open"); if (openItem === it) openItem = null; }, 170); });
    });
    window.addEventListener("resize", function () { if (openItem) place(openItem); });

    // ----- mobile burger + menu -----
    var b = document.getElementById("navburger"), mm = document.getElementById("mobilemenu");
    if (b && mm) {
      function close() { mm.classList.remove("open"); b.classList.remove("open"); b.setAttribute("aria-expanded", "false"); }
      function open() { mm.classList.add("open"); b.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
      b.addEventListener("click", function (e) { e.stopPropagation(); mm.classList.contains("open") ? close() : open(); });
      mm.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
      document.addEventListener("click", function (e) { if (mm.classList.contains("open") && !mm.contains(e.target) && e.target !== b && !b.contains(e.target)) close(); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
      window.addEventListener("resize", function () { if (window.innerWidth > 960) close(); });
    }
  }

  // Run when the nav include finishes injecting, or if nav is already present.
  document.addEventListener("include:loaded", initNav);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav);
  } else {
    initNav();
  }
})();
