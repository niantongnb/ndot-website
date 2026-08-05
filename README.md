# NDot AI — mission / vision one-pager

Static prototype. No build step: each page is a single self-contained HTML file
plus the county dataset.

## Versions

| URL | What it is |
|---|---|
| `/` | The current design. Mirrors `/v3/`. |
| `/v3/` | Current: street-atlas treatment, oversized hero, county drill-down. |
| `/v2/` | The original atlas build, kept for comparison. Still has the brand-mark formation. |
| `/v1/` | The first take: dark and cinematic, typewriter hero, constellation field. |

`/` and `/v3/` are the same page. When changing the current design, update
`index.html` and copy it to `v3/index.html`.

## The hero

`/v2/` and `/v3/` render 3,142 US county centroids (`assets/counties.json`,
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
