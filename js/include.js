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
    "Case Studies": "https://blog.covu.com/task-native-insurance-operations/",
    "Customers": "https://blog.covu.com/task-native-insurance-operations/",
    "Blog": "https://blog.covu.com/",
    "Guides": "https://blog.covu.com/",
    "About": "/about-us",
    "Team": "/team",
    "Careers": "https://covu.bamboohr.com/careers",
    "Investors": "/investors",
    "Press / Media": "/press",
    "Privacy": "/privacy-policy",
    "Privacy Policy": "/privacy-policy",
    "Terms": "/terms-of-use",
    "Terms of Use": "/terms-of-use",
    "Cookie Preferences": "/privacy-policy",
    "Security": "/privacy-policy"
  };

  function normalizeFooterLinks(root) {
    var scope = root || document;
    var anchors = scope.querySelectorAll("footer a");
    anchors.forEach(function (anchor) {
      var label = anchor.textContent.replace(/\s+/g, " ").trim();
      if (footerLinks[label]) anchor.setAttribute("href", footerLinks[label]);
    });
  }

  var spacingAdjustments = [];
  var spacingTimer;
  var settledSpacingTimer;

  function isVisible(element) {
    var rect = element.getBoundingClientRect();
    var style = window.getComputedStyle(element);
    return rect.width > 0 && rect.height > 0 &&
      style.display !== "none" && style.visibility !== "hidden";
  }

  function getUntransformedTop(element) {
    var translateY = 0;
    var node = element;
    while (node) {
      var transform = window.getComputedStyle(node).transform;
      if (transform && transform !== "none") {
        var values = transform.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) || [];
        if (transform.indexOf("matrix3d") === 0 && values.length >= 14) {
          translateY += parseFloat(values[13]) || 0;
        } else if (transform.indexOf("matrix") === 0 && values.length >= 6) {
          translateY += parseFloat(values[5]) || 0;
        }
      }
      node = node.parentElement;
    }
    return element.getBoundingClientRect().top - translateY;
  }

  function rememberStyle(element) {
    var exists = spacingAdjustments.some(function (item) {
      return item.element === element;
    });
    if (!exists) {
      spacingAdjustments.push({
        element: element,
        marginTop: element.style.getPropertyValue("margin-top"),
        priority: element.style.getPropertyPriority("margin-top")
      });
    }
  }

  function restoreSpacing() {
    spacingAdjustments.forEach(function (item) {
      if (item.marginTop) {
        item.element.style.setProperty("margin-top", item.marginTop, item.priority);
      } else {
        item.element.style.removeProperty("margin-top");
      }
    });
    spacingAdjustments = [];
  }

  function changeTopMargin(element, amount) {
    if (!element || Math.abs(amount) < 0.5) return;
    rememberStyle(element);
    var marginTop = parseFloat(window.getComputedStyle(element).marginTop) || 0;
    element.style.setProperty("margin-top", (marginTop + amount) + "px", "important");
  }

  function findHeroRoot(heading, nav) {
    var node = heading.parentElement;
    var candidate = node;
    while (node && node.parentElement && node.parentElement !== document.body) {
      var parent = node.parentElement;
      if (parent.contains(nav)) break;
      candidate = parent;
      node = parent;
    }
    return candidate;
  }

  function normalizeTopSpacing() {
    restoreSpacing();

    var navs = Array.prototype.filter.call(document.querySelectorAll("nav"), function (nav) {
      return isVisible(nav) && nav.getBoundingClientRect().top < 250;
    });
    var headings = Array.prototype.filter.call(document.querySelectorAll("h1"), isVisible);
    if (!navs.length || !headings.length) return;

    navs.sort(function (a, b) {
      return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
    });
    headings.sort(function (a, b) {
      return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
    });

    var nav = navs[0];
    var heading = headings[0];
    var navHost = nav.closest(".navbar") || nav;

    for (var i = 0; i < 8; i += 1) {
      var navOffset = 18 - getUntransformedTop(nav);
      if (Math.abs(navOffset) < 0.5) break;
      changeTopMargin(navHost, navOffset);
    }

    var targetGap = window.innerWidth <= 767 ? 85 : 100;
    if (window.innerWidth <= 767 && window.location.pathname === "/") {
      targetGap += 0.64;
    }
    var heroRoot = findHeroRoot(heading, nav);
    for (var j = 0; j < 8; j += 1) {
      var currentGap = getUntransformedTop(heading) -
        (getUntransformedTop(nav) + nav.getBoundingClientRect().height);
      var gapOffset = targetGap - currentGap;
      if (Math.abs(gapOffset) < 0.5) break;
      changeTopMargin(heroRoot, gapOffset);
    }
  }

  function scheduleTopSpacing() {
    window.clearTimeout(spacingTimer);
    window.clearTimeout(settledSpacingTimer);
    spacingTimer = window.setTimeout(normalizeTopSpacing, 0);
    settledSpacingTimer = window.setTimeout(normalizeTopSpacing, 1100);
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
          scheduleTopSpacing();
        })
        .catch(function (err) { console.error("Include failed:", url, err); });
    });
    scheduleTopSpacing();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadIncludes);
  } else {
    loadIncludes();
  }
  window.addEventListener("load", scheduleTopSpacing);
  window.addEventListener("resize", scheduleTopSpacing);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleTopSpacing);
  }
})();
