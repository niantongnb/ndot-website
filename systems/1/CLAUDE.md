# NDot AI website mockup, v2 (more visual)

A second take on the NDot AI site. **`../ndot-site/` is v1 and stays as it is**;
this folder is the variant, kept side by side so both can be reviewed at their
own preview URL.

```
index.html    home
careers.html  careers
site.css      v1's stylesheet plus a "v2 visual layer" section at the bottom
```

Serve with the v1 helper (it serves the whole repo root):

```bash
python3 prototypes/ndot-site/serve.py 8000
# http://localhost:8000/prototypes/ndot-site-v2/
```

Measure with `../ndot-site/measure.js` (swap the path inside it, or `sed` it).

---

## What v1 and v2 share

Everything that is not visual. Same verbatim copy, same information
architecture, same brand rules, same colour tokens, same accessibility work,
same absence of motion. **Typography is the one token group that differs**, see
below. **Read `../ndot-site/CLAUDE.md` first**: the rules about
NDot not being Nearby, no map ever, copy being verbatim, and no invented
figures all apply here unchanged and are not repeated below.

## Typography: v2 is a grotesk, v1 is a serif

v1 is set as a publication, so it uses **Newsreader**. v2 is the systems take
(construction drawing, diagrams, marks), so it uses **Archivo**: a workhorse
news gothic that is sturdy at display sizes, institutional rather than trendy,
and has real tabular figures. The mono system layer stays **IBM Plex Mono** in
both, so the two versions still read as one brand.

This is a genuine fork rather than a skin. The two versions are now different
propositions: v1 argues by being well set, v2 argues by showing the system.

Switching family meant retuning, not just swapping the stack. Newsreader 300
is elegant at display sizes; Archivo at 300 is anaemic, so headings moved to
500, tracking tightened (the h1 is now `-.032em`), body dropped from 19px to
18px because the grotesk carries a larger x-height, and the careers pull quotes
lost their italic, which reads as an affectation in a sans.

## What v2 adds

v1 argues entirely through typography and rules. v2 keeps that spine and gives
every section a purpose-built graphic. All graphics are **inline SVG built from
the brand's own geometry**: no photography, no stock art, no icon font, no
external assets, and still no map.

1. **Hero: the mark's construction drawing.** The N beside the copy, on an
   inverted panel, annotated with its real Figma measurements (stem 78.325, cap
   313.3, bar at minus 30 degrees). It is TYPE, a RULE and DATA at once, which
   is the whole design thesis, and it is brand-true rather than decorative.
   The display size drops to 48px in the split column so the opening statement
   still reads in six lines with the buttons above the fold.

2. **A new section, `§ 01 The shift`.** Two diagrams: publishers reaching their
   audience through search, social and other channels, versus reaching them
   directly. This is the company's entire argument, drawn. The node labels are
   the source document's own words; the asymmetry between the two panels (the
   right one is mostly empty because the middle layer is gone) is the point,
   so do not fill that space.

3. **Capabilities as cards, not a list.** Seven cards with monoline geometric
   marks, in a four-column grid. The eighth cell completes the grid with the N
   mark on ink rather than filler copy, which is how seven items land in a
   four-wide grid without an orphan.

4. **Mission and vision on an inverted spread**, so the page alternates
   paper and ink rather than running long on paper.

## Things that will bite you here

- **`<ol class="cap-grid">` needs `padding:0`.** The grid uses `gap:1px` over a
  `--rule` background to draw its hairlines, so the list's default left padding
  shows up as a grey column down the side. It is set; do not drop it.
- **SVG type scales with the viewBox.** The diagram labels are 10.5 units,
  which lands at about 9.4 real pixels at 390px wide, so there is a
  `max-width:640px` rule bumping them to 12.5. If you change the node rect
  widths, re-check that the labels still clear their boxes: `PUBLISHER` is the
  tightest at 72.1 units inside an 86-unit box.
- **The two-track spine inverts.** `.field` has a `--rule` left border, which is
  near-white and far too bright on the inverted mission and vision spread.
  `.mv-spread .sec-grid > .field` overrides it to `--rule-ink`.
- **Print.** The v2 layer adds its own `@media print` overrides for the
  construction panel, the brand cell and the inverted spread. Anything new and
  inverted needs an entry there too, or it prints white on white.

## Still open

Same three questions as v1, in `../ndot-site/CLAUDE.md`: one page or two, the
domain, and the team placeholders. Plus one more that only applies here:
whether the diagrams in `§ 01` should carry the client's own sentence about
referral decline as a caption. Right now the section is a pure figure spread
with no prose, because the only sentences that fit are already used in the
hero and under Vision, and repeating them would read as padding.
