# Direction C: Lab

Rebuilt 2026-08-20 after the cross-cutting review. Everything below describes
what the two pages actually do, measured, not what they aim at.

## Assigned language: the specimen band
This direction owns THE SPECIMEN BAND, and only that.
- Full bleed bands alternating cream and near black, edge to edge, no cards.
- Large, tightly set old style serif at weight 400 as the only display voice.
- An amber monospace key sitting on a 1px left rule, `.rkey`, as the single
  labelling device. It is the page's grammar and it appears nowhere else.
- Key and value records where the data leads. Any portrait is a 26px chip
  inside a value cell, never a plate.
Not used here, because another direction owns it: full width ruled roster
tables, and a 4 up portrait plate grid.

## Band order (this is the design)
Home: header (ink, sticky) / hero (ink) / the shift (cream) / proof (ink) /
capabilities intro (cream) / seven capability bands alternating ink and cream /
mission (cream) / vision (ink) / team (cream) / careers (amber) / footer (ink).
Careers: header / hero (ink) / why now (cream) / what we are building (ink) /
products to platform (cream) / the work (ink) / apply (amber) / footer (ink).
The amber ground is the one deliberate break in the alternation. It marks both
call to action bands and nothing else.

## What changed in this rebuild, item by item

**1. The canvas caption blocker is gone by deletion.**
`.plate-cap` measured 1.29:1 to 2.36:1 against real painted canvas pixels. Both
instances are deleted, along with the two decorative cream plates they labelled.
They named an `aria-hidden` decoration with an invented technical string, which
is chrome, not information.
The field itself survives, but it is now a bounded panel beside the hero copy
instead of a full bleed layer behind it. Consequence, measured with
`canvascontrast.mjs` at 320, 390, 768 and 1440 on both pages with the selector
`p,h1,h2,h3,dt,dd,li,a,span,.rkey,.spec-v,.spec-k`: **no text found over a
canvas**, at any width, on either page. Running the same tool with `*` returns
four rows on each page, and those four are `html`, `body`, `.hero` and
`.hero-grid`, container elements whose boxes enclose the canvas but which paint
no glyph over it. The worst real ratio is therefore not applicable: zero glyphs
sit over canvas pixels.

**2. There is navigation below 900px.**
A ruled index strip, `.navindex`, sits in the sticky header at every width under
900px: seven numbered entries, amber numerals, 44px tall, scrolling inside its
own `overflow-x:auto` container so the page itself never overflows. At 768 all
seven fit without scrolling. At 900 and above it is replaced by `.topnav`.
Section links are no longer footer only.

**3. Team rebuilt as specimen records.**
Four records, each a distinct seat with a distinct `h3`, so the accessible
outline reads Product, Growth, Data and recommendation systems, Advertising
technology instead of four identical headings. The data leads: an amber key on a
left rule, then the function as the serif title, then a three row key and value
table (NAME, REMIT, PORTRAIT). The portrait is a 26px hatched chip in the
PORTRAIT value cell. Name value stays "To be announced" because no person is
announced. Seat titles are the disciplines the source copy itself lists in
CAREERS-6, so no job title was invented. Section height at 1440 fell from
1264px to about 640px.

**4. The FUNCTION column is gone.**
BUILD / GROW / PERSONALIZE / RETAIN / MONETIZE / PROTECT restated each
capability name as a verb and carried nothing. Each capability band now carries
one clause of added information about what the capability is for.

**5. Capabilities are seven specimen bands.**
Alternating ink and cream, full bleed, one capability per band: amber mono key
on a left rule, the name at the 40px serif step, the clause in the right column.
Order and wording are the source order and the source wording. Bands are kept
tight: about 115px each at 1440.

**6. "Prototype, not indexed" is gone** from the footer bottom bar of both
pages. The robots meta already carries that.

**7. The type scale now matches the page.**
Eight rendered sizes on each page at any given width, and no size outside the
scale. The six display tokens are fluid clamps, so the census moves with the
viewport and only the 1440 column matches the token caps:

| page | 320 and 390 | 768 | 1440 |
|---|---|---|---|
| index | 10, 12, 14, 16, 22.4, 28, 35.2, 41.6 | 10, 12, 14, 16, 22.4, 32.3, 47.6, 66 | 10, 12, 14, 17, 26, 40, 64, 96 |
| careers | 10, 12, 14, 16, 18, 22.4, 28, 35.2 | 10, 12, 14, 16, 18, 22.4, 32.3, 47.6 | 10, 12, 14, 17, 20, 26, 40, 64 |

Nothing renders below 10px at any width.

**8. Header and link details.**
The header is `position:sticky` on both pages, outside the hero, so nothing
clips it. Primary nav links moved from 10px to 12px. The header CTA now points
at careers.html on both pages and carries `aria-current="page"` on the careers
page, matched by the index strip entry and the footer entry.

## The wordmark
Both pages point at `../assets/ndot-wordmark.svg`. Measured: `naturalWidth` 929,
`naturalHeight` 320, rendered box 58.06 x 20px, ratio 2.903, on both the header
and footer instances of both pages. Height is set, width follows. Both grounds
are near black, so both instances take `filter:invert(1)` and nothing else.
There is no negative offset, no clip, no `overflow` crop, no `mix-blend-mode`
and no invert hack anywhere in the stylesheet.
Favicon: `../assets/ndot-mark.svg` on both pages. `theme-color` is `#0D0D0C`,
which is the ground at the top of both pages.

## Colour decisions
- Amber replaces NDot's red outright. `--amber-ink` (`#DF6518`) draws rules and
  marks on cream and is never text. `--amber-label` (`#A8440B`) is the amber
  text colour on cream. `--amber` (`#FF9D12`) is amber text on near black and
  the solid button fill. `--amber-bg` (`#FFC313`) is the full ground.
- On the amber ground the solid amber button inverts to ink, otherwise it would
  vanish.

## Fonts
Google Fonts substitutes, all three reported loaded by the auditor at 320, 390,
768 and 1440 on both pages: Newsreader (display, weight 400 only), Geist (body),
Geist Mono (keys and labels).

## Motion and JavaScript
- Reveals use IntersectionObserver with a 1600ms `setTimeout` backstop and a
  second backstop on `load`. The hidden state lives behind `html.js` set by an
  inline head script. No `requestAnimationFrame` gates any visible copy.
- One transform per element, through one custom property.
- The reveal transition is declared on `.rev`, never on `.rev.in`, and `.rev` is
  never applied to an interactive element.
- `prefers-reduced-motion` kills the reveals, the arrow nudges and the canvas
  loop. The canvas still paints one static frame.
- All script is inline in each page. The folder holds exactly four files.
- Display type and section headings additionally carry a word level text
  reveal. See "Text reveal: word skew blur" below.

## Text reveal: word skew blur
Adapted from Flowbase's GSAP Text Reveal booster, effect 4 (Slanted Blur
Reveal). Word level, never char level. A specimen resolving under focus, which
is the one reveal that suits large tightly set Newsreader; char level would fall
apart at these sizes and would also make some screen readers spell the heading.

Parameters, from the booster's own source:
- from `opacity:0`, `filter:blur(8px)`, `transform:skewX(-20deg)`
- to `opacity:1`, `filter:blur(0px)`, `transform:skewX(0deg)`
- ease sine out, written as `--sine:cubic-bezier(.39,.575,.565,1)` (Penner
  easeOutSine, which is what GSAP's `"sine"` resolves to)
- stagger .04s per word, duration .62s per word
- enter offset 20, the booster's default, expressed as an IntersectionObserver
  `rootMargin` of `0px 0px -20% 0px`

Two deviations from the booster, both deliberate:
- Not scrubbed. The booster ties progress to scroll position, which can leave a
  word resting at `opacity:0`. Here it plays once on enter and settles for good.
  An element that has revealed is unobserved and never re-animates.
- The .04s stagger is compressed on long blocks so the tail never exceeds .7s.
  Step is `min(40ms, 700ms / (words - 1))`. Headings keep the literal .04s
  (a 7 word title staggers at 40ms); the 43 word shift statement runs at 16ms.
  At a flat .04s that block would have taken 1.7s to finish arriving.

Implementation, vanilla:
- No GSAP, no SplitType, no ScrollTrigger, no CDN. IntersectionObserver plus CSS
  transitions, inline in each page.
- The splitter walks text nodes and wraps each run of non-space characters in a
  `span.w`. Every space is put back as a real text node, so `textContent` and
  `innerText` come out unchanged to the character. Element structure inside a
  target (the two block spans in the hero h1) survives the split.
- Word level, so no `aria-label` swap and no `aria-hidden` pieces are needed.
  Nothing on either page is char split.

How it composes with the existing `.rev` element reveal: REPLACE, not compose.
The script only splits elements that carry `.rev` themselves, and the rule
`.js .rev.tr-split{opacity:1;transform:none;transition:none}` switches that
element level reveal off wherever words reveal instead. So exactly one rule
writes `transform` on any one node: `.rev` on unsplit elements, `.w` inside
split ones. Nothing can be left stuck part way between two rules.

The transition is declared on `.tr-in`, not on the base `.tr-split .w` rule.
This is the opposite of the `.rev` convention above and it is deliberate: with
the transition on the base rule, applying the split state animates the words OUT
to blurred first, and above-the-fold text visibly dips before it arrives.
Measured mid-flight to confirm the fix, the pre-reveal state is now instant and
exact: `opacity 0, blur(8px), matrix(1,0,-0.36397,1,0,0)`, and -0.36397 is
tan(-20deg).

When a block finishes, a `tr-done` class drops `filter` and `transform` back to
`none` rather than leaving the words sitting at `blur(0)`, so the resting render
is the plain one and not a rasterised layer.

Where it runs, and the cap:
- Home: hero h1, the shift statement, the three section standfirsts, both
  mission and vision leads, the careers statement. Eight targets, 142 pieces.
- Careers: hero h1, the pull line, the apply line. Three targets, 37 pieces.
- Body prose, capability names, proof figures, team records, nav, keys and the
  footer are untouched. It is a reveal, not a screensaver.
- Hard caps in the script: 240 word pieces per page, and 60 words in any one
  element. An element over 60 words is left unsplit and simply keeps its `.rev`.
  The longest split block is the 43 word shift statement.

No-JS and reduced motion:
- The split state hangs off `.tr-split`, which only the script can add, so with
  JS off nothing here applies. Measured: text loss 0% on both pages.
- `prefers-reduced-motion` bails before the first DOM touch. Measured under
  emulated reduce: 8 and 3 elements still carry `data-tr`, 0 are split, 0 pieces
  exist. The DOM is identical to the no-JS case.

**Settling: the split is undone.** The original markup is captured with
`el.innerHTML` before a single node is touched, and put back once the run
finishes, along with removing the `aria-label` the split added. A settled
element is therefore the exact element that shipped before any of this existed:
same nodes, same kerning pairs, same line breaking, same accessible name, and
zero generated spans left in the DOM.

This is not cosmetic. The first build left the pieces in place permanently, and
`display: inline-block` word boxes are atomic, so they changed where lines broke
at widths nobody had measured. Verified after the fix, with JavaScript on and
settled against JavaScript off, at 320, 340, 360, 375, 390, 414, 480, 600, 700,
768, 834, 900, 930, 1000, 1024, 1100, 1200, 1280, 1320, 1440, 1600 and 1920:
every element box and the document scroll height match exactly, and the leftover
span count is 0 on both pages. Rendered `innerText` is also byte identical with
JavaScript on and off at 320, 390, 768 and 1440.

## Deliberately not done
- No map, no county data, no geography, no "local", no "my town".
- No numeral near the proof figures. The only digits rendered on either page are
  the ordinals 01 to 07 on nav entries, capability bands and seats.
- No reuse or reskin of any existing page in this repo.
- No CDN JavaScript. Google Fonts stylesheet only.
- No inline links inside body prose, so every target clears 44px.
- No invented headline, statistic, person or job title.

## Measurements
`tools/audit.mjs` at 320, 390, 768 and 1440, both pages: zero contrast failures,
zero horizontal overflow, zero targets under 44px, all three fonts loaded, no
heading level jumps, no missing alt, no broken images, header / nav / main /
footer present, one h1 per page, robots noindex,nofollow.

`tools/canvascontrast.mjs` at the same four widths, both pages: no text element
over a canvas (see item 1).

After the text reveal was added, the same four widths on both pages still report
zero contrast failures, zero horizontal overflow, zero targets under 44px, no
heading jumps and one h1. `tools/copyverify.mjs` reads rendered `innerText` and
finds every home block on the home page and every careers block on the careers
page, capabilities present and in source order, so the split changed no copy.
`tools/nojscheck.mjs`: 0% text loss on both pages. `tools/rmcheck.mjs`: zero
running animations, zero faded text, zero shifted text on both pages.

Also measured directly:
- See the rendered font size census above.

The auditor still reports `hiddenText` entries with reasons like `y=5100` on the
home page. That check flags any element whose top exceeds six times the 900px
measuring viewport. The home page is 5860px tall, so the closing bands trip it
on length alone. Those elements are inside `scrollHeight`, carry the same
measured contrast as the rest, and appear in screenshots taken at those scroll
offsets. Not a defect.
