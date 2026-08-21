# Illustrations

Paper-collage artwork in the same register as the rest of this folder: torn
newsprint and geometric fragments, muted greys and slate blue, and the accent red
used once per image as the focal point. They sit naturally on `--ndot-paper`
(`#FAFAF8`) and on the `--ndot-band` ground.

Four concepts, each with transparent cut-outs and one opaque version.

| Concept | Transparent | On its own ground |
|---|---|---|
| **01 Cover collage** — a phone with paper spilling out of it | `01-cover-collage.png` (1122 × 1402) | `01-cover-collage-on-ground.png` |
| **02 Search collapse** — a burst dispersing along a dashed path to a small terminal | `02-search-collapse.png` (1672 × 941) | `02-search-collapse-on-ground.png` |
| **03 Owned channel** — a phone with an orbiting ring around a red core | `03-owned-channel-orbit.png`, `-orbit-refined.png` (1672 × 941), `-polished.png` | `03-owned-channel-orbit-on-ground.png` |
| **04 Growth engine** — a vertical machine of stacked plates around a red core | `04-growth-engine.png` (1072 × 1467), `-refined.png` (1024 × 1536), `-polished.png` (941 × 1672) | `04-growth-engine-on-ground.png` |

The `-refined` and `-polished` files are alternative takes on the same concept at
slightly different crops, not upgrades of each other. Compare before choosing.

## Using them

- The transparent files are true RGBA cut-outs. Composite them over
  `--ndot-paper`, over `--ndot-band`, or over a plate from `../backgrounds/`.
- They are raster and range 941px to 1672px on the long edge. Fine at hero size on
  a 1× display and at half that on 2×. Do not scale them up.
- The red in these files is close to, but not identical to, `--ndot-accent`
  `#A6231A`. Do not sample from the artwork for UI colour; take the token.
- One red focal point per image is the whole idea, and it is the same idea as the
  dot inside the isometric box. Do not add a second accent next to one of these.

## Deduplication

The source set had each transparent master saved twice, once as `-transparent2`
and once as `_RGBA`. Those pairs were byte-for-byte identical, so only one of each
was kept. Nothing was lost.

## `_barred-map-imagery/`

Two images from the same batch are **not for NDot** and are parked there rather
than deleted. Read that folder's note before touching them.
