# ndot for publishers, build spec

Everything needed to rebuild the deck by hand. Slide size **13.333 × 7.5 in (1280 × 720 pt)**.
All plates are **2560 × 1440 px @2x = 192 DPI** on that slide.

## Folders

| Folder | What it is |
|---|---|
| `backgrounds/` | Slide plates with **no text**. Drop one behind each slide and set your own type. |
| `backgrounds-transparent/` | The same plates with the paper ground knocked out. Use these over your own colour. |
| `reference/` | The finished slide, text and all. Layout reference only. |
| `elements/` | The isometric box, transparent, ~970 × 1120 px. `box-navy` and `box-mid` for paper, `box-onband` and `box-pale` for the blue band. |
| `brand/` | `wordmark.svg`, `mark.svg`. Both use `fill="currentColor"` so they invert. |

## Colour

**NewsBreak palette.** Contrast ratios are computed (WCAG 2.1), not eyeballed.

| Token | Hex | Use |
|---|---|---|
| paper | `#FAFAF8` | page ground |
| plate | `#F1F1EC` | panels, tables |
| ink | `#111110` | headlines, body (18.08:1 on paper) |
| ink-2 | `#3D3D37` | secondary body |
| mute | `#6B6B63` | decks, captions (5.14:1) |
| rule | `#D8D8CE` | hairlines |
| plate-grey | `#C9C9C0` | decoration, empty dots |
| **accent** | **`#D6493D`** | NewsBreak secondary dark red: folios, key numbers, dot rails |

The inverted band is NewsBreak primary blue taken down so type clears on it:

| Token | Hex |
|---|---|
| ground | `#1C3049` |
| plate | `#26405F` |
| text | `#EEF2F6` (12.13:1) |
| secondary | `#CBD6E0` |
| labels | `#93A4B5` (5.24:1) |
| hairline | `#68809A` (3.28:1) |
| **accent-ink** | **`#FF5A5A`** NewsBreak primary red (4.38:1) |

Collage tones: navy `#274464`, blue `#3D638C`, light blue `#68809A`, plus the greys.

Three rules that are not preferences:

- **Primary Red `#FF5A5A` is not usable on paper**: 2.93:1. It only works on the
  inverted band. Dark Red `#D6493D` carries the accent on light.
- **Dark Red is a banned pair on the band**: 2.33:1. It flips to Primary Red there.
- **The warm grey hairline vanishes on navy**: 2.46:1. The band uses `#68809A`.

One caveat worth knowing: `#D6493D` on paper is **4.12:1**, just under the 4.5
threshold for text below 18px. It clears comfortably for the big numbers, the dot
rails and any large type. If the small mono kickers need to be strictly AA, move them
to primary blue `#274464` (9.58:1), which is the natural second home for the system
layer.

## Type

**Newsreader** for prose, **IBM Plex Mono** for the system layer: labels, folios,
ordinals, data captions, table heads, page numbers. Font files are in `../fonts/`.

| Role | Face | Size | Tracking |
|---|---|---|---|
| Cover headline | Newsreader 600 | 54 pt | −0.017em |
| Divider headline | Newsreader 600 | 78 pt | −0.017em |
| Page headline | Newsreader 600 | 41 pt | −0.017em |
| Lede | Newsreader 400 | 16.5 pt | 0 |
| Body | Newsreader 400 | 14 pt | 0 |
| Big number | Newsreader 600 | 36–40 pt | −0.03em |
| Kicker / label | Plex Mono 600 | 10.5 pt | 0.2em, uppercase |
| Folio, caption | Plex Mono 400–600 | 9.5–10 pt | 0.15em, uppercase |

Numbers are lining and tabular throughout.

## Grid

- Margin **64 px** all round; content field 1152 px wide.
- Column lattice of **96 px**. Every construction guide sits on it, never between,
  and never closer than two columns to another. Guides stay off the outer boundaries
  and out of the folio and foot bands.
- Folio rule under the masthead, hairline rule above the foot.
- **Hard corners everywhere.** The only round things are dots, because a dot is the mark.
- No gradients, no shadows on page content.

## Structure

15 pages: cover, contents, then four sections with a divider each.

| | Pages |
|---|---|
| § 01 The problem | 3–5 |
| § 02 The shift | 6–7 |
| § 03 The offer | 8–13 |
| § 04 Next steps | 14–15 |

The dividers carry the argument: fragments adrift → gathering → assembled on ink →
solid and settled. Pages 8 and 12 are the two dark beats.

## The data language

One dot, one unit, everywhere:
- traffic page: one dot = one percentage point, every rail is 100
- valuation page: one dot = one turn of revenue
- engagement page: one dot = one multiple

Keep it if you add a data page. It is also why the accent red only ever appears once
per collage: as the dot held inside the box.
