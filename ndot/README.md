# NDot AI — five directions for the B2B site

The B2B / publisher-growth positioning, explored as five complete art
directions behind one catalogue. This is a sibling of the consumer
Nearby AI site at the repo root, not a replacement for it — different
audience, different copy, different brand voice.

    ndot/
      index.html          the catalogue
      catalog.css
      v1-publication/     editorial print   — serif, folios, a ruled index
      v2-schematic/       systems diagram   — Archivo, construction drawing
      v3-index/           light product     — after exa.ai
      v4-signal/          dark terminal     — after a1base.com
      v5-institution/     black and bronze  — after hebbia.com
        index.html
        careers.html
        site.css

## The catalogue

Full-bleed ruled rows, the name set large in the direction's own colour,
the descriptor squared off right. Hovering a row collapses it into a
filled pill and previews that direction **live** — a real iframe of the
page rendered at 1280px and scaled down, following the cursor. The
preview is the actual HTML, so the catalogue cannot fall out of date
with its contents.

Each direction's colour clears 4.5:1 twice over: as the name on the row
ground, and as white on the pill fill.

| direction    | colour    | on ground | white on fill |
|--------------|-----------|-----------|---------------|
| Publication  | `#9E241B` | 6.34      | 7.71          |
| Schematic    | `#2447C7` | 6.16      | 7.50          |
| Index        | `#0D6E62` | 5.04      | 6.13          |
| Signal       | `#8F5305` | 5.07      | 6.16          |
| Institution  | `#3F3F46` | 8.59      | 10.44         |

## Ground rules every direction keeps

- **The copy is verbatim and shared.** All five sites say exactly the
  same words; only the setting changes. Nothing is invented — no fake
  metrics, no fake customers, no real team names. The team section is
  explicitly placeholder in all five.
- **No build step, no dependencies.** Plain HTML and CSS. The only
  remote requests are Google Fonts.
- **Relative paths throughout**, because this is served from `/ndot/`,
  never from a domain root.
- **Reduced motion is honoured** and no text is animation-gated: every
  page reads with JavaScript disabled.

## Local

From the repo root:

    python3 serve.py 8899     # then open /ndot/

The catalogue's previews are iframes, so it needs to be served over
HTTP — opening `index.html` from the filesystem shows the rows but not
the previews.

## Verified

Run against the finished files: copy verbatim on all ten pages; 450
rendered text elements checked for contrast with zero AA failures;
no horizontal overflow at 360px on any page; the brand mark byte-
identical everywhere; one `h1` per page; relative paths only.
