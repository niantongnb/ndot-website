# Publisher deck: artistic material

A visual direction worked out on a 17-page pitch deck, kept here as **source
material for the NDot site**. The deck is the artefact; what is meant to be reused
is the system underneath it.

If you are an agent picking this up: start at `tokens.json`, then `collage.js`,
then `SPEC.md`. The rest is output.

---

## The direction in one paragraph

Flat cut shapes, each filled once and then screened with a printed texture, laid
over a cool off-white ground on a visible 96px construction lattice, with an
isometric box as the recurring object and a single accent red appearing exactly
once per composition, as the dot inside that box. Achromatic otherwise. Hard
corners, no gradients, no shadows.

---

## What to reach for

| File | What it gives you |
|---|---|
| `tokens.json` | The whole system as data: colour with computed contrast ratios, the type scale and which face carries what, the grid, the motif rules. **Read this first.** |
| `tokens.css` | The same as custom properties, ready to drop into a stylesheet. `.ndot-band` flips the accent and the hairline for inverted sections. |
| `collage.js` | The generative engine, standalone. Point it at a canvas and it composes. Deterministic per seed. |
| `SPEC.md` | The prose version: page-by-page structure, what each device is for. |
| `deck.html` | The whole deck, one self-contained file. Every technique in the system is in here in working form. |
| `assets/` | Everything already rendered, below. |
| `fonts/` | Newsreader and IBM Plex Mono, static instances, OFL. |
| `build/` | How the plates and the PowerPoint export are produced. |

### Using the engine

```html
<canvas id="art" style="width:1200px;height:700px"></canvas>
<script src="collage.js"></script>
<script>
  NDot.paint(document.getElementById('art'), {
    recipe: 'cover',              // cover | div1..div4 | terms | quiet | photo
    zone:   [0.55, 0, 0.48, 1],   // where fragments may live, in page fractions
    dark:   false,
    seed:   2026
  });
</script>
```

`zone` is the only thing keeping shapes off your type: fragments are placed inside
it and bleed outward, so give it the half of the frame the text does not occupy.
`quiet` is the calm recipe for content-heavy pages: lattice and grain only, with a
few fragments in the outer margin.

Lower level, if you want one piece:

```js
NDot.isoBox(ctx, cx, cy, size, { top, left, right, dot, screen });
ctx.fillStyle = NDot.texture(ctx, 'dots', '#111110', 6);   // dots|hatch|cross|rule|grit
NDot.guides(ctx, w, h, NDot.rng(41), { dark:false, cols:4, rows:3, nodes:3 });
```

### Assets already rendered

| Folder | |
|---|---|
| `assets/backgrounds/` | 17 plates with **no text**, 2560 × 1440. Set your own type over them. |
| `assets/backgrounds-transparent/` | The same with the ground knocked out, for any colour. |
| `assets/reference/` | The finished pages. Layout reference. |
| `assets/elements/` | The isometric box alone, transparent, four value recipes. |
| `assets/textures/` | The paper grain alone: flat fields and the seamless 90px tile, opaque and transparent, on light and on ink. |
| `assets/brand/` | `wordmark.svg`, `mark.svg`, both `fill="currentColor"` so they invert. |
| `assets/illustrations/` | Paper-collage artwork, four concepts, transparent cut-outs and opaque versions. Its own README names them. Two map images from the same batch are parked in `_barred-map-imagery/` and must not go on NDot. |

---

## Rules that are not preferences

Taken from `prototypes/ndot-site/CLAUDE.md` in `n-interactive-prototype`, which is
the source of truth for NDot brand. Breaking these is what makes work stop looking
like NDot.

- **The brand is black and white.** The accent is editorial chrome, under 2% of
  surface. Delete the two accent tokens and everything still works.
- **`#A6231A` on `#131310` is a banned pair** at 2.55:1. Inside a dark band the
  accent is `#E86A52`.
- **Never a low-alpha white hairline on a dark band.** The transparent version
  measures 1.37:1 and disappears. Solid `#6A6A63`.
- **Hard corners.** The only round things are dots, because a dot is the mark.
- **No map, no geography, no pins, no coordinates.** A dot field reads as the
  sister company's county map, which is what NDot is no longer about.
- **Every element is TYPE, a RULE, a piece of DATA, or a numbered record.**

The collage and the isometric box are, strictly, illustration, and the fragment
scatter is a dot field. Both are deliberate departures made for this deck. Carry
them onto the site only on purpose.

---

## The one motif worth stealing

**One dot, one unit.** Wherever the deck states a quantity it draws that many dots
and says what one dot is: one percentage point, one turn of revenue, one reader in
a hundred. It is why the accent only ever appears once per composition, as the dot
inside the box, and it is the thing that ties the data pages to the brand name.

State the unit in a caption or do not use the device.

---

## Notes for whoever runs this next

- `deck.html` is deliberately **not** `index.html`, so Pages does not serve this
  folder as a page.
- The deck **fails open**: without script it is a scrollable document. An inline
  script stamps `html.js` and only then does it become one screen at a time.
- Two traps that cost time and will cost you the same:
  a `<canvas>` is a replaced element, so `position:absolute; top:0; bottom:0` does
  **not** stretch it, set `height:100%`; and use **Range client rects** for a text
  block's top, because an element holding both a block child and its own text
  reports the child's top as its own.
- The reference films that informed this direction are third-party marketing
  videos and are deliberately **not** committed here.
