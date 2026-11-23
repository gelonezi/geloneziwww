# gelonezi.com

Roger Gelonezi's portfolio, aimed at international recruiters hiring remote Senior/Staff Backend Engineers and
.NET Software Architects. Plain HTML, CSS and JavaScript with no build step and no dependencies.

## Structure

```
index.html                 The portfolio: hero, intro video, featured system,
                           what I can own, experience, expertise (modernization / integrations /
                           production), principles & leadership, projects, applied AI, stack,
                           writing, education, contact
resume.html                One-column, ATS-readable résumé; prints cleanly to PDF
css/styles.css             "Architect's blueprint" design; color tokens for both themes at the top
css/resume.css             Résumé styles (light, print-first: three pages on A4 and on US Letter)
css/fonts.css              @font-face rules for the self-hosted fonts
fonts/                     IBM Plex Sans (one variable file, weights 400–700) and IBM Plex Mono (400, 500),
                           latin subset, with their license (SIL OFL 1.1)
js/theme.js                Blocking bootstrap: applies the saved theme before first paint (no inline script,
                           so the CSP needs no hashes), and shows all content if main.js never runs
js/main.js                 Theme toggle, mobile menu, active nav, reveal-on-scroll,
                           in-page YouTube player, interactive architecture diagram
js/resume.js               Print button on the résumé page
404.html                   Branded not-found page (wrangler.jsonc: not_found_handling = 404-page)
favicon.ico                32/16 px raster fallback; assets/favicon.svg is the primary icon
assets/apple-touch-icon.png 180×180
assets/img/                roger-gelonezi.jpg (portrait = GitHub avatar, 460×460), intro-poster.jpg,
                           og-image.png (1200×630)
robots.txt, sitemap.xml    SEO (sitemap has no lastmod on purpose: nothing to keep in sync)
_headers                   Security headers and asset caching; the CSP is enforced
wrangler.jsonc             Cloudflare Workers static assets (the folder is the site)
.assetsignore              Files kept off the live site (repo tooling, notes, docs/, .temp/)
.gitattributes             LF line endings for text files, so diffs don't depend on core.autocrlf
docs/                      Not published: caption file to upload to YouTube
```

## Editing content

Read `CLAUDE.md` first: it holds the positioning and the content rules (what must never be published).

- **Experience**: an `<li class="org">` per company, an `<li class="role-item">` per role. Wrap the key number in
  `<strong>`; it gets the highlighter style. Mirror changes in `resume.html`.
- **Projects**: two groups, each an `<h3 class="card-group">` followed by a `<div class="cards">`: professional
  (proprietary) work first, open source second. Copy an `<article class="card">` into the group it belongs to; the
  card title is an `<h4>`. `.callout` is for a single headline result.
- **Writing**: copy an `<article class="post">`. The link goes on the title (`<h3><a>`), and CSS stretches it over the
  whole card. Use the post's own URL (LinkedIn: `···` → *Copy link to post*).
- **Stack**: a chip is an `<li>`; `class="core"` highlights a daily driver, and a `<span class="yrs">` holds the years.
  Only Roger's own figures go there (see `CLAUDE.md`).
- **Diagram**: shapes are inline SVG in `#system`; the text in the panel below it comes from the `NODES` object in
  `js/main.js`. A node's accessible name is its visible text, so don't add an `aria-label` to it.
- **Intro video**: the poster and the chapters are ordinary links to YouTube, so they work without JavaScript; with
  it, a plain click plays the video inside the page. The video id appears in `data-video-id` on `.player` and in each
  of those links; a chapter's start is both in its link (`&t=35s`) and in `data-start` (seconds).
- **Fonts**: to add a weight, add the `.woff2` to `fonts/` and an `@font-face` to `css/fonts.css`. Font files are
  cached for a year as immutable, so a changed file needs a new name. Mono is loaded at 400 and 500 only: use those.

When the headline changes, also update `<title>`, the meta description, Open Graph tags, the JSON-LD block
(including `dateModified`), `resume.html` and `assets/img/og-image.png`. The Excalidraw board URL appears twice in
`index.html` and once in `resume.html`; change all three together.

**Changing the CSP.** `_headers` enforces `Content-Security-Policy`. Everything the pages load is same-origin; the
only third party is the YouTube player, framed after a click. When a change needs a new source (a script, font,
image host or embed), prefer a file in the repository; otherwise add the source to the policy in the same commit. To test a risky change, rename the header to
`Content-Security-Policy-Report-Only`, deploy, open both pages, toggle the theme, play the video from a chapter link
and print the résumé; if the console shows no violations, rename it back.

`_headers` also sends `Strict-Transport-Security` for one year (this host only, no `includeSubDomains`): browsers
that have visited the site will refuse plain HTTP for gelonezi.com until it expires.

## Run locally

```bash
python -m http.server 8000
```

## Deploy

Cloudflare deploys `main` automatically: `wrangler.jsonc` publishes the repository folder as static assets, minus
everything listed in `.assetsignore`. There is no build command.

Cloudflare serves clean URLs: `/resume.html` redirects (307) to `/resume`, and `/index.html` to `/`. In-page links keep
the `.html` form so the local Python server still works; canonical URLs, `og:url` and `sitemap.xml` must use the clean
form (`https://gelonezi.com/resume`).
