# NDot AI — mission / vision one-pager

Static prototype. No build step: each page is a single self-contained HTML file
plus the county dataset.

## Versions

| URL | What it is |
|---|---|
| `/` | The current design. Mirrors `/v3/`. |
| `/v3/` | Current: street-atlas treatment, oversized hero, county drill-down. |
| `/v2/` | Editorial black-and-white build (from the Codex handoff), with this project's hero engine dropped into it. |
| `/v1/` | The first take: dark and cinematic, typewriter hero, constellation field. |

`/` and `/v3/` are the same page. When changing the current design, update
`index.html` and copy it to `v3/index.html`.

## The hero

`/v3/` renders 3,142 US county centroids (`assets/counties.json`,
`[x, y, sqrt(land_area), "County, ST"]` in Albers USA space, 975 x 610).
Hover names a county; clicking one reforms the dots into that county's state,
and clicking again returns to the nation. "Signal field" is the loose, chaotic
scatter across the whole frame.

## Local

```
python3 serve.py 8899     # http://localhost:8899
```

`serve.py` sends `no-store`, which `python3 -m http.server` does not — without
it browsers keep serving a stale copy and edits look like they did nothing.

## /v2/ — the editorial build

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
