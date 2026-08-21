# Direction A: Institutional

Reference: hebbia.com. Warm near-black ground, high-contrast serif, a visible
column grid, hairline dividers, one blue accent doing one job.

Files: `index.html`, `careers.html`, `site.css`. No JS beyond two inline blocks
(the `html.js` flag and the reveal observer). No CDN, no build step.

## What this direction is
A prospectus, not a product tour. Its section language is THE RULED TABLE:
key and value records set on drawn column rules, with a hairline between the
key column and the value column. Three tables carry the page.

1. The hero particulars table: what the platform is, what it displaces, what
   the publisher is left holding.
2. The proof ledger: the three verbatim entries with their provenance beside
   them.
3. The team roster: one ruled row per function, portrait slot on the left.

Everything else (the shift standfirst, the seven-card capabilities bento, the
single sand band for mission and vision) exists to give those three tables air.

## Taken from hebbia.com
- Ground `#0E0B0B` warm near-black, hero and footer on pure `#000`, sand
  `#EEECDD` as the one light ground. Type is warm off-white `#F4F1EB`, never
  pure white.
- One accent, `#465BFF`, only ever a primary CTA fill. It is never a link
  colour, because at 3.9:1 on the dark ground it would fail as body text.
- Hairline system: 1px rules at `#272220`, column rules at `#1C1917`, and the
  light-band equivalents. Sections carry a top hairline, nothing else.
- The 4 / 8 / 12 column grid at their breakpoints (40em, 57.5em), drawn on the
  page rather than implied.
- Their bento geometry: 10px gaps, 8px radius, rows of flex `2.45 : 1`, card
  copy pinned top left.
- Their easing pair, `cubic-bezier(.22,1,.36,1)` for reveals and
  `cubic-bezier(.72,0,.24,1)` for state changes, and the feTurbulence grain
  overlay.
- 100px pill CTAs.

Not taken: their uppercase display serif (see the casing decision below), and
their card colours. Every card ground is derived from this direction's own
tokens.

## Decisions

### Casing: source copy keeps the source's casing
The h1's opening clause used to be `text-transform:uppercase`, which rendered
the company name as "NDOT AI" on screen while the DOM text stayed byte-exact.
The same rule was uppercasing the three proof entries. Decision: **drop the
uppercase from every run that quotes the source document**, rather than exempt
the company name inside it.

The rule now reads: anything quoted from COPY.md renders in the source's own
casing. Uppercase is reserved for labels this build wrote (section markers,
column keys, footer heads, the eyebrows). Consequences, all applied:

- The h1 opening clause is separated from the remainder by weight (500 vs 400)
  and size (1em vs 0.6em), not by capitals. It reads "NDot AI is the growth
  platform for modern media".
- The three ledger entries read "More than a decade", "Tens of millions",
  "Hundreds of millions".
- The footer strapline lost its uppercase, because it carries the company name.
  It is now 15px at +0.04em instead of 13px at +0.1em.
- The careers CTA's five work areas lost their uppercase, because they are
  words lifted from CAREERS-6. They are now 15px sentence case.
- The careers eyebrow was "Careers at NDot AI", which the uppercase eyebrow
  rule would have rendered "CAREERS AT NDOT AI". It is now "Open roles", so
  the eyebrow can stay uppercase without touching the company name.

The DOM text was byte-exact before and is byte-exact now. Verified: the h1's
`textContent` compares equal to POSITIONING-1 at 320, 390, 768, 960, 1024 and
1440, length 173.

### The hero's second half no longer starts on a hanging dash
POSITIONING-1's em dash used to open the second span, so the hero rendered as a
headline followed by a dash-led fragment. The split now puts the em dash at the
end of the first clause and starts the remainder on "helping". Concatenating
the two spans still yields the source string character for character.

### One canonical set of sections, and Careers is not one of them
The three lists disagreed: header nav had five items, the hero index had seven,
the footer had four and collapsed two of them into "Mission and vision"
pointing at `#mission`. Resolved by picking one canonical set and making every
list agree on it.

Canonical sections, in page order: The shift, Proof, Capabilities, Mission,
Vision, Team. Six, everywhere.

- Header desktop nav: those six. Measured at 960, 1024 and 1440: the nav never
  reaches the right-hand cluster.
- Header mobile panel: those six, then Careers.
- Footer, first column, heading "Sections": those six.
- Careers is a page, not a section, so it never appears in a section list. It
  has its own footer column, heading "Careers", holding "Open roles" and
  career@ndot.ai. In the header it is the primary CTA.

Mission and vision stay two sections with two h2s and two ids, because the
brief lists them separately and the footer used to lie about that.

### The hero contents index is gone, replaced by a particulars table
The index was a verbatim repeat of the header nav sitting about 700px below it,
and it cost seven tab stops. It is now the hero particulars table: a ruled key
and value record that carries no links, adds no tab stops, and states three
things that are not already on the screen.

- What it is: the span of the platform, first capability through last.
- What it replaces: the third-party distribution dependency.
- What it leaves behind: the owned audience.

It deliberately does not print the three proof figures, which would put the
same claims on the page twice.

The careers page carries the same table in the same slot, with disciplines,
the shape of the work, and the address. That replaced three uppercase role
phrases, which were also source-derived words being uppercased.

Real tab stops now: 22 on index at 1440 (was 25), 17 at 390. 19 and 14 on
careers.

### The proof standfirst is addressed to a publisher, not to the builder
It used to read "Each figure below is printed exactly as the company states it,
with the ground it came from beside it. No numerals, no ranges, no chart."
That is a build rule, not copy. It now reads:

  The platform is not a first attempt. Every line below comes from media
  products this team built, shipped and ran itself, and the right column says
  which part of that work it came from.

The ruled count beside it changed from "Three figures / Stated in words" to
"Three entries / One operating record" for the same reason. The no-numerals
constraint is still absolute; it is simply no longer announced to the reader.

### Logo
Both pages use `../assets/ndot-wordmark.svg`. The old 1600x1600 tile with its
baked-in backdrop and ground rects is gone, and so is every hack that existed
to rescue it: the `.brand__crop` overflow box, the four hard-coded negative
pixel offsets, and the two oversize `width`/`height` pairs.

Both instances sit on the pure black ground, so the only treatment is
`filter:invert(1)`. Height is set (26px, 30px above 40em, 22px below 26em) and
width follows the intrinsic ratio.

Measured on all four instances: `naturalWidth` 929, `naturalHeight` 320,
rendered box 63.88 x 22 and 87.09 x 30, ratio 2.903 at every width.

`.brand` carries `min-height:44px` so the link stays a legal target now that
the wordmark itself is under 44px tall.

### Favicon and theme colour
Both pages carry `<link rel="icon" href="../assets/ndot-mark.svg">` and
`<meta name="theme-color" content="#000000">`, matching the header and footer
ground.

### Kept as they were
- **Proof ledger.** A ruled ledger on the 12 column grid: label at columns 1
  to 2, the verbatim entry at 3 to 8, the verbatim caption plus one line of
  provenance at 9 to 12. No numerals, no ranges, no chart.
- **Team roster.** One ruled roster, not four repeated plates. Four rows: a
  72px portrait slot with a per-row mesh density and a per-role monogram
  (L, P, E, G), the placeholder name and the real function, and the "Portrait
  to come" note in the right columns.

### Unchanged from the previous build
- **Body size.** 17px for every running paragraph, 15px for nav, buttons, card
  subtitles and captions, 13px reserved for uppercase letterspaced labels.
- **Eyebrow vs section label.** Two different constructions, not two sizes.
  Eyebrow: display serif, 13px, +0.16em, soft ink, no rule. Section label:
  grotesk, 13px, +0.2em, full-strength ink, always ruled.
- **Capabilities** is the largest section at every width. Each card carries the
  verbatim capability name plus one 15px clause, and the ground is a rule field
  at a different density per card. Nothing on a card plots a number.
- **Mission and vision** are the one light band. The whole token set flips,
  including the column rule colour.
- **Right hand columns have jobs.** Section headers are a three part grid
  (label and head 1 to 4, prose 5 to 9, a ruled count 10 to 12).
- **Motion.** IntersectionObserver plus a 1600ms setTimeout backstop, hidden
  state gated behind `html.js` set by an inline head script, so no-JS renders
  everything. One transform property only. `prefers-reduced-motion` disables it.
- **Mobile nav** is a native `<details>` disclosure. No script, keyboard
  operable, 48px rows.
- **320px** is re-cut rather than shrunk: tighter outer padding, smaller logo,
  smaller header controls, so the bar fits without wrapping.

## Bugs this pass fixed
- **Phantom geometry from the closed mobile panel.** A closed `<details>` hides
  its slot with `content-visibility`, not `display`, so the seven panel links
  kept real layout boxes and real bounding rects while invisible. A pixel pass
  measured the "Careers" row's phantom rect against the hero's blue CTA and
  reported 2.29:1 for text that was never painted. Those boxes were also
  phantom hit geometry. Fixed with `.mnav:not([open]) .mnav__panel{display:none}`.
  The open panel measures 48px rows at `#B4AFA6` on `#000`, 9.2:1.
- **Logo target under 44px.** Dropping the crop box took the header and footer
  brand links to 64 x 34 and 87 x 42. `.brand{min-height:44px}` restores them.
- Everything the previous pass fixed is still fixed: the bento collapse below
  640px, the drawn rules stepping off the content grid, missing scroll-margin
  under the sticky header, and the meta descriptions that were near-verbatim
  reuses of the source copy.

## Deliberately not done
- No map, no geography, no county dots, no "local".
- No stock photography, no video, no illustration of people or places.
- No invented product claims, feature names, customer logos, or metrics.
- No numerals anywhere the source document does not give one. The word "seven"
  appears because COPY.md states there are exactly seven capabilities.
- The hero particulars table is not a second nav. It carries no links on
  purpose, so the hero's only tab stops are its two buttons.
- No parallax and no scroll-linked transforms. Element motion is a fade and a
  16px rise; headings additionally carry the char scale reveal below. Nothing
  on either page is scrubbed to scroll position.
- No blue outside the primary CTA.

## Text reveal: char scale

Referenced from Flowbase's GSAP Text Reveal booster, effect 3 "Line Divider
Reveal". Rebuilt in vanilla CSS and one IntersectionObserver. No GSAP, no
SplitType, no ScrollTrigger, no CDN of any kind.

**Mechanism.** Each targeted heading is split into words, then into chars. Every
char starts as a squashed horizontal bar and resolves into its letterform:

| | Flowbase effect 3 | This build | Why |
|---|---|---|---|
| split | words, chars | words, chars | same |
| scaleX | 1.8 | 1.8 | same |
| scaleY | .1 | .08 | flatter, so the collapsed state reads as a rule and not as a squashed letter |
| blur | 10px fixed | .14em | the display scale is clamped across a 4.5x range, so a fixed 10px erases a 19px heading and barely touches a 44px one |
| dimming | brightness(50%) | opacity .12 | see below |
| stagger | .05 | .022 (.024 on the two heroes) | .05 is a scrub budget, not a play-once one; at .05 the hero would run 2.4s |
| duration | scrubbed to scroll | .62s per char | requirement: play once, never scrub |
| ease | none | cubic-bezier(.22,1,.36,1) | linear is right for a scrub, wrong for a one-shot |
| trigger | ScrollTrigger, scrub .5 | IntersectionObserver, once | a scrub can come to rest half revealed |

**Why this effect for this direction.** The whole page is drawn on a ruled 12
column grid with hairline dividers. Effect 3 is the one effect in the booster
that is about this page: the display type literally resolves out of a set of
horizontal rules.

**Why opacity and not a colour override.** The collapsed bar has to read in the
page's own rule ink. Setting `color:var(--bd)` does that, and it was the first
build, but it also drops the char's computed colour to 1.34:1 for as long as
the run lasts, which the structural auditor correctly reports as a contrast
failure (35 of them on index). Carrying the same dimness with `opacity:.12`
instead lands on the same ink by composition and never changes the computed
colour. Measured collapsed values against each ground:

| band | ground | collapsed bar | that band's `--bd` |
|---|---|---|---|
| theme-black | rgb(0,0,0) | rgb(29,29,28) | #272220 |
| default | rgb(14,11,11) | rgb(42,39,38) | #272220 |
| theme-sand | rgb(238,236,221) | rgb(212,209,196) | #CFCBB8 |

Opacity is also the property the `.rv` element reveal already uses on every
other block of text on this page, and it fades from 0, so a char starting at
.12 is strictly more visible than what the page already ships.

**How it composes with the existing `.rv` element reveal.** They never touch the
same element, so no property is ever written twice. Every element that gained
`.tr` had `.rv` removed, and `.rv` moved onto its siblings:

- `h1#h-hero` lost `.rv`; the char reveal runs on `.d-hero__lead`, and
  `.d-hero__rest` picked up `.rv` at `--rvd:.24s`.
- The seven `.two__a` / `.article__side` / `.cta__a` wrappers lost `.rv`; their
  `.label` child gained it, and the h2 gained `.tr`.
- The two `.pair__col` sections (mission, vision) lost `.rv`; their label, lead
  and prose children each gained it with staggered `--rvd`.

One observer drives both. `.rv` writes `opacity` and `transform` on block
elements; `.tr` writes `transform`, `filter` and `opacity` on char spans that
have no `.rv` ancestor inside the reveal.

**Scope: headings only.** 8 elements on index, 5 on careers. Char splitting a
paragraph is out, both for the screen reader cost and for the span count. The
three `.d-fig` ledger figures are the one place this was tempting and were left
alone: they are `<p>`, not headings, and promoting them to `h3` to qualify would
have changed the document outline for the sake of an animation.

**Piece cap: 480 spans per page**, enforced in the script, which skips any
element that would cross it rather than splitting it half way. Actual: 222 on
index (177 chars, 45 words), 148 on careers (122 chars, 26 words).

**Accessibility.** Each split heading gets `aria-label` carrying its exact
original text, set before the DOM is touched. Measured: `aria-label ===
textContent` on all 13 headings, and 0 of the 299 char spans are reachable
without passing through an `aria-hidden="true"` ancestor.

**No-JS and reduced motion.** The pre-animation state lives behind `.is-split`,
which only the script adds after it has actually split the text, so text is
never gated on script. Under `prefers-reduced-motion: reduce` the script bails
before touching the DOM: measured 0 generated spans, 0 `.is-split`, and a DOM
identical to the no-JS case.

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

## Audit

Structural auditor, both pages, at 320, 390, 768, 960 and 1440: zero contrast
failures, zero horizontal overflow (scrollWidth equals clientWidth at every
width), zero targets under 44px, no heading jumps, no missing alt, no broken
images, all four landmarks with exactly one h1, `noindex,nofollow` present,
Archivo and Bodoni Moda both reporting loaded.

Re-run after the char scale reveal landed: still zero on every count, both
pages, at 320, 390, 768 and 1440. The auditor samples about 300ms after its
scroll sweep, so it is sampling headings mid-run, and it finds nothing. That is
the check that forced the move from a colour override to opacity: the first
build put 35 contrast failures on index, all of them single chars caught mid
transition.

`canvascontrast.mjs` reports "no text found over a canvas" on both pages at all
four widths. That is correct rather than a pass: these pages contain no
`<canvas>` element. Every painted ground here is a CSS gradient, an SVG data
URI or a pseudo-element, which that tool does not composite. So the canvas
question was answered with a glyph-masked full-page pixel pass instead, which
does composite all of it, including the fixed grain overlay and the seven card
art layers.

Glyph-masked pixel contrast (every text box captured against a screenshot taken
with glyphs hidden, so the real painted ground is measured): zero failures on
either page at 320, 390, 768 and 1440. 105 to 110 text runs measured on index,
48 to 53 on careers. The tightest run anywhere on either page is the 14px and
15px label on the blue CTA at 5.00:1 against a 4.5 floor. Every other run
clears its floor by more.

Two failures surfaced during that pass and both were chased to ground:

1. The closed mobile panel, described above. That one was real and is fixed.
2. A single flag on careers at 768 for the contact card's prose, reported
   against the blue CTA. Measured directly: the prose box is at y 3321 and the
   button at y 3372 with the viewport 900 tall, and no overlap in either
   layout. The cause is the tool itself: it collects boxes at a 900px viewport
   and then resizes the viewport to the full document height before capturing,
   and this page reflows by 38px between those two states, so the sampled
   pixels sit about 55px below the glyphs. Re-running the same measurement with
   the resize moved before the box collection gives zero failures on both pages
   at all four widths.

Other measurements on this build:
- Keyboard: 22 focusable stops on index at 1440 and 17 at 390, 19 and 14 on
  careers. Every stop is at least 44px tall. Tab order matches DOM order, no
  trap, and the closed mobile panel contributes no stops.
- No-JS: `html` keeps `no-js`, every `.rv` element computes opacity 1 and
  transform none, full copy renders.
- `prefers-reduced-motion: reduce`: all `.rv` at rest, zero running animations.
- Copy: both pages' rendered text checked against COPY.md. Every verbatim block
  is present with its em dashes intact, and the retired contact address does
  not appear on either page.

Known heuristic flags, neither a defect:
- The no-JS checker lists the seven `.cap__sub` card subtitles as "invisible"
  because it flags any computed opacity under 0.9, and those carry a deliberate
  `opacity:.72` tint. They render real glyphs and pass the pixel pass at every
  width.
- On index the structural auditor's `hiddenText` check reports far-down copy,
  because it flags anything below six viewport heights and the home page is
  about 6.5k tall. Those elements measure opacity 1, visibility visible, real
  box dimensions and correct colour.
