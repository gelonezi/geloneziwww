# gelonezi.com

Roger Gelonezi's portfolio: a single static page aimed at recruiters hiring remote Staff Engineers and Software Architects.
Plain HTML, CSS and JavaScript with no build step and no dependencies.

## Structure

```
index.html                 All content: hero, intro video, featured system, experience,
                           principles, projects, stack, writing, education, contact
css/styles.css             "Architect's blueprint" design; color tokens for both themes at the top
js/main.js                 Theme toggle, mobile menu, active nav, reveal-on-scroll,
                           click-to-load YouTube player, interactive architecture diagram
assets/favicon.svg
assets/img/                roger-gelonezi.jpg (portrait), intro-poster.jpg, og-image.png (1200×630)
robots.txt, sitemap.xml    SEO
docs/                      Not linked from the page: caption file to upload to YouTube
```

## Editing content

Everything lives in `index.html`; repeatable blocks have a comment explaining what to copy.

- **Experience**: an `<li class="org">` per company, an `<li class="role-item">` per role. Wrap the key number in `<strong>`; it gets the highlighter style.
- **Projects**: copy an `<article class="card">`. `.callout` is for a single headline result.
- **Writing**: copy an `<article class="post">`. Use the post's own URL (LinkedIn: `···` → *Copy link to post*).
- **Diagram**: shapes are inline SVG in `#system`; the text in the panel below it comes from the `NODES` object in `js/main.js`.
- **Intro video**: `data-video-id` on `.player`; chapter buttons take a `data-start` in seconds.

When the headline changes, also update `<title>`, the meta description, Open Graph tags, the JSON-LD block and `assets/img/og-image.png`.

## Run locally

```bash
python -m http.server 8000
```

## Deploy

The domain's DNS is on Cloudflare, so **Cloudflare Pages** is the shortest path: connect the repository, leave the build command empty, set the output directory to `/`, then add `gelonezi.com` as a custom domain.
GitHub Pages works too: add a `CNAME` file containing `gelonezi.com` and point the DNS at GitHub.
