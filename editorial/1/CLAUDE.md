# NDot AI website mockup

> There is a second, more visual take at `../ndot-site-v2/`. This folder is
> v1 and is kept as it is; the two are meant to be compared side by side.

The **NDot AI** marketing site, built as an HTML mockup (the workflow is:
HTML mockup first, then push to Figma). Two pages, no build step, no
framework, no animation.

```
index.html    home
careers.html  careers
site.css      shared tokens + components (both pages link it)
assets/       wordmark.svg, mark.svg (see "The logo" below)
serve.py      no-store dev server (browsers cache hard during iteration)
```

```bash
python3 prototypes/ndot-site/serve.py 8000
# http://localhost:8000/prototypes/ndot-site/
```

---

## Read this first: NDot is not Nearby

Two separate companies, two separate sites.

- **Nearby.ai**: consumer local-life AI. Geographic, atmospheric, built around
  a 3,142-county dot map. Lives in the `ndot-website` repo (v1–v4) and in
  `nearby-site/`. **Nothing here derives from it.**
- **NDot.ai**: B2B growth platform for media companies. This site.

**There is no map on NDot, and there must never be one.** A dot map means
"local geography", which is exactly what NDot is no longer about. Also barred:
pins, globes, coordinates, scatter/dot fields, and the words *near, local,
around, nearby, neighborhood, coverage*.

## Direction: the site is set as a publication

NDot sells the infrastructure publishers run on, so the page argues by being
properly set rather than by describing itself. Masthead, numbered folios
(`§ 01`–`§ 05`), a ruled index of capabilities, a black spread spent entirely
on proof, a colophon. Every element on the page is exactly one of four things:
**TYPE, a RULE, a piece of DATA, or a numbered record.** No gradient, no
shadow, no illustration, no icons, no hero image.

Chosen from four competing directions scored by three independent judges
(editorial / instrument-panel / Swiss-grid / dot-lattice). The dot-lattice idea
scored worst on every lens, because it reads as the sister company's map.

**Layout is a two-track page** at ≥1200px: `rail | void | field`
(200px / 88px / rest). The rail carries the folio and the section label and is
`position: sticky`; the field carries everything else and has a 1px spine on
its left edge. Below 1200px the rail collapses to a horizontal folio band above
the content. **The rail's label element IS the section's `<h2>`**, which is why no
section needs an invented headline.

## Copy is verbatim and must stay that way

Every sentence of marketing prose is lifted **exactly** from the client's
source document, **em dashes included**. Do not reword, resequence, or
"tighten" any of it. Only UI chrome is authored here: nav labels, button
labels, folio labels, and the clearly-marked team placeholders.

Nothing invented is allowed in the proof block either. The source supports
*"more than a decade"*, *"tens of millions"* and *"hundreds of millions"*, so
those exact phrases are set at display size. **Do not convert them into
fabricated precise figures** ("12 years", "45M users"). That was a deliberate
call over the more scannable numeral treatment.

The seven capabilities are a fixed list in a fixed order. Seven is an awkward
number for a grid, which is why it is a **numbered ruled index (01–07)** rather
than a card grid: an index absorbs any count without an orphan cell.

## Motion: there is none

No `requestAnimationFrame`, no `IntersectionObserver`, no scroll listener, no
reveal animation, no count-up. The only JS on either page is two lines that add
`.embed` when the page is framed by the repo gallery.

This is deliberate, and it is also a safety property: **no copy is gated behind
script**, so everything is readable with JS disabled or with rAF suspended (the
Claude browser pane reports `visibilityState: "hidden"`, which suspends rAF, so
scroll-driven reveals silently fail there). If you add motion later, animate
rules, never text, and make the CSS default the *finished* state.

Only interaction feedback transitions (hover/focus, 120ms), and everything is
killed under `prefers-reduced-motion`.

## The logo

`assets/wordmark.svg` and `assets/mark.svg` are **reconstructions**, and both
pages inline the wordmark rather than fetching it.

The real files live in `ndot-site/assets/` on the designer's machine, exported from the
Figma "NDot Branding" file (`7tMyZgOKIFOtOFZEaexuAy`, node `11295-2` wordmark,
`11295-13` mark). This session could not download them: `www.figma.com` is
blocked by the sandbox egress policy, so the Figma MCP could return the node's
*structure* and a *screenshot* but not the asset bytes.

The reconstruction is faithful, not guessed. Figma gave exact bounding boxes
for every glyph, and the N is exactly what Figma describes: two stems
(78.325 × 313.3) plus an 85.136-wide bar rotated −30°. The `d`, the dot and the
`t` were rebuilt from their measured boxes as geometric primitives and checked
against the Figma render at matched scale.

**To swap in the real artwork:** replace the two files in `assets/`, then
replace the inline `<svg>` in the `.brand` links (2 per page) with the real
paths. Keep `fill="currentColor"` so the mark inverts on the dark footer.

## Palette

The brand's source of truth is **pure black and white**: the Figma branding
file defines no colour variables at all. So the site is achromatic apart from
one printer's red (`--accent #A6231A`) used as *editorial chrome*: folios,
ordinals, the role line, hover ticks and underlines. Under 2% of page surface.

**Delete `--accent` and `--accent-ink` and the site is fully achromatic.** That
is a one-token change if the client wants it.

Two hard rules, both encoded in comments at the tokens:
- `--accent` is **banned inside an inverted band** (2.55:1). Use `--accent-ink`
  (`#E86A52`, 5.80:1) there.
- Never use a low-alpha `rgba` hairline on the dark band. `--rule-ink #6A6A63`
  is 3.38:1 and clears SC 1.4.11; the earlier value was 1.37:1 and was
  effectively invisible.

Every ratio in the stylesheet comments is computed, not eyeballed.

## Verify by measuring, not by looking

`measure.js` in this folder loads both pages at 390/768/1440 in headless Chromium and
reports: horizontal overflow, zero-size text nodes, elements rendering outside
the document box, computed font sizes, and computed contrast for every sampled
pair.

Run it after any change. It has already caught one bug that looked completely
fine on screen: **every `clamp()` with math inside was being dropped**, because
`clamp(30px,1.1rem+3.3vw,60px)` is invalid CSS, because `+` and `-` inside CSS math
require surrounding whitespace. `h1` was silently falling back to the UA default
2em at *every* viewport. Nothing about the rendered page looked wrong.

## The version switcher, and why only two cards are listed

There are **six** NDot folders, three rounds per direction:

| | R1 | R2 | R3 |
|---|---|---|---|
| Editorial | `ndot-site` | `ndot-edit-r2` | `ndot-edit-r3` |
| Systems | `ndot-site-v2` | `ndot-sys-r2` | `ndot-sys-r3` |

The repo gallery lists **two** of them, one card per direction (`ndot-site` and
`ndot-site-v2`). Six near-identical cards read as six products rather than two
directions explored three ways, which is not the question being asked. The other
four are simply unlisted, not removed: `deploy/build.sh` copies all of
`prototypes/`, so every round still deploys at its own URL and `/ndot/` still
links all six.

Getting between them is a fixed bar in the bottom-right corner of every page,
`nav.vswitch`. Two pairs: the direction (Editorial / Systems, jumps across at
the same round) and the round (1 / 2 / 3, moves within the direction). The lit
cell of each pair is where you are, so the bar doubles as the label for which
version is on screen. Links are relative and keep the page, so careers goes to
careers.

It is a **review tool, not part of the design**. It carries its own colours
rather than the theme's so it looks identical on the light and the dark
rounds, it is hidden in the gallery cards (`body.embed`) and in print, and it
is meant to be deleted before launch: search for `vswitch` across
`prototypes/ndot-*/` and remove the CSS block and the one `<nav>` per page.

## Open questions for the client

1. **One page or two.** An earlier stakeholder note asked for "a simple website
   without animation and only one front page"; that predates the repositioning,
   and the new brief
   demands a full careers page. Built as two pages, with `careers.html` fully
   self-contained so collapsing it into a home-page section is a small change.
   No animation either way, which honours the rest of that note.
2. **The domain.** The brief titles the company "NDot.ai" and gives
   `career@ndot.ai`; the old site used `career@ndotai.com`. `ndot.ai` is used
   throughout here. Needs confirming.
3. **Team content.** Six placeholder records. Names, roles, bios and photos are
   all template text and must be replaced.
