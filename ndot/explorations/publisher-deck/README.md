# Artistic direction: the publisher deck

A visual direction explored on a 15-page pitch deck, kept here as a resource for
site iteration. The deck itself is a side artefact; **what is worth reusing is the
system**: the palette, the type pairing, the collage engine, and the isometric box
with the dot held inside it.

Read `SPEC.md` for the palette, type scale and grid. Everything below is how it was made.

---

## The direction in one paragraph

Flat cut-paper shapes, each carrying a printed texture (halftone, hatch, cross-hatch,
rule, grit), laid over a cool off-white ground on a visible 96px construction lattice,
with an isometric box as the recurring object and a single printer's red appearing
exactly once per composition, as the dot inside the box. Achromatic otherwise. Hard
corners, no gradients, no shadows.

Reference points were two product films (Harvey, Kimi). The palette, type and rules
are NDot's own, lifted from `prototypes/ndot-site/site.css` in the
`n-interactive-prototype` repo, which is the source of truth for the brand.

---

## What is here

```
deck.html                  the whole artefact, one self-contained file
SPEC.md                    palette, type scale, grid, structure
assets/
  backgrounds/             15 slide plates, no text, 2560x1440
  backgrounds-transparent/ the same with the paper ground knocked out
  reference/               the finished slides, for layout reference
  elements/                the isometric box, transparent, four value recipes
  brand/                   wordmark.svg, mark.svg (fill="currentColor")
fonts/                     Newsreader + IBM Plex Mono, static instances
build/                     the render and export pipeline
```

`deck.html` is deliberately not named `index.html`, so this folder is not served as a
page by the repo's GitHub Pages build. The repo's root `robots.txt` disallows
everything, so nothing here is indexed.

---

## The collage engine

All of it lives in the `<script>` at the bottom of `deck.html`. Worth lifting:

- **`texture(ctx, kind, colour, scale)`** builds cached repeating tiles and returns a
  canvas pattern. `dots` is a real 45-degree halftone screen, `hatch` and `cross` use
  `DOMMatrix` rotation, `grit` is a seeded noise tile. Every shape is filled flat and
  then screened with one of these at low alpha, which is what makes them read as
  printed rather than vector.
- **`plates()` / `scatter()` / `isoBox()`** compose in layers: big washed plates behind,
  fragments clustered around the core with tails that bleed off frame, the box, then
  small pieces on top, then a grain pass over the whole plate.
- **`guides()`** draws the construction lattice. Positions come off the page's own
  96px columns with a minimum gap of two columns, never off a random float; two lines
  landing 3px apart reads as a printing fault, not a grid.
- Everything is driven by a seeded PRNG (`mkRng`), so a given page always composes
  identically. Change the seed, get a different composition in the same language.

Each page carries one full-bleed `<canvas class="art">` with `data-art` (which recipe)
and `data-zone="x,y,w,h"` in page fractions (where the fragments may live). The zone is
the only thing keeping shapes off the type.

---

## Running it

```bash
python3 -m http.server 8000
# open http://localhost:8000/explorations/publisher-deck/deck.html
```

Arrow keys move, `#p=7` deep-links a page, `P` prints one page per sheet.
Without JavaScript it degrades to a scrollable document rather than a blank screen.

## Rebuilding the exports

`build/` renders the plates and produces a PowerPoint file with live text:

1. Append an override to `deck.html` that makes `#stage` static and `#reel`
   untransformed. For the text-free plates also set
   `-webkit-text-fill-color: transparent`, which kills glyphs but not SVG fill, so
   the wordmark survives into the plate.
2. `chrome-headless-shell --force-device-scale-factor=2 --window-size=1280,720
   --screenshot`, once per page via the `#p=N` hash. 2560x1440 is 192 DPI on a
   13.333in slide.
3. `build/cdp_eval.py` drives the same binary over CDP to run `build/extract.js`,
   which walks the DOM for every text run with its position, face, size, weight,
   colour and letter-spacing. Needs `--remote-allow-origins=*` or the websocket
   handshake 403s.
4. `build/build_pptx.py` lays each plate full-bleed and adds one text box per block.

Two traps worth remembering:

- A `<canvas>` is a **replaced element**. `position:absolute; top:0; bottom:0` does
  not stretch it — it keeps its intrinsic height and `bottom` is dropped. Set
  `height:100%`.
- Use **Range client rects** for a text block's top, not the element rect. A block
  holding both a block child and its own text reports the child's top as its own,
  and the two lines land on top of each other.

## Fonts

Google Fonts only ships Newsreader as a variable font, so PowerPoint fakes the bold.
`fonts/` holds static Regular / Bold / Italic instances cut with
`fontTools.varLib.instancer` at `opsz 16` and renamed so bold maps correctly, plus
IBM Plex Mono statics. Both families are OFL.
