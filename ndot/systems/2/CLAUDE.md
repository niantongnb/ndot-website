# NDot AI: Systems, round 2 (Facing Pages)

An iteration of `../ndot-site-v2/`. **Read `../ndot-site/CLAUDE.md` first** for
the rules that never change (NDot is not Nearby, no map ever, copy verbatim, no
invented figures, fail-open motion), and `../ndot-edit-r2/CLAUDE.md` for the
shared stylesheet mechanics.

## What this round is

A spread. The **left leaf is a caption, the right leaf is a plate**, and the
caption changes as each plate scrolls past it.

| | R1 | R2 | R3 |
|---|---|---|---|
| grid | one column, `200px 88px 1fr` per section | `40% / 1fr`, facing | full-viewport panels |
| what scrolls | the whole page | the whole page, one scrollbar | the whole page, a screen at a time |
| the left half | a sticky rail per section | **a caption that changes per plate** | nothing |

Pairs, in order: the opening statement facing the record (§ 01), then captions
02 The shift, 03 Platform, 04 Company, 05 Team, each facing its plate. Careers
(§ 06) closes across both leaves.

## How the caption changes, and why there is no JavaScript

Each pair is one grid row. The left cell keeps the default `align-self:stretch`
so it fills the pair's full height, and the caption inside it is
`position:sticky`. While you read pair N its caption is pinned; when the pair
ends the caption scrolls away and pair N+1's arrives behind it.

**Do not "improve" this with an IntersectionObserver.** That would gate visible
copy behind script, which this site does not do: every word is present with JS
disabled, with rAF suspended, and under `prefers-reduced-motion`. There is
nothing here that can fail to run.

Two ways to break it, both of which have been made and fixed:

- **`align-items` on `.leafpair`.** Setting `start` collapses the left cell to
  its content height, and the caption then has nothing to be sticky inside.
- **`overflow` on `.leaf-l` or `.stick`.** It silently kills `position:sticky`,
  and it also brings back the second scrollbar this round exists to remove. The
  previous draft pinned the pane with `height:100dvh; overflow-y:auto`, which
  gave the page two competing scroll contexts. The reviewer's words were "both
  sides are scrollable is a bit confusing". Nothing scrolls here but the page.

## Pacing is load-bearing, and the block must stay last

A caption is only *held* for as long as its pair is taller than the viewport.
Pinned travel is `pair height - viewport room`, so a plate exactly one screen
tall pins for **zero pixels** and the caption simply scrolls by. Measured, that
was the first draft: pinned in **4%** of samples at 1440x900, and the whole
conceit did not read.

The pacing block at the end of `layout-facing.css` sizes each plate to roughly
two screenfuls. Current measurements, home page:

| viewport | caption pinned |
|---|---|
| 1024x640 | 52% |
| 1280x700 | 56% |
| 1440x900 | 46% |
| 1728x1080 | 42% |

Careers holds 67 to 81%, because one caption faces the whole article.

**That block must remain the last thing in the file.** Its rules are
single-class, the same specificity as the component rules above them, and a
media query adds no specificity. When it sat higher in the file every
`min-height` in it was silently overridden by the component rule below, *except*
`.panel`, which had no competing `min-height` and so inflated the two diagrams
into tall empty boxes while the rest stayed compact. It measured as a success
and looked like a bug. Add new component rules **above** the block.

The height is taken from what the plate's own records want, never from filler.
Where the content is genuinely short the diagrams earn their height from a
taller `viewBox` (420x300, both panels on the same one so they are directly
comparable) rather than from padding.

## Other things that will bite you

- **The bar is `position:fixed`, so an overflowing nav does not widen the
  document** and no horizontal-overflow check catches it. At 320px the row
  wanted 355.8px and the links simply ran off the right edge, unreachable.
  Below 600px the bar goes static and the nav wraps to its own row.
- **`.caps` needs its column count inside the pacing block.** Losing it drops
  the capability plate to a single column of eight tall cells, which triples the
  pair's height and inflates the pinned-time measurement while looking wrong.
- The eighth capability cell carries the mark on ink rather than filler copy.
  That is how seven items land in a two-wide grid without an orphan.

## Copy on the caption leaves

Authored UI chrome is allowed on a caption: the section number, the `/ 06`
counter, the section name, and plate labels like "Record" and "Six records".
**No marketing prose is invented for them.** The single sentence that appears on
a caption leaf is the platform sentence, which is the source document's own and
was *moved* there rather than duplicated.

## Graphics

Inline SVG built from geometry: no photography, no stock art, no icon font, no
external assets, **no map**. The shift diagram's right panel is mostly empty
because the middle layer is gone. **That asymmetry IS the argument, so do not
fill it.** Node labels are the source document's own words.
