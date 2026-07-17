# COVU Website — Static Site (covu-website-test)

Plain static HTML. No framework, no build step. The repo **is** the website:
Vercel serves the files directly. Every commit auto-deploys.

---

## 1. HOW THE SITE IS STRUCTURED

```
index.html                         -> /               (homepage)
about-us/index.html                -> /about-us
team/index.html                    -> /team
css/colors_and_type.css            shared design-system stylesheet
js/include.js                      loads shared partials into every page
js/nav.js                          global nav behavior (dropdowns, mobile menu)
partials/nav.html                  THE nav bar (edit once, applies everywhere)
partials/footer.html               THE footer (edit once, applies everywhere)
images/                            shared images (all pages)
videos/                            shared videos (all pages)
vercel.json                        clean URLs + /about -> /about-us redirect
```

- One page = one folder with `index.html`. Folder name = the URL.
- `images/` and `videos/` are shared by every page. Reference as `/images/x.png`, `/videos/x.mp4`.
- The nav and footer live in ONE file each (`partials/`). Change them once; every page updates.

---

## 2. GLOBAL NAV + FOOTER — how it works

Each page contains two placeholders instead of a full nav/footer:

```html
<div data-include="/partials/nav.html"></div>
...page content...
<div data-include="/partials/footer.html"></div>
```

Three small scripts make this work (already added before </body> on every page):

```html
<script src="/js/include.js" defer></script>   <!-- injects the partials -->
<script src="/js/nav.js" defer></script>        <!-- runs nav dropdowns/burger AFTER injection -->
```

`include.js` fetches each partial and drops it in, then fires an `include:loaded`
event. `nav.js` listens for that event and wires up the dropdown menus and the
mobile hamburger.

**To change a nav link or footer link later:** edit `partials/nav.html` or
`partials/footer.html` ONCE and commit. It updates on every page automatically.

> Note: the nav/footer **styling (CSS)** currently still lives inside each page's
> `<style>` block (unchanged, so the look is identical). The shared thing is the
> nav/footer **markup + links + behavior**. Centralizing the CSS is an optional
> later cleanup.

---

## 3. LINK RULES (already applied everywhere)

- Pages that already existed on covu.com keep their EXACT slug (for SEO):
  `/about-us`, `/support-on-insurance-operations`, `/grow-your-agency`,
  `/acquisition`, `/book-a-consultation-with-covu`, `/privacy-policy`,
  `/terms-of-use`, `/press`, `/agency-resources`.
- New pages use short slugs: `/team`, `/os`, `/connect`, `/execution-network`,
  `/ai`, `/solutions/*`, `/agencies/*`, `/services`, `/tech`, `/customers`,
  `/guides`, `/investors`.
- Everything on `go.covu.com`, `my.covu.com`, `blog.covu.com`, `try.covu.com`,
  `covu.bamboohr.com`, and social links stays LIVE (external).

Links to pages not built yet will 404 until we add those pages. That's expected
during the build.

---

## 4. META TAGS (edit later)

Every page has, right after its `<title>`:

```html
<meta name="description" content="EDIT ME — 150–160 character description...">
<link rel="canonical" href="https://www.covu.com/<slug>/">
```

Edit the `<title>` and the description text per page whenever you're ready.

---

## 5. ADDING A NEW PAGE (browser only)

1. In the repo: **Add file > Create new file**.
2. Filename: `route/index.html` (typing `/` makes the folder). e.g. `os/index.html`.
3. Paste the page HTML. Include the two placeholders + three scripts (see section 2)
   so it gets the global nav + footer.
4. Commit. It's live at `/route` after Vercel redeploys (~1 min).

New images -> upload into the existing `images/` folder. New videos -> `videos/`.

---

## 6. EDITING / REPLACING FILES

Uploading a file to a path that already exists **overwrites** it (that's how you
update a page). Commit = auto-deploy.
