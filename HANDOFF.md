# NDot AI one-pager: handoff

Prototype site for NDot AI's mission and vision. Four design directions. No build
step: every page is one self-contained HTML file plus the county dataset.

## Live

| URL | What |
|---|---|
| https://niantongnb.github.io/ndot-website/ | Current design. Same file as `/v3/`. |
| https://niantongnb.github.io/ndot-website/v4/ | **New.** Static hero, one page. The one Rebecca picked the direction for. |
| https://niantongnb.github.io/ndot-website/v3/ | Street-atlas treatment on paper. |
| https://niantongnb.github.io/ndot-website/v2/ | Black and white editorial build, from a Codex handoff. v4's parent. |
| https://niantongnb.github.io/ndot-website/v1/ | First take: dark, cinematic, typewriter headline. |

Repo: `niantongnb/ndot-website` (public, GitHub Pages from `main`, root).
Push to `main` and it redeploys in about a minute. Both `noindex` meta and
`robots.txt` are in place so the prototype stays out of search.

## Run locally

```
python3 serve.py 8899        # http://localhost:8899
```

Use `serve.py`, not `python3 -m http.server`. It sends `Cache-Control: no-store`
and strips `Last-Modified`. Without that, browsers hold a stale copy and edits
look like they did nothing. This wasted real time twice. When a change seems not
to apply, verify with `curl` before debugging the code.

All four need the server. v4 inlines its map rather than fetching it, but it is
v2 underneath and so still pulls Lenis from a CDN, which `file://` will not do.
The scrapped v4 ran from `file://`; this one does not.

## Files

```
index.html      the current design (v3). EDIT THIS ONE.
v3/index.html   a copy of index.html. See the sync trap.
v2/index.html   editorial build, self-contained
v1/index.html   copy of v1.html
v1.html         dark build, source of truth for v1
v4/index.html   v2 with a still hero. Map inlined; Lenis still from CDN.
assets/counties.json   3,142 records: [x, y, sqrt(land_area), "County, ST"]
                       Albers USA space, 975 x 610. v2 and v3 each keep their
                       own copy because the fetch path is relative.
serve.py        local dev server, no-store
```

---

## v4 — v2 with the hero held still

**v4 is `v2/index.html` with exactly one change:** the hero's county-dot map is a
static inline SVG instead of the animated canvas. Nothing else differs.

That is the whole brief. Rebecca picked v2 and asked for it without the animation;
the animation she means is the hero's, removed totally, and everything else v2
does is wanted. Two earlier attempts got this wrong in opposite directions: the
first stripped every trace of motion from the page, and the second rebuilt the
layout from scratch and then tried to re-add v2's motion piece by piece. Both
were more work than the real job and neither matched v2. Keep the diff small and
it stays easy to re-derive.

### Re-deriving it from a newer v2

- `#map-stage`: swap `<canvas id="cv">` and `<div id="tip">` for the baked
  `<svg viewBox="0 0 975 610">` of 3,142 `<circle>`s.
- Delete the county engine from the script: the `DATA` array, the `cv`/`ctx`/
  `tip`/`phase`/`mapDetail` handles, `STATE_NAMES`, `ease`, `rand`, and the whole
  block from `build()` through `addEventListener("resize",build)`. **Keep `clamp`,
  `lerp` and `reduce`** — the scroll code below still uses them.
- `boot()` becomes `sizeStackScenes(); requestScrollEffects();`.
- CSS: drop the `#tip` rules, drop `cursor:crosshair` from `#map-stage` (it is no
  longer clickable, so the affordance would be a lie), and drop the
  `animation:pulse` on `.hero-instruction::before` plus `@keyframes pulse`.
- The hero foot's "Click a state. Its dots reform into local blocks." becomes the
  static counties caption. Nothing on the page should still invite a click.

### What stays, because it is v2

The parallax, the staggered mission-title reveal, the scroll progress bar, the
stacked scenes, Lenis, the vision constellation with its travelling dashes and
its four nodes, every hover state, and all the copy. **Do not strip any of it.**
`grep -c` against v2 is the check: constellation 18, lenis 13, scroll-progress 3,
sectionShift 11, stack-scene 10, node 28. v4 should match v2 on all of them.

The hero is the only thing that should differ:

```
grep -c '<canvas' v4/index.html                 # 0
grep -o '<circle cx=' v4/index.html | wc -l     # 3142
grep -c -iE 'click a state|cursor:crosshair'    # 0 (comments aside)
```

**The map itself** is 3,142 `<circle>` elements in the Albers `975 x 610` space
the other versions use, generated once from `assets/counties.json`. Radius is
`1.05 + (sqrt_land_area / 47) ** 0.62 * 1.55`: sub-linear, so land area still
reads as information without shouting. Sixteen distinct radii result. To
regenerate, rebuild the contents of `<svg viewBox="0 0 975 610">`; nothing else
in the page touches that data.

### Two consequences worth knowing

- **The copy is v2's, not the old v4's.** In particular the vision lead is v2's
  shortened "Unite people, information, and commerce." The scrapped v4 used the
  full vision sentence from the source document on the argument that the message
  is the point. If that reading is preferred, it is a one-line change, but it is
  a change *to v2's copy* and should be made in v2 as well.
- **Mobile is v2's mobile.** The scrapped v4 was the only version actually
  composed at 390px. v4 now inherits v2's posture there: horizontal overflow is 0
  at every scroll position, but the layout was designed at desktop widths. See
  open item 4.

## The nav fix (v1 and v3)

Both fixed navs were unreadable against some of what scrolled beneath them.

- **v3** was the plain case: ink links over the ink CTA and footer, invisible.
- **v1** was subtler. It used `mix-blend-mode:difference`, which reads correctly
  over a *settled* panel but blends against the mid-tone while one panel slides
  over another, washing the whole bar out to grey-on-grey. Measured at **11/255**
  of contrast at the worst scroll position, against ~155 settled.

Both now read the panel actually under the bar and re-tint explicitly. Two things
make that correct, and both are easy to get wrong:

1. **The panels are sticky and slide over one another**, so the section under the
   nav is the **last** panel in DOM order whose box spans the nav's midline — a
   later panel paints over an earlier one still held behind it. Taking the first
   match tints against a panel that is no longer visible.
2. **A covered panel also has a near-black veil faded over it** (`cover * 0.72`,
   which is also what draws the rounded corners visible mid-transition). A light
   panel therefore goes dark well before the next panel's box reaches the bar.
   Judging by class alone still slid to grey; the tone decision weighs the veil in
   and flips when effective lightness crosses 0.5.

The wordmark is a canvas, and its colour used to be a `const` captured once at
setup. It now re-reads `data-wm` every frame, so flipping that attribute re-tints
the mark on the next frame. Only colour changes — the halftone `cells` are
geometry and stay valid, so there is no rebuild.

Worst-case contrast after the fix is **69 on both**, up from 11 on v1. That is
close to the floor for a hard switch — at the instant the background passes
mid-grey, neither white nor ink can score highly — and it is a brief transient
mid-scroll rather than a settled state.

**Verifying it.** The tone is scroll-driven *and* the scroll is smoothed
(`SMOOTH`, 0.2), so a scripted `scrollTo` needs the animation to settle before
the boxes mean anything. Waiting one or two frames is not enough: the panels have
barely started moving, every sample still reads the hero, and the nav looks
stuck. Poll the panel rects until they stop changing, then sample. Settled, v1
flips twice across the page and v3 five times.

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

v2's version came from a Codex handoff package. Its layout, typography, sections,
Lenis scrolling and stacked section covers are Codex's and were left alone. Only
the county engine was replaced, which also closed that brief's own open item: the
old `buildTown()` cloned each county up to seven times into a synthetic
rectangular grid.

v4 does not use this engine at all. Its map is baked SVG. See above.

## Deliberate decisions, do not "fix" these

- The v3 map oversizes its column and runs under the headline on the left. The
  overlap and the off-frame bleed are wanted. The right edge is deliberately kept
  inside the frame because the east coast carries the silhouette. v4 inherits
  that rule.
- "Signal field" is the chaotic scatter in v2/v3. An even dot lattice was tried
  and explicitly rejected. Do not reintroduce a regular grid.
- The em dash in the vision line is verbatim from the source copy. Keep it. All
  body copy is word for word from the mission and vision document.
- "Platform" is capitalised in v3's headline on purpose.
- v1 has no marquee and no travelling routes. That was a removal, not an oversight.
- v4 is v2 with a still hero, and that is the entire difference. Do not restore
  the county engine to it, and do not strip out any of v2's other motion. See
  above.

## Traps worth knowing

These all cost a debugging cycle at least once.

- **Markup edits can silently drop panels.** A stray `</div>` matches the nearest
  open element of that type. With `.shell` already closed it matched `.stack`,
  closing the stack early, so two sections fell out and rendered on top of each
  other. After any markup edit, re-count
  `document.querySelectorAll('.stack > .panel')`. It is 4 in v1 and v3.
- **The sections use `id="mission"` and `id="vision"`, with no matching class.**
  CSS written as `.mission ...` does nothing at all in v1/v2/v3. Note the nav
  tone script keys off `.light` / `.cta` / `footer`, which *are* real classes.
- **Parallax writes `transform`.** Never centre a `data-px` element with
  `transform: translateY(-50%)`; the parallax cancels it. Use flex. If you ever
  add a second transform-based effect to an element that already parallaxes,
  compose both into one `translate3d` through a custom property rather than
  letting two rules fight over the property.
- **`ch` is only 0.432em in Instrument Serif.** ch-based measures misbreak
  headlines. Set display measures in `em`. (v4 uses Helvetica, where `ch` behaves
  normally, so v2/v4 ch measures are fine.)
- **v2's display face has 0.747em of ink per line** (ascent 0.731 + descent
  0.016), and glyphs collide tighter than -0.03em tracking. Any line-height below
  that overlaps. v4 sits at `.94`, just above it.
- **The `.route` SVG does not fill its panel.** It is a replaced element with an
  intrinsic ratio, so `inset: 0` yields roughly 1425x693, not the panel size.
  viewBox coordinates land close to 1:1 on screen.
- **Panel pinning is decided at runtime.** Script measures whether every panel's
  content fits one screen and only then adds `.pinned`. Measure the rendered
  extent of the shell's children, not `scrollHeight` minus padding: `scrollHeight`
  counts padding inconsistently and made the same content measure 709px unpinned
  and 820px pinned, which can flip-flop.
- **Scroll is smoothed everywhere, so scripted scrolling lags.** `scrollTo` then
  sampling a frame later reads the old layout. Poll until the rects settle. See
  the nav fix section. v1 and v3 use the `SMOOTH` constant; v2 and v4 use Lenis.
- **Never gate visible copy behind `requestAnimationFrame`.** Learned on a
  scrapped build of v4 whose headline reveal fired from a double rAF: rAF is
  *suspended*, not merely throttled, in a hidden or backgrounded tab, so the
  headline sat at opacity 0 and the page rendered as a map with no message.
  Reveal copy from an IntersectionObserver, which still delivers in that state.
  v2's `.observe` reveal already does this, which is one more reason v4 simply
  inherits it.
- **The Claude browser pane reports `visibilityState: "hidden"`** while being
  inspected, which throttles rAF and makes scroll-driven state look frozen. The
  nav tone is scroll-driven, so verify it in a real browser or headless Chromium,
  not that pane.

## Verification habit

Most of the visual bugs here were found by measuring, not by looking. The v4
route/copy "overlap" was actually a 0px gap; the v1 nav problem was a contrast
number, not a description. Worth continuing: read computed styles and bounding
boxes, sample the canvas, walk a `Range` character by character to read real line
breaks, sample points along an SVG path against the copy's rectangles to prove a
decorative line never crosses text, and — for anything about legibility —
screenshot the region and compute a luminance spread rather than trusting your
eye on a scaled image.

## Review feedback so far

- "Not a huge fan of the scroll damping, feels like a lot of scroll effort to
  cycle through." Addressed: dwell spacers between pinned panels went to 20svh,
  taking v3 from 5.7 screens to 4.7 against a floor of 4. v2's Lenis was damping
  hard (lerp .095, .92 per wheel tick); now .26 and 1.15.
- Smoothing was then added to v1 and v3 in the animation only. The wheel stays
  native. Strength is the `SMOOTH` constant, currently 0.2.
- "This is nice" on the overall direction.
- **Rebecca:** picks **v2** as the direction, and wants "a simple website without
  animation and only one front page to look intelligent and intrigue our audience
  with our message, not design flare." That brief produced v4.
- **Nian, on what that brief means:** the animation to remove is v2's *hero*
  animation — the county-dot map animation — removed totally, and that is the
  whole of it. "It's a simple change on v2." v4 is therefore a copy of v2 with a
  still hero, not a new page built in v2's style. Two attempts missed this: one
  stripped all motion from the page, the next rebuilt the layout and re-added
  v2's motion piecemeal, which still did not match v2 and cost a round trip per
  missing piece. The third just copied v2.

## Open items

1. **Get Rebecca's read on v4** now that its motion matches the brief as read.
2. **Collapse `/` and `/v3/` to one file plus a redirect**, to kill the sync trap.
   Now is the moment: v4 has no mirror, so the duplication is inconsistent as well
   as error-prone.
3. **Retire the losing directions.** Rebecca has picked; v1 and v3 are now costing
   maintenance (the nav fix had to be done twice) for versions nobody will ship.
4. **Mobile is still not designed for**, only made not to break. v4 was built and
   verified at 390px and has zero overflow, but v1/v2/v3 were composed at desktop
   widths and reviewers are still being told desktop only.
5. The routes in v3 hide below 900px wide, because the copy fills the width there
   and no clear band remains for them.

## Sync trap

`/` and `/v3/` are two copies of the same page, and `v1.html` and `/v1/index.html`
likewise. After editing `index.html` you must `cp index.html v3/index.html` and
restore its `<title>`, or the deployed `/v3/` silently stays on the old build.
This has caused two "why isn't my change working" cycles. v4 has no mirror.
Collapsing `/` to a redirect would remove the duplication and is worth doing.
