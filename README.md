# nhasala joshi: personal site

Jekyll site for GitHub Pages. See `CONTRIBUTING.md` for rules and `docs/DESIGN_SPEC.md` for the design.

    bundle install
    bundle exec jekyll serve

Then open http://localhost:4000.

## Editing content
| What | File |
|---|---|
| Areas of work | `_data/pillars.yml` |
| Projects (set `featured: true` to show on home) | `_data/projects.yml` |
| Publications | `_data/writing.yml` |
| Talks | `_data/talks.yml` |
| About story, facts, path | `_data/about.yml` |
| Expertise | `_data/expertise.yml` |
| Organizations | `_data/organizations.yml` |
| Speaker kit, bios, recognition | `_data/kit.yml` |
| Email, LinkedIn, hero photo, flags | `_config.yml` |

Set `verified: true` on an item once its details are confirmed to remove the "Check" flag.

## Deploy
Push to `main` and enable GitHub Pages (Settings, Pages, deploy from branch `main`, folder `/`).

Leave `url` and `baseurl` unset in `_config.yml`. GitHub Pages fills them in, so assets load correctly under a project path such as `/nj/`.
