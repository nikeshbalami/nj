# Contributing

Personal website for Nhasala Joshi, hosted on GitHub Pages.

## Stack
- Plain Jekyll built with the `github-pages` gem. Plain CSS (`assets/css/main.css`), plain JavaScript (`assets/js/main.js`).
- No frameworks, no build tools, no npm in the repo.
- Content lives in `_data/*.yml`. Markup lives in `_includes/`, `_layouts/`, and the page files.
- Design reference: `docs/DESIGN_SPEC.md` and the screenshots in `docs/reference/` (the visual source of truth).

## Run locally
    bundle install
    bundle exec jekyll serve

## Hard rules (ask the owner before reversing any of these)
- Never name donors, funders, agencies, banks, embassies, or ministries.
- Write about Nhasala in the third person.
- No dark mode.
- No em dashes or en dashes anywhere, in content, code, or comments.
- Never turn off `robots_noindex` or `show_draft_flags` in `_config.yml`.
- Spell out "Women Leaders in Technology (WLiT), Nepal" at first mention on each page.
- Do not invent facts. Unconfirmed items carry `verified: false` and show a "Check" flag.
- Pillar colors are never used for text, and color is never the only signal.
- No motion beyond smooth scrolling, no shadows, no gradient washes.

## Before committing
- `bundle exec jekyll build` succeeds.
- No dashes: `grep -rnP '[\x{2013}\x{2014}]' --exclude-dir={vendor,_site,.git} .` returns nothing.
- Check 320, 390, 768, 1024, 1280, and 1440 widths for overflow, and run axe.
