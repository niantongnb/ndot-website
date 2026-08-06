# NDot AI one-pager: handoff

Prototype site for NDot AI's mission and vision. Three design directions, all
live. No build step: every page is one self-contained HTML file plus the county
dataset.

## Live

| URL | What |
|---|---|
| https://niantongnb.github.io/ndot-website/ | Current design. Same file as `/v3/`. |
| https://niantongnb.github.io/ndot-website/v3/ | Street-atlas treatment on paper. The one being iterated on. |
| https://niantongnb.github.io/ndot-website/v2/ | Black and white editorial build, originally from a Codex handoff. |
| https://niantongnb.github.io/ndot-website/v1/ | First take: dark, cinematic, typewriter headline. |

Repo: `niantongnb/ndot-website` (public, GitHub Pages from `main`, root).
Push to `main` and it redeploys in about a minute. Both `noindex` meta and
`robots.txt` are in place so the prototype stays out of search.

## Run locally

```
git clone https://github.com/niantongnb/ndot-website.git
cd ndot-website
python3 serve.py 8899        # http://localhost:8899
```

Use `serve.py`, not `python3 -m http.server`. It sends `Cache-Control: no-store`
and strips `Last-Modified`. Without that, browsers hold a stale copy for a long
time and edits look like they did nothing. This wasted real time twice. When a
change seems not to apply, verify with `curl` before debugging the code.

## Files

```
index.html      the current design (v3). EDIT THIS ONE.
v3/index.html   a copy of index.html. See the sync trap below.
v2/index.html   editorial build, self-contained
v1/index.html   copy of v1.html
v1.html         dark build, source of truth for v1
assets/counties.json   3,142 records: [x, y, sqrt(land_area), "County, ST"]
                       Albers USA space, 975 x 610. v2 and v3 each keep their
                       own copy because the fetch path is relative.
serve.py        local dev server, no-store
```

**Sync trap.** `/` and `/v3/` are two copies of the same page, and `v1.html` and
`/v1/index.html` likewise. After editing `index.html` you must
`cp index.html v3/index.html` and restore its `<title>` and `robots` meta, or
the deployed `/v3/` silently stays on the old build. This has already caused one
"why isn't my change working" cycle. Collapsing `/` to a redirect would remove
the duplication and is worth doing.

## The hero engine (v2 and v3)

One canvas, 3,142 county centroids, one dot per county for the entire
interaction. Nothing is ever cloned.

- Formations: a loose chaotic scatter ("signal field"), the national map, and a
  single state built on demand.
- Clicking a county reforms the dots into that county's own state. Each dot is
  reassigned to one of that state's counties, weighted by land area, and
  scattered inside a disc sized to that county's share of the state's projected
  area, so neighbours overlap into one continuous mass. Clicking again returns.
- Transitions are a quadratic bezier burst out of the click point, staggered so
  dots nearest the cursor leave first.
- Cursor draws sparse connector lines to nearby dots and a boxed county tag that
  flips side near the right edge.
- Idle drift: after 8s without a click the canvas wanders between formations at
  random. Any click hands control back and restarts the countdown.

v2's version came from a Codex handoff package. Its layout, typography,
sections, Lenis scrolling and stacked section covers are Codex's and were left
alone. Only the county engine was replaced, which also closed that brief's own
open item: the old `buildTown()` cloned each county up to seven times into a
synthetic rectangular grid.

## Deliberate decisions, do not "fix" these

- The map oversizes its column and runs under the headline on the left. The
  overlap and the off-frame bleed are wanted. The right edge is deliberately
  kept inside the frame because the east coast carries the silhouette.
- "Signal field" is the chaotic scatter. An even dot lattice was tried and
  explicitly rejected. Do not reintroduce a regular grid.
- The em dash in the vision line is verbatim from the source copy. Keep it.
  All body copy is word for word from the mission and vision document.
- "Platform" is capitalised in v3's headline on purpose.
- v1 has no marquee and no travelling routes. That was a removal, not an
  oversight.

## Traps worth knowing

These all cost a debugging cycle at least once.

- **Markup edits can silently drop panels.** A stray `</div>` matches the
  nearest open element of that type. With `.shell` already closed it matched
  `.stack`, closing the stack early, so two sections fell out of it and rendered
  on top of each other. After any markup edit, re-count `document.querySelectorAll('.stack > .panel')`.
- **The sections use `id="mission"` and `id="vision"`, with no matching class.**
  CSS written as `.mission ...` does nothing at all.
- **Parallax writes `transform`.** Never centre a `data-px` element with
  `transform: translateY(-50%)`; the parallax cancels it. Use flex.
- **`ch` is only 0.432em in Instrument Serif.** ch-based measures misbreak
  headlines. Set display measures in `em` and pick the value between the
  measured widths of the phrases you want on each line.
- **v2's display face has 0.747em of ink per line** (ascent 0.731 + descent
  0.016), and glyphs collide tighter than -0.03em tracking. Any line-height
  below that overlaps.
- **The `.route` SVG does not fill its panel.** It is a replaced element with an
  intrinsic ratio, so `inset: 0` yields roughly 1425x693, not the panel size.
  viewBox coordinates land close to 1:1 on screen.
- **Panel pinning is decided at runtime.** Script measures whether every panel's
  content fits one screen and only then adds `.pinned`. Measure the rendered
  extent of the shell's children, not `scrollHeight` minus padding:
  `scrollHeight` counts padding inconsistently and made the same content measure
  709px unpinned and 820px pinned, which can flip-flop.
- **The Claude browser pane reports `visibilityState: "hidden"`** while being
  inspected, which throttles rAF and makes scroll-driven state look frozen.
  Verify scroll effects with a real browser, not the pane.

## Verification habit

Most of the visual bugs here were found by measuring in the browser, not by
looking. Worth continuing: read computed styles and bounding boxes, sample the
canvas, walk a `Range` character by character to read real line breaks, and
sample points along an SVG path against the copy's rectangles to prove a
decorative line never crosses text.

## Review feedback so far

Received from a colleague reviewing v3:

- "Not a huge fan of the scroll damping, feels like a lot of scroll effort to
  cycle through." Addressed: the dwell spacers between pinned panels were over
  half a screen each of dead scroll and are now 20svh, taking v3 from 5.7
  screens to 4.7 against a floor of 4 for a four-panel stack. v2's Lenis was
  damping hard (lerp .095) and moving less than native per wheel tick (.92); now
  .26 and 1.15.
- Smoothing was then added to v1 and v3 in the animation only. The wheel stays
  native. Cover, scale and parallax ease toward their scroll-derived targets and
  settle for a few frames after the wheel stops. Strength is the `SMOOTH`
  constant, currently 0.2.
- "This is nice" on the overall direction.

## Open items

1. **Mobile is not optimized.** This is the biggest gap. Everything has been
   designed and verified at desktop widths. Layouts do respond and horizontal
   overflow is zero at 390px, but the composition has not been designed for
   small screens. Reviewers are being told desktop only.
2. Collapse `/` and `/v3/` to one file plus a redirect, to kill the sync trap.
3. Decide which direction wins and retire the other two.
4. The routes in v3 hide below 900px wide, because the copy fills the width
   there and no clear band remains for them.
