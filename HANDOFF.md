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

v4 is the exception: it inlines its data instead of fetching, so it opens
correctly straight from `file://` with no server at all.

## Files

```
index.html      the current design (v3). EDIT THIS ONE.
v3/index.html   a copy of index.html. See the sync trap.
v2/index.html   editorial build, self-contained
v1/index.html   copy of v1.html
v1.html         dark build, source of truth for v1
v4/index.html   static-hero build. Self-contained: no assets, no CDN, no fetch.
assets/counties.json   3,142 records: [x, y, sqrt(land_area), "County, ST"]
                       Albers USA space, 975 x 610. v2 and v3 each keep their
                       own copy because the fetch path is relative.
serve.py        local dev server, no-store
```

---

## v4 — the static-hero build

Built to review feedback picking v2 as the direction, asking for a **simple site
with no animation and one front page**, that looks intelligent and carries the
audience on the message rather than on design flare.

It keeps v2's editorial system — pure black on white, one signal red (`#e3422c`),
Helvetica at heavy weights with tight negative tracking, Courier micro labels at
`.16em`, hairline rules between sections.

**Scope of "no animation": it means v2's hero animation, and only that.** v4 was
first built with every trace of motion stripped out, which over-read the brief.
Nian's reading, which is the operative one: v4 is v2 with the hero animation
removed totally, and v2's other motion is wanted. It was restored.

So the invariant is no longer "nothing moves." It is:

- **The hero is static and stays static.** The county map is baked SVG. No
  canvas, no click-to-explode, no state drill-down, no idle drift, no cursor
  tooltip, no node chips, no "click a county" pulse. Nothing in the page's
  script reads or touches the map.
- **The page stays self-contained.** No CDN, no fetch, no external assets, so
  it still opens straight from `file://`.

```
grep -c '<canvas' v4/index.html                          # 0
grep -c -E 'fetch\(|XMLHttpRequest' v4/index.html        # 0
grep -o -E '(src|href)="[^"]*"' v4/index.html \
  | grep -v -E '^href="#|mailto:' | wc -l                # 0
```

What v4 does animate, all of it inherited from v2: the staggered scroll reveal,
the scroll progress bar, and the hover states on the masthead CTA and the email
link. A `prefers-reduced-motion` block turns the lot off.

Two of v2's motions are deliberately **not** carried over, and both should stay out
unless someone decides otherwise:

- **Lenis scroll damping.** It is the one thing in this project that drew a
  negative review note ("a lot of scroll effort to cycle through"), and it is a
  CDN script, which would cost v4 its run-from-`file://` property.
- **The vision constellation.** That is a decorative graphic v4 does not have,
  not an animation stripped off one it does. Re-adding it is a design decision,
  not a restoration.

**The county map is a static inline SVG** — 3,142 `<circle>` elements in the same
Albers `975 x 610` space the other versions use, generated once from
`assets/counties.json`. Radius is `1.05 + (sqrt_land_area / 47) ** 0.62 * 1.55`:
sub-linear, so land area still reads as information without shouting. Sixteen
distinct radii result.

Inlining rather than fetching is what keeps the map out of the script entirely,
and it also means v4 has no network or filesystem dependency — it works from
`file://`, unlike v2 and v3. The cost is that the dots are baked in. To
regenerate, rebuild the contents of `<svg viewBox="0 0 975 610">` from
`counties.json`; nothing else in the page touches that data.

### Deliberate decisions in v4

- Body copy is **verbatim** from the mission and vision document, em dash
  included. v4 uses the **full** vision sentence, not v2's shortened "Unite
  people, information, and commerce" lead — the message is the point.
- Red is a punctuation mark, used twice on the whole page: the middle route stop
  and the email arrow. It was briefly on all three of "people / information /
  commerce" in the vision statement and read like a highlighter. That was pulled
  back deliberately; do not reinstate it. (`var(--signal)` also appears on
  selection, hover and focus rings; those are states, not resting marks.)
- `.route-step:nth-of-type(2)` is the red stop. `nth-of-type` counts `div`s, so
  the sibling `<span class="route-rail">` does not shift the count. `nth-child`
  lands on the wrong step — that bug shipped once and was caught in a screenshot.
- **The headline precedes the atlas in source order.** At `<=760px` the atlas
  drops out of absolute positioning into the flow; when it came first in the
  markup the map rendered *above* the headline and buried the message.
- On mobile the atlas is centred on the **viewport**, not the text column:
  `width:124vw; margin-left:calc(var(--pad) * -1 - 12vw)`.
- `.mission-grid` carries a `row-gap` that does nothing on desktop, where the
  route and copy share a row, and opens the gap once they stack. Without it they
  sat exactly flush — measured at 0px between them — and read as overlapping.

Verified at 1440 / 900 / 760 / 390: horizontal overflow is 0 at every width, and
the route and copy never collide.

**The map stays.** This was briefly an open question, on the reading that "no
animation, not design flare" might extend to "no map either." It does not: the
brief is about the hero *animation*, not the hero. The map is information rather
than decoration, and it is the thing that makes the page look like it knows
something. If that is ever revisited, deleting the `.atlas` div is a clean
one-block removal.

---

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
- v4's **hero** is static and its other motion is not. Do not "restore" the county
  engine to v4, and do not strip its reveals back out. See above.

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
  `transform: translateY(-50%)`; the parallax cancels it. Use flex.
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
- **Scroll is smoothed, so scripted scrolling lags.** `scrollTo` then sampling a
  frame later reads the old layout. Poll until the rects settle. See the nav fix
  section. (v1 and v3 only. v4 has no smoothing, so its scroll is immediate.)
- **Never gate visible copy behind `requestAnimationFrame`.** v4's lede reveal
  was first triggered from a double rAF. rAF is *suspended*, not merely
  throttled, in a hidden or backgrounded tab, so the headline sat at opacity 0
  and the page rendered as a map with no message. It is driven by
  IntersectionObserver now, which still delivers in that state, with a
  `setTimeout` backstop that reveals anything on screen after 1.2s. The reveal's
  hidden state is also gated behind `html.js`, set by an inline script in
  `<head>`, so a page with no JavaScript shows everything rather than nothing.
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
  animation, removed totally, and that is what makes it v4. v2's other motion is
  wanted. The first cut of v4 stripped everything and over-read it; the reveals,
  progress bar and hover states are back.

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
