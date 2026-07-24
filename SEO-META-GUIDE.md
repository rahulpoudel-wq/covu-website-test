# COVU SEO Meta Guide (titles & descriptions)

How to write the `<title>` and `<meta name="description">` for every page — **current pages and any new page added in the future.**

## Rules
1. **Title ≤ 55 characters.** Front-load the page's primary keyword; end with `| COVU` when it fits.
2. **Description ≤ 125 characters.** Lead with the primary keyword in the first ~60 chars; one clear benefit.
3. **No em dashes (`—`) or en dashes (`–`).** Use a colon, comma, or period instead.
4. **One primary keyword per page.** Never target the same keyword on two pages (keyword cannibalization). Check the map below before assigning.
5. **Product pages use the branded product name as a search term** (people search these directly): `COVU OS`, `COVU VERO`, `COVU BEX`, `COVU Connect`.
6. Keep `&` as `&amp;` in the HTML source (already handled if you copy the template).

## Copy-paste template for a NEW page
Put this in the `<head>`, right after the `<meta charset>` / viewport tags:

```html
<title>Primary Keyword, Short Benefit | COVU</title>
<meta name="description" content="Primary keyword up front, then one specific benefit or proof point. Keep it under 125 characters.">
<link rel="canonical" href="https://www.covu.com/your-page-path">
```

## Current keyword → page map (do not reuse these keywords on new pages)
| Page | Primary keyword | Lane |
|---|---|---|
| `/` | insurance agency operating system | OS |
| `/product` | insurance agency management software | OS |
| `/product/os` | COVU OS + insurance workflow automation | AI/OS |
| `/product/connect` | insurance client management software | GR |
| `/product/service` | insurance business process outsourcing | OUT |
| `/product/vero` | COVU VERO + ai for insurance agents | AI |
| `/product/bex` | COVU BEX + insurance workflow software | OS |
| `/solutions/capacity` | insurance agency back office support | OUT |
| `/solutions/visibility-control` | insurance agency optimization | SO |
| `/solutions/free-your-people` | insurance agent productivity | GR |
| `/solutions/ai-enablement` | intelligent automation in insurance | AI |
| `/agencies/owner-led` | how to grow an independent insurance agency | GR |
| `/agencies/scaling` | how to grow an insurance agency | GR |
| `/agencies/regional` | insurance operations | SO |
| `/agencies/enterprise` | insurance operations outsourcing | OUT |
| `/about-us`, `/team`, `/investors`, `/press` | brand (no commercial keyword) | — |
| `/book-a-consultation-with-covu` | insurance agency consulting | SO |
| `/privacy-policy`, `/terms-of-use`, `/thank-you` | utility (no keyword) | — |

## Keyword bank for future pages (unclaimed — pick from here)
Lanes: **GR** growth · **AI** AI/OS · **SO** service/ops · **OUT** outsourcing · **OS** COVU OS category.

- **GR:** insurance lead generation, insurance agency marketing, seo for insurance agencies, insurance customer retention, cross selling insurance, best crm for insurance agents, insurance renewals
- **AI:** insurance automation, insurance process automation, chatbots for insurance, ai tools for insurance agents, automated claims processing insurance, insurance technology solutions
- **SO:** insurance operations, insurance agency management, streamline insurance agency operations, insurance agency operational efficiency, insurance back office support
- **OUT:** insurance bpo, insurance bpo services, outsource insurance services, insurance claims outsourcing, insurance back office services, outsource insurance accounting services
- **OS:** insurance policy management software, insurance workflow management system, best insurance agency software, agency operating system, operating system for insurance agencies

> When you add a new page: pick ONE unclaimed keyword above, move it into the map, and write the title/description per the rules.
