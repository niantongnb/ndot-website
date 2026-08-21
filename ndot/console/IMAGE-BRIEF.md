# Image brief: Direction B "Console"

For generating artwork with an image model (GPT Image, Midjourney, whatever you
prefer) that will sit on **this** direction without fighting it. Nothing in this
file is wired into the pages yet: generate first, then we drop them in and I'll
size the slots.

---

## 1. What this direction is

The console reads as an instrument, not a brochure. Warm neutral grounds,
hairline rules, mono micro-labels, a narrow ruled column, and drawings that
explain a mechanism. The one drawing already on the page is the schematic under
**The shift**: two boxes, one line, one dashed line. That is the register. Every
generated image has to look like it came out of the same drawing set.

Read that as: **technical line art, not illustration.** Think patent figure,
instrument panel legend, engineering elevation, Swiss information graphic. Not
"tech illustration", not isometric 3D, not a hero graphic.

## 2. Palette

Give the model these hexes verbatim. Do not let it invent colours.

| Role | Hex | Used for |
| --- | --- | --- |
| Paper | `#FAF9F7` | the cream ground most sections sit on |
| Paper, plain | `#FFFFFF` | the white ground |
| Ink | `#101321` | linework and labels on light grounds |
| Near black | `#181815` | the dark band ground (proof, careers) |
| Reverse ink | `#F4F2EE` | linework on the dark band |
| Blue | `#1F40ED` | one accent only, on light grounds |
| Blue, lifted | `#A1AFF7` | the same accent on the dark band |
| Field | `#F0ECE8` | the fill inside a panel or a "not yours" box |

**Two colours per image, plus the accent on at most one element.** If an image
needs a third colour to work, it is the wrong image.

## 3. House preamble

Paste this above every prompt, then add the subject line from section 5.

> Technical line drawing in the style of a patent figure or an engineering
> legend. Flat, two-dimensional, orthographic, no perspective and no depth.
> Uniform 1px–2px hairline strokes of even weight throughout, square line caps,
> sharp corners with a 2px radius at most. Pure `#101321` linework on a flat
> `#FAF9F7` background, no other colours except a single `#1F40ED` accent on one
> element only. Generous empty space; the drawing occupies the middle 60% of the
> frame. No gradient, no glow, no drop shadow, no texture, no paper grain, no
> vignette, no reflections, no 3D, no isometric projection, no glossy or metallic
> surfaces, no neon, no bokeh, no photographic elements, no people, no faces, no
> hands, no logos or brand marks, no maps or globes or geography, no clouds, no
> circuit-board motifs, no lightbulbs, no rockets, no handshake imagery. Any text
> in the image is uppercase monospace, letter-spaced, and tiny. Absolutely
> minimal, cold, precise, legible at 120px wide.

## 4. Two practical rules

**Ask for a white or transparent background, and pure black linework.** Then one
asset serves both grounds: it multiplies onto the cream sections, and inverts
onto the black band. That is exactly how the NDot wordmark already works in this
repo (`filter: invert(1)` on the dark footer). If the model bakes in a coloured
background you will need two versions of everything.

**Generate one image first, approve it, then use it as a style reference for the
rest.** A set of seven that were each prompted from scratch will not match. One
approved reference plus "match the line weight, spacing and framing of the
attached image exactly" gets you a set.

## 5. The slots

Priority order. You do not need all of these; slots 1 and 2 carry the most.

| # | Slot | Where it lands | Ratio | Export |
| --- | --- | --- | --- | --- |
| 1 | Capability marks ×7 | inside the console's Response panel, one per record | 1:1 | 640×640 PNG |
| 2 | Section marks ×4 | beside the mono label of Shift / Proof / Mission-Vision / Team | 1:1 | 480×480 PNG |
| 3 | Careers band | one wide figure on `careers.html` | 3:2 | 1800×1200 PNG |
| 4 | Team plates ×4 | replacing the numbered blank plates | 4:5 | 800×1000 PNG |
| 5 | Social card | Open Graph preview, not on the page | 1.91:1 | 1200×630 PNG |

### Slot 1: the seven capability marks

These are the strongest use of generated art here, because each one has a real
mechanism to draw. Draw the mechanism, never a metaphor for it.

1. **App and newsletter development** — a phone outline and a folded letter
   sheet, drawn flat as two elevations side by side, joined by a single
   horizontal hairline running between them. Nothing else in frame.
2. **Audience and subscriber growth** — a loose scatter of small filled dots on
   the left resolving into an evenly spaced grid of dots inside a thin rectangle
   on the right. One dot in the grid is `#1F40ED`.
3. **Recommendation and personalization** — a vertical stack of five identical
   thin rectangles, one of them pulled out to the right and outlined in
   `#1F40ED`, with a short hairline showing where it came from.
4. **Engagement and retention** — a horizontal baseline with evenly spaced tick
   marks, and a single dot returning to it in a series of shallow arcs, each arc
   the same height. One arc is `#1F40ED`.
5. **Advertising technology** — a page wireframe of empty thin rectangles with
   exactly one rectangle filled solid `#1F40ED`, and a small hairline scale with
   tick marks beside it.
6. **Content moderation** — a stream of small marks flowing left to right through
   a vertical gate of evenly spaced hairlines; a few marks stop at the gate and
   sit to its left. The gate line is `#1F40ED`.
7. **Publisher-advertiser networks** — two clusters of four dots each, left and
   right, joined by a single horizontal hairline bus with short stubs connecting
   every dot to the bus.

### Slot 2: the four section marks

Quieter than slot 1: these sit next to a 10px mono label, so they must survive at
about 40px. Two or three strokes each, no fill.

1. **The shift** — a solid arrow that becomes a dashed arrow halfway along.
2. **Proof** — three vertical bars of increasing height, no axis, no labels.
3. **Mission and vision** — two concentric thin rectangles, the inner one offset
   up and to the right.
4. **Team** — four empty squares in a 2×2 grid with even hairline gutters.

### Slot 3: the careers band

> A flat schematic of a working surface seen straight on: a wide thin rectangle
> divided by hairlines into unequal panels, a few of them carrying tiny uppercase
> monospace labels, one panel outlined in `#1F40ED`. Reads as an instrument
> legend or a plan drawing. Wide horizontal composition with large empty margins.

### Slot 4: the team plates

The four plates are deliberately blank right now, because there are no real
people yet and the site must not imply there are. **Do not generate portraits,
faces, silhouettes, or figures for these.** If you want something there, generate
four abstract plate marks and treat them as pattern, not as people:

> A single flat geometric mark centred in a tall frame: [a circle bisected by a
> horizontal hairline / two overlapping squares / a square with one corner cut /
> three stacked hairlines of unequal length]. Hairline stroke only, no fill, huge
> empty margins.

### Slot 5: the social card

> A wide flat composition on `#181815`. Left third: a small uppercase monospace
> label. Right two thirds: two thin rectangles joined by a single horizontal
> hairline, drawn in `#F4F2EE`, with one `#A1AFF7` element. Enormous empty space.
> No text other than the small label.

## 6. What will break this design

If a returned image has any of these, regenerate rather than accepting it:

- a gradient, a glow, a soft shadow, or a background texture of any kind
- 3D, isometric projection, perspective, or anything with a light source
- more than the two greys plus one blue
- rounded, brush, calligraphic, or variable-weight strokes
- an illustration style with character — hand-drawn wobble, sketch hatching,
  "friendly" rounded blobs, flat-vector-people
- a person, a face, a hand, a crowd, or a silhouette of one
- a map, a globe, a pin, a location marker, or anything geographic
- a recognisable third-party logo (search and social platforms are named in the
  copy; they must not be drawn)
- text in the image that is not tiny uppercase monospace
- a lightbulb, a rocket, a gear, a brain, a network-sphere, or a circuit board

## 7. When you have the files

Drop them in `ndot/assets/` and tell me which slot each one is for. I'll wire
them in, keep the alt text honest, and re-run the layout audit so nothing shifts
at 320 / 390 / 768 / 1440. If the linework comes back clean enough, the better
end state is to trace the approved set into SVG so they stay crisp, take
`currentColor`, and re-point on the dark band the way the rest of the page does.
