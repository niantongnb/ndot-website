# NDot AI — eight directions for the B2B site

The B2B / publisher-growth positioning, explored as eight complete art
directions behind one catalogue. This is a sibling of the consumer
Nearby AI site at the repo root, not a replacement for it — different
audience, different copy, different brand voice.

    ndot/
      index.html          the catalogue
      catalog.css
      assets/             the mark and wordmark, shared by three directions
      v1-publication/     Publication  · editorial print
      v2-schematic/       Schematic    · systems diagram
      v3-index/           Index        · light product surface
      v4-signal/          Signal       · dark lab terminal
      v5-institution/     Institution  · black and bronze
      console/            Console      · working surfaces
      institutional/      Prospectus   · ruled tables
      lab/                Lab          · specimen bands
        index.html
        careers.html
        site.css

Note the one place a display name and a folder name differ: the
catalogue calls `institutional/` **Prospectus**, because "Institutional"
and "Institution" are indistinguishable in a list. Prospectus is that
direction's own word for itself — its notes open "A prospectus, not a
product tour."

## Where they came from

Five directions (`v1`–`v5`) came from the interaction-prototype gallery.
Three (`console`, `institutional`, `lab`) came from the
`ndot-b2b-directions` branch and are unchanged here apart from being
catalogued. Only their direction folders were taken; that branch also
deletes `explorations/publisher-deck/`, which is not part of this merge.

Two references drew two independent takes each — worth comparing:

| reference    | take one              | take two                |
|--------------|-----------------------|-------------------------|
| exa.ai       | Index (light product) | Console (working surfaces) |
| hebbia.com   | Institution (bronze)  | Prospectus (ruled tables)  |
| a1base.com   | Signal (dark terminal)| —                       |

## The catalogue

Full-bleed ruled rows, the name set large in the direction's own colour,
the descriptor squared off right. Hovering a row collapses it into a
filled pill and previews that direction **live** — a real iframe of the
page rendered at 1280px and scaled down, following the cursor. The
preview is the actual HTML, so the catalogue cannot fall out of date
with its contents. Rows are ordered by ground, lightest to darkest,
which is the only axis all eight share.

Eight hues, no two adjacent on the wheel. Each clears 4.5:1 twice over:
as the name on the row ground, and as white on the pill fill.

| direction    | colour    | on ground | white on fill |
|--------------|-----------|-----------|---------------|
| Publication  | `#9E241B` | 6.34      | 7.71          |
| Schematic    | `#2447C7` | 6.16      | 7.50          |
| Index        | `#0D6E62` | 5.04      | 6.13          |
| Signal       | `#8F5305` | 5.07      | 6.16          |
| Institution  | `#3F3F46` | 8.59      | 10.44         |
| Console      | `#5A3BB5` | 6.33      | 7.70          |
| Prospectus   | `#8E2A6B` | 6.41      | 7.80          |
| Lab          | `#4F6B1F` | 5.00      | 6.08          |

On a touch screen, or below 720px, the cursor preview is dropped
outright rather than shrunk — there is no pointer to follow and no room
to follow it into.

## House rules

- **No build step, no dependencies.** Plain HTML and CSS. The only
  remote requests are Google Fonts.
- **Relative paths throughout**, because this is served from `/ndot/`,
  never from a domain root.
- **Reduced motion is honoured** and no text is animation-gated.
- **Copy.** All eight draw on one approved set of strings. The five
  `v*` directions use nothing outside it. The three inherited
  directions add some headline and deck lines of their own, and each
  carries a different subset of the approved careers copy on its home
  page; every careers page is complete.

## Local

From the repo root:

    python3 serve.py 8899     # then open /ndot/

The catalogue's previews are iframes, so it needs to be served over
HTTP — opening `index.html` from the filesystem shows the rows but not
the previews.

## Verified

Measured on the finished files, all sixteen pages: **827 rendered text
elements checked for contrast, zero AA failures**; no horizontal
overflow at 360px on any page; every catalogue row mounts its preview
exactly once and points at the right folder.
