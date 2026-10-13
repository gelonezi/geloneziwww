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
  already public in github.com/gelonezi/system-design-practices. No proprietary code.
- **Do not invent metrics, technologies, certifications or experience.** Every number on the site comes from his resume
  or from Roger directly. Don't claim Azure/GCP depth, ECS, SNS, blue/green deployments or migration ownership beyond
  what's already stated. When unsure, use conservative wording.
- LinkedIn post cards link to his activity page until he provides each post's own URL; don't guess post URLs.
- Site language: English only.

## Design and engineering constraints

- "Architect's blueprint": dark navy by default, paper-blueprint light theme, IBM Plex Sans/Mono, grid background,
  amber for metrics, cyan accent. New sections use the same vocabulary: `sec-index` label (`NN / Name`), spec tables,
  dashed rules, chips, `.reveal`.
- Keep: interactive architecture diagram, English intro video (local poster first, YouTube on click) and transcript,
  dark/light themes, accessibility (skip link, focus states, reduced motion, labelled controls), mobile layout
  (only the diagram may scroll sideways).
- Static HTML + CSS + vanilla JS only. No frameworks, no build step, no new runtime dependencies.
- Files that must not be served are listed in `.assetsignore`.
