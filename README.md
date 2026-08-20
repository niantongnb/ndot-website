# Two sites in one repo

This repo hosts two different companies' prototypes. Read this before editing
anything, or you will change the wrong company's site.

| URL | Company | What it is |
|---|---|---|
| `/` | **Nearby** | The AI-native platform for local life. Mirrors `/v3/`. |
| `/v3/` | Nearby | Street-atlas treatment, oversized hero, county drill-down. |
| `/v2/` | Nearby | Editorial black-and-white build, with this project's hero engine. |
| `/v1/` | Nearby | The first take: dark and cinematic, typewriter hero, constellation. |
| `/v4/` | Nearby | `/v2/` with the hero animation frozen to a still map. |
| `/ndot/` | **NDot AI** | Three design directions for the B2B site. Start here. |

Everything at the root is **Nearby**, the consumer local-life product. The
3,142-county dot map is Nearby's, and so is all of v1 through v4.

**NDot AI is a different company**: the growth platform for media companies.
It has no map, because the county map means "local geography" and that is
precisely what NDot is no longer about. NDot lives entirely under `/ndot/`.

## /ndot/ — three directions

Identical copy, identical structure, identical brand rules across all three.
Each takes its design language from a different reference site.

| Direction | After | Character |
|---|---|---|
| `/ndot/institutional/` | hebbia.com | Cinematic dark, high contrast serif caps, one blue accent |
| `/ndot/console/` | exa.ai | Light and engineered, mono micro labels, a working surface in the hero |
| `/ndot/lab/` | a1base.com | Amber on near black against cream, square corners, specimen strip |

Each direction is a home page plus a full careers page. `/ndot/` itself is the
chooser that links all six.

Copy in every direction is verbatim from the approved source document and must
not be reworded. The brief, the open questions, and the working rules are in
`/Users/tong/Desktop/Vibe_Code/ndot-v2-brief/START-HERE.md`.

## Local

```
python3 serve.py 8899     # http://localhost:8899
```

`serve.py` sends `no-store`, which `python3 -m http.server` does not. Without
it browsers keep serving a stale copy and edits look like they did nothing.

## Nearby's hero

`/v3/` renders 3,142 US county centroids (`assets/counties.json`,
`[x, y, sqrt(land_area), "County, ST"]` in Albers USA space, 975 x 610).
Hover names a county; clicking one reforms the dots into that county's state,
and clicking again returns to the nation. "Signal field" is the loose, chaotic
scatter across the whole frame.

`/` and `/v3/` are the same page. When changing the current Nearby design,
update `index.html` and copy it to `v3/index.html`.

## Nearby's /v2/

Layout, typography, sections, Lenis smooth scrolling and stacked section covers
are from the Codex handoff package and are left as they were. Only the county
engine was replaced, with the same one `/v3/` uses.

That swap closes the open item in the handoff brief: the old `buildTown()` cloned
each county several times and arranged the copies into a synthetic 5px rectangular
grid. Now one dot stays one county for the whole interaction, and a clicked state
reforms from its own real counties, each scattered inside a disc sized to that
county's share of the state's projected area so neighbours overlap into a single
continuous mass. `buildTown`, `selectState`, `clearFocus` and `nearestNational`
are gone.

## Publishing

GitHub Pages from `main`, repo root. `.nojekyll` is required. `robots.txt`
disallows everything and every page carries `noindex,nofollow`; remove both when
a page should be indexed.
