# Design spec

This describes the design as built. The screenshots in `docs/reference/` are the visual source of truth; this file explains the intent and the rules behind them.

## 1. Intent

**Subject.** A personal site for an engineer turned development practitioner who leads a women-in-tech nonprofit in Nepal and works on inclusion, digital rights, data, and internet governance.

**Audience.** Partners, event organizers who might invite her to speak, journalists, collaborators, and prospective fellows. Many will use phones on variable connections.

**Primary jobs.** (1) Show clearly what Nhasala does and has built. (2) Make it easy to invite her to speak or collaborate. (3) Give organizers a ready speaker kit.

**Character.** Warm, confident, editorial. Purple-led palette built on the suffrage colors (purple, white, green, gold) plus a reclaimed magenta, so it reads as feminist without defaulting to pink. One color per area of work is the organizing idea. It should not look like a startup landing page or an NGO brochure.

**What to avoid** (calibrated against generic generated design): cream-and-terracotta palettes, monospace data labels, all-caps eyebrow labels, numbered markers on non-sequences, arrows in link text, middle dots between meta items, gradient washes as decoration, heavy shadows, scroll-triggered fade-ins.

## 2. Design tokens

All tokens are CSS custom properties at the top of `assets/css/main.css`.

### Color

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FBF8FD` | Page background (lavender-white) |
| `--surface` | `#FFFFFF` | Cards, glance band |
| `--tint` | `#F3ECF8` | Alternate section background |
| `--text` | `#2A0F3F` | Body text (aubergine) |
| `--muted` | `#5E4A6E` | Secondary text |
| `--line` | `#DDD2E6` | Borders and dividers |
| `--ink` | `#2A0F3F` | Header, hero, CTA, footer backgrounds |
| `--ink-2` | `#3D1A57` | Hover on ink buttons, illustration panel |
| `--on-ink` | `#FBF8FD` | Text on ink |
| `--on-ink-muted` | `#D3C5E2` | Secondary text on ink |
| `--focus` | `#5B21B6` | Focus outline on light (on ink it becomes gold) |

### Areas of work (one color each)

| Area | id | Color | Tint |
|---|---|---|---|
| Community and ecosystem building (lead area) | `community` | `--c-community` `#F5B82E` gold | `--t-community` `#FDF0CF` |
| Inclusion | `inclusion` | `--c-inclusion` `#E0408F` magenta | `--t-inclusion` `#FCDDEB` |
| Digital rights, data, and civic tech | `data` | `--c-data` `#16906A` green | `--t-data` `#D7F0E6` |
| Internet governance | `governance` | `--c-governance` `#8B5CF6` violet | `--t-governance` `#E7DEFB` |

Apply with the classes `.p-community`, `.p-inclusion`, `.p-data`, `.p-governance`. They set `--pc` (color) and `--pt` (tint) for the element and its children.

Rules:
- Pillar colors are never used for text. Every area is also named in words (badge label, heading), so color is never the only signal.
- On the dark ink background, brighter variants are used for the banner band and the CTA rule: green `#2FBF8F`, violet `#A98BFA`. Gold and magenta are unchanged.
- Text pairs meet WCAG AA. Re-check any new pair.

### Type

| Role | Family | Notes |
|---|---|---|
| Display (headings, tagline, statements) | Bricolage Grotesque, 500 and 700 | `--font-display`, tight tracking (-0.015em to -0.035em) |
| Text | Atkinson Hyperlegible, 400, 700, 400 italic | `--font-text`, chosen for legibility by low-vision readers |
| Devanagari | Noto Sans Devanagari | In both font stacks as a fallback. Load the web font when Nepali content is added. |

Scale (fluid):

| Element | Size |
|---|---|
| Body | 1.125rem (18px), line-height 1.65 |
| Hero h1 | `clamp(2.7rem, 8.4vw, 6.25rem)`; from 52.01rem up `clamp(2.6rem, 5.4vw, 4.75rem)` |
| Page h1 | `clamp(2.4rem, 6.5vw, 4.25rem)` |
| h2 | `clamp(1.7rem, 3.6vw, 2.4rem)` |
| h3 | 1.25rem (card and row titles 1.15 to 1.4rem) |
| h4 | 1.05rem, muted |
| Lede | `clamp(1.15rem, 2.2vw, 1.4rem)`, muted |
| Statement | display face 500, `clamp(1.2rem, 2.4vw, 1.5rem)`, max 44ch |

Line length: prose capped at 62 to 68ch.

### Space, shape, layout

- Container `.wrap`: max 1120px, horizontal padding `--gutter` = `clamp(1rem, 4.5vw, 2.25rem)`.
- Section rhythm `.band`: vertical padding `clamp(2.75rem, 7vw, 5rem)`.
- Radius `--radius` 6px for images, cards, tiles, and panels. Buttons are pills (999px). Icon buttons are circles.
- No box shadows. Depth comes from color blocks, borders, and the pillar-colored top or left edge.
- Alternate section backgrounds: `--bg`, `--tint`. Hero, CTA, header, and footer use `--ink`.

### Breakpoints (rem)

| Breakpoint | Behavior |
|---|---|
| max 52rem (832px) | Menu collapses behind a "Menu" button (when JS is on); hero illustration hidden; tiles and about columns stack |
| min 52.01rem | Hero becomes two columns with the illustration; tiles become 3 across with the lead tile full width; about page becomes two columns with a sticky aside; area blocks become two columns |
| min 40rem (640px) | `.row` and `.entry` gain a left meta column (11rem and 12.5rem) |
| min 64rem (1024px) | `.entry` gains a third column for the project image (15rem) |

Test widths: 320, 390, 768, 1024, 1280, 1440.

### Motion

None, except `scroll-behavior: smooth` when the user has not asked for reduced motion. Do not add scroll-triggered or hover animations without asking. Hover states are color, underline thickness, and outline changes only.

## 3. Components

All class names are in `assets/css/main.css`. Markup lives in `_includes/` and the page files.

| Component | Classes and file | Behavior and rules |
|---|---|---|
| Header | `.site-header.on-ink`, `.brand`, `.nav`, `.hbtn.nav-toggle` in `_includes/header.html` | Sticky, ink background. Brand is text only. Current page marked with `aria-current="page"` and a gold underline (a gold left bar in the mobile menu). The menu button appears only when JS is on and width is 52rem or less. Escape closes it. |
| Hero | `.hero`, `.hero__inner`, `.hero__text`, `.hero__art`, `.hero--image` in `index.html` | Ink background, h1, gold subline, short lede, two buttons. A four-color band (`.hero::after`) runs along the bottom. Optional photo via `hero_image` in config adds `.hero--image` with a dark overlay (82% ink). |
| Hero illustration | `_includes/hero-art.html` (`svg.hero-art`) | Decorative, `aria-hidden`. People in different shapes and colors connected by dotted lines to a shared screen showing a bar chart, two chat bubbles, a shield badge, code brackets, and a globe. Uses the palette literally. Shown from 52.01rem up. |
| At a glance | `.glance-band`, `.glance` | One sentence with three figures in display type; the figures carry a pale gold underline. |
| Section heading rule | `main h2::after` | A 4.5rem by 6px four-color rule under every `h2` in `main` except `.row__year`. On `.cta` it uses the brighter ink-background colors. |
| Area tiles | `.tiles`, `.tile`, `.tile--lead`, `.tile__ring`, `.tile__text` in `_includes/tile.html` | The whole tile is one link to `/about/#<area id>`. Tinted background, pillar-colored top edge, ring glyph in the corner, name, one-line summary, underlined "Explore this area". The lead tile (community) spans all columns and is larger. |
| Project cards | `.cards`, `.card` in `_includes/card.html` | Equal cards in an auto-fit grid (min 15rem). Image slot (16:10), area badge, title, role and years, summary, "Learn more". The whole card is clickable through a stretched pseudo-element on the title link; "Learn more" is `aria-hidden` text, not a second link. Focus shows an outline around the whole card. |
| Badge | `.badges`, `.badge` in `_includes/badge.html` | Pillar tint background, colored dot, area label. Renders as `<li>`; always place inside `<ul class="badges">`. |
| Draft flag | `.draft` in `_includes/flag.html` | A small dashed "Check" tag on any item with `verified: false`, shown only while `show_draft_flags` is true. |
| Image placeholder | `.ph` in `_includes/placeholder.html`, `_includes/portrait.html` | Dashed box with a label. Replaced by a real image when the data field is filled. |
| Rows | `.rows`, `.row`, `.row__year`, `.row__title`, `.row__meta`, `.rows--compact` | Left meta column (year or label), right content, hairline dividers. Used for writing, talks, roles, recognition, contact options. |
| Buttons | `.btn`, `.btn--gold`, `.btn--line`, `.btn--ink`, `.btn--sm` | Pills, 48px minimum height (44px for small). Gold and line variants are for ink backgrounds; ink for light backgrounds. |
| Text link | `.textlink` | Bold, underlined. Link text names the destination with no arrow glyph. |
| CTA band | `.cta.on-ink` | Large invitation heading and one gold button. |
| Footer | `.site-footer`, `.footer__tagline`, `.footer__links`, `.icon-link`, `.footer__base` | Tagline left; email and LinkedIn as 48px circular outline icon buttons right (icon-only, with `aria-label` and `title`); license line below. |
| About layout | `.about`, `.about__aside`, `.about__main`, `.facts`, `.path` | Portrait slot and quick facts in a sticky left column on wide screens; story and a four-step vertical path (engineer, community builder, institution leader, policy voice) on the right. The path is a real sequence, so a timeline is appropriate there. |
| Area block | `.area-block`, `.area-block--lead`, `.area-block--plain`, `.area-cols`, `.inline-list`, `.statement` | One per area on the About page, with an anchor id equal to the area id. The community block has a gold left edge and tinted background. Heading sticks on the left on wide screens. |
| Projects page | `.filters`, `.chip`, `.count`, `.entries`, `.entry`, `details`, `.steps` | Filter chips (JS only). Each entry has a meta column, body with a "Problem, approach, and result" disclosure, and an image slot. `:target` gives the entry a white background. |
| Speaker kit | `.topics`, `.bios`, `.bio`, `.copy-status` | Topics list, short and long bio each with a copy button, a status line announced politely to screen readers. |

## 4. Pages

Reference screenshots: `docs/reference/<page>-desktop.png` and `<page>-mobile.png`.

### Home (`index.html`)
1. Hero (see above).
2. At a glance sentence.
3. "Four areas of work": tiles from `_data/pillars.yml` (community is the lead tile).
4. "Selected projects": heading with "See all projects" link at the right, then cards for every project with `featured: true` (one per area, so four).
5. "Recent writing": first three items of `_data/writing.yml`, then a link to the writing page.
6. CTA band "Invite Nhasala to speak, advise, or collaborate."

### About (`about.html`)
1. Page head with lede.
2. Two columns: portrait slot and facts (`_data/about.yml` glance) beside four paragraphs of story and the four-step path (`_data/about.yml` path).
3. "Areas of work" (`id="areas"`): intro line, then one `.area-block` per area with the statement, "What this looks like" (`looks_like`), "Expertise" (`_data/expertise.yml`), "Organizations" (`orgs` mapped to `_data/organizations.yml`), "Selected projects" (projects whose `pillar` matches, linked to `/projects/#<project id>`), and a link to the filtered projects page. A final plain block lists "Leadership and operations".
4. "Roles and affiliations": rows from `_data/organizations.yml`.

### Projects (`projects.html`)
Filter chips (All plus the four areas), a live count, then one `.entry` per project from `_data/projects.yml`. Filtering is by hash (`#community`, `#inclusion`, `#data`, `#governance`); any other hash matching an entry id scrolls to that entry with all projects visible. Without JS, all entries show.

### Writing and speaking (`writing.html`)
Publications (`_data/writing.yml`), Speaking and convening (`_data/talks.yml`), Speaker kit (`_data/kit.yml`: topics, short and long bio with copy buttons, downloads placeholders), Recognition (`kit.yml`). Section ids: `publications`, `speaking`, `speaker-kit`, `recognition`.

### Contact (`contact.html`)
Four collaboration types (speaking, advisory, partnerships, mentoring), each with a `mailto:` link and a prefilled subject. A list of what to include in a first message. Email and LinkedIn. An accessibility contact line. No form, no phone number.

### 404 (`404.html`)
Short message and three links.

## 5. Interaction (`assets/js/main.js`)

1. **Menu toggle.** `.nav-toggle` toggles `.nav-open` on the header and `aria-expanded`. Escape closes and returns focus. Clicking a nav link closes it.
2. **Project filter.** Reads and writes the URL hash with `history.replaceState`. Updates `aria-pressed` on chips and the polite count text. Responds to `hashchange`.
3. **Copy buttons.** `[data-copy="<element id>"]` copies that element's text with the Clipboard API, falls back to `execCommand`, and announces the result in `[data-copy-status]`.
4. The `js` class is added to `<html>` by an inline script in `head.html`; CSS uses `.js` to show or hide enhancements.

## 6. Accessibility requirements

- Skip link to `#main`; one `h1` per page; headings in order; landmarks labelled (`aria-label="Main"`).
- Visible focus on every interactive element (3px outline, offset 3px).
- Touch targets at least 44px.
- Reduced motion respected. No autoplay.
- Images: meaningful images need alt text from the data fields; the illustration and ring shapes are decorative (`aria-hidden`).
- Color is never the only signal.
- Works at 200% zoom and 320px width without horizontal scroll.
- Target: Lighthouse accessibility 100, no axe violations.

## 7. SEO and sharing (`_includes/head.html`)

Title pattern `Page | Nhasala Joshi` (home: `Nhasala Joshi: Building inclusive tech ecosystems`). Meta description, canonical URL, Open Graph and Twitter card tags using `assets/img/og.png` (1200 by 630, currently a placeholder), `rel="license"`, and a schema.org `Person` JSON-LD block (job title, employer WLiT, location, LinkedIn). `robots.txt` and the `robots` meta tag follow `robots_noindex`. `jekyll-sitemap` generates the sitemap.

Disambiguation matters: other organizations use the acronym WLiT, so spell out "Women Leaders in Technology (WLiT), Nepal" wherever it first appears on a page.
