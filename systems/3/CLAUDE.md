# NDot AI: Systems, round 3 (Panels)

An iteration of `../ndot-site-v2/`. **Read `../ndot-site/CLAUDE.md` first** for
the rules that never change (NDot is not Nearby, no map ever, copy verbatim, no
invented figures, fail-open motion), and `../ndot-edit-r2/CLAUDE.md` for the
shared stylesheet mechanics.

## What this round changes: the geometry

An earlier version of this round ran a red line down the same stacked page R1
uses. This one advances a screen at a time.

| | R1 | R2 | R3 |
|---|---|---|---|
| unit | a section in a column | a unit in the streaming pane | **a full-viewport panel** |
| scroll | continuous | continuous, one pane | **snapped, one screen at a time** |
| fixed chrome | sticky masthead | pinned pane | **top bar + tick rail on the left edge** |
| continuous text column | yes | yes | **none anywhere** |

- **Every section is its own plate**, composed to fill a screen: the proof as
  three cells across, the shift as two panels side by side, the capabilities as
  a four-wide plate of eight cells, company as a split, the team as a six-across
  strip.
- **The eighth capability cell carries the mark** on ink rather than filler
  copy. That is how seven items land in a four-wide grid without an orphan.
- **A tick rail down the left edge** numbers the panels 01 to 06, and each panel
  stamps its own folio in the corner. On a page with no continuous column, the
  number is how you know where you are.
- The ticks are plain anchors with no active state. There is **no script on this
  page**, so there is no active state to get wrong.

## Snapping: proximity, never mandatory

```css
@media (min-width:900px) and (min-height:680px){
  html{scroll-snap-type:y proximity}
  .panel-full{scroll-snap-align:start;min-height:100dvh}
}
```

Three deliberate choices, all load-bearing:

1. **`proximity`, not `mandatory`.** Mandatory snapping strands any panel taller
   than the viewport: the browser keeps pulling the panel top back to the
   viewport top and the overflowing bottom becomes unreachable.
2. **`min-height`, not `height`.** A panel that needs more room takes it, and
   the proximity snap simply lets go.
3. **Off below 900px wide or 680px tall.** A phone is exactly where a
   viewport-locked panel becomes a trap, and the height condition catches short
   laptop windows too.

The careers page deliberately breaks its own rule: the ask gets a full panel,
then the article is a plain scrolling block with no snap and no viewport lock,
because a wall of prose held to one screen is unreadable.

## Graphics

Same inline SVG as `../ndot-sys-r2/`: the shift diagram (whose right panel is
mostly empty **on purpose** — the middle layer is gone, and that asymmetry is
the argument) and seven monoline capability marks, all `currentColor`. No
photography, no icon font, no external assets, **no map**.

## Print

The panels layout drops `scroll-snap`, `min-height`, the top bar and the tick
rail under `@media print`, and lightens the ground. Anything new and inverted
needs an entry there too, or it prints white on white.
