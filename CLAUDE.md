# CLAUDE.md

Portfolio for Roger Gelonezi, served at https://gelonezi.com. Static HTML/CSS/JS with no build step, deployed by Cloudflare
(Workers static assets, `wrangler.jsonc`) on every push to `main`. See README.md for structure.

## Audience and positioning

International recruiters hiring **remotely** for:

- Senior Backend Engineer / Senior Software Engineer
- Staff Backend Engineer / Staff Software Engineer
- Software Architect (backend / distributed systems)
- Technical Lead / Lead Engineer where appropriate

Primary specialization, in this order: **C#/.NET backend**, distributed systems, AWS, architecture, integrations,
legacy modernization, production engineering, technical leadership, and applied AI.

- Hero positioning: "Senior / Staff Backend Engineer · .NET Software Architect".
- Availability: "Open to Senior / Staff Backend & Software Architect roles · Full-time or B2B contract";
  "Brazil · UTC−3 · English C1 · Remote". Never imply he needs relocation.
- AI strengthens the backend/architect profile; it must not replace it. Do not position him as an ML Engineer.
- **Python is secondary** and mainly AI/ML-related. Never list it as a core/daily-driver language.
- **Front-end frameworks** (React Native, Angular) are supporting experience, not his specialization.
- The FIAP "~20 hours" story must always say the architecture and every change were human-reviewed. AI accelerates;
  it never "replaced two months of engineering".

## Content rules

- **Public contact is LinkedIn** (https://www.linkedin.com/in/gelonezi/), plus GitHub and YouTube links.
  No email address has been authorized for publication; don't add one.
- **Never publish his phone number.** The source resume PDFs contain it; never copy them into the repo.
- An HTML résumé page (`resume.html`) is allowed and intended: experience, skills, education, portfolio links and LinkedIn
  only. No phone, no email, no PDF of the original resumes.
- Never publish private identity information: diplomas, certificates, the FIAP declaration, RG, CPF, date of birth,
  FIAP student ID (RM). Education is text only.
- Never publish or quote the Experian/SOVA personality assessment.
- Keep client details generalized (e.g. "a public prosecutor's office"). The judiciary diagram is the generalized version
  already public in github.com/gelonezi/system-design-exercises. No proprietary code.
- **Do not invent metrics, technologies, certifications or experience.** Every number on the site comes from his resume
  or from Roger directly. Don't claim Azure/GCP depth, ECS, SNS, blue/green deployments or migration ownership beyond
  what's already stated. When unsure, use conservative wording.
- LinkedIn post cards link to his activity page until he provides each post's own URL; don't guess post URLs.
  The Ideathon card has its own URL (Roger supplied it on 2026-11-07).
- Site language: English only.

## Facts Roger confirmed on 2026-11-07 (beyond the résumé)

- The Softplan legacy platform may be called a **Delphi monolith** and the approach the **Strangler Fig pattern**.
- Canonical architecture board: `https://excalidraw.com/#json=a-eHnApUWQOO8Mw825KjP,vkUMiKu2Mo9H3pV9tt0TKg`.
- **Ideathon Lençóis Paulista, 1st place, October 2026**, team concept "Cidade em Dia" (Sebrae for Startups,
  ABStartups, the city's SEDECON; prize included consulting support). It is a winning concept, not a launched product.
  Text only: no event photo (it shows other people).
- **vibe-engineering** (github.com/gelonezi/vibe-engineering) is a project card; describe it from its README only and
  say it is early stage.
- Years per skill in the Stack section are Roger's own counts (from his Proxify profile): C#/.NET 15+, SQL Server 15+,
  ASP.NET 12, PostgreSQL 7, 5 for AWS/Kubernetes/Docker/microservices/RabbitMQ/MassTransit/DocumentDB/MongoDB/
  Elasticsearch/EF Core/REST, Robot Framework 4, Python 4, MLflow and Qdrant 1. Never round these up; do not add a
  figure for a skill he hasn't given one for.
- Job titles match LinkedIn exactly ("Senior Software Engineer" for both 2026 roles); the descriptor goes in the
  date line, never in the title.
- The "Career highlights" section and the "office nightmare" LinkedIn post card were removed on purpose; don't
  reintroduce them.
- Softplan progression (Roger, 2026-11-07): 2021 maintained the legacy system and extracted its use-case rules into
  the new APIs' specifications; 2024 technical reference carrying the architect's responsibilities **without the title** (never write "Architect"
  as a Softplan job title), trained the developers joining the team; 2025 sole
  owner of the on-premises legacy-replacement strategy (configured, ran overnight and verified through observability
  the migrations of "a dozen clients") and trained the support team that took over maintenance. Earlier career:
  hands-on development plus sales and phone support at Solução Informática; tech lead at Lecom; led the
  modernization at Eris (his résumé title there stays "Full-stack Engineer").
- Still pending from Roger: the throttling story (symptom → analysis → change → result). Leave the E-03 dossier's
  wording on autoscaling as it is until he supplies it.

## Design and engineering constraints

- "Architect's blueprint": dark navy by default, paper-blueprint light theme, IBM Plex Sans/Mono, grid background,
  amber for metrics, cyan accent. New sections use the same vocabulary: `sec-index` label (`NN / Name`), spec tables,
  dashed rules, chips, `.reveal`.
- Keep: interactive architecture diagram, English intro video (local poster first, YouTube on click) and transcript,
  dark/light themes, accessibility (skip link, focus states, reduced motion, labelled controls), mobile layout
  (only the diagram may scroll sideways).
- Static HTML + CSS + vanilla JS only. No frameworks, no build step, no new runtime dependencies.
- Files that must not be served are listed in `.assetsignore`. `_headers` and `_redirects` are served by Cloudflare
  as configuration, not as pages; `404.html` is the not-found page (`not_found_handling` in `wrangler.jsonc`).
- `js/theme.js` must stay a blocking `<script src>` before the stylesheet: it is the theme bootstrap and the reason
  the CSP needs no inline-script hashes. Never move it back inline.
- `.temp/` holds private context exported from other AI chat sessions (it contains his phone, email, salary figures and
  other companies' names). It is git-ignored and asset-ignored and is **never a publishable source**: anything in it
  that isn't in his résumé needs Roger's explicit confirmation before it goes on the site.
