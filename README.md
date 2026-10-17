# gelonezi.com

Roger Gelonezi's portfolio, aimed at international recruiters hiring remote Senior/Staff Backend Engineers and
.NET Software Architects. Plain HTML, CSS and JavaScript with no build step and no dependencies.

## Structure

```
index.html                 The portfolio: hero, career highlights, intro video, featured system,
                           what I can own, experience, expertise (modernization / integrations /
                           production), principles & leadership, projects, applied AI, stack,
                           writing, education, contact
resume.html                One-column, ATS-readable résumé; prints cleanly to PDF
css/styles.css             "Architect's blueprint" design; color tokens for both themes at the top
css/resume.css             Résumé styles (light, print-first)
js/main.js                 Theme toggle, mobile menu, active nav, reveal-on-scroll,
                           click-to-load YouTube player, interactive architecture diagram
assets/favicon.svg
assets/img/                roger-gelonezi.jpg (portrait = GitHub avatar, 460×460), intro-poster.jpg,
                           og-image.png (1200×630)
robots.txt, sitemap.xml    SEO
wrangler.jsonc             Cloudflare Workers static assets (the folder is the site)
.assetsignore              Files kept off the live site (repo tooling, notes, docs/)
docs/                      Not published: caption file to upload to YouTube
```

## Editing content

Read `CLAUDE.md` first: it holds the positioning and the content rules (what must never be published).

- **Experience**: an `<li class="org">` per company, an `<li class="role-item">` per role. Wrap the key number in
  `<strong>`; it gets the highlighter style. Mirror changes in `resume.html`.
- **Projects**: copy an `<article class="card">`. `.callout` is for a single headline result.
- **Writing**: copy an `<article class="post">`. Use the post's own URL (LinkedIn: `···` → *Copy link to post*).
- **Diagram**: shapes are inline SVG in `#system`; the text in the panel below it comes from the `NODES` object in
  `js/main.js`.
- **Intro video**: `data-video-id` on `.player`; chapter buttons take a `data-start` in seconds.

When the headline changes, also update `<title>`, the meta description, Open Graph tags, the JSON-LD block,
`resume.html` and `assets/img/og-image.png`.

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
