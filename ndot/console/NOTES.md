# Direction B: Console

Reference: exa.ai. NDot AI as an instrument, not a brochure. Warm neutral grounds,
hairline rules, mono micro-labels, a narrow ruled column, and working surfaces the
visitor operates.

Assigned section language for this round: **the interactive record**. A rail of
selectable records that swaps a detail panel on the home page, and the same panel
language shrunk into a record margin on the careers page. No ruled ledger tables
(institutional owns those), no alternating specimen bands (lab owns those).

## Files
- `index.html` home, seven numbered sections
- `careers.html` careers as a five-part document with a record margin
- `site.css` both pages
- Logo: `../assets/ndot-wordmark.svg`, favicon `../assets/ndot-mark.svg`

## Logo
Both pages point at the normalized wordmark. It is transparent, tight viewBox
929 x 320, artwork in `currentColor` which resolves to black in an `<img>`.

- On light grounds it is used as-is, on the dark footer with `filter: invert(1)`.
- Every negative pixel offset, fixed crop box, `overflow: hidden`,
  `mix-blend-mode` and stray `filter: invert(1)` that existed to rescue the old
  1600 x 1600 tile is deleted. The rule is now two lines: `height: 22px;
  width: auto;` and one invert for the dark ground.
- Measured on both pages: `naturalWidth` 929, `naturalHeight` 320, rendered box
  63.88 x 22, ratio 2.903, header filter `none`, footer filter `invert(1)`.

`<link rel="icon" href="../assets/ndot-mark.svg" type="image/svg+xml">` and
`<meta name="theme-color" content="#ffffff">` are on both pages. White is the
ground this direction opens on, on both the home page and careers.

## What changed in this pass
1. **The seven capability names were printed twice on the home page**, once in
   the console rail and once in a manifest list below. The manifest is gone. The
   rail is the assigned language and it carried more (a framing line, a support
   line and a position counter per record), so cutting the manifest lost only the
   group key, which is now a `Group` field inside the record panel.
2. **The console moved out of the hero and into the Capabilities band.** That is
   the section whose job is to name the seven, so the records now live in the
   section that owns them and appear exactly once on the page. The hero is the
   positioning statement, an authored standfirst, two actions and a ruled
   contents line. Home page bands at 1440: hero 607, shift 564, proof 721,
   capabilities 989, mission and vision 567, team 824, careers 538. Tallest to
   shortest is 1.84 to 1.
3. **careers.html had an empty right third in all five bands.** It now runs three
   tracks at 1080px and up: mono section label, prose, and a record card carrying
   the data the prose states. Measured at 1440, every band's content reaches the
   right column rule: aside left edge 755, width 300, wrap inner edge 1055, and
   the only gap left is the wrap's own 33px gutter.
4. **The team headline asserted something about placeholder people.** "Operators
   who have built and run media products at scale." sat above four rows reading
   "Name pending". The section now says what it is: "This section is a
   placeholder." with a line stating that nothing in the plates describes a real
   person and the roles are stand-ins. The role labels read "Role pending" first.
5. **The index meta description was POSITIONING-1 truncated**, which read as a
   shortened quote. Both descriptions are now authored, and neither contains an
   em dash.
6. **Dead code removed**: `.mono--blue` (declared, never used), `--s9: 48px`
   (declared, never referenced), `--rv-y` (read with a fallback, never set),
   `figure` and `h4, h5, h6` from the resets (no such elements on either page),
   and `.grid__body > .head + .prose` (no longer matches after the rebuild).
7. **Kept, as instructed**: the rail, and the 4-up plate team grid.

## The signature move: the capability console
Exa's hero is a live search box with a Request/Response split. NDot has no API to
demo, so the honest equivalent, moved to where it belongs:

- Left rail = REQUEST. Seven buttons, the seven capabilities in source order.
- Right panel = RESPONSE. For the selected record: its name, an authored framing
  line set in Fraunces, a two line support paragraph, and two mono fields, GROUP
  and POSITION nn / 07, pinned to the bottom of the panel so they land on the
  same baseline as the foot of the rail.

Verified: clicking all seven rail buttons produces seven distinct records, seven
distinct names, and exactly one button in `aria-pressed="true"` afterwards. Arrow
keys walk the rail and move both focus and selection, which is how a list of
records is expected to behave.

Six of the seven names occur once in the page source. "App and newsletter
development" occurs twice, as rail button 01 and as the title of the record that
is open by default. That is the detail view naming its own record, not a second
list, and without it the panel has no title with JavaScript disabled.

### The framing lines are authored, not source copy
Fourteen sentences (a framing line and a support line per capability) were written
for this page, plus seven one-word group keys. They are not in COPY.md. Each
restates what the named capability is for, drawn from POSITIONING-1,
POSITIONING-2, POSITIONING-3 and VISION-BODY. None asserts a metric, a customer,
a product name or a date. **Review them before this goes anywhere public.** They
live as `data-frame`, `data-body` and `data-group` attributes on the rail buttons,
so the DOM holds each string once and the JavaScript only copies.

## careers.html: the document with a record margin
Five bands, each with prose on the left and a record in the margin. The cards use
the console's panel language (hairline frame, tinted title strip, blue status dot,
mono field keys) at margin scale, so the two pages read as one system.

- 01 Context: four fields lifted from CAREERS-2, distribution as it stands.
- 02 What we are building: three fields plus a link into the console, which is
  where the full list of seven lives.
- 03 Track record: the three proof figures stacked vertically in the margin,
  rather than the three-across treatment the home page gives them.
- 04 The work: the six areas named in CAREERS-6, as a numbered record.
- 05 Apply: the contact record, including the one honest thing a careers page
  with no listings can say, which is that there are no listings.

Three responsive states, all measured:
- Below 620px the aside stacks under the prose and the card runs full width.
- 620px to 1079px the aside is still under the prose, but the record opens out so
  it does not read as a stretched list: key and value on one line, the six areas
  two across, the three figures three across.
- 1080px and up the aside becomes the third track at 248 to 300px.

## Authored section headlines
Each of these is invented prose, permitted by SHARED.md, and contains no em dash
and no en dash:

- Home hero standfirst: "Infrastructure for publishers who would rather own the
  audience than rent it."
- The shift: "Rented distribution is losing its reliability."
- Proof: "The platform is built on work already done."
- Capabilities: "Seven capabilities, one platform."
- Team: "This section is a placeholder." plus the placeholder disclosure line.
- Careers (home): CAREERS-TITLE verbatim.
- Careers page 01: "The dependency, and why it is getting riskier."
- Careers page 03: "Everything here was built before it was packaged."
- Careers page 04: "The problem set runs end to end."

Where an authored headline sits above source copy, the source copy drops to the
`.lead--sub` tier so the section reads head then support rather than two
paragraphs at the same weight. Mission and Vision keep their source leads at the
full display tier: MISSION-LEAD and VISION-LEAD are already statements, and a
headline above them would compete rather than frame.

## Copy fidelity
Checked against COPY.md by string containment on the rendered pages:

- POSITIONING-1, -2, -3, MISSION-LEAD, MISSION-BODY, VISION-LEAD, VISION-BODY all
  present verbatim on index.
- All seven capability strings present on index, and their source order is
  preserved by document position.
- CAREERS-TITLE through CAREERS-7 all present verbatim on careers. CAREERS-TITLE
  and CAREERS-7 also appear on the home page's careers band.
- The three proof figures appear once each on index and once each on careers.
- The superseded address appears nowhere.

Non-ASCII census: em dash only, and every one comes from a COPY.md block. Six on
index (POSITIONING-1, -2, -3 and the three proof separators), eight on careers
(CAREERS-2 twice, -4, -5, -6 and the three proof separators). Zero U+2014 and
zero U+2013 in `site.css` and in this file. No character with the Unicode Emoji
property on either page; the CTA arrow is an inline SVG.

## Other decisions
- **Ruled column.** Every `.wrap` carries `border-inline`, so two hairlines run
  the full height of the page and change colour as the grounds alternate.
- **Two edge tokens, not one.** `--hair` and `--hair-2` are decorative: column
  rules, row rules, dividers. `--edge` (50% alpha) is the boundary that makes a
  thing read as a control, and is used on the ghost button, the mail button, the
  console frame, the record cards, the chip, the skip link and the team plates.
  Measured against their real grounds: 3.49:1 on light, 4.82:1 on dark, so every
  control boundary clears the WCAG 1.4.11 non-text minimum of 3:1.
- **Two panel tokens.** `--field` is the inside of a panel or card, `--bar` is
  its title strip. Both re-point on dark grounds, so one rule serves both.
- **Spacing scale.** `--s1` 4px through `--s11` 80px on `:root`. Every padding,
  margin and gap in `site.css` is a token or a clamp whose endpoints are multiples
  of 4. The only literal pixel values left are 1px rules, the 144px label track,
  the 288px rail track, the 168px field key track and two sub-pixel baseline
  nudges. No HTML file carries an inline margin; the only inline styles are
  `--rv-d` reveal delays.
- **Proof runs full column on the black band**, outside the margin-label grid the
  other sections use, with a mono key per cell, the figures at the h1 tier and the
  em dash caption below.
- **The shift carries a two row ruled comparison** under the source paragraph.
  Both values are source phrasing from CAREERS-2; the two keys are authored.
- **Team.** The four plates are a flat field with a single centred hairline and a
  numbered monogram sitting on it: deliberately blank rather than the diagonal
  cross that reads as a failed image.
- **Fraunces with WONK 1, SOFT 22** for display, headlines and leads. Weight 400
  everywhere, never bold, tracking negative.
- **Motion.** IntersectionObserver plus a 2500ms setTimeout backstop, never rAF.
  Hidden state lives behind `html.js` set by an inline head script. With scripting
  disabled: `html` class empty, 84 text nodes, zero below opacity 0.9, all seven
  capability names visible in the rail. With `prefers-reduced-motion: reduce`: all
  29 reveal elements at opacity 1 and transform none.
- **Progressive enhancement limit.** Without JavaScript the console renders record
  01 and the rail does not switch. The other six framings are present in the DOM
  as attributes but are not rendered. All seven capability names are visible.

## Text reveal: char colour readout
Referenced from Flowbase's GSAP Text Reveal booster, effect 5 "Color Text
Reveal". Read out of the booster's own source: chars, stagger `.05`, duration
`.5`, scrubbed to scroll with a `bottom bottom` end. Rebuilt here in vanilla
CSS plus IntersectionObserver. No GSAP, no SplitType, no ScrollTrigger, no CDN.

**Mechanism.** Characters step from `--muted` to the element's settled colour,
left to right, with a blue underscore cursor running the leading edge and
stopping at the end of the line. Nothing translates, nothing blurs, nothing
fades. This is the console, so a heading resolves the way a record resolves,
field by field, and it does not wobble on the way in. The other two directions
own char scale and word skew blur; neither of those is used anywhere here.

**Parameters.**

| Thing | Value | Where it came from |
|---|---|---|
| split level | characters | booster effect 5 |
| stagger | `.05s`, floored to `8ms` on long lines | booster value, then a 900ms sweep budget divided by the character count |
| colour duration | `.5s` | booster value, kept as is |
| easing | `cubic-bezier(.25, .46, .45, .94)` | quad out, the closest CSS curve to GSAP's default `power1.out` |
| start colour | `--muted` | the direction's own muted token, so it re-points on dark grounds without a second rule |
| end colour | `inherit` | not a literal, so the settled character is the parent's computed colour by construction |
| cursor | underscore, `max(1px, .07em)` thick, `--blue`, `steps(1, end)` | authored, allowed by the brief as a block cursor that runs the line and stops |
| cursor dwell | `max(90ms, 3 x stagger)` | three cells wide on short headings, and long enough to survive a frame on the hero |

The stagger floor is the one number that is not the booster's. The booster
scrubs, so `.05` costs nothing on a long line. Playing once, `.05` x 148
characters would take the home page h1 nine seconds. Dividing a 900ms sweep
budget by the character count instead puts the h1 at `8ms` per character and
about two seconds end to end, while every heading of eighteen characters or
fewer still runs at the booster's `.05`.

**What is split, and what is not.** Char splitting is confined to real headings:
`h1.display`, the mono `h2` section labels, and the authored `h3` display lines.
The five home and three careers authored headlines were `<p class="head">` and
are now `<h3 class="head">`. That was needed, not cosmetic: `aria-label` is
prohibited on `role="paragraph"`, and char splitting requires the original
string to survive as a label. The reset already flattens `h1, h2, h3` to
`font-size: 1em; font-weight: inherit; margin: 0`, and every rule that touches
these lines is class based, so the rendered result is unchanged. Heading order
stays h1, h2, h3 and the auditor reports no jumps.

Body prose, the three proof figures, the source leads under Mission and Vision,
and everything inside the console keep the plain element reveal. A reveal, not
a screensaver.

**Piece cap: 900 spans per page.** Home generates 366 across 13 elements,
careers 190 across 9. The cap is enforced as a running budget in the split
loop, so an element that would cross it is skipped rather than half split.

**How it composes with the existing `.rv` reveal.** It replaces it. The script
calls `classList.remove('rv')` on every element it splits and adds `.tr`, so no
element ever carries both. `.rv` writes `opacity` and `transform` on the
element; `.trc` writes `color` and `text-decoration-color` on the pieces. There
is no property written twice and no element with two rules competing for one
transform. The inline `--rv-d` stays on the element and is reused as the base
delay for the character walk, so each section keeps the internal choreography
it had before. Split elements are added to the same observer list and the same
2500ms backstop.

**The cursor is a decoration because a background block failed the audit.**
First build painted `background-color: var(--hair)` on the leading cells. On
the dark grounds that lifts `#181815` to a measured `rgb(61,61,58)` under text
still sitting at `--muted`, and audit.mjs caught it at 4.37:1 against a 4.5:1
requirement. It is a transient state, but it is a real one, and it was only
almost passing. A text decoration cannot change the ground a character is
measured against, so the failure mode is gone rather than narrowed.

**Failure modes, each closed.**

- **JS off.** No `.js` class and no `.tr` class, so no rule in the reveal block
  matches and the original text renders exactly as authored. Measured with
  nojscheck: 0% text loss on both pages, 3069 and 3126 characters either way.
- **Reduced motion.** The script tests the media query and returns before it
  touches the DOM, so nothing is split at all and the result is identical to
  the no JS case. Measured under emulation: zero `.tr` and zero `.trc` on both
  pages, and rmcheck reports zero running animations, zero faded text, zero
  shifted elements. The CSS also carries a reduced motion override for the case
  where the setting is turned on after a page has already been split.
- **Never revealed.** The pre state is `--muted`, not `opacity: 0` and not
  `brightness(0%)`. A heading whose observer never fires is still readable at
  6.70:1 on the dark grounds and 7.15:1 on cream. There is no state of this
  page in which a heading is invisible.
- **Copy changed by the split.** Spaces are left as bare text nodes and never
  wrapped, and `.trc` stays `display: inline`, because `inline-block` lets
  `innerText` insert breaks between characters. Verified on the rendered DOM:
  all 22 split elements match their `aria-label` on `textContent` byte for
  byte, and `innerText` length is unchanged with the script on or off.
- **Announced letter by letter.** The pieces sit under one `aria-hidden="true"`
  wrapper and the heading carries `aria-label` with the exact original string.
  No paragraph is char split anywhere.
- **Resting half way.** No scrub. IntersectionObserver adds `is-in` once and
  unobserves, and the 2500ms `setTimeout` backstop covers a tab that never
  scrolls or that was backgrounded. Nothing is gated on requestAnimationFrame.

**Settled state, measured.** After 3.5 seconds all 366 home pieces and all 190
careers pieces report `color` exactly equal to their parent's computed colour
and `text-decoration-color: rgba(0, 0, 0, 0)`, with zero animations running.
Geometry against the pre change baseline at 1440: the h1 is 1022 x 196.9 before
and after, the five `.head` lines are identical to the tenth of a pixel, and
two mono `h2` labels move by 0.1px and 0.2px from kerning lost across span
boundaries. No line count changes anywhere.

## Accessibility
- **Focus rings.** Pixel-verified on a genuinely keyboard-focused rail button
  (tabbed to, `:focus-visible` matching): the 2px blue ring paints on all four
  edges, left, right, top and bottom. `.console` has no `overflow: hidden`, which
  is what used to clip it; corners are rounded on the first and last children.
- **Anchor targets.** Everything carries
  `scroll-margin-top: calc(var(--nav-h) + 16px)` so in-page jumps and the skip
  link clear the sticky header.
- **The console announces itself.** The record region carries
  `aria-live="polite"` and each rail button carries `aria-controls="rec"`.
- **`::selection` on dark grounds** is `#101321` on `#a1aff7`, 8.7:1, because
  `--blue` re-points to `--blue-lift` there and white on it was 2.10:1.
- **Mobile navigation.** The nav drops its three section links below 720px rather
  than hiding them behind a hamburger, and an in-page mono index sits in the hero
  at mobile widths. The footer nav carries the same three. The two hero CTAs go
  full width below 480px.

## Deliberately not done
- No map, no geography, no county anything, no "local".
- No gradient, no glow, no background texture. Exa has none. The only motion
  on the page is the element reveal and the character colour readout above.
- No canvas, no image art, no pseudo-element art behind any text.
- No inline links inside body copy. Every link is at least a 46px block.
- No fabricated names, titles or headshots.
- No numerals the source does not give. The only digits on either page are list
  positions 01 to 07, the 06 areas list, and the 01 / 07 counter, all of which
  count the lists themselves and assert nothing.

## Audit
`tools/audit.mjs`, headless Chrome over CDP, both pages at 320 / 390 / 768 / 1440.

Clean at every width on both pages: zero contrast failures, zero horizontal
overflow, zero tap targets under 44px, zero heading-level jumps, zero images
missing alt, zero broken images, one h1 per page, all four landmarks present,
`robots noindex,nofollow` present, and Fraunces, Inter and Geist Mono all
confirmed loaded.

`tools/canvascontrast.mjs`, both pages, all four widths: "no text found over a
canvas". This direction has no canvas element and no gradient, image or
pseudo-element art behind text, so there is nothing for it to composite.

Because that leaves the canvas check with nothing to say, contrast was also
measured against a real full-page screenshot with `tools/pixcontrast.mjs`, which
composites everything actually painted. Zero failures: index 101 text runs at all
four widths, careers 89 to 92. Tightest margin anywhere is 5.98:1 against a 4.5:1
requirement, the 10px mono field keys on the dark record cards, `#a39f97` on a
measured `rgb(35,35,31)`. Index's tightest is 6.62:1, the blue mono keys on cream.

**One line does not come back clean, and it is a false positive.** The auditor's
`hiddenText` probe flags any text node whose top is more than six viewport heights
down the page, which is 5400px at its emulated 900px height. index.html is 6245px
at 320 and 5866px at 390, so the last screen of footer copy trips it: six nodes at
320, five at 390. Each flagged node was then scrolled to and re-measured
individually: opacity 1, visibility visible, and fully inside the viewport on all
four sides. The probe exists to catch the rAF-blank-page trap, which this page
does not have. Getting under the threshold would mean cutting roughly 850px of
mobile page, which means cutting either the console or the team grid, and both
were explicitly kept. careers.html is clean on this probe at every width after the
footer's top padding came down one step on the scale.

## Dead code check, re-run after the cleanup
Unused custom properties: none. All 36 declared properties are read by `var()` in
`site.css`, except `--rv-d`, which is declared inline in the HTML and read with a
fallback. The text reveal adds five more: `--tr-from` and `--tr-hit` are declared
on `.tr` in `site.css`; `--tr-step`, `--tr-scan-d` and `--tr-i` are written by the
split script and read with fallbacks, so the rules still resolve if the script is
absent.

Unused selectors: every selector in `site.css` was probed with
`querySelectorAll` against both rendered pages. 182 selectors, zero that match
nothing. The six the probe still lists are artifacts of the probe itself: bare
`::before`, `::after`, `::selection`, `:focus-visible`, and the two halves of
`:where(main, section, [id])` after a comma split.

## Settling

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
