/* Tiny HTML include loader for the static site.
   Any element with data-include="/path.html" gets that file injected.
   Lets nav + footer live in ONE file each (see /partials/). */
(function () {
  /*
   * Several older pages still contain a locally embedded footer. Keep those
   * links in sync with the shared footer until their markup is migrated.
   * The keys are the visible labels, which are consistent across footer
   * variants; the values only target routes that exist in this repository.
   */
  var footerLinks = {
    "Book a demo": "/book-a-consultation-with-covu",
    "The Stack": "/product",
    "Connect": "/product/connect",
    "OS": "/product/os",
    "Service Network": "/product/service",
    "Vero / AI": "/product/vero",
    "VERO / AI": "/product/vero",
    "Extra Servicing Capacity": "/solutions/capacity",
    "Operational Visibility & Control": "/solutions/visibility-control",
    "Free Up Your Best People": "/solutions/free-your-people",
    "AI Enablement": "/solutions/ai-enablement",
    "Service Types": "/product/service",
    "Tech & AI": "/product/vero",
    "Servicing": "/solutions/capacity",
    "Growth": "/agencies/scaling",
    "Acquisition": "/agencies/enterprise",
    "Owner-led": "/agencies/owner-led",
    "Scaling": "/agencies/scaling",
    "Regional & multi-office": "/agencies/regional",
    "Enterprise & acquisitive": "/agencies/enterprise",
    "Guides": "https://blog.covu.com",
    "About": "/about-us",
    "Team": "/team",
    "Investors": "/investors",
    "Press / Media": "/press",
    "Privacy": "/privacy-policy",
    "Privacy Policy": "/privacy-policy",
    "Terms": "/terms-of-use",
    "Terms of Use": "/terms-of-use",
    "Cookie Preferences": "/privacy-policy"
  };

  function normalizeFooterLinks(root) {
    var scope = root || document;
    var anchors = scope.querySelectorAll("footer a");
    anchors.forEach(function (anchor) {
      var label = anchor.textContent.replace(/\s+/g, " ").trim();
      if (footerLinks[label]) anchor.setAttribute("href", footerLinks[label]);
    });
  }

  function loadIncludes() {
    normalizeFooterLinks(document);
    var nodes = document.querySelectorAll("[data-include]");
    nodes.forEach(function (el) {
      var url = el.getAttribute("data-include");
      fetch(url)
        .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
        .then(function (html) {
          el.innerHTML = html;
          normalizeFooterLinks(el);
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
