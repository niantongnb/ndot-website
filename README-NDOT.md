# NDot AI — website

Two design directions for the NDot AI site, three layouts each. Every version is
a working HTML mockup, not a picture: static, dependency-free, no build step for
development. Google Fonts is the only external request.

```
index.html        the chooser: both directions, three rounds each
editorial/1|2|3/  the editorial direction
systems/1|2|3/    the systems direction
src/ndot-css/     shared stylesheet base + one layout layer per round
deploy/           build script, robots.txt, _headers
serve.py          no-store dev server
```

Each version folder holds `index.html`, `careers.html` and `site.css`.

## Run it

Browsers block `fetch()` on `file://`, and they cache hard during iteration, so
use the no-store server rather than `python3 -m http.server`:

```bash
python3 serve.py 8000
# http://localhost:8000/
```

## The six

Same copy, same brand rules, in all six. The **direction** decides how much of
the argument is carried by type and how much by graphics. The **round** is a
different page geometry, not a restyling of the same one: the grid, what is
pinned, and how the page advances all change.

| | Editorial | Systems |
|---|---|---|
| **1** | The page. Two-track document, sticky section rail on the left, one field of content. | The system. The same two-track document with a graphic in every section. |
| **2** | Broadsheet. Centred nameplate, four-column front page, the lead three columns wide with the record boxed in the fourth. Nothing sticky. On a 6px baseline grid. | Facing Pages. The viewport as a spread: the left leaf is a caption that changes as each right-hand plate scrolls past. One scrollbar, no script. |
| **3** | Broadside. One centred 660px measure, printed dark, nothing in the margins. | Panels. Every section a full-viewport plate, dark end to end, advancing a screen at a time. |

Inside any version, the bar in the bottom-right corner switches direction and
round. **It is a review tool, not part of the design.** Strip it before launch:
search for `vswitch` and remove the CSS block and the one `<nav>` per page.

## Stylesheets are generated

```bash
bash src/ndot-css/build.sh
```

`site.css` for rounds 2 and 3 is `src/ndot-css/base.css` plus one layout layer.
The base holds tokens, type scale, components, motion and the review switcher
and is byte-identical across those four, so the layout layer is provably the
only difference. Round 1 of each direction predates the split and keeps its own
self-contained stylesheet.

**Do not edit those `site.css` files by hand.** Edit the source and rebuild.

## Deploy

```bash
bash deploy/build.sh     # assembles _site/
```

- **Cloudflare Pages**: build command `bash deploy/build.sh`, output `_site`,
  root `/`, production branch `main`.
- **GitHub Pages**: point the workflow at the same script.

The repo root is deliberately not published. `deploy/build.sh` leaves behind the
per-folder `CLAUDE.md` notes, `serve.py` and `src/`, and fails the build if any
of them reach the output, if a version is missing a page, if the source copy is
missing, if a page lacks its `noindex` tag, or if any Nearby / county /
local-geography content appears.

Every page ships `noindex, nofollow` and the build writes `robots.txt` with
`Disallow: /`. Unlisted, not secret. For real access control put the project
behind Cloudflare Access.

## Rules that do not change

Read `editorial/1/CLAUDE.md` first, then the notes in whichever folder you are
editing. The short version:

- **NDot is not Nearby.** Two separate companies. NDot AI is a B2B growth
  platform for media companies; Nearby AI is consumer local-life and lives in
  its own repo. **There is no map on NDot and there must never be one.** Also
  barred: pins, globes, coordinates, dot fields, and the words *near, local,
  around, nearby, neighborhood, coverage*. The deploy build enforces this.
- **Copy is verbatim** from the source document, em dashes included. Do not
  reword, resequence or tighten any of it. Only UI chrome is authored here.
- **No invented figures.** The source supports "more than a decade", "tens of
  millions" and "hundreds of millions". Do not convert those into fabricated
  precise numbers.
- **No copy behind script.** Every word is readable with JS disabled, with rAF
  suspended, and under `prefers-reduced-motion`. Motion is load-time only, and
  every keyframe both starts and ends at the resting state.
- **Verify by measuring**, not by looking. Contrast, tap targets, overflow and
  vertical rhythm are all computed, never eyeballed.

## Still open

1. **Team content.** Six placeholder records per version. Names, roles, bios and
   photographs are all template text and must be replaced before launch. Each
   `.plate` is the photo swap point, 4:5.
2. **The logo.** `editorial/1/assets/` holds *reconstructions* built from exact
   Figma bounding boxes, not the real exports. Replace both files and the inline
   `<svg>` in the `.brand` links, keeping `fill="currentColor"`.
3. **The domain.** The brief titles the company "NDot.ai" and gives
   `career@ndot.ai`; an older site used `career@ndotai.com`. `ndot.ai` is used
   throughout. Needs confirming.
4. **One page or two.** Built as two pages, with `careers.html` self-contained
   so collapsing it into a home-page section is a small change.
